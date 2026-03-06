'use client'

import { useState, useEffect, useRef } from 'react'

// ═══ IBA SITES — NORTH AFRICA ═══
// Coordinates from BirdLife DataZone, FAO GIEWS, eBird hotspots

interface IBASite {
  name: string; country: string; lat: number; lng: number
  type: 'wetland' | 'coastal' | 'mountain' | 'desert' | 'steppe' | 'forest'
  species: string; significance: string; ibaCode?: string
  threatened?: string
}

const IBA_SITES: IBASite[] = [
  // ═══ MOROCCO ═══
  { name: 'Merja Zerga', country: 'Morocco', lat: 34.87, lng: -6.27, type: 'wetland', species: 'Flamingos, Spoonbills, Marbled Duck', significance: 'Ramsar site. 50,000+ wintering waterbirds. Last site of Slender-billed Curlew sightings.', threatened: 'Slender-billed Curlew (CR)' },
  { name: 'Souss-Massa NP', country: 'Morocco', lat: 30.07, lng: -9.63, type: 'coastal', species: 'Northern Bald Ibis, Audouin\'s Gull, Moussier\'s Redstart', significance: 'Last stronghold of Northern Bald Ibis. ~700 birds, only viable wild population on Earth.', threatened: 'Northern Bald Ibis (EN)' },
  { name: 'Strait of Gibraltar (Tangier)', country: 'Morocco', lat: 35.78, lng: -5.80, type: 'coastal', species: 'Black Kite, White Stork, Honey Buzzard, Booted Eagle', significance: '300,000+ raptors and 150,000+ storks cross annually. Top 5 global raptor migration bottleneck.' },
  { name: 'Lac de Sidi Bourhaba', country: 'Morocco', lat: 34.23, lng: -6.65, type: 'wetland', species: 'Crested Coot, Marbled Duck, White-headed Duck', significance: 'Ramsar site. Critical breeding site for globally threatened duck species.', threatened: 'White-headed Duck (EN)' },
  { name: 'Tamri Estuary', country: 'Morocco', lat: 30.72, lng: -9.83, type: 'coastal', species: 'Northern Bald Ibis, Lesser Crested Tern', significance: 'Second colony of Northern Bald Ibis. Coastal cliff nesting site.' },
  { name: 'Middle Atlas Forests', country: 'Morocco', lat: 33.40, lng: -5.15, type: 'forest', species: 'Levaillant\'s Woodpecker, Atlas Flycatcher, Barbary Macaque', significance: 'Cedar forests. Maghreb endemic bird hotspot. Barbary Macaque habitat.' },
  { name: 'Oualidia Lagoon', country: 'Morocco', lat: 32.73, lng: -9.03, type: 'wetland', species: 'Greater Flamingo, Grebes, Herons', significance: 'Coastal lagoon. Major wintering site for waterbirds along Atlantic flyway.' },
  { name: 'Merzouga / Erg Chebbi', country: 'Morocco', lat: 31.10, lng: -3.97, type: 'desert', species: 'Desert Sparrow, Egyptian Nightjar, Houbara Bustard', significance: 'Saharan IBA. Desert specialists. Houbara Bustard conservation zone.', threatened: 'Houbara Bustard (VU)' },
  { name: 'Oued Massa', country: 'Morocco', lat: 29.98, lng: -9.65, type: 'wetland', species: 'Glossy Ibis, Marbled Duck, Flamingos', significance: 'Only Moroccan breeding site for Glossy Ibis (12-14 pairs). Ramsar site.' },
  { name: 'High Atlas (Toubkal)', country: 'Morocco', lat: 31.06, lng: -7.92, type: 'mountain', species: 'Crimson-winged Finch, Alpine Chough, Bearded Vulture', significance: 'Alpine zone. One of last Bearded Vulture sites in North Africa.', threatened: 'Bearded Vulture (regional CR)' },
  { name: 'Dayet Aoua', country: 'Morocco', lat: 33.44, lng: -5.05, type: 'wetland', species: 'Crested Coot, Ferruginous Duck, Purple Swamphen', significance: 'Middle Atlas lake. Key breeding wetland for rare waterbirds.' },
  { name: 'Khnifiss Lagoon', country: 'Morocco', lat: 28.03, lng: -12.26, type: 'coastal', species: 'Flamingos, Spoonbills, Waders', significance: 'Largest lagoon in southern Morocco. Atlantic Saharan coast. Ramsar site.' },

  // ═══ ALGERIA ═══
  { name: 'El Kala Complex', country: 'Algeria', lat: 36.77, lng: 8.44, type: 'wetland', species: 'White-headed Duck, Ferruginous Duck, Purple Swamphen', significance: 'Biosphere Reserve. Largest wetland complex in North Africa. 3 Ramsar lakes.', threatened: 'White-headed Duck (EN)' },
  { name: 'Djurdjura NP', country: 'Algeria', lat: 36.45, lng: 4.12, type: 'mountain', species: 'Algerian Nuthatch, Lammergeier, Atlas Horned Lark', significance: 'Only site on Earth for Algerian Nuthatch — Algeria\'s only true endemic bird.', threatened: 'Algerian Nuthatch (EN)' },
  { name: 'Guerbes-Sanhadja', country: 'Algeria', lat: 36.85, lng: 7.30, type: 'wetland', species: 'Marbled Duck, Purple Swamphen, Glossy Ibis', significance: 'Ramsar site. Major North African wetland for breeding waterbirds.' },
  { name: 'Chott Ech Chergui', country: 'Algeria', lat: 34.05, lng: 0.50, type: 'steppe', species: 'Houbara Bustard, Cream-coloured Courser, Lanner Falcon', significance: 'Vast steppe salt lake. Important Houbara Bustard habitat.', threatened: 'Houbara Bustard (VU)' },
  { name: 'Tassili n\'Ajjer', country: 'Algeria', lat: 25.50, lng: 9.00, type: 'desert', species: 'Pharaoh Eagle-Owl, Desert Sparrow, Tristram\'s Warbler', significance: 'UNESCO World Heritage. Saharan rock art and desert bird community.' },
  { name: 'Lac des Oiseaux', country: 'Algeria', lat: 36.78, lng: 8.11, type: 'wetland', species: 'White Stork, Glossy Ibis, Night Heron', significance: 'Ramsar site. Freshwater lake. Important stopover on migration route.' },

  // ═══ TUNISIA ═══
  { name: 'Ichkeul NP', country: 'Tunisia', lat: 37.16, lng: 9.67, type: 'wetland', species: 'Greylag Goose, Wigeon, Pochard, White-headed Duck', significance: 'UNESCO World Heritage. 200,000+ wintering waterbirds. Last North African lake for Greylag Goose.', threatened: 'White-headed Duck (EN)' },
  { name: 'Cap Bon Peninsula', country: 'Tunisia', lat: 36.83, lng: 11.05, type: 'coastal', species: 'Raptors, Storks, Passerines', significance: 'Second major Mediterranean crossing point. Spring migration bottleneck — 30,000+ raptors.' },
  { name: 'Chott el Djerid', country: 'Tunisia', lat: 33.75, lng: 8.30, type: 'desert', species: 'Greater Flamingo, Desert Wheatear, Hoopoe Lark', significance: 'Largest salt lake in Sahara. Seasonal flamingo gatherings. Desert edge habitat.' },
  { name: 'Kneiss Islands', country: 'Tunisia', lat: 34.30, lng: 10.29, type: 'coastal', species: 'Sandwich Tern, Audouin\'s Gull, Slender-billed Gull', significance: 'Major seabird colony in Gulf of Gabes. Important winter wader site.' },
  { name: 'Lake Tunis', country: 'Tunisia', lat: 36.80, lng: 10.22, type: 'wetland', species: 'Flamingos, Avocet, Black-winged Stilt', significance: 'Urban wetland. Surprising biodiversity within capital city.' },

  // ═══ LIBYA ═══
  { name: 'Ain al-Ghazala', country: 'Libya', lat: 32.18, lng: 23.60, type: 'steppe', species: 'Eurasian Dotterel, Desert Wheatear, Cream-coloured Courser', significance: 'Wintering site for Eurasian Dotterel (geolocator-confirmed). Steppe habitat.' },
  { name: 'Tripoli Coast', country: 'Libya', lat: 32.90, lng: 13.18, type: 'coastal', species: 'Audouin\'s Gull, Yelkouan Shearwater', significance: 'Coastal migration corridor. Under-surveyed but likely significant.' },

  // ═══ MAURITANIA ═══
  { name: 'Banc d\'Arguin NP', country: 'Mauritania', lat: 19.88, lng: -16.25, type: 'coastal', species: 'Waders (2.3M), White Pelican, Flamingos, Spoonbills', significance: 'UNESCO World Heritage. 2.3 million waders winter here — largest concentration in Africa. Vital East Atlantic Flyway terminus.', threatened: 'Eurasian Spoonbill (flyway pop.)' },
]

