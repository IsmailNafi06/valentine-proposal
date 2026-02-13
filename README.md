# Valentine Proposal (multi-profils)

Le but: **un seul site**, mais **plusieurs versions** (pour ta copine + les copines de tes amis) grâce à un paramètre dans l’URL.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvre ensuite:

- `http://localhost:5173/?p=raghad`
- `http://localhost:5173/?p=ami_exemple&name=Emma`

## Le seul fichier à modifier

Tout se modifie dans: [src/profiles.js](src/profiles.js)

Tu y trouveras:

- `defaultProfileId`: le profil par défaut si `?p=` n’est pas fourni
- `profiles`: un objet avec des profils (ex: `raghad`, `ami_exemple`)

### Créer une nouvelle version pour une fille

1. Dans `profiles`, duplique `ami_exemple`
2. Renomme la clé (ex: `maeva`, `ines`, `sara`)
3. Modifie au minimum:
   - `person.name`
   - `asking.title`, `asking.yesText`, `asking.noText`
   - `accepted.title`, `accepted.loveNote`, `accepted.reasons`

Exemple d’URL pour ce profil:

- `https://TON-DOMAINE.vercel.app/?p=maeva`

### Surcharger juste le prénom (rapide)

Sans toucher au code, tu peux changer le prénom avec `?name=`:

- `https://TON-DOMAINE.vercel.app/?p=ami_exemple&name=Emma`

Si le prénom contient des espaces, remplace-les par `%20`:

- `...&name=Marie%20Claire`

### Mettre des photos

Option A (la plus simple, recommandée): mets tes images dans `public/`.

Ex:

- `public/profiles/maeva/1.jpg`
- `public/profiles/maeva/2.jpg`

Puis dans le profil:

```js
accepted: {
  photos: ['/profiles/maeva/1.jpg', '/profiles/maeva/2.jpg'],
}
```

Option B: importer des images dans `src/assets` et les importer en haut de `src/profiles.js` (comme pour `raghadPhoto1`, etc.).

## Qu’est-ce que tu dois envoyer pour la surprise ?

Tu envoies **juste un lien**.

- Pour ta copine: `https://TON-DOMAINE.vercel.app/?p=raghad`
- Pour une autre: `https://TON-DOMAINE.vercel.app/?p=maeva`

Astuce “ultra rapide” si tu ne veux pas créer plein de profils: utilise `ami_exemple` + `&name=`.

## Déployer sur Vercel (vite)

1. Pousse le code sur GitHub (ou GitLab)
2. Sur Vercel: **Add New Project** → importe le repo
3. Vercel détecte Vite automatiquement, sinon mets:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

Ensuite, à chaque `git push`, Vercel redéploie.

Note: l’autoplay YouTube peut être bloqué sur certains téléphones/navigateurs (comportement normal). Le reste marche.
