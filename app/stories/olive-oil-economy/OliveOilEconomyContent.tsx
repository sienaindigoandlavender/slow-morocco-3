'use client'

import { useState, useEffect, useRef } from 'react'
import { REGIONS, VARIETIES, PRODUCTION_DATA, EXPORT_MARKETS, HERO_STATS, KEY_NUMBERS } from './data'

export function OliveOilEconomyContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
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
        center: [-6.0, 32.5],
        zoom: 5.2,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        REGIONS.forEach(r => {
          const el = document.createElement('div')
          const size = r.id === 'fes-meknes' ? 22 : r.id === 'marrakech-safi' ? 20 : r.id === 'beni-mellal' ? 18 : 14
          el.style.cssText = `width:${size}px;height:${size}px;background:${r.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;opacity:0.9;`
          const popup = new mapboxgl.Popup({ offset: 12, maxWidth: '300px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:14px;font-weight:700;color:#f5f5f5;">${r.name}</div>
                <div style="font-size:11px;color:${r.color};margin-top:2px;">${r.hectares}</div>
                <div style="font-size:11px;color:#aaa;margin-top:4px;">${r.profile}</div>
                <div style="font-size:10px;color:#666;margin-top:4px;">${r.detail.slice(0, 140)}…</div>
              </div>
            `)
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([r.lng, r.lat])
            .setPopup(popup)
            .addTo(map)
          markersRef.current.push(marker)
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Olive branch / leaf pattern */}
            {Array.from({ length: 20 }, (_, i) => {
              const cx = 100 + (i % 5) * 250
              const cy = 150 + Math.floor(i / 5) * 160
              return (
                <g key={i}>
                  <ellipse cx={cx} cy={cy} rx="18" ry="8" fill="none" stroke="#5C7C3E" strokeWidth="0.4" transform={`rotate(${30 + i * 15}, ${cx}, ${cy})`} />
                  <ellipse cx={cx + 25} cy={cy - 10} rx="18" ry="8" fill="none" stroke="#5C7C3E" strokeWidth="0.4" transform={`rotate(${-20 + i * 12}, ${cx + 25}, ${cy - 10})`} />
                  <line x1={cx - 30} y1={cy + 15} x2={cx + 40} y2={cy - 20} stroke="#5C7C3E" strokeWidth="0.3" />
                </g>
              )
            })}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#5C7C3E', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 067 — Agricultural &amp; Trade Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Olive Oil<br />Economy
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            1.2 million hectares. Half a million families. One dominant cultivar.
            From <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Phoenician</span> roots to US tariff advantage — Morocco&rsquo;s green gold
            mapped across six regions, four varieties, and the
            arithmetic of drought and recovery.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#5C7C3E', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>001 — The Olive Belt</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Six Producing Regions</h2>
          <p className="text-[13px] max-w-[600px] leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>
            Marker size reflects relative production volume. Click to explore each region&rsquo;s terroir, mill infrastructure, and flavour profile.
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            {REGIONS.map(r => (
              <div key={r.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                <span className="text-[11px]" style={{ color: '#aaa' }}>{r.name}</span>
              </div>
            ))}
          </div>

          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '480px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ REGIONS DETAIL ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — Terroir</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Every Region, a Different Oil</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {REGIONS.map((r, i) => {
              const isVisible = visibleSections.has(`reg-${i}`)
              return (
                <div key={r.id} data-sid={`reg-${i}`} className="bg-white p-6 md:p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                    <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: r.color }}>{r.hectares}</span>
                  </div>
                  <h3 className="font-serif text-[20px] italic text-dwl-black leading-tight mb-1">{r.name}</h3>
                  <p className="text-[12px] font-medium mb-3" style={{ color: '#999' }}>{r.profile}</p>
                  <p className="text-[12px] text-dwl-body leading-relaxed">{r.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ VARIETIES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>003 — The Cultivars</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>Six Varieties</h2>

          <div className="space-y-0">
            {VARIETIES.map((v, i) => {
              const isVisible = visibleSections.has(`var-${i}`)
              const typeColors: Record<string, string> = { 'Autochthonous': '#5C7C3E', 'INRA Selection': '#F59E0B', 'Imported': '#2D5F8A' }
              return (
                <div key={v.name} data-sid={`var-${i}`} className="py-6 transition-all duration-700" style={{ borderTop: '1px solid #1a1a1a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: typeColors[v.type] }}>{v.type}</span>
                      <h3 className="text-[16px] font-medium mt-1" style={{ color: '#f5f5f5' }}>{v.name}</h3>
                      <p className="text-[11px] mt-1" style={{ color: '#666' }}>Use: {v.use} · Oil content: {v.oilContent}</p>
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: '#999' }}>{v.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#5C7C3E' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#0a0a0a' }}>
            Morocco is poised to swiftly reclaim, and even exceed, its record
            olive oil production levels.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(10,10,10,0.5)' }}>— Ghizlane Tazi, General Manager, Noor Fès (Olive Oil Times, 2025)</p>
        </div>
      </section>

      {/* ═══ PRODUCTION TABLE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Harvest &amp; Yield</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Production Data</h2>
          <p className="text-[13px] text-dwl-muted max-w-[540px] leading-relaxed mb-10">
            Six consecutive drought years collapsed output by 55%. The 2025 recovery — if realised — would represent the largest single-year rebound in Moroccan olive history.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #0a0a0a' }}>
                  {['Season', 'Olive Harvest', 'Oil Output', 'Context'].map(h => (
                    <th key={h} className="text-left py-3 pr-4 text-[10px] uppercase tracking-[0.08em] text-dwl-muted font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRODUCTION_DATA.map((row, i) => {
                  const isVisible = visibleSections.has(`prod-${i}`)
                  const isProjected = row.year === '2025/26'
                  return (
                    <tr key={row.year} data-sid={`prod-${i}`} className="transition-all duration-700" style={{ borderBottom: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(4px)' }}>
                      <td className="py-3 pr-4">
                        <span className="text-[14px] font-medium" style={{ color: isProjected ? '#5C7C3E' : '#0a0a0a' }}>{row.year}</span>
                      </td>
                      <td className="py-3 pr-4 text-[13px] text-dwl-body">{row.harvest}</td>
                      <td className="py-3 pr-4">
                        <span className="text-[13px] font-medium" style={{ color: isProjected ? '#5C7C3E' : '#0a0a0a' }}>{row.oilOutput}</span>
                      </td>
                      <td className="py-3 text-[12px] text-dwl-muted">{row.note}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ EXPORT MARKETS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>005 — Where It Goes</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>Export Markets</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {EXPORT_MARKETS.map((m, i) => {
              const isVisible = visibleSections.has(`exp-${i}`)
              return (
                <div key={m.market} data-sid={`exp-${i}`} className="p-6 md:p-8 transition-all duration-700" style={{ background: '#0a0a0a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-[16px] font-medium" style={{ color: '#f5f5f5' }}>{m.market}</h3>
                    <span className="text-[11px]" style={{ color: '#5C7C3E' }}>{m.share}</span>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: '#888' }}>{m.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 p-5 rounded-sm" style={{ background: '#111', border: '1px solid #1a1a1a' }}>
            <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: '#5C7C3E' }}>US Tariff Advantage (2025)</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { country: 'Morocco', rate: '10%', note: 'Minimum duty' },
                { country: 'Spain / Italy / Portugal', rate: '15%', note: 'EU rate' },
                { country: 'Tunisia', rate: '25%', note: 'Highest' },
                { country: 'Turkey', rate: '15%', note: 'Competing' },
              ].map(t => (
                <div key={t.country}>
                  <p className="text-[22px] font-serif italic" style={{ color: t.country === 'Morocco' ? '#5C7C3E' : '#666' }}>{t.rate}</p>
                  <p className="text-[11px]" style={{ color: '#aaa' }}>{t.country}</p>
                  <p className="text-[10px]" style={{ color: '#555' }}>{t.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#111' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#5C7C3E' }}>
            The interplay of Atlantic Ocean influence, Atlas Mountain elevation,
            and Saharan proximity concentrates flavour compounds in ways gentler
            climates cannot replicate.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Hoji / Olive Oil Times</p>
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
              'Olive Oil Times (Sep 2025): 2M tonne harvest forecast, 200K oil target, Noor Fès quote, expanding plantations',
              'Interprolive / Milling MEA (Sep 2025): Production doubling projection, Zaouia Cooperative report, US tariff advantage',
              'African Agribusiness (Sep 2025): 60K exportable surplus, 140K domestic consumption, Trump tariff rates by country',
              'Ecofin Agency: 3,835 t / $38.4M Morocco-US exports 2024, 1.2% of $3.3B US market',
              'Milling MEA (Nov 2024): 950K harvest, 90K oil, 6-year drought, 30K t import authorisation, VAT exemption',
              'Morocco Gold: 4th/5th global producer, 1.07M ha, 380K jobs, Green Morocco Plan, 80K ha MCA plantings, 150 cooperatives',
              'ScienceDirect / FAOSTAT (2024): 6th global producer, 1,000 new continuous mills, Picholine/Haouzia/Menara phenolic profiles',
              'Hoji / Olive Oil Times: Regional terroir (Fès-Meknès, Béni Mellal, Rif, Souss-Massa), PDO Tyout-Chiadma, Cooperative Al Amal NYIOOC Silver',
              'International Olive Council (IOC): Volubilis Roman presses, Moroccan nuba classification, Al-Haik variety collections from 1927',
              'Yac Shop (2024): Prices reached 130 MAD/litre, Brazil 10K t import, Haouzia/Menara varieties, 12–24 litres per quintal yield range',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#5C7C3E' }}>Sources: IOC, FAO, Ministry of Agriculture Morocco</p>
          </div>
        </div>
      </section>
    </div>
  )
}