// ═══ FLYWAY ROUTES ═══

interface Flyway {
  name: string; color: string; description: string
  species: string; timing: string; numbers: string
  coords: [number, number][] // [lng, lat]
}

const FLYWAYS: Flyway[] = [
  {
    name: 'Western Flyway (Strait of Gibraltar)',
    color: '#C17F28', description: 'The 14km gap. 300,000 raptors and 150,000 storks funnel through the narrowest crossing between Europe and Africa every autumn.',
    species: 'Black Kite, White Stork, Honey Buzzard, Short-toed Eagle, Booted Eagle',
    timing: 'Aug–Oct (south) · Mar–May (north)', numbers: '450,000+ birds/season',
    coords: [[-5.6, 43.0], [-5.5, 40.5], [-5.7, 37.0], [-5.8, 35.9], [-5.8, 35.0], [-6.0, 34.0], [-6.5, 32.0], [-7.5, 29.0], [-9.0, 26.0], [-12.0, 22.0], [-16.0, 20.0], [-16.3, 14.5]]
  },
  {
    name: 'East Atlantic Flyway (Atlantic coast)',
    color: '#2D6E4F', description: 'Waders and shorebirds follow the Atlantic coast from Scandinavia to West Africa. The Banc d\'Arguin in Mauritania is the terminus — 2.3 million waders winter there.',
    species: 'Bar-tailed Godwit, Dunlin, Knot, Sanderling, Ringed Plover',
    timing: 'Jul–Nov (south) · Mar–May (north)', numbers: '2.3 million waders at Banc d\'Arguin',
    coords: [[-3.0, 58.0], [-5.0, 52.0], [-5.5, 48.0], [-8.0, 44.0], [-9.5, 39.0], [-9.5, 36.0], [-9.7, 33.5], [-9.8, 30.5], [-10.5, 27.0], [-13.0, 23.0], [-16.0, 20.0]]
  },
  {
    name: 'Central Mediterranean Flyway (Cap Bon)',
    color: '#722F37', description: 'Birds crossing via the Sicily Channel and Cap Bon peninsula in Tunisia. The second major Mediterranean bottleneck after Gibraltar.',
    species: 'Marsh Harrier, Montagu\'s Harrier, Lesser Kestrel, Bee-eater',
    timing: 'Sep–Oct (south) · Apr–May (north)', numbers: '30,000+ raptors at Cap Bon',
    coords: [[12.0, 45.0], [12.5, 42.0], [13.0, 39.0], [12.5, 37.5], [11.5, 37.0], [11.0, 36.8], [10.0, 35.5], [9.5, 34.0], [8.0, 32.0], [6.0, 30.0], [4.0, 28.0], [2.0, 25.0]]
  },
]

