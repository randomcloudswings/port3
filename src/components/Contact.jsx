import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast.jsx';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fields = sectionRef.current.querySelectorAll('.form-field');
      const title = sectionRef.current.querySelector('.contact-title');
      const description = sectionRef.current.querySelector('.contact-description');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      tl.from(title, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power4.out',
      })
        .from(description, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power4.out',
        }, '-=0.5')
        .from(
          fields,
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const form = formRef.current;
    const formData = new FormData(form);
    const data = {
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      message: formData.get('message'),
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, data, publicKey);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      form.reset();

      toast({
        title: 'Message Sent!',
        description: 'Lorem ipsum dolor sit amet. Your message has been received.',
      });
    } catch (error) {
      console.error('EmailJS error', error);
      toast({
        title: 'Something went wrong',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-6 bg-dark-card/5">
      <div className="absolute inset-0 pointer-events-none">
        <div data-parallax="12" className="absolute bottom-0 right-0 w-96 h-96 bg-dark-accent/10 rounded-full blur-[160px]" />
      </div>
      <div className="max-w-2xl mx-auto relative z-10">
        <h2 className="contact-title text-3xl md:text-5xl font-semibold text-dark-text text-center mb-6">
          Get In Touch
        </h2>
        <p className="contact-description text-dark-text/70 text-center mb-12 text-lg">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field">
            <Input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-field">
            <Input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="form-field">
            <Textarea
              name="message"
              placeholder="Your Message"
              required
            />
          </div>

          <div className="form-field">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
