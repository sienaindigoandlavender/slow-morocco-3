'use client'

import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════
   THE BLOOD GOLD
   Wagner Group / Africa Corps — Africa Operations Dataset
   Knowledge Series · Data-Driven · WHITE BG
   ═══════════════════════════════════════════════════ */

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// ── OPERATIONS DATABASE ─────────────────────────

const OPERATIONS = [
  { country: 'Sudan', entered: 2017, personnel: '300–1,000', patron: 'al-Bashir → SAF/RSF junta', resource: 'Gold, oil refinery, uranium', goldValue: '$1.9B (32.7t smuggled, 2022–23)', civilianEvents: '—', civilianDead: 'Scores (miners, Darfur)', status: 'Active (Africa Corps)', shellCo: 'M Invest, Meroe Gold', coords: [32.53, 15.60] as [number, number] },
  { country: 'Central African Republic', entered: 2018, personnel: '1,500–2,100', patron: 'Pres. Touadéra', resource: 'Gold, diamonds, timber', goldValue: '~$1B/year (tax-exempt)', civilianEvents: '180 targeting events (ACLED, since Dec 2020)', civilianDead: '900+ (since 2020)', status: 'Active (Africa Corps)', shellCo: 'Midas Resources, Lobaye Invest, Diamville', coords: [18.56, 4.36] as [number, number] },
  { country: 'Mali', entered: 2021, personnel: '~1,000', patron: 'Col. Goïta (junta)', resource: 'Limited mining; $200M+ cash payments', goldValue: '$200M+ (cash from junta)', civilianEvents: '71% of Wagner political violence targeted civilians (ACLED)', civilianDead: '500+ (Moura alone); 480+ (joint ops total)', status: 'Wagner withdrew Jun 2025 → Africa Corps', shellCo: 'Africa Politology', coords: [-8.0, 12.65] as [number, number] },
  { country: 'Libya', entered: 2019, personnel: '800–1,200', patron: 'Khalifa Haftar (LNA)', resource: 'Oil infrastructure, strategic bases', goldValue: '—', civilianEvents: 'Landmines in civilian areas', civilianDead: 'Unknown (landmines ongoing)', status: 'Active — receiving Syria equipment', shellCo: '—', coords: [14.42, 27.05] as [number, number] },
  { country: 'Mozambique', entered: 2019, personnel: '~200', patron: 'Government', resource: 'Gas infrastructure (Cabo Delgado)', goldValue: '—', civilianEvents: '—', civilianDead: 'Minimal', status: 'Withdrawn (heavy casualties)', shellCo: '—', coords: [40.35, -12.35] as [number, number] },
  { country: 'Burkina Faso', entered: 2024, personnel: '100–300+', patron: 'Capt. Traoré (junta)', resource: 'Gold mining, regime protection', goldValue: 'Emerging', civilianEvents: 'Emerging reports', civilianDead: 'Under documentation', status: 'Active (Africa Corps)', shellCo: '—', coords: [-1.52, 12.37] as [number, number] },
  { country: 'Niger', entered: 2024, personnel: '100+', patron: 'Gen. Tchiani (junta)', resource: 'Uranium, gold', goldValue: 'Emerging', civilianEvents: 'Early stage', civilianDead: 'Under documentation', status: 'Active (Africa Corps, Airbase 101)', shellCo: '—', coords: [2.11, 13.51] as [number, number] },
]

// ── GOLD ECONOMICS ─────────────────────────────

const GOLD_DATA = [
  { metric: 'Total gold revenue since Ukraine invasion', value: '$2.5B+', period: 'Feb 2022 – Dec 2023', source: 'Blood Gold Report / Consumer Choice Center' },
  { metric: 'Sudan — gold smuggled', value: '32.7 metric tons ($1.9B)', period: 'Feb 2022 – Feb 2023', source: 'CNN / Africa Defense Forum' },
  { metric: 'CAR — annual mining revenue', value: '~$1B/year', period: 'Ongoing since 2018', source: 'CSIS / Africa Defense Forum' },
  { metric: 'CAR — Wagner tax rate', value: '0%', period: 'Per government deal', source: 'Africa Defense Forum' },
  { metric: 'Mali — cash payments to Wagner', value: '$200M+', period: '2021–2025', source: 'Blood Gold Report' },
  { metric: 'Mali — monthly junta mining income (4 companies)', value: '$10.8M+/month', period: 'Cash', source: 'Transparency International Russia' },
  { metric: 'Ndassima mine (CAR) permit', value: '25 years + renewable', period: 'Midas Resources', source: 'Politico / CAR Mining Code' },
  { metric: 'Sudan — gold flights under false manifests', value: '16 planes (2021–2022)', period: 'Via Syria airbase', source: 'CNN investigation' },
  { metric: 'Laundering route', value: 'Mine → Syria → UAE → Russia', period: 'Ongoing', source: 'Blood Gold Report / NPR' },
]

