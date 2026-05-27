'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const cases = [
  {
    label: 'Korekta Lakieru — Porsche 911',
    before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000&q=85',
    after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=85',
    description: 'Three-stage machine polish + powłoka ceramiczna 9H',
  },
  {
    label: 'Detailing Wnętrza — BMW M5',
    before: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1000&q=85',
    after: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1000&q=85',
    description: 'Kompletny detailing wnętrza + impregnacja skóry',
  },
  {
    label: 'Folia PPF — Ferrari F8',
    before: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1000&q=85',
    after: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1000&q=85',
    description: 'Pełna folia PPF XPEL Ultimate Plus',
  },
]

function Slider({ before, after }: { before: string; after: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      updatePosition(e.clientX)
    },
    [isDragging, updatePosition]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX)
    },
    [updatePosition]
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] rounded-sm overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* After (base) */}
      <div className="absolute inset-0">
        <Image
          src={after}
          alt="Po detailingu"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-admato-cyan text-black text-xs font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm">
            Po
          </span>
        </div>
      </div>

      {/* Before (clip) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt="Przed detailingiem"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm border border-white/20">
            Przed
          </span>
        </div>
        {/* Overlay darkening for "before" */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Line */}
        <div className="absolute top-0 bottom-0 w-px bg-white/80" />

        {/* Handle circle */}
        <motion.div
          className="relative w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center z-10"
          whileHover={{ scale: 1.1 }}
          animate={{ scale: isDragging ? 1.15 : 1 }}
        >
          <div className="flex items-center gap-0.5">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M6 1L2 7L6 13" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M2 1L6 7L2 13" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="glass text-white/50 text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm font-mono">
          Przeciągnij
        </span>
      </div>
    </div>
  )
}

export function BeforeAfter() {
  const [activeCase, setActiveCase] = useState(0)
  const current = cases[activeCase]

  return (
    <section id="przed-po" className="relative bg-black section-padding">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-admato-dark/50 to-black pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="badge mx-auto mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-admato-cyan" />
            Efekty
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-6">
            Przed &amp; Po
          </h2>
          <p className="text-white/40 font-light text-base md:text-lg max-w-lg mx-auto">
            Efekty mówią same za siebie. Każda realizacja to historia transformacji.
          </p>
        </motion.div>

        {/* Case selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {cases.map((c, i) => (
            <button
              key={c.label}
              onClick={() => setActiveCase(i)}
              className={`px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-light tracking-wider transition-all duration-300 rounded-sm text-center ${
                activeCase === i
                  ? 'bg-admato-cyan text-black font-medium'
                  : 'glass text-white/50 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Slider */}
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <Slider before={current.before} after={current.after} />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center text-white/35 text-sm font-light mt-6 font-mono tracking-wider"
          >
            {current.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
