'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  tangier: '#1A5276', rabat: '#2D6E4F', casablanca: '#4A6741',
  fes: '#8B6914', marrakech: '#8B3A3A', agadir: '#C17F28',
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  sunlight: '#F5E6C8', dawn: '#C4956A',
}

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

const CITIES = [
  { name: 'Tangier', lat: 35.77, color: C.tangier, stadium: 'Ibn Batouta (75,600)' },
  { name: 'Fes', lat: 34.03, color: C.fes, stadium: 'Fes Stadium (55,800)' },
  { name: 'Rabat', lat: 34.01, color: C.rabat, stadium: 'Prince Moulay Abdellah (68,700)' },
  { name: 'Casablanca', lat: 33.57, color: C.casablanca, stadium: 'Grand Stade Hassan II (115,000)' },
  { name: 'Marrakech', lat: 31.63, color: C.marrakech, stadium: 'Marrakech Stadium (70,000)' },
  { name: 'Agadir', lat: 30.42, color: C.agadir, stadium: 'Agadir Stadium (70,000)' },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_DAYS = [15, 46, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349]

function daylightHours(lat: number, dayOfYear: number): number {
  const decl = 23.45 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81))
  const latRad = (lat * Math.PI) / 180
  const decRad = (decl * Math.PI) / 180
  const ha = Math.acos(-Math.tan(latRad) * Math.tan(decRad))
  return (2 * ha * 180) / (15 * Math.PI)
}

function sunriseTime(lat: number, day: number) { return 12 - daylightHours(lat, day) / 2 }
function sunsetTime(lat: number, day: number) { return 12 + daylightHours(lat, day) / 2 }
function fmt(h: number) { const hr = Math.floor(h); const mn = Math.round((h - hr) * 60); return `${hr}:${mn.toString().padStart(2, '0')}` }

const cityData = CITIES.map(c => ({
  ...c,
  months: MONTH_DAYS.map(day => ({
    daylight: daylightHours(c.lat, day),
    sunrise: sunriseTime(c.lat, day),
    sunset: sunsetTime(c.lat, day),
  })),
}))

