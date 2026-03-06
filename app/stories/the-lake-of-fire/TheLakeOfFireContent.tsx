'use client'

import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════
   THE LAKE OF FIRE
   Boko Haram, ISWAP & the Lake Chad Basin — 2002–Present
   Data Module · WHITE BG · Connected Intelligence
   ═══════════════════════════════════════════════════ */

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// ── ACTORS ──────────────────────────────────────

const ACTORS = [
  { name: 'Boko Haram (JAS)', full: 'Jama\'at Ahl al-Sunna lid-Da\'wa wal-Jihad', meaning: '"Western education is forbidden"', affiliation: 'Formerly ISIS (disputed since 2016 split)', founded: 2002, insurgency: 2009, founder: 'Mohammed Yusuf (killed in custody, Jul 2009)', leader: 'Factional — Shekau killed May 2021 (suicide vest during ISWAP assault)', personnel: '1,000–2,000 (remnant factions)', territory: 'Lake Chad islands, Mandara Mountains (Nigeria-Cameroon border)', revenue: 'Extortion, kidnapping, border trade, raiding', status: 'Resurgent — 6 large-scale attacks (20+ dead each) in 2025 vs 1 in 2024. 100 massacred Feb 2025. 60 in Sep 2025.', color: '#991B1B' },
  { name: 'ISWAP', full: 'Islamic State West Africa Province', meaning: 'Official ISIS affiliate in Lake Chad Basin', affiliation: 'ISIS', founded: 2016, insurgency: 2016, founder: 'Abu Musab al-Barnawi (split from Shekau over civilian targeting)', leader: 'Post-split leadership council', personnel: '2,000–3,000', territory: 'Northeastern Nigeria (Borno, Yobe), parts of Niger (Diffa)', revenue: 'Territorial taxes, fish trade monopoly, farming taxation, extortion', status: 'Active — adopting drones and IEDs (likely from global ISIS network). Absorbing foreign fighters. 250+ killed in Borno (Sep 2025 alone).', color: '#DC2626' },
  { name: 'Ansaru', full: 'Ansaru al-Musulmina fi Bilad al-Sudan', meaning: '"Vanguard for the Protection of Muslims in Black Africa"', affiliation: 'Al-Qaeda (aligned)', founded: 2012, insurgency: 2012, founder: 'Boko Haram defectors opposed to Shekau\'s mass civilian killings', leader: 'Undisclosed', personnel: 'Unknown (small but recruiting)', territory: 'Northwestern Nigeria', revenue: 'Unknown', status: 'Dormant since 2013 — but reports of JAS/ISWAP fighters defecting to Ansaru under military pressure. Potential re-emergence.', color: '#B45309' },
]

// ── TIMELINE ────────────────────────────────────

const TIMELINE = [
  { y: '2002', e: 'Mohammed Yusuf founds Boko Haram in Maiduguri, Borno State. Religious movement opposing Western influence.', t: 'origin' },
  { y: '2009', e: 'Armed uprising in Bauchi. Security forces kill 800+. Yusuf killed in police custody. Boko Haram radicalizes.', t: 'turning' },
  { y: '2010', e: 'Abubakar Shekau claims leadership. Begins campaign of assassinations and bombings.', t: 'origin' },
  { y: '2011', e: 'UN headquarters Abuja bombed (23 killed). First major international target.', t: 'attack' },
  { y: '2012', e: 'Kano coordinated attacks: 185+ killed in one day. Ansaru splits from Boko Haram over civilian killings.', t: 'attack' },
  { y: '2013', e: 'State of emergency declared in Borno, Yobe, Adamawa. Boko Haram fighters join AQIM in Mali.', t: 'escalation' },
  { y: '2014', e: 'Chibok kidnapping: 276 schoolgirls abducted (Apr). Peak territorial control. World\'s deadliest terrorist group.', t: 'attack' },
  { y: '2015', e: 'Regional coalition offensive displaces Boko Haram from strongholds. Pledges allegiance to ISIS → becomes ISWAP (Mar).', t: 'turning' },
  { y: '2016', e: 'ISIS rejects Shekau. Appoints al-Barnawi. Split: ISWAP (ISIS-aligned) vs JAS (Shekau loyalists).', t: 'turning' },
  { y: '2018', e: 'Dapchi kidnapping: 110 schoolgirls abducted (Feb). One refused to convert — Leah Sharibu, still captive.', t: 'attack' },
  { y: '2020', e: 'Chad offensive: Boko Haram kills 92 soldiers in single attack (Mar). Chad claims 1,000 militants killed in response.', t: 'attack' },
  { y: '2021', e: 'ISWAP assaults Sambisa Forest. Shekau detonates suicide vest rather than be captured (May). Thousands of JAS fighters surrender or defect.', t: 'turning' },
  { y: '2022–23', e: 'JAS remnants consolidate in Lake Chad islands and Mandara Mountains. ISWAP strengthens territorial control in Borno.', t: 'consolidation' },
  { y: '2024', e: 'Boko Haram\'s first suicide attack since 2020. ISWAP adopts drones. Lake Chad Basin fatalities: ~3,600.', t: 'escalation' },
  { y: '2025', e: 'Boko Haram escalation: 100 massacred (Feb), 60 killed (Sep) on Cameroon border. ISWAP: 250+ dead in Borno (Sep). Niger exits MNJTF. Turf war kills ~200 (Nov).', t: 'escalation' },
]

