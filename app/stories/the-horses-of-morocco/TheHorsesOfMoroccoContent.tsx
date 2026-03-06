'use client'

import { useEffect, useRef, useState } from 'react'

// ══════════════════════════════════════════════
// MODULE 137 — THE HORSES OF MOROCCO
// From Numidian Cavalry to the Thoroughbred
// 3,500 years. One breed. Every racetrack on Earth.
// ══════════════════════════════════════════════

const BREEDS = [
  { name: 'Barb (Berbère)', arabic: 'حصان بربري', pop: '~5,500 purebred', height: '14.2–15.2 hh', profile: 'Convex (ram-shaped)', role: 'Tbourida, endurance, heritage', desc: 'Five lumbar vertebrae instead of six. Short-coupled, explosive sprint speed. Sure-footed in mountain terrain. 3,500 years in the Maghreb.', status: 'critical' },
  { name: 'Arab-Barb (Arabe-Barbe)', arabic: 'عريب بربري', pop: '~60,000', height: '14.0–16.0 hh', profile: 'Straight/slightly concave', role: 'Tbourida, sport, breeding', desc: '90% of Morocco\'s horse population. Created during French colonial breeding programs. Versatile, docile, adapted to all climates.', status: 'dominant' },
  { name: 'Arabian (Pur-Sang Arabe)', arabic: 'حصان عربي أصيل', pop: '~13,000', height: '14.0–15.2 hh', profile: 'Concave (dished)', role: 'Racing, shows, prestige', desc: 'Introduced with Islam. Five foundation mare lines (Al-Khamsa). Obedience bred into the line from wartime selection.', status: 'growing' },
  { name: 'Thoroughbred', arabic: 'حصان إنجليزي', pop: '~3,500', height: '15.2–17.0 hh', profile: 'Refined, straight', role: 'Racing', desc: 'Descended in part from a Moroccan Barb — the Godolphin. 867 races organized annually by SOREC.', status: 'stable' },
  { name: 'Anglo-Arabian', arabic: '—', pop: 'Small', height: '15.0–16.2 hh', profile: 'Straight, fine', role: 'Racing, equestrian sport', desc: 'Must have ≥25% Arabian blood. Set to replace non-Thoroughbreds at national racetracks.', status: 'growing' },
]

const DESCENDANTS = [
  { breed: 'Thoroughbred', region: 'Global', era: '1680–1750', mech: 'Godolphin Barb (Meknes → Tunis → Paris → England) crossed with English mares', note: 'Every Thoroughbred alive carries Barb blood. Man o\'War, Seabiscuit, War Admiral trace directly to the Godolphin.' },
  { breed: 'Andalusian', region: 'Spain', era: '711–1000', mech: '300 years of Umayyad patronage. Barb × Iberian stock on the peninsula.', note: 'Foundation of all Iberian breeds. Spain\'s defining horse.' },
  { breed: 'Lusitano', region: 'Portugal', era: '711–1000', mech: 'Same Barb × Iberian cross, different selection pressures.', note: 'Portugal\'s national breed. Bullfighting, dressage.' },
  { breed: 'Mustang', region: 'Americas', era: '1493+', mech: 'Spanish Barbs left by conquistadors. Went feral across the Great Plains.', note: 'The horse that made the American West.' },
  { breed: 'Quarter Horse', region: 'USA', era: '1600s', mech: 'Chickasaw and Choctaw nations bred Spanish Barbs with English stock.', note: 'World\'s most popular breed (~3M). Got its cow sense from the Barb.' },
  { breed: 'Appaloosa', region: 'USA', era: '1700s', mech: 'Nez Perce selectively bred Spanish Barbs for spotted patterns.', note: 'Leopard-complex patterns trace through Spanish Barb herds.' },
  { breed: 'Criollo', region: 'South America', era: '1535+', mech: 'Spanish Barbs brought to Argentina. Natural selection in the pampas.', note: 'Endurance record holder. The gaucho\'s horse.' },
  { breed: 'Paso Fino', region: 'Latin America', era: '1500s', mech: 'Spanish Barbs × Andalusians in Caribbean. Selected for smooth gait.', note: 'Natural four-beat gait inherited from Barb movement.' },
  { breed: 'Lipizzan', region: 'Austria', era: '1580', mech: 'Spanish (Barb-influenced) stock at Lipica stud.', note: 'White horses of the Spanish Riding School.' },
  { breed: 'Standardbred', region: 'USA', era: '1800s', mech: 'Barb blood via Thoroughbred foundation + Morgan Horse.', note: 'Harness racing breed.' },
]

