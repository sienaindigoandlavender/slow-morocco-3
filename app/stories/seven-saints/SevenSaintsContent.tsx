'use client'

import { useState, useEffect, useRef } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

// ═══ PALETTE — sacred greens, stone, gold ═══
const C = {
  sacred: '#2D6E4F', gold: '#C8A415', tomb: '#8B6E4E', stone: '#B8A99A',
  sky: '#7BA7BC', warm: '#C17F28', deep: '#1A3C2A', night: '#0F1D15',
  ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
  route: '#C8A415',
}

// ═══ THE SEVEN SAINTS ═══
interface Saint {
  name: string
  arabic: string
  aka: string
  died: number
  born: string
  day: string
  dayNum: number // 1=Tue (first stop) to 7=Mon (last stop)
  lat: number
  lng: number
  location: string
  gate: string
  type: string
  domain: string
  story: string
  architecture: string
  ritual: string
  access: string
}

const SAINTS: Saint[] = [
  {
    name: 'Sidi Yusuf ibn Ali',
    arabic: 'سيدي يوسف بن علي',
    aka: 'Sidi Youssef Ben Ali',
    died: 1196,
    born: 'Marrakech',
    day: 'Tuesday',
    dayNum: 1,
    lat: 31.6135,
    lng: -7.9780,
    location: 'Outside Bab Aghmat, southeastern medina',
    gate: 'Bab Aghmat',
    type: 'Zawiya',
    domain: 'Patron of the sick and outcast',
    story: 'A leper and Sufi ascetic who lived outside the city walls because his disease barred him from entering. He turned exile into devotion, teaching from the margins. His zawiya became a refuge for the marginalized — the sick, the poor, those the city forgot. The pilgrimage begins here because the spiritual journey starts with humility.',
    architecture: 'Simple zawiya outside the medina walls. Less ornate than the central shrines. The modesty is the point.',
    ritual: 'Pilgrims begin the ziyara here at dawn on Tuesday. The southeastern starting point means the week-long circuit moves counterclockwise around the city — mirroring the tawaf around the Kaaba in Mecca.',
    access: 'Non-Muslims cannot enter. Visible from outside.',
  },
  {
    name: 'Qadi Iyyad',
    arabic: 'القاضي عياض',
    aka: 'Qadi Ayyad ibn Musa',
    died: 1149,
    born: 'Ceuta',
    day: 'Wednesday',
    dayNum: 2,
    lat: 31.6295,
    lng: -7.9830,
    location: 'Near Bab Aylan, eastern medina',
    gate: 'Bab Aylan',
    type: 'Mausoleum',
    domain: 'Patron of scholars and jurists',
    story: 'The oldest of the seven. Born in Ceuta, he was the leading Maliki jurist of the Almoravid era and author of al-Shifa, a treatise on the Prophet that is still studied across the Muslim world. He was exiled to Marrakech by the Almohads and died here. His caretaker offers prayers for visitors — and they are said to be answered.',
    architecture: 'Nondescript from outside. Green pyramid roof visible above residential buildings. Easy to walk past without noticing. The woman who baked his bread, Lalla Mahalla, is buried near the entrance.',
    ritual: 'Wednesday. Pilgrims enter the city proper for the first time. Students pray here before exams. The zawiya caretaker offers a lengthy dua for visitors.',
    access: 'One of the few zawiyas where non-Muslims have occasionally been admitted. Ask respectfully at the door.',
  },
  {
    name: 'Sidi Bel Abbes',
    arabic: 'سيدي بلعباس',
    aka: 'Abu al-Abbas as-Sabti',
    died: 1204,
    born: 'Ceuta',
    day: 'Thursday',
    dayNum: 3,
    lat: 31.6390,
    lng: -7.9895,
    location: 'North of Bab Taghzout, northern medina',
    gate: 'Bab Taghzout / Bab el-Khemis',
    type: 'Zawiya complex',
    domain: 'Patron saint of Marrakech. Patron of the blind and the poor.',
    story: 'The central figure of the seven. Born in Ceuta in 1129, he came to Marrakech during the Almohad siege and spent 40 years on Jbel Gueliz in solitary devotion. His doctrine was radical simplicity: compel the rich to give to the poor. He became patron of the blind, and food is still distributed at his tomb daily. His zawiya grew so popular it attracted an entire neighborhood outside the walls — which the city eventually absorbed.',
    architecture: 'The largest and most elaborate complex. Saadian mosque and minaret (1605), madrasa, hospice, asylum, qaysariyya (covered market street leading to the entrance). Mausoleum has a green pyramid roof, zellij tiling, carved stucco, stained glass, painted wood cupola. Rebuilt by Moulay Ismail in the early 18th century.',
    ritual: 'Thursday. The emotional center of the pilgrimage. Pilgrims exit through Bab Aylan and circle to the northern medina. Food distribution continues to this day. Commerce flourishes around the complex — Sidi Bel Abbes is also patron of merchants.',
    access: 'Non-Muslims cannot enter the mausoleum. The outer courtyards and market street are accessible.',
  },
  {
    name: 'Sidi Ben Slimane al-Jazuli',
    arabic: 'سيدي محمد بن سليمان الجزولي',
    aka: 'Imam al-Jazuli',
    died: 1465,
    born: 'Sous region (near Agadir)',
    day: 'Friday',
    dayNum: 4,
    lat: 31.6370,
    lng: -7.9880,
    location: 'South of Sidi Bel Abbes, near Riad Laarous',
    gate: 'Northern medina interior',
    type: 'Zawiya',
    domain: 'Author of Dala\'il al-Khayrat. Patron of devotional practice.',
    story: 'Author of Dala\'il al-Khayrat (Guides to Good Deeds), the most widely read book of prayers on the Prophet after the Quran itself. A Jazula Berber from the Sous, he died suddenly while praying in Essaouira at age 75. The Saadians transferred his body to Marrakech in 1523 to claim his baraka. His prayer book has been copied, illustrated, and recited across the Muslim world for five centuries.',
    architecture: 'Zawiya of Sidi Ben Slimane. Located in the dense northern medina south of Sidi Bel Abbes. The proximity of these two saints creates a sacred corridor through the northern quarter.',
    ritual: 'Friday — the holiest day of the week. His zawiya is visited by those seeking spiritual discipline. The Dala\'il al-Khayrat is still recited here daily.',
    access: 'Non-Muslims cannot enter.',
  },
  {
    name: 'Sidi Abd al-Aziz at-Tabba',
    arabic: 'سيدي عبد العزيز التباع',
    aka: 'Sidi Abdelaziz / al-Harrar (The Silk Merchant)',
    died: 1508,
    born: 'Marrakech',
    day: 'Saturday',
    dayNum: 5,
    lat: 31.6340,
    lng: -7.9905,
    location: 'North of Mouassine Mosque, Hay el-Qebbabin',
    gate: 'Central medina, near Ben Youssef',
    type: 'Zawiya',
    domain: 'Patron of science, alchemy, and healing',
    story: 'Born illiterate in Marrakech, he worked as a silk merchant (al-Harrar) before al-Jazuli recognized his potential and called him "The Alchemist." He studied 8 years in Fes before returning to build his zawiya. Women bring padlocks to close a window inside — the locks stay shut until their wishes are granted. He bridged two Sufi orders and advanced Islamic mysticism and science.',
    architecture: 'Zellige tiles in the Fassi style, a traditional arched entrance with wooden eaves. Located in the Hay el-Qebbabin (Nejjarin) quarter, a neighborhood of turners and woodworkers.',
    ritual: 'Saturday. Visited by those seeking healing — especially for skin diseases, eye ailments, and baldness. The padlock ritual makes this the most physically interactive of the seven shrines.',
    access: 'Non-Muslims cannot enter.',
  },
  {
    name: 'Sidi Abdallah al-Ghazwani',
    arabic: 'سيدي عبد الله الغزواني',
    aka: 'Moulay el-Ksour',
    died: 1528,
    born: 'Ghazwane tribe (Fes region)',
    day: 'Sunday',
    dayNum: 6,
    lat: 31.6265,
    lng: -7.9920,
    location: 'Near Mouassine Mosque, northwest of Jemaa el-Fna',
    gate: 'Central-western medina',
    type: 'Zawiya',
    domain: 'Patron of resistance and water engineering',
    story: 'A disciple of Sidi Abdelaziz who became so powerful he threatened the Marinid dynasty — and predicted its end. The sultan imprisoned him. When freed, he returned to Marrakech and built a zawiya in the El Ksour neighborhood. He also specialized in hydraulic engineering, constructing channels and sinking wells. A mystic who got his hands dirty.',
    architecture: 'In the Derb Azouz area of the Mouassine quarter. The zawiya blends into the residential fabric of one of the medina\'s most atmospheric neighborhoods.',
    ritual: 'Sunday. Pilgrims are now deep in the western medina, approaching the circuit\'s end. Al-Ghazwani\'s defiance of power makes this stop resonate with those facing worldly injustice.',
    access: 'Non-Muslims cannot enter.',
  },
  {
    name: 'Sidi al-Suhayli',
    arabic: 'سيدي السهيلي',
    aka: 'Imam al-Suhayli / Imam Souheili',
    died: 1185,
    born: 'Málaga, Al-Andalus',
    day: 'Monday',
    dayNum: 7,
    lat: 31.6175,
    lng: -7.9960,
    location: 'Cemetery outside Bab er-Robb, southwestern medina',
    gate: 'Bab er-Robb',
    type: 'Mausoleum in cemetery',
    domain: 'Patron of students and legal scholarship',
    story: 'Born blind in Málaga during the Al-Andalus period. Despite this, he memorized the Quran, became fluent in Arabic (Spanish was his native tongue), and mastered Islamic law. He crossed the strait to Morocco and built a reputation as a hadith commentator. His tomb in the cemetery outside Bab er-Robb is the most difficult to reach — the pilgrimage ends at the city\'s southwestern edge, where the walls meet the cemetery and the mountains begin beyond.',
    architecture: 'Green-roofed mausoleum visible across the cemetery but accessible only through it. The cemetery is closed to non-Muslims. Police guard the entrance.',
    ritual: 'Monday. The circuit closes. The pilgrimage ends where the city ends — at the wall, facing the Atlas Mountains. Seven days. Seven tombs. One counterclockwise circle.',
    access: 'Muslim cemetery. Non-Muslims cannot enter. Visible from a distance near Bab er-Robb.',
  },
]

