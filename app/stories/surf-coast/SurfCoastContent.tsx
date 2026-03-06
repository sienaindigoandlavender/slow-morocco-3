'use client'

import { useState, useEffect, useRef } from 'react'
import { SPOTS, ZONES, SEASONS, HERO_STATS, ECONOMY, SPOT_LEVELS, type SurfSpot } from './data'

let mapboxgl: typeof import('mapbox-gl') | null = null

const LEVEL_COLORS: Record<string, string> = { beginner: '#5C7C3E', intermediate: '#2D5F8A', advanced: '#C8A415', expert: '#A0452E' }

export function SurfCoastContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedSpot, setSelectedSpot] = useState<SurfSpot | null>(null)
  const [levelFilter, setLevelFilter] = useState<string | null>(null)
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
        center: [-9.65, 31.0],
        zoom: 7,
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

    const filtered = levelFilter ? SPOTS.filter(s => s.level === levelFilter) : SPOTS

    filtered.forEach((spot) => {
      const isSelected = selectedSpot?.id === spot.id
      const c = LEVEL_COLORS[spot.level]
      const size = isSelected ? 20 : 13
      const el = document.createElement('div')
      el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${c};border:3px solid ${isSelected ? '#fff' : '#0a0a0a'};cursor:pointer;transition:all 0.3s;box-shadow:0 0 ${isSelected ? 20 : 10}px ${c}${isSelected ? 'bb' : '44'};`
      el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
      el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
      el.addEventListener('click', () => {
        setSelectedSpot(spot)
        mapRef.current?.flyTo({ center: spot.coords, zoom: 13, duration: 1200 })
        const detailEl = document.getElementById(`spot-${spot.id}`)
        if (detailEl) setTimeout(() => detailEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 600)
      })

      const marker = new mapboxgl!.default.Marker({ element: el })
        .setLngLat(spot.coords)
        .setPopup(new mapboxgl!.default.Popup({ offset: 12, maxWidth: '260px', closeButton: false }).setHTML(`
          <div style="font-family:'IBM Plex Mono',monospace">
            <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:17px;color:#f5f5f5">${spot.name}</div>
            <div style="font-size:11px;color:${c};margin:3px 0;text-transform:uppercase;letter-spacing:0.08em">${spot.level} · ${spot.type}</div>
            <div style="font-size:11px;color:#888">${spot.direction === 'both' ? 'Left + Right' : spot.direction.charAt(0).toUpperCase() + spot.direction.slice(1)} · Max ${spot.maxRide}</div>
          </div>
        `))
        .addTo(mapRef.current)
      markersRef.current.push(marker)
    })
  }, [mapLoaded, selectedSpot, levelFilter])

  // ── Observers ──
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Wave pattern */}
            {[0, 1, 2, 3, 4].map(i => (
              <path key={i} d={`M0 ${350 + i * 50} Q300 ${300 + i * 50} 600 ${350 + i * 50} T1200 ${350 + i * 50}`} stroke="#2D5F8A" strokeWidth="0.5" fill="none" opacity={0.5 - i * 0.08} />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#2D5F8A', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 047 — Coastal Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Morocco&rsquo;s<br />Surf Coast
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Anchor Point, Killer Point, The Bay at Imsouane, Sidi Kaouki, Safi.
            Fifteen breaks mapped from Safi to <span className="underline underline-offset-2">Essaouira</span> — swell direction, tide windows,
            ride length, and the economics of a 50,000-guest-per-year surf boom.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#2D5F8A', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Level legend */}
          <div className="flex flex-wrap gap-6 mt-10 opacity-0" style={{ animation: 'fadeUp 1s ease 1.1s forwards' }}>
            {Object.entries(SPOT_LEVELS).map(([level, data]) => (
              <div key={level} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: data.color }} />
                <span className="text-[11px] uppercase tracking-[0.06em]" style={{ color: 'rgba(0,0,0,0.4)' }}>{level} ({data.count})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-[1400px] mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 px-6 md:px-10 pt-6">
            <button onClick={() => { setLevelFilter(null); setSelectedSpot(null); mapRef.current?.flyTo({ center: [-9.65, 31.0], zoom: 7, duration: 1000 }) }} className="text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 transition-all" style={{ background: !levelFilter ? '#fff' : 'transparent', color: !levelFilter ? '#0a0a0a' : '#777', border: `1px solid ${!levelFilter ? '#fff' : '#333'}` }}>
              All ({SPOTS.length})
            </button>
            {Object.entries(SPOT_LEVELS).map(([level, data]) => (
              <button key={level} onClick={() => { setLevelFilter(level); setSelectedSpot(null) }} className="text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 transition-all" style={{ background: levelFilter === level ? data.color : 'transparent', color: levelFilter === level ? (level === 'advanced' ? '#0a0a0a' : '#fff') : '#777', border: `1px solid ${levelFilter === level ? data.color : '#333'}` }}>
                {level} ({data.count})
              </button>
            ))}
            {/* Zone quick-fly */}
            {ZONES.map(z => (
              <button key={z.id} onClick={() => { mapRef.current?.flyTo({ center: z.coords, zoom: z.id === 'safi' ? 10 : 12, duration: 1000 }); setSelectedSpot(null); setLevelFilter(null) }} className="text-[10px] uppercase tracking-[0.08em] px-2.5 py-1.5 transition-all hover:opacity-80" style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid #333', color: '#aaa' }}>
                {z.name}
              </button>
            ))}
          </div>

          <div className="relative" style={{ height: '65vh', borderBottom: '1px solid #1a1a1a' }}>
            <div ref={mapContainer} className="absolute inset-0" />
            {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center"><p className="text-[13px]" style={{ color: 'rgba(0,0,0,0.3)' }}>Loading map...</p></div>}

            {/* Selected spot overlay */}
            {selectedSpot && (
              <div className="absolute bottom-4 left-4 z-10 p-5 max-w-[320px]" style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(16px)', border: `1px solid ${LEVEL_COLORS[selectedSpot.level]}33` }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: LEVEL_COLORS[selectedSpot.level] }} />
                  <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: LEVEL_COLORS[selectedSpot.level] }}>{selectedSpot.level} · {selectedSpot.type}</span>
                </div>
                <p className="font-serif text-[22px] italic" style={{ color: '#f5f5f5' }}>{selectedSpot.name}</p>
                {selectedSpot.localName && <p className="text-[11px] mt-1" style={{ color: '#666' }}>{selectedSpot.localName}</p>}
                <p className="text-[12px] mt-1" style={{ color: '#888' }}>{selectedSpot.zone} · {selectedSpot.direction === 'both' ? 'Left + Right' : selectedSpot.direction.charAt(0).toUpperCase() + selectedSpot.direction.slice(1)} · Max {selectedSpot.maxRide}</p>
                <div className="mt-3 space-y-1.5">
                  <p className="text-[10px]" style={{ color: '#555' }}>SWELL <span style={{ color: '#aaa' }}>{selectedSpot.bestSwell}</span></p>
                  <p className="text-[10px]" style={{ color: '#555' }}>TIDE <span style={{ color: '#aaa' }}>{selectedSpot.bestTide}</span></p>
                  <p className="text-[10px]" style={{ color: '#555' }}>WIND <span style={{ color: '#aaa' }}>{selectedSpot.bestWind}</span></p>
                </div>
                <p className="text-[11px] mt-3 italic leading-relaxed" style={{ color: '#999' }}>{selectedSpot.note}</p>
                <button onClick={() => { setSelectedSpot(null); mapRef.current?.flyTo({ center: [-9.65, 31.0], zoom: 7, duration: 1000 }) }} className="text-[10px] uppercase tracking-[0.08em] mt-3 block" style={{ color: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>← All spots</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ SPOT CARDS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Breaks</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">15 Breaks, Safi to Essaouira</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">Each spot: type, direction, best swell, tide, wind, maximum ride, and the local knowledge that forecast apps can&rsquo;t give you.</p>

          <div className="space-y-0">
            {SPOTS.map((spot, i) => {
              const isVisible = visibleSections.has(spot.id)
              const c = LEVEL_COLORS[spot.level]
              return (
                <div key={spot.id} id={`spot-${spot.id}`} data-sid={spot.id} className="py-8 md:py-10 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)' }}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    <div className="lg:col-span-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full" style={{ background: c }} />
                        <span className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: c }}>{spot.level}</span>
                      </div>
                      <h3 className="font-serif text-[28px] md:text-[34px] italic text-dwl-black leading-[1]">{spot.name}</h3>
                      {spot.localName && <p className="text-[12px] text-dwl-muted mt-1">{spot.localName}</p>}
                      <p className="text-[12px] text-dwl-gray mt-1">{spot.zone} · {spot.type} · {spot.direction === 'both' ? 'Left + Right' : spot.direction.charAt(0).toUpperCase() + spot.direction.slice(1)}</p>
                      <p className="font-serif italic text-[20px] mt-3" style={{ color: c }}>Max {spot.maxRide}</p>
                    </div>
                    <div className="lg:col-span-8">
                      <p className="text-[15px] text-dwl-body leading-relaxed mb-5">{spot.note}</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div><p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-1">Best Swell</p><p className="text-[12px] text-dwl-body">{spot.bestSwell}</p></div>
                        <div><p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-1">Best Tide</p><p className="text-[12px] text-dwl-body">{spot.bestTide}</p></div>
                        <div><p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-1">Best Wind</p><p className="text-[12px] text-dwl-body">{spot.bestWind}</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SEASON GUIDE ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D5F8A' }}>002 — When to Go</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>Season Guide</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
            {SEASONS.map((s) => (
              <div key={s.months} className="p-6" style={{ background: '#0f0f0f' }}>
                <div className="flex items-center gap-2 mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: i < s.rating ? s.color : '#333' }} />
                  ))}
                </div>
                <p className="font-serif italic text-[24px]" style={{ color: '#f5f5f5' }}>{s.months}</p>
                <p className="text-[11px] uppercase tracking-[0.08em] mt-1 mb-4" style={{ color: s.color }}>{s.label}</p>
                <div className="space-y-3">
                  <div><p className="text-[9px] uppercase tracking-[0.1em]" style={{ color: '#555' }}>Swell</p><p className="text-[12px]" style={{ color: '#ccc' }}>{s.swell}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.1em]" style={{ color: '#555' }}>Water</p><p className="text-[12px]" style={{ color: '#ccc' }}>{s.waterTemp}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.1em]" style={{ color: '#555' }}>Air</p><p className="text-[12px]" style={{ color: '#ccc' }}>{s.airTemp}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.1em]" style={{ color: '#555' }}>Wetsuit</p><p className="text-[12px]" style={{ color: '#ccc' }}>{s.wetsuit}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.1em]" style={{ color: '#555' }}>Wind</p><p className="text-[12px]" style={{ color: '#ccc' }}>{s.wind}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.1em]" style={{ color: '#555' }}>Crowd</p><p className="text-[12px]" style={{ color: '#ccc' }}>{s.crowd}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[40vh]" style={{ background: '#2D5F8A' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', color: '#ffffff' }}>
            In the 1970s, Taghazout was a handful of hippies and a fishing village.
            Today it has 78 surf schools, 50,000 guests a year, and Anchor Point
            is still breaking exactly the same way it did before anyone arrived.
          </p>
        </div>
      </section>

      {/* ═══ SURF ECONOMY ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — The Surf Economy</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Numbers Behind the Breaks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: '#e5e5e5' }}>
            {ECONOMY.map((e) => (
              <div key={e.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[32px] md:text-[44px] text-dwl-black leading-none">{e.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{e.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{e.note}</p>
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
              'Surfline — Morocco Travel Zone and Anchor Point forecast data',
              'Stormrider Surf Guides — Taghazout region (19 breaks)',
              'Surf-Forecast.com — Anchor Point swell statistics and seasonal data',
              'Taghazout Surf Expo — 2024 edition data (40,000 attendees, 80+ exhibitors)',
              'TelQuel — "Is Taghazout riding the right wave?" (Nov 2024)',
              'Wavelength Surf Magazine — Morocco Surf Tourism Leader (Oct 2024)',
              'Royal Moroccan Surfing Federation (FRMSB)',
              'Wikipedia — Surfing in Morocco; Azur Plan',
              'World Metrics — Global Surfing Industry Statistics (2026)',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#2D5F8A' }}>Sources: WSL, Magicseaweed, field research</p>
          </div>
        </div>
      </section>
    </div>
  )
}
