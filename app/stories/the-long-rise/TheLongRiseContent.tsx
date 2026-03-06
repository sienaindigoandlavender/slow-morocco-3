'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  rise: '#2D6E4F', cliff: '#A0452E', gold: '#C8A415', sea: '#1A4B8A',
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

// ═══ DATA — overnight tourist arrivals (millions) ═══
// Source: WorldData.info (UNWTO / World Bank), Ministry of Tourism
interface YearData {
  year: number; arrivals: number; revenue: number | null // USD billions
  event?: string; eventColor?: string
}

const DATA: YearData[] = [
  { year: 2000, arrivals: 4.28, revenue: 2.04 },
  { year: 2001, arrivals: 4.38, revenue: 2.58, event: '9/11 — global travel dips', eventColor: C.cliff },
  { year: 2002, arrivals: 4.45, revenue: 2.65 },
  { year: 2003, arrivals: 4.76, revenue: 3.22, event: 'Casablanca bombings', eventColor: C.cliff },
  { year: 2004, arrivals: 5.48, revenue: 3.92, event: 'Vision 2010 tourism plan launched', eventColor: C.rise },
  { year: 2005, arrivals: 5.84, revenue: 4.61 },
  { year: 2006, arrivals: 6.56, revenue: 5.98 },
  { year: 2007, arrivals: 7.41, revenue: 7.18, event: '7M milestone', eventColor: C.rise },
  { year: 2008, arrivals: 7.88, revenue: 7.22, event: 'Global financial crisis', eventColor: C.cliff },
  { year: 2009, arrivals: 8.34, revenue: 6.63, event: 'Africa resists downturn', eventColor: C.rise },
  { year: 2010, arrivals: 9.29, revenue: 6.70, event: '9M — Vision 2010 nearly met', eventColor: C.rise },
  { year: 2011, arrivals: 9.34, revenue: 7.32, event: 'Marrakech bombing. Arab Spring.', eventColor: C.cliff },
  { year: 2012, arrivals: 9.38, revenue: 6.70 },
  { year: 2013, arrivals: 10.05, revenue: 6.85, event: '10M milestone', eventColor: C.gold },
  { year: 2014, arrivals: 10.28, revenue: 7.38 },
  { year: 2015, arrivals: 10.18, revenue: 6.26, event: 'First dip since 2001', eventColor: C.cliff },
  { year: 2016, arrivals: 10.33, revenue: 6.56 },
  { year: 2017, arrivals: 11.35, revenue: 7.49 },
  { year: 2018, arrivals: 12.29, revenue: 7.77, event: '12M — Marrakech boom', eventColor: C.rise },
  { year: 2019, arrivals: 12.93, revenue: 8.19, event: 'Pre-pandemic peak', eventColor: C.gold },
  { year: 2020, arrivals: 2.78, revenue: 3.85, event: 'COVID-19 cliff: −78%', eventColor: C.cliff },
  { year: 2021, arrivals: 3.72, revenue: 3.84, event: 'Borders reopen slowly', eventColor: C.cliff },
  { year: 2022, arrivals: 10.87, revenue: 9.08, event: 'World Cup bounce — Atlas Lions semifinal', eventColor: C.gold },
  { year: 2023, arrivals: 14.52, revenue: 10.35, event: '14.5M — post-COVID surge', eventColor: C.rise },
  { year: 2024, arrivals: 17.40, revenue: null, event: '17.4M record. #1 in Africa.', eventColor: C.gold },
  { year: 2025, arrivals: 20.00, revenue: null, event: 'AFCON host. ~20M projected.', eventColor: C.gold },
]

const maxArr = Math.max(...DATA.map(d => d.arrivals))
const maxRev = Math.max(...DATA.filter(d => d.revenue !== null).map(d => d.revenue as number))

