import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      const cta = ctaRef.current;
      const svg = svgRef.current;

      if (title) {
        const splitTitle = new SplitType(title, {
          types: 'chars',
          tagName: 'span',
        });

        gsap.from(splitTitle.chars, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: 'power4.out',
          delay: 0.2,
        });
      }

      if (subtitle) {
        gsap.from(subtitle, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power4.out',
          delay: 0.8,
        });
      }

      if (cta) {
        gsap.from(cta, {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 1.2,
        });
      }

      if (svg) {
        gsap.from(svg, {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
          duration: 1.5,
          ease: 'back.out(1.7)',
          delay: 0.5,
        });

        gsap.to(svg, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        });

        gsap.to(svg, {
          scale: 1.1,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: 'power1.inOut',
        });
      }

      const parallaxItems = heroRef.current.querySelectorAll('[data-parallax]');
      parallaxItems.forEach((item) => {
        const depth = parseFloat(item.dataset.parallax || '10');
        gsap.to(item, {
          yPercent: depth,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          data-parallax="15"
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-dark-accent/20 rounded-full blur-[120px]"
        />
        <div
          data-parallax="-10"
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dark-card/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div
          ref={svgRef}
          data-parallax="8"
          className="absolute -top-20 -left-20 w-32 h-32 opacity-30 hidden md:block"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50 10 L90 90 L10 90 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-dark-accent"
            />
          </svg>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-dark-text mb-6"
        >
          Lorem Ipsum Dolor
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-dark-text/70 max-w-2xl mx-auto mb-8"
        >
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam quis.
        </p>

        <div ref={ctaRef}>
          <Button size="lg" onClick={scrollToContact}>
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
