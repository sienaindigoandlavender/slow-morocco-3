'use client'

import { useState, useEffect, useRef } from 'react'

// Field journal palette — muted watercolors
const C = {
  stork: '#C4956A', nest: '#8B6E4E', flight: '#5D7A3C', sky: '#7BA7BC',
  ruin: '#A0846B', warm: '#C8A415', water: '#4A8FA0', stone: '#B8A99A',
  field: '#D4C5A0', journal: '#F5EDE0',
  ink: '#2D2520', text: '#4A4038', muted: '#8C8070', border: '#D4C5A0',
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

// ═══ NESTING SITES DATA ═══
interface NestSite {
  name: string; city: string; type: string; nests: number; elevation: string
  period: string; note: string; lat: number; lon: number
}

const SITES: NestSite[] = [
  { name: 'Chellah Necropolis', city: 'Rabat', type: 'Roman/Marinid ruin', nests: 25, elevation: '12–18m', period: 'Year-round colony', lat: 34.01, lon: -6.84, note: 'The most photographed stork colony in Morocco. Nests built on Marinid minaret, Roman columns, and crumbling walls. Cats patrol below. Jazz festival in the ruins.' },
  { name: 'El Badi Palace', city: 'Marrakech', type: 'Saadian ruin', nests: 18, elevation: '8–12m', period: 'Nov–Jul', lat: 31.62, lon: -8.00, note: 'Nests on the ruined walls of "The Incomparable." Storks visible from Jemaa el-Fna rooftops. 1578 palace, abandoned 1683. Storks arrived when humans left.' },
  { name: 'Volubilis', city: 'Meknès', type: 'Roman ruin', nests: 12, elevation: '6–10m', period: 'Mar–Aug', lat: 34.07, lon: -5.55, note: 'Roman columns serve as nest platforms. UNESCO site. Storks nest on the Basilica columns and the Triumphal Arch. Oldest continuous nesting site in Morocco.' },
  { name: 'Kasbah Mosque Minaret', city: 'Marrakech', type: 'Active mosque', nests: 4, elevation: '33m', period: 'Feb–Jul', lat: 31.62, lon: -7.99, note: 'Minaret serves as the highest urban nest in Marrakech. Active mosque — storks coexist with the call to prayer.' },
  { name: 'Sidi Allal Tazi', city: 'Gharb', type: 'Town buildings', nests: 25, elevation: '8–15m', period: 'Feb–Aug', lat: 34.52, lon: -6.32, note: 'One of Morocco\'s densest colonies. 25+ nests on a single cluster of buildings. Gharb wetlands provide feeding grounds.' },
  { name: 'Hassan Tower', city: 'Rabat', type: 'Almohad minaret', nests: 3, elevation: '44m', period: 'Year-round', lat: 34.02, lon: -6.82, note: 'Incomplete 12th-century minaret. 44m tall. Storks nest at the flat top — the tower was never finished, creating a perfect platform.' },
  { name: 'Ait Benhaddou', city: 'Ouarzazate', type: 'Ksar (fortified village)', nests: 8, elevation: '6–12m', period: 'Mar–Jul', lat: 31.05, lon: -7.13, note: 'UNESCO ksar. Mud-brick towers. Nests on the highest kasbahs. Game of Thrones filming location — storks undisturbed by cameras.' },
  { name: 'Tamdaght Kasbah', city: 'Ouarzazate', type: 'Glaoui kasbah', nests: 6, elevation: '8–14m', period: 'Mar–Jul', lat: 31.18, lon: -7.21, note: 'Ounila valley. Crumbling Glaoui-era kasbah. Storks rebuild nests that are larger than the rooms below them.' },
  { name: 'Bab el-Khemis', city: 'Meknès', type: 'City gate', nests: 3, elevation: '10m', period: 'Mar–Jul', lat: 33.90, lon: -5.56, note: 'Nests atop the ornate Meknès gate. Passing traffic below, storks above. Ismail-era architecture.' },
  { name: 'Merja Zerga', city: 'Moulay Bousselham', type: 'Lagoon/wetland', nests: 40, elevation: '2–8m', period: 'Wintering roost', lat: 34.87, lon: -6.27, note: 'Ramsar wetland. Not breeding colony but major winter roost — 1,000+ storks at peak. Feeding on lagoon margins.' },
  { name: 'Souss-Massa NP', city: 'Agadir', type: 'National park', nests: 15, elevation: '5–20m', period: 'Year-round', lat: 30.08, lon: -9.68, note: 'Southernmost major colony. Protected park. Storks share habitat with Northern Bald Ibis — another Moroccan icon.' },
]

// ═══ MIGRATION FLYWAY ═══
const FLYWAY_POINTS = [
  { name: 'Northern Europe', lat: 54, lon: 12, label: 'Breeding: Germany, Poland, Baltics', month: 'Apr–Aug' },
  { name: 'Central Europe', lat: 48, lon: 8, label: 'Staging: France, Switzerland', month: 'Aug–Sep' },
  { name: 'Iberia', lat: 39, lon: -4, label: 'Stopover: Spain, Portugal', month: 'Sep–Oct' },
  { name: 'Strait of Gibraltar', lat: 36, lon: -5.5, label: 'Crossing: 14 km strait', month: 'Sep–Oct' },
  { name: 'Northern Morocco', lat: 35, lon: -5, label: 'Arrival: Tangier, Tetouan', month: 'Oct' },
  { name: 'Gharb Wetlands', lat: 34.5, lon: -6.3, label: 'Wintering: Gharb, Rabat', month: 'Oct–Mar' },
  { name: 'Middle Atlas', lat: 33, lon: -5, label: 'Some continue: Atlas, Sahara edge', month: 'Nov–Feb' },
  { name: 'Sub-Sahara', lat: 20, lon: -5, label: 'Trans-Saharan: Sahel, W. Africa', month: 'Nov–Mar' },
]

// ═══ POPULATION TREND ═══
const POP_DATA = [
  { year: 1984, pairs: 7600, note: '1st census. Population already declining.' },
  { year: 1994, pairs: 5500, note: 'All-time low. 28% decline in a decade.' },
  { year: 2004, pairs: 3800, note: 'Partial recovery. Landfill feeding helps.' },
  { year: 2014, pairs: 2931, note: '7th international census. Decline continues in breeding pairs.' },
  { year: 2024, pairs: 3200, note: '8th census (preliminary). Slight recovery. More storks overwintering.' },
]

// ═══ CHELLAH NEST MAP (SVG) ═══
function ChellahNestMap() {
  const [activeNest, setActiveNest] = useState<number | null>(null)
  // Schematic: Chellah minaret + walls with nest positions
  const nests = [
    { x: 150, y: 45, id: 1, pos: 'Minaret top', age: '12+ years', chicks: '2–3/yr', note: 'Largest nest. Visible from outside walls. ~1.5m diameter, ~80kg.' },
    { x: 142, y: 65, id: 2, pos: 'Minaret ledge NW', age: '8 years', chicks: '2/yr', note: 'Built on decorative corbel. Protected from prevailing wind.' },
    { x: 158, y: 60, id: 3, pos: 'Minaret ledge SE', age: '6 years', chicks: '1–2/yr', note: 'Newest minaret nest. Younger pair — first bred 2018.' },
    { x: 95, y: 80, id: 4, pos: 'Roman column W', age: '10+ years', chicks: '2/yr', note: 'Built on Roman capital. Column from Sala Colonia (1st century CE).' },
    { x: 110, y: 95, id: 5, pos: 'Wall fragment', age: '5 years', chicks: '2/yr', note: 'On broken Marinid wall. Nest weight may accelerate ruin.' },
    { x: 200, y: 75, id: 6, pos: 'East wall', age: '7 years', chicks: '2–3/yr', note: 'Near the sacred pool. Eels in pool below — storks fish here.' },
    { x: 180, y: 100, id: 7, pos: 'Palm tree', age: '3 years', chicks: '1/yr', note: 'Only tree nest in colony. Less stable. Pair displaced from wall.' },
    { x: 125, y: 110, id: 8, pos: 'Mosque wall S', age: '9 years', chicks: '2/yr', note: 'Above the mihrab niche. Stork droppings whiten the sacred wall.' },
    { x: 75, y: 70, id: 9, pos: 'Gate tower', age: '15+ years', chicks: '3/yr', note: 'Alpha pair. Oldest nest. Rebuilt annually. Commands the entrance.' },
    { x: 220, y: 55, id: 10, pos: 'NE turret', age: '4 years', chicks: '1–2/yr', note: 'Peripheral position. Younger pair expanding colony edge.' },
  ]

  return (
    <div className="relative">
      <svg viewBox="0 0 300 170" className="w-full" style={{ maxHeight: 320 }}>
        {/* Sky wash */}
        <defs>
          <linearGradient id="sky-wash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.sky} stopOpacity="0.06" />
            <stop offset="100%" stopColor={C.journal} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="300" height="120" fill="url(#sky-wash)" />

        {/* Ground */}
        <rect x="0" y="120" width="300" height="50" fill={C.field} opacity="0.15" />
        <line x1="0" y1="120" x2="300" y2="120" stroke={C.border} strokeWidth="0.5" />

        {/* Minaret (central) */}
        <rect x="140" y="35" width="20" height="85" fill="none" stroke={C.ruin} strokeWidth="1" />
        <rect x="143" y="38" width="14" height="6" fill={C.ruin} opacity="0.15" />
        {/* Minaret decorative bands */}
        <line x1="140" y1="55" x2="160" y2="55" stroke={C.ruin} strokeWidth="0.3" />
        <line x1="140" y1="75" x2="160" y2="75" stroke={C.ruin} strokeWidth="0.3" />
        <line x1="140" y1="95" x2="160" y2="95" stroke={C.ruin} strokeWidth="0.3" />

        {/* Walls */}
        <path d="M 60,120 L 60,75 L 80,70 L 100,80 L 120,75 L 140,120" fill="none" stroke={C.ruin} strokeWidth="0.8" />
        <path d="M 160,120 L 160,85 L 180,80 L 200,70 L 220,55 L 240,65 L 240,120" fill="none" stroke={C.ruin} strokeWidth="0.8" />

        {/* Roman columns (left) */}
        {[85, 100, 115].map(x => (
          <g key={x}>
            <line x1={x} y1={80} x2={x} y2={120} stroke={C.ruin} strokeWidth="1.5" opacity="0.4" />
            <rect x={x - 3} y={78} width="6" height="3" fill={C.ruin} opacity="0.25" />
          </g>
        ))}

        {/* Labels */}
        <text x="150" y="30" textAnchor="middle" fontSize="7" fontFamily="'IBM Plex Mono', monospace"
          fill={C.muted} fontStyle="italic">Marinid minaret</text>
        <text x="85" y="135" textAnchor="middle" fontSize="6" fontFamily="'IBM Plex Mono', monospace"
          fill={C.muted}>Roman columns</text>
        <text x="220" y="50" textAnchor="middle" fontSize="6" fontFamily="'IBM Plex Mono', monospace"
          fill={C.muted}>NE turret</text>
        <text x="150" y="150" textAnchor="middle" fontSize="7" fontFamily="'IBM Plex Mono', monospace"
          fill={C.muted}>Chellah Necropolis · Rabat · 10 nests mapped</text>

        {/* Nest dots */}
        {nests.map(n => (
          <g key={n.id} onClick={() => setActiveNest(activeNest === n.id ? null : n.id)}
            className="cursor-pointer">
            {/* Nest base (sticks) */}
            <ellipse cx={n.x} cy={n.y + 2} rx="5" ry="2.5" fill={C.nest} opacity="0.3" />
            {/* Bird silhouette */}
            <circle cx={n.x} cy={n.y} r={activeNest === n.id ? 4.5 : 3} fill={activeNest === n.id ? C.stork : C.stork}
              stroke={activeNest === n.id ? C.ink : 'none'} strokeWidth="0.5"
              style={{ transition: 'all 0.2s' }} />
            {/* Number label */}
            <text x={n.x} y={n.y + 1} textAnchor="middle" fontSize="4.5" fill="white"
              fontFamily="'IBM Plex Mono', monospace" fontWeight="700">{n.id}</text>
          </g>
        ))}
      </svg>

      {/* Active nest detail */}
      {activeNest && (() => {
        const n = nests.find(n => n.id === activeNest)!
        return (
          <div className="mt-3 p-4 rounded-sm" style={{ background: `${C.journal}80`, border: `1px solid ${C.border}` }}>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-mono text-[12px] font-bold" style={{ color: C.ink }}>Nest #{n.id}: {n.pos}</span>
              <span className="font-mono text-[10px]" style={{ color: C.stork }}>est. {n.age}</span>
            </div>
            <div className="flex gap-4 mb-2">
              <div>
                <p className="font-mono text-[9px] uppercase" style={{ color: C.muted }}>Chicks/year</p>
                <p className="font-mono text-[12px]" style={{ color: C.flight }}>{n.chicks}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase" style={{ color: C.muted }}>Position</p>
                <p className="font-mono text-[12px]" style={{ color: C.ink }}>{n.pos}</p>
              </div>
            </div>
            <p className="text-[11px] leading-[1.6] italic" style={{ color: C.text }}>{n.note}</p>
          </div>
        )
      })()}
    </div>
  )
}

// ═══ MAPBOX COLONY MAP ═══

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

function StorkColonyMap({ sites, selectedIdx, onSelect }: { sites: NestSite[]; selectedIdx: number; onSelect: (i: number) => void }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    let cancelled = false
    import('mapbox-gl').then((mapboxgl) => {
      if (cancelled || !mapContainer.current) return
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [-6.5, 32.5], zoom: 5.5, minZoom: 4.5, maxZoom: 12,
        attributionControl: false, pitchWithRotate: false, dragRotate: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => { mapRef.current = map; setMapLoaded(true) })
    })
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    markersRef.current.forEach(m => m.remove()); markersRef.current = []
    import('mapbox-gl').then((mapboxgl) => {
      sites.forEach((s, i) => {
        const isSel = i === selectedIdx
        const size = Math.max(8, Math.min(20, s.nests / 2))
        const el = document.createElement('div')
        el.style.cssText = `width:${isSel ? size + 6 : size}px;height:${isSel ? size + 6 : size}px;background:${isSel ? C.stork : C.nest};border:2px solid #fff;border-radius:50%;cursor:pointer;transition:all 0.2s;opacity:${isSel ? '1' : '0.75'};box-shadow:${isSel ? `0 0 0 2px ${C.stork}` : 'none'}`
        el.title = `${s.name} (${s.nests} nests)`
        el.addEventListener('click', () => onSelect(i))
        const label = document.createElement('div')
        label.style.cssText = `position:absolute;left:${(isSel ? size + 6 : size) + 6}px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:${isSel ? '11px' : '9px'};font-weight:${isSel ? '700' : '500'};font-family:Inter,system-ui,sans-serif;color:${isSel ? C.ink : C.muted};text-shadow:0 0 4px #FAFAF8,0 0 4px #FAFAF8,0 0 4px #FAFAF8`
        label.textContent = s.name
        const w = document.createElement('div'); w.style.position = 'relative'; w.appendChild(el); w.appendChild(label)
        markersRef.current.push(new mapboxgl.default.Marker({ element: w, anchor: 'center' }).setLngLat([s.lon, s.lat]).addTo(mapRef.current!))
      })
    })
  }, [mapLoaded, sites, selectedIdx, onSelect])

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    const s = sites[selectedIdx]
    mapRef.current.flyTo({ center: [s.lon, s.lat], zoom: 10, duration: 800 })
  }, [selectedIdx, mapLoaded, sites])

  return (
    <div className="relative w-full mt-3">
      <div ref={mapContainer} className="w-full h-[380px] md:h-[480px]" style={{ background: '#f2f0eb' }} />
      {mapLoaded && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 max-w-[220px] border" style={{ borderColor: C.border }}>
          <p className="font-mono text-[14px] font-bold" style={{ color: C.ink }}>{sites[selectedIdx].name}</p>
          <p className="font-mono text-[10px] mt-0.5" style={{ color: C.muted }}>{sites[selectedIdx].city} · {sites[selectedIdx].type}</p>
          <p className="font-mono text-[10px] mt-1" style={{ color: C.stork }}>{sites[selectedIdx].nests} nests · {sites[selectedIdx].elevation}</p>
          <p className="font-mono text-[10px] mt-0.5" style={{ color: C.muted }}>{sites[selectedIdx].period}</p>
        </div>
      )}
      {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center bg-[#f2f0eb]"><p className="font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: C.muted }}>Loading map...</p></div>}
    </div>
  )
}

