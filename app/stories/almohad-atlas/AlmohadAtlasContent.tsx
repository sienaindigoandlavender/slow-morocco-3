'use client'

import { useState, useEffect, useRef } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const C = {
  almohad: '#C17F28', ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
}

// ═══ CATEGORIES ═══
type Category = 'mosque' | 'minaret' | 'gate' | 'fortification' | 'palace' | 'garden' | 'bridge'
const CAT_META: Record<Category, { label: string; color: string; icon: string }> = {
  mosque: { label: 'Mosques', color: '#8B3A3A', icon: '◆' },
  minaret: { label: 'Minarets', color: '#C17F28', icon: '▲' },
  gate: { label: 'Monumental Gates', color: '#5D4E7A', icon: '◼' },
  fortification: { label: 'Fortifications', color: '#6B5B3A', icon: '●' },
  palace: { label: 'Palaces & Gardens', color: '#2D6E4F', icon: '◇' },
  garden: { label: 'Garden Estates', color: '#3A6B5B', icon: '○' },
  bridge: { label: 'Towers & Defenses', color: '#737373', icon: '■' },
}

// ═══ REGIONS ═══
type Region = 'morocco' | 'spain' | 'portugal' | 'tunisia'
const REGION_LABEL: Record<Region, string> = {
  morocco: 'Morocco', spain: 'Al-Andalus (Spain)', portugal: 'Portugal', tunisia: 'Ifriqiya (Tunisia)',
}

// ═══ CALIPHS ═══
interface Caliph { name: string; reign: string; title: string }
const CALIPHS: Caliph[] = [
  { name: 'Abd al-Mu\'min', reign: '1130–1163', title: '1st Caliph. Conquered Marrakech 1147. Founded the empire.' },
  { name: 'Abu Ya\'qub Yusuf I', reign: '1163–1184', title: '2nd Caliph. Builder of Seville as second capital.' },
  { name: 'Abu Yusuf Ya\'qub al-Mansur', reign: '1184–1199', title: '3rd Caliph. "The Victorious." Greatest builder.' },
  { name: 'Muhammad al-Nasir', reign: '1199–1213', title: '4th Caliph. Completed Fes walls. Defeated at Las Navas 1212.' },
]

// ═══ SITES ═══
interface Site {
  name: string; city: string; region: Region; category: Category
  lat: number; lng: number; date: string; caliph: string
  story: string; status: string; significance: number // 1-3 for marker size
}

