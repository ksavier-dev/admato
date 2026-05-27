'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [pct, setPct]         = useState(0)
  const [reveal, setReveal]   = useState(false)

  useEffect(() => {
    const steps = [
      { to: 28, ms: 280 },
      { to: 62, ms: 550 },
      { to: 88, ms: 380 },
      { to: 100, ms: 280 },
    ]
    let t = 0
    steps.forEach(({ to, ms }, i) => {
      t += i === 0 ? 300 : steps[i - 1].ms
      setTimeout(() => setPct(to), t)
    })
    const revealT = t + steps[steps.length - 1].ms + 120
    setTimeout(() => setReveal(true), revealT)
    setTimeout(() => setVisible(false), revealT + 900)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-admato-cyan/[0.04] blur-[130px] pointer-events-none" aria-hidden />

          {/* Content */}
          <motion.div
            className="relative flex flex-col items-center gap-9"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo mark */}
            <div className="relative">
              {/* Spinning outer ring */}
              <motion.div
                className="absolute -inset-5 rounded-sm border border-white/[0.07]"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                aria-hidden
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-admato-cyan/50 -translate-y-1/2" />
              </motion.div>

              {/* Inner box */}
              <div className="w-16 h-16 border border-white/10 rounded-sm flex items-center justify-center">
                <span className="font-display text-2xl font-black text-gradient tracking-wider">AD</span>
              </div>
            </div>

            {/* Brand name */}
            <div className="text-center">
              <p className="font-mono text-[0.58rem] tracking-[0.55em] text-white/30 uppercase mb-1.5">
                Studio Detailingowe
              </p>
              <h1 className="font-display text-4xl font-black tracking-[0.32em] text-white">
                ADMATO
              </h1>
            </div>

            {/* Progress bar */}
            <div className="w-44 flex flex-col items-center gap-2.5">
              <div className="w-full h-px bg-white/[0.08] relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, #00d4ff)' }}
                />
              </div>
              <span className="font-mono text-[0.62rem] text-white/25 tabular-nums">
                {String(pct).padStart(3, '0')}%
              </span>
            </div>
          </motion.div>

          {/* Reveal wipe */}
          <AnimatePresence>
            {reveal && (
              <>
                <motion.div
                  key="white"
                  className="absolute inset-0 bg-admato-silver/20"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
                  aria-hidden
                />
                <motion.div
                  key="black"
                  className="absolute inset-0 bg-black"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.38, delay: 0.22, ease: [0.76, 0, 0.24, 1] }}
                  aria-hidden
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
