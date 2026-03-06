'use client'

import { useState, useEffect, useRef } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const C = {
  christian: '#8B2323', muslim: '#2D6E4F', jewish: '#C17F28', both: '#5D4E7A',
  ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
}

// ═══ TIMELINE PHASES ═══
interface Phase {
  year: number; endYear?: number; title: string
  story: string; keyFact: string
}

const RECONQUISTA_TIMELINE: Phase[] = [
  {
    year: 711, title: 'The Conquest',
    story: 'Tariq ibn Ziyad crosses from Ceuta with 7,000 Berbers. Defeats the Visigothic King Roderic at Guadalete. Within seven years, Muslims control nearly the entire peninsula. Al-Andalus is born.',
    keyFact: '7 years to conquer. 770 years to lose.',
  },
  {
    year: 722, title: 'Covadonga',
    story: 'Pelayo of Asturias defeats a Muslim force in the mountains of northern Spain. A minor skirmish at the time. Later reimagined as the first battle of the Reconquista — the beginning of the 770-year project to reclaim Iberia for Christendom.',
    keyFact: 'The Reconquista begins in a cave.',
  },
  {
    year: 929, title: 'The Caliphate',
    story: 'Abd al-Rahman III declares himself caliph in Córdoba. Al-Andalus reaches its zenith. Population of Córdoba: 500,000. Libraries: 70. Paved, lit streets. The largest and most sophisticated city in Europe. Jews serve as viziers and physicians. The "Golden Age" of convivencia — coexistence.',
    keyFact: 'Córdoba: largest city in Europe.',
  },
  {
    year: 1031, title: 'The Collapse',
    story: 'The Caliphate of Córdoba disintegrates into two dozen taifa kingdoms — petty states too weak to resist the Christian north, too proud to unite. They hire Christian mercenaries. Some pay tribute to Christian kings. The fragmentation is fatal.',
    keyFact: '23 taifa kingdoms. None strong enough alone.',
  },
  {
    year: 1085, title: 'Toledo Falls',
    story: 'Alfonso VI of Castile captures Toledo — the old Visigothic capital, the intellectual heart of al-Andalus, home to the School of Translators where Greek philosophy moved from Arabic to Latin. The taifa kings panic. They call for help across the Strait.',
    keyFact: 'The translators made the Renaissance possible.',
  },
  {
    year: 1086, endYear: 1147, title: 'Almoravid Intervention',
    story: 'Yusuf ibn Tashfin crosses with 15,000 troops. Crushes Alfonso VI at Sagrajas. Then deposes the taifa kings as corrupt. Morocco and al-Andalus merge under one empire. The Reconquista stalls for a generation — but the precedent is set: North Africa intervenes in Iberian affairs.',
    keyFact: '"I would rather be a camel-driver in Africa than a swineherd in Castile."',
  },
  {
    year: 1147, endYear: 1212, title: 'Almohad Era',
    story: 'The Almohads replace the Almoravids. Seville becomes their Iberian capital. The Giralda rises. But the Christian kingdoms are consolidating. Castile, Aragon, Navarre, and Portugal form temporary alliances. The tide is turning.',
    keyFact: 'Same caliphs built Kutubiyya and Giralda.',
  },
  {
    year: 1212, title: 'Las Navas de Tolosa',
    story: 'A coalition of Christian kings — Castile, Aragon, Navarre, Portugal — shatters the Almohad army at Las Navas de Tolosa. The decisive battle. Within forty years: Córdoba falls (1236), Valencia falls (1238), Seville falls (1248). Only Granada remains.',
    keyFact: 'The battle that broke the empire.',
  },
  {
    year: 1238, endYear: 1492, title: 'The Nasrid Kingdom of Granada',
    story: 'Granada survives 254 years as a tributary state — paying tribute to Castile, playing Christian factions against each other, building the Alhambra as the final flowering of Andalusi art. The most beautiful palace in Europe, built by a kingdom that knew it was dying.',
    keyFact: 'The Alhambra: beauty as a form of defiance.',
  },
  {
    year: 1391, title: 'The Pogroms',
    story: 'Anti-Jewish riots sweep across Spain. Thousands killed. Synagogues burned. Mass forced conversions. Over half of Spain\'s Jews convert to Christianity under duress. These conversos — "New Christians" — will be suspected for centuries of secretly practicing Judaism. The Inquisition will hunt them.',
    keyFact: 'Over half of Spain\'s Jews convert under threat.',
  },
  {
    year: 1478, title: 'The Inquisition',
    story: 'Ferdinand and Isabella establish the Spanish Inquisition. Its mandate: identify conversos who secretly practice Judaism or Islam. Torture, imprisonment, public burnings (autos-da-fé). Not abolished until 1834. The most persistent engine of religious persecution in European history.',
    keyFact: 'Lasted 356 years. Conducted autos-da-fé into the 18th century.',
  },
  {
    year: 1492, title: 'Three Events in One Year',
    story: 'January 2: Boabdil surrenders Granada. March 31: the Alhambra Decree orders all unconverted Jews to leave by July 31. August 3: Columbus sails from Palos — his crew includes conversos, his voyage financed by the same monarchs who just expelled the Jews. In a single year, Spain ends 800 years of Muslim presence, begins the Jewish diaspora, and launches the colonial project.',
    keyFact: 'The same year. The same monarchs. Three histories launched.',
  },
  {
    year: 1501, endYear: 1526, title: 'Forced Conversions of Muslims',
    story: 'Despite the Treaty of Granada promising religious freedom, Spain outlaws Islam. Muslims must convert or leave. Those who stay become Moriscos — officially Christian, secretly Muslim. They are watched, restricted, suspected. Their Arabic is banned. Their clothing is banned. Their bathhouses are closed.',
    keyFact: 'Even the baths were considered too Islamic.',
  },
  {
    year: 1568, endYear: 1571, title: 'The Alpujarras Revolt',
    story: 'Moriscos in the Alpujarras mountains south of Granada revolt against the bans on their language, dress, and customs. Philip II sends 20,000 troops. After three years of brutal warfare, the surviving Moriscos are forcibly relocated from Granada to cities across Castile — scattered to break their communities.',
    keyFact: '80,000 Moriscos forcibly relocated from Granada.',
  },
  {
    year: 1609, endYear: 1614, title: 'The Final Expulsion',
    story: 'Philip III orders all Moriscos expelled from Spain. Between 275,000 and 300,000 are driven out — the largest ethnic cleansing in early modern Europe. They are loaded onto ships or marched to the borders. Some are robbed and murdered on the road. The economic devastation is immediate: Valencia loses a third of its population. Agricultural productivity collapses.',
    keyFact: '275,000–300,000 expelled. Valencia loses 1/3 of its people.',
  },
]

