'use client'

import { useEffect, useRef, useState } from 'react'

// ══════════════════════════════════════════════
// MODULE 133 — THE EYE OF AFRICA
// The Richat Structure, Mauritania
// 100 million years. 40 kilometres. One question.
// ══════════════════════════════════════════════

// ── Data ──

const RING_LAYERS = [
  { label: 'Central Megabreccia', distance: '0–1.5 km', width: '3 km diameter', rock: 'Siliceous breccia in limestone-dolomite shelf', age: '~98 Ma (hydrothermal)', color: '#8B4513' },
  { label: 'Rhyolitic Centres', distance: '0–3 km', width: 'Two maar remnants', rock: 'Lava flows + hydrothermally altered tuffs', age: 'Cretaceous (undated)', color: '#CD853F' },
  { label: 'Inner Gabbro Ring Dike', distance: '3 km', width: '20–30 m', rock: 'Basaltic gabbro (concentric fracture fill)', age: 'Cretaceous', color: '#2F4F4F' },
  { label: 'Carbonatite Dikes', distance: '0–20 km', width: '1–4 m each × 32 dikes', rock: 'Massive carbonatite (mantle-sourced, 30 km deep)', age: '85–99 Ma', color: '#DAA520' },
  { label: 'Outer Gabbro Ring Dike', distance: '7–8 km', width: '50–70 m', rock: 'Basaltic gabbro (deeper concentric fracture)', age: 'Cretaceous', color: '#2F4F4F' },
  { label: 'Quartzite Ridges (Cuestas)', distance: '3–20 km', width: 'Variable', rock: 'Proterozoic–Ordovician sedimentary (resistant)', age: '541–445 Ma', color: '#C19A6B' },
  { label: 'Kimberlite Intrusions', distance: 'Northern sector', width: 'Sills + 1 plug', rock: 'Kimberlite (deepest source, >150 km)', age: '~99 Ma', color: '#4169E1' },
]

const TIMELINE = [
  { year: '~100 Ma', event: 'Atlantic Ocean opens. Pangaea splits. Magma rises through pre-existing crustal weakness beneath what will become the Sahara. A dome begins to form.', type: 'geology' },
  { year: '~99 Ma', event: 'Gabbroic magma fills concentric ring fractures. Kimberlite and carbonatite dikes punch through from 30–150 km depth. Two phreatic eruptions create maar basins at the centre.', type: 'geology' },
  { year: '~98 Ma', event: 'Hydrothermal activity creates the central megabreccia — a 3 km collapse zone. The caldera structure is set.', type: 'geology' },
  { year: '98–10 Ma', event: 'Ninety million years of wind and water. Differential erosion sculpts the dome into concentric rings. Soft rock erodes. Quartzite ridges resist.', type: 'geology' },
  { year: '~10,000 BP', event: 'The African Humid Period begins. The Sahara is green. The Tamanrasset River flows from the Atlas Mountains past the Richat to the Atlantic. The Eye holds water.', type: 'climate' },
  { year: '~5,000 BP', event: 'The Green Sahara ends. Desertification accelerates. The Richat dries. Sand advances.', type: 'climate' },
  { year: '~300,000 BP', event: 'Acheulean stone tools manufactured along the outer ring wadis. Homo erectus or Homo heidelbergensis use the structure as a seasonal hunting ground.', type: 'human' },
  { year: '~145–29 ka', event: 'Aterian stone artifacts (Middle Stone Age). Modern humans. Tools found across the structure.', type: 'human' },
  { year: 'Undated', event: 'Thousands of stone burial mounds line the protruding land dikes. Rock art depicts horsemen, chariots, bovids, elephants. Libyco-Berber inscriptions at Tin Labbé and Lemqader.', type: 'human' },
  { year: '~360 BCE', event: 'Plato writes Timaeus and Critias. Describes Atlantis: a circular island with alternating rings of water and land, beyond the Pillars of Hercules, rich in elephants and metals.', type: 'myth' },
  { year: '1930s', event: 'First described from aerial photographs as "Richât Crater" or "buttonhole" (boutonnière). Richard-Molard suggests laccolithic uplift.', type: 'discovery' },
  { year: '1952', event: 'Théodore Monod leads a geological expedition to Mauritania. Records four circular structures including Er Richât. Initially classified as a possible impact crater.', type: 'discovery' },
  { year: '1960s', event: 'Field and laboratory studies find no shock metamorphism. Coesite report retracted — it was misidentified barite. Impact hypothesis abandoned.', type: 'discovery' },
  { year: '1965', event: 'Gemini IV astronauts photograph the structure from orbit. It becomes a landmark for every subsequent space mission.', type: 'discovery' },
  { year: '2005', event: 'Matton, Jébrak & Lee publish "Resolving the Richat enigma" in Geology. Confirm: doming + hydrothermal karstification above an alkaline complex.', type: 'discovery' },
  { year: '2014', event: 'Matton & Jébrak publish comprehensive paper: "The eye of Africa — an isolated Cretaceous alkaline-hydrothermal complex." The science is settled.', type: 'discovery' },
  { year: '2022', event: 'IUGS designates the Richat Structure as one of the first 100 Geological Heritage Sites worldwide.', type: 'discovery' },
]

