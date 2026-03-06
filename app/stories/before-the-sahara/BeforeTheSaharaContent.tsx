'use client'

import { useState, useEffect, useRef } from 'react'
import { CLIMATE_ZONES, NDVI_TIMELINE, OASES, GREEN_PROJECTS, HERO_STATS, KEY_NUMBERS, DESERTIFICATION_DRIVERS } from './data'

let mapboxgl: typeof import('mapbox-gl') | null = null

export default function BeforeTheSaharaContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapLayer, setMapLayer] = useState<'zones' | 'oases'>('zones')
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // ── Mapbox init ──
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
        center: [-5.5, 31.5],
        zoom: 5.5,
        attributionControl: false,
        logoPosition: 'bottom-right',
      })
      map.addControl(new mb.default.NavigationControl({ showCompass: false }), 'bottom-right')
      map.on('load', () => setMapLoaded(true))
      mapRef.current = map
    })
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove() }
  }, [])

  // ── Markers ──
  useEffect(() => {
    if (!mapLoaded || !mapboxgl || !mapRef.current) return
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    if (mapLayer === 'zones') {
      CLIMATE_ZONES.forEach((zone) => {
        const el = document.createElement('div')
        const size = 50
        el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${zone.color}22;border:2px solid ${zone.color};cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:9px;color:${zone.color};font-family:'IBM Plex Mono',monospace;text-align:center;line-height:1.1;padding:4px;`
        el.textContent = zone.rainfall.split(',')[0]
        const marker = new mapboxgl!.default.Marker({ element: el })
          .setLngLat(zone.coords)
          .setPopup(new mapboxgl!.default.Popup({ offset: 30, maxWidth: '280px', closeButton: false }).setHTML(`
            <div style="font-family:'IBM Plex Mono',monospace">
              <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:17px;color:#f5f5f5">${zone.name}</div>
              <div style="font-size:11px;color:${zone.color};margin:4px 0">${zone.rainfall}</div>
              <div style="font-size:11px;color:#888">${zone.area}</div>
              <div style="font-size:11px;color:#aaa;margin-top:4px">${zone.vegetation}</div>
              <div style="font-size:10px;color:#A0452E;margin-top:4px;font-style:italic">${zone.threat}</div>
            </div>
          `))
          .addTo(mapRef.current)
        markersRef.current.push(marker)
      })
    } else {
      OASES.forEach((oasis) => {
        const el = document.createElement('div')
        el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${oasis.color};border:3px solid #0a0a0a;cursor:pointer;box-shadow:0 0 12px ${oasis.color}44;`
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
        const marker = new mapboxgl!.default.Marker({ element: el })
          .setLngLat(oasis.coords)
          .setPopup(new mapboxgl!.default.Popup({ offset: 12, maxWidth: '280px', closeButton: false }).setHTML(`
            <div style="font-family:'IBM Plex Mono',monospace">
              <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:17px;color:#f5f5f5">${oasis.name}</div>
              <div style="font-size:12px;color:#888;margin:2px 0">${oasis.nameAr}</div>
              <div style="font-size:11px;color:${oasis.color};margin:4px 0;text-transform:uppercase;letter-spacing:0.05em">${oasis.status}</div>
              <div style="font-size:11px;color:#aaa">${oasis.palmCount}</div>
              <div style="font-size:10px;color:#A0452E;margin-top:4px;font-style:italic">${oasis.threat}</div>
            </div>
          `))
          .addTo(mapRef.current)
        markersRef.current.push(marker)
      })
    }
  }, [mapLoaded, mapLayer])

  // ── Observers ──
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const maxNDVI = Math.max(...NDVI_TIMELINE.map(d => d.ndvi))

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Sand dune pattern */}
            {[0, 1, 2, 3, 4, 5].map(i => (
              <path key={i} d={`M-100 ${300 + i * 80} Q200 ${250 + i * 80} 400 ${300 + i * 80} T800 ${300 + i * 80} T1300 ${300 + i * 80}`} stroke="#F59E0B" strokeWidth="0.5" fill="none" opacity={0.6 - i * 0.08} />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#F59E0B', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 049 — Environmental Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Before<br />the Sahara
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            The land between Atlas and sand. Two-thirds of Morocco&rsquo;s oases
            have vanished in a century. 15 million <span className="underline underline-offset-2">date palms</span> reduced to 6 million.
            NDVI vegetation data, climate zones, oasis collapse, and the green
            projects trying to hold the line.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F59E0B', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex gap-2 px-6 md:px-10 pt-6">
            {(['zones', 'oases'] as const).map((layer) => (
              <button key={layer} onClick={() => setMapLayer(layer)} className="text-[10px] uppercase tracking-[0.08em] px-4 py-1.5 transition-all" style={{ background: mapLayer === layer ? '#F59E0B' : 'transparent', color: mapLayer === layer ? '#0a0a0a' : '#777', border: `1px solid ${mapLayer === layer ? '#F59E0B' : '#333'}` }}>
                {layer === 'zones' ? 'Climate Zones' : 'Threatened Oases'}
              </button>
            ))}
          </div>
          <div className="relative" style={{ height: '60vh', borderBottom: '1px solid #1a1a1a' }}>
            <div ref={mapContainer} className="absolute inset-0" />
            {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center"><p className="text-[13px]" style={{ color: 'rgba(0,0,0,0.3)' }}>Loading map...</p></div>}
          </div>
        </div>
      </section>

      {/* ═══ NDVI CHART ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — Vegetation Signal</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">NDVI: The Land Speaks in Green</h2>
          <p className="text-body text-dwl-body max-w-[620px] mb-12">The Normalized Difference Vegetation Index measures how green the land is from space. Higher values mean more living vegetation. Watch what happens to Morocco&rsquo;s pre-Saharan belt between 2018 and 2022 — and then the 2025 recovery.</p>

          <div className="space-y-1.5">
            {NDVI_TIMELINE.map((d, i) => {
              const isVisible = visibleSections.has(`ndvi-${i}`)
              const pct = (d.ndvi / maxNDVI) * 100
              const isDrought = d.year >= 2018 && d.year <= 2024
              const isRecovery = d.year >= 2025
              const barColor = isRecovery ? '#5C7C3E' : isDrought ? '#A0452E' : '#F59E0B'
              return (
                <div key={d.year} data-sid={`ndvi-${i}`} className="flex items-center gap-4 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-16px)' }}>
                  <span className="text-[12px] tabular-nums text-dwl-muted w-10 flex-shrink-0">{d.year}</span>
                  <div className="flex-1 h-7 relative" style={{ background: '#f5f5f5' }}>
                    <div className="h-full transition-all duration-1000" style={{ width: isVisible ? `${pct}%` : '0%', background: barColor, transitionDelay: `${i * 60}ms` }} />
                  </div>
                  <span className="text-[11px] tabular-nums w-9 flex-shrink-0 text-right" style={{ color: barColor }}>{d.ndvi.toFixed(2)}</span>
                  {d.note && <span className="text-[10px] text-dwl-muted hidden md:block flex-shrink-0 max-w-[250px]">{d.note}</span>}
                </div>
              )
            })}
          </div>
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2"><div className="w-3 h-3" style={{ background: '#F59E0B' }} /><span className="text-[10px] text-dwl-muted uppercase">Pre-drought</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3" style={{ background: '#A0452E' }} /><span className="text-[10px] text-dwl-muted uppercase">Drought (2018–2024)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3" style={{ background: '#5C7C3E' }} /><span className="text-[10px] text-dwl-muted uppercase">Recovery (2025)</span></div>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE 1 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[40vh]" style={{ background: '#A0452E' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', color: '#ffffff' }}>
            The oases of Morocco have lost two-thirds of their surface area
            in the past century. Date palms: from 15 million to 6 million.
            The desert doesn&rsquo;t advance — the green retreats.
          </p>
        </div>
      </section>

      {/* ═══ DESERTIFICATION DRIVERS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#A0452E' }}>002 — Why It&rsquo;s Happening</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>Six Drivers of Collapse</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {DESERTIFICATION_DRIVERS.map((d, i) => {
              const isVisible = visibleSections.has(`driver-${i}`)
              return (
                <div key={d.driver} data-sid={`driver-${i}`} className="p-8 transition-all duration-700" style={{ background: '#0f0f0f', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums" style={{ color: '#A0452E' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-[22px] italic mt-2 mb-3" style={{ color: '#f5f5f5' }}>{d.driver}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#aaa' }}>{d.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ OASIS CARDS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — The Oases</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Six Oases on the Edge</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">Oases cover 15% of Morocco and are home to 2.2 million people. They are the ecological barrier against the Sahara. When they fall, everything north of them is exposed.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {OASES.map((oasis, i) => {
              const isVisible = visibleSections.has(`oasis-${i}`)
              return (
                <div key={oasis.name} data-sid={`oasis-${i}`} className="bg-white p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: oasis.color }} />
                    <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: oasis.color }}>{oasis.status}</span>
                  </div>
                  <h3 className="font-serif text-[24px] italic text-dwl-black leading-[1]">{oasis.name}</h3>
                  <p className="text-[13px] text-dwl-muted mt-1">{oasis.nameAr}</p>
                  <p className="text-[12px] text-dwl-gray mt-3">{oasis.palmCount}</p>
                  <p className="text-[12px] italic mt-3" style={{ color: '#A0452E' }}>{oasis.threat}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ GREEN PROJECTS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>004 — Holding the Line</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>Six Green Projects</h2>

          <div className="space-y-0">
            {GREEN_PROJECTS.map((p, i) => {
              const isVisible = visibleSections.has(`green-${i}`)
              return (
                <div key={p.name} data-sid={`green-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #1a1a1a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                        <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: p.color }}>{p.status}</span>
                      </div>
                      <h3 className="font-serif text-[22px] italic" style={{ color: '#f5f5f5' }}>{p.name}</h3>
                      <p className="text-[11px] mt-1" style={{ color: '#666' }}>{p.scope}</p>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-[15px] leading-relaxed" style={{ color: '#ccc' }}>{p.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE 2 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#5C7C3E' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#ffffff' }}>
            The Great Green Wall was supposed to be 8,000 km of trees
            across Africa. It became something smarter — a mosaic of land
            use practices. Not a wall. A way of living with the edge.
          </p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — The Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Morocco&rsquo;s Land at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: '#e5e5e5' }}>
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
              'IPCC Special Report on Climate Change and Land — Chapter 3: Desertification',
              'MDPI Land (2025) — Estimating the Economic Cost of Land Degradation in Morocco',
              'Nature Scientific Reports (2023) — Detecting desertification in the ancient oases of southern Morocco',
              'Geographical (2025) — The lost oases of Morocco (Ministry of Agriculture data)',
              'UNCCD & Morocco PANLCD (National Action Plan to Combat Desertification, 2001–present)',
              'ANDZOA — Oasis Zone Development Agency (2022 data)',
              'NASA Earth Observatory (2024) — Sahara greening event, MODIS NDVI',
              'FAO Action Against Desertification — Great Green Wall implementation reports',
              'Springer Geoenvironmental Disasters (2019) — Drought and desertification in Draa Valley',
              'ScienceDirect (2022) — LULC monitoring, Ternata oasis 1991–2021',
              'UNFCCC (Morocco submission) — Loss and damage in oasis zones',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#F59E0B' }}>Sources: UNESCO, geological surveys</p>
          </div>
        </div>
      </section>
    </div>
  )
}
