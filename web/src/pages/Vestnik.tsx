import Reveal from '../components/Reveal'
import { Eyebrow } from '../components/UI'
import issues from '../data/vestnik.json'

const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : '')

/* Архив журнала «Вестник ТПП Краснодарского края». Обложки — из PDF-архива
   палаты (5 лет). Сами PDF появятся на боевом сервере (на Pages тяжело — 376 МБ). */
export default function Vestnik() {
  const years = [...new Set(issues.map(i => i.year).filter(Boolean))].sort().reverse()

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-8">
      <Reveal>
        <Eyebrow>издание палаты</Eyebrow>
        <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Вестник ТПП</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
          «Вестник Торгово-промышленной палаты Краснодарского края» — журнал
          делового сообщества: мероприятия палаты, истории кубанских компаний,
          аналитика по отраслям региона. Архив за {years.length} лет — {issues.length} выпусков.
        </p>
      </Reveal>

      {years.map(year => (
        <div key={year}>
          <Reveal className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-pulse">{year}</h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {issues.filter(i => i.year === year).map((i, k) => (
              <Reveal key={i.img} delay={(k % 5) * 0.05}>
                <figure className="group overflow-hidden rounded-[1.2rem] border border-hairline bg-white/[0.02] transition-colors duration-700 hover:border-hairline-2">
                  <div className="overflow-hidden">
                    <img
                      src={import.meta.env.BASE_URL + i.img}
                      alt={`Вестник ТПП КК, ${i.period ? cap(i.period) + ' ' : ''}${i.year}`}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="px-3.5 py-3 font-mono text-[11px] text-fog">
                    {i.period ? cap(i.period) : 'Выпуск'} · {i.year}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      ))}

      <Reveal className="mt-14">
        <p className="rounded-[1.4rem] border border-hairline bg-white/[0.02] p-6 text-[13px] leading-relaxed text-fog">
          Полные PDF-выпуски будут доступны для чтения после переезда сайта
          на боевой сервер. Печатная версия — в палате: г. Краснодар, ул. Трамвайная, 2/6.
        </p>
      </Reveal>
    </section>
  )
}
