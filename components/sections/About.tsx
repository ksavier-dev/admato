'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import Image from 'next/image'
import { Award, Target, Zap } from 'lucide-react'

const stats = [
  { value: 500, suffix: '+', label: 'Zrealizowanych projektów', decimals: 0 },
  { value: 8, suffix: ' lat', label: 'Na rynku detailingu', decimals: 0 },
  { value: 99.8, suffix: '%', label: 'Zadowolonych klientów', decimals: 1 },
  { value: 47, suffix: '', label: 'Marek samochodów', decimals: 0 },
]

const timeline = [
  {
    year: '2016',
    title: 'Narodziny ADMATO',
    description: 'Zaczynaliśmy jako małe studio z wielką pasją do motoryzacji i obsesją na punkcie perfekcji.',
  },
  {
    year: '2018',
    title: 'Certyfikacja GYEON',
    description: 'Uzyskaliśmy autoryzację od wiodących producentów powłok ceramicznych. Pierwsi w Polsce.',
  },
  {
    year: '2020',
    title: 'Własny showroom',
    description: 'Otwarcie dedykowanego studia detailingowego — 600m² przestrzeni dla najwyjątkowych aut.',
  },
  {
    year: '2022',
    title: 'TOP 3 w Polsce',
    description: 'Uznanie przez branżowe media i klientów za jedno z najlepszych studiów detailingowych w kraju.',
  },
  {
    year: '2024',
    title: 'Ekspansja premium',
    description: 'Otwarcie VIP lounge i wprowadzenie usług dla kolekcjonerów i flot luksusowych pojazdów.',
  },
]

const values = [
  {
    icon: Target,
    title: 'Obsesja na punkcie detalu',
    description: 'Każdy milimetr lakieru, każdy szew tapicerki — traktujemy z taką samą uwagą jak rzemieślnik tworzący arcydzieło.',
  },
  {
    icon: Award,
    title: 'Tylko najlepsze materiały',
    description: 'Używamy wyłącznie produktów klasy premium: GYEON, XPEL, Cquartz, Meguiar\'s Professional.',
  },
  {
    icon: Zap,
    title: 'Transparentność i szybkość',
    description: 'Jasna wycena, regularna komunikacja, dotrzymywanie terminów. Twój czas jest dla nas równie cenny.',
  },
]

function StatCounter({ stat, delay }: { stat: typeof stats[number]; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="font-display text-5xl md:text-6xl font-black text-white mb-2 tabular-nums tracking-tight">
        {inView ? (
          <CountUp
            end={stat.value}
            duration={2.5}
            delay={delay}
            decimals={stat.decimals}
            suffix={stat.suffix}
            useEasing
          />
        ) : (
          <span>0{stat.suffix}</span>
        )}
      </div>
      <div className="font-mono text-xs tracking-[0.25em] text-white/35 uppercase max-w-[140px]">
        {stat.label}
      </div>
    </div>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section ref={sectionRef} id="o-nas" className="relative bg-black overflow-hidden section-padding">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-admato-cyan/3 blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-900/5 blur-[150px]" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="badge mx-auto mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-admato-cyan" />
            Nasza historia
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-6 leading-none">
            O ADMATO
          </h2>
        </motion.div>

        {/* Story + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 md:mb-32">
          {/* Text */}
          <motion.div
            style={{ y: parallaxY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-6">
              <p className="font-display text-2xl md:text-3xl font-light text-white/80 italic leading-relaxed">
                &ldquo;Nie robimy detailingu. Tworzymy arcydzieła.&rdquo;
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-admato-cyan to-transparent" />
              <p className="text-white/65 font-light leading-relaxed text-base md:text-lg">
                ADMATO to nie jest zwykłe myjnia czy warsztat. To studio, gdzie każdy samochód
                traktujemy jak dzieło sztuki wymagające najwyższej uwagi i szacunku. Założone przez
                pasjonatów motoryzacji, budujemy nasze studio na trzech filarach: pasji, precyzji
                i jakości bez kompromisów.
              </p>
              <p className="text-white/55 font-light leading-relaxed text-sm md:text-base">
                Od 8 lat obsługujemy właścicieli Ferrari, Porsche, Lamborghini, McLarena i innych
                wyjątkowych pojazdów. Nasi klienci wracają — bo raz doświadczywszy ADMATO,
                nie wyobrażają sobie innego miejsca dla swojego auta.
              </p>

              <div className="flex flex-col gap-4 pt-4">
                {values.map((v) => (
                  <div key={v.title} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-sm border border-white/08 flex items-center justify-center flex-shrink-0 group-hover:border-admato-cyan/30 transition-colors duration-300">
                      <v.icon size={16} className="text-white/50 group-hover:text-admato-cyan transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white/85 mb-1">{v.title}</div>
                      <div className="text-xs text-white/55 font-light leading-relaxed">{v.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=900&q=90"
                alt="Studio ADMATO"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 left-3 sm:-bottom-6 sm:-left-6 glass border border-white/08 rounded-sm px-5 py-4 sm:px-6 sm:py-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="font-display text-3xl font-bold text-white">8</div>
              <div className="font-mono text-xs text-white/35 tracking-[0.2em] uppercase">lat doświadczenia</div>
            </motion.div>

            {/* Decorative corner */}
            <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-admato-cyan/30 rounded-tr-sm" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-admato-cyan/30 rounded-bl-sm" />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="glass border border-white/06 rounded-sm px-4 md:px-8 py-10 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/06 mb-16 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className={`${i > 0 ? 'pt-8 md:pt-0 md:pl-8' : ''}`}>
              <StatCounter stat={stat} delay={i * 0.15} />
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <motion.h3
            className="font-display text-2xl md:text-3xl font-bold text-gradient text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Nasza droga do perfekcji
          </motion.h3>

          {/* Vertical line */}
          <div className="absolute left-1/2 top-20 bottom-0 w-px bg-gradient-to-b from-admato-cyan/30 via-white/10 to-transparent hidden md:block" />

          <div className="flex flex-col gap-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-center gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="premium-card rounded-sm p-6 inline-block w-full md:max-w-sm">
                    <div className="font-mono text-xs tracking-[0.3em] text-admato-cyan mb-2">{item.year}</div>
                    <div className="font-display text-xl font-bold text-white mb-2">{item.title}</div>
                    <div className="text-white/60 text-sm font-light leading-relaxed">{item.description}</div>
                  </div>
                </div>

                {/* Dot */}
                <div className="hidden md:flex w-4 h-4 rounded-full border-2 border-admato-cyan bg-black flex-shrink-0 relative z-10">
                  <div className="absolute inset-1 rounded-full bg-admato-cyan" />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
