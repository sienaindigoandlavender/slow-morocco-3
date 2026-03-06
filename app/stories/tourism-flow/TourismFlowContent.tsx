'use client'

import { useState, useEffect, useMemo } from 'react'

// ═══ DATA (2024) ═══

// Source markets → share of 8.8M foreign tourists (excludes 8.6M MRE diaspora)
const SOURCES = [
  { id: 'france', label: 'France', value: 2400, color: '#48BFE3' },
  { id: 'spain', label: 'Spain', value: 1500, color: '#F77F00' },
  { id: 'uk', label: 'United Kingdom', value: 1000, color: '#E63946' },
  { id: 'germany', label: 'Germany', value: 800, color: '#FCBF49' },
  { id: 'italy', label: 'Italy', value: 600, color: '#72EFDD' },
  { id: 'usa', label: 'United States', value: 400, color: '#5E60CE' },
  { id: 'belgium', label: 'Belgium', value: 350, color: '#F4845F' },
  { id: 'netherlands', label: 'Netherlands', value: 300, color: '#64DFDF' },
  { id: 'gulf', label: 'Gulf States', value: 250, color: '#7B2D8E' },
  { id: 'other', label: 'Other', value: 1200, color: '#525252' },
]

// MRE (Moroccans Residing Abroad) as separate category
const MRE = { id: 'mre', label: 'Moroccan Diaspora', value: 8600, color: '#3A0CA3' }

// Gateway airports (pax in thousands, 2024 estimates based on 2023 + growth)
const GATEWAYS = [
  { id: 'cmn', label: 'Casablanca CMN', value: 10500, color: '#E63946' },
  { id: 'rak', label: 'Marrakech RAK', value: 7800, color: '#F77F00' },
  { id: 'aga', label: 'Agadir AGA', value: 2800, color: '#FCBF49' },
  { id: 'tng', label: 'Tangier TNG', value: 2200, color: '#48BFE3' },
  { id: 'fez', label: 'Fes FEZ', value: 2000, color: '#72EFDD' },
  { id: 'ports', label: 'Sea Ports', value: 3100, color: '#5E60CE' },
]

// Destination cities (overnight stays share, 2024: 28.7M total)
const DESTINATIONS = [
  { id: 'marrakech', label: 'Marrakech', value: 11500, pct: '40%', color: '#E63946' },
  { id: 'agadir', label: 'Agadir', value: 5700, pct: '20%', color: '#F77F00' },
  { id: 'casablanca', label: 'Casablanca', value: 3200, pct: '11%', color: '#FCBF49' },
  { id: 'tangier', label: 'Tangier', value: 1700, pct: '6%', color: '#48BFE3' },
  { id: 'fes', label: 'Fes', value: 1400, pct: '5%', color: '#72EFDD' },
  { id: 'rabat', label: 'Rabat', value: 1100, pct: '4%', color: '#64DFDF' },
  { id: 'essaouira', label: 'Essaouira', value: 900, pct: '3%', color: '#F4845F' },
  { id: 'other_dest', label: 'Other', value: 3200, pct: '11%', color: '#525252' },
]

// Revenue breakdown (MAD billions, 2024: 112B total)
const REVENUE = [
  { label: 'Accommodation', value: 33.6, pct: '30%', color: '#E63946' },
  { label: 'Food & Drink', value: 22.4, pct: '20%', color: '#F77F00' },
  { label: 'Transport', value: 16.8, pct: '15%', color: '#FCBF49' },
  { label: 'Shopping & Souks', value: 14.6, pct: '13%', color: '#72EFDD' },
  { label: 'Activities & Tours', value: 12.3, pct: '11%', color: '#48BFE3' },
  { label: 'Other', value: 12.3, pct: '11%', color: '#525252' },
]

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

// ═══ SANKEY HELPERS ═══

interface FlowLink {
  source: string
  target: string
  value: number
  color: string
}

