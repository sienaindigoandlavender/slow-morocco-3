'use client'

import { useState, useEffect, useMemo } from 'react'

// ═══ EARTH PALETTE ═══

const EARTH = {
  paper: '#ffffff',
  cream: '#fafafa',
  ink: '#0a0a0a',
  body: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  faint: '#f5f5f5',
  // Data colors — all earth
  saffron: '#C17F28',
  rust: '#A0522D',
  brick: '#8B3A3A',
  indigo: '#2D3A6E',
  sage: '#6B7F5E',
  emerald: '#2D6E4F',
  chocolate: '#3E2723',
  terracotta: '#B87A5E',
  ochre: '#C49A3C',
  wine: '#722F37',
  olive: '#5C6B3C',
  plum: '#5D3A5E',
}

// ═══ DATA ═══

interface ProduceItem {
  name: string; darija: string; cat: string; start: number; end: number
  peak: number[]; region: string; color: string
}

const PRODUCE: ProduceItem[] = [
  // CITRUS
  { name: 'Oranges', darija: 'Limoun', cat: 'citrus', start: 10, end: 4, peak: [11,0,1,2], region: 'Souss, Berkane', color: EARTH.saffron },
  { name: 'Clementines', darija: 'Mandarīn', cat: 'citrus', start: 10, end: 2, peak: [11,0,1], region: 'Berkane, Souss', color: EARTH.ochre },
  { name: 'Lemons', darija: 'Hamd', cat: 'citrus', start: 0, end: 11, peak: [11,0,1,2,3], region: 'Nationwide', color: '#B8A040' },
  { name: 'Grapefruit', darija: 'Pomplemousse', cat: 'citrus', start: 11, end: 3, peak: [0,1,2], region: 'Gharb, Souss', color: EARTH.terracotta },

  // BERRIES & STONE FRUIT
  { name: 'Strawberries', darija: 'Frāz', cat: 'berry', start: 1, end: 5, peak: [2,3,4], region: 'Larache, Kenitra', color: EARTH.brick },
  { name: 'Cherries', darija: 'Habb el Mlouk', cat: 'berry', start: 4, end: 6, peak: [4,5], region: 'Sefrou, Middle Atlas', color: EARTH.wine },
  { name: 'Blueberries', darija: 'Myrtilles', cat: 'berry', start: 3, end: 6, peak: [4,5], region: 'Souss, Kenitra', color: EARTH.indigo },
  { name: 'Raspberries', darija: 'Frambwāz', cat: 'berry', start: 4, end: 7, peak: [5,6], region: 'Kenitra, Larache', color: '#8B4050' },
  { name: 'Peaches', darija: 'Khōkh', cat: 'stone', start: 5, end: 8, peak: [6,7], region: 'Meknes, Fes', color: EARTH.terracotta },
  { name: 'Apricots', darija: 'Meshmash', cat: 'stone', start: 4, end: 7, peak: [5,6], region: 'Ouarzazate, Atlas', color: EARTH.rust },
  { name: 'Plums', darija: 'Berquouq', cat: 'stone', start: 5, end: 8, peak: [6,7], region: 'Meknes, Atlas', color: EARTH.plum },

  // SUMMER
  { name: 'Watermelon', darija: 'Dellāh', cat: 'melon', start: 5, end: 9, peak: [6,7,8], region: 'Doukkala, Tensift', color: EARTH.emerald },
  { name: 'Melon', darija: 'Bttīkh', cat: 'melon', start: 5, end: 9, peak: [6,7,8], region: 'Tadla, Haouz', color: EARTH.sage },
  { name: 'Grapes', darija: "L'ʿnab", cat: 'fruit', start: 6, end: 10, peak: [7,8,9], region: 'Meknes, Doukkala', color: EARTH.plum },
  { name: 'Figs', darija: 'Karmous', cat: 'fruit', start: 6, end: 9, peak: [7,8], region: 'Taounate, Chefchaouen', color: '#5D3A4A' },
  { name: 'Prickly Pear', darija: 'Hendiya', cat: 'fruit', start: 6, end: 9, peak: [7,8], region: 'Nationwide', color: EARTH.rust },

  // AUTUMN
  { name: 'Pomegranates', darija: 'Rommān', cat: 'fruit', start: 8, end: 11, peak: [9,10], region: 'Ouazzane, Fes', color: EARTH.wine },
  { name: 'Dates', darija: 'Tmar', cat: 'fruit', start: 8, end: 11, peak: [9,10], region: 'Erfoud, Draa Valley', color: EARTH.chocolate },
  { name: 'Quinces', darija: 'Sferjel', cat: 'fruit', start: 9, end: 11, peak: [9,10], region: 'Meknes, Atlas', color: EARTH.ochre },
  { name: 'Almonds', darija: 'Louz', cat: 'nut', start: 7, end: 9, peak: [8], region: 'Tafraout, Anti-Atlas', color: '#A08060' },
  { name: 'Walnuts', darija: 'Guerguāa', cat: 'nut', start: 8, end: 10, peak: [9], region: 'Azrou, Middle Atlas', color: '#6B5040' },
  { name: 'Olives', darija: 'Zītoun', cat: 'fruit', start: 10, end: 1, peak: [11,0], region: 'Meknes, Fes, Marrakech', color: EARTH.olive },

  // VEGETABLES
  { name: 'Tomatoes', darija: 'Matīsha', cat: 'veg', start: 3, end: 10, peak: [5,6,7,8], region: 'Souss, Doukkala', color: EARTH.brick },
  { name: 'Peppers', darija: 'Felfel', cat: 'veg', start: 4, end: 9, peak: [6,7,8], region: 'Souss, Gharb', color: EARTH.emerald },
  { name: 'Courgettes', darija: 'Garʿa', cat: 'veg', start: 3, end: 9, peak: [5,6,7], region: 'Haouz, Tadla', color: EARTH.sage },
  { name: 'Aubergine', darija: 'Bādenjāl', cat: 'veg', start: 4, end: 9, peak: [6,7,8], region: 'Souss, Haouz', color: EARTH.indigo },
  { name: 'Green Beans', darija: 'Loubia Khadra', cat: 'veg', start: 9, end: 5, peak: [10,11,0,1,2,3], region: 'Souss, exports', color: EARTH.olive },
  { name: 'Artichokes', darija: 'Qouq', cat: 'veg', start: 1, end: 4, peak: [2,3], region: 'Gharb, Casablanca', color: '#5C7050' },
  { name: 'Broad Beans', darija: 'Foul', cat: 'veg', start: 1, end: 5, peak: [2,3,4], region: 'Nationwide', color: EARTH.sage },
  { name: 'Peas', darija: 'Jelbāna', cat: 'veg', start: 1, end: 5, peak: [2,3,4], region: 'Haouz, Saiss', color: '#4A6B3C' },
  { name: 'Pumpkin', darija: 'Garʿa Hamra', cat: 'veg', start: 8, end: 1, peak: [9,10,11], region: 'Doukkala, Haouz', color: EARTH.rust },
  { name: 'Khobiza', darija: 'Khobiza', cat: 'veg', start: 11, end: 4, peak: [0,1,2,3], region: 'Nationwide', color: '#3A4A30' },
]

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December']
const SEASON_NAMES: Record<number, string> = { 0:'Winter', 1:'Winter', 2:'Spring', 3:'Spring', 4:'Spring', 5:'Summer', 6:'Summer', 7:'Summer', 8:'Autumn', 9:'Autumn', 10:'Autumn', 11:'Winter' }
const SEASON_COLORS: Record<string, string> = { Winter: EARTH.indigo, Spring: EARTH.sage, Summer: EARTH.saffron, Autumn: EARTH.wine }