const ATLANTIS_COMPARISON = [
  { claim: 'Concentric rings of water and land', plato: '3 rings of water, 2 of land', richat: '3+ concentric quartzite ridges with valleys between', verdict: 'Superficial match' },
  { claim: 'Diameter', plato: '~127 stadia (~23 km)', richat: '40 km', verdict: 'Close if you allow conversion errors' },
  { claim: 'Beyond the Pillars of Hercules', plato: 'West of Gibraltar', richat: 'Southwest of Gibraltar, inland', verdict: 'Direction matches. Inland does not.' },
  { claim: 'Island in the sea', plato: 'Surrounded by ocean', richat: '500 km from the Atlantic, 400 m above sea level', verdict: 'No evidence of sea level at site' },
  { claim: 'Elephants present', plato: 'Many elephants on the island', richat: 'Rock art depicts elephants (Green Sahara era)', verdict: 'Match for Green Sahara period' },
  { claim: 'Hot and cold springs', plato: 'Two springs from beneath the earth', richat: 'Freshwater spring at centre. Hydrothermal history.', verdict: 'Plausible' },
  { claim: 'Destroyed in a single day', plato: 'Sunk beneath the sea in one day', richat: 'No evidence of catastrophic flooding event at this site', verdict: 'No geological support' },
  { claim: 'Archaeological evidence', plato: 'Advanced civilisation', richat: 'Stone tools only. No architecture. No pottery. No city.', verdict: 'No evidence of settlement' },
]

const BIG_NUMBERS = [
  { value: '100', unit: 'million years', label: 'Age of the igneous complex' },
  { value: '40', unit: 'km', label: 'Diameter of the structure' },
  { value: '32', unit: 'carbonatite dikes', label: 'Mapped within the dome' },
  { value: '150', unit: 'km deep', label: 'Source depth of kimberlite magma' },
  { value: '0', unit: 'cities found', label: 'Archaeological evidence for Atlantis' },
  { value: '1/100', unit: 'IUGS sites', label: 'Geological Heritage designation, 2022' },
]

// ── Helpers ──

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

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  )
}

// ── Ring Diagram SVG ──

