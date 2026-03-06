'use client'

import { useEffect, useRef, useState } from 'react'

// ══════════════════════════════════════════════════
// MODULE 134 — THE GEMSTONE WITHOUT A MINE
// Libyan Desert Glass
// 29 million years. 6,500 km². One pharaoh. Zero craters.
// ══════════════════════════════════════════════════

// ── Data ──

const BIG_NUMBERS = [
  { value: '29', unit: 'million years', label: 'Age of the glass' },
  { value: '98%', unit: 'SiO₂', label: 'Silica purity — among the highest natural glasses on Earth' },
  { value: '6,500', unit: 'km²', label: 'Strewn field area (Egypt–Libya border)' },
  { value: '1,700°C', unit: 'minimum', label: 'Formation temperature (likely >2,250°C)' },
  { value: '0', unit: 'confirmed craters', label: 'Source impact structure — still unidentified' },
  { value: '1', unit: 'pharaoh', label: 'Tutankhamun\'s pectoral scarab — the only known ancient use' },
]

const ORIGIN_HYPOTHESES = [
  {
    name: 'Meteorite Surface Impact',
    status: 'Possible',
    color: '#C62828',
    evidence: [
      'Shocked quartz found in bedrock near strewn field (Koeberl & Ferrière, 2019)',
      'Zircon decomposition products (baddeleyite + ZrO₂) requiring >1,700°C',
      'Ortho-II zirconia polymorph requiring ~130,000 atmospheres of pressure (Kovaleva et al., 2023)',
      'Meteoritic metals (Ni, Cr, Co, Ir) detected in glass',
      'Hypatia stone — possible impactor fragment found in strewn field',
    ],
    against: 'No confirmed crater. Nearest craters (BP: 2 km, Oasis: 18 km) are too far away and wrong composition.',
  },
  {
    name: 'Airburst Explosion',
    status: 'Possible',
    color: '#E65100',
    evidence: [
      '2006 Sandia National Labs simulation showed large aerial burst could melt surface sand',
      'Analogous to trinitite (glass from Trinity nuclear test, 1945)',
      'Explains lack of crater — bolide exploded before impact',
      'Explains wide distribution across 6,500 km²',
      'Glass fragments lack typical ejecta morphologies',
    ],
    against: 'Airburst alone may not generate 130,000 atmospheres of pressure found in ortho-II zirconia. Energy requirements are extreme.',
  },
  {
    name: 'Comet Nucleus Impact',
    status: 'Speculative',
    color: '#4A148C',
    evidence: [
      'Hypatia stone (1996): diamond-bearing, carbon-dominant pebble found in strewn field',
      'Noble gas isotopes in Hypatia indicate extraterrestrial origin different from any known meteorite',
      'Kramers et al. (2013) propose shocked comet fragment',
      'Cometary impact could explain both glass formation and absence of surviving crater',
      'Polyaromatic hydrocarbons in Hypatia are consistent with interstellar dust',
    ],
    against: 'Hypatia has only been studied by one research group. No independent verification. Not officially classified as meteorite.',
  },
]

