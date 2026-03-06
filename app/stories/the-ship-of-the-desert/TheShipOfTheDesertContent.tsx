'use client'

import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════
   THE SHIP OF THE DESERT
   Data Module · Slow Morocco
   /stories/the-ship-of-the-desert

   Three species. Two trade routes.
   One animal that built civilisation across
   the most hostile terrain on earth.
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

/* ─── Species Data ─── */

interface Species {
  id: string
  name: string
  latin: string
  humps: number
  color: string
  population: string
  popNum: number
  status: string
  habitat: string
  domesticated: string
  tempRange: string
  tempLow: number
  tempHigh: number
  maxWeight: string
  maxWeightNum: number
  shoulderHeight: string
  carryCapacity: string
  carryNum: number
  dailyRange: string
  waterDays: string
  waterDaysNum: number
  tradeRoute: string
  keyFact: string
  regions: string[]
}

const SPECIES: Species[] = [
  {
    id: 'dromedary',
    name: 'Dromedary',
    latin: 'Camelus dromedarius',
    humps: 1,
    color: P.orange,
    population: '~38 million',
    popNum: 38000000,
    status: 'Domesticated (no wild populations)',
    habitat: 'Hot deserts — Sahara, Arabian Peninsula, Horn of Africa',
    domesticated: '~3000 BCE, SE Arabian Peninsula',
    tempRange: '0°C to +55°C',
    tempLow: 0,
    tempHigh: 55,
    maxWeight: '400–690 kg',
    maxWeightNum: 690,
    shoulderHeight: '1.8–2.4 m',
    carryCapacity: '100–200 kg',
    carryNum: 200,
    dailyRange: '60 km/day (light load)',
    waterDays: '10 days without water',
    waterDaysNum: 10,
    tradeRoute: 'Trans-Saharan + Incense Route',
    keyFact: '94% of all camels on earth. Built North Africa. No wild populations survive — the last wild dromedary went extinct millennia ago. Every dromedary alive is domesticated or feral.',
    regions: ['Morocco', 'Mauritania', 'Somalia', 'Sudan', 'Ethiopia', 'Kenya', 'Saudi Arabia', 'UAE', 'India', 'Pakistan', 'Australia'],
  },
  {
    id: 'bactrian',
    name: 'Domestic Bactrian',
    latin: 'Camelus bactrianus',
    humps: 2,
    color: P.indigo,
    population: '~2 million',
    popNum: 2000000,
    status: 'Domesticated',
    habitat: 'Cold deserts & steppes — Central Asia, Mongolia, China',
    domesticated: '~2500 BCE, Turkmenistan–Iran border',
    tempRange: '-40°C to +40°C',
    tempLow: -40,
    tempHigh: 40,
    maxWeight: '600–1,000 kg',
    maxWeightNum: 1000,
    shoulderHeight: '1.6–1.8 m (taller at hump: 2.1 m)',
    carryCapacity: '170–250 kg',
    carryNum: 250,
    dailyRange: '47 km/day (heavy load)',
    waterDays: '7 days without water',
    waterDaysNum: 7,
    tradeRoute: 'Silk Road',
    keyFact: 'Largest living camel. Shaggy winter coat for -40°C. The Silk Road animal — carried goods from China to the Mediterranean for two millennia. Named for Bactria, ancient Afghanistan.',
    regions: ['Mongolia', 'China', 'Kazakhstan', 'Kyrgyzstan', 'Turkmenistan', 'Iran', 'Afghanistan', 'Russia'],
  },
  {
    id: 'wild',
    name: 'Wild Bactrian',
    latin: 'Camelus ferus',
    humps: 2,
    color: P.red,
    population: '~950',
    popNum: 950,
    status: 'Critically Endangered (IUCN)',
    habitat: 'Gobi Desert — NW China, SW Mongolia',
    domesticated: 'Never domesticated',
    tempRange: '-40°C to +55°C',
    tempLow: -40,
    tempHigh: 55,
    maxWeight: '450–690 kg',
    maxWeightNum: 690,
    shoulderHeight: '1.6–1.8 m',
    carryCapacity: 'N/A — wild',
    carryNum: 0,
    dailyRange: '3–6.4 km/day (avg), up to 75 km',
    waterDays: 'Weeks — can drink salt water',
    waterDaysNum: 21,
    tradeRoute: 'None — avoids humans',
    keyFact: 'A separate species, NOT the ancestor of the domestic Bactrian. Diverged ~1 million years ago. Survived 43 atmospheric nuclear tests at Lop Nur. Drinks salt water that would kill its domestic cousin. Fewer than 1,000 remain.',
    regions: ['China (Lop Nur, Taklamakan)', 'Mongolia (Gobi)'],
  },
]