// Build flow links from sources to gateways (simplified distribution)
function buildSourceToGateway(): FlowLink[] {
  // Rough distribution: France heavy to CMN/RAK, Spain to TNG/RAK, UK to RAK/AGA, etc.
  const flows: FlowLink[] = []
  const dist: Record<string, Record<string, number>> = {
    france: { cmn: 0.35, rak: 0.35, aga: 0.1, tng: 0.05, fez: 0.1, ports: 0.05 },
    spain: { cmn: 0.15, rak: 0.2, aga: 0.1, tng: 0.3, fez: 0.05, ports: 0.2 },
    uk: { cmn: 0.1, rak: 0.5, aga: 0.25, tng: 0.05, fez: 0.05, ports: 0.05 },
    germany: { cmn: 0.15, rak: 0.45, aga: 0.2, tng: 0.05, fez: 0.1, ports: 0.05 },
    italy: { cmn: 0.2, rak: 0.4, aga: 0.15, tng: 0.1, fez: 0.1, ports: 0.05 },
    usa: { cmn: 0.5, rak: 0.35, aga: 0.05, tng: 0.02, fez: 0.05, ports: 0.03 },
    belgium: { cmn: 0.3, rak: 0.3, aga: 0.15, tng: 0.1, fez: 0.1, ports: 0.05 },
    netherlands: { cmn: 0.25, rak: 0.35, aga: 0.2, tng: 0.05, fez: 0.1, ports: 0.05 },
    gulf: { cmn: 0.5, rak: 0.3, aga: 0.05, tng: 0.05, fez: 0.05, ports: 0.05 },
    other: { cmn: 0.3, rak: 0.3, aga: 0.1, tng: 0.1, fez: 0.1, ports: 0.1 },
    mre: { cmn: 0.3, rak: 0.15, aga: 0.1, tng: 0.15, fez: 0.1, ports: 0.2 },
  }

  const allSources = [...SOURCES, MRE]
  for (const s of allSources) {
    const d = dist[s.id]
    if (!d) continue
    for (const [gw, pct] of Object.entries(d)) {
      if (pct > 0) {
        flows.push({ source: s.id, target: gw, value: Math.round(s.value * pct), color: s.color })
      }
    }
  }
  return flows
}

function buildGatewayToDestination(): FlowLink[] {
  const flows: FlowLink[] = []
  const dist: Record<string, Record<string, number>> = {
    cmn: { casablanca: 0.3, marrakech: 0.3, rabat: 0.15, fes: 0.1, other_dest: 0.15 },
    rak: { marrakech: 0.7, essaouira: 0.1, agadir: 0.1, other_dest: 0.1 },
    aga: { agadir: 0.7, marrakech: 0.15, essaouira: 0.05, other_dest: 0.1 },
    tng: { tangier: 0.5, fes: 0.15, marrakech: 0.15, other_dest: 0.2 },
    fez: { fes: 0.6, marrakech: 0.15, other_dest: 0.25 },
    ports: { tangier: 0.4, casablanca: 0.2, agadir: 0.1, other_dest: 0.3 },
  }

  for (const gw of GATEWAYS) {
    const d = dist[gw.id]
    if (!d) continue
    for (const [dest, pct] of Object.entries(d)) {
      if (pct > 0) {
        flows.push({ source: gw.id, target: dest, value: Math.round(gw.value * pct), color: gw.color })
      }
    }
  }
  return flows
}

// ═══ SANKEY COLUMN COMPONENT ═══

interface NodeLayout {
  id: string
  label: string
  y: number
  height: number
  color: string
  value: number
}

function layoutNodes(
  items: { id: string; label: string; value: number; color: string }[],
  totalHeight: number,
  gap: number
): NodeLayout[] {
  const total = items.reduce((s, i) => s + i.value, 0)
  const availableHeight = totalHeight - gap * (items.length - 1)
  let y = 0
  return items.map((item) => {
    const height = Math.max(4, (item.value / total) * availableHeight)
    const node: NodeLayout = { id: item.id, label: item.label, y, height, color: item.color, value: item.value }
    y += height + gap
    return node
  })
}

