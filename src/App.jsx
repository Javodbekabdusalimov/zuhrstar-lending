import { useEffect, useRef, useState } from 'react'
import './App.css'

/* ─── Ariza yuborish — bot serveriga ── */
const BOT_URL = import.meta.env.VITE_BOT_URL || 'http://localhost:3001'

async function sendToTelegram(name, phone, course) {
  const res = await fetch(`${BOT_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, course }),
  })
  return res.ok
}

/* ─── Unsplash images ─── */
const IMGS = {
  hero:       'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80',
  frontend:   'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
  backend:    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
  fullstack:  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
  ai:         'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
  student1:   'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  student2:   'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
  student3:   'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  gallery1:   'https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=800&q=80',
  gallery2:   'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  gallery3:   'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  gallery4:   'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80',
  t1:         'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  t2:         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  t3:         'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  t4:         'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
}

/* ─── useInView hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── useCounter hook ─── */
function useCounter(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const step = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(Math.floor(current))
      if (current >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])
  return count
}

/* ─── Particles ─── */
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 15 + 10,
    opacity: Math.random() * 0.4 + 0.1,
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          bottom: '-20px',
          left: `${p.left}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          borderRadius: '50%',
          background: `rgba(96,165,250,${p.opacity})`,
          animation: `particleFloat ${p.duration}s ${p.delay}s linear infinite`,
        }} />
      ))}
    </div>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#kurslar', label: 'Kurslar' },
    { href: '#nima-uchun', label: 'Nima uchun biz' },
    { href: '#jarayon', label: 'Jarayon' },
    { href: '#testimonials', label: "Talabalar" },
    { href: '#aloqa', label: 'Aloqa' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(59,130,246,0.15)' : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(30,58,138,0.1)' : 'none',
      animation: 'slideDown 0.6s ease',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            overflow: 'hidden',
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(59,130,246,0.55), 0 0 0 2px rgba(96,165,250,0.4)',
          }}>
            <img
              src="https://coursetop.fra1.cdn.digitaloceanspaces.com/1747721306558.jpeg"
              alt="ZuhrStar logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <span style={{
            fontWeight: 800, fontSize: '20px',
            color: scrolled ? '#1e3a8a' : '#ffffff',
            letterSpacing: '-0.5px',
          }}>ZuhrStar</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
             className="nav-links-desktop">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              textDecoration: 'none',
              padding: '8px 14px', borderRadius: '8px',
              fontSize: '14px', fontWeight: 500,
              color: scrolled ? '#374151' : 'rgba(255,255,255,0.88)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.target.style.background = scrolled ? '#eff6ff' : 'rgba(255,255,255,0.12)'
              e.target.style.color = scrolled ? '#2563eb' : '#fff'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent'
              e.target.style.color = scrolled ? '#374151' : 'rgba(255,255,255,0.88)'
            }}
            >{l.label}</a>
          ))}
        </div>

        {/* CTA */}
        <a href="tel:+998910011764" style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 22px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
          color: '#fff', textDecoration: 'none',
          fontWeight: 600, fontSize: '14px',
          boxShadow: '0 4px 15px rgba(37,99,235,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(37,99,235,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(37,99,235,0.4)' }}
        >
          <span>📞</span>
          <span className="hide-mobile">Qo'ng'iroq</span>
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hide-mobile { display: none; }
        }
      `}</style>
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  const words = ['Frontend', 'Backend', 'Fullstack', 'AI']
  const [wordIdx, setWordIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1d4ed8 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 8s ease infinite',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      paddingTop: '72px',
    }}>
      <Particles />

      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-8%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'floatReverse 5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '80px 24px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>
        {/* Left */}
        <div style={{ animation: 'fadeInLeft 0.9s ease' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '24px',
          }}>
            <span style={{ fontSize: '12px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.5px' }}>
              ✦ TOSHKENT VILOYATI, QIBRAY TUMANI
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(38px, 5vw, 66px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '16px',
          }}>
            Kelajakni{' '}
            <span className="grad-light" style={{ display: 'inline-block' }}>kod</span>
            <br />bilan bur
          </h1>

          {/* Animated word */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '28px',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(16px,2vw,20px)', fontWeight: 400 }}>
              Professional
            </span>
            <div style={{
              background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
              padding: '6px 18px', borderRadius: '8px',
              fontSize: 'clamp(16px,2vw,20px)', fontWeight: 700, color: '#fff',
              animation: 'fadeInUp 0.4s ease',
              key: words[wordIdx],
              minWidth: '130px', textAlign: 'center',
              boxShadow: '0 4px 20px rgba(37,99,235,0.5)',
            }}>
              {words[wordIdx]}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(16px,2vw,20px)' }}>
              bo'ling
            </span>
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 'clamp(14px,1.5vw,17px)',
            lineHeight: 1.8, maxWidth: '480px', marginBottom: '40px',
          }}>
            ZuhrStar IT Maktabida amaliy loyihalar orqali frontend, backend,
            fullstack va sun'iy intellekt yo'nalishlarida professional darajaga ering.
            Mentorlar bilan bevosita ishlang, ish joyini kafolatlang.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#aloqa" style={{
              padding: '14px 32px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff', textDecoration: 'none',
              fontWeight: 700, fontSize: '15px',
              boxShadow: '0 8px 30px rgba(37,99,235,0.5)',
              transition: 'all 0.3s ease',
              animation: 'pulseGlow 3s ease-in-out infinite',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🚀 Bepul ro'yxatdan o'tish
            </a>
            <a href="#kurslar" style={{
              padding: '14px 32px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff', textDecoration: 'none',
              fontWeight: 600, fontSize: '15px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              📚 Kurslarni ko'rish
            </a>
          </div>

          {/* Quick stats */}
          <div style={{
            display: 'flex', gap: '28px', marginTop: '48px', flexWrap: 'wrap',
          }}>
            {[['500+', "O'quvchilar"], ['4', "Yo'nalish"], ['95%', 'Ish joyi']].map(([n, l]) => (
              <div key={n}>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#60a5fa' }}>{n}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating cards */}
        <div style={{
          position: 'relative', height: '520px',
          animation: 'fadeInRight 0.9s 0.2s ease both',
        }}>
          {/* Main image */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '320px', height: '320px',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
            border: '2px solid rgba(96,165,250,0.3)',
            animation: 'float 5s ease-in-out infinite',
          }}>
            <img src={IMGS.hero} alt="Coding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(30,58,138,0.3), rgba(37,99,235,0.2))',
            }} />
          </div>

          {/* Floating tech badges */}
          {[
            { icon: '⚛️', label: 'React', top: '8%', left: '-2%', delay: '0s' },
            { icon: '🟢', label: 'Node.js', top: '8%', right: '0%', delay: '0.5s' },
            { icon: '🐍', label: 'Python', bottom: '15%', left: '-5%', delay: '1s' },
            { icon: '🤖', label: 'AI/ML', bottom: '15%', right: '-2%', delay: '1.5s' },
          ].map(({ icon, label, delay, ...pos }) => (
            <div key={label} style={{
              position: 'absolute', ...pos,
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '14px',
              padding: '12px 18px',
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#fff', fontWeight: 600, fontSize: '14px',
              animation: `float 4s ${delay} ease-in-out infinite`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}>
              <span style={{ fontSize: '20px' }}>{icon}</span>
              <span>{label}</span>
            </div>
          ))}

          {/* Spinning ring */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '380px', height: '380px',
            borderRadius: '50%',
            border: '1px dashed rgba(96,165,250,0.25)',
            animation: 'spin 20s linear infinite',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '440px', height: '440px',
            borderRadius: '50%',
            border: '1px dashed rgba(34,211,238,0.15)',
            animation: 'spinReverse 15s linear infinite',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Wave */}
      <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── StatCard (hooks can't be in map) ─── */
function StatCard({ target, suffix, label, icon, color, visible, delay }) {
  const count = useCounter(target, 2000, visible)
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      background: '#fff',
      borderRadius: '20px',
      padding: '32px 24px',
      textAlign: 'center',
      boxShadow: '0 4px 24px rgba(30,58,138,0.08)',
      border: '1px solid rgba(59,130,246,0.1)',
      position: 'relative', overflow: 'hidden',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-6px)'
      e.currentTarget.style.boxShadow = '0 16px 40px rgba(30,58,138,0.15)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = visible ? 'translateY(0)' : 'translateY(40px)'
      e.currentTarget.style.boxShadow = '0 4px 24px rgba(30,58,138,0.08)'
    }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${color}, ${color}88)`,
      }} />
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>{icon}</div>
      <div style={{ fontSize: '48px', fontWeight: 900, color, lineHeight: 1, marginBottom: '8px' }}>
        {count}{suffix}
      </div>
      <div style={{ color: '#6b7280', fontWeight: 500, fontSize: '15px' }}>{label}</div>
    </div>
  )
}

