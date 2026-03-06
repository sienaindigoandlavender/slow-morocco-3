'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'

// ═══ EARTH DATA COLORS ═══
const C = {
  morocco: '#8B3A3A',     // brick red
  spain: '#C17F28',       // saffron
  portugal: '#2D3A6E',    // indigo
  rail: '#2D6E4F',        // emerald
  highway: '#A0522D',     // rust
  airport: '#5D3A5E',     // plum
  hotel: '#6B7F5E',       // sage
  complete: '#2D6E4F',    // emerald
  progress: '#C17F28',    // saffron
  planned: '#737373',     // muted gray
  newBuild: '#722F37',    // wine
}

// ═══ STATUS TYPES ═══
type Status = 'complete' | 'in-progress' | 'planned' | 'renovation'
const STATUS_LABEL: Record<Status, string> = {
  'complete': 'Complete',
  'in-progress': 'Under Construction',
  'planned': 'Planned',
  'renovation': 'Renovation',
}
const STATUS_COLOR: Record<Status, string> = {
  'complete': C.complete,
  'in-progress': C.progress,
  'planned': C.planned,
  'renovation': '#B87A5E',
}

// ═══ ALL 20 STADIUMS ═══
interface Stadium {
  name: string; city: string; country: 'Morocco' | 'Spain' | 'Portugal'
  capacity: number; status: Status; budget?: string; completion?: string
  lat: number; lng: number; maxRound: string; note?: string; newBuild?: boolean
}

const STADIUMS: Stadium[] = [
  // MOROCCO — 6 stadiums
  { name: 'Grand Stade Hassan II', city: 'Casablanca', country: 'Morocco', capacity: 115000, status: 'in-progress', budget: '$500M', completion: '2028', lat: 33.65, lng: -7.35, maxRound: 'Final', note: 'World\'s largest football stadium. Designed by Oualalou + Choi / Populous. Tent-roof inspired by moussem tradition.', newBuild: true },
  { name: 'Prince Moulay Abdellah', city: 'Rabat', country: 'Morocco', capacity: 68700, status: 'complete', budget: '$320M', completion: '2025', lat: 33.92, lng: -6.91, maxRound: 'Semi-final', note: 'Built in 24 months. LED pixel facade like The Sphere. Opened for AFCON 2025.', newBuild: true },
  { name: 'Ibn Batouta Stadium', city: 'Tangier', country: 'Morocco', capacity: 75600, status: 'complete', budget: '$180M', completion: '2025', lat: 35.73, lng: -5.88, maxRound: 'Semi-final', note: 'Roof completed in 69 days. Expanded from 68K for AFCON. Named after 14th-century explorer.' },
  { name: 'Marrakech Stadium', city: 'Marrakech', country: 'Morocco', capacity: 70000, status: 'renovation', budget: '$150M', completion: '2028', lat: 31.62, lng: -8.05, maxRound: 'Quarter-final', note: 'Expanding from 45,860. Between the Atlas Mountains and the medina.' },
  { name: 'Adrar Stadium', city: 'Agadir', country: 'Morocco', capacity: 70000, status: 'renovation', budget: '$120M', completion: '2028', lat: 30.39, lng: -9.53, maxRound: 'Quarter-final', note: 'Expanding from 46,000. Atlantic coast venue between ocean and Atlas foothills.' },
  { name: 'Fez Stadium', city: 'Fes', country: 'Morocco', capacity: 55800, status: 'complete', budget: '$90M', completion: '2025', lat: 34.04, lng: -4.96, maxRound: 'Round of 16', note: 'Renovated for AFCON 2025. Dual football/athletics venue.' },

  // SPAIN — 11 stadiums
  { name: 'Santiago Bernabéu', city: 'Madrid', country: 'Spain', capacity: 78297, status: 'complete', budget: '€800M', completion: '2025', lat: 40.45, lng: -3.69, maxRound: 'Final', note: 'Fully renovated with retractable pitch and roof. Leading candidate for WC final.' },
  { name: 'Spotify Camp Nou', city: 'Barcelona', country: 'Spain', capacity: 105000, status: 'in-progress', budget: '€1.5B', completion: '2026', lat: 41.38, lng: 2.12, maxRound: 'Final', note: 'Largest stadium in Europe. Ongoing Espai Barça mega-renovation.' },
  { name: 'Metropolitano', city: 'Madrid', country: 'Spain', capacity: 70650, status: 'complete', lat: 40.44, lng: -3.60, maxRound: 'Semi-final', note: 'Atlético de Madrid home. Hosted 2019 Champions League final.' },
  { name: 'La Cartuja', city: 'Seville', country: 'Spain', capacity: 71000, status: 'complete', lat: 37.40, lng: -5.97, maxRound: 'Semi-final', note: 'Spain\'s fifth-largest stadium. Originally built for Olympic bid.' },
  { name: 'San Mamés', city: 'Bilbao', country: 'Spain', capacity: 53633, status: 'complete', lat: 43.26, lng: -2.95, maxRound: 'Quarter-final', note: 'Athletic Club home. "The Cathedral" of Basque football.' },
  { name: 'Reale Arena', city: 'San Sebastián', country: 'Spain', capacity: 39500, status: 'complete', lat: 43.30, lng: -1.97, maxRound: 'Group stage', note: 'Real Sociedad home in Donostia-San Sebastián.' },
  { name: 'RCDE Stadium', city: 'Barcelona', country: 'Spain', capacity: 40259, status: 'complete', lat: 41.35, lng: 2.08, maxRound: 'Quarter-final', note: 'Espanyol home in Cornellà. Named best sports facility in the world (2010).' },
  { name: 'Estadio de Gran Canaria', city: 'Las Palmas', country: 'Spain', capacity: 33000, status: 'renovation', completion: '2029', lat: 28.10, lng: -15.46, maxRound: 'Group stage', note: 'Canary Islands venue. UD Las Palmas home.' },
  { name: 'La Rosaleda', city: 'Málaga', country: 'Spain', capacity: 36000, status: 'renovation', completion: '2029', lat: 36.73, lng: -4.43, maxRound: 'Group stage', note: 'Málaga CF home. 1982 World Cup venue.' },
  { name: 'Riazor', city: 'A Coruña', country: 'Spain', capacity: 48015, status: 'renovation', completion: '2029', lat: 43.37, lng: -8.41, maxRound: 'Round of 16', note: 'Deportivo home. Galicia\'s largest football arena.' },
  { name: 'Nueva Romareda', city: 'Zaragoza', country: 'Spain', capacity: 43000, status: 'in-progress', completion: '2028', lat: 41.64, lng: -0.90, maxRound: 'Group stage', note: 'Real Zaragoza. Major renovation/expansion underway.', newBuild: true },

  // PORTUGAL — 3 stadiums
  { name: 'Estádio da Luz', city: 'Lisbon', country: 'Portugal', capacity: 65209, status: 'complete', lat: 38.75, lng: -9.18, maxRound: 'Semi-final', note: 'SL Benfica home. Hosted Euro 2004 final. "Stadium of Light."' },
  { name: 'Estádio José Alvalade', city: 'Lisbon', country: 'Portugal', capacity: 50095, status: 'complete', lat: 38.76, lng: -9.16, maxRound: 'Quarter-final', note: 'Sporting CP home. Built for Euro 2004.' },
  { name: 'Estádio do Dragão', city: 'Porto', country: 'Portugal', capacity: 50033, status: 'complete', lat: 41.16, lng: -8.59, maxRound: 'Quarter-final', note: 'FC Porto home. 2021 Champions League final venue.' },
]

