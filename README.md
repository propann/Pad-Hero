# 🎛️ PAD HERO / K.O. RHYTHM HERO

> **Le jeu de rythme qui transforme ton EP-133 K.O. II en professeur de finger drumming.**

Pad Hero est un entraîneur rythmique open source inspiré des jeux de rythme et des machines Teenage Engineering. Le principe est simple : une partition défile, tu frappes les pads, et le moteur décide si tu étais **PERFECT**, **GOOD**… ou si le groove a demandé l'asile politique.

![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-interface-61DAFB?style=flat-square&logo=react&logoColor=111111)
![Tone.js](https://img.shields.io/badge/Tone.js-audio-FF4400?style=flat-square)
![MIDI](https://img.shields.io/badge/WebMIDI-K.O.%20II-1A1A1A?style=flat-square)

## Le concept

Pad Hero fait le pont entre trois mondes :

```text
Partition MIDI  →  moteur de jeu  →  K.O. II
                       ↓
                 score & progression
```

- la **partition** définit ce qu'il faut jouer ;
- l'**horloge audio** garde tout le monde à la même heure ;
- le **K.O. II** reçoit les frappes et peut jouer la démonstration ;
- le **joueur** essaie de ne pas transformer un simple contretemps en accident industriel.

## Ce qui existe déjà

- Highway rythmique Canvas avec 12 voies ;
- pads virtuels pour travailler sans brancher la machine ;
- connexion MIDI entrante et sortie MIDI prévue pour le K.O. II ;
- feedback `PERFECT / GOOD / MISS` ;
- combo, précision et décalage moyen ;
- détection automatique des notes manquées ;
- horloge Tone.js comme référence temporelle ;
- pré-roll de quatre temps ;
- exercices décrits en JSON ;
- premières partitions MIDI de **Midnight Concrete** intégrées au dépôt.

## Démarrer le projet

```bash
npm install
npm run dev
```

Ouvre ensuite l'adresse Vite dans Chrome ou Chromium. Le Web MIDI demande un contexte sécurisé et l'autorisation d'accéder au K.O. II.

Pour vérifier la compilation :

```bash
npm run build
```

## Organisation du dépôt

```text
src/
├── App.tsx
├── components/          # Highway, pads et interface
└── core/
    ├── audio/            # Tone.js et horloge maîtresse
    ├── engine/           # Types, chargement et scoring
    └── midi/             # WebMIDI IN / OUT

public/
├── audio/                # Backing tracks MP3/WAV
├── exercises/            # Exercices JSON
└── midi/zik-01/          # Sources MIDI de Midnight Concrete
```

## Zik 01 — Midnight Concrete

Les trois partitions sont conservées séparément pour permettre une vraie analyse pédagogique :

- `Midnight Concrete (Drums).mid` — fondation rythmique ;
- `Midnight Concrete (Bass).mid` — mouvement grave et groove ;
- `Midnight Concrete (Keyboard).mid` — partie harmonique et mélodique.

Elles sont dans [`public/midi/zik-01/`](public/midi/zik-01/). Elles constituent les sources de travail ; le mapping final vers les 12 pads doit encore être validé sur le K.O. II réel.

## Contrat minimal d'un exercice

```json
{
  "id": "first-groove",
  "bpm": 92,
  "bars": 2,
  "targets": [
    { "beat": 0, "pad": 0 },
    { "beat": 2, "pad": 0 }
  ],
  "grading": { "perfectMs": 20, "goodMs": 50 }
}
```

## Direction du projet

1. analyser automatiquement les partitions MIDI ;
2. générer des exercices `BEGINNER / MEDIUM / HARD` ;
3. verrouiller le mapping réel des 12 pads ;
4. ajouter les backing tracks et la compensation de latence ;
5. préparer une version kiosk pour Raspberry Pi.

## Philosophie

Pas de boîte noire magique : les partitions restent lisibles, les règles sont documentées et le joueur comprend pourquoi il a raté son coup. Pad Hero veut rendre le finger drumming plus accessible, sans lui retirer son petit côté “laboratoire clandestin de groove”.

## Licence

Projet en développement. Les fichiers MIDI et éventuels contenus audio restent soumis à leurs droits respectifs ; ils ne doivent pas être redistribués sans autorisation.
