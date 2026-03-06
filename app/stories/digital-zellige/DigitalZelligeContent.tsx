'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  zellige: '#2D6E4F', gold: '#C8A415', clay: '#C54B3C', blue: '#1A4B8A',
  teal: '#1A6B6B', sand: '#B8A280', plum: '#6B2D5B', copper: '#8B5E3C',
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

// ═══ EXPORT DATA (2025 full year — MAD 1.23 billion) ═══
// Source: State Secretariat for Handicrafts, Jan 2026

interface ProductCategory {
  name: string; nameAr: string; share: number; growth: number
  color: string; tileCount: number
}

const PRODUCTS: ProductCategory[] = [
  { name: 'Pottery & Stone', nameAr: 'الفخار والحجر', share: 36, growth: 11, color: C.clay, tileCount: 43 },
  { name: 'Carpets & Rugs', nameAr: 'الزرابي', share: 18, growth: 1, color: C.gold, tileCount: 22 },
  { name: 'Traditional Clothing', nameAr: 'الملابس التقليدية', share: 17, growth: 75, color: C.plum, tileCount: 20 },
  { name: 'Jewellery', nameAr: 'المجوهرات', share: 8, growth: 52, color: C.teal, tileCount: 10 },
  { name: 'Leather Goods', nameAr: 'المنتجات الجلدية', share: 7, growth: -23, color: C.copper, tileCount: 8 },
  { name: 'Basketry & Wood', nameAr: 'السلالة والخشب', share: 6, growth: -15, color: C.sand, tileCount: 7 },
  { name: 'Other Crafts', nameAr: 'حرف أخرى', share: 8, growth: 5, color: C.zellige, tileCount: 10 },
]

interface DestCountry {
  name: string; code: string; share: number; growth: number; color: string
}

const DESTINATIONS: DestCountry[] = [
  { name: 'United States', code: 'US', share: 49, growth: 25, color: '#1A4B8A' },
  { name: 'France', code: 'FR', share: 11, growth: -24, color: '#2D6E4F' },
  { name: 'Türkiye', code: 'TR', share: 7, growth: 5300, color: '#C54B3C' },
  { name: 'Spain', code: 'ES', share: 6, growth: -2, color: '#C8A415' },
  { name: 'United Kingdom', code: 'UK', share: 5, growth: 8, color: '#1A6B6B' },
  { name: 'Germany', code: 'DE', share: 4, growth: 3, color: '#6B4E37' },
  { name: 'UAE', code: 'AE', share: 3, growth: 15, color: '#8B5E3C' },
  { name: 'Other', code: '—', share: 15, growth: 10, color: '#737373' },
]

// Year-over-year export data (MAD millions)
const YEARLY = [
  { year: 2019, value: 750, note: 'Pre-pandemic baseline' },
  { year: 2020, value: 420, note: 'COVID-19 collapse' },
  { year: 2021, value: 680, note: 'Recovery begins' },
  { year: 2022, value: 920, note: 'Digital platforms accelerate' },
  { year: 2023, value: 1020, note: 'Pottery CAGR 21% since 2019' },
  { year: 2024, value: 1110, note: 'Marrakech exports +41%' },
  { year: 2025, value: 1230, note: 'Record. US = 49% of total.' },
]

// Sector-wide stats
const SECTOR = {
  totalArtisans: 2_200_000,
  gdpContribution: '8%',
  totalTurnover: 'MAD 140 billion',
  qualityLabels: 251,
  fezMeknesArtisans: 144_000,
  fezMeknesUnits: 44_000,
  onlineMentions: '1.2 million',
  potteryCAGR: '21%',
}

