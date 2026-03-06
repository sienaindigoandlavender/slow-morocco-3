'use client'

import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════
   THE APOTHECARY
   Morocco's Living Pharmacopoeia
   Module 113 · Ethnobotanical Intelligence
   ═══════════════════════════════════════════════════ */

// ── COLOURS ──────────────────────────────────────
const C = {
  ink: '#0A0A0A',
  text: '#1A1A1A',
  muted: '#888888',
  border: '#E5E5E5',
  bg: '#ffffff',
  herb: '#2D6A4F',
  herbLight: '#40916C',
  herbDark: '#1B4332',
  root: '#9B6B3D',
  flower: '#B56576',
  bark: '#774936',
  seed: '#D4A373',
  resin: '#6B4226',
  oil: '#C9AE5D',
  lamiaceae: '#40916C',
  asteraceae: '#C9AE5D',
  fabaceae: '#B56576',
  apiaceae: '#6B9AC4',
  dark: '#0e0e0e',
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// ── MAP REGIONS ──────────────────────────────────

interface HerbRegion {
  name: string
  lat: number
  lng: number
  plants: string[]
  note: string
  color: string
}

const HERB_REGIONS: HerbRegion[] = [
  { name: 'Rif Mountains', lat: 34.9, lng: -4.6, plants: ['Oregano', 'Rosemary', 'Thyme', 'Pennyroyal mint'], note: '280 medicinal species documented. Highest density of traditional healers. Women transmit 61% of herbal knowledge.', color: C.herb },
  { name: 'Middle Atlas', lat: 33.4, lng: -5.1, plants: ['Lavender', 'Atlas cedar', 'Thyme', 'Calamint'], note: 'Forest zone. Wild harvesting of lavender and thyme for essential oil distillation. Cedar bark used in respiratory medicine.', color: C.bark },
  { name: 'High Atlas', lat: 31.1, lng: -7.9, plants: ['Wormwood', 'Rosemary', 'Wild thyme'], note: 'Altitude 2,000–4,000m. Artemisia herba-alba dominates arid slopes. Used for digestive parasites and diabetes.', color: C.herbLight },
  { name: 'Souss-Massa', lat: 30.4, lng: -9.5, plants: ['Argan', 'Thyme', 'Euphorbia'], note: 'Home of the endemic argan tree. UNESCO Biosphere Reserve. Women\'s cooperatives control production and preservation.', color: C.oil },
  { name: 'Taliouine', lat: 30.53, lng: -7.93, plants: ['Saffron'], note: 'Morocco\'s saffron capital. 600+ hectares under cultivation. Harvested by hand each November. $4,000–$10,000/kg.', color: C.flower },
  { name: 'Marrakech-Safi', lat: 31.63, lng: -8.0, plants: ['Cumin', 'Fenugreek', 'Ginger', 'Nigella'], note: 'The souk. 15+ herbalist stalls in the medina. 67 medicinal roots identified by vernacular name alone.', color: C.seed },
  { name: 'Oriental / Taza', lat: 34.2, lng: -3.8, plants: ['Oregano', 'Rosemary', 'Lemon verbena'], note: 'Highest RFC for oregano (76%). Taza ethnobotanical survey: 55 species, 28 families documented.', color: C.lamiaceae },
  { name: 'Pre-Saharan South', lat: 30.0, lng: -5.8, plants: ['Wormwood', 'Date palm', 'Henna'], note: 'Oasis pharmacopoeia. The anonymous Tuhfat al-ahbâb was written here — 16th century, never translated.', color: C.root },
  { name: 'Atlantic Coast', lat: 33.6, lng: -7.6, plants: ['Rosemary', 'Chamomile', 'Fennel'], note: 'Coastal humidity supports different chemotypes. Rosemary here has different essential oil profiles than mountain rosemary.', color: C.apiaceae },
]

// ── DATA ─────────────────────────────────────────

interface Plant {
  name: string
  darija: string
  arabic?: string
  latin: string
  family: string
  part: 'leaf' | 'root' | 'flower' | 'bark' | 'seed' | 'resin' | 'oil' | 'whole'
  uses: string
  region: string
  rfc?: number // Relative Frequency of Citation (%)
}

const PLANTS: Plant[] = [
  { name: 'Oregano', darija: "Za'tar", arabic: 'زعتر', latin: 'Origanum compactum', family: 'Lamiaceae', part: 'leaf', uses: 'Respiratory infections, digestive disorders, antimicrobial', region: 'Rif, Middle Atlas', rfc: 76 },
  { name: 'Pennyroyal mint', darija: 'Fliyou', arabic: 'فليو', latin: 'Mentha pulegium', family: 'Lamiaceae', part: 'leaf', uses: 'Colds, stomach pain, colic, menstrual cramps', region: 'Nationwide', rfc: 72 },
  { name: 'Rosemary', darija: 'Azir', arabic: 'أزير', latin: 'Rosmarinus officinalis', family: 'Lamiaceae', part: 'leaf', uses: 'Memory, liver protection, circulation, hair growth', region: 'Coast, mountains', rfc: 60 },
  { name: 'Lemon verbena', darija: 'Lwiza', arabic: 'لويزة', latin: 'Aloysia citrodora', family: 'Verbenaceae', part: 'leaf', uses: 'Anxiety, insomnia, digestive calm, fever reduction', region: 'Northern Morocco', rfc: 42 },
  { name: 'Calamint', darija: 'Menta', arabic: 'منتة', latin: 'Calamintha officinalis', family: 'Lamiaceae', part: 'leaf', uses: 'Stomach pain, headache, respiratory support', region: 'Taza, Rif', rfc: 40 },
  { name: 'Wormwood', darija: 'Shiba', arabic: 'شيبة', latin: 'Artemisia herba-alba', family: 'Asteraceae', part: 'leaf', uses: 'Digestive parasites, fever, diabetes management, anti-inflammatory', region: 'Arid plains, pre-Saharan', rfc: 30 },
  { name: 'Thyme', darija: "Za'tar l'barri", arabic: 'الزعتر البري', latin: 'Thymus vulgaris', family: 'Lamiaceae', part: 'leaf', uses: 'Sore throat, cough, bronchitis, antiseptic', region: 'Atlas Mountains', rfc: 28 },
  { name: 'Lavender', darija: 'Khzama', arabic: 'خزامة', latin: 'Lavandula dentata', family: 'Lamiaceae', part: 'flower', uses: 'Sleep, anxiety, headaches, skin inflammation', region: 'Middle Atlas valleys', rfc: 25 },
  { name: 'Black cumin', darija: 'Sanouj / Habba Sawda', arabic: 'حبة سودة', latin: 'Nigella sativa', family: 'Ranunculaceae', part: 'seed', uses: '"Cure for everything except death" — anti-inflammatory, immune boost, skin, respiratory', region: 'Plains, cultivated', rfc: 22 },
  { name: 'Cumin', darija: 'Kamoun', arabic: 'كمون', latin: 'Cuminum cyminum', family: 'Apiaceae', part: 'seed', uses: 'Digestive relief, bloating, diarrhea, lactation support', region: 'Nationwide', rfc: 20 },
  { name: 'Fenugreek', darija: 'Helba', arabic: 'حلبة', latin: 'Trigonella foenum-graecum', family: 'Fabaceae', part: 'seed', uses: 'Lactation for new mothers (rfissa dish), heartburn, blood sugar', region: 'Nationwide', rfc: 18 },
  { name: 'Saffron', darija: 'Zafrane', arabic: 'زعفران', latin: 'Crocus sativus', family: 'Iridaceae', part: 'flower', uses: 'Mood, antioxidant, anti-depression, heart, digestive', region: 'Taliouine, Anti-Atlas', rfc: 15 },
  { name: 'Argan', darija: 'Argan', arabic: 'أركان', latin: 'Argania spinosa', family: 'Sapotaceae', part: 'oil', uses: 'Skin healing, hair restoration, cardiovascular, culinary', region: 'Souss-Massa (endemic)', rfc: 14 },
  { name: 'Atlas cedar', darija: 'Arz', arabic: 'أرز', latin: 'Cedrus atlantica', family: 'Pinaceae', part: 'bark', uses: 'Respiratory ailments, insect repellent, aromatherapy, timber', region: 'Middle Atlas (endemic)', rfc: 12 },
  { name: 'Ginger', darija: 'Skinjbir', arabic: 'سكينجبير', latin: 'Zingiber officinale', family: 'Zingiberaceae', part: 'root', uses: 'Nausea, cold and flu, joint pain, circulation', region: 'Imported, cultivated', rfc: 18 },
  { name: 'Turmeric', darija: 'Kharkoum', arabic: 'خرقوم', latin: 'Curcuma longa', family: 'Zingiberaceae', part: 'root', uses: 'Anti-inflammatory, colour for tagines, skin brightening', region: 'Imported, nationwide use', rfc: 15 },
]

interface Stat {
  value: string
  label: string
  detail: string
}

const STATS: Stat[] = [
  { value: '7,000', label: 'Plant species', detail: 'Vascular plants and subspecies growing wild in Morocco' },
  { value: '800', label: 'Medicinal', detail: 'Species with documented aromatic or medicinal properties' },
  { value: '1,118', label: 'Remedies catalogued', detail: 'By Bellakhdar across 40 years of field research' },
  { value: '743', label: 'Phytotherapy taxa', detail: 'In 101 families, 371 genera — used in traditional treatments' },
  { value: '12th', label: 'Global export rank', detail: "Morocco is the world\u2019s 12th largest exporter of medicinal plants" },
  { value: '40', label: 'Endemic species', detail: 'Medicinal plants found nowhere else on earth' },
]

interface FamilyData {
  name: string
  pct: number
  color: string
  examples: string
}

const FAMILIES: FamilyData[] = [
  { name: 'Lamiaceae (mints)', pct: 10.78, color: C.lamiaceae, examples: 'Oregano, thyme, rosemary, lavender, mint, sage' },
  { name: 'Asteraceae (daisies)', pct: 10.92, color: C.asteraceae, examples: 'Wormwood, chamomile, marigold, mugwort' },
  { name: 'Fabaceae (legumes)', pct: 5.93, color: C.fabaceae, examples: 'Fenugreek, liquorice, senna, carob' },
  { name: 'Apiaceae (parsley)', pct: 5.12, color: C.apiaceae, examples: 'Cumin, coriander, fennel, anise, caraway' },
]

interface ScholarData {
  name: string
  date: string
  work: string
  contribution: string
}

const SCHOLARS: ScholarData[] = [
  { name: "Abul-Khayr Al-Ichbili", date: "12th C", work: "\u2018Umdat at-tabib", contribution: "Seville botanist. First systematic taxonomy of medicinal plants in the Islamic world. Catalogued Andalusi and Maghrebi flora." },
  { name: "Ibn al-Baytar", date: "13th C", work: "Jami\u2019 al-mufradat", contribution: "Born in Malaga. Walked from al-Andalus to Damascus collecting specimens. Catalogued 1,400 plants. The largest materia medica of the medieval world." },
  { name: "Al-Wazir Al-Ghassani", date: "16th C", work: "Hadiqat al-azhar", contribution: "Moroccan physician. Documented local medicinal plants in Fez. The first purely Moroccan pharmacopoeia." },
  { name: "Anonymous (South Morocco)", date: "16th\u201317th C", work: "Tuhfat al-ahbab", contribution: "Unknown author from the pre-Saharan south. Recorded Amazigh and Arab remedies passed through oral tradition. Never translated." },
  { name: "Abderezaq al-Jazairi", date: "18th C", work: "Kechf er-rumuz", contribution: "Algerian physician. Bridged Maghrebi and Eastern traditions. Confirmed continuity across 500 years of practice." },
  { name: "Jamal Bellakhdar", date: "1997\u20132020", work: "La Pharmacopee Marocaine Traditionnelle", contribution: "Pharmacist, born Tangier 1947. 40 years of field research. 200+ tradipraticiens interviewed. 450 informants. 1,118 species catalogued across 1,370 pages. The definitive work." },
]

// ── HOOKS ────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function AnimatedNumber({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const { ref, visible } = useInView()
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [visible, value, duration])
  return <span ref={ref}>{visible ? display.toLocaleString() + suffix : '0'}</span>
}

