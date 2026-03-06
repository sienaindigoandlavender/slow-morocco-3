'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  darija: '#2D6E4F', tamazight: '#C17F28', tashelhit: '#8B6914', tarifit: '#8B3A3A',
  hassaniya: '#5C4033', french: '#1A5276', spanish: '#722F37', english: '#4A5568',
  msa: '#8B6914',
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

interface Region {
  name: string; amazighPct: number; primaryAmazigh: string
  darija: number; population: number; urban: number; notes: string
}

const REGIONS: Region[] = [
  { name: 'Drâa-Tafilalet', amazighPct: 64.0, primaryAmazigh: 'Tamazight / Tashelhit', darija: 68, population: 1760, urban: 37, notes: 'Highest Amazigh % in Morocco. Oasis communities.' },
  { name: 'Souss-Massa', amazighPct: 53.2, primaryAmazigh: 'Tashelhit', darija: 72, population: 2940, urban: 52, notes: 'Core Tashelhit zone. Agadir capital. Argan country.' },
  { name: 'Guelmim-Oued Noun', amazighPct: 40.2, primaryAmazigh: 'Tashelhit', darija: 75, population: 440, urban: 52, notes: 'Transition zone. Tashelhit and Hassaniya overlap.' },
  { name: 'Béni Mellal-Khénifra', amazighPct: 34.3, primaryAmazigh: 'Tamazight', darija: 80, population: 2590, urban: 49, notes: 'Heart of Central Atlas Tamazight zone.' },
  { name: 'Oriental', amazighPct: 32.3, primaryAmazigh: 'Tarifit', darija: 82, population: 2430, urban: 68, notes: 'Tarifit + Eastern Zenati. Border with Algeria.' },
  { name: 'Tanger-Tétouan-Al Hoceïma', amazighPct: 24.5, primaryAmazigh: 'Tarifit', darija: 88, population: 3860, urban: 62, notes: 'Spanish widely spoken. Tarifit in Al Hoceïma.' },
  { name: 'Fès-Meknès', amazighPct: 16.2, primaryAmazigh: 'Tamazight', darija: 92, population: 4430, urban: 60, notes: 'Tamazight in Middle Atlas foothills.' },
  { name: 'Marrakech-Safi', amazighPct: 14.1, primaryAmazigh: 'Tashelhit', darija: 90, population: 4750, urban: 46, notes: 'Tashelhit in High Atlas hinterland. Tourism hub.' },
  { name: 'Rabat-Salé-Kénitra', amazighPct: 5.8, primaryAmazigh: 'Mixed', darija: 96, population: 4860, urban: 73, notes: 'Administrative capital. French dominant L2.' },
  { name: 'Casablanca-Settat', amazighPct: 3.6, primaryAmazigh: 'Mixed', darija: 97, population: 7050, urban: 81, notes: 'Lowest Amazigh %. Economic capital. French business language.' },
  { name: 'Laâyoune-Sakia El Hamra', amazighPct: 2.1, primaryAmazigh: 'Hassaniya zone', darija: 85, population: 420, urban: 94, notes: 'Hassaniya Arabic spoken. Saharan region.' },
  { name: 'Dakhla-Oued Ed-Dahab', amazighPct: 1.4, primaryAmazigh: 'Hassaniya zone', darija: 80, population: 200, urban: 79, notes: 'Southernmost. Hassaniya dominant. Saharan fishing.' },
]

const LANGUAGES = [
  { name: 'Darija', speakers: '~30M', pct: 85, color: C.darija, desc: 'Moroccan Arabic. Mother tongue for majority. Not taught formally.' },
  { name: 'Tamazight', speakers: '~5M', pct: 14, color: C.tamazight, desc: 'Central Atlas. Official since 2011. IRCAM standardisation.' },
  { name: 'Tashelhit', speakers: '~4M', pct: 11, color: C.tashelhit, desc: 'Southern Morocco, Souss, Anti-Atlas. Largest Amazigh group.' },
  { name: 'Tarifit', speakers: '~2M', pct: 6, color: C.tarifit, desc: 'Rif Mountains + diaspora (Netherlands, Belgium, Germany).' },
  { name: 'Hassaniya', speakers: '~0.5M', pct: 1.5, color: C.hassaniya, desc: 'Saharan Arabic dialect. Southern provinces.' },
  { name: 'French', speakers: '~12M (L2)', pct: 33, color: C.french, desc: 'Business, higher education, administration. Not official but dominant.' },
  { name: 'Modern Standard Arabic', speakers: '~15M (L2)', pct: 42, color: C.msa, desc: 'Media, education, religion, government. Nobody\'s first language.' },
  { name: 'Spanish', speakers: '~2M (L2)', pct: 6, color: C.spanish, desc: 'Northern Morocco. Tangier, Tetouan, Nador. Legacy of protectorate.' },
  { name: 'English', speakers: '~3M (L2)', pct: 8, color: C.english, desc: 'Growing. Tech, tourism. Younger generation. Replacing French?' },
]


