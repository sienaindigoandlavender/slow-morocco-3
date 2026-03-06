'use client'

import { useEffect, useRef, useState } from 'react'

// ══════════════════════════════════════════════════
// MODULE 136 — THE MEMORY IN THE STONE
// Rock Art Across Africa
// 75,000 years. 50,000+ sites. One climate archive.
// ══════════════════════════════════════════════════

const BIG_NUMBERS = [
  { value: '75,000', unit: 'years', label: 'Oldest symbolic art in Africa — Blombos Cave engraved ochre' },
  { value: '27,500', unit: 'years', label: 'Oldest figurative rock art — Apollo 11 Cave, Namibia' },
  { value: '50,000+', unit: 'sites', label: 'Estimated rock art sites in southern Africa alone (ICOMOS)' },
  { value: '2M+', unit: 'images', label: 'Conservative estimate of individual images in southern Africa' },
  { value: '8', unit: 'UNESCO sites', label: 'Rock art World Heritage Sites — more than any other continent' },
  { value: '5', unit: 'periods', label: 'Saharan art phases: Wild Fauna → Round Head → Pastoral → Horse → Camel' },
]

interface RockArtSite {
  name: string; country: string; lat: number; lng: number; age: string
  type: 'painting' | 'engraving' | 'both'; unesco: boolean; imageCount?: string
  description: string; highlight: string; region: 'sahara' | 'east' | 'southern' | 'horn'
}

