'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { REGIONS, HISTORY, PRODUCTION, HERO_STATS, type PotteryRegion } from './data'

let mapboxgl: typeof import('mapbox-gl') | null = null

export function PotteryTraditionsContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<PotteryRegion | null>(null)
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
        center: [-6.0, 32.5],
        zoom: 5.2,
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

  // Markers
  useEffect(() => {
    if (!mapLoaded || !mapboxgl || !mapRef.current) return

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    REGIONS.forEach((region) => {
      const el = document.createElement('div')
      const isSelected = selectedRegion?.id === region.id
      const size = isSelected ? 20 : 14
      el.style.cssText = `
        width: ${size}px; height: ${size}px; border-radius: 50%;
        background: ${region.color}; border: 3px solid ${isSelected ? '#ffffff' : '#0a0a0a'};
        cursor: pointer; transition: all 0.3s ease;
        box-shadow: 0 0 ${isSelected ? 24 : 12}px ${region.color}${isSelected ? 'cc' : '66'};
      `

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.5)'
        el.style.boxShadow = `0 0 20px ${region.color}aa`
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)'
        el.style.boxShadow = `0 0 12px ${region.color}66`
      })
      el.addEventListener('click', () => {
        setSelectedRegion(region)
        mapRef.current?.flyTo({ center: region.coords, zoom: 9, duration: 1200 })
        // Scroll to detail
        const detailEl = document.getElementById(`region-${region.id}`)
        if (detailEl) setTimeout(() => detailEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 600)
      })

      const marker = new mapboxgl!.default.Marker({ element: el })
        .setLngLat(region.coords)
        .setPopup(
          new mapboxgl!.default.Popup({ offset: 12, maxWidth: '240px', closeButton: false })
            .setHTML(`
              <div style="font-family:'IBM Plex Mono',monospace">
                <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:18px;color:#f5f5f5">${region.name}</div>
                <div style="font-size:12px;color:#555;margin-bottom:6px">${region.nameAr}</div>
                <div style="font-size:12px;color:${region.color};font-weight:600">${region.signature}</div>
              </div>
            `)
        )
        .addTo(mapRef.current)

      markersRef.current.push(marker)
    })
  }, [mapLoaded, selectedRegion])

  const resetMap = useCallback(() => {
    setSelectedRegion(null)
    mapRef.current?.flyTo({ center: [-6.0, 32.5], zoom: 5.2, duration: 1000 })
  }, [])

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id')
            if (id) setVisibleSections(prev => new Set(prev).add(id))
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('[data-section-id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        {/* Background — clay texture circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Potter's wheel circles */}
            {[300, 600, 900].map((cx, i) => (
              <g key={i}>
                {[40, 80, 120, 160].map((r, j) => (
                  <circle key={j} cx={cx} cy={400 + i * 30} r={r} stroke={REGIONS[i % REGIONS.length].color} strokeWidth="0.5" fill="none" opacity={0.5 - j * 0.1} />
                ))}
              </g>
            ))}
            {/* Color dots for each tradition */}
            {REGIONS.map((r, i) => (
              <circle key={r.id} cx={100 + i * 180} cy={700} r="6" fill={r.color} opacity="0.5" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#DC2626', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 051 — Craft Intelligence
          </p>

          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Pottery<br />Traditions
          </h1>

          <p className="text-[16px] md:text-[18px] max-w-[560px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.45)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Six regional ceramic traditions mapped. Fes blue, Safi polychrome, <span className="underline underline-offset-2">Tamegroute green</span>,
            Rif Berber, Sal&eacute; contemporary, Meknes <span className="underline underline-offset-2">zellige</span> — each one a different clay, a different glaze,
            a different history.
          </p>

          {/* Color legend strip */}
          <div className="flex flex-wrap gap-6 mt-10 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {REGIONS.map((r) => (
              <div key={r.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                <span className="text-[11px] tracking-[0.06em] uppercase" style={{ color: 'rgba(0,0,0,0.4)' }}>{r.name}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 1.1s forwards' }}>
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#DC2626', lineHeight: 1 }}>{stat.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="relative" style={{ height: '65vh', borderBottom: '1px solid #1a1a1a' }}>
            <div ref={mapContainer} className="absolute inset-0" />

            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[13px]" style={{ color: 'rgba(0,0,0,0.3)' }}>Loading map...</p>
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-10 p-4" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', border: '1px solid #262626' }}>
              <p className="text-[10px] tracking-[0.12em] uppercase mb-2" style={{ color: '#555' }}>Pottery Centres</p>
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRegion(r)
                    mapRef.current?.flyTo({ center: r.coords, zoom: 9, duration: 1200 })
                  }}
                  className="flex items-center gap-2 mb-1 w-full text-left hover:opacity-80 transition-opacity"
                >
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
                  <span className="text-[11px]" style={{ color: selectedRegion?.id === r.id ? '#ffffff' : '#999' }}>{r.name} — {r.signature}</span>
                </button>
              ))}
              {selectedRegion && (
                <button onClick={resetMap} className="mt-2 text-[10px] tracking-[0.08em] uppercase" style={{ color: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                  Reset View
                </button>
              )}
            </div>

            {/* Selected overlay */}
            {selectedRegion && (
              <div className="absolute top-4 right-4 z-10 p-5 max-w-[280px]" style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(16px)', border: `1px solid ${selectedRegion.color}33` }}>
                <div className="w-4 h-4 rounded-full mb-3" style={{ background: selectedRegion.color, boxShadow: `0 0 12px ${selectedRegion.color}66` }} />
                <p className="font-serif text-[24px] italic" style={{ color: '#f5f5f5' }}>{selectedRegion.name}</p>
                <p className="text-[12px] mt-1 font-semibold" style={{ color: selectedRegion.color }}>{selectedRegion.signature}</p>
                <p className="text-[12px] mt-3 leading-relaxed" style={{ color: '#aaa' }}>{selectedRegion.clay}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ REGIONAL DEEP DIVES ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — Regional Traditions</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">
            Six Traditions, Six Vocabularies
          </h2>
          <p className="text-body text-dwl-body max-w-[600px] mb-16">
            Every region uses different clay, different glaze, different firing.
            You can identify the origin of a Moroccan pot the way a sommelier identifies a vineyard.
          </p>

          <div className="space-y-0">
            {REGIONS.map((region, i) => {
              const isVisible = visibleSections.has(region.id)
              return (
                <div
                  key={region.id}
                  id={`region-${region.id}`}
                  data-section-id={region.id}
                  className="py-10 md:py-14 transition-all duration-700"
                  style={{
                    borderTop: '1px solid #e5e5e5',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left column */}
                    <div className="lg:col-span-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: region.color }} />
                        <span className="text-[11px] text-dwl-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-serif text-[32px] md:text-[40px] italic text-dwl-black leading-[1]">
                        {region.name}
                      </h3>
                      <p className="text-[14px] mt-1" style={{ color: region.color }}>{region.nameAr} — {region.signature}</p>

                      <div className="mt-6 space-y-4">
                        <div>
                          <p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-1">Clay</p>
                          <p className="text-[13px] text-dwl-body leading-relaxed">{region.clay}</p>
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-1">Glaze</p>
                          <p className="text-[13px] text-dwl-body leading-relaxed">{region.glaze}</p>
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-1">Period</p>
                          <p className="text-[13px] text-dwl-body leading-relaxed">{region.period}</p>
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-1">Artisans</p>
                          <p className="text-[13px] text-dwl-body leading-relaxed">{region.artisans}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="lg:col-span-8">
                      <p className="text-[16px] text-dwl-body leading-relaxed mb-6">
                        {region.description}
                      </p>

                      <div className="p-5 mb-6" style={{ background: '#fafafa', borderLeft: `3px solid ${region.color}` }}>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-2">Technique</p>
                        <p className="text-[14px] text-dwl-body leading-relaxed">{region.technique}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {region.products.map((product) => (
                          <span key={product} className="text-[11px] uppercase tracking-[0.06em] text-dwl-muted border border-dwl-border px-3 py-1">
                            {product}
                          </span>
                        ))}
                      </div>

                      <p className="text-[13px] italic leading-relaxed" style={{ color: region.color }}>
                        {region.distinction}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[45vh]" style={{ background: '#1E3A5F' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: '#ffffff' }}>
            Turn any piece of Moroccan pottery over. If it says F&egrave;s on the base, someone in that city signed it with pride. If it says nothing, it was made by a woman in the mountains who never needed a signature.
          </p>
        </div>
      </section>

      {/* ═══ HISTORICAL TIMELINE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — Timeline</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">
            6,000 Years of Clay and Fire
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute top-0 bottom-0 w-[1px]" style={{ left: '120px', background: '#e5e5e5' }} />

            {HISTORY.map((era, i) => {
              const id = `era-${i}`
              const isVisible = visibleSections.has(id)
              return (
                <div
                  key={i}
                  data-section-id={id}
                  className="md:grid md:grid-cols-[100px_40px_1fr] md:items-start py-5 transition-all duration-700"
                  style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)' }}
                >
                  <div className="md:text-right md:pr-4">
                    <span className="font-serif italic text-[18px] md:text-[22px] text-dwl-black leading-none">{era.period}</span>
                  </div>
                  <div className="hidden md:flex justify-center pt-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-dwl-black" style={{ border: '2px solid #ffffff' }} />
                  </div>
                  <div className="md:pl-4">
                    <p className="text-[14px] font-semibold text-dwl-black">{era.title}</p>
                    <p className="text-[13px] text-dwl-gray leading-relaxed mt-1 max-w-[500px]">{era.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTION DATA ═══ */}
      <section className="bg-white" style={{ borderTop: '1px solid #e5e5e5' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — By the Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">
            The Industry Today
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {PRODUCTION.map((stat) => (
              <div key={stat.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[32px] md:text-[40px] text-dwl-black leading-none">{stat.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{stat.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{stat.note}</p>
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
              'UNESCO Intangible Cultural Heritage — Zellige nomination documentation',
              'Moroccan Ministry of Artisans and Social and Solidarity Economy',
              'World Crafts Council — Africa Region documentation',
              'Hedgecoe, John & Damluji, Salma — Zillij: The Art of Moroccan Ceramics',
              'Fez Pottery Cooperative (Ain Nokbi) — field documentation',
              'Tamegroute Nassiriyya Zawiya archives',
              'Safi Quartier des Potiers — artisan interviews and production data',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>

          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#DC2626' }}>Sources: Ethnographic field research</p>
          </div>
        </div>
      </section>
    </div>
  )
}