export default function CalendarOfLightContent() {
  const heroR = useReveal()
  const chartR = useReveal()
  const tableR = useReveal()
  const [activeCity, setActiveCity] = useState(0)
  const [hoverMonth, setHoverMonth] = useState<number | null>(null)

  const city = cityData[activeCity]
  const juneDaylight = city.months[5].daylight
  const decDaylight = city.months[11].daylight
  const swing = juneDaylight - decDaylight

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Astronomical Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Calendar of Light</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            How latitude shapes the day. Six cities. Twelve months. Every minute of sunlight.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Morocco spans 5.4° of latitude — from Tangier at 35.8°N to Agadir at 30.4°N.
          That difference means Tangier gets {swing.toFixed(1)} more hours of daylight variation
          between solstices than Agadir. In June, Tangier sees {fmt(cityData[0].months[5].sunset)} sunsets;
          Agadir sees {fmt(cityData[5].months[5].sunset)}. By December, Tangier&apos;s day shrinks to {cityData[0].months[11].daylight.toFixed(1)} hours
          while Agadir holds at {cityData[5].months[11].daylight.toFixed(1)}. Latitude is destiny — for light, for agriculture, for <span className="underline underline-offset-2">Ramadan</span> fasting hours.
        </p>
      </section>

      {/* CITY SELECTOR + DAYLIGHT CHART */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: city.color }}>Daylight Hours by Month</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Click a city. Hover bars for sunrise/sunset times. Taller bar = longer day.
          </p>
          {/* City buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CITIES.map((c, i) => (
              <button key={c.name} onClick={() => setActiveCity(i)}
                className="font-mono text-[11px] px-3 py-1.5 rounded-full border transition-all"
                style={{
                  borderColor: activeCity === i ? c.color : C.border,
                  color: activeCity === i ? c.color : C.muted,
                  background: activeCity === i ? `${c.color}06` : 'transparent',
                }}>
                {c.name} <span className="opacity-50">{c.lat.toFixed(1)}°N</span>
              </button>
            ))}
          </div>

          {/* Bar chart */}
          <div ref={chartR.ref} className="flex items-end gap-[2px] h-[280px] mb-2">
            {city.months.map((m, i) => {
              const minH = 8.5, maxH = 15.5
              const heightPct = ((m.daylight - minH) / (maxH - minH)) * 100
              const isHover = hoverMonth === i
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative"
                  onMouseEnter={() => setHoverMonth(i)} onMouseLeave={() => setHoverMonth(null)}>
                  {/* Tooltip */}
                  {isHover && (
                    <div className="absolute bottom-full mb-2 px-2 py-1 rounded-sm text-center whitespace-nowrap z-10"
                      style={{ background: city.color, color: 'white', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}>
                      <div>{m.daylight.toFixed(1)}h daylight</div>
                      <div>↑ {fmt(m.sunrise)} — ↓ {fmt(m.sunset)}</div>
                    </div>
                  )}
                  <div className="w-full rounded-t-sm transition-all duration-700"
                    style={{
                      height: chartR.vis ? `${heightPct}%` : '0%',
                      background: isHover ? city.color : `${city.color}25`,
                      transitionDelay: `${i * 50}ms`,
                    }} />
                </div>
              )
            })}
          </div>
          <div className="flex gap-[2px]">
            {MONTHS.map((m, i) => (
              <span key={m} className="flex-1 text-center font-mono text-[10px]"
                style={{ color: hoverMonth === i ? city.color : C.muted }}>{m}</span>
            ))}
          </div>
          {/* Key numbers */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div>
              <p className="font-mono text-[22px] font-bold" style={{ color: city.color }}>{juneDaylight.toFixed(1)}h</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>Longest day (June solstice)</p>
            </div>
            <div>
              <p className="font-mono text-[22px] font-bold" style={{ color: city.color }}>{decDaylight.toFixed(1)}h</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>Shortest day (Dec solstice)</p>
            </div>
            <div>
              <p className="font-mono text-[22px] font-bold" style={{ color: city.color }}>{swing.toFixed(1)}h</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>Seasonal swing</p>
            </div>
          </div>
        </div>
      </section>

      {/* ALL CITIES COMPARISON */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.muted }}>City Comparison: June vs December</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Higher latitude = wider swing between seasons. Tangier feels the difference most.
          </p>
          <div ref={tableR.ref} className="space-y-3">
            {cityData.map((c, i) => {
              const junH = c.months[5].daylight
              const decH = c.months[11].daylight
              const sw = junH - decH
              return (
                <div key={c.name} className="transition-all duration-500"
                  style={{ opacity: tableR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-[12px] font-semibold w-24 shrink-0" style={{ color: c.color }}>{c.name}</span>
                    <span className="font-mono text-[10px] w-12 shrink-0" style={{ color: C.muted }}>{c.lat.toFixed(1)}°N</span>
                    <div className="flex-1 h-6 relative rounded-sm" style={{ background: `${C.border}30` }}>
                      {/* December bar (shorter) */}
                      <div className="absolute left-0 top-0 h-3 rounded-t-sm transition-all duration-700"
                        style={{ width: tableR.vis ? `${(decH / 16) * 100}%` : '0%', background: `${c.color}15`, transitionDelay: `${i * 80}ms` }}>
                        <span className="absolute right-1 top-0 font-mono text-[9px]" style={{ color: c.color }}>{decH.toFixed(1)}h Dec</span>
                      </div>
                      {/* June bar (longer) */}
                      <div className="absolute left-0 top-3 h-3 rounded-b-sm transition-all duration-700"
                        style={{ width: tableR.vis ? `${(junH / 16) * 100}%` : '0%', background: `${c.color}30`, transitionDelay: `${i * 80 + 100}ms` }}>
                        <span className="absolute right-1 top-0 font-mono text-[9px] font-bold" style={{ color: c.color }}>{junH.toFixed(1)}h Jun</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] font-bold w-12 text-right" style={{ color: c.color }}>±{sw.toFixed(1)}h</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* RAMADAN INSIGHT */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.dawn }}>Why This Matters: Ramadan Fasting Hours</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                During Ramadan (Feb 28 – Mar 30, 2026), Muslims fast from dawn to sunset.
                In late February/March, Tangier&apos;s fasting day is approximately {cityData[0].months[2].daylight.toFixed(1)} hours
                while Agadir&apos;s is {cityData[5].months[2].daylight.toFixed(1)} hours — a difference of about {(cityData[0].months[2].daylight - cityData[5].months[2].daylight).toFixed(0)} minutes.
                When Ramadan falls in summer, that gap widens dramatically.
              </p>
            </div>
            <div>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                For the 2030 World Cup (June–July), match scheduling must account for light.
                Evening matches in Tangier can start later — sunset at {fmt(cityData[0].months[5].sunset)} vs
                Agadir&apos;s {fmt(cityData[5].months[5].sunset)}. An extra {((cityData[0].months[5].sunset - cityData[5].months[5].sunset) * 60).toFixed(0)} minutes
                of twilight means different floodlight costs, different crowd behaviour, different broadcast windows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            Light is infrastructure. It determines when you eat, when you pray,
            when you play football, and when you harvest. Morocco&apos;s 5.4 degrees
            of latitude produce a subtle gradient that shapes everything from
            Ramadan endurance to World Cup scheduling. The sun does not care
            about borders — but it cares about latitude.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Daylight calculations from standard solar declination formulae using city latitude
            coordinates. Sunrise/sunset times are solar (not clock) time — actual clock times
            vary with timezone, equation of time, and Morocco&apos;s seasonal daylight saving changes.
            Stadium capacities from Morocco 2030 World Cup bid documents and AFCON 2025 records.
            Ramadan dates from Umm al-Qura calendar (Saudi Arabia) adjusted for Moroccan sighting.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.tangier }}>© Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
