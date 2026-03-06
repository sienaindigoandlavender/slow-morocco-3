'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  pulse: '#2D6E4F', ocean: '#1A4B8A', sand: '#C8A415', sunset: '#C45A3C',
  wifi: '#4A90D9', surf: '#00A89D', nomad: '#6B4E8B',
}

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

// ═══ CLOCK FACE — TIME ZONE OVERLAP ═══
interface City {
  name: string; offset: number; color: string; workStart: number; workEnd: number
  label: string
}

const CITIES: City[] = [
  { name: 'Marrakech', offset: 1, color: C.pulse, workStart: 9, workEnd: 18, label: 'GMT+1 · You are here' },
  { name: 'London', offset: 0, color: '#4A5E6B', workStart: 9, workEnd: 18, label: 'GMT · 1h behind' },
  { name: 'Paris / Berlin', offset: 1, color: '#6B7E3E', workStart: 9, workEnd: 18, label: 'GMT+1 · Same time' },
  { name: 'New York', offset: -5, color: C.ocean, workStart: 9, workEnd: 18, label: 'GMT−5 · 6h behind' },
  { name: 'Dubai', offset: 4, color: C.sand, workStart: 9, workEnd: 18, label: 'GMT+4 · 3h ahead' },
  { name: 'Tokyo', offset: 9, color: C.sunset, workStart: 9, workEnd: 18, label: 'GMT+9 · 8h ahead' },
]

