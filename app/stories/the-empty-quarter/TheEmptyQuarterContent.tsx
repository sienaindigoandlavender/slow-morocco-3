'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  sand: '#D4A843', sandLight: '#E8D5A0', rock: '#8B7355', dune: '#C4964A',
  oasis: '#4A7C59', sahel: '#9CAF7B', water: '#3B6B9E', heat: '#B8432F',
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

// ═══ COUNTRY DATA ═══
interface SaharaCountry {
  name: string; saharaPercent: number; saharaArea: number; capital: string
  cx: number; cy: number; labelDx?: number; labelDy?: number
  note: string; path: string
}

// Simplified SVG paths for North Africa countries — schematic representation
// viewBox is roughly 0,0 to 900,500 covering Atlantic to Red Sea, Mediterranean to Sahel
const COUNTRIES: SaharaCountry[] = [
  { name: 'Morocco', saharaPercent: 20, saharaArea: 90000, capital: 'Rabat', cx: 95, cy: 140, note: 'Gateway to Sahara via Erg Chebbi & Erg Chigaga. Draa Valley, M\'hamid El Ghizlane.',
    path: 'M30,80 L70,60 L120,55 L155,65 L165,90 L175,120 L170,160 L140,200 L80,230 L40,210 L30,170 Z' },
  { name: 'W. Sahara', saharaPercent: 100, saharaArea: 266000, capital: 'Laayoune', cx: 55, cy: 235, note: 'Disputed territory. Entirely desert. Sparse population. Atlantic coastline.',
    path: 'M30,170 L40,210 L80,230 L70,280 L55,320 L20,310 L15,250 L20,200 Z' },
  { name: 'Mauritania', saharaPercent: 90, saharaArea: 930000, capital: 'Nouakchott', cx: 80, cy: 340, note: 'Richat Structure (Eye of the Sahara). Adrar Plateau. Chinguetti — city of libraries.',
    path: 'M20,310 L55,320 L70,280 L110,260 L150,270 L160,310 L170,360 L150,410 L80,420 L40,400 L15,370 Z' },
  { name: 'Algeria', saharaPercent: 80, saharaArea: 1905000, capital: 'Algiers', cx: 220, cy: 180, note: 'Largest Saharan territory. Hoggar & Tassili n\'Ajjer (30,000 petroglyphs). Grand Erg Oriental & Occidental.',
    path: 'M155,65 L200,50 L260,55 L280,80 L275,130 L310,170 L310,260 L280,310 L240,350 L170,360 L160,310 L150,270 L110,260 L140,200 L170,160 L175,120 L165,90 Z' },
  { name: 'Tunisia', saharaPercent: 40, saharaArea: 60000, capital: 'Tunis', cx: 295, cy: 100, note: 'Chott el Jerid salt lake. Grand Erg Oriental. Smallest Saharan footprint.',
    path: 'M260,55 L285,45 L300,60 L305,95 L295,125 L275,130 L280,80 Z' },
  { name: 'Libya', saharaPercent: 99, saharaArea: 1750000, capital: 'Tripoli', cx: 395, cy: 165, note: 'Fezzan region. Ubari sand sea. Libyan Desert — most arid sector of Sahara.',
    path: 'M300,60 L340,45 L410,50 L470,65 L490,100 L495,170 L490,260 L460,310 L420,340 L370,330 L330,280 L310,260 L310,170 L295,125 L305,95 Z' },
  { name: 'Egypt', saharaPercent: 96, saharaArea: 960000, capital: 'Cairo', cx: 570, cy: 140, note: 'Western Desert. Qattara Depression (−133m). Siwa Oasis. Great Sand Sea. Gilf Kebir plateau.',
    path: 'M490,100 L530,55 L580,50 L620,60 L630,100 L640,160 L640,230 L620,280 L580,310 L530,330 L490,260 L495,170 Z' },
  { name: 'Mali', saharaPercent: 65, saharaArea: 800000, capital: 'Bamako', cx: 165, cy: 400, labelDy: 20, note: 'Timbuktu — legendary Saharan trade city. Adrar des Iforas. Azawad region. Ténéré edge.',
    path: 'M80,420 L150,410 L170,360 L240,350 L250,370 L240,410 L210,450 L140,460 L80,450 Z' },
  { name: 'Niger', saharaPercent: 65, saharaArea: 820000, capital: 'Niamey', cx: 310, cy: 380, note: 'Aïr Mountains. Ténéré Desert (desert within a desert). Agadez — gateway to deep Sahara. Tuareg heartland.',
    path: 'M240,350 L280,310 L330,280 L370,330 L400,370 L380,420 L320,440 L260,440 L240,410 L250,370 Z' },
  { name: 'Chad', saharaPercent: 50, saharaArea: 640000, capital: 'N\'Djamena', cx: 440, cy: 370, note: 'Tibesti Mountains — Emi Koussi (3,415m), highest point in the Sahara. Ennedi Plateau. Lake Chad (shrinking).',
    path: 'M370,330 L420,340 L460,310 L490,330 L500,380 L490,430 L440,450 L400,440 L380,420 L400,370 Z' },
  { name: 'Sudan', saharaPercent: 30, saharaArea: 550000, capital: 'Khartoum', cx: 570, cy: 330, note: 'Nubian Desert. Bayuda Desert. Nile cuts through. Jebel Uweinat. Ancient Meroe pyramids at desert edge.',
    path: 'M490,260 L530,330 L580,310 L620,280 L640,300 L640,380 L600,430 L540,440 L500,380 L490,330 L460,310 Z' },
]

