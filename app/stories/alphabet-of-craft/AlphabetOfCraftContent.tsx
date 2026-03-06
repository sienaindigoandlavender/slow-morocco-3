'use client'

import { useState, useEffect, useRef } from 'react'
import { MAP_POINTS } from './data'

const C = {
  // Category colours
  tile: '#1A5276',
  textile: '#7B2D8D',
  leather: '#8B4513',
  metal: '#4A5568',
  wood: '#6B4226',
  pottery: '#C2703E',
  stone: '#5C4033',
  food: '#B8860B',
  body: '#5D3A5E',
  fiber: '#4A6741',
  music: '#722F37',
  arch: '#2D6E4F',
  // UI
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  parchment: '#FFFFFF',
  cream: '#FFFFFF',
}

// ═══ CRAFT DATA — 60 SPECIMENS ═══
interface Craft {
  id: number
  name: string
  arabic?: string
  category: string
  region: string
  technique: string
  materials: string
  color: string
  period?: string
}

const CRAFTS: Craft[] = [
  // ── TILE & MOSAIC (1–8) ──
  { id: 1, name: 'Zellige', arabic: 'زليج', category: 'Tile', region: 'Fes', technique: 'Hand-chiseled mosaic', materials: 'Glazed terracotta', color: C.tile, period: '10th century' },
  { id: 2, name: 'Bejmat', category: 'Tile', region: 'Fes / Marrakech', technique: 'Rectangular brick tile', materials: 'Unglazed terracotta', color: C.tile },
  { id: 3, name: 'Cement Tile', category: 'Tile', region: 'Tetouan / Casablanca', technique: 'Hydraulic press', materials: 'Cement, marble dust, pigment', color: C.tile, period: 'French protectorate' },
  { id: 4, name: 'Tadelakt', arabic: 'تادلاكت', category: 'Tile', region: 'Marrakech', technique: 'Polished lime plaster', materials: 'Lime, soap, river stone', color: C.tile },
  { id: 5, name: 'Gebs', category: 'Tile', region: 'Fes / Meknes', technique: 'Carved plaster stucco', materials: 'Gypsum plaster', color: C.tile },
  { id: 6, name: 'Painted Cedar Ceiling', category: 'Tile', region: 'Fes / Marrakech', technique: 'Polychrome painting', materials: 'Cedar wood, egg tempera', color: C.tile },
  { id: 7, name: 'Moucharabieh', category: 'Tile', region: 'Fes / Tetouan', technique: 'Turned lattice screen', materials: 'Cedar or walnut', color: C.tile },
  { id: 8, name: 'Fountain Mosaic', category: 'Tile', region: 'Fes / Marrakech', technique: 'Zellige assembly on curved form', materials: 'Cut zellige, plaster', color: C.tile },

  // ── TEXTILE (9–20) ──
  { id: 9, name: 'Beni Ourain Rug', category: 'Textile', region: 'Middle Atlas', technique: 'Hand-knotted pile', materials: 'Undyed sheep wool', color: C.textile },
  { id: 10, name: 'Boucherouite Rug', category: 'Textile', region: 'Nationwide', technique: 'Rag weaving on loom', materials: 'Recycled fabric strips', color: C.textile },
  { id: 11, name: 'Kilim (Hanbel)', category: 'Textile', region: 'High Atlas / Rif', technique: 'Flatweave tapestry', materials: 'Wool, cotton warp', color: C.textile },
  { id: 12, name: 'Zanafi', category: 'Textile', region: 'Ouarzazate / Taznakht', technique: 'Mixed pile and flatweave', materials: 'Wool, natural dyes', color: C.textile },
  { id: 13, name: 'Sabra Silk', category: 'Textile', region: 'Fes / Marrakech', technique: 'Cactus silk weaving', materials: 'Agave fibre (not silk)', color: C.textile },
  { id: 14, name: 'Fassi Embroidery', category: 'Textile', region: 'Fes', technique: 'Cross-stitch on linen', materials: 'Blue cotton thread, linen', color: C.textile },
  { id: 15, name: 'Rbati Embroidery', category: 'Textile', region: 'Rabat / Salé', technique: 'Counted thread', materials: 'Polychrome silk on cotton', color: C.textile },
  { id: 16, name: 'Kaftan', category: 'Textile', region: 'Fes / Marrakech', technique: 'Tailored garment + sfifa trim', materials: 'Silk, brocade, gold thread', color: C.textile },
  { id: 17, name: 'Handira', category: 'Textile', region: 'Middle Atlas', technique: 'Wedding blanket weaving', materials: 'Wool with sequin inserts', color: C.textile },
  { id: 18, name: 'Zemmour Weaving', category: 'Textile', region: 'Khemisset', technique: 'Tribal flatweave', materials: 'Red wool, natural dyes', color: C.textile },
  { id: 19, name: 'Indigo Dyeing', category: 'Textile', region: 'Marrakech / Fes', technique: 'Vat dyeing, resist patterns', materials: 'Indigo, wool or cotton', color: C.textile },
  { id: 20, name: 'Wool Carding & Spinning', category: 'Textile', region: 'Atlas Mountains', technique: 'Hand spindle (drop spindle)', materials: 'Raw sheep wool', color: C.textile },

  // ── LEATHER (21–27) ──
  { id: 21, name: 'Tannery Dyeing', category: 'Leather', region: 'Fes (Chouara)', technique: 'Pit dyeing, lime soak', materials: 'Cow, goat, camel hide', color: C.leather, period: '11th century' },
  { id: 22, name: 'Babouche', category: 'Leather', region: 'Fes / Marrakech', technique: 'Hand-stitched slipper', materials: 'Vegetable-tanned leather', color: C.leather },
  { id: 23, name: 'Leather Pouf', category: 'Leather', region: 'Marrakech', technique: 'Hand-cut, stitched, embossed', materials: 'Goat leather, cotton fill', color: C.leather },
  { id: 24, name: 'Bookbinding', category: 'Leather', region: 'Fes / Meknes', technique: 'Tooled leather binding', materials: 'Leather, gold leaf, paper', color: C.leather },
  { id: 25, name: 'Saddle Making', category: 'Leather', region: 'Fes / Meknes', technique: 'Shaped + embroidered', materials: 'Leather, velvet, brass', color: C.leather },
  { id: 26, name: 'Beldi Leather Bag', category: 'Leather', region: 'Nationwide', technique: 'Cut, stitched, burnished', materials: 'Full-grain goat leather', color: C.leather },
  { id: 27, name: 'Parchment (Raqq)', category: 'Leather', region: 'Fes', technique: 'Stretched, scraped, dried', materials: 'Goat or sheep skin', color: C.leather },

  // ── METALWORK (28–35) ──
  { id: 28, name: 'Brass Tray (Siniya)', category: 'Metal', region: 'Fes / Marrakech', technique: 'Hammered + engraved', materials: 'Brass sheet', color: C.metal },
  { id: 29, name: 'Pierced Lantern', category: 'Metal', region: 'Marrakech', technique: 'Punched tin or brass', materials: 'Tin, brass, coloured glass', color: C.metal },
  { id: 30, name: 'Copper Kettle', category: 'Metal', region: 'Fes', technique: 'Raised + soldered', materials: 'Copper, tin lining', color: C.metal },
  { id: 31, name: 'Wrought Iron', category: 'Metal', region: 'Marrakech / Fes', technique: 'Forge + scroll bending', materials: 'Iron bar stock', color: C.metal },
  { id: 32, name: 'Silver Fibula', category: 'Metal', region: 'Tiznit / Anti-Atlas', technique: 'Cast + filigree + stone set', materials: 'Silver, coral, amber', color: C.metal },
  { id: 33, name: 'Amazigh Necklace', category: 'Metal', region: 'Guelmim / Souss', technique: 'Beading + pendant assembly', materials: 'Silver, amazonite, coral', color: C.metal },
  { id: 34, name: 'Door Knocker', category: 'Metal', region: 'Fes / Marrakech', technique: 'Sand cast + finished', materials: 'Brass or bronze', color: C.metal },
  { id: 35, name: 'Tea Set', category: 'Metal', region: 'Fes / Tetouan', technique: 'Raised + engraved pot + glasses', materials: 'Silver-plated brass, glass', color: C.metal },

  // ── WOOD (36–41) ──
  { id: 36, name: 'Thuya Marquetry', category: 'Wood', region: 'Essaouira', technique: 'Inlay + veneer', materials: 'Thuya burl, ebony, lemon wood', color: C.wood },
  { id: 37, name: 'Cedar Carving', category: 'Wood', region: 'Fes / Middle Atlas', technique: 'Relief carving on panel', materials: 'Atlas cedar', color: C.wood },
  { id: 38, name: 'Painted Wooden Door', category: 'Wood', region: 'Chefchaouen / Fes', technique: 'Studded + painted panel', materials: 'Cedar, iron nails, paint', color: C.wood },
  { id: 39, name: 'Turned Wood (Kharrata)', category: 'Wood', region: 'Fes / Tetouan', technique: 'Lathe turning', materials: 'Cedar, walnut, citrus', color: C.wood },
  { id: 40, name: 'Musical Instrument Making', category: 'Wood', region: 'Fes / Essaouira', technique: 'Carved body + skin stretched', materials: 'Walnut, goat skin, gut string', color: C.wood },
  { id: 41, name: 'Loom Construction', category: 'Wood', region: 'Atlas villages', technique: 'Joinery + tensioning', materials: 'Hardwood, rope, heddle', color: C.wood },

  // ── POTTERY & CERAMICS (42–49) ──
  { id: 42, name: 'Fassi Blue Pottery', category: 'Pottery', region: 'Fes', technique: 'Wheel-thrown, cobalt glaze', materials: 'Clay, cobalt oxide, tin glaze', color: C.pottery },
  { id: 43, name: 'Safi Polychrome', category: 'Pottery', region: 'Safi', technique: 'Wheel-thrown, multi-colour glaze', materials: 'Clay, mineral pigments', color: C.pottery },
  { id: 44, name: 'Tamegroute Green', category: 'Pottery', region: 'Zagora / Draa Valley', technique: 'Kiln-fired with green glaze', materials: 'Desert clay, copper oxide, manganese', color: C.pottery },
  { id: 45, name: 'Berber Pottery', category: 'Pottery', region: 'Rif / Atlas', technique: 'Coil-built, open-fire', materials: 'Unglazed earthenware, vegetable dye', color: C.pottery },
  { id: 46, name: 'Tajine', category: 'Pottery', region: 'Nationwide', technique: 'Wheel-thrown conical lid', materials: 'Terracotta (cooking) or glazed (serving)', color: C.pottery },
  { id: 47, name: 'Tangia Pot', category: 'Pottery', region: 'Marrakech', technique: 'Amphora-shaped, unglazed', materials: 'Terracotta', color: C.pottery },
  { id: 48, name: 'Salé Pottery', category: 'Pottery', region: 'Salé (Oulja)', technique: 'Coloured glaze, floral motifs', materials: 'Clay, polychrome glaze', color: C.pottery },
  { id: 49, name: 'Terracotta Water Jug', category: 'Pottery', region: 'Nationwide rural', technique: 'Wheel or coil, evaporative cooling', materials: 'Unglazed terracotta', color: C.pottery },

  // ── STONE & MINERAL (50–52) ──
  { id: 50, name: 'Fossil Polishing', category: 'Stone', region: 'Erfoud / Midelt', technique: 'Cut, polish, mount', materials: 'Trilobite, ammonite limestone', color: C.stone },
  { id: 51, name: 'Marble Carving', category: 'Stone', region: 'Meknes / Khenifra', technique: 'Hand-carved basin or column', materials: 'Moroccan marble, onyx', color: C.stone },
  { id: 52, name: 'Taroudant Stone Box', category: 'Stone', region: 'Taroudant', technique: 'Carved soft stone, fitted lid', materials: 'Local soapstone', color: C.stone },

  // ── FIBRE & BASKETRY (53–56) ──
  { id: 53, name: 'Palm Basket', category: 'Fibre', region: 'Draa Valley / Figuig', technique: 'Coiled and stitched', materials: 'Date palm leaf', color: C.fiber },
  { id: 54, name: 'Raffia Weaving', category: 'Fibre', region: 'Salé / Meknes', technique: 'Woven + dyed basket', materials: 'Raffia palm fibre', color: C.fiber },
  { id: 55, name: 'Doum Palm Hat', category: 'Fibre', region: 'Marrakech region', technique: 'Plaited brim construction', materials: 'Doum palm leaf', color: C.fiber },
  { id: 56, name: 'Esparto Grass Mat', category: 'Fibre', region: 'Eastern Morocco / Rif', technique: 'Plaited floor covering', materials: 'Halfa grass (alfa)', color: C.fiber },

  // ── BODY & COSMETIC CRAFT (57–58) ──
  { id: 57, name: 'Argan Oil Pressing', category: 'Body', region: 'Souss / Essaouira', technique: 'Stone-ground cold press', materials: 'Argan nut kernel', color: C.body },
  { id: 58, name: 'Black Soap (Savon Beldi)', category: 'Body', region: 'Nationwide', technique: 'Olive paste curing', materials: 'Olive oil, potash, eucalyptus', color: C.body },

  // ── ARCHITECTURAL (59–60) ──
  { id: 59, name: 'Riad Construction', category: 'Architecture', region: 'Fes / Marrakech', technique: 'Inward courtyard plan', materials: 'Rammed earth, lime, cedar', color: C.arch },
  { id: 60, name: 'Pisé (Rammed Earth)', category: 'Architecture', region: 'Nationwide', technique: 'Formwork-tamped wall', materials: 'Earth, straw, lime', color: C.arch, period: 'Pre-Islamic' },
]

