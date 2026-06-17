import { useEffect } from 'react';

/**
 * useMouseParallax — subtle mouse-based parallax on multiple layers.
 * @param {string[]} selectors — CSS selectors with `data-parallax-speed` attributes
 */
export default function useMouseParallax() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1 to 1
      const dy = (e.clientY - cy) / cy; // -1 to 1

      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.05');
        const x = dx * speed * 40;
        const y = dy * speed * 40;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
}
