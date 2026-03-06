'use client'

import { useState, useEffect, useRef } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

// === PALETTE -- deep greens, golds, sacred tones ===
const C = {
  ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
}

// === BROTHERHOOD DATA ===
interface Brotherhood {
  id: string
  name: string
  arabic: string
  founder: string
  founderDates: string
  founded: string
  hq: string
  color: string
  followers: string
  doctrine: string
  practice: string
  political: string
  parent?: string
  global: string
}

const BROTHERHOODS: Brotherhood[] = [
  {
    id: 'tijaniyya', name: 'Tijaniyya', arabic: '\u0627\u0644\u062a\u062c\u0627\u0646\u064a\u0629',
    founder: 'Ahmad al-Tijani', founderDates: '1737\u20131815',
    founded: 'c. 1784 (Fes)', hq: 'Zawiya Tijaniyya, Fes',
    color: '#2D6E4F', followers: '100\u2013300 million worldwide',
    doctrine: 'Exclusive allegiance \u2014 members cannot belong to another tariqa. Direct spiritual link to the Prophet without intermediary chain. The Tijani wird (litany) is considered sufficient for spiritual perfection.',
    practice: 'Dhikr twice daily: morning and evening. Wazifa (collective prayer) on Fridays. Recitation of Salat al-Fatih and Jawharat al-Kamal. No asceticism required \u2014 members can be merchants, professionals, intellectuals.',
    political: 'The politically consequential brotherhood. Tijani warriors built empires in West Africa (El Hadj Umar Tall\'s Toucouleur Empire). Today Morocco uses the Tijaniyya as its primary instrument of religious diplomacy across sub-Saharan Africa. The Mohammed VI Foundation of African Ulema operates largely through Tijani networks.',
    global: 'Senegal (half the population), Nigeria, Niger, Mali, Guinea, Ghana, Mauritania, Algeria, Tunisia, Egypt, Indonesia',
  },
  {
    id: 'qadiriyya-boutchichiyya', name: 'Qadiriyya Boutchichiyya', arabic: '\u0627\u0644\u0642\u0627\u062f\u0631\u064a\u0629 \u0627\u0644\u0628\u0648\u062f\u0634\u064a\u0634\u064a\u0629',
    founder: 'Sidi Ali Boutchich', founderDates: 'late 19th century',
    founded: 'c. 1890s (Madagh)', hq: 'Madagh, Berkane Province (northeast Morocco)',
    color: '#C17F28', followers: 'Several hundred thousand in Morocco',
    doctrine: 'Branch of the global Qadiriyya tracing to Abd al-Qadir al-Jilani of Baghdad. Emphasizes spiritual purification (tazkiyat al-nafs), inner transformation over outward display. Silsila traces directly to the Prophet through al-Jilani.',
    practice: 'Collective dhikr sessions. Annual gathering at Madagh draws tens of thousands. Spiritual education (tarbiya) under a living shaykh. The current leader Mouad was appointed in 2025 after the death of Shaykh Jamal.',
    political: 'The crown jewel of Moroccan state-Sufi policy. After the 2003 Casablanca bombings, Mohammed VI elevated the Boutchichiyya as the state\'s preferred counter-extremism instrument. The Minister of Islamic Affairs since 2002, Ahmed Taoufiq, is a Boutchichi disciple. Officially apolitical \u2014 functionally the monarchy\'s spiritual arm.',
    parent: 'Qadiriyya',
    global: 'Morocco (primary), France, Belgium, Niger, Senegal, Europe, Asia',
  },
  {
    id: 'darqawiyya', name: 'Darqawiyya', arabic: '\u0627\u0644\u062f\u0631\u0642\u0627\u0648\u064a\u0629',
    founder: 'Muhammad al-Arabi al-Darqawi', founderDates: '1760\u20131823',
    founded: 'c. 1790s (Beni Zerwal, Rif)', hq: 'Amjout (Beni Zerwal), northern Morocco',
    color: '#722F37', followers: 'Widespread across Morocco and Algeria',
    doctrine: 'Revivalist branch of the Shadhiliyya. Exalts poverty, asceticism, and radical simplicity. The shaykh demanded his followers wear patched clothing and reject worldly comfort. Popular among rural populations and urban lower classes.',
    practice: 'Musical dhikr sessions with instruments \u2014 unusual in orthodox Sufism. Ecstatic practices. Weekly gatherings at zawiyas across the country. The Darqawi zawiya in Casablanca\'s old medina still holds Sunday dhikr after Asr prayer.',
    political: 'The most rebellious brotherhood. Darqawi shaykhs led uprisings against both Moroccan sultans and French/Spanish colonizers. Called "ferocious sectarians" and "puritans of Islam" by French administrators. Refused to separate faith from resistance.',
    parent: 'Shadhiliyya',
    global: 'Morocco, Algeria, Tunisia, Libya, East Africa, Syria',
  },
  {
    id: 'gnawa', name: 'Gnawa', arabic: '\u0643\u0646\u0627\u0648\u0629',
    founder: 'No single founder \u2014 rooted in sub-Saharan traditions',
    founderDates: '15th\u201317th centuries (emergence)',
    founded: 'Marrakech & Essaouira (oldest centres)', hq: 'Essaouira & Marrakech',
    color: '#1A3C5E', followers: 'Tens of thousands of practitioners',
    doctrine: 'Not a tariqa in the classical sense. A spiritual tradition blending Sufi Islam with sub-Saharan African practices brought by enslaved peoples. Recognizes Islamic saints alongside spirits (mluk/jnoun). Seven colors represent seven spirit families. Sidi Bilal \u2014 the Ethiopian companion of the Prophet \u2014 is the spiritual ancestor.',
    practice: 'The lila (night ceremony): all-night trance ritual with guembri (3-string bass lute), qraqeb (iron castanets), and call-and-response chanting. Specific songs invoke specific spirits. Colors of garments and incense match spirit families. Healing through music and possession.',
    political: 'Historically marginalized as "Black Islam" by orthodox scholars. Rehabilitated since Morocco\'s UNESCO inscription of Gnawa culture in 2019 (Intangible Cultural Heritage). The Essaouira Gnaoua Festival, backed by the state, draws 500,000+ visitors annually. Now promoted as evidence of Morocco\'s African identity and cultural tolerance.',
    global: 'Morocco (primary), Algeria, Tunisia, Libya, diaspora in France and Belgium',
  },
  {
    id: 'aissawa', name: 'Aissawa', arabic: '\u0627\u0644\u0639\u064a\u0633\u0627\u0648\u064a\u0629',
    founder: 'Muhammad ibn Issa (Shaykh al-Kamil)', founderDates: '1465\u20131526',
    founded: 'c. 1500 (Mekn\u00e8s)', hq: 'Zawiya al-Aissawiyya, Mekn\u00e8s',
    color: '#8B3A3A', followers: 'Widespread in Morocco and North Africa',
    doctrine: 'Emphasizes the "Perfect Master" (al-Kamil) concept. Followers achieve union with the divine through extreme devotion. Known for miraculous practices \u2014 handling snakes, eating glass, piercing flesh without harm. These practices are interpreted as signs of spiritual mastery over the material world.',
    practice: 'The hadra: ecstatic group ceremony with drums, oboe (ghaita), and rhythmic body movement leading to trance states. Annual moussem in Mekn\u00e8s draws thousands. Processions through streets with music, incense, and spiritual demonstrations.',
    political: 'Tolerated but watched. The ecstatic practices have been criticized by both orthodox Islamic scholars and secular modernizers. The colonial French administration tried to suppress them. Today the moussem survives as cultural heritage rather than political force, though the brotherhood retains deep roots in Mekn\u00e8s and surrounding regions.',
    global: 'Morocco, Algeria, Tunisia, Libya, Egypt',
  },
  {
    id: 'nasiriyya', name: 'Nasiriyya', arabic: '\u0627\u0644\u0646\u0627\u0635\u0631\u064a\u0629',
    founder: 'Muhammad ibn Nasir', founderDates: '1603\u20131674',
    founded: 'c. 1640 (Tamegrout)', hq: 'Zaouia Nasiriyya, Tamegrout (Draa Valley)',
    color: '#6B5B3A', followers: 'Regional (Draa-Tafilalet)',
    doctrine: 'Branch of the Shadhiliyya. Emphasizes scholarship, education, and manuscript preservation alongside spiritual practice. The Tamegrout library holds one of Morocco\'s most important collections of Islamic manuscripts \u2014 including a 500-year-old Pythagorean text in Arabic and a 300-year-old illuminated Quran.',
    practice: 'Combines scholarly study with Sufi dhikr. The zawiya historically functioned as a university, caravan stop, hospital, and court of arbitration. Pottery made with distinctive green glaze from the zawiya\'s workshops is still produced and sold locally.',
    political: 'Powerful in the 17th century as intermediaries between the Saharan trade routes and the Alaouite state. Lost political influence but retained cultural prestige through the library and manuscript tradition. The zawiya remains an active center of learning in the Draa Valley.',
    parent: 'Shadhiliyya',
    global: 'Morocco (Draa-Tafilalet primarily), Saharan trade network historically',
  },
  {
    id: 'wazzaniyya', name: 'Wazzaniyya', arabic: '\u0627\u0644\u0648\u0632\u0627\u0646\u064a\u0629',
    founder: 'Moulay Abdallah al-Sharif', founderDates: '1596\u20131678',
    founded: 'c. 1630 (Ouazzane)', hq: 'Zaouia of Moulay Abdallah, Ouazzane',
    color: '#4A7A5E', followers: 'Regional (Rif, Gharb)',
    doctrine: 'Sharifian brotherhood \u2014 the founders claim direct descent from the Prophet through Moulay Idriss. This double authority (Sufi legitimacy + prophetic lineage) made them uniquely powerful. Doctrine emphasizes charity, intercession, and the baraka of the sharifian bloodline.',
    practice: 'Annual moussem at Ouazzane. The zawiya historically offered sanctuary \u2014 even to European diplomats. The city of Ouazzane itself was considered sacred territory where no blood could be shed.',
    political: 'One of the few brotherhoods that maintained diplomatic relations with European powers. British and French consuls sought their mediation. Their sharifian status gave them a quasi-sovereignty that rivaled the sultan\'s. They played both sides during colonization \u2014 some branches collaborated with France, others resisted.',
    parent: 'Shadhiliyya (loose affiliation)',
    global: 'Morocco (northern regions), minor presence in Algeria',
  },
  {
    id: 'jazuliyya', name: 'Jazuliyya', arabic: '\u0627\u0644\u062c\u0632\u0648\u0644\u064a\u0629',
    founder: 'Muhammad ibn Sulayman al-Jazuli', founderDates: 'c. 1390\u20131465',
    founded: 'c. 1440s (Sous/Marrakech)', hq: 'Zawiya of Sidi Ben Slimane, Marrakech',
    color: '#5D4E7A', followers: 'Historical (absorbed into sub-orders)',
    doctrine: 'Al-Jazuli\'s Dala\'il al-Khayrat is the most recited book of prayers on the Prophet after the Quran. His doctrine combined Shadhili mysticism with a popular devotional movement centered on love of the Prophet. Revolutionary for making Sufi practice accessible to common people, not just elites.',
    practice: 'Collective recitation of the Dala\'il al-Khayrat. The text was so popular it was copied, illuminated, and memorized across the Muslim world from Morocco to Indonesia. His followers \u2014 the Jazuliyya \u2014 became a political force that helped the Saadians overthrow the Wattasids.',
    political: 'The Jazuliyya transformed 15th\u201316th century politics. Jazuli\'s disciples helped bring the Saadian dynasty to power. His body was moved from Essaouira to Marrakech by the Saadians to claim his baraka. Two of the Seven Saints of Marrakech (Sidi Abdelaziz and al-Ghazwani) were his direct students.',
    parent: 'Shadhiliyya',
    global: 'Historical: across the Muslim world through the Dala\'il al-Khayrat',
  },
]