const SITES: RockArtSite[] = [
  { name: 'Blombos Cave', country: 'South Africa', lat: -34.41, lng: 21.22, age: '~75,000 BCE', type: 'engraving', unesco: false, description: 'Engraved ochre with crosshatch motifs — the oldest known symbolic expression in Africa. Also the world\'s earliest drawing (73,000 BCE). Evidence of abstract thought and possibly language.', highlight: 'Oldest symbolic art in Africa', region: 'southern' },
  { name: 'Apollo 11 Cave', country: 'Namibia', lat: -27.74, lng: 17.09, age: '~27,500 BCE', type: 'painting', unesco: false, description: 'Seven quartzite slabs painted with charcoal and ochre — animal figures including a possible therianthrope. Discovered by W.E. Wendt in 1969. Named after the moon landing happening during the dig.', highlight: 'Oldest figurative rock art in Africa', region: 'southern' },
  { name: 'Tassili n\'Ajjer', country: 'Algeria', lat: 25.67, lng: 8.0, age: '12,000–2,000 BP', type: 'both', unesco: true, imageCount: '15,000+', description: 'Sandstone plateau in the central Sahara with the densest rock art concentration in Africa. Records five periods — from giant wild fauna to camels. Documents the Green Sahara: hippos, crocodiles, elephants, and swimming humans in what is now the driest desert on Earth.', highlight: 'Densest concentration in Africa', region: 'sahara' },
  { name: 'Tadrart Acacus', country: 'Libya', lat: 24.84, lng: 10.35, age: '12,000 BP', type: 'both', unesco: true, description: 'Thousands of cave paintings and engravings across five art phases. Borders Tassili n\'Ajjer, shares its cultural traditions. Documents transformation from savanna to desert over 10,000 years.', highlight: 'Five art periods over 10,000 years', region: 'sahara' },
  { name: 'Ennedi Massif', country: 'Chad', lat: 17.2, lng: 22.0, age: '7,000–2,000 BP', type: 'both', unesco: true, description: 'Sandstone plateau in northeastern Chad. Green oases still attract life. Rock art from the Pastoral and Horse periods. UNESCO mixed natural/cultural site since 2016.', highlight: 'Living landscape — oases still function', region: 'sahara' },
  { name: 'Cave of Swimmers', country: 'Egypt', lat: 23.52, lng: 25.69, age: '~10,000 BP', type: 'painting', unesco: false, description: 'Discovered by László Almásy in 1933 in the Gilf Kebir plateau. Small human figures in swimming postures — proof this region once held permanent water. Featured in The English Patient.', highlight: 'Swimming figures in the Sahara', region: 'sahara' },
  { name: 'Dabous Giraffes', country: 'Niger', lat: 18.4, lng: 7.8, age: '6,000–8,000 BP', type: 'engraving', unesco: false, imageCount: '828', description: 'Two life-size giraffe petroglyphs — the largest animal carvings on Earth. The larger measures 5.4 metres. Each has a mysterious line from its mouth to a small human figure. Where the Ténéré meets the Aïr Mountains.', highlight: 'Largest animal petroglyphs on Earth', region: 'sahara' },
  { name: 'Morocco Atlas Sites', country: 'Morocco', lat: 30.3, lng: -6.0, age: '5,000+ BP', type: 'engraving', unesco: false, imageCount: '921+', description: '300+ rock art sites across the High Atlas and Saharan south. Mainly engravings: antelope, cattle, elephants, rhinoceros, warriors, weapons. Oukaïmeden at 2,630m has 1,068 engravings alone.', highlight: '300+ sites across Atlas and Sahara', region: 'sahara' },
  { name: 'Laas Geel', country: 'Somaliland', lat: 9.78, lng: 44.47, age: '5,500–4,500 BP', type: 'painting', unesco: false, description: 'Polychrome paintings of cattle in ceremonial robes, herders, dogs, giraffes. Best-preserved rock paintings in Africa. Known locally for centuries as "the place of devils." Cannot receive UNESCO status because Somaliland is unrecognised.', highlight: 'Best-preserved — blocked from UNESCO by politics', region: 'horn' },
  { name: 'Kondoa-Irangi', country: 'Tanzania', lat: -4.9, lng: 35.78, age: '1,500+ BP', type: 'painting', unesco: true, description: 'Rock paintings on the Maasai Escarpment, western edge of the Great Rift Valley. Multiple styles from hunter-gatherers to agriculturalists. Still used for ritual purposes.', highlight: 'Still ritually active', region: 'east' },
  { name: 'Chongoni', country: 'Malawi', lat: -14.3, lng: 34.3, age: '2,500+ BP', type: 'painting', unesco: true, imageCount: '127 sites', description: 'Richest rock art concentration in Central Africa. Unusual white schematic paintings by Chewa agriculturalists for initiation, rain-making, funeral rites. Symbols still culturally active.', highlight: 'Farmer rock art — symbols still living', region: 'east' },
  { name: 'Matobo Hills', country: 'Zimbabwe', lat: -20.5, lng: 28.5, age: '13,000+ BP', type: 'painting', unesco: true, description: 'Granite inselbergs with profuse San rock paintings. Spirit-world art: therianthropes, trance rituals. Continuous occupation from Early Stone Age. Shrines still in active use.', highlight: 'San spirit-world art — shrines still active', region: 'southern' },
  { name: 'Tsodilo Hills', country: 'Botswana', lat: -18.75, lng: 21.73, age: '~2,000 BP', type: 'painting', unesco: true, imageCount: '4,500+', description: 'Four quartzite hills on the Kalahari edge — 4,500+ paintings, highest concentration per km² in the world. San call it "the Rock that Whispers." The eland is central to San cosmology.', highlight: 'Highest density per km² in the world', region: 'southern' },
  { name: 'Twyfelfontein', country: 'Namibia', lat: -20.59, lng: 14.37, age: '6,000–2,000 BP', type: 'both', unesco: true, imageCount: '2,000+', description: 'Largest petroglyph concentrations in Africa. 235 sandstone surfaces: rhino, elephant, giraffe, ostrich, lion-man therianthrope. Giraffes = 40% of all images. Namibia\'s first World Heritage Site.', highlight: 'Namibia\'s first World Heritage Site', region: 'southern' },
  { name: 'Drakensberg', country: 'South Africa / Lesotho', lat: -29.0, lng: 29.25, age: '~3,000 BP', type: 'painting', unesco: true, description: 'The finest San rock painting tradition. Trance dances, rain-making, eland hunts, therianthropic transformation. Shamans painted portals to the spirit world. One of the last painters, Lindiso Dyantyi, worked into the 1930s.', highlight: 'Finest San tradition — shamanic art', region: 'southern' },
  { name: 'Brandberg', country: 'Namibia', lat: -21.15, lng: 14.52, age: '~2,000 BP', type: 'painting', unesco: false, description: 'Namibia\'s highest mountain. Home to the "White Lady" (actually a male figure in trance). Thousands of San paintings. On the UNESCO Tentative List.', highlight: 'The "White Lady" — Africa\'s most famous painting', region: 'southern' },
]

