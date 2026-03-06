'use client'
import { AnimCounter, CreativeRadial, CreativeTimeline } from './charts'

const SOURCES = ['UNCTAD — Creative Economy Outlook 2024: Africa\'s creative industries worth $4.2B+.', 'PwC — Global Entertainment & Media Outlook: Afrobeats fastest-growing genre. $1.4B music market.', 'UNESCO — Nollywood: 2,500 films/year, $660M revenue. 2nd largest by volume globally.', 'Netflix — $175M Africa content investment announced 2022. Expanding production in Nigeria, SA, Kenya.', 'Spotify — Afrobeats most-streamed non-English genre (2024). Rema "Calm Down" 2.4B+ streams.', 'BOF — Africa Fashion: Thebe Magugu LVMH Prize. Lagos, Dakar, Marrakech fashion weeks growing.', 'Sotheby\'s — El Anatsui sold for $1.6M (2022). Contemporary African art auction records breaking.']

export function TheCreativeEconomyContent() {
  return (
    <div className="bg-white text-[#262626] pt-16">
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 162 · Africa Progression</p>
        <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Creative<br />Economy</h1>
        <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">Afrobeats is the fastest-growing music genre on Earth. Nollywood produces more films than Hollywood. African contemporary art is breaking auction records. Fashion weeks in Lagos, Dakar, and Marrakech are putting African design on the global runway. Africa&rsquo;s creative economy — $4.2 billion and accelerating — is the continent&rsquo;s most powerful soft power engine.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ n: 4.2, s: 'B+', l: 'creative economy value', d: 1 }, { n: 2500, s: '', l: 'Nollywood films/year' }, { n: 2.4, s: 'B', l: 'Rema "Calm Down" streams', d: 1 }, { n: 175, s: 'M', l: '$ Netflix Africa investment' }].map(k => (
            <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} decimals={(k as any).d || 0} />{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
          ))}
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Sectors</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Music. Film. Fashion. Art. Gaming. The cultural export machine.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Afrobeats alone represents a $1.4 billion market — Nigerian artists filling arenas from London to Los Angeles. Nollywood produces 2,500 films per year, second only to India by volume, generating $660 million in revenue. Fashion is the emerging frontier — Thebe Magugu becoming the first African designer to win the LVMH Prize, Lagos Fashion Week attracting international buyers. Gaming is mobile-first and growing toward $1 billion by 2027. Contemporary African art is commanding museum exhibitions and auction records globally.</p>
        <CreativeRadial />
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Timeline</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Eight years that changed the world&rsquo;s view of African culture.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">From Wizkid featuring on Drake&rsquo;s &ldquo;One Dance&rdquo; in 2016 to Afrobeats becoming the most-streamed non-English genre on Spotify in 2024, the trajectory has been exponential. Each milestone — Grammys, LVMH Prize, Netflix investment, auction records — represents institutional recognition that African creative production is not niche but mainstream.</p>
        <CreativeTimeline />
      </div></section>

      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Story</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">The continent the world dances to but doesn&rsquo;t invest in.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>The creative economy is Africa&rsquo;s most undervalued export. When Burna Boy fills Madison Square Garden, when Tems wins a Grammy, when Wizkid collaborates with Drake and the song becomes the most-streamed track on Spotify that year — these are not cultural curiosities. They are the leading edge of a $4.2 billion industry that is growing faster than any other creative sector on Earth. Afrobeats is now the most-streamed non-English genre on Spotify. The audience is global. The production is almost entirely African.</p>
          <p>Nollywood tells the parallel story in film. With 2,500 films produced annually, it is the second-largest film industry in the world by volume — behind India, ahead of the United States. Revenue is $660 million and growing. Netflix invested $175 million in African content. Amazon, Showmax, and local platforms are following. The content pipeline is deep because the stories are universal — family, ambition, spirituality, survival — told through a lens the world has never seen at this scale.</p>
          <p>Fashion and visual art represent the next wave. Thebe Magugu winning the LVMH Prize was not just an individual achievement — it was a signal that African design has moved from "inspired by" to "leading." Lagos Fashion Week, Dakar Fashion Week, FIFME in Marrakech are producing designers that European houses are watching. El Anatsui&rsquo;s work commands museum retrospectives and auction prices above $1 million. The 1-54 Contemporary African Art Fair has become a fixture of the London art calendar.</p>
          <p>The creative economy connects to the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>demographic dividend</span> in a direct way — the youngest continent on Earth produces the culture the rest of the world consumes. But the value capture is still unbalanced. African artists generate billions in streams but the infrastructure — labels, distribution, management, intellectual property protection — is still largely controlled from outside the continent. The creative economy is the soft power engine. The question is whether the economic engine follows.</p>
        </div>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 min-h-[40vh] flex items-center">
        <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#991B1B' }}><p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">The youngest continent on Earth produces the culture the rest of the world dances to. The value capture has not caught up.</p><p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Slow Morocco analysis</p></blockquote>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">004 · Connected Intelligence</p>
        <div className="space-y-6">{[{ to: 'The Demographic Dividend', link: '/data/the-demographic-dividend', note: 'The youngest continent produces the culture. The demographic dividend funds the creative economy.' }, { to: 'The Tech Leapfrog', link: '/data/the-tech-leapfrog', note: 'Streaming platforms, digital distribution, mobile-first gaming. Tech enables creative export.' }].map((c, i) => <div key={i} className="border-l-[3px] pl-6" style={{ borderColor: '#991B1B' }}><span className="text-[10px] text-[#f87171] uppercase tracking-[0.1em] underline font-semibold">{c.to}</span><p className="text-[13px] text-white/50 mt-1.5">{c.note}</p></div>)}</div>
      </div></section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">{SOURCES.map((s, i) => <p key={i} className="text-[11px] text-[#525252]">{s}</p>)}</div>
        <div className="pt-6 flex justify-between items-center border-t border-[#e5e5e5]"><p className="text-[12px] text-[#737373]">Research &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p><p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p></div>
      </div></section>
    </div>
  )
}
