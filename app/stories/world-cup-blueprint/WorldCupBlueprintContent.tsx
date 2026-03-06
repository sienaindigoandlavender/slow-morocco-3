'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  rail: '#2D6E4F',
  port: '#2D3A6E',
  air: '#5B8BA0',
  stadium: '#C44536',
  highway: '#8B6914',
  tourism: '#C17F28',
  growth: '#4A7C59',
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ═══ INVESTMENT DATA ═══
const SECTORS = [
  { name: 'High-Speed Rail (LGV)', value: 9.6, color: C.rail, detail: '430 km Kénitra→Marrakech extension. 168 new trains. 350 km/h. Future: Agadir, Fez lines.' },
  { name: 'Ports', value: 7.5, color: C.port, detail: '27 port upgrades. Nador West Med mega-port. Tanger Med expansion to 9M TEU.' },
  { name: 'Airports', value: 2.8, color: C.air, detail: '38M → 80M passengers/year. Mohammed V new terminal. 7 airport upgrades.' },
  { name: 'Stadiums & Training', value: 2.5, color: C.stadium, detail: 'Grand Stade Hassan II (115K seats, $500M). 5 renovations. 60 training centres.' },
  { name: 'Highways', value: 1.3, color: C.highway, detail: 'Continental Rabat-Casa 60 km. Tit Mellil-Berrechid 30 km. Stadium access roads.' },
  { name: 'Tourism & Hotels', value: 1.0, color: C.tourism, detail: '+40,000 rooms (290K → 330K). RAM fleet 50 → 200+ aircraft.' },
  { name: 'Urban / Digital / Other', value: 16.5, color: C.muted, detail: 'Remaining budget across 35 cities. Smart infrastructure, urban transport, digital.' },
]
const TOTAL_INVESTMENT = SECTORS.reduce((a, s) => a + s.value, 0)

// ═══ TRAVEL TIME COMPRESSION ═══
const ROUTES = [
  { route: 'Tangier → Marrakech', before: 420, after: 160, saved: 62 },
  { route: 'Casablanca → Marrakech', before: 180, after: 75, saved: 58 },
  { route: 'Rabat → Marrakech', before: 240, after: 100, saved: 58 },
  { route: 'Marrakech → Agadir', before: 210, after: 90, saved: 57 },
  { route: 'Rabat → CMN Airport', before: 75, after: 35, saved: 53 },
  { route: 'Tangier → Rabat', before: 100, after: 60, saved: 40 },
  { route: 'Tangier → Casablanca', before: 130, after: 90, saved: 31 },
  { route: 'Casablanca → Rabat', before: 50, after: 40, saved: 20 },
]

function formatMins(m: number) {
  const h = Math.floor(m / 60)
  const min = m % 60
  return h > 0 ? `${h}h${min > 0 ? ` ${min}m` : ''}` : `${min}m`
}

// ═══ HOST CITY SPILLOVERS ═══
const HOST_CITIES = [
  { city: 'Casablanca', gdp2024: 38.5, gdp2030: 48.2, growth: 25, jobs: '65K', rooms: '+12K', spillover: ['Berrechid', 'Benslimane', 'Mohammedia', 'Settat'] },
  { city: 'Marrakech', gdp2024: 10.2, gdp2030: 14.8, growth: 45, jobs: '32K', rooms: '+10K', spillover: ['Essaouira', 'Ouarzazate', 'Beni Mellal', 'Safi'] },
  { city: 'Tangier', gdp2024: 12.8, gdp2030: 17.5, growth: 37, jobs: '28K', rooms: '+5K', spillover: ['Tétouan', 'Fnideq', 'Al Hoceïma', 'Chefchaouen'] },
  { city: 'Rabat', gdp2024: 22.4, gdp2030: 28.8, growth: 29, jobs: '35K', rooms: '+8K', spillover: ['Salé', 'Kénitra', 'Témara', 'Skhirat'] },
  { city: 'Agadir', gdp2024: 7.8, gdp2030: 11.2, growth: 44, jobs: '18K', rooms: '+6K', spillover: ['Tiznit', 'Taroudant', 'Inezgane', 'Guelmim'] },
  { city: 'Fes', gdp2024: 9.6, gdp2030: 12.8, growth: 33, jobs: '22K', rooms: '+4K', spillover: ['Meknès', 'Ifrane', 'Sefrou', 'Taza'] },
]

