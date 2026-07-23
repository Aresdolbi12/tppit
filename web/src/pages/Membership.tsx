import Reveal from '../components/Reveal'
import { Eyebrow } from '../components/UI'
import { MEMBER_RIGHTS, MEMBERSHIP_DOCS } from '../data/chamber'
import { PARENT_SITE } from '../lib/site'

/* Онлайн-заявка на вступление на этом сайте — этап 2 (PHP API).
   Пока ведём на форму основного сайта. */
export default function Membership() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-8">
        <Reveal>
          <Eyebrow>членство в ТПП</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Один шаг — два членства
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-fog">
            Становясь членом Торгово-промышленной палаты Краснодарского края,
            вы одновременно становитесь членом ТПП Российской Федерации и получаете
            возможность сотрудничества с надёжными бизнес-партнёрами края, России
            и зарубежных стран. Палата активно взаимодействует с администрацией
            Краснодарского края и имеет соглашения с региональными и иностранными
            торговыми палатами.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={PARENT_SITE + '/ru/membership/'}
              rel="noopener"
              className="group inline-flex items-center gap-2.5 rounded-full bg-pulse py-3 pl-6 pr-2 text-sm font-medium text-void shadow-[0_10px_40px_-12px_rgba(77,163,255,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              Подать заявку на вступление
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-void/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* ПРАВА ЧЛЕНОВ */}
      <section className="border-t border-hairline bg-abyss/40 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal>
            <Eyebrow>что даёт членство</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold">Права членов палаты</h2>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MEMBER_RIGHTS.map((r, i) => (
              <Reveal key={r} delay={(i % 3) * 0.05}>
                <div className="flex h-full items-start gap-3.5 rounded-[1.4rem] border border-hairline bg-white/[0.02] p-6">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pulse/15 font-mono text-[10px] text-pulse">
                    ✓
                  </span>
                  <p className="text-sm leading-relaxed text-fog">{r}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-8">
            <p className="text-[13px] text-fog">
              Плюс скидка 10% на услуги палаты — в том числе на регистрацию штрих-кодов.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ДОКУМЕНТЫ */}
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-8">
        <Reveal>
          <Eyebrow>документы для вступления</Eyebrow>
          <h2 className="mt-5 font-display text-2xl font-semibold">Скачать формы</h2>
        </Reveal>
        <ul className="mt-8 space-y-3">
          {MEMBERSHIP_DOCS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <a
                href={d.url}
                rel="noopener"
                className="group flex items-start justify-between gap-4 rounded-[1.2rem] border border-hairline bg-white/[0.02] px-6 py-4 text-sm text-fog transition-colors duration-500 hover:border-hairline-2 hover:text-snow"
              >
                {d.title}
                <span className="shrink-0 text-xs opacity-50 group-hover:opacity-100">↗</span>
              </a>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.1} className="mt-6">
          <p className="text-[13px] leading-relaxed text-fog">
            Заполненные документы и вопросы по вступлению — через форму на{' '}
            <a className="text-pulse hover:underline" href={PARENT_SITE + '/ru/membership/'} rel="noopener">
              основном сайте палаты
            </a>{' '}
            или по телефону +7 (861) 992-03-27.
          </p>
        </Reveal>
      </section>
    </>
  )
}
