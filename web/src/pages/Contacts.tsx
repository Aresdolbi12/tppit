import Reveal from '../components/Reveal'
import {
  EXPERT, ORG_ADDRESS, ORG_EMAIL, ORG_FULL, ORG_PHONE, ORG_SLOGAN,
  PARENT_SITE, PHONES, SERVICE_EMAIL, TELEGRAM_URL, tel, WHATSAPP_PHONE,
} from '../lib/site'
import { BRANCHES, LEADERSHIP, REPRESENTATIVES } from '../data/chamber'

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

      {/* Руководство */}
      <Reveal className="mt-20">
        <h2 className="font-display text-2xl font-semibold">Руководство</h2>
      </Reveal>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LEADERSHIP.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <div className="h-full rounded-[1.4rem] border border-hairline bg-white/[0.02] p-6">
              <h3 className="text-[14px] font-medium leading-snug text-snow">{p.name}</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-fog">{p.role}</p>
              <ul className="mt-3 space-y-1 text-[12px]">
                {p.phone && <li><a className="font-mono text-fog hover:text-pulse" href={tel(p.phone)}>{p.phone}</a></li>}
                {p.email && <li><a className="text-fog hover:text-pulse" href={`mailto:${p.email}`}>{p.email}</a></li>}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Филиалы */}
      <Reveal className="mt-16">
        <h2 className="font-display text-2xl font-semibold">Филиалы и представительства</h2>
      </Reveal>
      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        {[...BRANCHES, ...REPRESENTATIVES].map((b, i) => (
          <Reveal key={b.name} delay={(i % 3) * 0.05}>
            <div className="h-full rounded-[1.4rem] border border-hairline bg-white/[0.02] p-6 text-[13px] leading-relaxed">
              <h3 className="text-[14px] font-medium text-snow">{b.name}</h3>
              <p className="mt-1.5 text-fog">{b.head}</p>
              {b.address && <p className="mt-1.5 text-fog">{b.address}</p>}
              <p className="mt-1.5">
                {b.phones.map(ph => (
                  <a key={ph} className="mr-3 font-mono text-fog hover:text-pulse" href={tel(ph)}>{ph}</a>
                ))}
              </p>
              <a className="text-fog hover:text-pulse" href={`mailto:${b.email}`}>{b.email}</a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
