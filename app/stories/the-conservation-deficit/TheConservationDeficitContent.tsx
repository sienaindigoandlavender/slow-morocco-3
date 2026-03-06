'use client'

import { useEffect, useRef } from 'react'
import {
  useInView, AnimCounter, FadeIn,
  SpeciesCollapse, FundingGap, DeadVsAlive,
  ExtractionEconomy, ModelsScorecard, FundingArchitecture,
} from './charts'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const MAP_MARKERS = [
  { name: 'Kruger — South Africa', coords: [31.5, -24.0] as [number, number], color: '#047857', detail: 'Rhino poaching epicentre. Elephant stronghold. 88 rhinos poached in 2024. Population dropped 60% since 2013.', sz: 14 },
  { name: 'Serengeti-Mara — Tanzania/Kenya', coords: [35.0, -2.3] as [number, number], color: '#B45309', detail: '3,000+ lions. Largest contiguous population. ~100 retaliatory kills/year on periphery.', sz: 14 },
  { name: 'Okavango Delta — Botswana', coords: [22.5, -19.8] as [number, number], color: '#047857', detail: 'Elephant stronghold. 130,000+ elephants in northern Botswana. Stable, well-managed.', sz: 12 },
  { name: 'Virunga Massif — Rwanda/DRC/Uganda', coords: [29.5, -1.4] as [number, number], color: '#15803d', detail: '1,063 mountain gorillas. $200M revenue. The success model.', sz: 12 },
  { name: 'Hluhluwe-iMfolozi — South Africa', coords: [32.0, -28.2] as [number, number], color: '#DC2626', detail: 'KwaZulu-Natal. 232 rhinos poached in 2024. Dehorning programme. Syndicates adapting.', sz: 10 },
  { name: 'Niassa — Mozambique', coords: [37.5, -12.5] as [number, number], color: '#991B1B', detail: '1,000+ lions but declining. Ivory trafficking corridor. Weak enforcement.', sz: 10 },
  { name: 'W-Arly-Pendjari — West Africa', coords: [1.5, 11.5] as [number, number], color: '#DC2626', detail: 'Last West African lion stronghold. ~100 lions remain. Sahel conflict encroaching.', sz: 10 },
  { name: 'Garamba — DRC', coords: [29.0, 4.0] as [number, number], color: '#991B1B', detail: 'Northern white rhino went extinct here (functionally). LRA ivory poaching corridor.', sz: 8 },
  { name: 'Amboseli — Kenya', coords: [37.2, -2.7] as [number, number], color: '#B45309', detail: 'Lion Guardians programme. Retaliatory killing dropped 99%. Maasai-led conservation.', sz: 10 },
  { name: 'Etosha / NW Namibia', coords: [16.0, -19.5] as [number, number], color: '#047857', detail: 'Communal conservancies. Desert lion recovery 20→150+. Community-owned wildlife.', sz: 10 },
  { name: 'Lagos / Apapa Port — Nigeria', coords: [3.4, 6.4] as [number, number], color: '#DC2626', detail: 'Pangolin trafficking hub. 55% of global seizures (2016-2019). 21.5 tonnes scales seized since 2021.', sz: 12 },
  { name: 'Gabon (forests)', coords: [11.5, -0.5] as [number, number], color: '#047857', detail: '95,000 forest elephants. 66% of global population. DNA surveys reveal higher numbers than thought.', sz: 12 },
]