const MOROCCAN_BREEDS = [
  { name: 'Guerzni', role: 'Pack camel', trait: 'Small, stocky, teak skin, large hump. Hardy nomad breed — carries loads across the Sahara.', color: P.orange },
  { name: 'Marmouri', role: 'Riding camel', trait: 'Long legs, light build, thin skin. Fast — the mehari of the desert. Sensitive to harsh conditions.', color: P.salmon },
  { name: 'Khouari', role: 'Crossbreed', trait: 'Guerzni × Marmouri cross. Combines endurance with speed. The compromise breed.', color: P.gold },
]

const BIG_NUMBERS = [
  { num: '40M', label: 'Global camel population (2024)', sub: '94% dromedary, 6% Bactrian', color: P.orange },
  { num: '950', label: 'Wild Bactrian camels alive', sub: 'Fewer than the giant panda. Gobi Desert only.', color: P.red },
  { num: '46M', label: 'Years since Camelidae evolved', sub: 'North America. They crossed the Bering Strait.', color: P.indigo },
  { num: '1M', label: 'Years since wild & domestic Bactrian diverged', sub: 'Separate species, not ancestor–descendant', color: P.purple },
  { num: '43', label: 'Nuclear tests wild camels survived', sub: 'Lop Nur, China. Still breeding naturally.', color: P.red },
  { num: '8th c.', label: 'Morocco began industrial-scale breeding', sub: 'Including Bactrian × dromedary hybrids', color: P.cyan },
]

const TIMELINE = [
  { year: '46 Mya', event: 'Camelidae evolves in North America', color: P.navy },
  { year: '6–7 Mya', event: 'Ancestors cross Bering land bridge into Asia', color: P.indigo },
  { year: '4.4 Mya', event: 'Dromedary and Bactrian lineages diverge', color: P.purple },
  { year: '1 Mya', event: 'Wild and domestic Bactrian lineages split', color: P.red },
  { year: '~13,000 ya', event: 'Camels go extinct in North America (megafauna collapse)', color: P.dark },
  { year: '~3000 BCE', event: 'Dromedary domesticated in SE Arabia (milk, hair, leather)', color: P.orange },
  { year: '~2500 BCE', event: 'Bactrian domesticated at Turkmenistan–Iran border', color: P.indigo },
  { year: '~1200 BCE', event: 'S-Arabian saddle innovation → military camel use', color: P.salmon },
  { year: '~1000 BCE', event: 'Camel hybridization begins (Bactrian × dromedary)', color: P.gold },
  { year: '9th c. BCE', event: 'Dromedary introduced to Egypt', color: P.orange },
  { year: '5th c. BCE', event: 'Dromedary reaches wider North Africa', color: P.orange },
  { year: '2nd c. BCE', event: 'Silk Road fully operational — Bactrian is the vehicle', color: P.indigo },
  { year: '8th c. CE', event: 'Morocco breeds camels at scale + creates hybrid variants', color: P.cyan },
  { year: '8th c. CE', event: 'Trans-Saharan caravan routes open: Wadi Draa → Ghana Empire', color: P.gold },
  { year: '11th c. CE', event: 'Major route: Sijilmasa → Awdaghost (Almoravid era)', color: P.orange },
  { year: '1840–1907', event: 'Dromedaries imported to Australia for transport', color: P.mint },
  { year: '1964–1996', event: '43 nuclear tests at Lop Nur — wild camels survive', color: P.red },
  { year: '2002', event: 'Wild Bactrian listed as Critically Endangered (IUCN)', color: P.red },
  { year: '2024', event: 'UN International Year of Camelids', color: P.teal },
]

