'use client'

import { useState, useEffect, useRef } from 'react'
import { HISTORIC_RANGE, CURRENT_RANGE, SILK_ROUTES, KEY_POINTS, TIMELINE, ARTWORKS, LAYERS, BIBLIOGRAPHY } from './data'

/* ═══════════════════════════════════════════════════
   THE LION'S ROAD
   How an Animal That Never Lived in China Became Its Guardian
   Module · Cultural Intelligence
   ═══════════════════════════════════════════════════ */

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  mid: '#525252', muted: '#737373', border: '#e5e5e5', light: '#f5f5f5',
  dark: '#0e0e0e', darkMid: '#161616', darkDeep: '#0a0a0a',
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const TYPE_COLORS: Record<string, string> = {
  biology: '#2D6E4F', trade: '#E63946', religion: '#FCBF49',
  art: '#5E60CE', text: '#48BFE3', extinction: '#722F37',
}

const POINT_COLORS: Record<string, string> = {
  source: '#2D6E4F', relay: '#E63946', destination: '#5E60CE', artwork: '#FCBF49',
}

const ARTWORK_COLORS: Record<string, string> = {
  sculpture: '#E63946', architecture: '#5E60CE', text: '#48BFE3',
  painting: '#FCBF49', performance: '#72EFDD',
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, v }
}

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, v } = useInView()
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
    }}>{children}</div>
  )
}

function Micro({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color, marginBottom: 16 }}>{children}</div>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>{children}</h2>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 16, lineHeight: 1.8, color: C.body, marginBottom: 20, maxWidth: 640 }}>{children}</p>
}

