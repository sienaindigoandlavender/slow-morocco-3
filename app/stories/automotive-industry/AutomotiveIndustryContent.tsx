'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { PLANTS, SUPPLIER_ZONES, PRODUCTION_TIMELINE, EXPORT_MARKETS, MILESTONES, EV_INVESTMENTS, HERO_STATS, KEY_FIGURES } from './data'

let mapboxgl: typeof import('mapbox-gl') | null = null

export default function AutomotiveIndustryContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState<typeof PLANTS[0] | null>(null)
  const [productionAnimated, setProductionAnimated] = useState(false)
  const [exportAnimated, setExportAnimated] = useState(false)
  const [visibleMilestones, setVisibleMilestones] = useState<Set<number>>(new Set())

  const maxVehicles = Math.max(...PRODUCTION_TIMELINE.map(p => p.vehicles))

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
        center: [-6.2, 34.2],
        zoom: 5.8,
        attributionControl: false,
        logoPosition: 'bottom-right',
      })

      map.addControl(new mb.default.NavigationControl({ showCompass: false }), 'bottom-right')
      map.on('load', () => setMapLoaded(true))
      mapRef.current = map
    })
    return () => {
      markersRef.current.forEach(m => m.remove())
      mapRef.current?.remove()
    }
  }, [])

  // Markers — plants + supplier zones
  useEffect(() => {
    if (!mapLoaded || !mapboxgl || !mapRef.current) return
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    // Assembly plants — large markers
    PLANTS.forEach((plant) => {
      const el = document.createElement('div')
      const isSelected = selectedPlant?.id === plant.id
      el.style.cssText = `
        width: ${isSelected ? 22 : 16}px; height: ${isSelected ? 22 : 16}px;
        background: ${plant.color}; border: 3px solid ${isSelected ? '#ffffff' : '#0a0a0a'};
        cursor: pointer; transition: all 0.3s;
        box-shadow: 0 0 ${isSelected ? 24 : 14}px ${plant.color}${isSelected ? 'cc' : '66'};
      `
      el.addEventListener('click', () => {
        setSelectedPlant(plant)
        mapRef.current?.flyTo({ center: plant.coords, zoom: 10, duration: 1200 })
      })

      const marker = new mapboxgl!.default.Marker({ element: el })
        .setLngLat(plant.coords)
        .setPopup(
          new mapboxgl!.default.Popup({ offset: 14, maxWidth: '260px', closeButton: false })
            .setHTML(`
              <div style="font-family:'IBM Plex Mono',monospace">
                <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:18px;color:#f5f5f5">${plant.name}</div>
                <div style="font-size:11px;color:${plant.color};margin:4px 0">${plant.operator}</div>
                <div style="font-size:11px;color:#888">${plant.capacity}</div>
              </div>
            `)
        )
        .addTo(mapRef.current)
      markersRef.current.push(marker)
    })

    // Supplier zones — smaller markers
    SUPPLIER_ZONES.forEach((zone) => {
      const el = document.createElement('div')
      el.style.cssText = `
        width: 8px; height: 8px; border-radius: 50%;
        background: #72EFDD; border: 2px solid #0a0a0a;
        cursor: pointer; opacity: 0.7;
      `
      const marker = new mapboxgl!.default.Marker({ element: el })
        .setLngLat(zone.coords)
        .setPopup(
          new mapboxgl!.default.Popup({ offset: 8, maxWidth: '220px', closeButton: false })
            .setHTML(`
              <div style="font-family:'IBM Plex Mono',monospace">
                <div style="font-size:13px;color:#f5f5f5;font-weight:600">${zone.name}</div>
                <div style="font-size:11px;color:#72EFDD;margin:3px 0">${zone.jobs} jobs</div>
                <div style="font-size:10px;color:#888">${zone.companies.join(' · ')}</div>
              </div>
            `)
        )
        .addTo(mapRef.current)
      markersRef.current.push(marker)
    })

    // Tanger Med port
    const portEl = document.createElement('div')
    portEl.style.cssText = 'width:10px;height:10px;background:#E63946;border:2px solid #0a0a0a;cursor:pointer;'
    const portMarker = new mapboxgl!.default.Marker({ element: portEl })
      .setLngLat([-5.798, 35.892])
      .setPopup(
        new mapboxgl!.default.Popup({ offset: 8, maxWidth: '220px', closeButton: false })
          .setHTML(`
            <div style="font-family:'IBM Plex Mono',monospace">
              <div style="font-size:13px;color:#f5f5f5;font-weight:600"><span>Tanger Med</span> Port</div>
              <div style="font-size:11px;color:#E63946;margin:3px 0">600,872 vehicles (2024)</div>
              <div style="font-size:10px;color:#888">76% of Renault exports to Europe</div>
            </div>
          `)
      )
      .addTo(mapRef.current)
    markersRef.current.push(portMarker)
  }, [mapLoaded, selectedPlant])

  // Intersection observers
  useEffect(() => {
    const prodObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setProductionAnimated(true)
    }, { threshold: 0.2 })
    const el1 = document.getElementById('production-chart')
    if (el1) prodObs.observe(el1)

    const expObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setExportAnimated(true)
    }, { threshold: 0.2 })
    const el2 = document.getElementById('export-chart')
    if (el2) expObs.observe(el2)

    const milObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute('data-mil-idx'))
          setVisibleMilestones(prev => new Set(prev).add(idx))
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-mil-idx]').forEach(el => milObs.observe(el))

    return () => { prodObs.disconnect(); expObs.disconnect(); milObs.disconnect() }
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
            {/* Abstract production line / assembly grid */}
            {Array.from({ length: 20 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="1200" y2={i * 40} stroke="#C8A415" strokeWidth="0.3" />
            ))}
            {Array.from({ length: 30 }, (_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="800" stroke="#2D5F8A" strokeWidth="0.3" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#C8A415', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 042 — Industrial Intelligence
          </p>

          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Morocco&rsquo;s Automotive<br />Revolution
          </h1>

          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            From a single state-owned plant in 1959 to Africa&rsquo;s #1 car producer.
            Renault Tangier, Stellantis Kenitra, 270+ suppliers, $17 billion in exports,
            and the EU&rsquo;s largest automotive exporter by value — 14 km from Spain.
          </p>

          {/* Hero stats */}
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#C8A415', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Operator legend */}
          <div className="flex gap-8 mt-10 opacity-0" style={{ animation: 'fadeUp 1s ease 1.1s forwards' }}>
            <div className="flex items-center gap-2"><div className="w-3 h-3" style={{ background: '#C8A415' }} /><span className="text-[11px] uppercase tracking-[0.06em]" style={{ color: 'rgba(255,255,255,0.6)' }}>Renault Group</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3" style={{ background: '#2D5F8A' }} /><span className="text-[11px] uppercase tracking-[0.06em]" style={{ color: 'rgba(255,255,255,0.6)' }}>Stellantis</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: '#72EFDD' }} /><span className="text-[11px] uppercase tracking-[0.06em]" style={{ color: 'rgba(255,255,255,0.6)' }}>Supplier Zones</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3" style={{ background: '#E63946' }} /><span className="text-[11px] uppercase tracking-[0.06em]" style={{ color: 'rgba(255,255,255,0.6)' }}>Tanger Med Port</span></div>
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="relative" style={{ height: '65vh', borderBottom: '1px solid #1a1a1a' }}>
            <div ref={mapContainer} className="absolute inset-0" />
            {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center"><p className="text-[13px]" style={{ color: 'rgba(0,0,0,0.3)' }}>Loading map...</p></div>}

            {/* Quick-fly buttons */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              {[
                { label: 'Full View', center: [-6.2, 34.2] as [number, number], zoom: 5.8 },
                { label: 'Tangier', center: [-5.745, 35.720] as [number, number], zoom: 10 },
                { label: 'Kenitra', center: [-6.578, 34.261] as [number, number], zoom: 10 },
                { label: 'Casablanca', center: [-7.589, 33.573] as [number, number], zoom: 10 },
                { label: 'Tanger Med', center: [-5.798, 35.892] as [number, number], zoom: 12 },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => { mapRef.current?.flyTo({ center: btn.center, zoom: btn.zoom, duration: 1000 }); setSelectedPlant(null) }}
                  className="text-[10px] uppercase tracking-[0.06em] px-2.5 py-1 transition-all hover:opacity-80"
                  style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid #333', color: '#aaa', backdropFilter: 'blur(8px)' }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Selected plant overlay */}
            {selectedPlant && (
              <div className="absolute bottom-4 left-4 z-10 p-5 max-w-[300px]" style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(16px)', border: `1px solid ${selectedPlant.color}33` }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3" style={{ background: selectedPlant.color }} />
                  <span className="text-[11px] uppercase tracking-[0.08em]" style={{ color: selectedPlant.color }}>{selectedPlant.operator}</span>
                </div>
                <p className="font-serif text-[22px] italic" style={{ color: '#f5f5f5' }}>{selectedPlant.name}</p>
                <p className="text-[12px] mt-2" style={{ color: '#999' }}>{selectedPlant.city} · Opened {selectedPlant.opened} · {selectedPlant.hectares} ha</p>
                <p className="text-[13px] mt-2 font-semibold" style={{ color: '#f5f5f5' }}>{selectedPlant.capacity}</p>
                <p className="text-[11px] mt-2" style={{ color: '#777' }}>{selectedPlant.employees} employees</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selectedPlant.models.map(m => (
                    <span key={m} className="text-[9px] uppercase tracking-[0.06em] px-2 py-0.5" style={{ border: '1px solid #333', color: '#aaa' }}>{m}</span>
                  ))}
                </div>
                <p className="text-[11px] mt-3 italic" style={{ color: selectedPlant.color }}>{selectedPlant.note}</p>
                <button onClick={() => { setSelectedPlant(null); mapRef.current?.flyTo({ center: [-6.2, 34.2], zoom: 5.8, duration: 1000 }) }} className="text-[10px] uppercase tracking-[0.08em] mt-3" style={{ color: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>← Reset</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTION SURGE CHART ═══ */}
      <section className="bg-white" id="production-chart">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — Production Surge</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">
            From 45,000 to 1,000,000
          </h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">
            Vehicle production growth 2010–2025. The vertical leap starts with Renault Tangier (2012)
            and accelerates with Stellantis Kenitra (2019).
          </p>

          <div className="space-y-3">
            {PRODUCTION_TIMELINE.map((d, i) => {
              const pct = (d.vehicles / maxVehicles) * 100
              return (
                <div key={d.year} className="grid items-center gap-4" style={{ gridTemplateColumns: '50px 1fr 80px 1fr' }}>
                  <span className="font-serif italic text-[16px] text-dwl-black text-right">{d.year}</span>
                  <div className="h-7 relative overflow-hidden" style={{ background: '#fafafa' }}>
                    <div
                      className="absolute top-0 left-0 h-full transition-all"
                      style={{
                        width: productionAnimated ? `${pct}%` : '0%',
                        background: d.year >= 2023 ? 'linear-gradient(90deg, #C8A415, #E63946)' : '#0a0a0a',
                        transitionDuration: '1500ms',
                        transitionTimingFunction: 'ease-out',
                        transitionDelay: `${i * 80}ms`,
                      }}
                    />
                  </div>
                  <span className="text-[13px] text-dwl-black font-medium tabular-nums">{(d.vehicles / 1000).toFixed(0)}K</span>
                  <span className="text-[11px] text-dwl-muted">{d.note || ''}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ KEY FIGURES GRID ═══ */}
      <section style={{ borderTop: '1px solid #e5e5e5' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — By the Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">
            The Industry Today
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: '#e5e5e5' }}>
            {KEY_FIGURES.map((fig) => (
              <div key={fig.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[32px] md:text-[44px] text-dwl-black leading-none">{fig.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{fig.label}</p>
                <p className="text-[10px] text-dwl-muted mt-1">{fig.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPORT MARKETS ═══ */}
      <section className="bg-white" style={{ borderTop: '1px solid #e5e5e5' }} id="export-chart">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — Where the Cars Go</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">
            Export Markets
          </h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">
            ~80% of production is exported, primarily to the EU. Spain and France dominate —
            14 km across the Strait and 1-day trucking to major European hubs.
          </p>

          <div className="space-y-3 max-w-[700px]">
            {EXPORT_MARKETS.map((m, i) => (
              <div key={m.country} className="grid items-center gap-4" style={{ gridTemplateColumns: '120px 1fr 50px' }}>
                <span className="text-[14px] text-dwl-black font-medium">{m.country}</span>
                <div className="h-8 relative overflow-hidden" style={{ background: '#fafafa' }}>
                  <div
                    className="absolute top-0 left-0 h-full transition-all"
                    style={{
                      width: exportAnimated ? `${m.share}%` : '0%',
                      background: i === 0 ? '#C8A415' : i === 1 ? '#2D5F8A' : '#0a0a0a',
                      transitionDuration: '1200ms',
                      transitionTimingFunction: 'ease-out',
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
                <span className="text-[14px] text-dwl-black font-medium tabular-nums text-right">{m.share}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIG QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[40vh]" style={{ background: '#C8A415' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', color: '#0a0a0a' }}>
            Europe&rsquo;s best-selling car — the Dacia Sandero — is made in Tangier. Not Romania. Not France. Morocco.
          </p>
        </div>
      </section>

      {/* ═══ MILESTONES ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Timeline</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">
            1959 — 2025
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute top-0 bottom-0 w-[1px]" style={{ left: '80px', background: '#e5e5e5' }} />

            {MILESTONES.map((m, i) => {
              const isVisible = visibleMilestones.has(i)
              return (
                <div
                  key={i}
                  data-mil-idx={i}
                  className="md:grid md:grid-cols-[60px_40px_1fr] md:items-start py-5 transition-all duration-700"
                  style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)' }}
                >
                  <div className="md:text-right md:pr-2">
                    <span className="font-serif italic text-[20px] text-dwl-black">{m.year}</span>
                  </div>
                  <div className="hidden md:flex justify-center pt-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: m.year >= 2023 ? '#E63946' : '#0a0a0a', border: '2px solid #fff' }} />
                  </div>
                  <div className="md:pl-4">
                    <p className="text-[14px] font-semibold text-dwl-black">{m.title}</p>
                    <p className="text-[13px] text-dwl-gray leading-relaxed mt-1 max-w-[500px]">{m.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ EV & FUTURE INVESTMENTS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#72EFDD' }}>005 — The Electric Pivot</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>
            EV & Battery Investments
          </h2>
          <p className="text-[16px] max-w-[560px] leading-relaxed mb-12" style={{ color: 'rgba(0,0,0,0.4)' }}>
            Morocco is positioning as a critical EV supply chain node — lithium batteries,
            hydrogen prototypes, and the first electric vehicles produced on African soil.
          </p>

          <div className="space-y-0">
            {EV_INVESTMENTS.map((inv, i) => (
              <div key={inv.company} className="py-5 grid grid-cols-1 md:grid-cols-[200px_80px_160px_1fr] gap-4 items-baseline" style={{ borderTop: '1px solid #1a1a1a' }}>
                <p className="font-serif italic text-[20px]" style={{ color: '#f5f5f5' }}>{inv.company}</p>
                <span className="text-[11px] uppercase tracking-[0.06em]" style={{ color: '#72EFDD' }}>{inv.origin}</span>
                <span className="text-[16px] font-semibold tabular-nums" style={{ color: inv.amount !== '—' ? '#C8A415' : '#555' }}>{inv.amount}</span>
                <p className="text-[13px]" style={{ color: '#999' }}>{inv.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ASSEMBLY PLANT CARDS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">006 — The Three Plants</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">
            Assembly Operations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {PLANTS.map((plant) => (
              <div key={plant.id} className="bg-white p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3" style={{ background: plant.color }} />
                  <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: plant.color }}>{plant.operator}</span>
                </div>
                <h3 className="font-serif italic text-[24px] text-dwl-black">{plant.name}</h3>
                <p className="text-[12px] text-dwl-muted mt-1">{plant.city} · Est. {plant.opened}</p>

                <div className="mt-4 space-y-3">
                  <div><p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-0.5">Capacity</p><p className="text-[13px] text-dwl-black font-medium">{plant.capacity}</p></div>
                  <div><p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-0.5">Employees</p><p className="text-[13px] text-dwl-black">{plant.employees}</p></div>
                  <div><p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-0.5">Site</p><p className="text-[13px] text-dwl-black">{plant.hectares} hectares</p></div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {plant.models.map(m => (
                    <span key={m} className="text-[10px] uppercase tracking-[0.04em] px-2 py-0.5 border border-dwl-border text-dwl-muted">{m}</span>
                  ))}
                </div>

                <p className="text-[12px] text-dwl-gray mt-4 leading-relaxed italic">{plant.note}</p>
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
              'AMDIE — Moroccan Agency for Investment and Export Development',
              'Tanger Med Port Authority — Annual vehicle throughput reports',
              'Ministry of Industry and Trade — Industrial Acceleration Plan data',
              'Renault Group — Annual reports and Morocco production data (2024)',
              'Stellantis — Kenitra expansion announcement (July 2025)',
              'Automotive Logistics — Morocco export analysis (2024)',
              'World Bank — Morocco trade and export data',
              'AIVAM — Association des Importateurs de Véhicules Au Maroc',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>

          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#C8A415' }}>Sources: AMICA, Ministry of Industry Morocco</p>
          </div>
        </div>
      </section>
    </div>
  )
}
