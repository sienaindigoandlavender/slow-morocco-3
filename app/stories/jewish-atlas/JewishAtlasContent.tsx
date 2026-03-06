'use client'

import { useState, useEffect, useRef } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const C = {
  toshavim: '#8B6914', megorashim: '#5D4E7A', both: '#2D6E4F',
  ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
}

// ═══ COMMUNITY TYPE ═══
type Origin = 'toshavim' | 'megorashim' | 'both'
const ORIGIN_LABEL: Record<Origin, string> = { toshavim: 'Toshavim (Indigenous)', megorashim: 'Megorashim (Sephardic)', both: 'Both Communities' }
const ORIGIN_COLOR: Record<Origin, string> = { toshavim: C.toshavim, megorashim: C.megorashim, both: C.both }

// ═══ TIMELINE ═══
interface TimeEvent {
  year: number; endYear?: number; title: string; story: string; keyFact: string
}

const TIMELINE: TimeEvent[] = [
  { year: -500, title: 'Ancient Origins', story: 'Jewish traders and settlers arrive in North Africa, possibly as early as the 6th century BCE. Some traditions link Moroccan Jewish presence to the destruction of the First Temple (586 BCE). By the Roman period, Jewish communities exist across Mauretania Tingitana. Some scholars believe Amazigh tribes converted to Judaism — the origin of the "Berber Jews" of the Atlas and Saharan fringe.', keyFact: '2,500+ years of continuous presence.' },
  { year: 70, title: 'After the Temple', story: 'The destruction of the Second Temple by Rome in 70 CE sends waves of Jewish refugees across the Mediterranean. Some settle in Morocco, joining existing communities. By this time, Jewish presence is documented in Volubilis. These early communities — speakers of Amazigh and later Arabic — become the Toshavim: the indigenous Jews of Morocco.', keyFact: 'Toshavim: "residents." They were there first.' },
  { year: 788, title: 'Idrisid Foundation', story: 'When Idris I founds Fes, a Jewish community settles in the new city from the beginning. Jews participate in trade, crafts, and diplomacy. Under successive dynasties — Almoravid, Almohad, Marinid — Jewish fortunes rise and fall. The Almohad period (1147–1269) is the most oppressive: forced conversions, destruction of synagogues.', keyFact: 'Jews present in Fes from its founding.' },
  { year: 1391, title: 'First Iberian Refugees', story: 'Anti-Jewish pogroms sweep Spain. Massacres in Seville, Córdoba, Toledo. Thousands of Jews flee south across the Strait. They bring Spanish language, Sephardic liturgy, and commercial expertise. This is the first major wave of Megorashim — "exiles" — arriving in Morocco.', keyFact: 'The Megorashim arrive: a new community within a community.' },
  { year: 1438, title: 'First Mellah (Fes)', story: 'Sultan Abu Sa\'id Uthman III creates the first mellah — a walled Jewish quarter — in Fes. Located near the royal palace, ostensibly for protection. The word "mellah" derives from the Arabic for "salt" — the marshy, saline area where the quarter was built. Not a European ghetto: Jews had their own markets, synagogues, cemeteries, and governance. But it was still segregation.', keyFact: 'Mellah: not a ghetto, but not freedom either.' },
  { year: 1492, title: 'The Great Expulsion', story: 'The Alhambra Decree. An estimated 50,000 Jews cross to Morocco. Sultan Muhammad al-Shaykh al-Wattasi officially welcomes them, but conditions are brutal. Bands of robbers attack refugees on the roads to Fes. Twenty thousand die from famine and disease camping in fields outside the city. The Megorashim arrive with wealth, Spanish language, European commercial skills — and profound trauma.', keyFact: '~50,000 arrive. ~20,000 die on the road or in fields.' },
  { year: 1500, endYear: 1700, title: 'Two Communities, One Quarter', story: 'The Toshavim and Megorashim live side by side but remain distinct. Separate synagogues. Separate burial grounds. Different marriage contracts (ketubot). Different languages: Toshavim speak Arabic and Amazigh. Megorashim speak Haketia (Judeo-Spanish). The Megorashim gradually dominate — their scholarly and mercantile elite status gives them political access to the sultan\'s court.', keyFact: 'Separate synagogues for 300 years.' },
  { year: 1557, title: 'Shmuel Palache & Diplomacy', story: 'Jewish diplomats become crucial intermediaries between Morocco and Europe. The Palache family of Fes negotiates the 1610 Morocco-Netherlands treaty. Shmuel Palache — rabbi, merchant, diplomat, privateer — personifies the Moroccan Jewish role as bridge between civilizations. Jews serve as Tujjar as-Sultan (merchants of the Sultan), handling long-distance trade.', keyFact: 'Jewish diplomats brokered Morocco\'s first European treaty.' },
  { year: 1672, endYear: 1727, title: 'Moulay Ismail\'s Meknes', story: 'The Alaouite sultan Moulay Ismail moves the capital to Meknes and creates a new mellah there (1682). Jewish artisans — especially metalworkers, silversmiths, and tailors — are essential to the imperial project. Some hold senior administrative positions. But the relationship is transactional: Jewish ministers serve at the sultan\'s pleasure and can be dismissed instantly.', keyFact: 'Third mellah in Morocco, built for imperial ambition.' },
  { year: 1764, title: 'Essaouira: The Mogador Experiment', story: 'Sultan Mohammed III founds Essaouira (Mogador) and invites Jewish merchants specifically to develop Atlantic trade with Europe. The Jewish community becomes the economic engine of the port. Jewish traders control much of Morocco\'s maritime commerce. The mellah of Essaouira — one of the largest — becomes a center of Sephardic culture. By the 1800s, it\'s the country\'s most cosmopolitan city.', keyFact: 'A sultan built a city around its Jewish merchants.' },
  { year: 1862, title: 'Alliance Israélite Universelle', story: 'The Alliance Israélite Universelle opens its first Moroccan school in Tetouan. French-language education transforms Jewish communities. Within decades, Moroccan Jews speak French alongside Arabic, Amazigh, Haketia, and Hebrew. The schools create a French-educated elite that will play a decisive role in the colonial period — and in the eventual emigration.', keyFact: 'French education: the door that opened, then pushed people through.' },
  { year: 1912, endYear: 1956, title: 'The Protectorate', story: 'Under French and Spanish protectorates, Jews gain legal equality for the first time. Affluent Jews move out of mellahs into European-planned Villes Nouvelles. But the Vichy period (1940–1944) brings anti-Jewish laws. Mohammed V reportedly refuses to hand over Moroccan Jews to the Nazis — a story that has become central to Moroccan national identity, though its details are debated by historians.', keyFact: 'Mohammed V: "There are no Jews in Morocco, only Moroccan citizens."' },
  { year: 1948, endYear: 1967, title: 'The Great Departure', story: 'Israel is established in 1948. Over the next two decades, the vast majority of Morocco\'s 250,000–300,000 Jews emigrate — to Israel (Operation Yachin, semi-covert Mossad program), to France, Canada, and the Americas. Some leave for Zionist conviction. Some flee rising tensions after Arab-Israeli wars. Some are pushed by economic changes. By 1971, fewer than 35,000 remain.', keyFact: '250,000 → 35,000 in two decades.' },
  { year: 2020, title: 'Today', story: 'Approximately 2,000–3,000 Jews remain in Morocco, mostly in Casablanca. The Museum of Moroccan Judaism in Casablanca is the only Jewish museum in the Arab world. Bayt Dakira (House of Memory) opened in Essaouira. King Mohammed VI has invested in restoring Jewish heritage sites. Tens of thousands of Jewish Moroccans visit annually for hiloula (saint pilgrimage) festivals. Morocco-Israel normalization (2020) reopened formal ties.', keyFact: '~2,500 remain. Tens of thousands visit each year.' },
]

