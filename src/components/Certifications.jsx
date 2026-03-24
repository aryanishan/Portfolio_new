import { Award } from 'lucide-react';
import BounceCards from './BounceCards';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CERTIFICATIONS = [
  {
    title: 'Build Generative AI apps and Solution',
    issuer: 'Infosys',
    date: "Aug '25",
    image: '/build-ai-generative.png',
  },
  {
    title: 'Master Generative AI and Generative AI tools',
    issuer: 'Infosys',
    date: "Aug '25",
    image: '/master-generative-ai.png',
  },
  {
    title: 'Fundamentals of Network Communication',
    issuer: 'Coursera',
    date: "Oct '24",
    image: '/fundamentals-of-computer-network.png',
  },
];

export default function Certifications() {
  const ref = useScrollReveal({ threshold: 0.15 });
  const bounceImages = CERTIFICATIONS.map(cert => ({
    src: cert.image,
    alt: cert.title,
    href: cert.image,
  }));
  const transformStyles = [
    'rotate(-6deg) translate(-170px)',
    'rotate(0deg) translate(0px)',
    'rotate(6deg) translate(170px)',
  ];

  return (
    <section id="certifications" className="px-6 py-10" ref={ref}>
      <div className="section-container section-panel">
        <div className="relative z-10">
          <div data-reveal className="reveal text-center mb-12">
            <span className="text-sm font-semibold tracking-[0.24em] uppercase" style={{ color: 'var(--accent)' }}>
              Certifications
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text)' }}>
              Verified courses and credentials.
            </h2>
          </div>

          <div data-reveal className="reveal glass-card rounded-[10px] p-7">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-[10px] flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--accent2) 14%, transparent)', color: 'var(--accent2)' }}>
                <Award size={22} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>Credentials</p>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Certified learning</h3>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {CERTIFICATIONS.map(cert => (
                <div key={cert.title} className="rounded-[10px] border p-4 md:p-5" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold leading-6" style={{ color: 'var(--text)' }}>{cert.title}</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{cert.issuer}</p>
                    </div>
                    <span className="text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--accent)' }}>{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>
                Certificate Images
              </p>
              <div
                className="rounded-[10px] border px-4 py-6 md:px-6"
                style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--card-strong) 76%, transparent)' }}
              >
                <BounceCards
                  className="custom-bounceCards"
                  images={bounceImages}
                  containerWidth={640}
                  containerHeight={260}
                  animationDelay={0.8}
                  animationStagger={0.08}
                  easeType="elastic.out(1, 0.5)"
                  transformStyles={transformStyles}
                  enableHover
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
