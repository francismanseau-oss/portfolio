(function () {
    var nav = document.getElementById("mainNav");
    if (!nav) return;

    var body = document.body;
    var root = body.getAttribute("data-nav-root") || "";
    var active = body.getAttribute("data-nav-active") || "";

    var items = [
        { id: "home", href: root + "index.html", label: "Accueil" },
        { id: "projects", href: root + "projects/index.html", label: "Laboratoire" },
        { id: "skills", href: root + "competences/index.html", label: "Démarche" },
        { id: "contact", href: root + "contact/index.html", label: "Contact" }
    ];

    nav.innerHTML = items.map(function (item, index) {
        var cls = item.id === active ? ' class="active"' : "";
        var link =
            '<a href="' + item.href + '"' + cls + '>' +
                '<span class="nav-link-text" data-translate>' + item.label + "</span>" +
            "</a>";
        if (index < items.length - 1) {
            return link + '<span class="nav-sep" aria-hidden="true">|</span>';
        }
        return link;
    }).join("");
})();
