'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  rail: '#722F37', hsr: '#C54B3C', road: '#8B6914', future: '#2D6E4F',
  era1920: '#5C4033', era1980: '#8B6914', era2010: '#1A5276', era2030: '#C54B3C',
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
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

// ═══ CITY DATA ═══
interface City {
  id: string; name: string; lat: number; lon: number
  x: number; y: number // SVG position on schematic map
}

const CITIES: City[] = [
  { id: 'tangier', name: 'Tangier', lat: 35.77, lon: -5.80, x: 180, y: 50 },
  { id: 'kenitra', name: 'Kenitra', lat: 34.26, lon: -6.58, x: 155, y: 140 },
  { id: 'rabat', name: 'Rabat', lat: 34.01, lon: -6.84, x: 148, y: 165 },
  { id: 'casablanca', name: 'Casablanca', lat: 33.57, lon: -7.59, x: 130, y: 205 },
  { id: 'marrakech', name: 'Marrakech', lat: 31.63, lon: -8.01, x: 165, y: 320 },
  { id: 'fes', name: 'Fes', lat: 34.03, lon: -4.98, x: 260, y: 150 },
  { id: 'meknes', name: 'Meknès', lat: 33.89, lon: -5.55, x: 225, y: 170 },
  { id: 'agadir', name: 'Agadir', lat: 30.42, lon: -9.60, x: 115, y: 410 },
  { id: 'oujda', name: 'Oujda', lat: 34.68, lon: -1.91, x: 370, y: 130 },
]

// ═══ TRAVEL TIMES (minutes) ═══
// Format: { from-to: [1920, 1980, 2010, 2030] }
// 1920 = colonial era rail (slow, sometimes mule/horse segments)
// 1980 = post-independence conventional rail
// 2010 = modern conventional rail
// 2030 = HSR where applicable, improved conventional otherwise
type EraKey = '1920' | '1980' | '2010' | '2030'
const ERAS: EraKey[] = ['1920', '1980', '2010', '2030']
const ERA_COLORS: Record<EraKey, string> = { '1920': C.era1920, '1980': C.era1980, '2010': C.era2010, '2030': C.era2030 }
const ERA_LABELS: Record<EraKey, string> = {
  '1920': 'Colonial rail', '1980': 'Post-independence', '2010': 'Modern conventional', '2030': 'Al Boraq HSR era',
}

interface Route {
  from: string; to: string
  times: Record<EraKey, number> // minutes
  dist: number // km
  hsr2030: boolean
  note?: string
}

const ROUTES: Route[] = [
  { from: 'tangier', to: 'kenitra', times: { '1920': 360, '1980': 240, '2010': 210, '2030': 47 }, dist: 200, hsr2030: true, note: 'First HSR segment (2018). 320 km/h.' },
  { from: 'tangier', to: 'rabat', times: { '1920': 420, '1980': 300, '2010': 240, '2030': 65 }, dist: 250, hsr2030: true },
  { from: 'tangier', to: 'casablanca', times: { '1920': 600, '1980': 360, '2010': 285, '2030': 90 }, dist: 337, hsr2030: true, note: 'Al Boraq flagship. Was 4h45, now 2h10, will be 1h30.' },
  { from: 'tangier', to: 'marrakech', times: { '1920': 1080, '1980': 600, '2010': 540, '2030': 160 }, dist: 570, hsr2030: true, note: 'Full HSR by 2029. 7h → 2h40.' },
  { from: 'kenitra', to: 'rabat', times: { '1920': 90, '1980': 50, '2010': 40, '2030': 14 }, dist: 40, hsr2030: true },
  { from: 'rabat', to: 'casablanca', times: { '1920': 180, '1980': 90, '2010': 60, '2030': 25 }, dist: 90, hsr2030: true, note: 'Twin cities. 25 min by HSR = commuter range.' },
  { from: 'casablanca', to: 'marrakech', times: { '1920': 480, '1980': 240, '2010': 195, '2030': 70 }, dist: 240, hsr2030: true, note: 'HSR extension. Currently 3h15, will be ~1h10.' },
  { from: 'casablanca', to: 'fes', times: { '1920': 540, '1980': 300, '2010': 225, '2030': 195 }, dist: 296, hsr2030: false, note: 'Conventional improved. HSR to Fes planned post-2030.' },
  { from: 'casablanca', to: 'agadir', times: { '1920': 960, '1980': 540, '2010': 480, '2030': 210 }, dist: 460, hsr2030: false, note: 'HSR extension planned post-2030. Currently road/bus only for fastest option.' },
  { from: 'fes', to: 'meknes', times: { '1920': 120, '1980': 60, '2010': 45, '2030': 40 }, dist: 60, hsr2030: false },
  { from: 'fes', to: 'oujda', times: { '1920': 720, '1980': 420, '2010': 360, '2030': 300 }, dist: 332, hsr2030: false, note: 'Eastern corridor. Slow. HSR to Oujda in 2040 vision.' },
  { from: 'marrakech', to: 'agadir', times: { '1920': 600, '1980': 300, '2010': 210, '2030': 150 }, dist: 250, hsr2030: false, note: 'New expressway. HSR extension planned.' },
  { from: 'rabat', to: 'fes', times: { '1920': 420, '1980': 210, '2010': 165, '2030': 150 }, dist: 200, hsr2030: false },
  { from: 'rabat', to: 'marrakech', times: { '1920': 660, '1980': 330, '2010': 255, '2030': 95 }, dist: 330, hsr2030: true, note: 'HSR extension. 4.25h → 1h35.' },
]

