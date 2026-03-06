'use client'

import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════
   WATERS OF EMPIRE
   How Rome exported bathing culture across three continents
   and Islam inherited it, transformed it, and kept it alive
   ═══════════════════════════════════════════════════ */

// ── DATA ──────────────────────────────────────────

interface BathSite {
  name: string
  modern: string
  region: 'italy' | 'north-africa' | 'levant' | 'anatolia' | 'iberia' | 'britain' | 'gaul' | 'germania'
  lat: number
  lng: number
  built: string
  note: string
  type: 'thermae' | 'balneum' | 'natural'
}

const SITES: BathSite[] = [
  { name: 'Thermae of Caracalla', modern: 'Rome', region: 'italy', lat: 41.879, lng: 12.492, built: '216 CE', note: '33 acres. 1,600 simultaneous bathers. Libraries, gardens, gymnasia. Water supplied by the Aqua Marcia.', type: 'thermae' },
  { name: 'Thermae of Diocletian', modern: 'Rome', region: 'italy', lat: 41.903, lng: 12.498, built: '306 CE', note: 'The largest ever built. 3,000 bathers. Michelangelo turned the frigidarium into a church. Still standing.', type: 'thermae' },
  { name: 'Baths of Antoninus', modern: 'Carthage, Tunisia', region: 'north-africa', lat: 36.858, lng: 10.330, built: '145–165 CE', note: 'Largest Roman thermae in Africa. Built on clay soil by the sea — engineers had to raise the entire structure. Destroyed by Vandals 439 CE.', type: 'thermae' },
  { name: 'Hunting Baths', modern: 'Leptis Magna, Libya', region: 'north-africa', lat: 32.638, lng: 14.289, built: 'c. 200 CE', note: 'Octagonal design. Found buried in sand. Frescoes of hunting scenes survived 1,800 years. Frigidarium was the social heart — too hot outside for athletics.', type: 'balneum' },
  { name: 'Galen\'s Thermal Baths', modern: 'Volubilis, Morocco', region: 'north-africa', lat: 34.073, lng: -5.554, built: 'c. 2nd C CE', note: 'Hypocaust underfloor heating still visible. Three public bath complexes in a city of 20,000. Olive oil funded the water infrastructure.', type: 'thermae' },
  { name: 'Baths of Banasa', modern: 'Sidi Ali Bou Jenoun, Morocco', region: 'north-africa', lat: 34.610, lng: -6.200, built: 'c. 2nd–3rd C CE', note: 'Veterans\' colony founded by Augustus. Public baths with triton mosaics. Abandoned 285 CE when Rome retreated.', type: 'balneum' },
  { name: 'Baths of Lixus', modern: 'Larache, Morocco', region: 'north-africa', lat: 35.206, lng: -6.110, built: 'c. 1st C CE', note: 'Built into the amphitheatre hillside. Mosaic fragments survive. The city exported a million litres of garum — fermented fish sauce.', type: 'balneum' },
  { name: 'Baths of Timgad', modern: 'Timgad, Algeria', region: 'north-africa', lat: 35.485, lng: 6.468, built: 'c. 100 CE', note: 'Military colony with 8 bathhouses. Population half that of Pompeii. Twice the baths.', type: 'thermae' },
  { name: 'Hammam Essalihine', modern: 'Khenchela, Algeria', region: 'north-africa', lat: 35.244, lng: 7.244, built: 'c. 1st C CE', note: 'Built over natural hot springs. Still in use today — 2,000 years of continuous bathing. One of the only Roman baths still functioning.', type: 'natural' },
  { name: 'West Baths of Gerasa', modern: 'Jerash, Jordan', region: 'levant', lat: 32.280, lng: 35.891, built: 'c. 2nd C CE', note: 'Three bath complexes for 15,000 people. North chamber dome — oldest in situ stone dome in the world. Marble statues imported from Paros and Pentelikon.', type: 'thermae' },
  { name: 'Baths of Gadara', modern: 'Umm Qais, Jordan', region: 'levant', lat: 32.655, lng: 35.683, built: 'c. 2nd C CE', note: 'Hot springs at 51°C. Built by the 10th Roman Legion. Umayyad caliph Mu\'awiyah restored them in 663 CE after an earthquake.', type: 'natural' },
  { name: 'Baths of Diocletian', modern: 'Palmyra, Syria', region: 'levant', lat: 34.552, lng: 38.269, built: 'c. 300 CE', note: 'Desert oasis thermae. Marble imported across 1,500 km of desert. The queen Zenobia bathed here before she challenged Rome.', type: 'thermae' },
  { name: 'Scholastica Baths', modern: 'Ephesus, Turkey', region: 'anatolia', lat: 37.940, lng: 27.341, built: 'c. 1st C CE', note: 'Three storeys. Named for a 4th-century Christian woman who restored them. Connected to the famous library by a secret tunnel.', type: 'thermae' },
  { name: 'Aquae Sulis', modern: 'Bath, England', region: 'britain', lat: 51.381, lng: -2.360, built: 'c. 60–70 CE', note: 'Built over a hot spring sacred to the Celtic goddess Sulis. Romans merged her with Minerva. Water rises at 46°C, 1.17 million litres daily.', type: 'natural' },
  { name: 'Kaiserthermen', modern: 'Trier, Germany', region: 'germania', lat: 49.749, lng: 6.643, built: 'c. 300 CE', note: 'Built by Constantine. One of the largest north of the Alps. Never finished. Became a barracks, then a medieval castle.', type: 'thermae' },
]