// ═══ DIASPORA DESTINATIONS ═══
type Community = 'muslim' | 'jewish' | 'both'
interface Destination {
  name: string; lat: number; lng: number
  community: Community; population: string
  story: string; legacy: string
}

const DESTINATIONS: Destination[] = [
  // ═══ NORTH AFRICA ═══
  {
    name: 'Fes', lat: 34.033, lng: -5.000, community: 'both', population: '~50,000 Jews + waves of Muslims',
    story: 'The primary destination. Jews arrived from 1492, welcomed by Sultan al-Wattasi. They merged with existing Toshavim (indigenous Moroccan Jews, present since 70 CE) and formed the Megorashim elite. Muslims arrived in waves: after 1248 (Seville), 1492 (Granada), 1609 (final expulsion). The Andalusi Quarter dates to 818 — refugees from a Córdoban revolt. By the 20th century, Morocco\'s Jewish population exceeded 250,000.',
    legacy: 'Mellah (Jewish quarter), Andalusi music, pastilla, zellige refinement, scholarship',
  },
  {
    name: 'Tetouan', lat: 35.572, lng: -5.368, community: 'both', population: '~40,000 Moriscos + Sephardic community',
    story: 'The "daughter of Granada." Main contingent arrived 1501. They built a replica city — wide streets, marble fountains, Alhambra-pattern ceilings. Sephardic Jews established a community speaking Haketia (Judeo-Spanish). Morisco corsairs launched raids against Spanish shipping as retaliation.',
    legacy: 'UNESCO medina, Andalusi architecture, Haketia language, piracy-as-retribution',
  },
  {
    name: 'Chefchaouen', lat: 35.171, lng: -5.264, community: 'both', population: 'Thousands of Andalusi + Morisco families',
    story: 'Founded 1471 as fortress against Portuguese. Became a primary refugee city after 1492. Andalusi families built quarters in the Granadan style on mountain slopes. Jewish refugees may have introduced the blue-painted walls (representing sky/heaven in Jewish mysticism). Closed to outsiders until 1920.',
    legacy: 'Blue medina, Andalusi-Ghomara cultural fusion, isolation preserved traditions',
  },
  {
    name: 'Rabat–Salé', lat: 34.021, lng: -6.842, community: 'muslim', population: '~10,000 Moriscos',
    story: 'After 1609, expelled Moriscos established the autonomous Corsair Republic of Bou Regreg (1627–1668). Morisco captains — some educated, some formerly wealthy — turned to piracy as organized retaliation. England, France, and the Netherlands sent ambassadors to negotiate. The republic was eventually absorbed by the Alaouite sultanate.',
    legacy: 'Corsair Republic, Kasbah of the Udayas, pirate diplomacy',
  },
  {
    name: 'Tangier', lat: 35.760, lng: -5.834, community: 'both', population: 'Continuous settlement',
    story: 'Gateway city. Where Tariq governed before crossing in 711. Where refugees returned after 1492. Under Portuguese (1471–1661), English (1661–1684), then Moroccan control. Sephardic and Muslim communities coexisted in the medina.',
    legacy: 'The crossing point, multilingual identity, literary mythology',
  },
  {
    name: 'Algiers', lat: 36.753, lng: 3.058, community: 'both', population: 'Tens of thousands of Moriscos',
    story: 'Major Morisco destination after 1609. Some joined the Ottoman-backed corsair networks. Andalusi refugees established quarters and brought architectural traditions. The Casbah of Algiers retains Andalusi spatial planning.',
    legacy: 'Casbah architecture, corsair networks, Ottoman alliance',
  },
  {
    name: 'Tunis', lat: 36.807, lng: 10.166, community: 'both', population: 'Major Morisco + Sephardic settlement',
    story: 'Under the Hafsid dynasty (Almohad branch), Tunis welcomed refugees from 1248 onward. After 1609, entire Morisco villages relocated to the Tunis region. Testour — a town 80km from Tunis — was built entirely by Morisco refugees and still has Andalusi architecture, including a clock tower with reversed numbers.',
    legacy: 'Testour (Andalusi town), Andalusi music (malouf), architecture, cuisine',
  },
  {
    name: 'Tlemcen', lat: 34.879, lng: -1.315, community: 'both', population: 'Significant waves',
    story: 'Under the Zayyanid dynasty, Tlemcen was already a refined Islamic city. Andalusi refugees enriched it further. Sephardic Jews established a community that lasted until the 20th century. The city\'s architectural tradition blends Almohad, Marinid, and Andalusi elements.',
    legacy: 'Andalusi-Zayyanid architectural fusion, manuscript tradition',
  },

  // ═══ OTTOMAN EMPIRE ═══
  {
    name: 'Istanbul (Constantinople)', lat: 41.009, lng: 28.980, community: 'jewish', population: '~30,000–40,000 Sephardic Jews',
    story: 'Sultan Bayezid II reportedly mocked Ferdinand: "You call this king wise? He has impoverished his own country and enriched mine." The Ottomans actively welcomed Jewish refugees — skilled merchants, physicians, diplomats, and artisans. Sephardic Jews became a major force in Ottoman commerce. They brought the printing press to the empire.',
    legacy: 'Printing press, commercial networks, Ladino culture, diplomatic service',
  },
  {
    name: 'Thessaloniki (Salonika)', lat: 40.640, lng: 22.944, community: 'jewish', population: '~20,000+ (became majority Jewish)',
    story: 'The most extraordinary case. Sephardic Jews became the majority population of Thessaloniki — a major Ottoman port city. They dominated commerce, shipping, and textile production. The city was called "Mother of Israel." Ladino was the lingua franca. The community thrived for 450 years — until the Holocaust, when 96% of Thessaloniki\'s 50,000 Jews were murdered at Auschwitz.',
    legacy: 'Majority-Jewish city for 450 years, Ladino lingua franca, destroyed in Holocaust',
  },
  {
    name: 'Sarajevo', lat: 43.856, lng: 18.413, community: 'jewish', population: 'Significant Sephardic community',
    story: 'Sephardic Jews settled in Ottoman Sarajevo, creating a community that preserved Ladino language and Andalusi customs for centuries. The Sarajevo Haggadah — a 14th-century illuminated manuscript brought from Barcelona — survived the 1492 expulsion, the Holocaust, and the Bosnian War. It is now Bosnia\'s most valuable cultural artifact.',
    legacy: 'Sarajevo Haggadah, Ladino preservation, survival through multiple catastrophes',
  },
  {
    name: 'Izmir (Smyrna)', lat: 38.423, lng: 27.143, community: 'jewish', population: 'Major Sephardic hub',
    story: 'Ottoman port city that became a major Sephardic center. Ladino-speaking merchants dominated Aegean trade. The birthplace of Sabbatai Zevi, the false messiah whose 1666 movement convulsed the Jewish world. The community survived until the 1922 fire and Greek-Turkish population exchange.',
    legacy: 'Ladino commerce, messianic movements, Aegean trade networks',
  },
  {
    name: 'Cairo / Alexandria', lat: 30.044, lng: 31.236, community: 'jewish', population: 'Sephardic additions to existing community',
    story: 'Egypt\'s existing Jewish community — ancient, Arabic-speaking — received Sephardic refugees who brought Ladino, different liturgical customs, and commercial connections to the western Mediterranean. The Maimonides Synagogue in Cairo already linked Egypt to the Andalusi tradition: Maimonides himself had fled Córdoba in 1148.',
    legacy: 'Maimonides legacy, Sephardic-Mizrahi fusion, commercial expansion',
  },

  // ═══ EUROPE ═══
  {
    name: 'Amsterdam', lat: 52.370, lng: 4.895, community: 'jewish', population: '~4,000 by 1650',
    story: 'Conversos who had remained in Spain and Portugal as secret Jews eventually made their way to Amsterdam, where they could practice Judaism openly. They called it "the Dutch Jerusalem." Rembrandt\'s Jewish Quarter. Spinoza was excommunicated from this community. The Portuguese Synagogue (1675) — built with Brazilian wood — was the largest in Europe.',
    legacy: 'Portuguese Synagogue, Spinoza, diamond trade, "Dutch Jerusalem"',
  },
  {
    name: 'Livorno (Leghorn)', lat: 43.548, lng: 10.311, community: 'jewish', population: 'Significant Sephardic settlement',
    story: 'The Medici Grand Dukes of Tuscany actively recruited Sephardic Jews with the "Livornina" laws (1591–1593) guaranteeing religious freedom and commercial privileges. Livorno became a major Sephardic hub connecting Mediterranean trade networks. No ghetto was ever imposed.',
    legacy: 'Free port, no ghetto, Mediterranean trade hub, Medici protection',
  },
  {
    name: 'Bayonne / Bordeaux', lat: 43.493, lng: -1.475, community: 'jewish', population: 'Converso communities',
    story: 'Converso families settled in southwest France, officially as "New Christians" but gradually returning to open Judaism. They dominated the chocolate trade — having learned cacao processing in the Americas. Bayonne became France\'s chocolate capital because of Sephardic confectioners.',
    legacy: 'Introduced chocolate to France, converso-to-Jewish transition',
  },
]

