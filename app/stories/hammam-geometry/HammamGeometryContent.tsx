'use client'

import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════
// THE HAMMAM GEOMETRY — Architecture as Data
// Module 049 · Slow Morocco
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  cool: '#5C8A97', warm: '#B8814A', hot: '#A13D2D', steam: '#C4B59D',
  water: '#5B8FA8', fire: '#C45A3C', stone: '#8C7E6E', marble: '#D4CBC0',
  bg: '#ffffff',
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

const ROOMS = [
  {
    id: 'mashlah', nameAr: 'المسلخ', nameFr: 'Al-Goulssa / Mashlah',
    english: 'Undressing & Rest Room', roman: 'Apodyterium',
    temp: '22–25°C', humidity: '30–40%', light: '60 lx max',
    desc: 'The threshold. Cool and dry. Zellij-tiled walls, carved stucco dome, benches, sometimes a wall fountain. Bathers undress, store clothes, rest after. The social room — where deals are struck and gossip flows.',
    features: ['Zellij tilework', 'Carved stucco dome', 'Wall fountain', 'Benches / platforms', 'Clothes storage'],
    dimensions: '6–8m × 6–8m', ceiling: '4–6m (central dome)', floor: 'Marble or zellige',
    color: C.cool,
  },
  {
    id: 'barrani', nameAr: 'البراني', nameFr: 'Al-Barrani',
    english: 'Warm Room', roman: 'Tepidarium',
    temp: '30–38°C', humidity: '50–60%', light: '30–40 lx',
    desc: 'The transition. Body begins to adjust. The scrubbing room — where the kessa glove meets skin. Black soap (sabun beldi) is applied here. Most time is spent in this room. The working room of the hammam.',
    features: ['Hot/cold water taps', 'Drainage channels', 'Marble floor (heated)', 'Small dome with oculi', 'Buckets and ladles'],
    dimensions: '5–7m × 4–6m', ceiling: '3–4m (vaulted)', floor: 'Heated marble slabs',
    color: C.warm,
  },
  {
    id: 'dakhli', nameAr: 'الداخلي', nameFr: 'Al-Dakhli',
    english: 'Hot Room', roman: 'Caldarium',
    temp: '40–50°C', humidity: '80–100%', light: '<20 lx',
    desc: 'The core. Closest to the furnace. Steam so thick you can barely see. The floor is almost too hot to touch. Wooden sandals (naail) are worn. The burma — a large water basin fed from the cauldron — sits against the back wall. Pores open. The body surrenders.',
    features: ['Burma (water basin)', 'Hottest floor (direct hypocaust)', 'Dense steam', 'Minimal light', 'Back wall shared with furnace'],
    dimensions: '4–6m × 4–5m', ceiling: '3–4m (domed)', floor: 'Heated stone (45°C+)',
    color: C.hot,
  },
]

const FURNACE = {
  nameAr: 'الفرناتشي', nameFr: 'Al-Farnatchi',
  english: 'Furnace Room',
  desc: 'Not accessible to bathers. The farran (fire attendant) feeds wood, olive pits, and sawdust into the furnace. A large brass cauldron sits over the fire, heating water. Hot air channels below the floor into the hypocaust. The farran also cooks tanjia pots and cow feet (koreenes) for the neighbourhood — the heat economy wastes nothing.',
  fuel: ['Wood', 'Olive pits', 'Sawdust', 'Carpenter shavings'],
  temp: '200–400°C (fire)', water: '80–95°C (cauldron)',
}

const HYPOCAUST = {
  desc: 'Inherited from Roman thermae. Pillars of brick or stone (60–120cm high) support floor slabs. Hot air from the furnace flows through these channels, heating the floor from below. The thicker the slab, the longer it retains heat. Flues in the walls carry warm air upward and out through chimneys — the hot room\'s walls are double-skinned.',
  pillarHeight: '60–120 cm', slabThickness: '15–25 cm',
  floorTemp: { hot: '45–55°C', warm: '32–38°C', cool: '22–25°C' },
}

const WATER_SYSTEM = {
  desc: 'A single brass cauldron over the furnace heats water to 80–95°C. Hot water flows by gravity into the burma (basin) in the hot room. Bathers mix hot and cold water in buckets to their preferred temperature. Cold water arrives from a rooftop cistern or municipal supply. All water drains through sloped floors into channels that exit the building. Running water, never pools — an Islamic principle.',
  flow: ['Rooftop cistern → cold taps', 'Cauldron (80–95°C) → burma in hot room', 'Bathers mix in buckets', 'Sloped floors → drainage channels → exit'],
}

