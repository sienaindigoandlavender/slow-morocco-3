'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

import dynamic from 'next/dynamic'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  blue: '#0369A1', green: '#15803D', gold: '#A16207', terracotta: '#9A3412', sand: '#D4A853',
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

// ═══════════════════════════════════════════════════
// PART 1: MOROCCO — CONFEDERATIONS & TRIBES
// ═══════════════════════════════════════════════════

interface MoroccanGroup {
  name: string; tamazight: string; meaning: string
  type: 'confederation' | 'tribe' | 'language-group'
  origin: string; region: string; language: string
  population: string; note: string; keyFact: string
  subgroups?: string[]
  // Map data
  center: [number, number] // [lng, lat]
  zoom?: number
}

// Language regions for the map overlay layer — approximate polygon centers & radii
const LANG_REGIONS: { name: string; color: string; areas: { center: [number, number]; label: string }[] }[] = [
  {
    name: 'Tashelhit', color: '#15803D',
    areas: [
      { center: [-8.5, 30.2], label: 'Souss Valley' },
      { center: [-9.2, 29.8], label: 'Anti-Atlas (west)' },
      { center: [-7.8, 29.4], label: 'Anti-Atlas (east)' },
      { center: [-8.0, 31.3], label: 'High Atlas (west)' },
      { center: [-9.7, 30.4], label: 'Agadir region' },
    ]
  },
  {
    name: 'Central Atlas Tamazight', color: '#0369A1',
    areas: [
      { center: [-5.5, 32.8], label: 'Middle Atlas' },
      { center: [-5.0, 32.0], label: 'Khenifra / Zayane' },
      { center: [-6.0, 31.5], label: 'High Atlas (central)' },
      { center: [-5.5, 31.2], label: 'Dadès / Todra' },
      { center: [-4.5, 31.8], label: 'Midelt corridor' },
    ]
  },
  {
    name: 'Tarifit', color: '#9A3412',
    areas: [
      { center: [-3.4, 35.1], label: 'Rif (central)' },
      { center: [-4.0, 35.0], label: 'Rif (west)' },
      { center: [-2.9, 34.9], label: 'Rif (east)' },
    ]
  },
]

