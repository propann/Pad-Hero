# Import MIDI — Zik 01

Les trois partitions de **Midnight Concrete** sont regroupées dans `public/midi/zik-01/` et conservées séparément.

## Rôle des fichiers

- **Drums** : base rythmique et première partition jouable ;
- **Bass** : groove grave, futur exercice intermédiaire ;
- **Keyboard** : partie harmonique/mélodique, futur exercice avancé ou mode démo.

## Suite du travail

1. Lire le BPM, les pistes, les mesures et les événements MIDI.
2. Sélectionner les événements utiles pour chaque niveau.
3. Convertir les événements en `beat`, `pad` et `lane`.
4. Valider le mapping réel des 12 pads du K.O. II.
5. Générer les exercices JSON et les tester avec l'horloge Tone.js.

Le dépôt contient donc maintenant les **sources originales**, mais pas encore une conversion automatique qui inventerait un mapping avant le test du hardware.