// === ZAOUIA LOCATIONS ===
interface Zaouia {
  name: string
  brotherhood: string
  lat: number
  lng: number
  city: string
  region: string
  significance: string
  era: string
  active: boolean
}

const ZAOUIAS: Zaouia[] = [
  // TIJANIYYA
  { name: 'Zawiya Tijaniyya', brotherhood: 'tijaniyya', lat: 34.0635, lng: -4.9740, city: 'Fes', region: 'Fes-Mekn\u00e8s', significance: 'Mother zawiya. Tomb of Ahmad al-Tijani. Global pilgrimage site \u2014 Senegalese, Nigerian, and West African Tijanis visit annually.', era: '18th century', active: true },
  { name: 'Zawiya Tijaniyya (Ain Madhi)', brotherhood: 'tijaniyya', lat: 33.80, lng: 2.30, city: 'A\u00efn Madhi', region: 'Algeria (Laghouat)', significance: 'Birthplace of Ahmad al-Tijani. Second most important Tijani site after Fes.', era: '18th century', active: true },
  { name: 'Zawiya Tijaniyya (Marrakech)', brotherhood: 'tijaniyya', lat: 31.633, lng: -7.987, city: 'Marrakech', region: 'Marrakech-Safi', significance: 'Regional chapter. Active Tijani community in the medina.', era: '19th century', active: true },

  // BOUTCHICHIYYA
  { name: 'Zawiya of Madagh', brotherhood: 'qadiriyya-boutchichiyya', lat: 34.86, lng: -2.32, city: 'Madagh (Berkane)', region: 'Oriental', significance: 'Mother zawiya. Annual gathering draws tens of thousands. Epicenter of the most politically influential brotherhood in contemporary Morocco.', era: '19th century', active: true },
  { name: 'Boutchichi Zawiya (Casablanca)', brotherhood: 'qadiriyya-boutchichiyya', lat: 33.59, lng: -7.62, city: 'Casablanca', region: 'Casablanca-Settat', significance: 'Urban chapter for Morocco\'s largest city. Regular dhikr sessions.', era: '20th century', active: true },
  { name: 'Boutchichi Zawiya (Rabat)', brotherhood: 'qadiriyya-boutchichiyya', lat: 34.02, lng: -6.83, city: 'Rabat', region: 'Rabat-Sal\u00e9-K\u00e9nitra', significance: 'Capital city chapter. Close proximity to political power.', era: '20th century', active: true },

  // DARQAWIYYA
  { name: 'Zawiya Darqawiyya (Amjout)', brotherhood: 'darqawiyya', lat: 34.58, lng: -4.35, city: 'Amjout (Beni Zerwal)', region: 'Fes-Mekn\u00e8s', significance: 'Tomb of al-Darqawi. Origin site of the most rebellious Sufi order in Moroccan history.', era: '18th century', active: true },
  { name: 'Darqawi Zawiya (Casablanca Medina)', brotherhood: 'darqawiyya', lat: 33.598, lng: -7.612, city: 'Casablanca', region: 'Casablanca-Settat', significance: 'Active Sunday dhikr after Asr prayer. One of the last urban Darqawi circles.', era: '19th century', active: true },
  { name: 'Darqawi Zawiya (Tetouan)', brotherhood: 'darqawiyya', lat: 35.57, lng: -5.37, city: 'Tetouan', region: 'Tanger-Tetouan-Al Hoceima', significance: 'Northern chapter. Darqawi influence strong in the Rif.', era: '19th century', active: true },

  // GNAWA
  { name: 'Gnawa Shrines (Essaouira)', brotherhood: 'gnawa', lat: 31.513, lng: -9.770, city: 'Essaouira', region: 'Marrakech-Safi', significance: 'Spiritual capital of Gnawa culture. UNESCO Intangible Heritage site. Annual Gnaoua World Music Festival (500K+ visitors).', era: '16th\u201317th century', active: true },
  { name: 'Sidi Bilal Zawiya (Marrakech)', brotherhood: 'gnawa', lat: 31.628, lng: -7.993, city: 'Marrakech', region: 'Marrakech-Safi', significance: 'Dedicated to Sidi Bilal, spiritual ancestor of Gnawa. Lila ceremonies held here.', era: '17th century', active: true },
  { name: 'Gnawa Quarter (Mekn\u00e8s)', brotherhood: 'gnawa', lat: 33.89, lng: -5.56, city: 'Mekn\u00e8s', region: 'Fes-Mekn\u00e8s', significance: 'Historical Gnawa community dating to Moulay Ismail\'s importation of sub-Saharan soldiers and enslaved peoples.', era: '17th century', active: true },

  // AISSAWA
  { name: 'Zawiya al-Aissawiyya', brotherhood: 'aissawa', lat: 33.893, lng: -5.554, city: 'Mekn\u00e8s', region: 'Fes-Mekn\u00e8s', significance: 'Mother zawiya. Tomb of the "Perfect Master." Annual moussem with hadra ceremonies.', era: '16th century', active: true },
  { name: 'Aissawa Zawiya (Fes)', brotherhood: 'aissawa', lat: 34.06, lng: -4.98, city: 'Fes', region: 'Fes-Mekn\u00e8s', significance: 'Active chapter in the spiritual capital. Regular trance ceremonies.', era: '16th century', active: true },

  // NASIRIYYA
  { name: 'Zaouia Nasiriyya (Tamegrout)', brotherhood: 'nasiriyya', lat: 30.26, lng: -5.68, city: 'Tamegrout', region: 'Draa-Tafilalet', significance: 'Mother zawiya. Home to one of Morocco\'s most important manuscript libraries. 4,000+ manuscripts including Qurans from the 12th century. Famous green pottery workshops.', era: '17th century', active: true },

  // WAZZANIYYA
  { name: 'Zaouia of Moulay Abdallah', brotherhood: 'wazzaniyya', lat: 34.80, lng: -5.58, city: 'Ouazzane', region: 'Tanger-Tetouan-Al Hoceima', significance: 'Mother zawiya. The city itself was considered sacred territory. Annual moussem. Sharifian prestige once rivaled the sultan\'s.', era: '17th century', active: true },

  // JAZULIYYA
  { name: 'Zawiya of Sidi Ben Slimane', brotherhood: 'jazuliyya', lat: 31.637, lng: -7.988, city: 'Marrakech', region: 'Marrakech-Safi', significance: 'Tomb of al-Jazuli. One of the Seven Saints. His Dala\'il al-Khayrat is recited from Morocco to Indonesia.', era: '16th century (body transferred from Essaouira)', active: true },

  // ADDITIONAL SIGNIFICANT ZAOUIAS
  { name: 'Zaouia of Moulay Idriss', brotherhood: 'tijaniyya', lat: 34.055, lng: -5.524, city: 'Moulay Idriss Zerhoun', region: 'Fes-Mekn\u00e8s', significance: 'Morocco\'s holiest city. Tomb of Moulay Idriss I, founder of the Idrisid dynasty. Not a brotherhood-specific site but a pilgrimage destination for all orders. Six visits here equal one hajj.', era: '8th century', active: true },
  { name: 'Jebel al-Alam', brotherhood: 'darqawiyya', lat: 35.28, lng: -5.42, city: 'South of Tangier', region: 'Tanger-Tetouan-Al Hoceima', significance: 'Mausoleum of Abdeslam ben Mchich, founder of the Shadhiliyya root from which most Moroccan tariqas descend. The mountain is a pilgrimage destination for all Shadhili-derived orders.', era: '13th century', active: true },
  { name: 'Zaouia Dila\'iyya (ruins)', brotherhood: 'nasiriyya', lat: 32.85, lng: -5.95, city: 'Aghbala (Middle Atlas)', region: 'B\u00e9ni Mellal-Kh\u00e9nifra', significance: 'Once the most powerful zawiya in Morocco \u2014 so powerful it formed its own state (1637\u20131668) and threatened Alaouite rule. Burned to the ground by Sultan Moulay Rashid. A cautionary tale: when Sufis reach for the throne, the throne destroys them.', era: '17th century (destroyed)', active: false },
]