const MOROCCO_GROUPS: MoroccanGroup[] = [
  {
    name: 'Aït Atta', tamazight: 'ⴰⵢⵜ ⵄⵟⵟⴰ', meaning: 'Children of Atta',
    type: 'confederation', origin: 'Sanhaja', region: 'Jbel Saghro, Tafilalt, Draa Valley',
    language: 'Central Atlas Tamazight', population: 'Several hundred thousand',
    note: 'Dominant tribal confederation of southeastern Morocco from the 16th–20th centuries. Divided into "five fifths" (khams khmas), all claiming descent from 40 sons of the ancestor Dadda Atta. Expanded from Jbel Saghro northward and southward, raiding as far as Touat in Algeria by the 19th century. Resisted French colonialism until their last stand at the Battle of Bougafer, 1933.',
    keyFact: 'Elected a supreme chief (amghar n-ufilla) annually — rotational democracy predating European models',
    subgroups: ['Aït Wallal', 'Aït Wahlim', 'Aït Isful', 'Aït Yazza', 'Aït Unibgi'],
    center: [-5.8, 31.0],
  },
  {
    name: 'Aït Yafelman', tamazight: 'ⴰⵢⵜ ⵢⴰⴼⵍⵎⴰⵏ', meaning: 'Those who found peace',
    type: 'confederation', origin: 'Sanhaja', region: 'Central High Atlas, Upper Dadès Valley',
    language: 'Central Atlas Tamazight', population: '~200,000 (1960 estimate)',
    note: 'Formed in the 17th century specifically to counter Aït Atta expansion. Four founding tribes: Aït Marghad, Aït Haddidou, Aït Izdeg, Aït Yahya. The Aït Marghad were originally Aït Atta — they split after a conflict over butter tribute. Centuries of warfare between these two confederations shaped southeastern Morocco.',
    keyFact: 'Name literally means "we will find peace" — a military alliance born from the desire to end Aït Atta raids',
    subgroups: ['Aït Marghad', 'Aït Haddidou', 'Aït Izdeg', 'Aït Yahya'],
    center: [-5.7, 31.8],
  },
  {
    name: 'Masmuda', tamazight: 'ⵎⴰⵚⵎⵓⴷⴰ', meaning: 'Ancient confederation name',
    type: 'confederation', origin: 'Baranis (sedentary)', region: 'High Atlas, Anti-Atlas, Atlantic plains',
    language: 'Tashelhit', population: 'Historical — millions of descendants today',
    note: 'One of the three great medieval Berber confederations alongside Zenata and Sanhaja. Ibn Khaldun classified them as Baranis (sedentary). The Almohad dynasty (1121–1269) emerged from the Masmuda. Subgroups included the Ghomaras (northern Morocco), Haha, Hintata, and the Barghawata who created their own religion in the 8th century.',
    keyFact: 'The Almohad Empire — one of the largest in history — was built by Masmuda Berbers from the High Atlas',
    subgroups: ['Ghomara', 'Haha', 'Hintata', 'Barghawata', 'Masmouda proper'],
    center: [-7.5, 31.2],
  },
  {
    name: 'Sanhaja', tamazight: 'ⵚⵏⵀⴰⵊⴰ', meaning: 'Ancient confederation name',
    type: 'confederation', origin: 'Baranis/Butr (debated)', region: 'Sahara, Middle Atlas, Rif',
    language: 'Various', population: 'Historical — millions of descendants',
    note: 'The Almoravid dynasty (1040–1147) emerged from Sanhaja Berbers of the western Sahara. The confederation spanned an enormous territory from Senegal to the Atlas. In medieval Morocco, the Sanhaja were often in conflict with the Zenata. The Tuareg are considered a Sanhaja-related group.',
    keyFact: 'Founded the Almoravid Empire — from the Sahara to Andalusia, from Senegal to Zaragoza',
    subgroups: ['Lamtuna', 'Godala', 'Massufa', 'Aït Atta (Sanhaja origin)'],
    center: [-6.0, 30.0],
  },
  {
    name: 'Zenata', tamazight: 'ⵣⵏⴰⵜⴰ', meaning: 'Ancient confederation name',
    type: 'confederation', origin: 'Butr (nomadic)', region: 'Eastern Morocco, Middle Atlas, northern Sahara',
    language: 'Zenati (various dialects)', population: 'Historical — descendants in eastern Morocco',
    note: 'Ibn Khaldun classified the Zenata as Butr (nomadic). They dominated the eastern Maghreb and were rivals of the Sanhaja. The Marinid dynasty (1244–1465) and Wattasid dynasty (1472–1554) were Zenata Berbers. The Aït Seghrouchen are modern Zenata descendants.',
    keyFact: 'The Marinid dynasty that built the great madrasas of Fes was Zenata Berber',
    subgroups: ['Miknasa', 'Banu Ifran', 'Maghrawa', 'Aït Seghrouchen'],
    center: [-3.5, 33.5],
  },
  {
    name: 'Riffians', tamazight: 'ⵉⵔⵉⴼⵉⵢⵏ', meaning: 'People of the Rif',
    type: 'language-group', origin: 'Various (Zenata influence)', region: 'Rif Mountains, northern Morocco',
    language: 'Tarifit', population: '~3.2% of Morocco (2024 census) — ~1.2 million speakers',
    note: ' Under Abdelkrim El Khattabi, the Riffians defeated a Spanish army of 20,000 at Annual in 1921 — one of the greatest anti-colonial victories in African history. Established the Republic of the Rif (1921–1926) before being defeated by a combined Franco-Spanish force of 250,000.',
    keyFact: 'The Republic of the Rif (1921–1926) was Africa\'s first modern republic',
    subgroups: ['Aït Ouriaghel', 'Aït Waryaghar', 'Temsamane', 'Aït Said', 'Guelaya', 'Beni Bou Ifrour'],
    center: [-3.5, 35.0],
  },
  {
    name: 'Ishilhayen (Shilha/Chleuh)', tamazight: 'ⵉⵛⵍⵃⵉⵢⵏ', meaning: 'People of Tashelhit',
    type: 'language-group', origin: 'Masmuda', region: 'Anti-Atlas, Souss Valley, High Atlas (western)',
    language: 'Tashelhit', population: '~14.2% of Morocco (2024 census) — ~5.3 million speakers',
    note: 'The largest Amazigh group in Morocco by speaker count. Tashelhit has the richest literary tradition of any Berber language. Historically agricultural and merchant people. Many traditional Amazigh films are made in Tashelhit. The Souss Valley is their heartland.',
    keyFact: 'Largest Amazigh language group in Morocco — ~8 million including heritage speakers',
    subgroups: ['Ida Ou Tanane', 'Haha', 'Ida Ou Semlal', 'Aït Baamrane', 'Aït Souss'],
    center: [-8.8, 30.4],
  },
  {
    name: 'Imazighen (Central Atlas)', tamazight: 'ⵉⵎⴰⵣⵉⵖⵏ', meaning: 'Free people',
    type: 'language-group', origin: 'Sanhaja/Zenata', region: 'Middle Atlas, eastern High Atlas',
    language: 'Central Atlas Tamazight', population: '~7.4% of Morocco (2024 census) — ~2.7 million speakers',
    note: 'Self-identify specifically as "Imazighen" — the term that became the pan-Amazigh identity marker. Also known as Beraber. Includes pastoralists, transhumance communities, and settled agricultural groups. Khenifra and the Zayane region are culturally central.',
    keyFact: 'The Zayane resistance under Moha ou Hammou Zayani lasted from 1914 to 1921',
    subgroups: ['Zayane', 'Beni Mguild', 'Aït Oumalou', 'Beni Mtir', 'Aït Youssi'],
    center: [-5.5, 33.0],
  },
]

// ═══════════════════════════════════════════════════
// PART 2: ACROSS AFRICA
// ═══════════════════════════════════════════════════

interface AfricanCountry {
  country: string; population: string; percentage: string
  groups: string; languages: string; status: string; note: string
}

