'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
const DWLRouteMap = dynamic(() => import('@/components/maps/DWLRouteMap'), { ssr: false })

/* ═══════════════════════════════════════════════════════
   THE QUEEN WHO DID NOT KNEEL
   Bilqis, the Incense Road, and the Geopolitics Behind the Visit
   Knowledge Series · Slow Morocco
   ═══════════════════════════════════════════════════════ */

const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  muted: '#737373', border: '#e5e5e5',
  gold: '#B8860B', amber: '#C4963C', brass: '#B5A642',
  iron: '#4A4A4A', emerald: '#2D6E4F', crimson: '#8B1A1A',
  lapis: '#1E3A5F', smoke: '#6B5B73', sand: '#8B7D6B',
  rose: '#8B4557',
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

// —— DATA ——————————————————————————————————

const DAM_STATS = [
  { label: 'Length', value: '550m', detail: '1,800 feet of stone and earth' },
  { label: 'Height (peak)', value: '14m', detail: 'Raised in stages over centuries' },
  { label: 'Irrigated area', value: '10,000 ha', detail: '25,000 acres of desert turned farmland' },
  { label: 'Population fed', value: '~50,000', detail: 'Bordering the Empty Quarter desert' },
  { label: 'Operational span', value: '~1,200 years', detail: '8th century BCE to 6th century CE' },
  { label: 'City area', value: '98 ha', detail: 'Largest city in ancient South Arabia' },
]

const DIPLOMATIC_MOVES = [
  { move: '01', actor: 'Solomon', action: 'Builds Red Sea fleet at Ezion-geber with Phoenician shipbuilders', subtext: 'Threatens to bypass Sabaean overland incense monopoly' },
  { move: '02', actor: 'Hoopoe', action: 'Reports: "A woman ruling them, endowed with all things, a great throne"', subtext: 'Military intelligence briefing (Quran 27:23)' },
  { move: '03', actor: 'Solomon', action: '"Be not arrogant against me, but come to me in submission"', subtext: 'Ultimatum — political or religious (Quran 27:31)' },
  { move: '04', actor: 'Bilqis', action: 'Convenes shura: "O chiefs, advise me in my affair"', subtext: 'Democratic consultation. Generals offer war. She rejects it.' },
  { move: '05', actor: 'Bilqis', action: '"When kings enter a city, they ruin it"', subtext: 'Strategic analysis — she has seen empires fall (Quran 27:34)' },
  { move: '06', actor: 'Bilqis', action: 'Sends diplomatic gift to test Solomon\'s character', subtext: 'Probe: can he be bought, or is this existential? (Quran 27:35)' },
  { move: '07', actor: 'Solomon', action: 'Rejects the gift', subtext: 'Confirms: this is not about money' },
  { move: '08', actor: 'Bilqis', action: 'Travels to Jerusalem with massive retinue and 4 tonnes of gold', subtext: 'Face-to-face diplomacy. Demonstrates cooperative value.' },
  { move: '09', actor: 'Solomon', action: 'Transports her throne to Jerusalem before she arrives', subtext: '"I can reach into your kingdom without you knowing" (Quran 27:38)' },
  { move: '10', actor: 'Bilqis', action: '"I submit with Solomon to God, Lord of the worlds"', subtext: 'Not to Solomon. With Solomon. Equal before a higher authority. (Quran 27:44)' },
]

interface SourceClaim {
  source: string
  sleptTogether: string
  child: string
  marriage: string
  date: string
  purpose: string
}

const SOURCE_CLAIMS: SourceClaim[] = [
  {
    source: 'Hebrew Bible (1 Kings 10)',
    sleptTogether: 'Silent. "Gave her all her desire" — ambiguous.',
    child: 'No mention.',
    marriage: 'No mention.',
    date: '~6th century BCE compilation',
    purpose: 'Her visit proves Solomon\'s greatness. She is a witness.',
  },
  {
    source: 'Quran (Surah An-Naml 27)',
    sleptTogether: 'No. Encounter is political and spiritual.',
    child: 'No mention.',
    marriage: 'Some commentators say yes. The Quran does not.',
    date: '7th century CE',
    purpose: 'She is a model of wise governance. Shura, diplomacy, recognition of truth.',
  },
  {
    source: 'Midrashic traditions',
    sleptTogether: 'Some say yes. Offspring: Nebuchadnezzar.',
    child: 'The destroyer of the Temple — a warning, not a romance.',
    marriage: 'No.',
    date: 'Various, 3rd–12th century CE',
    purpose: 'Moral lesson: Solomon\'s desire leads to the Temple\'s destruction.',
  },
  {
    source: 'Kebra Nagast (Ethiopia)',
    sleptTogether: 'Yes. Solomon tricks her with spiced food and water.',
    child: 'Menelik I. Takes the Ark of the Covenant to Ethiopia.',
    marriage: 'No — she returns home pregnant.',
    date: '~14th century CE (compiled 1314–1322)',
    purpose: 'Legitimises the Solomonic dynasty that ruled Ethiopia until 1974.',
  },
]