// ═══ DIASPORA FLOW LINES ═══
const FLOWS: { from: [number, number]; to: [number, number]; community: Community; label: string }[] = [
  // North Africa
  { from: [-3.60, 37.18], to: [-5.00, 34.03], community: 'both', label: 'Granada → Fes' },
  { from: [-3.60, 37.18], to: [-5.37, 35.57], community: 'both', label: 'Granada → Tetouan' },
  { from: [-3.60, 37.18], to: [-5.26, 35.17], community: 'both', label: 'Granada → Chefchaouen' },
  { from: [-5.98, 37.39], to: [-6.84, 34.02], community: 'muslim', label: 'Seville → Rabat' },
  { from: [-3.60, 37.18], to: [3.06, 36.75], community: 'muslim', label: 'Iberia → Algiers' },
  { from: [-3.60, 37.18], to: [10.17, 36.81], community: 'both', label: 'Iberia → Tunis' },
  // Ottoman
  { from: [-3.60, 37.18], to: [28.98, 41.01], community: 'jewish', label: 'Iberia → Istanbul' },
  { from: [-3.60, 37.18], to: [22.94, 40.64], community: 'jewish', label: 'Iberia → Salonika' },
  { from: [-3.60, 37.18], to: [18.41, 43.86], community: 'jewish', label: 'Iberia → Sarajevo' },
  // Europe
  { from: [-3.60, 37.18], to: [4.90, 52.37], community: 'jewish', label: 'Iberia → Amsterdam' },
  { from: [-3.60, 37.18], to: [10.31, 43.55], community: 'jewish', label: 'Iberia → Livorno' },
]

