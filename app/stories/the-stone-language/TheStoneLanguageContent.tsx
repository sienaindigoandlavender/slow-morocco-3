'use client'

import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════
   THE STONE LANGUAGE
   When Every Culture Stacks Rocks
   Knowledge Series · Slow Morocco
   ═══════════════════════════════════════════════════ */

const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  muted: '#737373', border: '#e5e5e5',
  stone: '#8B7355', gold: '#C4963C', green: '#2D6E4F',
  arctic: '#48BFE3', andes: '#B5651D', mongol: '#9B2335',
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── DATA ─────────────────────────────────────────

interface StoneTradition {
  name: string
  localName: string
  people: string
  region: string
  age: string
  terrain: string
  purposes: string[]
  detail: string
  color: string
}

const TRADITIONS: StoneTradition[] = [
  {
    name: 'Kerkour', localName: 'كركور', people: 'Amazigh', region: 'North Africa — Atlas, Sahara, Maghreb', age: '~8,000+ years',
    terrain: 'Mountain passes, desert steppe, arid plateaus. No trees above the cedar line.',
    purposes: ['Trail marking on mountain passes', 'Burial markers (tumuli)', 'Sacred site indicators', 'Territorial boundaries between tribal lands'],
    detail: 'The oldest stone cairns in North Africa predate the desertification of the Sahara. Wikipedia\'s cairn entry documents "cairns (kerkour), dolmens and circles" in "vast numbers in presently arid and uninhabitable wastelands" — remnants of a time when the Sahara was green. As the climate dried, the stones remained. In the High Atlas today, kerkour mark passes, graves, and the boundaries between tribal territories. They are functional. They are also ancient beyond any living memory of who placed the first stone.',
    color: C.gold,
  },
  {
    name: 'Inuksuk', localName: 'ᐃᓄᒃᓱᒃ', people: 'Inuit, Iñupiat, Yupik, Kalaallit', region: 'Canadian Arctic, Greenland, Alaska', age: '~4,400 years (2400–1800 BCE, Baffin Island)',
    terrain: 'Arctic tundra. Flat, treeless, featureless. Snow cover most of the year.',
    purposes: ['Navigation across treeless tundra', 'Caribou drive lanes (herding animals toward hunters)', 'Food cache markers', 'Message points between families', 'Sacred markers'],
    detail: 'The word inuksuk means "something which acts for or performs the function of a person" in Inuktitut. In a landscape with no trees, no fences, no buildings — the stacked stone becomes the human proxy. A distinct form, the inunnguaq, is shaped like a human figure with arms, legs, and a head. But most inuksuit are simpler: directional pointers, cache markers, warnings. About 100 inuksuit on Foxe Peninsula, Baffin Island, are 2,000+ years old and still standing. The inuksuk is on the flag of Nunavut.',
    color: C.arctic,
  },
  {
    name: 'Ovoo', localName: 'овоо', people: 'Mongol, Turkic, Siberian peoples', region: 'Mongolia, Buryatia, Tuva, Central Asia', age: 'Pre-Buddhist (Tengriist origins, thousands of years)',
    terrain: 'Steppe, mountain passes, open grassland. Trees sparse or absent.',
    purposes: ['Worship of Tenger (sky spirits)', 'Mountain pass markers', 'Territorial boundaries', 'Offerings for safe passage', 'Meeting points for nomadic groups'],
    detail: 'Mongolian shamanism recognises 99 tenger — 55 benevolent, 44 malevolent. Ovoos were originally built to honour them. When Tibetan Buddhism arrived, the tradition absorbed Buddhist elements without losing its shamanic core. Travellers circle an ovoo three times clockwise, adding a stone each time and leaving offerings — blue silk, horse skulls, vodka. Some ovoo complexes contain 7 to 13 cairns in formation, the largest in the centre. In a 2013 survey, 75 of 144 Mongolian respondents said they believe in ovoo ceremonies.',
    color: C.mongol,
  },
  {
    name: 'Apacheta', localName: 'apachita', people: 'Quechua, Aymara', region: 'Andes — Peru, Bolivia, Ecuador, Chile, Argentina', age: 'Pre-Columbian (thousands of years)',
    terrain: 'High-altitude passes (4,000–5,000m). Above the tree line. Thin air, harsh wind.',
    purposes: ['Offerings to Pachamama (Earth Mother) at mountain passes', 'Trail markers on high-altitude routes', 'Gratitude for safe passage', 'Ritual stone placement by travellers'],
    detail: 'At high Andean passes, travellers add a stone to the apacheta and offer coca leaves, chicha, or a prayer. The act marks the transition from one valley to another — a liminal moment. The cairns grow over centuries as each traveller adds to the collective prayer. The same principle as the kerkour, the ovoo, the Scottish cairn: I was here, I survived the crossing, I leave a stone for the next person.',
    color: C.andes,
  },
  {
    name: 'Varde', localName: 'varde / varda', people: 'Norse, Sámi', region: 'Scandinavia, Iceland, Faroe Islands', age: 'Viking Age and earlier',
    terrain: 'Coastal cliffs, mountain plateaus, Arctic islands. Above treeline or on bare rock.',
    purposes: ['Sea navigation markers (painted white)', 'Mountain trail markers', 'Summit indicators', 'Boundary markers between farm territories'],
    detail: 'In Scandinavia, varder serve both land and sea navigation. Coastal cairns, painted white for visibility, guided ships through island-strewn waters — still maintained today as part of the nautical marking system. Mountain varder mark trails above the treeline where snow obliterates paths for months. Iceland, with almost no trees, uses cairns extensively. The tradition connects to the Sámi stone-stacking practices documented across Fennoscandia, Finland, and Russia.',
    color: C.arctic,
  },
  {
    name: 'Highland Cairn', localName: 'càrn', people: 'Scots, Irish, Welsh', region: 'Scotland, Ireland, Wales, Brittany', age: 'Neolithic (5,000+ years for burial cairns)',
    terrain: 'Moorland, mountain summits, hillsides. Treeless uplands.',
    purposes: ['Burial mounds (Neolithic and Bronze Age)', 'Summit markers', 'Battle memorials (each warrior places a stone before battle)', 'Trail markers through bog and moor'],
    detail: 'An old Scottish Gaelic blessing: "Cuiridh mi clach air do chàrn" — "I\'ll put a stone on your cairn." Before battle, Highland clans would each place a stone in a pile. Those who returned removed their stone. The remaining stones became a cairn for the dead. In Ireland, it is traditional to carry a stone from the bottom of a hill to place on the summit cairn. The word "cairn" itself comes from Irish and Scottish Gaelic: carn. Clava Cairns near Inverness date to the Bronze Age, 4,000 years old.',
    color: C.stone,
  },
  {
    name: 'San-shin Cairn', localName: '산신당', people: 'Korean', region: 'South Korea', age: 'Pre-Buddhist (shamanic origins)',
    terrain: 'Mountain peaks, trailsides, temple approaches.',
    purposes: ['Worship of San-shin (Mountain Spirit)', 'Good luck at summit', 'Trail markers', 'Prayer and wish-making'],
    detail: 'Korean mountain cairns are rooted in the worship of San-shin, the Mountain Spirit — one of the oldest layers of Korean folk religion, predating Buddhism and Confucianism. Hikers add stones to existing cairns at peaks and passes, trying to balance one more stone on top for good luck. The tradition has survived through centuries of Buddhist, Confucian, and Christian influence. On any Korean mountain trail today, you will find cairns.',
    color: '#3B5998',
  },
  {
    name: 'Hebrew Gal-Ed', localName: 'גל־עד', people: 'Hebrew / Israelite', region: 'Levant', age: 'Biblical (Genesis 31)',
    terrain: 'Desert hills, borderlands.',
    purposes: ['Border demarcation', 'Covenant witness', 'Memorial'],
    detail: 'In Genesis 31, Jacob and Laban set up a cairn at Gilead as a border marker and witness to their covenant. The Hebrew gal-ed literally means "heap of testimony." Its Aramaic equivalent, Yegar Sahaduta, means the same thing. In modern Hebrew, gal-ed is still the word for cairn. The stone pile as legal boundary and witness — the same function as the Amazigh kerkour marking tribal territories.',
    color: C.gold,
  },
  {
    name: 'Stupa Origin', localName: 'stūpa', people: 'Buddhist (from Indian funerary traditions)', region: 'India, Tibet, Nepal, Southeast Asia', age: '~2,500 years',
    terrain: 'Variable — but the tradition likely evolved from simple stone cairns.',
    purposes: ['Reliquary for saints\' or teachers\' ashes', 'Sacred focal point', 'Meditation object', 'Merit-making through circumambulation'],
    detail: 'The Buddhist stupa probably began as a simple burial cairn — a pile of stones over cremated remains. Over centuries, it evolved into the elaborate hemispherical and spired structures found from Sri Lanka to Japan. But the origin is the same universal act: pile stones over the dead, mark the place, make it sacred. Tibetan mani stone piles, inscribed with mantras, are a direct descendant of the cairn tradition.',
    color: C.green,
  },
]