const ROOF = {
  desc: 'Domed and vaulted ceilings with small star-shaped glass oculi — the only light source. Total roof opening area is less than 2% of floor area. Maximum illuminance never exceeds 60 lux. In the hot room, steam accumulation reduces light to near darkness by afternoon. The dome shape forces condensation to run down the curved walls rather than drip on bathers.',
  oculi: 'Star-shaped glass openings', ratio: '<2% of floor area',
  maxLux: '60 lx (cool room)', minLux: '<20 lx (hot room, afternoon)',
}

const TIMELINE_POINTS = [
  { period: '1st c. BCE', event: 'Roman thermae arrive in Mauretania Tingitana (Volubilis)' },
  { period: '8th c.', event: 'Oldest known Islamic hammam in Morocco (Volubilis, Idrissid period)' },
  { period: '12th c.', event: 'Almohad dynasty builds hammams beside every mosque' },
  { period: '14th c.', event: 'Marinid period — Hammam Saffarin built in Fes (still operating)' },
  { period: '19th c.', event: 'Fes has 100+ public hammams. Every neighbourhood has one.' },
  { period: 'Today', event: 'Morocco has the highest number of traditional living hammams in the Islamic world' },
]

const PRODUCTS = [
  { name: 'Sabun Beldi', english: 'Black Soap', desc: 'Olive oil paste aged 3 months. Applied to open pores, then scrubbed off with kessa.', origin: 'Fes, Meknès' },
  { name: 'Kessa', english: 'Exfoliating Glove', desc: 'Rough woven mitt. Removes dead skin in visible grey rolls. The core tool.', origin: 'Local weavers' },
  { name: 'Ghassoul', english: 'Rhassoul Clay', desc: 'Mineral clay from the Moulouya Valley. Only mined in Morocco. Applied to face and hair.', origin: 'Moulouya Valley' },
  { name: 'Naail', english: 'Wooden Sandals', desc: 'Thick wooden clogs. Essential in the hot room where marble exceeds 45°C.', origin: 'Carpenter workshops' },
  { name: 'Steau', english: 'Bucket & Ladle', desc: 'Plastic now, historically copper. Bathers fill from taps, mix hot and cold.', origin: 'Local' },
  { name: 'Henna', english: 'Hair Treatment', desc: 'Applied to hair in the warm room. Lawsonia inermis. Conditions and colours.', origin: 'Azilal, Beni Mellal' },
]

// ═══════════════════════════════════════════════════
// SVG FLOOR PLAN
// ═══════════════════════════════════════════════════

