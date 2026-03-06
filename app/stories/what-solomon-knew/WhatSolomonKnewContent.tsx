'use client'

import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════
   WHAT SOLOMON KNEW
   The Unified Knowledge System Before the Disciplines Fractured
   Knowledge Series · Slow Morocco
   ═══════════════════════════════════════════════════ */

const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  muted: '#737373', border: '#e5e5e5',
  gold: '#B8860B', amber: '#C4963C', brass: '#B5A642',
  iron: '#4A4A4A', emerald: '#2D6E4F', crimson: '#8B1A1A',
  lapis: '#1E3A5F', smoke: '#6B5B73',
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

interface Domain {
  number: string
  name: string
  source: string
  modern: string
  detail: string
  color: string
}

const DOMAINS: Domain[] = [
  {
    number: '01',
    name: 'The structure of the world and the activity of the elements',
    source: 'Wisdom 7:17',
    modern: 'Cosmology · Physics · Chemistry',
    detail: 'What is the world made of? The Greeks said earth, water, air, fire. The Babylonians mapped it differently. The Egyptians differently again. Every ancient knowledge system began here: the architecture of creation. What holds it together. What the pieces are. Solomon was given the architecture first — because without it, nothing else is legible.',
    color: C.lapis,
  },
  {
    number: '02',
    name: 'The beginning, end, and middle of times',
    source: 'Wisdom 7:18',
    modern: 'Chronology · History · Eschatology',
    detail: 'Not just "when did things happen" — the shape of time itself. Cyclical or linear? Repeating or progressing? Where are we in the arc? This is both history and eschatology — the study of endings. Solomon knew where time started, where it was heading, and where he stood within it.',
    color: C.iron,
  },
  {
    number: '03',
    name: 'The alternations of the solstices and the changes of the seasons',
    source: 'Wisdom 7:18',
    modern: 'Astronomy · Agriculture · Calendar science',
    detail: 'When to plant. When to harvest. When the days lengthen. When they shorten. This is not theoretical knowledge — it is survival knowledge. Every civilisation that fed itself understood this. The megaliths at Stonehenge, the Dogon astronomical traditions, the Amazigh agricultural calendar — all encode the same data. The solstice is the clock that feeds the world.',
    color: C.emerald,
  },
  {
    number: '04',
    name: 'The cycles of the year and the constellations of the stars',
    source: 'Wisdom 7:19',
    modern: 'Astronomy · Navigation · Celestial mechanics',
    detail: 'Star positions. Annual cycles. Navigation by night sky. Prediction of eclipses, floods, seasonal winds. The Polynesians crossed the Pacific with this knowledge. The Tuareg crossed the Sahara with it. The Phoenicians sailed the Mediterranean. You cannot build a civilisation without reading the sky.',
    color: C.lapis,
  },
  {
    number: '05',
    name: 'The natures of animals and the tempers of wild beasts',
    source: 'Wisdom 7:20',
    modern: 'Zoology · Ethology · Animal behaviour',
    detail: '1 Kings 4:33 specifies: "He spoke of animals, birds, small creatures, and fish." Which are dangerous. Which can be domesticated. Which predict weather. Which carry disease. The "tempers of wild beasts" is ethology — the study of animal behaviour — recorded 2,500 years before the word was coined.',
    color: C.amber,
  },
  {
    number: '06',
    name: 'The powers of spirits',
    source: 'Wisdom 7:20',
    modern: 'Diagnostic medicine · Psychiatry · Invisible forces',
    detail: 'Here the modern reader stumbles. But in the ancient framework, this is not supernatural — it is the invisible layer of the same system. Just as wind is invisible but measurable, the "powers of spirits" refers to forces that affect human health, mood, fortune, and cognition without visible cause. The Testament of Solomon maps specific demons to specific diseases. Each has a name, a mechanism, and a remedy. This is diagnostic medicine in a cosmological frame.',
    color: C.smoke,
  },
  {
    number: '07',
    name: 'The reasonings of men',
    source: 'Wisdom 7:20',
    modern: 'Psychology · Rhetoric · Political science',
    detail: 'What motivates people. How they deceive. How they govern and how they are governed. Solomon\'s legendary judgment between the two mothers (1 Kings 3:16–28) is a demonstration of this knowledge: he understood human nature well enough to design a test that would reveal the truth without requiring evidence.',
    color: C.crimson,
  },
  {
    number: '08',
    name: 'The varieties of plants',
    source: 'Wisdom 7:20',
    modern: 'Botany · Dendrology · Ecology',
    detail: '1 Kings 4:33: "He spoke of trees, from the cedar of Lebanon to the hyssop that grows out of walls." Cedar — the largest, most valuable tree in the ancient Near East, used to build the Temple. Hyssop — a small herb used in purification rituals and, in folk medicine, as an antiseptic and respiratory aid. The range is deliberate. The monumental and the medicinal. The structural and the subtle.',
    color: C.emerald,
  },
  {
    number: '09',
    name: 'The virtues of roots',
    source: 'Wisdom 7:20',
    modern: 'Pharmacology · Ethnobotany · Medicine',
    detail: 'The "virtues" of roots means their active properties — what they do when ingested, applied, or burned. Josephus, writing in 93 CE, describes an exorcism performed using a root "prescribed by Solomon" — placed inside a ring and held to a possessed man\'s nose. Whether the exorcism "worked" as described, the root was a real pharmacological agent, used in a real clinical practice, attributed to a real tradition of botanical medicine.',
    color: C.brass,
  },
]

