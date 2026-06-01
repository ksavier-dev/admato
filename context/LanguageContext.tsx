'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations, type Lang, type Translations } from '@/lib/translations'

type LanguageContextValue = {
  lang:    Lang
  setLang: (l: Lang) => void
  t:       Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  lang:    'pl',
  setLang: () => {},
  t:       translations.pl,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pl')

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('admato-lang') as Lang | null
      if (saved === 'pl' || saved === 'en') setLangState(saved)
    } catch {}
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('admato-lang', l) } catch {}
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
