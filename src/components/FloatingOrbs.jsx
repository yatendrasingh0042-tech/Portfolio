export default function FloatingOrbs() {
  const orbs = [
    { size: 500, top: '-10%', left: '-10%', color: '#6366F1', delay: 0, speed: '0.03' },
    { size: 400, top: '40%', right: '-8%', color: '#8B5CF6', delay: 2, speed: '0.05' },
    { size: 350, bottom: '-5%', left: '30%', color: '#06B6D4', delay: 1, speed: '0.04' },
    { size: 300, top: '20%', left: '50%', color: '#10B981', delay: 3, speed: '0.02' },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -8 }} aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={i}
          data-parallax={orb.speed}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color}22 0%, transparent 70%)`,
            filter: 'blur(60px)',
            animation: `pulseGlow ${6 + i}s ease-in-out ${orb.delay}s infinite`,
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      ))}
      {/* Gradient mesh overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(99,102,241,0.07) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139,92,246,0.06) 0%, transparent 50%),
          radial-gradient(ellipse 50% 60% at 50% 10%, rgba(6,182,212,0.05) 0%, transparent 50%)
        `,
      }} />
    </div>
  );
}