const SITES: Site[] = [
  // ═══ MOROCCO ═══
  {
    name: 'Kutubiyya Mosque', city: 'Marrakech', region: 'morocco', category: 'mosque',
    lat: 31.6238, lng: -7.9940, date: '1147–1158', caliph: 'Abd al-Mu\'min',
    story: 'The prototype. Built by the first Almohad caliph directly over the ruins of the Almoravid palace — a deliberate act of erasure. Then demolished and rebuilt because the qibla was slightly misaligned. The second version, the one standing today, established the T-plan that every Moroccan mosque would follow for centuries. Seventeen naves. Five muqarnas cupolas above the qibla aisle. The minbar inside was commissioned by the Almoravids in 1137 from Córdoban workshops — the Almohads kept it. It is considered the finest surviving medieval minbar in the Islamic world.',
    status: 'Standing. Active mosque. UNESCO World Heritage.', significance: 3,
  },
  {
    name: 'Kutubiyya Minaret', city: 'Marrakech', region: 'morocco', category: 'minaret',
    lat: 31.6240, lng: -7.9935, date: 'Before 1195', caliph: 'Abu Yusuf Ya\'qub al-Mansur',
    story: 'The model for minarets across the western Islamic world. 77 metres tall including the finial, built in red sandstone from the Gueliz quarries. Square shaft, ratio of height to width approximately 5:1 — the Almohad formula. Interior ramp (not stairs) wide enough for a horseman to ride to the top. Four copper orbs crown the summit — most Moroccan minarets have three. Opposite faces have alternate decorative patterns. The blueprint for the Giralda in Seville and the Hassan Tower in Rabat.',
    status: 'Standing. Symbol of Marrakech.', significance: 3,
  },
  {
    name: 'Tinmal Mosque', city: 'Tinmal, High Atlas', region: 'morocco', category: 'mosque',
    lat: 31.0340, lng: -8.0530, date: '1148–1154', caliph: 'Abd al-Mu\'min',
    story: 'The birthplace. Ibn Tumart founded the Almohad movement here in the High Atlas around 1120. After conquering Marrakech, Abd al-Mu\'min returned to build a great mosque at the site where it all began. Fortress-like exterior with thick plain walls. Unique minaret position: directly over the mihrab, at the center of the qibla wall — a design found nowhere else. Subsequent Almohad caliphs were buried nearby. Damaged in the 2023 earthquake.',
    status: 'Partially ruined. UNESCO Tentative List. Earthquake damage 2023.', significance: 3,
  },
  {
    name: 'Kasbah Mosque', city: 'Marrakech', region: 'morocco', category: 'mosque',
    lat: 31.6175, lng: -7.9910, date: '1190s', caliph: 'Abu Yusuf Ya\'qub al-Mansur',
    story: 'Built inside the new royal Kasbah as the caliph\'s personal mosque. Its minaret — covered in sebka motifs and glazed turquoise tilework — was even more influential than the Kutubiyya\'s. The Marinids, Saadians, and Alaouites all copied this minaret\'s decorative program for centuries. The Saadian Tombs lie directly behind it.',
    status: 'Standing. Active mosque. Minaret visible across Marrakech.', significance: 2,
  },
  {
    name: 'Kasbah of Marrakech', city: 'Marrakech', region: 'morocco', category: 'fortification',
    lat: 31.6160, lng: -7.9900, date: '1185–1190s', caliph: 'Abu Yusuf Ya\'qub al-Mansur',
    story: 'Al-Mansur separated the palace from the people. He built a fortified royal city within the city — the Kasbah — with its own walls, gates, mosques, gardens, and administration. This model of the royal citadel-within-the-city became standard in Morocco. The Saadian Badi Palace and the current Royal Palace both stand on Kasbah land. The Almohad walls still define the quarter.',
    status: 'Walls standing. Interior rebuilt by later dynasties.', significance: 2,
  },
  {
    name: 'Bab Agnaou', city: 'Marrakech', region: 'morocco', category: 'gate',
    lat: 31.6185, lng: -7.9935, date: 'c. 1188', caliph: 'Abu Yusuf Ya\'qub al-Mansur',
    story: 'Ceremonial entrance to the Kasbah. Grey-blue Gueliz sandstone carved with a horseshoe arch surrounded by concentric decorative bands, shell motifs in the spandrels, and a Quranic inscription from Surah al-Hijr in foliated Kufic script. Originally flanked by two bastion towers with a bent interior passage. The finest surviving Almohad decorative gate in Marrakech — comparable to Bab er-Rouah and Bab Oudaia in Rabat.',
    status: 'Standing. UNESCO component.', significance: 3,
  },
  {
    name: 'Menara Gardens', city: 'Marrakech', region: 'morocco', category: 'garden',
    lat: 31.6175, lng: -8.0220, date: '1147 onward', caliph: 'Abd al-Mu\'min',
    story: 'The Almohads established royal garden estates around their capital, centered on enormous water basins that sustained orchards and served as reservoirs. The Menara — with its vast reflecting pool against the Atlas Mountains — began as one of these Almohad pleasure gardens. The existing pavilion dates from the Saadian or Alaouite period, but the hydraulic infrastructure is Almohad.',
    status: 'Standing. Major landmark.', significance: 1,
  },
  {
    name: 'Agdal Gardens', city: 'Marrakech', region: 'morocco', category: 'garden',
    lat: 31.6050, lng: -7.9870, date: '1156 onward', caliph: 'Abd al-Mu\'min',
    story: '400 hectares of orchards and olive groves south of the Kasbah, fed by an elaborate khettara underground irrigation system bringing water from the Atlas foothills. Created in 1156 as the royal agricultural estate and pleasure garden. The name comes from Amazigh "agdal" meaning walled meadow. One of the largest historic gardens in the Islamic world.',
    status: 'Standing. UNESCO component. Open Fridays/Sundays.', significance: 1,
  },
  {
    name: 'Great Mosque of Taza', city: 'Taza', region: 'morocco', category: 'mosque',
    lat: 34.2130, lng: -4.0080, date: '1142', caliph: 'Abd al-Mu\'min',
    story: 'The oldest surviving Almohad mosque. Founded as a ribat (fortress-mosque) in 1142 when Taza was one of the Almohads\' first conquests beyond the Atlas. Taza controlled the strategic "Taza Gap" — the narrow corridor between the Rif and Middle Atlas mountains, the only land route between eastern and western Morocco. The Marinids later expanded the mosque and added its famous chandelier.',
    status: 'Standing. Active mosque. Later Marinid modifications.', significance: 2,
  },
  {
    name: 'Hassan Tower & Mosque', city: 'Rabat', region: 'morocco', category: 'minaret',
    lat: 34.0243, lng: -6.8225, date: '1191–1199', caliph: 'Abu Yusuf Ya\'qub al-Mansur',
    story: 'The grandest ambition, never completed. Al-Mansur ordered the largest mosque in the western Islamic world — large enough to hold the entire Almohad army for prayer. The minaret was to be the tallest ever built. When al-Mansur died in 1199, work stopped. The tower reached only 44 metres of its intended height. 348 columns once supported the roof — now they stand like a stone forest. The 1755 Lisbon earthquake destroyed most of the remaining walls. The unfinished tower became Rabat\'s defining symbol.',
    status: 'Unfinished ruin. National monument. Mausoleum of Mohammed V built adjacent.', significance: 3,
  },
  {
    name: 'Kasbah of the Udayas', city: 'Rabat', region: 'morocco', category: 'fortification',
    lat: 34.0310, lng: -6.8360, date: '1150–1151', caliph: 'Abd al-Mu\'min',
    story: 'Abd al-Mu\'min destroyed the earlier Almoravid ribat on this rocky promontory overlooking the Bou Regreg river and built a new fortress. Al-Mansur later added the monumental ceremonial gate — one of the greatest surviving Almohad monuments. The gate features concentric horseshoe arch decorations with scalloped and darj-wa-ktaf patterns. Inside the kasbah, the Andalusian Garden was added later.',
    status: 'Standing. UNESCO World Heritage. Active neighborhood.', significance: 2,
  },
  {
    name: 'Bab Oudaia', city: 'Rabat', region: 'morocco', category: 'gate',
    lat: 34.0315, lng: -6.8355, date: '1190s', caliph: 'Abu Yusuf Ya\'qub al-Mansur',
    story: 'The ceremonial gate of the Kasbah of the Udayas. Monumental horseshoe arch facade carved in stone with concentric bands of decoration — polylobed arches, scallop motifs, and shell-filled spandrels. Inside, the passage makes a 90-degree bend. One of three sister gates (with Bab Agnaou and Bab er-Rouah) that defined the Almohad monumental gate style.',
    status: 'Standing. UNESCO component. Marrakech\'s sister gate.', significance: 3,
  },
  {
    name: 'Bab er-Rouah', city: 'Rabat', region: 'morocco', category: 'gate',
    lat: 34.0165, lng: -6.8380, date: '1190s', caliph: 'Abu Yusuf Ya\'qub al-Mansur',
    story: '"Gate of the Winds." Part of the massive outer walls al-Mansur built for his new capital, Ribat al-Fath. The facade features the same horseshoe arch with concentric decorative bands as its sister gates. The interior passage bends through multiple vaulted chambers. Now serves as an art gallery — the Almohad soldiers\' passage repurposed for exhibitions.',
    status: 'Standing. Art gallery inside. UNESCO component.', significance: 2,
  },
  {
    name: 'Walls of Ribat al-Fath', city: 'Rabat', region: 'morocco', category: 'fortification',
    lat: 34.0200, lng: -6.8350, date: '1190s', caliph: 'Abu Yusuf Ya\'qub al-Mansur',
    story: 'Al-Mansur envisioned Rabat as a vast new imperial capital — Ribat al-Fath ("Camp of Victory"). He built massive walls enclosing a far larger area than the existing city, anticipating a metropolis that never materialized. When the dynasty fell, the walls enclosed mostly empty land. These walls defined the historic center of Rabat until the 20th century and survive almost intact today.',
    status: 'Standing. Define the historic center. UNESCO World Heritage.', significance: 2,
  },
  {
    name: 'City Walls of Fes', city: 'Fes', region: 'morocco', category: 'fortification',
    lat: 34.0610, lng: -4.9780, date: '1204', caliph: 'Muhammad al-Nasir',
    story: 'After conquering Fes in 1145, the Almohads demolished its walls as punishment for the city\'s resistance. Later, recognizing Fes\'s strategic importance, caliph al-Mansur ordered reconstruction. His successor Muhammad al-Nasir completed the ramparts in 1204, giving them their definitive shape and establishing the perimeter of Fes el-Bali — still the boundary of the old city today.',
    status: 'Standing. Define Fes el-Bali perimeter.', significance: 2,
  },
  {
    name: 'Kasbah An-Nouar', city: 'Fes', region: 'morocco', category: 'fortification',
    lat: 34.0650, lng: -4.9850, date: 'Almohad era', caliph: 'Various',
    story: 'One of thirteen kasbahs surrounding the old city of Fes, located at the western tip of Fes el-Bali. Dating from the Almohad period but restored and repurposed under later dynasties. Now serves as a residential district.',
    status: 'Standing. Residential quarter.', significance: 1,
  },

  // ═══ AL-ANDALUS (SPAIN) ═══
  {
    name: 'Giralda (Great Mosque Minaret)', city: 'Seville', region: 'spain', category: 'minaret',
    lat: 37.3861, lng: -5.9926, date: '1184–1198', caliph: 'Abu Ya\'qub Yusuf I / al-Mansur',
    story: 'The Kutubiyya\'s sister in Seville. Abu Ya\'qub Yusuf I began the Great Mosque of Seville in 1171, making the city the Almohad capital of al-Andalus. His son al-Mansur added the minaret. At 104 metres (including the later Christian bell tower addition), it became the tallest tower in the world at the time. The original Almohad portion rises 66 metres in brick, with diamond-pattern sebka decoration and reused Cordoban columns from the ruins of Madinat al-Zahra. After the Reconquista, Christians added a Renaissance belfry on top rather than demolishing it.',
    status: 'Standing. Seville Cathedral bell tower. UNESCO World Heritage.', significance: 3,
  },
  {
    name: 'Torre del Oro', city: 'Seville', region: 'spain', category: 'bridge',
    lat: 37.3822, lng: -5.9965, date: '1220–1221', caliph: 'Governor Abu l-Ula',
    story: 'A dodecagonal military watchtower on the Guadalquivir River. A chain stretched underwater from this tower to another on the opposite bank, blocking enemy ships from reaching the city. The "Gold Tower" name comes from the golden shine its mortar-lime-hay mixture cast on the river. Damaged in the 1755 Lisbon earthquake. The upper cylindrical level was rebuilt in 1760. Now a naval museum.',
    status: 'Standing. Naval museum. Seville landmark.', significance: 2,
  },
  {
    name: 'Alcázar of Seville (Almohad phase)', city: 'Seville', region: 'spain', category: 'palace',
    lat: 37.3833, lng: -5.9908, date: '1150s onward', caliph: 'Abd al-Mu\'min / successors',
    story: 'The Almohads developed Seville as their Andalusian capital from the 1150s and expanded the existing Abbadid palace into a larger complex. The surviving Patio del Yeso — with its sebka arches and central pool — is one of the only surviving Almohad palace courtyards anywhere. After the Reconquista (1248), Christian kings rebuilt most of the complex in Mudéjar style, but the Almohad bones remain beneath.',
    status: 'Patio del Yeso survives. Rest rebuilt. UNESCO World Heritage.', significance: 2,
  },
  {
    name: 'Buhaira Gardens', city: 'Seville', region: 'spain', category: 'garden',
    lat: 37.3750, lng: -5.9780, date: '1171', caliph: 'Abu Ya\'qub Yusuf I',
    story: 'Almohad garden estate on the outskirts of Seville, centered on an enormous artificial lake — al-Buḥayra means "little sea." Small pleasure pavilions stood at the water\'s edge. The same model as the Menara and Agdal in Marrakech. Archaeological excavation and partial restoration in the 1970s revealed the site.',
    status: 'Partially excavated and restored. Public park.', significance: 1,
  },
  {
    name: 'City Walls of Seville', city: 'Seville', region: 'spain', category: 'fortification',
    lat: 37.3890, lng: -5.9880, date: '12th century', caliph: 'Various',
    story: 'The Almohads rebuilt and greatly expanded Seville\'s fortifications, enclosing the entire urban area. Most of the walls were demolished in the 19th century to allow city expansion. The Macarena section with its gates and towers is the best-preserved remnant.',
    status: 'Mostly demolished. Macarena section survives.', significance: 1,
  },
  {
    name: 'City Walls of Córdoba', city: 'Córdoba', region: 'spain', category: 'fortification',
    lat: 37.8787, lng: -4.7794, date: '12th century', caliph: 'Various',
    story: 'The Almohads rebuilt and expanded the fortifications of their predecessor capital. The Calahorra Tower at the southern end of the Roman Bridge — a fortified gate designed to protect the river crossing — is attributed to Almohad construction, though later modified.',
    status: 'Calahorra Tower standing. Most walls rebuilt.', significance: 1,
  },
  {
    name: 'Calahorra Tower', city: 'Córdoba', region: 'spain', category: 'bridge',
    lat: 37.8763, lng: -4.7764, date: '12th century', caliph: 'Various',
    story: 'Fortified gate tower at the south end of the Roman Bridge, controlling the Guadalquivir crossing into Córdoba. Originally an arched gate between two towers. A third connecting tower was added later. Declared a national historical monument in 1931. Now houses a museum of the three cultures (Islamic, Christian, Jewish) of medieval Córdoba.',
    status: 'Standing. Museum. National monument.', significance: 1,
  },
  {
    name: 'Alcázar Genil', city: 'Granada', region: 'spain', category: 'palace',
    lat: 37.1695, lng: -3.6005, date: 'c. 1218', caliph: 'Late Almohad period',
    story: 'A pleasure palace on the banks of the Genil River, built in the late Almohad period and later remodeled by the Nasrids. It stood next to an enormous artificial pool. The surviving qubba (pavilion) — reminiscent of Persian kiosk-palaces — is the only remaining part. Tradition holds that Boabdil handed the keys of Granada to the Catholic Monarchs in the forecourt of this building in 1492.',
    status: 'Qubba survives. Foundation headquarters. Visitable.', significance: 1,
  },

  // ═══ PORTUGAL ═══
  {
    name: 'Walls of Silves', city: 'Silves, Algarve', region: 'portugal', category: 'fortification',
    lat: 37.1895, lng: -8.4375, date: 'Late 12th century', caliph: 'Various',
    story: 'The most beautiful Islamic military monument in Portugal. The Almohad walls surrounding 7 hectares of the former capital of the Algarve were erected on existing fortifications that needed reinforcing against the advancing Christian kingdoms. Red sandstone, towers, and battlements. The castle of Silves — with its rammed-earth walls on red sandstone foundations — is the best-preserved Almohad fortification in Portugal.',
    status: 'Standing. Castle restored. Major monument.', significance: 2,
  },

  // ═══ TUNISIA ═══
  {
    name: 'Kasbah Mosque of Tunis', city: 'Tunis', region: 'tunisia', category: 'mosque',
    lat: 36.7963, lng: 10.1706, date: '1230s', caliph: 'Hafsid (Almohad branch)',
    story: 'Built by Abu Zakariya, first ruler of the Hafsid dynasty — an Almohad branch that declared independence in Ifriqiya. The minaret directly borrows decorative elements from the Almohad Kasbah Mosque minaret in Marrakech, the Hassan Tower in Rabat, and the Giralda in Seville. Proof that the Almohad architectural language traveled east with their governors and survived after the dynasty\'s fall.',
    status: 'Standing. Active mosque.', significance: 2,
  },
]

