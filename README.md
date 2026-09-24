# NextLevel Dev — Landing page freelance

Landing page futuriste pour une activité de développeur **full stack freelance**.
Frontend, backend, bases de données, DevOps et intégration IA — une stack complète, un seul interlocuteur.

> `{ CODE. BUILD. AUTOMATE. INNOVATE. }`

**🔗 Site en ligne : [nextleveldev.netlify.app](https://nextleveldev.netlify.app)**

---

## ✨ Aperçu

- **Fond 3D animé** (Three.js) : champ de particules néon + icosaèdre filaire, avec parallaxe souris.
- **Terminal signature** repris de l'identité de marque (`const nextLevel = { ... }`) avec effet machine à écrire.
- **Design system** cohérent : palette néon (cyan / bleu / violet / magenta) sur fond sombre, typographies `Rajdhani` (titres), `Inter` (texte), `JetBrains Mono` (code).
- Sections : Hero · Services · Méthode · Résultats · Contact · Footer.

---

## 🗂 Structure

```
nextleveldev/
├── index.html              # Le site complet (HTML + CSS + JS inline, autonome)
├── landing-preview.html    # Variante de landing (design chrome/néon, voir ci-dessous)
├── boutique-preview.html   # Page boutique / devis (voir ci-dessous)
├── manifest.json           # Manifeste PWA (icône, thème, nom)
├── robots.txt              # Directives pour les moteurs de recherche
├── sitemap.xml              # Plan du site pour le référencement
├── README.md                # Ce fichier
└── assets/
    ├── logo-lockup.png            # Logo + « NEXTLEVEL DEV » (partage social, JSON-LD)
    ├── logo-mark.png              # Emblème N1 carré (favicon, navigation)
    ├── logo-mark-transparent.png  # Emblème N1 fond transparent (à utiliser sur fond sombre)
    └── logo.png                   # Image de marque d'origine (conservée)
```

---

## 🎨 Pages de preview

Deux pages autonomes, générées séparément du site principal (`index.html`), à titre de variante à évaluer avant de les fusionner ou non dans le site officiel. Le logo y est intégré en base64 : aucune dépendance à `assets/`, elles s'ouvrent telles quelles.

### `landing-preview.html`

Variante de la page d'accueil, même identité de marque mais traitement différent : wordmark en dégradé chrome → violet → cyan, cartes de services au format `<Vitrine />` / `<Pro />` / `<IA · Chatbot />`, séquence d'entrée animée au chargement (hero) puis révélations en fondu au scroll sur chaque section — le tout désactivé si `prefers-reduced-motion` est actif.

### `boutique-preview.html`

Page boutique / configurateur de devis : les 3 formules (Vitrine, Pro, IA & Chatbot) et des options (maintenance, hébergement, SEO, identité visuelle) sont sélectionnables, avec un récapitulatif et un total qui se mettent à jour en direct (JS, aucun backend). Le bouton final ouvre un e-mail pré-rempli vers `chris@nextleveldevcom.com` avec le détail de la sélection — **ce n'est pas un paiement en ligne**, juste un générateur de demande de devis.

### Statut

Ces deux pages ne sont pas encore reliées à `index.html` ni entre elles par des liens relatifs (elles ont été publiées indépendamment en tant qu'Artifacts Claude). À intégrer manuellement si retenues : remplacer les liens absolus vers les Artifacts par des chemins relatifs (`landing-preview.html`, `boutique-preview.html`), et brancher le bouton de devis sur un vrai formulaire si besoin.

---

## 🚀 Lancer le site en local

Aucune dépendance à installer : tout est autonome. Il suffit d'un serveur statique.

```bash
# Option 1 — Python
python3 -m http.server 8000

# Option 2 — Node
npx serve .
```

Puis ouvrir `http://localhost:8000`.

> ⚠️ Ouvrir `index.html` directement (`file://`) fonctionne aussi, mais un serveur local est recommandé (chargement des polices et du manifest).

---

## 🌐 Déploiement

Le site est actuellement déployé sur **Netlify** : **https://nextleveldev.netlify.app**

Il est 100 % statique, donc déployable tout aussi bien sur **Vercel**, **GitHub Pages** ou **Cloudflare Pages**.

1. Poussez le dossier sur un dépôt Git.
2. Connectez-le à l'hébergeur.
3. Aucun build nécessaire — dossier racine = `/`.

Pensez à remplacer `https://nextleveldev.example/` par votre vrai domaine dans :
`index.html` (balises canonical / Open Graph / JSON-LD), `sitemap.xml` et `robots.txt`.

---

## 🔍 SEO

- Balises `<title>` et `<meta name="description">` optimisées.
- **Open Graph** + **Twitter Card** pour un partage propre sur les réseaux.
- **Données structurées JSON-LD** (`ProfessionalService`) pour les moteurs.
- `canonical`, `robots.txt`, `sitemap.xml`, `theme-color`.
- HTML sémantique (`header`, `main`, `section`, `article`, `footer`, `ol`).

## ♿ Accessibilité (WCAG)

- **Lien d'évitement** (« Aller au contenu principal »).
- Navigation au **clavier** avec `:focus-visible` visible partout.
- **Contrastes** de texte conformes AA sur fond sombre.
- `alt` pertinents, éléments décoratifs marqués `aria-hidden`.
- Landmarks ARIA, `aria-label`, `aria-expanded` sur le menu, `aria-live` sur le retour du formulaire.
- **`prefers-reduced-motion`** respecté : animations 3D, curseur et révélations désactivés si l'utilisateur le demande (fond statique en secours).

## ⚡ Performance

- **Zéro framework** : HTML/CSS/JS natif.
- Polices en **preconnect** + `display=swap`.
- Three.js chargé en **`defer`** (après le rendu de la page) — fallback statique si absent.
- Animation **mise en pause** quand l'onglet est masqué (CPU + batterie).
- `IntersectionObserver` pour les révélations (pas d'écoute de scroll coûteuse).
- Resize **débounced**, `pixelRatio` plafonné à 2.

---

## 🔧 Personnalisation

| Élément | Où le modifier |
|---|---|
| Couleurs | variables CSS `:root` dans `index.html` |
| Textes | directement dans le HTML |
| Email de contact | rechercher `hello@nextleveldev.example` |
| Densité des particules 3D | constante `COUNT` dans le script |

### Brancher le formulaire de contact

Le formulaire est en démo (aucun backend). Pour recevoir les messages, utilisez un service sans serveur :

- **Formspree** : `<form action="https://formspree.io/f/VOTRE_ID" method="POST">`
- **Netlify Forms** : ajoutez `netlify` à la balise `<form>`.

---

## 🧱 Stack

- HTML5 sémantique · CSS3 (variables, grid, clamp) · JavaScript (ES6+)
- [Three.js](https://threejs.org/) r128 pour la 3D
- Google Fonts : Rajdhani, Inter, JetBrains Mono

## 📄 Licence

Projet personnel NextLevel Dev. Le logo et l'identité de marque restent la propriété de leur auteur.
