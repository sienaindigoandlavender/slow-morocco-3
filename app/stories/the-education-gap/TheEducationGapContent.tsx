'use client'
import { AnimCounter, ParadoxCards, LiteracyBars } from './charts'

const SOURCES = ['UNESCO — 98M children out of school in SSA. 1 in 5 aged 6-11. Highest globally.', 'World Bank — Learning Poverty: 86% of 10-year-olds in SSA cannot read with comprehension.', 'UNESCO UIS — 15M additional teachers needed by 2030. 5.4M for primary alone.', 'IOM — 70,000+ skilled professionals leave Africa annually (brain drain).', 'Statista — University enrollment tripled since 2000: 8M to 24M. Fastest growth globally.', 'Partech Africa — EdTech startups raised $800M+ since 2019. uLesson, Zeraki, M-Shule.', 'QS Rankings 2025 — 14 African universities in global top 500. UCT leading at ~171.', 'World Literacy Foundation — Niger 19%, Chad 22%, Mali 31%. Conflict zones worst affected.']

export function TheEducationGapContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 163 · Africa Progression</p>
        <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Education<br />Gap</h1>
        <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">98 million children out of school. 86% of 10-year-olds cannot read a simple story. 15 million teachers needed by 2030. But university enrollment has tripled since 2000, coding academies are training a global workforce, and EdTech startups have raised $800 million. The education gap is the paradox that shapes everything.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ n: 98, s: 'M', l: 'children out of school' }, { n: 86, s: '%', l: 'learning poverty rate' }, { n: 15, s: 'M', l: 'teachers needed by 2030' }, { n: 24, s: 'M', l: 'university students (3× since 2000)' }].map(k => (
            <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} />{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
          ))}
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Paradox</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">The gap and the leap exist in the same continent.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">On one side: 98 million children not in school, 86% learning poverty, 15 million teachers missing, 70,000+ skilled professionals leaving annually. On the other: university enrollment tripling, 700+ coding academies training developers for the global market, $800 million in EdTech investment, and the fastest-growing higher education system on Earth. The education gap is not a simple story of deficit — it is two simultaneous realities that will determine whether the <span className="underline underline-offset-2">demographic dividend</span> becomes an economic miracle or a crisis.</p>
        <ParadoxCards />
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Literacy Map</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">From 96% to 19%. The literacy gulf within one continent.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Adult literacy rates range from 96% in the Seychelles to 19% in Niger. The variation is enormous — South Africa and Tunisia above 80%, Niger and Chad below 25%. The pattern maps closely to investment, stability, and colonial legacy. The Sahel belt — Mali, Niger, Chad, Burkina Faso — combines the lowest literacy with the highest population growth, creating a compounding challenge where the most people are being added where education systems are weakest.</p>
        <LiteracyBars />
      </div></section>

      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Story</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">The equation is simple. The implementation is the hardest thing in development.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>The education gap is the equation that governs all the others. The demographic dividend requires a skilled workforce — without it, a young population becomes a liability rather than an asset. Food systems need agronomists. Health systems need clinicians. Infrastructure needs engineers. The creative economy needs people who can read contracts. Every single progression story in this series depends on whether the education system can produce the human capital to make it real.</p>
          <p>The scale of the challenge is staggering. Sub-Saharan Africa has 98 million children out of school — the highest rate in the world. But the more alarming number is learning poverty: 86% of 10-year-olds cannot read a simple text with comprehension. Being in school does not mean learning. Overcrowded classrooms, untrained teachers, absent textbooks, and instruction in languages children do not speak at home create school systems that process children without educating them. The region needs 15 million additional teachers by 2030 just to reach universal primary education.</p>
          <p>The brain drain completes the cycle. Africa invests in educating professionals who then leave — 70,000+ skilled workers emigrate annually. Doctors trained in Nigeria practice in London. Engineers educated in Ghana work in Toronto. The investment in human capital flows out the same way raw materials do. Morocco and Rwanda are notable exceptions, creating enough domestic opportunity to retain talent and even attract diaspora return.</p>
          <p>The counternarrative is the coding academy revolution. Andela, ALX, Moringa, Holberton — these institutions train software developers in months rather than years, targeting the global remote work market where an African developer earning $40,000 annually is both life-changing for the individual and competitive for the employer. University enrollment has tripled since 2000, reaching 24 million students. EdTech startups have raised over $800 million. uLesson delivers video lessons to Nigerian students on cheap smartphones. M-Shule tutors Kenyan students via SMS. The education leapfrog mirrors the tech leapfrog — where traditional infrastructure is absent, alternative paths emerge. Whether they can scale fast enough to close the gap is the question the demographic dividend depends on.</p>
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 min-h-[40vh] flex items-center">
        <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#0369A1' }}><p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">86% of 10-year-olds in sub-Saharan Africa cannot read a simple story with comprehension. The demographic dividend depends on changing that number.</p><p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">World Bank — Learning Poverty Index</p></blockquote>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">004 · Connected Intelligence</p>
        <div className="space-y-6">{[{ to: 'The Demographic Dividend', note: 'The dividend is only a dividend if the population is educated. Without education, demographics become a liability.' }, { to: 'The Tech Leapfrog', note: 'Coding academies, EdTech, mobile learning — the tech leapfrog is the education leapfrog.' }, { to: 'The Creative Economy', note: 'Nollywood, Afrobeats, fashion — creative industries need educated creators who understand IP, contracts, distribution.' }].map((c, i) => <div key={i} className="border-l-[3px] pl-6" style={{ borderColor: '#0369A1' }}><span className="text-[10px] text-[#60a5fa] uppercase tracking-[0.1em] underline hover:no-underline font-semibold">{c.to}</span><p className="text-[13px] text-white/50 mt-1.5">{c.note}</p></div>)}</div>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">{SOURCES.map((s, i) => <p key={i} className="text-[11px] text-[#525252]">{s}</p>)}</div>
        <div className="pt-6 flex justify-between items-center border-t border-[#e5e5e5]"><p className="text-[12px] text-[#737373]">Research &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p><p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p></div>
      </div></section>
    </div>
  )
}
