'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { PEOPLES, ARCHITECTURE, TERRAIN_EQUATION, TIMELINE, BIBLIOGRAPHY, type People, type StructuralParallel } from './data'

/* ═══════════════════════════════════════════════════
   THE UNGOVERNABLE PATTERN — MODULE 128
   Convergent Political Evolution
   ═══════════════════════════════════════════════════ */

const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  muted: '#737373', border: '#e5e5e5',
  amber: '#B45309', red: '#991B1B', green: '#166534', blue: '#1E40AF',
  purple: '#6B21A8', stone: '#78716C',
}

const PEOPLE_COLORS: Record<string, string> = {
  'Amazigh': '#C4963C', 'Kurds': '#B45309', 'Mongols': '#991B1B', 'Haudenosaunee': '#166534',
  'Sámi': '#1E6091', 'Pashtun': '#78350F', 'Mapuche': '#4D7C0F', 'Roma': '#6B21A8', 'Tuareg': '#0E7490',
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
  return <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.85, color: C.body, marginBottom: 20, maxWidth: 680 }}>{children}</p>
}

function Sec({ children, bg = C.bg, id }: { children: React.ReactNode; bg?: string; id?: string }) {
  return <section id={id} style={{ background: bg, padding: 'clamp(60px, 8vw, 100px) 24px', borderTop: `1px solid ${C.border}` }}><div style={{ maxWidth: 960, margin: '0 auto' }}>{children}</div></section>
}

function Tag({ label, color }: { label: string; color: string }) {
  return <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, color, padding: '3px 8px', background: color + '12', borderRadius: 2, letterSpacing: '0.05em' }}>{label}</span>
}

// ── PAGE ─────────────────────────────────────────

