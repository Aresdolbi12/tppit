<?php
declare(strict_types=1);

/**
 * tppit.ru — сервисы ТПП Краснодарского края.
 * Точка инициализации: конфиг, БД, роутер.
 */

define('APP_ROOT', __DIR__);
define('IS_SERVER', is_dir('/home/delenergo'));   // боевой хостинг nichost

require APP_ROOT . '/config.php';
require APP_ROOT . '/db.php';

// Базовые заголовки безопасности (nginx у nichost их не добавляет)
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');

/** Экранирование для HTML-вывода */
function e(?string $s): string
{
    return htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8');
}

/** Рендер страницы в общем макете */
function render(string $page, array $vars = []): void
{
    $vars['page'] = $page;
    extract($vars, EXTR_SKIP);
    require APP_ROOT . '/views/layout.php';
}
