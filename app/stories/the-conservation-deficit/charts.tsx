'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ── palette ── */
const C = {
  black: '#0a0a0a', dark: '#262626', mid: '#525252', light: '#737373', muted: '#a3a3a3',
  line: '#e5e5e5', off: '#fafafa', white: '#fff',
  red: '#991B1B', crimson: '#DC2626', amber: '#B45309', gold: '#A16207',
  teal: '#047857', green: '#15803d', blue: '#0369A1',
}

/* ── useInView ── */
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

/* ── AnimCounter ── */
export function AnimCounter({ target, duration = 1800, prefix = '', suffix = '', decimals = 0 }: { target: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0)
  const { ref, visible } = useInView(0.1)
  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setVal(ease * target)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, target, duration])
  return <span ref={ref}>{prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</span>
}

/* ── FadeIn ── */
export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 1: The Asset — Species Population Collapse
   Stacked decline bars showing population trajectories
   ═══════════════════════════════════════════ */

const SPECIES_DATA = [
  { name: 'African Elephant', historic: 26000000, current: 415000, unit: '', color: C.mid, note: 'Savanna -70%, Forest -90% over 50 years. 77% combined decline.' },
  { name: 'Lion', historic: 200000, current: 23000, unit: '', color: C.amber, note: '-88% since 1900. Extinct in 26 countries. 7% of historic range.' },
  { name: 'Black Rhino', historic: 100000, current: 6788, unit: '', color: C.red, note: '-93% since 1960. Now 6,788 — growing 5.2% per year.' },
  { name: 'White Rhino', historic: 20000, current: 15752, unit: '', color: C.teal, note: 'From 80 in 1930s → 20,000 by 2018 → 15,752 in 2024. -11.2%.' },
  { name: 'Mountain Gorilla', historic: 680, current: 1063, unit: '', color: C.green, note: '+316% from 254 (1981). Only great ape increasing.' },
  { name: 'Pangolin (all African)', historic: 10000000, current: 1000000, unit: 'est.', color: C.crimson, note: '8.5M removed 2014-2021 from West/Central Africa alone.' },
]

export function SpeciesCollapse() {
  const { ref, visible } = useInView(0.2)
  return (
    <div ref={ref} className="space-y-5">
      {SPECIES_DATA.map((s, i) => {
        const pctRemaining = Math.min((s.current / s.historic) * 100, 100)
        const pctLost = 100 - pctRemaining
        const isGrowing = s.current > s.historic * 0.5
        const decline = s.historic > s.current
          ? `-${Math.round((1 - s.current / s.historic) * 100)}%`
          : `+${Math.round((s.current / s.historic - 1) * 100)}%`
        return (
          <div key={s.name} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${i * 0.1}s` }}>
            <div className="flex items-baseline justify-between mb-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-[13px] font-semibold text-[#0a0a0a]">{s.name}</span>
                <span className="font-serif text-[18px] font-light" style={{ color: s.color }}>{decline}</span>
              </div>
              <span className="text-[11px] text-[#737373] font-mono">
                {s.current >= 1000000 ? `${(s.current / 1000000).toFixed(1)}M` : s.current >= 1000 ? `${(s.current / 1000).toFixed(1)}k` : s.current.toLocaleString()} remaining
              </span>
            </div>
            <div className="relative h-[22px] bg-[#f5f5f5] rounded-sm overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-sm"
                style={{
                  width: visible ? `${Math.max(pctRemaining, 1.5)}%` : '0%',
                  background: s.color,
                  opacity: 0.75,
                  transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`,
                }}
              />
              {pctLost > 10 && (
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <span className="text-[9px] text-[#a3a3a3] font-mono uppercase tracking-wider">lost</span>
                </div>
              )}
            </div>
            <p className="text-[10px] text-[#737373] mt-1 leading-relaxed">{s.note}</p>
          </div>
        )
      })}
      <p className="text-[9px] text-[#a3a3a3] mt-4 pt-3 border-t border-[#e5e5e5]">
        Bar width = % of historic population remaining. Data: IUCN Red List, Edwards et al. (2024), TRAFFIC, Funston &amp; Lindsey (2025). © Dancing with Lions
      </p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: The Funding Gap — Conservation vs Need
   Horizontal bar comparison showing deficit
   ═══════════════════════════════════════════ */