// ═══ SITE ROW ═══
function SiteRow({ site: s, index, parentVis, maxNests }: {
  site: NestSite; index: number; parentVis: boolean; maxNests: number
}) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="transition-all duration-500" style={{ opacity: parentVis ? 1 : 0, transitionDelay: `${index * 50}ms` }}>
      <div className="flex items-center gap-3 cursor-pointer group py-1.5" onClick={() => setExpanded(!expanded)}>
        <span className="font-mono text-[11px] w-44 shrink-0 truncate group-hover:underline" style={{ color: C.ink }}>
          {s.name}
        </span>
        <div className="flex-1 h-4 rounded-sm" style={{ background: `${C.border}30` }}>
          <div className="h-full rounded-sm transition-all duration-700"
            style={{
              width: parentVis ? `${(s.nests / maxNests) * 100}%` : '0%',
              background: `${C.stork}15`,
              borderRight: `2px solid ${C.stork}`,
              transitionDelay: `${index * 50}ms`,
            }} />
        </div>
        <span className="font-mono text-[11px] font-bold w-12 text-right shrink-0" style={{ color: C.stork }}>
          {s.nests}
        </span>
        <span className="font-mono text-[9px] w-16 text-right shrink-0" style={{ color: 'rgba(255,255,255,0.7)' }}>{s.city}</span>
      </div>
      {expanded && (
        <div className="ml-44 pl-3 border-l-2 py-2 mb-2" style={{ borderColor: C.stork }}>
          <div className="flex gap-4 mb-2 flex-wrap">
            {[
              { l: 'Type', v: s.type },
              { l: 'Elevation', v: s.elevation },
              { l: 'Season', v: s.period },
            ].map(f => (
              <div key={f.l}>
                <p className="font-mono text-[9px] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>{f.l}</p>
                <p className="font-mono text-[11px]" style={{ color: C.text }}>{f.v}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] italic leading-[1.6]" style={{ color: C.text }}>{s.note}</p>
        </div>
      )}
    </div>
  )
}

