'use client'

import { useState, useEffect, useRef } from 'react'
import { LINES, PASSENGER_DATA, MILESTONES, NETWORK_STATS, HERO_STATS, STRAIT, LINE_COLORS } from './data'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

type LineFilter = 'all' | 'high-speed' | 'conventional' | 'planned'

function RailMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [lineFilter, setLineFilter] = useState<LineFilter>('all')
  const [selected, setSelected] = useState<string | null>(null)

  const filters: { key: LineFilter; label: string; color: string }[] = [
    { key: 'all', label: 'All Lines', color: '#888' },
    { key: 'high-speed', label: 'High-Speed', color: LINE_COLORS['high-speed'] },
    { key: 'conventional', label: 'Conventional', color: LINE_COLORS['conventional'] },
    { key: 'planned', label: 'Planned / Under Construction', color: LINE_COLORS['planned'] },
  ]

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN!
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-5.5, 33.0],
        zoom: 5.2,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map

      map.on('load', () => {
        LINES.forEach((line) => {
          map.addSource(`line-${line.id}`, {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: { id: line.id, type: line.type },
              geometry: { type: 'LineString', coordinates: line.coords },
            },
          })
          const isDashed = line.type === 'planned'
          map.addLayer({
            id: `layer-${line.id}`,
            type: 'line',
            source: `line-${line.id}`,
            paint: {
              'line-color': line.color,
              'line-width': line.type === 'high-speed' ? 3 : 2,
              'line-opacity': 0.8,
              ...(isDashed ? { 'line-dasharray': [3, 2] } : {}),
            },
          })

          // Station dots
          line.coords.forEach((coord, ci) => {
            const el = document.createElement('div')
            el.style.cssText = `width:${line.type === 'high-speed' ? 10 : 8}px;height:${line.type === 'high-speed' ? 10 : 8}px;border-radius:50%;background:${line.color};border:2px solid rgba(255,255,255,0.7);cursor:pointer;`
            el.addEventListener('click', () => setSelected(line.id))
            new mapboxgl.Marker({ element: el }).setLngLat(coord).addTo(map)
          })
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  // Filter lines
  useEffect(() => {
    if (!mapRef.current) return
    const map = mapRef.current
    LINES.forEach(line => {
      const layerId = `layer-${line.id}`
      try {
        const show = lineFilter === 'all' || line.type === lineFilter || (lineFilter === 'planned' && (line.type === 'planned'))
        map.setLayoutProperty(layerId, 'visibility', show ? 'visible' : 'none')
      } catch { /* layer not ready */ }
    })
  }, [lineFilter])

  const selectedLine = LINES.find(l => l.id === selected)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map(f => (
          <button key={f.key} onClick={() => setLineFilter(f.key)}
            className="px-3 py-1.5 text-[10px] uppercase tracking-[0.06em] rounded-full border transition-all"
            style={{
              borderColor: lineFilter === f.key ? f.color : '#333',
              color: lineFilter === f.key ? f.color : '#666',
              background: lineFilter === f.key ? `${f.color}12` : 'transparent',
            }}
          >{f.label}</button>
        ))}
      </div>
      <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '520px', background: '#0a0a0a' }} />

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mt-4">
        <div className="flex items-center gap-2"><div className="w-6 h-[3px] rounded" style={{ background: '#A0452E' }} /><span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: '#aaa' }}>High-Speed (Operational)</span></div>
        <div className="flex items-center gap-2"><div className="w-6 h-[2px] rounded" style={{ background: '#2D5F8A' }} /><span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: '#aaa' }}>Conventional</span></div>
        <div className="flex items-center gap-2"><div className="w-6 h-[2px] rounded" style={{ background: '#7B506F', backgroundImage: 'repeating-linear-gradient(90deg, #7B506F 0 6px, transparent 6px 10px)' }} /><span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: '#aaa' }}>Under Construction</span></div>
        <div className="flex items-center gap-2"><div className="w-6 h-[2px] rounded" style={{ background: '#5C7C3E', backgroundImage: 'repeating-linear-gradient(90deg, #5C7C3E 0 6px, transparent 6px 10px)' }} /><span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: '#aaa' }}>Planned</span></div>
      </div>

      {selectedLine && (
        <div className="mt-4 p-6 rounded-sm" style={{ background: '#111', border: `1px solid ${selectedLine.color}30` }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ background: selectedLine.color }} />
            <span className="text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full" style={{ background: `${selectedLine.color}18`, color: selectedLine.color }}>{selectedLine.type.replace('-', ' ')}</span>
            <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: selectedLine.status === 'operational' ? '#5C7C3E' : selectedLine.status === 'under-construction' ? '#F59E0B' : '#78716C' }}>{selectedLine.status.replace('-', ' ')}</span>
          </div>
          <h3 className="font-serif text-[24px] italic mb-1" style={{ color: '#f5f5f5' }}>{selectedLine.name}</h3>
          <p className="text-[12px] mb-3" style={{ color: selectedLine.color }}>{selectedLine.route}</p>
          <div className="flex flex-wrap gap-6 mb-3">
            <div><span className="text-[10px] uppercase tracking-[0.06em] block" style={{ color: '#666' }}>Distance</span><span className="text-[14px]" style={{ color: '#ccc' }}>{selectedLine.distance}</span></div>
            <div><span className="text-[10px] uppercase tracking-[0.06em] block" style={{ color: '#666' }}>Top Speed</span><span className="text-[14px]" style={{ color: '#ccc' }}>{selectedLine.topSpeed}</span></div>
            <div><span className="text-[10px] uppercase tracking-[0.06em] block" style={{ color: '#666' }}>Travel Time</span><span className="text-[14px]" style={{ color: '#ccc' }}>{selectedLine.travelTime}</span></div>
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: '#aaa' }}>{selectedLine.detail}</p>
        </div>
      )}
    </div>
  )
}

