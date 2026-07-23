<?php
/** @var string $page  имя файла из views/pages */
/** @var string $title заголовок вкладки */
$nav = [
    '/proverka'           => 'Проверка кода',
    '/uslugi'             => 'Услуги',
    '/o-palate'           => 'О палате',
    '/normativka'         => 'Нормативная база',
    '/kontakty'           => 'Контакты',
];
$current = '/' . trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/', '/');
?>
<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($title) ?> — <?= e(SITE_NAME) ?></title>
<meta name="description" content="Регистрация и проверка штрих-кодов EAN-13 и ITF-14 в реестре Торгово-промышленной палаты Краснодарского края.">
<link rel="stylesheet" href="/assets/css/main.css">
<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
<script src="/assets/js/barcode.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">К содержанию</a>

<header class="site-header">
  <div class="brand-bar">
    <div class="wrap">
      <a class="logo" href="/" aria-label="<?= e(ORG_FULL) ?> — на главную">
        <img src="/assets/img/logo-tpp.svg" alt="" width="88" height="45">
        <span>
          <b>Торгово-промышленная палата Краснодарского края</b>
          <span><?= e(ORG_SLOGAN) ?></span>
        </span>
      </a>
      <div class="head-contacts">
        <?php foreach (CONTACT_PHONES as $ph): ?>
          <a href="tel:<?= e(preg_replace('/[^\d+]/', '', $ph)) ?>"><?= e($ph) ?></a>
        <?php endforeach; ?>
        <small>консультации по штрих-кодам</small>
      </div>
    </div>
  </div>
  <nav class="site-nav" aria-label="Основная навигация">
    <div class="wrap">
      <?php foreach ($nav as $href => $label): ?>
        <a href="<?= e($href) ?>"<?= ($current === $href || ($href !== '/' && str_starts_with($current, $href))) ? ' aria-current="page"' : '' ?>><?= e($label) ?></a>
      <?php endforeach; ?>
      <a class="ext" href="<?= e(PARENT_SITE) ?>" rel="noopener">kuban.tpprf.ru — основной сайт →</a>
    </div>
  </nav>
  <div class="sub-strip">
    <div class="wrap"><?= e(SITE_TAGLINE) ?> · Реестр ИСАИ ТПП КК</div>
  </div>
</header>

<main id="main">
  <?php require APP_ROOT . '/views/pages/' . basename($page) . '.php'; ?>
</main>

<footer class="site-footer">
  <div class="wrap">
    <div>
      <div class="footer-barcode" aria-hidden="true"></div>
      <h4>Палата</h4>
      <ul>
        <li><?= e(ORG_FULL) ?></li>
        <li><?= e(ORG_ADDRESS) ?></li>
        <li><a href="tel:<?= e(preg_replace('/[^\d+]/', '', ORG_PHONE)) ?>"><?= e(ORG_PHONE) ?></a></li>
        <li><a href="mailto:<?= e(ORG_EMAIL) ?>"><?= e(ORG_EMAIL) ?></a></li>
        <li><a href="<?= e(PARENT_SITE) ?>" rel="noopener">kuban.tpprf.ru — основной сайт палаты</a></li>
      </ul>
    </div>
    <div>
      <h4>Сервис</h4>
      <ul>
        <li><a href="/proverka">Проверить штрих-код</a></li>
        <li><a href="/uslugi/shtrih-kody">Получить штрих-коды</a></li>
        <li><a href="/uslugi/trebovaniya">Требования к коду</a></li>
        <li><a href="/normativka">Нормативная база</a></li>
      </ul>
    </div>
    <div>
      <h4>Штриховое кодирование</h4>
      <ul>
        <?php foreach (CONTACT_PHONES as $ph): ?>
          <li><a href="tel:<?= e(preg_replace('/[^\d+]/', '', $ph)) ?>"><?= e($ph) ?></a></li>
        <?php endforeach; ?>
        <li><a href="<?= e(CONTACT_TG) ?>" rel="noopener">Telegram</a> · WhatsApp: <?= e(CONTACT_WHATSAPP) ?></li>
        <li><a href="mailto:<?= e(CONTACT_EMAIL) ?>"><?= e(CONTACT_EMAIL) ?></a></li>
        <li>Эксперт — <?= e(EXPERT_NAME) ?></li>
      </ul>
    </div>
    <div class="legal">
      <span>© <?= date('Y') ?> <?= e(ORG_FULL) ?>. При использовании материалов сайта ссылка на источник обязательна.</span>
      <span>Реестр ИСАИ ТПП КК</span>
    </div>
  </div>
</footer>
</body>
</html>
