'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const C = {
  tea: '#5D7A3C', mint: '#2D8E6C', sugar: '#C8A415', amber: '#C4956A',
  steam: '#B8CCC4', tannin: '#8B6914', caffeine: '#4A6741', glass1: '#D4C5A0',
  glass2: '#C4956A', glass3: '#8B6E4E',
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
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

// ═══ CEREMONY STEPS ═══
const STEPS = [
  { name: 'The Rinse', arabic: 'الغسيل', duration: '30s', temp: 100, desc: 'Boiling water poured over gunpowder tea leaves. Swirl. Discard. This removes dust and first bitterness. The liquid is golden-brown — too bitter to drink.', ingredient: 'Gunpowder green tea', amount: '1–2 tbsp' },
  { name: 'The Charge', arabic: 'التعمير', duration: '10s', temp: 96, desc: 'Fresh mint — a full fist — pressed into the pot. Sugar cones broken and dropped in. The ratio is the signature. Every household has its own.', ingredient: 'Fresh spearmint + sugar', amount: '1 large bunch + 3–5 tbsp' },
  { name: 'The Steep', arabic: 'التخمير', duration: '3–4 min', temp: 92, desc: 'Boiling water fills the pot. The leaves unfurl. The mint releases menthol. The sugar dissolves. Time is everything — too short and the flavour is thin, too long and bitterness takes over.', ingredient: 'Boiling water', amount: '~750 ml' },
  { name: 'The Test', arabic: 'التذوق', duration: '15s', temp: 88, desc: 'A small pour into a glass. The host tastes. Too bitter? More sugar. Too sweet? Another minute. The glass is returned to the pot. This is the calibration.', ingredient: '—', amount: '—' },
  { name: 'The Pour', arabic: 'الصبّ', duration: '20s', temp: 82, desc: 'From 30+ cm above the glass. The stream falls, aerates, cools. A crown of foam forms — the "turban." The higher the pour, the greater the honour. No foam means failure.', ingredient: '—', amount: '~80 ml per glass' },
  { name: 'The Three Glasses', arabic: 'ثلاثة كيسان', duration: '20–30 min', temp: '82 → 72 → 65', desc: 'Same leaves, same pot, three infusions. Each glass is different. The first is gentle — mostly sugar and mint. The second is stronger — the tannins emerge. The third is bitter — the tea finally speaks.', ingredient: 'Patience', amount: '3 × 80 ml' },
]

// ═══ THREE GLASSES DATA ═══
const GLASSES = [
  { name: 'First Glass', arabic: 'الكأس الأول', proverb: 'As gentle as life', temp: 82, mintPct: 40, sugarPct: 35, tanninPct: 15, caffeinePct: 10, color: C.glass1, desc: 'Mint and sugar dominate. Tea is background warmth. Sweet, bright, welcoming. The host is still being generous.' },
  { name: 'Second Glass', arabic: 'الكأس الثاني', proverb: 'As strong as love', temp: 74, mintPct: 30, sugarPct: 25, tanninPct: 28, caffeinePct: 17, color: C.glass2, desc: 'Tannins rise. Sugar recedes. The tea asserts itself. Deeper amber colour. The conversation has started.' },
  { name: 'Third Glass', arabic: 'الكأس الثالث', proverb: 'As bitter as death', temp: 65, mintPct: 18, sugarPct: 15, tanninPct: 40, caffeinePct: 27, color: C.glass3, desc: 'Bitterness arrives. The mint is exhausted. Tannins dominate. Caffeine peaks. The leaves have given everything. The visit is ending.' },
]

