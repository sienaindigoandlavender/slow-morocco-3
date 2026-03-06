'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  heat: '#C54B3C', cool: '#4A8FA0', warm: '#C8A415', wood: '#8B6E4E',
  shadow: '#2D2520', lattice: '#A0846B', cedar: '#6B4E37',
  marrakech: '#C54B3C', tangier: '#4A8FA0', ouarzazate: '#C8A415',
  stress: '#722F37', comfort: '#2D6E4F',
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  light: '#F5E6C8',
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

type CityKey = 'marrakech' | 'tangier' | 'ouarzazate'
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

interface MonthData { high: number; low: number; sun: number; rain: number }
interface CityData {
  name: string; nameAr: string; color: string; elev: number; koppen: string
  monthly: MonthData[]
}

const CITIES: Record<CityKey, CityData> = {
  marrakech: {
    name: 'Marrakech', nameAr: 'مراكش', color: C.marrakech, elev: 460, koppen: 'BSh — Semi-arid',
    monthly: [
      { high: 18.4, low: 5.9, sun: 7.1, rain: 32 }, { high: 20.1, low: 7.3, sun: 7.8, rain: 38 },
      { high: 23.2, low: 9.6, sun: 8.5, rain: 38 }, { high: 25.4, low: 11.4, sun: 9.2, rain: 33 },
      { high: 29.4, low: 14.6, sun: 9.8, rain: 17 }, { high: 33.8, low: 17.8, sun: 10.6, rain: 5 },
      { high: 36.8, low: 19.9, sun: 10.8, rain: 1 }, { high: 36.4, low: 20.1, sun: 10.4, rain: 3 },
      { high: 32.2, low: 17.6, sun: 9.2, rain: 10 }, { high: 27.6, low: 14.2, sun: 8.1, rain: 29 },
      { high: 22.4, low: 9.8, sun: 7.1, rain: 41 }, { high: 18.9, low: 6.4, sun: 7.1, rain: 34 },
    ],
  },
  tangier: {
    name: 'Tangier', nameAr: 'طنجة', color: C.tangier, elev: 20, koppen: 'Csa — Mediterranean',
    monthly: [
      { high: 16.9, low: 8.5, sun: 5.4, rain: 104 }, { high: 17.2, low: 8.8, sun: 6.1, rain: 90 },
      { high: 18.8, low: 10.1, sun: 7.0, rain: 73 }, { high: 20.4, low: 11.6, sun: 7.9, rain: 56 },
      { high: 23.6, low: 14.2, sun: 9.1, rain: 30 }, { high: 28.1, low: 17.8, sun: 10.2, rain: 8 },
      { high: 30.0, low: 19.8, sun: 11.1, rain: 2 }, { high: 30.1, low: 20.1, sun: 10.5, rain: 2 },
      { high: 27.5, low: 18.2, sun: 8.8, rain: 22 }, { high: 23.8, low: 15.1, sun: 7.2, rain: 71 },
      { high: 20.0, low: 12.1, sun: 5.8, rain: 135 }, { high: 17.5, low: 10.1, sun: 5.1, rain: 129 },
    ],
  },
  ouarzazate: {
    name: 'Ouarzazate', nameAr: 'ورزازات', color: C.ouarzazate, elev: 1150, koppen: 'BWk — Cold desert',
    monthly: [
      { high: 16.0, low: 1.0, sun: 7.4, rain: 10 }, { high: 18.5, low: 3.0, sun: 8.2, rain: 12 },
      { high: 22.0, low: 6.5, sun: 8.8, rain: 15 }, { high: 25.5, low: 9.5, sun: 9.5, rain: 10 },
      { high: 30.0, low: 13.0, sun: 10.2, rain: 8 }, { high: 35.0, low: 17.0, sun: 11.0, rain: 3 },
      { high: 39.5, low: 21.0, sun: 11.4, rain: 2 }, { high: 38.5, low: 20.5, sun: 10.8, rain: 4 },
      { high: 33.5, low: 17.0, sun: 9.4, rain: 10 }, { high: 27.5, low: 11.5, sun: 8.4, rain: 12 },
      { high: 21.0, low: 5.5, sun: 7.6, rain: 12 }, { high: 16.5, low: 1.5, sun: 7.2, rain: 8 },
    ],
  },
}

