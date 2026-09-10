# Portfolio — Laboratoire Francis Manseau

## Accueil V1.0 — GELÉ

- **Statut :** V1.0 stabilisée (2026-08-06)
- **Périmètre gelé :** `index.html` / seuil + atelier d’accueil (`lab-home.css`, `lab-threshold.js`)
- **Règle :** aucune nouvelle section, architecture ou concept sur l’accueil sans décision explicite de rouvrir la V1
- **Suite autorisée :** correctifs de bugs uniquement ; Laboratoire (`projects/`), Démarche, Contact, journaux hors gel structurel de l’accueil

## Contenu V1 (référence)

Nav : Accueil · Laboratoire · Démarche · Contact  
Signature : *Les technologies évoluent. La résolution de problèmes demeure.*  
CTA : Explorer le laboratoire → `projects/index.html`

## Vérification clôturée — 2026-08-06

| Contrôle | Résultat |
|----------|----------|
| Accueil V1.0 (`meta portfolio-version=1.0`) | OK — gelé |
| Nav 4 items (Accueil · Laboratoire · Démarche · Contact) | OK — `site-nav.js` |
| Pages + `site-nav` (accueil, lab, démarche, contact, journaux) | OK |
| Assets accueil (portrait, logo, favicons) | OK |
| Assets Laboratoire (22 images projets / galerie) | OK — 0 manquant |
| CTA thème jour (hover lisible) | OK — `lab-home.css` |
| i18n : `applyCurrentLang` après carrousel | OK — `projects/index.html` |
| Contact courriel + LinkedIn | OK |
| README aligné sur structure Laboratoire | OK |

Hors périmètre de cette vérif : push GitHub Pages, nouvelles études, refonte hors bugs.
