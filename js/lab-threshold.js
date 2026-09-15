(function () {
    var body = document.body;
    if (!body || !body.classList.contains("page-home--lab")) return;

    var threshold = document.getElementById("labThreshold");
    var enterBtn = document.getElementById("labEnter");
    var main = document.getElementById("labMain");
    var cycle = document.getElementById("labCycle");
    var STORAGE_KEY = "fm-lab-threshold-entered";
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var entered = false;
    var cycleTimer = null;

    function setState(state) {
        body.setAttribute("data-lab-state", state);
    }

    function revealCycle() {
        if (!cycle) return;
        var steps = Array.prototype.slice.call(cycle.querySelectorAll(".lab-cycle__step"));
        if (!steps.length) return;

        steps.forEach(function (step, index) {
            step.classList.toggle("is-active", index === 0);
            step.classList.remove("is-done");
            if (index > 0) step.setAttribute("aria-hidden", "true");
            else step.removeAttribute("aria-hidden");
        });

        if (reduceMotion) {
            steps.forEach(function (step) {
                step.classList.add("is-active", "is-done");
                step.removeAttribute("aria-hidden");
            });
            return;
        }

        var index = 0;
        if (cycleTimer) window.clearInterval(cycleTimer);
        cycleTimer = window.setInterval(function () {
            if (index < steps.length - 1) {
                steps[index].classList.remove("is-active");
                steps[index].classList.add("is-done");
                index += 1;
                steps[index].classList.add("is-active");
                steps[index].removeAttribute("aria-hidden");
            } else {
                window.clearInterval(cycleTimer);
                cycleTimer = null;
            }
        }, 1600);
    }

    function enterAtelier() {
        if (entered) return;
        entered = true;

        try {
            sessionStorage.setItem(STORAGE_KEY, "1");
        } catch (err) {
            /* private mode */
        }

        if (reduceMotion) {
            if (threshold) threshold.classList.add("is-leaving");
            if (main) {
                main.hidden = false;
                main.focus({ preventScroll: true });
            }
            setState("atelier");
            if (threshold) threshold.setAttribute("aria-hidden", "true");
            revealCycle();
            return;
        }

        if (threshold) threshold.classList.add("is-leaving");
        window.setTimeout(function () {
            if (main) {
                main.hidden = false;
                main.focus({ preventScroll: true });
            }
            setState("atelier");
            if (threshold) {
                threshold.setAttribute("aria-hidden", "true");
            }
            revealCycle();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 720);
    }

    function alreadyEntered() {
        try {
            return sessionStorage.getItem(STORAGE_KEY) === "1";
        } catch (err) {
            return false;
        }
    }

    function bindScrollHint() {
        var armed = true;
        var onWheel = function (event) {
            if (!armed || entered) return;
            if (event.deltaY > 18) {
                armed = false;
                enterAtelier();
            }
        };
        var touchY = null;
        var onTouchStart = function (event) {
            if (!event.touches || !event.touches.length) return;
            touchY = event.touches[0].clientY;
        };
        var onTouchMove = function (event) {
            if (!armed || entered || touchY === null) return;
            var y = event.touches[0].clientY;
            if (touchY - y > 36) {
                armed = false;
                enterAtelier();
            }
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
    }

    if (alreadyEntered()) {
        entered = true;
        if (threshold) {
            threshold.classList.add("is-leaving");
            threshold.setAttribute("aria-hidden", "true");
            threshold.style.display = "none";
        }
        if (main) main.hidden = false;
        setState("atelier");
        revealCycle();
        return;
    }

    setState("threshold");
    if (enterBtn) {
        enterBtn.addEventListener("click", enterAtelier);
        window.setTimeout(function () {
            try {
                enterBtn.focus({ preventScroll: true });
            } catch (err) {
                enterBtn.focus();
            }
        }, 50);
    }
    bindScrollHint();

    document.addEventListener("keydown", function (event) {
        if (entered) return;
        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown" || event.key === "PageDown") {
            if (event.target && event.target.closest && event.target.closest(".lang-switcher, .main-nav, .nav-toggle")) {
                return;
            }
            event.preventDefault();
            enterAtelier();
        }
    });
})();
