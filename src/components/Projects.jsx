import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Travel Companion App',
    period: "Feb '26",
    description:
      'A travel matching platform that connects users by destination, schedule, and preferences, with collaborative trip planning and room to grow into booking, payments, and recommendations.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'REST APIs'],
    screenshots: [
      '/travel-companion-1.png',
      '/travel-companion-2.png',
      '/travel-companion-3.png',
      '/travel-companion-4.png',
      '/travel-companion-5.png',
      '/travel-companion-6.png',
    ],
    github: 'https://github.com/aryanishan',
    live: '#',
    tone: 'from-[#ff7d57]/25 to-transparent',
  },
  {
    title: 'Creator Connect App',
    period: '',
    description:
      'A collaboration platform for small creators with clean onboarding, scalable architecture, and a modern presentation layer.',
    tags: ['Node.js', 'Express.js', 'REST APIs'],
    screenshots: [
      '/creator-connect-1.png',
      '/creator-connect-2.png',
      '/creator-connect-3.png',
      '/creator-connect-4.png',
      '/creator-connect-5.png',
      '/creator-connect-6.png',
      '/creator-connect-7.png',
    ],
    github: 'https://github.com/aryanishan',
    live: '#',
    tone: 'from-[#ff6464]/25 to-transparent',
  },
  {
    title: 'Weather Fetching App',
    period: '',
    description:
      'A responsive weather dashboard that pairs real-time data with a simple and highly readable user interface.',
    tags: ['JavaScript', 'OpenWeather API', 'Responsive UI'],
    screenshots: [],
    github: 'https://github.com/aryanishan',
    live: '#',
    tone: 'from-[#ff8b5c]/25 to-transparent',
  },
  {
    title: 'Spam SMS Detector',
    period: '',
    description:
      'An NLP-powered project that classifies messages with a machine learning pipeline and a practical Flask integration.',
    tags: ['Python', 'Scikit-learn', 'Flask'],
    screenshots: [],
    github: 'https://github.com/aryanishan',
    live: '#',
    tone: 'from-[#ff7a65]/20 to-transparent',
  },
];

const FILTERS = ['All', 'React', 'Node.js', 'JavaScript', 'Python'];

export default function Projects() {
  const ref = useRef(null);
  const [filter, setFilter] = useState('All');
  const [selectedShot, setSelectedShot] = useState(null);

  const filtered = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(project => project.tags.some(tag => tag.includes(filter)));

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('[data-anim]').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.1}s`;
            el.classList.add('opacity-100', 'translate-y-0');
            el.classList.remove('opacity-0', 'translate-y-6');
          });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedShot) return undefined;

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setSelectedShot(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedShot]);

  return (
    <section id="projects" className="px-6 py-10" ref={ref}>
      <div className="section-container section-panel">
        <div className="relative z-10">
          <div className="text-center mb-10" data-anim>
            <span className="text-sm font-semibold tracking-[0.24em] uppercase" style={{ color: 'var(--accent)' }}>
              Portfolio
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text)' }}>
              Selected projects with strong UX and clean structure.
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10" data-anim>
            {FILTERS.map(item => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
                style={{
                  background: filter === item ? 'linear-gradient(135deg, var(--accent), var(--accent2))' : 'color-mix(in srgb, var(--card-strong) 70%, transparent)',
                  color: filter === item ? '#fff' : 'var(--text-muted)',
                  border: `1px solid ${filter === item ? 'transparent' : 'var(--border)'}`,
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <article
                key={project.title}
                data-anim
                className="glass-card hover-lift rounded-[10px] p-6 opacity-0 translate-y-6 transition-all duration-700 overflow-hidden relative"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${project.tone}`} />
                <div className="relative z-10">
                  <div
                    className="inline-flex rounded-full border px-3 py-1 text-xs font-bold tracking-[0.18em] uppercase"
                    style={{
                      borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
                      background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    Featured
                  </div>
                  <h3 className="mt-5 text-2xl font-bold" style={{ color: 'var(--text)' }}>{project.title}</h3>
                  {project.period ? (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
                      {project.period}
                    </p>
                  ) : null}
                  <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  {project.screenshots?.length ? (
                    <div className="mt-5">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
                        Screens
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {project.screenshots.map((src, shotIndex) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setSelectedShot({
                              src,
                              alt: `${project.title} screenshot ${shotIndex + 1}`,
                            })}
                            className="block overflow-hidden rounded-lg border"
                            style={{ borderColor: 'var(--border)', background: 'var(--card-strong)' }}
                            aria-label={`${project.title} screenshot ${shotIndex + 1}`}
                          >
                            <img
                              src={src}
                              alt={`${project.title} screenshot ${shotIndex + 1}`}
                              className="h-20 w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-8 flex items-center gap-4 text-sm font-semibold">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                      <Github size={16} />
                      Code
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {selectedShot ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedShot(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border bg-white shadow-2xl"
            style={{ borderColor: 'var(--border)' }}
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedShot(null)}
              className="absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-sm font-semibold"
              style={{
                background: 'rgba(29, 36, 48, 0.78)',
                color: '#fff',
              }}
              aria-label="Close image preview"
            >
              Close
            </button>
            <img
              src={selectedShot.src}
              alt={selectedShot.alt}
              className="max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
