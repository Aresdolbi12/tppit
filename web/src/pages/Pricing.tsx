import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal'
import {
  bestQuote, fmt, MEMBER_DISCOUNT, OVERAGE_PER_CODE, TARIFFS,
} from '../lib/registry'
import { SERVICE_EMAIL, PHONES } from '../lib/site'

export default function Pricing() {
  const [count, setCount] = useState(100)
  const [member, setMember] = useState(false)
  const quote = useMemo(() => bestQuote(count, member), [count, member])

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-8">
      <Reveal>
        <span className="inline-flex rounded-full border border-hairline-2 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          тарифы 2026 · НДС 22% включён
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Тарифы и калькулятор</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
          Введите количество позиций — покажем самый выгодный тариф.
          Сверх нормы тарифа — {OVERAGE_PER_CODE} ₽ за код, членам ТПП КК скидка {MEMBER_DISCOUNT * 100}%.
        </p>
      </Reveal>

      {/* калькулятор */}
      <Reveal delay={0.1} className="mt-12">
        <div className="rounded-[2rem] border border-hairline bg-white/[0.04] p-2">
          <div className="grid gap-8 rounded-[calc(2rem-0.5rem)] bg-pane p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] lg:grid-cols-[1.2fr_1fr] lg:p-10">
            <div>
              <label htmlFor="cnt" className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
                Сколько штрих-кодов нужно?
              </label>
              <div className="mt-4 flex items-center gap-5">
                <input
                  id="cnt"
                  type="number"
                  min={1}
                  max={99999}
                  value={count}
                  onChange={e => setCount(Math.max(1, Math.min(99999, +e.target.value || 1)))}
                  className="w-36 rounded-full border border-hairline-2 bg-void/60 px-6 py-3.5 font-mono text-xl text-snow focus:border-pulse focus:outline-none"
                />
                <input
                  type="range"
                  min={1}
                  max={5000}
                  value={Math.min(count, 5000)}
                  onChange={e => setCount(+e.target.value)}
                  aria-label="Количество кодов"
                  className="flex-1 accent-[#4da3ff]"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[10, 30, 50, 100, 500, 1000, 5000].map(n => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`rounded-full border px-3.5 py-1.5 font-mono text-[12px] transition-colors duration-500 ${
                      count === n
                        ? 'border-pulse bg-pulse/15 text-pulse'
                        : 'border-hairline-2 text-fog hover:text-snow'
                    }`}
                  >
                    {fmt(n)}
                  </button>
                ))}
              </div>
              <label className="mt-7 flex w-max cursor-pointer items-center gap-3 text-sm text-fog">
                <input
                  type="checkbox"
                  checked={member}
                  onChange={e => setMember(e.target.checked)}
                  className="h-4 w-4 accent-[#4da3ff]"
                />
                Мы — член ТПП Краснодарского края (−10%)
              </label>
            </div>

            {quote && (
              <div className="flex flex-col justify-center rounded-[1.6rem] border border-pulse/30 bg-pulse/[0.07] p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-pulse">
                  выгодный тариф — «{quote.tariff.name}»
                </p>
                <p className="mt-4 font-display text-4xl font-semibold text-snow">
                  {fmt(quote.total)} ₽
                </p>
                <p className="mt-2 text-sm text-fog">
                  ≈ {fmt(quote.perCode)} ₽ за код · {fmt(count)} шт.
                  {quote.overage > 0 && ` · включая доплату сверх тарифа ${fmt(quote.overage)} ₽`}
                </p>
                <a
                  href={`mailto:${SERVICE_EMAIL}?subject=${encodeURIComponent('Заявка на штрих-коды — ' + count + ' шт.')}`}
                  className="group mt-6 inline-flex w-max items-center gap-2 rounded-full bg-pulse py-3 pl-6 pr-2 text-sm font-medium text-void transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                >
                  Отправить заявку
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-void/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* сетка тарифов */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TARIFFS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.05}>
            <button
              onClick={() => setCount(t.count)}
              className={`group w-full rounded-[1.6rem] border p-7 text-left transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                quote?.tariff.name === t.name
                  ? 'border-pulse/50 bg-pulse/[0.07]'
                  : 'border-hairline bg-white/[0.02] hover:border-hairline-2'
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">{t.name}</p>
              <p className="mt-3 font-display text-2xl font-semibold text-snow">{fmt(t.price)} ₽</p>
              <p className="mt-2 text-[13px] text-fog">
                {fmt(t.count)} кодов · {fmt(Math.round(t.price / t.count))} ₽/код
              </p>
            </button>
          </Reveal>
        ))}
        <Reveal delay={0.35}>
          <div className="flex h-full flex-col justify-center rounded-[1.6rem] border border-dashed border-hairline-2 p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">сверх тарифа</p>
            <p className="mt-3 font-display text-2xl font-semibold text-snow">{OVERAGE_PER_CODE} ₽</p>
            <p className="mt-2 text-[13px] text-fog">за каждый код сверх нормы тарифа</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-16">
        <div className="rounded-[1.6rem] border border-hairline bg-white/[0.02] p-7 text-sm leading-relaxed text-fog">
          <p>
            Оплата — наличный и безналичный расчёт. Срок изготовления — 1–2 дня.
            Вопросы: {PHONES.join(', ')} или{' '}
            <a className="text-pulse hover:underline" href={`mailto:${SERVICE_EMAIL}`}>{SERVICE_EMAIL}</a>.
          </p>
          <p className="mt-3">
            Присваиваемые идентификаторы не являются кодами GTIN системы GS1
            и не предназначены для обязательной маркировки в ГИС МТ «Честный ЗНАК».
          </p>
        </div>
      </Reveal>
    </section>
  )
}