interface TransitionEvent {
  year: string
  label: string
  detail: string
  era: 'greek' | 'roman' | 'byzantine' | 'umayyad' | 'abbasid' | 'ottoman' | 'modern'
  color: string
}

const TIMELINE: TransitionEvent[] = [
  { year: 'c. 600 BCE', label: 'Greek balaneion', detail: 'Hip baths, cold water, post-athletic scrubdowns. Bathing as hygiene, not luxury. No heating systems.', era: 'greek', color: '#7BA0C9' },
  { year: 'c. 300 BCE', label: 'Stabian Baths, Pompeii', detail: 'The oldest known Roman bath. First evidence of a hypocaust — underfloor heating channelling hot air from a furnace through pillars beneath the floor.', era: 'roman', color: '#C93C20' },
  { year: '19 BCE', label: 'Agrippa\'s Thermae', detail: 'First public thermae in Rome. Free entry. Bathing becomes a civic right, not a privilege. 952 baths in Rome by 354 CE.', era: 'roman', color: '#C93C20' },
  { year: '40 CE', label: 'Rome annexes Mauretania', detail: 'Baths built at Volubilis, Lixus, Banasa, Sala. Roman bathing culture arrives in Morocco.', era: 'roman', color: '#C93C20' },
  { year: '100 CE', label: 'Timgad founded', detail: 'A military colony in Algeria with 8 bathhouses for 15,000 people. Half the population of Pompeii. Twice the baths.', era: 'roman', color: '#C93C20' },
  { year: '145–165 CE', label: 'Baths of Antoninus', detail: 'Carthage. Largest thermae in Africa. One of the three largest in the entire empire. Seats by the sea.', era: 'roman', color: '#C93C20' },
  { year: '216 CE', label: 'Baths of Caracalla', detail: 'Rome. 33 acres. Libraries, gardens, gymnasia. 1,600 bathers at once. The gold standard. Every provincial city wanted one.', era: 'roman', color: '#C93C20' },
  { year: '285 CE', label: 'Rome retreats from Morocco', detail: 'Mauretania Tingitana reduced to territories north of Lixus. Banasa abandoned. Volubilis continues with a reduced population. The baths remain.', era: 'roman', color: '#C93C20' },
  { year: '476 CE', label: 'Western Rome falls', detail: 'Bathing culture collapses in Europe. Aqueducts decay, baths are repurposed as churches and fortresses. But in the East — Constantinople, Syria, Egypt — the tradition continues unbroken.', era: 'byzantine', color: '#8B6F47' },
  { year: '661–750 CE', label: 'Umayyad Caliphate', detail: 'The first Islamic hammams. Qusayr \'Amra in Jordan — a desert bathhouse with frescoes of nude bathers. Roman hypocaust adopted. Cold room removed. The warm room becomes the social centre.', era: 'umayyad', color: '#2E7D5B' },
  { year: 'c. 788 CE', label: 'Idrisid hammam at Volubilis', detail: 'The oldest known Islamic hammam in Morocco — built on the ruins of a Roman colony. The same site. The same underfloor heating. Different God, same physics.', era: 'umayyad', color: '#2E7D5B' },
  { year: '8th–10th C', label: 'Hammams reach al-Andalus', detail: 'Córdoba, Granada, Seville, Ronda. The Bañuelo of Granada still stands. A 12th-century Almohad hammam was found under a tapas bar in Seville in 2020.', era: 'abbasid', color: '#1A5C3A' },
  { year: '11th C', label: 'Al-Ghazali codifies the rules', detail: 'The Mysteries of Purity. How to bathe, when to bathe, what to cover. Hammam becomes religiously mandated infrastructure — second only to the mosque.', era: 'abbasid', color: '#1A5C3A' },
  { year: '12th–15th C', label: 'Almohad & Marinid expansion', detail: 'Hammams multiply across Fez, Marrakech, Meknès, Rabat. The Mouassine Hammam (1562) in Marrakech is still operational.', era: 'abbasid', color: '#1A5C3A' },
  { year: '15th–19th C', label: 'Ottoman hammam golden age', detail: 'Mimar Sinan builds the Çemberlitaş Hammam in Istanbul (1584). The göbek taşı — heated marble slab — becomes the centrepiece. Hammams spread to the Balkans, Hungary, Egypt.', era: 'ottoman', color: '#6B4F8A' },
  { year: '1492', label: 'Reconquista ends in Spain', detail: 'Hammams in al-Andalus close or are destroyed. The Christian view: communal bathing is immoral. Europe won\'t bathe properly again for 300 years.', era: 'ottoman', color: '#6B4F8A' },
  { year: 'Present', label: 'Morocco leads', detail: 'Highest density of public bathhouses on earth. Neighbourhood hammams coexist with luxury spa hammams. The three-room sequence — warm, hot, furnace — is unchanged from Rome.', era: 'modern', color: '#111111' },
]