// ═══ ANIMATED LINE CHART ═══
function RiseChart() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let frame = 0
        const total = DATA.length
        const interval = setInterval(() => {
          frame++
          setProgress(frame / total)
          if (frame >= total) clearInterval(interval)
        }, 140)
      }
    }, { threshold: 0.2 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const W = 800, H = 360
  const padL = 45, padR = 20, padT = 30, padB = 40
  const plotW = W - padL - padR, plotH = H - padT - padB

  const pts = DATA.map((d, i) => ({
    x: padL + (i / (DATA.length - 1)) * plotW,
    y: padT + plotH - (d.arrivals / (maxArr * 1.1)) * plotH,
    d,
  }))

  const visibleCount = Math.floor(progress * DATA.length)
  const pathD = pts.slice(0, visibleCount + 1)
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
    .join(' ')

  // Area fill
  const areaD = visibleCount > 0
    ? pathD + `L${pts[visibleCount].x},${padT + plotH}L${pts[0].x},${padT + plotH}Z`
    : ''

  const yTicks = [0, 5, 10, 15, 20]

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 420 }}
        onMouseLeave={() => setHovered(null)}>
        {/* Grid lines */}
        {yTicks.map(v => {
          const y = padT + plotH - (v / (maxArr * 1.1)) * plotH
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke={C.border} strokeWidth="0.5" />
              <text x={padL - 5} y={y + 3} textAnchor="end" className="font-mono" style={{ fontSize: 9, fill: C.muted }}>
                {v}M
              </text>
            </g>
          )
        })}

        {/* Year labels */}
        {DATA.filter((_, i) => i % 5 === 0 || i === DATA.length - 1).map((d, _, arr) => {
          const idx = DATA.indexOf(d)
          const x = padL + (idx / (DATA.length - 1)) * plotW
          return (
            <text key={d.year} x={x} y={H - 5} textAnchor="middle" className="font-mono"
              style={{ fontSize: 9, fill: C.muted }}>{d.year}</text>
          )
        })}

        {/* Area fill */}
        {areaD && <path d={areaD} fill={C.rise} opacity="0.06" />}

        {/* The Line */}
        <path d={pathD} fill="none" stroke={C.rise} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* COVID cliff highlight */}
        {visibleCount >= 20 && (
          <line x1={pts[20].x} y1={pts[19].y} x2={pts[20].x} y2={pts[20].y}
            stroke={C.cliff} strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
        )}

        {/* Data points & hover zones */}
        {pts.slice(0, visibleCount + 1).map((p, i) => {
          const isHov = hovered === i
          const hasEvent = !!p.d.event
          return (
            <g key={p.d.year}
              onMouseEnter={() => setHovered(i)}
              className="cursor-pointer">
              <rect x={p.x - 12} y={padT} width={24} height={plotH} fill="transparent" />
              <circle cx={p.x} cy={p.y} r={isHov ? 5 : hasEvent ? 3.5 : 2}
                fill={isHov ? (p.d.eventColor || C.rise) : 'white'}
                stroke={p.d.eventColor || C.rise} strokeWidth={isHov ? 2.5 : hasEvent ? 2 : 1.5} />
              {isHov && (
                <g>
                  <line x1={p.x} y1={p.y + 6} x2={p.x} y2={padT + plotH}
                    stroke={C.rise} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
                  <rect x={p.x - 52} y={p.y - 42} width={104} height={36} rx="3"
                    fill="white" stroke={C.border} strokeWidth="0.5" />
                  <text x={p.x} y={p.y - 28} textAnchor="middle" className="font-mono"
                    style={{ fontSize: 13, fill: p.d.eventColor || C.rise, fontWeight: 700 }}>
                    {p.d.arrivals.toFixed(1)}M
                  </text>
                  <text x={p.x} y={p.y - 14} textAnchor="middle" className="font-mono"
                    style={{ fontSize: 8, fill: C.muted }}>{p.d.year}</text>
                </g>
              )}
            </g>
          )
        })}

        {/* Event annotations (select few to avoid clutter) */}
        {pts.slice(0, visibleCount + 1)
          .filter(p => p.d.event && [2004, 2011, 2013, 2019, 2020, 2022, 2024, 2025].includes(p.d.year))
          .map(p => {
            const above = p.d.year === 2020 || p.d.year === 2011
            const ty = above ? p.y + 16 : p.y - 14
            return (
              <text key={p.d.year} x={p.x} y={ty} textAnchor="middle" className="font-mono"
                style={{ fontSize: 7, fill: p.d.eventColor || C.muted, fontWeight: 600 }}>
                {p.d.event!.length > 30 ? p.d.event!.slice(0, 28) + '…' : p.d.event}
              </text>
            )
          })}
      </svg>
    </div>
  )
}

