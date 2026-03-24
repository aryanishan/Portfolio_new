import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const configuredApiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
  const apiBaseUrl = configuredApiBaseUrl || (import.meta.env.DEV ? 'http://localhost:5000' : '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('[data-anim]').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.12}s`;
            el.classList.add('opacity-100', 'translate-y-0');
            el.classList.remove('opacity-0', 'translate-y-6');
          });
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) nextErrors.email = 'Valid email required';
    if (form.message.trim().length < 10) nextErrors.message = 'Message too short';
    return nextErrors;
  };

  const handleSubmit = async () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setSubmitError('');
      return;
    }

    setErrors({});
    setSubmitError('');
    setLoading(true);

    try {
      const endpoint = `${apiBaseUrl}/api/contact`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }

        throw new Error(data.message || 'Unable to send your message right now.');
      }

      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      const isNetworkError = error instanceof TypeError;
      setSubmitError(
        isNetworkError
          ? 'Unable to reach the contact server. Check VITE_API_BASE_URL and backend URL.'
          : (error.message || 'Unable to send your message right now.')
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'color-mix(in srgb, var(--card-strong) 70%, transparent)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    outline: 'none',
  };

  return (
    <section id="contact" className="px-6 py-10" ref={ref}>
      <div className="section-container section-panel">
        <div className="relative z-10">
          <div className="text-center mb-14" data-anim>
            <span className="text-sm font-semibold tracking-[0.24em] uppercase" style={{ color: 'var(--accent)' }}>
              Contact
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text)' }}>
              Let&apos;s build something sharp together.
            </h2>
            <p className="mt-4 text-base max-w-2xl mx-auto text-[color:var(--text-muted)]">
              If you want the same kind of polished redesign on your own project, send me a message.
            </p>
          </div>

          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 max-w-5xl mx-auto">
            <div className="space-y-5" data-anim>
              {[
                {
                  icon: <Mail size={20} />,
                  label: 'Email',
                  value: 'myteam034221@gmail.com',
                  href: 'mailto:myteam034221@gmail.com',
                },
                {
                  icon: <MapPin size={20} />,
                  label: 'Location',
                  value: 'Kanpur, UP',
                },
              ].map(item => (
                <div key={item.label} className="glass-card rounded-[10px] p-5 flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-[10px] flex items-center justify-center"
                    style={{
                      background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="mt-1 inline-block font-semibold" style={{ color: 'var(--text)' }}>{item.value}</a>
                    ) : (
                      <p className="mt-1 font-semibold" style={{ color: 'var(--text)' }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="glass-card rounded-[10px] p-6">
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>Availability</p>
                <p className="mt-3 text-xl font-bold" style={{ color: 'var(--text)' }}>Open for freelance and full time work.</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                  Available for modern websites, landing pages, portfolio redesigns, and frontend polishing.
                </p>
              </div>
            </div>

            <div
              data-anim
              className="glass-card rounded-[10px] p-7 opacity-0 translate-y-6 transition-all duration-700"
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <CheckCircle2 size={52} style={{ color: 'var(--accent2)' }} />
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Message Sent</h3>
                  <p className="text-sm leading-7 text-[color:var(--text-muted)]">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="rounded-full border px-5 py-2 text-sm font-semibold"
                    style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={event => setForm(current => ({ ...current, name: event.target.value }))}
                      placeholder="John Doe"
                      className="w-full rounded-[10px] px-4 py-3 text-sm"
                      style={inputStyle}
                    />
                    {errors.name && <p className="text-xs mt-2 text-red-300">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={event => setForm(current => ({ ...current, email: event.target.value }))}
                      placeholder="john@example.com"
                      className="w-full rounded-[10px] px-4 py-3 text-sm"
                      style={inputStyle}
                    />
                    {errors.email && <p className="text-xs mt-2 text-red-300">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={event => setForm(current => ({ ...current, message: event.target.value }))}
                      placeholder="Tell me about your project..."
                      className="w-full rounded-[10px] px-4 py-3 text-sm resize-none"
                      style={inputStyle}
                    />
                    {errors.message && <p className="text-xs mt-2 text-red-300">{errors.message}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full rounded-full bg-gradient-to-r from-[#ff5f5f] to-[#ff8258] px-6 py-3.5 text-white font-bold inline-flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  {submitError && (
                    <p className="text-sm text-red-300 text-center">{submitError}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
