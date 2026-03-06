'use client'
import { useState, useEffect, useRef } from 'react'
import { THREE_LANGUAGES, MINOR_LANGUAGES, THREE_CONFEDERATIONS, TIFINAGH_EVOLUTION, HISTORY, THREAD_META, CENSUS_DATA, HERO_STATS, KEY_NUMBERS, TIFINAGH_ALPHABET, BIBLIOGRAPHY , MAP_POINTS } from './data'
const ACCENT = '#E63946'
const LANG_COLORS = ['#E63946', '#F59E0B', '#2D5F8A']

const MAPBOX_TK_A = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function AmazighMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TK_A || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TK_A!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6, 32.5], zoom: 5.2, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        MAP_POINTS.forEach((p: typeof MAP_POINTS[0]) => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => { map.flyTo({ center: [p.lng, p.lat], zoom: 8, duration: 1200 }) })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '220px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])
  return <div ref={mapContainer} className="w-full" style={{ height: '480px', background: '#0a0a0a' }} />
}

export function AmazighIdentityContent() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeLang, setActiveLang] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [censusAnimated, setCensusAnimated] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCensusAnimated(true) }, { threshold: 0.2 })
    const el = document.getElementById('census-chart')
    if (el) obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const v = (id: string) => vis.has(id)
  const fH = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        {/* Three-language colour band */}
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          {LANG_COLORS.map((c, i) => <div key={i} className="flex-1" style={{ background: c }} />)}
        </div>
        {/* Giant Yaz watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span style={{ fontSize: 'clamp(20rem, 40vw, 50rem)', color: 'rgba(230,57,70,0.04)', fontFamily: 'serif', lineHeight: 1 }}>ⵣ</span>
        </div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-28">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>Module 011 · Identity Intelligence</p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>Amazigh<br />Identity Map</h1>
          <p className="text-[15px] md:text-[17px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.7)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Three languages. Three confederations. One alphabet older than Arabic. The Imazighen — &ldquo;the free people&rdquo; — and their 3,000-year fight to remain visible.
          </p>
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((st, i) => (<div key={i}><span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{st.value}</span><span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{st.label}</span></div>))}
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) }}`}</style>
      </section>

      {/* ═══ THREE LANGUAGES — Expanding selectors with census mini-bars ═══ */}
      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Languages</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Three Languages</h2>
        <div className="flex gap-3 mb-12">{THREE_LANGUAGES.map((lang, i) => (
          <button key={i} onClick={() => setActiveLang(i)} className="transition-all duration-500 text-left relative overflow-hidden" style={{ flex: activeLang === i ? 3 : 1, padding: '20px', background: activeLang === i ? '#0a0a0a' : '#fafafa', color: activeLang === i ? '#fff' : '#999' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: LANG_COLORS[i] }} />
            <span className="font-serif italic block" style={{ fontSize: activeLang === i ? '24px' : '14px', transition: 'font-size 0.5s' }}>{lang.name}</span>
            <span className="text-[10px] block mt-1 opacity-50">{lang.endonym}</span>
          </button>))}</div>
        <div data-sid="langs" className={`transition-all duration-700 ${v('langs') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <h3 className="font-serif italic text-[28px] md:text-[36px] text-[#0a0a0a]">{THREE_LANGUAGES[activeLang].name}</h3>
              <p className="text-[20px] mt-1" style={{ color: '#bbb' }}>{THREE_LANGUAGES[activeLang].tifinagh}</p>
              <p className="text-[12px] text-[#999] mt-2">{THREE_LANGUAGES[activeLang].region}</p>
              <div className="mt-6 space-y-4">
                <div><span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: LANG_COLORS[activeLang] }}>2024 Speakers</span><p className="text-[13px] text-[#525252]">{THREE_LANGUAGES[activeLang].speakers2024} ({THREE_LANGUAGES[activeLang].percentage2024}%)</p></div>
                <div><span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: LANG_COLORS[activeLang] }}>2004 Census</span><p className="text-[13px] text-[#525252]">{THREE_LANGUAGES[activeLang].speakers2004} ({THREE_LANGUAGES[activeLang].percentage2004}%)</p></div>
                {/* Mini comparison bar */}
                <div className="mt-4">
                  <div className="flex items-center gap-3 text-[10px] text-[#999] mb-1"><span>1960: {THREE_LANGUAGES[activeLang].percentage1960}%</span><span>→</span><span>2024: {THREE_LANGUAGES[activeLang].percentage2024}%</span></div>
                  <div className="h-2 bg-[#f5f5f5] relative"><div className="absolute top-0 left-0 h-full transition-all duration-1000" style={{ width: `${THREE_LANGUAGES[activeLang].percentage2024 * 3}%`, background: LANG_COLORS[activeLang] }} /><div className="absolute top-0 left-0 h-full border-r-2 border-dashed" style={{ width: `${THREE_LANGUAGES[activeLang].percentage1960 * 3}%`, borderColor: '#999' }} /></div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5">
              <p className="text-[15px] text-[#525252] leading-[1.75] mb-6">{THREE_LANGUAGES[activeLang].description}</p>
              <div><span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: '#999' }}>Key Features</span><p className="text-[13px] text-[#737373] leading-relaxed">{THREE_LANGUAGES[activeLang].keyFeatures}</p></div>
            </div>
            <div className="md:col-span-3 flex flex-col justify-end">
              <div className="border-l-2 pl-6" style={{ borderColor: LANG_COLORS[activeLang] }}>
                <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: '#999' }}>Urban/Rural</span>
                <p className="text-[14px] text-[#525252] leading-relaxed">{THREE_LANGUAGES[activeLang].urbanRural}</p>
              </div>
            </div>
          </div>
        </div>
      </div></section>

      {/* ═══ CENSUS DECLINE — Animated bar chart ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Decline</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-6" style={{ color: '#fff' }}>Census Data</h2>
        <p className="text-[14px] max-w-[480px] leading-relaxed mb-16" style={{ color: 'rgba(255,255,255,0.6)' }}>Percentage of Moroccan population identifying as Amazigh-speaking. A century of decline — then constitutional recognition.</p>
        <div id="census-chart" className="space-y-4">
          {CENSUS_DATA.map((c, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-2 md:col-span-1"><span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{c.label}</span></div>
              <div className="col-span-8 md:col-span-9">
                <div className="h-8 relative" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out flex items-center" style={{ width: censusAnimated ? `${c.total * 2}%` : '0%', background: `${ACCENT}cc`, transitionDelay: `${i * 150}ms` }}>
                    <span className="text-[11px] px-2" style={{ color: '#fff' }}>{c.total}%</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 hidden md:block"><p className="text-[10px] leading-tight" style={{ color: 'rgba(255,255,255,0.25)' }}>{c.note.slice(0, 60)}…</p></div>
            </div>))}
        </div>
      </div></section>

      {/* ═══ PULLQUOTE ═══ */}
      <section className="flex items-center justify-center min-h-[42vh]" style={{ background: ACCENT }}><div className="max-w-[720px] px-8 text-center py-20">
        <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', color: '#fff' }}>Imazighen. The free people. They named themselves before anyone else could.</p>
      </div></section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#A0452E' }}>Language Zones — Mapped</p>
        <AmazighMap />
      </div></section>

{/* ═══ THREE CONFEDERATIONS — Staggered editorial ═══ */}
      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Confederations</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Three Confederations</h2>
        <div data-sid="confed" className={`transition-all duration-700 ${v('confed') ? 'opacity-100' : 'opacity-0'}`}>
          {THREE_CONFEDERATIONS.map((c, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12" style={{ borderTop: i === 0 ? 'none' : '1px solid #e5e5e5' }}>
              <div className={i % 2 === 0 ? 'md:col-span-3' : 'md:col-span-3 md:col-start-2'}>
                <h3 className="font-serif italic text-[24px] md:text-[28px] text-[#0a0a0a]">{c.name}</h3>
                <p className="text-[14px] mt-1" dir="rtl" style={{ color: '#bbb' }}>{c.arabic}</p>
                <p className="text-[12px] text-[#999] mt-2">{c.territory}</p>
              </div>
              <div className="md:col-span-5">
                <p className="text-[15px] text-[#525252] leading-[1.75] mb-4">{c.character}</p>
                <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: ACCENT }}>Dynasties Built</span>
                <p className="text-[13px] text-[#525252]">{c.dynastiesBuilt.join(' · ')}</p>
              </div>
              <div className="md:col-span-3">
                <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: '#999' }}>Descendants</span>
                <p className="text-[13px] text-[#737373] leading-relaxed mb-4">{c.descendants}</p>
                <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: '#999' }}>Key Tribes</span>
                <p className="text-[12px] text-[#999]">{c.keyTribes.join(', ')}</p>
              </div>
            </div>))}
        </div>
      </div></section>

      {/* ═══ TIFINAGH EVOLUTION — Dark ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — The Script</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>Tifinagh Evolution</h2>
        <div data-sid="tifinagh" className={`transition-all duration-700 ${v('tifinagh') ? 'opacity-100' : 'opacity-0'}`}>
          {TIFINAGH_EVOLUTION.map((t, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="md:col-span-3">
                <h3 className="font-serif italic text-[18px]" style={{ color: '#fff' }}>{t.name}</h3>
                <p className="text-[12px] mt-1" style={{ color: ACCENT }}>{t.period}</p>
                <p className="text-[11px] mt-2" style={{ color: 'rgba(255,255,255,0.25)' }}>{t.geography}</p>
              </div>
              <div className="md:col-span-6"><p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.description}</p></div>
              <div className="md:col-span-3"><div className="border-l-2 pl-4" style={{ borderColor: ACCENT }}><p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.keyFact}</p></div></div>
            </div>))}
        </div>
        {/* Tifinagh alphabet grid */}
        <div className="mt-20"><p className="text-[10px] uppercase tracking-[0.12em] mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>Neo-Tifinagh Alphabet (33 letters)</p>
          <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
            {TIFINAGH_ALPHABET.map((ch, i) => (
              <div key={i} className="text-center py-3 transition-colors" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="block text-[24px]" style={{ color: ACCENT }}>{ch.letter}</span>
                <span className="text-[9px] block mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{ch.name}</span>
              </div>))}
          </div>
        </div>
      </div></section>

      {/* ═══ MINOR LANGUAGES ═══ */}
      <section style={{ background: '#fafafa' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4"><p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — Endangered</p><h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05]">Minor<br />Languages</h2></div>
          <div className="md:col-span-8" data-sid="minor"><div className={`transition-all duration-700 ${v('minor') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {MINOR_LANGUAGES.map((l, i) => (
              <div key={i} className="py-5" style={{ borderBottom: '1px solid #e5e5e5' }}>
                <div className="flex items-baseline gap-3 mb-2"><h3 className="font-serif italic text-[18px] text-[#0a0a0a]">{l.name}</h3><span className="text-[11px] px-2 py-0.5" style={{ background: l.status === 'Critically endangered' ? '#FEE2E2' : '#FEF3C7', color: l.status === 'Critically endangered' ? '#991B1B' : '#92400E' }}>{l.status}</span></div>
                <p className="text-[12px] text-[#999] mb-1">{l.region} · {l.estimatedSpeakers}</p>
                <p className="text-[13px] text-[#525252] leading-relaxed">{l.note}</p>
              </div>))}
          </div></div>
        </div>
      </div></section>

      {/* ═══ TIMELINE ═══ */}
      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>006 — Chronology</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">3,000 Years</h2>
        <div className="flex flex-wrap gap-2 mb-12">
          <button onClick={() => setActiveThread(null)} className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all" style={{ background: !activeThread ? '#0a0a0a' : 'transparent', color: !activeThread ? '#fff' : '#999', border: `1px solid ${!activeThread ? '#0a0a0a' : '#ddd'}` }}>All</button>
          {Object.entries(THREAD_META).map(([t, meta]) => (<button key={t} onClick={() => setActiveThread(activeThread === t ? null : t)} className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all" style={{ background: activeThread === t ? '#0a0a0a' : 'transparent', color: activeThread === t ? meta.color : '#999', border: `1px solid ${activeThread === t ? '#0a0a0a' : '#ddd'}` }}>{meta.label}</button>))}
        </div>
        <div data-sid="timeline" className={`relative pl-8 md:pl-12 transition-all duration-700 ${v('timeline') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px" style={{ background: '#e5e5e5' }} />
          <div className="space-y-6">{fH.map((h, i) => (<div key={i} className="relative"><div className="absolute -left-[23px] md:-left-[31px] top-[6px] w-[7px] h-[7px] rounded-full" style={{ background: THREAD_META[h.thread]?.color || ACCENT }} /><span className="text-[11px] block mb-1" style={{ color: THREAD_META[h.thread]?.color || '#999' }}>{h.year}</span><p className="text-[14px] text-[#525252] leading-relaxed max-w-[640px]">{h.event}</p></div>))}</div>
        </div>
      </div></section>

      {/* ═══ KEY NUMBERS + SOURCES + FOOTER ═══ */}
      <section style={{ background: '#fafafa' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Key Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">{KEY_NUMBERS.map((n, i) => (<div key={i} className="flex gap-6 items-start" style={{ paddingTop: i % 2 === 1 ? '40px' : '0' }}><span className="font-serif italic flex-shrink-0" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{n.value}</span><p className="text-[13px] text-[#525252] leading-relaxed pt-2">{n.context}</p></div>))}</div>
      </div></section>
      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: '#999' }}>Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">{BIBLIOGRAPHY.map((b, i) => (<div key={i}><span className="text-[12px] text-[#525252]">{b.source}</span><p className="text-[11px] text-[#999] leading-relaxed">{b.detail}</p></div>))}</div>
      </div></section>
      <footer><div style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-8 md:px-[8%]"><p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Module 011 · Amazigh Identity Map · © Slow Morocco</p></div><div style={{ backgroundColor: '#161616' }} className="py-3"><p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>slowmorocco.com</p></div><div style={{ backgroundColor: '#0e0e0e' }} className="py-2" /></footer>
    </main>
  )
}
