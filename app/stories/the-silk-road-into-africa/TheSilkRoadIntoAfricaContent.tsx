'use client'

import { useEffect, useRef } from 'react'
import { AnimCounter, FadeIn, BorrowerBubbles, SectorRadial, EngagementSurge, DebtComparison, LandmarkProjects } from './charts'

/* ═══════════════════════════════════════════════════
   THE SILK ROAD INTO AFRICA
   China's Belt & Road Initiative — Operations Dataset
   Magazine editorial. Gossip not lecture. Strunk's rule.
   ═══════════════════════════════════════════════════ */

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const MAP_MARKERS = [
  { name: 'Nigeria \u2014 $20B gas deal', coords: [3.4, 6.5] as [number, number], color: '#DC2626', size: 14, detail: 'Ogidigben Gas Industrial Park. Single largest BRI Africa deal.' },
  { name: 'Rep. of Congo \u2014 $23.1B', coords: [15.3, -4.3] as [number, number], color: '#DC2626', size: 14, detail: 'Second-largest Africa BRI engagement (2025). Oil-backed.' },
  { name: 'Angola \u2014 $42.6B', coords: [13.2, -8.8] as [number, number], color: '#DC2626', size: 14, detail: 'Largest African borrower. Oil-backed. $4.9B deferrals.' },
  { name: 'Kenya \u2014 SGR + $8B debt', coords: [36.8, -1.3] as [number, number], color: '#B45309', size: 12, detail: 'Mombasa\u2013Nairobi SGR ($5B). Nairobi Expressway. Owes $8B+.' },
  { name: 'Ethiopia \u2014 $14.5B', coords: [38.7, 9.0] as [number, number], color: '#B45309', size: 12, detail: 'Addis\u2013Djibouti Railway. Industrial parks. Defaulted 2024.' },
  { name: 'Djibouti \u2014 naval base', coords: [43.1, 11.6] as [number, number], color: '#0a0a0a', size: 10, detail: "China's only African military base. 57% sovereign debt to China." },
  { name: 'Egypt \u2014 strategic', coords: [31.2, 30.0] as [number, number], color: '#0369A1', size: 11, detail: '$9.7B loans. Suez Canal Zone. $4.8B new (H1 2025).' },
  { name: 'Zambia \u2014 defaulted', coords: [28.3, -15.4] as [number, number], color: '#991B1B', size: 11, detail: '$9.5B loans. First African sovereign default (2020).' },
  { name: 'Tanzania \u2014 SGR rising', coords: [35.7, -6.2] as [number, number], color: '#0369A1', size: 11, detail: '$2.7B SGR Phase 1. BRI engagement +1,930% (2025).' },
  { name: 'Mozambique \u2014 bridge', coords: [32.6, -25.9] as [number, number], color: '#525252', size: 9, detail: "Maputo\u2013Katembe Bridge. Africa's longest suspension bridge." },
  { name: 'Cameroon \u2014 $5.9B', coords: [9.7, 3.9] as [number, number], color: '#525252', size: 9, detail: 'Kribi Deepwater Port. Engagement dropped 100% in H1 2025.' },
  { name: 'South Africa \u2014 BRICS', coords: [28.0, -26.2] as [number, number], color: '#0369A1', size: 11, detail: '$6.9B. Strategic, not debt-driven. Tech transfer, Huawei.' },
  { name: 'DRC \u2014 mining', coords: [25.0, -2.5] as [number, number], color: '#B45309', size: 11, detail: 'Cobalt, copper. Critical minerals for EV supply chain.' },
  { name: 'Morocco \u2014 Tanger Med', coords: [-5.8, 35.8] as [number, number], color: '#0369A1', size: 9, detail: 'BRI MoU signatory. Manufacturing corridor. Automotive supply chain.' },
]