const AFRICA: AfricanCountry[] = [
  {
    country: 'Morocco', population: '14–30 million', percentage: '25–85% (contested)',
    groups: 'Ishilhayen, Riffians, Central Atlas Imazighen, Aït Atta, Aït Yafelman',
    languages: 'Tashelhit (14.2%), Central Atlas Tamazight (7.4%), Tarifit (3.2%)',
    status: 'Official language since 2011. Tifinagh script adopted 2003. IRCAM established 2001. Yennayer national holiday since 2024.',
    note: 'Largest Amazigh population by count. 2024 census: 24.8% Tamazight speakers (Amazigh associations claim 85%). The gap reflects centuries of Arabization and contested methodology.',
  },
  {
    country: 'Algeria', population: '9–15 million', percentage: '15–35% (estimated)',
    groups: 'Kabyles (largest), Chaoui/Shawiya, Mozabites, Tuareg, Chenoua',
    languages: 'Kabyle (~6 million), Chaoui (~3 million), Mozabite (~150K), Tamahaq (~71K)',
    status: 'National language since 2002, official since 2016. The "Black Spring" of 2001 (dozens killed) was a turning point.',
    note: 'Kabylia is the epicenter of the pan-Amazigh political movement. The Amazigh Spring (Tafsut Imazighen) of 1980 started here — the first modern mass protest for Berber rights.',
  },
  {
    country: 'Libya', population: '~286,000 speakers', percentage: '<5%',
    groups: 'Nafusi (Nafusa Mountains), Tuareg (southwest), Ghadamès, Awjila, Zuwarah',
    languages: 'Nafusi (~247K), Tamahaq (~23K), Ghadamès (~13K), Awjila (~3K)',
    status: 'No official recognition under Gaddafi. After 2011, Nafusi speakers demanded constitutional recognition. Berber workshops and language revival spread rapidly.',
    note: 'Under Gaddafi, Berber languages were banned. He even claimed Berbers were Arabs who "forgot their language." The Nafusa Mountains were a rebel stronghold in the 2011 uprising.',
  },
  {
    country: 'Tunisia', population: '~100,000–500,000', percentage: '1–5%',
    groups: 'Djerba Berbers, Matmata, Tamezret, Douiret, Chenini communities',
    languages: 'Various local dialects (no standardized form)',
    status: 'No official recognition. Amazigh identity is acknowledged but marginalized. No constitutional mention.',
    note: 'The smallest Amazigh-speaking community in the Maghreb. Concentrated in the south (Djerba, Matmata, Tataouine). Matmata\'s underground houses (troglodyte dwellings) were used as Luke Skywalker\'s home in Star Wars.',
  },
  {
    country: 'Mali', population: '~800,000 Tuareg', percentage: '~4%',
    groups: 'Tuareg (Kel Tamasheq) — Kel Adagh, Kel Antessar, Iwellemeden',
    languages: 'Tamasheq (~378K), Tawellemmet (~420K)',
    status: 'Tamasheq is a recognized national language. Taught in some schools since the 1960s.',
    note: 'The Tuareg rebellion of 2012 sought independence for Azawad (northern Mali). The city of Timbuktu — once the intellectual capital of West Africa — sits in Tuareg territory. The conflict remains unresolved.',
  },
  {
    country: 'Niger', population: '~1.7 million Tuareg', percentage: '~8%',
    groups: 'Tuareg — Kel Aïr, Kel Azawagh, Kel Gress, Iwellemeden',
    languages: 'Tawellemmet (~450K), Aïr Tamajeq (~250K), Tamahaq (~20K)',
    status: 'Tamasheq is a recognized national language. Some education in Tamasheq.',
    note: 'The Aïr Mountains are the Tuareg heartland of Niger. Multiple Tuareg rebellions (1990–95, 2007–09). The "Blue People" — famous for indigo-dyed clothing that stains the skin.',
  },
  {
    country: 'Burkina Faso', population: '~50,000 Tuareg', percentage: '<1%',
    groups: 'Tuareg (Kel Tamasheq) — small communities in the north',
    languages: 'Tamasheq',
    status: 'Minimal recognition. Tuareg communities concentrated near the Malian border.',
    note: 'The smallest Tuareg community outside North Africa. Caught between Sahelian conflicts.',
  },
  {
    country: 'Mauritania', population: 'Small communities', percentage: '<1%',
    groups: 'Zenaga-speaking communities (near-extinct language)',
    languages: 'Zenaga (~5,000 speakers, critically endangered)',
    status: 'No official recognition. Arabic and Hassaniya dominate.',
    note: 'Zenaga is the last surviving Berber language in Mauritania, spoken by a few thousand people in the southwest. It is critically endangered — most speakers are elderly.',
  },
  {
    country: 'Egypt', population: '~25,000', percentage: '<0.1%',
    groups: 'Siwi Berbers of the Siwa Oasis',
    languages: 'Siwi (~25,000 speakers)',
    status: 'No official recognition. Arabic is the only official language.',
    note: 'The Siwa Oasis sits 550km west of Cairo, near the Libyan border. It is the only Berber-speaking community in Egypt. Alexander the Great visited the Oracle of Amun at Siwa in 331 BC.',
  },
  {
    country: 'Canary Islands (Spain)', population: 'Heritage population', percentage: 'Genetic — significant',
    groups: 'Guanches (pre-colonial, now extinct as distinct group)',
    languages: 'Guanche language (extinct since ~17th century)',
    status: 'The Guanches were absorbed into Spanish colonial society. Their Berber origins were confirmed by DNA studies.',
    note: 'The aboriginal Guanche people were Berber in origin. Their language, now extinct, was closely related to mainland Berber. Spanish colonization in the 15th century ended Guanche independence. Their DNA persists in modern Canarians.',
  },
]

// ═══════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════

const TIMELINE = [
  { year: '~10,000 BC', event: 'Earliest Amazigh cave paintings in Tadrart Acacus (Libya) and Tassili n\'Ajjer (Algeria)' },
  { year: '~3,000 BC', event: 'Berber/Amazigh languages spread westward from the Nile Valley across the Sahara into the Maghreb' },
  { year: '~200 BC', event: 'Oldest dated Libyco-Berber (Tifinagh) inscription. Numidian kingdom under Massinissa unites much of North Africa' },
  { year: '40 AD', event: 'Rome annexes Mauretania. Three popes of Berber origin will serve Rome (Victor I, Miltiades, Gelasius I)' },
  { year: '670–710', event: 'Arab conquest of North Africa. Most Berber tribes convert to Islam over following centuries' },
  { year: '740', event: 'Great Berber Revolt against the Umayyad Caliphate. First major anti-Arab uprising in the Maghreb' },
  { year: '748', event: 'Barghawata Confederation creates its own religion in Morocco\'s Atlantic plains — lasting until the 11th century' },
  { year: '1040–1147', event: 'Almoravid Empire. Sanhaja Berbers from the Sahara build an empire spanning Senegal to Andalusia' },
  { year: '1121–1269', event: 'Almohad Empire. Masmuda Berbers from the High Atlas create one of history\'s largest empires' },
  { year: '1244–1465', event: 'Marinid dynasty. Zenata Berbers rule Morocco, build Fes\'s great madrasas' },
  { year: '1571', event: 'First European mention of the Aït Atta by Marmol Carvajal — "the Ytata"' },
  { year: '1921', event: 'Battle of Annual. Riffians under Abdelkrim defeat 20,000 Spanish troops. Republic of the Rif proclaimed — Africa\'s first modern republic' },
  { year: '1933', event: 'Battle of Bougafer. The Aït Atta make their last stand against France. End of Moroccan tribal resistance' },
  { year: '1935', event: 'Dahir Berber protests. Colonial "Berber decree" sparks nationalist backlash that shapes modern Moroccan identity politics' },
  { year: '1980', event: 'Amazigh Spring (Tafsut Imazighen) in Kabylia, Algeria. First modern mass protest for Berber cultural rights' },
  { year: '2001', event: 'IRCAM (Royal Institute of Amazigh Culture) established in Morocco by royal decree. Black Spring in Algeria' },
  { year: '2003', event: 'Morocco officially adopts Tifinagh script for Standard Moroccan Amazigh' },
  { year: '2011', event: 'Tamazight becomes official language in Morocco\'s Constitution. Berbers revolt in Libya\'s Nafusa Mountains' },
  { year: '2012', event: 'Tuareg rebellion in Mali — declaration of independence for Azawad (northern Mali)' },
  { year: '2016', event: 'Algeria adds Tamazight as official language to its Constitution' },
  { year: '2024', event: 'Yennayer (Amazigh New Year) becomes national paid holiday in Morocco. 2024 census: 24.8% Tamazight speakers (contested)' },
]