// ── MAIN ──
export function TheLionsRoadContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)
  const [activeRoute, setActiveRoute] = useState<number | null>(null)
  const [activePoint, setActivePoint] = useState<number | null>(null)
  const [timelineFilter, setTimelineFilter] = useState<string>('all')
  const [artFilter, setArtFilter] = useState<string>('all')
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  const filtered = timelineFilter === 'all' ? TIMELINE : TIMELINE.filter(e => e.type === timelineFilter)
  const filteredArt = artFilter === 'all' ? ARTWORKS : ARTWORKS.filter(a => a.category === artFilter)

  // ── MAPBOX ──
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [65, 32], zoom: 2.8, minZoom: 2, maxZoom: 10,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // Historic range polygon
        map.addSource('historic-range', {
          type: 'geojson',
          data: {
            type: 'Feature', properties: {},
            geometry: { type: 'Polygon', coordinates: [HISTORIC_RANGE] }
          }
        })
        map.addLayer({
          id: 'range-fill', type: 'fill', source: 'historic-range',
          paint: { 'fill-color': '#C8A415', 'fill-opacity': 0.12 }
        })
        map.addLayer({
          id: 'range-line', type: 'line', source: 'historic-range',
          paint: { 'line-color': '#C8A415', 'line-width': 1.5, 'line-opacity': 0.4, 'line-dasharray': [4, 3] }
        })

        // Current range dot
        map.addSource('current-range', {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: CURRENT_RANGE.center } }
        })
        map.addLayer({
          id: 'current-range-pulse', type: 'circle', source: 'current-range',
          paint: { 'circle-radius': 12, 'circle-color': '#2D6E4F', 'circle-opacity': 0.2 }
        })
        map.addLayer({
          id: 'current-range-dot', type: 'circle', source: 'current-range',
          paint: { 'circle-radius': 5, 'circle-color': '#2D6E4F', 'circle-opacity': 0.9 }
        })

        // Silk Road routes
        SILK_ROUTES.forEach((r, i) => {
          map.addSource(`silk-${i}`, {
            type: 'geojson',
            data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: r.coords } }
          })
          map.addLayer({
            id: `silk-line-${i}`, type: 'line', source: `silk-${i}`,
            paint: { 'line-color': r.color, 'line-width': 2.5, 'line-opacity': 0.6, 'line-dasharray': [6, 4] }
          })
        })

        // Key points
        KEY_POINTS.forEach((p, i) => {
          map.addSource(`point-${i}`, {
            type: 'geojson',
            data: { type: 'Feature', properties: { name: p.name, idx: i }, geometry: { type: 'Point', coordinates: p.coords } }
          })
          map.addLayer({
            id: `point-circle-${i}`, type: 'circle', source: `point-${i}`,
            paint: { 'circle-radius': 6, 'circle-color': POINT_COLORS[p.type], 'circle-opacity': 0.85, 'circle-stroke-width': 1.5, 'circle-stroke-color': '#ffffff' }
          })
        })

        // China label — no native lions
        map.addSource('china-label', {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [104, 35] } }
        })
        map.addLayer({
          id: 'china-text', type: 'symbol', source: 'china-label',
          layout: {
            'text-field': 'NO NATIVE LIONS',
            'text-size': 11,
            'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
            'text-letter-spacing': 0.15,
          },
          paint: { 'text-color': '#E63946', 'text-opacity': 0.5 }
        })

        setMapReady(true)
        mapRef.current = map
      })
    })
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <Fade>
          <Micro>Module · Cultural Intelligence</Micro>
        </Fade>
        <Fade delay={150}>
          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, fontStyle: 'italic',
            color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32,
          }}>
            The Lion's Road
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic',
            color: C.mid, lineHeight: 1.4, maxWidth: 560,
          }}>
            How an animal that never lived in China became the guardian of its civilisation
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '0', label: 'Native lions in China' },
              { n: '87 CE', label: 'First lion reaches China' },
              { n: '2,000+', label: 'Years of reimagining' },
              { n: '~700', label: 'Asiatic lions surviving' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, fontStyle: 'italic', color: C.ink, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Fade>
            <Body>
              The Asiatic lion once ranged from Greece to India — across Turkey, Persia, Mesopotamia, Pakistan, and the entire northern Indian subcontinent. At its peak, the range spanned three continents and more than 8,000 kilometres.
            </Body>
            <Body>
              China was never part of it. Not a single wild lion ever set foot on Chinese soil.
            </Body>
            <Body>
              Yet China built the most prolific lion culture on earth. Guardian lions at every palace, temple, bridge, and wealthy household. The lion dance performed at every New Year. The word for lion — shizi (狮子) — borrowed from Persian because Chinese had no word for an animal it had never encountered.
            </Body>
            <Body>
              This is the story of how an idea travelled further than the animal ever could.
            </Body>
          </Fade>
        </div>
      </section>

      {/* ═══ MAPBOX MAP ═══ */}
      <section style={{ padding: '0 0 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: '48px 24px 24px', maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <Micro>The Geography</Micro>
            <SectionTitle>The lion's range vs. the lion's road</SectionTitle>
            <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 13, color: C.mid, lineHeight: 1.7, marginBottom: 24, maxWidth: 560 }}>
              Gold shading: where the Asiatic lion actually lived. Dashed lines: how the idea reached China — through trade, religion, and diplomacy. Green dot: the only place they survive today.
            </p>
          </Fade>

          {/* Route legend */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
            {SILK_ROUTES.map((r, i) => (
              <button key={i}
                onClick={() => setActiveRoute(activeRoute === i ? null : i)}
                style={{
                  fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: activeRoute === null || activeRoute === i ? r.color : C.muted,
                  opacity: activeRoute === null || activeRoute === i ? 1 : 0.4,
                  transition: 'all 0.3s ease', padding: '4px 0',
                  borderBottom: `2px solid ${activeRoute === i ? r.color : 'transparent'}`,
                }}
              >
                ● {r.name}
              </button>
            ))}
            <button
              onClick={() => setActiveRoute(null)}
              style={{
                fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10,
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: C.muted, padding: '4px 0',
              }}
            >
              Show all
            </button>
          </div>
        </div>

        {/* Map container */}
        <div ref={mapContainer} style={{ width: '100%', height: 'clamp(400px, 55vw, 600px)', background: C.light }} />

        {/* Point legend below map */}
        <div style={{ padding: '24px 24px 0', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {(['source', 'relay', 'destination', 'artwork'] as const).map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: POINT_COLORS[t] }} />
                <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.muted }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key points detail cards */}
        <div style={{ padding: '32px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1 }}>
            {KEY_POINTS.map((p, i) => (
              <Fade key={i} delay={i * 60}>
                <div
                  onClick={() => setActivePoint(activePoint === i ? null : i)}
                  style={{
                    padding: '20px 0',
                    borderBottom: `1px solid ${C.border}`,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: POINT_COLORS[p.type], flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: POINT_COLORS[p.type] }}>
                      {p.year}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, fontStyle: 'italic', color: C.ink, lineHeight: 1.2, marginBottom: 4 }}>
                    {p.name}
                  </div>
                  <div style={{
                    maxHeight: activePoint === i ? 200 : 0, overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                  }}>
                    <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 13, lineHeight: 1.7, color: C.mid, paddingTop: 8 }}>
                      {p.detail}
                    </p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CULTURAL TRANSMISSION LAYERS ═══ */}
      <section style={{ padding: '80px 24px', background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <Micro>Five Layers</Micro>
            <SectionTitle>What made the Chinese lion</SectionTitle>
            <Body>
              China's lion is not one thing. It is a composite — five cultural streams converging over two thousand years into a creature that no longer resembles the Asiatic original.
            </Body>
          </Fade>

          <div style={{ marginTop: 48 }}>
            {LAYERS.map((layer, i) => (
              <Fade key={i} delay={i * 80}>
                <div style={{ padding: '28px 0', borderBottom: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '4px 1fr', gap: 24 }}>
                  <div style={{ background: layer.color, borderRadius: 2 }} />
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontStyle: 'italic', color: C.ink }}>{layer.name}</span>
                      <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted }}>{layer.period}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: layer.color, marginBottom: 8, opacity: 0.7 }}>{layer.origin}</div>
                    <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 14, lineHeight: 1.8, color: C.mid }}>{layer.contribution}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <Micro>120,000 Years</Micro>
            <SectionTitle>From biology to mythology</SectionTitle>
          </Fade>

          {/* Filters */}
          <Fade delay={100}>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 40 }}>
              {[
                { key: 'all', label: 'All' },
                { key: 'biology', label: 'Biology' },
                { key: 'trade', label: 'Trade' },
                { key: 'religion', label: 'Religion' },
                { key: 'art', label: 'Art' },
                { key: 'text', label: 'Text' },
                { key: 'extinction', label: 'Extinction' },
              ].map(f => (
                <button key={f.key} onClick={() => setTimelineFilter(f.key)} style={{
                  fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                  background: timelineFilter === f.key ? (f.key === 'all' ? C.ink : TYPE_COLORS[f.key] || C.ink) : 'transparent',
                  color: timelineFilter === f.key ? '#fff' : C.muted,
                  border: `1px solid ${timelineFilter === f.key ? 'transparent' : C.border}`,
                }}>
                  {f.label}
                </button>
              ))}
            </div>
          </Fade>

          {/* Timeline events */}
          <div>
            {filtered.map((e, i) => (
              <Fade key={`${e.sortYear}-${i}`} delay={i * 40}>
                <div
                  onClick={() => setExpandedEvent(expandedEvent === i ? null : i)}
                  style={{
                    padding: '24px 0', borderBottom: `1px solid ${C.border}`,
                    cursor: 'pointer',
                    display: 'grid', gridTemplateColumns: 'clamp(80px, 12vw, 120px) 1fr', gap: 20,
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 16, fontStyle: 'italic', color: C.ink, lineHeight: 1.2 }}>
                      {e.year}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-plex-mono), monospace', fontSize: 9, letterSpacing: '0.1em',
                      textTransform: 'uppercase' as const, marginTop: 4,
                      color: TYPE_COLORS[e.type],
                    }}>
                      {e.type}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.4, marginBottom: 4 }}>
                      {e.title}
                    </div>
                    <div style={{
                      maxHeight: expandedEvent === i ? 300 : 0, overflow: 'hidden',
                      transition: 'max-height 0.4s ease',
                    }}>
                      <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 13, lineHeight: 1.8, color: C.mid, paddingTop: 8 }}>
                        {e.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KEY ARTWORKS ═══ */}
      <section style={{ padding: '80px 24px', background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <Micro>The Evidence</Micro>
            <SectionTitle>Key artworks &amp; texts</SectionTitle>
            <Body>
              The lion's transformation from a real animal into a mythological guardian can be traced through specific objects. Each one shows what the Chinese lion looked like at that moment — and how far it had drifted from the original.
            </Body>
          </Fade>

          {/* Category filters */}
          <Fade delay={100}>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 40 }}>
              {[
                { key: 'all', label: 'All' },
                { key: 'sculpture', label: 'Sculpture' },
                { key: 'architecture', label: 'Architecture' },
                { key: 'text', label: 'Text' },
                { key: 'performance', label: 'Performance' },
              ].map(f => (
                <button key={f.key} onClick={() => setArtFilter(f.key)} style={{
                  fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                  background: artFilter === f.key ? C.ink : 'transparent',
                  color: artFilter === f.key ? '#fff' : C.muted,
                  border: `1px solid ${artFilter === f.key ? 'transparent' : C.border}`,
                }}>
                  {f.label}
                </button>
              ))}
            </div>
          </Fade>

          <div>
            {filteredArt.map((a, i) => (
              <Fade key={i} delay={i * 60}>
                <div style={{
                  padding: '32px 0', borderBottom: `1px solid ${C.border}`,
                  display: 'grid', gridTemplateColumns: '4px 1fr', gap: 24,
                }}>
                  <div style={{ background: ARTWORK_COLORS[a.category], borderRadius: 2 }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                      <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: ARTWORK_COLORS[a.category] }}>{a.category}</span>
                      <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, letterSpacing: '0.06em', color: C.muted }}>{a.date}</span>
                    </div>
                    <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, fontStyle: 'italic', color: C.ink, lineHeight: 1.2, marginBottom: 8 }}>
                      {a.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: C.muted, marginBottom: 12 }}>
                      {a.location} · {a.medium}
                    </div>
                    <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 14, lineHeight: 1.8, color: C.mid }}>
                      {a.significance}
                    </p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE CONNECTION ═══ */}
      <section style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Fade>
            <Micro color="#E63946">The Connection</Micro>
            <SectionTitle>Why this matters</SectionTitle>
            <Body>
              Slow Morocco is named for an animal that, in the Chinese tradition from which its founder comes, was never local, always imported, always reimagined, and always more powerful as an idea than as a biological fact.
            </Body>
            <Body>
              The lion in China is a composite — Persian royal power, Indian Buddhist protection, Central Asian steppe fluidity, indigenous Chinese mythology, and imperial authority all layered into a single form over two millennia. It is the world's longest game of cultural telephone, and the result is an animal more meaningful than the original.
            </Body>
            <Body>
              The lion never had a country. It had a road.
            </Body>
          </Fade>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ padding: '64px 24px', background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 12, lineHeight: 1.8, color: C.muted, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      {/* ═══ CONNECTED MODULES ═══ */}
      <section style={{ borderTop: '1px solid #e5e5e5', padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 24 }}>Continue Reading</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { href: '/data/the-son-who-took-the-fire', title: 'The Son Who Took the Fire', sub: 'Menelik I and the Lion of Judah — the symbol\'s Ethiopian origin.' },
              { href: '/data/trans-saharan-trade', title: 'Trans-Saharan Trade Routes', sub: 'The corridors that carried goods, symbols, and beliefs across Africa.' },
              { href: '/data/the-silk-road-into-africa', title: 'The Silk Road Into Africa', sub: 'Where the eastern trade routes met the African continent.' },
              { href: '/data/the-churches-that-swallowed-the-mountain', title: 'The Churches That Swallowed the Mountain', sub: 'Lalibela — the rock-hewn New Jerusalem.' },
            ].map(l => (
              <span key={l.href} style={{ display: 'block', padding: '16px 20px', background: C.alt, borderRadius: 2, textDecoration: 'none', transition: 'background 0.2s' }}>
                <p style={{ fontFamily: 'var(--font-garamond), Georgia, serif', fontSize: 16, fontStyle: 'italic', color: C.ink, marginBottom: 4, lineHeight: 1.3 }}>{l.title}</p>
                <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, color: C.muted, lineHeight: 1.5 }}>{l.sub}</p>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ATTRIBUTION FOOTER ═══ */}
      <section style={{ padding: '24px', background: C.alt, textAlign: 'center' as const }}>
        <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>
          Sources: Book of the Later Han, Metropolitan Museum of Art, IUCN Red List, Britannica
        </p>
        <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, letterSpacing: '0.08em', color: C.muted, marginTop: 4 }}>
          © Slow Morocco
        </p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Lion's Road</span>
            <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · Cultural Intelligence</span>
          </div>
        </div>
        <div style={{ background: '#161616', padding: '20px 24px', textAlign: 'center' as const }}>
          <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} Slow Morocco · J. Ng</span>
        </div>
        <div style={{ background: '#0e0e0e', padding: '12px 24px' }} />
      </footer>
    </div>
  )
}
