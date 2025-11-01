import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const projects = [
  {
    title: 'Lorem Project One',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Dolor Sit Project Two',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Consectetur Project Three',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
]

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const cleanups: Array<() => void> = []

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLDivElement>('.project-card')
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 120,
            rotateX: -10,
            rotateZ: -3,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateZ: 0,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        cards.forEach((card) => {
          const onEnter = () => {
            gsap.to(card, {
              scale: 1.02,
              rotation: 1,
              duration: 0.4,
              ease: 'power2.out',
              boxShadow: '0 30px 60px rgba(12, 12, 14, 0.6)',
            })
          }

          const onLeave = () => {
            gsap.to(card, {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: 'power2.out',
              boxShadow: '0 20px 30px rgba(12, 12, 14, 0.3)',
            })
          }

          card.addEventListener('mouseenter', onEnter)
          card.addEventListener('mouseleave', onLeave)

          cleanups.push(() => {
            card.removeEventListener('mouseenter', onEnter)
            card.removeEventListener('mouseleave', onLeave)
          })
        })
      }

      if (pathRef.current) {
        gsap.from(pathRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          duration: 2,
          ease: 'power2.inOut',
          drawSVG: '0%',
        })

        const path2 = 'M20 10 C 60 80, 140 20, 180 90 S 260 150, 300 80'
        gsap.to(pathRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            scrub: true,
          },
          duration: 2,
          ease: 'none',
          morphSVG: path2,
        })
      }
    }, sectionRef)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
          <path
            ref={pathRef}
            d="M10 20 C 60 60, 140 40, 190 70 S 260 120, 310 60"
            fill="none"
            stroke="#715A5A"
            strokeWidth="1.5"
            opacity="0.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-dark-accent text-center">
          Selected Projects
        </h2>
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="project-card backdrop-blur-xl border border-dark-secondary/40">
              <CardHeader>
                <CardTitle className="text-2xl text-dark-accent">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base text-dark-accent/70 leading-relaxed">
                {project.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