// ═══ COMMUNITIES (MELLAHS + SITES) ═══
interface Community {
  name: string; lat: number; lng: number; origin: Origin
  peakPop: string; story: string; heritage: string
}

const COMMUNITIES: Community[] = [
  { name: 'Fes', lat: 34.061, lng: -4.974, origin: 'both', peakPop: '~40,000 (1940s)',
    story: 'Oldest and most important Jewish community. Present since Fes\'s founding (789). The Mellah of Fes (1438) was the first in Morocco — near the royal palace, with its own markets, 17+ synagogues, cemetery. The Megorashim arrived from 1391 and dominated cultural life, but Toshavim maintained separate traditions. The two communities worshipped in separate synagogues and were buried separately until the 18th century.',
    heritage: 'First mellah (1438), Ibn Danan Synagogue, Aben Danan family, Fes Jewish cemetery, Alfassiyine Synagogue, rabbinical scholarship center' },
  { name: 'Marrakech', lat: 31.630, lng: -7.982, origin: 'both', peakPop: '~35,000 (1940s)',
    story: 'Notable exception: in Marrakech, the Toshavim maintained dominance over the Megorashim. The Marrakech community preserved indigenous Moroccan Jewish customs more faithfully than any other city. The mellah was created in 1558 near the Badi Palace. The Lazama Synagogue — still active — dates to the 16th century. The Jewish cemetery is one of the largest in Morocco.',
    heritage: 'Lazama Synagogue (active), Mellah (1558), Slat al-Azama Synagogue, vast Jewish cemetery, Toshavim customs preserved uniquely' },
  { name: 'Essaouira (Mogador)', lat: 31.508, lng: -9.760, origin: 'megorashim', peakPop: '~17,000 (19th c.)',
    story: 'Built by Sultan Mohammed III in 1764 to develop Atlantic trade. Jewish merchants — recruited by the sultan — became the city\'s economic core. At its peak, Jews were roughly 40% of the population. The Tujjar as-Sultan (Merchants of the Sultan) handled international trade. The mellah was one of Morocco\'s largest. Bayt Dakira (House of Memory) now serves as heritage museum.',
    heritage: 'Bayt Dakira museum, Slat Lkahal Synagogue, Atlantic trade networks, 40% of peak population was Jewish, Tujjar as-Sultan' },
  { name: 'Tetouan', lat: 35.572, lng: -5.368, origin: 'megorashim', peakPop: '~6,000',
    story: 'Heavily Andalusi in character. Sephardic Jews from Granada and Spain settled here after 1492 alongside Muslim refugees. The Haketia language (Judeo-Spanish) survived here longest. The Alliance Israélite Universelle opened its first Moroccan school here in 1862. Under the Spanish Protectorate, the Jewish community gained special status.',
    heritage: 'Haketia language, Alliance school (first in Morocco, 1862), Andalusi synagogue traditions, Spanish Protectorate relations' },
  { name: 'Meknes', lat: 33.893, lng: -5.555, origin: 'both', peakPop: '~15,000',
    story: 'Third mellah in Morocco, created by Moulay Ismail in 1682 when he moved the capital. Jewish metalworkers, silversmiths, and tailors served the imperial project. The community grew under Alaouite patronage. The mellah was near the vast royal complex.',
    heritage: 'Mellah (1682), silverwork tradition, imperial artisan role, rabbi saints pilgrimage sites' },
  { name: 'Casablanca', lat: 33.573, lng: -7.589, origin: 'both', peakPop: '~80,000 (1950s)',
    story: 'A small village until the 20th century. As Morocco modernized under the French Protectorate, Jews from the interior migrated to Casablanca for economic opportunity. By the 1950s, over 80,000 Jews lived there — the largest community in Morocco. Today, Casablanca\'s ~1,000 Jews form the last significant community. Home to the Museum of Moroccan Judaism — the only Jewish museum in the Arab world.',
    heritage: 'Museum of Moroccan Judaism (only in Arab world), Beth-El Synagogue, Temple Beth-El, modern Jewish life center' },
  { name: 'Rabat / Salé', lat: 34.020, lng: -6.836, origin: 'both', peakPop: '~12,000',
    story: 'Jewish presence linked to both the Almohad era and later Morisco period. Salé had an established Jewish community. Rabat\'s mellah near the Kasbah of the Udayas. In the 20th century, Rabat became a center of Jewish institutional life under the Protectorate.',
    heritage: 'Mellah near Kasbah of the Udayas, political institutions, Protectorate-era community organizations' },
  { name: 'Tangier', lat: 35.760, lng: -5.834, origin: 'megorashim', peakPop: '~12,000',
    story: 'International zone (1923–1956) made Tangier cosmopolitan. Multiple Jewish communities coexisted: Sephardic, Moroccan, and small Ashkenazi groups. Haketia spoken. Jews were central to the city\'s multilingual commercial culture. The Jewish community of Gibraltar descends primarily from Tangier and Tetouan Jews.',
    heritage: 'International zone cosmopolitanism, Haketia, Gibraltar diaspora, Synagogue Nahon' },
  { name: 'Sefrou', lat: 33.830, lng: -4.835, origin: 'toshavim', peakPop: '~8,000 (1940s)',
    story: 'A small Atlas foothill town where Jews were approximately one-third of the population. Known for the annual Cherry Festival (Fête des Cerises) where Jewish and Muslim communities celebrated together. One of the best-documented examples of Jewish-Muslim coexistence at the daily, intimate level. The mellah was integrated into the town fabric.',
    heritage: 'Cherry Festival, Jewish-Muslim daily coexistence model, anthropological documentation (Clifford Geertz studied here)' },
  { name: 'Debdou', lat: 33.960, lng: -3.030, origin: 'toshavim', peakPop: '~4,000',
    story: 'Remote eastern town that became a major Toshavim center. Some of the oldest continuous Jewish settlement in Morocco. Amazigh-speaking Jewish community. Far from the Sephardic influence of the coast, Debdou preserved the most archaic indigenous Moroccan Jewish traditions.',
    heritage: 'Oldest continuous Toshavim community, Amazigh-Jewish culture, archaic liturgical traditions' },
  { name: 'Ifrane / Oufrane (Anti-Atlas)', lat: 29.657, lng: -9.500, origin: 'toshavim', peakPop: '~2,500',
    story: 'Not the modern ski resort but the ancient village in the Anti-Atlas. One of the oldest Jewish communities in Morocco — possibly 2,000+ years. Amazigh-speaking Berber Jews. The cemetery contains tombstones dating to the 2nd century CE. Completely rural, completely indigenous, completely unlike the cosmopolitan Sephardic communities of the coast.',
    heritage: 'Ancient cemetery (possibly 2nd century CE), Amazigh-speaking Jews, rural Berber-Jewish culture' },
  { name: 'Demnate', lat: 31.731, lng: -7.003, origin: 'toshavim', peakPop: '~3,000',
    story: 'Atlas mountain town with a significant Toshavim community. Jewish artisans specialized in metalwork and jewellery. The synagogue and mellah were part of the old town fabric. Like other Atlas communities, the Jews of Demnate spoke Amazigh as their first language.',
    heritage: 'Atlas mountain Jewish-Amazigh culture, metalwork, rural mellah' },
  { name: 'Taroudant', lat: 30.470, lng: -8.878, origin: 'toshavim', peakPop: '~3,000',
    story: 'Souss valley town. Jewish community integrated into the Amazigh-speaking Sous culture. Jewish artisans dominated silverwork, leather, and commerce in the region. The Sous Jewish communities had their own distinct traditions, separate from both the Fes Toshavim and the coastal Megorashim.',
    heritage: 'Souss valley silverwork, Amazigh-Jewish artisan traditions' },
]

