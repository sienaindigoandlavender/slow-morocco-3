'use client'

import { useState, useEffect, useRef } from 'react'
import { PLACES, CAMPAIGN_ROUTE, DYNASTY, CALENDARS, TRADITIONS, TIMELINE, BIBLIOGRAPHY } from './data'

/* ═══════════════════════════════════════════════════
   YENNAYER
   The Berber Pharaoh & the 3,000-Year Calendar
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
  origin: '#C4963C', dynasty: '#5E60CE', campaign: '#E63946', celebration: '#2D6E4F',
  sheshonq: '#5E60CE', calendar: '#2D6E4F', recognition: '#C4963C', tradition: '#8B7355',
}

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

export function YennayerContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapLayer, setMapLayer] = useState<'dynasty' | 'campaign' | 'celebration'>('dynasty')
  const [timeFilter, setTimeFilter] = useState('all')
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [activePharaoh, setActivePharaoh] = useState(0)

  const filtered = timeFilter === 'all' ? TIMELINE : TIMELINE.filter(e => e.type === timeFilter)

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
        center: [15, 32], zoom: 3.5, minZoom: 2, maxZoom: 10, attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // Campaign route
        map.addSource('campaign-route', {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: CAMPAIGN_ROUTE } }
        })
        map.addLayer({ id: 'campaign-line', type: 'line', source: 'campaign-route',
          paint: { 'line-color': '#E63946', 'line-width': 2, 'line-opacity': 0, 'line-dasharray': [4, 3] } })

        // Points
        PLACES.forEach((p, i) => {
          map.addSource(`place-${i}`, {
            type: 'geojson',
            data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: p.coords } }
          })
          map.addLayer({ id: `place-${i}`, type: 'circle', source: `place-${i}`,
            paint: { 'circle-radius': 6, 'circle-color': TYPE_COLORS[p.type], 'circle-opacity': 0, 'circle-stroke-width': 1.5, 'circle-stroke-color': TYPE_COLORS[p.type], 'circle-stroke-opacity': 0 } })
        })
        mapRef.current = map
      })
    })
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  useEffect(() => {
    const map = mapRef.current; if (!map || !map.isStyleLoaded()) return
    const show = (id: string, o: number) => { try { if (map.getLayer(id)) { map.setPaintProperty(id, 'circle-opacity', o); map.setPaintProperty(id, 'circle-stroke-opacity', o) } } catch {} }
    const showLine = (id: string, o: number) => { try { if (map.getLayer(id)) map.setPaintProperty(id, 'line-opacity', o) } catch {} }

    // Reset
    PLACES.forEach((_, i) => show(`place-${i}`, 0))
    showLine('campaign-line', 0)

    if (mapLayer === 'dynasty') {
      PLACES.forEach((p, i) => { if (p.type === 'origin' || p.type === 'dynasty') show(`place-${i}`, 0.9) })
      map.flyTo({ center: [31.5, 28], zoom: 5, duration: 1200 })
    } else if (mapLayer === 'campaign') {
      PLACES.forEach((p, i) => { if (p.type === 'campaign' || p.type === 'origin') show(`place-${i}`, 0.9) })
      showLine('campaign-line', 0.6)
      map.flyTo({ center: [33, 31], zoom: 5.5, duration: 1200 })
    } else if (mapLayer === 'celebration') {
      PLACES.forEach((p, i) => { if (p.type === 'celebration') show(`place-${i}`, 0.9) })
      map.flyTo({ center: [5, 32], zoom: 3.5, duration: 1200 })
    }
  }, [mapLayer])

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <Fade><Micro>Module · Culture & Identity</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            Yennayer
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 560 }}>
            The <span className="underline underline-offset-2">Berber</span> pharaoh. The 3,000-year calendar. The oldest New Year still celebrated.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '943 BC', label: 'Sheshonq takes the throne' },
              { n: '2976', label: 'Current Amazigh year' },
              { n: '200+', label: 'Years of Libyan dynasty' },
              { n: 'Jan 13', label: 'Yennayer (Morocco)' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 32, fontStyle: 'italic', color: C.ink, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ THE PHARAOH ═══ */}
      <Sec>
        <Fade>
          <Micro color="#5E60CE">I · The Pharaoh</Micro>
          <Title>A Berber on the throne of Egypt</Title>
          <Body>In 943 BC, a man named Sheshonq became Pharaoh of Egypt. He was not Egyptian. He was Meshwesh — a Libyan Amazigh. His family had migrated from the western desert into the Nile Delta generations earlier, rising through the military ranks until they controlled the army itself. Sheshonq was commander-in-chief of all Egyptian forces before he ever wore the double crown.</Body>
          <Body>He married his son into the previous royal family to legitimise the transition. He appointed another son as High Priest of Amun at Thebes — the most powerful religious post in Egypt. He chose as his royal name Hedjkheperre Setepenre, and added the epithet meryamun: "Beloved of Amun." A Berber chief, speaking the language of pharaohs.</Body>
          <Body>He founded the 22nd Dynasty. It would rule Egypt for over 200 years — longer than many purely Egyptian dynasties. Four more pharaohs would bear his name. The dynasty is sometimes called the "Bubastite Dynasty" after its seat in Bubastis, or simply the "Libyan Dynasty."</Body>
        </Fade>
      </Sec>

      {/* ═══ THE INVASION ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color="#E63946">II · The Invasion</Micro>
          <Title>Shishak king of Egypt came up against Jerusalem</Title>
          <Body>Around 925 BC, Sheshonq launched a military campaign into the Levant — modern-day Israel and Palestine. The Hebrew Bible records this invasion in the Book of Kings: "Shishak king of Egypt came up against Jerusalem" and took the treasures of Solomon's temple and the royal palace.</Body>
          <Body>Sheshonq's own account, carved on the Bubastite Portal at the great Temple of Karnak, lists over 150 conquered towns. A victory stele was erected at Megiddo — the site later mythologised as Armageddon. The relief at Karnak is six metres tall and still visible today, nearly 3,000 years later.</Body>
          <Body>His son Osorkon I would later boast of offering 383 tons of gold and silver to the gods of Egypt. Sheshonq II was buried in a coffin of pure silver. Scholars have wondered where an African dynasty acquired such wealth. One answer: the treasury of Solomon.</Body>
        </Fade>
      </Sec>

      {/* ═══ MAP ═══ */}
      <section style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: '48px 24px 24px', maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <Micro>Three Maps</Micro>
            <Title>The dynasty. The campaign. The celebration.</Title>
          </Fade>
          <Fade delay={100}>
            <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 16 }}>
              {([
                { key: 'dynasty' as const, label: '22nd Dynasty', color: '#5E60CE' },
                { key: 'campaign' as const, label: 'Levantine Campaign', color: '#E63946' },
                { key: 'celebration' as const, label: 'Yennayer Today', color: '#2D6E4F' },
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
          {/* Context cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 1 }}>
            {PLACES.filter(p => {
              if (mapLayer === 'dynasty') return p.type === 'origin' || p.type === 'dynasty'
              if (mapLayer === 'campaign') return p.type === 'campaign'
              return p.type === 'celebration'
            }).map((p, i) => (
              <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: TYPE_COLORS[p.type], flexShrink: 0 }} />
                  <span style={{ fontFamily: F.serif, fontSize: 16, fontStyle: 'italic', color: C.ink }}>{p.name}</span>
                </div>
                <p style={{ fontFamily: F.mono, fontSize: 12, lineHeight: 1.7, color: C.mid, marginLeft: 16 }}>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE DYNASTY ═══ */}
      <Sec>
        <Fade>
          <Micro color="#5E60CE">The 22nd Dynasty</Micro>
          <Title>Six pharaohs. 200 years. Libyan blood on the throne of the Nile.</Title>
        </Fade>
        <div style={{ marginTop: 32 }}>
          {DYNASTY.map((p, i) => (
            <Fade key={i} delay={i * 60}>
              <div onClick={() => setActivePharaoh(i)} style={{
                padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
                display: 'grid', gridTemplateColumns: 'clamp(100px, 15vw, 160px) 1fr', gap: 16,
              }}>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: i === 0 ? '#5E60CE' : C.ink }}>{p.name}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, marginTop: 2 }}>{p.reign}</div>
                </div>
                <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.7, color: C.mid }}>{p.note}</p>
              </div>
            </Fade>
          ))}
        </div>
      </Sec>

      {/* ═══ THE CALENDAR ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color="#2D6E4F">III · The Calendar</Micro>
          <Title>950 BCE becomes Year 1</Title>
          <Body>In 1980, Algerian scholar Ammar Negadi proposed a formal Amazigh calendar with Sheshonq's accession as its epoch. The choice was political: it anchored Amazigh identity in a moment of sovereignty — a Berber ruling the most powerful civilisation on earth. The calendar counts from that throne.</Body>
          <Body>The word Yennayer itself comes from yan (one) and ayyur (month) — "the first month." It falls on January 12 or 13 in the Gregorian calendar, derived from the old Julian calendar that North African farmers used for centuries to track agricultural seasons.</Body>
        </Fade>

        {/* Calendar comparison */}
        <Fade delay={200}>
          <div style={{ marginTop: 40 }}>
            {CALENDARS.map((c, i) => (
              <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '120px 1fr 80px', gap: 16, alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, color: c.color }}>{c.name}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}>{c.type}</div>
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.mid }}>{c.epoch}</div>
                <div style={{ fontFamily: F.serif, fontSize: 24, fontStyle: 'italic', color: C.ink, textAlign: 'right' as const }}>{c.currentYear}</div>
              </div>
            ))}
          </div>
        </Fade>
      </Sec>

      {/* ═══ TRADITIONS ═══ */}
      <Sec>
        <Fade>
          <Micro color="#C4963C">IV · The Table</Micro>
          <Title>How Yennayer is celebrated</Title>
          <Body>Yennayer is a feast of the land. The customs vary by region, but the core is the same everywhere: a communal meal richer than everyday fare, prepared from the bounty of the earth, shared from a single bowl. A hidden token — a date pit, an almond — determines who carries the blessing for the year.</Body>
        </Fade>

        <div style={{ marginTop: 32 }}>
          {TRADITIONS.map((t, i) => (
            <Fade key={i} delay={i * 50}>
              <div style={{ padding: '24px 0', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: F.serif, fontSize: 20, fontStyle: 'italic', color: C.ink }}>{t.region}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#2D6E4F' }}>{t.country}</span>
                  <span style={{ fontFamily: F.serif, fontSize: 14, fontStyle: 'italic', color: '#C4963C', marginLeft: 'auto' }}>{t.greeting}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 4 }}>The dish</div>
                    <p style={{ fontFamily: F.mono, fontSize: 12, lineHeight: 1.7, color: C.mid }}>{t.dish}</p>
                  </div>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 4 }}>The ritual</div>
                    <p style={{ fontFamily: F.mono, fontSize: 12, lineHeight: 1.7, color: C.mid }}>{t.ritual}</p>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Sec>

      {/* ═══ TIMELINE ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro>1200 BC – 2026</Micro>
          <Title>From the Delta to the national holiday</Title>
        </Fade>
        <Fade delay={100}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { key: 'all', label: 'All' }, { key: 'sheshonq', label: 'Sheshonq' },
              { key: 'calendar', label: 'Calendar' }, { key: 'recognition', label: 'Recognition' },
            ].map(f => (
              <button key={f.key} onClick={() => setTimeFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: timeFilter === f.key ? (f.key === 'all' ? C.ink : TYPE_COLORS[f.key]) : 'transparent',
                color: timeFilter === f.key ? '#fff' : C.muted,
                border: `1px solid ${timeFilter === f.key ? 'transparent' : C.border}`,
              }}>{f.label}</button>
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
      </Sec>

      {/* ═══ THE CONNECTION ═══ */}
      <Sec>
        <Fade>
          <Micro color="#2D6E4F">The Connection</Micro>
          <Title>The calendar that says: we were here first</Title>
          <Body>The Amazigh calendar is a political act disguised as a date. When Ammar Negadi chose Sheshonq's accession as Year 1, he was not making a claim about ancient history. He was making a claim about present identity. The Amazigh were not conquered people who arrived after the Arabs, the French, or anyone else. They were the people who conquered Egypt.</Body>
          <Body>Every January 13, when families across Morocco, Algeria, Tunisia, Libya, and the Sahara prepare the communal meal, hide the date pit in the porridge, and greet each other with "Aseggas Ameggaz," they are saying something older than any nation-state on the continent: we were here before all of it, and we are still here.</Body>
          <Body>Yennayer 2976 fell on January 13, 2026. The Amazigh calendar is 950 years older than the Gregorian one. It counts from the day a Berber chief from the Nile Delta became the most powerful man on earth.</Body>
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

      {/* ═══ ATTRIBUTION ═══ */}
      <section style={{ padding: '24px', background: C.alt, textAlign: 'center' as const }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>
          Sources: Britannica, Kitchen (1996), Hebrew Bible, Karnak inscriptions, Morocco World News, Middle East Eye
        </p>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted, marginTop: 4 }}>© Slow Morocco</p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Yennayer</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · Culture & Identity</span>
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