/* ─── Stats ─── */
function Stats() {
  const [ref, visible] = useInView()
  const stats = [
    { target: 500, suffix: '+', label: "O'quvchilar", icon: '👨‍🎓', color: '#2563eb' },
    { target: 4,   suffix: '',  label: "Yo'nalish",   icon: '📚', color: '#0891b2' },
    { target: 95,  suffix: '%', label: 'Ish joyi',    icon: '💼', color: '#7c3aed' },
    { target: 3,   suffix: '+', label: 'Yil tajriba', icon: '⭐', color: '#0d9488' },
  ]

  return (
    <section ref={ref} style={{
      padding: '80px 24px',
      background: 'linear-gradient(180deg, #fff 0%, #eff6ff 100%)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
        }}>
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} visible={visible} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Courses ─── */
function Courses() {
  const [ref, visible] = useInView()
  const courses = [
    {
      icon: '⚛️',
      title: 'Frontend',
      subtitle: 'Development',
      img: IMGS.frontend,
      color: '#2563eb',
      gradient: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
      desc: 'HTML, CSS, JavaScript, React, Vue — zamonaviy UI/UX yaratishni o\'rganing.',
      tags: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript'],
      duration: '6 oy',
      level: 'Boshlang\'ich → O\'rta',
    },
    {
      icon: '🖥️',
      title: 'Backend',
      subtitle: 'Development',
      img: IMGS.backend,
      color: '#0891b2',
      gradient: 'linear-gradient(135deg, #ecfeff, #cffafe)',
      desc: 'Node.js, Python, ma\'lumotlar bazasi, REST API va server arxitekturasi.',
      tags: ['Node.js', 'Python', 'SQL', 'REST API'],
      duration: '7 oy',
      level: 'O\'rta → Yuqori',
    },
    {
      icon: '🔗',
      title: 'Fullstack',
      subtitle: 'Development',
      img: IMGS.fullstack,
      color: '#7c3aed',
      gradient: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
      desc: 'Front va backend bilan birga ishlash, deploy qilish va real loyihalar.',
      tags: ['React', 'Node.js', 'MongoDB', 'Deploy'],
      duration: '10 oy',
      level: 'O\'rta → Pro',
    },
    {
      icon: '🤖',
      title: 'AI / ML',
      subtitle: 'Artificial Intelligence',
      img: IMGS.ai,
      color: '#0d9488',
      gradient: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
      desc: 'Machine learning, neural networklar, Python va zamonaviy AI frameworklari.',
      tags: ['Python', 'TensorFlow', 'ChatGPT API', 'CV'],
      duration: '8 oy',
      level: 'O\'rta → Ekspert',
    },
  ]

  return (
    <section id="kurslar" ref={ref} style={{
      padding: '100px 24px',
      background: '#fff',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '64px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{
            display: 'inline-block',
            background: '#eff6ff', color: '#2563eb',
            fontSize: '13px', fontWeight: 700,
            letterSpacing: '1px', padding: '6px 20px',
            borderRadius: '100px', marginBottom: '16px',
            border: '1px solid #bfdbfe',
          }}>
            KURSLARIMIZ
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 900, color: '#0f172a',
            letterSpacing: '-1px', lineHeight: 1.15,
            marginBottom: '16px',
          }}>
            4 ta professional{' '}
            <span className="grad-blue">yo'nalish</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '17px', maxWidth: '520px', margin: '0 auto' }}>
            Har bir kurs amaliy loyihalar va real ish tajribasi asosida qurilgan
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '28px',
        }}>
          {courses.map((c, i) => (
            <div key={c.title} style={{
              borderRadius: '24px', overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              border: '1px solid rgba(0,0,0,0.06)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(50px)',
              transitionDelay: `${i * 0.1}s`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
              e.currentTarget.style.boxShadow = `0 24px 60px rgba(0,0,0,0.13)`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(50px)'
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'
            }}
            >
              {/* Image */}
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                <img src={c.img} alt={c.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${c.color}99, ${c.color}44)`,
                }} />
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '12px', padding: '8px 14px',
                  fontSize: '13px', fontWeight: 700,
                  color: c.color,
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <span style={{ fontSize: '18px' }}>{c.icon}</span>
                  {c.title}
                </div>
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: c.color,
                  borderRadius: '8px', padding: '4px 10px',
                  fontSize: '11px', fontWeight: 600,
                  color: '#fff',
                }}>
                  {c.duration}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '20px', fontWeight: 800,
                  color: '#0f172a', marginBottom: '4px',
                }}>
                  {c.title}{' '}
                  <span style={{ color: c.color }}>{c.subtitle}</span>
                </h3>
                <p style={{
                  color: '#6b7280', fontSize: '13px',
                  marginBottom: '16px', lineHeight: 1.7,
                }}>
                  {c.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {c.tags.map(t => (
                    <span key={t} style={{
                      background: c.gradient,
                      color: c.color, fontSize: '11px',
                      fontWeight: 600, padding: '4px 10px',
                      borderRadius: '100px', border: `1px solid ${c.color}33`,
                    }}>{t}</span>
                  ))}
                </div>

                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: '16px', borderTop: '1px solid #f1f5f9',
                }}>
                  <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>
                    📊 {c.level}
                  </span>
                  <a href="#aloqa" style={{
                    background: c.color, color: '#fff',
                    padding: '8px 18px', borderRadius: '8px',
                    fontSize: '13px', fontWeight: 600,
                    textDecoration: 'none', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Yozilish →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Why Us ─── */
function WhyUs() {
  const [ref, visible] = useInView()
  const features = [
    { icon: '🎯', title: 'Amaliy ta\'lim', desc: 'Har bir dars real loyiha asosida o\'tiladi. Nazariya emas — amaliyot birinchi!', color: '#2563eb' },
    { icon: '👨‍💻', title: 'Pro mentorlar', desc: 'Sanoatda 5+ yil tajribaga ega, Google va Yandex kabi kompaniyalarda ishlagan mentorlar.', color: '#7c3aed' },
    { icon: '💼', title: 'Ish joyi kafolati', desc: "Kursni tugatgan o'quvchilarning 95% ishi bor. Biz ish joyi topishda yordam beramiz.", color: '#0891b2' },
    { icon: '🌐', title: 'Online + Offline', desc: 'Darslar ham onlayn, ham oflayn formatda. O\'zingizga qulay vaqtda o\'qing.', color: '#0d9488' },
    { icon: '📜', title: 'Sertifikat', desc: "Kurs tugatilgandan keyin xalqaro standartga mos sertifikat beriladi.", color: '#dc2626' },
    { icon: '🤝', title: 'Community', desc: "1000+ o'quvchilik hamjamiyatga qo'shiling. Hamkor toping, loyiha bajaring.", color: '#d97706' },
  ]

  return (
    <section id="nima-uchun" ref={ref} style={{
      padding: '100px 24px',
      background: 'linear-gradient(180deg, #eff6ff 0%, #fff 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '70px' }}>
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <div style={{
              display: 'inline-block',
              background: '#eff6ff', color: '#2563eb',
              fontSize: '13px', fontWeight: 700,
              letterSpacing: '1px', padding: '6px 20px',
              borderRadius: '100px', marginBottom: '16px',
              border: '1px solid #bfdbfe',
            }}>
              NIMA UCHUN ZUHRSTAR?
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 900, color: '#0f172a',
              letterSpacing: '-1px', lineHeight: 1.15,
              marginBottom: '20px',
            }}>
              Bizni boshqalardan{' '}
              <span className="grad-blue">farqli</span>{' '}
              qiladigan narsalar
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.8 }}>
              Biz shunchaki kurs berib qo'ymaymiz — siz bilan birga professional karyerangizni
              qurishda ishtirok etamiz.
            </p>
          </div>
          <div style={{
            borderRadius: '24px', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(30,58,138,0.15)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease',
          }}>
            <img src={IMGS.student1} alt="Students" style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>

        {/* Feature grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {features.map((f, i) => (
            <div key={f.title} style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              cursor: 'default',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: `${i * 0.08}s`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.1)`
              e.currentTarget.style.borderColor = `${f.color}44`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'
            }}
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: `${f.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '26px', marginBottom: '16px',
                border: `1px solid ${f.color}25`,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                {f.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── How It Works ─── */
function HowItWorks() {
  const [ref, visible] = useInView()
  const steps = [
    { num: '01', icon: '📝', title: "Ro'yxatdan o'ting", desc: "Telefon raqamingizni qoldiring, biz siz bilan bog'lanamiz va bepul konsultatsiya beramiz.", color: '#2563eb' },
    { num: '02', icon: '📚', title: 'Kursni boshlang', desc: 'Mentorlar bilan birinchi darsdan boshlab amaliy loyihalarga kirishib ketasiz.', color: '#7c3aed' },
    { num: '03', icon: '🏗️', title: 'Loyihalar bajaring', desc: "Portfolio uchun real loyihalar bajaring, GitHub profilingizni to'ldiring.", color: '#0891b2' },
    { num: '04', icon: '🎓', title: "Sertifikat oling", desc: "Kursni muvaffaqiyatli tamomlang va xalqaro sertifikat bilan ish qidiring.", color: '#0d9488' },
  ]

  return (
    <section id="jarayon" ref={ref} style={{
      padding: '100px 24px',
      background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* bg grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center', marginBottom: '64px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(59,130,246,0.2)', color: '#93c5fd',
            fontSize: '13px', fontWeight: 700,
            letterSpacing: '1px', padding: '6px 20px',
            borderRadius: '100px', marginBottom: '16px',
            border: '1px solid rgba(59,130,246,0.3)',
          }}>
            QANDAY ISHLAYDI
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-1px', lineHeight: 1.15,
          }}>
            4 qadam bilan{' '}
            <span className="grad-light">professional</span>{' '}
            bo'ling
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px', position: 'relative',
        }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px', padding: '32px 24px',
              textAlign: 'center',
              transition: 'all 0.4s ease',
              cursor: 'default',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(50px)',
              transitionDelay: `${i * 0.12}s`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.transform = 'translateY(-10px)'
              e.currentTarget.style.borderColor = `${s.color}66`
              e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.3)`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
                color: s.color, marginBottom: '16px',
              }}>QADAM {s.num}</div>
              <div style={{
                fontSize: '44px', marginBottom: '16px',
                animation: `float ${4 + i * 0.3}s ${i * 0.5}s ease-in-out infinite`,
                display: 'inline-block',
              }}>{s.icon}</div>
              <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.7 }}>{s.desc}</p>

              {/* Connector dot */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  right: '-12px', top: '50%',
                  transform: 'translateY(-50%)',
                  width: '24px', height: '24px',
                  background: s.color,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 2, fontSize: '10px',
                }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Gallery ─── */
