"use client";

import { useAnimate, useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and slides content in when it scrolls into view.
 *
 * Content is rendered fully visible on the server and stays visible if
 * JavaScript is slow, fails, or the user prefers reduced motion. Only after
 * hydration are elements that are still below the fold hidden and then
 * animated in, so nothing can get "stuck" invisible and above-the-fold
 * content never flashes.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = scope.current;
    if (!element || reduceMotion || typeof IntersectionObserver === "undefined") return;

    // Already on screen at hydration: leave it exactly as server-rendered.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    animate(element, { opacity: 0, y }, { duration: 0 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        animate(element, { opacity: 1, y: 0 }, { duration: 0.7, delay, ease: EASE });
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      // Never leave content hidden if the component re-runs or unmounts mid-way.
      element.style.opacity = "";
      element.style.transform = "";
    };
  }, [animate, delay, reduceMotion, scope, y]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
