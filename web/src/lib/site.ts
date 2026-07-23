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

export const CHAMBER_SERVICES: ChamberService[] = [
  { title: 'Экспертиза', desc: 'Товарная, судебная и таможенная экспертиза', url: PARENT_SITE + '/ru/services/' },
  { title: 'Сертификация', desc: 'Сертификаты происхождения, СТ-1, форс-мажор', url: PARENT_SITE + '/ru/services/' },
  { title: 'Оценка', desc: 'Оценка имущества, бизнеса и активов', url: PARENT_SITE + '/ru/services/' },
  { title: 'Переводы', desc: 'Письменные и устные переводы с заверением', url: PARENT_SITE + '/ru/services/' },
  { title: 'Юридические услуги', desc: 'Правовая поддержка бизнеса, МКАС', url: PARENT_SITE + '/ru/services/' },
  { title: 'ВЭД', desc: 'Поддержка внешнеэкономической деятельности', url: PARENT_SITE + '/ru/services/' },
  { title: 'Деловое образование', desc: 'Семинары, вебинары, подготовка кадров', url: PARENT_SITE + '/ru/services/' },
  { title: 'Выставки и конгрессы', desc: 'Конгресс-центр, бизнес-миссии, патронаж', url: PARENT_SITE + '/ru/services/' },
]
