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
   CHART 1: The Leapfrog Timeline
   ═══════════════════════════════════════════ */

const LEAPFROGS = [
  { year: '2007', event: 'M-Pesa launches in Kenya', detail: 'Safaricom\'s mobile money service. Skipped bank branches entirely. Now 60M+ users, $364B transactions (2023).', color: C.teal, icon: '📱' },
  { year: '2012', event: 'Africa hits 650M mobile subscribers', detail: 'More mobile connections than the US and Europe combined. Landline infrastructure never built — not needed.', color: C.blue, icon: '📶' },
  { year: '2016', event: 'Flutterwave founded', detail: 'Payment infrastructure API for Africa. Now $3B valuation, 1M+ businesses, 500K daily transactions.', color: C.amber, icon: '💳' },
  { year: '2016', event: 'Zipline drone delivery (Rwanda)', detail: 'Blood delivered to remote clinics by drone. Slash delivery time, reduce wastage by 2/3. Before Amazon.', color: C.green, icon: '🚁' },
  { year: '2019', event: 'Africa: 1.1B mobile users', detail: 'Mobile money transactions surpass $500B. 500M+ registered accounts. World\'s largest mobile money market.', color: C.teal, icon: '💰' },
  { year: '2020', event: 'Paystack acquired by Stripe ($200M)', detail: 'Nigerian payments startup. First major African tech acquisition by Silicon Valley. Founded 2015.', color: C.violet, icon: '🦄' },
  { year: '2021', event: 'African VC funding hits $4.9B', detail: 'Record year. 6× faster growth than global average. Tripled from previous year.', color: C.gold, icon: '📈' },
  { year: '2022', event: 'Fintech peak: $1.4B to African fintechs', detail: '39% increase from 2021. Eight of nine African unicorns are fintech. Market CAGR: 38%.', color: C.amber, icon: '🏦' },
  { year: '2024', event: 'Mobile payments surpass $1.1T', detail: '1.1B mobile users. Nigeria processes $1T+ in instant payments. PAPSS enables cross-border local currency settlement.', color: C.teal, icon: '🌍' },
  { year: '2025', event: 'Digital economy: $30B market', detail: 'Expected to double to $63B by 2030. Digital share of GDP: 1.1% (2012) → 5.2% (2025) → 8.5% (2050).', color: C.blue, icon: '🚀' },
]

