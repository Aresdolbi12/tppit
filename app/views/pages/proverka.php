<?php
$code = digits((string)($_GET['code'] ?? ''));
$inn  = digits((string)($_GET['inn'] ?? ''));
$rows = null;
$mode = null;
if ($code !== '') {
    $mode = 'code';
    $rows = find_by_code($code);
} elseif ($inn !== '') {
    $mode = 'inn';
    $rows = find_by_inn($inn);
}
?>
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Реестр ИСАИ ТПП КК</p>
    <h1>Проверка штрих-кода</h1>
    <p class="lead">Бесплатная проверка регистрации в реестре Торгово-промышленной
      палаты Краснодарского края — по номеру кода или по ИНН организации.</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <?php require APP_ROOT . '/views/partials/check-card.php'; ?>

    <?php if ($mode === 'code'): ?>
      <div class="result" aria-live="polite">
        <?php if ($rows): $r = $rows[0]; ?>
          <div class="passport">
            <div class="stamp" aria-hidden="true">Реестр<b>ИСАИ ТПП КК</b>зарегистрирован</div>
            <div class="bc" data-barcode="<?= e($r['code']) ?>"></div>
            <dl>
              <dt>Штрих-код</dt><dd class="num"><?= e($r['code']) ?></dd>
              <dt>Наименование товара</dt><dd><?= e($r['product']) ?></dd>
              <dt>Вес</dt><dd><?= e($r['weight']) ?></dd>
              <dt>Вид упаковки</dt><dd><?= e($r['package']) ?></dd>
              <dt>Организация</dt><dd><?= e($r['organisation']) ?></dd>
              <dt>ИНН</dt><dd class="num"><a href="/proverka?inn=<?= e($r['inn']) ?>"><?= e($r['inn']) ?></a></dd>
              <dt>Адрес</dt><dd><?= e($r['adress']) ?></dd>
              <?php if (trim($r['phone'])): ?><dt>Телефон</dt><dd><?= e($r['phone']) ?></dd><?php endif; ?>
              <?php if (trim($r['email'])): ?><dt>E-mail</dt><dd><?= e($r['email']) ?></dd><?php endif; ?>
            </dl>
          </div>
        <?php else: ?>
          <div class="not-found">
            <h3>Код <?= e($code) ?> в реестре не найден</h3>
            <p>Этот номер не зарегистрирован в реестре ТПП Краснодарского края.
              Проверьте, нет ли опечатки в номере.</p>
            <p>Код могла выдать другая организация (например, ГС1 РУС) — реестры не объединены.</p>
          </div>
        <?php endif; ?>
      </div>

    <?php elseif ($mode === 'inn'): ?>
      <div class="result" aria-live="polite">
        <?php if ($rows): ?>
          <div class="org-head">
            <h3><?= e($rows[0]['organisation']) ?></h3>
            <p>ИНН <?= e($inn) ?> · зарегистрировано кодов: <?= count($rows) ?></p>
          </div>
          <div class="table-scroll">
            <table class="codes">
              <thead>
                <tr><th>Штрих-код</th><th>Товар</th><th>Вес</th><th>Упаковка</th></tr>
              </thead>
              <tbody>
                <?php foreach ($rows as $r): ?>
                  <tr>
                    <td class="num"><a href="/proverka?code=<?= e($r['code']) ?>"><?= e($r['code']) ?></a></td>
                    <td><?= e($r['product']) ?></td>
                    <td><?= e($r['weight']) ?></td>
                    <td><?= e($r['package']) ?></td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        <?php else: ?>
          <div class="not-found">
            <h3>По ИНН <?= e($inn) ?> ничего не найдено</h3>
            <p>На эту организацию в реестре ТПП Краснодарского края коды не зарегистрированы.</p>
            <p><a href="/uslugi/shtrih-kody">Как зарегистрировать штрих-коды →</a></p>
          </div>
        <?php endif; ?>
      </div>
    <?php endif; ?>

    <div class="cta-strip">
      <p><strong>Нет своих штрих-кодов?</strong> Палата присвоит уникальные номера,
        подготовит макеты и выдаст свидетельство за 1–2 дня.</p>
      <a class="btn" href="/uslugi/shtrih-kody">Получить штрих-коды</a>
    </div>
  </div>
</section>
