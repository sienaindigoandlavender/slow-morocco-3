'use client'

import { useInView, AnimCounter, PriceLadder, SalaryGap, CommodityTable, EnforcementParadox } from './charts'

const SOURCES = [
  'Africa Center for Strategic Studies — Wildlife Poaching: Africa\'s Surging Trafficking Threat',
  'Lunstrum & Givá (2020) — What drives commercial poaching? From poverty to economic inequality',
  'Wildlife Justice Commission — rhino horn trade chain analysis, billion-dollar decade estimate',
  'Save the Rhino International — poaching statistics 2007-2025, DFFE data',
  'UNODC (2016, 2024) — World Wildlife Crime Report, IWT revenue estimates $7-23B/year',
  'TRAFFIC — illegal wildlife trade monitoring, commodity pricing',
  'PoachingFacts — price chains, poacher earnings, trafficking routes',
  'SANParks — Kruger anti-poaching expenditure, ranger dismissals 2025',
  'Dalberg (2012) — Fighting Illicit Wildlife Trafficking: rhino horn pricing',
  'ABC News (Aug 2025) — John Hume arrest, 55 charges, rhino horn trafficking syndicate',
]

export function ThePoachingEconomicsContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">

      {/* HERO */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 153 · Conservation Economics</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Poaching<br />Economics</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">
            A ranger earns $200 a month. A poacher earns $5,000 for one <span className="underline underline-offset-2">rhino horn</span>. The criminal syndicate that employs him earns $60,000 per kilogram. The consumer in Hanoi pays $400,000. The ranger is the only person in this chain who risks his life for no economic reward. The war on poaching is a war on poverty dressed up as a war on crime.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 60, s: 'k', l: '$/kg rhino horn (black market)' },
              { n: 200, s: '', l: '$/month ranger salary (avg)' },
              { n: 23, s: 'B', l: '$ illegal wildlife trade/year' },
              { n: 12, s: 'k+', l: 'rhinos killed since 2008' },
              { n: 5, s: '%', l: 'of retail reaches poacher' },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} />{k.s}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE LADDER */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Supply Chain</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Five levels. Five markups. All the risk at the bottom. All the profit at the top.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">A rhino horn passes through five levels between the animal and the consumer. At each level, the price increases and the risk decreases. The poacher who pulls the trigger receives 5-10% of the retail value and faces death or prison. The end consumer in Vietnam or China faces near-zero enforcement. This is not a supply chain — it is an extraction chain designed to separate risk from reward by geography and class.</p>
        <PriceLadder />
      </div></section>

      {/* SALARY GAP */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Salary Gap</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">One rhino horn equals 25 months of ranger salary.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The communities adjacent to Kruger National Park in Mozambique are among the poorest on earth. Over half the population lives on less than $1 a day. The ranger protecting their local park earns $200 a month if he is lucky. The poaching syndicate offers $5,000-$7,000 for a single horn — more money than his family will see in two years. In communities where 52% of poachers are unemployed, the calculation is not moral. It is mathematical.</p>
        <SalaryGap />
      </div></section>

      {/* COMMODITY TABLE */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Commodities</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Rhino horn, ivory, pangolin scales, lion bone, bushmeat. The catalogue.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The illegal wildlife trade is the fourth-largest international crime in the world, worth $7-23 billion per year depending on the estimate. Rhino horn is the most valuable per kilogram — more than gold, platinum, or diamonds. But in volume terms, ivory and pangolin scales drive the highest total value. Bushmeat, almost never quantified, feeds millions of families across central and west Africa and may extract more animals than all other trades combined.</p>
        <CommodityTable />
      </div></section>

      {/* ENFORCEMENT PARADOX */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Paradox</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">$74 million on anti-poaching. The rhinos still died.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Enforcement-led conservation has failed on its own terms. Kruger National Park spent $74 million on anti-poaching between 2017 and 2023 — helicopters, AI, sniffer dogs, armed rangers. The white rhino population still halved. Seven rangers were dismissed in 2025 for suspected collusion with poaching syndicates. The paradox is structural: the vast majority of arrests are ground-level poachers. Almost no mid-level or high-level traffickers have been convicted globally. The system punishes labour and ignores capital.</p>
        <EnforcementParadox />
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Argument</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">You cannot win a war on poverty with guns.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>The standard narrative frames poaching as a crime problem requiring a law enforcement solution. More rangers. More guns. More technology. More arrests. The evidence says this framing is wrong — not morally wrong, but empirically wrong. Kruger proves it. $74 million in enforcement spending did not prevent the rhino population from halving.</p>
          <p>The alternative framing is economic. Poaching is a labour market. The supply side is young men in communities with no employment, no alternatives, and proximity to high-value wildlife. The demand side is consumer markets in Vietnam and China where rhino horn is a status commodity. The intermediaries are organised crime networks that capture 90-95% of the value. The poacher is paid just enough to risk his life.</p>
          <p>From the Mozambican borderlands adjacent to Kruger, researchers have documented exactly what drives recruitment into poaching networks. It is not poverty in the abstract. It is economic inequality — the visible, daily gap between the wealth generated by wildlife tourism (lodges, flights, guides, rangers) and the poverty of communities who live beside the park but receive none of that revenue. A ranger earns $200 a month. The lodge visible from his village charges $500 per night. The syndicate offers $5,000 for a night's work.</p>
          <p>The programmes that actually reduce poaching do not add more enforcement. They close the economic gap. In Rwanda, 10% of gorilla permit revenue flows directly to communities. In Namibia, conservancy members receive dividends from tourism and hunting. Lion Guardians pay warriors $100 a month to protect the animals they used to kill. In Hluhluwe-iMfolozi, where poaching dropped 68% in 2025, the strategy combined dehorning (reducing the prize) with community investment (reducing the incentive).</p>
          <p>The deepest failure in anti-poaching strategy is that it arrests the wrong people. Ground-level poachers are the most expendable participants in the chain. For every one arrested, another is recruited within days. The mid-level fixers, the cross-border smugglers, the corrupt officials who issue fraudulent permits — these are rarely caught. John Hume, allegedly operating a trafficking syndicate for seven years while simultaneously selling his farm to conservationists, illustrates the point. The system was too focused on the young men with rifles in the bush to notice the property developer with permits in the office.</p>
          <p>The cost of one rhino horn on the black market ($60,000/kg) would fund 25 years of a ranger's salary. The cost of employing a Lion Guardian for a year ($1,200) would pay for itself 800 times over in protected tourism revenue. The economics are not complicated. The plumbing is.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#991B1B' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">If you have a population worrying about the most basic of human needs, how can we expect them to worry about conservation?</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Dr Joel Alves, Wildlife Vets, South Africa</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">006 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">Go deeper.</h2>
        <div className="space-y-8">
          {[
            { to: 'The Rhino Underground', insight: 'Over 2,000 rhinos. One failed auction. The largest wildlife translocation in history. And the breeder who was just arrested for trafficking.' },
            { to: 'The Conservation Playbook', insight: 'The programmes that actually reduce poaching scored against those that don\'t. Five mechanisms. Ten models. The scorecard.' },
            { to: 'The Conservation Deficit', insight: '$29.3B in tourism GDP. $23B in illegal trade. $1.1B in conservation funding. The deficit is architectural.' },
            { to: 'The Lion Guardians', insight: '$100/month turned warriors from killers into protectors. The economic intervention that produced 99% reduction in lion killing.' },
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
          <p className="text-[12px] text-[#737373]">Research, visualisation &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
          <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
        </div>
      </div></section>
    </div>
  )
}
