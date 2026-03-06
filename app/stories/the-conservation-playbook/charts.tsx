'use client'

import { useEffect, useRef, useState } from 'react'

const C = {
  black: '#0a0a0a', dark: '#262626', mid: '#525252', light: '#737373', muted: '#a3a3a3',
  line: '#e5e5e5', off: '#fafafa', white: '#fff',
  amber: '#B45309', gold: '#A16207', teal: '#047857', green: '#15803d',
  red: '#991B1B', crimson: '#DC2626', blue: '#0369A1', sand: '#92400E',
}

export function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export function AnimCounter({ target, duration = 1800, prefix = '', suffix = '', decimals = 0 }: { target: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0)
  const { ref, visible } = useInView(0.1)
  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setVal((1 - Math.pow(1 - t, 3)) * target)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, target, duration])
  return <span ref={ref}>{prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</span>
}


/* ═══════════════════════════════════════════
   CHART 1: The Five Mechanisms — What Makes Conservation Work
   ═══════════════════════════════════════════ */

const MECHANISMS = [
  { id: 'M1', name: 'Community ownership', desc: 'Legal or functional rights over wildlife given to the people who live with it. Revenue stays local.', color: C.teal },
  { id: 'M2', name: 'Direct economic benefit', desc: 'People who bear the cost of living with wildlife receive personal, tangible, immediate income from its survival.', color: C.amber },
  { id: 'M3', name: 'Professional management', desc: 'Dedicated rangers, scientists, veterinary capacity. Anti-poaching infrastructure. Long-term operational funding.', color: C.blue },
  { id: 'M4', name: 'Cultural integration', desc: 'Conservation is embedded in existing cultural values rather than imposed over them. Traditional knowledge is honoured.', color: C.gold },
  { id: 'M5', name: 'Governance structure', desc: 'Accountability, transparency, elected committees, financial reporting. Rules exist and are enforced. Corruption has consequences.', color: C.green },
]

interface ModelScore {
  name: string
  country: string
  status: 'success' | 'partial' | 'failure' | 'emerging'
  scores: { [key: string]: number } // M1-M5, 0-3 scale
  keySpecies: string
  keyMetric: string
  vulnerability: string
}

const MODELS: ModelScore[] = [
  { name: 'Rwanda Gorilla Permits', country: 'Rwanda', status: 'success', scores: { M1: 2, M2: 3, M3: 3, M4: 2, M5: 3 }, keySpecies: 'Mountain gorilla', keyMetric: '254→1,063. Only great ape increasing.', vulnerability: 'Single-species dependency. Virunga instability.' },
  { name: 'Namibia Conservancies', country: 'Namibia', status: 'success', scores: { M1: 3, M2: 3, M3: 2, M4: 2, M5: 3 }, keySpecies: 'Elephant, desert lion, black rhino', keyMetric: 'Elephants 7k→26k. 45.6% of country protected.', vulnerability: 'Drought vulnerability. Tourism-dependent revenue.' },
  { name: 'Lion Guardians', country: 'Kenya/Tanzania', status: 'success', scores: { M1: 1, M2: 2, M3: 2, M4: 3, M5: 1 }, keySpecies: 'Lion', keyMetric: 'Lion killing -99%. Population tripled in Amboseli.', vulnerability: 'Donor-dependent. $100/month salaries from charity.' },
  { name: 'Gorongosa Restoration', country: 'Mozambique', status: 'success', scores: { M1: 1, M2: 2, M3: 3, M4: 1, M5: 2 }, keySpecies: 'Lion, elephant, buffalo, wild dog', keyMetric: '10,000→110,000+ animals. 10× recovery.', vulnerability: 'Single philanthropist ($100M+ from Carr). Insurgency.' },
  { name: 'African Parks Network', country: '13 countries', status: 'success', scores: { M1: 1, M2: 2, M3: 3, M4: 1, M5: 3 }, keySpecies: 'White rhino, multiple', keyMetric: '23 parks, 20M hectares. 2,000 rhino rewilding.', vulnerability: 'Franchise model. Government partnerships can end.' },
  { name: 'Kenya Conservancies (NRT)', country: 'Kenya', status: 'partial', scores: { M1: 2, M2: 2, M3: 2, M4: 2, M5: 2 }, keySpecies: 'Elephant, Grevy\'s zebra', keyMetric: '230 conservancies. 16% of Kenya. 83% of Mara wildlife.', vulnerability: 'Uneven quality. Some conservancies tokenistic.' },
  { name: 'Zimbabwe CAMPFIRE', country: 'Zimbabwe', status: 'partial', scores: { M1: 2, M2: 1, M3: 1, M4: 1, M5: 1 }, keySpecies: 'Elephant', keyMetric: 'Pioneer community model (1989). Revenue grew initially.', vulnerability: 'District councils captured revenue. Communities got ~15%.' },
  { name: 'Botswana Hunting Ban', country: 'Botswana', status: 'partial', scores: { M1: 1, M2: 1, M3: 2, M4: 0, M5: 2 }, keySpecies: 'Elephant (~130k)', keyMetric: 'Largest elephant population. Ban 2014, reversed 2019.', vulnerability: 'Community opposition to ban. Human-elephant conflict rose.' },
  { name: 'Trophy Hunting (general)', country: 'Pan-African', status: 'failure', scores: { M1: 0, M2: 0, M3: 1, M4: 0, M5: 0 }, keySpecies: 'Lion, elephant', keyMetric: '1.8% of tourism revenue. 3% reaches communities.', vulnerability: 'Structural failure. Removes prime breeders. Corrupt quotas.' },
  { name: 'SA Captive Lion Industry', country: 'South Africa', status: 'failure', scores: { M1: 0, M2: 0, M3: 0, M4: 0, M5: 0 }, keySpecies: 'Lion (10-12k captive)', keyMetric: 'Zero conservation value. Canned hunting. Bone trade.', vulnerability: 'Total failure on every dimension.' },
]

