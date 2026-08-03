# 🎛️ PAD HERO / K.O. RHYTHM HERO

> **Le jeu de rythme qui transforme ton EP-133 K.O. II en professeur de finger drumming.**

Pad Hero est un entraîneur rythmique open source inspiré des jeux de rythme et des machines Teenage Engineering. Une partition défile, tu frappes les pads, et le moteur décide si tu étais **PERFECT**, **GOOD**… ou si le groove a demandé l'asile politique.

![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-interface-61DAFB?style=flat-square&logo=react&logoColor=111111)
![Tone.js](https://img.shields.io/badge/Tone.js-audio-FF4400?style=flat-square)
![MIDI](https://img.shields.io/badge/WebMIDI-K.O.%20II-1A1A1A?style=flat-square)

## Le concept

```text
Partition MIDI  →  moteur de jeu  →  K.O. II
                       ↓
                 score & progression
```

- la partition définit ce qu'il faut jouer ;
- l'horloge audio garde tout le monde à la même heure ;
- le K.O. II reçoit les frappes ;
- le joueur essaie de ne pas transformer un contretemps en accident industriel.

## État réel — 03 août 2026

### Livré

- interface React/Vite/TypeScript ;
- highway rythmique et pads virtuels ;
- score `PERFECT / GOOD / MISS`, combo et précision ;
- exercices JSON ;
- sources MIDI de **Midnight Concrete** rangées dans `public/midi/zik-01/` ;
- interface alignée sur les couleurs du produit : beige `#E6E4DF`, gris `#DEDCD6`, orange `#FF4400`, noir `#1A1A1A`, ambre LCD `#FFB000`.

### En validation

- mapping exact des 12 pads sur le vrai K.O. II ;
- analyse réelle des trois partitions MIDI ;
- latence navigateur / USB-MIDI ;
- présence des backing tracks audio.

### Ensuite

1. convertir les partitions MIDI en exercices débutant, intermédiaire et avancé ;
2. verrouiller le mapping hardware pad par pad ;
3. ajouter la lecture audio et la compensation de latence ;
4. préparer le mode kiosk Raspberry Pi ;
5. ajouter tests et validation automatique des fichiers JSON.

## Démarrer

```bash
npm install
npm run dev
```

Ouvre ensuite l'adresse Vite dans Chrome ou Chromium.

```bash
npm run build
```

## Organisation

```text
src/
├── App.tsx
├── components/
└── core/
    ├── audio/
    ├── engine/
    └── midi/

public/
├── audio/                # MP3/WAV à venir
├── exercises/            # Exercices JSON
└── midi/zik-01/          # Midnight Concrete : drums, bass, keyboard
```

## Zik 01 — Midnight Concrete

- `Midnight Concrete (Drums).mid` — fondation rythmique ;
- `Midnight Concrete (Bass).mid` — mouvement grave et groove ;
- `Midnight Concrete (Keyboard).mid` — partie harmonique et mélodique.

Les MIDI restent des sources de travail et ne sont pas redistribués au-delà de leurs droits respectifs.

## Philosophie

Pas de boîte noire magique : les partitions restent lisibles, les règles sont documentées et le joueur comprend pourquoi il a raté son coup. Un laboratoire de groove, mais avec moins de fumée et davantage de JavaScript.
