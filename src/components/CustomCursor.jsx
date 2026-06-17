import { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const circlePos = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [clickActive, setClickActive] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (isHidden) setIsHidden(false);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.closest('.glass-card') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select');

      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setClickActive(true);
    const onMouseUp = () => setClickActive(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId;
    
    const updatePosition = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      const lerpFactor = 0.15;
      circlePos.current.x += (mousePos.current.x - circlePos.current.x) * lerpFactor;
      circlePos.current.y += (mousePos.current.y - circlePos.current.y) * lerpFactor;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${circlePos.current.x}px, ${circlePos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHidden]);

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHidden ? 'hidden' : ''} ${isHovered ? 'hovered' : ''} ${clickActive ? 'clicked' : ''}`}
      />
      <div
        ref={circleRef}
        className={`custom-cursor-circle ${isHidden ? 'hidden' : ''} ${isHovered ? 'hovered' : ''} ${clickActive ? 'clicked' : ''}`}
      />
    </>
  );
}