function RingDiagram() {
  const [hovered, setHovered] = useState<number | null>(null)

  // Scale: 20km radius = 200px. So 1km = 10px
  const cx = 220, cy = 220
  const scale = 10 // px per km

  const rings = [
    { r: 1.5 * scale, label: 'Megabreccia', color: '#8B4513', strokeW: 3 * scale },
    { r: 3 * scale, label: 'Inner Gabbro', color: '#2F4F4F', strokeW: 2 },
    { r: 5 * scale, label: 'Carbonatites', color: '#DAA520', strokeW: 1, dashed: true },
    { r: 8 * scale, label: 'Outer Gabbro', color: '#2F4F4F', strokeW: 3 },
    { r: 12 * scale, label: 'Quartzite Ridge 1', color: '#C19A6B', strokeW: 4 },
    { r: 16 * scale, label: 'Quartzite Ridge 2', color: '#C19A6B', strokeW: 3 },
    { r: 20 * scale, label: 'Outer Limit', color: '#C19A6B', strokeW: 2 },
  ]

  return (
    <svg viewBox="0 0 440 440" style={{ width: '100%', maxWidth: 440 }}>
      {/* Background gradient - desert sand */}
      <defs>
        <radialGradient id="desert-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E6D3" />
          <stop offset="100%" stopColor="#EDE0D4" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={200} fill="url(#desert-bg)" />

      {/* Concentric rings */}
      {rings.map((ring, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={ring.r}
          fill="none"
          stroke={ring.color}
          strokeWidth={ring.strokeW}
          strokeDasharray={ring.dashed ? '6 4' : 'none'}
          opacity={hovered !== null && hovered !== i ? 0.2 : 0.9}
          style={{ transition: 'opacity 0.3s ease', cursor: 'pointer' }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}

      {/* Centre marker */}
      <circle cx={cx} cy={cy} r={4} fill="#8B4513" />

      {/* Scale bar */}
      <line x1={20} y1={420} x2={120} y2={420} stroke="#0a0a0a" strokeWidth={1.5} />
      <line x1={20} y1={416} x2={20} y2={424} stroke="#0a0a0a" strokeWidth={1} />
      <line x1={120} y1={416} x2={120} y2={424} stroke="#0a0a0a" strokeWidth={1} />
      <text x={70} y={414} textAnchor="middle" fontSize={10} fontFamily="'IBM Plex Mono', monospace" fill="#0a0a0a">10 km</text>

      {/* Hover label */}
      {hovered !== null && (
        <text x={cx} y={cy + rings[hovered].r + 16} textAnchor="middle" fontSize={11} fontFamily="'IBM Plex Mono', monospace" fill="#0a0a0a" fontWeight={500}>
          {rings[hovered].label}
        </text>
      )}
    </svg>
  )
}

// ── Atlantis Overlay SVG ──

function AtlantisOverlay() {
  const cx = 200, cy = 200
  return (
    <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: 400 }}>
      <defs>
        <radialGradient id="water-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8F4FD" />
          <stop offset="100%" stopColor="#D4E9F7" />
        </radialGradient>
      </defs>

      {/* Plato's description - blue water rings */}
      <circle cx={cx} cy={cy} r={180} fill="none" stroke="#4A90D9" strokeWidth={20} opacity={0.15} />
      <circle cx={cx} cy={cy} r={140} fill="none" stroke="#4A90D9" strokeWidth={15} opacity={0.15} />
      <circle cx={cx} cy={cy} r={100} fill="none" stroke="#4A90D9" strokeWidth={12} opacity={0.15} />
      <circle cx={cx} cy={cy} r={60} fill="url(#water-fill)" opacity={0.3} />

      {/* Richat actual rings - brown/earth */}
      <circle cx={cx} cy={cy} r={180} fill="none" stroke="#C19A6B" strokeWidth={3} />
      <circle cx={cx} cy={cy} r={145} fill="none" stroke="#C19A6B" strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={108} fill="none" stroke="#C19A6B" strokeWidth={3.5} />
      <circle cx={cx} cy={cy} r={72} fill="none" stroke="#2F4F4F" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={27} fill="none" stroke="#2F4F4F" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={13.5} fill="#8B4513" opacity={0.6} />

      {/* Labels */}
      <text x={cx} y={28} textAnchor="middle" fontSize={10} fontFamily="'IBM Plex Mono', monospace" fill="#4A90D9" opacity={0.7}>Plato's water rings (hypothetical)</text>
      <text x={cx} y={388} textAnchor="middle" fontSize={10} fontFamily="'IBM Plex Mono', monospace" fill="#8B6914">Richat quartzite ridges (actual)</text>
    </svg>
  )
}

// ── Cross Section SVG ──

function CrossSection() {
  // Simplified cross-section showing dome uplift and erosion
  const w = 600, h = 200
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%' }}>
      {/* Sedimentary layers - arched */}
      {[0, 1, 2, 3, 4].map(i => {
        const baseY = 160 - i * 15
        const archHeight = 60 - i * 8
        return (
          <path
            key={i}
            d={`M 0 ${baseY} Q ${w / 2} ${baseY - archHeight} ${w} ${baseY}`}
            fill="none"
            stroke="#C19A6B"
            strokeWidth={1.5}
            opacity={0.4 + i * 0.12}
          />
        )
      })}

      {/* Erosion surface */}
      <path
        d={`M 0 100 Q 100 95 150 80 Q 200 70 250 55 Q 300 50 350 55 Q 400 70 450 80 Q 500 95 ${w} 100`}
        fill="none"
        stroke="#0a0a0a"
        strokeWidth={2}
      />

      {/* Magma body below */}
      <ellipse cx={w / 2} cy={185} rx={120} ry={30} fill="#C62828" opacity={0.15} />
      <text x={w / 2} y={190} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#C62828" opacity={0.6}>Alkaline igneous intrusion</text>

      {/* Ring dikes */}
      <line x1={180} y1={80} x2={190} y2={165} stroke="#2F4F4F" strokeWidth={2.5} />
      <line x1={410} y1={80} x2={400} y2={165} stroke="#2F4F4F" strokeWidth={2.5} />
      <line x1={130} y1={90} x2={135} y2={165} stroke="#2F4F4F" strokeWidth={1.5} />
      <line x1={460} y1={90} x2={455} y2={165} stroke="#2F4F4F" strokeWidth={1.5} />

      {/* Labels */}
      <text x={w / 2} y={44} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#8B4513">Centre (oldest rock exposed)</text>
      <text x={30} y={110} fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#0a0a0a" opacity={0.5}>← 20 km</text>
      <text x={w - 60} y={110} fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#0a0a0a" opacity={0.5}>20 km →</text>
      <text x={170} y={75} fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#2F4F4F">Ring dikes</text>
    </svg>
  )
}

