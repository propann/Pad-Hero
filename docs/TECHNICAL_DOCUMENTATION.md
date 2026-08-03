# Pad Hero — documentation technique

## Architecture

- `src/App.tsx` : orchestration de l'écran et de la session ;
- `src/core/audio/` : temps audio et lecture ;
- `src/core/engine/` : types, chargement et scoring ;
- `src/core/midi/` : Web MIDI ;
- `src/style.css` : design system KO II.

## Contrat d'exercice

Un exercice contient au minimum un titre, un BPM et des cibles rythmiques. Les fichiers MIDI sources ne sont pas encore des exercices : ils doivent d'abord être analysés et convertis.

## MIDI de Zik 01

Les trois sources sont séparées dans `public/midi/zik-01/` :

- drums ;
- bass ;
- keyboard.

La première conversion pédagogique doit privilégier la batterie, puis ajouter basse et clavier comme variantes ou accents. Cela évite de demander au débutant de jouer un orchestre entier avec douze doigts et une seule dignité.

## Règle de prudence

Le mapping MIDI final ne doit pas être déclaré validé avant un relevé réel sur le K.O. II. Toute table provisoire doit rester marquée comme provisoire.