// ═══ MAIN EXPORT ═══
export function StorksEyeViewContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const flyR = useReveal()
  const sitesR = useReveal()
  const popR = useReveal()
  const [selectedSiteIdx, setSelectedSiteIdx] = useState(0)

  const totalNests = SITES.reduce((a, s) => a + s.nests, 0)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Field Journal No. 031 · Biodiversity &amp; Heritage</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)', color: C.ink }}>
            <em>The Stork&apos;s Eye View</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Ciconia ciconia. Where ruins rise, nests follow.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          White storks nest on the minarets of Chellah, the crumbling walls of El Badi Palace,
          and the Roman columns of <span className="underline underline-offset-2">Volubilis</span>. In Moroccan folklore, they are sacred — believed
          to carry human souls, to bring good fortune, to be humans transformed. Harming a stork
          is taboo. Morocco hosts approximately 2,931 breeding pairs and thousands more
          wintering birds. They choose ruins over new buildings. The higher the pour of history,
          the deeper the nest.
        </p>

        {/* ─── LIVE STATUS ─── */}
        {(() => {
          const m = new Date().getMonth()
          const status = m >= 1 && m <= 2
            ? { text: 'Storks arriving. First pairs returning from West Africa to Moroccan nesting sites.', phase: 'Returning', color: C.flight, icon: '↗' }
            : m >= 3 && m <= 5
            ? { text: 'Breeding season. Chicks hatching at Chellah, El Badi, Volubilis. Nests active across all 11 sites.', phase: 'Breeding', color: C.stork, icon: '◉' }
            : m >= 6 && m <= 7
            ? { text: 'Fledging. Young storks testing wings on Marinid walls and Roman columns.', phase: 'Fledging', color: C.warm, icon: '↑' }
            : m >= 8 && m <= 9
            ? { text: 'Southbound. 150,000+ storks funneling through the Strait of Gibraltar toward the Sahel.', phase: 'Migrating South', color: C.sky, icon: '↓' }
            : { text: 'Overwintering. ~30% of Moroccan storks now stay year-round. The rest are in the Sahel, 3,000 km south.', phase: 'Wintering', color: C.water, icon: '◎' }
          return (
            <div className="mt-8 flex items-start gap-3 p-4" style={{ background: `${status.color}08`, borderLeft: `3px solid ${status.color}` }}>
              <span className="inline-block w-[8px] h-[8px] rounded-full mt-1 animate-pulse shrink-0" style={{ background: status.color }} />
              <div>
                <span className="font-mono text-[11px] font-semibold" style={{ color: status.color }}>{status.icon} {status.phase} — {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
                <p className="text-[12px] mt-1" style={{ color: C.text }}>{status.text}</p>
              </div>
            </div>
          )
        })()}

        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '~3,000', unit: 'pairs', l: 'breeding in Morocco', c: C.stork },
            { v: '82K', unit: 'tonnes', l: 'of tea (wrong module)', c: C.stork },
            { v: `${totalNests}+`, unit: 'nests', l: 'at 11 landmark sites', c: C.nest },
            { v: '14', unit: 'km', l: 'Gibraltar crossing', c: C.sky },
          ].map((n, i) => {
            if (i === 1) return (
              <div key="weight" className="transition-all duration-700"
                style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 150}ms` }}>
                <p className="font-mono leading-none" style={{ color: C.flight }}>
                  <span className="text-[28px] font-bold">2,500</span>
                  <span className="text-[13px] ml-1">m</span>
                </p>
                <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>highest nest altitude</p>
              </div>
            )
            return (
              <div key={n.l} className="transition-all duration-700"
                style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 150}ms` }}>
                <p className="font-mono leading-none" style={{ color: n.c }}>
                  <span className="text-[28px] font-bold">{n.v}</span>
                  <span className="text-[13px] ml-1">{n.unit}</span>
                </p>
                <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══ CHELLAH NEST MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.stork }}>Plate I · Chellah Nest Survey</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            10 nests mapped on the Marinid minaret, Roman columns, and perimeter walls.
            Click a nest for field notes.
          </p>
          <ChellahNestMap />
        </div>
      </section>

      {/* ═══ MIGRATION FLYWAY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={flyR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.flight }}>Plate II · The Western Flyway</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Europe → Gibraltar → Morocco → Sahel. The western migration route. Some storks no longer cross the Sahara — milder winters and landfill feeding keep them in Morocco year-round.
          </p>
          <div className="space-y-1">
            {FLYWAY_POINTS.map((p, i) => {
              // Determine if storks are currently at this location
              const m = new Date().getMonth() // 0=Jan
              const monthRanges: Record<string, number[]> = {
                'Northern Europe': [3,4,5,6,7], 'Central Europe': [7,8],
                'Iberia': [8,9,2,3], 'Strait of Gibraltar': [8,9,2,3],
                'Northern Morocco': [9,10,1,2], 'Gharb Wetlands': [9,10,11,0,1,2],
                'Middle Atlas': [10,11,0,1], 'Sub-Sahara': [10,11,0,1,2],
              }
              const isHere = monthRanges[p.name]?.includes(m) || false
              return (
              <div key={p.name} className="flex items-center gap-3 transition-all duration-500"
                style={{ opacity: flyR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
                <span className="font-mono text-[10px] w-14 text-right shrink-0" style={{ color: C.muted }}>{p.lat}°N</span>
                {/* Flight line */}
                <div className="relative w-6 flex justify-center">
                  <div className="w-px h-6" style={{ background: i < FLYWAY_POINTS.length - 1 ? C.flight : 'transparent' }} />
                  <div className={`absolute top-1/2 -translate-y-1/2 rounded-full border ${isHere ? 'animate-pulse' : ''}`}
                    style={{
                      width: isHere ? '10px' : '10px', height: isHere ? '10px' : '10px',
                      borderColor: isHere ? C.stork : p.name === 'Strait of Gibraltar' ? C.sky : C.flight,
                      background: isHere ? C.stork : p.name === 'Strait of Gibraltar' ? C.sky : `${C.flight}20`,
                      boxShadow: isHere ? `0 0 8px ${C.stork}60` : 'none',
                    }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[11px]" style={{ color: C.ink, fontWeight: isHere ? 700 : 400 }}>{p.name}</span>
                  <span className="font-mono text-[10px] ml-2" style={{ color: isHere ? C.stork : C.muted }}>{p.label}</span>
                  {isHere && <span className="font-mono text-[9px] ml-2 font-semibold" style={{ color: C.stork }}>← NOW</span>}
                </div>
                <span className="font-mono text-[10px] shrink-0" style={{ color: isHere ? C.stork : C.muted, fontWeight: isHere ? 600 : 400 }}>{p.month}</span>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ COLONY MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.stork }}>Colony Map — Click markers to fly between nesting sites</p>
          <StorkColonyMap sites={SITES} selectedIdx={selectedSiteIdx} onSelect={setSelectedSiteIdx} />
        </div>
      </section>

      {/* ═══ MONUMENT NESTING SITES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={sitesR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.nest }}>Plate III · Nesting Inventory</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            11 landmark sites. Click to expand field notes. Bar shows nest density.
          </p>
          <div className="space-y-1">
            {[...SITES].sort((a, b) => b.nests - a.nests).map((s, i) => (
              <SiteRow key={s.name} site={s} index={i} parentVis={sitesR.vis} maxNests={40} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ POPULATION TREND ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={popR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.stork }}>Plate IV · Breeding Pairs in Morocco</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Decennial census by NABU / GREPOM BirdLife Morocco. Population crashed in the 1990s, partially recovering with changing migration behaviour.
          </p>
          <div className="flex items-end gap-6 h-[180px] mb-2">
            {POP_DATA.map((d, i) => {
              const maxPairs = 7600
              const h = (d.pairs / maxPairs) * 100
              return (
                <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="font-mono text-[12px] font-bold mb-1" style={{ color: C.stork }}>
                    {d.pairs.toLocaleString()}
                  </span>
                  <div className="w-full rounded-t-sm transition-all duration-700"
                    style={{
                      height: popR.vis ? `${h}%` : '0%',
                      background: `${C.stork}20`,
                      borderTop: `2px solid ${C.stork}`,
                      transitionDelay: `${i * 120}ms`,
                    }} />
                  <span className="font-mono text-[10px] mt-1" style={{ color: C.ink }}>{d.year}</span>
                </div>
              )
            })}
          </div>
          <div className="space-y-1 mt-4">
            {POP_DATA.map(d => (
              <div key={d.year} className="flex items-center gap-2">
                <span className="font-mono text-[10px] w-10 shrink-0 font-bold" style={{ color: C.ink }}>{d.year}</span>
                <span className="font-mono text-[10px]" style={{ color: C.muted }}>{d.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Field Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.stork }}>Why Ruins, Not New Buildings</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Storks prefer elevated flat surfaces with easy landing access. Minarets,
                broken walls, and Roman columns offer exactly this. Modern rooftops are
                too smooth, too sloped, too maintained. The correlation is striking: restored
                monuments lose storks. Abandoned ones gain them. The birds are heritage
                indicators — their presence marks the line between preserved-for-tourists
                and forgotten-by-humans.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.flight }}>The Landfill Effect</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                An increasing number of white storks no longer migrate across the Sahara.
                Urban landfills in Morocco provide year-round food — a dark subsidy.
                In the Gharb region, storks feed at open dumps near their traditional
                wetland habitats. This changes the population structure: resident storks
                outcompete migrants for nesting sites. The sacred bird that once announced
                the seasons now announces the garbage schedule.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.ruin }}>Nests as Architecture</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                A mature stork nest weighs 60–250 kg. Built from sticks, grass, rags,
                and plastic, it is rebuilt each year, growing larger. At Chellah, the
                oldest nests are 1.5 metres wide. Their weight accelerates the ruin —
                walls crack under a century of nesting. The birds are simultaneously
                preserving (by attracting visitors) and destroying (by overloading)
                the heritage they inhabit. A perfect Moroccan paradox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The storks do not care about UNESCO designations. They care about
            altitude, wind, and food. That their nests happen to crown the most
            photographed ruins in Morocco is coincidence dressed as destiny.
            In Moroccan tradition, the bird that nests on your roof carries
            your prayers to heaven. At Chellah, the prayers are Roman,
            Marinid, and avian — three civilisations stacked on one minaret,
            each building on what the last one left behind.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Morocco breeding pairs (2,931): GREPOM BirdLife Morocco 2014 census, in Journal of
            Coastal Conservation (2020). 8th International White Stork Census (2024): NABU/BirdLife
            International, preliminary results (O. Himmi, Mohammed V University Rabat). Rabat nest
            site selection (107 nests): El Hassani et al., Estuarine Coastal and Shelf Science (2020).
            Western flyway and Gibraltar crossing: BirdLife International migration factsheet.
            Chellah colony: Observational data from MaghrebOrnitho (El Khamlichi 2011, 2024).
            Altitude record (2,500m): Schulz 1988. Population trend: NABU decennial census 1984–2024.
            Nest weights (60–250 kg): Cramp &amp; Simmons, BWP. Landfill feeding: BirdLife, Yabiladi (2020).
            Moroccan folklore: Morocco Green Tours, field consultation. Site-specific nest counts
            are editorial estimates based on photography counts and published colony data.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.stork }}>© Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