// ═══ MIGRATION SEASON INDICATOR ═══

function getMigrationSeason(): { season: string; direction: string; activity: string; color: string } {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return { season: 'Spring', direction: 'Northbound', activity: 'Birds returning to European breeding grounds. Peak raptor passage at Gibraltar in March.', color: '#2D6E4F' }
  if (month >= 7 && month <= 9) return { season: 'Autumn', direction: 'Southbound', activity: 'Mass migration south. 300,000+ raptors at Gibraltar Aug–Oct. Waders arriving at Banc d\'Arguin.', color: '#C17F28' }
  if (month >= 10 || month <= 1) return { season: 'Winter', direction: 'Overwintering', activity: 'North African wetlands hosting millions of European waterbirds. Peak counts at Ichkeul and Merja Zerga.', color: '#2D3A6E' }
  return { season: 'Summer', direction: 'Breeding', activity: 'Birds on European breeding grounds. Resident species nesting in Morocco. Northern Bald Ibis breeding at Souss-Massa.', color: '#8B3A3A' }
}

const TYPE_COLORS: Record<string, string> = {
  wetland: '#2D6E4F', coastal: '#3B82B0', mountain: '#5D3A5E',
  desert: '#C17F28', steppe: '#A0522D', forest: '#5C6B3C',
}