const TIMELINE = [
  { y: '~3,500 BP', e: 'Domesticated horses arrive in North Africa through Egypt and possibly via the Strait of Gibraltar. The ancestors of the Barb begin adapting to arid, mountainous terrain.', t: 'origin' },
  { y: '~1,000 BCE', e: 'Berber tribes develop sophisticated bareback riding — no saddle, no bridle. Voice commands, a neck rope, a thin stick between the ears.', t: 'cavalry' },
  { y: '~300 BCE', e: 'Numidian cavalry emerges as the finest light horse in the Mediterranean. Livy: "by far the best horsemen in Africa."', t: 'cavalry' },
  { y: '218 BCE', e: 'Hannibal crosses the Alps. Numidian cavalry ride with him. At Trebia they lure the Romans into a trap. At Cannae (216 BCE), 3,500 Numidian horsemen close the encirclement — the worst tactical defeat in Roman history.', t: 'battle' },
  { y: '202 BCE', e: 'Battle of Zama. King Masinissa switches sides with 6,000 Numidian cavalry. Numidians against Numidians. The horse decides the war.', t: 'battle' },
  { y: '2nd c. CE', e: 'Claudius Aelianus: the Numidian horse is "extraordinarily fast and strong and withal so tame that it can be ridden without a bit or reins."', t: 'record' },
  { y: '711', e: 'Tariq ibn Ziyad crosses to Iberia with Berber cavalry on Barb horses. Three centuries of Umayyad rule produces the Andalusian and Lusitano.', t: 'expansion' },
  { y: '14th c.', e: 'Richard II of England owns a Barb called Roan Barbary — mentioned by Shakespeare. Italian noble families establish racing stables with Barbary horses.', t: 'expansion' },
  { y: '1493', e: 'Columbus brings horses to the Americas. Many are Spanish Barb stock. They will become the Mustang, the Quarter Horse, the Appaloosa.', t: 'expansion' },
  { y: '1509–1547', e: 'Henry VIII purchases Barbary horses from Federico Gonzaga of Mantua — seven mares and a stallion.', t: 'expansion' },
  { y: '~1724', e: 'A colt foaled — Yemen or Meknes, accounts differ. Reaches the Bey of Tunis, then Louis XV of France. Not valued. Reportedly pulls a water cart in Paris.', t: 'godolphin' },
  { y: '~1729', e: 'Englishman Edward Coke imports the horse. He becomes the Godolphin — one of three foundation stallions of the Thoroughbred. His blood flows in Man o\'War, Seabiscuit, War Admiral.', t: 'godolphin' },
  { y: '1886–1914', e: 'First Barb studbooks: Algeria (1886), Tunisia (1896), Morocco (1914). The breed is formally documented for the first time.', t: 'modern' },
  { y: '1947', e: 'Horse breeding transfers from military control to Morocco\'s Ministry of Agriculture.', t: 'modern' },
  { y: '1965', e: 'African horse sickness strikes Morocco. The virus devastates the North African Barb population.', t: 'modern' },
  { y: '1987', e: 'World Organization of the Barb Horse (OMCB) founded in Algeria.', t: 'modern' },
  { y: '2003', e: 'SOREC created under royal patronage. National herd at 130,000 horses, declining.', t: 'modern' },
  { y: '2005', e: 'Morocco reaches 160,000 horses. Five national stud farms operate. 35 regional reproduction centres.', t: 'modern' },
  { y: '2014', e: 'Marrakech Academy of Equestrian Arts inaugurated. Trains riders in classical dressage and vaulting on Barb and Arab-Barb horses.', t: 'modern' },
  { y: '2021', e: 'UNESCO inscribes Tbourida on the Representative List of Intangible Cultural Heritage. The cavalry charge becomes world heritage.', t: 'culture' },
]

