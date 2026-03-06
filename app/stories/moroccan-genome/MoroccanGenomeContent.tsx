'use client'

import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════
// THE MOROCCAN GENOME — What DNA Says
// Module 052 · Slow Morocco
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  na: '#1565C0',       // North African / Maghrebi
  eu: '#5C6BC0',       // European
  me: '#AB47BC',       // Middle Eastern
  wa: '#EF6C00',       // West African
  ssa: '#D84315',      // Sub-Saharan other
  other: '#78909C',    // Other/unassigned
  em81: '#1B5E20',     // E-M81 Berber marker
  j1: '#6A1B9A',       // J1 Arab marker
  r1b: '#0D47A1',      // R1b European
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

// Autosomal ancestry — Moroccan Genome Project Phase 1 (2025), 109 genomes
const ADMIXTURE = [
  { label: 'North African (Maghrebi)', pct: 51.2, color: C.na, note: 'Autochthonous component. Peaks in Amazigh groups. Related to Taforalt ancestry (15,000 ya). Not found outside North Africa at high frequency.' },
  { label: 'European', pct: 10.9, color: C.eu, note: 'Primarily Iberian/Mediterranean. Introduced via Neolithic expansion from Iberia through Gibraltar, Roman colonisation, and later interactions.' },
  { label: 'Middle Eastern', pct: 10.7, color: C.me, note: 'Arabian Peninsula + Levantine. Introduced primarily through Arab conquests (7th–11th c.) and Neolithic pastoralist expansions (~5,600 ya).' },
  { label: 'West African', pct: 6.8, color: C.wa, note: 'Sub-Saharan component. Introduced via trans-Saharan trade routes and historical slave trade. Higher in southern and urban Arab-speaking populations.' },
  { label: 'Other / Unresolved', pct: 20.4, color: C.other, note: 'Remaining ancestry from additional ancestral populations including East African, Basal Eurasian "ghost" populations, and components not resolved at K=19.' },
]

// Y-chromosome (paternal) haplogroups — MGP 2025 + Wikipedia synthesis
const Y_HAPLO = [
  { hg: 'E1b1b1 (E-M81)', pct: 36.6, color: C.em81, label: 'The Berber Marker', note: 'Autochthonous North African. 79–98% in Amazigh speakers. Originated ~2,000–3,000 years ago (extremely recent). Decreasing gradient south to north.' },
  { hg: 'F', pct: 19.5, color: '#607D8B', label: 'Broad Eurasian', note: 'Macro-haplogroup. Includes subclades not further resolved in this study.' },
  { hg: 'G2', pct: 17.1, color: '#795548', label: 'Neolithic Farmer', note: 'Associated with Neolithic expansion from Near East. Also common in Caucasus and Mediterranean Europe.' },
  { hg: 'E1b1 (other)', pct: 8.5, color: '#4CAF50', label: 'Other E1b1', note: 'Includes E-M78 (declines toward NW Africa) and other E1b1 subclades.' },
  { hg: 'J (J1 + J2)', pct: 7.0, color: C.j1, label: 'Arabian / Levantine', note: 'J1 dominates. 2nd most common haplogroup in North Africa overall (~20% in broader studies). Linked to Arab expansions.' },
  { hg: 'R1 / R1b', pct: 5.5, color: C.r1b, label: 'European / Atlantic', note: 'R1b typical of Western Europeans. 0.8–6.8% in Morocco. Introduced via Iberian gene flow.' },
  { hg: 'Other (K, etc.)', pct: 5.8, color: C.other, label: 'Diverse', note: 'Minor haplogroups including K, T, I, and others at low frequency.' },
]

// Maternal (mtDNA) lineages — synthesis from multiple studies
const MT_HAPLO = [
  { hg: 'West Eurasian (H, HV, U, etc.)', pct: 55, color: C.eu, note: 'Dominant maternal pool. Includes H (post-glacial Iberian expansion), U6 (autochthonous North African "back-to-Africa" marker), and HV.' },
  { hg: 'U6 (North African specific)', pct: 12, color: C.na, note: 'The signature North African maternal lineage. Evidence of back-to-Africa dispersal pre-Holocene (>12,000 ya). Peaks in Berber groups.' },
  { hg: 'M1 (North African)', pct: 5, color: '#00897B', note: 'Second autochthonous North African lineage. Like U6, evidence of early Eurasian back-migration into Africa.' },
  { hg: 'L (Sub-Saharan)', pct: 22, color: C.wa, note: 'Northern Berbers: 1–3%. Arab-speakers: up to 36% (El Jadida). Gradient north→south. Mix of ancient (L3*, ~20,000 ya) and recent (L2a, L3b, slave trade era).' },
  { hg: 'Other', pct: 6, color: C.other, note: 'Minor lineages including Near Eastern J, T, and others.' },
]