// ═══ ROUTE COMPRESSION BAR ═══
function RouteBar({ route, index }: { route: typeof ROUTES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const maxTime = 420
  const beforePct = (route.before / maxTime) * 100
  const afterPct = (route.after / maxTime) * 100

  return (
    <div ref={ref} className="py-4 border-b transition-all duration-500"
      style={{ borderColor: C.border, opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(10px)', transitionDelay: `${index * 60}ms` }}>
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-[13px] font-semibold" style={{ color: C.ink }}>{route.route}</span>
        <span className="font-mono text-[16px] font-bold" style={{ color: C.stadium }}>−{route.saved}%</span>
      </div>
      {/* Before bar */}
      <div className="flex items-center gap-3 mb-1.5">
        <span className="font-mono text-[11px] w-10 shrink-0" style={{ color: C.muted }}>Now</span>
        <div className="flex-1 h-4 rounded-sm overflow-hidden" style={{ background: `${C.muted}08` }}>
          <div className="h-full rounded-sm transition-all duration-1000 ease-out flex items-center justify-end px-2"
            style={{
              width: vis ? `${beforePct}%` : '0%',
              background: `${C.muted}12`,
              borderRight: `2px solid ${C.muted}`,
              transitionDelay: `${index * 60}ms`,
            }}>
            <span className="font-mono text-[10px] font-semibold" style={{ color: C.muted }}>{formatMins(route.before)}</span>
          </div>
        </div>
      </div>
      {/* After bar */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] w-10 shrink-0" style={{ color: C.rail }}>2029</span>
        <div className="flex-1 h-4 rounded-sm overflow-hidden" style={{ background: `${C.rail}06` }}>
          <div className="h-full rounded-sm transition-all duration-1200 ease-out flex items-center justify-end px-2"
            style={{
              width: vis ? `${afterPct}%` : '0%',
              background: `${C.rail}15`,
              borderRight: `2px solid ${C.rail}`,
              transitionDelay: `${index * 60 + 400}ms`,
            }}>
            <span className="font-mono text-[10px] font-semibold" style={{ color: C.rail }}>{formatMins(route.after)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══ CITY SPILLOVER CARD ═══
function CityCard({ city, index }: { city: typeof HOST_CITIES[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const maxGDP = 50
  const w2024 = (city.gdp2024 / maxGDP) * 100
  const w2030 = (city.gdp2030 / maxGDP) * 100

  return (
    <div ref={ref}
      className="border p-5 rounded-sm transition-all duration-500 cursor-default"
      style={{
        borderColor: hovered ? C.growth : C.border,
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(12px)',
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-[14px] font-bold tracking-wide" style={{ color: C.ink }}>
          {city.city.toUpperCase()}
        </span>
        <span className="font-mono text-[18px] font-bold" style={{ color: C.growth }}>+{city.growth}%</span>
      </div>
      {/* GDP bars */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] w-8 shrink-0" style={{ color: C.muted }}>2024</span>
          <div className="flex-1 h-3 rounded-sm" style={{ background: `${C.muted}08` }}>
            <div className="h-full rounded-sm transition-all duration-1000"
              style={{ width: vis ? `${w2024}%` : '0%', background: `${C.muted}18`, transitionDelay: `${index * 100}ms` }} />
          </div>
          <span className="font-mono text-[10px] w-12 text-right" style={{ color: C.muted }}>${city.gdp2024}B</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] w-8 shrink-0" style={{ color: C.growth }}>2030</span>
          <div className="flex-1 h-3 rounded-sm" style={{ background: `${C.growth}06` }}>
            <div className="h-full rounded-sm transition-all duration-1200"
              style={{ width: vis ? `${w2030}%` : '0%', background: `${C.growth}20`, transitionDelay: `${index * 100 + 300}ms` }} />
          </div>
          <span className="font-mono text-[10px] w-12 text-right font-semibold" style={{ color: C.growth }}>${city.gdp2030}B</span>
        </div>
      </div>
      {/* Stats */}
      <div className="flex gap-4 text-[11px] font-mono mb-2" style={{ color: C.text }}>
        <span>Jobs: <strong>{city.jobs}</strong></span>
        <span>Rooms: <strong>{city.rooms}</strong></span>
      </div>
      {/* Spillover cities */}
      {hovered && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {city.spillover.map(s => (
            <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded-full border"
              style={{ borderColor: C.growth, color: C.growth, background: `${C.growth}06` }}>
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ═══ MAIN COMPONENT ═══

const WORLD_CUP_BLUEPRINT_PTS = [
  { name: 'Grand Stade Casablanca', lat: 33.60, lng: -7.55, detail: '93,000 seats. Flagship. Under construction.', color: '#C17F28' },
  { name: 'Stade Moulay Abdallah', lat: 34.03, lng: -6.82, detail: 'Rabat. 52,000 seats. Renovation.', color: '#D4A373' },
  { name: 'Grand Stade Marrakech', lat: 31.67, lng: -8.05, detail: '45,240 seats. Existing. Upgrade planned.', color: '#D4A373' },
  { name: 'Stade de Fes', lat: 34.05, lng: -5.05, detail: '45,000 seats. New build.', color: '#C17F28' },
  { name: 'Ibn Batouta Tangier', lat: 35.72, lng: -5.88, detail: '45,000 seats. Existing. Upgrade.', color: '#D4A373' },
  { name: 'Grand Stade Agadir', lat: 30.38, lng: -9.55, detail: '45,480 seats. Existing. Upgrade.', color: '#D4A373' },
]
const MBT_WORLD_CUP_BLUEPRINT = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function WorldCupBlueprintMap() {
  const mc = useRef<HTMLDivElement>(null)
  const mr = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mc.current || !MBT_WORLD_CUP_BLUEPRINT || mr.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MBT_WORLD_CUP_BLUEPRINT!
      const map = new mapboxgl.Map({ container: mc.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6.5, 32.5], zoom: 5.2, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mr.current = map
      map.on('load', () => {
        WORLD_CUP_BLUEPRINT_PTS.forEach(p => {
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

export function WorldCupBlueprintContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const investR = useReveal()
  const afconR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 023 · Infrastructure Economics</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.visible ? 1 : 0, transform: heroR.visible ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Road to 2030</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)] transition-all duration-1000"
            style={{ color: C.muted, opacity: heroR.visible ? 1 : 0, transitionDelay: '200ms' }}>
            The World Cup Blueprint
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Morocco approved MAD 380 billion ($41 billion) for <span className="underline underline-offset-2">World Cup 2030</span>
          infrastructure — not for 30 days of football, but for 50 years of
          skeleton. <span className="underline underline-offset-2">High-speed rail</span> stitching five cities into one corridor.
          Airport capacity doubled. A stadium seating 115,000 people. And in
          the secondary cities that will never appear in a FIFA broadcast —
          new roads, new hotels, new reasons to stay.
        </p>

        {/* Live countdown */}
        {(() => {
          const kickoff = new Date('2030-06-13T17:00:00Z')
          const now = new Date()
          const diff = kickoff.getTime() - now.getTime()
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const months = Math.floor(days / 30.44)
          const pctComplete = Math.min(100, Math.max(0, ((new Date('2026-01-01').getTime() - new Date('2023-01-01').getTime()) / (kickoff.getTime() - new Date('2023-01-01').getTime())) * 100))
          const timelinePct = Math.min(100, Math.max(0, ((now.getTime() - new Date('2023-01-01').getTime()) / (kickoff.getTime() - new Date('2023-01-01').getTime())) * 100))
          return diff > 0 ? (
            <div className="mt-8 p-4" style={{ background: `${C.rail}06`, borderLeft: `3px solid ${C.rail}` }}>
              <div className="flex items-center gap-3">
                <span className="inline-block w-[8px] h-[8px] rounded-full animate-pulse shrink-0" style={{ background: C.rail }} />
                <span className="font-mono text-[22px] font-bold" style={{ color: C.rail }}>{days.toLocaleString()}</span>
                <span className="font-mono text-[11px]" style={{ color: C.muted }}>days to kickoff · {months} months</span>
              </div>
              {/* Timeline bar */}
              <div className="mt-3 h-[6px] rounded-full overflow-hidden" style={{ background: `${C.rail}15` }}>
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${timelinePct}%`, background: C.rail }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[9px]" style={{ color: C.muted }}>Bid won (2023)</span>
                <span className="font-mono text-[9px] font-semibold" style={{ color: C.rail }}>{timelinePct.toFixed(0)}% of timeline elapsed</span>
                <span className="font-mono text-[9px]" style={{ color: C.muted }}>Kickoff (Jun 2030)</span>
              </div>
            </div>
          ) : null
        })()}

        {/* Numbers */}
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { value: '$41B', label: 'total investment', sub: 'MAD 380B approved 2026' },
            { value: '200K+', label: 'jobs created', sub: 'direct and indirect' },
            { value: '26M', label: 'tourist target', sub: 'by 2030 (from 17.4M)' },
            { value: '115K', label: 'stadium seats', sub: 'Grand Stade Hassan II' },
          ].map((n, i) => (
            <div key={n.label} className="transition-all duration-700"
              style={{ opacity: numsR.visible ? 1 : 0, transform: numsR.visible ? 'translateY(0)' : 'translateY(16px)', transitionDelay: `${i * 150}ms` }}>
              <p className="font-mono text-[28px] font-bold leading-none" style={{ color: C.rail }}>{n.value}</p>
              <p className="font-mono text-[11px] font-semibold mt-1" style={{ color: C.ink }}>{n.label}</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 1: THE $41B ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.rail }}>The $41 Billion</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Where the money goes. 7 sectors. Bar width = share of total investment.
          </p>
          <div ref={investR.ref} className="space-y-4">
            {SECTORS.map((sector, i) => {
              const pct = (sector.value / TOTAL_INVESTMENT) * 100
              return (
                <div key={sector.name} className="group transition-all duration-500"
                  style={{ opacity: investR.visible ? 1 : 0, transform: investR.visible ? 'translateX(0)' : 'translateX(-16px)', transitionDelay: `${i * 80}ms` }}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-mono text-[12px] font-semibold" style={{ color: sector.color }}>{sector.name}</span>
                    <span className="font-mono text-[14px] font-bold" style={{ color: sector.color }}>${sector.value}B</span>
                  </div>
                  <div className="h-6 rounded-sm overflow-hidden" style={{ background: `${sector.color}06` }}>
                    <div className="h-full rounded-sm transition-all duration-1200 ease-out"
                      style={{
                        width: investR.visible ? `${pct}%` : '0%',
                        background: `${sector.color}15`,
                        borderRight: `2px solid ${sector.color}`,
                        transitionDelay: `${i * 80}ms`,
                      }} />
                  </div>
                  <p className="font-mono text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: C.muted }}>
                    {sector.detail}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: THE SHRINKING COUNTRY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-baseline justify-between mb-1 flex-wrap gap-4">
            <div>
              <p className="micro-label mb-1" style={{ color: C.rail }}>The Shrinking Country</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>
                LGV travel time compression. 8 routes. Before vs after 2029. The country gets smaller.
              </p>
            </div>
            <p className="font-mono text-[11px]" style={{ color: C.rail }}>
              Kénitra → Marrakech extension · 350 km/h · completion 2029
            </p>
          </div>
          {ROUTES.map((route, i) => (
            <RouteBar key={route.route} route={route} index={i} />
          ))}
          <div className="mt-6 p-4 rounded-sm" style={{ background: `${C.rail}04` }}>
            <p className="font-mono text-[12px] leading-[1.7]" style={{ color: C.text }}>
              The LGV merges Marrakech, Casablanca, Rabat, and Tangier into one commutable
              corridor. A businessperson in Rabat can have lunch in Marrakech and be home for
              dinner. That is not just faster travel — it is a different country.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: THE SPILLOVER ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.growth }}>The Spillover Effect</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            6 host cities. Regional GDP 2024 vs projected 2030. Hover for spillover cities that benefit without hosting.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOST_CITIES.map((city, i) => (
              <CityCard key={city.city} city={city} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: THE AFCON PROOF ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.stadium }}>The AFCON Proof of Concept</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            2025 Africa Cup of Nations — the dress rehearsal. Results:
          </p>
          <div ref={afconR.ref} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { v: '€2.3B', l: 'invested in infrastructure' },
              { v: '€1.5B', l: 'direct revenue recovered' },
              { v: '9', l: 'stadiums built/rehabilitated in 24 months' },
              { v: '100K+', l: 'jobs created' },
              { v: '3,000+', l: 'companies participated' },
              { v: '80%', l: 'of WC sports costs now funded' },
            ].map((n, i) => (
              <div key={n.l} className="transition-all duration-700"
                style={{ opacity: afconR.visible ? 1 : 0, transform: afconR.visible ? 'translateY(0)' : 'translateY(12px)', transitionDelay: `${i * 100}ms` }}>
                <p className="font-mono text-[22px] font-bold" style={{ color: C.stadium }}>{n.v}</p>
                <p className="font-mono text-[11px]" style={{ color: C.text }}>{n.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 border-l-2" style={{ borderColor: C.stadium }}>
            <p className="font-serif italic text-[14px] leading-[1.6]" style={{ color: C.text }}>
              &ldquo;We gained a decade of development in 24 months and provided the kingdom
              with infrastructure that will serve citizens for the next 50 years.&rdquo;
            </p>
            <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>
              — Ryad Mezzour, Minister of Industry and Commerce
            </p>
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.rail }}>The Shrinking Country</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The LGV merges Marrakech–Rabat–Casablanca into one commutable corridor.
                Tangier to Marrakech drops from 7 hours to 2 hours 40 minutes. This is
                not incremental improvement — it is a structural reorganisation of
                geography. The economic literature calls it &ldquo;effective distance
                collapse.&rdquo;
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.growth }}>The Spillover Geometry</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Secondary cities benefit without hosting matches — but only if
                infrastructure serves the country, not just the tournament. South
                Africa 2010 and Brazil 2014 are cautionary tales of white elephants.
                Morocco&apos;s advantage: the LGV and port investments have utility
                beyond football.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.stadium }}>The AFCON Test</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The 2025 AFCON was a proof of concept that already recovered 80% of
                World Cup sports infrastructure costs. Nine stadiums in 24 months.
                The remaining 20% is the LGV extension, hotels, and the Grand Stadium
                — infrastructure that serves the country for 50 years, not 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-4">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            Forty-one billion dollars is an abstraction. Here is what it looks like
            on the ground: a 430-kilometre high-speed rail line stitching five cities
            into one corridor. Eighty million airport passengers where there were
            thirty-eight million. Twenty-six million tourists where there were
            seventeen million. Two hundred thousand jobs that did not exist. And in
            the secondary cities — the Berrechids and Tiznits and Sefrous that will
            never appear in a FIFA broadcast — new roads, new hotels, new reasons
            to stay. The World Cup lasts 30 days. The skeleton lasts 50 years.
          </p>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#C17F28' }}>Stadium Infrastructure</p>
        <WorldCupBlueprintMap />
      </div></section>

{/* SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            MAD 380B ($41B) budget: AGBI (Oct 2025). Sector breakdown: WeeTracker (Oct 2025).
            LGV travel times: Morocco World News (Dec 2024, Apr 2025). AFCON economics:
            Morocco World News (Jan 2026), Mezzour quote. GDP projections: HCP regional
            accounts 2023–2024 with Atlas Capital growth modelling. Tourism target: MIPA
            Institute. Grand Stade: $500M, 115K capacity (FIFA/Moroccan bid committee).
            All figures approximate; government budgets shift between announcement and execution.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
              &copy; {new Date().getFullYear()} Slow Morocco
            </p>
            <p className="font-mono text-[11px]" style={{ color: C.growth }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
