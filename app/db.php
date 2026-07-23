<?php
declare(strict_types=1);

/**
 * Доступ к реестру штрих-кодов.
 * На сервере — MySQL (таблица codes, cp1251, конвертация в UTF-8 на стороне MySQL).
 * Локально (нет secrets.php) — выборка sample/codes.json для превью.
 */

function db(): ?mysqli
{
    static $link = null, $tried = false;
    if ($tried) {
        return $link;
    }
    $tried = true;
    if (!defined('DB_HOST')) {
        return null; // локальный режим
    }
    mysqli_report(MYSQLI_REPORT_OFF);
    $m = mysqli_init();
    $m->options(MYSQLI_OPT_CONNECT_TIMEOUT, 4);
    if (!@$m->real_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME)) {
        error_log('tppit: DB connect failed: ' . mysqli_connect_error());
        return null;
    }
    $m->set_charset('utf8'); // данные в cp1251 — MySQL отдаёт их в UTF-8 сам
    return $link = $m;
}

/** Нормализация: оставить только цифры */
function digits(string $s): string
{
    return preg_replace('/\D+/', '', $s) ?? '';
}

function sample_rows(): array
{
    static $rows = null;
    if ($rows === null) {
        $f = dirname(APP_ROOT) . '/sample/codes.json';
        $rows = is_file($f) ? (json_decode((string)file_get_contents($f), true) ?: []) : [];
    }
    return $rows;
}

/** @return array<int,array<string,string>> найденные записи */
function find_by_code(string $code): array
{
    $code = digits($code);
    if ($code === '') {
        return [];
    }
    if ($db = db()) {
        $st = $db->prepare('SELECT inn, code, product, weight, package, organisation, adress, phone, `e-mail` AS email FROM codes WHERE code = ?');
        $st->bind_param('s', $code);
        $st->execute();
        return $st->get_result()->fetch_all(MYSQLI_ASSOC);
    }
    return array_values(array_filter(sample_rows(), fn($r) => $r['code'] === $code));
}

/** @return array<int,array<string,string>> все коды организации */
function find_by_inn(string $inn): array
{
    $inn = digits($inn);
    if ($inn === '') {
        return [];
    }
    if ($db = db()) {
        $st = $db->prepare('SELECT inn, code, product, weight, package, organisation, adress, phone, `e-mail` AS email FROM codes WHERE inn = ? ORDER BY code');
        $st->bind_param('s', $inn);
        $st->execute();
        return $st->get_result()->fetch_all(MYSQLI_ASSOC);
    }
    return array_values(array_filter(sample_rows(), fn($r) => $r['inn'] === $inn));
}

/** Количество кодов в реестре (кэш на 6 часов — для витрины) */
function codes_count(): int
{
    $cache = sys_get_temp_dir() . '/tppit-codes-count';
    if (is_file($cache) && filemtime($cache) > time() - 6 * 3600) {
        return (int)file_get_contents($cache);
    }
    $n = 31650; // последнее известное значение — фолбэк
    if ($db = db()) {
        if ($res = $db->query('SELECT COUNT(*) c FROM codes')) {
            $n = (int)$res->fetch_assoc()['c'];
        }
    } elseif (sample_rows()) {
        $n = 31650;
    }
    @file_put_contents($cache, (string)$n);
    return $n;
}