interface TestamentEntry {
  demon: string
  condition: string
  symptoms: string
  remedy: string
  modern: string
}

const TESTAMENT: TestamentEntry[] = [
  {
    demon: 'Ornias',
    condition: 'Failure to thrive',
    symptoms: 'Attacks children, causes wasting, thumb-sucking, drains life force',
    remedy: 'Thwarted by the archangel Ouriel',
    modern: 'Paediatric failure-to-thrive syndrome. Invisible agent. Protective intervention.',
  },
  {
    demon: 'Asmodeus',
    condition: 'Marital destruction / Madness',
    symptoms: 'Destroys marriages, causes murders, instigates madness',
    remedy: 'Angel Raphael. Burning fish liver and gall (Book of Tobit 6:2–8)',
    modern: 'Fish liver = high Vitamin A, Omega-3. Burning produces pungent fumigation smoke. Mediterranean antiseptic technique.',
  },
  {
    demon: 'Lix Tetrax',
    condition: 'Wind fever',
    symptoms: 'Causes fevers, sets fields on fire. Associated with hot winds',
    remedy: 'Name appears on Cretan magical tablet, Ephesian texts',
    modern: 'Seasonal fevers caused by hot sirocco winds. Attributed to invisible agent, countered by naming the force.',
  },
  {
    demon: 'Beelzeboul',
    condition: 'Ruler of all illness',
    symptoms: 'Claims dominion over all demons. Nurtured in the Red Sea',
    remedy: 'Weakened by the divine name "Eloi"',
    modern: 'The most powerful disease-force defeated by the most powerful divine name. Architecture mirrors architecture.',
  },
  {
    demon: 'Onoskelis',
    condition: 'Sexual compulsion',
    symptoms: 'Lives in caves, strangles men, perverts them',
    remedy: 'Thwarted by the name of God invoked at the foundation of the Temple\'s corner',
    modern: 'Compulsive sexual behaviour attributed to a named force. Treatment: sacred architecture as psychic containment.',
  },
  {
    demon: 'The 36 Heavenly Bodies',
    condition: 'The Decans — 36 diseases',
    symptoms: 'Each of the 36 decanal spirits governs a specific part of the body and a specific illness',
    remedy: 'Each is thwarted by a specific angelic name',
    modern: 'The earliest known system mapping zodiacal positions to bodily organs and diseases. Ancestor of medical astrology.',
  },
]

