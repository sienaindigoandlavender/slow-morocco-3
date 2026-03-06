'use client'

import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════
// THE SCENT ATLAS — Morocco's Olfactory Geography
// Module 047 · Slow Morocco
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.12 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// ═══════════════════════════════════════════════════
// SCENT DATA
// ═══════════════════════════════════════════════════

type ScentCategory = 'Floral' | 'Wood' | 'Earth' | 'Spice' | 'Craft' | 'Marine' | 'Resin'

interface Scent {
  name: string
  arabic?: string
  region: string
  lat: number
  lng: number
  color: string
  category: ScentCategory
  source: string
  molecule?: string
  season: number[]  // 12 months, intensity 0–10
  peakMonths: string
  description: string
  note: string
  featured?: boolean
}

const SCENTS: Scent[] = [
  // ─── FLORAL ───
  {
    name: 'Damask Rose', arabic: 'وَرْد', region: 'Kelaat M\'Gouna, Dades Valley',
    lat: 31.24, lng: -6.13, color: '#E91E63', category: 'Floral',
    source: 'Rosa damascena petals, hand-picked at dawn. ~1,000 tonnes harvested per season. 1 litre of oil requires 4,000 kg of petals.',
    molecule: 'Citronellol, geraniol, nerol',
    season: [0, 0, 1, 4, 10, 3, 0, 0, 0, 0, 0, 0],
    peakMonths: 'April–May',
    description: 'Brought by Berber pilgrims from Mecca in the 10th century. The valley smells from miles away in spring.',
    note: 'Rosa damascena blooms once a year. Petals must be picked before sunrise — heat destroys the essential oil.',
    featured: true,
  },
  {
    name: 'Orange Blossom', arabic: 'زْهَر', region: 'Fes-Meknès, Berkane',
    lat: 34.03, lng: -4.98, color: '#FF9800', category: 'Floral',
    source: 'Citrus aurantium (bitter orange) flowers. Distilled into neroli oil and orange blossom water (mazhar).',
    molecule: 'Linalool, linalyl acetate, nerolidol',
    season: [0, 0, 5, 10, 8, 2, 0, 0, 0, 0, 0, 0],
    peakMonths: 'March–May',
    description: 'Every Moroccan home has a bottle. Used in pastries, on hands after meals, sprinkled in bath water. The smell of hospitality itself.',
    note: 'Neroli is the essential oil; orange blossom water is the hydrosol. Both from the same distillation.',
    featured: true,
  },
  {
    name: 'Jasmine', arabic: 'يَاسَمِين', region: 'Marrakech, Rabat gardens',
    lat: 31.63, lng: -7.99, color: '#FFEB3B', category: 'Floral',
    source: 'Jasminum grandiflorum. Night-blooming. Picked by hand in the early morning hours.',
    molecule: 'Benzyl acetate, linalool, indole',
    season: [0, 0, 0, 2, 5, 8, 10, 9, 6, 2, 0, 0],
    peakMonths: 'June–September',
    description: 'Fills riad courtyards at dusk. The scent of Moroccan summer evenings — heavy, sweet, almost narcotic.',
    note: 'Jasmine releases its strongest scent at night, which is why riad gardens are designed to be enjoyed after sunset.',
    featured: true,
  },
  {
    name: 'Lavender', arabic: 'خُزَامَى', region: 'Ourika Valley, Middle Atlas',
    lat: 31.36, lng: -7.72, color: '#9C27B0', category: 'Floral',
    source: 'Lavandula dentata (toothed lavender) and Lavandula stoechas. Wild-harvested on Atlas slopes.',
    molecule: 'Linalool, camphor, fenchone',
    season: [0, 0, 2, 4, 7, 10, 8, 5, 2, 0, 0, 0],
    peakMonths: 'May–July',
    description: 'Not the neat rows of Provence. Moroccan lavender grows wild in rocky soil, tougher and more camphoraceous.',
    note: 'The Ourika Valley lavender distilleries produce oil that is wilder and less sweet than French lavender.',
  },

  // ─── WOOD ───
  {
    name: 'Atlas Cedar', arabic: 'أَرْز', region: 'Ifrane, Middle Atlas',
    lat: 33.53, lng: -5.11, color: '#4CAF50', category: 'Wood',
    source: 'Cedrus atlantica. Endemic to the Atlas. 53,800 hectares in Ifrane National Park. Wood and essential oil.',
    molecule: 'α-cedrene, β-cedrene, cedrol',
    season: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    peakMonths: 'Year-round (strongest when cut or heated)',
    description: 'Walk through the Cèdre Gouraud forest and the air is dense with it. Warm, dry, pencil-sharp. The architecture of the Atlas.',
    note: 'Used in traditional chests to repel moths. The scent of Atlas cedar is also a key base note in global perfumery.',
    featured: true,
  },
  {
    name: 'Thuya Wood', arabic: 'عَرْعَار', region: 'Essaouira',
    lat: 31.51, lng: -9.77, color: '#795548', category: 'Wood',
    source: 'Tetraclinis articulata (sandarac). Endemic aromatic burl. Essaouira is the world capital of thuya craft.',
    molecule: 'Thymol, carvacrol, pinene',
    season: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    peakMonths: 'Year-round (released by carving and polishing)',
    description: 'Walk into any workshop in the Essaouira medina and the warm, resinous, slightly sweet smell hits immediately. The sound of lathes and the scent of shavings.',
    note: 'Thuya burl is so aromatic that finished objects continue to release scent for years. The tree is now protected.',
    featured: true,
  },

  // ─── EARTH ───
  {
    name: 'Argan Smoke', arabic: 'أَرْكَان', region: 'Souss-Massa, Essaouira hinterland',
    lat: 30.43, lng: -9.60, color: '#A1887F', category: 'Earth',
    source: 'Argania spinosa kernels, roasted over fire. Nutty, smoky oil pressed by hand in women\'s cooperatives.',
    molecule: 'Tocopherols, squalene, sterols (the smoke is pyrazines)',
    season: [6, 6, 6, 6, 6, 6, 6, 6, 7, 8, 8, 7],
    peakMonths: 'Year-round (harvest: July–September)',
    description: 'The smell of argan roasting is the olfactory signature of the Souss. Smoky, nutty, warm — like a sweeter version of roasting coffee.',
    note: 'Culinary argan oil (roasted) has a strong scent. Cosmetic argan oil (cold-pressed) is nearly odourless.',
    featured: true,
  },
  {
    name: 'Saffron', arabic: 'زَعْفَرَان', region: 'Taliouine, Anti-Atlas',
    lat: 30.53, lng: -7.93, color: '#FF6F00', category: 'Spice',
    source: 'Crocus sativus stigmas. PDO-protected. 200,000 flowers to produce 1 kg. Morocco\'s most expensive crop by weight.',
    molecule: 'Safranal (the scent), crocin (the colour), picrocrocin (the taste)',
    season: [0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 10, 3],
    peakMonths: 'October–November',
    description: 'The fields bloom purple for two weeks. The stigmas are pulled by hand at dawn. The drying sheds smell of honey and hay.',
    note: 'Taliouine saffron has PDO protection (Protected Designation of Origin) since 2010. Rivals Iranian saffron for quality.',
    featured: true,
  },
  {
    name: 'Ghassoul Clay', region: 'Moulouya Valley, Middle Atlas',
    lat: 32.85, lng: -4.33, color: '#8D6E63', category: 'Earth',
    source: 'Rhassoul (ghassoul) clay mined from ancient lake beds. Used in hammam for hair and skin. Mined only in Morocco.',
    molecule: 'Silica, magnesium, iron oxide (mineral, not molecular scent)',
    season: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    peakMonths: 'Year-round',
    description: 'The smell of the hammam: wet clay, steam, black olive soap. An ancient mineral smell — the earth opening its pores.',
    note: 'Morocco is the world\'s only source of rhassoul clay. Mined from Jbel Ghassoul in the Moulouya valley.',
  },

  // ─── SPICE ───
  {
    name: 'Ras el Hanout', arabic: 'رَاس الحَانُوت', region: 'Marrakech, Fes (souks)',
    lat: 31.63, lng: -7.99, color: '#BF360C', category: 'Spice',
    source: '25–40 spices blended. Each spice merchant\'s recipe is proprietary. "Head of the shop" — the best blend the seller has.',
    molecule: 'Aggregate: cinnamaldehyde, eugenol, curcumin, piperine, myristicin',
    season: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    peakMonths: 'Year-round',
    description: 'The olfactory chaos of the spice souk compressed into one mixture. Warm, complex, impossible to deconstruct. Every blend is different.',
    note: 'Can include: cinnamon, cumin, coriander, ginger, turmeric, black pepper, cardamom, nutmeg, clove, galangal, long pepper, rosebuds, lavender, mace.',
  },
  {
    name: 'Mint', arabic: 'نَعْنَاع', region: 'Meknès (primary cultivation)',
    lat: 34.04, lng: -5.01, color: '#2E7D32', category: 'Spice',
    source: 'Mentha spicata (spearmint). Morocco consumes ~15,000 tonnes annually. The base of atay (Moroccan mint tea).',
    molecule: 'Carvone (spearmint), menthol (trace)',
    season: [4, 4, 5, 7, 8, 9, 10, 10, 8, 6, 4, 4],
    peakMonths: 'June–August',
    description: 'The smell of Morocco distilled to one thing: fresh mint bruised into a glass with gunpowder green tea and sugar. Poured from height. In every home, every café, every hour.',
    note: 'Moroccan mint is spearmint, not peppermint. Sweeter, less sharp. The tea ritual uses Chinese gunpowder green tea imported since the 18th century.',
    featured: true,
  },

  // ─── CRAFT ───
  {
    name: 'Tannery Leather', region: 'Fes (Chouara, Sidi Moussa, Ain Azliten)',
    lat: 34.07, lng: -4.97, color: '#5D4037', category: 'Craft',
    source: 'Cow, sheep, goat, camel hides soaked in limestone, pigeon dung, and tanning bark. Unchanged for 1,000 years.',
    molecule: 'Ammonia, hydrogen sulfide (the stench); tannin, chromium salts (the craft)',
    season: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    peakMonths: 'Year-round (worse in summer heat)',
    description: 'The famous assault on the senses. Tourists clutch sprigs of mint. Tanners stand waist-deep in vats. The smell of a thousand years of craft, uncovered, unbearable, unforgettable.',
    note: 'Chouara is the largest of three tanneries in Fes. The stone vats date to the 11th century. The method is essentially medieval.',
    featured: true,
  },
  {
    name: 'Olive Soap (Sabun Beldi)', arabic: 'صَابُون بَلْدِي', region: 'Fes, Marrakech (hammams)',
    lat: 34.05, lng: -4.99, color: '#33691E', category: 'Craft',
    source: 'Black olive paste soap. Olive oil + potassium hydroxide, aged 3 months. The essential hammam product.',
    molecule: 'Oleic acid (olive oil base), potassium oleate (saponification)',
    season: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    peakMonths: 'Year-round',
    description: 'Dark green, gel-like, almost formless. The earthy, vegetal smell of wet olive soap on hot skin in a steam-filled hammam. The smell of becoming clean in Morocco.',
    note: 'Applied before the kessa glove scrub. The combination of sabun beldi + ghassoul clay + steam = the hammam scent profile.',
  },

  // ─── MARINE ───
  {
    name: 'Atlantic Salt Air', region: 'Essaouira, Oualidia, Asilah',
    lat: 31.51, lng: -9.77, color: '#0288D1', category: 'Marine',
    source: 'Atlantic Ocean brine, iodine from seaweed, salt from evaporation ponds.',
    molecule: 'Dimethyl sulfide, iodine compounds, sodium chloride aerosol',
    season: [6, 6, 6, 6, 7, 8, 9, 9, 8, 7, 6, 6],
    peakMonths: 'June–September (alizé winds)',
    description: 'Essaouira\'s air is heavy with it — the Atlantic crashes against the ramparts and the wind carries salt deep into the medina. Mixed with the smell of grilled sardines at the port.',
    note: 'The trade winds (alizés) blow year-round in Essaouira, making it Morocco\'s windiest and saltiest city.',
  },

  // ─── RESIN ───
  {
    name: 'Frankincense', arabic: 'لُبَان', region: 'Used nationwide (imported via Saharan trade)',
    lat: 31.63, lng: -7.99, color: '#FFD54F', category: 'Resin',
    source: 'Boswellia sacra resin. Imported from Oman and East Africa since antiquity. Burned in mosques, homes, weddings.',
    molecule: 'α-pinene, limonene, boswellic acid',
    season: [7, 7, 7, 7, 7, 7, 8, 8, 8, 7, 7, 8],
    peakMonths: 'Year-round (peaks at Ramadan, Eid, weddings)',
    description: 'The mabkhara (incense burner) glows in the corner. Frankincense smoke spirals upward. In Moroccan belief, it attracts angels and repels evil spirits.',
    note: 'Not indigenous to Morocco — imported for centuries via trans-Saharan and Indian Ocean trade routes. Deeply embedded in domestic ritual.',
  },
  {
    name: 'Oud', arabic: 'عُود', region: 'Used in Fes, Marrakech, Casablanca (imported)',
    lat: 34.05, lng: -4.99, color: '#4E342E', category: 'Resin',
    source: 'Aquilaria tree resin (agarwood). Imported from Southeast Asia. Morocco\'s most prized incense and perfume ingredient.',
    molecule: 'Agarospirol, jinkohol, guaianol',
    season: [6, 6, 6, 6, 6, 6, 7, 7, 7, 6, 6, 7],
    peakMonths: 'Year-round (peaks at celebrations)',
    description: 'Dense, woody, almost animalic. A tiny chip on a coal fills a room for hours. The scent of wealth, piety, and old Fassi families.',
    note: 'Genuine oud is one of the most expensive raw materials in the world. Much of what\'s sold in souks is synthetic or heavily diluted.',
  },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const CATEGORIES: ScentCategory[] = ['Floral', 'Wood', 'Earth', 'Spice', 'Craft', 'Marine', 'Resin']

// ═══════════════════════════════════════════════════
// RADIAL BLOOM — scent intensity as a polar area chart
// ═══════════════════════════════════════════════════

function RadialBloom({ scent, size = 160 }: { scent: Scent; size?: number }) {
  const cx = size / 2
  const cy = size / 2
  const maxR = size / 2 - 16

  // Build polar path
  const points = scent.season.map((val, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
    const r = (val / 10) * maxR
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r }
  })

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Guide rings */}
      {[0.25, 0.5, 0.75, 1].map(f => (
        <circle key={f} cx={cx} cy={cy} r={maxR * f} fill="none" stroke={C.border} strokeWidth="0.5" />
      ))}
      {/* Month lines */}
      {MONTHS.map((m, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
        const x2 = cx + Math.cos(angle) * maxR
        const y2 = cy + Math.sin(angle) * maxR
        const lx = cx + Math.cos(angle) * (maxR + 10)
        const ly = cy + Math.sin(angle) * (maxR + 10)
        return (
          <g key={m}>
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={C.border} strokeWidth="0.3" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill={C.muted} fontSize="7" fontFamily="monospace">{m}</text>
          </g>
        )
      })}
      {/* Bloom shape */}
      <path d={path} fill={scent.color} fillOpacity={0.25} stroke={scent.color} strokeWidth="1.5" />
      {/* Peak dots */}
      {points.map((p, i) => scent.season[i] >= 8 ? (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={scent.color} />
      ) : null)}
    </svg>
  )
}

