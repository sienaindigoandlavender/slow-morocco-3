'use client'

import { useState, useEffect, useRef } from 'react'
import { PROCESS_STEPS, DYES, THREE_TANNERIES, HISTORY, PRODUCTS, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#D97706'
const THREAD_COLORS: Record<string, string> = {
  founding: '#F59E0B',
  trade: '#2D5F8A',
  craft: '#5C7C3E',
  modern: '#A0452E',
}

export function TanneriesContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [activeThread, setActiveThread] = useState<string | null>(null)

  // Scroll observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Process step auto-advance
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => (prev + 1) % PROCESS_STEPS.length)
    }, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPaused])

  const handleStepClick = (i: number) => {
    setActiveStep(i)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 8000)
  }

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
        center: [-4.978, 34.064],
        zoom: 14.2,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        THREE_TANNERIES.forEach(t => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;background:${ACCENT};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;box-shadow:0 0 8px ${ACCENT}40;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '300px' })
            .setHTML(`<div style="font-family:IBM Plex Mono,monospace;padding:4px;"><div style="font-size:13px;font-weight:700;color:#f5f5f5;">${t.name} <span style="color:${ACCENT};font-size:11px;">${t.specialty}</span></div><div style="font-size:10px;color:#888;margin-top:4px;line-height:1.5;">${t.detail}</div><div style="font-size:9px;color:#666;margin-top:4px;">${t.status}</div></div>`)
          const marker = new mapboxgl.Marker({ element: el }).setLngLat([t.lng, t.lat]).setPopup(popup).addTo(map)
          markersRef.current.push(marker)
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        {/* Honeycomb vat pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 12 }, (_, row) =>
              Array.from({ length: 16 }, (_, col) => {
                const x = col * 75 + (row % 2 ? 37.5 : 0)
                const y = row * 65
                return <circle key={`${row}-${col}`} cx={x} cy={y} r="28" fill="none" stroke={ACCENT} strokeWidth="0.5" />
              })
            )}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 076 — Craft &amp; Industrial Heritage
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The<br />Tanneries
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[540px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            <span>Fez</span>. Chouara. 1,200 stone basins. Pigeon dung, quicklime,
            poppy, indigo. No machinery. No shortcuts. The same hands,
            the same method, for nine hundred years.
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

      {/* ═══ THE PROCESS — AUTO-ADVANCING CYCLE ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Process</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Six Steps. Thirty Days.</h2>
          <p className="text-[13px] max-w-[520px] leading-relaxed mb-8" style={{ color: 'rgba(0,0,0,0.4)' }}>
            Every hide passes through the same sequence. Click any step to hold.
          </p>

          {/* Step tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {PROCESS_STEPS.map((s, i) => (
              <button key={s.name} onClick={() => handleStepClick(i)} className="text-[11px] uppercase tracking-[0.06em] px-3 py-1.5 rounded-sm transition-all duration-300" style={{
                background: i === activeStep ? ACCENT : 'rgba(255,255,255,0.05)',
                color: i === activeStep ? '#0a0a0a' : 'rgba(255,255,255,0.7)',
                fontWeight: i === activeStep ? 600 : 400,
              }}>
                {s.name}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-0.5 rounded-full mb-8" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full" style={{
              background: ACCENT,
              width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%`,
              transition: 'width 0.6s ease',
            }} />
          </div>

          {/* Active step */}
          <div className="min-h-[140px]">
            <div className="flex items-start gap-4">
              <span className="font-serif italic text-[48px] md:text-[64px] leading-none" style={{ color: ACCENT }}>{String(activeStep + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-[20px] md:text-[24px] font-medium" style={{ color: '#ffffff' }}>{PROCESS_STEPS[activeStep].name}</h3>
                <p className="text-[11px] uppercase tracking-[0.08em] mt-1" style={{ color: 'rgba(0,0,0,0.3)' }}>{PROCESS_STEPS[activeStep].duration}</p>
                <p className="text-[13px] leading-relaxed mt-3 max-w-[600px]" style={{ color: 'rgba(0,0,0,0.5)' }}>{PROCESS_STEPS[activeStep].detail}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE PALETTE — DYE SWATCHES ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Palette</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Seven Natural Dyes</h2>
          <p className="text-[14px] text-dwl-body max-w-[540px] leading-relaxed mb-10">
            No synthetic pigments. Every colour comes from a plant, a flower,
            or a bark. The palette has not changed.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {DYES.map((d, i) => {
              const isVisible = visibleSections.has(`dye-${i}`)
              return (
                <div key={d.color} data-sid={`dye-${i}`} className="group transition-all duration-700 cursor-default" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                  transitionDelay: `${i * 0.08}s`,
                }}>
                  <div className="aspect-square rounded-sm mb-3 transition-transform duration-300 group-hover:scale-[1.04]" style={{ background: d.hex }} />
                  <p className="text-[13px] font-medium text-dwl-black">{d.color}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: ACCENT }}>{d.source}</p>
                  <p className="text-[11px] text-dwl-gray mt-1 leading-relaxed">{d.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#111' }}>
        <div className="max-w-[640px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)', color: '#ffffff' }}>
            The men stand thigh-deep in colour, agitating the hides
            by hand. Human washing machines. The work never stops.
          </p>
          <p className="text-[11px] uppercase tracking-[0.12em] mt-6" style={{ color: 'rgba(0,0,0,0.3)' }}>200 men work at Chouara. Some began as apprentices at 13.</p>
        </div>
      </section>

      {/* ═══ MAP — THREE TANNERIES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Three Survivors</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>86 Became 3</h2>
          <p className="text-[13px] max-w-[520px] leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>
            The <span>Almohads</span> counted 86 tanning workshops. The Marinids counted 100.
            Today three survive, operating as cooperatives.
          </p>
          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '380px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ HISTORY TIMELINE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — The Timeline</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Nine Centuries</h2>

          {/* Thread filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button onClick={() => setActiveThread(null)} className="text-[10px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-sm transition-all" style={{
              background: !activeThread ? '#0a0a0a' : '#f5f5f5',
              color: !activeThread ? '#ffffff' : '#666',
            }}>All</button>
            {Object.entries({ founding: 'Founding', trade: 'Trade', craft: 'Craft', modern: 'Modern' }).map(([key, label]) => (
              <button key={key} onClick={() => setActiveThread(activeThread === key ? null : key)} className="text-[10px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-sm transition-all" style={{
                background: activeThread === key ? THREAD_COLORS[key] : '#f5f5f5',
                color: activeThread === key ? '#ffffff' : '#666',
              }}>{label}</button>
            ))}
          </div>

          <div className="space-y-0">
            {filteredHistory.map((h, i) => (
              <div key={i} className="py-5 flex items-start gap-4 md:gap-6" style={{ borderTop: '1px solid #e5e5e5' }}>
                <div className="min-w-[80px]">
                  <span className="text-[14px] font-medium tabular-nums text-dwl-black">{h.year}</span>
                </div>
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: THREAD_COLORS[h.thread] }} />
                  <p className="text-[12px] text-dwl-body leading-relaxed">{h.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — What the Leather Becomes</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-10" style={{ color: '#ffffff' }}>Six Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {PRODUCTS.map((p, i) => {
              const isVisible = visibleSections.has(`prod-${i}`)
              return (
                <div key={p.name} data-sid={`prod-${i}`} className="p-6 md:p-8 transition-all duration-700" style={{
                  background: '#0a0a0a',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <h3 className="text-[15px] font-medium" style={{ color: '#ffffff' }}>{p.name}</h3>
                  <p className="text-[12px] font-mono mt-0.5" style={{ color: '#666' }}>{p.arabic}</p>
                  <p className="text-[12px] leading-relaxed mt-3" style={{ color: 'rgba(255,255,255,0.45)' }}>{p.detail}</p>
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
            Six works. History, ethnography, architecture, environmental remediation.
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
              'Wikipedia — Chouara Tannery: founded 9th C (local tradition) / 11th C (historical record), Fes el Bali near Saffarin Madrasa, three tanneries (Chouara, Sidi Moussa, Ain Azliten), al-Jazna\'i 86 workshops Almohad era, ~100 Marinid era, Ain Azliten 18th C, chromium since 19th C, Aziza Chaouni rehabilitation project, dyes: poppy red / indigo blue / henna orange, leather exported to Baghdad',
              'Morocco World News: 500 master craftsmen, 1,200 basins at Chouara, 30,000 artisans in medina of 90,000 inhabitants, process lasts ~30 days, three-step process (lime + pigeon dung + dye), restoration programme + "real leather" quality mark',
              'Feel Morocco: Dar Dbagh al-Chouara = "the tanning house," three tanneries now cooperatives, 300+ families employed, medieval auction system preserved, international brand sourcing',
              'Living on Earth (NPR): 200 men at Chouara, apprentices from age 13, $1,200–$1,800/day per leather shop in summer, dyes refreshed every 25 days, chromium contamination of Fez River, workers report skin cancer',
              'Moroccan Interior: 12th–13th C leather exported to Baghdad, chromium contamination soil + river, workers face skin/respiratory illness, dyes: poppy/paprika red, saffron/turmeric/pomegranate yellow, henna orange, indigo blue, mint green, pomegranate rinds for golden babouche',
              'Aziza Chaouni / TED 2014 / Holcim Foundation: Fez River rehabilitation since 2009, chromium-III deposits beneath tannery, proposal to relocate Chouara, tanneries restored in place, Harvard GSD + University of Toronto',
              'Strong Sense of Place: Morocco leather = goatskin, visible grain, superior dye absorption, 7th C Islamic bookbinding culture, Shakespeare-era European luxury, babouche from pomegranate rinds, cedarwood for brown',
              'Ancient Origins: Three-hour foot-kneading in pigeon dung vats, hides can be jumped on in dye vats, 2015–2016 façade restoration',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: ACCENT }}>Sources: Historical records, UNESCO</p>
          </div>
        </div>
      </section>
    </div>
  )
}