// ═══ TERRAIN TYPES ═══
interface Terrain { name: string; arabic: string; percent: number; color: string; desc: string }
const TERRAINS: Terrain[] = [
  { name: 'Hamada', arabic: 'حمادة', percent: 50, color: C.rock, desc: 'Rocky plateaus of exposed bedrock, scoured by wind. The majority of the Sahara. Hard, barren, paved with stones. Not sand — stone.' },
  { name: 'Erg', arabic: 'عرق', percent: 25, color: C.dune, desc: 'Sand seas. Dunes reaching 180m+, some pyramidal dunes near 500ft. Grand Erg Oriental, Erg Chebbi, Ubari. What outsiders imagine when they hear "Sahara" — but only a quarter of it.' },
  { name: 'Reg / Serir', arabic: 'رق', percent: 15, color: '#A89070', desc: 'Gravel plains of wind-polished pebbles. Flat, endless, hardpacked. The Tanezrouft — "Land of Thirst" — is reg. Vehicles can drive across it. Nothing grows.' },
  { name: 'Wadi / Oued', arabic: 'وادي', percent: 5, color: C.oasis, desc: 'Dry valleys and seasonal watercourses. Carry flash floods after rare rains. Support acacia, tamarisk, date palms. Where life concentrates.' },
  { name: 'Mountains & Volcanic', arabic: 'جبل', percent: 5, color: '#6B4E3D', desc: 'Tibesti (3,415m), Hoggar (2,918m), Aïr (2,022m). Volcanic massifs that catch moisture. Cooler, wetter. Tassili n\'Ajjer\'s 30,000 rock art panels.' },
]

// ═══ PEOPLES ═══
interface People { name: string; population: string; region: string; language: string; note: string; color: string }
const PEOPLES: People[] = [
  { name: 'Tuareg', population: '~2 million', region: 'Algeria, Niger, Mali, Libya, Burkina Faso', language: 'Tamasheq (Berber)', color: '#3B5998',
    note: '"Blue People" — indigo veils stain the skin. Matrilineal society. Men veiled, women not. Controlled trans-Saharan trade routes for centuries. Tifinagh script. Now scattered across five countries with no majority in any. Desert blues music: Tinariwen, Bombino, Mdou Moctar.' },
  { name: 'Sahrawi', population: '~1 million', region: 'Western Sahara, southern Morocco, Mauritania', language: 'Hassaniya Arabic', color: '#8B6914',
    note: 'Bedouin Arab nomads of the western Sahara. Camel herders, goat herders. Speak Hassaniya dialect. Semi-nomadic — winter in deep desert, summer at desert edge. Traditional black tents woven from goat wool and camel hair.' },
  { name: 'Toubou (Tebu)', population: '~2 million', region: 'Chad (Tibesti), Libya, Niger, Sudan', language: 'Tebu (Nilo-Saharan)', color: '#7B3F00',
    note: 'Mountain people of the Tibesti. Among the hardiest desert dwellers on Earth. Semi-nomadic pastoralists. Two subgroups: Teda (north) and Daza (south). Known for extreme endurance — can survive on minimal water for days.' },
  { name: 'Moors (Bidhan)', population: '~3 million', region: 'Mauritania, Western Sahara, Mali', language: 'Hassaniya Arabic', color: '#4A5568',
    note: 'Arab-Berber peoples of the western Sahara. Historically powerful tribal confederations. Nomadic pastoralists with camels and cattle. Mauritania\'s dominant culture. Chinguetti — their city of libraries — once a centre of Islamic learning.' },
  { name: 'Oasis Communities', population: '~2.5 million', region: 'Across all Saharan countries', language: 'Various (Arabic, Berber, Hausa)', color: C.oasis,
    note: 'Settled farmers around the Sahara\'s 90+ oases. Date palm cultivation — some varieties over 1,000 years old. Foggaras (underground irrigation channels) sustain agriculture. Communities include Mozabite Berbers (Algeria), Siwa (Egypt), Fezzan (Libya). Each oasis a micro-civilization.' },
]