// ── ACLED CIVILIAN TARGETING ────────────────────

const ACLED_DATA = [
  { context: 'CAR — Wagner civilian targeting rate (independent ops)', value: '70%', comparison: 'vs 26% (state forces alone)', period: 'Dec 2020 – mid 2022' },
  { context: 'CAR — Wagner civilian targeting rate (all ops)', value: '52%', comparison: 'vs 26% (FACA) vs 42% (CPC rebels)', period: 'Dec 2020 – mid 2022' },
  { context: 'Mali — Wagner civilian targeting rate', value: '71%', comparison: 'Exceeds both state forces and insurgent groups', period: 'Dec 2021 – 2023' },
  { context: 'Mali — civilian fatalities (joint Wagner-FAMa ops)', value: '~480', comparison: 'Highest since conflict began (2012)', period: 'Dec 2021 – 2023' },
  { context: 'Total African civilians killed by Wagner', value: '1,800+', comparison: 'As of August 2023 (ACLED / Economist)', period: '2017 – Aug 2023' },
  { context: 'Mali — 2022 civilian deaths', value: 'Highest annual total', comparison: 'Worst year in decade-long conflict', period: '2022 (Wagner\'s first full year)' },
  { context: 'Mali — ISIS-Sahel territorial control', value: 'Nearly doubled', comparison: 'During Wagner deployment', period: '2022–2023 (UN Panel of Experts)' },
]

// ── INCIDENT LOG ────────────────────────────────

const INCIDENTS = [
  { date: 'Mar 27–31, 2022', location: 'Moura, Mopti (Mali)', dead: '500+', detail: 'FAMa + ~100 Wagner fighters. Helicopters assault market. 3,000 rounded up. Executed by shooting in back. 58 women/girls raped. OHCHR: "at least 500 killed in violation of international law." Worst single atrocity in Mali\'s war.', source: 'OHCHR / HRW / Amnesty', type: 'massacre' },
  { date: 'Apr 2022', location: 'Gossi (Mali)', dead: '~12', detail: 'Wagner filmed burying bodies near army base, then produced doctored footage blaming French forces. France released satellite imagery exposing the false flag operation.', source: 'CSIS / French MoD', type: 'false-flag' },
  { date: 'Sep 2021', location: 'Besson, Nana-Mambéré (CAR)', dead: '40+', detail: 'Wagner mercenaries attacked Fulani community on suspicion of rebel collaboration. Mass killing event.', source: 'ACLED', type: 'massacre' },
  { date: 'Jun 2022', location: 'Tombouctou region (Mali)', dead: 'Multiple', detail: 'Wagner and FAMa looted towns, indiscriminately arrested civilians. Forced displacement to Mauritania.', source: 'HRW', type: 'displacement' },
  { date: 'Dec 2022 – Mar 2023', location: 'Sossobé, Ouenkoro (Mali)', dead: '20+', detail: 'Multiple operations. Civilians executed including woman and 6-year-old child. 12 men disappeared. Airborne ops with "white" foreign soldiers.', source: 'HRW Jul 2023', type: 'massacre' },
  { date: 'Feb 2024', location: 'Central/Northern Mali', dead: '14+', detail: 'FAMa and Wagner drone strikes on civilians during counterinsurgency. Two separate strikes on Feb 16–17.', source: 'HRW Mar 2024', type: 'airstrike' },
  { date: 'May 2024 onwards', location: 'Central/Northern Mali', dead: '32+', detail: '32 civilians deliberately killed, 4 forcibly disappeared, 100+ homes burned. Ongoing operations.', source: 'HRW', type: 'massacre' },
  { date: 'Jul 25–27, 2024', location: 'Tinzaouaten (Mali)', dead: '20–80 Wagner', detail: 'Tuareg rebels (CSP-DPA) ambush Wagner-Malian convoy. Wagner\'s worst single military loss in Mali. Ukraine claimed to have aided the rebels.', source: 'Wikipedia / Telegram', type: 'military' },
  { date: 'Jan 2025 onwards', location: 'Central/Northern Mali', dead: 'Dozens', detail: 'Ongoing summary executions and enforced disappearances of ethnic Fulani men. At least 12 executions, 81 disappearances, 30 homes burned documented.', source: 'HRW Jul 2025', type: 'massacre' },
  { date: 'Jun 2025', location: 'Mali (nationwide)', dead: '—', detail: 'Forbidden Stories investigation: Wagner systematically abducted, detained, and tortured hundreds of civilians throughout deployment, held in former UN camps.', source: 'Forbidden Stories', type: 'investigation' },
]

