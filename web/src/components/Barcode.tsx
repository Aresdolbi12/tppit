import { modules } from '../lib/ean13'

interface Props {
  digits: string
  color?: string
  className?: string
}

/* Честный SVG EAN-13. 95 модулей + свободные зоны. */
export default function Barcode({ digits, color = 'currentColor', className }: Props) {
  const u = 3
  const H = 66
  const TALL = 74
  const TOP = 6
  const pad = 7 * u
  const W = (95 + 14) * u
  const ty = TALL + TOP + 15

  return (
    <svg
      viewBox={`0 0 ${W} ${TALL + 28}`}
      role="img"
      aria-label={`Штрих-код EAN-13${digits.length === 13 ? ' ' + digits : ''}`}
      className={className}
    >
      {modules(digits).map((m, i) => (
        <rect key={i} x={pad + m.x * u} y={TOP} width={u} height={m.tall ? TALL : H} fill={color} />
      ))}
      {digits[0] && (
        <text x={0} y={ty} fontFamily="IBM Plex Mono, monospace" fontSize={13} letterSpacing={2} fill={color}>
          {digits[0]}
        </text>
      )}
      {digits.length > 1 && (
        <text x={pad + 24 * u} y={ty} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={13} letterSpacing={2} fill={color}>
          {digits.slice(1, 7)}
        </text>
      )}
      {digits.length > 7 && (
        <text x={pad + 70 * u} y={ty} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={13} letterSpacing={2} fill={color}>
          {digits.slice(7, 13)}
        </text>
      )}
    </svg>
  )
}
