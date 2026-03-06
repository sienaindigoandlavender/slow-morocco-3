'use client'

import { useEffect, useRef } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const ACTORS = [
  { name: 'Al-Shabaab', full: "Harakat al-Shabaab al-Mujahideen", affiliation: 'Al-Qaeda', founded: '2006 (from ICU militia wing)', personnel: '7,000–12,000', leader: 'Ahmed Diriye (Abu Ubaidah)', revenue: "$200M+/year — extortion, taxation, piracy, charcoal", territory: "South/central Somalia; operations in Kenya, Ethiopia", status: "Offensive — Shabelle Offensive (Feb 2025+). Recaptured towns 40km from Mogadishu. 50% more attacks/month in 2025 vs 2024.", color: '#B45309' },
  { name: 'IS Somalia', full: "Islamic State Somalia Province (ISS)", affiliation: 'ISIS', founded: '2015 (Al-Shabaab defectors)', personnel: '~1,000 (up from 200 in 2018)', leader: 'Abdulqadir Mumin', revenue: "Global ISIS financial/admin hub (UN)", territory: "Cal-Miskaad Mountains, Puntland", status: "Growing — ISIS global HQ. 1,065 fatalities linked past year (vs <100 previously). Under US/UAE/Puntland pressure.", color: '#DC2626' },
  { name: 'ASWJ (Mozambique)', full: "Ahl al-Sunna wal Jama'a", affiliation: 'ISIS (loose)', founded: '2017', personnel: '200–300', leader: 'Fragmented', revenue: "Gold mining raids, extortion", territory: "Cabo Delgado, expanding to Niassa", status: "Resilient — exploiting post-SADC withdrawal. Attacking Rwandan forces 2025.", color: '#7C3AED' },
]

const ECONOMICS = [
  { metric: 'Al-Shabaab annual revenue', value: '$200M+', comparison: "Rivals Somalia's government revenue", source: 'Africa Center / UN' },
  { metric: 'Primary: extortion/taxation', value: '~60–70%', comparison: 'Businesses, ports, roads, telecoms', source: 'UN Panel of Experts' },
  { metric: 'Charcoal trade', value: '$40–80M/year', comparison: 'UN-banned export continues to Gulf', source: 'UN Monitoring Group' },
  { metric: 'Piracy (resumed)', value: '47 events', comparison: 'Gulf of Aden since Nov 2023', source: 'Africa Center' },
  { metric: 'Taxation reach', value: 'Into Mogadishu', comparison: 'Capital businesses pay al-Shabaab alongside government taxes', source: 'Various / UN' },
  { metric: 'IS Somalia global role', value: 'Financial + admin hub', comparison: "ISIS's most important non-combat node globally", source: 'UN reports 2024–25' },
  { metric: 'IS Somalia fighters', value: '~1,000', comparison: 'Up from ~200 in 2018 — 5× growth', source: 'Africa Center' },
  { metric: 'Houthi arms pipeline', value: 'Active', comparison: 'Al-Shabaab receiving weapons', source: 'Soufan Center' },
]

const OFFENSIVE = [
  { date: 'Feb 2025', event: "Shabelle Offensive launches. Captures Balcad (30km from Mogadishu) during Ethiopian PM's visit.", significance: 'Symbolic humiliation.' },
  { date: 'Mar 2025', event: 'Hotel siege. Mortar rounds hit Mogadishu airport. President narrowly escapes bomb.', significance: 'Can reach capital\'s most protected zone.' },
  { date: 'Apr–Jun 2025', event: 'Rapid advances. Recaptures Adan Yabaal (former operational hub).', significance: 'Reversing 2022–23 gains.' },
  { date: 'Jul 7, 2025', event: 'Moqokori captured. 47 soldiers killed. Sets up roadblocks, collects taxes.', significance: 'Governance installation.' },
  { date: 'Jul 14, 2025', event: 'Tardo captured without resistance. Forces withdrew.', significance: 'Military morale collapse.' },
  { date: 'Jul 20, 2025', event: 'Sabiid and Anole recaptured (40km from Mogadishu). Strategic triangle formed.', significance: 'Closest to Mogadishu since 2011–12.' },
]

