'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, Phone, Mail, MapPin, Clock, Loader2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

type FormData = { name: string; email: string; phone: string; car: string; service: string; date: string; message: string }
type FormErrors = Partial<Record<keyof FormData, string>>

function FloatingInput({
  label, name, type = 'text', value, onChange, error, required,
}: {
  label: string; name: keyof FormData; type?: string
  value: string; onChange: (n: keyof FormData, v: string) => void
  error?: string; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const isFloated = focused || value.length > 0

  return (
    <div className="relative">
      <div className="relative">
        <input
          type={type}
          id={name}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`premium-input w-full h-14 px-4 pt-5 pb-2 rounded-sm text-sm transition-all duration-300 ${error ? 'border-red-500/50' : ''}`}
          aria-label={label}
          aria-required={required}
          aria-invalid={!!error}
        />
        <label
          htmlFor={name}
          className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono ${
            isFloated
              ? 'top-2 text-[10px] tracking-[0.2em] text-admato-cyan/80 uppercase'
              : 'top-1/2 -translate-y-1/2 text-sm text-white/25'
          }`}
        >
          {label}{required && <span className="text-admato-cyan ml-0.5">*</span>}
        </label>
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-admato-cyan transition-transform duration-300 origin-left ${focused ? 'scale-x-100' : 'scale-x-0'}`} />
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-red-400 font-mono">
          {error}
        </motion.p>
      )}
    </div>
  )
}

