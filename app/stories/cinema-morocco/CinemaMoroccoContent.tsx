'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { STUDIOS, FILMING_LOCATIONS, PRODUCTIONS, GOT_LOCATIONS, INCENTIVES, HERO_STATS, KEY_NUMBERS } from './data'

/* ───── Animated Counter Hook ───── */
function useCountUp(end: number, duration = 2000) {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let frame: number
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic
      setVal(Math.round(eased * end))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, end, duration])

  return { val, ref }
}

export function CinemaMoroccoContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeDecade, setActiveDecade] = useState<string | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  // Animated counters for hero
  const counter1962 = useCountUp(1962, 2500)
  const counterFilms = useCountUp(19, 1800)
  const counterRebate = useCountUp(30, 1500)
  const counterDecades = useCountUp(6, 1200)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-sid')
          if (id) setVisibleSections(prev => new Set(prev).add(id))
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
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
        center: [-6.5, 31.8],
        zoom: 5.3,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        FILMING_LOCATIONS.forEach(loc => {
          const el = document.createElement('div')
          const size = loc.name === 'Ouarzazate & Studios' ? 20 : 14
          el.style.cssText = `width:${size}px;height:${size}px;background:${loc.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;box-shadow:0 0 12px ${loc.color}55;animation:pulse-glow 3s ease-in-out infinite;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '300px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:13px;font-weight:700;color:#f5f5f5;">${loc.name}</div>
                <div style="font-size:10px;color:${loc.color};margin-top:2px;">${loc.fictional}</div>
                <div style="font-size:10px;color:#888;margin-top:4px;">${loc.production}</div>
                <div style="font-size:10px;color:#666;margin-top:3px;">${loc.detail}</div>
              </div>
            `)
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([loc.lng, loc.lat])
            .setPopup(popup)
            .addTo(map)
          markersRef.current.push(marker)
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  // Group productions by decade
  const decades = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s']
  const prodByDecade = decades.map(d => {
    const start = parseInt(d)
    const end = start + 9
    return {
      decade: d,
      productions: PRODUCTIONS.filter(p => {
        const y = parseInt(p.year)
        return y >= start && y <= end
      })
    }
  })

  return (
    <div className="-mt-16">
      {/* ═══ GLOBAL ANIMATIONS ═══ */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px var(--glow-color, rgba(239,68,68,0.3)); }
          50% { box-shadow: 0 0 20px var(--glow-color, rgba(239,68,68,0.6)); }
        }
        @keyframes film-strip {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes bar-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        {/* Animated film strip */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: '3px' }}>
          <div style={{ display: 'flex', width: '200%', animation: 'film-strip 8s linear infinite' }}>
            {Array.from({ length: 60 }, (_, i) => (
              <div key={i} style={{ width: '20px', height: '3px', background: i % 2 === 0 ? '#A0452E' : 'transparent', flexShrink: 0 }} />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
            {/* Film reel perforations */}
            {Array.from({ length: 40 }, (_, i) => (
              <rect key={i} x={30 * i} y={380} width="8" height="12" rx="1" fill="#A0452E" />
            ))}
            {Array.from({ length: 40 }, (_, i) => (
              <rect key={`b-${i}`} x={30 * i} y={410} width="8" height="12" rx="1" fill="#A0452E" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#A0452E', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 071 — Cultural &amp; Economic Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Cinema<br />Morocco
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[560px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Ouarzawood. The world&rsquo;s largest film studio in a town
            whose name means &ldquo;without noise.&rdquo; Six decades of
            blockbusters, from Lawrence of Arabia to Gladiator II.
          </p>

          {/* Animated counters */}
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            <div ref={counter1962.ref}>
              <span className="font-serif italic block tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#A0452E', lineHeight: 1 }}>{counter1962.val}</span>
              <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>First production</span>
            </div>
            <div ref={counterFilms.ref}>
              <span className="font-serif italic block tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#A0452E', lineHeight: 1 }}>{counterFilms.val}+</span>
              <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>Blockbusters filmed</span>
            </div>
            <div ref={counterRebate.ref}>
              <span className="font-serif italic block tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#A0452E', lineHeight: 1 }}>{counterRebate.val}%</span>
              <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>Cash rebate</span>
            </div>
            <div ref={counterDecades.ref}>
              <span className="font-serif italic block tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#A0452E', lineHeight: 1 }}>{counterDecades.val}</span>
              <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>Decades of cinema</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAP — FILMING LOCATIONS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#A0452E' }}>001 — The Map</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Where Morocco Becomes the World</h2>
          <p className="text-[13px] max-w-[580px] leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>
            Morocco has doubled as ancient Rome, Biblical Jerusalem, feudal Japan, modern Mogadishu,
            fantasy Essos, and Tolkien&rsquo;s deserts. Click any location.
          </p>
          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '480px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ ANIMATED TIMELINE — PRODUCTIONS BY DECADE ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Filmography</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Six Decades of Production</h2>
          <p className="text-[14px] text-dwl-body max-w-[550px] leading-relaxed mb-10">
            From David Lean in 1962 to Ridley Scott returning in 2024. Each bar is a production.
            Click a decade to explore.
          </p>

          {/* Decade bars — animated width on scroll */}
          <div className="space-y-3" data-sid="timeline">
            {prodByDecade.map((d, di) => {
              const isVisible = visibleSections.has('timeline')
              const isActive = activeDecade === d.decade
              const barWidth = Math.min(100, (d.productions.length / 7) * 100)
              return (
                <div key={d.decade}>
                  <button
                    onClick={() => setActiveDecade(isActive ? null : d.decade)}
                    className="w-full flex items-center gap-4 group cursor-pointer"
                  >
                    <span className="text-[13px] font-mono w-[50px] flex-shrink-0" style={{ color: '#999' }}>{d.decade}</span>
                    <div className="flex-1 h-8 relative rounded-sm overflow-hidden" style={{ background: '#f5f5f5' }}>
                      <div
                        className="absolute inset-y-0 left-0 rounded-sm flex items-center"
                        style={{
                          background: isActive ? '#A0452E' : '#0a0a0a',
                          width: isVisible ? `${barWidth}%` : '0%',
                          transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${di * 0.15}s, background 0.3s ease`,
                          transformOrigin: 'left',
                        }}
                      >
                        <span className="text-[10px] text-white ml-3 whitespace-nowrap">
                          {d.productions.length} production{d.productions.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded productions */}
                  <div style={{
                    maxHeight: isActive ? `${d.productions.length * 100}px` : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease',
                  }}>
                    <div className="pl-[66px] pt-2 pb-4 space-y-2">
                      {d.productions.map((p, pi) => (
                        <div key={p.title} className="py-2" style={{
                          borderBottom: '1px solid #f0f0f0',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                          transition: `all 0.4s ease ${pi * 0.08}s`,
                        }}>
                          <div className="flex items-baseline gap-3">
                            <span className="text-[11px] font-mono" style={{ color: '#A0452E' }}>{p.year}</span>
                            <span className="text-[13px] font-medium text-dwl-black">{p.title}</span>
                            <span className="text-[10px]" style={{ color: '#999' }}>{p.type}</span>
                          </div>
                          <p className="text-[11px] mt-1" style={{ color: '#888' }}>
                            {p.director} — {p.locations}
                          </p>
                          <p className="text-[11px] mt-0.5" style={{ color: '#aaa' }}>{p.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#A0452E' }}>
        <div className="max-w-[700px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#ffffff' }}>
            These same dunes, casbahs and mountain lakes now stand in for
            Saudi Arabia&rsquo;s Empty Quarter, rural Afghanistan, the Russian
            steppe and more.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.55)' }}>— AramcoWorld, &ldquo;Morocco&rsquo;s Cinema City&rdquo;</p>
        </div>
      </section>

      {/* ═══ GAME OF THRONES — MOROCCO = ESSOS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#A0452E' }}>003 — Morocco Is Essos</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Game of Thrones in Morocco</h2>
          <p className="text-[13px] max-w-[550px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>
            Prominent in Season 3. <span className="underline underline-offset-2">Essaouira</span>&rsquo;s ramparts became Astapor.
            Aït Benhaddou became Yunkai. Atlas Studios built Pentos.
            The unaired pilot filmed the Drogo–Daenerys wedding here &mdash;
            George R.R. Martin cameoed as a Pentoshi nobleman.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {GOT_LOCATIONS.map((g, i) => {
              const isVisible = visibleSections.has(`got-${i}`)
              return (
                <div key={g.location} data-sid={`got-${i}`} className="p-6 md:p-8 transition-all duration-700" style={{
                  background: '#0a0a0a',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm" style={{ background: '#A0452E20', color: '#A0452E' }}>{g.season}</span>
                  </div>
                  <h3 className="text-[15px] font-medium mb-1" style={{ color: '#f5f5f5' }}>{g.location}</h3>
                  <p className="text-[12px] font-serif italic mb-2" style={{ color: '#A0452E' }}>→ {g.fictional}</p>
                  <p className="text-[11px]" style={{ color: '#888' }}>{g.scenes}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ INCENTIVES ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Why Morocco</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">The Incentive Structure</h2>
          <p className="text-[14px] text-dwl-body max-w-[580px] leading-relaxed mb-10">
            Reliable weather. Desert, mountains, <span className="underline underline-offset-2">medina</span>s, Atlantic coast within hours. Trained local crew.
            Moroccan army as extras. And since March 2022, a 30% cash rebate administered by the Centre
            Cinématographique Marocain (CCM).
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {INCENTIVES.map((inc, i) => {
              const isVisible = visibleSections.has(`inc-${i}`)
              return (
                <div key={inc.label} data-sid={`inc-${i}`} className="bg-white p-6 md:p-8 transition-all duration-700" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <p className="font-serif italic text-[32px] md:text-[44px] leading-none" style={{ color: '#A0452E' }}>{inc.value}</p>
                  <p className="text-[12px] text-dwl-gray mt-2 font-medium">{inc.label}</p>
                  <p className="text-[11px] text-dwl-muted mt-1">{inc.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#111' }}>
        <div className="max-w-[700px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#A0452E' }}>
            Clear mountain air funnels down from the High Atlas.
            It rarely clouds over, let alone rains.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— AramcoWorld</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#A0452E' }}>005 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {KEY_NUMBERS.map((n) => (
              <div key={n.label} className="p-6 md:p-8" style={{ background: '#0a0a0a' }}>
                <p className="font-serif italic text-[32px] md:text-[44px] leading-none" style={{ color: '#A0452E' }}>{n.value}</p>
                <p className="text-[12px] mt-2 font-medium" style={{ color: 'rgba(0,0,0,0.6)' }}>{n.label}</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.note}</p>
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
              'Wikipedia — Atlas Corporation Studios: founded 1983 by Mohamed Belghmi, ~31,000 m², films list, largest by area',
              'Wikipedia — Ouarzazate: 20–50 foreign productions/year (2020 study), ~80% Moroccan crew (2017), cinema history, name etymology',
              'Grokipedia — Atlas Corporation Studios: 41% tourism surge 2017, $75M infrastructure plan 2023–2026, 34% airport recovery, GoT/Gladiator/Wheel of Time production details, 1,800 beds',
              'AramcoWorld — "Morocco\'s Cinema City": Amine Tazi interview, Omar series, Ka\'bah replica, 3,000 soldiers Kingdom of Heaven, CLA Studios, Ouarzazate Film Festival',
              'CCM (Centre Cinématographique Marocain): 30% rebate (March 2022), $1M min spend, 18 days min, eligible expenses, VAT exemption, credits requirement',
              'Caestus Films / Morocco Film Commission: rebate application process, SPV requirements, partnering with CCM-certified company, production timeline',
              'Morocco World News: 20% rebate approval (2015 Finance Law), Sarim Fassi Fihri quote, historical context, competitive positioning',
              'Game of Thrones locations: Essaouira = Astapor (S3), Aït Benhaddou = Yunkai (S3), Atlas Studios = Pentos, CLA = Essos desert, Tazentoute = camp, pilot = Drogo wedding',
              'Laure Wanders / Tuljak / Continent Hop: Atlas Studios visitor guides, set descriptions, Hills Have Eyes gas station, tour details',
              'Ouarzazate.city / Slate / Atlas Obscura: studio history, set preservation, David Lean 1962, "not clear where studio ends and desert begins"',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#A0452E' }}>Sources: CCM Morocco</p>
          </div>
        </div>
      </section>
    </div>
  )
}
