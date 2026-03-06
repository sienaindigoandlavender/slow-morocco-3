'use client'
import { useState, useEffect, useRef } from 'react'
import { KASBAHS, ARCHITECTURE, HISTORY, FILMS, ROUTE_STOPS, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'
const ACCENT = '#D4A373'
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
const THREAD_COLORS: Record<string, string> = { ancient: '#8B7355', glaoui: '#D4A373', french: '#2D5F8A', modern: '#5C7C3E', hollywood: '#A0452E' }

function KasbahMap({ onSelect }: { onSelect: (i: number) => void }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN!
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-6.8, 31.0],
        zoom: 7.5,
        pitch: 30,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        const routeCoords = KASBAHS.map(k => [k.coords.lng, k.coords.lat])
        map.addSource('route-line', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: routeCoords } } })
        map.addLayer({ id: 'route-line-layer', type: 'line', source: 'route-line', paint: { 'line-color': ACCENT, 'line-width': 2, 'line-dasharray': [3, 2], 'line-opacity': 0.6 } })
        KASBAHS.forEach((k, i) => {
          const el = document.createElement('div')
          el.style.cssText = `width:18px;height:18px;border-radius:50%;background:${ACCENT};border:2px solid rgba(255,255,255,0.9);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 12px ${ACCENT}66;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => {
            onSelect(i)
            map.flyTo({ center: [k.coords.lng, k.coords.lat], zoom: 10, duration: 1200, pitch: 40 })
          })
          new mapboxgl.Marker({ element: el })
            .setLngLat([k.coords.lng, k.coords.lat])
            .setPopup(new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '240px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:${ACCENT};margin:0 0 2px">${k.location}</p><p style="font-size:15px;font-weight:600;margin:0;color:#f5f5f5">${k.name}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [onSelect])
  return <div ref={mapContainer} className="w-full" style={{ height: '560px', background: '#0a0a0a' }} />
}

export function RouteThousandKasbahsContent() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeKasbah, setActiveKasbah] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  const v = (id: string) => vis.has(id)
  const fH = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none"><svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
          {/* Tower silhouettes */}
          <rect x={200} y={300} width={40} height={200} fill="none" stroke={ACCENT} strokeWidth="0.4" />
          <rect x={260} y={350} width={40} height={150} fill="none" stroke={ACCENT} strokeWidth="0.4" />
          <rect x={900} y={280} width={40} height={220} fill="none" stroke={ACCENT} strokeWidth="0.4" />
          <rect x={960} y={320} width={40} height={180} fill="none" stroke={ACCENT} strokeWidth="0.4" />
        </svg></div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-28">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>Module 075 · Architectural Intelligence</p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>Route of a<br />Thousand Kasbahs</h1>
          <p className="text-[15px] md:text-[17px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.7)', animation: 'fadeUp 1s ease 0.7s forwards' }}>Tizi n&apos;Tichka to Ouarzazate to the <span className="underline underline-offset-2">Drâa</span> Valley. Pisé fortresses, Glaoui palaces, and Hollywood sets dissolving back into the earth they were built from.</p>
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((st, i) => (<div key={i}><span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{st.value}</span><span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{st.label}</span></div>))}
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) }}`}</style>
      </section>

      {/* ═══ THE ROUTE — Elevation profile ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Road</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>The Route</h2>
        <div data-sid="route" className={`transition-all duration-700 ${v('route') ? 'opacity-100' : 'opacity-0'}`}>
          {ROUTE_STOPS.map((s, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 md:gap-10 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="col-span-2 md:col-span-1"><span className="font-serif italic text-[18px]" style={{ color: ACCENT }}>{s.km}</span><span className="text-[10px] block" style={{ color: 'rgba(255,255,255,0.25)' }}>km</span></div>
              <div className="col-span-4 md:col-span-3"><span className="font-serif italic text-[16px]" style={{ color: '#fff' }}>{s.name}</span><span className="text-[11px] block mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.elevation}</span></div>
              <div className="col-span-6 md:col-span-8"><p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.highlight}</p></div>
            </div>))}
        </div>
      </div></section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>The Route — Mapped</p>
        <KasbahMap onSelect={(i) => setActiveKasbah(i)} />
      </div></section>

      {/* ═══ KASBAHS ═══ */}
      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Kasbahs</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">The Fortresses</h2>
        <div className="flex flex-wrap gap-2 mb-12">{KASBAHS.map((k, i) => (
          <button key={i} onClick={() => setActiveKasbah(i)} className="transition-all duration-300 text-left px-4 py-3" style={{ background: activeKasbah === i ? '#0a0a0a' : '#fafafa', color: activeKasbah === i ? ACCENT : '#999' }}>
            <span className="font-serif italic text-[14px]">{k.name}</span>
          </button>))}</div>
        <div data-sid="kasbahs" className={`transition-all duration-700 ${v('kasbahs') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <h3 className="font-serif italic text-[28px] md:text-[36px] text-[#0a0a0a]">{KASBAHS[activeKasbah].name}</h3>
              <p className="text-[14px] mt-1" dir="rtl" style={{ color: '#bbb' }}>{KASBAHS[activeKasbah].arabic}</p>
              <div className="mt-6 space-y-4">
                {[['Built', KASBAHS[activeKasbah].built], ['Location', KASBAHS[activeKasbah].location], ['Status', KASBAHS[activeKasbah].status]].map(([l, t]) => (<div key={l}><span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: ACCENT }}>{l}</span><p className="text-[13px] text-[#525252]">{t}</p></div>))}
              </div>
            </div>
            <div className="md:col-span-5"><p className="text-[15px] text-[#525252] leading-[1.75]">{KASBAHS[activeKasbah].detail}</p></div>
            <div className="md:col-span-3 flex flex-col justify-end"><div className="border-l-2 pl-6" style={{ borderColor: ACCENT }}><p className="text-[14px] leading-relaxed" style={{ color: ACCENT }}>{KASBAHS[activeKasbah].keyFact}</p></div></div>
          </div>
        </div>
      </div></section>

      {/* ═══ GLAOUI — Full accent pullquote first ═══ */}
      <section className="flex items-center justify-center min-h-[42vh]" style={{ background: ACCENT }}><div className="max-w-[720px] px-8 text-center py-20">
        <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', color: '#fff' }}>He simply failed to realise that feudal government was no longer acceptable.</p>
        <p className="text-[10px] uppercase tracking-[0.2em] mt-6" style={{ color: 'rgba(255,255,255,0.5)' }}>Abdessadeq El Glaoui, on his father Thami</p>
      </div></section>

      <section style={{ background: '#fafafa' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Dynasty</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">The Lord of the Atlas</h2>
        <p className="text-[14px] text-[#737373] max-w-[600px] leading-relaxed mb-16">No story of the kasbahs can avoid the Glaoui. Thami El Glaoui (1879–1956) — Pasha of Marrakech, ally of France, host to Churchill and Chaplin, one of the richest men in the world, and ultimately a traitor who died broken. His kasbahs line the route.</p>
        <div data-sid="glaoui" className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${v('glaoui') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          {[
            { label: 'Rise', detail: '1893: Glaoui brothers rescue Sultan Moulay Hassan from an Atlas blizzard. Rewarded with a Krupp cannon and feudal titles. They crush rival warlords. By 1912, Thami is Pasha of Marrakech.' },
            { label: 'Power', detail: 'Controlled the salt, olive, and saffron trades. Kasbah Telouet sat on caravan routes — every merchant paid tribute. Hosted Winston Churchill, Charlie Chaplin, Colette, Maurice Ravel. Attended Elizabeth II\'s coronation as Churchill\'s personal guest.' },
            { label: 'Betrayal', detail: '1953: Conspired with France to exile Sultan Mohammed V to Madagascar. Declared a puppet imam. Miscalculated — insurrection followed.' },
            { label: 'Fall', detail: '1955: Mohammed V returns in triumph. El Glaoui prostrates himself, kissing the ground at the Sultan\'s feet. French press photographs the humiliation. All Glaoui properties seized. January 23, 1956 — dies during evening prayers.' },
          ].map((item, i) => (
            <div key={i} className="py-6" style={{ borderBottom: '1px solid #e5e5e5' }}>
              <span className="text-[10px] uppercase tracking-[0.1em] block mb-3" style={{ color: ACCENT }}>{item.label}</span>
              <p className="text-[14px] text-[#525252] leading-[1.75]">{item.detail}</p>
            </div>))}
        </div>
      </div></section>

      {/* ═══ ARCHITECTURE ═══ */}
      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4"><p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — Materials</p><h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05]">How They<br />Were Built</h2></div>
          <div className="md:col-span-8" data-sid="arch"><div className={`transition-all duration-700 ${v('arch') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {ARCHITECTURE.map((a, i) => (
              <div key={i} className="py-6" style={{ borderBottom: '1px solid #e5e5e5' }}>
                <div className="flex items-baseline gap-3 mb-2"><h3 className="font-serif italic text-[18px] text-[#0a0a0a]">{a.name}</h3><span className="text-[12px]" style={{ color: '#bbb' }}>{a.amazigh} / {a.arabic}</span></div>
                <p className="text-[13px] text-[#737373] mb-2">{a.function}</p>
                <p className="text-[14px] text-[#525252] leading-[1.75]">{a.detail}</p>
              </div>))}
          </div></div>
        </div>
      </div></section>

      {/* ═══ HOLLYWOOD — Dark ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — Hollywood</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>On Screen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
          {FILMS.map((f, i) => (
            <div key={i} className="py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-baseline gap-2"><span className="font-serif italic text-[16px]" style={{ color: '#fff' }}>{f.title}</span><span className="text-[12px]" style={{ color: ACCENT }}>{f.year}</span></div>
              <p className="text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{f.location} — {f.role}</p>
            </div>))}
        </div>
      </div></section>

      {/* ═══ TIMELINE + NUMBERS + SOURCES + FOOTER ═══ */}
      <section style={{ background: '#fafafa' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>006 — Chronology</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">Timeline</h2>
        <div className="flex flex-wrap gap-2 mb-12">
          <button onClick={() => setActiveThread(null)} className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all" style={{ background: !activeThread ? '#0a0a0a' : 'transparent', color: !activeThread ? '#fff' : '#999', border: `1px solid ${!activeThread ? '#0a0a0a' : '#ddd'}` }}>All</button>
          {Object.entries(THREAD_COLORS).map(([t, c]) => (<button key={t} onClick={() => setActiveThread(activeThread === t ? null : t)} className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all" style={{ background: activeThread === t ? '#0a0a0a' : 'transparent', color: activeThread === t ? c : '#999', border: `1px solid ${activeThread === t ? '#0a0a0a' : '#ddd'}` }}>{t}</button>))}
        </div>
        <div data-sid="timeline" className={`relative pl-8 md:pl-12 transition-all duration-700 ${v('timeline') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px" style={{ background: '#ddd' }} />
          <div className="space-y-6">{fH.map((h, i) => (<div key={i} className="relative"><div className="absolute -left-[23px] md:-left-[31px] top-[6px] w-[7px] h-[7px] rounded-full" style={{ background: THREAD_COLORS[h.thread] || ACCENT }} /><span className="text-[11px] block mb-1" style={{ color: THREAD_COLORS[h.thread] || '#999' }}>{h.year}</span><p className="text-[14px] text-[#525252] leading-relaxed max-w-[640px]">{h.event}</p></div>))}</div>
        </div>
      </div></section>
      <section className="bg-white"><div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Key Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">{KEY_NUMBERS.map((n, i) => (<div key={i} className="flex gap-6 items-start" style={{ paddingTop: i % 2 === 1 ? '40px' : '0' }}><span className="font-serif italic flex-shrink-0" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{n.number}</span><p className="text-[13px] text-[#525252] leading-relaxed pt-2">{n.context}</p></div>))}</div>
      </div></section>
      <section style={{ background: '#fafafa' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: '#999' }}>Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">{BIBLIOGRAPHY.map((b, i) => (<div key={i}><span className="text-[12px] text-[#525252]">{b.source}</span><p className="text-[11px] text-[#999] leading-relaxed">{b.detail}</p></div>))}</div>
      </div></section>
      <footer><div style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-8 md:px-[8%]"><p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Module 075 · Route of a Thousand Kasbahs · Slow Morocco</p></div><div style={{ backgroundColor: '#161616' }} className="py-3"><p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>slowmorocco.com</p></div><div style={{ backgroundColor: '#0e0e0e' }} className="py-2" /></footer>
    </main>
  )
}
