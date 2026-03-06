'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

const E = {
  ink: '#0a0a0a', body: '#262626', muted: '#737373', border: '#e5e5e5', faint: '#f5f5f5',
  saffron: '#C17F28', rust: '#A0522D', brick: '#8B3A3A', indigo: '#2D3A6E',
  sage: '#6B7F5E', emerald: '#2D6E4F', chocolate: '#3E2723', terracotta: '#B87A5E',
  ochre: '#C49A3C', wine: '#722F37', olive: '#5C6B3C', plum: '#5D3A5E',
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December']
const SEASON_MAP: Record<number,string> = {0:'Winter',1:'Winter',2:'Spring',3:'Spring',4:'Spring',5:'Summer',6:'Summer',7:'Summer',8:'Autumn',9:'Autumn',10:'Autumn',11:'Winter'}
const SEASON_COLOR: Record<string,string> = { Winter: E.indigo, Spring: E.sage, Summer: E.saffron, Autumn: E.wine }

interface Crop { name: string; darija: string; cat: string; start: number; end: number; peak: number[]; region: string; color: string; export?: string }

const CROPS: Crop[] = [
  { name: 'Oranges', darija: 'Limoun', cat: 'citrus', start: 10, end: 4, peak: [11,0,1,2], region: 'Souss, Berkane', color: E.saffron, export: '760K tonnes/yr' },
  { name: 'Clementines', darija: 'Mandarīn', cat: 'citrus', start: 10, end: 2, peak: [11,0,1], region: 'Berkane, Souss', color: E.ochre, export: '550K tonnes/yr' },
  { name: 'Lemons', darija: 'Hamd', cat: 'citrus', start: 0, end: 11, peak: [11,0,1,2,3], region: 'Nationwide', color: '#B8A040' },
  { name: 'Grapefruit', darija: 'Pomplemousse', cat: 'citrus', start: 11, end: 3, peak: [0,1,2], region: 'Gharb, Souss', color: E.terracotta },
  { name: 'Strawberries', darija: 'Frāz', cat: 'berry', start: 1, end: 5, peak: [2,3,4], region: 'Larache, Kenitra', color: E.brick, export: '2nd in Africa' },
  { name: 'Cherries', darija: 'Habb el Mlouk', cat: 'berry', start: 4, end: 6, peak: [4,5], region: 'Sefrou, Middle Atlas', color: E.wine },
  { name: 'Blueberries', darija: 'Myrtilles', cat: 'berry', start: 3, end: 6, peak: [4,5], region: 'Souss, Kenitra', color: E.indigo, export: 'Fastest growing export' },
  { name: 'Raspberries', darija: 'Frambwāz', cat: 'berry', start: 4, end: 7, peak: [5,6], region: 'Kenitra, Larache', color: '#8B4050' },
  { name: 'Peaches', darija: 'Khōkh', cat: 'stone', start: 5, end: 8, peak: [6,7], region: 'Meknes, Fes', color: E.terracotta },
  { name: 'Apricots', darija: 'Meshmash', cat: 'stone', start: 4, end: 7, peak: [5,6], region: 'Ouarzazate, Atlas', color: E.rust },
  { name: 'Plums', darija: 'Berquouq', cat: 'stone', start: 5, end: 8, peak: [6,7], region: 'Meknes, Atlas', color: E.plum },
  { name: 'Watermelon', darija: 'Dellāh', cat: 'melon', start: 5, end: 9, peak: [6,7,8], region: 'Doukkala, Tensift', color: E.emerald },
  { name: 'Melon', darija: 'Bttīkh', cat: 'melon', start: 5, end: 9, peak: [6,7,8], region: 'Tadla, Haouz', color: E.sage },
  { name: 'Grapes', darija: "L'ʿnab", cat: 'fruit', start: 6, end: 10, peak: [7,8,9], region: 'Meknes, Doukkala', color: E.plum },
  { name: 'Figs', darija: 'Karmous', cat: 'fruit', start: 6, end: 9, peak: [7,8], region: 'Taounate, Chefchaouen', color: '#5D3A4A' },
  { name: 'Prickly Pear', darija: 'Hendiya', cat: 'fruit', start: 6, end: 9, peak: [7,8], region: 'Nationwide', color: E.rust },
  { name: 'Pomegranates', darija: 'Rommān', cat: 'fruit', start: 8, end: 11, peak: [9,10], region: 'Ouazzane, Fes', color: E.wine },
  { name: 'Dates', darija: 'Tmar', cat: 'fruit', start: 8, end: 11, peak: [9,10], region: 'Erfoud, Draa Valley', color: E.chocolate, export: '117K tonnes Medjool' },
  { name: 'Quinces', darija: 'Sferjel', cat: 'fruit', start: 9, end: 11, peak: [9,10], region: 'Meknes, Atlas', color: E.ochre },
  { name: 'Almonds', darija: 'Louz', cat: 'nut', start: 7, end: 9, peak: [8], region: 'Tafraout, Anti-Atlas', color: '#A08060' },
  { name: 'Walnuts', darija: 'Guerguāa', cat: 'nut', start: 8, end: 10, peak: [9], region: 'Azrou, Middle Atlas', color: '#6B5040' },
  { name: 'Olives', darija: 'Zītoun', cat: 'fruit', start: 10, end: 1, peak: [11,0], region: 'Meknes, Fes, Marrakech', color: E.olive, export: '2M tonnes/yr, 6th world' },
  { name: 'Tomatoes', darija: 'Matīsha', cat: 'veg', start: 3, end: 10, peak: [5,6,7,8], region: 'Souss, Doukkala', color: E.brick, export: '#1 veg export to EU' },
  { name: 'Peppers', darija: 'Felfel', cat: 'veg', start: 4, end: 9, peak: [6,7,8], region: 'Souss, Gharb', color: E.emerald },
  { name: 'Courgettes', darija: 'Garʿa', cat: 'veg', start: 3, end: 9, peak: [5,6,7], region: 'Haouz, Tadla', color: E.sage },
  { name: 'Aubergine', darija: 'Bādenjāl', cat: 'veg', start: 4, end: 9, peak: [6,7,8], region: 'Souss, Haouz', color: E.indigo },
  { name: 'Green Beans', darija: 'Loubia Khadra', cat: 'veg', start: 9, end: 5, peak: [10,11,0,1,2,3], region: 'Souss, exports', color: E.olive },
  { name: 'Artichokes', darija: 'Qouq', cat: 'veg', start: 1, end: 4, peak: [2,3], region: 'Gharb, Casablanca', color: '#5C7050' },
  { name: 'Broad Beans', darija: 'Foul', cat: 'veg', start: 1, end: 5, peak: [2,3,4], region: 'Nationwide', color: E.sage },
  { name: 'Peas', darija: 'Jelbāna', cat: 'veg', start: 1, end: 5, peak: [2,3,4], region: 'Haouz, Saiss', color: '#4A6B3C' },
  { name: 'Pumpkin', darija: 'Garʿa Hamra', cat: 'veg', start: 8, end: 1, peak: [9,10,11], region: 'Doukkala, Haouz', color: E.rust },
  { name: 'Khobiza', darija: 'Khobiza', cat: 'veg', start: 11, end: 4, peak: [0,1,2,3], region: 'Nationwide (foraged)', color: '#3A4A30' },
]

const CAT_LABELS: Record<string,{label:string;color:string}> = {
  citrus:{label:'Citrus',color:E.saffron}, berry:{label:'Berries',color:E.brick},
  stone:{label:'Stone Fruit',color:E.terracotta}, melon:{label:'Melons',color:E.emerald},
  fruit:{label:'Fruits',color:E.plum}, nut:{label:'Nuts',color:'#A08060'}, veg:{label:'Vegetables',color:E.sage},
}

function inSeason(c: Crop, m: number): boolean {
  return c.end >= c.start ? m >= c.start && m <= c.end : m >= c.start || m <= c.end
}

function arcPath(cx: number, cy: number, r: number, s: number, e: number): string {
  let end = e; if (end < s) end += 12
  const span = end - s + 1; const pad = 0.015
  const sA = (s/12)*Math.PI*2-Math.PI/2+pad; const eA = ((s+span)/12)*Math.PI*2-Math.PI/2-pad
  const large = (eA-sA) > Math.PI ? 1 : 0
  return `M${cx+r*Math.cos(sA)},${cy+r*Math.sin(sA)} A${r},${r} 0 ${large} 1 ${cx+r*Math.cos(eA)},${cy+r*Math.sin(eA)}`
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

export function HarvestCalendarContent() {
  const NOW = new Date().getMonth()
  const [activeMonth, setActiveMonth] = useState(NOW)
  const [hovered, setHovered] = useState<string | null>(null)
  const [autoPlay, setAutoPlay] = useState(false)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const hero = useReveal(); const wheel = useReveal(); const grid = useReveal(); const notes = useReveal()

  const catOrder = ['citrus','berry','stone','melon','fruit','nut','veg']
  const sorted = useMemo(() => [...CROPS].sort((a,b) => { const ci = catOrder.indexOf(a.cat)-catOrder.indexOf(b.cat); return ci !== 0 ? ci : a.start - b.start }), [])

  const nowCrops = useMemo(() => sorted.filter(c => inSeason(c, activeMonth)), [sorted, activeMonth])
  const peakCrops = useMemo(() => nowCrops.filter(c => c.peak.includes(activeMonth)), [nowCrops, activeMonth])
  const availCrops = useMemo(() => nowCrops.filter(c => !c.peak.includes(activeMonth)), [nowCrops, activeMonth])

  // Auto-play rotation
  useEffect(() => {
    if (autoPlay) {
      autoRef.current = setInterval(() => setActiveMonth(m => (m + 1) % 12), 1800)
    } else if (autoRef.current) { clearInterval(autoRef.current) }
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [autoPlay])

  const CX = 400, CY = 400, INNER_R = 110, RING_W = 8, GAP = 1.5
  const season = SEASON_MAP[activeMonth]
  const sColor = SEASON_COLOR[season]

  // Month hand angle
  const handAngle = (activeMonth / 12) * Math.PI * 2 - Math.PI / 2
  const handR = INNER_R + sorted.length * (RING_W + GAP) + 20

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#ffffff', color: E.ink }}>

      {/* HERO */}
      <div ref={hero.ref}><section className="px-8 md:px-[8%] lg:px-[12%] pt-section pb-16">
        <p className="micro-label mb-4" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.6s' }}>Module 056 · Living Data</p>
        <h1 className="font-serif text-[clamp(2.8rem,7vw,4.5rem)] text-dwl-black leading-[0.95]" style={{ opacity: hero.vis ? 1 : 0, transform: hero.vis ? 'none' : 'translateY(20px)', transition: 'all 0.8s' }}>
          The Harvest <em>Calendar</em>
        </h1>
        <p className="text-body text-dwl-body mt-6 max-w-[620px]" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.8s 0.2s' }}>
          A living clock of Moroccan agriculture. Thirty-two crops rotating through twelve months.
          The wheel knows what day it is — what&apos;s glowing is what&apos;s growing right now.
        </p>

        {/* Live indicator */}
        <div className="mt-8 flex items-center gap-3" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.8s 0.4s' }}>
          <span className="inline-block w-[8px] h-[8px] rounded-full animate-pulse" style={{ background: sColor }} />
          <span className="text-[13px]" style={{ color: sColor, fontWeight: 600 }}>{MONTHS_FULL[NOW]}</span>
          <span className="text-[13px] text-dwl-muted">{peakCrops.length} at peak · {nowCrops.length} in season · {season}</span>
        </div>

        <div className="flex flex-wrap gap-8 mt-8" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.8s 0.5s' }}>
          {[{ n: '32', l: 'Crops' }, { n: String(peakCrops.length), l: 'At peak now' }, { n: String(nowCrops.length), l: 'In season now' }, { n: '15+', l: 'Growing regions' }].map(s => (
            <div key={s.l}><p className="font-serif italic text-[28px]" style={{ color: sColor }}>{s.n}</p><p className="micro-label" style={{ color: E.muted }}>{s.l}</p></div>
          ))}
        </div>
      </section></div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* WHEEL */}
      <div ref={wheel.ref}><section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="flex items-baseline justify-between px-2 mb-4">
          <div>
            <p className="micro-label mb-1">The Living Wheel</p>
            <p className="text-[13px] text-dwl-muted">Each ring is one crop. Bright arcs = in season. Click any month. Or let it play.</p>
          </div>
          <button onClick={() => { setAutoPlay(!autoPlay); if (autoPlay) setActiveMonth(NOW) }}
            className="text-[11px] uppercase tracking-[0.08em] px-4 py-2 border transition-all"
            style={{ borderColor: autoPlay ? sColor : E.border, color: autoPlay ? sColor : E.muted, background: autoPlay ? `${sColor}08` : 'transparent' }}>
            {autoPlay ? '⏸ Pause' : '▶ Play Year'}
          </button>
        </div>

        <svg viewBox="0 0 800 800" className="w-full" style={{ opacity: wheel.vis ? 1 : 0, transition: 'opacity 0.8s' }}>
          <defs>
            {sorted.filter(c => inSeason(c, activeMonth) && c.peak.includes(activeMonth)).map(c => (
              <filter key={`glow-${c.name}`} id={`glow-${c.name.replace(/\s/g,'')}`}>
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            ))}
          </defs>

          {/* Month radial lines & labels */}
          {MONTHS.map((m, i) => {
            const angle = (i/12)*Math.PI*2-Math.PI/2
            const iR = INNER_R - 12
            const oR = INNER_R + sorted.length*(RING_W+GAP) + 10
            const lR = oR + 18
            const isActive = i === activeMonth
            return (<g key={m}>
              <line x1={CX+iR*Math.cos(angle)} y1={CY+iR*Math.sin(angle)} x2={CX+oR*Math.cos(angle)} y2={CY+oR*Math.sin(angle)}
                stroke={isActive ? sColor : E.border} strokeWidth={isActive ? 1.5 : 0.4} opacity={isActive ? 0.8 : 0.5} style={{ transition: 'all 0.4s' }} />
              <text x={CX+lR*Math.cos(angle)} y={CY+lR*Math.sin(angle)} textAnchor="middle" dominantBaseline="middle"
                fontSize={isActive ? 11 : 9.5} fontWeight={isActive ? 700 : 400} fill={isActive ? sColor : E.muted}
                fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.08em"
                style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                onClick={() => { setAutoPlay(false); setActiveMonth(i) }}>
                {m}
              </text>
            </g>)
          })}

          {/* Invisible click sectors */}
          {MONTHS.map((_, i) => {
            const a1 = ((i-0.5)/12)*Math.PI*2-Math.PI/2; const a2 = ((i+0.5)/12)*Math.PI*2-Math.PI/2
            const oR = INNER_R + sorted.length*(RING_W+GAP) + 10
            return <path key={`s${i}`} d={`M${CX},${CY} L${CX+oR*Math.cos(a1)},${CY+oR*Math.sin(a1)} A${oR},${oR} 0 0 1 ${CX+oR*Math.cos(a2)},${CY+oR*Math.sin(a2)} Z`}
              fill="transparent" style={{ cursor: 'pointer' }}
              onClick={() => { setAutoPlay(false); setActiveMonth(i) }} />
          })}

          {/* Crop arcs */}
          {sorted.map((crop, i) => {
            const r = INNER_R + i*(RING_W+GAP) + RING_W/2
            const isNow = inSeason(crop, activeMonth)
            const isPeak = crop.peak.includes(activeMonth)
            const isHov = hovered === crop.name
            const dimmed = !isNow && !isHov
            const filterId = isPeak ? `url(#glow-${crop.name.replace(/\s/g,'')})` : undefined
            return (<g key={crop.name}>
              <circle cx={CX} cy={CY} r={r} fill="none" stroke={E.faint} strokeWidth={RING_W} opacity={0.25} />
              <path d={arcPath(CX, CY, r, crop.start, crop.end)} fill="none" stroke={crop.color}
                strokeWidth={isPeak ? RING_W + 1 : RING_W - 0.5} strokeLinecap="round"
                opacity={dimmed ? 0.08 : isPeak ? 1 : isNow ? 0.55 : isHov ? 0.9 : 0.5}
                filter={filterId}
                style={{ transition: 'all 0.5s', cursor: 'pointer' }}
                onMouseEnter={() => setHovered(crop.name)} onMouseLeave={() => setHovered(null)} />
            </g>)
          })}

          {/* Clock hand */}
          <line x1={CX} y1={CY} x2={CX+handR*Math.cos(handAngle)} y2={CY+handR*Math.sin(handAngle)}
            stroke={sColor} strokeWidth={2} opacity={0.6} strokeLinecap="round"
            style={{ transition: 'all 0.8s ease-in-out' }} />
          <circle cx={CX+handR*Math.cos(handAngle)} cy={CY+handR*Math.sin(handAngle)} r={4} fill={sColor}
            style={{ transition: 'all 0.8s ease-in-out' }} />
          <circle cx={CX} cy={CY} r={5} fill={sColor} opacity={0.5} style={{ transition: 'fill 0.4s' }} />

          {/* Center info */}
          {hovered ? (() => {
            const c = sorted.find(s => s.name === hovered); if (!c) return null
            const isNow = inSeason(c, activeMonth); const isPeak = c.peak.includes(activeMonth)
            return (<g>
              <text x={CX} y={CY-28} textAnchor="middle" fill={c.color} fontSize="17" fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic">{c.name}</text>
              <text x={CX} y={CY-10} textAnchor="middle" fill={E.muted} fontSize="11" fontFamily="var(--font-plex-mono), monospace">{c.darija}</text>
              <text x={CX} y={CY+8} textAnchor="middle" fill={E.muted} fontSize="10" fontFamily="var(--font-plex-mono), monospace">{c.region}</text>
              <text x={CX} y={CY+24} textAnchor="middle" fill={isPeak ? c.color : isNow ? E.sage : E.muted} fontSize="10" fontWeight={600} fontFamily="var(--font-plex-mono), monospace">
                {isPeak ? '● AT PEAK' : isNow ? '○ IN SEASON' : '— NOT IN SEASON'}
              </text>
              {c.export && <text x={CX} y={CY+40} textAnchor="middle" fill={E.muted} fontSize="9" fontFamily="var(--font-plex-mono), monospace">{c.export}</text>}
            </g>)
          })() : (
            <g>
              <text x={CX} y={CY-20} textAnchor="middle" fill={sColor} fontSize="22" fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic">{MONTHS_FULL[activeMonth]}</text>
              <text x={CX} y={CY+2} textAnchor="middle" fill={E.muted} fontSize="11" fontFamily="var(--font-plex-mono), monospace">{peakCrops.length} at peak · {nowCrops.length} total</text>
              <text x={CX} y={CY+18} textAnchor="middle" fill={sColor} fontSize="10" fontFamily="var(--font-plex-mono), monospace" opacity={0.6}>{season}</text>
              {activeMonth === NOW && <text x={CX} y={CY+34} textAnchor="middle" fill={E.sage} fontSize="9" fontFamily="var(--font-plex-mono), monospace">● NOW</text>}
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 px-2 mt-2">
          {Object.values(CAT_LABELS).map(v => (<div key={v.label} className="flex items-center gap-2"><div className="w-5 h-1" style={{ background: v.color, borderRadius: 1 }} /><span className="text-[11px]" style={{ color: E.muted }}>{v.label}</span></div>))}
        </div>
      </section></div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* WHAT'S IN SEASON NOW — DETAIL GRID */}
      <div ref={grid.ref}><section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="flex items-baseline gap-4 mb-2">
          <p className="micro-label">In Season — {MONTHS_FULL[activeMonth]}</p>
          {activeMonth === NOW && <div className="flex items-center gap-2"><span className="inline-block w-[6px] h-[6px] rounded-full bg-green-500 animate-pulse" /><span className="text-[11px] text-dwl-muted">Live</span></div>}
        </div>
        <p className="text-[15px] text-dwl-gray mb-8 max-w-[500px]">{peakCrops.length} crops at their absolute best. {availCrops.length} more available but not yet at peak.</p>

        {/* Peak crops */}
        {peakCrops.length > 0 && <>
          <p className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted mb-4">At Peak</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8" style={{ opacity: grid.vis ? 1 : 0, transition: 'opacity 0.6s' }}>
            {peakCrops.map((c, i) => (
              <div key={c.name} className="p-4 border-2 transition-all" style={{ borderColor: c.color, opacity: grid.vis ? 1 : 0, transform: grid.vis ? 'none' : 'translateY(12px)', transition: `all 0.4s ${i*0.04}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif italic text-[18px]" style={{ color: c.color }}>{c.name}</span>
                  <span className="w-[8px] h-[8px] rounded-full animate-pulse" style={{ background: c.color }} />
                </div>
                <div className="text-[12px] text-dwl-muted mb-1">{c.darija}</div>
                <div className="text-[11px] text-dwl-gray">{c.region}</div>
                {c.export && <div className="text-[10px] mt-2 pt-2 border-t border-dwl-border" style={{ color: c.color }}>{c.export}</div>}
              </div>
            ))}
          </div>
        </>}

        {/* Available crops */}
        {availCrops.length > 0 && <>
          <p className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted mb-4">Also Available</p>
          <div className="flex flex-wrap gap-2" style={{ opacity: grid.vis ? 1 : 0, transition: 'opacity 0.6s 0.3s' }}>
            {availCrops.map(c => (
              <div key={c.name} className="flex items-center gap-2 px-3 py-2 border border-dwl-border">
                <div className="w-2 h-2 rounded-full" style={{ background: c.color, opacity: 0.5 }} />
                <span className="text-[12px] text-dwl-gray">{c.name}</span>
                <span className="text-[10px] text-dwl-muted">({c.darija})</span>
              </div>
            ))}
          </div>
        </>}

        {/* Not in season */}
        {(() => {
          const out = sorted.filter(c => !inSeason(c, activeMonth))
          if (out.length === 0) return null
          return <>
            <p className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted mt-8 mb-3">Not in Season</p>
            <div className="flex flex-wrap gap-2">
              {out.map(c => (<span key={c.name} className="text-[11px] px-2 py-1 text-dwl-muted" style={{ background: E.faint }}>{c.name}</span>))}
            </div>
          </>
        })()}

        {/* Month selector strip */}
        <div className="mt-10 pt-6 border-t border-dwl-border">
          <p className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted mb-3">Jump to Month</p>
          <div className="flex gap-1">
            {MONTHS.map((m, i) => {
              const count = sorted.filter(c => inSeason(c, i)).length
              const isNow = i === NOW; const isActive = i === activeMonth
              return (
                <button key={m} onClick={() => { setAutoPlay(false); setActiveMonth(i) }}
                  className="flex-1 py-3 text-center transition-all relative"
                  style={{
                    background: isActive ? E.ink : 'transparent',
                    color: isActive ? '#fff' : isNow ? E.sage : E.muted,
                    border: `1px solid ${isActive ? E.ink : isNow ? E.sage : E.border}`,
                  }}>
                  <div className="text-[10px] font-medium">{m}</div>
                  <div className="text-[9px] mt-0.5 opacity-60">{count}</div>
                  {isNow && !isActive && <div className="absolute top-1 right-1 w-[4px] h-[4px] rounded-full bg-green-500" />}
                </button>
              )
            })}
          </div>
        </div>
      </section></div>

      {/* READING NOTES */}
      <div ref={notes.ref}><section className="bg-[#f5f5f5]"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-8">Reading Notes</p>
        <div className="space-y-10 max-w-[640px]">
          <div style={{ opacity: notes.vis ? 1 : 0, transition: 'opacity 0.6s' }}>
            <h3 className="font-serif text-[22px] text-dwl-black">The Six-Year Drought</h3>
            <p className="text-[15px] text-dwl-gray leading-relaxed mt-3">Morocco is in its sixth consecutive year of below-average rainfall. Cereal production in 2023/24 fell 43% from the year before. The government now imports nearly 11 million tonnes of grain annually. The crops on this wheel that survive — citrus, olives, dates — are the drought-resistant backbone. The ones that don't — wheat, barley — are the imports that keep the country fed.</p>
          </div>
          <div style={{ opacity: notes.vis ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}>
            <h3 className="font-serif text-[22px] text-dwl-black">The Souss Valley Machine</h3>
            <p className="text-[15px] text-dwl-gray leading-relaxed mt-3">The Souss-Massa region around Agadir produces the majority of Morocco's vegetable exports. Industrial greenhouses stretch for kilometres, growing tomatoes, peppers, and courgettes year-round for European supermarkets. This calendar shows natural outdoor seasons — when crops taste best and cost least at the local <span className="underline underline-offset-2">souk</span>. The greenhouse versions are available always, but they're not the same thing.</p>
          </div>
          <div style={{ opacity: notes.vis ? 1 : 0, transition: 'opacity 0.6s 0.4s' }}>
            <h3 className="font-serif text-[22px] text-dwl-black">Khobiza — The Invisible Staple</h3>
            <p className="text-[15px] text-dwl-gray leading-relaxed mt-3">Wild mallow. Foraged from roadsides and fields from November to April. No tourist guide mentions it. Every Moroccan family knows it. Cooked into a thick, silky green dish that feeds households through winter. It doesn't appear on export lists or agricultural reports. It appears on this wheel because food intelligence means tracking what people actually eat, not just what countries sell.</p>
          </div>
        </div>
      </div></section></div>

      {/* CLOSING */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <blockquote className="font-serif text-[clamp(1.3rem,3.5vw,1.8rem)] text-dwl-black leading-[1.4] max-w-[680px]">
          "In Marrakech the fruit changes faster than the weather. You learn the calendar not from dates
          but from what's piled highest at the souk entrance. Strawberries mean it's March. Watermelons mean school is out. Pomegranates mean the heat is broken. Oranges mean the year is turning again."
        </blockquote>
      </section>

      {/* SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="border-t border-dwl-border"><div style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
        <p className="micro-label mb-4">Sources & Attribution</p>
        <p className="text-[12px] text-dwl-muted leading-relaxed max-w-[640px]">Seasonal availability data compiled from Ministère de l'Agriculture, de la Pêche Maritime, du Développement Rural et des Eaux et Forêts; ORMVA regional agricultural development offices; FAO country profiles; USDA GAIN reports (Morocco Grain and Feed Annual 2024); Global Yield Gap Atlas (Morocco); and direct market observation in Marrakech, Fes, and Agadir souks (2020–2026). Darija names verified through field usage. Growing regions based on MAPMDREF agricultural zone classifications. Drought and import data: DEPF (Direction des Études et des Prévisions Financières), ONICL. Export figures: Morocco World News, AgriSource Morocco.</p>
        <p className="text-[11px] text-dwl-muted mt-4">© Slow Morocco · slowmorocco.com · Data may not be reproduced without attribution.</p>
      </div></section>
    </div>
  )
}
