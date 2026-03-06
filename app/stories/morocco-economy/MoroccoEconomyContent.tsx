'use client'

import { useEffect, useRef, useState } from 'react'

// === DATA ===

const GDP_HISTORY = [
  { year: '2018', value: 126.4 },
  { year: '2019', value: 130.5 },
  { year: '2020', value: 114.7 },
  { year: '2021', value: 142.9 },
  { year: '2022', value: 134.2 },
  { year: '2023', value: 144.9 },
  { year: '2024', value: 155.4 },
  { year: '2025e', value: 183.0 },
]

const EXPORT_SECTORS = [
  { name: 'Automotive', share: 33, value: 141, color: '#E63946', growth: '+6.3%' },
  { name: 'Agri-food', share: 19.4, value: 88, color: '#FCBF49', growth: '+3.1%' },
  { name: 'Phosphates & Derivatives', share: 15, value: 68, color: '#48BFE3', growth: '+13.1%' },
  { name: 'Textiles & Leather', share: 10, value: 45, color: '#72EFDD', growth: '-2.1%' },
  { name: 'Aerospace', share: 7, value: 32, color: '#5E60CE', growth: '+14.9%' },
  { name: 'Electronics', share: 5, value: 23, color: '#F4845F', growth: '-2.6%' },
  { name: 'Other', share: 10.6, value: 48, color: '#737373', growth: '' },
]

const FDI_SOURCES = [
  { country: 'France', share: 30.8, color: '#E63946' },
  { country: 'UAE', share: 17.9, color: '#FCBF49' },
  { country: 'Spain', share: 8.5, color: '#F4845F' },
  { country: 'USA', share: 6.3, color: '#48BFE3' },
  { country: 'Switzerland', share: 4.9, color: '#72EFDD' },
  { country: 'UK', share: 3.9, color: '#5E60CE' },
  { country: 'Saudi Arabia', share: 3.4, color: '#7B2D8E' },
  { country: 'Other', share: 24.3, color: '#525252' },
]

const FDI_SECTORS = [
  { sector: 'Industry', share: 24.9 },
  { sector: 'Real Estate', share: 19.9 },
  { sector: 'Tourism', share: 9.6 },
  { sector: 'Telecom', share: 9.4 },
  { sector: 'Energy & Mining', share: 6.7 },
  { sector: 'Commerce', share: 4.9 },
]

const KEY_FACTS = [
  { label: 'GDP (nominal)', value: '$183B', sub: '2025 est. · IMF' },
  { label: 'GDP per capita', value: '$4,763', sub: '2025 est. · PPP: $10,615' },
  { label: 'GDP growth', value: '4.4%', sub: '2025 · up from 3.8% in 2024' },
  { label: 'Inflation', value: '~2%', sub: '2025 · down from 10.1% peak in 2023' },
  { label: 'Unemployment', value: '13.1%', sub: '2025 · Youth: ~36%' },
  { label: 'Public debt', value: '~68% GDP', sub: 'Declining from 69.5% in 2023' },
  { label: 'Population', value: '38.4M', sub: '2025 · Median age: ~29' },
  { label: 'Life expectancy', value: '77.3 yrs', sub: 'Up from 47 in 1962' },
]

const MONEY_FLOWS = [
  { label: 'Tourism Revenue', value: 112, usd: 12.4, color: '#E63946', note: '17.4M visitors in 2024' },
  { label: 'Diaspora Remittances', value: 119, usd: 11.9, color: '#FCBF49', note: 'Record high · +3.3% YoY' },
  { label: 'Automotive Exports', value: 141, usd: 14.1, color: '#48BFE3', note: '#1 export sector · +27% in 2023' },
  { label: 'Phosphate Exports', value: 68, usd: 6.8, color: '#72EFDD', note: '75% of world reserves · OCP Group' },
  { label: 'FDI Inflows', value: 43.2, usd: 4.3, color: '#5E60CE', note: '+24.7% in 2024 · France leads' },
]

const SECTOR_GDP = [
  { name: 'Services', share: 51, color: '#E63946' },
  { name: 'Industry & Mining', share: 25, color: '#48BFE3' },
  { name: 'Agriculture', share: 11, color: '#FCBF49' },
  { name: 'Construction', share: 6, color: '#72EFDD' },
  { name: 'Other', share: 7, color: '#525252' },
]