const ANATOMY = [
  { f: 'Head', barb: 'Narrow, convex (ram-shaped)', arab: 'Small, dished (concave)', n: 'This is why Europeans confused them — similar size, different head.' },
  { f: 'Vertebrae', barb: 'Five lumbar (majority)', arab: 'Six lumbar (standard)', n: 'Five = shorter, stronger back. Key to Barb endurance.' },
  { f: 'Croup & tail', barb: 'Sloping, low-set tail', arab: 'Flat, high-set tail', n: 'Low tail = classic Barb marker.' },
  { f: 'Build', barb: 'Powerful front end, short-coupled, compact', arab: 'Refined, lean, elegant', n: 'Barb: sprint and collection. Arabian: grace and distance.' },
  { f: 'Speed type', barb: 'Sprinter over short distances', arab: 'Sustained endurance over long distances', n: 'Barb gallops like a sprinter. Arabian runs like a marathon runner.' },
  { f: 'Temperament', barb: 'Intelligent, eager, gentle', arab: 'Sensitive, spirited, loyal', n: 'Both hot-blooded. The Barb is the more trainable.' },
]

const STUDS = [
  { city: 'Meknes', lat: 33.895, lng: -5.547, note: 'Historic stud. Origin of the Godolphin (SOREC). Moulay Ismail\'s imperial city.' },
  { city: 'Marrakech', lat: 31.629, lng: -7.981, note: 'Academy of Equestrian Arts. Centenary of racing 2014.' },
  { city: 'Bouznika', lat: 33.789, lng: -7.159, note: 'Haras Regional La Kasbah. Breeding research + genetic lab.' },
  { city: 'El Jadida', lat: 33.249, lng: -8.500, note: 'Salon International du Cheval. Hassan II Tbourida Trophy.' },
  { city: 'Oujda', lat: 34.683, lng: -1.900, note: 'Eastern Morocco. Gateway to Algeria.' },
]

// ── Components ──

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.1 }); obs.observe(el); return () => obs.disconnect() }, [])
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>{children}</div>
}

function SatelliteMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (!mapRef.current || loaded) return
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css'; document.head.appendChild(link)
    const script = document.createElement('script'); script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js'
    script.onload = () => {
      const mapboxgl = (window as any).mapboxgl; if (!mapboxgl) return
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      const map = new mapboxgl.Map({ container: mapRef.current!, style: 'mapbox://styles/mapbox/satellite-v9', center: [-6.0, 32.5], zoom: 5.5, pitch: 0, bearing: 0, interactive: true, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.ScaleControl({ maxWidth: 200 }), 'bottom-left')
      map.on('load', () => {
        STUDS.forEach(s => {
          new mapboxgl.Marker({ color: '#D4AF37' }).setLngLat([s.lng, s.lat])
            .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`<div style="font-family:IBM Plex Mono,monospace;font-size:11px;padding:4px;max-width:200px"><strong>${s.city}</strong><br/>${s.note}</div>`))
            .addTo(map)
        })
        map.addSource('stud-route', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: STUDS.map(s => [s.lng, s.lat]) }, properties: {} } })
        map.addLayer({ id: 'stud-line', type: 'line', source: 'stud-route', paint: { 'line-color': '#D4AF37', 'line-width': 1.5, 'line-opacity': 0.4, 'line-dasharray': [6, 4] } })
      })
      setLoaded(true)
    }
    document.head.appendChild(script)
  }, [loaded])
  return (
    <div style={{ position: 'relative', width: '100%', height: '600px', background: '#0a0a0a' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(0,0,0,0.8)', padding: '10px 16px', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: '#fff', letterSpacing: '0.02em', backdropFilter: 'blur(8px)' }}>Five National Stud Farms — SOREC</div>
      <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.8)', padding: '10px 16px', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}>Satellite View — Mapbox</div>
    </div>
  )
}