// ═══ CATEGORY SUMMARY ═══
const CATEGORIES = [
  { name: 'Tile & Mosaic', color: C.tile, count: 8, icon: '◆' },
  { name: 'Textile', color: C.textile, count: 12, icon: '◇' },
  { name: 'Leather', color: C.leather, count: 7, icon: '◾' },
  { name: 'Metalwork', color: C.metal, count: 8, icon: '●' },
  { name: 'Wood', color: C.wood, count: 6, icon: '▲' },
  { name: 'Pottery & Ceramics', color: C.pottery, count: 8, icon: '◐' },
  { name: 'Stone & Mineral', color: C.stone, count: 3, icon: '⬟' },
  { name: 'Fibre & Basketry', color: C.fiber, count: 4, icon: '○' },
  { name: 'Body & Cosmetic', color: C.body, count: 2, icon: '◎' },
  { name: 'Architecture', color: C.arch, count: 2, icon: '□' },
]

// ═══ SVG SPECIMEN PATTERNS ═══
// Each craft gets a unique micro-illustration — a specimen drawing
function SpecimenSVG({ craft, size }: { craft: Craft; size: number }) {
  const s = size
  const cx = s / 2
  const cy = s / 2
  const r = s * 0.38

  // Different specimen for each craft based on category and ID
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ display: 'block' }}>
      <rect width={s} height={s} fill={C.cream} rx={2} />

      {/* Category-specific specimen illustration */}
      {craft.category === 'Tile' && (
        <g>
          {/* Geometric tile pattern */}
          {craft.id === 1 ? (
            // Zellige — 8-point star
            <g transform={`translate(${cx}, ${cy})`}>
              {Array.from({ length: 8 }, (_, i) => {
                const angle = (i / 8) * Math.PI * 2
                const x1 = r * 0.3 * Math.cos(angle)
                const y1 = r * 0.3 * Math.sin(angle)
                const x2 = r * Math.cos(angle)
                const y2 = r * Math.sin(angle)
                const a2 = ((i + 0.5) / 8) * Math.PI * 2
                const x3 = r * 0.6 * Math.cos(a2)
                const y3 = r * 0.6 * Math.sin(a2)
                return <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={craft.color} strokeWidth="0.6" />
                  <line x1={x2} y1={y2} x2={x3} y2={y3} stroke={craft.color} strokeWidth="0.4" />
                </g>
              })}
              <circle cx={0} cy={0} r={r * 0.3} fill="none" stroke={craft.color} strokeWidth="0.8" />
              <circle cx={0} cy={0} r={r} fill="none" stroke={craft.color} strokeWidth="0.5" />
            </g>
          ) : craft.id === 2 ? (
            // Bejmat — rectangular bricks in herringbone
            <g transform={`translate(${cx - r}, ${cy - r})`}>
              {Array.from({ length: 5 }, (_, row) =>
                Array.from({ length: 3 }, (_, col) => {
                  const x = col * r * 0.7 + (row % 2 ? r * 0.35 : 0)
                  const y = row * r * 0.4
                  return <rect key={`${row}-${col}`} x={x} y={y}
                    width={r * 0.6} height={r * 0.3} rx={0.5}
                    fill="none" stroke={craft.color} strokeWidth="0.5" />
                })
              )}
            </g>
          ) : craft.id === 4 ? (
            // Tadelakt — smooth gradient with polish marks
            <g>
              <circle cx={cx} cy={cy} r={r} fill={craft.color} fillOpacity={0.08} stroke={craft.color} strokeWidth="0.5" />
              {Array.from({ length: 6 }, (_, i) => {
                const a = (i / 6) * Math.PI * 2
                return <path key={i} d={`M ${cx} ${cy} Q ${cx + r * 0.5 * Math.cos(a)} ${cy + r * 0.5 * Math.sin(a)} ${cx + r * 0.8 * Math.cos(a + 0.3)} ${cy + r * 0.8 * Math.sin(a + 0.3)}`}
                  fill="none" stroke={craft.color} strokeWidth="0.3" strokeOpacity="0.4" />
              })}
              <circle cx={cx} cy={cy} r={r * 0.15} fill={craft.color} fillOpacity={0.15} />
            </g>
          ) : craft.id === 5 ? (
            // Gebs — carved stucco arabesques
            <g transform={`translate(${cx}, ${cy})`}>
              {Array.from({ length: 4 }, (_, i) => {
                const a = (i / 4) * Math.PI * 2
                return <path key={i}
                  d={`M 0,0 Q ${r * 0.5 * Math.cos(a - 0.5)} ${r * 0.5 * Math.sin(a - 0.5)} ${r * 0.7 * Math.cos(a)} ${r * 0.7 * Math.sin(a)} Q ${r * 0.5 * Math.cos(a + 0.5)} ${r * 0.5 * Math.sin(a + 0.5)} 0,0`}
                  fill={craft.color} fillOpacity={0.06} stroke={craft.color} strokeWidth="0.4" />
              })}
            </g>
          ) : (
            // Generic tile grid
            <g transform={`translate(${cx - r}, ${cy - r})`}>
              {Array.from({ length: 4 }, (_, i) =>
                Array.from({ length: 4 }, (_, j) => (
                  <rect key={`${i}-${j}`} x={i * r * 0.52} y={j * r * 0.52}
                    width={r * 0.48} height={r * 0.48}
                    fill={(i + j) % 2 ? craft.color : 'none'} fillOpacity={0.08}
                    stroke={craft.color} strokeWidth="0.3" />
                ))
              )}
            </g>
          )}
        </g>
      )}

      {craft.category === 'Textile' && (
        <g>
          {craft.id === 9 ? (
            // Beni Ourain — diamond lattice
            <g transform={`translate(${cx}, ${cy})`}>
              {[-1, 0, 1].map(dx => [-1, 0, 1].map(dy => (
                <polygon key={`${dx}-${dy}`}
                  points={`${dx * r * 0.6},${dy * r * 0.6 - r * 0.25} ${dx * r * 0.6 + r * 0.25},${dy * r * 0.6} ${dx * r * 0.6},${dy * r * 0.6 + r * 0.25} ${dx * r * 0.6 - r * 0.25},${dy * r * 0.6}`}
                  fill="none" stroke={craft.color} strokeWidth="0.8" />
              )))}
            </g>
          ) : craft.id === 11 ? (
            // Kilim — horizontal bands with triangles
            <g transform={`translate(${cx - r}, ${cy - r})`}>
              {Array.from({ length: 7 }, (_, i) => (
                <g key={i}>
                  <line x1={0} y1={i * r * 0.3} x2={r * 2} y2={i * r * 0.3}
                    stroke={craft.color} strokeWidth={i % 2 ? 0.8 : 0.3} />
                  {i % 2 === 0 && Array.from({ length: 5 }, (_, j) => (
                    <polygon key={j}
                      points={`${j * r * 0.4 + r * 0.1},${i * r * 0.3 + r * 0.05} ${j * r * 0.4 + r * 0.3},${i * r * 0.3 + r * 0.05} ${j * r * 0.4 + r * 0.2},${i * r * 0.3 + r * 0.2}`}
                      fill={craft.color} fillOpacity={0.12} stroke={craft.color} strokeWidth="0.3" />
                  ))}
                </g>
              ))}
            </g>
          ) : craft.id === 17 ? (
            // Handira — sequin dots on weave lines
            <g transform={`translate(${cx - r}, ${cy - r})`}>
              {Array.from({ length: 8 }, (_, i) => (
                <line key={`h-${i}`} x1={0} y1={i * r * 0.26} x2={r * 2} y2={i * r * 0.26}
                  stroke={craft.color} strokeWidth="0.3" />
              ))}
              {Array.from({ length: 12 }, (_, i) => {
                const x = (i % 4) * r * 0.55 + r * 0.2 + (Math.floor(i / 4) % 2 ? r * 0.25 : 0)
                const y = Math.floor(i / 4) * r * 0.55 + r * 0.3
                return <circle key={i} cx={x} cy={y} r={r * 0.08}
                  fill={craft.color} fillOpacity={0.2} stroke={craft.color} strokeWidth="0.5" />
              })}
            </g>
          ) : (
            // Generic weave pattern
            <g transform={`translate(${cx - r}, ${cy - r})`}>
              {Array.from({ length: 9 }, (_, i) => (
                <line key={`w-${i}`} x1={0} y1={i * r * 0.26} x2={r * 2} y2={i * r * 0.26}
                  stroke={craft.color} strokeWidth="0.3" strokeOpacity={0.5} />
              ))}
              {Array.from({ length: 9 }, (_, i) => (
                <line key={`v-${i}`} x1={i * r * 0.26} y1={0} x2={i * r * 0.26} y2={r * 2}
                  stroke={craft.color} strokeWidth="0.3" strokeOpacity={0.3} />
              ))}
              {Array.from({ length: 3 }, (_, i) => (
                <polygon key={`tri-${i}`}
                  points={`${r * 0.3 + i * r * 0.6},${r * 0.3} ${r * 0.6 + i * r * 0.6},${r * 0.8} ${r * 0.0 + i * r * 0.6},${r * 0.8}`}
                  fill={craft.color} fillOpacity={0.08} stroke={craft.color} strokeWidth="0.3" />
              ))}
            </g>
          )}
        </g>
      )}

      {craft.category === 'Leather' && (
        <g>
          {craft.id === 21 ? (
            // Tannery — dyeing vats from above
            <g transform={`translate(${cx}, ${cy})`}>
              {[[-0.4, -0.4], [0.2, -0.4], [-0.1, 0.1], [0.5, 0.1], [-0.4, 0.5], [0.2, 0.5]].map(([dx, dy], i) => (
                <circle key={i} cx={dx * r * 1.2} cy={dy * r * 1.2} r={r * 0.28}
                  fill={['#8B4513', '#DAA520', '#2D6E4F', '#4A1A6B', '#C17F28', '#1A5276'][i]}
                  fillOpacity={0.2} stroke={craft.color} strokeWidth="0.4" />
              ))}
            </g>
          ) : craft.id === 22 ? (
            // Babouche — slipper outline
            <g transform={`translate(${cx}, ${cy})`}>
              <path d={`M ${-r * 0.6},${r * 0.2} Q ${-r * 0.6},${-r * 0.5} ${0},${-r * 0.6} Q ${r * 0.6},${-r * 0.5} ${r * 0.6},${r * 0.2} L ${r * 0.5},${r * 0.4} Q ${0},${r * 0.5} ${-r * 0.5},${r * 0.4} Z`}
                fill={craft.color} fillOpacity={0.06} stroke={craft.color} strokeWidth="0.8" />
              <path d={`M ${-r * 0.3},${r * 0.1} Q ${0},${-r * 0.1} ${r * 0.3},${r * 0.1}`}
                fill="none" stroke={craft.color} strokeWidth="0.4" />
            </g>
          ) : (
            // Generic leather — stitching pattern
            <g transform={`translate(${cx}, ${cy})`}>
              <rect x={-r * 0.7} y={-r * 0.7} width={r * 1.4} height={r * 1.4} rx={r * 0.15}
                fill={craft.color} fillOpacity={0.06} stroke={craft.color} strokeWidth="0.6" />
              {Array.from({ length: 8 }, (_, i) => {
                const x = -r * 0.6 + i * r * 0.18
                return <line key={i} x1={x} y1={-r * 0.6} x2={x} y2={-r * 0.5}
                  stroke={craft.color} strokeWidth="0.5" />
              })}
              <path d={`M ${-r * 0.5},0 L ${r * 0.5},0`} stroke={craft.color} strokeWidth="0.3" strokeDasharray="2,2" />
            </g>
          )}
        </g>
      )}

      {craft.category === 'Metal' && (
        <g>
          {craft.id === 28 ? (
            // Brass tray — circular with engraved concentric rings
            <g transform={`translate(${cx}, ${cy})`}>
              {[1, 0.75, 0.5, 0.25].map((f, i) => (
                <circle key={i} cx={0} cy={0} r={r * f} fill="none" stroke={craft.color} strokeWidth={i === 0 ? 1 : 0.4} />
              ))}
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i / 12) * Math.PI * 2
                return <line key={i} x1={r * 0.5 * Math.cos(a)} y1={r * 0.5 * Math.sin(a)}
                  x2={r * 0.75 * Math.cos(a)} y2={r * 0.75 * Math.sin(a)}
                  stroke={craft.color} strokeWidth="0.3" />
              })}
            </g>
          ) : craft.id === 29 ? (
            // Lantern — hexagonal with pierced dots
            <g transform={`translate(${cx}, ${cy})`}>
              <polygon points={`0,${-r} ${r * 0.7},${-r * 0.4} ${r * 0.7},${r * 0.4} 0,${r} ${-r * 0.7},${r * 0.4} ${-r * 0.7},${-r * 0.4}`}
                fill="none" stroke={craft.color} strokeWidth="0.8" />
              {Array.from({ length: 8 }, (_, i) => {
                const x = (Math.random() - 0.5) * r * 1.1
                const y = (Math.random() - 0.5) * r * 1.4
                return <circle key={i} cx={x * 0.7} cy={y * 0.7} r={r * 0.06}
                  fill={craft.color} fillOpacity={0.15} />
              })}
            </g>
          ) : craft.id === 32 ? (
            // Fibula — triangular brooch
            <g transform={`translate(${cx}, ${cy})`}>
              <polygon points={`0,${-r * 0.8} ${r * 0.7},${r * 0.5} ${-r * 0.7},${r * 0.5}`}
                fill={craft.color} fillOpacity={0.06} stroke={craft.color} strokeWidth="0.8" />
              <circle cx={0} cy={r * 0.1} r={r * 0.15} fill={craft.color} fillOpacity={0.15} stroke={craft.color} strokeWidth="0.5" />
              <line x1={0} y1={-r * 0.8} x2={0} y2={r * 0.5} stroke={craft.color} strokeWidth="0.3" />
            </g>
          ) : (
            // Generic metal — hammered circle
            <g transform={`translate(${cx}, ${cy})`}>
              <circle cx={0} cy={0} r={r * 0.8} fill="none" stroke={craft.color} strokeWidth="0.8" />
              <circle cx={0} cy={0} r={r * 0.5} fill="none" stroke={craft.color} strokeWidth="0.4" />
              {Array.from({ length: 6 }, (_, i) => {
                const a = (i / 6) * Math.PI * 2
                return <circle key={i} cx={r * 0.65 * Math.cos(a)} cy={r * 0.65 * Math.sin(a)} r={r * 0.08}
                  fill={craft.color} fillOpacity={0.1} />
              })}
            </g>
          )}
        </g>
      )}

      {craft.category === 'Wood' && (
        <g>
          {craft.id === 36 ? (
            // Thuya marquetry — concentric grain rings
            <g transform={`translate(${cx}, ${cy})`}>
              {Array.from({ length: 6 }, (_, i) => (
                <ellipse key={i} cx={r * 0.1} cy={r * 0.05} rx={r * (0.15 + i * 0.13)} ry={r * (0.12 + i * 0.12)}
                  fill="none" stroke={craft.color} strokeWidth="0.4" strokeOpacity={0.5 + i * 0.08} />
              ))}
            </g>
          ) : (
            // Generic wood — grain lines
            <g transform={`translate(${cx - r}, ${cy - r})`}>
              {Array.from({ length: 8 }, (_, i) => (
                <path key={i} d={`M 0,${i * r * 0.26} Q ${r * 0.5},${i * r * 0.26 + (i % 2 ? 3 : -3)} ${r * 2},${i * r * 0.26}`}
                  fill="none" stroke={craft.color} strokeWidth="0.4" strokeOpacity={0.4} />
              ))}
              <rect x={r * 0.2} y={r * 0.2} width={r * 1.6} height={r * 1.6} rx={2}
                fill="none" stroke={craft.color} strokeWidth="0.6" />
            </g>
          )}
        </g>
      )}

      {craft.category === 'Pottery' && (
        <g>
          {craft.id === 46 ? (
            // Tajine — conical silhouette
            <g transform={`translate(${cx}, ${cy})`}>
              <ellipse cx={0} cy={r * 0.4} rx={r * 0.8} ry={r * 0.2}
                fill="none" stroke={craft.color} strokeWidth="0.8" />
              <path d={`M ${-r * 0.7},${r * 0.35} Q ${-r * 0.3},${-r * 0.8} ${0},${-r * 0.9} Q ${r * 0.3},${-r * 0.8} ${r * 0.7},${r * 0.35}`}
                fill={craft.color} fillOpacity={0.06} stroke={craft.color} strokeWidth="0.8" />
              <circle cx={0} cy={-r * 0.9} r={r * 0.08} fill={craft.color} fillOpacity={0.3} />
            </g>
          ) : craft.id === 47 ? (
            // Tangia — amphora shape
            <g transform={`translate(${cx}, ${cy})`}>
              <path d={`M ${-r * 0.2},${-r * 0.7} Q ${-r * 0.25},${-r * 0.5} ${-r * 0.5},${0} Q ${-r * 0.5},${r * 0.5} ${-r * 0.3},${r * 0.7} L ${r * 0.3},${r * 0.7} Q ${r * 0.5},${r * 0.5} ${r * 0.5},${0} Q ${r * 0.25},${-r * 0.5} ${r * 0.2},${-r * 0.7} Z`}
                fill={craft.color} fillOpacity={0.06} stroke={craft.color} strokeWidth="0.8" />
            </g>
          ) : (
            // Generic pottery — vessel profile
            <g transform={`translate(${cx}, ${cy})`}>
              <path d={`M ${-r * 0.3},${-r * 0.6} Q ${-r * 0.6},${-r * 0.3} ${-r * 0.6},${r * 0.1} Q ${-r * 0.5},${r * 0.6} ${-r * 0.3},${r * 0.7} L ${r * 0.3},${r * 0.7} Q ${r * 0.5},${r * 0.6} ${r * 0.6},${r * 0.1} Q ${r * 0.6},${-r * 0.3} ${r * 0.3},${-r * 0.6} Z`}
                fill={craft.color} fillOpacity={0.06} stroke={craft.color} strokeWidth="0.7" />
              <ellipse cx={0} cy={-r * 0.6} rx={r * 0.3} ry={r * 0.08}
                fill="none" stroke={craft.color} strokeWidth="0.5" />
            </g>
          )}
        </g>
      )}

      {/* Fallback for other categories */}
      {!['Tile', 'Textile', 'Leather', 'Metal', 'Wood', 'Pottery'].includes(craft.category) && (
        <g transform={`translate(${cx}, ${cy})`}>
          <circle cx={0} cy={0} r={r * 0.7} fill={craft.color} fillOpacity={0.06} stroke={craft.color} strokeWidth="0.6" />
          {craft.category === 'Stone' && (
            <>
              <path d={`M ${-r * 0.4},${-r * 0.2} L ${-r * 0.1},${-r * 0.5} L ${r * 0.3},${-r * 0.3} L ${r * 0.5},${r * 0.1} L ${r * 0.2},${r * 0.4} L ${-r * 0.3},${r * 0.3} Z`}
                fill={craft.color} fillOpacity={0.08} stroke={craft.color} strokeWidth="0.5" />
              <path d={`M ${-r * 0.3},${r * 0.1} Q ${0},${-r * 0.1} ${r * 0.3},${r * 0.1}`}
                fill="none" stroke={craft.color} strokeWidth="0.4" />
            </>
          )}
          {craft.category === 'Fibre' && (
            <>
              {Array.from({ length: 5 }, (_, i) => (
                <ellipse key={i} cx={0} cy={r * 0.1 * i - r * 0.2}
                  rx={r * (0.6 - i * 0.08)} ry={r * 0.12}
                  fill="none" stroke={craft.color} strokeWidth="0.4" />
              ))}
            </>
          )}
          {craft.category === 'Body' && (
            <circle cx={0} cy={0} r={r * 0.3} fill={craft.color} fillOpacity={0.12} stroke={craft.color} strokeWidth="0.6" />
          )}
          {craft.category === 'Architecture' && (
            <>
              <rect x={-r * 0.5} y={-r * 0.5} width={r} height={r} fill="none" stroke={craft.color} strokeWidth="0.6" />
              <rect x={-r * 0.15} y={-r * 0.15} width={r * 0.3} height={r * 0.3} fill={craft.color} fillOpacity={0.08} stroke={craft.color} strokeWidth="0.4" />
            </>
          )}
        </g>
      )}
    </svg>
  )
}


