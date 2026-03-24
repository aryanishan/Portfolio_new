import { ArrowUpRight, Download, Sparkles } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PARTICLES = [
  { top: '12%', left: '8%', width: 150, height: 90 },
  { top: '18%', left: '40%', width: 120, height: 70 },
  { top: '60%', left: '12%', width: 140, height: 88 },
  { top: '68%', left: '52%', width: 120, height: 80 },
];

function Particle({ top, left, width, height }) {
  return (
    <svg
      className="absolute hidden md:block"
      style={{ top, left, width, height, color: 'color-mix(in srgb, var(--accent) 40%, transparent)' }}
      viewBox="0 0 200 120"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="20" cy="25" r="3" fill="currentColor" />
      <circle cx="90" cy="18" r="3" fill="currentColor" />
      <circle cx="150" cy="50" r="3" fill="currentColor" />
      <circle cx="55" cy="88" r="3" fill="currentColor" />
      <circle cx="178" cy="94" r="3" fill="currentColor" />
      <path d="M20 25L90 18L150 50L55 88L20 25ZM150 50L178 94L55 88" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function Hero() {
  const ref = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-36 pb-20 px-6 flex items-center"
      ref={ref}
    >
      <div className="hero-mesh" />
      {PARTICLES.map(particle => (
        <Particle key={`${particle.top}-${particle.left}`} {...particle} />
      ))}

      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        <div className="relative z-10">
          <div
            data-reveal
            className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm tracking-[0.18em] uppercase"
            style={{
              borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
              background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              color: 'var(--accent)',
            }}
          >
            <Sparkles size={16} />
            Hello!
          </div>

          <h1
            data-reveal
            className="reveal mt-8 text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-3xl"
            style={{ color: 'var(--text)' }}
          >
            I Am <span className="gradient-text">Aryan Gupta</span>
          </h1>

          <p
            data-reveal
            className="reveal mt-6 max-w-2xl text-base md:text-lg leading-8"
            style={{ color: 'var(--text-muted)' }}
          >
            I&apos;m a web developer focused on modern portfolio sites, interactive interfaces, and clean full stack builds that feel polished from the first screen.
          </p>

          <div data-reveal className="reveal mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff5f5f] to-[#ff8258] px-7 py-3.5 font-bold text-white shadow-[0_18px_45px_rgba(255,93,93,0.35)] transition-transform hover:scale-105"
            >
              View Work
              <ArrowUpRight size={18} />
            </a>
            <a
              href="/my-cv.png"
              download
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 font-bold transition-colors"
              style={{
                borderColor: 'var(--border)',
                background: 'color-mix(in srgb, var(--card-strong) 75%, transparent)',
                color: 'var(--text)',
              }}
            >
              Download CV
              <Download size={18} />
            </a>
          </div>
        </div>

        <div data-reveal className="reveal relative flex justify-center lg:justify-end">
          <div
            className="absolute inset-x-4 top-8 bottom-8 rounded-[10px] blur-3xl"
            style={{ background: 'linear-gradient(to bottom right, color-mix(in srgb, var(--accent) 15%, transparent), transparent)' }}
          />
          <div className="relative w-full max-w-[560px] min-h-[520px] sm:min-h-[580px] flex items-center justify-center">
            <div
              className="absolute inset-x-4 top-8 bottom-8 rounded-[10px] border"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent) 25%, var(--border))',
                background: 'color-mix(in srgb, var(--card-strong) 55%, transparent)',
              }}
            />
            <div
              className="relative aspect-square w-[290px] sm:w-[360px] md:w-[430px] rounded-full border-[10px] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
              style={{ borderColor: 'var(--border)', background: 'linear-gradient(to bottom right, var(--bg3), var(--bg2))' }}
            >
              <div
                className="absolute inset-4 rounded-full border"
                style={{ borderColor: 'color-mix(in srgb, var(--accent) 22%, transparent)' }}
              />
              <img
                src={profileImg}
                alt="Aryan Gupta"
                className="h-full w-full rounded-full object-cover object-center relative z-10"
              />
            </div>

            <div className="absolute left-0 bottom-14 z-20 glass-card rounded-[10px] px-5 py-4 max-w-[260px] sm:max-w-[290px]">
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>Role</p>
              <p className="mt-1 text-base sm:text-lg font-bold leading-snug" style={{ color: 'var(--text)' }}>
                Full Stack Developer, Data Scientist
              </p>
            </div>

            <div className="absolute top-10 right-0 z-20 glass-card rounded-[10px] px-5 py-4 min-w-[180px]">
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>Experience</p>
              <p className="mt-1 text-lg font-bold" style={{ color: 'var(--text)' }}>3+ Years</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