// ═══ MILESTONES ═══
const MILESTONES = [
  { year: 1916, event: 'French protectorate builds first rail: Casablanca–Rabat', km: 90 },
  { year: 1923, event: 'Tangier–Fes line opens (narrow gauge)', km: 310 },
  { year: 1934, event: 'National rail network reaches 1,700 km', km: 1700 },
  { year: 1963, event: 'ONCF created. Post-independence modernisation begins', km: 1907 },
  { year: 2003, event: 'Shuttle service Casa–Rabat (60 min, every 30 min)', km: 2110 },
  { year: 2007, event: 'HSR project announced. Tangier–Casablanca selected', km: 2110 },
  { year: 2018, event: 'Al Boraq inaugurated. Africa\'s first HSR. Tangier–Casa 2h10', km: 2293 },
  { year: 2025, event: 'Kenitra–Marrakech HSR construction launched (430 km)', km: 2293 },
  { year: 2029, event: 'Target: Tangier–Marrakech HSR complete. 2h40 end-to-end', km: 2723 },
  { year: 2040, event: 'Vision: 1,500 km HSR. Agadir, Fes, Oujda connected', km: 3500 },
]

// ═══ ISOCHRONE MAP ═══
function IsochroneMap({ era }: { era: EraKey }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  // Calculate "perceived" positions — cities pull toward Casablanca based on travel time
  const casa = CITIES.find(c => c.id === 'casablanca')!
  const getPerceivedPos = (city: City) => {
    if (city.id === 'casablanca') return { x: city.x, y: city.y }
    const route = ROUTES.find(r =>
      (r.from === 'casablanca' && r.to === city.id) ||
      (r.to === 'casablanca' && r.from === city.id) ||
      (r.from === 'tangier' && r.to === city.id) ||
      (r.from === city.id && r.to === 'tangier')
    )
    if (!route) return { x: city.x, y: city.y }
    const time = route.times[era]
    const time1920 = route.times['1920']
    const compression = time / time1920
    const dx = city.x - casa.x
    const dy = city.y - casa.y
    return {
      x: casa.x + dx * compression,
      y: casa.y + dy * compression,
    }
  }

  return (
    <div ref={ref}>
      <svg viewBox="0 0 420 470" className="w-full" style={{ maxHeight: 400 }}>
        {/* Morocco outline (simplified) */}
        <path d="M 100,30 L 200,20 L 280,25 L 380,50 L 400,120 L 390,200 L 350,280 L 300,350 L 200,400 L 120,430 L 60,400 L 40,320 L 50,220 L 70,140 L 80,80 Z"
          fill="none" stroke={C.border} strokeWidth="1" strokeDasharray="4,4" opacity={0.4} />
        {/* Route lines */}
        {ROUTES.filter(r => {
          const fc = CITIES.find(c => c.id === r.from)
          const tc = CITIES.find(c => c.id === r.to)
          return fc && tc
        }).map(r => {
          const fc = CITIES.find(c => c.id === r.from)!
          const tc = CITIES.find(c => c.id === r.to)!
          const fp = getPerceivedPos(fc)
          const tp = getPerceivedPos(tc)
          return (
            <line key={`${r.from}-${r.to}`}
              x1={vis ? fp.x : fc.x} y1={vis ? fp.y : fc.y}
              x2={vis ? tp.x : tc.x} y2={vis ? tp.y : tc.y}
              stroke={r.hsr2030 && era === '2030' ? C.hsr : `${C.border}60`}
              strokeWidth={r.hsr2030 && era === '2030' ? 2 : 0.5}
              style={{ transition: 'all 0.8s ease-out' }}
            />
          )
        })}
        {/* City dots */}
        {CITIES.map(city => {
          const p = getPerceivedPos(city)
          const isHSR = era === '2030' && ['tangier', 'kenitra', 'rabat', 'casablanca', 'marrakech'].includes(city.id)
          return (
            <g key={city.id}>
              <circle
                cx={vis ? p.x : city.x} cy={vis ? p.y : city.y}
                r={isHSR ? 5 : 3.5}
                fill={isHSR ? C.hsr : C.ink}
                style={{ transition: 'all 0.8s ease-out' }}
              />
              <text
                x={vis ? p.x : city.x} y={(vis ? p.y : city.y) - 8}
                textAnchor="middle" fontSize="9"
                fontFamily="'IBM Plex Mono', monospace"
                fill={isHSR ? C.hsr : C.text}
                fontWeight={isHSR ? '700' : '400'}
                style={{ transition: 'all 0.8s ease-out' }}
              >
                {city.name}
              </text>
            </g>
          )
        })}
        {/* Era label */}
        <text x="20" y="460" fontSize="12" fontFamily="'IBM Plex Mono', monospace" fontWeight="700"
          fill={ERA_COLORS[era]}>{era}</text>
        <text x="60" y="460" fontSize="9" fontFamily="'IBM Plex Mono', monospace" fill={C.muted}>
          {ERA_LABELS[era]}
        </text>
      </svg>
    </div>
  )
}

