'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  idrisid: '#2D6E4F', almoravid: '#8B6914', almohad: '#C44536', marinid: '#2D3A6E',
  wattasid: '#737373', saadian: '#722F37', alaouite: '#4A3C6E',
}

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

const DYNASTIES = [
  { name: 'Idrisids', arabic: '\u0627\u0644\u0623\u062f\u0627\u0631\u0633\u0629', start: 789, end: 985, color: C.idrisid, ethnicity: 'Arab (Sharifian)', capital: 'Fes (founded 808)', keyRuler: 'Idris II (r. 808\u2013828)', keyDate: '859: Al-Qarawiyyin founded', monument: 'Al-Qarawiyyin Mosque', legacy: 'First Islamic state in Morocco. Founded Fes. Established Sharifian legitimacy that persists 1,200 years later.', sultans: 12, fall: 'Fragmented into rival branches. Overthrown by Fatimids.' },
  { name: 'Almoravids', arabic: '\u0627\u0644\u0645\u0631\u0627\u0628\u0637\u0648\u0646', start: 1040, end: 1147, color: C.almoravid, ethnicity: 'Sanhaja Berber', capital: 'Marrakech (founded ~1070)', keyRuler: 'Yusuf ibn Tashfin (r. 1061\u20131106)', keyDate: '1070: Marrakech founded', monument: 'Koubba Almoravid', legacy: 'Founded Marrakech. United Maghreb and Iberia. Introduced Maliki jurisprudence.', sultans: 6, fall: 'Almohad rebellion from High Atlas.' },
  { name: 'Almohads', arabic: '\u0627\u0644\u0645\u0648\u062d\u062f\u0648\u0646', start: 1121, end: 1269, color: C.almohad, ethnicity: 'Masmuda Berber', capital: 'Marrakech (+ Rabat, Seville)', keyRuler: "Ya'qub al-Mansur (r. 1184\u20131199)", keyDate: '1195: Battle of Alarcos. Built Koutoubia.', monument: 'Koutoubia Mosque (77m minaret)', legacy: 'Largest Moroccan empire. Monumental architecture. Template for Giralda (Seville) and Hassan Tower (Rabat).', sultans: 12, fall: 'Defeat at Las Navas de Tolosa (1212). Fragmented.' },
  { name: 'Marinids', arabic: '\u0627\u0644\u0645\u0631\u064a\u0646\u064a\u0648\u0646', start: 1244, end: 1465, color: C.marinid, ethnicity: 'Zenata Berber', capital: 'Fes (Fes el-Jdid, 1276)', keyRuler: 'Abu Inan Faris (r. 1348\u20131358)', keyDate: '1276: Fes el-Jdid built. 1356: Bou Inania.', monument: 'Bou Inania Medersa', legacy: 'Golden age of medersas. Built 7+ medersas in Fes. Chellah necropolis. Patronised scholarship.', sultans: 21, fall: 'Weakened by plague, Portuguese expansion.' },
  { name: 'Wattasids', arabic: '\u0627\u0644\u0648\u0637\u0627\u0633\u064a\u0648\u0646', start: 1472, end: 1554, color: C.wattasid, ethnicity: 'Zenata Berber', capital: 'Fes', keyRuler: 'Muhammad al-Shaykh (r. 1472\u20131504)', keyDate: '1471: Portuguese take Tangier and Asilah.', monument: 'No major new construction', legacy: 'Weakest dynasty. Lost southern Morocco to Saadians. Portugal held 7 coastal cities.', sultans: 5, fall: 'Saadians conquered Fes 1549.' },
  { name: 'Saadians', arabic: '\u0627\u0644\u0633\u0639\u062f\u064a\u0648\u0646', start: 1549, end: 1659, color: C.saadian, ethnicity: 'Arab (Sharifian)', capital: 'Marrakech', keyRuler: 'Ahmad al-Mansur (r. 1578\u20131603)', keyDate: '1578: Battle of Three Kings. 1591: Conquered Timbuktu.', monument: 'El Badi Palace + Saadian Tombs', legacy: 'Defeated Portugal. Trans-Saharan gold trade. Alliance with Elizabeth I. Sugar industry.', sultans: 11, fall: "Civil war after al-Mansur's death." },
  { name: 'Alaouites', arabic: '\u0627\u0644\u0639\u0644\u0648\u064a\u0648\u0646', start: 1631, end: 2026, color: C.alaouite, ethnicity: 'Arab (Sharifian)', capital: 'Meknes \u2192 Fes \u2192 Rabat (1912\u2013)', keyRuler: 'Moulay Ismail (r. 1672\u20131727)', keyDate: '1672: Meknes built. 1956: Independence. 2030: World Cup.', monument: 'Meknes Imperial City + Hassan II Mosque', legacy: 'Longest-reigning dynasty (395+ years). Independence from France. Modern constitutional monarchy.', sultans: 17, fall: '\u2014 (reigning)' },
]