const COMPARISON_KEYS = [
  { key: 'Humps', get: (s: Species) => String(s.humps) },
  { key: 'Population', get: (s: Species) => s.population },
  { key: 'Conservation', get: (s: Species) => s.status },
  { key: 'Habitat', get: (s: Species) => s.habitat },
  { key: 'Domesticated', get: (s: Species) => s.domesticated },
  { key: 'Temperature range', get: (s: Species) => s.tempRange },
  { key: 'Max weight', get: (s: Species) => s.maxWeight },
  { key: 'Shoulder height', get: (s: Species) => s.shoulderHeight },
  { key: 'Carry capacity', get: (s: Species) => s.carryCapacity },
  { key: 'Daily range', get: (s: Species) => s.dailyRange },
  { key: 'Water endurance', get: (s: Species) => s.waterDays },
  { key: 'Trade route', get: (s: Species) => s.tradeRoute },
]

/* ─── Components ─── */

function Section({ children, bg = C.bg }: { children: React.ReactNode; bg?: string }) {
  return <section style={{ background: bg, padding: 'clamp(60px, 10vw, 120px) 24px' }}><div style={{ maxWidth: 1100, margin: '0 auto' }}>{children}</div></section>
}

function Micro({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 20 }}>{children}</div>
}

function Title({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 1.05, marginBottom: 16 }}>{children}</h2>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.8, color: C.body, maxWidth: 680 }}>{children}</p>
}

/* ─── Main Component ─── */