// ── THE NUMBERS ─────────────────────────────────

const NUMBERS = [
  { metric: 'Total dead (insurgency)', value: '50,000+', period: '2009–2025', source: 'CFR / ACLED / various' },
  { metric: 'Total displaced', value: '3+ million', period: 'Ongoing', source: 'UNHCR / IOM' },
  { metric: 'Lake Chad Basin fatalities (2024)', value: '~3,600', period: '2024', source: 'Africa Center for Strategic Studies' },
  { metric: 'Nigeria terrorism ranking', value: '6th globally', period: '2025', source: 'Global Terrorism Index 2025' },
  { metric: 'Boko Haram large-scale attacks (2025)', value: '6 (20+ dead each)', period: 'Jan–Nov 2025', source: 'Critical Threats / ACLED' },
  { metric: 'Same metric (2024)', value: '1', period: '2024', source: 'Critical Threats' },
  { metric: 'ISWAP estimated fighters', value: '2,000–3,000', period: '2025', source: 'ICT / Africa Center' },
  { metric: 'Chibok girls still missing', value: '~91 of 276', period: 'As of 2025', source: 'Various' },
  { metric: 'Borno attacks (Sep 2025)', value: '250+ dead, 20+ ambush attempts', period: 'Sep 2025', source: 'Military Africa / ACLED' },
  { metric: 'ISWAP-Boko Haram turf war (Nov 2025)', value: '~200 dead', period: 'Nov 2025', source: 'Military Africa' },
]

// ── INCIDENTS ───────────────────────────────────

const INCIDENTS = [
  { date: 'Apr 14, 2014', actor: 'Boko Haram', location: 'Chibok, Borno (Nigeria)', dead: '276 kidnapped', detail: '276 schoolgirls abducted from Government Secondary School. #BringBackOurGirls. ~91 still missing as of 2025.', type: 'kidnapping' },
  { date: 'Jan 3–7, 2015', actor: 'Boko Haram', location: 'Baga, Borno (Nigeria)', dead: '150–2,000', detail: 'Mass killing in Baga and surrounding towns. Estimates vary wildly. Satellite imagery showed widespread destruction. Among the deadliest single events.', type: 'massacre' },
  { date: 'Feb 19, 2018', actor: 'Boko Haram', location: 'Dapchi, Yobe (Nigeria)', dead: '110 kidnapped', detail: '110 schoolgirls abducted. Most released after negotiations. Leah Sharibu (Christian, refused to convert) still held.', type: 'kidnapping' },
  { date: 'Mar 23, 2020', actor: 'Boko Haram', location: 'Boma, Chad', dead: '92 soldiers', detail: 'Deadliest ever attack on Chadian military. 24 vehicles destroyed. Chad launched Operation Bohoma Anger in response.', type: 'military' },
  { date: 'May 2021', actor: 'ISWAP', location: 'Sambisa Forest (Nigeria)', dead: 'Shekau + unknown', detail: 'ISWAP assaults last Boko Haram stronghold. Shekau detonates suicide vest. Thousands of JAS fighters surrender or defect to ISWAP.', type: 'turning-point' },
  { date: 'Feb 2025', actor: 'Boko Haram', location: 'Cameroon-Nigeria border', dead: '100', detail: 'Boko Haram massacred civilians accused of spying for ISWAP. Retaliatory mass killing.', type: 'massacre' },
  { date: 'Sep 2025', actor: 'Boko Haram', location: 'Dar Jamal (border)', dead: '60', detail: 'Civilians killed for alleged collaboration with Nigerian military.', type: 'massacre' },
  { date: 'Sep 2025', actor: 'ISWAP', location: 'Borno State (Nigeria)', dead: '250+', detail: 'Month of ambushes and raids. 20+ separate attack attempts. Worst month in Borno in recent memory.', type: 'offensive' },
  { date: 'Nov 2025', actor: 'ISWAP vs Boko Haram', location: 'NE Nigeria', dead: '~200', detail: 'Factional turf war. Both groups fighting for territorial dominance in Lake Chad Basin.', type: 'inter-group' },
]

