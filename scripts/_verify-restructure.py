from pathlib import Path
import re
for repo in ["portfolio", "portefolio"]:
    root = Path(rf"C:\Projets\{repo}")
    t = (root / "projects/index.html").read_text(encoding="utf-8")
    start = t.find("const projects = [")
    end = t.find("\n];\n\nlet currentIndex", start)
    body = t[start:end]
    ids = re.findall(r'id:\s*"([^"]+)"', body)
    print(repo, "flagships=", ids)
    nav = (root / "js/site-nav.js").read_text(encoding="utf-8")
    assert "Projets phares" in nav and "laboratoire/index.html" in nav
    assert (root / "laboratoire/index.html").exists()
    assert (root / "assets/projects/hk-crib-go/partie-en-cours.png").exists()
    assert not (root / "assets/projects/cribleplus").exists()
    print(repo, "OK")