// ═══ PILGRIMAGE ROUTE (counterclockwise) ═══
const ROUTE_COORDS: [number, number][] = SAINTS.map(s => [s.lng, s.lat])

// ═══ CITY GATES referenced ═══
interface Gate {
  name: string; arabic: string; lat: number; lng: number; era: string
}
const GATES: Gate[] = [
  { name: 'Bab Aghmat', arabic: 'باب أغمات', lat: 31.6150, lng: -7.9755, era: 'Almohad, 12th c.' },
  { name: 'Bab Aylan', arabic: 'باب أيلان', lat: 31.6310, lng: -7.9790, era: 'Almohad, 12th c.' },
  { name: 'Bab el-Khemis', arabic: 'باب الخميس', lat: 31.6430, lng: -7.9870, era: 'Almohad, 12th c.' },
  { name: 'Bab Taghzout', arabic: 'باب تاغزوت', lat: 31.6380, lng: -7.9910, era: 'Almohad, 12th c.' },
  { name: 'Bab er-Robb', arabic: 'باب الروب', lat: 31.6155, lng: -7.9970, era: 'Almohad, 12th c.' },
  { name: 'Bab Doukkala', arabic: 'باب دكالة', lat: 31.6350, lng: -8.0050, era: 'Almohad. 7 Saints monument here (2005)' },
]

