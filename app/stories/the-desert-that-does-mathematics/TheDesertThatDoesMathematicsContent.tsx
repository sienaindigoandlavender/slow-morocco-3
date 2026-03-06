'use client'

import { useEffect, useRef, useState } from 'react'

// ══════════════════════════════════════════════════
// MODULE 135 — THE DESERT THAT DOES MATHEMATICS
// Namibia's Fairy Circles
// Millions of circles. One equation. No consensus.
// ══════════════════════════════════════════════════

// ── Data ──

const BIG_NUMBERS = [
  { value: '2–12', unit: 'metres', label: 'Diameter range of individual fairy circles' },
  { value: '2,400', unit: 'km', label: 'Length of the fairy circle belt — Angola to South Africa' },
  { value: '30–75', unit: 'years', label: 'Lifespan of a single fairy circle before grasses reclaim it' },
  { value: '6', unit: 'neighbours', label: 'Each circle has approximately six nearest neighbours — hexagonal geometry' },
  { value: '70–120', unit: 'mm/year', label: 'Rainfall band where circles form — too little for grass, too much for bare sand' },
  { value: '1952', unit: '', label: 'Year Alan Turing published his theory of self-organising patterns in nature' },
]

const HYPOTHESES = [
  {
    name: 'Termite Engineering',
    proponent: 'Norbert Jürgens (Universität Hamburg)',
    year: 2013,
    color: '#8B4513',
    mechanism: 'Sand termites (Psammotermes allocerus) eat grass roots below ground, killing vegetation and creating bare patches. The bare soil stores rainfall in deeper layers, sustaining the termite colony through droughts. The hexagonal spacing results from competing colonies maintaining territorial boundaries.',
    evidence: [
      'Jürgens found sand termites in 80–100% of fairy circles surveyed across Namibia, Angola, and South Africa (>1,700 circles)',
      'Bare soil stores water longer at 30–90 cm depth than vegetated soil',
      'Termite activity predates circle formation — they are present before grass dies',
      'Similar ecosystem engineering seen in Macrotermes mound patterns globally',
    ],
    against: 'Namibia\'s leading termite expert Eugene Marais could not confirm ubiquitous termite presence. Many circles show no termite activity. Australian fairy circles exist without Psammotermes. The hexagonal periodicity exceeds any known insect nesting pattern. Correlation ≠ causation.',
  },
  {
    name: 'Vegetation Self-Organisation',
    proponent: 'Stephan Getzin (University of Göttingen)',
    year: 2022,
    color: '#2E7D32',
    mechanism: 'Grasses compete for scarce water. Established clumps with deep roots (20–30 cm) extract soil moisture laterally — including from beneath the circles. New seedlings inside the circles cannot survive because the topsoil (0–12 cm) dries out within days of rainfall. The grass kills the grass. The pattern self-organises through "uptake-diffusion feedback" — a Turing mechanism.',
    evidence: [
      '500+ grass plants excavated: roots inside circles were undamaged — no termite feeding observed',
      'Dying grasses had roots as long or longer than surviving grasses (actively searching for water)',
      'Soil moisture sensors (2020–2022) showed surrounding grasses drained water from circles within 10–20 days',
      'Pattern matches Turing reaction-diffusion models: short-range facilitation, long-range inhibition',
      'Australian fairy circles follow identical pattern without any termite link',
    ],
    against: 'Jürgens argues the topsoil measurements miss the deeper water storage (30–90 cm) that termites create. The Hamburg group\'s lab analysis of soil hydrology disputes the Göttingen team\'s evaporation models.',
  },
  {
    name: 'Combined Model',
    proponent: 'Bonachela, Tarnita et al. (Princeton / Strathclyde)',
    year: 2017,
    color: '#1565C0',
    mechanism: 'Termites and vegetation self-organisation are not mutually exclusive — they interact. Termites clear vegetation on their mounds, increasing soil moisture. Plants at the circle edge exploit this water, growing taller and forming the visible ring. The hexagonal spacing emerges from both colony competition and Turing-type vegetation feedback. The system is a coupled biological-mathematical process.',
    evidence: [
      'Computer simulations reproduce fairy circle patterns when both termite and vegetation dynamics are modelled together',
      'Field data from four continents is consistent with combined model',
      'Explains why some circles have termites and some do not (termites amplify but may not be required)',
      'Predicts ecosystem resilience — combined system recovers from drought faster than vegetation alone',
    ],
    against: 'The 2022 and 2024 Göttingen studies found no termite root damage in systematically excavated grasses. A 2025 review by Cramer & Tschinkel concludes self-organisation alone is consistent with all field observations.',
  },
]