function Gallery() {
  const [ref, visible] = useInView()
  const imgs = [
    { src: IMGS.gallery1, span: 'col', label: 'Sinf xonasi' },
    { src: IMGS.gallery2, span: '',    label: 'Hackathon' },
    { src: IMGS.gallery3, span: '',    label: 'Jamoa ishi' },
    { src: IMGS.student2, span: '',    label: 'Loyiha himoyasi' },
    { src: IMGS.gallery4, span: '',    label: 'Online dars' },
  ]

  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: '56px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{
            display: 'inline-block', background: '#eff6ff', color: '#2563eb',
            fontSize: '13px', fontWeight: 700, letterSpacing: '1px',
            padding: '6px 20px', borderRadius: '100px', marginBottom: '16px',
            border: '1px solid #bfdbfe',
          }}>GALEREYA</div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900, color: '#0f172a', letterSpacing: '-1px',
          }}>
            Bizning{' '}
            <span className="grad-blue">jamoamiz</span>{' '}
            bilan tanishing
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto',
          gap: '16px',
        }}>
          {imgs.map((img, i) => (
            <div key={i} style={{
              gridColumn: i === 0 ? 'span 2' : 'span 1',
              borderRadius: '20px', overflow: 'hidden',
              position: 'relative',
              height: i === 0 ? '340px' : '220px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.95)',
              transition: `opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s ease`,
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.querySelector('img').style.transform = 'scale(1.08)'
              e.currentTarget.querySelector('.overlay').style.opacity = '1'
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector('img').style.transform = 'scale(1)'
              e.currentTarget.querySelector('.overlay').style.opacity = '0'
            }}
            >
              <img src={img.src} alt={img.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
              <div className="overlay" style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(30,58,138,0.7), rgba(37,99,235,0.5))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'opacity 0.3s ease',
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '18px' }}>{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─── */
function Testimonials() {
  const [ref, visible] = useInView()
  const reviews = [
    {
      name: 'Bobur Yusupov',
      role: 'Frontend Developer @ Uzum',
      img: IMGS.t1,
      text: 'ZuhrStarda o\'qiganimdan keyin 3 oy ichida ish topdim. Mentorlar juda tajribali va har doim yordam berishadi. Kurs davomida real loyihalar bajarganim portfelimdagi eng kuchli ishlar.',
      stars: 5,
      badge: '💼 Ish topdi',
      badgeColor: '#059669',
    },
    {
      name: 'Nilufar Xasanova',
      img: IMGS.t2,
      role: 'Full-stack Dev @ IT Park',
      text: 'Avval dasturlashdan hech narsa bilmasdim. 10 oylik fullstack kurs meni to\'liq o\'zgartirdi. Endi o\'zimning startapimni ishlatyapman. Rahmat ZuhrStar!',
      stars: 5,
      badge: '🚀 Startap qurdi',
      badgeColor: '#7c3aed',
    },
    {
      name: 'Sherzod Toshmatov',
      img: IMGS.t3,
      role: 'AI Engineer @ Texnopark',
      text: 'AI/ML kursini tamomlab, endi Texnoparkda AI muhandisi bo\'lib ishlayman. Kurs materiallari juda zamonaviy va amaliy. Har bir darsdan so\'ng yangiliklarni sezyapman.',
      stars: 5,
      badge: '🤖 AI mutaxassis',
      badgeColor: '#0891b2',
    },
    {
      name: 'Zulfiya Rahimova',
      img: IMGS.t4,
      role: 'React Developer @ Najot Ta\'lim',
      text: "O'qitish usuli juda qiziqarli. Nazariya va amaliyot muvozanatini juda to'g'ri tanlashgan. Kurs davomida 5 ta real loyiha yaratdim — ish topishda bu juda katta yordam bo'ldi.",
      stars: 5,
      badge: '⭐ Top o\'quvchi',
      badgeColor: '#d97706',
    },
  ]

  return (
    <section id="testimonials" ref={ref} style={{
      padding: '100px 24px',
      background: 'linear-gradient(180deg, #eff6ff 0%, #fff 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: '64px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{
            display: 'inline-block', background: '#eff6ff', color: '#2563eb',
            fontSize: '13px', fontWeight: 700, letterSpacing: '1px',
            padding: '6px 20px', borderRadius: '100px', marginBottom: '16px',
            border: '1px solid #bfdbfe',
          }}>TALABALAR FIKRI</div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', lineHeight: 1.15,
          }}>
            Bizning{' '}
            <span className="grad-blue">muvaffaqiyatli</span>{' '}
            o'quvchilarimiz
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {reviews.map((r, i) => (
            <div key={r.name} style={{
              background: '#fff',
              borderRadius: '24px', padding: '28px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              border: '1px solid rgba(0,0,0,0.06)',
              transition: 'all 0.3s ease',
              position: 'relative', overflow: 'hidden',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: `${i * 0.1}s`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'
            }}
            >
              {/* Quote mark */}
              <div style={{
                position: 'absolute', top: '20px', right: '24px',
                fontSize: '64px', color: '#dbeafe', fontFamily: 'Georgia, serif',
                lineHeight: 1, pointerEvents: 'none',
              }}>"</div>

              {/* Stars */}
              <div style={{ color: '#f59e0b', fontSize: '18px', marginBottom: '16px' }}>
                {'★'.repeat(r.stars)}
              </div>

              <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.8, marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                "{r.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={r.img} alt={r.name} style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  objectFit: 'cover', border: '3px solid #dbeafe',
                }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>{r.name}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{r.role}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <span style={{
                    background: `${r.badgeColor}15`,
                    color: r.badgeColor,
                    fontSize: '11px', fontWeight: 700,
                    padding: '4px 10px', borderRadius: '100px',
                    border: `1px solid ${r.badgeColor}33`,
                  }}>{r.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Contact / CTA ─── */
function Contact() {
  const [ref, visible] = useInView()
  const [form, setForm] = useState({ name: '', phone: '', course: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    await sendToTelegram(form.name, form.phone, form.course)
    setLoading(false)
    setSent(true)
  }

  return (
    <section id="aloqa" ref={ref} style={{
      padding: '100px 24px',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <Particles />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center',
        }}>
          {/* Left info */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(59,130,246,0.2)', color: '#93c5fd',
              fontSize: '13px', fontWeight: 700, letterSpacing: '1px',
              padding: '6px 20px', borderRadius: '100px', marginBottom: '20px',
              border: '1px solid rgba(59,130,246,0.3)',
            }}>BEPUL KONSULTATSIYA</div>

            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 900, color: '#fff',
              letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '20px',
            }}>
              Bugun{' '}
              <span className="grad-light">ro'yxatdan</span>{' '}
              o'ting!
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.8, marginBottom: '36px' }}>
              Bepul konsultatsiya oling, o'zingizga mos kursni tanlang va
              IT sohasidagi karyerangizni boshlang!
            </p>

            {/* Contact info */}
            {[
              { icon: '📞', label: 'Telefon', val: '+998 91 001 17 64', href: 'tel:+998910011764' },
              { icon: '📍', label: 'Manzil', val: "Toshkent vil., Qibray tum., Shodlik MFY, Alisher Navoiy ko'chasi, 7", href: null },
              { icon: '⏰', label: 'Ish vaqti', val: 'Dushanba – Shanba: 09:00 – 20:00', href: null },
            ].map(c => (
              <div key={c.label} style={{
                display: 'flex', alignItems: 'flex-start', gap: '16px',
                padding: '16px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                marginBottom: '12px',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(59,130,246,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', flexShrink: 0,
                }}>{c.icon}</div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600, marginBottom: '2px' }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{ color: '#60a5fa', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}>{c.val}</a>
                  ) : (
                    <div style={{ color: '#fff', fontWeight: 500, fontSize: '14px', lineHeight: 1.5 }}>{c.val}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '28px', padding: '40px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease',
          }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px', animation: 'float 2s ease-in-out infinite' }}>🎉</div>
                <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
                  Muvaffaqiyatli yuborildi!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
                  Tez orada siz bilan bog'lanamiz. Keling, birga kelajakni quramiz!
                </p>
                <button onClick={() => setSent(false)} style={{
                  marginTop: '24px',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
                  padding: '10px 24px', borderRadius: '10px',
                  fontWeight: 600, cursor: 'pointer', fontSize: '14px',
                }}>Qaytish</button>
              </div>
            ) : (
              <>
                <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
                  Ariza qoldiring
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '28px' }}>
                  Bepul konsultatsiya uchun ma'lumotlaringizni qoldiring
                </p>

                <form onSubmit={handleSubmit}>
                  {[
                    { key: 'name',  label: 'Ismingiz', placeholder: 'Ism Familiyangiz', type: 'text', icon: '👤' },
                    { key: 'phone', label: 'Telefon',  placeholder: '+998 XX XXX XX XX', type: 'tel',  icon: '📱' },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: '20px' }}>
                      <label style={{
                        display: 'block', color: 'rgba(255,255,255,0.8)',
                        fontSize: '13px', fontWeight: 600, marginBottom: '8px',
                      }}>{f.icon} {f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        required
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '12px', padding: '14px 16px',
                          color: '#fff', fontSize: '15px', outline: 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(96,165,250,0.8)'
                          e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.2)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.2)'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </div>
                  ))}

                  {/* Course select */}
                  <div style={{ marginBottom: '28px' }}>
                    <label style={{
                      display: 'block', color: 'rgba(255,255,255,0.8)',
                      fontSize: '13px', fontWeight: 600, marginBottom: '8px',
                    }}>📚 Qiziqtirgan yo'nalish</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {['Frontend', 'Backend', 'Fullstack', 'AI/ML'].map(opt => (
                        <label key={opt} style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          background: form.course === opt ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.07)',
                          border: form.course === opt ? '1px solid rgba(96,165,250,0.6)' : '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '10px', padding: '10px 12px',
                          cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
                          fontSize: '13px', fontWeight: 500,
                          transition: 'all 0.2s',
                        }}>
                          <input type="radio" name="course" value={opt}
                            checked={form.course === opt}
                            onChange={e => setForm(p => ({ ...p, course: e.target.value }))}
                            style={{ accentColor: '#3b82f6' }} />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={loading} style={{
                    width: '100%', padding: '16px',
                    background: loading ? 'rgba(37,99,235,0.6)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: '#fff', border: 'none', borderRadius: '14px',
                    fontWeight: 700, fontSize: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 30px rgba(37,99,235,0.5)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    letterSpacing: '0.3px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,99,235,0.6)' } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,99,235,0.5)' }}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                        Yuborilmoqda...
                      </>
                    ) : '🚀 Bepul ro\'yxatdan o\'tish'}
                  </button>

                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', textAlign: 'center', marginTop: '14px' }}>
                    ✓ Ma'lumotlaringiz maxfiy saqlanadi
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Map ─── */
function Map() {
  const [ref, visible] = useInView()
  const address = "Toshkent viloyati, Qibray tumani, Shodlik MFY, Alisher Navoiy ko'chasi, 7"
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=41.3779,69.3622`
  const yandexUrl = `https://yandex.uz/maps/?ll=69.3622%2C41.3779&z=16&pt=69.3622%2C41.3779,pm2rdl`

  return (
    <section ref={ref} style={{ padding: '80px 24px 0', background: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '40px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{
            display: 'inline-block', background: '#eff6ff', color: '#2563eb',
            fontSize: '13px', fontWeight: 700, letterSpacing: '1px',
            padding: '6px 20px', borderRadius: '100px', marginBottom: '16px',
            border: '1px solid #bfdbfe',
          }}>BIZNING MANZIL</div>
          <h2 style={{
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            fontWeight: 900, color: '#0f172a', letterSpacing: '-0.8px',
            marginBottom: '12px',
          }}>
            Bizni <span className="grad-blue">toping</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '15px' }}>
            📍 {address}
          </p>
        </div>

        {/* Map container */}
        <div style={{
          borderRadius: '24px', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(30,58,138,0.12)',
          border: '1px solid rgba(59,130,246,0.12)',
          position: 'relative',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s 0.15s ease, transform 0.7s 0.15s ease',
        }}>
          <iframe
            title="ZuhrStar IT School manzili"
            src="https://yandex.uz/map-widget/v1/?ll=69.3622%2C41.3779&z=16&pt=69.3622%2C41.3779,pm2rdl&l=map&text=Qibray%20tumani%2C%20Shodlik%20MFY%2C%20Alisher%20Navoiy%20ko%27chasi%2C%207"
            width="100%"
            height="420"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Overlay info card */}
          <div style={{
            position: 'absolute', top: '20px', left: '20px',
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px', padding: '20px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            maxWidth: '280px',
            border: '1px solid rgba(59,130,246,0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: '#fff', overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
                flexShrink: 0,
              }}>
                <img
                  src="https://coursetop.fra1.cdn.digitaloceanspaces.com/1747721306558.jpeg"
                  alt="ZuhrStar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>ZuhrStar IT School</div>
                <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>● Ochiq · 09:00–20:00</div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6, marginBottom: '14px' }}>
              📍 Qibray tum., Shodlik MFY,<br />Alisher Navoiy ko'chasi, 7
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href={googleMapsUrl} target="_blank" rel="noreferrer" style={{
                flex: 1, textAlign: 'center',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: '#fff', textDecoration: 'none',
                padding: '9px 12px', borderRadius: '9px',
                fontSize: '12px', fontWeight: 700,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                🗺 Yo'l olish
              </a>
              <a href={yandexUrl} target="_blank" rel="noreferrer" style={{
                flex: 1, textAlign: 'center',
                background: '#f3f4f6',
                color: '#374151', textDecoration: 'none',
                padding: '9px 12px', borderRadius: '9px',
                fontSize: '12px', fontWeight: 700,
                transition: 'background 0.2s',
                border: '1px solid #e5e7eb',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
              >
                🅨 Yandex
              </a>
            </div>
          </div>
        </div>

        {/* Transport info */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px', marginTop: '24px', paddingBottom: '80px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease',
        }}>
          {[
            { icon: '🚌', title: 'Avtobus', desc: 'Qibray markaziga qadar avtobus bor' },
            { icon: '🚇', title: 'Metro', desc: "Olmazor → Qibray 20 daqiqa" },
            { icon: '🚗', title: 'Mashina', desc: 'Parkinglar mavjud' },
            { icon: '🛵', title: 'Taksi', desc: 'Yandex.Taxi va Maksim bor' },
          ].map(t => (
            <div key={t.title} style={{
              background: '#f8fafc',
              borderRadius: '14px', padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: '14px',
              border: '1px solid #e5e7eb',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = '#bfdbfe' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e5e7eb' }}
            >
              <span style={{ fontSize: '28px' }}>{t.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{t.title}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  const links = [
    { title: 'Kurslar', items: ['Frontend', 'Backend', 'Fullstack', 'AI / ML'] },
    { title: 'Kompaniya', items: ['Biz haqimizda', 'Mentorlar', 'Blog', 'Hamkorlik'] },
    { title: 'Aloqa', items: ['+998 91 001 17 64', 'zuhrstar@mail.uz', 'Qibray, Toshkent vil.'] },
  ]

  return (
    <footer style={{
      background: '#0f172a',
      padding: '60px 24px 30px',
      color: 'rgba(255,255,255,0.6)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px', paddingBottom: '48px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src="https://coursetop.fra1.cdn.digitaloceanspaces.com/1747721306558.jpeg"
                  alt="ZuhrStar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{
                fontWeight: 800, fontSize: '20px',
                color: '#ffffff',
              }}>ZuhrStar</span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.8, maxWidth: '260px', marginBottom: '20px' }}>
              Toshkent viloyati, Qibray tumanining eng zamonaviy IT maktabi.
              Frontend, Backend, Fullstack va AI yo'nalishlarida professional mutaxassislar tayyorlaymiz.
            </p>
            <a href="tel:+998910011764" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff', textDecoration: 'none',
              padding: '10px 20px', borderRadius: '10px',
              fontWeight: 600, fontSize: '14px',
              boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
            }}>📞 +998 91 001 17 64</a>
          </div>

          {/* Link columns */}
          {links.map(col => (
            <div key={col.title}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '18px' }}>
                {col.title}
              </div>
              {col.items.map(item => (
                <div key={item} style={{ marginBottom: '10px' }}>
                  <a href="#" style={{
                    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                    fontSize: '14px', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#60a5fa'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >{item}</a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          paddingTop: '28px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
        }}>
          <span style={{ fontSize: '13px' }}>© 2024 ZuhrStar IT School. Barcha huquqlar himoyalangan.</span>
          <span style={{ fontSize: '13px' }}>
            Toshkent vil., Qibray tum., Alisher Navoiy ko'chasi, 7
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ─── FloatingCall ─── */
function FloatingCall() {
  return (
    <a href="tel:+998910011764" style={{
      position: 'fixed', bottom: '32px', right: '32px', zIndex: 999,
      width: '58px', height: '58px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      color: '#fff', textDecoration: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '24px',
      boxShadow: '0 8px 30px rgba(37,99,235,0.5)',
      animation: 'pulseGlow 2s ease-in-out infinite',
      transition: 'transform 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    title="Qo'ng'iroq qiling"
    >📞</a>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Courses />
      <WhyUs />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <Contact />
      <Map />
      <Footer />
      <FloatingCall />
    </>
  )
}