export function LeapfrogTimeline() {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-[#e5e5e5]" />
      <div className="space-y-4">
        {LEAPFROGS.map((l, i) => (
          <div
            key={i}
            className="relative flex gap-4 pl-10"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-8px)', transition: `all 0.4s ease ${i * 0.06}s` }}
          >
            <div className="absolute left-[10px] top-1 w-[18px] h-[18px] rounded-full border-2 bg-white z-10 flex items-center justify-center text-[8px]" style={{ borderColor: l.color }}>{l.icon}</div>
            <div className="flex-1 pb-2">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono font-bold" style={{ color: l.color }}>{l.year}</span>
                <span className="text-[13px] font-semibold text-[#0a0a0a]">{l.event}</span>
              </div>
              <p className="text-[11px] text-[#525252] mt-0.5 leading-relaxed">{l.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: The Unicorns — Africa's 9 Billion-Dollar Tech Companies
   ═══════════════════════════════════════════ */

const UNICORNS = [
  { name: 'Flutterwave', val: 3.0, country: 'Nigeria', sector: 'Payments', year: 2021, funded: '$484M', color: C.amber },
  { name: 'OPay', val: 2.0, country: 'Nigeria', sector: 'Payments/Super app', year: 2021, funded: '$500M+', color: C.amber },
  { name: 'Wave', val: 1.7, country: 'Senegal', sector: 'Mobile money', year: 2021, funded: '$337M+', color: C.teal },
  { name: 'Chipper Cash', val: 1.25, country: 'Uganda/US', sector: 'Cross-border payments', year: 2021, funded: '$302M', color: C.blue },
  { name: 'MNT-Halan', val: 1.0, country: 'Egypt', sector: 'Financial super app', year: 2023, funded: '$500M+', color: C.green },
  { name: 'Interswitch', val: 1.0, country: 'Nigeria', sector: 'Payment infrastructure', year: 2019, funded: '$320M', color: C.amber },
  { name: 'Moniepoint', val: 1.0, country: 'Nigeria', sector: 'Banking/Payments', year: 2024, funded: '$170M', color: C.amber },
  { name: 'Tyme Group', val: 1.0, country: 'South Africa', sector: 'Digital banking', year: 2024, funded: '$250M+', color: C.violet },
  { name: 'PalmPay', val: 0.85, country: 'Nigeria', sector: 'Mobile wallet', year: '—', funded: '$140M', color: C.muted },
]

export function UnicornCards() {
  const { ref, visible } = useInView(0.08)
  const maxVal = 3.0
  return (
    <div ref={ref} className="space-y-2">
      {UNICORNS.map((u, i) => (
        <div
          key={u.name}
          className="flex items-center gap-3 p-3 border rounded-lg bg-white"
          style={{
            borderColor: u.val >= 1 ? u.color + '30' : '#e5e5e5',
            borderLeftWidth: u.val >= 1 ? 4 : 1, borderLeftColor: u.val >= 1 ? u.color : '#e5e5e5',
            opacity: visible ? 1 : 0, transition: `opacity 0.35s ease ${i * 0.04}s`,
          }}
        >
          <div className="w-[120px]">
            <p className="text-[13px] font-semibold text-[#0a0a0a]">{u.name}</p>
            <p className="text-[9px] text-[#a3a3a3]">{u.country} · {u.sector}</p>
          </div>
          <div className="flex-1 h-[14px] bg-[#f5f5f5] rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{
              width: visible ? `${(u.val / maxVal) * 100}%` : '0%',
              background: u.color, opacity: 0.4,
              transition: `width 0.6s ease ${i * 0.05}s`,
            }} />
          </div>
          <div className="text-right w-[60px]">
            <p className="font-serif text-[18px] font-light leading-none" style={{ color: u.color }}>${u.val}B</p>
            <p className="text-[7px] text-[#a3a3a3] mt-0.5">{u.funded} raised</p>
          </div>
        </div>
      ))}
      <div className="mt-3 p-3 bg-[#fffbeb] rounded border border-[#fde68a]/30">
        <p className="text-[11px] text-[#92400E] font-semibold">8 of 9 African unicorns are fintech</p>
        <p className="text-[10px] text-[#525252] mt-1">Nigeria alone has 5 unicorns. 40% of all African VC funding goes to fintech. Payments infrastructure is the foundation layer — everything else builds on top.</p>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: VC Funding Arc — Peak and Correction
   ═══════════════════════════════════════════ */

const VC_DATA = [
  { year: '2017', amount: 0.56 }, { year: '2018', amount: 1.16 }, { year: '2019', amount: 2.02 },
  { year: '2020', amount: 1.43 }, { year: '2021', amount: 4.93 }, { year: '2022', amount: 4.73 },
  { year: '2023', amount: 2.90 }, { year: '2024', amount: 2.20 },
]

export function VCFundingArc() {
  const { ref, visible } = useInView(0.15)
  const maxVal = 4.93
  return (
    <div ref={ref}>
      <div className="flex items-end gap-[6px] h-[200px]">
        {VC_DATA.map((d, i) => {
          const h = (d.amount / maxVal) * 100
          const isPeak = d.year === '2021'
          const isDown = d.amount < 3 && parseInt(d.year) > 2021
          return (
            <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full">
              <p className="text-[9px] font-mono mb-1" style={{ color: isPeak ? C.green : isDown ? C.red : C.mid }}>${d.amount}B</p>
              <div className="w-full rounded-t-sm" style={{
                height: visible ? `${h}%` : '0%',
                background: isPeak ? C.green : isDown ? C.red : C.teal,
                opacity: isPeak ? 0.7 : isDown ? 0.3 : 0.4,
                transition: `height 0.7s ease ${i * 0.06}s`,
              }} />
              <p className="text-[10px] text-[#a3a3a3] mt-2 font-mono">{d.year}</p>
            </div>
          )
        })}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="p-3 rounded bg-[#ecfdf5] border border-[#a7f3d0]/30">
          <p className="text-[11px] text-[#047857] font-semibold">The boom (2021)</p>
          <p className="text-[10px] text-[#525252] mt-1">$4.93B. Tripled in one year. 6× faster growth than global average. Record deals from Tiger Global, SoftBank, Sequoia.</p>
        </div>
        <div className="p-3 rounded bg-[#fef2f2] border border-[#fecaca]/30">
          <p className="text-[11px] text-[#991B1B] font-semibold">The correction (2023-24)</p>
          <p className="text-[10px] text-[#525252] mt-1">Down 55% from peak. Global tightening. High-profile closures (Copia, Gro Intelligence, Dash). Shift to profitability focus. 70% of funding still from non-African investors.</p>
        </div>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: The Five Hubs
   ═══════════════════════════════════════════ */

const HUBS = [
  { city: 'Lagos', country: 'Nigeria', nickname: 'Yaba (Silicon Lagoon)', startups: '~2,000', ecosystem: '$9.8B', strengths: 'Fintech, payments, e-commerce. 5 unicorns. Largest startup market in Africa.', vc2024: '$400M+', color: C.amber },
  { city: 'Nairobi', country: 'Kenya', nickname: 'Silicon Savannah', startups: '~1,000', ecosystem: '$4B+', strengths: 'Mobile money (M-Pesa birthplace), cleantech, logistics. $638M VC in 2024 (29% of continent).', vc2024: '$638M', color: C.teal },
  { city: 'Cape Town', country: 'South Africa', nickname: 'Silicon Cape', startups: '450+', ecosystem: '$3B+', strengths: 'AI, deep tech, wealthtech. Digital banking (TymeBank). Most advanced banking infrastructure.', vc2024: '$200M+', color: C.violet },
  { city: 'Cairo', country: 'Egypt', nickname: 'MENA Bridge', startups: '400+', ecosystem: '$2.5B+', strengths: 'Fintech (MNT-Halan, Fawry), e-commerce, proptech. $339M H1 2025. Bridge to MENA investment.', vc2024: '$300M+', color: C.blue },
  { city: 'Kigali', country: 'Rwanda', nickname: 'Africa\'s Singapore', startups: '200+', ecosystem: '$500M+', strengths: '95% 4G coverage. Kigali Innovation City. Startup Act. Zipline HQ. Agritech, healthtech.', vc2024: '$50M+', color: C.green },
]

export function TechHubs() {
  const { ref, visible } = useInView(0.1)
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {HUBS.map((h, i) => (
        <div
          key={h.city}
          className="border rounded-lg p-4 bg-white"
          style={{
            borderLeftWidth: 4, borderLeftColor: h.color,
            opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s`,
          }}
        >
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <p className="text-[15px] font-semibold text-[#0a0a0a]">{h.city}</p>
              <p className="text-[9px] text-[#a3a3a3]">{h.country} · "{h.nickname}"</p>
            </div>
            <p className="font-serif text-[18px] font-light" style={{ color: h.color }}>{h.ecosystem}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
            <div><span className="text-[#a3a3a3]">Startups: </span><span className="font-semibold">{h.startups}</span></div>
            <div><span className="text-[#a3a3a3]">VC 2024: </span><span className="font-semibold">{h.vc2024}</span></div>
          </div>
          <p className="text-[10px] text-[#525252] leading-relaxed">{h.strengths}</p>
        </div>
      ))}
      <div className="border rounded-lg p-4 bg-[#fafafa] border-dashed flex items-center justify-center">
        <div className="text-center">
          <p className="text-[28px] font-serif font-light text-[#a3a3a3]">1,000+</p>
          <p className="text-[10px] text-[#a3a3a3]">Active tech hubs across Africa. 11,000+ startups. Google, Microsoft, Meta, Amazon all have African offices.</p>
        </div>
      </div>
    </div>
  )
}
