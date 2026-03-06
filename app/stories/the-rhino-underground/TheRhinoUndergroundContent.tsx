'use client'

import { useInView, AnimCounter, HumeToHandcuffsTimeline, PoachingCrisis, RewildingDestinations, KrugerCollapse } from './charts'

const SOURCES = [
  'African Parks — Rhino Rewild initiative, Annual Report 2024',
  'Save the Rhino International — Poaching numbers database, DFFE statistics',
  'Mongabay (Sep 2023) — African Parks to rewild 2,000 rhinos from controversial breeding program',
  'National Geographic (Oct 2023) — No one wanted to buy 2,000 rhinos. What happened next.',
  'Daily Maverick (Sep 2023) — Hume\'s herd of 2,000 African rhinos get a last-minute lifeline',
  'ABC News (Aug 2025) — South Africa accuses 6 of massive rhino horn trafficking scheme',
  'Mongabay (Aug 2025) — Rhino breeder John Hume accused of horn trafficking, arrested',
  'Africa Geographic (2024) — First rhinos rewilded from Hume breeding operation',
  'Rwanda Development Board — Akagera rhino translocation, $4.7M revenue data',
  'IUCN African Rhino Specialist Group — population assessments',
  'SANParks — Kruger rhino population data, dehorning programme',
]

export function TheRhinoUndergroundContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">

      {/* HERO */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 152 · Conservation Economics</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Rhino<br />Underground</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">
            One man bred 2,000 rhinos. Nobody bid when he put them up for auction. A conservation NGO bought them all and launched the largest wildlife translocation in history. Then the breeder was arrested for trafficking the horns. The story of how 15% of the world&rsquo;s white rhinos went from farm to freedom &mdash; and what happened to the man who bred them.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 2000, s: '', l: 'rhinos to rewild' },
              { n: 376, s: '', l: 'moved in year one' },
              { n: 33, s: '', l: 'calves born wild' },
              { n: 55, s: '', l: 'charges against hume' },
              { n: 15, s: '%', l: 'of global white rhino' },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} />{k.s}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Arc</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">From six rhinos to 2,000. From auction to arrest.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">John Hume bought six white rhinos in 1996. Over three decades, he bred them into the world&rsquo;s largest captive herd — spending an estimated $150 million. His plan was to fund conservation by selling legally harvested horn. The international trade ban never lifted. The money ran out. The auction failed. African Parks rescued the rhinos. Then investigators found the horns.</p>
        <HumeToHandcuffsTimeline />
      </div></section>

      {/* POACHING CRISIS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Crisis</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">12,000+ rhinos killed since 2008. One every eight hours at peak.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The poaching crisis that created Hume&rsquo;s farm also destroyed the justification for it. Between 2007 and 2025, South Africa alone lost over 12,000 rhinos. The 2014 peak of 1,215 killed dropped to 352 in 2025 — a 16% decline that masks a complicated picture. Hluhluwe-iMfolozi Park in KZN saw a 68% drop thanks to dehorning. But Kruger nearly doubled, from 88 to 175. The syndicates adapt faster than the systems designed to stop them.</p>
        <PoachingCrisis />
      </div></section>

      {/* KRUGER COLLAPSE */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Collapse</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Kruger spent $74 million on anti-poaching. The population still halved.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Kruger National Park held over 10,000 white rhinos in 2010. Despite helicopter patrols, AI monitoring, sniffer dogs, and $74 million in anti-poaching expenditure between 2017 and 2023, the population fell to roughly 2,800. Seven rangers were dismissed in 2025 after failed polygraph tests linked to the December poaching surge. The lesson: you cannot protect your way to survival. You need safe places first. African Parks understood this. Hume&rsquo;s farm proved breeding alone cannot work either. The answer was rewilding into secured landscapes.</p>
        <KrugerCollapse />
      </div></section>

      {/* REWILDING DESTINATIONS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Destinations</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Where 2,000 rhinos are going. And who is protecting them.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Rhino Rewild exceeded its Year 1 target: 376 animals moved against a goal of 300. Each destination undergoes rigorous &ldquo;Rhino Ready&rdquo; assessment — habitat, security, national regulatory support, and the recipient&rsquo;s long-term management capacity. The June 2025 airlift of 70 rhinos to Rwanda&rsquo;s Akagera Park — 3,400 kilometres by plane — was the largest cross-continental rhino translocation ever attempted. Thirty-three calves have already been born wild. The populations are not just surviving. They are reproducing.</p>
        <RewildingDestinations />
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Contradiction</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">The man who saved 2,000 rhinos is in handcuffs for selling their horns.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>John Hume bred 1,870 rhino calves over 27 years. His farm was state-of-the-art: $425,000 per month in security, helicopter patrols, armed rangers, guard dogs. The last known poaching incident on his property was March 2017. By any biological measure, the breeding programme was a success. There are 2,000 more white rhinos alive because of it.</p>
          <p>His business model was simple and, to him, logical: rhino horn is keratin. It grows back. Saw it off humanely, sell it legally, use the proceeds to fund more breeding. Over the years, he accumulated a 6-ton stockpile of horn — worth, at peak black market prices, somewhere north of $300 million. The international ban on rhino horn trade, in place since 1977, meant he could never sell it legally abroad. He fought the domestic ban and won in 2017. He held an auction. Few buyers came.</p>
          <p>On August 19, 2025, the South African Police's Hawks unit arrested Hume on 55 charges including racketeering, fraud, and rhino horn trafficking. A seven-year investigation alleged that between 2017 and 2024, Hume and five co-accused obtained fraudulent permits to trade horn domestically but used them to funnel horns to Southeast Asia. Rhino horn can sell for $60,000 per kilogram on the black market — more valuable than gold, platinum, or diamonds.</p>
          <p>The arrest reframes the entire Rhino Rewild story. African Parks bought the farm and the rhinos in September 2023. They did not buy Hume's stockpile of horns. What happened to them — whether Hume still owned them or sold them — became the central question of the criminal investigation. The man who built the world's largest rhino herd may have been trafficking their horns the entire time African Parks was rewilding them.</p>
          <p>This is the conservation economy in miniature. The biological programme worked. The economic model could not sustain itself legally. The horn had value that the living animal, in Hume's captive context, did not. African Parks understood what Hume did not: that the value of a rhino is not in its horn. It is in the wild ecosystem where 33 calves are now being born without human intervention, in the Akagera tourism economy generating $4.7 million a year, in the genetic diversity of 7-20 future meta-populations scattered across the continent.</p>
          <p>The breeding worked. The rewilding is working. The man who started it may go to prison. None of these facts contradict each other. All of them are true at the same time.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#047857' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">African Parks had no intention of being the owner of a captive rhino breeding operation with 2,000 rhinos. However, we fully recognise the moral imperative of finding a solution for these animals so that they can once again play their integral role in fully functioning ecosystems.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Peter Fearnhead, CEO, African Parks</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">006 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">Go deeper.</h2>
        <div className="space-y-8">
          {[
            { to: 'The Poaching Economics', link: '/data/the-poaching-economics', insight: 'A ranger earns $200/month. A poacher earns $5,000 per horn. The war on poaching is a war on poverty dressed up as a war on crime.' },
            { to: 'The Conservation Playbook', link: '/data/the-conservation-playbook', insight: 'Ten models scored. Five mechanisms. African Parks as the management franchise archetype. Where Rhino Rewild fits in the taxonomy.' },
            { to: 'The Gorilla Dividend', link: '/data/the-gorilla-dividend', insight: 'Akagera — where 70 of these rhinos now live — already generates $4.7M/year. Rwanda proves the high-value tourism model.' },
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
