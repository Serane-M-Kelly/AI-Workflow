# Transmission au Universal AI Project Starter

## Contrat maintenu

Cible vérifiée : contrat `project-architect-product-package`, version 1, du starter 0.20.1. Le schéma [product-package-v1.schema.json](product-package-v1.schema.json) est une copie exacte du contrat fourni avec cette distribution. Il sert à composer le manifeste, pas à déclarer un nouveau standard. Vérifier la version du starter cible ; en cas de différence, examiner son contrat réel avant d’adapter. Ne pas ajouter silencieusement des champs v2 à un manifeste v1.

Le dossier est un instantané de transmission. Il n’exige pas que chaque partie du produit soit validée. Le statut `ready_for_intake` signifie prêt à être reçu, pas approuvé, prêt à déployer ou marché validé.

## Préparer les sources

Assembler le travail déjà réalisé. Utiliser les décisions et preuves accessibles avec leur portée, leur attribution réelle, la date connue et la version concernée. Les inconnues restent des inconnues. Ne pas compléter un dossier avec de faux tests pour le rendre importable.

Les dix fichiers sont imposés par le contrat d’import, pas par le parcours de chaque séance. Un document non applicable peut être court et expliquer pourquoi. Éviter les placeholders et les contenus vides. Les documents de synthèse référencent les sources propriétaires et la version de l’export.

Garder chaque document proportionné à l’information disponible. Placer la provenance commune dans le Passport et référencer les règles ou exclusions déjà définies, plutôt que répéter leur liste dans chaque fichier. Pour une petite expérimentation, plusieurs documents peuvent tenir en quelques lignes. Présenter à Kelly le dossier, son état et les limites utiles, sans réciter les dix documents.

| Fichier exact | Contenu minimal utile |
|---|---|
| PROJECT_PASSPORT.md | Travail concerné, état réel, résultat, mandat et index des sources |
| EVIDENCE_REGISTER.md | Hypothèses, sources, observations et limites ; absence de preuve explicitée |
| PRODUCT_STRATEGY.md | Besoin, cible, positionnement, inclus/exclus et hypothèses économiques applicables |
| UX_FLOWS.md | Parcours, règles, états applicables, fin réussie et critères testables |
| PROTOTYPE_BRIEF.md | Question testée, version du support, lien vers dossier visuel et sources ; absent si non nécessaire |
| VALIDATION_REPORT.md | Tests/observations effectivement réalisés, versions et limites ; sinon ce qui reste à faire |
| DECISION_LOG.md | Décisions acceptées distinctes des propositions, auteur/source/date connue/portée |
| OPEN_QUESTIONS.md | Questions, impact et prochaines actions ; distinguer bloquantes et indépendantes |
| REVIEW_REPORT.md | Avis réel et attribution/version ; revue non réalisée si absente |
| BUILD_HANDOFF.md | Périmètre engagé, règles, critères, contraintes, dépendances produit et références pour Setup/Plan |

Pour une refonte ou une évolution, décrire le produit existant dans le Passport et le périmètre du changement dans le handoff. Les états v1 (`initial_idea`, `discovery`, `concept_defined`, `prototype_tested`, `ready_to_build`) décrivent le travail transmis ; ne pas inventer `launched` dans le manifeste ni effacer l’existence de l’application.

Pour les parcours concernés, appliquer [conversion-and-compliance.md](conversion-and-compliance.md) : objectif et mesure dans PRODUCT_STRATEGY, règles dans UX_FLOWS, sources officielles datées dans EVIDENCE_REGISTER, références visuelles dans PROTOTYPE_BRIEF. BUILD_HANDOFF référence les exigences propriétaires, leur applicabilité, leurs critères observables et les vérifications attendues du starter ; OPEN_QUESTIONS conserve les inconnues et leur impact. Distinguer vérification prévue et résultat observé dans VALIDATION_REPORT. Ne pas créer de onzième document obligatoire, de second backlog ni de champ supplémentaire au manifeste v1.

Pour la visibilité des pages publiques, appliquer [search-visibility.md](search-visibility.md) : carte des pages et objectifs dans PRODUCT_STRATEGY, baseline et sources dans EVIDENCE_REGISTER, critères de réalisation/migration/publication et suivi référencés dans BUILD_HANDOFF. Les preuves techniques et performances observées restent distinctes. Aucun livrable SEO supplémentaire n’est obligatoire ; préserver le contrat v1.

## Manifeste

Lire le schéma et fournir tous ses champs. Ne pas changer le nom du projet pour satisfaire l’import : il doit correspondre au workspace voulu. Conserver `package_id`, incrémenter `package_version` pour un contenu modifié, et renseigner `supersedes` avec la référence de l’ancien dossier si applicable. Conserver l’historique ; un dossier déjà produit n’est pas écrasé.

