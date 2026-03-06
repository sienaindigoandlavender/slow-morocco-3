'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ═══════════════════════════════════════════════════
// WHO IS THE GOAT — Marco Polo vs Ibn Battuta
// Module 046 · Slow Morocco
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  polo: '#1E40AF',     // deep blue — Venice, sea trade
  battuta: '#B45309',  // amber — desert, Islamic gold
  poloLight: '#93C5FD',
  battutaLight: '#FCD34D',
  bg: '#FAFAF8',
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.12 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// ═══════════════════════════════════════════════════
// DATA — THE TALE OF THE TAPE
// ═══════════════════════════════════════════════════

interface Traveller {
  name: string
  born: string
  died: string
  origin: string
  travelYears: string
  duration: number
  distanceKm: number
  distanceMi: number
  countries: number
  book: string
  bookOriginal: string
  bookDate: number
  occupation: string
  motivation: string
  patron: string
  languages: string[]
  transport: string[]
  hajjCount?: number
  color: string
  colorLight: string
  keyFact: string
}

const POLO: Traveller = {
  name: 'Marco Polo',
  born: 'c. 1254, Venice',
  died: '8 January 1324, Venice',
  origin: 'Republic of Venice',
  travelYears: '1271–1295',
  duration: 24,
  distanceKm: 24000,
  distanceMi: 15000,
  countries: 16,
  book: 'The Travels of Marco Polo',
  bookOriginal: 'Devisement du Monde / Il Milione',
  bookDate: 1298,
  occupation: 'Merchant, diplomat, envoy to Kublai Khan',
  motivation: 'Trade, diplomatic mission, Kublai Khan\'s service',
  patron: 'Kublai Khan (Yuan Dynasty)',
  languages: ['Venetian', 'French', 'Mongol', 'Persian', 'possibly Chinese'],
  transport: ['Ship', 'Camel caravan', 'Horse', 'On foot'],
  color: C.polo,
  colorLight: C.poloLight,
  keyFact: 'Served Kublai Khan for 17 years. Dictated his book from a Genoese prison cell.',
}

const BATTUTA: Traveller = {
  name: 'Ibn Battuta',
  born: '24 February 1304, Tangier',
  died: '1368/1369, Morocco',
  origin: 'Marinid Sultanate (Morocco)',
  travelYears: '1325–1354',
  duration: 29,
  distanceKm: 117000,
  distanceMi: 73000,
  countries: 44,
  book: 'The Rihla',
  bookOriginal: 'Tuḥfat an-Nuẓẓār fī Gharāʾib al-Amṣār wa ʿAjāʾib al-Asfār',
  bookDate: 1355,
  occupation: 'Islamic scholar, qadi (judge), jurist',
  motivation: 'Hajj pilgrimage, scholarly pursuit, judicial appointments',
  patron: 'Multiple sultans (Delhi, Mali, Morocco, Maldives)',
  languages: ['Arabic', 'Berber', 'Persian', 'Turkish', 'possibly Malay'],
  transport: ['Camel caravan', 'Dhow', 'Horse', 'On foot', 'Elephant', 'River boat'],
  hajjCount: 4,
  color: C.battuta,
  colorLight: C.battutaLight,
  keyFact: 'Completed the Hajj 4 times. Travelled 5× farther than Marco Polo. Dictated to Ibn Juzayy on the Sultan\'s orders.',
}

// ─── ROUTE DATA (lat/lng for Mapbox) ───