export function MechanismScorecard() {
  const { ref, visible } = useInView(0.1)
  const statusColor = (s: string) => s === 'success' ? C.green : s === 'partial' ? C.amber : s === 'failure' ? C.crimson : C.blue
  const statusLabel = (s: string) => s === 'success' ? 'SUCCESS' : s === 'partial' ? 'PARTIAL' : s === 'failure' ? 'FAILURE' : 'EMERGING'
  const scoreW = (n: number) => n === 0 ? 0 : n === 1 ? 33 : n === 2 ? 66 : 100
  return (
    <div ref={ref}>
      {/* mechanism legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
        {MECHANISMS.map(m => (
          <div key={m.id} className="p-2 rounded border border-[#e5e5e5] bg-white">
            <p className="text-[10px] font-mono font-bold" style={{ color: m.color }}>{m.id}</p>
            <p className="text-[10px] text-[#262626] font-semibold">{m.name}</p>
          </div>
        ))}
      </div>
      {/* model cards */}
      <div className="space-y-3">
        {MODELS.map((m, i) => {
          const total = Object.values(m.scores).reduce((a, b) => a + b, 0)
          return (
            <div
              key={m.name}
              className="border rounded-lg p-4 bg-white"
              style={{
                borderColor: statusColor(m.status) + '30',
                borderLeftWidth: 4,
                borderLeftColor: statusColor(m.status),
                opacity: visible ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 0.06}s`,
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-[#0a0a0a]">{m.name}</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded font-mono font-bold text-white" style={{ background: statusColor(m.status) }}>{statusLabel(m.status)}</span>
                  </div>
                  <p className="text-[10px] text-[#a3a3a3]">{m.country} · {m.keySpecies}</p>
                </div>
                <span className="font-serif text-[22px] font-light" style={{ color: statusColor(m.status) }}>{total}<span className="text-[12px] text-[#a3a3a3]">/15</span></span>
              </div>
              {/* mechanism bars */}
              <div className="flex gap-1 mb-2">
                {MECHANISMS.map(mech => (
                  <div key={mech.id} className="flex-1">
                    <div className="h-[6px] bg-[#f5f5f5] rounded-sm overflow-hidden">
                      <div className="h-full rounded-sm" style={{
                        width: visible ? `${scoreW(m.scores[mech.id])}%` : '0%',
                        background: mech.color, opacity: 0.6,
                        transition: `width 0.8s ease ${i * 0.04}s`,
                      }} />
                    </div>
                    <p className="text-[7px] text-center mt-0.5 text-[#a3a3a3] font-mono">{mech.id}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <p className="text-[10px] text-[#262626]"><span className="text-[#047857] font-semibold">Result:</span> {m.keyMetric}</p>
                <p className="text-[10px] text-[#262626] md:col-span-2"><span className="text-[#991B1B] font-semibold">Risk:</span> {m.vulnerability}</p>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-4">Scores: 0 = absent, 1 = weak, 2 = moderate, 3 = strong. Assessment by Dancing with Lions based on published evaluations, NACSO, IUCN, AWF, Maliasili, and programme reports. © Dancing with Lions</p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: The Recovery Stories — Before/After Numbers
   ═══════════════════════════════════════════ */

const RECOVERIES = [
  { place: 'Gorongosa', country: 'Mozambique', before: 10000, after: 110000, species: 'Large mammals (all)', period: '2004–2024', model: 'Philanthropic PPP', factor: '11×', color: C.teal },
  { place: 'Rwanda (gorilla)', country: 'Rwanda', before: 254, after: 1063, species: 'Mountain gorilla', period: '1981–2020', model: 'High-value permits', factor: '4.2×', color: C.green },
  { place: 'Namibia (elephant)', country: 'Namibia', before: 7000, after: 26000, species: 'Elephant', period: '1990s–2025', model: 'Community conservancy', factor: '3.7×', color: C.amber },
  { place: 'Amboseli (lion)', country: 'Kenya', before: 1, after: 0, species: 'Lion kills/year', period: '2006–2024', model: 'Lion Guardians', factor: '42→0', color: C.gold, special: true },
  { place: 'Akagera', country: 'Rwanda', before: 0, after: 100, species: 'White rhino', period: '2017–2025', model: 'African Parks', factor: '0→100', color: C.blue, special: true },
  { place: 'Namibia (zebra)', country: 'Namibia', before: 3000, after: 27000, species: 'Mountain zebra', period: '1990s–est.', model: 'Community conservancy', factor: '9×', color: C.amber },
  { place: 'Gorongosa (lion)', country: 'Mozambique', before: 6, after: 210, species: 'Lion', period: '2004–2025', model: 'Philanthropic PPP', factor: '35×', color: C.teal },
  { place: 'Kenya (Grevy\'s)', country: 'Kenya', before: 2500, after: 3000, species: 'Grevy\'s zebra', period: '2016–2024', model: 'NRT conservancy', factor: '+20%', color: C.blue },
]

export function RecoveryStories() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="space-y-3">
      {RECOVERIES.map((r, i) => {
        const ratio = r.special ? 0 : r.after / r.before
        const barW = r.special ? 90 : Math.min(ratio / 12 * 100, 95)
        return (
          <div
            key={`${r.place}-${r.species}`}
            className="flex gap-4 items-center p-3 rounded-md border border-[#e5e5e5] bg-white"
            style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s` }}
          >
            <div className="shrink-0 w-[80px]">
              <p className="font-serif text-[20px] font-light leading-none" style={{ color: r.color }}>{r.factor}</p>
              <p className="text-[8px] text-[#a3a3a3] font-mono uppercase mt-0.5">{r.model}</p>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-[#0a0a0a]">{r.place}</span>
                  <span className="text-[9px] text-[#a3a3a3]">{r.country}</span>
                </div>
                <span className="text-[10px] text-[#525252]">{r.species} · {r.period}</span>
              </div>
              <div className="h-[12px] bg-[#f5f5f5] rounded-sm overflow-hidden">
                <div className="h-full rounded-sm" style={{
                  width: visible ? `${barW}%` : '0%',
                  background: r.color, opacity: 0.55,
                  transition: `width 1s ease ${i * 0.08}s`,
                }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: The Failure Patterns — What Kills Conservation
   ═══════════════════════════════════════════ */

const FAILURES = [
  { pattern: 'Revenue capture', desc: 'Money enters national budgets and never returns to protected areas or communities. Tourism generates $29.3B; communities see fragments.', examples: 'CAMPFIRE (district councils took 85%), most national parks across Africa', severity: 95 },
  { pattern: 'Single donor dependency', desc: 'Programmes collapse when one funder exits. USAID shuttered 2025. COVID halved tourism overnight. Five donors = 54% of all funding.', examples: 'Namibia conservancies during COVID, Gorongosa (Carr dependency), USAID exit 2025', severity: 85 },
  { pattern: 'Cultural imposition', desc: 'Conservation designed in Western capitals, imposed on communities. Eviction model. Fortress parks. Fences, boots, guns.', examples: 'Amboseli evictions (1974), Serengeti Maasai removals, colonial park model', severity: 80 },
  { pattern: 'Perverse incentives', desc: 'Economic structures that reward killing over protecting. Zero cost to kill a lion. Trophy hunting removes prime breeders.', examples: 'Trophy hunting quota corruption, SA captive lions, lion bone trade', severity: 75 },
  { pattern: 'Conflict & instability', desc: 'War destroys conservation overnight. Gorongosa lost 95% of wildlife in civil war. DRC\'s Virunga under perpetual threat.', examples: 'Mozambique civil war, DRC M23, Sahel junta belt, CAR', severity: 90 },
  { pattern: 'Climate disruption', desc: 'Drought kills prey, prey loss kills predators, predators kill livestock, communities kill predators. Spiral.', examples: 'Namibia 11-year drought (desert lions 180→57), Kunene 723-animal cull', severity: 70 },
]

export function FailurePatterns() {
  const { ref, visible } = useInView(0.2)
  return (
    <div ref={ref} className="space-y-4">
      {FAILURES.map((f, i) => (
        <div
          key={f.pattern}
          className="p-4 rounded-md border border-[#fecaca]/30 bg-[#fef2f2]"
          style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-semibold text-[#991B1B]">{f.pattern}</span>
            <div className="w-[80px] h-[6px] bg-[#fecaca]/30 rounded-sm overflow-hidden">
              <div className="h-full rounded-sm bg-[#DC2626]" style={{ width: visible ? `${f.severity}%` : '0%', opacity: 0.6, transition: `width 0.8s ease ${i * 0.1}s` }} />
            </div>
          </div>
          <p className="text-[11px] text-[#525252] leading-relaxed">{f.desc}</p>
          <p className="text-[9px] text-[#991B1B]/60 mt-1 italic">{f.examples}</p>
        </div>
      ))}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: The Model Taxonomy — Five Architectures
   ═══════════════════════════════════════════ */

const ARCHITECTURES = [
  { name: 'Community Conservancy', archetype: 'Namibia', philosophy: 'Give wildlife to communities. Legal rights. Democratic governance. Revenue stays local.', strengths: 'Scale (20% of Namibia). Self-sustaining where tourism exists. Resilient governance.', weaknesses: 'Requires tourism market. Drought-vulnerable. Not all conservancies profitable.', bestFor: 'Countries with strong land rights, tourism potential, democratic tradition.', color: C.amber },
  { name: 'High-Value Permits', archetype: 'Rwanda gorillas', philosophy: 'Few visitors, high price, maximum revenue per encounter. Quality over quantity.', strengths: 'Extraordinary per-species revenue. Clear conservation incentive. Global brand.', weaknesses: 'Single-species risk. Political stability required. Excludes local visitors.', bestFor: 'Charismatic megafauna in small, manageable habitats.', color: C.teal },
  { name: 'Cultural Guardians', archetype: 'Lion Guardians', philosophy: 'Recruit the threat. People who kill wildlife are best placed to protect it. Redirect culture, don\'t replace it.', strengths: 'Transforms the root cause. Cost-effective ($1,200/guardian/year). Cultural buy-in.', weaknesses: 'Donor-dependent salaries. Doesn\'t scale without external funding. Species-specific.', bestFor: 'Human-wildlife conflict zones with strong pastoral/warrior cultures.', color: C.gold },
  { name: 'Philanthropic PPP', archetype: 'Gorongosa', philosophy: 'Single committed funder + government partnership. Long-term (20-40 year) investment. Total rebuild.', strengths: '10× wildlife recovery. Jobs, schools, clinics integrated. Coffee/agriculture diversification.', weaknesses: 'Replicability — how many Greg Carrs exist? $200M commitment. Insurgency risk.', bestFor: 'Post-conflict ecosystems with intact habitat but depleted wildlife.', color: C.green },
  { name: 'Management Franchise', archetype: 'African Parks', philosophy: 'NGO takes long-term management mandate from government. Centralised expertise deployed to weak-state parks.', strengths: '23 parks, 13 countries, 20M hectares. Eliminates poaching in managed areas. 2,000 rhino rewilding.', weaknesses: 'Government can revoke mandate. Top-down. Communities are beneficiaries, not owners.', bestFor: 'Failed state parks. Countries with low institutional capacity but political will.', color: C.blue },
]

export function ModelTaxonomy() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="space-y-4">
      {ARCHITECTURES.map((a, i) => (
        <div
          key={a.name}
          className="border rounded-lg overflow-hidden bg-white"
          style={{
            borderColor: a.color + '30',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(16px)',
            transition: `all 0.5s ease ${i * 0.1}s`,
          }}
        >
          <div className="p-4 border-b border-[#e5e5e5]" style={{ borderLeftWidth: 4, borderLeftColor: a.color }}>
            <div className="flex items-baseline justify-between">
              <h3 className="text-[14px] font-semibold text-[#0a0a0a]">{a.name}</h3>
              <span className="text-[10px] font-mono" style={{ color: a.color }}>Archetype: {a.archetype}</span>
            </div>
            <p className="text-[12px] text-[#525252] leading-relaxed mt-1 italic">{a.philosophy}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-3 border-b md:border-b-0 md:border-r border-[#e5e5e5]">
              <p className="text-[9px] uppercase tracking-wider text-[#047857] font-semibold mb-1">Strengths</p>
              <p className="text-[10px] text-[#525252] leading-relaxed">{a.strengths}</p>
            </div>
            <div className="p-3">
              <p className="text-[9px] uppercase tracking-wider text-[#991B1B] font-semibold mb-1">Weaknesses</p>
              <p className="text-[10px] text-[#525252] leading-relaxed">{a.weaknesses}</p>
            </div>
          </div>
          <div className="p-3 bg-[#fafafa] border-t border-[#e5e5e5]">
            <p className="text-[9px] text-[#737373]"><span className="font-semibold text-[#262626]">Best for:</span> {a.bestFor}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
