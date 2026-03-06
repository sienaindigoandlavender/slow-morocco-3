'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  pop: '#2D3A6E',      // population density
  male: '#4A7C8B',     // teal-steel
  female: '#8B5E83',   // warm plum
  youth: '#C17F28',    // amber
  elder: '#6B4226',    // bark
  divorce: '#C44536',  // red
  marry: '#4A7C59',    // green
  lit: '#2D6E4F',      // literacy green
  illit: '#9B4422',    // illiteracy rust
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ═══ REGIONAL DATA (2024 RGPH Census) ═══
const REGIONS = [
  { name: 'Casablanca-Settat', pop: 7689, growth: 0.93, urban: 73.3, illiteracy: 19.6, fertility: 1.8 },
  { name: 'Rabat-Sale-Kenitra', pop: 5133, growth: 1.06, urban: 70.7, illiteracy: 22.4, fertility: 1.9 },
  { name: 'Marrakech-Safi', pop: 4892, growth: 0.79, urban: 46.0, illiteracy: 28.8, fertility: 2.2 },
  { name: 'Fes-Meknes', pop: 4468, growth: 0.82, urban: 58.3, illiteracy: 26.4, fertility: 2.1 },
  { name: 'Tanger-Tetouan-Al Hoceima', pop: 4030, growth: 1.25, urban: 62.5, illiteracy: 25.1, fertility: 2.0 },
  { name: 'Souss-Massa', pop: 3020, growth: 1.12, urban: 53.8, illiteracy: 27.2, fertility: 2.1 },
  { name: 'Beni Mellal-Khenifra', pop: 2520, growth: 0.45, urban: 48.2, illiteracy: 32.0, fertility: 2.3 },
  { name: 'Oriental', pop: 2430, growth: 0.68, urban: 62.1, illiteracy: 28.3, fertility: 2.0 },
  { name: 'Draa-Tafilalet', pop: 1760, growth: 0.52, urban: 36.7, illiteracy: 30.5, fertility: 2.4 },
  { name: 'Guelmim-Oued Noun', pop: 440, growth: 0.88, urban: 62.8, illiteracy: 27.8, fertility: 2.2 },
  { name: 'Laayoune-Sakia El Hamra', pop: 420, growth: 1.18, urban: 92.4, illiteracy: 15.3, fertility: 2.1 },
  { name: 'Dakhla-Oued Ed-Dahab', pop: 220, growth: 2.35, urban: 80.4, illiteracy: 14.8, fertility: 2.0 },
]
const TOTAL_POP = REGIONS.reduce((a, r) => a + r.pop, 0)

// ═══ POPULATION PYRAMID (UN 2024 estimates, thousands, 5-year bands) ═══
const PYRAMID = [
  { age: '0-4', male: 1620, female: 1560 },
  { age: '5-9', male: 1680, female: 1610 },
  { age: '10-14', male: 1720, female: 1650 },
  { age: '15-19', male: 1710, female: 1640 },
  { age: '20-24', male: 1680, female: 1630 },
  { age: '25-29', male: 1590, female: 1560 },
  { age: '30-34', male: 1510, female: 1500 },
  { age: '35-39', male: 1420, female: 1430 },
  { age: '40-44', male: 1280, female: 1310 },
  { age: '45-49', male: 1100, female: 1140 },
  { age: '50-54', male: 950, female: 990 },
  { age: '55-59', male: 800, female: 850 },
  { age: '60-64', male: 650, female: 710 },
  { age: '65-69', male: 490, female: 560 },
  { age: '70-74', male: 340, female: 410 },
  { age: '75-79', male: 210, female: 280 },
  { age: '80+', male: 150, female: 230 },
]

// ═══ FERTILITY DECLINE ═══
const FERTILITY = [
  { year: 1960, tfr: 7.2 },
  { year: 1970, tfr: 6.8 },
  { year: 1980, tfr: 5.4 },
  { year: 1990, tfr: 3.7 },
  { year: 2000, tfr: 2.8 },
  { year: 2004, tfr: 2.5 },
  { year: 2010, tfr: 2.2 },
  { year: 2014, tfr: 2.2 },
  { year: 2019, tfr: 2.2 },
  { year: 2024, tfr: 1.97, note: 'Below replacement' },
]

