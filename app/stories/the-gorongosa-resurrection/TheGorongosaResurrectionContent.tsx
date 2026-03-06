'use client'

import { useEffect, useRef } from 'react'
import { useInView, AnimCounter, DestructionRecoveryTimeline, SpeciesRecovery, IntegratedModel, StressTests } from './charts'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const MAP_MARKERS = [
  { name: 'Gorongosa National Park', coords: [34.35, -18.97] as [number, number], color: '#047857', detail: '400,000 hectares. Core restoration area. 110,000+ animals.', sz: 14 },
  { name: 'Mount Gorongosa', coords: [34.07, -18.43] as [number, number], color: '#15803d', detail: '1,863m. Sky island. 3M+ trees planted. 868 coffee farming families. Water source for entire park.', sz: 12 },
  { name: 'Chitengo HQ', coords: [34.31, -18.98] as [number, number], color: '#B45309', detail: 'Park headquarters. Biodiversity Lab. Staff housing. Ranger base.', sz: 10 },
  { name: 'Muzimu Lodge', coords: [34.45, -18.85] as [number, number], color: '#A16207', detail: 'Luxury riverside lodge. Condé Nast Traveller "best in Africa."', sz: 8 },
  { name: 'Lake Urema', coords: [34.38, -18.87] as [number, number], color: '#0369A1', detail: 'Seasonal floodplain lake. Heart of ecosystem. Hippo, buffalo, waterbuck.', sz: 10 },
  { name: 'Rift Valley Floor', coords: [34.50, -19.10] as [number, number], color: '#047857', detail: 'Grasslands where herbivore recovery is most dramatic. Wildebeest, zebra, reedbuck.', sz: 10 },
  { name: 'Beira (nearest city)', coords: [34.87, -19.84] as [number, number], color: '#737373', detail: 'Sofala Province capital. Cyclone Idai devastation 2019. Port city.', sz: 8 },
]

const SOURCES = [
  'Gorongosa Restoration Project — aerial wildlife survey 2024 (110,000+ animals)',
  'BBVA Foundation Worldwide Award for Biodiversity Conservation (2024)',
  'Marc Stalmans, Scientific Director: "fewer than 10,000 large animals → more than 100,000"',
  'CBS 60 Minutes (2008, 2022) — Greg Carr interviews, park documentation',
  'Al Jazeera (2024) — Ravaged by civil war, how a national park was restored',
  'National Geographic — Gorongosa profiled as Last Wild Place',
  'Gregory C. Carr: $100M+ committed, $200M estimated over 40 years',
  'Gorongosa Coffee Project — 868 family farmers, shade-grown, reforestation',
  'E.O. Wilson Biodiversity Laboratory — species documentation, MSc programme',
]

