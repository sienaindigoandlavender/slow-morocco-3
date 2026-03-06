'use client'

import { useState, useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────
// Hammam Culture — The Social Architecture of the Bathhouse
// Module 074 — Cultural Intelligence
// ─────────────────────────────────────────────────

interface Room {
  name: string
  arabic: string
  temp: string
  detail: string
  phase: string
}

const ROOMS: Room[] = [
  { name: 'Al-Barrani', arabic: 'البرّاني', temp: '~25°C', detail: 'The outer room. Changing, storage. You undress here — down to underwear. Attendant gives you a bucket, kessa glove, plastic sandals. Belongings stay with the reception attendant.', phase: 'Arrival' },
  { name: 'Al-Wustani', arabic: 'الوسطاني', temp: '~35°C', detail: 'The warm room. Your body adjusts to the heat. Pores begin to open. You sit on the tiled floor and pour warm water from your bucket. This is where the conversation starts.', phase: 'Warming' },
  { name: 'Al-Dakhli', arabic: 'الداخلي', temp: '~45°C', detail: 'The hot room. The centre of the hammam. Heated from below by the furnace (hypocaust system — Roman-origin underfloor heating). This is where the ritual happens: soap, scrub, clay. You stay 20–40 minutes.', phase: 'The ritual' },
  { name: 'Al-Jawwani', arabic: 'الجوّاني', temp: 'Fire', detail: 'The furnace room. Not accessible to the public. Wood-fired boiler heats water and sends hot air through channels beneath the floors. Tended by the farnatchi. Also where the tangia cooks.', phase: 'Hidden engine' },
]

interface RitualStep {
  name: string
  duration: string
  detail: string
}

const RITUAL: RitualStep[] = [
  { name: 'The Warm-Up', duration: '10–15 min', detail: 'Sit in the warm room. Pour water. Let heat loosen the muscles. The atmosphere is hot and humid — not steamy like a Turkish bath. Light filters through small glass oculi in the domed ceiling.' },
  { name: 'Savon Beldi', duration: '10–15 min', detail: 'Move to the hot room. Slather the body in black soap — a thick, dark paste made from olive oil and macerated black olives, sometimes infused with eucalyptus. Leave it on. It softens the skin and lifts impurities to the surface.' },
  { name: 'The Scrub (Gommage)', duration: '15–20 min', detail: 'The kessala (attendant) scrubs every inch of your body with the kessa glove — firm, rhythmic strokes in long sweeping arcs. Grey rolls of dead skin appear. This is the core of the hammam. Blood circulates. The skin breathes.' },
  { name: 'Ghassoul Clay', duration: '10–15 min', detail: 'Mineral-rich clay from the Middle Atlas, mined since the 8th century. Mixed with water, rose petals, or herbs. Applied as a body and hair mask. Absorbs impurities, delivers magnesium, calcium, silica. Rinse with warm water.' },
  { name: 'The Rinse', duration: '5 min', detail: 'Buckets of warm water poured over you — no showerheads in a traditional hammam. No pools either. Islam considers still water unclean. Running water only. Sometimes followed by orange-flower water or lemon juice as a skin tonic.' },
  { name: 'Argan Oil & Rest', duration: 'Open', detail: 'Move to the cool room. Argan oil massaged into the skin — rich in vitamin E, omega-6, omega-9. Rehydrate with mint tea. Sit. Talk. The hammam is not rushed. Two to three hours is normal. The exit is as important as the entrance.' },
]

interface Product {
  name: string
  arabic: string
  origin: string
  detail: string
}

const PRODUCTS: Product[] = [
  { name: 'Savon Beldi (Black Soap)', arabic: 'صابون بلدي', origin: 'Atlantic coast olive groves', detail: 'Thick paste of olive oil and macerated black olives. Sometimes infused with eucalyptus. Softens skin, lifts impurities, prepares for exfoliation. Rich in vitamin E. Used on the whole body including face. Functions as cleanser, moisturiser, and therapy.' },
  { name: 'Kessa Glove', arabic: 'كيس', origin: 'Woven crepe fabric', detail: 'Rough-textured exfoliating mitt worn on the hand. The tool of the kessala. Firm circular strokes remove dead skin cells, unclog pores, stimulate blood flow. The most transformative moment of the hammam.' },
  { name: 'Ghassoul Clay', arabic: 'غاسول', origin: 'Middle Atlas, Moulouya Valley', detail: 'Saponiferous clay mined since the 8th century. Rich in magnesium, iron, potassium, silica. Mixed with water, rose petals, cloves, chamomile. Applied to body and hair. Absorbs impurities, tightens pores, regulates sebum. The only commercially viable deposit in the world.' },
  { name: 'Argan Oil', arabic: 'زيت أركان', origin: 'Argan Triangle, Souss-Massa', detail: 'Cold-pressed from unroasted argan kernels. Rich in vitamin E, essential fatty acids. Applied after the scrub to lock in moisture. Soothing, anti-ageing, hydrating. Often mixed with rose water and orange blossom.' },
  { name: 'Rose Water', arabic: 'ماء الورد', origin: 'Kelaat M\'Gouna, Dadès Valley', detail: 'Distilled from Damascena roses. Used as a skin tonic after rinsing. Calms the skin, closes pores, adds fragrance. The Dadès Valley Rose Festival (May) celebrates the harvest.' },
  { name: 'Henna', arabic: 'حنّة', origin: 'Grown across Morocco', detail: 'Applied to hair and hands in some hammam traditions, especially pre-wedding rituals. Conditions hair, stains skin with intricate patterns. The bridal hammam is incomplete without it.' },
]

interface NeighborhoodElement {
  name: string
  role: string
}

const FIVE_ELEMENTS: NeighborhoodElement[] = [
  { name: 'Mosque', role: 'Prayer and spiritual centre. The hammam exists in its orbit — built nearby to facilitate ablutions before Friday prayer.' },
  { name: 'Hammam', role: 'Communal bathing, social gathering, ritual purification. Historically the only public space where women gathered freely.' },
  { name: 'Fountain (Saqaya)', role: 'Public water supply. Running water — essential for both wudu (minor ablution) and daily needs.' },
  { name: 'Madrasa', role: 'Religious school. Education and Quranic study. Part of the civic infrastructure of every neighbourhood.' },
  { name: 'Communal Bakery (Ferran)', role: 'Neighbourhood bread oven. Families bring dough to be baked. The farnatchi who tends the hammam furnace often tends this fire too.' },
]

interface HistoryEvent {
  year: string
  event: string
  detail: string
}

const HISTORY: HistoryEvent[] = [
  { year: 'c. 2nd C', event: 'Roman thermae in North Africa', detail: 'Roman bathhouses built across Mauretania Tingitana — Volubilis, Lixus, Banasa. Cold pools (frigidarium), warm rooms (tepidarium), hot rooms (caldarium). The three-room layout that persists in Moroccan hammams today.' },
  { year: 'c. 8th C', event: 'Earliest Islamic hammam in Morocco', detail: 'Ruins at Volubilis — a former Roman colony — contain the oldest known Islamic hammam in Morocco. Built during the Idrisid period (788–974). Roman structure adapted for Islamic needs: no pools, running water only.' },
  { year: '11th C', event: 'Al-Ghazali codifies hammam conduct', detail: 'Abu Hamid al-Ghazali writes "The Mysteries of Purity" in his Ihya Ulum al-Din. Details proper technique for ghusl (full-body ablution). Frames the hammam as primarily male; women enter only after childbirth or illness. Moroccan practice diverged from this restriction.' },
  { year: '12th–13th C', event: 'Almohad and Marinid expansion', detail: 'Hammams multiply across Fez, Marrakech, Meknès, Rabat. Magda Sibley (University of Leeds) finds that Islamic architecture specialists consider the hammam second in importance only to the mosque in the medina.' },
  { year: '1562', event: 'Mouassine Hammam, Marrakech', detail: 'Built by Sultan Abdellah al-Ghalib under the Saadian dynasty. Part of the Mouassine complex — mosque, fountain, madrasa, hammam. Still operational. The oldest operating hammam in Marrakech.' },
  { year: '19th C', event: 'Hammam as women\'s institution', detail: 'One of the only public spaces women could visit freely. A centre of female social life. Mothers scout future wives for their sons. Pre-wedding and post-birth rituals consolidate here.' },
  { year: '20th C', event: 'Neighbourhood hammams persist', detail: 'Even as indoor plumbing reaches wealthier homes, public hammams remain essential for medina residents. Thursday and Friday remain the busiest days. Entry costs 10–40 dirhams.' },
  { year: 'Present', event: 'Morocco leads the world', detail: 'Morocco has the highest number of public bathhouses of any country. Neighbourhood hammams coexist with luxury spa hammams in riads and hotels — Royal Mansour, La Mamounia, Les Bains de Marrakech. The ritual is the same. Only the price changes.' },
]

const HERO_STATS = [
  { value: '3', label: 'Rooms of ascending heat' },
  { value: '6', label: 'Ritual steps' },
  { value: '5', label: 'Neighbourhood elements' },
  { value: '1562', label: 'Oldest Marrakech hammam' },
]

const KEY_NUMBERS = [
  { value: '10', unit: 'dirhams', note: 'Entry to a neighbourhood hammam. About 90 cents. The hammam is not a luxury. It is infrastructure.' },
  { value: '2–3', unit: 'hours', note: 'Time Moroccans spend per visit. Families go together. The hammam is not rushed.' },
  { value: '45°C', unit: 'hot room', note: 'Temperature in al-Dakhli, the innermost room. Heated from below by hypocaust — Roman-origin underfloor system. Wood-fired.' },
  { value: '1,290', unit: 'per hectare', note: 'Medina population density (Casablanca, colonial era). When homes have no running water, the hammam is not optional.' },
  { value: 'Thu–Fri', unit: 'peak days', note: 'Busiest before Friday prayers. Purification of body and soul. Ghusl before Jumu\'ah.' },
  { value: '0', unit: 'pools', note: 'No still water in a Moroccan hammam. Islam considers it unclean. Running water drawn from taps into buckets. Rinsed, never submerged.' },
]

interface BibliographyEntry {
  author: string
  title: string
  year: string
  detail: string
}

const BIBLIOGRAPHY: BibliographyEntry[] = [
  { author: 'Sibley, Magda', title: 'The Historic Hammams of Damascus and Fez', year: '2008', detail: 'The definitive architectural study. Sibley (University of Leeds) documents spatial layouts, ventilation, heating, and the hammam\'s urban integration. Finds it second only to the mosque in medina significance.' },
  { author: 'Bouhdiba, Abdelwahab', title: 'Sexuality in Islam', year: '1975', detail: 'Routledge. Includes extensive analysis of the hammam as a social and sexual space. The women\'s hammam as a site of female autonomy within constrained public life.' },
  { author: 'Al-Ghazali, Abu Hamid', title: 'Ihya Ulum al-Din (Revival of the Religious Sciences)', year: 'c. 1100', detail: 'Volume on "The Mysteries of Purity." Codifies ablution practice. Details ghusl technique. The theological foundation of hammam as religious infrastructure.' },
  { author: 'Staats, Valerie', title: 'Ritual, Strategy, and Power in Moroccan Women\'s Hammam', year: '1994', detail: 'Ethnography of women\'s hammam culture. Finds that hammams serve as social spaces where traditional and modern women from urban and rural Morocco come together regardless of religiosity.' },
  { author: 'Williams, Elizabeth', title: 'Baths and Bathing Culture in the Middle East: The Hammam', year: '2012', detail: 'Metropolitan Museum of Art, Heilbrunn Timeline. Medieval hammam culture — Baghdad reportedly had 60,000 bathhouses at its height (per Hilal al-Sabi\', likely exaggerated but illustrative).' },
  { author: 'Benkheira, Mohammed Hocine', title: 'Hammam, nudité et ordre moral dans l\'islam médiéval', year: '2003', detail: 'Argues hammams were not strictly necessary for religious purposes in early Islam — their appeal derived from convenience, medical endorsement, and inherited pleasure from pre-Islamic bathing culture.' },
]

const ACCENT = '#D97706' // warm amber

export function HammamCultureContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // scroll observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ritual auto-advance
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => (prev + 1) % RITUAL.length)
    }, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPaused])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        {/* Steam-drift SVG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 12 }, (_, i) => (
              <circle key={i} cx={100 + i * 100} cy={400 + Math.sin(i) * 120} r={60 + i * 8} fill="none" stroke={ACCENT} strokeWidth="0.5" opacity={0.3 + (i % 3) * 0.15}>
                <animate attributeName="cy" values={`${400 + Math.sin(i) * 120};${320 + Math.sin(i) * 80};${400 + Math.sin(i) * 120}`} dur={`${8 + i * 0.7}s`} repeatCount="indefinite" />
                <animate attributeName="r" values={`${60 + i * 8};${80 + i * 8};${60 + i * 8}`} dur={`${10 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 074 — Cultural Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Hammam<br />Culture
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Three rooms of ascending heat. Six ritual steps. One of five elements that
            define every neighbourhood in the <span className="underline underline-offset-2">medina</span>. The hammam is not a spa.
            It is social infrastructure.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map(s => (
              <div key={s.label}>
                <span className="font-serif italic block tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE ROOMS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Architecture</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Four Rooms</h2>
          <p className="text-[14px] text-dwl-body max-w-[520px] leading-relaxed mb-10">
            From the changing room to the furnace. Each chamber exists at a different
            temperature. You move inward. The heat rises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: '#e5e5e5' }}>
            {ROOMS.map((r, i) => {
              const isVisible = visibleSections.has(`room-${i}`)
              const intensity = i / (ROOMS.length - 1)
              return (
                <div key={r.name} data-sid={`room-${i}`} className="p-6 transition-all duration-700" style={{
                  background: `rgb(${255 - intensity * 30}, ${255 - intensity * 45}, ${255 - intensity * 50})`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                }}>
                  <p className="text-[10px] uppercase tracking-[0.08em] mb-3" style={{ color: ACCENT }}>{r.phase}</p>
                  <h3 className="text-[16px] font-medium text-dwl-black">{r.name}</h3>
                  <p className="text-[12px] mt-0.5 font-mono" style={{ color: '#999' }}>{r.arabic} — {r.temp}</p>
                  <p className="text-[12px] text-dwl-body mt-3 leading-relaxed">{r.detail}</p>
                </div>
              )
            })}
          </div>

          <p className="text-[11px] mt-4" style={{ color: '#bbb' }}>
            No pools. No showerheads. Islam considers still water unclean.
            Running water drawn from taps into buckets. Rinsed, never submerged.
          </p>
        </div>
      </section>

      {/* ═══ THE RITUAL — auto-advancing cycle ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Ritual</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Six Steps</h2>
          <p className="text-[13px] max-w-[500px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>
            The order has not changed. Click any step to hold.
          </p>

          {/* Step indicators */}
          <div className="flex gap-2 mb-8">
            {RITUAL.map((s, i) => (
              <button
                key={i}
                onClick={() => { setActiveStep(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000) }}
                className="relative flex-1 h-1 rounded-full overflow-hidden transition-all"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                {i === activeStep && (
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{
                    background: ACCENT,
                    animation: isPaused ? 'none' : `progress-bar ${5}s linear forwards`,
                    width: isPaused ? '100%' : undefined,
                  }} />
                )}
                {i < activeStep && (
                  <div className="absolute inset-0 rounded-full" style={{ background: ACCENT, opacity: 0.4 }} />
                )}
              </button>
            ))}
          </div>

          {/* Active step */}
          <div className="min-h-[180px]">
            <p className="text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: ACCENT }}>
              Step {activeStep + 1} of {RITUAL.length} — {RITUAL[activeStep].duration}
            </p>
            <h3 className="font-serif italic text-[28px] md:text-[36px] mb-3" style={{ color: '#ffffff' }}>
              {RITUAL[activeStep].name}
            </h3>
            <p className="text-[13px] max-w-[600px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.5)' }}>
              {RITUAL[activeStep].detail}
            </p>
          </div>

          {/* Step names row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {RITUAL.map((s, i) => (
              <button
                key={i}
                onClick={() => { setActiveStep(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000) }}
                className="text-[11px] uppercase tracking-[0.06em] transition-all"
                style={{ color: i === activeStep ? ACCENT : 'rgba(255,255,255,0.25)' }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: ACCENT }}>
        <div className="max-w-[640px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)', color: '#ffffff' }}>
            Even the act of performing the scrub for one another
            is considered an expression of habibi.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.55)' }}>Love.</p>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — The Products</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Six Ingredients</h2>
          <p className="text-[14px] text-dwl-body max-w-[480px] leading-relaxed mb-10">
            Every product comes from somewhere. Olive groves. Atlas mines.
            <span className="underline underline-offset-2">Argan</span> forests. Rose valleys. Each one earned its place in the ritual.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#e5e5e5' }}>
            {PRODUCTS.map((p, i) => {
              const isVisible = visibleSections.has(`prod-${i}`)
              return (
                <div key={p.name} data-sid={`prod-${i}`} className="p-6 md:p-8 bg-white transition-all duration-700" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <p className="text-[10px] uppercase tracking-[0.08em] mb-2" style={{ color: ACCENT }}>{p.origin}</p>
                  <h3 className="text-[15px] font-medium text-dwl-black">{p.name}</h3>
                  <p className="text-[12px] font-mono mt-0.5" style={{ color: '#bbb' }}>{p.arabic}</p>
                  <p className="text-[12px] text-dwl-body mt-3 leading-relaxed">{p.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ FIVE ELEMENTS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — The Neighbourhood</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Five Elements</h2>
          <p className="text-[13px] max-w-[520px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>
            Every neighbourhood in the medina contains these five structures.
            The hammam does not stand alone. It is part of a system.
          </p>

          <div className="space-y-0">
            {FIVE_ELEMENTS.map((el, i) => {
              const isVisible = visibleSections.has(`elem-${i}`)
              return (
                <div key={el.name} data-sid={`elem-${i}`} className="flex gap-6 md:gap-10 py-5 transition-all duration-700" style={{
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="flex items-center gap-3 min-w-[160px]">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                    <span className="text-[14px] font-medium" style={{ color: '#ffffff' }}>{el.name}</span>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{el.role}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 p-6 rounded-sm" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <span className="font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>The farnatchi</span> — the man who tends the furnace beneath the hammam — also cooks the neighbourhood&rsquo;s tangia. Women drop off the clay urn on their way in. Mutton, preserved lemon, saffron, cumin. The stew slow-cooks in the hammam&rsquo;s coals for hours. When she leaves, clean and renewed, dinner is ready.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ HISTORY ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — The History</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-10">From Rome to Now</h2>

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
                    <span className="font-serif italic text-[18px] text-dwl-black">{h.year}</span>
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

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>006 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {KEY_NUMBERS.map(n => (
              <div key={n.unit} className="p-6 md:p-8" style={{ background: '#0a0a0a' }}>
                <p className="font-serif italic text-[32px] md:text-[44px] leading-none" style={{ color: ACCENT }}>{n.value}</p>
                <p className="text-[12px] mt-2 font-medium" style={{ color: 'rgba(0,0,0,0.6)' }}>{n.unit}</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">007 — Sources</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Further Reading</h2>
          <p className="text-[14px] text-dwl-body max-w-[480px] leading-relaxed mb-10">
            Six works. Architectural, theological, ethnographic.
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
              'Wikipedia — Hammam: Roman origins, Umayyad period (661–750), Volubilis Idrisid-era hammam (8th C), Al-Ghazali "Mysteries of Purity," ghusl/wudu requirements, hypocaust heating, Valerie Staats on women\'s hammams, Magda Sibley on mosque-hammam proximity',
              'The Culture Trip: Mouassine hammam 1572 (oldest in Marrakech), five neighbourhood elements (mosque, hammam, fountain, madrasa, bakery), farnatchi fire-keeper, tangia cooked in hammam coals, Volubilis 8th C ruins, Thursday/Friday busiest days, 10 dirhams entry',
              'Metropolitan Museum of Art (Elizabeth Williams): Hilal al-Sabi\' Baghdad 60,000 bathhouses, medieval hammam as civic pride, regional architectural variation, Orientalist painters',
              'Morocco World News: Roman influence on Moroccan hammam, three/four room layout, no pools (Islamic preference for running water), located near mosques, Mouassine hammam Sultan Abdellah al-Ghalib 1572 Saadian era',
              'Saveur: Tangia cooked beneath the hammam by mul farnatchi, mutton/beef + preserved lemon + saffron + cumin in clay urn, parchment lid, men\'s dish, underground furnace behind unmarked entrance',
              'Sarah Tours: Al-Jawwani furnace room, hypocaust underfloor heating, sloped floors for drainage, domed ceilings with steam vents, marble heat-retention floors, farnatchi also cooks tangia and koreenes (cow feet)',
              'BeautyMatter: Roman/Byzantine/Central Asian origins, Ottoman architects 14th–20th C, geometric tile work, domed ceilings with glass oculi, functional arched doorways',
              'EurekAlert (Prof. Idriz research): Ghusl after sexual intercourse/menstruation/childbirth, Quran emphasis on water as source of life, wudu institutionalised hammam as communal space, Ottoman hammams as essential as schools',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: ACCENT }}>Sources: Ethnographic research</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes progress-bar {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  )
}
