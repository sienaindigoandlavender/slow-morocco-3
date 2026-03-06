'use client'

import { useState, useEffect, useRef } from 'react'

// ═══ THE ARGAN CONSTELLATION ═══
// 20 hours of manual labor. 40 kg of fruit. 1 litre of oil.
// $50 at the cooperative gate. $980 in a Moroccanoil vial in Paris.
// 2.5 million hectares of UNESCO biosphere. 600 hectares lost per year.
// 2.2 million people depend on it. 655 cooperatives. 86% run by women.

const C = {
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  argan: '#7B6D3A',    // golden kernel
  leaf: '#4A7C59',     // living forest
  bark: '#6B4226',     // tree bark
  heat: '#C44536',     // climate threat
  gold: '#C8A45C',     // oil colour
  woman: '#8B5E83',    // cooperative dignity
}

// ═══ SCROLL REVEAL ═══
function useReveal(threshold = 0.15) {
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

// ═══ EXTRACTION STEPS ═══
const STEPS = [
  { name: 'Gathering', hours: 2, description: 'Collect fallen fruit from the ground beneath the tree. Never picked from branches — only what the tree releases.', detail: '~40 kg of fruit needed per litre', icon: '◯' },
  { name: 'Drying', hours: 3, description: 'Sun-dry the fruit on rooftops or flat ground for 1–2 weeks to loosen the pulp from the nut inside.', detail: 'Reduces weight by ~30%', icon: '☼' },
  { name: 'Depulping', hours: 2, description: 'Remove the fleshy outer pulp by hand. The pulp becomes animal feed. The hard nut remains.', detail: 'Pulp → goat/cattle feed', icon: '◐' },
  { name: 'Cracking', hours: 6, description: 'Crack each nut between two stones to extract 1–3 tiny kernels. The hardest nut in Morocco. Skilled women crack 2–3 kg per hour.', detail: '~20 kg nuts → ~3 kg kernels', icon: '◈' },
  { name: 'Roasting', hours: 1.5, description: 'For culinary oil: roast kernels in a clay pan over low heat until golden. Cosmetic oil skips this step entirely.', detail: 'Culinary only. 15–20 min per batch', icon: '◉' },
  { name: 'Grinding', hours: 3, description: 'Grind roasted kernels in a stone quern (traditional mill) into a thick, brown paste called amlou.', detail: 'Rotary stone mill. ~30 min per kg', icon: '⊚' },
  { name: 'Kneading & Pressing', hours: 2.5, description: 'Knead the paste by hand, adding small amounts of water, until the oil separates. Press and collect.', detail: '1 litre oil per ~3 kg kernels', icon: '◎' },
]
const TOTAL_HOURS = STEPS.reduce((a, s) => a + s.hours, 0)

// ═══ PRICE CHAIN ═══
const PRICE_CHAIN = [
  { stage: 'Woman cracking nuts', price: 0.80, unit: '/hour', color: C.woman, note: 'Average wage at cooperative: MAD 8–10/hr (~$0.80–1.00)' },
  { stage: 'Cooperative gate (bulk)', price: 50, unit: '/litre', color: C.argan, note: 'Sold in bulk to intermediaries. €50/L in Morocco.' },
  { stage: 'Moroccan retail', price: 120, unit: '/litre', color: C.gold, note: 'Bottled, branded. Souk or pharmacy.' },
  { stage: 'European wholesale', price: 250, unit: '/litre', color: C.bark, note: 'Imported, certified organic. B2B price.' },
  { stage: 'L\'Oréal / premium brand', price: 600, unit: '/litre equiv.', color: C.heat, note: 'Blended into serums, 30ml bottles at $30+' },
  { stage: 'Moroccanoil (retail vial)', price: 980, unit: '/litre equiv.', color: C.heat, note: '€980/L equivalent. Small vials. Eurovision sponsor 2022–2024.' },
]

// ═══ FOREST DATA ═══
const FOREST_TIMELINE = [
  { year: 1960, hectares: 1600000, note: 'Peak coverage' },
  { year: 1970, hectares: 1400000 },
  { year: 1980, hectares: 1200000 },
  { year: 1990, hectares: 1050000 },
  { year: 1998, hectares: 950000, note: 'UNESCO Biosphere Reserve declared' },
  { year: 2005, hectares: 870000 },
  { year: 2010, hectares: 830000, note: 'GCF reforestation begins' },
  { year: 2015, hectares: 810000 },
  { year: 2020, hectares: 800000, note: 'COVID reveals cooperative vulnerability' },
  { year: 2025, hectares: 780000, note: '43,000 ha reforestation target' },
]

// ═══ ANIMATED RING (Circular Dendrogram Core) ═══
function ExtractionRing() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const size = 520
  const cx = size / 2
  const cy = size / 2

  return (
    <div ref={ref} className="flex flex-col lg:flex-row gap-8 items-start">
      {/* SVG Ring */}
      <div className="shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[520px]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

          {/* Outer climate halo — fading green */}
          {[220, 240].map((r, i) => (
            <circle key={`halo-${i}`} cx={cx} cy={cy} r={r}
              fill="none" stroke={C.leaf}
              strokeWidth={i === 0 ? 12 : 6}
              strokeOpacity={visible ? (i === 0 ? 0.08 : 0.04) : 0}
              strokeDasharray={i === 0 ? '4 8' : '2 12'}
              style={{ transition: `all 2s ease ${i * 300}ms` }} />
          ))}

          {/* Inner rings for each step */}
          {STEPS.map((step, i) => {
            const innerR = 60 + i * 22
            const fraction = step.hours / TOTAL_HOURS
            const circumference = 2 * Math.PI * innerR
            const dashLen = fraction * circumference
            const startAngle = STEPS.slice(0, i).reduce((a, s) => a + s.hours / TOTAL_HOURS, 0) * 360 - 90
            const isActive = activeStep === i

            return (
              <g key={step.name}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
                className="cursor-pointer">
                {/* Track */}
                <circle cx={cx} cy={cy} r={innerR}
                  fill="none" stroke={C.border} strokeWidth={isActive ? 16 : 12}
                  strokeOpacity={0.3}
                  style={{ transition: 'all 0.3s ease' }} />
                {/* Filled arc */}
                <circle cx={cx} cy={cy} r={innerR}
                  fill="none"
                  stroke={isActive ? C.argan : C.bark}
                  strokeWidth={isActive ? 16 : 12}
                  strokeOpacity={isActive ? 0.6 : 0.25}
                  strokeDasharray={`${visible ? dashLen : 0} ${circumference}`}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                  transform={`rotate(${startAngle} ${cx} ${cy})`}
                  style={{ transition: `stroke-dasharray 1.5s ease ${i * 150}ms, stroke-width 0.3s, stroke-opacity 0.3s` }} />
              </g>
            )
          })}

          {/* Center tree */}
          <circle cx={cx} cy={cy} r={30}
            fill={visible ? `${C.leaf}15` : 'transparent'}
            stroke={C.leaf} strokeWidth={1.5}
            style={{ transition: 'all 1s ease 0.5s' }} />
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize="7" fontWeight="700" fill={C.leaf}>
            ARGAN
          </text>
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize="5" fill={C.leaf}>TREE</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontSize="4" fill={C.muted}>1 litre</text>

          {/* Step labels around perimeter */}
          {STEPS.map((step, i) => {
            const midFraction = STEPS.slice(0, i).reduce((a, s) => a + s.hours / TOTAL_HOURS, 0) + (step.hours / TOTAL_HOURS / 2)
            const angle = midFraction * 360 - 90
            const rad = (angle * Math.PI) / 180
            const labelR = 60 + STEPS.length * 22 + 18
            const lx = cx + Math.cos(rad) * labelR
            const ly = cy + Math.sin(rad) * labelR
            const isActive = activeStep === i

            return (
              <g key={`label-${step.name}`}>
                <text x={lx} y={ly - 4} textAnchor="middle"
                  fontSize={isActive ? '7' : '5.5'}
                  fontWeight={isActive ? '700' : '500'}
                  fill={isActive ? C.argan : C.text}
                  style={{ transition: 'all 0.3s' }}>
                  {step.name}
                </text>
                <text x={lx} y={ly + 6} textAnchor="middle"
                  fontSize="4.5" fontWeight="700"
                  fill={isActive ? C.argan : C.muted}>
                  {step.hours}h
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Step detail panel */}
      <div className="flex-1 min-w-0">
        <p className="micro-label mb-3" style={{ color: C.bark }}>Extraction Steps</p>
        {STEPS.map((step, i) => {
          const isActive = activeStep === i
          return (
            <div key={step.name}
              className="border-b py-3 transition-all duration-300 cursor-default"
              style={{
                borderColor: isActive ? C.argan : C.border,
                background: isActive ? `${C.argan}04` : 'transparent',
                paddingLeft: isActive ? 12 : 0,
              }}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] font-semibold" style={{ color: isActive ? C.argan : C.ink }}>
                  {i + 1}. {step.name}
                </span>
                <span className="font-mono text-[11px] font-bold" style={{ color: C.argan }}>
                  {step.hours}h
                </span>
              </div>
              {isActive && (
                <div className="mt-1">
                  <p className="font-mono text-[10px] leading-[1.6]" style={{ color: C.text }}>{step.description}</p>
                  <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{step.detail}</p>
                </div>
              )}
            </div>
          )
        })}
        <div className="mt-4 py-3 border-t" style={{ borderColor: C.argan }}>
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[12px] font-bold" style={{ color: C.ink }}>Total manual labour</span>
            <span className="font-mono text-[20px] font-bold" style={{ color: C.argan }}>{TOTAL_HOURS}h</span>
          </div>
          <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>
            Per 1 litre. Traditional method. No machines. Estimates: 20–40 hours depending on source.
          </p>
        </div>
      </div>
    </div>
  )
}

// ═══ PRICE WATERFALL ═══
function PriceWaterfall() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const maxPrice = 1000
  return (
    <div ref={ref} className="space-y-3">
      {PRICE_CHAIN.map((p, i) => {
        const widthPct = (p.price / maxPrice) * 100
        return (
          <div key={p.stage} className="group">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-mono text-[11px]" style={{ color: C.text }}>{p.stage}</span>
              <span className="font-mono text-[13px] font-bold" style={{ color: p.color }}>
                ${p.price}{p.unit ? ` ${p.unit}` : ''}
              </span>
            </div>
            <div className="h-5 rounded-sm overflow-hidden" style={{ background: `${p.color}06` }}>
              <div className="h-full rounded-sm transition-all duration-1000 ease-out"
                style={{
                  width: visible ? `${widthPct}%` : '0%',
                  background: `${p.color}18`,
                  borderRight: `2px solid ${p.color}`,
                  transitionDelay: `${i * 150}ms`,
                }} />
            </div>
            <p className="font-mono text-[9px] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: C.muted }}>
              {p.note}
            </p>
          </div>
        )
      })}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: C.border }}>
        <p className="font-mono text-[11px]" style={{ color: C.heat }}>
          The woman who cracks the nuts earns $0.80/hour. The brand that bottles the oil
          sells it at $980/litre equivalent. That is a 1,225× markup from labour to luxury shelf.
        </p>
      </div>
    </div>
  )
}

