'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
const DWLRouteMap = dynamic(() => import('@/components/maps/DWLRouteMap'), { ssr: false })
import ConnectedIntelligence from '@/components/data/ConnectedIntelligence'

const SOURCES = [
  'STiR Coffee & Tea — China 2024 tea exports: 374,100 MT, $1.42B revenue. Morocco 81,000 MT (+34.7%).',
  'Firsd Tea — Global Green Tea Report 2024: Morocco imports 74–80K MT Chinese green tea annually.',
  'Statista — Morocco remained China\'s largest tea export destination (2023): ~60K MT, 16% of exports.',
  'World\'s Top Exports — Global tea exports $7.55B (2024). China $1.42B (18.8%). Kenya #1 by volume.',
  'FAO IGG Tea / ITC — Global production 7.1M MT (2024). China 3.5M MT (49%). India 1.37M MT.',
  'STiR — Morocco imports 3× more Chinese tea than US + Canada combined (75K vs 25K MT).',
  'Trading Economics / UN COMTRADE — Morocco imports from China of tea: $178.9M (2023).',
  'Tea & Coffee Trade Journal — Global Tea Report 2024: Morocco 60K MT, Egypt 72K MT top African importers.',
  'China Tea Marketing Association — Morocco is gateway to N/W Africa, ~25% of China total tea exports.',
]

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function AnimCounter({ target, duration = 1800, suffix = '', decimals = 0 }: { target: number; duration?: number; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { const start = performance.now()
        const step = (now: number) => { const p = Math.min((now - start) / duration, 1); setVal(p * target); if (p < 1) requestAnimationFrame(step) }
        requestAnimationFrame(step); obs.disconnect()
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>
}

/* ── DATA ── */

const TIMELINE = [
  { year: '~2737 BCE', event: 'Legend: Emperor Shennong discovers tea when leaves blow into boiling water', era: 'origin' },
  { year: '~59 BCE', event: 'Earliest written record of tea preparation in China (Wang Bao\'s contract)', era: 'origin' },
  { year: '760 CE', event: 'Lu Yu writes Chá Jīng (The Classic of Tea) — first tea treatise', era: 'origin' },
  { year: '805', event: 'Japanese monks bring tea from China to Japan', era: 'spread' },
  { year: '~1600s', event: 'Dutch and Portuguese traders bring tea to Europe', era: 'spread' },
  { year: '1662', event: 'Catherine of Braganza introduces tea to English court', era: 'spread' },
  { year: '~1700s', event: 'Moroccan sultans receive Chinese gunpowder green tea as diplomatic gifts', era: 'morocco' },
  { year: '1854', event: 'Crimean War disrupts British tea supply; merchants redirect stock to Morocco', era: 'morocco' },
  { year: '1880s', event: 'Moroccan mint tea culture fully established across all social classes', era: 'morocco' },
  { year: '2015', event: 'Morocco lowers bulk tea import tariffs to 2.5%; raises packaged to 32.5%', era: 'morocco' },
  { year: '2016', event: 'Lichuan Jinli Tea (China) invests $9M in Moroccan tea packaging factory', era: 'morocco' },
  { year: '2024', event: 'Morocco imports 81,000 MT of Chinese tea — record. More than all of North America.', era: 'morocco' },
]

const TOP_EXPORTERS = [
  { name: 'China', value: 1.42, pct: 19, color: '#E63946' },
  { name: 'Sri Lanka', value: 1.16, pct: 15, color: '#2D6E4F' },
  { name: 'Kenya', value: 1.15, pct: 15, color: '#B45309' },
  { name: 'India', value: 0.83, pct: 11, color: '#5E60CE' },
  { name: 'Poland', value: 0.77, pct: 10, color: '#FCBF49' },
  { name: 'Others', value: 2.22, pct: 30, color: '#a3a3a3' },
]

const CHINA_DESTINATIONS = [
  { name: 'Morocco', mt: 81000, color: '#E63946', note: '#1. Gateway to West Africa.' },
  { name: 'Ghana', mt: 38622, color: '#B45309', note: '#2. Black + green blending.' },
  { name: 'Uzbekistan', mt: 27000, color: '#5E60CE', note: '#3. Daily green tea culture.' },
  { name: 'Mauritania', mt: 15000, color: '#047857', note: 'Ataya ceremony. Saharan ritual.' },
  { name: 'Senegal', mt: 12000, color: '#FCBF49', note: 'Attaya: 3 rounds, community.' },
  { name: 'Russia', mt: 16765, color: '#0369A1', note: '$3.50/kg. Black tea preference.' },
  { name: 'USA + Canada', mt: 25000, color: '#a3a3a3', note: 'Combined. Morocco imports 3× more.' },
]

const GLASSES = [
  { name: 'Glass 1', arabic: 'الكاس الأول', meaning: 'Bitter as life', desc: 'Strong, barely sweetened. The first glass teaches patience. The tea master pours from height — the higher the arc, the more the foam.' },
  { name: 'Glass 2', arabic: 'الكاس الثاني', meaning: 'Gentle as love', desc: 'More sugar. More mint. The edges soften. The conversation loosens. This is where the real business gets discussed.' },
  { name: 'Glass 3', arabic: 'الكاس الثالث', meaning: 'Sweet as death', desc: 'Maximum sugar. The sweetness is almost unbearable. To refuse the third glass is to insult the host. To accept is to accept life whole.' },
]

export function TheTeaRoadContent() {
  const h1 = useInView(); const h2 = useInView(); const h3 = useInView(); const h4 = useInView()
  const maxMT = 81000

  return (
    <div className="bg-white text-[#262626] pt-16">
      {/* HERO */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 171 · Cultural Intelligence · China &rarr; Morocco</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Tea<br />Road</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">Morocco imports more Chinese tea than all of North America combined. Eighty-one thousand metric tons in 2024 — a 35% surge that made a North African kingdom China&rsquo;s single largest tea customer on Earth. The gunpowder green that arrives at Moroccan ports gets blended with fresh mint and sugar, poured from height into small glasses, and served three times. Bitter as life, gentle as love, sweet as death.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ n: 81, s: 'K', l: 'MT Morocco imports (2024)', d: 0 }, { n: 7.55, s: 'B', l: '$ global tea exports 2024', d: 2 }, { n: 3.5, s: 'M', l: 'MT China produces (49%)', d: 1 }, { n: 7.1, s: 'M', l: 'MT world production 2024', d: 1 }].map(k => (
              <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} decimals={k.d} />{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE GLASSES */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Atay Ceremony</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Three glasses. One proverb. The whole arc of a life.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Moroccan tea is not a drink. It is a protocol. Gunpowder green from Zhejiang province meets fresh nana mint from the Mekn&egrave;s plateau. Sugar — always too much sugar, by European standards — completes the trinity. The pour is theatrical: from a metre high, the stream aerates the tea and builds the foam. Three glasses, each sweeter than the last, each carrying a line of the proverb that Moroccans know by heart. Ethiopia has <span className="underline underline-offset-2">its own three-cup ritual</span> — the buna ceremony — and the same unspoken rule: you cannot leave before the third.</p>
        <div ref={h1.ref} className="grid md:grid-cols-3 gap-6">
          {GLASSES.map((g, i) => (
            <div key={g.name} className="border border-[#e5e5e5] rounded-sm p-6 transition-all duration-700" style={{ opacity: h1.visible ? 1 : 0, transform: h1.visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${i * 150}ms` }}>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#2D6E4F] mb-2">{g.meaning}</p>
              <p className="font-serif text-[24px] italic text-[#0a0a0a] mb-1">{g.name}</p>
              <p className="text-[13px] text-[#525252] leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* CHINA DESTINATIONS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · Where China&rsquo;s Tea Goes</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Morocco buys three times more than America.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Africa is China&rsquo;s most important tea export destination by volume. Morocco alone takes 22% of all Chinese tea exports — 81,000 metric tons in 2024, up 34.7% from the previous year. The price is the lowest among China&rsquo;s African partners at $3.01/kg, because Morocco buys in bulk: raw gunpowder green, re-blended, re-packaged, and re-shipped to five neighbouring countries. Morocco is not just a customer. It is a distribution hub for Chinese green tea across West and North Africa — a gateway position it also plays in <span className="underline underline-offset-2">China&rsquo;s broader Belt &amp; Road investments</span> on the continent.</p>
        <div ref={h2.ref} className="space-y-4">
          {CHINA_DESTINATIONS.map((d, i) => (
            <div key={d.name} className="flex items-center gap-3 transition-all duration-600" style={{ opacity: h2.visible ? 1 : 0, transitionDelay: `${i * 70}ms` }}>
              <p className="text-[12px] text-[#737373] w-28 text-right flex-shrink-0">{d.name}</p>
              <div className="flex-1 h-10 bg-[#f0f0f0] rounded-sm overflow-hidden relative">
                <div className="h-full rounded-sm transition-all duration-1000 ease-out flex items-center px-3" style={{ width: h2.visible ? `${Math.max((d.mt / maxMT) * 100, 5)}%` : '0%', background: d.color, transitionDelay: `${i * 80}ms` }}>
                  <span className="text-[10px] text-white/90 whitespace-nowrap">{d.note}</span>
                </div>
              </div>
              <p className="text-[11px] text-[#525252] w-16 text-right">{(d.mt / 1000).toFixed(d.mt >= 10000 ? 0 : 1)}K MT</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* MAP: CHINA → MOROCCO → WEST AFRICA */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">The Tea Route</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-6">Zhejiang &rarr; Casablanca &rarr; West Africa</h2>
        <DWLRouteMap
          center={[20, 25]}
          zoom={2.3}
          height="520px"
          points={[
            { coords: [120.2, 30.3], label: 'Zhejiang (origin)', color: '#E63946', size: 8 },
            { coords: [-7.6, 33.6], label: 'Casablanca', color: '#2D6E4F', size: 8 },
            { coords: [-5.0, 34.0], label: 'Fez', color: '#2D6E4F', size: 5 },
            { coords: [-8.0, 31.6], label: 'Marrakech', color: '#2D6E4F', size: 5 },
            { coords: [-5.8, 35.8], label: 'Tangier', color: '#2D6E4F', size: 5 },
            { coords: [-0.2, 5.6], label: 'Accra (Ghana)', color: '#B45309', size: 6 },
            { coords: [-15.9, 18.1], label: 'Nouakchott (Mauritania)', color: '#047857', size: 6 },
            { coords: [-17.4, 14.7], label: 'Dakar (Senegal)', color: '#FCBF49', size: 6 },
            { coords: [3.0, 36.8], label: 'Algiers', color: '#5E60CE', size: 5 },
            { coords: [69.2, 41.3], label: 'Tashkent (Uzbekistan)', color: '#5E60CE', size: 5 },
          ]}
          lines={[
            { coords: [[120.2, 30.3], [100, 15], [70, 12], [50, 15], [30, 28], [-7.6, 33.6]], color: '#E63946', width: 3, label: 'China → Morocco (81K MT)' },
            { coords: [[-7.6, 33.6], [-0.2, 5.6]], color: '#B45309', label: 'To Ghana' },
            { coords: [[-7.6, 33.6], [-15.9, 18.1]], color: '#047857', label: 'To Mauritania' },
            { coords: [[-7.6, 33.6], [-17.4, 14.7]], color: '#FCBF49', label: 'To Senegal' },
            { coords: [[-7.6, 33.6], [3.0, 36.8]], color: '#5E60CE', label: 'To Algeria' },
            { coords: [[120.2, 30.3], [90, 38], [69.2, 41.3]], color: '#5E60CE', dashed: true },
          ]}
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {[{ c: '#E63946', l: 'China → Morocco (main route)' }, { c: '#2D6E4F', l: 'Morocco (hub)' }, { c: '#B45309', l: 'Ghana redistribution' }, { c: '#FCBF49', l: 'Senegal' }, { c: '#047857', l: 'Mauritania' }].map(k => (
            <div key={k.l} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: k.c }} /><p className="text-[10px] text-[#737373]">{k.l}</p></div>
          ))}
        </div>
      </div></section>

      {/* GLOBAL EXPORTERS */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · Global Tea Trade</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">$7.55 billion traded. China leads in value.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">China is the world&rsquo;s largest tea producer (3.5 million metric tons — 49% of global output) and second-largest exporter by volume behind Kenya. China dominates green tea exports at 87% of its shipments. Kenya, Sri Lanka, and India lead in black tea. The global tea trade reached $7.55 billion in 2024, down 7.4% from five years earlier — a market in consolidation, not decline, as producing countries increase domestic consumption.</p>
        <div ref={h3.ref} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {TOP_EXPORTERS.map((e, i) => (
            <div key={e.name} className="border border-[#e5e5e5] rounded-sm p-4 transition-all duration-500" style={{ opacity: h3.visible ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                <p className="text-[12px] font-medium text-[#0a0a0a]">{e.name}</p>
              </div>
              <p className="font-serif text-[28px] italic text-[#0a0a0a] leading-none">${e.value}B</p>
              <p className="text-[10px] text-[#a3a3a3] mt-1">{e.pct}% of global exports</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* TIMELINE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Timeline</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">From Shennong to the medina. Five thousand years of leaves.</h2>
        <div ref={h4.ref} className="relative pl-8 space-y-5 mt-10">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[#e5e5e5]" />
          {TIMELINE.map((t, i) => {
            const eraColor = t.era === 'origin' ? '#E63946' : t.era === 'spread' ? '#5E60CE' : '#2D6E4F'
            return (
              <div key={i} className="relative transition-all duration-500" style={{ opacity: h4.visible ? 1 : 0, transform: h4.visible ? 'translateX(0)' : 'translateX(-12px)', transitionDelay: `${i * 60}ms` }}>
                <div className="absolute -left-5 top-1 w-[10px] h-[10px] rounded-full border-2 bg-white" style={{ borderColor: eraColor }} />
                <p className="text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: eraColor }}>{t.year}</p>
                <p className="text-[13px] text-[#262626] leading-relaxed">{t.event}</p>
              </div>
            )
          })}
        </div>
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-8">005 · The Road</p>
          <div className="space-y-6 text-[15px] md:text-[16px] text-[#262626] leading-[1.8]">
            <p>Tea arrived in Morocco through diplomacy and war. In the 18th century, Moroccan sultans received gunpowder green tea as gifts from Chinese and European merchants. It remained a court luxury. Then the Crimean War of 1854 disrupted British tea supply chains, and merchants redirected stock to Moroccan ports at bargain prices. Within a generation, tea had migrated from palace to medina to village. By the 1880s, atay was universal across all social classes.</p>
            <p>What Morocco did with Chinese tea is alchemy. Gunpowder green — rolled into tight pellets in Zhejiang province — meets fresh spearmint from the Mekn&egrave;s plateau. Sugar is added in quantities that would alarm a European nutritionist. The mixture is brewed in a silver or steel teapot, poured from height to aerate, and served in small glasses — three rounds per sitting, each sweeter than the last.</p>
            <p>The ceremony is not optional. You do not arrive at a Moroccan home, shop, or office without being offered tea. To refuse is to refuse the relationship. To accept the third glass is to accept the host&rsquo;s blessing. The proverb — bitter as life, gentle as love, sweet as death — is not decoration. It is a map of the social contract.</p>
            <p>Morocco now imports 81,000 metric tons of Chinese green tea per year — more than all of North America combined. The price per kilo is the lowest among China&rsquo;s partners ($3.01), because Morocco buys raw bulk and adds value locally. Moroccan blenders re-package and re-ship Chinese tea to Ghana, Mauritania, Senegal, and Algeria, making Casablanca the de facto green tea distribution capital of Africa.</p>
            <p>In 2016, the Chinese company Lichuan Jinli Tea invested $9 million to build a packaging factory in Morocco — the first Belt and Road Initiative tea investment on the continent. The subsidiary, Cathaysian Tea Company, now ships its Le Mont Yoto brand across West Africa. The ancient road from Zhejiang to Marrakech is now an industrial corridor.</p>
            <p>The road is five thousand years old. The leaves are the same. The pour is the same. Only the names of the middlemen change.</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#2D6E4F' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">The first glass is bitter as life. The second is gentle as love. The third is sweet as death.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Moroccan proverb</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED MODULES */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-6">Continue Reading</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { href: '/stories/the-coffee-covenant', title: 'The Coffee Covenant', sub: 'Another ceremony, another commodity — Ethiopia\'s buna ritual and stolen genetics.' },
            { href: '/stories/spice-routes', title: 'The Spice Routes', sub: 'The maritime routes that carried tea, spices, and silk between continents.' },
            { href: '/stories/the-silk-road-into-africa', title: 'The Silk Road Into Africa', sub: 'Where China\'s ancient trade networks met the African continent.' },
            { href: '/stories/al-andalus', title: 'The Al-Andalus Corridor', sub: 'Morocco\'s gateway — Islamic Spain and the trade that shaped Maghreb culture.' },
          ].map(l => (
            <span key={l.href} className="block p-4 bg-[#fafafa] rounded-sm hover:bg-[#f0f0f0] transition-colors">
              <p className="font-serif text-[16px] italic text-[#0a0a0a] leading-tight mb-1">{l.title}</p>
              <p className="text-[10px] text-[#a3a3a3] leading-relaxed">{l.sub}</p>
            </span>
          ))}
        </div>
      </div></section>

      {/* SOURCES */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-12">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-4">Sources &amp; Attribution</p>
        <div className="space-y-1">
          {SOURCES.map((s, i) => <p key={i} className="text-[10px] text-[#a3a3a3] leading-relaxed">{s}</p>)}
        </div>
        <ConnectedIntelligence moduleId="the-tea-road" />
        <p className="text-[10px] text-[#a3a3a3] mt-6">&copy; Slow Morocco 2025. Module 171. Data compiled from CAPIAC, STiR, UN COMTRADE, ITC, FAO. Licensed under CC BY-NC-ND 4.0.</p>
      </div></section>
    </div>
  )
}
