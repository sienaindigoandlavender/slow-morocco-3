'use client'

import { useState, useEffect, useRef } from 'react'


// ═══ EARTH PALETTE ═══
const C = {
  sun: '#C17F28',       // saffron — solar
  wind: '#2D3A6E',      // indigo — wind
  hydro: '#2D6E4F',     // emerald — hydro
  ink: '#0a0a0a',
  body: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  faint: '#f5f5f5',
  morocco: '#8B3A3A',
  rust: '#A0522D',
  wine: '#722F37',
  sage: '#6B7F5E',
  ochre: '#C49A3C',
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// ═══ ENERGY INSTALLATIONS ═══
// Monthly output as % of peak month (100 = best month)
// Solar: peaks June-August. Wind: peaks winter + trade wind season. Hydro: peaks spring snowmelt.

interface Installation {
  name: string
  type: 'solar' | 'wind' | 'hydro'
  region: string
  capacity: number // MW
  annual: number // GWh/year
  monthly: number[] // 12 values, 0-100 normalized
  lat: number
  lng: number
  note: string
  year: number // commissioned
}

const INSTALLATIONS: Installation[] = [
  // ═══ SOLAR ═══
  {
    name: 'Noor Ouarzazate I–IV',
    type: 'solar', region: 'Draa-Tafilalet', capacity: 582, annual: 1200, year: 2016,
    monthly: [55, 65, 78, 88, 95, 100, 98, 96, 88, 75, 58, 48],
    lat: 31.05, lng: -6.86,
    note: 'World\'s largest concentrated solar power complex. 510 MW CSP + 72 MW PV. Molten salt storage delivers power after sunset. 3,000+ hectares. Powers 1.1 million homes.'
  },
  {
    name: 'Noor Midelt I',
    type: 'solar', region: 'Draa-Tafilalet', capacity: 800, annual: 1800, year: 2025,
    monthly: [50, 60, 75, 85, 93, 100, 100, 97, 85, 72, 55, 45],
    lat: 32.68, lng: -4.73,
    note: 'Hybrid CSP + PV. First plant to combine both technologies at this scale. MASEN flagship. Will be world\'s largest solar hybrid.'
  },
  {
    name: 'Noor Laayoune',
    type: 'solar', region: 'Laayoune-Sakia El Hamra', capacity: 80, annual: 170, year: 2018,
    monthly: [60, 68, 80, 90, 95, 100, 98, 95, 85, 72, 62, 55],
    lat: 27.15, lng: -13.20,
    note: 'Saharan PV installation. Among highest solar irradiance in the world — 2,264 kWh/m²/year.'
  },
  {
    name: 'Noor Boujdour',
    type: 'solar', region: 'Laayoune-Sakia El Hamra', capacity: 20, annual: 45, year: 2018,
    monthly: [62, 70, 80, 88, 95, 100, 97, 94, 85, 73, 63, 57],
    lat: 26.13, lng: -14.50,
    note: 'Southern PV plant. Part of MASEN\'s distributed solar network.'
  },

  // ═══ WIND ═══
  {
    name: 'Tarfaya Wind Farm',
    type: 'wind', region: 'Guelmim-Oued Noun', capacity: 301, annual: 1084, year: 2014,
    monthly: [90, 85, 80, 72, 65, 55, 48, 50, 60, 75, 88, 100],
    lat: 27.94, lng: -12.92,
    note: 'Africa\'s largest wind farm. 131 Siemens turbines. 45% capacity factor — among world\'s best for onshore wind. Offsets 790,000 tonnes CO₂/year.'
  },
  {
    name: 'Akhfennir I & II',
    type: 'wind', region: 'Guelmim-Oued Noun', capacity: 200, annual: 760, year: 2013,
    monthly: [92, 88, 82, 70, 62, 52, 45, 48, 58, 72, 85, 100],
    lat: 28.66, lng: -11.40,
    note: 'Atlantic trade wind farm. CDM certified. 270,000 tonnes CO₂/year offset. Extended from 100 MW to 200 MW in 2017.'
  },
  {
    name: 'Boujdour Wind Farm',
    type: 'wind', region: 'Laayoune-Sakia El Hamra', capacity: 300, annual: 1500, year: 2023,
    monthly: [95, 90, 85, 75, 65, 55, 50, 52, 62, 78, 90, 100],
    lat: 26.13, lng: -14.50,
    note: 'Morocco\'s newest mega wind farm. 300 MW. 1,500 GWh/year clean energy. Part of 850 MW integrated wind programme.'
  },
  {
    name: 'Jbel Sendouq (Tangier)',
    type: 'wind', region: 'Tanger-Tétouan-Al Hoceïma', capacity: 140, annual: 530, year: 2007,
    monthly: [85, 80, 75, 68, 60, 55, 52, 55, 62, 72, 82, 100],
    lat: 35.65, lng: -5.55,
    note: 'First major Moroccan wind farm. Strait of Gibraltar wind corridor. 9.5–11 m/s average wind speeds.'
  },
  {
    name: 'Khalladi (Tangier)',
    type: 'wind', region: 'Tanger-Tétouan-Al Hoceïma', capacity: 120, annual: 440, year: 2018,
    monthly: [88, 82, 78, 70, 62, 55, 50, 53, 60, 72, 84, 100],
    lat: 35.58, lng: -5.68,
    note: 'First privately financed wind farm in Morocco. ACWA Power. Near Strait of Gibraltar.'
  },
  {
    name: 'Midelt Wind',
    type: 'wind', region: 'Draa-Tafilalet', capacity: 180, annual: 620, year: 2024,
    monthly: [82, 78, 75, 68, 62, 58, 55, 57, 64, 72, 80, 100],
    lat: 32.68, lng: -4.73,
    note: 'High-altitude wind. Part of 850 MW integrated programme. Atlas Mountain wind corridor.'
  },
  {
    name: 'Jbel Lahdid (Essaouira)',
    type: 'wind', region: 'Marrakech-Safi', capacity: 200, annual: 740, year: 2024,
    monthly: [78, 75, 72, 68, 65, 62, 60, 62, 68, 75, 80, 100],
    lat: 31.51, lng: -9.77,
    note: 'Atlantic coast wind. Essaouira is known as "Wind City of Africa." Consistent alizé trade winds year-round.'
  },

  // ═══ HYDRO ═══
  {
    name: 'Al Wahda Dam',
    type: 'hydro', region: 'Tanger-Tétouan-Al Hoceïma', capacity: 240, annual: 400, year: 1997,
    monthly: [65, 72, 90, 100, 95, 75, 50, 35, 30, 40, 55, 60],
    lat: 34.63, lng: -4.94,
    note: 'Morocco\'s largest dam. Ouergha River. Peaks during spring snowmelt from Rif Mountains.'
  },
  {
    name: 'Bin el Ouidane',
    type: 'hydro', region: 'Béni Mellal-Khénifra', capacity: 135, annual: 285, year: 1954,
    monthly: [60, 70, 88, 100, 92, 70, 45, 30, 28, 38, 52, 58],
    lat: 32.10, lng: -6.46,
    note: 'Atlas Mountains reservoir. Built 1954. One of Morocco\'s oldest renewable installations. Oum Er-Rbia watershed.'
  },
  {
    name: 'Afourer STEP',
    type: 'hydro', region: 'Béni Mellal-Khénifra', capacity: 460, annual: 300, year: 2005,
    monthly: [70, 75, 85, 95, 100, 80, 55, 40, 35, 45, 60, 68],
    lat: 32.21, lng: -6.52,
    note: 'Pumped-storage hydroelectricity. 460 MW. Acts as giant battery — stores excess wind/solar for peak demand.'
  },
]

// ═══ RADIAL BLOOM COMPONENT ═══

function RadialBloom({ inst, size, isHovered, isSelected, onHover, onClick }: {
  inst: Installation
  size: number
  isHovered: boolean
  isSelected: boolean
  onHover: (name: string | null) => void
  onClick: () => void
}) {
  const cx = size / 2, cy = size / 2
  const maxR = size * 0.42
  const innerR = size * 0.08
  const color = inst.type === 'solar' ? C.sun : inst.type === 'wind' ? C.wind : C.hydro

  // Build the radial shape
  const points = inst.monthly.map((val, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2 // Start at top
    const r = innerR + (val / 100) * (maxR - innerR)
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    }
  })

  // Smooth path using cardinal spline approximation
  const pathData = points.map((p, i) => {
    if (i === 0) return `M${p.x.toFixed(1)},${p.y.toFixed(1)}`
    const prev = points[(i - 1 + 12) % 12]
    const next = points[(i + 1) % 12]
    const cpx1 = prev.x + (p.x - points[(i - 2 + 12) % 12].x) * 0.2
    const cpy1 = prev.y + (p.y - points[(i - 2 + 12) % 12].y) * 0.2
    const cpx2 = p.x - (next.x - prev.x) * 0.2
    const cpy2 = p.y - (next.y - prev.y) * 0.2
    return `C${cpx1.toFixed(1)},${cpy1.toFixed(1)} ${cpx2.toFixed(1)},${cpy2.toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`
  }).join(' ') + ' Z'

  // Month spoke lines
  const spokes = MONTHS.map((m, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
    return {
      x1: cx + Math.cos(angle) * innerR,
      y1: cy + Math.sin(angle) * innerR,
      x2: cx + Math.cos(angle) * maxR,
      y2: cy + Math.sin(angle) * maxR,
      lx: cx + Math.cos(angle) * (maxR + 8),
      ly: cy + Math.sin(angle) * (maxR + 8),
      label: m,
    }
  })

  return (
    <div className="flex flex-col items-center"
      style={{ cursor: 'pointer', opacity: isHovered || isSelected ? 1 : 0.85, transition: 'all 0.3s' }}
      onMouseEnter={() => onHover(inst.name)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {/* Background circle guides */}
        {[0.25, 0.5, 0.75, 1].map(f => (
          <circle key={f} cx={cx} cy={cy} r={innerR + f * (maxR - innerR)}
            fill="none" stroke={C.border} strokeWidth="0.3" opacity="0.4" />
        ))}

        {/* Month spokes */}
        {spokes.map((s, i) => (
          <g key={i}>
            <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
              stroke={C.border} strokeWidth="0.3" opacity="0.3" />
            {(isHovered || isSelected) && (
              <text x={s.lx} y={s.ly} textAnchor="middle" dominantBaseline="central"
                fill={C.muted} fontSize="5"
                fontFamily="var(--font-plex-mono), monospace">
                {s.label}
              </text>
            )}
          </g>
        ))}

        {/* The bloom shape — the data form */}
        <path d={pathData} fill={color} fillOpacity={isHovered || isSelected ? 0.18 : 0.08}
          stroke={color} strokeWidth={isHovered || isSelected ? 1.5 : 0.8}
          style={{ transition: 'all 0.3s' }} />

        {/* Data points on each spoke */}
        {(isHovered || isSelected) && points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill={color} stroke="white" strokeWidth="0.5" />
        ))}

        {/* Center label */}
        <text x={cx} y={cx - 3} textAnchor="middle" fill={color}
          fontSize="7" fontWeight={700}
          fontFamily="var(--font-plex-mono), monospace">
          {inst.capacity >= 1000 ? `${(inst.capacity / 1000).toFixed(1)}GW` : `${inst.capacity}MW`}
        </text>
        <text x={cx} y={cx + 5} textAnchor="middle" fill={C.muted}
          fontSize="4.5" fontFamily="var(--font-plex-mono), monospace">
          {inst.type.toUpperCase()}
        </text>
      </svg>

      {/* Name below */}
      <p className="text-[10px] text-center mt-1 leading-tight max-w-[120px]"
        style={{ color: isHovered || isSelected ? color : C.muted, fontWeight: isHovered || isSelected ? 600 : 400 }}>
        {inst.name}
      </p>
      <p className="text-[8px] text-center" style={{ color: C.muted }}>{inst.region}</p>
    </div>
  )
}

