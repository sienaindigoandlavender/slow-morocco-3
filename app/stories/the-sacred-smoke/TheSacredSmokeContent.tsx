'use client'

import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════
   THE SACRED SMOKE
   Data Module · Slow Morocco
   /stories/the-sacred-smoke

   Every civilisation burned something precious
   and called it prayer. This is the map.
   ═══════════════════════════════════════════════════════ */

const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}

const C = {
  bg: '#ffffff',
  alt: '#fafafa',
  ink: '#0a0a0a',
  body: '#262626',
  muted: '#737373',
  secondary: '#525252',
  border: '#e5e5e5',
  light: '#f5f5f5',
}

// DWL data vis palette (12-color)
const P = {
  red: '#E63946',
  orange: '#F77F00',
  gold: '#FCBF49',
  cream: '#EAE2B7',
  salmon: '#F4845F',
  cyan: '#48BFE3',
  mint: '#72EFDD',
  teal: '#64DFDF',
  indigo: '#5E60CE',
  purple: '#7B2D8E',
  navy: '#3A0CA3',
  dark: '#1B1B3A',
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ─── Data ─── */

const MOROCCAN_INCENSE = [
  { name: 'Louban', arabic: 'لبان', source: 'Boswellia sacra — Oman, Somalia', fn: 'Purest purification. Drives out negative energy.', color: P.gold },
  { name: 'Fassoukh', arabic: 'فاسوخ', source: 'Wild plants of the Maghreb (endemic)', fn: 'White: general cleansing. Black: deep ritual. Named for ability to "decipher" sorcery.', color: P.purple },
  { name: 'Jawi', arabic: 'جاوي', source: 'Styrax trees — Southeast Asia', fn: 'Black & red varieties. Long-lasting, sweet. Healing.', color: P.red },
  { name: 'Harmel', arabic: 'حرمل', source: 'Peganum harmala — North Africa', fn: 'Protection against the evil eye. Burned across the Maghreb.', color: P.orange },
  { name: 'Myrrh', arabic: 'مر', source: 'Commiphora — Horn of Africa, Arabia', fn: 'Deep, bitter. Protection. Complements frankincense.', color: P.salmon },
  { name: 'Oud', arabic: 'عود', source: 'Aquilaria (agarwood) — Southeast Asia', fn: 'Highest value. Spiritual elevation. Status.', color: P.indigo },
]

interface Tradition {
  name: string
  plant: string
  region: string
  date: string
  fn: string
  active: string
  color: string
  angle: number
  independent: boolean
}

const TRADITIONS: Tradition[] = [
  { name: 'Morocco / Maghreb', plant: 'Bkhour (frankincense, fassoukh, harmel)', region: 'North Africa', date: 'Pre-Islamic', fn: 'Purification, baraka, protection', active: 'Every Friday', color: P.red, angle: 0, independent: false },
  { name: 'Ancient Egypt', plant: 'Frankincense + myrrh', region: 'Nile Valley', date: '~2500 BCE', fn: 'Temple offerings, embalming, divine communication', active: 'Coptic Church', color: P.gold, angle: 30, independent: false },
  { name: 'Ancient Israel', plant: 'Ketoret (frankincense blend)', region: 'Levant', date: '~1000 BCE', fn: 'Burnt before the Ark of the Covenant', active: 'Synagogue tradition', color: P.orange, angle: 60, independent: false },
  { name: 'Catholic Church', plant: 'Frankincense (olibanum)', region: 'Global', date: '~4th century CE', fn: 'Prayers rising to heaven. Censing altars.', active: 'Every Mass', color: P.salmon, angle: 90, independent: false },
  { name: 'Arabian Gulf', plant: 'Oud (bakhoor / agarwood)', region: 'Arabian Peninsula', date: 'Ancient', fn: 'Fumigating clothes, homes. Spiritual elevation.', active: 'Daily', color: P.cyan, angle: 120, independent: false },
  { name: 'Hindu India', plant: 'Sandalwood (chandan)', region: 'South Asia', date: '~1500 BCE', fn: 'Anointing deities, temple puja, cremation', active: 'Every temple, every day', color: P.teal, angle: 150, independent: true },
  { name: 'Buddhist East Asia', plant: 'Sandalwood + agarwood + camphor', region: 'China, Japan, SE Asia', date: '~500 BCE', fn: 'Honouring the Buddha. Reminder of transience.', active: 'Temples across Asia', color: P.mint, angle: 180, independent: true },
  { name: 'Japan (Koh-dō)', plant: 'Koh (agarwood, sandalwood, clove)', region: 'Japan', date: '754 CE', fn: '"The Way of Incense." Elevated to art form.', active: 'Koh-dō ceremonies', color: P.indigo, angle: 210, independent: true },
  { name: 'Mesoamerica (Maya/Aztec)', plant: 'Copal (copalli / pom)', region: 'Mexico, Central America', date: '~1000 BCE+', fn: 'Food of the gods. Burned atop pyramids.', active: 'Día de los Muertos', color: P.purple, angle: 240, independent: true },
  { name: 'Andes (Inca)', plant: 'Palo santo ("holy wood")', region: 'Ecuador, Peru', date: 'Pre-Incan', fn: 'Purification, healing. Tree must die naturally.', active: 'Shamanic practice', color: P.navy, angle: 270, independent: true },
  { name: 'Native North America', plant: 'White sage + cedar + sweetgrass', region: 'Plains, Southwest, Pacific NW', date: '1000+ years', fn: 'Sage clears. Cedar protects. Sweetgrass invites.', active: 'Ceremony (survived suppression)', color: P.dark, angle: 300, independent: true },
  { name: 'Celtic / Northern Europe', plant: 'Juniper + mugwort + pine', region: 'British Isles, Scandinavia', date: 'Pre-Christian', fn: 'Saining — purification of newborns, thresholds.', active: 'Folk revival', color: P.red, angle: 330, independent: false },
]

const CONVERGENT = [
  { id: 1, pattern: 'The plant bleeds', detail: 'The sacred substance is a wound product — resin that seeps from cuts in bark. The offering comes from injury.', example: 'Frankincense: harvesters cut Boswellia bark, resin "bleeds" and hardens. Copal: Nahuatl iezzo cuahuitl = "blood of the trees."' },
  { id: 2, pattern: 'Smoke rises', detail: 'Upward movement = prayer reaching the divine. Every tradition reads vertical smoke as spiritual communication.', example: 'Psalm 141:2: "Let my prayer rise as incense." Aztec: copal offered to the four winds. Buddhist: smoke glyphs in Dunhuang caves.' },
  { id: 3, pattern: 'Purification precedes prayer', detail: 'Smoke cleanses before the sacred act begins. The space must be cleared before the divine can enter.', example: 'Moroccan taqkhir: cleanse home, then invite baraka. Aztec priests fumigated the Spanish before negotiation. Lakota: sage clears for ceremony.' },
  { id: 4, pattern: 'The substance is precious', detail: 'What is burned is never common. It is rare, expensive, difficult to harvest, slow to grow. The offering must cost something.', example: 'Nero burned a year\'s frankincense harvest at one funeral. Palo santo must lie dead 4–10 years. Oud is among the most expensive raw materials on earth.' },
  { id: 5, pattern: 'The practice survives suppression', detail: 'Colonial and religious authorities have repeatedly tried to eliminate these practices. The smoke kept rising.', example: 'Native ceremonies banned — sage burned behind closed doors. Aztec copal survived conquest, was adopted into Church. Moroccan bkhour outlasted every dynasty.' },
]

const BIG_NUMBERS = [
  { n: '5,000+', unit: 'years', label: 'of continuous frankincense trade', color: P.gold },
  { n: '3,000', unit: 'tons/year', label: 'shipped from Arabia to Rome at peak (2nd c. CE)', color: P.orange },
  { n: '$6.5B', unit: '', label: 'global incense market (2020), growing 5.3%/year', color: P.red },
  { n: '90%', unit: '', label: 'of world frankincense from Horn of Africa', color: P.cyan },
  { n: '94%', unit: '', label: 'of airborne bacteria cleared by burning sage', color: P.mint },
  { n: '12', unit: 'traditions', label: 'on 6 continents — at least 5 with no shared origin', color: P.purple },
]

/* ─── Components ─── */

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView()
  return <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms` }}>{children}</div>
}

function Micro({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color, marginBottom: 16 }}>{children}</div>
}

function Title({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>{children}</h2>
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.85, color: C.body, marginBottom: 20, maxWidth: 640 }}>{children}</p>
}

/* ─── Radial Smoke Viz ─── */

function RadialSmokeViz({ hovered, onHover }: { hovered: number | null; onHover: (i: number | null) => void }) {
  const { ref, inView } = useInView(0.2)
  const cx = 300, cy = 300, R = 240, innerR = 60

  return (
    <div ref={ref} style={{ width: '100%', maxWidth: 620, margin: '0 auto', aspectRatio: '1' }}>
      <svg viewBox="0 0 600 600" style={{ width: '100%', height: '100%' }}>
        <defs>
          {TRADITIONS.map((t, i) => (
            <radialGradient key={`g${i}`} id={`smoke-grad-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={t.color} stopOpacity={0.6} />
              <stop offset="100%" stopColor={t.color} stopOpacity={0} />
            </radialGradient>
          ))}
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={P.gold} stopOpacity={0.3} />
            <stop offset="60%" stopColor={P.gold} stopOpacity={0.05} />
            <stop offset="100%" stopColor={P.gold} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx={cx} cy={cy} r={innerR + 20} fill="url(#center-glow)" />

        {/* Tradition lines and dots */}
        {TRADITIONS.map((t, i) => {
          const rad = (t.angle - 90) * Math.PI / 180
          const x2 = cx + R * Math.cos(rad)
          const y2 = cy + R * Math.sin(rad)
          const x1 = cx + innerR * Math.cos(rad)
          const y1 = cy + innerR * Math.sin(rad)
          const dimmed = hovered !== null && hovered !== i
          const active = hovered === i

          return (
            <g
              key={i}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              style={{ cursor: 'pointer', transition: 'opacity 0.4s ease', opacity: inView ? (dimmed ? 0.15 : 1) : 0 }}
            >
              {/* Smoke tendril line */}
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={t.color}
                strokeWidth={active ? 3 : 1.5}
                strokeDasharray={t.independent ? 'none' : '4 4'}
                style={{ transition: 'all 0.3s ease' }}
              />

              {/* Outer dot */}
              <circle
                cx={x2} cy={y2} r={active ? 10 : 6}
                fill={t.color}
                style={{ transition: 'all 0.3s ease' }}
              />
              {active && (
                <circle cx={x2} cy={y2} r={18} fill={t.color} opacity={0.15} />
              )}

              {/* Label */}
              <text
                x={x2 + (Math.cos(rad) > 0.1 ? 16 : Math.cos(rad) < -0.1 ? -16 : 0)}
                y={y2 + (Math.sin(rad) > 0.1 ? 4 : Math.sin(rad) < -0.1 ? -8 : 0)}
                textAnchor={Math.cos(rad) > 0.1 ? 'start' : Math.cos(rad) < -0.1 ? 'end' : 'middle'}
                fontFamily={F.mono}
                fontSize={active ? 11 : 9}
                fontWeight={active ? 700 : 500}
                fill={C.ink}
                style={{ transition: 'all 0.3s ease' }}
              >
                {t.name}
              </text>
            </g>
          )
        })}

        {/* Center label */}
        <text x={cx} y={cy - 6} textAnchor="middle" fontFamily={F.serif} fontSize={14} fontStyle="italic" fill={C.ink}>Sacred</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontFamily={F.serif} fontSize={14} fontStyle="italic" fill={C.ink}>Smoke</text>
      </svg>
    </div>
  )
}

