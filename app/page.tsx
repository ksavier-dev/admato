import { Hero } from '@/components/sections/Hero'
import { DynamicExperience3D } from '@/components/DynamicExperience3D'
import { Services } from '@/components/sections/Services'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { Gallery } from '@/components/sections/Gallery'
import { About } from '@/components/sections/About'
import { Testimonials } from '@/components/sections/Testimonials'
import { Booking } from '@/components/sections/Booking'
import { Footer } from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <DynamicExperience3D />
      <Services />
      <BeforeAfter />
      <Gallery />
      <About />
      <Testimonials />
      <Booking />
      <Footer />
    </>
  )
}
