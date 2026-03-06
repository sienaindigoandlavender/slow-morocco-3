'use client'
import { useState, useEffect } from 'react'
import { INSTITUTIONS, SCHOLARS, THE_DEBATE, LIBRARY, HISTORY, COMPARISONS, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'
const ACCENT = '#1E3A5F'
const THREAD_COLORS: Record<string, string> = { founding: '#1E3A5F', scholars: '#6A4C93', modern: '#5C7C3E', debate: '#A0452E' }
export function OldestUniversitiesContent() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeInst, setActiveInst] = useState(0)
  const [activeScholar, setActiveScholar] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [showAllLib, setShowAllLib] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  const v = (id: string) => vis.has(id)
  const fH = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const visLib = showAllLib ? LIBRARY : LIBRARY.slice(0, 4)
  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none"><svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice"><circle cx={600} cy={400} r={200} stroke={ACCENT} strokeWidth="0.5" fill="none" /><path d="M480,520 Q600,240 720,520" stroke={ACCENT} strokeWidth="0.4" fill="none" opacity={0.3} /></svg></div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-28">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>Module 072 · Knowledge Intelligence</p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>The World&rsquo;s Oldest<br />Universities</h1>
          <p className="text-[15px] md:text-[17px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.7)', animation: 'fadeUp 1s ease 0.7s forwards' }}>229 years before Bologna. 237 before Oxford. Morocco&rsquo;s claim to the oldest continuously operating university in the world.</p>
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((st, i) => (<div key={i}><span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{st.value}</span><span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{st.label}</span></div>))}
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) }}`}</style>
      </section>

      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Institutions</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Three Institutions</h2>
        <div className="flex gap-3 mb-12">{INSTITUTIONS.map((inst, i) => (
          <button key={i} onClick={() => setActiveInst(i)} className="transition-all duration-500 text-left" style={{ flex: activeInst === i ? 3 : 1, padding: '20px', background: activeInst === i ? '#0a0a0a' : '#fafafa', color: activeInst === i ? '#fff' : '#999' }}>
            <span className="font-serif italic block" style={{ fontSize: activeInst === i ? '22px' : '14px', transition: 'font-size 0.5s' }}>{inst.name}</span><span className="text-[10px] block mt-1 opacity-50">{inst.founded}</span>
          </button>))}</div>
        <div data-sid="inst" className={`transition-all duration-700 ${v('inst') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <h3 className="font-serif italic text-[28px] md:text-[36px] text-[#0a0a0a]">{INSTITUTIONS[activeInst].name}</h3>
              <p className="text-[12px] text-[#999] mt-2">{INSTITUTIONS[activeInst].location}</p>
              <div className="mt-6 space-y-4">
                {[['Founded', INSTITUTIONS[activeInst].founded], ['Founder', INSTITUTIONS[activeInst].founder], ['Status', INSTITUTIONS[activeInst].status]].map(([l, t]) => (<div key={l}><span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: ACCENT }}>{l}</span><p className="text-[13px] text-[#525252]">{t}</p></div>))}
              </div>
            </div>
            <div className="md:col-span-5"><p className="text-[15px] text-[#525252] leading-[1.75]">{INSTITUTIONS[activeInst].detail}</p></div>
            <div className="md:col-span-3 flex flex-col justify-end"><div className="border-l-2 pl-6" style={{ borderColor: ACCENT }}><p className="text-[14px] leading-relaxed" style={{ color: ACCENT }}>{INSTITUTIONS[activeInst].keyFact}</p></div></div>
          </div>
        </div>
      </div></section>

      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Scholars</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>Who Studied Here</h2>
        <div data-sid="scholars" className={`transition-all duration-700 ${v('scholars') ? 'opacity-100' : 'opacity-0'}`}>
          {SCHOLARS.map((s, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10" style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
              <div className={i % 2 === 0 ? 'md:col-span-3' : 'md:col-span-3 md:col-start-2'}>
                <h3 className="font-serif italic text-[22px]" style={{ color: '#fff' }}>{s.name}</h3>
                <p className="text-[12px] mt-1" style={{ color: ACCENT }}>{s.lifespan}</p>
                <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.field}</p>
              </div>
              <div className="md:col-span-5"><p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.contribution}</p></div>
              <div className="md:col-span-3"><span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>Connection</span><p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.connection}</p></div>
            </div>))}
        </div>
      </div></section>

      <section className="flex items-center justify-center min-h-[42vh]" style={{ background: ACCENT }}><div className="max-w-[720px] px-8 text-center py-20">
        <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', color: '#fff' }}>Founded by a woman. In 859. On the other side of the world from Oxford.</p>
      </div></section>

      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4"><p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Library</p><h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05]">The<br />Collection</h2></div>
          <div className="md:col-span-8" data-sid="library"><div className={`transition-all duration-700 ${v('library') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {visLib.map((l, i) => (<div key={i} className="py-5" style={{ borderBottom: '1px solid #e5e5e5' }}><p className="text-[14px] text-[#525252] leading-[1.75]">{l.detail}</p></div>))}
            {!showAllLib && LIBRARY.length > 4 && <button onClick={() => setShowAllLib(true)} className="mt-6 text-[11px] uppercase tracking-[0.1em] px-6 py-3 hover:bg-[#0a0a0a] hover:text-white transition-all" style={{ border: '1px solid #0a0a0a' }}>Show all {LIBRARY.length} items</button>}
          </div></div>
        </div>
      </div></section>

      <section style={{ background: '#fafafa' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — The Debate</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">University or Madrasa?</h2>
        <div data-sid="debate" className={`transition-all duration-700 ${v('debate') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          {THE_DEBATE.map((d, i) => (
            <div key={i} className="py-10" style={{ borderBottom: '1px solid #e5e5e5' }}>
              <h3 className="font-serif italic text-[20px] text-[#0a0a0a] mb-6">{d.claim}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div><span className="text-[10px] uppercase tracking-[0.1em] block mb-3" style={{ color: ACCENT }}>For Morocco</span><p className="text-[14px] text-[#525252] leading-[1.75]">{d.forMorocco}</p></div>
                <div><span className="text-[10px] uppercase tracking-[0.1em] block mb-3" style={{ color: '#A0452E' }}>Counter</span><p className="text-[14px] text-[#525252] leading-[1.75]">{d.counterArgument}</p></div>
              </div>
            </div>))}
        </div>
      </div></section>

      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — Comparison</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">The Field</h2>
        <div data-sid="compare" className={`transition-all duration-700 ${v('compare') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          {COMPARISONS.map((c, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-6" style={{ borderBottom: '1px solid #e5e5e5' }}>
              <div className="md:col-span-4"><h3 className="font-serif italic text-[18px] text-[#0a0a0a]">{c.institution}</h3><p className="text-[12px] text-[#999] mt-1">{c.location}</p></div>
              <div className="md:col-span-2"><span className="font-serif italic text-[20px]" style={{ color: ACCENT }}>{c.founded}</span></div>
              <div className="md:col-span-6"><p className="text-[13px] text-[#525252] leading-relaxed">{c.claim}</p></div>
            </div>))}
        </div>
      </div></section>

      <section style={{ background: '#fafafa' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>006 — Chronology</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">Timeline</h2>
        <div className="flex flex-wrap gap-2 mb-12">
          <button onClick={() => setActiveThread(null)} className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all" style={{ background: !activeThread ? '#0a0a0a' : 'transparent', color: !activeThread ? '#fff' : '#999', border: `1px solid ${!activeThread ? '#0a0a0a' : '#ddd'}` }}>All</button>
          {Object.entries(THREAD_COLORS).map(([t, c]) => (<button key={t} onClick={() => setActiveThread(activeThread === t ? null : t)} className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all" style={{ background: activeThread === t ? '#0a0a0a' : 'transparent', color: activeThread === t ? c : '#999', border: `1px solid ${activeThread === t ? '#0a0a0a' : '#ddd'}` }}>{t}</button>))}
        </div>
        <div data-sid="timeline" className={`relative pl-8 md:pl-12 transition-all duration-700 ${v('timeline') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px" style={{ background: '#ddd' }} />
          <div className="space-y-6">{fH.map((h, i) => (<div key={i} className="relative"><div className="absolute -left-[23px] md:-left-[31px] top-[6px] w-[7px] h-[7px] rounded-full" style={{ background: THREAD_COLORS[h.thread] || ACCENT }} /><span className="text-[11px] block mb-1" style={{ color: THREAD_COLORS[h.thread] || '#999' }}>{h.year}</span><p className="text-[14px] text-[#525252] leading-relaxed max-w-[640px]">{h.event}</p></div>))}</div>
        </div>
      </div></section>

      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Key Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">{KEY_NUMBERS.map((n, i) => (<div key={i} className="flex gap-6 items-start" style={{ paddingTop: i % 2 === 1 ? '40px' : '0' }}><span className="font-serif italic flex-shrink-0" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{n.number}</span><p className="text-[13px] text-[#525252] leading-relaxed pt-2">{n.context}</p></div>))}</div>
      </div></section>

      <section style={{ background: '#fafafa' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: '#999' }}>Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">{BIBLIOGRAPHY.map((b, i) => (<div key={i}><span className="text-[12px] text-[#525252]">{b.source}</span><p className="text-[11px] text-[#999] leading-relaxed">{b.detail}</p></div>))}</div>
      </div></section>
      <footer><div style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-8 md:px-[8%]"><p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Module 072 · Oldest Universities · © Slow Morocco</p></div><div style={{ backgroundColor: '#161616' }} className="py-3"><p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>slowmorocco.com</p></div><div style={{ backgroundColor: '#0e0e0e' }} className="py-2" /></footer>
    </main>
  )
}