const TIMELINE = [
  { y: 'Late 1980s', e: 'Somali Afghan mujahideen veterans return. Found AIAI.', t: 'origin' },
  { y: '1991', e: 'Somali state collapses. Civil war.', t: 'origin' },
  { y: '2006', e: 'ICU captures Mogadishu. Al-Shabaab is enforcement wing.', t: 'origin' },
  { y: '2006–09', e: 'Ethiopian invasion. Al-Shabaab becomes resistance movement.', t: 'turning' },
  { y: '2007', e: 'AMISOM deployed.', t: 'intervention' },
  { y: '2008', e: 'Al-Shabaab affiliates with al-Qaeda.', t: 'turning' },
  { y: '2011–13', e: 'AU/Somali coalition recaptures Mogadishu. Al-Shabaab retreats.', t: 'intervention' },
  { y: '2013', e: 'Westgate mall attack, Nairobi — 67 killed.', t: 'attack' },
  { y: '2015', e: 'IS Somalia formed. Garissa University — 148 killed.', t: 'attack' },
  { y: '2017', e: 'Mogadishu truck bomb — 587 killed. Deadliest terrorist attack in African history.', t: 'attack' },
  { y: '2022', e: 'Counteroffensive with US/Türkiye support. 215+ locations recaptured.', t: 'intervention' },
  { y: '2023', e: 'Al-Shabaab counteroffensive. Retakes Galmudug. Gains stall.', t: 'turning' },
  { y: '2024', e: 'ATMIS drawdown. Piracy resumes. IS Somalia fatalities spike to 1,065.', t: 'turning' },
  { y: '2025', e: 'Shabelle Offensive. 40km from Mogadishu. AUSSOM launches. Trump escalates strikes.', t: 'attack' },
]

const FOREIGN = [
  { actor: 'AU (AMISOM → ATMIS → AUSSOM)', role: '~18,000 troops at peak. Transitioning to Somali control by 2029.', status: 'AUSSOM launched Jan 2025. Burundi withdrew. Tenuous.' },
  { actor: 'United States', role: 'Drone strikes. Special forces. Training.', status: 'Trump escalated strikes targeting both IS Somalia and al-Shabaab.' },
  { actor: 'Türkiye', role: 'Military base. Training. SADAT PMC deployed 2025.', status: 'Key bilateral partner.' },
  { actor: 'Ethiopia', role: '~4,000 troops. Largest contributor. Somaliland MOU tensions.', status: 'Cooperation resumed but fragile.' },
  { actor: 'UAE', role: 'Airstrikes against IS Somalia in Puntland.', status: 'Focused on IS Somalia, not al-Shabaab.' },
  { actor: 'Rwanda', role: '4,000 troops in Mozambique. TotalEnergies project.', status: 'SADC ended Jul 2024. Facing ASWJ attacks.' },
  { actor: 'Houthis (Yemen)', role: 'Weapons pipeline to al-Shabaab.', status: 'Active. Weapons inflow increasing.' },
]

const SOURCES = [
  { org: 'Africa Center for Strategic Studies', doc: "Militant Islamist Groups 2025 / 150,000 Deaths" },
  { org: 'The Soufan Center', doc: "Al-Shabaab's 2025 Offensive / Between IS and Al-Shabaab" },
  { org: 'EUAA', doc: 'COI Report: Somalia Security Situation (May 2025)' },
  { org: 'CFR Global Conflict Tracker', doc: 'Conflict with Al-Shabaab in Somalia' },
  { org: 'UN Panel of Experts', doc: 'S/2024/748 (Oct 2024)' },
  { org: 'Security Council Report', doc: 'Somalia Monthly Forecasts (2024–2025)' },
  { org: 'ACLED', doc: "IS Pivot to Africa / Somalia Updates" },
  { org: 'ICT', doc: 'Rise of IS in Africa (Oct 2025)' },
]

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left py-2.5 pr-3 text-[9px] uppercase tracking-[0.08em] text-[#737373] font-semibold">{children}</th>
}
function Td({ children, bold }: { children: React.ReactNode; bold?: boolean }) {
  return <td className={`py-2.5 pr-3 text-[12px] leading-snug ${bold ? 'text-[#0a0a0a] font-semibold' : 'text-[#525252]'}`}>{children}</td>
}

const MAP_MARKERS = [
  { name: 'Mogadishu', coords: [45.34, 2.05] as [number, number], color: '#0a0a0a', detail: 'Capital. Al-Shabaab within 40km (Jul 2025).' },
  { name: 'Al-Shabaab — Lower Shabelle', coords: [44.5, 1.8] as [number, number], color: '#B45309', detail: 'Sabiid & Anole recaptured Jul 2025.' },
  { name: 'Al-Shabaab — Hiran', coords: [45.5, 4.0] as [number, number], color: '#B45309', detail: 'Moqokori, Tardo — strategic triangle.' },
  { name: 'IS Somalia — Puntland', coords: [49.0, 10.5] as [number, number], color: '#DC2626', detail: '~1,000 fighters. ISIS global financial hub.' },
  { name: 'Al-Shabaab — Kenya', coords: [41.5, -0.5] as [number, number], color: '#B45309', detail: 'Jaysh Ayman wing. Cross-border ops.' },
  { name: 'ASWJ — Cabo Delgado', coords: [40.2, -12.5] as [number, number], color: '#7C3AED', detail: 'Mozambique. 200–300 fighters.' },
  { name: 'Nairobi (Westgate)', coords: [36.82, -1.28] as [number, number], color: '#525252', detail: '2013: 67 killed.' },
]

