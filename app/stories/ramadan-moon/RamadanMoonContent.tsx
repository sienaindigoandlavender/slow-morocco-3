'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'

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

// ═══ STAR FIELD DATA (stable across renders) ═══

const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: ((i * 7919 + 13) % 1000) / 10,
  y: ((i * 6271 + 37) % 1000) / 10,
  r: 0.3 + ((i * 3571) % 100) / 100 * 0.8,
  delay: ((i * 4937) % 100) / 100 * 6,
  duration: 3 + ((i * 2749) % 100) / 100 * 4,
  opacity: 0.15 + ((i * 8123) % 100) / 100 * 0.35,
}))

// ═══ HOOKS ═══

function useInView(threshold = 0.2): [React.RefCallback<HTMLElement>, boolean] {
  const [inView, setInView] = useState(false)
  const [el, setEl] = useState<HTMLElement | null>(null)
  const ref = useCallback((node: HTMLElement | null) => setEl(node), [])

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

function useCountUp(target: number, visible: boolean, duration = 1800, delay = 0): number {
  const [value, setValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (!visible) return
    const timeout = setTimeout(() => {
      const animate = (ts: number) => {
        if (!startTime.current) startTime.current = ts
        const elapsed = ts - startTime.current
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) rafId.current = requestAnimationFrame(animate)
      }
      rafId.current = requestAnimationFrame(animate)
    }, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(rafId.current) }
  }, [visible, target, duration, delay])

  return value
}

// ═══ MOON SVG ═══

