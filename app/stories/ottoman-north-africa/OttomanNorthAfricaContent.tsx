'use client'

import { useState, useEffect, useRef } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const C = {
  ottoman: '#C41E3A', algiers: '#D4A017', tunis: '#2E8B57', tripoli: '#8B4513',
  egypt: '#6B3FA0', morocco: '#1B4D3E',
  ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
}

// ═══ TERRITORIES ═══
type Territory = 'algiers' | 'tunis' | 'tripoli' | 'egypt' | 'morocco'
const TERRITORY_META: Record<Territory, { label: string; color: string; dates: string; status: string }> = {
  algiers:  { label: 'Regency of Algiers',  color: C.algiers, dates: '1516–1830', status: 'Ottoman province / semi-autonomous corsair state' },
  tunis:    { label: 'Regency of Tunis',    color: C.tunis,   dates: '1574–1881', status: 'Ottoman province / Husaynid autonomous beys' },
  tripoli:  { label: 'Regency of Tripoli',  color: C.tripoli, dates: '1551–1911', status: 'Ottoman province / Karamanli dynasty interlude' },
  egypt:    { label: 'Ottoman Egypt',        color: C.egypt,   dates: '1517–1798', status: 'Eyalet (province) / Mamluk resurgence / Muhammad Ali' },
  morocco:  { label: 'Morocco (Independent)',color: C.morocco, dates: 'Never Ottoman', status: 'Saadian then Alaouite — the one that got away' },
}

// ═══ CITIES ═══
interface City {
  name: string; lat: number; lng: number; territory: Territory
  role: string; story: string
}