// ═══ INFRASTRUCTURE PROJECTS ═══
interface InfraProject {
  name: string; type: 'rail' | 'highway' | 'airport' | 'hotel'; country: string
  budget: string; status: Status; completion: string; description: string
}

const INFRA: InfraProject[] = [
  // RAIL
  { name: 'Al Boraq HSR Extension: Kénitra → Marrakech', type: 'rail', country: 'Morocco', budget: '$5.3B', status: 'in-progress', completion: '2029', description: '430km high-speed line. 350km/h. Tangier to Marrakech in 2h40m. Africa\'s first HSR network expansion.' },
  { name: '168 New Trains (France, Spain, South Korea)', type: 'rail', country: 'Morocco', budget: '$2.9B', status: 'in-progress', completion: '2029', description: '18 high-speed + 150 multi-service trains. ONCF procurement from Alstom, Talgo, Hyundai Rotem.' },
  { name: '40 Railway Stations (New/Renovated)', type: 'rail', country: 'Morocco', budget: '$1.4B', status: 'in-progress', completion: '2030', description: 'Station modernization program. Includes new stadium-adjacent stations at Rabat and Casablanca.' },

  // HIGHWAYS
  { name: 'Continental Rabat–Casablanca Highway', type: 'highway', country: 'Morocco', budget: '$500M', status: 'in-progress', completion: '2028', description: 'Direct access route to Grand Stade Hassan II. New expressway corridor.' },
  { name: 'Tit Mellil–Berrechid Highway', type: 'highway', country: 'Morocco', budget: '$400M', status: 'planned', completion: '2029', description: 'Southern Casablanca bypass connecting A7 and stadium zone.' },
  { name: 'Highway Network Expansion to 3,000km', type: 'highway', country: 'Morocco', budget: '$1.3B total', status: 'in-progress', completion: '2030', description: 'From 1,850km to 3,000km. Dedicated access roads to all six host stadiums.' },

  // AIRPORTS
  { name: 'Mohammed V Airport Terminal 3', type: 'airport', country: 'Morocco', budget: '$1.2B', status: 'in-progress', completion: '2029', description: 'New terminal at Casablanca. Capacity target: 80M passengers/year by 2030 (from 38M).' },
  { name: 'National Airport Expansion Program', type: 'airport', country: 'Morocco', budget: '$2.8B total', status: 'in-progress', completion: '2030', description: 'Upgrades across all host city airports. Marrakech, Agadir, Fes, Tangier, Rabat.' },
  { name: 'Royal Air Maroc Fleet Expansion', type: 'airport', country: 'Morocco', budget: '$4B+', status: 'in-progress', completion: '2030', description: 'Fleet growing from 50 to 200+ aircraft. New routes to host cities.' },

  // HOTELS
  { name: 'Hotel Capacity: +40,000 Rooms', type: 'hotel', country: 'Morocco', budget: '$2B+', status: 'in-progress', completion: '2030', description: 'Target: 330,000 total rooms by 2030. 25,000 existing rooms renovated via government loan program (interest-free 2024-25).' },
  { name: '150,000 New Hotel Rooms (National Target)', type: 'hotel', country: 'Morocco', budget: 'Mixed public/private', status: 'planned', completion: '2030', description: 'Long-term target to support 26M visitor goal. Concentration in six host cities.' },
]