// ═══════════════════════════════════════════════════
// SCENT CARD
// ═══════════════════════════════════════════════════

function ScentCard({ scent, expanded, onToggle }: { scent: Scent; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="border-t pt-6 pb-4 cursor-pointer group" style={{ borderColor: C.border }} onClick={onToggle}>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
        {/* Radial bloom */}
        <div className="shrink-0 mx-auto md:mx-0">
          <RadialBloom scent={scent} size={140} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <span className="inline-block w-3 h-3 rounded-full mr-2 align-middle" style={{ background: scent.color }} />
              <span className="font-serif text-[20px]">{scent.name}</span>
              {scent.arabic && <span className="text-[14px] ml-2" style={{ color: C.muted }}>{scent.arabic}</span>}
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 shrink-0" style={{ background: scent.color + '18', color: scent.color }}>{scent.category}</span>
          </div>
          <p className="text-[12px] font-mono mb-2" style={{ color: C.muted }}>{scent.region} · Peak: {scent.peakMonths}</p>
          <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>{scent.description}</p>

          {/* Expanded detail */}
          {expanded && (
            <div className="mt-4 space-y-3 border-t pt-4" style={{ borderColor: C.border }}>
              <div>
                <p className="text-[10px] font-mono mb-0.5" style={{ color: C.muted }}>Source</p>
                <p className="text-[13px]" style={{ color: C.text }}>{scent.source}</p>
              </div>
              {scent.molecule && (
                <div>
                  <p className="text-[10px] font-mono mb-0.5" style={{ color: C.muted }}>Chemistry</p>
                  <p className="text-[13px] font-mono" style={{ color: C.text }}>{scent.molecule}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] font-mono mb-0.5" style={{ color: C.muted }}>Note</p>
                <p className="text-[13px] italic" style={{ color: C.text }}>{scent.note}</p>
              </div>
              {/* Linear season bar */}
              <div>
                <p className="text-[10px] font-mono mb-1" style={{ color: C.muted }}>Monthly intensity</p>
                <div className="flex gap-0.5">
                  {scent.season.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full h-8 flex items-end">
                        <div className="w-full transition-all duration-300" style={{ height: `${(v / 10) * 100}%`, background: scent.color, opacity: 0.6 + (v / 10) * 0.4 }} />
                      </div>
                      <span className="text-[7px] font-mono mt-0.5" style={{ color: C.muted }}>{MONTHS[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <p className="text-[10px] font-mono mt-2 group-hover:opacity-100 opacity-50 transition-opacity" style={{ color: scent.color }}>
            {expanded ? '↑ Collapse' : '↓ Expand — source, chemistry, monthly curve'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// SEASONAL CALENDAR — all scents as horizontal bars
// ═══════════════════════════════════════════════════

function SeasonalCalendar() {
  const r = useReveal()
  const featured = SCENTS.filter(s => s.featured)
  return (
    <div ref={r.ref}>
      <p className="micro-label mb-3" style={{ color: C.muted }}>Seasonal Intensity · Featured Scents</p>
      <div className="space-y-2">
        {featured.map((s, si) => (
          <div key={s.name} className="flex items-center gap-2 transition-all duration-500" style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${si * 50}ms` }}>
            <span className="text-[11px] w-[110px] shrink-0 text-right truncate" style={{ color: C.text }}>{s.name}</span>
            <div className="flex-1 flex gap-px">
              {s.season.map((v, i) => (
                <div key={i} className="flex-1 h-5 transition-all duration-700"
                  style={{
                    background: v > 0 ? s.color : '#f5f5f5',
                    opacity: v > 0 ? 0.2 + (v / 10) * 0.8 : 1,
                    transitionDelay: `${si * 50 + i * 30}ms`,
                  }} />
              ))}
            </div>
          </div>
        ))}
        {/* Month labels */}
        <div className="flex items-center gap-2">
          <span className="w-[110px] shrink-0" />
          <div className="flex-1 flex gap-px">
            {MONTHS.map(m => (
              <div key={m} className="flex-1 text-center text-[8px] font-mono" style={{ color: C.muted }}>{m}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// SCENT MAP (Mapbox)
// ═══════════════════════════════════════════════════

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

function ScentMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [-5.5, 32], zoom: 5, minZoom: 4, maxZoom: 10,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        SCENTS.forEach((s) => {
          const el = document.createElement('div')
          el.style.cssText = `width:16px;height:16px;border-radius:50%;background:${s.color};border:2px solid white;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.25);opacity:0.85;`
          const popup = new mapboxgl.default.Popup({ offset: 12, closeButton: false, maxWidth: '240px' })
            .setHTML(`<div style="font-family:serif;font-size:13px;"><strong>${s.name}</strong><br/><span style="font-size:11px;color:#737373;">${s.region}</span><br/><span style="font-size:11px;color:#262626;">${s.description.slice(0, 100)}…</span></div>`)
          new mapboxgl.default.Marker({ element: el, anchor: 'center' })
            .setLngLat([s.lng, s.lat]).setPopup(popup).addTo(map)
        })
      })
      mapRef.current = map
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div>
      <div ref={mapContainer} className="w-full rounded-sm border" style={{ height: 420, borderColor: C.border }} />
      {!MAPBOX_TOKEN && (
        <div className="mt-2 p-4 border text-[12px] text-center" style={{ borderColor: C.border, color: C.muted }}>
          Map requires NEXT_PUBLIC_MAPBOX_TOKEN environment variable.
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

export function ScentAtlasContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [catFilter, setCatFilter] = useState<ScentCategory | 'All'>('All')

  const filtered = catFilter === 'All' ? SCENTS : SCENTS.filter(s => s.category === catFilter)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-10">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 047 · Sensory Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Scent<br />Atlas</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-6" style={{ color: C.muted }}>
            Morocco&apos;s olfactory geography — the invisible layer of the country
          </p>
          <p className="text-[15px] leading-[1.8] max-w-[600px]" style={{ color: C.text }}>
            Every place in Morocco has a smell. The Dades Valley in May: Damask rose. Fes in any month:
            leather <span className="underline underline-offset-2">tannery</span> and orange blossom water. <span className="underline underline-offset-2">Essaouira</span>: salt air and thuya wood shavings.
            Marrakech at dusk: jasmine climbing out of riad courtyards. Ifrane: Atlas cedar, cold and clean.
            This module maps 16 scents to their source, their chemistry, their season, and the places
            where they live. Each one gets a radial bloom — a polar chart showing intensity across 12 months.
            The invisible country, rendered visible.
          </p>
        </div>
      </section>

      {/* ═══ KEY FACTS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-10">
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: '16', l: 'Scents mapped', c: '#E91E63' },
            { n: '7', l: 'Categories', c: '#4CAF50' },
            { n: '4,000 kg', l: 'Petals per litre of rose oil', c: '#E91E63' },
            { n: '200,000', l: 'Flowers per kg of saffron', c: '#FF6F00' },
            { n: '1,000+', l: 'Years of Fes tanneries', c: '#5D4037' },
            { n: '15,000', l: 'Tonnes of mint consumed/year', c: '#2E7D32' },
            { n: '53,800', l: 'Hectares of Atlas cedar', c: '#4CAF50' },
            { n: '10th c.', l: 'Rosa damascena arrives', c: '#E91E63' },
          ].map((k, i) => (
            <div key={k.l} className="border-t pt-3 transition-all duration-700"
              style={{ borderColor: k.c, opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
              <p className="font-serif text-[clamp(1.3rem,3vw,1.8rem)] leading-none" style={{ color: k.c }}>{k.n}</p>
              <p className="text-[10px] mt-1 font-mono" style={{ color: C.muted }}>{k.l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-6">Where It Smells</h2>
        <ScentMap />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SEASONAL CALENDAR ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-6">When It Smells</h2>
        <SeasonalCalendar />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SCENT INDEX ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-4">The Index</h2>
        <p className="text-[14px] leading-relaxed mb-6 max-w-[600px]" style={{ color: C.text }}>
          Each scent rendered as a radial bloom — a polar chart where 12 months radiate from the centre
          and the distance from centre shows intensity. Year-round scents are circles. Seasonal scents
          are petals reaching toward their peak months.
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['All', ...CATEGORIES] as const).map(cat => (
            <button key={cat} onClick={() => { setCatFilter(cat as any); setExpanded(null) }}
              className="text-[11px] font-mono px-3 py-1.5 border transition-all"
              style={{
                borderColor: catFilter === cat ? C.ink : C.border,
                background: catFilter === cat ? C.ink : 'transparent',
                color: catFilter === cat ? '#fff' : C.muted,
              }}>
              {cat} {cat !== 'All' ? `(${SCENTS.filter(s => s.category === cat).length})` : `(${SCENTS.length})`}
            </button>
          ))}
        </div>

        {/* Scent cards */}
        <div>
          {filtered.map(s => (
            <ScentCard key={s.name} scent={s}
              expanded={expanded === s.name}
              onToggle={() => setExpanded(expanded === s.name ? null : s.name)} />
          ))}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-[18px] mb-2">The Pilgrims&apos; Rose</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Oral tradition says Rosa damascena arrived in the 10th century with <span className="underline underline-offset-2">Berber</span> pilgrims returning
              from Mecca, seeds falling along the path home. The Dades Valley blooms because someone carried
              a flower 4,000 kilometres.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Hammam Equation</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Sabun beldi + ghassoul clay + steam + eucalyptus = the hammam. Four ingredients, one scent
              profile embedded in every Moroccan&apos;s body memory. The olfactory equivalent of &ldquo;home.&rdquo;
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Imported Sacred</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Frankincense and oud are not Moroccan plants — they travel from Oman, East Africa, Southeast Asia
              via trade routes older than the nation itself. Morocco&apos;s most sacred domestic scents are foreign. Identity
              is what you absorb, not what grows beneath you.
            </p>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <p>Damask Rose: Kelaat M&apos;Gouna municipal data; Morocco Rose Festival documentation; Rose Valley cooperative production figures. Orange Blossom: Marrakech Perfume Museum (Abderrazzak Benchaâbane); Fes-Meknès regional agriculture reports. Atlas Cedar: Ifrane National Park; High Commission for Water and Forests. Saffron: Taliouine PDO documentation; Haut Commissariat au Plan. Tannery: UNESCO Fes Medina heritage documentation. Mint: FAO Morocco agriculture data. Argan: Souss-Massa cooperative network. Chemistry and molecular data: PubChem, essential oil literature. Seasonal intensity curves are editorial estimates based on harvest calendars, bloom periods, and regional climate data.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: 'rgba(255,255,255,0.7)' }}>
          © Slow Morocco · slowmorocco.com · Seasonal intensity curves are editorial estimates. This visualization may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
