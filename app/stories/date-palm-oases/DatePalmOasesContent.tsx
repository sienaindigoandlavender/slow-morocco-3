'use client'

import { useState, useEffect, useRef } from 'react'
import { VALLEYS, VARIETIES, THREE_TIERS, THREATS, WATER_SYSTEMS, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#5C7C3E'
const SEVERITY: Record<string, { width: string; color: string }> = {
  'Catastrophic': { width: '100%', color: '#A0452E' },
  'Existential': { width: '90%', color: '#C17F28' },
  'Structural': { width: '75%', color: '#F59E0B' },
  'Generational': { width: '60%', color: '#EAB308' },
}

export function DatePalmOasesContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Map
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
        center: [-5.5, 30.8],
        zoom: 5.8,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        VALLEYS.forEach(v => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;background:${v.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;box-shadow:0 0 8px ${v.color}40;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '300px' })
            .setHTML(`<div style="font-family:IBM Plex Mono,monospace;padding:4px;"><div style="font-size:13px;font-weight:700;color:#f5f5f5;">${v.name} <span style="color:${v.color};font-size:11px;">${v.stat}</span></div><div style="font-size:10px;color:#888;margin-top:4px;line-height:1.5;">${v.detail}</div></div>`)
          const marker = new mapboxgl.Marker({ element: el }).setLngLat([v.lng, v.lat]).setPopup(popup).addTo(map)
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
            {/* Palm frond pattern */}
            {Array.from({ length: 8 }, (_, i) => {
              const cx = 150 + i * 140
              return Array.from({ length: 7 }, (_, j) => {
                const angle = -60 + j * 20
                const rad = (angle * Math.PI) / 180
                return <line key={`${i}-${j}`} x1={cx} y1={200} x2={cx + Math.cos(rad) * 180} y2={200 - Math.sin(rad) * 180} stroke={ACCENT} strokeWidth="0.6" />
              })
            })}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 075 — Ecological &amp; Agricultural Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Date Palm<br />Oases
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[540px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Draa Valley. Ziz Valley. Tafilalet. The three-tier ecosystem
            that feeds the desert — and the disease that nearly destroyed it.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map(s => (
              <div key={s.label}>
                <span className="font-serif italic block tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP — OASIS VALLEYS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Geography</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Four Oasis Regions</h2>
          <p className="text-[13px] max-w-[520px] leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>
            South of the Atlas. Long ribbons of palm groves along desert rivers.
            These were the <span className="underline underline-offset-2">caravan routes</span> to Timbuktu. The oases are measured
            by the number of their palms, not by area.
          </p>
          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '420px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ THREE-TIER ECOLOGY ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Ecology</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Three Tiers</h2>
          <p className="text-[14px] text-dwl-body max-w-[540px] leading-relaxed mb-10">
            The palm is not just a crop. It is the architecture.
            Remove the canopy and the layers below collapse.
          </p>

          <div className="space-y-0">
            {THREE_TIERS.map((t, i) => {
              const isVisible = visibleSections.has(`tier-${i}`)
              const heights = ['h-28', 'h-20', 'h-16']
              const shades = ['#f0fdf4', '#f7fee7', '#fefce8']
              return (
                <div key={t.layer} data-sid={`tier-${i}`} className={`${heights[i]} flex items-center transition-all duration-1000`} style={{
                  background: shades[i],
                  borderTop: i > 0 ? '1px dashed #d4d4d4' : 'none',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : `translateY(${(i + 1) * 8}px)`,
                }}>
                  <div className="px-8 md:px-[8%] lg:px-[12%] flex items-center gap-6 md:gap-10 w-full">
                    <div className="min-w-[180px]">
                      <p className="text-[10px] uppercase tracking-[0.08em]" style={{ color: ACCENT }}>Tier {i + 1}</p>
                      <p className="text-[14px] font-medium text-dwl-black mt-0.5">{t.layer}</p>
                    </div>
                    <p className="text-[12px] text-dwl-body leading-relaxed">{t.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ VARIETIES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Cultivars</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Six Varieties</h2>
          <p className="text-[13px] max-w-[500px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>
            453 cultivars recorded. These six define the landscape.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {VARIETIES.map((v, i) => {
              const isVisible = visibleSections.has(`var-${i}`)
              return (
                <div key={v.name} data-sid={`var-${i}`} className="p-6 md:p-8 transition-all duration-700" style={{
                  background: '#0a0a0a',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-[15px] font-medium" style={{ color: '#ffffff' }}>{v.name}</h3>
                      <p className="text-[12px] font-mono mt-0.5" style={{ color: '#666' }}>{v.arabic}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.06em] px-2 py-0.5 rounded-sm" style={{ background: '#5C7C3E15', color: ACCENT }}>{v.quality}</span>
                  </div>
                  <p className="text-[12px] leading-relaxed mt-3" style={{ color: 'rgba(255,255,255,0.45)' }}>{v.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: ACCENT }}>
        <div className="max-w-[640px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)', color: '#ffffff' }}>
            The Bayoud did not just kill trees. It destroyed
            the three-tier ecology — collapsing the food system
            and driving rural exodus.
          </p>
        </div>
      </section>

      {/* ═══ THREATS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — The Threats</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-10">Four Pressures</h2>

          <div className="space-y-0">
            {THREATS.map((t, i) => {
              const isVisible = visibleSections.has(`threat-${i}`)
              const sev = SEVERITY[t.severity]
              return (
                <div key={t.name} data-sid={`threat-${i}`} className="py-6 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-[16px] font-medium text-dwl-black">{t.name}</h3>
                    <span className="text-[10px] uppercase tracking-[0.06em] font-medium" style={{ color: sev.color }}>{t.severity}</span>
                  </div>
                  {/* Severity bar */}
                  <div className="h-1 rounded-full mb-3" style={{ background: '#f0f0f0' }}>
                    <div className="h-full rounded-full transition-all duration-1500" style={{
                      background: sev.color,
                      width: isVisible ? sev.width : '0%',
                      transitionDelay: '0.3s',
                    }} />
                  </div>
                  <p className="text-[12px] text-dwl-body leading-relaxed">{t.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ WATER SYSTEMS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — The Water</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Four Systems</h2>
          <p className="text-[13px] max-w-[520px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>
            The oasis exists because of water. How it arrives determines
            everything — who farms, who eats, who stays.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {WATER_SYSTEMS.map((w, i) => {
              const isVisible = visibleSections.has(`water-${i}`)
              return (
                <div key={w.name} data-sid={`water-${i}`} className="p-6 md:p-8 transition-all duration-700" style={{
                  background: '#0a0a0a',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <h3 className="text-[15px] font-medium" style={{ color: '#ffffff' }}>{w.name}</h3>
                  <p className="text-[12px] font-mono mt-0.5" style={{ color: '#666' }}>{w.arabic}</p>
                  <p className="text-[12px] leading-relaxed mt-3" style={{ color: 'rgba(255,255,255,0.45)' }}>{w.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">006 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {KEY_NUMBERS.map(n => (
              <div key={n.unit} className="p-6 md:p-8 bg-white">
                <p className="font-serif italic text-[32px] md:text-[44px] leading-none" style={{ color: ACCENT }}>{n.value}</p>
                <p className="text-[12px] mt-2 font-medium text-dwl-black">{n.unit}</p>
                <p className="text-[11px] mt-1 text-dwl-gray">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">007 — Sources</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Further Reading</h2>
          <p className="text-[14px] text-dwl-body max-w-[480px] leading-relaxed mb-10">
            Six works. Agronomy, ecology, hydrology, pathology.
          </p>
          <div className="space-y-0">
            {BIBLIOGRAPHY.map((b, i) => {
              const isVisible = visibleSections.has(`bib-${i}`)
              return (
                <div key={i} data-sid={`bib-${i}`} className="py-5 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(4px)',
                }}>
                  <p className="text-[14px] text-dwl-black">
                    <span className="font-medium">{b.author}</span>
                    <span className="font-serif italic ml-2">{b.title}</span>
                    <span className="text-[12px] ml-2" style={{ color: '#999' }}>({b.year})</span>
                  </p>
                  <p className="text-[12px] text-dwl-body mt-1">{b.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {[
              'ResearchGate — Sedra (2015): 453 cultivars, 52% varieties / 48% khalts, Tafilalet varietal profile (Boufeggous, Mejhoul, Bouslikhène, Najda), three oasis regions (Draa, Tafilalet/Ziz, Tata-Bani) = 90% of national grove, 59,000 ha',
              'Meer.com: 4.8 million date palms, 50,000 ha, 117,000 tonnes/year, Draa-Tafilalet 77%, ranked 7th worldwide, 60% of agricultural income for 1 million inhabitants, khalts predominance, biochar/briquettes/feed by-products',
              'ResearchGate — Sustainable Oases Agriculture: Draa-Tafilalet 5.5M palms (80% of national), 90% of national production, climate change vulnerability survey (120 farmers), water scarcity as limiting factor',
              'Frontiers in Microbiology / PMC: Bayoud (Fusarium oxysporum f. sp. albedinis) — 10–12M trees destroyed in Morocco, 3M in Algeria, first reported 1870 Draa Valley, EU quarantine pathogen, single clonal origin, Mejhoul/Boufeggous highly susceptible, only 6 resistant cultivars (poor fruit)',
              'Nature Middle East: Najda cultivar — 40 years to develop at INRA regional centre Marrakech, Bayoud-resistant + high-quality fruit, FAO confirms 12M palms destroyed in Morocco + 3M Algeria',
              'Euronews: Khettara irrigation, Green Morocco plan, drip irrigation introduction, Maghreb Palm Laboratory 100,000 tissue-culture plants/year (Mejhoul, Boufeggous, Najda)',
              'Rough Guides: Draa/Dadès/Ziz/Todra valleys, oases measured by number of palms not area, khettara underground channels, seguia communal rotation, 220+ date varieties at Zagora souk, Boufeggous stores 4 years, caravan routes to Timbuktu',
              'EFSA (European Food Safety Authority): Bayoud spread via irrigation water/wind/root contact/infected offshoots on caravan routes, Draa→Saoura valley river transmission, quarantine A2 pathogen',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: ACCENT }}>Sources: FAO, Ministry of Agriculture Morocco</p>
          </div>
        </div>
      </section>
    </div>
  )
}
