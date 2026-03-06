'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { POINTS, LAYER_CONFIG, CORRIDOR_ROUTE, type LayerType, type CulturalPoint } from './data'

// Dynamic import for Mapbox GL (client only)
let mapboxgl: typeof import('mapbox-gl') | null = null

export default function AlAndalusContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [activeLayers, setActiveLayers] = useState<Set<LayerType>>(new Set<LayerType>(['architecture', 'music', 'food', 'language']))
  const [selectedPoint, setSelectedPoint] = useState<CulturalPoint | null>(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)

  // Load Mapbox GL
  useEffect(() => {
    import('mapbox-gl').then((mb) => {
      mapboxgl = mb
      if (!mapContainer.current || mapRef.current) return

      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      if (!token) {
        console.warn('Mapbox token missing')
        return
      }

      mb.default.accessToken = token

      const map = new mb.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-4.5, 35.5],
        zoom: 4.5,
        pitch: 0,
        bearing: 0,
        attributionControl: false,
        logoPosition: 'bottom-right',
      })

      map.addControl(new mb.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // Add corridor route line
        map.addSource('corridor', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: CORRIDOR_ROUTE,
            },
          },
        })

        map.addLayer({
          id: 'corridor-line',
          type: 'line',
          source: 'corridor',
          paint: {
            'line-color': 'rgba(255,255,255,0.12)',
            'line-width': 2,
            'line-dasharray': [4, 4],
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

  // Update markers when layers change
  useEffect(() => {
    if (!mapLoaded || !mapboxgl || !mapRef.current) return

    // Remove existing markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const visiblePoints = POINTS.filter(p => activeLayers.has(p.layer))

    visiblePoints.forEach((point) => {
      const config = LAYER_CONFIG[point.layer]

      // Create custom marker element
      const el = document.createElement('div')
      el.style.cssText = `
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: ${config.color};
        border: 2px solid rgba(255,255,255,0.8);
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 0 8px ${config.color}44;
      `

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.5)'
        el.style.boxShadow = `0 0 16px ${config.color}88`
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)'
        el.style.boxShadow = `0 0 8px ${config.color}44`
      })
      el.addEventListener('click', () => {
        setSelectedPoint(point)
        mapRef.current?.flyTo({
          center: [point.lng, point.lat],
          zoom: 8,
          duration: 1200,
        })
      })

      const marker = new mapboxgl!.default.Marker({ element: el })
        .setLngLat([point.lng, point.lat])
        .addTo(mapRef.current)

      markersRef.current.push(marker)
    })
  }, [mapLoaded, activeLayers])

  const toggleLayer = useCallback((layer: LayerType) => {
    setActiveLayers(prev => {
      const next = new Set(prev)
      if (next.has(layer)) {
        next.delete(layer)
      } else {
        next.add(layer)
      }
      return next
    })
  }, [])

  const resetView = useCallback(() => {
    setSelectedPoint(null)
    mapRef.current?.flyTo({
      center: [-4.5, 35.5],
      zoom: 4.5,
      duration: 1000,
    })
  }, [])

  // Count visible points per layer
  const layerCounts = (Object.keys(LAYER_CONFIG) as LayerType[]).reduce((acc, l) => {
    acc[l] = POINTS.filter(p => p.layer === l).length
    return acc
  }, {} as Record<LayerType, number>)

  return (
    <div className="-mt-16">
      {/* ═══ HERO ═══ */}
      <section
        className="relative min-h-[70vh] flex items-end overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1B1B3A 0%, #0a0a0a 60%, #3A0CA3 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          {/* Faint connecting lines */}
          <svg viewBox="0 0 1000 600" className="w-full h-full opacity-10">
            <path d="M 100,200 C 200,150 400,300 500,280 S 700,200 900,350" stroke="#48BFE3" strokeWidth="1" fill="none" />
            <path d="M 150,250 C 250,200 350,350 500,320 S 650,250 850,400" stroke="#E63946" strokeWidth="1" fill="none" />
            <path d="M 200,300 C 300,250 400,400 550,350 S 700,280 800,380" stroke="#FCBF49" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-16 pt-32 relative z-10">
          <p
            className="text-[11px] uppercase tracking-[0.2em] mb-6"
            style={{ color: '#E63946' }}
          >
            Data Module 003
          </p>
          <h1
            className="font-serif leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: '#ffffff' }}
          >
            Al-Andalus<br /><em>Corridor</em>
          </h1>
          <p
            className="text-[18px] md:text-[20px] max-w-[560px] leading-relaxed"
            style={{ color: 'rgba(0,0,0,0.5)' }}
          >
            One continuous cultural bridge from Seville to Fes. Architecture, music, food, language — four layers of shared DNA.
            Toggle each layer. Explore each point.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {(Object.keys(LAYER_CONFIG) as LayerType[]).map((layer) => {
              const cfg = LAYER_CONFIG[layer]
              return (
                <div
                  key={layer}
                  className="flex items-center gap-2"
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.color }} />
                  <span className="text-[12px]" style={{ color: 'rgba(0,0,0,0.5)' }}>
                    {cfg.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ MAP + CONTROLS ═══ */}
      <section className="relative bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">
            {/* Sidebar */}
            <div className="lg:col-span-4 p-6 md:p-10 relative z-10">
              {/* Layer toggles */}
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.15em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>
                  Toggle Layers
                </p>
                <div className="space-y-2">
                  {(Object.keys(LAYER_CONFIG) as LayerType[]).map((layer) => {
                    const cfg = LAYER_CONFIG[layer]
                    const active = activeLayers.has(layer)
                    return (
                      <button
                        key={layer}
                        onClick={() => toggleLayer(layer)}
                        className="w-full flex items-center justify-between px-4 py-3 transition-all duration-200 text-left"
                        style={{
                          background: active ? `${cfg.color}15` : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${active ? cfg.color + '40' : 'rgba(255,255,255,0.08)'}`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full transition-opacity"
                            style={{
                              backgroundColor: cfg.color,
                              opacity: active ? 1 : 0.2,
                            }}
                          />
                          <span
                            className="text-[13px] font-medium"
                            style={{ color: active ? '#ffffff' : 'rgba(255,255,255,0.5)' }}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <span
                          className="text-[11px] tabular-nums"
                          style={{ color: active ? cfg.color : 'rgba(255,255,255,0.2)' }}
                        >
                          {layerCounts[layer]}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Selected point detail */}
              {selectedPoint ? (
                <div className="animate-fade-up">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: LAYER_CONFIG[selectedPoint.layer].color }}
                    />
                    <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: LAYER_CONFIG[selectedPoint.layer].color }}>
                      {LAYER_CONFIG[selectedPoint.layer].label} · {selectedPoint.city}
                    </p>
                  </div>

                  <h2
                    className="font-serif text-[28px] md:text-[32px] italic leading-[1.1] mb-1"
                    style={{ color: '#ffffff' }}
                  >
                    {selectedPoint.name}
                  </h2>

                  {selectedPoint.period && (
                    <p className="text-[12px] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>
                      {selectedPoint.period}
                    </p>
                  )}

                  <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.6)' }}>
                    {selectedPoint.description}
                  </p>

                  {selectedPoint.connection && (
                    <div
                      className="p-4 mt-4"
                      style={{
                        background: `${LAYER_CONFIG[selectedPoint.layer].color}10`,
                        borderLeft: `2px solid ${LAYER_CONFIG[selectedPoint.layer].color}`,
                      }}
                    >
                      <p className="text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: LAYER_CONFIG[selectedPoint.layer].color }}>
                        The Connection
                      </p>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {selectedPoint.connection}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={resetView}
                    className="mt-6 text-[11px] uppercase tracking-[0.1em] pb-1"
                    style={{ color: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    ← Reset View
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-[13px]" style={{ color: 'rgba(0,0,0,0.3)' }}>
                    Click a point on the map
                  </p>
                  <p className="font-serif text-[20px] italic mt-1" style={{ color: 'rgba(0,0,0,0.5)' }}>
                    to explore the connection
                  </p>
                  <p className="text-[12px] mt-6" style={{ color: 'rgba(0,0,0,0.2)' }}>
                    {POINTS.filter(p => activeLayers.has(p.layer)).length} points visible across{' '}
                    {activeLayers.size} layer{activeLayers.size !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="lg:col-span-8 relative min-h-[60vh] lg:min-h-0">
              <div
                ref={mapContainer}
                className="absolute inset-0"
                style={{ minHeight: '500px' }}
              />
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[13px]" style={{ color: 'rgba(0,0,0,0.3)' }}>
                    Loading map...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE THESIS ═══ */}
      <section
        className="py-24 md:py-40 flex items-center justify-center min-h-[50vh]"
        style={{ background: '#E63946' }}
      >
        <div className="max-w-[680px] px-6 md:px-10 text-center">
          <p
            className="font-serif italic leading-[1.2]"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: '#ffffff' }}
          >
            Eight centuries of shared civilization don&apos;t end at a border crossing. The arch in Seville and the arch in Fes are the same arch.
          </p>
        </div>
      </section>

      {/* ═══ BY THE NUMBERS ═══ */}
      <section className="py-24 md:py-40 bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="micro-label mb-8">The Corridor in Numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dwl-border">
            {[
              { n: '~4,000', label: 'Arabic-origin words in Spanish' },
              { n: '11', label: 'Andalusi nubas preserved in Morocco' },
              { n: '3', label: 'Sister Almohad minarets across 2 continents' },
              { n: '14 km', label: 'Strait of Gibraltar — that\'s all' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 md:p-8 text-center">
                <p className="font-serif text-[36px] md:text-[48px] text-dwl-black italic leading-none">
                  {stat.n}
                </p>
                <p className="text-[11px] text-dwl-gray mt-2 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ POINT LIST ═══ */}
      <section className="py-24 md:py-40" style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="micro-label mb-8">All {POINTS.length} Cultural Points</p>
          <div className="space-y-0">
            {(Object.keys(LAYER_CONFIG) as LayerType[]).map((layer) => {
              const cfg = LAYER_CONFIG[layer]
              const layerPoints = POINTS.filter(p => p.layer === layer)
              return (
                <div key={layer}>
                  <div className="py-4 border-b-2 border-dwl-black">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.color }} />
                      <p className="text-[11px] uppercase tracking-[0.12em] text-dwl-black font-bold">
                        {cfg.label}
                      </p>
                      <span className="text-[11px] text-dwl-muted">{layerPoints.length} points</span>
                    </div>
                  </div>
                  {layerPoints.map((point) => (
                    <div key={point.id} className="py-4 border-b border-dwl-border grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
                      <div className="md:col-span-3">
                        <p className="text-[14px] text-dwl-black font-medium">{point.name}</p>
                        <p className="text-[12px] text-dwl-muted">{point.city}, {point.country === 'spain' ? 'Spain' : point.country === 'portugal' ? 'Portugal' : 'Morocco'}</p>
                      </div>
                      <div className="md:col-span-5">
                        <p className="text-[13px] text-dwl-body leading-relaxed">{point.description}</p>
                      </div>
                      <div className="md:col-span-4">
                        {point.connection && (
                          <p className="text-[12px] italic leading-relaxed" style={{ color: cfg.color }}>
                            {point.connection}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>
            Sources
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {[
              'Bloom, Jonathan M. & Blair, Sheila S. — The Grove Encyclopedia of Islamic Art and Architecture',
              'Dodds, Jerrilynn D. — Al-Andalus: The Art of Islamic Spain',
              'Menocal, María Rosa — The Ornament of the World',
              'UNESCO World Heritage nominations and documentation',
              'Haut-Commissariat au Plan (HCP), Morocco',
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
