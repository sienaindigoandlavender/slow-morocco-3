'use client'

import { useState, useEffect } from 'react'
import { ELEMENTS, CLIMATE_SYSTEM, VOCABULARY, HERO_STATS, RIAD_VS_DAR } from './data'

type Category = 'all' | 'structure' | 'material' | 'craft'

export default function AnatomyOfARiadContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<Category>('all')

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const filtered = filter === 'all' ? ELEMENTS : ELEMENTS.filter(e => e.category === filter)
  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'structure', label: 'Structure' },
    { key: 'material', label: 'Materials' },
    { key: 'craft', label: 'Craft' },
  ]

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Courtyard plan — four quadrants */}
            <rect x="350" y="200" width="500" height="400" fill="none" stroke="#D4A373" strokeWidth="0.5" />
            <line x1="600" y1="200" x2="600" y2="600" stroke="#D4A373" strokeWidth="0.3" />
            <line x1="350" y1="400" x2="850" y2="400" stroke="#D4A373" strokeWidth="0.3" />
            <circle cx="600" cy="400" r="30" fill="none" stroke="#D4A373" strokeWidth="0.5" />
            <circle cx="600" cy="400" r="8" fill="none" stroke="#D4A373" strokeWidth="0.3" />
            {/* Arches along courtyard */}
            {Array.from({ length: 5 }, (_, i) => (
              <path key={`arch-t-${i}`} d={`M${390 + i * 100} 200 A50 40 0 0 1 ${440 + i * 100} 200`} fill="none" stroke="#D4A373" strokeWidth="0.2" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#D4A373', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 053 — Architectural Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Anatomy<br />of a Riad
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            From the street, nothing. A plain wall, a modest door.
            Behind it: a garden, a fountain, zellige mosaics, carved cedar,
            tadelakt polished with river stones. The Moroccan riad is a
            thousand-year-old machine for privacy, beauty, and climate control.
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

      {/* ═══ ARCHITECTURAL ELEMENTS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Elements</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">12 Parts, One Organism</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-8">Every element in a riad serves at least two purposes — one functional, one spiritual. Nothing is purely decorative. Nothing is accidental.</p>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(c => (
              <button key={c.key}
                onClick={() => setFilter(c.key)}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.06em] rounded-full border transition-all"
                style={{
                  borderColor: filter === c.key ? '#D4A373' : '#e0e0e0',
                  color: filter === c.key ? '#D4A373' : '#999',
                  background: filter === c.key ? 'rgba(212,163,115,0.08)' : 'transparent',
                }}
              >{c.label}</button>
            ))}
          </div>

          <div className="space-y-0">
            {filtered.map((el, i) => {
              const isVisible = visibleSections.has(`el-${el.id}`)
              return (
                <div key={el.id} data-sid={`el-${el.id}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: el.color }} />
                        <span className="text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full border" style={{ borderColor: '#e0e0e0', color: '#999' }}>{el.category}</span>
                      </div>
                      <h3 className="font-serif text-[24px] italic text-dwl-black leading-[1.05]">{el.name}</h3>
                      <p className="text-[14px] text-dwl-muted mt-1">{el.nameAr}</p>
                      <p className="text-[13px] font-medium mt-3" style={{ color: el.color }}>{el.description}</p>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-[14px] text-dwl-body leading-relaxed">{el.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE 1 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[40vh]" style={{ background: '#D4A373' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 3rem)', color: '#0a0a0a' }}>
            The riad door opens. A dark corridor bends.
            Then light — a courtyard, a fountain, a sky.
            The passage from street to garden is the passage
            from the profane to the sacred.
          </p>
        </div>
      </section>

      {/* ═══ CLIMATE SYSTEM ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D5F8A' }}>002 — Passive Climate Engineering</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Six Systems, Zero Electricity</h2>
          <p className="text-[16px] max-w-[560px] leading-relaxed mb-12" style={{ color: 'rgba(0,0,0,0.4)' }}>A riad can be 5&ndash;8&deg;C cooler than the street outside. No air conditioning. No fans. Just geometry, water, and thermal mass working together for a thousand years.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {CLIMATE_SYSTEM.map((c, i) => {
              const isVisible = visibleSections.has(`climate-${i}`)
              return (
                <div key={c.feature} data-sid={`climate-${i}`} className="p-8 transition-all duration-700" style={{ background: '#0f0f0f', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums" style={{ color: '#2D5F8A' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-[20px] italic mt-2 mb-3" style={{ color: '#f5f5f5' }}>{c.feature}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#aaa' }}>{c.mechanism}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ RIAD VS DAR ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — Riad vs. Dar</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Not Every Courtyard House Is a Riad</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-10">A riad has a garden with four planted quadrants and a fountain. A dar has a courtyard but not necessarily a garden. The distinction matters.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ minWidth: '540px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #0a0a0a' }}>
                  <th className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted pb-3 pr-6">Feature</th>
                  <th className="text-[10px] uppercase tracking-[0.08em] pb-3 pr-6" style={{ color: '#D4A373' }}>Riad</th>
                  <th className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted pb-3">Dar</th>
                </tr>
              </thead>
              <tbody>
                {RIAD_VS_DAR.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td className="text-[13px] font-medium text-dwl-black py-4 pr-6">{row.feature}</td>
                    <td className="text-[13px] py-4 pr-6" style={{ color: '#D4A373' }}>{row.riad}</td>
                    <td className="text-[13px] text-dwl-muted py-4">{row.dar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE 2 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#D4A373' }}>
            In zellige, the artisan works blind — cutting tiles face-down,
            feeling the geometry with his hands. No two tiles are identical.
            No grout lines. The pieces fit like a jigsaw carved from memory.
          </p>
        </div>
      </section>

      {/* ═══ VOCABULARY ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — The Vocabulary</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Eight Words You Need</h2>

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
              'Field documentation — Riad di Siena, Marrakech medina architectural survey',
              'Wikipedia — Riad (architecture): Persian garden origins, chahar bagh, Andalusi connections',
              'Metropolis Magazine — The Art of the Moroccan Riad: bâyts, tadelakt, moucharabieh',
              'Experience It Tours — The Anatomy of a Moroccan Riad (2026): douriya, mashrabiya, sahn',
              'KechArt — Traditional Moroccan Riad: Architecture and Design (tadelakt, zellige, cedar)',
              'Moroccan Zest — What is a Riad: douiria, koubba, garden quadrants',
              'Yalla Visit Morocco — Moroccan Riads Explained (2025): zellige authenticity, climate logic',
              'Marrakech Riads — Brief History of Moroccan Riads: Andalusian influence, zellige, open ceiling',
              'Memphis Tours — What is a Moroccan Riad: passive cooling, moucharabieh function',
              'Roaming Camels Morocco — What is a Riad: dar vs riad distinction, Persian origins',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#D4A373' }}>Sources: Architectural surveys, field documentation</p>
          </div>
        </div>
      </section>
    </div>
  )
}
