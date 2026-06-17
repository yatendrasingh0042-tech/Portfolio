import { useState } from 'react';
import { certifications } from '../data/portfolio';
import './Certifications.css';

const colorMap = {
  indigo: { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', text: '#818CF8' },
  violet: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', text: '#A78BFA' },
  emerald: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', text: '#34D399' },
  cyan: { bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)', text: '#22D3EE' },
};

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="section" aria-label="Certifications">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal text-center">
          <div className="section-label">🏆 Credentials</div>
          <h2 className="section-title">Certifications & <span className="gradient-text">Achievements</span></h2>
          <p className="section-subtitle">
            Verified credentials from globally recognized platforms that complement my academic journey.
          </p>
        </div>

        {/* Certs Grid */}
        <div className="certs__grid">
          {certifications.map((cert, i) => {
            const colors = colorMap[cert.color] || colorMap.indigo;
            return (
              <div
                key={cert.id}
                className={`certs__card glass-card clickable reveal-scale delay-${(i % 4 + 1) * 100}`}
                onClick={() => setSelectedCert(cert)}
              >
                {/* Icon */}
                <div className="certs__icon-wrap" style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                  <span className="certs__icon">{cert.icon}</span>
                </div>

                <div className="certs__body">
                  <div className="certs__meta">
                    <span className="certs__issuer" style={{ color: colors.text }}>{cert.issuer}</span>
                    <span className="certs__date">{cert.date}</span>
                  </div>
                  <h3 className="certs__title">{cert.title}</h3>

                  <div className="certs__skills">
                    {cert.skills.slice(0, 3).map(s => (
                      <span
                        key={s}
                        className="certs__skill"
                        style={{ background: colors.bg, borderColor: colors.border, color: colors.text }}
                      >
                        {s}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="certs__skill-more" style={{ color: colors.text }}>
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <button
                    className="certs__verify clickable"
                    style={{ color: colors.text, background: 'none', border: 'none', padding: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }}
                    aria-label={`View ${cert.title} details`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    View Details
                  </button>
                </div>

                {/* Accent */}
                <div className="certs__accent" style={{ background: `linear-gradient(90deg, ${colors.text}, transparent)` }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Certification Details Modal */}
      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal__close clickable" onClick={() => setSelectedCert(null)} aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            
            <div className="cert-modal__content">
              <div className="cert-modal__badge">{selectedCert.icon}</div>
              <span className="cert-modal__issuer" style={{ color: colorMap[selectedCert.color]?.text || '#818CF8' }}>
                {selectedCert.issuer}
              </span>
              <h3 className="cert-modal__title">{selectedCert.title}</h3>
              <p className="cert-modal__date">Earned in {selectedCert.date}</p>
              
              <div className="cert-modal__divider" />
              
              <div className="cert-modal__section">
                <span className="cert-modal__section-title">Skills & Focus Areas</span>
                <div className="cert-modal__skills">
                  {selectedCert.skills.map(s => (
                    <span
                      key={s}
                      className="certs__skill"
                      style={{
                        background: colorMap[selectedCert.color]?.bg || 'rgba(99,102,241,0.08)',
                        borderColor: colorMap[selectedCert.color]?.border || 'rgba(99,102,241,0.2)',
                        color: colorMap[selectedCert.color]?.text || '#818CF8',
                        fontSize: '0.8rem',
                        padding: '0.35rem 0.75rem'
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="cert-modal__actions">
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary clickable cert-modal__verify-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px' }}><polyline points="20 6 9 17 4 12"/></svg>
                  Verify Credential
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
