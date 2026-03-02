# Raptor-Nexus

A dynamic, visually attractive, locally hostable website built for XAMPP (PHP + JS + CSS).

## Features
- Glassmorphism UI with animated particle background.
- Dynamic typing hero text and animated counters.
- PHP-powered project catalog loaded from `data/projects.json`.
- Live local API panel (`api.php`) displaying server diagnostics.
- Realtime clock, health indicator, focus timer, and local notes persistence.
- Theme toggle (dark/light) with localStorage memory.

## Run on XAMPP
1. Copy this repository folder into your XAMPP `htdocs` directory.
2. Start **Apache** from XAMPP control panel.
3. Open: `http://localhost/Raptor-Nexus/`

## Local PHP CLI Preview (optional)
```bash
php -S 0.0.0.0:8000
```
Then open `http://localhost:8000/`.
