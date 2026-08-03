# Pad Hero — suivi de projet

> Version 1.2 · 03 août 2026  
> État : prototype jouable, direction graphique réalignée, validation hardware ouverte.

## Verdict

La base de jeu est exploitable localement : interface React, exercice JSON, scoring et pads virtuels sont présents. Le dépôt avait toutefois un défaut de cohérence visuelle : le CSS distant utilisait encore une ancienne palette vert sombre. Il est maintenant aligné sur les couleurs du produit EP-133 K.O. II.

## Palette officielle

| Usage | Couleur |
|---|---|
| Fond béton | `#E6E4DF` |
| Cartes / panneaux | `#DEDCD6` |
| Signature KO | `#FF4400` |
| Texte / contours | `#1A1A1A` |
| LCD ambre | `#FFB000` |

Les ombres restent franches, sans flou, et l'orange sert de signal d'action. Sinon tout devient orange et le pauvre écran finit en cône de chantier.

## Livré

- structure React/Vite/TypeScript ;
- highway et pads virtuels ;
- scoring `PERFECT / GOOD / MISS` ;
- exercices JSON ;
- rangement des trois MIDI de Midnight Concrete ;
- README et CSS réalignés.

## À vérifier sur machine

- correspondance note MIDI ↔ pad physique ;
- sortie MIDI et mode Preview ;
- latence et compensation ;
- qualité de la lecture audio ;
- comportement après débranchement/rebranchement USB.

## Prochain jalon

Analyser les trois partitions MIDI, puis générer une première version jouable de `Midnight Concrete` en trois niveaux sans écraser les fichiers sources.
