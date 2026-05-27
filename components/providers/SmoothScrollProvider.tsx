'use client'

import { useEffect, useState, createContext, useContext } from 'react'
import Lenis from 'lenis'

type LenisContext = {
  lenis: Lenis | null
}

const LenisCtx = createContext<LenisContext>({ lenis: null })

export function useLenis() {
  return useContext(LenisCtx)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Na urządzeniach dotykowych natywny scroll jest lepszy
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (isTouch) return

    const instance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    setLenis(instance)

    let rafId: number
    const raf = (time: number) => {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisCtx.Provider value={{ lenis }}>
      {children}
    </LenisCtx.Provider>
  )
}
