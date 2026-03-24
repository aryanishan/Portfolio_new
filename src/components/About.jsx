import { useEffect, useRef } from 'react';
import { Code2, Coffee, Globe, Zap } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

const STATS = [
  { icon: <Zap size={18} />, value: '600+', label: 'Problems Solved' },
  { icon: <Code2 size={18} />, value: '12+', label: 'Portfolio Builds' },
  { icon: <Globe size={18} />, value: '3+', label: 'Certifications' },
  { icon: <Coffee size={18} />, value: '24/7', label: 'Creative Energy' },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-anim]').forEach((el, i) => {
              el.style.transitionDelay = `${i * 0.1}s`;
              el.classList.add('opacity-100', 'translate-y-0');
              el.classList.remove('opacity-0', 'translate-y-6');
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="px-6 pb-10" ref={ref}>
      <div className="section-container section-panel">
        <div className="relative z-10 grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <div className="flex justify-center" data-anim>
            <div className="relative w-full max-w-[410px] opacity-0 translate-y-6 transition-all duration-700" data-anim>
              <div
                className="absolute -inset-3 rounded-[10px] opacity-70 blur-2xl"
                style={{ background: 'radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%)' }}
              />
              <div
                className="relative overflow-hidden rounded-[10px] border p-3 shadow-[0_28px_70px_rgba(0,0,0,0.22)]"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent) 20%, var(--border))',
                  background: 'linear-gradient(to bottom right, var(--card-strong), var(--card))',
                }}
              >
                <div className="overflow-hidden rounded-[10px] h-[420px] md:h-[500px]">
                  <img
                    src={profileImg}
                    alt="Aryan Gupta"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)',
                  background: 'var(--card-strong)',
                  color: 'var(--accent)',
                }}
              >
                Full Stack Developer
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div data-anim className="opacity-0 translate-y-6 transition-all duration-700">
              <span className="text-sm font-semibold tracking-[0.24em] uppercase text-[#ff9696]">
                About Me
              </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text)' }}>
                Modern design, clean code, and strong visual detail.
              </h2>
            </div>

            <p
              data-anim
              className="text-base leading-8 text-[color:var(--text-muted)] opacity-0 translate-y-6 transition-all duration-700"
            >
              I build portfolio websites and interactive interfaces that feel premium, readable, and fast. My focus is turning ideas into layouts that look confident on desktop and mobile.
            </p>

            <p
              data-anim
              className="text-base leading-8 text-[color:var(--text-muted)] opacity-0 translate-y-6 transition-all duration-700"
            >
              Alongside frontend work, I enjoy full stack development, problem solving, and polishing user experience details that make a site feel complete.
            </p>

            <div
              data-anim
              className="grid sm:grid-cols-2 gap-4 pt-2 opacity-0 translate-y-6 transition-all duration-700"
            >
              {STATS.map(({ icon, value, label }) => (
                <div key={label} className="glass-card hover-lift rounded-[10px] p-5">
                  <div className="flex items-center gap-3" style={{ color: 'var(--accent)' }}>
                    {icon}
                    <span className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>{value}</span>
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--text-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
