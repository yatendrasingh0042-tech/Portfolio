import { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import FloatingOrbs from './components/FloatingOrbs';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import GithubStats from './components/GithubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Interactivity Components
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

import useScrollReveal from './hooks/useScrollReveal';
import useMouseParallax from './hooks/useMouseParallax';
import './index.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  useScrollReveal([loading]);
  useMouseParallax();

  // Prevent FOUC on load
  useEffect(() => {
    if (!loading) {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease';
      const t = setTimeout(() => { document.body.style.opacity = '1'; }, 50);
      return () => clearTimeout(t);
    }
  }, [loading]);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="app" id="app-root">
      {/* Scroll Progress & Custom Cursor */}
      <ScrollProgress />
      <CustomCursor />

      {/* Background Layers */}
      <ParticleCanvas />
      <FloatingOrbs />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" role="main">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Experience />
        <Certifications />
        <GithubStats />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
