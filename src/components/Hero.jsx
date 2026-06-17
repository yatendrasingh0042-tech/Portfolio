import { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolio';
import './Hero.css';

const TYPED_STRINGS = [
  'Full Stack Developer',
  'Data Analyst',
  'AI Enthusiast',
  'Problem Solver',
  'CS Student @ 2027',
];

function useTypingEffect(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx(c => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setIdx(i => (i + 1) % strings.length);
      setCharIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, strings, speed, pause]);

  return display;
}

const BADGES = [
  { label: 'Open To Opportunities', color: 'emerald', icon: '✅' },
  { label: 'Full Stack Developer', color: 'indigo', icon: '⚡' },
  { label: 'Data Analyst', color: 'cyan', icon: '📊' },
  { label: 'AI Enthusiast', color: 'violet', icon: '🤖' },
  { label: 'Student Developer', color: 'indigo', icon: '🎓' },
];

export default function Hero() {
  const typed = useTypingEffect(TYPED_STRINGS);
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMouse, { passive: true });
    return () => el?.removeEventListener('mousemove', handleMouse);
  }, []);

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="hero" ref={heroRef} aria-label="Hero section">
      <div className="container hero__inner">
        {/* ---- LEFT SIDE ---- */}
        <div className="hero__left">
          {/* Availability Badge */}
          <div className="hero__availability">
            <span className="hero__availability-dot" aria-hidden="true" />
            <span>Available for opportunities</span>
          </div>

          {/* Heading */}
          <h1 className="hero__heading">
            {personalInfo.tagline}
            <br />
            <span className="gradient-text">{personalInfo.subtitle}</span>
          </h1>

          {/* Typed Role */}
          <div className="hero__typed" aria-live="polite" aria-atomic="true">
            <span className="hero__typed-prefix">&gt; </span>
            <span className="hero__typed-text">{typed}</span>
            <span className="hero__cursor" aria-hidden="true">|</span>
          </div>

          {/* Description */}
          <p className="hero__description">{personalInfo.description}</p>

          {/* Trust Badges */}
          <div className="hero__badges">
            {BADGES.map((b) => (
              <span key={b.label} className={`hero__badge hero__badge--${b.color}`}>
                <span aria-hidden="true">{b.icon}</span> {b.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero__ctas">
            <button className="btn-primary" onClick={() => handleScroll('projects')} id="hero-view-projects">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              View Projects
            </button>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" id="hero-github">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              GitHub
            </a>
            <button className="btn-secondary" onClick={() => handleScroll('contact')} id="hero-contact">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="hero__socials">
            {[
              { href: personalInfo.linkedin, label: 'LinkedIn', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
              { href: personalInfo.github, label: 'GitHub', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg> },
              { href: personalInfo.twitter, label: 'Twitter', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg> },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-btn"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ---- RIGHT SIDE — Interactive Visual ---- */}
        <div className="hero__right">
          <div
            className="hero__visual"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 4}deg)`,
            }}
          >
            {/* Central Orb */}
            <div className="hero__visual-orb">
              <div className="hero__visual-orb-inner">
                <span className="hero__visual-emoji">👨‍💻</span>
              </div>
              {/* Orbiting rings */}
              <div className="hero__orbit hero__orbit--1">
                <div className="hero__orbit-dot" style={{ background: '#6366F1' }} />
              </div>
              <div className="hero__orbit hero__orbit--2">
                <div className="hero__orbit-dot" style={{ background: '#10B981' }} />
              </div>
              <div className="hero__orbit hero__orbit--3">
                <div className="hero__orbit-dot" style={{ background: '#06B6D4' }} />
              </div>
            </div>

            {/* Floating Skill Pills */}
            {[
              { label: 'React.js', top: '5%', left: '-10%', color: '#6366F1', delay: '0s' },
              { label: 'Python', top: '20%', right: '-12%', color: '#10B981', delay: '0.5s' },
              { label: 'Node.js', bottom: '25%', right: '-10%', color: '#06B6D4', delay: '1s' },
              { label: 'ML / AI', bottom: '10%', left: '-8%', color: '#8B5CF6', delay: '1.5s' },
              { label: 'MongoDB', top: '60%', left: '-15%', color: '#F59E0B', delay: '0.8s' },
            ].map(pill => (
              <div
                key={pill.label}
                className="hero__pill"
                style={{
                  top: pill.top,
                  left: pill.left,
                  right: pill.right,
                  bottom: pill.bottom,
                  animationDelay: pill.delay,
                  borderColor: `${pill.color}40`,
                }}
              >
                <span className="hero__pill-dot" style={{ background: pill.color }} />
                {pill.label}
              </div>
            ))}

            {/* Stats mini cards */}
            <div className="hero__mini-card hero__mini-card--top">
              <div className="hero__mini-stat">🚀 5+ Projects</div>
            </div>
            <div className="hero__mini-card hero__mini-card--bottom">
              <div className="hero__mini-stat">⭐ 2023–2027 B.Tech</div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hero__scroll-indicator" aria-label="Scroll down">
            <div className="hero__scroll-line" />
            <span className="hero__scroll-text">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