const TIMELINE = [
  { year: '~29 Ma', event: 'An object enters Earth\'s atmosphere over what is now the Egypt–Libya border. Whether it strikes the ground or explodes in the air, the heat is beyond imagination: at least 1,700°C, probably above 2,250°C. Desert sand fuses into nearly pure silica glass. Fragments scatter across 6,500 km² between the dunes of the Great Sand Sea.', type: 'event' },
  { year: 'Pleistocene', event: 'Stone Age humans discover the glass and recognise its value. They knap it like obsidian — chipping and flaking it into tools. Acheulean and Neolithic flakes of LDG are found at multiple sites within the strewn field.', type: 'human' },
  { year: '~1323 BCE', event: 'Tutankhamun is buried in the Valley of the Kings. Among thousands of grave goods: a gold pectoral depicting the god Ra as a winged scarab carrying the sun and moon. The scarab is carved from a single piece of pale yellow-green stone. Howard Carter, who opens the tomb in 1922, calls it chalcedony.', type: 'human' },
  { year: '1932', event: 'British geographer Patrick Clayton, exploring the Great Sand Sea along the Egypt–Libya border, finds strange pieces of yellow-green glass lying on the surface between the dunes. He collects samples. In 1934, he and Leonard Spencer of the British Museum publish the first scientific description. Spencer suggests the glass formed from dried lake deposits. This is wrong, but the mystery is now open.', type: 'discovery' },
  { year: '1996', event: 'Egyptian geologist Aly Barakat discovers a small, angular, intensely black pebble in the strewn field. It is extraordinarily hard. It contains microscopic diamonds. It will be named Hypatia, after the philosopher-astronomer of Alexandria.', type: 'discovery' },
  { year: '1998', event: 'Italian mineralogist Vincenzo de Michele analyses the optical properties of the scarab in Tutankhamun\'s pectoral. It is not chalcedony. It is Libyan Desert Glass — the same material Clayton found 800 km away in the desert. A pharaoh\'s jewel, carved from cosmic glass, misidentified for 76 years.', type: 'discovery' },
  { year: '2001', event: 'Kleinmann, Horn & Langenhorst find shocked quartz in sandstones from the strewn field — the first direct evidence of shock metamorphism. The impact hypothesis gains strength.', type: 'science' },
  { year: '2006', event: 'Sandia National Laboratories runs supercomputer simulations showing a large aerial burst — a meteoroid exploding in the atmosphere — could generate enough radiant heat to melt surface sand into glass. The airburst hypothesis is born. The resulting glass would be analogous to trinitite from the 1945 Trinity nuclear test.', type: 'science' },
  { year: '2007', event: 'Farouk El-Baz and Eman Ghoneim identify Kebira Crater (31 km diameter) on the Egypt–Libya border via satellite imagery. They propose it as the source. But no one has visited the site. No shock evidence has been found. As of 2026, it remains unconfirmed and rated "improbable" for impact origin.', type: 'science' },
  { year: '2013', event: 'Kramers et al. publish in Earth and Planetary Science Letters: the Hypatia stone is extraterrestrial. Noble gas isotopes exclude terrestrial origin. They propose it is a fragment of a comet nucleus that created the LDG upon impact. If correct, it is the first known cometary fragment on Earth.', type: 'science' },
  { year: '2019', event: 'Koeberl & Ferrière find shocked quartz in bedrock near the strewn field — not just in the glass itself. This points to a possible deeply eroded impact structure beneath the sand. The crater may exist. It may be buried.', type: 'science' },
  { year: '2023', event: 'Kovaleva et al. discover ortho-II zirconia in the glass — a polymorph that forms only at ~130,000 atmospheres of pressure. This is the strongest evidence yet for a surface impact rather than an airburst. The pressure is too extreme for an atmospheric explosion alone. Published in American Mineralogist.', type: 'science' },
  { year: '2026', event: 'The source crater has not been found. The debate continues. The glass remains one of the most beautiful, purest, and most enigmatic natural materials on Earth.', type: 'present' },
]

const COMPARISON_GLASSES = [
  { name: 'Libyan Desert Glass', sio2: 98, age: 29, location: 'Egypt–Libya border', color: '#D4A017', crater: 'Unknown' },
  { name: 'Moldavite', sio2: 80, age: 15, location: 'Central Europe (Ries crater)', color: '#2E7D32', crater: 'Ries, Germany (24 km)' },
  { name: 'Ivory Coast Tektite', sio2: 68, age: 1.07, location: 'Ivory Coast / Ghana', color: '#4E342E', crater: 'Bosumtwi, Ghana (10.5 km)' },
  { name: 'Australasian Tektite', sio2: 70, age: 0.79, location: 'SE Asia / Australia', color: '#1A1A1A', crater: 'Unknown' },
  { name: 'Trinitite', sio2: 70, age: 0.000081, location: 'New Mexico, USA', color: '#558B2F', crater: 'Trinity nuclear test (1945)' },
]

