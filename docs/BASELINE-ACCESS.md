# Baseline PA / AD — état d'accès et provenance

**Audit initial :** 11 octobre 2026. **Actualisation documentaire :** 14 octobre 2026 (branche de livraison, non fusionnée).

## Source auditée en amont

Rapport : « Audit PA · AD · Universal AI Project Starter », v1.0 du 11 octobre 2026.
- PA : `project-architect`, skill ID `skill-6a70fe245a988191877af33d3b5a2fb2`.
- AD : `art-director`, skill ID `skill-6aa04dcc96608191802663af44718ec9`.
- Starter audité séparément : 0.25.1, commit `2890b5eb37675427ced4005c57e699165c85d12b`.
- Le rapport d'audit indique 33 fichiers PA/AD et 271 tests CI réussis sur le Starter ; ces tests ne sont pas rejoués par cette livraison.

## Historique de l'accès et import de la baseline

Le 11 octobre, les skills installés n'étaient pas accessibles par l'outil de liste dans la session d'audit. Les empreintes ne suffisaient pas à reconstituer les fichiers : l'import était alors en attente de leurs octets sources.

**État établi depuis :** les 33 fichiers PA/AD ont été importés et conservés dans `work/l1-cep-baseline`, commit immuable `da9c9830933eb85551b51f2c618bdf41d6375f50`. Le fichier `docs/BASELINE-MANIFEST.json` consigne les empreintes SHA-256 de cette **baseline historique**, pas celles des fichiers évolués. Ses 33 entrées restent inchangées. La branche baseline n'est pas modifiée par la livraison.

## Préparation de la livraison

- **Source exacte des 33 fichiers PA/AD livrables :** `work/l3-clarte-integration-v0.1`, commit `a5c386bd7a5161a01a7a955077fd9fbf80f61c82`, combinant clarté PA/AD et L3 v0.2.
- **Branche de préparation :** `work/release-pa-ad-l3-clarte-v0.1`, créée depuis `main` pour éviter d'importer l'historique de travaux expérimentaux.
- La livraison réutilise les **objets de fichiers Git identiques** à la source approuvée, hormis les trois documents historiques actualisés dans la branche de préparation.
- Les éléments `shared/cep/` et `tests/CEP-*` ne font pas partie de la livraison ; CEP reste expérimental. Copywriter et le runtime du Starter ne sont pas importés.
- Les références PA relatives au **transfert vers le Starter** restent incluses, car elles appartiennent à PA ; elles n'installent et ne modifient pas le Starter.
- **`main` et les skills installés ne changent pas** tant qu'aucune fusion ou installation n'a été explicitement autorisée.

## Portée des vérifications

L'identité des fichiers sources, le périmètre Git et l'intégration textuelle peuvent être contrôlés indépendamment. Les essais graphiques L3 antérieurs constituent des preuves de faisabilité limitées ; le test A/B contrôlé n'a pas pu être exécuté. Aucune supériorité comportementale de L3 n'est démontrée. Les tests du Starter et une installation réelle des skills ne sont pas inclus dans cette préparation.

**Avant mise en service :** revue du diff de livraison contre `main`, décision explicite de fusion, puis installation/actualisation des skills actifs séparément si autorisée.