// ═══ REGIONAL VARIATION — MINT-TO-SUGAR RATIO ═══
const REGIONS = [
  { city: 'Tetouan', region: 'Rif Coast', lat: 35.6, sugar: 5.5, mint: 1.0, herbs: 'Mint only', note: 'Sweetest in Morocco. Spanish influence. Almost syrup-like. Social signalling — generosity measured in sugar.' },
  { city: 'Tangier', region: 'Strait', lat: 35.8, sugar: 5.0, mint: 1.2, herbs: 'Mint, orange blossom', note: 'Sweet but slightly less than Tetouan. Port city. European visitors moderated sugar over time.' },
  { city: 'Fes', region: 'Interior', lat: 34.0, sugar: 4.0, mint: 1.5, herbs: 'Mint, absinthe (chiba)', note: 'Fassi tea adds wormwood (chiba) — a bitter herb. Balances the sweet. Distinctive regional marker.' },
  { city: 'Meknes', region: 'Plains', lat: 33.9, sugar: 4.0, mint: 1.5, herbs: 'Mint, verbena', note: 'Similar to Fes. Agricultural hinterland. Verbena (louisa) added in winter.' },
  { city: 'Rabat', region: 'Capital', lat: 34.0, sugar: 3.5, mint: 1.5, herbs: 'Mint, sometimes sage', note: 'Moderate sweetness. Administrative city. More restrained than north.' },
  { city: 'Casablanca', region: 'Economic', lat: 33.6, sugar: 3.0, mint: 1.5, herbs: 'Mint', note: 'Business city. Less sweet, quicker preparation. Efficiency over ceremony.' },
  { city: 'Marrakech', region: 'South', lat: 31.6, sugar: 3.5, mint: 2.0, herbs: 'Mint, sometimes basil', note: 'More mint, less sugar. Heat demands refreshment over sweetness. Tourism has moderated sugar.' },
  { city: 'Essaouira', region: 'Coast', lat: 31.5, sugar: 2.5, mint: 2.0, herbs: 'Mint, wild thyme', note: 'Coastal influence. Less sweet. Fresh herbs from nearby hills.' },
  { city: 'Ouarzazate', region: 'Pre-Sahara', lat: 30.9, sugar: 4.5, mint: 1.0, herbs: 'Mint, desert sage', note: 'Back to very sweet — desert tradition. Sugar as energy. Saharan influence.' },
  { city: 'Agadir', region: 'Souss', lat: 30.4, sugar: 2.5, mint: 2.5, herbs: 'Mint, sage, wild herbs', note: 'Herb-heavy. Tashelhit Berber tradition. Multiple wild herbs. Less about sugar, more about the land.' },
  { city: 'Sahara', region: 'Desert', lat: 29.0, sugar: 6.0, mint: 0.5, herbs: 'Minimal mint, sometimes sagebrush', note: 'Sweetest of all. Tuareg tradition. Sugar as sustenance. Tea boiled over charcoal. Three strict pours.' },
]