// ═══ POPULATION DATA (approximate) ═══
const POP_TIMELINE = [
  { year: 1900, pop: 110000 }, { year: 1912, pop: 120000 }, { year: 1936, pop: 225000 },
  { year: 1945, pop: 300000 }, { year: 1948, pop: 280000 }, { year: 1956, pop: 250000 },
  { year: 1960, pop: 160000 }, { year: 1967, pop: 60000 }, { year: 1971, pop: 35000 },
  { year: 1980, pop: 18000 }, { year: 1990, pop: 8000 }, { year: 2000, pop: 5500 },
  { year: 2010, pop: 3000 }, { year: 2025, pop: 2500 },
]
const MAX_POP = 300000

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
function JewishMap({ selectedComm, onSelectComm, originFilter }: {
  selectedComm: number | null; onSelectComm: (i: number) => void; originFilter: Origin | null
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
      container: mapContainer.current, style: 'mapbox://styles/mapbox/light-v11',
      center: [-6.5, 32.5], zoom: 5.3, accessToken: MAPBOX_TOKEN, attributionControl: false,
    })
    m.addControl(new mapboxgl.NavigationControl(), 'top-right')
    m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    m.on('load', () => {
      COMMUNITIES.forEach((c, i) => {
        const el = document.createElement('div')
        const color = ORIGIN_COLOR[c.origin]
        const size = (c.name === 'Fes' || c.name === 'Casablanca' || c.name === 'Marrakech') ? 14 : 10
        el.style.cssText = `width:${size}px;height:${size}px;background:${color};border:2px solid ${color};border-radius:50%;cursor:pointer;transition:all 0.3s;box-shadow:0 1px 4px rgba(0,0,0,0.25);`
        el.title = c.name
        el.addEventListener('click', () => onSelectComm(i))
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)'; el.style.boxShadow = `0 0 12px ${color}50` })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.25)' })
        const marker = new mapboxgl.Marker({ element: el }).setLngLat([c.lng, c.lat]).addTo(m)
        markersRef.current.push(marker)
      })
    })
    map.current = m
    return () => m.remove()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    markersRef.current.forEach((marker, i) => {
      const c = COMMUNITIES[i]
      const visible = !originFilter || c.origin === originFilter || c.origin === 'both'
      marker.getElement().style.opacity = visible ? '1' : '0.15'
    })
  }, [originFilter])

  useEffect(() => {
    if (selectedComm !== null && map.current) {
      const c = COMMUNITIES[selectedComm]
      map.current.flyTo({ center: [c.lng, c.lat], zoom: 10, duration: 1000 })
      markersRef.current.forEach((marker, i) => { marker.getElement().style.transform = i === selectedComm ? 'scale(2)' : 'scale(1)' })
    }
  }, [selectedComm])

  return <div ref={mapContainer} className="w-full rounded-sm" style={{ height: '520px' }} />
}

