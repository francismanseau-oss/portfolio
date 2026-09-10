# Identité visuelle — Francis Manseau

Symbole : **Maillage Modular** (nom interne du concept).

## Signification

Le symbole représente un **schéma d'architecture logicielle simplifié** :

| Élément | Sens |
|--------|------|
| **Nœud central (bleu)** | Orchestration, logique métier, point de convergence où les composants s'articulent |
| **Trois modules périphériques** | Services, couches ou sous-systèmes connectés au cœur |
| **Liaisons** | Flux de données, dépendances et intégration entre modules |
| **Cadre arrondi** | Périmètre du système — encapsulation, frontière applicative |

La forme évoque un **diagramme de composants** ou un **graphe orienté** sans copier une icône générique (réseau, ampoule, bouclier). C'est une signature abstraite, lisible comme « conception de systèmes » et « résolution structurée de problèmes ».

## Choix de conception

- **Minimalisme** : quatre cercles, trois segments, un contour — aucun effet, aucun dégradé, aucune lueur.
- **Palette** : bleu `#1E40AF` (structure, confiance) + gris `#64748B` (neutralité, rigueur). Deux couleurs maximum.
- **Intemporel** : géométrie pure, pas de tendance néon ni de métaphore cliché (ampoule, trophée, cybersécurité).
- **Scalabilité** : le favicon supprime le cadre et épaissit les traits pour rester net à 16×16 px.
- **Monochrome** : une seule encre `#0F172A` pour impressions, tampons et usages contraints.
- **Variantes de fond** : versions dédiées clair (`#F8FAFC`) et foncé (`#0C1222`) pour contraste garanti.

## Fichiers

| Fichier | Usage |
|---------|--------|
| `logo.svg` | Logo principal, fond transparent |
| `logo-monochrome.svg` | Une couleur, fond transparent |
| `logo-on-light.svg` | Fond clair intégré |
| `logo-on-dark.svg` | Fond foncé intégré |
| `favicon.svg` | Source vectorielle favicon (sans cadre) |
| `favicon/favicon-16.png` | Onglet navigateur |
| `favicon/favicon-32.png` | Raccourci, barre d'adresse |
| `favicon/favicon-64.png` | Tuile, grand favicon |

## Regénérer les PNG

```bat
cd /d "C:\Projets\portefolio"
python scripts\generate-brand-assets.py
```

Génère aussi `assets/logo/logo-nav.png` et `assets/logo/favicon.png` pour le site.
