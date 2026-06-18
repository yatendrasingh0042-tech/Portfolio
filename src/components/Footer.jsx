import { personalInfo, navLinks } from '../data/portfolio';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="footer" role="contentinfo">
      {/* Top divider glow */}
      <div className="footer__glow-line" aria-hidden="true" />

      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">YPS</span>
            <span className="footer__logo-name">Yatendra Pratap Singh</span>
          </div>
          <p className="footer__tagline">
            Building scalable digital experiences with<br />
            Full Stack Development, Data Analytics & AI.
          </p>
          <div className="footer__socials">
            {[
              { href: personalInfo.github, label: 'GitHub', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg> },
              { href: personalInfo.linkedin, label: 'LinkedIn', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
              { href: `mailto:${personalInfo.email}`, label: 'Email', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
              { href: personalInfo.twitter, label: 'Twitter', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg> },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div className="footer__nav">
          <h4 className="footer__nav-title">Navigation</h4>
          <ul className="footer__nav-list">
            {navLinks.map(link => (
              <li key={link.label}>
                <button className="footer__nav-link" onClick={() => handleNav(link.href)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="footer__contact">
          <h4 className="footer__nav-title">Contact</h4>
          <div className="footer__contact-items">
            <a href={`mailto:${personalInfo.email}`} className="footer__contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {personalInfo.email}
            </a>
            <div className="footer__contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {personalInfo.location}
            </div>
            <div className="footer__contact-item footer__avail">
              <span className="footer__avail-dot" aria-hidden="true" />
              Available for opportunities
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {year} Yatendra Pratap Singh. Crafted with{' '}
            <span className="footer__heart" aria-label="love">❤️</span>{' '}
            & React.
          </p>
          <button
            className="footer__back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
