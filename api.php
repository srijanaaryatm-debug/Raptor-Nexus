<?php
header('Content-Type: application/json');

echo json_encode([
    'serverTime' => date('c'),
    'phpVersion' => phpversion(),
    'serverSoftware' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'uptimeHint' => 'Local dev mode active',
    'randomTip' => 'Deploy this folder into htdocs and open via http://localhost/Raptor-Nexus/'
], JSON_PRETTY_PRINT);
