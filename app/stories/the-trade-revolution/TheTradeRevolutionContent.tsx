'use client'
import { AnimCounter, TradeCompass, BarrierCards } from './charts'

const SOURCES = [
  'AfCFTA Secretariat — 54 member states, $3.4T combined GDP, 1.4B people. Largest FTA by member states.',
  'UNCTAD — Intra-African trade 15% vs Europe 60%, Asia 50%. Potential to increase 52% by eliminating tariffs.',
  'African Union — PAPSS launched Jan 2022. Cross-border local currency settlement. $2B+ processed.',
  'World Bank — AfCFTA could lift 30M from extreme poverty, increase incomes by $450B by 2035.',
  'Brookings — African customs delays average 32 days. Transport costs 2-3× other developing regions.',
  'ISS African Futures — China $282B bilateral trade (2023). EU $160B+. Intra-Africa growing but from low base.',
]

export function TheTradeRevolutionContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 159 · Africa Progression</p>
        <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Trade<br />Revolution</h1>
        <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">The African Continental Free Trade Area connects 54 countries, 1.4 billion people, and $3.4 trillion in combined GDP into the world&rsquo;s largest free trade area by member states. Intra-African trade is just 15%. The question: can paperwork, politics, and potholes be overcome fast enough to change that?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ n: 54, s: '', l: 'member countries' }, { n: 3.4, s: 'T', l: '$ combined GDP', d: 1 }, { n: 15, s: '%', l: 'intra-African trade' }, { n: 30, s: 'M', l: 'could exit poverty' }].map(k => (
            <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} decimals={(k as any).d || 0} />{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
          ))}
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Compass</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Africa trades with everyone except itself.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The EU takes 29% of African trade. China takes 21%. India, the US, and the Gulf states take their shares. Only 15% stays within Africa — compared to 60% of European trade staying in Europe and 50% of Asian trade staying in Asia. Colonial-era trade routes persist: raw materials flow out, finished goods flow back. AfCFTA was designed to invert this — creating a single market where Nigerian cement can reach Tanzanian construction sites without passing through European intermediaries. But implementation faces customs delays averaging 32 days (versus 7 in OECD countries), transport costs 2-3 times higher than comparable developing regions, and non-tariff barriers that frustrate even the most ambitious trade agreements.</p>
        <TradeCompass />
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Barriers</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">The biggest trade barrier in Africa is not tariffs. It is the road.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">AfCFTA eliminates tariffs on 90% of goods. But the physical and bureaucratic infrastructure that moves goods between countries remains the true bottleneck. It is often cheaper to ship goods from China to Lagos than from Lagos to Accra. PAPSS — the Pan-African Payment and Settlement System — addresses the financial layer, enabling traders to settle in local currencies without routing through the US dollar. The World Bank estimates AfCFTA could increase continental incomes by $450 billion and lift 30 million from extreme poverty by 2035. But those numbers depend on roads, rails, customs reform, and political will that are still being built.</p>
        <BarrierCards />
      </div></section>

      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Story</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">The largest free trade area in the world exists. On paper.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>AfCFTA is the most ambitious trade agreement Africa has ever attempted. Fifty-four countries signed. A $3.4 trillion combined market. The largest free trade area in the world by member states, connecting 1.4 billion people who will be 2.5 billion by 2050. The logic is unanswerable: a fragmented continent of 54 separate markets, many too small to sustain industrial economies alone, benefits enormously from integration. UNCTAD estimates eliminating tariffs could increase intra-African trade by 52%.</p>
          <p>The implementation gap is where ambition meets reality. Phase I — tariffs on goods — launched in 2021. But most countries have not yet submitted their tariff schedules. Phase II — services, investment, competition policy — is still being negotiated. Phase III — e-commerce, intellectual property — has not started. Meanwhile, the physical barriers that actually prevent trade remain formidable. It takes an average of 32 days to move goods across an African border. A truck crossing from Kenya to Uganda can wait days at the border while paperwork is processed. The Lobito Corridor exists specifically to cut Angola-to-Zambia transit from 45 days to 7.</p>
          <p>PAPSS is the most tangible breakthrough. Before PAPSS, a Nigerian trader buying goods from Kenya had to convert naira to dollars, then dollars to shillings — routing through correspondent banks in New York or London, paying fees at each step. PAPSS enables direct settlement in local currencies, cutting costs and time. It is the financial plumbing that makes a single market actually function. Combined with AfCFTA&rsquo;s tariff elimination, it begins to make intra-African trade economically competitive with importing from China or Europe.</p>
          <p>The trade revolution connects to every other Africa progression story. Infrastructure determines whether goods can move. Energy determines whether factories can operate. Demographics guarantee growing demand. The tech leapfrog provides the payment rails. AfCFTA is the legal framework that connects them all. Whether it becomes the EU-style engine of continental prosperity or remains an aspirational document will be determined in the next decade. The $3.4 trillion market exists. The question is whether it can be unlocked.</p>
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[40vh] flex items-center">
        <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#047857' }}>
          <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">It is cheaper to ship goods from Shanghai to Lagos than from Lagos to Accra. That single fact explains why intra-African trade is 15%.</p>
          <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Slow Morocco analysis</p>
        </blockquote>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">004 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] italic text-white leading-[1.05] mb-10">Go deeper.</h2>
        <div className="space-y-6">
          {[{ to: 'The Infrastructure Revolution', link: '/data/the-infrastructure-revolution', note: 'Lobito Corridor cuts transit 45→7 days. Roads are the real trade barrier.' },
            { to: 'The Tech Leapfrog', link: '/data/the-tech-leapfrog', note: 'PAPSS + Flutterwave + mobile money = the financial plumbing for a single market.' },
            { to: 'The Food Equation', link: '/data/the-food-equation', note: 'AfCFTA targets tripling intra-African agricultural trade. The food equation needs the trade revolution.' }
          ].map((c, i) => <div key={i} className="border-l-[3px] pl-6" style={{ borderColor: '#047857' }}><span className="text-[10px] text-[#34d399] uppercase tracking-[0.1em] font-semibold">{c.to}</span><p className="text-[13px] text-white/50 leading-relaxed max-w-[540px] mt-1.5">{c.note}</p></div>)}
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">{SOURCES.map((s, i) => <p key={i} className="text-[11px] text-[#525252]">{s}</p>)}</div>
        <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[#e5e5e5]"><p className="text-[12px] text-[#737373]">Research &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p><p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p></div>
      </div></section>
    </div>
  )
}
