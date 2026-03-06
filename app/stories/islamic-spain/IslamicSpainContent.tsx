'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  ERAS, ERA_MAP, TIMELINE, MAP_POINTS, TERRITORY, FIGURES, INVASION_ROUTE, HERO_STATS,
  type EraId, type TimelineEvent, type MapPoint,
} from './data'

let mapboxgl: typeof import('mapbox-gl') | null = null

export function IslamicSpainContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)

  const [mapLoaded, setMapLoaded] = useState(false)
  const [activeEra, setActiveEra] = useState<EraId | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set())
  const [territoryAnimated, setTerritoryAnimated] = useState(false)
  const [visibleFigures, setVisibleFigures] = useState<Set<string>>(new Set())

  // ─────────────────────────────────────────────────
  // MAPBOX
  // ─────────────────────────────────────────────────

  useEffect(() => {
    import('mapbox-gl').then((mb) => {
      mapboxgl = mb
      if (!mapContainer.current || mapRef.current) return

      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      if (!token) { console.warn('Mapbox token missing'); return }

      mb.default.accessToken = token

      const map = new mb.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-3.5, 38],
        zoom: 4.8,
        pitch: 0,
        bearing: 0,
        attributionControl: false,
        logoPosition: 'bottom-right',
      })

      map.addControl(new mb.default.NavigationControl({ showCompass: false }), 'bottom-right')

      map.on('load', () => {
        // Invasion route dashed line
        map.addSource('invasion-route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: INVASION_ROUTE },
          },
        })
        map.addLayer({
          id: 'invasion-route-line',
          type: 'line',
          source: 'invasion-route',
          paint: {
            'line-color': '#E63946',
            'line-width': 1.5,
            'line-dasharray': [4, 4],
            'line-opacity': 0.35,
          },
        })

        // Strait crossing line
        map.addSource('strait', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [[-5.313, 35.889], [-5.345, 36.140]],
            },
          },
        })
        map.addLayer({
          id: 'strait-line',
          type: 'line',
          source: 'strait',
          paint: {
            'line-color': '#72EFDD',
            'line-width': 2,
            'line-dasharray': [2, 2],
            'line-opacity': 0.5,
          },
        })

        setMapLoaded(true)
      })

      mapRef.current = map
    })

    return () => {
      markersRef.current.forEach(m => m.remove())
      mapRef.current?.remove()
    }
  }, [])

  // Update markers
  useEffect(() => {
    if (!mapLoaded || !mapboxgl || !mapRef.current) return

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    MAP_POINTS.forEach((point) => {
      const el = document.createElement('div')
      const size = point.type === 'capital' ? 14 : point.type === 'battle' ? 12 : 10
      el.style.cssText = `
        width: ${size}px; height: ${size}px; border-radius: 50%;
        background: ${point.color}; border: 2px solid #0a0a0a;
        cursor: pointer; transition: all 0.3s ease;
        box-shadow: 0 0 ${size}px ${point.color}66;
        opacity: ${activeEra ? 0.25 : 1};
      `

      // Brighten points relevant to active era
      if (activeEra) {
        const eraPoints = getEraPoints(activeEra)
        if (eraPoints.includes(point.id)) {
          el.style.opacity = '1'
          el.style.boxShadow = `0 0 ${size * 2}px ${point.color}aa`
        }
      }

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.6)'
        el.style.boxShadow = `0 0 ${size * 2}px ${point.color}cc`
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)'
        el.style.boxShadow = `0 0 ${size}px ${point.color}66`
      })

      const marker = new mapboxgl!.default.Marker({ element: el })
        .setLngLat(point.coords)
        .setPopup(
          new mapboxgl!.default.Popup({ offset: 12, maxWidth: '260px', closeButton: true })
            .setHTML(`
              <div style="font-family:'IBM Plex Mono','Courier New',monospace">
                <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:18px;color:#f5f5f5;margin-bottom:2px">${point.name}</div>
                <div style="font-size:13px;color:#555;margin-bottom:8px">${point.nameAr}</div>
                <div style="font-size:12px;color:#bbb;line-height:1.6">${point.detail}</div>
              </div>
            `)
        )
        .addTo(mapRef.current)

      markersRef.current.push(marker)
    })
  }, [mapLoaded, activeEra])

  // Fly to event on map
  const flyToEvent = useCallback((event: TimelineEvent) => {
    if (!mapRef.current) return
    setSelectedEvent(event)
    if (event.mapFocus) {
      mapRef.current.flyTo({
        center: event.mapFocus.center,
        zoom: event.mapFocus.zoom,
        duration: 1200,
        essential: true,
      })
    }
  }, [])

  const resetMap = useCallback(() => {
    setSelectedEvent(null)
    setActiveEra(null)
    mapRef.current?.flyTo({ center: [-3.5, 38], zoom: 4.8, duration: 1000 })
  }, [])

  // ─────────────────────────────────────────────────
  // INTERSECTION OBSERVERS
  // ─────────────────────────────────────────────────

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-event-id')
            if (id) setVisibleEvents(prev => new Set(prev).add(id))
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    const els = document.querySelectorAll('[data-event-id]')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Territory bar animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setTerritoryAnimated(true)
      },
      { threshold: 0.2 }
    )
    const el = document.getElementById('territory-section')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Figures animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-figure-id')
            if (id) setVisibleFigures(prev => new Set(prev).add(id))
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    const els = document.querySelectorAll('[data-figure-id]')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // ─────────────────────────────────────────────────
  // ERA-POINT MAPPING
  // ─────────────────────────────────────────────────

  function getEraPoints(era: EraId): string[] {
    const map: Record<EraId, string[]> = {
      conquest: ['gibraltar', 'guadalete', 'cordoba', 'toledo', 'narbonne', 'tours', 'ceuta', 'kairouan'],
      emirate: ['cordoba', 'seville', 'zaragoza', 'valencia', 'fes'],
      caliphate: ['cordoba', 'santiago', 'almeria', 'malaga', 'toledo'],
      taifas: ['seville', 'granada', 'zaragoza', 'badajoz', 'valencia', 'toledo', 'almeria', 'malaga'],
      berber: ['marrakech', 'tinmel', 'sagrajas', 'cordoba', 'seville', 'tangier', 'ceuta', 'fes', 'valencia'],
      decline: ['navas', 'cordoba', 'seville', 'granada'],
      fall: ['granada', 'fes', 'marrakech'],
    }
    return map[era] || []
  }

  // ─────────────────────────────────────────────────
  // ERA FILTER CONTROLS
  // ─────────────────────────────────────────────────

  const handleEraFilter = useCallback((eraId: EraId) => {
    const newEra = activeEra === eraId ? null : eraId
    setActiveEra(newEra)

    // Scroll to era in timeline
    if (newEra) {
      const eraEl = document.getElementById(`era-${newEra}`)
      if (eraEl) {
        eraEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [activeEra])

  // ─────────────────────────────────────────────────
  // MAP QUICK VIEWS
  // ─────────────────────────────────────────────────

  const mapViews: { label: string; center: [number, number]; zoom: number }[] = [
    { label: 'Full View', center: [-3.5, 38], zoom: 4.8 },
    { label: 'Córdoba', center: [-4.779, 37.879], zoom: 10 },
    { label: 'Granada', center: [-3.598, 37.176], zoom: 10 },
    { label: 'The Strait', center: [-5.3, 35.9], zoom: 8 },
    { label: 'North Africa', center: [-5, 33], zoom: 5.5 },
  ]

  // Group timeline events by era
  const eventsByEra = ERAS.map(era => ({
    era,
    events: TIMELINE.filter(e => e.era === era.id),
  }))

  return (
    <div className="-mt-16">

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section
        className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        {/* Faint geometric background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Horseshoe arch motif */}
            <path d="M 300,600 Q 300,200 600,200 Q 900,200 900,600" stroke="#E63946" strokeWidth="2" fill="none" />
            <path d="M 340,600 Q 340,240 600,240 Q 860,240 860,600" stroke="#E63946" strokeWidth="1" fill="none" />
            <path d="M 380,600 Q 380,280 600,280 Q 820,280 820,600" stroke="#FCBF49" strokeWidth="1" fill="none" />
            {/* Geometric interlace */}
            <circle cx="600" cy="400" r="100" stroke="#72EFDD" strokeWidth="0.5" fill="none" />
            <circle cx="600" cy="400" r="150" stroke="#72EFDD" strokeWidth="0.5" fill="none" />
            <circle cx="600" cy="400" r="200" stroke="#48BFE3" strokeWidth="0.5" fill="none" />
            {/* Stars */}
            {[200, 400, 800, 1000].map((x, i) => (
              <g key={i} transform={`translate(${x}, ${150 + i * 80})`}>
                <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#E63946" opacity="0.4" />
              </g>
            ))}
          </svg>
        </div>

        {/* Content */}
        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p
            className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0"
            style={{ color: '#E63946', animation: 'fadeUp 1s ease 0.3s forwards' }}
          >
            Data Module 058 — Historical Timeline
          </p>

          <h1
            className="font-serif leading-[0.92] tracking-[-0.03em] mb-0 opacity-0"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              color: '#ffffff',
              fontStyle: 'italic',
              animation: 'fadeUp 1s ease 0.5s forwards',
            }}
          >
            Islamic<br />Spain
          </h1>

          <p
            className="text-[16px] md:text-[18px] max-w-[560px] leading-relaxed mt-8 opacity-0"
            style={{ color: 'rgba(255,255,255,0.45)', animation: 'fadeUp 1s ease 0.7s forwards' }}
          >
            From Tariq ibn Ziyad&apos;s 711 crossing to the fall of Granada in 1492.
            781 years of conquest, scholarship, art, and slow retreat —
            traced on a vertical timeline and interactive map.
          </p>

          {/* Hero stats */}
          <div
            className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0"
            style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <span
                  className="font-serif italic block"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#E63946', lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 opacity-0" style={{ animation: 'fadeUp 1s ease 1.1s forwards' }}>
            <div className="flex items-center gap-3">
              <div className="w-[1px] h-8 bg-white/20" />
              <span className="text-[10px] tracking-[0.12em] uppercase" style={{ color: 'rgba(0,0,0,0.2)' }}>
                Scroll to begin
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ERA NAVIGATION BAR
      ═══════════════════════════════════════════ */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm" style={{ borderBottom: '1px solid #1a1a1a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="flex items-center gap-1 overflow-x-auto py-3 -mx-2 px-2" style={{ scrollbarWidth: 'none' }}>
            {ERAS.map((era) => (
              <button
                key={era.id}
                onClick={() => handleEraFilter(era.id)}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 transition-all duration-300"
                style={{
                  background: activeEra === era.id ? `${era.color}15` : 'transparent',
                  border: `1px solid ${activeEra === era.id ? era.color : 'transparent'}`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: era.color, opacity: activeEra === era.id ? 1 : 0.5 }}
                />
                <span
                  className="text-[10px] tracking-[0.08em] uppercase whitespace-nowrap"
                  style={{ color: activeEra === era.id ? '#ffffff' : 'rgba(255,255,255,0.6)' }}
                >
                  {era.range}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MAP + TIMELINE (SPLIT)
      ═══════════════════════════════════════════ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-[1400px] mx-auto">
          {/* Map section */}
          <div className="relative" style={{ height: '70vh', borderBottom: '1px solid #1a1a1a' }}>
            <div ref={mapContainer} className="absolute inset-0" />

            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[13px]" style={{ color: 'rgba(0,0,0,0.3)' }}>Loading map...</p>
              </div>
            )}

            {/* Map view controls */}
            <div className="absolute top-4 right-14 flex flex-col gap-1 z-10">
              {mapViews.map((v) => (
                <button
                  key={v.label}
                  onClick={() => {
                    setSelectedEvent(null)
                    mapRef.current?.flyTo({ center: v.center, zoom: v.zoom, duration: 1200 })
                  }}
                  className="text-left px-3 py-1.5 transition-all duration-300"
                  style={{
                    background: 'rgba(10,10,10,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid #333',
                    fontFamily: 'var(--font-plex-mono), monospace',
                    fontSize: '11px',
                    color: '#888',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#eee'; e.currentTarget.style.borderColor = '#E63946' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#333' }}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Map legend */}
            <div
              className="absolute bottom-4 left-4 z-10 p-4"
              style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', border: '1px solid #262626' }}
            >
              <p className="text-[10px] tracking-[0.12em] uppercase mb-2" style={{ color: '#555' }}>Legend</p>
              {[
                { label: 'Capital', color: '#E63946' },
                { label: 'Major City', color: '#FCBF49' },
                { label: 'Battle Site', color: '#F77F00' },
                { label: 'Frontier', color: '#72EFDD' },
                { label: 'North Africa', color: '#48BFE3' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-[11px]" style={{ color: '#999' }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Selected event overlay */}
            {selectedEvent && (
              <div
                className="absolute top-4 left-4 z-10 p-5 max-w-[300px]"
                style={{
                  background: 'rgba(10,10,10,0.92)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid #333',
                }}
              >
                <p className="text-[10px] tracking-[0.12em] uppercase mb-1" style={{ color: ERA_MAP[selectedEvent.era].color }}>
                  {selectedEvent.year}
                </p>
                <p className="font-serif text-[20px] italic mb-2" style={{ color: '#f5f5f5' }}>
                  {selectedEvent.title}
                </p>
                <p className="text-[12px] leading-relaxed" style={{ color: '#aaa' }}>
                  {selectedEvent.detail}
                </p>
                <button
                  onClick={resetMap}
                  className="mt-3 text-[10px] tracking-[0.1em] uppercase"
                  style={{ color: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}
                >
                  ← Reset View
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VERTICAL TIMELINE
      ═══════════════════════════════════════════ */}
      <section className="bg-white" ref={timelineRef}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — Timeline</p>
          <h2
            className="font-serif leading-[1] tracking-[-0.02em] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            781 Years, <em>One Peninsula</em>
          </h2>
          <p className="text-body text-dwl-body max-w-[600px] mb-16">
            From the <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Berber</span> crossing in 711 to the final surrender in 1492.
            Every major event, every turning point, every date a fund manager in London should know.
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical spine — visible on md+ */}
            <div
              className="hidden md:block absolute top-0 bottom-0 w-[1px]"
              style={{ left: '200px', background: '#e5e5e5' }}
            />

            {eventsByEra.map(({ era, events }) => {
              const filteredOut = activeEra && activeEra !== era.id
              return (
                <div
                  key={era.id}
                  id={`era-${era.id}`}
                  className="relative transition-opacity duration-500"
                  style={{ opacity: filteredOut ? 0.15 : 1 }}
                >
                  {/* Era header */}
                  <div className="md:grid md:grid-cols-[180px_40px_1fr] md:items-start py-8">
                    <div className="md:text-right md:pr-6">
                      <p className="text-[10px] tracking-[0.12em] uppercase font-medium" style={{ color: era.color }}>
                        {era.range}
                      </p>
                    </div>
                    <div className="hidden md:flex justify-center pt-1">
                      <div className="w-4 h-4 rounded-full" style={{ background: era.color, boxShadow: `0 0 12px ${era.color}66` }} />
                    </div>
                    <div className="md:pl-6">
                      <h3 className="font-serif text-[28px] md:text-[32px] italic text-dwl-black leading-[1.05]">
                        {era.label}
                      </h3>
                      <p className="text-[14px] text-dwl-gray mt-2 max-w-[500px] leading-relaxed">
                        {era.summary}
                      </p>
                    </div>
                  </div>

                  {/* Events */}
                  {events.map((event) => {
                    const isVisible = visibleEvents.has(event.id)
                    return (
                      <div
                        key={event.id}
                        data-event-id={event.id}
                        className="md:grid md:grid-cols-[180px_40px_1fr] md:items-start py-5 transition-all duration-700"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                        }}
                      >
                        {/* Year */}
                        <div className="md:text-right md:pr-6 pt-0.5">
                          <span className="font-serif italic text-[22px] md:text-[28px] text-dwl-black leading-none">
                            {event.year}
                          </span>
                        </div>

                        {/* Dot */}
                        <div className="hidden md:flex justify-center pt-2">
                          <div
                            className="rounded-full relative z-[2] flex-shrink-0"
                            style={{
                              width: event.major ? 13 : 9,
                              height: event.major ? 13 : 9,
                              background: era.color,
                              border: '2px solid #ffffff',
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="md:pl-6">
                          <button
                            onClick={() => flyToEvent(event)}
                            className="text-left group"
                          >
                            <p className="text-[14px] font-semibold text-dwl-black group-hover:opacity-60 transition-opacity">
                              {event.title}
                            </p>
                          </button>
                          <p className="text-[13px] text-dwl-gray leading-[1.65] mt-1 max-w-[500px]">
                            {event.detail}
                          </p>
                          {event.dataValue && (
                            <span
                              className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1"
                              style={{ background: '#f5f5f5', border: '1px solid #e5e5e5' }}
                            >
                              <span className="font-serif italic text-[16px]" style={{ color: era.color }}>
                                {event.dataValue}
                              </span>
                              <span className="text-[11px] text-dwl-muted">{event.dataLabel}</span>
                            </span>
                          )}
                          {event.mapFocus && (
                            <button
                              onClick={() => flyToEvent(event)}
                              className="block mt-2 text-[10px] tracking-[0.08em] uppercase transition-colors"
                              style={{ color: era.color }}
                              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                            >
                              ↑ View on map
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TERRITORY DECLINE
      ═══════════════════════════════════════════ */}
      <section id="territory-section" className="bg-white" style={{ borderTop: '1px solid #e5e5e5' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — Territory</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-2">
            Muslim-Held Iberia Over Time
          </h2>
          <p className="text-[15px] text-dwl-body max-w-[600px] mb-12">
            The share of the Iberian Peninsula under Muslim control. Peak to zero in 781 years.
          </p>

          <div className="max-w-[800px] space-y-1">
            {TERRITORY.map((point, i) => (
              <div
                key={point.year}
                className="grid items-center gap-3"
                style={{ gridTemplateColumns: '60px 1fr 50px 120px' }}
              >
                <span className="font-serif italic text-[16px] text-dwl-gray text-right">
                  {point.year}
                </span>
                <div className="h-7 relative" style={{ background: '#f5f5f5' }}>
                  <div
                    className="h-full transition-all duration-[1500ms] ease-out"
                    style={{
                      width: territoryAnimated ? `${point.percentage}%` : '0%',
                      background: `linear-gradient(90deg, #E63946, #F77F00)`,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
                <span className="font-serif italic text-[14px] text-dwl-muted">
                  {point.percentage}%
                </span>
                <span className="text-[11px] text-dwl-muted hidden md:block">
                  {point.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE RED QUOTE
      ═══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-40 flex items-center justify-center min-h-[50vh]"
        style={{ background: '#E63946' }}
      >
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p
            className="font-serif italic leading-[1.2]"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: '#ffffff' }}
          >
            The Alhambra was built by a kingdom already dying. The most beautiful things are made when time is running out.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          KEY FIGURES
      ═══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — Figures</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">
            The People Who Built and Broke Al-Andalus
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {FIGURES.map((figure, i) => {
              const era = ERA_MAP[figure.era]
              const isVisible = visibleFigures.has(figure.id)
              return (
                <div
                  key={figure.id}
                  data-figure-id={figure.id}
                  className="bg-white p-8 transition-all duration-600 hover:bg-[#fafafa]"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                    transitionDelay: `${(i % 3) * 80}ms`,
                  }}
                >
                  <p className="text-[10px] tracking-[0.1em] uppercase text-dwl-muted mb-2">
                    {figure.dates}
                  </p>
                  <p className="font-serif italic text-[22px] text-dwl-black mb-1">
                    {figure.name}
                  </p>
                  <p className="text-[12px] mb-3" style={{ color: era.color }}>
                    {figure.role}
                  </p>
                  <p className="text-[13px] text-dwl-gray leading-relaxed">
                    {figure.detail}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SOURCES & FOOTER
      ═══════════════════════════════════════════ */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>
            Sources
          </p>
          <div className="space-y-1">
            {[
              'Menocal, María Rosa — The Ornament of the World: How Muslims, Jews, and Christians Created a Culture of Tolerance in Medieval Spain',
              'Kennedy, Hugh — Muslim Spain and Portugal: A Political History of Al-Andalus',
              'Fletcher, Richard — Moorish Spain',
              'Dodds, Jerrilynn D. — Al-Andalus: The Art of Islamic Spain (Metropolitan Museum of Art)',
              'World History Encyclopedia · Britannica · UNESCO World Heritage Documentation',
              'Bulliet, Richard W. — Conversion model. Population estimates: Colmeiro, Lévi-Provençal',
              'Territory percentages approximate, derived from mapped frontier positions',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>

          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
              &copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
            </p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#E63946' }}>
              Sources: Historical records, UNESCO
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
