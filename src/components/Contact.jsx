import { useState } from 'react';
import { personalInfo } from '../data/portfolio';
import './Contact.css';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/yatendrapratapsingh',
    color: '#6366F1',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>,
    username: '@yatendrapratapsingh',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yatendrapratapsingh',
    color: '#06B6D4',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
    username: 'Yatendra Pratap Singh',
  },
  {
    label: 'Email',
    href: `mailto:${personalInfo.email}`,
    color: '#10B981',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    username: personalInfo.email,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    // Simulate send (replace with real API/EmailJS/Formspree)
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="container">
        <div className="section-header reveal text-center">
          <div className="section-label">📬 Get In Touch</div>
          <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
          <p className="section-subtitle">
            Open to internships, collaborations, and full-time opportunities. Feel free to reach out!
          </p>
        </div>

        <div className="contact__grid">
          {/* Left — Info */}
          <div className="contact__info reveal-left">
            <div className="glass-card contact__info-card">
              <h3 className="contact__info-heading">Open to Opportunities</h3>
              <p className="contact__info-text">
                Whether you have a project idea, a job opportunity, or just want to connect — my inbox is always open. I typically reply within 24 hours.
              </p>

              <div className="contact__social-links">
                {SOCIAL_LINKS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-item"
                    aria-label={s.label}
                  >
                    <div className="contact__social-icon" style={{ color: s.color, background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                      {s.icon}
                    </div>
                    <div className="contact__social-text">
                      <span className="contact__social-label">{s.label}</span>
                      <span className="contact__social-username">{s.username}</span>
                    </div>
                    <svg className="contact__social-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <div className="contact__avail">
                <span className="contact__avail-dot" aria-hidden="true" />
                <span>Currently available for new opportunities</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact__form-wrap reveal-right">
            <form
              className="glass-card contact__form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="contact-name" className="contact__label">Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="contact__input"
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-email" className="contact__label">Email *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="contact__input"
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="contact-subject" className="contact__label">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className="contact__input"
                  placeholder="What's this about?"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message" className="contact__label">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="contact__input contact__textarea"
                  placeholder="Tell me about your project, opportunity, or just say hi..."
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn-primary contact__submit ${status === 'sending' ? 'contact__submit--loading' : ''} ${status === 'sent' ? 'contact__submit--sent' : ''}`}
                disabled={status === 'sending' || status === 'sent'}
                id="contact-submit-btn"
              >
                {status === 'idle' && (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message</>
                )}
                {status === 'sending' && <><span className="contact__spinner" />Sending...</>}
                {status === 'sent' && <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!</>}
                {status === 'error' && 'Try Again'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