const CITIES: City[] = [
  { name: 'Algiers', lat: 36.753, lng: 3.058, territory: 'algiers', role: 'Capital of Regency',
    story: 'Headquarters of the most powerful Barbary corsair state. Captured by the Barbarossa brothers in 1516. First beylerbey appointed 1525. After 1689, ruled by elected deys — a military republic answering only loosely to Istanbul. At its peak, Algiers held 25,000 Christian captives and its corsairs raided as far as Iceland (1627). French invasion ended it in 1830.' },
  { name: 'Tunis', lat: 36.806, lng: 10.166, territory: 'tunis', role: 'Capital of Regency',
    story: 'Taken and lost multiple times before Ottoman control was secured in 1574. Under the Husaynid dynasty (from 1705), Tunis became effectively autonomous while recognizing Ottoman religious authority. The beys collected taxes, ran courts, and conducted foreign policy independently. French protectorate imposed in 1881.' },
  { name: 'Tripoli', lat: 32.887, lng: 13.180, territory: 'tripoli', role: 'Capital of Regency',
    story: 'Captured from the Knights of Malta by Turgut Reis (Dragut) in 1551. Became base for corsair operations and trans-Saharan trade. The Karamanli dynasty (1711–1835) ruled autonomously before direct Ottoman control was reimposed. Italy seized it in the 1911–12 Italo-Turkish War — the last Ottoman territory in Africa.' },
  { name: 'Cairo', lat: 30.044, lng: 31.236, territory: 'egypt', role: 'Provincial capital',
    story: 'Conquered by Selim I in 1517 after destroying the Mamluk Sultanate. Egypt became the Ottoman Empire\'s most profitable province — its grain fed the navy, its taxes filled the treasury. But the Mamluks never truly left: they reasserted control from within, running Egypt as a state-within-a-state until Napoleon arrived in 1798.' },
  { name: 'Alexandria', lat: 31.200, lng: 29.919, territory: 'egypt', role: 'Port / naval base',
    story: 'Key Mediterranean port under Ottoman control. Naval staging point for campaigns westward along the North African coast. After the Mamluk conquest, the Ottomans used Egypt\'s ports to project power across the entire southern Mediterranean.' },
  { name: 'Oran', lat: 35.697, lng: -0.633, territory: 'algiers', role: 'Contested port',
    story: 'Changed hands repeatedly between Spain and the Regency of Algiers. Spain held it from 1509 to 1708, briefly regained it 1732–1792, then sold it to the Deylik. Symbol of the century-long Ottoman-Habsburg contest for Mediterranean supremacy.' },
  { name: 'Tlemcen', lat: 34.878, lng: -1.315, territory: 'algiers', role: 'Interior city',
    story: 'Ancient capital of the Zayyanid dynasty, displaced by Ottoman Algiers. Oruç Barbarossa was killed here in 1518 attempting to take it from Spain. Eventually absorbed into the Regency of Algiers. Important link in trans-Saharan trade networks.' },
  { name: 'Kairouan', lat: 35.678, lng: 10.096, territory: 'tunis', role: 'Holy city',
    story: 'Islam\'s holiest city in the Maghreb. Turgut Reis entered Kairouan in 1558, extending Ottoman authority beyond the coast into Tunisia\'s spiritual heartland. The Husaynid beys governed through Maliki religious scholars here.' },
  { name: 'Benghazi', lat: 32.116, lng: 20.086, territory: 'tripoli', role: 'Secondary capital',
    story: 'Part of the Tripoli regency. Important staging point for trans-Saharan caravans heading to the Fezzan and beyond. During the Karamanli period, Benghazi developed as a trade hub linking the Mediterranean to sub-Saharan Africa.' },
  { name: 'Fez', lat: 34.033, lng: -5.000, territory: 'morocco', role: 'Capital (independent)',
    story: 'Briefly captured by Ottoman-backed forces in 1554 (Wattasid restoration) and again in 1576 (Abd al-Malik installation). Both times, Ottoman control was ejected within months or years. The Saadians, then the Alaouites, kept Fez — and Morocco — out of Ottoman hands permanently.' },
  { name: 'Marrakech', lat: 31.630, lng: -7.982, territory: 'morocco', role: 'Southern capital',
    story: 'Saadian capital. Ahmad al-Mansur ("the Golden") ruled from here after the Battle of Three Kings (1578). He adopted Ottoman administrative methods and military organization, but never submitted to Ottoman sovereignty. Built El Badi Palace with ransom money from Portuguese captives.' },
  { name: 'Istanbul', lat: 41.008, lng: 28.978, territory: 'egypt', role: 'Imperial capital',
    story: 'The seat of power. The sultan in Istanbul appointed governors, sent janissaries, and collected tribute — but distance meant North African regencies operated with enormous autonomy. By the 18th century, Istanbul\'s control over its African provinces was largely nominal.' },
  { name: 'Djerba', lat: 33.808, lng: 10.857, territory: 'tunis', role: 'Naval battle site',
    story: 'Site of the 1560 Battle of Djerba: Ottoman admiral Piyale Pasha destroyed a massive combined Christian fleet (Spanish, Papal, Genoese, Maltese). One of the Ottoman Empire\'s greatest naval victories. Secured Ottoman dominance of the central Mediterranean for a generation.' },
  { name: 'Bougie (Béjaïa)', lat: 36.752, lng: 5.084, territory: 'algiers', role: 'Corsair port',
    story: 'Spanish presidio captured by the Regency. Part of the chain of corsair ports stretching from Algiers to Tripoli. Corsair captains operated from these ports as semi-independent warlords, sharing plunder with the dey of Algiers.' },
]

// ═══ TIMELINE ═══
interface TimeEvent {
  year: number; title: string; territory: Territory | 'ottoman'; story: string; keyFact: string
}