// ═══ MARRIAGE/DIVORCE ═══
const MARRIAGE_DIVORCE = [
  { year: 2017, marriages: 238000, divorces: 107136, rate: 45.0 },
  { year: 2018, marriages: 236000, divorces: 115436, rate: 48.8 },
  { year: 2019, marriages: 230000, divorces: 115783, rate: 50.3 },
  { year: 2020, marriages: 180000, divorces: 99300, rate: 55.2 },
  { year: 2021, marriages: 225000, divorces: 115200, rate: 51.2 },
  { year: 2023, marriages: 250000, divorces: 67556, note: 'New methodology' },
  { year: 2024, marriages: 249089, divorces: 65475 },
]

// ═══ REGION BAR ═══
function RegionBar({ region, index, maxPop }: { region: typeof REGIONS[0]; index: number; maxPop: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const widthPct = (region.pop / maxPop) * 100
  const sharePct = ((region.pop / TOTAL_POP) * 100).toFixed(1)
  // Colour intensity by density
  const intensity = Math.min(0.8, region.pop / maxPop)

  return (
    <div ref={ref}
      className="py-3 border-b transition-all duration-500 cursor-default"
      style={{ borderColor: hovered ? C.pop : C.border, opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-12px)', transitionDelay: `${index * 50}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex items-baseline justify-between mb-1">
        <span className="font-mono text-[12px] font-semibold" style={{ color: C.ink }}>{region.name}</span>
        <span className="font-mono text-[14px] font-bold" style={{ color: C.pop }}>{(region.pop / 1000).toFixed(2)}M</span>
      </div>
      <div className="h-5 rounded-sm overflow-hidden" style={{ background: `${C.pop}06` }}>
        <div className="h-full rounded-sm transition-all duration-1000 ease-out"
          style={{
            width: vis ? `${widthPct}%` : '0%',
            background: `rgba(45, 58, 110, ${0.08 + intensity * 0.2})`,
            borderRight: `2px solid ${C.pop}`,
            transitionDelay: `${index * 50}ms`,
          }} />
      </div>
      {hovered && (
        <div className="flex flex-wrap gap-4 mt-2 font-mono text-[10px]" style={{ color: C.muted }}>
          <span>{sharePct}% of national pop.</span>
          <span>Growth: {region.growth}%/yr</span>
          <span>Urban: {region.urban}%</span>
          <span>Illiteracy: {region.illiteracy}%</span>
          <span>TFR: {region.fertility}</span>
        </div>
      )}
    </div>
  )
}

// ═══ POPULATION PYRAMID ═══
function PopulationPyramid() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const maxVal = 1800

  return (
    <div ref={ref} className="space-y-1">
      {PYRAMID.slice().reverse().map((band, i) => {
        const mPct = (band.male / maxVal) * 100
        const fPct = (band.female / maxVal) * 100
        return (
          <div key={band.age} className="flex items-center gap-1 group">
            {/* Male bar (right-aligned) */}
            <div className="flex-1 flex justify-end">
              <div className="h-4 rounded-l-sm transition-all duration-700 ease-out"
                style={{
                  width: vis ? `${mPct}%` : '0%',
                  background: `${C.male}25`,
                  borderLeft: `2px solid ${C.male}`,
                  transitionDelay: `${i * 40}ms`,
                }} />
            </div>
            {/* Age label */}
            <span className="font-mono text-[9px] w-9 text-center shrink-0 group-hover:font-bold transition-all" style={{ color: C.muted }}>
              {band.age}
            </span>
            {/* Female bar (left-aligned) */}
            <div className="flex-1">
              <div className="h-4 rounded-r-sm transition-all duration-700 ease-out"
                style={{
                  width: vis ? `${fPct}%` : '0%',
                  background: `${C.female}25`,
                  borderRight: `2px solid ${C.female}`,
                  transitionDelay: `${i * 40}ms`,
                }} />
            </div>
          </div>
        )
      })}
      {/* Legend */}
      <div className="flex justify-between pt-2">
        <span className="font-mono text-[10px] font-semibold" style={{ color: C.male }}>← Male (18.4M)</span>
        <span className="font-mono text-[10px] font-semibold" style={{ color: C.female }}>Female (18.4M) →</span>
      </div>
    </div>
  )
}

// ═══ FERTILITY LINE ═══
function FertilityChart() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const svgW = 800; const svgH = 220
  const padL = 35; const padR = 20; const padT = 15; const padB = 30
  const chartW = svgW - padL - padR; const chartH = svgH - padT - padB
  const maxY = 8; const minX = 1960; const maxX = 2024

  const pts = FERTILITY.map(d => ({
    x: padL + ((d.year - minX) / (maxX - minX)) * chartW,
    y: padT + (1 - d.tfr / maxY) * chartH,
    ...d,
  }))

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const replacementY = padT + (1 - 2.1 / maxY) * chartH

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        {/* Replacement line */}
        <line x1={padL} y1={replacementY} x2={padL + chartW} y2={replacementY}
          stroke={C.divorce} strokeWidth="1" strokeDasharray="4 4" strokeOpacity={0.4} />
        <text x={padL + chartW + 4} y={replacementY + 3} fontSize="5" fill={C.divorce}>2.1 replacement</text>

        {/* Y gridlines */}
        {[2, 4, 6].map(v => {
          const y = padT + (1 - v / maxY) * chartH
          return <g key={v}>
            <line x1={padL} y1={y} x2={padL + chartW} y2={y} stroke={C.border} strokeWidth="0.5" />
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="5" fill={C.muted}>{v}</text>
          </g>
        })}

        {/* Line */}
        <path d={linePath} fill="none" stroke={C.female} strokeWidth="2.5"
          strokeDasharray={vis ? '0' : '2000'} strokeDashoffset={vis ? '0' : '2000'}
          style={{ transition: 'stroke-dashoffset 2s ease 0.3s' }} />

        {/* Points */}
        {pts.map((p, i) => (
          <g key={p.year}>
            <circle cx={p.x} cy={p.y} r={p.note ? 5 : 3}
              fill="white" stroke={p.note ? C.divorce : C.female} strokeWidth={p.note ? 2 : 1.5}
              opacity={vis ? 1 : 0} style={{ transition: `opacity 0.4s ease ${i * 100}ms` }} />
            <text x={p.x} y={padT + chartH + 16} textAnchor="middle" fontSize="5" fill={C.ink}>{p.year}</text>
            <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="5.5" fontWeight="700" fill={p.note ? C.divorce : C.female}>
              {p.tfr}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ═══ MAP ═══
const DEMOGRAPHIC_ATLAS_MAP_POINTS = [
  { name: 'Casablanca-Settat', lat: 33.57, lng: -7.59, pop: '7.4M', density: 'Highest', color: '#2D3A6E' },
  { name: 'Rabat-Sale-Kenitra', lat: 34.02, lng: -6.84, pop: '4.9M', density: 'High', color: '#3B5998' },
  { name: 'Marrakech-Safi', lat: 31.63, lng: -8.01, pop: '4.7M', density: 'Medium', color: '#4A7C8B' },
  { name: 'Fes-Meknes', lat: 34.03, lng: -5.00, pop: '4.4M', density: 'Medium', color: '#4A7C8B' },
  { name: 'Tanger-Tetouan-Al Hoceima', lat: 35.76, lng: -5.83, pop: '3.8M', density: 'Medium', color: '#4A7C8B' },
  { name: 'Souss-Massa', lat: 30.43, lng: -9.60, pop: '2.9M', density: 'Medium', color: '#6B8BA4' },
  { name: 'Draa-Tafilalet', lat: 31.93, lng: -5.53, pop: '1.7M', density: 'Low', color: '#8B7355' },
  { name: 'Dakhla-Oued Ed-Dahab', lat: 23.68, lng: -15.96, pop: '0.2M', density: 'Lowest', color: '#C17F28' },
]
const MAPBOX_TOKEN_DEMOGRAPHIC_ATLAS = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function DemographicatlasMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN_DEMOGRAPHIC_ATLAS || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN_DEMOGRAPHIC_ATLAS!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6.5, 32], zoom: 5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        DEMOGRAPHIC_ATLAS_MAP_POINTS.forEach(p => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => { map.flyTo({ center: [p.lng, p.lat], zoom: 8, duration: 1200 }) })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '220px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.pop} — ${p.density} density</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])
  return <div ref={mapContainer} className="w-full" style={{ height: '480px', background: '#0a0a0a' }} />
}

// ═══ MAIN COMPONENT ═══

export function DemographicAtlasContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const litR = useReveal()
  const householdR = useReveal()
  const marriageR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 027 · Demographics</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.visible ? 1 : 0, transform: heroR.visible ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Demographic Atlas</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)] transition-all duration-1000"
            style={{ color: C.muted, opacity: heroR.visible ? 1 : 0, transitionDelay: '200ms' }}>
            36.8 million people. Two countries in one census.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          The 2024 RGPH census — the seventh — counted 36,828,330 Moroccans.
          The number matters less than what it reveals: a country splitting
          into two demographic timelines. In the coastal cities, fertility has
          collapsed below replacement, divorce is rising, and one in five
          households is led by a woman. In the interior and the south, larger
          families, earlier marriages, and higher illiteracy persist. Casablanca
          is converging with Europe. The Atlas is not.
        </p>

        {/* Key numbers */}
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { value: '36.8M', label: 'total population', sub: '2024 RGPH Census' },
            { value: '1.97', label: 'fertility rate', sub: 'below 2.1 replacement' },
            { value: '30.1', label: 'median age', sub: 'up from 26.2 in 2004' },
            { value: '62.8%', label: 'urbanisation', sub: 'up from 60.4% in 2014' },
          ].map((n, i) => (
            <div key={n.label} className="transition-all duration-700"
              style={{ opacity: numsR.visible ? 1 : 0, transform: numsR.visible ? 'translateY(0)' : 'translateY(16px)', transitionDelay: `${i * 150}ms` }}>
              <p className="font-mono text-[28px] font-bold leading-none" style={{ color: C.pop }}>{n.value}</p>
              <p className="font-mono text-[11px] font-semibold mt-1" style={{ color: C.ink }}>{n.label}</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 1: THE REGIONAL MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-baseline justify-between mb-1 flex-wrap gap-4">
            <div>
              <p className="micro-label mb-1" style={{ color: C.pop }}>Population by Region</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>
                12 regions. Hover for urbanisation, illiteracy, growth, fertility. Bar width = population share.
              </p>
            </div>
            <span className="font-mono text-[11px]" style={{ color: C.muted }}>
              5 regions = 71.2% of total population
            </span>
          </div>
          {REGIONS.map((r, i) => (
            <RegionBar key={r.name} region={r} index={i} maxPop={7689} />
          ))}
          <div className="mt-4 p-4 rounded-sm" style={{ background: `${C.pop}04` }}>
            <p className="font-mono text-[12px] leading-[1.7]" style={{ color: C.text }}>
              Casablanca-Settat alone holds 20.9% of the country. The fastest-growing region
              is Dakhla-Oued Ed-Dahab (2.35%/yr) — the smallest by population but the highest
              growth rate in the kingdom. The slowest: Beni Mellal-Khenifra (0.45%/yr), the
              interior heartland bleeding population to the coast.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: THE PYRAMID ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
            <div>
              <p className="micro-label mb-1" style={{ color: C.male }}>The Pyramid</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>
                Population by age and sex. The narrowing base = fewer children being born.
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>Sex ratio: <strong style={{ color: C.ink }}>102 males per 100 females</strong></p>
            </div>
          </div>
          <div className="max-w-[600px] mx-auto">
            <PopulationPyramid />
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8">
            {[
              { v: '26.5%', l: 'aged 0-14', sub: 'down from 28.2% (2014)', c: C.youth },
              { v: '66.1%', l: 'aged 15-64', sub: 'working age — the dividend window', c: C.pop },
              { v: '7.8%', l: 'aged 65+', sub: 'up from 5.7% — aging begins', c: C.elder },
            ].map(n => (
              <div key={n.l}>
                <p className="font-mono text-[22px] font-bold" style={{ color: n.c }}>{n.v}</p>
                <p className="font-mono text-[11px] font-semibold" style={{ color: C.ink }}>{n.l}</p>
                <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: THE FERTILITY COLLAPSE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
            <div>
              <p className="micro-label mb-1" style={{ color: C.female }}>The Fertility Collapse</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>
                Total fertility rate, 1960-2024. From 7.2 to 1.97 children per woman. Below replacement.
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[24px] font-bold" style={{ color: C.divorce }}>-73%</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>since 1960</p>
            </div>
          </div>
          <FertilityChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 border rounded-sm" style={{ borderColor: C.male }}>
              <p className="micro-label mb-2" style={{ color: C.male }}>Urban fertility</p>
              <p className="font-mono text-[24px] font-bold" style={{ color: C.male }}>~1.8</p>
              <p className="font-mono text-[11px]" style={{ color: C.text }}>
                Coastal cities below 1.8 children per woman. Casablanca, Rabat converging with
                southern Europe. Birth rate 16.9 per 1,000 — half of what it was in 1980.
              </p>
            </div>
            <div className="p-4 border rounded-sm" style={{ borderColor: C.elder }}>
              <p className="micro-label mb-2" style={{ color: C.elder }}>Rural fertility</p>
              <p className="font-mono text-[24px] font-bold" style={{ color: C.elder }}>~2.3+</p>
              <p className="font-mono text-[11px]" style={{ color: C.text }}>
                Southern and mountain provinces — Taounate, Chefchaouen, Draa-Tafilalet — above
                2.3. Two Moroccos: one converging with Europe, one holding to tradition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: THE GENDER GAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.female }}>The Gender Gap</p>
          <div ref={litR.ref} className="space-y-5">
            {[
              { label: 'Literacy (2024)', male: 82.8, female: 67.6, mLabel: '82.8% male', fLabel: '67.6% female', note: 'Gap: 15.2 points. Down from 19.9 in 2014 — closing but not closed.', mColor: C.male, fColor: C.female },
              { label: 'Illiteracy (2024)', male: 17.2, female: 32.4, mLabel: '17.2% male', fLabel: '32.4% female', note: '32.4% of women cannot read. 51% of Moroccans over 50 are illiterate.', mColor: C.illit, fColor: C.illit },
              { label: 'Labour participation', male: 70.4, female: 19.8, mLabel: '70.4% male', fLabel: '19.8% female', note: 'One of the lowest female labour rates in MENA. Down from 25% in 2012.', mColor: C.male, fColor: C.female },
            ].map((gap, i) => (
              <div key={gap.label} className="transition-all duration-700"
                style={{ opacity: litR.visible ? 1 : 0, transform: litR.visible ? 'translateY(0)' : 'translateY(10px)', transitionDelay: `${i * 120}ms` }}>
                <p className="font-mono text-[12px] font-semibold mb-2" style={{ color: C.ink }}>{gap.label}</p>
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-mono text-[10px]" style={{ color: gap.mColor }}>Male</span>
                      <span className="font-mono text-[11px] font-bold" style={{ color: gap.mColor }}>{gap.male}%</span>
                    </div>
                    <div className="h-4 rounded-sm" style={{ background: `${gap.mColor}08` }}>
                      <div className="h-full rounded-sm transition-all duration-1000"
                        style={{ width: litR.visible ? `${gap.male}%` : '0%', background: `${gap.mColor}20`, borderRight: `2px solid ${gap.mColor}`, transitionDelay: `${i * 120}ms` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-mono text-[10px]" style={{ color: gap.fColor }}>Female</span>
                      <span className="font-mono text-[11px] font-bold" style={{ color: gap.fColor }}>{gap.female}%</span>
                    </div>
                    <div className="h-4 rounded-sm" style={{ background: `${gap.fColor}08` }}>
                      <div className="h-full rounded-sm transition-all duration-1000"
                        style={{ width: litR.visible ? `${gap.female}%` : '0%', background: `${gap.fColor}20`, borderRight: `2px solid ${gap.fColor}`, transitionDelay: `${i * 120 + 200}ms` }} />
                    </div>
                  </div>
                </div>
                <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{gap.note}</p>
              </div>
            ))}
          </div>
          {/* Illiteracy by region */}
          <div className="mt-6 p-4 rounded-sm" style={{ background: `${C.illit}04` }}>
            <p className="font-mono text-[11px] font-semibold mb-2" style={{ color: C.illit }}>Illiteracy by region (2024)</p>
            <div className="flex flex-wrap gap-2">
              {REGIONS.sort((a, b) => b.illiteracy - a.illiteracy).map(r => (
                <span key={r.name} className="font-mono text-[10px] px-2 py-1 rounded-sm border"
                  style={{
                    borderColor: r.illiteracy > 28 ? C.illit : C.border,
                    color: r.illiteracy > 28 ? C.illit : C.muted,
                    background: r.illiteracy > 28 ? `${C.illit}06` : 'transparent',
                  }}>
                  {r.name.split('-')[0].trim()}: {r.illiteracy}%
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: THE MARRIAGE REVOLUTION ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.divorce }}>The Marriage Revolution</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Morocco&apos;s divorce rate hit 50%. Marriage age is falling. Singlehood is rising. The family is transforming.
          </p>
          <div ref={marriageR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {[
              { v: '249K', l: 'marriages registered 2024', c: C.marry },
              { v: '65.5K', l: 'divorces filed 2024', c: C.divorce },
              { v: '89.3%', l: 'divorces by mutual consent', c: C.muted },
              { v: '~50%', l: 'divorce-to-marriage ratio', c: C.divorce },
            ].map((n, i) => (
              <div key={n.l} className="transition-all duration-700"
                style={{ opacity: marriageR.visible ? 1 : 0, transform: marriageR.visible ? 'translateY(0)' : 'translateY(12px)', transitionDelay: `${i * 100}ms` }}>
                <p className="font-mono text-[22px] font-bold" style={{ color: n.c }}>{n.v}</p>
                <p className="font-mono text-[10px]" style={{ color: C.text }}>{n.l}</p>
              </div>
            ))}
          </div>

          {/* Marriage facts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-sm" style={{ borderColor: C.marry }}>
              <p className="micro-label mb-2" style={{ color: C.marry }}>Marriage</p>
              {[
                'Average age at first marriage: women 24.6 (down from 25.7)',
                'Average age at first marriage: men 31.9',
                'Child marriage (under 18): fell from 15.9% to 8.4% (2004→2024)',
                'Under-15 marriage: 2.5% → 0.2% — nearly eradicated',
                '40% of women over 15 are unmarried',
                'Single at 50: rose from 3.9% to 11.1% in rural areas',
              ].map(f => (
                <p key={f} className="font-mono text-[10px] leading-[1.7] py-0.5" style={{ color: C.text }}>— {f}</p>
              ))}
            </div>
            <div className="border p-4 rounded-sm" style={{ borderColor: C.divorce }}>
              <p className="micro-label mb-2" style={{ color: C.divorce }}>Divorce</p>
              {[
                'Divorce cases: 44,408 (2014) → 67,556 (2023) → 65,475 (2024)',
                '89.3% of divorces by mutual consent (up from 63.1% in 2014)',
                'Highest rates: Laayoune, Tan-Tan provinces (>3.75%)',
                'Urban centres Casablanca, Rabat follow closely',
                'Male divorcees (45-49): 20.9% → 32% of that cohort',
                'Widowhood concentrated in rural Atlas/Souss (>6%)',
              ].map(f => (
                <p key={f} className="font-mono text-[10px] leading-[1.7] py-0.5" style={{ color: C.text }}>— {f}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: THE HOUSEHOLD ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.female }}>The Household Transformation</p>
          <div ref={householdR.ref} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { v: '9.27M', l: 'total households', sub: 'up from 7.31M (2014)' },
              { v: '19.2%', l: 'female-headed', sub: '1.77M households. Up from 16.2%' },
              { v: '11.1%', l: 'single-person', sub: 'up from 7.2% (2014)' },
              { v: '57.2%', l: 'families of 4+', sub: 'down from 66.5% — families shrinking' },
              { v: '31.7%', l: '2-3 member households', sub: 'up from 26.1% — couples without children rising' },
              { v: '28.9%', l: 'women living alone', sub: 'up from 16.3% (2004) — independence rising' },
            ].map((n, i) => (
              <div key={n.l} className="transition-all duration-700"
                style={{ opacity: householdR.visible ? 1 : 0, transform: householdR.visible ? 'translateY(0)' : 'translateY(12px)', transitionDelay: `${i * 80}ms` }}>
                <p className="font-mono text-[20px] font-bold" style={{ color: C.female }}>{n.v}</p>
                <p className="font-mono text-[11px] font-semibold" style={{ color: C.ink }}>{n.l}</p>
                <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.pop }}>Two Timelines</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The most important number in this census is not the total — it is the gap
                between coastal and interior fertility. Below 1.8 in Casablanca. Above 2.3
                in Draa-Tafilalet. One Morocco is converging with Europe&apos;s ageing future.
                The other is still young. Policy designed for one will fail the other.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.female }}>The Women Question</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                32.4% female illiteracy. 19.8% labour participation. 19.2% female-headed
                households. These three numbers describe a contradiction: women are
                increasingly leading families while being excluded from formal economies
                and education. The cooperatives — <span className="underline underline-offset-2">argan</span>, textile, agriculture — fill some
                of that gap. But the structural deficit remains.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.divorce }}>The Divorce Signal</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                50% divorce-to-marriage ratio. 89% by mutual consent. This is not
                dysfunction — it is modernisation. When women gain economic independence,
                divorce rates rise everywhere. The question is whether social protection
                systems keep pace: pensions, housing, childcare for 1.77 million
                female-headed households.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Population Density — Mapped</p>
        <DemographicatlasMap />
      </div></section>

{/* CLOSING */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-4">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The census counts bodies. But what it really measures is time — who
            has it, who is running out of it. In Casablanca, time looks like
            Europe: fewer children, later marriages, longer lives, lonelier
            ones. In the mountains, time looks like the Morocco of a generation
            ago: large families, early marriages, illiteracy that persists
            because the school is too far or the daughter is needed at home.
            The 36.8 million are one country on paper. In practice, they are
            living in two different centuries.
          </p>
        </div>
      </section>

      {/* SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Population totals: RGPH 2024, 7th General Census (HCP). Regional breakdown: HCP
            preliminary results (Nov 2024, Morocco World News). Age structure: UN World Population
            Prospects 2024. Fertility: HCP 2024 census (1.97 TFR, Bladi Dec 2024); historical
            TFR from World Bank/Macrotrends. Marriage/divorce: HCP &ldquo;Moroccan Women in
            Figures&rdquo; 2024; Minister Ouahbi statement (Dec 2024); CSPJ statistics 2017-2021
            (MWN Jun 2023). Literacy/illiteracy: HCP census 2024 (MWN Dec 2024). Household data:
            HCP census (Benmoussa statement, MWN Dec 2024). Labour participation: World Bank 2022.
            Urbanisation: HCP census 2024. Regional fertility urban/rural split: Hespress analysis
            (Sep 2025), Policy Center for the New South (2024). Pyramid data: UN estimates for
            Morocco 2024 (medium variant). All rates approximate; census microdata not yet
            fully published at time of compilation.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
              &copy; {new Date().getFullYear()} Slow Morocco
            </p>
            <p className="font-mono text-[11px]" style={{ color: C.pop }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