const SAHARAN_PERIODS = [
  { name: 'Large Wild Fauna', dates: '12,000–6,000 BP', color: '#5D4037', animals: 'Hippos, rhinos, elephants, giraffes, aurochs', climate: 'Green Sahara — rivers, lakes, savanna', desc: 'The oldest Saharan art. Animals that no longer exist in the region.' },
  { name: 'Round Head', dates: '9,500–7,000 BP', color: '#6A1B9A', animals: 'Abstract forms, ritual figures', climate: 'Mega-lakes, abundant wildlife', desc: 'Tassili specialty. Featureless round heads. The most mysterious Saharan art.' },
  { name: 'Pastoral', dates: '7,000–3,200 BP', color: '#2E7D32', animals: 'Cattle herds, sheep, goats', climate: 'Drying begins — pastoralism replaces hunting', desc: 'The largest body of Saharan art. Documents Africa\'s agricultural revolution.' },
  { name: 'Horse', dates: '3,200–1,000 BP', color: '#1565C0', animals: 'Horses, chariots, warriors', climate: 'Arid — Sahara forming', desc: 'Introduction of the horse. Chariots cross the desert.' },
  { name: 'Camel', dates: '3,000–2,000 BP', color: '#C62828', animals: 'Camels, cattle, goats', climate: 'Full desert', desc: 'The final period. The camel arrives. Tifinâgh script appears.' },
]

const TIMELINE = [
  { year: '~75,000 BCE', event: 'Blombos Cave, South Africa. Engraved ochre with crosshatch patterns — the oldest symbolic art in Africa.', type: 'origin' },
  { year: '~27,500 BCE', event: 'Apollo 11 Cave, Namibia. Painted quartzite slabs — Africa\'s oldest figurative rock art. Named after the moon landing during the dig.', type: 'origin' },
  { year: '~12,000 BCE', event: 'Saharan rock art begins. Large Wild Fauna period — hippos, elephants, rhinos in what is now the driest desert on Earth.', type: 'sahara' },
  { year: '~9,500 BCE', event: 'Round Head period, Tassili n\'Ajjer. Mysterious figures with featureless heads. Lake Mega-Chad is the size of the Caspian Sea.', type: 'sahara' },
  { year: '~7,000 BCE', event: 'Pastoral period begins. Cattle replace wild fauna as the dominant subject. Africa\'s agricultural revolution documented in real time.', type: 'sahara' },
  { year: '~6,000 BCE', event: 'Dabous Giraffes, Niger. Two life-size giraffe petroglyphs — the largest animal carvings in the world. 5.4 metres tall.', type: 'masterwork' },
  { year: '~5,000 BCE', event: 'Twyfelfontein, Namibia. San hunter-gatherers engrave animals near a desert spring. 2,000+ images over the next 4,000 years.', type: 'southern' },
  { year: '~3,500 BCE', event: 'Laas Geel, Somaliland. Polychrome paintings of cattle in ceremonial robes. Known locally for centuries; unknown to science until 2002.', type: 'horn' },
  { year: '~3,200 BCE', event: 'Horse period. Chariots cross the Sahara. The desert is drying — populations retreat to the Nile, the Niger bend, the coast.', type: 'sahara' },
  { year: '~3,000 BCE', event: 'Drakensberg, South Africa. San shamans paint trance dances, rain-making, therianthropes — portals to the spirit world.', type: 'southern' },
  { year: '~1,000 BCE', event: 'Camel period. The final chapter of Saharan rock art. Tifinâgh script appears. Trans-Saharan trade routes are born.', type: 'sahara' },
  { year: '1930s CE', event: 'Lindiso Dyantyi, one of the last San painters, works in the Drakensberg. A 27,000-year tradition ends.', type: 'end' },
  { year: '2002', event: 'Laas Geel discovered by French archaeologists. 5,000-year-old paintings in pristine condition. No UNESCO — Somaliland is unrecognised.', type: 'modern' },
]

const UNESCO_SITES = [
  'Tassili n\'Ajjer, Algeria (1982)', 'Tadrart Acacus, Libya (1985)',
  'uKhahlamba-Drakensberg, South Africa (2000)', 'Tsodilo, Botswana (2001)',
  'Matobo Hills, Zimbabwe (2003)', 'Kondoa-Irangi, Tanzania (2006)',
  'Chongoni, Malawi (2006)', 'Twyfelfontein, Namibia (2007)',
  'Ennedi Massif, Chad (2016)',
]

// ── Helpers ──

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Fade({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  )
}

const mono = "'IBM Plex Mono', monospace"
const serif = "'Instrument Serif', Georgia, serif"
const rc: Record<string, string> = { sahara: '#8B6914', east: '#2E7D32', southern: '#1565C0', horn: '#C62828' }

// ── Africa Map ──

