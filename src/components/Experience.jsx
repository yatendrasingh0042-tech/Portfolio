import { useState } from 'react';
import { experience } from '../data/portfolio';
import './Experience.css';

const colorMap = {
  indigo: '#6366F1',
  violet: '#8B5CF6',
  emerald: '#10B981',
  cyan: '#06B6D4',
};

export default function Experience() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="experience" className="section" aria-label="Experience">
      <div className="container">
        <div className="section-header reveal text-center">
          <div className="section-label">💼 My Journey</div>
          <h2 className="section-title">Experience & <span className="gradient-text">Education</span></h2>
          <p className="section-subtitle">A timeline of internships, projects, and academic milestones that shaped my skills.</p>
        </div>

        <div className="exp__timeline">
          {/* Vertical line */}
          <div className="exp__line" aria-hidden="true" />

          {experience.map((item, i) => {
            const color = colorMap[item.color] || colorMap.indigo;
            const isOpen = expanded === item.id;
            const side = i % 2 === 0 ? 'left' : 'right';

            return (
              <div
                key={item.id}
                className={`exp__item exp__item--${side} reveal${side === 'left' ? '-left' : '-right'} delay-${(i + 1) * 200}`}
              >
                {/* Dot */}
                <div className="exp__dot-wrap" aria-hidden="true">
                  <div className="exp__dot" style={{ background: color, boxShadow: `0 0 16px ${color}60` }} />
                </div>

                {/* Card */}
                <div
                  className={`exp__card glass-card ${isOpen ? 'exp__card--open' : ''}`}
                  style={isOpen ? { borderColor: `${color}40` } : {}}
                >
                  {/* Type badge */}
                  <span className="exp__type" style={{ background: `${color}18`, color, borderColor: `${color}30` }}>
                    {item.type}
                  </span>

                  <div className="exp__header">
                    <div>
                      <h3 className="exp__role">{item.role}</h3>
                      <p className="exp__company">{item.company}</p>
                    </div>
                    <span className="exp__duration">{item.duration}</span>
                  </div>

                  <p className="exp__desc">{item.description}</p>

                  {/* Tech tags */}
                  <div className="exp__tech">
                    {item.tech.map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>

                  {/* Expand toggle */}
                  <button
                    className="exp__toggle"
                    onClick={() => setExpanded(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    style={{ color }}
                  >
                    {isOpen ? '− Show Less' : '+ Show Achievements'}
                  </button>

                  {/* Achievements (expandable) */}
                  <div className={`exp__achievements ${isOpen ? 'exp__achievements--open' : ''}`}>
                    <ul className="exp__list">
                      {item.achievements.map((a, j) => (
                        <li key={j} className="exp__list-item">
                          <span className="exp__list-dot" style={{ background: color }} aria-hidden="true" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