const TIMELINE: TimeEvent[] = [
  { year: 1516, title: 'The Barbarossa Brothers Take Algiers', territory: 'algiers',
    story: 'Oruç and Hayreddin Barbarossa — sons of an Ottoman sipahi from Lesbos — capture Algiers from its local ruler. They begin as corsairs fighting Spanish coastal forts, then build a state. Oruç is killed attacking Tlemcen in 1518. Hayreddin offers submission to Sultan Selim I in exchange for janissary reinforcements. Algiers becomes the western anchor of Ottoman power.',
    keyFact: 'Two brothers from a Greek island built an empire in Africa.' },
  { year: 1517, title: 'Selim I Conquers Egypt', territory: 'egypt',
    story: 'Sultan Selim I destroys the Mamluk Sultanate in a single yearlong campaign. The Mamluk cavalry — proud, traditional, contemptuous of firearms — is annihilated by Ottoman cannon and janissary muskets at Marj Dabiq (1516) and Ridaniya (1517). The last Mamluk sultan, Tuman Bay, is hanged at Cairo\'s Bab Zuwayla gate. Selim takes custody of the Abbasid caliph and the Prophet\'s relics. Egypt becomes the empire\'s richest province.',
    keyFact: 'Bows and arrows vs. cannon. The Mamluks lost in a year.' },
  { year: 1529, title: 'Hayreddin Captures the Peñón', territory: 'algiers',
    story: 'The Spanish fort on the island of Peñón de Argel, which overlooked the harbour of Algiers, is finally captured by Barbarossa. He demolishes the fort and uses the rubble to build a mole connecting the island to the mainland — creating the modern port of Algiers. The city is now an unassailable corsair base.',
    keyFact: 'He turned a Spanish fortress into a harbour wall.' },
  { year: 1534, title: 'Barbarossa Takes Tunis', territory: 'tunis',
    story: 'Hayreddin Barbarossa, now Kapudan Pasha (Grand Admiral) of the Ottoman fleet, captures Tunis from the Hafsid dynasty with 70 newly built galleys. Charles V of the Holy Roman Empire retakes it the following year with 400 ships. Tunis will change hands repeatedly before Ottoman control is finally secured in 1574.',
    keyFact: 'Tunis: captured, lost, recaptured, lost — for 40 years.' },
  { year: 1551, title: 'Turgut Reis Takes Tripoli', territory: 'tripoli',
    story: 'Turgut Reis (Dragut) — Barbarossa\'s protégé — captures Tripoli from the Knights of Malta with the help of Sinan Pasha. The Knights had held it since 1530. Turgut becomes governor and begins building Tripoli into a corsair capital. He\'s killed in 1565 at the Siege of Malta by a cannonball fragment — but Tripoli remains Ottoman.',
    keyFact: 'The Knights of Malta lost their African stronghold in 8 days.' },
  { year: 1554, title: 'Ottomans Enter Morocco (Briefly)', territory: 'morocco',
    story: 'The Wattasid ruler Ali Abu Hassun, allied with Istanbul, enters Morocco with forces led by Salah Rais from the Regency of Algiers. They capture Fez and restore Wattasid rule under nominal Ottoman suzerainty. It lasts months. The Saadian Sultan Mohammed ash-Sheikh retakes Fez the same year. He is later assassinated by Ottoman agents — but Morocco stays independent.',
    keyFact: 'The first Ottoman attempt. Morocco ejected them within months.' },
  { year: 1558, title: 'Battle of Wadi al-Laban', territory: 'morocco',
    story: 'Ottoman forces from the Regency of Algiers, under Hasan Pasha (son of Barbarossa), march west toward Morocco. The Saadian sultan al-Ghalib defeats them. This is the battle that draws the line: Algeria is Ottoman. Morocco is not. The border between the two — roughly the Moulouya River — becomes one of the most enduring political boundaries in Africa.',
    keyFact: 'The battle that drew the line between Ottoman and independent.' },
  { year: 1560, title: 'Battle of Djerba', territory: 'tunis',
    story: 'A massive Christian armada — 54 galleys and 46 other ships from Spain, the Papal States, Genoa, Florence, Malta, and Sicily — assembles to retake Tripoli. Ottoman admiral Piyale Pasha, with Turgut Reis, destroys the fleet at Djerba. 18,000 Christian soldiers killed or captured. 27 galleys taken. Ottoman naval supremacy in the central Mediterranean is confirmed.',
    keyFact: '18,000 Christian casualties. The Mediterranean belongs to the Ottomans.' },
  { year: 1574, title: 'Tunis Falls Permanently', territory: 'tunis',
    story: 'After decades of see-sawing, Uluç Ali Pasha (Kılıç Ali) — an Italian-born convert who rose from galley slave to Grand Admiral — finally secures Tunis for the Ottoman Empire. The Hafsid dynasty is extinguished. Spanish garrisons at La Goletta and the fort of Tunis are destroyed. Ottoman suzerainty now extends the entire North African coast east of Morocco.',
    keyFact: 'A former galley slave conquered Tunis for the sultan.' },
  { year: 1578, title: 'Battle of the Three Kings', territory: 'morocco',
    story: 'Three kings die on one battlefield. The deposed Moroccan sultan al-Mutawakkil allies with Portugal\'s King Sebastian against his uncle Abd al-Malik (installed with Ottoman help). Abd al-Malik\'s army — equipped with Ottoman weapons, trained by Turkish officers — destroys the Portuguese force near Ksar el-Kebir. All three rulers die: Sebastian in battle, al-Mutawakkil drowning in the river, Abd al-Malik from illness during the fighting. His brother Ahmad al-Mansur takes the throne and keeps Morocco independent.',
    keyFact: 'Three kings died. Morocco survived. Portugal didn\'t.' },
  { year: 1627, title: 'The Corsair Republic of Salé', territory: 'morocco',
    story: 'Expelled Moriscos from Spain establish the Republic of Bou Regreg — an autonomous corsair state at Rabat-Salé. Not Ottoman, not Saadian. The Morisco captains raid European shipping as retaliation for the Reconquista. England, France, and the Netherlands send ambassadors. The republic exists until 1668, when the Alaouite sultan Moulay Rashid absorbs it.',
    keyFact: 'An independent pirate republic — built by Spain\'s expelled Muslims.' },
  { year: 1689, title: 'Algiers Becomes a Deylik', territory: 'algiers',
    story: 'The janissary garrison in Algiers rebels against the Ottoman governor. They install one of their own officers as dey — a military ruler elected by his peers. Istanbul accepts the fait accompli. The Regency of Algiers becomes a de facto military republic: the dey runs the state, corsair revenues fund it, and Istanbul\'s authority is nominal.',
    keyFact: 'The janissaries fired their governor and elected their own.' },
  { year: 1705, title: 'Husaynid Dynasty in Tunis', territory: 'tunis',
    story: 'Al-Husayn I ibn Ali, an Ottoman cavalry officer, seizes power after repelling an Algerian invasion. He founds the Husaynid dynasty of beys. They recognize Ottoman religious authority but govern independently — collecting taxes, managing trade, conducting diplomacy. The dynasty rules until the French protectorate (1881) and the monarchy\'s abolition (1957).',
    keyFact: 'Tunis: Ottoman in name, independent in practice.' },
  { year: 1711, title: 'Karamanli Dynasty in Tripoli', territory: 'tripoli',
    story: 'Ahmad Karamanli — a Turkish military officer — assassinates the Ottoman governor and seizes power. Istanbul eventually recognizes his dynasty. The Karamanlis rule Tripoli autonomously for 124 years, controlling the trans-Saharan slave trade and launching corsair raids that provoke the First Barbary War with the infant United States (1801–1805). Direct Ottoman rule reimposed in 1835.',
    keyFact: 'The dynasty that started America\'s first overseas war.' },
  { year: 1798, title: 'Napoleon in Egypt', territory: 'egypt',
    story: 'Napoleon Bonaparte invades Egypt with 36,000 troops, claiming to liberate it from the Mamluks. He defeats them at the Battle of the Pyramids but is stranded when Nelson destroys his fleet at the Battle of the Nile. The French are expelled by Anglo-Ottoman forces in 1801. The chaos that follows allows Muhammad Ali Pasha — an Albanian officer — to seize power in 1805 and build a quasi-independent state.',
    keyFact: 'Napoleon arrived. Nelson trapped him. An Albanian took Egypt.' },
  { year: 1830, title: 'France Takes Algiers', territory: 'algiers',
    story: 'A dispute over unpaid debts from the Napoleonic Wars leads to the French invasion. The official cause: the dey of Algiers struck the French consul with a fly whisk. The real cause: French domestic politics and imperial ambition. The invasion takes 21 days. Three centuries of the Regency of Algiers ends. 132 years of French colonial rule begins — among the most brutal in African history.',
    keyFact: 'A fly whisk started 132 years of colonialism.' },
  { year: 1881, title: 'France Takes Tunis', territory: 'tunis',
    story: 'France imposes a protectorate on the Husaynid bey of Tunis, using the pretext of cross-border tribal raids from Tunisia into French Algeria. The Treaty of Bardo strips Tunisia of sovereignty. The bey remains as figurehead. The Husaynid dynasty survives — powerless — until independence in 1956.',
    keyFact: 'The bey signed away his country in a single treaty.' },
  { year: 1911, title: 'Italy Takes Libya', territory: 'tripoli',
    story: 'Italy invades Ottoman Libya in the Italo-Turkish War. The Ottomans, unable to send reinforcements by sea (the Italians control the Mediterranean) or land (through British-controlled Egypt), lose their last African territory. Italian colonization is savage — concentration camps, mass executions, poison gas. Libya becomes independent in 1951.',
    keyFact: 'The last Ottoman territory in Africa. Lost in 1911.' },
]

