'use client'

import { useEffect, useRef, useState } from 'react'

const C = {
  black: '#0a0a0a', dark: '#262626', mid: '#525252', light: '#737373', muted: '#a3a3a3',
  line: '#e5e5e5', off: '#fafafa', white: '#fff',
  teal: '#047857', green: '#15803d', amber: '#B45309', red: '#991B1B', crimson: '#DC2626', blue: '#0369A1', gold: '#A16207',
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
   CHART 1: The Destruction and Recovery Timeline
   ═══════════════════════════════════════════ */

const TIMELINE = [
  { year: '1960', label: 'Park established by Portugal. "Eden of Africa." Peak wildlife populations.', type: 'origin' },
  { year: '1964', label: 'Mozambique independence war begins. Park becomes supply route.', type: 'crisis' },
  { year: '1977', label: 'Civil war erupts. Both sides hunt wildlife for food and ivory revenue. 15 years of devastation.', type: 'crisis' },
  { year: '1992', label: 'Peace agreement. War killed ~1M people. Park is silent — mines, snares, no animals.', type: 'crisis' },
  { year: '1994', label: 'First aerial census: 90-99% of large mammals gone. Elephants 2,500→~200. Lions to single digits.', type: 'crisis' },
  { year: '2004', label: 'Greg Carr meets President Chissano. Spends 2 years studying Mozambique.', type: 'origin' },
  { year: '2008', label: 'Gorongosa Restoration Project launches. 20-year PPP with government. 20,000 snares removed.', type: 'launch' },
  { year: '2010', label: 'First herbivore reintroductions: 200 buffalo, 200 wildebeest, zebra arrive.', type: 'growth' },
  { year: '2013', label: 'New civil conflict erupts around park. Renamo insurgents operate in buffer zone.', type: 'crisis' },
  { year: '2014', label: 'E.O. Wilson visits, calls Gorongosa "a window into eternity." Biodiversity Lab founded.', type: 'growth' },
  { year: '2018', label: 'Agreement extended 25 more years (to 2043). Boundaries expanded to include Mt Gorongosa.', type: 'expansion' },
  { year: '2019', label: 'Cyclone Idai devastates region. 100,000 homes destroyed. Park infrastructure damaged.', type: 'crisis' },
  { year: '2022', label: '60 Minutes returns. Carr: "Nature can rebound." 100,000+ animals documented.', type: 'growth' },
  { year: '2024', label: 'Aerial survey: 110,000+ animals, exceeding pre-war numbers. BBVA Foundation Award.', type: 'expansion' },
  { year: '2025', label: 'Lions 6→210+. Elephants ~200→800+. Wild dogs 0→200+. Buffalo ~100→1,900+.', type: 'expansion' },
]

export function DestructionRecoveryTimeline() {
  const { ref, visible } = useInView(0.1)
  const typeColor = (t: string) => t === 'crisis' ? C.crimson : t === 'origin' ? C.muted : t === 'launch' ? C.teal : t === 'growth' ? C.green : C.amber
  return (
    <div ref={ref} className="relative pl-6 md:pl-8">
      <div className="absolute left-3 md:left-4 top-0 bottom-0 w-[2px] bg-[#e5e5e5]" />
      <div className="space-y-4">
        {TIMELINE.map((t, i) => (
          <div
            key={`${t.year}-${i}`}
            className="relative flex gap-4"
            style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.05}s` }}
          >
            <div className="absolute -left-6 md:-left-8 w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: typeColor(t.type), top: 2 }} />
            <div>
              <span className="text-[12px] font-mono font-bold" style={{ color: typeColor(t.type) }}>{t.year}</span>
              <p className="text-[12px] text-[#525252] leading-relaxed mt-0.5">{t.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: Species Recovery — Before/After Bars
   ═══════════════════════════════════════════ */

const SPECIES_RECOVERY = [
  { species: 'Large mammals (total)', before: 10000, after: 110000, factor: '11×', color: C.teal },
  { species: 'Antelope (all species)', before: 1000, after: 65000, factor: '65×', color: C.green },
  { species: 'Buffalo', before: 100, after: 1900, factor: '19×', color: C.amber },
  { species: 'Hippo', before: 100, after: 1100, factor: '11×', color: C.blue },
  { species: 'Elephant', before: 200, after: 800, factor: '4×', color: C.gold },
  { species: 'Wildebeest', before: 0, after: 1500, factor: '0→1.5k', color: C.green },
  { species: 'Lion', before: 6, after: 210, factor: '35×', color: C.amber },
  { species: 'Wild dog', before: 0, after: 200, factor: '0→200', color: C.crimson },
]

export function SpeciesRecovery() {
  const { ref, visible } = useInView(0.15)
  const maxVal = 110000
  return (
    <div ref={ref} className="space-y-3">
      {SPECIES_RECOVERY.map((s, i) => (
        <div key={s.species} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s` }}>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[12px] font-semibold text-[#0a0a0a]">{s.species}</span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#a3a3a3]">{s.before > 0 ? s.before.toLocaleString() : '0'} → {s.after.toLocaleString()}</span>
              <span className="text-[14px] font-serif font-light" style={{ color: s.color }}>{s.factor}</span>
            </div>
          </div>
          <div className="relative h-[14px] bg-[#f5f5f5] rounded-sm overflow-hidden">
            {s.before > 0 && <div className="absolute top-0 left-0 h-full rounded-sm bg-[#DC2626] opacity-20" style={{ width: `${(s.before / maxVal) * 100}%` }} />}
            <div className="absolute top-0 left-0 h-full rounded-sm" style={{
              width: visible ? `${Math.max((s.after / maxVal) * 100, 2)}%` : '0%',
              background: s.color, opacity: 0.55,
              transition: `width 1s ease ${i * 0.08}s`,
            }} />
          </div>
        </div>
      ))}
      <p className="text-[9px] text-[#a3a3a3] mt-3">Before = post-war nadir (~1994-2004). After = 2024-25 survey data. Sources: Gorongosa Restoration Project, BBVA Foundation, 60 Minutes. © Slow Morocco</p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: The Integrated Model — Four Pillars
   ═══════════════════════════════════════════ */

const PILLARS = [
  { name: 'Conservation', color: C.teal, stats: ['400,000 hectares protected', '1,800 employees (99% Mozambican)', 'Zero poaching evidence in 2024 survey', 'Ranger network across entire park'], desc: 'Anti-poaching, species reintroduction, habitat restoration, and 3M+ trees planted on Mt Gorongosa.' },
  { name: 'Science', color: C.blue, stats: ['E.O. Wilson Biodiversity Lab', 'BioEd MSc programme — largest intake 2025', '500+ bird species documented', 'Predator genetics research expanded'], desc: 'Research centre training Mozambican scientists. New species documented. Conservation decisions guided by data.' },
  { name: 'Community', color: C.amber, stats: ['1,800+ jobs — largest employer in Sofala', '868 coffee farmers on Mt Gorongosa', '$30M annual budget (Carr contributes $6M)', 'Schools, clinics, healthcare in buffer zone'], desc: 'The model that makes the park pay for itself by investing in people, not just fences.' },
  { name: 'Tourism', color: C.gold, stats: ['3 camps: basic to Muzimu luxury lodge', 'Condé Nast Traveller "best in Africa" list', 'All-female ranger patrols launched 2024', 'Revenue funds community programmes'], desc: 'Tourism revenue reinvested into both conservation and community development.' },
]

export function IntegratedModel() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {PILLARS.map((p, i) => (
        <div
          key={p.name}
          className="border rounded-lg overflow-hidden bg-white"
          style={{
            borderColor: p.color + '30',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(12px)',
            transition: `all 0.5s ease ${i * 0.1}s`,
          }}
        >
          <div className="p-4 border-b border-[#e5e5e5]" style={{ borderLeftWidth: 4, borderLeftColor: p.color }}>
            <h3 className="text-[14px] font-semibold text-[#0a0a0a]">{p.name}</h3>
            <p className="text-[11px] text-[#525252] mt-1 leading-relaxed">{p.desc}</p>
          </div>
          <div className="p-3 space-y-1">
            {p.stats.map(s => (
              <p key={s} className="text-[10px] text-[#262626] pl-3 relative">
                <span className="absolute left-0 top-[5px] w-[5px] h-[5px] rounded-full" style={{ background: p.color, opacity: 0.4 }} />
                {s}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: The Stress Tests — What Tried to Kill It
   ═══════════════════════════════════════════ */

const STRESSES = [
  { year: '1977-92', event: 'Civil war', severity: 100, desc: '15 years. ~1M dead. 95% of wildlife killed. Elephants shot for ivory to fund arms. Mines everywhere.', survived: 'Barely — habitat intact, seeds and soil survived, rivers kept flowing.' },
  { year: '2013-14', event: 'Renamo insurgency', severity: 55, desc: 'New civil conflict. Renamo fighters operate in park buffer zone. Staff threatened. Tourism halted.', survived: 'Peace deal held. Operations disrupted but not destroyed. Park team stayed.' },
  { year: '2019', event: 'Cyclone Idai', severity: 70, desc: 'Category 2. 100,000 homes destroyed. Park infrastructure damaged. Flooding across Sofala.', survived: 'Infrastructure rebuilt. Community programmes proved essential for recovery trust.' },
  { year: '2020', event: 'COVID-19', severity: 40, desc: 'Tourism revenue collapsed. International travel frozen. Staff maintained on donor funding.', survived: 'Carr Foundation absorbed shock. Diversified revenue (coffee, honey) helped.' },
  { year: '2024-25', event: 'Cabo Delgado insurgency', severity: 35, desc: 'Islamist insurgency in northern Mozambique. Not in Gorongosa but threatens national stability.', survived: 'Ongoing. Park isolated from conflict zone. But national instability is structural risk.' },
]

export function StressTests() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="space-y-3">
      {STRESSES.map((s, i) => (
        <div
          key={s.event}
          className="p-4 rounded-md border border-[#e5e5e5] bg-white"
          style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono text-[#991B1B] font-bold">{s.year}</span>
              <span className="text-[13px] font-semibold text-[#0a0a0a] ml-3">{s.event}</span>
            </div>
            <div className="w-[100px] h-[8px] bg-[#f5f5f5] rounded-sm overflow-hidden">
              <div className="h-full rounded-sm bg-[#DC2626]" style={{ width: visible ? `${s.severity}%` : '0%', opacity: 0.5, transition: `width 0.8s ease ${i * 0.1}s` }} />
            </div>
          </div>
          <p className="text-[11px] text-[#525252] leading-relaxed">{s.desc}</p>
          <p className="text-[10px] text-[#047857] mt-1"><span className="font-semibold">Survived:</span> {s.survived}</p>
        </div>
      ))}
    </div>
  )
}
