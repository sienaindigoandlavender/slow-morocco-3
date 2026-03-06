'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

// ═══ DATA ═══
const CROPS = [
  { name: 'Seafood', value: 3000, unit: '$3B', detail: 'Sardines, octopus, shrimp', note: "World's largest sardine exporter", region: 'Agadir · Dakhla · Essaouira', color: '#2B8EAD', colorEnd: '#1a5c72', iconColor: '#5BC0DE' },
  { name: 'Tomatoes', value: 1050, unit: '$1.05B', detail: '60% of vegetable exports', note: '#1 non-EU supplier to Europe', region: 'Souss-Massa', color: '#C62828', colorEnd: '#7f1d1d', iconColor: '#EF5350' },
  { name: 'Berries', value: 750, unit: '$750M', detail: 'Blueberries · raspberries · strawberries', note: '60% of fruit export growth since 2016', region: 'Gharb · Loukkos · Dakhla', color: '#6A1B9A', colorEnd: '#38006b', iconColor: '#AB47BC' },
  { name: 'Citrus', value: 451, unit: '$451M', detail: 'Clementines · oranges · mandarins', note: '597K tons 2024/25 season', region: 'Souss-Massa · Gharb · Oriental', color: '#E65100', colorEnd: '#8c3100', iconColor: '#FF9800' },
  { name: 'Olives', value: 380, unit: '$380M', detail: 'Oil + table olives · 1M+ hectares', note: '6th largest producer globally', region: 'Fes-Meknes · Marrakech-Safi', color: '#558B2F', colorEnd: '#2e5a00', iconColor: '#8BC34A' },
  { name: 'Green Beans', value: 220, unit: '$220M', detail: '#2 vegetable export to EU', note: 'Fresh market, year-round supply', region: 'Souss-Massa', color: '#2E7D32', colorEnd: '#1b4d1f', iconColor: '#66BB6A' },
  { name: 'Argan Oil', value: 120, unit: '$120M', detail: 'Endemic to Morocco only', note: 'UNESCO-protected argan forest', region: 'Souss-Massa · Essaouira', color: '#BF8C30', colorEnd: '#7a5a1e', iconColor: '#FFD54F' },
  { name: 'Avocados', value: 95, unit: '$95M', detail: 'Fastest-growing export crop', note: 'Water-intensive — debated', region: 'Gharb · Kenitra', color: '#33691E', colorEnd: '#1a3a0f', iconColor: '#9CCC65' },
]

const TOTAL = CROPS.reduce((s, c) => s + c.value, 0)

// ═══ SVG CROP ICONS ═══
// Each drawn at origin, positioned by the radial layout

function TomatoIcon({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size / 40})`}>
      <circle cx="0" cy="4" r="16" fill="#EF5350" />
      <circle cx="0" cy="4" r="16" fill="url(#glow-red)" />
      <ellipse cx="0" cy="-10" rx="8" ry="3" fill="#4CAF50" opacity="0.9" />
      <line x1="0" y1="-13" x2="-2" y2="-20" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="-13" x2="2" y2="-19" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="-5" cy="-1" rx="3" ry="5" fill="rgba(255,255,255,0.12)" transform="rotate(-15)" />
    </g>
  )
}

function FishIcon({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size / 40})`}>
      <ellipse cx="-2" cy="0" rx="18" ry="10" fill="#5BC0DE" />
      <ellipse cx="-2" cy="0" rx="18" ry="10" fill="url(#glow-blue)" />
      <path d="M14 0 L24 -9 L24 9 Z" fill="#3FA8C7" />
      <circle cx="-12" cy="-2" r="3" fill="white" />
      <circle cx="-13" cy="-2" r="1.5" fill="#1a1a1a" />
      <path d="M-2 -8 C2 -14, 8 -12, 6 -8" fill="#3FA8C7" opacity="0.8" />
      {[0, 1, 2].map(i => (
        <path key={i} d={`M${-2 + i * 7} ${-3} C${1 + i * 7} ${-5}, ${4 + i * 7} ${-3}, ${1 + i * 7} ${-1}`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" fill="none" />
      ))}
    </g>
  )
}

