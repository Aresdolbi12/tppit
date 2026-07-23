/* Реестр: на GitHub Pages работаем по демо-выборке.
   В проде вместо этого модуля — запрос к API палаты (MySQL-реестр, 31 650 кодов). */

import raw from '../data/codes.json'

export interface RegistryRow {
  inn: string
  code: string
  product: string
  weight: string
  package: string
  organisation: string
  adress: string
  phone?: string
  email?: string
}

const rows = raw as RegistryRow[]

export const REGISTRY_TOTAL = 31650
export const DEMO_MODE = true

export const digitsOnly = (s: string) => s.replace(/\D+/g, '')

export const findByCode = (code: string): RegistryRow | undefined =>
  rows.find(r => r.code === code)

export const findByInn = (inn: string): RegistryRow[] =>
  rows.filter(r => r.inn === inn).sort((a, b) => a.code.localeCompare(b.code))

export const demoCodes = rows.map(r => r.code)

/* Тарифы 2026 (kuban.tpprf.ru/ru/services/42032, НДС 22%). */
export interface Tariff {
  name: string
  count: number
  price: number
}

export const TARIFFS: Tariff[] = [
  { name: 'Лайт', count: 10, price: 6100 },
  { name: 'Классик', count: 30, price: 9760 },
  { name: 'Сильвер', count: 50, price: 12200 },
  { name: 'Голд', count: 100, price: 14640 },
  { name: 'Оптимум', count: 500, price: 17080 },
  { name: 'Платинум', count: 1000, price: 18300 },
  { name: 'Максимум', count: 5000, price: 24400 },
]

export const OVERAGE_PER_CODE = 488
export const MEMBER_DISCOUNT = 0.10

export interface Quote {
  tariff: Tariff
  overage: number
  total: number
  perCode: number
}

/* Оптимальный тариф на количество кодов: минимальная итоговая цена. */
export function bestQuote(count: number, member = false): Quote | null {
  if (count < 1) return null
  let best: Quote | null = null
  for (const t of TARIFFS) {
    const overage = Math.max(0, count - t.count) * OVERAGE_PER_CODE
    let total = t.price + overage
    if (member) total *= 1 - MEMBER_DISCOUNT
    total = Math.round(total)
    if (!best || total < best.total) {
      best = { tariff: t, overage, total, perCode: Math.round(total / count) }
    }
  }
  return best
}

export const fmt = (n: number) => n.toLocaleString('ru-RU')