// === SILSILA CHAINS ===
interface Chain { from: string; to: string; type: 'teacher-student' | 'branch' | 'influence' }
const CHAINS: Chain[] = [
  { from: 'Shadhiliyya (Abu al-Hasan, 13th c.)', to: 'jazuliyya', type: 'branch' },
  { from: 'jazuliyya', to: 'darqawiyya', type: 'branch' },
  { from: 'jazuliyya', to: 'nasiriyya', type: 'branch' },
  { from: 'jazuliyya', to: 'wazzaniyya', type: 'branch' },
  { from: 'Qadiriyya (al-Jilani, 12th c. Baghdad)', to: 'qadiriyya-boutchichiyya', type: 'branch' },
  { from: 'Qadiriyya (al-Jilani, 12th c. Baghdad)', to: 'gnawa', type: 'influence' },
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

// === MAP ===
function ZaouiaMap({ filter, selected, onSelect }: {
  filter: string | null; selected: number | null; onSelect: (i: number) => void
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
      center: [-5.5, 33.0],
      zoom: 5.3,
      accessToken: MAPBOX_TOKEN,
      attributionControl: false,
    })
    m.addControl(new mapboxgl.NavigationControl(), 'top-right')
    m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    m.on('load', () => {
      ZAOUIAS.forEach((z, i) => {
        const b = BROTHERHOODS.find(br => br.id === z.brotherhood)
        const el = document.createElement('div')
        const size = z.significance.includes('Mother') || z.significance.includes('holiest') ? 16 : 11
        el.style.cssText = `
          width:${size}px;height:${size}px;border-radius:50%;
          background:${b?.color || '#888'};border:2px solid white;
          cursor:pointer;transition:all 0.3s;
          box-shadow:0 1px 4px rgba(0,0,0,0.3);
          opacity:${z.active ? 1 : 0.4};
        `
        el.title = `${z.name} (${b?.name || ''})`
        el.addEventListener('click', () => onSelect(i))
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)'; el.style.boxShadow = `0 0 12px ${b?.color || '#888'}60` })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)' })
        const marker = new mapboxgl.Marker({ element: el }).setLngLat([z.lng, z.lat]).addTo(m)
        markersRef.current.push(marker)
      })
    })

    map.current = m
    return () => m.remove()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Filter visibility
  useEffect(() => {
    markersRef.current.forEach((marker, i) => {
      const z = ZAOUIAS[i]
      const el = marker.getElement()
      const visible = !filter || z.brotherhood === filter
      el.style.opacity = visible ? (z.active ? '1' : '0.4') : '0.12'
      el.style.pointerEvents = visible ? 'auto' : 'none'
    })
  }, [filter])

  // Fly to selected
  useEffect(() => {
    if (selected !== null && map.current) {
      const z = ZAOUIAS[selected]
      map.current.flyTo({ center: [z.lng, z.lat], zoom: z.significance.includes('Mother') ? 12 : 10, duration: 1200 })
      markersRef.current.forEach((marker, i) => {
        const el = marker.getElement()
        if (i === selected) {
          el.style.transform = 'scale(1.8)'
          el.style.boxShadow = `0 0 16px ${BROTHERHOODS.find(b => b.id === ZAOUIAS[i].brotherhood)?.color || '#888'}80`
        } else {
          el.style.transform = 'scale(1)'
        }
      })
    }
  }, [selected])

  return <div ref={mapContainer} className="w-full rounded-sm" style={{ height: '520px' }} />
}