function hourlyTemps(m: MonthData): number[] {
  const range = m.high - m.low
  return Array.from({ length: 24 }, (_, h) => {
    const phase = ((h - 5) / 24) * Math.PI * 2
    return Math.round((m.low + (range / 2) * (1 + Math.sin(phase - Math.PI / 2))) * 10) / 10
  })
}

const STRESS = [
  { label: 'Comfortable', max: 28, color: C.comfort, op: '15' },
  { label: 'Warm', max: 33, color: C.warm, op: '20' },
  { label: 'Hot', max: 38, color: '#C8771A', op: '25' },
  { label: 'Very Hot', max: 42, color: C.heat, op: '30' },
  { label: 'Extreme', max: 55, color: C.stress, op: '40' },
]

function stressOf(t: number) {
  return STRESS.find(s => t <= s.max) || STRESS[STRESS.length - 1]
}

/* ═══ SVG MOUCHARABIEH — star-and-cross geometric pattern ═══ */
function Lattice({ temp }: { temp: number }) {
  const t = Math.max(10, Math.min(45, temp))
  const aperture = 0.85 - ((t - 10) / 35) * 0.75
  const stress = stressOf(temp)

  const cols = 7, rows = 7, cell = 40, pad = 6
  const w = cols * cell + pad * 2
  const h = rows * cell + pad * 2

  function starPath(cx: number, cy: number, a: number): string {
    const r = (cell / 2 - 2) * a
    const ri = r * 0.42
    const pts: string[] = []
    for (let i = 0; i < 8; i++) {
      const ang = (i * Math.PI) / 4 - Math.PI / 8
      pts.push(`${cx + r * Math.cos(ang)},${cy + r * Math.sin(ang)}`)
      const ia = ang + Math.PI / 8
      pts.push(`${cx + ri * Math.cos(ia)},${cy + ri * Math.sin(ia)}`)
    }
    return `M${pts.join('L')}Z`
  }

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: 340 }}>
        <defs>
          <pattern id="wg" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill={C.cedar} />
            <line x1="0" y1="0" x2="4" y2="4" stroke={C.shadow} strokeWidth="0.15" opacity="0.3" />
          </pattern>
          <linearGradient id="sf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.shadow} stopOpacity={0.12 * (1 - aperture)} />
            <stop offset="100%" stopColor={C.shadow} stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={w} height={h} fill={C.shadow} opacity="0.04" />
        <rect x={pad} y={pad} width={w - pad * 2} height={h - pad * 2} fill="url(#wg)" rx="2" />

        {Array.from({ length: rows * cols }, (_, i) => {
          const row = Math.floor(i / cols)
          const col = i % cols
          const cx = pad + col * cell + cell / 2
          const cy = pad + row * cell + cell / 2
          const dist = Math.sqrt(Math.pow((row - rows / 2 + 0.5) / rows, 2) + Math.pow((col - cols / 2 + 0.5) / cols, 2))
          const la = aperture * (1 + (0.5 - dist) * 0.2)
          const path = starPath(cx, cy, Math.max(0.08, la))

          return (
            <g key={i}>
              <path d={path} fill={C.shadow} opacity="0.03" />
              <path d={path} fill={C.light} opacity={la * 0.4} style={{ transition: 'opacity 0.5s' }} />
              <path d={path} fill="none" stroke={C.cedar} strokeWidth="0.5" opacity="0.4" />
            </g>
          )
        })}

        <rect x={pad} y={pad} width={w - pad * 2} height={h - pad * 2}
          fill="none" stroke={C.cedar} strokeWidth="1.5" rx="2" />
        <rect x={pad + 8} y={h - pad + 2} width={w - pad * 2 - 16} height="10"
          fill="url(#sf)" rx="1" />
      </svg>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {[
          { v: `${temp}°C`, l: 'exterior temp', c: stress.color },
          { v: `${Math.round(aperture * 100)}%`, l: 'aperture open', c: C.cedar },
          { v: stress.label, l: 'heat stress', c: stress.color },
        ].map(d => (
          <div key={d.l}>
            <p className="font-mono text-[22px] font-bold leading-none" style={{ color: d.c }}>{d.v}</p>
            <p className="font-mono text-[10px] mt-0.5" style={{ color: C.muted }}>{d.l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══ HOURLY BAR CHART ═══ */
function HourlyChart({ temps, hour, onHour, color }: {
  temps: number[]; hour: number; onHour: (h: number) => void; color: string
}) {
  return (
    <div>
      <div className="flex items-end gap-[2px] h-[140px]">
        {temps.map((t, i) => {
          const s = stressOf(t)
          const pct = ((t - 0) / 45) * 100
          const active = i === hour
          return (
            <div key={i} className="flex-1 flex flex-col justify-end h-full cursor-pointer"
              onClick={() => onHour(i)}>
              {active && (
                <span className="font-mono text-[9px] text-center mb-0.5 font-bold" style={{ color: s.color }}>{t}°</span>
              )}
              <div className="w-full rounded-t-[1px] transition-all duration-200"
                style={{
                  height: `${pct}%`,
                  background: active ? `${s.color}50` : `${s.color}18`,
                  borderTop: `1.5px solid ${active ? s.color : `${s.color}40`}`,
                }} />
            </div>
          )
        })}
      </div>
      <div className="flex gap-[2px] mt-0.5">
        {temps.map((_, i) => (
          <span key={i} className="flex-1 text-center font-mono"
            style={{ fontSize: 7, color: i % 3 === 0 ? C.muted : 'transparent' }}>
            {String(i).padStart(2, '0')}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="font-mono text-[9px]" style={{ color: C.muted }}>00:00</span>
        <input type="range" min={0} max={23} value={hour}
          onChange={e => onHour(Number(e.target.value))}
          className="flex-1 h-1 rounded-full cursor-pointer"
          style={{ accentColor: color }} />
        <span className="font-mono text-[9px]" style={{ color: C.muted }}>23:00</span>
      </div>
    </div>
  )
}

/* ═══ PAGE ═══ */
export function ShadowMoucharabiehContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const compR = useReveal()
  const sunR = useReveal()
  const warmR = useReveal()

  const [city, setCity] = useState<CityKey>('marrakech')
  const [mi, setMi] = useState(6)
  const [hour, setHour] = useState(15)

  const cd = CITIES[city]
  const md = cd.monthly[mi]
  const temps = hourlyTemps(md)
  const temp = temps[hour]

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>
          Climate Art · Traditional Architecture × Modern Heat
        </p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.2rem)] leading-[0.88] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Shadow of the Moucharabieh</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.3]" style={{ color: C.muted }}>
            How traditional lattice screens process climate data — and how +1.6°C is rewriting the algorithm.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          A moucharabieh is a carved wooden lattice screen that has regulated light, air, and
          privacy in Moroccan homes for centuries. It is an analogue climate processor: the
          input is solar radiation and temperature; the output is habitable shadow. At dawn the
          lattice breathes open. At midday it contracts — its star-shaped apertures tightening
          to filter the hammer of the sun. Morocco has warmed +1.6°C since 1990. In Ouarzazate,
          July peaks breach 39°C. The lattice that once sufficed is being tested by heat its
          builders never imagined.
        </p>

        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '+1.6', u: '°C', l: 'warming since 1990', c: C.heat },
            { v: '39.5', u: '°C', l: 'July peak, Ouarzazate', c: C.ouarzazate },
            { v: '3,534', u: 'h', l: 'sunshine hours / year', c: C.warm },
            { v: '1', u: 'mm', l: 'July rain, Marrakech', c: C.cool },
          ].map((n, i) => (
            <div key={n.l} className="transition-all duration-700"
              style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}>
                <span className="text-[28px] font-bold">{n.v}</span>
                <span className="text-[13px] ml-1">{n.u}</span>
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE LATTICE */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.cedar }}>
            The Living Lattice
          </p>
          <p className="font-mono text-[11px] mb-5" style={{ color: C.muted }}>
            Select a city, month, and drag the hour. The star apertures contract as temperature rises — the lattice &ldquo;closes&rdquo; at peak heat. At dawn, it opens to breathe.
          </p>

          <div className="flex flex-wrap gap-3 mb-5">
            <div className="flex gap-1">
              {(Object.keys(CITIES) as CityKey[]).map(k => (
                <button key={k} onClick={() => setCity(k)}
                  className="font-mono text-[10px] px-3 py-1 rounded-full border transition-all"
                  style={{
                    borderColor: city === k ? CITIES[k].color : C.border,
                    color: city === k ? CITIES[k].color : C.muted,
                    background: city === k ? `${CITIES[k].color}08` : 'transparent',
                    fontWeight: city === k ? 700 : 400,
                  }}>{CITIES[k].name}</button>
              ))}
            </div>
            <div className="flex gap-1 flex-wrap">
              {MONTHS.map((m, idx) => (
                <button key={m} onClick={() => setMi(idx)}
                  className="font-mono text-[9px] px-2 py-0.5 rounded-sm border transition-all"
                  style={{
                    borderColor: mi === idx ? cd.color : `${C.border}80`,
                    color: mi === idx ? cd.color : C.muted,
                    background: mi === idx ? `${cd.color}08` : 'transparent',
                    fontWeight: mi === idx ? 700 : 400,
                  }}>{m}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Lattice temp={temp} />
              <p className="font-mono text-[10px] mt-2 text-center italic" style={{ color: C.muted }}>
                {cd.name} · {MONTHS[mi]} · {String(hour).padStart(2, '0')}:00
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: cd.color }}>
                24-Hour Temperature — {cd.name}, {MONTHS[mi]}
              </p>
              <HourlyChart temps={temps} hour={hour} onHour={setHour} color={cd.color} />
              <div className="mt-3 p-3 rounded-sm" style={{ background: `${C.border}15` }}>
                <p className="font-mono text-[11px] leading-[1.6]" style={{ color: C.text }}>
                  <span className="font-bold" style={{ color: cd.color }}>{cd.name}</span> · {cd.koppen} · {cd.elev}m
                </p>
                <p className="font-mono text-[11px] leading-[1.6]" style={{ color: C.text }}>
                  {MONTHS[mi]} range: <strong>{md.low}°C</strong> → <strong>{md.high}°C</strong> · Swing: {(md.high - md.low).toFixed(1)}°C
                </p>
                <p className="font-mono text-[11px] leading-[1.6]" style={{ color: C.text }}>
                  Sunshine: {md.sun}h/day · Rain: {md.rain}mm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE-CITY HEAT MATRIX */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={compR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.heat }}>
            Three Climates, One Country
          </p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Monthly highs, colour-coded by heat stress. Ouarzazate enters &ldquo;Very Hot&rdquo; in June; Tangier never does.
          </p>

          <div className="overflow-x-auto">
            <div style={{ minWidth: 640 }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[9px] w-12 shrink-0" style={{ color: C.muted }}>Month</span>
                {(Object.keys(CITIES) as CityKey[]).map(k => (
                  <div key={k} className="flex-1 text-center">
                    <span className="font-mono text-[10px] font-bold" style={{ color: CITIES[k].color }}>{CITIES[k].name}</span>
                  </div>
                ))}
              </div>
              {MONTHS.map((m, idx) => (
                <div key={m} className="flex items-center gap-2 py-[2px]">
                  <span className="font-mono text-[10px] w-12 shrink-0 font-bold" style={{ color: C.ink }}>{m}</span>
                  {(Object.keys(CITIES) as CityKey[]).map(k => {
                    const d = CITIES[k].monthly[idx]
                    const s = stressOf(d.high)
                    const barW = ((d.high - 10) / 35) * 100
                    return (
                      <div key={k} className="flex-1 h-5 rounded-sm" style={{ background: `${C.border}10` }}>
                        <div className="h-full rounded-sm flex items-center px-1 transition-all duration-700"
                          style={{
                            width: compR.vis ? `${barW}%` : '0%',
                            background: `${s.color}15`,
                            borderRight: `2px solid ${s.color}`,
                            transitionDelay: `${idx * 25}ms`,
                          }}>
                          <span className="font-mono text-[8px] whitespace-nowrap" style={{ color: s.color }}>{d.high}°</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-3 flex-wrap">
            {STRESS.map(s => (
              <span key={s.label} className="flex items-center gap-1 font-mono text-[9px]" style={{ color: s.color }}>
                <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                {s.label} (&le;{s.max}°C)
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SOLAR CALENDAR */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={sunR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.warm }}>
            Solar Radiation Calendar
          </p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Average daily sunshine hours. The lattice works hardest where the sun burns longest.
          </p>
          <div className="space-y-3">
            {(Object.keys(CITIES) as CityKey[]).map(k => {
              const c = CITIES[k]
              return (
                <div key={k}>
                  <p className="font-mono text-[10px] font-bold mb-1" style={{ color: c.color }}>{c.name}</p>
                  <div className="flex gap-[3px]">
                    {c.monthly.map((m, idx) => {
                      const pct = (m.sun / 12) * 100
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div className="w-full h-12 rounded-sm flex items-end" style={{ background: `${C.border}10` }}>
                            <div className="w-full rounded-sm transition-all duration-700"
                              style={{
                                height: sunR.vis ? `${pct}%` : '0%',
                                background: `${C.warm}${String(Math.round(20 + pct * 0.3))}`,
                                transitionDelay: `${idx * 30}ms`,
                              }} />
                          </div>
                          <span className="font-mono text-[7px] mt-0.5" style={{ color: C.muted }}>{MONTHS[idx]}</span>
                          <span className="font-mono text-[8px]" style={{ color: C.warm }}>{m.sun}h</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* THE +1.6°C PROBLEM */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={warmR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.stress }}>
            The +1.6°C Problem
          </p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            The moucharabieh was designed for a cooler century. Traditional cooling is approaching its limits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-[11px] font-bold mb-3" style={{ color: C.ink }}>Traditional Cooling vs Modern Heat</p>
              <div className="space-y-2">
                {[
                  { name: 'Moucharabieh lattice', how: 'Filters light, channels air through star apertures', limit: 'Passive — cannot reduce below ambient', range: '< 35°C', failing: false },
                  { name: 'Riad courtyard + fountain', how: 'Evaporative cooling, thermal mass, stack ventilation', limit: 'Water scarcity undermining the effect', range: '< 38°C', failing: false },
                  { name: 'Pisé walls (60 cm)', how: '8–12 hour thermal lag delays peak heat to evening', limit: 'Rising night temps prevent full discharge', range: '< 40°C if night < 22°C', failing: true },
                  { name: 'Wind tower (badgir)', how: 'Passive ventilation via pressure differential', limit: 'Needs > 10°C diurnal swing — shrinking', range: '< 42°C with swing', failing: true },
                ].map((m, i) => (
                  <div key={m.name} className="p-3 rounded-sm transition-all duration-500"
                    style={{
                      background: `${m.failing ? C.heat : C.cedar}05`,
                      border: `1px solid ${m.failing ? `${C.heat}30` : C.border}`,
                      opacity: warmR.vis ? 1 : 0, transitionDelay: `${i * 80}ms`,
                    }}>
                    <p className="font-mono text-[11px] font-bold" style={{ color: C.ink }}>{m.name}</p>
                    <p className="font-mono text-[10px] leading-[1.5]" style={{ color: C.muted }}>{m.how}</p>
                    <p className="font-mono text-[10px] leading-[1.5] mt-1" style={{ color: m.failing ? C.heat : C.text }}>{m.limit}</p>
                    <p className="font-mono text-[9px] mt-0.5" style={{ color: C.muted }}>Effective range: {m.range}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] font-bold mb-3" style={{ color: C.heat }}>Morocco Average Temperature by Decade</p>
              <div className="space-y-2">
                {[
                  { decade: '1990s', avg: 17.4, delta: 'baseline', note: 'WMO 1991–2000 average from 5 stations' },
                  { decade: '2000s', avg: 17.9, delta: '+0.5°C', note: 'Gradual warming. Drought years increasing.' },
                  { decade: '2010s', avg: 18.4, delta: '+1.0°C', note: 'Heat records broken across interior.' },
                  { decade: '2020s', avg: 19.0, delta: '+1.6°C', note: 'August 2023 warmest month on record (27.9°C avg).' },
                ].map((d, i) => {
                  const barW = ((d.avg - 16) / 4) * 100
                  return (
                    <div key={d.decade} className="transition-all duration-500"
                      style={{ opacity: warmR.vis ? 1 : 0, transitionDelay: `${i * 100}ms` }}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[12px] w-12 shrink-0 font-bold" style={{ color: C.ink }}>{d.decade}</span>
                        <div className="flex-1 h-6 rounded-sm" style={{ background: `${C.border}15` }}>
                          <div className="h-full rounded-sm flex items-center px-2 transition-all duration-700"
                            style={{
                              width: warmR.vis ? `${barW}%` : '0%',
                              background: `${C.heat}${String(8 + i * 5).padStart(2, '0')}`,
                              borderRight: `2px solid ${C.heat}`,
                              transitionDelay: `${i * 100}ms`,
                            }}>
                            <span className="font-mono text-[11px] font-bold whitespace-nowrap" style={{ color: C.heat }}>{d.avg}°C</span>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] w-14 text-right shrink-0 font-bold"
                          style={{ color: d.delta === 'baseline' ? C.muted : C.heat }}>{d.delta}</span>
                      </div>
                      <p className="font-mono text-[9px] ml-[60px] mt-0.5" style={{ color: C.muted }}>{d.note}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 p-3 rounded-sm" style={{ background: `${C.heat}06`, border: `1px solid ${C.heat}15` }}>
                <p className="font-mono text-[11px] leading-[1.7]" style={{ color: C.text }}>
                  The moucharabieh was calibrated for a world 1.6°C cooler. In Ouarzazate, the July
                  diurnal swing (21°C → 39.5°C = 18.5°C range) still allows thick walls to work —
                  heat absorbed by day radiates at night. But as minimum temperatures rise,
                  the &ldquo;reset window&rdquo; shrinks. When nights stay above 25°C, traditional thermal
                  mass cannot fully discharge. The architecture stops breathing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.cedar }}>The Lattice as Algorithm</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                A moucharabieh is not decoration. It is a passive climate algorithm: input
                (solar angle, wind direction), parameters (hole size, wood density, screen depth),
                output (filtered light, directed airflow, privacy). The craftsman who carved it
                was performing thermal modelling by hand, calibrated over generations. Each city
                had its own lattice density — Marrakech denser than Tangier, Ouarzazate densest of all.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.cool }}>Why Tangier Survives</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Tangier&apos;s July peak (30°C) stays within the &ldquo;Warm&rdquo; threshold. The Atlantic
                moderates extremes. Traditional architecture still works here. In Marrakech
                and Ouarzazate, where peaks hit 37–40°C, passive cooling approaches its limits.
                The cities that need traditional design most are the ones where it is failing first.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.heat }}>The 2030 Projection</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                At current warming rates, Marrakech will average 38°C+ in July by the 2030s.
                Ouarzazate will regularly exceed 41°C. The World Cup will be played in
                air-conditioned stadiums while the medinas, built for a cooler century,
                adapt or overheat. The moucharabieh is not obsolete — it is a blueprint for
                bio-inspired design. But it needs augmentation: hybrid systems combining
                passive lattice with targeted mechanical cooling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The moucharabieh is not a window. It is a question: how much
            light do you need? How much heat can you bear? For centuries,
            the answer was carved in cedar. Now the question is changing
            faster than wood can be cut. The lattice closes a little
            more each decade — not because the craftsman adjusted it, but
            because the sun grew louder. At some temperature, the holes
            close entirely. That is the threshold Morocco is approaching.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Monthly climate data: WMO 1991–2020 normals via ClimateToTravel, Weather Atlas,
            Climate-Data.org. Marrakech (Jul high 36.8°C): Weather Atlas. Tangier (Aug high 30.1°C):
            Weather Atlas. Ouarzazate (Jul high ~39.5°C): ClimateToTravel. Warming trend (+1.6°C since
            1990): WorldData.info analysis of German Weather Service (DWD) stations. Annual sunshine
            (3,534h): Climate-Data.org Marrakech. Aug 2023 record (27.9°C avg): WorldData.info. Heat
            Stress Index thresholds adapted from WHO/WMO guidelines. Traditional cooling effectiveness:
            editorial estimates based on Fathy (1986), Pearlmutter (2007), Santamouris (2016).
            Moucharabieh design: Al-Jayyousi (2003), Ragette (2012). Hourly curves are sinusoidal
            models calibrated to monthly min/max — not station-level observations.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.heat }}>© Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
