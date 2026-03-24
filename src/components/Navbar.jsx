import { useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Training', href: '#training' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'CV', href: '#cv' },
  { label: 'Portfolio', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ isDark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <nav
          className="rounded-[10px] backdrop-blur-xl px-5 md:px-8 py-4 border"
          style={{
            background: 'var(--nav)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div className="flex items-center justify-between gap-6">
            <a href="#home" className="text-2xl font-extrabold tracking-wide font-['Sora']" style={{ color: 'var(--accent)' }}>
              Aryan
            </a>

            <div className="hidden md:flex items-center gap-7 text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
              {NAV_ITEMS.map(({ label, href }, index) => (
                <a
                  key={label}
                  href={href}
                  className={`nav-link ${index === 0 ? 'active' : ''}`}
                  style={{ color: index === 0 ? 'var(--text)' : 'var(--text-muted)' }}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  background: 'color-mix(in srgb, var(--card-strong) 75%, transparent)',
                  color: 'var(--text)',
                }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(open => !open)}
                className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border"
                style={{
                  borderColor: 'var(--border)',
                  background: 'color-mix(in srgb, var(--card-strong) 75%, transparent)',
                  color: 'var(--text)',
                }}
                aria-label="Toggle menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t flex flex-col gap-3 text-sm font-semibold" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              {NAV_ITEMS.map(({ label, href }) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ color: 'var(--text)' }}>
                  {label}
                </a>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
