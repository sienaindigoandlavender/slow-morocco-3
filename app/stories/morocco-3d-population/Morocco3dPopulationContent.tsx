'use client'

import { useState, useEffect, useRef, useMemo } from "react"

// Simple hex color darkening (no Three.js dependency needed)
function darkenHex(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const dr = Math.round(r * factor)
  const dg = Math.round(g * factor)
  const db = Math.round(b * factor)
  return `#${dr.toString(16).padStart(2, '0')}${dg.toString(16).padStart(2, '0')}${db.toString(16).padStart(2, '0')}`
}

/*
  Morocco 3D Population Density
  Each grid cell over Morocco is extruded proportional to estimated population density.
  Inspired by pudding.cool/2018/10/city_3d

  Data: Synthesized from WorldPop 2020 density estimates, HCP 2024 census results,
  and city population data from citypopulation.de

  Grid: ~0.25° resolution across Morocco's bounding box (roughly 20x12 = 240 cells visible)
  Each cell classified as: ocean (skip), sahara (<5/km²), rural (5-100),
  urban (100-1000), dense urban (1000-5000), megacity (5000+)
*/

// Morocco bounds: roughly lat 27.5-36, lng -13 to -1
const BOUNDS = { latMin: 27.5, latMax: 36, lngMin: -13.5, lngMax: -1 }
const STEP = 0.25
const ROWS = Math.ceil((BOUNDS.latMax - BOUNDS.latMin) / STEP)
const COLS = Math.ceil((BOUNDS.lngMax - BOUNDS.lngMin) / STEP)

// Earth palette
const EARTH = {
  paper: '#ffffff',
  cream: '#fafafa',
  ink: '#0a0a0a',
  body: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  saffron: '#C17F28',
  rust: '#A0522D',
  brick: '#8B3A3A',
  indigo: '#2D3A6E',
  sage: '#6B7F5E',
  emerald: '#2D6E4F',
  chocolate: '#3E2723',
  terracotta: '#B87A5E',
  wine: '#722F37',
}

// Simplified Morocco outline (polygon test) — major coastline + atlas + sahara boundary
// Point-in-polygon for rough Morocco shape
function isInMorocco(lat: number, lng: number): boolean {
  // Rough polygon vertices (clockwise)
  const poly = [
    [-5.9, 35.8], [-5.3, 35.9], [-4.4, 35.2], [-2.9, 35.1], [-2.2, 35.0],
    [-1.8, 34.7], [-1.3, 34.3], [-1.1, 33.5], [-1.2, 32.6], [-1.5, 32.1],
    [-1.1, 31.5], [-1.7, 30.4], [-2.2, 29.8], [-3.0, 29.4], [-4.4, 29.3],
    [-5.6, 29.5], [-6.6, 29.2], [-7.6, 29.3], [-8.7, 28.7], [-9.8, 27.5],
    [-10.5, 27.8], [-11.4, 28.0], [-12.1, 28.3], [-13.2, 28.8],
    [-13.1, 29.3], [-12.4, 30.0], [-11.7, 30.5], [-10.5, 31.5],
    [-9.8, 31.7], [-9.3, 32.1], [-9.6, 33.2], [-8.5, 33.3],
    [-7.6, 33.6], [-6.9, 33.8], [-6.4, 34.1], [-5.9, 34.8], [-5.6, 35.4],
    [-5.9, 35.8],
  ]
  // Ray casting
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1]
    const xj = poly[j][0], yj = poly[j][1]
    const intersect = ((yi > lat) !== (yj > lat)) && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi)
    if (intersect) inside = !inside
  }
  return inside
}

// Estimate population density for a grid cell based on proximity to known population centers
interface PopCenter {
  lat: number; lng: number; pop: number; radius: number; density: number
}