function InfluenceDiagram() {
  const nodes = [
    { name: 'Andalusian', x: 150, y: 100 }, { name: 'Lusitano', x: 80, y: 230 },
    { name: 'Thoroughbred', x: 150, y: 360 }, { name: 'Mustang', x: 750, y: 100 },
    { name: 'Quarter Horse', x: 820, y: 230 }, { name: 'Appaloosa', x: 750, y: 360 },
    { name: 'Criollo', x: 450, y: 430 }, { name: 'Paso Fino', x: 300, y: 420 },
    { name: 'Lipizzan', x: 300, y: 70 }, { name: 'Standardbred', x: 600, y: 70 },
  ]
  return (
    <svg viewBox="0 0 900 470" style={{ width: '100%', height: 'auto', fontFamily: "'IBM Plex Mono', monospace" }}>
      <circle cx={450} cy={230} r={55} fill="#0a0a0a" />
      <text x={450} y={223} textAnchor="middle" fontSize={11} fill="#D4AF37" fontWeight={600}>THE BARB</text>
      <text x={450} y={240} textAnchor="middle" fontSize={8} fill="#fff" opacity={0.5}>3,500 years · Maghreb</text>
      {nodes.map((n, i) => (
        <g key={i}>
          <line x1={450} y1={230} x2={n.x} y2={n.y} stroke="#8B6914" strokeWidth={1} opacity={0.25} />
          <circle cx={n.x} cy={n.y} r={30} fill="none" stroke="#8B6914" strokeWidth={1} opacity={0.4} />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={8} fill="#0a0a0a" fontWeight={600}>{n.name}</text>
        </g>
      ))}
    </svg>
  )
}

// ── Page ──

