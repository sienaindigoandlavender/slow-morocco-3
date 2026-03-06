'use client'

import { useState, useEffect, useRef } from 'react'
import { DESERT_TYPES, SAHARA_FACTS, MOROCCAN_ERGS, HISTORY, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY , MAP_POINTS } from './data'

const ACCENT = '#F59E0B'
const TYPE_COLORS = ['#D4A373', '#A1887F', '#F59E0B', '#2D5F8A']
const THREAD_COLORS: Record<string, string> = { geology: '#A1887F', climate: '#2D5F8A', human: '#5C7C3E' }


const MAPBOX_TK_D = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function DesertMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TK_D || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TK_D!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-5, 30], zoom: 6, attributionControl: false })
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

export function NotAllDesertIsSandContent() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeType, setActiveType] = useState(0)
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
        {/* Gradient band — sand to stone */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] flex">
          {TYPE_COLORS.map((c, i) => <div key={i} className="flex-1" style={{ background: c }} />)}
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
            {[...Array(8)].map((_, j) => (
              <line key={j} x1={0} y1={100 + j * 90} x2={1200} y2={100 + j * 90 + (j % 2 ? 20 : -20)} stroke={ACCENT} strokeWidth="0.3" />
            ))}
          </svg>
        </div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-28">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>Module 073 · Landscape Intelligence</p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Not All Desert<br />Is Sand
          </h1>
          <p className="text-[15px] md:text-[17px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.7)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Hammada, reg, erg, oued. Four Arabic words for four types of desert. Sand dunes are the minority landscape — rock, stone, and gravel cover 75% of the Sahara.
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

      {/* ═══ FOUR TYPES — Colour-coded expanding selector ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Four Types</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Four Deserts</h2>
          <div className="flex gap-2 mb-12">
            {DESERT_TYPES.map((d, i) => (
              <button key={i} onClick={() => setActiveType(i)}
                className="transition-all duration-500 text-left relative overflow-hidden"
                style={{ flex: activeType === i ? 3 : 1, padding: '20px', background: activeType === i ? '#0a0a0a' : '#fafafa', color: activeType === i ? '#fff' : '#999' }}>
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: TYPE_COLORS[i] }} />
                <span className="font-serif italic block" style={{ fontSize: activeType === i ? '24px' : '14px', transition: 'font-size 0.5s' }}>{d.name}</span>
                <span className="text-[10px] block mt-1 opacity-50">{d.type}</span>
              </button>
            ))}
          </div>
          <div data-sid="types" className={`transition-all duration-700 ${v('types') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <h3 className="font-serif italic text-[28px] md:text-[36px] text-[#0a0a0a]">{DESERT_TYPES[activeType].name}</h3>
                <p className="text-[14px] mt-1" dir="rtl" style={{ color: '#bbb' }}>{DESERT_TYPES[activeType].arabic}</p>
                <p className="text-[12px] text-[#999] mt-1 italic">{DESERT_TYPES[activeType].pronunciation}</p>
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: TYPE_COLORS[activeType] }}>Coverage</span>
                    <p className="text-[13px] text-[#525252]">{DESERT_TYPES[activeType].coverage}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: TYPE_COLORS[activeType] }}>In Morocco</span>
                    <p className="text-[13px] text-[#525252]">{DESERT_TYPES[activeType].morocco}</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5">
                <p className="text-[15px] text-[#525252] leading-[1.75]">{DESERT_TYPES[activeType].detail}</p>
              </div>
              <div className="md:col-span-3 flex flex-col justify-end">
                <div className="border-l-2 pl-6" style={{ borderColor: TYPE_COLORS[activeType] }}>
                  <p className="text-[14px] leading-relaxed" style={{ color: TYPE_COLORS[activeType] }}>{DESERT_TYPES[activeType].keyFact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MOROCCAN ERGS — Dark section ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Sand</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>Morocco&apos;s Ergs</h2>
          <div data-sid="ergs" className={`transition-all duration-700 ${v('ergs') ? 'opacity-100' : 'opacity-0'}`}>
            {MOROCCAN_ERGS.map((e, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10" style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                <div className="md:col-span-3">
                  <h3 className="font-serif italic text-[22px]" style={{ color: '#fff' }}>{e.name}</h3>
                  <p className="text-[12px] mt-1" style={{ color: ACCENT }}>{e.location}</p>
                </div>
                <div className="md:col-span-3">
                  <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Dimensions</span>
                  <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{e.dimensions}</p>
                  <span className="text-[10px] uppercase tracking-[0.1em] block mb-1 mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>Max Height</span>
                  <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{e.maxHeight}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.45)' }}>{e.character}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Access</span>
                  <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{e.access}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>Desert Types — Mapped</p>
        <DesertMap />
      </div></section>

{/* ═══ SAHARA IN NUMBERS ═══ */}
      <section style={{ background: ACCENT }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>Sahara in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {SAHARA_FACTS.map((f, i) => (
              <div key={i} className="py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>{f.metric}</span>
                <p className="font-serif italic text-[20px] md:text-[24px] leading-tight" style={{ color: '#fff' }}>{f.value}</p>
                <p className="text-[10px] mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>{f.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — Chronology</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">From Green Sahara<br />to Sand Sea</h2>
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
          <div data-sid="timeline" className={`relative pl-8 md:pl-12 transition-all duration-700 ${v('timeline') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px" style={{ background: '#ddd' }} />
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
      </section>

      {/* ═══ KEY NUMBERS + SOURCES + FOOTER ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
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
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: '#999' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            {BIBLIOGRAPHY.map((b, i) => (
              <div key={i}><span className="text-[12px] text-[#525252]">{b.source}</span><p className="text-[11px] text-[#999] leading-relaxed">{b.detail}</p></div>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <div style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-8 md:px-[8%]">
          <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Module 073 · Not All Desert Is Sand · © Slow Morocco</p>
        </div>
        <div style={{ backgroundColor: '#161616' }} className="py-3"><p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>slowmorocco.com</p></div>
        <div style={{ backgroundColor: '#0e0e0e' }} className="py-2" />
      </footer>
    </main>
  )
}
