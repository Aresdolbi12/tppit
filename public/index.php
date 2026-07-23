<?php
declare(strict_types=1);

require __DIR__ . '/../app/bootstrap.php';

$path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/', '/');

// Легаси-URL старой Joomla → новые адреса (постоянные редиректы)
$legacy = [
    'codes/codes.php' => '/proverka',
    'inn/inn.php'     => '/proverka',
];
if (isset($legacy[$path])) {
    $q = '';
    if (isset($_GET['code'])) {
        $q = '?code=' . urlencode((string)$_GET['code']);
    } elseif (isset($_GET['INN'])) {
        $q = '?inn=' . urlencode((string)$_GET['INN']);
    }
    header('Location: ' . $legacy[$path] . $q, true, 301);
    exit;
}

$routes = [
    ''                    => ['home',              'Проверка и регистрация штрих-кодов'],
    'proverka'            => ['proverka',          'Проверка штрих-кода'],
    'uslugi'              => ['uslugi',            'Услуги'],
    'uslugi/shtrih-kody'  => ['uslugi-shtrih-kody','Регистрация штрих-кодов'],
    'uslugi/trebovaniya'  => ['uslugi-trebovaniya','Требования к штрих-коду: размеры и цвета'],
    'uslugi/ecp'          => ['uslugi-ecp',        'Электронная подпись (УКЭП)'],
    'o-palate'            => ['o-palate',          'О палате'],
    'normativka'          => ['normativka',        'Нормативно-правовая база'],
    'kontakty'            => ['kontakty',          'Контакты'],
];

if (isset($routes[$path])) {
    [$page, $title] = $routes[$path];
    render($page, ['title' => $title]);
} else {
    http_response_code(404);
    render('404', ['title' => 'Страница не найдена']);
}