// ── THE EQUATION ──

interface Condition {
  factor: string
  detail: string
}

const EQUATION: Condition[] = [
  { factor: 'No trees', detail: 'No wood for signposts, no logs for markers. The landscape offers only one construction material: rock.' },
  { factor: 'Available stone', detail: 'Volcanic islands, mountain passes, tundra, desert — the surface is littered with loose stone. The material is free and infinite.' },
  { factor: 'Need to communicate', detail: 'Trails to mark, graves to honour, borders to define, caches to find, spirits to appease, stories to leave for the next person.' },
  { factor: 'Permanence', detail: 'Stone outlasts wood, leather, cloth, memory. A cairn placed 4,000 years ago is still standing on Baffin Island. A kerkour placed 8,000 years ago is still in the Sahara.' },
  { factor: 'Verticality', detail: 'A single stone on a flat surface is invisible. Stack three and you have created the only vertical object on the horizon. In treeless terrain, height is signal.' },
]

// ── COMPONENTS ───────────────────────────────────

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
    }}>{children}</div>
  )
}

function Micro({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color, marginBottom: 16 }}>{children}</div>
}

function Title({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>{children}</h2>
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.85, color: C.body, marginBottom: 20, maxWidth: 640 }}>{children}</p>
}

function Sec({ children, bg = C.bg }: { children: React.ReactNode; bg?: string }) {
  return <section style={{ background: bg, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}><div style={{ maxWidth: 900, margin: '0 auto' }}>{children}</div></section>
}

// ── PAGE ─────────────────────────────────────────

export function TheStoneLanguageContent() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <Fade><Micro>Knowledge · Cultural Intelligence</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            The Stone<br />Language
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 560 }}>
            When the landscape has no trees, humans stack rocks.<br />
            Nine cultures. Five continents. One instinct.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '9+', label: 'independent traditions', color: C.stone },
              { n: '8,000', label: 'years (oldest known cairns)', color: C.gold },
              { n: '5', label: 'continents', color: C.green },
              { n: '0', label: 'genetic or cultural connections between them', color: C.ink },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: s.color, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4, maxWidth: 160 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ INTRO ═══ */}
      <Sec>
        <Fade>
          <Prose>In the High Atlas, you see them on passes. Small pyramids of stacked stone, sometimes with a stick or a rag tied to the top. They mark the trail where there are no signs. They mark graves where there are no headstones. They mark the boundary between one <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Amazigh</span> tribe's territory and the next. The Amazigh call them kerkour.</Prose>
          <Prose>In the Canadian Arctic, the Inuit build inuksuit — stone figures that "act in the capacity of a human." They point toward caribou hunting grounds, mark safe passages across the tundra, store messages between families. Some on Baffin Island are 4,000 years old.</Prose>
          <Prose>In Mongolia, travellers circle ovoo cairns three times clockwise, adding a stone and leaving offerings of blue silk for the sky spirits. In the Andes, Quechua pilgrims place stones on apachetas at high passes with coca leaf prayers. In Scotland, Highland warriors piled stones before battle and removed them after — the unclaimed stones became the memorial. In Korea, hikers stack stones at mountain peaks for the Mountain Spirit. In Genesis 31, Jacob and Laban built a cairn as a covenant witness — gal-ed, "heap of testimony."</Prose>
          <Prose>None of these peoples are connected. The Inuit and the Amazigh have never met. The Mongols and the Quechua share no ancestor for 15,000 years. The Scottish and the Korean traditions evolved on opposite ends of the Eurasian landmass with no contact whatsoever.</Prose>
          <Prose>This is not a connection. This is convergence. The same problem, solved the same way, independently, across five continents, for at least 8,000 years. The problem: a treeless landscape, loose stone, and the need to say something to the next person who passes. <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>The lion symbol</span> followed a similar arc — appearing independently in civilisations that never met, for the same reason: apex predator as metaphor for power.</Prose>
        </Fade>
      </Sec>

      {/* ═══ THE EQUATION ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.stone}>The Equation</Micro>
          <Title>Why it always happens</Title>
        </Fade>
        {EQUATION.map((eq, i) => (
          <Fade key={i} delay={i * 40}>
            <div style={{ display: 'grid', gridTemplateColumns: 'clamp(100px, 15vw, 160px) 1fr', gap: 16, padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: F.serif, fontSize: 17, fontStyle: 'italic', color: C.ink }}>{eq.factor}</div>
              <div style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.8, color: C.body }}>{eq.detail}</div>
            </div>
          </Fade>
        ))}
        <Fade delay={250}>
          <div style={{ marginTop: 32, padding: 24, background: C.stone + '10', borderLeft: `3px solid ${C.stone}` }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(18px, 2.5vw, 24px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.4 }}>
              No trees + available stone + need to communicate = stacked rocks.
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 12, color: C.body, marginTop: 8 }}>
              The equation solves itself. Independently. Every time.
            </p>
          </div>
        </Fade>
      </Sec>

      {/* ═══ THE TRADITIONS ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.green}>Nine Traditions</Micro>
          <Title>Same instinct, different names</Title>
        </Fade>
        {TRADITIONS.map((t, i) => (
          <Fade key={t.name} delay={i * 25}>
            <div onClick={() => setExpanded(expanded === i ? null : i)} style={{
              padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.serif, fontSize: 20, fontStyle: 'italic', color: C.ink }}>{t.name}</span>
                {t.localName !== t.name && <span style={{ fontFamily: F.mono, fontSize: 12, color: t.color }}>{t.localName}</span>}
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 2 }}>
                {t.people} · {t.region} · {t.age}
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 12, color: C.body, marginTop: 6 }}>
                {t.terrain}
              </div>
              <div style={{ maxHeight: expanded === i ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
                <div style={{ paddingTop: 12 }}>
                  <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: t.color, marginBottom: 8 }}>Purposes</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {t.purposes.map((p, j) => (
                      <span key={j} style={{ fontFamily: F.mono, fontSize: 11, color: C.body, padding: '4px 10px', background: t.color + '10', borderRadius: 2 }}>{p}</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>{t.detail}</p>
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </Sec>

      {/* ═══ CLOSING ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.stone}>The Point</Micro>
          <Title>Not a connection. A proof.</Title>
          <Prose>When you see a kerkour in the Atlas and think of an inuksuk in the Arctic, the temptation is to look for a link. A migration, a shared ancestor, a lost connection between peoples. The human mind craves narrative. We want the story to be about contact.</Prose>
          <Prose>But the real story is better. The real story is that human beings, independently, on every continent, in every era, when confronted with the same conditions — treeless terrain, loose stone, the need to speak to someone who is not yet there — arrive at the same answer. Stack rocks. Make a vertical mark on a horizontal world. Say: I was here. The trail is this way. The dead are underneath. The spirits are above. Keep going.</Prose>
          <Prose>The stone language is not learned. It is not transmitted. It is not inherited. It is invented, again and again, because it is the only possible solution to the problem of being human in a landscape that offers nothing but rock and sky.</Prose>
          <Prose>That is more interesting than a connection. That is a universal.</Prose>
        </Fade>
      </Sec>

      {/* ═══ SOURCES ═══ */}
      <section style={{ padding: '64px 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {[
            'Hallendy, N. (2009). Inuksuit: Silent Messengers of the Arctic. Douglas & McIntyre.',
            'Cairn. (2026). Wikipedia. Sections on North Africa (kerkour), Mongolia (ovoo), Andes (apacheta), Scotland, Korea, Biblical (gal-ed).',
            'UNESCO (2009). Tentative List: Inuksuit on Foxe Peninsula, Baffin Island.',
            'Genesis 31:44–52. The Hebrew Bible.',
            'Mizin, V. (2013). Stone structures of the tundra: comparative analysis across Arctic cultures.',
          ].map((b, i) => (
            <p key={i} style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      {/* ═══ CONTINUE READING ═══ */}
      <section style={{ borderTop: '1px solid #e5e5e5', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 24 }}>Continue Reading</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { href: '/stories/the-churches-that-swallowed-the-mountain', title: 'The Churches That Swallowed the Mountain', sub: 'When stone stacking became architecture. Lalibela carved downward.' },
              { href: '/stories/what-solomon-knew', title: 'What Solomon Knew', sub: 'Solomon\'s stone Temple — the building that defined sacred architecture.' },
              { href: '/stories/the-lions-road', title: 'The Lion\'s Road', sub: 'Another convergent pattern — the lion symbol across disconnected civilisations.' },
              { href: '/stories/the-coffee-covenant', title: 'The Coffee Covenant', sub: 'A different convergence — every culture that finds coffee invents a ceremony around it.' },
            ].map(l => (
              <span key={l.href} style={{ display: 'block', padding: '16px 20px', background: C.alt, borderRadius: 2, textDecoration: 'none', transition: 'background 0.2s' }}>
                <p style={{ fontFamily: F.serif, fontSize: 16, fontStyle: 'italic', color: C.ink, marginBottom: 4, lineHeight: 1.3 }}>{l.title}</p>
                <p style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, lineHeight: 1.5 }}>{l.sub}</p>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '24px', background: C.alt, textAlign: 'center' as const }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>© Slow Morocco</p>
      </section>

      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Stone Language</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · Knowledge</span>
          </div>
        </div>
        <div style={{ background: '#161616', padding: '20px 24px', textAlign: 'center' as const }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} Slow Morocco · J. Ng</span>
        </div>
        <div style={{ background: '#0e0e0e', padding: '12px 24px' }} />
      </footer>
    </div>
  )
}
