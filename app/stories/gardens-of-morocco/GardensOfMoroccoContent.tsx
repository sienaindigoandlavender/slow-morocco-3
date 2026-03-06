'use client'

import { useState, useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────
// The Gardens of Morocco — Inline Data
// ─────────────────────────────────────────────────

interface Garden {
  id: string
  name: string
  arabic: string
  city: string
  founded: string
  founder: string
  area: string
  type: string
  unescoYear: string | null
  description: string
  water: string
  plants: string
  architecture: string
  history: string[]
  keyFact: string
  visitors: string
}

const GARDENS: Garden[] = [
  {
    id: 'agdal',
    name: 'Agdal Gardens',
    arabic: 'حدائق الأكدال',
    city: 'Marrakech',
    founded: 'c. 1157 (Almohad, expanded under Abu Ya\'qub Yusuf from 1163)',
    founder: 'Almohad Caliph Abd al-Mu\'min, expanded by Abu Ya\'qub Yusuf. Engineer: Ahmad ibn Muhammad ibn Milhan (Andalusi-Berber origin)',
    area: '500 hectares — almost the size of the city itself when built',
    type: 'Royal productive orchard & pleasure garden',
    unescoYear: '1985',
    description: 'Royal agricultural estate. 500 hectares — almost the size of the city itself when built. The Almohad vision: a city should equal its gardens in size. The combined surface of the Agdal and Menara equalled the Almohad capital.',
    water: 'Khettara system: 45km underground channel network drawing from the High Atlas water table (Ourika River basin). Two massive reservoirs: Dar al-Hana (208 × 181m, capacity 83,000 m³, rammed earth with lime and gravel) and al-Gharsiyya (with a 16m square island and pavilion at centre). Water redistributed via gravity-fed ditches. A modern khettara was dug in 1932–33 but still insufficient for the growing city.',
    plants: '3,000+ ancient olive trees in a perfect geometric checkerboard (10m grid). Orchards of orange, lemon, pomegranate, fig, apricot, peach, almond, walnut, date palm, elderberry, myrtle, cypress. Each sub-garden cultivates a single species — strict Hispano-Mauresque rationalism. Paths lined with single rows of olive trees at 10m intervals. Vine cultivation (wine historically consumed at some royal festivities despite taboo).',
    architecture: 'Dar al-Hana — palatial pavilion on the south side of the largest reservoir. North gate integrated into an observation pavilion (menzeh) rising above. Dar el-Beida — modest palace still used by the Alaouite royal family when in residence. The entire estate is enclosed by high walls. "Agdal" is Berber for "meadow enclosed by a stone wall."',
    history: [
      'c. 1157: Founded by Almohad Caliph Abd al-Mu\'min alongside the Menara',
      '1163–1184: Expanded by Abu Ya\'qub Yusuf, who built the largest reservoir (model for basins in Rabat and Seville)',
      'Late 12th C: Ya\'qub al-Mansur builds the Kasbah and connects it to the gardens',
      '13th C: Decline after Almohad fall; Marinids move capital to Fez',
      '16th C: Saadian restoration when Marrakech becomes capital again',
      '19th C: Major restoration under Alaouite sultans Moulay Abd ar-Rahman and Muhammad IV',
      '1932–33: Modern khettara dug to supplement ancient system',
      '1985: UNESCO World Heritage Site (with Medina and Menara)',
    ],
    keyFact: 'Legend says Almohad soldiers practised swimming in the great reservoir before crossing the Mediterranean to conquer Andalusia.',
    visitors: 'Royal property. Open to public on Fridays and Sundays (when king is not in residence). Far fewer tourists than Majorelle or Menara.',
  },
  {
    id: 'menara',
    name: 'Menara Gardens',
    arabic: 'حدائق المنارة',
    city: 'Marrakech',
    founded: 'c. 1157 (Almohad)',
    founder: 'Almohad Caliph Abd al-Mu\'min. Execution by Haji Ibn Yaish, scientist and legislator of the empire',
    area: '~100 hectares of olive groves',
    type: 'Royal orchard, pleasure garden & hydraulic infrastructure',
    unescoYear: '1985',
    description: 'The iconic image of Marrakech: a green-roofed Saadian pavilion reflected in a vast water basin, framed by the snow-capped Atlas Mountains behind. Military, utilitarian, and ornamental: orchard, reservoir, and retreat.',
    water: 'Central reservoir: 195m × 160m, built entirely above ground to allow gravity-fed irrigation without pumping. Supplied by long-distance khettara channels from an Atlas aquifer. Complex underground network distributes water evenly through the orchards. The reservoir also accumulated water for year-round supply, including winter when rivers ran dry.',
    plants: 'Predominantly olive trees, with some fruit trees and cypress. Planted in a regular 10m grid. During periods of neglect, the orchards were prone to desertification — the gardens required constant water system maintenance to survive.',
    architecture: 'The iconic pavilion (menzeh): originally built by the Saadian dynasty (16th C), current structure completed in 1870 under Sultan Muhammad IV. Green pyramidal roof, horseshoe arches, zellige decoration. Hispano-Moorish jewel. The pavilion rises above the reservoir\'s edge; from its balcony terrace, panoramic views across the garden and city. The name "Menara" (first documented 1579) may refer to this pavilion/lantern.',
    history: [
      'c. 1157: Created by Abd al-Mu\'min west of the city, aligned with Bab al-Makhzen gate',
      'Originally part of a vast estate enclosed by a 6-mile wall (now gone)',
      '13th C: Decline after Almohad fall',
      '16th C: Saadian dynasty builds the first pleasure pavilion overlooking the reservoir',
      '1822–1873: Major restoration under Alaouite sultans Moulay Abd ar-Rahman and Muhammad IV',
      '1870: Current pavilion completed on ruins of the Saadian original',
      '1985: UNESCO World Heritage Site (with Medina and Agdal)',
    ],
    keyFact: '17th C legend: Sultan Moulay Ismail, "the executioner of hearts," drowned his romantic conquests by throwing them from the pavilion balcony into the lake.',
    visitors: 'Open daily, free garden entry (20 MAD for pavilion). Popular with locals for picnics, joggers, and lovers. Sunset and early morning are best. Snow-capped Atlas backdrop best from November to April.',
  },
  {
    id: 'majorelle',
    name: 'Jardin Majorelle',
    arabic: 'حديقة ماجوريل',
    city: 'Marrakech',
    founded: '1923 (planted over 40 years)',
    founder: 'Jacques Majorelle (1886–1962), French Orientalist painter. Son of Louis Majorelle, Art Nouveau cabinet-maker of Nancy',
    area: '1 hectare (2.5 acres) — intimate by Moroccan garden standards',
    type: 'Botanical garden, artist\'s landscape, museum complex',
    unescoYear: null,
    description: '300 plant species from five continents. A Cubist villa in trademarked cobalt blue. ~900,000 visitors/year — Morocco\'s most visited attraction. Created by a French painter, saved by a French couturier.',
    water: 'Marble pools and channels in the Hispano-Moorish tradition. Central long pool structured around the main axis. Fountains, cascading water features, lily ponds. Refined irrigation systems installed during the YSL/Bergé restoration. Madison Cox (landscape designer) later replaced ground cover with rose-coloured gravel echoing Marrakech\'s dominant colour.',
    plants: '300+ species from five continents. Cacti and succulents (major collection), bamboo, bougainvillea, banana trees, coconut palms, jasmine, water lilies, yuccas. Jacques Majorelle collected specimens over decades of globetrotting. Recent additions include succulents native to Morocco, introduced by designer Madison Cox for environmental sustainability.',
    architecture: 'Cubist villa designed by architect Paul Sinoir (1931). Majorelle\'s studio on ground floor, living quarters above. "Majorelle Blue" (bleu Majorelle, #6050DC) — cobalt inspired by Moroccan tiles and Tuareg blue veils. First applied 1937, trademarked. Villa now houses the Berber Museum (600+ artefacts, inaugurated by King Mohammed VI). Musée Yves Saint Laurent (2017) next door.',
    history: [
      '1917: Jacques Majorelle arrives in Morocco, settles in Marrakech',
      '1923: Purchases palm grove plot, begins planting',
      '1931: Paul Sinoir designs the Art Deco studio',
      '1937: Creates and applies Majorelle Blue to buildings',
      '1947: Garden opened to public',
      '1950s: Divorce from Andrée Longueville forces sale',
      '1962: Majorelle dies in Paris. Garden falls into neglect',
      '1966: YSL and Bergé first visit Marrakech, discover the garden',
      '1980: YSL and Bergé purchase the garden, save it from hotel developers',
      '2008: Yves Saint Laurent dies. Ashes scattered in the garden. Memorial column placed',
      '2010: Property donated to Fondation Pierre Bergé – Yves Saint Laurent',
      '2011: Berber Museum opens in the villa',
      '2017: Musée Yves Saint Laurent opens next door. Pierre Bergé dies in September',
      '2018: Garden expanded with new section for visitor capacity',
    ],
    keyFact: 'The hex code for Majorelle Blue is #6050DC. Saint Laurent said of Marrakech: "This city deeply influenced my discovery of colour."',
    visitors: '~900,000/year. Morocco\'s most visited attraction. Book tickets online (no onsite sales). Best: before 10am or late afternoon for light. Closed sections for Villa Oasis open Fri–Mon.',
  },
  {
    id: 'jnan-sbil',
    name: 'Jnan Sbil Gardens',
    arabic: 'جنان السبيل',
    city: 'Fez',
    founded: '18th century (Sultan Moulay Abdallah)',
    founder: 'Sultan Moulay Abdallah (Alaouite dynasty). Opened to public under Sultan Moulay Hassan I (late 19th C). Underground passage to Royal Palace.',
    area: '7.5 hectares',
    type: 'Royal garden turned public park. Arab-Andalusian tradition',
    unescoYear: null,
    description: '"Jnan" from "jannah" — Arabic for both "garden" and "paradise." Located between Fes el-Jdid and Fes el-Bali. Originally royal-only, connected to the palace by underground tunnel. Opened to public 1917.',
    water: 'Fed by the Oued Fes (Oued el-Jawahir) river and historic water channels that supplied the old city. Ancient seguias (irrigation ditches), canals, distributors, mills, and two historic norias (water wheels) — one in the east garden, one larger on the western edge. The river also powered nearby craft workshops. Colourful zellige-tiled fountains (blue, green, yellow) along main axes and in alcoves. Large pool in southern section with a palm-tree island.',
    plants: '3,000+ species. Themed sub-gardens: Andalusian, Mexican, Bamboo, Fragrance (southeast, created during 2010 restoration). Giant bamboos, Washingtonia palms, pine, eucalyptus, weeping willows, orange groves, date palms. Trees over 100 years old. Central tree-lined mall.',
    architecture: 'Arab-Andalusian design: symmetrical pathways, enclosed green spaces, geometric zellige fountains, rammed earth walls. Bordered by the ramparts of Fes el-Jdid and the 16th-century Saadian bastion Borj Sheikh Ahmed. Moorish courtyard-like divisions. The geometric Rub-el-Hizb-shaped fountains are particularly distinctive.',
    history: [
      '18th C: Commissioned by Sultan Moulay Abdallah as royal domain',
      '19th C: Moulay Hassan I builds walls connecting Fes el-Jdid to Fes el-Bali; gardens placed inside corridor; summer palaces built (Dar el-Beida)',
      '1917: Opened to public (previously royal-only, accessed via underground passage from palace)',
      'Mid-20th C: Falls into neglect and decline',
      '2006: Rehabilitation launched by Princess Lalla Hasnaa / Mohammed VI Foundation for Environmental Protection',
      '2010: Four-year restoration completed. Heirloom plants, hydraulic systems, fountains, norias, bamboo garden, Washington palms alley all restored. Fragrance garden created',
      '2011: Officially reopened',
    ],
    keyFact: '"Jnan" from "jannah" — the Arabic word for both "garden" and "paradise." The Qur\'anic image of paradise: flowing water, shaded groves, green oases. Every Moroccan garden is an earthly foretaste of Jannat al-Firdaws.',
    visitors: 'Open daily except Mondays, 8:30am–7:30pm. Free admission. Venue for the annual World Sacred Music Festival. Locals picnic under the trees. Far less touristy than Marrakech\'s gardens.',
  },
]

interface DesignPrinciple {
  name: string
  arabic: string
  description: string
  examples: string
}

const ISLAMIC_GARDEN_PRINCIPLES: DesignPrinciple[] = [
  { name: 'Chahar Bagh (Four-Fold Garden)', arabic: 'چهارباغ', description: 'Garden divided into four quadrants by water channels intersecting at a central fountain or pavilion. From Qur\'anic descriptions of paradise with four rivers (water, milk, wine, honey). Persian origin, transmitted through the caliphates to the Maghreb via Al-Andalus.', examples: 'Le Jardin Secret (Marrakech). The Alhambra\'s Generalife and Court of the Lions. The Taj Mahal gardens.' },
  { name: 'Water as Sacred Element', arabic: 'الماء', description: '"We made from water every living thing" (Qur\'an 21:30). In Marrakech — gateway to the Sahara — water is sacred luxury. Every village centres on a fountain for ablutions. In the garden, water is channelled, displayed, heard. Pools reflect sky and architecture.', examples: 'Menara\'s reflecting pool. Agdal\'s 83,000 m³ reservoir. Majorelle\'s marble channels. Jnan Sbil\'s zellige fountains.' },
  { name: 'Enclosure (Hortus Conclusus)', arabic: 'الجنان المسوّر', description: 'Walled garden. "Agdal" means "meadow enclosed by a stone wall" in Berber. Chaos outside, order within. The wall also provides shade, thermal regulation, and wind protection in arid climates.', examples: 'Agdal\'s massive enclosing walls. Jnan Sbil between the ramparts. Riad courtyard gardens throughout the medinas.' },
  { name: 'Geometry & Order', arabic: 'الهندسة', description: 'Strict geometric organisation. Trees planted in grids (typically 10m). Paths intersect at right angles. Sub-gardens rectangular. Each plot cultivates one species. The Hispano-Mauresque "productive garden" tradition: rationalism serving both beauty and agriculture.', examples: 'Agdal\'s 3,000 olive trees in geometric checkerboard. Menara\'s 10m grid orchards. Jnan Sbil\'s symmetrical pathways.' },
  { name: 'Shade & Sensory Experience', arabic: 'الظل والحواس', description: 'Gardens engage all senses: sight (geometry, colour, reflected light), sound (flowing water, birdsong), smell (jasmine, orange blossom), touch (cool air, stone, water), taste (orchard fruit). Shade is as designed as sunlight. Canopy layers: tall palms above, fruit trees in middle, ground cover below.', examples: 'Majorelle\'s chromatic intensity. Jnan Sbil\'s fragrance garden. Agdal\'s layered orchards producing fruit for the royal table.' },
  { name: 'Productive Beauty', arabic: 'الجمال المنتج', description: 'No contradiction between beauty and productivity. Orchards are gardens. Agriculture is art. The Almohad vision was strategic: food self-sufficiency through engineering. The reservoir irrigates the orchard which feeds the city.', examples: 'Agdal\'s 500-hectare working orchard. Menara\'s olive groves still producing. The Palmeraie\'s three-tier oasis agriculture (palm canopy, citrus middle layer, ground crops).' },
]

interface WaterSystem {
  name: string
  arabic: string
  description: string
  engineering: string
}

const WATER_SYSTEMS: WaterSystem[] = [
  { name: 'Khettara', arabic: 'خطارة', description: 'Underground gravity-flow channels that bring water from the High Atlas aquifers to the city. Morocco\'s version of the Persian qanat. Tunnels dug at a steady gradient — no pumping required. The Agdal\'s khettara network stretches 45 kilometres from the Atlas water table.', engineering: 'Vertical shafts dug at intervals for access and ventilation. Water flows by gravity along a gentle slope. The system is entirely passive — no external energy source. Some khettaras in Morocco are over 1,000 years old. The Almoravids built the first in Marrakech (early 12th C). The Almohads expanded and systematised them.' },
  { name: 'Seguia', arabic: 'ساقية', description: 'Surface irrigation channels distributing water from reservoirs to orchards. In Fez, seguias from the Oued Fes powered craft workshops and irrigated gardens simultaneously.', engineering: 'Open or partially covered channels, lined with stone or rammed earth. Flow regulated by gates and sluices. Distribution follows communal calendars — traditional water-sharing systems respected by all communities.' },
  { name: 'Noria', arabic: 'ناعورة', description: 'Water wheels that lift water from rivers to higher channels. Jnan Sbil has two historic norias. The wheels are powered by the river current — no external energy. Ancient technology imported from the Levant and adapted across North Africa.', engineering: 'Wooden or metal wheel with buckets/scoops. The river turns the wheel; buckets fill at the bottom, empty at the top into an aqueduct. The restored noria at Jnan Sbil is a major heritage feature of the garden.' },
  { name: 'Sahrij (Reservoir)', arabic: 'صهريج', description: 'Massive above-ground water basins that store water for year-round irrigation. Built above ground level so gravity distributes water without pumping. The Menara\'s basin: 195 × 160m. Agdal\'s Dar al-Hana basin: 208 × 181m, capacity 83,000 m³.', engineering: 'Constructed from rammed earth mixed with lime and gravel. Watertight through the tamped earth technique. The above-ground elevation is deliberate: gravity-fed distribution eliminates the need for mechanical lifting. The reservoirs also serve aesthetic, recreational, and military purposes.' },
]

interface HistoryEvent {
  year: string
  event: string
  thread: string
}

const HISTORY: HistoryEvent[] = [
  { year: 'Early 12th C', event: 'Almoravids build first khettara systems in Marrakech under Ali bin Yusuf (1105–1143), establishing the underground water infrastructure that would support all future gardens', thread: 'water' },
  { year: '1147', event: 'Marrakech becomes capital of the Almohad Empire (encompassing the entire Maghreb and Al-Andalus)', thread: 'dynasty' },
  { year: 'c. 1157', event: 'Almohad Caliph Abd al-Mu\'min creates both the Menara Gardens (west of city) and initiates the Agdal Gardens (south). A revolutionary urban vision: the total garden surface equals the built city surface', thread: 'founding' },
  { year: '1163–1184', event: 'Abu Ya\'qub Yusuf expands the Agdal. Builds the great reservoir (Dar al-Hana basin, 208 × 181m). Uses it as model for basins in Rabat and Seville\'s Alcázar', thread: 'founding' },
  { year: '16th C', event: 'Saadian dynasty restores Marrakech as capital. Builds pleasure pavilion at Menara. The golden age of Hispano-Moorish garden architecture in Morocco', thread: 'dynasty' },
  { year: '18th C', event: 'Sultan Moulay Abdallah creates Jnan Sbil Gardens in Fez — a royal domain with underground passage to the palace. Arab-Andalusian tradition transplanted to the spiritual capital', thread: 'founding' },
  { year: '1822–1873', event: 'Alaouite sultans Moulay Abd ar-Rahman and Muhammad IV restore both Menara and Agdal. Replant orchards, restore water systems, rebuild the Menara pavilion (completed 1870)', thread: 'restoration' },
  { year: '1917', event: 'Jnan Sbil opened to the public — no longer royal-only. Morocco\'s first major public garden', thread: 'public' },
  { year: '1923', event: 'Jacques Majorelle purchases a palm grove in Marrakech and begins planting', thread: 'modern' },
  { year: '1937', event: 'Majorelle creates his trademark cobalt blue (bleu Majorelle, #6050DC) and transforms the garden buildings. Opens to public in 1947', thread: 'modern' },
  { year: '1980', event: 'Yves Saint Laurent and Pierre Bergé buy Jardin Majorelle, saving it from hotel developers. "We were seduced by this oasis where colours used by Matisse were mixed with those of nature"', thread: 'modern' },
  { year: '1985', event: 'UNESCO inscribes the Medina of Marrakech — including Agdal and Menara Gardens — as World Heritage Site', thread: 'recognition' },
  { year: '2006–2011', event: 'Princess Lalla Hasnaa launches rehabilitation of Jnan Sbil: four-year restoration of 3,000 plant species, ancient hydraulic systems, norias, seguias, fountains. Reopened 2011', thread: 'restoration' },
  { year: '2017', event: 'Musée Yves Saint Laurent opens next to Jardin Majorelle. Villa houses Berber Museum with 600+ artefacts', thread: 'modern' },
]

const HERO_STATS = [
  { value: '1157', label: 'Almohad founding of Agdal & Menara' },
  { value: '45 km', label: 'khettara channel length from Atlas to Agdal' },
  { value: '900K', label: 'annual visitors to Jardin Majorelle' },
  { value: '3,000+', label: 'plant species in Jnan Sbil, Fez' },
]

const KEY_NUMBERS = [
  { number: '500', unit: 'hectares', context: 'Agdal Gardens — almost the size of Almohad-era Marrakech itself. The largest historic garden in the city. 3,000 olive trees in a geometric grid' },
  { number: '83,000', unit: 'm³', context: 'Capacity of the Dar al-Hana reservoir at the Agdal. Rammed earth mixed with lime. 208 × 181 metres. Built in the 12th century. Still standing' },
  { number: '#6050DC', unit: '', context: 'Majorelle Blue — the trademarked cobalt that defines Jardin Majorelle. Inspired by Moroccan tiles and Tuareg blue veils' },
  { number: '1870', unit: '', context: 'Year the current Menara pavilion was completed — on ruins of a 16th-century Saadian original. Green pyramidal roof, horseshoe arches, zellige' },
  { number: '7.5', unit: 'hectares', context: 'Jnan Sbil — Fez. "Jnan" from "jannah" (paradise). 3,000 species. Underground passage to the Royal Palace. Free admission' },
  { number: '900,000', unit: 'visitors/year', context: 'Jardin Majorelle. One hectare. Created by a painter, saved by a couturier' },
]

const THREAD_COLORS: Record<string, string> = {
  founding: '#2E7D32',
  dynasty: '#8B7355',
  water: '#1E88E5',
  restoration: '#E8A94E',
  modern: '#8B2FC9',
  public: '#5C7C3E',
  recognition: '#A0452E',
}

const BIBLIOGRAPHY = [
  { source: 'Wikipedia', detail: 'Agdal Gardens, Menara Gardens, Majorelle Garden, Jnan Sbil Gardens, Sintir. Comprehensive historical chronologies, reservoir dimensions, water system descriptions' },
  { source: 'ArchNet (Aga Khan Documentation Center)', detail: 'Agdal Gardens Marrakech. Hispano-Mauresque productive garden typology. Khettara network engineering. Basin al-Manzeh dimensions and construction' },
  { source: 'UNESCO', detail: 'World Heritage Site inscription 1985: Medina of Marrakesh including Agdal and Menara Gardens. Criteria and significance' },
  { source: 'Med-O-Med (ISESCO)', detail: 'Agdal and Menara Gardens. Reservoir engineering. Qanat/khettara systems. Garden grid dimensions' },
  { source: 'Fondation Pierre Bergé – Yves Saint Laurent / Musée YSL Marrakech', detail: 'Official Jardin Majorelle history. Jacques Majorelle biography. YSL and Bergé acquisition. Berber Museum. Madison Cox garden redesign' },
  { source: 'Lonely Planet / National Geographic', detail: 'Majorelle Blue origins. Visitor statistics (900,000/year). 300 plant species from five continents. Berber Museum details' },
  { source: 'Mohammed VI Foundation for Environmental Protection', detail: 'Jnan Sbil rehabilitation project (2006–2010). 3,000 plant species conserved. Hydraulic system restoration. Princess Lalla Hasnaa patronage' },
  { source: 'Visit Marrakech / El Faïz, Mohammed', detail: '"The Garden Strategy of the Almohad Sultans." 45km khettara network. Three-tier oasis agriculture. Almohad urban planning philosophy' },
]

const MAP_POINTS = [
  { name: 'Agdal Gardens', lat: 31.6135, lng: -7.9879, detail: 'Almohad, 1157. 405 hectares. Royal irrigation.', color: '#2D6E4F' },
  { name: 'Menara Gardens', lat: 31.6227, lng: -8.0225, detail: 'Almohad, 12th C. Iconic pavilion. Olive groves.', color: '#2D6E4F' },
  { name: 'Jardin Majorelle', lat: 31.6419, lng: -8.0032, detail: 'Majorelle 1923, YSL 1980. Cobalt blue.', color: '#1A5276' },
  { name: 'Jnan Sbil', lat: 34.0597, lng: -4.9878, detail: 'Fez, 18th C. Royal park. Open since 2011.', color: '#2D6E4F' },
]

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────

const ACCENT = '#2D6E4F'

export function GardensOfMoroccoContent() {
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function GardenMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-7.0, 32.8], zoom: 5.5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        MAP_POINTS.forEach(p => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => { map.flyTo({ center: [p.lng, p.lat], zoom: 14, duration: 1200 }) })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 12, closeButton: false, maxWidth: '220px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])
  return <div ref={mapContainer} className="w-full" style={{ height: '480px', background: '#0a0a0a' }} />
}

  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeGarden, setActiveGarden] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const v = (id: string) => vis.has(id)
  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY

  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Chahar Bagh — four quadrant lines */}
            <line x1="600" y1="0" x2="600" y2="800" stroke={ACCENT} strokeWidth="0.3" />
            <line x1="0" y1="400" x2="1200" y2="400" stroke={ACCENT} strokeWidth="0.3" />
            <circle cx={600} cy={400} r={60} stroke={ACCENT} strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-28">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>Module 084 · Landscape Intelligence</p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Gardens of<br />Morocco
          </h1>
          <p className="text-[15px] md:text-[17px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.7)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Four gardens. The chahar bagh principle. Khettara engineering. A thousand years of water, geometry, and paradise made visible.
          </p>
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((st, i) => (
              <div key={i}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{st.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) }}`}</style>
      </section>

      {/* ═══ THE FOUR GARDENS — Each one a full editorial spread ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Gardens</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Four Gardens</h2>
          <div className="flex gap-3 mb-12">
            {GARDENS.map((g, i) => (
              <button key={i} onClick={() => setActiveGarden(i)}
                className="transition-all duration-500 text-left"
                style={{ flex: activeGarden === i ? 3 : 1, padding: '20px', background: activeGarden === i ? '#0a0a0a' : '#fafafa', color: activeGarden === i ? '#fff' : '#999' }}>
                <span className="font-serif italic block" style={{ fontSize: activeGarden === i ? '24px' : '14px', transition: 'font-size 0.5s' }}>{g.name}</span>
                <span className="text-[10px] uppercase tracking-[0.06em] block mt-1 opacity-60">{g.city}</span>
              </button>
            ))}
          </div>
          <div data-sid="gardens" className={`transition-all duration-700 ${v('gardens') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <h3 className="font-serif italic text-[28px] md:text-[36px] text-[#0a0a0a]">{GARDENS[activeGarden].name}</h3>
                <p className="text-[14px] mt-1" dir="rtl" style={{ color: '#bbb' }}>{GARDENS[activeGarden].arabic}</p>
                <div className="mt-6 space-y-4">
                  {[['Founded', GARDENS[activeGarden].founded], ['Founder', GARDENS[activeGarden].founder], ['Area', GARDENS[activeGarden].area], ['Type', GARDENS[activeGarden].type]].map(([l, t]) => (
                    <div key={l}>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: ACCENT }}>{l}</span>
                      <p className="text-[13px] text-[#525252]">{t}</p>
                    </div>
                  ))}
                  {GARDENS[activeGarden].unescoYear && (
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: ACCENT }}>UNESCO</span>
                      <p className="text-[13px] text-[#525252]">{GARDENS[activeGarden].unescoYear}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-5">
                <p className="text-[15px] text-[#525252] leading-[1.75] mb-6">{GARDENS[activeGarden].description}</p>
                <div className="space-y-4">
                  {[['Water', GARDENS[activeGarden].water], ['Plants', GARDENS[activeGarden].plants], ['Architecture', GARDENS[activeGarden].architecture]].map(([l, t]) => (
                    <div key={l}>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: '#999' }}>{l}</span>
                      <p className="text-[13px] text-[#525252] leading-relaxed">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3 flex flex-col justify-end">
                <div className="border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                  <p className="text-[14px] leading-relaxed" style={{ color: ACCENT }}>{GARDENS[activeGarden].keyFact}</p>
                </div>
                {GARDENS[activeGarden].visitors && (
                  <p className="text-[12px] text-[#999] mt-4">{GARDENS[activeGarden].visitors}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D6E4F' }}>The Gardens — Mapped</p>
        <GardenMap />
      </div></section>

      {/* ═══ ISLAMIC GARDEN PRINCIPLES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Geometry</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>Design Principles</h2>
          <div data-sid="principles" className={`transition-all duration-700 ${v('principles') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {ISLAMIC_GARDEN_PRINCIPLES.map((p, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="md:col-span-4">
                  <h3 className="font-serif italic text-[22px] md:text-[26px]" style={{ color: '#fff' }}>{p.name}</h3>
                  <p className="text-[13px] mt-1" dir="rtl" style={{ color: 'rgba(255,255,255,0.25)' }}>{p.arabic}</p>
                </div>
                <div className="md:col-span-5">
                  <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.description}</p>
                </div>
                <div className="md:col-span-3">
                  <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: ACCENT }}>Examples</span>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{p.examples}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PULLQUOTE ═══ */}
      <section className="flex items-center justify-center min-h-[42vh]" style={{ background: ACCENT }}>
        <div className="max-w-[720px] px-8 text-center py-20">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', color: '#fff' }}>
            The garden is not nature. It is nature submitted to geometry, and geometry submitted to water.
          </p>
        </div>
      </section>

      {/* ═══ WATER SYSTEMS — Sidebar + editorial ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Engineering</p>
              <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05]">Water<br />Systems</h2>
            </div>
            <div className="md:col-span-8" data-sid="water">
              <div className={`transition-all duration-700 ${v('water') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                {WATER_SYSTEMS.map((w, i) => (
                  <div key={i} className="py-8" style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <div className="flex items-baseline gap-3 mb-3">
                      <h3 className="font-serif italic text-[20px] text-[#0a0a0a]">{w.name}</h3>
                      <span className="text-[14px]" dir="rtl" style={{ color: '#bbb' }}>{w.arabic}</span>
                    </div>
                    <p className="text-[14px] text-[#525252] leading-[1.75] mb-3">{w.description}</p>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: ACCENT }}>Engineering</span>
                      <p className="text-[13px] text-[#737373] leading-relaxed">{w.engineering}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — Chronology</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">Twelve Centuries<br />of Gardens</h2>
          <div className="flex flex-wrap gap-2 mb-12">
            <button onClick={() => setActiveThread(null)}
              className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all"
              style={{ background: !activeThread ? '#0a0a0a' : 'transparent', color: !activeThread ? '#fff' : '#999', border: `1px solid ${!activeThread ? '#0a0a0a' : '#ddd'}` }}>All</button>
            {Object.entries(THREAD_COLORS).map(([t, c]) => (
              <button key={t} onClick={() => setActiveThread(activeThread === t ? null : t)}
                className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all"
                style={{ background: activeThread === t ? '#0a0a0a' : 'transparent', color: activeThread === t ? c : '#999', border: `1px solid ${activeThread === t ? '#0a0a0a' : '#ddd'}` }}>{t}</button>
            ))}
          </div>
          <div data-sid="timeline" className={`relative pl-8 md:pl-12 transition-all duration-700 ${v('timeline') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px" style={{ background: '#ddd' }} />
            <div className="space-y-6">
              {filteredHistory.map((h, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[23px] md:-left-[31px] top-[6px] w-[7px] h-[7px] rounded-full" style={{ background: THREAD_COLORS[h.thread] || ACCENT }} />
                  <span className="text-[11px] block mb-1" style={{ color: THREAD_COLORS[h.thread] || '#999' }}>{h.year}</span>
                  <p className="text-[14px] text-[#525252] leading-relaxed max-w-[640px]">{h.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — By the Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Key Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {KEY_NUMBERS.map((n, i) => (
              <div key={i} className="flex gap-6 items-start" style={{ paddingTop: i % 2 === 1 ? '40px' : '0' }}>
                <span className="font-serif italic flex-shrink-0" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{n.number}</span>
                <p className="text-[13px] text-[#525252] leading-relaxed pt-2">{n.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES + FOOTER ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: '#999' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            {BIBLIOGRAPHY.map((b, i) => (
              <div key={i}>
                <span className="text-[12px] text-[#525252]">{b.source}</span>
                <p className="text-[11px] text-[#999] leading-relaxed">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <div style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-8 md:px-[8%]">
          <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Module 084 · Gardens of Morocco · © Slow Morocco</p>
        </div>
        <div style={{ backgroundColor: '#161616' }} className="py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>slowmorocco.com</p>
        </div>
        <div style={{ backgroundColor: '#0e0e0e' }} className="py-2" />
      </footer>
    </main>
  )
}
