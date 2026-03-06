'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'

// ═══ DATA ═══

// The Islamic (Hijri) calendar has 12 lunar months, each 29 or 30 days
const HIJRI_MONTHS = [
  { name: 'Muharram', days: 30, note: 'Islamic New Year (1st)' },
  { name: 'Safar', days: 29 },
  { name: 'Rabi al-Awwal', days: 30, note: 'Birth of the Prophet ﷺ (12th)' },
  { name: 'Rabi al-Thani', days: 29 },
  { name: 'Jumada al-Ula', days: 30 },
  { name: 'Jumada al-Thani', days: 29 },
  { name: 'Rajab', days: 30 },
  { name: 'Shaban', days: 29 },
  { name: 'Ramadan', days: 30, highlight: 'ramadan' as const },
  { name: 'Shawwal', days: 29, highlight: 'eid-fitr' as const, note: 'Eid al-Fitr (1st–3rd)' },
  { name: 'Dhul Qadah', days: 30 },
  { name: 'Dhul Hijjah', days: 29, highlight: 'eid-adha' as const, note: 'Eid al-Adha (10th–13th)' },
]

const TOTAL_LUNAR_DAYS = HIJRI_MONTHS.reduce((sum, m) => sum + m.days, 0) // 354

// Gregorian start dates for the three observances (approximate, based on crescent sighting)
const TIMELINE_DATA: { year: number; ramadanStart: string; eidFitrStart: string; eidAdhaStart: string }[] = [
  { year: 2020, ramadanStart: 'Apr 24', eidFitrStart: 'May 24', eidAdhaStart: 'Jul 31' },
  { year: 2021, ramadanStart: 'Apr 13', eidFitrStart: 'May 13', eidAdhaStart: 'Jul 20' },
  { year: 2022, ramadanStart: 'Apr 2', eidFitrStart: 'May 2', eidAdhaStart: 'Jul 9' },
  { year: 2023, ramadanStart: 'Mar 23', eidFitrStart: 'Apr 21', eidAdhaStart: 'Jun 29' },
  { year: 2024, ramadanStart: 'Mar 11', eidFitrStart: 'Apr 10', eidAdhaStart: 'Jun 17' },
  { year: 2025, ramadanStart: 'Feb 28', eidFitrStart: 'Mar 30', eidAdhaStart: 'Jun 7' },
  { year: 2026, ramadanStart: 'Feb 18', eidFitrStart: 'Mar 20', eidAdhaStart: 'May 27' },
  { year: 2027, ramadanStart: 'Feb 8', eidFitrStart: 'Mar 9', eidAdhaStart: 'May 16' },
  { year: 2028, ramadanStart: 'Jan 22', eidFitrStart: 'Feb 21', eidAdhaStart: 'May 5' },
  { year: 2029, ramadanStart: 'Jan 11', eidFitrStart: 'Feb 10', eidAdhaStart: 'Apr 24' },
  { year: 2030, ramadanStart: 'Jan 1', eidFitrStart: 'Jan 31', eidAdhaStart: 'Apr 13' },
]

const HIGHLIGHT_COLORS = {
  'ramadan': '#FCBF49',
  'eid-fitr': '#48BFE3',
  'eid-adha': '#E63946',
} as const

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

