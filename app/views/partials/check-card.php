<?php
/** Карточка проверки: вкладки «по номеру» / «по ИНН».
 *  $active — 'code'|'inn' (какая вкладка открыта) */
$active = $active ?? (isset($_GET['inn']) ? 'inn' : 'code');
?>
<div class="check-card">
  <div class="check-tabs" role="tablist" aria-label="Способ проверки">
    <button type="button" role="tab" id="tab-code" aria-controls="panel-code"
            aria-selected="<?= $active === 'code' ? 'true' : 'false' ?>">По номеру кода</button>
    <button type="button" role="tab" id="tab-inn" aria-controls="panel-inn"
            aria-selected="<?= $active === 'inn' ? 'true' : 'false' ?>">По ИНН организации</button>
  </div>

  <div id="panel-code" role="tabpanel" aria-labelledby="tab-code" <?= $active !== 'code' ? 'hidden' : '' ?>>
    <form class="check-form" method="get" action="/proverka">
      <label for="f-code">Номер штрих-кода — 13 цифр (EAN-13) или 14 (ITF-14)</label>
      <input type="text" id="f-code" name="code" inputmode="numeric" autocomplete="off"
             placeholder="4601234567893" maxlength="20" data-code-input
             value="<?= e((string)($_GET['code'] ?? '')) ?>">
      <button type="submit">Проверить</button>
      <p class="check-hint" data-code-hint data-default="Проверка бесплатна. Реестр обновляется при каждой регистрации."></p>
    </form>
  </div>

  <div id="panel-inn" role="tabpanel" aria-labelledby="tab-inn" <?= $active !== 'inn' ? 'hidden' : '' ?>>
    <form class="check-form" method="get" action="/proverka">
      <label for="f-inn">ИНН организации — 10 или 12 цифр</label>
      <input type="text" id="f-inn" name="inn" inputmode="numeric" autocomplete="off"
             placeholder="2309000000" maxlength="14"
             value="<?= e((string)($_GET['inn'] ?? '')) ?>">
      <button type="submit">Найти коды</button>
      <p class="check-hint">Покажем все штрих-коды, зарегистрированные на организацию.</p>
    </form>
  </div>
</div>
