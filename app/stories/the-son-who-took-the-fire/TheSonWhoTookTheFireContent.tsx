'use client'

import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════
   THE SON WHO TOOK THE FIRE
   Menelik I, the Ark of the Covenant, and the Most
   Successful Political Myth in Human History
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
  copper: '#8B5E3C', cedar: '#5C4033',
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

const KEBRA_SEQUENCE = [
  { phase: 'Conception', detail: 'Solomon tricks Makeda with spiced food and water. She conceives. He gives her a ring as token.', source: 'Kebra Nagast, ch. 30' },
  { phase: 'Childhood', detail: 'The boy — Bäynä Ləḥkəm, "Son of the Wise" — is raised in Ethiopia. His mother raises him Jewish. He knows who his father is.', source: 'Kebra Nagast, ch. 32–33' },
  { phase: 'Journey', detail: 'At twenty-two, Menelik travels to Jerusalem to meet Solomon. He carries the ring as proof.', source: 'Kebra Nagast, ch. 34' },
  { phase: 'Recognition', detail: 'Solomon sees himself in the boy. He begs Menelik to stay and rule Israel after him.', source: 'Kebra Nagast, ch. 35–36' },
  { phase: 'Refusal', detail: 'Menelik refuses. He wants to go home. The son of the wisest king on earth looks at Jerusalem and chooses Ethiopia.', source: 'Kebra Nagast, ch. 37' },
  { phase: 'Companions', detail: 'Solomon orders the firstborn sons of Israel\'s elders to accompany Menelik. If his son will not stay, Israel\'s best will go with him.', source: 'Kebra Nagast, ch. 38–39' },
  { phase: 'The Theft', detail: 'Azariah, son of the high priest Zadok, steals the Ark of the Covenant from the Temple. Replaces it with a replica. Hides it among the luggage.', source: 'Kebra Nagast, ch. 45–48' },
  { phase: 'The Dream', detail: 'Solomon discovers the theft and pursues. God tells him in a dream: do not follow. The Ark\'s departure was not a theft. It was My will.', source: 'Kebra Nagast, ch. 58–62' },
  { phase: 'The Transfer', detail: 'The covenant moves from Israel to Ethiopia. The theological engine: God chose to relocate His presence from Jerusalem to Axum.', source: 'Kebra Nagast, ch. 84' },
  { phase: 'The Crown', detail: 'Menelik is crowned King of Axum. The Ark is installed. Ethiopia becomes the New Jerusalem. The Solomonic line begins.', source: 'Kebra Nagast, ch. 87' },
]

const WHAT_KEBRA_ACCOMPLISHED = [
  { num: '01', title: 'Solomonic Descent', detail: 'Linked the new dynasty to the most prestigious royal line in the monotheistic world.' },
  { num: '02', title: 'Divine Transfer', detail: 'God chose Ethiopia over Israel as the guardian of the Ark. Not derived authority — primary authority.' },
  { num: '03', title: 'Zagwe Delegitimisation', detail: 'The previous dynasty was not of Solomon\'s blood. Their centuries of rule were merely an interruption.' },
  { num: '04', title: 'New Jerusalem', detail: 'With the Ark in Axum, Ethiopia held the physical presence of God. Not Rome. Not Constantinople. Axum.' },
  { num: '05', title: 'National Unity', detail: 'A shared sacred history that transcended ethnic and regional divisions across one of the most diverse territories on earth.' },
]

