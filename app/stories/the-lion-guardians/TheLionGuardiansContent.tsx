'use client'

import { useEffect, useRef } from 'react'
import {
  useInView, AnimCounter, FadeIn,
  Timeline, KillingInversion, EcosystemZones,
  GuardianRoles, KenyaLions, ConflictEconomics,
} from './charts'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const MAP_MARKERS = [
  { name: 'Amboseli National Park', coords: [37.25, -2.65] as [number, number], color: '#047857', detail: '392 km². Famous for elephants and Kilimanjaro. Maasai evicted 1974. Lions move between park and community rangelands.', sz: 14 },
  { name: 'Tsavo West NP', coords: [38.2, -3.0] as [number, number], color: '#047857', detail: '9,065 km². Kenya\'s largest lion population. Connected to Amboseli via Chyulu corridor.', sz: 12 },
  { name: 'Chyulu Hills NP', coords: [37.65, -2.55] as [number, number], color: '#047857', detail: '741 km². Where Hazzah lived with Mbirikani Maasai. Volcanic hills. Critical corridor link.', sz: 10 },
  { name: 'Selenkay Conservancy', coords: [37.15, -2.45] as [number, number], color: '#B45309', detail: 'North of Amboseli. Saitoti\'s first Guardian patrol area. First lioness collared here.', sz: 8 },
  { name: 'Eselenkei Group Ranch', coords: [37.0, -2.35] as [number, number], color: '#15803d', detail: 'Active Guardian zone. High human-wildlife conflict. Warriors intervene in lion hunts.', sz: 8 },
  { name: 'Olgulului Group Ranch', coords: [37.2, -2.85] as [number, number], color: '#15803d', detail: 'Surrounds Amboseli NP. Expanded Guardian coverage 2013. South to Tanzania border.', sz: 10 },
  { name: 'Mbirikani Group Ranch', coords: [37.6, -2.7] as [number, number], color: '#15803d', detail: 'Adjacent to Chyulu Hills. Initial research site. Core Guardian operations.', sz: 10 },
  { name: 'Kuku Group Ranch', coords: [37.4, -2.95] as [number, number], color: '#15803d', detail: 'Southern edge. Tanzania border. Lions dispersing through Guardian-protected corridors.', sz: 8 },
  { name: 'Lion Guardians Camp', coords: [37.3, -2.52] as [number, number], color: '#B45309', detail: 'Hilltop camp near Amboseli. Training centre built on Maasai-donated land. HQ and operations base.', sz: 10 },
  { name: 'Mount Kilimanjaro', coords: [37.35, -3.07] as [number, number], color: '#737373', detail: '5,895m. Africa\'s highest peak. Defines the southern horizon of the Amboseli ecosystem.', sz: 12 },
]

const SOURCES = [
  'Lion Guardians — Programme data, annual reports (2007–2024), About Us page',
  'Hazzah, L. et al. — Efficacy of two lion conservation programmes in Maasailand, Kenya. Conservation Biology (2014)',
  'Dolrenry, S. et al. — Rapid recovery of lion populations in the Amboseli ecosystem. Lion Guardians monitoring data.',
  'Kenya Wildlife Service / WRTI — Kenya National Wildlife Census (2025). 2,512 lions.',
  'Born Free — Pride of Amboseli programme: predator-proof bomas, human-wildlife conflict data',
  'bioGraphic / BBC — "Lion Guardians" feature. Saitoti\'s story. Naming as cultural transformation.',
  'CNN Heroes (2014) — Leela Hazzah. "When I first moved here, I never heard lions roaring."',
  'International Wildlife Coexistence Network — Lion Guardians programme evaluation',
  'Funston, Lindsey et al. (2025) — Range-wide assessment of threats to African lion. Global Ecology & Conservation.',
  'On Wisconsin Magazine / Daily Beast — Extended profiles of Lion Guardians operations',
]