const FUNDING_DATA = [
  { label: 'Wildlife tourism GDP (Africa)', value: 29.3, unit: '$B', color: C.teal, maxPct: 100 },
  { label: 'Safari market', value: 20.5, unit: '$B', color: C.teal, maxPct: 70 },
  { label: 'Illegal wildlife trade', value: 23, unit: '$B', color: C.crimson, maxPct: 78 },
  { label: '30×30 target (by 2030)', value: 6, unit: '$B/yr', color: C.amber, maxPct: 20.5 },
  { label: 'Current int\'l PCA funding', value: 1.1, unit: '$B/yr', color: C.gold, maxPct: 3.8 },
  { label: 'Lion PA funding (current)', value: 0.381, unit: '$B/yr', color: C.red, maxPct: 1.3 },
]

export function FundingGap() {
  const { ref, visible } = useInView(0.2)
  return (
    <div ref={ref} className="space-y-4">
      {FUNDING_DATA.map((d, i) => (
        <div key={d.label} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${i * 0.1}s` }}>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[12px] text-[#262626]">{d.label}</span>
            <span className="font-serif text-[18px] font-light" style={{ color: d.color }}>{d.value < 1 ? `$${(d.value * 1000).toFixed(0)}M` : `$${d.value}B`}</span>
          </div>
          <div className="relative h-[16px] bg-[#f5f5f5] rounded-sm overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-sm"
              style={{
                width: visible ? `${d.maxPct}%` : '0%',
                background: d.color,
                opacity: 0.7,
                transition: `width 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`,
              }}
            />
          </div>
        </div>
      ))}
      <div className="mt-6 pt-4 border-t border-[#e5e5e5] grid grid-cols-3 gap-4">
        {[
          { n: '$4B', l: 'annual shortfall to meet 30×30', c: C.crimson },
          { n: '$619M', l: 'lion PA funding deficit', c: C.amber },
          { n: '94%', l: 'threatened species with zero funding', c: C.red },
        ].map(s => (
          <div key={s.l}>
            <p className="font-serif text-[24px] font-light leading-none" style={{ color: s.c }}>{s.n}</p>
            <p className="text-[9px] text-[#737373] mt-1 uppercase tracking-wider">{s.l}</p>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-3">
        Sources: WTTC (2024), Indufor/Pew (2025), AWF/Lindsey et al., UNODC. © Dancing with Lions
      </p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: Dead vs Alive — Species Value Comparison
   ═══════════════════════════════════════════ */

const VALUE_DATA = [
  { species: 'Elephant', alive: 1600000, dead: 21000, aliveNote: 'Lifetime tourism value per elephant (Amboseli)', deadNote: 'Raw ivory per elephant (~6kg tusks × $750/kg + tips)', src: 'iWorry/IFAW' },
  { species: 'Lion (Cecil)', alive: 1000000, dead: 55000, aliveNote: 'Lifetime tourism revenue (Cecil, Hwange)', deadNote: 'Trophy hunting fee (one-time)', src: 'Loveridge et al.' },
  { species: 'Rhino', alive: 1600000, dead: 300000, aliveNote: 'Lifetime tourism value per rhino', deadNote: 'Black market horn value (~5kg × $60k/kg)', src: 'WWF / TRAFFIC' },
  { species: 'Gorilla', alive: 200000, dead: 0, aliveNote: '$515/day tourism revenue per gorilla (Rwanda)', deadNote: 'No commercial trade — zero dead value', src: 'RDB 2024' },
  { species: 'Pangolin', alive: 1000, dead: 3000, aliveNote: 'Estimated eco-tourism potential per pangolin', deadNote: 'Scales + meat on black market (~1 animal)', src: 'TRAFFIC' },
]

export function DeadVsAlive() {
  const { ref, visible } = useInView(0.2)
  return (
    <div ref={ref} className="space-y-6">
      {VALUE_DATA.map((d, i) => {
        const ratio = d.dead > 0 ? Math.round(d.alive / d.dead) : Infinity
        const aliveBar = 100
        const deadBar = d.dead > 0 ? Math.max((d.dead / d.alive) * 100, 3) : 0
        return (
          <div key={d.species} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: `all 0.5s ease ${i * 0.12}s` }}>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[13px] font-semibold text-[#0a0a0a]">{d.species}</span>
              {ratio !== Infinity && <span className="font-serif text-[16px]" style={{ color: C.teal }}>{ratio}:1 alive</span>}
              {ratio === Infinity && <span className="font-serif text-[16px]" style={{ color: C.green }}>∞ alive only</span>}
            </div>
            {/* alive bar */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] text-[#047857] font-mono w-[32px] shrink-0">ALIVE</span>
              <div className="flex-1 h-[14px] bg-[#f5f5f5] rounded-sm overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: visible ? `${aliveBar}%` : '0%', background: C.teal, opacity: 0.6, transition: `width 1s ease ${i * 0.1}s` }} />
                <span className="absolute right-2 top-0 h-full flex items-center text-[10px] font-mono text-[#047857]">
                  ${d.alive >= 1000000 ? `${(d.alive / 1000000).toFixed(1)}M` : `${(d.alive / 1000).toFixed(0)}k`}
                </span>
              </div>
            </div>
            {/* dead bar */}
            {d.dead > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-[#991B1B] font-mono w-[32px] shrink-0">DEAD</span>
                <div className="flex-1 h-[14px] bg-[#f5f5f5] rounded-sm overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: visible ? `${deadBar}%` : '0%', background: C.crimson, opacity: 0.6, transition: `width 1s ease ${i * 0.1 + 0.2}s` }} />
                  <span className="absolute left-2 top-0 h-full flex items-center text-[10px] font-mono text-[#991B1B]">
                    ${d.dead >= 1000000 ? `${(d.dead / 1000000).toFixed(1)}M` : d.dead >= 1000 ? `${(d.dead / 1000).toFixed(0)}k` : d.dead}
                  </span>
                </div>
              </div>
            )}
            <p className="text-[9px] text-[#a3a3a3] mt-1">{d.aliveNote} vs {d.deadNote} — {d.src}</p>
          </div>
        )
      })}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: The Extraction Economy — Illegal Trade Flows
   ═══════════════════════════════════════════ */

const TRADE_DATA = [
  { commodity: 'Ivory', volume: '193 tonnes seized (2015–2024)', peak: '40+ tonnes (2019)', price: '$750–2,100/kg', destination: 'China, Vietnam', source: 'DRC, Mozambique, Angola, Tanzania', trend: 'down', color: C.mid },
  { commodity: 'Rhino horn', volume: '1.8 tonnes seized (2022–2024)', peak: '1,215 rhinos killed (SA, 2014)', price: '$60,000–65,000/kg', destination: 'Vietnam, China', source: 'South Africa, Namibia', trend: 'down', color: C.amber },
  { commodity: 'Pangolin scales', volume: '370+ tonnes seized (2015–2024)', peak: '~100 tonnes (2019)', price: '$3,000/kg', destination: 'China, Vietnam', source: 'Nigeria, Cameroon, DRC, Ghana', trend: 'down', color: C.crimson },
  { commodity: 'Lion bone', volume: '6,000+ skeletons exported (decade)', peak: 'SA legal quota: 1,500/yr (ended)', price: '$1,500/skeleton', destination: 'Laos, Vietnam', source: 'South Africa (captive)', trend: 'flat', color: C.red },
  { commodity: 'Bushmeat', volume: '5M tonnes/yr (Africa est.)', peak: 'Steady — no peak/trough cycle', price: 'Local markets', destination: 'Domestic', source: 'Pan-African', trend: 'up', color: C.gold },
]

export function ExtractionEconomy() {
  const { ref, visible } = useInView(0.2)
  return (
    <div ref={ref}>
      <div className="space-y-4">
        {TRADE_DATA.map((t, i) => (
          <div
            key={t.commodity}
            className="p-4 rounded-md border border-[#e5e5e5] bg-white"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: `all 0.5s ease ${i * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                <span className="text-[14px] font-semibold text-[#0a0a0a]">{t.commodity}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{
                background: t.trend === 'down' ? '#dcfce7' : t.trend === 'up' ? '#fef2f2' : '#fef9c3',
                color: t.trend === 'down' ? '#15803d' : t.trend === 'up' ? '#991B1B' : '#A16207',
              }}>
                {t.trend === 'down' ? '↓ declining' : t.trend === 'up' ? '↑ increasing' : '— steady'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
              <div><span className="text-[#a3a3a3]">Volume:</span> <span className="text-[#262626]">{t.volume}</span></div>
              <div><span className="text-[#a3a3a3]">Price:</span> <span className="text-[#262626] font-semibold">{t.price}</span></div>
              <div><span className="text-[#a3a3a3]">Source:</span> <span className="text-[#262626]">{t.source}</span></div>
              <div><span className="text-[#a3a3a3]">Destination:</span> <span className="text-[#262626]">{t.destination}</span></div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-4">
        Sources: WJC (2025), TRAFFIC, CITES CoP20, EIA, UNODC World Wildlife Crime Report. © Dancing with Lions
      </p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 5: Models That Work — Success vs Failure Scorecard
   ═══════════════════════════════════════════ */

const MODELS = [
  { name: 'Rwanda Gorilla Permits', type: 'success', metric: '$1,500/permit → $200M revenue, population +316%', mechanism: 'High-value low-volume. 10% to communities. Former poachers become trackers.', species: 'Mountain Gorilla', country: 'Rwanda' },
  { name: 'Namibia Conservancies', type: 'success', metric: '86 communal conservancies, desert lion 20→150+', mechanism: 'Community wildlife ownership. Revenue stays local. Trophy hunting revenue negotiated by communities.', species: 'Multiple', country: 'Namibia' },
  { name: 'Kenya Lion Guardians', type: 'success', metric: 'Retaliatory killing dropped 99% in programme areas', mechanism: 'Maasai warriors paid to protect lions. Cultural status maintained. Early warning system for livestock.', species: 'Lion', country: 'Kenya' },
  { name: 'Botswana Fenced Reserves', type: 'partial', metric: 'Southern lion stable/+11%, but gene flow restricted', mechanism: 'Fencing secures populations but fragments habitat. Requires active genetic management.', species: 'Lion', country: 'Botswana / S. Africa' },
  { name: 'Trophy Hunting', type: 'failure', metric: '1.8% of tourism revenue, 3% reaches communities', mechanism: 'Generates 15× less than ecotourism. Corrupt quota allocation. Removes prime breeding individuals.', species: 'Lion, Elephant', country: 'Pan-African' },
  { name: 'South Africa Captive Lions', type: 'failure', metric: '10,000-12,000 captive lions, zero conservation value', mechanism: 'Canned hunting. Lion bone trade to Asia. No genetic or population benefit.', species: 'Lion', country: 'South Africa' },
  { name: 'CITES Trade Bans (ivory)', type: 'mixed', metric: 'Poaching down since 2019, but inelastic to bans', mechanism: 'COVID disrupted trafficking more than bans. Corruption enables continued trade. One-off legal sales spiked poaching.', species: 'Elephant', country: 'Global' },
]

export function ModelsScorecard() {
  const { ref, visible } = useInView(0.15)
  const typeColor = (t: string) => t === 'success' ? C.green : t === 'failure' ? C.red : t === 'partial' ? C.amber : C.mid
  const typeLabel = (t: string) => t === 'success' ? '✓ Works' : t === 'failure' ? '✗ Fails' : t === 'partial' ? '◐ Partial' : '◑ Mixed'
  return (
    <div ref={ref} className="space-y-3">
      {MODELS.map((m, i) => (
        <div
          key={m.name}
          className="border border-[#e5e5e5] rounded-md p-4 bg-white"
          style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${i * 0.08}s`, borderLeftWidth: 3, borderLeftColor: typeColor(m.type) }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[13px] font-semibold text-[#0a0a0a]">{m.name}</span>
            <span className="text-[10px] font-mono" style={{ color: typeColor(m.type) }}>{typeLabel(m.type)}</span>
          </div>
          <p className="text-[12px] text-[#262626] mb-1 font-medium">{m.metric}</p>
          <p className="text-[11px] text-[#525252] leading-relaxed">{m.mechanism}</p>
          <div className="flex gap-3 mt-2">
            <span className="text-[9px] text-[#a3a3a3] uppercase tracking-wider">{m.species}</span>
            <span className="text-[9px] text-[#a3a3a3]">·</span>
            <span className="text-[9px] text-[#a3a3a3] uppercase tracking-wider">{m.country}</span>
          </div>
        </div>
      ))}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 6: The Funding Architecture — Who Pays, Who Doesn't
   ═══════════════════════════════════════════ */

const DONORS = [
  { name: 'Germany', amount: 267, type: 'bilateral', pct: 24 },
  { name: 'World Bank', amount: 180, type: 'multilateral', pct: 16 },
  { name: 'GEF', amount: 140, type: 'multilateral', pct: 13 },
  { name: 'European Union', amount: 110, type: 'bilateral', pct: 10 },
  { name: 'United States', amount: 55, type: 'bilateral', pct: 5 },
  { name: 'Philanthropy (all)', amount: 220, type: 'philanthropy', pct: 20 },
  { name: 'Others', amount: 128, type: 'other', pct: 12 },
]

export function FundingArchitecture() {
  const { ref, visible } = useInView(0.2)
  const typeColor = (t: string) => t === 'bilateral' ? C.teal : t === 'multilateral' ? C.blue : t === 'philanthropy' ? C.amber : C.light
  return (
    <div ref={ref}>
      <div className="space-y-3">
        {DONORS.map((d, i) => (
          <div key={d.name} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: typeColor(d.type) }} />
                <span className="text-[12px] text-[#262626]">{d.name}</span>
              </div>
              <span className="font-serif text-[16px] font-light" style={{ color: typeColor(d.type) }}>${d.amount}M</span>
            </div>
            <div className="h-[12px] bg-[#f5f5f5] rounded-sm overflow-hidden">
              <div
                className="h-full rounded-sm"
                style={{
                  width: visible ? `${d.pct * 4}%` : '0%',
                  background: typeColor(d.type),
                  opacity: 0.6,
                  transition: `width 1s ease ${i * 0.1}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-[#e5e5e5]">
        <div className="flex gap-4 flex-wrap">
          {[['Bilateral', C.teal], ['Multilateral', C.blue], ['Philanthropy', C.amber], ['Other', C.light]].map(([l, c]) => (
            <div key={l as string} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: c as string }} />
              <span className="text-[9px] uppercase tracking-wider text-[#737373]">{l}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-[#fef2f2] rounded-md border border-[#fecaca]">
          <p className="text-[11px] text-[#991B1B] font-semibold">Vulnerability: 5 donors provide 54% of all funding.</p>
          <p className="text-[10px] text-[#737373] mt-1">USAID shuttered 2025. UK and France signalling cuts. The architecture is brittle.</p>
        </div>
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-3">
        Annual averages. Sources: Indufor / Campaign for Nature / Pew (2025), State of International 30×30 Funding. © Dancing with Lions
      </p>
    </div>
  )
}
