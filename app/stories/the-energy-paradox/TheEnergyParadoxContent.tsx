'use client'

import { useInView, AnimCounter, ParadoxChart, FlagshipProjects, CapacityGrowth, OffGridRevolution } from './charts'

const SOURCES = [
  'UN Economic Commission for Africa — "Africa leads in energy potential but trails in investment" (Jul 2025): 60% solar potential, <3% financing',
  'IEA — Financing Electricity Access in Africa (2025): 600M without access, $15B/yr needed, Mission 300',
  'ISS African Futures — Energy Profile: 3.3% renewables (2023), 80% solar/wind in 6 countries, import dependency',
  'IRENA — Renewable Capacity Statistics 2025: 71+ GW installed, hydro 39.3 GW, solar 15.4 GW, wind 9.2 GW',
  'BloombergNEF — Africa Power Transition Factbook 2024: $15B record investment, 5.4 GW added 2023, 2.3% global share',
  'AfDB — Desert to Power Initiative: 10 GW solar target, 250M people, 11 Sahel countries',
  'CSIS — "Achieving Universal Energy Access in Africa" (Feb 2025): South Africa load shedding, Kenya geothermal, McKinsey $400B estimate',
  'Energy in Africa — Renewable energy capacity & trends 2025: Kenya 985 MW geothermal, Morocco Noor 510 MW, Egypt 11.8 GW',
  'Empower Africa — "600 Million Still Lack Electricity" (Sep 2025): Mission 300, mini-grid growth, $160B annual gap',
  'Global Solar Council — Africa Market Outlook 2026-2029: 4.5 GW solar added in 2025 (+54%), 31.5 GW by 2029',
  'Frontiers in Energy Research — Power generation overcapacity paradox (Dec 2025): grid investment gap, IPP model',
  'Afripoli — "Energising Africa" (Sep 2025): only 2% of global RE investment, 10 TW solar potential, 461 GW wind potential',
]

