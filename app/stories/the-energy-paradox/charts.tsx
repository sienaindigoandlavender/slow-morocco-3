'use client'

import { useEffect, useRef, useState } from 'react'

const C = {
  black: '#0a0a0a', dark: '#262626', mid: '#525252', light: '#737373', muted: '#a3a3a3',
  line: '#e5e5e5', off: '#fafafa', white: '#fff',
  solar: '#D97706', wind: '#0369A1', hydro: '#047857', geo: '#7C3AED', red: '#991B1B',
  amber: '#B45309', green: '#15803d', teal: '#047857', gold: '#A16207',
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
   CHART 1: The Paradox — Resources vs Access
   ═══════════════════════════════════════════ */

const PARADOX_DATA = [
  { label: 'Solar potential', share: 60, unit: '% of world\'s best', note: 'Over 2,000 kWh/m² irradiance. Enough to power planet many times over.', color: C.solar },
  { label: 'Hydro potential', share: 350, unit: 'GW untapped', note: 'Only 5-6% harnessed. Congo River alone = 100,000 MW potential.', color: C.hydro },
  { label: 'Wind potential', share: 461, unit: 'GW estimated', note: 'Only 2% utilized. East African Rift, coastal North and South Africa.', color: C.wind },
  { label: 'Geothermal', share: 15, unit: 'GW potential', note: 'East African Rift System. Kenya 7th globally (985 MW installed).', color: C.geo },
]

const ACCESS_DATA = [
  { country: 'Tunisia', rate: 100, color: C.teal },
  { country: 'Morocco', rate: 99, color: C.teal },
  { country: 'Egypt', rate: 100, color: C.teal },
  { country: 'South Africa', rate: 95, color: C.teal },
  { country: 'Ghana', rate: 86, color: C.green },
  { country: 'Kenya', rate: 76, color: C.green },
  { country: 'Nigeria', rate: 60, color: C.amber },
  { country: 'Ethiopia', rate: 53, color: C.amber },
  { country: 'Tanzania', rate: 43, color: C.red },
  { country: 'DRC', rate: 21, color: C.red },
  { country: 'Chad', rate: 11, color: C.red },
  { country: 'South Sudan', rate: 7, color: C.red },
]

export function ParadoxChart() {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className="space-y-8">
      {/* Resources */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-[#a3a3a3] mb-3">What Africa has</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PARADOX_DATA.map((d, i) => (
            <div key={d.label} className="p-4 rounded-lg border bg-white text-center" style={{
              borderColor: d.color + '30', opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s`,
            }}>
              <p className="font-serif text-[28px] font-light leading-none" style={{ color: d.color }}>{d.share}</p>
              <p className="text-[9px] text-[#a3a3a3] mt-1">{d.unit}</p>
              <p className="text-[11px] font-semibold text-[#0a0a0a] mt-2">{d.label}</p>
              <p className="text-[9px] text-[#525252] mt-1 leading-relaxed">{d.note}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Access rates */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-[#a3a3a3] mb-3">What Africa gets — Electricity access by country (%)</p>
        <div className="space-y-1.5">
          {ACCESS_DATA.map((d, i) => (
            <div key={d.country} className="flex items-center gap-3">
              <span className="text-[11px] text-[#525252] w-[90px] text-right">{d.country}</span>
              <div className="flex-1 h-[16px] bg-[#f5f5f5] rounded-sm overflow-hidden">
                <div className="h-full rounded-sm flex items-center" style={{
                  width: visible ? `${d.rate}%` : '0%', background: d.color, opacity: 0.35,
                  transition: `width 0.7s ease ${i * 0.04}s`,
                }}>
                  <span className="text-[9px] font-mono font-bold ml-2" style={{ color: d.color }}>{d.rate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 bg-[#fef2f2] rounded border border-[#fecaca]/30">
        <p className="text-[11px] text-[#991B1B] font-semibold">The paradox in one line</p>
        <p className="text-[10px] text-[#525252] mt-1">Africa holds 60% of the world&rsquo;s best solar resources but attracts less than 3% of global energy financing. 600 million people lack electricity. The continent accounts for 80% of the global electricity access gap. 48 sub-Saharan countries produce the same electricity as Spain (population: 45 million).</p>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: Flagship Projects
   ═══════════════════════════════════════════ */

const FLAGSHIPS = [
  { name: 'Noor Ouarzazate', country: 'Morocco', type: 'CSP Solar', capacity: '580 MW', detail: 'One of world\'s largest concentrated solar power plants. Provides electricity to 2M+ people. 6% of Morocco\'s population. Includes thermal storage for night generation.', color: C.solar, icon: '☀️' },
  { name: 'Benban Solar Park', country: 'Egypt', type: 'PV Solar', capacity: '1.65 GW', detail: 'One of world\'s largest photovoltaic installations. Aswan Desert. Meets 20% of Egypt\'s renewable targets.', color: C.solar, icon: '☀️' },
  { name: 'GERD', country: 'Ethiopia', type: 'Hydropower', capacity: '6.45 GW', detail: 'Grand Ethiopian Renaissance Dam. 3rd largest hydro facility globally. $5B self-funded. Overtook DRC as Africa\'s largest hydro producer.', color: C.hydro, icon: '💧' },
  { name: 'Olkaria Complex', country: 'Kenya', type: 'Geothermal', capacity: '985 MW', detail: 'Africa\'s largest geothermal complex. Supplies ~45% of Kenya\'s electricity. 7th largest geothermal globally. Rift Valley heat.', color: C.geo, icon: '🌋' },
  { name: 'Lake Turkana', country: 'Kenya', type: 'Wind', capacity: '310 MW', detail: 'Largest wind farm in Africa. 365 turbines. Remote northern Kenya. Reliable wind corridor.', color: C.wind, icon: '🌬️' },
  { name: 'Kenhardt Hybrid', country: 'South Africa', type: 'Solar + Battery', capacity: '540 MW + 1.14 GWh', detail: 'One of world\'s largest hybrid solar-battery projects. Combines renewable generation with storage.', color: C.solar, icon: '🔋' },
  { name: 'Desert to Power', country: '11 Sahel countries', type: 'Solar Initiative', capacity: '10 GW target', detail: 'AfDB initiative targeting 250M people. Burkina Faso to Nigeria. Turn Sahel into solar powerhouse by 2030.', color: C.gold, icon: '🏜️' },
  { name: 'Hyphen Green H₂', country: 'Namibia', type: 'Green Hydrogen', capacity: '$9.4B / 300kt/yr', detail: 'Massive green hydrogen project. Solar + wind powered electrolysis. Export to Europe. Transformative for Namibian economy.', color: C.teal, icon: '⚡' },
]

export function FlagshipProjects() {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {FLAGSHIPS.map((p, i) => (
        <div
          key={p.name}
          className="border rounded-lg p-4 bg-white"
          style={{
            borderLeftWidth: 4, borderLeftColor: p.color,
            opacity: visible ? 1 : 0, transition: `opacity 0.35s ease ${i * 0.05}s`,
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-[14px] font-semibold text-[#0a0a0a]">{p.icon} {p.name}</p>
              <p className="text-[9px] text-[#a3a3a3]">{p.country} · {p.type}</p>
            </div>
            <p className="font-mono text-[12px] font-bold" style={{ color: p.color }}>{p.capacity}</p>
          </div>
          <p className="text-[10px] text-[#525252] leading-relaxed">{p.detail}</p>
        </div>
      ))}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: Installed Capacity Growth
   ═══════════════════════════════════════════ */

const CAPACITY_DATA = [
  { year: '2010', hydro: 23, solar: 0.2, wind: 1, geo: 0.2, total: 24.4 },
  { year: '2015', hydro: 30, solar: 2, wind: 4, geo: 0.5, total: 36.5 },
  { year: '2020', hydro: 37, solar: 9, wind: 7, geo: 0.9, total: 53.9 },
  { year: '2023', hydro: 39.3, solar: 15.4, wind: 9.2, geo: 1.0, total: 64.9 },
  { year: '2024', hydro: 40, solar: 19, wind: 10, geo: 1.0, total: 70 },
]

export function CapacityGrowth() {
  const { ref, visible } = useInView(0.12)
  const maxTotal = 75
  return (
    <div ref={ref}>
      <div className="flex items-end gap-[8px] h-[220px]">
        {CAPACITY_DATA.map((d, i) => {
          const hH = (d.hydro / maxTotal) * 100
          const hS = (d.solar / maxTotal) * 100
          const hW = (d.wind / maxTotal) * 100
          const hG = (d.geo / maxTotal) * 100
          return (
            <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full">
              <p className="text-[9px] font-mono text-[#525252] mb-1">{d.total}GW</p>
              <div className="w-full flex flex-col-reverse" style={{ transition: 'all 0.6s ease' }}>
                {[
                  { h: hH, c: C.hydro, l: 'Hydro' },
                  { h: hS, c: C.solar, l: 'Solar' },
                  { h: hW, c: C.wind, l: 'Wind' },
                  { h: hG, c: C.geo, l: 'Geo' },
                ].map((seg, si) => (
                  <div key={si} className="w-full" style={{
                    height: visible ? `${seg.h}%` : '0%',
                    background: seg.c, opacity: 0.45,
                    transition: `height 0.6s ease ${i * 0.08 + si * 0.04}s`,
                  }} />
                ))}
              </div>
              <p className="text-[10px] text-[#a3a3a3] mt-2 font-mono">{d.year}</p>
            </div>
          )
        })}
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center">
        {[
          { c: C.hydro, l: 'Hydro (39 GW)' }, { c: C.solar, l: 'Solar (19 GW)' },
          { c: C.wind, l: 'Wind (10 GW)' }, { c: C.geo, l: 'Geothermal (1 GW)' },
        ].map(lg => (
          <div key={lg.l} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: lg.c, opacity: 0.5 }} />
            <span className="text-[9px] text-[#737373]">{lg.l}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="p-3 rounded bg-[#ecfdf5] border border-[#a7f3d0]/30">
          <p className="text-[11px] text-[#047857] font-semibold">The acceleration</p>
          <p className="text-[10px] text-[#525252] mt-1">5.4 GW added in 2023 — nearly 4× the 1.4 GW added in 2018. Africa added 4.5 GW solar alone in 2025 (+54% YoY). Investment hit record $15B in 2023 (2.3% of global, up from 1.3%).</p>
        </div>
        <div className="p-3 rounded bg-[#fef2f2] border border-[#fecaca]/30">
          <p className="text-[11px] text-[#991B1B] font-semibold">The gap</p>
          <p className="text-[10px] text-[#525252] mt-1">71 GW total = less than 2% of global clean energy capacity. Target: 300 GW by 2030 (Africa Renewable Energy Initiative). Current trajectory falls far short. Only 3.3% of Africa&rsquo;s total energy from renewables (2023).</p>
        </div>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: The Leapfrog Path — Off-Grid Revolution
   ═══════════════════════════════════════════ */

const OFFGRID = [
  { label: 'Solar panel cost decline', stat: '90%', detail: 'Since 2010. Now cheapest electricity source in most African markets. Undercuts diesel and often grid tariffs.', color: C.solar },
  { label: 'Off-grid solar users', stat: '70M+', detail: 'People relying on solar home systems or mini-grids. 60% of world\'s off-grid solar market is in Africa.', color: C.gold },
  { label: 'Solar imports from China', stat: '52 GW', detail: 'Cumulative to Africa (Sep 2025). Dramatic price decline driving private-sector solar boom.', color: C.amber },
  { label: 'Mission 300 target', stat: '300M', detail: 'World Bank + AfDB initiative. Connect 300M Africans by 2030. $90B financing mobilization.', color: C.teal },
  { label: 'SA self-generation surge', stat: '6.1 GW', detail: 'Private solar PV installed in South Africa by 2024 (up from 1.2 GW in 2021). 73% growth in 2023 alone. Driven by load shedding.', color: C.solar },
  { label: 'Annual investment needed', stat: '$15B/yr', detail: 'To reach universal access by 2035. ~$7B grid, ~$5B mini-grids, ~$3B solar home systems. Current spend: fraction of this.', color: C.red },
]

export function OffGridRevolution() {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {OFFGRID.map((d, i) => (
        <div
          key={d.label}
          className="p-4 rounded-lg border bg-white"
          style={{
            borderTopWidth: 3, borderTopColor: d.color,
            opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s`,
          }}
        >
          <p className="font-serif text-[32px] font-light leading-none" style={{ color: d.color }}>{d.stat}</p>
          <p className="text-[12px] font-semibold text-[#0a0a0a] mt-2">{d.label}</p>
          <p className="text-[10px] text-[#525252] mt-1 leading-relaxed">{d.detail}</p>
        </div>
      ))}
    </div>
  )
}
