'use client'

import { useState, useEffect, useRef } from 'react'
import { TIMELINE, PRODUCTION_STATS, GEOGRAPHY, LEGALIZATION, VOCABULARY, HERO_STATS, ERA_COLORS , MAP_POINTS } from './data'

type Era = 'all' | 'pre-colonial' | 'colonial' | 'prohibition' | 'legalization'


const MAPBOX_TK_C = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function RifMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TK_C || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TK_C!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-4.5, 35], zoom: 7.5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        MAP_POINTS.forEach((p: typeof MAP_POINTS[0]) => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => { map.flyTo({ center: [p.lng, p.lat], zoom: 8, duration: 1200 }) })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '220px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])
  return <div ref={mapContainer} className="w-full" style={{ height: '480px', background: '#0a0a0a' }} />
}

export function CannabisRifContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [era, setEra] = useState<Era>('all')

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const filteredTimeline = era === 'all' ? TIMELINE : TIMELINE.filter(t => t.era === era)
  const eras: { key: Era; label: string; color: string }[] = [
    { key: 'all', label: 'All Eras', color: '#888' },
    { key: 'pre-colonial', label: 'Pre-Colonial', color: ERA_COLORS['pre-colonial'] },
    { key: 'colonial', label: 'Colonial', color: ERA_COLORS['colonial'] },
    { key: 'prohibition', label: 'Prohibition', color: ERA_COLORS['prohibition'] },
    { key: 'legalization', label: 'Legalization', color: ERA_COLORS['legalization'] },
  ]

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Mountain ridgeline */}
            <path d="M0 600 L100 480 L200 520 L300 400 L400 450 L500 350 L600 420 L700 380 L800 440 L900 360 L1000 430 L1100 470 L1200 500 L1200 800 L0 800 Z" fill="none" stroke="#5C7C3E" strokeWidth="0.4" />
            <path d="M0 650 L150 530 L300 570 L450 460 L600 510 L750 430 L900 490 L1050 520 L1200 550 L1200 800 L0 800 Z" fill="none" stroke="#5C7C3E" strokeWidth="0.2" />
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#5C7C3E', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 054 — Economic Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Cannabis<br />&amp; the Rif
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            The Rif Mountains produce most of Europe&rsquo;s hashish. Over 400,000 people
            depend on the trade. In 2021, Morocco became the first major hashish-producing
            country to legalize — partially. This is the story of a crop that is simultaneously
            illegal, tolerated, pardoned, and exported.
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

      {/* ═══ PRODUCTION STATS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Scale of the Trade</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {PRODUCTION_STATS.map((s, i) => {
              const isVisible = visibleSections.has(`stat-${i}`)
              return (
                <div key={s.metric} data-sid={`stat-${i}`} className="bg-white p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <p className="font-serif italic text-[36px] leading-none" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[13px] font-medium text-dwl-black mt-2">{s.metric}</p>
                  <p className="text-[12px] text-dwl-muted mt-1">{s.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>The Rif — Growing Zones</p>
        <RifMap />
      </div></section>

{/* ═══ QUOTE 1 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#5C7C3E' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4.5vw, 2.8rem)', color: '#ffffff' }}>
            &ldquo;Local farmers have tried cultivating wheat, nuts, apples, and other crops,
            but none have yielded viable results.&rdquo;
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(0,0,0,0.6)' }}>— Abdelsalam Amraji, Rif cannabis farmer, AP (2025)</p>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#D4A373' }}>002 — Five Centuries</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>From Sultans to Law 13-21</h2>
          <p className="text-[16px] max-w-[560px] leading-relaxed mb-8" style={{ color: 'rgba(0,0,0,0.4)' }}>Cannabis in Morocco has been legal, monopolized, banned, tolerated, pardoned, and legalized again — sometimes within the same decade.</p>

          <div className="flex flex-wrap gap-2 mb-10">
            {eras.map(e => (
              <button key={e.key}
                onClick={() => setEra(e.key)}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.06em] rounded-full border transition-all"
                style={{
                  borderColor: era === e.key ? e.color : '#333',
                  color: era === e.key ? e.color : '#666',
                  background: era === e.key ? `${e.color}12` : 'transparent',
                }}
              >{e.label}</button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-[20px] md:left-[40px] top-0 bottom-0 w-px" style={{ background: '#1a1a1a' }} />
            {filteredTimeline.map((t, i) => {
              const color = ERA_COLORS[t.era]
              const isVisible = visibleSections.has(`time-${t.year}`)
              return (
                <div key={t.year} data-sid={`time-${t.year}`} className="relative pl-12 md:pl-20 pb-10 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="absolute left-[16px] md:left-[36px] top-1 w-2 h-2 rounded-full" style={{ background: color }} />
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-serif italic text-[22px]" style={{ color, lineHeight: 1 }}>{t.year}</p>
                    <span className="text-[9px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>{t.era.replace('-', ' ')}</span>
                  </div>
                  <p className="font-serif text-[17px] italic mt-2 mb-1" style={{ color: '#f5f5f5' }}>{t.event}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#888' }}>{t.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ GEOGRAPHY ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — The Geography</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Why the Rif</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">Poor soil, harsh climate, remote mountains, and 14 km of water between Morocco and Spain. The geography explains everything.</p>

          <div className="space-y-0">
            {GEOGRAPHY.map((g, i) => {
              const isVisible = visibleSections.has(`geo-${i}`)
              return (
                <div key={g.id} data-sid={`geo-${i}`} className="py-7 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-3">
                      <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums text-dwl-muted">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-serif text-[22px] italic text-dwl-black mt-1">{g.title}</h3>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-[14px] text-dwl-body leading-relaxed">{g.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>The Rif — Growing Zones</p>
        <RifMap />
      </div></section>

{/* ═══ QUOTE 2 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#D4A373' }}>
            The government is between two fires.
            The fire of poor people who want to make a living
            and the fire of Europe, which wants Morocco
            to put an end to the trade.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Mohamed Chtatou, International University of Rabat</p>
        </div>
      </section>

      {/* ═══ LEGALIZATION ANALYSIS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>004 — Law 13-21</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>The Legalization Paradox</h2>
          <p className="text-[16px] max-w-[560px] leading-relaxed mb-12" style={{ color: 'rgba(0,0,0,0.4)' }}>Morocco was the first major hashish producer to legalize — partially. The gap between the legal framework and the reality on the ground is enormous.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {LEGALIZATION.map((l, i) => {
              const isVisible = visibleSections.has(`legal-${i}`)
              return (
                <div key={l.title} data-sid={`legal-${i}`} className="p-8 transition-all duration-700" style={{ background: '#0f0f0f', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="w-3 h-3 rounded-full mb-3" style={{ background: l.color }} />
                  <h3 className="font-serif text-[18px] italic mb-3" style={{ color: '#f5f5f5' }}>{l.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#aaa' }}>{l.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ VOCABULARY ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — The Vocabulary</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Five Words</h2>

          <div className="space-y-0">
            {VOCABULARY.map((v, i) => {
              const isVisible = visibleSections.has(`vocab-${i}`)
              return (
                <div key={v.term} data-sid={`vocab-${i}`} className="py-6 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10">
                    <div className="md:col-span-3">
                      <h3 className="font-serif text-[22px] italic text-dwl-black">{v.term}</h3>
                      <p className="text-[14px] text-dwl-muted">{v.termAr}</p>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-[14px] text-dwl-body leading-relaxed">{v.meaning}</p>
                    </div>
                  </div>
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
              'Wikipedia — Cannabis in Morocco: history, Sultan Hassan I, production stats, Law 13-21, exports',
              'Global Initiative Against Transnational Organized Crime (2025): ANRAC data, 3,300 authorizations, 2,700 ha legal',
              'Associated Press (Dec 2025): Rif farmer interviews, Mohamed Makhlouf, ANRAC director quotes',
              'Journal of Illicit Economies & Development / LSE (2025): Sultan\'s letter to ulemas, Régie monopoly, kif history',
              'Morocco World News (June 2025): Economic impact of legalization, first legal export to Switzerland',
              'UNODC — Morocco Cannabis Surveys (2003–2013): 134,000 ha peak, 96,000 families, satellite imagery',
              'TNI Drug Policy Briefing 49 (2017): Tom Blickman, tribal privileges, colonial-era regulation',
              'PMC / Frontiers in Cannabis Research (2022): Rif cultivation history, Beldia variety, hybrid replacement',
              'ScienceDirect (2025): THC thresholds, CBD yields, Moroccan export strategy, international market positioning',
              'AGBI (2024): 70% Europe supply, Spain seizures, poverty in Rif, $4–11B European dealer revenue',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#5C7C3E' }}>Sources: UNODC, EMCDDA</p>
          </div>
        </div>
      </section>
    </div>
  )
}
