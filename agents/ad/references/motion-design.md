# Concevoir et diriger le mouvement

## Partir d’une intention observable

Assumer la direction du mouvement et sa conception, de la proposition à la revue du rendu. Partir du support actuel, de son identité, de l’action et du ressenti recherchés. Face à « le site manque de vie », inspecter ce qui existe puis choisir les moments où le mouvement peut apporter quelque chose : retour d’action, continuité entre états, explication ou signature de marque. Distinguer ces rôles avant de choisir les effets. Une retouche d’un bouton ne demande pas une charte motion complète.

Traduire le caractère de la marque en comportements : déplacement direct ou trajectoire courbe, retenue ou amplitude, arrêt net ou amorti, régularité ou contraste de rythme. Motiver ces choix par le contenu et le public. Éviter les adjectifs sans conséquence visible et les recettes universelles de fade-in, rebond, parallaxe ou défilement forcé. Recommander les mouvements prioritaires ; garder des zones calmes pour lire et agir.

Pour une exploration, faire varier la logique du mouvement, pas seulement sa vitesse. Comparer par exemple une construction progressive et une transformation continue sur le même contenu. Si une direction existe déjà, l’affiner sans rouvrir toutes les pistes. Ne pas ajouter une mascotte ou changer le logo simplement pour pouvoir les animer.

## Composer une séquence

Concevoir le temps comme une composition : point d’attention, geste principal, éventuel accompagnement puis repos. Décrire qui commence, qui suit et ce qui reste immobile. Relier chaque mouvement secondaire au principal ; éviter que tous les éléments réclament l’attention simultanément. Adapter le décalage entre éléments à leur relation, sans allonger artificiellement l’accès au contenu.

Définir poses ou états clés, ancrages, trajectoires, amplitude et rythme. Employer accélération, décélération, anticipation, dépassement ou mouvement secondaire lorsqu’ils servent l’intention. Une animation sobre peut se limiter à un changement d’état net et bien synchronisé. Préserver la lisibilité des textes, les proportions de marque et la stabilité des points d’appui ; contrôler particulièrement les changements de silhouette et les raccords de boucle.

Pour les interfaces, donner le retour d’action immédiatement et laisser l’utilisateur poursuivre sans attendre une séquence décorative. Définir quoi faire si l’action se répète ou s’inverse pendant la transition : repartir de l’état courant, annuler, remplacer ou terminer, selon le sens de l’action. Ne pas montrer une réussite avant sa confirmation réelle ; distinguer anticipation visuelle, attente et résultat.

Fixer des valeurs de travail pour les mouvements proposés, puis les ajuster sur une lecture réelle à la taille cible. Donner une durée et une courbe de vitesse exploitable, ou une description précise du ressort avec ses paramètres lorsqu’ils sont connus. Ne pas imposer une durée, une courbe ou un ressort identiques à tous les supports. Réutiliser les valeurs motion du projet ; ne créer des valeurs communes que pour des comportements réellement récurrents.

## Choisir la fabrication selon l’actif

| Besoin | Voie à examiner | Points à vérifier |
|---|---|---|
| Réaction d’interface, déplacement, opacité, transition simple | Éléments existants animés par le front-end | Continuité des états, interruption, clavier et tactile |
| Logo, motifs géométriques, pictogrammes | Sources vectorielles et animation vectorielle | Formes éditables, ancrages, correspondance des formes en transformation |
| Illustration ou personnage articulable | Objets séparés et animation par parties lorsque les sources le permettent | Articulations, masques, ordre des couches, expressions |
| Personnage dessiné image par image | Poses cohérentes, séquence raster ou sprites | Identité, alignement, transparence, cadence et raccords |
| Film, matière ou scène complexe | Vidéo, rendu ou composition dans un atelier adapté | Format, lecture, poids, contrôle et solution statique |

Choisir la voie la plus adaptée au résultat et aux sources, sans imposer de bibliothèque, format propriétaire ou outil payant. Le starter vérifie les dépendances et la faisabilité dans la stack existante. Garder textes et contrôles essentiels comme éléments utilisables du produit ; une animation embarquée ne remplace pas leur sémantique.

Pour les images générées, séparer modèle qui dirige, outil qui produit les images et outil qui assemble ou joue l’animation. Vérifier les capacités réellement accessibles et appliquer les instructions de génération actives ; ne pas déduire une connexion, une facturation ou une compatibilité d’abonnement d’une démonstration vue en ligne. Préparer les fichiers à transmettre si la connexion manque.

