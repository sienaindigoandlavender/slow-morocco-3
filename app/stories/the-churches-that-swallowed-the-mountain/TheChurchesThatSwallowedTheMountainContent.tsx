'use client'

import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════
   THE CHURCHES THAT SWALLOWED THE MOUNTAIN
   Lalibela, the Zagwe Dynasty, and the Architecture
   That Survived Its Own Erasure
   Knowledge Series · Slow Morocco
   ═══════════════════════════════════════════════════════ */

const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  muted: '#737373', border: '#e5e5e5',
  gold: '#B8860B', amber: '#C4963C',
  iron: '#4A4A4A', emerald: '#2D6E4F', crimson: '#8B1A1A',
  lapis: '#1E3A5F', smoke: '#6B5B73', sand: '#8B7D6B',
  terracotta: '#A0522D', stone: '#6B5B4F',
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

const CHURCHES = [
  { name: 'Biete Medhane Alem', type: 'Monolithic', dims: '33m × 22m × 10m', note: 'Largest monolithic church in the world. Five aisles. Houses the Lalibela Cross.', group: 'north' },
  { name: 'Biete Maryam', type: 'Semi-monolithic', dims: '—', note: 'Possibly oldest (7th century). Vivid painted walls. Windows encode the crucifixion narrative.', group: 'north' },
  { name: 'Biete Giyorgis', type: 'Monolithic', dims: '12m × 12m × 12m', note: 'Perfect cruciform plan. Three stories. 40 feet deep. The masterpiece.', group: 'alone' },
  { name: 'Biete Amanuel', type: 'Monolithic', dims: '—', note: 'Replicates Aksumite beam-and-mortar architecture in solid stone. Stepped podium.', group: 'south' },
  { name: 'Biete Golgotha Mikael', type: 'Semi-monolithic', dims: '—', note: 'Bas-relief human figures. Said to contain the tomb of King Lalibela.', group: 'north' },
  { name: 'Biete Denagel', type: 'Semi-monolithic', dims: '—', note: 'House of Virgins.', group: 'north' },
  { name: 'Biete Maskal', type: 'Semi-monolithic', dims: '—', note: 'House of the Cross.', group: 'north' },
  { name: 'Biete Gabriel-Rufael', type: 'Semi-monolithic', dims: '—', note: 'May have originally been a royal palace.', group: 'south' },
  { name: 'Biete Qeddus Mercoreus', type: 'Semi-monolithic', dims: '—', note: 'May have originally been a prison.', group: 'south' },
  { name: 'Biete Abba Libanos', type: 'Semi-monolithic', dims: '—', note: 'Built by Queen Masqal Kibra as memorial. Walkways connect to landscape above.', group: 'south' },
  { name: 'Biete Lehem', type: 'Semi-monolithic', dims: '—', note: 'House of Holy Bread.', group: 'south' },
]

const BUILD_STEPS = [
  { step: '01', title: 'Trace', detail: 'Mark the perimeter of the church on the surface of the rock face.' },
  { step: '02', title: 'Trench', detail: 'Excavate deep trenches around the perimeter — cutting a block of solid stone free from the mountain on all sides.' },
  { step: '03', title: 'Carve exterior', detail: 'Working from the top down, shape the roof, walls, windows, doors. Everything from the outside in, starting at what will become the ceiling.' },
  { step: '04', title: 'Hollow interior', detail: 'Carve columns, arches, naves, barrel vaults, domes — all from the same continuous block. Every chisel stroke is permanent. There is no adding back.' },
  { step: '05', title: 'Drain', detail: 'Excavate drainage systems to prevent flooding from artesian water sources. Carve tunnels, ceremonial passages, a stream they named the River Jordan.' },
]