const COMM_COLOR: Record<Community, string> = { muslim: C.muslim, jewish: C.jewish, both: C.both }
const COMM_LABEL: Record<Community, string> = { muslim: 'Muslim', jewish: 'Jewish', both: 'Muslim & Jewish' }

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

// ═══ MAP ═══
function DiasporaMap({ selectedDest, onSelectDest, commFilter }: {
  selectedDest: number | null; onSelectDest: (i: number) => void; commFilter: Community | null
}) {
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
      center: [10, 38],
      zoom: 3.5,
      accessToken: MAPBOX_TOKEN,
      attributionControl: false,
    })
    m.addControl(new mapboxgl.NavigationControl(), 'top-right')
    m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    m.on('load', () => {
      // Origin marker (Granada)
      const originEl = document.createElement('div')
      originEl.style.cssText = `width:18px;height:18px;background:${C.christian};border:3px solid ${C.christian};border-radius:50%;box-shadow:0 0 16px ${C.christian}40;`
      originEl.title = 'Granada — the origin'
      new mapboxgl.Marker({ element: originEl }).setLngLat([-3.60, 37.18]).addTo(m)

      // Flow lines
      FLOWS.forEach((f, i) => {
        m.addSource(`flow-${i}`, {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [f.from, f.to] } }
        })
        m.addLayer({
          id: `flow-line-${i}`, type: 'line', source: `flow-${i}`,
          paint: { 'line-color': COMM_COLOR[f.community], 'line-width': 1.5, 'line-opacity': 0.3, 'line-dasharray': [6, 4] }
        })
      })

      // Destination markers
      DESTINATIONS.forEach((d, i) => {
        const el = document.createElement('div')
        const color = COMM_COLOR[d.community]
        const size = (d.name === 'Fes' || d.name === 'Istanbul (Constantinople)' || d.name === 'Thessaloniki (Salonika)') ? 14 : 10
        el.style.cssText = `
          width:${size}px;height:${size}px;background:${color};
          border:2px solid ${color};border-radius:50%;
          cursor:pointer;transition:all 0.3s;box-shadow:0 1px 4px rgba(0,0,0,0.25);
        `
        el.title = d.name
        el.addEventListener('click', () => onSelectDest(i))
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)'; el.style.boxShadow = `0 0 12px ${color}50` })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.25)' })
        const marker = new mapboxgl.Marker({ element: el }).setLngLat([d.lng, d.lat]).addTo(m)
        markersRef.current.push(marker)
      })
    })

    map.current = m
    return () => m.remove()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Filter
  useEffect(() => {
    markersRef.current.forEach((marker, i) => {
      const d = DESTINATIONS[i]
      const visible = !commFilter || d.community === commFilter || d.community === 'both'
      marker.getElement().style.opacity = visible ? '1' : '0.12'
    })
    if (map.current) {
      FLOWS.forEach((f, i) => {
        const layerId = `flow-line-${i}`
        if (map.current!.getLayer(layerId)) {
          const visible = !commFilter || f.community === commFilter || f.community === 'both'
          map.current!.setPaintProperty(layerId, 'line-opacity', visible ? 0.45 : 0.06)
        }
      })
    }
  }, [commFilter])

  // Fly
  useEffect(() => {
    if (selectedDest !== null && map.current) {
      const d = DESTINATIONS[selectedDest]
      map.current.flyTo({ center: [d.lng, d.lat], zoom: 8, duration: 1000 })
      markersRef.current.forEach((marker, i) => {
        marker.getElement().style.transform = i === selectedDest ? 'scale(2)' : 'scale(1)'
      })
    }
  }, [selectedDest])

  return <div ref={mapContainer} className="w-full rounded-sm" style={{ height: '560px' }} />
}

