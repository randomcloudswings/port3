import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { ToastProvider } from './components/ui/use-toast.jsx';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.config({
        force3D: true,
      });

      const parallaxItems = gsap.utils.toArray('[data-parallax]');
      parallaxItems.forEach((item) => {
        const depth = parseFloat(item.dataset.parallax || '16');
        gsap.to(item, {
          yPercent: depth,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <ToastProvider>
      <div className="relative bg-dark-bg min-h-screen">
        <CustomCursor />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <footer className="py-8 text-center text-dark-text/50 text-sm">
          <p>© 2024 Lorem Ipsum. All rights reserved.</p>
        </footer>
      </div>
    </ToastProvider>
  );
}

export default App;