const MAPBOX_TK_CR = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function CraftMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TK_CR || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TK_CR!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6, 32.5], zoom: 5.5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        MAP_POINTS.forEach((p: typeof MAP_POINTS[0]) => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => { map.flyTo({ center: [p.lng, p.lat], zoom: 8, duration: 1200 }) })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '220px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])
  return <div ref={mapContainer} className="w-full" style={{ height: '480px', background: '#0a0a0a' }} />
}

export default function AlphabetOfCraftContent() {
  // Layout: 10 columns × 6 rows = 60 specimens
  const COLS = 10
  const SPEC_SIZE = 72

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-6">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 016 · Illustrated Taxonomy</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Moroccan Alphabet of Craft</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          Sixty traditions. Ten categories. One illustrated plate.
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4" style={{ color: C.text }}>
          Every major craft tradition in Morocco — from zellige tilework to rammed-earth
          construction — arranged as specimens on a single plate. Each entry:
          name, region, technique, materials. The categories span tile and mosaic,
          textile, leather, metalwork, wood, pottery, stone, fibre, body craft,
          and architecture. Some date to the 10th century. All are still practised today.
        </p>
      </section>

      {/* ═══ CATEGORY KEY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mb-6">
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {CATEGORIES.map(cat => (
            <span key={cat.name} className="text-[11px] flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: cat.color, opacity: 0.6 }} />
              <span style={{ color: cat.color }}>{cat.name}</span>
              <span style={{ color: C.muted }}>({cat.count})</span>
            </span>
          ))}
        </div>
      </section>

      {/* ═══ THE PLATE ═══ */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="border p-4 md:p-6" style={{ borderColor: C.border, background: C.parchment }}>

          {/* Plate title */}
          <div className="text-center mb-6">
            <p className="text-[9px] uppercase tracking-[4px] mb-1" style={{ color: C.muted }}>Plate I</p>
            <p className="text-[11px] uppercase tracking-[3px] font-medium" style={{ color: C.ink }}>
              A Taxonomic Survey of Moroccan Craft Traditions
            </p>
            <p className="text-[8px] tracking-[2px] mt-1" style={{ color: C.muted }}>
              60 specimens · 10 families · compiled by Slow Morocco · Marrakech · 2026
            </p>
          </div>

          {/* Specimen grid */}
          <div
            className="grid gap-[2px]"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            }}
          >
            {CRAFTS.map(craft => (
              <div key={craft.id} className="flex flex-col" style={{ minWidth: 0 }}>
                {/* Specimen illustration */}
                <SpecimenSVG craft={craft} size={SPEC_SIZE} />

                {/* Label */}
                <div className="px-0.5 py-1" style={{ minHeight: 52 }}>
                  <p className="text-[7px] font-semibold leading-tight truncate" style={{ color: craft.color }}>
                    {craft.id}. {craft.name}
                  </p>
                  {craft.arabic && (
                    <p className="text-[6px] leading-tight" style={{ color: craft.color, opacity: 0.6 }}>{craft.arabic}</p>
                  )}
                  <p className="text-[5.5px] leading-[1.4] mt-0.5" style={{ color: C.muted }}>
                    {craft.region}
                  </p>
                  <p className="text-[5px] leading-[1.3]" style={{ color: C.muted, opacity: 0.7 }}>
                    {craft.technique}
                  </p>
                  <p className="text-[5px] leading-[1.3] italic" style={{ color: C.muted, opacity: 0.5 }}>
                    {craft.materials}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Plate footer */}
          <div className="mt-6 pt-4 text-center" style={{ borderTop: `0.5px solid ${C.border}` }}>
            <p className="text-[7px] tracking-[2px] uppercase" style={{ color: C.muted }}>
              Sources: Ministry of Artisanship &amp; Social Economy · UNESCO Intangible Heritage Lists · Frommer&apos;s Morocco · House of Weaves Archive · Field observation
            </p>
            <p className="text-[7px] tracking-[1px] italic mt-2" style={{ color: C.text }}>
              © 2026 Slow Morocco. This plate may not be reproduced without written permission and visible attribution.
            </p>
            <p className="text-[8px] italic mt-1" style={{ color: C.arch }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.tile }}>The Three Architectures</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Every decorated surface in a traditional Moroccan building uses three
                materials in vertical order: zellige (glazed tile mosaic) on the lower
                walls, gebs (carved plaster stucco) in the middle, and painted cedar
                woodwork on the ceiling. This trinity — tile, plaster, wood — defines
                Moroccan interior space from the 12th century medersas to the riads
                being restored today. Fes is the centre of excellence for all three.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.textile }}>Urban vs. Rural</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Moroccan craft splits along an ancient line. Urban traditions — zellige,
                brass engraving, Fassi embroidery, bookbinding — carry Andalusian and
                Eastern influences, refined through guild systems in the imperial cities.
                Rural traditions — Berber pottery, tribal weaving, palm basketry —
                are older, geometric, symbolic, and almost exclusively women&apos;s work.
                The two streams coexist but rarely overlap. A Beni Ourain rug and
                a Fassi embroidered tablecloth come from different civilisations
                sharing the same country.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.leather }}>The Guild System</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                A maalem (master craftsman) teaches apprentices who learn by doing
                for years before being examined. The system — still alive in Fes —
                maintained quality for centuries. Each trade had its own souk,
                its own patron saint, its own hierarchy. The French protectorate
                (1912–1956) formalised the system through research and training
                centres. King Hassan II sponsored craftsmen for the Hassan II Mosque
                in Casablanca — 6,000 artisans, 10,000 workers, the largest
                employment of traditional craftsmen in modern history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BY THE NUMBERS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>By the Numbers</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { n: '60', label: 'Crafts documented' },
              { n: '10', label: 'Categories' },
              { n: '2.4M', label: 'Artisans in Morocco' },
              { n: '19%', label: 'of workforce' },
              { n: '6,000', label: 'Artisans on Hassan II Mosque' },
              { n: '10th C', label: 'Oldest tradition (zellige)' },
              { n: '400+', label: 'Derbs with workshops' },
              { n: '12', label: 'Textile traditions' },
              { n: '8', label: 'Pottery centres' },
              { n: '7', label: 'Leather traditions' },
              { n: '3', label: 'Architectural materials' },
              { n: '1', label: 'Country' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-2">
                <p className="font-serif italic text-[22px]" style={{ color: C.leather }}>{stat.n}</p>
                <p className="text-[8px] uppercase tracking-widest mt-1" style={{ color: C.muted }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Two point four million Moroccans work with their hands. The zellige cutter
            uses the same tool his grandfather used. The weaver reads a pattern her
            grandmother sang to her. The tanner stands in dye his great-grandfather
            mixed. This is not heritage. This is Tuesday.
          </p>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#C17F28' }}>Craft Regions — Mapped</p>
        <CraftMap />
      </div></section>

{/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Craft classifications based on Morocco Ministry of Artisanship &amp; Social Economy
            taxonomy; Frommer&apos;s Morocco arts &amp; crafts survey; UNESCO Intangible Cultural
            Heritage of Humanity lists (Morocco nominations); House of Weaves textile archive
            (Slow Morocco); Tribaliste Magazine craft documentation; field observation
            in Fes, Marrakech, Essaouira, and Safi medinas. Workforce statistics from
            Haut-Commissariat au Plan (HCP) Morocco. Artisan count on Hassan II Mosque from
            mosque foundation documentation. All sixty crafts are actively practised as
            of 2026.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
              © {new Date().getFullYear()} Slow Morocco. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.arch }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
