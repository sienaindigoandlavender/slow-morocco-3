'use client'

import { useState, useEffect, useRef } from 'react'
import { NOOR_PHASES, SOLAR_PROJECTS, IRRADIANCE_ZONES, TIMELINE, ENERGY_MIX, HERO_STATS, KEY_NUMBERS } from './data'

type TimelineFilter = 'all' | 'policy' | 'project' | 'milestone'

export function SolarAtlasContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [tlFilter, setTlFilter] = useState<TimelineFilter>('all')
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return
    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      // @ts-ignore
      await import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-5.5, 31.5],
        zoom: 5.2,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        const statusColors: Record<string, string> = {
          'Operational': '#F59E0B',
          'Under construction': '#A0452E',
          'Planned': '#2D5F8A',
          'Tendering': '#7B506F',
        }
        SOLAR_PROJECTS.forEach(p => {
          const color = statusColors[p.status] || '#888'
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;background:${color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;`
          const popup = new mapboxgl.Popup({ offset: 12, maxWidth: '280px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:14px;font-weight:700;color:#f5f5f5;">${p.name}</div>
                <div style="font-size:11px;color:${color};margin-top:2px;">${p.capacity} · ${p.status}</div>
                <div style="font-size:11px;color:#aaa;margin-top:2px;">${p.technology}</div>
                <div style="font-size:11px;color:#888;margin-top:4px;">${p.detail}</div>
              </div>
            `)
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([p.lng, p.lat])
            .setPopup(popup)
            .addTo(map)
          markersRef.current.push(marker)
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  const filteredTimeline = tlFilter === 'all' ? TIMELINE : TIMELINE.filter(t => t.type === tlFilter)
  const typeColors: Record<string, string> = { policy: '#2D5F8A', project: '#F59E0B', milestone: '#5C7C3E' }

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.05]" preserveAspectRatio="xMidYMid slice">
            {/* Radiating solar lines */}
            {Array.from({ length: 36 }, (_, i) => {
              const angle = (i * 10) * (Math.PI / 180)
              return <line key={i} x1="600" y1="400" x2={600 + 500 * Math.cos(angle)} y2={400 + 500 * Math.sin(angle)} stroke="#F59E0B" strokeWidth="0.3" />
            })}
            <circle cx="600" cy="400" r="40" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#F59E0B', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 063 — Energy Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Morocco&rsquo;s<br />Solar Atlas
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            A country that imports 90% of its energy is building the world&rsquo;s
            largest concentrated solar power complex. Noor Ouarzazate alone
            powers a million homes. The target: 52% renewable by 2030.
            This is the infrastructure of ambition.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F59E0B', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NOOR COMPLEX ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Noor Ouarzazate Complex</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Four Phases, One Desert</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">580 MW across 3,000+ hectares. Three CSP technologies and one PV plant. Near the ancient fortress of Ait-Ben-Haddou, where Lawrence of Arabia and Game of Thrones were filmed.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#e5e5e5' }}>
            {NOOR_PHASES.map((p, i) => {
              const isVisible = visibleSections.has(`noor-${i}`)
              return (
                <div key={p.name} data-sid={`noor-${i}`} className="bg-white p-6 md:p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                    <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: p.color }}>{p.technology}</span>
                  </div>
                  <h3 className="font-serif text-[28px] italic text-dwl-black leading-tight">{p.name}</h3>
                  <p className="font-serif italic text-[20px] mt-1" style={{ color: p.color }}>{p.capacity}</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-[12px] text-dwl-muted"><span className="text-dwl-gray">Area:</span> {p.area}</p>
                    <p className="text-[12px] text-dwl-muted"><span className="text-dwl-gray">Storage:</span> {p.storage}</p>
                    <p className="text-[12px] text-dwl-muted"><span className="text-dwl-gray">Commissioned:</span> {p.commissioned}</p>
                  </div>
                  <p className="text-[13px] text-dwl-body leading-relaxed mt-3">{p.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#F59E0B' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#ffffff' }}>
            Morocco showed all other countries that
            it&rsquo;s possible, whatever your position in
            the world, to succeed.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(0,0,0,0.6)' }}>— Youssef Stitou, MASEN Project Engineer</p>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>002 — Solar Projects Map</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>MASEN&rsquo;s Solar Network</h2>
          <p className="text-[14px] mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>Click markers for project details.</p>

          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { color: '#F59E0B', label: 'Operational' },
              { color: '#A0452E', label: 'Under construction' },
              { color: '#2D5F8A', label: 'Planned' },
              { color: '#7B506F', label: 'Tendering' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                <span className="text-[11px]" style={{ color: '#aaa' }}>{l.label}</span>
              </div>
            ))}
          </div>

          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '480px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ IRRADIANCE ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — Solar Irradiance by Region</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Where the Sun Hits Hardest</h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
                  {['Region', 'GHI', 'DNI', 'Sunshine', 'Note'].map(h => (
                    <th key={h} className="text-left py-3 pr-4 text-[10px] uppercase tracking-[0.08em] text-dwl-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {IRRADIANCE_ZONES.map((z, i) => {
                  const isVisible = visibleSections.has(`irr-${i}`)
                  return (
                    <tr key={z.region} data-sid={`irr-${i}`} className="transition-all duration-500" style={{ borderBottom: '1px solid #f0f0f0', opacity: isVisible ? 1 : 0 }}>
                      <td className="py-3 pr-4 text-[13px] font-medium text-dwl-black">{z.region}</td>
                      <td className="py-3 pr-4 font-mono text-[12px]" style={{ color: '#F59E0B' }}>{z.ghi}</td>
                      <td className="py-3 pr-4 font-mono text-[12px]" style={{ color: '#A0452E' }}>{z.dni}</td>
                      <td className="py-3 pr-4 text-[12px] text-dwl-muted">{z.sunshineHours}</td>
                      <td className="py-3 text-[11px] text-dwl-muted">{z.note}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ ENERGY MIX ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#A0452E' }}>004 — The Electricity Mix</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>What Powers Morocco Today</h2>
          <p className="text-[14px] max-w-[560px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>Coal still dominates. But the trajectory is clear.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {ENERGY_MIX.map((e) => {
              const trendColor = e.trend.includes('Growing') ? '#5C7C3E' : e.trend.includes('Declining') ? '#A0452E' : '#888'
              return (
                <div key={e.source} className="p-6" style={{ background: '#0f0f0f' }}>
                  <p className="font-serif italic text-[28px] leading-none" style={{ color: '#f5f5f5' }}>{e.share}</p>
                  <p className="text-[13px] font-medium mt-1" style={{ color: '#f5f5f5' }}>{e.source}</p>
                  <p className="text-[11px] mt-1" style={{ color: trendColor }}>{e.trend}</p>
                  <p className="text-[11px] mt-1" style={{ color: '#666' }}>{e.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — Timeline</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-8">From Strategy to Megawatts</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { key: 'all' as TimelineFilter, label: 'All' },
              { key: 'policy' as TimelineFilter, label: 'Policy' },
              { key: 'project' as TimelineFilter, label: 'Project' },
              { key: 'milestone' as TimelineFilter, label: 'Milestone' },
            ].map(f => (
              <button key={f.key} onClick={() => setTlFilter(f.key)}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.06em] rounded-full border transition-all"
                style={{
                  borderColor: tlFilter === f.key ? (typeColors[f.key] || '#888') : '#ddd',
                  color: tlFilter === f.key ? (typeColors[f.key] || '#333') : '#999',
                  background: tlFilter === f.key ? `${typeColors[f.key] || '#888'}10` : 'transparent',
                }}
              >{f.label}</button>
            ))}
          </div>

          <div className="space-y-0">
            {filteredTimeline.map((t, i) => (
              <div key={`${t.year}-${i}`} className="flex gap-4 md:gap-6 py-3" style={{ borderTop: '1px solid #f0f0f0' }}>
                <div className="flex items-start gap-2 flex-shrink-0 w-[70px]">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: typeColors[t.type] }} />
                  <span className="font-mono text-[13px] font-bold text-dwl-black">{t.year}</span>
                </div>
                <p className="text-[13px] text-dwl-body leading-relaxed">{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE — XLINKS ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#2D5F8A' }}>
            The same PV panels generate approximately
            three times more power in Morocco than in the UK,
            and five times more from January to March.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Xlinks testimony to UK Parliament</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">006 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {KEY_NUMBERS.map((n) => (
              <div key={n.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[32px] md:text-[44px] text-dwl-black leading-none">{n.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{n.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {[
              'Wikipedia — Ouarzazate Solar Power Station: Noor I–IV specs, 580 MW total, ACWA Power, molten salt storage',
              'Wikipedia — Solar Power in Morocco: MASEN, 2,000 MW target, Spain-Morocco interconnection 900 MW',
              'Wikipedia — Xlinks Morocco–UK Power Project: 11.5 GW, 4,000 km HVDC, UK rejection June 2025',
              'MASEN / Energy Partnership Morocco-Germany: Noor III restart, 4,680 MW renewable operational, KfW €830M',
              'Morocco World News: NOOR success story, 1.1M people powered, 690,000t CO₂ offset, Africa context',
              'Morocco World News: SolarPower Europe report, GHI 2,264 kWh/m²/yr, 831 MW solar installed, 52% target',
              'MDPI — Solar Energy Resource Morocco: DNI 2,200–2,500+ kWh/m²/yr, 9th global, Noor Midelt hybrid, IRENA data',
              'ResearchGate — Renewable Energy Potential Morocco: irradiance maps, wind 25 GW potential, 5.5 kWh/m²/day zones',
              'CIF — Ouarzazate: 3,500 soccer fields, 2M mirrors, CSP thermal storage technology explainer',
              'UK Parliament — Xlinks written evidence: 3× more power than UK, 34% solar load factor, 20% better GHI than Spain',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#F59E0B' }}>Sources: MASEN, IRENA, World Bank</p>
          </div>
        </div>
      </section>
    </div>
  )
}
