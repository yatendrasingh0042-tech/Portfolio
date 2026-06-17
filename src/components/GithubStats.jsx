import { useState, useEffect, useRef } from 'react';
import './GithubStats.css';

// Mock GitHub activity for last 20 weeks (7 x 20 = 140 days)
const generateMockActivity = () => {
  const levels = [0, 1, 2, 3, 4];
  const activity = [];
  for (let i = 0; i < 140; i++) {
    // Randomize activity, higher values on weekdays
    const dayOfWeek = i % 7;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const rand = Math.random();
    let level = 0;
    if (isWeekend) {
      level = rand > 0.8 ? levels[Math.floor(Math.random() * 2) + 1] : 0;
    } else {
      level = rand > 0.4 ? levels[Math.floor(Math.random() * 4) + 1] : 0;
    }
    activity.push(level);
  }
  return activity;
};

const activityLevels = generateMockActivity();

export default function GithubStats() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

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
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="github-stats" className="section" aria-label="Coding Profiles">
      <div className="container" ref={containerRef}>
        {/* Header */}
        <div className="section-header reveal text-center">
          <div className="section-label">📊 Coding Metrics</div>
          <h2 className="section-title">
            Developer <span className="gradient-text">Activity</span> & Profiles
          </h2>
          <p className="section-subtitle">
            Live and simulated statistics tracking my commits, repositories, coding streaks, and algorithm challenges.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="stats-dashboard">
          {/* GitHub Stats Card */}
          <div className="stats-card github-card glass-card reveal delay-100">
            <div className="stats-card__header">
              <span className="stats-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </span>
              <div>
                <h3 className="stats-card__title">GitHub Profile</h3>
                <a href="https://github.com/yatendrasingh0042-tech" target="_blank" rel="noreferrer" className="stats-card__link clickable">
                  @yatendrasingh0042-tech
                </a>
              </div>
            </div>

            <div className="github-overview">
              <div className="github-overview__item">
                <span className="github-overview__num">12</span>
                <span className="github-overview__lbl">Repositories</span>
              </div>
              <div className="github-overview__item">
                <span className="github-overview__num">500+</span>
                <span className="github-overview__lbl">Commits This Year</span>
              </div>
              <div className="github-overview__item">
                <span className="github-overview__num">15</span>
                <span className="github-overview__lbl">Stars Earned</span>
              </div>
            </div>

            {/* GitHub Contributions Map Grid */}
            <div className="github-contrib">
              <div className="github-contrib__title">Contribution History (Last 20 Weeks)</div>
              <div className="github-contrib__grid">
                {activityLevels.map((level, i) => (
                  <div
                    key={i}
                    className={`github-contrib__cell level-${level}`}
                    style={{
                      transitionDelay: inView ? `${Math.floor(i / 7) * 15}ms` : '0ms',
                      transform: inView ? 'scale(1)' : 'scale(0)'
                    }}
                  />
                ))}
              </div>
              <div className="github-contrib__legend">
                <span>Less</span>
                <div className="github-contrib__cell level-0" />
                <div className="github-contrib__cell level-1" />
                <div className="github-contrib__cell level-2" />
                <div className="github-contrib__cell level-3" />
                <div className="github-contrib__cell level-4" />
                <span>More</span>
              </div>
            </div>
          </div>

          {/* LeetCode Stats Card */}
          <div className="stats-card leetcode-card glass-card reveal delay-200">
            <div className="stats-card__header">
              <span className="stats-card__icon leetcode-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16.102 17.93l-2.697 2.607c-.466.45-1.211.45-1.677 0l-8.479-8.192a1.144 1.144 0 0 1 0-1.683L11.728 2.47c.466-.45 1.211-.45 1.677 0l2.697 2.607c.466.45.466 1.17 0 1.62l-7.64 7.382a.382.382 0 0 0 0 .542l7.64 7.382c.466.45.466 1.17 0 1.622t-.605-.072zM21.93 11.233c.466.45.466 1.17 0 1.62l-2.698 2.607c-.466.45-1.211.45-1.677 0L9.076 7.27a1.144 1.144 0 0 1 0-1.683L11.774 2.98c.466-.45 1.211-.45 1.677 0l8.479 8.192a.382.382 0 0 1 0 .61z"/></svg>
              </span>
              <div>
                <h3 className="stats-card__title">LeetCode Profile</h3>
                <a href="https://leetcode.com/u/Yatendra_singh0042/" target="_blank" rel="noreferrer" className="stats-card__link clickable">
                  @Yatendra_singh0042
                </a>
              </div>
            </div>

            <div className="leetcode-content">
              {/* Circular Gauge */}
              <div className="leetcode-progress">
                <svg className="leetcode-circle" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="circle-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="circle-fg"
                    style={{ strokeDashoffset: inView ? 251 - (251 * 180) / 500 : 251 }}
                  />
                </svg>
                <div className="leetcode-progress__text">
                  <span className="solved-num">180</span>
                  <span className="total-num">/ 500+</span>
                </div>
              </div>

              {/* Stats detail bars */}
              <div className="leetcode-bars">
                <div className="lc-bar-item">
                  <div className="lc-bar-label">
                    <span>Easy</span>
                    <span className="lc-bar-num">80 / 120</span>
                  </div>
                  <div className="lc-bar-bg"><div className="lc-bar-fill easy" style={{ width: inView ? '66%' : '0%' }} /></div>
                </div>

                <div className="lc-bar-item">
                  <div className="lc-bar-label">
                    <span>Medium</span>
                    <span className="lc-bar-num">85 / 250</span>
                  </div>
                  <div className="lc-bar-bg"><div className="lc-bar-fill medium" style={{ width: inView ? '34%' : '0%' }} /></div>
                </div>

                <div className="lc-bar-item">
                  <div className="lc-bar-label">
                    <span>Hard</span>
                    <span className="lc-bar-num">15 / 130</span>
                  </div>
                  <div className="lc-bar-bg"><div className="lc-bar-fill hard" style={{ width: inView ? '11%' : '0%' }} /></div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="leetcode-badges">
              <div className="badge-item glass-card" title="50 Days Challenge Badge">
                <span className="badge-icon">🏅</span>
                <span className="badge-text">50 Days Streak</span>
              </div>
              <div className="badge-item glass-card" title="Completed 150+ Questions">
                <span className="badge-icon">⭐</span>
                <span className="badge-text">150+ Solved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Languages Distribution */}
        <div className="stats-languages glass-card reveal delay-300">
          <h4 className="languages-title">Most Used Programming Languages</h4>
          <div className="languages-bar">
            <div className="lang-segment python" style={{ width: inView ? '45%' : '0%' }} title="Python: 45%" />
            <div className="lang-segment js" style={{ width: inView ? '35%' : '0%' }} title="JavaScript: 35%" />
            <div className="lang-segment cpp" style={{ width: inView ? '12%' : '0%' }} title="C++: 12%" />
            <div className="lang-segment htmlcss" style={{ width: inView ? '8%' : '0%' }} title="HTML/CSS: 8%" />
          </div>
          <div className="languages-legend">
            <div className="lang-legend-item"><span className="lang-color python" /><span>Python (45%)</span></div>
            <div className="lang-legend-item"><span className="lang-color js" /><span>JavaScript (35%)</span></div>
            <div className="lang-legend-item"><span className="lang-color cpp" /><span>C++ (12%)</span></div>
            <div className="lang-legend-item"><span className="lang-color htmlcss" /><span>HTML/CSS (8%)</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