// ── Satellite Map ──

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
        center: [25.50, 25.35],
        zoom: 9.5,
        pitch: 0,
        bearing: 0,
        interactive: true,
        attributionControl: false,
      })

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.ScaleControl({ maxWidth: 200 }), 'bottom-left')

      map.on('load', () => {
        // Strewn field outline — approximate 6,500 km² ellipse
        map.addSource('strewn-field', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [(() => {
                const cx = 25.50, cy = 25.35, rx = 0.65, ry = 0.45
                const pts = []
                for (let i = 0; i <= 64; i++) {
                  const a = (i / 64) * 2 * Math.PI
                  pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)])
                }
                return pts
              })()]
            },
            properties: {}
          }
        })

        map.addLayer({
          id: 'strewn-fill',
          type: 'fill',
          source: 'strewn-field',
          paint: {
            'fill-color': '#D4AF37',
            'fill-opacity': 0.08,
          }
        })

        map.addLayer({
          id: 'strewn-outline',
          type: 'line',
          source: 'strewn-field',
          paint: {
            'line-color': '#D4AF37',
            'line-width': 1.5,
            'line-opacity': 0.6,
            'line-dasharray': [4, 3],
          }
        })

        // Centre marker with popup
        new mapboxgl.Marker({ color: '#D4AF37' })
          .setLngLat([25.50, 25.35])
          .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML('<div style="font-family:IBM Plex Mono,monospace;font-size:11px;padding:4px"><strong>LDG Strewn Field</strong><br/>6,500 km² scatter zone<br/>98% pure silica glass</div>'))
          .addTo(map)

        // Gilf Kebir marker
        new mapboxgl.Marker({ color: '#8B6914' })
          .setLngLat([25.00, 23.50])
          .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML('<div style="font-family:IBM Plex Mono,monospace;font-size:11px;padding:4px"><strong>Gilf Kebir</strong><br/>Plateau to the south<br/>Paleolithic tool sites</div>'))
          .addTo(map)
      })

      setLoaded(true)
    }
    document.head.appendChild(script)
  }, [loaded])

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px', background: '#0a0a0a' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute', bottom: 16, right: 16, background: 'rgba(0,0,0,0.8)',
        padding: '10px 16px', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
        color: '#ffffff', letterSpacing: '0.02em', backdropFilter: 'blur(8px)',
      }}>
        25.35°N, 25.50°E — Great Sand Sea, Egypt-Libya border
      </div>
      <div style={{
        position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.8)',
        padding: '10px 16px', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace",
        color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase', backdropFilter: 'blur(8px)',
      }}>
        Satellite View — Mapbox
      </div>
      <div style={{
        position: 'absolute', bottom: 16, left: 16, background: 'rgba(0,0,0,0.8)',
        padding: '10px 16px', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace",
        color: '#D4AF37', letterSpacing: '0.03em', backdropFilter: 'blur(8px)',
      }}>
        ◇ Dashed line = approximate strewn field boundary
      </div>
    </div>
  )
}

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

// ── Silica Purity Bar Chart ──

function PurityChart() {
  const maxSio2 = 100
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {COMPARISON_GLASSES.map((glass, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 160, flexShrink: 0, textAlign: 'right' }}>
            <span style={{ fontSize: 12, fontWeight: glass.name === 'Libyan Desert Glass' ? 700 : 400, color: '#0a0a0a' }}>
              {glass.name}
            </span>
          </div>
          <div style={{ flex: 1, height: 24, background: '#f0f0f0', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              width: `${(glass.sio2 / maxSio2) * 100}%`,
              height: '100%',
              background: glass.color,
              opacity: glass.name === 'Libyan Desert Glass' ? 0.85 : 0.4,
              transition: 'width 1s ease',
            }} />
            <span style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              fontSize: 11, fontWeight: 600, color: glass.sio2 > 85 ? '#fff' : '#0a0a0a',
              mixBlendMode: glass.sio2 > 85 ? 'normal' : 'normal',
            }}>
              {glass.sio2}% SiO₂
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Strewn Field SVG Map ──