// ── Satellite Map ──

function SatelliteMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!mapRef.current || loaded) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js'
    script.onload = () => {
      const mapboxgl = (window as any).mapboxgl
      if (!mapboxgl) return
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      const map = new mapboxgl.Map({
        container: mapRef.current!,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [8.0, 25.67],
        zoom: 8.5,
        pitch: 0,
        bearing: 0,
        interactive: true,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.ScaleControl({ maxWidth: 200 }), 'bottom-left')
      map.on('load', () => {
        new mapboxgl.Marker({ color: '#8B6914' })
          .setLngLat([9.485, 24.555])
          .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML('<div style="font-family:IBM Plex Mono,monospace;font-size:11px;padding:4px"><strong>Djanet</strong><br/>Gateway to Tassili</div>'))
          .addTo(map)
        new mapboxgl.Marker({ color: '#C62828' })
          .setLngLat([7.98, 25.75])
          .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML('<div style="font-family:IBM Plex Mono,monospace;font-size:11px;padding:4px"><strong>Sefar</strong><br/>~15,000 rock art images</div>'))
          .addTo(map)
      })
      setLoaded(true)
    }
    document.head.appendChild(script)
  }, [loaded])

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', background: '#1a1a1a' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute', bottom: 16, right: 16, background: 'rgba(0,0,0,0.7)',
        padding: '8px 14px', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
        color: '#ffffff', letterSpacing: '0.02em',
      }}>
        {"25.67°N, 8.0°E — Tassili n'Ajjer, Algeria"}
      </div>
      <div style={{
        position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.7)',
        padding: '8px 14px', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace",
        color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase',
      }}>
        Satellite View — Mapbox
      </div>
    </div>
  )
}

function AfricaMap() {
  const [hovered, setHovered] = useState<number | null>(null)
  const proj = (lat: number, lng: number): [number, number] => [
    ((lng + 20) / 70) * 440 + 30,
    ((38 - lat) / 75) * 520 + 20,
  ]
  return (
    <svg viewBox="0 0 500 560" style={{ width: '100%', maxWidth: 520, display: 'block', margin: '0 auto' }}>
      <path d="M170 30 L220 20 L280 25 L330 35 L360 50 L380 80 L410 100 L430 130 L440 160 L435 200 L420 250 L430 290 L440 330 L430 370 L400 400 L370 430 L340 460 L310 485 L280 500 L250 510 L225 505 L210 490 L200 470 L195 440 L200 410 L190 380 L170 360 L155 330 L135 310 L115 280 L100 250 L95 220 L90 190 L80 170 L70 150 L60 130 L70 110 L90 90 L110 70 L130 50Z" fill="#F7F4EF" stroke="#d4d4d4" strokeWidth={1} />
      <path d="M410 390 L425 380 L430 400 L425 430 L415 440 L405 420Z" fill="#F7F4EF" stroke="#d4d4d4" strokeWidth={0.5} />
      <ellipse cx={225} cy={130} rx={120} ry={50} fill="#8B6914" opacity={0.04} />
      <text x={225} y={134} textAnchor="middle" fontSize={8} fontFamily={mono} fill="#8B6914" opacity={0.35}>SAHARA</text>
      {SITES.map((s, i) => {
        const [x, y] = proj(s.lat, s.lng); const c = rc[s.region]; const h = hovered === i
        return (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            {s.unesco && <circle cx={x} cy={y} r={8} fill="none" stroke="#D4AF37" strokeWidth={1.5} opacity={0.4} />}
            <circle cx={x} cy={y} r={h ? 5.5 : 3.5} fill={c} opacity={h ? 1 : 0.7} style={{ transition: 'all 0.2s' }} />
            {h && (
              <g>
                <rect x={x > 300 ? x - 175 : x + 10} y={y - 28} width={165} height={40} rx={3} fill="white" stroke="#e5e5e5" />
                <text x={x > 300 ? x - 169 : x + 16} y={y - 12} fontSize={8} fontWeight={600} fontFamily={mono} fill="#0a0a0a">{s.name}</text>
                <text x={x > 300 ? x - 169 : x + 16} y={y + 2} fontSize={7} fontFamily={mono} fill="#737373">{s.age} · {s.country}</text>
              </g>
            )}
          </g>
        )
      })}
      <g transform="translate(16, 520)">
        {Object.entries(rc).map(([r, c], i) => (
          <g key={r} transform={`translate(${i * 90}, 0)`}><circle cx={4} cy={0} r={3.5} fill={c} /><text x={12} y={3} fontSize={7} fontFamily={mono} fill="#737373">{r}</text></g>
        ))}
        <g transform="translate(370, 0)"><circle cx={4} cy={0} r={6} fill="none" stroke="#D4AF37" strokeWidth={1.5} /><text x={14} y={3} fontSize={7} fontFamily={mono} fill="#D4AF37">UNESCO</text></g>
      </g>
      <text x={250} y={548} textAnchor="middle" fontSize={7} fontFamily={mono} fill="#a3a3a3">16 major sites · 9 UNESCO World Heritage Sites</text>
    </svg>
  )
}

