'use client'

import { useEffect, useRef, useState } from 'react'

const C = {
  black: '#0a0a0a', dark: '#262626', mid: '#525252', light: '#737373', muted: '#a3a3a3',
  line: '#e5e5e5', off: '#fafafa', white: '#fff',
  teal: '#047857', green: '#15803d', amber: '#B45309', red: '#991B1B', crimson: '#DC2626', blue: '#0369A1', gold: '#A16207', china: '#DC2626',
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
   CHART 1: The Megaprojects — 12 Projects Reshaping the Continent
   ═══════════════════════════════════════════ */

const MEGAPROJECTS = [
  // TRANSPORT
  { name: 'Lagos-Calabar Coastal Railway', country: 'Nigeria', cost: 10, sector: 'Rail', status: 'Construction', builder: 'China (CCECC)', desc: '1,400km. Links Africa\'s biggest economy coast to coast. Game-changer for Nigerian trade.', color: C.china },
  { name: 'Lobito Corridor Railway', country: 'Angola→Zambia→DRC', cost: 1, sector: 'Rail', status: 'Construction 2026', builder: 'US/EU backed', desc: '830km greenfield. Copperbelt to Atlantic in 7 days (from 45). 300,000t CO₂ saved/year. US counter to BRI.', color: C.blue },
  { name: 'Kenya SGR Extension', country: 'Kenya→Uganda', cost: 3.7, sector: 'Rail', status: 'Planned', builder: 'China (CRBC)', desc: 'Mombasa→Nairobi→Kisumu→Malaba. Replacing colonial-era rail. Regional connectivity.', color: C.china },
  { name: 'Egypt High-Speed Rail', country: 'Egypt', cost: 4.5, sector: 'Rail', status: 'Construction', builder: 'Siemens Mobility', desc: '2,000km linking 60 cities. Egypt\'s first high-speed rail. Contract awarded 2022.', color: C.amber },
  // ENERGY
  { name: 'Grand Ethiopian Renaissance Dam', country: 'Ethiopia', cost: 4.8, sector: 'Energy', status: 'Near complete', builder: 'Ethiopia (self-funded)', desc: '6,000MW. Africa\'s largest hydroelectric. 7th largest in world. Controversial Nile water politics.', color: C.green },
  { name: 'Nigeria-Morocco Gas Pipeline', country: '13 countries', cost: 25, sector: 'Energy', status: 'FEED Phase II', builder: 'Nigeria/Morocco', desc: '5,600km. Lagos→Tangier. 30bcm/year. 340M+ people. Tenders launched 2025. Rival to Trans-Saharan.', color: C.gold },
  { name: 'Namibia Green Hydrogen (Hyphen)', country: 'Namibia', cost: 9.4, sector: 'Energy', status: 'Construction 2025', builder: 'Hyphen Hydrogen', desc: '300,000 tonnes green hydrogen/year. Positions Namibia as export hub. Revolutionary scale.', color: C.teal },
  { name: 'Mambila Hydropower', country: 'Nigeria', cost: 5.8, sector: 'Energy', status: 'Construction', builder: 'China (Sinohydro)', desc: '3,050MW across 3 dams on Donga River. Planned for 30 years. Nigeria\'s energy salvation.', color: C.china },
  // PORTS & CITIES
  { name: 'Dakhla Atlantic Port', country: 'Morocco', cost: 1.2, sector: 'Port', status: 'Construction', builder: 'Morocco', desc: '35M tonnes/year. Trade port + fishing port + shipyard. West Africa gateway. Complete 2028.', color: C.amber },
  { name: 'Konza Technopolis', country: 'Kenya', cost: 14.5, sector: 'Smart city', status: 'Phase 1 active', builder: 'Kenya/China', desc: '"African Silicon Savanna." 5,000 acres. Tech hub outside Nairobi. Data centre operational.', color: C.blue },
  { name: 'Egypt New Admin Capital', country: 'Egypt', cost: 58, sector: 'City', status: 'Construction', builder: 'China State Construction', desc: '21 residential + 25 commercial districts. Theme park 4× Disneyland. 45km east of Cairo.', color: C.china },
  { name: 'Dangote Refinery', country: 'Nigeria', cost: 19, sector: 'Industrial', status: 'Operational', builder: 'Dangote Group', desc: '650,000 barrels/day. Africa\'s largest oil refinery. Operational since 2024. Nigerian-built.', color: C.gold },
]

export function MegaprojectCards() {
  const { ref, visible } = useInView(0.08)
  const sectorIcon = (s: string) => s === 'Rail' ? '🚆' : s === 'Energy' ? '⚡' : s === 'Port' ? '🚢' : s === 'Smart city' ? '🏙️' : s === 'City' ? '🏗️' : '🏭'
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {MEGAPROJECTS.map((p, i) => (
        <div
          key={p.name}
          className="border rounded-lg p-4 bg-white"
          style={{
            borderColor: p.color + '25', borderLeftWidth: 4, borderLeftColor: p.color,
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(8px)',
            transition: `all 0.4s ease ${i * 0.04}s`,
          }}
        >
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1">
              <span className="text-[10px] text-[#a3a3a3]">{sectorIcon(p.sector)} {p.sector} · {p.country}</span>
              <p className="text-[13px] font-semibold text-[#0a0a0a] leading-tight mt-0.5">{p.name}</p>
            </div>
            <div className="text-right ml-3">
              <p className="font-serif text-[20px] font-light leading-none" style={{ color: p.color }}>${p.cost}B</p>
              <span className="text-[7px] px-1.5 py-0.5 rounded font-mono font-bold mt-1 inline-block" style={{
                background: p.status.includes('Operational') ? C.green + '15' : p.status.includes('Construction') ? C.amber + '15' : C.muted + '15',
                color: p.status.includes('Operational') ? C.green : p.status.includes('Construction') ? C.amber : C.light,
              }}>{p.status}</span>
            </div>
          </div>
          <p className="text-[10px] text-[#525252] leading-relaxed mt-1">{p.desc}</p>
          <p className="text-[9px] text-[#a3a3a3] mt-1">Builder: {p.builder}</p>
        </div>
      ))}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: China's BRI in Africa — Annual Engagement
   ═══════════════════════════════════════════ */

const BRI_AFRICA = [
  { year: '2013', amount: 8.2 }, { year: '2014', amount: 12.1 }, { year: '2015', amount: 15.3 },
  { year: '2016', amount: 18.7 }, { year: '2017', amount: 16.8 }, { year: '2018', amount: 20.4 },
  { year: '2019', amount: 17.2 }, { year: '2020', amount: 9.8 }, { year: '2021', amount: 12.5 },
  { year: '2022', amount: 10.3 }, { year: '2023', amount: 21.7 }, { year: '2024', amount: 22.0 },
  { year: '2025', amount: 61.2 },
]

export function BRIAfricaChart() {
  const { ref, visible } = useInView(0.15)
  const maxVal = 61.2
  return (
    <div ref={ref}>
      <div className="flex items-end gap-[4px] h-[220px]">
        {BRI_AFRICA.map((d, i) => {
          const h = (d.amount / maxVal) * 100
          const is2025 = d.year === '2025'
          return (
            <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full">
              <p className="text-[8px] font-mono mb-1" style={{ color: is2025 ? C.china : C.mid }}>{d.amount < 10 ? d.amount.toFixed(1) : Math.round(d.amount)}</p>
              <div className="w-full rounded-t-sm" style={{
                height: visible ? `${h}%` : '0%',
                background: is2025 ? C.china : d.year === '2020' ? C.muted : '#ef4444',
                opacity: is2025 ? 0.7 : 0.35,
                transition: `height 0.8s ease ${i * 0.05}s`,
              }} />
              <p className="text-[7px] text-[#a3a3a3] mt-1 -rotate-45 origin-top-left translate-y-3 whitespace-nowrap">{d.year}</p>
            </div>
          )
        })}
      </div>
      <div className="mt-8 p-3 bg-[#fef2f2] rounded border border-[#fecaca]/30">
        <p className="text-[11px] text-[#991B1B] font-semibold">2025: Africa becomes #1 BRI destination globally</p>
        <p className="text-[10px] text-[#525252] mt-1">$61.2B — a 283% increase over 2024. Driven by $24.6B Nigeria (gas/hydrogen), $23.1B Republic of Congo, plus mining, manufacturing, and tech investments. Partly explained by lower US tariffs on African goods vs Asian goods.</p>
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-3">Chinese BRI engagement in Africa (USD billions). Investment + construction contracts. Source: Green Finance & Development Center / Griffith University, 2025. © Dancing with Lions</p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: The Pipeline Wars — NMGP vs Trans-Saharan
   ═══════════════════════════════════════════ */

const PIPELINES = [
  {
    name: 'Nigeria-Morocco Gas Pipeline (NMGP)',
    route: 'Lagos → Benin → Togo → Ghana → Côte d\'Ivoire → Liberia → Sierra Leone → Guinea → Guinea-Bissau → Gambia → Senegal → Mauritania → Tangier (Morocco) → Europe',
    length: '5,600 km', cost: '$25B', capacity: '30 bcm/year', countries: 13, people: '340M+',
    status: 'FEED Phase II. Tenders for Moroccan segment launched 2025. Project company established Sep 2025. Final investment decision expected end 2025.',
    backers: 'Nigeria (NNPC), Morocco (ONHYM), ECOWAS, EIB, Islamic Development Bank, OPEC Fund, UAE (new 2025)',
    advantage: 'Atlantic route — stable coastal states. Connects to existing Morocco-Europe pipeline. US-backed.',
    risk: 'Cost ($25-50B estimates vary). 25-year timeline. "Commissioning before 2040 looks implausible" — Geopolitical Monitor.',
    color: C.gold,
  },
  {
    name: 'Trans-Saharan Gas Pipeline (TSGP)',
    route: 'Nigeria → Niger → Algeria → Mediterranean → Italy/Spain/Europe',
    length: '4,128 km', cost: '$13B', capacity: '30 bcm/year', countries: 3, people: 'N/A',
    status: 'Algeria-Niger reconciliation Feb 2025. Construction announced to start after Ramadan 2025. Fourth ministerial meeting held Feb 2025.',
    backers: 'Algeria (Sonatrach), Nigeria, Niger military junta, Italy (Sasol/ENI interest)',
    advantage: 'Shorter, cheaper ($13B vs $25B). Only 3 countries. Stretches already built. Connects to existing Algerian pipeline to Europe.',
    risk: 'Sahel instability (Niger coup 2023, jihadists). Russian-aligned security corridor. Western military expelled from AES states.',
    color: C.muted,
  },
]

export function PipelineWars() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="space-y-4">
      {PIPELINES.map((p, i) => (
        <div
          key={p.name}
          className="border rounded-lg overflow-hidden bg-white"
          style={{ borderColor: p.color + '30', opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${i * 0.15}s` }}
        >
          <div className="p-4 border-b border-[#e5e5e5]" style={{ borderLeftWidth: 5, borderLeftColor: p.color }}>
            <h3 className="text-[15px] font-semibold text-[#0a0a0a]">{p.name}</h3>
            <p className="text-[10px] text-[#a3a3a3] mt-1 leading-relaxed">{p.route}</p>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div><p className="text-[9px] text-[#a3a3a3] uppercase">Length</p><p className="text-[13px] font-semibold text-[#0a0a0a]">{p.length}</p></div>
            <div><p className="text-[9px] text-[#a3a3a3] uppercase">Cost</p><p className="text-[13px] font-semibold" style={{ color: p.color }}>{p.cost}</p></div>
            <div><p className="text-[9px] text-[#a3a3a3] uppercase">Capacity</p><p className="text-[13px] font-semibold text-[#0a0a0a]">{p.capacity}</p></div>
            <div><p className="text-[9px] text-[#a3a3a3] uppercase">Countries</p><p className="text-[13px] font-semibold text-[#0a0a0a]">{p.countries}</p></div>
          </div>
          <div className="px-4 pb-4 space-y-2">
            <div><p className="text-[9px] text-[#047857] font-bold uppercase">Status</p><p className="text-[11px] text-[#525252]">{p.status}</p></div>
            <div><p className="text-[9px] text-[#0369A1] font-bold uppercase">Backers</p><p className="text-[11px] text-[#525252]">{p.backers}</p></div>
            <div><p className="text-[9px] text-[#15803d] font-bold uppercase">Advantage</p><p className="text-[11px] text-[#525252]">{p.advantage}</p></div>
            <div><p className="text-[9px] text-[#991B1B] font-bold uppercase">Risk</p><p className="text-[11px] text-[#525252]">{p.risk}</p></div>
          </div>
        </div>
      ))}
      <div className="p-4 rounded-lg bg-[#fafafa] border border-[#e5e5e5]">
        <p className="text-[11px] text-[#0a0a0a] font-semibold">The zero-sum question</p>
        <p className="text-[10px] text-[#525252] mt-1 leading-relaxed">There is likely only enough Nigerian gas and European market demand to justify one major trans-continental pipeline. NMGP = US/Morocco/Atlantic axis. TSGP = Algeria/Russia/Sahel axis. The pipeline race is a proxy for the geopolitical realignment of West Africa.</p>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: The Financing Gap — Who Pays for Africa's Infrastructure?
   ═══════════════════════════════════════════ */

const FINANCING = [
  { source: 'African governments', amount: 34, share: 41, color: C.green, note: '~1.3% of GDP. Similar to other regions but far below China (6.7%) and Vietnam (5.1%).' },
  { source: 'China (BRI)', amount: 21.7, share: 26, color: C.china, note: '2023 figure. Rose to $61.2B in 2025. Largest single external source. Mostly loans, not grants.' },
  { source: 'Multilateral banks (AfDB, World Bank)', amount: 12, share: 14, color: C.blue, note: 'AfDB, World Bank, IFC, EIB. Often with conditions. Declining share.' },
  { source: 'Other bilateral (US, EU, Japan)', amount: 8, share: 10, color: C.amber, note: 'EU Global Gateway ($300B announced 2021). US Prosper Africa/Lobito. Japan TICAD.' },
  { source: 'Private sector', amount: 7, share: 9, color: C.gold, note: 'PPPs, institutional investors. Africa holds $1.1T in domestic capital (pension/insurance/SWF).' },
]

export function FinancingGap() {
  const { ref, visible } = useInView(0.15)
  const totalBar = 130 // total bar width in percentage-like units
  return (
    <div ref={ref} className="space-y-3">
      {FINANCING.map((f, i) => (
        <div key={f.source} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[12px] font-semibold text-[#0a0a0a]">{f.source}</span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#a3a3a3]">{f.share}%</span>
              <span className="font-serif text-[16px] font-light" style={{ color: f.color }}>${f.amount}B</span>
            </div>
          </div>
          <div className="h-[12px] bg-[#f5f5f5] rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{
              width: visible ? `${f.share}%` : '0%',
              background: f.color, opacity: 0.45,
              transition: `width 0.8s ease ${i * 0.1}s`,
            }} />
          </div>
          <p className="text-[9px] text-[#a3a3a3] mt-0.5">{f.note}</p>
        </div>
      ))}
      <div className="mt-4 p-3 bg-[#eff6ff] rounded border border-[#bfdbfe]/30">
        <p className="text-[11px] text-[#0369A1] font-semibold">The gap</p>
        <p className="text-[10px] text-[#525252] mt-1">Total infrastructure spending: ~$83B/year (2019-20 avg). Estimated need: $130-170B/year. Gap: $47-87B annually. Roads (32%), railways (24%), fibre-optic (23%), solar (17%). Maintenance alone = 42% of total need.</p>
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-2">Source: OECD Africa's Development Dynamics 2025, ICA Infrastructure Financing Trends, Green Finance & Development Center BRI reports. © Dancing with Lions</p>
    </div>
  )
}
