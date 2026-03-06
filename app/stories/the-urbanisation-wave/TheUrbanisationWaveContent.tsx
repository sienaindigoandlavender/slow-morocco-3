'use client'
import { AnimCounter, MegacityBubbles, InfraDeficit } from './charts'

const SOURCES = ['UN DESA — World Urbanization Prospects 2024: Africa adding 950M urban residents by 2050.', 'UN-Habitat — 256M slum dwellers in SSA. Housing deficit 56M units. 4.5M needed annually.', 'Hoornweg & Pope — Lagos projected 88M by 2100. Kinshasa 58M. Dar es Salaam 36M.', 'McKinsey Global Institute — Africa\'s urban consumers to spend $1.4T by 2030.', 'AfDB — Africa urbanising at 3.5% annually. Fastest urbanisation rate globally.', 'World Bank — 7 African cities >5M today. ~50 projected by 2050. Most infrastructure not built yet.']

export function TheUrbanisationWaveContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 161 · Africa Progression</p>
        <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Urbanisation<br />Wave</h1>
        <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">Africa will add 950 million urban residents by 2050 — more than Europe and North America combined. Lagos could reach 88 million by 2100. Fifty cities will exceed 5 million people. Most of the infrastructure for these cities does not exist yet. The largest construction project in human history is about to begin.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ n: 950, s: 'M', l: 'new urban residents by 2050' }, { n: 88, s: 'M', l: 'Lagos 2100 projection' }, { n: 256, s: 'M', l: 'current slum dwellers' }, { n: 56, s: 'M', l: 'housing units needed' }].map(k => (
            <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} />{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
          ))}
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Megacities</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Eight cities that will reshape the continent.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Lagos is adding roughly 800,000 people per year. By 2100, projections suggest it could be the world&rsquo;s largest city at 88 million — larger than any country in Europe. Kinshasa is already larger than Paris and growing at 4% annually. Dar es Salaam is the fastest-growing major city on the continent. Cairo is building an entirely new administrative capital for $58 billion. Inner circles show current population. Outer dashed circles show 2100 projections. The scale of growth is visible in the gap between them.</p>
        <MegacityBubbles />
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Deficit</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Cities growing faster than the infrastructure being built for them.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Africa needs 4.5 million new housing units every year. It builds roughly 500,000. Over half of sub-Saharan Africa&rsquo;s urban population — 256 million people — lives in informal settlements. The deficit is not just housing: it is water, sanitation, power, transport, schools, hospitals. African cities are urbanising at 3.5% annually, the fastest rate globally, but infrastructure investment lags population growth by a decade or more. The opportunity is enormous — McKinsey projects African urban consumers will spend $1.4 trillion by 2030 — but it arrives in cities that are being built and lived in simultaneously.</p>
        <InfraDeficit />
      </div></section>

      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Story</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">The cities of 2050 are being designed right now. Most of them don&rsquo;t know it.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>The urbanisation wave is the physical expression of every other trend in the Africa progression series. Demographics drive it — a population doubling from 1.4 billion to 2.5 billion means hundreds of millions moving to cities. Energy constrains it — you cannot build a modern city without reliable power. Infrastructure enables it — roads, rail, water, sanitation are the skeleton of urban life. Trade finances it — urban economies need markets.</p>
          <p>The scale has no historical precedent. Africa will add more urban residents in the next 25 years than Europe added in the last 200. The cities being built will be among the largest human settlements ever constructed. Lagos at 88 million would be larger than Germany. Kinshasa at 58 million would rival France. Dar es Salaam would go from 8 million to 36 million in a single lifetime. These are not gradual transitions — they are urban explosions happening in real time.</p>
          <p>The infrastructure that exists today was largely built for colonial-era populations a fraction of the current size. Lagos was designed for 300,000. Nairobi for 150,000. Kinshasa for 400,000. The gap between design capacity and actual population creates the familiar landscapes of African urbanism: gridlock, informal settlements, overwhelmed utilities, entrepreneurial chaos filling every gap the formal system leaves. What looks like disorder is actually adaptation — millions of people building their own infrastructure because the state cannot keep up.</p>
          <p>The opportunity is inversely proportional to the deficit. Every housing unit needed is a construction job. Every road is an engineering contract. Every water system is an infrastructure investment. McKinsey estimates Africa&rsquo;s urban consumers will spend $1.4 trillion annually by 2030. The question is not whether African cities will grow — that is guaranteed by demography. The question is whether they will grow with planning, infrastructure, and investment, or whether they will grow as they have been: faster than anyone can manage, creating both enormous wealth and enormous hardship in the same neighbourhoods.</p>
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 min-h-[40vh] flex items-center">
        <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#7C3AED' }}><p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">Africa will add more urban residents in the next 25 years than Europe added in the last 200. The cities of 2050 are being designed right now.</p><p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Slow Morocco analysis</p></blockquote>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">004 · Connected Intelligence</p>
        <div className="space-y-6">{[{ to: 'The Infrastructure Revolution', link: '/data/the-infrastructure-revolution', note: 'Roads, rail, ports, power — the skeleton that urban life requires.' }, { to: 'The Demographic Dividend', link: '/data/the-demographic-dividend', note: 'Population doubling drives urbanisation. The dividend depends on whether cities create jobs or just crowd.' }, { to: 'The Energy Paradox', link: '/data/the-energy-paradox', note: 'Modern cities need reliable power. 600M Africans lack electricity. The urbanisation wave meets the energy paradox.' }].map((c, i) => <div key={i} className="border-l-[3px] pl-6" style={{ borderColor: '#7C3AED' }}><span className="text-[10px] text-[#a78bfa] uppercase tracking-[0.1em] underline hover:no-underline font-semibold">{c.to}</span><p className="text-[13px] text-white/50 mt-1.5">{c.note}</p></div>)}</div>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">{SOURCES.map((s, i) => <p key={i} className="text-[11px] text-[#525252]">{s}</p>)}</div>
        <div className="pt-6 flex justify-between items-center border-t border-[#e5e5e5]"><p className="text-[12px] text-[#737373]">Research &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p><p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p></div>
      </div></section>
    </div>
  )
}
