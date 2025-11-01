import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { gsap } from '@/lib/gsap'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Toast } from '@/components/ui/toast'

const CONTACT_FIELDS = [
  { name: 'from_name', label: 'Name', type: 'text', placeholder: 'Lorem Ipsum' },
  { name: 'from_email', label: 'Email', type: 'email', placeholder: 'lorem@ipsum.com' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Dolor sit amet' },
]

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll('.contact-animate')
        gsap.fromTo(
          formElements,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

    if (!serviceId || !templateId || !publicKey) {
      setToastMessage('Email service unavailable. Please configure EmailJS credentials.')
      return
    }

    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>
    setIsSubmitting(true)

    try {
      await emailjs.send(serviceId, templateId, payload, {
        publicKey,
      })
      setToastMessage('Message sent successfully — thank you!')
      event.currentTarget.reset()
    } catch (error) {
      console.error('EmailJS Error:', error)
      setToastMessage('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-3xl">
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-dark-accent">Get In Touch</h2>
          <p className="text-lg text-dark-accent/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {CONTACT_FIELDS.map((field) => (
            <div key={field.name} className="contact-animate space-y-2">
              <label htmlFor={field.name} className="text-sm uppercase tracking-wide text-dark-accent/60">
                {field.label}
              </label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required
              />
            </div>
          ))}

          <div className="contact-animate space-y-2">
            <label htmlFor="message" className="text-sm uppercase tracking-wide text-dark-accent/60">
              Message
            </label>
            <Textarea id="message" name="message" placeholder="Lorem ipsum dolor sit amet, consectetur." required />
          </div>

          <div className="contact-animate">
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </section>
  )
}