// ── TIMELINE ────────────────────────────────────

const TIMELINE = [
  { y: '2014', e: 'Wagner Group founded (Prigozhin + Utkin) during Donbas conflict.', t: 'origin' },
  { y: '2015', e: 'Syria deployment. Business model established: military services → resource concessions.', t: 'origin' },
  { y: '2017', e: 'Sudan: first Africa deployment. Gold mining via M Invest / Meroe Gold.', t: 'expand' },
  { y: '2018', e: 'CAR: 175 "instructors" → rapid growth to 2,100. Ndassima gold mine acquired.', t: 'expand' },
  { y: '2019', e: 'Libya: supports Haftar with jets from Syria. Mozambique: withdraws after casualties.', t: 'expand' },
  { y: '2020', e: 'Tripoli withdrawal — landmines left in civilian areas. CAR operations peak.', t: 'atrocity' },
  { y: 'Dec 2021', e: 'Mali: Wagner arrives as France withdraws. EU/US sanctions (Jan 2023).', t: 'expand' },
  { y: 'Mar 2022', e: 'Moura massacre: 500+ executed. Worst atrocity in Mali\'s war.', t: 'atrocity' },
  { y: 'Apr 2022', e: 'Gossi false flag: bodies buried, France blamed, satellite imagery exposes lie.', t: 'atrocity' },
  { y: 'Feb 2022+', e: 'Ukraine invasion. African gold becomes primary sanctions-evasion channel ($2.5B+).', t: 'gold' },
  { y: 'Jun 2023', e: 'Prigozhin mutiny. Marches on Moscow. Collapses in 24 hours.', t: 'origin' },
  { y: 'Aug 2023', e: 'Prigozhin + Utkin killed (plane crash). ACLED: 1,800+ African civilians dead since 2017.', t: 'origin' },
  { y: 'Jan 2024', e: 'Africa Corps deploys to Burkina Faso. Pavel Prigozhin (25) co-manages rebrand.', t: 'rebrand' },
  { y: 'Apr 2024', e: 'Africa Corps enters Niger (Airbase 101). US forces withdraw by September.', t: 'rebrand' },
  { y: 'Jul 2024', e: 'Tinzaouaten: Tuareg rebels kill 20–80 Wagner fighters. Worst military loss in Mali.', t: 'atrocity' },
  { y: 'Dec 2024', e: 'Assad falls. Russia relocates military equipment from Syria to Libya.', t: 'gold' },
  { y: 'Jun 2025', e: 'Wagner announces Mali withdrawal. Africa Corps replaces. Forbidden Stories exposé.', t: 'rebrand' },
  { y: 'Aug 2025', e: 'Africa Corps active in 6 countries. CAR base expanding for 10,000 personnel.', t: 'rebrand' },
]

// ── SOURCES ─────────────────────────────────────