const FRACTURES = [
  { era: '~500 BCE', event: 'Greek fragmentation', detail: 'Pre-Socratic philosophers begin separating "natural philosophy" from religion. Hippocrates separates medicine from temple healing. Astronomy separates from astrology. The unified system begins to crack.' },
  { era: '~100 CE', event: 'Testament of Solomon', detail: 'The last major text holding the whole map: cosmology, demonology, medicine, astronomy, botany, psychology, and architecture as one system. After this, the pieces scatter.' },
  { era: '~800–1200', event: 'Islamic Golden Age reunion', detail: 'Ibn Sina (Avicenna), al-Biruni, al-Khwarizmi reunify medicine, astronomy, mathematics, pharmacology, and philosophy as connected fields. The Canon of Medicine contains star charts, botanical indices, and mineral pharmacology in one volume.' },
  { era: '~1600s', event: 'Enlightenment re-fracture', detail: 'The scientific revolution permanently separates disciplines. Astronomy divorces astrology. Chemistry divorces alchemy. Medicine divorces herbalism. Each gains precision. Each loses context.' },
  { era: '~1900s', event: 'Hyper-specialisation', detail: 'The modern university organises knowledge into departments that do not speak to each other. A cardiologist does not study botany. An astronomer does not study agriculture. A psychologist does not study the stars.' },
  { era: 'Now', event: 'Systems thinking re-emerges', detail: 'Ecology, epidemiology, climate science, One Health, ethnobotany — disciplines that require the integrated view are rediscovering what the Solomonic tradition assumed: everything connects to everything.' },
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

export function WhatSolomonKnewContent() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [testamentExpanded, setTestamentExpanded] = useState<number | null>(null)

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <Fade><Micro>Knowledge · Cultural Intelligence</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            What Solomon<br />Knew
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 560 }}>
            Before the disciplines fractured,<br />
            one man held the whole map.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '9', label: 'domains of knowledge', color: C.gold },
              { n: '1', label: 'unified system', color: C.emerald },
              { n: '72', label: 'spirits catalogued in the Testament', color: C.smoke },
              { n: '~2,500', label: 'years ago (Wisdom of Solomon)', color: C.ink },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: s.color, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4, maxWidth: 160 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ THE PASSAGE ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.gold}>The Source Text</Micro>
          <Title>The syllabus</Title>
        </Fade>
        <Fade delay={100}>
          <div style={{ padding: 'clamp(24px, 4vw, 40px)', borderLeft: `3px solid ${C.gold}`, background: C.bg, marginBottom: 32 }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(17px, 2.5vw, 22px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.6 }}>
              &ldquo;He gave me unerring knowledge of what exists: to know the structure of the world and the activity of the elements; the beginning and end and middle of times; the alternations of the solstices and the changes of the seasons; the cycles of the year and the constellations of the stars; the natures of animals and the tempers of wild beasts; the powers of spirits and the reasonings of men; the varieties of plants and the virtues of roots. I learned both what is secret and what is manifest.&rdquo;
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 16 }}>
              Wisdom of Solomon 7:17–21 · Written ~1st century BCE · Greek composition, Alexandrian Jewish authorship
            </p>
          </div>
        </Fade>
        <Fade delay={200}>
          <Prose>That is not a prayer. That is a curriculum.</Prose>
          <Prose>Nine domains of knowledge, laid out in a specific order. Not random. Descending — from the largest scale to the smallest, from the cosmos to the root. One system. The modern reader sees nine separate disciplines. The ancient reader saw one.</Prose>
        </Fade>
      </Sec>

      {/* ═══ THE NINE DOMAINS ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.emerald}>Nine Domains</Micro>
          <Title>Root to star</Title>
        </Fade>
        {DOMAINS.map((d, i) => (
          <Fade key={d.number} delay={i * 25}>
            <div onClick={() => setExpanded(expanded === i ? null : i)} style={{
              padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: d.color, fontWeight: 700 }}>{d.number}</span>
                <span style={{ fontFamily: F.serif, fontSize: 19, fontStyle: 'italic', color: C.ink }}>{d.name}</span>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 4 }}>
                {d.source} · Modern equivalent: {d.modern}
              </div>
              <div style={{ maxHeight: expanded === i ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
                <div style={{ paddingTop: 12 }}>
                  <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>{d.detail}</p>
                </div>
              </div>
            </div>
          </Fade>
        ))}
        <Fade delay={250}>
          <div style={{ marginTop: 32, padding: 24, background: C.gold + '10', borderLeft: `3px solid ${C.gold}` }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(18px, 2.5vw, 24px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.4 }}>
              Cosmology → Chronology → Astronomy → Zoology → The invisible layer → Psychology → Botany → Pharmacology.
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 12, color: C.body, marginTop: 8 }}>
              The stars govern the seasons. The seasons govern the plants. The plants govern health. The invisible forces have names. Knowing the name gives you the remedy. One map.
            </p>
          </div>
        </Fade>
      </Sec>

      {/* ═══ THE CONNECTION ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.lapis}>The Unified System</Micro>
          <Title>Why it was one</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>Cosmology and pharmacology are connected because the elements that constitute the world also constitute the body. The stars that govern the seasons also govern the timing of planting, which determines which plants are available, which determines which medicines can be made.</Prose>
          <Prose>The spirits that cause disease are thwarted by angels whose names encode the remedy. The animals whose natures Solomon knew also provided the materials — liver of fish, gall of catfish — that the Testament prescribes as cures.</Prose>
          <Prose>This is not mysticism. It is systems thinking before the term existed.</Prose>
          <Prose>Every traditional knowledge system on earth — Ayurveda, Traditional Chinese Medicine, <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Amazigh herbal medicine</span>, <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Gnawa trance healing</span> — operates on this same assumption: the body and the cosmos are mirrors of each other. What happens in the sky affects what grows in the ground, which affects what happens in the body, which affects what happens in the mind. One system.</Prose>
        </Fade>
      </Sec>

      {/* ═══ THE TESTAMENT ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.smoke}>The Testament of Solomon</Micro>
          <Title>Demons as diagnoses</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>The Testament of Solomon (1st–3rd century CE) reads like a diagnostic manual encoded in mythological language. Each demon is a condition. Each angel is a remedy. Solomon asks every demon the same three questions:</Prose>
          <div style={{ padding: 24, background: C.alt, marginBottom: 24 }}>
            <p style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink, lineHeight: 1.6, marginBottom: 0 }}>
              What is your name?<br />
              What do you do?<br />
              What thwarts you?
            </p>
          </div>
          <Prose>Name. Symptoms. Cure. The structure of every diagnostic encounter in the history of medicine.</Prose>
        </Fade>
        {TESTAMENT.map((t, i) => (
          <Fade key={t.demon} delay={i * 25}>
            <div onClick={() => setTestamentExpanded(testamentExpanded === i ? null : i)} style={{
              padding: '16px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink }}>{t.demon}</span>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: C.smoke }}>— {t.condition}</span>
              </div>
              <div style={{ maxHeight: testamentExpanded === i ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
                <div style={{ paddingTop: 12, display: 'grid', gap: 8 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8 }}>
                    <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.crimson }}>Symptoms</span>
                    <span style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.7, color: C.body }}>{t.symptoms}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8 }}>
                    <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.emerald }}>Remedy</span>
                    <span style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.7, color: C.body }}>{t.remedy}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8 }}>
                    <span style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.lapis }}>Modern</span>
                    <span style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.7, color: C.body }}>{t.modern}</span>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        ))}
        <Fade delay={200}>
          <div style={{ marginTop: 32, padding: 24, background: C.smoke + '10', borderLeft: `3px solid ${C.smoke}` }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(18px, 2.5vw, 24px)', fontStyle: 'italic', color: C.ink, lineHeight: 1.4 }}>
              Knowledge is not power over demons. Knowledge is the demon, transformed into a builder.
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 12, color: C.body, marginTop: 8 }}>
              In the Testament, the demons build the Temple. Understanding the forces of illness and disorder allows you to construct something sacred from them.
            </p>
          </div>
        </Fade>
      </Sec>

      {/* ═══ JOSEPHUS WITNESS ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.brass}>93 CE · Rome</Micro>
          <Title>What Josephus witnessed</Title>
        </Fade>
        <Fade delay={100}>
          <Prose>In 93 CE, about 900 years after Solomon supposedly lived, the Jewish-Roman historian Flavius Josephus describes a working Solomonic practice in his Antiquities of the Jews (8.42–49):</Prose>
          <Prose>A Jewish exorcist named Eleazar performs before the Roman Emperor Vespasian and his court. He places a ring containing a Solomonic root under the nose of a possessed man. He recites incantations attributed to Solomon. The demon exits through the man's nostrils. To prove the demon has truly departed, Eleazar commands it to overturn a basin of water as it leaves. The basin overturns.</Prose>
          <Prose>What is happening here, stripped of the supernatural frame?</Prose>
          <Prose>A practitioner is using a volatile botanical substance (administered nasally), combined with verbal technique (incantation as guided suggestion), in a structured ritual (the ring, the basin, the audience), to treat what we might now call a psychiatric episode. The "proof" — the overturned basin — functions as a psychological anchor for both patient and audience, confirming that the treatment worked.</Prose>
          <Prose>The root is real. The ring is real. The technique has a structure. The practitioner belongs to a lineage that traces its methods to Solomon. Whether you call it exorcism or early psychiatry depends entirely on your framework. The practice existed. Josephus saw it.</Prose>
        </Fade>
      </Sec>

      {/* ═══ THE FRACTURE ═══ */}
      <Sec>
        <Fade>
          <Micro color={C.crimson}>The Fracture Timeline</Micro>
          <Title>How one map became many pieces</Title>
        </Fade>
        {FRACTURES.map((f, i) => (
          <Fade key={f.era} delay={i * 40}>
            <div style={{ display: 'grid', gridTemplateColumns: 'clamp(80px, 12vw, 120px) 1fr', gap: 16, padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: F.serif, fontSize: 17, fontStyle: 'italic', color: C.ink }}>{f.era}</div>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: C.ink, marginBottom: 4 }}>{f.event}</div>
                <div style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.85, color: C.body }}>{f.detail}</div>
              </div>
            </div>
          </Fade>
        ))}
      </Sec>

      {/* ═══ CLOSING ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={C.gold}>The Point</Micro>
          <Title>What was lost</Title>
          <Prose>The question is not whether Solomon existed, or whether he personally possessed all this knowledge, or whether the Testament is historically accurate. The question is what the tradition describes.</Prose>
          <Prose>It describes a unified knowledge system where the structure of the cosmos and the structure of the body are reflections of each other. Where the stars govern the seasons, which govern the plants, which govern health. Where invisible forces have names, natures, and remedies. Where knowing the name of the force gives you authority over it. Where every disease is a demon — meaning, a diagnosable condition with specific symptoms and a specific counter-agent.</Prose>
          <Prose>This system existed, in various forms, across every ancient civilisation. The Egyptians had it. The Babylonians had it. The Greeks fragmented it into separate disciplines and called the fragments philosophy, medicine, astronomy, and natural history. The Islamic Golden Age partially reunified it. Then the Enlightenment fragmented it again, permanently.</Prose>
          <Prose>Solomon — real or mythologised — stands at the junction point. The last figure in the Western tradition credited with holding the entire map. After him, the map gets cut into pieces and distributed to specialists who can read their own piece but cannot see the whole.</Prose>
          <Prose>The nine domains of the Wisdom of Solomon are not a relic. They are a reminder of what a complete knowledge system looks like — before the disciplines forgot they were one.</Prose>
        </Fade>
      </Sec>

      {/* ═══ SOURCES ═══ */}
      <section style={{ padding: '64px 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {[
            'Wisdom of Solomon 7:17–21. Deuterocanonical/Apocrypha, ~1st century BCE. Alexandrian Jewish composition.',
            '1 Kings 3–4. Hebrew Bible. Solomon\'s judgment, botanical and zoological knowledge.',
            'Josephus, Antiquities of the Jews 8.42–49 (93 CE). Solomon\'s incantations, herbal, Eleazar\'s exorcism before Vespasian.',
            'Testament of Solomon (1st–3rd century CE). Pseudepigraphic demon catalogue. Conybeare translation (1898).',
            'Book of Tobit 6:2–8, 8:2–3. Fish liver and gall as remedy against Asmodeus.',
            'Lecouteux, Claude (2022). King Solomon the Magus: Master of the Djinns. Inner Traditions.',
            'Talmud, Tractate Gittin 68a–b. Solomon, Asmodeus, and the ring.',
            'Quran 27:15–44, 34:12–14. Sulayman\'s knowledge of animal language, wind, metals.',
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
              { title: 'The Queen Who Did Not Kneel', sub: 'Bilqis visits Solomon. The geopolitics behind the riddles.' },
              { title: 'The Son Who Took the Fire', sub: 'Menelik I carries the Ark south. The dynasty begins.' },
              { title: 'The Coffee Covenant', sub: 'Ethiopia\'s Kaffa forests — where the plant the world runs on was born.' },
              { title: 'The Spice Routes', sub: 'The trade networks Solomon\'s kingdom sat at the centre of.' },
              { title: 'Trans-Saharan Trade Routes', sub: 'Gold, salt, and knowledge across the desert.' },
            ].map((l, i) => (
              <span key={i} style={{ display: 'block', padding: '16px 20px', background: C.alt, borderRadius: 2 }}>
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
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>What Solomon Knew</span>
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
