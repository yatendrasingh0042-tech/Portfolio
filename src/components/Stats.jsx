import { useRef, useState, useEffect } from 'react';
import { stats } from '../data/portfolio';
import useCounter from '../hooks/useCounter';
import './Stats.css';

function StatCard({ stat, isVisible }) {
  const count = useCounter(stat.value, 1800, isVisible);
  return (
    <div className="stats__card glass-card">
      <div className="stats__icon">{stat.icon}</div>
      <div className="stats__value">
        <span className="stats__number">{count}</span>
        <span className="stats__suffix gradient-text">{stat.suffix}</span>
      </div>
      <div className="stats__label">{stat.label}</div>
      <div className="stats__glow" />
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="stats section-sm" aria-label="Quick stats" ref={ref}>
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`reveal delay-${(i + 1) * 100}`}>
              <StatCard stat={stat} isVisible={visible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
