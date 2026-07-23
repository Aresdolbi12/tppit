import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { CHAMBER_SERVICES, PARENT_SITE, SERVICE_EMAIL } from '../lib/site'

export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-8">
      <Reveal>
        <span className="inline-flex rounded-full border border-hairline-2 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          услуги
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Услуги палаты</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
          Штриховое кодирование и электронная подпись — здесь, полный каталог —
          на основном сайте палаты.
        </p>
      </Reveal>

      {/* наши услуги — развёрнуто */}
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[2rem] border border-hairline bg-white/[0.03] p-8 sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pulse">EAN-13 · ITF-14</p>
            <h2 className="mt-3 font-display text-2xl font-semibold">Регистрация штрих-кодов</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-fog">
              <li><b className="text-snow">EAN-13</b> — единичная (потребительская) упаковка, 13 цифр — код, который сканируют на кассе.</li>
              <li><b className="text-snow">ITF-14</b> — групповая (транспортная) упаковка, 14 цифр — для коробов и паллет.</li>
              <li>Регистрация в реестре ИСАИ ТПП КК, свидетельство на каждый номер.</li>
              <li>Оригинал-макеты в JPG, SVG, PNG, BMP — под типографию или печать этикеток.</li>
              <li>Соответствие ГОСТ Р 51201-98. Срок — 1–2 дня.</li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/shtrih-kody" className="rounded-full bg-pulse px-6 py-3 text-sm font-medium text-void transition-transform duration-500 active:scale-[0.97]">
                Страница услуги →
              </Link>
              <Link to="/tarify" className="rounded-full border border-hairline-2 px-6 py-3 text-sm text-snow transition-colors hover:bg-white/5">
                Тарифы
              </Link>
              <a href={`mailto:${SERVICE_EMAIL}`} className="rounded-full border border-hairline-2 px-6 py-3 text-sm text-snow transition-colors hover:bg-white/5">
                Заявка на почту
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-[2rem] border border-hairline bg-white/[0.03] p-8 sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">СЦ Контур</p>
            <h2 className="mt-3 font-display text-2xl font-semibold">Электронная подпись</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-fog">
              <li>Палата — сервисный центр Контура в Краснодаре.</li>
              <li>Выпуск квалифицированной электронной подписи (УКЭП) для физических лиц и сотрудников организаций.</li>
              <li>Помощь с настройкой рабочего места и носителями (Рутокен).</li>
              <li>Консультации по работе с ЭДО и государственными порталами.</li>
            </ul>
            <div className="mt-7">
              <Link to="/kontakty" className="rounded-full border border-hairline-2 px-6 py-3 text-sm text-snow transition-colors hover:bg-white/5">
                Уточнить условия →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* витрина основного сайта */}
      <Reveal className="mt-20">
        <h2 className="font-display text-2xl font-semibold">Все услуги палаты</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-fog">
          Полный каталог с регламентами и заказом — на kuban.tpprf.ru.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

      <Reveal delay={0.1} className="mt-10">
        <a
          href={PARENT_SITE}
          rel="noopener"
          className="inline-flex items-center gap-2 text-sm text-fog transition-colors hover:text-snow"
        >
          kuban.tpprf.ru — основной сайт палаты ↗
        </a>
      </Reveal>
    </section>
  )
}
