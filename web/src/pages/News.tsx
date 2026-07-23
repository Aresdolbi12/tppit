import Reveal from '../components/Reveal'
import news from '../data/news.json'
import { PARENT_SITE } from '../lib/site'

export default function News() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 pt-36 sm:px-8">
      <Reveal>
        <span className="inline-flex rounded-full border border-hairline-2 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          лента kuban.tpprf.ru
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Новости палаты</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
          Автоматически из RSS-ленты основного сайта. Полные тексты — по ссылкам.
        </p>
      </Reveal>

      <div className="mt-12 space-y-3">
        {news.map((n, i) => (
          <Reveal key={n.link} delay={Math.min(i * 0.05, 0.3)}>
            <a
              href={n.link}
              rel="noopener"
              className="group block rounded-[1.6rem] border border-hairline bg-white/[0.02] p-7 transition-colors duration-700 hover:border-hairline-2"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <time className="font-mono text-[11px] text-fog">
                  {new Date(n.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
                <span className="text-xs text-fog opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  читать ↗
                </span>
              </div>
              <h2 className="mt-2.5 text-[16px] font-medium leading-snug text-snow">{n.title}</h2>
              {n.desc && <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-fog">{n.desc}</p>}
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <a href={PARENT_SITE + '/ru/news/'} rel="noopener" className="text-sm text-fog transition-colors hover:text-snow">
          Вся лента на kuban.tpprf.ru ↗
        </a>
      </Reveal>
    </section>
  )
}
