'use client'

import { useState, useEffect } from 'react'
import { BREADS, FERRAN, WHEAT_DEPENDENCY, ETIQUETTE, HISTORY, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#D4A053'
const THREAD_COLORS: Record<string, string> = { origin: '#8B7355', colonial: '#2D5F8A', modern: '#5C7C3E' }

export default function BreadOfMoroccoContent() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeBread, setActiveBread] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const v = (id: string) => vis.has(id)
  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY

  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
            {[...Array(5)].map((_, j) => (
              <circle key={j} cx={600} cy={400} r={120 + j * 80} stroke={ACCENT} strokeWidth="0.5" fill="none" opacity={0.4 - j * 0.06} />
            ))}
          </svg>
        </div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-28">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>Module 074 · Food Intelligence</p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Bread of<br />Morocco
          </h1>
          <p className="text-[15px] md:text-[17px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.7)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Eight breads. The communal oven. A grain dependency that shapes foreign policy. In Morocco, bread is never cut — it is torn, kissed if dropped, and shared before every meal.
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

      {/* ═══ EIGHT BREADS — Expanding card selector ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Breads</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">Eight Breads of a Nation</h2>
          <p className="text-[14px] text-[#737373] max-w-[500px] leading-relaxed mb-16">
            From the daily round loaf to the sand-baked bread of the Sahara. Each one answers a different question: how much time do we have, what flour is in the house, is there an oven nearby.
          </p>

          {/* Two rows of 4 — selector */}
          <div className="grid grid-cols-4 gap-2 mb-12">
            {BREADS.map((b, i) => (
              <button key={i} onClick={() => setActiveBread(i)}
                className="text-left p-4 transition-all duration-400"
                style={{ background: activeBread === i ? '#0a0a0a' : '#fafafa', color: activeBread === i ? '#fff' : '#999' }}>
                <span className="font-serif italic block text-[16px] md:text-[20px]">{b.name}</span>
                <span className="text-[10px] uppercase tracking-[0.06em] block mt-1 opacity-60">{b.type}</span>
              </button>
            ))}
          </div>

          {/* Active bread — asymmetric */}
          <div data-sid="breads" className={`transition-all duration-700 ${v('breads') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <h3 className="font-serif italic text-[28px] md:text-[36px] text-[#0a0a0a] leading-tight">{BREADS[activeBread].name}</h3>
                <p className="text-[14px] mt-1" dir="rtl" style={{ color: '#bbb' }}>{BREADS[activeBread].arabic}</p>
                <div className="mt-6 space-y-4">
                  {[['Method', BREADS[activeBread].method], ['Flour', BREADS[activeBread].flour], ['When', BREADS[activeBread].when]].map(([label, text]) => (
                    <div key={label}>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: ACCENT }}>{label}</span>
                      <p className="text-[13px] text-[#525252] leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-5">
                <p className="text-[15px] text-[#525252] leading-[1.75]">{BREADS[activeBread].detail}</p>
              </div>
              <div className="md:col-span-3 flex flex-col justify-end">
                <div className="border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                  <p className="text-[14px] leading-relaxed" style={{ color: ACCENT }}>{BREADS[activeBread].keyFact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE FERRAN — Dark immersive ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Communal Oven</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>The Ferran</h2>
          <div data-sid="ferran" className={`transition-all duration-700 ${v('ferran') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {FERRAN.map((f, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="md:col-span-3">
                  <span className="font-serif italic text-[18px]" style={{ color: ACCENT }}>{f.aspect}</span>
                </div>
                <div className="md:col-span-9">
                  <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.5)' }}>{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PULLQUOTE ═══ */}
      <section className="flex items-center justify-center min-h-[42vh]" style={{ background: ACCENT }}>
        <div className="max-w-[720px] px-8 text-center py-20">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', color: '#fff' }}>
            Bread that falls on the ground is picked up, kissed, and placed somewhere higher. To step on bread is deeply offensive.
          </p>
        </div>
      </section>

      {/* ═══ ETIQUETTE — Sidebar + content ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Rules</p>
              <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05]">Bread<br />Etiquette</h2>
            </div>
            <div className="md:col-span-8" data-sid="etiquette">
              <div className={`transition-all duration-700 ${v('etiquette') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                {ETIQUETTE.map((e, i) => (
                  <div key={i} className="py-6" style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <h3 className="font-serif italic text-[20px] text-[#0a0a0a] mb-2">{e.rule}</h3>
                    <p className="text-[14px] text-[#525252] leading-[1.75]">{e.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHEAT DEPENDENCY — Data as drama ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — The Dependency</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Wheat &amp; Power</h2>
          <div data-sid="wheat" className={`transition-all duration-700 ${v('wheat') ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {WHEAT_DEPENDENCY.map((w, i) => (
                <div key={i} className="flex gap-6 items-start" style={{ paddingTop: i % 2 === 1 ? '32px' : '0' }}>
                  <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: ACCENT }}>{w.metric}</span>
                    <p className="font-serif italic text-[22px] md:text-[26px] text-[#0a0a0a] leading-tight">{w.value}</p>
                    <p className="text-[11px] text-[#999] mt-2">{w.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — Chronology</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">From Tafarnout<br />to Subsidy</h2>
          <div className="flex flex-wrap gap-2 mb-12">
            <button onClick={() => setActiveThread(null)}
              className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all"
              style={{ background: !activeThread ? '#0a0a0a' : 'transparent', color: !activeThread ? '#fff' : '#999', border: `1px solid ${!activeThread ? '#0a0a0a' : '#ddd'}` }}>All</button>
            {Object.entries(THREAD_COLORS).map(([t, c]) => (
              <button key={t} onClick={() => setActiveThread(activeThread === t ? null : t)}
                className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all"
                style={{ background: activeThread === t ? '#0a0a0a' : 'transparent', color: activeThread === t ? c : '#999', border: `1px solid ${activeThread === t ? '#0a0a0a' : '#ddd'}` }}>{t}</button>
            ))}
          </div>
          <div data-sid="timeline" className={`transition-all duration-700 ${v('timeline') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px" style={{ background: '#e5e5e5' }} />
              <div className="space-y-6">
                {filteredHistory.map((h, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[23px] md:-left-[31px] top-[6px] w-[7px] h-[7px] rounded-full" style={{ background: THREAD_COLORS[h.thread] || ACCENT }} />
                    <span className="text-[11px] block mb-1" style={{ color: THREAD_COLORS[h.thread] || '#999' }}>{h.year}</span>
                    <p className="text-[14px] text-[#525252] leading-relaxed max-w-[640px]">{h.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>006 — By the Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Key Numbers</h2>
          <div data-sid="numbers" className={`transition-all duration-700 ${v('numbers') ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {KEY_NUMBERS.map((n, i) => (
                <div key={i} className="flex gap-6 items-start" style={{ paddingTop: i % 2 === 1 ? '40px' : '0' }}>
                  <span className="font-serif italic flex-shrink-0" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{n.number}</span>
                  <p className="text-[13px] text-[#525252] leading-relaxed pt-2">{n.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="bg-white">
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
          <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Module 074 · Bread of Morocco · © Slow Morocco</p>
          <p className="text-[11px] mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>Data: HCP, USDA FAS, ONICL, ONSSA, World Bank</p>
        </div>
        <div style={{ backgroundColor: '#161616' }} className="py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>slowmorocco.com</p>
        </div>
        <div style={{ backgroundColor: '#0e0e0e' }} className="py-2" />
      </footer>
    </main>
  )
}