const TIMELINE = [
  { year: '~1920s', event: 'Fairy circles first mentioned in technical literature describing the Namib Desert grasslands. Local Himba people already know them — they call them the footprints of the god Mukuru, or the tracks of a dragon whose breath poisons the soil.', type: 'origin' },
  { year: '1952', event: 'Alan Turing — mathematician, codebreaker, computer pioneer — publishes "The Chemical Basis of Morphogenesis" in Philosophical Transactions of the Royal Society. He proposes that two substances reacting and diffusing at different speeds can generate patterns from initial uniformity. Spots. Stripes. Hexagons. He dies two years later. His theory is ignored for decades.', type: 'turing' },
  { year: '1979', event: 'G.K. Theron proposes that fairy circles are caused by Euphorbia damarana bushes poisoning the soil when they die. This "allelopathic" hypothesis persists for years. (It will be disproved in 2021.)', type: 'science' },
  { year: '2000', event: 'Becker & Getzin publish the first systematic ecological survey of fairy circles in the Kaokoveld, Namibia. The modern scientific investigation begins. They document size, distribution, and associated grass species (Stipagrostis ciliata, S. obtusa, S. uniplumis).', type: 'science' },
  { year: '2004', event: 'University of Pretoria botanist Gretel van Rooyen rejects proposals of termite activity, radioactive soil, and plant toxins. The cause remains unknown.', type: 'science' },
  { year: '2012', event: 'Walter Tschinkel (Florida State University) publishes the first lifespan study: small circles last ~24 years, large ones up to 75 years. They are born, grow, and die — like organisms.', type: 'science' },
  { year: '2013', event: 'Norbert Jürgens (Universität Hamburg) publishes in Science: sand termites of the genus Psammotermes are present in the vast majority of fairy circles and are responsible for killing the grass. Major media coverage. Major backlash. Tschinkel calls it "confusing correlation with causation."', type: 'debate' },
  { year: '2014', event: 'Fairy circles are found outside Africa for the first time — in the Pilbara region of Western Australia. The Australian circles have no link to Psammotermes sand termites. (Aboriginal Martu people call them "linyji" and have known them for generations.)', type: 'discovery' },
  { year: '2017', event: 'Bonachela, Tarnita et al. (Princeton / Strathclyde) publish in Nature: the answer may be both. Their combined model shows termite engineering and vegetation self-organisation can interact to produce fairy circle patterns. Field data from four continents supports the theory.', type: 'debate' },
  { year: '2020', event: 'Getzin et al. confirm that Australian fairy circles are a Turing pattern — self-organising vegetation created by abiotic weathering and biomass-water feedbacks. No termite involvement. Turing\'s 1952 theory, vindicated 68 years later — in the wrong desert.', type: 'turing' },
  { year: '2022', event: 'Getzin\'s team publishes the most detailed field study yet. Soil moisture sensors installed from 2020 to 2022 at 30-minute intervals. Hundreds of grasses excavated. Result: grass dies from water stress within 10–20 days of rainfall, with no evidence of termite root damage. Multiple fairy circle researchers declare the termite hypothesis "conclusively" refuted.', type: 'debate' },
  { year: '2023', event: 'Jürgens & Gröngröft publish a direct rebuttal. They demonstrate sand termites on 1,700+ circles and argue the Göttingen team measured the wrong soil depth. The debate intensifies, not resolves.', type: 'debate' },
  { year: '2024', event: 'Getzin\'s team shows that the 10–12 cm topsoil "death zone" inside fairy circles dries out far faster than surrounding areas. Seedlings with 10 cm roots cannot reach moisture below 20 cm. The established grasses around the circle act as "ecosystem engineers," draining the interior.', type: 'science' },
  { year: '2025', event: 'Cramer & Tschinkel publish a comprehensive review of all fairy circle theories. Their conclusion: self-organisation of vegetation is the only hypothesis consistent with all field observations. All other theories, including termites, have "serious shortcomings."', type: 'science' },
]