export function TgvRailNetworkContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Rail track pattern */}
            {Array.from({ length: 2 }, (_, i) => (
              <g key={i}>
                <line x1="0" y1={390 + i * 20} x2="1200" y2={390 + i * 20} stroke="#A0452E" strokeWidth="0.5" />
                {Array.from({ length: 40 }, (_, j) => (
                  <line key={j} x1={j * 30} y1={388 + i * 20} x2={j * 30} y2={412 + i * 20} stroke="#A0452E" strokeWidth="0.3" />
                ))}
              </g>
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#A0452E', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 060 — Infrastructure Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The TGV &amp;<br />Rail Network
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Africa&rsquo;s only high-speed rail. 55 million passengers a year.
            A $9.5 billion investment plan that will connect 43 cities by 2040.
            And a feasibility study for a tunnel under the <span className="underline underline-offset-2">Strait of Gibraltar</span>.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#A0452E', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#A0452E' }}>001 — The Network</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>Six Lines, One Vision</h2>
          <RailMap />
        </div>
      </section>

      {/* ═══ LINE CARDS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Lines</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Every Line Explained</h2>

          <div className="space-y-0">
            {LINES.map((line, i) => {
              const isVisible = visibleSections.has(`line-${i}`)
              return (
                <div key={line.id} data-sid={`line-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: line.color }} />
                        <span className="text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full" style={{ background: `${line.color}10`, color: line.color }}>{line.type.replace('-', ' ')}</span>
                        <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: line.status === 'operational' ? '#5C7C3E' : line.status === 'under-construction' ? '#F59E0B' : '#999' }}>{line.status.replace('-', ' ')}</span>
                      </div>
                      <h3 className="font-serif text-[24px] italic text-dwl-black">{line.name}</h3>
                      <p className="text-[12px] mt-1" style={{ color: line.color }}>{line.route}</p>
                      <div className="flex flex-wrap gap-4 mt-3 text-[12px] text-dwl-muted">
                        <span>{line.distance}</span>
                        <span>{line.topSpeed}</span>
                        <span>{line.travelTime}</span>
                      </div>
                    </div>
                    <div className="md:col-span-8 flex items-center">
                      <p className="text-[14px] text-dwl-body leading-relaxed">{line.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#A0452E' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#ffffff' }}>
            Al Boraq. Named after the creature
            that carried the Prophet between worlds.
            Now it carries 5.6 million passengers a year
            between Tangier and Casablanca.
          </p>
        </div>
      </section>

      {/* ═══ PASSENGER DATA ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>003 — The Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>Passenger &amp; Freight Data</h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  {['Year', 'Total Passengers', 'Al Boraq', 'Revenue', 'Freight', 'Note'].map(h => (
                    <th key={h} className="text-left py-3 pr-4 text-[10px] uppercase tracking-[0.08em]" style={{ color: '#666' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PASSENGER_DATA.map((row, i) => {
                  const isVisible = visibleSections.has(`pax-${i}`)
                  return (
                    <tr key={row.year} data-sid={`pax-${i}`} className="transition-all duration-700" style={{ borderBottom: '1px solid #1a1a1a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                      <td className="py-3 pr-4 font-serif italic text-[16px]" style={{ color: '#A0452E' }}>{row.year}</td>
                      <td className="py-3 pr-4 text-[14px] font-medium" style={{ color: '#f5f5f5' }}>{row.totalPassengers}</td>
                      <td className="py-3 pr-4 text-[14px]" style={{ color: '#F59E0B' }}>{row.alBoraqPassengers}</td>
                      <td className="py-3 pr-4 text-[13px]" style={{ color: '#aaa' }}>{row.revenue}</td>
                      <td className="py-3 pr-4 text-[13px]" style={{ color: '#aaa' }}>{row.freight}</td>
                      <td className="py-3 text-[12px]" style={{ color: '#666' }}>{row.note}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ MILESTONES ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Milestones &amp; Strategy</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The 2040 Vision</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {MILESTONES.map((m, i) => {
              const isVisible = visibleSections.has(`mile-${i}`)
              return (
                <div key={m.label} data-sid={`mile-${i}`} className="bg-white p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <p className="font-serif italic text-[36px] leading-none" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-[13px] font-medium text-dwl-black mt-2">{m.label}</p>
                  <p className="text-[12px] text-dwl-muted mt-1">{m.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ STRAIT OF GIBRALTAR ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <div className="max-w-[680px]">
            <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#7B506F' }}>005 — The Dream</p>
            <h2 className="font-serif text-[28px] md:text-[40px] italic leading-[1.05] mb-6" style={{ color: '#ffffff' }}>{STRAIT.title}</h2>
            <p className="text-[16px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.5)' }}>{STRAIT.detail}</p>
          </div>
        </div>
      </section>

      {/* ═══ NETWORK STATS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">006 — Network At A Glance</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Infrastructure</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {NETWORK_STATS.map((s) => (
              <div key={s.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[32px] md:text-[44px] text-dwl-black leading-none">{s.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{s.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{s.note}</p>
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
              'Wikipedia — Al Boraq: 323 km service, Alstom Euroduplex, 357 km/h speed record, 2018 inauguration',
              'Wikipedia — High-Speed Rail in Morocco: 2040 Rail Strategy, 1,100 km HSR target, Marrakech extension, Gibraltar tunnel',
              'Wikipedia — ONCF: network structure, Taourirt–Nador branch, night trains, Supratours bus connections',
              'Wikipedia — Rail Transport in Morocco: conventional lines, N–S and E–W mainlines, freight operations',
              'Morocco World News (Jan 2025): 55M passengers 2024, 5.5M Al Boraq, $480M revenue, 57M target 2025',
              'Morocco World News (Dec 2024): Kenitra–Marrakech extension, 2h 45min target, $1B ONCF investment 2025–27',
              'Atalayar (April 2025): 56M passengers 2025, 5.6M Al Boraq, 2030 plan $9.5B, 43 cities, 87% population, 300K jobs',
              'Maghreb Magazine (Dec 2025): 5.6M Al Boraq 2025, 18B MAD investment, 58.5M target 2026',
              'Morocco World News (Nov 2024): 41M passengers in 9 months, MAD 87B ($8.5B) HSR expansion',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#A0452E' }}>Sources: ONCF, AfDB</p>
          </div>
        </div>
      </section>
    </div>
  )
}