function BerryIcon({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size / 40})`}>
      <circle cx="-8" cy="3" r="10" fill="#7B1FA2" />
      <circle cx="6" cy="0" r="9" fill="#9C27B0" />
      <circle cx="-1" cy="10" r="9.5" fill="#6A1B9A" />
      <circle cx="-8" cy="3" r="10" fill="url(#glow-purple)" />
      <circle cx="6" cy="0" r="9" fill="url(#glow-purple)" />
      {/* tiny crown marks */}
      <circle cx="-10" cy="-5" r="1" fill="#4A148C" />
      <circle cx="-6" cy="-6" r="1" fill="#4A148C" />
      <path d="M-14 -4 C-12 -8, -8 -9, -6 -6" stroke="#388E3C" strokeWidth="1.2" fill="none" />
    </g>
  )
}

function OrangeIcon({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size / 40})`}>
      <circle cx="0" cy="2" r="15" fill="#FF9800" />
      <circle cx="0" cy="2" r="15" fill="url(#glow-orange)" />
      {[...Array(8)].map((_, i) => (
        <circle key={i} cx={Math.cos(i * 0.8) * 9} cy={2 + Math.sin(i * 0.8) * 9} r="0.6" fill="rgba(255,255,255,0.12)" />
      ))}
      <ellipse cx="0" cy="-12" rx="4" ry="2" fill="#4CAF50" opacity="0.85" />
      <line x1="0" y1="-14" x2="0" y2="-19" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  )
}

function OliveIcon({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size / 40})`}>
      <ellipse cx="-6" cy="2" rx="8" ry="12" fill="#689F38" transform="rotate(-8)" />
      <ellipse cx="7" cy="4" rx="7" ry="10" fill="#558B2F" transform="rotate(10)" />
      <ellipse cx="-6" cy="2" rx="8" ry="12" fill="url(#glow-green)" transform="rotate(-8)" />
      <path d="M-3 -10 C-2 -16, 3 -18, 6 -14" stroke="#5D4037" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="8" cy="-16" rx="6" ry="2.2" fill="#7CB342" transform="rotate(-15)" />
    </g>
  )
}

function BeanIcon({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size / 40})`}>
      <path d="M-16 8 C-12 -6, 0 -14, 14 -10" stroke="#66BB6A" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M-14 12 C-10 -2, 2 -10, 16 -6" stroke="#4CAF50" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="-4" cy="-4" r="2" fill="rgba(255,255,255,0.1)" />
      <circle cx="6" cy="-8" r="1.8" fill="rgba(255,255,255,0.1)" />
    </g>
  )
}

function ArganIcon({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size / 40})`}>
      <ellipse cx="0" cy="2" rx="12" ry="15" fill="#BF8C30" />
      <ellipse cx="0" cy="2" rx="12" ry="15" fill="url(#glow-gold)" />
      <path d="M-6 -4 C0 -8, 6 -8, 8 -2" stroke="rgba(139,90,40,0.3)" strokeWidth="0.8" fill="none" />
      <path d="M-7 4 C0 0, 7 0, 9 5" stroke="rgba(139,90,40,0.25)" strokeWidth="0.8" fill="none" />
      <line x1="0" y1="-13" x2="0" y2="-20" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="4" cy="-20" rx="5" ry="2" fill="#7CB342" transform="rotate(-10)" />
    </g>
  )
}

function AvocadoIcon({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size / 40})`}>
      <ellipse cx="0" cy="2" rx="13" ry="17" fill="#33691E" />
      <ellipse cx="0" cy="3" rx="9" ry="12" fill="#9CCC65" />
      <circle cx="0" cy="7" r="7" fill="#795548" />
      <circle cx="0" cy="7" r="7" fill="url(#glow-brown)" />
      <ellipse cx="0" cy="2" rx="13" ry="17" fill="url(#glow-darkgreen)" />
    </g>
  )
}

