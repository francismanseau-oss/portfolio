(function () {
    "use strict";

    var RETURNING_KEY = "vision.returning";

    var FALLBACK_BEATS = {
        default: [
            { kind: "scene", pause_before_seconds: 1.0, animation_cue: "standby" },
            { kind: "scene", pause_before_seconds: 0.8, animation_cue: "wake_light" },
            { kind: "action", pause_before_seconds: 1.4, animation_cue: "eyes_open" },
            { kind: "action", pause_before_seconds: 0.8, animation_cue: "presence_sense" },
            { kind: "action", pause_before_seconds: 0.7, animation_cue: "look_visitor" },
            { kind: "action", pause_before_seconds: 0.5, animation_cue: "breathe" },
            { kind: "action", pause_before_seconds: 0.4, animation_cue: "smile" },
            {
                kind: "speech",
                text: "Oh... bonjour.",
                pause_after_seconds: 2.0,
                input_ready: true,
            },
        ],
        returning: [
            { kind: "scene", pause_before_seconds: 0.6, animation_cue: "wake_light" },
            { kind: "action", pause_before_seconds: 0.8, animation_cue: "eyes_open" },
            {
                kind: "speech",
                text: "Oh... content de vous revoir.",
                pause_after_seconds: 1.5,
                input_ready: true,
            },
        ],
    };

    function apiBase() {
        var meta = document.querySelector('meta[name="vision-api"]');
        return meta && meta.content ? meta.content.replace(/\/$/, "") : "";
    }

    function sleep(seconds) {
        return new Promise(function (resolve) {
            window.setTimeout(resolve, Math.max(0, seconds) * 1000);
        });
    }

    function VisionEncounter(root) {
        this.root = root;
        this.lab = root;
        this.speech = root.querySelector("#visionSpeech");
        this.dialogue = root.querySelector("#visionDialogue");
        this.messageInput = root.querySelector("#visionMessage");
        this.sendButton = root.querySelector("#visionSend");
        this.hint = root.querySelector("#visionHint");
        this.continueBtn = root.querySelector("#visionContinue");
        this.onDismiss = null;
        this._bind();
    }

    VisionEncounter.prototype._bind = function () {
        var self = this;
        this.dialogue.addEventListener("submit", function (event) {
            event.preventDefault();
            var text = self.messageInput.value.trim();
            if (!text) return;
            self.messageInput.value = "";
            self.sendMessage(text);
        });
        if (this.continueBtn) {
            this.continueBtn.addEventListener("click", function () {
                self.dismiss();
            });
        }
    };

    VisionEncounter.prototype.applyBeatVisual = function (beat) {
        var cue = beat.animation_cue || beat.kind;
        this.lab.dataset.beat = cue || "";
        if (cue === "wake_light" || cue === "standby") {
            this.lab.classList.add("is-awake");
        }
        if (cue === "wake_light") {
            this.lab.classList.add("is-lit");
        }
        if (cue === "eyes_open") {
            this.lab.classList.add("is-eyes-open");
        }
        if (cue === "look_visitor") {
            this.lab.classList.add("is-looking");
        }
        if (cue === "breathe") {
            this.lab.classList.add("is-breathing");
        }
        if (cue === "smile") {
            this.lab.classList.add("is-smiling");
        }
    };

    VisionEncounter.prototype.playBeat = async function (beat) {
        await sleep(beat.pause_before_seconds || 0);
        this.applyBeatVisual(beat);

        if (beat.kind === "speech" && beat.text) {
            this.speech.hidden = false;
            this.speech.textContent = beat.text;
            this.speech.classList.add("is-visible");
            if (this.hint) this.hint.textContent = "";
        }

        await sleep(beat.pause_after_seconds || 0);

        if (beat.input_ready) {
            this.dialogue.hidden = false;
            this.dialogue.classList.add("is-visible");
            if (this.continueBtn) this.continueBtn.hidden = false;
            this.messageInput.focus();
        }
    };

    VisionEncounter.prototype.playSequence = async function (beats) {
        for (var i = 0; i < beats.length; i += 1) {
            await this.playBeat(beats[i]);
        }
    };

    VisionEncounter.prototype.fetchPresence = async function (returning) {
        var base = apiBase();
        if (!base) {
            return { beats: returning ? FALLBACK_BEATS.returning : FALLBACK_BEATS.default };
        }
        try {
            var suffix = returning ? "?returning=true" : "";
            var response = await fetch(base + "/v1/vision/presence" + suffix);
            if (!response.ok) throw new Error("presence_unavailable");
            var payload = await response.json();
            if (!payload.ok || !payload.presence) throw new Error("presence_invalid");
            return payload.presence;
        } catch (_err) {
            return { beats: returning ? FALLBACK_BEATS.returning : FALLBACK_BEATS.default };
        }
    };

    VisionEncounter.prototype.appendVisionLine = function (text) {
        this.speech.hidden = false;
        this.speech.textContent = text;
        this.speech.classList.add("is-visible");
    };

    VisionEncounter.prototype.sendMessage = async function (text) {
        this.sendButton.disabled = true;
        var base = apiBase();
        if (!base) {
            this.appendVisionLine(
                "Je ne parviens pas à répondre pour l'instant. Démarrez la plateforme WSAI."
            );
            this.sendButton.disabled = false;
            this.messageInput.focus();
            return;
        }
        try {
            var response = await fetch(base + "/v1/vision/dialogue", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });
            var payload = await response.json();
            if (!payload.ok || !payload.turn) {
                this.appendVisionLine("…");
                return;
            }
            this.appendVisionLine(payload.turn.text);
        } catch (_err) {
            this.appendVisionLine("Je ne parviens pas à répondre pour l'instant.");
        } finally {
            this.sendButton.disabled = false;
            this.messageInput.focus();
        }
    };

    VisionEncounter.prototype.dismiss = function () {
        this.root.classList.remove("is-active");
        this.root.classList.add("is-dismissed");
        if (typeof this.onDismiss === "function") {
            this.onDismiss();
        }
    };

    VisionEncounter.prototype.start = async function (options) {
        options = options || {};
        var returning = !!options.returning;
        this.onDismiss = options.onDismiss || null;

        this.root.hidden = false;
        this.root.classList.add("is-active");
        this.root.classList.remove("is-dismissed");

        if (this.hint) {
            this.hint.textContent = returning ? "" : "Le laboratoire est silencieux.";
        }

        try {
            var presence = await this.fetchPresence(returning);
            await this.playSequence(presence.beats || []);
            try {
                window.sessionStorage.setItem(RETURNING_KEY, "1");
            } catch (_e) {
                /* private mode */
            }
        } catch (_err) {
            if (this.hint) {
                this.hint.textContent = "Vision n'est pas disponible.";
            }
        }
    };

    window.VisionEncounter = {
        start: function (options) {
            var root = document.getElementById("visionEncounter");
            if (!root) return;
            var instance = new VisionEncounter(root);
            instance.start(options);
        },
    };
})();
