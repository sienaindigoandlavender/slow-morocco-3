'use client'

import { useState, useEffect, useRef } from 'react'
import { BIOSPHERE_ZONES, PRODUCTS, COOPERATIVE_STATS, RECOGNITIONS, HERO_STATS, KEY_NUMBERS } from './data'

/* ── Animated counter: counts up on scroll ── */
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
          const ease = 1 - Math.pow(1 - p, 3)
          setCount(Math.round(ease * target))
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

export default function ArganTriangleContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [extractionStep, setExtractionStep] = useState(0)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  /* ── Animated extraction cycle: harvest → crack → press → oil ── */
  useEffect(() => {
    const interval = setInterval(() => setExtractionStep(s => (s + 1) % 4), 2400)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* ── Mapbox with pulsing markers ── */
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return
    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      // @ts-ignore
      await import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-9.35, 30.45], zoom: 7.6, interactive: true })
      mapRef.current = map
      map.on('load', () => {
        BIOSPHERE_ZONES.forEach(z => {
          const el = document.createElement('div')
          el.innerHTML = `<div style="position:relative;width:22px;height:22px;"><div style="position:absolute;inset:0;background:${z.color};border-radius:50%;opacity:0.25;animation:pulse-ring 2.5s ease-out infinite;"></div><div style="position:absolute;inset:3px;background:${z.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;"></div></div>`
          el.style.cursor = 'pointer'
          const popup = new mapboxgl.Popup({ offset: 12, maxWidth: '280px' }).setHTML(`<div style="font-family:IBM Plex Mono,monospace;padding:4px;"><div style="font-size:13px;font-weight:700;color:#f5f5f5;">${z.name}</div><div style="font-size:10px;color:#888;margin-top:4px;">${z.detail}</div></div>`)
          markersRef.current.push(new mapboxgl.Marker({ element: el }).setLngLat([z.lng, z.lat]).setPopup(popup).addTo(map))
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  const extractionSteps = [
    { label: 'Harvest', desc: '~8 kg fruit per tree per year. Fruit falls in July — black and dry. Rights controlled by village law.', icon: '🫒' },
    { label: 'Crack', desc: 'Hard nut cracked by hand between two stones. Most labour-intensive step. Passed mother to daughter.', icon: '🪨' },
    { label: 'Press', desc: 'Roasted kernels ground to paste in stone rotary quern. Paste squeezed by hand to extract oil.', icon: '⚙️' },
    { label: 'Oil', desc: '40 kg dried fruit → 1 litre of oil. Five trees for a single litre. Liquid gold.', icon: '💧' },
  ]

  return (
    <div className="-mt-16">
      <style>{`
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.3; } 100% { transform: scale(2.8); opacity: 0; } }
        @keyframes oil-drip { 0% { transform: translateY(-10px); opacity: 0; } 35% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }
        @keyframes breathe { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.05]" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 14 }, (_, i) => {
              const cx = 60 + i * 90; const cy = 380 + Math.sin(i * 0.8) * 60
              return (
                <g key={i} style={{ animation: `breathe ${3 + i * 0.3}s ease-in-out infinite` }}>
                  <line x1={cx} y1={cy + 70} x2={cx} y2={cy - 10} stroke="#5C7C3E" strokeWidth="0.8" />
                  <line x1={cx} y1={cy + 10} x2={cx - 22} y2={cy - 30} stroke="#5C7C3E" strokeWidth="0.4" />
                  <line x1={cx} y1={cy + 10} x2={cx + 26} y2={cy - 28} stroke="#5C7C3E" strokeWidth="0.4" />
                  <ellipse cx={cx - 22} cy={cy - 32} rx="4" ry="5.5" fill="none" stroke="#5C7C3E" strokeWidth="0.5" />
                  <ellipse cx={cx + 26} cy={cy - 30} rx="3.5" ry="5" fill="none" stroke="#5C7C3E" strokeWidth="0.5" />
                </g>
              )
            })}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#5C7C3E', animation: 'fadeUp 1s ease 0.3s forwards' }}>Data Module 070 — Agricultural &amp; Economic Intelligence</p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>The Argan<br />Triangle</h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            The only place on earth argan trees grow. Twenty million trees across 830,000 hectares of UNESCO-protected biosphere, from Essaouira to Agadir to the Anti-Atlas. The women-led economy of Morocco&rsquo;s liquid gold.
          </p>
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#5C7C3E', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LIVE: ARGAN SEASON STATUS ═══ */}
      {(() => {
        const month = new Date().getMonth() // 0-indexed
        const seasons: Record<string, { status: string; detail: string }> = {
          dormant: { status: 'Dormant', detail: 'Trees conserving energy. Deep roots drawing moisture from aquifers. Goats kept out of groves by wardens.' },
          flowering: { status: 'Flowering', detail: 'Tiny white-green flowers appearing. Bees active in argan groves — wild honey harvesting season.' },
          fruiting: { status: 'Fruit developing', detail: 'Olive-shaped fruits growing on thorny branches. Still green. Village wardens guarding trees.' },
          harvest: { status: 'Harvest season', detail: 'Fruit falling — black and dry. Women collecting from forest floor. Rights controlled by village law and tradition.' },
          processing: { status: 'Processing season', detail: 'Cooperatives at full capacity. Cracking, roasting, pressing. Fresh oil flowing. Peak amlou production.' },
        }
        const seasonKey = [0, 1].includes(month) ? 'dormant' : [2, 3].includes(month) ? 'flowering' : [4, 5].includes(month) ? 'fruiting' : [6, 7, 8].includes(month) ? 'harvest' : 'processing'
        const s = seasons[seasonKey]
        return (
          <section style={{ background: '#0a0a0a' }}>
            <div className="px-8 md:px-[8%] lg:px-[12%] pt-10">
              <div className="p-5 rounded-sm" style={{ border: '1px solid #5C7C3E33', background: '#5C7C3E08' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#5C7C3E', boxShadow: '0 0 8px #5C7C3E', animation: 'breathe 2s ease-in-out infinite' }} />
                  <span className="text-[11px] uppercase tracking-[0.1em] font-medium" style={{ color: '#5C7C3E' }}>Right Now — {s.status}</span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.5)' }}>{s.detail}</p>
              </div>
            </div>
          </section>
        )
      })()}

      {/* ═══ ANIMATED EXTRACTION PROCESS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>001 — The Process</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>From Fruit to Oil</h2>

          <div className="flex items-center justify-between gap-2 md:gap-4 mb-6">
            {extractionSteps.map((step, i) => (
              <div key={step.label} className="flex-1 text-center transition-all duration-700" style={{ opacity: extractionStep === i ? 1 : 0.15, transform: extractionStep === i ? 'scale(1.05)' : 'scale(0.9)' }}>
                <div className="text-[36px] md:text-[52px] mb-2" style={{ filter: extractionStep === i ? 'drop-shadow(0 0 16px rgba(34,197,94,0.5))' : 'none', transition: 'filter 0.5s ease' }}>{step.icon}</div>
                <p className="text-[12px] font-medium transition-colors duration-400" style={{ color: extractionStep === i ? '#5C7C3E' : '#444' }}>{step.label}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-[3px] mb-5" style={{ background: '#1a1a1a', borderRadius: '2px' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #5C7C3E, #F59E0B)', borderRadius: '2px', width: `${((extractionStep + 1) / 4) * 100}%`, transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </div>

          <p className="text-[13px] leading-relaxed min-h-[3rem]" style={{ color: 'rgba(0,0,0,0.5)' }}>{extractionSteps[extractionStep].desc}</p>

          {/* Oil drop animation on final step */}
          <div className="flex justify-center mt-4 h-10">
            {extractionStep === 3 && (
              <svg width="24" height="36" viewBox="0 0 24 36">
                <defs><radialGradient id="oilg" cx="50%" cy="40%" r="50%"><stop offset="0%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#B45309" /></radialGradient></defs>
                <path d="M12 4 Q12 4 7 18 Q2 28 12 32 Q22 28 17 18 Z" fill="url(#oilg)" style={{ animation: 'oil-drip 1.8s ease-in-out infinite' }} />
              </svg>
            )}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] pb-24 md:pb-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>002 — The Biosphere</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Arganeraie Biosphere Reserve</h2>
          <p className="text-[13px] max-w-[600px] leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>~2.5 million hectares designated by UNESCO in 1998. Morocco&rsquo;s first Biosphere Reserve. Pulsing markers show production zones across the southern High Atlas and Anti-Atlas.</p>
          <div className="flex flex-wrap gap-4 mb-6">
            {[{ label: 'Major production', color: '#5C7C3E' }, { label: 'Heritage & conservation', color: '#F59E0B' }, { label: 'Processing hub', color: '#9CA3AF' }].map(l => (
              <div key={l.label} className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: l.color, boxShadow: `0 0 8px ${l.color}55` }} /><span className="text-[11px]" style={{ color: '#aaa' }}>{l.label}</span></div>
            ))}
          </div>
          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '460px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ THE TREE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — The Tree</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-8">Argania spinosa</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10" data-sid="tree" style={{ opacity: visibleSections.has('tree') ? 1 : 0, transform: visibleSections.has('tree') ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.7s ease' }}>
            <div className="md:col-span-7">
              <p className="text-[14px] text-dwl-body leading-relaxed mb-4">Tashelhit name: <em>argan</em> (ⴰⵔⴳⴰⵏ). A thorny, gnarled tree native to the semi-arid Souss Valley, the Chiadma and Haha regions, and the Anti-Atlas foothills. Grows 8–10 metres high. Crown circumference up to 70 metres. Lives approximately 200 years. Deep roots reach 30 metres into underground aquifers.</p>
              <p className="text-[14px] text-dwl-body leading-relaxed mb-4">Each tree produces ~8 kg of fruit per year. The fruit is olive-shaped, bitter, containing 1–3 oil-rich kernels. Forty kilograms of dried fruit produces just one litre of oil. Attempts to cultivate argan in the US, Israel, and Mexico have largely failed.</p>
              <p className="text-[14px] text-dwl-body leading-relaxed">Morocco&rsquo;s second-largest forest resource after holm oak. A bastion against desertification: stabilises soil, shelters wildlife, prevents Saharan expansion. Goats famously climb argan trees to feed on fruit — their droppings leave shells intact while returning nutrients to the forest floor.</p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Scientific name', value: 'Sideroxylon spinosum (syn. Argania spinosa)' },
                { label: 'Endemic range', value: 'Southwestern Morocco (+ Tindouf, Mauritania)' },
                { label: 'Total trees', value: '~20 million across 830,000 hectares' },
                { label: 'Lifespan', value: 'Up to 200 years' },
                { label: 'Root depth', value: 'Up to 30 metres' },
                { label: 'Heat tolerance', value: '50°C' },
                { label: 'Fruit → oil', value: '~30 kg fruit per litre of oil' },
                { label: 'Forest decline', value: '~50% lost in 100 years. 100→30 trees/ha.' },
              ].map((item, i) => (
                <div key={i} data-sid={`spec-${i}`} className="flex gap-3" style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '8px', opacity: visibleSections.has(`spec-${i}`) ? 1 : 0, transform: visibleSections.has(`spec-${i}`) ? 'translateX(0)' : 'translateX(12px)', transition: `all 0.5s ease ${i * 80}ms` }}>
                  <span className="text-[11px] uppercase tracking-[0.04em] w-[110px] flex-shrink-0" style={{ color: '#5C7C3E' }}>{item.label}</span>
                  <span className="text-[12px] text-dwl-body">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#5C7C3E' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#0a0a0a' }}>The argan tree is a true bastion against desertification. It can reach 10 metres in height and live for 200 years.</p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(10,10,10,0.5)' }}>— United Nations, International Day of Argania</p>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>004 — What Argan Becomes</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>The Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {PRODUCTS.map((p, i) => {
              const vis = visibleSections.has(`prod-${i}`)
              return (
                <div key={p.name} data-sid={`prod-${i}`} className="p-6 md:p-8" style={{ background: '#0a0a0a', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(10px)', transition: `all 0.6s ease ${i * 100}ms` }}>
                  <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: p.color }}>{p.type}</span>
                  <h3 className="text-[16px] font-medium mt-1 mb-2" style={{ color: '#f5f5f5' }}>{p.name}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: '#888' }}>{p.detail}</p>
                  <div className="mt-3 h-[2px]" style={{ background: p.color, width: vis ? '60px' : '0px', transition: `width 0.7s ease ${i * 100 + 400}ms` }} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ COOPERATIVES — Animated counters ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — The Women&rsquo;s Economy</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Cooperatives</h2>
          <p className="text-[14px] text-dwl-body max-w-[600px] leading-relaxed mb-10">Rural Amazigh women lead the entire extraction process through knowledge transmitted across generations. Cooperatives provide fair wages, literacy training, healthcare access, and community reinvestment. But industrial-scale extraction and multinational sourcing are pushing artisanal producers to the margins.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-8" style={{ background: '#e5e5e5' }}>
            {[
              { n: 1014, label: 'Cooperatives', suffix: '' },
              { n: 688, label: 'Women-led', suffix: '' },
              { n: 13774, label: 'Workers', suffix: '+' },
              { n: 3000000, label: 'People supported', suffix: '+' },
            ].map((c) => (
              <div key={c.label} className="bg-white p-6 md:p-8 text-center">
                <p className="font-serif italic text-[32px] md:text-[44px] text-dwl-black leading-none"><AnimatedCounter target={c.n} suffix={c.suffix} /></p>
                <p className="text-[11px] text-dwl-gray mt-2 uppercase tracking-[0.06em]">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COOPERATIVE_STATS.map((c, i) => {
              const vis = visibleSections.has(`coop-${i}`)
              return (
                <div key={c.label} data-sid={`coop-${i}`} className="p-5" style={{ background: '#fafafa', borderLeft: '3px solid #5C7C3E', opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-10px)', transition: `all 0.5s ease ${i * 80}ms` }}>
                  <p className="text-[14px] font-medium text-dwl-black">{c.stat} <span className="text-[12px] text-dwl-gray font-normal">— {c.label}</span></p>
                  <p className="text-[11px] text-dwl-muted mt-1">{c.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#111' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#5C7C3E' }}>Everyone wants their share of the value chain and there is less and less room for women.</p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Jamila Idbourous, President, Union of Women&rsquo;s Cooperatives (The Ecologist, 2025)</p>
        </div>
      </section>

      {/* ═══ RECOGNITIONS TIMELINE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">006 — Global Recognition</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-10">Five Designations</h2>
          <div className="space-y-0">
            {RECOGNITIONS.map((r, i) => {
              const vis = visibleSections.has(`recog-${i}`)
              return (
                <div key={i} data-sid={`recog-${i}`} className="py-5" style={{ borderTop: '1px solid #e5e5e5', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(8px)', transition: `all 0.6s ease ${i * 100}ms` }}>
                  <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-3 md:gap-8">
                    <div><span className="font-serif italic text-[24px]" style={{ color: '#5C7C3E' }}>{r.year}</span><p className="text-[11px] mt-1" style={{ color: '#999' }}>{r.body}</p></div>
                    <div><p className="text-[14px] font-medium text-dwl-black mb-1">{r.designation}</p><p className="text-[12px] text-dwl-body leading-relaxed">{r.detail}</p></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>007 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {KEY_NUMBERS.map((n, i) => (
              <div key={n.label} data-sid={`kn-${i}`} className="p-6 md:p-8" style={{ paddingTop: i % 2 === 1 ? '24px' : '0',  background: '#0a0a0a', opacity: visibleSections.has(`kn-${i}`) ? 1 : 0, transform: visibleSections.has(`kn-${i}`) ? 'translateY(0)' : 'translateY(6px)', transition: `all 0.5s ease ${i * 80}ms` }}>
                <p className="font-serif italic text-[32px] md:text-[44px] leading-none" style={{ color: '#5C7C3E' }}>{n.value}</p>
                <p className="text-[12px] mt-2 font-medium" style={{ color: 'rgba(0,0,0,0.6)' }}>{n.label}</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.note}</p>
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
            {['United Nations — International Day of Argania: 2021 resolution, 113 co-sponsors, tree biology','UNESCO — Arganeraie Biosphere Reserve (1998): ~2.5M hectares, 8 provinces','UNESCO — Intangible Cultural Heritage (2014): Argan practices inscribed','FAO — GIAHS (2018): Argan agro-sylvo-pastoral system, Ait Souab–Ait Mansour','Wikipedia — Argan oil: 40 kg/litre, UCFA 22 cooperatives, ~300 firms Essaouira','Wikipedia — Sideroxylon spinosum: 8,280 km², 50% loss, Tashelhit vocabulary','Morocco World News: 20M trees, roots 30m, crown 70m, ANDZOA 2010','The Ecologist (Nov 2025): Idbourous quote, cooperative margins, Covid price surge','Springer Human Ecology (2023): UCFA/FIFARGANE/FNFARGNANE unions, 8 provinces','Market.us / IMARC / Persistence: Global market $370M (2024), CAGR 9–12%'].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#5C7C3E' }}>Sources: UNESCO, HCEFLCD Morocco</p>
          </div>
        </div>
      </section>
    </div>
  )
}
