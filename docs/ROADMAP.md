# Roadmap — AI-Workflow

**Statut au 14 octobre 2026 :** PA/AD préparés pour revue de livraison dans `work/release-pa-ad-l3-clarte-v0.1` ; `main` et skills installés inchangés.

- **L0 — Audit et baseline :** audit initial du 11 octobre 2026 ; 33 sources PA/AD importées et préservées dans `work/l1-cep-baseline` (`da9c983`). Le manifeste est un instantané de cette baseline.
- **L1 — CEP :** candidat et comparaisons expérimentales conservés sur branches dédiées, **non intégrés** à la livraison PA/AD.
- **L2 — Copywriter SEO/GEO :** spécialisé et séparé, **en pause** ; aucune installation. Le micro-patch distinct de **clarté rédactionnelle PA/AD** (`7c97e46`) est, lui, repris dans la livraison.
- **L3 — Brand Identity adaptative :** v0.2 (`b8df4ea`) retenue comme décision normative ; intégrée avec la clarté dans `a5c386b`. Guide de marque requis lors d'une création d'identité, profondeur Essential/Standard/Advanced adaptative. Pilote graphique exploratoire réalisé ; comparaison A/B isolée non exécutée, bénéfice causal non établi.
- **L4 — Starter :** aucune modification ou intégration technique ; Starter 0.25.1 reste indépendant.
- **L5 — Usage réel :** vérifier les critères d'acceptation de PA/AD sur un projet autorisé après décision de mise en service, sans assimiler ce contrôle à un benchmark causal.

## Frontières

PA possède le cadrage produit et son handoff v1 ; AD dirige l'identité et les supports de marque ; Copywriter reste hors périmètre actif ; Starter assure l'exécution dans son dépôt et son runtime distincts. Un seul backlog d'exécution dans Starter. Le schéma v1 du package produit n'est pas modifié.

Les règles de transfert vers Starter **contenues dans PA** sont conservées comme compétences de PA, sans embarquer ou activer le runtime Starter. CEP, ses tests et Copywriter sont exclus des fichiers de la branche de livraison.

## Gouvernance et preuves

- Baseline `da9c983` et branche d'intégration `a5c386b` préservées ; branche de livraison basée sur `main` afin de limiter son historique aux seuls éléments retenus.
- Avant fusion : inspecter la liste complète de fichiers et leurs empreintes Git, la présence des références de skills et l'absence d'ajouts CEP/Copywriter/Starter.
- Ne pas confondre revue textuelle, pilote de faisabilité, benchmark A/B, installation de skill et déploiement.
- **Fusion vers `main` et installation des agents uniquement après autorisation explicite.**
