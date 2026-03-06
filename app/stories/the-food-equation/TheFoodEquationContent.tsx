'use client'
import { AnimCounter, ImportWheel, YieldGap, TransformationCards, TrillionTarget } from './charts'

const SOURCES = [
  'FAO — Sub-Saharan Africa food imports $65B (2025 projection). Cereals $21.9B (33% of total).',
  'Brookings — "Strengthening Africa\'s food systems": $15B imports (2018) → $110B projected. 257M undernourished.',
  'WEF — "Tackling food security in Africa" (Jan 2025): Yields <25% potential. Production to decline 18% from climate.',
  'IFPRI — 2025 Global Food Policy Report: Import dependency rose 39% (1985-2000) → 46.6% (2016-2023).',
  'Malabo Montpellier Panel — MONEYWISE report: $77B/year needed to 2030 to transform food systems.',
  'African Exponent — "Top 10 Ag Countries" (May 2025): $189B gross production, $1T agribusiness by 2030.',
  'FAO Food Business MEA — SSA imports: cereals $21.9B, oils $8.5B, fish $6.2B, sugar $5.1B.',
  'AUDA-NEPAD — Africa spent $43B on food imports (2019), projected $90B by 2030.',
  'allAfrica — Rwanda food balance: 79% self-sufficiency, 56% consumed is imported. Rice factories at 35% capacity.',
  'Morocco Plan Maroc Vert / Génération Green: $10B+ invested, output +40%, exports $6.5B.',
]