// ── Mapbox Satellite Component ──

function SatelliteMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!mapRef.current || loaded) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js'
    script.onload = () => {
      const mapboxgl = (window as any).mapboxgl
      if (!mapboxgl) return
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

      const map = new mapboxgl.Map({
        container: mapRef.current!,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-11.401, 21.124],
        zoom: 10.5,
        pitch: 0,
        bearing: 0,
        interactive: true,
        attributionControl: false,
      })

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.ScaleControl({ maxWidth: 200 }), 'bottom-left')

      map.on('load', () => {
        // Add a circle showing the 40km diameter
        map.addSource('richat-outline', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-11.401, 21.124]
            },
            properties: {}
          }
        })

        map.addLayer({
          id: 'richat-circle',
          type: 'circle',
          source: 'richat-outline',
          paint: {
            'circle-radius': 0,
            'circle-color': 'transparent',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1,
            'circle-stroke-opacity': 0.4,
          }
        })
      })

      setLoaded(true)
    }
    document.head.appendChild(script)
  }, [loaded])

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', background: '#1a1a1a' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute', bottom: 16, right: 16, background: 'rgba(0,0,0,0.7)',
        padding: '8px 14px', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
        color: '#ffffff', letterSpacing: '0.02em',
      }}>
        21.124°N, 11.401°W — Adrar Plateau, Mauritania
      </div>
      <div style={{
        position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.7)',
        padding: '8px 14px', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace",
        color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase',
      }}>
        Satellite View — Mapbox
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════