// E-M81 frequency by population
const EM81_FREQ = [
  { pop: 'Southern Moroccan Berber', pct: 98.5 },
  { pop: 'Central Moroccan Berber', pct: 89.8 },
  { pop: 'Sahrawi', pct: 76.0 },
  { pop: 'Northern Moroccan Berber', pct: 79.1 },
  { pop: 'Moroccan Arab-speakers', pct: 45.0 },
  { pop: 'Algerian Mozabite Berber', pct: 80.0 },
  { pop: 'Tunisian Berber (Chenini)', pct: 100.0 },
  { pop: 'Iberian Peninsula', pct: 5.0 },
  { pop: 'Sicily', pct: 6.0 },
  { pop: 'Sub-Saharan Africa', pct: 0.5 },
]

// Ancient DNA + migration timeline
const TIMELINE = [
  { year: '~300,000 ya', event: 'Homo sapiens remains at Jebel Irhoud, Morocco. Oldest known anatomically modern human fossils.', type: 'ancient' },
  { year: '~15,000 ya', event: 'Taforalt cave (Iberomaurusian). Ancient DNA shows: haplogroup E-M78*, U6, M1 mtDNA. High affinity with Near Eastern Natufians. Evidence of a "back-to-Africa" migration from Western Eurasia.', type: 'ancient' },
  { year: '~7,000 ya', event: 'Ifri N\'Ammar (Cardial Neolithic). New arrivals carry Levantine marker E-L19. Break in genetic continuity with Iberomaurusians — Neolithic farmers partially replace earlier populations.', type: 'ancient' },
  { year: '~5,600 ya', event: 'Neolithic demic diffusion from Middle East. Pastoralists introduce J1, G2 haplogroups and Middle Eastern ancestry. Agriculture spreads with genes.', type: 'migration' },
  { year: '~3,000 ya', event: 'Phoenician colonisation. Carthage founded (814 BCE). Levantine and Mediterranean gene flow into coastal Morocco.', type: 'migration' },
  { year: '~2,000–3,000 ya', event: 'E-M183/M81 undergoes rapid expansion across North Africa. Extremely recent TMRCA. Becomes the dominant paternal lineage in Amazigh populations.', type: 'ancient' },
  { year: '~1,400 ya', event: '7th–8th century Arab conquest. J1-P58 haplogroup introduced. Arabisation is both cultural AND demographic — recent studies confirm significant gene flow, not just language shift.', type: 'migration' },
  { year: '8th–17th c.', event: 'Trans-Saharan trade and slave trade introduce West African (L2a, L3b mtDNA) and Sub-Saharan Y lineages (E-V38). Higher frequencies in southern Morocco and urban centres.', type: 'migration' },
  { year: '711–1492 CE', event: 'Al-Andalus period. Berber and Arab soldiers cross to Iberia. E-M81 found at 5–11% in Spain today. Genetic evidence of Moroccan ancestry in Iberian peninsula.', type: 'migration' },
  { year: '2025', event: 'Moroccan Genome Project Phase 1: 109 whole genomes sequenced. 27 million variants identified, 1.4 million novel. First Moroccan Major Allele Reference Genome (MMARG) proposed.', type: 'modern' },
]

// ═══ ETHNICITY DATA ═══

// Self-identification — 2021 survey, 1,200 Moroccan adults
const SELF_ID = [
  { label: 'Arab', pct: 68, color: '#AB47BC' },
  { label: 'Amazigh (Berber)', pct: 25.6, color: '#1565C0' },
  { label: 'Sahrawi', pct: 3.6, color: '#EF6C00' },
  { label: 'Other', pct: 2.8, color: '#78909C' },
]

// Encyclopædia Britannica breakdown (alternate classification)
const BRITANNICA = [
  { label: 'Arab', pct: 44, color: '#AB47BC' },
  { label: 'Arabized Berber', pct: 24, color: '#7E57C2' },
  { label: 'Berber', pct: 21, color: '#1565C0' },
  { label: 'Moorish / Hassani', pct: 10, color: '#EF6C00' },
  { label: 'Other', pct: 1, color: '#78909C' },
]