const POLO_ROUTE: { name: string; lat: number; lng: number; year: number; note: string }[] = [
  { name: 'Venice', lat: 45.44, lng: 12.34, year: 1271, note: 'Departure at age 17 with father and uncle' },
  { name: 'Acre', lat: 32.92, lng: 35.07, year: 1271, note: 'Met papal legate. Received letters for Khan' },
  { name: 'Hormuz', lat: 27.08, lng: 56.27, year: 1272, note: 'Persian Gulf port. Ships deemed unseaworthy — continued overland' },
  { name: 'Kerman', lat: 30.28, lng: 57.08, year: 1272, note: 'Crossed Persian desert' },
  { name: 'Balkh', lat: 36.76, lng: 66.90, year: 1272, note: 'Ancient city destroyed by Genghis Khan' },
  { name: 'Badakhshan', lat: 36.73, lng: 70.81, year: 1273, note: 'Stayed a year — Marco recovered from illness. Pamir crossing ahead' },
  { name: 'Kashgar', lat: 39.47, lng: 75.99, year: 1273, note: 'Edge of the Taklamakan Desert' },
  { name: 'Dunhuang', lat: 40.14, lng: 94.66, year: 1274, note: 'Gateway to the Gobi Desert' },
  { name: 'Shangdu (Xanadu)', lat: 42.36, lng: 116.18, year: 1275, note: 'Kublai Khan\'s summer palace. "In Xanadu did Kubla Khan..."' },
  { name: 'Khanbaliq (Beijing)', lat: 39.91, lng: 116.39, year: 1275, note: '17 years in Khan\'s service as envoy and administrator' },
  { name: 'Hangzhou', lat: 30.25, lng: 120.17, year: 1280, note: '"The finest and most splendid city in the world"' },
  { name: 'Yangzhou', lat: 32.39, lng: 119.42, year: 1282, note: 'Governed the city for 3 years (claimed)' },
  { name: 'Quanzhou', lat: 24.87, lng: 118.68, year: 1291, note: 'Departure port. Sailed with 600 passengers, 14 ships' },
  { name: 'Sumatra', lat: 1.00, lng: 104.00, year: 1292, note: 'Waited 5 months for monsoon winds' },
  { name: 'Sri Lanka', lat: 7.87, lng: 79.88, year: 1292, note: 'Noted Adam\'s Peak and gem trade' },
  { name: 'Hormuz', lat: 27.08, lng: 56.27, year: 1293, note: 'Return via sea route. Only 18 of 600 passengers survived the voyage' },
  { name: 'Trebizond', lat: 41.00, lng: 39.72, year: 1294, note: 'Black Sea port. Robbed of earnings' },
  { name: 'Constantinople', lat: 41.01, lng: 28.98, year: 1295, note: 'Final leg by ship' },
  { name: 'Venice', lat: 45.44, lng: 12.34, year: 1295, note: 'Return after 24 years. Family did not recognise them' },
]

const BATTUTA_ROUTE: { name: string; lat: number; lng: number; year: number; note: string }[] = [
  { name: 'Tangier', lat: 35.78, lng: -5.81, year: 1325, note: 'Departure at age 21. "I set out alone, swayed by an overmastering impulse"' },
  { name: 'Tlemcen', lat: 34.88, lng: -1.32, year: 1325, note: 'Marinid trade hub. Met Sultan Abu Tashfin' },
  { name: 'Tunis', lat: 36.81, lng: 10.18, year: 1325, note: 'Two months studying Maliki law at Zaytuna' },
  { name: 'Alexandria', lat: 31.20, lng: 29.92, year: 1326, note: 'Studied under Sufi sheikh Burhan al-Din' },
  { name: 'Cairo', lat: 30.04, lng: 31.24, year: 1326, note: 'Marvelled at the Nile and Al-Azhar Mosque' },
  { name: 'Damascus', lat: 33.51, lng: 36.29, year: 1326, note: '"If Paradise exists on earth, it is Damascus"' },
  { name: 'Mecca', lat: 21.43, lng: 39.83, year: 1326, note: 'First Hajj. Would complete 4 total' },
  { name: 'Aden', lat: 12.79, lng: 45.02, year: 1329, note: 'Gateway to East Africa and Indian Ocean' },
  { name: 'Mogadishu', lat: 2.05, lng: 45.32, year: 1331, note: '"An enormous town." Noted hundreds of camels slaughtered daily' },
  { name: 'Kilwa', lat: -8.96, lng: 39.52, year: 1331, note: 'Swahili coast. "One of the most beautiful cities in the world"' },
  { name: 'Constantinople', lat: 41.01, lng: 28.98, year: 1332, note: 'Visited as guest of a Byzantine princess. Noted Hagia Sophia' },
  { name: 'Saray (Golden Horde)', lat: 48.53, lng: 44.52, year: 1333, note: 'Capital of Özbeg Khan. Travelled the frozen steppe' },
  { name: 'Bukhara', lat: 39.77, lng: 64.42, year: 1333, note: 'Great Silk Road city. Devastated by Mongols a century earlier' },
  { name: 'Samarkand', lat: 39.65, lng: 66.96, year: 1333, note: '"One of the most magnificent cities in the world"' },
  { name: 'Kabul', lat: 34.53, lng: 69.17, year: 1334, note: 'Crossed the Hindu Kush' },
  { name: 'Delhi', lat: 28.61, lng: 77.21, year: 1334, note: 'Served Sultan Muhammad ibn Tughluq as qadi for 8 years' },
  { name: 'Maldives', lat: 4.18, lng: 73.51, year: 1343, note: 'Appointed chief qadi. Married into island royalty' },
  { name: 'Sri Lanka', lat: 7.87, lng: 79.88, year: 1344, note: 'Climbed Adam\'s Peak. Noted gem mines' },
  { name: 'Chittagong', lat: 22.34, lng: 91.82, year: 1345, note: 'Bengal. Shipwrecked earlier, robbed of all possessions' },
  { name: 'Sumatra', lat: 1.00, lng: 104.00, year: 1345, note: 'Sultanate of Samudra-Pasai' },
  { name: 'Quanzhou', lat: 24.87, lng: 118.68, year: 1346, note: 'Arrived in China via sea. Noted thriving Muslim community' },
  { name: 'Hangzhou', lat: 30.25, lng: 120.17, year: 1346, note: 'Confirmed Polo\'s description: "the greatest city in the world"' },
  { name: 'Mecca', lat: 21.43, lng: 39.83, year: 1348, note: 'Fourth Hajj. Witnessed the Black Death in Damascus and Cairo' },
  { name: 'Fes', lat: 34.03, lng: -4.98, year: 1349, note: 'Return to Morocco after 24 years. Mother had died of plague' },
  { name: 'Granada', lat: 37.18, lng: -3.60, year: 1350, note: 'Muslim Spain under the Nasrid dynasty' },
  { name: 'Timbuktu', lat: 16.77, lng: -3.01, year: 1352, note: 'Mali Empire. Crossed the Sahara by camel' },
  { name: 'Gao', lat: 16.27, lng: -0.04, year: 1353, note: 'Niger River. Accompanied caravan of 600 slaves on return' },
  { name: 'Tangier', lat: 35.78, lng: -5.81, year: 1354, note: 'Final return. Dictated the Rihla to Ibn Juzayy' },
]