// ═══ HOOKS ═══
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
function OttomanMap({ selectedCity, onSelectCity, terrFilter }: {
  selectedCity: number | null; onSelectCity: (i: number) => void; terrFilter: Territory | null
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
      center: [15, 33], zoom: 3.8, accessToken: MAPBOX_TOKEN, attributionControl: false,
    })
    m.addControl(new mapboxgl.NavigationControl(), 'top-right')
    m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    m.on('load', () => {
      CITIES.forEach((c, i) => {
        const el = document.createElement('div')
        const meta = TERRITORY_META[c.territory]
        const isCapital = c.role.includes('Capital') || c.name === 'Istanbul'
        const size = isCapital ? 14 : c.name === 'Istanbul' ? 16 : 9
        const shape = c.territory === 'morocco' ? '2px' : '50%'
        el.style.cssText = `width:${size}px;height:${size}px;background:${meta.color};border:2px solid ${meta.color};border-radius:${shape};cursor:pointer;transition:all 0.3s;box-shadow:0 1px 4px rgba(0,0,0,0.25);`
        el.title = c.name
        el.addEventListener('click', () => onSelectCity(i))
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)' })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
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
      const visible = !terrFilter || CITIES[i].territory === terrFilter
      marker.getElement().style.opacity = visible ? '1' : '0.12'
    })
  }, [terrFilter])

  useEffect(() => {
    if (selectedCity !== null && map.current) {
      const c = CITIES[selectedCity]
      map.current.flyTo({ center: [c.lng, c.lat], zoom: c.name === 'Istanbul' ? 8 : 9, duration: 1000 })
      markersRef.current.forEach((marker, i) => { marker.getElement().style.transform = i === selectedCity ? 'scale(2)' : 'scale(1)' })
    }
  }, [selectedCity])

  return <div ref={mapContainer} className="w-full rounded-sm" style={{ height: '520px' }} />
}