const SOURCES = [
  'IUCN Red List — African elephant, lion, rhino, gorilla, pangolin assessments (2021–2025)',
  'Edwards et al. (2024) — Survey-based inference of continental African elephant decline. PNAS.',
  'Funston, Lindsey et al. (2025) — Range-wide assessment of threats to African lion. Global Ecology & Conservation.',
  'TRAFFIC / IUCN (2025) — Rhino populations, poaching and trade. CITES CoP20 report.',
  'Wildlife Justice Commission (2025) — Pangolin scale & ivory trafficking trends 2015-2024.',
  'IUCN SSC Pangolin Specialist Group (2025) — Conservation status, trade & enforcement. CITES.',
  'Indufor / Campaign for Nature / Pew (2025) — State of International 30×30 Funding.',
  'WTTC (2024) — Africa Travel & Tourism Economic Impact. $186B GDP contribution, 25M jobs.',
  'AWF / Lindsey et al. — 90% of Africa\'s protected areas lack critical funding for lions.',
  'Guénard et al. (2025) — Taxonomic bias in conservation funding. PNAS.',
  'Loveridge et al. — Cecil and the economics of trophy hunting vs ecotourism.',
  'Rwanda Development Board (2024) — Gorilla permit revenue and tourism statistics.',
  'World Bank (2023) — Rwanda Economic Update: Nature-based Tourism.',
  'UNODC — World Wildlife Crime Report. $7–23B illegal wildlife trade annually.',
]

