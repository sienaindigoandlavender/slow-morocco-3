'use client'

import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════
   THE SAHEL WAR
   JNIM, ISSP & the Collapse of the Center — 2012–Present
   Data Module · WHITE BG · Connected Intelligence
   ═══════════════════════════════════════════════════ */

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// ── ACTORS ──────────────────────────────────────

const ACTORS = [
  { name: 'JNIM', full: 'Jama\'at Nusrat al-Islam wal-Muslimin', affiliation: 'Al-Qaeda', formed: '2017 (merger of AQIM, Ansar Dine, Katiba Macina, al-Murabitun)', personnel: '~5,000+', leader: 'Iyad ag Ghali', ideology: 'Salafi-jihadist; quasi-governance model', territory: 'Central/northern Mali, northern/western Burkina Faso, southwestern Niger, expanding into Benin & Togo', revenue: 'Taxation, livestock raids, road tolls, fuel blockades, kidnapping for ransom', civilianRate: '71% of political violence events target civilians (ACLED, Mali)', status: 'Expanding — encircling Bamako, blockading Mali\'s western supply corridor, consolidating in Benin', color: '#B45309' },
  { name: 'ISSP', full: 'Islamic State Sahel Province', affiliation: 'ISIS', formed: '2015 as ISGS → provincial status Mar 2022', personnel: '1,000–3,000', leader: 'Undisclosed (post-Abu Huzeifa, killed Apr 2024)', ideology: 'Salafi-jihadist; territorial conquest through mass violence', territory: 'Tri-border (Mali-Burkina-Niger Liptako-Gourma), expanding into Niger-Nigeria border (Sokoto, Kebbi)', revenue: 'Territorial taxation, gold mining, cross-border smuggling', civilianRate: '52% targeting rate in CAR-style independent operations (ACLED); indiscriminate massacres', status: 'Restructuring — new military zones, southward expansion via Lakurawa subgroup into Nigeria', color: '#DC2626' },
  { name: 'Wagner / Africa Corps', full: 'Russian paramilitary (rebranded post-Prigozhin)', affiliation: 'Russian state (MoD/GRU)', formed: 'Mali: Dec 2021. Burkina Faso: Jan 2024. Niger: Apr 2024.', personnel: '~1,500 in Mali + expanding', leader: 'Russian MoD chain of command', ideology: 'Resource extraction; regime protection', territory: 'Deployed at invitation of AES junta governments', revenue: 'Gold, minerals, cash payments ($200M+ from Mali alone)', civilianRate: 'Mali: 76% of civilian fatalities linked to armed forces + Russian allies (2024)', status: 'Wagner withdrew Jun 2025 → Africa Corps replaced. Same personnel, same violence.', color: '#525252' },
]

// ── FATALITY DATA ───────────────────────────────

const FATALITIES = [
  { year: '2019', sahel: '~4,000', bfShare: '—', note: 'Sahel becomes deadliest theater for first time' },
  { year: '2020', sahel: '~4,200', bfShare: '—', note: 'Mali coup #1' },
  { year: '2021', sahel: '~3,700', bfShare: '~2,400', note: 'Mali coup #2. Wagner arrives Dec.' },
  { year: '2022', sahel: '~5,600', bfShare: '~3,600', note: 'Moura massacre. Two Burkina coups. France forced out.' },
  { year: '2023', sahel: '~7,600', bfShare: '~5,200+', note: 'MINUSMA ends. Niger coup. AES formed. Record year.' },
  { year: '2024', sahel: '~10,400–11,200', bfShare: '~5,000+', note: 'Tripled since 2021. 51% of global terrorism deaths. Barsalogho (400 killed).' },
  { year: '2025 (partial)', sahel: 'On pace to exceed 2024', bfShare: '—', note: '400+ attacks / 2,900 dead (Apr–Jul alone). JNIM blockading Bamako.' },
]

// ── TERRITORIAL CONTROL ─────────────────────────

