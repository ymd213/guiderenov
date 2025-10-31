project/
├─ backend/
│  ├─ server.js
│  ├─ ai_estimator.js
│  └─ package.json
│
├─ frontend/
│  ├─ App.js
│  ├─ package.json
│  ├─ components/
│  │   ├─ SearchBar.js
│  │   └─ WorkSteps.js
│  ├─ images/       ← (sera rempli automatiquement)
│  └─ models/       ← (sera rempli automatiquement)
│
├─ database/
│  └─ works.json
│
├─ generate_assets.js
└─ README.md
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "express": "^4.18.2",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5"
  }
}
const works = require('../database/works.json');

function estimateWork(workName, hasTools = true) {
  const work = works.works.find(
    w => w.name.toLowerCase() === workName.toLowerCase()
  );
  if (!work) return { error: "Travail non trouvé" };
  const cost = hasTools ? work.cost_normal : work.cost_with_tools;
  return {
    name: work.name,
    description: work.description,
    tools: work.tools,
    materials: work.materials,
    estimated_cost: cost,
    steps: work.steps
  };
}

module.exports = { estimateWork };
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { estimateWork } = require('./ai_estimator');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/estimate', (req, res) => {
  const { workName, hasTools } = req.body;
  const result = estimateWork(workName, hasTools);
  res.json(result);
});

app.listen(3000, () => console.log('✅ Serveur en cours d’exécution sur le port 3000'));
{
  "works": [
    {
      "name": "Installation prise 4 voies",
      "description": "Installation complète d'une prise électrique 4 voies.",
      "tools": ["Tournevis", "Pince coupante", "Gaine isolante", "Testeur de tension"],
      "materials": ["Boîte d'encastrement", "Prise 4 voies", "Câble électrique"],
      "cost_normal": 25,
      "cost_with_tools": 70,
      "steps": [
        { "title": "Préparation", "description": "Coupez le courant et marquez l'emplacement.", "image": "prep_2D.png", "3D_model": "prep_3D.glb" },
        { "title": "Installation de la boîte", "description": "Percez et insérez la boîte.", "image": "box_2D.png", "3D_model": "box_3D.glb" },
        { "title": "Câblage", "description": "Branchez les fils selon le code couleur.", "image": "wiring_2D.png", "3D_model": "wiring_3D.glb" },
        { "title": "Fixation", "description": "Fixez la prise et vérifiez les fils.", "image": "fix_2D.png", "3D_model": "fix_3D.glb" },
        { "title": "Test final", "description": "Remettez le courant et testez la prise.", "image": "test_2D.png", "3D_model": "test_3D.glb" }
      ]
    }
  ]
}
{
  "name": "frontend",
  "version": "1.0.0",
  "main": "App.js",
  "scripts": { "start": "react-scripts start" },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1"
  }
}
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WorkSteps from './components/WorkSteps';

export default function App() {
  const [work, setWork] = useState(null);

  const searchWork = async (workName) => {
    const res = await fetch('http://localhost:3000/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workName, hasTools: false })
    });
    const data = await res.json();
    setWork(data.error ? null : data);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛠️ Estimation de Travaux</h1>
      <SearchBar onSearch={searchWork} />
      {work && <WorkSteps work={work} />}
    </div>
  );
}
import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Cherchez un travail..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: '8px', width: '300px', marginRight: '10px' }}
      />
      <button onClick={() => onSearch(query)} style={{ padding: '8px' }}>
        Rechercher
      </button>
    </div>
  );
}
import React, { useState } from 'react';

export default function WorkSteps({ work }) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = work.steps[currentStep];

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>{step.title}</h2>
      <p>{step.description}</p>
      <img
        src={`./images/${step.image}`}
        alt={step.title}
        style={{ maxWidth: '400px', marginBottom: '10px' }}
      />
      <div
        style={{
          width: '400px',
          height: '300px',
          background: '#eee',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px'
        }}
      >
        <p>3D model: {step['3D_model']}</p>
      </div>
      <div>
        {currentStep > 0 && (
          <button onClick={() => setCurrentStep(currentStep - 1)}>◀ Précédent</button>
        )}
        {currentStep < work.steps.length - 1 && (
          <button onClick={() => setCurrentStep(currentStep + 1)}>Suivant ▶</button>
        )}
      </div>
    </div>
  );
}
const fs = require('fs');
const { createCanvas } = require('canvas');

const imageDir = './frontend/images';
const modelDir = './frontend/models';

fs.mkdirSync(imageDir, { recursive: true });
fs.mkdirSync(modelDir, { recursive: true });

const steps = [
  { name: 'prep', color: '#87CEEB', label: 'Préparation' },
  { name: 'box', color: '#90EE90', label: 'Boîte' },
  { name: 'wiring', color: '#FFD700', label: 'Câblage' },
  { name: 'fix', color: '#FFA500', label: 'Fixation' },
  { name: 'test', color: '#FF7F7F', label: 'Test final' }
];

function generateImage(filePath, color, text) {
  const canvas = createCanvas(400, 300);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 400, 300);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text, 200, 160);
  fs.writeFileSync(filePath, canvas.toBuffer('image/png'));
  console.log(`✅ Image créée : ${filePath}`);
}

function generateGLB(filePath) {
  const glb = {
    asset: { version: '2.0' },
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0 } }] }]
  };
  fs.writeFileSync(filePath, JSON.stringify(glb, null, 2));
  console.log(`✅ Modèle 3D créé : ${filePath}`);
}

steps.forEach(step => {
  generateImage(`${imageDir}/${step.name}_2D.png`, step.color, step.label);
  generateGLB(`${modelDir}/${step.name}_3D.glb`);
});

console.log('\n✨ Tous les fichiers fictifs ont été générés avec succès !');
# 🛠️ Application d’Estimation de Travaux

## ⚡ Fonctionnalités
- Recherche de travaux (ex: "Installation prise 4 voies")
- Estimation automatique des coûts
- Liste des outils et matériaux
- Étapes détaillées avec images 2D + modèles 3D fictifs
- Navigation étape par étape

---

## 🚀 Installation

### Backend
```bash
cd backend
npm install
npm start
cd frontend
npm install
npm start
npm install canvas
node generate_assets.js

---

👉 **Procédure finale :**
```bash
cd project
npm install canvas
node generate_assets.js
cd backend && npm install && npm start
cd ../frontend && npm install && npm start
