'use client'

import { useState, useEffect, useRef } from 'react'
import { TAGINE_STYLES, SPICE_PANTRY, VESSEL, CULTURAL_RULES, HERO_STATS } from './data'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

function TagineMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN!
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-6.5, 32.5],
        zoom: 4.8,
        pitch: 0,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map

      map.on('load', () => {
        TAGINE_STYLES.forEach((t) => {
          const el = document.createElement('div')
          el.className = 'tagine-marker'
          el.style.cssText = `width:16px;height:16px;border-radius:50%;background:${t.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => {
            setSelected(t.id)
            map.flyTo({ center: t.coords, zoom: 7, duration: 1200 })
          })

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat(t.coords)
            .setPopup(
              new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '260px' })
                .setHTML(`<div style="font-family:var(--font-mono);padding:4px 0"><p style="font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:${t.color};margin:0 0 2px">${t.region}</p><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${t.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${t.signature}</p></div>`)
            )
            .addTo(map)
          markersRef.current.push(marker)
        })
        setMapLoaded(true)
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  const selectedTagine = TAGINE_STYLES.find(t => t.id === selected)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => { setSelected(null); mapRef.current?.flyTo({ center: [-6.5, 32.5], zoom: 4.8, duration: 800 }) }}
          className="px-3 py-1.5 text-[11px] uppercase tracking-[0.06em] rounded-full border transition-all"
          style={{ borderColor: !selected ? '#F59E0B' : '#333', color: !selected ? '#F59E0B' : '#888', background: !selected ? 'rgba(245,158,11,0.1)' : 'transparent' }}
        >All</button>
        {TAGINE_STYLES.map((t) => (
          <button key={t.id}
            onClick={() => { setSelected(t.id); mapRef.current?.flyTo({ center: t.coords, zoom: 7, duration: 1000 }) }}
            className="px-3 py-1.5 text-[11px] uppercase tracking-[0.06em] rounded-full border transition-all"
            style={{ borderColor: selected === t.id ? t.color : '#333', color: selected === t.id ? t.color : '#888', background: selected === t.id ? `${t.color}15` : 'transparent' }}
          >{t.region.split(' /')[0].split(' (')[0]}</button>
        ))}
      </div>
      <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '520px', background: '#0a0a0a' }} />
      {selectedTagine && (
        <div className="mt-4 p-6 rounded-sm" style={{ background: '#111', border: `1px solid ${selectedTagine.color}30` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ background: selectedTagine.color }} />
            <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: selectedTagine.color }}>{selectedTagine.region}</span>
          </div>
          <h3 className="font-serif text-[24px] italic mb-1" style={{ color: '#f5f5f5' }}>{selectedTagine.name}</h3>
          <p className="text-[13px] mb-3" style={{ color: '#888' }}>{selectedTagine.nameAr}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.08em] mb-1" style={{ color: '#666' }}>Protein</p>
              <p className="text-[13px]" style={{ color: '#ccc' }}>{selectedTagine.protein}</p>
              <p className="text-[10px] uppercase tracking-[0.08em] mb-1 mt-3" style={{ color: '#666' }}>Key Spices</p>
              <div className="flex flex-wrap gap-1">
                {selectedTagine.spices.map(s => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: `${selectedTagine.color}15`, color: selectedTagine.color }}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.08em] mb-1" style={{ color: '#666' }}>Character</p>
              <p className="text-[13px] leading-relaxed" style={{ color: '#ccc' }}>{selectedTagine.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function TagineAtlasContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
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
            {/* Cone shape — the tagine lid */}
            <path d="M600 100 L400 700 L800 700 Z" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
            <ellipse cx="600" cy="700" rx="250" ry="30" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={i} cx="600" cy={200 + i * 65} rx={50 + i * 25} ry={5 + i * 3} fill="none" stroke="#F59E0B" strokeWidth="0.2" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#F59E0B', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 051 — Culinary Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Tagine<br />Atlas
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Not every tagine tastes the same — and that&rsquo;s the whole point.
            Lamb with prunes in Marrakech. Chicken with olives in <span className="underline underline-offset-2">Fes</span>. Fish with
            chermoula on the coast. What goes into the pot depends on what grows nearby.
            This is how Morocco&rsquo;s most iconic dish maps to its land.
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
        <div className="px-8 md:px-[8%] lg:px-[12%] pb-24 md:pb-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>001 — Regional Tagines Mapped</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>10 Styles, One Pot</h2>
          <TagineMap />
        </div>
      </section>

      {/* ═══ ALL STYLES (cards) ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Complete Atlas</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Every Region, Every Pot</h2>

          <div className="space-y-0">
            {TAGINE_STYLES.map((t, i) => {
              const isVisible = visibleSections.has(`tagine-${i}`)
              return (
                <div key={t.id} data-sid={`tagine-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                        <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums text-dwl-muted">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-serif text-[24px] italic text-dwl-black leading-[1.05]">{t.name}</h3>
                      <p className="text-[13px] text-dwl-muted mt-1">{t.nameAr}</p>
                      <p className="text-[12px] font-medium mt-2" style={{ color: t.color }}>{t.region}</p>
                      <p className="text-[11px] text-dwl-muted mt-1">{t.protein}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {t.spices.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: '#e0e0e0', color: '#888' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-[13px] font-medium mb-2 italic" style={{ color: t.color }}>{t.signature}</p>
                      <p className="text-[14px] text-dwl-body leading-relaxed">{t.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE 1 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[40vh]" style={{ background: '#F59E0B' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 3rem)', color: '#0a0a0a' }}>
            In the north, citrus and olives. Inland, lamb with prunes.
            In the mountains, heavier, brothier, built for cold nights.
            The tagine is a map of the land it comes from.
          </p>
        </div>
      </section>

      {/* ═══ SPICE PANTRY ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#A0452E' }}>003 — The Spice Pantry</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Eight Ingredients That Define the Dish</h2>
          <p className="text-[16px] max-w-[560px] leading-relaxed mb-12" style={{ color: 'rgba(0,0,0,0.4)' }}>Every tagine is built on a handful of constants. The variables — dried fruit, meat, vegetables — change by region. These don&rsquo;t.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {SPICE_PANTRY.map((s, i) => {
              const isVisible = visibleSections.has(`spice-${i}`)
              return (
                <div key={s.name} data-sid={`spice-${i}`} className="p-8 transition-all duration-700" style={{ background: '#0f0f0f', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums" style={{ color: '#A0452E' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-[22px] italic mt-2" style={{ color: '#f5f5f5' }}>{s.name}</h3>
                  <p className="text-[13px] mt-1 mb-3" style={{ color: '#666' }}>{s.nameAr} — {s.role}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#aaa' }}>{s.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ THE VESSEL ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — The Vessel</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">The Pot Is the Dish</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">The tagine is not a recipe — it&rsquo;s a vessel. The conical lid traps steam, returns condensation to the base, and slow-cooks with minimal water. In arid Morocco, this engineering is survival.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {VESSEL.map((v, i) => {
              const isVisible = visibleSections.has(`vessel-${i}`)
              return (
                <div key={v.label} data-sid={`vessel-${i}`} className="bg-white p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: '#F59E0B' }}>{v.label}</span>
                  <p className="text-[14px] text-dwl-body leading-relaxed mt-2">{v.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE 2 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#78716C' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#ffffff' }}>
            The charred bottom of a well-used tagine — scraped onto the last
            mouthful of Berber bread — is the part the cook keeps for herself.
          </p>
        </div>
      </section>

      {/* ═══ CULTURAL RULES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#7B506F' }}>005 — The Rules of the Pot</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>Six Things You Need to Know</h2>

          <div className="space-y-0">
            {CULTURAL_RULES.map((r, i) => {
              const isVisible = visibleSections.has(`rule-${i}`)
              return (
                <div key={r.rule} data-sid={`rule-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #1a1a1a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-3">
                      <span className="font-serif italic" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#7B506F', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                      <p className="font-serif text-[20px] italic mt-2" style={{ color: '#f5f5f5' }}>{r.rule}</p>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-[15px] leading-relaxed" style={{ color: '#ccc' }}>{r.explanation}</p>
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
              'Field documentation — Marrakech, Fes, Essaouira, Atlas Mountains kitchen traditions',
              'Wikipedia — Tagine (vessel origins, ibn al-Adim 13th c. recipe, Berber history)',
              'SnugBites — Moroccan Tagine Guide: regional styles, pot care (2025)',
              'National Geographic — Taste Tagines in Morocco\'s Atlas Mountains (2026)',
              'Legal Nomads — Tagine Variations Across Morocco (field documentation)',
              'Riad Alkemia — Traditional Moroccan Food: Tajine & Tanjia (tangia history)',
              'Souk Ouafa — Top 5 Traditional Dishes: Mrouzia, Kefta, Djaj Mqalli',
              'MoroccanFoode — Regional tagine variations: Marrakech, Fes, Atlas, coastal',
              'SPBrounds — Best Foods in Morocco: tangia, mrouzia, kefta (2025)',
              'Epicure & Culture — The Tajine: Morocco\'s Pride & Passion (Todra Gorge)',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#F59E0B' }}>Sources: Culinary ethnographic research</p>
          </div>
        </div>
      </section>
    </div>
  )
}