function FloorPlan({ activeRoom, setActiveRoom }: { activeRoom: string | null, setActiveRoom: (r: string | null) => void }) {
  const r = useReveal()
  const w = 800, h = 420

  // Room positions (linear layout: entrance → cool → warm → hot → furnace)
  const rooms = [
    { id: 'mashlah', x: 60, y: 60, w: 180, h: 300, label: 'MASHLAH', sub: '22–25°C', color: C.cool },
    { id: 'barrani', x: 260, y: 80, w: 160, h: 260, label: 'BARRANI', sub: '30–38°C', color: C.warm },
    { id: 'dakhli', x: 440, y: 100, w: 140, h: 220, label: 'DAKHLI', sub: '40–50°C', color: C.hot },
    { id: 'furnace', x: 600, y: 120, w: 120, h: 180, label: 'FARNATCHI', sub: '200–400°C', color: C.fire },
  ]

  return (
    <div ref={r.ref} className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[800px] mx-auto transition-opacity duration-1000" style={{ opacity: r.vis ? 1 : 0 }}>
        <defs>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={C.stone} strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <marker id="arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.water} />
          </marker>
          <marker id="arrowHeat" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.fire} opacity="0.6" />
          </marker>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width={w} height={h} fill={C.bg} />

        {/* Grid */}
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`gx${i}`} x1={i * 50} y1="0" x2={i * 50} y2={h} stroke={C.border} strokeWidth="0.3" opacity="0.5" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`gy${i}`} x1="0" y1={i * 50} x2={w} y2={i * 50} stroke={C.border} strokeWidth="0.3" opacity="0.5" />
        ))}

        {/* Outer walls */}
        <rect x="50" y="50" width="680" height="320" fill="none" stroke={C.ink} strokeWidth="3" />

        {/* Room fills */}
        {rooms.map(rm => (
          <g key={rm.id}>
            <rect x={rm.x} y={rm.y} width={rm.w} height={rm.h}
              fill={rm.color} opacity={activeRoom === null ? 0.12 : activeRoom === rm.id ? 0.25 : 0.05}
              className="cursor-pointer transition-opacity duration-300"
              onClick={() => setActiveRoom(activeRoom === rm.id ? null : rm.id)} />
            <rect x={rm.x} y={rm.y} width={rm.w} height={rm.h}
              fill="url(#hatch)" className="pointer-events-none" />
            <rect x={rm.x} y={rm.y} width={rm.w} height={rm.h}
              fill="none" stroke={C.ink} strokeWidth="1.5" className="pointer-events-none" />
          </g>
        ))}

        {/* Interior walls */}
        <line x1="250" y1="50" x2="250" y2="370" stroke={C.ink} strokeWidth="2" />
        <line x1="430" y1="50" x2="430" y2="370" stroke={C.ink} strokeWidth="2" />
        <line x1="590" y1="50" x2="590" y2="370" stroke={C.ink} strokeWidth="2" />

        {/* Doorways (gaps in walls) */}
        {/* Entrance */}
        <line x1="50" y1="180" x2="50" y2="230" stroke={C.bg} strokeWidth="4" />
        <line x1="48" y1="180" x2="52" y2="180" stroke={C.ink} strokeWidth="2" />
        <line x1="48" y1="230" x2="52" y2="230" stroke={C.ink} strokeWidth="2" />
        {/* Cool → Warm */}
        <line x1="250" y1="185" x2="250" y2="225" stroke={C.bg} strokeWidth="4" />
        {/* Warm → Hot */}
        <line x1="430" y1="190" x2="430" y2="220" stroke={C.bg} strokeWidth="4" />

        {/* Domes (circles on plan) */}
        <circle cx="150" cy="210" r="60" fill="none" stroke={C.cool} strokeWidth="0.7" strokeDasharray="4,3" opacity="0.5" />
        <circle cx="340" cy="210" r="45" fill="none" stroke={C.warm} strokeWidth="0.7" strokeDasharray="4,3" opacity="0.5" />
        <circle cx="510" cy="210" r="38" fill="none" stroke={C.hot} strokeWidth="0.7" strokeDasharray="4,3" opacity="0.5" />

        {/* Fountain in mashlah */}
        <rect x="200" y="300" width="30" height="30" fill="none" stroke={C.water} strokeWidth="1" />
        <circle cx="215" cy="315" r="8" fill="none" stroke={C.water} strokeWidth="0.7" />

        {/* Burma (basin) in hot room */}
        <rect x="470" y="260" width="50" height="30" fill={C.water} opacity="0.15" stroke={C.water} strokeWidth="1" />
        <text x="495" y="279" textAnchor="middle" fill={C.water} fontSize="7" fontFamily="monospace">BURMA</text>

        {/* Cauldron in furnace */}
        <circle cx="660" cy="210" r="25" fill={C.fire} opacity="0.15" stroke={C.fire} strokeWidth="1.5" />
        <text x="660" y="213" textAnchor="middle" fill={C.fire} fontSize="7" fontFamily="monospace">CAULDRON</text>

        {/* Water flow arrows */}
        <path d="M 660 235 Q 580 290 495 260" fill="none" stroke={C.water} strokeWidth="1.2" strokeDasharray="4,2" markerEnd="url(#arrowR)" opacity="0.7" />

        {/* Heat flow arrows (hypocaust) */}
        <path d="M 640 300 L 640 340 L 500 340 L 500 310" fill="none" stroke={C.fire} strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#arrowHeat)" opacity="0.4" />
        <path d="M 640 340 L 330 340 L 330 310" fill="none" stroke={C.fire} strokeWidth="0.7" strokeDasharray="3,2" markerEnd="url(#arrowHeat)" opacity="0.25" />

        {/* Room labels */}
        {rooms.map(rm => (
          <g key={`label-${rm.id}`}>
            <text x={rm.x + rm.w / 2} y={rm.y + 20} textAnchor="middle" fill={rm.color} fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1.5">{rm.label}</text>
            <text x={rm.x + rm.w / 2} y={rm.y + 32} textAnchor="middle" fill={rm.color} fontSize="8" fontFamily="monospace" opacity="0.7">{rm.sub}</text>
          </g>
        ))}

        {/* Entrance label */}
        <text x="30" y="210" textAnchor="middle" fill={C.ink} fontSize="7" fontFamily="monospace" transform="rotate(-90,30,210)">ENTRANCE</text>

        {/* Thermal gradient bar */}
        <defs>
          <linearGradient id="thermalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.cool} />
            <stop offset="40%" stopColor={C.warm} />
            <stop offset="70%" stopColor={C.hot} />
            <stop offset="100%" stopColor={C.fire} />
          </linearGradient>
        </defs>
        <rect x="60" y="395" width="660" height="6" fill="url(#thermalGrad)" opacity="0.6" rx="3" />
        <text x="60" y="412" fill={C.cool} fontSize="7" fontFamily="monospace">22°C</text>
        <text x="385" y="412" textAnchor="middle" fill={C.muted} fontSize="7" fontFamily="monospace">← THERMAL GRADIENT →</text>
        <text x="720" y="412" textAnchor="end" fill={C.fire} fontSize="7" fontFamily="monospace">400°C</text>

        {/* Scale */}
        <line x1="60" y1="385" x2="160" y2="385" stroke={C.muted} strokeWidth="0.5" />
        <line x1="60" y1="383" x2="60" y2="387" stroke={C.muted} strokeWidth="0.5" />
        <line x1="160" y1="383" x2="160" y2="387" stroke={C.muted} strokeWidth="0.5" />
        <text x="110" y="383" textAnchor="middle" fill={C.muted} fontSize="6" fontFamily="monospace">~5m</text>

        {/* North arrow */}
        <g transform="translate(750, 30)">
          <line x1="0" y1="15" x2="0" y2="-5" stroke={C.ink} strokeWidth="1" />
          <polygon points="-4,0 4,0 0,-8" fill={C.ink} />
          <text x="0" y="25" textAnchor="middle" fill={C.muted} fontSize="7" fontFamily="monospace">N</text>
        </g>
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// SVG CROSS SECTION
// ═══════════════════════════════════════════════════