export function TheShadowStateContent() {
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
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11', center: [43, 2], zoom: 4.0, interactive: true, attributionControl: false })
      mapRef.current = map
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        MAP_MARKERS.forEach((m) => {
          const el = document.createElement('div')
          const sz = m.color === '#525252' || m.color === '#0a0a0a' ? 8 : 12
          el.style.cssText = `width:${sz}px;height:${sz}px;border-radius:50%;background:${m.color};border:2px solid ${m.color}40;box-shadow:0 0 8px ${m.color}50;cursor:pointer;`
          new mapboxgl.Marker(el).setLngLat(m.coords).setPopup(new mapboxgl.Popup({ offset: 10, maxWidth: '260px', closeButton: false }).setHTML(`<div style="font-family:system-ui;padding:4px 0;"><p style="font-size:13px;font-weight:700;margin:0 0 4px;">${m.name}</p><p style="font-size:11px;color:#525252;margin:0;">${m.detail}</p></div>`)).addTo(map)
        })
      })
    }
    document.head.appendChild(script)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="bg-white text-[#262626] pt-16">
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 pt-16 pb-10">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#991B1B] mb-4 font-semibold">Data Module &middot; Security &amp; Conflict</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">The Shadow State</h1>
        <p className="font-serif text-[clamp(1.1rem,2.5vw,1.5rem)] text-[#525252] italic mt-3">Al-Shabaab, IS Somalia &amp; the Horn of Africa &middot; 2006&ndash;Present</p>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {[['$200M+', "Al-Shabaab annual revenue"], ['7,000–12,000', 'Fighters'], ['6,224', 'Fatalities past year'], ['40 km', 'From Mogadishu (Jul 2025)'], ['587', 'Single Mogadishu bombing (2017)']].map(([v, l]) => (
            <div key={l}><p className="font-serif text-[28px] md:text-[32px] italic text-[#0a0a0a] leading-none">{v}</p><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mt-1 max-w-[180px]">{l}</p></div>
          ))}
        </div>
      </section>

      <section className="relative"><div ref={mapContainer} style={{ width: '100%', height: '55vh', minHeight: 400 }} />
        <div className="flex gap-4 flex-wrap px-6 md:px-10 mt-3">
          {[['Al-Shabaab', '#B45309'], ['IS Somalia', '#DC2626'], ['ASWJ Mozambique', '#7C3AED'], ['Key attacks', '#525252']].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /><span className="text-[9px] uppercase tracking-[0.08em] text-[#737373]">{l}</span></div>
          ))}
        </div>
      </section>

      {/* ACTORS */}
      <section className="border-t border-[#e5e5e5] mt-8"><div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 &middot; Actor Database</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">Al-Qaeda&rsquo;s wealthiest affiliate. ISIS&rsquo;s global bank.</h2>
        <div className="space-y-8">{ACTORS.map((a) => (
          <div key={a.name} className="border border-[#e5e5e5] p-6 md:p-8">
            <div className="flex items-start justify-between mb-4"><div><h3 className="text-[18px] font-bold text-[#0a0a0a]">{a.name}</h3><p className="text-[11px] text-[#737373] mt-0.5">{a.full}</p></div><span className="text-[9px] uppercase tracking-[0.06em] px-2 py-1 rounded font-semibold" style={{ color: a.color, background: a.color + '15' }}>{a.affiliation}</span></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[12px]">
              <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Founded</p><p className="text-[#0a0a0a] font-semibold">{a.founded}</p></div>
              <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Personnel</p><p className="text-[#0a0a0a] font-semibold">{a.personnel}</p></div>
              <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Leader</p><p className="text-[#525252]">{a.leader}</p></div>
              <div><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Revenue</p><p className="text-[#991B1B] font-semibold">{a.revenue}</p></div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f0f0f0]"><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mb-1">Status (2025)</p><p className="text-[13px] text-[#0a0a0a] font-semibold">{a.status}</p></div>
          </div>
        ))}</div>
      </div></section>

      {/* ECONOMICS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 &middot; The Economics</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">$200 million a year. A state in everything but name.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Al-Shabaab taxes businesses in Mogadishu &mdash; the capital of the government fighting it. Its revenue rivals Somalia&rsquo;s internal government revenue. This is not an insurgency. It is a shadow state.</p>
        <div className="overflow-x-auto"><table className="w-full min-w-[600px]" style={{ borderCollapse: 'collapse' }}>
          <thead><tr className="border-b-2 border-[#0a0a0a]"><Th>Metric</Th><Th>Value</Th><Th>Context</Th><Th>Source</Th></tr></thead>
          <tbody>{ECONOMICS.map((e, i) => (<tr key={i} className="border-b border-[#e5e5e5]"><Td>{e.metric}</Td><Td bold>{e.value}</Td><Td>{e.comparison}</Td><td className="py-2.5 text-[10px] text-[#737373]">{e.source}</td></tr>))}</tbody>
        </table></div>
      </div></section>

      {/* 2025 OFFENSIVE */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 &middot; The 2025 Offensive</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-12">Five months. Years of progress reversed.</h2>
        <div className="space-y-0">{OFFENSIVE.map((o, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5 border-b border-[#e5e5e5]">
            <div className="md:col-span-2"><p className="font-mono text-[11px] font-bold text-[#991B1B]">{o.date}</p></div>
            <div className="md:col-span-6"><p className="text-[13px] text-[#525252] leading-relaxed">{o.event}</p></div>
            <div className="md:col-span-4"><p className="text-[12px] text-[#0a0a0a] font-semibold leading-snug">{o.significance}</p></div>
          </div>
        ))}</div>
      </div></section>

      {/* FOREIGN */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 &middot; Foreign Intervention</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">Everyone involved. Nobody winning.</h2>
        <div className="overflow-x-auto"><table className="w-full min-w-[640px]" style={{ borderCollapse: 'collapse' }}>
          <thead><tr className="border-b-2 border-[#0a0a0a]"><Th>Actor</Th><Th>Role</Th><Th>Status (2025)</Th></tr></thead>
          <tbody>{FOREIGN.map((f, i) => (<tr key={i} className="border-b border-[#e5e5e5] align-top"><Td bold>{f.actor}</Td><td className="py-2.5 pr-3 text-[12px] text-[#525252] leading-snug max-w-[280px]">{f.role}</td><td className="py-2.5 text-[12px] text-[#525252] leading-snug max-w-[240px]">{f.status}</td></tr>))}</tbody>
        </table></div>
      </div></section>

      {/* TIMELINE */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 &middot; Timeline</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-12">1980s &mdash; 2025</h2>
        <div className="relative"><div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#d4d4d4]" />
          {TIMELINE.map((t, i) => {
            const color = t.t === 'origin' ? '#525252' : t.t === 'turning' ? '#0369A1' : t.t === 'attack' ? '#991B1B' : '#047857'
            return (<div key={i} className="flex gap-4 mb-5"><div className="shrink-0"><div className="w-[14px] h-[14px] rounded-full border-2" style={{ borderColor: color, background: t.t === 'attack' ? color : '#fff' }} /></div><div><p className="font-mono text-[11px] font-bold mb-1" style={{ color }}>{t.y}</p><p className="text-[13px] text-[#525252] leading-relaxed">{t.e}</p></div></div>)
          })}
        </div>
      </div></section>

      {/* CONNECTED INTELLIGENCE */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">006 &middot; Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern.</h2>
        <div className="space-y-10">
            {[
              { to: 'The Sahel War', link: '/stories/the-sahel-war', insight: 'JNIM (al-Qaeda) in the Sahel and al-Shabaab (al-Qaeda) in the Horn operate under the same global franchise. Both build quasi-governance systems. Both are winning against states. Both benefit from the same dynamic: foreign intervention collapses, jihadists fill the vacuum. The playbook is identical.' },
              { to: 'The Blood Gold', link: '/stories/the-blood-gold', insight: 'Russia relocated military equipment from Syria to Libya after Assad fell (Dec 2024). Libya provides logistical and financial support to Sahel-based groups. The Houthis supply al-Shabaab with weapons. Conflict supply chains cross continents — Syria to Libya to the Sahel. Yemen to Somalia. Wagner gold laundering routes run parallel to weapons pipelines flowing the other direction.' },
              { to: 'The Lake of Fire', link: '/stories/the-lake-of-fire', insight: 'IS Somalia has emerged as ISIS global financial and administrative headquarters. ISWAP in the Lake Chad Basin receives training and tech transfer from the global ISIS network — drones, IEDs. The Horn and the Lake are connected through ISIS infrastructure, not geography. Money flows from Puntland. Technology flows to Borno.' },
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