export function TheEyeOfAfricaContent() {
  const timelineTypes: Record<string, string> = {
    geology: '#8B4513',
    climate: '#2E7D32',
    human: '#C75B2A',
    myth: '#4A90D9',
    discovery: '#6A1B9A',
  }

  return (
    <div style={{ background: '#ffffff', color: '#0a0a0a', fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── Hero ── */}
      <section style={{ padding: '120px 24px 80px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 24 }}>
            Module 133 — Geological Intelligence
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 0.95, margin: '0 0 32px' }}>
            The Eye of Africa
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: 16, lineHeight: 1.75, maxWidth: 640, margin: '0 auto', color: '#262626' }}>
            The Richat Structure is a 40-kilometre geological dome in the Mauritanian Sahara,
            visible from orbit, formed 100 million years ago when the Atlantic Ocean opened.
            It is not a meteor crater. It is not Atlantis. It is older than both myths — and more extraordinary than either.
          </p>
        </FadeIn>

        {/* Concentric ring animation in hero */}
        <FadeIn delay={0.4}>
          <div style={{ margin: '60px auto 0', maxWidth: 280 }}>
            <svg viewBox="0 0 280 280" style={{ width: '100%' }}>
              {[120, 95, 72, 50, 30, 14].map((r, i) => (
                <circle
                  key={i}
                  cx={140} cy={140} r={r}
                  fill="none"
                  stroke="#C19A6B"
                  strokeWidth={i === 0 ? 1 : i < 3 ? 1.5 : 2}
                  opacity={0.3 + i * 0.1}
                >
                  <animate attributeName="r" from={r - 2} to={r} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from={0.15} to={0.3 + i * 0.1} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                </circle>
              ))}
              <circle cx={140} cy={140} r={5} fill="#8B4513" opacity={0.7} />
            </svg>
          </div>
        </FadeIn>
      </section>

      {/* ── Big Numbers ── */}
      <section style={{ padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px 32px' }}>
          {BIG_NUMBERS.map((n, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div>
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1, color: '#0a0a0a' }}>
                  {n.value}
                </span>
                <span style={{ fontSize: 13, color: '#8B6914', marginLeft: 6 }}>{n.unit}</span>
                <p style={{ fontSize: 11, color: '#737373', marginTop: 6, lineHeight: 1.5, letterSpacing: '0.02em' }}>
                  {n.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Satellite Map ── */}
      <section style={{ padding: '40px 0' }}>
        <FadeIn>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 16px' }}>
            <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 8 }}>
              Satellite Imagery
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 8 }}>
              The Bullseye
            </h2>
            <p style={{ fontSize: 13, color: '#737373', maxWidth: 560, lineHeight: 1.6 }}>
              Astronauts have used the Richat Structure as an orbital landmark since Gemini IV in 1965.
              It is easier to see from space than from the ground.
            </p>
          </div>
          <SatelliteMap />
          <p style={{ fontSize: 10, color: '#a3a3a3', textAlign: 'center', marginTop: 10, letterSpacing: '0.03em' }}>
            Satellite imagery © Mapbox / © OpenStreetMap. Pan and zoom to explore.
          </p>
        </FadeIn>
      </section>

      {/* ── Geological Anatomy ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 8 }}>
            Geological Structure
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 40 }}>
            What Made the Eye
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 48, alignItems: 'start' }}>
          {/* Ring Diagram */}
          <FadeIn delay={0.1}>
            <div style={{ textAlign: 'center' }}>
              <RingDiagram />
              <p style={{ fontSize: 10, color: '#a3a3a3', marginTop: 8 }}>Plan view — hover rings to identify. Scale bar = 10 km.</p>
            </div>
          </FadeIn>

          {/* Ring Layer Table */}
          <FadeIn delay={0.2}>
            <div>
              {RING_LAYERS.map((layer, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #e5e5e5' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: layer.color, flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0a0a0a', margin: 0 }}>{layer.label}</p>
                    <p style={{ fontSize: 11, color: '#737373', margin: '2px 0 0', lineHeight: 1.5 }}>
                      {layer.distance} from centre · {layer.width} · {layer.rock}
                    </p>
                    <p style={{ fontSize: 10, color: '#8B6914', margin: '2px 0 0' }}>{layer.age}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Cross Section */}
        <FadeIn delay={0.3}>
          <div style={{ marginTop: 60 }}>
            <p style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#737373', marginBottom: 16 }}>
              Simplified Cross-Section
            </p>
            <CrossSection />
            <p style={{ fontSize: 10, color: '#a3a3a3', marginTop: 8 }}>
              Sedimentary layers arched by magmatic uplift (~100 Ma). Erosion exposes concentric rings. Ring dikes (gabbro) mark fracture zones.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── The Atlantis Question ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A90D9', marginBottom: 8 }}>
            The Hypothesis
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 12 }}>
            Was This Atlantis?
          </h2>
          <p style={{ fontSize: 14, color: '#262626', maxWidth: 640, lineHeight: 1.75, marginBottom: 48 }}>
            In Timaeus and Critias (~360 BCE), Plato described a circular island city with alternating
            rings of water and land, beyond the Pillars of Hercules, destroyed in a single day.
            The Richat Structure, with its concentric rings in northwest Africa, has become the most
            popular candidate among alternative theorists. The mainstream scientific verdict is clear.
            But the comparison is worth mapping.
          </p>
        </FadeIn>

        {/* Atlantis overlay diagram */}
        <FadeIn delay={0.1}>
          <div style={{ maxWidth: 400, margin: '0 auto 48px', textAlign: 'center' }}>
            <AtlantisOverlay />
            <p style={{ fontSize: 10, color: '#a3a3a3', marginTop: 8 }}>
              Blue = Plato's hypothetical water rings. Brown = Richat's actual quartzite ridges.
            </p>
          </div>
        </FadeIn>

        {/* Comparison table */}
        <FadeIn delay={0.2}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #0a0a0a' }}>
                  <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#737373' }}>Claim</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4A90D9' }}>Plato Says</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8B4513' }}>Richat Shows</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0a0a0a' }}>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {ATLANTIS_COMPARISON.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0a0a0a' }}>{row.claim}</td>
                    <td style={{ padding: '10px 12px', color: '#4A90D9' }}>{row.plato}</td>
                    <td style={{ padding: '10px 12px', color: '#8B4513' }}>{row.richat}</td>
                    <td style={{ padding: '10px 12px', color: '#262626', fontStyle: 'italic' }}>{row.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div style={{ marginTop: 40, padding: 32, background: '#F8F6F3', border: '1px solid #e5e5e5' }}>
            <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.75, margin: 0 }}>
              <strong>The verdict:</strong> The Richat Structure is a natural geological formation at least 100 million years old.
              No archaeological evidence of any settlement — let alone a city — has been found. The concentric ring match
              is superficial. The structure is 500 km inland at 400 metres elevation. Most classicists consider Atlantis
              a rhetorical invention, not a geographic description. The IUGS designation as a Geological Heritage Site
              in 2022 confirms its significance is geological, not mythological.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 8 }}>
            Timeline
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>
            100 Million Years in 17 Moments
          </h2>
          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            {Object.entries(timelineTypes).map(([type, color]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#737373' }}>{type}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {TIMELINE.map((t, i) => (
          <FadeIn key={i} delay={i * 0.04}>
            <div style={{ display: 'flex', gap: 20, padding: '16px 0', borderTop: i === 0 ? '1px solid #e5e5e5' : 'none', borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ flexShrink: 0, width: 100, textAlign: 'right' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: timelineTypes[t.type] || '#0a0a0a' }}>{t.year}</span>
              </div>
              <div style={{ width: 10, flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: timelineTypes[t.type] || '#0a0a0a' }} />
              </div>
              <p style={{ fontSize: 13, color: '#262626', lineHeight: 1.6, margin: 0 }}>{t.event}</p>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* ── The Deeper Story ── */}
      <section style={{ padding: '80px 24px', maxWidth: 720, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 8 }}>
            The Thesis
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 32 }}>
            What the Eye Actually Tells Us
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p style={{ fontSize: 15, color: '#262626', lineHeight: 1.8, marginBottom: 24 }}>
            The Richat Structure formed when Africa and South America were still separating.
            Magma from 150 kilometres below the surface pushed through weaknesses in the crust
            left over from even older tectonic events. Gabbro filled ring fractures.
            Carbonatites arrived from 30 kilometres deep. Kimberlite — the rock that carries
            diamonds — erupted from 150 kilometres down. Then the dome sat in the sun and wind
            for 100 million years, and erosion did the rest.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{ fontSize: 15, color: '#262626', lineHeight: 1.8, marginBottom: 24 }}>
            The Acheulean tools along the outer wadis are hundreds of thousands of years old.
            During the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Green Sahara</span>, the Eye held water, grew vegetation, attracted elephants.
            Horsemen left <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>petroglyphs</span>. Libyco-Berber speakers carved inscriptions. Thousands of
            stone burial mounds line the dikes — and nobody has excavated them yet.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{ fontSize: 15, color: '#262626', lineHeight: 1.8, marginBottom: 24 }}>
            Then Plato wrote about a circular city with rings of water, beyond the Pillars of
            Hercules, and humans did what humans always do with extraordinary things they
            cannot fully explain: they told a story about it.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div style={{ borderLeft: '3px solid #8B6914', padding: '16px 24px', margin: '40px 0' }}>
            <p style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              color: '#0a0a0a',
              margin: 0,
            }}>
              The structure is 100 million years old. The myth is 2,400 years old.
              The geology does not need the myth. But the myth cannot stop reaching for the geology.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p style={{ fontSize: 15, color: '#262626', lineHeight: 1.8 }}>
            That tension — between what the earth actually is and what we need it to be —
            is the real story of the Eye of Africa. The Richat Structure is not Atlantis.
            It is something far older, far stranger, and far more real. A 40-kilometre window
            into the moment when a continent was born.
          </p>
        </FadeIn>
      </section>

      {/* ── NASA Image Credit ── */}
      <section style={{ padding: '40px 24px 20px', maxWidth: 720, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ padding: 24, background: '#F8F6F3', border: '1px solid #e5e5e5' }}>
            <p style={{ fontSize: 11, color: '#737373', lineHeight: 1.6, margin: 0 }}>
              <strong>Additional satellite imagery (public domain):</strong> NASA Earth Observatory
              hosts multiple Richat Structure images including ISS astronaut photograph ISS030-E-12516
              (Dec 2011) and ASTER false-colour composite (Oct 2000). Both freely available at{' '}
              <a href="https://earthobservatory.nasa.gov/images/92071/richat-structure" target="_blank" rel="noopener noreferrer" style={{ color: '#4A90D9' }}>
                earthobservatory.nasa.gov
              </a>. NASA/GSFC/JPL imagery is not copyrighted.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Sources ── */}
      <section style={{ padding: '60px 24px 80px', maxWidth: 720, margin: '0 auto', borderTop: '1px solid #e5e5e5' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 16 }}>
            Sources
          </p>
          <div style={{ fontSize: 11, color: '#737373', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 8 }}>Matton, G. & Jébrak, M. (2014). "The 'eye of Africa' (Richat dome, Mauritania): An isolated Cretaceous alkaline–hydrothermal complex." <em>Journal of African Earth Sciences</em>, 97, 109–124.</p>
            <p style={{ marginBottom: 8 }}>Matton, G., Jébrak, M. & Lee, J.K.W. (2005). "Resolving the Richat enigma: Doming and hydrothermal karstification above an alkaline complex." <em>Geology</em>, 33(8), 665–668.</p>
            <p style={{ marginBottom: 8 }}>Abdeina, E.H. et al. (2021). "Geophysical modelling of the deep structure of the Richat magmatic intrusion." <em>Arabian Journal of Geosciences</em>, 14(22).</p>
            <p style={{ marginBottom: 8 }}>Fudali, R.F. (1969). "Coesite from the Richat Dome, Mauritania: A Misidentification." <em>Science</em>, 166(3902), 228–230.</p>
            <p style={{ marginBottom: 8 }}>International Union of Geological Sciences (2022). IUGS Geological Heritage Sites — First 100. Richat Structure designation.</p>
            <p style={{ marginBottom: 8 }}>NASA Earth Observatory. ISS030-E-12516 (2011), ASTER image (2000), ISS063-E-43607 (2020). Public domain.</p>
            <p style={{ marginBottom: 8 }}>NASA Jet Propulsion Laboratory. Landsat/SRTM composite. Shuttle Radar Topography Mission data.</p>
            <p style={{ marginBottom: 8 }}>European Space Agency. ALOS satellite image (Nov 2010).</p>
            <p style={{ marginBottom: 8 }}>Plato. <em>Timaeus</em> and <em>Critias</em>. (~360 BCE).</p>
            <p style={{ marginBottom: 8 }}>Britannica. "Richat Structure." Updated November 2024.</p>
            <p>Wikipedia contributors. "Richat Structure." Accessed February 2026.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #e5e5e5', fontSize: 10, color: '#a3a3a3', lineHeight: 1.6 }}>
            <p>© Slow Morocco. All rights reserved.</p>
            <p>This visualisation may not be reproduced without visible attribution.</p>
            <p>Source: Slow Morocco · slowmorocco.com/stories/the-eye-of-africa</p>
          </div>
        </FadeIn>
      </section>

    </div>
  )
}