// ═══ BIODIVERSITY ═══
interface Species { name: string; type: string; status: string; note: string }
const SPECIES: Species[] = [
  { name: 'Addax', type: 'Mammal', status: 'Critically Endangered', note: 'White antelope. Can survive a year without drinking water. Fewer than 100 left in the wild.' },
  { name: 'Fennec Fox', type: 'Mammal', status: 'Least Concern', note: 'Smallest canid. Oversized ears dissipate heat and detect prey underground. Nocturnal.' },
  { name: 'Dorcas Gazelle', type: 'Mammal', status: 'Vulnerable', note: 'Can go entire life without drinking — extracts all moisture from plants.' },
  { name: 'Saharan Cheetah', type: 'Mammal', status: 'Critically Endangered', note: 'Ghost of the desert. Paler than African cheetah. Fewer than 250 remain. Mostly Algeria & Niger.' },
  { name: 'Dromedary Camel', type: 'Mammal', status: 'Domesticated', note: 'No wild populations remain. ~4 million in the Sahara. Can drink 100L in 10 minutes. Hump stores fat, not water.' },
  { name: 'Deathstalker Scorpion', type: 'Arachnid', status: 'Not Evaluated', note: 'Most venomous scorpion. Fluorescent under UV light. Active at night.' },
  { name: 'Desert Monitor', type: 'Reptile', status: 'Least Concern', note: 'Largest lizard in the Sahara. Up to 2m long. Predator of smaller reptiles and birds.' },
  { name: 'Desert Crocodile', type: 'Reptile', status: 'Critically Endangered', note: 'Relict populations in Mauritania and Chad. Survivors of the Green Sahara. Live in guelta pools.' },
  { name: 'Date Palm', type: 'Plant', status: 'Cultivated', note: 'Foundation of oasis agriculture. Over 1,000 varieties across the Sahara. Some trees 200+ years old.' },
  { name: 'Saharan Cypress', type: 'Plant', status: 'Critically Endangered', note: 'Cupressus dupreziana. Fewer than 233 trees survive in the Tassili n\'Ajjer. Up to 2,000 years old.' },
]

