'use client'

import { useState, useEffect, useRef } from 'react'
import { GARMENTS, EMBROIDERY_STYLES, CRAFT_COMPONENTS, DESIGNERS, HISTORY, INDUSTRY, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#E11D48'
const THREAD_COLORS: Record<string, string> = {
  origin: '#F59E0B',
  royal: '#7B506F',
  craft: '#5C7C3E',
  global: '#2D5F8A',
  recognition: '#E11D48',
}

export function MoroccanFashionContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeGarment, setActiveGarment] = useState(0)
  const [activeEmbroidery, setActiveEmbroidery] = useState(0)
  const [isEmbPaused, setIsEmbPaused] = useState(false)
  const embIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [activeThread, setActiveThread] = useState<string | null>(null)

  // Scroll observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Embroidery auto-advance
  useEffect(() => {
    if (isEmbPaused) return
    embIntervalRef.current = setInterval(() => {
      setActiveEmbroidery(prev => (prev + 1) % EMBROIDERY_STYLES.length)
    }, 4500)
    return () => { if (embIntervalRef.current) clearInterval(embIntervalRef.current) }
  }, [isEmbPaused])

  const handleEmbClick = (i: number) => {
    setActiveEmbroidery(i)
    setIsEmbPaused(true)
    setTimeout(() => setIsEmbPaused(false), 8000)
  }

  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const vis = (id: string) => visibleSections.has(id)

  return (
    <main className="min-h-screen bg-white text-[#1C1917]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%"><defs><pattern id="thread-weave" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 12h24M12 0v24" stroke="#fff" strokeWidth="0.3" /><circle cx="12" cy="12" r="1" fill="#fff" opacity="0.4" /></pattern></defs><rect width="100%" height="100%" fill="url(#thread-weave)" /></svg>
        </div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] text-center">
          <div className="mb-6">
            <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: ACCENT }} className="uppercase">Module 078 — Cultural & Design Intelligence</span>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 1.05, letterSpacing: '-0.02em' }} className="font-normal mb-8">
            Moroccan Fashion<br /><em className="font-italic" style={{ color: ACCENT }}>Intelligence</em>
          </h1>
          <p className="max-w-xl mx-auto text-[13px] leading-relaxed text-[#888] mb-12">
            Caftan, djellaba, babouche, takchita. Eight centuries of dress encoded in silk, wool, and leather. Three regional embroidery schools. A garment that became UNESCO heritage. A $4.25 billion industry that clothed Europe before Europe knew.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {HERO_STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px, 4vw, 48px)', fontVariantNumeric: 'tabular-nums', color: i % 2 === 0 ? ACCENT : '#e5e5e5' }}>{s.value}</div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-[#666] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE GARMENTS ── */}
      <section data-sid="garments" className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="max-w-6xl mx-auto" style={{ opacity: vis('garments') ? 1 : 0, transform: vis('garments') ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
          <div className="mb-4"><span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: ACCENT }}>Six Garments</span></div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px, 4vw, 36px)' }} className="mb-4">The Vocabulary</h2>
          <p className="text-[13px] text-[#888] mb-12 max-w-2xl">Six garments define Moroccan dress. Each carries its own history, its own occasion, its own social grammar. A Moroccan knows which to wear, when, and what it says.</p>
          <div className="grid md:grid-cols-2 gap-1">
            {GARMENTS.map((g, i) => (
              <button key={i} onClick={() => setActiveGarment(i)} className="text-left p-6 transition-all duration-500" style={{ background: activeGarment === i ? '#141414' : 'transparent', borderLeft: `2px solid ${activeGarment === i ? ACCENT : '#222'}`, opacity: vis('garments') ? 1 : 0, transform: vis('garments') ? 'none' : 'translateY(16px)', transitionDelay: `${i * 0.08}s` }}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[15px] font-bold" style={{ color: activeGarment === i ? '#f5f5f5' : '#999' }}>{g.name}</span>
                  <span className="text-[13px] text-[#555]" dir="rtl">{g.arabic}</span>
                  <span className="text-[10px] text-[#555] ml-auto">{g.gender}</span>
                </div>
                <div className="text-[11px] text-[#666] mb-2">{g.origin}</div>
                {activeGarment === i && (
                  <div className="mt-3 animate-fadeIn">
                    <p className="text-[12px] text-[#999] leading-relaxed mb-3">{g.detail}</p>
                    <div className="text-[10px] uppercase tracking-[0.08em]" style={{ color: ACCENT }}>Key feature: {g.keyFeature}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE BREAK: THE CAFTAN ── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32" style={{ background: '#111' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(18px, 3vw, 26px)', lineHeight: 1.7, color: '#ccc' }}>
            &ldquo;The caftan concerns the entire Moroccan society across different localities. It is the essential costume for occasions marking the life of Moroccan Arabs, Amazighs, and Jews.&rdquo;
          </p>
          <p className="text-[11px] text-[#555] mt-6">— UNESCO nomination file, 2025</p>
        </div>
      </section>

      {/* ── CRAFT COMPONENTS ── */}
      <section data-sid="craft" className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="max-w-6xl mx-auto" style={{ opacity: vis('craft') ? 1 : 0, transform: vis('craft') ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
          <div className="mb-4"><span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: ACCENT }}>Anatomy of a Caftan</span></div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px, 4vw, 36px)' }} className="mb-12">The Components</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {CRAFT_COMPONENTS.map((c, i) => (
              <div key={i} className="p-6 border border-[#1a1a1a] hover:border-[#333] transition-all duration-500" style={{ opacity: vis('craft') ? 1 : 0, transform: vis('craft') ? 'none' : 'translateY(16px)', transitionDelay: `${i * 0.1}s` }}>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-[14px] font-bold text-[#1C1917]">{c.name}</span>
                  <span className="text-[13px] text-[#444]" dir="rtl">{c.arabic}</span>
                </div>
                <p className="text-[12px] text-[#888] leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMBROIDERY SCHOOLS — Auto-advancing cycle ── */}
      <section data-sid="embroidery" className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40" style={{ background: '#080808' }}>
        <div className="max-w-5xl mx-auto" style={{ opacity: vis('embroidery') ? 1 : 0, transform: vis('embroidery') ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
          <div className="mb-4"><span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: ACCENT }}>Three Schools + Two Techniques</span></div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px, 4vw, 36px)' }} className="mb-4">Regional Embroidery</h2>
          <p className="text-[13px] text-[#888] mb-10 max-w-2xl">Each city developed its own visual language. Three geographic schools. Two foundational techniques. The same needle, the same silk, entirely different worlds.</p>

          {/* Selector tabs */}
          <div className="flex flex-wrap gap-1 mb-8">
            {EMBROIDERY_STYLES.map((e, i) => (
              <button key={i} onClick={() => handleEmbClick(i)} className="px-4 py-2 text-[11px] uppercase tracking-[0.08em] transition-all duration-300" style={{ background: activeEmbroidery === i ? ACCENT + '18' : 'transparent', color: activeEmbroidery === i ? ACCENT : '#666', borderBottom: `2px solid ${activeEmbroidery === i ? ACCENT : 'transparent'}` }}>
                {e.name}
              </button>
            ))}
          </div>

          {/* Active embroidery detail */}
          <div className="p-8 border border-[#1a1a1a]" style={{ minHeight: '160px' }}>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-[16px] font-bold" style={{ color: ACCENT }}>{EMBROIDERY_STYLES[activeEmbroidery].name}</span>
              <span className="text-[14px] text-[#444]" dir="rtl">{EMBROIDERY_STYLES[activeEmbroidery].arabic}</span>
            </div>
            <div className="text-[11px] text-[#555] mb-4">{EMBROIDERY_STYLES[activeEmbroidery].city}</div>
            <p className="text-[13px] text-[#999] leading-relaxed">{EMBROIDERY_STYLES[activeEmbroidery].character}</p>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-[2px] bg-white overflow-hidden">
            <div style={{ width: '100%', height: '100%', background: ACCENT, animation: isEmbPaused ? 'none' : 'progress-bar 4.5s linear infinite', transformOrigin: 'left' }} />
          </div>
        </div>
      </section>

      {/* ── CONTEMPORARY DESIGNERS ── */}
      <section data-sid="designers" className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="max-w-6xl mx-auto" style={{ opacity: vis('designers') ? 1 : 0, transform: vis('designers') ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
          <div className="mb-4"><span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: ACCENT }}>Contemporary Voices</span></div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px, 4vw, 36px)' }} className="mb-4">The Designers</h2>
          <p className="text-[13px] text-[#888] mb-12 max-w-2xl">From Paris haute couture to Marrakech ateliers. A generation that inherits eight centuries and refuses to choose between tradition and invention.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {DESIGNERS.map((d, i) => (
              <div key={i} className="p-5 border border-[#1a1a1a] hover:border-[#333] transition-all duration-500 group" style={{ opacity: vis('designers') ? 1 : 0, transform: vis('designers') ? 'none' : 'translateY(16px)', transitionDelay: `${i * 0.08}s` }}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[13px] font-bold text-[#1C1917] group-hover:text-[#1C1917] transition-colors">{d.name}</span>
                  <span className="text-[10px] text-[#555]">{d.base}</span>
                </div>
                <p className="text-[11px] text-[#888] leading-relaxed mb-3">{d.note}</p>
                <div className="text-[10px] uppercase tracking-[0.08em]" style={{ color: ACCENT }}>{d.milestone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE BREAK: CHARAF TAJER ── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32" style={{ background: ACCENT + '0a' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(18px, 3vw, 24px)', lineHeight: 1.7, color: '#ccc' }}>
            &ldquo;My Moroccan heritage is more related to the colours and a kind of hospitality. The aesthetic is definitely Paris. The word Casablanca evokes a certain poetry, a certain type of travel, a certain time.&rdquo;
          </p>
          <p className="text-[11px] text-[#555] mt-6">— Charaf Tajer, Casablanca</p>
        </div>
      </section>

      {/* ── INDUSTRY DATA ── */}
      <section data-sid="industry" className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="max-w-5xl mx-auto" style={{ opacity: vis('industry') ? 1 : 0, transform: vis('industry') ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
          <div className="mb-4"><span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: ACCENT }}>The Industry</span></div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px, 4vw, 36px)' }} className="mb-12">Scale & Structure</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRY.map((f, i) => (
              <div key={i} className="p-5 border border-[#1a1a1a]" style={{ opacity: vis('industry') ? 1 : 0, transform: vis('industry') ? 'none' : 'translateY(16px)', transition: 'all 0.6s ease', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '28px', color: ACCENT, fontVariantNumeric: 'tabular-nums' }}>{f.value}</div>
                <div className="text-[11px] text-[#888] mt-1 mb-3">{f.unit}</div>
                <p className="text-[11px] text-[#666] leading-relaxed">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section data-sid="timeline" className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40" style={{ background: '#080808' }}>
        <div className="max-w-5xl mx-auto" style={{ opacity: vis('timeline') ? 1 : 0, transform: vis('timeline') ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
          <div className="mb-4"><span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: ACCENT }}>Timeline</span></div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px, 4vw, 36px)' }} className="mb-4">Eight Centuries of Dress</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            <button onClick={() => setActiveThread(null)} className="px-3 py-1 text-[10px] uppercase tracking-[0.08em] transition-all" style={{ background: !activeThread ? '#222' : 'transparent', color: !activeThread ? '#e5e5e5' : '#666' }}>All</button>
            {Object.entries(THREAD_COLORS).map(([k, c]) => (
              <button key={k} onClick={() => setActiveThread(k)} className="px-3 py-1 text-[10px] uppercase tracking-[0.08em] transition-all" style={{ background: activeThread === k ? c + '22' : 'transparent', color: activeThread === k ? c : '#666' }}>
                {k}
              </button>
            ))}
          </div>
          <div className="space-y-1">
            {filteredHistory.map((h, i) => (
              <div key={i} className="flex gap-4 p-4 hover:bg-white transition-all duration-300" style={{ borderLeft: `2px solid ${THREAD_COLORS[h.thread]}`, opacity: vis('timeline') ? 1 : 0, transform: vis('timeline') ? 'none' : 'translateY(12px)', transition: 'all 0.5s ease', transitionDelay: `${i * 0.06}s` }}>
                <div className="text-[12px] font-bold text-[#888] min-w-[90px] flex-shrink-0">{h.year}</div>
                <div className="text-[12px] text-[#999] leading-relaxed">{h.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY NUMBERS ── */}
      <section data-sid="numbers" className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="max-w-5xl mx-auto" style={{ opacity: vis('numbers') ? 1 : 0, transform: vis('numbers') ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
          <div className="mb-4"><span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: ACCENT }}>Key Numbers</span></div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px, 4vw, 36px)' }} className="mb-12">The Data</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {KEY_NUMBERS.map((n, i) => (
              <div key={i} className="p-5" style={{ opacity: vis('numbers') ? 1 : 0, transform: vis('numbers') ? 'none' : 'translateY(16px)', transition: 'all 0.6s ease', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '36px', color: ACCENT, fontVariantNumeric: 'tabular-nums' }}>{n.value}</div>
                <div className="text-[11px] text-[#888] mt-1 mb-3">{n.unit}</div>
                <p className="text-[11px] text-[#666] leading-relaxed">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIBLIOGRAPHY ── */}
      <section data-sid="biblio" className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40" style={{ background: '#080808' }}>
        <div className="max-w-4xl mx-auto" style={{ opacity: vis('biblio') ? 1 : 0, transform: vis('biblio') ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease' }}>
          <div className="mb-4"><span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: ACCENT }}>Sources</span></div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(24px, 3vw, 32px)' }} className="mb-10">Further Reading</h2>
          <div className="space-y-6">
            {BIBLIOGRAPHY.map((b, i) => (
              <div key={i} className="border-l border-[#222] pl-4" style={{ opacity: vis('biblio') ? 1 : 0, transform: vis('biblio') ? 'none' : 'translateY(12px)', transition: 'all 0.5s ease', transitionDelay: `${i * 0.08}s` }}>
                <div className="text-[13px] text-[#1C1917] mb-1">{b.author} — <em style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{b.title}</em> ({b.year})</div>
                <p className="text-[11px] text-[#666] leading-relaxed">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOURCES ── */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-6 border-t border-[#111]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] text-[#444] leading-relaxed">
            Sources: UNESCO ICH (ich.unesco.org), Morocco World News, Wikipedia (Kaftan, Moroccan kaftan, Djellaba, Babouch), ICESCO, AMITH, Kohan Textile Journal, Oxford Business Group, Equal Times, Morocco Now, Adjoaa, Shoelifer, Business of Fashion, Whitewall, Africanews. Industry data: AMDIE, IFC/World Bank (2021–2022). Historical documentation: Las Cantigas de Santa Maria (El Escorial), al-Jazna&apos;i census. Designer milestones verified via LVMH Prize, Fashion Trust Arabia, Paris Fashion Week official schedules.
          </p>
          <p className="text-[10px] text-[#333] mt-4">&copy; Slow Morocco — Cultural intelligence from 11 years in Morocco</p>
        </div>
      </section>

      <style jsx>{`
        @keyframes progress-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
    </main>
  )
}
