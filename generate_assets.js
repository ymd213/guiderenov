<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>GuideRénov - Assistant et Projets</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* --- Couleurs et thèmes --- */
    :root {
      --primary:#ff6f00; /* orange chantier */
      --secondary:#374151; /* gris foncé */
      --background:#f4f4f4; 
      --card:#ffffff;
      --text:#111827;
      --accent:#2563eb;
    }
    body {
      margin:0;
      font-family: 'Inter', sans-serif;
      background: var(--background);
      color: var(--text);
    }
    /* --- Layout --- */
    .app-layout { display:flex; height:100vh; }
    .sidebar { width:250px; background:var(--secondary); color:#fff; display:flex; flex-direction:column; padding:20px; }
    .sidebar .logo { font-size:22px; font-weight:700; margin-bottom:25px; }
    .sidebar ul { list-style:none; padding:0; }
    .sidebar li { padding:12px; cursor:pointer; border-radius:6px; margin-bottom:6px; transition:0.2s; display:flex; align-items:center; gap:8px; }
    .sidebar li.active, .sidebar li:hover { background:#1f2937; }
    .content { flex:1; padding:25px; overflow-y:auto; }
    .page { display:none; }
    .page.active { display:block; }

    /* --- Boutons --- */
    .btn { padding:6px 14px; border:none; border-radius:6px; cursor:pointer; font-weight:600; }
    .btn.primary { background:var(--primary); color:#fff; }
    .btn.danger { background:#dc2626; color:#fff; }

    /* --- Cards & grids --- */
    .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:12px; margin-top:12px; }
    .card { background:var(--card); border-radius:10px; padding:12px; box-shadow:0 4px 10px rgba(0,0,0,0.05); display:flex; justify-content:space-between; align-items:center; }

    /* --- Chat --- */
    .chat-box { border:1px solid #ccc; padding:10px; display:flex; flex-direction:column; height:400px; background:#fff; border-radius:8px; }
    #chatMessages { flex:1; overflow-y:auto; margin-bottom:8px; }
    .message { margin-bottom:6px; }
    .message.user { text-align:right; color:var(--primary); }
    .message.ai { text-align:left; color:var(--accent); }

    /* --- Inputs --- */
    input[type=text], input[type=email], input[type=file] { padding:6px; border-radius:6px; border:1px solid #ccc; width:60%; margin-bottom:6px; }
    label { display:block; margin-bottom:6px; }

    /* --- Dark mode auto --- */
    body.dark { background:#1e1f26; color:#f4f4f4; }
    body.dark .content { background:#2a2b33; }
    body.dark .card { background:#3b3c47; color:#fff; }
    body.dark input { background:#444454; color:#f4f4f4; border:1px solid #666; }
    body.dark .chat-box { background:#3b3c47; color:#fff; }
  </style>
</head>
<body>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">🔨 GuideRénov</div>
      <nav>
        <ul>
          <li data-page="home" class="active">🏠 Accueil</li>
          <li data-page="projects">📁 Projets</li>
          <li data-page="ai">🤖 Assistant IA</li>
          <li data-page="profile">👤 Profil</li>
        </ul>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="content">
      <!-- Home -->
      <section id="home" class="page active">
        <h1>Bienvenue sur GuideRénov</h1>
        <p>Tout votre suivi de projets travaux et assistance IA au même endroit.</p>
      </section>

      <!-- Projects -->
      <section id="projects" class="page">
        <h1>Mes Projets</h1>
        <div style="margin-bottom:12px;">
          <input type="text" id="projSearch" placeholder="Rechercher un projet...">
          <button id="newProjectBtn" class="btn primary">Nouveau projet</button>
        </div>
        <div id="projGrid" class="grid"></div>
      </section>

      <!-- Assistant IA -->
      <section id="ai" class="page">
        <h1>Assistant IA</h1>
        <div class="chat-box">
          <div id="chatMessages"></div>
          <div style="display:flex; gap:6px; margin-top:6px;">
            <input type="text" id="chatInput" placeholder="Pose ta question...">
            <button id="sendChatBtn" class="btn primary">Envoyer</button>
          </div>
        </div>
      </section>

      <!-- Profile -->
      <section id="profile" class="page">
        <h1>Profil</h1>
        <label>Nom : <input id="username" placeholder="Votre nom"></label>
        <label>Email : <input id="email" placeholder="Votre email"></label>
        <label>Image profil : <input type="file" id="avatar" accept="image/*"></label>
        <button id="saveProfileBtn" class="btn primary">Sauvegarder</button>
        <p id="profileStatus"></p>
        <h3>Projets sauvegardés :</h3>
        <div id="savedProjects"></div>
      </section>
    </main>
  </div>

  <script>
    /* --- Mode sombre automatique --- */
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      document.body.classList.add('dark');
    }

    /* --- Navigation menu --- */
    document.querySelectorAll('.sidebar li').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelector('.sidebar li.active')?.classList.remove('active');
        item.classList.add('active');
        const page = item.dataset.page;
        document.querySelector('.page.active')?.classList.remove('active');
        document.getElementById(page).classList.add('active');
      });
    });

    /* --- Assistant IA --- */
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');

    function addMessage(text, from='ai'){
      const div = document.createElement('div');
      div.className='message '+from;
      div.textContent = text;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function aiResponse(msg){
      // Simule des réponses réalistes
      let resp = '';
      const m = msg.toLowerCase();

      if(m.includes('peinture')){
        resp = 'Pour la peinture, privilégiez une sous-couche adaptée au mur et utilisez un rouleau de qualité pour un fini uniforme.';
      } else if(m.includes('carrelage')){
        resp = 'Pour poser du carrelage, assurez-vous que le sol est bien nivelé et utilisez un mortier-colle adapté.';
      } else if(m.includes('calcul')){
        try{
          resp = 'Le résultat du calcul est : ' + eval(msg.replace(/[^-()\d/*+.]/g,'')) + '.';
        }catch{
          resp = 'Je n’ai pas pu calculer cela, vérifie ton expression.';
        }
      } else {
        resp = 'Je peux te donner des conseils sur peinture, carrelage, plomberie, électricité ou faire des calculs simples.';
      }
      addMessage(resp,'ai');
    }

    sendBtn.addEventListener('click', ()=>{
      const txt = chatInput.value.trim();
      if(!txt) return;
      addMessage(txt,'user');
      chatInput.value='';
      setTimeout(()=>{ aiResponse(txt); }, 600 + Math.random()*1000);
    });

    chatInput.addEventListener('keydown', e=>{
      if(e.key==='Enter'){ sendBtn.click(); }
    });

    addMessage('Bonjour ! Je suis ton assistant travaux. Pose-moi une question ou demande un calcul simple.');

    /* --- Projets --- */
    const projGrid = document.getElementById('projGrid');
    let projects = [];

    document.getElementById('newProjectBtn').addEventListener('click', ()=>{
      const name = prompt('Nom du projet :');
      if(!name) return;
      const obj = {id:Date.now(), title:name};
      projects.push(obj);
      saveProjects();
      renderProjects();
    });

    function renderProjects(){
      projGrid.innerHTML='';
      projects.forEach(p=>{
        const div = document.createElement('div'); div.className='card';
        div.innerHTML=`${p.title} <button class="btn danger" onclick="deleteProject(${p.id})">Suppr</button>`;
        projGrid.appendChild(div);
      });
    }

    function saveProjects(){
      localStorage.setItem('gr_projects', JSON.stringify(projects));
      renderSavedProjects();
    }

    function deleteProject(id){
      projects = projects.filter(p=>p.id!==id);
      saveProjects();
    }

    function renderSavedProjects(){
      const container = document.getElementById('savedProjects');
      const saved = JSON.parse(localStorage.getItem('gr_projects')||'[]');
      container.innerHTML='';
      saved.forEach(p=>{
        const div = document.createElement('div'); div.className='card';
        div.innerHTML=`${p.title} <button class="btn danger" onclick="deleteSaved(${p.id})">Suppr</button>`;
        container.appendChild(div);
      });
    }

    function deleteSaved(id){
      projects = projects.filter(p=>p.id!==id);
      saveProjects();
    }

    projects = JSON.parse(localStorage.getItem('gr_projects')||'[]');
    renderProjects();

    /* --- Profil --- */
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const avatarInput = document.getElementById('avatar');
    const profileStatus = document.getElementById('profileStatus');

    document.getElementById('saveProfileBtn').addEventListener('click', ()=>{
      const user = {
        name: usernameInput.value,
        email: emailInput.value
      };
      if(avatarInput.files[0]){
        const reader = new FileReader();
        reader.onload = function(e){
          user.avatar = e.target.result;
          localStorage.setItem('gr_user', JSON.stringify(user));
          profileStatus.textContent='Profil sauvegardé !';
        }
        reader.readAsDataURL(avatarInput.files[0]);
      } else {
        localStorage.setItem('gr_user', JSON.stringify(user));
        profileStatus.textContent='Profil sauvegardé !';
      }
    });

    function loadProfile(){
      const user = JSON.parse(localStorage.getItem('gr_user')||'null');
      if(!user) return;
      usernameInput.value = user.name||'';
      emailInput.value = user.email||'';
    }

    loadProfile();
    renderSavedProjects();
  </script>
</body>
</html>