// ── MAIN ─────────────────────────────────────────
export function TheApothecaryContent() {
  const hero = useInView(0.1)
  const statsSection = useInView()
  const familySection = useInView()
  const plantSection = useInView()
  const scholarSection = useInView()
  const [activePlant, setActivePlant] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [expandedScholar, setExpandedScholar] = useState<number | null>(null)

  // Mapbox
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const mapSection = useInView(0.1)

  useEffect(() => {
    if (!mapSection.visible || !mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [-6.5, 32], zoom: 5, minZoom: 4, maxZoom: 9,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        HERB_REGIONS.forEach((r) => {
          const el = document.createElement('div')
          el.style.cssText = `width:18px;height:18px;border-radius:50%;background:${r.color};border:2.5px solid white;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.3);transition:transform 0.2s;`
          el.title = r.name
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          const popup = new mapboxgl.default.Popup({ offset: 14, closeButton: false, maxWidth: '260px' })
            .setHTML(`
              <div style="font-family:'IBM Plex Mono',monospace;padding:4px 0">
                <p style="font-weight:700;font-size:13px;margin:0 0 4px;color:#0A0A0A">${r.name}</p>
                <p style="font-size:11px;color:#2D6A4F;font-weight:600;margin:0 0 6px">${r.plants.join(' · ')}</p>
                <p style="font-size:12px;color:#444;line-height:1.5;margin:0">${r.note}</p>
              </div>
            `)
          new mapboxgl.default.Marker({ element: el })
            .setLngLat([r.lng, r.lat])
            .setPopup(popup)
            .addTo(map)
        })
      })
      mapRef.current = map
    })
    return () => { if (mapRef.current) mapRef.current.remove(); mapRef.current = null }
  }, [mapSection.visible])

  const partColor = (part: string) => {
    const map: Record<string, string> = { leaf: C.herb, root: C.root, flower: C.flower, bark: C.bark, seed: C.seed, resin: C.resin, oil: C.oil, whole: C.herbLight }
    return map[part] || C.herb
  }

  const filteredPlants = activeFilter === 'all' ? PLANTS : PLANTS.filter(p => p.part === activeFilter)

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace" }}>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(80px, 15vh, 160px) clamp(24px, 5vw, 64px) clamp(40px, 8vh, 80px)' }}>
        <div ref={hero.ref} style={{ maxWidth: 900, opacity: hero.visible ? 1 : 0, transform: hero.visible ? 'none' : 'translateY(30px)', transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 16, fontWeight: 500 }}>
            Module 113 · Ethnobotanical Intelligence
          </p>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 0.9, letterSpacing: '-0.02em', color: C.ink, marginBottom: 20 }}>
            The Apothecary
          </h1>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontStyle: 'italic', lineHeight: 1.5, color: C.text, maxWidth: 640, marginBottom: 48 }}>
            Morocco has 7,000 plant species. 800 are medicinal. The attar in the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>souk</span> still prescribes what Ibn al-Baytar catalogued walking from Málaga to Damascus in the 13th century.
          </p>
          <div style={{ width: 48, height: 1, background: C.herb }} />
        </div>
      </section>

      {/* ═══ NUMBERS ═══ */}
      <section ref={statsSection.ref} style={{ padding: 'clamp(40px, 8vh, 80px) clamp(24px, 5vw, 64px)', background: C.herbDark }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontWeight: 500 }}>
            The Numbers
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ opacity: statsSection.visible ? 1 : 0, transform: statsSection.visible ? 'none' : 'translateY(20px)', transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.1}s` }}>
                <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, fontStyle: 'italic', color: '#ffffff', lineHeight: 1.1, marginBottom: 6 }}>
                  {typeof s.value === 'string' && s.value.includes(',')
                    ? <AnimatedNumber value={parseInt(s.value.replace(',', ''))} suffix="" />
                    : s.value}
                </p>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTEXT ═══ */}
      <section style={{ padding: 'clamp(60px, 10vh, 100px) clamp(24px, 5vw, 64px)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{ fontSize: 17, lineHeight: 2, color: C.text }}>
            The herbalist's shop in Morocco is called <strong>l'attar</strong> (العطّار). It is not a health food store. It is not an apothecary in the European sense. It is a living pharmacopoeia — a room stacked floor to ceiling with dried roots, bark, resins, seeds, flowers, and powders that have been prescribed continuously for a thousand years.
          </p>
          <p style={{ fontSize: 17, lineHeight: 2, color: C.text, marginTop: 24 }}>
            Morocco sits at the crossroads of three bioclimates: Mediterranean, Atlantic, and Saharan. This diversity — mountains to desert to coast within 200 kilometres — produces a flora ranked second only to Turkey in the entire Mediterranean basin. Of the country's 7,000 recorded plant species, 800 have documented medicinal value. 40 are endemic — found nowhere else on earth.
          </p>
          <p style={{ fontSize: 17, lineHeight: 2, color: C.text, marginTop: 24 }}>
            The knowledge is not written down in manuals that sit on shelves. It is held in the bodies of women who dry, stock, and prepare the remedies. It is held in the attars who learned from their fathers. It is passed verbally from one generation to the next. And it is vanishing — because the young are not always listening.
          </p>
        </div>
      </section>

      {/* ═══ MAP — Medicinal Plant Regions ═══ */}
      <section ref={mapSection.ref} style={{ padding: 'clamp(40px, 8vh, 80px) clamp(24px, 5vw, 64px)', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8, fontWeight: 500 }}>
            Where the Plants Grow
          </p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontStyle: 'italic', color: C.ink, marginBottom: 12, lineHeight: 1.3 }}>
            Nine medicinal plant regions of Morocco
          </p>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>
            Tap any marker for the key plants and ethnobotanical notes.
          </p>
          <div ref={mapContainer} style={{
            width: '100%', height: 'clamp(360px, 50vh, 520px)', borderRadius: 4,
            background: '#f5f5f0', border: `1px solid ${C.border}`,
            opacity: mapSection.visible ? 1 : 0, transition: 'opacity 1s ease 0.3s'
          }}>
            {!MAPBOX_TOKEN && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <p style={{ fontSize: 13, color: C.muted }}>Map requires NEXT_PUBLIC_MAPBOX_TOKEN environment variable.</p>
              </div>
            )}
          </div>
          {/* Map legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
            {HERB_REGIONS.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color }} />
                <span style={{ fontSize: 11, color: C.muted }}>{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DOMINANT FAMILIES — Horizontal bars ═══ */}
      <section ref={familySection.ref} style={{ padding: 'clamp(40px, 8vh, 80px) clamp(24px, 5vw, 64px)', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8, fontWeight: 500 }}>
            Dominant Plant Families
          </p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontStyle: 'italic', color: C.ink, marginBottom: 40, lineHeight: 1.3 }}>
            Percentage of all medicinal taxa in Morocco
          </p>
          {FAMILIES.map((f, i) => {
            const maxPct = Math.max(...FAMILIES.map(x => x.pct))
            return (
              <div key={i} style={{ marginBottom: 28, opacity: familySection.visible ? 1 : 0, transform: familySection.visible ? 'none' : 'translateX(-20px)', transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.15}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{f.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: f.color }}>{f.pct}%</span>
                </div>
                <div style={{ height: 28, background: '#f5f5f5', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ height: '100%', width: familySection.visible ? `${(f.pct / maxPct) * 100}%` : '0%', background: f.color, borderRadius: 2, transition: `width 1.2s cubic-bezier(0.23, 1, 0.32, 1) ${0.3 + i * 0.15}s` }} />
                </div>
                <p style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{f.examples}</p>
              </div>
            )
          })}
          <p style={{ fontSize: 12, color: C.muted, marginTop: 16, fontStyle: 'italic' }}>
            The Lamiaceae family alone accounts for ~50% of Morocco's endemic medicinal taxa. Mint, thyme, oregano, sage, rosemary, lavender — all Lamiaceae.
          </p>
        </div>
      </section>

      {/* ═══ THE MATERIA MEDICA — Interactive plant grid ═══ */}
      <section ref={plantSection.ref} style={{ padding: 'clamp(60px, 10vh, 100px) clamp(24px, 5vw, 64px)', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8, fontWeight: 500 }}>
            The Materia Medica
          </p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontStyle: 'italic', color: C.ink, marginBottom: 12, lineHeight: 1.3 }}>
            16 key plants ranked by relative frequency of citation
          </p>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 32 }}>
            RFC = percentage of informants who cited each plant in ethnobotanical surveys across Morocco. Tap any plant for detail.
          </p>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {['all', 'leaf', 'root', 'flower', 'seed', 'oil', 'bark'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                padding: '6px 14px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
                border: `1px solid ${activeFilter === f ? C.ink : C.border}`,
                background: activeFilter === f ? C.ink : 'transparent',
                color: activeFilter === f ? '#fff' : C.muted,
                borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s'
              }}>
                {f === 'all' ? `All (${PLANTS.length})` : f}
              </button>
            ))}
          </div>

          {/* Plant rows */}
          <div>
            {filteredPlants.map((p, i) => {
              const isActive = activePlant === i
              const maxRfc = Math.max(...PLANTS.map(x => x.rfc || 0))
              return (
                <div key={p.latin} onClick={() => setActivePlant(isActive ? null : i)} style={{
                  borderBottom: `1px solid ${C.border}`, padding: '16px 0', cursor: 'pointer',
                  opacity: plantSection.visible ? 1 : 0, transform: plantSection.visible ? 'none' : 'translateY(10px)',
                  transition: `all 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.05}s`
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 100px 60px', gap: 12, alignItems: 'center' }}>
                    {/* Part dot */}
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: partColor(p.part) }} />
                    {/* Name + Darija */}
                    <div>
                      <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{p.name}</span>
                      <span style={{ fontSize: 13, color: C.muted, marginLeft: 8 }}>{p.darija}</span>
                      {p.arabic && <span style={{ fontSize: 13, color: C.muted, marginLeft: 8, direction: 'rtl' }}>{p.arabic}</span>}
                    </div>
                    {/* RFC bar */}
                    <div style={{ height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${((p.rfc || 0) / maxRfc) * 100}%`, background: partColor(p.part), borderRadius: 3, transition: 'width 0.8s ease' }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: partColor(p.part), textAlign: 'right' }}>{p.rfc}%</span>
                  </div>
                  {/* Expanded detail */}
                  {isActive && (
                    <div style={{ marginTop: 16, paddingLeft: 36, paddingBottom: 8, animation: 'fadeIn 0.3s ease' }}>
                      <p style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}><em>{p.latin}</em> · {p.family}</p>
                      <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, marginBottom: 8 }}><strong>Uses:</strong> {p.uses}</p>
                      <p style={{ fontSize: 13, color: C.muted }}><strong>Region:</strong> {p.region}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ THE SCHOLARLY LINEAGE ═══ */}
      <section ref={scholarSection.ref} style={{ padding: 'clamp(60px, 10vh, 100px) clamp(24px, 5vw, 64px)', background: '#FAFAF7' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 8, fontWeight: 500 }}>
            The Scholarly Lineage
          </p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontStyle: 'italic', color: C.ink, marginBottom: 12, lineHeight: 1.3 }}>
            800 years of writing it down
          </p>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, marginBottom: 40, maxWidth: 600 }}>
            Bellakhdar's research confirmed that 22% of remedies in use today appear in none of the historical Arabic sources — they are purely local, transmitted orally, never written down until he arrived with a notebook.
          </p>

          {SCHOLARS.map((s, i) => (
            <div key={i} onClick={() => setExpandedScholar(expandedScholar === i ? null : i)} style={{
              borderBottom: `1px solid ${C.border}`, padding: '20px 0', cursor: 'pointer',
              opacity: scholarSection.visible ? 1 : 0, transform: scholarSection.visible ? 'none' : 'translateY(10px)',
              transition: `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.1}s`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{s.name}</span>
                  <span style={{ fontSize: 12, color: C.herb, marginLeft: 12, fontWeight: 500 }}>{s.date}</span>
                </div>
                <span style={{ fontSize: 20, color: C.muted, transition: 'transform 0.3s', transform: expandedScholar === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </div>
              <p style={{ fontSize: 13, color: C.muted, fontStyle: 'italic', marginTop: 4 }}>{s.work}</p>
              {expandedScholar === i && (
                <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, marginTop: 12, paddingRight: 40 }}>
                  {s.contribution}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ THE ATTAR — Contextual ═══ */}
      <section style={{ padding: 'clamp(60px, 10vh, 100px) clamp(24px, 5vw, 64px)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 16, fontWeight: 500 }}>
            The Attar
          </p>
          <p style={{ fontSize: 17, lineHeight: 2, color: C.text }}>
            In Moroccan Arabic, the herbalist is <strong>l'attar</strong>. The word comes from the Arabic root <em>'itr</em> — fragrance, essence, the volatile thing inside the plant that makes it work. The attar does not sell herbs. He prescribes. You walk in with a symptom. He gives you a formula. Sometimes it is a single plant. Sometimes it is a blend ground on the spot.
          </p>
          <p style={{ fontSize: 17, lineHeight: 2, color: C.text, marginTop: 24 }}>
            The word <strong>laaroug</strong> (لعروق) — "roots" — is the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Darija</span> term for all underground plant parts used in traditional medicine. Roots, bulbs, tubers, rhizomes. One third of the entire Moroccan pharmacopoeia is derived from what grows beneath the soil. Most are sold dried, which makes identification difficult and substitution common. Herbalists in Marrakech identified 67 medicinal roots by vernacular name alone.
          </p>
          <p style={{ fontSize: 17, lineHeight: 2, color: C.text, marginTop: 24 }}>
            The knowledge transmission is fragile. Women still prepare remedies at home — drying, blending, stocking. 54% of herbalists learned from other herbalists, not from family. And the younger generation is not always continuing the chain. When an attar closes, a library closes.
          </p>
        </div>
      </section>

      {/* ═══ PART USED — Visual legend ═══ */}
      <section style={{ padding: 'clamp(40px, 6vh, 60px) clamp(24px, 5vw, 64px)', background: '#FAFAF7', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 24, fontWeight: 500 }}>
            Part Used · Legend
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {[
              { part: 'leaf', label: 'Leaf', color: C.herb },
              { part: 'root', label: 'Root', color: C.root },
              { part: 'flower', label: 'Flower', color: C.flower },
              { part: 'seed', label: 'Seed', color: C.seed },
              { part: 'bark', label: 'Bark', color: C.bark },
              { part: 'oil', label: 'Oil', color: C.oil },
              { part: 'resin', label: 'Resin', color: C.resin },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                <span style={{ fontSize: 12, color: C.text }}>{item.label}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 16 }}>
            One third of all Moroccan remedies use underground parts (roots, bulbs, rhizomes). Leaves are the most common above-ground part.
          </p>
        </div>
      </section>

      {/* ═══ DARK CLOSE ═══ */}
      <section style={{ padding: 'clamp(60px, 10vh, 100px) clamp(24px, 5vw, 64px)', background: C.dark }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontStyle: 'italic', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
            Morocco is the second-richest country for plant biodiversity in the entire Mediterranean basin. 800 species heal. 40 exist nowhere else. The global market for medicinal plants reached $4.18 billion in 2023. Morocco ranks 12th in global exports.
          </p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontStyle: 'italic', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', marginTop: 28 }}>
            But the most valuable thing is not the plant. It is the person who knows what it does. And that person is getting older.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ padding: 'clamp(40px, 6vh, 60px) clamp(24px, 5vw, 64px)', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: 20, fontWeight: 500 }}>Sources</p>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              'Bellakhdar, J. (2020). La Pharmacopée Marocaine Traditionnelle. 3rd ed. Editions Le Fennec, Casablanca. 1,370 pages.',
              'Kachmar et al. (2021). Traditional Knowledge of Medicinal Plants Used in Northeastern Morocco. Evidence-Based Complementary and Alternative Medicine.',
              'Chaachouay et al. (2022). Herbal Medicine in the Treatment of Cardiovascular Diseases, Rif. Frontiers in Pharmacology.',
              'Taleb et al. (2017). Aromatic and Medicinal Plants of Morocco: Biodiversity and Economic Value. MNHN, Rabat.',
              'Jamaleddine et al. (2017). Endemic Medicinal Plants of Morocco. Lamiaceae, Asteraceae, Brassicaceae.',
              'ITC TradeMap (2023). Global trade data HS 1211: Medicinal and Aromatic Plants.',
              'Hamilton (2013). Botanical Identification of Medicinal Roots in Morocco. J. Ethnobiology & Ethnomedicine 9:59.',
            ].map((src, i) => (
              <p key={i} style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{src}</p>
            ))}
          </div>
          <div style={{ marginTop: 32, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 10, color: C.muted, letterSpacing: '0.08em' }}>
              © Slow Morocco · slowmorocco.com · Data research & visualization by Slow Morocco
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  )
}