// === MAIN COMPONENT ===
export function ZaouiaMapContent() {
  const [filter, setFilter] = useState<string | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [expandedBrotherhood, setExpandedBrotherhood] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const heroR = useReveal()
  const mapR = useReveal()
  const ordersR = useReveal()

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('mapbox-gl-zaouia')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
      document.head.appendChild(link)
      const script = document.createElement('script')
      script.id = 'mapbox-gl-zaouia'
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.js'
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else {
      setMapLoaded(true)
    }
  }, [])

  const selectedZaouia = selected !== null ? ZAOUIAS[selected] : null
  const selectedBrotherhood = selectedZaouia ? BROTHERHOODS.find(b => b.id === selectedZaouia.brotherhood) : null

  const filteredCount = filter ? ZAOUIAS.filter(z => z.brotherhood === filter).length : ZAOUIAS.length

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* === HERO === */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 059 &middot; Sacred Geography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Zaouia Map</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Where power meets faith
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Morocco has no separation of mosque and state. It has something more
          complicated: a monarchy that governs through spiritual legitimacy, and
          Sufi brotherhoods that hold power without appearing to. The zaouias &mdash;
          part shrine, part school, part political base &mdash; are where these forces
          converge. Eight brotherhoods. Twenty-two sites. Twelve centuries of
          parallel authority.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '8', l: 'brotherhoods mapped', c: '#2D6E4F' },
            { v: '22', l: 'zaouias located', c: '#C17F28' },
            { v: '300M+', l: 'Tijaniyya followers worldwide', c: '#722F37' },
            { v: '1149', l: 'earliest saint mapped', c: C.muted },
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

      {/* === MAP SECTION === */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-8">
        <div ref={mapR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: '#2D6E4F' }}>Sufi Geography of Morocco</p>
          <p className="text-[12px] mb-4" style={{ color: C.muted }}>
            {filteredCount} sites. Larger dots = mother zaouias. Click any marker for details. Filter by brotherhood below.
          </p>

          {/* Brotherhood filter */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button onClick={() => { setFilter(null); setSelected(null) }}
              className="px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all font-mono"
              style={{ background: !filter ? C.ink : 'transparent', color: !filter ? 'white' : C.muted, border: `1px solid ${!filter ? C.ink : C.border}` }}>
              All ({ZAOUIAS.length})
            </button>
            {BROTHERHOODS.map(b => {
              const count = ZAOUIAS.filter(z => z.brotherhood === b.id).length
              return (
                <button key={b.id} onClick={() => { setFilter(filter === b.id ? null : b.id); setSelected(null) }}
                  className="px-3 py-1.5 text-[10px] tracking-wider transition-all font-mono"
                  style={{
                    background: filter === b.id ? b.color : 'transparent',
                    color: filter === b.id ? 'white' : b.color,
                    border: `1px solid ${filter === b.id ? b.color : `${b.color}40`}`,
                  }}>
                  {b.name.replace('Qadiriyya ', '')} ({count})
                </button>
              )
            })}
          </div>

          <div className="relative">
            {mapLoaded && <ZaouiaMap filter={filter} selected={selected} onSelect={setSelected} />}

            {/* Detail overlay */}
            {selectedZaouia && selectedBrotherhood && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[380px] p-5 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg"
                style={{ borderLeft: `3px solid ${selectedBrotherhood.color}` }}>
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-[11px] hover:opacity-60" style={{ color: C.muted }}>&#x2715;</button>
                <span className="inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono mb-2"
                  style={{ background: `${selectedBrotherhood.color}15`, color: selectedBrotherhood.color }}>
                  {selectedBrotherhood.name}
                </span>
                <h3 className="font-serif text-[18px] leading-tight">{selectedZaouia.name}</h3>
                <p className="font-mono text-[11px] mt-1" style={{ color: C.muted }}>
                  {selectedZaouia.city} &middot; {selectedZaouia.region} &middot; {selectedZaouia.era}
                  {!selectedZaouia.active && <span className="ml-2 text-[#8B3A3A]">&middot; Destroyed</span>}
                </p>
                <p className="text-[12px] mt-3 leading-[1.6]" style={{ color: C.text }}>{selectedZaouia.significance}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* === THE BROTHERHOODS === */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={ordersR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: '#2D6E4F' }}>The Orders</p>

          <div className="space-y-4">
            {BROTHERHOODS.map((b, i) => {
              const isExpanded = expandedBrotherhood === b.id
              const zaouiaCount = ZAOUIAS.filter(z => z.brotherhood === b.id).length
              return (
                <div key={b.id} className="transition-all duration-500"
                  style={{ opacity: ordersR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                  {/* Header row */}
                  <button onClick={() => setExpandedBrotherhood(isExpanded ? null : b.id)}
                    className="w-full text-left flex items-start gap-4 py-3 hover:opacity-80 transition-opacity"
                    style={{ borderLeft: `3px solid ${isExpanded ? b.color : 'transparent'}`, paddingLeft: isExpanded ? '16px' : '19px' }}>
                    <span className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ background: b.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-serif text-[20px]">{b.name}</span>
                        <span className="font-mono text-[12px]" style={{ color: C.muted, direction: 'rtl' }}>{b.arabic}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
                        <span className="font-mono text-[10px]" style={{ color: b.color }}>{b.founder}</span>
                        <span className="font-mono text-[10px]" style={{ color: C.muted }}>{b.founded}</span>
                        <span className="font-mono text-[10px]" style={{ color: C.muted }}>{zaouiaCount} site{zaouiaCount !== 1 ? 's' : ''} mapped</span>
                      </div>
                    </div>
                    <span className="font-mono text-[14px] mt-1 shrink-0" style={{ color: C.muted }}>{isExpanded ? '\u2212' : '+'}</span>
                  </button>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="pl-8 pb-4 space-y-4" style={{ borderLeft: `3px solid ${b.color}`, marginLeft: '0' }}>
                      <div className="grid sm:grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: b.color }}>Doctrine</p>
                          <p className="text-[12px] leading-[1.6]" style={{ color: C.text }}>{b.doctrine}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: b.color }}>Practice</p>
                          <p className="text-[12px] leading-[1.6]" style={{ color: C.text }}>{b.practice}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: '#8B3A3A' }}>Power</p>
                        <p className="text-[12px] leading-[1.6]" style={{ color: C.text }}>{b.political}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <span className="font-mono text-[10px]" style={{ color: C.muted }}>Followers: {b.followers}</span>
                        {b.parent && <span className="font-mono text-[10px]" style={{ color: C.muted }}>Branch of: {b.parent}</span>}
                      </div>
                      <p className="font-mono text-[10px]" style={{ color: C.muted }}>Global reach: {b.global}</p>

                      {/* Sites for this brotherhood */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {ZAOUIAS.filter(z => z.brotherhood === b.id).map((z, zi) => (
                          <button key={zi}
                            onClick={() => { setFilter(b.id); setSelected(ZAOUIAS.indexOf(z)) }}
                            className="px-2 py-1 text-[10px] font-mono hover:opacity-70 transition-opacity"
                            style={{ background: `${b.color}10`, color: b.color }}>
                            {z.city}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* === THE STATE-SUFI DYNAMIC === */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>The Pattern</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="font-mono text-[11px] font-semibold mb-2">The Deal</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Since the Alaouites took power in the 17th century, the relationship
                between throne and zaouia has followed one rule: you can have spiritual
                authority or political authority, not both. The Dila&apos;iyya zaouia tried
                for both in the 1660s. Moulay Rashid burned it to the ground. Every
                brotherhood since has understood the message.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold mb-2">The 2003 Pivot</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                After the Casablanca bombings, Mohammed VI redefined Moroccan Islam
                to explicitly include Sufism as a moderate alternative to Salafi
                militancy. The Boutchichiyya became the state&apos;s preferred spiritual
                instrument. The Minister of Islamic Affairs is a Boutchichi disciple.
                Sufism went from tolerated to strategic.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold mb-2">The Africa Play</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Morocco uses the Tijaniyya as its primary vector of religious diplomacy
                in sub-Saharan Africa. The tomb of Ahmad al-Tijani in <span className="underline underline-offset-2">Fes</span> draws tens
                of thousands of West African pilgrims annually. The Mohammed VI Foundation
                of African Ulema operates through Tijani networks. Soft power through
                spiritual kinship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === READING NOTES === */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Reading Notes</p>

          <div className="space-y-4 max-w-[600px]">
            <div>
              <p className="font-mono text-[11px] font-semibold">The Gnawa exception</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                <span className="underline underline-offset-2">Gnawa</span> isn&apos;t a tariqa in the classical sense. It has no single founder,
                no unified doctrine, no formal initiation chain. It is a spiritual
                practice born from the forced migration of sub-Saharan Africans &mdash;
                enslaved peoples who brought their music, their spirits, and their
                healing traditions into Islamic Morocco. The guembri and the qraqeb
                are the sound of that memory. UNESCO recognized it in 2019.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold">The manuscript library</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The Nasiriyya zaouia in Tamegrout holds 4,000+ manuscripts in a
                dimly lit room in the Draa Valley. Illuminated Qurans from the 12th
                century. A Pythagorean text in Arabic. Medical treatises. Star charts.
                The brotherhood preserved knowledge that might otherwise have
                disappeared into the Saharan trade winds.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold">The silsila</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Every tariqa has a silsila &mdash; a chain of transmission linking the
                current shaykh back to the Prophet through an unbroken line of teachers.
                In Morocco, most chains pass through Abu al-Hasan al-Shadhili (d. 1258
                in Tunisia), making the Shadhiliyya the root system from which the
                Jazuliyya, Darqawiyya, Nasiriyya, and Wazzaniyya all branch. The
                Qadiriyya is the other trunk, running through Baghdad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === SOURCES === */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sources: Cornell, Vincent J. <em>Realm of the Saint: Power and Authority in Moroccan Sufism</em>. University of Texas Press, 1998.
            Abun-Nasr, Jamil M. <em>The Tijaniyya: A Sufi Order in the Modern World</em>. Oxford University Press, 1965.
            Trimingham, J.S. <em>The Sufi Orders in Islam</em>. Oxford University Press, 1971.
            Bekkaoui, Khalid &amp; Lar&eacute;mont, Ricardo. &quot;Moroccan Youth Go Sufi.&quot; <em>The Journal of the Middle East and Africa</em>, 2011.
            Eickelman, Dale F. <em>Moroccan Islam: Tradition and Society in a Pilgrimage Center</em>. University of Texas Press, 1976.
            UNESCO Intangible Cultural Heritage: Gnawa (2019 inscription).
            Piraino, Francesco. &quot;Les politiques du soufisme en France.&quot; <em>Social Compass</em>, 2019.
            Site coordinates verified via Google Earth and OpenStreetMap.
          </p>
          <p className="font-mono text-[9px] mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            &copy; Slow Morocco. All rights reserved. This visualization may not be reproduced without visible attribution.
          </p>
        </div>
      </section>
    </div>
  )
}