// ═══ MAP PROJECTION (Mercator simplified for the region) ═══
// Map bounds: lat 27-44, lng -14 to 5
const MAP = { latMin: 27, latMax: 44.5, lngMin: -14, lngMax: 5, w: 900, h: 600 }

function project(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - MAP.lngMin) / (MAP.lngMax - MAP.lngMin)) * MAP.w
  const y = MAP.h - ((lat - MAP.latMin) / (MAP.latMax - MAP.latMin)) * MAP.h
  return { x, y }
}

// Simplified country outlines (very rough polygons for visual)
const MOROCCO_OUTLINE = [
  [-5.9,35.8],[-4.4,35.2],[-2.2,35.0],[-1.1,33.5],[-1.2,32.6],[-1.7,30.4],
  [-3.0,29.4],[-5.6,29.5],[-8.7,28.7],[-10.5,27.8],[-13.2,28.8],[-12.4,30.0],
  [-10.5,31.5],[-9.6,33.2],[-7.6,33.6],[-6.4,34.1],[-5.6,35.4],[-5.9,35.8],
].map(([lng,lat]) => project(lat,lng))

const SPAIN_OUTLINE = [
  [-9.3,42.1],[-8.2,43.4],[-6.2,43.5],[-3.8,43.5],[-1.8,43.4],[0.3,42.7],
  [3.3,42.4],[3.3,41.4],[1.5,41.0],[0.8,40.7],[-0.5,40.0],[-0.3,39.5],
  [0.2,38.7],[-0.5,38.3],[-0.8,37.6],[-1.6,37.0],[-2.9,36.7],[-5.4,36.1],
  [-6.2,36.5],[-7.0,37.0],[-7.4,37.2],[-8.0,37.1],[-8.9,37.0],[-8.9,38.0],
  [-9.5,38.7],[-9.1,39.5],[-8.7,40.5],[-8.7,41.8],[-9.3,42.1],
].map(([lng,lat]) => project(lat,lng))

const PORTUGAL_OUTLINE = [
  [-9.5,37.0],[-8.9,37.0],[-7.4,37.2],[-7.0,37.0],[-6.9,38.2],[-7.0,38.8],
  [-7.3,39.5],[-7.0,40.0],[-6.8,41.0],[-6.2,41.6],[-7.5,41.9],[-8.2,42.1],
  [-8.7,41.8],[-8.7,40.5],[-9.5,38.7],[-9.1,39.5],[-9.5,38.7],[-9.1,37.5],
  [-9.5,37.0],
].map(([lng,lat]) => project(lat,lng))

// HSR line (Tangier → Kénitra → Rabat → Casa → Marrakech)
const HSR_LINE = [
  [-5.80,35.77],[-6.35,34.26],[-6.85,33.97],[-7.59,33.57],[-8.01,31.63],
].map(([lng,lat]) => project(lat,lng))

