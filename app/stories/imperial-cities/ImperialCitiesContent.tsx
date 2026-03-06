'use client'

import { useState, useEffect, useRef } from 'react'
import { CITIES, DYNASTIES, HERO_STATS, KEY_NUMBERS } from './data'

export function ImperialCitiesContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [expandedCity, setExpandedCity] = useState<string | null>(null)
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
        center: [-6.5, 33.0],
        zoom: 5.8,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        CITIES.forEach(c => {
          const el = document.createElement('div')
          el.style.cssText = `width:20px;height:20px;background:${c.color};border-radius:50%;border:3px solid #0a0a0a;cursor:pointer;box-shadow:0 0 12px ${c.color}44;`
          const popup = new mapboxgl.Popup({ offset: 14, maxWidth: '320px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:16px;font-weight:700;color:#f5f5f5;">${c.name}</div>
                <div style="font-size:12px;color:${c.color};margin-top:2px;">${c.arabicName} · Founded ${c.founded}</div>
                <div style="font-size:11px;color:#aaa;margin-top:4px;">${c.nickname}</div>
                <div style="font-size:10px;color:#666;margin-top:4px;">${c.keyFact}</div>
              </div>
            `)
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([c.lng, c.lat])
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
            {/* Gate / arch pattern */}
            {Array.from({ length: 8 }, (_, i) => {
              const cx = 150 + i * 140
              return (
                <g key={i}>
                  <path d={`M ${cx - 40} 500 L ${cx - 40} 300 A 40 50 0 0 1 ${cx + 40} 300 L ${cx + 40} 500`} fill="none" stroke="#D4A373" strokeWidth="0.4" />
                  <path d={`M ${cx - 30} 500 L ${cx - 30} 310 A 30 40 0 0 1 ${cx + 30} 310 L ${cx + 30} 500`} fill="none" stroke="#D4A373" strokeWidth="0.3" />
                  <line x1={cx - 40} y1={500} x2={cx + 40} y2={500} stroke="#D4A373" strokeWidth="0.3" />
                </g>
              )
            })}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#D4A373', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 068 — Political &amp; Cultural Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Four<br />Imperial Cities
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Each dynasty chose its capital. From the Idrisids founding
            Fez in 789 to Rabat becoming the modern seat of power
            in 1912 — seven dynasties, four cities, and the political
            architecture of a kingdom.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#D4A373', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#D4A373' }}>001 — The Power Map</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Four Capitals, Seven Dynasties</h2>

          <div className="flex flex-wrap gap-5 mb-6">
            {CITIES.map(c => (
              <div key={c.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: c.color, boxShadow: `0 0 6px ${c.color}44` }} />
                <span className="text-[11px]" style={{ color: '#aaa' }}>{c.name} · {c.founded}</span>
              </div>
            ))}
          </div>

          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '480px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ FOUR CITIES ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Cities</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Each One a Kingdom</h2>

          <div className="space-y-0">
            {CITIES.map((c, i) => {
              const isVisible = visibleSections.has(`city-${i}`)
              const isExpanded = expandedCity === c.id
              return (
                <div key={c.id} data-sid={`city-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="flex items-start justify-between gap-4 cursor-pointer" onClick={() => setExpandedCity(isExpanded ? null : c.id)}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                        <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: c.color }}>Founded {c.founded}</span>
                      </div>
                      <h3 className="font-serif text-[32px] md:text-[42px] italic text-dwl-black leading-tight">{c.name}</h3>
                      <p className="text-[18px] mt-0.5" style={{ color: '#999' }}>{c.arabicName}</p>
                    </div>
                    <span className="text-[24px] mt-2 transition-transform" style={{ color: '#ccc', transform: isExpanded ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>Nickname</p>
                      <p className="text-[13px] text-dwl-body leading-relaxed">{c.nickname}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>Population</p>
                      <p className="text-[13px] text-dwl-body">{c.population}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>UNESCO</p>
                      <p className="text-[13px] text-dwl-body">{c.unesco}</p>
                    </div>
                  </div>

                  <p className="text-[13px] font-medium mt-4" style={{ color: c.color }}>{c.keyFact}</p>

                  {isExpanded && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8" style={{ animation: 'fadeUp 0.4s ease forwards' }}>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: c.color }}>History</p>
                        <p className="text-[14px] text-dwl-body leading-relaxed mb-5">{c.detail}</p>

                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: c.color }}>Capital Under</p>
                        <div className="space-y-1">
                          {c.dynastiesAsCapital.map((d, j) => (
                            <p key={j} className="text-[13px] text-dwl-body flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: c.color }} />
                              {d}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: c.color }}>Key Monuments</p>
                        <div className="space-y-1.5">
                          {c.monuments.map((m, j) => (
                            <p key={j} className="text-[12px] text-dwl-body flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: c.color }} />
                              {m}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#D4A373' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#0a0a0a' }}>
            Although the political capital was transferred to Rabat in 1912,
            Fez has retained its status as the country&rsquo;s cultural and
            spiritual centre.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(10,10,10,0.5)' }}>— UNESCO World Heritage Centre</p>
        </div>
      </section>

      {/* ═══ DYNASTY TIMELINE ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#D4A373' }}>003 — The Dynasties</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>Seven Houses, One Throne</h2>

          <div className="space-y-0">
            {DYNASTIES.map((d, i) => {
              const isVisible = visibleSections.has(`dyn-${i}`)
              return (
                <div key={d.name} data-sid={`dyn-${i}`} className="py-5 transition-all duration-700" style={{ borderTop: '1px solid #1a1a1a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 md:gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                        <span className="text-[14px] font-medium" style={{ color: '#f5f5f5' }}>{d.name}</span>
                      </div>
                      <p className="text-[12px]" style={{ color: d.color }}>{d.period}</p>
                      <p className="text-[11px] mt-1" style={{ color: '#666' }}>{d.origin}</p>
                    </div>
                    <div>
                      <p className="text-[12px] mb-1" style={{ color: '#aaa' }}>Capital: <span style={{ color: '#f5f5f5' }}>{d.capital}</span></p>
                      <p className="text-[12px] leading-relaxed" style={{ color: '#888' }}>{d.legacy}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#111' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#D4A373' }}>
            Fez has never relinquished its heritage. More than anywhere else
            in Morocco, and perhaps the entire Arab world, this is the place
            to see a medieval city still living, still breathing.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Moroccan National Tourist Office</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Key Numbers</p>
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
              'UNESCO World Heritage Centre: Medina of Fez (1981), Medina of Marrakech (1985), Historic City of Meknes (1996), Rabat Modern Capital & Historic City (2012)',
              'Wikipedia — Fez, Morocco: Population, Idrisid founding, Marinid golden age, al-Qarawiyyin (859), Fez Jdid (1276), car-free urban area',
              'Wikipedia — Fes el Bali: 9,000+ alleys, ~300 hectares, Almohad-era walls, Bou Inania/Al-Attarine madrasas, Mellah, Borj Nord/Sud',
              'Morocco World News: Dynasty timeline, Moulay Ismail\'s Meknès, Almohad Rabat, Saadian Marrakech, Koutoubia inspiring Giralda',
              'Visit Morocco (National Tourist Office): Fez "still living, still breathing," Marrakech four dynasties, Moulay Ismail legend',
              'Wanderlust: UNESCO sites guide, al-Qarawiyyin as oldest university, Meknes Bab al-Mansour, Khanata bint Bakkar',
              'Crossroads Cultural Exchange: Fez medina walls/gates/kasbahs, Marinid madrasas, Saadian bastions, Rabat Hassan Tower',
              'Malika in Morocco: Comprehensive dynasty-capital mapping, Fez as capital for Idrisid/Marinid/Wattasid/Alaouite',
              'Oasis Aventure / CaramelTrail: Al-Qarawiyyin founded by Fatima al-Fihri, 4,000 manuscripts, oldest library in world',
              'Journey Morocco / Mozarkech: Moulay Ismail 40km walls, Battle of Alarcos, Mohammed III designating Rabat, French Protectorate 1912',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#D4A373' }}>Sources: UNESCO, HCP Morocco</p>
          </div>
        </div>
      </section>
    </div>
  )
}