// ═══ MAIN CONTENT ═══

const HIGH_SPEED_HORIZON_PTS = [
  { name: 'Tangier', lat: 35.7595, lng: -5.8340, detail: 'Al Boraq northern terminus. 320 km/h.', color: '#A0452E' },
  { name: 'Kenitra', lat: 34.2610, lng: -6.5802, detail: 'Al Boraq stop. Junction point.', color: '#A0452E' },
  { name: 'Rabat', lat: 34.0209, lng: -6.8416, detail: 'Rabat Agdal station. Capital hub.', color: '#A0452E' },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898, detail: 'Casa Voyageurs. National hub.', color: '#A0452E' },
  { name: 'Marrakech', lat: 31.6295, lng: -7.9811, detail: 'Future TGV extension. Phase 2.', color: '#8B7355' },
  { name: 'Agadir', lat: 30.4278, lng: -9.5981, detail: 'Future TGV extension. Phase 3.', color: '#8B7355' },
]
const MBT_HIGH_SPEED_HORIZON = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function HighSpeedHorizonMap() {
  const mc = useRef<HTMLDivElement>(null)
  const mr = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mc.current || !MBT_HIGH_SPEED_HORIZON || mr.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MBT_HIGH_SPEED_HORIZON!
      const map = new mapboxgl.Map({ container: mc.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6.5, 33], zoom: 5.8, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mr.current = map
      map.on('load', () => {
        HIGH_SPEED_HORIZON_PTS.forEach(p => {
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

export function HighSpeedHorizonContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const routesR = useReveal()
  const milesR = useReveal()
  const [selectedEra, setSelectedEra] = useState<EraKey>('2030')
  const [cityA, setCityA] = useState('tangier')
  const [cityB, setCityB] = useState('marrakech')

  // Find route for selected pair
  const selectedRoute = ROUTES.find(r =>
    (r.from === cityA && r.to === cityB) || (r.from === cityB && r.to === cityA)
  )

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Infrastructure Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The High-Speed Horizon</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            How Morocco is shrinking. Four eras. One country pulling its cities together.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          In 1920, Tangier to Marrakech took 18 hours by colonial rail — if the train ran at all.
          By 2029, <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Al Boraq</span> will do it in 2 hours 40 minutes. Casablanca and Rabat, once a
          three-hour journey, are now 25-minute commuter twins. Morocco is not building a train.
          It is collapsing distance. The 430 km Kenitra–Marrakech extension, launched in April 2025
          at $5.3 billion, will create a 630 km high-speed spine from Tangier to Marrakech —
          Africa&apos;s longest — operational before the <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">2030 World Cup</span>.
        </p>

        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '630', unit: 'km', l: 'HSR spine by 2029', c: C.hsr },
            { v: '320', unit: 'km/h', l: 'top speed', c: C.rail },
            { v: '$5.3B', unit: '', l: 'Kenitra–Marrakech cost', c: C.era2010 },
            { v: '2h40', unit: '', l: 'Tangier–Marrakech (was 7h+)', c: C.future },
          ].map((n, i) => (
            <div key={n.l} className="transition-all duration-700"
              style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 150}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}>
                <span className="text-[28px] font-bold">{n.v}</span>
                {n.unit && <span className="text-[14px] ml-1">{n.unit}</span>}
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ISOCHRONE MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.hsr }}>The Melting Map</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Cities pull toward each other as travel time shrinks. Select an era. Watch the country compress.
            Red dots = HSR-connected cities. Red lines = high-speed routes.
          </p>
          <div className="flex gap-2 mb-4">
            {ERAS.map(era => (
              <button key={era} onClick={() => setSelectedEra(era)}
                className="font-mono text-[11px] px-4 py-1.5 rounded-full border transition-all"
                style={{
                  borderColor: selectedEra === era ? ERA_COLORS[era] : C.border,
                  color: selectedEra === era ? ERA_COLORS[era] : C.muted,
                  background: selectedEra === era ? `${ERA_COLORS[era]}06` : 'transparent',
                  fontWeight: selectedEra === era ? 700 : 400,
                }}>
                {era}
              </button>
            ))}
          </div>
          <IsochroneMap era={selectedEra} />
        </div>
      </section>

      {/* ═══ COMMUTER'S GHOST ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.era1920 }}>The Commuter&apos;s Ghost</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Select two cities. See how travel time collapsed across a century.
          </p>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <select value={cityA} onChange={e => setCityA(e.target.value)}
              className="font-mono text-[12px] px-3 py-1.5 border rounded-sm bg-white"
              style={{ borderColor: C.border, color: C.ink }}>
              {CITIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <span className="font-mono text-[11px]" style={{ color: C.muted }}>→</span>
            <select value={cityB} onChange={e => setCityB(e.target.value)}
              className="font-mono text-[12px] px-3 py-1.5 border rounded-sm bg-white"
              style={{ borderColor: C.border, color: C.ink }}>
              {CITIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {selectedRoute ? (
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif italic text-[24px]" style={{ color: C.ink }}>
                  {CITIES.find(c => c.id === selectedRoute.from)!.name} → {CITIES.find(c => c.id === selectedRoute.to)!.name}
                </span>
                <span className="font-mono text-[11px]" style={{ color: C.muted }}>{selectedRoute.dist} km</span>
              </div>
              {/* Era comparison bars */}
              <div className="space-y-2">
                {ERAS.map((era, i) => {
                  const mins = selectedRoute.times[era]
                  const maxMins = selectedRoute.times['1920']
                  const hours = Math.floor(mins / 60)
                  const remMins = mins % 60
                  const timeStr = hours > 0 ? `${hours}h ${remMins > 0 ? remMins + 'm' : ''}` : `${mins}m`
                  const pctSaved = era !== '1920' ? Math.round((1 - mins / maxMins) * 100) : 0
                  return (
                    <div key={era} className="flex items-center gap-3">
                      <span className="font-mono text-[12px] font-bold w-12 shrink-0" style={{ color: ERA_COLORS[era] }}>{era}</span>
                      <div className="flex-1 h-6 rounded-sm" style={{ background: `${C.border}20` }}>
                        <div className="h-full rounded-sm transition-all duration-700 flex items-center px-2"
                          style={{
                            width: `${(mins / maxMins) * 100}%`,
                            background: `${ERA_COLORS[era]}15`,
                            borderRight: `2px solid ${ERA_COLORS[era]}`,
                            transitionDelay: `${i * 100}ms`,
                          }}>
                          <span className="font-mono text-[10px] font-bold whitespace-nowrap" style={{ color: ERA_COLORS[era] }}>{timeStr}</span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] w-12 text-right shrink-0" style={{ color: pctSaved > 0 ? C.future : C.muted }}>
                        {pctSaved > 0 ? `−${pctSaved}%` : '—'}
                      </span>
                    </div>
                  )
                })}
              </div>
              {/* Human hours saved */}
              {(() => {
                const saved = selectedRoute.times['1920'] - selectedRoute.times['2030']
                const dailyPassengers = selectedRoute.hsr2030 ? 20000 : 5000
                const annualHoursSaved = (saved / 60) * dailyPassengers * 365
                return (
                  <div className="mt-4 pt-3 border-t grid grid-cols-3 gap-4" style={{ borderColor: C.border }}>
                    <div>
                      <p className="font-mono text-[20px] font-bold" style={{ color: C.hsr }}>
                        {Math.round(saved / 60)}h {saved % 60}m
                      </p>
                      <p className="font-mono text-[10px]" style={{ color: C.muted }}>saved per trip (1920 → 2030)</p>
                    </div>
                    <div>
                      <p className="font-mono text-[20px] font-bold" style={{ color: C.future }}>
                        {(annualHoursSaved / 1000000).toFixed(1)}M
                      </p>
                      <p className="font-mono text-[10px]" style={{ color: C.muted }}>human-hours saved/year (est.)</p>
                    </div>
                    <div>
                      <p className="font-mono text-[20px] font-bold" style={{ color: selectedRoute.hsr2030 ? C.hsr : C.era2010 }}>
                        {selectedRoute.hsr2030 ? 'HSR' : 'Conv.'}
                      </p>
                      <p className="font-mono text-[10px]" style={{ color: C.muted }}>2030 technology</p>
                    </div>
                  </div>
                )
              })()}
              {selectedRoute.note && (
                <p className="font-mono text-[11px] mt-3 leading-[1.6]" style={{ color: C.muted }}>{selectedRoute.note}</p>
              )}
            </div>
          ) : (
            <p className="font-mono text-[12px]" style={{ color: C.muted }}>
              No direct route data for this pair. Try Tangier → Marrakech, Casablanca → Rabat, or Casa → Fes.
            </p>
          )}
        </div>
      </section>

      {/* ═══ ALL ROUTES COMPARISON ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={routesR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.rail }}>All Routes: Century of Compression</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Every route, sorted by time saved. HSR routes in red. Click to expand.
          </p>
          <div className="space-y-1">
            {[...ROUTES]
              .sort((a, b) => (b.times['1920'] - b.times['2030']) - (a.times['1920'] - a.times['2030']))
              .map((r, i) => {
                const cityFrom = CITIES.find(c => c.id === r.from)!
                const cityTo = CITIES.find(c => c.id === r.to)!
                const saved = r.times['1920'] - r.times['2030']
                const pctSaved = Math.round((saved / r.times['1920']) * 100)
                return (
                  <RouteRow key={`${r.from}-${r.to}`} route={r} cityFrom={cityFrom} cityTo={cityTo}
                    saved={saved} pctSaved={pctSaved} index={i} parentVis={routesR.vis} />
                )
              })}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={milesR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.future }}>Rail Timeline: 1916 → 2040</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            From colonial narrow gauge to Africa&apos;s longest high-speed network.
          </p>
          <div className="space-y-2">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="flex items-start gap-3 transition-all duration-500"
                style={{ opacity: milesR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                <span className="font-mono text-[13px] font-bold w-12 shrink-0"
                  style={{ color: m.year >= 2018 ? C.hsr : m.year >= 1963 ? C.era2010 : C.era1920 }}>{m.year}</span>
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ background: m.year >= 2018 ? C.hsr : m.year >= 1963 ? C.era2010 : C.era1920 }} />
                <div className="flex-1">
                  <p className="font-mono text-[11px]" style={{ color: C.text }}>{m.event}</p>
                </div>
                <span className="font-mono text-[10px] w-16 text-right shrink-0"
                  style={{ color: C.muted }}>{m.km.toLocaleString()} km</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.hsr }}>The Twin-City Effect</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Casablanca–Rabat at 25 minutes by HSR is commuter distance. Workers live in
                one city, work in the other. Real estate markets merge. This is not transport
                — it is urban planning by rail. The same effect will hit Marrakech when
                it becomes 70 minutes from Casablanca. Marrakech ceases to be &ldquo;the south&rdquo;
                and becomes a suburb.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.future }}>The World Cup Logic</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The 2030 World Cup demands that fans move between host cities within a day.
                Tangier to Marrakech in 2h40 makes this possible without flying. Morocco is
                building permanent infrastructure, not temporary stadiums. The HSR spine
                will outlast the tournament by decades — connecting the Atlantic axis
                that holds 70% of Morocco&apos;s population.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.era1920 }}>The East Remains Far</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Fes and Oujda are not on the HSR plan until after 2030. The eastern corridor
                — Fes–Taza–Oujda — remains conventional rail, 5+ hours. Morocco&apos;s shrinking
                is asymmetric: the Atlantic coast compresses while the interior and east
                stay far. The isochrone map reveals two Moroccos: one accelerating, one waiting.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#A0452E' }}>Rail Network</p>
        <HighSpeedHorizonMap />
      </div></section>

{/* CLOSING + SOURCES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            Distance is not measured in kilometres. It is measured in hours.
            When Tangier and Marrakech are 2 hours 40 minutes apart, they are
            closer than London and Edinburgh. Morocco is not extending a railway.
            It is redesigning the shape of a country — pulling its edges
            toward a centre that no longer needs to be geographic. The centre
            is wherever the train stops next.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: C.muted }}>
            Al Boraq specifications: ONCF, Wikipedia. HSR extension: Railway Gazette International
            (Apr 2024), construction launched Apr 2025 (Newsweek, Gadget.co.za). $5.3B cost: ONCF
            via Travelling for Business (May 2025). 168 trains: Railway Technology (Dec 2023).
            Historic travel times reconstructed from ONCF archives, colonial railway timetables
            (Compagnie des Chemins de Fer du Maroc), and modern ONCF schedules. 2030 projected
            times from ONCF announced targets. 2040 vision: ONCF Rail Strategy 2040, IEA-PVPS
            Morocco profile. Fes–Oujda conventional times from current ONCF schedules.
            Passenger estimates are editorial calculations based on ONCF ridership data
            (Al Boraq: ~3M passengers in first year, growing).
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.hsr }}>&copy; Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}

// ═══ ROUTE ROW ═══
function RouteRow({ route: r, cityFrom, cityTo, saved, pctSaved, index, parentVis }: {
  route: Route; cityFrom: City; cityTo: City; saved: number; pctSaved: number; index: number; parentVis: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const hrs = Math.floor(saved / 60)
  const mins = saved % 60
  return (
    <div className="transition-all duration-500" style={{ opacity: parentVis ? 1 : 0, transitionDelay: `${index * 40}ms` }}>
      <div className="flex items-center gap-3 cursor-pointer group py-1.5" onClick={() => setExpanded(!expanded)}>
        <span className="font-mono text-[11px] w-40 shrink-0 truncate group-hover:underline" style={{ color: C.ink }}>
          {cityFrom.name} → {cityTo.name}
        </span>
        <div className="flex-1 h-4 rounded-sm" style={{ background: `${C.border}20` }}>
          <div className="h-full rounded-sm transition-all duration-700 flex items-center"
            style={{
              width: parentVis ? `${pctSaved}%` : '0%',
              background: r.hsr2030 ? `${C.hsr}15` : `${C.era2010}10`,
              borderRight: `2px solid ${r.hsr2030 ? C.hsr : C.era2010}`,
              transitionDelay: `${index * 40}ms`,
            }} />
        </div>
        <span className="font-mono text-[11px] font-bold w-16 text-right shrink-0"
          style={{ color: r.hsr2030 ? C.hsr : C.era2010 }}>−{pctSaved}%</span>
        <span className="font-mono text-[10px] w-14 text-right shrink-0" style={{ color: C.muted }}>
          {hrs > 0 ? `${hrs}h${mins > 0 ? mins : ''}` : `${mins}m`} saved
        </span>
      </div>
      {expanded && (
        <div className="ml-40 pl-3 border-l-2 py-2 mb-2" style={{ borderColor: r.hsr2030 ? C.hsr : C.era2010 }}>
          <div className="flex gap-4">
            {ERAS.map(era => {
              const t = r.times[era]
              const h = Math.floor(t / 60)
              const m = t % 60
              return (
                <div key={era}>
                  <p className="font-mono text-[9px] uppercase" style={{ color: ERA_COLORS[era] }}>{era}</p>
                  <p className="font-mono text-[12px] font-bold" style={{ color: ERA_COLORS[era] }}>
                    {h > 0 ? `${h}h${m > 0 ? m : ''}` : `${m}m`}
                  </p>
                </div>
              )
            })}
            <div>
              <p className="font-mono text-[9px] uppercase" style={{ color: C.muted }}>Distance</p>
              <p className="font-mono text-[12px]" style={{ color: C.text }}>{r.dist} km</p>
            </div>
          </div>
          {r.note && <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{r.note}</p>}
        </div>
      )}
      {/* ── FOOTER ── */}
      <div style={{ backgroundColor: '#1f1f1f', padding: '32px 24px 16px', marginTop: 32 }}>
        <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
          &copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.
        </p>
        <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
          This visualization may not be reproduced without visible attribution.
        </p>
      </div>
    </div>
  )
}
