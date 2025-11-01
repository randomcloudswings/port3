import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const skills = [
  { name: 'Java', icon: '☕' },
  { name: 'Spring', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'HTML5', icon: '📄' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'React', icon: '⚛️' },
  { name: 'Python', icon: '🐍' },
  { name: 'Bash', icon: '💻' },
  { name: 'Git', icon: '📦' },
  { name: 'Postman', icon: '📮' },
]

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanups: Array<() => void> = []

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll<HTMLDivElement>('.skill-card')
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        cards.forEach((card) => {
          const onEnter = () => {
            gsap.to(card, {
              scale: 1.1,
              rotateY: 5,
              rotateX: 5,
              duration: 0.3,
              ease: 'power2.out',
            })
          }

          const onLeave = () => {
            gsap.to(card, {
              scale: 1,
              rotateY: 0,
              rotateX: 0,
              duration: 0.3,
              ease: 'power2.out',
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
    }, sectionRef)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <h2 ref={headerRef} className="text-4xl md:text-6xl font-bold mb-16 text-dark-accent text-center">
          Skills & Technologies
        </h2>
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="skill-card cursor-pointer hover:border-dark-accent/50 transition-colors"
            >
              <CardHeader>
                <div className="text-5xl mb-2">{skill.icon}</div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-base">{skill.name}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
