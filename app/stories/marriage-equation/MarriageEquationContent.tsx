'use client'

import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════
// THE MARRIAGE EQUATION — Morocco's Evolving Union
// Module 050 · Slow Morocco
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  marriage: '#1565C0', divorce: '#C62828', age: '#6A1B9A', child: '#E65100',
  women: '#AD1457', men: '#1565C0', reform: '#2E7D32', neutral: '#5D4037',
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

// Marriage volume trend (estimated from HCP data + reporting)
const MARRIAGE_TREND = [
  { year: 2004, marriages: 273000, divorces: 26000 },
  { year: 2006, marriages: 278000, divorces: 29000 },
  { year: 2008, marriages: 290000, divorces: 33000 },
  { year: 2010, marriages: 305000, divorces: 38000 },
  { year: 2012, marriages: 310000, divorces: 42000 },
  { year: 2014, marriages: 302000, divorces: 44408 },
  { year: 2016, marriages: 295000, divorces: 52000 },
  { year: 2017, marriages: 288000, divorces: 55000 },
  { year: 2018, marriages: 280000, divorces: 58000 },
  { year: 2019, marriages: 272000, divorces: 62000 },
  { year: 2020, marriages: 220000, divorces: 48000 },
  { year: 2021, marriages: 258000, divorces: 65000 },
  { year: 2022, marriages: 252000, divorces: 67000 },
  { year: 2023, marriages: 250000, divorces: 67556 },
  { year: 2024, marriages: 249089, divorces: 65475 },
]

// Age at first marriage
const AGE_TREND = [
  { year: 1960, men: 24, women: 17 },
  { year: 1970, men: 25.5, women: 19.5 },
  { year: 1982, men: 27.2, women: 22.3 },
  { year: 1994, men: 29.8, women: 24.2 },
  { year: 2004, men: 31.0, women: 25.0 },
  { year: 2011, men: 31.3, women: 25.7 },
  { year: 2014, men: 31.4, women: 25.4 },
  { year: 2018, men: 31.9, women: 25.5 },
]

// Child marriage (% of women 20–24 married before 18)
const CHILD_MARRIAGE = [
  { year: 2004, pct: 15.9, under15: 2.5 },
  { year: 2011, pct: 13.0, under15: 1.5 },
  { year: 2018, pct: 9.5, under15: 0.5 },
  { year: 2024, pct: 8.4, under15: 0.2 },
]

// Divorce type evolution
const DIVORCE_TYPE = [
  { year: 2014, consensual: 63.1, judicial: 36.9 },
  { year: 2018, consensual: 75.0, judicial: 25.0 },
  { year: 2020, consensual: 82.0, judicial: 18.0 },
  { year: 2024, consensual: 89.3, judicial: 10.7 },
]

// Women remaining single at 50
const SINGLE_AT_50 = [
  { year: 2004, pct: 3.9 },
  { year: 2014, pct: 7.5 },
  { year: 2024, pct: 11.1 },
]

// Women-led households
const WOMEN_HOUSEHOLDS = [
  { year: 2004, pct: 14.0 },
  { year: 2014, pct: 16.2 },
  { year: 2024, pct: 19.2 },
]

// Women living alone
const WOMEN_ALONE = [
  { year: 2004, pct: 16.3 },
  { year: 2014, pct: 22.0 },
  { year: 2024, pct: 28.9 },
]

// Moudawana timeline
const REFORM_TIMELINE = [
  { year: 1957, event: 'First Moudawana codified. Reflects patriarchal norms. Women under guardianship of father or husband. Marriage age: 15 for women.', type: 'law' },
  { year: 1992, event: 'Union de l\'Action Féminine launches One Million Signatures campaign for Moudawana reform.', type: 'movement' },
  { year: 1993, event: 'Minor reforms. First time the Moudawana is officially acknowledged as changeable, not sacred text.', type: 'law' },
  { year: 2000, event: 'Competing marches in Casablanca and Rabat — feminists vs Islamists — on women\'s rights. Over 1 million march.', type: 'movement' },
  { year: 2003, event: 'Casablanca bombings. Backlash against fundamentalism. King forms royal commission to rewrite Moudawana.', type: 'movement' },
  { year: 2004, event: 'Revolutionary Moudawana reform. Marriage age raised to 18. Women gain self-guardianship, divorce rights, custody priority, polygamy restrictions. Hailed as most progressive family code in the Arab world.', type: 'law' },
  { year: 2011, event: 'New constitution strengthens women\'s rights. Response to Arab Spring.', type: 'law' },
  { year: 2018, event: 'Law criminalizing violence against women enacted.', type: 'law' },
  { year: 2022, event: 'King Mohammed VI calls for comprehensive Moudawana revision.', type: 'movement' },
  { year: 2024, event: 'Proposed reforms released: abolish child marriage loophole, shared custody, recognize domestic work as economic contribution, restrict polygamy further.', type: 'law' },
]