interface RoomComparison {
  roman: string
  romanArabic: string
  islamic: string
  islamicArabic: string
  function: string
  temp: string
}

const ROOM_EVOLUTION: RoomComparison[] = [
  { roman: 'Apodyterium', romanArabic: '', islamic: 'Al-Maslakh / Al-Barrani', islamicArabic: 'البرّاني', function: 'Undressing, storage, arrival', temp: '~25°C' },
  { roman: 'Frigidarium', romanArabic: '', islamic: 'Removed or repurposed', islamicArabic: '—', function: 'Cold plunge pool. Islam considers still water unclean. Replaced with running water from taps.', temp: 'Cold' },
  { roman: 'Tepidarium', romanArabic: '', islamic: 'Al-Wustani / Bayt al-Wastani', islamicArabic: 'الوسطاني', function: 'Warm room. Transition. In Islamic hammam, becomes the social centre — larger, more decorated.', temp: '~35°C' },
  { roman: 'Caldarium', romanArabic: '', islamic: 'Al-Dakhli / Bayt al-Harara', islamicArabic: 'الداخلي', function: 'Hot room. Steam, sweating, scrubbing. Hypocaust heating beneath the floor — identical technology.', temp: '~45°C' },
  { roman: 'Praefurnium', romanArabic: '', islamic: 'Al-Jawwani / Furnace', islamicArabic: 'الجوّاني', function: 'Furnace room. Wood-fired. Heats water and sends hot air through channels. In Morocco, also cooks the tangia.', temp: 'Fire' },
  { roman: 'Palaestra', romanArabic: '', islamic: 'Removed', islamicArabic: '—', function: 'Exercise yard. In North Africa already less used due to heat. Islam dropped it entirely — the hammam is for cleansing, not athletics.', temp: '—' },
]

const NUMBERS = [
  { value: '952', label: 'baths in Rome', sub: '354 CE census' },
  { value: '60,000', label: 'estimated in Baghdad', sub: 'al-Sabi\', 11th century' },
  { value: '3,000', label: 'bathers at Diocletian\'s', sub: 'simultaneously' },
  { value: '2,000', label: 'years Hammam Essalihine', sub: 'still in use today — Algeria' },
  { value: '8', label: 'bathhouses in Timgad', sub: 'population: 15,000' },
  { value: '3', label: 'rooms survived', sub: 'warm → hot → furnace. Rome to today.' },
]