const TURING_PATTERNS_IN_NATURE = [
  { name: 'Leopard spots', desc: 'Reaction-diffusion of melanin-producing cells', icon: '●' },
  { name: 'Zebra stripes', desc: 'Activator-inhibitor system in pigment cells', icon: '║' },
  { name: 'Seashell spirals', desc: 'Self-organising pigment deposition patterns', icon: '◐' },
  { name: 'Sand ripples', desc: 'Wind-driven feedback in granular media', icon: '∿' },
  { name: 'Mussel bed gaps', desc: 'Spatial competition for food in tidal flats', icon: '○' },
  { name: 'Fairy circles', desc: 'Vegetation-water feedback in arid grasslands', icon: '◎' },
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
        center: [15.991, -24.725],
        zoom: 14.5,
        pitch: 0,
        bearing: 0,
        interactive: true,
        attributionControl: false,
      })

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.ScaleControl({ maxWidth: 200 }), 'bottom-left')

      map.on('load', () => {
        // Research study sites along the Namib pro-desert
        const studySites = [
          { lng: 15.991, lat: -24.725, name: 'NamibRand Core', desc: 'Primary study area · Juergens & Getzin fieldwork' },
          { lng: 16.02, lat: -24.68, name: 'Garub Plains', desc: 'Northern fairy circle belt · Termite hypothesis tested' },
          { lng: 15.80, lat: -25.10, name: 'Sossusvlei Region', desc: 'Southern extent · Circles grade into bare desert' },
        ]

        studySites.forEach(s => {
          new mapboxgl.Marker({ color: '#2E7D32', scale: 0.7 })
            .setLngLat([s.lng, s.lat])
            .setPopup(new mapboxgl.Popup({ offset: 20, closeButton: false })
              .setHTML(`<div style="font-family:IBM Plex Mono,monospace;font-size:11px;padding:4px"><strong>${s.name}</strong><br/>${s.desc}</div>`))
            .addTo(map)
        })

        // Approximate belt extent line (N-S transect through NamibRand)
        map.addSource('belt-line', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [15.95, -24.50],
                [15.97, -24.65],
                [15.991, -24.725],
                [15.98, -24.85],
                [15.90, -25.10],
              ]
            },
            properties: {}
          }
        })

        map.addLayer({
          id: 'belt-line-layer',
          type: 'line',
          source: 'belt-line',
          paint: {
            'line-color': '#2E7D32',
            'line-width': 2,
            'line-opacity': 0.5,
            'line-dasharray': [6, 4],
          }
        })
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
        24.73°S, 15.99°E — NamibRand Nature Reserve, Namibia
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
        color: '#2E7D32', letterSpacing: '0.03em', backdropFilter: 'blur(8px)',
      }}>
        Zoom in to see individual fairy circles · Zoom out for the 2,400 km belt
      </div>
    </div>
  )
}

// ── Hexagonal Field SVG ──

function HexagonalField() {
  // Generate a hexagonal grid of fairy circles
  const circles: { cx: number; cy: number; r: number; opacity: number }[] = []
  const rows = 7
  const cols = 9
  const spacing = 52
  const ySpacing = spacing * Math.sin(Math.PI / 3)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const offset = row % 2 === 0 ? 0 : spacing / 2
      const cx = 40 + col * spacing + offset
      const cy = 30 + row * ySpacing
      // Vary radius slightly for organic feel
      const r = 14 + Math.sin(row * 3 + col * 7) * 4
      const opacity = 0.12 + Math.sin(row * 5 + col * 3) * 0.06

      if (cx < 510 && cy < 340) {
        circles.push({ cx, cy, r, opacity })
      }
    }
  }

  return (
    <svg viewBox="0 0 520 350" style={{ width: '100%', maxWidth: 600 }}>
      {/* Sandy background */}
      <rect width="520" height="350" fill="#F0EBE1" rx={2} />

      {/* Grass matrix — tiny marks between circles */}
      {circles.map((c, i) => (
        <g key={`grass-${i}`}>
          {Array.from({ length: 8 }).map((_, j) => {
            const angle = (j / 8) * Math.PI * 2
            const gx = c.cx + Math.cos(angle) * (c.r + 3)
            const gy = c.cy + Math.sin(angle) * (c.r + 3)
            return (
              <line key={j} x1={gx} y1={gy} x2={gx + (Math.random() - 0.5) * 2} y2={gy - 2 - Math.random() * 3}
                stroke="#5D7A3A" strokeWidth={1} opacity={0.4 + Math.random() * 0.3} />
            )
          })}
        </g>
      ))}

      {/* Fairy circles — bare patches */}
      {circles.map((c, i) => (
        <g key={`fc-${i}`}>
          <circle cx={c.cx} cy={c.cy} r={c.r} fill="#D4C4A8" opacity={c.opacity + 0.15} />
          <circle cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke="#5D7A3A" strokeWidth={2.5} opacity={0.35} />
          <circle cx={c.cx} cy={c.cy} r={c.r + 1} fill="none" stroke="#5D7A3A" strokeWidth={1} opacity={0.15} />
        </g>
      ))}

      {/* Annotations */}
      <line x1={circles[10]?.cx || 0} y1={(circles[10]?.cy || 0) - (circles[10]?.r || 0) - 8} x2={circles[10]?.cx || 0} y2={(circles[10]?.cy || 0) + (circles[10]?.r || 0) + 8}
        stroke="#C62828" strokeWidth={1} markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <text x={(circles[10]?.cx || 0) + 20} y={(circles[10]?.cy || 0) - 2} fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#C62828">
        2–12 m
      </text>

      {/* Hexagon overlay on one cluster */}
      <polygon
        points={[0, 1, 2, 3, 4, 5].map(i => {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 6
          const hx = (circles[22]?.cx || 260) + Math.cos(angle) * spacing
          const hy = (circles[22]?.cy || 170) + Math.sin(angle) * spacing
          return `${hx},${hy}`
        }).join(' ')}
        fill="none" stroke="#1565C0" strokeWidth={1} strokeDasharray="4 3" opacity={0.5}
      />
      <text x={(circles[22]?.cx || 260) + spacing + 8} y={(circles[22]?.cy || 170) + 4} fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#1565C0" opacity={0.7}>
        hexagonal grid
      </text>

      {/* Label */}
      <text x={260} y={340} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#8B6914" fontWeight={500}>
        Schematic fairy circle field — approximate hexagonal spacing
      </text>

      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#C62828" strokeWidth={1} />
        </marker>
      </defs>
    </svg>
  )
}

