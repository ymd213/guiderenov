<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>GuideRenov — Estimations & Guides pas à pas</title>
<style>
  :root{
    --bg:#f6f8fb; --card:#fff; --accent:#0366d6; --muted:#6b7280;
    --shadow: 0 6px 20px rgba(3,6,22,.08);
    font-family: Inter, "Segoe UI", Roboto, Arial, sans-serif;
  }
  body{ margin:0; background:var(--bg); color:#0b1220; }
  .container{ max-width:1100px; margin:32px auto; padding:20px; }
  header{ display:flex; align-items:center; gap:16px; }
  h1{ margin:0; font-size:22px; }
  .searchWrap{ margin-top:18px; display:flex; gap:12px; align-items:center; }
  input.search{ flex:1; padding:12px 14px; border-radius:10px; border:1px solid #e6eef8; font-size:16px; box-shadow:var(--shadow); background:linear-gradient(180deg,#fff,#fbfdff); }
  .results{ display:grid; grid-template-columns: 1fr; gap:12px; margin-top:18px; }
  @media(min-width:900px){ .results{ grid-template-columns: 1fr 380px; } }
  .list{ background:var(--card); border-radius:12px; padding:14px; box-shadow:var(--shadow); }
  .card{ padding:12px; border-radius:10px; display:flex; justify-content:space-between; gap:12px; align-items:flex-start; border:1px solid #eef4fb; margin-bottom:10px; cursor:pointer; transition:transform .12s ease; }
  .card:hover{ transform:translateY(-4px); }
  .card .left{ max-width:68%; }
  .name{ font-weight:600; font-size:15px; margin:0 0 6px 0; }
  .meta{ font-size:13px; color:var(--muted); margin-bottom:8px; }
  .price{ color:var(--accent); font-weight:700; }
  .side{ font-size:13px; color:var(--muted); text-align:right; min-width:120px; }
  .detail{ background:var(--card); border-radius:12px; padding:16px; box-shadow:var(--shadow); max-height:75vh; overflow:auto; }
  .section{ margin:10px 0; }
  .tools, .materials{ display:flex; gap:8px; flex-wrap:wrap; }
  .badge{ background:#f1f7ff; border:1px solid #e3f0ff; padding:6px 8px; border-radius:8px; font-size:13px; color:#073763; }
  .steps{ counter-reset:step; margin-top:8px; }
  .step{ margin:10px 0; padding:10px; border-radius:8px; background:#fbfdff; border:1px solid #eef6ff; }
  .step h4{ margin:0 0 6px 0; font-size:14px; }
  .footer{ margin-top:16px; font-size:13px; color:var(--muted); }
  .initialList{ margin-top:12px; display:grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap:10px; }
  .miniCard{ background:#fff; border-radius:10px; padding:10px; box-shadow:var(--shadow); border:1px solid #eef4fb; cursor:pointer; }
  .nores{ padding:20px; color:var(--muted); text-align:center; }
  .small{ font-size:13px; color:var(--muted); }
  .searchBarRight{ display:flex; gap:8px; align-items:center; }
  button.copy{ background:var(--accent); color:#fff; border:none; padding:8px 10px; border-radius:8px; cursor:pointer; }
</style>
</head>
<body>
<div class="container">
  <header>
    <div>
      <h1>GuideRenov — Estimations & guides détaillés</h1>
      <div class="small">Recherche instantanée — texte libre. Cliquez sur un travail pour voir les étapes ultra détaillées.</div>
    </div>
  </header>

  <div class="searchWrap">
    <input id="search" class="search" placeholder="Ex : remplacer une prise, poser du carrelage, réparer une fuite ..." autofocus />
    <div class="searchBarRight">
      <button class="copy" id="copyData">Copier JSON</button>
    </div>
  </div>

  <div class="results">
    <div class="list" id="listCol">
      <div class="small">Suggestions populaires</div>
      <div class="initialList" id="initialList"></div>

      <hr style="margin:12px 0;border:none;border-top:1px solid #f0f5fb" />
      <div id="listItems"></div>
      <div id="nores" class="nores" style="display:none;">Aucun résultat — essayez un autre mot-clé.</div>
    </div>

    <div class="detail" id="detailCol">
      <div id="detailEmpty" class="small">Sélectionne un travail à droite pour voir le guide étape par étape.</div>
      <div id="detailView" style="display:none"></div>
    </div>
  </div>

  <div class="footer">© GuideRenov — contenu pédagogique. Respectez les consignes de sécurité ; en cas de doute, fais appel à un professionnel.</div>
</div>

<script>
/* ======================
   Données : 100 travaux
   Chaque objet : {
     name, category, summary, price_min, price_max, tools[], materials[], duration, difficulty, steps[], precautions
   }
   ====================== */
const works = [
  /* 1 */ { name:"Remplacer une prise électrique simple", category:"Électricité",
    summary:"Remplacement d'une prise murale standard (dépose + montage), includes vérification et test.", price_min:15, price_max:45,
    tools:["Tournevis cruciforme","Tournevis plat","Testeur de tension","Pince coupante"], materials:["Prise 2P+T","Bornes","Gaine si nécessaire"], duration:"30-60 min", difficulty:"Débutant/Intermédiaire",
    steps:[
      "Couper l'alimentation générale au tableau afin d'isoler le circuit concerné. Verifier l'absence de tension avec le testeur.",
      "Retirer la plaque et dévisser la prise de la boîte d'encastrement. Noter le repérage des fils (phase, neutre, terre).",
      "Desserrer les connexions, retirer la vieille prise et préparer les fils (dénudage 8-10 mm).",
      "Brancher la nouvelle prise en respectant les codes couleurs: phase -> borne L, neutre -> N, terre -> symbole terre.",
      "Fixer la prise, remettre la plaque, rallumer et tester avec un appareil. Vérifier la tenue mécanique et l'absence d'étincelles."
    ],
    precautions:"Toujours s'assurer du courant coupé et utiliser un testeur. Si câblage ancien non conforme, faire appel à un professionnel."
  },

  /* 2 */ { name:"Poser un revêtement de sol vinyle clipsable", category:"Sols",
    summary:"Pose de lames vinyles clipsables sur sous-plancher plan et sec ; inclut préparation, découpe et finition.", price_min:8, price_max:25,
    tools:["Scie sauteuse ou cutter","Mètre","Règle","Maillet en caoutchouc"], materials:["Lames vinyles","Sous-couche isolante"], duration:"2-8 h / pièce", difficulty:"Débutant/Intermédiaire",
    steps:[
      "Mesurer la surface et calculer les lames nécessaires avec +10% pour chutes.",
      "Préparer le sol: doit être propre, sec, plan. Poser la sous-couche si recommandée.",
      "Commencer dans un coin, poser la première rangée en laissant un jeu (5-8 mm) aux murs.",
      "Cliper les lames une à une en veillant à l'alignement, utiliser le maillet pour assurer la tenue.",
      "Découper les lames finales à la largeur nécessaire et poser les plinthes pour finition."
    ],
    precautions:"Vérifier la compatibilité du carrelage/ancien sol et respecter la dilatation. Attention aux portes (couper si besoin)."
  },

  /* 3 */ { name:"Réparer une fuite d'évier (siphon)", category:"Plomberie",
    summary:"Détection et remplacement du joint ou du siphon pour arrêter une fuite localisée sous évier.", price_min:10, price_max:60,
    tools:["Clé à molette","Seau","Chiffons"], materials:["Joint de siphon","Ruban téflon si besoin"], duration:"20-40 min", difficulty:"Débutant",
    steps:[
      "Placer un seau sous le siphon, dévisser les raccords manuels et vider l'eau résiduelle.",
      "Inspecter joints et bagues: rechercher fissures ou joints émoussés.",
      "Remplacer le joint ou le siphon complet selon l'état; appliquer ruban téflon sur filetages si nécessaire.",
      "Remonter soigneusement, serrer à la main puis légèrement à la clé, sans sur-serrer.",
      "Ouvrir l'eau et vérifier l'absence de fuite pendant plusieurs minutes."
    ],
    precautions:"Ne pas utiliser de produits chimiques corrosifs pour déboucher sans connaître la cause; éviter de casser les raccords en plastique."
  },

  /* 4 */ { name:"Peindre un mur intérieur (1 couche de finition)", category:"Peinture",
    summary:"Préparation et application d'une couche de peinture de finition (mur intérieur), inclus nettoyage et retouches.", price_min:1.5, price_max:8,
    tools:["Rouleau et manche","Brosse d'angle","Bâche de protection","Ruban de masquage"], materials:["Peinture murale (L)","Enduit de rebouchage"], duration:"2-6 h (par mur)", difficulty:"Débutant",
    steps:[
      "Protéger sol et meubles avec bâche et scotcher les bords avec ruban de masquage.",
      "Boucher fissures et trous avec enduit, laisser sécher et poncer pour lisser.",
      "Appliquer une sous-couche si nécessaire, puis la peinture de finition en couches régulières.",
      "Utiliser la brosse pour les angles puis le rouleau pour les surfaces planes.",
      "Contrôler à la lumière rasante pour déceler les manques et retoucher si besoin."
    ],
    precautions:"Ventiler la pièce; utiliser équipement de protection si peinture très odorante; respecter temps de séchage indiqué."
  },

  /* 5 */ { name:"Remplacer un joint de fenêtre (PVC/bois)", category:"Menuiserie",
    summary:"Remplacement du mastic d'étanchéité extérieur ou intérieur pour améliorer isolation et étanchéité.", price_min:20, price_max:80,
    tools:["Pistolet à mastic","Cutter","Ruban de masquage"], materials:["Mastic silicone/PU"], duration:"1-2 h", difficulty:"Débutant",
    steps:[
      "Décoller l'ancien mastic avec cutter et nettoyer la surface (dégraissage).",
      "Protéger les pourtours avec ruban de masquage pour un trait net.",
      "Appliquer le nouveau mastic en cordon régulier avec pistolet; lisser au doigt humide ou avec lissage.",
      "Retirer le ruban avant que le mastic ne sèche complètement.",
      "Attendre la polymérisation complète avant exposition aux intempéries."
    ],
    precautions:"Choisir mastic adapté (silicone sanitaire, mastic chantier, etc.). Respecter conditions températures/temps de séchage."
  },

  /* 6 */ { name:"Déboucher une canalisation domestique", category:"Plomberie",
    summary:"Technique mécanique pour déboucher évier, lavabo, douche ou wc; selon obstruction, usage de ventouse, furet ou produit mécanique.", price_min:0, price_max:120,
    tools:["Ventouse","Furet manuel","Clé à molette"], materials:["Produit déboucheur (optionnel)"], duration:"15-90 min", difficulty:"Débutant/Intermédiaire",
    steps:[
      "Commencer par une ventouse adaptée au type de bonde (étanchéité correcte).",
      "Si échec, utiliser furet manuel pour atteindre l'obstruction et la retirer.",
      "Ne pas mélanger produits chimiques et usage de furet (risque projections).",
      "En dernier recours, démonter siphon pour nettoyage ou faire appel à pro pour canalisation principale.",
      "Après débouchage, rincer abondamment à l'eau chaude."
    ],
    precautions:"Éviter produits corrosifs pour tuyauterie PVC; porter gants et lunettes; si problème persiste, appeler un plombier."
  },

  /* 7 */ { name:"Installer un luminaire suspendu", category:"Électricité",
    summary:"Pose d'un luminaire sur boîte d'encastrement existante: montage mécanique et connexion électrique.", price_min:25, price_max:120,
    tools:["Tournevis","Escabeau","Testeur de tension"], materials:["Luminaire","Chevilles et vis"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Couper le circuit au tableau et vérifier l'absence de tension.",
      "Monter le support mécanique, fixer la platine sur la boîte d'encastrement.",
      "Effectuer les connexions (phase, neutre, terre) avec connecteurs adaptés.",
      "Fixer le luminaire et raccorder la suspension à la hauteur souhaitée.",
      "Remettre le courant et tester l'éclairage."
    ],
    precautions:"Respecter la section des fils et le poids maximal accepté par la boîte d'encastrement."
  },

  /* 8 */ { name:"Colmater une infiltration toiture (bâchage temporaire)", category:"Toiture",
    summary:"Intervention temporaire pour arrêter une fuite en attendant réparation définitive: mise en place bâche et cales.", price_min:40, price_max:150,
    tools:["Bâche épaisse","Agrafes/chevilles","Escabeau ou échelle sécurisée"], materials:["Bâche","Mastic d'étanchéité"], duration:"1-3 h", difficulty:"Intermédiaire",
    steps:[
      "Localiser la zone d'infiltration depuis l'intérieur et l'extérieur si possible.",
      "Monter en toute sécurité sur toit (harnais si disponible) et nettoyer la zone.",
      "Poser une bâche couvrant large surface, fixer par agrafes/chevilles ou poids.",
      "Appliquer mastic d'étanchéité sur fissures visibles si accessible.",
      "Planifier réparation définitive (remplacement d'ardoises, solin, etc.)"
    ],
    precautions:"Sécurité avant tout: harnais obligatoire si pente élevée; si dangereux, faire venir un couvreur."
  },

  /* 9 */ { name:"Changer un joint de douche", category:"Plomberie",
    summary:"Retrait de l'ancien joint silicone, nettoyage, et application d'un nouveau cordon d'étanchéité.", price_min:10, price_max:50,
    tools:["Cutter","Pistolet à silicone","Nettoyant"], materials:["Silicone sanitaire"], duration:"30-90 min", difficulty:"Débutant",
    steps:[
      "Retirer l'ancien mastic au cutter et nettoyer avec produit adapté (alcool ou vinaigre blanc si compatible).",
      "Dégraisser, appliquer ruban de masquage pour lignes nettes.",
      "Appliquer silicone en cordon continu et lisser immédiatement.",
      "Enlever ruban avant séchage complet et attendre polymérisation."
    ],
    precautions:"Utiliser silicone sanitaire anti-moisissure; ventiler la pièce pendant séchage."
  },

  /* 10 */ { name:"Remplacer une chasse d'eau (mécanisme)", category:"Plomberie",
    summary:"Remplacement du mécanisme interne de la chasse (flotteur, clapet) pour arrêter les fuites ou dysfonctionnements.", price_min:15, price_max:80,
    tools:["Tournevis","Seau","Clé"], materials:["Kit mécanisme de chasse"], duration:"20-60 min", difficulty:"Débutant",
    steps:[
      "Couper arrivée d'eau du WC et vider la cuve en tirant la chasse.",
      "Retirer couvercle et démonter l'ancien mécanisme en dévissant les fixations.",
      "Installer le nouveau mécanisme en respectant hauteur du flotteur et position du clapet.",
      "Rétablir l'arrivée d'eau, contrôler niveau et ajuster si besoin.",
      "Vérifier l'absence de fuite et le bon remplissage."
    ],
    precautions:"Ne jamais forcer les filetages plastiques; vérifier compatibilité du kit avec la cuve."
  },

  /* 11 */ { name:"Poser des carreaux muraux (cuisine, crédence)", category:"Carrelage",
    summary:"Pose colle + carrelage mural simple (crédence), préparation mur, coupes, jointoiement.", price_min:20, price_max:60,
    tools:["Croisillons","Truelle crantée","Coupe-carreaux"], materials:["Carrelage","Colle ciment","Joint"], duration:"4-12 h", difficulty:"Intermédiaire",
    steps:[
      "Préparer support: propre, plan, dépoussiéré; tracer lignes guides.",
      "Étaler colle avec truelle crantée et poser carreaux en respectant croisillons.",
      "Vérifier aplomb et alignement, couper carreaux aux bords.",
      "Après séchage de la colle, appliquer joints, lisser et nettoyer résidus.",
      "Nettoyer la surface et laisser durcir selon préconisations."
    ],
    precautions:"Respecter temps de séchage; utiliser colle adaptée au support (placo/agglo)."
  },

  /* 12 */ { name:"Remplacer un mécanisme de porte (serrure simple)", category:"Menuiserie",
    summary:"Démontage et remplacement d'une serrure ou d'un cylindre de porte intérieure.", price_min:15, price_max:70,
    tools:["Tournevis","Clés Allen"], materials:["Serrure/cylindre"], duration:"20-60 min", difficulty:"Débutant",
    steps:[
      "Retirer vis de fixation de la poignée et du cylindre.",
      "Extraire l'ancien mécanisme et mesurer entraxe pour choix du nouveau.",
      "Monter le nouveau mécanisme en respectant sens du pêne et alignement.",
      "Serrer, tester ouverture/fermeture et ajuster gorges si besoin."
    ],
    precautions:"Vérifier compatibilité dimensions; ne pas endommager gâche."
  },

  /* 13 */ { name:"Remplacement d'un carreau cassé au sol", category:"Carrelage",
    summary:"Découpe et remplacement d'un carreau endommagé, pose de colle et joint.", price_min:15, price_max:60,
    tools:["Marteau et burin","Spatule","Coupe-carreaux"], materials:["Carreau identique ou similaire","Colle","Joint"], duration:"1-3 h", difficulty:"Intermédiaire",
    steps:[
      "Retirer fragments avec soin (protection des yeux), nettoyer cavité.",
      "Éliminer ancienne colle jusqu'à surface plane, appliquer nouvelle colle.",
      "Poser carreau de remplacement à niveau, vérifier alignement et joints.",
      "Appliquer joint après séchage et nettoyer résidus."
    ],
    precautions:"Porter lunettes de protection; chercher carreau identique pour rendu discret."
  },

  /* 14 */ { name:"Installer une étagère murale solide", category:"Menuiserie",
    summary:"Fixation d'étagère sur mur porteur ou cloison; choix de fixations adaptées.", price_min:10, price_max:45,
    tools:["Perceuse-visseuse","Niveau","Chevilles adaptées"], materials:["Etagère","Équerres ou rails","Chevilles"], duration:"30-90 min", difficulty:"Débutant",
    steps:[
      "Marquer l'emplacement, vérifier niveau et hauteur.",
      "Choisir chevilles adaptées (béton/placo) et percer aux repères.",
      "Insérer chevilles, fixer équerres/rails, poser l'étagère et vérifier tenue.",
      "Contrôler charge admissible et répartir charges lourdes au sol si nécessaire."
    ],
    precautions:"Ne pas surcharger, utiliser chevilles métalliques pour charges élevées."
  },

  /* 15 */ { name:"Changer une ampoule et luminaire basique", category:"Électricité",
    summary:"Remplacement d'ampoule ou petite réparation de luminaire (douille, câble).", price_min:1, price_max:30,
    tools:["Escabeau","Tournevis"], materials:["Ampoule","Douille si nécessaire"], duration:"5-20 min", difficulty:"Débutant",
    steps:[
      "Couper l'alimentation, laisser refroidir l'ampoule.",
      "Retirer l'ampoule défectueuse et remplacer par modèle adapté (wattage/culot).",
      "Si douille endommagée, débrancher, remplacer et tester."
    ],
    precautions:"Vérifier puissance et type d'ampoule; manipuler avec gants si ampoule cassée."
  },

  /* 16 */ { name:"Réparer une porte qui grince (charnières)", category:"Menuiserie",
    summary:"Nettoyage/réglage des charnières, graissage ou remplacement si usé.", price_min:0, price_max:25,
    tools:["Tournevis","Dégrippant","Graisse"], materials:["Vis de rechange","Charnière si nécessaire"], duration:"10-30 min", difficulty:"Débutant",
    steps:[
      "Vérifier l'origine du grincement en ouvrant/fermant la porte.",
      "Serrez vis; si elles tournent dans du bois abîmé, remplacer ou utiliser chevilles bois.",
      "Appliquer graisse ou dégrippant sur axes, actionner la porte plusieurs fois.",
      "Remplacer charnière si jeu excessif ou corrosion."
    ],
    precautions:"Attention aux doigts lors des manips de porte lourde."
  },

  /* 17 */ { name:"Poser une crédence adhésive", category:"Peinture/Revêtement",
    summary:"Pose rapide de crédence autocollante ou aimantée; bien mesurer et lisser.", price_min:10, price_max:60,
    tools:["Règle","Cutter","Chiffon"], materials:["Crédence adhésive"], duration:"30-90 min", difficulty:"Débutant",
    steps:[
      "Nettoyer la surface et dégraisser soigneusement.",
      "Mesurer et découper la crédence avec marges si nécessaire.",
      "Positionner, coller progressivement en chassant les bulles avec raclette.",
      "Couper surplus et soigner joints autour prises/robinetterie."
    ],
    precautions:"Ne pas poser sur surface humide ou irrégulière."
  },

  /* 18 */ { name:"Remplacer un robinet mitigeur lavabo", category:"Plomberie",
    summary:"Dépose et montage d'un nouveau mitigeur, remplacement joints si fuite.", price_min:30, price_max:120,
    tools:["Clé à molette","Rasoir/outil joint"], materials:["Mitigeur","Joints neufs"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Couper arrivée d'eau, ouvrir robinet pour purger.",
      "Sous plan, dévisser écrous d'alimentation et retirer le mitigeur.",
      "Nettoyer surface, installer nouveau mitigeur avec joints fournis.",
      "Serrer, reconnecter, ouvrir alimentation et vérifier étanchéité."
    ],
    precautions:"Ne pas sur-serrer filetages plastiques; utiliser joint et ruban téflon si requis."
  },

  /* 19 */ { name:"Installer une VMC simple flux (remplacement filtre)", category:"Ventilation",
    summary:"Entretien/remplacement de filtre, nettoyage bouches d'extraction.", price_min:20, price_max:80,
    tools:["Tournevis","Aspirateur"], materials:["Filtres VMC"], duration:"30-60 min", difficulty:"Débutant",
    steps:[
      "Couper alimentation si nécessaire, ouvrir accès unité VMC.",
      "Retirer filtre(s) usés, aspirer poussières internes si accessible.",
      "Remplacer filtres conformes et refermer l'unité.",
      "Nettoyer bouches et grilles d'extraction."
    ],
    precautions:"Respecter périodicité recommandée (3-12 mois selon usage)."
  },

  /* 20 */ { name:"Réparer un radiateur qui ne chauffe pas", category:"Chauffage",
    summary:"Purge, vérification vanne et équilibrage du radiateur; remplacement éventuel de purgeur.", price_min:10, price_max:90,
    tools:["Clé de purge","Seau"], materials:["Purgeur si nécessaire"], duration:"15-45 min", difficulty:"Débutant",
    steps:[
      "Vérifier si les autres radiateurs chauffent (problème central ou local).",
      "Purger l'air: ouvrir purgeur jusqu'à écoulement d'eau constante.",
      "Serrer et vérifier pression chaudière; rééquilibrer vannes thermostatiques.",
      "Remplacer purgeur si fuite persistante."
    ],
    precautions:"Risque d'eau chaude; placer seau et essuie-main; vérifier pression chaudière après purge."
  },

  /* 21 */ { name:"Remplacer joint WC (cuvette-sol)", category:"Plomberie",
    summary:"Remplacement du joint entre la cuvette et le sol (étanchéité), repositionnement.", price_min:25, price_max:120,
    tools:["Tournevis","Clé"], materials:["Nouveau joint (sabot)","Mastic"], duration:"1-2 h", difficulty:"Intermédiaire",
    steps:[
      "Couper l'eau et vider cuve; dévisser fixations de la cuvette.",
      "Retirer cuvette, nettoyer surface, enlever ancien joint.",
      "Poser nouveau joint (sabot), reposer cuvette et serrer vis symétriquement.",
      "Remettre eau et vérifier étanchéité au sol."
    ],
    precautions:"Manipulation lourde; s'assurer d'une bonne étanchéité pour éviter infiltrations."
  },

  /* 22 */ { name:"Installer un détecteur de fumée (DTM)", category:"Sécurité",
    summary:"Pose mur/plafond d'un détecteur de fumée avec fixation et test sonore.", price_min:10, price_max:40,
    tools:["Perceuse","Vis","Escabeau"], materials:["Détecteur de fumée (pile ou connecté)"], duration:"10-30 min", difficulty:"Débutant",
    steps:[
      "Choisir emplacement conseillé (couloir, palier), hors cuisines directs.",
      "Percer et fixer le support, clipser l'appareil et insérer piles.",
      "Tester avec bouton test et noter date d'installation sur l'appareil."
    ],
    precautions:"Respecter normes locales; remplacer piles annuellement et appareil tous les 10 ans."
  },

  /* 23 */ { name:"Réparer une morsure d'humidité au mur (petite surface)", category:"Humidité",
    summary:"Traitement surface moisie: nettoyage, traitement anti-moisissure, enduit et peinture.", price_min:30, price_max:150,
    tools:["Brosse métallique","Enduit et spatule","Ponceuse manuelle"], materials:["Traitement anti-moisissure","Enduit","Peinture"], duration:"2-8 h", difficulty:"Intermédiaire,
    ",
    steps:[
      "Isoler source d'humidité si possible (fuite, ventilation).",
      "Désinfecter surface avec produit anti-moisissure, brosser et rincer.",
      "Laisser sécher, appliquer enduit de réparation, poncer et repeindre.",
      "Sur des cas persistants, faire diagnostic étanchéité ou capillarité."
    ],
    precautions:"Porter masque et gants lors du traitement; identifier cause avant traitement cosmétique."
  },

  /* 24 */ { name:"Pose d'une étagère murale flottante", category:"Menuiserie",
    summary:"Fixation étagère invisible avec cache supports; calcul charge et scellement adapté.", price_min:15, price_max:90,
    tools:["Perceuse","Niveau","Visserie"], materials:["Étagère flottante","Chevilles"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Vérifier mur (placo, béton) et choisir chevilles adaptées.",
      "Traçage, perçage, insertion chevilles et fixation de la platine.",
      "Glisser étagère sur platine puis ajuster l'alignement.",
      "Contrôler tenue avec charge progressive."
    ],
    precautions:"Ne pas surcharger; utiliser tige filetée/chevilles métalliques pour charges lourdes."
  },

  /* 25 */ { name:"Poser une robinetterie de douche thermostatique", category:"Plomberie",
    summary:"Remplacement ou pose d'un mitigeur thermostatique, réglage sécurité anti-brûlure.", price_min:80, price_max:350,
    tools:["Clé à molette","Niveau"], materials:["Mitigeur thermostatique","Joints"], duration:"1-3 h", difficulty:"Intermédiaire/Pro",
    steps:[
      "Couper l'eau, démonter ancienne robinetterie et nettoyer raccords.",
      "Monter mitigeur en respectant orientation eau chaude/ froide.",
      "Régler butée température et vérifier sécurité anti-brûlure.",
      "Contrôler étanchéité et purger l'air."
    ],
    precautions:"Sur réseaux anciens, vérifier pression compatible et prévoir adaptateurs."
  },

  /* 26 */ { name:"Réparer un volet roulant manuel (câle/ressort)", category:"Menuiserie/Volets",
    summary:"Diagnostic débrayage, remplacement sangle ou réglage ressorts selon modèle.", price_min:30, price_max:250,
    tools:["Tournevis","Pince"], materials:["Sangle de volet","Ressorts"], duration:"1-4 h", difficulty:"Intermédiaire",
    steps:[
      "Identifier modèle (sangle, moteur, coffre) et repérer panne.",
      "Remplacer sangle abîmée ou régler tension de ressorts selon notice.",
      "Tester montée/descente et sécuriser mécanismes."
    ],
    precautions:"Attention aux pièces sous tension (ressorts). Si moteur, couper alimentation."
  },

  /* 27 */ { name:"Installer une tringle à rideau", category:"Menuiserie",
    summary:"Mesure, perçage et fixation d'une tringle pour rideaux; inclut supports et embouts.", price_min:10, price_max:50,
    tools:["Perceuse","Niveau","Vis"], materials:["Tringle","Chevilles"], duration:"20-60 min", difficulty:"Débutant",
    steps:[
      "Mesurer largeur, marquer points support en respectant débordement du rideau.",
      "Percer, insérer chevilles et visser supports.",
      "Mettre tringle en place, accrocher rideau et vérifier aplomb."
    ],
    precautions:"Utiliser chevilles adaptées au mur; prévoir renfort si lourd."
  },

  /* 28 */ { name:"Repeindre une façade extérieure (petite surface)", category:"Peinture extérieure",
    summary:"Préparation, traitement fissures, sous-couche et application peinture façade (zone limitée).", price_min:20, price_max:80,
    tools:["Brosse métallique","Rouleur extérieur","Echafaudage léger"], materials:["Peinture façade","Enduit"], duration:"1-3 jours selon météo", difficulty:"Intermédiaire/Pro",
    steps:[
      "Nettoyer façade (nettoyeur haute pression si possible) et dépoussiérer.",
      "Traiter fissures et appliquer enduit d'extérieur si nécessaire.",
      "Appliquer sous-couche d'accroche puis deux couches de peinture adaptée.",
      "Respecter temps de séchage et protections aux abords."
    ],
    precautions:"Conditions météo indispensables (pas de gel/pluie). Travail en hauteur requiert équipement."
  },

  /* 29 */ { name:"Changer une poignée de porte", category:"Menuiserie",
    summary:"Remplacement d'une poignée intérieure: retrait de l'ancienne, montage nouveau modèle.", price_min:5, price_max:30,
    tools:["Tournevis"], materials:["Poignée"], duration:"10-30 min", difficulty:"Débutant",
    steps:[
      "Retirer plaque et vis, extraire ancien mécanisme.",
      "Monter nouvelle poignée en respectant carré et entraxe.",
      "Serrer vis et tester fonctionnement."
    ],
    precautions:"S'assurer du sens d'ouverture et compatibilité entraxe."
  },

  /* 30 */ { name:"Installer un meuble de cuisine (pose modulaire)", category:"Menuiserie/Cuisine",
    summary:"Assemblage et fixation meuble bas/haut; raccordement évier/électroménager non inclus.", price_min:50, price_max:350,
    tools:["Perceuse-visseuse","Niveau","Serre-joints"], materials:["Meubles","Visserie"], duration:"2-8 h", difficulty:"Intermédiaire/Pro",
    steps:[
      "Positionner meubles selon plan, vérifier niveau et alignements.",
      "Fixer meubles muraux sur bastaings ou chevilles adaptées.",
      "Accoupler meubles, poser plans et retouches de joints."
    ],
    precautions:"Vérifier solidité murs avant fixation lourde; prévoir aide pour éléments hauts."
  },

  /* 31 */ { name:"Réparer un carreau fissuré en crédence", category:"Carrelage",
    summary:"Remplacement d'un petit carreau sur crédence, découpe et jointoiement.", price_min:15, price_max:60,
    tools:["Marteau","Burins","Spatule"], materials:["Carreau","Colle","Joint"], duration:"1-2 h", difficulty:"Intermédiaire",
    steps:[
      "Protéger zone, retirer fragments, nettoyer l'arrière du support.",
      "Appliquer colle et insérer nouveau carreau de niveau.",
      "Appliquer joints et nettoyer résidus."
    ],
    precautions:"Prendre soin de ne pas abîmer carreaux adjacents."
  },

  /* 32 */ { name:"Installer une étagère de salle de bain", category:"Menuiserie/SDB",
    summary:"Fixation étagère résistante à l'humidité; scellement et scellement chimique si nécessaire.", price_min:15, price_max:80,
    tools:["Perceuse","Niveau","Vis"], materials:["Étagère inox ou PVC","Chevilles"], duration:"30-60 min", difficulty:"Débutant",
    steps:[
      "Repérer emplacement loin des projections d'eau directes.",
      "Percer et fixer supports avec chevilles adaptées.",
      "Monter étagère et vérifier niveau."
    ],
    precautions:"Privilégier matériaux anti-corrosion."
  },

  /* 33 */ { name:"Remplacer un carreau de plafond (plaques de plâtre)", category:"Plafond",
    summary:"Découpe et remplacement d'une petite portion de plaque pour infiltrations ou perçage.", price_min:30, price_max:120,
    tools:["Scie cloche/sauteuse","Visseuse","Enduit"], materials:["Plaque BA13","Vis","Enduit"], duration:"2-6 h", difficulty:"Intermédiaire",
    steps:[
      "Couper zone endommagée en carré régulier, retirer partie abîmée.",
      "Découper plaque neuve à dimension et fixer avec vis sur ossature.",
      "Enduire joints, poncer et peindre."
    ],
    precautions:"Vérifier isolation et trouver cause d'humidité si présent."
  },

  /* 34 */ { name:"Installer un meuble lavabo suspendu", category:"SDB",
    summary:"Fixation meuble suspendu et raccords d'évacuation/arrivée, vérification étanchéité.", price_min:80, price_max:400,
    tools:["Perceuse","Niveau","Clé"], materials:["Meuble lavabo","Fixations"], duration:"2-5 h", difficulty:"Intermédiaire/Pro",
    steps:[
      "Mesurer et repérer hauteur, transférer tracés sur mur.",
      "Fixer supports structurels (chevilles lourdes ou tiges filetées).",
      "Accrocher meuble, raccorder lavabo et évacuation, contrôler étanchéité."
    ],
    precautions:"S'assurer de tenir charges et raccordements conformes."
  },

  /* 35 */ { name:"Reboucher trou dans mur placo", category:"Enduit",
    summary:"Préparation, application d'enduit de rebouchage et lissage.", price_min:5, price_max:30,
    tools:["Spatule","Papier abrasif"], materials:["Enduit de rebouchage","Sous-couche"], duration:"30-120 min (séchage inclus)", difficulty:"Débutant",
    steps:[
      "Nettoyer trou, élargir si arrêtes friables, dépoussiérer.",
      "Appliquer enduit en plusieurs passes si profond, laisser sécher entre couches.",
      "Poncer, appliquer sous-couche et peindre."
    ],
    precautions:"Respecter temps de séchage pour éviter fissures."
  },

  /* 36 */ { name:"Installer une poignée de meuble cuisine", category:"Menuiserie",
    summary:"Fixation nouvelle poignée, perçage et ajustement.", price_min:2, price_max:15,
    tools:["Perceuse","Mètre"], materials:["Poignée"], duration:"10-30 min", difficulty:"Débutant",
    steps:[
      "Mesurer et marquer l'emplacement symétrique.",
      "Percer trous guides et fixer poignée avec vis fournies.",
      "Vérifier alignement et serrage."
    ],
    precautions:"Protéger surface meuble lors du perçage pour ne pas abîmer."
  },

  /* 37 */ { name:"Remplacer un joint de lavabo (colonne/bonde)", category:"Plomberie",
    summary:"Remplacer joints usés pour stopper fuites sur bonde ou siphon.", price_min:5, price_max:25,
    tools:["Clé","Seau"], materials:["Joints"], duration:"15-45 min", difficulty:"Débutant",
    steps:[
      "Couper arrivée si nécessaire, placer seau, démonter siphon.",
      "Remplacer joints, remonter et tester."
    ],
    precautions:"Vérifier état tuyauterie; remplacer pièces cassées."
  },

  /* 38 */ { name:"Pose d'une lampe LED encastrée", category:"Électricité",
    summary:"Découpe du faux-plafond, raccordement et fixation d'une downlight LED.", price_min:10, price_max:60,
    tools:["Scie cloche","Testeur","Tournevis"], materials:["Lampe encastrée","Douille d'alimentation"], duration:"20-60 min", difficulty:"Intermédiaire",
    steps:[
      "Couper courant, repérer emplacement et couper trou adapté.",
      "Raccorder fils selon polarité, insérer et clipser la lampe.",
      "Remettre courant et tester."
    ],
    precautions:"Vérifier compatibilité d'isolation et puissance maximale."
  },

  /* 39 */ { name:"Remplacer un joint de baie vitrée coulissante", category:"Menuiserie",
    summary:"Remplacement lèvre d'étanchéité pour améliorer isolation thermique/phonique.", price_min:15, price_max:80,
    tools:["Spatule fine","Cutter"], materials:["Brosse/joint d'étanchéité"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Retirer ancien joint, nettoyer rail et contre-châssis.",
      "Insérer nouveau joint en s'arrêtant aux coins, couper à longueur.",
      "Vérifier coulissage et étanchéité."
    ],
    precautions:"Choisir joint adapté au modèle et profil."
  },

  /* 40 */ { name:"Installer prise extérieure étanche (IP44)", category:"Électricité extérieure",
    summary:"Pose d'une prise extérieure avec boîtier étanche, câblage depuis tableau via disjoncteur différentiel.", price_min:60, price_max:250,
    tools:["Perceuse","Pince","Outillage élec"], materials:["Prise IP44","Câble H07RN-F","Gaine"], duration:"1-4 h", difficulty:"Intermédiaire/Pro",
    steps:[
      "Prévoir circuit protégé par disjoncteur différentiel adapté.",
      "Percer et fixer boîtier extérieur, faire passage de gaine étanche.",
      "Raccorder fils en respectant polarités et mise à la terre.",
      "Vérifier étanchéité et fonctionnement."
    ],
    precautions:"Travail en extérieur: respecter normes IP et protection différentiel. Faire appel à pro si doute."
  },

  /* 41 */ { name:"Poser une porte intérieure coulissante (pocket)", category:"Menuiserie",
    summary:"Installation d'un système coulissant encastré: rail, châssis et fixation porte.", price_min:250, price_max:1200,
    tools:["Perceuse","Scie","Niveau"], materials:["Kit porte coulissante","Rail","Visserie"], duration:"1-3 jours", difficulty:"Intermédiaire/Pro",
    steps:[
      "Vérifier mur porteur et perforation pour encastrement châssis.",
      "Monter châssis selon notice, vérifier aplomb et assise.",
      "Accrocher porte, ajuster glissières et finitions.",
      "Finitions plâtrerie autour du châssis si besoin."
    ],
    precautions:"Opération lourde qui peut nécessiter travaux muraux; prévoir aide."
  },

  /* 42 */ { name:"Poser un bac à douche extra-plat", category:"SDB",
    summary:"Installation bac + raccords évacuation et étanchéité périphérique.", price_min:150, price_max:600,
    tools:["Niveau","Perceuse","Silicone"], materials:["Bac douche","Siphon","Carrelage/receveur"], duration:"3-8 h", difficulty:"Intermédiaire/Pro",
    steps:[
      "Préparer sol porteur, vérifier pente d'évacuation.",
      "Positionner bac, raccorder évacuation étanche.",
      "Sceller périphérie, poser paroi et joint silicone."
    ],
    precautions:"Étanchéité essentielle: contrôler plusieurs fois."
  },

  /* 43 */ { name:"Nettoyage et dégraissage hotte cuisine", category:"Entretien",
    summary:"Démontage filtres, nettoyage, vérification moteur et évacuation.", price_min:0, price_max:40,
    tools:["Gants","Nettoyant dégraissant"], materials:["Produit dégraissant"], duration:"20-60 min", difficulty:"Débutant",
    steps:[
      "Retirer filtres métalliques, tremper dans eau chaude savonneuse.",
      "Nettoyer intérieur hotte, essuyer et sécher, remonter filtres.",
      "Vérifier fonctionnement moteur et évacuation."
    ],
    precautions:"Débrancher électrique avant opérations lourdes."
  },

  /* 44 */ { name:"Remplacer un volet roulant motorisé (moteur)", category:"Volets",
    summary:"Remplacement moteur tubulaire, adaptation télécommande et réglage fins de course.", price_min:150, price_max:600,
    tools:["Tournevis","Multimètre"], materials:["Moteur tubulaire"], duration:"2-6 h", difficulty:"Pro",
    steps:[
      "Identifier compatibilité moteur (couple/diamètre).",
      "Démonter tambour, remplacer moteur, raccorder et tester fins de course.",
      "Réinstaller tambour et vérifier manœuvre."
    ],
    precautions:"Travail en hauteur et électrique; souvent intervention pro recommandée."
  },

  /* 45 */ { name:"Installer détecteur d'infiltration d'eau (alerte)", category:"Sécurité/Plomberie",
    summary:"Pose capteur anti-inondation avec alarme locale ou connectée.", price_min:25, price_max:120,
    tools:["Tournevis"], materials:["Détecteur anti-inondation"], duration:"10-30 min", difficulty:"Débutant",
    steps:[
      "Placer capteur près source (lave-linge, chauffe-eau).",
      "Fixer et connecter alarme/système, tester le déclenchement."
    ],
    precautions:"Test régulier et remplacement piles selon préconisation."
  },

  /* 46 */ { name:"Poser un grillage ou palissade de jardin", category:"Clôture",
    summary:"Pose poteaux et fixation de panneaux ou grillage pour delimitation jardin.", price_min:200, price_max:1200,
    tools:["Bêche","Niveau","Marteau"], materials:["Poteaux","Grillage/panneaux","Béton"], duration:"1-3 jours", difficulty:"Intermédiaire",
    steps:[
      "Tracer alignement, creuser trous pour poteaux, bétonner à la bonne profondeur.",
      "Fixer grillage ou panneaux sur poteaux, tendre et attacher.",
      "Couper surplus et traiter poteaux si bois."
    ],
    precautions:"Respecter limites de propriété et réglementation locale."
  },

  /* 47 */ { name:"Remplacer serrure de porte d'entrée", category:"Sécurité",
    summary:"Remplacement cylindre ou serrure multipoints, réglage et sécurité anti-effraction.", price_min:60, price_max:400,
    tools:["Tournevis","Clé dynamométrique"], materials:["Cylindre/serrure"], duration:"30-180 min", difficulty:"Pro",
    steps:[
      "Mesurer ancien cylindre, choisir équivalent de qualité (anti-crochetage).",
      "Déposer ancienne serrure, monter nouvelle et régler gâche.",
      "Tester clé et mécanisme; vérifier alignement du pêne."
    ],
    precautions:"Serrures multipoints demandent précision; pro recommandé pour haute sécurité."
  },

  /* 48 */ { name:"Réparer une fuite sur robinet extérieur", category:"Plomberie extérieure",
    summary:"Replacement joints ou purge de robinet de jardin; prévention gel si saison froide.", price_min:10, price_max:70,
    tools:["Clé","Tournevis"], materials:["Joints","Ruban téflon"], duration:"15-60 min", difficulty:"Débutant",
    steps:[
      "Couper alimentation extérieure si possible, vider tuyau.",
      "Démonter robinet, remplacer joint, remonter et tester.",
      "Avant hiver, vidanger et isoler robinet pour éviter gel."
    ],
    precautions:"Prévoir pièces compatibles et éviter gel en hiver."
  },

  /* 49 */ { name:"Remplacer un lave-main ou robinet de WC", category:"Plomberie",
    summary:"Démontage et changement mitigeur lave-main avec joints neufs.", price_min:25, price_max:120,
    tools:["Clé à molette"], materials:["Mitigeur","Joints"], duration:"20-60 min", difficulty:"Débutant",
    steps:[
      "Couper arrivées, dévisser, retirer ancien élément.",
      "Placer nouveau mitigeur, serrer, reconnecter et vérifier étanchéité."
    ],
    precautions:"Contrôler présence de clapets anti-retour si raccordé à réseau sensible."
  },

  /* 50 */ { name:"Poser une bande LED sous meuble", category:"Électricité/décoration",
    summary:"Pose ruban LED 12V ou 24V, alimentation et pilotage via transformateur.", price_min:10, price_max:80,
    tools:["Cutter","Ruban adhésif double-face"], materials:["Ruban LED","Alimentation"], duration:"30-90 min", difficulty:"Débutant",
    steps:[
      "Mesurer longueur, couper ruban aux points prévues, coller proprement.",
      "Souder ou clipser connecteurs, brancher alimentation et tester.",
      "Fixer câbles proprement et installer interrupteur/variateur si nécessaire."
    ],
    precautions:"Respecter polarité et puissance du transformateur."
  },

  /* 51 */ { name:"Installer une prise RJ45 (prise internet)", category:"Électricité/IT",
    summary:"Pose prise réseau (ethernet) encastrée avec connecteur type RJ45, terminaison et test.", price_min:15, price_max:80,
    tools:["Pince à sertir RJ45","Testeur réseau"], materials:["Prise RJ45","Cable Cat5e/6"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Tirer câble depuis switch/box, vérifier longueur suffisante.",
      "Dénuder, organiser paire selon standard T568B, sertir ou connecter au keystone.",
      "Fixer prise et tester continuité et débit."
    ],
    precautions:"Respecter standards de câblage; éviter torsions excessives du câble."
  },

  /* 52 */ { name:"Réparer une chape fissurée (petite réparation)", category:"Maçonnerie",
    summary:"Rebouchage fissure de chape avec mortier de réparation, lissage.", price_min:30, price_max:120,
    tools:["Truelle","Brosse"], materials:["Mortier réparation"], duration:"1-4 h", difficulty:"Intermédiaire",
    steps:[
      "Ouvrir fissure, nettoyer poussières et morceaux friables.",
      "Humidifier légèrement la zone et appliquer mortier de réparation.",
      "Lisser et laisser sécher selon fabricant."
    ],
    precautions:"Identifier cause (mouvement, séchage) si récurrence."
  },

  /* 53 */ { name:"Décoller un papier peint et poser nouveau", category:"Revêtement mural",
    summary:"Détachement, préparation support et pose nouveau papier peint intissé.", price_min:3, price_max:15,
    tools:["Spatule","Papier de verre","Brosse"], materials:["Adhésif papier peint","Papier intissé"], duration:"1-3 jours", difficulty:"Intermédiaire",
    steps:[
      "Décoller ancien papier (vapeur optionnelle), nettoyer et reboucher irrégularités.",
      "Poser colle et appliquer lés en respectant raccords motifs.",
      "Raccorder aux plinthes et retouches."
    ],
    precautions:"Tester adhérence sur support; respecter temps de séchage."
  },

  /* 54 */ { name:"Remplacer poignée de fenêtre (manivelle)", category:"Menuiserie",
    summary:"Remplacement manivelle de fenêtre, réglage et test fermeture.", price_min:10, price_max:60,
    tools:["Tournevis"], materials:["Poignée/manivelle"], duration:"10-30 min", difficulty:"Débutant",
    steps:[
      "Retirer vis de la poignée, positionner nouvelle poignée et visser.",
      "Tester ouverture/fermeture et ajuster si jeu."
    ],
    precautions:"Vérifier modèle adapté (droite/gauche)."
  },

  /* 55 */ { name:"Installer un détecteur de monoxyde de carbone", category:"Sécurité",
    summary:"Pose et test détecteur CO dans locaux avec chaudières ou foyer à combustible.", price_min:25, price_max:100,
    tools:["Perçeuse"], materials:["Détecteur CO"], duration:"10-30 min", difficulty:"Débutant",
    steps:[
      "Placer détecteur selon recommandations (à hauteur d'opération du générateur).",
      "Fixer, alimenter et tester.",
      "Remplacer piles régulièrement."
    ],
    precautions:"Ne pas confondre emplacement avec détecteur fumée; lire notice pour position exacte."
  },

  /* 56 */ { name:"Remplacer filtre de chaudière", category:"Chauffage",
    summary:"Entretien filtre de la chaudière pour garantir rendement; démontage et nettoyage/ remplacement.", price_min:20, price_max:120,
    tools:["Tournevis","Seau"], materials:["Filtre chaudière"], duration:"30-60 min", difficulty:"Intermédiaire",
    steps:[
      "Couper chaudière selon notice, localiser filtre.",
      "Démonter, nettoyer ou remplacer selon type, remonter et vérifier fonctionnement."
    ],
    precautions:"Respecter notice fabricant; risque d'eau chaude."
  },

  /* 57 */ { name:"Réparer fissure interne plâtre", category:"Enduit/Plâtrerie",
    summary:"Traitement fissure par ouverture, bande et enduit, lissage et peinture.", price_min:20, price_max:100,
    tools:["Spatule","Bande à joint","Enduit"], materials:["Enduit bande"], duration:"2-6 h", difficulty:"Intermédiaire",
    steps:[
      "Ouvrir fissure, nettoyer poussière, insérer bande armée si structurelle.",
      "Appliquer enduit en plusieurs passes, poncer et peindre."
    ],
    precautions:"Si fissure active (mouvement), diagnostic structurel requis."
  },

  /* 58 */ { name:"Poser un plan de travail cuisine", category:"Cuisine",
    summary:"Découpe, fixation et scellement plan de travail, découpe pour évier et plaque.", price_min:50, price_max:450,
    tools:["Scie sauteuse","Niveau","Colle"], materials:["Plan de travail"], duration:"2-8 h", difficulty:"Intermédiaire",
    steps:[
      "Prendre mesures exactes, reporter découpes pour évier et plaques.",
      "Découper plan, poser, fixer sur meubles et jointoyer."
    ],
    precautions:"Vérifier matériau (stratifié, bois, quartz) pour outillage et finitions."
  },

  /* 59 */ { name:"Installer prise four/plaques (alimentations dédiées)", category:"Électricité",
    summary:"Câblage dédié pour électroménager puissant (16A/20A/32A selon appareil) avec protection adaptée.", price_min:80, price_max:400,
    tools:["Pince à dénuder","Tournevis"], materials:["Câble adapté","Disjoncteur"], duration:"1-4 h", difficulty:"Pro",
    steps:[
      "Vérifier puissance appareil et prévoir circuit dédié.",
      "Tirer câble depuis tableau, installer disjoncteur et prise adaptée.",
      "Brancher et tester sous charge."
    ],
    precautions:"Travail électrique haute puissance: si doute, faire appel à électricien qualifié."
  },

  /* 60 */ { name:"Installer cloison amovible (placo)", category:"Cloisons",
    summary:"Montage ossature métallique, pose plaques BA13, bandes et finition.", price_min:200, price_max:1200,
    tools:["Perceuse-visseuse","Rail et montant","Enduit"], materials:["Plaques BA13","Rails"], duration:"1-3 jours", difficulty:"Intermédiaire",
    steps:[
      "Tracer emplacement, poser rails et montants à l'équerre.",
      "Visser plaques, bander et enduire joints, poncer et peindre."
    ],
    precautions:"Prévoir isolation phonique si cloison séparative."
  },

  /* 61 */ { name:"Remplacer un raccord flexible chauffe-eau", category:"Plomberie",
    summary:"Remplacement flexible d'alimentation eau froide/chaude sur chauffe-eau ou ballon.", price_min:10, price_max:50,
    tools:["Clé"], materials:["Flexible inox/tuyau"], duration:"15-45 min", difficulty:"Débutant",
    steps:[
      "Couper arrivée, vidanger, dévisser anciens flexibles.",
      "Visser nouveaux en respectant joints et serrage modéré."
    ],
    precautions:"Vérifier compatibilité filetage et résistance température."
  },

  /* 62 */ { name:"Installer thermostat programmable", category:"Chauffage/DOMOTIQUE",
    summary:"Remplacer thermostat mécanique par programmable, paramétrage confort/éco.", price_min:40, price_max:250,
    tools:["Tournevis","Multimètre"], materials:["Thermostat programmable"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Couper alimentation chaudière, déconnecter ancien thermostat.",
      "Brancher nouveaux fils selon schéma, fixer et paramétrer cycles.",
      "Vérifier fonctionnement chaudière."
    ],
    precautions:"Respecter branchements et polarités; consulter notice chaudière."
  },

  /* 63 */ { name:"Rénovation peinture radiateur", category:"Peinture/Chauffage",
    summary:"Décapage, ponçage, apprêt antirouille et peinture haute température.", price_min:30, price_max:150,
    tools:["Ponceuse","Pinceau/rouleau"], materials:["Peinture radiateur haute température","Apprêt"], duration:"2-6 h", difficulty:"Intermédiaire",
    steps:[
      "Nettoyer et poncer surface, dépoussiérer.",
      "Appliquer apprêt antirouille puis peinture haute-température en fines couches."
    ],
    precautions:"Veiller cuisson peinture si besoin (certaines peintures nécessitent montée en température)."
  },

  /* 64 */ { name:"Poser un support TV mural", category:"Électricité/TV",
    summary:"Fixation support mural orientable pour TV, passage câbles et vérification tenue.", price_min:20, price_max:150,
    tools:["Perceuse","Niveau","Détecteur montants"], materials:["Support TV","Chevilles"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Vérifier poids de la TV et fixer sur montants ou mur porteur.",
      "Percer, fixer support, accrocher TV et sécuriser.",
      "Cacher câbles via goulottes ou passe-câbles."
    ],
    precautions:"Utiliser ancrages pour charges; prévoir aide pour mise en place."
  },

  /* 65 */ { name:"Nettoyer gouttières", category:"Entretien extérieur",
    summary:"Débarrasser feuilles et débris, vérifier évacuation et raccords.", price_min:30, price_max:150,
    tools:["Échelle","Gants","Brosse"], materials:[], duration:"30 min - 3 h selon surface", difficulty:"Débutant/Intermédiaire",
    steps:[
      "Monter échelle en sécurité, retirer débris à la main ou raclette.",
      "Rincer et vérifier descentes; déboucher si nécessaire."
    ],
    precautions:"Travailler en sécurité en hauteur; harnais si pente élevée."
  },

  /* 66 */ { name:"Pose d'un revêtement stratifié multicouche", category:"Sols",
    summary:"Pose flottante stratifié, sous-couche, découpe périphérique et plinthes.", price_min:10, price_max:40,
    tools:["Scie sauteuse","Maillet","Cales"], materials:["Stratifié","Sous-couche","Plinthes"], duration:"4-12 h", difficulty:"Intermédiaire",
    steps:[
      "Poser sous-couche, vérifier planéité, poser lames en quinconce.",
      "Couper aux bords, poser plinthes et joints de dilatation."
    ],
    precautions:"Laisser jeu de dilatation par rapport aux murs."
  },

  /* 67 */ { name:"Remplacer serrure de meuble cuisine", category:"Menuiserie",
    summary:"Changement de loquet ou serrure coulissante sur meuble de cuisine.", price_min:5, price_max:30,
    tools:["Tournevis"], materials:["Serrure meuble"], duration:"10-30 min", difficulty:"Débutant",
    steps:[
      "Retirer ancienne serrure, positionner nouvelle et fixer.",
      "Tester et ajuster si nécessaire."
    ],
    precautions:"S'assurer modèle compatible (épaisseur porte)."
  },

  /* 68 */ { name:"Réparer une fissure de joint extérieur (solin)", category:"Toiture/Étanchéité",
    summary:"Réparation solin, remplacement mastic/plomb ou pose solin inox.", price_min:50, price_max:400,
    tools:["Cutter","Marteau","Mastic"], materials:["Mastic toiture","Plomb/solin"], duration:"1-6 h", difficulty:"Pro",
    steps:[
      "Identifier origine fuite, enlever mastic détérioré, poser mastic neuf ou solin.",
      "Contrôler étanchéité après séchage."
    ],
    precautions:"Travail en hauteur; si doute, couvreur recommandé."
  },

  /* 69 */ { name:"Installer un abattant WC avec frein de chute", category:"SDB",
    summary:"Remplacement simple de lunette WC par modèle à frein de chute.", price_min:10, price_max:60,
    tools:["Tournevis"], materials:["Abattant"], duration:"10-30 min", difficulty:"Débutant",
    steps:[
      "Retirer ancien abattant, positionner nouveau, serrer vis de fixation.",
      "Tester fermeture douce et ajuster."
    ],
    precautions:"Serrer modérément pour éviter casse plastique."
  },

  /* 70 */ { name:"Réparer une fuite sous évier (raccords flexibles)", category:"Plomberie",
    summary:"Remplacement flexible ou raccords fuités, resserrage et test.", price_min:10, price_max:50,
    tools:["Clé anglaise"], materials:["Flexible","Joints"], duration:"20-60 min", difficulty:"Débutant",
    steps:[
      "Placer seau, desserrer raccords, remplacer pièces défectueuses.",
      "Serrer et tester sous pression."
    ],
    precautions:"Éviter sur-serrage; vérifier appareils électroménagers connectés."
  },

  /* 71 */ { name:"Installer un bidet sous lave-mains (raccord évacuation)", category:"Plomberie/SDB",
    summary:"Poser et raccorder évacuation et alimentation lavabo/bidet.", price_min:80, price_max:350,
    tools:["Clé","Perceuse"], materials:["Bidé/lave-main","Siphon"], duration:"2-6 h", difficulty:"Intermédiaire",
    steps:[
      "Positionner appareil, raccorder évacuation et alimentation, tester étanchéité."
    ],
    precautions:"Vérifier pente évacuation."
  },

  /* 72 */ { name:"Poser une frise ou moulure décorative", category:"Décoration",
    summary:"Découpe et collage ou vissage frise/moulure pour finition murs/plafond.", price_min:5, price_max:40,
    tools:["Scie à onglets","Colle"], materials:["Moulure"], duration:"1-4 h", difficulty:"Débutant/Intermédiaire",
    steps:[
      "Mesurer, couper à angle, coller ou visser, faire joints et retouches peinture."
    ],
    precautions:"Précision aux angles; mastic joint pour finitions."
  },

  /* 73 */ { name:"Installer un lave-vaisselle (raccord eau/élec)", category:"Electroménager",
    summary:"Raccorder eau, évacuation et alimentation électrique d'un lave-vaisselle.", price_min:50, price_max:180,
    tools:["Clé","Tournevis"], materials:["Tuyau évacuation","Raccords"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Positionner appareil, raccorder arrivée d'eau via robinet, raccorder évacuation à siphon, brancher alimentation.",
      "Tester cycle court et vérifier absence fuites."
    ],
    precautions:"Respecter mise à la terre et précautions électriques."
  },

  /* 74 */ { name:"Poser lambris PVC muraux", category:"Revêtement mural",
    summary:"Fixation lambris PVC sur murs, coupe et joints.", price_min:10, price_max:40,
    tools:["Scie","Clou/visseuse"], materials:["Lambris PVC"], duration:"2-8 h", difficulty:"Intermédiaire",
    steps:[
      "Fixer tasseaux si nécessaire, emboîter lames, fixer bords et finitions."
    ],
    precautions:"Assurer ventilation derrière lambris si humidité."
  },

  /* 75 */ { name:"Installer détecteur d'ouverture de porte connecté", category:"Domotique/Sécurité",
    summary:"Pose capteur d'ouverture, association à centrale ou application.", price_min:15, price_max:120,
    tools:["Tournevis","Ruban adhésif"], materials:["Capteur ouverture"], duration:"10-30 min", difficulty:"Débutant",
    steps:[
      "Positionner capteur et aimant, coller ou visser, associer à la centrale et tester."
    ],
    precautions:"Placer hors portée directe d'eau."
  },

  /* 76 */ { name:"Remplacer un joint de baignoire", category:"SDB",
    summary:"Retrait ancien mastic et application nouveau joint silicone sanitaire.", price_min:15, price_max:60,
    tools:["Cutter","Pistolet à silicone"], materials:["Silicone sanitaire"], duration:"30-90 min", difficulty:"Débutant",
    steps:[
      "Retirer ancien joint, nettoyer, appliquer silicone et lisser."
    ],
    precautions:"Ventiler pendant polymérisation."
  },

  /* 77 */ { name:"Installer une arrivée d'eau extérieure pour robinet", category:"Plomberie extérieure",
    summary:"Tirer réseau depuis évier/arrivée, poser robinet extérieur et sécuriser gel.", price_min:80, price_max:350,
    tools:["Perceuse","Clé"], materials:["Tube PE","Robinet extérieur"], duration:"1-4 h", difficulty:"Intermédiaire",
    steps:[
      "Tracer parcours, percer murs, poser gaine, raccorder et tester."
    ],
    precautions:"Respecter gel saisonnier et éventuelle autorisation de voirie."
  },

  /* 78 */ { name:"Installation d'un plancher chauffant électrique (petite pièce)", category:"Chauffage/Sols",
    summary:"Pose film chauffant, raccordement et mise en place thermostat.", price_min:120, price_max:800,
    tools:["Cutter","Multimètre"], materials:["Film chauffant","Thermostat"], duration:"1-2 jours", difficulty:"Intermédiaire/Pro",
    steps:[
      "Préparer dalle, poser isolant, poser film chauffant selon plan et raccorder.",
      "Poser revêtement et paramétrer thermostat."
    ],
    precautions:"Respecter compatibilité revêtement et norme électrique; pro recommandé pour gros projets."
  },

  /* 79 */ { name:"Remplacer une poignée de balcon extérieure", category:"Menuiserie extérieure",
    summary:"Changement poignée/poignée-battant et gâche extérieure.", price_min:20, price_max:120,
    tools:["Tournevis","Perceuse"], materials:["Poignée extérieure"], duration:"20-60 min", difficulty:"Débutant",
    steps:[
      "Retirer ancienne poignée, monter nouvelle et vérifier étanchéité autour."
    ],
    precautions:"Privilégier matériaux inox pour extérieur."
  },

  /* 80 */ { name:"Installer un robinet d'arrêt sur circuit machine à laver", category:"Plomberie",
    summary:"Pose robinet dédié, vanne d'arrêt pour machine à laver.", price_min:15, price_max:60,
    tools:["Clé","Perceuse"], materials:["Robinet d'arrêt","Té"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Couper alimentation, couper canalisation et insérer robinet, raccorder flexible machine.",
      "Tester étanchéité."
    ],
    precautions:"S'assurer compatibilité diamètre canalisation."
  },

  /* 81 */ { name:"Réparer isolation phonique porte intérieure", category:"Isolation",
    summary:"Ajout bande caoutchouc, bas de porte brosse et calfeutrage pour réduire bruit.", price_min:10, price_max:80,
    tools:["Tournevis","Cutter"], materials:["Brosse bas de porte","Joint caoutchouc"], duration:"30-90 min", difficulty:"Débutant",
    steps:[
      "Mesurer entrée, installer bas de porte et poser joint autour du cadre.",
      "Ajuster et tester réduction bruit."
    ],
    precautions:"Vérifier pas de frottement excessif sur sol."
  },

  /* 82 */ { name:"Réparer une prise qui chauffe (surchauffe)", category:"Électricité",
    summary:"Diagnostic connexion lâche, remplacement prise et vérification calibre circuit.", price_min:25, price_max:150,
    tools:["Tournevis","Testeur thermique (option)"], materials:["Prise neuve"], duration:"20-90 min", difficulty:"Intermédiaire",
    steps:[
      "Couper courant et vérifier connexions; resserrer ou remplacer prise si contact dégradé.",
      "Vérifier appareil branché et puissance; ne pas réutiliser prise si trace de brûlé."
    ],
    precautions:"Surchauffe signe danger électrique: intervenir rapidement et envisager diagnostique pro."
  },

  /* 83 */ { name:"Installer un portillon jardin coulissant", category:"Clôture",
    summary:"Pose rail, motorisation optionnelle et ancrage portillon.", price_min:300, price_max:2000,
    tools:["Perceuse","Niveau"], materials:["Portillon","Rails","Motorisation"], duration:"1-3 jours", difficulty:"Pro",
    steps:[
      "Préparer sol et fondations, fixer rails, monter portillon et régler."
    ],
    precautions:"Travail lourd nécessitant parfois permis municipal pour plantation/alignement."
  },

  /* 84 */ { name:"Peindre radiateur fonte (apprêt)", category:"Peinture",
    summary:"Décapage, apprêt et peinture spéciale radiateur pour éviter rouille.", price_min:40, price_max:200,
    tools:["Pinceau","Ponceuse"], materials:["Peinture radiateur","Apprêt"], duration:"2-6 h", difficulty:"Intermédiaire",
    steps:[
      "Poncer, dépoussiérer, appliquer apprêt puis peinture spécifique."
    ],
    precautions:"Protéger surfaces environnantes."
  },

  /* 85 */ { name:"Détecter et réparer infiltration terrasse", category:"Étanchéité",
    summary:"Diagnostic étanchéité, colmatage ou remplacement membrane d'étanchéité.", price_min:150, price_max:2500,
    tools:["Marteau","Sonde"], materials:["Membrane EPDM ou étanchéité liquide"], duration:"1 jour - plusieurs jours", difficulty:"Pro",
    steps:[
      "Identifier source, vérifier pente, réparer membrane ou refaire étanchéité."
    ],
    precautions:"Travail technique; mieux pris en charge par professionnel pour surfaces importantes."
  },

  /* 86 */ { name:"Poser porte-serviettes chauffant (sèche-serviettes)", category:"Chauffage/SDB",
    summary:"Fixation murale, raccordement électrique ou eau chaude selon modèle.", price_min:100, price_max:500,
    tools:["Perceuse","Clé"], materials:["Sèche-serviettes","Fixations"], duration:"1-4 h", difficulty:"Intermédiaire/Pro",
    steps:[
      "Fixer supports, raccorder à circuit eau chaude ou électrique, purger et tester."
    ],
    precautions:"Respecter normes électriques (IP) pour SDB."
  },

  /* 87 */ { name:"Poser une crédence en carrelage (petite surface)", category:"Carrelage",
    summary:"Pose carrelage crédence, découpe et jointoiement.", price_min:20, price_max:80,
    tools:["Truelle","Coupe-carreaux"], materials:["Carrelage","Colle"], duration:"2-8 h", difficulty:"Intermédiaire",
    steps:[
      "Préparer support, poser colle, placer carreaux, jointoyer."
    ],
    precautions:"Respecter plans de joints et motifs."
  },

  /* 88 */ { name:"Remplacer filtre hotte aspirante", category:"Entretien",
    summary:"Retirer et remplacer filtres à graisse pour performance.", price_min:10, price_max:50,
    tools:[], materials:["Filtre hotte"], duration:"10-20 min", difficulty:"Débutant",
    steps:[
      "Ouvrir hotte, sortir filtres, remplacer et nettoyer intérieur."
    ],
    precautions:"Nettoyage régulier pour efficacité."
  },

  /* 89 */ { name:"Installer barres d'appui salle de bain", category:"SDB/Sécurité",
    summary:"Fixation barres d'appui et renforcement mur, support personne à mobilité réduite.", price_min:40, price_max:200,
    tools:["Perceuse","Chevilles lourdes"], materials:["Barres d'appui"], duration:"1-2 h", difficulty:"Intermédiaire",
    steps:[
      "Repérer hauteur, fixer avec chevilles adaptées, vérifier tenue."
    ],
    precautions:"Fixer dans montant solide ou renfort."
  },

  /* 90 */ { name:"Remplacer robinet cuisine (mitigeur)", category:"Plomberie",
    summary:"Dépose ancien mitigeur, montage nouveau, raccords alimentation.", price_min:30, price_max:180,
    tools:["Clé à molette","Tournevis"], materials:["Mitigeur","Joints"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Couper eau, démonter, installer et vérifier étanchéité."
    ],
    precautions:"Vérifier compatibilité flexibles et pression."
  },

  /* 91 */ { name:"Installer détecteur de présence pour éclairage extérieur", category:"Électricité extérieure",
    summary:"Pose capteur, réglage sensibilité et durée, raccord électrique.", price_min:30, price_max:150,
    tools:["Perceuse","Tournevis"], materials:["Détecteur présence"], duration:"30-90 min", difficulty:"Intermédiaire",
    steps:[
      "Raccorder capteur, régler sensibilité et tester à différentes heures."
    ],
    precautions:"Positionner hors source de fausses détections (rues, végétation)."
  },

  /* 92 */ { name:"Changer une fenêtre simple vitrage (petite lucarne)", category:"Menuiserie",
    summary:"Dépose fenêtre ancienne et pose nouvelle fenêtre PVC ou alu (fenêtre complète).", price_min:150, price_max:900,
    tools:["Perceuse","Mastic"], materials:["Fenêtre","Mastic d'étanchéité"], duration:"2-8 h", difficulty:"Pro",
    steps:[
      "Démonter ancienne fenêtre, poser nouveau cadre, caler et sceller, mastiquer et jointoyer."
    ],
    precautions:"Travail volumineux; respecter étanchéité et pentes d'écoulement."
  },

  /* 93 */ { name:"Installer un seuil de porte PMR", category:"Menuiserie/Accessibilité",
    summary:"Pose seuil adapté pour passage fauteuil roulant, ajustage et scellement.", price_min:80, price_max:400,
    tools:["Perceuse","Mètre"], materials:["Seuil PMR","Mastic"], duration:"1-3 h", difficulty:"Intermédiaire",
    steps:[
      "Mesurer, couper et poser seuil avec scellement approprié et joints."
    ],
    precautions:"Respecter normes accessibilité locales."
  },

  /* 94 */ { name:"Poser joint carrelage salle de bain", category:"Carrelage",
    summary:"Application de joint hydrofuge entre carreaux pour étanchéité.", price_min:5, price_max:30,
    tools:["Sponge","Spatule"], materials:["Joint hydrofuge"], duration:"1-3 h", difficulty:"Débutant",
    steps:[
      "Remplir joints, essuyer surplus, laisser sécher."
    ],
    precautions:"Utiliser joint adapté zones humides."
  },

  /* 95 */ { name:"Installer une hotte indépendante (évacuation extérieure)", category:"Cuisine",
    summary:"Fixation hotte et raccordement évacuation en gaine vers extérieur.", price_min:150, price_max:600,
    tools:["Perceuse","Scie cloche"], materials:["Hotte","Gaine d'évacuation"], duration:"2-6 h", difficulty:"Intermédiaire",
    steps:[
      "Positionner hotte, percer passage gaine, raccorder et sceller.",
      "Vérifier tirage et étanchéité."
    ],
    precautions:"Percer mur extérieur nécessite précautions et scellement."
  },

  /* 96 */ { name:"Réparer lambris extérieur (planche abîmée)", category:"Revêtement extérieur",
    summary:"Remplacer planche ou lame abîmée et traiter bois.", price_min:30, price_max:200,
    tools:["Scie","Visseuse"], materials:["Lame bois/composite"], duration:"1-4 h", difficulty:"Intermédiaire",
    steps:[
      "Déposer lame endommagée, couper et poser nouvelle, fixer et traiter surface."
    ],
    precautions:"Assurer protection contre intempéries."
  },

  /* 97 */ { name:"Installer une pompe de relevage (petite fosse)", category:"Plomberie",
    summary:"Installation pompe pour eaux usées si évacuation gravitaire impossible.", price_min:300, price_max:1500,
    tools:["Perceuse","Clé"], materials:["Pompe de relevage","Coffret"], duration:"1-2 jours", difficulty:"Pro",
    steps:[
      "Préparer fosse, poser pompe, raccorder évacuation et coffret électrique, tester.",
      "Prévoir clapet anti-retour et arrêt automatique."
    ],
    precautions:"Travail avec circuit électrique: respecter normes et étanchéité."
  },

  /* 98 */ { name:"Renforcer plancher (poutres faibles)", category:"Charpente/Plancher",
    summary:"Renfort poutres, ajout solive ou platelage pour limiter fléchissement.", price_min:300, price_max:2500,
    tools:["Scie","Perceuse","Visseuse"], materials:["Poutrelles","Solives"], duration:"1-5 jours", difficulty:"Pro",
    steps:[
      "Diagnostic portance, pose renforts ou ajout solives, contrôle niveau et stabilité."
    ],
    precautions:"Intervention structurelle: ingénieur ou charpentier conseillé."
  },

  /* 99 */ { name:"Installer un compteurs d'eau (remplacement)", category:"Plomberie/Compteurs",
    summary:"Remplacement compteur ou pose compteur divisionnaire selon réglementation.", price_min:80, price_max:400,
    tools:["Clé","Outillage plomberie"], materials:["Compteur"], duration:"30-120 min", difficulty:"Pro",
    steps:[
      "Couper alimentation, dévisser ancien, poser nouveau et étalonner si nécessaire."
    ],
    precautions:"Souvent intervention réglementée; relevé et signalisation auprès fournisseur."
  },

  /* 100 */ { name:"Réparer fissure de beton sur dalle extérieure", category:"Maçonnerie extérieur",
    summary:"Rebouchage fissure avec mortier adapté ou résine de réparation pour dallage.", price_min:50, price_max:400,
    tools:["Brosse","Truelle"], materials:["Mortier réparation"], duration:"1-8 h", difficulty:"Intermédiaire",
    steps:[
      "Nettoyer fissure, appliquer produit adapté, lisser et protéger le temps de prise."
    ],
    precautions:"Identifier cause (mouvement/gel) si fissure récidivante."
  }
];

/* ============ Fonctions UI ============ */
const searchEl = document.getElementById('search');
const listItems = document.getElementById('listItems');
const detailView = document.getElementById('detailView');
const detailEmpty = document.getElementById('detailEmpty');
const detailCol = document.getElementById('detailCol');
const initialList = document.getElementById('initialList');
const nores = document.getElementById('nores');

/* Show initial suggestions (first 8 curated) */
const initial = [
  "Remplacer une prise électrique simple",
  "Réparer une fuite d'évier (siphon)",
  "Poser un revêtement de sol vinyle clipsable",
  "Peindre un mur intérieur (1 couche de finition)",
  "Installer un luminaire suspendu",
  "Déboucher une canalisation domestique",
  "Remplacer un joint de fenêtre (PVC/bois)",
  "Installer une prise RJ45 (prise internet)"
];

function createMiniCard(work){
  const div = document.createElement('div');
  div.className='miniCard';
  div.innerHTML = `<div style="font-weight:600">${work.name}</div><div class="small">${work.category} • <span class="price">${work.price_min}€-${work.price_max}€</span></div>`;
  div.onclick = ()=> showDetail(work);
  return div;
}
initial.forEach(name=>{
  const w = works.find(x=>x.name===name);
  if(w) initialList.appendChild(createMiniCard(w));
});

/* render list (filtered) */
function renderList(filter=''){
  listItems.innerHTML='';
  const q = filter.trim().toLowerCase();
  let filtered = works.filter(w=>{
    if(!q) return true;
    return (w.name + ' ' + w.summary + ' ' + w.category + ' ' + (w.tools || []).join(' ') + ' ' + (w.materials||[]).join(' ')).toLowerCase().includes(q);
  });
  if(filtered.length===0){ nores.style.display='block'; }
  else { nores.style.display='none'; }
  // Show results as compact cards
  filtered.slice(0,50).forEach(w=>{
    const c = document.createElement('div'); c.className='card';
    c.innerHTML = `<div class="left"><div class="name">${w.name}</div><div class="meta">${w.summary}</div><div class="small"><strong>Outils:</strong> ${w.tools.join(', ')}</div></div><div class="side"><div class="price">${w.price_min}€ - ${w.price_max}€</div><div class="small">${w.duration} • ${w.difficulty}</div></div>`;
    c.onclick = ()=> showDetail(w);
    listItems.appendChild(c);
  });
}

/* Show detailed view */
function showDetail(w){
  detailEmpty.style.display='none';
  detailView.style.display='block';
  detailView.innerHTML = '';
  const title = document.createElement('h2'); title.textContent = w.name;
  const meta = document.createElement('div'); meta.className='small'; meta.innerHTML = `<strong>Catégorie:</strong> ${w.category} • <strong>Estimation:</strong> <span class="price">${w.price_min}€ - ${w.price_max}€</span> • <strong>Durée:</strong> ${w.duration} • <strong>Niveau:</strong> ${w.difficulty}`;
  const sum = document.createElement('p'); sum.textContent = w.summary;
  const tools = document.createElement('div'); tools.className='section'; tools.innerHTML = `<h4>Outils recommandés</h4><div class="tools">${w.tools.map(t=>`<div class="badge">${t}</div>`).join('')}</div>`;
  const mats = document.createElement('div'); mats.className='section'; mats.innerHTML = `<h4>Matériaux</h4><div class="materials">${w.materials.map(m=>`<div class="badge">${m}</div>`).join('')}</div>`;
  const stepsWrap = document.createElement('div'); stepsWrap.className='section'; stepsWrap.innerHTML = `<h4>Étapes détaillées</h4><div class="steps"></div>`;
  const stepsContainer = stepsWrap.querySelector('.steps');
  w.steps.forEach((s,i)=>{
    const st = document.createElement('div'); st.className='step';
    st.innerHTML = `<h4>Étape ${i+1}</h4><div>${s}</div>`;
    stepsContainer.appendChild(st);
  });
  const prec = document.createElement('div'); prec.className='section'; prec.innerHTML = `<h4>Précautions & conseils</h4><div class="small">${w.precautions || 'Aucune précaution spéciale.'}</div>`;
  const buy = document.createElement('div'); buy.className='section'; buy.innerHTML = `<h4>Estimation & options d'achat</h4>
    <div class="small">Prix indicatifs: <span class="price">${w.price_min}€ - ${w.price_max}€</span>. Pour acheter outils & matériaux, rechercher les produits listés sur vos boutiques habituelles (grandes surfaces bricolage ou sites spécialistes). </div>`;
  const close = document.createElement('div'); close.style.marginTop='12px';
  detailView.appendChild(title);
  detailView.appendChild(meta);
  detailView.appendChild(sum);
  detailView.appendChild(tools);
  detailView.appendChild(mats);
  detailView.appendChild(stepsWrap);
  detailView.appendChild(prec);
  detailView.appendChild(buy);
  detailView.appendChild(close);
  // Scroll detail to top
  detailView.scrollTop = 0;
}

/* Search handler */
searchEl.addEventListener('input', e=>{
  const q = e.target.value;
  renderList(q);
});

/* Copy JSON button */
document.getElementById('copyData').addEventListener('click', ()=>{
  const payload = JSON.stringify(works, null, 2);
  navigator.clipboard.writeText(payload).then(()=> {
    alert('JSON des travaux copié dans le presse-papiers. Tu peux le coller dans un fichier works.json.');
  }, ()=> alert('Impossible de copier. Essaie manuellement.'));
});

/* Initial render: show first few works and list */
renderList('');
// Show first 8 works in initial area (already set), and fill complete list (first 40 to avoid overload)
(function fillInitialList(){
  const preview = works.slice(0,8);
  // already filled above; ensure list shows first 20
  renderList('');
})();

</script>
</body>
</html>
