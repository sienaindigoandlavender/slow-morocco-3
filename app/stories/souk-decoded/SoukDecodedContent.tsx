'use client'

import { useState, useEffect } from 'react'
import { SOUKS_MARRAKECH, SPATIAL_LOGIC, GUILD_SYSTEM, NEGOTIATION, HERO_STATS, ECONOMICS } from './data'

export function SoukDecodedContent() {
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
            {/* Geometric souk lattice */}
            {Array.from({ length: 12 }, (_, i) => (
              <line key={`v${i}`} x1={100 + i * 100} y1="0" x2={100 + i * 100} y2="800" stroke="#F59E0B" strokeWidth="0.3" />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={100 + i * 100} x2="1200" y2={100 + i * 100} stroke="#F59E0B" strokeWidth="0.3" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#F59E0B', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 050 — Urban Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Souk<br />Decoded
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            It looks like chaos. It isn&rsquo;t. A Moroccan souk is a thousand-year-old
            operating system — guilds, elected leaders, spatial rules, and a negotiation
            protocol that both parties know by heart. This is how it works.
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

      {/* ═══ NAMED SOUKS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Souks of Marrakech</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">10 Named Markets, One Organism</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">Marrakech has 18 distinct souk sections. Each has a name, a specialty, and a reason for being where it is. The layout isn&rsquo;t random — it&rsquo;s a medieval supply chain.</p>

          <div className="space-y-0">
            {SOUKS_MARRAKECH.map((souk, i) => {
              const isVisible = visibleSections.has(`souk-${i}`)
              return (
                <div key={souk.id} data-sid={`souk-${i}`} className="py-7 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: souk.color }} />
                        <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums text-dwl-muted">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-serif text-[24px] italic text-dwl-black leading-[1]">{souk.name}</h3>
                      <p className="text-[12px] mt-1 font-medium" style={{ color: souk.color }}>{souk.specialty}</p>
                      <p className="text-[11px] text-dwl-muted mt-1">{souk.position}</p>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-[14px] text-dwl-body leading-relaxed">{souk.note}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SPATIAL LOGIC ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>002 — The Architecture of Trade</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>Six Rules of Souk Spatial Logic</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {SPATIAL_LOGIC.map((r, i) => {
              const isVisible = visibleSections.has(`spatial-${i}`)
              return (
                <div key={r.rule} data-sid={`spatial-${i}`} className="p-8 transition-all duration-700" style={{ background: '#0f0f0f', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums" style={{ color: '#F59E0B' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-[20px] italic mt-2 mb-3" style={{ color: '#f5f5f5' }}>{r.rule}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#aaa' }}>{r.explanation}</p>
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
            Gold and spices at the center. Tanneries at the edge.
            The souk is a concentric map of value — the most
            precious things are always the most protected.
          </p>
        </div>
      </section>

      {/* ═══ GUILD SYSTEM ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — The Guild System</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Five Ranks, One Trade</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">Every souk trade is organized into a guild (hanta). Each guild elects an Amine to lead it. The hierarchy runs from apprentice to master — and the system still functions today in Marrakech and <span className="underline underline-offset-2">Fes</span>.</p>

          <div className="space-y-0">
            {GUILD_SYSTEM.map((g, i) => {
              const isVisible = visibleSections.has(`guild-${i}`)
              return (
                <div key={g.role} data-sid={`guild-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-4">
                      <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums text-dwl-muted">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-serif text-[28px] italic text-dwl-black mt-1">{g.role}</h3>
                      <p className="text-[14px] text-dwl-muted mt-1">{g.roleAr}</p>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-[15px] text-dwl-body leading-relaxed">{g.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ NEGOTIATION PROTOCOL ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#EC4899' }}>004 — The Negotiation</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Seven Steps of a Souk Transaction</h2>
          <p className="text-[16px] max-w-[560px] leading-relaxed mb-12" style={{ color: 'rgba(0,0,0,0.4)' }}>It&rsquo;s not haggling. It&rsquo;s a protocol — and both parties are performing it.</p>

          <div className="space-y-0">
            {NEGOTIATION.map((n, i) => {
              const isVisible = visibleSections.has(`neg-${i}`)
              return (
                <div key={n.number} data-sid={`neg-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #1a1a1a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-3">
                      <span className="font-serif italic" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#EC4899', lineHeight: 1 }}>{String(n.number).padStart(2, '0')}</span>
                      <p className="font-serif text-[20px] italic mt-2" style={{ color: '#f5f5f5' }}>{n.step}</p>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-[15px] leading-relaxed" style={{ color: '#ccc' }}>{n.detail}</p>
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
            A souk vendor once said: &ldquo;These? Factory-made in Sal&eacute;.
            Good quality, good price. Those? My uncle makes them in
            his workshop. Takes three times longer. Lasts forever.
            You choose what matters to you.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ ECONOMICS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — The Economics</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Numbers Behind the Maze</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {ECONOMICS.map((e) => (
              <div key={e.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[32px] md:text-[44px] text-dwl-black leading-none">{e.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{e.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{e.note}</p>
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
              'Field documentation — Marrakech medina souk mapping and guild interviews',
              'Moroccan Journeys — Souks of Marrakech: guild organization and spatial logic',
              'MarocMarrakech — 18 souk sections, 2,600+ artisan shops, Amine system',
              'How Morocco — Souk Culture: Morocco\'s Market Magic Revealed (2025)',
              'Roaming Camels Morocco — Navigating Moroccan Souks (11th century origins)',
              'Memphis Tours — Hidden Secrets of Moroccan Markets',
              'Bewildered in Morocco — Local\'s Guide to Souks (guild heritage)',
              'Top Morocco Travel — What Is a Medina (2026)',
              'UNESCO — Medina of Marrakech World Heritage listing (1985)',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#F59E0B' }}>Sources: Ethnographic research, HCP Morocco</p>
          </div>
        </div>
      </section>
    </div>
  )
}