const CAT_LABELS: Record<string, { label: string; color: string }> = {
  citrus: { label: 'Citrus', color: EARTH.saffron },
  berry: { label: 'Berries', color: EARTH.brick },
  stone: { label: 'Stone Fruit', color: EARTH.terracotta },
  melon: { label: 'Melons', color: EARTH.emerald },
  fruit: { label: 'Fruits & Nuts', color: EARTH.plum },
  nut: { label: 'Nuts', color: '#A08060' },
  veg: { label: 'Vegetables', color: EARTH.sage },
}

// ═══ HOOKS ═══

function useInView(threshold = 0.15): [React.RefCallback<HTMLElement>, boolean] {
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

// ═══ HELPERS ═══

function isInSeason(item: ProduceItem, month: number): boolean {
  if (item.end >= item.start) return month >= item.start && month <= item.end
  return month >= item.start || month <= item.end
}

function arcPath(cx: number, cy: number, r: number, startMonth: number, endMonth: number): string {
  let end = endMonth
  if (end < startMonth) end += 12
  const span = end - startMonth + 1
  const pad = 0.015
  const sA = (startMonth / 12) * Math.PI * 2 - Math.PI / 2 + pad
  const eA = ((startMonth + span) / 12) * Math.PI * 2 - Math.PI / 2 - pad
  const large = (eA - sA) > Math.PI ? 1 : 0
  return `M${cx + r * Math.cos(sA)},${cy + r * Math.sin(sA)} A${r},${r} 0 ${large} 1 ${cx + r * Math.cos(eA)},${cy + r * Math.sin(eA)}`
}

// ═══ SVG ILLUSTRATIONS ═══

function ProduceIcon({ name, size = 22 }: { name: string; size?: number }) {
  const s = size
  const icons: Record<string, JSX.Element> = {
    Oranges: <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="14" cy="15" r="10" fill={EARTH.saffron} /><ellipse cx="14" cy="6" rx="2" ry="3" fill={EARTH.olive} /><circle cx="11" cy="14" r="1.2" fill="#fff" opacity="0.15" /></svg>,
    Clementines: <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="14" cy="15" r="9" fill={EARTH.ochre} /><ellipse cx="14" cy="5.5" rx="3" ry="2" fill={EARTH.sage} /></svg>,
    Lemons: <svg width={s} height={s} viewBox="0 0 28 28"><ellipse cx="14" cy="14" rx="10" ry="8" fill="#B8A040" transform="rotate(-20 14 14)" /></svg>,
    Strawberries: <svg width={s} height={s} viewBox="0 0 28 28"><path d="M14 4 L6 16 Q6 24 14 26 Q22 24 22 16 Z" fill={EARTH.brick} /><ellipse cx="14" cy="3" rx="5" ry="2" fill={EARTH.sage} /><circle cx="11" cy="14" r="0.7" fill="#fff" opacity="0.3" /><circle cx="16" cy="17" r="0.7" fill="#fff" opacity="0.3" /></svg>,
    Cherries: <svg width={s} height={s} viewBox="0 0 28 28"><path d="M14 3 Q10 8 9 14" stroke={EARTH.olive} strokeWidth="1.5" fill="none" /><path d="M14 3 Q18 8 19 14" stroke={EARTH.olive} strokeWidth="1.5" fill="none" /><circle cx="9" cy="17" r="5" fill={EARTH.wine} /><circle cx="19" cy="17" r="5" fill={EARTH.wine} /></svg>,
    Tomatoes: <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="14" cy="16" r="10" fill={EARTH.brick} /><path d="M8 8 Q11 5 14 7 Q17 5 20 8" fill={EARTH.sage} /></svg>,
    Figs: <svg width={s} height={s} viewBox="0 0 28 28"><path d="M14 4 Q8 8 8 16 Q8 24 14 26 Q20 24 20 16 Q20 8 14 4" fill="#5D3A4A" /><path d="M14 4 L14 8" stroke={EARTH.olive} strokeWidth="1.5" /><circle cx="14" cy="24" r="1.5" fill={EARTH.terracotta} /></svg>,
    Watermelon: <svg width={s} height={s} viewBox="0 0 28 28"><path d="M4 18 A12 12 0 0 1 24 18 Z" fill={EARTH.emerald} /><path d="M6 18 A10 10 0 0 1 22 18 Z" fill={EARTH.brick} /><circle cx="11" cy="16" r="0.8" fill={EARTH.chocolate} /><circle cx="15" cy="15" r="0.8" fill={EARTH.chocolate} /></svg>,
    Pomegranates: <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="14" cy="15" r="10" fill={EARTH.wine} /><path d="M10 5 L14 3 L18 5" fill="#5C2028" stroke="#5C2028" strokeWidth="1" /></svg>,
    Dates: <svg width={s} height={s} viewBox="0 0 28 28"><ellipse cx="14" cy="16" rx="5" ry="8" fill={EARTH.chocolate} /><ellipse cx="14" cy="14" rx="3" ry="6" fill="#5C4030" opacity="0.4" /><path d="M14 4 L12 8 M14 4 L16 8" stroke={EARTH.sage} strokeWidth="1" /></svg>,
    Olives: <svg width={s} height={s} viewBox="0 0 28 28"><ellipse cx="14" cy="15" rx="6" ry="8" fill={EARTH.olive} /><ellipse cx="12" cy="13" rx="2" ry="3" fill="#6B7B4C" opacity="0.3" /><path d="M14 4 L18 2" stroke={EARTH.sage} strokeWidth="1.5" /><ellipse cx="18" cy="3" rx="3" ry="1.5" fill={EARTH.sage} /></svg>,
    Peppers: <svg width={s} height={s} viewBox="0 0 28 28"><path d="M14 6 Q8 10 8 18 Q8 24 12 26 Q16 24 14 18 Q20 24 20 18 Q20 10 14 6" fill={EARTH.emerald} /><path d="M14 2 L14 7" stroke={EARTH.olive} strokeWidth="2" /></svg>,
    Aubergine: <svg width={s} height={s} viewBox="0 0 28 28"><path d="M14 8 Q8 14 8 20 Q8 26 14 26 Q20 26 20 20 Q20 14 14 8" fill={EARTH.indigo} /><path d="M12 4 Q14 2 16 4 L16 8 Q14 10 12 8 Z" fill={EARTH.sage} /></svg>,
    Pumpkin: <svg width={s} height={s} viewBox="0 0 28 28"><ellipse cx="10" cy="17" rx="6" ry="8" fill={EARTH.rust} /><ellipse cx="18" cy="17" rx="6" ry="8" fill="#8A4420" /><ellipse cx="14" cy="17" rx="5" ry="9" fill={EARTH.rust} /><path d="M14 6 Q12 3 14 2" stroke={EARTH.olive} strokeWidth="1.5" fill="none" /></svg>,
    Grapes: <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="11" cy="12" r="3" fill={EARTH.plum} /><circle cx="17" cy="12" r="3" fill={EARTH.plum} /><circle cx="14" cy="16" r="3" fill={EARTH.plum} /><circle cx="11" cy="20" r="3" fill={EARTH.plum} /><circle cx="17" cy="20" r="3" fill={EARTH.plum} /><circle cx="14" cy="24" r="3" fill={EARTH.plum} /><path d="M14 4 L14 10" stroke={EARTH.olive} strokeWidth="1.5" /><ellipse cx="16" cy="5" rx="3" ry="2" fill={EARTH.sage} /></svg>,
    Almonds: <svg width={s} height={s} viewBox="0 0 28 28"><ellipse cx="14" cy="14" rx="6" ry="10" fill="#A08060" /><ellipse cx="14" cy="14" rx="4" ry="7" fill="#8A7050" opacity="0.4" /></svg>,
  }
  return icons[name] || <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="14" cy="14" r="10" fill="currentColor" opacity="0.25" /></svg>
}

// ═══ SHARE & EMBED ═══

function ShareEmbed() {
  const [copied, setCopied] = useState<string | null>(null)
  const embedCode = `<iframe src="https://www.slowmorocco.com/stories/seasonal-produce/embed" width="100%" height="420" style="border:none;border-radius:4px;" title="What Grows When — Morocco Seasonal Produce Calendar" loading="lazy"></iframe>\n<p style="font-size:11px;color:#888;margin-top:4px;">Source: <a href="https://www.slowmorocco.com/stories/seasonal-produce" style="color:#888;">Slow Morocco</a></p>`
  const pageUrl = 'https://www.slowmorocco.com/stories/seasonal-produce'

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => { setCopied(label); setTimeout(() => setCopied(null), 2000) })
  }

  return (
    <section className="px-8 md:px-[8%] lg:px-[12%] mt-12">
      <div style={{ borderTop: `1px solid ${EARTH.border}` }} className="pt-8">
        <p className="micro-label" style={{ color: EARTH.muted }}>Share & Embed</p>
        <p className="font-serif italic text-[20px] mt-1 mb-6" style={{ color: EARTH.body }}>
          Use this visualization on your website or share it
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: EARTH.muted }}>Share</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent('What Grows When — 32 Moroccan fruits & vegetables by season')}&url=${encodeURIComponent(pageUrl)}` },
                { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
                { label: 'Pinterest', href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&description=${encodeURIComponent('Morocco seasonal produce calendar with Darija names')}` },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 text-[11px] transition-all"
                  style={{ color: EARTH.muted, border: `1px solid ${EARTH.border}` }}>
                  {s.label}
                </a>
              ))}
              <button onClick={() => copy(pageUrl, 'link')}
                className="px-4 py-2 text-[11px] transition-all"
                style={{ color: EARTH.muted, border: `1px solid ${EARTH.border}` }}>
                {copied === 'link' ? 'Copied' : 'Copy Link'}
              </button>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: EARTH.muted }}>Embed on your website</p>
            <div className="relative">
              <pre className="text-[10px] p-4 overflow-x-auto leading-relaxed" style={{ color: EARTH.muted, background: EARTH.cream, scrollbarWidth: 'none' as const }}>{embedCode}</pre>
              <button onClick={() => copy(embedCode, 'embed')}
                className="absolute top-2 right-2 px-3 py-1 text-[10px] transition-all"
                style={{ background: EARTH.border, color: EARTH.body }}>
                {copied === 'embed' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-[9px] mt-2" style={{ color: EARTH.muted }}>
              Free to embed with attribution. &ldquo;© Slow Morocco&rdquo; must remain visible.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══ PAGE ═══

export function SeasonalProduceContent() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null)
  const [wheelRef, wheelVisible] = useInView(0.1)
  const [calRef, calVisible] = useInView(0.1)

  const catOrder = ['citrus','berry','stone','melon','fruit','nut','veg']
  const sorted = useMemo(() =>
    [...PRODUCE].sort((a, b) => {
      const ci = catOrder.indexOf(a.cat) - catOrder.indexOf(b.cat)
      return ci !== 0 ? ci : a.start - b.start
    }), [])

  const CX = 500, CY = 500, INNER_R = 130, RING_W = 10.5, GAP = 2

  const inSeasonItems = hoveredMonth !== null ? sorted.filter(item => isInSeason(item, hoveredMonth)) : []
  const monthItems = useMemo(() => MONTHS.map((_, mi) => sorted.filter(item => isInSeason(item, mi))), [sorted])

  return (
    <div className="min-h-screen pt-16" style={{ background: EARTH.paper, color: EARTH.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-20 pb-12">
        <p className="micro-label mb-2" style={{ color: EARTH.muted }}>Module 008 · Food Intelligence</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.02em] mb-4" style={{ color: EARTH.ink }}>
          <em>What Grows When</em>
        </h1>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mb-8" style={{ color: EARTH.body }}>
          A seasonal calendar of Moroccan fruits and vegetables. Thirty-two crops
          mapped across twelve months — with the <span className="underline underline-offset-2">Darija</span> name you&apos;ll hear in the <span className="underline underline-offset-2">souk</span>,
          the region where it grows, and when it tastes best.
        </p>
        <div className="flex flex-wrap gap-8">
          {[
            { n: '32', l: 'Crops mapped', c: EARTH.emerald },
            { n: '12', l: 'Months', c: EARTH.saffron },
            { n: '15+', l: 'Growing regions', c: EARTH.indigo },
            { n: '7', l: 'Categories', c: EARTH.wine },
          ].map(s => (
            <div key={s.l}>
              <p className="font-serif italic text-[28px]" style={{ color: s.c }}>{s.n}</p>
              <p className="micro-label" style={{ color: EARTH.muted }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ RADIAL WHEEL ═══ */}
      <section ref={wheelRef} className="max-w-[900px] mx-auto px-4">
        <div className="pt-8 mb-4 px-2" style={{ borderTop: `1px solid ${EARTH.border}` }}>
          <p className="micro-label mb-1" style={{ color: EARTH.muted }}>The Wheel</p>
          <p className="font-serif italic text-[20px] mb-1" style={{ color: EARTH.body }}>
            Each ring is one crop. The arc is its season.
          </p>
          <p className="text-[11px]" style={{ color: EARTH.muted }}>
            Hover a month to see what&apos;s available. Hover any arc for details.
          </p>
        </div>

        <svg viewBox="0 0 1000 1000" className="w-full h-auto"
          style={{ opacity: wheelVisible ? 1 : 0, transition: 'opacity 0.8s ease' }}>

          {/* Month grid */}
          {MONTHS.map((m, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
            const innerX = CX + (INNER_R - 15) * Math.cos(angle)
            const innerY = CY + (INNER_R - 15) * Math.sin(angle)
            const outerR = INNER_R + sorted.length * (RING_W + GAP) + 15
            const outerX = CX + outerR * Math.cos(angle)
            const outerY = CY + outerR * Math.sin(angle)
            const labelR = outerR + 18
            const lx = CX + labelR * Math.cos(angle)
            const ly = CY + labelR * Math.sin(angle)
            const isHM = hoveredMonth === i
            return (
              <g key={m}>
                <line x1={innerX} y1={innerY} x2={outerX} y2={outerY}
                  stroke={isHM ? EARTH.body : EARTH.border} strokeWidth={isHM ? 1 : 0.5}
                  style={{ transition: 'all 0.2s' }} />
                <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                  fill={isHM ? EARTH.ink : EARTH.muted} fontSize="9.5"
                  fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.08em"
                  fontWeight={isHM ? 600 : 400} style={{ transition: 'fill 0.2s', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredMonth(i)} onMouseLeave={() => setHoveredMonth(null)}>
                  {m}
                </text>
              </g>
            )
          })}

          {/* Invisible month sectors */}
          {MONTHS.map((_, i) => {
            const a1 = ((i - 0.5) / 12) * Math.PI * 2 - Math.PI / 2
            const a2 = ((i + 0.5) / 12) * Math.PI * 2 - Math.PI / 2
            const outerR = INNER_R + sorted.length * (RING_W + GAP) + 15
            return <path key={`sec-${i}`}
              d={`M${CX},${CY} L${CX + outerR * Math.cos(a1)},${CY + outerR * Math.sin(a1)} A${outerR},${outerR} 0 0 1 ${CX + outerR * Math.cos(a2)},${CY + outerR * Math.sin(a2)} Z`}
              fill="transparent" style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredMonth(i)} onMouseLeave={() => setHoveredMonth(null)} />
          })}

          {/* Produce arcs */}
          {sorted.map((item, i) => {
            const r = INNER_R + i * (RING_W + GAP) + RING_W / 2
            const isItemHovered = hovered === item.name
            const isInSeasonNow = hoveredMonth !== null && isInSeason(item, hoveredMonth)
            const isPeak = hoveredMonth !== null && item.peak.includes(hoveredMonth)
            const dimmed = (hovered !== null && !isItemHovered) || (hoveredMonth !== null && !isInSeasonNow)
            return (
              <g key={item.name}>
                <circle cx={CX} cy={CY} r={r} fill="none" stroke={EARTH.faint} strokeWidth={RING_W} opacity={0.3} />
                <path d={arcPath(CX, CY, r, item.start, item.end)} fill="none" stroke={item.color}
                  strokeWidth={RING_W - 1} strokeLinecap="round"
                  opacity={dimmed ? 0.1 : isPeak || isItemHovered ? 1 : 0.6}
                  style={{ transition: 'opacity 0.3s', cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(item.name)} onMouseLeave={() => setHovered(null)} />
              </g>
            )
          })}

          {/* Center info */}
          {hovered ? (() => {
            const item = sorted.find(s => s.name === hovered)
            if (!item) return null
            return (
              <g>
                <text x={CX} y={CY - 22} textAnchor="middle" fill={EARTH.ink} fontSize="16" fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic">{item.name}</text>
                <text x={CX} y={CY - 2} textAnchor="middle" fill={EARTH.muted} fontSize="11" fontFamily="var(--font-plex-mono), monospace">{item.darija}</text>
                <text x={CX} y={CY + 16} textAnchor="middle" fill={EARTH.muted} fontSize="10" fontFamily="var(--font-plex-mono), monospace">{item.region}</text>
                <text x={CX} y={CY + 32} textAnchor="middle" fill={item.color} fontSize="10" fontFamily="var(--font-plex-mono), monospace">{MONTHS[item.start]} – {MONTHS[item.end]}</text>
              </g>
            )
          })() : hoveredMonth !== null ? (
            <g>
              <text x={CX} y={CY - 14} textAnchor="middle" fill={EARTH.ink} fontSize="20" fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic">{MONTHS_FULL[hoveredMonth]}</text>
              <text x={CX} y={CY + 8} textAnchor="middle" fill={EARTH.muted} fontSize="11" fontFamily="var(--font-plex-mono), monospace">{inSeasonItems.length} crops in season</text>
            </g>
          ) : (
            <g>
              <text x={CX} y={CY - 8} textAnchor="middle" fill={EARTH.muted} fontSize="10" fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.1em">MOROCCO</text>
              <text x={CX} y={CY + 10} textAnchor="middle" fill={EARTH.border} fontSize="9" fontFamily="var(--font-plex-mono), monospace">32 crops · 12 months</text>
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 px-2 mt-4">
          {Object.entries(CAT_LABELS).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-5 h-1" style={{ background: val.color, borderRadius: '1px' }} />
              <span className="text-[11px]" style={{ color: EARTH.muted }}>{val.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ILLUSTRATED MONTH-BY-MONTH CALENDAR ═══ */}
      <section ref={calRef} className="px-8 md:px-[8%] lg:px-[12%] mt-12">
        <div className="pt-8 mb-6" style={{ borderTop: `1px solid ${EARTH.border}` }}>
          <p className="micro-label mb-1" style={{ color: EARTH.muted }}>The Calendar</p>
          <p className="font-serif italic text-[20px]" style={{ color: EARTH.body }}>
            Month by month, what&apos;s at the souk
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px"
          style={{ background: EARTH.border, opacity: calVisible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          {MONTHS_FULL.map((month, mi) => {
            const items = monthItems[mi]
            const season = SEASON_NAMES[mi]
            const sColor = SEASON_COLORS[season]
            const peakItems = items.filter(it => it.peak.includes(mi))
            const nonPeakItems = items.filter(it => !it.peak.includes(mi))

            return (
              <div key={month} className="p-5" style={{ background: EARTH.paper }}>
                <div className="flex items-baseline justify-between mb-3">
                  <p className="font-serif italic text-[18px]" style={{ color: EARTH.ink }}>{month}</p>
                  <p className="text-[9px] uppercase tracking-wider" style={{ color: sColor }}>{season}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {peakItems.map(item => (
                    <div key={item.name} className="flex items-center gap-1 py-1 px-1.5"
                      style={{ background: `${item.color}12`, border: `1px solid ${item.color}30` }}>
                      <ProduceIcon name={item.name} size={18} />
                      <span className="text-[9px] font-medium" style={{ color: item.color }}>{item.name}</span>
                    </div>
                  ))}
                </div>

                {nonPeakItems.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {nonPeakItems.map(item => (
                      <span key={item.name} className="text-[9px] px-1.5 py-0.5"
                        style={{ color: EARTH.muted, background: EARTH.cream }}>
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-[9px] mt-2" style={{ color: EARTH.border }}>{items.length} items</p>
              </div>
            )
          })}
        </div>
        <p className="text-[10px] mt-2" style={{ color: EARTH.muted }}>
          Items with icons are at peak season. Dimmed items are available but not at their best.
        </p>
      </section>

      {/* ═══ CULTURAL NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-12">
        <div className="pt-8" style={{ borderTop: `1px solid ${EARTH.border}` }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: EARTH.muted }}>The Souk Calendar</p>
              <p className="text-[12px] leading-[1.6]" style={{ color: EARTH.body }}>
                Morocco&apos;s growing season is long and diverse. Citrus dominates winter.
                Berries arrive with spring. Summer brings melons, stone fruit, and the
                beloved karmous (figs). Autumn is the season of rommān (pomegranates)
                and tmar (dates) in the south.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: EARTH.muted }}>Greenhouse vs. Natural</p>
              <p className="text-[12px] leading-[1.6]" style={{ color: EARTH.body }}>
                The Souss Valley exports tomatoes and peppers year-round from industrial
                greenhouses — most bound for European supermarkets. This chart shows
                natural outdoor seasons, when crops taste best and cost least at the local souk.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: EARTH.muted }}>Khobiza — The Winter Staple</p>
              <p className="text-[12px] leading-[1.6]" style={{ color: EARTH.body }}>
                Wild mallow (khobiza) is the crop no tourist guide mentions but every
                Moroccan knows. Foraged from November to April, it appears in a thick,
                silky dish that feeds families through the cold months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SHARE & EMBED ═══ */}
      <ShareEmbed />

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="pt-4" style={{ borderTop: `1px solid ${EARTH.border}` }}>
          <p className="micro-label mb-2" style={{ color: EARTH.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: EARTH.muted }}>
            Seasonal availability data compiled from Ministère de l&apos;Agriculture, de la Pêche Maritime,
            du Développement Rural et des Eaux et Forêts; ORMVA regional agricultural development offices;
            FAO country profiles; and direct market observation in Marrakech, Fes, and Agadir souks (2020–2026).
            Darija names verified through field usage. Growing regions based on MAPMDREF agricultural zone classifications.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: EARTH.border }}>
              © {new Date().getFullYear()} Slow Morocco · Cuisines of Morocco. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: EARTH.emerald }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