// ── Water Feedback Diagram ──

function WaterFeedbackDiagram() {
  return (
    <svg viewBox="0 0 500 260" style={{ width: '100%', maxWidth: 500 }}>
      {/* Ground line */}
      <rect x={0} y={100} width={500} height={160} fill="#E8D5BC" opacity={0.3} />
      <line x1={0} y1={100} x2={500} y2={100} stroke="#C19A6B" strokeWidth={1.5} />

      {/* Depth markers */}
      <text x={4} y={115} fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#a3a3a3">0 cm</text>
      <text x={4} y={145} fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#a3a3a3">12 cm</text>
      <line x1={25} y1={140} x2={475} y2={140} stroke="#C19A6B" strokeWidth={0.5} strokeDasharray="3 3" opacity={0.4} />
      <text x={4} y={175} fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#a3a3a3">20 cm</text>
      <line x1={25} y1={170} x2={475} y2={170} stroke="#C19A6B" strokeWidth={0.5} strokeDasharray="3 3" opacity={0.4} />
      <text x={4} y={215} fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#a3a3a3">30 cm</text>

      {/* "Death Zone" label */}
      <rect x={150} y={102} width={200} height={38} fill="#C62828" opacity={0.08} />
      <text x={250} y={125} textAnchor="middle" fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#C62828" fontWeight={600}>
        DEATH ZONE (0–12 cm)
      </text>
      <text x={250} y={135} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#C62828" opacity={0.7}>
        dries within 10 days of rainfall
      </text>

      {/* Tall grasses at edge — left side */}
      {[60, 75, 90, 105].map((x, i) => (
        <g key={`gl-${i}`}>
          <line x1={x} y1={100} x2={x + (i % 2 === 0 ? -3 : 3)} y2={100 - 30 - i * 5} stroke="#2E7D32" strokeWidth={2} opacity={0.6} />
          <line x1={x} y1={100} x2={x} y2={170 + i * 3} stroke="#8B6914" strokeWidth={1} opacity={0.3} />
        </g>
      ))}

      {/* Tall grasses at edge — right side */}
      {[395, 410, 425, 440].map((x, i) => (
        <g key={`gr-${i}`}>
          <line x1={x} y1={100} x2={x + (i % 2 === 0 ? 3 : -3)} y2={100 - 30 - i * 5} stroke="#2E7D32" strokeWidth={2} opacity={0.6} />
          <line x1={x} y1={100} x2={x} y2={170 + i * 3} stroke="#8B6914" strokeWidth={1} opacity={0.3} />
        </g>
      ))}

      {/* Dead seedling in center */}
      <line x1={250} y1={100} x2={250} y2={88} stroke="#C19A6B" strokeWidth={1.5} opacity={0.5} />
      <line x1={250} y1={100} x2={250} y2={112} stroke="#8B6914" strokeWidth={0.8} opacity={0.3} />
      <text x={250} y={84} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#C62828">dead seedling</text>

      {/* Water arrows — grass pulling water from circle interior */}
      <path d="M 170 155 C 150 150 130 145 115 140" fill="none" stroke="#1565C0" strokeWidth={1.5} strokeDasharray="4 2" opacity={0.5} markerEnd="url(#blue-arrow)" />
      <path d="M 330 155 C 350 150 370 145 385 140" fill="none" stroke="#1565C0" strokeWidth={1.5} strokeDasharray="4 2" opacity={0.5} markerEnd="url(#blue-arrow)" />

      {/* Water label */}
      <text x={250} y={160} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#1565C0" opacity={0.7}>
        lateral water extraction
      </text>

      {/* Labels */}
      <text x={80} y={26} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#2E7D32" fontWeight={500}>
        Peripheral belt
      </text>
      <text x={80} y={38} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#2E7D32">
        10× biomass of matrix
      </text>

      <text x={250} y={50} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#C62828" fontWeight={500}>
        Fairy circle interior
      </text>
      <text x={250} y={62} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#C62828">
        bare soil
      </text>

      <text x={420} y={26} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#2E7D32" fontWeight={500}>
        Peripheral belt
      </text>
      <text x={420} y={38} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#2E7D32">
        roots at 20–30 cm depth
      </text>

      <defs>
        <marker id="blue-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#1565C0" strokeWidth={1} />
        </marker>
      </defs>
    </svg>
  )
}