export function TheShipOfTheDesertContent() {
  const [activeSpecies, setActiveSpecies] = useState<string | null>(null)
  const heroV = useInView()
  const numV = useInView()
  const compV = useInView()
  const tlV = useInView()
  const morV = useInView()

  return (
    <main style={{ background: C.bg }}>

      {/* ═══ HERO ═══ */}
      <section ref={heroV.ref} style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(80px, 12vw, 160px) 24px 80px', background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', opacity: heroV.inView ? 1 : 0, transform: heroV.inView ? 'none' : 'translateY(32px)', transition: 'all 1s ease' }}>
          <Micro>Data Module · Three Species · Two Trade Routes</Micro>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(42px, 7vw, 88px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, marginBottom: 32 }}>
            The Ship of<br />the Desert
          </h1>
          <p style={{ fontFamily: F.mono, fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.8, color: C.secondary, maxWidth: 580 }}>
            Camels evolved in North America 46 million years ago. Crossed the Bering Strait. Built the Silk Road and the Saharan caravans. Today, 40 million serve humanity across three species — one of which is disappearing. The dromedary is not &quot;the Arabic camel.&quot; The Bactrian is not &quot;the Central Asian one.&quot; And the wild Bactrian is a separate species that survived nuclear tests and drinks water saltier than the sea.
          </p>

          {/* Three species glyphs */}
          <div style={{ display: 'flex', gap: 40, marginTop: 56, flexWrap: 'wrap' }}>
            {SPECIES.map((sp, i) => (
              <div key={sp.id} style={{ opacity: heroV.inView ? 1 : 0, transform: heroV.inView ? 'none' : 'translateY(24px)', transition: `all 0.8s ease ${i * 150}ms` }}>
                <div style={{ fontFamily: F.serif, fontSize: 56, fontStyle: 'italic', color: sp.color, lineHeight: 1 }}>
                  {sp.humps === 1 ? 'D' : 'B'}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 600, color: sp.color, letterSpacing: '0.06em', marginTop: 4 }}>{sp.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, fontStyle: 'italic' }}>{sp.latin}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIG NUMBERS ═══ */}
      <Section bg={C.alt}>
        <div ref={numV.ref}>
          <Micro>Key Numbers</Micro>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {BIG_NUMBERS.map((bn, i) => (
              <div key={i} style={{ opacity: numV.inView ? 1 : 0, transform: numV.inView ? 'none' : 'translateY(20px)', transition: `all 0.6s ease ${i * 100}ms` }}>
                <div style={{ fontFamily: F.serif, fontSize: 'clamp(36px, 5vw, 56px)', fontStyle: 'italic', fontWeight: 400, color: bn.color, lineHeight: 1 }}>{bn.num}</div>
                <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, color: C.ink, marginTop: 8, letterSpacing: '0.02em' }}>{bn.label}</div>
                <div style={{ fontFamily: F.mono, fontSize: 12, color: C.muted, marginTop: 4, lineHeight: 1.5 }}>{bn.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ SPECIES COMPARISON ═══ */}
      <Section>
        <div ref={compV.ref}>
          <Micro>Species Comparison</Micro>
          <Title>Three Camels, Three Worlds</Title>
          <Body>
            The dromedary rules the heat. The Bactrian carries the cold. The wild Bactrian is not their ancestor — it is a third species, diverged a million years ago, surviving in one of the most hostile landscapes on earth.
          </Body>

          {/* Species selector */}
          <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
            {SPECIES.map(sp => (
              <button key={sp.id} onClick={() => setActiveSpecies(activeSpecies === sp.id ? null : sp.id)} style={{
                fontFamily: F.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '10px 20px', cursor: 'pointer', transition: 'all 0.3s ease', border: 'none',
                background: activeSpecies === sp.id ? sp.color : 'transparent',
                color: activeSpecies === sp.id ? '#fff' : sp.color,
                outline: `1.5px solid ${sp.color}`,
              }}>
                {sp.name} ({sp.humps} hump{sp.humps > 1 ? 's' : ''})
              </button>
            ))}
          </div>

          {/* Comparison table */}
          <div style={{ marginTop: 40, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F.mono, fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: `2px solid ${C.ink}`, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, width: '20%' }}></th>
                  {SPECIES.map(sp => (
                    <th key={sp.id} style={{
                      textAlign: 'left', padding: '12px 16px', borderBottom: `2px solid ${sp.color}`,
                      color: sp.color, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                      opacity: !activeSpecies || activeSpecies === sp.id ? 1 : 0.2,
                      transition: 'opacity 0.3s ease',
                    }}>
                      {sp.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_KEYS.map((row, ri) => (
                  <tr key={row.key} style={{
                    opacity: compV.inView ? 1 : 0,
                    transform: compV.inView ? 'none' : 'translateX(-12px)',
                    transition: `all 0.5s ease ${ri * 60}ms`,
                  }}>
                    <td style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, verticalAlign: 'top' }}>
                      {row.key}
                    </td>
                    {SPECIES.map(sp => (
                      <td key={sp.id} style={{
                        padding: '10px 16px', borderBottom: `1px solid ${C.border}`, color: C.body, lineHeight: 1.6,
                        opacity: !activeSpecies || activeSpecies === sp.id ? 1 : 0.15,
                        transition: 'opacity 0.3s ease', verticalAlign: 'top',
                      }}>
                        {row.get(sp)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key fact per species */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 48 }}>
            {SPECIES.map((sp, i) => (
              <div key={sp.id} style={{
                padding: 28, borderLeft: `3px solid ${sp.color}`, background: C.alt,
                opacity: compV.inView ? 1 : 0, transform: compV.inView ? 'none' : 'translateY(16px)',
                transition: `all 0.6s ease ${i * 120}ms`,
              }}>
                <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: sp.color, marginBottom: 8 }}>{sp.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.7, color: C.body }}>{sp.keyFact}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ POPULATION BAR VIS ═══ */}
      <Section bg={'#0a0a0a'}>
        <Micro><span style={{ color: '#737373' }}>Population Scale</span></Micro>
        <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, marginBottom: 40 }}>
          The Disproportion
        </h2>
        <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.8, color: '#999', maxWidth: 600, marginBottom: 48 }}>
          If every camel on earth stood in a line, 94 of every 100 would be dromedaries. Five would be domestic Bactrians. And fewer than one in 40,000 would be wild.
        </p>

        {SPECIES.map((sp, i) => {
          const maxPop = 38000000
          const barWidth = sp.popNum < 1000 ? 0.3 : (sp.popNum / maxPop) * 100
          return (
            <div key={sp.id} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: sp.color }}>{sp.name}</span>
                <span style={{ fontFamily: F.serif, fontSize: 20, fontStyle: 'italic', color: sp.color }}>{sp.population}</span>
              </div>
              <div style={{ width: '100%', height: 6, background: '#1a1a1a', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  width: `${barWidth}%`, minWidth: sp.popNum < 1000 ? 3 : undefined,
                  height: '100%', background: sp.color, borderRadius: 3,
                  transition: 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }} />
              </div>
              {sp.id === 'wild' && (
                <div style={{ fontFamily: F.mono, fontSize: 11, color: '#666', marginTop: 6, fontStyle: 'italic' }}>
                  ← That red line is not empty. It represents 950 animals in the Gobi Desert.
                </div>
              )}
            </div>
          )
        })}

        <div style={{ marginTop: 48, padding: 24, border: '1px solid #222' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', marginBottom: 12 }}>The Ghost Species</div>
          <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: '#aaa' }}>
            The wild Bactrian camel (<em style={{ color: P.red }}>Camelus ferus</em>) is not the ancestor of the domestic Bactrian. Genetic analysis shows they diverged approximately one million years ago. The wild species has a flatter skull (Mongolian name: <em>havtagai</em>, &quot;flathead&quot;), smaller conical humps, sparser wool, and can drink brackish water saltier than the sea — an ability no domestic camel possesses. It survived 43 atmospheric nuclear tests at Lop Nur between 1964 and 1996, and is still breeding naturally on the irradiated steppe. Fewer than 950 remain in four locations across China and Mongolia. Each wild camel ranges over 12,000 km² per year. Poachers lay landmines at salt springs where they drink.
          </div>
        </div>
      </Section>

      {/* ═══ MOROCCO'S CAMELS ═══ */}
      <Section>
        <div ref={morV.ref}>
          <Micro>Morocco</Micro>
          <Title>The Saharan Machine</Title>
          <Body>
            Morocco&apos;s dromedaries are not one breed. Three distinct types — pack, riding, and crossbred — each shaped by centuries of selective pressure in the harshest terrain. From the 8th century CE, Morocco bred camels at industrial scale, even producing Bactrian × dromedary hybrids: a sleek messenger variant and a heavy cargo variant. The camel is slaughtered at weddings. Its meat costs less than mutton. Its image is the marker of Saharan identity.
          </Body>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 40 }}>
            {MOROCCAN_BREEDS.map((br, i) => (
              <div key={br.name} style={{
                padding: 28, borderTop: `3px solid ${br.color}`, background: C.alt,
                opacity: morV.inView ? 1 : 0, transform: morV.inView ? 'none' : 'translateY(16px)',
                transition: `all 0.6s ease ${i * 120}ms`,
              }}>
                <div style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: br.color, marginBottom: 4 }}>{br.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>{br.role}</div>
                <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.7, color: C.body }}>{br.trait}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, padding: 24, borderLeft: `3px solid ${P.cyan}`, background: C.alt }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.cyan, marginBottom: 8 }}>The 8th-Century Innovation</div>
            <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.7, color: C.body }}>
              From the 8th century CE, Morocco bred Bactrian × dromedary hybrids — the first documented camel crossbreeding programme in Africa. The F1 hybrids produced two variants: a fast, light messenger camel and a heavy cargo animal that could carry more than either parent species. Hybrid camels can bear up to 400 kg — nearly double a purebred dromedary. The <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>trans-Saharan</span> caravan routes from Wadi Draa to the Ghana Empire opened in this same century.
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ EVOLUTIONARY TIMELINE ═══ */}
      <Section bg={C.alt}>
        <div ref={tlV.ref}>
          <Micro>Timeline</Micro>
          <Title>46 Million Years</Title>
          <Body>
            Camels are American. They evolved in Arizona, crossed the Bering Strait, and went extinct in their homeland 13,000 years ago. Every camel caravan in the Sahara, every Silk Road shipment, every Australian feral herd traces back to a North American ancestor.
          </Body>

          <div style={{ marginTop: 48 }}>
            {TIMELINE.map((ev, i) => (
              <div key={i} style={{
                display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 0,
                padding: '16px 0', borderBottom: `1px solid ${C.border}`,
                opacity: tlV.inView ? 1 : 0, transform: tlV.inView ? 'none' : 'translateX(-12px)',
                transition: `all 0.5s ease ${Math.min(i * 50, 800)}ms`,
              }}>
                <div style={{
                  fontFamily: F.mono, fontSize: 11, fontWeight: 600, color: ev.color,
                  minWidth: 100, textAlign: 'right', flexShrink: 0,
                }}>
                  {ev.year}
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, flexShrink: 0, marginTop: 4 }} />
                <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.6, color: C.body }}>
                  {ev.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ THE CONVERGENCE ═══ */}
      <Section>
        <Micro>The Pattern</Micro>
        <Title>What the Camel Built</Title>
        <div style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.8, color: C.body, maxWidth: 680 }}>
          <p style={{ marginBottom: 24 }}>
            The same family, split between two deserts, built the two greatest overland trade networks in human history.
          </p>
          <p style={{ marginBottom: 24 }}>
            The <span style={{ color: P.indigo, fontWeight: 600 }}>Bactrian</span> carried silk, spices, and Buddhism across Central Asia. The <span style={{ color: P.orange, fontWeight: 600 }}>dromedary</span> carried gold, salt, and Islam across the Sahara. Between them, they connected China to Rome and Morocco to Mali — a continuous belt of camel-powered commerce encircling the entire arid zone of the Old World.
          </p>
          <p style={{ marginBottom: 24 }}>
            The dromedary arrived in North Africa late — perhaps the 5th century BCE, with wider adoption only in the 4th to 7th centuries CE. Before that, North African trade ran on donkeys, horses, and human backs. The camel did not merely improve Saharan trade. It made it <em>possible</em>. A horse dies in the deep Sahara. A dromedary drinks 145 litres in one session and walks 60 km the next day.
          </p>
          <p>
            And in the Gobi, the third species — the one that never agreed to be domesticated — runs from humans at 64 km in a day when captured, drinks water that would poison its cousins, and is slowly disappearing because miners lay landmines at the springs where it drinks.
          </p>
        </div>
      </Section>

      {/* ═══ SOURCES ═══ */}
      <Section bg={C.alt}>
        <Micro>Sources</Micro>
        <div style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, maxWidth: 680 }}>
          <p>Wikipedia: &quot;Camel,&quot; &quot;Dromedary,&quot; &quot;Bactrian camel,&quot; &quot;Wild Bactrian camel&quot; · Britannica: &quot;Camel&quot; · FAO: Camels factsheet (2024) · Almathen et al. (2016), &quot;Ancient and modern DNA reveal dynamics of domestication,&quot; PNAS · Mohandesan et al. (2017), &quot;Old World camels in a modern world,&quot; Animal Genetics · Yuan et al. (2024), Bactrian camel cladogram, genome analysis · IUCN Red List: Camelus ferus (Critically Endangered → Endangered, 2025 reclassification) · Wild Camel Protection Foundation (wildcamels.com) · ZSL: Conservation of Mongolia&apos;s Wild Camels · Frontiers in Pastoralism: &quot;Economic contribution of camel-based livestock systems in North-African drylands&quot; (Morocco, 2024) · ICAR: &quot;Camel genetic resources in Morocco&quot; (Guerouali) · World History Encyclopedia: &quot;The Camel Caravans of the Ancient Sahara&quot; · AramcoWorld: &quot;Camels: The Magnificent Migration&quot; (2018) · PMC: &quot;Homogeneity of Arabian Peninsula dromedary camel populations&quot; (2022) · San Diego Zoo Wildlife Alliance: Camel factsheet.</p>
        </div>
      </Section>

      {/* ═══ COPYRIGHT ═══ */}
      <section style={{ background: C.bg, padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, letterSpacing: '0.08em', lineHeight: 1.8 }}>
          © 2026 Slow Morocco. All rights reserved.<br />
          This visualization may not be reproduced without visible attribution.<br />
          Source: Slow Morocco
        </div>
      </section>

    </main>
  )
}
