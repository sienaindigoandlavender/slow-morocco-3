'use client'

import { useState, useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────
// The French Protectorate — 1912–1956
// Module 073 — Political & Historical Intelligence
// ─────────────────────────────────────────────────

interface TimelineEvent {
  year: string
  event: string
  detail: string
  category: 'conquest' | 'administration' | 'resistance' | 'independence'
}

const TIMELINE: TimelineEvent[] = [
  { year: '1907', event: 'Oujda occupied, Casablanca bombarded', detail: 'France invades eastern Morocco and shells Casablanca after the assassination of French physician Emile Mauchamp in Marrakech. Military occupation predates the treaty by five years.', category: 'conquest' },
  { year: '1912', event: 'Treaty of Fez — Protectorate established', detail: 'Sultan Abd al-Hafid signs under military pressure on 30 March. France gains legislative power, military defence, foreign policy, and jurisdiction. The Sultan reigns but does not rule. The Makhzen believed the arrangement would resemble British Egypt. It did not. It was modelled on Tunisia.', category: 'conquest' },
  { year: '1912', event: 'Fez mutiny and riots', detail: '17 April: Moroccan infantrymen mutiny in the French garrison when news of the treaty spreads. The Mellah (Jewish quarter) is bombarded by French artillery and sacked. Lyautey moves the capital from Fez to Rabat — permanently.', category: 'resistance' },
  { year: '1912', event: 'Lyautey appointed Resident-General', detail: 'Hubert Lyautey (1854–1934) replaces Regnault. Military officer, colonial administrator, architect of the "dual city" policy. Recruits Henri Prost as chief urban planner. Establishes the Native Policy Council.', category: 'administration' },
  { year: '1913', event: 'Henri Prost begins urban planning', detail: 'Prost (1874–1959) designs the villes nouvelles — European districts built alongside but separate from existing medinas. Casablanca, Rabat, Fez, Marrakech, Meknes. Wide boulevards, plazas, administrative buildings. Medinas preserved but frozen.', category: 'administration' },
  { year: '1917–26', event: 'Habous Quarter, Casablanca', detail: 'Architects Laprade, Cadet, and Brion build the Habous district — a "new medina" for Moroccans displaced by urban migration. Designed to look traditional but serves colonial settlement policy. Casablanca\'s population surges from 12,000 (1912) to 110,934 (1921).', category: 'administration' },
  { year: '1921–26', event: 'Rif War — Abd el-Krim\'s republic', detail: 'Berber leader Abd el-Krim defeats Spain at Annual (1921 — 8,000 Spanish soldiers killed), establishes the Republic of the Rif. France intervenes when the rebellion crosses into the French zone. Joint Franco-Spanish force of 250,000 troops crushes the republic by 1926. Abd el-Krim exiled to Reunion.', category: 'resistance' },
  { year: '1930', event: 'Berber Dahir — the catalyst', detail: '16 May: Sultan Mohammed V promulgates a decree organizing Berber tribal justice under customary law separate from Sharia courts. Nationalists see a French strategy to divide Arab and Berber Moroccans. Mass protests erupt. Allal al-Fassi leads the opposition. The decree unifies the nationalist movement.', category: 'resistance' },
  { year: '1934', event: 'Moroccan Action Committee founded', detail: 'Mohamed Hassan al-Ouazzani, Allal al-Fassi, and Ahmed Balafrej form the Comite d\'Action Marocaine (CAM). They publish the Plan des Reformes — demanding a return to indirect rule, Moroccan access to government positions, and representative councils. France ignores it.', category: 'resistance' },
  { year: '1937', event: 'Boufakrane incidents and exile', detail: 'French settlers attempt to divert river water from Moroccan residents. Revolts erupt. France arrests and exiles Allal al-Fassi (to Gabon, then Congo — nine years). Al-Ouazzani placed under forced residence. The nationalist movement is decapitated.', category: 'resistance' },
  { year: '1943', event: 'Anfa Conference — Roosevelt meets Mohammed V', detail: 'January: Allied leaders meet in Casablanca. Mohammed V reminds Roosevelt that Morocco fought alongside the Allies. Roosevelt calls Moroccan independence aspirations "reasonable and legitimate." The Sultan\'s international visibility rises.', category: 'independence' },
  { year: '1943', event: 'Istiqlal Party founded', detail: '18 December: Secret conference in Rabat. With al-Fassi and al-Ouazzani in exile, the remaining nationalists found the Istiqlal (Independence) Party.', category: 'independence' },
  { year: '1944', event: 'Independence Manifesto', detail: '11 January: 66 Moroccans sign the Proclamation of Independence demanding full sovereignty under Mohammed V and a democratic constitution. Drafted by Ahmed el Hamiani Khatat and Ahmed Bahnini. Malika al-Fassi is the only woman to sign. France arrests 20 nationalists. Ahmed Balafrej deported to Corsica.', category: 'independence' },
  { year: '1947', event: 'Tangier Speech', detail: '9 April: Mohammed V visits Tangier and affirms Morocco\'s commitment to territorial unity and Arab identity — omitting any mention of France. The colonial authorities are alarmed. Pressure on the Sultan intensifies.', category: 'independence' },
  { year: '1953', event: 'Mohammed V exiled to Madagascar', detail: '20 August: French soldiers invade the Royal Palace in Rabat. The royal family is forced onto a bus to an unknown destination. Exiled first to Corsica, then Madagascar. Mohammed Ben Arafa installed as replacement. Moroccans reject him. Protests, strikes, and armed resistance erupt nationwide. The exile unifies the country.', category: 'independence' },
  { year: '1955', event: 'Aix-les-Bains — negotiations begin', detail: 'August–September: French PM Edgar Faure opens talks with Istiqlal leaders. Ben Arafa abdicates and flees to Tangier. Mohammed V returns to Morocco. France, weakened by the Algerian War, concedes.', category: 'independence' },
  { year: '1956', event: 'Independence — 2 March', detail: 'Franco-Moroccan Joint Declaration dissolves the French protectorate. Spain cedes the northern zone one month later. Tangier\'s international status ends in October. 44 years of colonial rule end. Mohammed V assumes the title of King in 1957.', category: 'independence' },
]

interface KeyFigure {
  name: string
  role: string
  years: string
  detail: string
  side: 'french' | 'moroccan'
}

const KEY_FIGURES: KeyFigure[] = [
  { name: 'Hubert Lyautey', role: 'Resident-General (1912–1925)', years: '1854–1934', detail: 'Marshal of France. Architect of the "dual city" policy — European villes nouvelles built alongside preserved medinas. Moved the capital from Fez to Rabat. Established the Native Policy Council. Policy of "association" over "assimilation": protect the Sultan\'s symbolic authority while France held all real power. Recruited Henri Prost. The paternalist who claimed to protect what he controlled.', side: 'french' },
  { name: 'Henri Prost', role: 'Chief Urban Planner (1913–1923)', years: '1874–1959', detail: 'Designed the villes nouvelles of Casablanca, Rabat, Fez, Marrakech, Meknes. Wide European boulevards built outside the medina walls. Medinas preserved but economically frozen — traditional crafts redirected toward European markets. The urban planning that physically separated coloniser and colonised.', side: 'french' },
  { name: 'Michel Ecochard', role: 'Director, Service de l\'urbanisme (1947–1953)', years: '1905–1985', detail: 'Took over from Prost\'s legacy. Confronted the bidonvilles (shanty towns) that Prost\'s dual-city model had created. Designed mass housing for Moroccans as the rural-to-urban exodus accelerated. Casablanca medina density: 1,290 per hectare. European quarters: 50 per hectare.', side: 'french' },
  { name: 'Mohammed V', role: 'Sultan / King', years: '1909–1961', detail: 'Ascended the throne 18 November 1927. Endorsed the 1944 Independence Manifesto. Met Roosevelt at Anfa Conference (1943). Delivered the Tangier Speech (1947). Exiled to Madagascar (1953). His exile unified the country. Returned 1955. Morocco\'s independence: 2 March 1956. Assumed the title of King, 1957.', side: 'moroccan' },
  { name: 'Allal al-Fassi', role: 'Nationalist leader, Istiqlal founder', years: '1910–1974', detail: 'Scholar from Fez. Led the 1930 protests against the Berber Dahir. Exiled to Gabon and Congo (1937–1946). Co-founded Istiqlal. Championed "Greater Morocco" — territorial integrity including Sahara, Ceuta, Melilla. Negotiated guerrilla disarmament after independence. Monarchist who believed a king could be loyal to and still opposed.', side: 'moroccan' },
  { name: 'Abd el-Krim', role: 'Leader, Republic of the Rif', years: '1882–1963', detail: 'Defeated Spain at Annual (1921). Established the Republic of the Rif — Africa\'s first anti-colonial republic. Resisted 250,000 Franco-Spanish troops. Surrendered 1926. Exiled to Reunion, then Egypt. Never returned to Morocco. His tactics studied by Mao, Ho Chi Minh, and Che Guevara.', side: 'moroccan' },
  { name: 'Malika al-Fassi', role: 'Only woman to sign the 1944 Manifesto', years: '1919–2007', detail: 'Activist, writer. Signed the Independence Manifesto alongside 65 men. Active in nationalist and intellectual circles in Fez. Her presence confirmed that women played active roles — organising, educating, building communication networks — though colonial and post-colonial records rarely said so.', side: 'moroccan' },
]

interface VilleNouvelle {
  city: string
  lat: number
  lng: number
  detail: string
  color: string
}

const VILLES_NOUVELLES: VilleNouvelle[] = [
  { city: 'Rabat', lat: 33.9716, lng: -6.8498, detail: 'New capital from 1912. Lyautey chose it over Fez: coastal, accessible to France, easier to control. Hassan Tower area. Administrative centre of the protectorate.', color: '#2D5F8A' },
  { city: 'Casablanca', lat: 33.5731, lng: -7.5898, detail: 'Economic engine. Population 12,000 (1912) to 110,934 (1921). Prost\'s European quartier. Habous "new medina." Medina density 1,290/hectare vs 50/hectare European. Bidonvilles emerged.', color: '#A0452E' },
  { city: 'Fez', lat: 34.0331, lng: -5.0003, detail: 'Ancient capital, preserved as cultural showcase. Medina frozen while ville nouvelle grew outside the walls. Nationalists organised here. Istiqlal founded here.', color: '#F59E0B' },
  { city: 'Marrakech', lat: 31.6295, lng: -7.9811, detail: 'Gueliz district — the French ville nouvelle. Laid out by Prost. Wide avenues, cafes, administrative buildings. The medina remained separate.', color: '#7B506F' },
  { city: 'Meknes', lat: 33.8731, lng: -5.5407, detail: 'Imperial city with new European district. French garrison town. Agricultural hinterland controlled for settler farming.', color: '#5C7C3E' },
]

const HERO_STATS = [
  { value: '1912', label: 'Treaty of Fez' },
  { value: '44', label: 'Years of colonial rule' },
  { value: '1944', label: 'Independence Manifesto' },
  { value: '1956', label: 'Sovereignty restored' },
]

const KEY_NUMBERS = [
  { value: '44', label: 'Years', note: 'From the Treaty of Fez (30 March 1912) to the Franco-Moroccan Joint Declaration (2 March 1956).' },
  { value: '250,000', label: 'Troops against the Rif', note: 'Franco-Spanish coalition required to defeat Abd el-Krim\'s republic. The largest colonial military operation in Africa at the time.' },
  { value: '1,290', label: 'Per hectare (medina)', note: 'Population density in Casablanca\'s medina. The European quarters across the wall: 50 per hectare. Twenty-six times the difference.' },
  { value: '66', label: 'Signatories', note: 'Of the 1944 Independence Manifesto. One woman: Malika al-Fassi. 20 arrested by France. Ahmed Balafrej deported to Corsica.' },
  { value: '35%', label: 'Speak French (2019)', note: 'More than Algeria (33%). The linguistic legacy persists. French still runs the boardrooms, the courts, and the universities.' },
  { value: '1.5M', label: 'Moroccans in France', note: 'The largest Moroccan community outside Morocco. The colonial connection inverted: the colonised moved to the coloniser.' },
]

interface BibliographyEntry {
  author: string
  title: string
  year: string
  detail: string
}

const BIBLIOGRAPHY: BibliographyEntry[] = [
  { author: 'Abu-Lughod, Janet', title: 'Rabat: Urban Apartheid in Morocco', year: '1980', detail: 'Princeton. The foundational study of French colonial urban planning as spatial segregation. Traces how Lyautey and Prost\'s dual-city model created the physical infrastructure of inequality that persists today.' },
  { author: 'Pennell, C. R.', title: 'Morocco Since 1830: A History', year: '2000', detail: 'Hurst & Co. Comprehensive English-language history of modern Morocco. From the pre-colonial period through independence to Hassan II.' },
  { author: 'Gershovich, Moshe', title: 'French Military Rule in Morocco: Colonialism and Its Consequences', year: '2000', detail: 'Routledge. Military dimensions of the protectorate — how armed force underpinned the administrative veneer.' },
  { author: 'Segalla, Spencer', title: 'The Moroccan Soul: French Education, Colonial Ethnology, and Muslim Resistance, 1912–1956', year: '2009', detail: 'Nebraska. How France used education and ethnography as instruments of colonial control — and how Moroccans resisted.' },
  { author: 'Laroui, Abdallah', title: 'The History of the Maghrib: An Interpretive Essay', year: '1977', detail: 'Princeton. The Moroccan historian\'s defining work. "The more those at the top borrowed, the more those at the bottom were impoverished."' },
  { author: 'Wright, Gwendolyn', title: 'The Politics of Design in French Colonial Urbanism', year: '1991', detail: 'Chicago. Architecture and urban planning as colonial instruments across the French empire. Morocco features centrally.' },
  { author: 'Bidwell, Robin', title: 'Morocco Under Colonial Rule: French Administration of Tribal Areas 1912–1956', year: '1973', detail: 'Cass. How France administered the Bled es-Siba — the rural tribal territories beyond the Makhzen\'s traditional reach.' },
  { author: 'Miller, Susan Gilson', title: 'A History of Modern Morocco', year: '2013', detail: 'Cambridge. Clear, contemporary, thorough. From the pre-colonial crisis through the Arab Spring.' },
]

const CAT_COLORS: Record<string, string> = {
  conquest: '#A0452E',
  administration: '#2D5F8A',
  resistance: '#F59E0B',
  independence: '#5C7C3E',
}

export function FrenchProtectorateContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
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
        center: [-6.2, 33.0],
        zoom: 5.5,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        VILLES_NOUVELLES.forEach(v => {
          const el = document.createElement('div')
          el.style.cssText = `width:16px;height:16px;background:${v.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '280px' })
            .setHTML(`<div style="font-family:IBM Plex Mono,monospace;padding:4px;"><div style="font-size:13px;font-weight:700;color:#f5f5f5;">${v.city}</div><div style="font-size:10px;color:#888;margin-top:4px;">${v.detail}</div></div>`)
          const marker = new mapboxgl.Marker({ element: el }).setLngLat([v.lng, v.lat]).setPopup(popup).addTo(map)
          markersRef.current.push(marker)
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  const filteredTimeline = activeCategory ? TIMELINE.filter(t => t.category === activeCategory) : TIMELINE

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
            {/* Grid lines — ville nouvelle grid imposed on land */}
            {Array.from({ length: 20 }, (_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 40} x2="1200" y2={i * 40} stroke="#2D5F8A" strokeWidth="0.3" />
            ))}
            {Array.from({ length: 30 }, (_, i) => (
              <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="800" stroke="#2D5F8A" strokeWidth="0.3" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#2D5F8A', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 073 — Political &amp; Historical Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The French<br />Protectorate
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[540px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            1912–1956. Forty-four years between the Treaty of <span className="underline underline-offset-2">Fez</span> and
            the Joint Declaration. Lyautey built the villes nouvelles.
            Morocco built the resistance that dismantled them.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#2D5F8A', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Timeline</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Forty-Four Years</h2>
          <p className="text-[14px] text-dwl-body max-w-[520px] leading-relaxed mb-6">
            From military occupation to diplomatic departure.
            Filter by thread.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className="text-[11px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-sm transition-all"
              style={{ background: !activeCategory ? '#0a0a0a' : '#f5f5f5', color: !activeCategory ? '#fff' : '#888' }}
            >All</button>
            {['conquest', 'administration', 'resistance', 'independence'].map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(activeCategory === c ? null : c)}
                className="text-[11px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-sm transition-all"
                style={{ background: activeCategory === c ? CAT_COLORS[c] : '#f5f5f5', color: activeCategory === c ? '#fff' : '#888' }}
              >{c}</button>
            ))}
          </div>

          <div className="space-y-0">
            {filteredTimeline.map((t, i) => {
              const isVisible = visibleSections.has(`tl-${t.year}-${i}`)
              return (
                <div key={`${t.year}-${i}`} data-sid={`tl-${t.year}-${i}`} className="py-5 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-[90px_1fr] gap-3 md:gap-8">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: CAT_COLORS[t.category] }} />
                      <span className="font-serif italic text-[18px] text-dwl-black">{t.year}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-dwl-black mb-1">{t.event}</p>
                      <p className="text-[12px] text-dwl-body leading-relaxed">{t.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#2D5F8A' }}>
        <div className="max-w-[680px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#ffffff' }}>
            The more those at the top borrowed, the more
            those at the bottom were impoverished.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.55)' }}>— Abdallah Laroui, <em>The History of the Maghrib</em></p>
        </div>
      </section>

      {/* ═══ MAP — VILLES NOUVELLES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D5F8A' }}>002 — The Dual City</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Villes Nouvelles</h2>
          <p className="text-[13px] max-w-[540px] leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>
            Prost designed European districts alongside existing <span className="underline underline-offset-2">medina</span>s.
            Wide boulevards on one side of the wall. Narrow alleys on the other.
            Casablanca&rsquo;s medina reached 1,290 people per hectare.
            The European quarter across the road: 50.
          </p>
          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '420px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ KEY FIGURES ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — The Actors</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-10">Seven Figures</h2>

          <div className="space-y-0">
            {KEY_FIGURES.map((f, i) => {
              const isVisible = visibleSections.has(`fig-${i}`)
              return (
                <div key={f.name} data-sid={`fig-${i}`} className="py-6 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-sm" style={{ background: f.side === 'french' ? '#2D5F8A20' : '#F59E0B20', color: f.side === 'french' ? '#2D5F8A' : '#F59E0B' }}>
                        {f.side === 'french' ? 'French administration' : 'Moroccan resistance'}
                      </span>
                      <h3 className="text-[16px] font-medium text-dwl-black mt-2">{f.name}</h3>
                      <p className="text-[12px] text-dwl-gray mt-0.5">{f.role}</p>
                      <p className="text-[11px] font-mono mt-1" style={{ color: '#bbb' }}>{f.years}</p>
                    </div>
                    <p className="text-[13px] text-dwl-body leading-relaxed">{f.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#111' }}>
        <div className="max-w-[680px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', color: '#F59E0B' }}>
            Complete independence under the leadership of His Majesty
            Sidi Mohammed Ben Youssef.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Independence Manifesto, 11 January 1944</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D5F8A' }}>004 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {KEY_NUMBERS.map((n) => (
              <div key={n.label} className="p-6 md:p-8" style={{ background: '#0a0a0a' }}>
                <p className="font-serif italic text-[32px] md:text-[44px] leading-none" style={{ color: '#2D5F8A' }}>{n.value}</p>
                <p className="text-[12px] mt-2 font-medium" style={{ color: 'rgba(0,0,0,0.6)' }}>{n.label}</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — Sources</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Further Reading</h2>
          <p className="text-[14px] text-dwl-body max-w-[480px] leading-relaxed mb-10">
            Eight books. Each one earned its place on this list.
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
              'Wikipedia — French protectorate in Morocco: Treaty of Fez 30 March 1912, Lyautey appointment, Fez riots 17 April 1912, Berber Dahir 1930, capital move to Rabat, 35% French-speaking (2019), 1.5M Moroccans in France',
              'Wikipedia — French conquest of Morocco: Oujda 1907, Casablanca bombardment, Agadir Crisis 1911, Treaty of Fez negotiation, Regnault, Bled el-Makhzen / Bled es-Siba distinction, Maroc utile',
              'Wikipedia — Treaty of Fez: signed at Mnebhi Palace, Sultan Abd al-Hafid abdication, Moulay Yusef succession, modelled on Treaty of Bardo (Tunisia), Abdelqader Benghabrit interpreter',
              'Wikipedia — Proclamation of Independence: 66 signatories, 11 January 1944, Ahmed el Hamiani Khatat & Ahmed Bahnini drafters, Malika al-Fassi only woman, 20 arrested, Balafrej to Corsica',
              'Grokipedia — French protectorate: Casablanca 12,000 to 110,934 (1912–1921), medina 1,290/ha vs European 50/ha, railway 1,700km narrow gauge, Berber Dahir analysis, Ecochard era 1947–1953',
              'Morocco World News: urban development during protectorate, dual city policy, Beqqal & Chaoui (2020) on Lyautey preservation vs segregation debate, post-colonial urban legacy',
              'Morocco World News (2025/2026): Independence Manifesto 82nd anniversary, Anfa Conference, Mohammed V exile 20 Aug 1953, Tangier Speech 9 Apr 1947, Aix-les-Bains negotiations',
              'Tandfonline: Central Market Rabat (1922–1925), Habous district Casablanca (1917–1926), policy of association vs assimilation, Prost era, Service de l\'urbanisme (Ecochard)',
              'Gulf News: Allal al-Fassi biography, exiled to Gabon/Congo 1937–1946, "Greater Morocco" movement, guerrilla negotiation, monarchist reformism',
              'Lumen Learning — Moroccan Independence: CAM founded 1934, Plan des Reformes, Rif War chronology, Mohammed Ben Aarafa replacement, Oujda violence 1953',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#2D5F8A' }}>Sources: Historical archives</p>
          </div>
        </div>
      </section>
    </div>
  )
}
