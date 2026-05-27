'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ArrowUpRight } from 'lucide-react'

const nav = [
  { label: 'Usługi',    href: '#uslugi' },
  { label: 'Showroom',  href: '#doswiadczenie' },
  { label: 'Galeria',   href: '#galeria' },
  { label: 'O nas',     href: '#o-nas' },
  { label: 'Opinie',    href: '#opinie' },
  { label: 'Kontakt',   href: '#rezerwacja' },
]

const services = [
  'Korekta Lakieru', 'Powłoki Ceramiczne',
  'Detailing Wnętrza', 'Folie PPF',
  'Przygotowanie do Sprzedaży', 'Premium Car Spa',
]

const socials = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook,  href: 'https://facebook.com',  label: 'Facebook' },
  { icon: Youtube,   href: 'https://youtube.com',   label: 'YouTube' },
]

const contact = [
  { icon: Phone,  val: '+48 500 000 000',            href: 'tel:+48500000000' },
  { icon: Mail,   val: 'kontakt@admato.pl',           href: 'mailto:kontakt@admato.pl' },
  { icon: MapPin, val: 'ul. Motorsport 7, Warszawa',  href: '#' },
]

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/[0.04] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-admato-cyan/[0.025] blur-[160px] rounded-full pointer-events-none" aria-hidden />

      <div className="relative max-w-screen-xl mx-auto px-6 pt-20 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 xl:gap-14 mb-16">

          {/* Brand col */}
          <motion.div {...fade(0)} className="flex flex-col gap-6">
            {/* Logo */}
            <a href="#" className="group flex items-center gap-3 w-fit">
              <div className="relative w-9 h-9 border border-white/12 rounded-[3px] flex items-center justify-center group-hover:border-admato-cyan/35 transition-colors duration-500">
                <span className="font-display text-[1rem] font-bold text-white">A</span>
                <span className="absolute -top-px -right-px w-[7px] h-[7px] border-t border-r border-admato-cyan/45" />
                <span className="absolute -bottom-px -left-px w-[7px] h-[7px] border-b border-l border-admato-cyan/45" />
              </div>
              <div>
                <div className="font-display text-[1.05rem] font-bold tracking-[0.22em] text-white leading-none">ADMATO</div>
                <div className="font-mono text-[0.52rem] tracking-[0.38em] text-white/30 uppercase">Detailing</div>
              </div>
            </a>

            <p className="text-white/30 text-[0.84rem] font-light leading-relaxed max-w-[240px]">
              Premium studio detailingowe. Obsługujemy wyjątkowe samochody dla wymagających właścicieli od 2016.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[3px] border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav */}
          <motion.div {...fade(0.08)}>
            <h4 className="font-mono text-[0.58rem] tracking-[0.38em] text-white/25 uppercase mb-5">Nawigacja</h4>
            <ul className="space-y-2.5">
              {nav.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-[0.84rem] text-white/38 hover:text-white/75 transition-colors duration-300 font-light animated-underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div {...fade(0.14)}>
            <h4 className="font-mono text-[0.58rem] tracking-[0.38em] text-white/25 uppercase mb-5">Usługi</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <a href="#uslugi" className="text-[0.84rem] text-white/38 hover:text-white/75 transition-colors duration-300 font-light animated-underline">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div {...fade(0.2)}>
            <h4 className="font-mono text-[0.58rem] tracking-[0.38em] text-white/25 uppercase mb-5">Kontakt</h4>
            <ul className="space-y-4 mb-7">
              {contact.map(({ icon: Icon, val, href }) => (
                <li key={val}>
                  <a href={href} className="flex items-start gap-3 group">
                    <Icon size={12} className="text-white/22 group-hover:text-admato-cyan transition-colors duration-300 mt-0.5 shrink-0" />
                    <span className="text-[0.82rem] text-white/38 font-light group-hover:text-white/70 transition-colors duration-300">{val}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#rezerwacja"
              className="flex items-center justify-center gap-2 h-10 border border-admato-cyan/30 text-admato-cyan text-[0.72rem] tracking-[0.2em] uppercase hover:bg-admato-cyan hover:text-black transition-all duration-300 rounded-[3px] font-medium"
            >
              Umów wizytę
              <ArrowUpRight size={12} />
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.04] mb-7" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-1.5">
            <span className="font-mono text-[0.68rem] text-white/18">
              © 2025 ADMATO Detailing. Wszelkie prawa zastrzeżone.
            </span>
            {['Polityka prywatności', 'Regulamin'].map(t => (
              <a key={t} href="#" className="font-mono text-[0.68rem] text-white/18 hover:text-white/45 transition-colors duration-300">{t}</a>
            ))}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-white/22 hover:text-white/55 transition-colors duration-300"
          >
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">Na górę</span>
            <div className="w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-white/22 transition-colors">
              <ArrowUpRight size={11} className="-rotate-45 group-hover:-translate-y-px group-hover:translate-x-px transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Huge ghost text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full text-center" aria-hidden>
        <div
          className="font-display font-black text-white/[0.018] whitespace-nowrap leading-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 15rem)' }}
        >
          ADMATO
        </div>
      </div>
    </footer>
  )
}
