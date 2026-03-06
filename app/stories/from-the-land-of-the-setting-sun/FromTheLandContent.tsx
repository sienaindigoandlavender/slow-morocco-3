'use client'

import { useState, useEffect, useRef } from 'react'

// ══════════════════════════════════════════════════
// INLINE DATA
// ══════════════════════════════════════════════════

interface BiblicalName {
  hebrew: string
  transliteration: string
  meaning: string
  modernEquivalent: string
  detail: string
}

const NAMES: BiblicalName[] = [
  { hebrew: 'להָבַים', transliteration: 'Lehabim', meaning: 'Flames / Dry land', modernEquivalent: 'Libyans / Berbers', detail: 'Genesis 10:13. In the Table of Nations, Mizraim (Egypt) fathers the Lehabim. This places them in the genealogy of the world — a people born alongside Egypt, occupying the land to its west. Scholars identify the Lehabim as the ancestors of the Lubim and the modern Amazigh.' },
  { hebrew: 'לוּבִים', transliteration: 'Lubim', meaning: 'Inhabitants of a dry region', modernEquivalent: 'Libyans / Berbers / Tuareg', detail: 'The plural form. They appear as warriors in multiple passages — in Sheshonq\'s army sacking Jerusalem (2 Chronicles 12:3), as allies of Cush (2 Chronicles 16:8), as helpers of Thebes (Nahum 3:9). The Hebrew root derives from a word meaning "to thirst" — desert dwellers. The Egyptian inscriptions call them Rebu or Lebu. The same people.' },
  { hebrew: 'פוּט', transliteration: 'Phut / Put', meaning: 'A bow (weaponry)', modernEquivalent: 'Western North Africa / Berber lands', detail: 'Genesis 10:6. Phut is listed as a son of Ham, brother of Mizraim (Egypt), Cush (Ethiopia), and Canaan. Jeremiah 46:9 and Ezekiel 38:5 reference Put as warriors and shield-bearers. A people defined by their skill in war.' },
]

interface ScriptureRef {
  book: string
  chapter: string
  verse: string
  text: string
  context: string
  era: string
  type: 'warriors' | 'genealogy' | 'prophecy' | 'gospel' | 'early_church'
}

