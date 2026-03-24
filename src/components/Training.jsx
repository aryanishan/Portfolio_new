import { BriefcaseBusiness, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const TRAINING_CERTIFICATE = '/my-training-certificate.png';

const TRAINING = [
  {
    title: 'Lovely Professional University (Skill development)',
    date: "Jun '25 - Jul '25",
    items: [
      'Designed interactive Power BI dashboards using DAX, data modeling, and real business datasets.',
      'Built an end-to-end ML pipeline from data cleaning and feature engineering to model training and evaluation in Python.',
      'Applied MySQL and Excel for structured data management, joins, pivot tables, VLOOKUPs, and reporting.',
    ],
  },
];

export default function Training() {
  const ref = useScrollReveal({ threshold: 0.15 });

  return (
    <section id="training" className="px-6 py-10" ref={ref}>
      <div className="section-container section-panel">
        <div className="relative z-10">
          <div data-reveal className="reveal text-center mb-12">
            <span className="text-sm font-semibold tracking-[0.24em] uppercase" style={{ color: 'var(--accent)' }}>
              Training
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text)' }}>
              Professional learning and hands-on development.
            </h2>
          </div>

          <div data-reveal className="reveal glass-card rounded-[10px] p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-[10px] flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent)' }}>
                <BriefcaseBusiness size={22} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>Training Program</p>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Skill development</h3>
              </div>
            </div>

            {TRAINING.map(training => (
              <div key={training.title} className="rounded-[10px] border p-5" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--card-strong) 72%, transparent)' }}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{training.title}</h4>
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{training.date}</span>
                </div>
                <ul className="space-y-3 text-sm leading-7 pl-5" style={{ color: 'var(--text-muted)' }}>
                  {training.items.map(item => (
                    <li key={item} className="list-disc">{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-6 rounded-[10px] border p-5" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--card-strong) 72%, transparent)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>Training Certificate</p>
                  <h4 className="mt-1 text-lg font-bold" style={{ color: 'var(--text)' }}>Certificate Preview</h4>
                </div>
                <a
                  href={TRAINING_CERTIFICATE}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: 'var(--accent)' }}
                >
                  <ExternalLink size={16} />
                  Open Certificate
                </a>
              </div>

              <a
                href={TRAINING_CERTIFICATE}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-[10px] border transition-transform hover:scale-[1.01]"
                style={{ borderColor: 'var(--border)' }}
              >
                <img
                  src={TRAINING_CERTIFICATE}
                  alt="Training certificate preview"
                  className="w-full h-auto object-cover object-top"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