// ═══ MAP BOUNDS ═══
const CENTER: [number, number] = [-3.5, 34.5]
const ZOOM = 4.2

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
function AlmohadMap({ selected, onSelect, catFilter, regionFilter }: {
  selected: number | null; onSelect: (i: number) => void
  catFilter: Category | null; regionFilter: Region | null
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
      center: CENTER,
      zoom: ZOOM,
      accessToken: MAPBOX_TOKEN,
      attributionControl: false,
    })
    m.addControl(new mapboxgl.NavigationControl(), 'top-right')
    m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    m.on('load', () => {
      // Almohad Empire approximate boundary
      m.addSource('empire', {
        type: 'geojson',
        data: {
          type: 'Feature', properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-10, 30], [-12, 32], [-11, 35], [-9, 36.5], // Atlantic Morocco
              [-6, 36], [-5, 37.5], [-3, 38.5], [-1, 38], [0, 38], // Andalus coast
              [1, 37], [3, 37], [5, 37], [8, 36.5], [10.5, 37], // Maghreb coast
              [10, 34], [8, 33], [5, 32], [2, 31], [-1, 30], // interior
              [-5, 29], [-8, 29], [-10, 30], // Sahara edge
            ]]
          }
        }
      })
      m.addLayer({
        id: 'empire-fill', type: 'fill', source: 'empire',
        paint: { 'fill-color': C.almohad, 'fill-opacity': 0.04 }
      })
      m.addLayer({
        id: 'empire-line', type: 'line', source: 'empire',
        paint: { 'line-color': C.almohad, 'line-width': 1.5, 'line-opacity': 0.2, 'line-dasharray': [4, 4] }
      })

      // Site markers
      SITES.forEach((s, i) => {
        const el = document.createElement('div')
        const color = CAT_META[s.category].color
        const size = s.significance === 3 ? 16 : s.significance === 2 ? 12 : 9
        el.style.cssText = `
          width:${size}px;height:${size}px;
          background:${color};border:2px solid ${color};
          border-radius:${s.category === 'gate' || s.category === 'bridge' ? '2px' : '50%'};
          cursor:pointer;transition:all 0.3s;
          box-shadow:0 1px 4px rgba(0,0,0,0.25);
        `
        el.title = `${s.name} — ${s.city}`
        el.addEventListener('click', () => onSelect(i))
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.6)'; el.style.boxShadow = `0 0 14px ${color}50` })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.25)' })
        const marker = new mapboxgl.Marker({ element: el }).setLngLat([s.lng, s.lat]).addTo(m)
        markersRef.current.push(marker)
      })
    })

    map.current = m
    return () => m.remove()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Filters
  useEffect(() => {
    markersRef.current.forEach((marker, i) => {
      const el = marker.getElement()
      const s = SITES[i]
      const catMatch = !catFilter || s.category === catFilter
      const regMatch = !regionFilter || s.region === regionFilter
      el.style.opacity = (catMatch && regMatch) ? '1' : '0.12'
    })
  }, [catFilter, regionFilter])

  // Fly
  useEffect(() => {
    if (selected !== null && map.current) {
      const s = SITES[selected]
      const zoom = s.region === 'morocco' && (s.city === 'Marrakech') ? 13.5 : 11
      map.current.flyTo({ center: [s.lng, s.lat], zoom, duration: 1200 })
      markersRef.current.forEach((marker, i) => {
        marker.getElement().style.transform = i === selected ? 'scale(2)' : 'scale(1)'
      })
    }
  }, [selected])

  return <div ref={mapContainer} className="w-full rounded-sm" style={{ height: '560px' }} />
}

