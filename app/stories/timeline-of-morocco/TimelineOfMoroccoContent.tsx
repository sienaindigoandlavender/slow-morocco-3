'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  bone: '#B8A280', phoenician: '#8B5E3C', roman: '#7A3B2E', islamic: '#2D6E4F',
  almoravid: '#8B6E4E', almohad: '#C8A415', marinid: '#4A6B8A', saadian: '#C54B3C',
  alaouite: '#722F37', colonial: '#5A5A5A', modern: '#1A6B4A', amazigh: '#A0846B',
}

function useReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

interface TimelineEvent {
  year: string; label: string; era: string; color: string
  detail: string; landmark?: string
}

const EVENTS: TimelineEvent[] = [
  // ═══ PREHISTORY ═══
  { year: '~315,000 BCE', label: 'Jebel Irhoud: Oldest Homo sapiens', era: 'Prehistory', color: C.bone,
    detail: 'Fossils of at least five individuals — skulls, jaws, teeth, limb bones — discovered 100 km west of Marrakech. Dated to 315,000 ± 34,000 years ago by thermoluminescence. Modern face, elongated braincase. Pushes the origin of our species back 100,000 years. Published in Nature, 2017, by Jean-Jacques Hublin (Max Planck) and Abdelouahed Ben-Ncer (INSAP, Rabat). Morocco shifts from "backwater" to centre of human origins.',
    landmark: 'Jebel Irhoud cave, nr. Safi' },
  { year: '~82,000 BCE', label: 'Grotte des Pigeons: Earliest jewellery', era: 'Prehistory', color: C.bone,
    detail: 'Perforated Nassarius shell beads found at Taforalt (eastern Morocco). Among the oldest known personal ornaments — evidence of symbolic thinking and social identity among early humans.',
    landmark: 'Taforalt, Berkane Province' },
  { year: '~15,000 BCE', label: 'Iberomaurusian culture', era: 'Prehistory', color: C.bone,
    detail: 'Hunter-gatherer culture spanning the Maghreb. Stone microliths, complex burial practices. The Iberomaurusians may be ancestors of modern Amazigh (Berber) populations. Genetic studies show deep continuity in North Africa.' },
  { year: '~5,000 BCE', label: 'Amazigh tribal consolidation', era: 'Prehistory', color: C.amazigh,
    detail: 'Saharan, Mediterranean, and indigenous peoples merge into the Amazigh (Berber) tribal confederations. Rock art in the Atlas and pre-Sahara. Pastoralism and early agriculture. Tifinagh script develops — one of the oldest writing systems in Africa.' },

  // ═══ ANCIENT ═══
  { year: '~1000 BCE', label: 'Phoenician trading posts', era: 'Phoenician & Carthaginian', color: C.phoenician,
    detail: 'Phoenicians from the eastern Mediterranean establish trading posts along the Atlantic and Mediterranean coasts: Lixus (near Larache), Mogador (Essaouira), Tingis (Tangier), Rusaddir (Melilla). They call the inland people "barbaroi" — not our people — later rendered as "Berber."',
    landmark: 'Lixus, near Larache' },
  { year: '~500 BCE', label: 'Carthaginian hegemony', era: 'Phoenician & Carthaginian', color: C.phoenician,
    detail: 'Carthage extends control over Moroccan coastal cities. The Voyage of Hanno the Navigator explores the Atlantic coast of Africa, possibly as far as modern Cameroon. Interior remains under Amazigh kings.' },
  { year: '~300 BCE', label: 'Kingdom of Mauretania', era: 'Phoenician & Carthaginian', color: C.phoenician,
    detail: 'Indigenous Amazigh kings establish the Kingdom of Mauretania. Not to be confused with modern Mauritania — the name covers roughly present-day Morocco and western Algeria. A Berber state with Carthaginian and Hellenistic cultural influences.' },

  // ═══ ROMAN ═══
  { year: '25 BCE', label: 'Juba II: Rome\'s Berber king', era: 'Roman', color: C.roman,
    detail: 'Rome appoints Juba II, a Romanised Berber educated in Rome, as client king of Mauretania. He marries Cleopatra Selene II — daughter of Cleopatra and Mark Antony. Capital at Volubilis. Roman roads, vineyards, olive oil, and Christianity arrive.',
    landmark: 'Volubilis, near Meknès' },
  { year: '40 CE', label: 'Mauretania Tingitana: Roman province', era: 'Roman', color: C.roman,
    detail: 'Emperor Caligula assassinates Ptolemy of Mauretania (Juba II\'s son). Morocco becomes the Roman province of Mauretania Tingitana with capital at Tingis (Tangier). Volubilis flourishes — mosaics, basilica, triumphal arch. Roman control extends roughly to the line of Rabat.',
    landmark: 'Volubilis (UNESCO)' },
  { year: '~200 CE', label: 'Roman influence fades', era: 'Roman', color: C.roman,
    detail: 'Berber rebellions and imperial overstretch erode Roman control. By the 3rd century, Rome retreats to the coastal cities. The interior returns to Amazigh tribal governance. Christianity persists in some urban communities.' },
  { year: '429 CE', label: 'Vandals arrive', era: 'Roman', color: C.roman,
    detail: 'Germanic Vandals cross from Spain, sweeping along the coast. They hold the ports briefly. In 533 CE, the Byzantines expel the last Vandals, but Morocco remains largely controlled by local Berber tribes. The Roman and Vandal periods leave thin archaeological traces compared to the deep Amazigh substrate.' },

  // ═══ ISLAMIC DYNASTIES ═══
  { year: '682 CE', label: 'Arab armies reach Morocco', era: 'Early Islamic', color: C.islamic,
    detail: 'Uqba ibn Nafi leads the Umayyad conquest across North Africa. According to tradition, he rides his horse into the Atlantic at the coast, declaring he has reached the end of the land. Berber tribes resist but are gradually Islamised. Arabic becomes the language of religion and administration; Amazigh languages persist in mountains and countryside.' },
  { year: '740 CE', label: 'Great Berber Revolt', era: 'Early Islamic', color: C.islamic,
    detail: 'Amazigh tribes rebel against the Umayyad Caliphate, rejecting Arab ethnic supremacy within Islam. Morocco breaks free from eastern caliphate control. For 50 years, the region is a patchwork of Berber kingdoms — a prelude to the first Moroccan state.' },
  { year: '788 CE', label: 'Idrisid dynasty: Morocco is born', era: 'Idrisid (788–974)', color: C.islamic,
    detail: 'Idris I, a descendant of Prophet Muhammad, flees Abbasid persecution and is proclaimed king by Berber tribes near Volubilis. He founds the first unified Moroccan state. Murdered in 791, poisoned by an Abbasid agent. His son Idris II founds Fes (809 CE) and makes it the capital.',
    landmark: 'Moulay Idriss Zerhoun / Fes' },
  { year: '859 CE', label: 'Al-Qarawiyyin founded', era: 'Idrisid (788–974)', color: C.islamic,
    detail: 'Fatima al-Fihri, a woman from a wealthy family, founds the Al-Qarawiyyin mosque and university in Fes. It becomes one of the leading spiritual and educational centres of the Islamic world. UNESCO and Guinness recognise it as the oldest existing, continually operating educational institution in the world.',
    landmark: 'Fes Medina (UNESCO)' },
  { year: '1062', label: 'Almoravids found Marrakech', era: 'Almoravid (1040–1147)', color: C.almoravid,
    detail: 'The Almoravids — Sanhaja Berber warriors from the Sahara, led by Yusuf ibn Tashfin — unite Morocco and found Marrakech as their capital. Their empire stretches from Senegal to Zaragoza in Spain. A strict Sunni reformist movement. Marrakech becomes a crossroads of Saharan gold, Andalusian art, and Amazigh identity.',
    landmark: 'Marrakech (Almoravid Qubba)' },
  { year: '1147', label: 'Almohad dynasty rises', era: 'Almohad (1147–1269)', color: C.almohad,
    detail: 'The Almohads — Masmuda Berbers from the High Atlas, led by Ibn Tumart and then Abd al-Mu\'min — defeat the Almoravids. They build an empire spanning Morocco, Algeria, Tunisia, Libya, and Al-Andalus. A golden age of architecture: the Koutoubia Mosque (Marrakech), Hassan Tower (Rabat), and the Giralda (Seville). Rabat becomes the royal capital.',
    landmark: 'Koutoubia / Hassan Tower' },
  { year: '1212', label: 'Battle of Las Navas de Tolosa', era: 'Almohad (1147–1269)', color: C.almohad,
    detail: 'A coalition of Christian kingdoms defeats the Almohads in Spain. The battle marks the beginning of the end for Muslim rule in Iberia. The Almohad empire fractures — Hafsids in Tunisia, Zayyanids in Algeria break away. Morocco\'s golden age begins to dim.' },
  { year: '1269', label: 'Marinid dynasty takes power', era: 'Marinid (1269–1465)', color: C.marinid,
    detail: 'The Marinids — Zenata Berbers — overthrow the last Almohad ruler. They restore Fes as capital and become great patrons of art, education, and architecture. They build the Bou Inania and Al-Attarine madrasas — among the finest in the Islamic world. However, they fail to reconquer Spain and never match Almohad territorial reach.',
    landmark: 'Bou Inania Madrasa, Fes' },
  { year: '~1325', label: 'Ibn Battuta departs Tangier', era: 'Marinid (1269–1465)', color: C.marinid,
    detail: 'The Moroccan explorer Ibn Battuta leaves Tangier aged 21 for a pilgrimage to Mecca. He doesn\'t return for 24 years. His Rihla records travels across 44 modern countries — 120,000 km. The greatest traveller of the medieval world, born in Morocco.',
    landmark: 'Tangier' },
  { year: '1472', label: 'Wattasid dynasty', era: 'Wattasid (1472–1554)', color: C.marinid,
    detail: 'The Wattasids — a Marinid branch — take formal control but preside over a weakened, fragmented state. Portuguese capture coastal cities: Ceuta (1415), Tangier (1471), Agadir (1505), Essaouira (1506). Spain takes Melilla (1497). Morocco is squeezed between European colonisers and internal tribal rivalries.' },
  { year: '1525', label: 'Saadian dynasty rises', era: 'Saadian (1549–1659)', color: C.saadian,
    detail: 'The Saadians — Arab sharifs from the Draa Valley — rally resistance against the Portuguese. They capture Marrakech (1525), then Fes (1548), unifying the country. They are the first Arab (non-Berber) dynasty to rule Morocco, claiming descent from the Prophet Muhammad.',
    landmark: 'Saadian Tombs, Marrakech' },
  { year: '1578', label: 'Battle of the Three Kings', era: 'Saadian (1549–1659)', color: C.saadian,
    detail: 'At Ksar el-Kebir, the Saadian sultan Ahmad al-Mansur defeats a Portuguese invasion force. Three kings die in battle — including King Sebastian of Portugal, whose death triggers a succession crisis that leads to Spain annexing Portugal. Morocco becomes the most powerful state in the western Mediterranean.',
    landmark: 'Ksar el-Kebir' },
  { year: '1578–1603', label: 'Ahmad al-Mansur: The Golden One', era: 'Saadian (1549–1659)', color: C.saadian,
    detail: 'Al-Mansur ("The Victorious") builds the El Badi Palace in Marrakech — "The Incomparable" — using Carrara marble and Sudanese gold. He conquers the Songhai Empire in Mali, controlling trans-Saharan gold routes. Morocco reaches its zenith of wealth and diplomatic reach — exchanging ambassadors with Elizabeth I of England.',
    landmark: 'El Badi Palace, Marrakech' },
  { year: '1660', label: 'Alaouite dynasty begins', era: 'Alaouite (1660–present)', color: C.alaouite,
    detail: 'The Alaouites — sharifs from Tafilalet, descended from the Prophet Muhammad — rise to power after Saadian collapse. They are invited by the people of Fes to restore order. The Alaouite dynasty has ruled Morocco continuously for over 360 years — the longest-reigning dynasty in the Islamic world.',
    landmark: 'Tafilalet / Rissani' },
  { year: '1672–1727', label: 'Moulay Ismail: The Warrior Sultan', era: 'Alaouite (1660–present)', color: C.alaouite,
    detail: 'Moulay Ismail builds Meknès into a rival to Versailles — miles of walls, vast stables for 12,000 horses, and a palace complex unmatched in North Africa. He creates a 150,000-strong army of enslaved sub-Saharan Africans (the Black Guard). Brutal but effective, he recaptures Tangier from England (1684), Larache and Asilah from Spain. Corresponds with Louis XIV.',
    landmark: 'Meknès (UNESCO)' },
  { year: '1757–1790', label: 'Sultan Mohammed III: Diplomacy', era: 'Alaouite (1660–present)', color: C.alaouite,
    detail: 'Mohammed III opens Morocco to European trade, rebuilds Essaouira as a model port city (designed by French architect Cornut), and becomes the first head of state to recognise the United States of America (1777). The Moroccan-American Treaty of Friendship (1786) is the longest unbroken treaty in U.S. history.',
    landmark: 'Essaouira (UNESCO)' },

  // ═══ COLONIAL ERA ═══
  { year: '1860', label: 'Spain invades northern Morocco', era: 'Colonial Pressure', color: C.colonial,
    detail: 'The Hispano-Moroccan War. Spain defeats Morocco at the Battle of Tétouan. European powers begin to carve up North Africa. Morocco loses territorial sovereignty incrementally over the next 50 years.' },
  { year: '1906', label: 'Algeciras Conference', era: 'Colonial Pressure', color: C.colonial,
    detail: 'European powers meet in Spain to decide Morocco\'s fate — without Morocco at the table. France and Spain are given police and financial control. Germany objects, triggering the First and Second Moroccan Crises. Morocco becomes a flashpoint for European imperial rivalry.' },
  { year: '1912', label: 'Treaty of Fes: French Protectorate', era: 'Colonial (1912–1956)', color: C.colonial,
    detail: 'Sultan Abdelhafid signs the Treaty of Fes under French pressure. Morocco becomes a Franco-Spanish protectorate. France controls the centre and south; Spain the north (Rif) and far south (Ifni, Sahara). Tangier becomes an international zone. Rabat is made capital. Marshal Lyautey builds the "new cities" — Ville Nouvelles — beside the medinas.',
    landmark: 'Rabat (administrative capital)' },
  { year: '1921–1926', label: 'Rif War: Abd el-Krim', era: 'Colonial (1912–1956)', color: C.colonial,
    detail: 'Abd el-Krim, an Amazigh leader from the Rif, inflicts a devastating defeat on Spain at the Battle of Annual (1921) — 8,000 Spanish soldiers killed. He declares the Republic of the Rif. It takes a combined Franco-Spanish force of 250,000 troops using chemical weapons to defeat him (1926). Abd el-Krim becomes an icon of anti-colonial resistance worldwide.',
    landmark: 'The Rif, northern Morocco' },
  { year: '1944', label: 'Independence Manifesto', era: 'Colonial (1912–1956)', color: C.colonial,
    detail: 'Moroccan nationalists publish the Istiqlal (Independence) Party manifesto, demanding full sovereignty. Sultan Mohammed V supports the movement — aligning the monarchy with popular independence aspirations.' },
  { year: '1953', label: 'Mohammed V exiled', era: 'Colonial (1912–1956)', color: C.colonial,
    detail: 'France exiles Sultan Mohammed V to Corsica, then Madagascar, replacing him with the compliant Mohammed Ben Aarafa. The exile backfires: it galvanises the independence movement. Moroccans rally around Mohammed V as a national hero.' },
  { year: '1956', label: 'Independence', era: 'Independent Morocco', color: C.modern,
    detail: 'Morocco regains independence on March 2, 1956 (from France) and April 7, 1956 (from Spain). Mohammed V returns as king. Tangier\'s international status is dissolved. Morocco is unified — except for Ceuta, Melilla (still Spanish), and the Saharan territories (still contested). A new chapter begins.',
    landmark: 'Rabat (capital)' },

  // ═══ MODERN ═══
  { year: '1961', label: 'Hassan II becomes king', era: 'Independent Morocco', color: C.modern,
    detail: 'Mohammed V dies during minor surgery; his son Hassan II ascends the throne at age 32. He will rule for 38 years — a period of authoritarian control, political repression (the "Years of Lead"), economic modernisation, and the Green March into Western Sahara.' },
  { year: '1975', label: 'The Green March', era: 'Independent Morocco', color: C.modern,
    detail: '350,000 unarmed Moroccan civilians march into Spanish Sahara, forcing Spain to withdraw. Morocco claims the territory. The Polisario Front, backed by Algeria, contests the claim. The Western Sahara conflict remains unresolved — one of Africa\'s longest-running territorial disputes.' },
  { year: '1999', label: 'Mohammed VI: A new era', era: 'Independent Morocco', color: C.modern,
    detail: 'Hassan II dies; his son Mohammed VI becomes king at 36. He initiates reforms: the Mudawwana (family code) expanding women\'s rights (2004), the Equity and Reconciliation Commission acknowledging past abuses, and a new constitution (2011) after the Arab Spring. Morocco modernises while maintaining monarchy.' },
  { year: '2011', label: 'Constitutional reform', era: 'Independent Morocco', color: C.modern,
    detail: 'Following the Arab Spring protests (the February 20 Movement), Mohammed VI proposes a new constitution. Voters approve it with 98% support. It recognises Amazigh as an official language alongside Arabic — a historic acknowledgment of Morocco\'s Berber identity after decades of marginalisation.' },
  { year: '2018', label: 'Al Boraq: Africa\'s first high-speed rail', era: 'Independent Morocco', color: C.modern,
    detail: 'The Al Boraq high-speed train inaugurated between Tangier and Casablanca — Africa\'s first and only HSR. Tangier–Casa in 2h10. Morocco positions itself as a continental infrastructure leader. Extension to Marrakech under construction for the 2030 World Cup.',
    landmark: 'Tangier–Casablanca' },
  { year: '2030', label: 'FIFA World Cup (with Spain & Portugal)', era: 'Independent Morocco', color: C.modern,
    detail: 'Morocco co-hosts the FIFA World Cup — the first African nation to host since South Africa 2010. Games in Casablanca (new 115,000-seat stadium), Rabat, Tangier, Marrakech, Fes, and Agadir. The Kenitra–Marrakech HSR extension targets completion for the tournament. A century after colonial exploitation, Morocco stands on the global stage.' },
]