// ─── COMPARATIVE STATS ───

interface CompStat {
  label: string
  polo: string | number
  battuta: string | number
  poloVal: number
  battutaVal: number
  unit: string
  winner: 'polo' | 'battuta' | 'tie'
  note?: string
}

const COMP_STATS: CompStat[] = [
  { label: 'Total distance', polo: '24,000', battuta: '117,000', poloVal: 24000, battutaVal: 117000, unit: 'km', winner: 'battuta', note: 'Ibn Battuta travelled nearly 5× farther' },
  { label: 'Duration', polo: 24, battuta: 29, poloVal: 24, battutaVal: 29, unit: 'years', winner: 'battuta' },
  { label: 'Modern countries visited', polo: '~16', battuta: '~44', poloVal: 16, battutaVal: 44, unit: '', winner: 'battuta' },
  { label: 'Continents', polo: 2, battuta: 3, poloVal: 2, battutaVal: 3, unit: '', winner: 'battuta', note: 'Polo: Europe, Asia. Battuta: Africa, Europe, Asia' },
  { label: 'Age at departure', polo: 17, battuta: 21, poloVal: 17, battutaVal: 21, unit: 'years old', winner: 'polo', note: 'Polo left younger and with his father. Battuta left alone' },
  { label: 'Time at a single court', polo: 17, battuta: 8, poloVal: 17, battutaVal: 8, unit: 'years', winner: 'polo', note: 'Polo: Kublai Khan. Battuta: Delhi Sultanate' },
  { label: 'Shipwrecks survived', polo: 0, battuta: 2, poloVal: 0, battutaVal: 2, unit: '', winner: 'battuta' },
  { label: 'Languages spoken', polo: '~5', battuta: '~5', poloVal: 5, battutaVal: 5, unit: '', winner: 'tie' },
  { label: 'Book written', polo: 1298, battuta: 1355, poloVal: 1298, battutaVal: 1355, unit: 'year', winner: 'tie' },
  { label: 'Dictated to', polo: 'Rustichello da Pisa', battuta: 'Ibn Juzayy', poloVal: 0, battutaVal: 0, unit: '', winner: 'tie', note: 'Both dictated — neither wrote their own book' },
  { label: 'Book survival', polo: '~150 manuscripts', battuta: '5 manuscripts', poloVal: 150, battutaVal: 5, unit: '', winner: 'polo', note: 'Polo\'s book was a medieval bestseller. Battuta\'s was nearly lost' },
  { label: 'Historical impact on Europe', polo: 'Enormous', battuta: 'Minimal (until 19th c.)', poloVal: 10, battutaVal: 3, unit: '', winner: 'polo', note: 'Columbus carried a copy of Il Milione' },
]

// ─── TIMELINE EVENTS (merged, sorted) ───

interface TimelineEvent {
  year: number
  who: 'polo' | 'battuta' | 'world'
  event: string
}