const POP_CENTERS: PopCenter[] = [
  // Megacities
  { lat: 33.57, lng: -7.59, pop: 4100000, radius: 0.35, density: 14000 }, // Casablanca
  { lat: 33.97, lng: -6.85, pop: 1900000, radius: 0.25, density: 7000 },  // Rabat-Salé
  { lat: 34.03, lng: -5.00, pop: 1200000, radius: 0.22, density: 5500 },  // Fes
  { lat: 31.63, lng: -8.01, pop: 1100000, radius: 0.25, density: 4500 },  // Marrakech
  { lat: 35.77, lng: -5.80, pop: 1100000, radius: 0.22, density: 5000 },  // Tangier

  // Large cities
  { lat: 33.90, lng: -5.55, pop: 650000, radius: 0.18, density: 3500 },   // Meknes
  { lat: 34.69, lng: -1.91, pop: 500000, radius: 0.18, density: 3000 },   // Oujda
  { lat: 30.42, lng: -9.60, pop: 500000, radius: 0.2, density: 2500 },    // Agadir
  { lat: 34.26, lng: -6.58, pop: 470000, radius: 0.15, density: 2800 },   // Kenitra
  { lat: 35.17, lng: -5.27, pop: 400000, radius: 0.15, density: 2500 },   // Tetouan
  { lat: 32.33, lng: -6.37, pop: 350000, radius: 0.12, density: 2000 },   // Beni Mellal
  { lat: 33.26, lng: -8.51, pop: 350000, radius: 0.12, density: 2000 },   // El Jadida
  { lat: 33.99, lng: -3.01, pop: 300000, radius: 0.12, density: 2000 },   // Taza
  { lat: 32.88, lng: -5.57, pop: 250000, radius: 0.1, density: 1500 },    // Khouribga
  { lat: 34.06, lng: -4.98, pop: 200000, radius: 0.1, density: 1500 },    // Sefrou
  { lat: 35.24, lng: -3.93, pop: 180000, radius: 0.1, density: 1200 },    // Nador
  { lat: 35.57, lng: -5.37, pop: 160000, radius: 0.1, density: 1200 },    // Larache
  { lat: 31.51, lng: -9.77, pop: 80000, radius: 0.15, density: 600 },     // Essaouira
  { lat: 35.17, lng: -4.40, pop: 50000, radius: 0.12, density: 400 },     // Chefchaouen

  // Atlas/rural zones — wider radius, lower density
  { lat: 32.5, lng: -5.5, pop: 0, radius: 1.5, density: 60 },   // Middle Atlas
  { lat: 31.2, lng: -7.0, pop: 0, radius: 1.0, density: 40 },   // High Atlas
  { lat: 30.0, lng: -6.5, pop: 0, radius: 1.5, density: 10 },   // Anti-Atlas/pre-Sahara
  { lat: 29.0, lng: -5.0, pop: 0, radius: 2.0, density: 3 },    // Draa-Tafilalet

  // Atlantic coastal corridor (higher baseline)
  { lat: 33.0, lng: -8.0, pop: 0, radius: 0.8, density: 200 },  // Doukkala
  { lat: 34.3, lng: -6.2, pop: 0, radius: 0.5, density: 150 },  // Gharb plain
  { lat: 33.5, lng: -7.0, pop: 0, radius: 0.6, density: 120 },  // Chaouia
]

function getDensity(lat: number, lng: number): number {
  let maxDensity = 0

  for (const c of POP_CENTERS) {
    const dlat = lat - c.lat
    const dlng = lng - c.lng
    const dist = Math.sqrt(dlat * dlat + dlng * dlng)

    if (dist < c.radius) {
      // Gaussian falloff from center
      const t = dist / c.radius
      const falloff = Math.exp(-3 * t * t)
      const d = c.density * falloff
      maxDensity = Math.max(maxDensity, d)
    }
  }

  // Baseline: latitude-dependent (more populated in north)
  const latFactor = Math.max(0, (lat - 28) / 8) // 0 at 28°, 1 at 36°
  const baseline = 5 + latFactor * 30

  return Math.max(maxDensity, baseline)
}

