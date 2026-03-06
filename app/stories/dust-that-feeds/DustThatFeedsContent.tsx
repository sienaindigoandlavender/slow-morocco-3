'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

/* ═══════════════════════════════════════════════════
   THE DUST THAT FEEDS
   How the Sahara keeps the Amazon alive
   Module 114 · Earth Systems Intelligence
   ═══════════════════════════════════════════════════ */

// ── COLORS ──────────────────────────────────────
const C = {
  bg: '#fafafa',
  white: '#ffffff',
  black: '#0a0a0a',
  ink: '#1a1a1a',
  mid: '#525252',
  muted: '#737373',
  light: '#a3a3a3',
  border: '#e5e5e5',
  dust: '#C4956A',
  dustLight: '#E8D5C0',
  dustDark: '#8B6B4A',
  sahara: '#D4A24E',
  amazon: '#2D6A4F',
  amazonLight: '#E4F0EA',
  phosphorus: '#E07B39',
  ocean: '#3B82A0',
  oceanDark: '#1E4D5C',
  dark: '#0e0e0e',
  darkMid: '#161616',
  darkEnd: '#0a0a0a',
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// ── DATA ────────────────────────────────────────

const JOURNEY_STATS = [
  { value: '182', unit: 'million tons', detail: 'Dust leaving the Sahara each year' },
  { value: '5,000', unit: 'km', detail: 'Distance from Chad to the Amazon basin' },
  { value: '132', unit: 'million tons', detail: 'Still airborne at the South American coast' },
  { value: '27.7', unit: 'million tons', detail: 'Deposited on the Amazon basin annually' },
  { value: '22,000', unit: 'tons phosphorus', detail: 'Replacing exactly what rain washes away' },
  { value: '0.08', unit: '%', detail: 'Phosphorus fraction. Tiny. Enough.' },
]

const DUST_COMPOSITION = [
  { element: 'Silicon dioxide', pct: 58, color: '#C4956A' },
  { element: 'Aluminium oxide', pct: 16, color: '#B8926E' },
  { element: 'Iron oxide', pct: 7.2, color: '#A0522D' },
  { element: 'Calcium oxide', pct: 5.8, color: '#D4B896' },
  { element: 'Magnesium oxide', pct: 3.1, color: '#8B7355' },
  { element: 'Phosphorus', pct: 0.08, color: C.phosphorus },
]

// CALIPSO interannual data (Tg/year at 15W, leaving Africa)
const ANNUAL_FLUX = [
  { year: 2007, dust: 240, label: 'Peak year' },
  { year: 2008, dust: 198, label: '' },
  { year: 2009, dust: 172, label: '' },
  { year: 2010, dust: 183, label: '' },
  { year: 2011, dust: 129, label: '86% less than 2007' },
  { year: 2012, dust: 180, label: '' },
  { year: 2013, dust: 168, label: '' },
]

const SEASONAL_CYCLE = [
  { month: 'Jan', flux: 24, peak: true },
  { month: 'Feb', flux: 28, peak: true },
  { month: 'Mar', flux: 22, peak: true },
  { month: 'Apr', flux: 16, peak: false },
  { month: 'May', flux: 12, peak: false },
  { month: 'Jun', flux: 18, peak: false },
  { month: 'Jul', flux: 20, peak: false },
  { month: 'Aug', flux: 16, peak: false },
  { month: 'Sep', flux: 8, peak: false },
  { month: 'Oct', flux: 6, peak: false },
  { month: 'Nov', flux: 10, peak: false },
  { month: 'Dec', flux: 18, peak: true },
]

const WAYPOINTS = [
  { name: "Bodele Depression", lat: 16.9, lng: 17.4, note: "Source. Ancient lakebed of Mega-Lake Chad. 100 dust storms per year. 700,000 tonnes per day in winter." },
  { name: "Tibesti-Ennedi gap", lat: 19.5, lng: 19.0, note: "Natural wind tunnel between two mountain ranges. Channels the Bodele Low Level Jet at 47 km/h." },
  { name: "West African coast (15\u00b0W)", lat: 16.0, lng: -15.0, note: "182 million tons pass this longitude each year. CALIPSO measurement boundary." },
  { name: "Mid-Atlantic", lat: 10.0, lng: -30.0, note: "Dust plume at 1,500\u20135,000m altitude. Carried by northeasterly trade winds. Some particles fall to the ocean, fertilising phytoplankton." },
  { name: "South American coast (35\u00b0W)", lat: 2.0, lng: -35.0, note: "132 million tons remain airborne. 27.7 million tons begin descent into the Amazon." },
  { name: "Central Amazon (ATTO tower)", lat: -2.14, lng: -59.0, note: "Amazon Tall Tower Observatory. Peak dust deposition Feb\u2013Apr. Fe, P, K, Ca, Mg measured above and below canopy." },
  { name: "Caribbean (75\u00b0W)", lat: 17.0, lng: -75.0, note: "43 million tons continue past the Amazon to the Caribbean. Dust measured at Barbados and Miami stations." },
]

const BIBLIOGRAPHY = [
  "Yu, H. et al. \"The fertilizing role of African dust in the Amazon rainforest.\" Geophysical Research Letters 42 (2015): 1602\u20131607.",
  "Yu, H. et al. \"Quantification of trans-Atlantic dust transport from seven-year record of CALIPSO lidar measurements.\" Remote Sensing of Environment 159 (2015): 232\u2013249.",
  "Koren, I. et al. \"The Bodele depression: a single spot in the Sahara that provides most of the mineral dust to the Amazon forest.\" Environmental Research Letters 1 (2006).",
  "Prospero, J.M. et al. \"Characterizing and Quantifying African Dust Transport and Deposition to South America.\" Global Biogeochemical Cycles 34 (2020).",
  "Barkley, A.E. et al. \"African biomass burning is a substantial source of phosphorus deposition to the Amazon.\" PNAS 116 (2019): 16216\u201316221.",
  "Washington, R. et al. \"Dust as a tipping element: The Bodele Depression, Chad.\" PNAS 106 (2009): 20564\u201320571.",
  "Bristow, C.S. et al. \"Fertilizing the Amazon and equatorial Atlantic with West African dust.\" Geophys. Res. Lett. 37 (2010).",
  "NASA CALIPSO mission data (2007\u20132013). Cloud-Aerosol Lidar and Infrared Pathfinder Satellite Observation.",
]

// ── HOOKS ───────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function useCounter(target: number, duration = 2000) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    const start = performance.now()
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(ease * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target, duration])
  return { ref, value }
}

