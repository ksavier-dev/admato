'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, Instagram } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

/* Category keys always stay in Polish — they match photo.category values */
const CATEGORY_KEYS = ['Wszystkie', 'Korekta Lakieru', 'Ceramika', 'PPF', 'Wnętrze', 'Full Detail']

const photos = [
  { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85', alt: 'Porsche 911 po korekcie lakieru', category: 'Korekta Lakieru', span: 'col-span-1 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=85',   alt: 'Ferrari detailing',            category: 'Ceramika',       span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=85',   alt: 'Luksusowe auto na detailingu', category: 'PPF',            span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=85', alt: 'Wnętrze premium',            category: 'Wnętrze',        span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=85', alt: 'Sportowy samochód',          category: 'Korekta Lakieru', span: 'col-span-1 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=85', alt: 'Supercar detailing',         category: 'PPF',            span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=85', alt: 'Detailing wnętrza BMW',      category: 'Wnętrze',        span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&q=85',   alt: 'Klasyk po renowacji',        category: 'Full Detail',    span: 'col-span-2 row-span-1' },
]

type Photo = { src: string; alt: string; category: string; span: string }

function GalleryItem({ photo, index, categoryLabel, onClick }: { photo: Photo; index: number; categoryLabel: string; onClick: () => void }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-sm cursor-pointer group ${photo.span}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      data-cursor="hover"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <span className="badge text-[10px]">{categoryLabel}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center">
          <ZoomIn size={16} className="text-white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white text-sm font-light">{photo.alt}</p>
      </div>
    </motion.div>
  )
}

function Lightbox({ photos, current, onClose, onNext, onPrev }: { photos: Photo[]; current: number; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9500] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      <motion.div
        key={current}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl aspect-[16/10] mx-6"
        onClick={e => e.stopPropagation()}
      >
        <Image src={photos[current].src} alt={photos[current].alt} fill className="object-contain" sizes="100vw" priority />
      </motion.div>

      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-between px-4 md:px-8">
        <button onClick={e => { e.stopPropagation(); onPrev() }} className="pointer-events-auto w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all">
          <ChevronLeft size={20} />
        </button>
        <button onClick={e => { e.stopPropagation(); onNext() }} className="pointer-events-auto w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all">
          <ChevronRight size={20} />
        </button>
      </div>

      <button
        className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        onClick={onClose}
      >
        <X size={18} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center">
        <p className="text-white/60 text-sm font-light mb-1">{photos[current].alt}</p>
        <p className="font-mono text-xs text-white/25 tracking-wider">{current + 1} / {photos.length}</p>
      </div>
    </motion.div>
  )
}

export function Gallery() {
  const { t } = useLanguage()
  const [activeKey, setActiveKey] = useState(CATEGORY_KEYS[0])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeKey === CATEGORY_KEYS[0]
    ? photos
    : photos.filter(p => p.category === activeKey)

  const handleCategoryChange = (key: string) => {
    setActiveKey(key)
    setLightboxIndex(null)
  }

  const openLightbox  = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const nextPhoto = () => setLightboxIndex(prev => prev !== null ? (prev + 1) % filtered.length : 0)
  const prevPhoto = () => setLightboxIndex(prev => prev !== null ? (prev - 1 + filtered.length) % filtered.length : 0)

  /* Map key index → translated label for badge display */
  const getLabelForKey = (key: string) => {
    const i = CATEGORY_KEYS.indexOf(key)
    return i >= 0 ? t.gallery.categories[i] : key
  }

  return (
    <>
      <section id="galeria" className="relative bg-black section-padding">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
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
              {t.gallery.badge}
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-6">{t.gallery.title}</h2>
            <p className="text-white/55 font-light text-base md:text-lg max-w-lg mx-auto">{t.gallery.desc}</p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {CATEGORY_KEYS.map((key, i) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`px-5 py-2.5 text-[0.72rem] font-light tracking-[0.14em] uppercase rounded-sm transition-all duration-300 ${
                  activeKey === key
                    ? 'bg-admato-cyan text-black font-medium'
                    : 'glass border border-white/[0.07] text-white/50 hover:text-white hover:border-white/15'
                }`}
              >
                {t.gallery.categories[i]}
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-2 md:gap-4 [grid-auto-flow:dense]">
            {filtered.map((photo, i) => (
              <GalleryItem
                key={photo.src}
                photo={photo}
                index={i}
                categoryLabel={getLabelForKey(photo.category)}
                onClick={() => openLightbox(i)}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 glass border border-white/[0.08] hover:border-white/20 rounded-sm text-[0.72rem] text-white/45 hover:text-white transition-all duration-300 font-mono tracking-[0.14em] uppercase"
            >
              <Instagram size={13} />
              {t.gallery.instagram}
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={filtered}
            current={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextPhoto}
            onPrev={prevPhoto}
          />
        )}
      </AnimatePresence>
    </>
  )
}
