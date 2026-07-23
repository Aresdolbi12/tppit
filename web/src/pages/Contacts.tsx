import Reveal from '../components/Reveal'
import {
  EXPERT, ORG_ADDRESS, ORG_EMAIL, ORG_FULL, ORG_PHONE, ORG_SLOGAN,
  PARENT_SITE, PHONES, SERVICE_EMAIL, TELEGRAM_URL, tel, WHATSAPP_PHONE,
} from '../lib/site'

export default function Contacts() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-36 sm:px-8">
      <Reveal>
        <span className="inline-flex rounded-full border border-hairline-2 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          контакты
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Связаться с нами</h1>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[2rem] border border-pulse/30 bg-pulse/[0.06] p-8 sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pulse">штриховое кодирование</p>
            <h2 className="mt-3 font-display text-xl font-semibold">Эксперт — {EXPERT}</h2>
            <ul className="mt-6 space-y-3 text-[15px]">
              {PHONES.map(p => (
                <li key={p}>
                  <a className="font-mono text-snow hover:text-pulse" href={tel(p)}>{p}</a>
                  {p === WHATSAPP_PHONE && <span className="ml-2 text-xs text-fog">WhatsApp</span>}
                </li>
              ))}
              <li>
                <a className="text-snow hover:text-pulse" href={TELEGRAM_URL} rel="noopener">
                  Telegram: t.me/ares_dolbi12
                </a>
              </li>
              <li>
                <a className="text-snow hover:text-pulse" href={`mailto:${SERVICE_EMAIL}`}>{SERVICE_EMAIL}</a>
                <span className="ml-2 text-xs text-fog">почта для заявок</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-[2rem] border border-hairline bg-white/[0.03] p-8 sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">палата</p>
            <h2 className="mt-3 font-display text-xl font-semibold">{ORG_FULL}</h2>
            <p className="mt-1 text-sm italic text-fog">{ORG_SLOGAN}</p>
            <ul className="mt-6 space-y-3 text-[15px] text-fog">
              <li>{ORG_ADDRESS}</li>
              <li><a className="font-mono text-snow hover:text-pulse" href={tel(ORG_PHONE)}>{ORG_PHONE}</a></li>
              <li><a className="text-snow hover:text-pulse" href={`mailto:${ORG_EMAIL}`}>{ORG_EMAIL}</a></li>
              <li>
                <a className="text-snow hover:text-pulse" href={PARENT_SITE} rel="noopener">
                  kuban.tpprf.ru ↗
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
