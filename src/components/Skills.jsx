import { useState, useEffect, useRef } from 'react';
import { skills } from '../data/portfolio';
import './Skills.css';

const colorMap = {
  indigo: { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', text: '#818CF8', glow: 'rgba(99,102,241,0.15)' },
  violet: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', text: '#A78BFA', glow: 'rgba(139,92,246,0.15)' },
  emerald: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', text: '#34D399', glow: 'rgba(16,185,129,0.15)' },
  cyan: { bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)', text: '#22D3EE', glow: 'rgba(6,182,212,0.15)' },
};

function SkillCard({ skill, colors, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`skills__card glass-card reveal delay-${(index % 4 + 1) * 100} ${inView ? 'revealed' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={hovered ? { boxShadow: `0 20px 60px ${colors.glow}, 0 0 0 1px ${colors.border}` } : {}}
    >
      {/* Card header */}
      <div className="skills__card-header">
        <span className="skills__icon">{skill.icon}</span>
        <div>
          <h3 className="skills__category" style={hovered ? { color: colors.text } : {}}>
            {skill.category}
          </h3>
          <span className="skills__count">{skill.items.length} Skills</span>
        </div>
      </div>

      {/* Skill list with progress bars */}
      <div className="skills__items-list">
        {skill.items.map((item) => (
          <div key={item.name} className="skills__item-wrapper">
            <div className="skills__item-info">
              <span className="skills__item-name">{item.name}</span>
              <span className="skills__item-level" style={{ color: colors.text }}>
                {item.level}%
              </span>
            </div>
            
            <div className="skills__bar-container" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div
                className="skills__bar-fill"
                style={{
                  background: `linear-gradient(90deg, ${colors.text}, var(--accent-violet))`,
                  width: inView ? `${item.level}%` : '0%'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Accent bar */}
      <div
        className="skills__accent-bar"
        style={{ background: `linear-gradient(90deg, ${colors.text}, transparent)`, opacity: hovered ? 1 : 0 }}
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section" aria-label="Skills">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal text-center">
          <div className="section-label">⚡ Technical Arsenal</div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            A curated stack of tools I use to build full-stack applications, analyze data, and develop AI solutions.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills__grid">
          {skills.map((skill, i) => {
            const colors = colorMap[skill.color] || colorMap.indigo;
            return (
              <SkillCard
                key={skill.category}
                skill={skill}
                colors={colors}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
