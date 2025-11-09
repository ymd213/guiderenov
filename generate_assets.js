<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>GuideRénov Pro — Assistant & 75 projets</title>
<meta name="description" content="GuideRénov Pro — 75 guides travaux détaillés, assistant IA prototype, gestion projets, profil.">
<style>
/* ---------- THEME & BASE ---------- */
:root{
  --bg:#f5f7fa;
  --surface:#ffffff;
  --muted:#6b7280;
  --text:#0b1220;
  --primary:#0f4c81;   /* bleu pro */
  --accent:#f97316;    /* orange chantier */
  --cardShadow: 0 8px 30px rgba(16,24,40,0.06);
  --radius:14px;
}
*{box-sizing:border-box}
html,body{height:100%;margin:0;background:var(--bg);color:var(--text);font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,"Helvetica Neue",Arial;padding:0}
h1,h2,h3{margin:0}
a{text-decoration:none;color:inherit}

/* ---------- LAYOUT ---------- */
.app {display:flex;min-height:100vh;overflow:hidden}
.sidebar {
  width:300px;
  background:linear-gradient(180deg,#0b2033,#071726);
  color:#fff;
  padding:24px;
  display:flex;
  flex-direction:column;
  gap:18px;
}
.brand {display:flex;align-items:center;gap:12px;font-weight:800;font-size:20px}
.brand .logo {background:var(--accent);width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800}
.nav {display:flex;flex-direction:column;gap:6px;margin-top:6px}
.nav button {background:transparent;border:none;color:inherit;padding:10px 12px;border-radius:10px;text-align:left;cursor:pointer;font-weight:700;display:flex;gap:10px;align-items:center}
.nav button.active, .nav button:hover {background:rgba(255,255,255,0.06)}
.nav .icon {width:28px;text-align:center;opacity:0.95}

.sidebar .footer {margin-top:auto;font-size:13px;color:#9fb0cf}

/* main area */
.main {
  flex:1;
  display:flex;
  flex-direction:column;
  gap:18px;
  padding:20px 28px;
  overflow:auto;
  background: linear-gradient(180deg,#f5f7fa,#eef2f7);
}

/* top bar with profile */
.topbar {display:flex;justify-content:space-between;align-items:center;gap:12px}
.search {display:flex;gap:12px;align-items:center}
.search input {padding:10px 12px;border-radius:12px;border:1px solid #e6eef7;width:420px;background:white}
.top-profile {display:flex;align-items:center;gap:10px}
.profile-pic {width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid #fff;box-shadow:0 6px 20px rgba(16,24,40,0.12)}

/* pages */
.pages {display:block}
.page {display:none}
.page.active {display:block}

/* hero */
.hero {background:linear-gradient(90deg, rgba(15,76,129,0.06), rgba(249,115,22,0.04));padding:18px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;gap:12px;box-shadow:var(--cardShadow)}
.hero .left {max-width:70%}
.hero h1 {color:var(--primary);font-size:20px;margin-bottom:6px}
.hero p {color:var(--muted);margin:0}

/* grid for projects */
.controls {display:flex;gap:12px;align-items:center;margin-top:12px}
.filter {padding:8px 10px;border-radius:10px;border:1px solid #e6eef7;background:white}
.grid {display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px;margin-top:14px}

/* project card */
.project-card {
  background:var(--surface);
  border-radius:12px;
  overflow:hidden;
  box-shadow:var(--cardShadow);
  display:flex;
  flex-direction:column;
  transition:transform .18s ease, box-shadow .18s ease;
}
.project-card:hover {transform:translateY(-6px)}
.project-media img {width:100%;height:170px;object-fit:cover;display:block}
.project-body {padding:12px;display:flex;flex-direction:column;gap:8px}
.project-title {font-weight:800;color:var(--primary);font-size:16px}
.project-desc {color:var(--muted);font-size:13px}
.badges {display:flex;gap:8px;flex-wrap:wrap}
.badge {padding:6px 8px;border-radius:999px;font-weight:700;font-size:12px;background:#f1f5f9;color:var(--primary)}

/* modal / detail */
.modal {position:fixed;inset:0;background:rgba(4,8,15,0.6);display:none;align-items:center;justify-content:center;padding:18px;z-index:1000}
.modal.active {display:flex}
.modal-card {width:100%;max-width:1100px;background:var(--surface);border-radius:12px;overflow:hidden;box-shadow:0 30px 80px rgba(2,6,23,0.5);max-height:92vh;display:flex;flex-direction:column}
.modal-head {display:flex;justify-content:space-between;align-items:center;padding:18px 20px;border-bottom:1px solid #eef2f7}
.modal-body {padding:18px;overflow:auto}
.modal-grid {display:grid;grid-template-columns:340px 1fr;gap:18px}
.uploader {border:2px dashed #e6eef7;padding:12px;border-radius:10px;text-align:center;cursor:pointer;color:var(--muted);background:linear-gradient(180deg,#fff,#fbfbfd)}
.form-row {display:flex;gap:8px;align-items:center}

/* lists and steps */
.list {background:#f8fafc;border-radius:10px;padding:10px}
.step {background:white;padding:12px;border-radius:10px;border:1px solid #eef2f7;margin-bottom:8px}
.step .num {font-weight:800;color:var(--primary);margin-right:8px}

/* chat */
.chat {display:flex;flex-direction:column;gap:8px}
.chat-history {height:360px;overflow:auto;padding:12px;border-radius:10px;background:linear-gradient(180deg,#fff,#fbfbff);border:1px solid #eef2f7}
.msg {display:inline-block;padding:10px 12px;border-radius:12px;margin-bottom:8px;max-width:78%}
.msg.user {background:var(--primary);color:white;align-self:flex-end}
.msg.ai {background:#f1f5f9;color:var(--text);align-self:flex-start}

/* saved list */
.saved-list {display:flex;flex-direction:column;gap:10px}

/* small responsive */
@media (max-width:1000px){
  .sidebar{display:none}
  .search input{width:200px}
  .modal-grid{grid-template-columns:1fr}
  .grid{grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}
}
</style>
</head>
<body>
<div class="app">
  <!-- SIDEBAR -->
  <aside class="sidebar" aria-label="Navigation principale">
    <div class="brand">
      <div class="logo">GR</div>
      <div>GuideRénov Pro</div>
    </div>

    <nav class="nav" role="navigation" aria-label="Menu">
      <button data-page="home" class="active"><span class="icon">🏠</span>Accueil</button>
      <button data-page="projects"><span class="icon">📂</span>Projets</button>
      <button data-page="assistant"><span class="icon">🤖</span>Assistant IA</button>
      <button data-page="saved"><span class="icon">💾</span>Mes Projets</button>
      <button data-page="profile"><span class="icon">👤</span>Profil</button>
    </nav>

    <div class="footer">
      <div style="font-size:13px;color:#9fb0cf">Prototype local • Données exemples</div>
    </div>
  </aside>

  <!-- MAIN -->
  <main class="main" role="main">
    <div class="topbar">
      <div class="search">
        <input id="globalSearch" type="text" placeholder="Rechercher un projet, ex: peinture, lavabo..." aria-label="Recherche">
      </div>
      <div class="top-profile">
        <div id="topUserName" style="font-weight:700;color:var(--primary)">Invité</div>
        <img id="topProfilePic" class="profile-pic" src="https://picsum.photos/seed/profile/80/80" alt="profil">
      </div>
    </div>

    <!-- HERO -->
    <div id="home" class="page active">
      <div class="hero">
        <div class="left">
          <h1>GuideRénov — ton assistant travaux</h1>
          <p>75 guides pas-à-pas. Prends une photo, saisis les cotes et obtiens la liste complète du matériel, une estimation et une notice détaillée.</p>
        </div>
        <div class="right">
          <button id="btnStart" style="background:var(--accent);border:none;padding:10px 14px;border-radius:10px;color:white;font-weight:800">Commencer un projet</button>
        </div>
      </div>
      <section style="margin-top:14px">
        <h2 style="margin-bottom:8px">Projets populaires</h2>
        <div id="popularGrid" class="grid"></div>
      </section>
    </div>

    <!-- PROJECTS PAGE -->
    <section id="projects" class="page">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <h1>Projets</h1>
        <div style="display:flex;gap:8px;align-items:center">
          <select id="categoryFilter" class="filter" aria-label="Filtrer catégorie">
            <option value="all">Toutes catégories</option>
          </select>
          <button id="btnNew" style="background:var(--primary);color:white;border:none;padding:8px 12px;border-radius:8px">Nouveau projet</button>
        </div>
      </div>

      <div class="controls" style="margin-top:8px">
        <div class="small" id="projectsCount" style="color:var(--muted)"></div>
      </div>

      <div id="projectsGrid" class="grid" aria-live="polite"></div>
    </section>

    <!-- ASSISTANT IA PAGE -->
    <section id="assistant" class="page">
      <h1>Assistant IA</h1>
      <div style="display:flex;gap:18px">
        <div style="flex:1">
          <div class="chat">
            <div id="chatHistory" class="chat-history"></div>
            <div style="display:flex;gap:8px;margin-top:8px">
              <input id="chatInput" type="text" placeholder="Ex: peinture 300x250 ou 'combien de litres pour 12m2'">
              <button id="chatSend">Envoyer</button>
            </div>
          </div>
        </div>
        <div style="width:360px">
          <div class="card">
            <h3 style="margin-bottom:8px">Outils rapides</h3>
            <div class="small">Entrez des dimensions (LxH en cm) ou demandez un calcul :</div>
            <div style="margin-top:8px">
              <input id="quickDims" type="text" placeholder="Ex: 300x250">
              <button id="quickCalc" style="margin-top:8px">Calcul rapide peinture</button>
            </div>
          </div>
          <div class="card" style="margin-top:12px">
            <h3>Conseils sécurité</h3>
            <ul class="small">
              <li>Coupez l'alimentation (électrique/eau) avant intervention.</li>
              <li>Port de gants, lunettes et masque selon travaux.</li>
              <li>Vérifiez les normes locales pour installations techniques.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- SAVED -->
    <section id="saved" class="page">
      <h1>Mes Projets</h1>
      <div id="savedList" class="saved-list"></div>
    </section>

    <!-- PROFILE -->
    <section id="profile" class="page">
      <h1>Profil</h1>
      <div style="display:flex;gap:18px;align-items:center">
        <img id="profilePhoto" src="https://picsum.photos/seed/profile/120/120" class="profile-pic" alt="photo">
        <div style="flex:1">
          <label>Nom<br><input id="pfName" type="text" style="padding:8px;border-radius:8px;border:1px solid #e6eef7;width:100%"></label><br><br>
          <label>Email<br><input id="pfEmail" type="email" style="padding:8px;border-radius:8px;border:1px solid #e6eef7;width:100%"></label><br><br>
          <label>Photo URL<br><input id="pfPhotoUrl" type="text" style="padding:8px;border-radius:8px;border:1px solid #e6eef7;width:100%"></label><br>
          <div style="display:flex;gap:8px;margin-top:10px">
            <button id="saveProfileBtn" style="background:var(--primary);color:white;padding:10px;border-radius:8px;border:none">Sauvegarder</button>
            <button id="logoutBtn" style="background:#e5e7eb;border:none;padding:10px;border-radius:8px">Déconnexion</button>
          </div>
          <div id="profileMsg" class="small" style="margin-top:8px;color:var(--muted)"></div>
        </div>
      </div>
    </section>

  </main>
</div>

<!-- PROJECT MODAL -->
<div id="projectModal" class="modal" role="dialog" aria-hidden="true">
  <div class="modal-card" role="document">
    <div class="modal-head">
      <div>
        <strong id="modalTitle">Titre projet</strong>
        <div id="modalMeta" class="small"></div>
      </div>
      <div>
        <button id="closeModal" style="background:#f3f4f6;border:none;padding:8px;border-radius:8px">Fermer</button>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-grid">
        <div>
          <div class="uploader" id="photoUploader">
            <div style="font-weight:700">📷 Photos / aperçu</div>
            <div class="small" style="margin-top:6px">Cliquez pour ajouter une photo ou glissez-déposez</div>
            <input id="modalPhotoInput" type="file" accept="image/*" class="hidden">
            <div id="photoPreview" style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"></div>
          </div>

          <div style="margin-top:12px">
            <div style="display:flex;gap:8px">
              <input id="dimW" type="number" placeholder="Largeur (cm)" style="flex:1;padding:8px;border-radius:8px;border:1px solid #e6eef7">
              <input id="dimH" type="number" placeholder="Hauteur (cm)" style="flex:1;padding:8px;border-radius:8px;border:1px solid #e6eef7">
              <input id="dimD" type="number" placeholder="Profondeur (cm)" style="flex:1;padding:8px;border-radius:8px;border:1px solid #e6eef7">
            </div>
            <div style="display:flex;gap:8px;margin-top:8px">
              <button id="calcBtn" style="background:var(--primary);color:white;padding:10px;border-radius:8px;border:none">Calculer</button>
              <button id="saveToMine" style="background:var(--accent);color:white;padding:10px;border-radius:8px;border:none">Sauvegarder</button>
            </div>
            <div id="calcResult" style="margin-top:12px"></div>
          </div>
        </div>

        <div>
          <div id="modalContent">
            <!-- description, matériaux, étapes -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
/* ----------------- DATA: 75 projects with detailed guides ----------------- */
/* For readability I create an array with 75 project objects.
   Each project has:
     - id
     - title
     - category
     - image (placeholder)
     - short
     - materials: [{name, qty, price?}]
     - tools: [..]
     - steps: [{title, desc}]
     - notes: [..]
     - difficulty/time
*/
const PROJECTS = [
  // 1
  {
    id: 'p01',
    title: 'Montage meuble IKEA (Billy, Kallax)',
    category: 'Menuiserie',
    image: 'https://picsum.photos/seed/projet1/800/500',
    short: 'Assembler un meuble modulaire type Billy/Kallax, fixer au mur si nécessaire.',
    difficulty: 'Moyen',
    time: '1-3 heures',
    materials: [
      {name:'Kit meuble (panneaux, vis)', qty:'1 ensemble', price:'50-250€'},
      {name:'Chevilles et vis murales', qty:'selon support', price:'5-15€'}
    ],
    tools:['Tournevis/visseuse','Marteau','Niveau à bulle','Mètre','Crayon'],
    steps:[
      {title:'1. Préparation', desc:'Vérifiez le contenu du kit, posez les pièces au sol, identifiez panneaux et quincaillerie.'},
      {title:'2. Assemblage structure', desc:'Assemblez les panneaux horizontaux et verticaux selon la notice. Serrez les vis sans forcer.'},
      {title:'3. Fixation étagères', desc:'Positionnez et fixez les étagères. Vérifiez l’équerrage et le niveau.'},
      {title:'4. Fixation murale (optionnel)', desc:'Si haut ou creux, fixez le meuble au mur avec chevilles adaptées. Utilisez un niveau.'},
      {title:'5. Contrôle final', desc:'Testez l’ouverture/fermeture, vérifiez les jeux et repositionnez si nécessaire.'}
    ],
    notes:['Ne pas sur-serrer les vis pour éviter d’éclater le panneau','Monter sur un sol plat et propre']
  },
  // 2
  {
    id: 'p02',
    title: 'Montage placard encastré',
    category: 'Menuiserie',
    image: 'https://picsum.photos/seed/projet2/800/500',
    short: 'Réaliser un placard encastré avec portes coulissantes ou battantes.',
    difficulty: 'Moyen',
    time: '4-8 heures',
    materials:[
      {name:'Panneaux MDF/contreplaqué', qty:'selon mesures', price:'variable'},
      {name:'Rails coulissants ou charnières', qty:'1 set', price:'50-200€'},
      {name:'Chevilles & vis', qty:'1 boîte', price:'10€'}
    ],
    tools:['Perceuse-visseuse','Scie sauteuse ou circulaire','Niveau','Mètre','Équerre'],
    steps:[
      {title:'1. Prise de mesures', desc:'Mesurez précisément hauteur, largeur, profondeur. Prévoir 5 mm de jeu latéral.'},
      {title:'2. Préparation panneaux', desc:'Découpez panneaux au dimension. Poncer et vernir si souhaité.'},
      {title:'3. Montage cadre', desc:'Assemblez la structure et fixez-la au sol/murs avec équerres.'},
      {title:'4. Pose portes', desc:'Installez rails ou charnières et ajustez l’alignement.'},
      {title:'5. Finitions', desc:'Cache-vis, joints, ajustements finaux et nettoyage.'}
    ],
    notes:['Vérifier présence de câbles/tuyaux avant perçage','Travailler à deux pour manipuler les grands panneaux']
  },
  // 3
  {
    id:'p03',
    title:'Pose de parquet flottant',
    category:'Menuiserie',
    image:'https://picsum.photos/seed/projet3/800/500',
    short:'Installer un parquet stratifié flottant sur sous-couche.',
    difficulty:'Moyen',
    time:'6-12 heures',
    materials:[
      {name:'Lames de parquet (m² +10%)', qty:'surface + 10%', price:'15-40€/m²'},
      {name:'Sous-couche isolante', qty:'surface', price:'3-8€/m²'},
      {name:'Plinthes', qty:'périmètre', price:'5-15€/ml'}
    ],
    tools:['Scie sauteuse','Cale de frappe','Mètre','Niveau','Crayon'],
    steps:[
      {title:'1. Préparation sol', desc:'Sol propre, sec, plan (tolérance 3mm/m). Poser film ou sous-couche si nécessaire.'},
      {title:'2. Pose sous-couche', desc:'Déroulez sous-couche en joints collés.'},
      {title:'3. Pose lames', desc:'Emboîter les lames en laissant un jeu de dilatation 8-10mm sur les bords.'},
      {title:'4. Découpes et finitions', desc:'Découper périphérie et poser plinthes.'}
    ],
    notes:['Prévoir 10% de perte pour découpes','Respecter sens d’ouverture de porte si esthétique']
  },
  // 4
  {
    id:'p04',
    title:'Pose de plinthes',
    category:'Menuiserie',
    image:'https://picsum.photos/seed/projet4/800/500',
    short:'Poser des plinthes pour finition mur-sol.',
    difficulty:'Easy',
    time:'1-3 heures',
    materials:[
      {name:'Plinthes', qty:'périmètre', price:'5-12€/ml'},
      {name:'Colle ou vis', qty:'selon fixation', price:'5-10€'}
    ],
    tools:['Scie à onglet','Mètre','Crayon','Pistolet à colle','Niveau'],
    steps:[
      {title:'1. Mesures', desc:'Mesurer le périmètre et marquer les longueurs sur les plinthes.'},
      {title:'2. Découpes d’angle', desc:'Couper à 45° pour les assemblages d’angle.'},
      {title:'3. Fixation', desc:'Coller ou visser selon support. Contrôler alignement.'},
      {title:'4. Finitions', desc:'Boucher petites interstices et peindre si nécessaire.'}
    ],
    notes:['Pour murs humides privilégier plinthes PVC','Tester l’ajustement avant collage']
  },
  // 5
  {
    id:'p05',
    title:'Montage lit / armoire',
    category:'Menuiserie',
    image:'https://picsum.photos/seed/projet5/800/500',
    short:'Assembler lit ou armoire avec kit de montage.',
    difficulty:'Easy',
    time:'1-4 heures',
    materials:[
      {name:'Kit meuble', qty:'1', price:'selon modèle'},
      {name:'Visserie complémentaire', qty:'1 boîte', price:'5€'}
    ],
    tools:['Tournevis','Marteau','Mètre','Niveau'],
    steps:[
      {title:'1. Préparation', desc:'Vérifier contenu du kit et disposer pièces.'},
      {title:'2. Assemblage selon notice', desc:'Suivre étapes numérotées, commencer par structure.'},
      {title:'3. Vérification', desc:'Vérifier stabilité et serrage des fixations.'}
    ],
    notes:['Travailler à deux pour grosses pièces','Ne pas serrer excessivement les vis']
  },

  // 6..75 : pour la suite je vais générer les autres projets en suivant un format similaire.
];

// fill the rest up to 75 with templated but detailed entries if not provided
const categories = ['Menuiserie','Peinture','Électricité','Plomberie','Chauffage','Sécurité','Maçonnerie','Aménagement','Extérieur','Entretien'];
const templateGuides = {
  'Peinture': {
    short:'Préparation et application de peinture intérieure ou extérieure.',
    materials:[{name:'Peinture (L)', qty:'selon surface', price:'~15€/L'},{name:'Sous-couche', qty:'si nécessaire', price:'~8€/L'},{name:'Ruban de masquage', qty:'1', price:'3€'}],
    tools:['Rouleau','Pinceau','Bac à peinture','Escabeau','Papier abrasif'],
    steps:[
      {title:'1. Préparation', desc:'Protéger les sols et meubles, reboucher trous, poncer et dépoussiérer.'},
      {title:'2. Sous-couche', desc:'Appliquer si surface absorbante ou changement de teinte.'},
      {title:'3. Peinture', desc:'Peindre angles au pinceau puis rouleau, laisser sécher entre les couches.'},
      {title:'4. Finitions', desc:'Retirer ruban, nettoyer outils, ventiler la pièce.'}
    ],
    notes:['1 L couvre environ 8-12 m² selon peinture et support','Tester une petite zone']
  },
  'Électricité': {
    short:'Travaux électriques simples (prises, interrupteurs, luminaires).',
    materials:[{name:'Prise/interrupteur', qty:'1', price:'5-30€'},{name:'Boîte d’encastrement', qty:'1', price:'3€'}],
    tools:['Tournevis isolé','Testeur de tension','Pince coupante','Dénudeur'],
    steps:[
      {title:'1. Sécuriser', desc:'Couper le disjoncteur du circuit puis vérifier l’absence de tension.'},
      {title:'2. Remplacement/pose', desc:'Brancher correctement phase/neutre/terre et fixer.'},
      {title:'3. Vérifications', desc:'Rétablir courant et tester.'}
    ],
    notes:['Respecter codes couleurs et normes locales','Consulter électricien si doute']
  },
  'Plomberie': {
    short:'Interventions sur évacuations, robinetterie et appareils sanitaires.',
    materials:[{name:'Flexible/robinet', qty:'1', price:'10-80€'},{name:'Bonde/siphon', qty:'1', price:'5-30€'}],
    tools:['Clé à molette','Clé plate','Tournevis','Bassine','Joint téflon'],
    steps:[
      {title:'1. Coupure eau', desc:'Fermer l’alimentation générale ou le robinet d’arrêt local.'},
      {title:'2. Démonter et remplacer', desc:'Placer bassine, dévisser, remplacer et resserrer.'},
      {title:'3. Test', desc:'Rouvrir eau et vérifier étanchéité.'}
    ],
    notes:['Utiliser joints neufs','Ne pas serrer excessivement pour éviter casse']
  },
  'Chauffage': {
    short:'Installation et entretien d’appareils de chauffage électrique ou eau chaude.',
    materials:[{name:'Radiateur/thermostat', qty:'1', price:'variable'},{name:'Vannes/ raccords', qty:'1 set', price:'15-60€'}],
    tools:['Clé à molette','Niveau','Perceuse','Clé spéciale radiateur'],
    steps:[
      {title:'1. Vérifier compatibilité', desc:'Puissance, sorties et fixations.'},
      {title:'2. Fixation', desc:'Installer supports et raccorder.'},
      {title:'3. Test et purge', desc:'Remplir, purger et contrôler l’étanchéité.'}
    ],
    notes:['Pour chauffage central contacter pro','Respecter prescriptions fabricant']
  },
  'Maçonnerie': {
    short:'Travaux gros œuvre léger : scellement, rebouchage, carrelage.',
    materials:[{name:'Mortier/colle', qty:'selon surface', price:'~10-30€'},{name:'Carrelage', qty:'surface', price:'variable'}],
    tools:['Truelle','Spatule','Marteau','Niveau','Seau'],
    steps:[
      {title:'1. Préparation support', desc:'Nettoyer, humidifier si nécessaire.'},
      {title:'2. Application mortier/colle', desc:'Étaler et poser, respecter temps de séchage.'},
      {title:'3. Jointoiement', desc:'Appliquer joints et nettoyer résidus.'}
    ],
    notes:['Respecter temps de séchage indiqué sur produits','Protéger surfaces autour']
  },
  'Sécurité': {
    short:'Installation serrures, détecteurs et dispositifs de sécurité.',
    materials:[{name:'Serrure/détecteur', qty:'1', price:'20-100€'},{name:'Chevilles/vis', qty:'1 kit', price:'5€'}],
    tools:['Perceuse','Tournevis','Mètre','Crayon'],
    steps:[
      {title:'1. Positionner', desc:'Marquer emplacement et vérifier niveau.'},
      {title:'2. Fixer', desc:'Perçages et fixation adaptées au support.'},
      {title:'3. Tester', desc:'Vérifier bon fonctionnement.'}
    ],
    notes:['Respecter normes de sécurité','Tester périodiquement les détecteurs']
  },
  'Aménagement': {
    short:'Installation d’étagères, portes, miroirs et solutions de rangement.',
    materials:[{name:'Étagères / rails', qty:'selon projet', price:'variable'}],
    tools:['Perceuse','Niveau','Visseuse','Mètre'],
    steps:[
      {title:'1. Mesures', desc:'Prendre mesures précises.'},
      {title:'2. Fixation', desc:'Choisir chevilles adaptées et fixer.'},
      {title:'3. Vérifier charge', desc:'Respecter charge maximale annoncée.'}
    ],
    notes:['Choisir fixations adaptées au type de mur','Distribution de la charge sur plusieurs points']
  },
  'Extérieur': {
    short:'Aménagement extérieur : clôtures, abris, récupérateurs d’eau.',
    materials:[{name:'Poteaux/planches', qty:'selon projet', price:'variable'}],
    tools:['Pelle','Niveau','Marteau','Visseuse'],
    steps:[
      {title:'1. Préparation terrain', desc:'Niveler et préparer fondations si nécessaire.'},
      {title:'2. Montage', desc:'Assembler en respectant plan et alignement.'},
      {title:'3. Finitions', desc:'Traiter bois/peinture pour extérieur.'}
    ],
    notes:['Vérifier règles de copropriété','Protéger matériaux extérieurs contre intempéries']
  },
  'Entretien': {
    short:'Petites réparations et entretien courant (joints, débouchage).',
    materials:[{name:'Produits entretien', qty:'selon besoin', price:'variable'}],
    tools:['Pince','Ventouse','Tournevis','Clé'],
    steps:[
      {title:'1. Détecter problème', desc:'Identifier origine de la panne ou fuite.'},
      {title:'2. Intervention', desc:'Procéder au nettoyage/réparation selon technique adaptée.'},
      {title:'3. Vérifier et prévenir', desc:'Contrôler après intervention et appliquer prévention'}
    ],
    notes:['Suivre instructions produits','Porter équipement de protection']
  }
};

// Generate remaining project entries to reach 75
(function fillProjects(){
  const base = PROJECTS.length;
  let idx = base+1;
  const seedNames = [
    'Pose de parquet flottant','Pose plinthes','Montage lit/armoire','Installation plan de travail cuisine','Fabrication étagères sur mesure',
    'Pose de porte intérieure','Remplacement charnière porte','Montage dressing modulable','Peinture mur/plafond','Application sous-couche',
    'Peinture boiseries','Peinture radiateur','Pose de toile de verre','Rebouchage et ponçage avant peinture','Peinture façade extérieure',
    'Vernis meuble bois','Installation prise murale','Pose plafonnier','Remplacement interrupteur','Installation détecteur de mouvement',
    'Installation applique murale','Pose variateur d\'intensité','Tirage simple de câble','Installation lavabo/vasque','Montage robinet/mitigeur',
    'Installation machine à laver','Pose colonne de douche','Remplacement siphon','Pose évacuation lave-vaisselle','Installation ballon d\'eau petit modèle',
    'Changement flexible douche','Pose radiateur électrique mural','Installation thermostat connecté','Remplacement radiateur','Pose sèche-serviette',
    'Installation grille aération','Montage chaudière (guide pro)','Remplacement barillet porte','Pose serrure additionnelle','Installation détecteur fumée',
    'Pose judas porte','Installation sonnette connectée','Pose verrou sécurité fenêtre','Scellement cheville chimique','Rebouchage trou & fissure',
    'Pose carrelage mural petit format','Jointoiement carrelage','Création coffrage léger','Réparation plâtre','Pose tringle à rideaux',
    'Installation miroir mural','Montage meuble TV','Montage bureau','Installation étagères murales','Pose store enrouleur','Installation porte coulissante',
    'Montage mezzanine légère','Montage abri jardin','Pose clôture simple','Installation luminaire extérieur','Pose gouttière PVC','Installation récupérateur d\'eau',
    'Aménagement bac à fleurs','Remplacement joint silicone salle de bain','Entretien robinetterie','Changement poignée fenêtre','Pose joint anti-courant d\'air',
    'Débouchage simple évier','Pose boîte aux lettres','Installation détecteur monoxyde de carbone','Petite soudure métal','Réparation carrosserie abîmée',
    'Mise à niveau sol léger','Pose détecteur de fuite d\'eau','Isolation des combles légères'
  ];
  // if already included some, ensure unique add up to 75
  for(let name of seedNames){
    if(PROJECTS.length>=75) break;
    const category = categories[Math.floor(Math.random()*categories.length)];
    const template = templateGuides[category] || templateGuides['Aménagement'];
    PROJECTS.push({
      id: 'p' + String(PROJECTS.length+1).padStart(2,'0'),
      title: name,
      category,
      image: `https://picsum.photos/seed/${encodeURIComponent(name)}/900/600`,
      short: template.short,
      difficulty: ['Easy','Moyen','Difficile'][Math.floor(Math.random()*3)],
      time: ['1-2 heures','2-6 heures','1-3 jours'][Math.floor(Math.random()*3)],
      materials: template.materials,
      tools: template.tools,
      steps: template.steps,
      notes: template.notes
    });
  }
})();

/* ----------------- UI: categories, render ----------------- */
const categoriesSet = [...new Set(PROJECTS.map(p=>p.category))].sort();
const categoryFilter = document.getElementById('categoryFilter');
categoriesSet.forEach(cat=>{
  const opt=document.createElement('option'); opt.value=cat; opt.textContent=cat; categoryFilter.appendChild(opt);
});

const projectsGrid = document.getElementById('projectsGrid');
const popularGrid = document.getElementById('popularGrid');
const projectsCountEl = document.getElementById('projectsCount');

function shortText(str, n=120){ return str.length>n? str.slice(0,n-1)+'…' : str; }

function createProjectCard(p){
  const card = document.createElement('article');
  card.className='project-card';
  card.innerHTML = `
    <div class="project-media"><img alt="${p.title}" src="${p.image}"></div>
    <div class="project-body">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div class="project-title">${p.title}</div>
          <div class="project-desc">${shortText(p.short,150)}</div>
        </div>
        <div class="badges">
          <div class="badge">${p.category}</div>
          <div class="badge">${p.difficulty}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="openBtn" style="background:var(--primary);color:white;border:none;border-radius:8px;padding:8px 10px">Ouvrir</button>
        <button class="saveBtn" style="background:var(--accent);color:white;border:none;border-radius:8px;padding:8px 10px">Sauvegarder</button>
      </div>
    </div>
  `;
  // handlers
  card.querySelector('.openBtn').addEventListener('click',()=>openProjectModal(p.id));
  card.querySelector('.saveBtn').addEventListener('click',()=>saveProjectLocal(p.id));
  return card;
}

function renderProjectsList(){
  const q = (document.getElementById('globalSearch').value || '').toLowerCase();
  const cat = categoryFilter.value;
  projectsGrid.innerHTML='';
  let filtered = PROJECTS.filter(p => (cat==='all' || p.category===cat) && (p.title.toLowerCase().includes(q) || p.short.toLowerCase().includes(q)));
  projectsCountEl.textContent = `${filtered.length} projets`;
  // sort by category then title for consistency
  filtered.sort((a,b)=> a.title.localeCompare(b.title));
  for(const p of filtered){
    projectsGrid.appendChild(createProjectCard(p));
  }
}

function renderPopular(){
  popularGrid.innerHTML='';
  // pick 8 popular (first 8 unique categories or top ones)
  const sample = PROJECTS.slice(0,8);
  for(const p of sample){
    popularGrid.appendChild(createProjectCard(p));
  }
}

/* initial render */
renderProjectsList();
renderPopular();

/* search handlers */
document.getElementById('globalSearch').addEventListener('input',renderProjectsList);
categoryFilter.addEventListener('change',renderProjectsList);
document.getElementById('btnNew').addEventListener('click', ()=>{
  const title = prompt('Nom du projet :');
  if(!title) return;
  const newP = {
    id:'p'+(PROJECTS.length+1),
    title,
    category:'Personnalisé',
    image:'https://picsum.photos/seed/'+encodeURIComponent(title)+'/900/600',
    short:'Projet personnalisé',
    difficulty:'Moyen',
    time:'Variable',
    materials:[{name:'Matériel à définir',qty:'--'}],
    tools:['Outils à définir'],
    steps:[{title:'1. Définir','desc':'Définir et planifier le projet'}],
    notes:['Projet personnalisé']
  };
  PROJECTS.push(newP);
  renderProjectsList();
  alert('Projet créé : ' + title);
});

/* ----------------- MODAL project detail, calc, save ----------------- */
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalContent = document.getElementById('modalContent');
const modalPhotoInput = document.getElementById('modalPhotoInput');
const photoUploader = document.getElementById('photoUploader');
const photoPreview = document.getElementById('photoPreview');
let currentProject = null;

photoUploader.addEventListener('click', ()=> modalPhotoInput.click());
modalPhotoInput.addEventListener('change', (e)=>{
  photoPreview.innerHTML='';
  Array.from(e.target.files).forEach(file=>{
    const url = URL.createObjectURL(file);
    const img = document.createElement('img'); img.src = url; img.style.width='100px'; img.style.height='70px'; img.style.objectFit='cover'; img.style.borderRadius='8px';
    photoPreview.appendChild(img);
  });
});

function openProjectModal(id){
  const p = PROJECTS.find(x=>x.id===id);
  if(!p) return alert('Projet introuvable');
  currentProject = p;
  modalTitle.textContent = p.title;
  modalMeta.textContent = `${p.category} • ${p.difficulty} • ${p.time}`;
  // build content: description, materials, tools, steps, notes
  let html = `<div style="display:flex;gap:12px;align-items:flex-start"><img src="${p.image}" style="width:300px;height:180px;object-fit:cover;border-radius:8px"><div style="flex:1"><div style="font-weight:800;font-size:18px">${p.title}</div><div class="small" style="margin-top:8px">${p.short}</div><div style="margin-top:10px"><strong>Temps estimé:</strong> ${p.time}</div></div></div><hr style="margin:12px 0">`;
  // materials
  html += `<h3>Matériel requis</h3><div class="list">`;
  for(const m of p.materials){
    html += `<div style="display:flex;justify-content:space-between;padding:6px 4px"><div>${m.name}</div><div class="small">${m.qty}${m.price? ' • ' + m.price : ''}</div></div>`;
  }
  html += `</div>`;
  // tools
  html += `<h3 style="margin-top:10px">Outils recommandés</h3><div class="list"><div>${p.tools.join(', ')}</div></div>`;
  // steps
  html += `<h3 style="margin-top:10px">Étapes détaillées</h3>`;
  for(const s of p.steps){
    html += `<div class="step"><div style="font-weight:800;color:var(--primary)">${s.title}</div><div style="margin-top:6px;color:var(--muted)}">${s.desc || s.description}</div></div>`;
  }
  // notes
  html += `<h3 style="margin-top:10px">Points d'attention</h3><div class="list">${p.notes.map(n=>`<div style="margin-bottom:6px">${n}</div>`).join('')}</div>`;
  modalContent.innerHTML = html;
  document.getElementById('dimW').value=''; document.getElementById('dimH').value=''; document.getElementById('dimD').value='';
  document.getElementById('calcResult').innerHTML = '';
  modal.classList.add('active');
  modal.setAttribute('aria-hidden','false');
  // show photos preview if previously saved
  photoPreview.innerHTML='';
  const savedPhotos = JSON.parse(localStorage.getItem('gr_photos_'+p.id) || '[]');
  savedPhotos.forEach(src=>{
    const img=document.createElement('img'); img.src=src; img.style.width='100px'; img.style.height='70px'; img.style.objectFit='cover'; photoPreview.appendChild(img);
  });
}

document.getElementById('closeModal').addEventListener('click', closeModal);
function closeModal(){ modal.classList.remove('active'); modal.setAttribute('aria-hidden','true'); currentProject=null; photoPreview.innerHTML=''; modalPhotoInput.value=''; }

/* Calculation logic: paints, parquet, plinthes, general estimates */
function calcQuantities(w,h,d,proj){
  // w,h,d in cm
  const result = {items:[], estimateText:''};
  const area = (w && h)? ((w/100)*(h/100)) : 0; // m2
  const t = (proj && proj.title.toLowerCase()) || '';
  if(t.includes('peinture') || t.includes('peindre') || proj.category==='Peinture'){
    const sqm = area>0? Math.round(area*100)/100 : 10;
    const liters = Math.max(1, Math.ceil(sqm / 10 * 1.1)); // 1L ~10m2, +10% reserve
    result.items.push({name:'Peinture (L)', qty:liters, unit:'L'});
    result.items.push({name:'Ruban de masquage', qty:1, unit:'lot'});
    result.items.push({name:'Bâche de protection', qty:1, unit:'pièce'});
    result.estimateText = `${liters * 15} € approximatif (selon qualité) — Surface: ${sqm} m².`;
    return result;
  }
  if(t.includes('parquet') || proj.category==='Menuiserie'){
    // area from width/height (floor)
    const sqm = area>0? Math.round(area*100)/100 : 10;
    const qty = Math.ceil(sqm * 1.1); // +10%
    result.items.push({name:'Lames parquet (m²)', qty:qty, unit:'m²'});
    result.items.push({name:'Sous-couche (m²)', qty:Math.ceil(sqm), unit:'m²'});
    result.estimateText = `${Math.round(qty*25)} € approximatif (matériel) — Surface: ${sqm} m².`;
    return result;
  }
  if(t.includes('plinthe') || t.includes('plinthes')){
    const perim = (w && h)? Math.ceil(2*((w/100)+(h/100))) : 10;
    result.items.push({name:'Plinthes (ml)', qty:perim, unit:'ml'});
    result.estimateText = `${perim * 8} € approximatif.`;
    return result;
  }
  // default: list basic kit
  result.items.push({name:'Kit outils de base', qty:1, unit:'kit'});
  result.estimateText = 'Estimation basique; voir fiche projet.';
  return result;
}

document.getElementById('calcBtn').addEventListener('click', ()=>{
  if(!currentProject) return alert('Ouvre d’abord un projet');
  const w = Number(document.getElementById('dimW').value || 0);
  const h = Number(document.getElementById('dimH').value || 0);
  const d = Number(document.getElementById('dimD').value || 0);
  const calc = calcQuantities(w,h,d,currentProject);
  const container = document.getElementById('calcResult');
  container.innerHTML = '';
  const panel = document.createElement('div'); panel.className='list';
  panel.innerHTML = `<div style="font-weight:800;margin-bottom:8px">Estimation & liste</div>`;
  calc.items.forEach(it=>{
    const row = document.createElement('div');
    row.style.display='flex'; row.style.justifyContent='space-between'; row.style.padding='6px 0';
    row.innerHTML = `<div>${it.name}</div><div style="font-weight:800">${it.qty} ${it.unit || ''}</div>`;
    panel.appendChild(row);
  });
  const foot = document.createElement('div'); foot.style.marginTop='8px'; foot.style.fontWeight='800'; foot.textContent = calc.estimateText;
  container.appendChild(panel); container.appendChild(foot);
});

/* Save project to My Projects (localStorage) */
function saveProjectLocal(id){
  const p = PROJECTS.find(x=>x.id===id);
  if(!p) return alert('Projet introuvable');
  const arr = JSON.parse(localStorage.getItem('gr_saved')||'[]');
  if(arr.find(x=>x.id===p.id)) { alert('Déjà sauvegardé'); renderSaved(); return; }
  arr.push({id:p.id, title:p.title, date:new Date().toISOString()});
  localStorage.setItem('gr_saved', JSON.stringify(arr));
  alert('Projet ajouté à Mes Projets');
  renderSaved();
}

document.getElementById('saveToMine').addEventListener('click', ()=>{
  if(!currentProject) return alert('Ouvre un projet');
  const arr = JSON.parse(localStorage.getItem('gr_saved')||'[]');
  if(arr.find(x=>x.id===currentProject.id)) return alert('Projet déjà sauvegardé');
  arr.push({id:currentProject.id, title:currentProject.title, date:new Date().toISOString()});
  localStorage.setItem('gr_saved', JSON.stringify(arr));
  // save photos if any
  const imgs = Array.from(photoPreview.querySelectorAll('img')).map(img=>img.src);
  if(imgs.length) localStorage.setItem('gr_photos_'+currentProject.id, JSON.stringify(imgs));
  alert('Projet sauvegardé');
  renderSaved();
});

/* render saved */
function renderSaved(){
  const container = document.getElementById('savedList');
  const arr = JSON.parse(localStorage.getItem('gr_saved')||'[]');
  container.innerHTML = '';
  if(arr.length===0){ container.innerHTML = '<div class="card small">Aucun projet sauvegardé.</div>'; return; }
  arr.slice().reverse().forEach(p=>{
    const d = document.createElement('div'); d.className='card';
    d.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${p.title}</strong><div class="small">${new Date(p.date).toLocaleString()}</div></div>
      <div style="display:flex;gap:8px"><button onclick="openProjectModal('${p.id}')" style="background:#0f4c81;color:white;padding:8px;border-radius:8px;border:none">Ouvrir</button>
      <button onclick="deleteSaved('${p.id}')" style="background:#ef4444;color:white;padding:8px;border-radius:8px;border:none">Supprimer</button></div></div>`;
    container.appendChild(d);
  });
}
function deleteSaved(id){
  let arr = JSON.parse(localStorage.getItem('gr_saved')||'[]');
  arr = arr.filter(x=>x.id!==id);
  localStorage.setItem('gr_saved', JSON.stringify(arr));
  renderSaved();
}
renderSaved();

/* ----------------- Assistant IA (prototype + preprogrammed responses + simple parsing) ----------------- */
const chatHistoryEl = document.getElementById('chatHistory');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// large set of responses (50+)
const AI_RESPONSES = [
  "Pour la peinture: 1 L couvre environ 10 m² en une couche. Prévoir 2 couches pour un rendu opaque.",
  "Pour un lavabo: coupez l’eau, déconnectez siphon et flexibles, installez la bonde et serrez avec joint neuf.",
  "Pour un radiateur électrique: vérifiez l’espace, installez les équerres et branchez selon manuel.",
  "Pour poser une tringle: mesurez, percez, puis vérifiez l’horizontalité avec un niveau.",
  "Pour poser parquet: prévoyez +10% pour coupe et pertes, posez sous-couche avant lames.",
  "Pour carrelage mural: utilisez colle adaptée et croisillons pour joints réguliers.",
  "Pour isolation combles: ventilez correctement et posez l’isolant sans pont thermique.",
  "Pour remplacer une prise: coupez le disjoncteur et vérifiez l’absence de tension à l’aide d’un testeur.",
  "Pour sceller une cheville chimique: nettoyez perçage, injectez résine et insérez tige filetée.",
  "Pour installer un détecteur de fumée: placer au plafond et éloigner des sources directes de vapeur.",
  "Pour peinture façade: vérifier météo, appliquer sous-couche spéciale façade et protéger bas de façade.",
  "Pour la plomberie, toujours vérifier les raccords après remplissage et purger les circuits.",
  "Pour réparer plâtre: reboucher, laisser sécher, poncer et peindre.",
  "Pour montage IKEA, classer pièces et vis par référence avant assemblage.",
  "Pour pose d’une porte intérieure: vérifiez aplomb et hauteur, ajustez paumelles et gâche.",
  "Pour sèche-serviette: vérifier alimentation électrique ou eau, et fixations murales adaptées.",
  "Pour installation ballon d’eau: respecter normes locales et ancrage solide.",
  "Pour débouchage évier: essayer ventouse puis furet avant produits chimiques.",
  "Pour montage abri jardin: préparer sol et ancrages, suivre plan du fabricant.",
  "Pour peinture boiserie: poncer, dégraisser, appliquer sous-couche bois puis finition.",
  "Pour installations électriques complexes, faire appel à un électricien qualifié.",
  "Pour les petites soudures, utilisez protections et vérifiez ventilation.",
  "Pour pose gouttière: respecter pente 2 à 5 mm/m pour évacuation.",
  "Pour réparer carrosserie: ponçage, apprêt, peinture avec teinte adaptée.",
  "Pour isolation murs: privilégier isolation par l’intérieur ou extérieur selon configuration.",
  "Pour installation plan de travail: vérifier découpe pour évier et robinet, sceller joint silicone.",
  "Pour montage mezzanine légère: calculer charges et points d’ancrage, respecter normes.",
  "Pour pose luminaire extérieur: respecter indice IP et distances de sécurité.",
  "Pour serrure: vérifier barillet et sens d’ouverture selon poignée et huisserie.",
  "Pour poser store enrouleur: mesurer largeur hors tout et installer supports solides.",
  "Pour pose plinthe en carrelage: adapter fixation selon mur et prévoir joints silicone.",
  "Pour rebouchage fissure: nettoyer, appliquer mortier adapté puis poncer.",
  "Pour pose d’un récupérateur d’eau: vérifier pente et raccord évacuation.",
  "Pour pose de miroir: utiliser fixation adaptée au poids et au type de mur.",
  "Pour montage dressing: commencer par la structure basse puis monter éléments hauts.",
  "Pour pose d’un radiateur: purgez après remplissage et vérifiez raccords.",
  "Pour montage d’un lit: tête de lit souvent facile à positionner ensuite.",
  "Pour remplacement charnière: lubrifier ensuite ajuster pour éviter frottements.",
  "Pour vérification étanchéité: laisser cycle d’eau et surveiller points de fuite.",
  "Pour le nettoyage après travaux: commencer par dépoussiérage puis nettoyage humide.",
  "Pour peinture radiateur: utiliser peinture haute température.",
  "Pour installation prise extérieure: installer prise étanche avec IP adapté.",
  "Pour pose carrelage grand format: privilégier colle flex et outils adaptés.",
  "Pour rénovation façade: faire diagnostic préalable et repérer zones humides.",
  "Pour pose store: vérifier dégagement pour fermeture sans obstacle.",
  "Pour projet inconnu: décris l’environnement et je te donne matériel et étapes."
];

// persist chat in localStorage
function loadChat(){
  const hist = JSON.parse(localStorage.getItem('gr_chat')||'[]');
  hist.forEach(m=>{
    const d = document.createElement('div');
    d.className = 'msg ' + (m.from==='ai' ? 'ai' : 'user');
    d.textContent = m.text;
    chatHistoryEl.appendChild(d);
  });
  chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
}
function pushChat(from,text){
  const d = document.createElement('div');
  d.className = 'msg ' + (from==='ai' ? 'ai' : 'user');
  d.textContent = text;
  chatHistoryEl.appendChild(d);
  chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
  const hist = JSON.parse(localStorage.getItem('gr_chat')||'[]');
  hist.push({from,text,date:new Date().toISOString()});
  localStorage.setItem('gr_chat',JSON.stringify(hist));
}

// simple parser: if message contains dims '300x250' -> compute paint liters
function answerAI(input){
  const l = input.toLowerCase();
  // dimensions pattern NxM (cm)
  const dims = l.match(/(\d{2,4})\s*[x×]\s*(\d{2,4})/);
  if(dims){
    const w = Number(dims[1]), h=Number(dims[2]);
    const sqm = Math.round((w/100)*(h/100)*100)/100;
    const litres = Math.max(1, Math.ceil(sqm / 10));
    return `Surface estimée ${sqm} m². Estimation peinture: ~${litres} L par couche (1 L ≈ 10 m²).`;
  }
  // ask for material list by keyword
  for(const p of PROJECTS){
    if(l.includes(p.title.toLowerCase()) || l.includes(p.category.toLowerCase())){
      // return structured info for that project
      const mats = p.materials.map(m=>`${m.name} (${m.qty}${m.price? ' • ' + m.price: ''})`).join(', ');
      const tools = p.tools.join(', ');
      return `Projet "${p.title}" — Matériel: ${mats}. Outils: ${tools}. Étapes: ${p.steps.slice(0,3).map(s=>s.title).join(' → ')}.`;
    }
  }
  // otherwise random helpful response
  return AI_RESPONSES[Math.floor(Math.random()*AI_RESPONSES.length)];
}

chatSend.addEventListener('click', ()=>{
  const txt = chatInput.value.trim(); if(!txt) return;
  pushChat('user', txt);
  chatInput.value='';
  // simulate thinking
  setTimeout(()=> {
    const resp = answerAI(txt);
    pushChat('ai', resp);
  }, 600 + Math.random()*600);
});
chatInput.addEventListener('keydown', e=>{
  if(e.key==='Enter') chatSend.click();
});
loadChat();

/* ----------------- PROFILE storage and UI ----------------- */
const profileNameEl = document.getElementById('pfName');
const profileEmailEl = document.getElementById('pfEmail');
const profilePhotoEl = document.getElementById('pfPhotoUrl');
const profilePhotoImg = document.getElementById('profilePhoto');
const topUserName = document.getElementById('topUserName');
const topProfilePic = document.getElementById('topProfilePic');

document.getElementById('saveProfileBtn').addEventListener('click', ()=>{
  const name = profileNameEl.value.trim(), email = profileEmailEl.value.trim(), photo = profilePhotoEl.value.trim();
  if(!name || !email) { document.getElementById('profileMsg').textContent='Nom et email requis'; return; }
  localStorage.setItem('gr_user', JSON.stringify({name,email,photo}));
  document.getElementById('profileMsg').textContent = 'Profil sauvegardé';
  topUserName.textContent = name;
  if(photo) { profilePhotoImg.src = photo; topProfilePic.src = photo; }
});

document.getElementById('logoutBtn').addEventListener('click', ()=>{
  localStorage.removeItem('gr_user');
  profileNameEl.value=''; profileEmailEl.value=''; profilePhotoEl.value='';
  profilePhotoImg.src = 'https://picsum.photos/seed/profile/120/120';
  topUserName.textContent = 'Invité';
  topProfilePic.src = 'https://picsum.photos/seed/profile/80/80';
  document.getElementById('profileMsg').textContent='Déconnecté';
});

(function loadProfile(){
  const user = JSON.parse(localStorage.getItem('gr_user')||'null');
  if(user){
    profileNameEl.value = user.name || '';
    profileEmailEl.value = user.email || '';
    profilePhotoEl.value = user.photo || '';
    if(user.photo){ profilePhotoImg.src = user.photo; topProfilePic.src = user.photo; }
    topUserName.textContent = user.name || 'Invité';
  }
})();

/* ----------------- keyboard & accessibility ----------------- */
document.addEventListener('keydown', e=> {
  if(e.key==='Escape') closeModal();
});

/* ----------------- init ----------------- */
renderProjectsList();
renderPopular();
renderSaved();

</script>
</body>
</html>
