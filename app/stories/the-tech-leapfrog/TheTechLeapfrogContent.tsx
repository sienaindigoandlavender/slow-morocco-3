'use client'

import { useInView, AnimCounter, LeapfrogTimeline, UnicornCards, VCFundingArc, TechHubs } from './charts'

const SOURCES = [
  'GSMA — Mobile Economy Sub-Saharan Africa 2024: 495M unique subscribers, 50% penetration by 2025',
  'FurtherAfrica — "Africa\'s Digital Payment Boom" (Aug 2025): $1.1T mobile payments, PAPSS cross-border',
  'Fintech News Africa — "Africa\'s Most Valuable Fintech Unicorns 2025": 9 unicorns, 8 fintech (TechCrunch data)',
  'World Economic Forum — "Africa is harnessing technology to leapfrog" (Jul 2025): $1.1T transactions, 751M mobile subscribers by 2030',
  'Tech In Africa — "2024: A Mixed Year for African Startups": $2.2B raised, 25% decline, shift to profitability',
  'Africa: The Big Deal — VC funding tracker: $4.9B peak (2021), $2.9B (2023), $2.2B (2024)',
  'FurtherAfrica — "Rise of Africa\'s Digital Economy" (Aug 2025): $30.24B market, CAGR 38%, digital GDP share 5.2%',
  'Contrary Research — Flutterwave business breakdown: $3B valuation, 1M+ businesses, 30+ currencies',
  'IEEE Spectrum — "Leapfrog Technologies": Africa skips landlines, bank branches, fossil fuels',
  'Tony Blair Institute — "Supercharging Africa\'s Startups": 350M unbanked, $4.9B VC (2021)',
  'GIGA-Hamburg — "Digital Africa": Google Equiano cable, Meta 2Africa cable, subsea infrastructure',
  'Paystack Blog — "Signals in African fintech 2024": Nigeria $1T+ instant payments, regulatory fragmentation',
]