const TIMELINE = [
  { y: '2000', e: 'Forum on China-Africa Cooperation (FOCAC) established in Beijing. Framework for bilateral engagement.', t: 'origin' },
  { y: '2000\u201312', e: 'China issues $182.3B in loans to 49 African countries. Energy and transport dominate. Angola alone: $42.6B.', t: 'expansion' },
  { y: '2013', e: 'Xi Jinping launches Belt and Road Initiative. Africa formally integrated as key corridor.', t: 'origin' },
  { y: '2013\u201318', e: 'Peak lending. $10B+ annually. Kenya SGR, Addis\u2013Djibouti rail, Maputo bridge, Lekki port all built.', t: 'expansion' },
  { y: '2016', e: "China opens first permanent overseas military base \u2014 Djibouti. Adjacent to Doraleh port.", t: 'strategic' },
  { y: '2017', e: 'Kenya SGR opens. $5B. Mombasa to Nairobi in 4hrs (was 10). Phase 2 never materialises.', t: 'landmark' },
  { y: '2018', e: "Addis\u2013Djibouti railway opens. First electrified transnational rail in East Africa. Maputo\u2013Katembe bridge opens \u2014 Africa's longest.", t: 'landmark' },
  { y: '2019\u201320', e: 'COVID + debt crisis. Lending collapses. Zambia defaults \u2014 first African sovereign default. China forgives 23 interest-free loans to 17 African nations.', t: 'crisis' },
  { y: '2021\u201322', e: "'Small and beautiful' pivot. Deal sizes shrink. Energy lending halts. Focus shifts to risk mitigation.", t: 'pivot' },
  { y: '2023', e: 'Lending recovers: $4.61B (largest since 2019). Lekki Deepwater Port opens. Mining surges to $7.8B.', t: 'expansion' },
  { y: '2024', e: 'FOCAC Beijing Summit: Xi pledges \u00a5360B ($50.7B) over 3 years. FDI into Africa +86%.', t: 'landmark' },
  { y: '2025', e: 'Record year. $61.2B Africa engagement (+283%). Nigeria $20B gas deal. Private sector leads. Manufacturing shifts to bypass US tariffs.', t: 'expansion' },
]

const SOURCES = [
  { org: 'Green Finance & Development Center / Griffith Asia Institute', doc: 'BRI Investment Reports 2024, H1 2025, 2025' },
  { org: 'Boston University Global Development Policy Center', doc: 'Chinese Loans to Africa Database (2000\u20132023)' },
  { org: 'CARI (China Africa Research Initiative)', doc: 'Johns Hopkins SAIS \u2014 Debt Relief / Loan Data' },
  { org: 'Lowy Institute', doc: '2025 Report: Chinese Debt Repayments by Developing Countries' },
  { org: 'Africa Center for Strategic Studies', doc: "Mapping China's Strategic Port Development in Africa (Apr 2025)" },
  { org: 'Debt Justice Group', doc: "2022 Analysis: Africa's Debt to Private vs Chinese Creditors" },
  { org: 'Rhodium Group', doc: '38 Chinese Debt Renegotiations Analysis (2019)' },
  { org: 'UNCTAD', doc: 'Global Investment Trends Monitor / FDI Data 2024\u20132025' },
]

export function TheSilkRoadIntoAfricaContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'; link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js'
    script.onload = () => {
      const mapboxgl = (window as any).mapboxgl; if (!mapboxgl) return
      mapboxgl.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/satellite-streets-v12', center: [20, 2], zoom: 3.2, pitch: 15, interactive: true, attributionControl: false })
      mapRef.current = map
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        MAP_MARKERS.forEach((m) => {
          const el = document.createElement('div')
          el.style.cssText = `width:${m.size}px;height:${m.size}px;border-radius:50%;background:${m.color};border:2px solid ${m.color}40;box-shadow:0 0 12px ${m.color}60;cursor:pointer;`
          new mapboxgl.Marker(el).setLngLat(m.coords).setPopup(
            new mapboxgl.Popup({ offset: 10, maxWidth: '280px', closeButton: false }).setHTML(
              `<div style="font-family:'IBM Plex Mono',monospace;padding:4px 0;"><p style="font-size:12px;font-weight:700;margin:0 0 4px;color:#0a0a0a;">${m.name}</p><p style="font-size:11px;color:#525252;margin:0;line-height:1.5;">${m.detail}</p></div>`
            )
          ).addTo(map)
        })
      })
    }
    document.head.appendChild(script)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="bg-white text-[#262626]">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 60%, #991B1B15 0%, transparent 60%)' }} />
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 pt-28 pb-20 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#991B1B] mb-5 font-semibold">Data Module &middot; Geopolitical &amp; Economic Intelligence</p>
          <h1 className="font-serif text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.88] tracking-[-0.02em] text-white">The Silk Road<br />Into Africa</h1>
          <p className="text-[15px] text-white/40 mt-6 max-w-[480px] leading-relaxed">$182.3 billion in loans. 52 countries signed. 10,000km of railways. The largest infrastructure programme in human history, mapped and measured.</p>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-x-10 gap-y-6">
            {[
              [182.3, '$', 'B', 'Loans to Africa (2000\u20132023)', 1],
              [61.2, '$', 'B', 'BRI engagement 2025 (+283%)', 1],
              [52, '', '', 'African countries signed', 0],
              [10000, '', '+', 'km railways built', 0],
              [100, '~', '', 'ports built or upgraded', 0],
            ].map(([target, prefix, suffix, label, dec], i) => (
              <div key={i}>
                <p className="font-serif text-[28px] md:text-[34px] italic text-white leading-none">
                  <AnimCounter target={target as number} prefix={prefix as string} suffix={suffix as string} decimals={dec as number} />
                </p>
                <p className="text-[9px] uppercase tracking-[0.08em] text-white/30 mt-1.5 max-w-[160px]">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 001: THE MAP ──────────────────────────── */}
      <section className="relative">
        <div ref={mapContainer} style={{ width: '100%', height: '60vh', minHeight: 440 }} />
        <div className="absolute bottom-4 left-4 md:left-10 flex gap-4 flex-wrap">
          {[['Mega-deal (2025)', '#DC2626'], ['High debt', '#B45309'], ['Strategic partner', '#0369A1'], ['Military base', '#0a0a0a'], ['Other', '#525252']].map(([l, c]) => (
            <div key={l as string} className="flex items-center gap-1.5 bg-black/60 backdrop-blur px-2.5 py-1 rounded-sm">
              <div className="w-2 h-2 rounded-full" style={{ background: c as string }} />
              <span className="text-[9px] uppercase tracking-[0.06em] text-white/70">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 002: THE BORROWERS ────────────────────── */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 &middot; The Borrowers</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-4">Ten countries hold 70% of the debt.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Angola alone owes $42.6 billion. Kenya took $5 billion for a railway that runs below capacity. Zambia defaulted. Djibouti handed over 57% of its sovereign debt for a port and a military base. The bubble sizes tell the story faster than the numbers.</p>
          <BorrowerBubbles />
        </div>
      </section>

      {/* ── 003: WHERE THE MONEY GOES ─────────────── */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 &middot; Where The Money Goes</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-4">Energy and transport. Everything else is footnotes.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Two sectors account for 63% of all Chinese lending to Africa. Energy is oil-backed &mdash; Angola pledged crude to pay for dams and refineries. Transport is the visible legacy: railways that cut journey times in half, ports that shift trade gravity, expressways that charge tolls for 27 years. ICT is the quieter bet &mdash; Huawei built the backbone, the submarine cables, the surveillance infrastructure.</p>
          <SectorRadial />
        </div>
      </section>

      {/* ── 004: THE SURGE ────────────────────────── */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 &middot; The Surge</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-4">$61.2 billion in 2025. Nobody saw it coming.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">After COVID cratered lending and Zambia became the first African country to default on sovereign debt, Western analysts wrote the BRI obituary. China pivoted to &ldquo;small and beautiful&rdquo; projects. The bars went grey. Then Nigeria signed a $20 billion gas deal and everything changed. Africa BRI engagement jumped 283% in a single year. The programme is not dying. It is mutating.</p>
          <EngagementSurge />
        </div>
      </section>

      {/* ── 005: THE PROJECTS ─────────────────────── */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 &middot; The Projects</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-4">Railways, ports, bridges, gas. Click to open.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">A $20 billion gas park in Nigeria. A railway across East Africa that cut freight times by two-thirds. A bridge in Mozambique that replaced a ferry and 160km of unpaved road. A toll expressway in Nairobi where the revenue flows to a Chinese operator for 27 years. A port in Djibouti with a naval base next door.</p>
          <LandmarkProjects />
        </div>
      </section>

      {/* ── 006: THE DEBT QUESTION ────────────────── */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 &middot; The Debt Question</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-4">Africa owes three times more to Wall Street than to Beijing.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The &ldquo;debt trap diplomacy&rdquo; narrative dominates Western media. The data tells a more complicated story. Private Western creditors hold 35% of African external debt at double the interest rate China charges. No Chinese asset seizures have been confirmed anywhere in Africa. China has cancelled $3.4 billion in African loans. But nine African countries are in debt distress, $35 billion in repayments were due in 2025, and the power asymmetry is real. Both things are true simultaneously.</p>
          <DebtComparison />
        </div>
      </section>

      {/* ── 007: THE ESSAY ────────────────────────── */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">006 &middot; The Pattern</p>
          <FadeIn>
            <p className="text-[15px] text-[#262626] leading-[1.8] mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              In 2017, a Chinese-built railway opened between Mombasa and Nairobi. Journey time dropped from ten hours to four. Kenya borrowed $5 billion to build it. Phase 2, from Nairobi to Uganda, was supposed to follow. It never materialised. Neither country could service the existing debt.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[15px] text-[#262626] leading-[1.8] mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              In Djibouti, a country smaller than Belize, China built a port, stationed its only African military base, and acquired 57% of the nation&rsquo;s sovereign debt. The base sits adjacent to the American one. The port handles traffic from the Addis Ababa&ndash;Djibouti railway &mdash; also Chinese-built. The geography is not accidental. Bab el-Mandeb is one of six chokepoints that control global maritime trade.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[15px] text-[#262626] leading-[1.8] mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              The pattern repeats. Infrastructure arrives. Debt follows. Influence accumulates. The counter-narrative also repeats: Western creditors charge higher interest, impose structural adjustment, and hold three times the debt. No Chinese port has been seized. $3.4 billion in loans have been cancelled outright.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[15px] text-[#262626] leading-[1.8] mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              In 2025, while the West debated whether BRI was dead, China signed $61.2 billion in new African deals. A single Nigerian gas contract was worth $20 billion. Chinese companies began relocating factories to Africa &mdash; not for African markets, but to bypass American tariffs. The goods would be manufactured in Ethiopia, stamped &ldquo;Made in Africa,&rdquo; and shipped to consumers in Ohio.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-[15px] text-[#525252] leading-[1.8]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              The Silk Road is not a metaphor. It is 10,000 kilometres of railway, 100 ports, 66,000 kilometres of power lines, and a military base at the mouth of the Red Sea. The continent&rsquo;s infrastructure is being built. The question was never whether. It was by whom, and on what terms.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 008: TIMELINE ─────────────────────────── */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">007 &middot; Timeline</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-12">2000 &mdash; 2025</h2>
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#d4d4d4]" />
            {TIMELINE.map((t, i) => {
              const color = t.t === 'origin' ? '#525252' : t.t === 'expansion' ? '#047857' : t.t === 'landmark' ? '#0369A1' : t.t === 'strategic' ? '#0a0a0a' : t.t === 'crisis' ? '#991B1B' : '#B45309'
              return (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex gap-4 mb-5">
                    <div className="shrink-0">
                      <div className="w-[14px] h-[14px] rounded-full border-2" style={{ borderColor: color, background: t.t === 'landmark' || t.t === 'strategic' ? color : '#fff' }} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace", color }}>{t.y}</p>
                      <p className="text-[13px] text-[#525252] leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{t.e}</p>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
          <div className="flex gap-4 flex-wrap mt-6 pt-4 border-t border-[#e5e5e5]">
            {[['Origin', '#525252'], ['Expansion', '#047857'], ['Landmark', '#0369A1'], ['Strategic', '#0a0a0a'], ['Crisis', '#991B1B'], ['Pivot', '#B45309']].map(([l, c]) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                <span className="text-[9px] uppercase tracking-[0.08em] text-[#737373]">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULLQUOTE ─────────────────────────────── */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <FadeIn>
            <div className="border-l-[3px] border-[#991B1B] pl-6 md:pl-10">
              <p className="font-serif text-[22px] md:text-[28px] italic text-[#0a0a0a] leading-[1.3]">
                The debt-trap narrative assumes Africa has no agency. The cheerleader narrative assumes China has no self-interest. The data sits between both stories, uncomfortable and specific.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONNECTED INTELLIGENCE ────────────────── */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">008 &middot; Connected Intelligence</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern continues.</h2>
          <div className="space-y-10">
            {[
              { to: 'The Atlantic Spine', link: '/stories/the-atlantic-spine', insight: "Nigeria's $20B gas park and the Nigeria\u2013Morocco Gas Pipeline share the same geography. Two competing visions for the same molecule: one flows north to Europe via Morocco, the other flows east to Chinese industrial processing." },
              { to: 'The Blood Gold', link: '/stories/the-blood-gold', insight: 'China builds infrastructure. Russia sends mercenaries. In the Sahel, AES juntas expelled Western forces and welcomed both. Mali, Burkina Faso, Niger receive Wagner fighters and Chinese loans simultaneously.' },
              { to: 'The Sahel War', link: '/stories/the-sahel-war', insight: "Chinese infrastructure requires stability. The Sahel has none. Railways and power grids mean nothing if the state cannot secure the corridor. JNIM controls 50% of Mali. China's investment is a bet that the state will survive." },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#991B1B' }}>
                  <span className="text-[10px] text-[#991B1B] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
                  <p className="text-[14px] text-white/50 leading-relaxed max-w-[560px] mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{c.insight}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOURCES ───────────────────────────────── */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-8">Sources &amp; Attribution</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SOURCES.map((s, i) => (
              <div key={i} className="text-[11px]">
                <span className="text-[#0a0a0a] font-semibold">{s.org}</span>{' '}
                <span className="text-[#737373]">&mdash; {s.doc}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 pt-6 border-t border-[#e5e5e5]">
            {[
              ['World Bank', 'Open Data \u2014 External Debt Statistics, Country Indicators'],
              ['ACLED', 'Armed Conflict Location & Event Data \u2014 Africa dataset'],
              ['Copernicus / Sentinel', 'Satellite imagery \u2014 infrastructure verification'],
            ].map(([org, doc], i) => (
              <div key={i} className="text-[11px]">
                <span className="text-[#0a0a0a] font-semibold">{org}</span>{' '}
                <span className="text-[#737373]">&mdash; {doc}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[#e5e5e5]">
            <p className="text-[12px] text-[#737373]">Data compilation, cartography, and analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
            <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
          </div>
        </div>
      </section>
    </div>
  )
}
