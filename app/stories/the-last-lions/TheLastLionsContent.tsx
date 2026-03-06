'use client'

import { useState, useEffect, useRef } from 'react'
import { BARBARY_RANGE, LAST_SIGHTINGS, ZOO_SITES, LION_TYPES, DECLINE, WILD_POPULATIONS, TIMELINE, BIBLIOGRAPHY } from './data'

/* ═══════════════════════════════════════════════════
   THE LAST LIONS
   The Atlas Lion — From Roman Arena to Royal Zoo
   Module · Cultural Intelligence
   ═══════════════════════════════════════════════════ */

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  mid: '#525252', muted: '#737373', border: '#e5e5e5',
}

const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const TYPE_COLORS: Record<string, string> = {
  ancient: '#8B7355', roman: '#E63946', royal: '#C4963C',
  colonial: '#5E60CE', extinction: '#722F37', conservation: '#2D6E4F',
}

const TREND_COLORS: Record<string, string> = {
  increasing: '#2D6E4F', stable: '#48BFE3', declining: '#E63946', critical: '#722F37',
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
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms` }}>{children}</div>
}

function Micro({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color, marginBottom: 16 }}>{children}</div>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>{children}</h2>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.85, color: C.mid, marginBottom: 20, maxWidth: 640 }}>{children}</p>
}

function Section({ children, bg = C.bg, border = true }: { children: React.ReactNode; bg?: string; border?: boolean }) {
  return <section style={{ background: bg, padding: '80px 24px', borderTop: border ? `1px solid ${C.border}` : 'none' }}><div style={{ maxWidth: 800, margin: '0 auto' }}>{children}</div></section>
}

// ── MAIN ──
export function TheLastLionsContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapLayer, setMapLayer] = useState<'range' | 'sightings' | 'zoos' | 'wild'>('range')
  const [timeFilter, setTimeFilter] = useState('all')
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [activeLion, setActiveLion] = useState(0)
  const [hoveredZoo, setHoveredZoo] = useState<number | null>(null)

  const filtered = timeFilter === 'all' ? TIMELINE : TIMELINE.filter(e => e.type === timeFilter)

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
        center: [10, 25], zoom: 2.3, minZoom: 1.5, maxZoom: 10,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // ── Historic Barbary range ──
        map.addSource('barbary-range', {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [BARBARY_RANGE] } }
        })
        map.addLayer({ id: 'barbary-fill', type: 'fill', source: 'barbary-range', paint: { 'fill-color': '#E63946', 'fill-opacity': 0.15 } })
        map.addLayer({ id: 'barbary-line', type: 'line', source: 'barbary-range', paint: { 'line-color': '#E63946', 'line-width': 1.5, 'line-opacity': 0.4, 'line-dasharray': [4, 3] } })

        // ── Last sightings ──
        LAST_SIGHTINGS.forEach((s, i) => {
          map.addSource(`sight-${i}`, {
            type: 'geojson',
            data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: s.coords } }
          })
          map.addLayer({ id: `sight-${i}`, type: 'circle', source: `sight-${i}`, paint: { 'circle-radius': 5, 'circle-color': '#722F37', 'circle-opacity': 0, 'circle-stroke-width': 1.5, 'circle-stroke-color': '#722F37', 'circle-stroke-opacity': 0 } })
        })

        // ── Zoo sites ──
        ZOO_SITES.forEach((z, i) => {
          map.addSource(`zoo-${i}`, {
            type: 'geojson',
            data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: z.coords } }
          })
          const c = z.status === 'origin' ? '#E63946' : z.status === 'breeding' ? '#2D6E4F' : '#48BFE3'
          map.addLayer({ id: `zoo-${i}`, type: 'circle', source: `zoo-${i}`, paint: { 'circle-radius': 6, 'circle-color': c, 'circle-opacity': 0, 'circle-stroke-width': 1.5, 'circle-stroke-color': c, 'circle-stroke-opacity': 0 } })
        })

        // ── Wild populations ──
        WILD_POPULATIONS.forEach((w, i) => {
          map.addSource(`wild-${i}`, {
            type: 'geojson',
            data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: w.coords } }
          })
          map.addLayer({ id: `wild-${i}`, type: 'circle', source: `wild-${i}`, paint: { 'circle-radius': 7, 'circle-color': TREND_COLORS[w.trend], 'circle-opacity': 0, 'circle-stroke-width': 1.5, 'circle-stroke-color': TREND_COLORS[w.trend], 'circle-stroke-opacity': 0 } })
          map.addLayer({ id: `wild-pulse-${i}`, type: 'circle', source: `wild-${i}`, paint: { 'circle-radius': 14, 'circle-color': TREND_COLORS[w.trend], 'circle-opacity': 0 } })
        })

        mapRef.current = map
      })
    })
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  // ── LAYER TOGGLE ──
  useEffect(() => {
    const map = mapRef.current; if (!map || !map.isStyleLoaded()) return
    const show = (ids: string[], opacity: number) => {
      ids.forEach(id => {
        try {
          if (map.getLayer(id)) {
            map.setPaintProperty(id, 'circle-opacity', opacity)
            map.setPaintProperty(id, 'circle-stroke-opacity', opacity)
          }
        } catch { /* layer not ready */ }
      })
    }
    const showFill = (id: string, opacity: number) => { try { if (map.getLayer(id)) map.setPaintProperty(id, 'fill-opacity', opacity) } catch {} }
    const showLine = (id: string, opacity: number) => { try { if (map.getLayer(id)) map.setPaintProperty(id, 'line-opacity', opacity) } catch {} }

    // Reset all
    showFill('barbary-fill', 0); showLine('barbary-line', 0)
    LAST_SIGHTINGS.forEach((_, i) => show([`sight-${i}`], 0))
    ZOO_SITES.forEach((_, i) => show([`zoo-${i}`], 0))
    WILD_POPULATIONS.forEach((_, i) => { show([`wild-${i}`], 0); try { if (map.getLayer(`wild-pulse-${i}`)) map.setPaintProperty(`wild-pulse-${i}`, 'circle-opacity', 0) } catch {} })

    if (mapLayer === 'range') {
      showFill('barbary-fill', 0.15); showLine('barbary-line', 0.4)
      map.flyTo({ center: [5, 33], zoom: 3.8, duration: 1200 })
    } else if (mapLayer === 'sightings') {
      showFill('barbary-fill', 0.06); showLine('barbary-line', 0.15)
      LAST_SIGHTINGS.forEach((_, i) => show([`sight-${i}`], 0.9))
      map.flyTo({ center: [-1, 33], zoom: 4.5, duration: 1200 })
    } else if (mapLayer === 'zoos') {
      ZOO_SITES.forEach((_, i) => show([`zoo-${i}`], 0.9))
      map.flyTo({ center: [5, 42], zoom: 3.2, duration: 1200 })
    } else if (mapLayer === 'wild') {
      WILD_POPULATIONS.forEach((_, i) => {
        show([`wild-${i}`], 0.85)
        try { if (map.getLayer(`wild-pulse-${i}`)) map.setPaintProperty(`wild-pulse-${i}`, 'circle-opacity', 0.15) } catch {}
      })
      map.flyTo({ center: [25, 5], zoom: 2.5, duration: 1200 })
    }
  }, [mapLayer])

  // ── DECLINE CHART (SVG) ──
  const chartW = 700, chartH = 280, padL = 60, padR = 20, padT = 20, padB = 40
  const maxPop = 200000
  const xScale = (year: number) => padL + ((year - 1900) / (2025 - 1900)) * (chartW - padL - padR)
  const yScale = (pop: number) => padT + ((maxPop - pop) / maxPop) * (chartH - padT - padB)

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <Fade><Micro>Module · Cultural Intelligence</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            The Last Lions
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 560 }}>
            The Atlas lion. From Roman arena to royal zoo. 100,000 years in North Africa, then gone.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '100,000', label: 'Years in North Africa' },
              { n: '1942', label: 'Last confirmed kill in wild' },
              { n: '~90', label: 'Descendants in captivity' },
              { n: '90%', label: 'Global lion decline since 1900' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 32, fontStyle: 'italic', color: C.ink, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ INTRO ═══ */}
      <Section>
        <Fade>
          <Body>The Barbary lion — also called the Atlas lion — ruled North Africa for over 100,000 years. It hunted in the cedar forests of the Atlas Mountains, stalked Barbary sheep across Mediterranean scrubland, and survived winters that would kill an African savannah lion.</Body>
          <Body>Romans captured thousands for the Colosseum. Moroccan sultans kept them as symbols of divine power. European naturalists measured their skulls and named them. Hunters with rifles erased them from the wild in less than a century.</Body>
          <Body>By 1942, the last confirmed wild Barbary lion — a lioness — was shot at the Tizi n'Tichka pass in Morocco's High Atlas. The road from Marrakech to Ouarzazate runs through the spot where a subspecies ended.</Body>
          <Body>But the story didn't stop. Berber tribes had been presenting captured lions to Moroccan kings for centuries. That royal collection — genetic material from the Atlas Mountains itself — survived. Today, approximately 90 descendants live in zoos across Morocco and Europe. They are the last thread.</Body>
        </Fade>
      </Section>

      {/* ═══ MAP ═══ */}
      <section style={{ padding: '0 0 0', borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: '48px 24px 24px', maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <Micro>Four Maps</Micro>
            <SectionTitle>Where the lions were. Where they are.</SectionTitle>
          </Fade>
          <Fade delay={100}>
            <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 16 }}>
              {([
                { key: 'range', label: 'Historic Range', color: '#E63946' },
                { key: 'sightings', label: 'Last Sightings', color: '#722F37' },
                { key: 'zoos', label: 'Zoo Descendants', color: '#2D6E4F' },
                { key: 'wild', label: 'Wild Lions Today', color: '#48BFE3' },
              ] as const).map(m => (
                <button key={m.key} onClick={() => setMapLayer(m.key)} style={{
                  fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                  background: mapLayer === m.key ? m.color : 'transparent',
                  color: mapLayer === m.key ? '#fff' : C.muted,
                  border: `1px solid ${mapLayer === m.key ? m.color : C.border}`,
                }}>
                  {m.label}
                </button>
              ))}
            </div>
          </Fade>
        </div>

        <div ref={mapContainer} style={{ width: '100%', height: 'clamp(400px, 55vw, 600px)', background: '#f5f5f5' }} />

        {/* Context cards below map */}
        <div style={{ padding: '32px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
          {mapLayer === 'sightings' && (
            <div>
              <p style={{ fontFamily: F.mono, fontSize: 13, color: C.mid, lineHeight: 1.7, marginBottom: 24 }}>
                Last confirmed sightings of wild Barbary lions in North Africa, 1891–1965. The widely cited 1920 date is not the end — research shows lions persisted in Algeria until the late 1950s, when military conflict destroyed their last forest refuges.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1 }}>
                {LAST_SIGHTINGS.map((s, i) => (
                  <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink }}>{s.year}</span>
                      <span style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: s.country === 'morocco' ? '#E63946' : '#5E60CE' }}>{s.country}</span>
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: 12, color: C.mid, lineHeight: 1.7 }}>{s.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mapLayer === 'zoos' && (
            <div>
              <p style={{ fontFamily: F.mono, fontSize: 13, color: C.mid, lineHeight: 1.7, marginBottom: 24 }}>
                Every Barbary lion alive today descends from the Moroccan royal collection — lions originally captured in the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Atlas Mountains</span> by <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Berber</span> tribes and presented to the Sultan as loyalty pledges. ~90 individuals, effective population size only 14.
              </p>
              {ZOO_SITES.map((z, i) => (
                <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredZoo(i)} onMouseLeave={() => setHoveredZoo(null)}
                >
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                      background: z.status === 'origin' ? '#E63946' : z.status === 'breeding' ? '#2D6E4F' : '#48BFE3',
                    }} />
                    <span style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink }}>{z.name}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted }}>{z.city}, {z.country}</span>
                  </div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: z.status === 'origin' ? '#E63946' : z.status === 'breeding' ? '#2D6E4F' : '#48BFE3', marginBottom: 6, marginLeft: 16 }}>{z.status}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 12, color: C.mid, lineHeight: 1.7, marginLeft: 16 }}>{z.note}</div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                {[{ c: '#E63946', l: 'Origin' }, { c: '#2D6E4F', l: 'Active breeding' }, { c: '#48BFE3', l: 'Holding' }].map(x => (
                  <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: x.c }} />
                    <span style={{ fontFamily: F.mono, fontSize: 9, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.muted }}>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mapLayer === 'wild' && (
            <div>
              <p style={{ fontFamily: F.mono, fontSize: 13, color: C.mid, lineHeight: 1.7, marginBottom: 24 }}>
                Where lions still roam in the wild today. ~20,000–25,000 individuals across sub-Saharan Africa + ~700 Asiatic lions in India. Down from ~200,000 a century ago. No wild lions remain in North Africa, the Middle East, or Europe. Botswana hosts ~3,500 — Africa's second largest population after Tanzania. Namibia's Kunene desert lions (56–60 individuals) hunt seals on the Skeleton Coast and survive without drinking water. Uganda's tree-climbing lions of Ishasha are down to ~40, poisoned by farmers. West Africa's lions are Critically Endangered — fewer than 250 mature adults across the entire region, genetically closer to India's Asiatic lions than to southern African ones.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 1 }}>
                {WILD_POPULATIONS.map((w, i) => (
                  <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: TREND_COLORS[w.trend] }} />
                      <span style={{ fontFamily: F.serif, fontSize: 16, fontStyle: 'italic', color: C.ink }}>{w.name}</span>
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginLeft: 16 }}>
                      {w.country} · {w.population} ·{' '}
                      <span style={{ color: TREND_COLORS[w.trend] }}>{w.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                {[{ c: '#2D6E4F', l: 'Increasing' }, { c: '#48BFE3', l: 'Stable' }, { c: '#E63946', l: 'Declining' }, { c: '#722F37', l: 'Critical' }].map(x => (
                  <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: x.c }} />
                    <span style={{ fontFamily: F.mono, fontSize: 9, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.muted }}>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mapLayer === 'range' && (
            <p style={{ fontFamily: F.mono, fontSize: 13, color: C.mid, lineHeight: 1.7 }}>
              The Barbary lion's historic range: Morocco to Egypt, along the Atlas Mountains and the Mediterranean coast. They lived in forests, mountains, and scrubland north of the Sahara — a cold-adapted population unlike any lion alive today. Fossils near <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Essaouira</span> date to 100,000 years ago.
            </p>
          )}
        </div>
      </section>

      {/* ═══ SIZE COMPARISON ═══ */}
      <Section bg={C.alt}>
        <Fade>
          <Micro>The Three Lions</Micro>
          <SectionTitle>Barbary vs. Asiatic vs. African</SectionTitle>
          <Body>All three belong to the same species — Panthera leo. But the Barbary and Asiatic are both classified under Panthera leo leo (the northern subspecies), while the East and Southern African lions are Panthera leo melanochaita. The Barbary lion is genetically closer to the Asiatic lion in India than to the African lion in the Serengeti.</Body>
        </Fade>

        <div style={{ display: 'flex', gap: 2, marginBottom: 32, marginTop: 32 }}>
          {LION_TYPES.map((lt, i) => (
            <button key={i} onClick={() => setActiveLion(i)} style={{
              fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const,
              padding: '10px 16px', cursor: 'pointer', transition: 'all 0.2s ease', flex: 1,
              background: activeLion === i ? lt.color : 'transparent',
              color: activeLion === i ? '#fff' : C.muted,
              border: `1px solid ${activeLion === i ? lt.color : C.border}`,
            }}>
              {lt.name.split('/')[0].trim()}
            </button>
          ))}
        </div>

        {(() => {
          const lt = LION_TYPES[activeLion]
          return (
            <Fade key={activeLion}>
              <div style={{ borderLeft: `3px solid ${lt.color}`, padding: '28px 24px', background: C.bg }}>
                <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: C.ink, marginBottom: 4 }}>{lt.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginBottom: 24 }}>{lt.subspecies}</div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 20 }}>
                  {[
                    { label: 'Male length', val: lt.maleLength },
                    { label: 'Male weight', val: lt.maleWeight },
                    { label: 'Female weight', val: lt.femaleWeight },
                    { label: 'Shoulder height', val: lt.shoulderHeight },
                    { label: 'Population', val: lt.population },
                    { label: 'IUCN Status', val: lt.status },
                  ].map((f, j) => (
                    <div key={j}>
                      <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 4 }}>{f.label}</div>
                      <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: C.ink }}>{f.val}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 4 }}>Mane</div>
                    <div style={{ fontFamily: F.mono, fontSize: 13, color: C.mid, lineHeight: 1.7 }}>{lt.mane}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 4 }}>Habitat</div>
                    <div style={{ fontFamily: F.mono, fontSize: 13, color: C.mid, lineHeight: 1.7 }}>{lt.habitat}</div>
                  </div>
                </div>
              </div>
            </Fade>
          )
        })()}
      </Section>

      {/* ═══ DECLINE CHART ═══ */}
      <Section>
        <Fade>
          <Micro color="#E63946">The Collapse</Micro>
          <SectionTitle>200,000 to 20,000 in one century</SectionTitle>
        </Fade>
        <Fade delay={200}>
          <div style={{ overflowX: 'auto', marginTop: 32 }}>
            <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: '100%', maxWidth: chartW, height: 'auto', display: 'block' }}>
              {/* Grid lines */}
              {[0, 50000, 100000, 150000, 200000].map(p => (
                <g key={p}>
                  <line x1={padL} y1={yScale(p)} x2={chartW - padR} y2={yScale(p)} stroke={C.border} strokeWidth={0.5} />
                  <text x={padL - 8} y={yScale(p) + 3} textAnchor="end" fontFamily={F.mono} fontSize={9} fill={C.muted}>
                    {p === 0 ? '0' : `${p / 1000}k`}
                  </text>
                </g>
              ))}
              {/* Area */}
              <path
                d={`M${DECLINE.map(d => `${xScale(d.year)},${yScale(d.population)}`).join(' L')} L${xScale(2025)},${yScale(0)} L${xScale(1900)},${yScale(0)} Z`}
                fill="#E63946" fillOpacity={0.08}
              />
              {/* Line */}
              <path
                d={`M${DECLINE.map(d => `${xScale(d.year)},${yScale(d.population)}`).join(' L')}`}
                fill="none" stroke="#E63946" strokeWidth={2}
              />
              {/* Points */}
              {DECLINE.map((d, i) => (
                <g key={i}>
                  <circle cx={xScale(d.year)} cy={yScale(d.population)} r={3} fill="#E63946" />
                  {(i === 0 || i === 3 || i === DECLINE.length - 1) && (
                    <text x={xScale(d.year)} y={chartH - 8} textAnchor="middle" fontFamily={F.mono} fontSize={9} fill={C.muted}>{d.year}</text>
                  )}
                </g>
              ))}
              {/* Year axis */}
              {[1920, 1940, 1960, 1980, 2000].map(y => (
                <text key={y} x={xScale(y)} y={chartH - 8} textAnchor="middle" fontFamily={F.mono} fontSize={8} fill={C.border}>{y}</text>
              ))}
            </svg>
          </div>
        </Fade>

        {/* Key moments below chart */}
        <div style={{ marginTop: 32 }}>
          {DECLINE.filter((_, i) => [0, 1, 3, 8, 11].includes(i)).map((d, i) => (
            <Fade key={i} delay={i * 60}>
              <div style={{ padding: '12px 0', borderBottom: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '60px auto 1fr', gap: 16, alignItems: 'baseline' }}>
                <span style={{ fontFamily: F.serif, fontSize: 16, fontStyle: 'italic', color: C.ink }}>{d.year}</span>
                <span style={{ fontFamily: F.serif, fontSize: 16, fontStyle: 'italic', color: '#E63946' }}>{(d.population / 1000).toFixed(0)}k</span>
                <span style={{ fontFamily: F.mono, fontSize: 12, color: C.mid }}>{d.label}</span>
              </div>
            </Fade>
          ))}
        </div>
      </Section>

      {/* ═══ TIMELINE ═══ */}
      <Section bg={C.alt}>
        <Fade>
          <Micro>100,000 Years</Micro>
          <SectionTitle>From Bizmoune to Pilsen</SectionTitle>
        </Fade>

        <Fade delay={100}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { key: 'all', label: 'All' },
              { key: 'ancient', label: 'Ancient' },
              { key: 'roman', label: 'Roman' },
              { key: 'royal', label: 'Royal' },
              { key: 'extinction', label: 'Extinction' },
              { key: 'conservation', label: 'Conservation' },
            ].map(f => (
              <button key={f.key} onClick={() => setTimeFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: timeFilter === f.key ? (f.key === 'all' ? C.ink : TYPE_COLORS[f.key] || C.ink) : 'transparent',
                color: timeFilter === f.key ? '#fff' : C.muted,
                border: `1px solid ${timeFilter === f.key ? 'transparent' : C.border}`,
              }}>
                {f.label}
              </button>
            ))}
          </div>
        </Fade>

        <div>
          {filtered.map((e, i) => (
            <Fade key={`${e.sortYear}-${i}`} delay={i * 30}>
              <div onClick={() => setExpandedEvent(expandedEvent === i ? null : i)} style={{
                padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
                display: 'grid', gridTemplateColumns: 'clamp(80px, 12vw, 120px) 1fr', gap: 16,
              }}>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 15, fontStyle: 'italic', color: C.ink, lineHeight: 1.2 }}>{e.year}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 4, color: TYPE_COLORS[e.type] }}>{e.type}</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: C.ink, lineHeight: 1.4 }}>{e.title}</div>
                  <div style={{ maxHeight: expandedEvent === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                    <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, paddingTop: 8 }}>{e.detail}</p>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Section>

      {/* ═══ THE CONNECTION ═══ */}
      <Section>
        <Fade>
          <Micro color="#E63946">The Connection</Micro>
          <SectionTitle>Morocco's lion</SectionTitle>
          <Body>Morocco's national football team is called Les Lions de l'Atlas. The lion appears on the national coat of arms. The Barbary lion is the country's most famous extinct animal — and possibly its most powerful living symbol.</Body>
          <Body>The descendants in Rabat Zoo are not museum specimens. They are a breeding population with an active studbook, managed transfers between European zoos, and a Moroccan government that has discussed reintroduction feasibility. A conference was planned for late 2025 or early 2026 to evaluate returning the Atlas lion to its mountains.</Body>
          <Body>Slow Morocco is named for this animal. Not the African lion of the Serengeti documentary, but the Atlas lion of the Moroccan mountains — the one that was lost, preserved by kings, and might one day return.</Body>
        </Fade>
      </Section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ padding: '64px 24px', background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      {/* ═══ ATTRIBUTION ═══ */}
      <section style={{ padding: '24px', background: C.alt, textAlign: 'center' as const }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>
          Sources: IUCN Red List, University of Kent Barbary Lion Project, PNAS, Britannica, Rabat National Zoo
        </p>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted, marginTop: 4 }}>&copy; Slow Morocco</p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Last Lions</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · Cultural Intelligence</span>
          </div>
        </div>
        <div style={{ background: '#161616', padding: '20px 24px', textAlign: 'center' as const }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>&copy; {new Date().getFullYear()} Slow Morocco · J. Ng</span>
        </div>
        <div style={{ background: '#0e0e0e', padding: '12px 24px' }} />
      </footer>
    </div>
  )
}
