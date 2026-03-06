'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  saffron: '#C8A415', cumin: '#8B6914', cinnamon: '#7B3F00', pepper: '#2D2D2D',
  paprika: '#C54B3C', turmeric: '#D4A017', ginger: '#C9A84C', coriander: '#6B8E23',
  cloves: '#4A2C2A', nutmeg: '#8B7355', anise: '#7D8471', fenugreek: '#9B7B2C',
  caraway: '#5C4033', mint: '#2E8B57',
  local: '#2D6E4F', imported: '#722F37',
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
}

function useReveal(threshold = 0.12) {
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

interface Spice {
  name: string; darija: string; color: string; origin: string
  type: 'local' | 'imported'; volume: number
  priceOrigin: number; priceSouk: number; priceEurope: number
  season: string; hub: string; dishes: string[]; note: string
}

const SPICES: Spice[] = [
  { name: 'Saffron', darija: 'Zaâfrane', color: C.saffron, origin: 'Taliouine, Anti-Atlas', type: 'local', volume: 7, priceOrigin: 2000, priceSouk: 3000, priceEurope: 5000, season: 'Oct–Nov', hub: 'Taliouine → Marrakech', dishes: ['Tagine', 'Rfissa', 'Seffa', 'Fassi mint tea'], note: '200,000 flowers = 1 kg. 90% from Taliouine. PDO protected.' },
  { name: 'Cumin', darija: 'Kamoun', color: C.cumin, origin: 'Alnif, Anti-Atlas + Meknes', type: 'local', volume: 8500, priceOrigin: 4, priceSouk: 8, priceEurope: 25, season: 'Apr–May', hub: 'Alnif → Meknes → Marrakech', dishes: ['Kefta', 'Harira', 'Grilled sardines', 'Couscous'], note: 'Most-used spice in Morocco. Hand-harvested by women in Alnif.' },
  { name: 'Paprika', darija: 'Felfla Hlouwa', color: C.paprika, origin: 'Tadla-Azilal + Marrakech-Safi', type: 'local', volume: 12000, priceOrigin: 3, priceSouk: 6, priceEurope: 18, season: 'Aug–Oct', hub: 'Béni Mellal → Marrakech', dishes: ['Chermoula', 'Tagine', 'Tomato salads', 'Mechoui rub'], note: 'Sweet variety (tahmira). No additives. Rich in Vitamin C.' },
  { name: 'Mint', darija: 'Naânaâ', color: C.mint, origin: 'Meknes (capital of mint)', type: 'local', volume: 15000, priceOrigin: 1, priceSouk: 2, priceEurope: 12, season: 'Mar–Nov', hub: 'Meknes → every city, daily', dishes: ['Atay (mint tea)', 'Salads', 'Garnish'], note: 'Not a spice — Morocco\'s most consumed aromatic. Daily ritual.' },
  { name: 'Black Pepper', darija: 'Elbezar', color: C.pepper, origin: 'Vietnam / India → Casablanca', type: 'imported', volume: 7000, priceOrigin: 5, priceSouk: 12, priceEurope: 30, season: 'Year-round', hub: 'Indian Ocean → Casablanca', dishes: ['Lamb tagine', 'Brochettes', 'Salads'], note: 'Indian Ocean trade since Phoenicians. White pepper also used.' },
  { name: 'Turmeric', darija: 'Quekoum', color: C.turmeric, origin: 'India → Casablanca port', type: 'imported', volume: 6000, priceOrigin: 2, priceSouk: 5, priceEurope: 20, season: 'Year-round', hub: 'India → Casablanca → Fes', dishes: ['Yellow tagine', 'Rice dishes', 'Preserved lemons'], note: 'Natural colouring. Often confused with saffron by tourists.' },
  { name: 'Coriander', darija: 'Kozbor', color: C.coriander, origin: 'Meknes-Fes + Gharb plains', type: 'local', volume: 5500, priceOrigin: 2, priceSouk: 4, priceEurope: 15, season: 'May–Jun', hub: 'Meknes → all cities', dishes: ['Chermoula', 'Lentil soup', 'Pastilla filling'], note: 'Seeds and fresh leaves both essential. Sweet, lemony.' },
  { name: 'Ginger', darija: 'Skinjbir', color: C.ginger, origin: 'Nigeria / India → Casablanca', type: 'imported', volume: 5000, priceOrigin: 3, priceSouk: 7, priceEurope: 22, season: 'Year-round', hub: 'West Africa/India → Casa', dishes: ['Tagine', 'Harira', 'Sellou', 'Tea blends'], note: 'Key to "yellow sauce" family with turmeric. Warming.' },
  { name: 'Cinnamon', darija: 'Karfa', color: C.cinnamon, origin: 'Sri Lanka / Indonesia → Casablanca', type: 'imported', volume: 4500, priceOrigin: 8, priceSouk: 15, priceEurope: 35, season: 'Year-round', hub: 'Indian Ocean → Casa → Fes', dishes: ['Pastilla', 'Lamb w/ prunes', 'Seffa'], note: 'Arab traders. True Ceylon vs cassia distinction matters.' },
  { name: 'Anise', darija: 'Nafaâ', color: C.anise, origin: 'Meknes-Fes region', type: 'local', volume: 2000, priceOrigin: 3, priceSouk: 6, priceEurope: 18, season: 'Jul–Aug', hub: 'Meknes → all cities', dishes: ['Bread', 'Tea', 'Chebakia'], note: 'Sweet, aromatic. Used in Ramadan pastries.' },
  { name: 'Caraway', darija: 'Karwiya', color: C.caraway, origin: 'Middle Atlas foothills', type: 'local', volume: 1800, priceOrigin: 4, priceSouk: 8, priceEurope: 22, season: 'Jun–Jul', hub: 'Azrou/Ifrane → Fes/Meknes', dishes: ['Khobz (bread)', 'Harira', 'Lentils'], note: 'Often confused with cumin. Essential in Fassi bread.' },
  { name: 'Fenugreek', darija: 'Helba', color: C.fenugreek, origin: 'Eastern Morocco + India', type: 'local', volume: 1500, priceOrigin: 3, priceSouk: 6, priceEurope: 16, season: 'Mar–Apr', hub: 'Oujda + Casa → all cities', dishes: ['Saharan tagines', 'Bread', 'Rfissa'], note: 'Stronger in southern/Saharan cooking. Warming, slightly bitter.' },
  { name: 'Cloves', darija: 'Qronfel', color: C.cloves, origin: 'Zanzibar / Madagascar → Casablanca', type: 'imported', volume: 800, priceOrigin: 12, priceSouk: 25, priceEurope: 45, season: 'Year-round', hub: 'East Africa → Casa → Fes', dishes: ['Ras el hanout', 'Mrouzia', 'Tea'], note: 'East African spice trade. Essential in ras el hanout.' },
  { name: 'Nutmeg', darija: 'Gouza', color: C.nutmeg, origin: 'Indonesia → Casablanca', type: 'imported', volume: 600, priceOrigin: 15, priceSouk: 30, priceEurope: 55, season: 'Year-round', hub: 'Indonesia → Casa → Fes', dishes: ['Ras el hanout', 'Pastilla', 'Sellou'], note: 'Banda Islands → Morocco via Arab maritime trade.' },
]

const RAS_EL_HANOUT = [
  { name: 'Cumin', pct: 12, color: C.cumin },
  { name: 'Coriander', pct: 10, color: C.coriander },
  { name: 'Turmeric', pct: 10, color: C.turmeric },
  { name: 'Paprika', pct: 10, color: C.paprika },
  { name: 'Black Pepper', pct: 8, color: C.pepper },
  { name: 'Ginger', pct: 8, color: C.ginger },
  { name: 'Cinnamon', pct: 8, color: C.cinnamon },
  { name: 'Nutmeg', pct: 5, color: C.nutmeg },
  { name: 'Cloves', pct: 5, color: C.cloves },
  { name: 'Cardamom', pct: 5, color: '#6B7D5C' },
  { name: 'Allspice', pct: 4, color: '#6B4226' },
  { name: 'Anise', pct: 4, color: C.anise },
  { name: 'Fenugreek', pct: 3, color: C.fenugreek },
  { name: 'Rose petals', pct: 3, color: '#C27D8E' },
  { name: 'Lavender', pct: 2, color: '#7B68AE' },
  { name: 'Long pepper', pct: 1.5, color: '#555' },
  { name: 'Mace', pct: 1.5, color: '#A0522D' },
]

// ═══ SPICE CARD ═══
function SpiceCard({ spice, index }: { spice: Spice; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const maxPrice = Math.max(spice.priceOrigin, spice.priceSouk, spice.priceEurope)
  const markup = (spice.priceEurope / spice.priceOrigin).toFixed(0)

  return (
    <div ref={ref}
      className="border rounded-sm overflow-hidden transition-all duration-500 cursor-pointer"
      style={{
        borderColor: expanded ? spice.color : C.border,
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(12px)',
        transitionDelay: `${index * 40}ms`,
      }}
      onClick={() => setExpanded(!expanded)}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-3 h-10 rounded-sm shrink-0" style={{ background: spice.color }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[13px] font-bold" style={{ color: C.ink }}>{spice.name}</span>
            <span className="font-mono text-[11px] font-semibold" style={{ color: spice.color }}>{markup}×</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[10px]" style={{ color: C.muted }}>{spice.darija}</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full"
              style={{ color: spice.type === 'local' ? C.local : C.imported, background: spice.type === 'local' ? `${C.local}08` : `${C.imported}08`, border: `1px solid ${spice.type === 'local' ? C.local : C.imported}20` }}>
              {spice.type === 'local' ? '● grown' : '○ imported'}
            </span>
          </div>
        </div>
      </div>

      {/* Price bars — always visible */}
      <div className="px-4 pb-3 space-y-1">
        {[
          { label: 'Origin', price: spice.priceOrigin, c: C.muted },
          { label: 'Souk', price: spice.priceSouk, c: spice.color },
          { label: 'Paris', price: spice.priceEurope, c: C.imported },
        ].map(stage => (
          <div key={stage.label} className="flex items-center gap-2">
            <span className="font-mono text-[9px] w-8 shrink-0" style={{ color: stage.c }}>{stage.label}</span>
            <div className="flex-1 h-3 rounded-sm" style={{ background: `${stage.c}06` }}>
              <div className="h-full rounded-sm transition-all duration-800"
                style={{
                  width: vis ? `${(stage.price / maxPrice) * 100}%` : '0%',
                  background: `${stage.c}18`,
                  borderRight: `2px solid ${stage.c}`,
                }} />
            </div>
            <span className="font-mono text-[10px] w-14 text-right font-semibold" style={{ color: stage.c }}>
              ${stage.price}/kg
            </span>
          </div>
        ))}
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t" style={{ borderColor: `${spice.color}20` }}>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Origin</p>
              <p className="font-mono text-[11px]" style={{ color: C.text }}>{spice.origin}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Route</p>
              <p className="font-mono text-[11px]" style={{ color: C.text }}>{spice.hub}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Season</p>
              <p className="font-mono text-[11px]" style={{ color: C.text }}>{spice.season}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Volume</p>
              <p className="font-mono text-[11px]" style={{ color: C.text }}>{spice.volume.toLocaleString()} tons/yr</p>
            </div>
          </div>
          <div className="mb-2">
            <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: C.muted }}>Dishes</p>
            <div className="flex flex-wrap gap-1">
              {spice.dishes.map(d => (
                <span key={d} className="font-mono text-[10px] px-2 py-0.5 rounded-full border"
                  style={{ borderColor: C.border, color: C.text }}>
                  {d}
                </span>
              ))}
            </div>
          </div>
          <p className="font-mono text-[10px] leading-[1.6]" style={{ color: C.muted }}>{spice.note}</p>
        </div>
      )}
    </div>
  )
}

