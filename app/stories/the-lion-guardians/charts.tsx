'use client'

import { useEffect, useRef, useState } from 'react'

/* ── palette ── */
const C = {
  black: '#0a0a0a', dark: '#262626', mid: '#525252', light: '#737373', muted: '#a3a3a3',
  line: '#e5e5e5', off: '#fafafa', white: '#fff',
  amber: '#B45309', gold: '#A16207', teal: '#047857', green: '#15803d',
  red: '#991B1B', crimson: '#DC2626', blue: '#0369A1',
  ochre: '#92400E', copper: '#B45309', earth: '#78350F',
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
   CHART 1: The Timeline — From Killing to Guarding
   ═══════════════════════════════════════════ */

const TIMELINE = [
  { year: '2004', event: 'Leela Hazzah joins Living with Lions, begins researching Maasai lion killing motivations near Chyulu Hills', type: 'origin' },
  { year: '2005', event: 'Hazzah lives with Mbirikani Maasai for a year. Warriors themselves suggest they are best placed to protect lions.', type: 'origin' },
  { year: '2006', event: '42 lions speared or poisoned in Amboseli area. Kamunu Saitoti arrested after killing his 5th lion. Stephanie Dolrenry begins tracking carnivores with warriors.', type: 'crisis' },
  { year: '2007', event: 'Lion Guardians founded. Five guardians in one area of the Amboseli-Tsavo ecosystem. Warriors learn literacy, GPS, radio telemetry.', type: 'launch' },
  { year: '2009', event: 'First lion prides forming on pastoralist lands. Every adult female with cubs — first documented since monitoring began.', type: 'growth' },
  { year: '2012', event: 'St. Andrews Prize for the Environment. Training camp built on Maasai-donated land. Programme expands to multiple Kenya sites.', type: 'growth' },
  { year: '2014', event: 'CNN Top 10 Hero. LINC facial recognition launched — individual lion ID from photographs. 40+ guardians operational.', type: 'growth' },
  { year: '2015', event: 'Ruaha (Tanzania) certified to Lion Guardians standards. Model proven transferable across cultures and geographies.', type: 'expansion' },
  { year: '2019', event: 'Lion population tripled in Amboseli pastoralist lands. Lions safely dispersing through formerly hostile corridors.', type: 'growth' },
  { year: '2024', event: '60+ guardians, ~1 million acres (4,500+ km²), multiple countries. Lion killing reduced 99% across all sites.', type: 'growth' },
  { year: '2025', event: 'Kenya national census: 2,512 lions remain in the country. Amboseli one of the only ecosystems where lions are increasing.', type: 'context' },
]

export function Timeline() {
  const { ref, visible } = useInView(0.1)
  const typeColor = (t: string) => t === 'crisis' ? C.crimson : t === 'origin' ? C.amber : t === 'launch' ? C.teal : t === 'expansion' ? C.blue : t === 'growth' ? C.green : C.mid
  return (
    <div ref={ref} className="relative pl-8">
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[#e5e5e5]" />
      {TIMELINE.map((t, i) => (
        <div
          key={i}
          className="relative mb-6 last:mb-0"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-12px)', transition: `all 0.5s ease ${i * 0.07}s` }}
        >
          <div className="absolute -left-8 top-[3px] w-[22px] h-[22px] rounded-full border-2 bg-white flex items-center justify-center" style={{ borderColor: typeColor(t.type) }}>
            <div className="w-[8px] h-[8px] rounded-full" style={{ background: typeColor(t.type) }} />
          </div>
          <div>
            <span className="font-mono text-[11px] font-bold" style={{ color: typeColor(t.type) }}>{t.year}</span>
            <p className="text-[13px] text-[#262626] leading-relaxed mt-0.5">{t.event}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: Killing vs Guarding — The Inversion
   ═══════════════════════════════════════════ */

const KILL_DATA = [
  { year: 2003, kills: 28, guardians: 0 },
  { year: 2004, kills: 35, guardians: 0 },
  { year: 2005, kills: 38, guardians: 0 },
  { year: 2006, kills: 42, guardians: 0 },
  { year: 2007, kills: 18, guardians: 5 },
  { year: 2008, kills: 8, guardians: 12 },
  { year: 2009, kills: 4, guardians: 18 },
  { year: 2010, kills: 3, guardians: 22 },
  { year: 2011, kills: 2, guardians: 28 },
  { year: 2012, kills: 1, guardians: 32 },
  { year: 2013, kills: 1, guardians: 40 },
  { year: 2014, kills: 1, guardians: 42 },
  { year: 2016, kills: 0, guardians: 48 },
  { year: 2018, kills: 0, guardians: 55 },
  { year: 2020, kills: 1, guardians: 58 },
  { year: 2022, kills: 0, guardians: 60 },
  { year: 2024, kills: 0, guardians: 65 },
]

export function KillingInversion() {
  const { ref, visible } = useInView(0.2)
  const maxKills = 42
  const maxGuardians = 65
  const barW = `${100 / KILL_DATA.length - 1}%`
  return (
    <div ref={ref}>
      <div className="relative" style={{ height: 280 }}>
        {/* kills bars (top, red, inverted) */}
        <div className="absolute inset-x-0 top-0 bottom-[50%] flex items-end justify-between px-1">
          {KILL_DATA.map((d, i) => (
            <div key={`k-${i}`} className="flex flex-col items-center" style={{ width: barW }}>
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: visible ? `${(d.kills / maxKills) * 100}%` : '0%',
                  background: C.crimson,
                  opacity: 0.7,
                  transition: `height 0.8s ease ${i * 0.04}s`,
                  minHeight: d.kills > 0 ? 3 : 0,
                }}
              />
            </div>
          ))}
        </div>
        {/* center line + labels */}
        <div className="absolute inset-x-0 top-[50%] h-px bg-[#262626]" />
        <div className="absolute left-0 top-[50%] -translate-y-1/2 -translate-x-2">
          <span className="text-[8px] text-[#991B1B] font-mono uppercase">kills ↑</span>
        </div>
        <div className="absolute left-0 top-[50%] translate-y-2 -translate-x-2">
          <span className="text-[8px] text-[#047857] font-mono uppercase">guardians ↓</span>
        </div>
        {/* guardian bars (bottom, green) */}
        <div className="absolute inset-x-0 top-[50%] bottom-0 flex items-start justify-between px-1">
          {KILL_DATA.map((d, i) => (
            <div key={`g-${i}`} className="flex flex-col items-center" style={{ width: barW }}>
              <div
                className="w-full rounded-b-sm"
                style={{
                  height: visible ? `${(d.guardians / maxGuardians) * 100}%` : '0%',
                  background: C.teal,
                  opacity: 0.65,
                  transition: `height 0.8s ease ${i * 0.04 + 0.2}s`,
                  minHeight: d.guardians > 0 ? 3 : 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* year labels */}
      <div className="flex justify-between px-1 mt-1">
        {KILL_DATA.filter((_, i) => i % 3 === 0 || i === KILL_DATA.length - 1).map(d => (
          <span key={d.year} className="text-[9px] text-[#a3a3a3] font-mono">{d.year}</span>
        ))}
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-3">
        Approximate values based on published Lion Guardians reports. Kill data for Amboseli programme area. © Slow Morocco
      </p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: The Ecosystem Map — Amboseli-Tsavo Corridor
   Group ranches, parks, guardian zones
   ═══════════════════════════════════════════ */

const ECOSYSTEM_ZONES = [
  { name: 'Amboseli National Park', type: 'park', area: '392 km²', detail: 'Government-managed. Famous for elephants and Kilimanjaro views. Maasai evicted 1974. Lions move freely between park and group ranches.', color: C.teal },
  { name: 'Tsavo West National Park', type: 'park', area: '9,065 km²', detail: 'Kenya\'s largest lion population. Connected to Amboseli via the Chyulu corridor. Maneaters of Tsavo history.', color: C.teal },
  { name: 'Chyulu Hills National Park', type: 'park', area: '741 km²', detail: 'Where Hazzah lived with Mbirikani Maasai. Volcanic hills. Critical corridor between Amboseli and Tsavo.', color: C.teal },
  { name: 'Selenkay Conservancy', type: 'conservancy', area: '60 km²', detail: 'North of Amboseli NP. Saitoti\'s first Guardian patrol area. First lioness collared and named here.', color: C.amber },
  { name: 'Eselenkei Group Ranch', type: 'guardian', area: '750 km²', detail: 'Active Guardian site. High human-wildlife conflict. Guardians intervene in lion hunts, reinforce bomas.', color: C.green },
  { name: 'Olgulului Group Ranch', type: 'guardian', area: '1,200 km²', detail: 'Surrounds Amboseli NP. Expanded Guardian coverage 2013. South to Kenya-Tanzania border.', color: C.green },
  { name: 'Mbirikani Group Ranch', type: 'guardian', area: '1,100 km²', detail: 'Adjacent to Chyulu Hills. Where Hazzah conducted initial research. Core Guardian operations.', color: C.green },
  { name: 'Kuku Group Ranch', type: 'guardian', area: '960 km²', detail: 'Southern Amboseli ecosystem. Borders Tanzania. Lions dispersing south through Guardian-protected corridors.', color: C.green },
  { name: 'Rombo Group Ranch', type: 'guardian', area: '400 km²', detail: 'Eastern edge of the ecosystem. Mount Kilimanjaro foothills on Tanzanian side.', color: C.green },
]

export function EcosystemZones() {
  const { ref, visible } = useInView(0.15)
  const typeLabel = (t: string) => t === 'park' ? 'National Park' : t === 'conservancy' ? 'Conservancy' : 'Guardian Zone'
  return (
    <div ref={ref} className="space-y-3">
      {ECOSYSTEM_ZONES.map((z, i) => (
        <div
          key={z.name}
          className="border rounded-md p-4 bg-white"
          style={{
            borderColor: z.color + '40',
            borderLeftWidth: 3,
            borderLeftColor: z.color,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.4s ease ${i * 0.06}s`,
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[13px] font-semibold text-[#0a0a0a]">{z.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: z.color }}>{typeLabel(z.type)}</span>
              <span className="text-[10px] text-[#a3a3a3] font-mono">{z.area}</span>
            </div>
          </div>
          <p className="text-[11px] text-[#525252] leading-relaxed">{z.detail}</p>
        </div>
      ))}
      <div className="flex gap-4 mt-4">
        {[['National Park', C.teal], ['Conservancy', C.amber], ['Guardian Zone', C.green]].map(([l, c]) => (
          <div key={l as string} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: c as string }} />
            <span className="text-[9px] uppercase tracking-wider text-[#737373]">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: The Guardians — Roles & Tools
   ═══════════════════════════════════════════ */

const GUARDIAN_ROLES = [
  { role: 'Track lions', traditional: 'Warriors track lion spoor for hunts', guardian: 'Track lion movements daily using GPS, radio telemetry, traditional spoor reading. Log positions.', icon: '◎' },
  { role: 'Name lions', traditional: 'Warriors earn lion names by killing', guardian: 'Each Guardian names and knows individual lions. LINC facial recognition IDs. Communities mourn named lions.', icon: '◉' },
  { role: 'Warn herders', traditional: 'Warriors shout alarm when lion found', guardian: 'Alert herders via radio when lions near livestock. Move herds to safe grazing areas pre-emptively.', icon: '◈' },
  { role: 'Protect bomas', traditional: 'Thornbush corrals, variable quality', guardian: 'Reinforce bomas with metal posts, chain-link. Solar lights. Predator-proof upgrades reduce kills 80%+.', icon: '◇' },
  { role: 'Recover livestock', traditional: 'Track lost cattle — failure leads to retaliatory kills', guardian: 'Find lost livestock before predators do. Find lost child herders. First responders to depredation scenes.', icon: '◆' },
  { role: 'Stop hunts', traditional: 'Warriors organise group hunts with spears', guardian: 'Intercept hunt parties. Calm angry warriors. Call KWS if situation escalates. Cultural authority to de-escalate.', icon: '◊' },
]

export function GuardianRoles() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="space-y-4">
      {GUARDIAN_ROLES.map((r, i) => (
        <div
          key={r.role}
          className="grid grid-cols-[auto_1fr_1fr] gap-4 items-start"
          style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}
        >
          <div className="w-10 h-10 rounded-full bg-[#fafafa] border border-[#e5e5e5] flex items-center justify-center text-[18px] text-[#B45309]">
            {r.icon}
          </div>
          <div className="p-3 rounded-md bg-[#fef2f2] border border-[#fecaca]/30">
            <p className="text-[9px] uppercase tracking-wider text-[#991B1B] font-semibold mb-1">Before — warrior tradition</p>
            <p className="text-[11px] text-[#525252] leading-relaxed">{r.traditional}</p>
          </div>
          <div className="p-3 rounded-md bg-[#ecfdf5] border border-[#a7f3d0]/30">
            <p className="text-[9px] uppercase tracking-wider text-[#047857] font-semibold mb-1">Now — Guardian practice</p>
            <p className="text-[11px] text-[#525252] leading-relaxed">{r.guardian}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 5: Kenya's Lions — National Context
   ═══════════════════════════════════════════ */

const KENYA_LION_AREAS = [
  { name: 'Masai Mara', lions: 850, trend: 'stable', pct: 33.8, funded: true },
  { name: 'Amboseli-Tsavo', lions: 600, trend: 'increasing', pct: 23.9, funded: true },
  { name: 'Laikipia-Samburu', lions: 350, trend: 'declining', pct: 13.9, funded: true },
  { name: 'Nairobi NP corridor', lions: 35, trend: 'critical', pct: 1.4, funded: true },
  { name: 'Other areas combined', lions: 677, trend: 'declining', pct: 26.9, funded: false },
]

export function KenyaLions() {
  const { ref, visible } = useInView(0.2)
  const trendColor = (t: string) => t === 'increasing' ? C.green : t === 'stable' ? C.amber : t === 'declining' ? C.crimson : C.red
  const trendArrow = (t: string) => t === 'increasing' ? '↑' : t === 'stable' ? '→' : '↓'
  const maxLions = 850
  return (
    <div ref={ref}>
      <div className="mb-6 p-4 rounded-md border border-[#e5e5e5] bg-[#fafafa]">
        <p className="font-serif text-[36px] font-light text-[#0a0a0a] leading-none">2,512</p>
        <p className="text-[11px] text-[#737373] mt-1">lions remaining in Kenya (2025 National Wildlife Census). Down from ~2,000 in Amboseli ecosystem alone in the 1970s.</p>
      </div>
      <div className="space-y-4">
        {KENYA_LION_AREAS.map((a, i) => (
          <div key={a.name} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.1}s` }}>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-[#0a0a0a]">{a.name}</span>
                <span className="text-[10px] font-mono" style={{ color: trendColor(a.trend) }}>{trendArrow(a.trend)} {a.trend}</span>
              </div>
              <span className="font-serif text-[18px] font-light text-[#262626]">~{a.lions}</span>
            </div>
            <div className="h-[14px] bg-[#f5f5f5] rounded-sm overflow-hidden">
              <div
                className="h-full rounded-sm"
                style={{
                  width: visible ? `${(a.lions / maxLions) * 100}%` : '0%',
                  background: trendColor(a.trend),
                  opacity: 0.6,
                  transition: `width 1s ease ${i * 0.1}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-4">
        Estimates from Kenya Wildlife Census 2025, Born Free, KWS, Lion Guardians monitoring data. Amboseli-Tsavo is one of the only areas showing population growth. © Slow Morocco
      </p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 6: The Conflict Economics — Cost of Living with Lions
   ═══════════════════════════════════════════ */

const CONFLICT_ECONOMICS = [
  { item: 'Average cow value', amount: '$300–500', context: 'Core asset for Maasai families. Losing one cow can mean children go hungry.', color: C.amber },
  { item: 'Livestock losses per year (Amboseli)', amount: '$200k+', context: 'Across all predators. Lions responsible for ~30% of attacks. Hyenas more frequent but less visible.', color: C.crimson },
  { item: 'Guardian salary', amount: '~$100/month', context: 'Full-time employment. First paid job for many warriors. Includes literacy training.', color: C.teal },
  { item: 'Lion tourism revenue (Amboseli)', amount: '$2M+/year', context: 'Park fees, lodge revenue, guide employment. But little flows to group ranches where lions actually live.', color: C.green },
  { item: 'Predator-proof boma', amount: '$500–800', context: 'Metal posts, chain-link, solar lights. Reduces overnight depredation 80%+. One-time investment.', color: C.blue },
  { item: 'Cost per lion killed (community)', amount: '$0', context: 'Free for the warrior. Provides social prestige. No economic penalty strong enough to deter.', color: C.red },
  { item: 'Value per lion alive (tourism)', amount: '$1M+ lifetime', context: 'If lion tourism revenue reached communities directly. Currently it mostly does not.', color: C.green },
]

export function ConflictEconomics() {
  const { ref, visible } = useInView(0.2)
  return (
    <div ref={ref} className="space-y-3">
      {CONFLICT_ECONOMICS.map((c, i) => (
        <div
          key={c.item}
          className="flex gap-4 items-start p-3 rounded-md border border-[#e5e5e5] bg-white"
          style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.07}s` }}
        >
          <div className="shrink-0 w-[100px]">
            <p className="font-serif text-[18px] font-light leading-tight" style={{ color: c.color }}>{c.amount}</p>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#0a0a0a]">{c.item}</p>
            <p className="text-[11px] text-[#525252] leading-relaxed mt-0.5">{c.context}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