const TYPE_LABELS: Record<string, string> = {
  wetland: 'Wetland', coastal: 'Coastal', mountain: 'Mountain',
  desert: 'Desert', steppe: 'Steppe', forest: 'Forest',
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

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

function BirdMap({ sites, flyways, selected, onSelect, activeFilter }: {
  sites: IBASite[]; flyways: Flyway[]; selected: IBASite | null
  onSelect: (s: IBASite | null) => void; activeFilter: string | null
}) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [showFlyways, setShowFlyways] = useState(true)

  // Init map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    let cancelled = false
    import('mapbox-gl').then((mapboxgl) => {
      if (cancelled || !mapContainer.current) return
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'; document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [-2.0, 32.0], zoom: 4.3, minZoom: 3, maxZoom: 12,
        attributionControl: false, pitchWithRotate: false, dragRotate: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        // Add flyway lines
        flyways.forEach((fw, i) => {
          map.addSource(`flyway-${i}`, {
            type: 'geojson',
            data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: fw.coords } }
          })
          map.addLayer({
            id: `flyway-line-${i}`, type: 'line', source: `flyway-${i}`,
            paint: { 'line-color': fw.color, 'line-width': 3, 'line-opacity': 0.5, 'line-dasharray': [2, 2] }
          })
          // Arrow dots along route
          const arrowCoords = fw.coords.filter((_, j) => j % 2 === 0 && j > 0)
          map.addSource(`flyway-arrows-${i}`, {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: arrowCoords.map(c => ({ type: 'Feature' as const, properties: {}, geometry: { type: 'Point' as const, coordinates: c } })) }
          })
          map.addLayer({
            id: `flyway-dots-${i}`, type: 'circle', source: `flyway-arrows-${i}`,
            paint: { 'circle-radius': 3, 'circle-color': fw.color, 'circle-opacity': 0.6 }
          })
        })
        mapRef.current = map; setMapLoaded(true)
      })
    })
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggle flyway visibility
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    flyways.forEach((_, i) => {
      try {
        mapRef.current.setLayoutProperty(`flyway-line-${i}`, 'visibility', showFlyways ? 'visible' : 'none')
        mapRef.current.setLayoutProperty(`flyway-dots-${i}`, 'visibility', showFlyways ? 'visible' : 'none')
      } catch {}
    })
  }, [showFlyways, mapLoaded, flyways])

  // Render site markers
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    markersRef.current.forEach(m => m.remove()); markersRef.current = []
    import('mapbox-gl').then((mapboxgl) => {
      const filtered = activeFilter ? sites.filter(s => s.type === activeFilter) : sites
      filtered.forEach(site => {
        const isSel = selected?.name === site.name
        const color = TYPE_COLORS[site.type]
        const size = isSel ? 14 : site.threatened ? 10 : 8
        const el = document.createElement('div')
        el.style.cssText = `width:${size}px;height:${size}px;background:${color};border:2px solid #fff;border-radius:50%;cursor:pointer;transition:all 0.2s;box-shadow:${isSel ? `0 0 0 3px ${color}40` : '0 1px 3px rgba(0,0,0,0.3)'}`
        el.title = site.name
        el.addEventListener('click', (e) => { e.stopPropagation(); onSelect(isSel ? null : site) })
        if (isSel) {
          const label = document.createElement('div')
          label.style.cssText = `position:absolute;left:${size+4}px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:11px;font-weight:700;font-family:Inter,system-ui,sans-serif;color:#0a0a0a;text-shadow:0 0 4px #fff,0 0 4px #fff`
          label.textContent = site.name
          const w = document.createElement('div'); w.style.position = 'relative'; w.appendChild(el); w.appendChild(label)
          markersRef.current.push(new mapboxgl.default.Marker({ element: w, anchor: 'center' }).setLngLat([site.lng, site.lat]).addTo(mapRef.current!))
        } else {
          markersRef.current.push(new mapboxgl.default.Marker({ element: el, anchor: 'center' }).setLngLat([site.lng, site.lat]).addTo(mapRef.current!))
        }
      })
    })
  }, [mapLoaded, sites, selected, onSelect, activeFilter])

  // Fly to selected
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !selected) return
    mapRef.current.flyTo({ center: [selected.lng, selected.lat], zoom: 8, duration: 1000 })
  }, [selected, mapLoaded])

  return (
    <div className="relative w-full">
      <div ref={mapContainer} className="w-full h-[500px] md:h-[600px]" style={{ background: '#f2f0eb' }} />
      {mapLoaded && (
        <button onClick={() => setShowFlyways(!showFlyways)}
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.08em] transition-all"
          style={{ background: showFlyways ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.95)', color: showFlyways ? '#fff' : '#0a0a0a', backdropFilter: 'blur(8px)', border: `1px solid ${showFlyways ? 'rgba(255,255,255,0.2)' : '#e5e5e5'}` }}>
          {showFlyways ? '🦅 Hide Flyways' : '🦅 Show Flyways'}
        </button>
      )}
      {selected && mapLoaded && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-[360px] p-5" style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)', border: '1px solid #e5e5e5' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-[8px] h-[8px] rounded-full" style={{ background: TYPE_COLORS[selected.type] }} />
                <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: TYPE_COLORS[selected.type] }}>{TYPE_LABELS[selected.type]} · {selected.country}</span>
              </div>
              <p className="font-serif text-[18px] text-[#0a0a0a]">{selected.name}</p>
            </div>
            <button onClick={() => onSelect(null)} className="text-[#737373] hover:text-[#0a0a0a] text-[16px] ml-4">×</button>
          </div>
          <p className="text-[12px] text-[#525252] mt-2 leading-relaxed">{selected.significance}</p>
          <p className="text-[11px] text-[#737373] mt-2">{selected.species}</p>
          {selected.threatened && <p className="text-[11px] mt-2 font-medium" style={{ color: '#8B3A3A' }}>⚠ {selected.threatened}</p>}
        </div>
      )}
      {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center bg-[#f2f0eb]"><p className="text-[13px] text-[#737373] uppercase tracking-[0.08em]">Loading map...</p></div>}
    </div>
  )
}