const BIBLIOGRAPHY = [
  'Yegül, Fikret K. Bathing in the Roman World. Cambridge University Press, 2009.',
  'Sibley, Magda. "The Hammam in the Historic Muslim City." AHRC Research, University of Leeds.',
  'Tohme, Lara. "Out of Antiquity: Umayyad Baths in Context." PhD diss., MIT, 2005.',
  'Nielsen, Inge. Thermae et Balnea: The Architecture and Cultural History of Roman Public Baths. Aarhus University Press, 1990.',
  'Fowden, Garth. Qusayr \'Amra: Art and the Umayyad Elite in Late Antique Syria. University of California Press, 2004.',
  'Harvey, Craig A. The Construction of Baths in the Roman East. University of Michigan, 2020.',
  'Williams, Elizabeth. "Baths and Bathing Culture in the Middle East: The Hammam." Heilbrunn Timeline of Art History, The Metropolitan Museum of Art, 2012.',
  'DeLaine, Janet, and D.E. Johnston, eds. Roman Baths and Bathing. Journal of Roman Archaeology, 2000.',
]

// ── COMPONENTS ────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function CountUp({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView()
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(ease * value))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])
  return <span ref={ref}>{count.toLocaleString()}</span>
}

// ── STYLES ────────────────────────────────────────

const F = {
  display: '"Instrument Serif", Georgia, serif',
  body: '"IBM Plex Mono", monospace',
}