const SOURCES = [
  { org: 'ACLED', doc: 'Wagner Group Operations in Africa: Civilian Targeting Trends in CAR and Mali' },
  { org: 'Human Rights Watch', doc: 'Mali: Massacre by Army, Foreign Soldiers (Apr 2022)' },
  { org: 'Human Rights Watch', doc: 'Mali: Army, Wagner Group Disappear, Execute Fulani Civilians (Jul 2025)' },
  { org: 'OHCHR', doc: 'Moura Fact-Finding Mission Report (May 2023)' },
  { org: 'Amnesty International', doc: 'Moura Massacre Statement (May 2023)' },
  { org: 'CSIS', doc: 'Massacres, Executions, and Falsified Graves: Wagner in Mali' },
  { org: 'CSIS', doc: 'Central African Republic Mine Displays Stakes for Wagner' },
  { org: 'Transparency International Russia', doc: 'Gold and Crossbows: Russian Mercenaries in Africa (2025)' },
  { org: 'Consumer Choice Center', doc: 'The Blood Gold Report (Dec 2023)' },
  { org: 'The Sentry', doc: 'Wagner Group Meltdown in Mali (Aug 2025)' },
  { org: 'US Dept. of State', doc: 'The Wagner Group\'s Atrocities in Africa (Feb 2024)' },
  { org: 'Congressional Research Service', doc: 'Russia\'s Security Operations in Africa (IF12389)' },
  { org: 'Foreign Policy', doc: 'Is Africa Corps a Rebranded Wagner Group? (Feb 2024)' },
  { org: 'Lawfare', doc: 'The Wagner Group Lives on in Africa (Jul 2024)' },
  { org: 'Journal of African Law', doc: 'State Responsibility for Wagner/Africa Corps Violations (2025)' },
  { org: 'CNN', doc: 'Russia Seeking to Expand Military Presence in Africa (Aug 2025)' },
  { org: 'Forbidden Stories', doc: 'Wagner Detention and Torture Investigation (Jun 2025)' },
]

// ── HELPERS ──────────────────────────────────────

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left py-2.5 pr-3 text-[9px] uppercase tracking-[0.08em] text-[#737373] font-semibold">{children}</th>
}
function Td({ children, bold }: { children: React.ReactNode; bold?: boolean }) {
  return <td className={`py-2.5 pr-3 text-[12px] leading-snug ${bold ? 'text-[#0a0a0a] font-semibold' : 'text-[#525252]'}`}>{children}</td>
}

// ── COMPONENT ────────────────────────────────────

