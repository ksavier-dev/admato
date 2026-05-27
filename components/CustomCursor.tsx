'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'click' | 'text'>('default')
  const [visible, setVisible] = useState(false)
  // Track visible in a ref so the move handler never needs to be re-registered
  const visibleRef = useRef(false)

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const trailSpringConfig = { damping: 40, stiffness: 200, mass: 0.8 }
  const trailX = useSpring(cursorX, trailSpringConfig)
  const trailY = useSpring(cursorY, trailSpringConfig)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
    }

    const down = () => setCursorState('click')
    const up = () => setCursorState('default')
    const leave = () => { visibleRef.current = false; setVisible(false) }
    const enter = () => { visibleRef.current = true; setVisible(true) }

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.getAttribute('role') === 'button' ||
        el.closest('[data-cursor="hover"]')
      ) {
        setCursorState('hover')
      } else if (
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'P' ||
        el.tagName === 'SPAN'
      ) {
        setCursorState('text')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', checkHover)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', checkHover)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Trail (outer ring) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: cursorState === 'hover' ? 2.5 : cursorState === 'click' ? 0.8 : 1,
        }}
        transition={{ scale: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }, opacity: { duration: 0.2 } }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            cursorState === 'hover'
              ? 'w-10 h-10 border-admato-cyan/60'
              : cursorState === 'text'
              ? 'w-0.5 h-6 rounded-none border-admato-silver/80'
              : 'w-8 h-8 border-white/20'
          }`}
        />
      </motion.div>

      {/* Dot (inner cursor) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: cursorState === 'click' ? 0.5 : 1,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.1 } }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            cursorState === 'hover'
              ? 'w-2 h-2 bg-admato-cyan'
              : 'w-1.5 h-1.5 bg-white'
          }`}
        />
      </motion.div>
    </>
  )
}
