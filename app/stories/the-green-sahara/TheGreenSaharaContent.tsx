'use client'

import { useState, useEffect, useRef } from 'react'
import { LAKES, RIVERS, FAUNA, ROCK_ART, TIMELINE, SCALE, ORBITAL, BIBLIOGRAPHY } from './data'

/* ═══════════════════════════════════════════════════
   THE GREEN SAHARA
   The African Humid Period · 11,000–5,000 years ago
   Prequel to "The Dust That Feeds"
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
const GREEN = '#2D6E4F', WATER = '#48BFE3', SAND = '#C4963C', RED = '#E63946', ROCK = '#8B7355'

function useInView(t = 0.12) {
  const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect() } }, { threshold: t }); o.observe(el); return () => o.disconnect() }, [t])
  return { ref, v }
}
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, v } = useInView(); return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms` }}>{children}</div>
}
function Micro({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color, marginBottom: 16 }}>{children}</div>
}
function Title({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>{children}</h2>
}
function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.85, color: C.mid, marginBottom: 20, maxWidth: 640 }}>{children}</p>
}
function Sec({ children, bg = C.bg }: { children: React.ReactNode; bg?: string }) {
  return <section style={{ background: bg, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}><div style={{ maxWidth: 800, margin: '0 auto' }}>{children}</div></section>
}

// Animated counter
function Counter({ end, suffix = '', prefix = '', duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const { ref, v } = useInView()
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!v) return; let start = 0; const step = end / (duration / 16)
    const id = setInterval(() => { start += step; if (start >= end) { setVal(end); clearInterval(id) } else setVal(Math.floor(start)) }, 16)
    return () => clearInterval(id)
  }, [v, end, duration])
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>
}

export function TheGreenSaharaContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapLayer, setMapLayer] = useState<'lakes' | 'rivers' | 'rockart'>('lakes')
  const [faunaFilter, setFaunaFilter] = useState('all')
  const [timeFilter, setTimeFilter] = useState('all')
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [expandedLake, setExpandedLake] = useState<number | null>(null)

  const filteredFauna = faunaFilter === 'all' ? FAUNA : FAUNA.filter(a => a.category === faunaFilter)
  const filteredTime = timeFilter === 'all' ? TIMELINE : TIMELINE.filter(e => e.type === timeFilter)

  // ── MAPBOX ──
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const l = document.createElement('link'); l.rel = 'stylesheet'
        l.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'; document.head.appendChild(l)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [12, 22], zoom: 3.2, minZoom: 2, maxZoom: 10, attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // Lakes
        LAKES.forEach((lk, i) => {
          map.addSource(`lake-${i}`, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: lk.coords } } })
          map.addLayer({ id: `lake-${i}`, type: 'circle', source: `lake-${i}`,
            paint: { 'circle-radius': lk.name.includes('Mega-Chad') ? 20 : 10, 'circle-color': WATER, 'circle-opacity': 0, 'circle-blur': 0.4 } })
        })
        // Rivers
        RIVERS.forEach((r, i) => {
          map.addSource(`river-${i}`, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: r.path } } })
          map.addLayer({ id: `river-${i}`, type: 'line', source: `river-${i}`,
            paint: { 'line-color': WATER, 'line-width': 2, 'line-opacity': 0 } })
        })
        // Rock art
        ROCK_ART.forEach((r, i) => {
          map.addSource(`rock-${i}`, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: r.coords } } })
          map.addLayer({ id: `rock-${i}`, type: 'circle', source: `rock-${i}`,
            paint: { 'circle-radius': 7, 'circle-color': ROCK, 'circle-opacity': 0, 'circle-stroke-width': 2, 'circle-stroke-color': ROCK, 'circle-stroke-opacity': 0 } })
        })
        mapRef.current = map
      })
    })
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  useEffect(() => {
    const map = mapRef.current; if (!map || !map.isStyleLoaded()) return
    const setO = (id: string, prop: string, val: number) => { try { if (map.getLayer(id)) map.setPaintProperty(id, prop, val) } catch {} }

    LAKES.forEach((_, i) => setO(`lake-${i}`, 'circle-opacity', 0))
    RIVERS.forEach((_, i) => setO(`river-${i}`, 'line-opacity', 0))
    ROCK_ART.forEach((_, i) => { setO(`rock-${i}`, 'circle-opacity', 0); setO(`rock-${i}`, 'circle-stroke-opacity', 0) })

    if (mapLayer === 'lakes') {
      LAKES.forEach((_, i) => setO(`lake-${i}`, 'circle-opacity', 0.5))
      map.flyTo({ center: [14, 18], zoom: 3.8, duration: 1200 })
    } else if (mapLayer === 'rivers') {
      RIVERS.forEach((_, i) => setO(`river-${i}`, 'line-opacity', 0.7))
      LAKES.forEach((_, i) => setO(`lake-${i}`, 'circle-opacity', 0.25))
      map.flyTo({ center: [12, 24], zoom: 3.5, duration: 1200 })
    } else {
      ROCK_ART.forEach((_, i) => { setO(`rock-${i}`, 'circle-opacity', 0.8); setO(`rock-${i}`, 'circle-stroke-opacity', 0.8) })
      map.flyTo({ center: [10, 23], zoom: 4, duration: 1200 })
    }
  }, [mapLayer])

  // SVG chart dimensions
  const chartW = 700, chartH = 200, padL = 50, padR = 20, padT = 20, padB = 40
  const maxBar = SCALE[0].areaKm2

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <Fade><Micro>Module · Earth Systems · Prequel</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            The Green Sahara
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 560 }}>
            The world before the dust. When the desert was a garden and the largest lake on earth was full of life.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: <Counter end={9} suffix="M km²" />, label: 'Green Sahara at peak' },
              { n: <Counter end={400} suffix="K km²" />, label: 'Lake Mega-Chad' },
              { n: <Counter end={230} suffix="+" />, label: 'Green cycles in 8M years' },
              { n: '~200 yrs', label: 'Speed of the collapse' },
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
      <Sec>
        <Fade>
          <Body>Eleven thousand years ago, the Sahara is green. Not metaphorically green. Actually, physically, overwhelmingly green. Rivers run through it — wide, permanent rivers full of crocodiles and Nile perch. Lakes cover the interior, the largest of them bigger than all the Great Lakes combined. Hippos wade in water that is now sand. Elephants browse on acacia trees that will not exist for another six millennia.</Body>
          <Body>This is the African Humid Period. It happens because the earth wobbles. A slow, 21,000-year cycle in the planet's axial tilt shifts how much solar energy hits the Northern Hemisphere in summer. When the tilt is right, the African monsoon strengthens. Rain falls on the Sahara. Grass grows. Then shrubs. Then trees. Then animals. Then people.</Body>
          <Body>It has happened over 230 times in the last 8 million years. The Sahara breathes — green, desert, green, desert — on the rhythm of the earth's orbit. The last green period ended roughly 5,000 years ago. In geological terms, it ended this morning.</Body>
        </Fade>
      </Sec>

      {/* ═══ MAP ═══ */}
      <section style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: '48px 24px 24px', maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <Micro color={GREEN}>The Landscape</Micro>
            <Title>Lakes, rivers, and the world's largest art museum</Title>
          </Fade>
          <Fade delay={100}>
            <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 16 }}>
              {([
                { key: 'lakes' as const, label: 'Ancient Lakes', color: WATER },
                { key: 'rivers' as const, label: 'Ghost Rivers', color: WATER },
                { key: 'rockart' as const, label: 'Rock Art Sites', color: ROCK },
              ]).map(m => (
                <button key={m.key} onClick={() => setMapLayer(m.key)} style={{
                  fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                  background: mapLayer === m.key ? m.color : 'transparent',
                  color: mapLayer === m.key ? '#fff' : C.muted,
                  border: `1px solid ${mapLayer === m.key ? m.color : C.border}`,
                }}>{m.label}</button>
              ))}
            </div>
          </Fade>
        </div>
        <div ref={mapContainer} style={{ width: '100%', height: 'clamp(400px, 55vw, 600px)', background: '#f5f5f5' }} />
        <div style={{ padding: '32px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
          {mapLayer === 'lakes' && LAKES.map((lk, i) => (
            <div key={i} onClick={() => setExpandedLake(expandedLake === i ? null : i)} style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink }}>{lk.name}</span>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: WATER }}>{lk.areaKm2} km²</span>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: RED, marginTop: 2 }}>{lk.status}</div>
              <div style={{ maxHeight: expandedLake === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                <p style={{ fontFamily: F.mono, fontSize: 12, lineHeight: 1.7, color: C.mid, paddingTop: 8 }}>{lk.detail}</p>
              </div>
            </div>
          ))}
          {mapLayer === 'rivers' && RIVERS.map((r, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: F.serif, fontSize: 16, fontStyle: 'italic', color: C.ink }}>{r.name}</span>
              <p style={{ fontFamily: F.mono, fontSize: 12, lineHeight: 1.7, color: C.mid, marginTop: 4 }}>{r.detail}</p>
            </div>
          ))}
          {mapLayer === 'rockart' && ROCK_ART.map((r, i) => (
            <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ fontFamily: F.serif, fontSize: 16, fontStyle: 'italic', color: C.ink }}>{r.name}</span>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: ROCK, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{r.country}</span>
              </div>
              <p style={{ fontFamily: F.mono, fontSize: 12, lineHeight: 1.7, color: C.mid, marginTop: 4 }}>{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SCALE COMPARISON ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={WATER}>Scale</Micro>
          <Title>How big was Mega-Chad?</Title>
        </Fade>
        <Fade delay={200}>
          <div style={{ marginTop: 32 }}>
            {SCALE.map((s, i) => {
              const { ref, v } = useInView()
              const pct = (s.areaKm2 / maxBar) * 100
              return (
                <div key={i} ref={ref} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: C.ink }}>{s.label}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 12, color: C.muted }}>{s.areaKm2.toLocaleString()} km²</span>
                  </div>
                  <div style={{ width: '100%', height: 24, background: C.border, position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                      width: v ? `${Math.max(pct, 0.3)}%` : '0%',
                      height: '100%', background: s.color, transition: 'width 1.5s cubic-bezier(0.25,0.46,0.45,0.94)',
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
          <Body>Lake Mega-Chad was 400,000 km². All five Great Lakes together are 244,000 km². Today's Lake Chad — what remains — is 1,350 km². That is a 99.66% reduction.</Body>
        </Fade>
      </Sec>

      {/* ═══ FAUNA ═══ */}
      <Sec>
        <Fade>
          <Micro color={GREEN}>The Animals</Micro>
          <Title>What lived in the Green Sahara</Title>
          <Body>The fossil record and rock art together paint a picture of a landscape teeming with life. Herds of animals that we now associate only with East African safari — elephants, giraffes, hippos, wildebeest — once covered the Sahara from the Atlantic to the Nile.</Body>
        </Fade>
        <Fade delay={100}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { key: 'all', label: 'All' }, { key: 'megafauna', label: 'Megafauna' },
              { key: 'aquatic', label: 'Aquatic' }, { key: 'savannah', label: 'Savannah' }, { key: 'predator', label: 'Predators' },
            ].map(f => (
              <button key={f.key} onClick={() => setFaunaFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: faunaFilter === f.key ? GREEN : 'transparent',
                color: faunaFilter === f.key ? '#fff' : C.muted,
                border: `1px solid ${faunaFilter === f.key ? GREEN : C.border}`,
              }}>{f.label}</button>
            ))}
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 1 }}>
          {filteredFauna.map((a, i) => (
            <Fade key={a.name} delay={i * 40}>
              <div style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink, marginBottom: 4 }}>{a.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: GREEN, marginBottom: 6 }}>{a.category}</div>
                <p style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.7, color: C.mid }}>{a.evidence}</p>
              </div>
            </Fade>
          ))}
        </div>
      </Sec>

      {/* ═══ THE DRYING ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={SAND}>The Drying</Micro>
          <Title>Then the earth wobbled the other way</Title>
          <Body>The same orbital cycle that created the Green Sahara destroyed it. As the axial tilt shifted, less solar energy hit the Northern Hemisphere in summer. The monsoon weakened. The rain retreated south. And a landscape that had been green for 6,000 years became a desert in roughly 200.</Body>
        </Fade>
        <Fade delay={100}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { key: 'all', label: 'All' }, { key: 'wet', label: 'Wet' },
              { key: 'transition', label: 'Transition' }, { key: 'dry', label: 'Dry' }, { key: 'consequence', label: 'Consequence' },
            ].map(f => {
              const colors: Record<string, string> = { all: C.ink, wet: GREEN, transition: SAND, dry: RED, consequence: '#5E60CE' }
              return (
                <button key={f.key} onClick={() => setTimeFilter(f.key)} style={{
                  fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                  background: timeFilter === f.key ? colors[f.key] : 'transparent',
                  color: timeFilter === f.key ? '#fff' : C.muted,
                  border: `1px solid ${timeFilter === f.key ? colors[f.key] : C.border}`,
                }}>{f.label}</button>
              )
            })}
          </div>
        </Fade>
        <div>
          {filteredTime.map((e, i) => {
            const colors: Record<string, string> = { wet: GREEN, transition: SAND, dry: RED, consequence: '#5E60CE' }
            return (
              <Fade key={`${e.sortYear}-${i}`} delay={i * 40}>
                <div onClick={() => setExpandedEvent(expandedEvent === i ? null : i)} style={{
                  padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
                  display: 'grid', gridTemplateColumns: 'clamp(90px, 13vw, 130px) 1fr', gap: 16,
                }}>
                  <div>
                    <div style={{ fontFamily: F.serif, fontSize: 15, fontStyle: 'italic', color: C.ink, lineHeight: 1.2 }}>{e.year}</div>
                    <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 4, color: colors[e.type] }}>{e.type}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: C.ink }}>{e.title}</div>
                    <div style={{ maxHeight: expandedEvent === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                      <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, paddingTop: 8 }}>{e.detail}</p>
                    </div>
                  </div>
                </div>
              </Fade>
            )
          })}
        </div>
      </Sec>

      {/* ═══ THE CONNECTION ═══ */}
      <Sec>
        <Fade>
          <Micro color="#5E60CE">The Connection</Micro>
          <Title>The dead lake feeds the living forest</Title>
          <Body>When Lake Mega-Chad dried, it left behind a bed of diatomite — the fossilised silica shells of billions of diatoms that had lived in its water. That diatomite now sits in the Bodélé Depression, the lowest point in central Africa, pinched between the Tibesti and Ennedi mountains.</Body>
          <Body>Wind funnels through the gap between the mountains and rakes across the dry lake bed. On an average winter day, 700,000 tons of dust are lifted into the air. The dust — made of dead diatoms, rich in phosphorus, iron, and silica — is carried west on the trade winds, across the Atlantic, 5,000 kilometres, to the Amazon rainforest.</Body>
          <Body>182 million tons per year. 27.7 million tons land on the Amazon. The phosphorus in that dust replaces exactly what the rainforest loses to rain each year. The largest living forest on earth is fertilised by the largest dead lake on earth.</Body>
          <Body>This is a prequel. The next chapter is <span style={{ color: '#5E60CE', textDecoration: 'underline' }}>The Dust That Feeds</span>. The sequel is <span style={{ color: '#5E60CE', textDecoration: 'underline' }}>The Phosphate Equation</span>.</Body>
        </Fade>
      </Sec>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ padding: '64px 24px', background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px', background: C.alt, textAlign: 'center' as const }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>
          Sources: NASA Earth Observatory, Nature Scitable, CALIPSO, Tierney et al., deMenocal et al., Schuster et al.
        </p>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted, marginTop: 4 }}>© Slow Morocco</p>
      </section>

      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Green Sahara</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · Earth Systems</span>
          </div>
        </div>
        <div style={{ background: '#161616', padding: '20px 24px', textAlign: 'center' as const }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} Slow Morocco · J. Ng</span>
        </div>
        <div style={{ background: '#0e0e0e', padding: '12px 24px' }} />
      </footer>
    </div>
  )
}