const TIMELINE: TimelineEvent[] = [
  { year: 1254, who: 'polo', event: 'Born in Venice' },
  { year: 1260, who: 'world', event: 'Kublai Khan becomes Great Khan of the Mongol Empire' },
  { year: 1271, who: 'polo', event: 'Departs Venice age 17 with father and uncle' },
  { year: 1275, who: 'polo', event: 'Arrives at Kublai Khan\'s court in Shangdu' },
  { year: 1280, who: 'polo', event: 'Visits Hangzhou — "finest city in the world"' },
  { year: 1291, who: 'polo', event: 'Leaves China by sea with 14 ships, 600 passengers' },
  { year: 1295, who: 'polo', event: 'Returns to Venice after 24 years' },
  { year: 1298, who: 'polo', event: 'Dictates Il Milione from Genoese prison' },
  { year: 1304, who: 'battuta', event: 'Born in Tangier, Morocco' },
  { year: 1324, who: 'polo', event: 'Dies in Venice. "I have not told half of what I saw"' },
  { year: 1325, who: 'battuta', event: 'Departs Tangier age 21 for his first Hajj' },
  { year: 1326, who: 'battuta', event: 'First Hajj. Cairo, Damascus, Mecca' },
  { year: 1331, who: 'battuta', event: 'Reaches Kilwa on the Swahili coast' },
  { year: 1332, who: 'battuta', event: 'Visits Constantinople. Crosses the frozen steppe to Saray' },
  { year: 1334, who: 'battuta', event: 'Arrives in Delhi. Serves as qadi for 8 years' },
  { year: 1343, who: 'battuta', event: 'Chief judge of the Maldives. Married 6 times by now' },
  { year: 1346, who: 'battuta', event: 'Reaches Quanzhou, China — confirms Marco Polo\'s descriptions' },
  { year: 1348, who: 'world', event: 'Black Death devastates the Islamic world and Europe' },
  { year: 1349, who: 'battuta', event: 'Returns to Morocco. Mother died of plague during his absence' },
  { year: 1352, who: 'battuta', event: 'Crosses the Sahara to Timbuktu and the Mali Empire' },
  { year: 1354, who: 'battuta', event: 'Final return to Tangier. Dictates the Rihla' },
  { year: 1369, who: 'battuta', event: 'Dies in Morocco, largely unknown to the wider world' },
  { year: 1492, who: 'world', event: 'Columbus sails west — carrying a copy of Marco Polo\'s book' },
]

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// ═══════════════════════════════════════════════════
// MAPBOX DUAL ROUTE MAP
// ═══════════════════════════════════════════════════

function RouteMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [activeLayer, setActiveLayer] = useState<'both' | 'polo' | 'battuta'>('both')
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return

    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [55, 25], zoom: 1.8, minZoom: 1, maxZoom: 8,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // Polo route line
        map.addSource('polo-route', {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: POLO_ROUTE.map(p => [p.lng, p.lat]) } }
        })
        map.addLayer({
          id: 'polo-line', type: 'line', source: 'polo-route',
          paint: { 'line-color': C.polo, 'line-width': 2.5, 'line-opacity': 0.8, 'line-dasharray': [2, 1] }
        })

        // Battuta route line
        map.addSource('battuta-route', {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: BATTUTA_ROUTE.map(p => [p.lng, p.lat]) } }
        })
        map.addLayer({
          id: 'battuta-line', type: 'line', source: 'battuta-route',
          paint: { 'line-color': C.battuta, 'line-width': 2.5, 'line-opacity': 0.8 }
        })

        // Polo markers
        POLO_ROUTE.forEach((p) => {
          const el = document.createElement('div')
          el.className = 'polo-marker'
          el.style.cssText = `width:10px;height:10px;border-radius:50%;background:${C.polo};border:2px solid white;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.3);`
          const popup = new mapboxgl.default.Popup({ offset: 10, closeButton: false, maxWidth: '220px' })
            .setHTML(`<div style="font-family:serif;font-size:13px;"><strong>${p.name}</strong> <span style="color:#737373;font-size:11px;">${p.year}</span><br/><span style="font-size:11px;color:#262626;">${p.note}</span></div>`)
          new mapboxgl.default.Marker({ element: el, anchor: 'center' })
            .setLngLat([p.lng, p.lat]).setPopup(popup).addTo(map)
        })

        // Battuta markers
        BATTUTA_ROUTE.forEach((p) => {
          const el = document.createElement('div')
          el.className = 'battuta-marker'
          el.style.cssText = `width:10px;height:10px;border-radius:50%;background:${C.battuta};border:2px solid white;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.3);`
          const popup = new mapboxgl.default.Popup({ offset: 10, closeButton: false, maxWidth: '220px' })
            .setHTML(`<div style="font-family:serif;font-size:13px;"><strong>${p.name}</strong> <span style="color:#737373;font-size:11px;">${p.year}</span><br/><span style="font-size:11px;color:#262626;">${p.note}</span></div>`)
          new mapboxgl.default.Marker({ element: el, anchor: 'center' })
            .setLngLat([p.lng, p.lat]).setPopup(popup).addTo(map)
        })
      })

      mapRef.current = map
    })

    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  // Toggle visibility
  useEffect(() => {
    const map = mapRef.current; if (!map || !map.isStyleLoaded()) return
    try {
      const showPolo = activeLayer === 'both' || activeLayer === 'polo'
      const showBattuta = activeLayer === 'both' || activeLayer === 'battuta'
      map.setLayoutProperty('polo-line', 'visibility', showPolo ? 'visible' : 'none')
      map.setLayoutProperty('battuta-line', 'visibility', showBattuta ? 'visible' : 'none')
      document.querySelectorAll('.polo-marker').forEach((el: any) => { el.style.display = showPolo ? 'block' : 'none' })
      document.querySelectorAll('.battuta-marker').forEach((el: any) => { el.style.display = showBattuta ? 'block' : 'none' })
    } catch {}
  }, [activeLayer])

  return (
    <div>
      {/* Filter controls */}
      <div className="flex gap-3 mb-3">
        {(['both', 'polo', 'battuta'] as const).map(k => (
          <button key={k} onClick={() => setActiveLayer(k)}
            className="text-[11px] font-mono px-3 py-1.5 border transition-all"
            style={{
              borderColor: activeLayer === k ? C.ink : C.border,
              background: activeLayer === k ? C.ink : 'transparent',
              color: activeLayer === k ? '#fff' : C.muted,
            }}>
            {k === 'both' ? 'Both Routes' : k === 'polo' ? '● Marco Polo' : '● Ibn Battuta'}
          </button>
        ))}
      </div>
      <div ref={mapContainer} className="w-full rounded-sm border" style={{ height: 480, borderColor: C.border }} />
      <div className="flex gap-6 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5" style={{ background: C.polo, borderTop: '2px dashed ' + C.polo }} />
          <span className="text-[10px] font-mono" style={{ color: C.muted }}>Marco Polo (1271–1295)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5" style={{ background: C.battuta }} />
          <span className="text-[10px] font-mono" style={{ color: C.muted }}>Ibn Battuta (1325–1354)</span>
        </div>
      </div>
      {!MAPBOX_TOKEN && (
        <div className="mt-2 p-4 border text-[12px] text-center" style={{ borderColor: C.border, color: C.muted }}>
          Map requires NEXT_PUBLIC_MAPBOX_TOKEN environment variable.
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// COMPARISON BARS
// ═══════════════════════════════════════════════════

function ComparisonBars() {
  const r = useReveal()

  const quantitative = COMP_STATS.filter(s => typeof s.polo === 'number' || /^\d/.test(String(s.polo).replace(/[~,]/g, '')))
    .filter(s => s.poloVal > 0 && s.battutaVal > 0)

  return (
    <div ref={r.ref}>
      <div className="space-y-5">
        {quantitative.map((s, i) => {
          const max = Math.max(s.poloVal, s.battutaVal)
          const pW = (s.poloVal / max) * 100
          const bW = (s.battutaVal / max) * 100
          return (
            <div key={s.label} className="transition-all duration-700" style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
              <p className="text-[12px] font-mono mb-1.5" style={{ color: C.text }}>{s.label}</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono w-20 text-right shrink-0" style={{ color: C.polo }}>Polo</span>
                  <div className="flex-1 h-5 relative" style={{ background: '#f5f5f5' }}>
                    <div className="h-full transition-all duration-700 flex items-center pl-2"
                      style={{ width: r.vis ? `${Math.max(pW, 5)}%` : '0%', background: C.polo, opacity: 0.75, transitionDelay: `${i * 60 + 100}ms` }}>
                      <span className="text-[9px] font-mono text-white whitespace-nowrap">{s.polo} {s.unit}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono w-20 text-right shrink-0" style={{ color: C.battuta }}>Battuta</span>
                  <div className="flex-1 h-5 relative" style={{ background: '#f5f5f5' }}>
                    <div className="h-full transition-all duration-700 flex items-center pl-2"
                      style={{ width: r.vis ? `${Math.max(bW, 5)}%` : '0%', background: C.battuta, opacity: 0.75, transitionDelay: `${i * 60 + 200}ms` }}>
                      <span className="text-[9px] font-mono text-white whitespace-nowrap">{s.battuta} {s.unit}</span>
                    </div>
                  </div>
                </div>
              </div>
              {s.note && <p className="text-[10px] mt-0.5 italic" style={{ color: C.muted }}>{s.note}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// TALE OF THE TAPE — side by side cards
// ═══════════════════════════════════════════════════

function TaleOfTheTape() {
  const r = useReveal()
  const fields: { label: string; polo: string; battuta: string }[] = [
    { label: 'Born', polo: POLO.born, battuta: BATTUTA.born },
    { label: 'Died', polo: POLO.died, battuta: BATTUTA.died },
    { label: 'Origin', polo: POLO.origin, battuta: BATTUTA.origin },
    { label: 'Travel period', polo: POLO.travelYears, battuta: BATTUTA.travelYears },
    { label: 'Duration', polo: `${POLO.duration} years`, battuta: `${BATTUTA.duration} years` },
    { label: 'Total distance', polo: `${POLO.distanceKm.toLocaleString()} km`, battuta: `${BATTUTA.distanceKm.toLocaleString()} km` },
    { label: 'Countries (modern)', polo: `~${POLO.countries}`, battuta: `~${BATTUTA.countries}` },
    { label: 'Occupation', polo: POLO.occupation, battuta: BATTUTA.occupation },
    { label: 'Motivation', polo: POLO.motivation, battuta: BATTUTA.motivation },
    { label: 'Primary patron', polo: POLO.patron, battuta: BATTUTA.patron },
    { label: 'Languages', polo: POLO.languages.join(', '), battuta: BATTUTA.languages.join(', ') },
    { label: 'Transport', polo: POLO.transport.join(', '), battuta: BATTUTA.transport.join(', ') },
    { label: 'Book', polo: POLO.book, battuta: BATTUTA.book },
    { label: 'Book year', polo: String(POLO.bookDate), battuta: String(BATTUTA.bookDate) },
    { label: 'Key fact', polo: POLO.keyFact, battuta: BATTUTA.keyFact },
  ]

  return (
    <div ref={r.ref} className="transition-all duration-1000" style={{ opacity: r.vis ? 1 : 0 }}>
      {/* Header */}
      <div className="grid grid-cols-[1fr_2fr_2fr] border-b pb-3 mb-1" style={{ borderColor: C.ink }}>
        <div />
        <p className="font-serif text-[18px]" style={{ color: C.polo }}>Marco Polo</p>
        <p className="font-serif text-[18px]" style={{ color: C.battuta }}>Ibn Battuta</p>
      </div>
      {/* Rows */}
      {fields.map((f, i) => (
        <div key={f.label} className="grid grid-cols-[1fr_2fr_2fr] border-b py-2 text-[13px] leading-relaxed"
          style={{ borderColor: C.border }}>
          <span className="font-mono text-[11px]" style={{ color: C.muted }}>{f.label}</span>
          <span style={{ color: C.text }}>{f.polo}</span>
          <span style={{ color: C.text }}>{f.battuta}</span>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// DUAL TIMELINE
// ═══════════════════════════════════════════════════

function DualTimeline() {
  const r = useReveal()
  return (
    <div ref={r.ref}>
      <div className="relative">
        {/* Central spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: C.border }} />

        <div className="space-y-0">
          {TIMELINE.map((e, i) => {
            const isLeft = e.who === 'polo'
            const isCenter = e.who === 'world'
            const color = e.who === 'polo' ? C.polo : e.who === 'battuta' ? C.battuta : C.muted

            if (isCenter) {
              return (
                <div key={i} className="relative flex justify-center py-3 transition-all duration-500"
                  style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${i * 40}ms` }}>
                  <div className="bg-white px-4 py-1.5 border text-[11px] font-mono text-center z-10"
                    style={{ borderColor: C.border, color: C.muted }}>
                    <span className="font-medium">{e.year}</span> — {e.event}
                  </div>
                </div>
              )
            }

            return (
              <div key={i} className="relative flex py-2 transition-all duration-500"
                style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${i * 40}ms` }}>
                {/* Left side (Polo) */}
                <div className="w-1/2 pr-6 flex justify-end">
                  {isLeft && (
                    <div className="text-right max-w-[320px]">
                      <span className="text-[11px] font-mono" style={{ color }}>{e.year}</span>
                      <p className="text-[13px] leading-snug" style={{ color: C.text }}>{e.event}</p>
                    </div>
                  )}
                </div>
                {/* Center dot */}
                <div className="absolute left-1/2 top-3 -translate-x-1/2 w-2.5 h-2.5 rounded-full z-10 border-2 border-white"
                  style={{ background: color, boxShadow: '0 0 0 1px ' + color }} />
                {/* Right side (Battuta) */}
                <div className="w-1/2 pl-6">
                  {!isLeft && !isCenter && (
                    <div className="max-w-[320px]">
                      <span className="text-[11px] font-mono" style={{ color }}>{e.year}</span>
                      <p className="text-[13px] leading-snug" style={{ color: C.text }}>{e.event}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// SCORECARD — final verdict
// ═══════════════════════════════════════════════════

function Scorecard() {
  const r = useReveal()
  const categories = [
    { label: 'Distance', polo: 2, battuta: 10, note: '117,000 vs 24,000 km. Not close.' },
    { label: 'Geographic range', polo: 4, battuta: 10, note: '44 vs 16 modern countries. 3 vs 2 continents.' },
    { label: 'Duration', polo: 8, battuta: 9, note: '24 vs 29 years. Both lifetimes on the road.' },
    { label: 'Cultural immersion', polo: 7, battuta: 10, note: 'Battuta served as judge, married locally, learned languages. Polo observed from court.' },
    { label: 'Danger survived', polo: 7, battuta: 9, note: 'Both faced bandits and storms. Battuta was shipwrecked twice, robbed, nearly executed.' },
    { label: 'Literary impact', polo: 10, battuta: 5, note: 'Il Milione inspired Columbus and the Age of Exploration. The Rihla was nearly lost.' },
    { label: 'Historical influence', polo: 10, battuta: 4, note: 'Polo reshaped European understanding of Asia. Battuta was rediscovered in the 1800s.' },
    { label: 'Reliability', polo: 6, battuta: 7, note: 'Both embellished. Polo may never have been to China (debated). Battuta borrowed stories.' },
    { label: 'Solo courage', polo: 3, battuta: 10, note: 'Polo travelled with family and resources. Battuta: "I set out alone."' },
    { label: 'Return value', polo: 8, battuta: 6, note: 'Polo brought back knowledge of paper money, coal, gunpowder. Battuta brought ethnography.' },
  ]

  const poloTotal = categories.reduce((s, c) => s + c.polo, 0)
  const battutaTotal = categories.reduce((s, c) => s + c.battuta, 0)

  return (
    <div ref={r.ref}>
      <div className="space-y-3">
        {categories.map((c, i) => {
          const max = 10
          return (
            <div key={c.label} className="transition-all duration-500" style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${i * 50}ms` }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-mono" style={{ color: C.text }}>{c.label}</span>
                <span className="text-[11px] font-mono" style={{ color: C.muted }}>{c.polo} – {c.battuta}</span>
              </div>
              <div className="flex gap-1 h-4">
                {/* Polo bar — right aligned */}
                <div className="flex-1 flex justify-end">
                  <div className="h-full transition-all duration-700"
                    style={{ width: r.vis ? `${(c.polo / max) * 100}%` : '0%', background: C.polo, opacity: 0.7, transitionDelay: `${i * 50}ms` }} />
                </div>
                <div className="w-px" style={{ background: C.border }} />
                {/* Battuta bar — left aligned */}
                <div className="flex-1">
                  <div className="h-full transition-all duration-700"
                    style={{ width: r.vis ? `${(c.battuta / max) * 100}%` : '0%', background: C.battuta, opacity: 0.7, transitionDelay: `${i * 50}ms` }} />
                </div>
              </div>
              <p className="text-[10px] italic mt-0.5" style={{ color: C.muted }}>{c.note}</p>
            </div>
          )
        })}
      </div>

      {/* Total */}
      <div className="border-t mt-8 pt-6 text-center" style={{ borderColor: C.ink }}>
        <div className="flex justify-center items-end gap-8">
          <div>
            <p className="font-serif text-[36px] leading-none" style={{ color: C.polo }}>{poloTotal}</p>
            <p className="text-[12px] font-mono mt-1" style={{ color: C.muted }}>Marco Polo</p>
          </div>
          <p className="text-[14px] font-mono pb-2" style={{ color: C.muted }}>vs</p>
          <div>
            <p className="font-serif text-[36px] leading-none" style={{ color: C.battuta }}>{battutaTotal}</p>
            <p className="text-[12px] font-mono mt-1" style={{ color: C.muted }}>Ibn Battuta</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

export function WhoIsTheGoatContent() {
  const heroR = useReveal()
  const numsR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-10">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 046 · Comparative Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Who Is the<br />GOAT?</em>
          </h1>
          <div className="flex flex-wrap gap-4 items-baseline mb-6">
            <span className="font-serif text-[clamp(1.2rem,3vw,1.8rem)] px-3 py-1" style={{ background: C.polo, color: '#fff' }}>Marco Polo</span>
            <span className="font-serif italic text-[clamp(1rem,2vw,1.4rem)]" style={{ color: C.muted }}>vs</span>
            <span className="font-serif text-[clamp(1.2rem,3vw,1.8rem)] px-3 py-1" style={{ background: C.battuta, color: '#fff' }}>Ibn Battuta</span>
          </div>
          <p className="text-[15px] leading-[1.8] max-w-[640px]" style={{ color: C.text }}>
            Everyone knows Marco Polo. Fewer know the man who travelled nearly five times farther.
            A Venetian merchant who served the Mongol emperor for 17 years. A Moroccan scholar
            who left Tangier at 21 and didn&apos;t come home for 29 years. One book changed Europe&apos;s
            understanding of Asia. The other was nearly lost to history. Both dictated their stories
            to other men. Both were accused of lying. The data settles it.
          </p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-10">
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: '117,000', l: 'km — Ibn Battuta', c: C.battuta },
            { n: '24,000', l: 'km — Marco Polo', c: C.polo },
            { n: '44', l: 'modern countries (Battuta)', c: C.battuta },
            { n: '29', l: 'years on the road (Battuta)', c: C.battuta },
            { n: '17', l: 'years at Khan\'s court (Polo)', c: C.polo },
            { n: '4.9×', l: 'distance ratio (B ÷ P)', c: C.battuta },
            { n: '1492', l: 'Columbus carries Il Milione', c: C.polo },
            { n: '1829', l: 'Rihla rediscovered in Algeria', c: C.battuta },
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

      {/* ═══ MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Routes</h2>
        <p className="text-[14px] leading-relaxed mb-6 max-w-[600px]" style={{ color: C.text }}>
          Marco Polo&apos;s path was a long loop: Venice to Beijing via the Silk Road, back by sea through
          Southeast Asia. Ibn Battuta&apos;s was a web: North Africa, East Africa, the Steppe, India, China,
          the Sahara, and Muslim Spain — crisscrossing the known world.
        </p>
        <RouteMap />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ TALE OF THE TAPE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-6">Tale of the Tape</h2>
        <TaleOfTheTape />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ COMPARISON BARS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-6">By the Numbers</h2>
        <ComparisonBars />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ TIMELINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section IV</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-4">Two Lives, One Century</h2>
        <p className="text-[14px] leading-relaxed mb-8 max-w-[600px]" style={{ color: C.text }}>
          Marco Polo died in 1324 — the same year Ibn Battuta left Tangier. They never overlapped.
          But Ibn Battuta visited Hangzhou and confirmed Polo&apos;s description of it as the greatest city
          in the world. The Venetian merchant and the Moroccan scholar, separated by a generation,
          saw the same wonders.
        </p>
        <div className="hidden md:flex justify-between mb-2">
          <span className="font-serif text-[14px]" style={{ color: C.polo }}>← Marco Polo</span>
          <span className="font-serif text-[14px]" style={{ color: C.battuta }}>Ibn Battuta →</span>
        </div>
        <DualTimeline />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SCORECARD ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section V</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-4">The Verdict</h2>
        <p className="text-[14px] leading-relaxed mb-8 max-w-[600px]" style={{ color: C.text }}>
          Ten categories. Scored 1–10. Distance, range, courage, cultural depth, literary impact,
          historical influence. The data renders the verdict that history wouldn&apos;t.
        </p>
        <div className="max-w-[640px] mx-auto">
          <Scorecard />
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 text-center">
        <div className="max-w-[540px] mx-auto">
          <p className="font-serif text-[clamp(1.4rem,3vw,2rem)] italic leading-relaxed mb-6" style={{ color: C.ink }}>
            &ldquo;Marco Polo told Europe about Asia.<br />
            Ibn Battuta told the world about itself.&rdquo;
          </p>
          <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>
            Polo wins on influence because Europe won on power. His book reached Columbus.
            Battuta wins on everything a traveller actually does: going farther, going alone,
            immersing deeper, surviving more. The GOAT left from Tangier.
          </p>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <p>Distance and country counts: Wikipedia, &ldquo;List of places visited by Ibn Battuta&rdquo;; Britannica, &ldquo;Ibn Battuta&rdquo;; World History Encyclopedia. Marco Polo distances from Wikipedia and Brilliant Maps. Biographical data: Britannica, Encyclopedia.com, ORIAS (UC Berkeley). Route coordinates reconstructed from historical itineraries and modern atlases. Scoring methodology is editorial — the numbers are real, the weights are ours.</p>
          <p>Ibn Battuta&apos;s Rihla was rediscovered by French scholars in Algeria in 1829 and first translated into French by Defrémery and Sanguinetti (1853–58). English translation by H.A.R. Gibb for the Hakluyt Society (1958–1994). Marco Polo&apos;s Il Milione survives in approximately 150 manuscript copies across European libraries.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: 'rgba(255,255,255,0.7)' }}>
          © Slow Morocco · slowmorocco.com · All data from published sources as cited. This visualization may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
