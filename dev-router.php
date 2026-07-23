<?php
// Роутер для локального превью: php -S localhost:8123 dev-router.php
$file = __DIR__ . '/public' . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($file !== __DIR__ . '/public/' && is_file($file)) {
    return false; // статика — отдать как есть
}
require __DIR__ . '/public/index.php';