const AFTERMATH = [
  { entity: 'Solomon\'s Kingdom', outcome: 'Fractured immediately after his death (1 Kings 12). Split into Israel and Judah.' },
  { entity: 'Kingdom of Saba', outcome: 'Endured until ~275 CE — outlasted Solomon\'s empire by over 600 years.' },
  { entity: 'Marib Dam', outcome: 'Continued operating for ~1,200 years. Final breach recorded in the Quran (Surah 34:15–17).' },
  { entity: 'Incense Trade', outcome: 'Intensified in decades following the visit. Sabaean trade officials documented in Jerusalem (Ophel inscription).' },
  { entity: 'Ethiopian Solomonic Dynasty', outcome: 'Ruled from 1270 to 1974. 700 years. Constitution cited descent from Menelik I until Haile Selassie\'s deposition.' },
]

// —— COMPONENTS ———————————————————————————

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

// —— PAGE ——————————————————————————————————

export function TheQueenWhoDidNotKneelContent() {
  const [claimExpanded, setClaimExpanded] = useState<number | null>(null)

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <Fade><Micro>Knowledge · Cultural Intelligence</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            The Queen Who<br />Did Not Kneel
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 560 }}>
            Bilqis, the Incense Road,<br />
            and the geopolitics behind the visit.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '~950', label: 'BCE · Kingdom of Saba dominates trade', color: C.gold },
              { n: '1,500', label: 'miles from Ma\'rib to Jerusalem', color: C.lapis },
              { n: '4', label: 'tonnes of gold brought as a "gift"', color: C.amber },
              { n: '10,000', label: 'hectares irrigated by the Marib Dam', color: C.emerald },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: s.color, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4, maxWidth: 160 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.crimson}>The Problem</Micro>
          <Title>Three thousand years of rewriting</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>Three thousand years of retelling have reduced Bilqis to one of two stories. In the first, she is smitten — a woman drawn to Solomon by fascination, curiosity, or desire. In the second, she is converted — a pagan queen who encounters monotheism and surrenders. Both versions centre Solomon. Both erase the world she came from.</Prose>
          <Prose>The data tells a different story. Bilqis ruled the wealthiest trade monopoly on earth. She controlled the only product the ancient world could not live without. She did not go to Jerusalem because she was curious. She went because Solomon was building a fleet that would destroy her economy.</Prose>
        </Fade>
      </Sec>

      {/* ═══ HER WORLD ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.emerald}>Her World</Micro>
          <Title>The Kingdom of Saba</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>Capital: Ma'rib, in what is now Yemen. Not a desert outpost — an engineered agricultural superpower. The Marib Dam was one of the engineering marvels of the ancient world, turning desert bordering the Empty Quarter into the largest man-made oasis in pre-Islamic Arabia.</Prose>
        </Fade>
        <Fade delay={150}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 1, background: C.border, marginBottom: 32 }}>
            {DAM_STATS.map((s, i) => (
              <div key={i} style={{ background: C.bg, padding: 20 }}>
                <div style={{ fontFamily: F.serif, fontSize: 24, fontStyle: 'italic', color: C.emerald, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.ink, marginTop: 8 }}>{s.label}</div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 4 }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </Fade>
        <Fade delay={200}>
          <Prose>When the dam finally collapsed centuries later, the Quran recorded it: the Sayl al-'Arim, the Flood of the Dam (Surah 34:15–17). A civilisation that had turned desert into garden for over a millennium, undone.</Prose>
        </Fade>
      </Sec>

      {/* ═══ THE MONOPOLY ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.gold}>The Monopoly</Micro>
          <Title>The only product the ancient world could not live without</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>Incense was not a luxury good. It was infrastructure. Every temple in the ancient world — Egyptian, Greek, Babylonian, Israelite — <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>burned it daily</span>. Frankincense and myrrh were as essential as grain. The Temple in Jerusalem required specific formulations prescribed in Exodus 30:34: stacte, onycha, galbanum, and pure frankincense.</Prose>
          <Prose>Without supply from the Arabian Peninsula, the Temple could not function.</Prose>
          <Prose>The Sabaeans dominated this trade from approximately 950 BCE. Their camel caravans carried goods from the frankincense groves of Dhofar and Hadramawt, through Ma'rib for taxation and consolidation, north through the Hejaz and the Negev, to the port of Gaza and onward to the Mediterranean. Every caravan paid Sabaean taxes. Every transaction passed through Sabaean hands. Three thousand years later, the same routes carry <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>coffee from Ethiopia</span> and <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>spices from the Indian Ocean</span> — the geography of trade outlasts every empire that tries to control it.</Prose>
        </Fade>
        <Fade delay={200}>
          <div style={{ padding: 24, borderLeft: `3px solid ${C.gold}`, background: C.bg, marginBottom: 32 }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(17px, 2.5vw, 22px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.6, marginBottom: 8 }}>
              The archaeological proof
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>
              In 2023, epigrapher Dr. Daniel Vainstub of Ben-Gurion University re-analysed a jar found 300 metres from the Temple site in Jerusalem. The inscription was not Canaanite — it was Ancient South Arabian. Sabaean script. It read: "ladanum 5" — five units of an aromatic resin that is one of the four ingredients of Temple incense specified in Exodus 30:34. Written by a Sabaean speaker, on a locally made jar, before firing. A South Arabian trade official, living in Solomon's capital, managing the incense supply chain.
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 12 }}>
              Vainstub (2023), Jerusalem Journal of Archaeology, Hebrew University
            </p>
          </div>
        </Fade>
        <Fade delay={250}>
          <Prose>Not legend. A receipt.</Prose>
        </Fade>
      </Sec>

      {/* ═══ THE THREAT ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.crimson}>The Threat</Micro>
          <Title>Solomon's fleet</Title>
        </Fade>
        <Fade delay={100}>
          <div style={{ padding: 24, background: C.alt, marginBottom: 24 }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(16px, 2.5vw, 20px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.6 }}>
              "King Solomon built a fleet of ships at Ezion-geber, which is near Elath on the shore of the Red Sea, in the land of Edom. And Hiram sent with the fleet his servants, seamen who were familiar with the sea."
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 12 }}>1 Kings 9:26–27</p>
          </div>
        </Fade>
        <Fade delay={150}>
          <Prose>Ezion-geber. Gulf of Aqaba. The northern tip of the Red Sea. Solomon had built a port and a fleet — with Phoenician shipbuilders from Tyre, the best naval engineers in the Mediterranean. The destination: Ophir. "The land of gold." Most likely located near the Strait of Bab el-Mandeb — the same chokepoint that Sabaean commerce depended on.</Prose>
          <Prose>What Solomon was doing, stripped to mechanics: building a sea route that would bypass the overland incense road Saba taxed and controlled. Partnering with the dominant naval power (Tyre) to create a two-ocean trade network. Controlling the Negev land routes through which Sabaean caravans already passed.</Prose>
          <Prose>If the fleet succeeded, the monopoly breaks. The caravans become optional. The incense arrives by sea. Saba becomes irrelevant.</Prose>
        </Fade>
      </Sec>

      {/* ═══ THE DIPLOMATIC SEQUENCE ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.lapis}>The Diplomatic Sequence</Micro>
          <Title>Ten moves</Title>
        </Fade>
        <Fade delay={50}>
          <Prose>The Quran (Surah An-Naml 27:22–44) lays out the negotiation move by move. Read it as statecraft.</Prose>
        </Fade>
        {DIPLOMATIC_MOVES.map((m, i) => (
          <Fade key={m.move} delay={i * 20}>
            <div style={{ display: 'grid', gridTemplateColumns: 'clamp(36px, 5vw, 48px) clamp(60px, 10vw, 80px) 1fr', gap: 12, padding: '14px 0', borderBottom: `1px solid ${C.border}`, alignItems: 'baseline' }}>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.lapis, fontWeight: 700 }}>{m.move}</span>
              <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: m.actor === 'Bilqis' ? C.rose : m.actor === 'Solomon' ? C.lapis : C.sand }}>{m.actor}</span>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.7, color: C.body }}>{m.action}</div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 2 }}>{m.subtext}</div>
              </div>
            </div>
          </Fade>
        ))}
      </Sec>

      {/* ═══ THE QUESTION ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.rose}>The Question You're Actually Asking</Micro>
          <Title>Did they sleep together?</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>Here is what each source actually says:</Prose>
        </Fade>
        {SOURCE_CLAIMS.map((c, i) => (
          <Fade key={c.source} delay={i * 25}>
            <div onClick={() => setClaimExpanded(claimExpanded === i ? null : i)} style={{
              padding: '16px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink }}>{c.source}</span>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>{c.date}</span>
              </div>
              <div style={{ maxHeight: claimExpanded === i ? 500 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
                <div style={{ paddingTop: 12, display: 'grid', gap: 8 }}>
                  {[
                    { label: 'Sexual relationship', value: c.sleptTogether, color: C.rose },
                    { label: 'Child', value: c.child, color: C.amber },
                    { label: 'Marriage', value: c.marriage, color: C.lapis },
                    { label: 'Narrative purpose', value: c.purpose, color: C.emerald },
                  ].map((field, j) => (
                    <div key={j} style={{ display: 'grid', gridTemplateColumns: 'clamp(90px, 15vw, 130px) 1fr', gap: 8 }}>
                      <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: field.color }}>{field.label}</span>
                      <span style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.7, color: C.body }}>{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Fade>
        ))}
        <Fade delay={150}>
          <div style={{ marginTop: 32, padding: 24, background: C.rose + '10', borderLeft: `3px solid ${C.rose}` }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(17px, 2.5vw, 22px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.4, marginBottom: 12 }}>
              But here's the thing.
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body, marginBottom: 12 }}>
              In the fiction stories, they always fall in love. They always do — because the story is being told by someone who needs love to be the explanation. Romance makes the woman's journey about the man. If she went for love, Solomon is the centre of the story. If she went for trade, she is.
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body, marginBottom: 12 }}>
              But love and politics are not separate categories at this altitude. Solomon had 700 wives and 300 concubines. Every marriage was an alliance. Pharaoh's daughter sealed peace with Egypt. Marriage was foreign policy. A child was a contract.
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>
              If she did sleep with Solomon — and the Kebra Nagast says she did — it was not because she was smitten. A child between Saba and Israel would be the most powerful insurance policy in the ancient world. A living treaty. A bond no fleet could break. And if she didn't? If the Bible's silence is literal? She achieved the same result without it. The trade continued. The kingdom held. Either way, she won.
            </p>
          </div>
        </Fade>
      </Sec>

      {/* ═══ THE AFTERMATH ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.emerald}>The Aftermath</Micro>
          <Title>Who outlasted whom</Title>
        </Fade>
        {AFTERMATH.map((a, i) => (
          <Fade key={a.entity} delay={i * 30}>
            <div style={{ display: 'grid', gridTemplateColumns: 'clamp(120px, 20vw, 200px) 1fr', gap: 16, padding: '14px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: C.ink }}>{a.entity}</div>
              <div style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>{a.outcome}</div>
            </div>
          </Fade>
        ))}
      </Sec>

      {/* ═══ CLOSING ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.gold}>What Remains</Micro>
          <Title>Three religions claimed the same woman</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>The Hebrews made her a witness to Solomon's glory. The Quran made her a model of wise governance. The Ethiopians made her the mother of a dynasty. None of them asked what she wanted.</Prose>
          <Prose>The data says she wanted what every ruler of a trade monopoly wants when a military power threatens to bypass their position: a deal. She wanted to keep her throne, her trade routes, her dam, her temples, her people fed.</Prose>
          <Prose>She got all of it.</Prose>
          <Prose>The camels continued. The incense burned. The dam held for another thousand years. The kingdom of Saba outlasted Solomon's by centuries — his empire fractured immediately after his death, while hers endured until approximately 275 CE.</Prose>
          <Prose>She was not smitten. She was not submitting. She was negotiating — from a position of enormous wealth, with the full intelligence of what was at stake, having already rejected war and tested bribery and determined that only face-to-face diplomacy could preserve what she had built.</Prose>
        </Fade>
        <Fade delay={200}>
          <div style={{ marginTop: 32, padding: 24, borderLeft: `3px solid ${C.gold}`, background: C.alt }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(18px, 3vw, 26px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.3 }}>
              The 1,500-mile journey from Ma'rib to Jerusalem was not a pilgrimage. It was a board meeting.
            </p>
          </div>
        </Fade>
      </Sec>

      {/* ═══ MAP: THE INCENSE ROUTE ═══ */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">The Incense Route</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-6">Sheba controlled the frankincense. Solomon controlled the crossroads.</h2>
        <DWLRouteMap
          center={[42, 18]}
          zoom={4}
          height="480px"
          points={[
            { coords: [45.3, 15.4], label: 'Marib (Sheba capital)', color: '#E63946', size: 8 },
            { coords: [49.0, 14.5], label: 'Hadramaut (frankincense)', color: '#B45309', size: 7 },
            { coords: [54.1, 17.0], label: 'Dhofar (frankincense groves)', color: '#B45309', size: 7 },
            { coords: [35.2, 31.8], label: 'Jerusalem', color: '#FCBF49', size: 8 },
            { coords: [38.7, 15.3], label: 'Aksum', color: '#047857', size: 7 },
            { coords: [39.3, 12.6], label: 'Yeha (Sabaean temple)', color: '#047857', size: 5 },
            { coords: [36.5, 30.5], label: 'Aqaba / Ezion-Geber', color: '#5E60CE', size: 5 },
            { coords: [43.2, 13.0], label: 'Bab el-Mandeb (strait)', color: '#E63946', size: 5 },
            { coords: [31.2, 30.0], label: 'Memphis / Egypt', color: '#5E60CE', size: 5 },
          ]}
          lines={[
            { coords: [[54.1, 17.0], [49.0, 14.5], [45.3, 15.4]], color: '#B45309', width: 3, label: 'Frankincense harvest' },
            { coords: [[45.3, 15.4], [44, 17], [42, 22], [38, 28], [35.2, 31.8]], color: '#E63946', width: 3, label: 'Incense Road north' },
            { coords: [[45.3, 15.4], [43.2, 13.0], [38.7, 15.3]], color: '#047857', label: 'Across Red Sea' },
            { coords: [[35.2, 31.8], [31.2, 30.0]], color: '#5E60CE', dashed: true, label: 'To Egypt' },
          ]}
        />
      </div></section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ padding: '64px 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {[
            '1 Kings 9:26–28, 10:1–13. Hebrew Bible. Solomon\'s fleet, Queen of Sheba\'s visit.',
            'Quran, Surah An-Naml (27:22–44), Surah Saba (34:15–17). Bilqis narrative, Marib Dam collapse.',
            'Vainstub, Daniel (2023). "Incense from Sheba for the Jerusalem Temple." Jerusalem Journal of Archaeology. Hebrew University.',
            'Kebra Nagast (~14th century CE). Ethiopian royal chronicle. Makeda, Solomon, Menelik I, Ark of the Covenant.',
            'Encyclopaedia Britannica. "Ma\'rib." Marib Dam engineering specifications.',
            'UNESCO World Heritage Centre. "Landmarks of the Ancient Kingdom of Saba, Marib." WHC nomination.',
            'World History Encyclopedia. "Kingdom of Saba." Incense trade routes, Minean-Sabaean transition.',
            'Haeri, Shahla (2015). The Unforgettable Queens of Islam. Cambridge University Press. Bilqis political analysis.',
            'Josephus, Antiquities of the Jews 8:165–173. Queen of Sheba identified with Egypt and Ethiopia.',
            'Wiseman, D.J. Commentary on 1 Kings. "Hard questions" as diplomatic and ethical assessment.',
            'Marzagora, Sara. Research on Solomonic descent as religious rather than literal genealogy.',
            '1 Kings 11:3. Solomon\'s 700 wives and 300 concubines — marriage as foreign policy.',
          ].map((b, i) => (
            <p key={i} style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      {/* ═══ CONNECTED MODULES ═══ */}
      <section style={{ borderTop: '1px solid #e5e5e5', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 24 }}>Continue Reading</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { href: '/stories/what-solomon-knew', title: 'What Solomon Knew', sub: 'The unified knowledge system Bilqis came to test.' },
              { href: '/stories/the-son-who-took-the-fire', title: 'The Son Who Took the Fire', sub: 'Menelik I — what the visit produced. The Ark moves south.' },
              { href: '/stories/the-coffee-covenant', title: 'The Coffee Covenant', sub: 'The Ethiopia–Yemen corridor Sheba controlled. Kaffa to Mocha.' },
              { href: '/stories/the-silk-road-into-africa', title: 'The Silk Road Into Africa', sub: 'The incense routes that made Sheba wealthy.' },
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
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Queen Who Did Not Kneel</span>
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
