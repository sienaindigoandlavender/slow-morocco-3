'use client'

import { useState, useEffect, useRef } from 'react'
import { CEREMONY, BRIDAL_OUTFITS, KEY_ROLES, REGIONAL, COST_BREAKDOWN, HERO_STATS, WEDDING_MENU } from './data'


const WEDDING_MAP_POINTS = [
  { name: 'Fez', lat: 34.0181, lng: -5.0078, detail: 'Fassiya kaftan. Heavy gold brocade. Andalusi music.', color: '#7B506F' },
  { name: 'Rabat', lat: 34.0209, lng: -6.8416, detail: 'R\'batiya style. Lighter, flowing silhouette. Blue.', color: '#2D5F8A' },
  { name: 'Marrakech', lat: 31.6295, lng: -7.9811, detail: 'Largest negafa industry. Multi-outfit spectacle.', color: '#A0452E' },
  { name: 'Souss / Tiznit', lat: 29.6974, lng: -9.7986, detail: 'Amazigh tradition. Silver fibules. Ahwach dance.', color: '#5C7C3E' },
  { name: 'Sahara / Laayoune', lat: 27.1536, lng: -13.2033, detail: 'Sahrawi melhfa. Indigo or white. Simpler ceremony.', color: '#C17F28' },
  { name: 'Rif / Nador', lat: 35.1740, lng: -2.9287, detail: 'Tarifit traditions. Rifle dance. Izlan songs.', color: '#C8A415' },
]
const MAPBOX_TOKEN_W = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function WeddingMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN_W || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN_W!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6.5, 32], zoom: 5.2, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        WEDDING_MAP_POINTS.forEach(p => {
          const el = document.createElement('div')
          el.style.cssText = `width:16px;height:16px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.9);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
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

export function WeddingAtlasContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-sid')
          if (id) setVisibleSections(prev => new Set(prev).add(id))
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Henna-inspired geometric pattern */}
            {[0, 1, 2, 3].map(row =>
              [0, 1, 2, 3, 4].map(col => (
                <g key={`${row}-${col}`} transform={`translate(${120 + col * 240}, ${100 + row * 200})`}>
                  <circle cx="0" cy="0" r="60" fill="none" stroke="#EC4899" strokeWidth="0.5" />
                  <circle cx="0" cy="0" r="40" fill="none" stroke="#EC4899" strokeWidth="0.5" />
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#EC4899" strokeWidth="0.5" />
                  {[0, 60, 120, 180, 240, 300].map(deg => (
                    <line key={deg} x1="0" y1="0" x2={Math.cos(deg * Math.PI / 180) * 60} y2={Math.sin(deg * Math.PI / 180) * 60} stroke="#EC4899" strokeWidth="0.3" />
                  ))}
                </g>
              ))
            )}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#EC4899', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 048 — Event Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Moroccan<br />Wedding
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Three to seven days. Seven outfit changes. Hundreds of guests.
            From the <span className="underline underline-offset-2">hammam</span> purification to the henna night, the amariya entrance
            to the mechoui feast — mapped ceremony by ceremony, region by region.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#EC4899', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CEREMONY TIMELINE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Ceremonies</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Seven Stages, Three to Seven Days</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-16">Every Moroccan wedding follows the same arc — from negotiation to celebration. The timeline compresses or expands, but the rituals remain.</p>

          <div className="relative">
            {/* Vertical spine */}
            <div className="hidden md:block absolute left-[140px] top-0 bottom-0 w-px" style={{ background: '#e5e5e5' }} />

            <div className="space-y-0">
              {CEREMONY.map((stage, i) => {
                const isVisible = visibleSections.has(stage.id)
                return (
                  <div key={stage.id} data-sid={stage.id} className="relative transition-all duration-700 py-10 md:py-14" style={{ borderTop: i > 0 ? '1px solid #f0f0f0' : 'none', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                      {/* Left: day + dot */}
                      <div className="md:col-span-3 relative">
                        <div className="hidden md:block absolute right-[-21px] top-2 w-3 h-3 rounded-full z-10" style={{ background: stage.color, boxShadow: `0 0 12px ${stage.color}44` }} />
                        <p className="text-[10px] uppercase tracking-[0.1em] text-dwl-muted mb-1">{stage.day}</p>
                        <p className="font-serif italic text-[13px]" style={{ color: stage.color }}>{stage.duration}</p>
                      </div>
                      {/* Right: content */}
                      <div className="md:col-span-9">
                        <div className="flex items-baseline gap-3 mb-3">
                          <h3 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1]">{stage.name}</h3>
                          <span className="text-[14px] text-dwl-muted" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>{stage.nameAr}</span>
                        </div>
                        <p className="text-[15px] text-dwl-body leading-relaxed mb-5 max-w-[600px]">{stage.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                          {stage.details.map((d, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0" style={{ background: stage.color }} />
                              <p className="text-[12px] text-dwl-gray">{d}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE 1 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[40vh]" style={{ background: '#EC4899' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', color: '#ffffff' }}>
            The bride enters at eleven. She leaves at dawn.
            Between those hours, she will become seven different women —
            each outfit a chapter, each entrance a coronation.
          </p>
        </div>
      </section>

      {/* ═══ BRIDAL WARDROBE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Wardrobe</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Seven Outfits, One Night</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">The bride doesn&rsquo;t just change clothes — she crosses regions. Each outfit carries the weight of a city, a lineage, a tradition. The negafa orchestrates every transition.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {BRIDAL_OUTFITS.map((outfit, i) => {
              const isVisible = visibleSections.has(`outfit-${i}`)
              return (
                <div key={outfit.name} data-sid={`outfit-${i}`} className="bg-white p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: outfit.color }} />
                    <span className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted">{outfit.region}</span>
                  </div>
                  <h3 className="font-serif text-[24px] italic text-dwl-black leading-[1.05]">{outfit.name}</h3>
                  <p className="text-[13px] text-dwl-muted mt-1 mb-3">{outfit.nameAr}</p>
                  <p className="text-[13px] text-dwl-body leading-relaxed">{outfit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ KEY ROLES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#EC4899' }}>003 — The Cast</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>Six Roles That Make It Happen</h2>

          <div className="space-y-0">
            {KEY_ROLES.map((role, i) => {
              const isVisible = visibleSections.has(`role-${i}`)
              return (
                <div key={role.role} data-sid={`role-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #1a1a1a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-4">
                      <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums" style={{ color: '#555' }}>{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-serif text-[28px] italic mt-1" style={{ color: '#f5f5f5' }}>{role.role}</h3>
                      <p className="text-[13px] mt-1" style={{ color: '#666' }}>{role.roleAr}</p>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-[15px] leading-relaxed" style={{ color: '#ccc' }}>{role.description}</p>
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
        <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Regional Traditions — Mapped</p>
        <WeddingMap />
      </div></section>

{/* ═══ REGIONAL VARIATIONS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Regional Variations</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Same Arc, Different Worlds</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">The core ceremonies hold everywhere. But a wedding in Fes sounds nothing like a wedding in the Sahara — and an Amazigh celebration in the Atlas looks nothing like either.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {REGIONAL.map((r) => {
              const isActive = activeRegion === r.region
              return (
                <button key={r.region} onClick={() => setActiveRegion(isActive ? null : r.region)} className="bg-white p-8 text-left transition-all hover:bg-gray-50 cursor-pointer group">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 rounded-full transition-transform group-hover:scale-110" style={{ background: r.color }} />
                    <span className="font-serif text-[24px] italic text-dwl-black">{r.region}</span>
                  </div>
                  <p className="text-[13px] text-dwl-body leading-relaxed">{r.note}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ THE FEAST ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>005 — The Feast</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>Six Courses, One Night</h2>

          <div className="space-y-0">
            {WEDDING_MENU.map((course, i) => {
              const isVisible = visibleSections.has(`menu-${i}`)
              return (
                <div key={course.course} data-sid={`menu-${i}`} className="py-6 transition-all duration-700" style={{ borderTop: '1px solid #1a1a1a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10">
                    <div className="md:col-span-3">
                      <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: '#F59E0B' }}>{course.course}</span>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-[15px] leading-relaxed" style={{ color: '#ddd' }}>{course.items}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE 2 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#7B506F' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#ffffff' }}>
            A Moroccan wedding is not a party. It is a production —
            with a director (the negafa), a script (centuries old),
            a costume department (seven changes), and an audience
            of three hundred who already know every scene by heart.
          </p>
        </div>
      </section>

      {/* ═══ COST BREAKDOWN ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">006 — The Cost</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">What It Costs</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">Moroccan weddings range from $10,000 for a modest celebration to $100,000+ for Marrakech luxury. Most land between $15,000 and $50,000. Both families typically contribute.</p>

          <div className="space-y-0">
            {COST_BREAKDOWN.map((item, i) => {
              const isVisible = visibleSections.has(`cost-${i}`)
              return (
                <div key={item.item} data-sid={`cost-${i}`} className="py-5 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(10px)' }}>
                  <div className="grid grid-cols-12 gap-4 items-baseline">
                    <div className="col-span-4 md:col-span-3">
                      <p className="text-[14px] font-medium text-dwl-black">{item.item}</p>
                    </div>
                    <div className="col-span-4 md:col-span-3">
                      <p className="font-serif italic text-[20px] md:text-[24px] text-dwl-black">{item.range}</p>
                    </div>
                    <div className="col-span-4 md:col-span-6">
                      <p className="text-[12px] text-dwl-gray">{item.note}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cost summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-12" style={{ background: '#e5e5e5' }}>
            {[
              { label: 'Modest (rural/small city)', range: '$10,000–$20,000', guests: '100–200 guests', color: '#5C7C3E' },
              { label: 'Mid-range (urban)', range: '$25,000–$50,000', guests: '300–500 guests', color: '#F59E0B' },
              { label: 'Luxury (Marrakech/Fes)', range: '$50,000–$100,000+', guests: '300–800 guests', color: '#EC4899' },
            ].map((tier) => (
              <div key={tier.label} className="bg-white p-8">
                <div className="w-4 h-4 rounded-full mb-3" style={{ background: tier.color }} />
                <p className="font-serif italic text-[28px] text-dwl-black leading-none">{tier.range}</p>
                <p className="text-[12px] font-medium text-dwl-gray mt-2">{tier.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{tier.guests}</p>
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
              'Field documentation — Moroccan wedding ceremonies (Marrakech, Fes, Atlas regions)',
              'GoMoroccoNow — Weddings in Morocco (traditions and ceremony guide)',
              'Unique Travel Morocco — 12 Moroccan Wedding Traditions and Customs',
              'Celinni — Wedding Traditions in Morocco: Key Rituals and Symbols',
              'Moroccopedia — Moroccan Weddings (cultural ethnography)',
              'Movocco — Wedding in Morocco: Costs, Traditions, and Tips (2024)',
              'MyRose Events — Authentic Wedding Budget Guide, Morocco',
              'Brief Mingle — Average Cost of Wedding in Casablanca (Reddit survey, 2024)',
              'Ketubah Azoulay Art — Moroccan Jewish Wedding Ceremonies and Traditions',
              'Travelling in Morocco — Moroccan Marriage Traditions (regional variations)',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#EC4899' }}>Sources: Ethnographic research</p>
          </div>
        </div>
      </section>
    </div>
  )
}