// ═══ PAGE ═══

// ═══ MAPBOX MAP ═══

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
const TYPE_MAP_COLORS: Record<string, string> = { solar: C.sun, wind: C.wind, hydro: C.hydro }

function EnergyMap({ installations, selected, onSelect }: { installations: Installation[]; selected: Installation | null; onSelect: (i: Installation) => void }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    let cancelled = false
    import('mapbox-gl').then((mapboxgl) => {
      if (cancelled || !mapContainer.current) return
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [-7.5, 30.5], zoom: 5, minZoom: 4.5, maxZoom: 9,
        attributionControl: false, pitchWithRotate: false, dragRotate: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => { mapRef.current = map; setMapLoaded(true) })
    })
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    markersRef.current.forEach(m => m.remove()); markersRef.current = []
    import('mapbox-gl').then((mapboxgl) => {
      installations.forEach((inst) => {
        const isSel = selected?.name === inst.name
        const color = TYPE_MAP_COLORS[inst.type] || '#0a0a0a'
        const size = Math.max(10, Math.min(24, inst.capacity / 80))
        const el = document.createElement('div')
        el.style.cssText = `width:${isSel ? size + 6 : size}px;height:${isSel ? size + 6 : size}px;background:${color};border:2px solid #fff;border-radius:50%;cursor:pointer;transition:all 0.2s;opacity:${isSel ? '1' : '0.8'};box-shadow:${isSel ? `0 0 0 2px ${color}` : 'none'}`
        el.title = `${inst.name} (${inst.capacity}MW)`
        el.addEventListener('click', () => onSelect(inst))
        markersRef.current.push(new mapboxgl.default.Marker({ element: el, anchor: 'center' }).setLngLat([inst.lng, inst.lat]).addTo(mapRef.current!))
      })
    })
  }, [mapLoaded, installations, selected, onSelect])

  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !selected) return
    mapRef.current.flyTo({ center: [selected.lng, selected.lat], zoom: 7.5, duration: 800 })
  }, [selected, mapLoaded])

  return (
    <div className="relative w-full">
      <div ref={mapContainer} className="w-full h-[380px] md:h-[480px]" style={{ background: '#f2f0eb' }} />
      {mapLoaded && selected && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 max-w-[200px] border" style={{ borderColor: C.border }}>
          <p className="font-serif text-[15px] leading-tight" style={{ color: C.ink }}>{selected.name}</p>
          <p className="text-[11px] mt-1" style={{ color: TYPE_MAP_COLORS[selected.type] }}>{selected.capacity} MW · {selected.type}</p>
          <p className="text-[10px] mt-1" style={{ color: C.muted }}>{selected.region}</p>
        </div>
      )}
      {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center bg-[#f2f0eb]"><p className="text-[13px] uppercase tracking-[0.08em]" style={{ color: C.muted }}>Loading map...</p></div>}
    </div>
  )
}

