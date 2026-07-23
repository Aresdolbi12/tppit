import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Barcode from './Barcode'
import { randomEan13 } from '../lib/ean13'

/* Сцена сканера: код, красный лазер, вердикт реестра. Фирменный момент сайта. */
export default function ScannerCard() {
  const reduced = useReducedMotion()
  const [digits, setDigits] = useState('4601234567893')
  const [phase, setPhase] = useState<'idle' | 'scan' | 'ok'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const scan = useCallback((next?: string) => {
    clearTimeout(timer.current)
    if (next) setDigits(next)
    if (reduced) { setPhase('ok'); return }
    setPhase('scan')
    timer.current = setTimeout(() => setPhase('ok'), 1400)
  }, [reduced])

  useEffect(() => {
    const t = setTimeout(() => scan(), 700)
    return () => { clearTimeout(t); clearTimeout(timer.current) }
  }, [scan])

  return (
    <div className="rounded-[2rem] border border-hairline bg-white/[0.04] p-2 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[linear-gradient(160deg,#f6f8fb,#e9eef5)] px-7 pb-6 pt-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
        {/* шапка «этикетки» */}
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5f6b76]">
            Реестр ИСАИ ТПП КК
          </span>
          <AnimatePresence mode="wait">
            {phase === 'ok' ? (
              <motion.span
                key="ok"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                className="flex items-center gap-1.5 rounded-full bg-[#128a5c]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0f7a51]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#12a06a]" />
                зарегистрирован
              </motion.span>
            ) : (
              <motion.span
                key="wait"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8fa0b3]"
              >
                {phase === 'scan' ? 'сканирование…' : 'ожидание'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <Barcode digits={digits} color="#101826" className="w-full" />
          {/* красный лазер */}
          <AnimatePresence>
            {phase === 'scan' && !reduced && (
              <motion.div
                key="laser"
                className="pointer-events-none absolute inset-y-[-4%] w-[2px] rounded-full bg-laser shadow-[0_0_14px_2px_rgba(255,77,77,0.65)]"
                initial={{ left: '2%', opacity: 0 }}
                animate={{ left: ['2%', '96%', '30%', '78%'], opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.35, ease: 'easeInOut', times: [0, 0.45, 0.75, 1] }}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-[11px] text-[#5f6b76]">EAN-13 · префикс 46 · GS1-чексумма</span>
          <button
            onClick={() => scan(randomEan13())}
            className="group flex items-center gap-1.5 rounded-full border border-[#101826]/15 px-3 py-1.5 font-mono text-[11px] text-[#101826] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#101826] hover:text-white active:scale-[0.97]"
          >
            новый код
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-180">⟳</span>
          </button>
        </div>
      </div>
    </div>
  )
}