// ── Periods Chart ──

function PeriodsChart() {
  const span = 12000
  const xp = (bp: number) => 50 + ((12000 - bp) / span) * 520
  return (
    <svg viewBox="0 0 600 200" style={{ width: '100%' }}>
      <line x1={50} y1={170} x2={570} y2={170} stroke="#d4d4d4" />
      {[12000, 10000, 8000, 6000, 4000, 2000, 0].map(yr => (
        <g key={yr}><line x1={xp(yr)} y1={168} x2={xp(yr)} y2={172} stroke="#a3a3a3" /><text x={xp(yr)} y={185} textAnchor="middle" fontSize={7} fontFamily={mono} fill="#a3a3a3">{yr === 0 ? 'Present' : `${yr / 1000}k BP`}</text></g>
      ))}
      <rect x={xp(12000)} y={152} width={xp(5000) - xp(12000)} height={10} fill="#2E7D32" opacity={0.08} rx={2} />
      <text x={(xp(12000) + xp(5000)) / 2} y={160} textAnchor="middle" fontSize={6} fontFamily={mono} fill="#2E7D32" fontWeight={600}>GREEN SAHARA</text>
      <rect x={xp(5000)} y={152} width={xp(0) - xp(5000)} height={10} fill="#C62828" opacity={0.06} rx={2} />
      <text x={(xp(5000) + xp(0)) / 2} y={160} textAnchor="middle" fontSize={6} fontFamily={mono} fill="#C62828">DESERT</text>
      {SAHARAN_PERIODS.map((p, i) => {
        const s = parseInt(p.dates.split('\u2013')[0].replace(/,/g, ''))
        const e = parseInt(p.dates.split('\u2013')[1].replace(/,/g, '').replace(' BP', ''))
        const x1 = xp(s); const x2 = xp(e); const y = 14 + i * 26
        return (
          <g key={i}>
            <rect x={x1} y={y} width={x2 - x1} height={18} rx={3} fill={p.color} opacity={0.12} />
            <rect x={x1} y={y} width={x2 - x1} height={18} rx={3} fill="none" stroke={p.color} strokeWidth={0.8} opacity={0.4} />
            <text x={x1 + 6} y={y + 12} fontSize={7} fontFamily={mono} fill={p.color} fontWeight={600}>{p.name}</text>
            <text x={x2 + 6} y={y + 12} fontSize={6} fontFamily={mono} fill="#737373">{p.animals.split(',')[0]}</text>
          </g>
        )
      })}
      <text x={300} y={198} textAnchor="middle" fontSize={7} fontFamily={mono} fill="#a3a3a3">Five periods of Saharan rock art — a 12,000-year climate record</text>
    </svg>
  )
}

// ══════════════════════════════════════════════════
// MAIN CONTENT
// ══════════════════════════════════════════════════

