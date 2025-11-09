<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>GuideRénov — Assistant travaux</title>
  <meta name="description" content="GuideRénov — Prends une photo, saisis les cotes. Liste matériaux et notice pas-à-pas pour 73 projets maison.">
  <style>
    :root{--primary:#2563eb;--secondary:#f97316;--dark:#0f172a;--light:#f8fafc;--muted:#64748b;--success:#10b981}
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{height:100%;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;background:var(--light);color:var(--dark);-webkit-font-smoothing:antialiased}
    header{background:linear-gradient(135deg,var(--primary),#1e40af);color:#fff;padding:1rem;position:sticky;top:0;z-index:30}
    .wrap{max-width:1200px;margin:0 auto;padding:1rem}
    .top{display:flex;align-items:center;justify-content:space-between;gap:1rem}
    .logo{display:flex;align-items:center;gap:.6rem;font-weight:700;font-size:1.15rem}
    .cta{background:var(--secondary);border:none;color:#fff;padding:.6rem .9rem;border-radius:10px;cursor:pointer}
    main{padding:1rem}
    .hero{background:#fff;border-radius:12px;padding:1.25rem;margin-top:1rem;box-shadow:0 6px 20px rgba(2,6,23,0.06)}
    .hero h1{color:var(--primary);font-size:1.4rem;margin-bottom:.5rem}
    .grid{display:grid;grid-template-columns:repeat(auto-fit, minmax(240px,1fr));gap:1rem;margin-top:1rem}
    .card{background:#fff;padding:1rem;border-radius:10px;box-shadow:0 4px 14px rgba(2,6,23,0.04);cursor:pointer;display:flex;flex-direction:column}
    .card .meta{font-size:.85rem;color:var(--muted);margin-top:.5rem}
    .controls{display:flex;gap:.75rem;margin-top:1rem;flex-wrap:wrap}
    .search{flex:1;min-width:200px}
    input[type=text],select,input[type=number],textarea{width:100%;padding:.6rem;border-radius:8px;border:1px solid #e6edf3}
    .categories{display:flex;gap:.5rem;flex-wrap:wrap}
    .chip{padding:.4rem .6rem;border-radius:999px;background:#fff;border:1px solid #e6edf3;cursor:pointer;font-size:.85rem}
    .projects-grid{margin-top:1rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem}
    .modal{position:fixed;inset:0;background:rgba(2,6,23,0.6);display:none;align-items:center;justify-content:center;padding:1rem;z-index:50}
    .modal.active{display:flex}
    .panel{background:#fff;border-radius:12px;max-width:980px;width:100%;max-height:92vh;overflow:auto}
    .panel .head{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}
    .panel .body{padding:1rem}
    .materials{display:grid;grid-template-columns:1fr 120px;gap:.5rem;margin-top:.75rem}
    .steps{margin-top:1rem}
    .step{background:#fff;border-radius:8px;padding:.8rem;border:1px solid #eef2ff;margin-bottom:.5rem}
    .uploader{border:2px dashed var(--primary);padding:1rem;border-radius:10px;text-align:center;background:#f0f9ff}
    .photo-row{display:flex;gap:.5rem;margin-top:.5rem;flex-wrap:wrap}
    .photo-row img{width:110px;height:80px;object-fit:cover;border-radius:8px;border:2px solid #e6f0ff}
    footer{margin:2rem 0;color:var(--muted);text-align:center}
    @media (max-width:720px){.top{flex-direction:column;align-items:flex-start}}
    .badge{display:inline-block;padding:.25rem .6rem;border-radius:999px;background:#eef2ff;color:var(--primary);font-size:.75rem;margin-top:.5rem}
    .small{font-size:.9rem;color:var(--muted)}
    .btn{padding:.5rem .8rem;border-radius:8px;border:none;cursor:pointer}
    .btn-outline{background:#fff;border:1px solid #e6edf3}
    .btn-primary{background:var(--primary);color:#fff}
  </style>
</head>
<body>
  <header>
    <div class="wrap top">
      <div class="logo">🔨 GuideRénov — Assistant travaux</div>
      <div>
        <button class="cta" onclick="scrollToId('start')">Commencer un projet</button>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="hero" id="start">
      <h1>Prends une photo, saisis les cotes. Nous générons la liste matériaux et la notice pas-à-pas.</h1>
      <p class="small" style="margin-top:.5rem">Calculs standards (peinture, parquet, plinthes, étagères, chauffage...). Guide outillage adapté.</p>

      <div class="controls">
        <div class="search"><input type="text" id="search" placeholder="Rechercher un projet, ex: peinture mur" oninput="renderProjects()"></div>
        <div style="min-width:180px"><select id="categoryFilter" onchange="renderProjects()"><option value="Toutes catégories">Toutes catégories</option></select></div>
        <div style="min-width:140px"><button class="chip" onclick="openNewProject()">Nouveau projet</button></div>
      </div>

      <div style="margin-top:1rem" class="small">Projets disponibles : <strong id="count">0</strong></div>
    </section>

    <section class="projects-grid" id="projectsGrid" aria-live="polite"></section>
  </main>

  <div class="modal" id="modal" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="panel" role="document">
      <div class="head">
        <div>
          <strong id="mTitle">Titre</strong>
          <div id="mMeta" class="small"></div>
        </div>
        <div>
          <button onclick="closeModal()" aria-label="Fermer" style="border:none;background:transparent;font-size:1.2rem;cursor:pointer">✕</button>
        </div>
      </div>
      <div class="body" id="mBody"></div>
    </div>
  </div>

  <footer class="wrap"><small>Prototype — GuideRénov. Données exemples. Hébergement et publication à prévoir.</small></footer>

  <script>
    // --- Données : 73 projets (listes + catégories) ---
    const rawTitles = [
      // Menuiserie (10)
      'Montage meuble IKEA (Billy, Kallax)','Montage placard encastré','Pose de parquet flottant','Pose de plinthes','Montage lit/armoire',
      'Installation plan de travail cuisine','Fabrication étagères sur mesure','Pose de porte intérieure','Remplacement charnière porte','Montage dressing modulable',
      // Peinture (8)
      'Peinture mur/plafond','Application sous-couche','Peinture boiseries','Peinture radiateur','Pose de toile de verre','Rebouchage et ponçage avant peinture','Peinture façade extérieure','Vernis meuble bois',
      // Électricité (7)
      'Installation prise murale','Pose plafonnier','Remplacement interrupteur','Installation détecteur de mouvement','Installation applique murale','Pose variateur d\'intensité','Tirage simple de câble',
      // Plomberie (8)
      'Installation lavabo/vasque','Montage robinet/mitigeur','Installation machine à laver','Pose colonne de douche','Remplacement siphon','Pose évacuation lave-vaisselle','Installation ballon d\'eau petit modèle','Changement flexible douche',
      // Chauffage (6)
      'Pose radiateur électrique mural','Installation thermostat connecté','Remplacement radiateur','Pose sèche-serviette','Installation grille aération','Montage chaudière (guide pro)',
      // Sécurité & Serrurerie (6)
      'Remplacement barillet porte','Pose serrure additionnelle','Installation détecteur fumée','Pose judas porte','Installation sonnette connectée','Pose verrou sécurité fenêtre',
      // Maçonnerie (6)
      'Scellement cheville chimique','Rebouchage trou & fissure','Pose carrelage mural petit format','Jointoiement carrelage','Création coffrage léger','Réparation plâtre',
      // Aménagement (8)
      'Pose tringle à rideaux','Installation miroir mural','Montage meuble TV','Montage bureau','Installation étagères murales','Pose store enrouleur','Installation porte coulissante','Montage mezzanine légère',
      // Extérieur (6)
      'Montage abri jardin','Pose clôture simple','Installation luminaire extérieur','Pose gouttière PVC','Installation récupérateur d\'eau','Aménagement bac à fleurs',
      // Entretien & Divers (10)
      'Remplacement joint silicone salle de bain','Entretien robinetterie','Changement poignée fenêtre','Pose joint anti-courant d\'air','Débouchage simple évier','Pose boîte aux lettres','Installation détecteur monoxyde de carbone','Petite soudure métal','Réparation carrosserie abîmée','Mise à niveau sol léger'
    ];

    const categoryMap = {
      'Menuiserie': ['Montage meuble IKEA (Billy, Kallax)','Montage placard encastré','Pose de parquet flottant','Pose de plinthes','Montage lit/armoire','Installation plan de travail cuisine','Fabrication étagères sur mesure','Pose de porte intérieure','Remplacement charnière porte','Montage dressing modulable'],
      'Peinture': ['Peinture mur/plafond','Application sous-couche','Peinture boiseries','Peinture radiateur','Pose de toile de verre','Rebouchage et ponçage avant peinture','Peinture façade extérieure','Vernis meuble bois'],
      'Électricité': ['Installation prise murale','Pose plafonnier','Remplacement interrupteur','Installation détecteur de mouvement','Installation applique murale','Pose variateur d\'intensité','Tirage simple de câble'],
      'Plomberie': ['Installation lavabo/vasque','Montage robinet/mitigeur','Installation machine à laver','Pose colonne de douche','Remplacement siphon','Pose évacuation lave-vaisselle','Installation ballon d\'eau petit modèle','Changement flexible douche'],
      'Chauffage': ['Pose radiateur électrique mural','Installation thermostat connecté','Remplacement radiateur','Pose sèche-serviette','Installation grille aération','Montage chaudière (guide pro)'],
      'Sécurité': ['Remplacement barillet porte','Pose serrure additionnelle','Installation détecteur fumée','Pose judas porte','Installation sonnette connectée','Pose verrou sécurité fenêtre'],
      'Maçonnerie': ['Scellement cheville chimique','Rebouchage trou & fissure','Pose carrelage mural petit format','Jointoiement carrelage','Création coffrage léger','Réparation plâtre'],
      'Aménagement': ['Pose tringle à rideaux','Installation miroir mural','Montage meuble TV','Montage bureau','Installation étagères murales','Pose store enrouleur','Installation porte coulissante','Montage mezzanine légère'],
      'Extérieur': ['Montage abri jardin','Pose clôture simple','Installation luminaire extérieur','Pose gouttière PVC','Installation récupérateur d\'eau','Aménagement bac à fleurs'],
      'Entretien': ['Remplacement joint silicone salle de bain','Entretien robinetterie','Changement poignée fenêtre','Pose joint anti-courant d\'air','Débouchage simple évier','Pose boîte aux lettres','Installation détecteur monoxyde de carbone','Petite soudure métal','Réparation carrosserie abîmée','Mise à niveau sol léger']
    };

    // Build projects array with structure and simple rules
    const projects = rawTitles.map((t,i)=>{
      let cat = 'Autre';
      for(const k of Object.keys(categoryMap)) if(categoryMap[k].includes(t)){cat=k;break}
      const diff = i%3===0? 'Facile' : (i%3===1? 'Moyen':'Difficile');
      const materials = [{name: "Kit de base (vis, chevilles, colle)", quantity: "1", price: "variable"}];
      const tools = ['Mètre','Niveau','Perceuse-visseuse'];
      const steps = [
        {title:'Prise de mesures', desc:'Mesurez précisément la zone concernée.'},
        {title:'Préparation', desc:'Dégagez la zone et protégez les surfaces sensibles.'},
        {title:'Exécution', desc:'Suivez les étapes spécifiques au projet.'},
        {title:'Finitions', desc:'Nettoyez et vérifiez la qualité du travail.'}
      ];

      const lower = t.toLowerCase();
      if(lower.includes('peinture')){
        materials.unshift({name:'Peinture (estimation L)', quantity:'variable', price:'€/L'});
        tools.unshift('Rouleau','Pinceau','Bac à peinture');
        steps.unshift({title:'Protection', desc:'Protégez sols et meubles, masquez plinthes et prises.'});
      }
      if(lower.includes('parquet')){
        materials.unshift({name:'Lames parquet (m²)', quantity:'surface +10%', price:'€/m²'});
        tools.unshift('Scie','Cale de frappe');
      }
      if(lower.includes('plinthe')){
        materials.unshift({name:'Plinthes (ml)', quantity:'périmètre', price:'€/ml'});
      }
      if(lower.includes('radiateur')|| lower.includes('chauffage')){
        materials.unshift({name:'Radiateur (réf à vérifier)', quantity:'1', price:'€'});
        tools.unshift('Clé à molette');
      }

      // calcFormula: basic templates for paint/parquet/plinthes
      const calcFormula = (dimensions)=>{
        const h = Number(dimensions.height)||0;
        const w = Number(dimensions.width)||0;
        const d = Number(dimensions.depth)||0;
        const area = Math.round(((h/100)*(w/100))*100)/100; // m²
        const result = {items:[], estimateEuro:null, notes:null};
        if(lower.includes('peinture')){
          const sqm = area>0? area : 10;
          const liters = Math.max(1, Math.ceil((sqm / 10) * 1)); // hypothèse 10 m2 / L
          const price = liters * 15;
          result.items.push({name:'Peinture (L)', qty:liters, unit:'L'});
          result.estimateEuro = price + ' € (est.)';
          result.notes = `Surface estimée ${sqm} m². Prévoir sous-couche si nécessaire.`;
        } else if(lower.includes('parquet')){
          const sqm = area>0? area : 10;
          const qty = Math.ceil(sqm * 1.1);
          result.items.push({name:'Lames parquet (m²)', qty, unit:'m²'});
          result.estimateEuro = Math.round(qty * 25) + ' € (est.)';
        } else if(lower.includes('plinth')){
          const perim = h>0 && w>0? 2 * ((h/100) + (w/100)) : 10;
          const ml = Math.ceil(perim);
          result.items.push({name:'Plinthes (ml)', qty:ml, unit:'ml'});
          result.estimateEuro = Math.round(ml * 8) + ' € (est.)';
        } else {
          result.items.push({name:'Kit outils de base', qty:1, unit:'kit'});
          result.estimateEuro = 'variable';
        }
        return result;
      };

      return {id:i+1,title:t,category:cat,difficulty:diff,time:'variable',description:'Fiche pas-à-pas pour '+t,materials,tools,steps,calcFormula};
    });

    // --- UI init: categories filter populate ---
    const categories = ['Toutes catégories', ...Object.keys(categoryMap)];
    const catSelect = document.getElementById('categoryFilter');
    categories.forEach(c=>{
      const opt=document.createElement('option'); opt.value=c; opt.textContent=c; catSelect.appendChild(opt);
    });

    // render projects grid
    function renderProjects(){
      const q = document.getElementById('search').value.toLowerCase().trim();
      const cf = document.getElementById('categoryFilter').value;
      const grid = document.getElementById('projectsGrid'); grid.innerHTML='';
      const filtered = projects.filter(p=>{
        if(cf !== 'Toutes catégories' && p.category !== cf) return false;
        if(q && !(p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))) return false;
        return true;
      });
      document.getElementById('count').textContent = filtered.length;
      filtered.forEach(p=>{
        const el = document.createElement('article'); el.className='card'; el.tabIndex=0;
        el.innerHTML = `
          <div style="font-weight:700">${escapeHtml(p.title)}</div>
          <div class="meta">${escapeHtml(p.category)} • ${escapeHtml(p.difficulty)}</div>
          <div style="margin-top:.6rem;color:var(--muted);font-size:.95rem">${escapeHtml(p.description)}</div>
          <div style="margin-top:.8rem"><span class="badge">${escapeHtml(p.category)}</span></div>
        `;
        el.addEventListener('click', ()=> openProject(p));
        el.addEventListener('keypress', (e)=>{ if(e.key==='Enter') openProject(p) });
        grid.appendChild(el);
      });
    }

    function escapeHtml(s){ return String(s).replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }

    // open project modal + interactive calculator
    function openProject(p){
      const m = document.getElementById('modal'); m.classList.add('active'); m.setAttribute('aria-hidden','false');
      document.getElementById('mTitle').textContent = p.title;
      document.getElementById('mMeta').textContent = `${p.category} • ${p.difficulty}`;
      const body = document.getElementById('mBody'); body.innerHTML = '';

      // photo uploader
      const up = document.createElement('div'); up.className='uploader';
      up.innerHTML = `<div>📷 Charger une photo (optionnel)</div><input type="file" id="photoInput" accept="image/*" aria-label="Charger photo"><div class="photo-row" id="photoRow"></div>`;
      body.appendChild(up);
      up.querySelector('#photoInput').addEventListener('change', ev=>{
        const row = up.querySelector('#photoRow'); row.innerHTML='';
        Array.from(ev.target.files).forEach(f=>{ const url = URL.createObjectURL(f); const img = document.createElement('img'); img.src=url; img.alt = 'photo projet'; row.appendChild(img) });
      });

      // dimensions form
      const form = document.createElement('div'); form.style.marginTop='1rem';
      form.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:.5rem">
          <div><label>Hauteur (cm)</label><input type="number" id="dimH" placeholder="ex: 250" min="0"></div>
          <div><label>Largeur (cm)</label><input type="number" id="dimW" placeholder="ex: 400" min="0"></div>
          <div><label>Profondeur (cm)</label><input type="number" id="dimD" placeholder="ex: 30" min="0"></div>
        </div>
        <div style="margin-top:.6rem;display:flex;gap:.5rem;align-items:center">
          <button class="btn btn-primary" id="calcBtn">Calculer besoins & prix</button>
          <button class="btn btn-outline" id="resetBtn">Réinitialiser</button>
        </div>
      `;
      body.appendChild(form);

      // results container
      const out = document.createElement('div'); out.id='calcOut'; out.style.marginTop='1rem';
      body.appendChild(out);

      // tools and steps
      const tools = document.createElement('div'); tools.style.marginTop='1rem';
      tools.innerHTML = `<strong>Outillage recommandé</strong><div style="color:var(--muted);margin-top:.4rem">${p.tools.join(', ')}</div>`;
      body.appendChild(tools);

      const steps = document.createElement('div'); steps.className='steps'; steps.innerHTML = `<strong>Étapes</strong>`;
      p.steps.forEach(s=>{
        const el = document.createElement('div'); el.className='step';
        el.innerHTML = `<div style="font-weight:700">${escapeHtml(s.title)}</div><div style="color:var(--muted);margin-top:.3rem">${escapeHtml(s.desc)}</div>`;
        steps.appendChild(el);
      });
      body.appendChild(steps);

      // attach behavior
      form.querySelector('#calcBtn').onclick = ()=>{
        const h = form.querySelector('#dimH').value; const w = form.querySelector('#dimW').value; const d = form.querySelector('#dimD').value;
        const res = p.calcFormula({height:h,width:w,depth:d});
        renderCalc(res, out);
        // scroll to results
        out.scrollIntoView({behavior:'smooth'});
      };
      form.querySelector('#resetBtn').onclick = ()=>{ form.querySelector('#dimH').value=''; form.querySelector('#dimW').value=''; form.querySelector('#dimD').value=''; out.innerHTML=''; };

      // accessibility focus
      setTimeout(()=>{ form.querySelector('#dimH').focus(); }, 100);
    }

    function renderCalc(res, out){
      out.innerHTML = '';
      const panel = document.createElement('div'); panel.style.padding='1rem'; panel.style.borderRadius='8px'; panel.style.background='linear-gradient(135deg,#f8fafc,#eef6ff)';
      const title = document.createElement('div'); title.innerHTML = `<strong>Liste matériaux estimée</strong>`; panel.appendChild(title);
      const list = document.createElement('div'); list.style.marginTop='.6rem';
      (res.items||[]).forEach(it=>{
        const row = document.createElement('div'); row.style.display='flex'; row.style.justifyContent='space-between'; row.style.padding='.5rem 0';
        row.innerHTML = `<div>${escapeHtml(it.name)}</div><div style="font-weight:700">${escapeHtml(String(it.qty))} ${escapeHtml(it.unit||'')}</div>`;
        list.appendChild(row);
      });
      panel.appendChild(list);
      if(res.estimateEuro){
        const price = document.createElement('div'); price.style.marginTop='.8rem'; price.style.fontWeight='700'; price.style.color='var(--success)'; price.textContent = res.estimateEuro;
        panel.appendChild(price);
      }
      if(res.notes){
        const notes = document.createElement('div'); notes.style.marginTop='.6rem'; notes.style.color='var(--muted)'; notes.textContent = res.notes;
        panel.appendChild(notes);
      }
      out.appendChild(panel);
    }

    function closeModal(){ document.getElementById('modal').classList.remove('active'); document.getElementById('modal').setAttribute('aria-hidden','true'); }
    window.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

    function openNewProject(){ openProject({title:'Nouveau projet personnalisé',category:'Personnalisé',difficulty:'À déterminer',description:'Créez votre projet',materials:[],tools:[],steps:[{title:'Définir',desc:'Choisir type de travaux'},{title:'Mesurer',desc:'Mesurer la zone'},{title:'Calculer',desc:'Utiliser le calculateur'}], calcFormula: (dims)=>({items:[{name:'Kit outils de base',qty:1,unit:'kit'}],estimateEuro:'variable'})}) }

    function scrollToId(id){ document.getElementById(id).scrollIntoView({behavior:'smooth'}) }

    // initial render
    renderProjects();

    // expose some helpers for debug
    window.renderProjects = renderProjects;
    window.openProject = openProject;
    window.closeModal = closeModal;
    window.openNewProject = openNewProject;
  </script>
</body>
</html>
