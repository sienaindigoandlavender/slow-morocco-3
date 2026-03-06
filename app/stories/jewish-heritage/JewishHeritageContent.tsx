'use client'

import { useState, useEffect, useRef } from 'react'
import { MELLAHS, EMIGRATION_WAVES, SYNAGOGUES, HISTORY, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#6366F1'
const THREAD_COLORS: Record<string, string> = {
  ancient: '#F59E0B',
  medieval: '#2D5F8A',
  colonial: '#7B506F',
  departure: '#A0452E',
  preservation: '#5C7C3E',
}

export function JewishHeritageContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Map
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
        center: [-6.5, 32.5],
        zoom: 5.2,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        MELLAHS.forEach(m => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;background:${ACCENT};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;box-shadow:0 0 8px ${ACCENT}40;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '320px' })
            .setHTML(`<div style="font-family:IBM Plex Mono,monospace;padding:4px;"><div style="font-size:13px;font-weight:700;color:#f5f5f5;">${m.city} <span style="color:${ACCENT};font-size:11px;">est. ${m.founded}</span></div><div style="font-size:10px;color:#888;margin-top:4px;line-height:1.5;">${m.detail}</div><div style="font-size:9px;color:${ACCENT};margin-top:4px;">${m.status}</div></div>`)
          const marker = new mapboxgl.Marker({ element: el }).setLngLat([m.lng, m.lat]).setPopup(popup).addTo(map)
          markersRef.current.push(marker)
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const emigrationVisible = visibleSections.has('emigration')

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        {/* Star of David pattern — subtle geometry */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 6 }, (_, row) =>
              Array.from({ length: 8 }, (_, col) => {
                const cx = col * 160 + (row % 2 ? 80 : 0)
                const cy = row * 140 + 40
                return (
                  <g key={`${row}-${col}`}>
                    <polygon points={`${cx},${cy - 24} ${cx + 21},${cy + 12} ${cx - 21},${cy + 12}`} fill="none" stroke={ACCENT} strokeWidth="0.5" />
                    <polygon points={`${cx},${cy + 24} ${cx + 21},${cy - 12} ${cx - 21},${cy - 12}`} fill="none" stroke={ACCENT} strokeWidth="0.5" />
                  </g>
                )
              })
            )}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 077 — Cultural &amp; Demographic Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Jewish Heritage<br />in Morocco
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[560px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            <span className="underline underline-offset-2">Mellah</span>s, synagogues, cemeteries. The 250,000 who left.
            The legacy that stayed. Two thousand years compressed
            into three decades of departure.
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

      {/* ═══ MAP — MELLAHS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Mellahs</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Six Cities</h2>
          <p className="text-[13px] max-w-[540px] leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>
            The mellah — walled Jewish quarter, typically beside the royal palace.
            The word comes from Arabic for salt. The first was <span className="underline underline-offset-2">Fez</span>, 1438.
            The windows face outward — <span className="underline underline-offset-2">Andalusian</span> style. The Muslim houses
            face inward.
          </p>
          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '420px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ THE DEPARTURE — EMIGRATION WAVES ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">002 — The Departure</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Six Waves</h2>
          <p className="text-[14px] text-dwl-body max-w-[560px] leading-relaxed mb-10">
            265,000 in 1948. Approximately 1,000 in 2025.
            The departure happened in waves, each with its own cause and destination.
          </p>

          <div data-sid="emigration" className="space-y-0">
            {EMIGRATION_WAVES.map((w, i) => (
              <div key={w.period} className="py-5 flex items-start gap-4 md:gap-6" style={{ borderTop: '1px solid #e5e5e5' }}>
                <div className="min-w-[100px]">
                  <span className="text-[14px] font-medium tabular-nums text-dwl-black">{w.period}</span>
                  <p className="text-[11px] font-medium mt-0.5" style={{ color: w.color }}>{w.destination}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-serif italic text-[20px]" style={{ color: w.color }}>{w.numbers}</span>
                    {/* Animated bar */}
                    <div className="flex-1 h-3 rounded-sm" style={{ background: '#f0f0f0' }}>
                      <div className="h-full rounded-sm transition-all duration-1500" style={{
                        background: w.color,
                        width: emigrationVisible ? (() => {
                          const widths = ['7%', '35%', '12%', '38%', '14%', '4%']
                          return widths[i]
                        })() : '0%',
                        transitionDelay: `${i * 0.2}s`,
                      }} />
                    </div>
                  </div>
                  <p className="text-[12px] text-dwl-body leading-relaxed">{w.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#111' }}>
        <div className="max-w-[640px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#ffffff' }}>
            &ldquo;On the Moroccan side, everyone lost. The country lost a potential
            community of one to two million people who could have contributed
            to its development, diversity and harmony. On the Jewish side,
            it was the irreversible eradication of a civilisation that had
            fifteen centuries to form and flourish.&rdquo;
          </p>
          <p className="text-[11px] uppercase tracking-[0.12em] mt-6" style={{ color: 'rgba(0,0,0,0.3)' }}>Moroccan Jewish community member, 2023</p>
        </div>
      </section>

      {/* ═══ SYNAGOGUES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Synagogues</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-10" style={{ color: '#ffffff' }}>Six Spaces</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {SYNAGOGUES.map((s, i) => {
              const isVisible = visibleSections.has(`syn-${i}`)
              return (
                <div key={s.name} data-sid={`syn-${i}`} className="p-6 md:p-8 transition-all duration-700" style={{
                  background: '#0a0a0a',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-[15px] font-medium" style={{ color: '#ffffff' }}>{s.name}</h3>
                    <span className="text-[10px] uppercase tracking-[0.06em] px-2 py-0.5 rounded-sm" style={{ background: `${ACCENT}15`, color: ACCENT }}>{s.city}</span>
                  </div>
                  <p className="text-[12px] leading-relaxed mt-3" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ HISTORY TIMELINE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">004 — The Timeline</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Two Thousand Years</h2>

          <div className="flex flex-wrap gap-2 mb-10">
            <button onClick={() => setActiveThread(null)} className="text-[10px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-sm transition-all" style={{
              background: !activeThread ? '#0a0a0a' : '#f5f5f5',
              color: !activeThread ? '#ffffff' : '#666',
            }}>All</button>
            {Object.entries({ ancient: 'Ancient', medieval: 'Medieval', colonial: 'Colonial', departure: 'Departure', preservation: 'Preservation' }).map(([key, label]) => (
              <button key={key} onClick={() => setActiveThread(activeThread === key ? null : key)} className="text-[10px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-sm transition-all" style={{
                background: activeThread === key ? THREAD_COLORS[key] : '#f5f5f5',
                color: activeThread === key ? '#ffffff' : '#666',
              }}>{label}</button>
            ))}
          </div>

          <div className="space-y-0">
            {filteredHistory.map((h, i) => (
              <div key={i} className="py-4 flex items-start gap-4 md:gap-6" style={{ borderTop: '1px solid #e5e5e5' }}>
                <div className="min-w-[90px]">
                  <span className="text-[13px] font-medium tabular-nums text-dwl-black">{h.year}</span>
                </div>
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: THREAD_COLORS[h.thread] }} />
                  <p className="text-[12px] text-dwl-body leading-relaxed">{h.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {KEY_NUMBERS.map(n => (
              <div key={n.unit} className="p-6 md:p-8 bg-white">
                <p className="font-serif italic text-[32px] md:text-[44px] leading-none" style={{ color: ACCENT }}>{n.value}</p>
                <p className="text-[12px] mt-2 font-medium text-dwl-black">{n.unit}</p>
                <p className="text-[11px] mt-1 text-dwl-gray">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">006 — Sources</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Further Reading</h2>
          <p className="text-[14px] text-dwl-body max-w-[480px] leading-relaxed mb-10">
            Six works. History, spatial analysis, demography, documentary, trade.
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
              'Wikipedia — History of the Jews in Morocco: ~265,000 Jews in 1948, Cadima ~90,000 emigrated 1949–56, Operation Yachin ~97,000 1961–64, Oujda/Jerada riots 1948 (44 killed), 2025 population ~1,000, mellah of Fez 1438, Megorashim/Toshavim split, 17 synagogues at Fez peak, Mohammed V refused Vichy laws, 2011 constitutional recognition, Josef Sebag last Jew of Essaouira d. May 2025',
              'Wikipedia — Moroccan Jews: 250,000–350,000 at peak, Sephardic/Berber/Ashkenazi origins, Cadima seleqseya discrimination, half a million Moroccan Jews in Israel, 2,000 years of presence, Andalusian music tradition, skhina sabbath dish',
              'Wikipedia — Mellah: Arabic for salt, first mellah Fez 1438 beside Royal Palace, Foundouk el-Yihoudi earlier district, mellah of Marrakech 1558, Essaouira mellah expanded 1865, urban mellahs near qasbas, rural mellahs in Atlas/Rif',
              'Wikipedia — Operation Yachin: 1961–64, Alex Gatmon/Mossad, HIAS front, $500K + $100–250 per capita, Colonel Oufkir collective passports, 97,005 emigrated, Biblical name (pillar of Solomon\'s Temple)',
              'Wikipedia — Migration of Moroccan Jews to Israel: Cadima 1949–56 from Casablanca office, seleqseya selection policy, transit camp near El Jadida, 70% of early migrants wanted to return, emigration banned 1959 under Arab League pressure',
              'World Jewish Congress: 2,000+ years, ~2,150 (2015 estimate Della Pergola), communities in Casablanca (1,000) Rabat (400) Marrakech (250), synagogues/mikvaot/old-age homes, 200 cemeteries renovated, 13 pilgrimage sites, Alliance Israélite Universelle first school Tetouan 1862',
              'Palais Faraj / Fez: Mellah of Fez 1438 oldest mellah, Slat al-Fassiyin 14th C (Toshavim), Aben Danan 17th C (Megorashim/UNESCO 1999), Fez cemetery 22,000 tombs restored 2015, Rabbi Yehuda Ben Attar (d. 1733), Museum of Jewish Culture completed 2023',
              'Forward / Jewish Forward: 250,000–350,000 pre-1948, mellah architecture (outward-facing balconies vs inward Muslim), $20M Marrakech restoration, Mohammed V WWII protection, 2011 constitution "Hebraic influences," Lazama Synagogue 1492',
              'Middle East Eye: 225,000 pre-Yachin, 54.6% left in 3 years, "everyone lost" — community quote on irreversible eradication, Haim Crespin stayed for business not politics, Andre Azoulay adviser to king',
              'Mellah of Marrakesh — Wikipedia: 1558 Saadian Sultan Abdallah al-Ghalib, beside El Badi Palace, $20M restoration 2016, 3 families remain, Pact of Umar dhimmi status',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: ACCENT }}>Sources: Historical archives, community records</p>
          </div>
        </div>
      </section>
    </div>
  )
}
