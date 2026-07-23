import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Barcode from '../components/Barcode'
import Reveal from '../components/Reveal'
import { isValidEan13 } from '../lib/ean13'
import {
  DEMO_MODE, demoCodes, digitsOnly, findByCode, findByInn, fmt,
  REGISTRY_TOTAL, type RegistryRow,
} from '../lib/registry'

type Tab = 'code' | 'inn'
type Result =
  | { kind: 'none' }
  | { kind: 'code-found'; row: RegistryRow }
  | { kind: 'code-miss'; code: string }
  | { kind: 'inn-found'; rows: RegistryRow[]; inn: string }
  | { kind: 'inn-miss'; inn: string }

function Passport({ row }: { row: RegistryRow }) {
  const fields: Array<[string, string | undefined]> = [
    ['Штрих-код', row.code],
    ['Наименование', row.product],
    ['Вес', row.weight],
    ['Упаковка', row.package],
    ['Организация', row.organisation],
    ['ИНН', row.inn],
    ['Адрес', row.adress],
    ['Телефон', row.phone],
    ['E-mail', row.email],
  ]
  return (
    <div className="rounded-[2rem] border border-hairline bg-white/[0.04] p-2">
      <div className="relative rounded-[calc(2rem-0.5rem)] bg-[linear-gradient(160deg,#f6f8fb,#e9eef5)] p-7 text-[#101826] sm:p-9">
        {/* печать реестра */}
        <div className="absolute right-6 top-6 grid h-24 w-24 rotate-[-8deg] place-content-center rounded-full border-2 border-[#2871aa]/70 text-center font-mono text-[8px] uppercase leading-[1.5] tracking-[0.12em] text-[#2871aa]/80 max-sm:hidden">
          <span>реестр</span>
          <b className="text-[9px]">ИСАИ ТПП КК</b>
          <span>зарегистрирован</span>
          <span className="absolute inset-1.5 rounded-full border border-[#2871aa]/50" />
        </div>
        <Barcode digits={row.code} color="#101826" className="mx-auto mb-6 w-full max-w-[300px]" />
        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[max-content_1fr]">
          {fields.filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#5f6b76]">{k}</dt>
              <dd className={`text-sm ${k === 'Штрих-код' || k === 'ИНН' ? 'font-mono' : ''}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default function Check() {
  const reduced = useReducedMotion()
  const [tab, setTab] = useState<Tab>('code')
  const [value, setValue] = useState('')
  const [hint, setHint] = useState('')
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<Result>({ kind: 'none' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const d = digitsOnly(value)
    setHint('')
    if (tab === 'code') {
      if (d.length !== 13 && d.length !== 14) { setHint('Код — 13 цифр (EAN-13) или 14 (ITF-14)'); return }
      if (d.length === 13 && !isValidEan13(d)) setHint('Контрольная цифра не сходится — проверьте номер. Ищем как есть.')
      run(() => {
        const row = findByCode(d)
        setResult(row ? { kind: 'code-found', row } : { kind: 'code-miss', code: d })
      })
    } else {
      if (d.length !== 10 && d.length !== 12) { setHint('ИНН — 10 цифр (юрлицо) или 12 (ИП)'); return }
      run(() => {
        const rows = findByInn(d)
        setResult(rows.length ? { kind: 'inn-found', rows, inn: d } : { kind: 'inn-miss', inn: d })
      })
    }
  }

  const run = (fn: () => void) => {
    if (reduced) { fn(); return }
    setResult({ kind: 'none' })
    setScanning(true)
    setTimeout(() => { setScanning(false); fn() }, 900)
  }

  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 pt-36 sm:px-8">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline-2 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          <span className="h-1.5 w-1.5 rounded-full bg-verify" />
          {fmt(REGISTRY_TOTAL)} кодов в реестре
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Проверка штрих-кода</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
          Бесплатная проверка регистрации в реестре палаты — по номеру кода
          или по ИНН организации-производителя.
        </p>
      </Reveal>

      {/* форма в двойной оправе */}
      <Reveal delay={0.1} className="mt-12">
        <div className="rounded-[2rem] border border-hairline bg-white/[0.04] p-2">
          <div className="rounded-[calc(2rem-0.5rem)] bg-pane p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div className="flex gap-1 rounded-full border border-hairline bg-void/50 p-1" role="tablist">
              {(
                [['code', 'По номеру кода'], ['inn', 'По ИНН организации']] as Array<[Tab, string]>
              ).map(([t, label]) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => { setTab(t); setHint(''); setResult({ kind: 'none' }) }}
                  className={`flex-1 rounded-full px-4 py-2 text-[13px] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    tab === t ? 'bg-white/10 text-snow' : 'text-fog hover:text-snow'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-6 flex flex-wrap gap-3">
              <label className="sr-only" htmlFor="q">
                {tab === 'code' ? 'Номер штрих-кода' : 'ИНН организации'}
              </label>
              <input
                id="q"
                value={value}
                onChange={e => setValue(e.target.value)}
                inputMode="numeric"
                placeholder={tab === 'code' ? '4601234567893' : '2309000000'}
                className="min-w-0 flex-1 rounded-full border border-hairline-2 bg-void/60 px-6 py-3.5 font-mono text-[15px] tracking-[0.08em] text-snow placeholder:text-fog/40 focus:border-pulse focus:outline-none"
              />
              <button
                type="submit"
                className="group flex items-center gap-2 rounded-full bg-pulse py-3 pl-6 pr-2 text-sm font-medium text-void transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
              >
                Проверить
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-void/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </form>

            {hint && <p className="mt-3 text-[13px] text-laser">{hint}</p>}
            {DEMO_MODE && (
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-fog/70">
                демо-режим GitHub Pages: поиск по выборке из {demoCodes.length} записей.
                Попробуйте: {demoCodes.slice(0, 2).join(', ')}. Полный реестр — после
                подключения к базе палаты.
              </p>
            )}
          </div>
        </div>
      </Reveal>

      {/* сканирование */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            className="mt-10 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-fog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="h-4 w-[2px] rounded bg-laser shadow-[0_0_10px_1px_rgba(255,77,77,0.6)]"
              animate={{ scaleY: [1, 1.6, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
            сканируем реестр…
          </motion.div>
        )}
      </AnimatePresence>

      {/* результат */}
      <AnimatePresence mode="wait">
        {result.kind !== 'none' && (
          <motion.div
            key={JSON.stringify(result.kind) + value}
            className="mt-10"
            initial={reduced ? false : { opacity: 0, y: 32, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            {result.kind === 'code-found' && <Passport row={result.row} />}

            {result.kind === 'inn-found' && (
              <div className="space-y-4">
                <div className="rounded-[1.6rem] border border-hairline bg-white/[0.03] p-6">
                  <h2 className="font-display text-lg font-medium">{result.rows[0].organisation}</h2>
                  <p className="mt-1 font-mono text-[12px] text-fog">
                    ИНН {result.inn} · кодов в выборке: {result.rows.length}
                  </p>
                </div>
                <div className="overflow-x-auto rounded-[1.6rem] border border-hairline bg-white/[0.02]">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead>
                      <tr className="border-b border-hairline text-left font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
                        <th className="px-5 py-3.5">Код</th>
                        <th className="px-5 py-3.5">Продукция</th>
                        <th className="px-5 py-3.5">Вес</th>
                        <th className="px-5 py-3.5">Упаковка</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map(r => (
                        <tr key={r.code} className="border-b border-hairline last:border-0 hover:bg-white/[0.03]">
                          <td className="whitespace-nowrap px-5 py-3.5 font-mono">{r.code}</td>
                          <td className="px-5 py-3.5">{r.product}</td>
                          <td className="whitespace-nowrap px-5 py-3.5">{r.weight}</td>
                          <td className="px-5 py-3.5">{r.package}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {(result.kind === 'code-miss' || result.kind === 'inn-miss') && (
              <div className="rounded-[1.6rem] border border-laser/30 bg-laser/[0.06] p-7">
                <h2 className="font-display text-lg font-medium text-snow">Не найдено в выборке</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog">
                  {result.kind === 'code-miss'
                    ? `Код ${result.code} отсутствует в демо-выборке.`
                    : `По ИНН ${result.inn} записей в демо-выборке нет.`}{' '}
                  {DEMO_MODE && 'На рабочем сервере поиск идёт по полному реестру палаты.'}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
