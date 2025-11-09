<body>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <span>🔨 GuideRénov</span>
      </div>
      <nav>
        <ul>
          <li data-page="home" class="active">🏠 Accueil</li>
          <li data-page="projects">📁 Projets</li>
          <li data-page="ai">🤖 Assistant IA</li>
          <li data-page="profile">👤 Profil</li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="content">
      <!-- Home -->
      <section id="home" class="page active">
        <h1>Bienvenue sur GuideRénov</h1>
        <p>Sélectionne une section à gauche pour commencer.</p>
      </section>

      <!-- Projects -->
      <section id="projects" class="page">
        <h1>Projets</h1>
        <div style="margin-bottom:12px">
          <input type="text" id="projSearch" placeholder="Rechercher un projet..." style="padding:6px; width:60%">
          <button id="newProjectBtn" class="btn primary">Nouveau projet</button>
        </div>
        <div id="projGrid" class="grid"></div>
      </section>

      <!-- Assistant IA -->
      <section id="ai" class="page">
        <h1>Assistant IA</h1>
        <div class="chat-box">
          <div id="chatMessages"></div>
          <div style="display:flex; gap:8px; margin-top:8px;">
            <input type="text" id="chatInput" placeholder="Écris ici..." style="flex:1; padding:6px">
            <button id="sendChatBtn" class="btn primary">Envoyer</button>
          </div>
        </div>
      </section>

      <!-- Profile -->
      <section id="profile" class="page">
        <h1>Profil</h1>
        <label>Nom : <input id="username" placeholder="Votre nom" style="padding:6px"></label><br><br>
        <label>Email : <input id="email" placeholder="Votre email" style="padding:6px"></label><br><br>
        <label>Image profil : <input type="file" id="avatar" accept="image/*"></label><br><br>
        <button id="saveProfileBtn" class="btn primary">Sauvegarder</button>
        <p id="profileStatus"></p>
        <h3>Projets sauvegardés :</h3>
        <div id="savedProjects"></div>
      </section>
    </main>
  </div>

  <style>
    /* Base layout */
    .app-layout { display:flex; height:100vh; font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial; }
    .sidebar { width:240px; background:#111827; color:#fff; padding:20px; display:flex; flex-direction:column; }
    .sidebar .logo { font-size:20px; font-weight:600; margin-bottom:20px; }
    .sidebar ul { list-style:none; padding:0; }
    .sidebar li { padding:12px; cursor:pointer; border-radius:6px; margin-bottom:4px; }
    .sidebar li.active, .sidebar li:hover { background:#1f2937; }
    .content { flex:1; padding:25px; overflow-y:auto; background:var(--bg); }
    .page { display:none; }
    .page.active { display:block; }
    .btn { padding:6px 12px; border:none; border-radius:6px; cursor:pointer; font-weight:600; }
    .btn.primary { background:#2563eb; color:#fff; }
    .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:12px; margin-top:12px; }
    .card { background:#fff; border-radius:10px; padding:12px; box-shadow:0 4px 10px rgba(0,0,0,0.05); }
    .chat-box { border:1px solid #ccc; padding:10px; display:flex; flex-direction:column; height:350px; background:#f9f9f9; }
    #chatMessages { flex:1; overflow-y:auto; margin-bottom:6px; }
    #savedProjects .card { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
    body.dark { background:#0b1220; color:#fff; }
    body.dark .content { background:#1f1f2b; }
    body.dark .card { background:#1f1f2b; color:#fff; }
  </style>

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
      div.style.marginBottom='6px';
      if(from==='ai'){ div.innerHTML = `<strong>GuideRénov</strong>: ${text}`; } 
      else { div.innerHTML = `<strong>Vous</strong>: ${text}`; textAlign='right'; }
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function simulateAIResponse(msg){
      addMessage('...', 'ai'); // thinking
      setTimeout(()=>{
        chatMessages.lastChild.innerHTML = `<strong>GuideRénov</strong>: Réponse simulée pour "${msg}".`;
      }, 800 + Math.random()*1200);
    }

    sendBtn.addEventListener('click', ()=>{
      const txt = chatInput.value.trim(); if(!txt) return;
      addMessage(txt, 'user');
      chatInput.value='';
      simulateAIResponse(txt);
    });

    chatInput.addEventListener('keydown', e=>{
      if(e.key==='Enter'){ sendBtn.click(); }
    });

    addMessage('Bonjour ! Je suis ton assistant travaux. Pose une question ou donne les cotes d’un projet.');

    /* --- Projets --- */
    const projGrid = document.getElementById('projGrid');
    let projects = [];

    document.getElementById('newProjectBtn').addEventListener('click', ()=>{
      const name = prompt('Nom du projet:');
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
        div.innerHTML=`${p.title} <button onclick="deleteProject(${p.id})" style="float:right">Suppr</button>`;
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
        div.innerHTML=`${p.title} <button onclick="deleteSaved(${p.id})">Suppr</button>`;
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
        reader.onload = function(e){ user.avatar = e.target.result; localStorage.setItem('gr_user', JSON.stringify(user)); profileStatus.textContent='Profil sauvegardé !'; }
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