// ═══ POUR VISUALIZATION ═══
function PourAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pourHeight, setPourHeight] = useState(30)
  const animRef = useRef(0)

  const draw = useCallback((height: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width, H = canvas.height

    ctx.clearRect(0, 0, W, H)

    // Teapot spout (top)
    const spoutX = W * 0.5
    const spoutY = H * 0.08
    ctx.fillStyle = '#888'
    ctx.beginPath()
    ctx.ellipse(spoutX, spoutY, 12, 6, 0, 0, Math.PI * 2)
    ctx.fill()

    // Glass (bottom)
    const glassX = W * 0.5
    const glassBottom = H * 0.82
    const glassTop = glassBottom - 60
    const glassW = 28

    // Glass outline
    ctx.strokeStyle = '#C4956A60'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(glassX - glassW, glassTop)
    ctx.lineTo(glassX - glassW + 4, glassBottom)
    ctx.lineTo(glassX + glassW - 4, glassBottom)
    ctx.lineTo(glassX + glassW, glassTop)
    ctx.stroke()

    // Tea liquid in glass
    const fillH = 40
    const fillGrad = ctx.createLinearGradient(0, glassBottom - fillH, 0, glassBottom)
    fillGrad.addColorStop(0, '#C4956A40')
    fillGrad.addColorStop(1, '#C4956A20')
    ctx.fillStyle = fillGrad
    ctx.beginPath()
    ctx.moveTo(glassX - glassW + 6, glassBottom - fillH)
    ctx.lineTo(glassX - glassW + 4, glassBottom)
    ctx.lineTo(glassX + glassW - 4, glassBottom)
    ctx.lineTo(glassX + glassW - 6, glassBottom - fillH)
    ctx.fill()

    // Pour stream
    const streamStart = spoutY + 8
    const streamEnd = glassTop
    const streamLen = streamEnd - streamStart
    const t = Date.now() / 600

    ctx.strokeStyle = '#C4956A'
    ctx.lineWidth = 2
    ctx.globalAlpha = 0.6
    ctx.beginPath()
    ctx.moveTo(spoutX, streamStart)
    for (let y = streamStart; y <= streamEnd; y += 2) {
      const progress = (y - streamStart) / streamLen
      const wobble = Math.sin(progress * 8 + t) * (1.5 + progress * 2)
      ctx.lineTo(spoutX + wobble, y)
    }
    ctx.stroke()
    ctx.globalAlpha = 1

    // Foam / turban at top of glass
    const foamIntensity = Math.min(height / 50, 1)
    if (foamIntensity > 0.2) {
      ctx.fillStyle = `rgba(232, 220, 200, ${foamIntensity * 0.5})`
      ctx.beginPath()
      ctx.ellipse(glassX, glassBottom - fillH, glassW - 8, 4 + foamIntensity * 4, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    // Steam wisps
    for (let i = 0; i < 5; i++) {
      const sx = glassX + Math.sin(t + i * 1.3) * 15
      const sy = glassTop - 10 - i * 12 + Math.sin(t * 0.7 + i) * 4
      ctx.globalAlpha = 0.08 + (1 - i / 5) * 0.1
      ctx.fillStyle = C.steam
      ctx.beginPath()
      ctx.ellipse(sx, sy, 6 + i * 2, 3 + i, Math.sin(t + i) * 0.2, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    // Height indicator
    ctx.fillStyle = C.muted
    ctx.font = '10px "IBM Plex Mono", monospace'
    ctx.textAlign = 'right'
    ctx.fillText(`${height} cm`, W * 0.35, (streamStart + streamEnd) / 2)

    // Arrow
    ctx.strokeStyle = `${C.muted}40`
    ctx.lineWidth = 0.5
    ctx.setLineDash([3, 3])
    ctx.beginPath()
    ctx.moveTo(W * 0.38, streamStart + 10)
    ctx.lineTo(W * 0.38, streamEnd - 10)
    ctx.stroke()
    ctx.setLineDash([])
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(2, 2)
    }
    let running = true
    const tick = () => { if (running) { draw(pourHeight); animRef.current = requestAnimationFrame(tick) } }
    tick()
    return () => { running = false; cancelAnimationFrame(animRef.current) }
  }, [pourHeight, draw])

  return (
    <div>
      <div className="border rounded-sm overflow-hidden" style={{ borderColor: C.border }}>
        <canvas ref={canvasRef} className="w-full" style={{ height: 280 }} />
      </div>
      <div className="flex items-center gap-3 mt-3">
        <span className="font-mono text-[10px]" style={{ color: C.muted }}>10 cm</span>
        <input type="range" min={10} max={50} value={pourHeight} onChange={e => setPourHeight(Number(e.target.value))}
          className="flex-1 h-1 appearance-none rounded-full cursor-pointer" style={{ background: `${C.amber}40` }} />
        <span className="font-mono text-[10px]" style={{ color: C.muted }}>50 cm</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-3">
        <div>
          <p className="font-mono text-[18px] font-bold" style={{ color: C.amber }}>{pourHeight} cm</p>
          <p className="font-mono text-[10px]" style={{ color: C.muted }}>pour height</p>
        </div>
        <div>
          <p className="font-mono text-[18px] font-bold" style={{ color: C.tea }}>
            {pourHeight >= 30 ? '✓' : '✗'}
          </p>
          <p className="font-mono text-[10px]" style={{ color: C.muted }}>
            {pourHeight >= 30 ? 'proper aeration' : 'too low — no foam'}
          </p>
        </div>
        <div>
          <p className="font-mono text-[18px] font-bold" style={{ color: C.amber }}>
            {pourHeight >= 30 ? 'turban forms' : 'flat surface'}
          </p>
          <p className="font-mono text-[10px]" style={{ color: C.muted }}>foam crown</p>
        </div>
      </div>
    </div>
  )
}

// ═══ THREE GLASSES STREAM ═══
function ThreeGlassesStream() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <div className="grid grid-cols-3 gap-6">
        {GLASSES.map((g, gi) => {
          const layers = [
            { name: 'Mint', pct: g.mintPct, color: C.mint },
            { name: 'Sugar', pct: g.sugarPct, color: C.sugar },
            { name: 'Tannin', pct: g.tanninPct, color: C.tannin },
            { name: 'Caffeine', pct: g.caffeinePct, color: C.caffeine },
          ]
          return (
            <div key={g.name} className="transition-all duration-700" style={{ opacity: vis ? 1 : 0, transitionDelay: `${gi * 200}ms` }}>
              {/* Glass number */}
              <p className="font-serif italic text-[24px] mb-1" style={{ color: g.color }}>{gi + 1}</p>
              <p className="font-mono text-[11px] font-bold" style={{ color: C.ink }}>{g.proverb}</p>
              <p className="font-mono text-[9px] mb-3" style={{ color: C.muted }}>{g.arabic} · {g.temp}°C</p>

              {/* Stacked bar — glass shape */}
              <div className="relative mx-auto" style={{ width: 80 }}>
                <div className="overflow-hidden rounded-b-lg" style={{
                  height: 120,
                  clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
                }}>
                  {layers.map((l, li) => (
                    <div key={l.name} className="w-full transition-all duration-700"
                      style={{
                        height: vis ? `${(l.pct / 100) * 120}px` : '0px',
                        background: `${l.color}30`,
                        borderBottom: `1px solid ${l.color}20`,
                        transitionDelay: `${gi * 200 + li * 80}ms`,
                      }} />
                  ))}
                </div>
                {/* Temperature line */}
                <div className="absolute right-[-32px] top-0 h-full flex flex-col justify-center">
                  <span className="font-mono text-[10px] font-bold" style={{ color: g.color }}>{g.temp}°</span>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-3 space-y-0.5">
                {layers.map(l => (
                  <div key={l.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
                    <span className="font-mono text-[9px]" style={{ color: C.text }}>{l.name}</span>
                    <span className="font-mono text-[9px] font-bold ml-auto" style={{ color: l.color }}>{l.pct}%</span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[9px] mt-2 leading-[1.5]" style={{ color: C.muted }}>{g.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══ MAIN CONTENT ═══
export function TeaCeremonyContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const stepsR = useReveal()
  const pourR = useReveal()
  const regionR = useReveal()
  const curveR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Culinary Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Tea Ceremony Topology</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Three glasses. One pot. The architecture of Moroccan hospitality.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Moroccans drink tea 20 to 30 times a day. The country imports 82,000 tonnes of
          Chinese <span className="underline underline-offset-2">gunpowder green</span> tea annually — 25% of China&apos;s total green tea exports.
          Per capita consumption: 1.22 kg per year. But the numbers miss the point.
          <span className="underline underline-offset-2">Moroccan tea</span> is not a beverage. It is an architecture of time, sweetness, and attention.
          The ceremony has six steps, three glasses, and one proverb: <em>&ldquo;The first glass is
          as gentle as life, the second as strong as love, the third as bitter as death.&rdquo;</em>
        </p>

        {/* KEY NUMBERS */}
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '82K', unit: 'tonnes', l: 'tea imported/year', c: C.tea },
            { v: '1.22', unit: 'kg', l: 'per capita/year', c: C.mint },
            { v: '3', unit: 'glasses', l: 'per ceremony', c: C.amber },
            { v: '30+', unit: 'cm', l: 'pour height', c: C.sugar },
          ].map((n, i) => (
            <div key={n.l} className="transition-all duration-700"
              style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 150}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}>
                <span className="text-[28px] font-bold">{n.v}</span>
                <span className="text-[13px] ml-1">{n.unit}</span>
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ THE SIX STEPS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={stepsR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.amber }}>The Six Steps</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Every gesture is codified. The host controls time, temperature, and sweetness.
          </p>
          <div className="space-y-1">
            {STEPS.map((s, i) => (
              <StepRow key={s.name} step={s} index={i} parentVis={stepsR.vis} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE POUR ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={pourR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.sugar }}>The Pour: Height as Honour</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Drag the slider to raise the pour. At 30+ cm, air mixes with the stream and foam crowns
            the glass — the &ldquo;turban.&rdquo; Below 30 cm, no aeration, no foam, no respect.
          </p>
          <PourAnimation />
        </div>
      </section>

      {/* ═══ THREE GLASSES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.glass2 }}>Life. Love. Death.</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Same leaves, same pot, three infusions. The flavour compounds shift as tannins extract more deeply with each pour. Glass shape shows relative composition.
          </p>
          <ThreeGlassesStream />
        </div>
      </section>

      {/* ═══ TEMPERATURE COOLING CURVE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={curveR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.tannin }}>The Cooling Curve</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Temperature drop across the ceremony. Each glass is cooler, stronger, more bitter.
          </p>
          <div className="h-[180px] relative">
            {/* Y axis */}
            {[100, 80, 60].map(t => {
              const y = ((100 - t) / 50) * 100
              return (
                <div key={t} className="absolute left-0 right-0 flex items-center" style={{ top: `${y}%` }}>
                  <span className="font-mono text-[9px] w-10 text-right pr-2" style={{ color: C.muted }}>{t}°C</span>
                  <div className="flex-1 h-px" style={{ background: `${C.border}50` }} />
                </div>
              )
            })}
            {/* Curve line (SVG) */}
            <svg className="absolute inset-0 ml-10" viewBox="0 0 400 180" preserveAspectRatio="none">
              {/* Ceremony temperature path */}
              <path
                d={curveR.vis
                  ? 'M 10,4 C 30,4 50,8 80,14 C 100,18 110,22 130,28 C 150,34 160,36 180,44 C 200,52 210,56 230,68 C 250,78 260,84 280,96 C 300,108 310,112 330,120 C 350,128 370,132 390,140'
                  : 'M 10,90 L 390,90'
                }
                fill="none" stroke={C.amber} strokeWidth="2" style={{ transition: 'all 1.2s ease-out' }}
              />
              {/* Glass markers */}
              {[
                { x: 100, y: curveR.vis ? 22 : 90, label: '1st · 82°C', color: C.glass1 },
                { x: 230, y: curveR.vis ? 68 : 90, label: '2nd · 74°C', color: C.glass2 },
                { x: 360, y: curveR.vis ? 134 : 90, label: '3rd · 65°C', color: C.glass3 },
              ].map((g, i) => (
                <g key={i}>
                  <circle cx={g.x} cy={g.y} r="5" fill={g.color}
                    style={{ transition: 'all 1.2s ease-out', transitionDelay: `${i * 200}ms` }} />
                  <text x={g.x} y={g.y - 12} textAnchor="middle" fontSize="9"
                    fontFamily="'IBM Plex Mono', monospace" fill={g.color}
                    style={{ transition: 'all 1.2s ease-out', transitionDelay: `${i * 200}ms` }}>
                    {g.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className="flex justify-between ml-10 mt-1">
            <span className="font-mono text-[9px]" style={{ color: C.muted }}>Rinse</span>
            <span className="font-mono text-[9px]" style={{ color: C.muted }}>Steep</span>
            <span className="font-mono text-[9px]" style={{ color: C.muted }}>Pour 1</span>
            <span className="font-mono text-[9px]" style={{ color: C.muted }}>Pour 2</span>
            <span className="font-mono text-[9px]" style={{ color: C.muted }}>Pour 3</span>
          </div>
        </div>
      </section>

      {/* ═══ REGIONAL SMALL MULTIPLES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={regionR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.mint }}>North to South: The Sugar–Mint Gradient</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Sugar dominates in the north (Tetouan) and deep Sahara. Herbs take over in the south (Agadir, Souss).
            Each city&apos;s bar shows tablespoons of sugar (gold) and mint intensity (green) per pot.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {REGIONS.map((r, i) => (
              <RegionMini key={r.city} region={r} index={i} parentVis={regionR.vis} />
            ))}
          </div>
          {/* Legend */}
          <div className="flex gap-4 mt-4">
            <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: C.sugar }}>
              <span className="w-3 h-2 rounded-sm" style={{ background: `${C.sugar}30` }} /> Sugar (tbsp)
            </span>
            <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: C.mint }}>
              <span className="w-3 h-2 rounded-sm" style={{ background: `${C.mint}30` }} /> Mint intensity
            </span>
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.tea }}>Gunpowder, Not Loose Leaf</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Morocco uses Chinese gunpowder green tea — leaves hand-rolled into tight pellets
                that resemble gunpowder grains. The rolling preserves freshness during the long
                sea voyage from China. Morocco accounts for 46% of the world&apos;s gunpowder tea
                exports. Tea arrived via British trade in the 18th century. Moroccans added mint,
                added sugar, and made it their own.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.sugar }}>Sugar as Social Signal</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The amount of sugar is not about taste — it is about generosity. A sweet tea
                signals wealth and welcome. In the Rif and Sahara, where sugar was once a luxury
                trade good, heavy sweetness persists as a cultural marker. In Casablanca, where
                health consciousness and speed matter more, sugar decreases. The gradient
                from north to south is as much about economics as palate.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.mint }}>Berber Whiskey</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Mint tea is sometimes called &ldquo;Berber whiskey&rdquo; — a joke about Morocco
                being a Muslim country where alcohol is restricted but tea flows freely. The
                nickname captures the truth: tea is the social lubricant of Morocco.
                Negotiations, marriages, funerals, carpet sales — nothing happens without
                a pot of atay. Refusing the first glass is refusing the relationship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The first glass is as gentle as life. The second is as strong
            as love. The third is as bitter as death. Same pot. Same leaves.
            The only variable is time. What changes between the first pour
            and the last is not the tea — it is you. Your conversation has
            deepened. Your defences have lowered. The sugar is gone and
            what remains is the truth. That is what the third glass tastes like.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: C.muted }}>
            Tea import data: Moroccan Association of Tea and Coffee Producers (AMITC). Per capita
            consumption: Euromonitor International, IndexBox (1.22–1.85 kg/yr range). China export
            share (46% gunpowder): Tea &amp; Coffee Trade Journal (May 2024). Ceremony steps
            reconstructed from ethnographic observation, Marrakeche.com, Moroccan Corridor, and
            consultation with Marrakech hosts. Regional sugar-mint ratios are approximate consensus
            from culinary ethnography — no standardised measurement exists; families vary. Temperature
            curves are simplified models based on cooling properties of small glass vessels.
            Proverb variants differ: &ldquo;gentle/strong/bitter&rdquo; (Moroccan urban) vs
            &ldquo;bitter/strong/sweet&rdquo; (Tuareg desert). Three-glass tradition well-documented
            across North Africa and Sahel.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.mint }}>&copy; Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}