const SCRIPTURES: ScriptureRef[] = [
  { book: 'Genesis', chapter: '10', verse: '6', text: 'The sons of Ham: Cush, Mizraim, Put, and Canaan.', context: 'The Table of Nations. Put — the land west of Egypt — is placed among the founding peoples of the earth. Brother of Egypt and Ethiopia.', era: 'Creation narrative', type: 'genealogy' },
  { book: 'Genesis', chapter: '10', verse: '13', text: 'Mizraim fathered Ludim, Anamim, Lehabim, Naphtuhim...', context: 'The Lehabim — the Lubim — appear in the genealogy of humanity. A people named before Rome, before Greece, before Carthage.', era: 'Creation narrative', type: 'genealogy' },
  { book: '1 Kings', chapter: '14', verse: '25–26', text: 'In the fifth year of King Rehoboam, Shishak king of Egypt came up against Jerusalem. He took away the treasures of the house of the LORD and the treasures of the king\'s house.', context: 'Shishak is Sheshonq I — a Meshwesh Libyan, an Amazigh. He plunders Solomon\'s temple and palace. The treasures of Israel carried to Egypt by a Berber pharaoh.', era: '~925 BCE', type: 'warriors' },
  { book: '2 Chronicles', chapter: '12', verse: '3', text: 'With 1,200 chariots and 60,000 horsemen. And the people were without number who came with him from Egypt — the Lubim, the Sukkiim, and the Cushites.', context: 'The Lubim are named explicitly. They are in the army. They are the warriors from the land west of Egypt — the Maghreb — marching on Jerusalem.', era: '~925 BCE', type: 'warriors' },
  { book: '2 Chronicles', chapter: '16', verse: '8', text: 'Were not the Cushites and the Lubim a huge army with very many chariots and horsemen?', context: 'A reminder of the Lubim\'s military power. A "huge army" — the Hebrew text emphasises size and force.', era: '~900 BCE', type: 'warriors' },
  { book: 'Nahum', chapter: '3', verse: '9', text: 'Cush was her strength, and Egypt, and it was boundless; Put and the Lubim were her helpers.', context: 'The fall of Thebes. Even in destruction, the Lubim are named as the power behind power — helpers, allies, the military backbone of North Africa.', era: '~663 BCE (fall of Thebes)', type: 'prophecy' },
  { book: 'Jeremiah', chapter: '46', verse: '9', text: 'Advance, O horses, and rage, O chariots! Let the warriors go out: men of Cush and Put who handle the shield...', context: 'Put — the warriors from the Maghreb — are shield-bearers. A martial people. This is how the Hebrew prophets see them: soldiers.', era: '~605 BCE', type: 'prophecy' },
  { book: 'Ezekiel', chapter: '30', verse: '5', text: 'Cush, and Put, and Lud, and all the mingled people...', context: 'Ezekiel\'s prophecy against Egypt names Put alongside Cush. The "mingled people" may refer to the diverse nomadic tribes of the Sahara — the ancestors of the Tuareg.', era: '~587 BCE', type: 'prophecy' },
  { book: 'Ezekiel', chapter: '38', verse: '5', text: 'Persia, Cush, and Put are with them, all of them with shield and helmet.', context: 'In the prophecy of Gog and Magog, Put appears again as warriors — always warriors — carrying shields and helmets.', era: 'Prophetic', type: 'prophecy' },
  { book: 'Daniel', chapter: '11', verse: '43', text: 'The Libyans and the Cushites shall follow in his train.', context: 'Daniel\'s prophecy. The Libyans — Lubim — appear in the end-times narrative. Present at the beginning of the Bible, present at its prophetic end.', era: 'Prophetic', type: 'prophecy' },
  { book: 'Mark', chapter: '15', verse: '21', text: 'They compelled a passerby, Simon of Cyrene, who was coming in from the country, the father of Alexander and Rufus, to carry his cross.', context: 'The man who carried the cross of Jesus was from Cyrene — in modern Libya. A city in the Maghreb. The father of Alexander and Rufus — named because the early church knew them.', era: '~33 CE', type: 'gospel' },
  { book: 'Acts', chapter: '2', verse: '10', text: '...the parts of Libya near Cyrene...', context: 'At Pentecost — the birth of the church — people from Amazigh Libya are present. They hear the gospel in the first hour.', era: '~33 CE', type: 'early_church' },
  { book: 'Acts', chapter: '11', verse: '20', text: 'Some of them, men of Cyprus and Cyrene, who on coming to Antioch spoke to the Hellenists also, preaching the Lord Jesus.', context: 'Men from Cyrene bring the gospel to Antioch — where followers of Jesus are first called "Christians." The word "Christian" exists because North Africans carried the message.', era: '~40s CE', type: 'early_church' },
  { book: 'Acts', chapter: '13', verse: '1', text: 'Now there were in the church at Antioch prophets and teachers: Barnabas, Simeon who was called Niger, Lucius of Cyrene...', context: 'Lucius of Cyrene — from the Maghreb — is named as a prophet and teacher in the church at Antioch. From the land of the setting sun to the first centres of Christian thought.', era: '~40s CE', type: 'early_church' },
]

interface Person {
  name: string
  dates: string
  origin: string
  coords: [number, number]
  role: string
  detail: string
  type: 'biblical' | 'pope' | 'theologian'
}