// ═══ MAP ═══
function SaharaMap() {
  const [hovered, setHovered] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const W = 700, H = 500

  // Key geographic features
  const FEATURES = [
    { type: 'label', x: 330, y: 25, text: 'Mediterranean Sea', size: 8, color: C.water },
    { type: 'label', x: 8, y: 300, text: 'Atlantic', size: 7, color: C.water },
    { type: 'label', x: 660, y: 80, text: 'Red Sea', size: 7, color: C.water },
    { type: 'label', x: 350, y: 470, text: '─── Sahel ───', size: 8, color: C.sahel },
    // Mountains
    { type: 'peak', x: 210, y: 235, text: 'Hoggar 2,918m', size: 6 },
    { type: 'peak', x: 445, y: 310, text: 'Tibesti 3,415m', size: 6 },
    { type: 'peak', x: 315, y: 350, text: 'Aïr 2,022m', size: 6 },
    { type: 'peak', x: 135, y: 100, text: 'Atlas Mts', size: 6 },
    // Ergs
    { type: 'erg', x: 260, y: 120, text: 'Grand Erg', size: 6 },
    { type: 'erg', x: 490, y: 180, text: 'Libyan Desert', size: 6 },
    { type: 'erg', x: 575, y: 210, text: 'Great Sand Sea', size: 6 },
    { type: 'erg', x: 280, y: 280, text: 'Ténéré', size: 6 },
    // Rivers
    { type: 'river', x: 620, y: 300, text: 'Nile →', size: 7 },
    { type: 'river', x: 175, y: 440, text: '← Niger', size: 7 },
    // Notable
    { type: 'dot', x: 90, y: 310, text: 'Richat Structure', size: 5 },
    { type: 'dot', x: 180, y: 410, text: 'Timbuktu', size: 5 },
    { type: 'dot', x: 548, y: 120, text: 'Qattara −133m', size: 5 },
  ]

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 550 }}
        onMouseLeave={() => setHovered(null)}>

        {/* Background — desert gradient */}
        <defs>
          <linearGradient id="desertBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5EDD6" />
            <stop offset="60%" stopColor="#EDE0C0" />
            <stop offset="100%" stopColor="#D4C5A0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={W} height={H} fill="url(#desertBg)" rx="2" />

        {/* Mediterranean Sea */}
        <path d={`M0,35 Q100,25 200,40 Q350,15 500,30 Q600,20 ${W},45 L${W},0 L0,0 Z`}
          fill={C.water} opacity="0.12" />

        {/* Sahel band */}
        <rect x="0" y="430" width={W} height="70" fill={C.sahel} opacity="0.08" />

        {/* Country shapes */}
        {COUNTRIES.map((c, i) => {
          const isHov = hovered === c.name
          return (
            <g key={c.name} onMouseEnter={() => setHovered(c.name)} onMouseLeave={() => setHovered(null)}
              className="cursor-pointer">
              <path d={c.path} fill={C.sand}
                stroke={isHov ? C.ink : C.rock}
                strokeWidth={isHov ? 1.2 : 0.5}
                opacity={isHov ? 0.35 : hovered ? 0.12 : 0.2}
                style={{ transition: 'all 0.3s',
                  transform: drawn ? 'scale(1)' : 'scale(0.95)',
                  transformOrigin: `${c.cx}px ${c.cy}px`,
                  transitionDelay: `${i * 50}ms` }} />
              {/* Country name */}
              <text x={c.cx + (c.labelDx || 0)} y={c.cy + (c.labelDy || 0)} textAnchor="middle"
                className="font-mono pointer-events-none"
                style={{ fontSize: isHov ? 10 : 8, fill: isHov ? C.ink : C.rock, fontWeight: isHov ? 700 : 400,
                  transition: 'all 0.3s' }}>
                {c.name}
              </text>
              {isHov && (
                <text x={c.cx + (c.labelDx || 0)} y={c.cy + (c.labelDy || 0) + 12} textAnchor="middle"
                  className="font-mono pointer-events-none"
                  style={{ fontSize: 7, fill: C.muted }}>
                  {c.saharaPercent}% Sahara · {(c.saharaArea / 1000).toFixed(0)}k km²
                </text>
              )}
            </g>
          )
        })}

        {/* Geographic features */}
        {FEATURES.map((f, i) => (
          <g key={i}>
            {f.type === 'peak' && (
              <>
                <text x={f.x} y={f.y - 2} className="font-mono" style={{ fontSize: 8, fill: '#6B4E3D' }}>▲</text>
                <text x={f.x + 6} y={f.y + 2} className="font-mono" style={{ fontSize: f.size, fill: '#6B4E3D', opacity: 0.7 }}>{f.text}</text>
              </>
            )}
            {f.type === 'erg' && (
              <text x={f.x} y={f.y} className="font-mono italic" style={{ fontSize: f.size, fill: C.dune, opacity: 0.5 }}>{f.text}</text>
            )}
            {f.type === 'label' && (
              <text x={f.x} y={f.y} className="font-mono" style={{ fontSize: f.size, fill: f.color, opacity: 0.5 }}>{f.text}</text>
            )}
            {f.type === 'river' && (
              <text x={f.x} y={f.y} className="font-mono" style={{ fontSize: f.size, fill: C.water, opacity: 0.4 }}>{f.text}</text>
            )}
            {f.type === 'dot' && (
              <>
                <circle cx={f.x} cy={f.y} r="2" fill={C.ink} opacity="0.2" />
                <text x={f.x + 5} y={f.y + 2} className="font-mono" style={{ fontSize: f.size, fill: C.muted }}>{f.text}</text>
              </>
            )}
          </g>
        ))}

        {/* Scale */}
        <line x1={W - 100} y1={H - 15} x2={W - 30} y2={H - 15} stroke={C.muted} strokeWidth="0.5" />
        <text x={W - 65} y={H - 7} textAnchor="middle" className="font-mono" style={{ fontSize: 6, fill: C.muted }}>~1,000 km</text>
      </svg>

      {/* Hover detail card */}
      {hovered && (() => {
        const c = COUNTRIES.find(c => c.name === hovered)
        if (!c) return null
        return (
          <div className="mt-3 p-3 rounded-sm" style={{ background: `${C.sand}10`, border: `1px solid ${C.border}` }}>
            <p className="font-serif italic text-[16px]" style={{ color: C.ink }}>{c.name}</p>
            <div className="flex flex-wrap gap-4 mt-1">
              <span className="font-mono text-[9px]" style={{ color: C.muted }}>Capital: {c.capital}</span>
              <span className="font-mono text-[9px]" style={{ color: C.muted }}>Sahara: {c.saharaPercent}%</span>
              <span className="font-mono text-[9px]" style={{ color: C.muted }}>Desert area: ~{c.saharaArea.toLocaleString()} km²</span>
            </div>
            <p className="text-[11px] leading-[1.6] mt-1" style={{ color: C.text }}>{c.note}</p>
          </div>
        )
      })()}
    </div>
  )
}

