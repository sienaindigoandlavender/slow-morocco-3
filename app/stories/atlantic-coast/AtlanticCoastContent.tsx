'use client'

import { useState, useEffect, useRef } from 'react'
import { CITIES, STATS, THEMES, HERO_STATS } from './data'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

function CoastMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [tagFilter, setTagFilter] = useState<string>('all')

  const allTags = ['all', 'port', 'fishing', 'wind', 'surf', 'trade', 'culture', 'industry', 'craft', 'heritage']

  const filteredCities = tagFilter === 'all' ? CITIES : CITIES.filter(c => c.tags.includes(tagFilter))

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN!
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-10, 29],
        zoom: 4.2,
        pitch: 0,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map

      map.on('load', () => {
        // Coastline hint
        map.addSource('coast-line', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: CITIES.map(c => c.coords),
            },
          },
        })
        map.addLayer({
          id: 'coast-line-layer',
          type: 'line',
          source: 'coast-line',
          paint: { 'line-color': '#2D5F8A', 'line-width': 1.5, 'line-opacity': 0.25, 'line-dasharray': [3, 2] },
        })

        CITIES.forEach((c) => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${c.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;`
          el.dataset.cityId = c.id
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.3)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => {
            setSelected(c.id)
            map.flyTo({ center: c.coords, zoom: 7, duration: 1200 })
          })
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat(c.coords)
            .setPopup(
              new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '260px' })
                .setHTML(`<div style="font-family:var(--font-mono);padding:4px 0"><p style="font-size:10px;letter-spacing:0.05em;text-transform:uppercase;color:${c.color};margin:0 0 2px">${c.km} km from Tangier</p><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${c.name}</p><p style="font-size:11px;color:#aaa;margin:0">${c.character}</p></div>`)
            )
            .addTo(map)
          markersRef.current.push(marker)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  // Show/hide markers based on filter
  useEffect(() => {
    markersRef.current.forEach(marker => {
      const el = marker.getElement()
      const cityId = el.dataset.cityId
      const city = CITIES.find(c => c.id === cityId)
      if (city) {
        const show = tagFilter === 'all' || city.tags.includes(tagFilter)
        el.style.opacity = show ? '1' : '0.15'
        el.style.pointerEvents = show ? 'auto' : 'none'
      }
    })
  }, [tagFilter])

  const selectedCity = CITIES.find(c => c.id === selected)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map(t => (
          <button key={t} onClick={() => setTagFilter(t)}
            className="px-3 py-1.5 text-[10px] uppercase tracking-[0.06em] rounded-full border transition-all"
            style={{
              borderColor: tagFilter === t ? '#2D5F8A' : '#333',
              color: tagFilter === t ? '#2D5F8A' : '#666',
              background: tagFilter === t ? 'rgba(59,130,246,0.1)' : 'transparent',
            }}
          >{t}</button>
        ))}
      </div>
      <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '560px', background: '#0a0a0a' }} />
      {selectedCity && (
        <div className="mt-4 p-6 rounded-sm" style={{ background: '#111', border: `1px solid ${selectedCity.color}30` }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ background: selectedCity.color }} />
            <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: selectedCity.color }}>{selectedCity.km} km from Tangier</span>
          </div>
          <h3 className="font-serif text-[24px] italic mb-1" style={{ color: '#f5f5f5' }}>{selectedCity.name}</h3>
          <p className="text-[13px] font-medium mb-3" style={{ color: selectedCity.color }}>{selectedCity.character}</p>
          <p className="text-[13px] leading-relaxed" style={{ color: '#ccc' }}>{selectedCity.detail}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedCity.tags.map(t => (
              <span key={t} className="text-[9px] uppercase tracking-[0.06em] px-2 py-1 rounded-full" style={{ background: `${selectedCity.color}15`, color: selectedCity.color }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AtlanticCoastContent() {
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
            {/* Wave pattern */}
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d={`M0 ${300 + i * 60} Q150 ${270 + i * 60} 300 ${300 + i * 60} T600 ${300 + i * 60} T900 ${300 + i * 60} T1200 ${300 + i * 60}`} fill="none" stroke="#2D5F8A" strokeWidth="0.3" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#2D5F8A', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 059 — Coastal Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Atlantic<br />Coast
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Tangier to Dakhla. 3,500 kilometres of Atlantic coastline.
            Africa&rsquo;s largest fishing industry, a wind energy corridor that could
            power the continent, surf breaks that rival Portugal,
            and a $1.6 billion port being built at the edge of the Sahara.
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
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D5F8A' }}>001 — The Coastline</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>12 Cities, One Ocean</h2>
          <CoastMap />
        </div>
      </section>

      {/* ═══ CITY CARDS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Journey South</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Tangier to Dakhla</h2>

          <div className="space-y-0">
            {CITIES.map((c, i) => {
              const isVisible = visibleSections.has(`city-${i}`)
              return (
                <div key={c.id} data-sid={`city-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                        <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums text-dwl-muted">{c.km.toLocaleString()} km</span>
                      </div>
                      <h3 className="font-serif text-[28px] italic text-dwl-black">{c.name}</h3>
                      <p className="text-[13px] font-medium mt-1" style={{ color: c.color }}>{c.character}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {c.tags.map(t => (
                          <span key={t} className="text-[9px] uppercase tracking-[0.06em] px-2 py-1 rounded-full border" style={{ borderColor: '#e0e0e0', color: '#999' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-8 flex items-center">
                      <p className="text-[14px] text-dwl-body leading-relaxed">{c.detail}</p>
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
            &ldquo;For us, Dakhla Atlantic Port is a gateway for Africa.&rdquo;
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(0,0,0,0.6)' }}>— Nisrine Iouzzi, Director, Dakhla Atlantic Port (CNN / African Business)</p>
        </div>
      </section>

      {/* ═══ FOUR THEMES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>003 — Four Coasts in One</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>The Atlantic Does Everything</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {THEMES.map((t, i) => {
              const isVisible = visibleSections.has(`theme-${i}`)
              return (
                <div key={t.theme} data-sid={`theme-${i}`} className="p-8 md:p-10 transition-all duration-700" style={{ background: '#0f0f0f', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="w-3 h-3 rounded-full mb-3" style={{ background: t.color }} />
                  <h3 className="font-serif text-[22px] italic mb-3" style={{ color: '#f5f5f5' }}>{t.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#aaa' }}>{t.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Scale</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {STATS.map((s) => (
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
              'CNN — Dakhla Atlantic Port: $1.2B megaproject, 1,650 hectares, gateway to West Africa (2024)',
              'African Business — Dakhla port $1.6B investment, 20,000 jobs projected, green hydrogen hub (2025)',
              'Wikipedia — Wind Power in Morocco: onshore potential 25 GW, Tangier 8–11 m/s, Tarfaya/Dakhla 7–8.5 m/s',
              'Wikipedia — Tanger Med: Africa\'s largest container port, 9M+ TEU throughput',
              'arXiv / Moroccan Atlantic Coastline Study (2024): 3,500 km coast, upwelling zones, CUI analysis',
              'Taylor & Francis — Offshore Renewable Energy in Morocco: wind peaks El Jadida–Agadir at 9 m/s',
              'Moroccan Ministry of Fisheries: Africa\'s #1 fish producer, world\'s largest sardine exporter',
              'Field documentation: coastal city surveys, Agadir port, Essaouira wind data, Safi sardines',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#2D5F8A' }}>Sources: ANP Morocco, World Bank</p>
          </div>
        </div>
      </section>
    </div>
  )
}