export function TheConservationDeficitContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'; link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js'
    script.onload = () => {
      const mb = (window as any).mapboxgl; if (!mb) return
      mb.accessToken = MAPBOX_TOKEN
      const map = new mb.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [20, 0], zoom: 3.2, interactive: true, attributionControl: false, pitch: 8 })
      mapRef.current = map
      map.addControl(new mb.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        MAP_MARKERS.forEach(m => {
          const el = document.createElement('div')
          el.style.cssText = `width:${m.sz}px;height:${m.sz}px;border-radius:50%;background:${m.color};border:2px solid rgba(255,255,255,0.6);box-shadow:0 0 14px ${m.color}60;cursor:pointer;transition:transform 0.2s;`
          el.onmouseenter = () => { el.style.transform = 'scale(1.4)' }
          el.onmouseleave = () => { el.style.transform = 'scale(1)' }
          new mb.Marker(el).setLngLat(m.coords).setPopup(
            new mb.Popup({ offset: 12, maxWidth: '280px', closeButton: false }).setHTML(
              `<div style="font-family:system-ui;padding:4px 0"><p style="font-size:13px;font-weight:700;margin:0 0 4px;color:#0a0a0a">${m.name}</p><p style="font-size:11px;color:#525252;margin:0;line-height:1.5">${m.detail}</p></div>`
            )
          ).addTo(map)
        })
      })
    }
    document.head.appendChild(script)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="bg-white text-[#262626] pt-16">

      {/* HERO */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 147 · Conservation Economics</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Conservation<br />Deficit</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[520px] mb-10">
            Africa&rsquo;s wildlife generates $29.3 billion in tourism GDP. The illegal trade extracts $23 billion. The conservation funding to protect it all: $1.1 billion. The arithmetic does not work.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 29.3, s: '$|B', l: 'wildlife tourism GDP', d: 0 },
              { n: 23, s: '$|B', l: 'illegal wildlife trade', d: 0 },
              { n: 1.1, s: '$|B', l: 'conservation funding', d: 1 },
              { n: 4, s: '$|B', l: '30×30 annual shortfall', d: 0 },
              { n: 94, s: '|%', l: 'species unfunded', d: 0 },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none">
                  {k.s.startsWith('$') && '$'}<AnimCounter target={k.n} decimals={k.d} />{k.s.includes('B') && 'B'}{k.s.includes('%') && '%'}
                </p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, #DC2626 0%, transparent 50%), radial-gradient(circle at 70% 30%, #047857 0%, transparent 50%)' }} />
      </section>

      {/* MAP */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Map</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Where the money goes. Where it doesn&rsquo;t.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Green markers: populations that are stable or recovering. Red: populations under active threat with inadequate funding. The pattern is consistent &mdash; funding follows fame, not need. The best-known parks get resources. Everything else gets median funding of $200 per square kilometre. In Zimbabwe, half the lion protected areas receive less than $1 per square kilometre.</p>
        <div ref={mapContainer} style={{ width: '100%', height: 500, borderRadius: 8, overflow: 'hidden', background: '#1a1a1a' }} />
        <div className="flex gap-4 flex-wrap mt-4">
          {[['Stable / recovering', '#047857'], ['Declining / threatened', '#B45309'], ['Critical / trafficking hub', '#DC2626']].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /><span className="text-[9px] uppercase tracking-wider text-[#737373]">{l}</span></div>
          ))}
        </div>
      </div></section>

      {/* 002 THE ASSET */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Asset</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Six species. Six trajectories. One pattern.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Elephants down 77%. Lions down 88%. Rhinos down 93% then partially recovered. Pangolins &mdash; nobody even knows the baseline. Only the <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">mountain gorilla</span> is increasing, and only because one country decided to build an economy around keeping them alive. The bar shows what remains. The empty space is what&rsquo;s gone.</p>
        <SpeciesCollapse />
      </div></section>

      {/* 003 THE GAP */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Gap</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">They generate billions. They receive fractions.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Wildlife tourism contributes $29.3 billion to Africa&rsquo;s GDP. The illegal wildlife trade extracts $23 billion. International conservation funding for all protected areas in developing countries reached $1.1 billion in 2024. The 30&times;30 target needs $6 billion per year by 2030. At current growth rates, the world will miss that target by $4 billion annually.</p>
        <FundingGap />
      </div></section>

      {/* 004 DEAD VS ALIVE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · Dead vs Alive</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Every species is worth more alive. The market doesn&rsquo;t care.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">An elephant generates $1.6 million in lifetime tourism revenue. Dead, its ivory fetches $21,000. A <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">rhino horn</span> sells for $300,000 on the black market, but the living animal generates $1.6 million over its lifetime. The ratios range from 5:1 to infinity. The gorilla has no dead value at all &mdash; nobody trades in gorilla parts. That&rsquo;s why it&rsquo;s the only one increasing.</p>
        <DeadVsAlive />
      </div></section>

      {/* 005 EXTRACTION */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Extraction Economy</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Five commodities. One direction: out of Africa.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Ivory, horn, scales, bone, meat. COVID disrupted trafficking more than any ban ever did &mdash; pangolin seizures dropped 75%, ivory 94% compared to 2019 peaks. But the networks adapted. Angola and Mozambique replaced Nigeria for ivory. Syndicates now target dehorned rhinos. The only commodity increasing is bushmeat &mdash; 5 million tonnes per year across Africa, unregulated, unmeasured, and destroying the prey base that lions and wild dogs depend on.</p>
        <ExtractionEconomy />
      </div></section>

      {/* 006 MODELS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 · What Works, What Doesn&rsquo;t</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Seven models. Three succeed. The successes share one thing.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The models that work &mdash; Rwanda&rsquo;s gorilla permits, Namibia&rsquo;s conservancies, Kenya&rsquo;s Lion Guardians &mdash; share one structural feature: the people who live with the animals receive direct economic benefit from their survival. The models that fail &mdash; trophy hunting, captive breeding, trade bans without enforcement &mdash; share one structural failure: the money either doesn&rsquo;t reach communities or doesn&rsquo;t exist at all.</p>
        <ModelsScorecard />
      </div></section>

      {/* 007 FUNDING ARCHITECTURE */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">007 · Who Pays</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Five donors. 54% of all funding. The architecture is brittle.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Germany alone provides $267 million annually &mdash; more than any other country. The World Bank and GEF add another $320 million. The United States was the sixth-largest funder until USAID shuttered in 2025. Philanthropy grew 89% post-pandemic but cannot fill a $4 billion annual gap. The A-PACT initiative &mdash; a Pan-African Conservation Trust launched in 2022 &mdash; aims to create continent-wide endowment funding, but it is early-stage. The ranger in the field cannot wait for the architecture to catch up.</p>
        <FundingArchitecture />
      </div></section>

      {/* 008 ESSAY */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">008 · The Architecture That Doesn&rsquo;t Exist</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">The money exists. The mechanism does not.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>Africa holds 25% of the world&rsquo;s remaining megafauna, and that megafauna drives an industry worth $29.3 billion per year in direct GDP and supports 3.6 million wildlife-specific jobs. Add the wider tourism economy and it reaches $186 billion and 25 million jobs. By 2033, WTTC projects another 12.7 million new jobs on the continent from tourism alone.</p>
          <p>The illegal trade in wildlife products &mdash; ivory, horn, scales, bone, meat &mdash; extracts between $7 billion and $23 billion per year. The legal conservation funding meant to counter it: $1.1 billion internationally in 2024, up from $396 million in 2014 but still $4 billion short of what is needed.</p>
          <p>The paradox is structural. The species generate the revenue. The revenue enters national economies. But the national economies do not return sufficient funding to the protected areas where the species live. Tourism taxes go into general budgets. Park fees cover a fraction of operational costs. International donors fill some gaps but concentrate funding on charismatic species in well-known parks &mdash; a 2025 PNAS study found that almost a third of conservation funding goes to non-threatened species, while 94% of threatened species receive zero dedicated support.</p>
          <p>Funding follows fame, not need. The Serengeti is well-funded. The Ruaha killing fields are not. Kruger gets international attention. Angola&rsquo;s lions get $1 per square kilometre. The median protected area receives $200/km&sup2; per year. The minimum needed for effective management: $1,000&ndash;$2,000/km&sup2;.</p>
          <p>The models that work are islands. Rwanda&rsquo;s gorilla permits. Namibia&rsquo;s conservancies. Kenya&rsquo;s Lion Guardians. Each proves the thesis: when wildlife generates direct, tangible, local benefit, people protect it. When it does not, they eliminate it. The challenge is connecting these islands into a continental system. A-PACT attempts this. But it requires an endowment of billions, and the political window for building it is narrowing as donor countries retract.</p>
          <p>COVID proved both the fragility and the logic. When tourism stopped, poaching surged. Rangers went unpaid. Parks that depended on gate fees collapsed. The species most vulnerable were the ones with the least diversified funding. The species most resilient were the ones with trust-fund backing or community ownership structures that survived the revenue shock.</p>
          <p>The architecture that Africa&rsquo;s wildlife needs does not yet exist at continental scale. The components exist: permit models, community ownership, trust funds, intelligence-led enforcement, revenue sharing. The question is whether they can be assembled into a system before the species they are meant to protect disappear.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#991B1B' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">
              Africa&rsquo;s wildlife generates enough revenue to fund its own survival three times over. The money enters national economies as tourism GDP, exits as general budget, and never returns to the protected areas where the animals live. The deficit is not financial. It is architectural.
            </p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED INTELLIGENCE */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">009 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern.</h2>
        <div className="space-y-10">
          {[
            { to: 'The Gorilla Dividend', insight: 'The success model. $1,500 permits, 10% to communities, former poachers as trackers. 254 → 1,063. The only great ape increasing.' },
            { to: 'The Lion Economics', insight: 'The failure model. 200,000 → 23,000. $20.5B safari market, $619M funding gap. The species funding its own extinction.' },
            { to: 'The Last Lions', insight: 'The Barbary lion went extinct because nobody built an economic model around keeping it alive. The Atlas lion is the historical warning.' },
            { to: 'The Sahel War', insight: 'Conflict zones are extinction zones. 60% of Burkina Faso outside state control. W-Arly-Pendjari lost 7,000 elephants. Wagner replaced France. Wildlife got worse.' },
            { to: 'The Blood Gold', insight: 'Wagner/Africa Corps extract $2.5B+ in gold from 7 African countries. Zero tax paid. The same networks that mine gold facilitate ivory and pangolin trafficking.' },
            { to: 'The Silk Road Into Africa', insight: 'BRI railways and roads cut through wildlife corridors. $182.3B in infrastructure loans. The question: does infrastructure enable conservation tourism or habitat fragmentation?' },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#991B1B' }}>
              <span className="text-[10px] text-[#f87171] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-[560px] mt-2">{c.insight}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* SOURCES */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-10">
          {SOURCES.map((s, i) => <p key={i} className="text-[11px] text-[#525252]">{s}</p>)}
        </div>
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[#e5e5e5]">
          <p className="text-[12px] text-[#737373]">Data compilation, visualisation &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
          <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
        </div>
      </div></section>
    </div>
  )
}