// === HOOKS ===

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// === PAGE ===

export function MoroccoEconomyContent() {
  const hero = useInView(0.15)
  const gdp = useInView(0.15)
  const exports = useInView(0.15)
  const fdi = useInView(0.2)
  const flows = useInView(0.15)
  const sectors = useInView(0.2)
  const facts = useInView(0.15)

  const maxFlow = Math.max(...MONEY_FLOWS.map(f => f.value))

  return (
    <div className="-mt-16">
      {/* === 1. HERO === */}
      <section
        ref={hero.ref}
        className="relative min-h-[70vh] flex items-end overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #1B1B3A 50%, #0a0a0a 100%)' }}
      >
        <div className="px-8 md:px-[8%] lg:px-[12%] pb-16 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6" style={{ color: '#E63946' }}>
            Data Module 004
          </p>
          <h1
            className="font-serif leading-none mb-2"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: '#ffffff' }}
          >
            Morocco <em>Economy</em>
          </h1>
          <p
            className="font-serif italic mb-6"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'rgba(0,0,0,0.3)' }}
          >
            in one page
          </p>
          <p
            className="text-[16px] md:text-[18px] max-w-[480px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            GDP, exports, FDI, tourism, remittances, key sectors. Updated annually. Data from IMF, World Bank, HCP, Office des Changes.
          </p>
          <p className="text-[11px] mt-8" style={{ color: 'rgba(0,0,0,0.2)' }}>
            Last updated: January 2026 · Data year: 2024/2025
          </p>
        </div>
      </section>

      {/* === 2. KEY FACTS GRID === */}
      <section ref={facts.ref} className="py-24 md:py-40 bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="micro-label mb-8">The Snapshot</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dwl-border">
            {KEY_FACTS.map((fact, i) => (
              <div
                key={fact.label}
                className="bg-white p-5 md:p-6 transition-opacity duration-700"
                style={{
                  opacity: facts.visible ? 1 : 0,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.1em] text-dwl-muted mb-2">{fact.label}</p>
                <p className="font-serif text-[32px] md:text-[44px] text-dwl-black italic leading-none">
                  {fact.value}
                </p>
                <p className="text-[11px] text-dwl-gray mt-1">{fact.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 3. GDP TREND === */}
      <section ref={gdp.ref} style={{ background: '#fafafa' }} className="py-24 md:py-40">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="micro-label mb-2">GDP Nominal · USD Billions</p>
          <p className="font-serif text-[32px] md:text-[42px] text-dwl-black italic leading-tight mb-10">
            $17B → $183B in seven years
          </p>

          <div className="flex items-end gap-2 md:gap-4" style={{ height: '300px' }}>
            {GDP_HISTORY.map((d, i) => {
              const maxVal = Math.max(...GDP_HISTORY.map(g => g.value))
              const pct = (d.value / maxVal) * 100
              const isProjected = d.year.includes('e')
              return (
                <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full">
                  <p
                    className="text-[12px] font-medium mb-1"
                    style={{
                      color: isProjected ? '#E63946' : '#0a0a0a',
                      opacity: gdp.visible ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                      transitionDelay: `${i * 100 + 400}ms`,
                    }}
                  >
                    {d.value}
                  </p>
                  <div
                    className="w-full transition-all duration-1000 ease-out"
                    style={{
                      height: gdp.visible ? `${pct}%` : '0%',
                      background: isProjected
                        ? 'repeating-linear-gradient(45deg, #E63946, #E63946 4px, transparent 4px, transparent 8px)'
                        : d.year === '2020' ? '#525252' : '#0a0a0a',
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                  <p className="text-[11px] text-dwl-muted mt-2">{d.year}</p>
                </div>
              )
            })}
          </div>
          <p className="text-[11px] text-dwl-muted mt-4">
            2020: COVID contraction. 2025e: IMF projection. Striped = estimate. Source: IMF World Economic Outlook
          </p>
        </div>
      </section>

      {/* === 4. MONEY FLOWS === */}
      <section
        ref={flows.ref}
        className="py-24 md:py-40"
        style={{ background: '#0a0a0a' }}
      >
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: 'rgba(0,0,0,0.3)' }}>
            Money Flowing In
          </p>
          <p className="font-serif text-[32px] md:text-[42px] italic leading-tight mb-10" style={{ color: '#ffffff' }}>
            Five rivers that feed the economy
          </p>

          <div className="space-y-6">
            {MONEY_FLOWS.map((flow, i) => (
              <div key={flow.label}>
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-[14px] font-medium" style={{ color: '#ffffff' }}>{flow.label}</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px]" style={{ color: 'rgba(0,0,0,0.3)' }}>
                      {flow.value} MAD bn
                    </span>
                    <span className="font-serif text-[22px] italic" style={{ color: flow.color }}>
                      ${flow.usd}B
                    </span>
                  </div>
                </div>
                <div className="w-full h-8 relative" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full transition-all duration-1000 ease-out relative"
                    style={{
                      width: flows.visible ? `${(flow.value / maxFlow) * 100}%` : '0%',
                      background: flow.color,
                      transitionDelay: `${i * 120}ms`,
                    }}
                  />
                </div>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(0,0,0,0.25)' }}>
                  {flow.note}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[11px] mt-8" style={{ color: 'rgba(0,0,0,0.2)' }}>
            All 2024 full-year data. MAD = Moroccan Dirham. Source: Office des Changes, Ministry of Tourism, OCP
          </p>
        </div>
      </section>

      {/* === 5. EXPORTS TREEMAP === */}
      <section ref={exports.ref} className="py-24 md:py-40 bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="micro-label mb-2">Export Sectors · % of Total</p>
          <p className="font-serif text-[32px] md:text-[42px] text-dwl-black italic leading-tight mb-10">
            Automotive overtook phosphates in 2014. It never looked back.
          </p>

          {/* Treemap as proportional row */}
          <div className="flex h-24 md:h-32 gap-px">
            {EXPORT_SECTORS.map((s, i) => (
              <div
                key={s.name}
                className="group relative flex items-end justify-start p-2 md:p-3 transition-all duration-700 cursor-default overflow-hidden"
                style={{
                  width: exports.visible ? `${s.share}%` : '0%',
                  background: s.color,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-white/40 flex flex-col items-center justify-center p-2">
                  <span className="text-white text-[13px] font-medium text-center leading-tight">{s.name}</span>
                  <span className="text-white/70 text-[11px]">{s.share}% · {s.value} MAD bn</span>
                  {s.growth && <span className="text-white/50 text-[10px]">{s.growth}</span>}
                </div>
                {s.share > 8 && (
                  <span className="text-white/80 text-[11px] md:text-[13px] font-medium leading-tight">
                    {s.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            {EXPORT_SECTORS.filter(s => s.name !== 'Other').map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: s.color }} />
                <span className="text-[11px] text-dwl-gray">{s.name} {s.share}%</span>
                {s.growth && (
                  <span className="text-[10px]" style={{ color: s.growth.startsWith('-') ? '#E63946' : '#22c55e' }}>
                    {s.growth}
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-dwl-muted mt-6">
            2024 data. Total exports: 455 MAD bn (~$45.5B). Growth rates YoY. Source: Office des Changes, Statista
          </p>
        </div>
      </section>

      {/* === BIG FACT === */}
      <section
        className="py-24 md:py-40 flex items-center justify-center min-h-[40vh]"
        style={{ background: '#E63946' }}
      >
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p
            className="font-serif italic leading-[1.2]"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)', color: '#ffffff' }}
          >
            Morocco holds 75% of the world&apos;s phosphate reserves. That&apos;s not a sector. That&apos;s a geological monopoly.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(0,0,0,0.5)' }}>
            OCP Group · State-owned · World&apos;s largest phosphate exporter
          </p>
        </div>
      </section>

      {/* === 6. FDI SOURCES === */}
      <section ref={fdi.ref} className="py-24 md:py-40" style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* FDI by country */}
            <div>
              <p className="micro-label mb-2">FDI Stock by Source Country</p>
              <p className="font-serif text-[28px] md:text-[32px] text-dwl-black italic leading-tight mb-8">
                Where the money comes from
              </p>
              <div className="space-y-3">
                {FDI_SOURCES.map((s, i) => (
                  <div key={s.country}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] text-dwl-body">{s.country}</span>
                      <span className="text-[13px] font-medium text-dwl-black">{s.share}%</span>
                    </div>
                    <div className="w-full h-5 relative" style={{ background: '#e5e5e5' }}>
                      <div
                        className="h-full transition-all duration-800 ease-out"
                        style={{
                          width: fdi.visible ? `${(s.share / 30.8) * 100}%` : '0%',
                          background: s.color,
                          transitionDelay: `${i * 80}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-dwl-muted mt-4">
                Stock share. Net FDI +55.4% in 2024 to MAD 17.2bn. Source: Office des Changes
              </p>
            </div>

            {/* FDI by sector */}
            <div>
              <p className="micro-label mb-2">FDI by Sector</p>
              <p className="font-serif text-[28px] md:text-[32px] text-dwl-black italic leading-tight mb-8">
                Where the money goes
              </p>
              <div className="space-y-3">
                {FDI_SECTORS.map((s, i) => (
                  <div key={s.sector}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] text-dwl-body">{s.sector}</span>
                      <span className="text-[13px] font-medium text-dwl-black">{s.share}%</span>
                    </div>
                    <div className="w-full h-5 relative" style={{ background: '#e5e5e5' }}>
                      <div
                        className="h-full transition-all duration-800 ease-out"
                        style={{
                          width: fdi.visible ? `${(s.share / 24.9) * 100}%` : '0%',
                          background: '#0a0a0a',
                          transitionDelay: `${i * 80}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-dwl-muted mt-4">
                Gotion (China) $6.4B EV battery plant announced 2023. Green hydrogen emerging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === 7. GDP BY SECTOR === */}
      <section ref={sectors.ref} className="py-24 md:py-40 bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="micro-label mb-2">GDP Composition by Sector</p>
          <p className="font-serif text-[28px] md:text-[32px] text-dwl-black italic leading-tight mb-10">
            Services dominate. Agriculture still employs 23%.
          </p>

          {/* Waffle-style proportional blocks */}
          <div className="flex gap-px h-16 md:h-20 mb-6">
            {SECTOR_GDP.map((s, i) => (
              <div
                key={s.name}
                className="group relative flex items-center justify-center transition-all duration-700 cursor-default"
                style={{
                  width: sectors.visible ? `${s.share}%` : '0%',
                  background: s.color,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                {s.share > 10 && (
                  <span className="text-white text-[12px] md:text-[14px] font-medium">
                    {s.name} {s.share}%
                  </span>
                )}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-dwl-black text-white text-[11px] px-2 py-1">
                  {s.name}: {s.share}% of GDP
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {SECTOR_GDP.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: s.color }} />
                <span className="text-[11px] text-dwl-gray">{s.name} {s.share}%</span>
              </div>
            ))}
          </div>

          {/* Key structural facts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-dwl-border">
            <div>
              <p className="text-[10px] uppercase tracking-[0.1em] text-dwl-muted mb-1">The 2030 Vision</p>
              <p className="text-[14px] text-dwl-body leading-relaxed">
                Co-hosting FIFA World Cup with Spain and Portugal. New stadiums, <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">high-speed rail</span> extension, 200,000+ hotel rooms target.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.1em] text-dwl-muted mb-1">Industrial Strategy</p>
              <p className="text-[14px] text-dwl-body leading-relaxed">
                Industrial Acceleration Plan targets 23% industry contribution to GDP by 2030, up from 14%. Automotive already #1 export.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.1em] text-dwl-muted mb-1">Green Transition</p>
              <p className="text-[14px] text-dwl-body leading-relaxed">
                Noor-<span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Ouarzazate solar</span> complex. 52% renewable energy target by 2030. Green hydrogen and EV battery manufacturing emerging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === SOURCES === */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>
            Sources
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {[
              'International Monetary Fund — World Economic Outlook (October 2025)',
              'World Bank — Morocco Country Data',
              'Office des Changes — Balance of Payments 2024',
              'Haut-Commissariat au Plan (HCP) — National Statistics',
              'Ministry of Tourism, Handicrafts and Social Economy — 2024 Annual Report',
              'OCP Group — Annual Report',
              'Worldometers, Statista — Cross-referenced figures',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>

          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
              &copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
            </p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#E63946' }}>
              Sources: World Bank, IMF, HCP Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
