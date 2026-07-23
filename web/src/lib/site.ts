/* Константы организации (сверено с kuban.tpprf.ru 2026-07-23). */

export const ORG_FULL = 'Союз «Торгово-промышленная палата Краснодарского края»'
export const ORG_SLOGAN = 'Надежность и компетентность!'
export const ORG_ADDRESS = 'г. Краснодар, ул. Трамвайная, 2/6'
export const ORG_PHONE = '+7 (861) 992-03-27'
export const ORG_EMAIL = 'tppkk@tppkuban.ru'
export const PARENT_SITE = 'https://kuban.tpprf.ru'

export const PHONES = ['+7 (928) 257-38-20', '+7 (861) 992-03-42']
export const WHATSAPP_PHONE = '+7 (928) 257-38-20'
export const TELEGRAM_URL = 'https://t.me/ares_dolbi12'
export const SERVICE_EMAIL = 'arz@tppkuban.ru'
export const EXPERT = 'Киян Владислав Витальевич'

export const tel = (s: string) => 'tel:' + s.replace(/[^\d+]/g, '')

/* Витрина услуг палаты — навигатор на основной сайт. */
export interface ChamberService {
  title: string
  desc: string
  url: string
}

/* URL проверены по меню kuban.tpprf.ru 2026-07-23 */
export const CHAMBER_SERVICES: ChamberService[] = [
  { title: 'Экспертиза', desc: 'Товарная экспертиза: качество, количество, комплектность — авторитетное подтверждение при спорах и ВЭД', url: PARENT_SITE + '/ru/services/ekspertiza-s251/' },
  { title: 'Сертификация', desc: 'Сертификаты происхождения товаров (СТ-1) и подтверждение соответствия продукции', url: PARENT_SITE + '/ru/services/sertifikatsiya-s283/' },
  { title: 'Оценка', desc: 'Оценка недвижимости, оборудования, транспорта, земли, бизнеса и интеллектуальной собственности', url: PARENT_SITE + '/ru/services/otsenka-s287/' },
  { title: 'Переводы', desc: 'Устные и письменные переводы практически на все языки мира', url: PARENT_SITE + '/ru/services/31383/' },
  { title: 'Интеллектуальная собственность', desc: 'Правовая охрана и защита: товарные знаки, патенты, авторские права', url: PARENT_SITE + '/ru/services/pravovaya_okhrana_i_zashchita_intellektualnoy_sobstvennosti-s297/' },
  { title: 'Юридические услуги', desc: 'Правовое консультирование и обслуживание предприятий, медиация, третейское разбирательство', url: PARENT_SITE + '/ru/services/yuridicheskie_uslugi-s307/' },
  { title: 'Поддержка ВЭД', desc: 'Поиск зарубежных партнёров, бизнес-миссии, карты АТЭС, внешнеэкономическое сопровождение', url: PARENT_SITE + '/ru/services/podderzhka_vneshneekonomicheskoy_deyatelnosti-s475/' },
  { title: 'Организация мероприятий', desc: 'Выставки, конгрессы, деловые встречи и патронаж палаты', url: PARENT_SITE + '/ru/services/vystavki_kongressy_patronazh-s269/' },
  { title: 'Проверка деловых партнёров', desc: 'Информация о контрагентах в России и за рубежом, поиск партнёров', url: PARENT_SITE + '/ru/services/informatsionno_konsultatsionnye_uslugi-s302/' },
  { title: 'Деловое образование', desc: 'Центр делового образования: семинары, вебинары, повышение квалификации', url: PARENT_SITE + '/ru/tsentr-delovogo-obrazovaniya/' },
  { title: 'Реестр надёжных партнёров', desc: 'Негосударственный реестр надёжных юрлиц и ИП, который ведёт система ТПП', url: PARENT_SITE + '/ru/reestr-nadezhnykh-partnerov' },
  { title: 'Аренда залов и офисов', desc: 'Конференц-залы, переговорные и офисы в БЦ «Меркурий»', url: PARENT_SITE + '/ru/arenda-konferents-zalov' },
]
