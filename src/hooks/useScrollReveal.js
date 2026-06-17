import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches IntersectionObserver to elements
 * with `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` classes.
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
    const elements = document.querySelectorAll(revealClasses.join(', '));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