// ── PARTICLE SYSTEM ─────────────────────────────

function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ref: wrapRef, visible } = useInView(0.1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !visible) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width = canvas.offsetWidth * 2
    const H = canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)
    const w = W / 2, h = H / 2

    interface P { x: number; y: number; r: number; vx: number; vy: number; o: number; }
    const particles: P[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * w * 0.3,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.5,
      vx: Math.random() * 1.2 + 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.6 + 0.2,
    }))

    let raf: number
    function draw() {
      ctx!.clearRect(0, 0, w, h)
      // Sahara zone
      const sahGrad = ctx!.createLinearGradient(0, 0, w * 0.15, 0)
      sahGrad.addColorStop(0, 'rgba(212,162,78,0.15)')
      sahGrad.addColorStop(1, 'rgba(212,162,78,0)')
      ctx!.fillStyle = sahGrad
      ctx!.fillRect(0, 0, w * 0.15, h)

      // Amazon zone
      const amzGrad = ctx!.createLinearGradient(w * 0.7, 0, w, 0)
      amzGrad.addColorStop(0, 'rgba(45,106,79,0)')
      amzGrad.addColorStop(1, 'rgba(45,106,79,0.12)')
      ctx!.fillStyle = amzGrad
      ctx!.fillRect(w * 0.7, 0, w * 0.3, h)

      // Ocean label
      ctx!.fillStyle = 'rgba(59,130,160,0.08)'
      ctx!.fillRect(w * 0.15, 0, w * 0.55, h)

      particles.forEach(p => {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(196,149,106,${p.o})`
        ctx!.fill()

        p.x += p.vx
        p.y += p.vy + Math.sin(p.x * 0.01) * 0.15

        // Reset at right edge or if past Amazon
        if (p.x > w * 0.85) {
          // Some fall in Amazon zone
          p.o -= 0.02
          p.vy += 0.02
          if (p.o <= 0 || p.y > h) {
            p.x = Math.random() * w * 0.1
            p.y = Math.random() * h
            p.o = Math.random() * 0.6 + 0.2
            p.vy = (Math.random() - 0.5) * 0.3
          }
        }
        if (p.x > w + 10) {
          p.x = Math.random() * w * 0.1
          p.y = Math.random() * h
          p.o = Math.random() * 0.6 + 0.2
        }
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [visible])

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: 'clamp(200px, 30vh, 300px)', background: C.white, borderRadius: 4, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      {/* Labels */}
      <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.sahara }}>Sahara</div>
      <div style={{ position: 'absolute', left: '40%', bottom: 12, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.ocean, opacity: 0.5 }}>Atlantic Ocean &middot; 5,000 km</div>
      <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.amazon }}>Amazon</div>
    </div>
  )
}

// ── PAGE ────────────────────────────────────────

export function DustThatFeedsContent() {
  const hero = useInView(0.1)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)
  const [activeYear, setActiveYear] = useState<number | null>(null)

  // ── MAPBOX INIT ──
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
        center: [-20, 10], zoom: 2.3, minZoom: 1.5, maxZoom: 8,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // Draw the dust corridor as a line
        map.addSource('dust-corridor', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: WAYPOINTS.map(w => [w.lng, w.lat]),
            },
          },
        })
        map.addLayer({
          id: 'dust-line',
          type: 'line',
          source: 'dust-corridor',
          paint: {
            'line-color': C.dust,
            'line-width': 3,
            'line-opacity': 0.5,
            'line-dasharray': [2, 2],
          },
        })

        // Add markers
        WAYPOINTS.forEach((wp, i) => {
          const isSahara = wp.lng > 0
          const isAmazon = wp.lng < -50
          const color = isSahara ? C.sahara : isAmazon ? C.amazon : C.dust
          const el = document.createElement('div')
          const size = i === 0 ? 18 : 14
          el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2.5px solid white;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.3);transition:transform 0.2s;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })

          const popup = new mapboxgl.default.Popup({ offset: 14, closeButton: false, maxWidth: '280px' })
            .setHTML(`
              <div style="font-family:'IBM Plex Mono',monospace;padding:4px 0">
                <p style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${color};margin:0 0 4px">Stop ${i + 1} of ${WAYPOINTS.length}</p>
                <p style="font-weight:700;font-size:13px;margin:0 0 6px;color:#0A0A0A">${wp.name}</p>
                <p style="font-size:12px;color:#333;line-height:1.5;margin:0">${wp.note}</p>
              </div>
            `)
          new mapboxgl.default.Marker({ element: el })
            .setLngLat([wp.lng, wp.lat])
            .setPopup(popup)
            .addTo(map)
        })
        setMapReady(true)
      })
      mapRef.current = map
    })
    return () => { if (mapRef.current) mapRef.current.remove(); mapRef.current = null }
  }, [])

  // ── ANIMATED COUNTERS ──
  const c182 = useCounter(182)
  const c27 = useCounter(27)
  const c22 = useCounter(22000, 2500)

  // ── SECTION REFS ──
  const numSection = useInView(0.15)
  const compSection = useInView(0.15)
  const fluxSection = useInView(0.15)
  const cycleSection = useInView(0.15)
  const cycleBarSection = useInView(0.15)

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', monospace" }}>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(80px, 15vh, 160px) clamp(24px, 5vw, 64px) clamp(40px, 8vh, 80px)' }}>
        <div ref={hero.ref} style={{ maxWidth: 900, opacity: hero.visible ? 1 : 0, transform: hero.visible ? 'none' : 'translateY(30px)', transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 16, fontWeight: 500 }}>
            Module 114 &middot; Earth Systems Intelligence
          </p>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 0.95, letterSpacing: '-0.02em', color: C.black, marginBottom: 32 }}>
            The Dust That Feeds
          </h1>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(18px, 2.5vw, 26px)', fontStyle: 'italic', lineHeight: 1.6, color: C.mid, maxWidth: 640 }}>
            182 million tons of Saharan dust cross the Atlantic every year.<br />
            27.7 million tons fall on the Amazon.<br />
            22,000 tons of phosphorus replace exactly what the rainforest loses to rain.<br /><br />
            The dead life of an ancient African lake feeds the largest living forest on earth.
          </p>
        </div>
      </section>

      {/* ═══ THE THREE NUMBERS ═══ */}
      <section style={{ background: C.dark, padding: 'clamp(60px, 10vh, 100px) 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, textAlign: 'center' }}>
          <div ref={c182.ref}>
            <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 400, color: C.sahara, lineHeight: 1 }}>{c182.value}</div>
            <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>million tons leave Africa</div>
          </div>
          <div ref={c27.ref}>
            <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 400, color: C.dust, lineHeight: 1 }}>{c27.value}</div>
            <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>million tons reach the Amazon</div>
          </div>
          <div ref={c22.ref}>
            <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 400, color: C.amazon, lineHeight: 1 }}>{c22.value.toLocaleString()}</div>
            <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>tons of phosphorus deposited</div>
          </div>
        </div>
      </section>

      {/* ═══ PARTICLE ANIMATION ═══ */}
      <section style={{ padding: '80px 24px', background: C.white }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Simulation</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontStyle: 'italic', color: C.ink, marginBottom: 24, lineHeight: 1.3 }}>
            An invisible river of dust, 5,000 kilometres long
          </p>
          <DustParticles />
          <p style={{ fontSize: 12, color: C.muted, marginTop: 12, fontStyle: 'italic' }}>
            Each particle represents roughly 1.5 million tons of airborne dust. Particles fade and descend as they reach the Amazon canopy.
          </p>
        </div>
      </section>

      {/* ═══ THE CONTEXT ═══ */}
      <section style={{ padding: '80px 24px', maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink }}>
          The Sahara Desert and the Amazon rainforest seem to inhabit different planets. One is the largest hot desert on earth. The other is the densest living biomass. They are separated by 5,000 kilometres of open ocean. And yet the forest depends on the desert to survive.
        </p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink, marginTop: 24 }}>
          The mechanism is phosphorus. Amazonian soils are ancient and heavily weathered. Nutrients are locked in the living plants, not the ground. When leaves decompose, their phosphorus is rapidly reabsorbed. But some washes away in the torrential rain, draining from the basin like a slow leak. Without replacement, the forest would starve. The replacement comes from 5,000 kilometres away, in the form of dust.
        </p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink, marginTop: 24 }}>
          The source is the Bodele Depression in Chad: the dried bed of Mega-<span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Lake Chad</span>, a body of water that 7,000 years ago was larger than all the Great Lakes combined. When the Sahara dried, the lake vanished. Its sediment stayed: billions of fossilised diatoms, single-celled algae whose silica-rich cell walls are loaded with phosphorus, iron, and calcium. One hundred dust storms a year rake across this lakebed. In winter, the depression produces 700,000 tonnes of dust per day. The Tibesti and Ennedi mountains channel the wind into a natural jet at 47 kilometres per hour. The dust rises to 5,000 metres. The trade winds carry it west.
        </p>
      </section>

      {/* ═══ THE FULL STATS ═══ */}
      <section ref={numSection.ref} style={{ padding: '80px 24px', background: C.white, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>The Numbers</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontStyle: 'italic', color: C.ink, marginBottom: 40, lineHeight: 1.3 }}>
            Measured by NASA CALIPSO satellite, 2007&ndash;2013
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
            {JOURNEY_STATS.map((s, i) => (
              <div key={i} style={{ opacity: numSection.visible ? 1 : 0, transform: numSection.visible ? 'none' : 'translateY(20px)', transition: `all 0.7s ease ${i * 80}ms`, borderLeft: `3px solid ${C.dust}`, paddingLeft: 16 }}>
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: C.ink, lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.dust, marginTop: 4 }}>{s.unit}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 6, lineHeight: 1.5 }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAPBOX — THE CORRIDOR ═══ */}
      <section style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Geography</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontStyle: 'italic', color: C.ink, marginBottom: 12, lineHeight: 1.3 }}>
            The trans-Atlantic corridor
          </p>
          <p style={{ fontSize: 14, color: C.mid, marginBottom: 32, maxWidth: 600 }}>
            Seven waypoints from source to destination. The world{"'"}s largest dust transport event, measured in three dimensions for the first time.
          </p>
          <div ref={mapContainer} style={{
            width: '100%', height: 'clamp(400px, 55vh, 560px)', borderRadius: 4,
            background: '#f0ede8', border: `1px solid ${C.border}`,
            opacity: mapReady ? 1 : 0.6, transition: 'opacity 0.8s ease',
          }}>
            {!MAPBOX_TOKEN && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <p style={{ fontSize: 13, color: C.light }}>Map requires NEXT_PUBLIC_MAPBOX_TOKEN.</p>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 16 }}>
            {[
              { color: C.sahara, label: 'Source (Sahara)' },
              { color: C.dust, label: 'Transit (Atlantic)' },
              { color: C.amazon, label: 'Destination (Amazon)' },
            ].map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                <span style={{ fontSize: 11, color: C.mid }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DUST COMPOSITION ═══ */}
      <section ref={compSection.ref} style={{ padding: '80px 24px', background: C.white, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Composition</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontStyle: 'italic', color: C.ink, marginBottom: 40, lineHeight: 1.3 }}>
            What the dust carries
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {DUST_COMPOSITION.map((d, i) => {
              const isP = d.element === 'Phosphorus'
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 60px', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: isP ? 700 : 400, color: isP ? C.phosphorus : C.ink }}>{d.element}</div>
                  <div style={{ position: 'relative', height: 24, background: '#f5f5f5', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0, bottom: 0,
                      width: compSection.visible ? `${Math.max(d.pct * 1.5, isP ? 3 : d.pct)}%` : '0%',
                      background: isP ? C.phosphorus : d.color,
                      borderRadius: 2,
                      transition: `width 1.2s cubic-bezier(0.23, 1, 0.32, 1) ${i * 100}ms`,
                    }} />
                    {isP && (
                      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '100%', display: 'flex', alignItems: 'center', paddingLeft: `${Math.max(d.pct * 1.5, 3) + 1}%` }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: C.phosphorus }}>&#8592; 0.08% is enough</span>
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: C.muted, textAlign: 'right' }}>{d.pct}%</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ INTERANNUAL VARIATION ═══ */}
      <section ref={fluxSection.ref} style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Variability</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontStyle: 'italic', color: C.ink, marginBottom: 12, lineHeight: 1.3 }}>
            86% variation in seven years
          </p>
          <p style={{ fontSize: 14, color: C.mid, marginBottom: 40, maxWidth: 600 }}>
            Dust transport is anti-correlated with prior-year Sahel rainfall. More rain in the Sahel means more vegetation, less exposed soil, less dust. The pattern is volatile.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(8px, 2vw, 24px)', height: 280 }}>
            {ANNUAL_FLUX.map((d, i) => {
              const maxDust = 240
              const h = (d.dust / maxDust) * 220
              const isActive = activeYear === i
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                  onMouseEnter={() => setActiveYear(i)} onMouseLeave={() => setActiveYear(null)}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? C.ink : C.muted, marginBottom: 8, transition: 'color 0.2s' }}>
                    {d.dust}
                  </div>
                  <div style={{
                    width: '100%', maxWidth: 60,
                    height: fluxSection.visible ? h : 0,
                    background: isActive ? C.dust : C.dustLight,
                    borderRadius: '3px 3px 0 0',
                    transition: `height 1s cubic-bezier(0.23, 1, 0.32, 1) ${i * 80}ms, background 0.2s`,
                  }} />
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>{d.year}</div>
                  {d.label && (
                    <div style={{ fontSize: 9, color: C.dust, marginTop: 2, textAlign: 'center' }}>{d.label}</div>
                  )}
                </div>
              )
            })}
          </div>
          <p style={{ fontSize: 10, color: C.light, marginTop: 12 }}>Tg/year leaving Africa at 15&deg;W. Source: CALIPSO 2007&ndash;2013 (Yu et al., 2015)</p>
        </div>
      </section>

      {/* ═══ SEASONAL CYCLE ═══ */}
      <section ref={cycleBarSection.ref} style={{ padding: '80px 24px', background: C.white, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Seasonality</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontStyle: 'italic', color: C.ink, marginBottom: 12, lineHeight: 1.3 }}>
            The Bodele jet peaks October to March
          </p>
          <p style={{ fontSize: 14, color: C.mid, marginBottom: 32, maxWidth: 600 }}>
            Peak dust arrives in the Amazon during the wet season (February&ndash;April), when phosphorus depletion from flooding is highest.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(4px, 1vw, 12px)', height: 200 }}>
            {SEASONAL_CYCLE.map((m, i) => {
              const maxFlux = 28
              const h = (m.flux / maxFlux) * 160
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%', maxWidth: 40,
                    height: cycleBarSection.visible ? h : 0,
                    background: m.peak ? C.sahara : C.dustLight,
                    borderRadius: '2px 2px 0 0',
                    transition: `height 0.8s ease ${i * 50}ms`,
                  }} />
                  <div style={{ fontSize: 10, color: m.peak ? C.sahara : C.muted, marginTop: 6, fontWeight: m.peak ? 600 : 400 }}>{m.month}</div>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, background: C.sahara, borderRadius: 2 }} />
              <span style={{ fontSize: 11, color: C.mid }}>Bodele jet active (Oct&ndash;Mar)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, background: C.dustLight, borderRadius: 2 }} />
              <span style={{ fontSize: 11, color: C.mid }}>Reduced activity</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE PHOSPHORUS CYCLE — DIAGRAM ═══ */}
      <section ref={cycleSection.ref} style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Balance</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontStyle: 'italic', color: C.ink, marginBottom: 32, lineHeight: 1.3 }}>
            The phosphorus budget
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center' }}>
            {/* Input */}
            <div style={{
              padding: 24, background: C.amazonLight, borderRadius: 8, textAlign: 'center',
              opacity: cycleSection.visible ? 1 : 0, transform: cycleSection.visible ? 'none' : 'translateX(-30px)',
              transition: 'all 0.8s ease',
            }}>
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, color: C.amazon }}>+22,000</div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.amazon, marginTop: 4 }}>tons P / year</div>
              <div style={{ fontSize: 12, color: C.mid, marginTop: 8 }}>Saharan dust deposition</div>
            </div>
            {/* Equals */}
            <div style={{
              fontSize: 32, color: C.ink, fontWeight: 300,
              opacity: cycleSection.visible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.3s',
            }}>=</div>
            {/* Loss */}
            <div style={{
              padding: 24, background: '#FDF2EE', borderRadius: 8, textAlign: 'center',
              opacity: cycleSection.visible ? 1 : 0, transform: cycleSection.visible ? 'none' : 'translateX(30px)',
              transition: 'all 0.8s ease 0.2s',
            }}>
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, color: C.phosphorus }}>&minus;22,000</div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.phosphorus, marginTop: 4 }}>tons P / year</div>
              <div style={{ fontSize: 12, color: C.mid, marginTop: 8 }}>Lost to rain and flooding</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: C.mid, textAlign: 'center', marginTop: 24, lineHeight: 1.7, maxWidth: 500, margin: '24px auto 0' }}>
            The balance is exact. 22,000 tons in, 22,000 tons out. This equilibrium has held for millennia. If Sahel rainfall patterns shift under climate change, the dust supply changes. The forest has no backup.
          </p>
        </div>
      </section>

      {/* ═══ THE ORIGIN STORY ═══ */}
      <section style={{ padding: '80px 24px', background: C.white, borderTop: `1px solid ${C.border}`, maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontStyle: 'italic', color: C.ink, marginBottom: 24, lineHeight: 1.3 }}>
          A lake that died so a forest could live
        </p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink }}>
          Seven thousand years ago, the Sahara was green. Savannas, grasslands, lakes teeming with diatoms and microorganisms. A shift in Earth{"'"}s orbital parameters changed the monsoon pattern. The rains stopped. The lakes evaporated. The largest of them, Mega-Lake Chad, was bigger than all the Great Lakes combined. It dried to a fraction of its former size. The organisms died. Their silica shells piled up in the sediment. The phosphorus stayed.
        </p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink, marginTop: 24 }}>
          The Bodele Depression, 500 kilometres long and 150 kilometres wide, is what remains. It sits 155 metres above sea level, flanked by the Tibesti Mountains (3,400m) to the northeast and the Ennedi Massif (1,000m) to the southeast. Wind funnels through the gap between them at speeds exceeding 47 km/h, scouring the ancient lakebed and launching the dust into the upper atmosphere. The resulting dust plume is the largest single atmospheric transport event on earth.
        </p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink, marginTop: 24 }}>
          The dust carries more than phosphorus. Potassium, calcium, magnesium, and iron ride the same wind. Some particles act as condensation nuclei, seeding the clouds that produce the very rainfall that washes the phosphorus out of Amazonian soils. A dead lake in Africa makes clouds in South America that cause the rain that creates the deficiency that the same dead lake fixes.
        </p>
      </section>

      {/* ═══ THE THREAT ═══ */}
      <section style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}`, maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontStyle: 'italic', color: C.ink, marginBottom: 24, lineHeight: 1.3 }}>
          What happens when the dust stops
        </p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink }}>
          Climate models suggest the balance is fragile. If Sahel rainfall increases under global warming, vegetation grows, soil stabilises, and less dust is released. The Amazon loses its phosphorus supply. Simultaneously, deforestation weakens the Hadley circulation, which paradoxically increases dust transport by 27% under a total deforestation scenario. One feedback loop heals the wound. The other tears it open.
        </p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink, marginTop: 24 }}>
          The Amazon{"'"}s dry season is already extending by 13 days per decade. If 16&ndash;17% of the forest reaches a tipping point, the transition from rainforest to savanna becomes irreversible. The dust cannot save a forest that is no longer there to catch it.
        </p>
      </section>

      {/* ═══ DARK CLOSE ═══ */}
      <section style={{ background: `linear-gradient(to bottom, ${C.dark}, ${C.darkMid}, ${C.darkEnd})`, padding: '120px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontStyle: 'italic', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
            The Sahara is not barren.<br />
            It is a pharmacy, a seed bank, a fertiliser depot.
          </p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontStyle: 'italic', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', marginTop: 28 }}>
            A lake that died seven thousand years ago<br />
            is still feeding the largest forest on earth.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 48 }}>
            This is the kind of thing we mean when we say: everything is connected.
          </p>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ padding: '80px 24px', background: C.bg }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 24 }}>Sources</p>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontSize: 12, lineHeight: 1.8, color: C.mid, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: `linear-gradient(to bottom, ${C.dark}, ${C.darkMid}, ${C.darkEnd})`, padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>
          &copy; {new Date().getFullYear()} Slow Morocco &middot; J. Ng &middot; Earth Systems Intelligence
        </div>
      </footer>
    </div>
  )
}