// ═══ CONTENT ═══
export default function AlmohadAtlasContent() {
  const [selected, setSelected] = useState<number | null>(null)
  const [catFilter, setCatFilter] = useState<Category | null>(null)
  const [regionFilter, setRegionFilter] = useState<Region | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const heroR = useReveal()
  const calR = useReveal()
  const listR = useReveal()

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('mapbox-gl-almohad')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
      document.head.appendChild(link)
      const script = document.createElement('script')
      script.id = 'mapbox-gl-almohad'
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.js'
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else {
      setMapLoaded(true)
    }
  }, [])

  const selectedSite = selected !== null ? SITES[selected] : null

  // Group by region
  const byRegion = (Object.keys(REGION_LABEL) as Region[]).map(r => ({
    region: r, label: REGION_LABEL[r], sites: SITES.filter(s => s.region === r),
  })).filter(g => g.sites.length > 0)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 062 · Architecture & Empire</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Almohad Atlas</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Every surviving monument of an empire that built in stone what it preached in scripture
          </p>
        </div>
        <p className="text-[13px] max-w-[580px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Between 1130 and 1269, the Almohad caliphate controlled everything from the
          Sahara to the Tagus, from the Atlantic to Tripoli. They rejected the ornamental
          excess of their <span className="underline underline-offset-2">Almoravid</span> predecessors and built instead with monumental restraint —
          enormous minarets, austere facades, horseshoe arches that framed emptiness as
          deliberately as they framed stone. Their three sister minarets — the Kutubiyya in
          Marrakech, the Giralda in Seville, the Hassan Tower in <span className="underline underline-offset-2">Rabat</span> — still define the
          skylines of three cities in two countries on two continents.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: String(SITES.length), l: 'monuments mapped', c: C.almohad },
            { v: '4', l: 'countries', c: CAT_META.mosque.color },
            { v: '139', l: 'years of empire', c: CAT_META.fortification.color },
            { v: '3', l: 'sister minarets', c: CAT_META.minaret.color },
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

      {/* ═══ MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: C.almohad }}>The Empire in Stone</p>
            <p className="text-[12px]" style={{ color: C.muted }}>
              Dashed line = approximate empire extent at peak (c. 1200). Click any site. Filter by type or region.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <button onClick={() => setCatFilter(null)}
              className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono transition-all"
              style={{ background: !catFilter ? C.ink : 'transparent', color: !catFilter ? 'white' : C.muted, border: `1px solid ${!catFilter ? C.ink : C.border}` }}>
              All types
            </button>
            {(Object.keys(CAT_META) as Category[]).map(cat => {
              const count = SITES.filter(s => s.category === cat).length
              if (count === 0) return null
              return (
                <button key={cat} onClick={() => setCatFilter(catFilter === cat ? null : cat)}
                  className="px-2.5 py-1 text-[9px] tracking-wider font-mono transition-all"
                  style={{
                    background: catFilter === cat ? CAT_META[cat].color : 'transparent',
                    color: catFilter === cat ? 'white' : CAT_META[cat].color,
                    border: `1px solid ${catFilter === cat ? CAT_META[cat].color : `${CAT_META[cat].color}40`}`,
                  }}>
                  {CAT_META[cat].label} ({count})
                </button>
              )
            })}
          </div>

          {/* Region filters */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(Object.keys(REGION_LABEL) as Region[]).map(r => {
              const count = SITES.filter(s => s.region === r).length
              return (
                <button key={r} onClick={() => setRegionFilter(regionFilter === r ? null : r)}
                  className="px-2.5 py-1 text-[9px] tracking-wider font-mono transition-all"
                  style={{
                    background: regionFilter === r ? C.almohad : 'transparent',
                    color: regionFilter === r ? 'white' : C.muted,
                    border: `1px solid ${regionFilter === r ? C.almohad : C.border}`,
                  }}>
                  {REGION_LABEL[r]} ({count})
                </button>
              )
            })}
          </div>

          <div className="relative">
            {mapLoaded && <AlmohadMap selected={selected} onSelect={setSelected} catFilter={catFilter} regionFilter={regionFilter} />}

            {selectedSite && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[400px] p-5 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg max-h-[320px] overflow-y-auto"
                style={{ borderLeft: `3px solid ${CAT_META[selectedSite.category].color}` }}>
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-[11px] hover:opacity-60" style={{ color: C.muted }}>✕</button>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-block px-2 py-0.5 text-[8px] uppercase tracking-wider font-mono"
                    style={{ background: `${CAT_META[selectedSite.category].color}12`, color: CAT_META[selectedSite.category].color }}>
                    {CAT_META[selectedSite.category].label}
                  </span>
                  <span className="font-mono text-[9px]" style={{ color: C.muted }}>{selectedSite.date}</span>
                </div>
                <h3 className="font-serif text-[20px] leading-tight">{selectedSite.name}</h3>
                <p className="text-[12px]" style={{ color: C.almohad }}>{selectedSite.city} · {REGION_LABEL[selectedSite.region]}</p>
                <p className="font-mono text-[10px] mt-1 italic" style={{ color: C.muted }}>Commissioned by {selectedSite.caliph}</p>
                <p className="text-[12px] mt-3 leading-[1.6]" style={{ color: C.text }}>{selectedSite.story}</p>
                <p className="font-mono text-[9px] mt-3 pt-2 border-t" style={{ color: C.muted, borderColor: C.border }}>
                  {selectedSite.status}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ CALIPHS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={calR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.almohad }}>The Builder-Caliphs</p>
          <div className="grid md:grid-cols-4 gap-4">
            {CALIPHS.map((c, i) => (
              <div key={i} className="transition-all duration-700" style={{ opacity: calR.vis ? 1 : 0, transitionDelay: `${i * 100}ms` }}>
                <p className="font-serif text-[15px]">{c.name}</p>
                <p className="font-mono text-[10px]" style={{ color: C.almohad }}>{c.reign}</p>
                <p className="text-[11px] mt-1 leading-[1.5]" style={{ color: C.muted }}>{c.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SITE LIST BY REGION ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={listR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: C.almohad }}>Complete Inventory</p>

          {byRegion.map(group => (
            <div key={group.region} className="mb-8">
              <p className="font-mono text-[11px] uppercase tracking-wider mb-3 pb-2 border-b" style={{ color: C.text, borderColor: C.border }}>
                {group.label} ({group.sites.length})
              </p>
              <div className="space-y-2">
                {group.sites.map((s) => {
                  const idx = SITES.indexOf(s)
                  const color = CAT_META[s.category].color
                  return (
                    <button key={idx} onClick={() => setSelected(idx)}
                      className="w-full text-left flex items-start gap-3 py-1.5 hover:opacity-80 transition-all"
                      style={{ borderLeft: selected === idx ? `3px solid ${color}` : '3px solid transparent', paddingLeft: '10px' }}>
                      <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ background: color }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="font-serif text-[14px]">{s.name}</span>
                          <span className="font-mono text-[10px]" style={{ color: C.muted }}>{s.city}</span>
                        </div>
                        <p className="font-mono text-[9px]" style={{ color }}>
                          {CAT_META[s.category].label} · {s.date} · {s.caliph}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ANALYSIS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.almohad }}>Reading Notes</p>
          <div className="space-y-6 text-[12px] leading-[1.7] max-w-[600px]" style={{ color: C.text }}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The three sisters</p>
              <p>The Kutubiyya minaret (Marrakech, before 1195), the Giralda (Seville, 1184–1198), and the Hassan Tower (Rabat, begun 1191) were designed as a set — three minarets for three capitals across two continents. All follow the same proportional system: square shaft, internal ramp, decorative blind arcading. The Giralda is the tallest survivor. The Hassan Tower is the grandest unfinished project. The Kutubiyya is the prototype that generated both.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>Construction became an industry</p>
              <p>Scholar Felix Arnold observed that under the Almohads, construction reached a scale unseen since the Romans. Rammed earth and brick were their primary materials — cheap, available, and fast. They refined manufacturing processes that allowed them to build an entire city wall in months. The Marrakech ramparts — 19 kilometres — went up in eight months (though under the Almoravids). The Almohads replicated this speed across an empire.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>Austerity as ideology</p>
              <p>Ibn Tumart founded the Almohad movement on religious reform — the rejection of Almoravid decadence. This translated directly into architecture. Early Almohad buildings stripped back the ornamental excess of the Almoravid period, replacing intricate surface decoration with bold proportions and deliberate emptiness. The balance between carved stone and bare wall became itself a statement of faith. Later Almohad buildings — particularly under al-Mansur — gradually reintroduced ornament, but always within this framework of restraint.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The gate trilogy</p>
              <p>Bab Agnaou (Marrakech), Bab Oudaia (Rabat), and Bab er-Rouah (Rabat) are three variations on a single theme: a monumental horseshoe arch framed by concentric decorative bands, with shell motifs filling the spandrels and Quranic inscriptions in Kufic script running along the outer frame. The bent interior passage — forcing a 90-degree turn — is both defensive and psychological: you enter the caliph&apos;s domain by submitting to his architecture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sources: Wikipedia: &quot;Almohad architecture,&quot; &quot;Almohad Caliphate,&quot; &quot;Moorish architecture,&quot; &quot;Kutubiyya Mosque,&quot; &quot;Tinmal Mosque,&quot; &quot;Hassan Tower,&quot; &quot;Giralda,&quot; &quot;Torre del Oro,&quot; &quot;Bab Agnaou,&quot; &quot;Kasbah of the Udayas,&quot; &quot;Alcázar of Seville,&quot; &quot;Walls of Marrakesh.&quot;
            Metropolitan Museum of Art: &quot;The Art of the Almoravid and Almohad Periods.&quot;
            Archnet: &quot;Timeline: Almohad (1130–1269).&quot;
            Deverdun, Gaston. <em>Marrakech: des origines à 1912</em>. 1959.
            Hillenbrand, Robert. <em>Islamic Architecture</em>. Edinburgh University Press, 1999.
            Petersen, Andrew. <em>Dictionary of Islamic Architecture</em>. Routledge, 1999.
            Bennison, Amira K. <em>The Almoravid and Almohad Empires</em>. Edinburgh University Press, 2016.
            Barakat Trust: &quot;Documenting the Mosques of Tinmal and Taza.&quot;
            Dr. Íñigo Almela, Ataral digital atlas: 70+ Almohad buildings documented.
            Coordinates via Google Earth, OpenStreetMap, and Archnet.
          </p>
          <p className="font-mono text-[9px] mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            © Slow Morocco. All rights reserved. This visualization may not be reproduced without visible attribution.
          </p>
        </div>
      </section>
    </div>
  )
}
