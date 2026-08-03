# Pad Hero / K.O. Rhythm Hero — suivi de commandement

> Version 1.1 · 03 août 2026  
> État : MVP jouable localement, validation hardware encore ouverte

## Mise à jour — organisation et analyse de Zik 1

Les trois partitions `Midnight Concrete` sont présentes sur GitHub et analysées.
La batterie est retenue comme source de l'exercice 1 ; basse et clavier sont
conservés pour les niveaux suivants. Le rapport détaillé est dans
`docs/ZIK01_EXERCISE_ANALYSIS.md`.

## 1. Verdict actuel

Pad Hero n’est plus une simple maquette : la boucle de jeu existe, compile et peut être testée avec les pads virtuels. Le projet reste toutefois au stade **prototype hardware contrôlé** : le mapping exact du K.O. II, les vrais fichiers audio Suno et les mesures de latence doivent encore être validés sur la machine physique.

## 2. Ce qui est réellement livré

| Bloc | État | Preuve / limite |
|---|---:|---|
| React, Vite, TypeScript | ✅ | `npm run build` validé |
| Architecture séparée | ✅ | `core/midi`, `core/audio`, `core/engine`, composants |
| Horloge Tone.js | ✅ | BPM du niveau injecté dans `Tone.Transport`; temps de session dérivé de `Tone.Transport.seconds` |
| Count-in | ✅ | 4 temps avec `Tone.MembraneSynth` avant le temps musical 0 |
| Highway Canvas | ✅ | 12 voies, groupes A/B/C/D, hit zone et notes descendantes |
| Scoring | ✅ | `PERFECT`, `GOOD`, `MISS`, combo, meilleur combo, précision |
| Auto-MISS | ✅ | Note marquée une seule fois après `max(goodMs, 70)` |
| Reset de session | ✅ | START, STOP, RESTART réarment notes et score |
| Pads virtuels | ✅ | 12 pads testables sans K.O. II |
| MIDI IN | ✅ | Note On, vélocité, canal, observations de calibration |
| MIDI OUT | ✅ | Détection de sortie, Note On / Note Off |
| Preview K.O. II | ✅ | Séquence JSON envoyée après le count-in |
| Lecture audio | ✅ | Fichier local MP3/WAV + aperçu + lecture synchronisée |
| Exercices JSON | ✅ | `first-groove`, `medium-groove`, `hard-groove` |
| Design TE / EP-133 | ✅ | Palette béton, orange KO, grille et ombres franches |
| Fichiers audio Suno réels | ⬜ | Les JSON pointent vers des fichiers absents de Git |
| Mapping K.O. II confirmé | ⬜ | Calibration physique indispensable |
| Import MIDI | 🟡 | 3 partitions analysées ; exercice 1 pédagogique généré, extraction tick-par-tick encore à valider localement |
| Progression / niveaux | ⬜ | Un seul niveau est chargé par `App.tsx` |
| Docker / Raspberry Pi kiosk | ⬜ | Non commencé |

## 3. Architecture actuelle

```text
K.O. II ──USB-MIDI──► useWebMidi ──PadHit──► scoring
   ▲                         │                  │
   │ MIDI OUT                │                  ▼
   └──── Preview JSON ◄──── App.tsx ◄──── Tone.Transport
                                      │
                                      ├── Canvas 12 voies
                                      └── Player MP3/WAV
```

Règle d’or : Tone.js porte le temps musical. Canvas ne fait que l’échantillonner à chaque image et le MIDI fournit les événements de frappe ; aucun de ces deux blocs ne doit devenir une horloge concurrente.

## 4. Points à valider avant de parler de version fiable

1. Brancher le K.O. II dans Chromium et vérifier l’entrée et la sortie réellement sélectionnées.
2. Frapper les 12 pads, groupe par groupe, et remplacer la table provisoire `KO2_MIDI_MAP` si nécessaire.
3. Déposer une vraie piste Suno dans `public/audio` et vérifier son offset au premier temps.
4. Tester PERFECT/GOOD/MISS avec des frappes simulées puis physiques.
5. Mesurer la latence USB-MIDI et audio, puis documenter une compensation si elle est stable.
6. Tester débranchement/rebranchement USB et refus d’autorisation WebMIDI.

## 5. Prochain ordre de mission

### Priorité 1 — Validation réelle

- [ ] Test K.O. II complet IN/OUT.
- [ ] Verrouillage du mapping par groupe A/B/C/D.
- [ ] Test de lecture avec un MP3/WAV Suno réel.
- [ ] Vérification de l’alignement audio / highway / frappe.

### Priorité 2 — Solidification logicielle

- [ ] Extraire la session dans `core/engine/session.ts`.
- [ ] Ajouter des tests automatisés du scoring et des auto-MISS.
- [ ] Remplacer les `setTimeout` de démonstration par des événements planifiés par Tone.Transport.
- [ ] Ajouter reconnexion MIDI et choix explicite d’un port lorsqu’il y en a plusieurs.
- [ ] Ajouter `offsetMs`, `countInBars` et `timeSignature` au contrat réellement consommé par le loader.

### Priorité 3 — Produit pédagogique

- [ ] Sélecteur de niveaux.
- [ ] Quatre parcours : pouls, découpage, indépendance, groove mélodique.
- [ ] Écran de résultat avec Rush / Drag et historique local.
- [x] Importer les trois partitions MIDI de la zik 1 sur GitHub.
- [x] Comparer leurs BPM, pistes, notes, durées et densités.
- [x] Désigner la batterie comme partition principale de l'exercice 1.
- [x] Générer le JSON jouable de départ des quatre premières mesures.
- [ ] Remplacer la grille de départ par l'extraction tick-par-tick exacte lorsque les MIDI sont présents localement.

### Priorité 4 — Station autonome

- [ ] Dockerfile Nginx.
- [ ] Script Chromium `--kiosk`.
- [ ] Test WebMIDI et audio sur Raspberry Pi.
- [ ] Mode hors-ligne et écran de maintenance.

## 6. Critère de passage MVP hardware

Le MVP sera considéré validé lorsque le même exercice fonctionnera trois fois de suite avec les pads virtuels, trois fois avec le K.O. II, sans dérive visible, avec une piste audio réelle, un mapping confirmé et un build reproductible par `npm run build`.

## 7. Règles de travail

- `core/midi` ne calcule pas le score.
- `core/audio` ne connaît pas React.
- `core/engine` ne dessine rien.
- Les composants orchestrent et affichent.
- Une note MIDI supposée n’est jamais présentée comme une mesure hardware confirmée.

## 8. Organisation de la zik 1 — trois partitions MIDI

Les trois fichiers appartiennent à la même musique. Ils ne doivent pas être fusionnés automatiquement : une partition peut contenir la batterie, une autre la basse ou la mélodie, et la troisième un arrangement complet.

Organisation prévue :

```text
public/
├── audio/
│   └── zik-01/                  # MP3/WAV Suno de la musique 1
├── midi/
│   └── zik-01/
│       ├── partition-01.mid
│       ├── partition-02.mid
│       └── partition-03.mid
└── exercises/
    └── zik-01-*.json            # exercices générés après analyse
```

Procédure obligatoire avant intégration :

1. relever le BPM et la métrique de chaque fichier ;
2. lister les pistes et leurs instruments ;
3. vérifier si les trois partitions commencent au même temps zéro ;
4. repérer les doublons et les écarts de quantification ;
5. choisir la version servant de partition jouable ;
6. conserver les autres comme références ou niveaux complémentaires.

Tant que les fichiers ne sont pas présents, aucun mapping de notes ni aucun exercice final ne doit être inventé.
