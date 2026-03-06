'use client'

import { useState, useEffect, useMemo } from 'react'

// ═══ DATA ═══

const DAYS = Array.from({ length: 30 }, (_, i) => {
  const phase = i / 29
  return {
    day: i + 1,
    phase,
    illumination: Math.sin(phase * Math.PI),
    isOdd: (i + 1) % 2 === 1,
    isLastTen: i >= 19,
    isQadr: [20, 22, 24, 26, 28].includes(i),
  }
})

const SEASONAL_DRIFT: { year: number; start: string; season: 'summer' | 'spring' | 'autumn' | 'winter'; hours: number; temp: string }[] = [
  { year: 2015, start: 'Jun 18', season: 'summer', hours: 16.5, temp: '40°C' },
  { year: 2018, start: 'May 16', season: 'spring', hours: 15.5, temp: '32°C' },
  { year: 2020, start: 'Apr 24', season: 'spring', hours: 14.5, temp: '28°C' },
  { year: 2023, start: 'Mar 23', season: 'spring', hours: 13, temp: '22°C' },
  { year: 2025, start: 'Feb 28', season: 'winter', hours: 12.5, temp: '18°C' },
  { year: 2026, start: 'Feb 18', season: 'winter', hours: 12, temp: '16°C' },
  { year: 2028, start: 'Jan 22', season: 'winter', hours: 11, temp: '14°C' },
  { year: 2030, start: 'Jan 1', season: 'winter', hours: 10.5, temp: '12°C' },
  { year: 2033, start: 'Dec 12', season: 'winter', hours: 10, temp: '12°C' },
  { year: 2035, start: 'Nov 22', season: 'autumn', hours: 10.5, temp: '18°C' },
  { year: 2038, start: 'Oct 12', season: 'autumn', hours: 12, temp: '26°C' },
  { year: 2040, start: 'Sep 20', season: 'summer', hours: 13, temp: '30°C' },
  { year: 2043, start: 'Aug 11', season: 'summer', hours: 15, temp: '38°C' },
  { year: 2046, start: 'Jul 2', season: 'summer', hours: 16, temp: '40°C' },
]

const SEASON_COLORS: Record<string, string> = {
  summer: '#E63946',
  spring: '#FCBF49',
  autumn: '#F77F00',
  winter: '#48BFE3',
}

// ═══ HOOKS ═══