// ═══ PAGE ═══
export function OttomanNorthAfricaContent() {
  const [selectedCity, setSelectedCity] = useState<number | null>(null)
  const [terrFilter, setTerrFilter] = useState<Territory | null>(null)
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const heroR = useReveal()

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('mapbox-gl-ottoman')) {
      const link = document.createElement('link'); link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
      document.head.appendChild(link)
      const script = document.createElement('script'); script.id = 'mapbox-gl-ottoman'
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.js'
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else { setMapLoaded(true) }
  }, [])

  const selCity = selectedCity !== null ? CITIES[selectedCity] : null

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 066 · Imperial History</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Ottoman Empire<br />in North Africa</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Four regencies, one exception, and the corsairs who ran it all
          </p>
        </div>
        <p className="text-[13px] max-w-[580px] leading-[1.7] mt-6" style={{ color: C.text }}>
          In 1516, two brothers from a Greek island captured Algiers. In 1517, an Ottoman
          sultan destroyed the Mamluk Sultanate and took Egypt. Within sixty years, the
          Ottoman Empire controlled the entire North African coast from the Nile to the
          Atlantic — except Morocco. The three Barbary Regencies of Algiers, Tunis,
          and Tripoli were nominally Ottoman provinces, but in practice they were
          semi-autonomous corsair states that elected their own rulers, raided European
          shipping, and conducted independent diplomacy. Istanbul collected tribute and
          provided legitimacy. The corsairs provided everything else. Morocco — protected
          by the <span className="underline underline-offset-2">Atlas Mountains</span>, the <span className="underline underline-offset-2">Saadian</span> dynasty&apos;s gunpowder army, and the religious
          authority of its sharifian sultans — remained the only North African state the
          Ottomans never conquered. The empire held its African territories for three
          centuries until European powers stripped them away: France took Algiers (1830),
          then Tunis (1881). Italy took Libya (1911). Egypt was already lost to Britain.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
          {[
            { v: '1516', l: 'Algiers captured', c: C.algiers },
            { v: '1517', l: 'Egypt conquered', c: C.egypt },
            { v: '1574', l: 'Tunis secured', c: C.tunis },
            { v: '1911', l: 'Libya lost to Italy', c: C.tripoli },
            { v: 'Never', l: 'Morocco stayed free', c: C.morocco },
          ].map((n, i) => (
            <div key={i} className="transition-all duration-700" style={{ opacity: heroR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}><span className="text-[24px] font-bold">{n.v}</span></p>
              <p className="font-mono text-[9px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.ottoman }}>Ottoman North Africa · Territories & Cities</p>
          <p className="text-[12px] mb-4" style={{ color: C.muted }}>Click any city. Squares = independent Morocco. Circles = Ottoman territories.</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button onClick={() => setTerrFilter(null)}
              className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono transition-all"
              style={{ background: !terrFilter ? C.ink : 'transparent', color: !terrFilter ? 'white' : C.muted, border: `1px solid ${!terrFilter ? C.ink : C.border}` }}>
              All
            </button>
            {(Object.keys(TERRITORY_META) as Territory[]).map(t => (
              <button key={t} onClick={() => setTerrFilter(terrFilter === t ? null : t)}
                className="px-2.5 py-1 text-[9px] tracking-wider font-mono transition-all"
                style={{ background: terrFilter === t ? TERRITORY_META[t].color : 'transparent', color: terrFilter === t ? 'white' : TERRITORY_META[t].color, border: `1px solid ${terrFilter === t ? TERRITORY_META[t].color : `${TERRITORY_META[t].color}40`}` }}>
                {TERRITORY_META[t].label}
              </button>
            ))}
          </div>
          <div className="relative">
            {mapLoaded && <OttomanMap selectedCity={selectedCity} onSelectCity={setSelectedCity} terrFilter={terrFilter} />}
            {selCity && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[400px] p-5 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg max-h-[320px] overflow-y-auto"
                style={{ borderLeft: `3px solid ${TERRITORY_META[selCity.territory].color}` }}>
                <button onClick={() => setSelectedCity(null)} className="absolute top-3 right-3 text-[11px] hover:opacity-60" style={{ color: C.muted }}>&#x2715;</button>
                <span className="inline-block px-2 py-0.5 text-[8px] uppercase tracking-wider font-mono mb-2"
                  style={{ background: `${TERRITORY_META[selCity.territory].color}12`, color: TERRITORY_META[selCity.territory].color }}>
                  {TERRITORY_META[selCity.territory].label} · {TERRITORY_META[selCity.territory].dates}
                </span>
                <h3 className="font-serif text-[20px] leading-tight">{selCity.name}</h3>
                <p className="font-mono text-[10px] mt-1 italic" style={{ color: C.muted }}>{selCity.role}</p>
                <p className="text-[12px] mt-3 leading-[1.6]" style={{ color: C.text }}>{selCity.story}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ TERRITORY CARDS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: C.ottoman }}>Five Territories · One Empire</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {(Object.keys(TERRITORY_META) as Territory[]).map(t => {
              const m = TERRITORY_META[t]
              return (
                <div key={t} className="p-4" style={{ borderLeft: `3px solid ${m.color}` }}>
                  <p className="font-serif text-[14px] leading-tight">{m.label}</p>
                  <p className="font-mono text-[10px] mt-1 font-bold" style={{ color: m.color }}>{m.dates}</p>
                  <p className="font-mono text-[9px] mt-2 leading-[1.5]" style={{ color: C.muted }}>{m.status}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: C.ottoman }}>Timeline · 1516–1911</p>
          <div className="space-y-0">
            {TIMELINE.map((ev, i) => {
              const isExpanded = expandedPhase === i
              const evColor = ev.territory === 'ottoman' ? C.ottoman : TERRITORY_META[ev.territory as Territory]?.color ?? C.ottoman
              return (
                <button key={i} onClick={() => setExpandedPhase(isExpanded ? null : i)} className="w-full text-left transition-all duration-300">
                  <div className="flex gap-4 py-2.5 border-b" style={{ borderColor: C.border, borderLeftWidth: isExpanded ? '3px' : '0', borderLeftColor: evColor, paddingLeft: isExpanded ? '12px' : '0' }}>
                    <div className="shrink-0 w-[44px]">
                      <p className="font-mono text-[13px] font-bold" style={{ color: evColor }}>{ev.year}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[14px]">{ev.title}</p>
                      {isExpanded && (
                        <div className="mt-2">
                          <p className="text-[12px] leading-[1.65]" style={{ color: C.text }}>{ev.story}</p>
                          <p className="font-mono text-[10px] mt-2 italic" style={{ color: evColor }}>{ev.keyFact}</p>
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
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.ottoman }}>Reading Notes</p>
          <div className="space-y-6 text-[12px] leading-[1.7] max-w-[600px]" style={{ color: C.text }}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The corsair system</p>
              <p>The Ottoman Empire did not govern North Africa the way it governed the Balkans or Anatolia. The three Barbary Regencies — Algiers, Tunis, Tripoli — were corsair states first and Ottoman provinces second. Revenue came from raiding European shipping: capturing vessels, seizing cargo, and ransoming crews. At its peak in the 17th century, Algiers alone held an estimated 25,000 Christian captives. European powers signed treaties directly with the deys and beys, not with Istanbul. England, France, and the Netherlands all maintained consuls whose primary job was negotiating the release of prisoners.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>Why Morocco survived</p>
              <p>Four reasons. Geography: the Atlas Mountains and the Moulouya River created a natural defensive barrier. Military capability: the Saadians had gunpowder armies of their own, trained and equipped on Ottoman lines. Religious legitimacy: Morocco&apos;s sultans were sharifs — descendants of the Prophet Muhammad — giving them a spiritual authority the Ottoman sultan could not match in the western Maghreb. And diplomatic skill: Ahmad al-Mansur played Ottoman, Spanish, and English interests against each other, maintaining alliances with all while submitting to none.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The autonomy gradient</p>
              <p>Ottoman control was strongest in Egypt (direct governor, janissary garrison, regular tax remittance) and weakest at the western edge. Algiers elected its own ruler from 1689. Tunis was governed by a hereditary dynasty from 1705. Tripoli had its own dynasty from 1711. By the 18th century, all three regencies were independent in everything except the Friday prayer, which was still recited in the sultan&apos;s name. The Ottoman Empire in North Africa was less an empire than a franchise.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The Barbarossa brothers</p>
              <p>Oruç and Hayreddin Reis — sons of an Ottoman sipahi father and a Greek mother on the island of Lesbos — built the entire western Ottoman naval system. Oruç was captured by the Knights of St. John and spent three years chained to an oar before being ransomed. He and Hayreddin moved west, became corsair captains, captured Algiers, and established the base that would anchor Ottoman power in the Mediterranean for three centuries. Hayreddin was later appointed Kapudan Pasha (Grand Admiral) of the entire Ottoman fleet — a Greek-born corsair commanding the world&apos;s most powerful navy.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The end</p>
              <p>European imperialism dismantled the system. France took Algiers in 1830 (ostensibly over a fly whisk). France took Tunis in 1881 (ostensibly over a border raid). Britain controlled Egypt from 1882. Italy took Libya in 1911. In each case, the Ottoman Empire was too weak to defend its African territories. The map of modern North Africa — four independent states where there were once four Ottoman provinces, plus Morocco, which was never conquered — still reflects the boundaries the corsairs drew.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sources: Abun-Nasr, Jamil M. <em>A History of the Maghrib in the Islamic Period</em>. Cambridge University Press, 1987.
            Hess, Andrew C. <em>The Forgotten Frontier: A History of the Sixteenth-Century Ibero-African Frontier</em>. University of Chicago Press, 1978.
            Faroqhi, Suraiya. <em>The Ottoman Empire and the World Around It</em>. I.B. Tauris, 2004.
            Wikipedia: &quot;Regency of Algiers,&quot; &quot;Ottoman Tunisia,&quot; &quot;Ottoman wars in Africa,&quot; &quot;Ottoman Egypt,&quot; &quot;Battle of Alcácer Quibir,&quot; &quot;Capture of Fez (1576),&quot; &quot;Battle of Djerba.&quot;
            Britannica: &quot;North Africa — Political Fragmentation,&quot; &quot;Egypt — The Ottomans 1517–1798,&quot; &quot;Ottoman Empire — Selim I.&quot;
            EBSCO Research Starters: &quot;Ottoman Suzerainty.&quot;
            Fanack: &quot;Tunisia: The Ottomans of Africa.&quot;
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