function StrewnFieldMap() {
  // Simplified schematic of the Great Sand Sea with LDG strewn field
  // Not to geographic scale — designed for clarity
  return (
    <svg viewBox="0 0 500 400" style={{ width: '100%', maxWidth: 500 }}>
      <defs>
        <linearGradient id="sand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E6D3" />
          <stop offset="100%" stopColor="#E8D5BC" />
        </linearGradient>
        <pattern id="dunes" width="20" height="10" patternUnits="userSpaceOnUse">
          <path d="M 0 10 Q 5 5 10 10 Q 15 15 20 10" fill="none" stroke="#D4C4A8" strokeWidth={0.5} opacity={0.4} />
        </pattern>
      </defs>

      {/* Background — desert */}
      <rect width="500" height="400" fill="url(#sand-grad)" />
      <rect width="500" height="400" fill="url(#dunes)" />

      {/* Gilf Kebir Plateau */}
      <rect x={50} y={260} width={140} height={100} fill="#C19A6B" opacity={0.3} rx={4} />
      <text x={120} y={315} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#8B6914" fontWeight={500}>Gilf Kebir Plateau</text>

      {/* Great Sand Sea label */}
      <text x={300} y={50} textAnchor="middle" fontSize={11} fontFamily="'IBM Plex Mono', monospace" fill="#C19A6B" fontWeight={500} letterSpacing="0.15em">GREAT SAND SEA</text>

      {/* Egypt / Libya border */}
      <line x1={200} y1={20} x2={200} y2={380} stroke="#0a0a0a" strokeWidth={1} strokeDasharray="8 4" opacity={0.3} />
      <text x={170} y={385} fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#0a0a0a" opacity={0.4}>Libya</text>
      <text x={215} y={385} fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#0a0a0a" opacity={0.4}>Egypt</text>

      {/* LDG Strewn Field — oval ~25.3°N, 25.5°E */}
      <ellipse cx={300} cy={180} rx={60} ry={90} fill="#D4A017" opacity={0.15} stroke="#D4A017" strokeWidth={1.5} />

      {/* Glass fragments — scattered dots */}
      {[
        [270, 130], [310, 140], [285, 160], [330, 155], [295, 185],
        [275, 200], [320, 190], [300, 215], [310, 240], [280, 250],
        [305, 170], [290, 145], [315, 210], [325, 170], [270, 175],
        [330, 225], [285, 230], [300, 130], [260, 190], [340, 195],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill="#D4A017" opacity={0.5 + Math.random() * 0.3}>
          <animate attributeName="opacity" from={0.3} to={0.7} dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Strewn field label */}
      <text x={300} y={295} textAnchor="middle" fontSize={10} fontFamily="'IBM Plex Mono', monospace" fill="#D4A017" fontWeight={600}>LDG Strewn Field</text>
      <text x={300} y={308} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#D4A017">~6,500 km²</text>

      {/* Candidate craters */}
      {/* Kebira */}
      <circle cx={140} cy={160} r={16} fill="none" stroke="#C62828" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
      <text x={140} y={145} textAnchor="middle" fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#C62828" opacity={0.6}>Kebira?</text>
      <text x={140} y={182} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#C62828" opacity={0.4}>31 km · unconfirmed</text>

      {/* BP crater */}
      <circle cx={390} cy={120} r={4} fill="#C62828" opacity={0.3} />
      <text x={410} y={118} fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#C62828" opacity={0.5}>BP (2 km)</text>

      {/* Oasis crater */}
      <circle cx={420} cy={90} r={8} fill="#C62828" opacity={0.2} />
      <text x={445} y={88} fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#C62828" opacity={0.5}>Oasis (18 km)</text>

      {/* Hypatia find site */}
      <circle cx={280} cy={240} r={5} fill="none" stroke="#4A148C" strokeWidth={1.5} />
      <text x={280} y={258} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#4A148C">Hypatia stone (1996)</text>

      {/* Scale bar */}
      <line x1={380} y1={360} x2={460} y2={360} stroke="#0a0a0a" strokeWidth={1.5} />
      <line x1={380} y1={356} x2={380} y2={364} stroke="#0a0a0a" strokeWidth={1} />
      <line x1={460} y1={356} x2={460} y2={364} stroke="#0a0a0a" strokeWidth={1} />
      <text x={420} y={354} textAnchor="middle" fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#0a0a0a">~100 km</text>

      {/* Coordinates */}
      <text x={300} y={330} textAnchor="middle" fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#a3a3a3">~25.3°N, 25.5°E</text>
    </svg>
  )
}

// ── Scarab Diagram ──

function ScarabDiagram() {
  // Abstract representation of the pectoral — geometric scarab form
  return (
    <svg viewBox="0 0 200 160" style={{ width: '100%', maxWidth: 200 }}>
      {/* Wings — gold */}
      <path d="M 40 80 Q 20 60 30 40 Q 50 25 70 40 Q 80 50 80 65 Z" fill="#C9A84C" opacity={0.3} />
      <path d="M 160 80 Q 180 60 170 40 Q 150 25 130 40 Q 120 50 120 65 Z" fill="#C9A84C" opacity={0.3} />

      {/* Scarab body — LDG color */}
      <ellipse cx={100} cy={75} rx={22} ry={28} fill="#D4A017" opacity={0.6} />
      <ellipse cx={100} cy={75} rx={18} ry={24} fill="#E8C84A" opacity={0.4} />

      {/* Head */}
      <ellipse cx={100} cy={50} rx={10} ry={8} fill="#C9A84C" opacity={0.5} />

      {/* Sun disk above */}
      <circle cx={100} cy={25} r={12} fill="none" stroke="#C9A84C" strokeWidth={1} opacity={0.4} />

      {/* Label */}
      <text x={100} y={130} textAnchor="middle" fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#8B6914" fontWeight={500}>Tutankhamun's Pectoral</text>
      <text x={100} y={142} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#a3a3a3">Scarab carved from LDG</text>
      <text x={100} y={152} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#a3a3a3">~1323 BCE · Cairo Museum</text>
    </svg>
  )
}

// ══════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════

export function TheGemstoneWithoutAMineContent() {
  const timelineColors: Record<string, string> = {
    event: '#C62828',
    human: '#C75B2A',
    discovery: '#D4A017',
    science: '#1565C0',
    present: '#0a0a0a',
  }

  return (
    <div style={{ background: '#ffffff', color: '#0a0a0a', fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── Hero ── */}
      <section style={{ padding: '120px 24px 80px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 24 }}>
            Module 134 — Geological Intelligence
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 0.95, margin: '0 0 32px' }}>
            The Gemstone<br />Without a Mine
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: 16, lineHeight: 1.75, maxWidth: 640, margin: '0 auto', color: '#262626' }}>
            Twenty-nine million years ago, something entered the atmosphere over North Africa.
            It melted the desert into glass — 98% pure silica, scattered across 6,500 square kilometres.
            A pharaoh wore it. Paleolithic humans tooled it. Scientists still cannot find the crater.
          </p>
        </FadeIn>

        {/* Abstract glass shard animation */}
        <FadeIn delay={0.4}>
          <div style={{ margin: '60px auto 0', maxWidth: 200 }}>
            <svg viewBox="0 0 200 120" style={{ width: '100%' }}>
              {/* Abstract LDG shards */}
              {[
                { points: '80,20 95,55 70,60', fill: '#D4A017', op: 0.7 },
                { points: '100,10 120,50 105,55 85,45', fill: '#E8C84A', op: 0.5 },
                { points: '110,35 135,70 115,75 100,55', fill: '#D4A017', op: 0.6 },
                { points: '75,50 90,85 65,90 55,65', fill: '#C9A84C', op: 0.4 },
                { points: '120,55 140,90 125,95 110,70', fill: '#E8C84A', op: 0.35 },
              ].map((s, i) => (
                <polygon key={i} points={s.points} fill={s.fill} opacity={s.op}>
                  <animate attributeName="opacity" from={s.op * 0.5} to={s.op} dur={`${3 + i * 0.7}s`} repeatCount="indefinite" />
                </polygon>
              ))}
              <text x={100} y={115} textAnchor="middle" fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#D4A017" opacity={0.6}>
                Libyan Desert Glass fragments
              </text>
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
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 400, lineHeight: 1, color: '#0a0a0a' }}>
                  {n.value}
                </span>
                <span style={{ fontSize: 12, color: '#D4A017', marginLeft: 6 }}>{n.unit}</span>
                <p style={{ fontSize: 11, color: '#737373', marginTop: 6, lineHeight: 1.5, letterSpacing: '0.02em' }}>
                  {n.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── The Pharaoh's Scarab ── */}

      {/* ── Satellite View ── */}
      <section style={{ padding: '40px 0' }}>
        <FadeIn>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 16px' }}>
            <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8 }}>
              Satellite Imagery
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 8 }}>
              The Great Sand Sea
            </h2>
            <p style={{ fontSize: 13, color: '#737373', maxWidth: 560, lineHeight: 1.6 }}>
              The scatter field lies in the Western Desert of Egypt, near the Libyan border —
              one of the most remote and inhospitable regions on Earth. 6,500 km² of dune corridors
              where the glass was found, 29 million years after something turned sand into gemstone.
            </p>
          </div>
          <SatelliteMap />
          <p style={{ fontSize: 10, color: '#a3a3a3', textAlign: 'center', marginTop: 10, letterSpacing: '0.03em' }}>
            Satellite imagery © Mapbox / © OpenStreetMap. Pan and zoom to explore the scatter field.
          </p>
        </FadeIn>
      </section>

      {/* ── The Pharaoh's Scarab (continued) ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8 }}>
            The Discovery
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 32 }}>
            The Pharaoh's Mistake
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
          <FadeIn delay={0.1}>
            <div>
              <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8, marginBottom: 20 }}>
                In November 1922, Howard Carter entered Tutankhamun's tomb and found thousands of burial objects.
                Among them: a gold pectoral showing the god Ra as a winged scarab carrying the sun and moon.
                The scarab was carved from a pale yellow-green stone. Carter identified it as chalcedony — a variety of quartz.
              </p>
              <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8, marginBottom: 20 }}>
                He was wrong. For 76 years, nobody noticed.
              </p>
              <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8, marginBottom: 20 }}>
                In 1998, Italian mineralogist Vincenzo de Michele analysed the stone's optical properties and realised
                the scarab was not chalcedony at all. It was Libyan Desert Glass — the same material Patrick Clayton
                had discovered 800 kilometres away in the Sahara in 1932. A pharaoh's grave goods, carved from cosmic glass,
                misidentified for three-quarters of a century.
              </p>
              <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8 }}>
                Somebody in ancient Egypt — around 1323 BCE — walked deep into the most desolate
                section of the Libyan Desert, found pieces of yellow-green glass lying on the sand between the dunes,
                recognised them as precious, brought them back, and carved one into a scarab for a dead king.
                This is the only known use of Libyan Desert Glass in all of ancient Egypt.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ textAlign: 'center' }}>
              <ScarabDiagram />
              <div style={{ marginTop: 24, padding: 20, background: '#F8F6F3', border: '1px solid #e5e5e5' }}>
                <p style={{ fontSize: 11, color: '#737373', lineHeight: 1.6, margin: 0 }}>
                  The pectoral is exhibited at the Grand Egyptian Museum, Cairo.
                  The scarab — depicting the sun god Ra — is carved from a single piece
                  of Libyan Desert Glass. It remains the only known ancient artefact made from this material.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── The Strewn Field ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8 }}>
            The Glass Field
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 12 }}>
            6,500 Square Kilometres of Evidence
          </h2>
          <p style={{ fontSize: 13, color: '#737373', maxWidth: 560, lineHeight: 1.6, marginBottom: 40 }}>
            The strewn field lies between the sand dunes of the Great Sand Sea in western Egypt, near the Libyan border,
            north of the Gilf Kebir Plateau. Fragments range from microscopic to several tens of centimetres.
            The glass is found nowhere else on Earth.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
          <FadeIn delay={0.1}>
            <div style={{ textAlign: 'center' }}>
              <StrewnFieldMap />
              <p style={{ fontSize: 10, color: '#a3a3a3', marginTop: 8 }}>Schematic — not to geographic scale. Dashed circles: candidate craters (unconfirmed).</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>What the Glass Tells Us</h3>
              <div style={{ fontSize: 13, color: '#262626', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>
                  <strong>Composition:</strong> 96.5–99% SiO₂ (silicon dioxide). Nearly pure silica.
                  No other natural glass on Earth approaches this purity. For comparison, Moldavite is ~80% SiO₂.
                  Window glass is ~75%.
                </p>
                <p style={{ marginBottom: 16 }}>
                  <strong>Inclusions:</strong> Traces of iron, nickel, chromium, cobalt, and iridium — elements
                  consistent with meteoritic contamination. Contains lechatelierite (amorphous SiO₂ formed at extreme heat),
                  cristobalite, and baddeleyite (zircon decomposition product formed above 1,700°C).
                </p>
                <p style={{ marginBottom: 16 }}>
                  <strong>The critical mineral:</strong> In 2023, researchers found ortho-II zirconia (OII) —
                  a polymorph that forms only at approximately 130,000 atmospheres of pressure. This pressure
                  exceeds what an airburst alone could generate. It is the strongest evidence yet that something hit the ground.
                </p>
                <p>
                  <strong>But no crater has been found.</strong> The glass sits on the surface, between the dunes, with no visible
                  impact structure anywhere nearby. The nearest confirmed craters are BP (2 km, too small) and Oasis (18 km, too far and wrong composition).
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Silica Purity Comparison ── */}
      <section style={{ padding: '60px 24px', maxWidth: 800, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8 }}>
            Comparison
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 32 }}>
            Silica Purity — Natural Impact Glasses
          </h2>
          <PurityChart />
          <p style={{ fontSize: 10, color: '#a3a3a3', marginTop: 16 }}>
            Trinitite included for scale — formed by the 1945 Trinity nuclear test at White Sands, New Mexico.
            LDG's purity is unmatched by any other natural glass.
          </p>
        </FadeIn>
      </section>

      {/* ── The Origin Debate ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1565C0', marginBottom: 8 }}>
            The Debate
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 12 }}>
            Three Hypotheses. Zero Consensus.
          </h2>
          <p style={{ fontSize: 14, color: '#262626', maxWidth: 640, lineHeight: 1.75, marginBottom: 48 }}>
            After ninety years of study, the origin of Libyan Desert Glass remains one of the most debated
            questions in planetary science. Three competing hypotheses. All have evidence. None is conclusive.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {ORIGIN_HYPOTHESES.map((h, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ borderTop: `3px solid ${h.color}`, padding: '24px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0a0a0a', margin: 0 }}>{h.name}</h3>
                  <span style={{ fontSize: 10, color: h.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h.status}</span>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#737373', marginBottom: 8 }}>Evidence for:</p>
                  {h.evidence.map((e, j) => (
                    <p key={j} style={{ fontSize: 12, color: '#262626', lineHeight: 1.6, margin: '0 0 6px', paddingLeft: 12, borderLeft: `2px solid ${h.color}20` }}>
                      {e}
                    </p>
                  ))}
                </div>
                <div style={{ padding: 12, background: '#F8F6F3', border: '1px solid #e5e5e5' }}>
                  <p style={{ fontSize: 11, color: '#737373', lineHeight: 1.5, margin: 0 }}>
                    <strong>Against:</strong> {h.against}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Hypatia Stone ── */}
      <section style={{ padding: '60px 24px', maxWidth: 720, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ borderLeft: '3px solid #4A148C', padding: '16px 24px', background: '#F8F6F3' }}>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4A148C', marginBottom: 12 }}>
              The Hypatia Stone
            </p>
            <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8, marginBottom: 16 }}>
              In 1996, Egyptian geologist Aly Barakat found a small black pebble in the LDG strewn field.
              Named after the philosopher-astronomer of Alexandria, the Hypatia stone weighs approximately 30 grams.
              It is 70% carbon, contains microscopic diamonds, and its noble gas isotopes match no known meteorite, chondrite, or terrestrial rock.
            </p>
            <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8, marginBottom: 16 }}>
              Kramers et al. (2013) proposed it is a fragment of a comet nucleus — making it potentially
              the first piece of a comet ever identified on Earth's surface. In 2018, the same team found
              mineral compounds inside Hypatia (including a nickel phosphide unknown to science) that do not match
              anything from Earth, any known meteorite, or any known comet. Some components may predate
              the formation of the Solar System.
            </p>
            <p style={{ fontSize: 11, color: '#737373', lineHeight: 1.5, margin: 0 }}>
              Caveat: As of 2026, all published studies on Hypatia share the same lead research group (University of Johannesburg).
              No independent verification has been published. The stone has not been officially classified as a meteorite
              by the Meteoritical Bulletin.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8 }}>
            Timeline
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>
            29 Million Years in 13 Moments
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            {Object.entries(timelineColors).map(([type, color]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#737373' }}>{type}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {TIMELINE.map((t, i) => (
          <FadeIn key={i} delay={i * 0.04}>
            <div style={{ display: 'flex', gap: 20, padding: '16px 0', borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ flexShrink: 0, width: 100, textAlign: 'right' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: timelineColors[t.type] || '#0a0a0a' }}>{t.year}</span>
              </div>
              <div style={{ width: 10, flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: timelineColors[t.type] || '#0a0a0a' }} />
              </div>
              <p style={{ fontSize: 13, color: '#262626', lineHeight: 1.6, margin: 0 }}>{t.event}</p>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* ── Thesis ── */}
      <section style={{ padding: '80px 24px', maxWidth: 720, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8 }}>
            The Thesis
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 32 }}>
            What the Glass Actually Tells Us
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p style={{ fontSize: 15, color: '#262626', lineHeight: 1.8, marginBottom: 24 }}>
            The strangest thing about Libyan Desert Glass is not that it exists. It is that we
            found it, used it, and wore it for millennia before we understood what it was.
            Paleolithic humans knapped it into tools because it broke cleanly, like obsidian.
            Ancient Egyptians carved it because it was beautiful and rare.
            Patrick Clayton collected it because it was strange.
            And for ninety years, science has been trying to figure out what made it — and failing.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{ fontSize: 15, color: '#262626', lineHeight: 1.8, marginBottom: 24 }}>
            The glass is nearly pure silicon dioxide — purer than anything humans manufacture
            without a furnace. It was heated to at least 2,250 degrees Celsius, compressed
            at pressures equivalent to 130,000 atmospheres, and scattered across a stretch
            of desert the size of a small country. Something did this. We just cannot find it.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ borderLeft: '3px solid #D4A017', padding: '16px 24px', margin: '40px 0' }}>
            <p style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              color: '#0a0a0a',
              margin: 0,
            }}>
              The crater is missing. The impactor may be a comet that predates the Solar System.
              The only artefact ever carved from it was misidentified for 76 years.
              And a 30-gram pebble named after a murdered philosopher may contain the first
              physical evidence of a supernova explosion older than our Sun.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p style={{ fontSize: 15, color: '#262626', lineHeight: 1.8 }}>
            Libyan Desert Glass is the gemstone without a mine. It has no source you can visit,
            no deposit you can exploit, no formation you can explain with certainty.
            It is evidence of an event so violent that it turned sand into jewellery — and so ancient
            that the desert has swallowed every trace of what caused it, except the glass itself.
          </p>
        </FadeIn>
      </section>

      {/* ── Sources ── */}
      <section style={{ padding: '60px 24px 80px', maxWidth: 720, margin: '0 auto', borderTop: '1px solid #e5e5e5' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 16 }}>
            Sources
          </p>
          <div style={{ fontSize: 11, color: '#737373', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 8 }}>Kovaleva, E. et al. (2023). "Libyan Desert Glass: New evidence for an extremely high-pressure-temperature impact event from nanostructural study." <em>American Mineralogist</em>, 108(10), 1906–1923.</p>
            <p style={{ marginBottom: 8 }}>Magnani et al. (2026). "New evidence on the formation conditions of Libyan Desert Glass: Clues from a dendritic zircon inclusion." <em>Meteoritics & Planetary Science</em>.</p>
            <p style={{ marginBottom: 8 }}>Koeberl, C. & Ferrière, L. (2019). "Libyan Desert Glass area in western Egypt: Shocked quartz in bedrock points to a possible deeply eroded impact structure." <em>Meteoritics & Planetary Science</em>, 54(10).</p>
            <p style={{ marginBottom: 8 }}>Kramers, J.D. et al. (2013). "Unique chemistry of a diamond-bearing pebble from the Libyan Desert Glass strewnfield, SW Egypt: Evidence for a shocked comet fragment." <em>Earth and Planetary Science Letters</em>, 382, 21–31.</p>
            <p style={{ marginBottom: 8 }}>Belyanin, G.A. et al. (2018). "Petrography of the carbonaceous, diamond-bearing stone 'Hypatia'." <em>Geochimica et Cosmochimica Acta</em>.</p>
            <p style={{ marginBottom: 8 }}>Kleinmann, B., Horn, P. & Langenhorst, F. (2001). "Evidence for shock metamorphism in sandstones from the Libyan Desert Glass strewn field." <em>Meteoritics & Planetary Science</em>, 36(9), 1277–1282.</p>
            <p style={{ marginBottom: 8 }}>Fröhlich, F. et al. (2013). "Libyan Desert Glass: New field and Fourier transform infrared data." <em>Meteoritics & Planetary Science</em>, 48(12), 2517–2530.</p>
            <p style={{ marginBottom: 8 }}>El-Baz, F. & Ghoneim, E. (2007). "Largest crater shape in the Great Sahara: revealed by multi-spectral images and radar data." <em>International Journal of Remote Sensing</em>.</p>
            <p style={{ marginBottom: 8 }}>De Michele, V. (1998). "The 'Libyan desert glass' scarab in Tutankhamen's pectoral." <em>Sahara</em>, 10, 107–110.</p>
            <p style={{ marginBottom: 8 }}>Clayton, P.A. & Spencer, L.J. (1934). "Silica-glass from the Libyan Desert." <em>Mineralogical Magazine</em>, 23(144), 501–508.</p>
            <p>Wikipedia contributors. "Libyan desert glass," "Hypatia (stone)," "Kebira Crater." Accessed February 2026.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #e5e5e5', fontSize: 10, color: '#a3a3a3', lineHeight: 1.6 }}>
            <p>© Slow Morocco. All rights reserved.</p>
            <p>This visualisation may not be reproduced without visible attribution.</p>
            <p>Source: Slow Morocco · slowmorocco.com/stories/the-gemstone-without-a-mine</p>
          </div>
        </FadeIn>
      </section>

    </div>
  )
}
