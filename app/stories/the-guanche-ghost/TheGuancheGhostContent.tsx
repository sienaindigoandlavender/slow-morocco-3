'use client'

import { useState, useEffect, useRef } from 'react'
import { ISLANDS, MENCEYATOS, DNA_MARKERS, GENETIC_ASYMMETRY, SURVIVALS, TIMELINE, BIBLIOGRAPHY } from './data'

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  mid: '#262626', muted: '#737373', border: '#e5e5e5',
}
const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
const BLOOD = '#8B2500', GOLD = '#C4963C', ASH = '#737373', GREEN = '#2D6E4F', VIOLET = '#5E60CE', SEA = '#2C6E8F'

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

export function TheGuancheGhostContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [expandedIsland, setExpandedIsland] = useState<number | null>(null)
  const [expandedMencey, setExpandedMencey] = useState<number | null>(null)
  const [expandedDna, setExpandedDna] = useState<number | null>(null)
  const [expandedSurvival, setExpandedSurvival] = useState<number | null>(null)
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [timelineFilter, setTimelineFilter] = useState<string>('all')
  const [survivalFilter, setSurvivalFilter] = useState<string>('all')

  const filteredTimeline = timelineFilter === 'all' ? TIMELINE : TIMELINE.filter(e => e.type === timelineFilter)
  const filteredSurvivals = survivalFilter === 'all' ? SURVIVALS : SURVIVALS.filter(s => s.status === survivalFilter)

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
        center: [-15.5, 28.5], zoom: 7.2, minZoom: 5, maxZoom: 12, attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        // Morocco coastline reference
        map.addSource('morocco', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-9.8, 31.8] } } })
        map.addLayer({ id: 'morocco', type: 'circle', source: 'morocco', paint: { 'circle-radius': 6, 'circle-color': GOLD, 'circle-opacity': 0.6, 'circle-stroke-width': 2, 'circle-stroke-color': '#fff' } })
        // Crossing line
        map.addSource('crossing', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[-9.8, 31.8], [-13.63, 29.05]] } } })
        map.addLayer({ id: 'crossing', type: 'line', source: 'crossing', paint: { 'line-color': GOLD, 'line-width': 1.5, 'line-opacity': 0.3, 'line-dasharray': [6, 4] } })
        // Islands
        ISLANDS.forEach((isl, i) => {
          const color = isl.conquestYear <= 1405 ? ASH : isl.conquestYear <= 1493 ? BLOOD : '#0a0a0a'
          map.addSource(`isl-${i}`, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: isl.coords } } })
          map.addLayer({ id: `isl-${i}`, type: 'circle', source: `isl-${i}`, paint: { 'circle-radius': isl.name === 'Tenerife' || isl.name === 'Gran Canaria' ? 12 : 8, 'circle-color': color, 'circle-opacity': 0.85, 'circle-stroke-width': 2.5, 'circle-stroke-color': '#fff' } })
        })
        mapRef.current = map
      })
    })
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <Fade><Micro>Module · Genetics & History</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            The Guanche<br />Ghost
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 580 }}>
            <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Berber</span> DNA in the Atlantic. A people who forgot the sea.<br />
            Europe's first colonial genocide.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '7', label: 'islands. 94 years of conquest.', color: BLOOD },
              { n: '~80,000', label: 'Guanche at first European contact', color: C.ink },
              { n: '0', label: 'distinct Guanche population remaining', color: ASH },
              { n: '16–55%', label: 'of modern Canarian DNA is Guanche', color: GREEN },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: s.color, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4, maxWidth: 160 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ INTRO ═══ */}
      <Sec>
        <Fade>
          <Body>Sometime around the first millennium BCE, Berber-speaking peoples from North Africa reach a chain of volcanic islands 100 kilometres off the Moroccan coast. They bring goats, sheep, barley, and pottery. They do not bring metal. They do not bring wheels. They do not, apparently, bring the ability to build seagoing boats — or if they do, they lose it. Over the next two thousand years, they are marooned. Seven islands, each developing its own dialect, its own governance, its own way of burying the dead. They have no contact with the mainland. They do not know the rest of the world exists.</Body>
          <Body>In 1341, a Genoese captain named Nicoloso da Recco maps the archipelago. He brings four islanders back to Lisbon. European merchants see an easy source of slaves. In 1402, the invasion begins. By 1496, every island has fallen. By 1600, the Guanche — as a people, as a language, as a culture — are gone.</Body>
          <Body>Their DNA survived. Their mummies survived. A whistled language survives on one island, now carrying Spanish instead of Guanche. A toasted grain flour called gofio survives in every kitchen. And the E-M183 haplogroup — the same Berber marker found at 80–98% in Moroccan Amazigh populations — survives in 8.3% of modern Canarian men. The ghost is in the blood.</Body>
        </Fade>
      </Sec>

      {/* ═══ MAP ═══ */}
      <section style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: '48px 24px 24px', maxWidth: 900, margin: '0 auto' }}>
          <Fade>
            <Micro color={BLOOD}>The Archipelago</Micro>
            <Title>Seven islands, one by one</Title>
          </Fade>
        </div>
        <div ref={mapContainer} style={{ width: '100%', height: 'clamp(380px, 50vw, 550px)', background: '#f5f5f5' }} />
        <div style={{ padding: '16px 24px 8px', maxWidth: 900, margin: '0 auto', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { color: ASH, label: 'Fell early (1402–1405)' },
            { color: BLOOD, label: 'Fell mid-conquest (1478–1493)' },
            { color: '#0a0a0a', label: 'Last to fall (1496)' },
            { color: GOLD, label: 'Morocco (origin)' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}>{l.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ISLAND CARDS ═══ */}
      <section style={{ padding: '24px 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        {ISLANDS.map((isl, i) => (
          <Fade key={isl.name} delay={i * 30}>
            <div onClick={() => setExpandedIsland(expandedIsland === i ? null : i)} style={{
              padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: F.serif, fontSize: 20, fontStyle: 'italic', color: C.ink }}>{isl.name}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}>{isl.nativeName} · {isl.nativePeople}</span>
                </div>
                <span style={{ fontFamily: F.serif, fontSize: 16, fontStyle: 'italic', color: BLOOD }}>{isl.conquestYear}</span>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 2 }}>
                {isl.area}{isl.population ? ` · ${isl.population}` : ''}{isl.menceyatos ? ` · ${isl.menceyatos} menceyatos` : ''}
              </div>
              <div style={{ maxHeight: expandedIsland === i ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.body, paddingTop: 8 }}>{isl.detail}</p>
              </div>
            </div>
          </Fade>
        ))}
      </section>

      {/* ═══ THE NINE MENCEYATOS ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.ink}>Tenerife</Micro>
          <Title>The nine kingdoms</Title>
          <Body>Tenerife — the last island — was divided into nine menceyatos, each ruled by a mencey (king) advised by a tagoror (council of elders). When the Spanish came, some allied. Some resisted. Both were destroyed.</Body>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 1, marginTop: 16 }}>
          {MENCEYATOS.map((m, i) => {
            const stanceColors = { resistance: BLOOD, alliance: ASH, neutral: C.muted }
            return (
              <Fade key={m.name} delay={i * 30}>
                <div onClick={() => setExpandedMencey(expandedMencey === i ? null : i)} style={{
                  padding: 16, background: C.bg, cursor: 'pointer', borderLeft: `3px solid ${stanceColors[m.stance]}`,
                }}>
                  <div style={{ fontFamily: F.serif, fontSize: 17, fontStyle: 'italic', color: C.ink }}>{m.name}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, color: stanceColors[m.stance], letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginTop: 2 }}>{m.stance} · {m.mencey}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, marginTop: 2 }}>{m.territory}</div>
                  <div style={{ maxHeight: expandedMencey === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                    <p style={{ fontFamily: F.mono, fontSize: 12, lineHeight: 1.7, color: C.body, paddingTop: 8 }}>{m.detail}</p>
                  </div>
                </div>
              </Fade>
            )
          })}
        </div>
      </Sec>

      {/* ═══ DNA ═══ */}
      <Sec>
        <Fade>
          <Micro color={VIOLET}>The DNA</Micro>
          <Title>The men were replaced. The women survived.</Title>
          <Body>The genetic signature of colonisation is sex-biased. In the Canary Islands, as in the Americas, indigenous male lineages were destroyed — killed in battle, enslaved, deported — and replaced by European ones. Indigenous female lineages survived at much higher rates, absorbed through forced marriage and sexual violence. The genome records what the chronicles do not.</Body>
        </Fade>

        {/* Asymmetry table */}
        <Fade delay={100}>
          <div style={{ marginBottom: 40 }}>
            {GENETIC_ASYMMETRY.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, marginBottom: 1 }}>
                <div style={{ padding: '10px 12px', background: C.alt }}>
                  <span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 600, color: C.ink }}>{row.label}</span>
                </div>
                <div style={{ padding: '10px 12px', background: GOLD + '10' }}>
                  <span style={{ fontFamily: F.mono, fontSize: 12, color: GOLD, fontWeight: 600 }}>{row.indigenous}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}> indigenous</span>
                </div>
                <div style={{ padding: '10px 12px', background: ASH + '10' }}>
                  <span style={{ fontFamily: F.mono, fontSize: 12, color: C.body, fontWeight: 600 }}>{row.european}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}> european</span>
                </div>
              </div>
            ))}
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, marginTop: 8 }}>
              Indigenous ancestry by island: La Gomera 55.5% · La Palma 41.0% · Gran Canaria 16–31% · Tenerife 22.0% · El Hierro 0%
            </div>
          </div>
        </Fade>

        {/* DNA markers */}
        {DNA_MARKERS.map((d, i) => (
          <Fade key={d.name} delay={i * 25}>
            <div onClick={() => setExpandedDna(expandedDna === i ? null : i)} style={{
              padding: '16px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.serif, fontSize: 17, fontStyle: 'italic', color: C.ink }}>{d.name}</span>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: d.type === 'paternal' ? SEA : VIOLET, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{d.type} · {d.context}</span>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 2 }}>
                Ancient: {d.ancientFreq} → Modern: {d.modernFreq}
              </div>
              <div style={{ maxHeight: expandedDna === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.body, paddingTop: 8 }}>{d.detail}</p>
              </div>
            </div>
          </Fade>
        ))}
      </Sec>

      {/* ═══ WHAT SURVIVED ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={GREEN}>What Survived</Micro>
          <Title>The ghost in the blood, the whistle, the flour</Title>
        </Fade>
        <Fade delay={50}>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { key: 'all', label: 'All' },
              { key: 'alive', label: 'Still alive' },
              { key: 'trace', label: 'Trace' },
              { key: 'extinct', label: 'Extinct' },
            ].map(f => (
              <button key={f.key} onClick={() => setSurvivalFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 14px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: survivalFilter === f.key ? GREEN : 'transparent',
                color: survivalFilter === f.key ? '#fff' : C.muted,
                border: `1px solid ${survivalFilter === f.key ? GREEN : C.border}`,
              }}>{f.label}</button>
            ))}
          </div>
        </Fade>
        {filteredSurvivals.map((s, i) => {
          const statusColors = { alive: GREEN, trace: GOLD, extinct: BLOOD }
          return (
            <Fade key={s.name} delay={i * 25}>
              <div onClick={() => setExpandedSurvival(expandedSurvival === i ? null : i)} style={{
                padding: '16px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: F.serif, fontSize: 17, fontStyle: 'italic', color: C.ink }}>{s.name}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: statusColors[s.status], letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{s.status}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}>{s.type}</span>
                </div>
                <div style={{ maxHeight: expandedSurvival === i ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.body, paddingTop: 8 }}>{s.detail}</p>
                </div>
              </div>
            </Fade>
          )
        })}
      </Sec>

      {/* ═══ TIMELINE ═══ */}
      <Sec>
        <Fade>
          <Micro color={BLOOD}>Timeline</Micro>
          <Title>From arrival to erasure</Title>
        </Fade>
        <Fade delay={50}>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { key: 'all', label: 'All', color: C.ink },
              { key: 'settlement', label: 'Settlement', color: GOLD },
              { key: 'contact', label: 'Contact', color: SEA },
              { key: 'conquest', label: 'Conquest', color: BLOOD },
              { key: 'aftermath', label: 'Aftermath', color: ASH },
              { key: 'modern', label: 'Modern', color: GREEN },
            ].map(f => (
              <button key={f.key} onClick={() => setTimelineFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 14px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: timelineFilter === f.key ? f.color : 'transparent',
                color: timelineFilter === f.key ? '#fff' : C.muted,
                border: `1px solid ${timelineFilter === f.key ? f.color : C.border}`,
              }}>{f.label}</button>
            ))}
          </div>
        </Fade>
        {filteredTimeline.map((e, i) => {
          const typeColors: Record<string, string> = { settlement: GOLD, contact: SEA, conquest: BLOOD, aftermath: ASH, modern: GREEN }
          return (
            <Fade key={`${e.sortYear}-${i}`} delay={i * 20}>
              <div onClick={() => setExpandedEvent(expandedEvent === i ? null : i)} style={{
                padding: '16px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
                display: 'grid', gridTemplateColumns: 'clamp(90px, 13vw, 130px) 1fr', gap: 16,
              }}>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 14, fontStyle: 'italic', color: C.ink, lineHeight: 1.2 }}>{e.year}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 3, color: typeColors[e.type] }}>{e.type}</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: C.ink }}>{e.title}</div>
                  <div style={{ maxHeight: expandedEvent === i ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                    <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.body, paddingTop: 8 }}>{e.detail}</p>
                  </div>
                </div>
              </div>
            </Fade>
          )
        })}
      </Sec>

      {/* ═══ THE TEMPLATE ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={BLOOD}>The Template</Micro>
          <Title>Before the Americas, there were the Canaries</Title>
          <Body>The Cambridge World History of Genocide devotes an entire chapter to the Canary Islands. Not because the death toll was the largest — it was not. But because it was the first. Enslavement, deportation, disease, sugar plantations, forced conversion, sexual violence, the replacement of indigenous male lineages by European ones — every tool of New World colonialism was prototyped here, on seven volcanic islands 100 km off the Moroccan coast, between 1402 and 1496.</Body>
          <Body>Columbus stopped at La Gomera in 1492 to resupply. The Guanche were still fighting on Tenerife. He watched the template running and then carried it across the ocean. The encomienda system used on the Canaries was exported directly to Hispaniola. The sugar economy built on Guanche and African slave labour was replicated in Brazil. The model worked. They scaled it.</Body>
          <Body>And the Guanche? A people who shared DNA with every Berber in the Atlas Mountains. Who mummified their dead in volcanic caves. Who governed by council, wrestled in sand rings, and communicated across ravines with a whistle that carries five kilometres. Who held out for ninety-four years against mounted soldiers with swords and arquebuses, using stones and wooden spears. Whose last king jumped from a cliff rather than kneel.</Body>
          <Body>They are in the gofio on every Canarian table. They are in the E-M183 of every eighth Canarian man. They are in the U6b1a of the women. They are in the whistle of La Gomera — six sounds, two vowels, four consonants, 4,000 words, UNESCO heritage, taught in every school, carrying Spanish now because the language it was built for is dead.</Body>
          <Body>The people are gone. The ghost remains.</Body>
        </Fade>
      </Sec>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ padding: '64px 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px', background: C.alt, textAlign: 'center' as const }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>
          Sources: Rodríguez-Varela et al. (2017), Maca-Meyer et al. (2004), Fregel et al. (2009), Adhikari (2017), Conversi (2020), UNESCO (2009).
        </p>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted, marginTop: 4 }}>Slow Morocco</p>
      </section>

      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Guanche Ghost</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · Genetics & History</span>
          </div>
        </div>
        <div style={{ background: '#161616', padding: '20px 24px', textAlign: 'center' as const }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Slow Morocco · J. Ng</span>
        </div>
        <div style={{ background: '#0e0e0e', padding: '12px 24px' }} />
      </footer>
    </div>
  )
}
