'use client'

import { useState, useEffect, useRef } from 'react'
import { RUG_TRADITIONS, SYMBOLS, NATURAL_DYES, WEAVING_TECHNIQUES, HERO_STATS, KEY_NUMBERS } from './data'

const TECHNIQUES = ['All', 'Hand-knotted pile', 'Flat-weave (kilim)', 'Mixed technique', 'Upcycled / rag rug', 'Embroidered flat-weave'] as const

export default function CarpetAtlasContent() {
  const [activeTechnique, setActiveTechnique] = useState<string>('All')
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  const filtered = activeTechnique === 'All' ? RUG_TRADITIONS : RUG_TRADITIONS.filter(r => r.technique === activeTechnique)

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
        center: [-5.2, 32.2],
        zoom: 5.2,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        RUG_TRADITIONS.forEach(r => {
          const el = document.createElement('div')
          const isNeutral = ['#F5F0E6', '#E8DFD0', '#A1887F'].includes(r.color)
          el.style.cssText = `width:14px;height:14px;background:${r.color};border-radius:50%;border:2px solid ${isNeutral ? '#666' : '#0a0a0a'};cursor:pointer;`
          const popup = new mapboxgl.Popup({ offset: 12, maxWidth: '280px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:14px;font-weight:700;color:#f5f5f5;">${r.name}</div>
                <div style="font-size:11px;color:#D4A373;margin-top:2px;">${r.technique}</div>
                <div style="font-size:11px;color:#aaa;margin-top:2px;">${r.region}</div>
                <div style="font-size:11px;color:#888;margin-top:4px;">${r.motifs.slice(0, 140)}…</div>
              </div>
            `)
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([r.lng, r.lat])
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
            {/* Lozenge / diamond grid pattern */}
            {Array.from({ length: 6 }, (_, r) =>
              Array.from({ length: 10 }, (_, c) => {
                const cx = 120 + c * 100 + (r % 2 === 0 ? 0 : 50)
                const cy = 150 + r * 100
                return <polygon key={`${r}-${c}`} points={`${cx},${cy - 40} ${cx + 30},${cy} ${cx},${cy + 40} ${cx - 30},${cy}`} fill="none" stroke="#D4A373" strokeWidth="0.4" />
              })
            )}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#D4A373', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 065 — Textile &amp; Cultural Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Carpet<br />Atlas
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Every diamond is a womb. Every zigzag is water. Every cross
            wards off djinn. For millennia, <span className="underline underline-offset-2">Amazigh</span> women have woven
            autobiography into wool — encoding fertility, protection,
            and identity in a visual language older than writing itself.
            No two rugs are identical. This is the atlas of where they come from.
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
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#D4A373' }}>001 — Regional Origins</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Where the Looms Are</h2>
          <p className="text-[14px] mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>12 weaving traditions. Each dot is a tribal territory. Click for details.</p>
          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '500px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ RUG TRADITIONS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — Every Tradition</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-8">The Weaving Families</h2>

          <div className="flex flex-wrap gap-2 mb-10">
            {TECHNIQUES.map(t => (
              <button key={t} onClick={() => setActiveTechnique(t)} className="text-[11px] uppercase tracking-[0.06em] px-3 py-1.5 transition-all" style={{ background: activeTechnique === t ? '#0a0a0a' : 'transparent', color: activeTechnique === t ? '#D4A373' : '#999', border: '1px solid', borderColor: activeTechnique === t ? '#0a0a0a' : '#ddd' }}>
                {t === 'All' ? `All (${RUG_TRADITIONS.length})` : t}
              </button>
            ))}
          </div>

          <div className="space-y-0">
            {filtered.map((r, i) => {
              const isVisible = visibleSections.has(`rug-${r.id}`)
              return (
                <div key={r.id} data-sid={`rug-${r.id}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    {/* Left column */}
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: r.color, border: ['#F5F0E6','#E8DFD0','#A1887F'].includes(r.color) ? '1px solid #ccc' : 'none' }} />
                        <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: '#D4A373' }}>{r.technique}</span>
                      </div>
                      <h3 className="font-serif text-[26px] italic text-dwl-black leading-tight">{r.name}</h3>
                      {r.arabicName && <p className="text-[14px] mt-0.5" style={{ color: '#999' }}>{r.arabicName}</p>}
                      <p className="text-[12px] text-dwl-muted mt-2">{r.region}</p>
                      <p className="text-[12px] text-dwl-muted">Tribe: {r.tribe}</p>
                      <p className="text-[12px] text-dwl-muted">Material: {r.material}</p>
                      <p className="text-[12px] text-dwl-muted">Pile: {r.pile}</p>
                      <p className="text-[12px] text-dwl-muted">Palette: {r.palette}</p>
                    </div>
                    {/* Centre column */}
                    <div className="md:col-span-5">
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: '#999' }}>Motifs</p>
                      <p className="text-[13px] text-dwl-body leading-relaxed mb-3">{r.motifs}</p>
                      <p className="text-[14px] text-dwl-body leading-relaxed">{r.detail}</p>
                    </div>
                    {/* Right column */}
                    <div className="md:col-span-4">
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: '#999' }}>Today</p>
                      <p className="text-[13px] text-dwl-body leading-relaxed">{r.modernNote}</p>
                    </div>
                  </div>
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
            The loom is a sacred boundary between the material and
            spiritual worlds. The act of weaving connects the weaver
            to her ancestors and the land.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(10,10,10,0.5)' }}>— Amazigh weaving tradition</p>
        </div>
      </section>

      {/* ═══ SYMBOLS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#D4A373' }}>003 — The Visual Language</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Symbols Older Than Writing</h2>
          <p className="text-[14px] max-w-[560px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>12 core motifs encoded by Amazigh women for millennia. Each is a prayer woven in wool — protection, fertility, identity, strength.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
            {SYMBOLS.map((s, i) => {
              const isVisible = visibleSections.has(`sym-${i}`)
              return (
                <div key={s.id} data-sid={`sym-${i}`} className="p-5 md:p-6 transition-all duration-700" style={{ background: '#0a0a0a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <span className="text-[36px] block mb-3" style={{ color: '#D4A373' }}>{s.shape}</span>
                  <h3 className="text-[13px] font-medium mb-1" style={{ color: '#f5f5f5' }}>{s.name}</h3>
                  <p className="text-[11px] font-medium mb-2" style={{ color: '#D4A373' }}>{s.meaning}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: '#888' }}>{s.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ NATURAL DYES ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — Colour from the Earth</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-10">Natural Dyes</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: '#e5e5e5' }}>
            {NATURAL_DYES.map((d) => (
              <div key={d.source} className="bg-white p-5 md:p-6">
                <div className="w-10 h-10 rounded-full mb-3" style={{ background: d.color }} />
                <h3 className="text-[13px] font-medium text-dwl-black mb-1">{d.source}</h3>
                <p className="text-[12px] font-medium mb-1" style={{ color: '#D4A373' }}>{d.produces}</p>
                <p className="text-[11px] text-dwl-muted">{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WEAVING TECHNIQUES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#D4A373' }}>005 — How They&rsquo;re Made</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>Six Techniques</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {WEAVING_TECHNIQUES.map((t, i) => {
              const isVisible = visibleSections.has(`tech-${i}`)
              return (
                <div key={t.name} data-sid={`tech-${i}`} className="p-6 md:p-8 transition-all duration-700" style={{ background: '#0a0a0a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <h3 className="text-[14px] font-medium mb-2" style={{ color: '#D4A373' }}>{t.name}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#aaa' }}>{t.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#D4A373' }}>
            Each carpet carries the weaver&rsquo;s desire to protect
            the human spirit from negative energy and shield the human
            body from the elements.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Benisouk</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">006 — Key Numbers</p>
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
              'Wikipedia — Moroccan rugs: Mid-century modern adoption, Le Corbusier, primitivism appeal, Beni Ourain from Rif near Taza',
              'Casa Amar style guide: Beni Ourain, Beni Mrirt, Azilal, Kilim/Hanbel, Zanafi, Akhnif, Glaoui technique definitions and materials',
              'Benisouk: Regional kilim variations, southern vs northern colour palettes, Boucherouite origins, Amazigh symbol meanings',
              'Nouvelle Nomad: Beni M\'Guild double loop knots / reversibility, Boujaad characteristics, Taznakht wool quality, Boucherouite vintage dating',
              '1stDibs / The Study: Beni M\'Guild indigo tradition, colour symbolism (red/blue/yellow/green), Frank Lloyd Wright / Fallingwater connection',
              'Salam Hello: Zanafi counting technique, reversibility, Zemmour Hanbel thin-yarn tradition, Glaoui three-technique construction',
              'MoroccanZest: Beni Ourain 17 tribes confederation, 9th C settlement, Azilal matriarch tradition, Boujaad natural dyes, kilim durability',
              'Afrikesh: Symbol meanings — lozenge (femininity), eight-pointed star (ghost-catching), beauty symbol, lion\'s paw (strength)',
              'Iwziwn: Weaving techniques (pile/flat/mixed/symmetrical/asymmetrical knots), natural dye sources, regional specializations',
              'Doris Leslie Blau: Tribal rug overview, Boucherouite from French \'boucher\' (rag/scrap), versatility of eco-friendly construction',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#D4A373' }}>Sources: Ethnographic field research</p>
          </div>
        </div>
      </section>
    </div>
  )
}
