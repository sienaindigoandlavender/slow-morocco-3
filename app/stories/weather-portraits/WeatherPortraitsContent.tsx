'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  hot: '#C1440E', warm: '#D4884A', mild: '#E8C547', cool: '#5B9BD5', cold: '#2E5B88',
  rain: '#3B82B0', sun: '#E8A838', snow: '#A8C8E8',
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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface City {
  name: string; arabic: string; region: string; elevation: string
  lat: string; climate: string; koppen: string
  mapLat: number; mapLng: number
  tempHigh: number[]; tempLow: number[]; rainfall: number[]; sunHours: number[]
  annualRain: number; annualSun: number
  recordHigh: number; recordHighDate: string
  recordLow: number; recordLowDate: string
  note: string
}

const CITIES: City[] = [
  { name: 'Marrakech', arabic: 'مراكش', region: 'Interior Plain', elevation: '466m', lat: '31.6°N', mapLat: 31.63, mapLng: -8.01, climate: 'Semi-arid (hot steppe)', koppen: 'BSh', tempHigh: [18,20,23,25,29,34,38,38,33,28,22,18], tempLow: [6,8,10,12,15,18,21,21,19,15,10,7], rainfall: [32,38,38,35,18,5,1,2,8,24,40,32], sunHours: [7.2,7.8,8.5,9.2,9.8,10.5,10.8,10.2,9.0,7.8,7.0,6.8], annualRain: 273, annualSun: 3050, recordHigh: 49.6, recordHighDate: '17 July 2012', recordLow: -2, recordLowDate: 'January 2005', note: 'Hottest major city. 49.6°C in 2012 was Morocco\'s verified national record. Summers regularly exceed 40°C. The chergui wind from the Sahara can add 10–15°C in hours.' },
  { name: 'Casablanca', arabic: 'الدار البيضاء', region: 'Atlantic Coast', elevation: '27m', lat: '33.5°N', mapLat: 33.57, mapLng: -7.59, climate: 'Mediterranean (oceanic influence)', koppen: 'Csa', tempHigh: [17,18,19,20,22,25,27,28,26,24,20,18], tempLow: [8,9,10,12,14,17,20,20,18,15,12,9], rainfall: [58,53,49,40,18,3,0,1,7,39,68,65], sunHours: [6.5,7.2,8.0,8.8,9.5,9.8,10.0,9.8,8.5,7.5,6.5,6.0], annualRain: 401, annualSun: 2800, recordHigh: 40.5, recordHighDate: 'August 2023', recordLow: 0.3, recordLowDate: 'January 2005', note: 'The Canary Current keeps Casablanca cooler than its latitude suggests. Similar climate to Los Angeles. The economic capital feels temperate year-round.' },
  { name: 'Fes', arabic: 'فاس', region: 'Interior Basin', elevation: '411m', lat: '34.0°N', mapLat: 34.03, mapLng: -4.98, climate: 'Mediterranean (continental)', koppen: 'Csa', tempHigh: [15,17,20,22,27,33,37,36,31,25,19,16], tempLow: [4,5,7,9,13,16,20,20,17,12,8,5], rainfall: [65,60,62,55,30,7,2,2,12,45,65,70], sunHours: [5.5,6.5,7.5,8.5,9.5,10.5,11.0,10.5,9.0,7.0,6.0,5.0], annualRain: 475, annualSun: 2750, recordHigh: 46.0, recordHighDate: 'July 2012', recordLow: -5.0, recordLowDate: 'January 2005', note: 'Trapped in a bowl between the Middle Atlas and the Rif. The medina\'s narrow streets are climate engineering: shade corridors that drop temperature 5–8°C below the exposed city.' },
  { name: 'Tangier', arabic: 'طنجة', region: 'Strait of Gibraltar', elevation: '18m', lat: '35.8°N', mapLat: 35.77, mapLng: -5.80, climate: 'Mediterranean', koppen: 'Csa', tempHigh: [15,16,17,19,22,25,29,29,26,22,18,16], tempLow: [9,9,10,12,14,17,20,20,19,15,12,10], rainfall: [99,98,72,56,30,7,1,2,18,68,110,120], sunHours: [5.0,6.0,7.0,8.0,9.0,10.0,10.5,10.0,8.5,7.0,5.5,5.0], annualRain: 681, annualSun: 2550, recordHigh: 42.0, recordHighDate: 'August 2023', recordLow: -2.0, recordLowDate: 'February 2012', note: 'Wettest major city. 14km from Spain. Gets almost 3x the rainfall of Marrakech. The levante wind from the east can be relentless.' },
  { name: 'Agadir', arabic: 'أكادير', region: 'Southern Atlantic Coast', elevation: '30m', lat: '30.4°N', mapLat: 30.42, mapLng: -9.60, climate: 'Semi-arid (cool coast)', koppen: 'BSk', tempHigh: [20,21,22,22,23,25,27,27,27,26,23,21], tempLow: [8,10,12,13,15,17,19,19,18,16,13,10], rainfall: [36,30,22,12,3,0,0,1,4,16,30,42], sunHours: [7.5,8.0,8.5,9.5,9.5,9.0,8.5,8.5,8.5,8.0,7.5,7.0], annualRain: 196, annualSun: 3150, recordHigh: 50.4, recordHighDate: '11 August 2023', recordLow: 2.0, recordLowDate: 'January 2005', note: 'Most stable climate in Morocco. The Canary Current keeps Agadir locked in a 20–27°C band year-round. 196mm/year. The 2023 reading of 50.4°C at nearby Agadir-Inezgane, if confirmed, would be Morocco\'s all-time high.' },
  { name: 'Ouarzazate', arabic: 'ورزازات', region: 'Pre-Saharan Foothills', elevation: '1,160m', lat: '30.9°N', mapLat: 30.92, mapLng: -6.90, climate: 'Desert (cold)', koppen: 'BWk', tempHigh: [17,19,22,26,31,36,40,39,34,28,22,17], tempLow: [2,4,7,10,14,18,22,22,18,12,7,3], rainfall: [10,8,15,10,5,2,1,3,7,12,12,8], sunHours: [7.5,8.0,9.0,9.5,10.0,10.5,10.5,10.0,9.0,8.0,7.5,7.0], annualRain: 93, annualSun: 3250, recordHigh: 47.0, recordHighDate: 'July 2012', recordLow: -5.0, recordLowDate: 'January 2005', note: 'Hollywood\'s desert. The Noor solar complex sits 10km away — 3,000 hectares exploiting 3,250 sunshine hours/year. The diurnal range is extreme: 40°C day, 22°C night in July.' },
  { name: 'Ifrane', arabic: 'إفران', region: 'Middle Atlas Mountains', elevation: '1,665m', lat: '33.5°N', mapLat: 33.53, mapLng: -5.11, climate: 'Mountain (oceanic-continental)', koppen: 'Csb', tempHigh: [9,11,14,16,21,27,31,31,26,20,14,10], tempLow: [-1,0,2,4,7,11,15,15,12,8,3,0], rainfall: [110,95,100,85,55,18,5,8,25,65,95,120], sunHours: [5.5,6.5,7.0,8.0,9.0,10.5,11.0,10.5,9.0,7.0,6.0,5.0], annualRain: 781, annualSun: 2800, recordHigh: 38.0, recordHighDate: 'July 2012', recordLow: -23.9, recordLowDate: '11 February 1935', note: 'Africa\'s coldest recorded temperature. −23.9°C on 11 February 1935 — colder than anything ever measured on the entire continent. Cedar forests, Barbary macaques, snow half the year.' },
  { name: 'Errachidia', arabic: 'الراشيدية', region: 'Pre-Saharan Oasis', elevation: '1,045m', lat: '31.9°N', mapLat: 31.93, mapLng: -4.43, climate: 'Desert (hot)', koppen: 'BWh', tempHigh: [17,20,24,28,33,39,42,41,35,29,22,17], tempLow: [2,4,7,11,15,19,23,23,19,13,7,3], rainfall: [10,8,12,8,5,2,1,3,8,12,10,10], sunHours: [7.0,8.0,9.0,9.5,10.5,11.0,11.0,10.5,9.5,8.0,7.0,6.5], annualRain: 89, annualSun: 3300, recordHigh: 48.5, recordHighDate: 'August 2023', recordLow: -6.0, recordLowDate: 'January 2005', note: 'Gateway to the Sahara. 42°C average high in July — the hottest sustained temperatures in Morocco. The Draa-Tafilalet region: date palms, kasbahs, and the slow creep of desert into everything.' },
]