export function TheTechLeapfrogContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">

      {/* HERO */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 156 · Africa Progression</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Tech<br />Leapfrog</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">
            Africa skipped landlines and went straight to mobile. Skipped bank branches and went straight to M-Pesa. Now it&rsquo;s skipping legacy payments and building the infrastructure the rest of the world will copy. 1.1 billion mobile users. $1.1 trillion in mobile transactions. Nine unicorns. And a correction that is forcing the ecosystem to grow up.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 1.1, s: 'B', l: 'mobile users (2024)', d: 1 },
              { n: 1.1, s: 'T', l: '$ mobile transactions', d: 1 },
              { n: 9, s: '', l: 'tech unicorns', d: 0 },
              { n: 30, s: 'B', l: '$ digital economy (2025)', d: 0 },
              { n: 11, s: 'K+', l: 'tech startups', d: 0 },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} decimals={k.d} />{k.s}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAPFROG TIMELINE */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Leapfrog</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">They didn&rsquo;t catch up. They skipped ahead.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The concept of the leapfrog is Africa&rsquo;s most powerful technological story. Where other continents built telephone poles, Africa built cell towers. Where others built bank branches, Africa built M-Pesa. Where others built card terminals, Africa built mobile wallets. The absence of legacy infrastructure became an advantage — there was nothing to protect, nothing to disrupt, just green field to build on. M-Pesa launched in 2007 in Kenya. Within a decade, mobile money transactions in Africa exceeded $500 billion. By 2024, they surpassed $1.1 trillion. Nigeria alone processed over $1 trillion in instant payments. Rwanda deployed medical delivery drones before Amazon. The pattern repeats: necessity drives innovation, and Africa&rsquo;s necessities are immense.</p>
        <LeapfrogTimeline />
      </div></section>

      {/* UNICORNS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Unicorns</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Nine billion-dollar companies. Eight of them are fintech.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Flutterwave ($3B) processes payments for over a million businesses across 30+ currencies. OPay ($2B) serves 50 million users in Nigeria, Egypt, and Pakistan. Wave ($1.7B) brought free mobile money to Senegal and West Africa. Paystack was acquired by Stripe for $200 million in 2020 — the first major Silicon Valley acquisition of an African startup. Moniepoint became the newest unicorn in 2024 and immediately attracted Visa investment. The dominance of fintech is not an accident — payments infrastructure is the foundation layer. Every other digital service in Africa depends on the ability to move money by phone.</p>
        <UnicornCards />
      </div></section>

      {/* VC FUNDING */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Money</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">$4.9 billion to $2.2 billion. The boom, the correction, and what comes next.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">African VC funding grew six times faster than the global average, peaking at $4.9 billion in 2021. Then the global tightening hit. Funding fell 55% by 2024 to $2.2 billion. High-profile startups closed — Copia ($100M+ raised), Gro Intelligence ($850M valuation), Dash, 54gene. The correction was painful but clarifying: growth without profitability is not a business model. The ecosystem is now shifting toward sustainable growth, local capital mobilisation, and strategic rather than speculative investment. Seventy percent of African startup funding still comes from non-African investors — a structural vulnerability the ecosystem is working to address.</p>
        <VCFundingArc />
      </div></section>

      {/* TECH HUBS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Hubs</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Five cities. Five different models. One ecosystem.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Lagos is the volume play — 2,000 startups, $9.8 billion ecosystem, five unicorns, Africa&rsquo;s fintech capital. Nairobi is the mobile money birthplace — M-Pesa, cleantech, the &ldquo;Silicon Savannah&rdquo; with 29% of all continental VC. Cape Town is the deep tech hub — AI, wealthtech, most advanced banking infrastructure. Cairo bridges Africa and MENA — fintech, e-commerce, proptech, with $339 million raised in H1 2025 alone. And Kigali is the policy play — 95% 4G coverage, Startup Act, Kigali Innovation City, government-led transformation. Each city represents a different model for how African tech ecosystems can work.</p>
        <TechHubs />
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Question</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">Africa didn&rsquo;t disrupt banks. It replaced the need for them.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>In 2007, Safaricom launched M-Pesa in Kenya to solve a specific problem: most Kenyans had no bank account but nearly everyone had a mobile phone. The solution was simple — let people send money by text message. No branch. No application. No credit check. Within two years, M-Pesa had more users than all of Kenya&rsquo;s banks combined. Today it serves 60 million people across seven countries and processes $364 billion in transactions annually. It did not disrupt banking. It replaced the need for it.</p>
          <p>This is the leapfrog model. When you have no legacy infrastructure, you have no legacy to protect. Africa skipped landlines because it never built them — mobile towers were cheaper and faster to deploy. Africa skipped bank branches because the distances were too great and the populations too dispersed. Africa skipped card terminals because merchants could not afford them. Each absence created a gap, and each gap created an opportunity for a solution that was more efficient than what the developed world had built through decades of incremental improvement.</p>
          <p>The fintech unicorns are the evidence. Flutterwave, valued at $3 billion, provides the payment rails that let a merchant in Lagos accept money from a buyer in Nairobi. OPay, valued at $2 billion, turned corner-shop agents into bank branches across Nigeria. Wave, valued at $1.7 billion, made mobile money free in Senegal and collapsed the fees that kept the poorest locked out. Stripe acquired Paystack for $200 million because it understood that African payment infrastructure was not a charity project — it was a commercial opportunity with no Western equivalent.</p>
          <p>But the leapfrog has limits. Internet penetration in sub-Saharan Africa averages just 27%. The digital divide between Nairobi and Niamey is as wide as the divide between Nairobi and New York. Seventy percent of startup funding comes from outside Africa, which means the ecosystem is vulnerable to cycles it does not control — as the 2023-24 correction painfully demonstrated. Growth-stage startups that had raised over $100 million collapsed when funding dried up. The lesson was clear: African tech needs African capital if it is to be resilient.</p>
          <p>The deeper question is whether the tech leapfrog can drive structural economic transformation or remains a thin layer of innovation on top of economies that are still overwhelmingly informal, agricultural, and underemployed. Nigeria processes $1 trillion in instant payments but its unemployment rate is 33%. Kenya&rsquo;s M-Pesa serves 40 million users but 80% of employment is informal. The technology works. The question is whether it generates the productive employment that 20 million young people entering the workforce every year require.</p>
          <p>The most interesting signal is the Pan-African Payment and Settlement System (PAPSS), launched under <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>AfCFTA</span>, which enables traders to settle cross-border transactions in local currencies without routing through US dollars. If PAPSS works at scale, it reduces transaction costs across the $3.4 trillion free trade area and gives African fintech infrastructure a structural advantage that no Silicon Valley company can replicate — because it was built for this market, from the ground up, from the beginning.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#047857' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">Africa skipped landlines and went straight to mobile. Now it is skipping legacy payments and building the infrastructure the rest of the world will copy.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Slow Morocco analysis</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">006 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">Go deeper.</h2>
        <div className="space-y-8">
          {[
            { to: 'The Demographic Dividend', link: '/data/the-demographic-dividend', insight: '60% of Africa is under 25. This is the market that makes every tech bet a volume play. The youth bulge is the tech leapfrog\'s fuel.' },
            { to: 'The Infrastructure Revolution', link: '/data/the-infrastructure-revolution', insight: 'Subsea cables, data centres, 5G. The physical infrastructure that makes the digital layer possible. Google Equiano, Meta 2Africa — big tech is building the pipes.' },
            { to: 'Morocco\'s Port Strategy', link: '/data/moroccos-port-strategy', insight: 'Morocco ranks 17th globally in maritime connectivity. Its digital ambitions follow the same architecture — build the infrastructure others need.' },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#047857' }}>
              <span className="text-[10px] text-[#34d399] uppercase tracking-[0.1em] underline font-semibold">{c.to}</span>
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