function Moon({ cx, cy, r, illumination, glow = false, highlight = false, breatheDelay = 0 }: {
  cx: number; cy: number; r: number; illumination: number; glow?: boolean; highlight?: boolean; breatheDelay?: number
}) {
  const brightness = illumination
  const moonColor = `rgba(255, 248, 220, ${0.15 + brightness * 0.85})`
  const shadowOffset = (1 - illumination * 2) * r * 0.8
  const clipId = `moon-clip-${Math.round(cx)}-${Math.round(cy)}`

  return (
    <g>
      {/* Breathing glow */}
      {brightness > 0.3 && (
        <circle
          cx={cx} cy={cy} r={r * 2.5}
          fill={`rgba(255, 248, 220, ${brightness * 0.06})`}
        >
          <animate
            attributeName="r"
            values={`${r * 2.2};${r * 3};${r * 2.2}`}
            dur={`${4 + breatheDelay * 0.3}s`}
            begin={`${breatheDelay * 0.15}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur={`${4 + breatheDelay * 0.3}s`}
            begin={`${breatheDelay * 0.15}s`}
            repeatCount="indefinite"
          />
        </circle>
      )}
      {highlight && (
        <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke="#FCBF49" strokeWidth="1" opacity="0.5">
          <animate
            attributeName="opacity"
            values="0.3;0.7;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
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

// ═══ STAR FIELD ═══

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {STARS.map((star, i) => (
          <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="rgba(255,248,220,0.6)">
            <animate
              attributeName="opacity"
              values={`${star.opacity};${star.opacity * 0.2};${star.opacity}`}
              dur={`${star.duration}s`}
              begin={`${star.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}

// ═══ PAGE ═══

export function RamadanMoonContent() {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  const [heroRef, heroVisible] = useInView(0.3)
  const [moonRef, moonVisible] = useInView(0.15)
  const [wheelRef, wheelVisible] = useInView(0.15)
  const [barsRef, barsVisible] = useInView(0.15)
  const [factRef, factVisible] = useInView(0.3)

  // Auto-play: cycle through nights when visible and not hovered
  const [autoNight, setAutoNight] = useState<number | null>(null)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!moonVisible) return

    // Start auto-play after initial reveal
    const startDelay = setTimeout(() => {
      let night = 0
      autoPlayRef.current = setInterval(() => {
        setAutoNight(night)
        night = (night + 1) % 30
      }, 800)
    }, 2000)

    return () => {
      clearTimeout(startDelay)
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [moonVisible])

  // Stop auto-play on manual hover
  const handleDayEnter = useCallback((i: number) => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
    setAutoNight(null)
    setHoveredDay(i)
  }, [])

  const handleDayLeave = useCallback(() => {
    setHoveredDay(null)
  }, [])

  const activeDay = hoveredDay ?? autoNight

  // Count-up numbers
  const count354 = useCountUp(354, heroVisible, 1800, 200)
  const count11 = useCountUp(11, heroVisible, 1200, 500)
  const count33 = useCountUp(33, heroVisible, 1400, 800)

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

  // Drift wheel path
  const driftPath = useMemo(() => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const points = SEASONAL_DRIFT.map((y) => {
      const monthStr = y.start.split(' ')[0]
      const monthIdx = monthNames.indexOf(monthStr)
      const dayNum = parseInt(y.start.split(' ')[1])
      const yearAngle = ((monthIdx + dayNum / 30) / 12) * 2 * Math.PI - Math.PI / 2
      const hourR = 60 + (y.hours - 10) * 16
      return {
        x: 250 + hourR * Math.cos(yearAngle),
        y: 250 + hourR * Math.sin(yearAngle),
      }
    })
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  }, [])

  const driftPathLength = useMemo(() => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const points = SEASONAL_DRIFT.map((y) => {
      const monthStr = y.start.split(' ')[0]
      const monthIdx = monthNames.indexOf(monthStr)
      const dayNum = parseInt(y.start.split(' ')[1])
      const yearAngle = ((monthIdx + dayNum / 30) / 12) * 2 * Math.PI - Math.PI / 2
      const hourR = 60 + (y.hours - 10) * 16
      return {
        x: 250 + hourR * Math.cos(yearAngle),
        y: 250 + hourR * Math.sin(yearAngle),
      }
    })
    let len = 0
    for (let i = 1; i < points.length; i++) {
      len += Math.sqrt((points[i].x - points[i - 1].x) ** 2 + (points[i].y - points[i - 1].y) ** 2)
    }
    return Math.round(len)
  }, [])

  return (
    <div className="bg-white text-white min-h-screen pt-16">

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="px-8 md:px-[8%] lg:px-[12%] pt-20 pb-8">
        <p
          className="micro-label text-[#555] mb-2"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          Module 006 · Cultural Intelligence
        </p>
        <h1
          className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.02em] mb-4"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
          }}
        >
          <em>Ramadan &amp; the Moon</em>
        </h1>
        <p
          className="text-[13px] text-[#666] max-w-[540px] leading-[1.7]"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
          }}
        >
          The Islamic calendar is purely lunar — 354 days, 11 shorter than the Gregorian year.
          Ramadan drifts backward through the seasons, completing a full rotation every 33 years.
          The crescent moon begins it. The crescent moon ends it.
        </p>
        <div
          className="flex gap-6 mt-6"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 1s ease 0.6s, transform 1s ease 0.6s',
          }}
        >
          <div>
            <p className="font-serif italic text-[28px] text-white/90">{count354}</p>
            <p className="micro-label text-[#555]">Days in lunar year</p>
          </div>
          <div>
            <p className="font-serif italic text-[28px] text-[#FCBF49]">{count11}</p>
            <p className="micro-label text-[#555]">Day annual drift</p>
          </div>
          <div>
            <p className="font-serif italic text-[28px] text-white/90">{count33}</p>
            <p className="micro-label text-[#555]">Years full cycle</p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 1: THE 30 MOONS ═══ */}
      <section ref={moonRef} className="px-8 md:px-[8%] lg:px-[12%] pt-12 relative">
        <StarField />
        <div className="border-t border-white/[0.06] pt-8 relative z-10">
          <p className="micro-label text-white/60 mb-1">30 Nights of Ramadan</p>
          <p className="font-serif italic text-[20px] text-white/70 mb-0">
            From crescent to crescent
          </p>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto relative">
        <StarField />
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto relative z-10">
          {/* Faint arc guide */}
          <path
            d={`M ${CX + ARC_R * Math.cos(START_A)} ${CY + ARC_R * Math.sin(START_A)} A ${ARC_R} ${ARC_R} 0 0 1 ${CX + ARC_R * Math.cos(END_A)} ${CY + ARC_R * Math.sin(END_A)}`}
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />

          {/* 30 moons — staggered entrance */}
          {moonPositions.map((m, i) => {
            const isActive = activeDay === i
            const revealDelay = i * 50
            return (
              <g
                key={m.day}
                style={{
                  opacity: moonVisible ? (activeDay !== null && !isActive ? 0.2 : 1) : 0,
                  transform: moonVisible ? 'translateY(0)' : 'translateY(15px)',
                  transition: `opacity 0.5s ease ${revealDelay}ms, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${revealDelay}ms`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => handleDayEnter(i)}
                onMouseLeave={handleDayLeave}
              >
                <Moon
                  cx={m.x}
                  cy={m.y}
                  r={9}
                  illumination={m.illumination}
                  glow={m.illumination > 0.7}
                  highlight={m.isQadr}
                  breatheDelay={i}
                />
                <text
                  x={m.x}
                  y={m.y + 23}
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

          {/* Annotations — fade in after moons */}
          <g style={{ opacity: moonVisible ? 1 : 0, transition: 'opacity 1s ease 1.8s' }}>
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
          </g>
        </svg>

        {/* Hover / auto-play detail */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-[rgba(20,20,20,0.95)] border border-white/10 px-5 py-3 text-center min-w-[220px] z-20"
          style={{
            opacity: activeDay !== null ? 1 : 0,
            transform: activeDay !== null ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            pointerEvents: activeDay !== null ? 'auto' : 'none',
          }}
        >
          {activeDay !== null && (
            <>
              <p className="micro-label text-[#666] mb-1">Night {DAYS[activeDay].day} of Ramadan</p>
              <p className="font-serif italic text-[18px] text-white mb-1">
                {Math.round(DAYS[activeDay].illumination * 100)}% illuminated
              </p>
              {DAYS[activeDay].isQadr && (
                <p className="text-[10px] text-[#FCBF49]">Possible Laylat al-Qadr — the Night of Power</p>
              )}
              {DAYS[activeDay].day === 1 && (
                <p className="text-[10px] text-white/70">The first sighting of the hilal marks the start</p>
              )}
              {DAYS[activeDay].day === 15 && (
                <p className="text-[10px] text-[rgba(255,248,220,0.6)]">Full moon — Laylat al-Badr</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* ═══ SECTION 2: THE 33-YEAR DRIFT ═══ */}
      <section ref={wheelRef} className="px-8 md:px-[8%] lg:px-[12%] pt-12">
        <div className="border-t border-white/[0.06] pt-8">
          <p
            className="micro-label text-white/60 mb-1"
            style={{
              opacity: wheelVisible ? 1 : 0,
              transform: wheelVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            The 33-Year Rotation
          </p>
          <p
            className="font-serif italic text-[20px] text-white/70 mb-6"
            style={{
              opacity: wheelVisible ? 1 : 0,
              transform: wheelVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
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
                  opacity={wheelVisible ? 0.5 : 0}
                  style={{ transition: 'opacity 1s ease 0.5s' }}
                >
                  {s.label}
                </text>
              ))}

              {/* Reference rings */}
              {[60, 100, 140, 170].map(r => (
                <circle key={r} cx={250} cy={250} r={r} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              ))}

              {/* Animated connecting path */}
              <path
                d={driftPath}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray={driftPathLength}
                strokeDashoffset={wheelVisible ? 0 : driftPathLength}
                style={{ transition: `stroke-dashoffset 3s cubic-bezier(0.25,0.46,0.45,0.94) 0.5s` }}
              />

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
                const dotDelay = 500 + i * 150

                return (
                  <g
                    key={y.year}
                    style={{
                      opacity: wheelVisible ? (hoveredYear !== null && !isHovered ? 0.2 : 1) : 0,
                      transition: `opacity 0.5s ease ${dotDelay}ms`,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredYear(i)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    {isHovered && <circle cx={px} cy={py} r={14} fill={color} opacity={0.15} />}
                    <circle cx={px} cy={py} r={5} fill={color} />
                    <circle cx={px} cy={py} r={5} fill="url(#dot-glow)" />
                    {/* Breathing pulse on dots */}
                    <circle cx={px} cy={py} r={5} fill="none" stroke={color} strokeWidth="1">
                      <animate
                        attributeName="r"
                        values="5;9;5"
                        dur={`${3 + i * 0.2}s`}
                        begin={`${i * 0.3}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.4;0;0.4"
                        dur={`${3 + i * 0.2}s`}
                        begin={`${i * 0.3}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
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
              <div
                style={{
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: 'opacity 0.3s, transform 0.3s',
                }}
              >
                <p className="font-serif italic text-[22px] mb-1" style={{ color: SEASON_COLORS[SEASONAL_DRIFT[hoveredYear].season] }}>
                  Ramadan {SEASONAL_DRIFT[hoveredYear].year}
                </p>
                <p className="text-[12px] text-white/60">
                  Starts {SEASONAL_DRIFT[hoveredYear].start} · {SEASONAL_DRIFT[hoveredYear].hours} hours fasting · {SEASONAL_DRIFT[hoveredYear].temp} in Marrakech
                </p>
              </div>
            ) : (
              <p className="font-serif italic text-[15px] text-white/70">
                Hover a year to see fasting conditions
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: FASTING HOURS ═══ */}
      <section ref={barsRef} className="px-8 md:px-[8%] lg:px-[12%] pt-6">
        <div className="border-t border-white/[0.06] pt-8">
          <p
            className="micro-label text-white/60 mb-1"
            style={{
              opacity: barsVisible ? 1 : 0,
              transform: barsVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            What Fasting Feels Like
          </p>
          <p
            className="font-serif italic text-[20px] text-white/70 mb-5"
            style={{
              opacity: barsVisible ? 1 : 0,
              transform: barsVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
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
                    transform: barsVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.5s ease ${i * 80}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${i * 80}ms`,
                  }}
                  onMouseEnter={() => setHoveredYear(i)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  <span className="text-[11px] text-white/70 text-right">{y.year}</span>
                  <div className="h-4 bg-white/[0.03] relative overflow-hidden">
                    <div
                      className="h-full relative"
                      style={{
                        width: barsVisible ? `${barWidth}%` : '0%',
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                        transition: `width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 80 + 200}ms`,
                      }}
                    />
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] text-white/60">&#9728;</span>
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
          <p
            className="text-[10px] text-white/60 mt-2"
            style={{
              opacity: barsVisible ? 1 : 0,
              transition: 'opacity 0.7s ease 1.5s',
            }}
          >
            Hours from fajr (dawn) to maghrib (sunset) in Marrakech. No food. No water.
          </p>
        </div>
      </section>

      {/* ═══ BIG FACT ═══ */}
      <section ref={factRef} className="mt-16" style={{ background: 'linear-gradient(135deg, rgba(252,191,73,0.15) 0%, rgba(10,10,10,1) 60%)' }}>
        <div className="max-w-[600px] mx-auto px-6 py-16 text-center">
          <p
            className="font-serif italic text-[clamp(1.3rem,4vw,2rem)] text-white leading-[1.35]"
            style={{
              opacity: factVisible ? 1 : 0,
              transform: factVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 1.2s ease, transform 1.2s ease',
            }}
          >
            A lunar year is 354 days. A solar year is 365. The 11-day gap means Ramadan walks backward through the calendar. In 33 years, it completes the circle.
          </p>
          <p
            className="text-[10px] text-white/70 mt-3"
            style={{
              opacity: factVisible ? 1 : 0,
              transform: factVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 1s ease 0.6s, transform 1s ease 0.6s',
            }}
          >
            Someone born in 1990 has already fasted in every season.
          </p>
        </div>
      </section>

      {/* ═══ KEY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/[0.06] pt-6">
          <div>
            <p className="micro-label text-white/60 mb-2">The Crescent (Hilal)</p>
            <p className="text-[12px] text-white/70 leading-[1.6]">
              Ramadan begins when the new crescent is sighted after sunset. Different countries may start on different days — some follow local sighting, others follow Mecca.
            </p>
          </div>
          <div>
            <p className="micro-label text-white/60 mb-2">Laylat al-Qadr</p>
            <p className="text-[12px] text-white/70 leading-[1.6]">
              The Night of Power — when the Quran was first revealed. Sought on the odd nights of the last 10 days (21st, 23rd, 25th, 27th, 29th). Marked in <span className="text-[#FCBF49]">gold</span> above.
            </p>
          </div>
          <div>
            <p className="micro-label text-white/60 mb-2">Eid al-Fitr</p>
            <p className="text-[12px] text-white/70 leading-[1.6]">
              The festival of breaking the fast. Begins at the sighting of the next new crescent — the 1st of Shawwal. Three days of celebration.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t border-white/[0.06] pt-4">
          <p className="micro-label text-white/60 mb-2">Sources & Methodology</p>
          <p className="text-[11px] text-white/70 leading-[1.6] max-w-[600px]">
            Ramadan start dates based on Umm al-Qura calendar and historical Islamic calendar data.
            Fasting hours calculated for Marrakech (31.63°N) from astronomical fajr to maghrib.
            Temperatures are historical monthly averages from Marrakech-Menara weather station.
            Moon illumination calculated using sinusoidal approximation of the 29.53-day synodic month.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px] text-white/60">
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