// ═══ GENERATIVE ZELLIGE MOSAIC ═══
// Each tile = ~MAD 10M of exports, coloured by destination
function ZelligeMosaic({ hoveredDest, onHoverDest }: {
  hoveredDest: string | null; onHoverDest: (code: string | null) => void
}) {
  // Generate 120 tiles distributed by destination country share
  const tiles = useMemo(() => {
    const t: { id: number; dest: DestCountry; product: ProductCategory }[] = []
    let id = 0
    // Distribute tiles by destination share (120 total ≈ MAD 1.23B / ~MAD 10M per tile)
    for (const dest of DESTINATIONS) {
      const count = Math.round(120 * dest.share / 100)
      for (let i = 0; i < count; i++) {
        // Assign product category weighted by share
        const roll = Math.random() * 100
        let cumulative = 0
        let product = PRODUCTS[0]
        for (const p of PRODUCTS) {
          cumulative += p.share
          if (roll <= cumulative) { product = p; break }
        }
        t.push({ id: id++, dest, product })
      }
    }
    return t.slice(0, 120)
  }, [])

  const cols = 12
  const cellSize = 32
  const svgW = cols * cellSize
  const rows = Math.ceil(tiles.length / cols)
  const svgH = rows * cellSize

  // 8-pointed star path for zellige
  function starPath(cx: number, cy: number, size: number): string {
    const r = size * 0.42
    const ri = r * 0.45
    const pts: string[] = []
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 - Math.PI / 8
      pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`)
      const ia = a + Math.PI / 8
      pts.push(`${cx + ri * Math.cos(ia)},${cy + ri * Math.sin(ia)}`)
    }
    return `M${pts.join('L')}Z`
  }

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ maxHeight: 360 }}>
      {tiles.map((t, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const cx = col * cellSize + cellSize / 2
        const cy = row * cellSize + cellSize / 2
        const isHighlighted = hoveredDest === null || hoveredDest === t.dest.code
        const path = starPath(cx, cy, cellSize)

        return (
          <g key={t.id}
            onMouseEnter={() => onHoverDest(t.dest.code)}
            onMouseLeave={() => onHoverDest(null)}
            className="cursor-pointer">
            {/* Tile background */}
            <rect x={col * cellSize + 0.5} y={row * cellSize + 0.5}
              width={cellSize - 1} height={cellSize - 1}
              fill={t.dest.color} opacity={isHighlighted ? 0.12 : 0.04}
              rx="1"
              style={{ transition: 'opacity 0.3s' }} />
            {/* Star */}
            <path d={path}
              fill={t.dest.color}
              opacity={isHighlighted ? 0.5 : 0.1}
              style={{ transition: 'opacity 0.3s' }} />
            {/* Inner detail — product-coded */}
            <circle cx={cx} cy={cy} r={cellSize * 0.08}
              fill={t.product.color}
              opacity={isHighlighted ? 0.8 : 0.2}
              style={{ transition: 'opacity 0.3s' }} />
            {/* Border */}
            <rect x={col * cellSize + 0.5} y={row * cellSize + 0.5}
              width={cellSize - 1} height={cellSize - 1}
              fill="none" stroke={t.dest.color}
              strokeWidth="0.3" opacity={isHighlighted ? 0.3 : 0.08}
              rx="1" />
          </g>
        )
      })}
    </svg>
  )
}

// ═══ PAGE ═══
export function DigitalZelligeContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const prodR = useReveal()
  const destR = useReveal()
  const yearR = useReveal()
  const sectorR = useReveal()

  const [hoveredDest, setHoveredDest] = useState<string | null>(null)
  const maxYearly = Math.max(...YEARLY.map(y => y.value))

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>
          The New Craft Economy · 2025 Export Data
        </p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.88] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Digital Zellige</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.3]" style={{ color: C.muted }}>
            MAD 1.23 billion. 120 tiles. Each one a piece of the new craft economy.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          In 2025, Morocco&apos;s handicraft exports hit MAD 1.23 billion (~$123 million) — an 11%
          increase over the previous year and a new record. The United States now accounts for
          49% of all purchases, up 25% year-over-year. Traditional clothing surged 75%.
          Pottery remains king at 36% of all exports. Türkiye erupted from nowhere to 7% market
          share. France, once the dominant buyer, fell to 11%. The mosaic below is built from
          this data: 120 tiles, each representing ~MAD 10 million of transactions. The colour
          is the destination country. The centre dot is the product category. Hover to filter.
        </p>

        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '1.23', u: 'B MAD', l: '2025 exports (~$123M)', c: C.zellige },
            { v: '49', u: '%', l: 'shipped to the US', c: C.blue },
            { v: '+75', u: '%', l: 'clothing export growth', c: C.plum },
            { v: '2.2', u: 'M', l: 'artisans nationwide', c: C.gold },
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

      {/* GENERATIVE MOSAIC */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.zellige }}>
            The Data Mosaic
          </p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            120 tiles = MAD 1.23 billion. Tile colour = destination country. Centre dot = product category.
            Hover a destination below to filter the mosaic.
          </p>

          <ZelligeMosaic hoveredDest={hoveredDest} onHoverDest={setHoveredDest} />

          {/* Destination legend (interactive) */}
          <div className="flex flex-wrap gap-2 mt-3">
            {DESTINATIONS.map(d => (
              <button key={d.code}
                onMouseEnter={() => setHoveredDest(d.code)}
                onMouseLeave={() => setHoveredDest(null)}
                className="flex items-center gap-1 font-mono text-[9px] px-2 py-0.5 rounded-full border transition-all"
                style={{
                  borderColor: hoveredDest === d.code ? d.color : `${C.border}80`,
                  color: hoveredDest === d.code ? d.color : C.muted,
                  background: hoveredDest === d.code ? `${d.color}08` : 'transparent',
                  fontWeight: hoveredDest === d.code ? 700 : 400,
                }}>
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                {d.name} ({d.share}%)
              </button>
            ))}
          </div>
          {/* Product legend */}
          <div className="flex flex-wrap gap-2 mt-2">
            {PRODUCTS.map(p => (
              <span key={p.name} className="flex items-center gap-1 font-mono text-[8px]" style={{ color: C.muted }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT BREAKDOWN */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={prodR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.clay }}>
            By Product Category
          </p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Pottery & stone dominate. Traditional clothing is the breakout story — from 11% to 17% of exports in one year.
          </p>
          <div className="space-y-2">
            {PRODUCTS.map((p, i) => (
              <div key={p.name} className="transition-all duration-500"
                style={{ opacity: prodR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] w-44 shrink-0 truncate" style={{ color: C.ink }}>
                    {p.name}
                  </span>
                  <div className="flex-1 h-5 rounded-sm" style={{ background: `${C.border}15` }}>
                    <div className="h-full rounded-sm flex items-center px-2 transition-all duration-700"
                      style={{
                        width: prodR.vis ? `${p.share * 2.5}%` : '0%',
                        background: `${p.color}15`,
                        borderRight: `2px solid ${p.color}`,
                        transitionDelay: `${i * 60}ms`,
                      }}>
                      <span className="font-mono text-[9px] whitespace-nowrap font-bold" style={{ color: p.color }}>
                        {p.share}%
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] w-16 text-right shrink-0"
                    style={{ color: p.growth >= 0 ? C.zellige : C.clay }}>
                    {p.growth >= 0 ? '+' : ''}{p.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATION BREAKDOWN */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={destR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.blue }}>
            By Destination Country
          </p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            The US now buys half of Morocco&apos;s craft exports. France has fallen from dominance. Türkiye appeared from nowhere — 53× growth in 7 months.
          </p>
          <div className="space-y-2">
            {DESTINATIONS.map((d, i) => (
              <div key={d.code} className="transition-all duration-500"
                style={{ opacity: destR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}
                onMouseEnter={() => setHoveredDest(d.code)}
                onMouseLeave={() => setHoveredDest(null)}>
                <div className="flex items-center gap-3 cursor-pointer">
                  <span className="font-mono text-[11px] w-36 shrink-0 truncate" style={{ color: C.ink }}>
                    {d.name}
                  </span>
                  <div className="flex-1 h-5 rounded-sm" style={{ background: `${C.border}15` }}>
                    <div className="h-full rounded-sm flex items-center px-2 transition-all duration-700"
                      style={{
                        width: destR.vis ? `${d.share * 1.8}%` : '0%',
                        background: `${d.color}15`,
                        borderRight: `2px solid ${d.color}`,
                        transitionDelay: `${i * 60}ms`,
                      }}>
                      <span className="font-mono text-[9px] whitespace-nowrap font-bold" style={{ color: d.color }}>
                        {d.share}%
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] w-20 text-right shrink-0"
                    style={{ color: d.growth >= 0 ? C.zellige : C.clay }}>
                    {d.growth >= 100 ? `×${Math.round(d.growth / 100)}` : `${d.growth >= 0 ? '+' : ''}${d.growth}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YEARLY TREND */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={yearR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.zellige }}>
            Export Trend 2019–2025
          </p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            MAD millions. COVID collapsed exports by 44%. Recovery took two years. 2025 is a new record.
          </p>
          <div className="flex items-end gap-3 h-[180px] mb-2">
            {YEARLY.map((y, i) => {
              const h = (y.value / maxYearly) * 100
              const isRecord = y.value === maxYearly
              return (
                <div key={y.year} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="font-mono text-[11px] font-bold mb-1"
                    style={{ color: isRecord ? C.zellige : C.muted }}>
                    {y.value}
                  </span>
                  <div className="w-full rounded-t-sm transition-all duration-700"
                    style={{
                      height: yearR.vis ? `${h}%` : '0%',
                      background: isRecord ? `${C.zellige}25` : `${C.zellige}10`,
                      borderTop: `2px solid ${isRecord ? C.zellige : `${C.zellige}40`}`,
                      transitionDelay: `${i * 80}ms`,
                    }} />
                  <span className="font-mono text-[10px] mt-1 font-bold" style={{ color: C.ink }}>{y.year}</span>
                </div>
              )
            })}
          </div>
          <div className="space-y-1 mt-3">
            {YEARLY.map(y => (
              <div key={y.year} className="flex items-center gap-2">
                <span className="font-mono text-[10px] w-10 shrink-0 font-bold" style={{ color: C.ink }}>{y.year}</span>
                <span className="font-mono text-[10px]" style={{ color: C.muted }}>{y.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTOR STATS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={sectorR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.copper }}>
            The Sector at Scale
          </p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Morocco&apos;s handicraft sector is a MAD 140 billion industry employing 2.2 million artisans — 8% of GDP.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: '2.2M', l: 'artisans nationwide', c: C.gold },
              { v: '8%', l: 'of GDP', c: C.zellige },
              { v: 'MAD 140B', l: 'total sector turnover', c: C.copper },
              { v: '251', l: 'quality label holders', c: C.blue },
              { v: '144,000', l: 'artisans in Fes-Meknès', c: C.clay },
              { v: '44,000', l: 'craft units in Fes-Meknès', c: C.teal },
              { v: '1.2M', l: 'online mentions', c: C.plum },
              { v: '21%', l: 'pottery CAGR 2019–2023', c: C.clay },
            ].map((s, i) => (
              <div key={s.l} className="p-3 rounded-sm transition-all duration-500"
                style={{
                  background: `${s.c}05`, border: `1px solid ${C.border}`,
                  opacity: sectorR.vis ? 1 : 0, transitionDelay: `${i * 50}ms`,
                }}>
                <p className="font-mono text-[18px] font-bold leading-none" style={{ color: s.c }}>{s.v}</p>
                <p className="font-mono text-[9px] mt-1" style={{ color: C.muted }}>{s.l}</p>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.blue }}>The American Pivot</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                In 2019, France was Morocco&apos;s largest craft buyer. By 2025, the US accounts for 49%
                of all exports — nearly half the mosaic. The shift reflects American consumer appetite
                for artisanal homeware, driven by platforms like Etsy, Instagram, and direct-to-consumer
                e-commerce. Moroccan rugs are a status object in Brooklyn and Portland.
                France dropped 24% in a single year.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.plum }}>The Clothing Breakout</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Traditional clothing exports surged 75% in 2025, jumping from 11% to 17% of total
                exports. Caftans, djellabas, and embroidered textiles are crossing from ethnic
                novelty into mainstream fashion. The category now rivals carpets for second place.
                This is not heritage tourism — it is a global fashion supply chain rewriting itself
                around Moroccan craft.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.zellige }}>From Alhambra to Blockchain</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Zellige tilework dates to the 10th century. Each tile is hand-cut, hand-glazed, hand-placed.
                The geometry is algorithmic — Islamic tessellation is mathematics made physical.
                Now Morocco is exploring digital traceability for artisanal goods: QR codes on rugs
                linking to the cooperative that wove them, the village, the artisan&apos;s name. The mosaic
                is going digital. The pattern is the same. The medium has changed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            A <span className="underline underline-offset-2">zellige</span> mosaic is never finished by one person. The cutter shapes the tile.
            The glazer paints it. The setter places it. The patron pays for it.
            Each transaction in the export data is a tile in the same tradition —
            a piece of fired earth, cut in <span className="underline underline-offset-2">Fes</span>, glazed in Safi, shipped to Brooklyn,
            set into a kitchen wall six thousand kilometres from the kiln.
            The pattern holds. The distances have changed.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            2025 full-year exports (MAD 1.23 billion, +11%): State Secretariat for Handicrafts and the
            Social and Solidarity Economy, via Morocco World News (Jan 16, 2026), Hespress, Barlaman Today.
            Product breakdown (pottery 36%, carpets 18%, clothing 17%): same source. Destination shares
            (US 49%, France 11%, Türkiye 7%): same source. Traditional clothing growth (+75%): same source.
            Türkiye emergence (53× growth in 7 months): Barlaman Today (Aug 2025). Sector overview
            (MAD 140B turnover, 2.2M artisans, 8% GDP): Yabiladi (Feb 2025), quoting Minister Belkhayat.
            Fes-Meknès region (144,000 artisans, 44,000 units): same source. Pottery CAGR 2019–2023
            (21%, reaching MAD 348M): Maison de l&apos;Artisan Market Intelligence Report (Dec 2024), via
            7News Morocco. Marrakech exports 2024 (MAD 458M, +41%): Barlaman Today (Jan 2025). Online
            mentions (1.2M): Maison de l&apos;Artisan. Historical export estimates (2019–2023): editorial
            interpolation from reported growth rates.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.zellige }}>&copy; Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