const C = {
  bg: '#FAFAF8',
  white: '#ffffff',
  black: '#0A0A0A',
  text: '#1A1A1A',
  mid: '#555555',
  light: '#999999',
  border: '#E8E5E0',
  roman: '#C93C20',
  romanLight: '#F5E6E2',
  islamic: '#2E7D5B',
  islamicLight: '#E4F0EA',
  byzantine: '#8B6F47',
  warm: '#F8F4EF',
  hot: '#FDF2EE',
  dark: '#0E0E0E',
  darkMid: '#161616',
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// ── PAGE ──────────────────────────────────────────

export function WatersOfEmpireContent() {
  const [hoveredSite, setHoveredSite] = useState<number | null>(null)
  const [activeEra, setActiveEra] = useState<string | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)

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
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [10, 38], zoom: 3.2, minZoom: 2, maxZoom: 10,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        const regionColors: Record<string, string> = {
          'italy': C.roman, 'north-africa': C.islamic, 'levant': C.roman,
          'anatolia': C.roman, 'iberia': C.roman, 'britain': C.roman,
          'gaul': C.roman, 'germania': C.roman,
        }
        SITES.forEach((site) => {
          const color = regionColors[site.region] || C.roman
          const size = site.type === 'thermae' ? 16 : site.type === 'natural' ? 14 : 12
          const el = document.createElement('div')
          el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2.5px solid white;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.3);transition:transform 0.2s;`
          el.title = site.name
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          const typeLabel = site.type === 'thermae' ? 'Major Thermae' : site.type === 'natural' ? 'Natural Hot Springs' : 'Balneum'
          const popup = new mapboxgl.default.Popup({ offset: 14, closeButton: false, maxWidth: '280px' })
            .setHTML(`
              <div style="font-family:'IBM Plex Mono',monospace;padding:4px 0">
                <p style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${color};margin:0 0 4px">${site.built} · ${typeLabel}</p>
                <p style="font-weight:700;font-size:14px;margin:0 0 2px;color:#0A0A0A">${site.name}</p>
                <p style="font-size:12px;color:#666;margin:0 0 8px">${site.modern}</p>
                <p style="font-size:12px;color:#333;line-height:1.6;margin:0">${site.note}</p>
              </div>
            `)
          new mapboxgl.default.Marker({ element: el })
            .setLngLat([site.lng, site.lat])
            .setPopup(popup)
            .addTo(map)
        })
        setMapReady(true)
      })
      mapRef.current = map
    })
    return () => { if (mapRef.current) mapRef.current.remove(); mapRef.current = null }
  }, [])

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: F.body }}>

      {/* ═══ HERO ═══ */}
      <section style={{ background: C.white, padding: '160px 24px 120px', textAlign: 'center', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.light, marginBottom: 40 }}>Knowledge · Origin Story</p>

          <h1 style={{ fontFamily: F.display, fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.05, color: C.black, marginBottom: 32, letterSpacing: '-0.02em' }}>
            Waters of Empire
          </h1>

          <p style={{ fontFamily: F.display, fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, color: C.mid, maxWidth: 580, margin: '0 auto 60px' }}>
            Rome invented communal bathing. Islam perfected it.<br />
            The hammam is not Arab. It is Roman — inherited, transformed, and kept alive while Europe forgot how to wash.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {[
              { label: 'Roman sites mapped', val: '15' },
              { label: 'centuries of continuity', val: '26' },
              { label: 'rooms survived unchanged', val: '3' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: F.display, fontSize: 42, fontWeight: 300, color: C.black }}>{s.val}</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.light, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE THESIS ═══ */}
      <section style={{ padding: '100px 24px', maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.roman, marginBottom: 24 }}>The Origin</p>
        <p style={{ fontFamily: F.body, fontSize: 17, lineHeight: 2, color: C.text }}>
          In 354 CE, a census counted 952 bathhouses in Rome. Entry was free or nearly free — cheaper than bread. A senator and a craftsman might sit side by side on the same marble bench, sweating in the same steam. The bathhouse was not a luxury. It was infrastructure — as essential to Roman urban life as the forum, the aqueduct, the road.
        </p>
        <p style={{ fontFamily: F.body, fontSize: 17, lineHeight: 2, color: C.text, marginTop: 24 }}>
          When Rome expanded, the baths went with it. Every garrison, every colony, every provincial city got one. The first thing Roman legionaries built at Exeter wasn't a temple or a barracks — it was a bathhouse. In North Africa, the pattern was the same. Volubilis in Morocco had three public bath complexes for 20,000 people. Timgad in Algeria had eight for 15,000. Carthage got the largest thermae in Africa — one of the three largest in the entire empire.
        </p>
        <p style={{ fontFamily: F.body, fontSize: 17, lineHeight: 2, color: C.text, marginTop: 24 }}>
          Then Rome fell. And something remarkable happened. In the West, bathing culture collapsed. Aqueducts decayed. Baths were converted into churches and granaries. Europe entered a period of profound filth that would last centuries. But in the East — in Syria, Jordan, Egypt, and eventually North Africa — the tradition survived. The Umayyad caliphs built bathhouses at Qusayr 'Amra, decorated with frescoes of nude bathers in late Roman style. They kept the hypocaust. They kept the three-room sequence. They dropped the cold plunge pool — Islam considers still water unclean — and replaced it with running water from taps. They made the warm room larger, more social, more decorated. And they gave it a new name: hammam.
        </p>
      </section>

      {/* ═══ NUMBERS ═══ */}
      <section style={{ background: C.dark, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40 }}>
            {NUMBERS.map((n, i) => {
              const { ref, inView } = useInView()
              return (
                <div key={i} ref={ref} style={{ textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 100}ms` }}>
                  <div style={{ fontFamily: F.display, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#ffffff', lineHeight: 1 }}>{n.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>{n.label}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{n.sub}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ BATH SITES — RADIAL MAP ═══ */}
      <section style={{ padding: '100px 24px', background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.light, marginBottom: 16 }}>Geography</p>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 300, fontStyle: 'italic', color: C.black, marginBottom: 12 }}>
            Where Rome Built Baths
          </h2>
          <p style={{ fontSize: 14, color: C.mid, marginBottom: 60, maxWidth: 540 }}>
            From Bath in England to Palmyra in the Syrian desert. Every dot is an archaeological site with Roman thermae ruins.
          </p>

          {/* Mapbox interactive map */}
          <div ref={mapContainer} style={{
            width: '100%', height: 'clamp(400px, 55vh, 560px)', borderRadius: 4,
            background: '#f5f5f0', border: `1px solid ${C.border}`,
            opacity: mapReady ? 1 : 0.6, transition: 'opacity 0.8s ease',
          }}>
            {!MAPBOX_TOKEN && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <p style={{ fontSize: 13, color: C.light }}>Map requires NEXT_PUBLIC_MAPBOX_TOKEN.</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 32, marginTop: 24, justifyContent: 'center' }}>
            {[
              { color: C.roman, label: 'Roman territory (Europe, Levant, Anatolia)' },
              { color: C.islamic, label: 'North Africa (later Islamic inheritance)' },
            ].map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
                <span style={{ fontSize: 11, color: C.mid }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROOM EVOLUTION ═══ */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.islamic, marginBottom: 16 }}>Architecture</p>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 300, fontStyle: 'italic', color: C.black, marginBottom: 12 }}>
            Same bones, different skin
          </h2>
          <p style={{ fontSize: 14, color: C.mid, marginBottom: 60, maxWidth: 600 }}>
            The Islamic <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>hammam</span> inherited the Roman room sequence and adapted it. The cold plunge pool was removed — Islam requires running water, not still. The warm room grew. The exercise yard disappeared. The hypocaust stayed.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 80px', gap: 16, padding: '16px 20px', borderBottom: `2px solid ${C.black}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.roman }}>Roman</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.islamic }}>Islamic</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.light }}>What changed</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.light, textAlign: 'right' }}>Temp</div>
            </div>

            {ROOM_EVOLUTION.map((r, i) => {
              const { ref, inView } = useInView()
              const isRemoved = r.islamic.includes('Removed')
              return (
                <div key={i} ref={ref} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 80px', gap: 16,
                  padding: '20px 20px',
                  borderBottom: `1px solid ${C.border}`,
                  opacity: inView ? (isRemoved ? 0.4 : 1) : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.6s ease ${i * 80}ms`,
                  background: isRemoved ? 'transparent' : (i % 2 === 0 ? C.warm : 'transparent'),
                }}>
                  <div>
                    <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 400, color: C.roman, fontStyle: 'italic' }}>{r.roman}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 400, color: isRemoved ? C.light : C.islamic, fontStyle: 'italic', textDecoration: isRemoved ? 'line-through' : 'none' }}>{r.islamic}</div>
                    {r.islamicArabic !== '—' && <div style={{ fontSize: 16, color: C.light, marginTop: 2, fontFamily: 'serif', direction: 'rtl' } as React.CSSProperties}>{r.islamicArabic}</div>}
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: C.text }}>{r.function}</div>
                  <div style={{ fontFamily: F.display, fontSize: 18, color: C.text, textAlign: 'right', fontStyle: 'italic' }}>{r.temp}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section style={{ padding: '100px 24px', background: C.white, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.light, marginBottom: 16 }}>Timeline</p>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 300, fontStyle: 'italic', color: C.black, marginBottom: 12 }}>
            2,600 years of water
          </h2>
          <p style={{ fontSize: 14, color: C.mid, marginBottom: 60, maxWidth: 540 }}>
            From Greek hip baths to your neighbourhood hammam. The technology passed through six civilizations. The three-room sequence never changed.
          </p>

          {/* Era filter */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { key: null, label: 'All', color: C.black },
              { key: 'roman', label: 'Roman', color: C.roman },
              { key: 'byzantine', label: 'Byzantine', color: C.byzantine },
              { key: 'umayyad', label: 'Umayyad', color: C.islamic },
              { key: 'abbasid', label: 'Abbasid & Marinid', color: '#1A5C3A' },
              { key: 'ottoman', label: 'Ottoman', color: '#6B4F8A' },
            ].map(e => (
              <button key={e.key ?? 'all'} onClick={() => setActiveEra(activeEra === e.key ? null : e.key)}
                style={{
                  padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${e.color}`,
                  background: activeEra === e.key ? e.color : 'transparent',
                  color: activeEra === e.key ? '#fff' : e.color,
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}>
                {e.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', paddingLeft: 32 }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 6, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${C.roman}, ${C.islamic}, ${C.black})` }} />

            {TIMELINE.filter(t => !activeEra || t.era === activeEra).map((t, i) => {
              const { ref, inView } = useInView()
              return (
                <div key={i} ref={ref} style={{
                  position: 'relative', paddingBottom: 40,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `all 0.5s ease ${i * 60}ms`,
                }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute', left: -32, top: 4,
                    width: 14, height: 14, borderRadius: '50%',
                    background: t.color, border: '3px solid #fff',
                    boxShadow: `0 0 0 1px ${C.border}`,
                  }} />

                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: t.color, marginBottom: 4 }}>{t.year}</div>
                  <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 400, color: C.black, marginBottom: 6 }}>{t.label}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.75, color: C.text }}>{t.detail}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ THE INSIGHT ═══ */}
      <section style={{ background: C.dark, padding: '100px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: F.display, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5, color: '#ffffff' }}>
            When Rome fell, Europe stopped bathing.<br />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Islam didn't.</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginTop: 32, maxWidth: 520, margin: '32px auto 0' }}>
            The oldest Islamic hammam in Morocco sits on the ruins of a Roman colony at <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Volubilis</span>. Same site. Same underfloor heating. Different God, same physics. The three-room sequence — warm, hot, furnace — has not changed in twenty-six centuries.
          </p>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ padding: '80px 24px', background: C.bg }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.light, marginBottom: 24 }}>Sources</p>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontSize: 13, lineHeight: 1.8, color: C.mid, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: '40px 24px', background: C.dark, textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>
          © {new Date().getFullYear()} Slow Morocco · J. Ng · Knowledge Series
        </div>
      </footer>
    </div>
  )
}
