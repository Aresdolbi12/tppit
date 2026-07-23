<?php $n = codes_count(); ?>
<section class="hero">
  <div class="wrap">
    <div>
      <p class="eyebrow">Реестр ИСАИ ТПП КК · <?= number_format($n, 0, '', ' ') ?> кодов · работаем по всей России</p>
      <h1>Регистрация и присвоение штриховых кодов</h1>
      <p class="lead"><?= e(ORG_FULL) ?> присваивает штрих-коды EAN-13 и ITF-14
        на продукцию заказчика и регистрирует их в интеллектуальной системе
        автоматической идентификации. На каждый код выдаётся свидетельство
        о регистрации. Цена — от 4 ₽ за штрих-код.</p>
      <?php $active = 'code'; require APP_ROOT . '/views/partials/check-card.php'; ?>
    </div>
    <div class="barcode-live" aria-hidden="true">
      <div data-barcode-live></div>
      <p class="barcode-caption" data-barcode-caption></p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Услуги</p>
      <h2>Что делает палата</h2>
    </div>
    <div class="cards">
      <a class="card" href="/uslugi/shtrih-kody">
        <span class="tag">EAN-13 · ITF-14</span>
        <h3>Регистрация штрих-кодов</h3>
        <p>Присвоение уникального номера в реестре ИСАИ ТПП КК, оригинал-макеты
          в любом графическом формате и свидетельство о регистрации. Срок — 1–2 дня.</p>
        <span class="more">Как получить коды →</span>
      </a>
      <a class="card" href="/proverka">
        <span class="tag">Онлайн · бесплатно</span>
        <h3>Проверка штрих-кода</h3>
        <p>Проверьте, зарегистрирован ли код в реестре палаты: по номеру кода
          или по ИНН организации-производителя.</p>
        <span class="more">Проверить →</span>
      </a>
      <a class="card" href="/uslugi/ecp">
        <span class="tag">СЦ Контур</span>
        <h3>Электронная подпись</h3>
        <p>ТПП КК — сервисный центр Контура: выпуск квалифицированной электронной
          подписи для физических лиц и сотрудников организаций.</p>
        <span class="more">Подробнее →</span>
      </a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Порядок работы</p>
      <h2>Как получить штрих-коды</h2>
    </div>
    <div class="steps">
      <div class="step">
        <h3>Выберите тариф</h3>
        <p>Стоимость зависит от количества позиций — смотрите действующий прайс
          или уточните по телефону.</p>
      </div>
      <div class="step">
        <h3>Отправьте заявку</h3>
        <p>Заполненная форма со списком продукции — на почту
          <?= e(CONTACT_EMAIL) ?>. Шаблон заявки — на странице услуги.</p>
      </div>
      <div class="step">
        <h3>Получите коды и свидетельство</h3>
        <p>Через 1–2 дня — уникальные номера, оригинал-макеты в нужном формате
          и свидетельство о регистрации в реестре.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">О палате</p>
      <h2>Союз «ТПП Краснодарского края»</h2>
      <p>Координирующий центр системы торгово-промышленных палат Кубани.
        История — с Екатеринодарского биржевого общества 1909 года.</p>
    </div>
    <div class="facts">
      <div class="fact"><b>32</b><span>палаты в краевой системе</span></div>
      <div class="fact"><b>5 200+</b><span>предприятий и организаций</span></div>
      <div class="fact"><b><?= number_format($n, 0, '', ' ') ?></b><span>штрих-кодов в реестре</span></div>
      <div class="fact"><b>1909</b><span>год основания биржевого общества</span></div>
    </div>
  </div>
</section>
