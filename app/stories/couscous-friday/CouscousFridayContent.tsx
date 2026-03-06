'use client'

import { useState, useEffect } from 'react'
import { VARIATIONS, TECHNIQUE, FRIDAY_RITUAL, LIFE_EVENTS, MAGHREB_STYLES, VOCABULARY, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#D97706'

export function CouscousFridayContent() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeVariation, setActiveVariation] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const v = (id: string) => vis.has(id)

  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
            {[...Array(6)].map((_, j) => (
              <circle key={j} cx={600} cy={400} r={100 + j * 70} stroke={ACCENT} strokeWidth="0.5" fill="none" opacity={0.4 - j * 0.05} />
            ))}
          </svg>
        </div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-28">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>Module 076 · Food Intelligence</p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Couscous<br />Friday
          </h1>
          <p className="text-[15px] md:text-[17px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.7)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            The sacred Friday meal. Seven regional variations, a three-steam technique, and the social contract that holds a country together over a shared plate.
          </p>
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((st, i) => (
              <div key={i}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{st.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) }}`}</style>
      </section>

      {/* ═══ SEVEN VARIATIONS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Variations</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Seven Ways to Friday</h2>
          <div className="flex flex-wrap gap-2 mb-12">
            {VARIATIONS.map((va, i) => (
              <button key={i} onClick={() => setActiveVariation(i)}
                className="transition-all duration-300 text-left px-4 py-3"
                style={{ background: activeVariation === i ? '#0a0a0a' : '#fafafa', color: activeVariation === i ? ACCENT : '#999' }}>
                <span className="font-serif italic text-[16px]">{va.name}</span>
              </button>
            ))}
          </div>
          <div data-sid="variations" className={`transition-all duration-700 ${v('variations') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <h3 className="font-serif italic text-[28px] md:text-[36px] text-[#0a0a0a] leading-tight">{VARIATIONS[activeVariation].name}</h3>
                <p className="text-[14px] mt-1" dir="rtl" style={{ color: '#bbb' }}>{VARIATIONS[activeVariation].arabic}</p>
                <p className="text-[12px] text-[#999] mt-4">{VARIATIONS[activeVariation].region}</p>
                <div className="border-l-2 pl-6 mt-6" style={{ borderColor: ACCENT }}>
                  <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: '#999' }}>Key Ingredient</span>
                  <p className="text-[14px] leading-relaxed" style={{ color: ACCENT }}>{VARIATIONS[activeVariation].keyIngredient}</p>
                </div>
              </div>
              <div className="md:col-span-8">
                <p className="text-[15px] text-[#525252] leading-[1.75]">{VARIATIONS[activeVariation].detail}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TECHNIQUE ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Method</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>Three Steams</h2>
          <div className="flex gap-2 md:gap-4 mb-12">
            {TECHNIQUE.map((t, i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                style={{ padding: '12px 8px', borderBottom: activeStep === i ? `2px solid ${ACCENT}` : '2px solid transparent' }}>
                <span className="font-serif italic block transition-all duration-300" style={{
                  fontSize: activeStep === i ? 'clamp(2rem, 4vw, 3.5rem)' : '20px',
                  color: activeStep === i ? '#fff' : '#555', lineHeight: 1,
                }}>{String(t.step).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <div data-sid="technique" className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 transition-all duration-700 ${v('technique') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="md:col-span-4">
              <h3 className="font-serif italic text-[24px] md:text-[28px]" style={{ color: '#fff' }}>{TECHNIQUE[activeStep].name}</h3>
              <p className="text-[13px] mt-1" style={{ color: ACCENT }}>{TECHNIQUE[activeStep].arabic} · {TECHNIQUE[activeStep].duration}</p>
            </div>
            <div className="md:col-span-8">
              <p className="text-[15px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.5)' }}>{TECHNIQUE[activeStep].detail}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PULLQUOTE ═══ */}
      <section className="flex items-center justify-center min-h-[42vh]" style={{ background: ACCENT }}>
        <div className="max-w-[720px] px-8 text-center py-20">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', color: '#fff' }}>
            You don&apos;t cook when you mourn. The community cooks for you.
          </p>
        </div>
      </section>

      {/* ═══ FRIDAY RITUAL ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Ritual</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">A Friday Unfolds</h2>
          <div data-sid="ritual" className={`transition-all duration-700 ${v('ritual') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {FRIDAY_RITUAL.map((r, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-8" style={{ borderBottom: '1px solid #e5e5e5' }}>
                <div className="md:col-span-3">
                  <h3 className="font-serif italic text-[20px] md:text-[24px] text-[#0a0a0a]">{r.moment}</h3>
                </div>
                <div className="md:col-span-9">
                  <p className="text-[14px] text-[#525252] leading-[1.75]">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LIFE EVENTS ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — Beyond Friday</p>
              <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05]">Couscous<br />in Life</h2>
            </div>
            <div className="md:col-span-8" data-sid="life">
              <div className={`transition-all duration-700 ${v('life') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                {LIFE_EVENTS.map((e, i) => (
                  <div key={i} className="py-6" style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <h3 className="font-serif italic text-[20px] text-[#0a0a0a] mb-2">{e.occasion}</h3>
                    <p className="text-[14px] text-[#525252] leading-[1.75]">{e.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACROSS THE MAGHREB ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — Across Borders</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">The Maghreb Styles</h2>
          <div data-sid="maghreb" className={`transition-all duration-700 ${v('maghreb') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {MAGHREB_STYLES.map((m, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10" style={{ borderTop: i === 0 ? 'none' : '1px solid #e5e5e5' }}>
                <div className="md:col-span-3">
                  <h3 className="font-serif italic text-[24px] md:text-[28px] text-[#0a0a0a]">{m.country}</h3>
                </div>
                <div className="md:col-span-9">
                  <p className="text-[15px] text-[#525252] leading-[1.75]">{m.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VOCABULARY ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>006 — Language</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>Vocabulary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {VOCABULARY.map((word, i) => (
              <div key={i} className="py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif italic text-[18px]" style={{ color: '#fff' }}>{word.term}</span>
                  <span className="text-[13px]" dir="rtl" style={{ color: 'rgba(255,255,255,0.25)' }}>{word.arabic}</span>
                </div>
                <p className="text-[13px] leading-relaxed mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>{word.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>007 — By the Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Key Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {KEY_NUMBERS.map((n, i) => (
              <div key={i} className="flex gap-6 items-start" style={{ paddingTop: i % 2 === 1 ? '40px' : '0' }}>
                <span className="font-serif italic flex-shrink-0" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{n.number}</span>
                <p className="text-[13px] text-[#525252] leading-relaxed pt-2">{n.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: '#999' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            {BIBLIOGRAPHY.map((b, i) => (
              <div key={i}>
                <span className="text-[12px] text-[#525252]">{b.source}</span>
                <p className="text-[11px] text-[#999] leading-relaxed">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-8 md:px-[8%]">
          <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Module 076 · Couscous Friday · © Slow Morocco</p>
        </div>
        <div style={{ backgroundColor: '#161616' }} className="py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>slowmorocco.com</p>
        </div>
        <div style={{ backgroundColor: '#0e0e0e' }} className="py-2" />
      </footer>
    </main>
  )
}
