import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import ScannerCard from '../components/ScannerCard'
import { ArrowCta, Eyebrow } from '../components/UI'
import { REGISTRY_TOTAL, fmt } from '../lib/registry'

const STEPS = [
  { t: 'Заявка', d: 'Список продукции на почту — тип кода EAN-13 или ITF-14' },
  { t: 'Присвоение', d: 'Уникальные номера с префиксом 46 в реестре ИСАИ' },
  { t: 'Макеты', d: 'Оригинал-макеты в JPG, SVG, PNG — под вашу типографию' },
  { t: 'Свидетельство', d: 'Официальный документ палаты на каждый код. Срок — 1–2 дня' },
]

/* Штрих-коды — витрина услуги с эффектами. */
export default function Barcodes() {
  const reduced = useReducedMotion()

  return (
    <>
      {/* HERO: редакционный сплит со сканером */}
      <section className="mx-auto grid min-h-[92dvh] max-w-6xl items-center gap-14 px-4 pb-16 pt-36 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
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
            Палата присваивает коды EAN-13 и ITF-14, регистрирует их
            в собственном реестре и выдаёт свидетельство на каждый номер.
            От 4 ₽ за код, работаем по всей России.
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

      {/* ЦИФРЫ */}
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

      {/* ЧТО ВХОДИТ */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-8">
        <Reveal>
          <Eyebrow>что входит в услугу</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Полный цикл штрихового кодирования
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-hairline bg-white/[0.03] p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pulse">EAN-13</p>
              <h3 className="mt-3 font-display text-xl font-semibold">Потребительская упаковка</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">
                13 цифр — тот самый код, который сканируют на кассе. Требуется
                торговыми сетями и маркетплейсами для попадания товара на полку.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-[2rem] border border-hairline bg-white/[0.03] p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pulse">ITF-14</p>
              <h3 className="mt-3 font-display text-xl font-semibold">Транспортная упаковка</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">
                14 цифр для коробов и паллет — автоматизация приёмки, учёта
                запасов и логистики групповой тары.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="h-full rounded-[2rem] border border-hairline bg-white/[0.03] p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-verify">документ</p>
              <h3 className="mt-3 font-display text-xl font-semibold">Свидетельство палаты</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">
                На каждый присвоенный номер — официальное свидетельство
                о регистрации в реестре ИСАИ ТПП КК. Коды соответствуют ГОСТ Р 51201-98.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-6">
          <div className="rounded-[1.6rem] border border-hairline bg-white/[0.02] p-6 text-[13px] leading-relaxed text-fog">
            Присваиваемые идентификаторы не являются кодами GTIN международной системы GS1
            и не предназначены для обязательной маркировки товаров в государственных
            информационных системах (в том числе ГИС МТ «Честный ЗНАК»).
          </div>
        </Reveal>
      </section>

      {/* ПРОЦЕСС */}
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
          <Reveal delay={0.2} className="mt-12">
            <div className="flex flex-wrap gap-3">
              <ArrowCta to="/tarify">Посчитать стоимость</ArrowCta>
              <ArrowCta to="/proverka" ghost>Проверить код в реестре</ArrowCta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
