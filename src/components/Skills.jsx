import { useEffect, useRef, useState } from 'react';

const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    skills: [
      { name: 'HTML / CSS', level: 95 },
      { name: 'React.js', level: 90 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'JavaScript', level: 86 },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 84 },
      { name: 'Express.js', level: 82 },
      { name: 'REST APIs', level: 88 },
      { name: 'MySQL', level: 80 },
    ],
  },
  {
    label: 'Creative Stack',
    skills: [
      { name: 'UI Composition', level: 92 },
      { name: 'Responsive Design', level: 94 },
      { name: 'Animations', level: 85 },
      { name: 'Problem Solving', level: 96 },
    ],
  },
];

const LOGO_ITEMS = [
  { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Tailwind CSS', src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
  { name: 'Vite', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C++', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Scikit-learn', src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
];

const TECH_BADGES = [
  'React.js', 'Tailwind', 'Vite', 'JavaScript', 'Node.js', 'Express.js',
  'MySQL', 'REST API', 'GitHub', 'Responsive UI', 'Figma Thinking', 'Performance',
];

function SkillBar({ name, level, animate }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{name}</span>
        <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>{level}%</span>
      </div>
      <div className="w-full h-1 rounded-full" style={{ background: 'color-mix(in srgb, var(--text) 10%, transparent)' }}>
        <div className="skill-bar-fill" style={{ width: animate ? `${level}%` : '0%' }} />
      </div>
    </div>
  );
}

function LogoLoop() {
  const logos = [...LOGO_ITEMS, ...LOGO_ITEMS];
  const [activeLogo, setActiveLogo] = useState(null);
  const timeoutRef = useRef(null);

  const handlePull = key => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setActiveLogo(key);
    timeoutRef.current = setTimeout(() => {
      setActiveLogo(null);
    }, 900);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="logo-loop-shell mb-14">
      <div className={`logo-loop-track ${activeLogo ? 'is-paused' : ''}`}>
        {logos.map((logo, index) => (
          <button
            key={`${logo.name}-${index}`}
            type="button"
            className={`logo-loop-item ${activeLogo === `${logo.name}-${index}` ? 'is-pulled' : ''}`}
            onClick={() => handlePull(`${logo.name}-${index}`)}
            aria-label={`Pull ${logo.name} logo`}
          >
            <img src={logo.src} alt={logo.name} title={logo.name} loading="lazy" className="logo-loop-image" />
            <span className="logo-loop-label">{logo.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          entries[0].target.querySelectorAll('[data-anim]').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.1}s`;
            el.classList.add('opacity-100', 'translate-y-0');
            el.classList.remove('opacity-0', 'translate-y-6');
          });
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="px-6 py-10" ref={ref}>
      <div className="section-container section-panel">
        <div className="relative z-10">
          <div className="text-center mb-14" data-anim>
            <span className="text-sm font-semibold tracking-[0.24em] uppercase" style={{ color: 'var(--accent)' }}>
              Services & Skills
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text)' }}>
              What I use to build standout web experiences.
            </h2>
          </div>

          <div data-anim className="opacity-0 translate-y-6 transition-all duration-700">
            <LogoLoop />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {SKILL_CATEGORIES.map(({ label, skills }) => (
              <div
                key={label}
                data-anim
                className="glass-card hover-lift rounded-[10px] p-6 opacity-0 translate-y-6 transition-all duration-700"
              >
                <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>{label}</h3>
                {skills.map(skill => (
                  <SkillBar key={skill.name} {...skill} animate={animate} />
                ))}
              </div>
            ))}
          </div>

          <div data-anim className="opacity-0 translate-y-6 transition-all duration-700">
            <p className="text-center text-sm tracking-[0.2em] uppercase text-[color:var(--text-muted)] mb-5">
              Toolkit
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {TECH_BADGES.map(tech => (
                <span key={tech} className="tag hover-lift cursor-default select-none">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