// ═══ STEP ROW ═══
function StepRow({ step: s, index, parentVis }: { step: typeof STEPS[0]; index: number; parentVis: boolean }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="transition-all duration-500" style={{ opacity: parentVis ? 1 : 0, transitionDelay: `${index * 60}ms` }}>
      <div className="flex items-center gap-3 cursor-pointer group py-2" onClick={() => setExpanded(!expanded)}>
        <span className="font-mono text-[20px] font-bold w-8 shrink-0 text-center" style={{ color: C.amber }}>{index + 1}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[12px] font-bold group-hover:underline" style={{ color: C.ink }}>{s.name}</span>
            <span className="font-mono text-[10px]" style={{ color: C.muted }}>{s.arabic}</span>
          </div>
          <span className="font-mono text-[10px]" style={{ color: C.muted }}>{s.duration} · {typeof s.temp === 'number' ? `${s.temp}°C` : s.temp}</span>
        </div>
        {s.ingredient !== '—' && (
          <span className="font-mono text-[10px] px-2 py-0.5 border rounded-full shrink-0 hidden md:block" style={{ borderColor: C.border, color: C.tea }}>{s.ingredient}</span>
        )}
      </div>
      {expanded && (
        <div className="ml-11 mb-3 pl-3 border-l-2 py-2" style={{ borderColor: C.amber }}>
          <p className="font-mono text-[11px] leading-[1.7]" style={{ color: C.text }}>{s.desc}</p>
          {s.amount !== '—' && (
            <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>Amount: {s.amount}</p>
          )}
        </div>
      )}
    </div>
  )
}

