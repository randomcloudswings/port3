import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Java', icon: '☕' },
  { name: 'Spring', icon: '🌿' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'JavaScript', icon: '💛' },
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'React', icon: '⚛️' },
  { name: 'Python', icon: '🐍' },
  { name: 'Bash', icon: '⌨️' },
  { name: 'Git', icon: '📦' },
  { name: 'Postman', icon: '📮' },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = titleRef.current;
      const cards = sectionRef.current.querySelectorAll('.skill-card');

      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from(cards, {
        scrollTrigger: {
          trigger: cards[0],
          start: 'top 80%',
        },
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotation: -5,
        stagger: {
          amount: 0.8,
          from: 'start',
        },
        duration: 0.8,
        ease: 'back.out(1.7)',
      });

      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.1,
            rotation: 3,
            y: -10,
            duration: 0.4,
            ease: 'back.out(1.7)',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotation: 0,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-dark-card/5">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl font-semibold text-dark-text text-center mb-16"
        >
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-card group relative bg-dark-card/30 backdrop-blur-sm border border-dark-accent/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-dark-accent/40"
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <span className="text-sm text-dark-text/90 font-medium text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