// ═══ ERA GROUPING ═══
const ERA_COLORS: Record<string, string> = {
  'Prehistory': C.bone, 'Phoenician & Carthaginian': C.phoenician, 'Roman': C.roman,
  'Early Islamic': C.islamic, 'Idrisid (788–974)': C.islamic, 'Almoravid (1040–1147)': C.almoravid,
  'Almohad (1147–1269)': C.almohad, 'Marinid (1269–1465)': C.marinid, 'Wattasid (1472–1554)': C.marinid,
  'Saadian (1549–1659)': C.saadian, 'Alaouite (1660–present)': C.alaouite,
  'Colonial Pressure': C.colonial, 'Colonial (1912–1956)': C.colonial, 'Independent Morocco': C.modern,
}

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const r = useReveal(0.1)
  const isLeft = index % 2 === 0

  return (
    <div ref={r.ref}
      className="relative grid gap-4 mb-1 transition-all duration-700"
      style={{
        gridTemplateColumns: 'minmax(0, 1fr) 40px minmax(0, 1fr)',
        opacity: r.vis ? 1 : 0,
        transform: r.vis ? 'translateY(0)' : 'translateY(16px)',
      }}>
      {/* LEFT SIDE */}
      <div className={`flex ${isLeft ? 'justify-end' : ''}`}>
        {isLeft ? (
          <CardContent event={event} expanded={expanded} onToggle={() => setExpanded(!expanded)} align="right" />
        ) : (
          <div className="flex items-start justify-end pt-1">
            <span className="font-mono text-[11px] font-bold text-right" style={{ color: event.color }}>
              {event.year}
            </span>
          </div>
        )}
      </div>

      {/* SPINE */}
      <div className="flex flex-col items-center">
        <div className="w-px flex-1" style={{ background: `${event.color}30` }} />
        <div className="w-3 h-3 rounded-full border-2 shrink-0 my-0.5"
          style={{ borderColor: event.color, background: expanded ? event.color : 'white' }} />
        <div className="w-px flex-1" style={{ background: `${event.color}30` }} />
      </div>

      {/* RIGHT SIDE */}
      <div className={`flex ${!isLeft ? 'justify-start' : ''}`}>
        {!isLeft ? (
          <CardContent event={event} expanded={expanded} onToggle={() => setExpanded(!expanded)} align="left" />
        ) : (
          <div className="flex items-start pt-1">
            <span className="font-mono text-[11px] font-bold" style={{ color: event.color }}>
              {event.year}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function CardContent({ event, expanded, onToggle, align }: {
  event: TimelineEvent; expanded: boolean; onToggle: () => void; align: 'left' | 'right'
}) {
  return (
    <div className={`max-w-[380px] cursor-pointer group ${align === 'right' ? 'text-right' : 'text-left'}`}
      onClick={onToggle}>
      <p className="font-mono text-[11px] font-bold mb-0.5" style={{ color: event.color }}>
        {event.year}
      </p>
      <p className="font-mono text-[12px] font-bold leading-[1.3] group-hover:underline mb-1" style={{ color: C.ink }}>
        {event.label}
      </p>
      <p className="font-mono text-[9px] uppercase tracking-[0.1em] mb-1" style={{ color: C.muted }}>
        {event.era}
      </p>
      {expanded && (
        <div className="mt-2">
          <p className="text-[11px] leading-[1.65]" style={{ color: C.text, textAlign: 'left' }}>
            {event.detail}
          </p>
          {event.landmark && (
            <p className="font-mono text-[9px] mt-2 italic" style={{ color: event.color }}>
              {event.landmark}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ═══ PAGE ═══
export function TimelineOfMoroccoContent() {
  const heroR = useReveal()

  // Group events by era for the era markers
  const eras: { name: string; color: string; startIdx: number }[] = []
  let lastEra = ''
  EVENTS.forEach((e, i) => {
    if (e.era !== lastEra) {
      eras.push({ name: e.era, color: ERA_COLORS[e.era] || C.muted, startIdx: i })
      lastEra = e.era
    }
  })

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>
          History · 315,000 years in one vertical line
        </p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.88] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Timeline of Morocco</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.3]" style={{ color: C.muted }}>
            From the first face to the first high-speed train. Every dynasty, every turning point.
          </p>
        </div>

        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          In 2017, a team led by Jean-Jacques Hublin reopened a collapsed cave 100 km west of
          Marrakech. Inside: the oldest known remains of Homo sapiens — <span className="underline underline-offset-2">315,000 years</span> old. Five
          individuals. Modern faces, elongated braincases. Morocco shifted from the margins
          of human origins to the centre. This timeline traces every chapter since: <span className="underline underline-offset-2">Phoenician</span>
          {' '}traders, Roman columns, the birth of the Moroccan state under the Idrisids, the great
          Berber empires, colonial humiliation, and modern renaissance. Click any event to read
          the full story.
        </p>

        {/* Era legend */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-8">
          {eras.map(e => (
            <span key={e.name} className="flex items-center gap-1 font-mono text-[9px]" style={{ color: e.color }}>
              <span className="w-2 h-2 rounded-full" style={{ background: e.color }} />
              {e.name}
            </span>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-20">
        {/* Era section markers + event cards */}
        {EVENTS.map((event, i) => {
          const isNewEra = i === 0 || event.era !== EVENTS[i - 1].era
          return (
            <div key={`${event.year}-${i}`}>
              {isNewEra && (
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px" style={{ background: `${ERA_COLORS[event.era] || C.muted}40` }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-2"
                    style={{ color: ERA_COLORS[event.era] || C.muted }}>
                    {event.era}
                  </span>
                  <div className="flex-1 h-px" style={{ background: `${ERA_COLORS[event.era] || C.muted}40` }} />
                </div>
              )}
              <TimelineCard event={event} index={i} />
            </div>
          )
        })}

        {/* Terminal dot */}
        <div className="flex justify-center mt-4">
          <div className="w-4 h-4 rounded-full" style={{ background: C.modern }} />
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            315,000 years. Eight dynasties. Three colonial powers. One independence.
            The bones at Jebel Irhoud have modern faces and ancient braincases —
            human enough to recognise, old enough to humble. Every empire that
            followed built on what the last one left behind: Roman columns became
            minaret foundations, Almohad walls became Marinid madrasas, colonial
            Ville Nouvelles grew beside medinas that predated them by a thousand
            years. Morocco is not a country with layers. It is the layers.
          </p>
        </div>

        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Jebel Irhoud (315,000 years): Hublin et al., Nature 546 (2017); Max Planck Institute;
            Scientific American; Smithsonian NMNH. Taforalt beads (~82,000 years): Bouzouggar et al.,
            PNAS (2007). Phoenician settlements: UNESCO Lixus documentation; Encyclopaedia Britannica.
            Roman Mauretania Tingitana: UNESCO Volubilis file. Dynastic timeline: Wikipedia "History of
            Morocco"; j2adventures.com/morocco-timeline; BestMoroccoTravel.com; Encyclopaedia Britannica.
            Al-Qarawiyyin (859 CE): UNESCO; Guinness World Records. Ibn Battuta: The Rihla (translated
            by H.A.R. Gibb). Battle of Three Kings (1578): Andrew C. Hess, "The Battle of Lepanto and
            Its Place in Mediterranean History." Green March (1975): BBC News archives. 2011 Constitution:
            Reuters. Al Boraq (2018): ONCF. 2030 World Cup: FIFA.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.modern }}>Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
