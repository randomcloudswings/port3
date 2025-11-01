import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  {
    title: 'Project Nebula',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero sed cursus ante dapibus diam.',
  },
  {
    title: 'Chronos Motion',
    description:
      'Sed nisi nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris fusce nec tellus sed.',
  },
  {
    title: 'Aether Systems',
    description:
      'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor pellentesque nibh aenean quam.',
  },
];

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const connectorsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.project-card');
      const connectors = connectorsRef.current;

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 120,
        rotateX: -10,
        rotateY: 10,
        filter: 'blur(12px)',
        stagger: 0.25,
        duration: 1.2,
        ease: 'power4.out',
      });

      connectors.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.out',
        });

        gsap.to(path, {
          attr: { d: path.dataset.morph },
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div data-parallax="-8" className="absolute -top-32 left-1/3 w-96 h-96 bg-dark-accent/20 rounded-full blur-[160px]" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-semibold text-dark-text text-center mb-16">
          Featured Projects
        </h2>
        <div className="relative space-y-12">
          <svg
            className="absolute inset-0 w-full h-full -z-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <defs>
              <linearGradient id="connectorGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#715A5A" />
                <stop offset="100%" stopColor="#44444E" />
              </linearGradient>
            </defs>
            <path
              ref={(el) => (connectorsRef.current[0] = el)}
              d="M20 40 C 200 20, 320 80, 520 40"
              data-morph="M30 30 C 220 80, 300 40, 510 70"
              stroke="url(#connectorGradient)"
              strokeWidth="2"
              opacity="0.4"
            />
            <path
              ref={(el) => (connectorsRef.current[1] = el)}
              d="M40 180 C 250 140, 320 220, 520 180"
              data-morph="M60 170 C 240 220, 360 160, 500 210"
              stroke="url(#connectorGradient)"
              strokeWidth="2"
              opacity="0.4"
            />
          </svg>

          {projects.map((project, index) => (
            <article
              key={project.title}
              className="project-card relative bg-dark-card/40 border border-dark-accent/20 rounded-2xl p-8 backdrop-blur-xl shadow-lg max-w-3xl mx-auto"
            >
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-dark-accent/10 blur-2xl" />
              <h3 className="text-2xl font-semibold text-dark-text mb-4">
                {project.title}
              </h3>
              <p className="text-dark-text/70 leading-relaxed">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