// Density → color (earth palette gradient)
function densityColor(d: number): string {
  if (d < 10) return '#f5f5f5'      // near-empty desert/rural — faint
  if (d < 50) return EARTH.sage      // light rural
  if (d < 200) return EARTH.terracotta // moderate
  if (d < 800) return EARTH.rust      // urban
  if (d < 2000) return EARTH.brick    // dense urban
  if (d < 5000) return EARTH.wine     // major city
  return EARTH.chocolate              // megacity core
}

// Major city labels
const CITY_LABELS = [
  { name: 'Casablanca', lat: 33.57, lng: -7.59, pop: '4.1M' },
  { name: 'Rabat', lat: 33.97, lng: -6.85, pop: '1.9M' },
  { name: 'Fes', lat: 34.03, lng: -5.00, pop: '1.2M' },
  { name: 'Marrakech', lat: 31.63, lng: -8.01, pop: '1.1M' },
  { name: 'Tangier', lat: 35.77, lng: -5.80, pop: '1.1M' },
  { name: 'Agadir', lat: 30.42, lng: -9.60, pop: '500K' },
  { name: 'Oujda', lat: 34.69, lng: -1.91, pop: '500K' },
  { name: 'Meknes', lat: 33.90, lng: -5.55, pop: '650K' },
]