const ICON_MAP: Record<string, (props: { x: number; y: number; size: number }) => JSX.Element> = {
  Seafood: FishIcon,
  Tomatoes: TomatoIcon,
  Berries: BerryIcon,
  Citrus: OrangeIcon,
  Olives: OliveIcon,
  'Green Beans': BeanIcon,
  'Argan Oil': ArganIcon,
  Avocados: AvocadoIcon,
}

// ═══ COMPONENT ═══

export function MoroccoAgricultureContent() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [animated, setAnimated] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400)
    return () => clearTimeout(t)
  }, [])

  // Layout constants
  const W = 800
  const H = 800
  const CX = W / 2
  const CY = H / 2
  const INNER_R = 90
  const OUTER_R = 320
  const GAP = 0.012 // radians gap between arcs
  const START_ANGLE = -Math.PI / 2 // start at top

  // Compute arcs
  const arcs = useMemo(() => {
    const totalAngle = 2 * Math.PI - GAP * CROPS.length
    let currentAngle = START_ANGLE

    return CROPS.map((crop, i) => {
      const sweep = (crop.value / TOTAL) * totalAngle
      const startAngle = currentAngle
      const endAngle = currentAngle + sweep
      const midAngle = (startAngle + endAngle) / 2

      // Scale outer radius by value for extra drama
      const valueRatio = crop.value / CROPS[0].value
      const outerR = INNER_R + (OUTER_R - INNER_R) * (0.4 + 0.6 * valueRatio)

      currentAngle = endAngle + GAP
      return { ...crop, startAngle, endAngle, midAngle, outerR, index: i }
    })
  }, [])

  // Arc path generator
  const arcPath = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
    const x1 = CX + innerR * Math.cos(startAngle)
    const y1 = CY + innerR * Math.sin(startAngle)
    const x2 = CX + outerR * Math.cos(startAngle)
    const y2 = CY + outerR * Math.sin(startAngle)
    const x3 = CX + outerR * Math.cos(endAngle)
    const y3 = CY + outerR * Math.sin(endAngle)
    const x4 = CX + innerR * Math.cos(endAngle)
    const y4 = CY + innerR * Math.sin(endAngle)
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

    return `M${x1},${y1} L${x2},${y2} A${outerR},${outerR} 0 ${largeArc} 1 ${x3},${y3} L${x4},${y4} A${innerR},${innerR} 0 ${largeArc} 0 ${x1},${y1} Z`
  }

  // Label position
  const labelPos = (midAngle: number, r: number) => ({
    x: CX + r * Math.cos(midAngle),
    y: CY + r * Math.sin(midAngle),
  })

  return (
    <div style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Header */}
      <div style={{ maxWidth: '800px', width: '100%', padding: '40px 24px 0' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', marginBottom: '8px' }}>
          Slow Morocco · Data
        </p>
        <h1 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.1,
          color: '#ffffff',
          margin: '0 0 8px 0',
        }}>
          What Morocco Grows<br />& Sends to the World
        </h1>
        <p style={{ fontSize: '12px', color: '#666', maxWidth: '440px', lineHeight: 1.6 }}>
          ~$6.5 billion in agricultural and seafood exports. Each arc is proportional to export value. The further it reaches, the larger the trade.
        </p>
      </div>

      {/* SVG Radial Chart */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', height: 'auto' }}
        >
          {/* Gradient definitions */}
          <defs>
            {arcs.map((arc, i) => (
              <radialGradient key={`grad-${i}`} id={`arc-grad-${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="30%" stopColor={arc.color} />
                <stop offset="100%" stopColor={arc.colorEnd} />
              </radialGradient>
            ))}
            {/* Glow filters */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="soft-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Icon glow gradients */}
            <radialGradient id="glow-red" cx="35%" cy="30%"><stop offset="0%" stopColor="rgba(255,255,255,0.2)" /><stop offset="100%" stopColor="rgba(0,0,0,0.1)" /></radialGradient>
            <radialGradient id="glow-blue" cx="30%" cy="30%"><stop offset="0%" stopColor="rgba(255,255,255,0.15)" /><stop offset="100%" stopColor="rgba(0,0,0,0.05)" /></radialGradient>
            <radialGradient id="glow-purple" cx="35%" cy="30%"><stop offset="0%" stopColor="rgba(255,255,255,0.2)" /><stop offset="100%" stopColor="rgba(0,0,0,0.08)" /></radialGradient>
            <radialGradient id="glow-orange" cx="35%" cy="30%"><stop offset="0%" stopColor="rgba(255,255,255,0.2)" /><stop offset="100%" stopColor="rgba(0,0,0,0.1)" /></radialGradient>
            <radialGradient id="glow-green" cx="30%" cy="30%"><stop offset="0%" stopColor="rgba(255,255,255,0.2)" /><stop offset="100%" stopColor="rgba(0,0,0,0.1)" /></radialGradient>
            <radialGradient id="glow-gold" cx="35%" cy="25%"><stop offset="0%" stopColor="rgba(255,255,255,0.25)" /><stop offset="100%" stopColor="rgba(0,0,0,0.1)" /></radialGradient>
            <radialGradient id="glow-brown" cx="40%" cy="35%"><stop offset="0%" stopColor="rgba(255,255,255,0.25)" /><stop offset="100%" stopColor="rgba(0,0,0,0.1)" /></radialGradient>
            <radialGradient id="glow-darkgreen" cx="35%" cy="30%"><stop offset="0%" stopColor="rgba(255,255,255,0.1)" /><stop offset="100%" stopColor="rgba(0,0,0,0.05)" /></radialGradient>
          </defs>

          {/* Faint concentric rings */}
          {[120, 180, 240, 300].map(r => (
            <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          ))}

          {/* Arcs */}
          {arcs.map((arc, i) => {
            const isHovered = hovered === i
            const isOther = hovered !== null && hovered !== i
            return (
              <g key={arc.name}>
                {/* Glow behind hovered arc */}
                {isHovered && (
                  <path
                    d={arcPath(arc.startAngle, arc.endAngle, INNER_R - 4, arc.outerR + 8)}
                    fill={arc.color}
                    opacity={0.2}
                    filter="url(#soft-glow)"
                  />
                )}
                <path
                  d={arcPath(arc.startAngle, arc.endAngle, INNER_R, arc.outerR)}
                  fill={`url(#arc-grad-${i})`}
                  opacity={animated ? (isOther ? 0.25 : 1) : 0}
                  style={{
                    transition: 'opacity 0.4s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />
              </g>
            )
          })}

          {/* Crop icons — positioned at mid-angle, between inner and outer */}
          {arcs.map((arc, i) => {
            const IconComponent = ICON_MAP[arc.name]
            if (!IconComponent) return null
            const iconR = INNER_R + (arc.outerR - INNER_R) * 0.55
            const pos = labelPos(arc.midAngle, iconR)
            const iconSize = 16 + (arc.value / CROPS[0].value) * 20
            const isOther = hovered !== null && hovered !== i
            return (
              <g
                key={`icon-${i}`}
                opacity={animated ? (isOther ? 0.2 : 1) : 0}
                style={{ transition: 'opacity 0.4s ease', pointerEvents: 'none' }}
              >
                <IconComponent x={pos.x} y={pos.y} size={iconSize} />
              </g>
            )
          })}

          {/* Value labels on arcs — only show for segments with enough room */}
          {arcs.map((arc, i) => {
            const sweep = arc.endAngle - arc.startAngle
            if (sweep < 0.25) return null // too narrow
            const labelR = INNER_R + (arc.outerR - INNER_R) * 0.88
            const pos = labelPos(arc.midAngle, labelR)
            const isOther = hovered !== null && hovered !== i
            return (
              <text
                key={`val-${i}`}
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                opacity={animated ? (isOther ? 0.15 : 1) : 0}
                style={{ transition: 'opacity 0.4s ease', pointerEvents: 'none' }}
              >
                {arc.unit}
              </text>
            )
          })}

          {/* Outer name labels */}
          {arcs.map((arc, i) => {
            const outerLabelR = arc.outerR + 18
            const pos = labelPos(arc.midAngle, outerLabelR)
            const isRight = arc.midAngle > -Math.PI / 2 && arc.midAngle < Math.PI / 2
            const isOther = hovered !== null && hovered !== i
            return (
              <text
                key={`name-${i}`}
                x={pos.x}
                y={pos.y}
                textAnchor={isRight ? 'start' : 'end'}
                dominantBaseline="middle"
                fill={hovered === i ? arc.iconColor : 'rgba(255,255,255,0.5)'}
                fontSize="11"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="500"
                letterSpacing="0.04em"
                opacity={animated ? (isOther ? 0.2 : 1) : 0}
                style={{ transition: 'all 0.3s ease', pointerEvents: 'none' }}
              >
                {arc.name.toUpperCase()}
              </text>
            )
          })}

          {/* Center circle */}
          <circle cx={CX} cy={CY} r={INNER_R - 2} fill="#0a0a0a" />
          <circle cx={CX} cy={CY} r={INNER_R - 2} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {/* Center text */}
          {hovered === null ? (
            <g>
              <text x={CX} y={CY - 18} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.12em" style={{ textTransform: 'uppercase' }}>
                TOTAL EXPORTS
              </text>
              <text x={CX} y={CY + 10} textAnchor="middle" fill="#ffffff" fontSize="28" fontFamily="'Georgia', serif" fontStyle="italic">
                ~$6.5B
              </text>
              <text x={CX} y={CY + 30} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">
                agri-food + seafood
              </text>
            </g>
          ) : (
            <g>
              <text x={CX} y={CY - 28} textAnchor="middle" fill={arcs[hovered].iconColor} fontSize="9" fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.1em">
                {arcs[hovered].name.toUpperCase()}
              </text>
              <text x={CX} y={CY - 4} textAnchor="middle" fill="#ffffff" fontSize="26" fontFamily="'Georgia', serif" fontStyle="italic">
                {arcs[hovered].unit}
              </text>
              <text x={CX} y={CY + 16} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">
                {arcs[hovered].detail}
              </text>
              <text x={CX} y={CY + 32} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="'IBM Plex Mono', monospace">
                {arcs[hovered].region}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend strip */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        padding: '0 24px 16px',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px 20px',
          justifyContent: 'center',
        }}>
          {CROPS.map((crop, i) => (
            <div
              key={crop.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                opacity: hovered !== null && hovered !== i ? 0.3 : 1,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: crop.color }} />
              <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.5)' }}>{crop.name}</span>
              <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.25)' }}>{crop.unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Annotation */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        padding: '16px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {hovered !== null ? (
          <div style={{ textAlign: 'center', minHeight: '48px' }}>
            <p style={{ fontSize: '13px', color: arcs[hovered].iconColor, margin: '0 0 4px' }}>
              {arcs[hovered].note}
            </p>
            <p style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)' }}>
              {((arcs[hovered].value / TOTAL) * 100).toFixed(1)}% of total agri-food exports
            </p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', minHeight: '48px' }}>
            <p style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: '16px',
              fontStyle: 'italic',
              color: 'rgba(0,0,0,0.4)',
              margin: 0,
            }}>
              Hover each arc to explore
            </p>
          </div>
        )}
      </div>

      {/* Big fact */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(135deg, #C62828 0%, #7f1d1d 100%)',
        padding: '40px 24px',
        marginTop: '8px',
      }}>
        <p style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: 'clamp(1.1rem, 3.5vw, 1.8rem)',
          fontStyle: 'italic',
          color: '#ffffff',
          lineHeight: 1.35,
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          Morocco is the world&apos;s third-fastest-growing fruit and vegetable exporter. It feeds Europe from 14 km away.
        </p>
        <p style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)', textAlign: 'center', marginTop: '10px' }}>
          Source: EastFruit / FAO · Data: 2022–2024
        </p>
      </div>

      {/* Footer */}
      <div style={{
        width: '100%',
        backgroundColor: '#1f1f1f',
        padding: '48px 24px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: '8px',
      }}>
        <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)' }}>
          © {new Date().getFullYear()} Slow Morocco. All rights reserved.
        </p>
        <p style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: '12px',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.7)',
        }}>
          Sources: FAO, Ministry of Agriculture Morocco
        </p>
      </div>
    </div>
  )
}
