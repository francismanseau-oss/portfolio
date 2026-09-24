# -*- coding: utf-8 -*-
"""Keep only flagship projects in projects/index.html array; rewrite cribleplus paths/classes."""
from pathlib import Path
import re

ROOT = Path(r"C:\Projets\portfolio")
path = ROOT / "projects" / "index.html"
text = path.read_text(encoding="utf-8")

KEEP = ["hk-crib-go", "nexus", "haven"]

# Locate projects array
start = text.find("const projects = [")
if start < 0:
    raise SystemExit("projects array not found")
# End: "];\n\nlet currentIndex"
end_marker = "\n];\n\nlet currentIndex"
end = text.find(end_marker, start)
if end < 0:
    raise SystemExit("projects array end not found")
end += len("\n];")  # include ];

array_body = text[start + len("const projects = [") : end - len("];")]

# Split top-level objects by finding id: "..."
# Walk brace depth for each object starting at {
objects = []
i = 0
n = len(array_body)
while i < n:
    while i < n and array_body[i] in " \t\r\n,":
        i += 1
    if i >= n:
        break
    if array_body[i] != "{":
        raise SystemExit(f"expected '{{' at {i}, got {array_body[i]!r}")
    depth = 0
    in_str = False
    str_ch = ""
    escape = False
    j = i
    while j < n:
        ch = array_body[j]
        if in_str:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == str_ch:
                in_str = False
        else:
            if ch in ("'", '"', "`"):
                in_str = True
                str_ch = ch
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    j += 1
                    objects.append(array_body[i:j])
                    i = j
                    break
        j += 1
    else:
        raise SystemExit("unbalanced braces in projects array")

kept = []
by_id = {}
for obj in objects:
    m = re.search(r'id:\s*"([^"]+)"', obj)
    if not m:
        raise SystemExit("object without id")
    by_id[m.group(1)] = obj

missing = [k for k in KEEP if k not in by_id]
if missing:
    raise SystemExit(f"missing projects: {missing}")

new_array = ",\n".join(by_id[k] for k in KEEP)
new_text = text[: start + len("const projects = [")] + "\n" + new_array + "\n" + text[end:]

# Intro copy
new_text = new_text.replace(
    "<title>Laboratoire | Francis Manseau</title>",
    "<title>Projets phares | Francis Manseau</title>",
)
new_text = new_text.replace(
    'content="Le Laboratoire Francis Manseau â€” Ã©tudes de conception : applications, systÃ¨mes, prototypes, expÃ©rimentations."',
    'content="Projets phares â€” Nexus / WSAI, HK Crib GO et Haven. Les trois principales preuves de travail de Francis Manseau."',
)
new_text = new_text.replace(
    "<h1 data-translate>Le Laboratoire</h1>",
    "<h1 data-translate>Projets phares</h1>",
)
new_text = new_text.replace(
    "Ici, chaque projet est une preuve concrÃ¨te de ma faÃ§on de travailler : comprendre un besoin ou un problÃ¨me, construire une solution, la tester, diagnostiquer les Ã©carts et lâ€™amÃ©liorer. Bienvenue dans le Laboratoire.",
    "Trois rÃ©alisations principales : un jeu Android publiÃ©, un Ã©cosystÃ¨me de pilotage Ã  distance, et une application de garde dâ€™enfants. Le dÃ©tail reste ici ; les expÃ©rimentations vivent dans le Laboratoire.",
)

# Crible+ path/class cleanup (keep asset rename separate)
new_text = new_text.replace("assets/projects/cribleplus/", "assets/projects/hk-crib-go/")
new_text = new_text.replace("cribleplus-benefits", "hk-crib-go-benefits")
new_text = new_text.replace("cribleplus-legal-links", "hk-crib-go-legal-links")
new_text = new_text.replace("/* HK Crib GO : 2 paysages empilÃ©s", "/* HK Crib GO : 2 paysages empilÃ©s")

# aria label
new_text = new_text.replace(
    'aria-label="Ã‰tudes de conception"',
    'aria-label="Projets phares"',
)
new_text = new_text.replace(
    'aria-label="Navigation des projets"',
    'aria-label="Navigation des projets phares"',
)

path.write_text(new_text, encoding="utf-8")
print("OK flagships:", KEEP)
print("removed:", [k for k in by_id if k not in KEEP])
