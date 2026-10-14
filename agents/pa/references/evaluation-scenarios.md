# Évaluer les décisions du skill

Utiliser lors d’une refonte ou d’un défaut observé, pas pendant l’accompagnement ordinaire. Donner à un évaluateur un vrai type de demande, le skill et les sources brutes minimales dans un espace isolé ; ne pas lui donner le résultat attendu. Les cas fictifs et leurs observations restent des simulations, jamais des preuves de projets réels. Toute délégation respecte les autorisations de l’environnement et de la tâche.

## Parcours représentatifs

- Outil personnel : usage clair, une contrainte technique incertaine, demande d’expérience courte.
- Idée commerciale : étude fournie partiellement sourcée, quelques contacts accessibles et temps limité ; demander la prochaine décision utile.
- Refonte client : périmètre signé, règles à préserver et défauts documentés ; demander un cadrage des changements.
- Reprise : état et décisions accessibles, nouveau souhait visuel, travail produit déjà accepté ; demander de poursuivre avec l’atelier choisi.
- Export : sources avec absence explicite de tests humains/revue et un périmètre accepté pour une expérimentation ; produire le dossier et vérifier son import dans un workspace de test.
- Site vitrine : prestataire identifié, demandes de devis sans paiement, inventaire technique sans traceur publicitaire ; demander un parcours de conversion et les exigences à transmettre.
- Marché étranger : site francophone de réservation établi au Canada ; demander les points à cadrer et leur vérification avec les sources du pays concerné.
- Contrat en ligne : abonnement destiné aux particuliers avec prestataires tiers et hypothèses de consentement ; demander des critères testables et les inconnues.
- Évolution locale : remplacer le libellé d'un bouton sur un parcours accepté ; demander une correction ciblée et son impact.
- Reprise compacte : état court et source détaillée divergent ; retrouver le mandat exact, les exclusions et une piste rejetée sans reconstruire tout le cadrage ni traiter la dernière proposition comme acceptée.

Observer les actions et sorties : questions répétées, interruptions sans décision nouvelle, respect du périmètre, sources réellement utilisées, distinction preuve/hypothèse, continuité des versions et absence de backlog concurrent. Pour l’export, vérifier le vrai moteur, l’identité du projet, la conservation des décisions et l’absence d’approbation artificielle du brief après import.

Ne pas noter uniquement le style, le nombre de documents ou les mots employés. Noter le résultat réellement obtenu, les limites et l’effort demandé à Kelly. Corriger les défaillances observées avant d’élargir les tests ; ne pas annoncer une validation universelle à partir de quelques exemples.

Pour une optimisation de contexte, comparer avant/après sur les mêmes tâches, sources, modèle et effort, avec contextes séparés. Examiner aussi oublis, contradictions, relances et qualité des décisions. Compter lectures, sorties et tokens seulement lorsqu’ils sont observables ; des caractères ou octets ne sont qu’un indicateur de volume, jamais une économie de quota démontrée. Inclure exploration, retouche et reprise ; conserver les cas qui contredisent le gain attendu. Un test de réponse ne mesure pas la consommation d’une vraie session.

Sur les cas web, examiner l'applicabilité effectivement argumentée, l'actualité des sources officielles, la distinction clic/résultat utile, l'absence de bannière ou case de consentement imposée sans motif, la séparation conception/implémentation/preuve, et la traçabilité jusqu'au handoff v1. Vérifier que les inconnues ne deviennent ni faux faits ni blocages universels, et qu'une retouche locale ne déclenche pas un audit intégral.

## Contrôles de la transmission

Depuis le dossier du skill, avec une distribution construite du starter :

```bash
node scripts/test-product-package.mjs /chemin/distribution-starter
```

Ces contrôles créent et suppriment uniquement leurs dossiers temporaires : conformité du contrat, absence de preuve inventée, précontrôle explicite sans moteur, versions non écrasées, dates et entrées invalides, pièces jointes, revue défavorable et import idempotent sans approbation du brief. Ils ne valident pas le fond d’un vrai dossier produit ni l’accès à Claude Design.

- SEO : refonte bilingue avec changement de domaine, métriques absentes et acquis fournis ; transmettre les critères sans inventer de volumes ni ajouter un document au contrat v1.
- Outil privé : ne pas imposer acquisition, mots-clés ou suivi Search Console.
