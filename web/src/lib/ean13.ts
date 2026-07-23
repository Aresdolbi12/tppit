/* Честный EAN-13: L/G/R-паттерны, контрольная цифра по GS1. */

const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011']
const G = ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111']
const PARITY = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL']
const R = L.map(p => p.split('').map(b => (b === '1' ? '0' : '1')).join(''))

export function checkDigit(d12: string): string {
  let s = 0
  for (let i = 0; i < 12; i++) s += +d12[i] * (i % 2 ? 3 : 1)
  return String((10 - (s % 10)) % 10)
}

export function isValidEan13(digits: string): boolean {
  return /^\d{13}$/.test(digits) && checkDigit(digits.slice(0, 12)) === digits[12]
}

export interface BarModule {
  x: number
  tall: boolean
}

/* Модули для (возможно неполного) кода в модульных координатах. */
export function modules(digits: string): BarModule[] {
  const mods: BarModule[] = []
  let x = 0
  const push = (bits: string, tall = false) => {
    for (let j = 0; j < bits.length; j++, x++) {
      if (bits[j] === '1') mods.push({ x, tall })
    }
  }
  push('101', true)
  const parity = PARITY[+(digits[0] ?? '4')]
  for (let i = 1; i <= 6; i++) {
    const d = digits[i]
    if (d === undefined) { x += 7; continue }
    push((parity[i - 1] === 'L' ? L : G)[+d])
  }
  push('01010', true)
  for (let i = 7; i <= 12; i++) {
    const d = digits[i]
    if (d === undefined) { x += 7; continue }
    push(R[+d])
  }
  push('101', true)
  return mods
}

/* Случайный валидный код с префиксом 46 (Россия). */
export function randomEan13(): string {
  let d = '46'
  for (let i = 0; i < 10; i++) d += Math.floor(Math.random() * 10)
  return d + checkDigit(d)
}
