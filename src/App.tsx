import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, ScrollSmoother } from '@/lib/gsap'

import { CustomCursor } from './components/CustomCursor'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

function App() {
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useEffect(() => {
    gsap.to('body', {
      duration: 0,
      css: { visibility: 'visible' },
    })

    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      smoothTouch: 0.1,
      effects: true,
    })

    ScrollTrigger.refresh()

    return () => {
      smootherRef.current?.kill()
      smootherRef.current = null
    }
  }, [])

  return (
    <div className="relative" id="smooth-wrapper">
      <CustomCursor />
      <div id="smooth-content" className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  )
}

export default App
