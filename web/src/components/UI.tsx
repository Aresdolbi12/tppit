import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hairline-2 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
      {children}
    </span>
  )
}

export function ArrowCta({ to, children, ghost = false }: { to: string; children: ReactNode; ghost?: boolean }) {
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
