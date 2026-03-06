'use client'

import { useState, useEffect, useRef } from 'react'
import { ROUTES, TRANSIT_CITIES, POLICY_TIMELINE, HERO_STATS, KEY_NUMBERS, KEY_CONCEPTS, TYPE_COLORS, BIBLIOGRAPHY, MAP_POINTS, MAP_ROUTES } from './data'

const ACCENT = '#A0452E'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function MigrationMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-8, 30], zoom: 4.2, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        MAP_ROUTES.forEach((r, i) => {
          map.addSource(`route-${i}`, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: r.coords } } })
          map.addLayer({ id: `route-line-${i}`, type: 'line', source: `route-${i}`, paint: { 'line-color': r.color, 'line-width': 2.5, 'line-dasharray': [4, 3], 'line-opacity': 0.7 } })
        })
        MAP_POINTS.forEach(p => {
          const el = document.createElement('div')
          el.style.cssText = `width:12px;height:12px;border-radius:50%;background:#A0452E;border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 12, closeButton: false, maxWidth: '220px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:14px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])
  return <div ref={mapContainer} className="w-full" style={{ height: '520px', background: '#0a0a0a' }} />
}

export function MigrationRoutesContent() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeRoute, setActiveRoute] = useState(0)
  const [activeType, setActiveType] = useState<string | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const v = (id: string) => vis.has(id)
  const filteredTimeline = activeType ? POLICY_TIMELINE.filter(p => p.type === activeType) : POLICY_TIMELINE

  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.05]" preserveAspectRatio="xMidYMid slice">
            <line x1="200" y1="200" x2="900" y2="600" stroke={ACCENT} strokeWidth="0.4" strokeDasharray="4,8" />
            <line x1="100" y1="400" x2="800" y2="300" stroke="#2D5F8A" strokeWidth="0.4" strokeDasharray="4,8" />
            <line x1="400" y1="100" x2="700" y2="700" stroke="#F59E0B" strokeWidth="0.4" strokeDasharray="4,8" />
          </svg>
        </div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-28">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>Module 085 · Human Movement</p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Migration<br />Routes
          </h1>
          <p className="text-[15px] md:text-[17px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.7)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            13 kilometres separate Morocco from Spain at the Strait&apos;s narrowest point.
            Four routes. Six transit cities. The border politics of three continents.
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

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#A0452E' }}>The Routes — Mapped</p>
        <MigrationMap />
      </div></section>

      {/* ═══ FOUR ROUTES ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Routes</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Four Corridors</h2>
          <div className="flex gap-3 mb-12">
            {ROUTES.map((r, i) => (
              <button key={i} onClick={() => setActiveRoute(i)}
                className="transition-all duration-500 text-left"
                style={{ flex: activeRoute === i ? 3 : 1, padding: '20px', background: activeRoute === i ? '#0a0a0a' : '#fafafa', color: activeRoute === i ? '#fff' : '#999' }}>
                <span className="font-serif italic block" style={{ fontSize: activeRoute === i ? '22px' : '14px', transition: 'font-size 0.5s' }}>{r.name}</span>
              </button>
            ))}
          </div>
          <div data-sid="routes" className={`transition-all duration-700 ${v('routes') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <h3 className="font-serif italic text-[24px] md:text-[28px] text-[#0a0a0a]">{ROUTES[activeRoute].name}</h3>
                <div className="mt-6 space-y-4">
                  {[['Origin', ROUTES[activeRoute].origin], ['Entry', ROUTES[activeRoute].entry], ['Distance', ROUTES[activeRoute].distance], ['Status', ROUTES[activeRoute].status]].map(([l, t]) => (
                    <div key={l}>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: ACCENT }}>{l}</span>
                      <p className="text-[13px] text-[#525252]">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-5">
                <p className="text-[15px] text-[#525252] leading-[1.75] mb-6">{ROUTES[activeRoute].description}</p>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: '#999' }}>Path</span>
                  <p className="text-[13px] text-[#737373] leading-relaxed">{ROUTES[activeRoute].path}</p>
                </div>
              </div>
              <div className="md:col-span-3 flex flex-col justify-end">
                <div className="border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                  <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: '#999' }}>Dangers</span>
                  <p className="text-[14px] text-[#525252] leading-relaxed">{ROUTES[activeRoute].dangers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRANSIT CITIES — Staggered ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — Transit Cities</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>The Waiting Rooms</h2>
          <div data-sid="cities" className={`transition-all duration-700 ${v('cities') ? 'opacity-100' : 'opacity-0'}`}>
            {TRANSIT_CITIES.map((c, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10" style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                <div className={i % 2 === 0 ? 'md:col-span-3' : 'md:col-span-3 md:col-start-2'}>
                  <h3 className="font-serif italic text-[22px] md:text-[26px]" style={{ color: '#fff' }}>{c.name}</h3>
                  <p className="text-[12px] mt-1" style={{ color: ACCENT }}>{c.role}</p>
                </div>
                <div className="md:col-span-5">
                  <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.description}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.detail}</p>
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
            Bodies seldom recovered. Families never notified. The Mediterranean is not a border. It is a graveyard.
          </p>
        </div>
      </section>

      {/* ═══ KEY CONCEPTS — Sidebar + content ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — Framework</p>
              <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05]">Key<br />Concepts</h2>
            </div>
            <div className="md:col-span-8" data-sid="concepts">
              <div className={`transition-all duration-700 ${v('concepts') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                {KEY_CONCEPTS.map((c, i) => (
                  <div key={i} className="py-8" style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <div className="flex items-baseline gap-3 mb-3">
                      <h3 className="font-serif italic text-[18px] text-[#0a0a0a]">{c.term}</h3>
                      <span className="text-[13px]" dir="rtl" style={{ color: '#bbb' }}>{c.arabic}</span>
                    </div>
                    <p className="text-[14px] text-[#525252] leading-[1.75]">{c.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ POLICY TIMELINE ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — Chronology</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">Policy Timeline</h2>
          <div className="flex flex-wrap gap-2 mb-12">
            <button onClick={() => setActiveType(null)}
              className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all"
              style={{ background: !activeType ? '#0a0a0a' : 'transparent', color: !activeType ? '#fff' : '#999', border: `1px solid ${!activeType ? '#0a0a0a' : '#ddd'}` }}>All</button>
            {Object.entries(TYPE_COLORS).map(([t, c]) => (
              <button key={t} onClick={() => setActiveType(activeType === t ? null : t)}
                className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all"
                style={{ background: activeType === t ? '#0a0a0a' : 'transparent', color: activeType === t ? c : '#999', border: `1px solid ${activeType === t ? '#0a0a0a' : '#ddd'}` }}>{t}</button>
            ))}
          </div>
          <div data-sid="timeline" className={`relative pl-8 md:pl-12 transition-all duration-700 ${v('timeline') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px" style={{ background: '#ddd' }} />
            <div className="space-y-6">
              {filteredTimeline.map((p, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[23px] md:-left-[31px] top-[6px] w-[7px] h-[7px] rounded-full" style={{ background: TYPE_COLORS[p.type] || ACCENT }} />
                  <span className="text-[11px] block mb-1" style={{ color: TYPE_COLORS[p.type] || '#999' }}>{p.year}</span>
                  <p className="text-[14px] text-[#525252] leading-relaxed max-w-[640px]">{p.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS + SOURCES + FOOTER ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — By the Numbers</p>
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
              <div key={i}>
                <span className="text-[12px] text-[#525252]">{b.source}</span>
                <p className="text-[11px] text-[#999] leading-relaxed">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <div style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-8 md:px-[8%]">
          <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Module 085 · Migration Routes · © Slow Morocco</p>
        </div>
        <div style={{ backgroundColor: '#161616' }} className="py-3"><p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>slowmorocco.com</p></div>
        <div style={{ backgroundColor: '#0e0e0e' }} className="py-2" />
      </footer>
    </main>
  )
}