export function TheEnergyParadoxContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">

      {/* HERO */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 157 · Africa Progression</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Energy<br />Paradox</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">
            Africa holds 60% of the world&rsquo;s best solar resources and attracts less than 3% of global energy financing. 600 million people lack electricity. The continent that could power the planet can&rsquo;t power itself. But the numbers are starting to move — and the path may not run through the grid at all.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 600, s: 'M', l: 'people without electricity', d: 0 },
              { n: 60, s: '%', l: 'of world\'s solar potential', d: 0 },
              { n: 71, s: 'GW', l: 'renewable capacity installed', d: 0 },
              { n: 3, s: '%', l: 'of global energy financing', d: 0 },
              { n: 15, s: 'B', l: '$ record RE investment (2023)', d: 0 },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} decimals={k.d} />{k.s}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PARADOX */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Paradox</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Enough sun to power the planet. Not enough power for half its people.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Africa receives more solar irradiance than any continent — over 2,000 kWh per square metre per year across 85% of its territory, far exceeding Europe and North America. IRENA estimates Africa could generate over 10 terawatts of solar power annually. The continent has 350 GW of untapped hydropower (only 5-6% harnessed), 461 GW of wind potential (2% utilised), and the East African Rift holds 15 GW of geothermal reserves. Yet 600 million Africans have no electricity at all. Forty-eight sub-Saharan countries together produce roughly the same electricity as Spain, population 45 million. The paradox is not a resource problem. It is a financing, infrastructure, and governance problem.</p>
        <ParadoxChart />
      </div></section>

      {/* FLAGSHIP PROJECTS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Flagships</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Eight projects that prove Africa can build at scale.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Morocco&rsquo;s Noor Ouarzazate is one of the world&rsquo;s largest <span className="underline underline-offset-2">concentrated solar</span> plants — 580 MW powering two million people. Egypt&rsquo;s Benban Solar Park is a 1.65 GW photovoltaic installation in the Aswan Desert. Ethiopia&rsquo;s Grand Renaissance Dam, self-funded at $5 billion, is the third-largest hydroelectric facility on Earth. Kenya generates nearly half its electricity from the Olkaria geothermal complex in the Rift Valley. South Africa&rsquo;s Kenhardt combines 540 MW of solar with 1.14 GWh of battery storage. And the AfDB&rsquo;s Desert to Power initiative aims to generate 10 GW of solar across 11 Sahel countries, reaching 250 million people. The technology works. The projects work. The challenge is replication at the speed the population demands.</p>
        <FlagshipProjects />
      </div></section>

      {/* CAPACITY GROWTH */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Growth</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">24 GW to 71 GW in a decade. Still less than 2% of global capacity.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Africa&rsquo;s renewable energy capacity has nearly tripled since 2010, reaching over 71 GW by 2024. Solar is the fastest-growing source — from negligible levels to 19 GW, with 4.5 GW added in 2025 alone (a 54% year-on-year increase). Wind reached 10 GW, concentrated in Morocco, South Africa, Kenya, and Ethiopia. Hydropower remains the backbone at 39 GW, with GERD significantly boosting the total. Investment hit a record $15 billion in 2023, more than double 2022 levels. But Africa still contributes less than 2% of global clean energy capacity. The Africa Renewable Energy Initiative targets 300 GW by 2030 — the current trajectory falls far short.</p>
        <CapacityGrowth />
      </div></section>

      {/* OFF-GRID REVOLUTION */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Leapfrog Path</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">The grid can&rsquo;t reach everyone. But the sun already does.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Just as Africa skipped landlines for mobile phones, it may skip centralised grids for distributed solar. Over 70 million Africans now rely on solar home systems and mini-grids — Africa accounts for 60% of the world&rsquo;s off-grid solar market. Solar panel costs have fallen 90% since 2010. In South Africa, load shedding drove private solar installations from 1.2 GW (2021) to 6.1 GW (2024) — a 73% growth rate in 2023 alone. In Nigeria, the payback on a $60 solar panel displacing diesel can be as quick as six months. Between 2020 and 2022, more than half of new electricity connections in sub-Saharan Africa came from off-grid systems. The question is whether decentralised solar can scale fast enough for the 600 million still waiting.</p>
        <OffGridRevolution />
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Equation</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">600 million people. 60% of the world&rsquo;s sunshine. 3% of the financing.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>The numbers define the paradox. Africa holds 60% of the world&rsquo;s best solar resources. It receives more annual sunshine than any continent. It has untapped hydropower that dwarfs what has been built, wind corridors along its coasts and mountains that remain largely unexploited, and geothermal reserves in the East African Rift that make Kenya the seventh-largest geothermal producer on Earth. And yet 600 million Africans — nearly half the continent&rsquo;s population — have no electricity. The 48 countries of sub-Saharan Africa collectively generate about as much power as Spain. Africa accounts for 80% of the global electricity access gap.</p>
          <p>This is not a resource problem. Africa could power itself many times over. It is a financing problem, a grid problem, and a governance problem. Only 2-3% of global renewable energy investment over the past two decades went to Africa. Only 3.3% of the continent&rsquo;s total energy production in 2023 came from renewables. Morocco imports 90% of its energy — making Noor Ouarzazate not just a climate project but an energy security imperative. By 2050, thirty-one African countries will import more than half their energy demand unless domestic renewables scale dramatically.</p>
          <p>The flagship projects prove what is possible. Morocco&rsquo;s Noor Ouarzazate complex — 580 MW of concentrated solar power with thermal storage — supplies electricity to over two million people. Egypt&rsquo;s Benban is one of the world&rsquo;s largest solar parks. Ethiopia&rsquo;s GERD, self-funded because no external financier would touch the Nile politics, is the third-largest hydroelectric facility globally. Kenya generates 45% of its electricity from geothermal, making it 90% renewable overall. These are not experiments. They are proven infrastructure operating at scale.</p>
          <p>But the acceleration is not happening fast enough. Africa added 5.4 GW of renewable capacity in 2023 — nearly four times the rate of 2018. Investment hit a record $15 billion. Solar added 4.5 GW in 2025, up 54%. These are real numbers, real momentum. But the Africa Renewable Energy Initiative targets 300 GW by 2030. Current installed capacity is 71 GW. The gap between trajectory and target is enormous, and the population is growing faster than the connections.</p>
          <p>The most interesting development is the distributed energy revolution happening outside the grid entirely. Over 70 million people now use solar home systems and mini-grids. Africa is 60% of the world&rsquo;s off-grid solar market. In South Africa, the catastrophic load shedding of 2022-23 — 332 days of power cuts in 2023 alone — triggered a private solar boom that took embedded generation from 1.2 GW to 6.1 GW in three years. In Nigeria, a $60 solar panel that displaces diesel pays for itself in six months. Cumulative solar panel imports from China to Africa exceeded 52 GW by September 2025. The economics have shifted. Solar is now the cheapest electricity source in most African contexts, undercutting diesel and often grid tariffs.</p>
          <p>The parallel to the tech leapfrog is exact. Just as Africa skipped landlines because mobile towers were cheaper and faster, it may skip centralised grids because distributed solar is cheaper and faster. Between 2020 and 2022, more than half of new electricity connections in sub-Saharan Africa came from off-grid systems. The IEA&rsquo;s pathway to universal access by 2035 allocates roughly equal investment to grid expansion ($7B/year), mini-grids ($5B/year), and solar home systems ($3B/year). The grid does not disappear. But it is no longer the only path — and for the 80% of the unelectrified who live in rural areas, it may not be the primary one.</p>
          <p>Morocco offers a model of what policy commitment looks like. The kingdom targets 52% renewable energy by 2030, has built one of the world&rsquo;s largest solar complexes, is developing green hydrogen for European export, and has positioned its energy infrastructure as an economic development tool rather than just a utility function. The Noor Ouarzazate complex does not just generate electricity — it generates geopolitical leverage, export revenue, and investor confidence. Energy infrastructure, like port infrastructure, is a tool for national positioning. Africa&rsquo;s energy transition is not just about lights. It is about whether the continent can convert its resource abundance into economic power, or whether it will remain — as the UN Economic Commission for Africa put it — a paradox of potential and neglect.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#D97706' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">Africa is not asking for help. It is offering answers. Energy is not just a public good. It is a driver of jobs, industry, and transformation.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Claver Gatete — UN Under-Secretary-General, Executive Secretary of ECA (Jul 2025)</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">006 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">Go deeper.</h2>
        <div className="space-y-8">
          {[
            { to: 'The Infrastructure Revolution', link: '/stories/the-infrastructure-revolution', insight: 'GERD and Hyphen appear in both stories — energy is infrastructure, and infrastructure is energy. The $2.5T pipeline of African megaprojects is inseparable from the energy equation.' },
            { to: 'The Tech Leapfrog', link: '/stories/the-tech-leapfrog', insight: 'The pattern repeats: where legacy infrastructure is absent, Africa builds something better. M-Pesa skipped banks. Distributed solar may skip the grid.' },
            { to: 'The Demographic Dividend', link: '/stories/the-demographic-dividend', insight: 'The population doubles by 2050. Every new person needs energy. The demographic arithmetic makes the energy paradox not an abstract challenge but an urgent countdown.' },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#D97706' }}>
              <span className="text-[10px] text-[#fbbf24] uppercase tracking-[0.1em] underline hover:no-underline font-semibold">{c.to}</span>
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