const EXTREMES = [
  { label: 'Hottest Verified', value: '49.6°C', where: 'Marrakech', when: '17 July 2012' },
  { label: 'Hottest Reported', value: '50.4°C', where: 'Agadir-Inezgane', when: '11 August 2023' },
  { label: 'Coldest Ever (Africa)', value: '−23.9°C', where: 'Ifrane', when: '11 February 1935' },
  { label: 'Wettest City', value: '810mm/yr', where: 'Tangier', when: 'Annual average' },
  { label: 'Driest City', value: '89mm/yr', where: 'Errachidia', when: 'Annual average' },
  { label: 'Most Sunshine', value: '3,300 hrs/yr', where: 'Errachidia', when: 'Annual average' },
  { label: 'Temperature Swing', value: '73.5°C', where: 'Morocco total', when: '−23.9 to 49.6°C' },
  { label: 'Warming Trend', value: '+1.6°C', where: 'National average', when: '1990–2024' },
]

const ZONES = [
  { name: 'Atlantic Coast', cities: 'Tangier → Agadir', character: 'Mild, oceanic, foggy summers, cool sea current', rainfall: '200–810mm', range: '8–29°C' },
  { name: 'Mediterranean Coast', cities: 'Tétouan, Al Hoceima, Nador', character: 'Hot dry summers, mild wet winters, European feel', rainfall: '350–650mm', range: '10–32°C' },
  { name: 'Interior Plains', cities: 'Marrakech, Fes, Meknès', character: 'Continental extremes — no ocean buffer. Scorching summers, cold winters', rainfall: '270–550mm', range: '4–38°C' },
  { name: 'Atlas Mountains', cities: 'Ifrane, Azrou, Imlil', character: 'Snow, cedar forests, sub-zero winters. Africa\'s coldest record.', rainfall: '600–1,500mm', range: '−24–31°C' },
  { name: 'Pre-Saharan', cities: 'Ouarzazate, Errachidia, Zagora', character: 'Desert begins. Extreme diurnal range. Under 100mm rain. Date palm oases.', rainfall: '50–120mm', range: '2–42°C' },
  { name: 'True Sahara', cities: 'Erg Chebbi, M\'hamid, Tata', character: 'Hyper-arid. 40°C+ summers, near-freezing desert nights. Sand, stone, wind.', rainfall: '<50mm', range: '0–50°C' },
]