function useInView(threshold = 0.2): [React.RefCallback<HTMLElement>, boolean] {
  const [inView, setInView] = useState(false)
  const [el, setEl] = useState<HTMLElement | null>(null)
  const ref = (node: HTMLElement | null) => setEl(node)

  useEffect(() => {
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [el, threshold])

  return [ref, inView]
}

// ═══ MOON SVG ═══

function Moon({ cx, cy, r, illumination, glow = false, highlight = false }: {
  cx: number; cy: number; r: number; illumination: number; glow?: boolean; highlight?: boolean
}) {
  const brightness = illumination
  const moonColor = `rgba(255, 248, 220, ${0.15 + brightness * 0.85})`
  const shadowOffset = (1 - illumination * 2) * r * 0.8
  const clipId = `moon-clip-${Math.round(cx)}-${Math.round(cy)}`

  return (
    <g>
      {glow && brightness > 0.6 && (
        <circle cx={cx} cy={cy} r={r * 2} fill={`rgba(255, 248, 220, ${brightness * 0.08})`} />
      )}
      {highlight && (
        <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke="#FCBF49" strokeWidth="1" opacity="0.5" />
      )}
      <circle cx={cx} cy={cy} r={r} fill="rgba(255,248,220,0.08)" />
      <defs>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <circle cx={cx} cy={cy} r={r} fill={moonColor} />
        {illumination < 0.95 && (
          <ellipse
            cx={cx + shadowOffset}
            cy={cy}
            rx={r * (1 - illumination * 0.9)}
            ry={r}
            fill="#0a0a0a"
            opacity={0.92 - illumination * 0.3}
          />
        )}
      </g>
      {brightness > 0.5 && (
        <>
          <circle cx={cx - r * 0.2} cy={cy - r * 0.15} r={r * 0.12} fill={`rgba(200,190,170,${brightness * 0.15})`} />
          <circle cx={cx + r * 0.25} cy={cy + r * 0.2} r={r * 0.08} fill={`rgba(200,190,170,${brightness * 0.12})`} />
          <circle cx={cx - r * 0.1} cy={cy + r * 0.3} r={r * 0.1} fill={`rgba(200,190,170,${brightness * 0.1})`} />
        </>
      )}
    </g>
  )
}

// ═══ PAGE ═══

export function RamadanMoonContent() {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  const [moonRef, moonVisible] = useInView(0.15)
  const [wheelRef, wheelVisible] = useInView(0.15)
  const [barsRef, barsVisible] = useInView(0.15)

  // Arc layout for the 30 moons
  const W = 800
  const H = 460
  const CX = W / 2
  const CY = 400
  const ARC_R = 340
  const START_A = Math.PI + 0.3
  const END_A = 2 * Math.PI - 0.3
  const SPREAD = END_A - START_A

  const moonPositions = useMemo(() =>
    DAYS.map((d, i) => {
      const angle = START_A + (i / 29) * SPREAD
      return {
        ...d,
        x: CX + ARC_R * Math.cos(angle),
        y: CY + ARC_R * Math.sin(angle),
        angle,
      }
    }), [CX, CY, ARC_R, START_A, SPREAD]
  )

  return (
    <div className="bg-white text-white min-h-screen pt-16">

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-20 pb-8">
        <p className="micro-label text-[#555] mb-2">Module 006 · Cultural Intelligence</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.02em] mb-4">
          <em>Ramadan &amp; the Moon</em>
        </h1>
        <p className="text-[13px] text-[#666] max-w-[540px] leading-[1.7]">
          The Islamic calendar is purely lunar — 354 days, 11 shorter than the Gregorian year.
          Ramadan drifts backward through the seasons, completing a full rotation every 33 years.
          The crescent moon begins it. The crescent moon ends it.
        </p>
        <div className="flex gap-6 mt-6">
          <div>
            <p className="font-serif italic text-[28px] text-white/90">354</p>
            <p className="micro-label text-[#555]">Days in lunar year</p>
          </div>
          <div>
            <p className="font-serif italic text-[28px] text-[#FCBF49]">11</p>
            <p className="micro-label text-[#555]">Day annual drift</p>
          </div>
          <div>
            <p className="font-serif italic text-[28px] text-white/90">33</p>
            <p className="micro-label text-[#555]">Years full cycle</p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 1: THE 30 MOONS ═══ */}
      <section ref={moonRef} className="px-8 md:px-[8%] lg:px-[12%] pt-12">
        <div className="border-t border-white/[0.06] pt-8">
          <p className="micro-label text-[#444] mb-1">30 Nights of Ramadan</p>
          <p className="font-serif italic text-[20px] text-white/50 mb-0">
            From crescent to crescent
          </p>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {/* Faint arc guide */}
          <path
            d={`M ${CX + ARC_R * Math.cos(START_A)} ${CY + ARC_R * Math.sin(START_A)} A ${ARC_R} ${ARC_R} 0 0 1 ${CX + ARC_R * Math.cos(END_A)} ${CY + ARC_R * Math.sin(END_A)}`}
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />

          {/* 30 moons */}
          {moonPositions.map((m, i) => {
            const isHovered = hoveredDay === i
            const moonR = 9
            return (
              <g
                key={m.day}
                opacity={moonVisible ? (hoveredDay !== null && !isHovered ? 0.25 : 1) : 0}
                style={{ transition: 'opacity 0.4s ease', cursor: 'pointer' }}
                onMouseEnter={() => setHoveredDay(i)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <Moon
                  cx={m.x}
                  cy={m.y}
                  r={moonR}
                  illumination={m.illumination}
                  glow={m.illumination > 0.7}
                  highlight={m.isQadr}
                />
                <text
                  x={m.x}
                  y={m.y + moonR + 14}
                  textAnchor="middle"
                  fill={m.isQadr ? '#FCBF49' : m.isLastTen ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)'}
                  fontSize="8"
                  fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
                >
                  {m.day}
                </text>
              </g>
            )
          })}

          {/* Annotations */}
          <text x={moonPositions[0].x - 16} y={moonPositions[0].y - 20} textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="var(--font-plex-mono), monospace">
            First crescent
          </text>
          <text x={moonPositions[0].x - 16} y={moonPositions[0].y - 10} textAnchor="end" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="var(--font-plex-mono), monospace">
            hilal sighted →
          </text>

          <text x={CX} y={moonPositions[14].y - 24} textAnchor="middle" fill="rgba(255,248,220,0.6)" fontSize="9" fontFamily="var(--font-plex-mono), monospace">
            Full moon · Laylat al-Badr
          </text>

          <text x={moonPositions[29].x + 16} y={moonPositions[29].y - 20} textAnchor="start" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="var(--font-plex-mono), monospace">
            New crescent
          </text>
          <text x={moonPositions[29].x + 16} y={moonPositions[29].y - 10} textAnchor="start" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="var(--font-plex-mono), monospace">
            ← Eid al-Fitr begins
          </text>

          {/* Last 10 nights bracket */}
          <line
            x1={moonPositions[19].x} y1={moonPositions[19].y + 28}
            x2={moonPositions[29].x} y2={moonPositions[29].y + 28}
            stroke="#FCBF49" strokeWidth="1" opacity="0.4"
          />
          <text
            x={(moonPositions[19].x + moonPositions[29].x) / 2}
            y={Math.max(moonPositions[19].y, moonPositions[29].y) + 42}
            textAnchor="middle"
            fill="#FCBF49"
            fontSize="8"
            fontFamily="var(--font-plex-mono), monospace"
            opacity="0.7"
          >
            LAST 10 NIGHTS · Laylat al-Qadr sought on odd nights
          </text>
        </svg>

        {/* Hover detail */}
        {hoveredDay !== null && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[rgba(20,20,20,0.95)] border border-white/10 px-5 py-3 text-center min-w-[220px]">
            <p className="micro-label text-[#666] mb-1">Night {DAYS[hoveredDay].day} of Ramadan</p>
            <p className="font-serif italic text-[18px] text-white mb-1">
              {Math.round(DAYS[hoveredDay].illumination * 100)}% illuminated
            </p>
            {DAYS[hoveredDay].isQadr && (
              <p className="text-[10px] text-[#FCBF49]">Possible Laylat al-Qadr — the Night of Power</p>
            )}
            {DAYS[hoveredDay].day === 1 && (
              <p className="text-[10px] text-white/50">The first sighting of the hilal marks the start</p>
            )}
            {DAYS[hoveredDay].day === 15 && (
              <p className="text-[10px] text-[rgba(255,248,220,0.6)]">Full moon — Laylat al-Badr</p>
            )}
          </div>
        )}
      </div>

      {/* ═══ SECTION 2: THE 33-YEAR DRIFT ═══ */}
      <section ref={wheelRef} className="px-8 md:px-[8%] lg:px-[12%] pt-12">
        <div className="border-t border-white/[0.06] pt-8">
          <p className="micro-label text-[#444] mb-1">The 33-Year Rotation</p>
          <p className="font-serif italic text-[20px] text-white/50 mb-6">
            Ramadan drifts 11 days earlier each year. In one lifetime, you fast in every season.
          </p>

          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 500 500" className="w-full max-w-[420px] h-auto">
              {/* Season labels */}
              {[
                { label: 'SUMMER', angle: 0, color: '#E63946' },
                { label: 'AUTUMN', angle: Math.PI / 2, color: '#F77F00' },
                { label: 'WINTER', angle: Math.PI, color: '#48BFE3' },
                { label: 'SPRING', angle: 3 * Math.PI / 2, color: '#FCBF49' },
              ].map((s) => (
                <text
                  key={s.label}
                  x={250 + 195 * Math.cos(s.angle - Math.PI / 2)}
                  y={250 + 195 * Math.sin(s.angle - Math.PI / 2)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={s.color}
                  fontSize="9"
                  fontFamily="var(--font-plex-mono), monospace"
                  letterSpacing="0.15em"
                  opacity="0.5"
                >
                  {s.label}
                </text>
              ))}

              {/* Reference rings */}
              {[60, 100, 140, 170].map(r => (
                <circle key={r} cx={250} cy={250} r={r} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              ))}

              {/* Year dots */}
              {SEASONAL_DRIFT.map((y, i) => {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                const monthStr = y.start.split(' ')[0]
                const monthIdx = monthNames.indexOf(monthStr)
                const dayNum = parseInt(y.start.split(' ')[1])
                const yearAngle = ((monthIdx + dayNum / 30) / 12) * 2 * Math.PI - Math.PI / 2
                const hourR = 60 + (y.hours - 10) * 16
                const px = 250 + hourR * Math.cos(yearAngle)
                const py = 250 + hourR * Math.sin(yearAngle)
                const isHovered = hoveredYear === i
                const color = SEASON_COLORS[y.season]

                return (
                  <g
                    key={y.year}
                    opacity={wheelVisible ? (hoveredYear !== null && !isHovered ? 0.2 : 1) : 0}
                    style={{ transition: 'opacity 0.3s ease', cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredYear(i)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    {isHovered && <circle cx={px} cy={py} r={14} fill={color} opacity={0.15} />}
                    <circle cx={px} cy={py} r={5} fill={color} />
                    <circle cx={px} cy={py} r={5} fill="url(#dot-glow)" />
                    <text
                      x={px} y={py - 10}
                      textAnchor="middle"
                      fill={isHovered ? '#fff' : 'rgba(255,255,255,0.7)'}
                      fontSize={isHovered ? '10' : '8'}
                      fontFamily="var(--font-plex-mono), monospace"
                      fontWeight={isHovered ? '600' : '400'}
                      style={{ transition: 'all 0.2s ease' }}
                    >
                      {y.year}
                    </text>
                  </g>
                )
              })}

              {/* Center */}
              <text x={250} y={242} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.1em">
                SHORTER FAST
              </text>
              <text x={250} y={258} textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="7" fontFamily="var(--font-plex-mono), monospace">
                (inner = fewer hours)
              </text>

              <defs>
                <radialGradient id="dot-glow" cx="35%" cy="30%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Hover detail */}
          <div className="text-center min-h-[48px] mb-2">
            {hoveredYear !== null ? (
              <>
                <p className="font-serif italic text-[22px] mb-1" style={{ color: SEASON_COLORS[SEASONAL_DRIFT[hoveredYear].season] }}>
                  Ramadan {SEASONAL_DRIFT[hoveredYear].year}
                </p>
                <p className="text-[12px] text-white/60">
                  Starts {SEASONAL_DRIFT[hoveredYear].start} · {SEASONAL_DRIFT[hoveredYear].hours} hours fasting · {SEASONAL_DRIFT[hoveredYear].temp} in Marrakech
                </p>
              </>
            ) : (
              <p className="font-serif italic text-[15px] text-white/50">
                Hover a year to see fasting conditions
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: FASTING HOURS ═══ */}
      <section ref={barsRef} className="px-8 md:px-[8%] lg:px-[12%] pt-6">
        <div className="border-t border-white/[0.06] pt-8">
          <p className="micro-label text-[#444] mb-1">What Fasting Feels Like</p>
          <p className="font-serif italic text-[20px] text-white/50 mb-5">
            Fasting hours in Marrakech, by year
          </p>

          <div className="flex flex-col gap-[6px]">
            {SEASONAL_DRIFT.map((y, i) => {
              const barWidth = ((y.hours - 9) / 8) * 100
              const color = SEASON_COLORS[y.season]
              const isHovered = hoveredYear === i
              return (
                <div
                  key={y.year}
                  className="grid items-center gap-2 cursor-pointer"
                  style={{
                    gridTemplateColumns: '56px 1fr 48px',
                    opacity: barsVisible ? (hoveredYear !== null && !isHovered ? 0.2 : 1) : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={() => setHoveredYear(i)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  <span className="text-[11px] text-white/50 text-right">{y.year}</span>
                  <div className="h-4 bg-white/[0.03] relative">
                    <div
                      className="h-full"
                      style={{
                        width: barsVisible ? `${barWidth}%` : '0%',
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                        transition: 'width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] text-white/60">☀</span>
                  </div>
                  <span
                    className="text-[11px] font-serif italic transition-colors"
                    style={{ color: isHovered ? color : 'rgba(255,255,255,0.7)' }}
                  >
                    {y.hours}h
                  </span>
                </div>
              )
            })}
          </div>
          <p className="text-[10px] text-white/20 mt-2">
            Hours from fajr (dawn) to maghrib (sunset) in Marrakech. No food. No water.
          </p>
        </div>
      </section>

      {/* ═══ BIG FACT ═══ */}
      <section className="mt-16" style={{ background: 'linear-gradient(135deg, rgba(252,191,73,0.15) 0%, rgba(10,10,10,1) 60%)' }}>
        <div className="max-w-[600px] mx-auto px-6 py-16 text-center">
          <p className="font-serif italic text-[clamp(1.3rem,4vw,2rem)] text-white leading-[1.35]">
            A lunar year is 354 days. A solar year is 365. The 11-day gap means Ramadan walks backward through the calendar. In 33 years, it completes the circle.
          </p>
          <p className="text-[10px] text-white/50 mt-3">
            Someone born in 1990 has already fasted in every season.
          </p>
        </div>
      </section>

      {/* ═══ KEY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/[0.06] pt-6">
          <div>
            <p className="micro-label text-[#444] mb-2">The Crescent (Hilal)</p>
            <p className="text-[12px] text-white/50 leading-[1.6]">
              Ramadan begins when the new crescent is sighted after sunset. Different countries may start on different days — some follow local sighting, others follow Mecca.
            </p>
          </div>
          <div>
            <p className="micro-label text-[#444] mb-2">Laylat al-Qadr</p>
            <p className="text-[12px] text-white/50 leading-[1.6]">
              The Night of Power — when the Quran was first revealed. Sought on the odd nights of the last 10 days (21st, 23rd, 25th, 27th, 29th). Marked in <span className="text-[#FCBF49]">gold</span> above.
            </p>
          </div>
          <div>
            <p className="micro-label text-[#444] mb-2">Eid al-Fitr</p>
            <p className="text-[12px] text-white/50 leading-[1.6]">
              The festival of breaking the fast. Begins at the sighting of the next new crescent — the 1st of Shawwal. Three days of celebration.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t border-white/[0.06] pt-4">
          <p className="micro-label text-[#333] mb-2">Sources & Methodology</p>
          <p className="text-[11px] text-white/20 leading-[1.6] max-w-[600px]">
            Ramadan start dates based on Umm al-Qura calendar and historical Islamic calendar data.
            Fasting hours calculated for Marrakech (31.63°N) from astronomical fajr to maghrib.
            Temperatures are historical monthly averages from Marrakech-Menara weather station.
            Moon illumination calculated using sinusoidal approximation of the 29.53-day synodic month.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px] text-white/20">
              © {new Date().getFullYear()} Slow Morocco. All rights reserved. This visualization may not be reproduced without visible attribution.
            </p>
            <p className="font-serif italic text-[12px] text-[#FCBF49]">
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