/* ─── Main Component ─── */

export function TheSacredSmokeContent() {
  const [hoveredTradition, setHoveredTradition] = useState<number | null>(null)
  const [expandedConvergent, setExpandedConvergent] = useState<number | null>(null)

  const ht = hoveredTradition !== null ? TRADITIONS[hoveredTradition] : null

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 60px', maxWidth: 960, margin: '0 auto' }}>
        <Fade><Micro color={P.red}>Data Module · Cultural Intelligence</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(44px, 8vw, 96px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: 24 }}>
            The Sacred Smoke
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.mono, fontSize: 'clamp(14px, 2vw, 18px)', lineHeight: 1.7, color: C.body, maxWidth: 560 }}>
            Every civilisation burned something precious and called it prayer. Twelve traditions. Six continents. At least five with no shared origin. The same instinct, everywhere: let the smoke rise.
          </p>
        </Fade>
      </section>

      {/* ── BIG NUMBERS ── */}
      <section style={{ padding: '48px 24px 64px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 32 }}>
          {BIG_NUMBERS.map((bn, i) => (
            <Fade key={i} delay={i * 60}>
              <div>
                <div style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 4vw, 40px)', fontStyle: 'italic', color: bn.color, lineHeight: 1 }}>
                  {bn.n}<span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: C.muted, marginLeft: 4 }}>{bn.unit}</span>
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.5, color: C.secondary, marginTop: 6 }}>{bn.label}</div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ── MOROCCO FIRST ── */}
      <section style={{ padding: '80px 24px', background: C.ink }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Fade>
            <Micro color={P.gold}>The Starting Point</Micro>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 5vw, 48px)', fontStyle: 'italic', color: '#ffffff', lineHeight: 1.05, marginBottom: 32, letterSpacing: '-0.02em' }}>
              Morocco's bkhour table is a map of the ancient world
            </h2>
          </Fade>
          <Fade delay={100}>
            <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.85, color: 'rgba(255,255,255,0.7)', marginBottom: 32, maxWidth: 640 }}>
              Every Friday, families perform taqkhir — burning incense to cleanse the home and attract baraka. The practice has two roots that predate Islam: Amazigh purification rituals using local plants, and trans-Saharan trade that brought resins from Arabia and East Africa.
            </p>
          </Fade>

          {/* Moroccan incense grid */}
          <div style={{ display: 'grid', gap: 1, background: 'rgba(255,255,255,0.08)' }}>
            {MOROCCAN_INCENSE.map((inc, i) => (
              <Fade key={inc.name} delay={i * 40}>
                <div style={{ background: C.ink, padding: '20px 24px', display: 'grid', gridTemplateColumns: 'clamp(80px, 12vw, 120px) 1fr', gap: 16, alignItems: 'start' }}>
                  <div>
                    <div style={{ fontFamily: F.serif, fontSize: 22, fontStyle: 'italic', color: inc.color, lineHeight: 1 }}>{inc.name}</div>
                    <div style={{ fontFamily: F.mono, fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{inc.arabic}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{inc.source}</div>
                    <div style={{ fontFamily: F.mono, fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{inc.fn}</div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── RADIAL VIZ ── */}
      <section style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Fade>
            <Micro color={P.purple}>The Convergence</Micro>
            <Title>12 traditions. 6 continents. The same instinct.</Title>
          </Fade>
          <Fade delay={50}>
            <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.85, color: C.secondary, marginBottom: 8, maxWidth: 640 }}>
              Solid lines = connected by trade routes. Dashed = no known contact. Hover to explore.
            </p>
          </Fade>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32, marginTop: 24 }}>
            <RadialSmokeViz hovered={hoveredTradition} onHover={setHoveredTradition} />

            {/* Detail card */}
            <div style={{ minHeight: 120, padding: 24, background: C.alt, transition: 'all 0.3s ease' }}>
              {ht ? (
                <div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: F.serif, fontSize: 24, fontStyle: 'italic', color: ht.color }}>{ht.name}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: ht.independent ? P.purple : C.muted }}>{ht.independent ? 'Independent origin' : 'Trade-connected'}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 4 }}>Plant / Resin</div>
                      <div style={{ fontFamily: F.mono, fontSize: 14, color: C.body }}>{ht.plant}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 4 }}>First recorded</div>
                      <div style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: ht.color }}>{ht.date}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 4 }}>Function</div>
                      <div style={{ fontFamily: F.mono, fontSize: 13, color: C.body, lineHeight: 1.6 }}>{ht.fn}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 4 }}>Still active</div>
                      <div style={{ fontFamily: F.mono, fontSize: 14, color: C.body, fontWeight: 600 }}>{ht.active}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ fontFamily: F.mono, fontSize: 13, color: C.muted }}>Hover a tradition to explore</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FIVE PATTERNS ── */}
      <section style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}`, background: C.alt }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Fade>
            <Micro color={P.red}>The Pattern</Micro>
            <Title>Five elements every tradition shares — with no contact between them</Title>
          </Fade>

          {CONVERGENT.map((c, i) => (
            <Fade key={c.id} delay={i * 40}>
              <div
                onClick={() => setExpandedConvergent(expandedConvergent === i ? null : i)}
                style={{ borderBottom: `1px solid ${C.border}`, cursor: 'pointer', padding: '20px 0' }}
              >
                <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: F.serif, fontSize: 32, fontStyle: 'italic', color: [P.red, P.gold, P.cyan, P.purple, P.orange][i], lineHeight: 1 }}>{c.id}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: F.serif, fontSize: 22, fontStyle: 'italic', color: C.ink, marginBottom: 4 }}>{c.pattern}</div>
                    <div style={{ fontFamily: F.mono, fontSize: 13, color: C.secondary, lineHeight: 1.7 }}>{c.detail}</div>
                  </div>
                  <span style={{ fontFamily: F.mono, fontSize: 18, color: C.muted, transition: 'transform 0.3s', transform: expandedConvergent === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </div>
                <div style={{ maxHeight: expandedConvergent === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
                  <div style={{ padding: '12px 0 0 48px' }}>
                    <div style={{ fontFamily: F.mono, fontSize: 12, color: C.body, lineHeight: 1.85, padding: 16, background: C.bg, borderLeft: `3px solid ${[P.red, P.gold, P.cyan, P.purple, P.orange][i]}` }}>
                      {c.example}
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ── BILQIS CONNECTION ── */}
      <section style={{ padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Fade>
            <Micro color={P.gold}>The Connection</Micro>
            <Title>Bilqis's monopoly was the supply of prayer itself</Title>
          </Fade>
          <Fade delay={100}>
            <Prose>This data story connects directly to "The Queen Who Did Not Kneel." Bilqis's entire monopoly — the reason she went to Jerusalem, the reason Solomon's Red Sea fleet threatened her — rested on frankincense and myrrh.</Prose>
            <Prose>Every temple in the ancient world required them. Egypt burned them for the dead. Israel burned them before the Ark. Rome burned 3,000 tons a year. The Ophel jar found 300 metres from Solomon's Temple, inscribed in Sabaean script — "ladanum 5" — was a Sabaean trade official managing the Temple's incense supply chain.</Prose>
            <Prose>When Solomon built a fleet to bypass the overland route, he wasn't threatening a luxury trade. He was threatening the supply of prayer itself.</Prose>
          </Fade>
        </div>
      </section>

      {/* ── SOURCES ── */}
      <section style={{ padding: '64px 24px', background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {[
            'UNESCO. "Land of Frankincense" (Oman, 2000). "Incense Route — Desert Cities in the Negev" (2005).',
            'Wikipedia. "Incense trade route." "Frankincense." South Arabian production, 5,000-year trade.',
            'Lapham\'s Quarterly / Pearlstine. "A Brief History of Frankincense." 3,000 tons/year at peak.',
            'Grand View Research. Global incense market $6.5B (2020), 5.3% CAGR.',
            'Esentiara. "Encens marocain." Taqkhir ritual, Amazigh roots, Friday cycle.',
            'Harvard ReVista / Mendoza Nunziato. "Sacred Smoke of Copal." Bernal Díaz del Castillo, Mesoamerican cosmovision.',
            'PubMed. "Sacred Maya incense, copal, has antianxiety effects." GABAergic mechanisms confirmed.',
            'HUM. "Sacred Smoke." Sandalwood in Vedic texts, Koh-dō, agarwood traditions.',
            'Smithsonian National Museum of Asian Art. "Ancient Incense Trade." 8th c. BCE origins.',
          ].map((s, i) => (
            <p key={i} style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, marginBottom: 6, paddingLeft: 20, textIndent: -20 }}>{s}</p>
          ))}
        </div>
      </section>

      {/* ── COPYRIGHT ── */}
      <section style={{ padding: '24px', background: C.light, textAlign: 'center' as const }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>
          © {new Date().getFullYear()} Slow Morocco. All rights reserved. This visualization may not be reproduced without visible attribution.
        </p>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Sacred Smoke · Data Module</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco</span>
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
