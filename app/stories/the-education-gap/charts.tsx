'use client'
import { useEffect, useRef, useState } from 'react'
export function useInView(threshold = 0.25) { const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false); useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold }); obs.observe(el); return () => obs.disconnect() }, [threshold]); return { ref, visible: v } }
export function AnimCounter({ target, duration = 1800, prefix = '', suffix = '', decimals = 0 }: { target: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) { const [val, setVal] = useState(0); const { ref, visible } = useInView(0.1); useEffect(() => { if (!visible) return; const s = performance.now(); const t = (n: number) => { const p = Math.min((n - s) / duration, 1); setVal((1 - Math.pow(1 - p, 3)) * target); if (p < 1) requestAnimationFrame(t) }; requestAnimationFrame(t) }, [visible, target, duration]); return <span ref={ref}>{prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</span> }

/* THE PARADOX — Two opposing forces visualised */
const GAP_DATA = [
  { label: 'Children out of school', stat: '98M', detail: 'Sub-Saharan Africa. Highest rate globally. 1 in 5 children aged 6-11 not in school.', color: '#991B1B', side: 'gap' },
  { label: 'Learning poverty', stat: '86%', detail: '86% of 10-year-olds in SSA cannot read a simple story with comprehension. Being in school ≠ learning.', color: '#7C3AED', side: 'gap' },
  { label: 'Teacher shortage', stat: '15M', detail: 'SSA needs 15 million additional teachers by 2030 to achieve universal education. 5.4M for primary alone.', color: '#D97706', side: 'gap' },
  { label: 'Brain drain', stat: '70K+/yr', detail: '70,000+ skilled professionals leave Africa annually. Doctors, engineers, academics. Net loss of investment.', color: '#525252', side: 'gap' },
]

const LEAP_DATA = [
  { label: 'University enrollment growth', stat: '3×', detail: 'Tripled since 2000. Fastest growth rate globally. 8M→24M students.', color: '#047857', side: 'leap' },
  { label: 'Coding academies', stat: '700+', detail: 'Andela, ALX, Moringa, Holberton. Training developers for global remote work. Nigeria, Kenya, Rwanda lead.', color: '#0369A1', side: 'leap' },
  { label: 'EdTech startups', stat: '$800M+', detail: 'Raised since 2019. uLesson (Nigeria), Zeraki (Kenya), M-Shule (SMS-based tutoring). Mobile-first education.', color: '#15803d', side: 'leap' },
  { label: 'African universities ranked', stat: '14', detail: 'In global top 500 (QS 2025). University of Cape Town, Wits, Cairo, Nairobi leading. Growing but thin.', color: '#A16207', side: 'leap' },
]

export function ParadoxCards() {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#991B1B] font-semibold mb-3">The Gap</p>
        <div className="space-y-3">
          {GAP_DATA.map((d, i) => (
            <div key={d.label} className="flex gap-3 items-start" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s` }}>
              <p className="font-serif text-[22px] font-light leading-none w-[60px] flex-shrink-0" style={{ color: d.color }}>{d.stat}</p>
              <div><p className="text-[11px] font-semibold text-[#0a0a0a]">{d.label}</p><p className="text-[10px] text-[#525252] leading-relaxed">{d.detail}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#047857] font-semibold mb-3">The Leap</p>
        <div className="space-y-3">
          {LEAP_DATA.map((d, i) => (
            <div key={d.label} className="flex gap-3 items-start" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06 + 0.2}s` }}>
              <p className="font-serif text-[22px] font-light leading-none w-[60px] flex-shrink-0" style={{ color: d.color }}>{d.stat}</p>
              <div><p className="text-[11px] font-semibold text-[#0a0a0a]">{d.label}</p><p className="text-[10px] text-[#525252] leading-relaxed">{d.detail}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* LITERACY RATES — Flowing bars by country */
const LITERACY = [
  { country: 'Seychelles', rate: 96, color: '#047857' },
  { country: 'South Africa', rate: 95, color: '#047857' },
  { country: 'Tunisia', rate: 82, color: '#15803d' },
  { country: 'Morocco', rate: 76, color: '#15803d' },
  { country: 'Kenya', rate: 82, color: '#15803d' },
  { country: 'Ghana', rate: 80, color: '#15803d' },
  { country: 'Nigeria', rate: 62, color: '#D97706' },
  { country: 'Senegal', rate: 52, color: '#D97706' },
  { country: 'Ethiopia', rate: 52, color: '#D97706' },
  { country: 'Mali', rate: 31, color: '#991B1B' },
  { country: 'Niger', rate: 19, color: '#991B1B' },
  { country: 'Chad', rate: 22, color: '#991B1B' },
]

export function LiteracyBars() {
  const { ref, visible } = useInView(0.1)
  return (
    <div ref={ref} className="space-y-1.5">
      {LITERACY.map((l, i) => (
        <div key={l.country} className="flex items-center gap-2" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${i * 0.04}s` }}>
          <span className="text-[10px] text-[#525252] w-[80px] text-right">{l.country}</span>
          <div className="flex-1 h-[12px] bg-[#f5f5f5] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: visible ? `${l.rate}%` : '0%', background: l.color, opacity: 0.45, transition: `width 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.05}s` }} />
          </div>
          <span className="text-[10px] font-mono w-[32px]" style={{ color: l.color }}>{l.rate}%</span>
        </div>
      ))}
    </div>
  )
}