// ═══ COMPONENT ═══

export function TourismFlowContent() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [sankeyRef, sankeyVisible] = useInView(0.1)
  const [revenueRef, revenueVisible] = useInView(0.15)
  const [heroRef, heroVisible] = useInView(0.1)

  // Sankey dimensions
  const W = 1100
  const H = 700
  const COL_W = 18
  const GAP = 4
  const COLS = [50, 420, 790] // x positions for source, gateway, destination columns

  // Layout nodes
  const allSources = [...SOURCES, MRE]
  const sourceNodes = useMemo(() => layoutNodes(allSources, H, GAP), [])
  const gatewayNodes = useMemo(() => layoutNodes(GATEWAYS, H, GAP), [])
  const destNodes = useMemo(() => layoutNodes(DESTINATIONS, H, GAP), [])

  // Build flows
  const flows1 = useMemo(() => buildSourceToGateway(), [])
  const flows2 = useMemo(() => buildGatewayToDestination(), [])

  // Track cumulative offsets for stacking flows at each node
  const renderFlows = useMemo(() => {
    const sourceOffsets: Record<string, number> = {}
    const gatewayInOffsets: Record<string, number> = {}
    const gatewayOutOffsets: Record<string, number> = {}
    const destOffsets: Record<string, number> = {}

    // Initialize
    for (const n of sourceNodes) sourceOffsets[n.id] = n.y
    for (const n of gatewayNodes) { gatewayInOffsets[n.id] = n.y; gatewayOutOffsets[n.id] = n.y }
    for (const n of destNodes) destOffsets[n.id] = n.y

    const totalSource = allSources.reduce((s, i) => s + i.value, 0)
    const totalGateway = GATEWAYS.reduce((s, i) => s + i.value, 0)
    const totalDest = DESTINATIONS.reduce((s, i) => s + i.value, 0)

    const availH1 = H - GAP * (allSources.length - 1)
    const availH2 = H - GAP * (GATEWAYS.length - 1)
    const availH3 = H - GAP * (DESTINATIONS.length - 1)

    // Render flow paths for stage 1
    const paths1 = flows1.map((f, i) => {
      const sNode = sourceNodes.find(n => n.id === f.source)
      const tNode = gatewayNodes.find(n => n.id === f.target)
      if (!sNode || !tNode) return null

      const thickness = Math.max(1, (f.value / totalSource) * availH1)
      const sy = sourceOffsets[f.source]
      const ty = gatewayInOffsets[f.target]

      sourceOffsets[f.source] += thickness
      gatewayInOffsets[f.target] += thickness

      const x1 = COLS[0] + COL_W
      const x2 = COLS[1]
      const mx = (x1 + x2) / 2

      return {
        key: `s1-${i}`,
        d: `M${x1},${sy} C${mx},${sy} ${mx},${ty} ${x2},${ty} L${x2},${ty + thickness} C${mx},${ty + thickness} ${mx},${sy + thickness} ${x1},${sy + thickness} Z`,
        color: f.color,
        source: f.source,
        target: f.target,
        value: f.value,
      }
    }).filter(Boolean)

    // Render flow paths for stage 2
    const paths2 = flows2.map((f, i) => {
      const sNode = gatewayNodes.find(n => n.id === f.source)
      const tNode = destNodes.find(n => n.id === f.target)
      if (!sNode || !tNode) return null

      const thickness = Math.max(1, (f.value / totalGateway) * availH2)
      const sy = gatewayOutOffsets[f.source]
      const ty = destOffsets[f.target]

      gatewayOutOffsets[f.source] += thickness
      destOffsets[f.target] += thickness

      const x1 = COLS[1] + COL_W
      const x2 = COLS[2]
      const mx = (x1 + x2) / 2

      return {
        key: `s2-${i}`,
        d: `M${x1},${sy} C${mx},${sy} ${mx},${ty} ${x2},${ty} L${x2},${ty + thickness} C${mx},${ty + thickness} ${mx},${sy + thickness} ${x1},${sy + thickness} Z`,
        color: f.color,
        source: f.source,
        target: f.target,
        value: f.value,
      }
    }).filter(Boolean)

    return { paths1, paths2 }
  }, [sourceNodes, gatewayNodes, destNodes, flows1, flows2])

  // Determine if a flow is highlighted
  const isHighlighted = (path: { source: string; target: string }) => {
    if (!hovered) return true
    return path.source === hovered || path.target === hovered
  }

  return (
    <div className="bg-white text-white min-h-screen pt-16">

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="px-8 md:px-[8%] lg:px-[12%] pt-20 pb-12">
        <p className="micro-label text-[#555] mb-2">Module 007 · Tourism Intelligence</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.02em] mb-4">
          <em>Where 17.4 Million<br />Tourists Go</em>
        </h1>
        <p className="text-[13px] text-[#666] max-w-[560px] leading-[1.7] mb-8">
          Follow the flow. From source country to airport to destination city.
          In 2024, Morocco became Africa&apos;s most-visited nation — surpassing Egypt for the first time.
          Tourism revenue hit 112 billion MAD ($11.3B), up 43% from pre-pandemic levels.
        </p>

        {/* Key stats */}
        <div className="flex flex-wrap gap-8" style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          {[
            { n: '17.4M', l: 'Total visitors', c: '#E63946' },
            { n: '8.8M', l: 'Foreign tourists', c: '#48BFE3' },
            { n: '8.6M', l: 'Moroccan diaspora', c: '#3A0CA3' },
            { n: '112B', l: 'MAD revenue', c: '#FCBF49' },
            { n: '28.7M', l: 'Overnight stays', c: '#72EFDD' },
            { n: '+20%', l: 'YoY growth', c: '#F77F00' },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-serif italic text-[28px]" style={{ color: s.c }}>{s.n}</p>
              <p className="micro-label text-[#555]">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SANKEY DIAGRAM ═══ */}
      <section ref={sankeyRef} className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="border-t border-white/[0.06] pt-8 mb-4">
          <p className="micro-label text-[#444] mb-1 px-2">The Flow</p>
          <p className="font-serif italic text-[20px] text-white/50 mb-2 px-2">
            Source country → Gateway → Destination
          </p>
          <p className="text-[11px] text-white/20 px-2 mb-4">
            Hover any node to trace its connections. Width encodes volume.
          </p>
        </div>

        <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <svg
            viewBox={`0 0 ${W} ${H + 40}`}
            className="w-full min-w-[800px] h-auto"
            style={{ opacity: sankeyVisible ? 1 : 0, transition: 'opacity 0.8s ease' }}
          >
            <defs>
              {/* Gradient for flows */}
              {[...allSources, ...GATEWAYS, ...DESTINATIONS].map(item => (
                <linearGradient key={`grad-${item.id}`} id={`grad-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={item.color} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={item.color} stopOpacity="0.15" />
                </linearGradient>
              ))}
            </defs>

            {/* Column headers */}
            <text x={COLS[0] + COL_W / 2} y={-2} textAnchor="middle" fill="#555" fontSize="9" fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.1em">SOURCE COUNTRY</text>
            <text x={COLS[1] + COL_W / 2} y={-2} textAnchor="middle" fill="#555" fontSize="9" fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.1em">GATEWAY</text>
            <text x={COLS[2] + COL_W / 2} y={-2} textAnchor="middle" fill="#555" fontSize="9" fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.1em">DESTINATION</text>

            <g transform="translate(0, 20)">
              {/* Flow paths stage 1 */}
              {renderFlows.paths1.map((p) => p && (
                <path
                  key={p.key}
                  d={p.d}
                  fill={p.color}
                  opacity={isHighlighted(p) ? 0.25 : 0.04}
                  style={{ transition: 'opacity 0.3s ease' }}
                />
              ))}

              {/* Flow paths stage 2 */}
              {renderFlows.paths2.map((p) => p && (
                <path
                  key={p.key}
                  d={p.d}
                  fill={p.color}
                  opacity={isHighlighted(p) ? 0.25 : 0.04}
                  style={{ transition: 'opacity 0.3s ease' }}
                />
              ))}

              {/* Source nodes */}
              {sourceNodes.map((n) => (
                <g
                  key={n.id}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={COLS[0]} y={n.y} width={COL_W} height={n.height}
                    fill={n.color}
                    opacity={!hovered || hovered === n.id ? 1 : 0.2}
                    style={{ transition: 'opacity 0.3s ease' }}
                    rx="2"
                  />
                  <text
                    x={COLS[0] - 6} y={n.y + n.height / 2}
                    textAnchor="end" dominantBaseline="middle"
                    fill={!hovered || hovered === n.id ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)'}
                    fontSize="10"
                    fontFamily="var(--font-plex-mono), monospace"
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {n.label}
                  </text>
                  {n.height > 14 && (
                    <text
                      x={COLS[0] - 6} y={n.y + n.height / 2 + 12}
                      textAnchor="end" dominantBaseline="middle"
                      fill={!hovered || hovered === n.id ? n.color : 'rgba(255,255,255,0.08)'}
                      fontSize="9"
                      fontFamily="'Instrument Serif', Georgia, serif"
                      fontStyle="italic"
                      style={{ transition: 'fill 0.3s ease' }}
                    >
                      {(n.value / 1000).toFixed(1)}M
                    </text>
                  )}
                </g>
              ))}

              {/* Gateway nodes */}
              {gatewayNodes.map((n) => (
                <g
                  key={n.id}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={COLS[1]} y={n.y} width={COL_W} height={n.height}
                    fill={n.color}
                    opacity={!hovered || hovered === n.id ? 1 : 0.2}
                    style={{ transition: 'opacity 0.3s ease' }}
                    rx="2"
                  />
                  <text
                    x={COLS[1] + COL_W / 2} y={n.y + n.height / 2 - 6}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={!hovered || hovered === n.id ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)'}
                    fontSize="9"
                    fontFamily="var(--font-plex-mono), monospace"
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {n.label.split(' ')[0]}
                  </text>
                  <text
                    x={COLS[1] + COL_W / 2} y={n.y + n.height / 2 + 7}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={!hovered || hovered === n.id ? n.color : 'rgba(255,255,255,0.08)'}
                    fontSize="9"
                    fontFamily="'Instrument Serif', Georgia, serif"
                    fontStyle="italic"
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {(n.value / 1000).toFixed(1)}M pax
                  </text>
                </g>
              ))}

              {/* Destination nodes */}
              {destNodes.map((n) => (
                <g
                  key={n.id}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={COLS[2]} y={n.y} width={COL_W} height={n.height}
                    fill={n.color}
                    opacity={!hovered || hovered === n.id ? 1 : 0.2}
                    style={{ transition: 'opacity 0.3s ease' }}
                    rx="2"
                  />
                  <text
                    x={COLS[2] + COL_W + 6} y={n.y + n.height / 2}
                    textAnchor="start" dominantBaseline="middle"
                    fill={!hovered || hovered === n.id ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)'}
                    fontSize="10"
                    fontFamily="var(--font-plex-mono), monospace"
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {n.label}
                  </text>
                  {n.height > 14 && (
                    <text
                      x={COLS[2] + COL_W + 6} y={n.y + n.height / 2 + 12}
                      textAnchor="start" dominantBaseline="middle"
                      fill={!hovered || hovered === n.id ? n.color : 'rgba(255,255,255,0.08)'}
                      fontSize="9"
                      fontFamily="'Instrument Serif', Georgia, serif"
                      fontStyle="italic"
                      style={{ transition: 'fill 0.3s ease' }}
                    >
                      {(DESTINATIONS.find(d => d.id === n.id) || { pct: '' }).pct} of stays
                    </text>
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>
      </section>

      {/* ═══ THE SPLIT ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-12">
        <div className="border-t border-white/[0.06] pt-8">
          <p className="micro-label text-[#444] mb-1">The 51/49 Split</p>
          <p className="font-serif italic text-[20px] text-white/50 mb-6">
            Half foreign. Half family coming home.
          </p>
          <div className="h-8 flex overflow-hidden mb-3">
            <div
              className="h-full flex items-center justify-center text-[10px] font-medium"
              style={{
                width: '51%',
                background: 'linear-gradient(90deg, #48BFE3, #48BFE388)',
                transition: 'width 1s ease',
              }}
            >
              8.8M FOREIGN TOURISTS (51%)
            </div>
            <div
              className="h-full flex items-center justify-center text-[10px] font-medium"
              style={{
                width: '49%',
                background: 'linear-gradient(90deg, #3A0CA3, #3A0CA388)',
                transition: 'width 1s ease',
              }}
            >
              8.6M MOROCCAN DIASPORA (49%)
            </div>
          </div>
          <p className="text-[11px] text-white/25">
            The diaspora segment — Moroccans residing in France, Spain, Belgium, Italy, Netherlands — is the hidden half.
            They drive summer peaks, fill family riads, and spend on weddings and renovations that don&apos;t show up in hotel stats.
          </p>
        </div>
      </section>

      {/* ═══ BIG FACT ═══ */}
      <section className="mt-16" style={{ background: 'linear-gradient(135deg, rgba(230,57,70,0.2) 0%, rgba(10,10,10,1) 60%)' }}>
        <div className="max-w-[650px] mx-auto px-6 py-16 text-center">
          <p className="font-serif italic text-[clamp(1.3rem,4vw,2.2rem)] text-white leading-[1.3]">
            Marrakech alone accounts for 40% of all overnight stays. One city. Four out of every ten hotel nights in the entire country.
          </p>
          <p className="text-[10px] text-white/50 mt-4">
            28.7 million overnight stays recorded in 2024. +12% over 2023.
          </p>
        </div>
      </section>

      {/* ═══ REVENUE BREAKDOWN ═══ */}
      <section ref={revenueRef} className="px-8 md:px-[8%] lg:px-[12%] pt-12">
        <div className="border-t border-white/[0.06] pt-8">
          <p className="micro-label text-[#444] mb-1">Where the Money Goes</p>
          <p className="font-serif italic text-[20px] text-white/50 mb-6">
            112 billion MAD ($11.3B) spent in 2024
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {REVENUE.map((r, i) => (
              <div
                key={r.label}
                className="py-4 border-t border-white/[0.06]"
                style={{
                  opacity: revenueVisible ? 1 : 0,
                  transition: `opacity 0.5s ease ${i * 100}ms`,
                }}
              >
                <p className="font-serif italic text-[32px] leading-none mb-1" style={{ color: r.color }}>
                  {r.value}B
                </p>
                <p className="text-[11px] text-white/50">{r.label}</p>
                <p className="micro-label text-white/25 mt-1">{r.pct} of total · MAD</p>
              </div>
            ))}
          </div>

          {/* Revenue proportional bar */}
          <div className="h-6 flex overflow-hidden">
            {REVENUE.map((r) => (
              <div
                key={r.label}
                className="h-full flex items-center justify-center text-[8px] text-white/60 font-medium"
                style={{
                  width: `${(r.value / 112) * 100}%`,
                  background: r.color,
                  opacity: 0.7,
                }}
              >
                {parseFloat(r.pct) >= 13 ? r.label : ''}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/20 mt-2">
            Revenue estimates based on WTTC Morocco sector analysis and Ministry of Tourism data. Accommodation includes hotels, riads, guesthouses, and vacation rentals.
          </p>
        </div>
      </section>

      {/* ═══ GROWTH CONTEXT ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-12">
        <div className="border-t border-white/[0.06] pt-8">
          <p className="micro-label text-[#444] mb-1">The Trajectory</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            <div>
              <p className="micro-label text-[#444] mb-2">Air Connectivity</p>
              <p className="text-[12px] text-white/50 leading-[1.6]">
                120 new international routes added in 2024. Total: 705.
                Ryanair alone added 325,000 seats and 24 new routes from Western Europe.
                Delta launching Atlanta→Marrakech in October 2025.
              </p>
            </div>
            <div>
              <p className="micro-label text-[#444] mb-2">2030 World Cup Effect</p>
              <p className="text-[12px] text-white/50 leading-[1.6]">
                Co-hosting with Spain and Portugal. Target: 26 million visitors by 2030.
                Airport capacity expanding from 38M to 80M passengers by 2035.
                Marrakech airport upgrading to 14M capacity.
              </p>
            </div>
            <div>
              <p className="micro-label text-[#444] mb-2">The LCC Revolution</p>
              <p className="text-[12px] text-white/50 leading-[1.6]">
                Ryanair granted cabotage rights — first foreign carrier on domestic routes.
                11 domestic routes launched. easyJet, Transavia, Jet2, Wizz Air all expanding.
                UK seat capacity up 45% year-on-year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SHARE & EMBED ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-12">
        <div className="border-t border-white/[0.06] pt-8">
          <p className="micro-label text-[#444] mb-1">Share & Embed</p>
          <p className="font-serif italic text-[20px] text-white/50 mb-6">
            Use this visualization on your website or share it
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#444] mb-3">Share</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Where 17.4 million tourists go in Morocco — interactive flow visualization')}&url=${encodeURIComponent('https://www.slowmorocco.com/stories/tourism-flow')}` },
                  { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.slowmorocco.com/stories/tourism-flow')}` },
                  { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.slowmorocco.com/stories/tourism-flow')}` },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 text-[11px] text-white/60 border border-white/10 hover:border-white/30 hover:text-[#1C1917]/70 transition-all">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#444] mb-3">Embed on your website</p>
              <pre className="text-[10px] text-white/25 bg-white/[0.03] p-4 overflow-x-auto leading-relaxed" style={{ scrollbarWidth: 'none' as const }}>
{`<iframe src="https://www.slowmorocco.com/stories/tourism-flow/embed" width="100%" height="400" style="border:none;border-radius:4px;" title="Morocco Tourism Flow" loading="lazy"></iframe>
<p style="font-size:11px;color:#888;margin-top:4px;">Source: <a href="https://www.slowmorocco.com/stories/tourism-flow" style="color:#888;">Slow Morocco</a></p>`}
              </pre>
              <p className="text-[9px] text-white/15 mt-2">
                Free to embed with attribution. The &ldquo;© Slow Morocco&rdquo; credit must remain visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t border-white/[0.06] pt-4">
          <p className="micro-label text-[#333] mb-2">Sources & Methodology</p>
          <p className="text-[11px] text-white/20 leading-[1.6] max-w-[700px]">
            Visitor arrivals: Ministère du Tourisme, de l&apos;Artisanat et de l&apos;Économie Sociale et Solidaire (January 2025).
            Airport passenger data: ONDA (Office National Des Aéroports), 2024 annual report.
            Revenue: Office des Changes, Bank Al-Maghrib.
            Overnight stays: Observatoire du Tourisme, 2024 full year.
            Gateway-to-destination and spending distribution estimated from Ministry reports, WTTC Morocco profile, and OAG aviation data.
            Diaspora split: 51% foreign / 49% MRE per Ministry statement.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px] text-white/20">
              © {new Date().getFullYear()} Slow Morocco. All rights reserved. This visualization may not be reproduced without visible attribution.
            </p>
            <p className="font-serif italic text-[12px] text-[#E63946]">
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