const TERRITORY = [
  { country: 'Burkina Faso', outsideControl: '~60%', displaced: '~3 million', besiegedTowns: '75+ towns under militant blockade', trend: 'Worst since conflict began. JNIM could capture Djibo if it chose (ACLED).' },
  { country: 'Mali', outsideControl: '~50%', displaced: '~400,000+', besiegedTowns: 'Kayes and Nioro blockaded (Sep 2025)', trend: 'Southern Mali falling — 30%+ increase in events in all 3 southern regions.' },
  { country: 'Niger', outsideControl: 'Expanding', displaced: '~350,000+', besiegedTowns: 'Southwestern border with Nigeria compromised', trend: 'ISSP/Lakurawa operationalizing rear bases in Nigeria.' },
  { country: 'Benin', outsideControl: 'Northern border zone', displaced: 'Growing', besiegedTowns: 'W National Park as JNIM staging ground', trend: '54 soldiers killed in single attack (Apr 2025). Deadliest ever.' },
  { country: 'Togo', outsideControl: 'Northern fringe', displaced: 'Emerging', besiegedTowns: '—', trend: '52 deaths in 2024 (vs 12 in 2023). JNIM claimed 4 attacks, 41 fatalities.' },
]

// ── THE QUASI-STATE (JNIM governance) ───────────

const GOVERNANCE = [
  { function: 'Taxation', detail: 'Zakat collection on livestock, agriculture, and commerce. Road tolls on all major transit routes.' },
  { function: 'Courts', detail: 'Sharia courts resolving disputes. Civilians report preferring JNIM adjudication over corrupt state courts in some areas.' },
  { function: 'Blockades', detail: 'Sep 2025: JNIM declared blockade on Kayes and Nioro. Banned fuel imports from Senegal, Guinea, Côte d\'Ivoire, Mauritania. National fuel stocks depleted.' },
  { function: 'Market control', detail: 'Roads and markets are primary contact points (ACLED). JNIM sells stolen livestock at markets it controls.' },
  { function: 'Abduct and release', detail: '84% of all abduct-and-release incidents in West Africa attributed to JNIM (2022–2024). Used to demonstrate power, extract compliance.' },
  { function: 'Propaganda', detail: 'Media campaigns in local languages. Claimed operations in Benin, Niger, Togo. Recruitment through local grievance.' },
]

// ── INTERVENTION COLLAPSE ───────────────────────

const INTERVENTIONS = [
  { year: '2013', event: 'Operation Serval (France) launches in Mali', type: 'deploy' },
  { year: '2013', event: 'MINUSMA (UN) deployed — 13,000 peacekeepers', type: 'deploy' },
  { year: '2014', event: 'Serval becomes Barkhane — 5,100 French troops across 5 countries', type: 'deploy' },
  { year: '2017', event: 'G5 Sahel Joint Force created', type: 'deploy' },
  { year: '2020', event: 'Mali coup #1 — Col. Goïta overthrows elected president', type: 'coup' },
  { year: '2021', event: 'Mali coup #2. Wagner Group arrives (Dec). EU sanctions follow.', type: 'coup' },
  { year: '2022', event: 'France forced out of Mali. Barkhane withdraws entirely. Two Burkina Faso coups.', type: 'exit' },
  { year: '2023', event: 'MINUSMA ends (Jun). Niger coup (Jul). AES alliance formed (Sep). France expelled from Niger & Burkina.', type: 'exit' },
  { year: '2024', event: 'AES withdraws from ECOWAS. US forces leave Niger (Sep). Africa Corps replaces Wagner.', type: 'exit' },
  { year: '2025', event: 'Wagner withdraws from Mali (Jun) → Africa Corps replaces. AES creates 5,000-soldier joint force. JNIM and ISSP control more territory than ever.', type: 'vacuum' },
]

// ── INCIDENTS ───────────────────────────────────

