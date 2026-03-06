'use client'

import { useState, useEffect, useRef } from 'react'
import { ROUTE, ROUTE_COORDS, ATTRITION, BATTLES, ELEPHANTS, TIMELINE, BIBLIOGRAPHY } from './data'

/* ═══════════════════════════════════════════════════
   HANNIBAL'S MARCH
   37 Elephants Across the Alps · 218 BC
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

const PHASE_COLORS: Record<string, string> = {
  carthage: '#E63946', spain: '#C4963C', pyrenees: '#8B7355',
  gaul: '#5E60CE', rhone: '#48BFE3', alps: '#2D6E4F', italy: '#722F37',
}

const TYPE_COLORS: Record<string, string> = {
  politics: '#5E60CE', march: '#C4963C', battle: '#E63946', aftermath: '#722F37',
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

function Section({ children, bg = C.bg }: { children: React.ReactNode; bg?: string }) {
  return <section style={{ background: bg, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}><div style={{ maxWidth: 800, margin: '0 auto' }}>{children}</div></section>
}

export function HannibalsMarchContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [activeWaypoint, setActiveWaypoint] = useState(0)
  const [timeFilter, setTimeFilter] = useState('all')
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [expandedBattle, setExpandedBattle] = useState<number | null>(null)

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
        center: [5, 42], zoom: 3.8, minZoom: 2, maxZoom: 12,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // Route line
        map.addSource('route', {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: ROUTE_COORDS } }
        })
        map.addLayer({
          id: 'route-line', type: 'line', source: 'route',
          paint: { 'line-color': '#E63946', 'line-width': 2.5, 'line-opacity': 0.6, 'line-dasharray': [4, 3] }
        })

        // Waypoints
        ROUTE.forEach((w, i) => {
          const isBattle = w.event.toLowerCase().includes('battle')
          map.addSource(`wp-${i}`, {
            type: 'geojson',
            data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: w.coords } }
          })
          map.addLayer({
            id: `wp-${i}`, type: 'circle', source: `wp-${i}`,
            paint: {
              'circle-radius': isBattle ? 7 : 5,
              'circle-color': PHASE_COLORS[w.phase],
              'circle-opacity': 0.9,
              'circle-stroke-width': isBattle ? 2 : 1,
              'circle-stroke-color': isBattle ? '#E63946' : '#ffffff',
            }
          })
        })

        // Battle labels
        BATTLES.forEach((b, i) => {
          map.addSource(`battle-${i}`, {
            type: 'geojson',
            data: { type: 'Feature', properties: { name: b.name }, geometry: { type: 'Point', coordinates: b.coords } }
          })
          map.addLayer({
            id: `battle-label-${i}`, type: 'symbol', source: `battle-${i}`,
            layout: {
              'text-field': ['get', 'name'],
              'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
              'text-size': 10, 'text-offset': [0, -1.5], 'text-anchor': 'bottom',
            },
            paint: { 'text-color': '#E63946', 'text-halo-color': '#ffffff', 'text-halo-width': 1.5 }
          })
        })

        mapRef.current = map
      })
    })
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  // Fly to active waypoint
  useEffect(() => {
    const map = mapRef.current; if (!map) return
    const w = ROUTE[activeWaypoint]
    map.flyTo({ center: w.coords, zoom: w.phase === 'alps' ? 7 : w.phase === 'italy' ? 6 : 5, duration: 1200 })
  }, [activeWaypoint])

  // ── ATTRITION CHART (SVG) ──
  const chartW = 700, chartH = 240, padL = 55, padR = 20, padT = 20, padB = 40
  const maxTroops = 102000
  const aX = (x: number) => padL + (x / 100) * (chartW - padL - padR)
  const aY = (n: number) => padT + ((maxTroops - n) / maxTroops) * (chartH - padT - padB)

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <Fade><Micro>Module · Military History</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            Hannibal's March
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 560 }}>
            37 elephants. 1,600 kilometres. Over the Alps in winter. Into the heart of Rome.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '218 BC', label: 'Year of the crossing' },
              { n: '37', label: 'War elephants at departure' },
              { n: '1', label: 'Elephant survived to Cannae' },
              { n: '5 months', label: 'Cartagena to the Po Valley' },
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
          <Body>In 218 BC, a 28-year-old Carthaginian general named Hannibal Barca assembled one of the largest armies the ancient world had ever seen — 90,000 infantry, 12,000 cavalry, and 37 war elephants — and marched them overland from Spain to Italy.</Body>
          <Body>Rome controlled the sea. So Hannibal took the land. Across the Pyrenees. Through Gaul. Over the Rhône. And then, in late October, he did what the Romans believed was impossible: he took his army — elephants and all — over the Alps.</Body>
          <Body>He arrived in Italy with a fraction of his force. And then he spent the next sixteen years on Roman soil, winning battle after battle, never losing a major engagement, destroying entire legions. At Cannae, he killed 50,000 Roman soldiers in a single afternoon — the worst defeat Rome would ever suffer.</Body>
          <Body>He never took Rome. But he changed the course of Mediterranean civilisation. And it all started in North Africa — in Carthage, modern-day Tunisia, 150 kilometres from where the Slow Morocco ecosystem begins.</Body>
        </Fade>
      </Section>

      {/* ═══ MAP + WAYPOINT NAVIGATOR ═══ */}
      <section style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: '48px 24px 24px', maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <Micro>The Route</Micro>
            <SectionTitle><span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Carthage</span> to Cannae</SectionTitle>
          </Fade>
        </div>

        <div ref={mapContainer} style={{ width: '100%', height: 'clamp(400px, 55vw, 600px)', background: '#f5f5f5' }} />

        {/* Waypoint selector */}
        <div style={{ padding: '32px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
          {/* Phase legend */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              { key: 'carthage', label: 'Carthage' }, { key: 'spain', label: 'Spain' },
              { key: 'pyrenees', label: 'Pyrenees' }, { key: 'gaul', label: 'Gaul' },
              { key: 'rhone', label: 'Rhône' }, { key: 'alps', label: 'Alps' }, { key: 'italy', label: 'Italy' },
            ].map(p => (
              <div key={p.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: PHASE_COLORS[p.key] }} />
                <span style={{ fontFamily: F.mono, fontSize: 9, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: C.muted }}>{p.label}</span>
              </div>
            ))}
          </div>

          {/* Waypoint cards — horizontal scroll with arrows */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => setActiveWaypoint(Math.max(0, activeWaypoint - 1))} style={{
              width: 36, height: 36, border: `1px solid ${C.border}`, background: 'transparent',
              cursor: activeWaypoint === 0 ? 'default' : 'pointer', opacity: activeWaypoint === 0 ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: 16, color: C.mid, flexShrink: 0,
            }}>&#8249;</button>

            <div style={{ flex: 1, borderLeft: `3px solid ${PHASE_COLORS[ROUTE[activeWaypoint].phase]}`, padding: '20px 24px', background: C.alt, transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: PHASE_COLORS[ROUTE[activeWaypoint].phase] }}>{ROUTE[activeWaypoint].phase}</span>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}>{activeWaypoint + 1} / {ROUTE.length}</span>
              </div>
              <div style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontStyle: 'italic', color: C.ink, marginBottom: 4 }}>{ROUTE[activeWaypoint].name}</div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginBottom: 12 }}>
                {ROUTE[activeWaypoint].modernName} · {ROUTE[activeWaypoint].date}
              </div>
              <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, marginBottom: 16 }}>{ROUTE[activeWaypoint].event}</p>
              <div style={{ display: 'flex', gap: 24 }}>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted }}>Army</div>
                  <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, color: C.ink }}>{ROUTE[activeWaypoint].troops}</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted }}>Elephants</div>
                  <div style={{ fontFamily: F.serif, fontSize: 24, fontStyle: 'italic', color: ROUTE[activeWaypoint].elephants <= 5 ? '#E63946' : C.ink }}>{ROUTE[activeWaypoint].elephants}</div>
                </div>
              </div>
            </div>

            <button onClick={() => setActiveWaypoint(Math.min(ROUTE.length - 1, activeWaypoint + 1))} style={{
              width: 36, height: 36, border: `1px solid ${C.border}`, background: 'transparent',
              cursor: activeWaypoint === ROUTE.length - 1 ? 'default' : 'pointer', opacity: activeWaypoint === ROUTE.length - 1 ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: 16, color: C.mid, flexShrink: 0,
            }}>&#8250;</button>
          </div>
        </div>
      </section>

      {/* ═══ ELEPHANT TRACKER ═══ */}
      <Section bg={C.alt}>
        <Fade>
          <Micro color="#C4963C">The Elephants</Micro>
          <SectionTitle>37 to 1</SectionTitle>
          <Body>The elephants were likely North African forest elephants — a now-extinct species smaller than African savannah elephants but larger than Asian elephants. Hannibal's last surviving elephant, Surus ("The Syrian"), was a one-tusked Asian elephant. He rode it with a howdah after losing an eye at Lake Trasimene.</Body>
        </Fade>

        <div style={{ marginTop: 40 }}>
          {ELEPHANTS.map((e, i) => (
            <Fade key={i} delay={i * 60}>
              <div style={{ padding: '20px 0', borderBottom: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '60px 1fr', gap: 20, alignItems: 'start' }}>
                <div style={{ textAlign: 'center' as const }}>
                  <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: e.count <= 5 ? '#E63946' : C.ink, lineHeight: 1 }}>{e.count}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, color: C.muted, marginTop: 2 }}>alive</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 4 }}>{e.phase}</div>
                  <p style={{ fontFamily: F.mono, fontSize: 12, lineHeight: 1.7, color: C.mid }}>{e.note}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        {/* Visual bar showing decline */}
        <Fade delay={500}>
          <div style={{ marginTop: 40, display: 'flex', gap: 2, height: 32 }}>
            {Array.from({ length: 37 }, (_, i) => {
              const alive = i < 1 ? '#E63946' : i < 5 ? '#E6394640' : i < 15 ? '#E6394625' : i < 20 ? '#E6394615' : '#E6394608'
              return <div key={i} style={{ flex: 1, background: alive, transition: 'all 0.5s ease' }} title={`Elephant ${37 - i}`} />
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: C.muted }}>Surus (the last)</span>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: C.muted }}>37 at departure</span>
          </div>
        </Fade>
      </Section>

      {/* ═══ ARMY ATTRITION CHART ═══ */}
      <Section>
        <Fade>
          <Micro color="#E63946">Attrition</Micro>
          <SectionTitle>90,000 to 26,000 — then rebuilt</SectionTitle>
        </Fade>
        <Fade delay={200}>
          <div style={{ overflowX: 'auto', marginTop: 32 }}>
            <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: '100%', maxWidth: chartW, height: 'auto', display: 'block' }}>
              {/* Grid */}
              {[0, 25000, 50000, 75000, 100000].map(p => (
                <g key={p}>
                  <line x1={padL} y1={aY(p)} x2={chartW - padR} y2={aY(p)} stroke={C.border} strokeWidth={0.5} />
                  <text x={padL - 8} y={aY(p) + 3} textAnchor="end" fontFamily={F.mono} fontSize={9} fill={C.muted}>
                    {p === 0 ? '0' : `${p / 1000}k`}
                  </text>
                </g>
              ))}

              {/* Infantry area */}
              <path
                d={`M${ATTRITION.map(a => `${aX(a.x)},${aY(a.infantry + a.cavalry)}`).join(' L')} L${aX(100)},${aY(0)} L${aX(0)},${aY(0)} Z`}
                fill="#C4963C" fillOpacity={0.12}
              />
              {/* Infantry line */}
              <path
                d={`M${ATTRITION.map(a => `${aX(a.x)},${aY(a.infantry + a.cavalry)}`).join(' L')}`}
                fill="none" stroke="#C4963C" strokeWidth={2}
              />

              {/* Points + labels */}
              {ATTRITION.map((a, i) => (
                <g key={i}>
                  <circle cx={aX(a.x)} cy={aY(a.infantry + a.cavalry)} r={3} fill="#C4963C" />
                  <text x={aX(a.x)} y={chartH - 8} textAnchor="middle" fontFamily={F.mono} fontSize={8} fill={C.muted}>
                    {a.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Fade>
      </Section>

      {/* ═══ BATTLES ═══ */}
      <Section bg={C.alt}>
        <Fade>
          <Micro color="#E63946">Four Battles</Micro>
          <SectionTitle>Ticinus. Trebia. Trasimene. Cannae.</SectionTitle>
        </Fade>

        <div style={{ marginTop: 32 }}>
          {BATTLES.map((b, i) => (
            <Fade key={i} delay={i * 100}>
              <div onClick={() => setExpandedBattle(expandedBattle === i ? null : i)} style={{
                padding: '28px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontStyle: 'italic', color: C.ink }}>{b.name}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>{b.date}</span>
                </div>
                <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.7, color: C.mid }}>{b.significance}</p>

                <div style={{ maxHeight: expandedBattle === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <div style={{ paddingTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted }}>Roman losses</div>
                      <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: '#E63946' }}>{b.romanLosses}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted }}>Carthaginian losses</div>
                      <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: C.ink }}>{b.carthaginianLosses}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted }}>Elephants present</div>
                      <div style={{ fontFamily: F.serif, fontSize: 20, fontStyle: 'italic', color: b.elephantsPresent <= 5 ? '#E63946' : C.ink }}>{b.elephantsPresent}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted }}>Location</div>
                      <div style={{ fontFamily: F.mono, fontSize: 13, color: C.mid }}>{b.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Section>

      {/* ═══ TIMELINE ═══ */}
      <Section>
        <Fade>
          <Micro>264 BC – 146 BC</Micro>
          <SectionTitle>From the oath to the ashes</SectionTitle>
        </Fade>

        <Fade delay={100}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { key: 'all', label: 'All' },
              { key: 'politics', label: 'Politics' },
              { key: 'march', label: 'The March' },
              { key: 'battle', label: 'Battles' },
              { key: 'aftermath', label: 'Aftermath' },
            ].map(f => (
              <button key={f.key} onClick={() => setTimeFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: timeFilter === f.key ? (f.key === 'all' ? C.ink : TYPE_COLORS[f.key]) : 'transparent',
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
                display: 'grid', gridTemplateColumns: 'clamp(90px, 14vw, 130px) 1fr', gap: 16,
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
      <Section bg={C.alt}>
        <Fade>
          <Micro color="#E63946">The Connection</Micro>
          <SectionTitle>Carthage is 150 km from the Slow Morocco ecosystem</SectionTitle>
          <Body>Hannibal was born in Carthage — modern-day Tunis, Tunisia. The ruins of Carthage sit on the Mediterranean coast, a short flight from Marrakech. Tunisia is in the Slow World pipeline. This is not ancient history happening somewhere else. This is the neighbourhood.</Body>
          <Body>The war elephants were North African forest elephants — the same species that once roamed the Atlas Mountains, now extinct. The Barbary lion that once lived in these same forests is now gone. North Africa was once teeming with megafauna that shaped Mediterranean civilisation — and then vanished.</Body>
          <Body>Hannibal's march is the greatest logistics story ever told. A man from North Africa — from this part of the world — assembled the largest army of his era and walked it into the heart of the world's most powerful empire. He did it overland because the sea was denied to him. He did it with elephants because psychological warfare is older than gunpowder. And he nearly won.</Body>
        </Fade>
      </Section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ padding: '64px 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
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
          Sources: Polybius, Livy, Britannica, Stanford Alpine Archaeology, PBS Secrets of the Dead
        </p>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted, marginTop: 4 }}>&copy; Slow Morocco</p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Hannibal's March</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · Military History</span>
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