function Moon({ cx, cy, r, illumination, highlight = false, breatheDelay = 0, color }: {
  cx: number; cy: number; r: number; illumination: number; highlight?: boolean; breatheDelay?: number; color?: string
}) {
  const brightness = illumination
  const moonColor = `rgba(255, 248, 220, ${0.15 + brightness * 0.85})`
  const shadowOffset = (1 - illumination * 2) * r * 0.8
  const clipId = `moon-clip-${Math.round(cx)}-${Math.round(cy)}`

  return (
    <g>
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
      {highlight && color && (
        <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke={color} strokeWidth="1" opacity="0.5">
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
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  const [heroRef, heroVisible] = useInView(0.3)
  const [wheelRef, wheelVisible] = useInView(0.15)
  const [timelineRef, timelineVisible] = useInView(0.15)
  const [factRef, factVisible] = useInView(0.3)

  // Count-up numbers
  const count354 = useCountUp(354, heroVisible, 1800, 200)
  const count12 = useCountUp(12, heroVisible, 1200, 500)
  const count33 = useCountUp(33, heroVisible, 1400, 800)

  // Circular layout for the 12 months
  const WHEEL_CX = 250
  const WHEEL_CY = 250
  const WHEEL_R = 180

  const monthPositions = useMemo(() =>
    HIJRI_MONTHS.map((m, i) => {
      const angle = (i / 12) * 2 * Math.PI - Math.PI / 2
      return {
        ...m,
        index: i,
        x: WHEEL_CX + WHEEL_R * Math.cos(angle),
        y: WHEEL_CY + WHEEL_R * Math.sin(angle),
        angle,
        // Moon illumination: new moon at start, full at mid-month, new again
        illumination: Math.sin((15 / 30) * Math.PI) * 0.5 + 0.3,
      }
    }), [WHEEL_CX, WHEEL_CY, WHEEL_R]
  )

  // Parse month+day to approximate day-of-year (0-based)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthDayStarts = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]

  const parseDateToDoy = useCallback((dateStr: string) => {
    const parts = dateStr.split(' ')
    const mIdx = monthNames.indexOf(parts[0])
    const day = parseInt(parts[1])
    return monthDayStarts[mIdx] + day
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <em>The Islamic Calendar</em>
        </h1>
        <p
          className="text-[13px] text-[#666] max-w-[540px] leading-[1.7]"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
          }}
        >
          The Hijri calendar is purely lunar — 12 months, 354 days, each month beginning
          at the sighting of the new crescent moon. It drifts 11 days earlier each Gregorian year,
          completing a full rotation every 33 years. Three observances shape the rhythm of Moroccan life:
          Ramadan, Eid al-Fitr, and Eid al-Adha.
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
            <p className="font-serif italic text-[28px] text-[#FCBF49]">{count12}</p>
            <p className="micro-label text-[#555]">Lunar months</p>
          </div>
          <div>
            <p className="font-serif italic text-[28px] text-white/90">{count33}</p>
            <p className="micro-label text-[#555]">Years full cycle</p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 1: THE 12-MONTH WHEEL ═══ */}
      <section ref={wheelRef} className="px-8 md:px-[8%] lg:px-[12%] pt-12 relative">
        <StarField />
        <div className="border-t border-white/[0.06] pt-8 relative z-10">
          <p className="micro-label text-white/60 mb-1">12 Lunar Months</p>
          <p className="font-serif italic text-[20px] text-white/70 mb-0">
            Each month begins with the sighting of the hilal
          </p>
        </div>
      </section>

      <div className="max-w-[600px] mx-auto relative py-4">
        <StarField />
        <svg viewBox="0 0 500 500" className="w-full h-auto relative z-10">
          {/* Reference circle */}
          <circle cx={WHEEL_CX} cy={WHEEL_CY} r={WHEEL_R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

          {/* Month arcs showing duration */}
          {monthPositions.map((m, i) => {
            const startAngle = (i / 12) * 2 * Math.PI - Math.PI / 2
            const endAngle = ((i + 1) / 12) * 2 * Math.PI - Math.PI / 2
            const innerR = WHEEL_R - 25
            const outerR = WHEEL_R + 25

            const x1o = WHEEL_CX + outerR * Math.cos(startAngle + 0.02)
            const y1o = WHEEL_CY + outerR * Math.sin(startAngle + 0.02)
            const x2o = WHEEL_CX + outerR * Math.cos(endAngle - 0.02)
            const y2o = WHEEL_CY + outerR * Math.sin(endAngle - 0.02)
            const x1i = WHEEL_CX + innerR * Math.cos(endAngle - 0.02)
            const y1i = WHEEL_CY + innerR * Math.sin(endAngle - 0.02)
            const x2i = WHEEL_CX + innerR * Math.cos(startAngle + 0.02)
            const y2i = WHEEL_CY + innerR * Math.sin(startAngle + 0.02)

            const isHighlighted = m.highlight
            const isHovered = hoveredMonth === i
            const color = isHighlighted ? HIGHLIGHT_COLORS[m.highlight!] : 'rgba(255,255,255,0.08)'
            const hoverColor = isHighlighted ? HIGHLIGHT_COLORS[m.highlight!] : 'rgba(255,255,255,0.15)'
            const revealDelay = 300 + i * 100

            return (
              <g
                key={m.name}
                style={{
                  opacity: wheelVisible ? (hoveredMonth !== null && !isHovered ? 0.3 : 1) : 0,
                  transition: `opacity 0.5s ease ${revealDelay}ms`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredMonth(i)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                <path
                  d={`M ${x1o} ${y1o} A ${outerR} ${outerR} 0 0 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${innerR} ${innerR} 0 0 0 ${x2i} ${y2i} Z`}
                  fill={isHovered ? hoverColor : (isHighlighted ? `${color}30` : color)}
                  stroke={isHighlighted ? color : 'rgba(255,255,255,0.06)'}
                  strokeWidth={isHighlighted ? 1.5 : 0.5}
                  style={{ transition: 'fill 0.3s ease' }}
                />
                {/* Month number */}
                <text
                  x={WHEEL_CX + (WHEEL_R + 42) * Math.cos((startAngle + endAngle) / 2)}
                  y={WHEEL_CY + (WHEEL_R + 42) * Math.sin((startAngle + endAngle) / 2)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isHighlighted ? color : 'rgba(255,255,255,0.5)'}
                  fontSize="8"
                  fontFamily="var(--font-plex-mono), monospace"
                >
                  {i + 1}
                </text>
              </g>
            )
          })}

          {/* Center text */}
          <text x={WHEEL_CX} y={WHEEL_CY - 16} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.15em">
            HIJRI
          </text>
          <text x={WHEEL_CX} y={WHEEL_CY + 2} textAnchor="middle" fill="rgba(255,248,220,0.7)" fontSize="11" fontFamily="var(--font-plex-mono), monospace">
            354 days
          </text>
          <text x={WHEEL_CX} y={WHEEL_CY + 18} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="var(--font-plex-mono), monospace">
            11 days shorter than solar
          </text>

          <defs>
            <radialGradient id="dot-glow" cx="35%" cy="30%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
        </svg>

        {/* Hover detail */}
        <div className="text-center min-h-[60px] mb-2 px-4">
          {hoveredMonth !== null ? (
            <div
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'opacity 0.3s, transform 0.3s',
              }}
            >
              <p
                className="font-serif italic text-[22px] mb-1"
                style={{ color: HIJRI_MONTHS[hoveredMonth].highlight ? HIGHLIGHT_COLORS[HIJRI_MONTHS[hoveredMonth].highlight!] : 'rgba(255,255,255,0.9)' }}
              >
                {HIJRI_MONTHS[hoveredMonth].name}
              </p>
              <p className="text-[12px] text-white/60">
                Month {hoveredMonth + 1} · {HIJRI_MONTHS[hoveredMonth].days} days
                {HIJRI_MONTHS[hoveredMonth].note && ` · ${HIJRI_MONTHS[hoveredMonth].note}`}
              </p>
            </div>
          ) : (
            <p className="font-serif italic text-[15px] text-white/70">
              Hover a month to explore the Hijri calendar
            </p>
          )}
        </div>
      </div>

      {/* ═══ SECTION 2: THREE TIMELINES — DRIFT THROUGH GREGORIAN YEARS ═══ */}
      <section ref={timelineRef} className="px-8 md:px-[8%] lg:px-[12%] pt-6">
        <div className="border-t border-white/[0.06] pt-8">
          <p
            className="micro-label text-white/60 mb-1"
            style={{
              opacity: timelineVisible ? 1 : 0,
              transform: timelineVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            The 11-Day Drift
          </p>
          <p
            className="font-serif italic text-[20px] text-white/70 mb-8"
            style={{
              opacity: timelineVisible ? 1 : 0,
              transform: timelineVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            Three observances walking backward through the Gregorian calendar
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mb-8">
            {[
              { label: 'Ramadan', sublabel: '30 days of fasting', color: HIGHLIGHT_COLORS.ramadan },
              { label: 'Eid al-Fitr', sublabel: '3 days, end of Ramadan', color: HIGHLIGHT_COLORS['eid-fitr'] },
              { label: 'Eid al-Adha', sublabel: '4 days, the Great Feast', color: HIGHLIGHT_COLORS['eid-adha'] },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[12px] text-white/80">{item.label}</span>
                <span className="text-[10px] text-white/50">{item.sublabel}</span>
              </div>
            ))}
          </div>

          {/* Year rows */}
          <div className="space-y-[2px]">
            {TIMELINE_DATA.map((y, yi) => {
              const isHovered = hoveredYear === yi
              const ramadanDoy = parseDateToDoy(y.ramadanStart)
              const eidFitrDoy = parseDateToDoy(y.eidFitrStart)
              const eidAdhaDoy = parseDateToDoy(y.eidAdhaStart)

              return (
                <div
                  key={y.year}
                  className="grid items-center gap-2 cursor-pointer"
                  style={{
                    gridTemplateColumns: '44px 1fr',
                    opacity: timelineVisible ? (hoveredYear !== null && !isHovered ? 0.25 : 1) : 0,
                    transform: timelineVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.5s ease ${yi * 80}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${yi * 80}ms`,
                  }}
                  onMouseEnter={() => setHoveredYear(yi)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  <span className="text-[11px] text-white/70 text-right font-mono">{y.year}</span>
                  <div className="h-6 bg-white/[0.03] relative overflow-hidden">
                    {/* Ramadan bar (30 days) */}
                    <div
                      className="absolute top-0 h-full"
                      style={{
                        left: timelineVisible ? `${(ramadanDoy / 365) * 100}%` : '0%',
                        width: timelineVisible ? `${(30 / 365) * 100}%` : '0%',
                        background: `${HIGHLIGHT_COLORS.ramadan}cc`,
                        transition: `left 1s ease ${yi * 80 + 200}ms, width 0.8s ease ${yi * 80 + 300}ms`,
                      }}
                    />
                    {/* Eid al-Fitr bar (3 days) */}
                    <div
                      className="absolute top-0 h-full"
                      style={{
                        left: timelineVisible ? `${(eidFitrDoy / 365) * 100}%` : '0%',
                        width: timelineVisible ? `${(3 / 365) * 100}%` : '0%',
                        background: `${HIGHLIGHT_COLORS['eid-fitr']}cc`,
                        transition: `left 1s ease ${yi * 80 + 250}ms, width 0.8s ease ${yi * 80 + 350}ms`,
                      }}
                    />
                    {/* Eid al-Adha bar (4 days) */}
                    <div
                      className="absolute top-0 h-full"
                      style={{
                        left: timelineVisible ? `${(eidAdhaDoy / 365) * 100}%` : '0%',
                        width: timelineVisible ? `${(4 / 365) * 100}%` : '0%',
                        background: `${HIGHLIGHT_COLORS['eid-adha']}cc`,
                        transition: `left 1s ease ${yi * 80 + 300}ms, width 0.8s ease ${yi * 80 + 400}ms`,
                      }}
                    />
                    {/* Month gridlines */}
                    {[31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334].map(d => (
                      <div
                        key={d}
                        className="absolute top-0 h-full w-px bg-white/[0.04]"
                        style={{ left: `${(d / 365) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Gregorian month labels */}
          <div className="grid items-center gap-2 mt-1" style={{ gridTemplateColumns: '44px 1fr' }}>
            <span />
            <div className="relative h-4">
              {monthNames.map((m, i) => (
                <span
                  key={m}
                  className="absolute text-[8px] text-white/40 font-mono"
                  style={{ left: `${(monthDayStarts[i] / 365) * 100}%` }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Hover detail for timeline */}
          <div className="text-center min-h-[48px] mt-4 mb-2">
            {hoveredYear !== null ? (
              <div style={{ opacity: 1, transition: 'opacity 0.3s' }}>
                <p className="font-serif italic text-[18px] text-white/90 mb-1">{TIMELINE_DATA[hoveredYear].year}</p>
                <p className="text-[11px] text-white/60">
                  <span style={{ color: HIGHLIGHT_COLORS.ramadan }}>Ramadan</span> starts {TIMELINE_DATA[hoveredYear].ramadanStart}
                  {' · '}
                  <span style={{ color: HIGHLIGHT_COLORS['eid-fitr'] }}>Eid al-Fitr</span> starts {TIMELINE_DATA[hoveredYear].eidFitrStart}
                  {' · '}
                  <span style={{ color: HIGHLIGHT_COLORS['eid-adha'] }}>Eid al-Adha</span> starts {TIMELINE_DATA[hoveredYear].eidAdhaStart}
                </p>
              </div>
            ) : (
              <p className="font-serif italic text-[14px] text-white/70">
                Hover a year to see the dates
              </p>
            )}
          </div>
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
            A lunar year is 354 days. A solar year is 365. The 11-day gap means every Islamic observance walks backward through the Gregorian calendar. In 33 years, they complete the circle — returning to where they started.
          </p>
        </div>
      </section>

      {/* ═══ KEY — THE THREE OBSERVANCES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/[0.06] pt-6">
          <div>
            <p className="micro-label mb-2" style={{ color: HIGHLIGHT_COLORS.ramadan }}>Ramadan</p>
            <p className="text-[12px] text-white/70 leading-[1.6]">
              The 9th month of the Hijri calendar. Thirty days of fasting from dawn (fajr) to sunset (maghrib) — no food, no water. It begins when the new crescent moon (hilal) is sighted after the 29th of Shaban. The month of revelation, patience, and charity.
            </p>
          </div>
          <div>
            <p className="micro-label mb-2" style={{ color: HIGHLIGHT_COLORS['eid-fitr'] }}>Eid al-Fitr</p>
            <p className="text-[12px] text-white/70 leading-[1.6]">
              The festival of breaking the fast. Falls on the 1st of Shawwal — the month immediately after Ramadan. Three days of celebration, communal prayer, new clothes, sweets, and family visits. Known in Morocco simply as &ldquo;l-Eid s-sghir&rdquo; — the Small Eid.
            </p>
          </div>
          <div>
            <p className="micro-label mb-2" style={{ color: HIGHLIGHT_COLORS['eid-adha'] }}>Eid al-Adha</p>
            <p className="text-[12px] text-white/70 leading-[1.6]">
              The Great Feast. Falls on the 10th of Dhul Hijjah, the month of the Hajj pilgrimage. Four days of celebration. Families sacrifice a sheep in remembrance of Ibrahim&apos;s willingness. In Morocco, it is &ldquo;l-Eid l-kbir&rdquo; — the Big Eid — the most important holiday of the year.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t border-white/[0.06] pt-4">
          <p className="micro-label text-white/60 mb-2">Sources & Methodology</p>
          <p className="text-[11px] text-white/70 leading-[1.6] max-w-[600px]">
            Dates based on the Umm al-Qura calendar used in Saudi Arabia and widely referenced across the Islamic world.
            Actual start dates may vary by 1–2 days depending on local crescent moon sighting committees.
            Morocco follows the announcements of the Ministry of Habous and Islamic Affairs.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px] text-white/60">
              © {new Date().getFullYear()} Slow Morocco. All rights reserved.
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