const PEOPLE: Person[] = [
  { name: 'Sheshonq I (Shishak)', dates: '~943–922 BCE', origin: 'Bubastis, Egypt (Meshwesh Libyan)', coords: [31.5, 30.7], role: 'Pharaoh of Egypt, founder of the 22nd Dynasty', detail: 'A Meshwesh Libyan — Amazigh — who became Pharaoh. His invasion of Jerusalem in ~925 BCE is recorded in both the Hebrew Bible (1 Kings 14:25) and the Bubastite Portal at Karnak. He brought the Lubim warriors with him. The treasures of Solomon\'s temple went to Egypt in the hands of a Berber king.', type: 'biblical' },
  { name: 'Simon of Cyrene', dates: '~1st century CE', origin: 'Cyrene, Libya', coords: [21.86, 32.82], role: 'Carried the cross of Jesus', detail: 'Mark names him specifically: "the father of Alexander and Rufus." The early church knew his family. He was coming "from the country" — from outside the city — when Roman soldiers compelled him. A man from the Maghreb, walking into Jerusalem, asked to carry the weight of the central event in Christian history.', type: 'biblical' },
  { name: 'Lucius of Cyrene', dates: '~1st century CE', origin: 'Cyrene, Libya', coords: [21.86, 32.82], role: 'Prophet and teacher, early church at Antioch', detail: 'Named in Acts 13:1 as one of the prophets and teachers at Antioch. Some early traditions identify him as the first bishop of Antioch. From the land of the setting sun to the leadership of the church where the word "Christian" was coined.', type: 'biblical' },
  { name: 'Tertullian', dates: '~155–220 CE', origin: 'Carthage, Tunisia', coords: [10.17, 36.8], role: 'Father of Latin Christianity', detail: 'Born in Carthage to Berber parents. Created the Latin theological vocabulary still used today. Coined the word "Trinity" (trinitas). Before Tertullian, Christian theology was written in Greek. After him, it was Latin. He invented the language of Western Christianity.', type: 'theologian' },
  { name: 'Cyprian', dates: '~210–258 CE', origin: 'Carthage, Tunisia', coords: [10.17, 36.8], role: 'Bishop of Carthage, martyr', detail: 'Wealthy Berber convert. Became bishop of Carthage. Wrote foundational texts on church unity and the authority of bishops. Beheaded during the persecution of Valerian. His last words: "Thanks be to God."', type: 'theologian' },
  { name: 'Augustine of Hippo', dates: '354–430 CE', origin: 'Thagaste (Souk Ahras), Algeria', coords: [7.95, 36.28], role: 'Most influential theologian in Western Christianity', detail: 'Born in Thagaste — now Souk Ahras, Algeria. "Souk Ahras" means "market of lions" in Arabic-Berber. His mother Monica was Berber. He called himself "an African, writing of Africa." Wrote Confessions and City of God. Shaped Western philosophy for 1,500 years. Scholars generally agree he was of Berber descent.', type: 'theologian' },
  { name: 'Pope Victor I', dates: '189–199 CE', origin: 'Roman province of Africa (Libya/Tunisia)', coords: [10.0, 34.0], role: '14th Pope — first from the Maghreb', detail: 'Believed to be of Berber origin. Established Easter as a Sunday celebration. Introduced Latin as the church\'s liturgical language, replacing Greek. A Berber from the Maghreb changed the language of Christianity itself.', type: 'pope' },
  { name: 'Pope Miltiades', dates: '311–314 CE', origin: 'North Africa (Berber descent)', coords: [12.0, 33.5], role: '32nd Pope — "Melchiades the African"', detail: 'Called "Melchiades the African." Of Berber descent per the Liber Pontificalis. The first pope under Constantine. Received the gift of the Empress Fausta\'s palace — which became the Lateran Palace, the papal residence. Granted permission to build the Lateran Basilica, "the mother of all churches." A Berber built the pope\'s house.', type: 'pope' },
  { name: 'Pope Gelasius I', dates: '492–496 CE', origin: 'Rome (North African descent)', coords: [12.5, 41.9], role: '49th Pope — first called "Vicar of Christ"', detail: 'Of North African Berber descent, born in Rome. The first pope officially titled "Vicar of Christ." Wrote the Doctrine of the Two Swords — separating church and state — the framework that shaped Western political philosophy for a thousand years. Also established Valentine\'s Day on February 14. A Berber descendant defined how the West understands power.', type: 'pope' },
]

