(function () {
    var slug = document.body.getAttribute("data-project-slug");
    if (!slug) return;

    var hero = document.querySelector("main .page-hero");
    if (!hero) return;

    var root = document.body.getAttribute("data-nav-root") || "../";

    var projects = [
        { id: "hk-crib-go", label: "HK Crib GO", href: "projects/index.html#hk-crib-go" },
        { id: "haven", label: "Haven", href: "projects/index.html#haven" },
        { id: "nexus", label: "Nexus / WSAI", href: "projects/index.html#nexus" },
        { id: "lab", label: "Laboratoire", href: "laboratoire/index.html" }
    ];

    var nav = document.createElement("nav");
    nav.className = "project-see-also";
    nav.setAttribute("aria-label", "Voir aussi");

    var label = document.createElement("span");
    label.className = "project-see-also__label";
    label.setAttribute("data-translate", "");
    label.textContent = "Voir aussi\u00a0:";

    var list = document.createElement("span");
    list.className = "project-see-also__list";

    projects.forEach(function (project, index) {
        if (index > 0) {
            var sep = document.createElement("span");
            sep.className = "project-see-also__sep";
            sep.setAttribute("aria-hidden", "true");
            sep.textContent = "\u00b7";
            list.appendChild(sep);
        }

        if (project.id === slug) {
            var current = document.createElement("span");
            current.className = "project-see-also__current";
            current.setAttribute("aria-current", "page");
            current.textContent = project.label;
            list.appendChild(current);
        } else {
            var link = document.createElement("a");
            link.href = root + project.href;
            link.textContent = project.label;
            list.appendChild(link);
        }
    });

    nav.appendChild(label);
    nav.appendChild(list);
    hero.insertBefore(nav, hero.firstElementChild);
})();