export function WindAndSunContent() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<Installation | null>(null)
  const [typeFilter, setTypeFilter] = useState<'all' | 'solar' | 'wind' | 'hydro'>('all')

  const filtered = typeFilter === 'all'
    ? INSTALLATIONS
    : INSTALLATIONS.filter(i => i.type === typeFilter)

  const totalCapacity = INSTALLATIONS.reduce((s, i) => s + i.capacity, 0)
  const totalAnnual = INSTALLATIONS.reduce((s, i) => s + i.annual, 0)
  const solarCap = INSTALLATIONS.filter(i => i.type === 'solar').reduce((s, i) => s + i.capacity, 0)
  const windCap = INSTALLATIONS.filter(i => i.type === 'wind').reduce((s, i) => s + i.capacity, 0)
  const hydroCap = INSTALLATIONS.filter(i => i.type === 'hydro').reduce((s, i) => s + i.capacity, 0)

  return (
    <div className="min-h-screen pt-16 bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-20 pb-8">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 012 · Energy Intelligence</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>Wind &amp; Sun</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          Morocco&apos;s renewable energy mapped as radial blooms
        </p>
        <p className="text-[13px] max-w-[620px] leading-[1.7] mt-4 mb-6" style={{ color: C.body }}>
          Each bloom is one installation. Twelve spokes — one per month. The radius
          is energy output. Solar installations swell in summer. Wind farms fatten
          in winter. Hydro blooms with spring snowmelt. The shape tells you
          when and where the energy flows.
        </p>
        <p className="text-[13px] max-w-[620px] leading-[1.7] mb-8" style={{ color: C.body }}>
          Morocco has 3,000 hours of sunshine per year. Wind speeds of 9–11 m/s on the
          <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Atlantic coast</span>. A 60% wind capacity factor — three times the European average.
          The target: 52% renewable electricity by 2030. At end of 2024, it reached 44%.
        </p>

        <div className="flex flex-wrap gap-8">
          {[
            { n: '44%', l: 'Renewable share (2024)', c: C.sage },
            { n: '52%', l: 'Target (2030)', c: C.hydro },
            { n: `${(totalCapacity/1000).toFixed(1)}GW`, l: 'Installed capacity mapped', c: C.ink },
            { n: `${(totalAnnual/1000).toFixed(1)}TWh`, l: 'Annual output mapped', c: C.muted },
            { n: '3,000', l: 'Hours of sun / year', c: C.sun },
            { n: '60%', l: 'Wind capacity factor', c: C.wind },
          ].map(s => (
            <div key={s.l}>
              <p className="font-serif italic text-[24px]" style={{ color: s.c }}>{s.n}</p>
              <p className="micro-label" style={{ color: C.muted }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FILTER + LEGEND ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%]">
        <div className="border-t border-b py-3 flex items-center justify-between flex-wrap gap-3" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest mr-2" style={{ color: C.muted }}>Type</span>
            {(['all', 'solar', 'wind', 'hydro'] as const).map(t => {
              const tc = t === 'solar' ? C.sun : t === 'wind' ? C.wind : t === 'hydro' ? C.hydro : C.ink
              return (
                <button key={t} onClick={() => setTypeFilter(t)}
                  className="px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all"
                  style={{
                    background: typeFilter === t ? tc : 'transparent',
                    color: typeFilter === t ? '#fff' : C.muted,
                    border: `1px solid ${typeFilter === t ? tc : C.border}`,
                  }}>
                  {t === 'all' ? 'All' : t}
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-4">
            {[
              { label: `Solar ${solarCap}MW`, color: C.sun },
              { label: `Wind ${windCap}MW`, color: C.wind },
              { label: `Hydro ${hydroCap}MW`, color: C.hydro },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="text-[9px]" style={{ color: C.muted }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INSTALLATION MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-8 mb-4">
        <p className="text-[10px] uppercase tracking-[0.06em] mb-3" style={{ color: C.muted }}>Installation Map — Click markers to explore. Circle size = capacity (MW).</p>
        <EnergyMap installations={filtered} selected={selected} onSelect={setSelected} />
      </section>

      {/* ═══ BLOOM GARDEN ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-8">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {filtered.map(inst => (
            <RadialBloom
              key={inst.name}
              inst={inst}
              size={140}
              isHovered={hovered === inst.name}
              isSelected={selected?.name === inst.name}
              onHover={setHovered}
              onClick={() => setSelected(selected?.name === inst.name ? null : inst)}
            />
          ))}
        </div>
      </section>

      {/* ═══ SELECTED DETAIL ═══ */}
      {selected && (
        <section className="px-8 md:px-[8%] lg:px-[12%] mt-6">
          <div className="p-6 border" style={{
            borderColor: (selected.type === 'solar' ? C.sun : selected.type === 'wind' ? C.wind : C.hydro) + '30'
          }}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest"
                  style={{ color: selected.type === 'solar' ? C.sun : selected.type === 'wind' ? C.wind : C.hydro }}>
                  {selected.type} · {selected.region}
                </p>
                <h3 className="font-serif italic text-[24px] mt-1">{selected.name}</h3>
              </div>
              <div className="text-right">
                <p className="font-serif italic text-[28px]"
                  style={{ color: selected.type === 'solar' ? C.sun : selected.type === 'wind' ? C.wind : C.hydro }}>
                  {selected.capacity >= 1000 ? `${(selected.capacity / 1000).toFixed(1)} GW` : `${selected.capacity} MW`}
                </p>
                <p className="text-[10px]" style={{ color: C.muted }}>Installed capacity</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>Annual Output</p>
                <p className="text-[14px] font-medium mt-1">{selected.annual.toLocaleString()} GWh</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>Commissioned</p>
                <p className="text-[14px] mt-1">{selected.year}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>Peak Season</p>
                <p className="text-[14px] mt-1">
                  {selected.type === 'solar' ? 'Jun–Aug' : selected.type === 'wind' ? 'Nov–Feb' : 'Mar–May'}
                </p>
              </div>
            </div>

            {/* Monthly bar chart */}
            <div className="mt-4 flex items-end gap-1 h-[40px]">
              {selected.monthly.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div style={{
                    height: `${v * 0.35}px`,
                    background: selected.type === 'solar' ? C.sun : selected.type === 'wind' ? C.wind : C.hydro,
                    opacity: 0.6,
                    width: '100%',
                    transition: 'height 0.3s',
                  }} />
                  <span className="text-[7px]" style={{ color: C.muted }}>{MONTHS[i]}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] mt-4 leading-[1.6]" style={{ color: C.body }}>{selected.note}</p>
            <button onClick={() => setSelected(null)} className="text-[10px] uppercase tracking-widest mt-3"
              style={{ color: C.muted }}>Close ×</button>
          </div>
        </section>
      )}

      {/* ═══ SEASONAL COMPLEMENTARITY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>Seasonal Complementarity — Why Morocco&apos;s Mix Works</p>

          {/* Stacked seasonal chart */}
          <div className="h-[180px] flex items-end gap-1">
            {MONTHS.map((m, mi) => {
              // Average output by type for this month
              const solarAvg = INSTALLATIONS.filter(i => i.type === 'solar')
                .reduce((s, i) => s + i.monthly[mi] * i.annual, 0) /
                INSTALLATIONS.filter(i => i.type === 'solar').reduce((s, i) => s + i.annual, 0) || 0
              const windAvg = INSTALLATIONS.filter(i => i.type === 'wind')
                .reduce((s, i) => s + i.monthly[mi] * i.annual, 0) /
                INSTALLATIONS.filter(i => i.type === 'wind').reduce((s, i) => s + i.annual, 0) || 0
              const hydroAvg = INSTALLATIONS.filter(i => i.type === 'hydro')
                .reduce((s, i) => s + i.monthly[mi] * i.annual, 0) /
                INSTALLATIONS.filter(i => i.type === 'hydro').reduce((s, i) => s + i.annual, 0) || 0

              const total = solarAvg + windAvg + hydroAvg
              const maxTotal = 280 // rough normalization

              return (
                <div key={m} className="flex-1 flex flex-col items-center gap-0">
                  <div className="w-full flex flex-col-reverse">
                    <div style={{ height: `${(hydroAvg / maxTotal) * 150}px`, background: C.hydro, opacity: 0.6 }} />
                    <div style={{ height: `${(windAvg / maxTotal) * 150}px`, background: C.wind, opacity: 0.6 }} />
                    <div style={{ height: `${(solarAvg / maxTotal) * 150}px`, background: C.sun, opacity: 0.6 }} />
                  </div>
                  <span className="text-[8px] mt-1" style={{ color: C.muted }}>{m}</span>
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3" style={{ background: C.sun, opacity: 0.6 }} />
              <span className="text-[9px]" style={{ color: C.muted }}>Solar (peaks summer)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3" style={{ background: C.wind, opacity: 0.6 }} />
              <span className="text-[9px]" style={{ color: C.muted }}>Wind (peaks winter)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3" style={{ background: C.hydro, opacity: 0.6 }} />
              <span className="text-[9px]" style={{ color: C.muted }}>Hydro (peaks spring)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-12">
        <div className="border-t pt-8 grid grid-cols-1 md:grid-cols-3 gap-8" style={{ borderColor: C.border }}>
          <div>
            <p className="micro-label mb-2" style={{ color: C.sun }}>The Sun</p>
            <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
              3,000 hours of sunshine per year. Up to 3,600 in the Saharan south.
              The Noor Ouarzazate complex — 3,000 hectares of mirrors in the desert —
              stores energy in molten salt to deliver power after sunset. It was the
              first plant in Africa to prove that solar could work at utility scale.
              By 2028, Noor Midelt will be the world&apos;s largest solar hybrid.
            </p>
          </div>
          <div>
            <p className="micro-label mb-2" style={{ color: C.wind }}>The Wind</p>
            <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
              The Atlantic trade winds blow steadily along 3,000 kilometres of coast.
              Tarfaya&apos;s wind farm runs at 45% capacity factor — among the best on
              Earth for onshore wind, and three times the European average. Wind accounts
              for 44% of Morocco&apos;s renewable output. In winter, when solar dips,
              wind takes over. The complementarity is natural.
            </p>
          </div>
          <div>
            <p className="micro-label mb-2" style={{ color: C.hydro }}>The Water</p>
            <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
              Atlas Mountain snowmelt feeds reservoirs that peak in spring — exactly
              when both solar and wind are between seasons. The Afourer pumped-storage
              plant acts as a 460 MW battery, absorbing excess renewable energy and
              releasing it on demand. Hydro is 40% of renewables — the silent backbone.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ THE CLOSING ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-12">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Morocco imports 97% of its fossil fuel. It exports sunshine.
          </p>
          <p className="text-[13px] mt-4 leading-[1.7]" style={{ color: C.body }}>
            The kingdom ranked in the top 10 of the Climate Change Performance Index
            2025 — higher than most EU countries. Not because of wealth, but because
            of geography, political will, and the simple arithmetic of a country
            that decided to build its economy on what it has rather than what it buys.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Installation data: MASEN (Moroccan Agency for Sustainable Energy); ONEE
            (Office National de l&apos;Électricité et de l&apos;Eau Potable); Global Energy Monitor
            wind/solar trackers; IRENA Renewable Energy Statistics 2024.
            Capacity factors: SolarPower Europe Morocco Market Report 2025;
            Global Wind Energy Council (GWEC) Morocco assessment.
            Monthly output profiles modeled from solar irradiance data (SolarGIS) and
            wind resource atlas (CDER/GIZ) with seasonal corrections from ONCF operational reports.
            National targets: Morocco National Energy Strategy (2009, updated 2021);
            NDC commitments under Paris Agreement. Climate ranking: CCPI 2025.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
              © {new Date().getFullYear()} Slow Morocco. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.hydro }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