function CrossSection() {
  const r = useReveal()
  const w = 800, h = 350

  return (
    <div ref={r.ref} className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[800px] mx-auto transition-opacity duration-1000" style={{ opacity: r.vis ? 1 : 0 }}>
        <rect x="0" y="0" width={w} height={h} fill={C.bg} />

        {/* Ground line */}
        <line x1="30" y1="250" x2="770" y2="250" stroke={C.stone} strokeWidth="1.5" />

        {/* Hypocaust zone (below floor) */}
        <rect x="60" y="250" width="650" height="50" fill={C.stone} opacity="0.08" />
        <text x="385" y="268" textAnchor="middle" fill={C.stone} fontSize="8" fontFamily="monospace">HYPOCAUST — UNDERFLOOR HEATING CHANNELS</text>

        {/* Pillars */}
        {[120, 180, 240, 310, 370, 430, 490, 540, 590, 640].map((x, i) => (
          <rect key={i} x={x} y="250" width="8" height="30" fill={C.stone} opacity="0.4" />
        ))}

        {/* Floor slab */}
        <rect x="60" y="240" width="650" height="10" fill={C.marble} stroke={C.stone} strokeWidth="0.5" />

        {/* Hot air flow under floor */}
        <path d="M 690 275 Q 600 285 400 278 Q 200 270 100 280" fill="none" stroke={C.fire} strokeWidth="1" strokeDasharray="4,2" opacity="0.3" />
        <text x="400" y="292" textAnchor="middle" fill={C.fire} fontSize="7" fontFamily="monospace" opacity="0.5">HOT AIR FLOW →</text>

        {/* Room 1: Mashlah (dome) */}
        <path d="M 60 240 L 60 120 Q 60 40 155 40 Q 250 40 250 120 L 250 240" fill="none" stroke={C.cool} strokeWidth="2" />
        <text x="155" y="160" textAnchor="middle" fill={C.cool} fontSize="10" fontFamily="monospace" fontWeight="bold">MASHLAH</text>
        <text x="155" y="175" textAnchor="middle" fill={C.cool} fontSize="8" fontFamily="monospace">22–25°C</text>
        {/* Oculi (star openings in dome) */}
        <circle cx="120" cy="65" r="3" fill={C.cool} opacity="0.3" />
        <circle cx="155" cy="50" r="3" fill={C.cool} opacity="0.3" />
        <circle cx="190" cy="65" r="3" fill={C.cool} opacity="0.3" />

        {/* Room 2: Barrani (vault) */}
        <path d="M 270 240 L 270 130 Q 270 70 370 70 Q 470 70 470 130 L 470 240" fill="none" stroke={C.warm} strokeWidth="2" />
        <text x="370" y="160" textAnchor="middle" fill={C.warm} fontSize="10" fontFamily="monospace" fontWeight="bold">BARRANI</text>
        <text x="370" y="175" textAnchor="middle" fill={C.warm} fontSize="8" fontFamily="monospace">30–38°C</text>
        {/* Oculi */}
        <circle cx="350" cy="82" r="3" fill={C.warm} opacity="0.3" />
        <circle cx="390" cy="82" r="3" fill={C.warm} opacity="0.3" />

        {/* Room 3: Dakhli (dome, lower) */}
        <path d="M 490 240 L 490 140 Q 490 85 565 85 Q 640 85 640 140 L 640 240" fill="none" stroke={C.hot} strokeWidth="2" />
        <text x="565" y="160" textAnchor="middle" fill={C.hot} fontSize="10" fontFamily="monospace" fontWeight="bold">DAKHLI</text>
        <text x="565" y="175" textAnchor="middle" fill={C.hot} fontSize="8" fontFamily="monospace">40–50°C</text>
        {/* Minimal oculi */}
        <circle cx="565" cy="97" r="3" fill={C.hot} opacity="0.3" />

        {/* Steam particles in hot room */}
        {[510, 530, 545, 560, 575, 590, 610, 625].map((x, i) => (
          <circle key={i} cx={x} cy={195 + Math.sin(i * 1.3) * 12} r="1.5" fill={C.steam} opacity={0.15 + (i % 3) * 0.08} />
        ))}

        {/* Furnace (behind hot room wall) */}
        <rect x="650" y="140" width="80" height="100" fill={C.fire} opacity="0.08" stroke={C.fire} strokeWidth="1.5" />
        <text x="690" y="185" textAnchor="middle" fill={C.fire} fontSize="9" fontFamily="monospace" fontWeight="bold">FURNACE</text>
        <text x="690" y="198" textAnchor="middle" fill={C.fire} fontSize="7" fontFamily="monospace">200–400°C</text>
        {/* Flame */}
        <path d="M 685 220 Q 680 205 690 195 Q 700 205 695 220" fill={C.fire} opacity="0.3" />

        {/* Chimney / flue */}
        <rect x="720" y="20" width="10" height="120" fill="none" stroke={C.muted} strokeWidth="1" strokeDasharray="3,2" />
        <path d="M 725 140 L 725 30" fill="none" stroke={C.fire} strokeWidth="0.7" strokeDasharray="2,2" opacity="0.3" />
        <text x="745" y="80" fill={C.muted} fontSize="6" fontFamily="monospace" transform="rotate(90,745,80)">CHIMNEY</text>

        {/* Cauldron */}
        <ellipse cx="665" cy="218" rx="12" ry="8" fill="none" stroke={C.water} strokeWidth="1" />
        <text x="665" y="234" textAnchor="middle" fill={C.water} fontSize="6" fontFamily="monospace">CAULDRON</text>

        {/* Wall between rooms (internal) */}
        <rect x="250" y="100" width="20" height="140" fill={C.stone} opacity="0.15" />
        <rect x="470" y="100" width="20" height="140" fill={C.stone} opacity="0.15" />
        <rect x="640" y="100" width="10" height="140" fill={C.stone} opacity="0.2" />

        {/* Wall flues (double-skinned walls) */}
        <path d="M 643 250 L 643 110" fill="none" stroke={C.fire} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
        <path d="M 647 250 L 647 110" fill="none" stroke={C.fire} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />

        {/* Labels */}
        <text x="385" y="320" textAnchor="middle" fill={C.muted} fontSize="9" fontFamily="monospace">LONGITUDINAL SECTION · TYPICAL MOROCCAN HAMMAM · SCALE APPROXIMATE</text>

        {/* Condensation arrows on dome */}
        <path d="M 130 80 Q 100 120 80 200" fill="none" stroke={C.water} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
        <text x="75" y="140" fill={C.water} fontSize="6" fontFamily="monospace" transform="rotate(-70,75,140)" opacity="0.5">condensation</text>
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// THERMAL DATA TABLE
// ═══════════════════════════════════════════════════

function ThermalTable() {
  const r = useReveal()
  const data = [
    { metric: 'Air Temperature', mashlah: '22–25°C', barrani: '30–38°C', dakhli: '40–50°C', furnace: '200–400°C' },
    { metric: 'Floor Temperature', mashlah: '22°C', barrani: '32–38°C', dakhli: '45–55°C', furnace: '—' },
    { metric: 'Humidity', mashlah: '30–40%', barrani: '50–60%', dakhli: '80–100%', furnace: '—' },
    { metric: 'Illuminance', mashlah: '≤60 lx', barrani: '30–40 lx', dakhli: '<20 lx', furnace: '—' },
    { metric: 'Wall Construction', mashlah: 'Single', barrani: 'Single', dakhli: 'Double (flues)', furnace: 'Double' },
    { metric: 'Roof Openings', mashlah: '~2% of area', barrani: '~1.5%', dakhli: '<1%', furnace: 'None' },
    { metric: 'Time Spent', mashlah: 'Before & after', barrani: '30–45 min', dakhli: '5–15 min', furnace: 'Staff only' },
  ]
  return (
    <div ref={r.ref} className="overflow-x-auto">
      <table className="w-full text-[12px]" style={{ color: C.text }}>
        <thead>
          <tr className="border-b" style={{ borderColor: C.border }}>
            <th className="text-left font-mono text-[10px] py-2 pr-4" style={{ color: C.muted }}></th>
            <th className="text-center font-mono text-[10px] py-2 px-3" style={{ color: C.cool }}>Mashlah</th>
            <th className="text-center font-mono text-[10px] py-2 px-3" style={{ color: C.warm }}>Barrani</th>
            <th className="text-center font-mono text-[10px] py-2 px-3" style={{ color: C.hot }}>Dakhli</th>
            <th className="text-center font-mono text-[10px] py-2 px-3" style={{ color: C.fire }}>Furnace</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.metric} className="border-b transition-opacity duration-300"
              style={{ borderColor: '#f5f5f5', opacity: r.vis ? 1 : 0, transitionDelay: `${i * 40}ms` }}>
              <td className="py-2 pr-4 font-mono text-[10px]" style={{ color: C.muted }}>{row.metric}</td>
              <td className="py-2 px-3 text-center">{row.mashlah}</td>
              <td className="py-2 px-3 text-center">{row.barrani}</td>
              <td className="py-2 px-3 text-center">{row.dakhli}</td>
              <td className="py-2 px-3 text-center">{row.furnace}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// ROOM DETAIL PANEL
// ═══════════════════════════════════════════════════

function RoomDetail({ roomId }: { roomId: string | null }) {
  if (!roomId) return null
  if (roomId === 'furnace') {
    return (
      <div className="border-t pt-6 mt-6 transition-all duration-300" style={{ borderColor: C.fire }}>
        <div className="flex flex-wrap gap-2 items-baseline mb-3">
          <span className="font-serif text-[22px]" style={{ color: C.fire }}>Al-Farnatchi</span>
          <span className="font-mono text-[12px]" style={{ color: C.muted }}>الفرناتشي · Furnace Room</span>
        </div>
        <p className="text-[13px] leading-relaxed mb-4" style={{ color: C.text }}>{FURNACE.desc}</p>
        <div className="flex flex-wrap gap-6 text-[12px]">
          <div><span className="font-mono text-[10px] block" style={{ color: C.fire }}>Fire Temp</span>{FURNACE.temp}</div>
          <div><span className="font-mono text-[10px] block" style={{ color: C.fire }}>Cauldron</span>{FURNACE.water}</div>
          <div><span className="font-mono text-[10px] block" style={{ color: C.fire }}>Fuel</span>{FURNACE.fuel.join(', ')}</div>
        </div>
      </div>
    )
  }
  const room = ROOMS.find(r => r.id === roomId)
  if (!room) return null
  return (
    <div className="border-t pt-6 mt-6 transition-all duration-300" style={{ borderColor: room.color }}>
      <div className="flex flex-wrap gap-2 items-baseline mb-3">
        <span className="font-serif text-[22px]" style={{ color: room.color }}>{room.nameFr}</span>
        <span className="font-mono text-[12px]" style={{ color: C.muted }}>{room.nameAr} · {room.roman}</span>
      </div>
      <p className="text-[13px] leading-relaxed mb-4" style={{ color: C.text }}>{room.desc}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[12px] mb-4">
        <div><span className="font-mono text-[10px] block" style={{ color: room.color }}>Temperature</span>{room.temp}</div>
        <div><span className="font-mono text-[10px] block" style={{ color: room.color }}>Humidity</span>{room.humidity}</div>
        <div><span className="font-mono text-[10px] block" style={{ color: room.color }}>Illuminance</span>{room.light}</div>
        <div><span className="font-mono text-[10px] block" style={{ color: room.color }}>Dimensions</span>{room.dimensions}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {room.features.map(f => (
          <span key={f} className="text-[10px] font-mono px-2 py-1 rounded" style={{ background: `${room.color}10`, color: room.color }}>{f}</span>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// EXPORTED COMPONENT
// ═══════════════════════════════════════════════════

export function HammamGeometryContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const [activeRoom, setActiveRoom] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-10">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 049 · Architectural Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Hammam<br />Geometry</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-6" style={{ color: C.muted }}>
            Architecture as thermal machine — the geometry of water, fire, and stone
          </p>
          <p className="text-[15px] leading-[1.8] max-w-[600px]" style={{ color: C.text }}>
            A traditional Moroccan <span className="underline underline-offset-2">hammam</span> is a Roman hypocaust that never stopped working.
            Three rooms arranged on a single axis — cool, warm, hot — each one degree closer
            to the furnace behind the wall. Hot air flows under the floor through pillared channels.
            Water is heated in a brass cauldron and carried by gravity to the bathing rooms.
            Steam rises through domed ceilings pierced by star-shaped oculi.
            The geometry is 2,000 years old. The Saffarin Hammam in <span className="underline underline-offset-2">Fes</span>, built in the 14th century,
            is still operating. This module is the blueprint.
          </p>
        </div>
      </section>

      {/* KEY NUMBERS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-10">
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: '3', l: 'Bathing rooms (cool → warm → hot)', c: C.warm },
            { n: '22–50°C', l: 'Temperature gradient', c: C.hot },
            { n: '<2%', l: 'Roof opening to floor area ratio', c: C.stone },
            { n: '14th c.', l: 'Saffarin Hammam, Fes (still open)', c: C.cool },
            { n: '60 lx', l: 'Max illuminance (cool room)', c: C.muted },
            { n: '80–95°C', l: 'Cauldron water temperature', c: C.fire },
            { n: '60–120cm', l: 'Hypocaust pillar height', c: C.stone },
            { n: '100+', l: 'Public hammams in Fes (19th c.)', c: C.warm },
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

      {/* I. THE PLAN */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Plan</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          Floor plan of a typical Moroccan hammam. Linear axis from entrance to furnace.
          Click any room for detail. The thermal gradient runs left to right — from street temperature to fire.
        </p>
        <FloorPlan activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
        <RoomDetail roomId={activeRoom} />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* II. THE SECTION */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Section</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          Longitudinal cross-section. Domed ceilings with star-shaped oculi. Hypocaust channels under the floor.
          The dome shape forces condensation to run down the walls — never dripping on bathers.
        </p>
        <CrossSection />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* III. THERMAL DATA */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Thermal Data</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          Temperature, humidity, light, and time for each room. The hot room floor exceeds 45°C —
          wooden sandals (naail) are essential. Light drops below 20 lux as steam accumulates.
        </p>
        <ThermalTable />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* IV. THE SYSTEMS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section IV</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div>
            <p className="font-mono text-[11px] mb-2" style={{ color: C.fire }}>HYPOCAUST (Heating)</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{HYPOCAUST.desc}</p>
            <div className="flex gap-4 mt-3 text-[11px]">
              <div><span className="font-mono text-[9px] block" style={{ color: C.muted }}>Pillar Height</span>{HYPOCAUST.pillarHeight}</div>
              <div><span className="font-mono text-[9px] block" style={{ color: C.muted }}>Slab Thickness</span>{HYPOCAUST.slabThickness}</div>
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] mb-2" style={{ color: C.water }}>WATER SYSTEM</p>
            <p className="text-[13px] leading-relaxed mb-3" style={{ color: C.text }}>{WATER_SYSTEM.desc}</p>
            <div className="space-y-1">
              {WATER_SYSTEM.flow.map((f, i) => (
                <p key={i} className="text-[11px] font-mono" style={{ color: C.water }}>{i + 1}. {f}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] mb-2" style={{ color: C.stone }}>ROOF & LIGHT</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{ROOF.desc}</p>
            <div className="flex gap-4 mt-3 text-[11px]">
              <div><span className="font-mono text-[9px] block" style={{ color: C.muted }}>Cool Room</span>{ROOF.maxLux}</div>
              <div><span className="font-mono text-[9px] block" style={{ color: C.muted }}>Hot Room</span>{ROOF.minLux}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* V. THE KIT */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section V</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Kit</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          What goes inside the hammam. Every product has a function. Nothing is decoration.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PRODUCTS.map(p => (
            <div key={p.name} className="border-t pt-3" style={{ borderColor: C.border }}>
              <p className="font-serif text-[16px]">{p.name}</p>
              <p className="font-mono text-[10px]" style={{ color: C.warm }}>{p.english}</p>
              <p className="text-[12px] mt-1" style={{ color: C.text }}>{p.desc}</p>
              <p className="text-[10px] font-mono mt-1" style={{ color: C.muted }}>{p.origin}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* VI. THE TIMELINE */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section VI</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">2,000 Years</h2>
        <div className="space-y-3 mt-6">
          {TIMELINE_POINTS.map((t, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="font-mono text-[11px] w-[80px] shrink-0 text-right" style={{ color: C.warm }}>{t.period}</span>
              <div className="w-px h-full shrink-0" style={{ background: C.border, minHeight: 20 }} />
              <p className="text-[13px]" style={{ color: C.text }}>{t.event}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-[18px] mb-2">The Farran Economy</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              The fire attendant (farran) runs the furnace but also cooks for the neighbourhood.
              Tanjia pots and koreenes (cow feet) are buried in the furnace ash for hours.
              The heat economy wastes nothing — the same fire heats water, floors, walls,
              and Sunday lunch.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Dome Solution</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Every hammam ceiling is domed or vaulted. Not for aesthetics —
              for physics. Steam condenses on the curved surface and runs down
              the walls through carved channels. A flat ceiling would drip cold
              water directly on bathers. The dome is a condensation management system
              disguised as architecture.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">Mosque + Hammam</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Hammams are always built near mosques. Ritual purification (ghusl)
              requires full-body washing. Before indoor plumbing, the hammam was the only
              place this was possible. The <span className="underline underline-offset-2">Almohads</span> (12th century) made it policy:
              every new mosque required a neighbouring hammam. The pair became the
              civic infrastructure of the Islamic city.
            </p>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <p>Architecture: Raftani & Radoine (2008), &ldquo;The Architecture of the Hammams of Fez, Morocco&rdquo; (ResearchGate). Hammam Saffarin: Wikipedia, based on rehabilitation documentation. Hypocaust system: Alksar.com; Wikipedia (Hammam). Thermal data: SaunaDekor.com (Moroccan Bath specifications: 38&ndash;42°C, 50&ndash;80% humidity); Humidity Matters Ltd; Effe Perfect Wellness. Light levels: Raftani & Radoine (2016), daylight factor measurements in Fes hammams &mdash; max horizontal illuminance &lt;60 lx, roof openings &lt;2% of floor area. Social history: Morocco World News; Sarah Tours; Middle East Eye. Products: editorial documentation from Moroccan hammam traditions. Roman precedent: Volubilis Idrissid bath plan (Alaa El-Habashi, 2006). Timeline: compiled from Raftani & Radoine, Wikipedia, and Morocco heritage sources.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: 'rgba(255,255,255,0.7)' }}>
          &copy; Slow Morocco &middot; slowmorocco.com &middot; Architectural plans are diagrammatic representations based on published research, not measured surveys. This visualization may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