// Language as ethnic proxy — 2024 Census + historical
const LANGUAGE_TREND = [
  { year: 1960, berber: 32, label: 'First post-independence census' },
  { year: 2004, berber: 28.2, label: 'Tashelhit 14.6%, Tamazight 8.8%, Tarifit 4.8%' },
  { year: 2014, berber: 26, label: 'Tashelhit 14.1%, Tamazight 7.9%, Tarifit 4%' },
  { year: 2024, berber: 24.8, label: 'Tashelhit 14.2%, Tamazight 7.4%, Tarifit 3.2%' },
]

// Mother tongue — 2024 Census
const MOTHER_TONGUE = [
  { label: 'Arabic (Darija)', pct: 80.6, color: '#AB47BC' },
  { label: 'Tashelhit (Souss/Atlas)', pct: 14.2, color: '#1565C0' },
  { label: 'Central Tamazight (Middle Atlas)', pct: 7.4, color: '#0D47A1' },
  { label: 'Tarifit (Rif)', pct: 3.2, color: '#1B5E20' },
]

// The three Amazigh language zones
const AMAZIGH_ZONES = [
  { name: 'Tashelhit (Shilha)', region: 'Souss Valley, High Atlas, Anti-Atlas', speakers: '~5.2 million', share: '14.2%', note: 'Largest Amazigh group in Morocco. ~8 million including diaspora. Rich oral poetry tradition (amarg). Historically important commercial class.' },
  { name: 'Central Atlas Tamazight', region: 'Middle Atlas, eastern High Atlas, Taza to Tafilalt', speakers: '~2.7 million', share: '7.4%', note: 'Foundation for Standard Moroccan Amazigh. 40–45% of speakers monolingual. Extends from forested mountains to Saharan oases.' },
  { name: 'Tarifit', region: 'Rif Mountains, northern Morocco', speakers: '~1.2 million', share: '3.2%', note: 'Historically most isolated. Strong diaspora in Belgium, Netherlands. Low mutual intelligibility with Tashelhit. Centre of 1958–59 Rif rebellion and 2016–17 Hirak protests.' },
  { name: 'Hassaniya Arabic', region: 'Southern provinces, Western Sahara', speakers: '~300,000', share: '0.8%', note: 'Arabic dialect of Sahrawi population. Mix of Arab-Amazigh tribal heritage. Traditionally nomadic Bedouin. Centre of Western Sahara sovereignty dispute.' },
]

// Other ethnic groups
const OTHER_GROUPS = [
  { name: 'Haratin', note: 'Dark-skinned agriculturalists of the southern oases (Drâa-Tafilalet). Not necessarily of slave origin — historian Chouki El Hamel argues many descend from native Black populations predating the Arab conquest. Concentrated in Zagora, Ouarzazate, Tinghir. Formerly the majority in parts of southern Morocco. The term itself is considered pejorative; many prefer "Drawi" or "Sahrawi."' },
  { name: 'Gnawa', note: 'Descendants of West African enslaved peoples (Soninke, Bambara, Fulani, Hausa) brought via trans-Saharan trade from 10th–19th centuries. Concentrated in Marrakech and Essaouira. Created a unique Sufi-African spiritual music tradition now recognised by UNESCO (2019). The name likely derives from Berber "agnaw" (Black person).' },
  { name: 'Moriscos', note: 'Descendants of Muslim refugees expelled from Spain after the Reconquista (15th–17th centuries). Settled primarily in Rabat (Salé), Fez, Tetouan, Chefchaouen. Brought Andalusian architecture, music (malhun, andalusi), cuisine, and craft traditions that remain central to Moroccan urban culture.' },
  { name: 'Jewish Moroccans', note: 'Present since at least the destruction of the First Temple (586 BCE). Peaked at 250,000 in 1948. Now ~2,500 in Morocco (largest Jewish community in the Arab world). Most emigrated to Israel, France, Canada after 1948. Morocco maintains Jewish heritage sites and the only Jewish museum in the Arab world (Casablanca).' },
  { name: 'Sub-Saharan migrants', note: 'Growing community since 2000s. Morocco regularised ~50,000 irregular migrants in 2014 and 2017. Primarily from Senegal, Guinea, Côte d\'Ivoire, Mali, DR Congo. Some in transit to Europe; increasingly settling permanently. Complex relationship with existing Black Moroccan communities.' },
]

