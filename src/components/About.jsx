import { personalInfo, aboutTimeline } from '../data/portfolio';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section" aria-label="About Me">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal text-center">
          <div className="section-label">🌌 About Me</div>
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span> & Aspirations
          </h2>
          <p className="section-subtitle">
            Computer Science & Engineering student specializing in full-stack engineering, data analytics, and AI applications.
          </p>
        </div>

        {/* Content split grid */}
        <div className="about__grid">
          {/* Left Panel: Introduction Card */}
          <div className="about__intro-card glass-card reveal delay-100">
            <h3 className="about__intro-title">Who I Am</h3>
            <p className="about__intro-text">
              I am <strong>{personalInfo.name}</strong>, currently pursuing my B.Tech in Computer Science & Engineering ({personalInfo.collegeYear}). I focus on developing full-stack web applications and leveraging python data stacks for analytics and AI.
            </p>
            <p className="about__intro-text">
              My goal is to blend solid software development principles with analytics insights to create high-impact, scalable, and user-centric systems.
            </p>

            <div className="about__key-info">
              <div className="about__info-item">
                <span className="info-label">Current CGPA:</span>
                <span className="info-val">{personalInfo.cgpa} ({personalInfo.cgpaSemester})</span>
              </div>
              <div className="about__info-item">
                <span className="info-label">Location:</span>
                <span className="info-val">{personalInfo.location}</span>
              </div>
              <div className="about__info-item">
                <span className="info-label">Status:</span>
                <span className="info-val status-badge">Available for Internships</span>
              </div>
            </div>
            
            <div className="about__cta-wrapper">
              <a href="#contact" className="btn-primary">Get in Touch</a>
            </div>
          </div>

          {/* Right Panel: Journey Timeline */}
          <div className="about__timeline-wrapper">
            <h3 className="about__timeline-title reveal">Milestones</h3>
            <div className="about__timeline">
              {aboutTimeline.map((item, idx) => (
                <div 
                  key={item.year} 
                  className={`about__timeline-item reveal delay-${(idx + 1) * 100}`}
                >
                  <div className="about__timeline-dot">
                    <span className="about__timeline-icon">{item.icon}</span>
                  </div>
                  
                  <div className="about__timeline-content glass-card">
                    <div className="about__timeline-year">{item.year}</div>
                    <h4 className="about__timeline-item-title">{item.title}</h4>
                    <p className="about__timeline-item-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
