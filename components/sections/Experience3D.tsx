'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

/* ─────────── Orbiting ring ─────────── */
function Ring({ size, dur, rev, dotColor = 'rgba(0,212,255,0.4)' }: { size: number; dur: number; rev?: boolean; dotColor?: string }) {
  return (
    <motion.div
      className="absolute rounded-full border border-white/[0.035] pointer-events-none"
      style={{ width: size, height: size, top: `calc(50% - ${size / 2}px)`, left: `calc(50% - ${size / 2}px)` }}
      animate={{ rotate: rev ? -360 : 360 }}
      transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
    >
      <div className="absolute w-1.5 h-1.5 rounded-full blur-[1px]"
        style={{ background: dotColor, top: -3, left: '50%', transform: 'translateX(-50%)' }} />
    </motion.div>
  )
}

/* ─────────── Floating spec card ─────────── */
function SpecCard({
  title, sub, detail, floatY, floatX, delay, className = '',
}: { title: string; sub: string; detail: string; floatY: [number, number]; floatX: [number, number]; delay: number; className?: string }) {
  return (
    <motion.div
      className={`absolute hidden md:block glass-dark rounded-sm px-5 py-3.5 min-w-[160px] ${className}`}
      animate={{ y: floatY, x: floatX }}
      transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay }}
      whileHover={{ scale: 1.04 }}
    >
      <div className="font-mono text-[0.58rem] tracking-[0.22em] text-white/25 uppercase mb-0.5">{title}</div>
      <div className="text-[0.82rem] text-white font-light">{sub}</div>
      <div className="font-mono text-[0.65rem] text-admato-cyan/65 mt-0.5">{detail}</div>
    </motion.div>
  )
}

/* ─────────── Main ─────────── */
export function Experience3D() {
  const { t } = useLanguage()
  const sectionRef   = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [light, setLight] = useState({ x: 0, y: 0 })

  const mx = useMotionValue(0), my = useMotionValue(0)
  const springCfg = { stiffness: 70, damping: 22 }
  const sx = useSpring(mx, springCfg), sy = useSpring(my, springCfg)

  const rotateY = useTransform(sx, [-320, 320], [9, -9])
  const rotateX = useTransform(sy, [-220, 220], [-5, 5])
  const imgX  = useTransform(sx, [-320, 320], [-14, 14])
  const imgY  = useTransform(sy, [-220, 220], [-7, 7])
  const badge1X = useTransform(sx, [-320, 320], [7, -7])
  const badge2X = useTransform(sx, [-320, 320], [-7, 7])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY      = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const secOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0])

  useEffect(() => {
    const el = containerRef.current; if (!el) return
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      mx.set(e.clientX - r.left - r.width  / 2)
      my.set(e.clientY - r.top  - r.height / 2)
      setLight({ x: e.clientX - r.left, y: e.clientY - r.top })
    }
    const leave = () => { mx.set(0); my.set(0) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [mx, my])

  return (
    <motion.section
      ref={sectionRef}
      id="doswiadczenie"
      className="force-dark relative bg-black overflow-hidden"
      style={{ opacity: secOpacity }}
    >
      {/* Ambient */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#060810]/70 to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-admato-cyan/[0.025] blur-[160px] rounded-full" />
      </motion.div>

      {/* Decorative rings — hidden on mobile for performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block" aria-hidden>
        <Ring size={520}  dur={55}  />
        <Ring size={740}  dur={80}  rev dotColor="rgba(124,58,237,0.3)" />
        <Ring size={960}  dur={110} />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-28 pb-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="badge mx-auto mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-admato-cyan animate-pulse shrink-0" />
            {t.showroom.badge}
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-4 leading-none">
            {t.showroom.title}
          </h2>
          <p className="text-white/55 font-light text-base md:text-lg max-w-[38rem] mx-auto leading-relaxed">
            <span className="hidden md:inline">{t.showroom.desc_desktop}</span>
            <span className="md:hidden">{t.showroom.desc_mobile}</span>
            {' '}{t.showroom.desc_rest}
          </p>
        </motion.div>
      </div>

      {/* Interactive car zone */}
      <div
        ref={containerRef}
        className="relative z-10 w-full flex items-center justify-center px-6"
        style={{ height: 'clamp(300px, 58vh, 600px)', perspective: '1100px' }}
      >
        {/* Cursor light */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{ background: `radial-gradient(500px circle at ${light.x}px ${light.y}px, rgba(0,212,255,0.055), transparent 55%)` }}
          aria-hidden
        />

        {/* Ground glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-16 bg-admato-cyan/[0.03] blur-3xl rounded-full pointer-events-none" aria-hidden />

        {/* Car block */}
        <motion.div
          style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-[860px]"
        >
          {/* Shadow under car */}
          <motion.div
            style={{ x: imgX, y: imgY }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-black/70 blur-2xl rounded-full"
            aria-hidden
          />

          {/* Car image */}
          <motion.div
            style={{ aspectRatio: '16 / 6.5', x: imgX, y: imgY }}
            className="relative w-full overflow-hidden rounded-sm"
          >
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=90"
              alt="Porsche 911 po korekcji lakieru — ADMATO Detailing"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 860px"
            />
            {/* Gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/[0.04]" aria-hidden />
            {/* Light streak */}
            <motion.div
              className="absolute inset-y-0 w-[20%] bg-gradient-to-r from-transparent via-white/[0.045] to-transparent skew-x-[-12deg]"
              animate={{ x: ['-120%', '700%'] }}
              transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
              aria-hidden
            />
          </motion.div>

          {/* Spec card — top left */}
          <SpecCard
            title={t.showroom.last_job}
            sub="Porsche 992 GT3 RS"
            detail="Ceramika 9H · PPF Full"
            floatY={[0, -10]}
            floatX={[0, 3]}
            delay={0}
            className="-top-5 left-4"
          />

          {/* Color chip — bottom left */}
          <motion.div
            style={{ x: badge2X }}
            className="absolute -bottom-4 left-4 hidden md:flex items-center gap-3 glass-dark rounded-sm px-4 py-2.5"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <div className="w-4 h-4 rounded-[2px] bg-gradient-to-br from-slate-200 to-slate-400 shrink-0 shadow-sm" />
            <div>
              <div className="font-mono text-[0.56rem] tracking-[0.2em] text-white/25 uppercase">{t.showroom.paint}</div>
              <div className="text-[0.78rem] text-white/65 font-light">Carrara White Metallic</div>
            </div>
          </motion.div>

          {/* Correction badge — top right */}
          <motion.div
            style={{ x: badge1X }}
            className="absolute -top-5 right-4 hidden md:flex items-center gap-2.5 glass-dark rounded-sm px-4 py-2.5"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-admato-cyan shrink-0" />
            <div>
              <div className="font-mono text-[0.56rem] tracking-[0.2em] text-white/25 uppercase">{t.showroom.treatment}</div>
              <div className="text-[0.78rem] text-white/65 font-light">Three-stage correction</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature pills */}
      <motion.div
        className="relative z-10 max-w-screen-md mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 px-6 pt-10 pb-28"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {t.showroom.pills.map(({ l, v }, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-sm px-4 py-3.5 text-center"
          >
            <div className="font-mono text-[0.58rem] tracking-[0.22em] text-white/28 uppercase mb-1">{l}</div>
            <div className="text-[0.8rem] text-white/65 font-light">{v}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
