import Reveal from '../components/Reveal'
import { Eyebrow } from '../components/UI'
import { PARENT_SITE } from '../lib/site'

/* Сжатая версия kuban.tpprf.ru/ru/region/ (снято 2026-07-23). */
const BLOCKS = [
  {
    title: 'География',
    text: 'Краснодарский край входит в Южный федеральный округ, граничит с Ростовской областью, Ставропольским краем, Карачаево-Черкесией, Адыгеей и Абхазией, по морю — с Крымом. Площадь — 75 485 км², население — около 5,5 млн человек. 45-я параллель делит край примерно на две равные части.',
  },
  {
    title: 'Экономика',
    text: 'Основа экономики — агропромышленный, топливно-энергетический, транспортный и курортно-рекреационный комплексы, машиностроение и производство стройматериалов. В сельском хозяйстве занята четверть работающего населения; сельхозугодья — 4,7 млн га, свыше 3% пашни России.',
  },
  {
    title: 'Чернозёмы и ресурсы',
    text: 'Самый плодородный регион России: более 4% российских и около 2% мировых запасов чернозёмов. В недрах открыто более 60 видов полезных ископаемых — нефть, газ, мергель, мрамор, известняк, йодо-бромные и термальные воды. Сырьевая база оценивается в сотни миллиардов долларов.',
  },
  {
    title: 'Транспорт и инфраструктура',
    text: 'По территории края проходят крупные нефте- и газопроводы российского и международного значения, включая «Каспийский трубопроводный консорциум» и «Голубой поток». Край — комплексный центр оздоровления, отдыха и туризма всероссийского масштаба.',
  },
]

export default function Region() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-8">
      <Reveal>
        <Eyebrow>о регионе</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Краснодарский край
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-fog">
          Кубань — один из ключевых регионов юга России: житница страны,
          морские порты, курорты и мощный агропромышленный комплекс.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        {BLOCKS.map((b, i) => (
          <Reveal key={b.title} delay={(i % 2) * 0.06}>
            <div className="h-full rounded-[2rem] border border-hairline bg-white/[0.03] p-8">
              <h2 className="font-display text-xl font-semibold">{b.title}</h2>
              <p className="mt-3.5 text-sm leading-relaxed text-fog">{b.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10">
        <a
          href={PARENT_SITE + '/ru/region/'}
          rel="noopener"
          className="text-sm text-fog transition-colors hover:text-snow"
        >
          Полная справка о регионе на kuban.tpprf.ru ↗
        </a>
      </Reveal>
    </section>
  )
}