// ═══ MAIN PAGE ═══

const SPICE_ROUTES_MAP_POINTS = [
  { name: 'Taliouine', lat: 30.5306, lng: -7.9236, detail: 'Saffron capital. 95% of Moroccan production.', color: '#C8A415' },
  { name: 'Souk el Attarine, Fez', lat: 34.0625, lng: -4.9733, detail: 'Oldest spice souk. Marinid era. Wholesale.', color: '#8B6914' },
  { name: 'Rahba Kedima, Marrakech', lat: 31.6310, lng: -7.9880, detail: 'Spice square. Ras el hanout capital.', color: '#C54B3C' },
  { name: 'Berkane / Oriental', lat: 34.9220, lng: -2.3194, detail: 'Cumin and fenugreek. Eastern plains.', color: '#6B8E23' },
  { name: 'Zanzibar', lat: -6.1659, lng: 39.2026, detail: 'Clove origin. East African trade route.', color: '#4A2C2A' },
  { name: 'Kerala', lat: 10.8505, lng: 76.2711, detail: 'Black pepper, cardamom. Indian Ocean trade.', color: '#2D2D2D' },
  { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718, detail: 'True cinnamon. Maritime silk road.', color: '#7B3F00' },
]
const MAPBOX_TOKEN_SPICE_ROUTES = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function SpiceroutesMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN_SPICE_ROUTES || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN_SPICE_ROUTES!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [30, 20], zoom: 2.5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        SPICE_ROUTES_MAP_POINTS.forEach(p => {
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

export function SpiceRoutesContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const rasR = useReveal()
  const [filter, setFilter] = useState<'all' | 'local' | 'imported'>('all')

  const filtered = filter === 'all' ? SPICES : SPICES.filter(s => s.type === filter)
  const localCount = SPICES.filter(s => s.type === 'local').length
  const importedCount = SPICES.filter(s => s.type === 'imported').length
  const totalVolume = SPICES.reduce((a, s) => a + s.volume, 0)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Cultural Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.visible ? 1 : 0, transform: heroR.visible ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Spice Routes</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)] transition-all duration-1000"
            style={{ color: C.muted, opacity: heroR.visible ? 1 : 0, transitionDelay: '200ms' }}>
            14 spices. 60,000 tons. Rivers of colour.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Every <span className="underline underline-offset-2">tagine</span> is a trade route. Cumin from Alnif, saffron from Taliouine,
          black pepper from Vietnam via the Indian Ocean, cinnamon from Sri Lanka
          via the same Arab maritime networks that brought it a thousand years ago.
          The <span className="underline underline-offset-2">souk</span> is where these routes converge — and where a $4/kg spice at origin
          becomes $25 in Paris. This is the supply chain behind every Moroccan meal.
        </p>

        {/* Numbers */}
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { value: '14', label: 'core spices', sub: 'mapped origin to plate' },
            { value: `${localCount}`, label: 'grown in Morocco', sub: `${importedCount} imported via Casablanca` },
            { value: `~${(totalVolume / 1000).toFixed(0)}K`, label: 'tons/year consumed', sub: 'estimated domestic market' },
            { value: '17', label: 'ras el hanout ingredients', sub: '"head of the shop" — the master blend' },
          ].map((n, i) => (
            <div key={n.label} className="transition-all duration-700"
              style={{ opacity: numsR.visible ? 1 : 0, transform: numsR.visible ? 'translateY(0)' : 'translateY(16px)', transitionDelay: `${i * 150}ms` }}>
              <p className="font-mono text-[28px] font-bold leading-none" style={{ color: C.cumin }}>{n.value}</p>
              <p className="font-mono text-[11px] font-semibold mt-1" style={{ color: C.ink }}>{n.label}</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 1: THE 14 SPICES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-baseline justify-between mb-4 flex-wrap gap-4">
            <div>
              <p className="micro-label mb-1" style={{ color: C.cumin }}>The 14 Spices</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>
                Click any card to expand. Price bars show origin → souk → Paris escalation. Markup shown at right.
              </p>
            </div>
            {/* Filter */}
            <div className="flex gap-2">
              {(['all', 'local', 'imported'] as const).map(f => (
                <button key={f}
                  className="font-mono text-[10px] px-3 py-1 rounded-full border transition-all"
                  style={{
                    borderColor: filter === f ? C.cumin : C.border,
                    color: filter === f ? C.cumin : C.muted,
                    background: filter === f ? `${C.cumin}06` : 'transparent',
                  }}
                  onClick={() => setFilter(f)}>
                  {f === 'all' ? `All (${SPICES.length})` : f === 'local' ? `Grown (${localCount})` : `Imported (${importedCount})`}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((spice, i) => (
              <SpiceCard key={spice.name} spice={spice} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: RAS EL HANOUT ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.cinnamon }}>Ras el Hanout</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            &ldquo;Head of the shop&rdquo; — the master blend. 17 ingredients. Every attar (spice merchant) has a different recipe.
          </p>
          <div ref={rasR.ref}>
            {/* Stacked bar */}
            <div className="flex h-10 rounded-sm overflow-hidden mb-4">
              {RAS_EL_HANOUT.map((r, i) => (
                <div key={r.name}
                  className="h-full transition-all duration-700 group relative"
                  style={{
                    width: rasR.visible ? `${r.pct}%` : '0%',
                    background: `${r.color}30`,
                    borderRight: i < RAS_EL_HANOUT.length - 1 ? '1px solid white' : 'none',
                    transitionDelay: `${i * 40}ms`,
                  }}>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                    style={{ background: r.color, color: 'white', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {r.name} {r.pct}%
                  </div>
                </div>
              ))}
            </div>
            {/* Legend grid */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {RAS_EL_HANOUT.map(r => (
                <span key={r.name} className="font-mono text-[10px] flex items-center gap-1" style={{ color: C.text }}>
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: r.color }} />
                  {r.name} <span style={{ color: C.muted }}>{r.pct}%</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: THE PRICE ESCALATION ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.imported }}>Price Escalation: Field → Souk → Paris</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Every spice gets more expensive the further it travels. Saffron: $2,000/kg at origin, $5,000 in Paris.
            Cumin: $4 at origin, $25 in Paris. The souk is the inflection point.
          </p>
          <div className="space-y-3">
            {[...SPICES].sort((a, b) => (b.priceEurope / b.priceOrigin) - (a.priceEurope / a.priceOrigin)).slice(0, 8).map((s, i) => {
              const markup = (s.priceEurope / s.priceOrigin)
              return (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="font-mono text-[11px] w-20 shrink-0 font-semibold" style={{ color: s.color }}>{s.name}</span>
                  <div className="flex-1 flex items-center gap-1">
                    <span className="font-mono text-[10px] text-right w-16 shrink-0" style={{ color: C.muted }}>${s.priceOrigin}</span>
                    <div className="flex-1 h-1 rounded-full relative" style={{ background: C.border }}>
                      <div className="absolute left-0 top-0 h-1 rounded-full" style={{ width: '33%', background: `${C.muted}30` }} />
                      <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border" style={{ left: '33%', background: 'white', borderColor: s.color }} />
                      <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ left: '100%', transform: 'translate(-50%, -50%)', background: s.color }} />
                    </div>
                    <span className="font-mono text-[10px] w-16 shrink-0 font-bold" style={{ color: s.color }}>${s.priceEurope}</span>
                  </div>
                  <span className="font-mono text-[12px] font-bold w-8 text-right" style={{ color: C.imported }}>{markup.toFixed(0)}×</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.local }}>The Local Eight</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Eight of fourteen core spices are grown in Morocco: cumin (Alnif),
                paprika (Béni Mellal), saffron (Taliouine), coriander (Meknes),
                anise, caraway, fenugreek, and mint. These represent the indigenous
                flavour base. Everything else arrives through Casablanca port.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.imported }}>The Indian Ocean Six</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Black pepper, turmeric, ginger, cinnamon, cloves, and nutmeg all
                arrive via trade routes that predate the nation. The same Arab
                maritime networks that brought cinnamon from Sri Lanka a thousand
                years ago still supply Casablanca today — only the ships changed.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.saffron }}>The Saffron Exception</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Saffron is the only spice where Morocco controls the entire chain
                from field to plate. Taliouine produces 90% of the kingdom&apos;s
                crop: 200,000 flowers hand-picked for one kilogram. It has PDO
                protection. The markup from Taliouine to Paris is 2.5×. For cumin,
                it is 6.3×. Scale matters.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Spice Origins — Mapped</p>
        <SpiceroutesMap />
      </div></section>

{/* CLOSING */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-4">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The tagine is an atlas. Cumin from the Anti-Atlas. Saffron from
            Taliouine. Cinnamon from Sri Lanka via a route older than the
            nation that eats it. Black pepper from Vietnam. Cloves from
            Zanzibar. The souk in Marrakech or Fes is where these routes
            converge, and where a woman&apos;s hand measures what a thousand
            years of maritime trade delivered. Every pinch is a map.
          </p>
        </div>
      </section>

      {/* SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Spice origins, trade routes, and culinary uses from field research, ONSSA (National
            Office of Food Safety) import records, and FAO agricultural trade data. Saffron:
            Taliouine cooperative data, PDO registry. Ras el hanout composition: composite from
            published recipes and attar interviews (Marrakech, Fes). Prices approximate based
            on 2024 souk surveys, European retail averages, and wholesale source-country data.
            Volumes estimated from domestic consumption models. Mint classified as aromatic herb,
            not spice, but included for cultural significance.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
              &copy; {new Date().getFullYear()} Slow Morocco
            </p>
            <p className="font-mono text-[11px]" style={{ color: C.local }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
