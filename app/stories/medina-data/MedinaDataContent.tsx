'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  core: '#722F37', sacred: '#2D6E4F', commercial: '#C17F28', residential: '#1A5276',
  industrial: '#8B5A2B', defensive: '#8B3A3A', beyond: '#737373',
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
}

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

interface Feature { name: string; count: number; ring: string; color: string; note: string }

const FEATURES: Feature[] = [
  { name: 'Friday Mosque (Koutoubia)', count: 1, ring: 'Core', color: C.core, note: 'Spiritual and geographic center. 77m minaret. Almohad (1147–1199). All streets lead here.' },
  { name: 'Neighbourhood Mosques', count: 186, ring: 'Sacred', color: C.sacred, note: 'One per neighbourhood. Walking distance from every home. Defines the derb catchment.' },
  { name: 'Medersas', count: 6, ring: 'Sacred', color: C.sacred, note: 'Ben Youssef (largest, 130 rooms), Ben Saleh, Mouassine. 14th–16th century.' },
  { name: 'Zaouias (Shrines)', count: 14, ring: 'Sacred', color: C.sacred, note: 'Sidi Bel Abbes (patron saint). Seven Saints pilgrimage route.' },
  { name: 'Souks', count: 40, ring: 'Commercial', color: C.commercial, note: 'Each souk = one trade. Precious goods near center, heavy trades at edge.' },
  { name: 'Foundouks', count: 97, ring: 'Commercial', color: C.commercial, note: '~100 surviving. 45 active. Square courtyard: animals below, merchants above.' },
  { name: 'Public Fountains', count: 82, ring: 'Residential', color: C.residential, note: 'Social infrastructure. Gathering point. Built by waqf endowments.' },
  { name: 'Hammams', count: 25, ring: 'Residential', color: C.residential, note: 'One per neighbourhood. Social institution > hygiene. Separate hours men/women.' },
  { name: 'Riads', count: 12000, ring: 'Residential', color: C.residential, note: 'Inward-facing courtyard houses. Blank wall to street, garden inside.' },
  { name: 'Derbs', count: 400, ring: 'Residential', color: C.residential, note: 'Dead-end lanes. Security feature. Only residents know the exit.' },
  { name: 'Bread Ovens', count: 75, ring: 'Residential', color: C.residential, note: 'Ferran. Families bring dough, baker stamps it. Daily social contract.' },
  { name: 'Palaces', count: 5, ring: 'Residential', color: C.core, note: 'Bahia, El Badi (ruins), Royal, Dar Si Said, Dar el-Glaoui.' },
  { name: 'Tanneries', count: 3, ring: 'Industrial', color: C.industrial, note: 'Bab Debbagh. Stone vats, pigeon dung. 800-year tradition.' },
  { name: 'Pottery Kilns', count: 8, ring: 'Industrial', color: C.industrial, note: 'Fire-risk. Near Bab Ghmat and Bab Debbagh.' },
  { name: "Dyers' Quarter", count: 1, ring: 'Industrial', color: C.industrial, note: 'Souk des Teinturiers. Water-intensive.' },
  { name: 'Ramparts', count: 1, ring: 'Defensive', color: C.defensive, note: '16 km perimeter. 2m thick, 9m tall. Pisé. Almoravid/Almohad.' },
  { name: 'Gates (Bab)', count: 19, ring: 'Defensive', color: C.defensive, note: 'Bab Agnaou (Almohad), Bab Doukkala, Bab Debbagh, etc.' },
  { name: 'Cemeteries', count: 4, ring: 'Beyond', color: C.beyond, note: 'Outside walls. Muslim tradition: the dead face Mecca.' },
]

const RINGS = ['Core', 'Sacred', 'Commercial', 'Residential', 'Industrial', 'Defensive', 'Beyond']
const RING_COLORS: Record<string, string> = { Core: C.core, Sacred: C.sacred, Commercial: C.commercial, Residential: C.residential, Industrial: C.industrial, Defensive: C.defensive, Beyond: C.beyond }
const RING_DESC: Record<string, string> = {
  Core: 'The Friday mosque — spiritual and geographic centre',
  Sacred: 'Mosques, medersas, zaouias — walking distance from every home',
  Commercial: 'Souks and foundouks — trade organised by craft',
  Residential: 'Riads, derbs, hammams, fountains, bread ovens',
  Industrial: 'Tanneries, kilns, dyers — pushed to periphery',
  Defensive: 'Ramparts, gates — 16 km of rammed-earth walls',
  Beyond: 'Cemeteries, gardens — outside the walls',
}