// ── THE SPLIT ───────────────────────────────────

const SPLIT = [
  { dimension: 'Origin', jas: 'Original Boko Haram under Shekau (post-2009)', iswap: 'Defected under al-Barnawi when ISIS rejected Shekau (2016)' },
  { dimension: 'Civilian approach', jas: 'Indiscriminate. Mass killings of Muslims and Christians. Child suicide bombers. Deliberate atrocities.', iswap: 'More selective. Avoids mass Muslim civilian killings. Provides governance services (taxation, courts, fishing rights).' },
  { dimension: 'Revenue', jas: 'Extortion, kidnapping, raiding. Parasitic model.', iswap: 'Territorial taxation, fish trade monopoly, farming levies. State-like model.' },
  { dimension: 'Territory', jas: 'Lake Chad islands, Mandara Mountains. Remote enclaves.', iswap: 'Northeastern Nigeria (Borno, Yobe). Controls towns, roads, bases.' },
  { dimension: 'Technology', jas: 'Conventional weapons, suicide vests', iswap: 'Adopting drones and IEDs (2024+). Likely tech transfer from global ISIS network.' },
  { dimension: 'Current trajectory', jas: 'Resurgent — escalating border massacres. 6 large-scale attacks in 2025 vs 1 in 2024.', iswap: 'Consolidating — absorbing foreign fighters, attacking military bases, expanding territorial control.' },
]

// ── SOURCES ─────────────────────────────────────

const SOURCES = [
  { org: 'Africa Center for Strategic Studies', doc: 'Militant Islamist Groups 2025 / Africa\'s Evolving Threat' },
  { org: 'ACLED', doc: 'Methodology for Coding Boko Haram and ISWAP Factions (updated Aug 2025)' },
  { org: 'Critical Threats (AEI)', doc: 'Africa File: Boko Haram Resurgence (Jul 2024) / Campaign Analysis (2025)' },
  { org: 'CFR', doc: 'Nigeria\'s Battle with Boko Haram / Global Conflict Tracker' },
  { org: 'Hudson Institute', doc: 'The Origins of Boko Haram — And Why It Matters' },
  { org: 'ICT (Int\'l Institute for Counter-Terrorism)', doc: 'The Rise of the Islamic State in Africa (Oct 2025)' },
  { org: 'Global Terrorism Index 2025', doc: 'Institute for Economics and Peace' },
  { org: 'UN Security Council', doc: '1267/1989/2253 Sanctions Committee — Boko Haram Listing' },
  { org: 'US Dept. of State / NCTC', doc: 'Boko Haram FTO Designation / Country Reports on Terrorism' },
  { org: 'Military Africa', doc: 'Jihadist Activities Spread Across Africa\'s Sahel (Nov 2025)' },
  { org: 'Britannica', doc: 'Boko Haram: History, Meaning, Insurgency & Facts' },
]

// ── HELPERS ──────────────────────────────────────

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left py-2.5 pr-3 text-[9px] uppercase tracking-[0.08em] text-[#737373] font-semibold">{children}</th>
}
function Td({ children, bold }: { children: React.ReactNode; bold?: boolean }) {
  return <td className={`py-2.5 pr-3 text-[12px] leading-snug ${bold ? 'text-[#0a0a0a] font-semibold' : 'text-[#525252]'}`}>{children}</td>
}

