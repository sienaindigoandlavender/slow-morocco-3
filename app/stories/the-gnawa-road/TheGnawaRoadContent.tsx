'use client'

import { useState, useEffect, useRef } from 'react'
import { INSTRUMENTS, SEVEN_COLOURS, MAALEMS, LILA_PHASES, HISTORY, REGIONAL_STYLES, KEY_VOCABULARY, BIBLIOGRAPHY, MAP_POINTS, SOURCE_KINGDOMS, TRADE_ROUTES, DIASPORA } from './data'

/* ═══════════════════════════════════════════════════
   THE GNAWA ROAD
   From West Africa to Morocco to the World
   Module 120 · Sacred & Spiritual Intelligence
   Consolidated from /data/gnawa-atlas + /data/gnawa-road
   ═══════════════════════════════════════════════════ */

const C = {
  bg: '#ffffff', ink: '#0a0a0a', body: '#262626', mid: '#525252',
  muted: '#737373', border: '#e5e5e5',
  gnawa: '#6A4C93', gold: '#C8A415', earth: '#8B6E4E', blood: '#722F37',
  sahel: '#C17F28', green: '#2D6E4F',
  dark: '#0e0e0e', darkMid: '#161616',
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export function TheGnawaRoadContent() {
  const hero = useInView(0.1)
  const instrumentsSection = useInView(0.1)
  const coloursSection = useInView(0.1)
  const maalemSection = useInView(0.1)
  const diasporaSection = useInView(0.1)
  const [activeInstrument, setActiveInstrument] = useState(0)
  const [activeColour, setActiveColour] = useState(0)
  const [showAllMaalems, setShowAllMaalems] = useState(false)
  const [activePhase, setActivePhase] = useState(0)
  const [showRoutes, setShowRoutes] = useState(true)
  const [historyThread, setHistoryThread] = useState<string | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)

  // ── MAPBOX (trade routes + Moroccan centres + source kingdoms) ──
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
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11',
        center: [-4.0, 22.0], zoom: 3.5, minZoom: 2.5, maxZoom: 10,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // Trade routes
        TRADE_ROUTES.forEach((r, i) => {
          map.addSource(`route-${i}`, {
            type: 'geojson',
            data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: r.coords } }
          })
          map.addLayer({
            id: `route-line-${i}`, type: 'line', source: `route-${i}`,
            paint: { 'line-color': r.color, 'line-width': 2, 'line-opacity': 0.5, 'line-dasharray': [6, 4] }
          })
        })

        // Source kingdom markers
        SOURCE_KINGDOMS.forEach((s) => {
          const el = document.createElement('div')
          el.style.cssText = `width:10px;height:10px;background:${C.sahel};border:2px solid rgba(255,255,255,0.7);border-radius:50%;cursor:pointer;transition:transform 0.2s;box-shadow:0 0 8px ${C.sahel}40;`
          el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.4)')
          el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)')
          const popup = new mapboxgl.default.Popup({ offset: 10, closeButton: false, maxWidth: '260px' })
            .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:${C.sahel};margin:0 0 2px">Source · ${s.era}</p><p style="font-weight:700;font-size:13px;color:#f5f5f5;margin:0 0 4px">${s.name}</p><p style="font-size:10px;color:#aaa;margin:0 0 2px">${s.modernCountry} · ${s.peoples}</p><p style="font-size:11px;color:#999;margin:0;line-height:1.4">${s.note}</p></div>`)
          new mapboxgl.default.Marker({ element: el }).setLngLat([s.lng, s.lat]).setPopup(popup).addTo(map)
        })

        // Moroccan Gnawa centres
        MAP_POINTS.forEach((p) => {
          const el = document.createElement('div')
          el.style.cssText = `width:12px;height:12px;background:${C.gnawa};border:2px solid rgba(255,255,255,0.8);border-radius:50%;cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${C.gnawa}55;`
          el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.4)')
          el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)')
          const popup = new mapboxgl.default.Popup({ offset: 12, closeButton: false, maxWidth: '240px' })
            .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:8px;letter-spacing:0.08em;text-transform:uppercase;color:${C.gnawa};margin:0 0 2px">${p.label}</p><p style="font-weight:700;font-size:14px;color:#f5f5f5;margin:0 0 4px">${p.name}</p><p style="font-size:11px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`)
          new mapboxgl.default.Marker({ element: el }).setLngLat([p.lng, p.lat]).setPopup(popup).addTo(map)
        })
        setMapReady(true)
      })

      mapRef.current = map
    })
    return () => { if (mapRef.current) mapRef.current.remove(); mapRef.current = null }
  }, [])

  // Toggle route visibility
  useEffect(() => {
    if (!mapRef.current) return
    TRADE_ROUTES.forEach((_, i) => {
      try { mapRef.current.setPaintProperty(`route-line-${i}`, 'line-opacity', showRoutes ? 0.5 : 0.08) } catch {}
    })
  }, [showRoutes])

  const filteredHistory = historyThread ? HISTORY.filter(h => h.thread === historyThread) : HISTORY
  const threads = Array.from(new Set(HISTORY.map(h => h.thread)))
  const THREAD_COLORS: Record<string, string> = {
    origin: '#8B7355', formation: '#6A4C93', modern: '#2D5F8A',
    global: '#5C7C3E', festival: '#E8A94E', recognition: '#A0452E',
  }

  const inst = INSTRUMENTS[activeInstrument]
  const colour = SEVEN_COLOURS[activeColour]
  const phase = LILA_PHASES[activePhase]

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', monospace" }}>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(80px, 15vh, 160px) clamp(24px, 5vw, 64px) clamp(40px, 8vh, 80px)' }}>
        <div ref={hero.ref} style={{ maxWidth: 900, opacity: hero.visible ? 1 : 0, transform: hero.visible ? 'none' : 'translateY(30px)', transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>Module 120 &middot; Sacred &amp; Spiritual Intelligence</p>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 0.95, letterSpacing: '-0.02em', color: C.ink, marginBottom: 32 }}>
            The Gnawa Road
          </h1>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(18px, 2.5vw, 24px)', fontStyle: 'italic', lineHeight: 1.6, color: C.mid, maxWidth: 620 }}>
            From West Africa to Morocco to the world.<br />
            A spiritual technology carried across the Sahara by enslaved peoples.<br />
            The guembri still speaks in languages its players no longer understand.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 24, marginTop: 48 }}>
            {[
              { v: '7', l: 'spirit colours', c: C.gnawa },
              { v: '3', l: 'guembri strings', c: C.gold },
              { v: '1591', l: 'Songhai conquest', c: C.blood },
              { v: '2019', l: 'UNESCO inscription', c: C.green },
            ].map((n, i) => (
              <div key={i} style={{ opacity: hero.visible ? 1 : 0, transition: `opacity 0.6s ease ${i * 120}ms` }}>
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: n.c }}>{n.v}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{n.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PART ONE: THE ROAD ═══ */}
      <section style={{ background: C.dark, padding: '48px 24px 16px', textAlign: 'center' }}>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Part One</p>
        <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', marginTop: 8 }}>The Road</p>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ padding: '0 24px 40px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', paddingTop: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gnawa, marginBottom: 4 }}>Trans-Saharan Corridors</p>
          <p style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>
            Gold circles = source kingdoms. Purple circles = Moroccan Gnawa centres. Dashed lines = slave trade routes. Click markers for detail.
          </p>
          <button onClick={() => setShowRoutes(!showRoutes)}
            style={{ padding: '4px 10px', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', background: showRoutes ? C.sahel : 'transparent', color: showRoutes ? '#fff' : C.sahel, border: `1px solid ${C.sahel}`, cursor: 'pointer', marginBottom: 16 }}>
            {showRoutes ? 'Hide routes' : 'Show routes'}
          </button>
          <div ref={mapContainer} style={{
            width: '100%', height: 'clamp(400px, 55vh, 560px)', borderRadius: 4,
            background: '#0a0a0a', border: `1px solid ${C.border}`,
            opacity: mapReady ? 1 : 0.5, transition: 'opacity 0.8s',
          }} />
          {/* Route legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
            {TRADE_ROUTES.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 20, height: 2, background: r.color, borderRadius: 1 }} />
                <span style={{ fontSize: 10, color: C.muted }}>{r.name.split('(')[0].trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HISTORY TIMELINE ═══ */}
      <section style={{ padding: '48px 24px 64px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gnawa, marginBottom: 16 }}>Timeline</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            <button onClick={() => setHistoryThread(null)}
              style={{ padding: '3px 8px', fontSize: 9, textTransform: 'uppercase', background: !historyThread ? C.ink : 'transparent', color: !historyThread ? '#fff' : C.muted, border: `1px solid ${!historyThread ? C.ink : C.border}`, cursor: 'pointer' }}>All</button>
            {threads.map(t => (
              <button key={t} onClick={() => setHistoryThread(historyThread === t ? null : t)}
                style={{ padding: '3px 8px', fontSize: 9, textTransform: 'uppercase', background: historyThread === t ? (THREAD_COLORS[t] || C.ink) : 'transparent', color: historyThread === t ? '#fff' : (THREAD_COLORS[t] || C.muted), border: `1px solid ${historyThread === t ? (THREAD_COLORS[t] || C.ink) : C.border}`, cursor: 'pointer' }}>{t}</button>
            ))}
          </div>
          {filteredHistory.map((ev, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: `1px solid ${C.border}`, borderLeft: `3px solid ${THREAD_COLORS[ev.thread] || C.muted}`, paddingLeft: 12 }}>
              <div style={{ flexShrink: 0, width: 70, fontSize: 12, fontWeight: 700, color: THREAD_COLORS[ev.thread] || C.muted }}>{ev.year}</div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: C.body }}>{ev.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PART TWO: THE MUSIC ═══ */}
      <section style={{ background: C.dark, padding: '48px 24px 16px', textAlign: 'center' }}>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Part Two</p>
        <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', marginTop: 8 }}>The Music</p>
      </section>

      {/* ═══ INSTRUMENTS ═══ */}
      <section ref={instrumentsSection.ref} style={{ padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gnawa, marginBottom: 16 }}>Instruments</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {INSTRUMENTS.map((inst, i) => (
              <button key={i} onClick={() => setActiveInstrument(i)}
                style={{ padding: '6px 12px', fontSize: 11, fontWeight: activeInstrument === i ? 700 : 400, background: activeInstrument === i ? C.gnawa : 'transparent', color: activeInstrument === i ? '#fff' : C.ink, border: `1px solid ${activeInstrument === i ? C.gnawa : C.border}`, cursor: 'pointer' }}>
                {inst.name}
              </button>
            ))}
          </div>
          <div style={{ opacity: instrumentsSection.visible ? 1 : 0, transition: 'opacity 0.6s' }}>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24 }}>{inst.name}</h3>
            <p style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{inst.aliases.join(' · ')} &middot; {inst.arabic}</p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: C.body, marginTop: 12 }}>{inst.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 16 }}>
              {[
                { label: 'Materials', text: inst.materials },
                { label: 'Construction', text: inst.construction },
                { label: 'Playing', text: inst.playing },
                { label: 'Ritual Role', text: inst.role },
                { label: 'Ancestor', text: inst.ancestor },
              ].map((d, j) => (
                <div key={j}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.gnawa, marginBottom: 4 }}>{d.label}</p>
                  <p style={{ fontSize: 11, lineHeight: 1.5, color: C.mid }}>{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SEVEN COLOURS ═══ */}
      <section ref={coloursSection.ref} style={{ padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gnawa, marginBottom: 16 }}>The Seven Colours</p>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: C.body, marginBottom: 24, maxWidth: 560 }}>
            Each spirit family has a colour, an <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>incense</span>, a domain, and a suite of songs.
            The lila moves through all seven from dusk to dawn.
          </p>
          <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
            {SEVEN_COLOURS.map((c, i) => (
              <button key={i} onClick={() => setActiveColour(i)}
                style={{ width: 32, height: 32, borderRadius: '50%', background: c.hex, border: activeColour === i ? '3px solid #000' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s', transform: activeColour === i ? 'scale(1.2)' : 'scale(1)' }} />
            ))}
          </div>
          <div style={{ opacity: coloursSection.visible ? 1 : 0, transition: 'opacity 0.5s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: colour.hex, border: colour.colour === 'White' ? '1px solid #ccc' : 'none' }} />
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20 }}>{colour.colour} — {colour.name}</h3>
            </div>
            <p style={{ fontSize: 10, color: C.muted }}>{colour.arabic}</p>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: C.body, marginTop: 8 }}><strong>Spirits:</strong> {colour.spirits}</p>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: C.body, marginTop: 4 }}><strong>Character:</strong> {colour.character}</p>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: C.body, marginTop: 4 }}><strong>Incense:</strong> {colour.incense}</p>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: C.body, marginTop: 4 }}><strong>Domain:</strong> {colour.domain}</p>
          </div>
        </div>
      </section>

      {/* ═══ THE LILA ═══ */}
      <section style={{ padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gnawa, marginBottom: 16 }}>The Lila · All-Night Ceremony</p>
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {LILA_PHASES.map((p, i) => (
              <button key={i} onClick={() => setActivePhase(i)}
                style={{ padding: '5px 10px', fontSize: 10, background: activePhase === i ? C.gnawa : 'transparent', color: activePhase === i ? '#fff' : C.ink, border: `1px solid ${activePhase === i ? C.gnawa : C.border}`, cursor: 'pointer' }}>
                {p.name}
              </button>
            ))}
          </div>
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20 }}>{phase.name} {phase.arabic && <span style={{ color: C.muted }}>{phase.arabic}</span>}</h3>
            <p style={{ fontSize: 10, color: C.gnawa, marginTop: 4 }}>{phase.duration}</p>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: C.body, marginTop: 8 }}>{phase.description}</p>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8 }}><em>Music: {phase.music}</em></p>
          </div>
        </div>
      </section>

      {/* ═══ MAALEM LINEAGES ═══ */}
      <section ref={maalemSection.ref} style={{ padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gnawa, marginBottom: 16 }}>Maalem Lineages</p>
          {(showAllMaalems ? MAALEMS : MAALEMS.slice(0, 4)).map((m, i) => (
            <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}`, opacity: maalemSection.visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 60}ms` }}>
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 16 }}>{m.name}</div>
              <p style={{ fontSize: 10, color: C.gnawa, marginTop: 2 }}>{m.years} · {m.city}</p>
              <p style={{ fontSize: 11, lineHeight: 1.6, color: C.mid, marginTop: 6 }}>{m.significance}</p>
              <p style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>Collaborations: {m.collaborations}</p>
            </div>
          ))}
          {!showAllMaalems && MAALEMS.length > 4 && (
            <button onClick={() => setShowAllMaalems(true)}
              style={{ marginTop: 16, fontSize: 11, color: C.gnawa, background: 'none', border: `1px solid ${C.gnawa}`, padding: '6px 16px', cursor: 'pointer' }}>
              Show all {MAALEMS.length} maalems
            </button>
          )}
        </div>
      </section>

      {/* ═══ REGIONAL STYLES ═══ */}
      <section style={{ padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gnawa, marginBottom: 16 }}>Regional Styles</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {REGIONAL_STYLES.map((s, i) => (
              <div key={i} style={{ padding: '12px 0' }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontSize: 10, color: C.gnawa }}>{s.city}</div>
                <p style={{ fontSize: 11, lineHeight: 1.5, color: C.mid, marginTop: 4 }}>{s.character}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PART THREE: THE BRANCHES ═══ */}
      <section style={{ background: C.dark, padding: '48px 24px 16px', textAlign: 'center' }}>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Part Three</p>
        <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', marginTop: 8 }}>The Branches</p>
      </section>

      {/* ═══ DIASPORA PARALLELS ═══ */}
      <section ref={diasporaSection.ref} style={{ padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: C.body, marginBottom: 32, maxWidth: 600 }}>
            The same West African peoples who were taken north across the Sahara were also
            taken west across the Atlantic. The same spiritual technology — music-driven
            possession trance — produced distinct traditions on three continents. Every
            tradition uses colour-coded spirits. Every tradition uses specific rhythms to
            invoke specific spirits. In every tradition, the possessed person is called a horse.
          </p>

          {/* Comparison table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${C.ink}` }}>
                  {['Tradition', 'Region', 'Spirits', 'Possession Metaphor', 'Lead Instrument'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px 8px 0', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DIASPORA.map((d, i) => (
                  <tr key={i} style={{
                    borderBottom: `1px solid ${C.border}`,
                    opacity: diasporaSection.visible ? 1 : 0,
                    transition: `opacity 0.4s ease ${i * 60}ms`,
                  }}>
                    <td style={{ padding: '10px 12px 10px 0', fontWeight: 700 }}>{d.name}</td>
                    <td style={{ padding: '10px 12px 10px 0', color: C.mid }}>{d.region}</td>
                    <td style={{ padding: '10px 12px 10px 0', color: C.mid }}>{d.spiritTerm}</td>
                    <td style={{ padding: '10px 12px 10px 0', color: C.mid, fontSize: 10 }}>{d.possessionMetaphor}</td>
                    <td style={{ padding: '10px 12px 10px 0', color: C.mid, fontSize: 10 }}>{d.leadInstrument}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: 11, color: C.muted, marginTop: 24, maxWidth: 560 }}>
            Gnawa syncretised with Sufi Islam. Vodou syncretised with Catholic saints.
            Candomblé syncretised with the Portuguese church. The technology adapts.
            The architecture — colours, rhythms, horses, healing — remains.
          </p>
        </div>
      </section>

      {/* ═══ VOCABULARY ═══ */}
      <section style={{ padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gnawa, marginBottom: 16 }}>Vocabulary</p>
          {KEY_VOCABULARY.map((v, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{v.term}</span>
                <span style={{ fontSize: 11, color: C.muted }}>{v.arabic}</span>
              </div>
              <p style={{ fontSize: 11, lineHeight: 1.6, color: C.mid, marginTop: 4 }}>{v.definition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DARK CLOSE ═══ */}
      <section style={{ background: `linear-gradient(to bottom, ${C.dark}, ${C.darkMid}, #080808)`, padding: '120px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontStyle: 'italic', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
            The Bambara word was lost in the Sahara.
          </p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontStyle: 'italic', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', marginTop: 28 }}>
            The guembri kept the rhythm.
          </p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontStyle: 'italic', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', marginTop: 28 }}>
            The same root that became Gnawa in Marrakech<br />
            became Vodou in Port-au-Prince<br />
            became Candomblé in Salvador.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 48 }}>
            One spiritual technology. Three continents. The spirits do not recognise borders.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ padding: '80px 24px', background: C.bg }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 24 }}>Sources</p>
          {BIBLIOGRAPHY.map((b, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <p style={{ fontSize: 12, color: C.mid }}><strong>{b.source}</strong> — {b.detail}</p>
            </div>
          ))}
          <p style={{ fontSize: 12, color: C.mid, marginTop: 16 }}>
            <strong>Additional sources for diaspora parallels:</strong> Britannica, &quot;Vodou&quot; (2025). Wikipedia, &quot;Haitian Vodou,&quot; &quot;Candomblé,&quot; &quot;Hausa animism,&quot; &quot;Stambali&quot; (2026).
            Internet Encyclopedia of Philosophy, &quot;Philosophy of African Diaspora Religions.&quot;
            Pan African Music, &quot;Stambali: the last dance with the spirits&quot; (2023).
            IEMed, &quot;Gnawa: Music and Spirit.&quot;
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: `linear-gradient(to bottom, ${C.dark}, ${C.darkMid}, #080808)`, padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
          &copy; {new Date().getFullYear()} Slow Morocco &middot; J. Ng &middot; Sacred &amp; Spiritual Intelligence
        </div>
      </footer>
    </div>
  )
}
