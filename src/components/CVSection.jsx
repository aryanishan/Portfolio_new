import { Download, ExternalLink, FileImage } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CV_FILE = '/my-cv.png';

export default function CVSection() {
  const ref = useScrollReveal({ threshold: 0.15 });

  return (
    <section id="cv" className="px-6 py-10" ref={ref}>
      <div className="section-container section-panel">
        <div className="relative z-10">
          <div data-reveal className="reveal text-center mb-12">
            <span className="text-sm font-semibold tracking-[0.24em] uppercase" style={{ color: 'var(--accent)' }}>
              CV
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text)' }}>
              Preview my real CV and open or download it anytime.
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div data-reveal className="reveal glass-card rounded-[10px] p-5 md:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-[10px] flex items-center justify-center"
                  style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent)' }}
                >
                  <FileImage size={22} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>Live Preview</p>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>My CV</h3>
                </div>
              </div>

              <a
                href={CV_FILE}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[10px] overflow-hidden border transition-transform hover:scale-[1.01]"
                style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--card-strong) 78%, transparent)' }}
              >
                <img src={CV_FILE} alt="Aryan Gupta CV preview" className="w-full h-auto object-cover object-top" />
              </a>
            </div>

            <div data-reveal className="reveal glass-card rounded-[10px] p-7 flex flex-col justify-between min-h-[320px]">
              <div>
                <p className="text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>Resume File</p>
                <h3 className="mt-3 text-3xl font-bold" style={{ color: 'var(--text)' }}>Use the original CV from your folder</h3>
                <p className="mt-4 text-sm leading-7" style={{ color: 'var(--text-muted)' }}>
                  This section now uses your actual file named <strong>my cv.png</strong> and shows its preview directly inside the portfolio.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={CV_FILE}
                  download="Aryan-Gupta-CV.png"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff5f5f] to-[#ff8258] px-6 py-3 font-bold text-white"
                >
                  <Download size={18} />
                  Download CV
                </a>
                <a
                  href={CV_FILE}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-bold"
                  style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                >
                  <ExternalLink size={18} />
                  Open In New Tab
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