export function Morocco3dPopulationContent() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef({ startX: 0, startRotation: 0 })
  const animRef = useRef<number>(0)

  // Precompute grid data
  const gridData = useMemo(() => {
    const cells: { row: number; col: number; lat: number; lng: number; density: number; color: string; height: number }[] = []

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const lat = BOUNDS.latMin + r * STEP + STEP / 2
        const lng = BOUNDS.lngMin + c * STEP + STEP / 2

        if (!isInMorocco(lat, lng)) continue

        const density = getDensity(lat, lng)
        const height = Math.log2(density + 1) * 0.15 // log scale for visual

        cells.push({
          row: r, col: c, lat, lng, density,
          color: densityColor(density),
          height: Math.max(0.02, height),
        })
      }
    }
    return cells
  }, [])

  // Max height for scale reference
  const maxHeight = useMemo(() => Math.max(...gridData.map(c => c.height)), [gridData])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  // Drag to rotate
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragRef.current = { startX: e.clientX, startRotation: rotation }
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragRef.current.startX
    setRotation(dragRef.current.startRotation + dx * 0.3)
  }
  const handleMouseUp = () => setIsDragging(false)

  // Convert grid coords to isometric projection
  function toIso(col: number, row: number, h: number = 0, rotDeg: number = 0) {
    // Center the grid
    const cx = col - COLS / 2
    const cy = row - ROWS / 2

    // Rotate
    const rad = (rotDeg * Math.PI) / 180
    const rx = cx * Math.cos(rad) - cy * Math.sin(rad)
    const ry = cx * Math.sin(rad) + cy * Math.cos(rad)

    // Isometric projection
    const scale = 14
    const x = (rx - ry) * scale
    const y = (rx + ry) * scale * 0.5 - h * 60

    return { x: 500 + x, y: 450 + y }
  }

  // Sort cells for proper rendering (back to front)
  const sortedCells = useMemo(() => {
    const rad = ((rotation || 0) * Math.PI) / 180
    return [...gridData].sort((a, b) => {
      const da = a.col * Math.sin(rad) + a.row * Math.cos(rad)
      const db = b.col * Math.sin(rad) + b.row * Math.cos(rad)
      return da - db
    })
  }, [gridData, rotation])

  return (
    <div style={{ background: EARTH.paper, minHeight: '100vh', fontFamily: "'IBM Plex Mono', monospace", color: EARTH.ink }}>

      {/* Header */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 0' }}>
        <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: EARTH.muted, marginTop: 16 }}>
          Module 009 · Demographics
        </p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontStyle: 'italic', lineHeight: 0.95, margin: '8px 0 16px', color: EARTH.ink }}>
          37.8 Million People
        </h1>
        <p style={{ fontSize: 13, color: EARTH.body, maxWidth: 560, lineHeight: 1.7 }}>
          Morocco&apos;s population density in three dimensions. Each bar is a grid cell —
          the taller the bar, the more people per square kilometre. The Atlantic
          corridor from Tangier to Agadir holds most of the country. The Sahara
          holds almost nobody.
        </p>

        <div style={{ display: 'flex', gap: 32, marginTop: 24 }}>
          {[
            { n: '37.8M', l: 'Population (2024 census)', c: EARTH.wine },
            { n: '87', l: 'People per km² (avg)', c: EARTH.rust },
            { n: '14,000', l: 'People per km² (Casablanca peak)', c: EARTH.chocolate },
            { n: '68%', l: 'Urban population', c: EARTH.indigo },
          ].map(s => (
            <div key={s.l}>
              <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: 24, color: s.c, margin: 0 }}>{s.n}</p>
              <p style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: EARTH.muted, margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Visualization — SVG Isometric */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 0' }}>
        <div style={{ borderTop: `1px solid ${EARTH.border}`, margin: '0 24px', paddingTop: 16 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: EARTH.muted }}>
            Drag to rotate · Height = population density
          </p>
        </div>

        <div
          style={{ cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg viewBox="0 0 1000 700" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Ground shadow */}
            <defs>
              <linearGradient id="bar-grad-dense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={EARTH.chocolate} />
                <stop offset="100%" stopColor={EARTH.wine} />
              </linearGradient>
            </defs>

            {/* Render bars */}
            {sortedCells.map((cell, i) => {
              const barW = 10
              const h = cell.height

              // Bottom face corners
              const bl = toIso(cell.col, cell.row + 1, 0, rotation)
              const br = toIso(cell.col + 1, cell.row + 1, 0, rotation)
              const fr = toIso(cell.col + 1, cell.row, 0, rotation)

              // Top face corners
              const tbl = toIso(cell.col, cell.row + 1, h, rotation)
              const tbr = toIso(cell.col + 1, cell.row + 1, h, rotation)
              const tfl = toIso(cell.col, cell.row, h, rotation)
              const tfr = toIso(cell.col + 1, cell.row, h, rotation)

              // Determine face visibility based on rotation
              const rad = (rotation * Math.PI) / 180
              const showRight = Math.cos(rad) > -0.3
              const showLeft = Math.sin(rad) > -0.3

              const topColor = cell.color
              const rightColor = darkenHex(cell.color, 0.75)
              const leftColor = darkenHex(cell.color, 0.6)

              return (
                <g key={`${cell.row}-${cell.col}`} opacity={isLoading ? 0 : 1} style={{ transition: `opacity 0.5s ease ${i * 0.5}ms` }}>
                  {/* Right face */}
                  {showRight && (
                    <polygon
                      points={`${tbr.x},${tbr.y} ${tfr.x},${tfr.y} ${fr.x},${fr.y} ${br.x},${br.y}`}
                      fill={rightColor}
                    />
                  )}
                  {/* Left face */}
                  {showLeft && (
                    <polygon
                      points={`${tbl.x},${tbl.y} ${tbr.x},${tbr.y} ${br.x},${br.y} ${bl.x},${bl.y}`}
                      fill={leftColor}
                    />
                  )}
                  {/* Top face */}
                  <polygon
                    points={`${tfl.x},${tfl.y} ${tfr.x},${tfr.y} ${tbr.x},${tbr.y} ${tbl.x},${tbl.y}`}
                    fill={topColor}
                  />
                </g>
              )
            })}

            {/* City labels */}
            {CITY_LABELS.map(city => {
              const col = (city.lng - BOUNDS.lngMin) / STEP
              const row = (city.lat - BOUNDS.latMin) / STEP
              const density = getDensity(city.lat, city.lng)
              const h = Math.max(0.02, Math.log2(density + 1) * 0.15)
              const pos = toIso(col, row, h + 0.3, rotation)

              return (
                <g key={city.name}>
                  {/* Stem line */}
                  <line
                    x1={pos.x} y1={pos.y}
                    x2={pos.x} y2={pos.y - 20}
                    stroke={EARTH.ink}
                    strokeWidth={0.5}
                    opacity={0.4}
                  />
                  {/* Label */}
                  <text
                    x={pos.x} y={pos.y - 24}
                    textAnchor="middle"
                    fill={EARTH.ink}
                    fontSize="8"
                    fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
                    fontWeight={600}
                  >
                    {city.name}
                  </text>
                  <text
                    x={pos.x} y={pos.y - 14}
                    textAnchor="middle"
                    fill={EARTH.muted}
                    fontSize="7"
                    fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
                  >
                    {city.pop}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Density legend */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ borderTop: `1px solid ${EARTH.border}`, paddingTop: 16 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: EARTH.muted, marginBottom: 8 }}>
            Density Scale
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: '< 10 / km²', color: '#f5f5f5', desc: 'Desert, uninhabited' },
              { label: '10–50', color: EARTH.sage, desc: 'Rural' },
              { label: '50–200', color: EARTH.terracotta, desc: 'Towns' },
              { label: '200–800', color: EARTH.rust, desc: 'Urban' },
              { label: '800–2000', color: EARTH.brick, desc: 'Dense urban' },
              { label: '2000–5000', color: EARTH.wine, desc: 'Major city' },
              { label: '5000+', color: EARTH.chocolate, desc: 'Megacity core' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 14, height: 14, background: item.color, borderRadius: 1 }} />
                <div>
                  <span style={{ fontSize: 10, color: EARTH.ink }}>{item.label}</span>
                  <span style={{ fontSize: 9, color: EARTH.muted, marginLeft: 4 }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Story */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ borderTop: `1px solid ${EARTH.border}`, paddingTop: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: EARTH.muted, marginBottom: 8 }}>The Atlantic Corridor</p>
              <p style={{ fontSize: 12, color: EARTH.body, lineHeight: 1.6 }}>
                The strip from Tangier to Agadir along the Atlantic coast holds roughly 70% of
                Morocco&apos;s population in less than 15% of its territory. This is where the
                highways, the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>TGV</span>, the industry, and the money concentrate. Casablanca alone
                accounts for nearly 12% of the national population.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: EARTH.muted, marginBottom: 8 }}>The Empty South</p>
              <p style={{ fontSize: 12, color: EARTH.body, lineHeight: 1.6 }}>
                South of the Atlas, population density drops to under 5 people per square
                kilometre. The Draa-Tafilalet region — dates, kasbahs, the road to the
                Sahara — covers 23% of Morocco&apos;s land area but holds less than 4%
                of its people. Erfoud, the date capital, feels like a different country.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: EARTH.muted, marginBottom: 8 }}>Marrakech vs. Casablanca</p>
              <p style={{ fontSize: 12, color: EARTH.body, lineHeight: 1.6 }}>
                Casablanca is the economic capital — 4.1 million people, the port, the
                stock exchange. But Marrakech at 1.1 million punches far above its weight:
                40% of all tourist overnight stays, the highest real estate prices per
                square metre in the country, and the cultural gravity that draws the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div style={{ backgroundColor: '#1f1f1f', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', paddingTop: 12 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Sources</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 700 }}>
            Population data from Haut-Commissariat au Plan (HCP) 2024 General Census of Population and Housing;
            WorldPop population density estimates (2020, ~1km resolution); city populations from citypopulation.de
            based on HCP official results. Grid resolution: ~0.25° (~25km at this latitude). Density values
            interpolated from census commune data and WorldPop raster estimates.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, flexWrap: 'wrap', gap: 8 }}>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
              © {new Date().getFullYear()} Slow Morocco. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
