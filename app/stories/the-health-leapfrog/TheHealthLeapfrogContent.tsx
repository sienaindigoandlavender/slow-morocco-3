'use client'
import { AnimCounter, HealthLeapfrogCards, DiseaseBurden } from './charts'

const SOURCES = ['WHO — World Health Statistics 2024: 95% malaria deaths in Africa, 580K annually.', 'UNAIDS — 25.6M living with HIV in SSA, 65% of global burden.', 'Zipline — 70M+ autonomous deliveries across Rwanda, Ghana, Kenya, Nigeria.', 'Africa CDC — PAVM initiative: 6 mRNA vaccine manufacturing hubs established.', 'Lancet — Community health workers: Ethiopia 38K HEWs, Rwanda 45K CHWs, reduced child mortality 30-50%.', 'WHO — Africa has 3% of global health workers serving 25% of global disease burden. 1 doctor per 5,000 people.', 'UNECA — Africa imports 80% of pharmaceuticals. COVID exposed supply chain vulnerability.']

export function TheHealthLeapfrogContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 160 · Africa Progression</p>
        <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Health<br />Leapfrog</h1>
        <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">Africa carries 25% of the global disease burden with 3% of the world&rsquo;s health workers. Drones deliver blood faster than ambulances. AI triages patients where doctors are scarce. mRNA vaccine hubs aim to end the continent&rsquo;s dependence on imported medicine. The leapfrog pattern — skip legacy, build better — is now rewriting healthcare.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ n: 3, s: '%', l: 'of global health workers' }, { n: 25, s: '%', l: 'of global disease burden' }, { n: 70, s: 'M+', l: 'Zipline deliveries' }, { n: 80, s: '%', l: 'pharma imported' }].map(k => (
            <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} />{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
          ))}
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Burden</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">95% of malaria deaths. 65% of HIV. 70% of maternal mortality. One continent.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Africa bears a disproportionate share of virtually every global health challenge. The numbers are staggering — 580,000 malaria deaths annually (95% of the global total), 25.6 million people living with HIV, 2.7 million under-5 deaths per year. A woman in sub-Saharan Africa faces a 1 in 37 lifetime risk of dying from pregnancy-related causes — versus 1 in 7,800 in the EU. The continent has just 1 doctor per 5,000 people. These numbers define both the crisis and the scale of the innovation opportunity.</p>
        <DiseaseBurden />
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Innovations</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Drones, mRNA, AI, and a million health workers.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Zipline&rsquo;s autonomous drones have made over 70 million medical deliveries across Rwanda, Ghana, Kenya, and Nigeria — blood, vaccines, medications reaching remote clinics in 30 minutes where roads would take hours. Six mRNA vaccine manufacturing hubs are being established across the continent to end the dependence that saw Africa produce less than 1% of the vaccines it used during COVID. Ethiopia deployed 38,000 health extension workers; Rwanda trained 45,000 community health workers — reducing child mortality by 30-50% in covered areas. M-T<span className="underline underline-offset-2">IBA</span> in Kenya brought mobile health insurance to 6 million users. AI diagnostics are filling the gap where doctors are scarce.</p>
        <HealthLeapfrogCards />
      </div></section>

      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Story</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">Where the doctor cannot reach, the drone arrives in 30 minutes.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>The health leapfrog follows the same logic as the tech leapfrog: where legacy infrastructure is absent, Africa builds something that works differently and sometimes works better. Zipline deployed autonomous drone delivery in Rwanda in 2016 — delivering blood to remote clinics that previously waited hours or days for road transport. Rwanda had no extensive road network to protect. It had a need and a technology. The drone network now serves four countries and has made over 70 million deliveries, with blood wastage reduced by two-thirds.</p>
          <p>COVID-19 exposed the cost of health dependency. Africa imported 99% of its vaccines. When rich nations hoarded supply, the continent was left waiting. The response — six mRNA manufacturing hubs in South Africa, Senegal, Rwanda, and beyond — aims to build pharmaceutical sovereignty. Morocco already exports medicines to over 40 African countries. Egypt has a growing generic pharmaceutical industry. The goal is not autarky but resilience: the ability to manufacture essential medicines locally rather than depending on supply chains that fail in crises.</p>
          <p>The community health worker model is perhaps the most scalable innovation. Ethiopia&rsquo;s Health Extension Programme deployed 38,000 workers to rural communities, delivering primary care, maternal health support, and disease surveillance at a cost of roughly $7 per capita per year. Rwanda&rsquo;s 45,000 community health workers achieved some of the sharpest declines in child mortality anywhere on the continent. These are not high-tech solutions. They are human solutions — trusted neighbours trained to provide basic care where the health system cannot reach. Combined with mobile health platforms and AI triage, they form a distributed health infrastructure that does not require hospitals on every corner.</p>
          <p>The pattern is the same everywhere: Africa&rsquo;s health challenges are immense but the innovations emerging to address them are often more efficient, more scalable, and more appropriate than the models they are replacing. A drone network in Rwanda delivers blood faster than any ambulance system in Europe. A mobile health wallet in Kenya provides micro-insurance to people who have never seen a hospital reception desk. The health leapfrog is real. The question is whether it can scale to match the burden.</p>
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 min-h-[40vh] flex items-center">
        <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#991B1B' }}><p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">Africa has 3% of the world&rsquo;s health workers and 25% of the disease burden. The leapfrog is not optional — it is survival.</p><p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Slow Morocco analysis</p></blockquote>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">004 · Connected Intelligence</p>
        <div className="space-y-6">{[{ to: 'The Tech Leapfrog', note: 'M-Pesa → M-TIBA. The mobile money platform becomes the health insurance platform.' }, { to: 'The Demographic Dividend', note: 'The dividend requires a healthy workforce. Malaria costs Africa $12B/year in lost productivity.' }].map((c, i) => <div key={i} className="border-l-[3px] pl-6" style={{ borderColor: '#991B1B' }}><span className="text-[10px] text-[#f87171] uppercase tracking-[0.1em] font-semibold">{c.to}</span><p className="text-[13px] text-white/50 mt-1.5">{c.note}</p></div>)}</div>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">{SOURCES.map((s, i) => <p key={i} className="text-[11px] text-[#525252]">{s}</p>)}</div>
        <div className="pt-6 flex justify-between items-center border-t border-[#e5e5e5]"><p className="text-[12px] text-[#737373]">Research &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p><p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p></div>
      </div></section>
    </div>
  )
}