function polyToPath(pts: {x:number;y:number}[]): string {
  return pts.map((p,i) => `${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z'
}
function lineToPath(pts: {x:number;y:number}[]): string {
  return pts.map((p,i) => `${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
}

// ═══ COMPONENT ═══

type FilterType = 'all' | 'Morocco' | 'Spain' | 'Portugal'
type ViewType = 'stadiums' | 'infrastructure' | 'budget'


const WORLD_CUP_2030_PTS = [
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898, detail: 'Grand Stade de Casablanca. 93,000 capacity. Final venue.', color: '#C17F28' },
  { name: 'Rabat', lat: 34.0209, lng: -6.8416, detail: 'Stade Moulay Abdallah. Semi-finals.', color: '#C17F28' },
  { name: 'Marrakech', lat: 31.6295, lng: -7.9811, detail: 'Grand Stade de Marrakech. Group stage.', color: '#C17F28' },
  { name: 'Fez', lat: 34.0181, lng: -5.0078, detail: 'Stade de Fes. Group stage.', color: '#C17F28' },
  { name: 'Tangier', lat: 35.7595, lng: -5.8340, detail: 'Stade Ibn Batouta. Group stage.', color: '#C17F28' },
  { name: 'Agadir', lat: 30.4278, lng: -9.5981, detail: 'Grand Stade d\'Agadir. Group stage.', color: '#C17F28' },
  { name: 'Madrid', lat: 40.4168, lng: -3.7038, detail: 'Santiago Bernabeu. Spain co-host.', color: '#2D5F8A' },
  { name: 'Barcelona', lat: 41.3874, lng: 2.1686, detail: 'Camp Nou. Spain co-host.', color: '#2D5F8A' },
  { name: 'Lisbon', lat: 38.7223, lng: -9.1393, detail: 'Estadio da Luz. Portugal co-host.', color: '#2D6E4F' },
]
const MBT_WORLD_CUP_2030 = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function WorldCup2030Map() {
  const mc = useRef<HTMLDivElement>(null)
  const mr = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mc.current || !MBT_WORLD_CUP_2030 || mr.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MBT_WORLD_CUP_2030!
      const map = new mapboxgl.Map({ container: mc.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-3, 36], zoom: 4, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mr.current = map
      map.on('load', () => {
        WORLD_CUP_2030_PTS.forEach(p => {
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

export function WorldCup2030Content() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [view, setView] = useState<ViewType>('stadiums')
  const [selected, setSelected] = useState<Stadium | null>(null)
  const [hoveredInfra, setHoveredInfra] = useState<string | null>(null)

  const filtered = filter === 'all' ? STADIUMS : STADIUMS.filter(s => s.country === filter)

  // Budget totals
  const moroccoTotal = '$41B infrastructure budget (2026)'
  const totalStadiumCapacity = STADIUMS.reduce((sum, s) => sum + s.capacity, 0)

  const countryColor = (country: string) => {
    if (country === 'Morocco') return C.morocco
    if (country === 'Spain') return C.spain
    return C.portugal
  }

  return (
    <div className="min-h-screen pt-16 bg-white" style={{ color: '#0a0a0a' }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-20 pb-12">
        <p className="micro-label mb-2" style={{ color: '#737373' }}>Module 010 · Infrastructure Intelligence</p>
        <h1 className="font-serif text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.02em] mb-4">
          <em>2030 World Cup</em>
          <br />
          <span className="text-[clamp(1.5rem,4vw,2.5rem)]" style={{ color: '#525252' }}>Infrastructure Map</span>
        </h1>
        <p className="text-[13px] max-w-[620px] leading-[1.7] mb-6" style={{ color: '#262626' }}>
          Every stadium, railway line, highway, airport, and hotel project across
          Morocco, Spain, and Portugal — the complete infrastructure picture for
          the first World Cup across two continents. Twenty stadiums. Seventeen cities.
          Forty-one billion dollars in Moroccan infrastructure alone.
        </p>

        {/* Live countdown */}
        {(() => {
          const kickoff = new Date('2030-06-13T17:00:00Z') // Opening match
          const now = new Date()
          const diff = kickoff.getTime() - now.getTime()
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const months = Math.floor(days / 30.44)
          const weeks = Math.floor(days / 7)
          return diff > 0 ? (
            <div className="flex items-start gap-3 p-4 mb-6" style={{ background: `${C.morocco}08`, borderLeft: `3px solid ${C.morocco}` }}>
              <span className="inline-block w-[8px] h-[8px] rounded-full mt-1 animate-pulse shrink-0" style={{ background: C.morocco }} />
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono text-[22px] font-bold" style={{ color: C.morocco }}>{days.toLocaleString()}</span>
                  <span className="font-mono text-[11px]" style={{ color: '#737373' }}>days to kickoff</span>
                </div>
                <div className="flex gap-4 mt-1">
                  {[
                    { v: months, l: 'months' },
                    { v: weeks, l: 'weeks' },
                    { v: hours, l: 'hours today' },
                  ].map(u => (
                    <span key={u.l} className="font-mono text-[10px]" style={{ color: '#737373' }}>{u.v.toLocaleString()} {u.l}</span>
                  ))}
                </div>
                <p className="text-[11px] mt-1" style={{ color: '#525252' }}>
                  Opening match: June 13, 2030 — estimated. First World Cup across two continents.
                </p>
              </div>
            </div>
          ) : null
        })()}

        <div className="flex flex-wrap gap-6 md:gap-10">
          {[
            { n: '20', l: 'Stadiums', c: C.morocco },
            { n: '17', l: 'Host cities', c: C.spain },
            { n: `${(totalStadiumCapacity/1000).toFixed(0)}K`, l: 'Combined seats', c: C.portugal },
            { n: '$41B', l: 'Morocco infrastructure', c: C.rail },
            { n: '$9.6B', l: 'Rail investment', c: C.highway },
            { n: '2030', l: 'Tournament year', c: '#737373' },
          ].map(s => (
            <div key={s.l}>
              <p className="font-serif italic text-[24px] md:text-[28px]" style={{ color: s.c }}>{s.n}</p>
              <p className="micro-label" style={{ color: '#737373' }}>{s.l}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] mt-6" style={{ color: '#a3a3a3' }}>
          Last updated: Q1 2026 · Updated quarterly
        </p>
      </section>

      {/* ═══ FILTER BAR ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%]">
        <div className="border-t border-b" style={{ borderColor: '#e5e5e5' }}>
          <div className="flex items-center gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' as const }}>
            <span className="text-[10px] uppercase tracking-widest mr-2" style={{ color: '#737373' }}>View</span>
            {(['stadiums', 'infrastructure', 'budget'] as ViewType[]).map(v => (
              <button key={v} onClick={() => setView(v)}
                className="px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all whitespace-nowrap"
                style={{
                  background: view === v ? '#0a0a0a' : 'transparent',
                  color: view === v ? '#fff' : '#737373',
                  border: `1px solid ${view === v ? '#0a0a0a' : '#e5e5e5'}`,
                }}>
                {v}
              </button>
            ))}
            <span className="text-[10px] uppercase tracking-widest mx-2" style={{ color: '#737373' }}>|</span>
            <span className="text-[10px] uppercase tracking-widest mr-2" style={{ color: '#737373' }}>Country</span>
            {(['all', 'Morocco', 'Spain', 'Portugal'] as FilterType[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all whitespace-nowrap"
                style={{
                  background: filter === f ? (f === 'all' ? '#0a0a0a' : countryColor(f)) : 'transparent',
                  color: filter === f ? '#fff' : '#737373',
                  border: `1px solid ${filter === f ? (f === 'all' ? '#0a0a0a' : countryColor(f)) : '#e5e5e5'}`,
                }}>
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      {view === 'stadiums' && (
        <section className="px-8 md:px-[8%] lg:px-[12%] mt-8">
          <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} className="w-full h-auto" style={{ maxHeight: '70vh' }}>
            {/* Country outlines */}
            <path d={polyToPath(SPAIN_OUTLINE)} fill="#f5f5f5" stroke="#e5e5e5" strokeWidth="1" />
            <path d={polyToPath(PORTUGAL_OUTLINE)} fill="#f5f5f5" stroke="#e5e5e5" strokeWidth="1" />
            <path d={polyToPath(MOROCCO_OUTLINE)} fill="#f5f5f5" stroke="#e5e5e5" strokeWidth="1" />

            {/* HSR line */}
            <path d={lineToPath(HSR_LINE)} fill="none" stroke={C.rail} strokeWidth="2"
              strokeDasharray="6,4" opacity="0.6" />
            <text x={HSR_LINE[2].x + 8} y={HSR_LINE[2].y - 4}
              fontSize="7" fill={C.rail} fontFamily="var(--font-plex-mono), monospace" opacity="0.8">
              <span className="underline underline-offset-2">Al Boraq</span> HSR
            </text>

            {/* Strait of Gibraltar label */}
            {(() => {
              const gib = project(35.9, -5.5)
              return <text x={gib.x} y={gib.y} fontSize="7" fill="#a3a3a3" textAnchor="middle"
                fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic">
                Strait of Gibraltar — 14km
              </text>
            })()}

            {/* Stadium markers */}
            {filtered.map(s => {
              const p = project(s.lat, s.lng)
              const isSelected = selected?.name === s.name
              const color = countryColor(s.country)
              const r = Math.max(4, Math.sqrt(s.capacity / 10000) * 2.5)

              return (
                <g key={s.name} style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(isSelected ? null : s)}>
                  {/* Pulse for new builds */}
                  {s.newBuild && (
                    <circle cx={p.x} cy={p.y} r={r + 4} fill="none" stroke={C.newBuild}
                      strokeWidth="0.5" opacity="0.4">
                      <animate attributeName="r" from={r + 2} to={r + 10} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Main dot */}
                  <circle cx={p.x} cy={p.y} r={isSelected ? r + 2 : r}
                    fill={color} stroke="#fff" strokeWidth={isSelected ? 2 : 1}
                    opacity={isSelected ? 1 : 0.85}
                    style={{ transition: 'all 0.2s' }} />
                  {/* Capacity-proportional ring */}
                  {s.capacity >= 65000 && (
                    <circle cx={p.x} cy={p.y} r={r + 3} fill="none" stroke={color}
                      strokeWidth="0.5" opacity="0.4" />
                  )}
                  {/* City label */}
                  <text x={p.x} y={p.y - r - 4} textAnchor="middle"
                    fontSize="7" fill="#0a0a0a" fontWeight={isSelected ? 600 : 400}
                    fontFamily="var(--font-plex-mono), monospace">
                    {s.city}
                  </text>
                </g>
              )
            })}

            {/* Country labels */}
            {[
              { name: 'MOROCCO', lat: 31.5, lng: -6.5, color: C.morocco },
              { name: 'SPAIN', lat: 40.0, lng: -3.0, color: C.spain },
              { name: 'PORTUGAL', lat: 39.5, lng: -8.5, color: C.portugal },
            ].map(cl => {
              const p = project(cl.lat, cl.lng)
              return <text key={cl.name} x={p.x} y={p.y} textAnchor="middle"
                fontSize="10" fill={cl.color} fontFamily="var(--font-plex-mono), monospace"
                letterSpacing="0.15em" fontWeight={600} opacity="0.25">{cl.name}</text>
            })}
          </svg>

          {/* Selected stadium detail */}
          {selected && (
            <div className="mt-4 p-6 border" style={{ borderColor: countryColor(selected.country) + '40' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: countryColor(selected.country) }}>{selected.country}</p>
                  <h3 className="font-serif italic text-[24px] mt-1">{selected.name}</h3>
                  <p className="text-[13px] mt-1" style={{ color: '#525252' }}>{selected.city}</p>
                </div>
                <div className="text-right">
                  <p className="font-serif italic text-[28px]" style={{ color: countryColor(selected.country) }}>
                    {(selected.capacity / 1000).toFixed(0)}K
                  </p>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Capacity</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Status</p>
                  <p className="text-[12px] font-medium mt-1" style={{ color: STATUS_COLOR[selected.status] }}>
                    {STATUS_LABEL[selected.status]}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Max Round</p>
                  <p className="text-[12px] mt-1">{selected.maxRound}</p>
                </div>
                {selected.budget && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Budget</p>
                    <p className="text-[12px] mt-1">{selected.budget}</p>
                  </div>
                )}
                {selected.completion && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Completion</p>
                    <p className="text-[12px] mt-1">{selected.completion}</p>
                  </div>
                )}
              </div>
              {selected.note && (
                <p className="text-[11px] mt-4 leading-[1.6]" style={{ color: '#525252' }}>{selected.note}</p>
              )}
              <button onClick={() => setSelected(null)} className="text-[10px] uppercase tracking-widest mt-4"
                style={{ color: '#a3a3a3' }}>Close ×</button>
            </div>
          )}

          {/* Map legend */}
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: C.morocco }} />
              <span className="text-[10px]" style={{ color: '#737373' }}>Morocco (6)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: C.spain }} />
              <span className="text-[10px]" style={{ color: '#737373' }}>Spain (11)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: C.portugal }} />
              <span className="text-[10px]" style={{ color: '#737373' }}>Portugal (3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border" style={{ borderColor: C.newBuild }} />
              <span className="text-[10px]" style={{ color: '#737373' }}>New build (pulsing)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5" style={{ background: C.rail, backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 4px, #fff 4px 6px)' }} />
              <span className="text-[10px]" style={{ color: '#737373' }}>High-speed rail</span>
            </div>
          </div>
        </section>
      )}

      {/* ═══ INFRASTRUCTURE TABLE ═══ */}
      {view === 'infrastructure' && (
        <section className="px-8 md:px-[8%] lg:px-[12%] mt-8">
          <div className="grid grid-cols-1 gap-px" style={{ background: '#e5e5e5' }}>
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-3 bg-white"
              style={{ background: '#fafafa' }}>
              <span className="col-span-4 text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Project</span>
              <span className="col-span-1 text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Type</span>
              <span className="col-span-2 text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Budget</span>
              <span className="col-span-2 text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Status</span>
              <span className="col-span-1 text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Year</span>
              <span className="col-span-2 text-[10px] uppercase tracking-widest" style={{ color: '#737373' }}>Country</span>
            </div>
            {INFRA.map((p, i) => {
              const typeColor = p.type === 'rail' ? C.rail : p.type === 'highway' ? C.highway : p.type === 'airport' ? C.airport : C.hotel
              const isHovered = hoveredInfra === p.name
              return (
                <div key={i} className="grid grid-cols-12 gap-4 p-3 bg-white items-baseline"
                  style={{ background: isHovered ? '#fafafa' : '#fff', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={() => setHoveredInfra(p.name)}
                  onMouseLeave={() => setHoveredInfra(null)}>
                  <div className="col-span-4">
                    <p className="text-[12px] font-medium">{p.name}</p>
                    {isHovered && <p className="text-[10px] mt-1 leading-[1.5]" style={{ color: '#525252' }}>{p.description}</p>}
                  </div>
                  <div className="col-span-1">
                    <span className="text-[10px] uppercase" style={{ color: typeColor }}>{p.type}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[12px] font-medium" style={{ color: typeColor }}>{p.budget}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] px-2 py-0.5" style={{ color: STATUS_COLOR[p.status], border: `1px solid ${STATUS_COLOR[p.status]}40` }}>
                      {STATUS_LABEL[p.status]}
                    </span>
                  </div>
                  <span className="col-span-1 text-[12px]" style={{ color: '#737373' }}>{p.completion}</span>
                  <span className="col-span-2 text-[11px]">{p.country}</span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ═══ BUDGET BREAKDOWN ═══ */}
      {view === 'budget' && (
        <section className="px-8 md:px-[8%] lg:px-[12%] mt-8">
          <div className="mb-8">
            <p className="micro-label mb-2" style={{ color: '#737373' }}>Morocco Investment Breakdown</p>
            <p className="font-serif italic text-[20px]" style={{ color: '#262626' }}>
              $41 billion in infrastructure (2026 budget allocation)
            </p>
          </div>

          {/* Proportional bars */}
          <div className="space-y-4">
            {[
              { label: 'Rail (HSR + trains + stations)', amount: 9.6, color: C.rail },
              { label: 'Airports (terminals + fleet)', amount: 6.8, color: C.airport },
              { label: 'Stadiums (new + renovation)', amount: 5.1, color: C.morocco },
              { label: 'Hotels (capacity + renovation)', amount: 2.4, color: C.hotel },
              { label: 'Highways (new + expansion)', amount: 1.3, color: C.highway },
              { label: 'Other infrastructure', amount: 15.8, color: '#a3a3a3' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[11px]">{item.label}</span>
                  <span className="font-serif italic text-[16px]" style={{ color: item.color }}>${item.amount}B</span>
                </div>
                <div className="w-full h-3" style={{ background: '#f5f5f5' }}>
                  <div className="h-full" style={{
                    width: `${(item.amount / 41) * 100}%`,
                    background: item.color,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Stadium capacity comparison */}
          <div className="mt-12 border-t pt-8" style={{ borderColor: '#e5e5e5' }}>
            <p className="micro-label mb-4" style={{ color: '#737373' }}>Stadium Capacity — All 20 Venues</p>
            <div className="space-y-2">
              {[...STADIUMS].sort((a, b) => b.capacity - a.capacity).map(s => (
                <div key={s.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: countryColor(s.country) }} />
                  <div className="w-[160px] md:w-[200px] flex-shrink-0">
                    <span className="text-[10px]">{s.city}</span>
                  </div>
                  <div className="flex-1 h-4 relative" style={{ background: '#f5f5f5' }}>
                    <div className="h-full" style={{
                      width: `${(s.capacity / 115000) * 100}%`,
                      background: countryColor(s.country),
                      opacity: 0.7,
                    }} />
                    <span className="absolute right-1 top-0.5 text-[8px]" style={{ color: '#737373' }}>
                      {(s.capacity / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <span className="text-[8px] w-[60px] flex-shrink-0 text-right" style={{ color: STATUS_COLOR[s.status] }}>
                    {STATUS_LABEL[s.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key economic figures */}
          <div className="mt-12 border-t pt-8 grid grid-cols-1 md:grid-cols-3 gap-8" style={{ borderColor: '#e5e5e5' }}>
            <div>
              <p className="micro-label mb-2" style={{ color: '#737373' }}>Tourism Target</p>
              <p className="font-serif italic text-[28px]" style={{ color: C.morocco }}>26M</p>
              <p className="text-[11px] leading-[1.6]" style={{ color: '#525252' }}>
                Visitors targeted by 2030, up from 17.4M in 2024. Each match projected
                to generate $25–37.5M in economic activity.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: '#737373' }}>Employment</p>
              <p className="font-serif italic text-[28px]" style={{ color: C.rail }}>250K</p>
              <p className="text-[11px] leading-[1.6]" style={{ color: '#525252' }}>
                Direct and indirect jobs. 40% hotels/restaurants, 30% construction,
                15% services, 15% commerce and digital.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: '#737373' }}>GDP Impact</p>
              <p className="font-serif italic text-[28px]" style={{ color: C.spain }}>+0.9%</p>
              <p className="text-[11px] leading-[1.6]" style={{ color: '#525252' }}>
                Estimated GDP growth contribution 2024–2030. Total economic benefit
                projected at $2–4B for Morocco alone.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ═══ STADIUM TABLE (all views) ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-12">
        <div className="border-t pt-8" style={{ borderColor: '#e5e5e5' }}>
          <p className="micro-label mb-4" style={{ color: '#737373' }}>All 20 Venues</p>
          <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' as const }}>
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b" style={{ borderColor: '#e5e5e5' }}>
                  {['Stadium', 'City', 'Country', 'Capacity', 'Status', 'Max Round', 'Completion'].map(h => (
                    <th key={h} className="text-left text-[10px] uppercase tracking-widest py-2 pr-4" style={{ color: '#737373' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STADIUMS.map(s => (
                  <tr key={s.name} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#f5f5f5' }}>
                    <td className="py-2 pr-4 text-[11px] font-medium">{s.name}</td>
                    <td className="py-2 pr-4 text-[11px]">{s.city}</td>
                    <td className="py-2 pr-4">
                      <span className="text-[10px] px-1.5 py-0.5" style={{ color: countryColor(s.country), border: `1px solid ${countryColor(s.country)}30` }}>
                        {s.country}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-[11px] font-serif italic">{s.capacity.toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <span className="text-[9px] px-1.5 py-0.5" style={{ color: STATUS_COLOR[s.status], background: STATUS_COLOR[s.status] + '10' }}>
                        {STATUS_LABEL[s.status]}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-[11px]" style={{ color: '#525252' }}>{s.maxRound}</td>
                    <td className="py-2 pr-4 text-[11px]" style={{ color: '#737373' }}>{s.completion || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#C17F28' }}>Host Cities — 2030</p>
        <WorldCup2030Map />
      </div></section>

      {/* ═══ RELATED ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8 border-t" style={{ borderColor: '#e5e5e5' }}>
        <div className="flex flex-wrap gap-6">
          <Link href="/morocco-world-cup-2030" className="text-[11px] hover:underline" style={{ color: '#525252' }}>
            Interactive stadium &amp; infrastructure map &rarr;
          </Link>
          <Link href="/stories/world-cup-blueprint" className="text-[11px] hover:underline" style={{ color: '#525252' }}>
            Road to 2030 — economic blueprint &rarr;
          </Link>
        </div>
      </section>

{/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: '#e5e5e5' }}>
          <p className="micro-label mb-2" style={{ color: '#737373' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: '#737373' }}>
            Stadium data from FIFA Official Bid Book (July 2024), Royal Moroccan Football Federation (FRMF),
            Real Federación Española de Fútbol (RFEF), Federação Portuguesa de Futebol (FPF).
            Infrastructure budgets from Morocco Ministry of Economy &amp; Finance 2026 budget;
            Haut-Commissariat au Plan (HCP); ONCF; Autoroutes du Maroc (ADM);
            trade.gov Morocco Infrastructure guide; AGBI; Valoris Securities impact analysis.
            Construction status verified Q1 2026 against AFCON 2025 completion reports and
            Morocco World News project tracking. Spain/Portugal venue status from StadiumDB.com and RFEF.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: '#e5e5e5' }}>
              © {new Date().getFullYear()} Slow Morocco. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: '#2D6E4F' }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
