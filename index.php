<?php
$projectsPath = __DIR__ . '/data/projects.json';
$projects = [];
if (file_exists($projectsPath)) {
    $raw = file_get_contents($projectsPath);
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $projects = $decoded;
    }
}
$buildTime = date('Y-m-d H:i:s');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Raptor Nexus | Dynamic Local Experience</title>
    <meta name="description" content="A dynamic and visually attractive locally-hostable XAMPP-ready website." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/styles.css" />
</head>
<body>
    <canvas id="bg-canvas" aria-hidden="true"></canvas>
    <header class="glass nav-wrap">
        <div class="brand">🦖 Raptor Nexus</div>
        <nav>
            <a href="#features">Features</a>
            <a href="#projects">Projects</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#contact">Contact</a>
        </nav>
        <button id="theme-toggle" class="btn small" aria-label="Toggle dark mode">🌓</button>
    </header>

    <main>
        <section class="hero glass">
            <p class="badge">XAMPP-READY • PHP + JS</p>
            <h1>Build. Animate. Control.<br><span id="typed-text"></span></h1>
            <p>Locally hosted, beautifully designed, and full of interactions.
                This page is generated with PHP and enhanced with dynamic JavaScript modules.</p>
            <div class="hero-cta">
                <a href="#projects" class="btn">Explore Live Projects</a>
                <a href="#dashboard" class="btn ghost">Open Dashboard</a>
            </div>
            <div class="metrics">
                <article><h3 id="count-projects">0</h3><p>Projects</p></article>
                <article><h3 id="count-users">0</h3><p>Active Users</p></article>
                <article><h3 id="count-score">0</h3><p>Performance Score</p></article>
            </div>
        </section>

        <section id="features" class="panel">
            <h2>Dynamic Features</h2>
            <div class="grid cards">
                <article class="card glow"><h3>Realtime Clock</h3><p id="clock">--:--:--</p></article>
                <article class="card glow"><h3>System Health</h3><p><span id="health">Initializing...</span></p></article>
                <article class="card glow"><h3>Build Timestamp</h3><p><?= htmlspecialchars($buildTime) ?></p></article>
                <article class="card glow"><h3>Local Storage Notes</h3><p>Keep notes in your browser instantly.</p></article>
            </div>
        </section>

        <section id="projects" class="panel">
            <div class="row between center">
                <h2>Project Explorer</h2>
                <select id="category-filter" class="select">
                    <option value="all">All Categories</option>
                </select>
            </div>
            <div id="project-grid" class="grid projects" data-projects='<?= json_encode($projects, JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_TAG) ?>'>
            </div>
        </section>

        <section id="dashboard" class="panel glass">
            <h2>Control Dashboard</h2>
            <div class="dashboard">
                <div class="widget">
                    <h3>Focus Timer</h3>
                    <p id="timer">25:00</p>
                    <div class="row">
                        <button class="btn small" id="start-timer">Start</button>
                        <button class="btn small ghost" id="reset-timer">Reset</button>
                    </div>
                </div>
                <div class="widget">
                    <h3>Quick Notes</h3>
                    <textarea id="notes" rows="6" placeholder="Write and auto-save local notes..."></textarea>
                </div>
                <div class="widget">
                    <h3>Live API (Local PHP)</h3>
                    <pre id="api-output">Loading...</pre>
                </div>
            </div>
        </section>

        <section id="contact" class="panel">
            <h2>Contact Launcher</h2>
            <form class="contact" onsubmit="return false;">
                <input type="text" id="name" placeholder="Your name" required>
                <input type="email" id="email" placeholder="Your email" required>
                <textarea id="message" rows="4" placeholder="Your message"></textarea>
                <button class="btn" id="fake-send">Send Message</button>
                <p id="form-status" aria-live="polite"></p>
            </form>
        </section>
    </main>

    <footer>
        <p>© <?= date('Y') ?> Raptor Nexus • Crafted for high-impact local hosting on XAMPP.</p>
    </footer>

    <script src="assets/script.js"></script>
</body>
</html>
