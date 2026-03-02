const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const typedText = document.getElementById('typed-text');
const phrases = ['Dynamic local web apps.', 'Interactive dashboards.', 'Beautiful visual experiences.'];
let phraseIdx = 0;
let charIdx = 0;
let reverse = false;

function typeLoop() {
  const phrase = phrases[phraseIdx];
  typedText.textContent = phrase.slice(0, charIdx);
  if (!reverse) charIdx++; else charIdx--;
  if (charIdx === phrase.length + 1) { reverse = true; }
  if (charIdx === 0 && reverse) { reverse = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  setTimeout(typeLoop, reverse ? 45 : 85);
}

function initTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light') root.classList.add('light');
  themeToggle.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
}

function animateCounters() {
  const targets = { 'count-projects': 12, 'count-users': 280, 'count-score': 98 };
  Object.entries(targets).forEach(([id, target]) => {
    const el = document.getElementById(id);
    let n = 0;
    const step = Math.ceil(target / 50);
    const iv = setInterval(() => {
      n += step;
      el.textContent = Math.min(n, target);
      if (n >= target) clearInterval(iv);
    }, 20);
  });
}

function initClockAndHealth() {
  const clock = document.getElementById('clock');
  const health = document.getElementById('health');
  setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
    const score = 94 + Math.round(Math.random() * 6);
    health.textContent = `Optimal (${score}%)`;
  }, 1000);
}

function renderProjects() {
  const grid = document.getElementById('project-grid');
  const projects = JSON.parse(grid.dataset.projects || '[]');
  const filter = document.getElementById('category-filter');
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c[0].toUpperCase() + c.slice(1);
    filter.appendChild(opt);
  });

  const paint = () => {
    const selected = filter.value;
    const list = selected === 'all' ? projects : projects.filter(p => p.category === selected);
    grid.innerHTML = list.map(p => `
      <article class="card">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <small>Category: ${p.category} • Status: ${p.status}</small>
      </article>
    `).join('');
  };

  filter.addEventListener('change', paint);
  paint();
}

function initTimer() {
  const timerEl = document.getElementById('timer');
  let total = 25 * 60;
  let interval;
  const draw = () => {
    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
  };
  document.getElementById('start-timer').addEventListener('click', () => {
    if (interval) return;
    interval = setInterval(() => {
      if (total > 0) total--;
      draw();
      if (total === 0) clearInterval(interval);
    }, 1000);
  });
  document.getElementById('reset-timer').addEventListener('click', () => {
    clearInterval(interval); interval = null; total = 25 * 60; draw();
  });
  draw();
}

function initNotes() {
  const notes = document.getElementById('notes');
  notes.value = localStorage.getItem('notes') || '';
  notes.addEventListener('input', () => localStorage.setItem('notes', notes.value));
}

async function loadApi() {
  const out = document.getElementById('api-output');
  try {
    const res = await fetch('api.php');
    const json = await res.json();
    out.textContent = JSON.stringify(json, null, 2);
  } catch {
    out.textContent = 'Unable to load local API. Ensure PHP server is running.';
  }
}

function initFakeForm() {
  document.getElementById('fake-send').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const status = document.getElementById('form-status');
    if (!name || !email) {
      status.textContent = 'Please fill in required fields.';
      return;
    }
    status.textContent = `Thanks ${name}! Demo message staged for ${email}.`;
  });
}

function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: Math.min(100, Math.floor(window.innerWidth / 14)) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.7,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(110, 231, 255, 0.65)';
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };

  window.addEventListener('resize', resize);
  resize();
  draw();
}

typeLoop();
initTheme();
animateCounters();
initClockAndHealth();
renderProjects();
initTimer();
initNotes();
loadApi();
initFakeForm();
initParticles();
