'use client'

import { useState, useEffect, useRef } from 'react'

/* ─── AnimCounter ─── */
export function AnimCounter({ target, decimals = 0 }: { target: number; decimals?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1600
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(eased * target)
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{value.toFixed(decimals)}</span>
}

/* ─── CreativeOrbit ─── */
const INDUSTRIES = [
  { name: 'Music', value: '$8B', color: '#e11d48' },
  { name: 'Film', value: '$7.2B', color: '#f59e0b' },
  { name: 'Fashion', value: '$31B', color: '#8b5cf6' },
  { name: 'Gaming', value: '$1.5B', color: '#06b6d4' },
  { name: 'Visual Arts', value: '$2.8B', color: '#10b981' },
  { name: 'Publishing', value: '$1.2B', color: '#f97316' },
  { name: 'Tourism', value: '$25B', color: '#ec4899' },
]

export function CreativeOrbit() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {INDUSTRIES.map((ind) => (
          <div
            key={ind.name}
            className="p-4 bg-[#fafafa] border border-[#f0f0f0] hover:border-[#e5e5e5] transition-colors"
          >
            <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: ind.color }} />
            <p className="font-serif text-[20px] font-light text-[#0a0a0a] leading-none">{ind.value}</p>
            <p className="text-[9px] uppercase tracking-[0.1em] text-[#a3a3a3] mt-1.5">{ind.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── StreamingPulse ─── */
const STREAM_DATA = [
  { year: '2017', streams: 2 },
  { year: '2018', streams: 4.5 },
  { year: '2019', streams: 7.5 },
  { year: '2020', streams: 10 },
  { year: '2021', streams: 13.5 },
  { year: '2022', streams: 16 },
  { year: '2023', streams: 20 },
  { year: '2024', streams: 24 },
]

export function StreamingPulse() {
  const maxVal = Math.max(...STREAM_DATA.map(d => d.streams))

  return (
    <div className="w-full max-w-[560px] mx-auto py-4">
      <p className="text-[10px] uppercase tracking-[0.1em] text-[#a3a3a3] mb-4">Afrobeats Global Streams (Billions)</p>
      <div className="space-y-2">
        {STREAM_DATA.map((d) => (
          <div key={d.year} className="flex items-center gap-3">
            <span className="text-[11px] text-[#a3a3a3] w-10 tabular-nums">{d.year}</span>
            <div className="flex-1 h-6 bg-[#fafafa] relative overflow-hidden">
              <div
                className="h-full bg-[#0a0a0a] transition-all duration-700"
                style={{ width: `${(d.streams / maxVal) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-[#737373] w-8 text-right tabular-nums">{d.streams}B</span>
          </div>
        ))}
      </div>
    </div>
  )
}
