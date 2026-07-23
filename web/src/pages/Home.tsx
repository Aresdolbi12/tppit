import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import ScannerCard from '../components/ScannerCard'
import news from '../data/news.json'
import { REGISTRY_TOTAL, fmt } from '../lib/registry'
import { PARENT_SITE } from '../lib/site'

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hairline-2 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
      {children}
    </span>
  )
}

function ArrowCta({ to, children, ghost = false }: { to: string; children: React.ReactNode; ghost?: boolean }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2.5 rounded-full py-3 pl-6 pr-2 text-sm font-medium transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
        ghost
          ? 'border border-hairline-2 text-snow hover:bg-white/5'
          : 'bg-pulse text-void shadow-[0_10px_40px_-12px_rgba(77,163,255,0.55)]'
      }`}
    >
      {children}
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
          ghost ? 'bg-white/10' : 'bg-void/15'
        }`}
      >
        ↗
      </span>
    </Link>
  )
}

const STEPS = [
  { t: 'Заявка', d: 'Список продукции на почту — тип кода EAN-13 или ITF-14' },
  { t: 'Присвоение', d: 'Уникальные номера с префиксом 46 в реестре ИСАИ' },
  { t: 'Макеты', d: 'Оригинал-макеты в JPG, SVG, PNG — под вашу типографию' },
  { t: 'Свидетельство', d: 'Официальный документ палаты на каждый код. Срок — 1–2 дня' },
]

export default function Home() {
  const reduced = useReducedMotion()

  return (
    <>
      {/* ================= HERO: редакционный сплит ================= */}
      <section className="mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-14 px-4 pb-16 pt-36 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <Eyebrow>
              <span className="h-1.5 w-1.5 rounded-full bg-verify" />
              реестр ИСАИ · {fmt(REGISTRY_TOTAL)} кодов · вся Россия
            </Eyebrow>
          </motion.div>

          <motion.h1
            className="mt-7 font-display text-[clamp(2rem,5.4vw,3.6rem)] font-semibold leading-[1.06] tracking-tight"
            initial={reduced ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
          >
            Штрих-код
            <br />
            для вашего товара —{' '}
            <span className="bg-gradient-to-r from-pulse to-[#8ec5ff] bg-clip-text text-transparent">
              за 1–2 дня
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-fog"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.32, 0.72, 0, 1] }}
          >
            Торгово-промышленная палата Краснодарского края присваивает коды EAN-13
            и ITF-14, регистрирует их в собственном реестре и выдаёт свидетельство
            на каждый номер. От 4 ₽ за код.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.32, 0.72, 0, 1] }}
          >
            <ArrowCta to="/tarify">Получить коды</ArrowCta>
            <ArrowCta to="/proverka" ghost>Проверить код</ArrowCta>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          <ScannerCard />
        </motion.div>
      </section>

      {/* ================= ЦИФРЫ ================= */}
      <section className="border-y border-hairline bg-abyss/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-hairline lg:grid-cols-4">
          {[
            [fmt(REGISTRY_TOTAL), 'кодов в реестре палаты'],
            ['от 4 ₽', 'за один штрих-код'],
            ['1–2 дня', 'от заявки до свидетельства'],
            ['−10%', 'членам ТПП Краснодарского края'],
          ].map(([v, l], i) => (
            <Reveal key={l} delay={i * 0.08} className="px-6 py-10 max-lg:[&:nth-child(3)]:border-t max-lg:[&:nth-child(4)]:border-t max-lg:[&:nth-child(n+3)]:border-hairline">
              <p className="font-display text-2xl font-semibold text-snow sm:text-3xl">{v}</p>
              <p className="mt-2 text-[13px] text-fog">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= БЕНТО УСЛУГ ================= */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-8">
        <Reveal>
          <Eyebrow>что делает сервис</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Один сервис — весь цикл штрихового кодирования
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {/* Регистрация — главная карта */}
          <Reveal className="lg:col-span-7 lg:row-span-2">
            <Link
              to="/tarify"
              className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-[2rem] border border-hairline bg-white/[0.03] p-8 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-2"
            >
              <div className="bars-texture absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-pulse/15 blur-3xl transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-125" />
              <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-pulse">EAN-13 · ITF-14</p>
              <h3 className="relative mt-3 font-display text-2xl font-semibold">Регистрация штрих-кодов</h3>
              <p className="relative mt-3 max-w-md text-sm leading-relaxed text-fog">
                Присвоение уникальных номеров в реестре ИСАИ, оригинал-макеты в любом
                графическом формате и свидетельство палаты на каждый код.
              </p>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm text-snow">
                Тарифы и калькулятор
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>

          {/* Проверка */}
          <Reveal delay={0.08} className="lg:col-span-5">
            <Link
              to="/proverka"
              className="group flex h-full flex-col justify-between rounded-[2rem] border border-hairline bg-white/[0.03] p-8 transition-colors duration-700 hover:border-hairline-2"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-verify">онлайн · бесплатно</p>
                <h3 className="mt-3 font-display text-xl font-semibold">Проверка кода в реестре</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  По номеру кода или ИНН организации — паспорт кода с данными производителя.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-snow">
                Проверить
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>

          {/* ЭЦП */}
          <Reveal delay={0.16} className="lg:col-span-5">
            <Link
              to="/uslugi"
              className="group flex h-full flex-col justify-between rounded-[2rem] border border-hairline bg-white/[0.03] p-8 transition-colors duration-700 hover:border-hairline-2"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">СЦ Контур</p>
                <h3 className="mt-3 font-display text-xl font-semibold">Электронная подпись</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  Выпуск УКЭП для физических лиц и сотрудников организаций — и другие услуги палаты.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-snow">
                Все услуги
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= ПРОЦЕСС ================= */}
      <section className="border-t border-hairline bg-abyss/40 py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal>
            <Eyebrow>как это работает</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">От заявки до свидетельства</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.09}>
                <div className="h-full rounded-[1.6rem] border border-hairline bg-white/[0.02] p-7">
                  <span className="font-mono text-xs text-pulse">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 font-display text-lg font-medium">{s.t}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-fog">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= НОВОСТИ ================= */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-8">
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
          {news.slice(0, 3).map((n, i) => (
            <Reveal key={n.link} delay={i * 0.08}>
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
      </section>

      {/* ================= ФИНАЛЬНЫЙ CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-gradient-to-br from-pulse-deep/60 to-abyss p-10 sm:p-16">
            <div className="bars-texture absolute inset-0 opacity-50" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Нет своих штрих-кодов?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-snow/80">
                Палата присвоит уникальные номера, подготовит макеты и выдаст
                свидетельство за 1–2 дня. Посчитайте стоимость под ваше количество позиций.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ArrowCta to="/tarify">Калькулятор тарифа</ArrowCta>
                <a
                  href={PARENT_SITE}
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-snow transition-colors hover:bg-white/10"
                >
                  Основной сайт палаты
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
