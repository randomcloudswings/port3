import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      tl.from(sectionRef.current.querySelectorAll('.about-line'), {
        opacity: 0,
        y: 30,
        rotateX: -10,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2,
      });

      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          attr: { d: 'M50,10 Q90,50 70,90 T10,80 T30,20 Z' },
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <svg data-parallax="12" className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] opacity-20" viewBox="0 0 100 100">
          <path
            ref={backgroundRef}
            d="M20,20 Q50,0 80,20 T80,80 T20,80 Z"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#715A5A" />
              <stop offset="100%" stopColor="#44444E" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-dark-text mb-8 about-line">
          About Lorem Ipsum
        </h2>
        <p className="text-lg text-dark-text/70 leading-relaxed space-y-6">
          <span className="block about-line">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
            dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
            sollicitudin lacus, ut interdum tellus.
          </span>
          <span className="block about-line">
            Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla quis lorem ut
            libero malesuada feugiat. Nulla porttitor accumsan tincidunt.
          </span>
          <span className="block about-line">
            Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan
            id imperdiet et, porttitor at sem.
          </span>
        </p>
      </div>
    </section>
  );
};

export default About;
