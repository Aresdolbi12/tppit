import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import { ArrowCta, Eyebrow } from '../components/UI'
import news from '../data/news.json'
import { CHAMBER_SERVICES, ORG_SLOGAN } from '../lib/site'

/* Быстрые разделы сайта */
const QUICK_LINKS = [
  { title: 'О палате', to: '/o-palate' },
  { title: 'Членство в ТПП', to: '/chlenstvo' },
  { title: 'Анонсы и мероприятия', to: '/novosti' },
  { title: 'О регионе', to: '/region' },
]

/* Главная — портал палаты: наполнение по образцу kuban.tpprf.ru. */
export default function Home() {
  const reduced = useReducedMotion()

  return (
    <>
      {/* ================= HERO ПАЛАТЫ ================= */}
      <section className="mx-auto grid min-h-[92dvh] max-w-6xl items-center gap-14 px-4 pb-16 pt-36 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <Eyebrow>
              <span className="h-1.5 w-1.5 rounded-full bg-pulse" />
              союз · система ТПП РФ · с 1909 года
            </Eyebrow>
          </motion.div>

          <motion.h1
            className="mt-7 font-display text-[clamp(1.8rem,4.6vw,3.1rem)] font-semibold leading-[1.1] tracking-tight"
            initial={reduced ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
          >
            Торгово-промышленная палата{' '}
            <span className="bg-gradient-to-r from-pulse to-[#8ec5ff] bg-clip-text text-transparent">
              Краснодарского края
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 font-display text-[13px] uppercase tracking-[0.18em] text-fog"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.14 }}
          >
            {ORG_SLOGAN}
          </motion.p>

          <motion.p
            className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-fog"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.32, 0.72, 0, 1] }}
          >
            Координирующий центр системы торгово-промышленных палат Кубани:
            представляем интересы бизнеса и объединяем предприятия региона.
            Экспертиза, сертификация, оценка, переводы, юридические услуги
            и поддержка внешнеэкономической деятельности.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.26, ease: [0.32, 0.72, 0, 1] }}
          >
            <ArrowCta to="/uslugi">Услуги палаты</ArrowCta>
            <ArrowCta to="/kontakty" ghost>Связаться с палатой</ArrowCta>
          </motion.div>
        </div>

        {/* Карта-визитка: Меркурий + быстрые сервисы основного сайта */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="rounded-[2rem] border border-hairline bg-white/[0.04] p-2 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
            <div className="rounded-[calc(2rem-0.5rem)] bg-pane p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-4">
                <img src={`${import.meta.env.BASE_URL}mercury.svg`} alt="" className="h-12 w-auto opacity-90" />
                <div>
                  <p className="font-display text-[13px] font-medium uppercase tracking-[0.08em] leading-snug text-snow">
                    ТПП Краснодарского края
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                    kuban.tpprf.ru
                  </p>
                </div>
              </div>
              <ul className="mt-7 divide-y divide-hairline border-t border-hairline">
                {QUICK_LINKS.map(l => (
                  <li key={l.title}>
                    <Link
                      to={l.to}
                      className="group flex items-center justify-between py-3.5 text-sm text-fog transition-colors duration-500 hover:text-snow"
                    >
                      {l.title}
                      <span className="text-xs opacity-40 transition-all duration-500 group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= ЦИФРЫ ПАЛАТЫ ================= */}
      <section className="border-y border-hairline bg-abyss/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-hairline lg:grid-cols-4">
          {[
            ['1909', 'год основания биржевого общества'],
            ['11', 'межрайонных палат в системе'],
            ['12', 'подразделений и отделов'],
            ['35 лет', 'системе ТПП России'],
          ].map(([v, l], i) => (
            <Reveal key={l} delay={i * 0.08} className="px-6 py-10 max-lg:[&:nth-child(3)]:border-t max-lg:[&:nth-child(4)]:border-t max-lg:[&:nth-child(n+3)]:border-hairline">
              <p className="font-display text-2xl font-semibold text-snow sm:text-3xl">{v}</p>
              <p className="mt-2 text-[13px] text-fog">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= УСЛУГИ ================= */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-8">
        <Reveal>
          <Eyebrow>услуги палаты</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Сервисы для бизнеса
          </h2>
        </Reveal>

        {/* Онлайн-сервисы этого сайта */}
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link
              to="/shtrih-kody"
              className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-[2rem] border border-hairline bg-white/[0.03] p-8 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-2"
            >
              <div className="bars-texture absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-pulse/15 blur-3xl transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-125" />
              <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-pulse">онлайн-сервис · EAN-13 · ITF-14</p>
              <h3 className="relative mt-3 font-display text-2xl font-semibold">Штриховое кодирование</h3>
              <p className="relative mt-3 max-w-md text-sm leading-relaxed text-fog">
                Регистрация кодов в реестре ИСАИ с выдачей свидетельства, проверка
                любого кода онлайн и калькулятор тарифов. От 4 ₽ за код, 1–2 дня.
              </p>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm text-snow">
                Перейти к сервису
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <Link
              to="/uslugi"
              className="group flex h-full flex-col justify-between rounded-[2rem] border border-hairline bg-white/[0.03] p-7 transition-colors duration-700 hover:border-hairline-2"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">СЦ Контур</p>
                <h3 className="mt-2.5 font-display text-lg font-semibold">Электронная подпись</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-fog">
                  Выпуск квалифицированной электронной подписи для физических лиц
                  и сотрудников организаций.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-snow">
                Подробнее
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Каталог направлений — зеркало основного сайта */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CHAMBER_SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <a
                href={s.url}
                rel="noopener"
                className="group flex h-full flex-col rounded-[1.4rem] border border-hairline bg-white/[0.02] p-6 transition-colors duration-700 hover:border-hairline-2"
              >
                <h3 className="text-[15px] font-medium text-snow">{s.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-fog">{s.desc}</p>
                <span className="mt-4 text-xs text-fog transition-colors group-hover:text-pulse">на основном сайте ↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= НОВОСТИ ================= */}
      <section className="border-t border-hairline bg-abyss/40 py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>лента палаты</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">Новости</h2>
            </div>
            <Link to="/novosti" className="text-sm text-fog transition-colors hover:text-snow">
              Все новости →
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {news.slice(0, 6).map((n, i) => (
              <Reveal key={n.link} delay={(i % 3) * 0.08}>
                <a
                  href={n.link}
                  rel="noopener"
                  className="group flex h-full flex-col rounded-[1.6rem] border border-hairline bg-white/[0.02] p-7 transition-colors duration-700 hover:border-hairline-2"
                >
                  <time className="font-mono text-[11px] text-fog">{new Date(n.date).toLocaleDateString('ru-RU')}</time>
                  <h3 className="mt-3 line-clamp-3 text-[15px] font-medium leading-snug text-snow">{n.title}</h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-relaxed text-fog">{n.desc}</p>
                  <span className="mt-5 text-xs text-fog transition-colors group-hover:text-pulse">kuban.tpprf.ru ↗</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ФИНАЛЬНЫЙ CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-gradient-to-br from-pulse-deep/60 to-abyss p-10 sm:p-16">
            <div className="bars-texture absolute inset-0 opacity-50" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Палата — рядом с вашим бизнесом
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-snow/80">
                Членам ТПП Краснодарского края — скидки на услуги палаты,
                защита интересов и участие в деловых мероприятиях региона.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ArrowCta to="/chlenstvo">Вступить в палату</ArrowCta>
                <ArrowCta to="/kontakty" ghost>Связаться с палатой</ArrowCta>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