// ── Turing Pattern Diagram ──

function TuringDiagram() {
  return (
    <svg viewBox="0 0 400 200" style={{ width: '100%', maxWidth: 400 }}>
      {/* Activator — short range */}
      <circle cx={200} cy={100} r={40} fill="#2E7D32" opacity={0.12} />
      <circle cx={200} cy={100} r={40} fill="none" stroke="#2E7D32" strokeWidth={1.5} opacity={0.4} />
      <text x={200} y={96} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#2E7D32" fontWeight={600}>Short-range</text>
      <text x={200} y={108} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#2E7D32" fontWeight={600}>facilitation</text>
      <text x={200} y={120} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#2E7D32" opacity={0.7}>(grass helps grass)</text>

      {/* Inhibitor — long range */}
      <circle cx={200} cy={100} r={90} fill="none" stroke="#C62828" strokeWidth={1} strokeDasharray="6 3" opacity={0.35} />
      <text x={200} y={18} textAnchor="middle" fontSize={9} fontFamily="'IBM Plex Mono', monospace" fill="#C62828" fontWeight={600}>Long-range inhibition</text>
      <text x={200} y={30} textAnchor="middle" fontSize={7} fontFamily="'IBM Plex Mono', monospace" fill="#C62828" opacity={0.7}>(grass starves distant grass of water)</text>

      {/* Arrows */}
      <path d="M 120 100 L 155 100" fill="none" stroke="#C62828" strokeWidth={1.5} markerEnd="url(#red-arrow)" opacity={0.5} />
      <path d="M 245 100 L 280 100" fill="none" stroke="#C62828" strokeWidth={1.5} markerEnd="url(#red-arrow)" opacity={0.5} />

      {/* Result label */}
      <text x={200} y={192} textAnchor="middle" fontSize={8} fontFamily="'IBM Plex Mono', monospace" fill="#0a0a0a" fontWeight={500}>
        Result: periodic pattern with characteristic wavelength
      </text>

      {/* Turing's name */}
      <text x={200} y={175} textAnchor="middle" fontSize={9} fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic" fill="#737373">
        Turing reaction-diffusion mechanism
      </text>

      <defs>
        <marker id="red-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#C62828" strokeWidth={1} />
        </marker>
      </defs>
    </svg>
  )
}

// ══════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════

