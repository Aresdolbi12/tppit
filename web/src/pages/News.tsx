import { useState } from 'react'
import Reveal from '../components/Reveal'
import news from '../data/news.json'
import announcements from '../data/announcements.json'
import { PARENT_SITE } from '../lib/site'

type Tab = 'news' | 'ann'

export default function News() {
  const [tab, setTab] = useState<Tab>('news')

  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 pt-36 sm:px-8">
      <Reveal>
        <span className="inline-flex rounded-full border border-hairline-2 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          лента kuban.tpprf.ru · обновляется автоматически
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Новости и анонсы</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
          Новости палаты и анонсы деловых мероприятий с основного сайта.
          Полные тексты — по ссылкам.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <div className="flex w-max gap-1 rounded-full border border-hairline bg-void/50 p-1" role="tablist">
          {([['news', 'Новости'], ['ann', 'Анонсы мероприятий']] as Array<[Tab, string]>).map(([t, label]) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-[13px] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                tab === t ? 'bg-white/10 text-snow' : 'text-fog hover:text-snow'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 space-y-3">
        {tab === 'news' &&
          news.map((n, i) => (
            <Reveal key={n.link} delay={Math.min(i * 0.05, 0.3)}>
              <a
                href={n.link}
                rel="noopener"
                className="group flex gap-6 rounded-[1.6rem] border border-hairline bg-white/[0.02] p-5 transition-colors duration-700 hover:border-hairline-2 sm:p-6"
              >
                {n.img && (
                  <div className="hidden h-28 w-40 shrink-0 overflow-hidden rounded-[1rem] sm:block">
                    <img
                      src={import.meta.env.BASE_URL + n.img}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <time className="font-mono text-[11px] text-fog">
                      {new Date(n.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                    <span className="text-xs text-fog opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      читать ↗
                    </span>
                  </div>
                  <h2 className="mt-2 text-[16px] font-medium leading-snug text-snow">{n.title}</h2>
                  {n.desc && <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-fog">{n.desc}</p>}
                </div>
              </a>
            </Reveal>
          ))}

        {tab === 'ann' &&
          announcements.map((n, i) => (
            <Reveal key={n.link} delay={Math.min(i * 0.05, 0.3)}>
              <a
                href={n.link}
                rel="noopener"
                className="group block rounded-[1.6rem] border border-hairline bg-white/[0.02] p-7 transition-colors duration-700 hover:border-hairline-2"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  {n.date && <time className="font-mono text-[11px] text-pulse">{n.date}</time>}
                  <span className="text-xs text-fog opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    подробнее ↗
                  </span>
                </div>
                <h2 className="mt-2.5 text-[16px] font-medium leading-snug text-snow">{n.title}</h2>
              </a>
            </Reveal>
          ))}
      </div>

      <Reveal className="mt-10">
        <a
          href={PARENT_SITE + (tab === 'news' ? '/ru/news/' : '/ru/announcements/')}
          rel="noopener"
          className="text-sm text-fog transition-colors hover:text-snow"
        >
          Вся лента на kuban.tpprf.ru ↗
        </a>
      </Reveal>
    </section>
  )
}
