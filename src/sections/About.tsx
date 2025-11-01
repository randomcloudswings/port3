import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 50,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (svgRef.current) {
        gsap.fromTo(
          svgRef.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 0.1,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: svgRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        gsap.to(svgRef.current, {
          rotate: 360,
          duration: 30,
          repeat: -1,
          ease: 'none',
        })

        const accent = svgRef.current.querySelector('.about-morph') as SVGPathElement | null
        if (accent) {
          const basePath = "M47.1,-57.4C59.9,-49.3,68.4,-33.3,71.2,-16.2C74,0.9,71.2,19.2,62.8,34.1C54.4,49,40.4,60.5,24.5,65.4C8.6,70.3,-9.2,68.5,-24.8,62.1C-40.4,55.7,-53.9,44.7,-62.1,30.4C-70.3,16.1,-73.3,-1.5,-69.2,-17.3C-65.1,-33.1,-53.9,-47.1,-40.1,-55C-26.3,-62.9,-13.1,-64.7,1.8,-66.9C16.7,-69.1,34.3,-71.6,47.1,-57.4Z"
          const altPath = "M40.2,-51.3C51.6,-44.5,61.5,-33.6,67.1,-20.4C72.6,-7.2,73.7,8.3,67.7,21.1C61.6,33.9,48.3,44.2,34.6,53.3C21,62.4,10.5,70.2,-3.5,74.6C-17.6,78.9,-35.1,79.8,-47.6,72.3C-60.1,64.8,-67.6,48.9,-70,32.9C-72.4,16.9,-69.8,0.8,-63.9,-13.1C-58.1,-27.1,-48.9,-38.9,-37.5,-45.5C-26.1,-52.1,-13,-53.6,0.7,-54.7C14.4,-55.8,28.7,-56.5,40.2,-51.3Z"

          gsap.set(accent, { attr: { d: basePath } })

          gsap.to(accent, {
            morphSVG: altPath,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })

          gsap.to(accent, {
            scale: 1.05,
            duration: 4,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-20">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#715A5A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#44444E" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          className="about-morph"
          fill="url(#gradient)"
          transform="translate(100 100)"
        />
      </svg>

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-dark-accent">About</h2>
        <div className="space-y-6 text-lg md:text-xl text-dark-accent/80 leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </div>
    </section>
  )
}