// ── MAP MARKERS ─────────────────────────────────

const MAP_MARKERS = [
  { name: 'Maiduguri (origin)', coords: [13.16, 11.85] as [number, number], color: '#0a0a0a', detail: 'Founded here 2002. Borno State capital. Epicenter of conflict.' },
  { name: 'ISWAP — Borno/Yobe', coords: [13.5, 12.2] as [number, number], color: '#DC2626', detail: 'Core ISWAP territory. Controls towns and bases.' },
  { name: 'Boko Haram — Lake Chad', coords: [14.0, 13.0] as [number, number], color: '#991B1B', detail: 'Lake Chad islands faction. Remote enclaves.' },
  { name: 'Boko Haram — Mandara Mtns', coords: [13.5, 10.5] as [number, number], color: '#991B1B', detail: 'Cameroon-Nigeria border faction. Escalating 2025.' },
  { name: 'Chibok', coords: [12.82, 10.89] as [number, number], color: '#525252', detail: '276 schoolgirls abducted Apr 2014. ~91 still missing.' },
  { name: 'Sambisa Forest', coords: [13.3, 11.1] as [number, number], color: '#525252', detail: 'Last Shekau stronghold. ISWAP assault May 2021. Shekau killed.' },
  { name: 'ISSP Lakurawa — Sokoto/Kebbi', coords: [5.0, 12.5] as [number, number], color: '#B45309', detail: 'ISSP subgroup expanding from Niger. Meeting ISWAP from the east. Conflicts merging.' },
  { name: 'Diffa (Niger)', coords: [12.6, 13.3] as [number, number], color: '#DC2626', detail: 'ISWAP operations in Niger. Niger exited MNJTF Mar 2025.' },
]