// ═══ CONTENT ═══
export function TheLongRiseContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const revR = useReveal()
  const mileR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>
          Tourism · 2000–2025
        </p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.88] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Long Rise</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.3]" style={{ color: C.muted }}>
            One number. One line. Twenty-five years. Watch a country become a destination in real time.
          </p>
        </div>

        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          In the year 2000, Morocco welcomed 4.28 million overnight tourists. In 2025, that number
          crossed 20 million — the AFCON surge pushing past the 17.4 million record set just the
          year before. Between those two points: a country that survived 9/11, the Casablanca
          bombings, the global financial crisis, the Arab Spring, COVID-19, and turned each recovery
          into a higher floor. The 2022 FIFA World Cup — where the Atlas Lions reached the
          semifinal — didn&apos;t just generate headlines. It generated 10.87 million visitors, a 290%
          rebound from COVID. By 2024, Morocco was Africa&apos;s most-visited country, ahead of Egypt.
          The line below draws itself. Scroll down and watch.
        </p>

        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '4.28M', l: '2000 arrivals', c: C.muted },
            { v: '20M', l: '2025 projected', c: C.rise },
            { v: '×4.7', l: 'growth in 25 years', c: C.gold },
            { v: '−78%', l: '2020 COVID cliff', c: C.cliff },
          ].map((n, i) => (
            <div key={n.l} className="transition-all duration-700"
              style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono text-[28px] font-bold leading-none" style={{ color: n.c }}>{n.v}</p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE LINE */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.rise }}>
            Tourist Arrivals (Millions)
          </p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Overnight arrivals, 2000–2025. Hover for detail. The line draws itself as you scroll.
          </p>
          <RiseChart />
        </div>
      </section>

      {/* YEAR-BY-YEAR TABLE */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={revR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.sea }}>
            Year by Year
          </p>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 pb-1 mb-1" style={{ borderBottom: `1px solid ${C.border}` }}>
              <span className="font-mono text-[9px] w-10 shrink-0 font-bold" style={{ color: C.muted }}>Year</span>
              <span className="font-mono text-[9px] w-14 shrink-0 font-bold text-right" style={{ color: C.muted }}>Arrivals</span>
              <span className="font-mono text-[9px] w-16 shrink-0 font-bold text-right" style={{ color: C.muted }}>Revenue</span>
              <span className="font-mono text-[9px] flex-1 font-bold" style={{ color: C.muted }}>Bar</span>
              <span className="font-mono text-[9px] flex-1 font-bold" style={{ color: C.muted }}>Event</span>
            </div>
            {DATA.map((d, i) => {
              const pct = (d.arrivals / (maxArr * 1.05)) * 100
              const yoy = i > 0 ? ((d.arrivals - DATA[i - 1].arrivals) / DATA[i - 1].arrivals) * 100 : 0
              return (
                <div key={d.year} className="flex items-center gap-2 transition-all duration-500"
                  style={{ opacity: revR.vis ? 1 : 0, transitionDelay: `${i * 25}ms` }}>
                  <span className="font-mono text-[10px] w-10 shrink-0 font-bold" style={{ color: C.ink }}>{d.year}</span>
                  <span className="font-mono text-[10px] w-14 shrink-0 text-right" style={{ color: d.eventColor || C.text }}>
                    {d.arrivals.toFixed(1)}M
                  </span>
                  <span className="font-mono text-[9px] w-16 shrink-0 text-right" style={{ color: C.muted }}>
                    {d.revenue ? `$${d.revenue.toFixed(1)}B` : '—'}
                  </span>
                  <div className="flex-1 h-3 rounded-sm" style={{ background: `${C.border}15` }}>
                    <div className="h-full rounded-sm transition-all duration-700"
                      style={{
                        width: revR.vis ? `${pct}%` : '0%',
                        background: d.year === 2020 || d.year === 2021 ? `${C.cliff}20` : `${C.rise}15`,
                        borderRight: `2px solid ${d.year === 2020 || d.year === 2021 ? C.cliff : C.rise}`,
                        transitionDelay: `${i * 25}ms`,
                      }} />
                  </div>
                  <span className="font-mono text-[8px] flex-1 truncate" style={{ color: d.eventColor || C.muted }}>
                    {d.event || ''}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={mileR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Milestones</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { y: '2004', t: 'Vision 2010', d: 'King Mohammed VI launches a national tourism plan targeting 10M visitors by 2010. New airports, resorts, and direct flights. The plan falls just short — 9.29M in 2010 — but transforms the infrastructure.', c: C.rise },
              { y: '2013', t: '10 Million', d: 'Morocco crosses the 10M milestone for the first time. The 5M-to-10M journey took 9 years. Marrakech alone accounts for 2M+ visitors. Budget airlines (Ryanair, easyJet) have made Morocco a weekend destination from Europe.', c: C.gold },
              { y: '2019', t: 'Pre-Pandemic Peak', d: '12.93M arrivals. Revenue: $8.19B (6.4% of GDP). Morocco is the 2nd most-visited country in Africa behind Egypt. 28.7M overnights. The machine is running.', c: C.rise },
              { y: '2020', t: 'The Cliff', d: 'COVID-19 drops arrivals from 12.93M to 2.78M in a single year — a 78% collapse. Revenue halves. Borders close for months. The tourism workforce (2M jobs) is devastated. It is the worst year since records began.', c: C.cliff },
              { y: '2022', t: 'World Cup Bounce', d: 'The Atlas Lions reach the FIFA World Cup semifinal in Qatar — the first African or Arab team to do so. Global searches for "Morocco" spike 400%. Arrivals rebound to 10.87M. The "Moroccan moment" begins.', c: C.gold },
              { y: '2024–25', t: 'Africa\'s #1', d: '17.4M in 2024 — Africa\'s most-visited country, overtaking Egypt. ~20M projected for 2025 with AFCON (+600K visitors, €1.5B direct revenue). Target: 26M by 2030 World Cup. The line keeps rising.', c: C.rise },
            ].map((m, i) => (
              <div key={m.y} className="p-4 rounded-sm transition-all duration-500"
                style={{ background: `${m.c}05`, border: `1px solid ${C.border}`,
                  opacity: mileR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                <p className="font-mono text-[10px] font-bold" style={{ color: m.c }}>{m.y}</p>
                <p className="font-mono text-[13px] font-bold mt-0.5" style={{ color: C.ink }}>{m.t}</p>
                <p className="text-[11px] leading-[1.6] mt-2" style={{ color: C.text }}>{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.rise }}>The Higher Floor</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Every crisis produced a recovery that exceeded the previous peak. 9/11 dropped arrivals
                to 4.38M; by 2007 they had nearly doubled to 7.41M. The financial crisis barely
                registered — 2009 was actually higher than 2008. COVID collapsed the number to 2.78M;
                three years later it was 14.52M. The line doesn&apos;t just recover. It recovers higher.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.gold }}>The Football Effect</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The Atlas Lions&apos; World Cup run in December 2022 was the most effective tourism campaign
                in Moroccan history — and it cost the government nothing. Global awareness of Morocco
                spiked overnight. The 2022 rebound (10.87M from 3.72M) was driven partly by pent-up
                COVID demand, but the World Cup turned curiosity into bookings. AFCON 2025 extends
                the effect: 600,000 tournament-specific visitors, €1.5B in direct revenue.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.sea }}>The 2030 Question</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Morocco&apos;s target: 26 million tourists by 2030, when it co-hosts the FIFA World Cup
                with Spain and Portugal. That requires 30% growth from the 2025 base. Revenue target:
                MAD 120 billion (~$12B). The infrastructure is being built: new airports, high-speed
                rail to Marrakech, 9 stadiums. The line has room to keep rising. Whether the country
                can absorb 26 million visitors without losing what made it a destination is the
                question the line cannot answer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            4.28 million in 2000. 20 million in 2025. The line doesn&apos;t care about bombings
            or pandemics or financial crises — it absorbs them and keeps climbing. Each shock
            produces a higher floor. Each recovery overshoots the previous peak. This is not
            resilience. This is compound interest applied to a country&apos;s reputation. The
            question is no longer whether people will come. It is whether the place they
            come to will still be the place that made them want to come.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Arrivals 2000–2023: WorldData.info, sourced from UN World Tourism Organization (UNWTO)
            and World Bank. 2024 (17.4M): Morocco Ministry of Tourism via Morocco World News (Jan 2025),
            UN Tourism, Arab Weekly. 2025 (~20M): Ministry of Tourism (18M by Nov 2025, per Travel and
            Tour World, Dec 2025); AFCON projections from Brandiconimage.com citing Minister Mezzour.
            Revenue data (USD billions): WorldData.info / UNWTO. GDP contribution (~7%): Ministry of
            Tourism. Vision 2010 context: Wikipedia &ldquo;Tourism in Morocco.&rdquo; World Cup 2022
            effect: editorial analysis of timing and search data. AFCON 2025 economic impact (€1.5B
            direct, 600K visitors, €2.3B invested): Brandiconimage.com, Weetracker, Tassga.com, citing
            Minister Mezzour and Ministry of Tourism. 2030 target (26M): Ministry of Tourism, Sogecapital
            Gestion projections. 2025 arrival figure is a projection based on 18M through November plus
            AFCON December surge.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.rise }}>© Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
