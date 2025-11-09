<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>GuideRénov — Assistant travaux</title>
<meta name="description" content="GuideRénov — notices pas-à-pas pour travaux bâtiment. 75 projets détaillés, assistant IA prototype, gestion projets.">
<style>
  :root{
    --bg:#f7fbff; --card:#ffffff; --accent:#2563eb; --accent2:#f97316; --muted:#5b6b78; --danger:#ef4444;
    --radius:12px;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%;font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial;background:var(--bg);color:#0b1220;-webkit-font-smoothing:antialiased}
  .app{display:flex;min-height:100vh}
  /* sidebar */
  .sidebar{width:300px;background:linear-gradient(180deg,#0f172a, #0b1220);color:#fff;padding:18px;display:flex;flex-direction:column;gap:14px}
  .brand{font-weight:800;display:flex;align-items:center;gap:10px;font-size:18px}
  .nav{display:flex;flex-direction:column;gap:8px;margin-top:8px}
  .nav button{background:transparent;border:none;color:inherit;text-align:left;padding:10px;border-radius:8px;cursor:pointer;font-weight:700}
  .nav button.active{background:rgba(255,255,255,0.06)}
  .nav small{display:block;color:#b6c3d6;font-weight:600;font-size:12px;margin-top:4px}
  .sidebar .credit{margin-top:auto;font-size:13px;color:#9fb0cf}
  /* main */
  .main{flex:1;padding:22px}
  header.main-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}
  .searchbar{display:flex;gap:10px;align-items:center}
  input[type=text], select, textarea {padding:9px 10px;border-radius:8px;border:1px solid #e6eef7;background:#fff;min-width:200px}
  .tabs{display:flex;gap:8px}
  .btn{padding:8px 12px;border-radius:8px;border:none;cursor:pointer;font-weight:700}
  .btn.primary{background:var(--accent);color:#fff}
  .panel{background:var(--card);border-radius:var(--radius);padding:16px;box-shadow:0 10px 30px rgba(4,8,20,0.06)}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin-top:12px}
  .card{background:#fff;border-radius:10px;padding:12px;box-shadow:0 6px 18px rgba(2,6,23,0.04);cursor:pointer;display:flex;flex-direction:column;gap:8px}
  .small{color:var(--muted);font-size:13px}
  .badge{display:inline-block;padding:6px 10px;border-radius:999px;background:#eef6ff;color:var(--accent);font-weight:800;font-size:12px}
  /* modal */
  .modal{position:fixed;inset:0;display:none;align-items:flex-start;justify-content:center;padding:24px;background:rgba(2,6,23,0.55);z-index:120}
  .modal.active{display:flex}
  .modal-card{background:var(--card);border-radius:12px;max-width:980px;width:100%;max-height:92vh;overflow:auto}
  .modal-head{padding:14px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}
  .modal-body{padding:16px}
  .section{margin-bottom:14px}
  .list-row{display:flex;justify-content:space-between;align-items:flex-start;padding:10px 0;border-bottom:1px dashed #f1f5f9}
  .step{background:#fff;border-radius:8px;padding:12px;border:1px solid #eef2ff;margin-bottom:10px}
  .photo-row{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}
  .photo-row img{width:140px;height:100px;object-fit:cover;border-radius:8px;border:2px solid #e9f2ff}
  footer{margin-top:18px;text-align:center;color:var(--muted);font-size:13px}
  @media(max-width:980px){
    .sidebar{display:none}
    .app{flex-direction:column}
    .main{padding:12px}
  }
</style>
</head>
<body>
<div class="app">
  <aside class="sidebar" role="navigation" aria-label="Navigation principale">
    <div class="brand">🔨 GuideRénov</div>
    <nav class="nav" aria-label="Sections">
      <button class="nav-btn active" data-tab="home" onclick="navTo('home')">Accueil</button>
      <button class="nav-btn" data-tab="projects" onclick="navTo('projects')">Projets</button>
      <button class="nav-btn" data-tab="saved" onclick="navTo('saved')">Mes projets</button>
      <button class="nav-btn" data-tab="assistant" onclick="navTo('assistant')">Assistant IA</button>
      <button class="nav-btn" data-tab="profile" onclick="navTo('profile')">Mon profil</button>
    </nav>
    <div class="credit">Prototype local • Données exemples</div>
  </aside>

  <main class="main" role="main">
    <header class="main-header">
      <div>
        <div style="font-weight:800;font-size:18px">GuideRénov — Assistant travaux</div>
        <div class="small">Sélectionne une catégorie dans la barre gauche pour travailler uniquement dessus.</div>
      </div>
      <div class="searchbar">
        <input type="text" id="globalSearch" placeholder="Rechercher (ex: peinture, lavabo...)" oninput="applyGlobalSearch()">
        <button class="btn primary" onclick="navTo('projects')">Aller aux projets</button>
      </div>
    </header>

    <!-- HOME -->
    <section id="home" class="panel view">
      <h2>Accueil</h2>
      <p class="small" style="margin-top:8px">
        Bienvenue. Choisis une section à gauche. Sur <strong>Projets</strong> tu accèdes aux 75 fiches détaillées. 
        <br>Sur <strong>Assistant IA</strong> tu peux poser une question technique ; l'IA te répondra et te propose des calculs rapides.
      </p>
      <div style="margin-top:12px" class="small">
        Mode d'emploi succinct :
        <ol style="margin-top:8px;padding-left:18px">
          <li>Sélectionne un projet dans <em>Projets</em> ou crée un projet personnalisé.</li>
          <li>Charge une photo (optionnel) et saisis les cotes en cm.</li>
          <li>Cliques sur "Calculer" pour obtenir : liste matériaux, estimation, outils et notice pas-à-pas.</li>
          <li>Sauvegarde dans <em>Mes projets</em> pour retrouver plus tard.</li>
        </ol>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="panel view" style="display:none">
      <div style="display:flex;gap:10px;align-items:center">
        <input type="text" id="projSearch" placeholder="Filtrer projets..." oninput="renderProjects()">
        <select id="projCategory" onchange="renderProjects()">
          <option value="Toutes catégories">Toutes catégories</option>
        </select>
        <div style="margin-left:auto"><button class="btn" onclick="openNewProject()">Nouveau projet</button></div>
      </div>
      <div style="margin-top:12px" class="small">Projets affichés : <strong id="projCount">0</strong></div>
      <div id="projGrid" class="grid" style="margin-top:12px"></div>
    </section>

    <!-- SAVED PROJECTS -->
    <section id="saved" class="panel view" style="display:none">
      <h3>Mes projets</h3>
      <div id="savedList" style="margin-top:12px"></div>
    </section>

    <!-- ASSISTANT -->
    <section id="assistant" class="panel view" style="display:none">
      <h3>Assistant IA</h3>
      <div style="margin-top:8px" class="small">Conversation locale (prototype). L'IA démarre la conversation.</div>
      <div id="chatBox" style="margin-top:10px;display:flex;flex-direction:column;gap:8px;max-height:60vh;overflow:auto;padding:8px;border-radius:8px;border:1px solid #eef6ff;background:#fff">
        <!-- messages appear here -->
      </div>
      <div style="margin-top:8px;display:flex;gap:8px">
        <input type="text" id="chatInput" placeholder="Écris ta question..." onkeydown="if(event.key==='Enter') sendChat()">
        <button class="btn primary" onclick="sendChat()">Envoyer</button>
      </div>
    </section>

    <!-- PROFILE -->
    <section id="profile" class="panel view" style="display:none">
      <h3>Mon profil</h3>
      <div style="display:flex;gap:12px;align-items:center;margin-top:10px">
        <div style="flex:1">
          <label>Nom</label><br>
          <input id="pfName" type="text" placeholder="Ton nom">
        </div>
        <div style="width:260px">
          <label>Email</label><br>
          <input id="pfEmail" type="text" placeholder="email@exemple.com">
        </div>
      </div>
      <div style="margin-top:10px">
        <button class="btn primary" onclick="saveProfile()">Enregistrer</button>
        <button class="btn" onclick="loadProfile()">Charger</button>
      </div>
      <div style="margin-top:14px">
        <h4>Projets sauvegardés</h4>
        <div id="profileSaved" class="small" style="margin-top:8px"></div>
      </div>
    </section>

    <footer style="margin-top:18px" class="small">Prototype GuideRénov • Données générées localement</footer>
  </main>
</div>

<!-- MODAL PROJECT -->
<div class="modal" id="modal" aria-hidden="true">
  <div class="modal-card" role="dialog" aria-modal="true">
    <div class="modal-head">
      <div>
        <strong id="modalTitle">Titre projet</strong>
        <div id="modalMeta" class="small"></div>
      </div>
      <div><button class="btn" onclick="closeModal()">✕ Fermer</button></div>
    </div>
    <div class="modal-body" id="modalBody"></div>
  </div>
</div>

<script>
/* -------------------------
   Projects list (75 items)
   ------------------------- */
const rawTitles = [
  /* Menuiserie (10) */
  'Montage meuble IKEA (Billy, Kallax)','Montage placard encastré','Pose de parquet flottant','Pose de plinthes','Montage lit/armoire',
  'Installation plan de travail cuisine','Fabrication étagères sur mesure','Pose de porte intérieure','Remplacement charnière porte','Montage dressing modulable',
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
  /* Entretien & Divers (12) */
  'Remplacement joint silicone salle de bain','Entretien robinetterie','Changement poignée fenêtre','Pose joint anti-courant d\'air','Débouchage simple évier','Pose boîte aux lettres','Installation détecteur monoxyde de carbone','Petite soudure métal','Réparation carrosserie abîmée','Mise à niveau sol léger',
  /* 2 projets supplémentaires to reach 75 */
  'Pose détecteur de fuite d\'eau','Isolation des combles légères'
];
/* verify count */
console.log('Projets:', rawTitles.length);

/* Category mapping */
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
  'Entretien': rawTitles.slice(65,77).slice(0,11) // adjust slice safe
};

/* Helper: build a detailed guide template per project */
function generateGuide(title, category){
  // normalize
  const t = title.toLowerCase();
  // common sections: matériel, outils, étapes numérotées, tests, séchage, points d'attention
  let materials = [];
  let tools = [];
  let steps = [];
  let notes = [];
  // default
  materials.push('Kit de fixation (vis, chevilles, colles selon besoin)');
  tools = ['Mètre','Niveau à bulle','Perceuse-visseuse','Tournevis','Crayon','Cutter'];
  // adapt by keywords
  if(t.includes('lavabo') || t.includes('vasque') || t.includes('robinet')){
    materials = [
      'Nouveau lavabo (vasque + colonne ou meuble)',
      'Robinet + flexibles d’alimentation',
      'Bonde + siphon',
      'Joints fibres et téflon',
      'Silicone sanitaire anti-moisissure'
    ];
    tools = ['Clé à molette','Clé plate 10/12 ou 12/14','Tournevis','Cutter','Bassine','Éponge'];
    steps = [
      {title:'1. Matériel requis', desc: materials.join('\n')},
      {title:'2. Couper l’alimentation en eau', desc: 'Fermer les robinets d’arrêt sous le lavabo. Si absents → fermer la vanne générale. Ouvrir robinet pour vider pression.'},
      {title:'3. Déconnecter l’ancien lavabo', desc: 'Placer bassine, dévisser écrou du siphon, retirer siphon. Dévisser flexibles. Dévisser fixations murales. Décoller joint silicone.'},
      {title:'4. Préparation du nouveau lavabo', desc: 'Installer bonde avec joint, serrer contre-écrou. Poser robinet et serrer l’écrou de fixation sous la vasque. Monter flexibles.'},
      {title:'5. Mise en place du lavabo', desc: 'Positionner, vérifier aplomb. Fixer avec chevilles adaptées. Appliquer cordon de silicone continu.'},
      {title:'6. Connexion du siphon', desc: 'Visser partie haute sur la bonde, connecter sortie à évacuation murale, ajuster hauteur.'},
      {title:'7. Branchement des flexibles', desc: 'Identifier eau froide/droite et eau chaude/gauche. Visser flexibles sur robinets d’arrêt. Serrer modérément.'},
      {title:'8. Test d’étanchéité', desc: 'Rouvrir eau, laisser couler 20–30s, observer fuites, resserrer si nécessaire.'},
      {title:'9. Temps de séchage', desc: 'Silicone : 12–24 h. Éviter usage intensif durant séchage.'}
    ];
    notes.push('Ne pas trop serrer la céramique. Toujours utiliser joints neufs.');
    notes.push('Si raccords complexes ou chauffage/chaudière impliqués, faire intervenir pro.');
  } else if(t.includes('peinture') || t.includes('peindre')){
    materials = ['Peinture (L) selon surface','Sous-couche (si nécessaire)','Ruban de masquage','Bâches de protection','Enduit de rebouchage','Papier de verre'];
    tools = ['Rouleau adapté (poils 10–18 mm)','Pinceau 40–60 mm','Bac à peinture','Grille d’essorage','Escabeau'];
    steps = [
      {title:'1. Matériel requis', desc: materials.join('\n')},
      {title:'2. Calcul surface', desc: 'Mesurer largeur × hauteur. Surface = m². 1 L couvre ~10 m² en 1 couche (varie selon peinture). Prévoir 10–15% de perte.'},
      {title:'3. Préparation', desc: 'Protéger sol et meubles, retirer prises si possible, reboucher imperfections et poncer.'},
      {title:'4. Application sous-couche', desc: 'Appliquer sous-couche si mur absorbant ou fort changement de teinte. Laisser sécher.'},
      {title:'5. Peinture — technique', desc: 'Peindre angles au pinceau, puis rouleau en bandes verticales, chevauchement 10 cm, lisser. Appliquer 2 couches si nécessaire.'},
      {title:'6. Finitions', desc: 'Retirer ruban avant séchage complet, nettoyer outils, ventiler.'}
    ];
    notes.push('Test sur petite zone avant application complète.');
    notes.push('Choisir type de peinture selon pièce (intérieur, salle de bain, extérieur).');
  } else if(t.includes('parquet') || t.includes('plancher')){
    materials = ['Lames de parquet (m² +10%)','Sous-couche isolante','Plinthes','Colle ou clips selon système'];
    tools = ['Scie sauteuse ou circulaire','Cale de frappe','Marteau','Cales d’espacement'];
    steps = [
      {title:'1. Matériel requis', desc: materials.join('\n')},
      {title:'2. Préparation du sol', desc: 'Sol propre, sec et plan. Tolérance planéité max 3 mm/m.'},
      {title:'3. Pose sous-couche', desc: 'Dérouler perpendiculairement au sens de pose. Joindre lés.'},
      {title:'4. Pose lames', desc: 'Poser première rangée avec languette vers le mur, cales d’expansion 8–10 mm. Emboîter lames suivantes.'},
      {title:'5. Découpes et finitions', desc: 'Découper contours et ajuster autour des obstacles. Poser plinthes.'}
    ];
    notes.push('Respecter dilatation perimétrique.');
  } else if(t.includes('radiateur')||t.includes('chauffage')){
    materials = ['Radiateur adapté','Équerres de fixation','Raccords, vannes','Téflon/joints'];
    tools = ['Clé à molette','Niveau','Perceuse','Clé à radiateur'];
    steps = [
      {title:'1. Matériel requis', desc: materials.join('\n')},
      {title:'2. Vérifier compatibilité', desc: 'Puissance, type raccord, emplacement. Couper alimentation électrique ou circuit.'},
      {title:'3. Fixation équerres', desc: 'Repérer niveau, percer, fixer équerres selon charges.'},
      {title:'4. Raccorder plomberie', desc: 'Monter vannes, purger circuit, contrôler étanchéité.'},
      {title:'5. Test', desc: 'Remplir, purger, vérifier montée en température et absence de fuite.'}
    ];
    notes.push('Pour installations complexes (chauffage central), faire appel à un professionnel.');
  } else if(t.includes('prise') || t.includes('interrupteur') || t.includes('électricité')){
    materials = ['Prise / interrupteur','Boîte d’encastrement (si nécessaire)','Cosses, dominos'];
    tools = ['Tournevis isolé','Pince coupante','Testeur de tension'];
    steps = [
      {title:'1. Matériel requis', desc: materials.join('\n')},
      {title:'2. Sécuriser', desc: 'Couper disjoncteur du circuit. Vérifier absence de tension au testeur.'},
      {title:'3. Remplacement/pose', desc: 'Démonter, brancher phase/neutre/terre correctement, fixer prise/interrupteur.'},
      {title:'4. Vérification', desc: 'Rétablir courant et tester fonction.'}
    ];
    notes.push('Respecter normes et codes couleurs. Si incertain, consulter un électricien.');
  } else if(t.includes('carrelage') || t.includes('jointoiement')){
    materials = ['Carrelage','Colle carrelage','Croisillons','Joint de carrelage'];
    tools = ['Truelle','Croisillons','Truelle crantée','Éponge'];
    steps = [
      {title:'1. Matériel requis', desc: materials.join('\n')},
      {title:'2. Préparation sol/mur', desc: 'Support propre, plan et sain.'},
      {title:'3. Pose carrelage', desc: 'Étaler colle, poser carreau, utiliser croisillons pour joints réguliers.'},
      {title:'4. Jointoiement', desc: 'Après prise, appliquer joints, nettoyer résidus.'}
    ];
    notes.push('Suivre temps de séchage du mortier-colle.');
  } else {
    // fallback: generalized detailed guide template
    materials = ['Matériaux adaptés au projet (consulter liste produit)'];
    tools = ['Outils de base: perceuse, niveau, mètre, tournevis'];
    steps = [
      {title:'1. Matériel requis', desc: materials.join('\n')},
      {title:'2. Préparation', desc: 'Mesurer, protéger zone, vérifier plans et contraintes.'},
      {title:'3. Exécution', desc: 'Suivre étapes spécifiques selon notice du fabricant.'},
      {title:'4. Vérification', desc: 'Contrôler étanchéité, alignement, fonctionnement.'},
      {title:'5. Finitions', desc: 'Nettoyer, poser protections et vérifier sécurité.'}
    ];
    notes.push('Adapter outillage et matériaux selon la nature exacte du projet.');
  }

  // build long textual description like the lavabo example
  let text = '';
  // Materials block
  text += '1. Matériel requis\n\n';
  materials.forEach(m => { text += '- ' + m + '\n'; });
  text += '\n2. Outils recommandés\n\n';
  tools.forEach(tl => { text += '- ' + tl + '\n'; });

  // Steps numbered with subpoints when present
  text += '\n3. Étapes détaillées\n\n';
  steps.forEach((s, idx) => {
    text += (idx+1) + '. ' + s.title + '\n\n';
    // split desc into paragraphs if contains newlines
    const parts = String(s.desc).split('\n');
    parts.forEach(p => { text += p + '\n\n'; });
  });

  // Test & finishing
  text += '4. Contrôles et tests\n\n- Vérifier l\'étanchéité, l\'alignement, le fonctionnement selon le type d\'installation.\n\n';
  text += '5. Temps de séchage & attente\n\n- Respecter les temps de séchage indiqués (silicone 12–24 h, mortier 24–48 h selon produit).\n\n';
  text += 'Points d\'attention clés\n\n';
  notes.forEach(n => { text += '- ' + n + '\n'; });

  return text;
}

/* -------------------------
   UI: setup categories & list
   ------------------------- */
const projCategorySelect = document.getElementById('projCategory');
const catList = ['Toutes catégories', ...Object.keys(categoryMap)];
catList.forEach(c => { const o = document.createElement('option'); o.value=c; o.textContent=c; projCategorySelect.appendChild(o); });

function renderProjects(){
  const q = (document.getElementById('projSearch').value || '').toLowerCase();
  const cat = document.getElementById('projCategory').value;
  const grid = document.getElementById('projGrid'); grid.innerHTML = '';
  // build array of objects {title, category}
  const items = rawTitles.map(t => {
    let foundCat = 'Autre';
    for(const k of Object.keys(categoryMap)){ if(categoryMap[k].includes(t)){ foundCat = k; break; } }
    return {title: t, category: foundCat};
  });
  const filtered = items.filter(it => {
    if(cat !== 'Toutes catégories' && it.category !== cat) return false;
    if(q && !(it.title.toLowerCase().includes(q) || it.category.toLowerCase().includes(q))) return false;
    return true;
  });
  document.getElementById('projCount').textContent = filtered.length;
  filtered.forEach(it => {
    const el = document.createElement('article'); el.className = 'card';
    el.innerHTML = `<div style="font-weight:800">${escapeHtml(it.title)}</div><div class="small">${escapeHtml(it.category)}</div><div style="margin-top:8px" class="small">Clique pour la notice détaillée</div>`;
    el.onclick = () => openProject(it.title, it.category);
    grid.appendChild(el);
  });
}

/* -------------------------
   Modal: open project full detail
   ------------------------- */
function openProject(title, category){
  const modal = document.getElementById('modal'); modal.classList.add('active'); modal.setAttribute('aria-hidden','false');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMeta').textContent = category;
  const body = document.getElementById('modalBody'); body.innerHTML = '';

  // left: photo uploader + dims + actions
  const left = document.createElement('div'); left.style.marginBottom='12px';
  left.innerHTML = `
    <div class="section uploader">
      📷 Charger photo (optionnel) <br><input id="mPhoto" type="file" accept="image/*" style="margin-top:8px">
      <div class="photo-row" id="mPhotoPreview"></div>
    </div>
    <div style="display:flex;gap:8px;margin-top:8px">
      <input id="mH" type="number" placeholder="Hauteur (cm)" style="flex:1">
      <input id="mW" type="number" placeholder="Largeur (cm)" style="flex:1">
      <input id="mD" type="number" placeholder="Profondeur (cm)" style="flex:1">
    </div>
    <div style="margin-top:8px;display:flex;gap:8px">
      <button class="btn primary" id="runCalc">Calculer</button>
      <button class="btn" id="saveProj">Sauvegarder</button>
      <button class="btn" id="closeModalBtn">Fermer</button>
    </div>
    <div id="calcResult" style="margin-top:12px"></div>
  `;
  body.appendChild(left);

  // attach photo preview
  const photoInput = left.querySelector('#mPhoto');
  const photoPreview = left.querySelector('#mPhotoPreview');
  photoInput.addEventListener('change', e => {
    photoPreview.innerHTML = '';
    Array.from(e.target.files).forEach(f => {
      const url = URL.createObjectURL(f);
      const img = document.createElement('img'); img.src = url; img.alt = 'photo projet';
      photoPreview.appendChild(img);
    });
  });

  // right: long generated guide text (scrollable)
  const guide = document.createElement('div'); guide.style.marginTop='12px';
  guide.className = 'section';
  const longText = generateGuide(title, category);
  // format into HTML paragraphs and numbered lists
  guide.innerHTML = `<div style="white-space:pre-wrap;font-family:inherit;line-height:1.45">${escapeHtml(longText)}</div>`;
  body.appendChild(guide);

  // button actions
  left.querySelector('#closeModalBtn').onclick = closeModal;
  left.querySelector('#saveProj').onclick = () => {
    const h = left.querySelector('#mH').value || null;
    const w = left.querySelector('#mW').value || null;
    const d = left.querySelector('#mD').value || null;
    saveProjectLocal({id:Date.now(), title, category, dims:{h,w,d}, date:new Date().toISOString()});
    alert('Projet sauvegardé dans Mes projets');
    renderSavedList();
  };
  left.querySelector('#runCalc').onclick = () => {
    const h = Number(left.querySelector('#mH').value || 0);
    const w = Number(left.querySelector('#mW').value || 0);
    const d = Number(left.querySelector('#mD').value || 0);
    const calc = calcQuantities(title, category, {height:h, width:w, depth:d});
    renderCalcResult(calc, left.querySelector('#calcResult'));
    left.querySelector('#calcResult').scrollIntoView({behavior:'smooth'});
  };
}

function renderCalcResult(calc, container){
  container.innerHTML = '';
  const panel = document.createElement('div'); panel.className='panel';
  let html = `<div style="font-weight:800">Estimation & liste</div><div class="small" style="margin-top:6px">${escapeHtml(calc.notes||'')}</div><div style="margin-top:10px">`;
  calc.items.forEach(it => {
    html += `<div class="list-row"><div>${escapeHtml(it.name)}</div><div class="small">${escapeHtml(String(it.qty))} ${escapeHtml(it.unit||'')}</div></div>`;
  });
  html += `</div><div style="margin-top:10px;font-weight:800">${escapeHtml(calc.estimate||'Estimation non disponible')}</div>`;
  panel.innerHTML = html;
  container.appendChild(panel);
}

/* -------------------------
   Calculation logic (basic formulas)
   ------------------------- */
function calcQuantities(title, category, dims){
  const h = Number(dims.height)||0; const w = Number(dims.width)||0; const d = Number(dims.depth)||0;
  const area = (h && w) ? Math.round((h/100)*(w/100)*100)/100 : 0;
  const result = {items:[], estimate:null, notes:null};
  const t = title.toLowerCase();
  if(t.includes('peinture')){
    const sqm = area>0? area : 10;
    const liters = Math.max(1, Math.ceil(sqm/10));
    result.items.push({name:'Peinture (L)', qty:liters, unit:'L'});
    result.items.push({name:'Ruban de masquage', qty:1, unit:'lot'});
    result.items.push({name:'Bâche de protection', qty:1, unit:'pièce'});
    result.estimate = `${liters * 15} € (approx.)`;
    result.notes = `Surface estimée ${sqm} m². Hypothèse: 1 L ≈ 10 m² par couche. Adapter selon produit.`;
  } else if(t.includes('parquet')){
    const sqm = area>0? area : 10;
    const qty = Math.ceil(sqm*1.1);
    result.items.push({name:'Lames parquet (m²)', qty, unit:'m²'});
    result.items.push({name:'Sous-couche (m²)', qty:Math.ceil(sqm), unit:'m²'});
    result.estimate = `${Math.round(qty*25)} € (approx.)`;
    result.notes = `Prévoir +10% pour coupes et pertes.`;
  } else if(t.includes('plinthe')){
    const perim = (h && w) ? Math.ceil(2*((h/100)+(w/100))) : 10;
    result.items.push({name:'Plinthes (ml)', qty:perim, unit:'ml'});
    result.estimate = `${perim * 8} € (approx.)`;
    result.notes = 'Mesurer le périmètre exact pour dimensionnement.';
  } else {
    result.items.push({name:'Kit outils de base', qty:1, unit:'kit'});
    result.estimate = 'variable';
    result.notes = 'Estimation basique; voir fiche projet pour plus de détails.';
  }
  return result;
}

/* -------------------------
   Save / load projects (local)
   ------------------------- */
function saveProjectLocal(obj){
  const arr = JSON.parse(localStorage.getItem('gr_saved')||'[]');
  arr.push(obj);
  localStorage.setItem('gr_saved', JSON.stringify(arr));
  renderSavedList();
}
function renderSavedList(){
  const container = document.getElementById('savedList');
  const arr = JSON.parse(localStorage.getItem('gr_saved')||'[]');
  container.innerHTML = '';
  if(arr.length === 0){ container.innerHTML = '<div class="small">Aucun projet sauvegardé.</div>'; updateProfileSaved(); return; }
  arr.slice().reverse().forEach(p => {
    const el = document.createElement('div'); el.className = 'card';
    el.innerHTML = `<div style="font-weight:800">${escapeHtml(p.title)}</div><div class="small">${escapeHtml(p.category)} • ${new Date(p.date).toLocaleString()}</div>
      <div style="margin-top:8px;display:flex;gap:8px"><button class="btn" onclick='openSaved("${p.id}")'>Ouvrir</button><button class="btn" onclick='deleteSaved("${p.id}")' style="background:${'var(--danger)'};color:#fff'>Suppr</button></div>`;
    container.appendChild(el);
  });
  updateProfileSaved();
}
function openSaved(id){
  const arr = JSON.parse(localStorage.getItem('gr_saved')||'[]');
  const p = arr.find(x => String(x.id) === String(id));
  if(!p) return alert('Projet introuvable');
  openProject(p.title, p.category);
}
function deleteSaved(id){
  let arr = JSON.parse(localStorage.getItem('gr_saved')||'[]');
  arr = arr.filter(x => String(x.id) !== String(id));
  localStorage.setItem('gr_saved', JSON.stringify(arr));
  renderSavedList();
}
function updateProfileSaved(){
  const p = document.getElementById('profileSaved'); const arr = JSON.parse(localStorage.getItem('gr_saved')||'[]');
  if(!p) return;
  if(arr.length === 0){ p.innerHTML = '<div class="small">Aucun projet sauvegardé.</div>'; return; }
  p.innerHTML = arr.slice().reverse().map(s => `<div style="margin-bottom:8px"><strong>${escapeHtml(s.title)}</strong><div class="small">${escapeHtml(s.category)} • ${new Date(s.date).toLocaleString()}</div></div>`).join('');
}

/* -------------------------
   Assistant IA prototype
   ------------------------- */
const chatBox = document.getElementById('chatBox');
// initial greeting
function initChat(){
  const initial = {from:'ai', text:'Bonjour. Je suis ton assistant travaux. Dis-moi le projet et donne les cotes (ex: mur 300x250) ou pose une question technique.'};
  addMessage(initial);
}
function addMessage(msg){
  const el = document.createElement('div'); el.style.display='flex'; el.style.gap='8px';
  if(msg.from === 'ai'){
    el.innerHTML = `<div style="background:#eef6ff;padding:10px;border-radius:8px;max-width:80%"><strong>GuideRénov</strong><div class="small" style="margin-top:6px">${escapeHtml(msg.text)}</div></div>`;
  } else {
    el.innerHTML = `<div style="margin-left:auto;background:#fff;padding:10px;border-radius:8px;border:1px solid #eef6ff;max-width:80%"><div class="small">${escapeHtml(msg.text)}</div></div>`;
  }
  chatBox.appendChild(el);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function sendChat(){
  const input = document.getElementById('chatInput'); const txt = (input.value||'').trim(); if(!txt) return;
  addMessage({from:'user', text:txt});
  input.value = '';
  // simple rule-based responses: handle "litre", "outillage", "comment", extract numbers
  const l = txt.toLowerCase();
  if(l.includes('bonjour') || l.includes('salut')){ addMessage({from:'ai', text:'Bonjour ! Dis-moi quel projet tu veux faire ou donne les cotes (ex: 300x250).'}); return; }
  if(l.match(/\\d+\\s*[xX×]\\s*\\d+/)){ // dims like 300x250
    const nums = l.match(/(\\d+)\\s*[xX×]\\s*(\\d+)/);
    const a = Number(nums[1]) /100; const b = Number(nums[2]) /100; const area = Math.round(a*b*100)/100;
    const liters = Math.max(1, Math.ceil(area/10));
    addMessage({from:'ai', text:`Surface estimée ${area} m². Estimation peinture ~ ${liters} L (1 couche). Veux-tu la liste complète matériaux ?`});
    return;
  }
  if(l.includes('litre') || l.includes('peinture')){ addMessage({from:'ai', text:'Donne la largeur et la hauteur en cm (ex: 300x250) pour calculer le besoin en litres.'}); return; }
  if(l.includes('outil') || l.includes('outillage') || l.includes('quel outil')){ addMessage({from:'ai', text:'Donne le type de projet. Ex: peinture, montage meuble, plomberie. Je te donnerai l’outillage recommandé.'}); return; }
  // fallback
  addMessage({from:'ai', text:'Je peux calculer quantités basiques et donner une notice pas-à-pas si tu choisis un projet dans Projets. Essaie "peinture 300x250".'});
}
initChat();

/* -------------------------
   Profile
   ------------------------- */
function saveProfile(){
  const name = document.getElementById('pfName').value || '';
  const email = document.getElementById('pfEmail').value || '';
  localStorage.setItem('gr_user', JSON.stringify({name,email,updated:new Date().toISOString()}));
  alert('Profil enregistré');
}
function loadProfile(){
  const p = JSON.parse(localStorage.getItem('gr_user')||'null');
  if(!p){ alert('Aucun profil enregistré'); return; }
  document.getElementById('pfName').value = p.name || '';
  document.getElementById('pfEmail').value = p.email || '';
  alert('Profil chargé');
}

/* -------------------------
   Navigation
   ------------------------- */
function navTo(tab){
  // sidebar buttons
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  // hide views
  document.querySelectorAll('.view').forEach(v => v.style.display = (v.id === tab) ? '' : 'none');
  // specific actions
  if(tab === 'projects'){ renderProjects(); }
  if(tab === 'saved'){ renderSavedList(); }
  if(tab === 'profile'){ updateProfileSaved(); }
  // ensure left sidebar selection state (for small screens)
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tab));
}

/* -------------------------
   Utilities & init
   ------------------------- */
function escapeHtml(s){ return String(s).replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function openNewProject(){ openProject('Projet personnalisé', 'Personnalisé'); }
function closeModal(){ document.getElementById('modal').classList.remove('active'); document.getElementById('modal').setAttribute('aria-hidden','true'); }
function applyGlobalSearch(){ const q = (document.getElementById('globalSearch').value||'').trim(); if(q) { document.getElementById('projSearch').value = q; navTo('projects'); renderProjects(); } }
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

/* initial render */
renderProjects();
renderSavedList();
updateProfileSaved();

</script>
</body>
</html>
