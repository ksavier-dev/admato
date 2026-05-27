'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Krzysztof Malinowski',
    role: 'Właściciel Ferrari F8 Tributo',
    avatar: 'KM',
    rating: 5,
    text: 'Kompletna korekta lakieru i powłoka ceramiczna na moim Ferrari. Efekt absolutnie niesamowity — lakier wygląda lepiej niż ze showroomu. ADMATO to jedyne miejsce, któremu zaufam swoje auto.',
    car: 'Ferrari F8 Tributo',
    service: 'Korekta + Ceramika',
    date: 'Styczeń 2025',
  },
  {
    name: 'Anna Kowalczyk',
    role: 'CEO, właścicielka Porsche Taycan',
    avatar: 'AK',
    rating: 5,
    text: 'Folia PPF na całym aucie zrobiona perfekcyjnie. Zero bąbelków, niewidoczna, a samochód jest teraz bezpieczny na drodze. Obsługa klienta na poziomie pięciogwiazdkowego hotelu. Polecam z całego serca!',
    car: 'Porsche Taycan Turbo S',
    service: 'Folia PPF Full',
    date: 'Marzec 2025',
  },
  {
    name: 'Michał Dąbrowski',
    role: 'Kolekcjoner aut klasycznych',
    avatar: 'MD',
    rating: 5,
    text: 'Mam kolekcję 12 aut i przez ostatnie 3 lata ADMATO obsługuje wszystkie moje pojazdy. Jakość niezmiennie na najwyższym poziomie. Żadne inne studio w Polsce nawet nie zbliża się do ich standardów.',
    car: 'Kolekcja premium',
    service: 'Premium Car Spa',
    date: 'Luty 2025',
  },
  {
    name: 'Robert Wiśniewski',
    role: 'Przedsiębiorca, właściciel McLarena',
    avatar: 'RW',
    rating: 5,
    text: 'Wnętrze mojego McLarena 720S po detailingu wyglądało jak nowe — a auto miało już 80 tys. km. Skóra wypielęgnowana, plastiki odświeżone, dywany jak ze showroomu. Genialny rezultat.',
    car: 'McLaren 720S',
    service: 'Detailing Wnętrza',
    date: 'Kwiecień 2025',
  },
  {
    name: 'Dorota Lewandowska',
    role: 'Architektka wnętrz',
    avatar: 'DL',
    rating: 5,
    text: 'Jako osoba, która zawodowo zajmuje się estetyką i detalem — ADMATO mnie zaskoczyło. Dbałość o szczegóły, transparentność procesu, regularne updates. To nie studio detailingu — to doświadczenie.',
    car: 'Mercedes-AMG GT',
    service: 'Full Detail',
    date: 'Maj 2025',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'text-admato-gold fill-admato-gold' : 'text-white/20'}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <div className="h-full flex flex-col gap-6 glass border border-white/06 rounded-sm p-8 md:p-10 relative overflow-hidden group">
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-admato-cyan/3 blur-[80px] rounded-full" />
      </div>

      {/* Quote icon */}
      <div className="absolute top-6 right-6 text-white/06">
        <Quote size={48} />
      </div>

      {/* Header */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative w-12 h-12 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0 bg-white/5">
          <span className="font-mono text-xs font-bold text-white/60">{t.avatar}</span>
        </div>
        <div>
          <div className="font-medium text-white text-sm">{t.name}</div>
          <div className="text-white/35 text-xs font-light font-mono">{t.role}</div>
        </div>
      </div>

      <StarRating rating={t.rating} />

      {/* Quote */}
      <blockquote className="flex-1 text-white/55 font-light leading-relaxed text-sm md:text-base italic">
        &ldquo;{t.text}&rdquo;
      </blockquote>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/06">
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase mb-1">Usługa</div>
          <div className="text-xs text-admato-cyan/80">{t.service}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase mb-1">Data</div>
          <div className="text-xs text-white/35 font-mono">{t.date}</div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, next])

  const visibleCount = 3
  const visible = Array.from({ length: visibleCount }, (_, i) => {
    return testimonials[(current + i) % testimonials.length]
  })

  return (
    <section id="opinie" className="relative bg-black section-padding overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-admato-purple/4 blur-[180px]" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="badge mx-auto mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-admato-cyan" />
            Opinie klientów
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-6">
            Co mówią klienci
          </h2>
          <p className="text-white/40 font-light text-base md:text-lg max-w-lg mx-auto">
            Ponad 500 zrealizowanych projektów i setki zadowolonych właścicieli wyjątkowych aut.
          </p>

          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-admato-gold fill-admato-gold" />
              ))}
            </div>
            <span className="font-display text-2xl font-bold text-white">5.0</span>
            <span className="text-white/30 text-sm font-mono">/ 5.0 · 200+ opinii</span>
          </div>
        </motion.div>

        {/* Carousel — desktop: 3 cards, mobile: 1 */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
            <AnimatePresence mode="popLayout">
              {visible.map((t, i) => (
                <motion.div
                  key={`${t.name}-${current}`}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={{ opacity: i === 0 ? 1 : i === 1 ? 0.85 : 0.65, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={`${i > 0 ? 'hidden md:block' : ''} ${i > 1 ? 'md:hidden xl:block' : ''}`}
                >
                  <TestimonialCard t={t} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass border border-white/08 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-1.5 bg-admato-cyan'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass border border-white/08 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-10 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {['GYEON Certified', 'XPEL Authorized', 'Detailing World', 'Auto Bild TOP 10'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-white/25 font-mono text-xs tracking-[0.2em] uppercase">
              <div className="w-4 h-px bg-white/20" />
              {badge}
              <div className="w-4 h-px bg-white/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
