'use client'

import { AnimCounter, CreativeOrbit, StreamingPulse } from './charts'

const SOURCES = ['Atlantic Council — "Invest in African creatives" (Jul 2024): 13.5B Afrobeats streams, 24% revenue growth, Netflix $175M+','Aninver — Creative Industries Report: Nollywood $1.2B revenue, fashion $31B, 4.2M+ jobs','Creative Brief Africa — "$50B by 2030" (Sep 2025): piracy $2B losses, policy gaps, infrastructure','Billionaires Africa — Nigeria entertainment $13.6B by 2028: Burna Boy, Davido, Wizkid','African Exponent — Africa Creative Economy 2025: streaming $451M, fashion exports $15.5B, tourism $25B','US Trade Gov — Nigeria media: $10.8B revenue, Afrobeats $8B economy contribution, 4.2M creative workers','Afreximbank — CCI economic contribution: Nollywood $7.2B GDP, 2,500 films/yr, 300K direct jobs']

export function TheCreativeExplosionContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 159 · Africa Progression</p>
        <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Creative<br />Explosion</h1>
        <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">Afrobeats went from 2 billion to 24 billion Spotify streams in seven years. Nollywood produces 2,500 films annually, more than Hollywood. The fashion industry is worth $31 billion. Nigeria&rsquo;s entertainment sector is projected to reach $13.6 billion by 2028. Africa&rsquo;s <span className="underline underline-offset-2">creative economy</span> is the continent&rsquo;s most powerful soft-power export — and it is only beginning.</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[{n:50,s:'B',l:'$ creative economy by 2030',d:0},{n:24,s:'B',l:'Afrobeats streams (2024)',d:0},{n:2500,s:'+',l:'Nollywood films per year',d:0},{n:31,s:'B',l:'$ fashion industry',d:0},{n:4.2,s:'M',l:'creative sector workers',d:1}].map(k=>(
            <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} decimals={k.d}/>{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
          ))}
        </div>
      </div></section>
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Universe</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Seven industries. One cultural supernova.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Nollywood contributes $7.2 billion to Nigeria&rsquo;s GDP and employs over a million people. Afrobeats generates $500 million in streaming revenue with the fastest growth rate of any music genre globally. The fashion industry — worth $31 billion — employs millions of artisans across the continent. Gaming, visual arts, publishing, and cultural tourism round out an ecosystem projected to reach $50 billion by 2030. Netflix has invested $175 million in African content. Universal Music Group opened African offices. Spotify reports record royalty payments to African artists. The world is not discovering African creativity — African creativity is claiming the world.</p>
        <CreativeOrbit />
      </div></section>
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Sound</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">2 billion to 24 billion streams. The fastest-growing genre on Earth.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Burna Boy became the first African artist to sell out a US stadium. Tyla won the first Best African Music Performance Grammy. Rema and Selena Gomez&rsquo;s &ldquo;Calm Down&rdquo; became the first African-led track to reach one billion Spotify streams. Revenue from sub-Saharan African music grew 24% in a single year — the fastest growth of any region globally. South African artist royalties on Spotify increased 500% between 2017 and 2023. And the US and UK are now out-streaming Nigeria in Afrobeats consumption. The diaspora opened the door. TikTok blew it off its hinges.</p>
        <StreamingPulse />
      </div></section>
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Story</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">The talent scales. The infrastructure does not. Yet.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>The creative explosion is Africa&rsquo;s most visible economic miracle and its most misunderstood. From the outside, it looks like overnight success — Burna Boy at Madison Square Garden, Nollywood on Netflix, African fashion on Parisian runways. From the inside, it is talent scaling in spite of, not because of, supportive infrastructure. Lagos produces Grammy winners but lacks a 20,000-seat venue. Nollywood generates $7.2 billion in GDP but loses an estimated $2 billion annually to piracy. Afrobeats royalties flow through global platforms that were not designed for African payment systems.</p>
          <p>The comparison to K-pop is instructive. South Korea turned strict copyright enforcement, government investment in cultural infrastructure, and strategic export policy into a multi-billion-dollar cultural export machine. Africa has the talent and the global audience — arguably more diverse and authentic than K-pop&rsquo;s manufactured precision — but lacks the policy scaffolding. Intellectual property protection remains weak. Collection societies are underfunded. Venues are inadequate. Broadband is inconsistent. The creative economy generates $4.2 billion annually and could generate $50 billion by 2030 — if the infrastructure catches up to the imagination.</p>
          <p>The most powerful dimension is soft power. Historically, Africa has never been top of mind for global cultural influence. Afrobeats changed that. When Burna Boy headlines the UEFA Champions League final and Rema performs at the NBA All-Star Game, they are not just entertaining — they are rewriting how the world perceives an entire continent. The creative explosion is Africa&rsquo;s most effective branding campaign, delivered not by governments but by artists who are, as one journalist put it, &ldquo;the best PR team we could ever have asked for.&rdquo;</p>
        </div>
      </div></section>
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
        <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#7C3AED' }}>
          <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">Afrobeats artists are the best PR team we could ever have asked for — talented, arrogant, and unapologetically African.</p>
          <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Cited in Atlantic Council, Jul 2024</p>
        </blockquote>
      </div></section>
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">Connected Intelligence</p>
        <div className="space-y-6">
          {[{to:'The Demographic Dividend',insight:'Median age 19.3. The youngest continent is the most creative. Gen Z Africans are digital natives producing content the world consumes.'},{to:'The Tech Leapfrog',insight:'Streaming platforms are the distribution layer. Flutterwave processes royalty payments. The tech stack and creative economy are fused.'}].map((c,i)=>(
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{borderColor:'#7C3AED'}}>
              <span className="text-[10px] text-[#c084fc] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-[560px] mt-2">{c.insight}</p>
            </div>
          ))}
        </div>
      </div></section>
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-10">{SOURCES.map((s,i)=><p key={i} className="text-[11px] text-[#525252]">{s}</p>)}</div>
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[#e5e5e5]">
          <p className="text-[12px] text-[#737373]">Research &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
          <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
        </div>
      </div></section>
    </div>
  )
}
