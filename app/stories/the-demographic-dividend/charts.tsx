'use client'

import { useEffect, useRef, useState } from 'react'

const C = {
  black: '#0a0a0a', dark: '#262626', mid: '#525252', light: '#737373', muted: '#a3a3a3',
  line: '#e5e5e5', off: '#fafafa', white: '#fff',
  teal: '#047857', green: '#15803d', amber: '#B45309', red: '#991B1B', blue: '#0369A1', gold: '#A16207', violet: '#7C3AED',
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
   CHART 1: The Population Explosion — 1960 to 2100
   ═══════════════════════════════════════════ */

const POP_DATA = [
  { year: 1960, africa: 284, world: 3034, share: 9.3 },
  { year: 1980, africa: 482, world: 4434, share: 10.9 },
  { year: 2000, africa: 830, world: 6143, share: 13.5 },
  { year: 2025, africa: 1530, world: 8100, share: 18.9 },
  { year: 2050, africa: 2500, world: 9700, share: 25.8 },
  { year: 2075, africa: 3200, world: 10200, share: 31.4 },
  { year: 2100, africa: 3800, world: 10400, share: 36.5 },
]

export function PopulationArc() {
  const { ref, visible } = useInView(0.12)
  const maxPop = 3800
  return (
    <div ref={ref}>
      <div className="flex items-end gap-[6px] h-[240px]">
        {POP_DATA.map((d, i) => {
          const h = (d.africa / maxPop) * 100
          const isFuture = d.year > 2025
          const isNow = d.year === 2025
          return (
            <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full">
              <p className="text-[9px] font-mono mb-1" style={{ color: isNow ? C.amber : C.mid }}>{d.africa >= 1000 ? (d.africa / 1000).toFixed(1) + 'B' : d.africa + 'M'}</p>
              <div className="w-full rounded-t-sm relative" style={{
                height: visible ? `${h}%` : '0%',
                background: isFuture ? C.amber + '30' : C.amber,
                border: isFuture ? `1px dashed ${C.amber}60` : 'none',
                opacity: isNow ? 1 : isFuture ? 0.5 : 0.6,
                transition: `height 0.9s ease ${i * 0.08}s`,
              }}>
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[7px] font-mono whitespace-nowrap" style={{ color: C.muted }}>{d.share}%</span>
              </div>
              <p className="text-[10px] text-[#a3a3a3] mt-2 font-mono">{d.year}</p>
            </div>
          )
        })}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="p-3 rounded bg-[#fafafa]">
          <p className="text-[20px] font-serif font-light text-[#B45309]">5.4×</p>
          <p className="text-[9px] text-[#a3a3a3]">Population multiplier 1960→2025. From 284M to 1.53B in one lifetime.</p>
        </div>
        <div className="p-3 rounded bg-[#fafafa]">
          <p className="text-[20px] font-serif font-light text-[#B45309]">1 in 4</p>
          <p className="text-[9px] text-[#a3a3a3]">Humans will be African by 2050. Up from 1 in 11 in 1960.</p>
        </div>
        <div className="p-3 rounded bg-[#fafafa]">
          <p className="text-[20px] font-serif font-light text-[#B45309]">40%</p>
          <p className="text-[9px] text-[#a3a3a3]">Of all children on Earth will be African by 2100. Nearly half of all humans under 25.</p>
        </div>
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-3">Bars = Africa population. Percentages = Africa's share of world population. Dashed bars = UN medium-variant projections. Source: UN World Population Prospects 2024, Worldometer, ISS African Futures. © Dancing with Lions</p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: The Age Gap — Median Ages Compared
   ═══════════════════════════════════════════ */

const AGE_DATA = [
  // Africa
  { name: 'Niger', age: 14.9, region: 'Africa', fertility: 6.7, color: C.amber },
  { name: 'Mali', age: 15.8, region: 'Africa', fertility: 5.8, color: C.amber },
  { name: 'Chad', age: 15.9, region: 'Africa', fertility: 6.1, color: C.amber },
  { name: 'DRC', age: 16.7, region: 'Africa', fertility: 6.0, color: C.amber },
  { name: 'Nigeria', age: 17.7, region: 'Africa', fertility: 5.1, color: C.amber },
  { name: 'Ethiopia', age: 19.0, region: 'Africa', fertility: 4.1, color: C.amber },
  { name: 'Kenya', age: 20.0, region: 'Africa', fertility: 3.3, color: C.teal },
  { name: 'Morocco', age: 29.5, region: 'Africa', fertility: 2.3, color: C.teal },
  { name: 'Tunisia', age: 33.0, region: 'Africa', fertility: 2.0, color: C.teal },
  { name: 'South Africa', age: 28.0, region: 'Africa', fertility: 2.3, color: C.teal },
  // Comparison
  { name: 'India', age: 28.4, region: 'Asia', fertility: 2.0, color: C.blue },
  { name: 'China', age: 39.0, region: 'Asia', fertility: 1.0, color: C.blue },
  { name: 'USA', age: 38.5, region: 'West', fertility: 1.6, color: C.light },
  { name: 'EU', age: 44.4, region: 'West', fertility: 1.4, color: C.light },
  { name: 'Japan', age: 48.6, region: 'Asia', fertility: 1.2, color: C.light },
]

export function AgeGap() {
  const { ref, visible } = useInView(0.12)
  const maxAge = 50
  return (
    <div ref={ref} className="space-y-1.5">
      {AGE_DATA.map((d, i) => (
        <div key={d.name} className="flex items-center gap-2" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${i * 0.04}s` }}>
          <span className="text-[11px] w-[72px] text-right font-semibold" style={{ color: d.color }}>{d.name}</span>
          <div className="flex-1 h-[14px] bg-[#f5f5f5] rounded-sm overflow-hidden relative">
            <div className="h-full rounded-sm" style={{
              width: visible ? `${(d.age / maxAge) * 100}%` : '0%',
              background: d.color, opacity: 0.35,
              transition: `width 0.7s ease ${i * 0.04}s`,
            }} />
            <span className="absolute right-1 top-0 text-[8px] leading-[14px] font-mono" style={{ color: C.mid }}>{d.fertility} TFR</span>
          </div>
          <span className="text-[11px] w-[36px] font-mono font-semibold" style={{ color: d.color }}>{d.age}</span>
        </div>
      ))}
      <div className="mt-4 p-3 bg-[#fffbeb] rounded border border-[#fde68a]/30">
        <p className="text-[11px] text-[#92400E] font-semibold">The inversion</p>
        <p className="text-[10px] text-[#525252] mt-1">Niger's median age is 14.9. Japan's is 48.6. That is a 33-year gap — and it is widening. By 2035, more young Africans will enter the workforce each year than in the rest of the world combined. Europe's labour force shrinks from 370M to 342M by 2050. Africa's nearly doubles from 883M to 1.6B.</p>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: The Megacities — Africa's Urban Future
   ═══════════════════════════════════════════ */

const MEGACITIES = [
  { name: 'Cairo', country: 'Egypt', pop2025: 25.6, pop2050: 32.6, pop2100: 45, growth: '+27%', lat: 30.04, lng: 31.24 },
  { name: 'Lagos', country: 'Nigeria', pop2025: 17.0, pop2050: 28.2, pop2100: 88, growth: '+66%', lat: 6.45, lng: 3.39 },
  { name: 'Kinshasa', country: 'DRC', pop2025: 17.8, pop2050: 29.0, pop2100: 61, growth: '+63%', lat: -4.32, lng: 15.32 },
  { name: 'Dar es Salaam', country: 'Tanzania', pop2025: 7.5, pop2050: 16.4, pop2100: 62, growth: '+118%', lat: -6.79, lng: 39.28 },
  { name: 'Luanda', country: 'Angola', pop2025: 9.5, pop2050: 14.0, pop2100: 30, growth: '+47%', lat: -8.84, lng: 13.23 },
  { name: 'Nairobi', country: 'Kenya', pop2025: 5.2, pop2050: 10.4, pop2100: 25, growth: '+100%', lat: -1.29, lng: 36.82 },
  { name: 'Khartoum', country: 'Sudan', pop2025: 6.8, pop2050: 11.0, pop2100: 20, growth: '+62%', lat: 15.59, lng: 32.53 },
]

export function MegacityRise() {
  const { ref, visible } = useInView(0.12)
  const maxPop = 88
  return (
    <div ref={ref}>
      <div className="space-y-3">
        {MEGACITIES.map((city, i) => (
          <div key={city.name} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s` }}>
            <div className="flex items-baseline justify-between mb-1">
              <div>
                <span className="text-[13px] font-semibold text-[#0a0a0a]">{city.name}</span>
                <span className="text-[10px] text-[#a3a3a3] ml-2">{city.country}</span>
              </div>
              <span className="text-[10px] font-mono text-[#B45309]">{city.growth}</span>
            </div>
            <div className="h-[18px] bg-[#f5f5f5] rounded-sm overflow-hidden flex">
              {/* 2025 */}
              <div className="h-full rounded-l-sm flex items-center justify-end pr-1" style={{
                width: visible ? `${(city.pop2025 / maxPop) * 100}%` : '0%',
                background: C.amber, opacity: 0.6,
                transition: `width 0.7s ease ${i * 0.06}s`,
              }}>
                <span className="text-[7px] text-white font-mono font-bold">{city.pop2025}M</span>
              </div>
              {/* 2050 growth */}
              <div className="h-full flex items-center justify-end pr-1" style={{
                width: visible ? `${((city.pop2050 - city.pop2025) / maxPop) * 100}%` : '0%',
                background: C.amber, opacity: 0.35,
                transition: `width 0.7s ease ${i * 0.06 + 0.2}s`,
              }}>
                <span className="text-[7px] font-mono" style={{ color: C.amber }}>{city.pop2050}M</span>
              </div>
              {/* 2100 growth */}
              {city.pop2100 && (
                <div className="h-full rounded-r-sm border border-dashed flex items-center justify-end pr-1" style={{
                  width: visible ? `${((city.pop2100 - city.pop2050) / maxPop) * 100}%` : '0%',
                  borderColor: C.amber + '50', background: C.amber + '10',
                  transition: `width 0.7s ease ${i * 0.06 + 0.4}s`,
                }}>
                  <span className="text-[7px] font-mono" style={{ color: C.muted }}>{city.pop2100}M</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4 text-[9px] text-[#a3a3a3]">
        <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm inline-block" style={{ background: C.amber, opacity: 0.6 }} /> 2025</span>
        <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm inline-block" style={{ background: C.amber, opacity: 0.35 }} /> 2050</span>
        <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm inline-block border border-dashed" style={{ borderColor: C.amber + '50', background: C.amber + '10' }} /> 2100</span>
      </div>
      <div className="mt-4 p-3 bg-[#fef2f2] rounded border border-[#fecaca]/30">
        <p className="text-[11px] text-[#991B1B] font-semibold">Lagos in 2100: 88 million people in one city</p>
        <p className="text-[10px] text-[#525252] mt-1">The Global Cities Institute forecasts Lagos as the world's largest city by 2100. In 1960 it had 200,000 people — a 440× increase in 140 years. By 2050, Africa will have 14 megacities (10M+). By 2100, at least 10 of the world's 20 largest cities will be African. Most of this infrastructure does not exist yet.</p>
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-2">Sources: UN World Urbanization Prospects 2025, Global Cities Institute (U of Toronto), IEP, Statista. 2100 projections = reference scenario (Hoornweg & Pope). © Dancing with Lions</p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: Dividend or Time Bomb? — Country Readiness
   ═══════════════════════════════════════════ */

const READINESS = [
  { country: 'Tunisia', phase: 'Late transition', fertility: 2.0, medianAge: 33.0, window: 'Open now', workforce: 'Shrinking youth', risk: 'Aging before wealth', color: C.teal },
  { country: 'Morocco', phase: 'Late transition', fertility: 2.3, medianAge: 29.5, window: 'Open now', workforce: 'Peak window', risk: 'Youth unemployment 25%+', color: C.teal },
  { country: 'South Africa', phase: 'Late transition', fertility: 2.3, medianAge: 28.0, window: 'Open now', workforce: 'High inequality', risk: '33% unemployment', color: C.teal },
  { country: 'Kenya', phase: 'Mid transition', fertility: 3.3, medianAge: 20.0, window: '~2030', workforce: 'Rapid decline in fertility', risk: 'Informal economy 80%+', color: C.green },
  { country: 'Ethiopia', phase: 'Mid transition', fertility: 4.1, medianAge: 19.0, window: '~2035', workforce: 'Fast fertility drop', risk: 'Conflict, displacement', color: C.green },
  { country: 'Ghana', phase: 'Mid transition', fertility: 3.5, medianAge: 21.0, window: '~2032', workforce: 'Growing middle class', risk: 'Debt distress', color: C.green },
  { country: 'Nigeria', phase: 'Early transition', fertility: 5.1, medianAge: 17.7, window: '~2060', workforce: '20M enter/year by 2035', risk: 'Jobless growth', color: C.amber },
  { country: 'DRC', phase: 'Early transition', fertility: 6.0, medianAge: 16.7, window: '~2065', workforce: 'Massive youth bulge', risk: 'Conflict, governance', color: C.amber },
  { country: 'Niger', phase: 'Pre-dividend', fertility: 6.7, medianAge: 14.9, window: '~2080+', workforce: 'Pop triples by 2050', risk: 'Food/water/Sahel crisis', color: C.red },
  { country: 'Chad', phase: 'Pre-dividend', fertility: 6.1, medianAge: 15.9, window: '~2075+', workforce: 'Decades away', risk: 'Governance, climate', color: C.red },
]

export function DividendReadiness() {
  const { ref, visible } = useInView(0.1)
  return (
    <div ref={ref} className="space-y-2">
      {READINESS.map((d, i) => (
        <div
          key={d.country}
          className="border rounded-lg p-3 bg-white flex flex-col md:flex-row md:items-center gap-2"
          style={{
            borderColor: d.color + '25', borderLeftWidth: 4, borderLeftColor: d.color,
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(6px)',
            transition: `all 0.35s ease ${i * 0.04}s`,
          }}
        >
          <div className="md:w-[100px]">
            <p className="text-[13px] font-semibold text-[#0a0a0a]">{d.country}</p>
            <p className="text-[8px] uppercase tracking-wider font-bold mt-0.5" style={{ color: d.color }}>{d.phase}</p>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
            <div><span className="text-[#a3a3a3]">Fertility: </span><span className="font-semibold">{d.fertility}</span></div>
            <div><span className="text-[#a3a3a3]">Median age: </span><span className="font-semibold">{d.medianAge}</span></div>
            <div><span className="text-[#a3a3a3]">Window: </span><span className="font-semibold">{d.window}</span></div>
            <div><span className="text-[#a3a3a3]">Risk: </span><span className="font-semibold text-[#991B1B]">{d.risk}</span></div>
          </div>
        </div>
      ))}
      <p className="text-[9px] text-[#a3a3a3] mt-3">Demographic window = period when ratio of working-age to dependants most favourable for growth. Only 10 of 54 African countries were in their window in 2023. Nigeria not expected until ~2060. Source: ISS African Futures, UNECA, Hoover Institution, ACET. © Dancing with Lions</p>
    </div>
  )
}
