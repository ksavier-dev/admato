'use client'

import { motion } from 'framer-motion'
import { Sparkles, Shield, Car, Layers, Star, Droplets, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const icons   = [Sparkles, Shield, Car, Layers, Star, Droplets]
const accents = ['#00d4ff', '#7c3aed', '#c9a84c', '#22c55e', '#f43f5e', '#6366f1']

function Card({ i }: { i: number }) {
  const { t } = useLanguage()
  const s = t.services.items[i]
  const Icon = icons[i]
  const accent = accents[i]

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[3px] overflow-hidden"
      data-cursor="hover"
    >
      {/* Border — animated on hover */}
      <div className="absolute inset-0 rounded-[3px] p-px pointer-events-none">
        <div
          className="absolute inset-0 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${accent}26 0%, transparent 60%)` }}
        />
      </div>

      {/* Card body */}
      <div className="service-card-body relative h-full bg-black border border-white/[0.09] rounded-[3px] p-7 flex flex-col gap-5 group-hover:border-white/[0.16] transition-all duration-500 group-hover:-translate-y-1">

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[3px]"
          style={{ background: `radial-gradient(circle at 25% 20%, ${accent}0f, transparent 65%)` }}
          aria-hidden
        />

        {/* Icon */}
        <div className="relative w-12 h-12 rounded-[3px] border border-white/[0.07] bg-white/[0.025] flex items-center justify-center group-hover:border-white/[0.14] transition-colors duration-500">
          <Icon size={19} className="text-white/50 group-hover:text-white transition-colors duration-500" />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="font-display text-[1.12rem] font-bold text-white mb-2.5 group-hover:text-gradient transition-all duration-300 leading-snug">
            {s.title}
          </h3>
          <p className="text-white/55 text-[0.84rem] leading-relaxed font-light mb-5">
            {s.desc}
          </p>
          <ul className="flex flex-col gap-1.5">
            {s.tags.map(tag => (
              <li key={tag} className="flex items-center gap-2.5 text-[0.75rem] text-white/30 font-light">
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: accent + 'a0' }} />
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div>
          <div className="w-full h-px bg-white/[0.09] mb-4 group-hover:bg-white/[0.14] transition-colors duration-500" />
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="font-mono text-[0.58rem] tracking-[0.25em] text-white/22 uppercase mb-0.5">{t.services.price_label}</div>
              <div className="font-display text-[1.18rem] font-bold text-white leading-none">{s.price}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[0.58rem] tracking-[0.25em] text-white/22 uppercase mb-0.5">{t.services.time_label}</div>
              <div className="font-mono text-[0.78rem] text-white/50">{s.time}</div>
            </div>
          </div>
          <a
            href="#rezerwacja"
            className="flex items-center justify-center gap-2 w-full h-9 rounded-[2px] border border-white/[0.07] text-[0.7rem] font-mono tracking-[0.14em] uppercase text-white/35 hover:text-white hover:border-white/20 transition-all duration-300 group/cta"
          >
            {t.services.book_cta}
            <ArrowRight size={11} className="group-hover/cta:translate-x-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Light sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden rounded-[3px] pointer-events-none" aria-hidden>
          <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out" />
        </div>
      </div>
    </motion.article>
  )
}

export function Services() {
  const { t } = useLanguage()

  return (
    <section id="uslugi" className="relative bg-black section-padding">
      <div className="absolute inset-0 mesh-bg pointer-events-none" aria-hidden />

      <div className="relative max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="badge mx-auto mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-admato-cyan shrink-0" />
            {t.services.badge}
          </div>
          <h2 className="font-display font-bold text-gradient leading-none mb-5"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}>
            {t.services.title}
          </h2>
          <p className="text-white/55 font-light text-base md:text-lg max-w-[36rem] mx-auto leading-relaxed">
            {t.services.desc}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {icons.map((_, i) => <Card key={i} i={i} />)}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <p className="text-white/25 text-sm font-light mb-4">{t.services.custom_q}</p>
          <a
            href="#rezerwacja"
            className="inline-flex items-center gap-1.5 text-admato-cyan text-[0.78rem] font-mono tracking-[0.18em] uppercase border-b border-admato-cyan/30 hover:border-admato-cyan pb-px transition-colors duration-300"
          >
            {t.services.custom_cta}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