export function TheBloodGoldContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  // Map
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
        center: [15, 10], zoom: 2.8, pitch: 0, interactive: true, attributionControl: false,
      })
      mapRef.current = map
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        OPERATIONS.forEach((op) => {
          const isWithdrawn = op.status.startsWith('Withdrawn')
          const el = document.createElement('div')
          el.style.cssText = `width:${isWithdrawn ? 8 : 12}px;height:${isWithdrawn ? 8 : 12}px;border-radius:50%;background:${isWithdrawn ? '#a3a3a3' : '#8B1A1A'};border:2px solid ${isWithdrawn ? '#d4d4d4' : 'rgba(139,26,26,0.3)'};box-shadow:0 0 ${isWithdrawn ? 0 : 8}px rgba(139,26,26,${isWithdrawn ? 0 : 0.4});cursor:pointer;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '280px', closeButton: false }).setHTML(
            `<div style="font-family:system-ui;padding:4px 0;"><p style="font-size:14px;font-weight:700;margin:0 0 4px;">${op.country}</p><p style="font-size:10px;color:#8B1A1A;margin:0 0 6px;font-weight:600;">Entered ${op.entered} · ${op.personnel} personnel</p><p style="font-size:11px;color:#525252;margin:0 0 4px;"><strong>Patron:</strong> ${op.patron}</p><p style="font-size:11px;color:#525252;margin:0 0 4px;"><strong>Resources:</strong> ${op.resource}</p><p style="font-size:11px;color:#525252;margin:0 0 4px;"><strong>Gold value:</strong> ${op.goldValue}</p><p style="font-size:11px;color:#525252;margin:0;"><strong>Status:</strong> ${op.status}</p></div>`
          )
          new mapboxgl.Marker(el).setLngLat(op.coords).setPopup(popup).addTo(map)
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
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#8B1A1A] mb-4 font-semibold">Knowledge Series · The Dark Files</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">The Blood Gold</h1>
        <p className="font-serif text-[clamp(1.1rem,2.5vw,1.5rem)] text-[#525252] italic mt-3">Wagner Group / Africa Corps — Africa Operations Dataset · 2017–Present</p>

        {/* Key numbers row */}
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {[['7', 'Countries'], ['5,000+', 'Peak fighters'], ['1,800+', 'Civilians killed (ACLED, to Aug 2023)'], ['$2.5B+', 'Gold laundered (since Feb 2022)'], ['0%', 'Tax on CAR extraction']].map(([v, l]) => (
            <div key={l}>
              <p className="font-serif text-[28px] md:text-[32px] italic text-[#0a0a0a] leading-none">{v}</p>
              <p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section className="relative">
        <div ref={mapContainer} style={{ width: '100%', height: '55vh', minHeight: 400 }} />
        <p className="text-[10px] text-[#737373] px-6 md:px-10 mt-2">Click markers for country operation details. Red = active. Grey = withdrawn. Data: ACLED, HRW, CSIS, CRS.</p>
      </section>

      {/* ═══ TABLE 1: OPERATIONS ═══ */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · Operations Database</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">Seven countries. One business model.</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr className="border-b-2 border-[#0a0a0a]">
                <Th>Country</Th><Th>Entered</Th><Th>Personnel</Th><Th>Patron</Th><Th>Resource extraction</Th><Th>Gold value</Th><Th>Civilian dead</Th><Th>Status (2025)</Th>
              </tr></thead>
              <tbody>
                {OPERATIONS.map((op) => (
                  <tr key={op.country} className="border-b border-[#e5e5e5]">
                    <Td bold>{op.country}</Td>
                    <Td>{op.entered}</Td>
                    <Td>{op.personnel}</Td>
                    <Td>{op.patron}</Td>
                    <Td>{op.resource}</Td>
                    <Td>{op.goldValue}</Td>
                    <Td>{op.civilianDead}</Td>
                    <Td>{op.status}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[#737373] mt-4">Shell companies by country: Sudan (M Invest, Meroe Gold) · CAR (Midas Resources, Lobaye Invest, Diamville) · Mali (Africa Politology). Laundering route: mine → Syria airbase → UAE markets → Russia.</p>
        </div>
      </section>

      {/* ═══ TABLE 2: GOLD ECONOMICS ═══ */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · Gold Extraction Economics</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">$2.5 billion and counting</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr className="border-b-2 border-[#0a0a0a]">
                <Th>Metric</Th><Th>Value</Th><Th>Period</Th><Th>Source</Th>
              </tr></thead>
              <tbody>
                {GOLD_DATA.map((row) => (
                  <tr key={row.metric} className="border-b border-[#e5e5e5]">
                    <Td>{row.metric}</Td>
                    <Td bold>{row.value}</Td>
                    <Td>{row.period}</Td>
                    <td className="py-2.5 pr-3 text-[10px] text-[#737373]">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ TABLE 3: ACLED CIVILIAN TARGETING ═══ */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · Civilian Targeting Data (ACLED)</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">When Wagner operates independently, 70% of violence targets civilians</h2>
          <p className="text-[14px] text-[#525252] max-w-[560px] leading-relaxed mb-10">
            ACLED data shows Wagner targets civilians at higher rates than either allied state forces
            or the insurgent groups they were deployed to fight. In Mali, civilian targeting accounted
            for 71% of Wagner political violence events — ISIS-<span className="underline underline-offset-2">Sahel</span> nearly doubled its territorial
            control during the same period.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr className="border-b-2 border-[#0a0a0a]">
                <Th>Context</Th><Th>Value</Th><Th>Comparison</Th><Th>Period</Th>
              </tr></thead>
              <tbody>
                {ACLED_DATA.map((row, i) => (
                  <tr key={i} className="border-b border-[#e5e5e5]">
                    <Td>{row.context}</Td>
                    <Td bold>{row.value}</Td>
                    <Td>{row.comparison}</Td>
                    <Td>{row.period}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[#737373] mt-4">Source: Armed Conflict Location &amp; Event Data Project (ACLED). "Wagner Group Operations in Africa: Civilian Targeting Trends in the Central African Republic and Mali."</p>
        </div>
      </section>

      {/* ═══ TABLE 4: INCIDENT LOG ═══ */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · Incident Log</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">Documented events — 2021 to 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr className="border-b-2 border-[#0a0a0a]">
                <Th>Date</Th><Th>Location</Th><Th>Dead</Th><Th>Type</Th><Th>Detail</Th><Th>Source</Th>
              </tr></thead>
              <tbody>
                {INCIDENTS.map((inc, i) => (
                  <tr key={i} className="border-b border-[#e5e5e5] align-top">
                    <td className="py-2.5 pr-3 text-[11px] text-[#0a0a0a] font-mono font-semibold whitespace-nowrap">{inc.date}</td>
                    <Td bold>{inc.location}</Td>
                    <td className="py-2.5 pr-3 text-[12px] font-semibold" style={{ color: '#8B1A1A' }}>{inc.dead}</td>
                    <td className="py-2.5 pr-3">
                      <span className="text-[9px] uppercase tracking-[0.06em] px-1.5 py-0.5 rounded font-semibold" style={{
                        color: inc.type === 'massacre' ? '#8B1A1A' : inc.type === 'false-flag' ? '#7C3AED' : inc.type === 'military' ? '#2563EB' : inc.type === 'investigation' ? '#047857' : '#525252',
                        background: inc.type === 'massacre' ? '#FEF2F2' : inc.type === 'false-flag' ? '#F5F3FF' : inc.type === 'military' ? '#EFF6FF' : inc.type === 'investigation' ? '#ECFDF5' : '#F5F5F5',
                      }}>{inc.type}</span>
                    </td>
                    <td className="py-2.5 pr-3 text-[11px] text-[#525252] leading-snug max-w-[340px]">{inc.detail}</td>
                    <td className="py-2.5 text-[10px] text-[#737373] whitespace-nowrap">{inc.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · Timeline</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-12">2014 — 2025</h2>
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#d4d4d4]" />
            {TIMELINE.map((t, i) => {
              const color = t.t === 'atrocity' ? '#8B1A1A' : t.t === 'rebrand' ? '#7C3AED' : t.t === 'expand' ? '#B45309' : t.t === 'gold' ? '#B8860B' : '#525252'
              return (
                <div key={i} className="flex gap-4 mb-5">
                  <div className="shrink-0">
                    <div className="w-[14px] h-[14px] rounded-full border-2" style={{ borderColor: color, background: t.t === 'atrocity' ? color : '#ffffff' }} />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-bold mb-1" style={{ color }}>{t.y}</p>
                    <p className="text-[13px] text-[#525252] leading-relaxed">{t.e}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex gap-4 flex-wrap mt-6 pt-4 border-t border-[#e5e5e5]">
            {[['Origin', '#525252'], ['Africa expansion', '#B45309'], ['Atrocity', '#8B1A1A'], ['Gold economics', '#B8860B'], ['Rebrand', '#7C3AED']].map(([l, c]) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                <span className="text-[9px] uppercase tracking-[0.08em] text-[#737373]">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONNECTED INTELLIGENCE ═══ */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">Connected Intelligence</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern.</h2>
          <div className="space-y-10">
            {[
              { to: 'The Sahel War', insight: 'Wagner/Africa Corps operates in the same Sahel countries where JNIM and ISSP are expanding. In Mali, junta + Russian forces killed more civilians (76% of fatalities) than jihadists in 2024. The counterterrorism operation became the recruitment operation.' },
              { to: 'The Atlantic Spine', insight: 'The Nigeria-Morocco Gas Pipeline passes through AES junta states that invited Wagner and expelled Western forces. Pipeline security is inseparable from this conflict. The same fracture lines that determine whether gas reaches Europe determine whether jihadists reach the coast.' },
              { to: 'The Lake of Fire', insight: 'Niger — where Wagner/Africa Corps deployed in 2024 — exited the MNJTF in March 2025, weakening Lake Chad Basin coordination against Boko Haram and ISWAP. The junta security model is failing across the entire region.' },
              { to: 'The Shadow State', insight: 'Russia relocated military equipment from Syria to Libya after Assad fell (Dec 2024). Libya provides logistical and financial support to Sahel groups. Wagner gold laundering routes (mine → Syria → UAE → Russia) run parallel to weapons pipelines flowing the other direction.' },
            ].map((c, i) => (
              <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#991B1B' }}>
                <span className="text-[10px] text-[#991B1B] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
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
