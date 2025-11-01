<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Guide Rénovation Maison</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 2rem; background: #f9f9f9; }
    h1 { color: #2c3e50; }
    input { padding: 0.5rem; width: 300px; margin-right: 0.5rem; }
    button { padding: 0.5rem; }
    #suggestions li { list-style: none; padding: 0.3rem; background: #ecf0f1; margin: 0.2rem 0; cursor: pointer; border-radius: 4px; }
    #suggestions li:hover { background: #d0d7de; }
    #work-details { margin-top: 2rem; padding: 1rem; background: #fff; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    ol { padding-left: 1.5rem; }
  </style>
</head>
<body>

<h1>🔧 Guide Rénovation Maison</h1>

<div>
  <input id="search-input" placeholder="Que voulez-vous faire ?" />
  <button id="search-btn">Rechercher</button>
</div>

<h3>Suggestions :</h3>
<ul id="suggestions"></ul>

<div id="work-details"></div>

<script>
// ============================
// 🔹 Liste de 100+ travaux maison ultra détaillés
// ============================
const works = [
  { name: "Peinture mur salon", description: "Préparez le mur : dépoussiérez, rebouchez les trous. Appliquez sous-couche, laissez sécher. Appliquez deux couches de peinture uniformément. Masquez plinthes et encadrements.", materials: ["Peinture", "Sous-couche", "Ruban adhésif"], tools: ["Pinceau", "Rouleau", "Bac à peinture"], difficulty: "Facile", time: "4-6 heures", steps: ["Préparer le mur", "Appliquer sous-couche", "Appliquer première couche", "Appliquer seconde couche", "Retirer ruban et nettoyer"] },
  { name: "Installation prise électrique", description: "Coupez le courant au tableau. Marquez l'emplacement de la prise. Percez le mur, insérez la boîte encastrée. Branchez fils selon code couleur (bleu neutre, rouge phase, vert/jaune terre). Fixez la prise et testez.", materials: ["Prise électrique", "Boîte encastrée", "Câble électrique"], tools: ["Tournevis", "Pince coupante", "Testeur de tension"], difficulty: "Moyen", time: "1-2 heures", steps: ["Couper le courant", "Marquer l'emplacement", "Percer et insérer la boîte", "Câbler la prise", "Fixer et tester"] },
  { name: "Pose carrelage cuisine", description: "Préparez la surface, nettoyez et nivelez. Étalez colle à carrelage avec spatule crantée. Posez carreaux en respectant les espacements. Laissez sécher, réalisez les joints, nettoyez l’excédent.", materials: ["Carrelage", "Colle à carrelage", "Joints"], tools: ["Truelle", "Croisillons", "Niveau", "Maillet caoutchouc"], difficulty: "Moyen", time: "1-2 jours", steps: ["Préparer surface", "Étaler colle", "Poser carreaux", "Laisser sécher", "Faire joints et nettoyer"] },
  { name: "Réparation robinet fuite", description: "Fermez arrivée d’eau. Démontez robinet. Remplacez joint ou mécanisme défectueux. Remontez robinet. Rouvrez eau, vérifiez absence fuite.", materials: ["Joint robinet", "Teflon"], tools: ["Clé à molette", "Tournevis"], difficulty: "Facile", time: "30-60 minutes", steps: ["Fermer eau", "Démonter robinet", "Remplacer joint/mécanisme", "Remonter robinet", "Tester"] },
  { name: "Installation luminaire plafond", description: "Coupez le courant. Retirez ancien luminaire. Installez support du nouveau luminaire. Branchez fils selon code couleur. Fixez luminaire et testez.", materials: ["Luminaire", "Vis et chevilles"], tools: ["Tournevis", "Escabeau"], difficulty: "Moyen", time: "30-60 minutes", steps: ["Couper courant", "Retirer ancien luminaire", "Installer support", "Brancher fils", "Fixer et tester"] },
  { name: "Montage meuble IKEA", description: "Déballez le meuble, vérifiez pièces. Suivez notice étape par étape. Assemblez chaque partie avec vis et chevilles. Vérifiez stabilité et ajustez si nécessaire.", materials: ["Meuble", "Vis et chevilles"], tools: ["Tournevis", "Marteau"], difficulty: "Facile", time: "1-3 heures", steps: ["Déballer et vérifier pièces", "Suivre notice", "Assembler parties", "Visser et ajuster", "Vérifier stabilité"] },
  { name: "Installation étagère murale", description: "Choisissez emplacement. Marquez perçages. Percez murs et insérez chevilles. Fixez étagère et vérifiez stabilité.", materials: ["Étagère", "Chevilles", "Vis"], tools: ["Perceuse", "Niveau", "Tournevis"], difficulty: "Facile", time: "1 heure", steps: ["Choisir emplacement", "Marquer perçages", "Percer et insérer chevilles", "Fixer étagère", "Vérifier stabilité"] },
  { name: "Peinture plafond", description: "Protégez meubles et sols. Appliquez sous-couche plafond. Appliquez deux couches de peinture en mouvements réguliers. Laissez sécher.", materials: ["Peinture plafond", "Sous-couche", "Ruban adhésif"], tools: ["Rouleau télescopique", "Pinceau"], difficulty: "Moyen", time: "3-5 heures", steps: ["Protéger zone", "Appliquer sous-couche", "Appliquer première couche", "Appliquer seconde couche", "Nettoyer"] },
  { name: "Réparation chasse d’eau", description: "Coupez eau. Retirez couvercle réservoir. Vérifiez flotteur et mécanisme. Remplacez pièces défectueuses. Remontez couvercle et testez.", materials: ["Pièces chasse d’eau"], tools: ["Tournevis", "Clé"], difficulty: "Facile", time: "30-45 minutes", steps: ["Couper eau", "Ouvrir réservoir", "Vérifier mécanisme", "Remplacer pièces", "Tester"] },
  { name: "Isolation fenêtre", description: "Mesurez dimensions. Coupez joint isolant. Appliquez autour fenêtre en pressant. Vérifiez étanchéité à l’air et à l’eau.", materials: ["Joint isolant"], tools: ["Ciseaux", "Ruban mesure"], difficulty: "Facile", time: "1-2 heures", steps: ["Mesurer fenêtre", "Couper joint", "Appliquer joint", "Vérifier étanchéité"] },
  { name: "Montage porte intérieure", description: "Vérifiez dimensions. Installez les gonds sur le cadre. Accrochez porte, ajustez alignement. Fixez vis, testez ouverture/fermeture.", materials: ["Porte", "Gonds", "Vis"], tools: ["Perceuse", "Tournevis", "Niveau"], difficulty: "Moyen", time: "2-3 heures", steps: ["Vérifier dimensions", "Installer gonds", "Accrocher porte", "Ajuster alignement", "Fixer vis et tester"] },
  { name: "Réparer volet roulant", description: "Identifiez problème (sangle, moteur, lames). Démontez si nécessaire. Remplacez pièce défectueuse. Testez fonctionnement.", materials: ["Sangle", "Moteur ou lames"], tools: ["Tournevis", "Clé"], difficulty: "Moyen", time: "1-2 heures", steps: ["Identifier problème", "Démonter volet", "Remplacer pièce", "Remonter volet", "Tester"] },
  { name: "Installation détecteur fumée", description: "Choisissez emplacement plafond ou mur. Percez trous, insérez chevilles. Fixez détecteur, installez piles et testez.", materials: ["Détecteur fumée", "Piles"], tools: ["Perceuse", "Tournevis"], difficulty: "Facile", time: "30 minutes

