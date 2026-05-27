'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Menu, X, Phone, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Usługi',    href: '#uslugi' },
  { label: 'Showroom',  href: '#doswiadczenie' },
  { label: 'Galeria',   href: '#galeria' },
  { label: 'O nas',     href: '#o-nas' },
  { label: 'Opinie',    href: '#opinie' },
]

function NavLink({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const move = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width  / 2) * 0.22}px,
                                     ${(e.clientY - r.top  - r.height / 2) * 0.22}px)`
  }
  const leave = () => { if (ref.current) ref.current.style.transform = '' }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      className="relative font-light text-[0.77rem] tracking-[0.16em] uppercase text-white/50 hover:text-white transition-colors duration-300 animated-underline"
      style={{ transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1), color 0.3s' }}
    >
      {label}
    </a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => scrollY.on('change', v => setScrolled(v > 60)), [scrollY])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Main bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 inset-x-0 z-[9000] transition-[padding] duration-500',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        {/* Glass backdrop */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-700',
            scrolled
              ? 'bg-black/75 backdrop-blur-2xl border-b border-white/[0.05]'
              : 'bg-transparent'
          )}
        />

        <div className="relative max-w-screen-2xl mx-auto px-5 lg:px-10 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">
            <div className="relative w-8 h-8 border border-white/12 rounded-[3px] flex items-center justify-center shrink-0 group-hover:border-admato-cyan/35 transition-colors duration-500">
              <span className="font-display text-[0.95rem] font-bold text-white">A</span>
              <span className="absolute -top-px -right-px w-[7px] h-[7px] border-t border-r border-admato-cyan/50 rounded-tr-sm" />
              <span className="absolute -bottom-px -left-px w-[7px] h-[7px] border-b border-l border-admato-cyan/50 rounded-bl-sm" />
            </div>
            <div className="leading-none">
              <div className="font-display text-[1.05rem] font-bold tracking-[0.22em] text-white">ADMATO</div>
              <div className="font-mono text-[0.52rem] tracking-[0.38em] text-white/30 uppercase">Detailing</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map(l => <NavLink key={l.href} {...l} />)}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+48500000000"
              className="hidden md:flex items-center gap-2 text-[0.78rem] text-white/40 hover:text-white/80 transition-colors duration-300 font-mono"
            >
              <Phone size={12} />
              +48 500 000 000
            </a>

            <a
              href="#rezerwacja"
              className="hidden lg:flex items-center h-9 px-5 text-[0.72rem] tracking-[0.2em] uppercase border border-admato-cyan/35 text-admato-cyan hover:bg-admato-cyan hover:text-black transition-all duration-300 rounded-[3px] font-medium"
            >
              Umów wizytę
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="lg:hidden w-9 h-9 flex items-center justify-center border border-white/08 rounded-[3px] hover:border-white/20 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open
                  ? <motion.div key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={16} /></motion.div>
                  : <motion.div key="ham" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={16} /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[8900] flex flex-col bg-black"
            initial={{ clipPath: 'circle(0% at calc(100% - 52px) 44px)' }}
            animate={{ clipPath: 'circle(160% at calc(100% - 52px) 44px)' }}
            exit={{   clipPath: 'circle(0%   at calc(100% - 52px) 44px)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 mesh-bg pointer-events-none" />

            {/* Nav links */}
            <div className="relative flex flex-col justify-center flex-1 px-8 pt-24 pb-8 gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0,   opacity: 1 }}
                  exit={{    x: -30, opacity: 0 }}
                  transition={{ delay: i * 0.055 + 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[2.2rem] font-semibold text-white/75 hover:text-white transition-colors py-1.5 border-b border-white/[0.05]"
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.a
                href="#rezerwacja"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.45 }}
                className="mt-8 flex items-center justify-center h-14 border border-admato-cyan/40 text-admato-cyan text-sm tracking-[0.2em] uppercase font-medium rounded-[3px]"
              >
                Umów wizytę
              </motion.a>
            </div>

            {/* Footer contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative px-8 pb-10 flex flex-col gap-3"
            >
              <div className="w-full h-px bg-white/[0.07] mb-2" />
              {[
                { icon: Phone,  val: '+48 500 000 000',          href: 'tel:+48500000000' },
                { icon: MapPin, val: 'ul. Motorsport 7, Warszawa', href: '#' },
              ].map(({ icon: Icon, val, href }) => (
                <a key={val} href={href} className="flex items-center gap-3 text-white/35 hover:text-white/60 transition-colors">
                  <Icon size={13} />
                  <span className="font-mono text-xs tracking-wide">{val}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