const MIN_YEAR = 700
const MAX_YEAR = 2050


const DYNASTY_TIMELINE_PTS = [
  { name: 'Fez (Idrisids)', lat: 34.0181, lng: -5.0078, detail: 'Founded 789. First Moroccan dynasty capital.', color: '#C8A415' },
  { name: 'Marrakech (Almoravids)', lat: 31.6295, lng: -7.9811, detail: 'Founded 1062. Red city. Berber empire.', color: '#A0452E' },
  { name: 'Rabat (Almohads)', lat: 34.0209, lng: -6.8416, detail: 'Hassan Tower. Almohad imperial vision.', color: '#2D5F8A' },
  { name: 'Meknes (Alaouites)', lat: 33.8935, lng: -5.5547, detail: 'Moulay Ismail. 1672. Versailles of Morocco.', color: '#5C7C3E' },
  { name: 'Sijilmasa', lat: 31.2833, lng: -4.2833, detail: 'Trans-Saharan trade capital. Gold route origin.', color: '#D4A373' },
]
const MBT_DYNASTY_TIMELINE = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function DynastyTimelineMap() {
  const mc = useRef<HTMLDivElement>(null)
  const mr = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mc.current || !MBT_DYNASTY_TIMELINE || mr.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MBT_DYNASTY_TIMELINE!
      const map = new mapboxgl.Map({ container: mc.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6, 33], zoom: 5.5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mr.current = map
      map.on('load', () => {
        DYNASTY_TIMELINE_PTS.forEach(p => {
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

export function DynastyTimelineContent() {
  const heroR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Historical Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Dynasty Timeline</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Seven dynasties. 1,237 years. One unbroken thread.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Morocco is one of the oldest continuous states in Africa. From the Idrisids
          in 789 to the Alaouites today, seven dynasties have held power — alternating
          between Arab Sharifian families and <span className="underline underline-offset-2">Berber</span> tribal confederations, between
          <span className="underline underline-offset-2"> Fes</span> and Marrakech, between expansion and retreat.
        </p>
      </section>

      {/* DYNASTY BARS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.muted }}>Timeline</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Bar width = duration. Click to expand. Overlaps show transitions of power.
          </p>
          <div className="space-y-2">
            {DYNASTIES.map((d, i) => <DynastyBar key={d.name} dynasty={d} index={i} />)}
          </div>
          {/* Year scale */}
          <div className="flex justify-between mt-4">
            {[800, 1000, 1200, 1400, 1600, 1800, 2000].map(y => (
              <span key={y} className="font-mono text-[10px]" style={{ color: C.muted }}>{y}</span>
            ))}
          </div>
        </div>
      </section>

      {/* KEY NUMBERS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>The Pattern</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.idrisid }}>The Fes-Marrakech Oscillation</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Power swings between the two cities: Idrisids (Fes), Almoravids (Marrakech),
                Almohads (Marrakech), Marinids (Fes), Wattasids (Fes), Saadians (Marrakech),
                Alaouites (Meknes, then Rabat). The capital is always a political statement.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.almoravid }}>Arab vs Berber</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Three Arab-origin dynasties (Idrisid, Saadian, Alaouite) and four Berber
                (Almoravid, Almohad, Marinid, Wattasid). The Sharifian claim — descent from
                the Prophet — legitimises the current monarchy. Both traditions built the country.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.alaouite }}>The Alaouite Exception</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                At 395 years, the Alaouites are the longest-reigning dynasty and one of the
                longest in the world. They survived French colonisation, maintained the monarchy
                through independence, and will host the 2030 World Cup. No other Moroccan
                dynasty lasted half as long.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* MAP */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#C8A415' }}>Dynasty Capitals</p>
        <DynastyTimelineMap />
      </div></section>

{/* CLOSING + SOURCES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            Seven dynasties in 1,237 years. The Idrisids founded Fes. The Almoravids
            founded Marrakech. The Almohads built the Koutoubia. The Marinids built
            the medersas. The Saadians defeated Portugal. The Alaouites are still here.
            Every dynasty left a monument. The monument that persists longest is the
            idea of Morocco itself.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: C.muted }}>
            Dates, rulers, and monuments from Abun-Nasr (1987) &ldquo;A History of the Maghrib,&rdquo;
            Julien (1952) &ldquo;History of North Africa,&rdquo; Terrasse (1949), and Encyclop&aelig;dia
            of Islam. Al-Qarawiyyin founding: UNESCO. Sultan counts approximate; succession
            disputes make exact numbering contested.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.alaouite }}>&copy; Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}

function DynastyBar({ dynasty: d, index }: { dynasty: typeof DYNASTIES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const span = MAX_YEAR - MIN_YEAR
  const leftPct = ((d.start - MIN_YEAR) / span) * 100
  const widthPct = ((d.end - d.start) / span) * 100
  const duration = d.end - d.start

  return (
    <div ref={ref} className="transition-all duration-500" style={{ opacity: vis ? 1 : 0, transitionDelay: `${index * 60}ms` }}>
      {/* Bar row */}
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setExpanded(!expanded)}>
        <span className="font-mono text-[12px] font-semibold w-24 shrink-0 group-hover:underline" style={{ color: d.color }}>{d.name}</span>
        <div className="flex-1 h-8 relative rounded-sm" style={{ background: `${C.border}40` }}>
          <div className="absolute top-0 h-full rounded-sm transition-all duration-1000 flex items-center px-2 justify-between overflow-hidden"
            style={{
              left: `${leftPct}%`,
              width: vis ? `${widthPct}%` : '0%',
              background: `${d.color}18`,
              borderLeft: `3px solid ${d.color}`,
              transitionDelay: `${index * 80}ms`,
            }}>
            <span className="font-mono text-[10px] font-bold whitespace-nowrap" style={{ color: d.color }}>{d.start}</span>
            <span className="font-mono text-[10px] whitespace-nowrap" style={{ color: d.color }}>{d.end === 2026 ? 'present' : d.end}</span>
          </div>
        </div>
        <span className="font-mono text-[11px] font-bold w-12 text-right shrink-0" style={{ color: d.color }}>{duration}y</span>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="ml-[calc(6rem+12px)] mt-2 mb-4 p-4 border-l-2 space-y-2" style={{ borderColor: d.color }}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { l: 'Ethnicity', v: d.ethnicity },
              { l: 'Capital', v: d.capital },
              { l: 'Key ruler', v: d.keyRuler },
              { l: 'Key date', v: d.keyDate },
              { l: 'Monument', v: d.monument },
              { l: 'Sultans', v: `${d.sultans}` },
            ].map(f => (
              <div key={f.l}>
                <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>{f.l}</p>
                <p className="font-mono text-[11px]" style={{ color: C.text }}>{f.v}</p>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] leading-[1.6]" style={{ color: C.text }}>{d.legacy}</p>
          <p className="font-mono text-[10px]" style={{ color: C.muted }}>Fall: {d.fall}</p>
        </div>
      )}
      {/* FOOTER */}
      <div style={{ backgroundColor: '#1f1f1f', padding: '32px 24px 16px', marginTop: 32 }}>
        <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
          &copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.
        </p>
        <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
          This visualization may not be reproduced without visible attribution.
        </p>
      </div>
    </div>
  )
}
