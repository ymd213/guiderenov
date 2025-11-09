<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>GuideRénov — Assistant travaux</title>
<meta name="description" content="GuideRénov — assistant travaux : projets, notices pas-à-pas, simulateur quantités, assistant IA prototype." />
<style>
  :root{
    --primary:#2563eb;--accent:#f97316;--bg:#f8fafc;--card:#ffffff;--muted:#64748b;--success:#10b981;--danger:#ef4444;
    --radius:10px;--glass: rgba(255,255,255,0.6);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%;font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial;background:var(--bg);color:#0f172a;-webkit-font-smoothing:antialiased}
  .wrap{max-width:1200px;margin:0 auto;padding:16px}
  header{background:linear-gradient(135deg,var(--primary),#1e40af);color:#fff;padding:12px 0;position:sticky;top:0;z-index:40}
  .top{display:flex;align-items:center;justify-content:space-between;gap:12px}
  .logo{font-weight:700;display:flex;gap:8px;align-items:center}
  .tabs{display:flex;gap:8px}
  .tab-btn{background:transparent;border:none;color:inherit;padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600}
  .tab-btn.active{background:rgba(255,255,255,0.12);box-shadow:0 4px 12px rgba(2,6,23,0.12)}
  main{padding:20px 0}
  .hero{background:var(--card);padding:18px;border-radius:var(--radius);box-shadow:0 8px 30px rgba(2,6,23,0.06);margin-bottom:16px}
  .hero h1{color:var(--primary);font-size:20px;margin-bottom:8px}
  .hero p{color:var(--muted);line-height:1.4}
  .controls{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
  input[type=text],select,input[type=number],textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #e6edf3;background:#fff}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:12px}
  .card{background:var(--card);padding:12px;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.04);cursor:pointer;display:flex;flex-direction:column;gap:8px}
  .muted{color:var(--muted)}
  .badge{display:inline-block;padding:6px 10px;border-radius:999px;background:#eef4ff;color:var(--primary);font-weight:700;font-size:12px}
  .projects-grid{margin-top:12px}
  .panel{background:var(--card);padding:14px;border-radius:12px;box-shadow:0 12px 40px rgba(2,6,23,0.06)}
  .row{display:flex;gap:12px;align-items:center}
  .col{flex:1}
  .small{font-size:13px;color:var(--muted)}
  .uploader{border:2px dashed var(--primary);padding:12px;border-radius:10px;text-align:center;background:#f0f9ff}
  .photo-row{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}
  .photo-row img{width:120px;height:80px;object-fit:cover;border-radius:8px;border:2px solid #e6f0ff}
  .modal{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(2,6,23,0.6);z-index:80;padding:12px}
  .modal.active{display:flex}
  .modal-card{background:var(--card);border-radius:12px;max-width:980px;width:100%;max-height:92vh;overflow:auto}
  .modal-head{padding:12px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center}
  .modal-body{padding:14px}
  .section{margin-bottom:14px}
  .list-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px dashed #f1f5f9}
  .step{background:#fff;border-radius:8px;padding:10px;border:1px solid #eef2ff;margin-bottom:8px}
  .btn{padding:8px 12px;border-radius:8px;border:none;cursor:pointer}
  .btn-primary{background:var(--primary);color:#fff}
  .btn-outline{background:#fff;border:1px solid #e6edf3}
  footer{margin-top:18px;text-align:center;color:var(--muted);font-size:13px}
  @media(max-width:760px){.top{flex-direction:column;align-items:flex-start}.row{flex-direction:column;align-items:flex-start}.grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<header>
  <div class="wrap top">
    <div class="logo">🔨 <span>GuideRénov</span></div>
    <div class="tabs" role="tablist" aria-label="Navigation principale">
      <button class="tab-btn active" data-tab="home" onclick="switchTab('home')">Accueil</button>
      <button class="tab-btn" data-tab="projects" onclick="switchTab('projects')">Projets</button>
      <button class="tab-btn" data-tab="assistant" onclick="switchTab('assistant')">Assistant IA</button>
      <button class="tab-btn" data-tab="profile" onclick="switchTab('profile')">Profil</button>
    </div>
  </div>
</header>

<main class="wrap">
  <!-- HOME -->
  <section id="home" class="tab-content">
    <div class="hero panel">
      <h1>GuideRénov — Ton assistant travaux pas-à-pas</h1>
      <p>
        GuideRénov transforme une idée de bricolage en plan d'action concret. Tu sélectionnes un projet ou tu prends une photo et saisis les cotes.
        L'outil calcule les quantités nécessaires, fournit une estimation de coût et une notice détaillée étape par étape — matériel, outils, préparation, exécution et finitions.
        Commence par l'onglet <strong>Projets</strong> pour explorer les 73 fiches. Utilise <strong>Assistant IA</strong> pour obtenir des conseils rapides ou pour clarifier une étape. Ton profil conserve tes projets.
      </p>
      <div style="margin-top:12px" class="small">
        Mode d'emploi rapide :
        <ol style="margin-top:8px;padding-left:18px">
          <li><strong>Choisissez un projet</strong> dans Projets ou créez un projet personnalisé.</li>
          <li><strong>Chargez une photo (optionnel)</strong> et saisissez les cotes (hauteur, largeur, profondeur en cm).</li>
          <li>Cliquez sur <em>Calculer</em> pour obtenir : liste matériaux, estimation (prix), outillage recommandé et la notice pas-à-pas.</li>
          <li>Réservez un kit ou notez les références pour achat. Sauvegardez dans Profil.</li>
        </ol>
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section id="projects" class="tab-content" style="display:none">
    <div class="panel">
      <div class="row" style="align-items:center">
        <div class="col" style="max-width:420px">
          <input type="text" id="searchInput" placeholder="Rechercher un projet (ex: peinture mur, radiateur...)" oninput="renderProjects()">
        </div>
        <div style="min-width:160px">
          <select id="categoryFilter" onchange="renderProjects()">
            <option value="Toutes catégories">Toutes catégories</option>
          </select>
        </div>
        <div style="min-width:140px">
          <button class="btn btn-primary" onclick="openNewProject()">Nouveau projet</button>
        </div>
      </div>

      <div style="margin-top:12px" class="small">Projets disponibles : <strong id="projectCount">0</strong></div>

      <div id="projectsGrid" class="grid projects-grid" aria-live="polite"></div>
    </div>
  </section>

  <!-- ASSISTANT IA -->
  <section id="assistant" class="tab-content" style="display:none">
    <div class="panel">
      <h3>Assistant IA (prototype)</h3>
      <p class="small">Pose une question technique. Ce prototype donne des réponses basées sur des règles locales. Pour conseils avancés, connecte une API IA plus tard.</p>
      <div style="margin-top:12px" class="row">
        <div class="col">
          <textarea id="assistantInput" rows="4" placeholder="Ex: Combien de litres pour peindre un mur de 3m x 2.5m ?" ></textarea>
        </div>
        <div style="min-width:140px">
          <button class="btn btn-primary" onclick="handleAssistant()">Demander</button>
        </div>
      </div>
      <div id="assistantReply" style="margin-top:12px"></div>
    </div>
  </section>

  <!-- PROFILE -->
  <section id="profile" class="tab-content" style="display:none">
    <div class="panel">
      <h3>Profil</h3>
      <div class="row">
        <div class="col">
          <label>Nom</label>
          <input type="text" id="profileName" placeholder="Ton nom">
        </div>
        <div style="min-width:160px">
          <label>Email (optionnel)</label>
          <input type="text" id="profileEmail" placeholder="adresse@exemple.com">
        </div>
      </div>
      <div style="margin-top:12px">
        <button class="btn btn-primary" onclick="saveProfile()">Enregistrer</button>
        <button class="btn btn-outline" onclick="loadProfile()">Charger</button>
      </div>

      <div style="margin-top:18px">
        <h4>Projets sauvegardés</h4>
        <div id="savedProjectsList" class="small"></div>
      </div>
    </div>
  </section>
</main>

<!-- Project modal -->
<div class="modal" id="modal" aria-hidden="true">
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-head">
      <div><strong id="modalTitle">Titre</strong><div id="modalMeta" class="small"></div></div>
      <div><button class="btn" onclick="closeModal()">✕</button></div>
    </div>
    <div class="modal-body" id="modalBody"></div>
  </div>
</div>

<footer class="wrap">
  <small>Prototype GuideRénov — version statique. Données locales. ©</small>
</footer>

<script>
/* ---------------------------
   Data: projets + templates
   --------------------------- */
const rawTitles = [
  /* Menuiserie (10) */
  'Montage meuble IKEA (Billy, Kallax)','Montage placard encastré','Pose de parquet flottant','Pose de plinthes','Montage lit/armoire','Installation plan de travail cuisine','Fabrication étagères sur mesure','Pose de porte intérieure','Remplacement charnière porte','Montage dressing modulable',
  /* Peinture (8) */
  'Peinture mur/plafond','Application sous-couche','Peinture boiseries','Peinture radiateur','Pose de toile de verre','Rebouchage et ponçage avant peinture','Peinture façade extérieure','Vernis meuble bois',
  /* Électricité (7) */
  'Installation prise murale','Pose plafonnier','Remplacement interrupteur','Installation détecteur de mouvement','Installation applique murale','Pose variateur d\'intensité','Tirage simple de câble',
  /* Plomberie (8) */
  'Installation lavabo/vasque','Montage robinet/mitigeur','Installation machine à laver','Pose colonne de douche','Remplacement siphon','Pose évacuation lave-vaisselle','Installation ballon d\'eau petit modèle','Changement flexible douche',
  /* Chauffage (6) */
  'Pose radiateur électrique mural','Installation thermostat connecté','Remplacement radiateur','Pose sèche-serviette','Installation grille aération','Montage chaudière (guide pro)',
  /* Sécurité & Serrurerie (6) */
  'Remplacement barillet porte','Pose serrure additionnelle','Installation détecteur fumée','Pose judas porte','Installation sonnette connectée','Pose verrou sécurité fenêtre',
  /* Maçonnerie (6) */
  'Scellement cheville chimique','Rebouchage trou & fissure','Pose carrelage mural petit format','Jointoiement carrelage','Création coffrage léger','Réparation plâtre',
  /* Aménagement (8) */
  'Pose tringle à rideaux','Installation miroir mural','Montage meuble TV','Montage bureau','Installation étagères murales','Pose store enrouleur','Installation porte coulissante','Montage mezzanine légère',
  /* Extérieur (6) */
  'Montage abri jardin','Pose clôture simple','Installation luminaire extérieur','Pose gouttière PVC','Installation récupérateur d\'eau','Aménagement bac à fleurs',
  /* Entretien & Divers (10) */
  'Remplacement joint silicone salle de bain','Entretien robinetterie','Changement poignée fenêtre','Pose joint anti-courant d\'air','Débouchage simple évier','Pose boîte aux lettres','Installation détecteur monoxyde de carbone','Petite soudure métal','Réparation carrosserie abîmée','Mise à niveau sol léger'
];

const categoryMap = {
  'Menuiserie': rawTitles.slice(0,10),
  'Peinture': rawTitles.slice(10,18),
  'Électricité': rawTitles.slice(18,25),
  'Plomberie': rawTitles.slice(25,33),
  'Chauffage': rawTitles.slice(33,39),
  'Sécurité': rawTitles.slice(39,45),
  'Maçonnerie': rawTitles.slice(45,51),
  'Aménagement': rawTitles.slice(51,59),
  'Extérieur': rawTitles.slice(59,65),
  'Entretien': rawTitles.slice(65,75)
};

// helper to build detailed steps per category
function buildDetailsFor(title, category){
  const lower = title.toLowerCase();
  // base structure
  const base = {
    title,
    category,
    difficulty: chooseDifficulty(title),
    time: estimateTime(category),
    materials: [],
    tools: [],
    steps: [],
    tips: []
  };

  // generic tools + materials
  base.tools = ['Mètre', 'Niveau', 'Crayon', 'Perceuse-visseuse', 'Tournevis'];
  base.materials = [{name:'Kit de fixation (vis, chevilles)', qty:'1', price:'variable'}];

  // Category-specific enrichment
  if(category === 'Peinture'){
    base.materials.unshift({name:'Peinture (L)', qty:'calculée selon surface', price:'€/L'});
    base.tools = ['Rouleau à poils adaptés','Pinceau finition','Bac à peinture','Bâches de protection','Ruban de masquage', ...base.tools];
    base.steps = [
      {title:'Évaluation & préparation', desc:'Mesurer la surface. Vérifier état du mur (fissures, ancien revêtement). Protéger sols et mobiliers avec bâches.'},
      {title:'Rebouchage et ponçage', desc:'Comblez fissures et trous avec enduit. Laisser sécher. Poncer pour lisser la surface.'},
      {title:'Nettoyage et sous-couche', desc:'Dépoussiérer et laver si nécessaire. Appliquer sous-couche si mur absorbant ou changement de couleur prononcé.'},
      {title:'Préparation peinture', desc:'Remuer la peinture. Verser dans bac. Installer grille d’essorage pour le rouleau.'},
      {title:'Peinture — technique', desc:'Peindre d’abord les angles au pinceau, puis utiliser le rouleau en bandes verticales, chevauchant 10 cm, en doublant les passes si nécessaire pour une finition uniforme.'},
      {title:'Séchage et finition', desc:'Attendre le temps indiqué entre couches. Retirer ruban et bâches. Vérifier uniformité et retouches.'}
    ];
    base.tips = [
      'Calcule 1L pour ~10 m² en 1 couche selon opacité. Prévois 10–15% de perte.',
      'Appliquer la peinture du plafond vers le sol pour éviter coulures.',
      'Utilise rouleau à poils courts pour murs lisses, poils longs pour murs texturés.'
    ];
  } else if(category === 'Menuiserie'){
    base.materials.unshift({name:'Panneaux / éléments kit', qty:'1', price:'€ dépendant du kit'});
    base.tools = ['Scie sauteuse / circulaire','Serre-joints','Cale de frappe', ...base.tools];
    base.steps = [
      {title:'Vérification des dimensions', desc:'Mesurer l’ouverture et reporter les cotes. Vérifier planéité du sol et mur.'},
      {title:'Préparation des éléments', desc:'Déballer kit, trier pièces et quincaillerie. Lire la notice fabricant.'},
      {title:'Assemblage à plat', desc:'Pré-assembler les grands éléments au sol pour vérifier l’ajustement avant fixation.'},
      {title:'Fixation et mise en place', desc:'Relever la structure, fixer aux ancrages muraux adaptés (chevilles, vis) en respectant niveau et aplomb.'},
      {title:'Ajustements et finitions', desc:'Poser portes/tiroirs, ajuster charnières, refermer et vérifier fonctionnement.'}
    ];
    base.tips = ['Toujours pré-percer pour éviter fendre le bois.', 'Utiliser serre-joints pour maintenir pièces pendant vissage.'];
  } else if(category === 'Plomberie'){
    base.materials.unshift({name:'Robinet/mitigeur', qty:'1', price:'€'});
    base.tools = ['Clé à molette','Clé plate','Tournevis','Ruban PTFE', ...base.tools];
    base.steps = [
      {title:'Coupure eau', desc:'Fermer l’arrivée d’eau générale et vidanger le circuit.'},
      {title:'Remplacement/pose', desc:'Déposer l’ancien élément si présent. Installer joints neufs et serrer selon préconisation.'},
      {title:'Test étanchéité', desc:'Rétablir alimentation et vérifier absence de fuite sur raccords.'}
    ];
    base.tips = ['Prévoir joints de rechange.', 'Si doute sur raccordement, faire intervenir un professionnel pour installations gazeuses ou chaudières.'];
  } else if(category === 'Électricité'){
    base.materials.unshift({name:'Interrupteur / prise', qty:'1', price:'€'});
    base.tools = ['Tournevis isolé','Pince coupante','Testeur de tension', ...base.tools];
    base.steps = [
      {title:'Sécuriser', desc:'Couper le disjoncteur correspondant au circuit. Vérifier l’absence de tension.'},
      {title:'Remplacement/pose', desc:'Brancher correctement la terre, neutre et phase en respectant code couleur.'},
      {title:'Vérification', desc:'Rétablir le courant et tester la fonction. Contrôler aux bornes.'}
    ];
    base.tips = ['Ne jamais travailler sous tension.', 'Respecter les normes et faire valider par un électricien pour circuits encastrés.'];
  } else if(category === 'Chauffage'){
    base.materials.unshift({name:'Radiateur / élément chauffage', qty:'1', price:'€'});
    base.tools = ['Clé à molette','Clé à radiateur','Niveau', ...base.tools];
    base.steps = [
      {title:'Couper alimentation', desc:'Couper l’alimentation électrique ou fermer circuit de chauffe si lié au circuit hydraulique.'},
      {title:'Fixation', desc:'Fixer équerres et poser appareil selon préconisations, purger et tester.'}
    ];
    base.tips = ['Vérifier compatibilité puissance et raccordement.', 'Si changement chaudière, interventions pro requises.'];
  } else if(category === 'Maçonnerie'){
    base.materials.unshift({name:'Mortier / enduit', qty:'quantité selon surface', price:'€'});
    base.tools = ['Truelle','Spatule','Niveau','Gants', ...base.tools];
    base.steps = [
      {title:'Préparation surface', desc:'Nettoyer, humidifier si nécessaire.'},
      {title:'Application', desc:'Appliquer couche de base, lisser, laisser prendre, finition.'}
    ];
    base.tips = ['Respecter temps de séchage.', 'Porter protections (lunettes, gants).'];
  } else if(category === 'Aménagement' || category === 'Extérieur' || category === 'Entretien' || category === 'Sécurité'){
    base.steps = [
      {title:'Préparer', desc:'Mesurer et définir emplacement exact.'},
      {title:'Fixer / installer', desc:'Utiliser chevilles adaptées et ancrages.'},
      {title:'Ajuster', desc:'Vérifier alignement et finition.'}
    ];
    base.tips = ['Utiliser protections adaptées.', 'S’assurer de la conformité des fixations au type de mur.'];
  }

  // add example safety warnings
  base.safety = [
    'Port des EPI recommandé (gants, lunettes, masque selon chantier).',
    'Couper alimentation (eau/électricité) avant toute intervention lorsque nécessaire.',
    'Consulter notice fabricant pour appareils fournis.'
  ];

  return base;
}

function chooseDifficulty(title){
  const t = title.toLowerCase();
  if(t.includes('montage')|| t.includes('pose') || t.includes('remplacement')) return 'Moyen';
  if(t.includes('installation')|| t.includes('montage abri')) return 'Difficile';
  return 'Facile';
}
function estimateTime(category){
  if(category==='Peinture') return '2-8 heures selon surface';
  if(category==='Menuiserie') return '2-10 heures selon complexité';
  if(category==='Plomberie') return '1-6 heures selon intervention';
  return '1-8 heures';
}

/* Build full projects array with detailed descriptions */
const projects = rawTitles.map((t,i)=>{
  // find category
  let cat = 'Autre';
  for(const k of Object.keys(categoryMap)) if(categoryMap[k].includes(t)){cat=k;break}
  return buildDetailsFor(t, cat);
});

/* ---------------------------
   UI: populate categories and render projects
   --------------------------- */
const catSelect = document.getElementById('categoryFilter');
const categories = ['Toutes catégories', ...Object.keys(categoryMap)];
categories.forEach(c=>{ const opt=document.createElement('option'); opt.value=c; opt.textContent=c; catSelect.appendChild(opt); });

function renderProjects(){
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const cf = (document.getElementById('categoryFilter')?.value || 'Toutes catégories');
  const grid = document.getElementById('projectsGrid'); grid.innerHTML='';
  const filtered = projects.filter(p=>{
    if(cf!=='Toutes catégories' && p.category!==cf) return false;
    if(q && !(p.title.toLowerCase().includes(q) || p.materials.some(m=>m.name.toLowerCase().includes(q)) || p.steps.some(s=>s.title.toLowerCase().includes(q)))) return false;
    return true;
  });
  document.getElementById('projectCount').textContent = filtered.length;
  filtered.forEach((p, idx)=>{
    const card = document.createElement('article'); card.className='card'; card.tabIndex=0;
    card.innerHTML = `<div style="font-weight:700">${escapeHtml(p.title)}</div>
      <div class="small">${escapeHtml(p.category)} • ${escapeHtml(p.difficulty)} • ${escapeHtml(p.time)}</div>
      <div style="margin-top:8px" class="small">${escapeHtml(shortDescription(p))}</div>
      <div style="margin-top:10px"><span class="badge">${escapeHtml(p.category)}</span></div>`;
    card.addEventListener('click', ()=> openProjectModal(p));
    card.addEventListener('keypress', e=> { if(e.key==='Enter') openProjectModal(p) });
    grid.appendChild(card);
  });
}
function shortDescription(p){
  // create 120 char summary from first steps
  const s = p.steps.map(x=>x.desc).join(' ');
  return (s.length>120)? s.slice(0,117)+'...' : s;
}
function escapeHtml(s){ return String(s).replace(/[&<>\"']/g, c=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ---------------------------
   Modal: project detail + calculator
   --------------------------- */
function openProjectModal(p){
  const modal = document.getElementById('modal'); modal.classList.add('active'); modal.setAttribute('aria-hidden','false');
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalMeta').textContent = `${p.category} • ${p.difficulty} • ${p.time}`;
  const body = document.getElementById('modalBody'); body.innerHTML = '';

  // left column: uploader + dimensions + calc
  const uploader = document.createElement('div'); uploader.className='section';
  uploader.innerHTML = `<div class="uploader">📷 Charger photo (optionnel)<br><input type="file" id="projPhoto" accept="image/*" style="margin-top:8px"></div>
    <div style="margin-top:8px" class="row">
      <div style="flex:1"><label>Hauteur (cm)</label><input id="h" type="number" min="0" placeholder="ex: 250"></div>
      <div style="width:12px"></div>
      <div style="flex:1"><label>Largeur (cm)</label><input id="w" type="number" min="0" placeholder="ex: 400"></div>
      <div style="width:12px"></div>
      <div style="flex:1"><label>Profondeur (cm)</label><input id="d" type="number" min="0" placeholder="ex: 30"></div>
    </div>
    <div style="margin-top:8px"><button class="btn btn-primary" id="calcBtn">Calculer la liste et le prix</button>
    <button class="btn btn-outline" id="saveBtn" style="margin-left:8px">Sauvegarder projet</button></div>
    <div class="photo-row" id="photoPreview"></div>`;
  body.appendChild(uploader);

  // attach photo preview handler
  const photoInput = uploader.querySelector('#projPhoto');
  const photoPreview = uploader.querySelector('#photoPreview');
  photoInput.addEventListener('change', ev=> {
    photoPreview.innerHTML=''; Array.from(ev.target.files).forEach(f=>{
      const url = URL.createObjectURL(f);
      const img = document.createElement('img'); img.src = url; img.alt = 'photo projet'; photoPreview.appendChild(img);
    });
  });

  // results area
  const results = document.createElement('div'); results.className='section'; results.id='projResults';
  body.appendChild(results);

  // materials, tools, steps displayed below
  const toolsSection = document.createElement('div'); toolsSection.className='section';
  toolsSection.innerHTML = `<strong>Outillage recommandé</strong><div class="small" style="margin-top:6px">${p.tools.join(', ')}</div>`;
  body.appendChild(toolsSection);

  const materialsSection = document.createElement('div'); materialsSection.className='section';
  materialsSection.innerHTML = `<strong>Matériaux</strong><div id="matList" style="margin-top:8px"></div>`;
  body.appendChild(materialsSection);

  const stepsSection = document.createElement('div'); stepsSection.className='section';
  stepsSection.innerHTML = `<strong>Notice détaillée (étapes)</strong><div id="stepsList" style="margin-top:8px"></div>`;
  body.appendChild(stepsSection);

  const tipsSection = document.createElement('div'); tipsSection.className='section';
  tipsSection.innerHTML = `<strong>Conseils & sécurité</strong><div id="tipsList" class="small" style="margin-top:8px"></div>`;
  body.appendChild(tipsSection);

  // fill materials, steps, tips
  const matList = document.getElementById('matList');
  matList.innerHTML = '';
  p.materials.forEach(m => {
    const r = document.createElement('div'); r.className='list-row';
    r.innerHTML = `<div>${escapeHtml(m.name)}</div><div class="small">${escapeHtml(m.qty)} ${m.price? '• '+escapeHtml(m.price) : ''}</div>`;
    matList.appendChild(r);
  });

  const stepsList = document.getElementById('stepsList');
  stepsList.innerHTML = '';
  p.steps.forEach((s, idx)=> {
    const el = document.createElement('div'); el.className='step';
    el.innerHTML = `<div style="font-weight:700">Étape ${idx+1} — ${escapeHtml(s.title)}</div><div class="small" style="margin-top:6px">${escapeHtml(s.desc)}</div>`;
    stepsList.appendChild(el);
  });

  const tipsList = document.getElementById('tipsList');
  tipsList.innerHTML = '';
  p.tips.forEach(t => { const d = document.createElement('div'); d.textContent = t; tipsList.appendChild(d); });
  p.safety.forEach(s => { const d = document.createElement('div'); d.textContent = s; tipsList.appendChild(d); });

  // attach calc button
  uploader.querySelector('#calcBtn').onclick = ()=> {
    const h = Number(uploader.querySelector('#h').value || 0);
    const w = Number(uploader.querySelector('#w').value || 0);
    const d = Number(uploader.querySelector('#d').value || 0);
    const calc = runCalc(p, {height:h,width:w,depth:d});
    renderCalc(calc, results);
  };

  // attach save button (stores in localStorage under savedProjects)
  uploader.querySelector('#saveBtn').onclick = ()=>{
    const name = p.title;
    const h = Number(uploader.querySelector('#h').value || 0);
    const w = Number(uploader.querySelector('#w').value || 0);
    const d = Number(uploader.querySelector('#d').value || 0);
    const saved = JSON.parse(localStorage.getItem('savedProjects')||'[]');
    saved.push({id: Date.now(), title: name, category: p.category, dims:{h,w,d}, date:new Date().toISOString()});
    localStorage.setItem('savedProjects', JSON.stringify(saved));
    alert('Projet sauvegardé dans ton profil.');
    renderSavedProjects();
  };
}

function runCalc(p, dims){
  // returns items list + estimate + notes
  const h = Number(dims.height)||0; const w = Number(dims.width)||0; const d = Number(dims.depth)||0;
  const area = (h && w)? ((h/100)*(w/100)) : 0; // m2
  const result = {items:[], estimate:'variable', notes:null};
  if(p.category === 'Peinture'){
    const sqm = area>0? Math.round(area*100)/100 : 10;
    const liters = Math.max(1, Math.ceil((sqm / 10) * 1)); // 1L per 10m2 base
    const price = liters * 15;
    result.items.push({name:'Peinture (L)', qty:liters, unit:'L'});
    result.items.push({name:'Ruban de masquage', qty:1, unit:'lot'});
    result.items.push({name:'Bâche de protection', qty:1, unit:'pièce'});
    result.estimate = price + ' € (est.)';
    result.notes = `Surface estimée ${sqm} m². Prévoir sous-couche si ancien mur absorbant.`;
  } else if(p.category === 'Menuiserie'){
    result.items.push({name:'Éléments kits / panneaux selon modèle', qty:1});
    result.items.push({name:'Visserie', qty:'1 boîte'});
    result.estimate = 'variable selon kit (est. 100–400 €)';
  } else if(p.category === 'Plomberie'){
    result.items.push({name:'Robinet / raccord', qty:1});
    result.estimate = 'variable (est. 20–150 €)';
  } else {
    result.items.push({name:'Kit outils de base', qty:1});
    result.estimate = 'variable';
  }
  return result;
}

function renderCalc(calc, out){
  out.innerHTML = '';
  const card = document.createElement('div'); card.className='panel';
  const title = document.createElement('div'); title.innerHTML = `<strong>Résultat du calcul</strong><div class="small" style="margin-top:6px">${escapeHtml(calc.notes||'')}</div>`;
  card.appendChild(title);
  const list = document.createElement('div'); list.style.marginTop='8px';
  calc.items.forEach(it=>{
    const r = document.createElement('div'); r.className='list-row';
    r.innerHTML = `<div>${escapeHtml(it.name)}</div><div class="small">${escapeHtml(String(it.qty||''))} ${escapeHtml(it.unit||'')}</div>`;
    list.appendChild(r);
  });
  card.appendChild(list);
  const price = document.createElement('div'); price.style.marginTop='10px'; price.innerHTML = `<strong>${escapeHtml(calc.estimate)}</strong>`;
  card.appendChild(price);
  out.appendChild(card);
}

/* ---------------------------
   Assistant IA (prototype rule-based)
   --------------------------- */
function handleAssistant(){
  const q = (document.getElementById('assistantInput').value||'').trim();
  const out = document.getElementById('assistantReply'); out.innerHTML = '';
  if(!q){ out.innerHTML = '<div class="small">Écris une question.</div>'; return; }
  // simple rules
  const lq = q.toLowerCase();
  if(lq.includes('combien') && lq.includes('litre')){
    // find numbers
    const nums = q.match(/\\d+(?:[\\.,]\\d+)?/g) || [];
    if(nums.length>=2){
      const width = parseFloat(nums[0].replace(',', '.')); const height = parseFloat(nums[1].replace(',', '.'));
      const area = (width/100)*(height/100); const liters = Math.max(1, Math.ceil(area/10));
      out.innerHTML = `<div class="panel"><div><strong>Estimation :</strong> Surface ~ ${Math.round(area*100)/100} m² → ~ ${liters} L de peinture (1 couche).</div><div class="small" style="margin-top:6px">Hypothèse : 1L = 10 m². Ajuster selon peinture et nombre de couches.</div></div>`;
      return;
    }
    out.innerHTML = `<div class="panel"><div class="small">Donne largeur et hauteur en cm (ex: 300 x 250).</div></div>`;
    return;
  }
  if(lq.includes('outillage') || lq.includes('quel outil') || lq.includes('quel rouleau')){
    out.innerHTML = `<div class="panel"><div><strong>Suggestion outillage :</strong><ul style="margin-top:8px"><li>Peinture mur: rouleau 18mm (murs texturés) ou 10mm (lisse), pinceau 60mm pour angles, bac + grille.</li><li>Perçage: perceuse-visseuse sans fil 18V + mèches adaptées.</li></ul></div></div>`;
    return;
  }
  // fallback
  out.innerHTML = `<div class="panel"><div><strong>Réponse rapide :</strong> Je peux calculer quantités (peinture, parquet, plinthes) si tu me donnes les cotes. Donne largeur et hauteur en cm ou choisis un projet dans l'onglet Projets.</div></div>`;
}

/* ---------------------------
   Profile & saved projects (localStorage)
   --------------------------- */
function saveProfile(){
  const name = document.getElementById('profileName').value || '';
  const email = document.getElementById('profileEmail').value || '';
  const obj = {name,email,updated:new Date().toISOString()};
  localStorage.setItem('gr_profile', JSON.stringify(obj));
  alert('Profil enregistré.');
  renderSavedProjects();
}
function loadProfile(){
  const p = JSON.parse(localStorage.getItem('gr_profile')||'null');
  if(!p){ alert('Aucun profil trouvé.'); return; }
  document.getElementById('profileName').value = p.name || '';
  document.getElementById('profileEmail').value = p.email || '';
  alert('Profil chargé.');
  renderSavedProjects();
}
function renderSavedProjects(){
  const container = document.getElementById('savedProjectsList');
  const saved = JSON.parse(localStorage.getItem('savedProjects')||'[]');
  if(saved.length===0){ container.innerHTML = '<div class="small">Aucun projet sauvegardé.</div>'; return; }
  container.innerHTML = '';
  saved.slice().reverse().forEach(s=>{
    const el = document.createElement('div'); el.className='list-row';
    el.innerHTML = `<div><strong>${escapeHtml(s.title)}</strong><div class="small">${escapeHtml(s.category)} • ${new Date(s.date).toLocaleString()}</div></div>
      <div style="display:flex;flex-direction:column;gap:6px"><button class="btn btn-outline" onclick='loadSavedProject("${s.id}")'>Ouvrir</button><button class="btn" onclick='deleteSavedProject("${s.id}")' style="background:var(--danger);color:#fff;margin-top:6px">Supprimer</button></div>`;
    container.appendChild(el);
  });
}
function loadSavedProject(id){
  const saved = JSON.parse(localStorage.getItem('savedProjects')||'[]');
  const s = saved.find(x=>String(x.id)===String(id));
  if(!s) return alert('Projet introuvable');
  // find template by title
  const template = projects.find(p=>p.title===s.title) || {title:s.title, category:s.category, difficulty:'—', time:'—', materials:[], tools:[], steps:[]};
  openProjectModal(template);
}
function deleteSavedProject(id){
  let saved = JSON.parse(localStorage.getItem('savedProjects')||'[]');
  saved = saved.filter(x=>String(x.id)!==String(id));
  localStorage.setItem('savedProjects', JSON.stringify(saved));
  renderSavedProjects();
}

/* ---------------------------
   Tabs & init
   --------------------------- */
function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = (el.id===tab? '' : 'none'));
  if(tab==='projects') renderProjects();
  if(tab==='profile') renderSavedProjects();
}
function openNewProject(){ openProjectModal({title:'Projet personnalisé',category:'Personnalisé',difficulty:'À définir',time:'variable',materials:[{name:'Kit de base',qty:1}],tools:['Mètre','Niveau'],steps:[{title:'1. Définir',desc:'Choisir exactement le besoin'},{title:'2. Mesurer',desc:'Saisir cotes et photos'},{title:'3. Calculer',desc:'Utiliser le calculateur'}],tips:[],safety:[]}); }
function closeModal(){ document.getElementById('modal').classList.remove('active'); document.getElementById('modal').setAttribute('aria-hidden','true'); }

/* ---------------------------
   Utilities & initial render
   --------------------------- */
function escapeHtml(s){ return String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

renderProjects();
renderSavedProjects();

/* Expose minimal API for debug in console */
window._gr = {projects, renderProjects, openProjectModal, runCalc, renderSavedProjects};
</script>
</body>
</html>
