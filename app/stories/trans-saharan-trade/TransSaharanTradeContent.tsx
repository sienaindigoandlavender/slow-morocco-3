'use client'

import { useState, useEffect, useRef } from 'react'
import { ROUTES, COMMODITIES, CITIES, TIMELINE, HERO_STATS, KEY_NUMBERS } from './data'

export function TransSaharanTradeContent() {
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
        center: [-2.0, 24.0],
        zoom: 3.6,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        CITIES.forEach(c => {
          const el = document.createElement('div')
          const size = ['Sijilmasa', 'Timbuktu', 'Marrakech', 'Fez'].includes(c.name) ? 16 : 12
          el.style.cssText = `width:${size}px;height:${size}px;background:${c.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '280px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:13px;font-weight:700;color:#f5f5f5;">${c.name}</div>
                <div style="font-size:11px;color:${c.color};margin-top:2px;">${c.role}</div>
                <div style="font-size:10px;color:#888;margin-top:4px;">${c.detail.slice(0, 150)}…</div>
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
            {/* Caravan trail dots */}
            {Array.from({ length: 80 }, (_, i) => {
              const x = 50 + (i % 20) * 60
              const y = 200 + Math.floor(i / 20) * 100 + Math.sin(i * 0.7) * 30
              return <circle key={i} cx={x} cy={y} r="1.5" fill="#F59E0B" opacity={0.3 + (i % 3) * 0.2} />
            })}
            {/* Dune curves */}
            {Array.from({ length: 6 }, (_, i) => (
              <path key={`dune-${i}`} d={`M 0 ${400 + i * 60} Q ${300 + i * 50} ${370 + i * 60}, 600 ${400 + i * 60} T 1200 ${400 + i * 60}`} fill="none" stroke="#F59E0B" strokeWidth="0.3" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#F59E0B', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 069 — Historical &amp; Trade Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Trans-Saharan<br />Trade Routes
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Salt south, gold north. For twelve centuries, <span className="underline underline-offset-2">camel</span> caravans
            crossed the world&rsquo;s largest desert carrying the commodities
            that built empires, spread Islam, funded dynasties, and made
            Timbuktu and Marrakech two of the richest cities on earth.
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

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>001 — The Network</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Ten Cities, Five Routes</h2>
          <p className="text-[13px] max-w-[600px] leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>
            Click any city to explore its role in the trade network. Major hubs shown larger.
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { label: 'Northern termini', color: '#F59E0B' },
              { label: 'Southern hubs', color: '#A0452E' },
              { label: 'Desert waypoints', color: '#9CA3AF' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                <span className="text-[11px]" style={{ color: '#aaa' }}>{l.label}</span>
              </div>
            ))}
          </div>

          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '520px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ FIVE ROUTES ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Routes</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Five Paths Across the Desert</h2>

          <div className="space-y-0">
            {ROUTES.map((r, i) => {
              const isVisible = visibleSections.has(`route-${i}`)
              return (
                <div key={r.id} data-sid={`route-${i}`} className="py-7 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(10px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                        <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: r.color }}>{r.primaryGoods}</span>
                      </div>
                      <h3 className="font-serif text-[20px] italic text-dwl-black leading-tight">{r.name}</h3>
                      <div className="mt-2 space-y-0.5">
                        <p className="text-[11px] text-dwl-muted"><span style={{ color: '#0a0a0a' }}>From:</span> {r.from}</p>
                        <p className="text-[11px] text-dwl-muted"><span style={{ color: '#0a0a0a' }}>Through:</span> {r.through}</p>
                        <p className="text-[11px] text-dwl-muted"><span style={{ color: '#0a0a0a' }}>To:</span> {r.to}</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-dwl-body leading-relaxed">{r.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#F59E0B' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#0a0a0a' }}>
            Fez and Marrakech are nowhere near the ocean. But in a very real
            sense, they are ports on the edge of a great sea — the Sahara.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(10,10,10,0.5)' }}>— Open Ended Social Studies</p>
        </div>
      </section>

      {/* ═══ COMMODITIES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>003 — What Crossed the Desert</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>The Commodities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {COMMODITIES.map((c, i) => {
              const isVisible = visibleSections.has(`comm-${i}`)
              const dirColors: Record<string, string> = { 'Northbound': '#F59E0B', 'Southbound': '#2D5F8A', 'Both': '#5C7C3E' }
              return (
                <div key={c.name} data-sid={`comm-${i}`} className="p-6 md:p-8 transition-all duration-700" style={{ background: '#0a0a0a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: dirColors[c.direction] }}>{c.direction} ↑{c.direction === 'Northbound' ? '' : c.direction === 'Southbound' ? '' : ''}</span>
                  </div>
                  <h3 className="text-[16px] font-medium mb-2" style={{ color: '#f5f5f5' }}>{c.name}</h3>
                  <p className="text-[12px] leading-relaxed mb-3" style={{ color: '#888' }}>{c.detail}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: dirColors[c.direction] }}>{c.significance}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Chronology</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-10">1,200 Years of Desert Commerce</h2>

          <div className="space-y-0">
            {TIMELINE.map((t, i) => {
              const isVisible = visibleSections.has(`time-${i}`)
              return (
                <div key={i} data-sid={`time-${i}`} className="flex gap-4 md:gap-8 py-3 transition-all duration-700" style={{ borderTop: '1px solid #f0f0f0', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(4px)' }}>
                  <div className="w-[80px] md:w-[100px] flex-shrink-0">
                    <span className="text-[14px] font-medium" style={{ color: t.color }}>{t.year}</span>
                  </div>
                  <p className="text-[13px] text-dwl-body leading-relaxed">{t.event}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#111' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#F59E0B' }}>
            In some regions, a slab of salt was worth its equivalent in gold.
            Salt — essential for food preservation and health — was the
            engine of an entire civilisation.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Desert-Morocco.net</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — Key Numbers</p>
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
              'Wikipedia — Trans-Saharan trade: Routes (Taghaza Trail, Audaghost Trail, Tripoli–Chad), Sijilmasa, Almoravid dinars, salt-gold ratio, Ibn Battuta records',
              'Wikipedia — Trans-Saharan slave trade: 600 enslaved women (Ibn Battuta 1353), Saadian sugar plantations, 7,000+ enslaved via Morocco 10th–19th C',
              'Encyclopedia.com — Trans-Saharan Caravan Trade: Five northern termini, Dyula-Wangara network, 1,000-camel caravans by 11th C, route mapping',
              'Encyclopedia.com — Expanding Trade Routes: Nine-century route Tangier-Fez-Sijilmasa, 2,000 brass rods, Maqqari brothers communications network',
              'OER Project: Camel reintroduction ~300 BCE, 400 lb capacity, Berber saddle improvements, caravan organisation Oct–March, Timbuktu as caravanserai',
              'BlackPast.org: Gold-salt trade 500 BCE–1800, Ghana → Mali → Songhai succession, Mansa Musa 1324 hajj, Morocco 1591 invasion',
              'Desert-Morocco.net: Sijilmasa "northern port of Sahara," Tikna confederation (UCLA research), caravan logistics, decline from 17th C maritime trade',
              'Morocco Travel Blog: Aït Benhaddou caravan stop, Essaouira-Timbuktu Jewish traders 19th C, gunpowder tea from China, 7,000 slaves estimate',
              'Open Ended Social Studies: Fez/Marrakech as "ports on the Sahara," Almoravid/Almohad dynasty wealth from trade, Aït Benhaddou ighrem',
              'WASCE History Textbook: Mansa Musa as "richest human ever," 10,000-camel caravans post-1325, Djinguereber Mosque architect from Andalusia',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#F59E0B' }}>Sources: Historical records, UNESCO</p>
          </div>
        </div>
      </section>
    </div>
  )
}
