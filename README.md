# PAD HERO

Un entraîneur rythmique open source pour le Teenage Engineering EP-133 K.O. II.

Pad Hero transforme les frappes MIDI en jeu : le joueur suit une grille rythmique, reçoit un retour Perfect / Good / Miss et progresse exercice par exercice. Les backing tracks Suno sont prévues comme couche audio optionnelle ; les patterns restent décrits en JSON pour être éditables à la main ou générables depuis un MIDI.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir l'URL Vite dans Chrome, brancher le K.O. II en USB-MIDI, puis cliquer sur la connexion MIDI. Le navigateur demande l'autorisation d'accès à l'appareil.

## Architecture initiale

- `src/main.jsx` : interface et orchestration de la session.
- `src/core/` : logique pure destinée à devenir le moteur de scoring et de timing.
- `public/exercises/` : exercices JSON versionnables.
- `public/audio/` : emplacement des backing tracks locales, non incluses dans Git.

## Contrat d'un exercice

```json
{
  "id": "first-groove",
  "bpm": 92,
  "bars": 2,
  "targets": [{ "beat": 0, "pad": 0 }],
  "grading": { "perfectMs": 20, "goodMs": 50 }
}
```

Le mapping de départ utilise les notes General MIDI courantes : kick 36, snare 38, closed hi-hat 42, open hi-hat 46. Le mapping sera configurable dans une prochaine étape pour couvrir les banques et groupes du K.O. II.

## Feuille de route

1. Stabiliser le mapping K.O. II et afficher les appareils MIDI entrants.
2. Extraire le moteur de scoring dans `src/core` avec tests automatisés.
3. Ajouter métronome et backing track Web Audio avec compensation de latence.
4. Importer un MIDI et générer un exercice JSON.
5. Ajouter niveaux, historique local, streak et éditeur de patterns.

## Limites du MVP

Le Web MIDI nécessite un navigateur Chromium et une page servie en contexte sécurisé. Les boutons à l'écran simulent les pads pour tester sans matériel. La précision dépend du timestamp fourni par le navigateur et de la latence USB/audio de la machine.
