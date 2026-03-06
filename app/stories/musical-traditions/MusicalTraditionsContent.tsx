'use client'

import { useState, useEffect, useRef } from 'react'
import { TRADITIONS, SUB_TRADITIONS, INSTRUMENTS, HERO_STATS, KEY_NUMBERS } from './data'

export function MusicalTraditionsContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeTradition, setActiveTradition] = useState<string | null>(null)
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
        center: [-5.5, 32.5],
        zoom: 4.8,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        TRADITIONS.forEach(t => {
          const el = document.createElement('div')
          el.style.cssText = `width:16px;height:16px;background:${t.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;`
          const popup = new mapboxgl.Popup({ offset: 12, maxWidth: '280px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:14px;font-weight:700;color:#f5f5f5;">${t.name}</div>
                <div style="font-size:11px;color:${t.color};margin-top:2px;">${t.arabicName}</div>
                <div style="font-size:11px;color:#aaa;margin-top:2px;">${t.region}</div>
                <div style="font-size:11px;color:#888;margin-top:4px;">${t.era}</div>
              </div>
            `)
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([t.lng, t.lat])
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
            {/* Sound waves */}
            {Array.from({ length: 12 }, (_, i) => (
              <ellipse key={i} cx="600" cy="400" rx={60 + i * 45} ry={30 + i * 22} fill="none" stroke="#6A4C93" strokeWidth="0.3" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#6A4C93', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 066 — Cultural &amp; Sound Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Morocco&rsquo;s Musical<br />Traditions
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Five musical lineages. Sub-Saharan trance, <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Andalusian</span> courtly suites,
            <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Amazigh</span> village drums, urban protest pop, and Algerian rebellion.
            Each carried across centuries by oral tradition, and each
            still alive in tonight&rsquo;s Moroccan streets.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#6A4C93', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#6A4C93' }}>001 — The Sound Map</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Where the Music Lives</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            {TRADITIONS.map(t => (
              <div key={t.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                <span className="text-[11px]" style={{ color: '#aaa' }}>{t.name}</span>
              </div>
            ))}
          </div>
          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '480px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ FIVE TRADITIONS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — Five Lineages</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Traditions</h2>

          <div className="space-y-0">
            {TRADITIONS.map((t) => {
              const isVisible = visibleSections.has(`trad-${t.id}`)
              const subs = SUB_TRADITIONS.filter(s => s.parent === t.id)
              return (
                <div key={t.id} data-sid={`trad-${t.id}`} className="py-10 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  {/* Header row */}
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-4 h-4 rounded-full mt-2 flex-shrink-0" style={{ background: t.color }} />
                    <div>
                      <h3 className="font-serif text-[32px] italic text-dwl-black leading-tight">{t.name}</h3>
                      <p className="text-[16px] mt-0.5" style={{ color: '#999' }}>{t.arabicName}</p>
                    </div>
                    {t.unescoStatus && (
                      <span className="text-[10px] uppercase tracking-[0.06em] px-2 py-1 ml-auto flex-shrink-0" style={{ background: '#6A4C93', color: '#fff' }}>UNESCO 2019</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                    {/* Left */}
                    <div className="md:col-span-3">
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>Origin</p>
                      <p className="text-[13px] text-dwl-body mb-3">{t.origin}</p>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>Era</p>
                      <p className="text-[13px] text-dwl-body mb-3">{t.era}</p>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>Region</p>
                      <p className="text-[13px] text-dwl-body">{t.region}</p>
                    </div>

                    {/* Centre */}
                    <div className="md:col-span-5">
                      <p className="text-[14px] text-dwl-body leading-relaxed mb-4">{t.detail}</p>
                      {t.ritual && (
                        <div className="mt-4 p-4 rounded-sm" style={{ background: '#f9f7f4' }}>
                          <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: t.color }}>Ritual</p>
                          <p className="text-[13px] text-dwl-body leading-relaxed">{t.ritual}</p>
                        </div>
                      )}
                    </div>

                    {/* Right */}
                    <div className="md:col-span-4">
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: '#999' }}>Key Artists</p>
                      <div className="space-y-1 mb-4">
                        {t.keyArtists.map((a, j) => (
                          <p key={j} className="text-[12px] text-dwl-muted flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: t.color }} />
                            {a}
                          </p>
                        ))}
                      </div>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: '#999' }}>Instruments</p>
                      <div className="space-y-1">
                        {t.instruments.map((inst, j) => (
                          <p key={j} className="text-[12px] text-dwl-muted">{inst}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sub-traditions */}
                  {subs.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#e5e5e5' }}>
                      {subs.map(s => (
                        <div key={s.name} className="bg-white p-4">
                          <p className="text-[13px] font-medium text-dwl-black mb-1">{s.name}</p>
                          <p className="text-[11px] mb-1" style={{ color: t.color }}>{s.region}</p>
                          <p className="text-[11px] text-dwl-muted leading-relaxed">{s.detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#6A4C93' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#ffffff' }}>
            Our goal is to bring this music to the world.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(0,0,0,0.6)' }}>— Maalem Mokhtar Gania, on UNESCO inscription day, Essaouira, December 2019</p>
        </div>
      </section>

      {/* ═══ INSTRUMENTS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#6A4C93' }}>003 — The Instruments</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>Eight Voices</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
            {INSTRUMENTS.map((inst, i) => {
              const tradition = TRADITIONS.find(t => inst.tradition.includes(t.name.split(' ')[0]))
              const color = tradition?.color || '#6A4C93'
              const isVisible = visibleSections.has(`inst-${i}`)
              return (
                <div key={inst.name} data-sid={`inst-${i}`} className="p-5 md:p-6 transition-all duration-700" style={{ background: '#0a0a0a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <p className="text-[10px] uppercase tracking-[0.06em] mb-2" style={{ color }}>{inst.tradition} — {inst.type}</p>
                  <h3 className="text-[15px] font-medium mb-1" style={{ color: '#f5f5f5' }}>{inst.name}</h3>
                  {inst.arabicName && <p className="text-[13px] mb-2" style={{ color: '#666' }}>{inst.arabicName}</p>}
                  <p className="text-[11px] leading-relaxed" style={{ color: '#888' }}>{inst.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white">
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

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2.3rem)', color: '#D4A373' }}>
            Despite the language barrier, we manage to get along
            and play together. Music is a universal language.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Maalem Seddik El Arch, Essaouira</p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {[
              'Wikipedia — Gnawa music: Maalem lineages, guembri construction, lila ceremony, Western collaborations, Nass El Ghiwane connection',
              'UNESCO Intangible Cultural Heritage: Gnawa inscription 2019, ritual description, historical origins in slavery, fraternal practices',
              'Wikipedia — Gnawa: Bilal ibn Rabah patron saint, Bambara origins, Ganga sub-group, zawiya Sidna Bilal in Essaouira',
              'Wikipedia — Andalusi nubah: 11 surviving nubat in Morocco, 5 mizan structure, Kunnash al-Haik, muwashshah/zajal poetry forms',
              'Wikipedia — Andalusi classical music: Al-Ala, al-samaa wa-l-madih, Ziryab, fall of Granada 1492, Jewish preservation role',
              'Afropop Worldwide: Gnawa history, slave markets, Bilal narrative, Nass al-Ghiwan + Jil Jilala, secular vs spiritual performance',
              'Melodigging: Malhun definition, chaabi definition, Andalusi modal/rhythmic systems, flamenco connection',
              'Wikipedia — Music of Morocco: Ahwash, Ahidous, Guedra, Chaabi, Raï, Rrways, Sufi traditions, Nayda movement',
              'Wikipedia — Berber music: Rwais 9-segment structure, amdyaz poets, Académie Charles Cross 2021, Ammouri Mbarek, Najat Aatabou',
              'MarocMama: Cheb Mimoun, Houine Toulali, Master Musicians of Joujouka, Tinariwen Grammy, al-Aita origins',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#6A4C93' }}>Sources: UNESCO, ethnomusicological research</p>
          </div>
        </div>
      </section>
    </div>
  )
}