// ═══ PAGE ═══

export function BirdAtlasContent() {
  const [selected, setSelected] = useState<IBASite | null>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const migration = getMigrationSeason()

  const hero = useReveal(); const flySection = useReveal(); const sitesSection = useReveal(); const notes = useReveal()

  const countries = ['Morocco', 'Algeria', 'Tunisia', 'Libya', 'Mauritania']
  const countryCount = (c: string) => IBA_SITES.filter(s => s.country === c).length
  const threatenedSites = IBA_SITES.filter(s => s.threatened)

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#ffffff' }}>

      <div ref={hero.ref}><section className="px-8 md:px-[8%] lg:px-[12%] pt-section pb-16">
        <p className="micro-label mb-4" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.6s' }}>Module 057 · Living Data</p>
        <h1 className="font-serif text-[clamp(2.8rem,7vw,4.5rem)] text-dwl-black leading-[0.95]" style={{ opacity: hero.vis ? 1 : 0, transform: hero.vis ? 'none' : 'translateY(20px)', transition: 'all 0.8s' }}>
          The Bird <em>Atlas</em>
        </h1>
        <p className="text-body text-dwl-body mt-6 max-w-[640px]" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.8s 0.2s' }}>
          North Africa sits at the crossroads of three migration superhighways. Every autumn, 450,000 raptors
          and storks funnel through the Strait of Gibraltar — a 14km gap between continents. Every winter,
          2.3 million waders pack the Mauritanian coast. This map tracks the flyways, the preservation areas,
          and the threatened species that depend on them.
        </p>

        {/* Migration season indicator */}
        <div className="mt-8 flex items-center gap-3" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.8s 0.4s' }}>
          <span className="inline-block w-[8px] h-[8px] rounded-full animate-pulse" style={{ background: migration.color }} />
          <span className="text-[13px] font-semibold" style={{ color: migration.color }}>{migration.season} · {migration.direction}</span>
        </div>
        <p className="text-[13px] text-dwl-muted mt-2 max-w-[500px]" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.8s 0.5s' }}>{migration.activity}</p>

        <div className="flex flex-wrap gap-8 mt-8" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.8s 0.6s' }}>
          {[{ n: String(IBA_SITES.length), l: 'Preservation areas' }, { n: '3', l: 'Major flyways' }, { n: '5', l: 'Countries' }, { n: String(threatenedSites.length), l: 'Threatened species sites' }].map(s => (
            <div key={s.l}><p className="font-serif italic text-[28px]" style={{ color: migration.color }}>{s.n}</p><p className="micro-label" style={{ color: '#737373' }}>{s.l}</p></div>
          ))}
        </div>
      </section></div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* MAP */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-2">Interactive Map</p>
        <p className="text-[13px] text-dwl-muted mb-6">Click any site for details. Toggle flyways to see the three migration superhighways. Filter by habitat type.</p>

        {/* Habitat filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setActiveFilter(null)} className="text-[11px] px-3 py-1.5 border transition-all" style={{ background: !activeFilter ? '#0a0a0a' : 'transparent', color: !activeFilter ? '#fff' : '#737373', borderColor: !activeFilter ? '#0a0a0a' : '#e5e5e5' }}>All ({IBA_SITES.length})</button>
          {Object.entries(TYPE_LABELS).map(([key, label]) => {
            const count = IBA_SITES.filter(s => s.type === key).length
            if (count === 0) return null
            return <button key={key} onClick={() => setActiveFilter(activeFilter === key ? null : key)} className="text-[11px] px-3 py-1.5 border transition-all flex items-center gap-1.5" style={{ background: activeFilter === key ? TYPE_COLORS[key] : 'transparent', color: activeFilter === key ? '#fff' : '#737373', borderColor: activeFilter === key ? TYPE_COLORS[key] : '#e5e5e5' }}>
              <span className="w-[6px] h-[6px] rounded-full" style={{ background: activeFilter === key ? '#fff' : TYPE_COLORS[key] }} />
              {label} ({count})
            </button>
          })}
        </div>

        <BirdMap sites={IBA_SITES} flyways={FLYWAYS} selected={selected} onSelect={setSelected} activeFilter={activeFilter} />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* FLYWAY DETAILS */}
      <div ref={flySection.ref}><section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-8">The Three Superhighways</p>
        <div className="space-y-0">
          {FLYWAYS.map((fw, i) => (
            <div key={fw.name} className="border-b border-dwl-border py-8 grid grid-cols-1 md:grid-cols-12 gap-6" style={{ opacity: flySection.vis ? 1 : 0, transform: flySection.vis ? 'none' : 'translateY(12px)', transition: `all 0.5s ${i*0.1}s` }}>
              <div className="md:col-span-1 flex items-start"><span className="w-[10px] h-[10px] rounded-full mt-1" style={{ background: fw.color }} /></div>
              <div className="md:col-span-4">
                <div className="font-serif text-[20px] text-dwl-black">{fw.name}</div>
                <div className="text-[12px] text-dwl-muted mt-1">{fw.timing}</div>
              </div>
              <div className="md:col-span-4"><p className="text-[13px] text-dwl-gray leading-relaxed">{fw.description}</p></div>
              <div className="md:col-span-3">
                <div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">Volume</div>
                <div className="text-[14px] font-semibold mt-1" style={{ color: fw.color }}>{fw.numbers}</div>
                <div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mt-3">Key Species</div>
                <div className="text-[11px] text-dwl-gray mt-1">{fw.species}</div>
              </div>
            </div>
          ))}
        </div>
      </section></div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* SITES BY COUNTRY */}
      <div ref={sitesSection.ref}><section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-8">Preservation Areas by Country</p>
        {countries.map(country => {
          const countrySites = IBA_SITES.filter(s => s.country === country)
          if (countrySites.length === 0) return null
          return (
            <div key={country} className="mb-10" style={{ opacity: sitesSection.vis ? 1 : 0, transition: 'opacity 0.6s' }}>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-[22px] text-dwl-black">{country}</span>
                <span className="text-[12px] text-dwl-muted">{countryCount(country)} sites</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {countrySites.map(site => (
                  <button key={site.name} onClick={() => setSelected(site)} className="text-left p-4 border border-dwl-border hover:border-dwl-black transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-[6px] h-[6px] rounded-full" style={{ background: TYPE_COLORS[site.type] }} />
                      <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: TYPE_COLORS[site.type] }}>{TYPE_LABELS[site.type]}</span>
                    </div>
                    <div className="font-serif text-[16px] text-dwl-black">{site.name}</div>
                    <div className="text-[11px] text-dwl-muted mt-1 line-clamp-2">{site.species}</div>
                    {site.threatened && <div className="text-[10px] mt-2 font-medium" style={{ color: '#8B3A3A' }}>⚠ {site.threatened}</div>}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </section></div>

      {/* READING NOTES */}
      <div ref={notes.ref}><section className="bg-[#f5f5f5]"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-8">Reading Notes</p>
        <div className="space-y-10 max-w-[640px]">
          <div style={{ opacity: notes.vis ? 1 : 0, transition: 'opacity 0.6s' }}>
            <h3 className="font-serif text-[22px] text-dwl-black">The 14km Bottleneck</h3>
            <p className="text-[15px] text-dwl-gray leading-relaxed mt-3">Soaring birds — raptors, storks, pelicans — cannot sustain flight over open water. They depend on thermals, columns of rising warm air that only form over land. When they reach the Mediterranean, they funnel to the narrowest crossing points: the <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Strait of Gibraltar</span> (14km), the Bosphorus (700m), and Cap Bon to Sicily (140km). Gibraltar alone funnels 450,000 birds through a gap narrower than many cities.</p>
          </div>
          <div style={{ opacity: notes.vis ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}>
            <h3 className="font-serif text-[22px] text-dwl-black">The Last Ibis</h3>
            <p className="text-[15px] text-dwl-gray leading-relaxed mt-3">The Northern Bald Ibis once ranged from Morocco to Syria to the Alps. By the 21st century, the wild population had collapsed to fewer than 100 pairs — all in Morocco, all at Souss-Massa National Park. A reintroduction programme has boosted numbers to around 700 birds, but Morocco remains the only country where the species survives in the wild. The ibis is Morocco's rarest resident, nesting on Atlantic cliff faces within sight of surfers.</p>
          </div>
          <div style={{ opacity: notes.vis ? 1 : 0, transition: 'opacity 0.6s 0.4s' }}>
            <h3 className="font-serif text-[22px] text-dwl-black">The Banc d'Arguin</h3>
            <p className="text-[15px] text-dwl-gray leading-relaxed mt-3">Every winter, 2.3 million wading birds pack the shallow waters off Mauritania's coast. The Banc d'Arguin is the terminus of the East Atlantic Flyway — the end of a journey that starts in Siberia, passes through the Wadden Sea, and follows the <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Atlantic coast</span> of Africa. It is the single most important wintering site for Palearctic waders on the planet. The fishermen who live there, the Imraguen, are one of the few communities in the world who fish cooperatively with dolphins.</p>
          </div>
        </div>
      </div></section></div>

      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <blockquote className="font-serif text-[clamp(1.3rem,3.5vw,1.8rem)] text-dwl-black leading-[1.4] max-w-[680px]">"509 bird species have been recorded in Morocco. Thirty-four are globally threatened. The country sits on every major flyway between Europe and Africa. What happens to Moroccan wetlands doesn't stay in Morocco — it echoes from Scandinavia to Senegal."</blockquote>
      </section>

      <section style={{ backgroundColor: '#1f1f1f' }} className="border-t border-dwl-border"><div style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
        <p className="micro-label mb-4">Sources & Attribution</p>
        <p className="text-[12px] text-dwl-muted leading-relaxed max-w-[640px]">Important Bird Areas: BirdLife International DataZone (datazone.birdlife.org). Flyway data: AEWA (Agreement on the Conservation of African-Eurasian Migratory Waterbirds); Migrant Raptor Monitoring (Gibraltar counts). Northern Bald Ibis: IUCN Red List; BirdLife Morocco (GREPOM). Banc d'Arguin: UNESCO World Heritage nomination document; Wetlands International waterbird census. Strait of Gibraltar passage counts: Fundación Migres, Tarifa. Migration Atlas (migrationatlas.org). MaghrebOrnitho (magornitho.org). Fat Birder Algeria guide. Site coordinates verified via eBird hotspot database and Google Earth. All data editorial estimates unless otherwise sourced.</p>
        <p className="text-[11px] text-dwl-muted mt-4">© Slow Morocco · slowmorocco.com · Data may not be reproduced without attribution.</p>
      </div></section>
    </div>
  )
}