Fixer une référence stable du personnage : silhouette, proportions, palette, trait, accessoires, cadrage, taille du canevas et points d’ancrage. Décrire les poses clés et leur ordre avant de multiplier les images. Contrôler chaque nouvelle pose contre la référence stable ; réutiliser seulement l’image précédente peut accumuler des dérives. Inspecter différences involontaires, éléments qui disparaissent, tremblements, contours et raccords. Ne pas promettre qu’une suite d’images générées sera fluide : ajuster les poses, leur durée et les transitions après assemblage. Préserver les sources d’origine.

## Rendre le mouvement inspectable

Conserver l’atelier choisi. Pour un prototype d’interface, appliquer le transfert Claude Design par défaut prévu dans le skill ; pour une réalisation directe explicitement demandée, employer les capacités disponibles. Si l’atelier est inaccessible, préparer le brief exécutable et les actifs exacts, en indiquant que le mouvement reste à produire. Ne pas fabriquer une seconde maquette ni prétendre avoir vu une animation sur la seule foi du texte de l’outil.

Choisir la preuve selon la question : storyboard pour le récit et les poses, boucle ou vidéo pour le rythme, prototype pour les déclenchements et interruptions, application pour le comportement et les performances réels. Montrer la séquence représentative assez tôt pour ajuster le rythme avant de décliner tout le système. Une démonstration locale autorisée doit être lisible et manipulable ; ne pas fournir seulement des paramètres lorsque la demande porte sur le rendu animé.

## Préserver l’usage

Prévoir la variante à mouvement réduit en conservant information et retour d’action : état final immédiat, changement discret ou autre transition adaptée. En contexte web, demander au starter de respecter `prefers-reduced-motion` et de vérifier ce comportement. Prévoir l’accès au contenu quand un actif ne charge pas ou qu’une animation ne joue pas.

Adapter amplitude, composition et déclencheurs au mobile ; ne pas rendre une information ou action dépendante du survol. Éviter les mouvements de caméra inutiles, clignotements et déplacements qui gênent la lecture. Pour une séquence automatique prolongée, examiner les commandes de pause/arrêt et les exigences applicables avec le workflow produit ; ne pas annoncer une conformité sur une maquette.

Définir la répétition et l’arrêt, notamment hors écran, après interaction et en retour de navigation si pertinents. Garder la page utilisable pendant le chargement des actifs et la lecture. Faire vérifier poids, coût de rendu, stabilité de mise en page et fluidité sur les appareils cibles ; une cadence annoncée ou un enregistrement ne vaut pas mesure de performance de l’application.

## Transmettre et revoir

Pour une retouche simple, intégrer la consigne au composant existant. Pour une séquence élaborée, consigner dans le dossier visuel une fiche compacte avec uniquement les champs applicables :

- support et version, objectif, éléments et sources exactes ;
- déclencheur, états clés, propriétés et valeurs de départ/arrivée ;
- ordre temporel, durées, courbes, délais, pauses et répétition ;
- interruption, inversion, clics répétés et états attente/erreur/succès concernés ;
- mobile, clavier/tactile, mouvement réduit et repli sans actif ;
- source modifiable, export/prototype, contraintes connues et points à vérifier dans le produit.

Exemple fictif de précision, à adapter et non à appliquer comme style par défaut : « À la confirmation réelle de l’enregistrement, remplacer l’indicateur d’attente par une coche. Tracer la coche en 180 ms avec décélération, sans déplacer le libellé. Si une autre sauvegarde débute, remplacer immédiatement cet état. En mouvement réduit, afficher la coche directement. »

Référencer cette fiche et les actifs depuis l’index visuel existant ; ne pas créer de second backlog ni modifier le manifeste strict de PA. Distinguer choix acceptés, valeurs encore à ajuster et limites techniques. Confier au starter l’implémentation du produit, tout en conservant la responsabilité AD sur l’intention et la revue visuelle. Les ajustements techniques ordinaires ne demandent pas une nouvelle validation de marque ; faire arbitrer un changement qui altère la direction ou le parcours.

Revoir le rendu à vitesse normale puis au ralenti si utile : attention, lisibilité, continuité, rythme, ancrages, déformations involontaires et pauses. Dans un prototype, essayer aussi répétition, interruption et variantes disponibles. Dans le produit, vérifier les critères fonctionnels avec le starter. Rattacher chaque défaut au moment et à la version concernés, regrouper les corrections, puis examiner la séquence corrigée. Rapporter séparément qualité observée, tests effectués et contrôles encore impossibles.