export function TheGorongosaResurrectionContent() {
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
      const map = new mb.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/outdoors-v12', center: [34.35, -18.8], zoom: 9.5, interactive: true, attributionControl: false })
      mapRef.current = map
      map.addControl(new mb.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        MAP_MARKERS.forEach(m => {
          const el = document.createElement('div')
          el.style.cssText = `width:${m.sz}px;height:${m.sz}px;border-radius:50%;background:${m.color};border:2px solid rgba(255,255,255,0.8);box-shadow:0 0 10px ${m.color}50;cursor:pointer;transition:transform 0.2s;`
          el.onmouseenter = () => { el.style.transform = 'scale(1.3)' }
          el.onmouseleave = () => { el.style.transform = 'scale(1)' }
          new mb.Marker(el).setLngLat(m.coords).setPopup(
            new mb.Popup({ offset: 10, maxWidth: '260px', closeButton: false }).setHTML(
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
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 151 · Conservation Economics</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Gorongosa<br />Resurrection</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">
            Civil war killed a million people and 95% of the wildlife. One man spent $100 million. Nature did the rest. Ten thousand animals became 110,000. Six lions became two hundred. The most dramatic wildlife recovery story in modern conservation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 110, s: 'k+', l: 'animals recovered' },
              { n: 35, s: '×', l: 'lion population increase' },
              { n: 1800, s: '', l: 'employees (99% mozambican)' },
              { n: 100, s: 'M+', l: '$ invested by carr' },
              { n: 400, s: 'k', l: 'hectares protected' },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} />{k.s}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, #047857 0%, transparent 50%)' }} />
      </section>

      {/* EPIGRAPH */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-14 md:py-20">
          <blockquote className="font-serif text-[20px] md:text-[26px] italic leading-[1.5] text-[#0a0a0a]">
            When I first came here in 2004, I could drive around with my Mozambican friends all day long, and if we were lucky maybe we&rsquo;d see one baboon, or one warthog. Now we drive around and it&rsquo;s an ocean of wildlife. Come around the corner, there&rsquo;s a herd of elephants. Go the other direction, there&rsquo;s some lion cubs. Ten thousand waterbuck. And I say to myself: you know what? Nature can rebound.
          </blockquote>
          <p className="text-[11px] text-[#a3a3a3] mt-4">Greg Carr, 60 Minutes, 2022</p>
        </div>
      </section>

      {/* MAP */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Landscape</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Central Mozambique. The Rift Valley. A million acres.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Gorongosa sits where Africa&rsquo;s Great Rift Valley meets the Mozambican coast. Lake Urema floods and retreats with the seasons, creating one of the most productive ecosystems in southern Africa. Mount Gorongosa rises 1,863 metres above the valley floor — a sky island whose rainforest feeds every river in the park. The fundamentals were intact: rivers flowing, soil alive, grass growing. All that was missing was the animals.</p>
        <div ref={mapContainer} style={{ width: '100%', height: 480, borderRadius: 8, overflow: 'hidden', background: '#e8e8e8' }} />
      </div></section>

      {/* TIMELINE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Arc</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">From Eden to silence to ocean of wildlife. Sixty-five years.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Two wars, a cyclone, a pandemic, and an insurgency. Any one of them could have ended the story. None of them did. The fundamentals — intact habitat, flowing rivers, fertile soil — survived every human catastrophe. When the killing stopped, nature knew what to do. The question was never whether Gorongosa could recover. It was whether anyone would give it the chance.</p>
        <DestructionRecoveryTimeline />
      </div></section>

      {/* SPECIES RECOVERY */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Numbers</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Every species that survived came back. Every species reintroduced stayed.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The formula was not complicated. Step one: remove 20,000 snares. Step two: reintroduce herbivores — 200 buffalo, 200 wildebeest, zebra. Step three: when you have enough herbivores, the carnivores will follow. Lions recovered on their own, from fewer than six to over 210. Wild dogs returned from zero. The 2024 aerial survey confirmed what the ground teams already knew: the herbivore population now exceeds pre-war numbers.</p>
        <SpeciesRecovery />
      </div></section>

      {/* INTEGRATED MODEL */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Four Pillars</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Conservation alone never works. The model integrates everything.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Gorongosa is not a park with a community programme bolted on. It is a development engine that happens to contain a national park. Conservation, science, community, and tourism form a single integrated system where each pillar reinforces the others. The 868 coffee farmers on Mount Gorongosa are reforesting the mountain that feeds the rivers that fill the lake that sustains the wildlife that attracts the tourists that fund the community programmes that employ the people who protect the forest. The circle is complete.</p>
        <IntegratedModel />
      </div></section>

      {/* STRESS TESTS */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Stress Tests</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">What tried to kill it. And didn&rsquo;t.</h2>
        <StressTests />
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 · The Uncomfortable Question</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">How many Greg Carrs exist?</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>The Gorongosa model works. The data is unarguable. Ten thousand animals became 110,000 in twenty years. Six lions became two hundred. A park that was silent after war is now so loud with wildlife that the 60 Minutes crew could barely record their interviews for the noise of hippos. The BBVA Foundation gave it the Worldwide Award for Biodiversity Conservation in 2024. National Geographic calls it one of the Last Wild Places.</p>
          <p>But the model has a name. Greg Carr. And the model has a number. $100 million, heading toward $200 million over 40 years. The current agreement expires in 2043. Carr contributes $6 million of the $30 million annual budget. The rest comes from donors, governments, and growing tourism revenue. When Carr was asked about sustainability, he dismissed the concern. He is confident the work will outlive him.</p>
          <p>Maybe. The 2018 extension to 2043 suggests the Mozambican government believes in the partnership. The coffee project generates real income for real families. Tourism is growing. The park employs 1,800 people — the largest employer in Sofala Province — and 99% of them are Mozambican. The infrastructure is being built. The science programme is training Mozambican scientists who will work across the country.</p>
          <p>But this is Mozambique. Cyclone Idai destroyed 100,000 homes in 2019. Cabo Delgado is burning in the north. The Renamo insurgency disrupted operations in 2013. Political instability is not a risk factor — it is the baseline condition. The model that works inside the park boundary requires stability that the country cannot always guarantee outside it.</p>
          <p>The deeper question is replicability. Africa has dozens of destroyed or degraded parks that could theoretically undergo the same restoration. The habitat fundamentals are often intact — rivers, soil, seeds. What is missing is a 20-year commitment of $5-10 million per year, a government willing to sign a partnership agreement, and a funder who will absorb repeated shocks without flinching. Gorongosa proves the biology works. The question is whether the financing model can be systematised. African Parks is one answer — 23 parks across 13 countries, the management franchise model. But even African Parks depends on philanthropic funding.</p>
          <p>The pattern repeats: the conservation works. The economics don't scale. Not because the economics are wrong — a single lion generates $1 million in tourism over its lifetime — but because the plumbing between tourism revenue and conservation funding is broken. Until that plumbing is fixed, every Gorongosa will need a Greg Carr. And there are not enough Greg Carrs.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#047857' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">If you give nature a chance, with good protection, it can recover spectacularly. In the case of lions, when the project began there were less than 30 individuals. Today the population numbers more than 210.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Marc Stalmans, Scientific Director, Gorongosa Restoration Project</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">007 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">Go deeper.</h2>
        <div className="space-y-8">
          {[
            { to: 'The Conservation Playbook', link: '/data/the-conservation-playbook', insight: 'All five architectures compared. Gorongosa scored against Rwanda, Namibia, Lion Guardians, African Parks. What the successes share.' },
            { to: 'The Conservation Deficit', link: '/data/the-conservation-deficit', insight: 'The systemic view. $29.3B in tourism GDP, $1.1B in conservation funding, $4B shortfall. The plumbing that\'s broken.' },
            { to: 'The Rhino Underground', link: '/data/the-rhino-underground', insight: '2,000 rhino. One failed auction. The largest wildlife translocation in history. And the man who bred them just got arrested.' },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#047857' }}>
              <span className="text-[10px] text-[#34d399] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
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
          <p className="text-[12px] text-[#737373]">Research, visualisation &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
          <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
        </div>
      </div></section>
    </div>
  )
}
