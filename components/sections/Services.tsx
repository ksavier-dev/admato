'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Shield, Car, Layers, Star, Droplets } from 'lucide-react'

const services = [
  {
    icon: Sparkles,
    title: 'Korekta Lakieru',
    desc: 'Usuwamy rysy, wiry polerskie i inne defekty wieloetapową metodą maszynową. Lakier jak lustro — bez kompromisów.',
    price: 'od 2 500 zł',
    time: '1–3 dni',
    tags: ['Single-stage', 'Two-stage', 'Three-stage perfection'],
    accent: '#00d4ff',
  },
  {
    icon: Shield,
    title: 'Powłoki Ceramiczne',
    desc: 'Autoryzowana aplikacja powłok 9H. Ochrona na lata, efekt hydrofobowy i głęboki blask na co dzień.',
    price: 'od 3 500 zł',
    time: '2–4 dni',
    tags: ['GYEON · Cquartz · Kamikaze', 'Gwarancja 5 lat', 'Cert. aplikator'],
    accent: '#7c3aed',
  },
  {
    icon: Car,
    title: 'Detailing Wnętrza',
    desc: 'Głęboka pielęgnacja tapicerki, skóry, plastiku i dywaników. Efekt showroomowy — zero niedopracowania.',
    price: 'od 800 zł',
    time: '4–8 h',
    tags: ['Ekstrakcja tapicerki', 'Leather care', 'Ozonowanie'],
    accent: '#c9a84c',
  },
  {
    icon: Layers,
    title: 'Folie PPF',
    desc: 'Niewidoczna tarcza Paint Protection Film z efektem samoleczenia. Ochrona przed kamieniami i zarysowaniami.',
    price: 'od 5 000 zł',
    time: '3–7 dni',
    tags: ['XPEL · SunTek · Hexis', 'Self-healing', 'Gwarancja 10 lat'],
    accent: '#22c55e',
  },
  {
    icon: Star,
    title: 'Przygotowanie do Sprzedaży',
    desc: 'Kompleksowe odświeżenie przed wystawieniem. Podnosimy wartość rynkową i robimy profesjonalną dokumentację.',
    price: 'od 1 200 zł',
    time: '1–2 dni',
    tags: ['Foto 360°', 'Ocena lakieru', 'Full detail ext/int'],
    accent: '#f43f5e',
  },
  {
    icon: Droplets,
    title: 'Premium Car Spa',
    desc: 'Miesięczny program pielęgnacyjny — Twoje auto zawsze w doskonałej kondycji. Priorytetowe terminy.',
    price: 'od 400 zł / mies.',
    time: 'Abonament',
    tags: ['Comiesięczna sesja', 'Dedykowany opiekun', 'Priorytet'],
    accent: '#6366f1',
  },
]

function Card({ s, i }: { s: typeof services[0]; i: number }) {
  const Icon = s.icon
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
          style={{ background: `linear-gradient(135deg, ${s.accent}26 0%, transparent 60%)` }}
        />
      </div>

      {/* Card body */}
      <div className="relative h-full bg-[#0b0b0b] border border-white/[0.055] rounded-[3px] p-7 flex flex-col gap-5 group-hover:border-white/[0.1] transition-all duration-500 group-hover:-translate-y-1">

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[3px]"
          style={{ background: `radial-gradient(circle at 25% 20%, ${s.accent}0f, transparent 65%)` }}
          aria-hidden
        />

        {/* Icon */}
        <div className="relative w-12 h-12 rounded-[3px] border border-white/[0.07] bg-white/[0.025] flex items-center justify-center group-hover:border-white/[0.14] transition-colors duration-500">
          <Icon size={19} className="text-white/50 group-hover:text-white transition-colors duration-500" />
          {/* Subtle pulse ring */}
          <div
            className="absolute inset-0 rounded-[3px] opacity-0 group-hover:animate-[pulse-ring_1.5s_ease-out_forwards]"
            style={{ boxShadow: `0 0 0 0 ${s.accent}50` }}
            aria-hidden
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="font-display text-[1.12rem] font-bold text-white mb-2.5 group-hover:text-gradient transition-all duration-300 leading-snug">
            {s.title}
          </h3>
          <p className="text-white/40 text-[0.84rem] leading-relaxed font-light mb-5">
            {s.desc}
          </p>
          <ul className="flex flex-col gap-1.5">
            {s.tags.map(t => (
              <li key={t} className="flex items-center gap-2.5 text-[0.75rem] text-white/30 font-light">
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: s.accent + 'a0' }} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div>
          <div className="w-full h-px bg-white/[0.055] mb-4 group-hover:bg-white/[0.09] transition-colors duration-500" />
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-[0.58rem] tracking-[0.25em] text-white/22 uppercase mb-0.5">Cena</div>
              <div className="font-display text-[1.05rem] font-bold text-white">{s.price}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[0.58rem] tracking-[0.25em] text-white/22 uppercase mb-0.5">Czas</div>
              <div className="font-mono text-[0.78rem] text-white/50">{s.time}</div>
            </div>
          </div>
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
            Co robimy
          </div>
          <h2 className="font-display font-bold text-gradient leading-none mb-5"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}>
            Nasze Usługi
          </h2>
          <p className="text-white/38 font-light text-base md:text-lg max-w-[36rem] mx-auto leading-relaxed">
            Każda usługa realizowana z obsesyjną dbałością o detal — wyłącznie premium materiały
            i sprawdzone technologie.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {services.map((s, i) => <Card key={s.title} s={s} i={i} />)}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <p className="text-white/25 text-sm font-light mb-4">Masz niestandardowe zapytanie?</p>
          <a
            href="#rezerwacja"
            className="inline-flex items-center gap-1.5 text-admato-cyan text-[0.78rem] font-mono tracking-[0.18em] uppercase border-b border-admato-cyan/30 hover:border-admato-cyan pb-px transition-colors duration-300"
          >
            Napisz do nas →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