const DYNASTY_TIMELINE = [
  { year: '~950 BCE', event: 'Queen of Sheba visits Solomon (claimed)', type: 'legend' },
  { year: '~950 BCE', event: 'Menelik I born, returns to Ethiopia with the Ark (claimed)', type: 'legend' },
  { year: '1st–10th c. CE', event: 'Kingdom of Axum rules northern Ethiopia and Eritrea', type: 'history' },
  { year: '~10th century', event: 'Zagwe dynasty replaces Aksumite rulers', type: 'history' },
  { year: '~1200', event: 'Lalibela builds rock-hewn churches under Zagwe rule', type: 'history' },
  { year: '1270', event: 'Yekuno Amlak overthrows the last Zagwe king. Claims Solomonic descent. Founds the dynasty.', type: 'history' },
  { year: '1314–1322', event: 'Kebra Nagast compiled under Emperor Amda Seyon by six Tigrayan scribes', type: 'history' },
  { year: '1434–1468', event: 'Emperor Zara Yaqob consolidates religious-political authority', type: 'history' },
  { year: '1889–1913', event: 'Menelik II rules. Defeats Italy at Battle of Adwa (1896). Names himself after Menelik I.', type: 'history' },
  { year: '1930', event: 'Haile Selassie crowned. Claims descent through paternal grandmother.', type: 'history' },
  { year: '1931', event: 'First Ethiopian constitution codifies Solomonic descent', type: 'history' },
  { year: '1955', event: 'Revised constitution: emperor "descends without interruption from the dynasty of Menelik I"', type: 'history' },
  { year: '1974', event: 'Derg military coup deposes Haile Selassie. 704 years of Solomonic rule end.', type: 'history' },
  { year: '1975', event: 'Haile Selassie dies in captivity in Menelik Palace, Addis Ababa', type: 'history' },
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

function Quote({ children, source }: { children: React.ReactNode; source: string }) {
  return (
    <div style={{ padding: 24, borderLeft: `3px solid ${C.gold}`, background: C.alt, marginBottom: 32 }}>
      <p style={{ fontFamily: F.serif, fontSize: 'clamp(16px, 2.5vw, 20px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.6 }}>{children}</p>
      <p style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 12 }}>{source}</p>
    </div>
  )
}

// —— PAGE ——————————————————————————————————

export function TheSonWhoTookTheFireContent() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <Fade><Micro>Knowledge · Cultural Intelligence</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            The Son Who<br />Took the Fire
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 560 }}>
            Menelik I, the Ark of the Covenant,<br />
            and the most successful political myth<br />in human history.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '704', label: 'years the Solomonic dynasty ruled Ethiopia', color: C.gold },
              { n: '1270', label: 'CE · Yekuno Amlak founds the dynasty', color: C.lapis },
              { n: '1974', label: 'CE · Haile Selassie deposed', color: C.crimson },
              { n: '117', label: 'chapters in the Kebra Nagast', color: C.cedar },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: s.color, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4, maxWidth: 160 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ THE SETUP ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.cedar}>The Setup</Micro>
          <Title>A boy grows up without a father</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>A boy grows up in Ethiopia without a father. His mother is a queen. She tells him his father is the wisest king in the world, a man she met once, in a city far to the north. She gives him a ring — Solomon's ring — as proof.</Prose>
          <Prose>At twenty-two, the boy travels to Jerusalem.</Prose>
          <Prose>This is where the story stops being about a family and starts being about a nation. Because what happens next — in the telling — will become the constitutional foundation of an empire that lasts 700 years.</Prose>
        </Fade>
      </Sec>

      {/* ═══ THE KEBRA NAGAST SEQUENCE ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.gold}>What the Kebra Nagast Says</Micro>
          <Title>Ten phases of the founding myth</Title>
        </Fade>
        <Fade delay={50}>
          <Prose>The Kebra Nagast — "Glory of the Kings" — is the Ethiopian national epic. Compiled in Ge'ez between 1314 and 1322, during the reign of Emperor Amda Seyon. It is not in the Bible. It is not in the Quran. It is Ethiopia's book.</Prose>
        </Fade>
        {KEBRA_SEQUENCE.map((step, i) => (
          <Fade key={step.phase} delay={i * 20}>
            <div
              onClick={() => setExpandedStep(expandedStep === i ? null : i)}
              style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: C.gold, fontWeight: 700, minWidth: 20 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: F.serif, fontSize: 20, fontStyle: 'italic', color: C.ink }}>{step.phase}</span>
              </div>
              <div style={{ maxHeight: expandedStep === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
                <div style={{ padding: '12px 0 4px 36px' }}>
                  <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body, marginBottom: 4 }}>{step.detail}</p>
                  <p style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>{step.source}</p>
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </Sec>

      {/* ═══ WHAT ACTUALLY HAPPENED ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.crimson}>What Actually Happened</Micro>
          <Title>The archaeology says no. The history says 1270.</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>There is no archaeological evidence that Menelik I existed as a historical person, that the Ark was transported to Ethiopia, or that a Solomonic bloodline connected 10th-century BCE Jerusalem to 13th-century CE Ethiopia.</Prose>
        </Fade>
        <Fade delay={150}>
          <Quote source="Edward Ullendorff, The Ethiopians: An Introduction to Country and People">
            The historical fiction of an uninterrupted line of kings descended from Menelik I, the son of King Solomon and Queen Sheba, has very deep roots in Ethiopia and must be one of the most powerful and influential sagas anywhere in the world.
          </Quote>
        </Fade>
        <Fade delay={200}>
          <Prose>In 1270, an Amhara nobleman named Yekuno Amlak overthrew the Zagwe dynasty. The Zagwe had built the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>rock-hewn churches of Lalibela</span>. They were Christians. They were legitimate rulers. But Yekuno Amlak needed the Ethiopian Orthodox Church to support his seizure of power. He needed more than military victory. He needed a story.</Prose>
          <Prose>He claimed direct descent from the Aksumite royal house. The Aksumite royal house, he claimed, descended from Menelik I. The Zagwe? Usurpers. Their centuries of rule were an interruption. He was not overthrowing legitimate authority. He was restoring it.</Prose>
        </Fade>
      </Sec>

      {/* ═══ WHAT THE KEBRA ACCOMPLISHED ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.emerald}>The Achievement</Micro>
          <Title>What the book was built to do</Title>
        </Fade>
        <Fade delay={50}>
          <Prose>Between 1314 and 1322, six Tigrayan scribes led by Ishaq, the Nebure id of Axum, compiled the Kebra Nagast. They mixed Biblical narratives, Coptic homilies, Arabic Islamic traditions, apocryphal Jewish sources, and local Ethiopian oral traditions into 117 chapters that accomplished five things simultaneously:</Prose>
        </Fade>
        <div style={{ display: 'grid', gap: 1, background: C.border }}>
          {WHAT_KEBRA_ACCOMPLISHED.map((item, i) => (
            <Fade key={item.num} delay={i * 30}>
              <div style={{ background: C.bg, padding: 24, display: 'grid', gridTemplateColumns: 'clamp(32px, 5vw, 48px) 1fr', gap: 16 }}>
                <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 700, color: C.emerald }}>{item.num}</span>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.85, color: C.body }}>{item.detail}</div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Sec>

      {/* ═══ THE ARK ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.gold}>The Ark in Axum</Micro>
          <Title>The object is not evidence. It is infrastructure.</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>The Ark of the Covenant is believed by many Ethiopians to reside in the Chapel of the Tablet, adjacent to the Church of Our Lady Mary of Zion in Axum. One monk is assigned to guard it for his entire life. He cannot leave the compound. No one else may enter.</Prose>
          <Prose>Ullendorff, who spoke fluent Ge'ez, claimed he saw it in 1941 during the British liberation. He described a medieval wooden relic. He said the priests and government maintain the mystery deliberately — because the aura of sanctity is more valuable than any physical object could be.</Prose>
          <Prose>Whether the Ark in Axum is the original biblical artifact is beside the point. What matters is what the claim accomplished. As long as Ethiopia possesses the Ark — or is believed to — then Ethiopia is the chosen land. The emperor is God's anointed. The dynasty is legitimate.</Prose>
        </Fade>
      </Sec>

      {/* ═══ TIMELINE ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.lapis}>The Dynasty</Micro>
          <Title>704 years</Title>
        </Fade>
        {DYNASTY_TIMELINE.map((t, i) => (
          <Fade key={i} delay={i * 15}>
            <div style={{ display: 'grid', gridTemplateColumns: 'clamp(80px, 12vw, 120px) 1fr', gap: 16, padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: t.type === 'legend' ? C.amber : C.lapis }}>{t.year}</div>
              <div style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>
                {t.event}
                {t.type === 'legend' && <span style={{ fontFamily: F.mono, fontSize: 10, color: C.amber, marginLeft: 8 }}>CLAIMED</span>}
              </div>
            </div>
          </Fade>
        ))}
      </Sec>

      {/* ═══ THE CONSTITUTION ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.crimson}>Article 2</Micro>
          <Title>The myth becomes law</Title>
        </Fade>
        <Fade delay={100}>
          <div style={{ padding: 32, background: C.bg, border: `1px solid ${C.border}`, marginBottom: 32 }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(16px, 2.5vw, 22px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.5, marginBottom: 16 }}>
              "The Imperial dignity shall remain perpetually to the line of Haile Selassie I, descendant of King Sahle Selassie, whose line descends without interruption from the dynasty of Menelik I, son of the Queen of Ethiopia, the Queen of Sheba and King Solomon of Jerusalem."
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>1955 Ethiopian Constitution, Article 2</p>
          </div>
        </Fade>
        <Fade delay={150}>
          <Prose>A 14th-century myth, compiled to justify a 13th-century coup, enshrined in a 20th-century legal document as the constitutional basis for absolute rule.</Prose>
          <Prose>On September 12, 1974, the Derg deposed Haile Selassie. He was imprisoned in Menelik Palace. He died the following year. After 704 years, the story stopped working. Or rather: a different story — Marxism, revolution, the promise of equality — proved temporarily more powerful.</Prose>
        </Fade>
      </Sec>

      {/* ═══ WHAT THE STORY IS ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.gold}>What the Story Actually Is</Micro>
          <Title>Armies can take thrones. Only stories can keep them.</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>The Kebra Nagast is not history. It is political theology. And it is extraordinarily good at what it does.</Prose>
          <Prose>A single narrative unified dozens of ethnic groups across one of the most geographically diverse territories on earth for seven centuries. A mythological bloodline provided legitimacy that no military conquest alone could sustain. A sacred object gave Ethiopia a unique position in Christian theology. A boy's journey — his refusal to stay in Jerusalem, his choice to return home — encoded the principle that Ethiopian sovereignty is not derivative.</Prose>
          <Prose>This is why Menelik II named himself after Menelik I. This is why Haile Selassie wrote his descent into the constitution. This is why the Rastafari movement sees Haile Selassie as the returned Messiah and Ethiopia as the promised land. The story has an extraordinary ability to absorb new meanings while maintaining its central claim: Ethiopia is chosen.</Prose>
        </Fade>
        <Fade delay={200}>
          <div style={{ marginTop: 32, padding: 24, borderLeft: `3px solid ${C.gold}`, background: C.alt }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(16px, 2.5vw, 22px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.4, marginBottom: 12 }}>
              Here is the question the Kebra Nagast actually answers:
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body, marginBottom: 12 }}>
              What do you do when you need to explain why a small Christian kingdom on the Horn of Africa, surrounded by Islamic empires, deserves to exist?
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>
              You say: We have the Ark. God moved here. We are the new Israel. And for 700 years, it worked.
            </p>
          </div>
        </Fade>
      </Sec>

      {/* ═══ SOURCES ═══ */}
      <section style={{ padding: '64px 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {[
            'Kebra Nagast (~1314–1322 CE). Ethiopian national epic, compiled in Ge\'ez. Menelik I narrative, Ark transfer, Solomonic legitimacy.',
            'Ullendorff, Edward. The Ethiopians: An Introduction to Country and People. Solomonic descent as "historical fiction."',
            'Marcus, Harold. A History of Ethiopia. Yekuno Amlak\'s coup, Kebra Nagast as political propaganda, six Tigrayan scribes.',
            '1955 Ethiopian Constitution. Article 2: Solomonic descent as constitutional law.',
            '1931 Ethiopian Constitution. First codification of Solomonic descent claim.',
            'Encyclopaedia Britannica. "Solomonic dynasty." "Ethiopia — The Zagwe and Solomonic dynasties."',
            'World History Encyclopedia. "Solomonic Descent in Ethiopian History." Menelik II\'s strategic use of name adoption.',
            'Biblical Archaeology Society. "Who Is the Queen of Sheba in the Bible?" Kebra Nagast account summary.',
            'Crown Council of Ethiopia. "Descendant of Solomon?" Current claims and constitutional continuity.',
            'LibreTexts. "The Kebra Nagast (Ethiopia, c. 1300s)." Academic analysis as "providential history."',
            '1 Kings 10:1–13, 2 Chronicles 9:1–12. Biblical account of the Queen of Sheba\'s visit.',
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
              { href: '/data/what-solomon-knew', title: 'What Solomon Knew', sub: 'The father\'s unified knowledge system. What Menelik inherited.' },
              { href: '/data/the-queen-who-did-not-kneel', title: 'The Queen Who Did Not Kneel', sub: 'The mother\'s visit. Bilqis and the geopolitics behind it.' },
              { href: '/data/the-churches-that-swallowed-the-mountain', title: 'The Churches That Swallowed the Mountain', sub: 'Lalibela — the New Jerusalem the Solomonic dynasty built.' },
              { href: '/data/the-lions-road', title: 'The Lion\'s Road', sub: 'The Lion of Judah — from Asiatic range to Solomonic symbol.' },
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
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>The Son Who Took the Fire</span>
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
