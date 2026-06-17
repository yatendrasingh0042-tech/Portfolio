import { education } from '../data/portfolio';
import './Education.css';

export default function Education() {
  return (
    <section id="education" className="section" aria-label="Education">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal text-center">
          <div className="section-label">🎓 Academic Foundation</div>
          <h2 className="section-title">
            Education & <span className="gradient-text">Qualifications</span>
          </h2>
          <p className="section-subtitle">
            My academic credentials, key coursework, and core computer science fundamentals.
          </p>
        </div>

        {/* Layout split */}
        <div className="education__card glass-card reveal">
          <div className="education__glow" />
          
          <div className="education__grid">
            {/* Info Side */}
            <div className="education__info">
              <div className="education__degree-wrapper">
                <span className="education__cap-icon">🎓</span>
                <div>
                  <span className="education__duration">{education.duration}</span>
                  <h3 className="education__degree">{education.degree}</h3>
                  <p className="education__institute">A.P.J. Abdul Kalam Technical University (AKTU) Affiliated College</p>
                </div>
              </div>

              {/* CGPA Display */}
              <div className="education__stats">
                <div className="education__stat-box glass-card">
                  <div className="education__stat-num">{education.cgpa}</div>
                  <div className="education__stat-lbl">CGPA ({education.cgpaSemester})</div>
                </div>
                <div className="education__stat-box glass-card">
                  <div className="education__stat-num">5th</div>
                  <div className="education__stat-lbl">Current Semester</div>
                </div>
              </div>
            </div>

            {/* Coursework Side */}
            <div className="education__coursework">
              <h4 className="education__coursework-title">Key Coursework</h4>
              <div className="education__coursework-grid">
                {education.coursework.map((course, idx) => (
                  <div key={course} className={`education__chip clickable reveal delay-${(idx % 3 + 1) * 100}`}>
                    <span className="education__chip-dot" />
                    {course}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
