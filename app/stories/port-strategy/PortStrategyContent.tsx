'use client'

import { useState, useEffect, useRef } from 'react'
import { PORTS, TANGER_MED_GROWTH, TRADE_ROUTES, HERO_STATS, KEY_NUMBERS } from './data'

export function PortStrategyContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return
    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      // @ts-ignore
      await import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-6.5, 30],
        zoom: 4.6,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        PORTS.forEach(p => {
          const size = p.id === 'tanger-med' ? 20 : p.status === 'Under construction' ? 14 : p.status === 'Planned' ? 10 : 12
          const el = document.createElement('div')
          el.style.cssText = `width:${size}px;height:${size}px;background:${p.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;${p.status !== 'Operational' ? 'opacity:0.7;' : ''}`
          const popup = new mapboxgl.Popup({ offset: 14, maxWidth: '300px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:14px;font-weight:700;color:#f5f5f5;">${p.name}</div>
                <div style="font-size:11px;color:${p.color};margin-top:2px;">${p.status} · ${p.coast}</div>
                <div style="font-size:11px;color:#aaa;margin-top:2px;">${p.containerCapacity}</div>
                <div style="font-size:11px;color:#888;margin-top:4px;">${p.detail.slice(0, 180)}…</div>
              </div>
            `)
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([p.lng, p.lat])
            .setPopup(popup)
            .addTo(map)
          markersRef.current.push(marker)
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Container grid */}
            {Array.from({ length: 8 }, (_, r) =>
              Array.from({ length: 12 }, (_, c) => (
                <rect key={`${r}-${c}`} x={100 + c * 85} y={200 + r * 50} width={75} height={40} rx="2" fill="none" stroke="#2D5F8A" strokeWidth="0.3" />
              ))
            )}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#2D5F8A', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 064 — Trade &amp; Infrastructure Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Morocco&rsquo;s<br />Port Strategy
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            In 2004, Morocco ranked 78th in global maritime connectivity.
            By 2024, it ranked 17th. One port — Tanger Med — changed everything.
            Now two more deepwater ports are under construction. This is how
            a country builds itself into a continental gateway.
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

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D5F8A' }}>001 — The Port Network</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Seven Ports, Two Coasts</h2>
          <p className="text-[14px] mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>Click markers for details. Larger circles = higher capacity.</p>

          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { color: '#F59E0B', label: 'Operational' },
              { color: '#A0452E', label: 'Under construction' },
              { color: '#2D5F8A', label: 'Planned' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                <span className="text-[11px]" style={{ color: '#aaa' }}>{l.label}</span>
              </div>
            ))}
          </div>

          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '500px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ PORT CARDS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — Every Port</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Network</h2>

          <div className="space-y-0">
            {PORTS.map((p, i) => {
              const isVisible = visibleSections.has(`port-${i}`)
              return (
                <div key={p.id} data-sid={`port-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                        <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: p.color }}>{p.status}</span>
                        <span className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted">{p.coast}</span>
                      </div>
                      <h3 className="font-serif text-[28px] italic text-dwl-black leading-tight">{p.name}</h3>
                      <p className="text-[12px] text-dwl-muted mt-1">Capacity: {p.containerCapacity}</p>
                      <p className="text-[12px] text-dwl-muted">Depth: {p.depth}</p>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-[14px] text-dwl-body leading-relaxed">{p.detail}</p>
                    </div>
                    <div className="md:col-span-4">
                      <div className="space-y-1">
                        {p.keyStats.map((s, j) => (
                          <p key={j} className="text-[12px] text-dwl-muted flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: p.color }} />
                            {s}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#2D5F8A' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#ffffff' }}>
            Tanger Med is now a magnet for automotive exports,
            industrial logistics, and energy materials — surpassing
            not only regional peers but major European ports.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(0,0,0,0.6)' }}>— SeaVantage MENA Port Report (2025)</p>
        </div>
      </section>

      {/* ═══ TANGER MED GROWTH ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>003 — The Growth Curve</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Tanger Med: 245% in a Decade</h2>
          <p className="text-[14px] max-w-[560px] leading-relaxed mb-8" style={{ color: 'rgba(0,0,0,0.4)' }}>From under 3 million TEUs to over 11 million. The Red Sea crisis, Tanger Med 2, and automotive exports drove the acceleration.</p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[550px]">
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  {['Year', 'TEUs', 'Growth', 'Context'].map(h => (
                    <th key={h} className="text-left py-3 pr-4 text-[10px] uppercase tracking-[0.08em]" style={{ color: '#666' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TANGER_MED_GROWTH.map((r) => (
                  <tr key={r.year} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td className="py-3 pr-4 font-mono text-[14px] font-bold" style={{ color: '#F59E0B' }}>{r.year}</td>
                    <td className="py-3 pr-4 font-mono text-[13px]" style={{ color: '#f5f5f5' }}>{r.teu}</td>
                    <td className="py-3 pr-4 text-[13px]" style={{ color: r.growth === '—' ? '#555' : '#5C7C3E' }}>{r.growth}</td>
                    <td className="py-3 text-[12px]" style={{ color: '#888' }}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ TRADE ROUTES ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Trade Corridors</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Where the Cargo Goes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {TRADE_ROUTES.map((r, i) => {
              const isVisible = visibleSections.has(`route-${i}`)
              return (
                <div key={r.route} data-sid={`route-${i}`} className="bg-white p-6 md:p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <h3 className="font-serif text-[16px] italic text-dwl-black mb-2">{r.route}</h3>
                  <p className="text-[13px] text-dwl-body leading-relaxed">{r.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#F59E0B' }}>
            This port should not be reserved only for
            Nador. All regions must benefit from it.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Nizar Baraka, Minister of Equipment &amp; Water, on Nador West Med</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {KEY_NUMBERS.map((n) => (
              <div key={n.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[32px] md:text-[44px] text-dwl-black leading-none">{n.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{n.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{n.note}</p>
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
              'Tanger Med Port Authority: 11.1M TEUs 2025 (+8.4%), 10.2M 2024, 4 terminals, 9M capacity, 180 ports/70 countries',
              'Maroc.ma (official): 2025 figures, TC4 extension, 535,203 TIR trucks, 3.2M passengers, 1,319 mega-ships',
              'Lloyd\'s List / Alphaliner: 17th globally, Top 20 ranking, global throughput 743.6M TEUs 2024',
              'Morocco World News: Tanger Med CPPI, Nador West Med late 2026, Dakhla 2028, Minister Baraka parliamentary statements',
              'Wikipedia — Nador West Med: 3M TEU initial, Bay of Betoya, construction began 2016, AfDB financing',
              'AGBI: $4.2B Nador cost, 5.5M container capacity, first LNG terminal, CEO Benjelloun statements',
              'Financial Ports: CMA CGM 3M containers/year contract, €300M European financing, green hydrogen quays',
              'Kuehne+Nagel: Dakhla 23m depth, 1,600 ha industrial, 5,200 ha farmland, desalinated water irrigation',
              'SeaVantage MENA Port Report: 142M tonnes, vehicle exports, automotive logistics, surpassing European ports',
              'ALG Global: North Africa 42% of Africa TEU volume, Tanger Med as Europe–West Africa link',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#2D5F8A' }}>Sources: ANP Morocco, Tanger Med Authority</p>
          </div>
        </div>
      </section>
    </div>
  )
}
