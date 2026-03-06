'use client'

import { useState, useEffect, useRef } from 'react'
import { DAM_FILL_HISTORY, BASINS, DESAL_PROJECTS, HERO_STATS, KEY_NUMBERS, RAINFALL_RECOVERY } from './data'

let mapboxgl: typeof import('mapbox-gl') | null = null

export function WaterCrisisContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapLayer, setMapLayer] = useState<'basins' | 'desal'>('basins')
  const [fillAnimated, setFillAnimated] = useState(false)
  const [basinAnimated, setBasinAnimated] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // ─────────────────────────────────────────────────
  // MAPBOX
  // ─────────────────────────────────────────────────
  useEffect(() => {
    import('mapbox-gl').then((mb) => {
      mapboxgl = mb
      if (!mapContainer.current || mapRef.current) return
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      if (!token) return
      mb.default.accessToken = token
      const map = new mb.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-6.5, 32.0],
        zoom: 5.3,
        attributionControl: false,
        logoPosition: 'bottom-right',
      })
      map.addControl(new mb.default.NavigationControl({ showCompass: false }), 'bottom-right')
      map.on('load', () => setMapLoaded(true))
      mapRef.current = map
    })
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove() }
  }, [])

  // Markers based on layer
  useEffect(() => {
    if (!mapLoaded || !mapboxgl || !mapRef.current) return
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    if (mapLayer === 'basins') {
      BASINS.forEach((b) => {
        const el = document.createElement('div')
        const size = Math.max(14, Math.min(28, b.fillRate / 4))
        el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${b.color};border:3px solid #0a0a0a;cursor:pointer;box-shadow:0 0 12px ${b.color}55;transition:all 0.3s;`
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
        const marker = new mapboxgl!.default.Marker({ element: el })
          .setLngLat(b.coords)
          .setPopup(new mapboxgl!.default.Popup({ offset: 14, maxWidth: '280px', closeButton: false }).setHTML(`
            <div style="font-family:'IBM Plex Mono',monospace">
              <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:18px;color:#f5f5f5">${b.name}</div>
              <div style="font-size:11px;color:#888;margin:2px 0">${b.nameAr}${b.keyDam ? ' · ' + b.keyDam : ''}</div>
              <div style="font-size:24px;font-weight:700;color:${b.color};margin:6px 0">${b.fillRate}%</div>
              <div style="font-size:11px;color:#666">Feb 2025: ${b.fillRateLastYear}% → Feb 2026: ${b.fillRate}%</div>
              <div style="font-size:11px;color:#888;margin-top:4px">${b.storedMcm.toLocaleString()} million m³ stored</div>
            </div>
          `))
          .addTo(mapRef.current)
        markersRef.current.push(marker)
      })
    } else {
      DESAL_PROJECTS.forEach((d) => {
        const el = document.createElement('div')
        el.style.cssText = 'width:12px;height:12px;background:#72EFDD;border:2px solid #0a0a0a;cursor:pointer;box-shadow:0 0 10px #72EFDD55;'
        const marker = new mapboxgl!.default.Marker({ element: el })
          .setLngLat(d.coords)
          .setPopup(new mapboxgl!.default.Popup({ offset: 10, maxWidth: '280px', closeButton: false }).setHTML(`
            <div style="font-family:'IBM Plex Mono',monospace">
              <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:16px;color:#f5f5f5">${d.name}</div>
              <div style="font-size:11px;color:#72EFDD;margin:3px 0">${d.capacity}</div>
              <div style="font-size:10px;color:#888">${d.operator}</div>
              <div style="font-size:10px;color:#aaa;margin-top:4px">${d.status}</div>
            </div>
          `))
          .addTo(mapRef.current)
        markersRef.current.push(marker)
      })
    }
  }, [mapLoaded, mapLayer])

  // Observers
  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFillAnimated(true) }, { threshold: 0.2 })
    const el1 = document.getElementById('fill-chart')
    if (el1) obs1.observe(el1)
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setBasinAnimated(true) }, { threshold: 0.15 })
    const el2 = document.getElementById('basin-bars')
    if (el2) obs2.observe(el2)
    const obs3 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.15 })
    document.querySelectorAll('[data-sid]').forEach(el => obs3.observe(el))
    return () => { obs1.disconnect(); obs2.disconnect(); obs3.disconnect() }
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Water drop / ripple pattern */}
            {[400, 600, 800].map((cx, i) => (
              <g key={i}>{[30, 60, 90, 120, 150, 180].map((r, j) => (
                <circle key={j} cx={cx} cy={400} r={r} stroke="#2D5F8A" strokeWidth="0.4" fill="none" opacity={0.4 - j * 0.06} />
              ))}</g>
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#2D5F8A', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 006 — Environmental Data
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Morocco&rsquo;s Water<br />Crisis
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Seven years of drought drained the dams to 28%. Then the rains of winter 2025–2026
            refilled them to 70.7% in twelve months — a +155% recovery. But the structural crisis
            isn&rsquo;t over. Water per capita has fallen from 2,560 m³ to ~500 m³ since the 1960s.
          </p>
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#2D5F8A', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DAM FILL RATE CHART ═══ */}
      <section className="bg-white" id="fill-chart">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Decline & Recovery</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Dam Fill Rate 2015–2026</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">
            National average dam fill rate. The descent from 72% to 28% took seven years.
            The recovery from 28% to 70.7% took twelve months.
          </p>
          <div className="space-y-2">
            {DAM_FILL_HISTORY.map((d, i) => {
              const isRecovery = d.year >= 2025
              const isDrought = d.year >= 2018 && d.year <= 2024
              return (
                <div key={d.year} className="grid items-center gap-4" style={{ gridTemplateColumns: '50px 1fr 55px 1fr' }}>
                  <span className="font-serif italic text-[15px] text-dwl-black text-right">{d.year}</span>
                  <div className="h-8 relative overflow-hidden" style={{ background: '#fafafa' }}>
                    <div
                      className="absolute top-0 left-0 h-full transition-all"
                      style={{
                        width: fillAnimated ? `${d.fillRate}%` : '0%',
                        background: isRecovery ? 'linear-gradient(90deg, #2D5F8A, #72EFDD)' : isDrought ? '#A0452E' : '#0a0a0a',
                        transitionDuration: '1500ms',
                        transitionTimingFunction: 'ease-out',
                        transitionDelay: `${i * 80}ms`,
                      }}
                    />
                  </div>
                  <span className="text-[14px] text-dwl-black font-semibold tabular-nums">{d.fillRate}%</span>
                  <span className="text-[11px] text-dwl-muted">{d.note || ''}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ RAINFALL RECOVERY ═══ */}
      <section style={{ background: '#2D5F8A' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.5)' }}>002 — The Rains of Winter 2025–2026</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>
            &ldquo;These rains remind us of the winters of the 1960s and 1970s.&rdquo;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.15)' }}>
            {RAINFALL_RECOVERY.map((r) => (
              <div key={r.label} className="p-6" style={{ background: 'rgba(29,78,216,0.95)' }}>
                <p className="font-serif italic text-[32px]" style={{ color: '#ffffff', lineHeight: 1 }}>{r.value}</p>
                <p className="text-[12px] font-medium mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>{r.label}</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(0,0,0,0.4)' }}>{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP — BASINS / DESALINATION ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-[1400px] mx-auto">
          {/* Toggle */}
          <div className="flex gap-2 px-6 md:px-10 pt-6">
            {(['basins', 'desal'] as const).map((layer) => (
              <button
                key={layer}
                onClick={() => setMapLayer(layer)}
                className="text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 transition-all"
                style={{
                  background: mapLayer === layer ? (layer === 'basins' ? '#2D5F8A' : '#72EFDD') : 'transparent',
                  color: mapLayer === layer ? (layer === 'basins' ? '#fff' : '#0a0a0a') : '#777',
                  border: `1px solid ${mapLayer === layer ? 'transparent' : '#333'}`,
                }}
              >
                {layer === 'basins' ? 'Water Basins (Feb 2026)' : 'Desalination Projects'}
              </button>
            ))}
          </div>

          <div className="relative" style={{ height: '65vh', borderBottom: '1px solid #1a1a1a' }}>
            <div ref={mapContainer} className="absolute inset-0" />
            {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center"><p className="text-[13px]" style={{ color: 'rgba(0,0,0,0.3)' }}>Loading map...</p></div>}

            {/* Legend */}
            {mapLayer === 'basins' && (
              <div className="absolute bottom-4 left-4 z-10 p-4" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', border: '1px solid #262626' }}>
                <p className="text-[10px] tracking-[0.12em] uppercase mb-2" style={{ color: '#555' }}>Basin Fill Rate Feb 2026</p>
                <div className="flex items-center gap-2 mb-1"><div className="w-2.5 h-2.5 rounded-full" style={{ background: '#1A5276' }} /><span className="text-[10px]" style={{ color: '#aaa' }}>North: 90%+</span></div>
                <div className="flex items-center gap-2 mb-1"><div className="w-2.5 h-2.5 rounded-full" style={{ background: '#60A5FA' }} /><span className="text-[10px]" style={{ color: '#aaa' }}>Central: 55–93%</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: '#C17F28' }} /><span className="text-[10px]" style={{ color: '#aaa' }}>South: 22–28% — still stressed</span></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ BASIN BARS ═══ */}
      <section className="bg-white" id="basin-bars">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — Basin by Basin</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">
            The North Overflows. The South Still Waits.
          </h2>
          <p className="text-body text-dwl-body max-w-[580px] mb-12">
            Northern basins exceed 90%. The Souss-Massa hangs at 55%. The deep south —
            Guir-Ziz-Rheris and Draa-Oued Noun — remains structurally drought-exposed.
          </p>
          <div className="space-y-3">
            {BASINS.map((b, i) => (
              <div key={b.id} className="grid items-center gap-4" style={{ gridTemplateColumns: '140px 1fr 55px 80px' }}>
                <div>
                  <span className="text-[13px] text-dwl-black font-medium">{b.name}</span>
                  <span className="text-[10px] text-dwl-muted ml-2">{b.nameAr}</span>
                </div>
                <div className="h-8 relative overflow-hidden" style={{ background: '#fafafa' }}>
                  <div
                    className="absolute top-0 left-0 h-full transition-all"
                    style={{
                      width: basinAnimated ? `${b.fillRate}%` : '0%',
                      background: b.color,
                      transitionDuration: '1500ms',
                      transitionTimingFunction: 'ease-out',
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
                <span className="text-[14px] font-semibold tabular-nums" style={{ color: b.color }}>{b.fillRate}%</span>
                <span className="text-[10px] text-dwl-muted">was {b.fillRateLastYear}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STRUCTURAL CRISIS QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[40vh]" style={{ background: '#A0452E' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', color: '#ffffff' }}>
            The drought is over. The water crisis isn&rsquo;t. Morocco&rsquo;s per-capita water has dropped
            from 2,560 m³ in the 1960s to ~500 m³ today — and is projected to hit 480 m³ by 2030.
          </p>
        </div>
      </section>

      {/* ═══ DESALINATION STRATEGY ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#72EFDD' }}>004 — The Desalination Bet</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>
            Half of Drinking Water by 2030
          </h2>
          <p className="text-[16px] max-w-[560px] leading-relaxed mb-12" style={{ color: 'rgba(0,0,0,0.4)' }}>
            17 plants operating. 4 under construction. 9 more planned. The Casablanca mega-plant
            will be the world&rsquo;s largest powered entirely by renewable energy.
          </p>

          <div className="space-y-0">
            {DESAL_PROJECTS.map((d) => (
              <div key={d.name} className="py-5 grid grid-cols-1 md:grid-cols-[220px_160px_1fr] gap-4 items-start" style={{ borderTop: '1px solid #1a1a1a' }}>
                <div>
                  <p className="font-serif italic text-[20px]" style={{ color: '#f5f5f5' }}>{d.name}</p>
                  <p className="text-[11px] mt-1" style={{ color: '#666' }}>{d.location}</p>
                </div>
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: '#72EFDD' }}>{d.capacity}</p>
                  <p className="text-[10px] mt-1" style={{ color: '#888' }}>{d.status}</p>
                </div>
                <div>
                  <p className="text-[12px]" style={{ color: '#999' }}>{d.note}</p>
                  <p className="text-[10px] mt-1" style={{ color: '#555' }}>{d.operator}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white" style={{ borderTop: '1px solid #e5e5e5' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — By the Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Structural Picture</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {KEY_NUMBERS.map((fig) => (
              <div key={fig.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[32px] md:text-[40px] text-dwl-black leading-none">{fig.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{fig.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{fig.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {[
              'Ministry of Equipment and Water — Dam fill rates and basin data (Feb 2026)',
              'Maroc.ma — Minister Nizar Baraka statement, Jan 12, 2026',
              'Morocco World News — Dam recovery 155% report, Feb 19, 2026',
              'Atalayar — Torrential rains analysis, Feb 17–18, 2026',
              'Yabiladi — Dec 2025 rainfall analysis, "winters of the 1960s"',
              'AGBI — "Morocco\'s drought is over — but the water crisis isn\'t", Feb 2026',
              'Frontiers in Sustainable Food Systems — Morocco water resources assessment (2025)',
              'ACCIONA — Casablanca SWRO desalination plant project data',
              'Fanack Water — Desalination expansion analysis, July 2025',
              'U.S. Dept of Commerce — Morocco Water Country Guide',
              'World Resources Institute — Water stress rankings',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#2D5F8A' }}>Sources: World Bank, FAO AQUASTAT</p>
          </div>
        </div>
      </section>
    </div>
  )
}