// ═══ LANDMARKS for context ═══
interface Landmark { name: string; lat: number; lng: number }
const LANDMARKS: Landmark[] = [
  { name: 'Jemaa el-Fna', lat: 31.6258, lng: -7.9891 },
  { name: 'Koutoubia Mosque', lat: 31.6240, lng: -7.9934 },
  { name: 'Ben Youssef Madrasa', lat: 31.6340, lng: -7.9870 },
  { name: 'Bahia Palace', lat: 31.6218, lng: -7.9829 },
  { name: 'Saadian Tombs', lat: 31.6175, lng: -7.9920 },
]

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

// ═══ MAP COMPONENT ═══
function SaintsMap({ selected, onSelect }: { selected: number | null; onSelect: (i: number) => void }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapboxgl = (window as any).mapboxgl
    if (!mapboxgl) return

    const m = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-7.989, 31.628],
      zoom: 13.8,
      accessToken: MAPBOX_TOKEN,
      attributionControl: false,
    })

    m.addControl(new mapboxgl.NavigationControl(), 'top-right')
    m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    m.on('load', () => {
      // Pilgrimage route — dashed gold line
      const routeCoords = [...ROUTE_COORDS, ROUTE_COORDS[0]] // close the circuit
      m.addSource('route', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: routeCoords } }
      })
      m.addLayer({
        id: 'route-line', type: 'line', source: 'route',
        paint: { 'line-color': C.route, 'line-width': 2.5, 'line-opacity': 0.6, 'line-dasharray': [3, 2] }
      })

      // Direction arrows along route
      m.addLayer({
        id: 'route-arrows', type: 'symbol', source: 'route',
        layout: { 'symbol-placement': 'line', 'symbol-spacing': 80, 'text-field': '→', 'text-size': 16, 'text-rotate': 0, 'text-allow-overlap': true },
        paint: { 'text-color': C.route, 'text-opacity': 0.5 }
      })

      // Gate markers
      GATES.forEach(g => {
        const el = document.createElement('div')
        el.style.cssText = `width:8px;height:8px;background:${C.stone};border-radius:1px;border:1px solid ${C.muted};opacity:0.6;transform:rotate(45deg);`
        el.title = g.name
        new mapboxgl.Marker({ element: el }).setLngLat([g.lng, g.lat]).addTo(m)
      })

      // Landmark dots
      LANDMARKS.forEach(l => {
        const el = document.createElement('div')
        el.style.cssText = `width:5px;height:5px;background:${C.muted};border-radius:50%;opacity:0.4;`
        el.title = l.name
        new mapboxgl.Marker({ element: el }).setLngLat([l.lng, l.lat]).addTo(m)
      })

      // Saint markers
      SAINTS.forEach((s, i) => {
        const el = document.createElement('div')
        const size = 28
        el.style.cssText = `
          width:${size}px;height:${size}px;border-radius:50%;
          background:${C.sacred};border:3px solid ${C.gold};
          display:flex;align-items:center;justify-content:center;
          font-size:13px;font-weight:700;color:${C.gold};
          cursor:pointer;transition:all 0.3s;
          box-shadow:0 2px 8px rgba(0,0,0,0.2);
          font-family:ui-monospace,monospace;
        `
        el.textContent = String(s.dayNum)
        el.addEventListener('click', () => onSelect(i))
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.3)'
          el.style.boxShadow = `0 0 16px ${C.gold}40`
        })
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)'
          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)'
        })
        const marker = new mapboxgl.Marker({ element: el }).setLngLat([s.lng, s.lat]).addTo(m)
        markersRef.current.push(marker)
      })
    })

    map.current = m
    return () => m.remove()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fly to selected saint
  useEffect(() => {
    if (selected !== null && map.current) {
      const s = SAINTS[selected]
      map.current.flyTo({ center: [s.lng, s.lat], zoom: 15.5, duration: 1200 })
      // Highlight selected marker
      markersRef.current.forEach((m, i) => {
        const el = m.getElement()
        if (i === selected) {
          el.style.background = C.gold
          el.style.color = C.deep
          el.style.transform = 'scale(1.4)'
          el.style.boxShadow = `0 0 20px ${C.gold}60`
        } else {
          el.style.background = C.sacred
          el.style.color = C.gold
          el.style.transform = 'scale(1)'
          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)'
        }
      })
    }
  }, [selected])

  return (
    <div ref={mapContainer} className="w-full rounded-sm" style={{ height: '520px' }} />
  )
}