function ServiceSelector({ services, serviceLabel, value, onChange, error }: {
  services: readonly string[]; serviceLabel: string
  value: string; onChange: (v: string) => void; error?: string
}) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mb-3">{serviceLabel}</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {services.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={`px-3 py-3 rounded-sm text-xs font-light tracking-wide text-left transition-all duration-300 ${
              value === s
                ? 'bg-admato-cyan/10 border border-admato-cyan/40 text-admato-cyan'
                : 'glass border border-white/06 text-white/45 hover:text-white hover:border-white/15'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm border flex items-center justify-center transition-colors ${value === s ? 'border-admato-cyan bg-admato-cyan' : 'border-white/20'}`}>
                {value === s && <Check size={8} className="text-black" />}
              </div>
              {s}
            </div>
          </button>
        ))}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400 font-mono">{error}</p>}
    </div>
  )
}

const contactIcons = [Phone, Mail, MapPin, Clock]

export function Booking() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', car: '', service: '', date: '', message: '' })
  const [errors, setErrors]   = useState<FormErrors>({})
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const update = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!formData.name.trim())  e.name  = t.booking.errors.name
    if (!formData.email.trim()) e.email = t.booking.errors.email_required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = t.booking.errors.email_invalid
    if (!formData.phone.trim()) e.phone = t.booking.errors.phone
    if (!formData.car.trim())   e.car   = t.booking.errors.car
    if (!formData.service)      e.service = t.booking.errors.service
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 2000))
    setStatus('success')
  }

  return (
    <section id="rezerwacja" className="relative bg-black section-padding overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-admato-cyan/3 blur-[200px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-900/4 blur-[150px] rounded-full" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="badge mx-auto mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-admato-cyan animate-pulse" />
            {t.booking.badge}
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-6">{t.booking.title}</h2>
          <p className="text-white/55 font-light text-base md:text-lg max-w-lg mx-auto">{t.booking.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 xl:gap-20 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass border border-admato-cyan/20 rounded-sm p-16 text-center"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full border-2 border-admato-cyan/40 flex items-center justify-center mx-auto mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  >
                    <Check size={32} className="text-admato-cyan" />
                  </motion.div>
                  <h3 className="font-display text-3xl font-bold text-white mb-4">{t.booking.success_title}</h3>
                  <p className="text-white/50 font-light leading-relaxed max-w-md mx-auto mb-8">{t.booking.success_desc}</p>
                  <div className="font-mono text-xs tracking-[0.3em] text-admato-cyan/60 uppercase">
                    ADMATO Detailing Studio · Warszawa
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput label={t.booking.fields.name}  name="name"  value={formData.name}  onChange={update} error={errors.name}  required />
                    <FloatingInput label={t.booking.fields.email} name="email" type="email" value={formData.email} onChange={update} error={errors.email} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput label={t.booking.fields.phone} name="phone" type="tel" value={formData.phone} onChange={update} error={errors.phone} required />
                    <FloatingInput label={t.booking.fields.car}   name="car"   value={formData.car}   onChange={update} error={errors.car}   required />
                  </div>

                  <ServiceSelector
                    services={t.booking.services}
                    serviceLabel={t.booking.service_label}
                    value={formData.service}
                    onChange={val => update('service', val)}
                    error={errors.service}
                  />

                  <FloatingInput label={t.booking.fields.date} name="date" type="date" value={formData.date} onChange={update} error={errors.date} />

                  <div className="relative">
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={e => update('message', e.target.value)}
                      className="premium-input w-full px-4 pt-8 pb-3 rounded-sm text-sm resize-none"
                      aria-label={t.booking.fields.message}
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-4 top-3 font-mono text-[10px] tracking-[0.2em] uppercase pointer-events-none transition-colors ${formData.message ? 'text-admato-cyan/80' : 'text-white/25'}`}
                    >
                      {t.booking.fields.message}
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative w-full h-14 bg-admato-cyan text-black font-medium text-sm tracking-[0.2em] uppercase rounded-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
                    whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  >
                    <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                    <span className="relative flex items-center gap-3">
                      {status === 'loading' ? (
                        <><Loader2 size={16} className="animate-spin" />{t.booking.sending}</>
                      ) : (
                        <>{t.booking.submit}<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </span>
                  </motion.button>

                  <p className="text-center text-white/20 text-xs font-light tracking-wide">{t.booking.privacy}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Info card */}
            <div className="glass border border-white/06 rounded-sm p-8 space-y-6">
              <h3 className="font-display text-xl font-bold text-white">{t.booking.contact_title}</h3>
              <div className="space-y-5">
                {t.booking.contact_info.map(({ label, value, href }, i) => {
                  const Icon = contactIcons[i]
                  return (
                    <a key={label} href={href} className="flex items-start gap-4 group">
                      <div className="w-9 h-9 rounded-sm border border-white/08 flex items-center justify-center flex-shrink-0 group-hover:border-admato-cyan/30 transition-colors duration-300">
                        <Icon size={14} className="text-white/40 group-hover:text-admato-cyan transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase mb-0.5">{label}</div>
                        <div className="text-sm text-white/70 font-light group-hover:text-white transition-colors duration-300">{value}</div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Process */}
            <div className="glass border border-white/06 rounded-sm p-8">
              <h3 className="font-display text-lg font-bold text-white mb-6">{t.booking.how_title}</h3>
              <div className="space-y-4">
                {t.booking.steps.map(({ step, title, desc }) => (
                  <div key={step} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-admato-cyan/60 font-bold w-6 flex-shrink-0">{step}</span>
                    <div>
                      <div className="text-sm text-white/70 font-medium">{title}</div>
                      <div className="text-xs text-white/30 font-light">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick contact */}
            <div className="glass border border-white/06 rounded-sm p-6">
              <h3 className="font-display text-base font-bold text-white mb-1">{t.booking.prefer_call}</h3>
              <p className="text-white/40 text-xs font-light mb-5">{t.booking.callback_info}</p>
              <a href="tel:+48500000000" className="flex items-center gap-3 group mb-4">
                <div className="w-10 h-10 rounded-sm border border-admato-cyan/25 flex items-center justify-center group-hover:border-admato-cyan/50 group-hover:bg-admato-cyan/5 transition-all duration-300">
                  <Phone size={15} className="text-admato-cyan/70 group-hover:text-admato-cyan transition-colors duration-300" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase mb-0.5">{t.booking.call_label}</div>
                  <div className="text-white font-medium text-sm group-hover:text-admato-cyan transition-colors duration-300">+48 500 000 000</div>
                </div>
              </a>
              <a href="mailto:kontakt@admato.pl" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-sm border border-white/08 flex items-center justify-center group-hover:border-white/20 transition-all duration-300">
                  <Mail size={15} className="text-white/40 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase mb-0.5">{t.booking.email_label}</div>
                  <div className="text-white/70 text-sm group-hover:text-white transition-colors duration-300">kontakt@admato.pl</div>
                </div>
              </a>
              <div className="mt-5 pt-4 border-t border-white/[0.06]">
                <div className="flex items-start gap-3">
                  <MapPin size={13} className="text-white/22 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white/55 text-xs font-light">ul. Motorsport 7, 02-001 Warszawa</div>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-admato-cyan/60 hover:text-admato-cyan transition-colors tracking-wider uppercase mt-0.5 inline-block">
                      {t.booking.maps_label}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
