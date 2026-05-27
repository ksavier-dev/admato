import type { Metadata } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { LoadingScreen } from '@/components/LoadingScreen'
import { CustomCursor } from '@/components/CustomCursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ADMATO Detailing | Perfekcja w każdym detalu',
  description:
    'Profesjonalne studio detailingowe klasy premium w Warszawie. Korekta lakieru, powłoki ceramiczne, folie PPF, detailing wnętrza. Obsługujemy Ferrari, Porsche, Lamborghini, McLaren i inne supersamochody.',
  keywords:
    'detailing, korekta lakieru, powłoki ceramiczne, PPF, folie ochronne, detailing premium, Warszawa, supersamochody, Ferrari, Porsche',
  metadataBase: new URL('https://admato-detailing.pl'),
  openGraph: {
    title: 'ADMATO Detailing | Perfekcja w każdym detalu',
    description: 'Profesjonalne studio detailingowe klasy premium. Obsługujemy wyjątkowe samochody dla wymagających klientów.',
    type: 'website',
    locale: 'pl_PL',
    siteName: 'ADMATO Detailing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADMATO Detailing | Perfekcja w każdym detalu',
    description: 'Profesjonalne studio detailingowe klasy premium.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`dark ${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        <SmoothScrollProvider>
          <LoadingScreen />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