const LANGUAGES_OF_MOROCCO_PTS = [
  { name: 'Tashelhit Zone', lat: 30.4, lng: -8.5, detail: 'Souss, Anti-Atlas. Largest Amazigh variant. ~8M speakers.', color: '#A0452E' },
  { name: 'Tamazight Zone', lat: 32.3, lng: -5.8, detail: 'Central Atlas. ~5M speakers.', color: '#2D5F8A' },
  { name: 'Tarifit Zone', lat: 35.0, lng: -3.5, detail: 'Rif mountains. ~4M speakers.', color: '#5C7C3E' },
  { name: 'Hassaniya Zone', lat: 25.0, lng: -13.0, detail: 'Saharan Arabic dialect. Southern provinces.', color: '#C8A415' },
  { name: 'Casablanca (Darija hub)', lat: 33.57, lng: -7.59, detail: 'Moroccan Arabic dominant. Urban mixing.', color: '#8B7355' },
]
const MBT_LANGUAGES_OF_MOROCCO = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function LanguagesOfMoroccoMap() {
  const mc = useRef<HTMLDivElement>(null)
  const mr = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mc.current || !MBT_LANGUAGES_OF_MOROCCO || mr.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MBT_LANGUAGES_OF_MOROCCO!
      const map = new mapboxgl.Map({ container: mc.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6, 31], zoom: 5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mr.current = map
      map.on('load', () => {
        LANGUAGES_OF_MOROCCO_PTS.forEach(p => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => { map.flyTo({ center: [p.lng, p.lat], zoom: 8, duration: 1200 }) })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '220px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mr.current?.remove(); mr.current = null }
  }, [])
  return <div ref={mc} className="w-full" style={{ height: '480px', background: '#0a0a0a' }} />
}

export function LanguagesOfMoroccoContent() {
  const heroR = useReveal()
  const barR = useReveal()
  const regR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Linguistic Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Languages of Morocco</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Five mother tongues. Four scripts. Three colonial languages. One country.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          A Moroccan in Casablanca might speak Darija at home, French at work, Modern Standard
          Arabic for news, and English on Instagram — in a single day. In the <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Rif</span>, add Tarifit.
          In the Souss, Tashelhit. In the Sahara, Hassaniya. Morocco is not bilingual — it is a
          permanent negotiation between at least five languages, each carrying different power,
          prestige, and identity.
        </p>
      </section>

      {/* LANGUAGE OVERVIEW BARS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={barR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.darija }}>Language Landscape</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Percentage of population who speak each language (mother tongue or L2). Percentages overlap — most Moroccans speak 2–4 languages.
          </p>
          <div className="space-y-2.5">
            {LANGUAGES.map((l, i) => (
              <div key={l.name} className="flex items-center gap-3 transition-all duration-500"
                style={{ opacity: barR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                <span className="font-mono text-[12px] font-semibold w-20 shrink-0" style={{ color: l.color }}>{l.name}</span>
                <div className="flex-1 h-5 rounded-sm" style={{ background: `${C.border}30` }}>
                  <div className="h-full rounded-sm transition-all duration-800 flex items-center px-2"
                    style={{ width: barR.vis ? `${l.pct}%` : '0%', background: `${l.color}18`, borderRight: `2px solid ${l.color}`, transitionDelay: `${i * 80}ms` }}>
                    {l.pct > 20 && <span className="font-mono text-[9px]" style={{ color: l.color }}>{l.speakers}</span>}
                  </div>
                </div>
                <span className="font-mono text-[11px] font-bold w-10 text-right" style={{ color: l.color }}>{l.pct}%</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            {LANGUAGES.map(l => (
              <span key={l.name} className="font-mono text-[9px]" style={{ color: C.muted }}>{l.desc.split('.')[0]}</span>
            )).slice(0, 4)}
          </div>
        </div>
      </section>

      {/* REGIONAL AMAZIGH MAP (as sorted bars) */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={regR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.tamazight }}>Amazigh by Region</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Sorted by Amazigh mother-tongue percentage. Regions above 30% are the heartlands.
            Click to expand.
          </p>
          <div className="space-y-1">
            {REGIONS.map((r, i) => (
              <RegionBar key={r.name} region={r} index={i} parentVis={regR.vis} />
            ))}
          </div>
        </div>
      </section>

      {/* THREE AMAZIGH LANGUAGES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>The Three Amazigh Languages</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.tashelhit }}>Tashelhit</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Largest Amazigh language. ~4M speakers. Southern Morocco: Souss, Anti-Atlas,
                western High Atlas. Centre: Agadir. The argan country. Historically the most
                commercially successful Amazigh group — Soussi merchants in every Moroccan city.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.tamazight }}>Tamazight</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Central Atlas. ~5M speakers. The Middle Atlas mountains: Béni Mellal, Khénifra,
                Azrou, Ifrane. Drâa-Tafilalet oases. Became the name for the standardised
                pan-Amazigh language (IRCAM). Official since 2011 constitution.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.tarifit }}>Tarifit</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Rif Mountains. ~2M speakers in Morocco, significant diaspora in Netherlands,
                Belgium, Germany. Al Hoceïma, Nador. Most geographically isolated of the three.
                Strong community identity. Spanish as colonial L2 rather than French.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D5F8A' }}>Language Zones</p>
        <LanguagesOfMoroccoMap />
      </div></section>

{/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            Language in Morocco is never neutral. Darija is home. French is money.
            Arabic is God and the state. Amazigh is identity reclaimed.
            English is the future, maybe. Every Moroccan carries this negotiation
            in their mouth — switching codes mid-sentence, mid-thought, mid-life.
            The polyglossia is not confusion. It is surplus.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Regional Amazigh percentages from HCP RGPH 2024 (7th General Census) and IRCAM
            (Institut Royal de la Culture Amazighe) 2023 estimates. National language speaker
            counts from Ethnologue (27th ed.) and World Bank. French/English penetration from
            British Council (2022) and Institut Français surveys. Darija speaker estimates from
            HCP linguistic module. Hassaniya data from CERED demographic studies.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.darija }}>© Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}

function RegionBar({ region: r, index, parentVis }: { region: Region; index: number; parentVis: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const langColor = r.primaryAmazigh.includes('Tashelhit') ? C.tashelhit :
    r.primaryAmazigh.includes('Tarifit') ? C.tarifit :
    r.primaryAmazigh.includes('Tamazight') ? C.tamazight :
    r.primaryAmazigh.includes('Hassaniya') ? C.hassaniya : C.muted

  return (
    <div className="transition-all duration-500" style={{ opacity: parentVis ? 1 : 0, transitionDelay: `${index * 40}ms` }}>
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setExpanded(!expanded)}>
        <span className="font-mono text-[11px] w-48 shrink-0 truncate group-hover:underline" style={{ color: C.text }}>{r.name}</span>
        <div className="flex-1 h-4 rounded-sm relative" style={{ background: `${C.border}30` }}>
          <div className="absolute left-0 top-0 h-full rounded-sm transition-all duration-700"
            style={{ width: parentVis ? `${r.amazighPct}%` : '0%', background: `${langColor}20`, borderRight: `2px solid ${langColor}`, transitionDelay: `${index * 40}ms` }} />
        </div>
        <span className="font-mono text-[11px] font-bold w-10 text-right" style={{ color: langColor }}>{r.amazighPct}%</span>
        <span className="font-mono text-[10px] w-20 shrink-0 hidden md:block" style={{ color: langColor }}>{r.primaryAmazigh.split(' ')[0]}</span>
      </div>
      {expanded && (
        <div className="ml-48 pl-3 mt-1 mb-3 border-l-2 py-2" style={{ borderColor: langColor }}>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="font-mono text-[9px] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Population</p>
              <p className="font-mono text-[11px]" style={{ color: C.text }}>{(r.population / 1000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Darija use</p>
              <p className="font-mono text-[11px]" style={{ color: C.darija }}>{r.darija}%</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Urban</p>
              <p className="font-mono text-[11px]" style={{ color: C.text }}>{r.urban}%</p>
            </div>
          </div>
          <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{r.notes}</p>
        </div>
      )}
    </div>
  )
}
