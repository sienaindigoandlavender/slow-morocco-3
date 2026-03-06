'use client'
import { useEffect, useRef, useState } from 'react'
export function useInView(threshold = 0.25) { const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false); useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold }); obs.observe(el); return () => obs.disconnect() }, [threshold]); return { ref, visible: v } }
export function AnimCounter({ target, duration = 1800, prefix = '', suffix = '', decimals = 0 }: { target: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) { const [val, setVal] = useState(0); const { ref, visible } = useInView(0.1); useEffect(() => { if (!visible) return; const s = performance.now(); const t = (n: number) => { const p = Math.min((n - s) / duration, 1); setVal((1 - Math.pow(1 - p, 3)) * target); if (p < 1) requestAnimationFrame(t) }; requestAnimationFrame(t) }, [visible, target, duration]); return <span ref={ref}>{prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</span> }

const LEAPFROGS = [
  { name: 'Zipline Drones', country: 'Rwanda → Ghana → Kenya', stat: '70M+ deliveries', detail: 'Blood, vaccines, medications by autonomous drone. Delivery in 30 min to remote clinics. Before Amazon.', color: '#991B1B', icon: '🚁' },
  { name: 'mRNA Vaccine Hubs', country: 'SA, Senegal, Rwanda', stat: '6 hubs', detail: 'Africa Bio Manufacturing Initiative. Continent produced <1% of vaccines used during COVID. Building sovereignty.', color: '#7C3AED', icon: '💉' },
  { name: 'Community Health Workers', country: 'Pan-African', stat: '1M+', detail: 'Ethiopia deployed 38,000 health extension workers. Rwanda trained 45,000 community health workers. Front line of primary care.', color: '#047857', icon: '🏥' },
  { name: 'M-TIBA / M-Pesa Health', country: 'Kenya', stat: '6M+ users', detail: 'Mobile health wallets. Micro-insurance. Pay-as-you-go healthcare. M-Pesa model applied to medicine.', color: '#0369A1', icon: '📱' },
  { name: 'AI Diagnostics', country: 'Nigeria, Kenya, SA', stat: 'Expanding', detail: 'Ubenwa (newborn cry analysis), Ada Health, Babyl Rwanda (AI triage). Where doctors are scarce, AI fills gaps.', color: '#D97706', icon: '🤖' },
  { name: 'Pharma Manufacturing', country: 'Morocco, Egypt, SA', stat: '$5B+ market', detail: 'Africa imports 80% of pharmaceuticals. Local manufacturing growing. Morocco exports to 40+ African countries.', color: '#A16207', icon: '💊' },
]

export function HealthLeapfrogCards() {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {LEAPFROGS.map((l, i) => (
        <div key={l.name} className="border rounded-lg p-4 bg-white" style={{ borderLeftWidth: 4, borderLeftColor: l.color, opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s` }}>
          <div className="flex items-start justify-between mb-2">
            <div><p className="text-[14px] font-semibold text-[#0a0a0a]">{l.icon} {l.name}</p><p className="text-[9px] text-[#a3a3a3]">{l.country}</p></div>
            <p className="font-mono text-[11px] font-bold" style={{ color: l.color }}>{l.stat}</p>
          </div>
          <p className="text-[10px] text-[#525252] leading-relaxed">{l.detail}</p>
        </div>
      ))}
    </div>
  )
}

const BURDEN = [
  { disease: 'Malaria', deaths: '580K', pct: 95, color: '#991B1B', note: '95% of global malaria deaths occur in Africa. 249M cases (2022).' },
  { disease: 'HIV/AIDS', deaths: '380K', pct: 65, color: '#7C3AED', note: '65% of global HIV burden. 25.6M living with HIV in SSA.' },
  { disease: 'TB', deaths: '424K', pct: 25, color: '#0369A1', note: '25% of global TB cases. Drug-resistant strains rising.' },
  { disease: 'Maternal mortality', deaths: '200K', pct: 70, color: '#D97706', note: '70% of global maternal deaths. 1 in 37 lifetime risk SSA vs 1 in 7,800 EU.' },
  { disease: 'Under-5 mortality', deaths: '2.7M', pct: 50, color: '#047857', note: 'Half of global under-5 deaths. Pneumonia, diarrhoea, malaria, neonatal conditions.' },
]

export function DiseaseBurden() {
  const { ref, visible } = useInView(0.1)
  return (
    <div ref={ref} className="space-y-3">
      {BURDEN.map((b, i) => (
        <div key={b.disease} className="flex items-center gap-3" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s` }}>
          <span className="text-[12px] font-semibold text-[#0a0a0a] w-[110px]">{b.disease}</span>
          <div className="flex-1 h-[14px] bg-[#f5f5f5] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: visible ? `${b.pct}%` : '0%', background: b.color, opacity: 0.4, transition: `width 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.08}s` }} />
          </div>
          <span className="text-[10px] font-mono w-[50px] text-right" style={{ color: b.color }}>{b.pct}%</span>
          <span className="text-[10px] text-[#a3a3a3] w-[50px] text-right">{b.deaths}/yr</span>
        </div>
      ))}
      <p className="text-[9px] text-[#a3a3a3] mt-2">% = Africa&rsquo;s share of global burden for each condition. Sources: WHO, UNAIDS.</p>
    </div>
  )
}