// ═══ FOREST LOSS CHART ═══
function ForestLossChart() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const maxH = 1600000
  const svgW = 900
  const svgH = 260
  const padL = 50
  const padR = 20
  const padT = 20
  const padB = 40
  const chartW = svgW - padL - padR
  const chartH = svgH - padT - padB

  const points = FOREST_TIMELINE.map((d, i) => {
    const x = padL + (i / (FOREST_TIMELINE.length - 1)) * chartW
    const y = padT + (1 - d.hectares / maxH) * chartH
    return { x, y, ...d }
  })

  const areaPath = `M${points[0].x},${padT + chartH} ` +
    points.map(p => `L${p.x},${p.y}`).join(' ') +
    ` L${points[points.length - 1].x},${padT + chartH} Z`

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

        {/* Y gridlines */}
        {[400000, 800000, 1200000, 1600000].map(v => {
          const y = padT + (1 - v / maxH) * chartH
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={padL + chartW} y2={y} stroke={C.border} strokeWidth="0.5" />
              <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="5" fill={C.muted}>
                {(v / 1000000).toFixed(1)}M
              </text>
            </g>
          )
        })}

        {/* Area fill — fading green */}
        <path d={areaPath} fill={C.leaf} fillOpacity={visible ? 0.08 : 0}
          style={{ transition: 'fill-opacity 2s ease' }} />

        {/* Line */}
        <path d={linePath} fill="none" stroke={C.leaf} strokeWidth="2"
          strokeDasharray={visible ? '0' : '2000'}
          strokeDashoffset={visible ? '0' : '2000'}
          style={{ transition: 'stroke-dashoffset 2s ease 0.5s' }} />

        {/* Points and annotations */}
        {points.map((p, i) => (
          <g key={p.year}>
            <circle cx={p.x} cy={p.y} r={p.note ? 4 : 2.5}
              fill="white" stroke={p.note ? C.heat : C.leaf} strokeWidth={p.note ? 1.5 : 1}
              opacity={visible ? 1 : 0}
              style={{ transition: `opacity 0.5s ease ${i * 150}ms` }} />
            <text x={p.x} y={padT + chartH + 16} textAnchor="middle" fontSize="5" fill={C.ink}>
              {p.year}
            </text>
            {p.note && (
              <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="4" fill={C.heat}>
                {p.note}
              </text>
            )}
          </g>
        ))}

        {/* Loss annotation */}
        <text x={padL + chartW / 2} y={padT + chartH / 2} textAnchor="middle"
          fontSize="10" fontWeight="700" fill={C.heat} fillOpacity={visible ? 0.2 : 0}
          style={{ transition: 'fill-opacity 2s ease 1s' }}>
          −820,000 hectares
        </text>
      </svg>
    </div>
  )
}