// ═══════════════════════════════════════════════════
// LANGUAGE DATA
// ═══════════════════════════════════════════════════

const LANGUAGES = [
  { name: 'Tashelhit (Shilha)', speakers: '8 million+', region: 'Morocco (Souss, Anti-Atlas, western High Atlas)', script: 'Tifinagh, Latin, Arabic', status: 'Largest Berber language' },
  { name: 'Kabyle', speakers: '~6 million', region: 'Algeria (Kabylia)', script: 'Latin (predominant)', status: 'Most politically active community' },
  { name: 'Central Atlas Tamazight', speakers: '4.7 million', region: 'Morocco (Middle Atlas, eastern High Atlas)', script: 'Tifinagh, Latin, Arabic', status: 'Official in Morocco' },
  { name: 'Chaoui/Shawiya', speakers: '~3 million', region: 'Algeria (Aurès Mountains)', script: 'Latin, Arabic', status: 'Second largest in Algeria' },
  { name: 'Tarifit (Riffian)', speakers: '~1.5 million', region: 'Morocco (Rif Mountains)', script: 'Latin, Tifinagh', status: 'Declining (urbanization)' },
  { name: 'Tuareg (Tamasheq/Tamahaq)', speakers: '~2.5 million total', region: 'Mali, Niger, Algeria, Libya, Burkina Faso', script: 'Tifinagh (traditional), Latin', status: 'Most geographically dispersed' },
  { name: 'Mozabite', speakers: '~150,000', region: 'Algeria (M\'zab Valley, Ghardaia)', script: 'Arabic', status: 'Ibadi Muslim community' },
  { name: 'Nafusi', speakers: '~247,000', region: 'Libya (Nafusa Mountains)', script: 'Latin, Tifinagh', status: 'Revival since 2011' },
  { name: 'Zenaga', speakers: '~5,000', region: 'Mauritania (southwest)', script: 'Oral only', status: 'Critically endangered' },
  { name: 'Siwi', speakers: '~25,000', region: 'Egypt (Siwa Oasis)', script: 'Oral only', status: 'Endangered' },
]

// ═══════════════════════════════════════════════════
// MAPBOX — CONFEDERATION MAP
// ═══════════════════════════════════════════════════

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const TYPE_COLORS: Record<string, string> = {
  'confederation': '#0a0a0a',
  'language-group': '#4A5568',
  'tribe': '#6B4E37',
}

const LANG_COLORS: Record<string, string> = {
  'Tashelhit': '#15803D',
  'Central Atlas Tamazight': '#0369A1',
  'Tarifit': '#9A3412',
  'Various': '#737373',
}