function tempColor(t: number): string {
  if (t >= 38) return C.hot; if (t >= 28) return C.warm; if (t >= 18) return C.mild; if (t >= 8) return C.cool; return C.cold
}

interface LiveWeather { temp: number; windSpeed: number; humidity: number; weatherCode: number; isDay: boolean }

function weatherDesc(code: number): string {
  if (code === 0) return 'Clear sky'; if (code <= 3) return 'Partly cloudy'; if (code <= 48) return 'Fog'
  if (code <= 57) return 'Drizzle'; if (code <= 67) return 'Rain'; if (code <= 77) return 'Snow'
  if (code <= 82) return 'Rain showers'; if (code <= 86) return 'Snow showers'; if (code >= 95) return 'Thunderstorm'; return 'Cloudy'
}

function weatherIcon(code: number, isDay: boolean): string {
  if (code === 0) return isDay ? '☀️' : '🌙'; if (code <= 3) return isDay ? '⛅' : '☁️'; if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'; if (code <= 77) return '🌨️'; if (code <= 86) return '❄️'; if (code >= 95) return '⛈️'; return '☁️'
}

function getYesterday(): string { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0] }

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

function WeatherMap({ cities, selected, onSelect, liveWeather }: { cities: City[]; selected: number; onSelect: (i: number) => void; liveWeather: Record<string, LiveWeather> }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [showSat, setShowSat] = useState(false)
  const [satDate] = useState(getYesterday)

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
        center: [-6.5, 32.0], zoom: 5.2, minZoom: 4.5, maxZoom: 9,
        attributionControl: false, pitchWithRotate: false, dragRotate: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        map.addSource('nasa-gibs', {
          type: 'raster',
          tiles: [`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${satDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`],
          tileSize: 256, attribution: 'NASA GIBS'
        })
        map.addLayer({ id: 'nasa-satellite', type: 'raster', source: 'nasa-gibs', layout: { visibility: 'none' }, paint: { 'raster-opacity': 0.92 } })
        mapRef.current = map; setMapLoaded(true)
      })
    })
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    try { mapRef.current.setLayoutProperty('nasa-satellite', 'visibility', showSat ? 'visible' : 'none') } catch {}
  }, [showSat, mapLoaded])

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    markersRef.current.forEach(m => m.remove()); markersRef.current = []
    import('mapbox-gl').then((mapboxgl) => {
      cities.forEach((c, i) => {
        const isSel = i === selected
        const live = liveWeather[c.name]
        const avgHigh = c.tempHigh.reduce((a, v) => a + v, 0) / 12
        const color = avgHigh >= 30 ? '#991B1B' : avgHigh >= 25 ? '#9A3412' : avgHigh >= 20 ? '#A16207' : '#0369A1'
        const size = isSel ? 16 : 10
        const el = document.createElement('div')
        el.style.cssText = `width:${size}px;height:${size}px;background:${isSel ? color : C.ink};border:2px solid #fff;border-radius:50%;cursor:pointer;transition:all 0.2s;opacity:${isSel ? '1' : '0.7'};box-shadow:${isSel ? `0 0 0 2px ${color}` : 'none'}`
        el.title = c.name; el.addEventListener('click', () => onSelect(i))
        const label = document.createElement('div')
        const liveText = live ? ` · ${Math.round(live.temp)}°C now` : ''
        label.style.cssText = `position:absolute;left:${size + 5}px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:${isSel ? '12px' : '10px'};font-weight:${isSel ? '700' : '500'};font-family:Inter,system-ui,sans-serif;color:${showSat ? '#fff' : (isSel ? C.ink : C.muted)};text-shadow:${showSat ? '0 1px 3px rgba(0,0,0,0.8),0 0 6px rgba(0,0,0,0.5)' : '0 0 4px #fff,0 0 4px #fff'}`
        label.textContent = `${c.name}${isSel ? liveText : ''}`
        const w = document.createElement('div'); w.style.position = 'relative'; w.appendChild(el); w.appendChild(label)
        markersRef.current.push(new mapboxgl.default.Marker({ element: w, anchor: 'center' }).setLngLat([c.mapLng, c.mapLat]).addTo(mapRef.current!))
      })
    })
  }, [mapLoaded, cities, selected, onSelect, liveWeather, showSat])

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    const c = cities[selected]; mapRef.current.flyTo({ center: [c.mapLng, c.mapLat], zoom: 7.5, duration: 800 })
  }, [selected, mapLoaded, cities])

  return (
    <div className="relative w-full">
      <div ref={mapContainer} className="w-full h-[360px] md:h-[440px]" style={{ background: '#f2f0eb' }} />
      {mapLoaded && (
        <button onClick={() => setShowSat(!showSat)}
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.08em] transition-all"
          style={{ background: showSat ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.95)', color: showSat ? '#fff' : C.ink, backdropFilter: 'blur(8px)', border: `1px solid ${showSat ? 'rgba(255,255,255,0.2)' : C.border}` }}>
          <span style={{ fontSize: '14px' }}>{showSat ? '🗺️' : '🛰️'}</span>
          {showSat ? 'Street Map' : 'See From Space'}
        </button>
      )}
      {showSat && mapLoaded && (
        <div className="absolute bottom-8 left-4 text-[9px] px-2 py-1" style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.7)' }}>
          NASA GIBS · MODIS Terra · {satDate}
        </div>
      )}
      {mapLoaded && (
        <div className="absolute top-4 right-14 p-4 max-w-[200px]" style={{ background: showSat ? 'rgba(10,10,10,0.8)' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', border: `1px solid ${showSat ? 'rgba(255,255,255,0.15)' : C.border}`, color: showSat ? '#fff' : C.ink }}>
          <p className="font-serif text-[16px] leading-tight">{cities[selected].name}</p>
          <p className="text-[11px] mt-0.5" style={{ color: showSat ? 'rgba(255,255,255,0.6)' : C.muted }}>{cities[selected].region} · {cities[selected].elevation}</p>
          <p className="text-[10px] mt-1" style={{ color: showSat ? 'rgba(255,255,255,0.5)' : C.muted }}>{cities[selected].climate}</p>
        </div>
      )}
      {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center bg-[#f2f0eb]"><p className="text-[13px] text-dwl-gray uppercase tracking-[0.08em]">Loading map...</p></div>}
    </div>
  )
}

// ═══ PAGE COMPONENT ═══
export function WeatherPortraitsContent() {
  const [selectedCity, setSelectedCity] = useState(0)
  const city = CITIES[selectedCity]
  const [liveWeather, setLiveWeather] = useState<Record<string, LiveWeather>>({})
  const [liveLoading, setLiveLoading] = useState(true)
  const [liveTime, setLiveTime] = useState('')
  const hero = useReveal(); const live = useReveal(); const radials = useReveal()
  const extremes = useReveal(); const zones = useReveal(); const notes = useReveal()

  useEffect(() => {
    const lats = CITIES.map(c => c.mapLat).join(',')
    const lngs = CITIES.map(c => c.mapLng).join(',')
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&timezone=Africa/Casablanca`)
      .then(r => r.json()).then(data => {
        const results: Record<string, LiveWeather> = {}
        const entries = Array.isArray(data) ? data : [data]
        entries.forEach((d: any, i: number) => { if (d?.current && CITIES[i]) results[CITIES[i].name] = { temp: d.current.temperature_2m, windSpeed: d.current.wind_speed_10m, humidity: d.current.relative_humidity_2m, weatherCode: d.current.weather_code, isDay: d.current.is_day === 1 } })
        setLiveWeather(results); setLiveTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Casablanca' })); setLiveLoading(false)
      }).catch(() => setLiveLoading(false))
  }, [])

  const onSelectCity = useCallback((i: number) => setSelectedCity(i), [])

  return (
    <div className="pt-16" style={{ background: '#ffffff' }}>
      <div ref={hero.ref}><section className="px-8 md:px-[8%] lg:px-[12%] pt-section pb-16">
        <p className="micro-label mb-4" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.6s' }}>Module 041</p>
        <h1 className="font-serif text-[clamp(2.8rem,7vw,4.5rem)] text-dwl-black leading-[0.95]" style={{ opacity: hero.vis ? 1 : 0, transform: hero.vis ? 'none' : 'translateY(20px)', transition: 'all 0.8s' }}>Weather <em>Portraits</em></h1>
        <p className="text-body text-dwl-body mt-6 max-w-[620px]" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.8s 0.2s' }}>Eight cities. Twelve months. One country that holds both Africa's coldest recorded temperature and some of its hottest. Morocco stretches from Atlantic fog to Saharan furnace — a 73.5°C swing contained in a single nation.</p>
      </section></div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── LIVE WEATHER ─── */}
      <div ref={live.ref}><section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="flex items-baseline gap-4 mb-2">
          <p className="micro-label">Right Now</p>
          {!liveLoading && liveTime && <div className="flex items-center gap-2"><span className="inline-block w-[6px] h-[6px] rounded-full bg-green-500 animate-pulse" /><span className="text-[11px] text-dwl-muted">{liveTime} Morocco time</span></div>}
        </div>
        <p className="text-[15px] text-dwl-gray mb-8 max-w-[500px]">Live conditions across all eight cities. Data from Open-Meteo, updated every 15 minutes.</p>
        {liveLoading ? (
          <div className="flex items-center gap-3 py-8"><div className="w-4 h-4 border-2 border-dwl-border border-t-dwl-black rounded-full animate-spin" /><span className="text-[13px] text-dwl-muted">Fetching live weather...</span></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CITIES.map((c, i) => { const w = liveWeather[c.name]; if (!w) return null; const isSel = i === selectedCity; return (
              <button key={c.name} onClick={() => setSelectedCity(i)} className="text-left p-4 transition-all" style={{ background: isSel ? C.ink : '#ffffff', color: isSel ? '#fff' : C.ink, border: `1px solid ${isSel ? C.ink : C.border}` }}>
                <div className="flex items-center justify-between"><span className="text-[12px] font-medium">{c.name}</span><span className="text-[18px]">{weatherIcon(w.weatherCode, w.isDay)}</span></div>
                <div className="font-serif text-[32px] leading-none mt-2">{Math.round(w.temp)}°</div>
                <div className="text-[11px] mt-2" style={{ color: isSel ? 'rgba(255,255,255,0.6)' : C.muted }}>{weatherDesc(w.weatherCode)}</div>
                <div className="flex gap-3 mt-2 text-[10px]" style={{ color: isSel ? 'rgba(255,255,255,0.5)' : C.muted }}><span>💨 {Math.round(w.windSpeed)} km/h</span><span>💧 {w.humidity}%</span></div>
              </button>
            ) })}
          </div>
        )}
      </section></div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── EXTREMES ─── */}
      <div ref={extremes.ref}><section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-8">National Extremes</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {EXTREMES.map((ex, i) => (<div key={i} className="border border-dwl-border p-5" style={{ opacity: extremes.vis ? 1 : 0, transform: extremes.vis ? 'none' : 'translateY(16px)', transition: `all 0.5s ${i * 0.06}s` }}>
            <div className="text-[11px] text-dwl-muted uppercase tracking-[0.06em]">{ex.label}</div>
            <div className="font-serif text-[32px] md:text-[44px] text-dwl-black leading-none mt-2">{ex.value}</div>
            <div className="text-[13px] text-dwl-gray mt-2">{ex.where}</div>
            <div className="text-[11px] text-dwl-muted mt-1">{ex.when}</div>
          </div>))}
        </div>
      </section></div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── CITY PORTRAITS ─── */}
      <div ref={radials.ref}><section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-4">City Climate Portraits</p>
        <p className="text-[15px] text-dwl-gray mb-8 max-w-[500px]">Each ring is a year. Inner circle = low temperature, outer ring = high. The colour is the heat. Toggle the satellite view to see Morocco from space today.</p>
        <div className="flex flex-wrap gap-2 mb-10">
          {CITIES.map((c, i) => { const w = liveWeather[c.name]; return (
            <button key={c.name} onClick={() => setSelectedCity(i)} className="text-[12px] px-4 py-2 transition-colors border" style={{ background: i === selectedCity ? C.ink : 'transparent', color: i === selectedCity ? '#fff' : C.muted, borderColor: i === selectedCity ? C.ink : C.border }}>
              {c.name}{w ? ` · ${Math.round(w.temp)}°` : ''}
            </button>
          ) })}
        </div>
        <div className="mb-10"><WeatherMap cities={CITIES} selected={selectedCity} onSelect={onSelectCity} liveWeather={liveWeather} /></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12" style={{ opacity: radials.vis ? 1 : 0, transition: 'opacity 0.6s' }}>
          <div className="md:col-span-7">
            <svg viewBox="0 0 600 520" className="w-full">
              <defs><radialGradient id="halo-glow"><stop offset="0%" stopColor={tempColor(Math.max(...city.tempHigh))} stopOpacity="0.08" /><stop offset="100%" stopColor={tempColor(Math.max(...city.tempHigh))} stopOpacity="0" /></radialGradient></defs>
              <circle cx="300" cy="220" r="200" fill="url(#halo-glow)" />
              {city.tempHigh.map((hi, i) => { const lo = city.tempLow[i]; const angle = (i/12)*Math.PI*2-Math.PI/2; const nextAngle = ((i+1)/12)*Math.PI*2-Math.PI/2; const mapR = (t: number) => 40+((t+25)/75)*150; const rLo = mapR(lo); const rHi = mapR(hi); const midAngle = (angle+nextAngle)/2; const path = `M ${300+rLo*Math.cos(angle)} ${220+rLo*Math.sin(angle)} A ${rLo} ${rLo} 0 0 1 ${300+rLo*Math.cos(nextAngle)} ${220+rLo*Math.sin(nextAngle)} L ${300+rHi*Math.cos(nextAngle)} ${220+rHi*Math.sin(nextAngle)} A ${rHi} ${rHi} 0 0 0 ${300+rHi*Math.cos(angle)} ${220+rHi*Math.sin(angle)} Z`; const lR = mapR(hi)+16; return (<g key={i}><path d={path} fill={tempColor(hi)} opacity={0.7} stroke="#fff" strokeWidth={0.5} /><text x={300+lR*Math.cos(midAngle)} y={220+lR*Math.sin(midAngle)} textAnchor="middle" dominantBaseline="middle" fontSize={9} fill={C.muted} fontWeight={500}>{MONTHS[i]}</text></g>) })}
              <text x="300" y="210" textAnchor="middle" fontSize={20} fontWeight={700} fill={C.ink}>{city.name}</text>
              <text x="300" y="228" textAnchor="middle" fontSize={11} fill={C.muted}>{city.arabic} · {city.elevation} · {city.koppen}</text>
              {[0,10,20,30,40].map(t => { const r = 40+((t+25)/75)*150; return (<g key={t}><circle cx="300" cy="220" r={r} fill="none" stroke={C.border} strokeWidth={0.3} strokeDasharray="2,4" /><text x={300+r+2} y={218} fontSize={7} fill="#b3b3b3">{t}°</text></g>) })}
              <text x="30" y="410" fontSize={9} fill={C.muted} fontWeight={600}>MONTHLY RAINFALL (MM)</text>
              {city.rainfall.map((mm, i) => { const barH = Math.max(1,(mm/130)*60); const x = 30+i*46; return (<g key={`r${i}`}><rect x={x} y={490-barH} width={32} height={barH} fill={C.rain} opacity={0.6} rx={1} /><text x={x+16} y={505} textAnchor="middle" fontSize={8} fill={C.muted}>{MONTHS[i]}</text>{mm > 0 && <text x={x+16} y={486-barH} textAnchor="middle" fontSize={7} fill={C.rain}>{mm}</text>}</g>) })}
              <text x="570" y="490" textAnchor="end" fontSize={11} fontWeight={600} fill={C.rain}>{city.annualRain}mm/yr</text>
            </svg>
          </div>
          <div className="md:col-span-5"><div className="space-y-6">
            {liveWeather[city.name] && <div className="p-5 border-2 border-dwl-black">
              <div className="flex items-center gap-2 mb-3"><span className="inline-block w-[6px] h-[6px] rounded-full bg-green-500 animate-pulse" /><span className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted">Live · {liveTime}</span></div>
              <div className="flex items-center justify-between"><div><div className="font-serif text-[44px] leading-none">{Math.round(liveWeather[city.name].temp)}°C</div><div className="text-[13px] text-dwl-gray mt-1">{weatherDesc(liveWeather[city.name].weatherCode)}</div></div><div className="text-[40px]">{weatherIcon(liveWeather[city.name].weatherCode, liveWeather[city.name].isDay)}</div></div>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-dwl-border"><div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">Wind</div><div className="text-[15px] text-dwl-black mt-1">{Math.round(liveWeather[city.name].windSpeed)} km/h</div></div><div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">Humidity</div><div className="text-[15px] text-dwl-black mt-1">{liveWeather[city.name].humidity}%</div></div></div>
              {(() => { const mo = new Date().getMonth(); const avg = city.tempHigh[mo]; const diff = Math.round(liveWeather[city.name].temp) - avg; return <div className="mt-3 pt-3 border-t border-dwl-border text-[12px] text-dwl-gray">Average high for {MONTHS[mo]}: {avg}°C · Currently {diff >= 0 ? '+' : ''}{diff}°C {diff >= 0 ? 'above' : 'below'} average</div> })()}
            </div>}
            <div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-1">Region</div><div className="text-[15px] text-dwl-black">{city.region}</div></div>
            <div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-1">Climate Classification</div><div className="text-[15px] text-dwl-black">{city.climate}</div></div>
            <div className="grid grid-cols-2 gap-4"><div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-1">Latitude</div><div className="text-[15px] text-dwl-black">{city.lat}</div></div><div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-1">Elevation</div><div className="text-[15px] text-dwl-black">{city.elevation}</div></div></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-dwl-border p-4"><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-1">Record High</div><div className="font-serif text-[28px] leading-none" style={{ color: C.hot }}>{city.recordHigh}°C</div><div className="text-[11px] text-dwl-muted mt-1">{city.recordHighDate}</div></div>
              <div className="border border-dwl-border p-4"><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-1">Record Low</div><div className="font-serif text-[28px] leading-none" style={{ color: C.cold }}>{city.recordLow}°C</div><div className="text-[11px] text-dwl-muted mt-1">{city.recordLowDate}</div></div>
            </div>
            <div className="grid grid-cols-2 gap-4"><div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-1">Annual Rainfall</div><div className="text-[18px] font-semibold" style={{ color: C.rain }}>{city.annualRain}mm</div></div><div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-1">Annual Sunshine</div><div className="text-[18px] font-semibold" style={{ color: C.sun }}>{city.annualSun.toLocaleString()} hrs</div></div></div>
            <div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-2">Sunshine Hours by Month</div><div className="flex items-end gap-1" style={{ height: 40 }}>{city.sunHours.map((h, i) => (<div key={i} className="flex-1 flex flex-col items-center"><div style={{ height: `${(h/12)*36}px`, background: C.sun, opacity: 0.6, width: '100%', borderRadius: 1 }} /><span className="text-[7px] text-dwl-muted mt-0.5">{h}</span></div>))}</div></div>
            <div className="border-t border-dwl-border pt-4"><p className="text-[13px] text-dwl-gray leading-relaxed italic">{city.note}</p></div>
          </div></div>
        </div>
      </section></div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── CLIMATE ZONES ─── */}
      <div ref={zones.ref}><section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-4">Six Climate Zones in One Country</p>
        <p className="text-[15px] text-dwl-gray mb-10 max-w-[540px]">Most countries have one or two climate zones. Morocco has six — from the Mediterranean coast to the true Sahara, a journey of 1,000km and 73.5°C of temperature range.</p>
        <div className="space-y-0">{ZONES.map((z, i) => (<div key={i} className="border-b border-dwl-border py-8 grid grid-cols-1 md:grid-cols-12 gap-6" style={{ opacity: zones.vis ? 1 : 0, transform: zones.vis ? 'none' : 'translateY(12px)', transition: `all 0.5s ${i*0.08}s` }}>
          <div className="md:col-span-1"><span className="text-[11px] text-dwl-muted tabular-nums">{String(i+1).padStart(2,'0')}</span></div>
          <div className="md:col-span-3"><div className="font-serif text-[20px] text-dwl-black">{z.name}</div><div className="text-[12px] text-dwl-muted mt-1">{z.cities}</div></div>
          <div className="md:col-span-5"><p className="text-[14px] text-dwl-gray leading-relaxed">{z.character}</p></div>
          <div className="md:col-span-3 grid grid-cols-2 gap-4"><div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">Rainfall</div><div className="text-[13px] text-dwl-black mt-1">{z.rainfall}</div></div><div><div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">Range</div><div className="text-[13px] text-dwl-black mt-1">{z.range}</div></div></div>
        </div>))}</div>
      </section></div>

      {/* ─── READING NOTES ─── */}
      <div ref={notes.ref}><section className="bg-[#f5f5f5]"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-8">Reading Notes</p>
        <div className="space-y-10 max-w-[640px]">
          <div style={{ opacity: notes.vis ? 1 : 0, transition: 'opacity 0.6s' }}><h3 className="font-serif text-[22px] text-dwl-black">The 73.5°C Country</h3><p className="text-[15px] text-dwl-gray leading-relaxed mt-3">Africa's coldest recorded temperature belongs to Morocco: −23.9°C at Ifrane, 11 February 1935. A mountain town at 1,665m in the <span className="underline underline-offset-2">Middle Atlas</span>, covered in snow half the year. Morocco's hottest verified temperature: 49.6°C at Marrakech, 17 July 2012. Between these two numbers: 73.5°C. A single country that spans the full thermal range of an entire continent.</p></div>
          <div style={{ opacity: notes.vis ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}><h3 className="font-serif text-[22px] text-dwl-black">The Canary Current</h3><p className="text-[15px] text-dwl-gray leading-relaxed mt-3">A cold ocean current flows south along Morocco's <span className="underline underline-offset-2">Atlantic coast</span>, creating summer fog from Essaouira to Agadir. The paradox: the sea is colder in the south than the north. Agadir — at latitude 30°N, nearly Saharan — stays cooler than Tangier in summer. This current is why Morocco's Atlantic coast feels like California, not like the desert 100km inland.</p></div>
          <div style={{ opacity: notes.vis ? 1 : 0, transition: 'opacity 0.6s 0.4s' }}><h3 className="font-serif text-[22px] text-dwl-black">The Chergui</h3><p className="text-[15px] text-dwl-gray leading-relaxed mt-3">The Saharan wind. In Arabic, chergui (شرقي) means "eastern." It blows from the desert across the Atlas Mountains, sometimes arriving without warning. In Marrakech, a chergui episode can raise temperatures 10–15°C in a single afternoon. In Casablanca, it pushes above 40°C — a city that normally never exceeds 28°C. The chergui is why Morocco's record highs are always so much higher than its averages.</p></div>
        </div>
      </div></section></div>

      {/* ─── CLOSING ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <blockquote className="font-serif text-[clamp(1.3rem,3.5vw,1.8rem)] text-dwl-black leading-[1.4] max-w-[680px]">"Ifrane and Errachidia are 200 kilometres apart. One holds Africa's coldest recorded temperature. The other regularly exceeds 42°C. Between them: the Atlas Mountains — a wall of rock that separates two climates, two ecosystems, two ways of living. Morocco is not one weather. It is six, stacked vertically."</blockquote>
      </section>

      {/* ─── SOURCES ─── */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="border-t border-dwl-border"><div style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
        <p className="micro-label mb-4">Sources & Attribution</p>
        <p className="text-[12px] text-dwl-muted leading-relaxed max-w-[640px]">Temperature and rainfall averages: Climates to Travel (WMO 1991–2020 normals); climate-data.org (1991–2021); Weather Spark. Record temperatures: Ifrane −23.9°C (11 Feb 1935): Wikipedia/Ifrane; Current Results Africa extremes. Marrakech 49.6°C (17 Jul 2012): Weather Underground (Christopher C. Burt). Agadir-Inezgane 50.4°C (11 Aug 2023): Morocco World News; disputed/unverified. Köppen classifications: Wikipedia/Climate of Morocco. Sunshine hours: worlddata.info; weather-and-climate.com. Warming trend (+1.6°C 1990–2024): worlddata.info (German Weather Service archives). Climate zones: Encyclopedia of the Environment (Hanchane Mohamed, 2025). Live weather: Open-Meteo API (open-meteo.com). Satellite imagery: NASA Global Imagery Browse Services (GIBS), MODIS Terra Corrected Reflectance. All data editorial estimates unless otherwise sourced.</p>
        <p className="text-[11px] text-dwl-muted mt-4">© Slow Morocco · slowmorocco.com · Data may not be reproduced without attribution.</p>
      </div></section>
    </div>
  )
}