export function TheLakeOfFireContent() {
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
      const map = new mapboxgl.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [12, 12], zoom: 5.0, pitch: 0, interactive: true, attributionControl: false,
      })
      mapRef.current = map
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        MAP_MARKERS.forEach((m) => {
          const el = document.createElement('div')
          const sz = m.color === '#525252' || m.color === '#0a0a0a' ? 8 : 12
          el.style.cssText = `width:${sz}px;height:${sz}px;border-radius:50%;background:${m.color};border:2px solid ${m.color}40;box-shadow:0 0 8px ${m.color}50;cursor:pointer;`
          new mapboxgl.Marker(el).setLngLat(m.coords).setPopup(
            new mapboxgl.Popup({ offset: 10, maxWidth: '260px', closeButton: false }).setHTML(
              `<div style="font-family:system-ui;padding:4px 0;"><p style="font-size:13px;font-weight:700;margin:0 0 4px;">${m.name}</p><p style="font-size:11px;color:#525252;margin:0;">${m.detail}</p></div>`
            )
          ).addTo(map)
        })
      })
    }
    document.head.appendChild(script)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="bg-white text-[#262626] pt-16">

      <section className="max-w-[1000px] mx-auto px-6 md:px-10 pt-16 pb-10">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#991B1B] mb-4 font-semibold">Data Module · Security &amp; Conflict</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">The Lake of Fire</h1>
        <p className="font-serif text-[clamp(1.1rem,2.5vw,1.5rem)] text-[#525252] italic mt-3">Boko Haram, ISWAP &amp; the Lake Chad Basin · 2002–Present</p>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {[['50,000+', 'Dead since 2009'], ['3M+', 'Displaced'], ['~3,600', 'Fatalities (2024)'], ['276', 'Chibok girls kidnapped (91 still missing)'], ['23 years', 'Africa\'s longest jihadi insurgency']].map(([v, l]) => (
            <div key={l}><p className="font-serif text-[28px] md:text-[32px] italic text-[#0a0a0a] leading-none">{v}</p><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mt-1 max-w-[180px]">{l}</p></div>
          ))}
        </div>
      </section>

      <section className="relative">
        <div ref={mapContainer} style={{ width: '100%', height: '50vh', minHeight: 380 }} />
        <div className="flex gap-4 flex-wrap px-6 md:px-10 mt-3">
          {[['Boko Haram (JAS)', '#991B1B'], ['ISWAP (ISIS)', '#DC2626'], ['ISSP Lakurawa expansion', '#B45309'], ['Key locations', '#525252']].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /><span className="text-[9px] uppercase tracking-[0.08em] text-[#737373]">{l}</span></div>
          ))}
        </div>
      </section>

      {/* ACTORS */}
      <section className="border-t border-[#e5e5e5] mt-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · Actor Database</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">Two factions of the same war. One original. One reborn.</h2>
          <div className="space-y-8">
            {ACTORS.map((a) => (
              <div key={a.name} className="border border-[#e5e5e5] p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div><h3 className="text-[18px] font-bold text-[#0a0a0a]">{a.name}</h3><p className="text-[11px] text-[#737373] mt-0.5">{a.full} — {a.meaning}</p></div>
                  <span className="text-[9px] uppercase tracking-[0.06em] px-2 py-1 rounded font-semibold" style={{ color: a.color, background: a.color + '15' }}>{a.affiliation}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[12px]">
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Founded</p><p className="text-[#0a0a0a] font-semibold">{a.founded} (insurgency: {a.insurgency})</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Personnel</p><p className="text-[#0a0a0a] font-semibold">{a.personnel}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Founder</p><p className="text-[#525252]">{a.founder}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Current leader</p><p className="text-[#525252]">{a.leader}</p></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-[12px]">
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Territory</p><p className="text-[#525252] leading-snug">{a.territory}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Revenue</p><p className="text-[#525252] leading-snug">{a.revenue}</p></div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f0f0f0]"><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Status (2025)</p><p className="text-[13px] text-[#0a0a0a] font-semibold">{a.status}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SPLIT */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Split</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Same origin. Different wars.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">ISIS rejected Shekau in 2016 for being too brutal — even by ISIS standards. The split created two groups that now fight each other as much as they fight the state. In November 2025, a turf war between them killed ~200.</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr className="border-b-2 border-[#0a0a0a]">
                <Th>Dimension</Th>
                <th className="text-left py-2.5 pr-3 text-[9px] uppercase tracking-[0.08em] font-semibold" style={{ color: '#991B1B' }}>Boko Haram (JAS)</th>
                <th className="text-left py-2.5 pr-3 text-[9px] uppercase tracking-[0.08em] font-semibold" style={{ color: '#DC2626' }}>ISWAP</th>
              </tr></thead>
              <tbody>
                {SPLIT.map((r) => (
                  <tr key={r.dimension} className="border-b border-[#e5e5e5] align-top">
                    <Td bold>{r.dimension}</Td>
                    <td className="py-2.5 pr-3 text-[11px] text-[#525252] leading-snug max-w-[260px]">{r.jas}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-[#525252] leading-snug max-w-[260px]">{r.iswap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Numbers</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">Twenty-three years of data</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr className="border-b-2 border-[#0a0a0a]"><Th>Metric</Th><Th>Value</Th><Th>Period</Th><Th>Source</Th></tr></thead>
              <tbody>
                {NUMBERS.map((n, i) => (
                  <tr key={i} className="border-b border-[#e5e5e5]">
                    <Td>{n.metric}</Td><Td bold>{n.value}</Td><Td>{n.period}</Td><td className="py-2.5 text-[10px] text-[#737373]">{n.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* INCIDENTS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · Incident Log</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">2014 — 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr className="border-b-2 border-[#0a0a0a]"><Th>Date</Th><Th>Actor</Th><Th>Location</Th><Th>Dead/Impact</Th><Th>Type</Th><Th>Detail</Th></tr></thead>
              <tbody>
                {INCIDENTS.map((inc, i) => (
                  <tr key={i} className="border-b border-[#e5e5e5] align-top">
                    <td className="py-2.5 pr-3 text-[11px] text-[#0a0a0a] font-mono font-semibold whitespace-nowrap">{inc.date}</td>
                    <Td bold>{inc.actor}</Td><Td>{inc.location}</Td>
                    <td className="py-2.5 pr-3 text-[12px] font-semibold" style={{ color: '#991B1B' }}>{inc.dead}</td>
                    <td className="py-2.5 pr-3"><span className="text-[9px] uppercase tracking-[0.06em] px-1.5 py-0.5 rounded font-semibold" style={{
                      color: inc.type === 'massacre' ? '#991B1B' : inc.type === 'kidnapping' ? '#7C3AED' : inc.type === 'turning-point' ? '#0369A1' : inc.type === 'offensive' ? '#DC2626' : inc.type === 'inter-group' ? '#525252' : '#B45309',
                      background: inc.type === 'massacre' ? '#FEF2F2' : inc.type === 'kidnapping' ? '#F5F3FF' : inc.type === 'turning-point' ? '#F0F9FF' : inc.type === 'offensive' ? '#FEF2F2' : inc.type === 'inter-group' ? '#F5F5F5' : '#FEF3C7',
                    }}>{inc.type}</span></td>
                    <td className="py-2.5 text-[11px] text-[#525252] leading-snug max-w-[280px]">{inc.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · Timeline</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-12">2002 — 2025</h2>
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#d4d4d4]" />
            {TIMELINE.map((t, i) => {
              const color = t.t === 'origin' ? '#525252' : t.t === 'turning' ? '#0369A1' : t.t === 'attack' ? '#991B1B' : t.t === 'escalation' ? '#DC2626' : '#B45309'
              return (
                <div key={i} className="flex gap-4 mb-5">
                  <div className="shrink-0"><div className="w-[14px] h-[14px] rounded-full border-2" style={{ borderColor: color, background: t.t === 'attack' ? color : '#fff' }} /></div>
                  <div><p className="font-mono text-[11px] font-bold mb-1" style={{ color }}>{t.y}</p><p className="text-[13px] text-[#525252] leading-relaxed">{t.e}</p></div>
                </div>
              )
            })}
          </div>
          <div className="flex gap-4 flex-wrap mt-6 pt-4 border-t border-[#e5e5e5]">
            {[['Origin', '#525252'], ['Turning point', '#0369A1'], ['Major attack', '#991B1B'], ['Escalation', '#DC2626'], ['Consolidation', '#B45309']].map(([l, c]) => (
              <div key={l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /><span className="text-[9px] uppercase tracking-[0.08em] text-[#737373]">{l}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTED INTELLIGENCE */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">006 · Connected Intelligence</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern.</h2>
          <div className="space-y-10">
            {[
              { to: 'The Atlantic Spine', link: '/stories/the-atlantic-spine', insight: 'The Nigeria-Morocco Gas Pipeline begins in Lagos — Nigeria\'s economic heart. But northeastern Nigeria, where ISWAP operates, sits on the pipeline\'s critical early corridor. ISWAP\'s expansion into Sokoto and Kebbi states (via ISSP\'s Lakurawa) brings the insurgency closer to Nigeria\'s northwest — where the pipeline route runs. 23 years of Boko Haram have not been contained. They\'ve migrated.' },
              { to: 'The Sahel War', link: '/stories/the-sahel-war', insight: 'ISSP\'s Lakurawa subgroup is expanding from Niger into Nigeria\'s Sokoto and Kebbi — meeting ISWAP from the east. The Sahel war and the Lake Chad war are merging into a single interconnected conflict zone. Previously distinct conflicts are becoming one theater. ACLED: "Previously distinct conflicts in the Sahel and coastal West Africa are merging."' },
              { to: 'The Blood Gold', link: '/stories/the-blood-gold', insight: 'Wagner/Africa Corps deployed to Mali, Burkina Faso, Niger — the same countries where ISSP operates and where Lakurawa is expanding into Nigeria. The junta security model (invite Russia, expel the West) is failing across the entire region. Niger exited the MNJTF in March 2025, further weakening Lake Chad Basin coordination.' },
            ].map((c, i) => (
              <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#991B1B' }}>
                <span className="text-[10px] text-[#991B1B] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
                <p className="text-[14px] text-white/60 leading-relaxed max-w-[560px] mt-2">{c.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOURCES */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-8">Sources &amp; Attribution</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SOURCES.map((s, i) => (<div key={i} className="text-[11px]"><span className="text-[#0a0a0a] font-semibold">{s.org}</span> <span className="text-[#737373]">— {s.doc}</span></div>))}
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
