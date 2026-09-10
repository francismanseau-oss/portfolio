# Portefolio — Laboratoire Francis Manseau

Site portfolio professionnel (Laboratoire de conception) — mobile, thème jour/nuit, carrousel d’études.

## Identité visuelle

Symbole **Maillage Modular** — fichiers dans `assets/brand/` (SVG) ; PNG favicon/nav via `generate-brand-assets.bat` ou `python scripts/generate-brand-assets.py`. Voir `assets/brand/CONCEPT.md`.

## Version

Voir `VERSION.md` — **Accueil V1.0 gelé** (2026-08-06).

## Première installation

```
C:\Projets\portefolio\setup-init.bat
```

## Structure actuelle

| Section | Fichier | Note |
|---------|---------|------|
| **Accueil** | `index.html` | Seuil + atelier — **V1.0 gelé** |
| **Laboratoire** | `projects/index.html` | Études (carrousel + fiches) |
| **Démarche** | `competences/index.html` | Approche & compétences |
| **Contact** | `contact/index.html` | Courriel + LinkedIn |
| **Journaux** | `journals/` | Carnets liés aux études |

Navigation centralisée : `js/site-nav.js`  
i18n dynamique (MyMemory) : `js/i18n.js` + `data-translate`

Anciennes sections (Services / À propos / Soumission) : redirection vers l’accueil.

## Contact

Courriel : `francismanseau@videotron.ca`  
LinkedIn : https://www.linkedin.com/in/francis-manseau-723b8586/

## Modifier les études

Liste dans `projects/index.html` (tableau `projects`).