const INCIDENTS = [
  { date: 'Mar 27–31, 2022', actor: 'Wagner + FAMa', location: 'Moura, Mopti (Mali)', dead: '500+', detail: '~100 Wagner fighters + Malian army. 3,000 rounded up at market. Executed by shooting in back. 58 women/girls raped. OHCHR confirmed.', type: 'massacre', link: '/stories/the-blood-gold' },
  { date: 'Apr 2022', actor: 'Wagner', location: 'Gossi (Mali)', dead: '~12', detail: 'Wagner buried bodies near base, produced footage blaming French. France released satellite imagery exposing false flag.', type: 'false-flag', link: '/stories/the-blood-gold' },
  { date: 'Aug 24, 2024', actor: 'JNIM', location: 'Barsalogho (Burkina Faso)', dead: '~400', detail: 'Gunmen attacked soldiers and civilians digging defensive trenches. Largest massacre in Burkina Faso history.', type: 'massacre', link: null },
  { date: 'Aug 25, 2024', actor: 'Militants', location: 'Nouna (Burkina Faso)', dead: '26+', detail: 'Attack on a church. One day after Barsalogho.', type: 'massacre', link: null },
  { date: 'Sep 17, 2024', actor: 'JNIM', location: 'Bamako (Mali)', dead: 'Hundreds (claimed)', detail: 'Coordinated attack on military sites in the capital. First significant JNIM urban assault. Malian TV acknowledged "some" deaths.', type: 'urban', link: null },
  { date: 'Jul 25–27, 2024', actor: 'Tuareg vs Wagner', location: 'Tinzaouaten (Mali)', dead: '20–80 Wagner', detail: 'CSP-DPA rebels ambush Wagner-Malian convoy. Wagner\'s worst military loss in Mali. Ukraine claimed assistance.', type: 'military', link: '/stories/the-blood-gold' },
  { date: 'Jan 2025', actor: 'JNIM', location: 'Northern Benin', dead: '28 soldiers', detail: 'Attacks near Burkina/Niger border. Benin increasingly drawn into the Sahel conflict zone.', type: 'expansion', link: null },
  { date: 'Apr 17, 2025', actor: 'JNIM', location: 'W National Park (Benin)', dead: '54 soldiers', detail: 'Deadliest single jihadist attack in Benin\'s history.', type: 'expansion', link: null },
  { date: 'Sep–Nov 2025', actor: 'JNIM', location: 'Kayes region (Mali)', dead: 'Multiple', detail: 'Fuel blockade. Hit tanker convoys from the west. More strikes in 2025 than prior 5 years combined. National fuel stocks depleted. Mass evacuations.', type: 'siege', link: '/stories/the-atlantic-spine' },
  { date: 'Jun–Jul 2025', actor: 'ISSP vs JNIM', location: 'Burkina Faso Sahel region', dead: '21+ militants', detail: 'Deadliest spate of inter-jihadi clashes since 2022. 8 clashes in 5 weeks. More clashes through Nov 2025 than all of 2024.', type: 'inter-group', link: null },
  { date: '2025 (ongoing)', actor: 'Wagner/Africa Corps + FAMa', location: 'Central/Northern Mali', dead: 'Dozens', detail: 'Ongoing summary executions of ethnic Fulani. 12+ executions, 81 disappearances, 30 homes burned documented (HRW Jul 2025). Forbidden Stories: systematic torture in former UN camps.', type: 'massacre', link: '/stories/the-blood-gold' },
]

// ── SOURCES ─────────────────────────────────────

const SOURCES = [
  { org: 'Africa Center for Strategic Studies', doc: 'Militant Islamist Groups 2025 / Africa\'s Constantly Evolving Threat' },
  { org: 'ACLED', doc: 'Conflict in the Sahel / IS Sahel Regional Expansion / Civilian Targeting Trends' },
  { org: 'ACLED', doc: 'New Frontlines: Jihadist Expansion Reshaping Benin-Niger-Nigeria Borderlands' },
  { org: 'Critical Threats (AEI)', doc: 'Salafi Jihadi Areas of Operation in West Africa — Campaign Analysis (2025)' },
  { org: 'Global Terrorism Index 2025', doc: 'Institute for Economics and Peace' },
  { org: 'New Lines Institute', doc: 'Preventing Another al-Qaeda Quasi-State: Countering JNIM\'s Civilian Engagement' },
  { org: 'UN Security Council', doc: 'Analytical Support & Sanctions Monitoring Team — ISIL/Da\'esh Reports' },
  { org: 'Security Council Report', doc: 'West Africa & the Sahel Monthly Forecasts (2024–2025)' },
  { org: 'OHCHR', doc: 'Moura Fact-Finding Mission Report (May 2023)' },
  { org: 'Human Rights Watch', doc: 'Mali: Army, Wagner Group Disappear, Execute Civilians (Jul 2025)' },
  { org: 'Forbidden Stories', doc: 'Wagner Detention and Torture Investigation (Jun 2025)' },
  { org: 'CFR Global Conflict Tracker', doc: 'Violent Extremism in the Sahel' },
]

// ── HELPERS ──────────────────────────────────────

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left py-2.5 pr-3 text-[9px] uppercase tracking-[0.08em] text-[#737373] font-semibold">{children}</th>
}
function Td({ children, bold }: { children: React.ReactNode; bold?: boolean }) {
  return <td className={`py-2.5 pr-3 text-[12px] leading-snug ${bold ? 'text-[#0a0a0a] font-semibold' : 'text-[#525252]'}`}>{children}</td>
}

// ── MARKERS ─────────────────────────────────────

