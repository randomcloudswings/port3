import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorInner = cursorInnerRef.current

    if (!cursor || !cursorInner) return

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(cursorInner, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const onMouseEnter = () => {
      gsap.to([cursor, cursorInner], {
        scale: 1.5,
        duration: 0.3,
        ease: 'back.out(1.7)',
      })
    }

    const onMouseLeave = () => {
      gsap.to([cursor, cursorInner], {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    const interactiveElements = document.querySelectorAll('a, button, input, textarea')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full rounded-full border-2 border-dark-accent opacity-50" />
      </div>
      <div
        ref={cursorInnerRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full rounded-full bg-dark-accent shadow-[0_0_20px_rgba(211,218,217,0.8)]" />
      </div>
    </>
  )
}
