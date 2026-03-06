'use client'

import { useState, useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────
// The Four Imperial Cities
// Module 068 — Political & Cultural Intelligence
// Sources: UNESCO WHC, Wikipedia (Fez, Marrakech,
// Meknes, Rabat), Morocco World News, Visit Morocco,
// Wanderlust, Crossroads Cultural Exchange
// ─────────────────────────────────────────────────

interface ImperialCity {
  id: string
  name: string
  arabicName: string
  founded: string
  foundedBy: string
  dynastiesAsCapital: string[]
  nickname: string
  population: string
  unesco: string
  monuments: string[]
  detail: string
  keyFact: string
  lat: number
  lng: number
  color: string
}

const CITIES: ImperialCity[] = [
  {
    id: 'fez', name: 'Fez', arabicName: 'فاس',
    founded: '789 AD', foundedBy: 'Idris I (Idrisid dynasty)',
    dynastiesAsCapital: ['Idrisid (789–974)', 'Marinid (1244–1465)', 'Wattasid (1471–1554)', 'Dila\'ite (1659–1663)', 'Alaouite (1666–1672, 1727–1912)'],
    nickname: 'Spiritual & Cultural Capital · "Athens of Africa" · "Mecca of the West"',
    population: '~1.2 million',
    unesco: 'Medina of Fez — UNESCO World Heritage Site, 1981',
    monuments: ['University of al-Qarawiyyin (859 — oldest continuously operating university, founded by Fatima al-Fihri)', 'Bou Inania Madrasa (1351–56, Marinid — only madrasa functioning as congregational mosque)', 'Al-Attarine Madrasa (1325, Marinid)', 'Chouara Tanneries (11th century — still operating)', 'Zawiya of Moulay Idris II', 'Dar al-Magana Water Clock (14th C)', 'Al-Qarawiyyin Library (oldest in the world, ~4,000 manuscripts)', 'Fez Jdid (1276 — Marinid "New Fez")', 'Mellah (Jewish Quarter — first in Morocco)', 'Borj Nord & Borj Sud (16th C Saadian bastions)'],
    detail: 'The oldest of the four. Founded on the Wadi Fez by Idris I, expanded by Idris II (809). Became the largest city in the world under the Almohads (~200,000 people, 12th–13th C). Golden age under the Marinids (13th–15th C) who built Fez Jdid, the great madrasas, and the al-Qarawiyyin library (~1350). Fez el-Bali: 9,000+ alleys, ~300 hectares — one of the world\'s largest car-free urban areas. Walls extend nearly 10 miles. 13 kasbahs constructed throughout history. Lost capital status to Rabat in 1912 under the French Protectorate but retains its status as Morocco\'s cultural and spiritual centre. The intellectual exchange between Fez and European universities (via Toledo and Córdoba) helped catalyse the European Renaissance.',
    keyFact: 'Home to the oldest university in the world — al-Qarawiyyin (859 AD), founded by a woman, Fatima al-Fihri.',
    lat: 34.0331, lng: -5.0003, color: '#2D5F8A',
  },
  {
    id: 'marrakech', name: 'Marrakech', arabicName: 'مراكش',
    founded: '1070–1071 AD', foundedBy: 'Youssef Ibn Tachfin (Almoravid dynasty)',
    dynastiesAsCapital: ['Almoravid (1071–1147)', 'Almohad (1147–1269)', 'Saadian (1554–1659)', 'Alaouite (intermittent)'],
    nickname: 'The Red City · City of a Thousand and One Nights',
    population: '~1.0 million',
    unesco: 'Medina of Marrakech — UNESCO World Heritage Site, 1985',
    monuments: ['Koutoubia Mosque (1147–99, Almohad — 77m minaret, inspired Giralda of Seville & Hassan Tower)', 'Jemaa el-Fna (UNESCO Masterpiece of Oral & Intangible Heritage, 2008)', 'Madrasa Ben Youssef (16th C — largest in Morocco)', 'El Badi Palace (1578, Saadian Sultan Ahmad al-Mansur — "The Incomparable")', 'Saadian Tombs (16th C — discovered 1917)', 'Bahia Palace (19th C — 8,000 m²)', 'Majorelle Garden (1924, Jacques Majorelle / Yves Saint Laurent)', 'Walls (12th C Almohad — 2m thick, 9m tall, red clay)'],
    detail: 'The city that gave Morocco its name (from "Murrākuš"). Founded as an Almoravid military and trading post controlling trans-Saharan routes. The Almohads conquered it in 1147, destroyed Almoravid monuments, and built the Koutoubia Mosque — whose 77m minaret became the template for the Giralda in Seville and Hassan Tower in Rabat. Under the Saadian Sultan Ahmad al-Mansur al-Dhahabi ("The Golden"), Marrakech experienced a second golden age: El Badi Palace, the Saadian Tombs, and control of the Timbuktu gold routes. The 12th-century walls — made of red clay pisé — give the city its iconic colour and nickname. Jemaa el-Fna transforms from market to carnival nightly: storytellers, musicians, food vendors. Winston Churchill called Marrakech "Paris of the Sahara."',
    keyFact: 'Gave Morocco its name. The Koutoubia Mosque\'s 77m minaret inspired the Giralda of Seville.',
    lat: 31.6295, lng: -7.9811, color: '#A0452E',
  },
  {
    id: 'meknes', name: 'Meknès', arabicName: 'مكناس',
    founded: '11th century AD', foundedBy: 'Almoravids (on the site of Meknassa Berber settlement, 9th C)',
    dynastiesAsCapital: ['Alaouite (1672–1727, under Sultan Moulay Ismail)'],
    nickname: 'The Versailles of Morocco · Agricultural Capital',
    population: '~650,000',
    unesco: 'Historic City of Meknes — UNESCO World Heritage Site, 1996',
    monuments: ['Bab al-Mansour (one of the largest gates in North Africa)', 'Royal Stables (Heri es-Souani — designed for 12,000 horses, underground granaries)', 'Moulay Ismail Mausoleum', 'Place el-Hedim (central square)', 'Bou Inania Madrasa (14th C Marinid)', 'Dar Jamai Palace (1882, now Museum of Moroccan Arts)', '40+ km of walls, 15m high', 'Agdal Basin (vast water reservoir)'],
    detail: 'The youngest imperial city. Rose from military outpost to imperial capital under one man: Sultan Moulay Ismail (r. 1672–1727), the Alaouite ruler who made Meknès his "Versailles." He built over 40 km of walls (15m high), massive palaces, gardens, the legendary royal stables designed for 12,000 horses with underground granaries and an ingenious water-cooling system, and the Agdal Basin. His reign lasted 55 years — the longest of any Moroccan sultan. After his death, his sons fought for succession, and the capital moved to Fez, then Rabat. Meknès never regained its imperial status but retains the monumental scale of Ismail\'s ambition. Sits on the fertile Saïss Plain — known today as Morocco\'s agricultural capital. Nearby Volubilis preserves Roman-era ruins (UNESCO, 1997).',
    keyFact: 'Moulay Ismail\'s royal stables were designed for 12,000 horses. He ruled for 55 years.',
    lat: 33.8935, lng: -5.5547, color: '#F59E0B',
  },
  {
    id: 'rabat', name: 'Rabat', arabicName: 'الرباط',
    founded: '12th century AD (fortified)', foundedBy: 'Almohad caliph Yaqub al-Mansur (1195)',
    dynastiesAsCapital: ['Almohad (briefly, late 12th C)', 'Alaouite (from 18th C under Mohammed III)', 'French Protectorate (1912–1956)', 'Independent Morocco (1956–present)'],
    nickname: 'Modern Capital · City of Light',
    population: '~580,000 (1.8M+ metropolitan with Salé and Témara)',
    unesco: 'Rabat, Modern Capital and Historic City — UNESCO World Heritage Site, 2012',
    monuments: ['Hassan Tower (begun 1195, Almohad — intended as world\'s largest mosque, never completed)', 'Kasbah of the Udayas (12th C Almohad — winding steps added 17th C by Andalusian refugees)', 'Chellah Necropolis (Phoenician Sala Colonia → Roman → Marinid)', 'Mohammed V Mausoleum (1971 — tombs of Mohammed V, Hassan II, Prince Moulay Abdallah)', 'Dar al-Makhzan (Royal Palace)', 'Andalusian Wall (built by Morisco refugees after 1609 expulsion from Spain)', 'Mohammed VI Museum of Modern & Contemporary Art (2014)'],
    detail: 'The political capital. The Almohads built it as a ribat (fortified monastery) for launching campaigns into Iberia. Yaqub al-Mansur — fresh from victory at the Battle of Alarcos (1195) — began construction of what would have been the world\'s largest mosque. He died before completion. The unfinished Hassan Tower (44m of a planned 86m) and 200 remaining columns still stand as Morocco\'s most poignant monument. Morisco refugees from Spain settled here after 1609, building the Andalusian Wall. The French chose Rabat as administrative capital in 1912, and it remained the capital at independence (1956). Today it houses the Royal Palace, all foreign embassies, and Morocco\'s parliament. The 2012 UNESCO inscription uniquely recognises both the historic and modern city — from Almohad fortress to Art Deco Ville Nouvelle.',
    keyFact: 'Hassan Tower was meant to crown the world\'s largest mosque. The sultan died. It was never finished.',
    lat: 34.0209, lng: -6.8416, color: '#5C7C3E',
  },
]

interface Dynasty {
  name: string
  period: string
  origin: string
  capital: string
  legacy: string
  color: string
}

const DYNASTIES: Dynasty[] = [
  { name: 'Idrisid', period: '788–974', origin: 'Arab (descendant of Prophet Muhammad via Ali)', capital: 'Fez (founded 789)', legacy: 'First Muslim dynasty of Morocco. Founded Fez. Established Morocco as an independent state. Al-Qarawiyyin founded 859.', color: '#2D5F8A' },
  { name: 'Almoravid', period: '1040–1147', origin: 'Sanhaja Berber (Saharan)', capital: 'Marrakech (founded 1070)', legacy: 'Founded Marrakech. Empire from Sahara to Spain. Strict Maliki Islam. Built Ben Youssef Mosque.', color: '#A0452E' },
  { name: 'Almohad', period: '1121–1269', origin: 'Masmuda Berber (High Atlas)', capital: 'Marrakech, then Rabat', legacy: 'Built Koutoubia, Hassan Tower, Kasbah of Udayas. Empire stretched from Libya to Spain. Intellectual golden age.', color: '#7B506F' },
  { name: 'Marinid', period: '1244–1465', origin: 'Zenata Berber (eastern Morocco)', capital: 'Fez (Fez Jdid built 1276)', legacy: 'Fez\'s golden age. Built the great madrasas (Bou Inania, Al-Attarine). Al-Qarawiyyin library. First mellah.', color: '#2D5F8A' },
  { name: 'Wattasid', period: '1471–1554', origin: 'Zenata Berber (Marinid branch)', capital: 'Fez', legacy: 'Continued Marinid Fez. Weakened by Portuguese coastal incursions.', color: '#6B7280' },
  { name: 'Saadian', period: '1554–1659', origin: 'Arab (sharifs from Draa Valley)', capital: 'Marrakech', legacy: 'El Badi Palace, Saadian Tombs. Defeated Portuguese at Battle of Three Kings (1578). Timbuktu campaign (1591). Sugar dynasty.', color: '#A0452E' },
  { name: 'Alaouite', period: '1631–present', origin: 'Arab (sharifs from Tafilalt)', capital: 'Fez → Meknès → Fez → Rabat', legacy: 'Current ruling dynasty. Moulay Ismail built Meknès. Mohammed V led independence. Mohammed VI reigns today.', color: '#F59E0B' },
]

const HERO_STATS = [
  { value: '4', label: 'Imperial cities' },
  { value: '7', label: 'Dynasties' },
  { value: '1,233', label: 'Years — Fez to Rabat' },
  { value: '789', label: 'AD — Morocco\'s first capital' },
]

const KEY_NUMBERS = [
  { value: '859', label: 'Al-Qarawiyyin founded', note: 'By Fatima al-Fihri. Oldest continuously operating university. Founded by a woman.' },
  { value: '9,000+', label: 'Alleys in Fez medina', note: '~300 hectares. World\'s largest car-free urban area. UNESCO 1981.' },
  { value: '77m', label: 'Koutoubia minaret', note: 'Marrakech\'s Almohad masterpiece. Template for Seville\'s Giralda and Rabat\'s Hassan Tower.' },
  { value: '55', label: 'Years of Moulay Ismail\'s reign', note: '1672–1727. Longest-reigning Moroccan sultan. Built 40+ km of walls around Meknès.' },
  { value: '1912', label: 'Capital moves to Rabat', note: 'French Protectorate. Fez loses capital status after 1,100+ years of intermittent rule.' },
  { value: '2012', label: 'Rabat UNESCO inscription', note: 'Uniquely recognises both historic and modern city. From Almohad fortress to Art Deco.' },
]

export function ImperialCitiesContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [expandedCity, setExpandedCity] = useState<string | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return
    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      // @ts-ignore
      await import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-6.5, 33.0],
        zoom: 5.8,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        CITIES.forEach(c => {
          const el = document.createElement('div')
          el.style.cssText = `width:20px;height:20px;background:${c.color};border-radius:50%;border:3px solid #0a0a0a;cursor:pointer;box-shadow:0 0 12px ${c.color}44;`
          const popup = new mapboxgl.Popup({ offset: 14, maxWidth: '320px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:16px;font-weight:700;color:#f5f5f5;">${c.name}</div>
                <div style="font-size:12px;color:${c.color};margin-top:2px;">${c.arabicName} · Founded ${c.founded}</div>
                <div style="font-size:11px;color:#aaa;margin-top:4px;">${c.nickname}</div>
                <div style="font-size:10px;color:#666;margin-top:4px;">${c.keyFact}</div>
              </div>
            `)
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([c.lng, c.lat])
            .setPopup(popup)
            .addTo(map)
          markersRef.current.push(marker)
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Gate / arch pattern */}
            {Array.from({ length: 8 }, (_, i) => {
              const cx = 150 + i * 140
              return (
                <g key={i}>
                  <path d={`M ${cx - 40} 500 L ${cx - 40} 300 A 40 50 0 0 1 ${cx + 40} 300 L ${cx + 40} 500`} fill="none" stroke="#D4A373" strokeWidth="0.4" />
                  <path d={`M ${cx - 30} 500 L ${cx - 30} 310 A 30 40 0 0 1 ${cx + 30} 310 L ${cx + 30} 500`} fill="none" stroke="#D4A373" strokeWidth="0.3" />
                  <line x1={cx - 40} y1={500} x2={cx + 40} y2={500} stroke="#D4A373" strokeWidth="0.3" />
                </g>
              )
            })}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#D4A373', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 068 — Political &amp; Cultural Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Four<br />Imperial Cities
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Each dynasty chose its capital. From the Idrisids founding
            Fez in 789 to Rabat becoming the modern seat of power
            in 1912 — seven dynasties, four cities, and the political
            architecture of a kingdom.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#D4A373', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#D4A373' }}>001 — The Power Map</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Four Capitals, Seven Dynasties</h2>

          <div className="flex flex-wrap gap-5 mb-6">
            {CITIES.map(c => (
              <div key={c.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: c.color, boxShadow: `0 0 6px ${c.color}44` }} />
                <span className="text-[11px]" style={{ color: '#aaa' }}>{c.name} · {c.founded}</span>
              </div>
            ))}
          </div>

          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '480px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ FOUR CITIES ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Cities</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Each One a Kingdom</h2>

          <div className="space-y-0">
            {CITIES.map((c, i) => {
              const isVisible = visibleSections.has(`city-${i}`)
              const isExpanded = expandedCity === c.id
              return (
                <div key={c.id} data-sid={`city-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="flex items-start justify-between gap-4 cursor-pointer" onClick={() => setExpandedCity(isExpanded ? null : c.id)}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                        <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: c.color }}>Founded {c.founded}</span>
                      </div>
                      <h3 className="font-serif text-[32px] md:text-[42px] italic text-dwl-black leading-tight">{c.name}</h3>
                      <p className="text-[18px] mt-0.5" style={{ color: '#999' }}>{c.arabicName}</p>
                    </div>
                    <span className="text-[24px] mt-2 transition-transform" style={{ color: '#ccc', transform: isExpanded ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>Nickname</p>
                      <p className="text-[13px] text-dwl-body leading-relaxed">{c.nickname}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>Population</p>
                      <p className="text-[13px] text-dwl-body">{c.population}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>UNESCO</p>
                      <p className="text-[13px] text-dwl-body">{c.unesco}</p>
                    </div>
                  </div>

                  <p className="text-[13px] font-medium mt-4" style={{ color: c.color }}>{c.keyFact}</p>

                  {isExpanded && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8" style={{ animation: 'fadeUp 0.4s ease forwards' }}>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: c.color }}>History</p>
                        <p className="text-[14px] text-dwl-body leading-relaxed mb-5">{c.detail}</p>

                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: c.color }}>Capital Under</p>
                        <div className="space-y-1">
                          {c.dynastiesAsCapital.map((d, j) => (
                            <p key={j} className="text-[13px] text-dwl-body flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: c.color }} />
                              {d}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: c.color }}>Key Monuments</p>
                        <div className="space-y-1.5">
                          {c.monuments.map((m, j) => (
                            <p key={j} className="text-[12px] text-dwl-body flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: c.color }} />
                              {m}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#D4A373' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#0a0a0a' }}>
            Although the political capital was transferred to Rabat in 1912,
            Fez has retained its status as the country&rsquo;s cultural and
            spiritual centre.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(10,10,10,0.5)' }}>— UNESCO World Heritage Centre</p>
        </div>
      </section>

      {/* ═══ DYNASTY TIMELINE ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#D4A373' }}>003 — The Dynasties</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>Seven Houses, One Throne</h2>

          <div className="space-y-0">
            {DYNASTIES.map((d, i) => {
              const isVisible = visibleSections.has(`dyn-${i}`)
              return (
                <div key={d.name} data-sid={`dyn-${i}`} className="py-5 transition-all duration-700" style={{ borderTop: '1px solid #1a1a1a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 md:gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                        <span className="text-[14px] font-medium" style={{ color: '#f5f5f5' }}>{d.name}</span>
                      </div>
                      <p className="text-[12px]" style={{ color: d.color }}>{d.period}</p>
                      <p className="text-[11px] mt-1" style={{ color: '#666' }}>{d.origin}</p>
                    </div>
                    <div>
                      <p className="text-[12px] mb-1" style={{ color: '#aaa' }}>Capital: <span style={{ color: '#f5f5f5' }}>{d.capital}</span></p>
                      <p className="text-[12px] leading-relaxed" style={{ color: '#888' }}>{d.legacy}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#111' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#D4A373' }}>
            Fez has never relinquished its heritage. More than anywhere else
            in Morocco, and perhaps the entire Arab world, this is the place
            to see a medieval city still living, still breathing.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Moroccan National Tourist Office</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {KEY_NUMBERS.map((n) => (
              <div key={n.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[32px] md:text-[44px] text-dwl-black leading-none">{n.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{n.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {[
              'UNESCO World Heritage Centre: Medina of Fez (1981), Medina of Marrakech (1985), Historic City of Meknes (1996), Rabat Modern Capital & Historic City (2012)',
              'Wikipedia — Fez, Morocco: Population, Idrisid founding, Marinid golden age, al-Qarawiyyin (859), Fez Jdid (1276), car-free urban area',
              'Wikipedia — Fes el Bali: 9,000+ alleys, ~300 hectares, Almohad-era walls, Bou Inania/Al-Attarine madrasas, Mellah, Borj Nord/Sud',
              'Morocco World News: Dynasty timeline, Moulay Ismail\'s Meknès, Almohad Rabat, Saadian Marrakech, Koutoubia inspiring Giralda',
              'Visit Morocco (National Tourist Office): Fez "still living, still breathing," Marrakech four dynasties, Moulay Ismail legend',
              'Wanderlust: UNESCO sites guide, al-Qarawiyyin as oldest university, Meknes Bab al-Mansour, Khanata bint Bakkar',
              'Crossroads Cultural Exchange: Fez medina walls/gates/kasbahs, Marinid madrasas, Saadian bastions, Rabat Hassan Tower',
              'Malika in Morocco: Comprehensive dynasty-capital mapping, Fez as capital for Idrisid/Marinid/Wattasid/Alaouite',
              'Oasis Aventure / CaramelTrail: Al-Qarawiyyin founded by Fatima al-Fihri, 4,000 manuscripts, oldest library in world',
              'Journey Morocco / Mozarkech: Moulay Ismail 40km walls, Battle of Alarcos, Mohammed III designating Rabat, French Protectorate 1912',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#D4A373' }}>Sources: UNESCO, HCP Morocco</p>
          </div>
        </div>
      </section>
    </div>
  )
}
