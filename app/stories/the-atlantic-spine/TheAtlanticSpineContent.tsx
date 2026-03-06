'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ROUTE_COUNTRIES, LANDLOCKED_COUNTRIES, PIPELINE_ROUTE_COORDS, TSGP_ROUTE_COORDS,
  PIPELINE_COMPARISON, TIMELINE, SOURCES, GEOPOLITICS,
} from './data'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export function TheAtlanticSpineContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [showTSGP, setShowTSGP] = useState(true)

  // ── MAP ──
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
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-8, 16], zoom: 3.1, pitch: 0, bearing: 0,
        interactive: true, attributionControl: false,
      })
      mapRef.current = map
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // NMGP — gold
        map.addSource('nmgp', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: PIPELINE_ROUTE_COORDS } } })
        map.addLayer({ id: 'nmgp-glow', type: 'line', source: 'nmgp', paint: { 'line-color': '#F59E0B', 'line-width': 10, 'line-opacity': 0.25, 'line-blur': 8 } })
        map.addLayer({ id: 'nmgp-line', type: 'line', source: 'nmgp', paint: { 'line-color': '#F59E0B', 'line-width': 3, 'line-opacity': 0.9 } })

        // TSGP — red dashed
        map.addSource('tsgp', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: TSGP_ROUTE_COORDS } } })
        map.addLayer({ id: 'tsgp-line', type: 'line', source: 'tsgp', paint: { 'line-color': '#EF4444', 'line-width': 2.5, 'line-opacity': 0.7, 'line-dasharray': [4, 3] } })

        // Markers
        ROUTE_COUNTRIES.forEach((c) => {
          const isEnd = c.id === 'nigeria' || c.id === 'morocco'
          const el = document.createElement('div')
          el.style.cssText = `width:${isEnd ? 12 : 8}px;height:${isEnd ? 12 : 8}px;border-radius:50%;background:${isEnd ? '#F59E0B' : '#FCD34D'};border:2px solid rgba(0,0,0,0.5);box-shadow:0 0 6px rgba(245,158,11,0.4);cursor:pointer;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '240px', closeButton: false }).setHTML(
            `<div style="font-family:system-ui;padding:2px 0;"><p style="font-size:13px;font-weight:700;margin:0 0 3px;">${c.name}</p><p style="font-size:11px;color:#525252;margin:0 0 4px;">${c.population} · ${c.gasAccess}</p><p style="font-size:10px;color:#737373;margin:0;line-height:1.4;">${c.note}</p></div>`
          )
          new mapboxgl.Marker(el).setLngLat(c.coords).setPopup(popup).addTo(map)
        })
      })
    }
    document.head.appendChild(script)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  // Toggle rival route
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    try { map.setPaintProperty('tsgp-line', 'line-opacity', showTSGP ? 0.7 : 0) } catch {}
  }, [showTSGP])

  return (
    <div className="pt-16">

      {/* ═══ HEADER ═══ */}
      <section className="bg-white px-6 md:px-10 pt-16 pb-10 max-w-[1000px] mx-auto">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-4">Module 138 · Energy &amp; Geopolitical Intelligence</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">
          The Atlantic Spine
        </h1>
        <p className="mt-6 text-[16px] md:text-[18px] leading-relaxed text-[#525252] max-w-[640px]">
          The Nigeria-Morocco Gas Pipeline — 5,660 km along the <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Atlantic coast</span>,
          13 countries, $25 billion. The largest energy infrastructure project in
          African history. And it is racing against Algeria&rsquo;s <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Trans-Saharan</span> rival
          for the same Nigerian gas and the same European market.
        </p>
        {/* Key numbers — inline */}
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {[['5,660 km', 'Pipeline length'], ['$25B', 'Estimated cost'], ['30 bcm/yr', 'Capacity'], ['13+3', 'Countries'], ['~400M', 'People served']].map(([v, l]) => (
            <div key={l}>
              <p className="font-serif text-[28px] md:text-[32px] italic text-[#0a0a0a] leading-none">{v}</p>
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#737373] mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MAP — full width, continental scale ═══ */}
      <section className="relative">
        <div ref={mapContainer} style={{ width: '100%', height: '75vh', minHeight: 500 }} />
        {/* Legend + toggle */}
        <div className="absolute bottom-4 left-4 px-4 py-3 rounded" style={{ background: 'rgba(0,0,0,0.8)', fontFamily: 'monospace', fontSize: 11, color: '#ddd', lineHeight: 2.2, zIndex: 10 }}>
          <span style={{ display: 'inline-block', width: 18, height: 3, background: '#F59E0B', verticalAlign: 'middle', marginRight: 8 }} /> NMGP — Atlantic Route (5,660 km)<br/>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={showTSGP} onChange={() => setShowTSGP(!showTSGP)} style={{ accentColor: '#EF4444' }} />
            <span style={{ display: 'inline-block', width: 18, height: 0, borderBottom: '2px dashed #EF4444', verticalAlign: 'middle' }} />
            TSGP — Trans-Saharan Rival (4,128 km)
          </label>
        </div>
        <p className="text-[10px] text-[#737373] px-6 md:px-10 mt-2 mb-0">
          Click markers for country details. Toggle rival route with checkbox. Satellite imagery: Mapbox. Route data: NNPCL, ONHYM, ECOWAS feasibility studies.
        </p>
      </section>

      {/* ═══ THE RACE — comparison table ═══ */}
      <section className="bg-white" style={{ borderTop: '1px solid #e5e5e5' }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Race</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-3">Atlantic vs. Saharan</h2>
          <p className="text-[14px] text-[#525252] max-w-[560px] leading-relaxed mb-10">
            Two pipelines competing for the same Nigerian gas and the same European market.
            The Atlantic route is longer and more expensive. The Saharan route is shorter
            but crosses the world&rsquo;s most volatile conflict zone.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr style={{ borderBottom: '2px solid #0a0a0a' }}>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-[0.08em] text-[#737373] w-[26%]">Metric</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-[0.08em]" style={{ color: '#B45309' }}>NMGP — Atlantic Route</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-[0.08em]" style={{ color: '#DC2626' }}>TSGP — Trans-Saharan</th>
                </tr>
              </thead>
              <tbody>
                {PIPELINE_COMPARISON.map((row) => (
                  <tr key={row.metric} style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td className="py-3 pr-4 text-[12px] text-[#737373] font-medium">{row.metric}</td>
                    <td className="py-3 pr-4 text-[13px] text-[#0a0a0a]">{row.nmgp}</td>
                    <td className="py-3 pr-4 text-[13px] text-[#525252]">{row.tsgp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ ROUTE COUNTRIES ═══ */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5' }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Route</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-3">13 countries. 3 languages. One pipeline.</h2>
          <p className="text-[14px] text-[#525252] max-w-[560px] leading-relaxed mb-10">
            Lagos to Tangier. Anglophone, francophone, and lusophone Africa in a single
            infrastructure corridor. Plus three landlocked countries via internal branches.
          </p>

          {/* Country table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr style={{ borderBottom: '2px solid #0a0a0a' }}>
                  <th className="text-left py-3 pr-3 text-[10px] uppercase tracking-[0.08em] text-[#737373]">Country</th>
                  <th className="text-left py-3 pr-3 text-[10px] uppercase tracking-[0.08em] text-[#737373]">Pop.</th>
                  <th className="text-left py-3 pr-3 text-[10px] uppercase tracking-[0.08em] text-[#737373]">Electricity</th>
                  <th className="text-left py-3 pr-3 text-[10px] uppercase tracking-[0.08em] text-[#737373]">Language</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-[0.08em] text-[#737373]">Role</th>
                </tr>
              </thead>
              <tbody>
                {ROUTE_COUNTRIES.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td className="py-3 pr-3 text-[13px] text-[#0a0a0a] font-semibold">{c.name}</td>
                    <td className="py-3 pr-3 text-[12px] text-[#525252]">{c.population}</td>
                    <td className="py-3 pr-3 text-[12px] text-[#525252]">{c.gasAccess}</td>
                    <td className="py-3 pr-3">
                      <span className="text-[10px] uppercase tracking-[0.06em] px-2 py-0.5 rounded" style={{
                        color: c.language === 'Francophone' ? '#1D4ED8' : c.language === 'Lusophone' ? '#047857' : c.language === 'Bilingual' ? '#B45309' : '#525252',
                        background: c.language === 'Francophone' ? '#EFF6FF' : c.language === 'Lusophone' ? '#ECFDF5' : c.language === 'Bilingual' ? '#FFFBEB' : '#F5F5F5',
                      }}>{c.language}</span>
                    </td>
                    <td className="py-3 text-[12px] text-[#737373] leading-snug">{c.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Landlocked */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid #e5e5e5' }}>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#737373] mb-3">+ 3 landlocked countries via internal branches</p>
            <div className="flex flex-wrap gap-6">
              {LANDLOCKED_COUNTRIES.map((c) => (
                <span key={c.name} className="text-[13px] text-[#0a0a0a]">
                  <strong>{c.name}</strong> <span className="text-[#737373]">({c.population})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GEOPOLITICS ═══ */}
      <section className="bg-white" style={{ borderTop: '1px solid #e5e5e5' }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Geopolitics</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-10">More than a pipeline. An alignment map.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              ['The Algeria Rivalry', GEOPOLITICS.algeriaRivalry],
              ['The Zero-Sum Game', GEOPOLITICS.zeroSumGame],
              ['ECOWAS Integration', GEOPOLITICS.ecowasIntegration],
              ['US Strategic Interest', GEOPOLITICS.trumpInterest],
              ['Western Sahara', GEOPOLITICS.westernSahara],
              ['The AES Risk', GEOPOLITICS.aesRisk],
            ].map(([title, text]) => (
              <div key={title} className="pb-6" style={{ borderBottom: '1px solid #e5e5e5' }}>
                <h3 className="text-[14px] font-semibold text-[#0a0a0a] mb-2">{title}</h3>
                <p className="text-[13px] text-[#525252] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5' }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · Timeline</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-12">1982 — 2026</h2>

          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#d4d4d4]" />
            {TIMELINE.map((t, i) => {
              const color = t.significance === 'milestone' ? '#B45309' : t.significance === 'rivalry' ? '#DC2626' : t.significance === 'setback' ? '#737373' : t.significance === 'current' ? '#16A34A' : '#2563EB'
              return (
                <div key={i} className="flex gap-4 mb-5">
                  <div className="shrink-0">
                    <div className="w-[14px] h-[14px] rounded-full border-2" style={{ borderColor: color, background: t.significance === 'current' ? color : '#fafafa' }} />
                  </div>
                  <div className="pb-1">
                    <p className="font-mono text-[11px] font-bold mb-1" style={{ color }}>{t.year}</p>
                    <p className="text-[13px] text-[#525252] leading-relaxed">{t.event}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="bg-white" style={{ borderTop: '1px solid #e5e5e5' }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-8">Sources &amp; Attribution</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOURCES.map((s) => (
              <div key={s.name} className="text-[12px]">
                <p className="text-[#0a0a0a] font-medium">{s.name}</p>
                <p className="text-[#737373] mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ borderTop: '1px solid #e5e5e5' }}>
            <p className="text-[12px] text-[#737373]">Data visualisation, cartography, and analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
            <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
          </div>
        </div>
      </section>
    </div>
  )
}