// ═══ MAIN COMPONENT ═══
export default function ArganConstellationContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const coopR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 026 · Sustainability &amp; Labour</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.visible ? 1 : 0, transform: heroR.visible ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Argan Constellation</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)] transition-all duration-1000"
            style={{ color: C.muted, opacity: heroR.visible ? 1 : 0, transitionDelay: '200ms' }}>
            20 hours of labour. 40 kilograms of fruit. 1 litre of oil.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          <span>Argan</span> oil — Morocco&apos;s liquid gold — comes from the kernel of a
          tree that grows nowhere else on earth. UNESCO declared the Arganeraie
          a Biosphere Reserve in 1998. The traditional extraction method has not
          changed in centuries: women gather, dry, crack, grind, and knead by hand.
          It takes 20 hours and 40 kilograms of fruit to produce a single litre.
          That litre sells for $50 at the cooperative gate. By the time it reaches
          a luxury shelf in Paris, the price per litre equivalent exceeds $900.
          Meanwhile, the forest that produces it is shrinking by 600 hectares a year.
        </p>

        {/* Numbers */}
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { value: '20h', label: 'manual labour', sub: 'per litre, traditional method' },
            { value: '2.5M', label: 'hectares', sub: 'UNESCO Biosphere Reserve' },
            { value: '655', label: 'cooperatives', sub: '86% women-run (ODCO)' },
            { value: '2.2M', label: 'people', sub: 'depend on argan economy' },
          ].map((n, i) => (
            <div key={n.label} className="transition-all duration-700"
              style={{ opacity: numsR.visible ? 1 : 0, transform: numsR.visible ? 'translateY(0)' : 'translateY(16px)', transitionDelay: `${i * 150}ms` }}>
              <p className="font-mono text-[28px] font-bold leading-none" style={{ color: C.argan }}>{n.value}</p>
              <p className="font-mono text-[11px] font-semibold mt-1" style={{ color: C.ink }}>{n.label}</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 1: THE EXTRACTION RING ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.bark }}>The Extraction</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            7 steps from tree to bottle. Hover each ring to see the labour. Arc length = proportion of total hours.
          </p>
          <ExtractionRing />
        </div>
      </section>

      {/* ═══ SECTION 2: THE PRICE CHAIN ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
            <div>
              <p className="micro-label mb-1" style={{ color: C.heat }}>The Price Chain</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>
                From the woman&apos;s hands to the luxury shelf. Each bar = price at that stage.
              </p>
            </div>
            <span className="font-mono text-[28px] font-bold" style={{ color: C.heat }}>1,225×</span>
          </div>
          <PriceWaterfall />
        </div>
      </section>

      {/* ═══ SECTION 3: THE COOPERATIVE ECONOMY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.woman }}>The Cooperative Economy</p>
          <div ref={coopR.ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'The women', points: [
                '655 registered argan cooperatives (ODCO 2021)',
                '86% of argan oil production by cooperatives',
                'First women\'s cooperative founded 1998 by Prof. Zoubida Charrouf',
                'First Fairtrade certified: Tighanimine Cooperative, 2011',
                'Average wage: MAD 8–10/hr ($0.80–1.00)',
                'Cooperatives fund literacy classes, healthcare, childcare',
              ]},
              { title: 'The squeeze', points: [
                'Between 2008–2013, cooperative market share fell from majority to minority',
                'Intermediaries (hrayafis) earn €1,000–2,000/week — equal to a rights-holder\'s annual income',
                '16+ private pressing plants (est. 2006), mostly foreign-owned',
                'Mechanised oil costs $22/L; cooperative oil costs $50/L',
                'L\'Oréal, Moroccanoil dominate global distribution',
                'Women are increasingly reduced to raw kernel suppliers',
              ]},
            ].map((block, bi) => (
              <div key={block.title} className="border p-5 rounded-sm transition-all duration-700"
                style={{
                  borderColor: bi === 0 ? C.woman : C.heat,
                  opacity: coopR.visible ? 1 : 0,
                  transform: coopR.visible ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: `${bi * 200}ms`,
                }}>
                <p className="font-mono text-[11px] font-semibold mb-3"
                  style={{ color: bi === 0 ? C.woman : C.heat }}>
                  {block.title}
                </p>
                {block.points.map((pt, j) => (
                  <p key={j} className="font-mono text-[10px] leading-[1.7] py-0.5"
                    style={{ color: C.text }}>
                    — {pt}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: CLIMATE VULNERABILITY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
            <div>
              <p className="micro-label mb-1" style={{ color: C.heat }}>The Fading Halo</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>
                Arganeraie forest coverage, 1960–2025. Hectares of argan woodland. The green is shrinking.
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[20px] font-bold" style={{ color: C.heat }}>−51%</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>since 1960</p>
            </div>
          </div>
          <ForestLossChart />

          {/* Climate facts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { value: '600', label: 'hectares lost/year', note: 'Before reforestation. Overgrazing, charcoal, urbanisation.' },
              { value: '43,000', label: 'ha reforestation target', note: 'Green Climate Fund / ANDZOA. Arganiculture orchards.' },
              { value: '10 May', label: 'International Day of Argania', note: 'UN General Assembly 2021. Resolution 75/262. 113 co-sponsors.' },
            ].map((n) => (
              <div key={n.label}>
                <p className="font-mono text-[20px] font-bold" style={{ color: C.leaf }}>{n.value}</p>
                <p className="font-mono text-[10px] font-semibold" style={{ color: C.ink }}>{n.label}</p>
                <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE RAW NUMBERS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.argan }}>The Raw Numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
            {[
              { v: '40 kg', l: 'fruit per litre' },
              { v: '20 kg', l: 'nuts per litre' },
              { v: '3 kg', l: 'kernels per litre' },
              { v: '150 kg', l: 'fruit → 3 litres (UN)' },
              { v: '$369M', l: 'global market 2025' },
              { v: '$836M', l: 'projected 2032' },
              { v: '12.4%', l: 'CAGR 2025–2032' },
              { v: '1897', l: 'first mention by Lumière' },
              { v: '1998', l: 'UNESCO Biosphere Reserve' },
              { v: '2014', l: 'UNESCO Intangible Heritage' },
              { v: '2018', l: 'FAO GIAHS recognition' },
              { v: '2021', l: 'UN Day of Argania (May 10)' },
            ].map((n) => (
              <div key={n.l} className="py-2 border-b" style={{ borderColor: C.border }}>
                <p className="font-mono text-[14px] font-bold" style={{ color: C.argan }}>{n.v}</p>
                <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.l}</p>
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
              <p className="micro-label mb-2" style={{ color: C.bark }}>The 20-Hour Litre</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Sources vary between 10 and 40 hours per litre depending on method
                and inclusion of gathering/drying time. The most cited academic figure
                is 20 hours for fully traditional extraction. Semi-mechanised cooperatives
                (machine-pressed after hand-cracking) reduce this to 8–12 hours. Fully
                mechanised industrial plants: under 2 hours. The cracking step alone —
                stone on stone, kernel by kernel — accounts for roughly a third of all labour.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.heat }}>The 1,225× Question</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                A woman earns $0.80 per hour cracking argan nuts. Her 20 hours of
                labour produce one litre. That litre leaves the cooperative at $50.
                When it appears in a Moroccanoil vial, the per-litre equivalent is
                $980. This is not unusual in luxury cosmetics — but it is worth
                stating plainly. Between 2022 and 2024, Moroccanoil sponsored the
                Eurovision Song Contest. The cooperatives did not.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.leaf }}>The Fading Halo</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The argan forest has lost roughly half its coverage since 1960.
                The causes are overgrazing, charcoal production, urbanisation,
                and drought intensified by climate change. The Green Climate Fund
                is financing 10,000 hectares of new argan orchards. Morocco&apos;s
                target is 43,000 hectares. But the tree takes 50–60 years to reach
                full maturity. What was lost in a generation takes two to regrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-4">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            Forty kilograms of fruit. Twenty hours of hands on stone. Three
            kilograms of kernels ground to paste. One litre of gold. This
            is the arithmetic of the argan tree — an equation written by
            women who never learned to write, in a forest that is slowly
            disappearing beneath them. The oil is everywhere now: in serums,
            in salads, in Eurovision sponsorship deals. The women who make
            it earn less than a dollar an hour. The forest that grows it
            loses 600 hectares a year. Everything about argan oil is
            precious — except, apparently, the hands and the land that
            produce it.
          </p>
        </div>
      </section>

      {/* SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Labour hours: &ldquo;20 hours of expert labor&rdquo; per litre (GI case study,
            IPR Trends 2024); &ldquo;up to 20 hours by hand&rdquo; (Morocco Explore Tours);
            &ldquo;about 40 hours&rdquo; (Moroccan Elixir); &ldquo;around 10 hours&rdquo;
            (Epicurean &amp; Culture / 30 kg kernels method). 40 kg fruit → 1 litre
            (Wikipedia / argan oil). Price data: €50/L cooperative gate, €980/L
            Moroccanoil retail equivalent (Equal Times investigative report). $0.80/hr
            wage: MAD 8–10/hr (field reports). 655 cooperatives, 86% production share
            (ODCO 2021). Market: $369M (2025), $836M (2032) at 12.4% CAGR (Persistence
            Market Research). Forest: 2.5M ha UNESCO Biosphere Reserve (Green Climate
            Fund FP022); 600 ha/yr loss (WEF, UNESCO); 43,000 ha reforestation target
            (GCF/ANDZOA). UNESCO designations: Biosphere Reserve 1998, Intangible
            Heritage 2014, FAO GIAHS 2018, UN Day of Argania 2021. Cooperative
            history: Prof. Zoubida Charrouf (first cooperative 1998, Tighanimine FT 2011).
            Forest coverage estimates reconstructed from GCF, UNESCO, and academic sources;
            pre-1990 figures approximate.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
              &copy; {new Date().getFullYear()} Slow Morocco
            </p>
            <p className="font-mono text-[11px]" style={{ color: C.leaf }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
