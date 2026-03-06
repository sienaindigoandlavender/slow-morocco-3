'use client'

import { useState, useEffect, useRef } from 'react'
import { INGREDIENTS, PREPARATION, HISTORY, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

/* ───── Animated Counter ───── */
function AnimatedCounter({ target, suffix = '', duration = 2200 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const step = (now: number) => {
          const p = Math.min((now - t0) / duration, 1)
          setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export function MoroccanTeaContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeStep, setActiveStep] = useState(0)

  // Preparation step auto-advance
  useEffect(() => {
    const interval = setInterval(() => setActiveStep(s => (s + 1) % PREPARATION.length), 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Steam curves */}
            {[200, 500, 800].map((x) => (
              <g key={x}>
                <path d={`M${x},600 Q${x - 20},500 ${x + 10},400 Q${x + 30},300 ${x - 5},200`} fill="none" stroke="#2D6E4F" strokeWidth="0.5" />
                <path d={`M${x + 40},620 Q${x + 25},510 ${x + 50},410 Q${x + 60},310 ${x + 35},210`} fill="none" stroke="#2D6E4F" strokeWidth="0.3" />
              </g>
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#2D6E4F', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 072 — Food &amp; Cultural Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Anatomy<br />of Moroccan Tea
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[540px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Three ingredients from three continents. Chinese gunpowder
            green tea, Moroccan spearmint, sugar deepened by colonial
            economics. Morocco imports 60,000 tonnes of tea a year
            and grows none.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#2D6E4F', lineHeight: 1 }}>
                  {s.value}<span className="text-[16px] ml-1 opacity-50">{s.unit}</span>
                </span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THREE INGREDIENTS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Ingredients</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Three Things</h2>
          <p className="text-[14px] text-dwl-body max-w-[520px] leading-relaxed mb-10">
            Atay requires three ingredients: tea from China, mint from the garden, sugar from
            the <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">souk</span>. Water and fire do the rest. The proportions vary by household, by region,
            by season. The structure does not.
          </p>

          <div className="space-y-0">
            {INGREDIENTS.map((ing, i) => {
              const isVisible = visibleSections.has(`ing-${i}`)
              return (
                <div key={ing.name} data-sid={`ing-${i}`} className="py-8 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-10">
                    <div>
                      <div className="w-3 h-3 rounded-full mb-3" style={{ background: ing.color }} />
                      <h3 className="text-[16px] font-medium text-dwl-black">{ing.name}</h3>
                      <p className="text-[12px] font-serif italic mt-1" style={{ color: ing.color }}>{ing.arabic}</p>
                      <p className="text-[11px] mt-2" style={{ color: '#999' }}>Origin: {ing.origin}</p>
                    </div>
                    <p className="text-[13px] text-dwl-body leading-relaxed">{ing.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#2D6E4F' }}>
        <div className="max-w-[680px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#ffffff' }}>
            The first glass is gentle as life, the second strong
            as love, the third bitter as death.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.55)' }}>— Moroccan proverb</p>
        </div>
      </section>

      {/* ═══ PREPARATION — ANIMATED STEPS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D6E4F' }}>002 — The Ritual</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>How It Is Made</h2>
          <p className="text-[13px] max-w-[520px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>
            The head of the household pours. The preparation is performed in front of guests.
            Each step has a name.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
            {/* Step selector */}
            <div className="space-y-1">
              {PREPARATION.map((p, i) => (
                <button
                  key={p.step}
                  onClick={() => setActiveStep(i)}
                  className="w-full text-left px-4 py-3 rounded-sm transition-all duration-500"
                  style={{
                    background: activeStep === i ? '#2D6E4F10' : 'transparent',
                    borderLeft: activeStep === i ? '2px solid #2D6E4F' : '2px solid transparent',
                  }}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] font-mono" style={{ color: activeStep === i ? '#2D6E4F' : '#555' }}>{p.step}</span>
                    <span className="text-[13px]" style={{ color: activeStep === i ? '#f5f5f5' : '#888' }}>{p.name}</span>
                    {p.duration !== '—' && (
                      <span className="text-[10px] ml-auto" style={{ color: '#555' }}>{p.duration}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Active step detail */}
            <div className="flex items-center">
              <div
                key={activeStep}
                style={{ animation: 'fadeUp 0.5s ease forwards' }}
              >
                <span className="font-serif italic text-[48px] md:text-[64px] block leading-none" style={{ color: '#2D6E4F' }}>{PREPARATION[activeStep].step}</span>
                <h3 className="text-[20px] mt-3 mb-3" style={{ color: '#f5f5f5' }}>{PREPARATION[activeStep].name}</h3>
                <p className="text-[14px] leading-relaxed max-w-[400px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{PREPARATION[activeStep].detail}</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1 mt-8">
            {PREPARATION.map((_, i) => (
              <div key={i} className="h-[2px] flex-1 rounded-full overflow-hidden" style={{ background: '#1a1a1a' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    background: '#2D6E4F',
                    width: i < activeStep ? '100%' : i === activeStep ? '100%' : '0%',
                    opacity: i <= activeStep ? 1 : 0.15,
                    transition: 'all 0.5s ease',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HISTORY TIMELINE ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — How It Arrived</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-10">A Trade History</h2>

          <div className="space-y-0">
            {HISTORY.map((h, i) => {
              const isVisible = visibleSections.has(`hist-${i}`)
              return (
                <div key={i} data-sid={`hist-${i}`} className="py-5 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-3 md:gap-8">
                    <span className="font-serif italic text-[20px]" style={{ color: '#2D6E4F' }}>{h.year}</span>
                    <div>
                      <p className="text-[14px] font-medium text-dwl-black mb-1">{h.event}</p>
                      <p className="text-[12px] text-dwl-body leading-relaxed">{h.detail}</p>
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
        <div className="max-w-[680px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', color: '#2D6E4F' }}>
            Moroccans often say that half of their bodies are green tea.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Zhejiang Chunli Tea Co.</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D6E4F' }}>004 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {KEY_NUMBERS.map((n) => (
              <div key={n.label} className="p-6 md:p-8" style={{ background: '#0a0a0a' }}>
                <p className="font-serif italic text-[32px] md:text-[44px] leading-none" style={{ color: '#2D6E4F' }}>{n.value}</p>
                <p className="text-[12px] mt-2 font-medium" style={{ color: 'rgba(0,0,0,0.6)' }}>{n.label}</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — Sources</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Further Reading</h2>
          <p className="text-[14px] text-dwl-body max-w-[480px] leading-relaxed mb-10">
            The books that inform the history above. Each one earns its place.
          </p>

          <div className="space-y-0">
            {BIBLIOGRAPHY.map((b, i) => {
              const isVisible = visibleSections.has(`bib-${i}`)
              return (
                <div key={i} data-sid={`bib-${i}`} className="py-5 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(4px)',
                }}>
                  <p className="text-[14px] text-dwl-black">
                    <span className="font-medium">{b.author}</span>
                    <span className="font-serif italic ml-2">{b.title}</span>
                    <span className="text-[12px] ml-2" style={{ color: '#999' }}>({b.year})</span>
                  </p>
                  <p className="text-[12px] text-dwl-body mt-1">{b.detail}</p>
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
              'Wikipedia — Maghrebi mint tea: gunpowder tea introduction 18th–19th C, Crimean War, spearmint (na\'na\'), three glasses minimum, Sufi boycott',
              'Sefrou Museum Blog — "A History of Moroccan Tea": Zhejiang Province origin, Indian plantations produced black not green, mint hides low-quality tea, French sugar deepening, na\'na\' varieties',
              'Maison NANA1807 — "Atay: The Story of Moroccan Tea": 9th C Arab merchant evidence, Queen Anne/Moulay Ismail gift, "tea division" at court, trans-Saharan/Indian Ocean routes, colonial sugar critique',
              'Tea & Coffee Trade Journal (2023, 2024): AMITC data 82,000 tonnes average, 46% gunpowder/54% Chunmee share, 1.85 kg per capita, Zhejiang #1 province, 25% of China\'s green tea exports',
              'Statista: Morocco 59,830 tonnes from China (2023), 16% of China\'s tea exports, China\'s largest tea-export partner',
              'Zhejiang Chunli Tea: 95% of Morocco\'s tea from China, 90% from Zhejiang, Shaoxing half of that, "half their bodies are green tea"',
              'Tea & Coffee Trade Journal (2020): Morocco world\'s biggest green tea importer, 70,000 tonnes (2018), 35% increase',
              'G Adventures: Crimean War origin story, foam (rghwa) test, pouring from height, "gunpowder tea" name persistence',
              'Terzaluna / Stories About Tea / Finest Organic Tea: preparation steps (spirit, rinse, marriage, steep, pour), berrad/sinia terminology',
              'RankingRoyals: Morocco 8th largest tea importer globally, $207M (2021), China $214M of imports',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#2D6E4F' }}>Sources: FAO, ITC</p>
          </div>
        </div>
      </section>
    </div>
  )
}
