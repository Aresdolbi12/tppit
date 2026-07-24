import { Link } from 'react-router-dom'
import {
  EXPERT, ORG_ADDRESS, ORG_EMAIL, ORG_FULL, ORG_PHONE,
  PARENT_SITE, PHONES, SERVICE_EMAIL, TELEGRAM_URL, tel,
} from '../lib/site'

export default function Footer() {
  return (
    <footer className="relative mt-28 border-t border-hairline">
      <div className="bars-texture pointer-events-none absolute inset-x-0 top-0 h-full opacity-40" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4 sm:px-8">
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-fog">Палата</p>
          <ul className="mt-4 space-y-2 text-sm text-fog">
            <li className="text-snow">{ORG_FULL}</li>
            <li>{ORG_ADDRESS}</li>
            <li><a className="hover:text-snow" href={tel(ORG_PHONE)}>{ORG_PHONE}</a></li>
            <li><a className="hover:text-snow" href={`mailto:${ORG_EMAIL}`}>{ORG_EMAIL}</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-fog">Сервис</p>
          <ul className="mt-4 space-y-2 text-sm text-fog">
            <li><Link className="hover:text-snow" to="/o-palate">О палате</Link></li>
            <li><Link className="hover:text-snow" to="/chlenstvo">Членство в ТПП</Link></li>
            <li><Link className="hover:text-snow" to="/uslugi">Услуги палаты</Link></li>
            <li><Link className="hover:text-snow" to="/proverka">Проверить штрих-код</Link></li>
            <li><Link className="hover:text-snow" to="/tarify">Тарифы и калькулятор</Link></li>
            <li><Link className="hover:text-snow" to="/novosti">Новости</Link></li>
            <li><Link className="hover:text-snow" to="/vestnik">Вестник ТПП</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-fog">Штриховое кодирование</p>
          <ul className="mt-4 space-y-2 text-sm text-fog">
            {PHONES.map(p => (
              <li key={p}><a className="hover:text-snow" href={tel(p)}>{p}</a></li>
            ))}
            <li><a className="hover:text-snow" href={TELEGRAM_URL} rel="noopener">Telegram / WhatsApp</a></li>
            <li><a className="hover:text-snow" href={`mailto:${SERVICE_EMAIL}`}>{SERVICE_EMAIL}</a></li>
            <li>Эксперт — {EXPERT}</li>
          </ul>
        </div>
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-fog">Основной сайт</p>
          <ul className="mt-4 space-y-2 text-sm text-fog">
            <li>
              <a className="hover:text-snow" href={PARENT_SITE} rel="noopener">kuban.tpprf.ru ↗</a>
            </li>
            <li>Все услуги, структура и новости палаты</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-fog sm:px-8">
          <span>© {new Date().getFullYear()} {ORG_FULL}</span>
          <span>Идентификаторы реестра ИСАИ не являются кодами GTIN (GS1) и не предназначены для «Честного ЗНАКа»</span>
        </div>
      </div>
    </footer>
  )
}