// ═══ REGIONAL MINI ═══
function RegionMini({ region: r, index, parentVis }: { region: typeof REGIONS[0]; index: number; parentVis: boolean }) {
  const [hovered, setHovered] = useState(false)
  const maxSugar = 6, maxMint = 3
  return (
    <div className="relative transition-all duration-500 cursor-pointer"
      style={{ opacity: parentVis ? 1 : 0, transitionDelay: `${index * 40}ms` }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <p className="font-mono text-[11px] font-bold" style={{ color: C.ink }}>{r.city}</p>
      <p className="font-mono text-[9px] mb-2" style={{ color: C.muted }}>{r.lat.toFixed(1)}°N</p>
      {/* Dual bars */}
      <div className="flex gap-1 h-[60px] items-end">
        <div className="flex-1 rounded-t-sm transition-all duration-700"
          style={{
            height: parentVis ? `${(r.sugar / maxSugar) * 100}%` : '0%',
            background: `${C.sugar}25`,
            borderTop: `2px solid ${C.sugar}`,
            transitionDelay: `${index * 40}ms`,
          }} />
        <div className="flex-1 rounded-t-sm transition-all duration-700"
          style={{
            height: parentVis ? `${(r.mint / maxMint) * 100}%` : '0%',
            background: `${C.mint}25`,
            borderTop: `2px solid ${C.mint}`,
            transitionDelay: `${index * 40 + 80}ms`,
          }} />
      </div>
      <div className="flex gap-1 mt-1">
        <span className="flex-1 font-mono text-[8px] text-center" style={{ color: C.sugar }}>{r.sugar}</span>
        <span className="flex-1 font-mono text-[8px] text-center" style={{ color: C.mint }}>{r.mint}</span>
      </div>
      {/* Hover tooltip */}
      {hovered && (
        <div className="absolute z-20 bottom-full left-0 mb-2 p-2 rounded-sm w-[200px] shadow-sm"
          style={{ background: 'white', border: `1px solid ${C.border}` }}>
          <p className="font-mono text-[10px] font-bold" style={{ color: C.ink }}>{r.city} · {r.region}</p>
          <p className="font-mono text-[9px]" style={{ color: C.mint }}>Herbs: {r.herbs}</p>
          <p className="font-mono text-[9px] leading-[1.5] mt-1" style={{ color: C.muted }}>{r.note}</p>
        </div>
      )}
      {/* ── FOOTER ── */}
      <div style={{ backgroundColor: '#1f1f1f', padding: '32px 24px 16px', marginTop: 32 }}>
        <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
          &copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.
        </p>
        <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
          This visualization may not be reproduced without visible attribution.
        </p>
      </div>
    </div>
  )
}
