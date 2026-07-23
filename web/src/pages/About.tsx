import { useState } from 'react'
import Reveal from '../components/Reveal'
import { Eyebrow } from '../components/UI'
import {
  BOARD, BRANCHES, COUNCIL, DEPARTMENTS, DOCUMENTS, HISTORY_MILESTONES,
  LEADERSHIP, MISSION, MUNICIPAL_CHAMBERS, REPRESENTATIVES,
} from '../data/chamber'
import { PARENT_SITE, tel } from '../lib/site'

function PeopleList({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-[1.6rem] border border-hairline bg-white/[0.02]">
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-7 py-5 text-left"
      >
        <span className="font-display text-lg font-medium">{title}</span>
        <span className={`text-fog transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <ul className="space-y-2.5 border-t border-hairline px-7 py-6 text-sm leading-relaxed text-fog">
          {items.map(p => <li key={p}>{p}</li>)}
        </ul>
      )}
    </div>
  )
}

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-8">
        <Reveal>
          <Eyebrow>о палате · союз · с 1909 года</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Крупнейшее бизнес-объединение Кубани
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-fog">{MISSION}</p>
          <p className="mt-4 text-[13px] text-fog">
            Палата сертифицирована по международному стандарту ISO 9001:2015.
          </p>
        </Reveal>
      </section>

      {/* РУКОВОДСТВО */}
      <section className="border-t border-hairline bg-abyss/40 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal>
            <Eyebrow>руководство</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold">Исполнительные органы</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div className="h-full rounded-[1.6rem] border border-hairline bg-white/[0.02] p-7">
                  <h3 className="font-display text-[15px] font-semibold leading-snug">{p.name}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-fog">{p.role}</p>
                  <ul className="mt-4 space-y-1.5 text-[13px]">
                    {p.phone && <li><a className="font-mono text-fog hover:text-pulse" href={tel(p.phone)}>{p.phone}</a></li>}
                    {p.email && <li><a className="text-fog hover:text-pulse" href={`mailto:${p.email}`}>{p.email}</a></li>}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Reveal><PeopleList title={`Совет палаты · ${COUNCIL.length} чел.`} items={COUNCIL} /></Reveal>
            <Reveal delay={0.06}><PeopleList title={`Правление · ${BOARD.length} чел.`} items={BOARD} /></Reveal>
          </div>
        </div>
      </section>

      {/* ИСТОРИЯ */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <Reveal>
          <Eyebrow>история</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold">От биржевого общества — к палате</h2>
        </Reveal>
        <div className="mt-12 space-y-0">
          {HISTORY_MILESTONES.map((m, i) => (
            <Reveal key={m.year + i} delay={i * 0.05}>
              <div className="grid gap-2 border-l border-hairline-2 py-6 pl-8 sm:grid-cols-[110px_1fr] sm:gap-8">
                <span className="font-display text-xl font-semibold text-pulse">{m.year}</span>
                <p className="text-sm leading-relaxed text-fog">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* СИСТЕМА ТПП КК */}
      <section className="border-t border-hairline bg-abyss/40 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal>
            <Eyebrow>система ТПП Краснодарского края</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold">11 палат по всему краю</h2>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MUNICIPAL_CHAMBERS.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-[1.4rem] border border-hairline bg-white/[0.02] p-6">
                  <h3 className="text-[15px] font-medium text-snow">{c.name}</h3>
                  <p className="mt-1.5 text-[13px] text-fog">{c.head}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <h3 className="mt-14 font-display text-xl font-semibold">Филиалы и представительства</h3>
          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {[...BRANCHES, ...REPRESENTATIVES].map((b, i) => (
              <Reveal key={b.name} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-[1.4rem] border border-hairline bg-white/[0.02] p-6 text-[13px] leading-relaxed">
                  <h4 className="text-[14px] font-medium text-snow">{b.name}</h4>
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
        </div>
      </section>

      {/* ПОДРАЗДЕЛЕНИЯ + ДОКУМЕНТЫ */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>подразделения</Eyebrow>
            <h2 className="mt-5 font-display text-2xl font-semibold">12 отделов палаты</h2>
            <ul className="mt-7 space-y-2.5 text-sm text-fog">
              {DEPARTMENTS.map(d => (
                <li key={d} className="flex items-baseline gap-3">
                  <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-pulse" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <Eyebrow>нормативная база</Eyebrow>
            <h2 className="mt-5 font-display text-2xl font-semibold">Документы</h2>
            <ul className="mt-7 space-y-3">
              {DOCUMENTS.map(d => (
                <li key={d.title}>
                  <a
                    href={d.url}
                    rel="noopener"
                    className="group flex items-start justify-between gap-4 rounded-[1.2rem] border border-hairline bg-white/[0.02] px-5 py-4 text-sm text-fog transition-colors duration-500 hover:border-hairline-2 hover:text-snow"
                  >
                    {d.title}
                    <span className="shrink-0 text-xs opacity-50 group-hover:opacity-100">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] text-fog">
              Файлы документов — на основном сайте:{' '}
              <a className="text-pulse hover:underline" href={PARENT_SITE + '/ru/overview/'} rel="noopener">
                kuban.tpprf.ru/ru/overview
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