export function TheLionGuardiansContent() {
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
      const map = new mb.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/outdoors-v12', center: [37.35, -2.7], zoom: 9.5, interactive: true, attributionControl: false })
      mapRef.current = map
      map.addControl(new mb.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        MAP_MARKERS.forEach(m => {
          const el = document.createElement('div')
          el.style.cssText = `width:${m.sz}px;height:${m.sz}px;border-radius:50%;background:${m.color};border:2px solid rgba(255,255,255,0.8);box-shadow:0 0 10px ${m.color}50;cursor:pointer;transition:transform 0.2s;`
          el.onmouseenter = () => { el.style.transform = 'scale(1.4)' }
          el.onmouseleave = () => { el.style.transform = 'scale(1)' }
          new mb.Marker(el).setLngLat(m.coords).setPopup(
            new mb.Popup({ offset: 12, maxWidth: '260px', closeButton: false }).setHTML(
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
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 148 · Amboseli-Tsavo, Kenya</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Lion<br />Guardians</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">
            In 2006, the Maasai of Amboseli speared or poisoned 42 lions. Today, the warriors who once killed them track them by name, collar them in the dark, and intercept hunting parties. Lion killing has dropped 99%. The population has tripled. The idea came from the warriors themselves.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 99, s: '%', l: 'reduction in lion killing' },
              { n: 65, s: '+', l: 'guardians active' },
              { n: 1, s: 'M', l: 'acres patrolled' },
              { n: 2512, s: '', l: 'lions left in kenya' },
              { n: 2006, s: '', l: 'founded amboseli' },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none">
                  {k.n >= 100 ? <AnimCounter target={k.n} /> : k.n}{k.s}
                </p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #B45309 0%, transparent 50%), radial-gradient(circle at 75% 40%, #047857 0%, transparent 50%)' }} />
      </section>

      {/* EPIGRAPH */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#B45309' }}>
            <p className="font-serif text-[20px] md:text-[26px] italic leading-[1.5] text-[#0a0a0a]">
              As a child in Egypt, Leela Hazzah lay on the rooftop listening for lions. Her father had heard them roaring from the same roof as a boy. By the time she was born, they were extinct. &ldquo;That was the moment I decided what I wanted to do,&rdquo; she said. &ldquo;I wanted to hear lions roaring.&rdquo;
            </p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Dr Leela Hazzah, Co-Founder, Lion Guardians</p>
          </blockquote>
        </div>
      </section>

      {/* MAP */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Landscape</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Kilimanjaro to Tsavo. One million acres. Forty-five warriors.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The Amboseli-Tsavo ecosystem spans from Mount Kilimanjaro to the Chyulu Hills and on to Tsavo West &mdash; a critical corridor connecting Kenya&rsquo;s largest remaining lion population with the lions of Tanzania. Most of this land is not national park. It is Maasai community rangelands &mdash; group ranches where pastoralists share space with predators. This is where the Guardians work. Not in the park, but in the land the park depends on.</p>
        <div ref={mapContainer} style={{ width: '100%', height: 480, borderRadius: 8, overflow: 'hidden', background: '#f0f0f0' }} />
        <div className="flex gap-4 flex-wrap mt-4">
          {[['National Park', '#047857'], ['Conservancy / Camp', '#B45309'], ['Guardian Zone', '#15803d']].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /><span className="text-[9px] uppercase tracking-wider text-[#737373]">{l}</span></div>
          ))}
        </div>
      </div></section>

      {/* 002 ECOSYSTEM */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Ecosystem</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Three parks. Five group ranches. One connected system.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The national parks are islands. Lions do not stay within park boundaries &mdash; they move into community lands to hunt, breed, and establish new territories. A lion born in Amboseli National Park may die on Eselenkei Group Ranch, speared by a warrior defending his last three cows. The Guardian programme exists in the space between park and pasture, where conservation theory meets the reality of a family that just lost its livelihood.</p>
        <EcosystemZones />
      </div></section>

      {/* 003 TIMELINE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Arc</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">2006: 42 lions killed. 2024: zero.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The idea came from the warriors themselves. After a year living among the Mbirikani Maasai, Hazzah asked lion killers what could stop the killing. They told her: we are the best people to protect lions, because we are the ones who find them. We are young, we are fit, and we know how to track. Give us a reason to protect them instead of killing them.</p>
        <Timeline />
      </div></section>

      {/* 004 INVERSION */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Inversion</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">As the number of guardians rose, the number of kills collapsed.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The chart reads upside down by design. Above the line: lions killed (red, declining). Below the line: active guardians (green, rising). The two curves mirror each other almost exactly. This is not correlation. It is causation. The guardians do not patrol passively &mdash; they actively intercept hunting parties, calm angry warriors, and recover lost livestock before frustration turns to spears.</p>
        <KillingInversion />
      </div></section>

      {/* 005 ROLES */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Transformation</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Same skills. Same courage. Different target.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The programme&rsquo;s genius is that it does not ask warriors to abandon their culture. It redirects it. The same tracking skills used to hunt lions now track them for protection. The prestige of killing a lion is replaced by the prestige of naming one, knowing its movements, and being responsible for its survival. Many guardians arrived illiterate. They learned to read and write alongside GPS, radio telemetry, and data collection. Some have earned master&rsquo;s degrees.</p>
        <GuardianRoles />
      </div></section>

      {/* NAMING ESSAY */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 · The Act of Naming</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">They no longer kill for a lion name. They give one.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>In Maasai tradition, a warrior who kills a lion earns a lion name &mdash; a title carried for life. Kamunu Saitoti killed five lions and earned the name Meiteranga: &ldquo;The one who was first.&rdquo; It was the highest honour of his age group.</p>
          <p>When Saitoti became a Lion Guardian in 2007, the programme asked him to track a lion instead of kill one. On his first patrol in Selenkay Conservancy, he chose to follow a particular lioness. One night, he and Stephanie Dolrenry darted her, fitted a radio collar, and released her. He named her. The act of naming became his new lion name.</p>
          <p>This was more important than the organisers had imagined. In Maasai culture, naming creates ownership. A named lion belongs to someone. It has a story. When that lion dies, people mourn. The programme now reports that Maasai communities actively grieve the loss of named lions &mdash; a fundamental reversal from a culture that celebrated their killing.</p>
          <p>LINC &mdash; the Lion Identification Network of Collaborators &mdash; launched in 2014 uses facial recognition technology to identify individual lions from photographs. Each lion in the Amboseli database has a name, a known history, and a guardian who considers it their responsibility. The warriors carry GPS units and radio telemetry antennas where they once carried only spears. But the tracking skills are the same. The courage is the same. Only the purpose has changed.</p>
          <p>Saitoti now coordinates three regional Guardian teams across Kenya. He has not killed a lion in eighteen years. When asked about it, he says he has lost nothing. He has gained a different kind of prestige &mdash; one that does not require anything to die.</p>
        </div>
      </div></section>

      {/* 007 ECONOMICS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">007 · The Economics</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">A cow is worth $400. A lion is worth nothing &mdash; or $1 million. Depends who you ask.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The fundamental tension: lions cost communities money. They kill livestock. A warrior who loses three cows to a lion has lost $1,200 &mdash; possibly months of family income. Tourism generates millions from lions in Amboseli, but almost none of that money reaches the group ranches where lions actually live. The Guardian programme works because it provides the one thing the tourism economy does not: direct, immediate, personal benefit from lion survival. A $100/month salary is not much. But it is the first paid employment many warriors have ever had.</p>
        <ConflictEconomics />
      </div></section>

      {/* 008 KENYA CONTEXT */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">008 · The National Picture</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">2,512 lions left in Kenya. One ecosystem is growing.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Kenya&rsquo;s 2025 national wildlife census counted 2,512 lions. Large herbivores have fallen 70&ndash;90% since the late 1970s, and as prey species decline, lions decline with them. Most ecosystems show stable or declining populations. The Amboseli-Tsavo corridor is one of the only areas where the lion population is actively increasing. The difference: Lion Guardians, Big Life Foundation, Born Free, and community engagement in the spaces between parks.</p>
        <KenyaLions />
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#047857' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">
              The programme did not ask the Maasai to stop being warriors. It asked them to redirect the courage. The same skills that located a lion for killing now locate it for protection. The same prestige that came from a spear now comes from a radio collar. Nothing was taken away. Something was added: a salary, a purpose, and a lion with a name.
            </p>
          </blockquote>
        </div>
      </section>

      {/* 009 THE MODEL */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">009 · The Transferable Model</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">Ruaha. Laikipia. Beyond.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>The Lion Guardians model has been deliberately designed to transfer. The core mechanics &mdash; recruit those closest to the conflict, train them, pay them, give them ownership &mdash; are not Maasai-specific. They are human-specific. The 2015 certification of Ruaha in Tanzania proved it works across ethnic groups and geographies. The 2014 Training Programme systematised the approach for new sites.</p>
          <p>But transferability has limits. The model depends on a culture where individual warriors have identifiable roles and community standing. It depends on a species charismatic enough to generate donor funding. And it depends on continued external financing &mdash; the $100/month Guardian salary comes from international donors, not from the tourism economy it sustains.</p>
          <p>This is the fragility. Lion Guardians works because it bridges the gap between wildlife value and community benefit. But the bridge itself is funded by charity, not by the system it protects. If the Amboseli tourism industry returned even 5% of its revenue to the group ranches where lions live, the Guardian salaries would be self-sustaining. As of 2025, it does not.</p>
          <p>The programme has saved more lions per dollar spent than almost any conservation intervention measured. The cost of one Guardian &mdash; approximately $1,200 per year &mdash; protects an area where a single lion is worth over $1 million in tourism revenue over its lifetime. The return on investment is approximately 800:1. But returns are captured by lodges and park fees. The investment comes from donors in the United States and Europe. The economics are inverted.</p>
        </div>
      </div></section>

      {/* CONNECTED INTELLIGENCE */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">010 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern.</h2>
        <div className="space-y-10">
          {[
            { to: 'The Conservation Deficit', link: '/data/the-conservation-deficit', insight: 'The systemic view. $29.3B in tourism GDP, $1.1B in conservation funding, $4B annual shortfall. The architecture that doesn\'t exist. Lion Guardians is the island that proves the architecture is possible.' },
            { to: 'The Gorilla Dividend', link: '/data/the-gorilla-dividend', insight: 'Rwanda\'s gorillas: $1,500 permits, 10% to communities, former poachers as trackers. Same structural logic as Lion Guardians — different species, different country, same result. The only two large carnivore programmes showing population growth.' },
            { to: 'The Lion Economics', link: '/data/the-lion-economics', insight: 'The continental picture: $20.5B safari market, 200,000→23,000 lion decline, $619M funding gap. The Amboseli story is one of the very few counterexamples.' },
            { to: 'The Last Lions', link: '/data/the-last-lions', insight: 'The Barbary lion went extinct because no one built an economic model around keeping it alive. The Atlas Mountains had warriors too. They did not have Guardians.' },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#B45309' }}>
              <span className="text-[10px] text-[#fbbf24] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
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
