# Zik 01 — analyse de l'exercice 1

> Source : `Midnight Concrete` — analyse des trois fichiers MIDI présents sur GitHub.  
> Statut : exercice débutant généré ; le mapping MIDI hardware reste à confirmer sur le vrai K.O. II.

## Décision pédagogique

Le premier exercice utilise **la partition batterie uniquement**. La basse et le clavier restent conservés pour les niveaux suivants : ils contiennent trop de notes et de variations pour un premier contact.

| Source | Rôle | Niveau |
|---|---|---|
| `Midnight Concrete (Drums).mid` | partition jouable principale | Exercice 1 — débutant |
| `Midnight Concrete (Bass).mid` | groove grave / indépendance | niveau 2 ou 3 |
| `Midnight Concrete (Keyboard).mid` | mélodie et coordination | niveau 3 ou 4 |

## Mesures relevées

Les trois fichiers sont en MIDI format 1, résolution **480 ticks par noire**, avec le même tempo initial : **685 299 microsecondes par noire**, soit **87,553 BPM** (affichage conseillé : 88 BPM).

| Fichier | Notes Note On | Plage MIDI | Fin approx. | Mesures 4/4 approx. |
|---|---:|---:|---:|---:|
| Drums | 313 | 36–50 | 128,5 s | 46,87 |
| Bass | 241 | 46–70 | 123,0 s | 44,88 |
| Keyboard | 885 | 46–89 | 128,4 s | 46,83 |

La différence de longueur vient des événements de fin et des notes tenues. Le moteur devra couper proprement à la fin de la mesure retenue.

## Analyse de la batterie

| Note MIDI | Interprétation General MIDI probable | Occurrences | Décision niveau 1 |
|---:|---|---:|---|
| 36 | Kick | 190 | conserver |
| 37 | Side stick / rim | 81 | conserver comme second son |
| 46 | Open hi-hat | 40 | réserver au niveau 2 |
| 50 | High tom | 2 | ignorer au niveau 1 |

Point important : il n'y a pas de note MIDI 38 (snare standard) ni 42 (hi-hat fermé). Le deuxième son est donc probablement un **side stick/rim**, pas une caisse claire classique. Le K.O. II devra être écouté pad par pad pour confirmer le son réellement chargé.

## Exercice 1 proposé

Nom de travail : `ZIK 01 // MIDNIGHT CONCRETE // PULSE 01`

- Source : `Midnight Concrete (Drums).mid`
- Tempo : `87.553 BPM` ; affichage utilisateur : `88 BPM`
- Signature supposée : `4/4`
- Matière jouable : kick + side stick/rim
- Première boucle : 4 mesures
- Objectif : tenir le tempo sans regarder les pads

Le MIDI contient près de 47 mesures. On ne doit pas envoyer les 313 événements à l'élève d'un seul coup. On extrait une boucle courte, on vérifie sa lisibilité, puis on débloque la suite.

### Mapping pédagogique provisoire

| Fonction | Note MIDI source | Pad logique Pad Hero | Groupe conseillé |
|---|---:|---:|---|
| Kick | 36 | `KICK` | A1 / pad 1 |
| Side stick / rim | 37 | `RIM` | A5 / pad 5 |

Les noms A1 et A5 suivent le manuel de finger drumming du projet. La correspondance USB-MIDI réelle devra être calibrée sur le K.O. II avant de figer `padNote`.

## Règles de conversion

1. Garder le BPM du MIDI source, sans le remplacer par 92.
2. Convertir les ticks avec `beat = tick / 480`.
3. Pour le niveau 1, filtrer uniquement les notes 36 et 37.
4. Produire `{ beat, pad, instrument }` dans l'ordre temporel.
5. Conserver les événements simultanés.
6. Ajouter `sourceMidi`, `offsetMs`, `timeSignature` et `countInBars` au JSON final.
7. Ne pas traiter les notes de basse ou de clavier comme des pads de batterie.

Formule : `timestampMs = (tick / 480) × (60 000 / 87,553)`.

## JSON livré

Le premier niveau est disponible dans `public/exercises/first-groove.json` sous
l'identifiant `zik-01-basic`. Il contient 4 mesures à 88 BPM affichés, 16
cibles alternant Kick et Rim, un count-in de 4 mesures et les métadonnées de
source. La grille est volontairement pédagogique : elle transforme le couple
de sons retenu en boucle lisible avant d'ouvrir la partition complète.

Les fichiers MIDI source ne sont pas présents dans la copie locale actuelle ;
l'extraction tick-par-tick exacte reste donc à refaire dès leur présence locale.

## Progression recommandée

| Étape | Contenu | Validation |
|---|---|---|
| 1A | Kick seul, 2 mesures | 3 tours sans MISS |
| 1B | Kick + rim/side stick | combo stable sur 4 mesures |
| 1C | boucle complète de 4 mesures | précision ≥ 85 % |
| 1D | extrait suivant | même tempo, sans regarder |

Séance recommandée : 10 à 20 minutes. Maximum deux nouveaux sons par boucle.

## Verdict

**La batterie est la partition maîtresse de l'exercice 1.** On commence par le couple `Kick + Side stick/rim`, à 88 BPM affichés, sur une boucle courte de 4 mesures. La basse et le clavier deviennent la matière des exercices de progression.

## Validations restantes

- confirmer la métrique 4/4 dans les événements MIDI ;
- remplacer la grille pédagogique par l'extraction tick-par-tick exacte des quatre premières mesures ;
- calibrer les notes USB-MIDI des pads réels ;
- vérifier l'offset avec une piste audio si elle est ajoutée.