function ClockFace() {
  const [marrakechHour, setMarrakechHour] = useState(10)
  const [hovCity, setHovCity] = useState<string | null>(null)
  const cx = 200, cy = 200, r = 160

  // Convert Marrakech local hour to each city's local hour
  const getCityHour = (city: City) => {
    const utc = marrakechHour - 1 // Marrakech is GMT+1
    return ((utc + city.offset) % 24 + 24) % 24
  }

  const isWorking = (city: City) => {
    const h = getCityHour(city)
    return h >= city.workStart && h < city.workEnd
  }

  // Count overlap
  const overlapCount = CITIES.filter(c => c.name !== 'Marrakech' && isWorking(c)).length

  return (
    <div>
      <svg viewBox="0 0 400 400" className="w-full" style={{ maxWidth: 420, margin: '0 auto' }}>
        {/* Clock face background */}
        <circle cx={cx} cy={cy} r={r + 20} fill="none" stroke={C.border} strokeWidth="0.5" />
        <circle cx={cx} cy={cy} r={r} fill="white" stroke={C.border} strokeWidth="1" />

        {/* Hour markers */}
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i / 24) * Math.PI * 2 - Math.PI / 2
          const x1 = cx + Math.cos(angle) * (r - 8)
          const y1 = cy + Math.sin(angle) * (r - 8)
          const x2 = cx + Math.cos(angle) * r
          const y2 = cy + Math.sin(angle) * r
          const tx = cx + Math.cos(angle) * (r + 14)
          const ty = cy + Math.sin(angle) * (r + 14)
          const isMajor = i % 6 === 0
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.muted} strokeWidth={isMajor ? 1.5 : 0.5} opacity={isMajor ? 0.6 : 0.3} />
              {isMajor && (
                <text x={tx} y={ty + 3} textAnchor="middle" className="font-mono" style={{ fontSize: 8, fill: C.muted }}>
                  {String(i).padStart(2, '0')}
                </text>
              )}
            </g>
          )
        })}

        {/* City working-hour arcs */}
        {CITIES.map((city, ci) => {
          const cityLocalStart = city.workStart
          const cityLocalEnd = city.workEnd
          // Convert to Marrakech time
          const utcStart = cityLocalStart - city.offset
          const utcEnd = cityLocalEnd - city.offset
          const mrkStart = ((utcStart + 1) % 24 + 24) % 24
          const mrkEnd = ((utcEnd + 1) % 24 + 24) % 24

          const arcR = r - 20 - ci * 16
          const startAngle = (mrkStart / 24) * Math.PI * 2 - Math.PI / 2
          const endAngle = (mrkEnd / 24) * Math.PI * 2 - Math.PI / 2

          const x1 = cx + Math.cos(startAngle) * arcR
          const y1 = cy + Math.sin(startAngle) * arcR
          const x2 = cx + Math.cos(endAngle) * arcR
          const y2 = cy + Math.sin(endAngle) * arcR

          const largeArc = (mrkEnd - mrkStart + 24) % 24 > 12 ? 1 : 0
          const isHov = hovCity === city.name
          const working = isWorking(city)

          return (
            <g key={city.name}
              onMouseEnter={() => setHovCity(city.name)}
              onMouseLeave={() => setHovCity(null)}
              className="cursor-pointer">
              <path
                d={`M${x1},${y1} A${arcR},${arcR} 0 ${largeArc},1 ${x2},${y2}`}
                fill="none" stroke={city.color}
                strokeWidth={isHov ? 10 : 6}
                opacity={isHov ? 0.7 : hovCity ? 0.15 : 0.35}
                strokeLinecap="round"
                style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }} />
              {/* City label at midpoint */}
              {(isHov || !hovCity) && (
                <text
                  x={cx + Math.cos((startAngle + endAngle) / 2) * (arcR - (isHov ? 12 : 0))}
                  y={cy + Math.sin((startAngle + endAngle) / 2) * (arcR - (isHov ? 12 : 0))}
                  textAnchor="middle" className="font-mono"
                  style={{ fontSize: isHov ? 8 : 6, fill: city.color, fontWeight: isHov ? 700 : 400 }}>
                  {city.name}
                </text>
              )}
            </g>
          )
        })}

        {/* Current hour hand */}
        {(() => {
          const angle = (marrakechHour / 24) * Math.PI * 2 - Math.PI / 2
          return (
            <line x1={cx} y1={cy} x2={cx + Math.cos(angle) * (r - 30)} y2={cy + Math.sin(angle) * (r - 30)}
              stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
          )
        })()}
        <circle cx={cx} cy={cy} r={4} fill={C.ink} />

        {/* Center text */}
        <text x={cx} y={cy + 30} textAnchor="middle" className="font-mono" style={{ fontSize: 10, fill: C.muted }}>
          Marrakech {String(marrakechHour).padStart(2, '0')}:00
        </text>
        <text x={cx} y={cy + 42} textAnchor="middle" className="font-mono" style={{ fontSize: 8, fill: overlapCount >= 3 ? C.pulse : C.sunset }}>
          {overlapCount}/5 markets active
        </text>
      </svg>

      {/* Slider */}
      <div className="max-w-[420px] mx-auto mt-2">
        <input type="range" min={0} max={23} value={marrakechHour}
          onChange={e => setMarrakechHour(parseInt(e.target.value))}
          className="w-full accent-[#2D6E4F]" />
        <div className="flex justify-between font-mono text-[8px]" style={{ color: C.muted }}>
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
        </div>
      </div>

      {/* City legend */}
      <div className="max-w-[420px] mx-auto mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
        {CITIES.map(city => {
          const h = getCityHour(city)
          const working = isWorking(city)
          return (
            <div key={city.name} className="flex items-center gap-2 p-1.5 rounded-sm transition-all"
              style={{ background: working ? `${city.color}08` : 'transparent', border: `1px solid ${working ? city.color : C.border}30` }}
              onMouseEnter={() => setHovCity(city.name)} onMouseLeave={() => setHovCity(null)}>
              <span className="w-2 h-2 rounded-full" style={{ background: city.color, opacity: working ? 1 : 0.3 }} />
              <div>
                <p className="font-mono text-[9px] font-bold" style={{ color: working ? city.color : C.muted }}>{city.name}</p>
                <p className="font-mono text-[7px]" style={{ color: C.muted }}>{String(h).padStart(2, '0')}:00 · {working ? 'Working' : 'Offline'}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══ VORONOI — 5G TOWER CATCHMENT COASTAL STRIP ═══
interface Tower {
  name: string; x: number; y: number; type: '5G' | '4G' | 'Fiber'
  radius: number; color: string
}

const TOWERS: Tower[] = [
  { name: 'Taghazout Centre', x: 190, y: 140, type: '5G', radius: 65, color: C.wifi },
  { name: 'Tamraght Village', x: 260, y: 195, type: '5G', radius: 55, color: C.surf },
  { name: 'Anchor Point', x: 130, y: 90, type: '4G', radius: 50, color: '#8B6E4E' },
  { name: 'Banana Beach', x: 340, y: 160, type: '4G', radius: 45, color: '#6B7E3E' },
  { name: 'Aourir', x: 380, y: 250, type: '5G', radius: 60, color: C.nomad },
  { name: 'Taghazout Bay Resort', x: 100, y: 200, type: 'Fiber', radius: 70, color: C.ocean },
  { name: 'Km 17 Surf', x: 220, y: 260, type: '4G', radius: 40, color: C.sand },
  { name: 'Paradise Valley Road', x: 440, y: 120, type: '4G', radius: 35, color: C.sunset },
]

const COLIVING: { name: string; x: number; y: number; beds: number; price: string }[] = [
  { name: 'SunDesk', x: 185, y: 135, beds: 20, price: '€350/mo' },
  { name: 'Atlas Coworking', x: 255, y: 190, beds: 12, price: '€280/mo' },
  { name: 'Adventure Keys', x: 205, y: 155, beds: 16, price: '€400/mo' },
  { name: 'Kasbari Coliving', x: 245, y: 175, beds: 8, price: '€320/mo' },
  { name: 'Manzili', x: 275, y: 210, beds: 10, price: '€300/mo' },
  { name: 'Taghazout Bay Apt', x: 110, y: 195, beds: 40, price: '€500/mo' },
]

function VoronoiMap() {
  const [hovTower, setHovTower] = useState<string | null>(null)
  const W = 520, H = 340

  // Simplified Voronoi: for each pixel, find nearest tower
  // We'll render as overlapping circles with clip paths for the effect
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Ocean */}
      <rect width={W} height={H} fill={C.ocean} opacity="0.04" />

      {/* Coastline */}
      <path d="M0,80 Q60,60 120,75 Q180,50 240,70 Q300,45 360,60 Q420,50 480,65 L520,60"
        fill="none" stroke={C.ocean} strokeWidth="1.5" opacity="0.3" />
      <text x={260} y={35} textAnchor="middle" className="font-mono" style={{ fontSize: 9, fill: C.ocean, fontStyle: 'italic', opacity: 0.5 }}>
        Atlantic Ocean
      </text>

      {/* Voronoi cells as gradient circles */}
      {TOWERS.map(t => {
        const isHov = hovTower === t.name
        return (
          <g key={t.name} onMouseEnter={() => setHovTower(t.name)} onMouseLeave={() => setHovTower(null)} className="cursor-pointer">
            {/* Catchment area */}
            <circle cx={t.x} cy={t.y} r={t.radius}
              fill={t.color} opacity={isHov ? 0.2 : hovTower ? 0.04 : 0.1}
              stroke={t.color} strokeWidth={isHov ? 1.5 : 0.5}
              strokeDasharray={t.type === '4G' ? '3,2' : 'none'}
              style={{ transition: 'opacity 0.3s' }} />
            {/* Tower dot */}
            <circle cx={t.x} cy={t.y} r={t.type === '5G' ? 5 : 3.5}
              fill={t.color} opacity={isHov ? 1 : 0.7} />
            {t.type === '5G' && (
              <circle cx={t.x} cy={t.y} r={8} fill="none" stroke={t.color}
                strokeWidth="1" opacity={isHov ? 0.5 : 0.2} />
            )}
            {/* Label */}
            <text x={t.x} y={t.y - 12} textAnchor="middle" className="font-mono"
              style={{ fontSize: isHov ? 8 : 6, fill: t.color, fontWeight: isHov ? 700 : 400 }}>
              {t.name}
            </text>
            <text x={t.x} y={t.y - 4} textAnchor="middle" className="font-mono"
              style={{ fontSize: 5, fill: t.color, opacity: 0.7 }}>
              {t.type}
            </text>
          </g>
        )
      })}

      {/* Co-living spaces */}
      {COLIVING.map(cl => (
        <g key={cl.name}>
          <rect x={cl.x - 2} y={cl.y - 2} width={4} height={4} rx="1"
            fill={C.nomad} opacity="0.8" transform={`rotate(45,${cl.x},${cl.y})`} />
          {hovTower === null && (
            <text x={cl.x + 6} y={cl.y + 2} className="font-mono"
              style={{ fontSize: 5, fill: C.nomad, opacity: 0.6 }}>
              {cl.name}
            </text>
          )}
        </g>
      ))}

      {/* Scale */}
      <line x1={20} y1={H - 20} x2={80} y2={H - 20} stroke={C.muted} strokeWidth="0.5" />
      <text x={50} y={H - 10} textAnchor="middle" className="font-mono" style={{ fontSize: 6, fill: C.muted }}>~2 km</text>

      {/* Legend */}
      <g transform="translate(380, 280)">
        <circle cx={0} cy={0} r={4} fill={C.wifi} /><text x={8} y={3} className="font-mono" style={{ fontSize: 6, fill: C.muted }}>5G Tower</text>
        <circle cx={0} cy={14} r={3} fill="#8B6E4E" /><text x={8} y={17} className="font-mono" style={{ fontSize: 6, fill: C.muted }}>4G Tower</text>
        <rect x={-2} y={26} width={4} height={4} rx="1" fill={C.nomad} transform="rotate(45,0,28)" />
        <text x={8} y={31} className="font-mono" style={{ fontSize: 6, fill: C.muted }}>Co-living</text>
      </g>
    </svg>
  )
}

// ═══ COST OF LIVING DATA ═══
interface CostItem { category: string; budget: string; luxury: string; icon: string }

const COSTS: CostItem[] = [
  { category: 'Accommodation', budget: '$300–500', luxury: '$800–1,200', icon: '🏠' },
  { category: 'Co-working space', budget: '$50–100', luxury: '$150–250', icon: '💻' },
  { category: 'Food & dining', budget: '$200–300', luxury: '$400–600', icon: '🍽' },
  { category: 'Transport', budget: '$30–60', luxury: '$100–200', icon: '🚕' },
  { category: 'SIM / Internet', budget: '$5–10', luxury: '$15–30', icon: '📡' },
  { category: 'Activities / surf', budget: '$50–100', luxury: '$200–400', icon: '🏄' },
  { category: 'Total monthly', budget: '$800–1,200', luxury: '$1,500–2,000', icon: '💰' },
]

// ═══ NOMAD HUBS ═══
interface Hub {
  name: string; type: string; wifi: string; vibe: string; coliving: string[]
  cost: string; color: string
}

const HUBS: Hub[] = [
  { name: 'Taghazout', type: 'Surf village', wifi: '30–70 Mbps', vibe: 'Morning surf, afternoon code, sunset on the terrace. The ur-nomad spot.',
    coliving: ['SunDesk', 'Adventure Keys', 'Kasbari'], cost: '$800–1,200/mo', color: C.surf },
  { name: 'Tamraght', type: 'Surf village', wifi: '20–50 Mbps', vibe: 'Quieter than Taghazout. Better waves. Rawer. Atlas Coworking has the view.',
    coliving: ['Atlas Coworking', 'Manzili', 'BigBlue Hostel'], cost: '$700–1,000/mo', color: C.pulse },
  { name: 'Essaouira', type: 'Coastal medina', wifi: '40–80 Mbps', vibe: 'Wind, art, and Gnawa music. Noqta Space in the medina. Best creative energy.',
    coliving: ['Noqta Space', 'Atlantic Hostel'], cost: '$900–1,400/mo', color: C.ocean },
  { name: 'Marrakech', type: 'Imperial city', wifi: '50–100 Mbps', vibe: 'Riad rooftops and riad Wi-Fi. The Spot, New Work Lab, Atic. Most infrastructure.',
    coliving: ['The Spot', 'New Work Lab', 'Atic Coworking'], cost: '$1,000–1,800/mo', color: C.sunset },
  { name: 'Casablanca', type: 'Business capital', wifi: '70–120 Mbps', vibe: 'Fastest internet. Skyscrapers. Less charm, more bandwidth. Serious work.',
    coliving: ['Technopark', 'WeWork-style hubs'], cost: '$1,200–2,000/mo', color: '#4A5E6B' },
]

// ═══ PAGE ═══
export function TheNomadPulseContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const clockR = useReveal()
  const voroR = useReveal()
  const hubsR = useReveal()
  const costR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Remote Work · Digital Infrastructure · 2025–2026</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.88] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Nomad Pulse</em></h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.3]" style={{ color: C.muted }}>
            Where connectivity meets the surf. Morocco&apos;s remote work geography — mapped, timed, and priced.</p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Morocco sits in the most valuable time zone on earth for remote work. GMT+1 gives you
          full overlap with London and Paris, six morning hours with New York, and three
          afternoon hours with Dubai. Add 92% internet penetration (highest in Africa), 5G
          rolling out to 25% of the population by end of 2026, and a luxury nomad lifestyle
          at $1,500–$2,000 per month — and the numbers explain why coastal villages like
          Taghazout and Tamraght have transformed from fishing stops into co-living corridors.
          The coworking spaces tripled since 2020. The surf hasn&apos;t changed at all.
        </p>

        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '92.2%', l: 'internet penetration', c: C.wifi },
            { v: 'GMT+1', l: 'time zone', c: C.pulse },
            { v: '70+ Mbps', l: 'avg city speed', c: C.surf },
            { v: '$1,500', l: '/mo luxury nomad', c: C.sand },
          ].map((n, i) => (
            <div key={n.l} className="transition-all duration-700" style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono text-[28px] font-bold leading-none" style={{ color: n.c }}>{n.v}</p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONNECTIVITY STATS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.wifi }}>Digital Infrastructure · 2025–2026</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { v: '35.5M', l: 'Internet users', s: '92.2% penetration · #1 in Africa', c: C.wifi },
              { v: '57.1M', l: 'Mobile connections', s: '148% of population (multi-SIM)', c: C.surf },
              { v: '87.7%', l: 'Broadband mobile', s: '3G/4G/5G capable connections', c: C.pulse },
              { v: '3', l: 'Operators', s: 'Maroc Telecom · Orange · Inwi', c: C.sunset },
              { v: '5G', l: 'Launched 2025', s: '25% coverage by end 2026', c: C.nomad },
              { v: '45%', l: '5G by 2026 target', s: 'ANRT coverage obligation', c: C.nomad },
              { v: '70%', l: '5G by 2030', s: 'Aligned with World Cup', c: C.ocean },
              { v: 'MAD 2.1B', l: 'License fees paid', s: '$210M for 5G spectrum', c: C.sand },
            ].map((s, i) => (
              <div key={s.l} className="p-3 rounded-sm" style={{ background: `${s.c}05`, border: `1px solid ${C.border}` }}>
                <p className="font-mono text-[18px] font-bold" style={{ color: s.c }}>{s.v}</p>
                <p className="font-mono text-[9px] font-bold mt-0.5" style={{ color: C.ink }}>{s.l}</p>
                <p className="font-mono text-[8px] mt-0.5" style={{ color: C.muted }}>{s.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOCK FACE */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={clockR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.pulse }}>The Clock-Face Dashboard</p>
          <p className="font-mono text-[11px] mb-1" style={{ color: C.muted }}>
            Drag the slider to move through a Marrakech day. Watch which global markets are active.
          </p>
          <p className="text-[11px] mb-4" style={{ color: C.text }}>
            Each arc represents a city&apos;s 9-to-6 working hours, mapped onto Marrakech time. The sweet spot:
            10:00–15:00 Marrakech time, when London, Paris, New York, and Dubai are all working simultaneously.
          </p>
          <ClockFace />
        </div>
      </section>

      {/* VORONOI MAP */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={voroR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.surf }}>
            Connectivity Meets the Surf
          </p>
          <p className="font-mono text-[11px] mb-1" style={{ color: C.muted }}>
            Tower catchment areas along the Taghazout–Tamraght coastal strip. Hover for details.
          </p>
          <p className="text-[11px] mb-4" style={{ color: C.text }}>
            Each circle represents a cell tower&apos;s approximate coverage radius. 5G towers (solid borders)
            are concentrated around Taghazout centre, Tamraght village, and the Taghazout Bay resort
            development. 4G towers (dashed) fill the gaps. Diamond markers show co-living spaces —
            every one sits inside at least one 5G catchment zone. The surf break at Anchor Point
            gets 4G. The boardroom gets 5G. Both get the same sunset.
          </p>
          <VoronoiMap />

          {/* Co-living detail */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {COLIVING.map(cl => (
              <div key={cl.name} className="flex items-center gap-2 p-2 rounded-sm" style={{ border: `1px solid ${C.border}` }}>
                <span className="w-2 h-2 rounded-sm rotate-45" style={{ background: C.nomad }} />
                <div>
                  <p className="font-mono text-[9px] font-bold" style={{ color: C.nomad }}>{cl.name}</p>
                  <p className="font-mono text-[7px]" style={{ color: C.muted }}>{cl.beds} beds · {cl.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOMAD HUBS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={hubsR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Five Nomad Hubs</p>
          <div className="space-y-3">
            {HUBS.map((h, i) => (
              <div key={h.name} className="p-4 rounded-sm transition-all duration-500"
                style={{ background: `${h.color}04`, border: `1px solid ${C.border}`,
                  opacity: hubsR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="font-mono text-[14px] font-bold" style={{ color: h.color }}>{h.name}</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>{h.type}</span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm" style={{ background: `${C.wifi}10`, color: C.wifi }}>{h.wifi}</span>
                  <span className="font-mono text-[9px]" style={{ color: C.sand }}>{h.cost}</span>
                </div>
                <p className="text-[11px] leading-[1.6] mb-2" style={{ color: C.text }}>{h.vibe}</p>
                <div className="flex flex-wrap gap-1">
                  {h.coliving.map(c => (
                    <span key={c} className="font-mono text-[8px] px-1.5 py-0.5 rounded-sm" style={{ background: `${h.color}08`, color: h.color }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COST OF LIVING */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={costR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.sand }}>Monthly Cost of Living</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 pb-1" style={{ borderBottom: `1px solid ${C.border}` }}>
              <span className="font-mono text-[9px] w-6 shrink-0" style={{ color: C.muted }}></span>
              <span className="font-mono text-[9px] flex-1 font-bold" style={{ color: C.muted }}>Category</span>
              <span className="font-mono text-[9px] w-24 text-right font-bold" style={{ color: C.pulse }}>Budget</span>
              <span className="font-mono text-[9px] w-28 text-right font-bold" style={{ color: C.sand }}>Luxury</span>
            </div>
            {COSTS.map((c, i) => {
              const isTotal = c.category === 'Total monthly'
              return (
                <div key={c.category} className="flex items-center gap-2 py-1 transition-all duration-500"
                  style={{ opacity: costR.vis ? 1 : 0, transitionDelay: `${i * 40}ms`,
                    borderTop: isTotal ? `1px solid ${C.border}` : 'none', fontWeight: isTotal ? 700 : 400 }}>
                  <span className="w-6 shrink-0 text-center" style={{ fontSize: 12 }}>{c.icon}</span>
                  <span className="font-mono text-[10px] flex-1" style={{ color: isTotal ? C.ink : C.text }}>{c.category}</span>
                  <span className="font-mono text-[10px] w-24 text-right" style={{ color: C.pulse }}>{c.budget}</span>
                  <span className="font-mono text-[10px] w-28 text-right" style={{ color: C.sand }}>{c.luxury}</span>
                </div>
              )
            })}
          </div>
          <p className="font-mono text-[8px] mt-2" style={{ color: C.muted }}>
            Budget = Taghazout/Tamraght shared accommodation, local food, basic coworking. Luxury = Marrakech/Essaouira private riad, dining out, premium coworking + activities.
          </p>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.pulse }}>The Time Zone Advantage</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                GMT+1 is not an accident of geography. It&apos;s a competitive advantage. A nomad in Marrakech
                can take a 9am call with London, a 10am call with Berlin, a 3pm call with New York, and
                a morning standup with Dubai — all in one working day. No other destination south of
                Lisbon offers this range. Bali (GMT+8) loses New York entirely. Mexico City (GMT-6)
                loses Europe after lunch. Morocco sits in the overlap.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.surf }}>The Surf-Work Corridor</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The 12km strip from Taghazout Bay to Aourir now has more co-living spaces per
                kilometre than any comparable coastline in Africa. SunDesk, Atlas, Adventure Keys,
                Kasbari, Manzili — each within walking distance of both a surf break and a
                5G tower. Coworking spaces tripled since 2020. The AFCON 5G rollout targeted
                stadiums and fan zones, but the infrastructure doesn&apos;t care whether you&apos;re
                watching football or pushing code. The towers stay after the tournament leaves.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.nomad }}>The Missing Visa</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Morocco still has no digital nomad visa. Most remote workers enter on the 90-day
                tourist allowance, then do a visa run to Spain or Portugal. A dedicated nomad visa —
                as offered by Portugal, Spain, Indonesia, and 50+ other countries — would formalise
                what is already happening. The infrastructure is built. The co-living exists. The
                time zone is perfect. The only thing missing is the paperwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            A fishing village becomes a co-living corridor in five years. The 5G tower goes
            up next to the minaret. The surf break doesn&apos;t need bandwidth but the person
            sitting on the terrace above it does. This is what happens when a country&apos;s
            time zone, its coastline, and its internet penetration all align at the same
            moment that the world decides offices are optional. The nomads didn&apos;t discover
            Morocco. Morocco was always in the right place. The world just finally noticed.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Internet penetration (92.2%, 35.5M users): DataReportal Digital 2026: Morocco; Morocco
            World News (Nov 2025); Hespress. Mobile connections (57.1M, 148%): DataReportal 2026.
            Broadband mobile (87.7%): DataReportal 2026, citing GSMA Intelligence. 5G rollout
            (25% by 2025, 45% by 2026, 70% by 2030): ANRT via Morocco World News (Apr 2025, Nov
            2025); US Commercial Service (trade.gov). 5G license fees (MAD 2.1B): Morocco World
            News (Nov 2025). Internet speeds (70+ Mbps city average): DataReportal 2025; NomadLives
            (Oct 2025). Coworking spaces (tripled since 2020): NomadLives. Co-living details:
            SunDesk (sun-desk.com); Coworking Safari; Nomadico; Digital Nomads in Africa. Cost of
            living ranges: Numbeo; NomadLives; Explore Essaouira; editorial synthesis. Time zone
            overlaps: calculated from UTC offsets. No digital nomad visa: multiple sources including
            Explore Essaouira (Dec 2025), BucketListBri (May 2025). Tower locations on Voronoi map
            are schematic representations of coverage zones, not precise engineering data.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.pulse }}>© Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
