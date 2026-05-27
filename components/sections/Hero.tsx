'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

/* ─────────── Particle canvas ─────────── */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type P = { x: number; y: number; vx: number; vy: number; r: number; o: number; rgb: string }
    const pts: P[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.1 + 0.25,
      o: Math.random() * 0.35 + 0.05,
      rgb: ['0,212,255', '200,200,200', '255,255,255'][Math.floor(Math.random() * 3)],
    }))

    let mx = canvas.width / 2, my = canvas.height / 2
    const mm = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', mm)

    let raf: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy)
        if (d < 90) { p.vx += (dx / d) * 0.04; p.vy += (dy / d) * 0.04 }
        p.vx *= 0.988; p.vy *= 0.988
        p.x = (p.x + p.vx + canvas.width)  % canvas.width
        p.y = (p.y + p.vy + canvas.height) % canvas.height
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.rgb},${p.o})`
        ctx.fill()
      })
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.hypot(dx, dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(180,180,180,${(1 - d / 120) * 0.07})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', mm) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />
}

/* ─────────── Magnetic button ─────────── */
function MagneticBtn({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28 })
  const sy = useSpring(y, { stiffness: 260, damping: 28 })

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={e => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width  / 2) * 0.28)
        y.set((e.clientY - r.top  - r.height / 2) * 0.28)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileTap={{ scale: 0.96 }}
      className={[
        'group relative inline-flex items-center gap-2.5 h-14 px-9 rounded-sm text-[0.8rem] font-medium tracking-[0.18em] uppercase overflow-hidden select-none',
        primary
          ? 'bg-white text-black'
          : 'border border-white/18 text-white/75 hover:text-white hover:border-white/40',
      ].join(' ')}
    >
      {primary && (
        <span className="absolute inset-0 bg-admato-cyan translate-x-[-102%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
      )}
      <span className="relative flex items-center gap-2.5">
        {children}
        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </motion.a>
  )
}

/* ─────────── Stat chip ─────────── */
function Stat({ val, label }: { val: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-[1.6rem] md:text-[2rem] font-bold text-white leading-none">{val}</span>
      <span className="font-mono text-[0.62rem] tracking-[0.22em] text-white/35 uppercase mt-1">{label}</span>
    </div>
  )
}

/* ─────────── Letter animation variants (outside component to avoid re-creation) ─────────── */
const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06, delayChildren: 1.7 } },
}
const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  show:   { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
}

/* ─────────── Hero ─────────── */
export function Hero() {
  const wrapRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end start'] })
  const yContent  = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opContent = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const bgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.07])

  const letters = 'ADMATO'.split('')

  return (
    <section
      ref={wrapRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Particles */}
      <Particles />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[20%] left-[20%] w-[520px] h-[520px] rounded-full bg-admato-cyan/[0.035] blur-[160px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[360px] h-[360px] rounded-full bg-purple-900/[0.08]  blur-[130px]" />
      </div>

      {/* Cinematic background image */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }} aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80)',
            filter: 'brightness(0.07) saturate(0.3)',
          }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" aria-hidden />

      {/* ── CONTENT ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-[90rem] mx-auto w-full"
        style={{ y: yContent, opacity: opContent }}
      >
        {/* Eyebrow badge */}
        <motion.div
          className="badge mb-10 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-admato-cyan animate-pulse shrink-0" />
          Premium Detailing Studio &nbsp;·&nbsp; Warszawa
        </motion.div>

        {/* ADMATO — letters stagger */}
        <div className="overflow-hidden mb-3">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex items-end justify-center"
            style={{ gap: 'clamp(4px, 1.2vw, 20px)' }}
          >
            {letters.map((l, i) => (
              <motion.span
                key={l + i}
                variants={letterVariants}
                className="font-display font-black leading-[0.9] text-white"
                style={{ fontSize: 'clamp(4.2rem, 13.5vw, 11.5rem)', letterSpacing: '-0.025em' }}
              >
                {l}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* DETAILING */}
        <div className="overflow-hidden mb-7">
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono tracking-[0.55em] text-white/50 uppercase"
            style={{ fontSize: 'clamp(0.6rem, 1.4vw, 0.95rem)' }}
          >
            DETAILING
          </motion.p>
        </div>

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="divider-cyan mb-8"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-white/45 mb-14 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)', maxWidth: '32rem' }}
        >
          &ldquo;Perfekcja w każdym detalu&rdquo;
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.85, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3.5"
        >
          <MagneticBtn href="#rezerwacja" primary>Umów wizytę</MagneticBtn>
          <MagneticBtn href="#galeria">Zobacz realizacje</MagneticBtn>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-10 w-full max-w-lg px-4 md:px-6"
      >
        <div className="glass rounded-sm px-4 md:px-7 py-4 md:py-5 flex items-center justify-center gap-4 md:gap-12 divide-x divide-white/[0.07]">
          <Stat val="500+" label="Realizacji" />
          <div className="pl-4 md:pl-12"><Stat val="8 lat" label="Doświadczenia" /></div>
          <div className="pl-4 md:pl-12"><Stat val="5★" label="Ocena" /></div>
          <div className="hidden md:block pl-12"><Stat val="TOP 3" label="W Polsce" /></div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.1, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.4em] text-white/20 uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/20"
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
