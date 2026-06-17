import { useEffect, useState } from 'react';
import './Loader.css';

const loadingMessages = [
  "Initializing systems...",
  "Loading graphics engine...",
  "Fetching database nodes...",
  "Optimizing layout variables...",
  "Systems active."
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Increment progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Speed up near end, slow in middle
        const step = prev < 30 ? 4 : prev < 70 ? 2 : 5;
        return Math.min(prev + step, 100);
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Cycle messages based on progress
    if (progress < 25) setMessageIndex(0);
    else if (progress < 50) setMessageIndex(1);
    else if (progress < 75) setMessageIndex(2);
    else if (progress < 95) setMessageIndex(3);
    else setMessageIndex(4);

    if (progress === 100) {
      const fadeTimeout = setTimeout(() => {
        setFadeOut(true);
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 600); // match CSS transition duration
        return () => clearTimeout(completeTimeout);
      }, 500);
      return () => clearTimeout(fadeTimeout);
    }
  }, [progress, onComplete]);

  return (
    <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-glass">
        {/* Glow backdrop */}
        <div className="loader-glow" />

        {/* Outer rotating ring */}
        <div className="loader-ring-wrapper">
          <svg className="loader-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className="loader-circle-bg" />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="loader-circle-fg"
              style={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
            />
          </svg>
          <div className="loader-percentage">
            <span>{progress}</span>
            <span className="percent-sign">%</span>
          </div>
        </div>

        {/* Branding & Status messages */}
        <div className="loader-info">
          <div className="loader-initials">YPS</div>
          <div className="loader-status-bar">
            <div className="loader-status-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="loader-message">{loadingMessages[messageIndex]}</div>
        </div>
      </div>
    </div>
  );
}