export function TheHorsesOfMoroccoContent() {
  const tc: Record<string, string> = { origin: '#8B6914', cavalry: '#B22222', battle: '#B22222', record: '#525252', expansion: '#2E7D32', godolphin: '#D4AF37', culture: '#6B4C8A', modern: '#1565C0' }
  const sc: Record<string, string> = { critical: '#B22222', dominant: '#2E7D32', growing: '#8B6914', stable: '#1565C0' }

  return (
    <div className="pt-16" style={{ background: '#ffffff' }}>

      {/* Hero */}
      <section style={{ padding: '100px 24px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 12, fontFamily: "'IBM Plex Mono', monospace" }}>Module 137 · Breeds & Heritage</p>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 0.92, color: '#0a0a0a', marginBottom: 24 }}>The Horses<br />of Morocco</h1>
          <p style={{ fontSize: 15, color: '#262626', maxWidth: 620, lineHeight: 1.8, fontFamily: "'IBM Plex Mono', monospace" }}>
            In the 2nd century CE, a Roman writer described a North African horse that was <em>extraordinarily fast and strong and withal so tame that it could be ridden without a bit or reins and guided simply by a cane.</em> That horse is 3,500 years old. It shaped every major breed on Earth. And it is still the most underrated horse in history.
          </p>
        </FadeIn>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}><div style={{ borderTop: '1px solid #e5e5e5' }} /></div>

      {/* Breeds */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 8 }}>Five Breeds</p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 40 }}>The National Herd</h2>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {BREEDS.map((b, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{ background: '#FAFAFA', padding: '28px 24px', borderLeft: `3px solid ${sc[b.status] || '#8B6914'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                  <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, fontWeight: 400, fontStyle: 'italic', color: '#0a0a0a' }}>{b.name}</h3>
                  <span style={{ fontSize: 14, fontFamily: "'IBM Plex Mono', monospace", color: '#737373', direction: 'rtl' }}>{b.arabic}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", color: '#525252', lineHeight: 1.6 }}>
                  <div><span style={{ color: '#8B6914', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Population</span><br />{b.pop}</div>
                  <div><span style={{ color: '#8B6914', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Height</span><br />{b.height}</div>
                  <div><span style={{ color: '#8B6914', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Profile</span><br />{b.profile}</div>
                  <div><span style={{ color: '#8B6914', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Role</span><br />{b.role}</div>
                </div>
                <p style={{ fontSize: 12, color: '#262626', lineHeight: 1.7, marginTop: 12, fontFamily: "'IBM Plex Mono', monospace", maxWidth: 700 }}>{b.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <p style={{ fontSize: 10, color: '#a3a3a3', marginTop: 16, fontFamily: "'IBM Plex Mono', monospace" }}>Sources: SOREC, WAHO, OMCB, Mad Barn. © Slow Morocco</p>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}><div style={{ borderTop: '1px solid #e5e5e5' }} /></div>

      {/* Anatomy comparison */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 8 }}>Comparative Anatomy</p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 12 }}>The Barb Is Not an Arabian</h2>
          <p style={{ fontSize: 13, color: '#262626', maxWidth: 600, lineHeight: 1.7, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 40 }}>Europeans confused them for centuries. Same handlers, same language, similar size. But the Barb and the Arabian are anatomically distinct.</p>
        </FadeIn>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }}>
            <thead><tr style={{ borderBottom: '2px solid #0a0a0a' }}>
              {['Feature', 'Barb', 'Arabian', 'Why it matters'].map((h, i) => (
                <th key={i} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: i === 1 ? '#8B6914' : '#737373' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{ANATOMY.map((a, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0a0a0a', verticalAlign: 'top' }}>{a.f}</td>
                <td style={{ padding: '10px 12px', color: '#262626', lineHeight: 1.5, verticalAlign: 'top' }}>{a.barb}</td>
                <td style={{ padding: '10px 12px', color: '#525252', lineHeight: 1.5, verticalAlign: 'top' }}>{a.arab}</td>
                <td style={{ padding: '10px 12px', color: '#737373', lineHeight: 1.5, fontStyle: 'italic', verticalAlign: 'top' }}>{a.n}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}><div style={{ borderTop: '1px solid #e5e5e5' }} /></div>

      {/* Stud Farm Map */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 8 }}>Infrastructure</p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 12 }}>Five National Stud Farms</h2>
          <p style={{ fontSize: 13, color: '#262626', maxWidth: 560, lineHeight: 1.7, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 24 }}>SOREC operates five haras nationaux and 35 regional reproduction centres. Breeding season: February 1 – June 30.</p>
        </FadeIn>
        <SatelliteMap />
        <p style={{ fontSize: 10, color: '#a3a3a3', textAlign: 'center', marginTop: 10, letterSpacing: '0.03em' }}>Satellite imagery © Mapbox / © OpenStreetMap. Tap markers for details.</p>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}><div style={{ borderTop: '1px solid #e5e5e5' }} /></div>

      {/* Global Descendants */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 8 }}>Global Descendants</p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 12 }}>What the Barb Built</h2>
          <p style={{ fontSize: 13, color: '#262626', maxWidth: 600, lineHeight: 1.7, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 40 }}>The Barb has had more influence on racing breeds than any horse except the Arabian. The irony: a Moroccan Barb is one of the three stallions that founded the Thoroughbred itself.</p>
        </FadeIn>
        <FadeIn delay={0.1}><InfluenceDiagram /></FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 40 }}>
          {DESCENDANTS.map((d, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 16, padding: '16px 20px', background: i % 2 === 0 ? '#FAFAFA' : '#fff', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.6 }}>
                <div><span style={{ fontWeight: 600, color: '#0a0a0a', fontSize: 13 }}>{d.breed}</span><br /><span style={{ color: '#737373' }}>{d.region} · {d.era}</span></div>
                <div style={{ color: '#262626' }}>{d.mech}</div>
                <div style={{ color: '#525252', fontStyle: 'italic' }}>{d.note}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <p style={{ fontSize: 10, color: '#a3a3a3', marginTop: 16, fontFamily: "'IBM Plex Mono', monospace" }}>Sources: Wikipedia, SBHA, Oklahoma State, Woman O'War. © Slow Morocco</p>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}><div style={{ borderTop: '1px solid #e5e5e5' }} /></div>

      {/* Timeline */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 8 }}>3,500 Years</p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 40 }}>Timeline</h2>
        </FadeIn>
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: '#e5e5e5' }} />
          {TIMELINE.map((t, i) => (
            <FadeIn key={i} delay={i * 0.02}>
              <div style={{ position: 'relative', marginBottom: 28 }}>
                <div style={{ position: 'absolute', left: -28, top: 6, width: 10, height: 10, borderRadius: '50%', background: tc[t.t] || '#8B6914' }} />
                <p style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: tc[t.t] || '#8B6914', letterSpacing: '0.04em', marginBottom: 4 }}>{t.y}</p>
                <p style={{ fontSize: 13, color: '#262626', lineHeight: 1.7, fontFamily: "'IBM Plex Mono', monospace", maxWidth: 700 }}>{t.e}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}><div style={{ borderTop: '1px solid #e5e5e5' }} /></div>

      {/* The Godolphin */}
      <section style={{ padding: '80px 24px', maxWidth: 760, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: 8 }}>The Horse That Changed Everything</p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 24 }}>The Godolphin</h2>
          <div style={{ fontSize: 14, color: '#262626', lineHeight: 1.85, fontFamily: "'IBM Plex Mono', monospace" }}>
            <p style={{ marginBottom: 20 }}>Around 1724, a colt is foaled — in Yemen according to some sources, from the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Meknes</span> stud farm according to SOREC. He passes through Syria, then Tunis, then arrives in Paris as a gift from one monarch to another. Louis XV does not value him. The horse reportedly pulls a water cart through the streets of the French capital.</p>
            <p style={{ marginBottom: 20 }}>In 1729, an Englishman named Edward Coke spots the horse and imports him to England. He is small. He is lop-eared. He has a bad temper. But when he is bred, he produces champions. His son Lath becomes one of the finest racehorses of his generation. His grandson Matchem becomes a champion sire for sixteen consecutive years.</p>
            <p style={{ marginBottom: 20 }}>He is called the Godolphin Arabian after his most famous owner — though many argue he is a Barb, not an Arabian. His head is convex, not dished. His build is compact, not refined. His conformation says Maghreb, not Peninsula.</p>
            <p style={{ marginBottom: 20 }}>He becomes one of three foundation stallions of the Thoroughbred. Through his male line come Man o{"'"}War, War Admiral, and Seabiscuit. Through both male and female lines, his blood flows in approximately 13.8% of all modern Thoroughbreds — making him the single most influential foundation sire when both lines are counted.</p>
            <p>He dies in 1753, aged about 29, buried at his owner{"'"}s stable in Cambridgeshire. A horse from the Maghreb — possibly from Meknes, possibly from Yemen, certainly from the bloodline of the Barb — who was used to pull a water cart, became the ancestor of a million racehorses.</p>
          </div>
        </FadeIn>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}><div style={{ borderTop: '1px solid #e5e5e5' }} /></div>

      {/* Closing */}
      <section style={{ padding: '80px 24px', maxWidth: 760, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ borderLeft: '3px solid #8B6914', padding: '16px 24px' }}>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontStyle: 'italic', lineHeight: 1.6, color: '#0a0a0a' }}>
              The Barb dies but never gives up. It is the horse that built the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Andalusian</span>, the Thoroughbred, the Mustang, and the Quarter Horse. It won Cannae. It crossed the Alps with Hannibal and the Atlantic with Columbus. It pulled a water cart in Paris and founded a billion-dollar racing industry. And in the mountains of the Maghreb, where it was born 3,500 years ago, it is still running.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Sources */}
      <section style={{ padding: '40px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a3a3a3', marginBottom: 12, fontFamily: "'IBM Plex Mono', monospace" }}>Sources</p>
        <div style={{ fontSize: 11, color: '#737373', lineHeight: 1.8, fontFamily: "'IBM Plex Mono', monospace", columns: '280px 2' }}>
          <p>SOREC — sorec.ma/en/horse-breeds-in-morocco</p>
          <p>WAHO Morocco Delegation Report (2018)</p>
          <p>Wikipedia — Barb horse, Arab-Barb, Numidian cavalry, Godolphin Arabian</p>
          <p>Mad Barn — Barb Horse Breed Profile (2023)</p>
          <p>Horse Illustrated — Berber Horses of Morocco (2021)</p>
          <p>National Geographic — Fantasia Horse Riders (2021)</p>
          <p>UNESCO — Tbourida inscription (2021)</p>
          <p>PMC — Y Chromosome Haplotypes, North African Barb (2022)</p>
          <p>Oklahoma State University — Barb Horses breed database</p>
          <p>Spanish Barb Horse Association — spanishbarb.com</p>
          <p>Polybius, Livy, Claudius Aelianus — Classical sources</p>
        </div>
        <p style={{ fontSize: 10, color: '#a3a3a3', marginTop: 16, fontFamily: "'IBM Plex Mono', monospace" }}>© Slow Morocco · slowmorocco.com</p>
      </section>
    </div>
  )
}