export function MedinaDataContent() {
  const heroR = useReveal()
  const barR = useReveal()
  const [expandedRing, setExpandedRing] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Infrastructure Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Medina Data</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            12,900 features. Seven concentric rings. Centre outward.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          A Moroccan <span className="underline underline-offset-2">medina</span> is not random. It is organised in concentric rings radiating
          from the Friday mosque: sacred space nearest the centre, then commerce, then
          residential, then industry (pushed to the edge for noise and smell), then
          defensive walls, then the cemeteries beyond. This is the spatial grammar of
          Islamic urbanism — invented once, repeated for a thousand years.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            { v: '186', l: 'mosques', c: C.sacred },
            { v: '97', l: 'foundouks surviving', c: C.commercial },
            { v: '~12,000', l: 'riads estimated', c: C.residential },
            { v: '16 km', l: 'of ramparts', c: C.defensive },
          ].map(n => (
            <div key={n.l}>
              <p className="font-mono text-[24px] font-bold" style={{ color: n.c }}>{n.v}</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONCENTRIC RINGS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={barR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.core }}>Centre → Edge: The Seven Rings</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Click a ring to see its features. Width represents element count in that zone.
          </p>
          {RINGS.map((ring, i) => {
            const features = FEATURES.filter(f => f.ring === ring)
            const count = features.reduce((a, f) => a + f.count, 0)
            const isExpanded = expandedRing === ring
            const color = RING_COLORS[ring]
            const maxCount = 12600
            return (
              <div key={ring} className="mb-2 transition-all duration-500"
                style={{ opacity: barR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setExpandedRing(isExpanded ? null : ring)}>
                  <span className="font-mono text-[12px] font-semibold w-24 shrink-0 group-hover:underline" style={{ color }}>{ring}</span>
                  <div className="flex-1 h-7 rounded-sm relative" style={{ background: `${C.border}30` }}>
                    <div className="h-full rounded-sm transition-all duration-800 flex items-center px-2"
                      style={{
                        width: barR.vis ? `${Math.max((count / maxCount) * 100, 3)}%` : '0%',
                        background: `${color}12`,
                        borderLeft: `3px solid ${color}`,
                        transitionDelay: `${i * 80}ms`,
                      }}>
                      <span className="font-mono text-[9px] whitespace-nowrap" style={{ color }}>{RING_DESC[ring]}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] font-bold w-16 text-right shrink-0" style={{ color }}>
                    {count.toLocaleString()}
                  </span>
                </div>
                {isExpanded && (
                  <div className="ml-[calc(6rem+12px)] mt-2 mb-3 space-y-1.5 pl-3 border-l-2" style={{ borderColor: color }}>
                    {features.map(f => (
                      <div key={f.name} className="flex items-start gap-2">
                        <span className="font-mono text-[12px] font-bold w-16 text-right shrink-0" style={{ color: f.color }}>
                          {f.count.toLocaleString()}
                        </span>
                        <div>
                          <span className="font-mono text-[12px] font-semibold" style={{ color: C.ink }}>{f.name}</span>
                          <p className="font-mono text-[10px] leading-[1.5]" style={{ color: C.muted }}>{f.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.sacred }}>The Mosque as GPS</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                186 mosques in one medina is not redundancy — it is infrastructure. Each mosque
                anchors a neighbourhood of ~100 houses. The call to prayer is a timing device.
                The minaret is a landmark. The ablution fountain is the water source. The mosque
                is the medina&apos;s operating system.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.commercial }}>97 Foundouks</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Caravanserais: two-story buildings around a courtyard where traders stored goods
                below and slept above. Marrakech once had 200+. Ninety-seven survive, 45 still
                active as workshops. Each was a node in the trans-Saharan and trans-Atlas trade
                networks. The foundouk is the ancestor of the hotel.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.residential }}>The Dead-End Logic</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                400 dead-end lanes (derbs) are not poor planning. Each serves 10–30 houses
                whose residents are often related. The derb is semi-private space: children
                play there, women sit at doorsteps, strangers are noticed immediately. It is
                the most effective security system ever designed — no technology required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The medina is a data structure. The mosque is the root node. The souks
            are the commercial layer. The derbs are the leaf nodes. The walls are
            the firewall. The gates are the ports. It was designed a thousand years
            ago and it still works — not despite its complexity, but because of it.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Feature counts from UNESCO World Heritage nomination file (1985), ADER-Marrakech
            rehabilitation survey, Ministry of Habous mosque registry, and Wilbaux (2001).
            Foundouk inventory from Saïd Mouline architectural survey. Derb count from SDAU
            Marrakech master plan. Riad estimate from property records (approximate).
            Concentric ring model after Hakim (1986) &ldquo;Arabic-Islamic Cities&rdquo; and
            Bianca (2000) &ldquo;Urban Form in the Arab World.&rdquo;
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.core }}>&copy; Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