// Components
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView()
  return <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms` }}>{children}</div>
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

export function TheChurchesThatSwallowedTheMountainContent() {
  const [expandedChurch, setExpandedChurch] = useState<number | null>(null)

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* HERO */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <Fade><Micro>Knowledge · Cultural Intelligence</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            The Churches That<br />Swallowed the Mountain
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 560 }}>
            Lalibela, the Zagwe Dynasty,<br />
            and the architecture that survived<br />its own erasure.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '11', label: 'churches carved from living rock', color: C.terracotta },
              { n: '800+', label: 'years standing', color: C.stone },
              { n: '2,630m', label: 'elevation above sea level', color: C.lapis },
              { n: '24', label: 'years to build (traditional)', color: C.emerald },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: s.color, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4, maxWidth: 160 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* THE IRONY */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.crimson}>The Irony</Micro>
          <Title>The &ldquo;usurpers&rdquo; built this</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>In the last story, we traced how the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Kebra Nagast was compiled between 1314 and 1322</span> to legitimise a coup — how six Tigrayan scribes declared the Zagwe dynasty usurpers and built a mythological bloodline that would rule Ethiopia for 704 years.</Prose>
          <Prose>Here is what the &ldquo;usurpers&rdquo; actually built.</Prose>
          <Prose>Eleven churches. Carved not from blocks hauled up a hillside, but from the living rock of the earth itself. Carved downward. You do not approach them. You descend into them. Their roofs sit at ground level. The architecture is below you before you see it.</Prose>
          <Prose>The Solomonic dynasty needed a 117-chapter book to justify their rule. The Zagwe left something the book could not erase: stone.</Prose>
        </Fade>
      </Sec>

      {/* THE METHOD */}
      <Sec>
        <Fade>
          <Micro color={C.terracotta}>The Method</Micro>
          <Title>How you carve a church out of a mountain</Title>
        </Fade>
        <Fade delay={50}>
          <Prose>You do not build. You remove. This is subtractive architecture — the opposite of every construction method the world has known. Humans have been <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>stacking stones</span> for millennia. Lalibela inverted the instinct.</Prose>
        </Fade>
        {BUILD_STEPS.map((s, i) => (
          <Fade key={s.step} delay={i * 30}>
            <div style={{ display: 'grid', gridTemplateColumns: 'clamp(36px, 5vw, 48px) 1fr', gap: 16, padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 700, color: C.terracotta }}>{s.step}</span>
              <div>
                <div style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>{s.detail}</div>
              </div>
            </div>
          </Fade>
        ))}
        <Fade delay={200}>
          <div style={{ marginTop: 24, padding: 24, background: C.alt, borderLeft: `3px solid ${C.stone}` }}>
            <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>
              Tools used: hammers and chisels. The rock is scoriaceous basalt — volcanic, porous, iron-rich, which gives it a red colour. According to legend, men worked during the day and angels worked through the night.
            </p>
          </div>
        </Fade>
      </Sec>

      {/* THE ELEVEN */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.stone}>The Eleven</Micro>
          <Title>Four monolithic. Seven semi-monolithic. All connected by tunnels.</Title>
        </Fade>
        {CHURCHES.map((ch, i) => (
          <Fade key={ch.name} delay={i * 15}>
            <div
              onClick={() => setExpandedChurch(expandedChurch === i ? null : i)}
              style={{ padding: '14px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink }}>{ch.name}</span>
                <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: ch.type === 'Monolithic' ? C.terracotta : C.stone }}>{ch.type}</span>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}>{ch.group === 'north' ? 'Northern group' : ch.group === 'south' ? 'Southeastern group' : 'Stands alone'}</span>
              </div>
              <div style={{ maxHeight: expandedChurch === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                <div style={{ padding: '8px 0' }}>
                  {ch.dims !== '—' && <p style={{ fontFamily: F.mono, fontSize: 12, color: C.terracotta, marginBottom: 4 }}>{ch.dims}</p>}
                  <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.85, color: C.body }}>{ch.note}</p>
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </Sec>

      {/* ACCESSIBILITY */}
      <Sec>
        <Fade>
          <Micro color={C.lapis}>The Accessibility Question</Micro>
          <Title>What your body can actually do there</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>This is not a museum. It is not flat. It was designed to be difficult — the idea being that reaching God is not an easy path.</Prose>
        </Fade>
        <Fade delay={150}>
          <div style={{ display: 'grid', gap: 1, background: C.border, marginBottom: 32 }}>
            {[
              { site: 'Lalibela main complex', difficulty: 'Moderate', detail: 'Carved stone steps, narrow trenches, uneven surfaces. No railings. Some pitch-dark tunnels. Altitude: 2,630m. Manageable with care, time, and a guide.', color: C.emerald },
              { site: 'Biete Giyorgis (St. George)', difficulty: 'Moderate', detail: 'The trench approach is long but relatively level. Can be viewed from above without descending. The cruciform shape is visible from ground level.', color: C.emerald },
              { site: 'Asheton Monastery', difficulty: 'Strenuous', detail: '5 km from Lalibela, steep ascent. Inhabited by one monk. Ancient Bible. Rewarding trek with views and pilgrim encounters.', color: C.amber },
              { site: 'Abuna Yemata Guh (Tigray)', difficulty: 'Extreme', detail: '30-min steep hike + near-vertical rock climb, 1,000-ft drop. No harnesses anymore. Called the least accessible place of worship on Earth. Mothers with babies do it daily.', color: C.crimson },
            ].map((s, i) => (
              <div key={i} style={{ background: C.bg, padding: 20 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink }}>{s.site}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: s.color }}>{s.difficulty}</span>
                </div>
                <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.85, color: C.body }}>{s.detail}</p>
              </div>
            ))}
          </div>
        </Fade>
        <Fade delay={200}>
          <Prose>During major festivals — Genna (January 7), Timkat (January 20) — up to 100,000 pilgrims arrive, including the very old and the very young. Everyone sets their own pace. The churches are living sites, not exhibits.</Prose>
        </Fade>
      </Sec>

      {/* POLITICAL CONTEXT */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.smoke}>The Political Context</Micro>
          <Title>The Zagwe&rsquo;s answer was not a genealogy. It was architecture.</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>The Zagwe faced a legitimacy problem from the start. They could not claim descent from the Aksumite kings. Their answer: by building a physical Jerusalem in Ethiopia, they asserted that God&rsquo;s favour had shifted to their dynasty. They did not need Solomon&rsquo;s blood. They had Solomon&rsquo;s city.</Prose>
          <Prose>This is the same argument the Kebra Nagast would later make against them — but the Zagwe made it in stone, not in text. Their Jerusalem was not a 117-chapter story. It was 11 churches you could walk into.</Prose>
          <Prose>Three Zagwe kings were canonised as saints by the Ethiopian Orthodox Church. The dynasty that replaced them never received that honour.</Prose>
        </Fade>
      </Sec>

      {/* CLOSING */}
      <Sec>
        <Fade>
          <Micro color={C.terracotta}>What Survived</Micro>
          <Title>The story tried to bury them. The stone did not cooperate.</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>The Solomonic dynasty ruled for 704 years. They wrote the Kebra Nagast. They enshrined their bloodline in two constitutions. They dismissed the Zagwe as illegitimate.</Prose>
          <Prose>The churches of Lalibela have stood for 800 years.</Prose>
          <Prose>UNESCO declared them a World Heritage Site in 1978 — four years after the dynasty that tried to erase the Zagwe was itself overthrown.</Prose>
          <Prose>Every year, hundreds of thousands of pilgrims — dressed in white, carrying frankincense, chanting prayers that echo through the tunnels — descend into the rock to worship. The churches are not monuments. They are not ruins. They are active. They are in use. Every single day.</Prose>
        </Fade>
        <Fade delay={200}>
          <div style={{ marginTop: 32, padding: 24, borderLeft: `3px solid ${C.terracotta}`, background: C.alt }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(17px, 2.5vw, 24px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.3 }}>
              The &ldquo;usurpers&rdquo; became saints. The &ldquo;legitimate&rdquo; dynasty wrote the book. The churches outlasted both.
            </p>
          </div>
        </Fade>
      </Sec>

      {/* SOURCES */}
      <section style={{ padding: '64px 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {[
            'UNESCO World Heritage Centre. "Rock-Hewn Churches, Lalibela." Inscription 1978.',
            'Metropolitan Museum of Art. "The Rock-hewn Churches of Lalibela." Construction methodology, Aksumite revival, dating.',
            'Wikipedia. "Rock-Hewn Churches, Lalibela." Construction phases, church typology, dimensions.',
            'CBS News / 60 Minutes. "Lalibela: 11 churches." Fasil Giorghis interview, lava geology.',
            'Biblical Archaeology Society. "The Rock-Hewn Churches of Lalibela." Beta Giyorgis analysis.',
            'Derat, Marie-Laure. "Constructing a Global Monument in Africa." Small Jerusalem vs New Jerusalem, Zagwe political theology.',
            'EBSCO Research. "Lalibela." Biography, succession crisis, trade recovery.',
            'Asaase Radio. "The Zagwe Dynasty — Ethiopia\'s Forgotten Christian Empire." Solomonic erasure, canonised kings.',
            'Phillipson, David. Ancient Churches of Ethiopia. Earlier dating hypothesis (600–800 CE for some structures).',
          ].map((b, i) => (
            <p key={i} style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      {/* CONTINUE READING */}
      <section style={{ borderTop: '1px solid #e5e5e5', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 24 }}>Continue Reading</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { title: 'The Son Who Took the Fire', sub: 'The Solomonic claim that Lalibela\'s builders worked to fulfil.' },
              { title: 'The Stone Language', sub: 'When every culture stacks rocks. The convergent instinct Lalibela took further.' },
              { title: 'The Coffee Covenant', sub: 'Ethiopia\'s other sacred ritual — the buna ceremony.' },
              { title: 'The Lion\'s Road', sub: 'The Asiatic lion and the symbol that crowned Ethiopian kings.' },
            ].map(l => (
              <span key={l.title} style={{ display: 'block', padding: '16px 20px', background: C.alt, borderRadius: 2, textDecoration: 'none' }}>
                <p style={{ fontFamily: F.serif, fontSize: 16, fontStyle: 'italic', color: C.ink, marginBottom: 4, lineHeight: 1.3 }}>{l.title}</p>
                <p style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, lineHeight: 1.5 }}>{l.sub}</p>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '24px', background: C.alt, textAlign: 'center' as const }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>&copy; Slow Morocco</p>
      </section>

      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Churches That Swallowed the Mountain</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · Knowledge</span>
          </div>
        </div>
        <div style={{ background: '#161616', padding: '20px 24px', textAlign: 'center' as const }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>&copy; {new Date().getFullYear()} Slow Morocco · J. Ng</span>
        </div>
        <div style={{ background: '#0e0e0e', padding: '12px 24px' }} />
      </footer>
    </div>
  )
}