const MAP_MARKERS = [
  { name: 'JNIM — Central Mali', coords: [-4.0, 14.5] as [number, number], color: '#B45309', detail: 'Core territory. Mopti, Ségou, Tombouctou.' },
  { name: 'JNIM — Western expansion', coords: [-10.5, 13.0] as [number, number], color: '#B45309', detail: 'Kayes blockade (Sep 2025). Expanding toward Senegal/Guinea border.' },
  { name: 'JNIM — Burkina Faso', coords: [-1.5, 13.5] as [number, number], color: '#B45309', detail: '60% of country outside state control. 75+ towns blockaded.' },
  { name: 'JNIM — Benin/Togo', coords: [1.8, 11.0] as [number, number], color: '#B45309', detail: 'Staging from W National Park. 54 soldiers killed Apr 2025.' },
  { name: 'ISSP — Tri-border', coords: [0.5, 14.5] as [number, number], color: '#DC2626', detail: 'Liptako-Gourma. Core zone. Menaka-Anderamboukane.' },
  { name: 'ISSP — Niger-Nigeria border', coords: [4.0, 13.0] as [number, number], color: '#DC2626', detail: 'Lakurawa subgroup. Sokoto/Kebbi (Nigeria). Operational since 2024.' },
  { name: 'Wagner/Africa Corps — Bamako', coords: [-8.0, 12.6] as [number, number], color: '#525252', detail: 'Deployed Dec 2021. Withdrew Jun 2025 → Africa Corps.' },
  { name: 'Bamako (capital, encircled)', coords: [-7.98, 12.63] as [number, number], color: '#0a0a0a', detail: 'JNIM encircling from north, east, and west. 130 road attacks in 2025 (10x 2021).' },
]

// ── PAGE ────────────────────────────────────────

