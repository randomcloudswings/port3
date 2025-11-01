import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimation = (animationCallback, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const context = gsap.context(() => {
      animationCallback(element);
    }, element);

    return () => context.revert();
  }, dependencies);

  return elementRef;
};

export const useScrollTrigger = (animationCallback, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const context = gsap.context(() => {
      animationCallback(element);
    }, element);

    return () => context.revert();
  }, dependencies);

  return elementRef;
};