// Key findings summary
const KEY_FINDINGS = [
  { stat: '51.2%', label: 'North African ancestry', detail: 'The majority component. Autochthonous. Not found at high frequency anywhere else on Earth.' },
  { stat: 'E-M81', label: 'Dominant paternal lineage', detail: '79–98% in Amazigh men. Only 2,000–3,000 years old. One of the most rapid Y-chromosome expansions ever documented.' },
  { stat: '~0', label: 'Genetic difference between Arab and Berber Moroccans', detail: 'Studies consistently show no strong genetic differentiation. Arabisation was primarily cultural. Berber and Arab Moroccans cluster together genetically.' },
  { stat: '15,000', label: 'Years of the oldest Moroccan ancient DNA', detail: 'Taforalt cave. Already showed mixed Eurasian and African ancestry. Back-to-Africa migration pre-dates all known civilisations.' },
]

// ═══════════════════════════════════════════════════
// STACKED BAR
// ═══════════════════════════════════════════════════

function AdmixtureBar({ data, title }: { data: typeof ADMIXTURE; title: string }) {
  const r = useReveal()
  const [hover, setHover] = useState<number | null>(null)
  return (
    <div ref={r.ref}>
      <p className="font-mono text-[10px] mb-3 tracking-wider" style={{ color: C.muted }}>{title}</p>
      <div className="flex h-12 w-full overflow-hidden border" style={{ borderColor: C.border }}>
        {data.map((d, i) => (
          <div key={d.label} className="h-full flex items-center justify-center cursor-pointer transition-all duration-500 relative"
            style={{ width: r.vis ? `${d.pct}%` : '0%', background: d.color, transitionDelay: `${i * 80}ms` }}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            {d.pct > 8 && <span className="text-white text-[10px] font-mono">{d.pct}%</span>}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
            <span className="text-[10px] font-mono" style={{ color: hover === i ? C.ink : C.muted }}>{d.label} ({d.pct}%)</span>
          </div>
        ))}
      </div>
      {hover !== null && (
        <div className="mt-3 p-3 border text-[12px] leading-relaxed transition-all" style={{ borderColor: data[hover].color, color: C.text }}>
          <strong style={{ color: data[hover].color }}>{data[hover].label}</strong>: {data[hover].note}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// HORIZONTAL BARS
// ═══════════════════════════════════════════════════

function HaploBar({ data, title }: { data: typeof Y_HAPLO; title: string }) {
  const r = useReveal()
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...data.map(d => d.pct))
  return (
    <div ref={r.ref}>
      <p className="font-mono text-[10px] mb-3 tracking-wider" style={{ color: C.muted }}>{title}</p>
      <div className="space-y-1.5">
        {data.map((d, i) => (
          <div key={d.hg} className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <span className="text-[9px] font-mono w-[140px] text-right shrink-0 truncate" style={{ color: hover === i ? d.color : C.muted }}>{d.hg}</span>
            <div className="flex-1 h-5 relative" style={{ background: '#f5f5f5' }}>
              <div className="h-full flex items-center px-2 transition-all duration-700"
                style={{ width: r.vis ? `${(d.pct / max) * 100}%` : '0%', background: d.color, transitionDelay: `${i * 60}ms` }}>
                <span className="text-white font-mono text-[9px] whitespace-nowrap">{d.pct}%</span>
              </div>
            </div>
            <span className="text-[9px] font-mono w-[90px] shrink-0 truncate" style={{ color: C.muted }}>{d.label}</span>
          </div>
        ))}
      </div>
      {hover !== null && (
        <div className="mt-3 p-3 border text-[12px] leading-relaxed" style={{ borderColor: data[hover].color, color: C.text }}>
          <strong style={{ color: data[hover].color }}>{data[hover].hg}</strong> — {data[hover].note}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// E-M81 FREQUENCY CHART
// ═══════════════════════════════════════════════════

function EM81Chart() {
  const r = useReveal()
  return (
    <div ref={r.ref}>
      <p className="font-mono text-[10px] mb-3 tracking-wider" style={{ color: C.em81 }}>E-M81 FREQUENCY BY POPULATION (%)</p>
      <div className="space-y-1.5">
        {EM81_FREQ.map((d, i) => (
          <div key={d.pop} className="flex items-center gap-2">
            <span className="text-[10px] font-mono w-[180px] text-right shrink-0" style={{ color: C.muted }}>{d.pop}</span>
            <div className="flex-1 h-5 relative" style={{ background: '#f5f5f5' }}>
              <div className="h-full flex items-center px-2 transition-all duration-700"
                style={{ width: r.vis ? `${d.pct}%` : '0%', background: C.em81, opacity: d.pct > 50 ? 1 : 0.5, transitionDelay: `${i * 50}ms` }}>
                {d.pct > 10 && <span className="text-white font-mono text-[9px]">{d.pct}%</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

export function MoroccanGenomeContent() {
  const heroR = useReveal()
  const keyR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-10">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 052 · Genetic Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Moroccan<br />Genome</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-6" style={{ color: C.muted }}>
            300,000 years of migration written in nucleotides. What DNA and identity say about who Moroccans are.
          </p>
          <p className="text-[15px] leading-[1.8] max-w-[620px]" style={{ color: C.text }}>
            Morocco sits at the crossroads of three continents. The Sahara to the south, the Mediterranean
            to the north, the Atlantic to the west, and a land bridge to the Middle East through Sinai.
            Every empire that crossed this intersection left its DNA. In 2025, the Moroccan Genome
            Project sequenced 109 whole genomes and found the answer: the average Moroccan is 51%
            autochthonous North African — an ancestry found nowhere else on Earth at high frequency —
            plus 11% European, 11% Middle Eastern, and 7% West African. The most common paternal
            lineage, E-M81, is only 2,000–3,000 years old — one of the most rapid genetic expansions
            ever documented. And the single most important finding: there is almost no genetic difference
            between <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Berber</span>-speaking and Arab-speaking Moroccans. Arabisation was a language shift,
            not a population replacement.
          </p>
        </div>
      </section>

      {/* ═══ KEY FINDINGS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-10">
        <div ref={keyR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {KEY_FINDINGS.map((k, i) => (
            <div key={k.label} className="border-t pt-3 transition-all duration-700"
              style={{ borderColor: C.na, opacity: keyR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
              <p className="font-serif text-[clamp(1.2rem,3vw,1.6rem)] leading-none" style={{ color: C.na }}>{k.stat}</p>
              <p className="text-[10px] font-mono mt-1 mb-1" style={{ color: C.muted }}>{k.label}</p>
              <p className="text-[11px] leading-relaxed" style={{ color: C.text }}>{k.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ I. AUTOSOMAL ADMIXTURE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Admixture</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Autosomal DNA — the full genome, inherited from both parents — reveals four major
          ancestry components in the average Moroccan. Based on 109 whole genomes at K=19
          resolution. Hover each segment for detail.
        </p>
        <AdmixtureBar data={ADMIXTURE} title="MOROCCAN AUTOSOMAL ANCESTRY (MOROCCAN GENOME PROJECT, 2025)" />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ II. Y-CHROMOSOME ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Father Line</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Y-chromosome haplogroups trace the paternal lineage — father to son, unchanged, for thousands
          of generations. E-M81 is the autochthonous North African marker. J1 arrived with the Arab conquests.
          R1b crossed from Europe. Hover any bar for the story.
        </p>
        <HaploBar data={Y_HAPLO} title="Y-CHROMOSOME HAPLOGROUPS (MGP 2025, 109 MALES)" />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ III. E-M81 THE BERBER MARKER ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Berber Marker</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          E-M81 (E-M183) is the most common paternal lineage in North Africa. It reaches
          near-fixation in southern Amazigh communities (98.5%) and declines as you move north,
          east, and across the Mediterranean. Its TMRCA of just 2,000–3,000 years makes it one of the
          youngest widespread Y-chromosome lineages ever studied — evidence of an extraordinary
          recent demographic expansion.
        </p>
        <EM81Chart />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ IV. MATERNAL LINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section IV</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Mother Line</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Mitochondrial DNA traces the maternal lineage — mother to child, for hundreds of
          thousands of years. The Moroccan maternal pool tells a different story than the paternal:
          more Eurasian, with the North African–specific U6 lineage as the indigenous signature.
        </p>
        <AdmixtureBar data={MT_HAPLO.map(d => ({ label: d.hg, pct: d.pct, color: d.color, note: d.note }))} title="MITOCHONDRIAL DNA HAPLOGROUPS (SYNTHESIS OF MULTIPLE STUDIES)" />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ V. TIMELINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section V</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">300,000 Years</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          From the oldest Homo sapiens fossils on Earth to the first national genome reference.
          Every migration left its mark in the nucleotides.
        </p>
        <div className="space-y-3">
          {TIMELINE.map((t, i) => {
            const rv = useReveal()
            const typeColor = t.type === 'ancient' ? C.na : t.type === 'migration' ? C.me : C.em81
            return (
              <div key={i} ref={rv.ref} className="flex gap-4 items-start transition-all duration-500"
                style={{ opacity: rv.vis ? 1 : 0, transform: rv.vis ? 'translateX(0)' : 'translateX(-10px)' }}>
                <div className="flex flex-col items-end shrink-0" style={{ width: 110 }}>
                  <span className="font-mono text-[11px] font-bold text-right" style={{ color: typeColor }}>{t.year}</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ background: typeColor }} />
                <div className="border-l pl-4 pb-1" style={{ borderColor: C.border }}>
                  <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>{t.event}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex gap-6 mt-6 text-[9px] font-mono" style={{ color: C.muted }}>
          <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: C.na }} />Ancient DNA</span>
          <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: C.me }} />Migration event</span>
          <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: C.em81 }} />Modern science</span>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ VI. THE IDENTITY QUESTION ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section VI</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Identity Question</h2>
        <p className="text-[13px] mb-10 max-w-[540px]" style={{ color: C.text }}>
          DNA says most Moroccans are genetically indistinguishable regardless of whether they speak
          Arabic or Berber. But identity is not DNA. Ask a Moroccan "what are you?" and the answer
          depends on who is asking, which categories are offered, and what is politically at stake.
          Every number below is contested.
        </p>

        {/* Two competing frameworks side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div>
            <p className="font-mono text-[10px] mb-3 tracking-wider" style={{ color: C.muted }}>SELF-IDENTIFICATION (2021 SURVEY, n=1,200)</p>
            {(() => {
              const r = useReveal()
              return (
                <div ref={r.ref}>
                  <div className="flex h-10 w-full overflow-hidden border" style={{ borderColor: C.border }}>
                    {SELF_ID.map((d, i) => (
                      <div key={d.label} className="h-full flex items-center justify-center transition-all duration-500"
                        style={{ width: r.vis ? `${d.pct}%` : '0%', background: d.color, transitionDelay: `${i * 80}ms` }}>
                        {d.pct > 8 && <span className="text-white text-[9px] font-mono">{d.pct}%</span>}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                    {SELF_ID.map(d => (
                      <div key={d.label} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-sm" style={{ background: d.color }} />
                        <span className="text-[9px] font-mono" style={{ color: C.muted }}>{d.label} ({d.pct}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
          <div>
            <p className="font-mono text-[10px] mb-3 tracking-wider" style={{ color: C.muted }}>ENCYCLOPÆDIA BRITANNICA CLASSIFICATION</p>
            {(() => {
              const r = useReveal()
              return (
                <div ref={r.ref}>
                  <div className="flex h-10 w-full overflow-hidden border" style={{ borderColor: C.border }}>
                    {BRITANNICA.map((d, i) => (
                      <div key={d.label} className="h-full flex items-center justify-center transition-all duration-500"
                        style={{ width: r.vis ? `${d.pct}%` : '0%', background: d.color, transitionDelay: `${i * 80}ms` }}>
                        {d.pct > 8 && <span className="text-white text-[9px] font-mono">{d.pct}%</span>}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                    {BRITANNICA.map(d => (
                      <div key={d.label} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-sm" style={{ background: d.color }} />
                        <span className="text-[9px] font-mono" style={{ color: C.muted }}>{d.label} ({d.pct}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>

        <p className="text-[12px] leading-relaxed p-3 border-l-2 mb-12 max-w-[620px]" style={{ borderColor: C.na, color: C.text }}>
          Note the gap: when Moroccans self-identify, 68% say "Arab." But Britannica classifies only
          44% as Arab and adds a category — "Arabized Berber" (24%) — for people who are genetically
          and historically Amazigh but culturally and linguistically Arab. The Amazigh movement contests
          all of these numbers, arguing that 40–85% of Moroccans are of Amazigh origin, and that centuries
          of Arabisation policy have suppressed indigenous identity.
        </p>

        {/* Mother tongue — the language proxy */}
        <p className="font-mono text-[10px] mb-3 tracking-wider" style={{ color: C.muted }}>MOTHER TONGUE — 2024 CENSUS</p>
        {(() => {
          const r = useReveal()
          return (
            <div ref={r.ref} className="mb-10">
              {MOTHER_TONGUE.map((d, i) => (
                <div key={d.label} className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono w-[200px] text-right shrink-0" style={{ color: C.muted }}>{d.label}</span>
                  <div className="flex-1 h-5 relative" style={{ background: '#f5f5f5' }}>
                    <div className="h-full flex items-center px-2 transition-all duration-700"
                      style={{ width: r.vis ? `${d.pct}%` : '0%', background: d.color, transitionDelay: `${i * 60}ms` }}>
                      {d.pct > 5 && <span className="text-white font-mono text-[9px]">{d.pct}%</span>}
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-[11px] mt-2 ml-[210px]" style={{ color: C.muted }}>
                Amazigh speakers total 24.8% (percentages overlap due to bilingualism). Amazigh activists claim methodology undercounts, estimating 40%+.
              </p>
            </div>
          )
        })()}

        {/* Berber language decline trend */}
        <p className="font-mono text-[10px] mb-3 tracking-wider" style={{ color: C.muted }}>BERBER-SPEAKING POPULATION (% BY CENSUS)</p>
        {(() => {
          const r = useReveal()
          return (
            <div ref={r.ref} className="mb-10 flex items-end gap-4 h-[140px]">
              {LANGUAGE_TREND.map((d, i) => (
                <div key={d.year} className="flex flex-col items-center flex-1">
                  <span className="text-[10px] font-mono mb-1 transition-all duration-500"
                    style={{ color: C.na, opacity: r.vis ? 1 : 0 }}>{d.berber}%</span>
                  <div className="w-full transition-all duration-700 flex items-end justify-center"
                    style={{ height: r.vis ? `${(d.berber / 35) * 100}px` : '0px', background: C.na, opacity: 0.7 + (d.berber / 100), transitionDelay: `${i * 100}ms` }}>
                  </div>
                  <span className="text-[9px] font-mono mt-1" style={{ color: C.muted }}>{d.year}</span>
                </div>
              ))}
            </div>
          )
        })()}
        <p className="text-[11px] leading-relaxed max-w-[540px]" style={{ color: C.text }}>
          Berber-speaking Moroccans have declined from 32% at independence (1960) to 24.8% in the
          2024 census. Amazigh organisations call this "linguistic genocide" — the result of decades of
          Arabisation in education, media, and administration. The 2011 constitution made Tamazight an
          official language, but literacy in Berber remains at just 1.5%.
        </p>

        {/* Amazigh zones */}
        <div className="mt-12">
          <p className="font-mono text-[10px] mb-4 tracking-wider" style={{ color: C.muted }}>THE THREE AMAZIGH LANGUAGE ZONES + HASSANIYA</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AMAZIGH_ZONES.map((z, i) => {
              const rv = useReveal()
              const zoneColors = [C.na, '#0D47A1', '#1B5E20', '#EF6C00']
              return (
                <div key={z.name} ref={rv.ref} className="border p-4 transition-all duration-500"
                  style={{ borderColor: C.border, opacity: rv.vis ? 1 : 0, transform: rv.vis ? 'translateY(0)' : 'translateY(8px)', transitionDelay: `${i * 80}ms` }}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: zoneColors[i] }} />
                    <p className="font-serif text-[15px]">{z.name}</p>
                    <span className="text-[10px] font-mono ml-auto" style={{ color: zoneColors[i] }}>{z.share}</span>
                  </div>
                  <p className="text-[10px] font-mono mb-1" style={{ color: C.muted }}>{z.region} · {z.speakers}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: C.text }}>{z.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ VII. THE INVISIBLE GROUPS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section VII</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Invisible Groups</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.text }}>
          The Arab-Berber binary leaves out the Moroccans who fit neither category. These communities
          are rarely counted in censuses or surveys, but they are woven into the country's fabric.
        </p>
        <div className="space-y-4">
          {OTHER_GROUPS.map((g, i) => {
            const rv = useReveal()
            return (
              <div key={g.name} ref={rv.ref} className="border-l-2 pl-4 py-2 transition-all duration-500"
                style={{ borderColor: C.wa, opacity: rv.vis ? 1 : 0, transform: rv.vis ? 'translateX(0)' : 'translateX(-8px)', transitionDelay: `${i * 60}ms` }}>
                <p className="font-serif text-[15px] mb-1">{g.name}</p>
                <p className="text-[12px] leading-relaxed" style={{ color: C.text }}>{g.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-[18px] mb-2">Arab ≠ Arabian</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              The biggest surprise in Moroccan genetics: Berber-speaking and Arab-speaking
              Moroccans are genetically nearly indistinguishable. In PCA plots, both groups
              cluster together. Earlier studies suggested Arabisation was purely cultural —
              a language shift without population replacement. More recent work (2017, 2024)
              shows it was both: real gene flow occurred, but the indigenous Berber substrate
              remained dominant. Being "Arab" in Morocco is primarily a linguistic identity,
              not a distinct genetic ancestry.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Counting Problem</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Morocco has never conducted an ethnic census. All numbers are estimates or language
              proxies. A 2021 survey says 68% Arab; Britannica says 44%. The gap is the "Arabized
              Berber" — people genetically Amazigh who speak Arabic and identify as Arab. The
              2024 census found 24.8% speak Berber, but Amazigh groups say the real figure is
              40–85%, arguing the methodology undercounts. The 2011 constitution acknowledged the
              problem by defining Morocco's identity as "Arab-Islamic, Amazigh, and Saharan-Hassani."
              Even the state admits it is all three.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">"I Am from Here"</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              In 2020, Black Moroccan artist M'Barek Bouhchichi said: "Any Black person in
              Morocco is told they came from sub-Saharan Africa. And this is where they are wrong.
              I am from here." Historian Chouki El Hamel argues the Haratin are not
              descendants of slaves but native Black populations who inhabited southern Morocco
              before the Arab conquest. The assumption that darker skin equals foreign origin is
              both genetically and historically unfounded — yet it persists, structuring social
              hierarchies in the south. Out of 515 members of parliament, only 7 are Black.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <p className="font-serif text-[18px] mb-2">The Back-to-Africa Migration</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Taforalt cave in eastern Morocco (15,000 ya) contained the oldest DNA in North
              Africa — and it showed high affinity with Near Eastern Natufian populations.
              This means the indigenous "North African" ancestry itself came from Eurasia,
              in a back-migration predating the Holocene. The U6 and M1 mitochondrial lineages
              are the molecular evidence. North Africa was populated from both directions:
              out of Africa, and then back into it.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The 2,000-Year-Old Marker</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              E-M81 is found at 80–98% in Amazigh men across Morocco, Algeria, Tunisia, and
              Libya. Yet its most recent common ancestor lived only 2,000–3,000 years ago. This
              is extraordinarily young for a lineage at such high frequency. It implies a
              massive, rapid demographic expansion — possibly linked to the development of
              oasis agriculture, Berber confederations, or <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">trans-Saharan</span> trade networks that
              gave certain lineages an outsized reproductive advantage.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Sahrawi Question</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Sahrawis — <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Hassaniya</span>-speaking tribes of mixed Arab-Amazigh descent — represent
              roughly 3.6% of Morocco's population. They are genetically similar to southern
              Moroccans and Mauritanians, with E-M81 at ~76% in Sahrawi men. The Western Sahara
              sovereignty dispute makes their demographic counting politically charged: Morocco
              claims the territory; the Polisario Front seeks independence. An estimated 90,000–190,000
              Sahrawis live in the disputed territory, with ~165,000 in refugee camps in Algeria.
            </p>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <p><strong>Genetics:</strong> Moroccan Genome Project Phase 1 (2025), <em>Communications Biology</em>. 109 whole genomes. Ancestry: 51.2% North African, 10.9% European, 10.7% Middle Eastern, 6.8% West African. Y-haplogroups: E1b1b1 36.6%, F 19.5%, G2 17.1%. E-M81 frequency: Reguig et al. (2014), <em>Human Biology</em>, 295 Berber men. E-M81 TMRCA: Solé-Morata et al. (2017), <em>Scientific Reports</em>. Demographic model: Serradell et al. (2024), <em>Genome Biology</em>. Taforalt ancient DNA: Loosdrecht et al. (2018), <em>Science</em>. mtDNA synthesis: Frigi et al. (2010); Coudray et al. (2009). Arab/Berber genetic similarity: Arauna et al. (2017), <em>Molecular Biology and Evolution</em>.</p>
          <p><strong>Ethnicity &amp; demographics:</strong> 2021 survey (n=1,200): 68% Arab, 25.6% Berber, 3.6% Sahrawi per Wikipedia "Demographics of Morocco." Britannica breakdown: 44% Arab, 24% Arabized Berber, 21% Berber, 10% Moorish. 2024 Census (HCP): 24.8% Berber-speakers (Tashelhit 14.2%, Tamazight 7.4%, Tarifit 3.2%); 80.6% Arabic mother tongue; 1.5% Berber literacy. Amazigh contestation: IWGIA <em>Indigenous World 2025</em>. Berber language decline: Wikipedia "Berber languages" citing census data 1960–2024.</p>
          <p><strong>Haratin &amp; Gnawa:</strong> El Hamel, Chouki, "Blacks and Slavery in Morocco" (2006). Bouhchichi quote: POMEPS, "National Identity in the Afro-Arab Periphery" (2022). Parliamentary representation: same source (7/515 Black MPs). Gnawa history: Afropop Worldwide. UNESCO Intangible Heritage listing (2019). Haratin demographics: Wikipedia "Haratin," citing French explorer Charles de Foucauld and historian Remco Ensel. Jewish population: World Jewish Congress and Morocco.com.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: 'rgba(255,255,255,0.7)' }}>
          © Slow Morocco · slowmorocco.com · Population genetics and ethnicity data represent group-level patterns and contested political categories. Numbers vary by source, methodology, and political context. This visualisation may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