// ═══ PAGE ═══
export function ReconquistaExodusContent() {
  const [selectedDest, setSelectedDest] = useState<number | null>(null)
  const [commFilter, setCommFilter] = useState<Community | null>(null)
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const heroR = useReveal()
  const timeR = useReveal()
  const mapR = useReveal()

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('mapbox-gl-reconquista')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
      document.head.appendChild(link)
      const script = document.createElement('script')
      script.id = 'mapbox-gl-reconquista'
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.js'
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else {
      setMapLoaded(true)
    }
  }, [])

  const selDest = selectedDest !== null ? DESTINATIONS[selectedDest] : null

  // Group destinations by region
  const northAfrica = DESTINATIONS.filter(d => d.lat < 37 && d.lng < 12 && d.lng > -10)
  const ottoman = DESTINATIONS.filter(d => d.lng > 12 && d.lat < 45)
  const europe = DESTINATIONS.filter(d => d.lat > 43 || (d.lng > 9 && d.lat > 40))

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 064 · Conquest & Exile</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Reconquista<br />& The Exodus</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Where the expelled went when Spain chose purity over civilization
          </p>
        </div>
        <p className="text-[13px] max-w-[580px] leading-[1.7] mt-6" style={{ color: C.text }}>
          In 1492, Ferdinand and Isabella completed the longest military campaign in
          European history — 770 years to reclaim a peninsula that was conquered in seven.
          Then, in the same year, they signed the Alhambra Decree: convert or leave.
          The Jews went first. The Muslims followed, in waves, over the next 122 years.
          By 1614, Spain had emptied itself of the communities that had built its libraries,
          its palaces, its irrigation systems, and its economy. They scattered across the
          Mediterranean — to Morocco, Algeria, Tunisia, the <span className="underline underline-offset-2">Ottoman</span> Empire, Amsterdam,
          Livorno. They carried with them the DNA of al-Andalus. This module maps where
          they went, and what they brought.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '770', l: 'years of Reconquista', c: C.christian },
            { v: '1492', l: 'fall of Granada', c: C.ink },
            { v: '~300K', l: 'Moriscos expelled', c: C.muslim },
            { v: '16', l: 'diaspora cities mapped', c: C.both },
          ].map((n, i) => (
            <div key={i} className="transition-all duration-700" style={{ opacity: heroR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}><span className="text-[28px] font-bold">{n.v}</span></p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-8">
        <div ref={timeR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: C.christian }}>The Reconquista · 711–1614</p>

          <div className="space-y-0">
            {RECONQUISTA_TIMELINE.map((ph, i) => {
              const isExpanded = expandedPhase === i
              // Color shifts from muslim green to christian red as Reconquista progresses
              const progress = i / (RECONQUISTA_TIMELINE.length - 1)
              const yearColor = progress < 0.4 ? C.muslim : progress < 0.7 ? C.both : C.christian
              return (
                <button key={i} onClick={() => setExpandedPhase(isExpanded ? null : i)}
                  className="w-full text-left transition-all duration-300"
                  style={{ opacity: timeR.vis ? 1 : 0, transitionDelay: `${i * 40}ms` }}>
                  <div className="flex gap-4 py-2.5 border-b" style={{ borderColor: C.border, borderLeftWidth: isExpanded ? '3px' : '0', borderLeftColor: yearColor, paddingLeft: isExpanded ? '12px' : '0' }}>
                    <div className="shrink-0 w-[48px]">
                      <p className="font-mono text-[13px] font-bold" style={{ color: yearColor }}>
                        {ph.year}{ph.endYear ? `–${String(ph.endYear).slice(2)}` : ''}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[14px]">{ph.title}</p>
                      {isExpanded && (
                        <div className="mt-2">
                          <p className="text-[12px] leading-[1.65]" style={{ color: C.text }}>{ph.story}</p>
                          <p className="font-mono text-[10px] mt-2 italic" style={{ color: yearColor }}>{ph.keyFact}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DIASPORA MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={mapR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.both }}>The Exodus · Where They Went</p>
          <p className="text-[12px] mb-4" style={{ color: C.muted }}>
            Red dot = Granada (origin). Dashed lines = diaspora routes. Click any destination city.
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            <button onClick={() => setCommFilter(null)}
              className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono transition-all"
              style={{ background: !commFilter ? C.ink : 'transparent', color: !commFilter ? 'white' : C.muted, border: `1px solid ${!commFilter ? C.ink : C.border}` }}>
              All communities
            </button>
            {(['muslim', 'jewish', 'both'] as Community[]).map(c => (
              <button key={c} onClick={() => setCommFilter(commFilter === c ? null : c)}
                className="px-2.5 py-1 text-[9px] tracking-wider font-mono transition-all"
                style={{ background: commFilter === c ? COMM_COLOR[c] : 'transparent', color: commFilter === c ? 'white' : COMM_COLOR[c], border: `1px solid ${commFilter === c ? COMM_COLOR[c] : `${COMM_COLOR[c]}40`}` }}>
                {COMM_LABEL[c]}
              </button>
            ))}
          </div>

          <div className="relative">
            {mapLoaded && <DiasporaMap selectedDest={selectedDest} onSelectDest={setSelectedDest} commFilter={commFilter} />}

            {selDest && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[400px] p-5 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg max-h-[320px] overflow-y-auto"
                style={{ borderLeft: `3px solid ${COMM_COLOR[selDest.community]}` }}>
                <button onClick={() => setSelectedDest(null)} className="absolute top-3 right-3 text-[11px] hover:opacity-60" style={{ color: C.muted }}>✕</button>
                <span className="inline-block px-2 py-0.5 text-[8px] uppercase tracking-wider font-mono mb-2"
                  style={{ background: `${COMM_COLOR[selDest.community]}12`, color: COMM_COLOR[selDest.community] }}>
                  {COMM_LABEL[selDest.community]} diaspora
                </span>
                <h3 className="font-serif text-[20px] leading-tight">{selDest.name}</h3>
                <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{selDest.population}</p>
                <p className="text-[12px] mt-3 leading-[1.6]" style={{ color: C.text }}>{selDest.story}</p>
                <div className="mt-3 pt-2 border-t" style={{ borderColor: C.border }}>
                  <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: C.muted }}>Legacy</p>
                  <p className="text-[11px] leading-[1.5]" style={{ color: C.muted }}>{selDest.legacy}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ DESTINATION LIST ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: C.both }}>Diaspora Destinations</p>

          {[
            { label: 'North Africa', sites: northAfrica },
            { label: 'Ottoman Empire', sites: ottoman },
            { label: 'Western Europe', sites: europe },
          ].map(group => (
            <div key={group.label} className="mb-6">
              <p className="font-mono text-[11px] uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: C.text, borderColor: C.border }}>
                {group.label} ({group.sites.length})
              </p>
              <div className="space-y-2">
                {group.sites.map((d) => {
                  const idx = DESTINATIONS.indexOf(d)
                  const color = COMM_COLOR[d.community]
                  return (
                    <button key={idx} onClick={() => setSelectedDest(idx)}
                      className="w-full text-left flex items-start gap-3 py-1.5 hover:opacity-80 transition-all"
                      style={{ borderLeft: selectedDest === idx ? `3px solid ${color}` : '3px solid transparent', paddingLeft: '10px' }}>
                      <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ background: color }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="font-serif text-[14px]">{d.name}</span>
                          <span className="font-mono text-[9px]" style={{ color }}>{COMM_LABEL[d.community]}</span>
                        </div>
                        <p className="font-mono text-[9px]" style={{ color: C.muted }}>{d.population}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.both }}>Reading Notes</p>
          <div className="space-y-6 text-[12px] leading-[1.7] max-w-[600px]" style={{ color: C.text }}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The same year</p>
              <p>January 2, 1492: Granada surrenders. March 31: the Alhambra Decree expels the Jews. August 3: Columbus sails. The completion of the Reconquista, the beginning of the Jewish diaspora, and the launch of the colonial project all happen in the same calendar year, ordered by the same monarchs. Columbus&apos;s crew included conversos. His voyage was partly motivated by a desire to find allies against Islam and fund a new crusade for Jerusalem. 1492 is not three separate stories. It is one.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>Bayezid and Ferdinand</p>
              <p>Sultan Bayezid II of the Ottoman Empire reportedly said of Ferdinand: &quot;You call Ferdinand a wise ruler — he who has impoverished his own country and enriched mine?&quot; The Ottomans actively welcomed Sephardic Jews. Bayezid sent ships to bring refugees from Spain. They brought the printing press, commercial expertise, diplomatic languages, and medical knowledge. Thessaloniki became a majority-Jewish city — the only one in Europe — and remained so for 450 years.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The Sarajevo Haggadah</p>
              <p>A 14th-century illuminated manuscript created in Barcelona. Carried out of Spain in 1492. Survived the Inquisition. Surfaced in Sarajevo. Hidden from the Nazis by a Muslim librarian who risked his life. Hidden again during the Bosnian War in a bank vault. Now Bosnia&apos;s most valuable cultural artifact — a Jewish text from Spain, saved twice by Muslims, in a city that was once Ottoman.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The numbers</p>
              <p>Pre-1492 Muslim population of Castile: approximately 500,000. By 1492: 100,000 dead or enslaved, 200,000 emigrated, 200,000 remaining. Jews expelled by the Alhambra Decree: estimated 40,000–200,000 (figures remain debated). Moriscos expelled 1609–1614: 275,000–300,000. Of those, approximately 70,000–100,000 settled in Morocco. The economic devastation was immediate: Valencia lost a third of its population. Agricultural knowledge walked out the door.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sources: Harvey, L.P. <em>Muslims in Spain, 1500–1614</em>. University of Chicago Press, 2005.
            Gerber, Jane S. <em>The Jews of Spain: A History of the Sephardic Experience</em>. Free Press, 1992.
            García-Arenal, Mercedes and Gerard Wiegers (eds.). <em>The Expulsion of the Moriscos from Spain: A Mediterranean Diaspora</em>. Brill, 2014.
            Kennedy, Hugh. <em>Muslim Spain and Portugal</em>. Routledge, 1996.
            De Epalza, Míkel. <em>Los moriscos antes y después de la expulsión</em>. Mapfre, 1992.
            Wikipedia: &quot;Reconquista,&quot; &quot;Alhambra Decree,&quot; &quot;Expulsion of Jews from Spain,&quot; &quot;Expulsion of the Moriscos,&quot; &quot;Sephardic Jews,&quot; &quot;Thessaloniki,&quot; &quot;Chefchaouen,&quot; &quot;Tétouan.&quot;
            Eurasia Review: &quot;Expulsion of Sephardic Jews from Spain in 1492 and Their Relocation and Success in Morocco.&quot;
            National Library of Israel: &quot;The Jewish Expulsion From Spain and the Sephardic Diaspora.&quot;
            Sephardic U: &quot;History of Sephardic Jews.&quot;
            Al-Andalus y la Historia: &quot;The Expulsion of the Moriscos.&quot;
            Coordinates via Google Earth and OpenStreetMap.
          </p>
          <p className="font-mono text-[9px] mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            © Slow Morocco. All rights reserved. This visualization may not be reproduced without visible attribution.
          </p>
        </div>
      </section>
    </div>
  )
}