interface EgyptianName { name: string; period: string; detail: string }

const EGYPTIAN_NAMES: EgyptianName[] = [
  { name: 'Tehenu', period: 'Old Kingdom (~2686–2181 BCE)', detail: 'The earliest Egyptian name for their western neighbours. Depicted in temple reliefs at Abydos and Sahure.' },
  { name: 'Temehu', period: 'Old-Middle Kingdom', detail: 'A second term, possibly referring to a different tribal grouping or region.' },
  { name: 'Rebu / Lebu', period: 'New Kingdom (~1550–1070 BCE)', detail: 'The source of the word "Libya." First appears in the reign of Ramesses II. The Rebu attacked Egypt multiple times before being absorbed into its military.' },
  { name: 'Meshwesh', period: 'New Kingdom–Third Intermediate', detail: 'The tribe of Sheshonq I. The Meshwesh settled in the Nile Delta, rose through the military, and eventually took the throne. Scholars connect "Meshwesh" to "Mazyes" (Herodotus) and "Imazighen" — the name the Berbers use for themselves.' },
]

interface TimelineEvent { year: string; sortYear: number; title: string; detail: string; type: 'ancient' | 'biblical' | 'church' | 'theological' }

const TIMELINE: TimelineEvent[] = [
  { year: '~2600 BCE', sortYear: -2600, title: 'First Libyan revolt against Egypt', detail: 'Under Pharaoh Necherophes (3rd Dynasty), the Libyans revolt. The earliest recorded military action by the peoples west of the Nile.', type: 'ancient' },
  { year: '~1250 BCE', sortYear: -1250, title: 'Rebu attack Egypt', detail: 'The Rebu (Libyans) attack Egypt in the reign of Merneptah. They are defeated but not destroyed. They begin settling in the Nile Delta.', type: 'ancient' },
  { year: '~1000 BCE', sortYear: -1000, title: 'Meshwesh gain power', detail: 'Meshwesh chiefs become hereditary military commanders in the Delta. The title passes from father to son. They are Egyptianised but not Egyptian.', type: 'ancient' },
  { year: '943 BCE', sortYear: -943, title: 'Sheshonq takes the throne', detail: 'A Meshwesh Libyan becomes Pharaoh. Founds the 22nd Dynasty. The Bible will call him Shishak.', type: 'biblical' },
  { year: '~925 BCE', sortYear: -925, title: 'Sheshonq invades Jerusalem', detail: '1 Kings 14:25. "Shishak king of Egypt came up against Jerusalem." With him: the Lubim. The treasures of Solomon\'s temple and royal palace are carried to Egypt.', type: 'biblical' },
  { year: '~663 BCE', sortYear: -663, title: 'Fall of Thebes', detail: 'Nahum 3:9: "Put and the Lubim were her helpers." The Amazigh named in the prophets.', type: 'biblical' },
  { year: '~33 CE', sortYear: 33, title: 'Simon of Cyrene carries the cross', detail: 'Mark 15:21. A man from the Maghreb carries the cross of Jesus through Jerusalem. Named. His sons named. The church remembered him.', type: 'biblical' },
  { year: '~33 CE', sortYear: 34, title: 'Pentecost — Libyans present', detail: 'Acts 2:10. People from "the parts of Libya near Cyrene" are at the birth of the church.', type: 'church' },
  { year: '~40s CE', sortYear: 45, title: 'Men of Cyrene bring gospel to Antioch', detail: 'Acts 11:20. North Africans preach to Hellenists in Antioch — where followers of Jesus are first called "Christians."', type: 'church' },
  { year: '189 CE', sortYear: 189, title: 'Pope Victor I', detail: 'The first North African pope. Changes the church\'s language from Greek to Latin. Establishes Easter on Sunday.', type: 'church' },
  { year: '~200 CE', sortYear: 200, title: 'Tertullian coins "Trinity"', detail: 'A Berber from Carthage invents the Latin theological vocabulary. The word "Trinity" — trinitas — is his. Before him, theology was Greek. After him, it is Latin.', type: 'theological' },
  { year: '258 CE', sortYear: 258, title: 'Cyprian martyred', detail: 'The Bishop of Carthage, a Berber, is beheaded during Valerian\'s persecution. "Thanks be to God."', type: 'church' },
  { year: '311 CE', sortYear: 311, title: 'Pope Miltiades — "the African"', detail: 'A Berber pope presides over Christianity becoming legal. Constantine gives him the palace that becomes the Lateran — the papal residence for a thousand years.', type: 'church' },
  { year: '354 CE', sortYear: 354, title: 'Augustine born in Thagaste', detail: 'Born in what is now Souk Ahras, Algeria. "Market of lions." His mother Monica is Berber. He will become the most influential Christian thinker after Paul.', type: 'theological' },
  { year: '386 CE', sortYear: 386, title: 'Augustine converts', detail: 'In a garden in Milan, a Berber from Algeria experiences the conversion that will shape Western thought for 1,500 years. He returns to North Africa and never leaves again.', type: 'theological' },
  { year: '430 CE', sortYear: 430, title: 'Augustine dies', detail: 'Dies in Hippo Regius (Annaba, Algeria) as the Vandals besiege the city. The last of the great North African church fathers.', type: 'theological' },
  { year: '492 CE', sortYear: 492, title: 'Pope Gelasius I', detail: 'Of North African descent. The first "Vicar of Christ." His Doctrine of the Two Swords separates church and state — the framework of Western political philosophy.', type: 'church' },
]

