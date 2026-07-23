import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PARENT_SITE } from '../lib/site'

const LINKS = [
  { to: '/proverka', label: 'Проверка кода' },
  { to: '/tarify', label: 'Тарифы' },
  { to: '/uslugi', label: 'Услуги' },
  { to: '/novosti', label: 'Новости' },
  { to: '/kontakty', label: 'Контакты' },
]

function Mercury({ className }: { className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}mercury.svg`}
      alt=""
      className={className}
      width={44}
      height={22}
    />
  )
}

/* Плавающая стеклянная пилюля навигации. */
export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
        <header className="pointer-events-auto flex w-full max-w-4xl items-center gap-1 rounded-full border border-hairline-2 bg-[rgba(10,18,32,0.72)] py-1.5 pl-4 pr-1.5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          <Link to="/" className="mr-auto flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <Mercury className="h-6 w-auto opacity-90" />
            <span className="font-display text-[11px] font-medium uppercase tracking-[0.14em] text-snow whitespace-nowrap">
              ТПП <span className="text-pulse">·</span> штрих-коды
            </span>
          </Link>

          <nav className="hidden items-center md:flex" aria-label="Основная навигация">
            {LINKS.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-2 text-[13px] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isActive ? 'bg-white/10 text-snow' : 'text-fog hover:text-snow'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/tarify"
            className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-pulse py-2 pl-4 pr-1.5 text-[13px] font-medium text-void transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] lg:flex"
          >
            Получить коды
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-void/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
              ↗
            </span>
          </Link>

          {/* Гамбургер-морф */}
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-hairline md:hidden"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span
              className={`absolute h-px w-4 bg-snow transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? 'rotate-45' : '-translate-y-[3.5px]'
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-snow transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? '-rotate-45' : 'translate-y-[3.5px]'
              }`}
            />
          </button>
        </header>
      </div>

      {/* Мобильное меню — стеклянный оверлей со стаггером */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-20 flex flex-col justify-center bg-[rgba(6,10,18,0.88)] px-8 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {[...LINKS, { to: '/', label: 'Главная' }].map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-2xl text-snow"
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.a
              href={PARENT_SITE}
              rel="noopener"
              className="mt-8 text-sm text-fog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              kuban.tpprf.ru — основной сайт палаты ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