function ConfederationMap({ groups, selectedGroup, onSelect, showLanguageLayer }: {
  groups: MoroccanGroup[]
  selectedGroup: number
  onSelect: (i: number) => void
  showLanguageLayer: boolean
}) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const langMarkersRef = useRef<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    let cancelled = false

    import('mapbox-gl').then((mapboxgl) => {
      if (cancelled || !mapContainer.current) return

      // Inject Mapbox CSS via CDN link tag
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }

      mapboxgl.default.accessToken = MAPBOX_TOKEN

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-6.0, 32.0],
        zoom: 5.4,
        minZoom: 4.5,
        maxZoom: 9,
        attributionControl: false,
        pitchWithRotate: false,
        dragRotate: false,
      })

      map.addControl(
        new mapboxgl.default.AttributionControl({ compact: true }),
        'bottom-left'
      )
      map.addControl(
        new mapboxgl.default.NavigationControl({ showCompass: false }),
        'top-right'
      )

      map.on('load', () => {
        mapRef.current = map
        setMapLoaded(true)
      })
    })

    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null }
  }, [])

  // Confederation markers
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return

    // Clear existing
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    import('mapbox-gl').then((mapboxgl) => {
      groups.forEach((g, i) => {
        const isSelected = i === selectedGroup
        const size = isSelected ? 18 : 12
        const color = TYPE_COLORS[g.type] || '#0a0a0a'

        const el = document.createElement('div')
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.backgroundColor = isSelected ? color : color
        el.style.border = isSelected ? '3px solid #fff' : '2px solid #fff'
        el.style.borderRadius = '50%'
        el.style.cursor = 'pointer'
        el.style.transition = 'all 0.2s'
        el.style.opacity = isSelected ? '1' : '0.75'
        el.style.boxShadow = isSelected ? '0 0 0 2px ' + color : 'none'
        el.title = g.name
        el.addEventListener('click', () => onSelect(i))

        // Label
        const labelEl = document.createElement('div')
        labelEl.style.position = 'absolute'
        labelEl.style.left = `${size + 6}px`
        labelEl.style.top = '50%'
        labelEl.style.transform = 'translateY(-50%)'
        labelEl.style.whiteSpace = 'nowrap'
        labelEl.style.fontSize = isSelected ? '12px' : '10px'
        labelEl.style.fontWeight = isSelected ? '700' : '500'
        labelEl.style.fontFamily = "'IBM Plex Mono', monospace"
        labelEl.style.color = isSelected ? '#0a0a0a' : '#737373'
        labelEl.style.textShadow = '0 0 4px #FAFAF8, 0 0 4px #FAFAF8, 0 0 4px #FAFAF8'
        labelEl.style.transition = 'all 0.2s'
        labelEl.textContent = g.name

        const wrapper = document.createElement('div')
        wrapper.style.position = 'relative'
        wrapper.appendChild(el)
        wrapper.appendChild(labelEl)

        const marker = new mapboxgl.default.Marker({
          element: wrapper,
          anchor: 'center',
        })
          .setLngLat(g.center)
          .addTo(mapRef.current!)

        markersRef.current.push(marker)
      })
    })
  }, [mapLoaded, groups, selectedGroup, onSelect])

  // Language layer markers (translucent circles)
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return

    // Clear existing language markers
    langMarkersRef.current.forEach(m => m.remove())
    langMarkersRef.current = []

    if (!showLanguageLayer) return

    import('mapbox-gl').then((mapboxgl) => {
      LANG_REGIONS.forEach(lang => {
        lang.areas.forEach(area => {
          const el = document.createElement('div')
          el.style.width = '60px'
          el.style.height = '60px'
          el.style.backgroundColor = lang.color
          el.style.opacity = '0.15'
          el.style.borderRadius = '50%'
          el.style.border = `2px solid ${lang.color}`
          el.style.pointerEvents = 'none'

          const labelEl = document.createElement('div')
          labelEl.style.position = 'absolute'
          labelEl.style.bottom = '-16px'
          labelEl.style.left = '50%'
          labelEl.style.transform = 'translateX(-50%)'
          labelEl.style.whiteSpace = 'nowrap'
          labelEl.style.fontSize = '8px'
          labelEl.style.fontFamily = "'IBM Plex Mono', monospace"
          labelEl.style.color = lang.color
          labelEl.style.fontWeight = '600'
          labelEl.style.textShadow = '0 0 3px #FAFAF8, 0 0 3px #FAFAF8'
          labelEl.textContent = area.label

          const wrapper = document.createElement('div')
          wrapper.style.position = 'relative'
          wrapper.appendChild(el)
          wrapper.appendChild(labelEl)

          const marker = new mapboxgl.default.Marker({
            element: wrapper,
            anchor: 'center',
          })
            .setLngLat(area.center)
            .addTo(mapRef.current!)

          langMarkersRef.current.push(marker)
        })
      })
    })
  }, [mapLoaded, showLanguageLayer])

  // Fly to selected group
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    const g = groups[selectedGroup]
    mapRef.current.flyTo({
      center: g.center,
      zoom: g.zoom || 7,
      duration: 800,
    })
  }, [selectedGroup, mapLoaded, groups])

  return (
    <div className="relative w-full">
      <div ref={mapContainer} className="w-full h-[420px] md:h-[560px]" style={{ background: '#f2f0eb' }} />

      {/* Legend */}
      <div className="absolute bottom-12 left-4 bg-white/95 backdrop-blur-sm p-4 max-w-[180px]">
        <p className="text-[10px] uppercase tracking-[0.1em] text-dwl-gray font-medium mb-2">Type</p>
        {Object.entries(TYPE_COLORS).map(([key, color]) => (
          <div key={key} className="flex items-center gap-2 mb-1">
            <div className="rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: color }} />
            <span className="text-[10px] text-dwl-gray capitalize">{key.replace('-', ' ')}</span>
          </div>
        ))}
        {showLanguageLayer && (
          <>
            <p className="text-[10px] uppercase tracking-[0.1em] text-dwl-gray font-medium mt-3 mb-2">Language</p>
            {LANG_REGIONS.map(l => (
              <div key={l.name} className="flex items-center gap-2 mb-1">
                <div className="rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: l.color, opacity: 0.5 }} />
                <span className="text-[10px] text-dwl-gray">{l.name}</span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Selected info card */}
      {mapLoaded && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 max-w-[220px] border border-dwl-border">
          <p className="font-serif text-[18px] text-dwl-black leading-tight">{groups[selectedGroup].name}</p>
          <p className="text-[12px] text-dwl-muted mt-0.5">{groups[selectedGroup].tamazight}</p>
          <p className="text-[11px] text-dwl-gray mt-2">{groups[selectedGroup].region}</p>
          <p className="text-[10px] mt-2" style={{ color: LANG_COLORS[groups[selectedGroup].language] || '#737373' }}>
            ● {groups[selectedGroup].language}
          </p>
        </div>
      )}

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f2f0eb]">
          <p className="text-[13px] text-dwl-gray uppercase tracking-[0.08em]">Loading map...</p>
        </div>
      )}
    </div>
  )
}

// ═══ MAIN COMPONENT ═══