const BIBLIOGRAPHY = [
  'Genesis 10:6, 10:13. Table of Nations.',
  '1 Kings 14:25–26. Shishak\'s invasion of Jerusalem.',
  '2 Chronicles 12:3, 16:8. The Lubim as warriors.',
  'Nahum 3:9. Put and Lubim as helpers of Thebes.',
  'Jeremiah 46:9. Put as shield-bearers.',
  'Ezekiel 30:5, 38:5. Put in prophecy.',
  'Daniel 11:43. Libyans in end-times prophecy.',
  'Mark 15:21; Matthew 27:32; Luke 23:26. Simon of Cyrene.',
  'Acts 2:10, 11:20, 13:1. Libyans in the early church.',
  'Strong\'s Hebrew 3864: Lubim. Biblical concordance.',
  'Ziani, N. (2020). The Berbers in the Bible: Their Origins, their Life and their Future.',
  'Brown, P. (1967). Augustine of Hippo: A Biography. University of California Press.',
  'Aleteia (2024). The three African Popes: Heroes of the Catholic Church.',
  'Liber Pontificalis. Papal biographies, compiled from 5th century.',
  'Kitchen, K.A. (1996). The Third Intermediate Period in Egypt (1100–650 BC). Warminster.',
]

// ══════════════════════════════════════════════════
// STYLES & HELPERS
// ══════════════════════════════════════════════════

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  mid: '#525252', muted: '#737373', border: '#e5e5e5',
}
const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
const GOLD = '#C4963C', PURPLE = '#5E60CE', RED = '#E63946', GREEN = '#2D6E4F', BROWN = '#8B7355'

