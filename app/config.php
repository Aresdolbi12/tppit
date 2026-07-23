<?php
declare(strict_types=1);

// Параметры БД реестра штрих-кодов задаются в app/secrets.php,
// который существует ТОЛЬКО на сервере (создаётся при деплое, в репозиторий не входит).
// Локально secrets.php нет — приложение работает на выборке sample/codes.json.
if (is_file(APP_ROOT . '/secrets.php')) {
    require APP_ROOT . '/secrets.php';   // задаёт DB_HOST, DB_NAME, DB_USER, DB_PASS
}

const SITE_NAME    = 'ТПП Краснодарского края';
const SITE_TAGLINE = 'Сервис штрихового кодирования';

// Организация (данные с kuban.tpprf.ru, сверено 2026-07-23)
const ORG_FULL    = 'Союз «Торгово-промышленная палата Краснодарского края»';
const ORG_SLOGAN  = 'Надежность и компетентность!';
const ORG_ADDRESS = 'РФ, Краснодарский край, г. Краснодар, ул. Трамвайная, 2/6';
const ORG_PHONE   = '+7 (861) 992-03-27';
const ORG_EMAIL   = 'tppkk@tppkuban.ru';
const PARENT_SITE = 'https://kuban.tpprf.ru';

// Услуга штрихового кодирования (kuban.tpprf.ru/ru/services/42032)
const CONTACT_PHONES   = ['+7 (928) 257-38-20', '+7 (861) 992-03-42'];
const CONTACT_WHATSAPP = '+7 (928) 257-38-20';
const CONTACT_TG       = 'https://t.me/ares_dolbi12';
const CONTACT_EMAIL    = 'arz@tppkuban.ru';
const EXPERT_NAME      = 'Киян Владислав Витальевич';