export function TheFoodEquationContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">
      {/* HERO */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 158 · Africa Progression</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Food<br />Equation</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">Africa owns 60% of the world&rsquo;s uncultivated arable land but spends $65 billion importing food it could grow. Crop yields run at less than 25% of their potential. The continent that should feed the world can barely feed itself — not because of scarcity, but because of underinvestment.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ n: 65, s: 'B', l: '$ food imports (SSA)' }, { n: 257, s: 'M', l: 'people undernourished' }, { n: 60, s: '%', l: 'arable land uncultivated' }, { n: 1, s: 'T', l: '$ agribusiness target 2030' }].map(k => (
              <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} />{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPORT WHEEL */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Import Bill</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">$65 billion a year. On food Africa could grow.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Sub-Saharan Africa&rsquo;s food import bill is projected to reach $65 billion in 2025. Cereals alone — wheat, rice, barley — account for $21.9 billion, one-third of the total. The continent has 800 million hectares of land ideal for rain-fed agriculture. It has the water, the sunlight, and the labour force. What it lacks is the infrastructure to connect farms to markets, the investment to close the yield gap, and the processing capacity to add value before export. Africa exports raw cocoa and imports finished <span className="underline underline-offset-2">chocolate</span>. Exports raw coffee and imports instant. The value-addition gap is the food equation&rsquo;s most expensive variable.</p>
        <ImportWheel />
      </div></section>

      {/* YIELD GAP */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Yield Gap</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">African rice yields are half of Asia&rsquo;s. A quarter of North America&rsquo;s.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Typical African crop yields are less than 25% of what they could be with available technology and practices. African rice yields average 2.2 tonnes per hectare versus 4.7 in Asia and 8.5 in North America. Maize: 1.8 versus 5.2 and 10.5. The gap is not genetic — the same varieties planted in different conditions produce dramatically different results. The gap is irrigation (only 6% of African cropland is irrigated versus 40% in Asia), fertiliser (Africa uses 17kg/hectare versus a world average of 135kg), mechanisation, extension services, and market access. Closing even half this gap would transform the continent&rsquo;s food security.</p>
        <YieldGap />
      </div></section>

      {/* TRANSFORMATIONS */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Models</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Six countries. Six different paths to food sovereignty.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Morocco invested $10 billion through Plan Maroc Vert and boosted agricultural output by 40%, turning the kingdom into a berry-and-tomato export powerhouse shipping $6.5 billion annually. Egypt is reclaiming desert with a $6 billion expansion targeting 75% wheat self-sufficiency. Ethiopia has the agency but conflict keeps disrupting progress. Rwanda produces 79% of its food but still imports 56% of what it consumes — the paradox of industrial ambition outpacing agricultural capacity. Nigeria is trying a market-led approach through fintech commodity exchanges. Côte d&rsquo;Ivoire offers a model where industry funds its own agricultural research. No single model works everywhere. But the evidence is clear: policy commitment works.</p>
        <TransformationCards />
      </div></section>

      {/* TRILLION TARGET */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Opportunity</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">The $1 trillion question.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Africa&rsquo;s agribusiness sector is projected to reach $1 trillion by 2030. Current gross production is $189 billion. The food economy employs 60% of the workforce but contributes only 20% of GDP — an enormous productivity gap that represents both the problem and the opportunity. Food processing accounts for less than 1% of Africa&rsquo;s global manufacturing. Yet in Nigeria and Niger, food processing already accounts for half of all manufacturing jobs. The Malabo Montpellier Panel estimates $77 billion per year is needed to 2030. The return: food security for 1.5 billion people, millions of jobs, and a continent that feeds itself.</p>
        <TrillionTarget />
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Story</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">The continent that should feed the world imports its dinner.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>The arithmetic is brutal. Africa holds 60% of the world&rsquo;s uncultivated arable land. It has the youngest agricultural workforce on Earth. It receives more sunshine than any other continent. And it spends $65 billion a year importing food it could grow — a bill projected to reach $110 billion within the decade. The gap between what Africa produces and what it consumes is not a resource problem. It is the most expensive infrastructure failure on the planet.</p>
          <p>The yield gap tells the story in one number. African rice yields average 2.2 tonnes per hectare. Asian yields are 4.7. North American yields are 8.5. The same crop, the same biology, four times the output. The difference is irrigation (6% of African farmland versus 40% in Asia), fertiliser (17 kg per hectare versus 135 kg globally), mechanisation, storage, roads, and extension services. Each missing input compounds the others. A farmer with better seed but no irrigation produces slightly more. A farmer with irrigation, seed, fertiliser, storage, and a road to market produces four times more.</p>
          <p>Morocco is the proof. Plan Maroc Vert invested over $10 billion and increased agricultural output by 40%. The kingdom now exports $6.5 billion in agricultural products — berries to British supermarkets, tomatoes to Spanish tables, citrus across Europe. Drip irrigation transformed arid regions into export orchards. Morocco did not have better land than its neighbours. It had better policy.</p>
          <p>The food import dependency creates a cascading vulnerability. When Russia invaded Ukraine, wheat prices spiked globally. Africa, which imports one-third of its wheat from Russia and Ukraine, faced immediate food security crises across dozens of countries. The dependency is not just economic — it is geopolitical. A continent that cannot feed itself cannot be sovereign. Every dollar spent importing food that could be grown locally is a dollar of national security leaked to the global market.</p>
          <p>The $1 trillion agribusiness target by 2030 is not fantasy. The demand is guaranteed — the population is doubling, urbanisation is accelerating, diets are diversifying, and middle classes are growing. The question is whether that demand is met by African farmers or by importers. Food processing alone could generate millions of jobs — it already accounts for half of manufacturing employment in Nigeria and Niger. But less than 1% of African agricultural output is processed before export. The continent sells raw cocoa at $2,500 a tonne and buys back chocolate at $25,000 a tonne. The value-addition gap is where the money is.</p>
          <p>The food equation has the same structure as every other Africa progression story: the resources exist, the demand exists, the potential is documented beyond dispute, and the gap between potential and reality is a function of investment, infrastructure, and policy. What Morocco has done with berries, what Kenya has done with horticulture, what Ethiopia was doing with coffee before conflict intervened — these are models, not exceptions. The equation balances when the investment arrives. It does not balance by itself.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[40vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#D97706' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">Africa exports raw cocoa at $2,500 a tonne and buys back chocolate at $25,000 a tonne. The value-addition gap is where the money is.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Slow Morocco analysis</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">006 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] italic text-white leading-[1.05] mb-10">Go deeper.</h2>
        <div className="space-y-6">
          {[
            { to: 'The Demographic Dividend', link: '/data/the-demographic-dividend', note: 'Population doubles by 2050. Food demand triples. The demographic arithmetic makes the food equation urgent.' },
            { to: 'The Infrastructure Revolution', link: '/data/the-infrastructure-revolution', note: 'Roads, cold chains, ports. The infrastructure gap is the food gap. You cannot sell what you cannot move.' },
            { to: 'The Energy Paradox', link: '/data/the-energy-paradox', note: 'Irrigation needs power. Processing needs power. The energy equation and the food equation are the same equation.' },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6" style={{ borderColor: '#D97706' }}>
              <span className="text-[10px] text-[#fbbf24] uppercase tracking-[0.1em] underline font-semibold">{c.to}</span>
              <p className="text-[13px] text-white/50 leading-relaxed max-w-[540px] mt-1.5">{c.note}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* SOURCES */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">{SOURCES.map((s, i) => <p key={i} className="text-[11px] text-[#525252]">{s}</p>)}</div>
        <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[#e5e5e5]">
          <p className="text-[12px] text-[#737373]">Research, visualisation &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
          <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
        </div>
      </div></section>
    </div>
  )
}