export function TheUngovernablePatternContent() {
  const [expandedPeople, setExpandedPeople] = useState<number | null>(null)
  const [expandedArch, setExpandedArch] = useState<number | null>(null)
  const [timelineFilter, setTimelineFilter] = useState<string>('all')

  const filteredTimeline = TIMELINE.filter(e => timelineFilter === 'all' || e.people === timelineFilter)

  const uniquePeoples = Array.from(new Set(TIMELINE.map(e => e.people)))

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: '100vh' }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 960, margin: '0 auto' }}>
        <Fade><Micro>Module 128 · Demographics & Society</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            The Ungovernable<br />Pattern
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 600 }}>
            Nine peoples. Five continents. One political architecture.<br />
            Why the peoples who refuse empires keep inventing the same governance structure.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '9', label: 'peoples documented', color: C.amber },
              { n: '5', label: 'continents', color: C.green },
              { n: '~200M', label: 'people in this pattern today', color: C.ink },
              { n: '0', label: 'centralised states built', color: C.red },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: s.color, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4, maxWidth: 160 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ OPENING ESSAY ═══ */}
      <Sec>
        <Fade>
          <Prose>The <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Amazigh</span> of Morocco elect a chief annually and rotate power between clans. The Haudenosaunee of North America give clan mothers the authority to remove chiefs. The Pashtun of Afghanistan make decisions by assembly where every adult male has a voice. The Mongols elected even Genghis Khan.</Prose>
          <Prose>None of these peoples learned from each other. The Amazigh and the Haudenosaunee have never met. The Pashtun and the Mapuche share no ancestor for 50,000 years. The Roma and the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Sámi</span> occupy opposite ends of the European continent with no historical contact.</Prose>
          <Prose>Yet all nine peoples in this dataset invented the same political architecture: assembly governance, rotating or removable leadership, customary law parallel to state law, confederation for war that dissolves in peace. All nine span multiple modern states. All nine survived empires that tried to assimilate them. All nine were called "ungovernable" by the empires that failed. None of them consider themselves ungovernable. They are self-governing.</Prose>
          <Prose>This is convergent political evolution. The same pressures — mountain terrain, desert, steppe, or mobility — produce the same governance structure, independently, across five continents. The terrain that resists empires produces the same answer every time: the assembly, the removable leader, the customary law, and the refusal to centralise.</Prose>
        </Fade>
      </Sec>

      {/* ═══ THE PEOPLES ═══ */}
      <Sec bg={C.alt} id="peoples">
        <Fade>
          <Micro color={C.amber}>The Nine Peoples</Micro>
          <Title>Same structure, different names</Title>
        </Fade>
        <div style={{ display: 'grid', gap: 1 }}>
          {PEOPLES.map((p, i) => {
            const color = PEOPLE_COLORS[p.name] || C.stone
            const isOpen = expandedPeople === i
            return (
              <Fade key={p.name} delay={i * 25}>
                <div onClick={() => setExpandedPeople(isOpen ? null : i)} style={{
                  background: C.bg, padding: 'clamp(16px, 2vw, 24px)', cursor: 'pointer',
                  borderLeft: `3px solid ${isOpen ? color : 'transparent'}`,
                  transition: 'border-color 0.3s',
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <span style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontStyle: 'italic', color: C.ink }}>{p.name}</span>
                      <span style={{ fontFamily: F.mono, fontSize: 12, color, marginLeft: 12 }}>{p.endonym}</span>
                    </div>
                    <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>{p.population}</span>
                  </div>
                  <div style={{ fontFamily: F.mono, fontSize: 12, color: C.body, marginTop: 4 }}>
                    &ldquo;{p.meaning}&rdquo; · {p.region}
                  </div>

                  {/* Summary line */}
                  <div style={{ fontFamily: F.mono, fontSize: 12, color: C.body, marginTop: 8 }}>
                    <strong style={{ color: C.ink }}>Assembly:</strong> {p.governance.split('.')[0]}. <strong style={{ color: C.ink }}>Leader:</strong> {p.leaderTitle}. <strong style={{ color: C.ink }}>States:</strong> {p.states.length}.
                  </div>

                  {/* Expanded */}
                  <div style={{ maxHeight: isOpen ? 2000 : 0, overflow: 'hidden', transition: 'max-height 0.6s ease' }}>
                    <div style={{ paddingTop: 20, display: 'grid', gap: 16 }}>
                      {/* Grid of details */}
                      {([
                        ['Terrain', p.terrain],
                        ['Governance', p.governance],
                        ['Leadership', `${p.leaderTitle} — ${p.leaderMechanism}`],
                        ['Customary law', p.law],
                        ['Language', `${p.languageFamily}. ${p.languageStatus}`],
                        ['Empires outlasted', p.empiresOutlasted.join(' → ')],
                        ['Modern status', p.modernStatus],
                        ...(p.stoneMarker ? [['Stone markers', p.stoneMarker]] : []),
                      ] as [string, string][]).map(([label, value]) => (
                        <div key={label} style={{ display: 'grid', gridTemplateColumns: 'clamp(90px, 12vw, 130px) 1fr', gap: 12 }}>
                          <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color, paddingTop: 2 }}>{label}</div>
                          <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.body }}>{value}</div>
                        </div>
                      ))}

                      {/* States */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {p.states.map(s => (
                          <span key={s} style={{ fontFamily: F.mono, fontSize: 11, color: C.body, padding: '3px 10px', background: color + '10', borderRadius: 2 }}>{s}</span>
                        ))}
                      </div>

                      {/* Analysis */}
                      <div style={{ padding: 16, background: C.alt, borderLeft: `2px solid ${color}`, marginTop: 8 }}>
                        <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>{p.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            )
          })}
        </div>
      </Sec>

      {/* ═══ THE SHARED ARCHITECTURE ═══ */}
      <Sec id="architecture">
        <Fade>
          <Micro color={C.green}>The Shared Architecture</Micro>
          <Title>Eight features. Independently invented.</Title>
          <Prose>These structural parallels were not borrowed, transmitted, or inherited. They were independently developed by peoples with no contact, on different continents, in different millennia. The pattern is convergent — the same pressures produce the same solutions.</Prose>
        </Fade>
        <div style={{ display: 'grid', gap: 1, marginTop: 32 }}>
          {ARCHITECTURE.map((a, i) => {
            const isOpen = expandedArch === i
            return (
              <Fade key={a.feature} delay={i * 30}>
                <div onClick={() => setExpandedArch(isOpen ? null : i)} style={{
                  padding: '16px 20px', background: isOpen ? C.alt : C.bg, cursor: 'pointer',
                  borderBottom: `1px solid ${C.border}`, transition: 'background 0.3s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink }}>{a.feature}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>{a.peoples.length} peoples</span>
                  </div>
                  <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.body, marginTop: 6 }}>{a.description}</div>
                  <div style={{ maxHeight: isOpen ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 12 }}>
                      {a.peoples.map(p => {
                        const name = p.split(' (')[0]
                        const detail = p.includes('(') ? p.split('(')[1].replace(')', '') : ''
                        const color = PEOPLE_COLORS[name] || C.stone
                        return (
                          <div key={p} style={{ fontFamily: F.mono, fontSize: 11, color: C.body, padding: '4px 10px', background: color + '10', borderRadius: 2, borderLeft: `2px solid ${color}` }}>
                            <strong style={{ color }}>{name}</strong>{detail && ` — ${detail}`}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Fade>
            )
          })}
        </div>
      </Sec>

      {/* ═══ TERRAIN EQUATION ═══ */}
      <Sec bg={C.alt} id="terrain">
        <Fade>
          <Micro color={C.stone}>The Terrain Equation</Micro>
          <Title>The landscape that resists empires</Title>
          <Prose>Every people in this dataset occupies terrain that makes centralisation physically impossible — or, in the case of the Roma, substitutes mobility for terrain. The political structure is not a failure to build a state. It is an adaptation to a landscape where a state would be inefficient, fragile, or simply impossible to enforce.</Prose>
        </Fade>
        <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
          {TERRAIN_EQUATION.map((t, i) => (
            <Fade key={t.terrain} delay={i * 40}>
              <div style={{ padding: 24, background: C.bg, borderRadius: 2 }}>
                <div style={{ fontFamily: F.serif, fontSize: 22, fontStyle: 'italic', color: C.ink, marginBottom: 8 }}>{t.terrain}</div>
                <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body, marginBottom: 12 }}>{t.mechanism}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {t.peoples.map(p => {
                    const name = p.split(' (')[0]
                    const color = PEOPLE_COLORS[name] || C.stone
                    return <Tag key={p} label={p} color={color} />
                  })}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Sec>

      {/* ═══ TIMELINE ═══ */}
      <Sec id="timeline">
        <Fade>
          <Micro color={C.blue}>Timeline</Micro>
          <Title>When the pattern surfaces</Title>
        </Fade>
        {/* Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
          <button onClick={() => setTimelineFilter('all')} style={{
            fontFamily: F.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
            padding: '6px 14px', border: `1px solid ${timelineFilter === 'all' ? C.ink : C.border}`,
            background: timelineFilter === 'all' ? C.ink : 'transparent',
            color: timelineFilter === 'all' ? '#fff' : C.body,
            cursor: 'pointer', borderRadius: 2,
          }}>All</button>
          {uniquePeoples.map(p => {
            const active = timelineFilter === p
            const color = PEOPLE_COLORS[p] || C.stone
            return (
              <button key={p} onClick={() => setTimelineFilter(p)} style={{
                fontFamily: F.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
                padding: '6px 14px', border: `1px solid ${active ? color : C.border}`,
                background: active ? color : 'transparent',
                color: active ? '#fff' : C.body,
                cursor: 'pointer', borderRadius: 2,
              }}>{p}</button>
            )
          })}
        </div>
        {/* Events */}
        <div style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: 24 }}>
          {filteredTimeline.map((e, i) => {
            const color = PEOPLE_COLORS[e.people] || C.stone
            return (
              <Fade key={i} delay={i * 20}>
                <div style={{ marginBottom: 28, position: 'relative' as const }}>
                  <div style={{ position: 'absolute' as const, left: -31, top: 6, width: 12, height: 12, borderRadius: '50%', background: color }} />
                  <div style={{ fontFamily: F.mono, fontSize: 11, color, fontWeight: 600, letterSpacing: '0.08em' }}>{e.year} · {e.people}</div>
                  <div style={{ fontFamily: F.serif, fontSize: 17, fontStyle: 'italic', color: C.ink, marginTop: 4 }}>{e.event}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.body, marginTop: 4 }}>{e.significance}</div>
                </div>
              </Fade>
            )
          })}
        </div>
      </Sec>

      {/* ═══ CLOSING ESSAY ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.red}>The Point</Micro>
          <Title>Self-governing, not ungovernable</Title>
          <Prose>The French called the Amazigh highlands bled es-siba — "land of dissidence." The British called the Pashtun tribal areas "ungovernable." The Spanish fought the Mapuche for 342 years and could not explain why they would not submit. The Romans called the peoples beyond their borders "barbarians" — from the same root that gives us "Berber."</Prose>
          <Prose>The word "ungovernable" is always applied by the empire that fails to govern. It is never used by the people themselves. What the empire sees as disorder, the people experience as order — an order older than the empire, adapted to terrain the empire cannot hold, and governed by laws the empire cannot read because they were never written down.</Prose>
          <Prose>The jemaa, the jirga, the kurultai, the Grand Council, the siida, the Kris, the rewe — these are all the same structure. An assembly of equals. A leader who serves at the pleasure of the governed. A legal code enforced by community consensus, not by police. A system that confederates for war and dissolves in peace, preventing military power from becoming political power.</Prose>
          <Prose>This structure was not transmitted. There is no ur-source, no proto-democracy that radiated outward. These peoples invented it independently because the conditions demanded it. Mountain terrain fragments power. Desert exhausts it. Steppe dissolves it. Mobility evades it. In every case, the people who live in the landscape that empires cannot hold arrive at the same answer: govern yourselves, trust the assembly, limit the leader, and keep moving.</Prose>
          <Prose>Two hundred million people live inside this pattern today. It is older than Athens. It is older than Rome. It may be older than agriculture. And it is, in every measurable way, a more durable political technology than the centralised state — because every empire in the timeline above has fallen, and every people in the dataset above is still here.</Prose>
        </Fade>
      </Sec>

      {/* ═══ SOURCES ═══ */}
      <section style={{ padding: '64px 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <Micro>Sources & Bibliography</Micro>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
          <div style={{ marginTop: 24, padding: 16, background: C.alt, borderRadius: 2 }}>
            <p style={{ fontFamily: F.mono, fontSize: 11, color: C.body, lineHeight: 1.8 }}>
              Special reference: Pierre Clastres, <em>Society Against the State</em> (1974) — argued that statelessness is not a failure of political development but an active, conscious rejection of centralised power. James C. Scott, <em>The Art of Not Being Governed</em> (2009) — documented how highland peoples across Southeast Asia deliberately chose political structures that resisted state incorporation. Both works provide the theoretical framework for understanding the pattern documented here.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CONNECTIONS ═══ */}
      <section style={{ padding: '48px 24px', background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <Micro>Connected Modules</Micro>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { n: '092', title: 'The Moroccan Genome' },
              { n: '101', title: 'The Free People' },
              { n: '120', title: 'The Gnawa Road' },
              { n: '126', title: 'The Shared Grandmother' },
              { n: '127', title: 'The Guanche Ghost' },
            ].map(m => (
              <a key={m.n} href={`/data/${m.title.toLowerCase().replace(/ /g, '-')}`} style={{
                fontFamily: F.mono, fontSize: 11, color: C.body, padding: '6px 12px',
                background: C.bg, border: `1px solid ${C.border}`, borderRadius: 2,
                textDecoration: 'none',
              }}>
                <span style={{ color: C.muted }}>{m.n}</span> {m.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IP ═══ */}
      <section style={{ padding: '24px', background: C.bg, textAlign: 'center' as const, borderTop: `1px solid ${C.border}` }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>
          Sources: Hart (2000), Van Bruinessen (1992), Weatherford (2004), Johansen (1998), Barfield (2010), Dillehay (2007), Hancock (2002), Keenan (2004), Clastres (1987), Scott (2009) · © Slow Morocco
        </p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Ungovernable Pattern</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Slow Morocco · Module 128</span>
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
