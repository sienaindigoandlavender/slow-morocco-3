'use client'

import { useState, useEffect, useRef } from 'react'
import { WRITERS, LOCATIONS, ERAS, HERO_STATS , MAP_POINTS } from './data'

type EraFilter = 'all' | 'pre-interzone' | 'interzone' | 'moroccan-voices' | 'modern'


const MAPBOX_TK_L = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function LiteraryMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TK_L || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TK_L!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6, 33], zoom: 5.5, attributionControl: false })
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

export function LiteraryMoroccoContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [era, setEra] = useState<EraFilter>('all')

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const filteredWriters = era === 'all' ? WRITERS : WRITERS.filter(w => w.era === era)

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
            {/* Typewriter lines */}
            {Array.from({ length: 20 }, (_, i) => (
              <line key={i} x1="100" y1={200 + i * 28} x2={400 + Math.random() * 600} y2={200 + i * 28} stroke="#D4A373" strokeWidth="0.4" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#D4A373', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 062 — Cultural Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Literary<br />Morocco
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Tangier was an International Zone — lawless, multilingual, free.
            It drew Bowles, Burroughs, Genet, Capote, Ginsberg. But Morocco&rsquo;s
            literary story begins with <span className="underline underline-offset-2">Ibn Battuta</span> in 1325 and continues
            through Choukri, Mrabet, and Ben Jelloun. This is the map.
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

      {/* ═══ ERAS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] pt-section pb-8">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-6" style={{ color: '#D4A373' }}>001 — Four Eras</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
            {ERAS.map((e) => (
              <div key={e.key} className="p-6" style={{ background: '#0f0f0f' }}>
                <div className="w-3 h-3 rounded-full mb-2" style={{ background: e.color }} />
                <h3 className="font-serif text-[16px] italic mb-1" style={{ color: '#f5f5f5' }}>{e.label}</h3>
                <p className="text-[12px] leading-relaxed" style={{ color: '#888' }}>{e.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WRITERS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Writers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-8">Twelve Voices</h2>

          <div className="flex flex-wrap gap-2 mb-10">
            {[{ key: 'all' as EraFilter, label: 'All', color: '#888' }, ...ERAS.map(e => ({ key: e.key as EraFilter, label: e.label.split('(')[0].trim(), color: e.color }))].map(e => (
              <button key={e.key} onClick={() => setEra(e.key)}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.06em] rounded-full border transition-all"
                style={{
                  borderColor: era === e.key ? e.color : '#ddd',
                  color: era === e.key ? e.color : '#999',
                  background: era === e.key ? `${e.color}10` : 'transparent',
                }}
              >{e.label}</button>
            ))}
          </div>

          <div className="space-y-0">
            {filteredWriters.map((w, i) => {
              const isVisible = visibleSections.has(`writer-${w.id}`)
              return (
                <div key={w.id} data-sid={`writer-${w.id}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: w.color }} />
                        <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: w.color }}>{w.nationality}</span>
                        <span className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted">{w.years}</span>
                      </div>
                      <h3 className="font-serif text-[28px] italic text-dwl-black leading-tight">{w.name}</h3>
                      <p className="text-[12px] text-dwl-muted mt-1">{w.location}</p>
                      <div className="mt-3 p-3 rounded-sm" style={{ background: `${w.color}08`, border: `1px solid ${w.color}15` }}>
                        <p className="font-serif italic text-[15px]" style={{ color: w.color }}>{w.keyWork}</p>
                        <p className="text-[11px] text-dwl-muted">{w.keyWorkYear}</p>
                        {w.otherWorks.length > 0 && (
                          <p className="text-[11px] text-dwl-muted mt-1">{w.otherWorks.join(' · ')}</p>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-[13px] font-medium mb-2" style={{ color: w.color }}>{w.moroccoConnection}</p>
                      <p className="text-[14px] text-dwl-body leading-relaxed">{w.detail}</p>
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
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>Writers & Cities — Mapped</p>
        <LiteraryMap />
      </div></section>

{/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#D4A373' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#ffffff' }}>
            &ldquo;Paul Bowles loves Morocco,
            but does not really like Moroccans.&rdquo;
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(0,0,0,0.6)' }}>— Mohamed Choukri, In Tangier (1997)</p>
        </div>
      </section>

      {/* ═══ LOCATIONS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D5F8A' }}>003 — The Places</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Literary Geography</h2>
          <p className="text-[16px] max-w-[560px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>Hotels, cafés, bookshops, cemeteries. The physical spaces where Morocco\'s literary history happened.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {LOCATIONS.map((loc, i) => {
              const isVisible = visibleSections.has(`loc-${i}`)
              return (
                <div key={loc.name} data-sid={`loc-${i}`} className="p-6 md:p-8 transition-all duration-700" style={{ background: '#0f0f0f', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <h3 className="font-serif text-[18px] italic mb-2" style={{ color: '#f5f5f5' }}>{loc.name}</h3>
                  <p className="text-[13px] leading-relaxed mb-2" style={{ color: '#aaa' }}>{loc.detail}</p>
                  <p className="text-[11px]" style={{ color: '#666' }}>{loc.writers.join(' · ')}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#2D5F8A' }}>
            Tangier&rsquo;s literary history is unlike
            any other the world has ever known
            or may ever know again.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Explore Parts Unknown / CNN</p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {[
              'Wikipedia — Paul Bowles: Tangier 1947–1999, Library of Congress recordings, translation work, The Sheltering Sky',
              'Wikipedia — Mohamed Choukri: born 1935 Rif, illiterate until 21, For Bread Alone banned, translated by Bowles and Ben Jelloun',
              'Britannica — Paul Bowles: composer-turned-writer, detached style, contact with powerful traditional cultures',
              'New York Review of Books — Hisham Aidi (2019): Bowles debate, Choukri\'s critique, colonial literary politics',
              'New York Review of Books — Ursula Lindsey (2025): Choukri\'s unromantic Tangier, For Bread Alone new edition',
              'Explore Parts Unknown / CNN: literary walking tour of Tangier, Hotel Muniria, Café de Paris, Librairie des Colonnes',
              'Beatdom — In Tangier: Burroughs arrives 1953, Hotel Muniria, Bowles influence, Naked Lunch composition',
              'Bureau of Lost Culture: Tangier International Zone 1924–1956, expat writers, counterculture attraction',
              'Field documentation: literary locations in Tangier and Marrakech, bookshop and hotel visits',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#D4A373' }}>Sources: Published works, UNESCO</p>
          </div>
        </div>
      </section>
    </div>
  )
}
