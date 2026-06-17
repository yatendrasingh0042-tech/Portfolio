import { useState } from 'react';
import { projects, filters } from '../data/portfolio';
import './Projects.css';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hovered, setHovered] = useState(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.includes(activeFilter));

  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="container">
        <div className="section-header reveal text-center">
          <div className="section-label">🚀 Portfolio</div>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">
            Real-world applications built with modern technologies — from full-stack platforms to AI-powered tools.
          </p>
        </div>

        {/* Filters */}
        <div className="projects__filters reveal">
          {filters.map(f => (
            <button
              key={f}
              className={`projects__filter-btn ${activeFilter === f ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects__grid">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`projects__card glass-card reveal-scale delay-${(i % 3 + 1) * 100} ${project.featured ? 'projects__card--featured' : ''}`}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Preview Banner */}
              <div
                className="projects__preview"
                style={{ background: project.gradient }}
                aria-hidden="true"
              >
                <div className="projects__preview-emoji">{project.emoji}</div>
                {/* Shimmer overlay */}
                <div className="projects__preview-shimmer" />
                {/* Status badge */}
                <span className={`projects__status projects__status--${project.status === 'Live' ? 'live' : 'wip'}`}>
                  <span className="projects__status-dot" />
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="projects__content">
                <h3 className="projects__title">{project.title}</h3>
                <p className="projects__desc">{project.description}</p>

                {/* Tech Stack */}
                <div className="projects__tech">
                  {project.tech.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="projects__actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary projects__btn"
                    aria-label={`GitHub for ${project.title}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary projects__btn"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Live Demo
                  </a>
                </div>
              </div>

              {/* Hover glow overlay */}
              {hovered === project.id && (
                <div
                  className="projects__glow-overlay"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.gradient.match(/#[0-9A-F]{6}/gi)?.[0] || '#6366F1'}20, transparent 70%)` }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="projects__empty">
            <span>🔍</span>
            <p>No projects in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