export function TheFreePeopleContent() {
  const [tab, setTab] = useState<'morocco' | 'africa'>('morocco')
  const [selectedGroup, setSelectedGroup] = useState(0)
  const [showLangLayer, setShowLangLayer] = useState(false)

  const hero = useReveal()
  const numbers = useReveal()
  const morocco = useReveal()
  const africa = useReveal()
  const langs = useReveal()
  const timeline = useReveal()
  const reading = useReveal()

  return (
    <div className="pt-16" style={{ background: '#FAFAF8' }}>

      {/* ─── HERO ─── */}
      <div ref={hero.ref}>
        <section className="px-8 md:px-[8%] lg:px-[12%] pt-section pb-16">
          <p className="micro-label mb-4" style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.6s' }}>Module 042</p>
          <h1 className="font-serif text-[clamp(2.8rem,7vw,4.5rem)] text-dwl-black leading-[0.95]"
            style={{ opacity: hero.vis ? 1 : 0, transform: hero.vis ? 'none' : 'translateY(20px)', transition: 'all 0.8s' }}>
            The Free <em>People</em>
          </h1>
          <p className="font-serif text-[clamp(1.2rem,3vw,1.5rem)] text-dwl-gray mt-3 max-w-[500px]"
            style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.8s 0.15s' }}>
            Imazighen · ⵉⵎⴰⵣⵉⵖⵏ · أمازيغ
          </p>
          <p className="text-body text-dwl-body mt-6 max-w-[640px]"
            style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.8s 0.3s' }}>
            Before the Arabs, the Romans, the Phoenicians — the Amazigh were here. Indigenous to North Africa
            for at least 12,000 years. Not one tribe but hundreds. Not one language but forty.
            From the Atlantic coast to the Siwa Oasis. From the Mediterranean to the Sahel. Estimated 30–40 million
            people across ten countries — and the majority population of Morocco, whether the census admits it or not.
          </p>
        </section>
      </div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── KEY NUMBERS ─── */}
      <div ref={numbers.ref}>
        <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: '30–40M', l: 'Amazigh people across Africa', sub: 'Estimated total population' },
              { n: '12,000+', l: 'Years of presence in North Africa', sub: 'Cave paintings in Tassili n\'Ajjer' },
              { n: '10', l: 'Countries with Amazigh communities', sub: 'Morocco to Egypt, Mali to Niger' },
              { n: '~40', l: 'Distinct Berber languages', sub: 'Afroasiatic language family' },
              { n: '14.2%', l: 'Tashelhit speakers, Morocco', sub: '2024 census — largest group' },
              { n: '24.8%', l: 'Official Tamazight speakers, Morocco', sub: '2024 census (Amazigh claim 85%)' },
              { n: '5,000', l: 'Years of Tifinagh script', sub: 'Oldest in Africa still in use' },
              { n: '2', l: 'Official language constitutions', sub: 'Morocco (2011), Algeria (2016)' },
            ].map((s, i) => (
              <div key={i} style={{ opacity: numbers.vis ? 1 : 0, transform: numbers.vis ? 'none' : 'translateY(12px)', transition: `all 0.5s ${i * 0.05}s` }}>
                <div className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] text-dwl-black leading-none">{s.n}</div>
                <div className="text-[13px] text-dwl-gray mt-2 leading-snug">{s.l}</div>
                <div className="text-[11px] text-dwl-muted mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── TAB SELECTOR ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-section">
        <div className="flex gap-2">
          {([['morocco', 'Part 1 — Morocco'], ['africa', 'Part 2 — Across Africa']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className="text-[12px] px-5 py-2.5 transition-colors border font-medium"
              style={{
                background: tab === key ? C.ink : 'transparent',
                color: tab === key ? '#fff' : C.muted,
                borderColor: tab === key ? C.ink : C.border,
              }}>
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ PART 1: MOROCCO ═══ */}
      {tab === 'morocco' && (
        <div ref={morocco.ref}>
          <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
            <p className="micro-label mb-3">Moroccan Confederations, Tribes & Language Groups</p>
            <p className="text-[15px] text-dwl-gray mb-10 max-w-[580px]">
              Morocco&apos;s <span className="underline underline-offset-2">Amazigh</span> world is not one people — it is a constellation of confederations,
              each with its own territory, dialect, governance, and centuries of internal politics.
              Three medieval super-confederations (Masmuda, Sanhaja, Zenata) gave rise to modern tribal groupings
              and three distinct language communities.
            </p>

            {/* 2024 Census language bar */}
            <div className="mb-12 max-w-[640px]">
              <div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-3">2024 Census — Tamazight Speakers by Language</div>
              <div className="flex h-8 overflow-hidden" style={{ borderRadius: 2 }}>
                <div style={{ width: '57.3%', background: C.green }} className="flex items-center justify-center text-white text-[10px] font-medium">Tashelhit 14.2%</div>
                <div style={{ width: '29.8%', background: C.blue }} className="flex items-center justify-center text-white text-[10px] font-medium">Tamazight 7.4%</div>
                <div style={{ width: '12.9%', background: C.terracotta }} className="flex items-center justify-center text-white text-[10px] font-medium">Tarifit 3.2%</div>
              </div>
              <div className="text-[11px] text-dwl-muted mt-2">
                Total: 24.8% of Morocco&apos;s 37 million population. Amazigh associations claim the real figure is 65–85%.
              </div>
            </div>

            {/* ─── INTERACTIVE MAP ─── */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">Interactive Map — Click markers to explore</div>
                <button
                  onClick={() => setShowLangLayer(!showLangLayer)}
                  className="text-[11px] px-3 py-1.5 border transition-colors"
                  style={{
                    background: showLangLayer ? C.ink : 'transparent',
                    color: showLangLayer ? '#fff' : C.muted,
                    borderColor: showLangLayer ? C.ink : C.border,
                  }}>
                  {showLangLayer ? 'Hide' : 'Show'} Language Layer
                </button>
              </div>
              <ConfederationMap
                groups={MOROCCO_GROUPS}
                selectedGroup={selectedGroup}
                onSelect={setSelectedGroup}
                showLanguageLayer={showLangLayer}
              />
            </div>

            {/* Group selector tabs */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {MOROCCO_GROUPS.map((g, i) => (
                <button key={g.name} onClick={() => setSelectedGroup(i)}
                  className="text-[11px] px-3 py-1.5 transition-colors border"
                  style={{
                    background: i === selectedGroup ? C.ink : 'transparent',
                    color: i === selectedGroup ? '#fff' : C.muted,
                    borderColor: i === selectedGroup ? C.ink : C.border,
                  }}>
                  {g.name}
                </button>
              ))}
            </div>

            {/* Selected group detail */}
            {(() => {
              const g = MOROCCO_GROUPS[selectedGroup]
              return (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border border-dwl-border p-6 md:p-10"
                  style={{ opacity: morocco.vis ? 1 : 0, transition: 'opacity 0.5s' }}>
                  <div className="md:col-span-4">
                    <div className="font-serif text-[28px] text-dwl-black leading-tight">{g.name}</div>
                    <div className="text-[18px] text-dwl-muted mt-1">{g.tamazight}</div>
                    <div className="text-[13px] text-dwl-gray mt-2 italic">&ldquo;{g.meaning}&rdquo;</div>

                    <div className="mt-6 space-y-3">
                      <InfoRow label="Type" value={g.type.replace('-', ' ')} />
                      <InfoRow label="Origin" value={g.origin} />
                      <InfoRow label="Region" value={g.region} />
                      <InfoRow label="Language" value={g.language} />
                      <InfoRow label="Population" value={g.population} />
                    </div>

                    {g.subgroups && (
                      <div className="mt-6">
                        <div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-2">Key Sub-groups</div>
                        <div className="flex flex-wrap gap-1.5">
                          {g.subgroups.map(s => (
                            <span key={s} className="text-[11px] px-2 py-0.5 border border-dwl-border text-dwl-gray">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-[15px] text-dwl-gray leading-relaxed">{g.note}</p>
                    <div className="mt-6 border-t border-dwl-border pt-4">
                      <div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-1">Key Fact</div>
                      <p className="text-[15px] text-dwl-black font-medium leading-relaxed">{g.keyFact}</p>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* The Three Medieval Confederations overview */}
            <div className="mt-16">
              <p className="micro-label mb-6">The Three Medieval Super-Confederations</p>
              <p className="text-[14px] text-dwl-gray mb-8 max-w-[560px]">
                Ibn Khaldun divided all Berber tribes into Baranis (sedentary) and Butr (<span className="underline underline-offset-2">nomadic</span>),
                and classified them under three great confederations. Every modern Amazigh group in Morocco
                traces its lineage — real or mythical — to one of these three.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Masmuda', type: 'Baranis (sedentary)', dynasty: 'Almohads (1121–1269)', territory: 'High Atlas, Anti-Atlas, Atlantic plains', legacy: 'Built the largest Berber empire. Koutoubia, Giralda, Hassan Tower all Almohad.' },
                  { name: 'Sanhaja', type: 'Debated (both)', dynasty: 'Almoravids (1040–1147)', territory: 'Western Sahara, Middle Atlas, deep south', legacy: 'From nomads to an empire spanning Senegal to Andalusia. Founded Marrakech.' },
                  { name: 'Zenata', type: 'Butr (nomadic)', dynasty: 'Marinids (1244–1465)', territory: 'Eastern Morocco, northern plains', legacy: 'Built the great madrasas of Fes. The last Berber dynasty to rule Morocco.' },
                ].map((c, i) => (
                  <div key={c.name} className="border border-dwl-border p-6">
                    <div className="font-serif text-[22px] text-dwl-black">{c.name}</div>
                    <div className="text-[11px] text-dwl-muted mt-1">{c.type}</div>
                    <div className="text-[13px] text-dwl-gray mt-4"><span className="font-medium text-dwl-black">Dynasty:</span> {c.dynasty}</div>
                    <div className="text-[13px] text-dwl-gray mt-2"><span className="font-medium text-dwl-black">Territory:</span> {c.territory}</div>
                    <p className="text-[13px] text-dwl-gray mt-3 italic">{c.legacy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ═══ PART 2: ACROSS AFRICA ═══ */}
      {tab === 'africa' && (
        <div ref={africa.ref}>
          <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
            <p className="micro-label mb-3">Amazigh Communities by Country</p>
            <p className="text-[15px] text-dwl-gray mb-10 max-w-[580px]">
              From the Atlantic to the Nile. From the Mediterranean to the Sahel. Ten countries,
              forty languages, 30–40 million people. Not one diaspora — this is their land.
            </p>

            <div className="space-y-0">
              {AFRICA.map((c, i) => (
                <div key={c.country} className="border-b border-dwl-border py-8"
                  style={{ opacity: africa.vis ? 1 : 0, transform: africa.vis ? 'none' : 'translateY(10px)',
                    transition: `all 0.4s ${i * 0.05}s` }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-3">
                      <div className="font-serif text-[22px] text-dwl-black">{c.country}</div>
                      <div className="text-[13px] text-dwl-gray mt-1">{c.population}</div>
                      <div className="text-[11px] text-dwl-muted mt-0.5">{c.percentage} of population</div>
                    </div>
                    <div className="md:col-span-5">
                      <div className="text-[13px] text-dwl-gray leading-relaxed">{c.note}</div>
                      <div className="mt-3">
                        <span className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">Groups: </span>
                        <span className="text-[12px] text-dwl-gray">{c.groups}</span>
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-1">Languages</div>
                      <div className="text-[12px] text-dwl-gray">{c.languages}</div>
                      <div className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mt-3 mb-1">Official Status</div>
                      <div className="text-[12px] text-dwl-gray">{c.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── LANGUAGES TABLE ─── */}
      <div ref={langs.ref}>
        <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-3">The Major Amazigh Languages</p>
          <p className="text-[15px] text-dwl-gray mb-8 max-w-[520px]">
            Not one language but a family — comparable in diversity to the Romance languages.
            Mostly mutually unintelligible. All from the Afroasiatic family.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="border-b-2 border-dwl-black">
                  {['Language', 'Speakers', 'Region', 'Script', 'Status'].map(h => (
                    <th key={h} className="text-left py-3 px-3 text-[10px] uppercase tracking-[0.06em] text-dwl-muted font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LANGUAGES.map((l, i) => (
                  <tr key={l.name} className="border-b border-dwl-border"
                    style={{ opacity: langs.vis ? 1 : 0, transition: `opacity 0.4s ${i * 0.04}s` }}>
                    <td className="py-3 px-3 font-medium text-dwl-black">{l.name}</td>
                    <td className="py-3 px-3 text-dwl-gray">{l.speakers}</td>
                    <td className="py-3 px-3 text-dwl-gray">{l.region}</td>
                    <td className="py-3 px-3 text-dwl-gray">{l.script}</td>
                    <td className="py-3 px-3 text-dwl-muted text-[12px]">{l.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── TIMELINE ─── */}
      <div ref={timeline.ref}>
        <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-3">12,000 Years in 21 Moments</p>
          <div className="max-w-[680px] space-y-0">
            {TIMELINE.map((t, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 py-3 border-b border-dwl-border"
                style={{ opacity: timeline.vis ? 1 : 0, transform: timeline.vis ? 'none' : 'translateY(8px)',
                  transition: `all 0.3s ${i * 0.03}s` }}>
                <div className="col-span-3 md:col-span-2">
                  <span className="text-[13px] font-medium text-dwl-black tabular-nums">{t.year}</span>
                </div>
                <div className="col-span-9 md:col-span-10">
                  <span className="text-[14px] text-dwl-gray leading-relaxed">{t.event}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ─── READING NOTES ─── */}
      <div ref={reading.ref}>
        <section className="bg-dwl-offwhite">
          <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
            <p className="micro-label mb-8">Reading Notes</p>
            <div className="space-y-10 max-w-[640px]">
              <div style={{ opacity: reading.vis ? 1 : 0, transition: 'opacity 0.6s' }}>
                <h3 className="font-serif text-[22px] text-dwl-black">The Census Wars</h3>
                <p className="text-[15px] text-dwl-gray leading-relaxed mt-3">
                  Morocco&apos;s 2024 census recorded 24.8% <span className="underline underline-offset-2">Tamazight</span> speakers. Amazigh associations claim 85%.
                  Both numbers are political. The census methodology — random samples, no geographical weighting for
                  Amazigh-majority rural regions — has been called &ldquo;unscientific&rdquo; by AMREC and other organizations.
                  Even accepting the decline from ~45% in 1994 to 24.8% in 2024, the gap confirms what activists
                  call &ldquo;cultural and linguistic genocide&rdquo; — the accelerating loss of Tamazight in cities after centuries of Arabization.
                  The real number is likely 40–50%. Nobody truly knows.
                </p>
              </div>
              <div style={{ opacity: reading.vis ? 1 : 0, transition: 'opacity 0.6s 0.15s' }}>
                <h3 className="font-serif text-[22px] text-dwl-black">The Annual Rotation</h3>
                <p className="text-[15px] text-dwl-gray leading-relaxed mt-3">
                  The Aït Atta elected their supreme chief annually. Each year, a different fifth of the confederation
                  held the leadership. No individual held power permanently. This system — called &ldquo;annual rotation
                  and complementarity&rdquo; by scholars — was democracy by design, not accident. The French destroyed it
                  in 1933. Before that, for at least three centuries, it governed one of the most powerful confederations
                  in North Africa. Europe did not invent democratic governance. It arrived in Paris in 1789.
                  The Aït Atta had it in the 1600s.
                </p>
              </div>
              <div style={{ opacity: reading.vis ? 1 : 0, transition: 'opacity 0.6s 0.3s' }}>
                <h3 className="font-serif text-[22px] text-dwl-black">Tamazgha</h3>
                <p className="text-[15px] text-dwl-gray leading-relaxed mt-3">
                  The Amazigh name for their homeland: Tamazgha. It has no borders that match any modern nation-state.
                  It stretches from the Canary Islands to the Siwa Oasis, from the Mediterranean to the Sahel.
                  A territory larger than Europe, containing ten modern countries, none of which were drawn by the
                  people who lived there. The Amazigh are not a minority in North Africa. They are North Africa.
                  The maps just forgot.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ─── CLOSING ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <blockquote className="font-serif text-[clamp(1.3rem,3.5vw,1.8rem)] text-dwl-black leading-[1.4] max-w-[680px]">
          &ldquo;ⴰⵣⵓⵍ — azul. The Amazigh greeting. It means &lsquo;be well.&rsquo; Twelve thousand years of saying it.
          Through the Phoenicians, the Romans, the Arabs, the French. Still here. Still free.
          That is what Amazigh means. Free people. Not formerly. Not historically. Now.&rdquo;
        </blockquote>
      </section>

      {/* ─── SOURCES ─── */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="border-t border-dwl-border">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
          <p className="micro-label mb-4">Sources & Attribution</p>
          <p className="text-[12px] text-dwl-muted leading-relaxed max-w-[640px]">
            Morocco 2024 census data: High Commission for Planning (HCP), announced 17 December 2024; IWGIA (International
            Work Group for Indigenous Affairs), The Indigenous World 2025: Morocco. Amazigh associations&apos; counter-claims (85%):
            AMREC (Moroccan Association for Research and Cultural Exchange). Historical Tamazight speaker rates (40–45% at
            colonization, 32% in 1960, 28% in 2004/2014): Wikipedia/Berber languages, citing census records and Basset (1952).
            Tribal confederations: Wikipedia/Berber tribes; Wikipedia/Ait Atta; Wikipedia/Ait Yafelman; amazigh.it (Amazigh Ethnic Jewelry).
            Three medieval confederations (Masmuda, Sanhaja, Zenata): Ibn Khaldun; Wikipedia/Berber tribes; Britannica/Barghawata.
            Riffian Republic (1921–1926): established historical record. Battle of Annual, Battle of Bougafer: Wikipedia/Ait Atta.
            Across-Africa populations: Wikipedia/Berbers; Britannica/Berber; Minority Rights Group (Morocco, Algeria); Nationalia/Amazigh;
            EBSCO Research/Berbers. Berber language data: Wikipedia/Berber languages; Crystal Clear Translation. Tuareg populations:
            Minority Rights Group/Algeria; Wikipedia/Berber languages (Ethnologue estimates). Zenaga endangered status: Wikipedia/Berber languages.
            Siwa Oasis: Wikipedia/Berbers. Guanche–Berber connection: Wikipedia/Berbers. Timeline events: multiple corroborating sources.
            All population estimates are approximate and contested. Census methodology in North Africa systematically undercounts Amazigh identity.
          </p>
          <p className="text-[11px] text-dwl-muted mt-4">
            © Slow Morocco · slowmorocco.com · Data may not be reproduced without attribution.
          </p>
        </div>
      </section>

    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">{label}: </span>
      <span className="text-[13px] text-dwl-black capitalize">{value}</span>
    </div>
  )
}
