'use client'

import { useState, useEffect, useRef } from 'react'
import { COMPARISON, HAPLOGROUPS, TIMELINE, LOCATIONS, BIBLIOGRAPHY } from './data'

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  mid: '#262626', muted: '#737373', border: '#e5e5e5',
}
const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
const SAHARA = '#C4963C', ARCTIC = '#48BFE3', REFUGE = '#E63946', SHARED = '#8B5CF6', GREEN = '#2D6E4F'

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
  return <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.85, color: C.body, marginBottom: 20, maxWidth: 640 }}>{children}</p>
}
function Sec({ children, bg = C.bg }: { children: React.ReactNode; bg?: string }) {
  return <section style={{ background: bg, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}><div style={{ maxWidth: 900, margin: '0 auto' }}>{children}</div></section>
}

export function TheSharedGrandmotherContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapFilter, setMapFilter] = useState<'all' | 'amazigh' | 'sami' | 'refuge'>('all')
  const [dnaFilter, setDnaFilter] = useState<'all' | 'paternal' | 'maternal'>('all')
  const [expandedDna, setExpandedDna] = useState<number | null>(null)
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const filteredDna = dnaFilter === 'all' ? HAPLOGROUPS : HAPLOGROUPS.filter(h => h.type === dnaFilter)

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
        center: [10, 45], zoom: 2.8, minZoom: 2, maxZoom: 10, attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        const colors: Record<string, string> = { amazigh: SAHARA, sami: ARCTIC, refuge: REFUGE, route: SHARED }
        LOCATIONS.forEach((loc, i) => {
          map.addSource(`loc-${i}`, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: loc.coords } } })
          map.addLayer({ id: `loc-${i}`, type: 'circle', source: `loc-${i}`,
            paint: { 'circle-radius': loc.type === 'refuge' ? 12 : 8, 'circle-color': colors[loc.type] || C.muted, 'circle-opacity': 0.85, 'circle-stroke-width': 2.5, 'circle-stroke-color': '#fff' } })
        })
        // Draw line from refuge to Gibraltar to Atlas — the southern route
        map.addSource('route-south', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[-1.0, 43.5], [-5.6, 35.95], [-6.0, 31.5], [4.0, 36.7], [2.0, 17.0]] } } })
        map.addLayer({ id: 'route-south', type: 'line', source: 'route-south', paint: { 'line-color': SAHARA, 'line-width': 2, 'line-opacity': 0.4, 'line-dasharray': [4, 4] } })
        // Draw line from refuge north to Scandinavia
        map.addSource('route-north', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[-1.0, 43.5], [5.0, 50.0], [15.0, 60.0], [19.8, 66.6], [25.0, 70.0], [35.0, 68.0]] } } })
        map.addLayer({ id: 'route-north', type: 'line', source: 'route-north', paint: { 'line-color': ARCTIC, 'line-width': 2, 'line-opacity': 0.4, 'line-dasharray': [4, 4] } })
        mapRef.current = map
      })
    })
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  useEffect(() => {
    const map = mapRef.current; if (!map || !map.isStyleLoaded()) return
    LOCATIONS.forEach((loc, i) => {
      try {
        if (map.getLayer(`loc-${i}`)) {
          const show = mapFilter === 'all' || loc.type === mapFilter || (mapFilter === 'refuge' && (loc.type === 'refuge' || loc.type === 'route'))
          map.setPaintProperty(`loc-${i}`, 'circle-opacity', show ? 0.85 : 0.08)
          map.setPaintProperty(`loc-${i}`, 'circle-stroke-color', show ? '#fff' : 'transparent')
        }
      } catch {}
    })
    try {
      if (map.getLayer('route-south')) map.setPaintProperty('route-south', 'line-opacity', (mapFilter === 'all' || mapFilter === 'amazigh' || mapFilter === 'refuge') ? 0.4 : 0.05)
      if (map.getLayer('route-north')) map.setPaintProperty('route-north', 'line-opacity', (mapFilter === 'all' || mapFilter === 'sami' || mapFilter === 'refuge') ? 0.4 : 0.05)
    } catch {}
  }, [mapFilter])

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <Fade><Micro>Module · Genetics & Identity</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            The Shared<br />Grandmother
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 560 }}>
            <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Amazigh</span> & Sámi. Sahara & Arctic.<br />
            One mitochondrial DNA branch. 9,000 years.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '9,000', label: 'years since the branch split', color: SHARED },
              { n: 'U5b1b', label: 'the shared maternal lineage', color: REFUGE },
              { n: '5,000 km', label: 'between the Sahara and Sápmi', color: C.ink },
              { n: '2', label: 'peoples. One grandmother.', color: GREEN },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: s.color, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4, maxWidth: 140 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ INTRO ═══ */}
      <Sec>
        <Fade>
          <Body>Twenty thousand years ago, ice covers northern Europe. Scandinavia is buried under three kilometres of glacier. The Sahara is a desert. Between them, in the southwest corner of what will eventually be called France, a small population of humans shelters in limestone caves along the Dordogne and the Cantabrian coast. They paint bison on walls. They bury their dead with ochre. They carry a mitochondrial DNA lineage called U5b.</Body>
          <Body>When the ice retreats, they move. Some go north, following the Atlantic coast, reaching Scandinavia within a few thousand years. Some go south, crossing the Strait of Gibraltar into North Africa. They carry the same maternal signature. Over the next 9,000 years, they become two of the most genetically distinct populations on their respective continents. One herds reindeer in the Arctic. The other herds camels in the Sahara. They speak unrelated languages. They have never met.</Body>
          <Body>But in 2005, a team of geneticists sequenced their mitochondrial DNA and found the branch. Achilli et al., published in the American Journal of Human Genetics, titled the paper exactly what it was: "Saami and Berbers — An Unexpected Mitochondrial DNA Link."</Body>
        </Fade>
      </Sec>

      {/* ═══ MAP ═══ */}
      <section style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: '48px 24px 24px', maxWidth: 900, margin: '0 auto' }}>
          <Fade>
            <Micro color={SHARED}>The Geography</Micro>
            <Title>One refuge, two directions</Title>
          </Fade>
          <Fade delay={100}>
            <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 16 }}>
              {[
                { key: 'all' as const, label: 'All', color: C.ink },
                { key: 'refuge' as const, label: 'The Refuge', color: REFUGE },
                { key: 'amazigh' as const, label: 'Amazigh South', color: SAHARA },
                { key: 'sami' as const, label: 'Sámi North', color: ARCTIC },
              ].map(f => (
                <button key={f.key} onClick={() => setMapFilter(f.key)} style={{
                  fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                  background: mapFilter === f.key ? f.color : 'transparent',
                  color: mapFilter === f.key ? '#fff' : C.muted,
                  border: `1px solid ${mapFilter === f.key ? f.color : C.border}`,
                }}>{f.label}</button>
              ))}
            </div>
          </Fade>
        </div>
        <div ref={mapContainer} style={{ width: '100%', height: 'clamp(400px, 55vw, 600px)', background: '#f5f5f5' }} />
        <div style={{ padding: '16px 24px 40px', maxWidth: 900, margin: '0 auto', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { color: REFUGE, label: 'Franco-Cantabrian refuge' },
            { color: SAHARA, label: 'Amazigh territory' },
            { color: ARCTIC, label: 'Sámi territory' },
            { color: SHARED, label: 'Migration route' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}>{l.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ THE DNA ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={SHARED}>The Genetics</Micro>
          <Title>Different fathers, same mother</Title>
          <Body>The Amazigh and the Sámi have completely different paternal DNA. E-M81 (Amazigh) originated in North Africa. N1c (Sámi) originated in Siberia. These men have no shared paternal ancestor for tens of thousands of years. But through the maternal line — mitochondrial DNA, passed from mother to daughter — the connection is unmistakable.</Body>
        </Fade>
        <Fade delay={100}>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { key: 'all' as const, label: 'All', color: C.ink },
              { key: 'paternal' as const, label: 'Paternal (Y-DNA)', color: SAHARA },
              { key: 'maternal' as const, label: 'Maternal (mtDNA)', color: SHARED },
            ].map(f => (
              <button key={f.key} onClick={() => setDnaFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 14px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: dnaFilter === f.key ? f.color : 'transparent',
                color: dnaFilter === f.key ? '#fff' : C.muted,
                border: `1px solid ${dnaFilter === f.key ? f.color : C.border}`,
              }}>{f.label}</button>
            ))}
          </div>
        </Fade>
        {filteredDna.map((h, i) => {
          const peopleColors: Record<string, string> = { amazigh: SAHARA, sami: ARCTIC, shared: SHARED }
          return (
            <Fade key={h.name} delay={i * 40}>
              <div onClick={() => setExpandedDna(expandedDna === i ? null : i)} style={{
                padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: F.serif, fontSize: 20, fontStyle: 'italic', color: C.ink }}>{h.name}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: peopleColors[h.people], textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                    {h.people === 'shared' ? 'Shared' : h.people === 'amazigh' ? 'Amazigh' : 'Sámi'}
                  </span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}>{h.type}</span>
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 2 }}>
                  Origin: {h.origin} · Age: {h.age} · Frequency: {h.frequency}
                </div>
                <div style={{ maxHeight: expandedDna === i ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.body, paddingTop: 8 }}>{h.detail}</p>
                </div>
              </div>
            </Fade>
          )
        })}
      </Sec>

      {/* ═══ COMPARISON TABLE ═══ */}
      <Sec>
        <Fade>
          <Micro color={GREEN}>The Comparison</Micro>
          <Title>Sahara and Arctic, side by side</Title>
        </Fade>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 600 }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 1, marginBottom: 1 }}>
              <div style={{ padding: 12, background: C.alt }} />
              <div style={{ padding: 12, background: SAHARA + '15' }}>
                <span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 700, color: SAHARA, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Amazigh</span>
              </div>
              <div style={{ padding: 12, background: ARCTIC + '15' }}>
                <span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 700, color: ARCTIC, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Sámi</span>
              </div>
            </div>
            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <Fade key={i} delay={i * 15}>
                <div onClick={() => setExpandedRow(expandedRow === i ? null : i)} style={{
                  display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 1, cursor: row.note ? 'pointer' : 'default',
                }}>
                  <div style={{ padding: '10px 12px', background: C.alt, borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 600, color: C.ink }}>{row.label}</span>
                  </div>
                  <div style={{ padding: '10px 12px', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontFamily: F.mono, fontSize: 12, color: C.body, lineHeight: 1.6 }}>{row.amazigh}</span>
                  </div>
                  <div style={{ padding: '10px 12px', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontFamily: F.mono, fontSize: 12, color: C.body, lineHeight: 1.6 }}>{row.sami}</span>
                  </div>
                </div>
                {row.note && (
                  <div style={{ maxHeight: expandedRow === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                    <div style={{ padding: '8px 12px 16px', background: SHARED + '08' }}>
                      <p style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.7, color: SHARED }}>{row.note}</p>
                    </div>
                  </div>
                )}
              </Fade>
            ))}
          </div>
        </div>
      </Sec>

      {/* ═══ TIMELINE ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={REFUGE}>Timeline</Micro>
          <Title>From the ice to the paper</Title>
        </Fade>
        {TIMELINE.map((e, i) => {
          const typeColors: Record<string, string> = { glacial: ARCTIC, migration: SAHARA, genetic: SHARED, modern: GREEN }
          return (
            <Fade key={`${e.sortYear}-${i}`} delay={i * 30}>
              <div onClick={() => setExpandedEvent(expandedEvent === i ? null : i)} style={{
                padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
                display: 'grid', gridTemplateColumns: 'clamp(100px, 14vw, 140px) 1fr', gap: 16,
              }}>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 15, fontStyle: 'italic', color: C.ink, lineHeight: 1.2 }}>{e.year}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 4, color: typeColors[e.type] }}>{e.type}</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: C.ink }}>{e.title}</div>
                  <div style={{ maxHeight: expandedEvent === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                    <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.body, paddingTop: 8 }}>{e.detail}</p>
                  </div>
                </div>
              </div>
            </Fade>
          )
        })}
      </Sec>

      {/* ═══ THE PATTERN ═══ */}
      <Sec>
        <Fade>
          <Micro color={GREEN}>The Pattern</Micro>
          <Title>What the genome reveals</Title>
          <Body>Two indigenous peoples at opposite ends of a continent. Both are genetic outliers — the Amazigh within African populations, the Sámi within European ones. Both survived by decentralisation: tribal confederations, not empires. Both were absorbed by every state that surrounded them and outlasted all of them. Both were subjected to forced assimilation — Arabisation in the south, Norwegianisation in the north. Both retained their languages, their identities, their genetic distinctiveness.</Body>
          <Body>And both carry the same pattern in their DNA: ancient maternal lineages from Ice Age Europe, overlaid with newer paternal lineages from completely different directions. The Amazigh mothers stayed. Arab and earlier fathers arrived. The Sámi mothers stayed. Siberian and Scandinavian fathers arrived. In both cases, the women were there first. The grandmothers remember what the grandfathers forgot.</Body>
          <Body>The genome does not know about borders. It does not know about empires or languages or religions. It knows who moved and who stayed. It knows that 9,000 years ago, a woman in southwestern France had descendants. Some went north. Some went south. They became the free people and the people of the north. They never met again. But the mitochondria remember.</Body>
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
          Sources: Achilli et al. (2005), Tambets et al. (2004), Reguig et al. (2014), Solé-Morata et al. (2017).
        </p>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted, marginTop: 4 }}>© Slow Morocco</p>
      </section>

      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Shared Grandmother</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · Genetics & Identity</span>
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