export function TheSahelWarContent() {
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
        center: [-3, 13], zoom: 4.2, pitch: 0, interactive: true, attributionControl: false,
      })
      mapRef.current = map
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        MAP_MARKERS.forEach((m) => {
          const el = document.createElement('div')
          const sz = m.color === '#0a0a0a' ? 8 : 12
          el.style.cssText = `width:${sz}px;height:${sz}px;border-radius:50%;background:${m.color};border:2px solid ${m.color}40;box-shadow:0 0 8px ${m.color}50;cursor:pointer;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '260px', closeButton: false }).setHTML(
            `<div style="font-family:system-ui;padding:4px 0;"><p style="font-size:13px;font-weight:700;margin:0 0 4px;">${m.name}</p><p style="font-size:11px;color:#525252;margin:0;">${m.detail}</p></div>`
          )
          new mapboxgl.Marker(el).setLngLat(m.coords).setPopup(popup).addTo(map)
        })
      })
    }
    document.head.appendChild(script)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="bg-white text-[#262626] pt-16">

      {/* ═══ HEADER ═══ */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 pt-16 pb-10">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#991B1B] mb-4 font-semibold">Data Module · Security &amp; Conflict</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">The Sahel War</h1>
        <p className="font-serif text-[clamp(1.1rem,2.5vw,1.5rem)] text-[#525252] italic mt-3">JNIM, ISSP &amp; the Collapse of the Center · 2012–Present</p>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {[
            ['10,400+', 'Dead in Sahel (2024)'],
            ['51%', 'Of global terrorism deaths'],
            ['77,000+', 'Dead since 2019 (AFP/ACLED)'],
            ['60%', 'Of Burkina Faso outside state control'],
            ['130', 'Road attacks near Bamako (2025) — 10× since 2021'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-serif text-[28px] md:text-[32px] italic text-[#0a0a0a] leading-none">{v}</p>
              <p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mt-1 max-w-[180px]">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section className="relative">
        <div ref={mapContainer} style={{ width: '100%', height: '55vh', minHeight: 400 }} />
        <div className="flex gap-4 flex-wrap px-6 md:px-10 mt-3">
          {[['JNIM (Al-Qaeda)', '#B45309'], ['ISSP (ISIS)', '#DC2626'], ['Wagner/Africa Corps', '#525252'], ['Capital (encircled)', '#0a0a0a']].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              <span className="text-[9px] uppercase tracking-[0.08em] text-[#737373]">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TABLE 1: ACTORS ═══ */}
      <section className="border-t border-[#e5e5e5] mt-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · Actor Database</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">Three forces. One war zone. Zero winners.</h2>
          <div className="space-y-8">
            {ACTORS.map((a) => (
              <div key={a.name} className="border border-[#e5e5e5] p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#0a0a0a]">{a.name}</h3>
                    <p className="text-[11px] text-[#737373] mt-0.5">{a.full}</p>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.06em] px-2 py-1 rounded font-semibold" style={{
                    color: a.color, background: a.color + '15',
                  }}>{a.affiliation}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[12px]">
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Personnel</p><p className="text-[#0a0a0a] font-semibold">{a.personnel}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Leader</p><p className="text-[#525252]">{a.leader}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Formed</p><p className="text-[#525252]">{a.formed}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Civilian targeting</p><p className="text-[#991B1B] font-semibold">{a.civilianRate}</p></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-[12px]">
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Territory</p><p className="text-[#525252] leading-snug">{a.territory}</p></div>
                  <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Revenue</p><p className="text-[#525252] leading-snug">{a.revenue}</p></div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f0f0f0]">
                  <p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Status (2025)</p>
                  <p className="text-[13px] text-[#0a0a0a] font-semibold">{a.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TABLE 2: FATALITIES BY YEAR ═══ */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · Fatality Escalation</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Tripled since 2021</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">
            Every year since <span className="underline underline-offset-2">Wagner</span> arrived has been deadlier than the last. The juntas invited
            Russia to fight terrorism. The terrorism tripled.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr className="border-b-2 border-[#0a0a0a]">
                <Th>Year</Th><Th>Sahel fatalities</Th><Th>Burkina Faso share</Th><Th>Context</Th>
              </tr></thead>
              <tbody>
                {FATALITIES.map((f) => (
                  <tr key={f.year} className="border-b border-[#e5e5e5]">
                    <td className="py-2.5 pr-3 font-mono text-[12px] font-bold text-[#0a0a0a]">{f.year}</td>
                    <td className="py-2.5 pr-3 text-[14px] font-bold" style={{ color: '#991B1B' }}>{f.sahel}</td>
                    <Td>{f.bfShare}</Td>
                    <td className="py-2.5 text-[11px] text-[#525252] leading-snug">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[#737373] mt-4">Sources: Africa Center for Strategic Studies, ACLED, AFP. Sahel fatality data likely underreported due to junta media suppression post-coups.</p>
        </div>
      </section>

      {/* ═══ TABLE 3: TERRITORIAL CONTROL ═══ */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · Territorial Control</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">The states are shrinking</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr className="border-b-2 border-[#0a0a0a]">
                <Th>Country</Th><Th>Territory outside state control</Th><Th>Displaced</Th><Th>Siege conditions</Th><Th>Trend</Th>
              </tr></thead>
              <tbody>
                {TERRITORY.map((t) => (
                  <tr key={t.country} className="border-b border-[#e5e5e5] align-top">
                    <Td bold>{t.country}</Td>
                    <td className="py-2.5 pr-3 text-[14px] font-bold" style={{ color: '#991B1B' }}>{t.outsideControl}</td>
                    <Td>{t.displaced}</Td>
                    <Td>{t.besiegedTowns}</Td>
                    <td className="py-2.5 text-[11px] text-[#525252] leading-snug max-w-[220px]">{t.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ TABLE 4: JNIM QUASI-STATE ═══ */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Quasi-State</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">JNIM doesn't just fight. It governs.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">
            Unlike ISIS affiliates that rely on mass violence, JNIM builds parallel governance
            structures — taxation, courts, market control, blockades. New Lines Institute analysis
            of ACLED data (2022–2024) shows JNIM's civilian engagement is "surprisingly non-lethal"
            compared to its military capabilities. It doesn't need to kill everyone. It needs to
            replace the state.
          </p>
          <div className="space-y-0">
            {GOVERNANCE.map((g, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5 border-b border-[#e5e5e5]">
                <div className="md:col-span-3">
                  <p className="text-[13px] text-[#0a0a0a] font-semibold">{g.function}</p>
                </div>
                <div className="md:col-span-9">
                  <p className="text-[13px] text-[#525252] leading-relaxed">{g.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TABLE 5: INCIDENT LOG ═══ */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · Incident Log</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">2022 — 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr className="border-b-2 border-[#0a0a0a]">
                <Th>Date</Th><Th>Actor</Th><Th>Location</Th><Th>Dead</Th><Th>Type</Th><Th>Detail</Th><Th>Connected</Th>
              </tr></thead>
              <tbody>
                {INCIDENTS.map((inc, i) => (
                  <tr key={i} className="border-b border-[#e5e5e5] align-top">
                    <td className="py-2.5 pr-3 text-[11px] text-[#0a0a0a] font-mono font-semibold whitespace-nowrap">{inc.date}</td>
                    <Td bold>{inc.actor}</Td>
                    <Td>{inc.location}</Td>
                    <td className="py-2.5 pr-3 text-[12px] font-semibold" style={{ color: '#991B1B' }}>{inc.dead}</td>
                    <td className="py-2.5 pr-3">
                      <span className="text-[9px] uppercase tracking-[0.06em] px-1.5 py-0.5 rounded font-semibold" style={{
                        color: inc.type === 'massacre' ? '#991B1B' : inc.type === 'false-flag' ? '#7C3AED' : inc.type === 'urban' ? '#7C3AED' : inc.type === 'expansion' ? '#B45309' : inc.type === 'siege' ? '#0369A1' : inc.type === 'military' ? '#2563EB' : '#525252',
                        background: inc.type === 'massacre' ? '#FEF2F2' : inc.type === 'false-flag' ? '#F5F3FF' : inc.type === 'urban' ? '#F5F3FF' : inc.type === 'expansion' ? '#FEF3C7' : inc.type === 'siege' ? '#F0F9FF' : inc.type === 'military' ? '#EFF6FF' : '#F5F5F5',
                      }}>{inc.type}</span>
                    </td>
                    <td className="py-2.5 pr-3 text-[11px] text-[#525252] leading-snug max-w-[260px]">{inc.detail}</td>
                    <td className="py-2.5 text-[10px]">
                      {inc.link ? (
                        <span className="text-[#991B1B] underline">
                          → {inc.link.includes('blood') ? 'Blood Gold' : 'Atlantic Spine'}
                        </span>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ INTERVENTION TIMELINE ═══ */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 · The Vacuum</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-12">Everyone left. The territory filled.</h2>
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#d4d4d4]" />
            {INTERVENTIONS.map((t, i) => {
              const color = t.type === 'deploy' ? '#047857' : t.type === 'coup' ? '#B45309' : t.type === 'exit' ? '#991B1B' : '#0a0a0a'
              return (
                <div key={i} className="flex gap-4 mb-5">
                  <div className="shrink-0"><div className="w-[14px] h-[14px] rounded-full border-2" style={{ borderColor: color, background: t.type === 'vacuum' ? color : '#fff' }} /></div>
                  <div>
                    <p className="font-mono text-[11px] font-bold mb-1" style={{ color }}>{t.year}</p>
                    <p className="text-[13px] text-[#525252] leading-relaxed">{t.event}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ CONNECTED INTELLIGENCE ═══ */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">007 · Connected Intelligence</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern.</h2>
          <div className="space-y-10">
            {[
              { to: 'The Blood Gold', link: '/stories/the-blood-gold', insight: 'Wagner/Africa Corps operates in the same countries where JNIM and ISSP are expanding. In Mali, junta + Russian forces killed more civilians (76% of fatalities) than jihadists in 2024. ACLED: security force violence against civilians increased 76% between 2022–2024. Violence drives recruitment. The counterterrorism operation became the recruitment operation.' },
              { to: 'The Atlantic Spine', link: '/stories/the-atlantic-spine', insight: 'The Nigeria-Morocco Gas Pipeline passes through JNIM territory. The Trans-Saharan Pipeline crosses Niger — an AES junta state. JNIM\'s fuel blockade of Kayes (Sep 2025) demonstrated that a jihadi group can cut an entire country\'s energy supply. Pipeline infrastructure in the Sahel is a target, not just a corridor.' },
              { to: 'The Lake of Fire', link: '/stories/the-lake-of-fire', insight: 'ISSP\'s Lakurawa subgroup is expanding from Niger into Nigeria\'s Sokoto and Kebbi states — meeting ISWAP and Boko Haram from the other direction. The Sahel war and the Lake Chad war are merging into a single interconnected conflict zone.' },
            ].map((c, i) => (
              <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#991B1B' }}>
                <span className="text-[10px] text-[#991B1B] uppercase tracking-[0.1em] underline font-semibold">{c.to}</span>
                <p className="text-[14px] text-white/60 leading-relaxed max-w-[560px] mt-2">{c.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-8">Sources &amp; Attribution</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SOURCES.map((s, i) => (
              <div key={i} className="text-[11px]">
                <span className="text-[#0a0a0a] font-semibold">{s.org}</span> <span className="text-[#737373]">— {s.doc}</span>
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