export function TheDesertThatDoesMathematicsContent() {
  const timelineColors: Record<string, string> = {
    origin: '#8B6914',
    turing: '#6A1B9A',
    science: '#1565C0',
    debate: '#C62828',
    discovery: '#2E7D32',
  }

  return (
    <div style={{ background: '#ffffff', color: '#0a0a0a', fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── Hero ── */}
      <section style={{ padding: '120px 24px 80px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2E7D32', marginBottom: 24 }}>
            Module 135 — Geological Intelligence
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 0.95, margin: '0 0 32px' }}>
            The Desert That<br />Does Mathematics
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: 16, lineHeight: 1.75, maxWidth: 640, margin: '0 auto', color: '#262626' }}>
            Millions of bare circles dot the Namib Desert grasslands — 2 to 12 metres across,
            arranged in near-perfect hexagonal grids, stretching 2,400 kilometres from Angola to South Africa.
            They are born, they grow, and they die over 30 to 75 years. In 1952, Alan Turing
            predicted that nature could generate these patterns using nothing but mathematics.
          </p>
        </FadeIn>
      </section>

      {/* ── Big Numbers ── */}
      <section style={{ padding: '40px 24px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px 32px' }}>
          {BIG_NUMBERS.map((n, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div>
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, lineHeight: 1, color: '#0a0a0a' }}>
                  {n.value}
                </span>
                {n.unit && <span style={{ fontSize: 12, color: '#2E7D32', marginLeft: 6 }}>{n.unit}</span>}
                <p style={{ fontSize: 11, color: '#737373', marginTop: 6, lineHeight: 1.5 }}>{n.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Satellite View ── */}
      <section style={{ padding: '40px 0' }}>
        <FadeIn>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 16px' }}>
            <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2E7D32', marginBottom: 8 }}>
              Satellite Imagery
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 8 }}>
              The Pattern from Above
            </h2>
            <p style={{ fontSize: 13, color: '#737373', maxWidth: 560, lineHeight: 1.6 }}>
              At high zoom, individual fairy circles become visible — bare patches surrounded by
              taller grass, arranged in near-perfect hexagonal spacing. Zoom out to see the pattern
              repeat across the landscape for 2,400 kilometres.
            </p>
          </div>
          <SatelliteMap />
          <p style={{ fontSize: 10, color: '#a3a3a3', textAlign: 'center', marginTop: 10, letterSpacing: '0.03em' }}>
            Satellite imagery © Mapbox / © OpenStreetMap. Zoom out to see the full Namib belt.
          </p>
        </FadeIn>
      </section>

      {/* ── Hexagonal Field ── */}
      <section style={{ padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2E7D32', marginBottom: 8 }}>
            The Pattern
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 12 }}>
            Hexagons in the Sand
          </h2>
          <p style={{ fontSize: 13, color: '#737373', maxWidth: 560, lineHeight: 1.6, marginBottom: 40 }}>
            From the air, the pattern is unmistakable: bare circles of red Kalahari sand, each ringed
            by a belt of tall Stipagrostis grass, repeating across the landscape in a near-hexagonal grid.
            Each circle has approximately six nearest neighbours at consistent spacing. The pattern occurs
            only within a narrow rainfall band — 70 to 120 mm per year — where there is enough rain
            for grass to grow, but not enough for the grass to cover the ground completely.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ textAlign: 'center' }}>
            <HexagonalField />
          </div>
        </FadeIn>
      </section>

      {/* ── Turing's Prediction ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
          <FadeIn>
            <div>
              <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6A1B9A', marginBottom: 8 }}>
                The Mathematician
              </p>
              <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 24 }}>
                Turing Saw This Coming
              </h2>
              <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8, marginBottom: 20 }}>
                In 1952, Alan Turing published his last major work: "The Chemical Basis of Morphogenesis."
                He was not thinking about deserts. He was thinking about embryos — how does a spherical ball of cells
                become a non-spherical organism? A horse? A human? A starfish?
              </p>
              <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8, marginBottom: 20 }}>
                His answer was a mathematical model. Two substances — one that activates, one that inhibits —
                reacting and diffusing at different speeds. The activator promotes itself locally. The inhibitor
                spreads further and faster. From this tension between local amplification and long-range suppression,
                patterns emerge spontaneously: spots, stripes, hexagons.
              </p>
              <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8 }}>
                He called these substances "morphogens." The patterns they create are now called Turing patterns.
                Seventy years later, they explain leopard spots, zebra stripes, seashell markings, sand ripples,
                mussel bed gaps — and fairy circles. The grass itself is both activator and inhibitor: it facilitates
                growth nearby and kills growth at distance by draining the water.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <TuringDiagram />
              <div style={{ marginTop: 32, padding: 20, background: '#F8F6F3', border: '1px solid #e5e5e5' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6A1B9A', marginBottom: 10, fontWeight: 600 }}>
                  Turing patterns in nature
                </p>
                {TURING_PATTERNS_IN_NATURE.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 14, color: '#6A1B9A', opacity: 0.5, width: 16, textAlign: 'center' }}>{t.icon}</span>
                    <div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a' }}>{t.name}</span>
                      <span style={{ fontSize: 11, color: '#737373', marginLeft: 6 }}>— {t.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Water Feedback ── */}
      <section style={{ padding: '60px 24px', maxWidth: 800, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1565C0', marginBottom: 8 }}>
            The Mechanism
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 12 }}>
            How Grass Kills Grass
          </h2>
          <p style={{ fontSize: 13, color: '#737373', maxWidth: 560, lineHeight: 1.6, marginBottom: 32 }}>
            The "uptake-diffusion feedback" model (Getzin et al., 2022). Established grasses at the circle's edge
            extract soil moisture laterally — including from beneath the circle interior. New seedlings inside the circle
            die within 10–20 days because the topsoil dries out before their roots reach deeper moisture.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <WaterFeedbackDiagram />
          <p style={{ fontSize: 10, color: '#a3a3a3', marginTop: 8, textAlign: 'center' }}>
            Cross-section of a fairy circle. Not to scale. Based on Getzin et al., 2022 and 2024 field data.
          </p>
        </FadeIn>
      </section>

      {/* ── The Debate ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C62828', marginBottom: 8 }}>
            The Debate
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 12 }}>
            Termites. Plants. Or Both.
          </h2>
          <p style={{ fontSize: 14, color: '#262626', maxWidth: 640, lineHeight: 1.75, marginBottom: 48 }}>
            Few ecological debates have been as heated as this one. Two research groups — one in Hamburg,
            one in Göttingen — have published directly contradictory findings for over a decade.
            A third group at Princeton proposed that both sides are right.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {HYPOTHESES.map((h, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ borderTop: `3px solid ${h.color}`, padding: '24px 0' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0a0a0a', margin: '0 0 4px' }}>{h.name}</h3>
                <p style={{ fontSize: 11, color: h.color, marginBottom: 16 }}>{h.proponent} · {h.year}</p>
                <p style={{ fontSize: 12, color: '#262626', lineHeight: 1.7, marginBottom: 16 }}>{h.mechanism}</p>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#737373', marginBottom: 8 }}>Evidence:</p>
                  {h.evidence.map((e, j) => (
                    <p key={j} style={{ fontSize: 11, color: '#262626', lineHeight: 1.6, margin: '0 0 5px', paddingLeft: 10, borderLeft: `2px solid ${h.color}20` }}>
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

      {/* ── Timeline ── */}
      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2E7D32', marginBottom: 8 }}>
            Timeline
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>
            A Century of Circles
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
          <FadeIn key={i} delay={i * 0.03}>
            <div style={{ display: 'flex', gap: 20, padding: '14px 0', borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ flexShrink: 0, width: 60, textAlign: 'right' }}>
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

      {/* ── The Distribution ── */}
      <section style={{ padding: '60px 24px', maxWidth: 720, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ borderLeft: '3px solid #2E7D32', padding: '16px 24px', background: '#F8F6F3' }}>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2E7D32', marginBottom: 12 }}>
              Distribution
            </p>
            <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8, marginBottom: 16 }}>
              <strong>Namibia:</strong> The primary belt runs 2,400 km from the Marienfluss Valley and Giribes Plains in the north
              through the Brandberg, NamibRand Nature Reserve, and south to the Northwestern Cape of South Africa.
              The circles occur 80–140 km inland from the coast, in a narrow rainfall band of 70–120 mm/year.
              Soil: red Kalahari sand. Dominant grasses: Stipagrostis ciliata, S. obtusa, S. uniplumis.
            </p>
            <p style={{ fontSize: 14, color: '#262626', lineHeight: 1.8, marginBottom: 16 }}>
              <strong>Australia:</strong> Discovered in 2014 in the Pilbara region of Western Australia, east of Newman.
              Similar hexagonal patterns in Triodia (spinifex) grasslands. Aboriginal Martu people call them
              "linyji" (Manyjilyjarra language). Some may date to the Pleistocene (over 12,000 years).
              No Psammotermes termites present — the circles form through abiotic weathering and water competition.
            </p>
            <p style={{ fontSize: 11, color: '#737373', lineHeight: 1.5, margin: 0 }}>
              The Himba people of northern Namibia attribute the circles to the god Mukuru, to dragon's breath,
              or to spirits dancing. In a practical sense, the peripheral grass provides critical grazing
              for wildlife — springbok, oryx, and ostrich — during the dry season.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Thesis ── */}
      <section style={{ padding: '80px 24px', maxWidth: 720, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2E7D32', marginBottom: 8 }}>
            The Thesis
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 32 }}>
            What the Circles Actually Tell Us
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p style={{ fontSize: 15, color: '#262626', lineHeight: 1.8, marginBottom: 24 }}>
            The most extraordinary thing about fairy circles is not the pattern. It is the intelligence.
            These are not random gaps. They are not erosion. They are not poison. They are the desert solving
            a resource-allocation problem — how to distribute water among millions of competing plants in a landscape
            where rainfall is unpredictable, scarce, and spatially variable.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{ fontSize: 15, color: '#262626', lineHeight: 1.8, marginBottom: 24 }}>
            The answer the desert arrived at — hexagonal spacing of bare patches that store water
            for the surrounding vegetation — is the same answer mathematicians would give.
            Hexagons are the most efficient way to tile a plane. Bees know this. Crystal structures
            know this. And the Stipagrostis grasses of the Namib know this, without having
            a single neuron between them.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ borderLeft: '3px solid #6A1B9A', padding: '16px 24px', margin: '40px 0' }}>
            <p style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              color: '#0a0a0a',
              margin: 0,
            }}>
              In 1952, a mathematician who had helped crack the Enigma code predicted that nature could
              generate order from chaos through chemistry alone. He died two years later, persecuted for
              who he was. Seventy years after his paper, his equations describe a pattern that covers
              thousands of square kilometres of Namibian desert — circles made by grass, using water,
              doing mathematics it was never taught.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p style={{ fontSize: 15, color: '#262626', lineHeight: 1.8 }}>
            Getzin calls it "swarm intelligence." The Himba call it god's footprints. Turing would have
            called it morphogenesis. Whatever name you give it, the fact remains: the Namib Desert
            has been running a spatial algorithm for longer than human civilisation has existed.
            And the debate over how it works — termites, plants, water, or all three — is itself
            a pattern: science doing what science does, which is argue until the evidence settles.
            It hasn't settled yet. The circles are still there.
          </p>
        </FadeIn>
      </section>

      {/* ── Sources ── */}
      <section style={{ padding: '60px 24px 80px', maxWidth: 720, margin: '0 auto', borderTop: '1px solid #e5e5e5' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2E7D32', marginBottom: 16 }}>
            Sources
          </p>
          <div style={{ fontSize: 11, color: '#737373', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 8 }}>Turing, A.M. (1952). "The Chemical Basis of Morphogenesis." <em>Philosophical Transactions of the Royal Society B</em>, 237(641), 37–72.</p>
            <p style={{ marginBottom: 8 }}>Getzin, S. et al. (2022). "Plant water stress, not termite herbivory, causes Namibia's fairy circles." <em>Perspectives in Plant Ecology, Evolution and Systematics</em>.</p>
            <p style={{ marginBottom: 8 }}>Getzin, S. et al. (2024). "Fairy circles: plant water stress causes Namibia's gaps in grass." <em>Perspectives in Plant Ecology, Evolution and Systematics</em>.</p>
            <p style={{ marginBottom: 8 }}>Jürgens, N. & Gröngröft, A. (2023). "Sand termite herbivory causes Namibia's fairy circles — A response to Getzin." <em>Perspectives in Plant Ecology, Evolution and Systematics</em>.</p>
            <p style={{ marginBottom: 8 }}>Jürgens, N. (2013). "The biological underpinnings of Namib Desert fairy circles." <em>Science</em>, 339, 1618–1621.</p>
            <p style={{ marginBottom: 8 }}>Bonachela, J.A., Pringle, R.M., Sheffer, E. et al. (2017). "Termite mounds can increase the robustness of dryland ecosystems to climatic change." <em>Nature</em>, 541, 232.</p>
            <p style={{ marginBottom: 8 }}>Cramer, M.D. & Barger, N.N. (2013). "Are Namibian 'fairy circles' the consequence of self-organizing spatial vegetation patterning?" <em>PLOS ONE</em>, 8(8).</p>
            <p style={{ marginBottom: 8 }}>Cramer, M.D. & Tschinkel, W.R. (2025). "Review of fairy circle theories." [Review article].</p>
            <p style={{ marginBottom: 8 }}>Getzin, S. et al. (2020). "Discovery of fairy circles in Australia supports self-organization theory." <em>PNAS</em>.</p>
            <p style={{ marginBottom: 8 }}>Tschinkel, W.R. (2012). "The life cycle and life span of Namibian fairy circles." <em>PLOS ONE</em>, 7(6).</p>
            <p style={{ marginBottom: 8 }}>Getzin, S. et al. (2021). "Definition of 'fairy circles' and how they differ from other common vegetation gaps and plant rings." <em>Journal of Vegetation Science</em>.</p>
            <p>Wikipedia contributors. "Fairy circle (arid grass formation)," "Turing pattern," "The Chemical Basis of Morphogenesis." Accessed February 2026.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #e5e5e5', fontSize: 10, color: '#a3a3a3', lineHeight: 1.6 }}>
            <p>© Slow Morocco. All rights reserved.</p>
            <p>Sources: Getzin et al. (2022, 2024) · Jürgens (2013) · Turing (1952) · Bonachela et al. (2017)</p>
            <p>slowmorocco.com/stories/the-desert-that-does-mathematics</p>
          </div>
        </FadeIn>
      </section>

    </div>
  )
}