// ═══ DAY INDICATOR ═══
function getCurrentDay() {
  const jsDay = new Date().getDay() // 0=Sun
  // Pilgrimage days: Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6, Mon=7
  const dayMap: Record<number, number> = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6, 1: 7 }
  return dayMap[jsDay] || 0
}

// ═══ MAIN COMPONENT ═══
export function SevenSaintsContent() {
  const [selected, setSelected] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const heroR = useReveal()
  const mapR = useReveal()
  const detailR = useReveal()

  const todayDayNum = getCurrentDay()
  const todaySaint = SAINTS.find(s => s.dayNum === todayDayNum)

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('mapbox-gl-script')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
      document.head.appendChild(link)
      const script = document.createElement('script')
      script.id = 'mapbox-gl-script'
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.js'
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else {
      setMapLoaded(true)
    }
  }, [])

  const selectedSaint = selected !== null ? SAINTS[selected] : null

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 058 · Sacred Geography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Sab&apos;atou Rijāl</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            The Seven Men of Marrakech
          </p>
        </div>

        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Marrakech is called the City of Seven Men. Not seven saints — Islam doesn&apos;t
          have saints. Seven <em>awliya</em>: people God blessed with a significance the
          living can still feel. Their tombs form a pilgrimage circuit that spirals
          counterclockwise through the <span className="underline underline-offset-2">medina</span> — southeast to southwest, Tuesday to Monday —
          mirroring the circumambulation of the Kaaba in Mecca. The tradition was invented
          by Sultan Moulay Ismail in the late 17th century, but the men themselves span
          four centuries, from a blind <span className="underline underline-offset-2">Andalusi</span> scholar to a silk merchant called The Alchemist.
        </p>

        {/* Live day indicator */}
        {todaySaint && (
          <div className="mt-8 flex items-start gap-3 p-4" style={{ background: `${C.sacred}08`, borderLeft: `3px solid ${C.sacred}` }}>
            <span className="inline-block w-[8px] h-[8px] rounded-full mt-1 animate-pulse shrink-0" style={{ background: C.sacred }} />
            <div>
              <span className="font-mono text-[11px] font-semibold" style={{ color: C.sacred }}>
                {todaySaint.day} — {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <p className="text-[12px] mt-1" style={{ color: C.text }}>
                Today is {todaySaint.day}. On the ziyara, pilgrims would visit <strong>{todaySaint.name}</strong> — {todaySaint.domain.toLowerCase()}.
              </p>
            </div>
          </div>
        )}

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '7', l: 'tombs in the circuit', c: C.sacred },
            { v: '7', l: 'days, Tue to Mon', c: C.gold },
            { v: '379', l: 'years span (1149–1528)', c: C.tomb },
            { v: '200+', l: 'total awliya in Marrakech', c: C.muted },
          ].map((n, i) => (
            <div key={i} className="transition-all duration-700" style={{ opacity: heroR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}>
                <span className="text-[28px] font-bold">{n.v}</span>
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PILGRIMAGE MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-8">
        <div ref={mapR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.sacred }}>The Ziyara Circuit</p>
          <p className="text-[12px] mb-4" style={{ color: C.muted }}>
            Counterclockwise through the medina. Numbered by pilgrimage day. Gold dashed line traces the route. Click a marker for details.
          </p>

          <div className="relative">
            {mapLoaded && <SaintsMap selected={selected} onSelect={setSelected} />}

            {/* Selected saint detail overlay */}
            {selectedSaint && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[380px] p-5 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg"
                style={{ borderLeft: `3px solid ${C.gold}` }}>
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-[11px] hover:opacity-60" style={{ color: C.muted }}>✕</button>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-mono" style={{ background: C.gold, color: C.deep }}>{selectedSaint.dayNum}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: C.sacred }}>{selectedSaint.day}</span>
                </div>
                <h3 className="font-serif text-[20px] leading-tight">{selectedSaint.name}</h3>
                <p className="font-mono text-[13px] mt-0.5" style={{ color: C.muted, direction: 'rtl' }}>{selectedSaint.arabic}</p>
                <p className="text-[11px] mt-1" style={{ color: C.warm }}>{selectedSaint.domain}</p>
                <p className="text-[12px] mt-3 leading-[1.6]" style={{ color: C.text }}>{selectedSaint.story}</p>
                <div className="mt-3 pt-3 border-t" style={{ borderColor: C.border }}>
                  <p className="text-[11px]" style={{ color: C.muted }}>
                    <span className="font-mono font-semibold">d. {selectedSaint.died}</span> · Born: {selectedSaint.born} · Near {selectedSaint.gate}
                  </p>
                  <p className="text-[11px] mt-1" style={{ color: C.muted }}>{selectedSaint.access}</p>
                </div>
              </div>
            )}
          </div>

          {/* Day selector strip */}
          <div className="flex gap-1 mt-4 overflow-x-auto">
            {SAINTS.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className="flex-1 min-w-[100px] p-3 text-left transition-all duration-300 hover:opacity-80"
                style={{
                  background: selected === i ? C.sacred : `${C.sacred}06`,
                  color: selected === i ? 'white' : C.ink,
                  borderBottom: todayDayNum === s.dayNum ? `2px solid ${C.gold}` : '2px solid transparent',
                }}>
                <span className="font-mono text-[9px] uppercase tracking-wider block" style={{ color: selected === i ? `${C.gold}` : C.muted }}>
                  {s.day}
                  {todayDayNum === s.dayNum && ' ●'}
                </span>
                <span className="text-[11px] font-semibold block mt-0.5 truncate">{s.name.replace('Sidi ', '').replace('Qadi ', '')}</span>
                <span className="font-mono text-[9px] block mt-0.5" style={{ color: selected === i ? 'rgba(255,255,255,0.6)' : C.muted }}>d. {s.died}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE SEVEN PROFILES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={detailR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: C.sacred }}>The Seven Men — In Pilgrimage Order</p>

          <div className="space-y-8">
            {SAINTS.map((s, i) => (
              <div key={i} className="grid md:grid-cols-[60px_1fr] gap-4 transition-all duration-700"
                style={{ opacity: detailR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
                {/* Day number */}
                <div className="flex md:flex-col items-center md:items-end gap-2 md:gap-1 md:pt-1">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold font-mono"
                    style={{ background: todayDayNum === s.dayNum ? C.gold : `${C.sacred}10`, color: todayDayNum === s.dayNum ? C.deep : C.sacred }}>
                    {s.dayNum}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>{s.day}</span>
                </div>

                {/* Content */}
                <div className="border-l pl-6" style={{ borderColor: todayDayNum === s.dayNum ? C.gold : C.border }}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-serif text-[22px] leading-tight cursor-pointer hover:opacity-70 transition-opacity"
                      onClick={() => setSelected(i)}>
                      {s.name}
                    </h3>
                    <span className="font-mono text-[12px]" style={{ color: C.muted, direction: 'rtl' }}>{s.arabic}</span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <span className="text-[11px]" style={{ color: C.warm }}>{s.domain}</span>
                    <span className="font-mono text-[11px]" style={{ color: C.muted }}>d. {s.died} · {s.born}</span>
                  </div>

                  <p className="text-[12px] leading-[1.7] mt-3 max-w-[600px]" style={{ color: C.text }}>{s.story}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: C.sacred }}>Architecture</p>
                      <p className="text-[11px] leading-[1.6]" style={{ color: C.muted }}>{s.architecture}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: C.gold }}>Ritual</p>
                      <p className="text-[11px] leading-[1.6]" style={{ color: C.muted }}>{s.ritual}</p>
                    </div>
                  </div>

                  <p className="text-[10px] mt-3 italic" style={{ color: C.muted }}>{s.access}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE PATTERN ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.sacred }}>The Pattern</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="font-mono text-[11px] font-semibold mb-2" style={{ color: C.ink }}>The Counterclockwise Circuit</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The ziyara spirals counterclockwise: southeast → north → west → southwest. This
                mirrors the tawaf — the circumambulation of the Kaaba in Mecca. The direction
                was deliberate. Moulay Ismail wanted Marrakech to echo the holiest site in Islam.
                Pilgrims who couldn&apos;t afford the hajj could walk their own sacred circle.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold mb-2" style={{ color: C.ink }}>The Political Invention</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The pilgrimage didn&apos;t evolve organically. It was manufactured in the 1680s by
                Sultan Moulay Ismail to counter the popularity of the Regraga Berber saints near
                Essaouira. He chose mostly Arab saints to balance Berber spiritual influence. He
                asked the scholar al-Yusi to legitimate the new tradition. It worked. &quot;The Seven
                Men&quot; became another name for Marrakech itself.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold mb-2" style={{ color: C.ink }}>The Teacher–Student Chain</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Four of the seven are connected by a chain of transmission. Al-Jazuli (d. 1465)
                taught Sidi Abdelaziz (d. 1508), who taught al-Ghazwani (d. 1528). And Sidi Bel
                Abbes (d. 1204) studied under a student of Qadi Iyyad (d. 1149). The seven are
                not random selections — they&apos;re nodes in a Sufi knowledge network that spans
                the 12th to 16th centuries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SVG CIRCUIT DIAGRAM ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.gold }}>The Week</p>

          <div className="flex justify-center">
            <svg viewBox="0 0 500 500" className="w-full max-w-[420px]">
              {/* Central text */}
              <text x="250" y="240" textAnchor="middle" fontFamily="serif" fontSize="18" fontStyle="italic" fill={C.ink}>Sab&apos;atou Rijāl</text>
              <text x="250" y="260" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={C.muted}>سبعة رجال</text>
              <text x="250" y="280" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={C.muted}>The Ziyara Circuit</text>

              {/* Circuit ring */}
              {SAINTS.map((s, i) => {
                const angle = (i / 7) * Math.PI * 2 - Math.PI / 2 // start at top
                const r = 190
                const x = 250 + r * Math.cos(angle)
                const y = 250 + r * Math.sin(angle)
                const isToday = todayDayNum === s.dayNum
                const isSel = selected === i

                // Line to next
                const nextI = (i + 1) % 7
                const nextAngle = (nextI / 7) * Math.PI * 2 - Math.PI / 2
                const nx = 250 + r * Math.cos(nextAngle)
                const ny = 250 + r * Math.sin(nextAngle)

                return (
                  <g key={i} onClick={() => setSelected(i)} style={{ cursor: 'pointer' }}>
                    {/* Connecting arc dashed */}
                    <line x1={x} y1={y} x2={nx} y2={ny} stroke={C.gold} strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
                    {/* Node */}
                    <circle cx={x} cy={y} r={isSel ? 24 : isToday ? 22 : 18} fill={isSel ? C.gold : isToday ? C.sacred : 'white'}
                      stroke={isToday ? C.gold : C.sacred} strokeWidth={isToday ? 2.5 : 1.5}>
                      {isToday && <animate attributeName="r" values="22;24;22" dur="2s" repeatCount="indefinite" />}
                    </circle>
                    {/* Day number */}
                    <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fontFamily="monospace" fontSize="12" fontWeight="700"
                      fill={isSel ? C.deep : isToday ? 'white' : C.sacred}>{s.dayNum}</text>
                    {/* Name label */}
                    {(() => {
                      const labelR = 230
                      const lx = 250 + labelR * Math.cos(angle)
                      const ly = 250 + labelR * Math.sin(angle)
                      const shortName = s.name.replace('Sidi ', '').replace('Qadi ', '').replace(' al-Jazuli', '').replace(' at-Tabba', '').replace(' al-Ghazwani', '').replace(' al-Suhayli', '')
                      return (
                        <>
                          <text x={lx} y={ly - 6} textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight={isSel ? '700' : '400'}
                            fill={isSel ? C.ink : isToday ? C.sacred : C.text}>{shortName}</text>
                          <text x={lx} y={ly + 6} textAnchor="middle" fontFamily="monospace" fontSize="7" fill={C.muted}>{s.day}</text>
                        </>
                      )
                    })()}
                  </g>
                )
              })}

              {/* Counterclockwise arrow indicator */}
              <text x="250" y="310" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={C.muted}>↺ counterclockwise</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Reading Notes</p>

          <div className="space-y-4 max-w-[600px]">
            <div>
              <p className="font-mono text-[11px] font-semibold" style={{ color: C.ink }}>Not saints</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Islam doesn&apos;t canonize saints. The Arabic word is <em>wali</em> (plural <em>awliya</em>) —
                someone close to God, blessed with significance. The English &quot;seven saints&quot; is a
                mistranslation that stuck. Moroccans say <em>sab&apos;atou rijāl</em> — seven men.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold" style={{ color: C.ink }}>None are from Marrakech</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Almost none were born here. Ceuta, Málaga, the Sous, Fes — they came from everywhere.
                Several had their bodies transferred to Marrakech long after death by sultans
                wanting to claim their baraka. Al-Jazuli was moved from Essaouira 58 years
                after he died. The seven are political as much as spiritual.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold" style={{ color: C.ink }}>The locked wishes</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                At the tomb of Sidi Abdelaziz, women bring padlocks. They lock a window in the
                zawiya and keep the key. The lock stays shut until the wish is granted. The
                window is covered in locks. Some have been there for years.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold" style={{ color: C.ink }}>Bab Doukkala monument</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                In 2005, the city inaugurated seven towers outside Bab Doukkala — the Place des
                Sept Saints. No signage explains what they are. Seven silent columns standing
                outside the medina wall. Most tourists walk past without knowing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sources: Deverdun, Gaston. <em>Marrakech: des origines à 1912</em>. Éditions Techniques Nord-Africaines, 1959.
            Wikipedia contributors. &quot;Seven Saints of Marrakesh.&quot; Wikipedia.
            Parker, Richard. <em>A Practical Guide to Islamic Monuments in Morocco</em>. Baraka Press, 1981.
            Salmon, Georges. &quot;Les Sept Patrons de Marrakech.&quot; <em>Archives Marocaines</em>, Vol. 3, 1905.
            Epton, Nina. <em>Saints and Sorcerers</em>. Cassell & Company, 1958.
            BirdLife International Sacred Natural Sites framework.
            Site coordinates verified via Google Earth and OpenStreetMap.
          </p>
          <p className="font-mono text-[9px] mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            © Slow Morocco. All rights reserved. This visualization may not be reproduced without visible attribution.
          </p>
        </div>
      </section>
    </div>
  )
}