- `created_at` et `updated_at` : date réelle de production du dossier ; requises pour `ready_for_intake`. Les dates d’événements historiques restent dans les documents, sans invention.
- `producer` : auteur et surface réellement utilisés.
- `evidence` : recherche publique, validation humaine et présence de matériel synthétique déclarées honnêtement. Une maquette remplie de témoignages fictifs constitue du matériel synthétique ; ne pas la faire passer pour une preuve.
- `prototype` : état réel et référence canonique s’il existe ; une image seule ne prouve pas un prototype testé.
- `review` : `not_started` si la revue indépendante n’a pas eu lieu ; un assemblage vérifié par script ne devient pas `passed`. Une revue `changes_requested` empêche l’import prêt.
- `confidentiality` : classification et données réellement présentes ; inclure seulement les fichiers nécessaires au transfert.
- `contents` : les dix chemins exacts du tableau.

Un dossier visuel peut être joint dans `design/`. Le référencer depuis PROTOTYPE_BRIEF et BUILD_HANDOFF, sans ajouter de propriété au manifeste strict. Vérifier les liens locaux et identifier les références externes inaccessibles. Préserver les ressources modifiables ; les PDF et captures sont des exports de présentation.

## Assemblage reproductible

Le script `scripts/product-package.mjs` utilise Node >=22 et des modules intégrés. Il ne génère ni récit, ni approbation, ni statut : l’agent fournit les informations établies dans un fichier JSON d’entrée :

```json
{
  "manifest": { "...": "objet complet conforme au schéma v1" },
  "documents": { "PROJECT_PASSPORT.md": "texte réel", "...": "les neuf autres documents" },
  "attachments": [{ "source": "./sources/maquette.html", "path": "design/maquette.html" }]
}
```

Ce bloc illustre la structure de l’entrée, ce n’est pas un fichier exécutable complet. Les sources des pièces jointes sont des fichiers explicitement sélectionnés, relatifs au JSON d’entrée ou absolus. Ne pas sélectionner un dossier de secrets ou l’ensemble d’un workspace. Le parent de la sortie doit exister ; la sortie doit être nouvelle.

Depuis le dossier du skill, en remplaçant les chemins par ceux réellement accessibles :

```bash
node scripts/product-package.mjs build --input /chemin/dossier-source.json --output /chemin/product-package-v1 --starter /chemin/distribution-starter
```

Avec `--starter`, le script appelle `inspectProductPackage` du moteur compilé de cette distribution : schéma, fichiers, sémantique et avertissements réels. Il nettoie uniquement sa nouvelle sortie si l’assemblage échoue et refuse d’écraser une sortie existante. Les noms de secrets potentiels sont refusés ; aucun détecteur ne garantit l’absence de secret dans le contenu. Examiner les pièces réellement sélectionnées.

L’outil contrôle aussi les dates du calendrier : certaines versions du moteur normalisent une date impossible au lieu de la refuser. Ce contrôle supplémentaire ne constitue pas une nouvelle version du contrat.

Sans distribution accessible, omettre `--starter` permet l’assemblage avec un précontrôle seulement. Le script annonce `preflight_only` : ne pas présenter cela comme une validation du schéma ou un import réussi. Rechercher la distribution dans les ressources du projet si disponible ; sinon conserver cette limite et fournir le dossier à vérifier avant import. Ne pas installer automatiquement une version arbitraire pour déclarer le test passé.

Vérifier ensuite avec le vrai moteur lorsque disponible :

```bash
node scripts/product-package.mjs check --package /chemin/product-package-v1 --starter /chemin/distribution-starter
```

Traiter les erreurs avant la transmission. Les avertissements sur l’absence de revue ou de validation utilisateur peuvent rester des limites explicites lorsque le risque accepté le permet ; ne pas inventer ces validations pour les supprimer. Lire les documents afin de vérifier leur cohérence sémantique, que le schéma ne démontre pas.

## Réception et modifications ultérieures

Dans un workspace neuf au stade idea/brief, dont le brief est encore brouillon, l’import autorisé utilise :

```bash
node .starter/run.mjs intake import /chemin/product-package-v1 .
```

L’import archive les sources ; il n’approuve pas le brief. Discover comble les lacunes utiles, Handoff vérifie leur traduction, Setup prépare le socle et Plan organise le backlog. Handoff peut reprendre une acceptation humaine réellement accessible couvrant exactement le brief, sans redemander les mêmes choix. Une simple déclaration dans le manifeste ne suffit pas.

Un workspace déjà engagé ou un brief déjà approuvé ne peut pas recevoir ce nouvel import v1 par simple écrasement. Transmettre alors une demande de changement et ses sources selon le workflow existant ; ne pas rétrograder son état ou retirer ses approbations pour contourner cette limite. L’import idempotent vérifie l’identité et les octets ; une nouvelle version ne met pas automatiquement à jour le périmètre actif.
