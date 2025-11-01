import { useEffect, useRef } from 'react'
import { gsap, SplitText } from '@/lib/gsap'

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const accentPathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    let splitInstance: SplitText | null = null

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      if (titleRef.current) {
        splitInstance = new SplitText(titleRef.current, { type: 'chars' })
        gsap.set(splitInstance.chars, { opacity: 0, y: 50, rotateX: 40 })

        tl.to(splitInstance.chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power4.out',
        })
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power4.out' },
          '-=0.4'
        )
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power4.out' },
          '-=0.6'
        )
      }

      if (svgRef.current) {
        tl.fromTo(
          svgRef.current,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' },
          '-=0.8'
        )

        gsap.to(svgRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        })
      }

      if (accentPathRef.current) {
        const path1 = "M47.1,-57.4C59.9,-49.3,68.4,-33.3,71.2,-16.2C74,0.9,71.2,19.2,62.8,34.1C54.4,49,40.4,60.5,24.5,65.4C8.6,70.3,-9.2,68.5,-24.8,62.1C-40.4,55.7,-53.9,44.7,-62.1,30.4C-70.3,16.1,-73.3,-1.5,-69.2,-17.3C-65.1,-33.1,-53.9,-47.1,-40.1,-55C-26.3,-62.9,-13.1,-64.7,1.8,-66.9C16.7,-69.1,34.3,-71.6,47.1,-57.4Z"
        const path2 = "M43.8,-54.9C56.1,-46.8,65.2,-32.5,68.5,-17.1C71.8,-1.7,69.2,14.8,61.3,28.3C53.3,41.8,40,52.2,25.1,58.1C10.3,63.9,-6.1,65.2,-21.7,61C-37.3,56.8,-52,47.1,-60.4,33C-68.9,18.8,-71.1,0.2,-66.7,-16C-62.3,-32.1,-51.3,-45.9,-38,-53.8C-24.8,-61.7,-9.3,-63.7,3.6,-68.5C16.5,-73.2,31.5,-62.9,43.8,-54.9Z"

        gsap.set(accentPathRef.current, { attr: { d: path1 } })

        gsap.to(accentPathRef.current, {
          morphSVG: path2,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, heroRef)

    return () => {
      splitInstance?.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dark-tertiary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dark-secondary/10 rounded-full blur-3xl" />
        
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#715A5A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#44444E" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            ref={accentPathRef}
            fill="url(#hero-gradient)"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <svg
          ref={svgRef}
          className="w-24 h-24 mx-auto mb-8"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#D3DAD9"
            strokeWidth="2"
            opacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#715A5A"
            strokeWidth="2"
            opacity="0.5"
          />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#D3DAD9" strokeWidth="3" />
          <circle cx="50" cy="50" r="5" fill="#D3DAD9" />
        </svg>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-dark-accent leading-tight"
        >
          Lorem Ipsum Dolor
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-dark-accent/80 mb-12 max-w-3xl mx-auto"
        >
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
        </p>

        <div ref={ctaRef} className="flex gap-6 justify-center flex-wrap">
          <button className="px-8 py-4 bg-dark-accent text-dark-primary font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
            Lorem Projecta
          </button>
          <button className="px-8 py-4 border-2 border-dark-accent text-dark-accent font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
            Lorem Contactus
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-dark-accent/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-dark-accent/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