export function TheMemoryInTheStoneContent() {
  const tc: Record<string, string> = { origin: '#5D4037', sahara: '#8B6914', masterwork: '#D4AF37', southern: '#1565C0', horn: '#C62828', end: '#737373', modern: '#2E7D32' }

  return (
    <div style={{ background: '#ffffff', color: '#0a0a0a', fontFamily: mono }}>

      {/* HERO */}
      <section style={{ padding: '120px 24px 80px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <Fade><p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5D4037', marginBottom: 24 }}>Module 136 — Cultural Intelligence</p></Fade>
        <Fade delay={0.1}>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 0.95, margin: '0 0 32px' }}>
            The Memory<br />in the Stone
          </h1>
        </Fade>
        <Fade delay={0.2}>
          <p style={{ fontSize: 15, lineHeight: 1.8, maxWidth: 620, margin: '0 auto', color: '#262626' }}>
            Africa holds the oldest, densest, and most diverse rock art on Earth. Across 50,000 sites
            and 75,000 years, the continent&apos;s earliest artists painted and engraved what they saw:
            hippos in the Sahara, cattle where dunes now stand, elephants in the Namib.
            They were not making art. They were building a climate archive.
          </p>
        </Fade>
      </section>

      {/* BIG NUMBERS */}
      <section style={{ padding: '40px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {BIG_NUMBERS.map((n, i) => (
            <Fade key={i} delay={i * 0.06}>
              <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: 20 }}>
                <span style={{ fontFamily: serif, fontSize: 48, fontWeight: 400, fontStyle: 'italic', lineHeight: 1 }}>{n.value}</span>
                <span style={{ fontSize: 12, color: '#8B6914', marginLeft: 8 }}>{n.unit}</span>
                <p style={{ fontSize: 12, color: '#525252', marginTop: 8, lineHeight: 1.6 }}>{n.label}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section style={{ padding: '40px 24px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <Fade>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', marginBottom: 8 }}>The Sites</h2>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#525252', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
            From the Saharan plateaus to the Cape, rock art traces human presence across the continent. Hover to explore.
          </p>
        </Fade>
        <Fade delay={0.1}><AfricaMap /></Fade>
      </section>

      {/* TASSILI SATELLITE VIEW */}
      <section style={{ padding: '40px 0' }}>
        <Fade>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 16px' }}>
            <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 8 }}>
              Satellite Imagery
            </p>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 8 }}>
              The Forest of Stone
            </h2>
            <p style={{ fontSize: 13, color: '#737373', maxWidth: 600, lineHeight: 1.6 }}>
              {"Tassili n'Ajjer — \"plateau of chasms\" in Tamahaq — rises 500 metres above the Saharan plain in southeast Algeria. Wind and water carved 72,000 km² of sandstone into arches, pillars, and sheltered corridors where more than 15,000 paintings and engravings survived for 12,000 years. UNESCO World Heritage since 1982."}
            </p>
          </div>
          <SatelliteMap />
          <p style={{ fontSize: 10, color: '#a3a3a3', textAlign: 'center', marginTop: 10, letterSpacing: '0.03em' }}>
            Satellite imagery © Mapbox / © OpenStreetMap. Djanet (gold) and Sefar (red) marked.
          </p>
        </Fade>
      </section>

      {/* SITE CARDS */}
      <section style={{ padding: '40px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {SITES.map((s, i) => {
            const c = rc[s.region]
            return (
              <Fade key={i} delay={i * 0.03}>
                <div style={{ border: '1px solid #e5e5e5', padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: c, flexShrink: 0 }} />
                    {s.unesco && <span style={{ fontSize: 9, color: '#D4AF37', border: '1px solid #D4AF37', padding: '1px 6px', borderRadius: 2 }}>UNESCO</span>}
                    <span style={{ fontSize: 10, color: '#737373', marginLeft: 'auto' }}>
                      {s.type === 'both' ? 'Paintings & Engravings' : s.type === 'painting' ? 'Paintings' : 'Engravings'}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, fontStyle: 'italic', margin: '0 0 4px' }}>{s.name}</h3>
                  <p style={{ fontSize: 11, color: '#737373', margin: '0 0 12px' }}>{s.country} · {s.age}{s.imageCount ? ` · ${s.imageCount} images` : ''}</p>
                  <p style={{ fontSize: 12, color: '#262626', lineHeight: 1.7, flex: 1 }}>{s.description}</p>
                  <p style={{ fontSize: 11, color: c, marginTop: 16, fontWeight: 600, borderTop: `1px solid ${c}20`, paddingTop: 12 }}>{s.highlight}</p>
                </div>
              </Fade>
            )
          })}
        </div>
      </section>

      {/* SAHARAN PERIODS */}
      <section style={{ padding: '60px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <Fade>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', marginBottom: 8 }}>The Desert&apos;s Autobiography</h2>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#525252', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Saharan rock art unfolds in five periods. Each records a different climate, economy, and relationship with the land.
            Together they document the transformation of the world&apos;s largest desert from savanna to sand.
          </p>
        </Fade>
        <Fade delay={0.1}>
          <div style={{ overflowX: 'auto', marginBottom: 40 }}><PeriodsChart /></div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {SAHARAN_PERIODS.map((p, i) => (
            <Fade key={i} delay={i * 0.05}>
              <div style={{ borderLeft: `3px solid ${p.color}`, paddingLeft: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: p.color, margin: '0 0 4px' }}>{p.name}</p>
                <p style={{ fontSize: 10, color: '#737373', margin: '0 0 8px' }}>{p.dates}</p>
                <p style={{ fontSize: 12, color: '#262626', lineHeight: 1.6, margin: '0 0 8px' }}>{p.desc}</p>
                <p style={{ fontSize: 11, color: '#525252' }}><strong>Subjects:</strong> {p.animals}</p>
                <p style={{ fontSize: 11, color: '#525252' }}><strong>Climate:</strong> {p.climate}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* CLIMATE ARCHIVE ESSAY */}
      <section style={{ padding: '60px 24px', maxWidth: 800, margin: '0 auto' }}>
        <Fade>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', marginBottom: 32 }}>The Accidental Climate Record</h2>
        </Fade>
        <Fade delay={0.1}>
          <div style={{ fontSize: 14, color: '#262626', lineHeight: 1.85, maxWidth: 640, margin: '0 auto' }}>
            <p style={{ marginBottom: 20 }}>The artists of the Sahara were not climate scientists. They painted what they hunted, herded, and revered. But in doing so, they created one of the most comprehensive environmental records on Earth — a 12,000-year dataset encoded in pigment and stone.</p>
            <p style={{ marginBottom: 20 }}>The Large Wild Fauna period records a Sahara that held hippos, crocodiles, elephants, and rhinoceros — animals requiring permanent water, dense vegetation, and stable ecosystems. The Pastoral period records the domestication of cattle and the spread of herding across what was still grassland. The Horse and Camel periods record the progressive drying that forced populations south to the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Sahel</span> and east to the Nile.</p>
            <p style={{ marginBottom: 20 }}>In southern Africa, the record runs deeper. The San painted not landscapes but cosmologies — the eland dance, the rain animal, the therianthropic transformation of shamans into spirit beings. These encode not climate data but cognitive data: evidence that Homo sapiens had developed symbolic thought, religious practice, and artistic tradition at least 27,000 years before Sumerian cuneiform.</p>
            <p style={{ marginBottom: 20 }}>The Dabous Giraffes in Niger stand 5.4 metres tall — the largest animal carvings on the planet — in a desert where no giraffe has walked for thousands of years. The Cave of Swimmers in Egypt shows humans swimming in a region receiving less than 1mm of annual rainfall. Twyfelfontein records rhinoceros, elephant, and giraffe in a valley that today supports only sparse scrubland.</p>
            <p>Across the continent, the stone remembers what the landscape has forgotten. Two million images. Fifty thousand sites. Seventy-five thousand years. The longest-running documentation project in human history — and nobody planned it.</p>
          </div>
        </Fade>
      </section>

      {/* DABOUS SPOTLIGHT */}
      <section style={{ padding: '60px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <Fade>
          <div style={{ border: '1px solid #D4AF37', padding: 'clamp(24px, 4vw, 48px)', maxWidth: 800, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: 16 }}>Spotlight</p>
            <h3 style={{ fontFamily: serif, fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>The Dabous Giraffes — Niger</h3>
            <div style={{ fontSize: 13, color: '#262626', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>Two life-size giraffes carved into sandstone where the Ténéré Desert meets the Aïr Mountains. The larger measures 5.4 metres from ears to hind leg — the largest animal petroglyph on Earth. Carved 6,000–8,000 years ago using scraping, smoothing, and deep engraving, without metal tools.</p>
              <p style={{ marginBottom: 16 }}>Each giraffe has an incised line from its mouth leading to a small human figure below. This motif appears across Saharan rock art but remains unexplained — domestication attempt, spiritual connection, or myth. The surrounding outcrop holds 828 additional engravings: 704 animals (46% bovines, 16% ostriches, 16% antelope, 16% giraffes), 61 humans, and 17 Tifinâgh inscriptions.</p>
              <p>First recorded by Christian Dupuy in 1987. By 1999, the Bradshaw Foundation and UNESCO created a silicon mould and aluminium casts after damage from trampling and graffiti. One cast stands at Agadez airport. A well was sunk nearby to support a Tuareg community who serve as permanent custodians.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16, marginTop: 24, borderTop: '1px solid #e5e5e5', paddingTop: 20 }}>
              {[{ v: '5.4 m', l: 'Height of the larger giraffe' }, { v: '828', l: 'Total engravings at site' }, { v: '6,000–8,000', l: 'Years before present' }, { v: '1987', l: 'First recorded' }].map((d, i) => (
                <div key={i}><p style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, fontStyle: 'italic', margin: 0 }}>{d.v}</p><p style={{ fontSize: 10, color: '#737373', margin: '4px 0 0' }}>{d.l}</p></div>
              ))}
            </div>
          </div>
        </Fade>
      </section>

      {/* LAAS GEEL SPOTLIGHT */}
      <section style={{ padding: '0 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <Fade>
          <div style={{ border: '1px solid #C62828', padding: 'clamp(24px, 4vw, 48px)', maxWidth: 800, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C62828', marginBottom: 16 }}>Spotlight</p>
            <h3 style={{ fontFamily: serif, fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>Laas Geel — Somaliland</h3>
            <div style={{ fontSize: 13, color: '#262626', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>Between Hargeisa and Berbera, in granite rock shelters, lie the best-preserved prehistoric paintings in Africa. Polychrome cattle with curved horns, streaked necks, and prominent udders stand above small human figures with outstretched arms. Some cattle wear what appear to be ceremonial robes.</p>
              <p style={{ marginBottom: 16 }}>Local communities called the site &quot;the place of devils&quot; for centuries. A French team led by Xavier Gutherz formally documented it in 2002. The vivid colours survive because granite overhangs shield them from wind and rain.</p>
              <p>Laas Geel cannot receive UNESCO World Heritage status. Somaliland declared independence from Somalia in 1991 but is not internationally recognised. Somalia&apos;s government has not ratified UNESCO&apos;s World Heritage Convention. One of the most significant archaeological sites in Africa has no international legal protection because of a political boundary the paintings predate by 5,000 years.</p>
            </div>
          </div>
        </Fade>
      </section>

      {/* UNESCO */}
      <section style={{ padding: '40px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
        <Fade>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', marginBottom: 24 }}>UNESCO Rock Art Heritage Sites in Africa</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 8 }}>
            {UNESCO_SITES.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', border: '1.5px solid #D4AF37', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#262626' }}>{s}</span>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: '60px 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <Fade><h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', marginBottom: 40 }}>75,000 Years in Stone</h2></Fade>
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: '#e5e5e5' }} />
          {TIMELINE.map((t, i) => (
            <Fade key={i} delay={i * 0.04}>
              <div style={{ marginBottom: 28, position: 'relative' }}>
                <div style={{ position: 'absolute', left: -28, top: 4, width: 10, height: 10, borderRadius: '50%', background: tc[t.type] || '#737373', border: '2px solid white' }} />
                <p style={{ fontSize: 11, fontWeight: 700, color: tc[t.type] || '#737373', margin: '0 0 4px' }}>{t.year}</p>
                <p style={{ fontSize: 13, color: '#262626', lineHeight: 1.7, margin: 0 }}>{t.event}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* THESIS */}
      <section style={{ padding: '60px 24px 80px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <Fade>
          <p style={{ fontFamily: serif, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.5, maxWidth: 640, margin: '0 auto 24px' }}>
            &ldquo;The stone remembers what the landscape has forgotten.&rdquo;
          </p>
          <p style={{ fontSize: 13, color: '#525252', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
            Every giraffe carved in a desert where no giraffe walks, every hippo painted in sand that holds no water,
            every swimming figure in a land with no rain — is a data point. Africa&apos;s rock art is not decoration.
            It is testimony. The longest-running documentation project in human history, 75,000 years old,
            still readable, and nobody planned it.
          </p>
        </Fade>
      </section>

      {/* ATTRIBUTION */}
      <section style={{ padding: '40px 24px 120px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: 20 }}>
          <p style={{ fontSize: 10, color: '#a3a3a3', lineHeight: 1.7 }}>
            <strong>Sources:</strong> ICOMOS Southern African Rock Art Sites report (Deacon, 1997) · UNESCO World Heritage Centre ·
            Trust for African Rock Art (TARA) / British Museum African Rock Art Archive · Bradshaw Foundation ·
            Lewis-Williams, J.D., San Rock Art (2013) · Smarthistory, &quot;Prehistoric rock art in North Africa&quot; ·
            Henshilwood et al., Blombos Cave · Dupuy, C. (1987) Dabous · Gutherz, X. (2002) Laas Geel · Wild Morocco rock art guide.
          </p>
          <p style={{ fontSize: 10, color: '#a3a3a3', marginTop: 8 }}>© Slow Morocco · All data compiled from institutional sources. Site coordinates approximate.</p>
        </div>
      </section>
    </div>
  )
}
