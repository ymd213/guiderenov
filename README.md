<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GuideRénov — Assistant Travaux</title>
<style>
:root{
  --bg:#f4f6f8;
  --card:#ffffff;
  --primary:#2563eb;
  --secondary:#f97316;
  --muted:#5b6b78;
  --danger:#ef4444;
  --radius:12px;
  --text:#111827;
}

*{box-sizing:border-box;margin:0;padding:0;font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial;}
html,body{height:100%;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;}

.app-layout{display:flex;height:100vh;}

/* Sidebar */
.sidebar{width:280px;background:#111827;color:#fff;padding:20px;display:flex;flex-direction:column;}
.sidebar .logo{font-size:24px;font-weight:700;margin-bottom:30px;}
.sidebar nav ul{list-style:none;}
.sidebar nav li{padding:12px;cursor:pointer;border-radius:6px;display:flex;align-items:center;gap:10px;}
.sidebar nav li.active, .sidebar nav li:hover{background:#1f2937;}
.sidebar nav li i{width:24px;text-align:center;}
.sidebar .credit{margin-top:auto;font-size:12px;color:#9fb0cf;text-align:center;}

/* Main content */
.content{flex:1;padding:20px;overflow-y:auto;}
.page{display:none;}
.page.active{display:block;}
.page h1{margin-bottom:10px;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;margin-top:16px;}
.card{background:var(--card);border-radius:var(--radius);padding:12px;box-shadow:0 6px 18px rgba(2,6,23,0.04);cursor:pointer;display:flex;flex-direction:column;gap:6px;transition:transform 0.2s;}
.card:hover{transform:translateY(-4px);}
.card img{width:100%;height:140px;object-fit:cover;border-radius:var(--radius);}
.card h3{font-size:16px;color:var(--primary);}
.card p{font-size:14px;color:var(--muted);}

/* Chat IA */
.chat-box{border:1px solid #ddd;height:400px;display:flex;flex-direction:column;padding:10px;border-radius:var(--radius);}
#chatMessages{flex:1;overflow-y:auto;margin-bottom:10px;}
#chatMessages .message{margin-bottom:8px;padding:6px 10px;border-radius:8px;max-width:80%;}
#chatMessages .user{background:#2563eb;color:#fff;align-self:flex-end;}
#chatMessages .bot{background:#e5e7eb;color:#111827;align-self:flex-start;}
#chatInput{padding:10px;border:1px solid #ccc;border-radius:var(--radius);}

/* Profil */
.profile-form{display:flex;flex-direction:column;gap:12px;max-width:400px;}
.profile-form input{padding:8px;border:1px solid #ccc;border-radius:var(--radius);}
.profile-form img{width:80px;height:80px;border-radius:50%;object-fit:cover;}
.profile-status{margin-top:6px;font-size:14px;color:var(--primary);}
</style>
</head>
<body>
<div class="app-layout">
  <aside class="sidebar">
    <h2 class="logo">GuideRénov</h2>
    <nav>
      <ul>
        <li data-page="home" class="active"><i>🏠</i>Accueil</li>
        <li data-page="projects"><i>📂</i>Projets</li>
        <li data-page="ai"><i>🤖</i>Assistant IA</li>
        <li data-page="profile"><i>👤</i>Profil</li>
      </ul>
    </nav>
    <div class="credit">© 2025 GuideRénov</div>
  </aside>

  <main class="content">
    <!-- Accueil -->
    <section id="home" class="page active">
      <h1>Bienvenue sur GuideRénov</h1>
      <p>Votre assistant pour gérer vos projets travaux et obtenir des conseils experts.</p>
    </section>

    <!-- Projets -->
    <section id="projects" class="page">
      <h1>Mes Projets</h1>
      <div class="grid" id="projectsGrid">
        <!-- Les 75 projets seront injectés ici via JS -->
      </div>
    </section>

    <!-- Assistant IA -->
    <section id="ai" class="page">
      <h1>Assistant IA</h1>
      <div class="chat-box">
        <div id="chatMessages">
          <div class="bot message">Bonjour ! Je suis votre assistant travaux. Posez-moi vos questions ou demandez un guide.</div>
        </div>
        <input id="chatInput" type="text" placeholder="Écris ici et appuie sur Entrée...">
      </div>
    </section>

    <!-- Profil -->
    <section id="profile" class="page">
      <h1>Profil</h1>
      <div class="profile-form">
        <label>Nom : <input id="username" placeholder="Votre nom"></label>
        <label>Email : <input id="email" placeholder="email@example.com"></label>
        <label>Photo : <input id="photo" placeholder="URL de l'image"></label>
        <button id="saveProfile">Sauvegarder</button>
        <p class="profile-status" id="profileStatus"></p>
      </div>
    </section>
  </main>
</div>

<script>
// Navigation
document.querySelectorAll('.sidebar li').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.sidebar li.active')?.classList.remove('active');
    item.classList.add('active');
    const page = item.getAttribute('data-page');
    document.querySelector('.page.active')?.classList.remove('active');
    document.getElementById(page).classList.add('active');
  });
});

// Mes Projets - génération automatique des 75 projets
const projects = [];
for(let i=1;i<=75;i++){
  projects.push({
    title:`Projet ${i}`,
    description:`Guide détaillé pour réaliser le projet ${i}. Étapes, matériaux et conseils professionnels inclus.`,
    image:`https://picsum.photos/seed/projet${i}/300/200`
  });
}

const projectsGrid = document.getElementById('projectsGrid');
projects.forEach(proj=>{
  const card = document.createElement('div');
  card.className='card';
  card.innerHTML=`<img src="${proj.image}" alt="${proj.title}"><h3>${proj.title}</h3><p>${proj.description}</p>`;
  projectsGrid.appendChild(card);
});

// Assistant IA simple avec réponses préprogrammées
const chatInput=document.getElementById('chatInput');
const chatMessages=document.getElementById('chatMessages');
const responses=[
  "Bien sûr ! Pour ce projet, vous aurez besoin de planches, vis et peinture.",
  "Le temps estimé pour terminer cette tâche est de 3 à 5 jours selon votre expérience.",
  "Pour la sécurité, portez toujours des gants et un masque de protection.",
  "Vous pouvez trouver les matériaux recommandés dans les magasins de bricolage locaux.",
  "Je vous conseille de commencer par les étapes les plus complexes.",
  "N'oubliez pas de vérifier vos mesures avant de couper le bois.",
  "Pour peindre efficacement, utilisez des rouleaux et pinceaux adaptés.",
  "Le nettoyage après travaux est crucial pour conserver vos outils.",
  "En cas de doute, consultez les guides de fabricants ou des tutoriels vidéo.",
  "Organisez vos outils avant de commencer pour gagner du temps."
];

chatInput.addEventListener('keydown',e=>{
  if(e.key==='Enter' && chatInput.value.trim()!==''){
    const userMsg=chatInput.value.trim();
    const userDiv=document.createElement('div');
    userDiv.className='message user';
    userDiv.textContent=userMsg;
    chatMessages.appendChild(userDiv);
    chatInput.value='';

    // réponse simulée
    setTimeout(()=>{
      const botDiv=document.createElement('div');
      botDiv.className='message bot';
      botDiv.textContent=responses[Math.floor(Math.random()*responses.length)];
      chatMessages.appendChild(botDiv);
      chatMessages.scrollTop=chatMessages.scrollHeight;
    },600);
    chatMessages.scrollTop=chatMessages.scrollHeight;
  }
});

// Profil
document.getElementById('saveProfile').addEventListener('click',()=>{
  const name=document.getElementById('username').value;
  const email=document.getElementById('email').value;
  const photo=document.getElementById('photo').value;
  if(name && email){
    localStorage.setItem('profile',JSON.stringify({name,email,photo}));
    document.getElementById('profileStatus').textContent='Profil sauvegardé !';
  }else{
    document.getElementById('profileStatus').textContent='Veuillez remplir nom et email.';
  }
});

// Chargement profil existant
window.addEventListener('load',()=>{
  const savedProfile=JSON.parse(localStorage.getItem('profile'));
  if(savedProfile){
    document.getElementById('username').value=savedProfile.name;
    document.getElementById('email').value=savedProfile.email;
    document.getElementById('photo').value=savedProfile.photo;
  }
});
</script>
</body>
</html>
