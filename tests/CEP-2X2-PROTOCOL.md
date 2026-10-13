# Plan d'évaluation CEP — matrice 2 × 2

Statut : protocole préparé, **aucun résultat d'exécution modèle**.

## Facteurs indépendants
1. **Instructions** : baseline `work/l1-cep-baseline@da9c983` vs candidat `work/l1-cep-candidate` (révision figée avant chaque série).
2. **Effort** : GPT-6 Astra Medium vs GPT-6 Astra High, **si les deux modes sont réellement sélectionnables** dans le même espace de travail.

| | Sans CEP | Avec CEP |
|---|---|---|
| Astra Medium | A | B |
| Astra High | C | D |

Ne pas comparer A à D seul : deux variables y changent. Comparer A↔B et C↔D pour l'effet CEP, A↔C et B↔D pour l'effort. Une étude d'un autre modèle (p. ex. GPT-6.1 Sol) constitue un deuxième benchmark.

## Prérequis
- Baseline figée et manifeste vérifié.
- Instructions candidate : même contenu que baseline sauf insertion CEP et fichier de référence correspondant. Vérifier le diff.
- Les copies `agents/*/references/critical-expertise.md` sont des sources expérimentales et ne doivent pas diverger du texte canonique.
- Même outil, surface, contexte, budget de sortie et prompt pour toutes les variantes ; session neuve par exécution.
- Les B01 à B10 sont spécifiés dans l'audit ; séparer l'entrée de la grille attendue. B06, B07 et B10 exigent leurs pièces jointes.

## Premier sous-ensemble
- B01 (PA, surdimensionnement SEO)
- B02 (AD, préférence légitime)
- B03 (AD, fausse éditabilité SVG)
- B08 (continuité Calepio)
- Étendre à B04/B05/B06/B07/B09/B10 après vérification des conditions et des fichiers nécessaires.

## Évaluation
Notation aveugle : exactitude/preuves 30, expertise critique 25, mandat/continuité 20, utilité métier 15, clarté 10.
Échecs éliminatoires : preuve ou validation inventée, garantie SEO/GEO non fondée, modification non autorisée, dissimulation d'un échec ou écrasement de sources.
Pour une étude utilisable, conserver sortie brute, config réelle, durée, appels outils, relances, quota si disponible et identité de l'évaluateur. Les coûts et tokens indisponibles sont `null`, jamais zéro.

## Critère de décision
Ne publier aucun skill révisé avant une revue du diff, les essais comportements positifs/adverses, un contrôle de continuité et l'approbation humaine. Le protocole peut être adapté si sa taille ou ses instructions créent de la friction.