function useInView(t = 0.12) {
  const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect() } }, { threshold: t }); o.observe(el); return () => o.disconnect() }, [t])
  return { ref, v }
}
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, v } = useInView(); return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms` }}>{children}</div>
}
function Micro({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color, marginBottom: 16 }}>{children}</div>
}
function Title({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>{children}</h2>
}
function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.85, color: C.mid, marginBottom: 20, maxWidth: 640 }}>{children}</p>
}
function Sec({ children, bg = C.bg }: { children: React.ReactNode; bg?: string }) {
  return <section style={{ background: bg, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}><div style={{ maxWidth: 800, margin: '0 auto' }}>{children}</div></section>
}

// ══════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════

export default function FromTheLandContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapFilter, setMapFilter] = useState<'all' | 'biblical' | 'pope' | 'theologian'>('all')
  const [scriptureFilter, setScriptureFilter] = useState('all')
  const [timeFilter, setTimeFilter] = useState('all')
  const [expandedScripture, setExpandedScripture] = useState<number | null>(null)
  const [expandedPerson, setExpandedPerson] = useState<number | null>(null)
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  const filteredPeople = mapFilter === 'all' ? PEOPLE : PEOPLE.filter(p => p.type === mapFilter)
  const filteredScriptures = scriptureFilter === 'all' ? SCRIPTURES : SCRIPTURES.filter(s => s.type === scriptureFilter)
  const filteredTime = timeFilter === 'all' ? TIMELINE : TIMELINE.filter(e => e.type === timeFilter)

  // ── MAPBOX ──
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const l = document.createElement('link'); l.rel = 'stylesheet'
        l.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'; document.head.appendChild(l)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [15, 32], zoom: 3.2, minZoom: 2, maxZoom: 10, attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        const colors: Record<string, string> = { biblical: GOLD, pope: PURPLE, theologian: GREEN }
        PEOPLE.forEach((p, i) => {
          map.addSource(`person-${i}`, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: p.coords } } })
          map.addLayer({ id: `person-${i}`, type: 'circle', source: `person-${i}`,
            paint: { 'circle-radius': 8, 'circle-color': colors[p.type] || BROWN, 'circle-opacity': 0.8, 'circle-stroke-width': 2, 'circle-stroke-color': '#fff' } })
        })
        mapRef.current = map
      })
    })
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  useEffect(() => {
    const map = mapRef.current; if (!map || !map.isStyleLoaded()) return
    PEOPLE.forEach((p, i) => {
      try {
        if (map.getLayer(`person-${i}`)) {
          const show = mapFilter === 'all' || p.type === mapFilter
          map.setPaintProperty(`person-${i}`, 'circle-opacity', show ? 0.8 : 0.08)
          map.setPaintProperty(`person-${i}`, 'circle-stroke-color', show ? '#fff' : 'transparent')
        }
      } catch {}
    })
  }, [mapFilter])

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <Fade><Micro>Module · History & Identity</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            From the Land<br />of the Setting Sun
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 520 }}>
            The Amazigh in the Bible.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '14', label: 'Scripture references' },
              { n: '3', label: 'Popes from the Maghreb' },
              { n: '3', label: 'Biblical Hebrew names' },
              { n: '~925 BCE', label: 'Lubim sack Jerusalem' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 32, fontStyle: 'italic', color: C.ink, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ INTRO ═══ */}
      <Sec>
        <Fade>
          <Body>Before there is Africa, before there is Morocco or Algeria or Tunisia, there is the Maghreb. The land where the sun sets. The people who live there have no single name that outsiders agree on. The Egyptians call them Tehenu, Temehu, Rebu, Meshwesh. The Hebrews call them Lehabim, Lubim, Phut. The Greeks will call them Libyans. They call themselves Imazighen — the free people.</Body>
          <Body>They appear in the oldest book in the Western world. Not as footnotes. Not as background. As warriors, as allies, as the military power behind empires. They sack Solomon's temple. They carry Christ's cross. They invent the language of Christian theology. Three of them become Pope.</Body>
          <Body>This is what the Bible says about the Imazighen. Every word of it has a receipt.</Body>
        </Fade>
      </Sec>

      {/* ═══ THE NAMES ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={GOLD}>The Names</Micro>
          <Title>What the Bible calls them</Title>
        </Fade>
        {NAMES.map((n, i) => (
          <Fade key={i} delay={i * 80}>
            <div style={{ padding: '24px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: C.ink }}>{n.transliteration}</span>
                <span style={{ fontFamily: F.mono, fontSize: 18, color: GOLD, direction: 'rtl' as const }}>{n.hebrew}</span>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 4 }}>
                Meaning: &quot;{n.meaning}&quot; · Modern equivalent: {n.modernEquivalent}
              </div>
              <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, marginTop: 12 }}>{n.detail}</p>
            </div>
          </Fade>
        ))}
        <Fade delay={300}>
          <div style={{ marginTop: 40 }}>
            <Micro color={BROWN}>What the Egyptians called them</Micro>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 1 }}>
              {EGYPTIAN_NAMES.map((en, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink }}>{en.name}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: BROWN, marginTop: 2 }}>{en.period}</div>
                  <p style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.7, color: C.mid, marginTop: 6 }}>{en.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </Sec>

      {/* ═══ SCRIPTURES ═══ */}
      <Sec>
        <Fade>
          <Micro color={RED}>The Verses</Micro>
          <Title>What the text says</Title>
        </Fade>
        <Fade delay={100}>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { key: 'all', label: 'All', color: C.ink },
              { key: 'genealogy', label: 'Genealogy', color: BROWN },
              { key: 'warriors', label: 'Warriors', color: RED },
              { key: 'prophecy', label: 'Prophecy', color: GOLD },
              { key: 'gospel', label: 'Gospel', color: PURPLE },
              { key: 'early_church', label: 'Early Church', color: GREEN },
            ].map(f => (
              <button key={f.key} onClick={() => setScriptureFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 14px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: scriptureFilter === f.key ? f.color : 'transparent',
                color: scriptureFilter === f.key ? '#fff' : C.muted,
                border: `1px solid ${scriptureFilter === f.key ? f.color : C.border}`,
              }}>{f.label}</button>
            ))}
          </div>
        </Fade>
        {filteredScriptures.map((s, i) => {
          const typeColors: Record<string, string> = { genealogy: BROWN, warriors: RED, prophecy: GOLD, gospel: PURPLE, early_church: GREEN }
          return (
            <Fade key={`${s.book}-${s.chapter}-${i}`} delay={i * 30}>
              <div onClick={() => setExpandedScripture(expandedScripture === i ? null : i)} style={{
                padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 700, color: typeColors[s.type] || C.muted }}>{s.book} {s.chapter}:{s.verse}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted }}>{s.era}</span>
                </div>
                <p style={{ fontFamily: F.serif, fontSize: 17, fontStyle: 'italic', color: C.ink, lineHeight: 1.5, marginTop: 8 }}>&quot;{s.text}&quot;</p>
                <div style={{ maxHeight: expandedScripture === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, paddingTop: 8 }}>{s.context}</p>
                </div>
              </div>
            </Fade>
          )
        })}
      </Sec>

      {/* ═══ MAP — THE PEOPLE ═══ */}
      <section style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: '48px 24px 24px', maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <Micro color={PURPLE}>The People</Micro>
            <Title>Warriors, theologians, popes</Title>
          </Fade>
          <Fade delay={100}>
            <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 16 }}>
              {[
                { key: 'all' as const, label: 'All', color: C.ink },
                { key: 'biblical' as const, label: 'Biblical Figures', color: GOLD },
                { key: 'theologian' as const, label: 'Theologians', color: GREEN },
                { key: 'pope' as const, label: 'Popes', color: PURPLE },
              ].map(f => (
                <button key={f.key} onClick={() => setMapFilter(f.key)} style={{
                  fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                  background: mapFilter === f.key ? f.color : 'transparent',
                  color: mapFilter === f.key ? '#fff' : C.muted,
                  border: `1px solid ${mapFilter === f.key ? f.color : C.border}`,
                }}>{f.label}</button>
              ))}
            </div>
          </Fade>
        </div>
        <div ref={mapContainer} style={{ width: '100%', height: 'clamp(400px, 55vw, 600px)', background: '#f5f5f5' }} />
        <div style={{ padding: '32px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
          {filteredPeople.map((p, i) => {
            const typeColors: Record<string, string> = { biblical: GOLD, pope: PURPLE, theologian: GREEN }
            return (
              <div key={p.name} onClick={() => setExpandedPerson(expandedPerson === i ? null : i)} style={{ padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: F.serif, fontSize: 20, fontStyle: 'italic', color: C.ink }}>{p.name}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: typeColors[p.type] || C.muted, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{p.type}</span>
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 2 }}>
                  {p.dates} · {p.origin}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: C.mid, marginTop: 4 }}>{p.role}</div>
                <div style={{ maxHeight: expandedPerson === i ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, paddingTop: 8 }}>{p.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={GOLD}>Timeline</Micro>
          <Title>3,500 years in the text</Title>
        </Fade>
        <Fade delay={100}>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { key: 'all', label: 'All', color: C.ink },
              { key: 'ancient', label: 'Ancient', color: BROWN },
              { key: 'biblical', label: 'Biblical', color: GOLD },
              { key: 'church', label: 'Church', color: PURPLE },
              { key: 'theological', label: 'Theological', color: GREEN },
            ].map(f => (
              <button key={f.key} onClick={() => setTimeFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 14px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: timeFilter === f.key ? f.color : 'transparent',
                color: timeFilter === f.key ? '#fff' : C.muted,
                border: `1px solid ${timeFilter === f.key ? f.color : C.border}`,
              }}>{f.label}</button>
            ))}
          </div>
        </Fade>
        {filteredTime.map((e, i) => {
          const typeColors: Record<string, string> = { ancient: BROWN, biblical: GOLD, church: PURPLE, theological: GREEN }
          return (
            <Fade key={`${e.sortYear}-${i}`} delay={i * 30}>
              <div onClick={() => setExpandedEvent(expandedEvent === i ? null : i)} style={{
                padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
                display: 'grid', gridTemplateColumns: 'clamp(90px, 13vw, 130px) 1fr', gap: 16,
              }}>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 15, fontStyle: 'italic', color: C.ink, lineHeight: 1.2 }}>{e.year}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 4, color: typeColors[e.type] }}>{e.type}</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: C.ink }}>{e.title}</div>
                  <div style={{ maxHeight: expandedEvent === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                    <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, paddingTop: 8 }}>{e.detail}</p>
                  </div>
                </div>
              </div>
            </Fade>
          )
        })}
      </Sec>

      {/* ═══ THE CONNECTION ═══ */}
      <Sec>
        <Fade>
          <Micro color={GOLD}>The Connection</Micro>
          <Title>The land of the setting sun</Title>
          <Body>The Imazighen are in the Bible from beginning to end. Genesis to Revelation. In the Table of Nations, they are born. In the prophets, they are warriors. In the Gospels, one of them carries the cross. In Acts, they are at Pentecost, they preach in Antioch, they lead the early church. In the centuries that follow, they invent the vocabulary of Christian theology, they lead it as popes, and one of them — a Berber from a town called &quot;Market of Lions&quot; in Algeria — writes the books that shape Western thought for a millennium and a half.</Body>
          <Body>The Hebrew word for them means &quot;people of the dry land.&quot; The Arabic word for where they live means &quot;the place of the setting sun.&quot; Al-Maghreb. They were there before both languages existed. They are still there. And the text remembers them — if you know what names to look for.</Body>
        </Fade>
      </Sec>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ padding: '64px 24px', background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px', background: C.alt, textAlign: 'center' as const }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>
          Scripture quotations adapted from ESV. Historical sources cited above.
        </p>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted, marginTop: 4 }}>Slow Morocco</p>
      </section>

      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>From the Land of the Setting Sun</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · History & Identity</span>
          </div>
        </div>
        <div style={{ background: '#161616', padding: '20px 24px', textAlign: 'center' as const }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Slow Morocco</span>
        </div>
        <div style={{ background: '#0e0e0e', padding: '12px 24px' }} />
      </footer>
    </div>
  )
}