// Divorce to marriage ratio
const DIVORCE_RATIO = [
  { year: 2017, ratio: 45.0 },
  { year: 2018, ratio: 48.8 },
  { year: 2019, ratio: 50.3 },
  { year: 2020, ratio: 55.2 },
  { year: 2021, ratio: 51.2 },
]

// ═══════════════════════════════════════════════════
// LINE CHART — Marriage & Divorce Trends
// ═══════════════════════════════════════════════════

function TrendChart() {
  const r = useReveal()
  const svgW = 760, svgH = 300
  const pad = { t: 20, r: 20, b: 40, l: 55 }
  const w = svgW - pad.l - pad.r, h = svgH - pad.t - pad.b

  const xMin = 2004, xMax = 2024
  const yMax = 320000

  const x = (year: number) => pad.l + ((year - xMin) / (xMax - xMin)) * w
  const y = (val: number) => pad.t + h - (val / yMax) * h

  const marriagePath = MARRIAGE_TREND.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(d.year)},${y(d.marriages)}`).join(' ')
  const divorcePath = MARRIAGE_TREND.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(d.year)},${y(d.divorces)}`).join(' ')

  return (
    <div ref={r.ref} className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[760px] mx-auto transition-opacity duration-1000" style={{ opacity: r.vis ? 1 : 0 }}>
        {/* Grid */}
        {[0, 80000, 160000, 240000, 320000].map(v => (
          <g key={v}>
            <line x1={pad.l} y1={y(v)} x2={svgW - pad.r} y2={y(v)} stroke={C.border} strokeWidth="0.5" />
            <text x={pad.l - 8} y={y(v) + 3} textAnchor="end" fill={C.muted} fontSize="8" fontFamily="monospace">{(v / 1000)}K</text>
          </g>
        ))}

        {/* 2004 Moudawana marker */}
        <line x1={x(2004)} y1={pad.t} x2={x(2004)} y2={pad.t + h} stroke={C.reform} strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
        <text x={x(2004) + 4} y={pad.t + 12} fill={C.reform} fontSize="7" fontFamily="monospace">2004 MOUDAWANA</text>

        {/* COVID marker */}
        <line x1={x(2020)} y1={pad.t} x2={x(2020)} y2={pad.t + h} stroke={C.muted} strokeWidth="0.7" strokeDasharray="3,3" opacity="0.3" />
        <text x={x(2020) + 4} y={pad.t + 12} fill={C.muted} fontSize="7" fontFamily="monospace">COVID</text>

        {/* Lines */}
        <path d={marriagePath} fill="none" stroke={C.marriage} strokeWidth="2" />
        <path d={divorcePath} fill="none" stroke={C.divorce} strokeWidth="2" />

        {/* Dots */}
        {MARRIAGE_TREND.map(d => (
          <g key={`m${d.year}`}>
            <circle cx={x(d.year)} cy={y(d.marriages)} r="2.5" fill={C.marriage} />
            <circle cx={x(d.year)} cy={y(d.divorces)} r="2.5" fill={C.divorce} />
          </g>
        ))}

        {/* End labels */}
        <text x={x(2024) + 6} y={y(249089) + 3} fill={C.marriage} fontSize="8" fontFamily="monospace">249K marriages</text>
        <text x={x(2024) + 6} y={y(65475) + 3} fill={C.divorce} fontSize="8" fontFamily="monospace">65K divorces</text>

        {/* X axis years */}
        {[2004, 2008, 2012, 2016, 2020, 2024].map(yr => (
          <text key={yr} x={x(yr)} y={svgH - 10} textAnchor="middle" fill={C.muted} fontSize="8" fontFamily="monospace">{yr}</text>
        ))}

        {/* Legend */}
        <circle cx={pad.l + 10} cy={svgH - 12} r="4" fill={C.marriage} />
        <text x={pad.l + 18} y={svgH - 9} fill={C.marriage} fontSize="8" fontFamily="monospace">Marriages</text>
        <circle cx={pad.l + 100} cy={svgH - 12} r="4" fill={C.divorce} />
        <text x={pad.l + 108} y={svgH - 9} fill={C.divorce} fontSize="8" fontFamily="monospace">Divorces</text>
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// AGE AT FIRST MARRIAGE
// ═══════════════════════════════════════════════════

function AgeChart() {
  const r = useReveal()
  const svgW = 760, svgH = 240
  const pad = { t: 20, r: 30, b: 40, l: 55 }
  const w = svgW - pad.l - pad.r, h = svgH - pad.t - pad.b

  const xMin = 1960, xMax = 2018
  const yMin = 14, yMax = 34

  const x = (year: number) => pad.l + ((year - xMin) / (xMax - xMin)) * w
  const y = (val: number) => pad.t + h - ((val - yMin) / (yMax - yMin)) * h

  const menPath = AGE_TREND.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(d.year)},${y(d.men)}`).join(' ')
  const womenPath = AGE_TREND.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(d.year)},${y(d.women)}`).join(' ')

  return (
    <div ref={r.ref} className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[760px] mx-auto transition-opacity duration-1000" style={{ opacity: r.vis ? 1 : 0 }}>
        {[16, 20, 24, 28, 32].map(v => (
          <g key={v}>
            <line x1={pad.l} y1={y(v)} x2={svgW - pad.r} y2={y(v)} stroke={C.border} strokeWidth="0.5" />
            <text x={pad.l - 8} y={y(v) + 3} textAnchor="end" fill={C.muted} fontSize="8" fontFamily="monospace">{v}</text>
          </g>
        ))}

        {/* Legal age 18 line */}
        <line x1={pad.l} y1={y(18)} x2={svgW - pad.r} y2={y(18)} stroke={C.reform} strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
        <text x={svgW - pad.r + 4} y={y(18) + 3} fill={C.reform} fontSize="7" fontFamily="monospace">18 (legal min)</text>

        <path d={menPath} fill="none" stroke={C.men} strokeWidth="2" />
        <path d={womenPath} fill="none" stroke={C.women} strokeWidth="2" />

        {AGE_TREND.map(d => (
          <g key={d.year}>
            <circle cx={x(d.year)} cy={y(d.men)} r="3" fill={C.men} />
            <circle cx={x(d.year)} cy={y(d.women)} r="3" fill={C.women} />
          </g>
        ))}

        {/* 1960 labels */}
        <text x={x(1960) - 8} y={y(24) + 3} textAnchor="end" fill={C.men} fontSize="8" fontFamily="monospace">24 ♂</text>
        <text x={x(1960) - 8} y={y(17) + 3} textAnchor="end" fill={C.women} fontSize="8" fontFamily="monospace">17 ♀</text>

        {/* 2018 labels */}
        <text x={x(2018) + 6} y={y(31.9) + 3} fill={C.men} fontSize="8" fontFamily="monospace">31.9 ♂</text>
        <text x={x(2018) + 6} y={y(25.5) + 3} fill={C.women} fontSize="8" fontFamily="monospace">25.5 ♀</text>

        {[1960, 1970, 1982, 1994, 2004, 2018].map(yr => (
          <text key={yr} x={x(yr)} y={svgH - 10} textAnchor="middle" fill={C.muted} fontSize="8" fontFamily="monospace">{yr}</text>
        ))}
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// SMALL METRIC BARS
// ═══════════════════════════════════════════════════

function MetricBars({ data, label, color, suffix = '%' }: { data: { year: number; pct: number }[]; label: string; color: string; suffix?: string }) {
  const r = useReveal()
  const max = Math.max(...data.map(d => d.pct))
  return (
    <div ref={r.ref}>
      <p className="font-mono text-[10px] mb-2" style={{ color }}>{label}</p>
      <div className="space-y-1.5">
        {data.map((d, i) => (
          <div key={d.year} className="flex items-center gap-2 transition-all duration-500" style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
            <span className="text-[11px] font-mono w-[40px] text-right" style={{ color: C.muted }}>{d.year}</span>
            <div className="flex-1 h-5 relative" style={{ background: '#f5f5f5' }}>
              <div className="h-full transition-all duration-700 flex items-center px-2"
                style={{ width: r.vis ? `${(d.pct / max) * 100}%` : '0%', background: color, transitionDelay: `${i * 80}ms` }}>
                <span className="text-white font-mono text-[10px] whitespace-nowrap">{d.pct}{suffix}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// DIVORCE RATIO
// ═══════════════════════════════════════════════════

function DivorceRatio() {
  const r = useReveal()
  return (
    <div ref={r.ref}>
      <p className="font-mono text-[10px] mb-3" style={{ color: C.divorce }}>DIVORCE CASES PER 100 MARRIAGE REQUESTS</p>
      <div className="flex items-end gap-2" style={{ height: 100 }}>
        {DIVORCE_RATIO.map((d, i) => (
          <div key={d.year} className="flex-1 flex flex-col items-center transition-all duration-500"
            style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
            <span className="text-[10px] font-mono mb-1" style={{ color: d.ratio >= 50 ? C.divorce : C.text }}>{d.ratio}</span>
            <div className="w-full transition-all duration-700"
              style={{ height: r.vis ? `${(d.ratio / 60) * 70}px` : '0px', background: d.ratio >= 50 ? C.divorce : '#E57373', transitionDelay: `${i * 60}ms` }} />
            <span className="text-[8px] font-mono mt-1" style={{ color: C.muted }}>{d.year}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] mt-2" style={{ color: C.muted }}>Source: CSPJ (Superior Council of the Judiciary). 50+ means more than half of all marriages face a divorce filing.</p>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// CONSENSUAL DIVORCE EVOLUTION
// ═══════════════════════════════════════════════════

function ConsensusBars() {
  const r = useReveal()
  return (
    <div ref={r.ref}>
      <p className="font-mono text-[10px] mb-3" style={{ color: C.neutral }}>CONSENSUAL VS JUDICIAL DIVORCE (%)</p>
      <div className="space-y-2">
        {DIVORCE_TYPE.map((d, i) => (
          <div key={d.year} className="flex items-center gap-2 transition-all duration-500" style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
            <span className="text-[11px] font-mono w-[40px] text-right" style={{ color: C.muted }}>{d.year}</span>
            <div className="flex-1 h-5 flex overflow-hidden">
              <div className="h-full flex items-center justify-center transition-all duration-700"
                style={{ width: `${d.consensual}%`, background: C.reform }}>
                <span className="text-white font-mono text-[9px]">{d.consensual}%</span>
              </div>
              <div className="h-full flex items-center justify-center"
                style={{ width: `${d.judicial}%`, background: C.muted }}>
                {d.judicial > 15 && <span className="text-white font-mono text-[9px]">{d.judicial}%</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2 text-[9px] font-mono" style={{ color: C.muted }}>
        <span><span className="inline-block w-2 h-2 mr-1" style={{ background: C.reform }} />Consensual</span>
        <span><span className="inline-block w-2 h-2 mr-1" style={{ background: C.muted }} />Judicial</span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

export function MarriageEquationContent() {
  const heroR = useReveal()
  const numsR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-10">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 050 · Demographic Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Marriage<br />Equation</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-6" style={{ color: C.muted }}>
            Fewer marriages. Later marriages. More divorces. A country renegotiating its oldest contract.
          </p>
          <p className="text-[15px] leading-[1.8] max-w-[600px]" style={{ color: C.text }}>
            In 1960, the average Moroccan woman married at 17. By 2018, she married at 25.5 —
            if she married at all. Marriages have dropped 25% in a decade. Divorces have surged 50%.
            For every 100 marriage applications, 50 divorce cases are now filed. The 2004 Moudawana
            reform gave women self-guardianship, divorce rights, and custody priority for the first
            time. Child marriages have fallen from 16% to 8%. One in five households is now led by a
            woman. The institution hasn't collapsed. It's being renegotiated.
          </p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-10">
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: '249K', l: 'Marriages registered (2024)', c: C.marriage },
            { n: '65K', l: 'Divorces registered (2024)', c: C.divorce },
            { n: '25.5', l: 'Average age, women first marriage', c: C.women },
            { n: '31.9', l: 'Average age, men first marriage', c: C.men },
            { n: '50:100', l: 'Divorce filings per 100 marriages', c: C.divorce },
            { n: '89%', l: 'Divorces by mutual consent (2024)', c: C.reform },
            { n: '8.4%', l: 'Child marriage rate (2024, was 16%)', c: C.child },
            { n: '19.2%', l: 'Households led by women (2024)', c: C.women },
          ].map((k, i) => (
            <div key={k.l} className="border-t pt-3 transition-all duration-700"
              style={{ borderColor: k.c, opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
              <p className="font-serif text-[clamp(1.3rem,3vw,1.8rem)] leading-none" style={{ color: k.c }}>{k.n}</p>
              <p className="text-[10px] mt-1 font-mono" style={{ color: C.muted }}>{k.l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ I. THE DIVERGENCE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Divergence</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          Marriages peaked around 2010–2012 and have been declining since. Divorces have risen
          steadily. The lines are converging. COVID-19 cratered marriages in 2020 but barely dented
          divorces — couples delayed weddings, not separations.
        </p>
        <TrendChart />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ II. AGE AT FIRST MARRIAGE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Delay</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          In 1960, women married at 17. Men at 24. By 2018, the gap had narrowed to 6.4 years
          (women 25.5, men 31.9). The shift happened in both urban and rural areas simultaneously.
          Education is the single biggest driver — women who complete secondary school marry 4–6 years later.
        </p>
        <AgeChart />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ III. THE RATIO + CHILD MARRIAGE + CONSENSUS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Numbers Behind the Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
          <DivorceRatio />
          <MetricBars data={CHILD_MARRIAGE} label="CHILD MARRIAGE (% WOMEN 20–24 MARRIED BEFORE 18)" color={C.child} />
          <ConsensusBars />
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ IV. STRUCTURAL SHIFT ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section IV</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Structural Shift</h2>
        <p className="text-[13px] mb-8 max-w-[500px]" style={{ color: C.muted }}>
          Women staying single longer. Women living alone. Women leading households.
          Three indicators of the same transformation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <MetricBars data={SINGLE_AT_50} label="WOMEN UNMARRIED AT 50" color={C.women} />
          <MetricBars data={WOMEN_ALONE} label="WOMEN LIVING ALONE" color={'#8E24AA'} />
          <MetricBars data={WOMEN_HOUSEHOLDS} label="HOUSEHOLDS LED BY WOMEN" color={C.women} />
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ V. THE MOUDAWANA ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section V</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Moudawana</h2>
        <p className="text-[13px] mb-8 max-w-[500px]" style={{ color: C.muted }}>
          Morocco's family code — the legal framework governing marriage, divorce, custody, and inheritance.
          Reformed three times. Each time more progressive. Each time contested.
        </p>
        <div className="space-y-4">
          {REFORM_TIMELINE.map((t, i) => {
            const rv = useReveal()
            return (
              <div key={i} ref={rv.ref} className="flex gap-4 items-start transition-all duration-500"
                style={{ opacity: rv.vis ? 1 : 0, transform: rv.vis ? 'translateX(0)' : 'translateX(-10px)' }}>
                <div className="flex flex-col items-center shrink-0" style={{ width: 60 }}>
                  <span className="font-mono text-[12px] font-bold" style={{ color: t.type === 'law' ? C.reform : C.child }}>{t.year}</span>
                  <div className="w-2 h-2 rounded-full mt-1" style={{ background: t.type === 'law' ? C.reform : C.child }} />
                </div>
                <div className="border-l pl-4 pb-2" style={{ borderColor: C.border }}>
                  <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{t.event}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-[18px] mb-2">The Gate That Opened</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Critics warned the 2004 Moudawana would cause divorce rates to skyrocket.
              They did. But as one researcher noted: many women were suffering, and the reform
              was like a gate that finally opened. The rise in divorce isn't a sign of social
              breakdown — it's a sign that exit became possible.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Child Marriage Loophole</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              The 2004 law set marriage age at 18 but allowed judges to grant exceptions.
              In 2019, 32,000 exemption requests were filed and 81% approved. By 2024,
              requests dropped to under 9,000 — culture shifting faster than law.
              The proposed 2024 reform aims to close the loophole entirely.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The 50% Statistic</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              For every 100 marriage requests, 50 divorce cases are filed.
              This doesn't mean 50% of marriages end in divorce — it means the annual flow
              of divorce filings is half the annual flow of new marriages. Many divorces
              are from marriages contracted years earlier. But the ratio is the signal:
              the institution is being renegotiated in real time.
            </p>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <p>Marriage & divorce data: HCP (Haut-Commissariat au Plan), "Les Femmes Marocaines en Chiffres" (2023, 2024). Statista (Number of Marriages in Morocco 2018–2022; Number of Divorces 2004–2021). 2024 marriage figure (249,089): Justice Minister Abdellatif Ouahbi, December 2024 parliamentary session (Barlaman Today). Age at first marriage: HCP/Statista (Average age at first marriage 2004–2018); Morocco World News (2019). Child marriage: HCP (2024), Barlaman Today (Oct 2025); Morocco World News (Dec 2025); Wilson Center; Girls Not Brides. Divorce ratio (50:100): CSPJ via Morocco World News (June 2023). Consensual divorce: HCP via Hespress (Oct 2025). Women-led households: HCP via Barlaman Today (Oct 2025). Moudawana: Carnegie Endowment (2025), Centre for Public Impact, TIMEP, EuroMed Rights, Fund for Global Human Rights, NYU, National Council on U.S.-Arab Relations, Spheres of Influence. Marriage trend estimates (pre-2018): editorial interpolation based on HCP reporting and Statista anchors. Individual year figures before 2018 are approximations from trend reporting, not precise counts.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: 'rgba(255,255,255,0.7)' }}>
          © Slow Morocco · slowmorocco.com · Pre-2018 marriage volume data is estimated from trend reporting. This visualization may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