// ═══ TERRAIN BAR ═══
function TerrainBar() {
  const r = useReveal()
  return (
    <div ref={r.ref}>
      <div className="flex h-6 rounded-sm overflow-hidden mb-2" style={{ border: `1px solid ${C.border}` }}>
        {TERRAINS.map((t, i) => (
          <div key={t.name} className="relative group transition-all duration-700"
            style={{ width: r.vis ? `${t.percent}%` : '0%', background: t.color, opacity: 0.4, transitionDelay: `${i * 100}ms` }}>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[7px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              {t.name} {t.percent}%
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {TERRAINS.map(t => (
          <span key={t.name} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: t.color, opacity: 0.5 }} />
            <span className="font-mono text-[8px]" style={{ color: C.muted }}>{t.name} ({t.arabic}) — {t.percent}%</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ═══ PAGE ═══

const THE_EMPTY_QUARTER_PTS = [
  { name: 'Erg Chebbi', lat: 31.14, lng: -3.97, detail: 'Morocco\'s photogenic dunes. Merzouga gateway.', color: '#D4A373' },
  { name: 'Erg Chegaga', lat: 29.80, lng: -6.28, detail: 'Remote grand erg. 40km. Near Mhamid.', color: '#D4A373' },
  { name: 'Draa Valley', lat: 30.20, lng: -5.80, detail: 'Longest river. 1,100km. Palm oases.', color: '#5C7C3E' },
  { name: 'Zagora', lat: 30.33, lng: -5.84, detail: 'Timbuktu 52 days. Desert gateway.', color: '#C17F28' },
  { name: 'Ouarzazate', lat: 30.92, lng: -6.89, detail: 'Door of the desert. Atlas Studios.', color: '#C17F28' },
  { name: 'Tindouf', lat: 27.67, lng: -8.13, detail: 'Algerian border. Sahrawi camps.', color: '#8B7355' },
]
const MBT_THE_EMPTY_QUARTER = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function TheEmptyQuarterMap() {
  const mc = useRef<HTMLDivElement>(null)
  const mr = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mc.current || !MBT_THE_EMPTY_QUARTER || mr.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MBT_THE_EMPTY_QUARTER!
      const map = new mapboxgl.Map({ container: mc.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-5.5, 29.5], zoom: 5.5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mr.current = map
      map.on('load', () => {
        THE_EMPTY_QUARTER_PTS.forEach(p => {
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
    return () => { mr.current?.remove(); mr.current = null }
  }, [])
  return <div ref={mc} className="w-full" style={{ height: '480px', background: '#0a0a0a' }} />
}

export function TheEmptyQuarterContent() {
  const heroR = useReveal()
  const mapR = useReveal()
  const terrainR = useReveal()
  const peopleR = useReveal()
  const bioR = useReveal()
  const [expandedPeople, setExpandedPeople] = useState<string | null>(null)
  const [expandedSpecies, setExpandedSpecies] = useState<string | null>(null)

  const STATS = [
    { label: 'Area', value: '9.2 million km²', note: 'Size of the USA.' },
    { label: 'Countries', value: '11', note: 'Algeria, Chad, Egypt, Libya, Mali, Mauritania, Morocco, Niger, Sudan, Tunisia, W. Sahara' },
    { label: 'Population', value: '~2.5 million', note: 'Excluding Nile Valley. Less than 1 person per km².' },
    { label: 'East–West', value: '5,600 km', note: 'Atlantic Ocean to Red Sea' },
    { label: 'North–South', value: '1,800 km', note: 'Mediterranean coast to Sahel' },
    { label: 'Highest point', value: 'Emi Koussi 3,415m', note: 'Shield volcano, Tibesti, Chad' },
    { label: 'Lowest point', value: 'Qattara −133m', note: 'Depression, northwest Egypt' },
    { label: 'Hottest recorded', value: '58°C (136°F)', note: 'Azizia, Libya, 1922' },
    { label: 'Night temps', value: 'Below 0°C', note: 'Can freeze at night. 40°+ swing in 12 hours.' },
    { label: 'Annual rainfall', value: '<25mm (centre)', note: 'Some areas: <5mm/year. Eastern sectors nearly zero.' },
    { label: 'Permanent rivers', value: '2', note: 'Nile (central Africa to Mediterranean) and Niger (West Africa to Gulf of Guinea)' },
    { label: 'Oases', value: '90+', note: 'Fed by underground aquifers. Each one a micro-civilization.' },
    { label: 'Plant species', value: '~2,800', note: '~25% endemic. 500 in the hyper-arid centre.' },
    { label: 'Mammal species', value: '~70', note: 'Including addax, fennec fox, Saharan cheetah, Dorcas gazelle' },
    { label: 'Reptile species', value: '~100', note: 'Including monitor lizards, desert crocodiles (relict)' },
    { label: 'Bird species', value: '~90 resident', note: 'Plus migratory corridor between Europe, Africa, Middle East' },
  ]

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ─── HERO ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Geography · Ecosystem · People · Terrain</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.88] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Empty Quarter</em></h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.3]" style={{ color: C.muted }}>
            9.2 million square kilometres. 11 countries. The largest hot desert on Earth —
            and one of its most misunderstood ecosystems.</p>
        </div>
        <p className="text-[13px] max-w-[600px] leading-[1.7] mt-6" style={{ color: C.text }}>
          The Sahara is not sand. It is mostly stone — rocky <span className="underline underline-offset-2">hamada</span> plateaus scoured by wind
          over millions of years. Sand dunes cover only 25% of its surface. The rest is gravel
          plain, volcanic mountain, dry riverbed, and salt flat. It is the world&apos;s third-largest
          desert overall (after Antarctica and the Arctic) and the largest hot desert — stretching
          5,600 kilometres from the Atlantic to the Red Sea. Its name comes from the Arabic
          ṣaḥrāʾ, meaning simply &quot;desert.&quot; The <span className="underline underline-offset-2">Berber</span> word for mountain — adrar — is
          believed to be a cognate of &quot;Atlas.&quot; Between the two words lies the entire
          geography of North Africa.
        </p>
      </section>

      {/* ─── CORE STATS ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-6">
        <div className="border-t pt-5" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>The Numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
            {STATS.map(s => (
              <div key={s.label}>
                <p className="font-mono text-[8px] uppercase tracking-wider" style={{ color: C.muted }}>{s.label}</p>
                <p className="font-mono text-[13px] font-bold" style={{ color: C.sand }}>{s.value}</p>
                <p className="text-[10px] leading-[1.4]" style={{ color: C.muted }}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-6">
        <div ref={mapR.ref} className="border-t pt-5" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.muted }}>The Sahara — 11 Countries</p>
          <p className="text-[11px] mb-3" style={{ color: C.muted }}>Hover a country for desert coverage and key features. Mountain ranges, ergs, and rivers marked.</p>
          <SaharaMap />
        </div>
      </section>

      {/* ─── COUNTRY TABLE ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-6">
        <div className="border-t pt-5" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Saharan Territory by Country</p>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]" style={{ color: C.text }}>
              <thead>
                <tr className="border-b font-mono text-[8px] uppercase tracking-wider" style={{ borderColor: C.border, color: C.muted }}>
                  <th className="text-left py-1.5 pr-2">Country</th>
                  <th className="text-right py-1.5 px-2">% Desert</th>
                  <th className="text-right py-1.5 px-2">Desert Area</th>
                  <th className="text-left py-1.5 px-2 hidden md:table-cell">Capital</th>
                  <th className="text-left py-1.5 pl-2 w-1/3 hidden md:table-cell">Key Feature</th>
                </tr>
              </thead>
              <tbody>
                {[...COUNTRIES].sort((a, b) => b.saharaArea - a.saharaArea).map((c, i) => (
                  <tr key={c.name} className="border-b" style={{ borderColor: `${C.border}60` }}>
                    <td className="py-1.5 pr-2 font-mono" style={{ color: C.sand }}>{c.name}</td>
                    <td className="text-right py-1.5 px-2">
                      <span className="font-mono">{c.saharaPercent}%</span>
                      <div className="inline-block ml-1 w-12 h-1.5 rounded-sm overflow-hidden" style={{ background: `${C.border}40` }}>
                        <div className="h-full rounded-sm" style={{ width: `${c.saharaPercent}%`, background: C.sand, opacity: 0.4 }} />
                      </div>
                    </td>
                    <td className="text-right py-1.5 px-2 font-mono">{c.saharaArea.toLocaleString()} km²</td>
                    <td className="py-1.5 px-2 hidden md:table-cell" style={{ color: C.muted }}>{c.capital}</td>
                    <td className="py-1.5 pl-2 hidden md:table-cell" style={{ color: C.muted, fontSize: 10 }}>{c.note.split('.')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── TERRAIN ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-6">
        <div ref={terrainR.ref} className="border-t pt-5" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.muted }}>Terrain — What the Sahara Is Actually Made Of</p>
          <p className="text-[11px] mb-4" style={{ color: C.muted }}>
            The desert people have a word for each surface. Outsiders have one word: sand. The Sahara has at least five.
          </p>
          <TerrainBar />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {TERRAINS.map((t, i) => (
              <div key={t.name} className="p-3 rounded-sm transition-all duration-500"
                style={{ background: `${t.color}06`, border: `1px solid ${t.color}15`,
                  opacity: terrainR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color, opacity: 0.5 }} />
                  <span className="font-serif italic text-[14px]" style={{ color: t.color }}>{t.name}</span>
                  <span className="font-mono text-[10px]" style={{ color: C.muted }}>{t.arabic}</span>
                  <span className="font-mono text-[10px] font-bold ml-auto" style={{ color: t.color }}>{t.percent}%</span>
                </div>
                <p className="text-[11px] leading-[1.6]" style={{ color: C.text }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PEOPLES ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-6">
        <div ref={peopleR.ref} className="border-t pt-5" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.muted }}>The People of the Sand</p>
          <p className="text-[11px] mb-4" style={{ color: C.muted }}>
            2.5 million people live in the Sahara proper (excluding the Nile Valley). Less than 1 person per km². Five major communities — each with its own language, structure, and relationship to the desert.
          </p>
          <div className="space-y-2">
            {PEOPLES.map((p, i) => {
              const isExp = expandedPeople === p.name
              return (
                <div key={p.name}
                  className="rounded-sm overflow-hidden cursor-pointer transition-all duration-400"
                  style={{ border: `1px solid ${isExp ? p.color : C.border}30`,
                    opacity: peopleR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}
                  onClick={() => setExpandedPeople(isExp ? null : p.name)}>
                  <div className="p-3 flex flex-wrap items-baseline gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color, opacity: 0.5 }} />
                    <span className="font-serif italic text-[15px]" style={{ color: p.color }}>{p.name}</span>
                    <span className="font-mono text-[10px]" style={{ color: C.muted }}>{p.population}</span>
                    <span className="font-mono text-[9px]" style={{ color: C.muted }}>{p.language}</span>
                    <span className="font-mono text-[9px] ml-auto" style={{ color: C.muted }}>{isExp ? '−' : '+'}</span>
                  </div>
                  {isExp && (
                    <div className="px-3 pb-3">
                      <p className="font-mono text-[8px] uppercase mb-0.5" style={{ color: C.muted }}>Region: {p.region}</p>
                      <p className="text-[11px] leading-[1.7]" style={{ color: C.text }}>{p.note}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── BIODIVERSITY ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-6">
        <div ref={bioR.ref} className="border-t pt-5" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.muted }}>Biodiversity — Life in the Furnace</p>
          <p className="text-[11px] mb-4" style={{ color: C.muted }}>
            500 plant species. 70 mammals. 100 reptiles. 90 resident bird species. Every one adapted to extremes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {SPECIES.map((s, i) => {
              const isExp = expandedSpecies === s.name
              const statusColor = s.status.includes('Critically') ? C.heat : s.status.includes('Vulnerable') ? C.dune : C.oasis
              return (
                <div key={s.name}
                  className="rounded-sm overflow-hidden cursor-pointer transition-all duration-400"
                  style={{ border: `1px solid ${C.border}40`,
                    opacity: bioR.vis ? 1 : 0, transitionDelay: `${i * 40}ms` }}
                  onClick={() => setExpandedSpecies(isExp ? null : s.name)}>
                  <div className="p-2 flex items-baseline gap-2">
                    <span className="font-serif italic text-[12px]" style={{ color: C.ink }}>{s.name}</span>
                    <span className="font-mono text-[7px] uppercase px-1 py-0.5 rounded-sm"
                      style={{ background: `${statusColor}10`, color: statusColor }}>{s.status}</span>
                    <span className="font-mono text-[8px] ml-auto" style={{ color: C.muted }}>{s.type}</span>
                  </div>
                  {isExp && (
                    <div className="px-2 pb-2">
                      <p className="text-[11px] leading-[1.6]" style={{ color: C.text }}>{s.note}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── THE GREEN SAHARA ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-6">
        <div className="border-t pt-5" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.oasis }}>The Green Sahara — The 20,000-Year Cycle</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase mb-1" style={{ color: C.sand }}>The Cycle</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                For several hundred thousand years, the Sahara has alternated between desert and
                savanna grassland in a roughly 20,000-year cycle. The driver is precession — the
                wobble of Earth&apos;s axis as it rotates around the Sun, which shifts the path
                of the North African monsoon. When the monsoon pushes north, the Sahara greens.
                When it retreats, the desert returns.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase mb-1" style={{ color: C.sand }}>The Evidence</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Over 30,000 rock art petroglyphs in Tassili n&apos;Ajjer (Algeria) depict river
                animals — crocodiles, hippos, elephants, giraffes, buffalo — in what is now the
                most arid landscape on the continent. The Kiffian culture (10,000–8,000 BCE) left
                bone harpoons and fish remains along the shores of lakes that no longer exist.
                The last Green Sahara ended roughly 5,400 years ago when abrupt desertification
                transformed North Africa.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase mb-1" style={{ color: C.sand }}>The Survivors</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Desert crocodiles still survive in guelta pools in Mauritania and Chad — living
                fossils from when the Sahara was green. The Saharan cypress (Cupressus dupreziana)
                in the Tassili n&apos;Ajjer: fewer than 233 trees remain, some 2,000 years old,
                relics of a wetter era. The aquifers beneath the desert — once thought to be
                fossil water that would run out — are the buried inheritance of those green millennia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── READING NOTES ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-6">
        <div className="border-t pt-5" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase mb-1" style={{ color: C.sand }}>The Misconception</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The most common image of the Sahara — rolling golden dunes — represents 25%
                of its surface. The majority is hamada: rocky plateau scoured to bare stone
                by wind. The word &quot;desert&quot; itself misleads. The Sahara is not empty.
                It is 2,800 plant species, 70 mammals, 100 reptiles, 90 bird species, 90 oases,
                2.5 million people, and a geology that predates the Atlas Mountains by billions
                of years. The African Shield beneath the Sahara is Precambrian rock — formed
                between 4.5 billion and 550 million years ago.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase mb-1" style={{ color: C.sand }}>The Five Surfaces</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Desert people have precise vocabulary that outsiders lack. Hamada is rocky plateau.
                Erg is sand sea. Reg is gravel plain. Wadi is dry riverbed. Chott is salt flat.
                Each surface demands different navigation, different footwear, different vehicles.
                A reg will hold a truck. A hamada will break one. An erg will bury one. The Sahara
                is not one landscape but five, layered and interwoven across 9.2 million km².
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase mb-1" style={{ color: C.sand }}>The Algeria Question</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Algeria contains more Saharan territory than any other country — roughly
                1.9 million km², or 80% of its total landmass. It holds the Hoggar and
                Tassili n&apos;Ajjer mountains, the Grand Erg Oriental and Occidental,
                and the Tanezrouft — &quot;Land of Thirst.&quot; It also holds massive oil and gas
                reserves beneath the sand, making it one of the wealthiest nations in Africa.
                The Sahara is often framed as emptiness. Beneath Algeria&apos;s portion lies
                the fuel that powers half a continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING + SOURCES ─── */}

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#D4A373' }}>The Empty Quarter — Mapped</p>
        <TheEmptyQuarterMap />
      </div></section>

<section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-10">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The Sahara is not a barrier. It is a corridor. For thousands of years, trade routes
            crossed it carrying gold, salt, ivory, and enslaved people. The Tuareg controlled
            these routes with camels and the knowledge of where water hides. Today the routes
            carry oil, gas, and migrants. The surface changes — stone, sand, gravel, salt.
            The function stays the same. Something always crosses the desert. The desert always
            exacts a price.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Area (9.2M km²), countries, terrain types: Wikipedia &ldquo;Sahara&rdquo;; Britannica
            &ldquo;Sahara.&rdquo; Terrain percentages (25% erg, majority hamada): Wikipedia; Britannica;
            Geographical.co.uk. Emi Koussi (3,415m): Britannica; DesertUSA. Qattara Depression
            (−133m): Britannica. Population (~2.5M excluding Nile): Britannica &ldquo;People.&rdquo;
            Tuareg (~2M): Britannica; Wikipedia; NigerHeritage. Toubou (~2M): NigerHeritage.
            Biodiversity (500 plants centre, 2,800 total; 70 mammals; 100 reptiles; 90 birds):
            UNEP; Grokipedia &ldquo;Sahara desert (ecoregion)&rdquo;; BeautifulWorld.com.
            Saharan cypress (233 trees): widely reported. Addax (fewer than 100 wild): IUCN. Green Sahara
            cycle (20,000 years, precession): Wikipedia; Britannica. Rock art (30,000+ petroglyphs,
            Tassili n&apos;Ajjer): Britannica; UNESCO. Country desert percentages are editorial
            estimates synthesised from multiple sources. Map boundaries are schematic, not precise.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.sand }}>&copy; Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