// ═══ PAGE ═══
export function JewishAtlasContent() {
  const [selectedComm, setSelectedComm] = useState<number | null>(null)
  const [originFilter, setOriginFilter] = useState<Origin | null>(null)
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const heroR = useReveal()
  const popR = useReveal()

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('mapbox-gl-jewish')) {
      const link = document.createElement('link'); link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
      document.head.appendChild(link)
      const script = document.createElement('script'); script.id = 'mapbox-gl-jewish'
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.js'
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else { setMapLoaded(true) }
  }, [])

  const selComm = selectedComm !== null ? COMMUNITIES[selectedComm] : null

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 065 · Religious & Cultural Geography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Jewish Atlas<br />of Morocco</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Toshavim and Megorashim: two communities, one country, 2,500 years
          </p>
        </div>
        <p className="text-[13px] max-w-[580px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Two Jewish communities shared Morocco for centuries but were not the same people.
          The <strong>Toshavim</strong> — "residents" — were there first. <span className="underline underline-offset-2">Amazigh</span>-speaking,
          Arabic-speaking, present since antiquity. Some lived in the <span className="underline underline-offset-2">Atlas Mountains</span> and the
          Saharan fringe. The <strong>Megorashim</strong> — "exiles" — arrived from Spain
          after 1391 and 1492, bringing Sephardic liturgy, Haketia language, and European
          commerce. They worshipped in separate synagogues. Were buried in separate cemeteries.
          Maintained separate marriage contracts for 300 years. Only in the 18th century did
          the two communities blend — and even then, not everywhere. At their peak in the
          1940s, 300,000 Jews lived in Morocco. Today, fewer than 2,500 remain.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '2,500+', l: 'years of presence', c: C.toshavim },
            { v: '300K', l: 'peak population (1945)', c: C.both },
            { v: '~2,500', l: 'remain today', c: C.ink },
            { v: '14', l: 'communities mapped', c: C.megorashim },
          ].map((n, i) => (
            <div key={i} className="transition-all duration-700" style={{ opacity: heroR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}><span className="text-[28px] font-bold">{n.v}</span></p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.both }}>Jewish Communities of Morocco</p>
          <p className="text-[12px] mb-4" style={{ color: C.muted }}>Click any community. Filter by origin.</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button onClick={() => setOriginFilter(null)}
              className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono transition-all"
              style={{ background: !originFilter ? C.ink : 'transparent', color: !originFilter ? 'white' : C.muted, border: `1px solid ${!originFilter ? C.ink : C.border}` }}>
              All communities
            </button>
            {(['toshavim', 'megorashim'] as Origin[]).map(o => (
              <button key={o} onClick={() => setOriginFilter(originFilter === o ? null : o)}
                className="px-2.5 py-1 text-[9px] tracking-wider font-mono transition-all"
                style={{ background: originFilter === o ? ORIGIN_COLOR[o] : 'transparent', color: originFilter === o ? 'white' : ORIGIN_COLOR[o], border: `1px solid ${originFilter === o ? ORIGIN_COLOR[o] : `${ORIGIN_COLOR[o]}40`}` }}>
                {ORIGIN_LABEL[o]}
              </button>
            ))}
          </div>
          <div className="relative">
            {mapLoaded && <JewishMap selectedComm={selectedComm} onSelectComm={setSelectedComm} originFilter={originFilter} />}
            {selComm && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[400px] p-5 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg max-h-[320px] overflow-y-auto"
                style={{ borderLeft: `3px solid ${ORIGIN_COLOR[selComm.origin]}` }}>
                <button onClick={() => setSelectedComm(null)} className="absolute top-3 right-3 text-[11px] hover:opacity-60" style={{ color: C.muted }}>✕</button>
                <span className="inline-block px-2 py-0.5 text-[8px] uppercase tracking-wider font-mono mb-2"
                  style={{ background: `${ORIGIN_COLOR[selComm.origin]}12`, color: ORIGIN_COLOR[selComm.origin] }}>
                  {ORIGIN_LABEL[selComm.origin]}
                </span>
                <h3 className="font-serif text-[20px] leading-tight">{selComm.name}</h3>
                <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>Peak: {selComm.peakPop}</p>
                <p className="text-[12px] mt-3 leading-[1.6]" style={{ color: C.text }}>{selComm.story}</p>
                <div className="mt-3 pt-2 border-t" style={{ borderColor: C.border }}>
                  <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: C.muted }}>Heritage</p>
                  <p className="text-[11px] leading-[1.5]" style={{ color: C.muted }}>{selComm.heritage}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ POPULATION CHART ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={popR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.both }}>Population · 1900–2025</p>
          <div className="h-[200px] flex items-end gap-1 md:gap-2">
            {POP_TIMELINE.map((d, i) => {
              const h = (d.pop / MAX_POP) * 180
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 transition-all duration-700"
                  style={{ opacity: popR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                  <span className="font-mono text-[8px]" style={{ color: C.muted }}>{d.pop >= 1000 ? `${Math.round(d.pop/1000)}K` : d.pop}</span>
                  <div className="w-full rounded-t-sm transition-all duration-700" style={{ height: `${h}px`, background: d.pop > 100000 ? C.both : d.pop > 10000 ? C.toshavim : '#ccc' }} />
                  <span className="font-mono text-[8px]" style={{ color: C.muted }}>{d.year}</span>
                </div>
              )
            })}
          </div>
          <p className="font-mono text-[10px] italic mt-3" style={{ color: C.muted }}>
            300,000 → 2,500. The steepest decline happens between 1948 and 1971.
          </p>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: C.toshavim }}>Timeline · 2,500 Years</p>
          <div className="space-y-0">
            {TIMELINE.map((ev, i) => {
              const isExpanded = expandedPhase === i
              return (
                <button key={i} onClick={() => setExpandedPhase(isExpanded ? null : i)} className="w-full text-left transition-all duration-300">
                  <div className="flex gap-4 py-2.5 border-b" style={{ borderColor: C.border, borderLeftWidth: isExpanded ? '3px' : '0', borderLeftColor: C.both, paddingLeft: isExpanded ? '12px' : '0' }}>
                    <div className="shrink-0 w-[60px]">
                      <p className="font-mono text-[13px] font-bold" style={{ color: C.both }}>
                        {ev.year < 0 ? `${Math.abs(ev.year)} BCE` : ev.year}{ev.endYear ? `–${String(ev.endYear).slice(-2)}` : ''}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[14px]">{ev.title}</p>
                      {isExpanded && (
                        <div className="mt-2">
                          <p className="text-[12px] leading-[1.65]" style={{ color: C.text }}>{ev.story}</p>
                          <p className="font-mono text-[10px] mt-2 italic" style={{ color: C.both }}>{ev.keyFact}</p>
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

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.both }}>Reading Notes</p>
          <div className="space-y-6 text-[12px] leading-[1.7] max-w-[600px]" style={{ color: C.text }}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The distinction that matters</p>
              <p>Most accounts of Moroccan Jews treat them as one community. They were not. The Toshavim were indigenous — present for millennia, speaking Amazigh and Arabic, practicing their own liturgy. The Megorashim arrived from Spain bearing a different language (Haketia), different rituals (Sephardic), different commercial skills (European trade networks), and a different social status (often wealthy, always educated). They worshipped separately for 300 years. Their surnames still tell the story: Toledano (from Toledo), Corcos (from Cáceres), Assouline (Amazigh: "from rock").</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The mellah</p>
              <p>Not a European ghetto. The mellah was placed near the royal palace — proximity to power, not exile from it. Jews had their own markets, courts, synagogues, and governance. But it was still a walled quarter with gates that closed at night. The first was created in Fes in 1438. By the 19th century, most Moroccan cities had one. The word itself comes from the Arabic for salt — the saline, marshy land where the Fes quarter was built.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The Berber Jews</p>
              <p>In the Atlas Mountains, the Anti-Atlas, and the Saharan fringe, Jewish communities lived in rural villages, spoke Amazigh, and maintained traditions that predated both the Sephardic and the urban Arabic-speaking communities. The cemetery at Ifrane (Anti-Atlas) may contain tombstones from the 2nd century CE. These were not city merchants — they were farmers, herders, and village artisans. Their traditions were the most archaic and the least documented.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The disappearance</p>
              <p>In 1945, there were 300,000 Jews in Morocco. By 1971, there were 35,000. Today, approximately 2,500. The reasons are multiple and contested: Zionist conviction, Operation Yachin (semi-covert Israeli emigration program), rising Arab-Israeli tensions, economic restructuring, the pull of France and Canada. The departure was not a single event but a generation-long hemorrhage. What remains are cemeteries, synagogues (some restored, some crumbling), and tens of thousands of diaspora visitors who return each year for hiloula — the anniversary celebrations at the tombs of rabbi-saints.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sources: Zafrani, Haïm. <em>Two Thousand Years of Jewish Life in Morocco</em>. Sephardic House, 2005.
            Deshen, Shlomo A. <em>The Mellah Society: Jewish Community Life in Sherifian Morocco</em>. University of Chicago Press, 1989.
            Boum, Aomar. <em>Memories of Absence: How Muslims Remember Jews in Morocco</em>. Stanford University Press, 2013.
            Gerber, Jane S. <em>The Jews of Spain: A History of the Sephardic Experience</em>. Free Press, 1992.
            Wikipedia: &quot;Moroccan Jews,&quot; &quot;History of the Jews in Morocco,&quot; &quot;Mellah,&quot; &quot;Maghrebi Jews.&quot;
            World Jewish Congress: &quot;Legacy of Jews in the MENA — Morocco.&quot;
            Chabad.org: &quot;19 Facts About Moroccan Jews.&quot;
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
