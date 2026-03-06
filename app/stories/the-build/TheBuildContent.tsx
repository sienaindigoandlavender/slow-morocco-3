'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const C = {
  // Infrastructure
  highway: '#A0522D',
  rail: '#2D6E4F',
  airport: '#5D3A5E',
  hotel: '#6B7F5E',
  tourism: '#C17F28',
  // Economy
  gdp: '#8B6914',
  fdi: '#4A6741',
  renewable: '#1A5276',
  urban: '#7B4F3A',
  // UI
  ink: '#0a0a0a',
  body: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  faint: '#f5f5f5',
  morocco: '#8B3A3A',
  worldcup: '#722F37',
}

// ═══ YEAR-BY-YEAR DATA ═══
// Compiled from ADM, ONCF, ONDA, Ministry of Tourism, World Bank, MASEN, UNCTAD, IMF, IRENA

interface YearData {
  year: number
  // Infrastructure
  highway: number      // total km of autoroute
  rail: number         // total railway km (conventional + HSR)
  hsrKm: number        // HSR specifically
  airportCap: number   // annual passenger capacity (millions)
  hotelRooms: number   // thousands of rooms
  tourists: number     // millions of arrivals
  // Economy
  gdp: number          // GDP current USD (billions)
  fdi: number          // FDI net inflows (billions USD)
  renewableMW: number  // installed renewable capacity (MW: wind + solar + hydro)
  urbanPct: number     // urban population (% of total)
  event?: string       // notable event
}

// GDP: World Bank current USD. 2024=$154B (WB), 2025=$180B (IMF est)
// FDI: World Bank/UNCTAD net inflows BoP current USD
// Renewable MW: IRENA/MASEN (hydro+wind+solar installed capacity)
// Urbanization: World Bank/UN DESA

const DATA: YearData[] = [
  { year: 2004, highway: 560, rail: 2110, hsrKm: 0, airportCap: 12, hotelRooms: 120, tourists: 5.5,
    gdp: 56.9, fdi: 0.9, renewableMW: 1730, urbanPct: 55.1 },
  { year: 2005, highway: 610, rail: 2110, hsrKm: 0, airportCap: 13, hotelRooms: 125, tourists: 5.8,
    gdp: 59.5, fdi: 1.7, renewableMW: 1740, urbanPct: 55.5 },
  { year: 2006, highway: 750, rail: 2120, hsrKm: 0, airportCap: 15, hotelRooms: 132, tourists: 6.6,
    gdp: 65.6, fdi: 2.4, renewableMW: 1750, urbanPct: 55.9, event: 'Vision 2010 tourism plan accelerates' },
  { year: 2007, highway: 870, rail: 2120, hsrKm: 0, airportCap: 16, hotelRooms: 140, tourists: 7.4,
    gdp: 75.2, fdi: 2.8, renewableMW: 1890, urbanPct: 56.4, event: 'First Tangier wind farm. FDI peaks at $2.8B.' },
  { year: 2008, highway: 920, rail: 2130, hsrKm: 0, airportCap: 18, hotelRooms: 150, tourists: 7.9,
    gdp: 88.9, fdi: 2.5, renewableMW: 1900, urbanPct: 56.8 },
  { year: 2009, highway: 1000, rail: 2130, hsrKm: 0, airportCap: 19, hotelRooms: 158, tourists: 8.3,
    gdp: 90.9, fdi: 1.9, renewableMW: 1920, urbanPct: 57.3, event: 'National Energy Strategy: 42% renewable by 2020. Noor solar plan announced.' },
  { year: 2010, highway: 1100, rail: 2140, hsrKm: 0, airportCap: 20, hotelRooms: 165, tourists: 9.3,
    gdp: 93.2, fdi: 1.2, renewableMW: 1940, urbanPct: 57.7, event: '10M tourist target reached. Tanger-Med port opens.' },
  { year: 2011, highway: 1200, rail: 2150, hsrKm: 0, airportCap: 21, hotelRooms: 170, tourists: 9.3,
    gdp: 101.4, fdi: 2.5, renewableMW: 1960, urbanPct: 58.2, event: 'Arab Spring protests. New constitution adopted.' },
  { year: 2012, highway: 1300, rail: 2150, hsrKm: 0, airportCap: 22, hotelRooms: 178, tourists: 9.4,
    gdp: 98.3, fdi: 2.7, renewableMW: 2000, urbanPct: 58.6, event: 'HSR construction begins (Tangier-Kénitra). Casablanca Finance City launched.' },
  { year: 2013, highway: 1400, rail: 2160, hsrKm: 0, airportCap: 23, hotelRooms: 185, tourists: 10.0,
    gdp: 106.8, fdi: 3.4, renewableMW: 2100, urbanPct: 59.1, event: 'Akhfennir wind farm operational. FDI record $3.4B.' },
  { year: 2014, highway: 1500, rail: 2170, hsrKm: 0, airportCap: 24, hotelRooms: 192, tourists: 10.3,
    gdp: 110.0, fdi: 3.6, renewableMW: 2750, urbanPct: 59.5, event: 'Tarfaya wind farm — Africa\'s largest. Renault Tangier exports 200K vehicles.' },
  { year: 2015, highway: 1600, rail: 2170, hsrKm: 0, airportCap: 25, hotelRooms: 198, tourists: 10.2,
    gdp: 101.2, fdi: 3.3, renewableMW: 2800, urbanPct: 60.0, event: 'COP21: Morocco pledges 52% renewable by 2030. Fuel subsidies phased out.' },
  { year: 2016, highway: 1650, rail: 2180, hsrKm: 0, airportCap: 27, hotelRooms: 205, tourists: 10.3,
    gdp: 103.6, fdi: 2.2, renewableMW: 3200, urbanPct: 60.4, event: 'Noor Ouarzazate I — world\'s largest CSP. Morocco hosts COP22.' },
  { year: 2017, highway: 1700, rail: 2200, hsrKm: 0, airportCap: 28, hotelRooms: 210, tourists: 11.3,
    gdp: 109.7, fdi: 2.7, renewableMW: 3300, urbanPct: 60.9, event: 'Automotive sector becomes #1 export. PSA Kénitra plant announced.' },
  { year: 2018, highway: 1750, rail: 2400, hsrKm: 200, airportCap: 29, hotelRooms: 215, tourists: 12.3,
    gdp: 118.1, fdi: 3.5, renewableMW: 3500, urbanPct: 61.3, event: 'Al Boraq HSR — Africa\'s first high-speed train. GDP crosses $118B.' },
  { year: 2019, highway: 1800, rail: 2400, hsrKm: 200, airportCap: 31, hotelRooms: 225, tourists: 13.1,
    gdp: 128.9, fdi: 1.7, renewableMW: 3700, urbanPct: 61.8, event: 'GDP reaches $129B. Auto exports surpass phosphates.' },
  { year: 2020, highway: 1810, rail: 2400, hsrKm: 200, airportCap: 31, hotelRooms: 228, tourists: 2.8,
    gdp: 121.4, fdi: 1.4, renewableMW: 3800, urbanPct: 62.2, event: 'COVID-19. GDP contracts 5.8%. Tourism collapses 79%. FDI drops to $1.4B.' },
  { year: 2021, highway: 1820, rail: 2400, hsrKm: 200, airportCap: 32, hotelRooms: 230, tourists: 3.7,
    gdp: 142.0, fdi: 2.3, renewableMW: 3900, urbanPct: 62.7 },
  { year: 2022, highway: 1840, rail: 2400, hsrKm: 200, airportCap: 33, hotelRooms: 240, tourists: 11.0,
    gdp: 130.9, fdi: 2.3, renewableMW: 4050, urbanPct: 63.1, event: 'World Cup semifinal in Qatar. Morocco makes history. Auto exports record $14B.' },
  { year: 2023, highway: 1860, rail: 2410, hsrKm: 200, airportCap: 35, hotelRooms: 255, tourists: 14.5,
    gdp: 141.1, fdi: 1.0, renewableMW: 4250, urbanPct: 63.6, event: 'World Cup 2030 bid confirmed. Earthquake. FDI stock reaches $69B.' },
  { year: 2024, highway: 1880, rail: 2420, hsrKm: 200, airportCap: 38, hotelRooms: 270, tourists: 17.4,
    gdp: 154.4, fdi: 1.7, renewableMW: 4550, urbanPct: 64.0, event: 'Record tourism: 17.4M. Auto exports: $14.1B. Renewable capacity: 4,550 MW (45.3% of total).' },
  { year: 2025, highway: 1950, rail: 2450, hsrKm: 200, airportCap: 42, hotelRooms: 280, tourists: 19.8,
    gdp: 180.0, fdi: 2.5, renewableMW: 5200, urbanPct: 64.5, event: 'AFCON hosted. 9 stadiums delivered. $41B infrastructure budget. GDP est. $180B.' },
  // PROJECTIONS 2026-2030
  { year: 2026, highway: 2100, rail: 2550, hsrKm: 350, airportCap: 50, hotelRooms: 295, tourists: 21.0,
    gdp: 192.0, fdi: 3.0, renewableMW: 6200, urbanPct: 65.0, event: 'HSR extension accelerates. Noor Midelt I online: 800MW.' },
  { year: 2027, highway: 2300, rail: 2650, hsrKm: 450, airportCap: 58, hotelRooms: 310, tourists: 22.5,
    gdp: 202.0, fdi: 3.5, renewableMW: 7200, urbanPct: 65.5 },
  { year: 2028, highway: 2500, rail: 2800, hsrKm: 550, airportCap: 65, hotelRooms: 315, tourists: 23.5,
    gdp: 210.0, fdi: 4.0, renewableMW: 8400, urbanPct: 66.0, event: 'Hassan II Stadium (115K) complete. HSR reaches Casablanca. GDP crosses $200B.' },
  { year: 2029, highway: 2750, rail: 2900, hsrKm: 600, airportCap: 72, hotelRooms: 322, tourists: 24.5,
    gdp: 215.0, fdi: 4.5, renewableMW: 9500, urbanPct: 66.5, event: 'HSR reaches Marrakech. Tangier to Marrakech in 2h40m.' },
  { year: 2030, highway: 3000, rail: 3000, hsrKm: 630, airportCap: 80, hotelRooms: 330, tourists: 26.0,
    gdp: 220.0, fdi: 5.0, renewableMW: 10500, urbanPct: 67.0, event: '2030 FIFA WORLD CUP. 52% renewable energy. 26M tourists. GDP target $220B.' },
]

type TrackKey = 'highway' | 'rail' | 'airportCap' | 'hotelRooms' | 'tourists' | 'gdp' | 'fdi' | 'renewableMW' | 'urbanPct'

interface Track {
  key: TrackKey
  label: string
  color: string
  max: number
  unit: string
  format: (v: number) => string
  category: 'infrastructure' | 'economy'
}

const TRACKS: Track[] = [
  { key: 'highway', label: 'Highway (km)', color: C.highway, max: 3200, unit: 'km', format: (v) => `${v.toLocaleString()} km`, category: 'infrastructure' },
  { key: 'rail', label: 'Railway (km)', color: C.rail, max: 3200, unit: 'km', format: (v) => `${v.toLocaleString()} km`, category: 'infrastructure' },
  { key: 'airportCap', label: 'Airport Capacity (M pax/yr)', color: C.airport, max: 85, unit: 'M', format: (v) => `${v}M pax`, category: 'infrastructure' },
  { key: 'hotelRooms', label: 'Hotel Rooms (thousands)', color: C.hotel, max: 350, unit: 'K', format: (v) => `${v}K`, category: 'infrastructure' },
  { key: 'tourists', label: 'Tourist Arrivals (millions)', color: C.tourism, max: 28, unit: 'M', format: (v) => `${v.toFixed(1)}M`, category: 'infrastructure' },
  { key: 'gdp', label: 'GDP ($ billions)', color: C.gdp, max: 235, unit: '$B', format: (v) => `$${v.toFixed(1)}B`, category: 'economy' },
  { key: 'fdi', label: 'FDI Inflows ($ billions)', color: C.fdi, max: 5.5, unit: '$B', format: (v) => `$${v.toFixed(1)}B`, category: 'economy' },
  { key: 'renewableMW', label: 'Renewable Capacity (MW)', color: C.renewable, max: 11000, unit: 'MW', format: (v) => `${v.toLocaleString()} MW`, category: 'economy' },
  { key: 'urbanPct', label: 'Urbanization (%)', color: C.urban, max: 70, unit: '%', format: (v) => `${v.toFixed(1)}%`, category: 'economy' },
]

const INFRA_TRACKS = TRACKS.filter(t => t.category === 'infrastructure')
const ECON_TRACKS = TRACKS.filter(t => t.category === 'economy')

export function TheBuildContent() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [activePanel, setActivePanel] = useState<'infrastructure' | 'economy'>('infrastructure')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const play = useCallback(() => {
    setIsPlaying(true)
    setHasStarted(true)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setCurrentIdx(0)
    setHasStarted(false)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIdx(prev => {
          if (prev >= DATA.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 700)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const current = DATA[currentIdx]
  const isProjection = current.year >= 2026
  const isWorldCup = current.year === 2030

  const activeTracks = activePanel === 'infrastructure' ? INFRA_TRACKS : ECON_TRACKS

  const getBarHeight = (track: Track, value: number) => {
    // For urbanization, show relative to baseline (54%) not 0
    if (track.key === 'urbanPct') {
      const min = 54
      return ((value - min) / (track.max - min)) * 100
    }
    return (value / track.max) * 100
  }

  return (
    <div className="min-h-screen pt-16 bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-20 pb-8">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 013 · Infrastructure + Economic Timeline</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Build</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          27 years of transformation. One country deciding to become something else.
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4 mb-8" style={{ color: C.body }}>
          From Mohammed VI&apos;s early reign to the <span className="underline underline-offset-2">2030 World Cup</span>. Highway kilometres,
          railway lines, airport capacity, hotel rooms, <span className="underline underline-offset-2">tourist arrivals</span> — and the economic
          engine underneath: GDP tripling, FDI surging, 10,000 MW of renewable energy,
          a country urbanising in real time. Press play. Watch the bars accumulate.
          Then watch what happens when a country decides to host the World Cup.
        </p>

        {/* Play controls */}
        <div className="flex items-center gap-4 mb-6">
          {!hasStarted ? (
            <button onClick={play}
              className="px-6 py-2.5 text-[11px] uppercase tracking-widest transition-all"
              style={{ background: C.ink, color: '#fff', border: `1px solid ${C.ink}` }}>
              ▶ Play Timeline
            </button>
          ) : (
            <>
              <button onClick={isPlaying ? pause : play}
                className="px-4 py-2 text-[11px] uppercase tracking-widest transition-all"
                style={{ background: isPlaying ? '#fff' : C.ink, color: isPlaying ? C.ink : '#fff', border: `1px solid ${C.ink}` }}>
                {isPlaying ? '❚❚ Pause' : '▶ Play'}
              </button>
              <button onClick={reset}
                className="px-4 py-2 text-[11px] uppercase tracking-widest transition-all"
                style={{ background: '#fff', color: C.muted, border: `1px solid ${C.border}` }}>
                ↺ Reset
              </button>
            </>
          )}
        </div>

        {/* Year indicator */}
        <div className="flex items-baseline gap-4 mb-2">
          <span className="font-serif italic text-[clamp(2rem,5vw,3.5rem)]" style={{
            color: isWorldCup ? C.worldcup : isProjection ? C.muted : C.ink,
          }}>
            {current.year}
          </span>
          {current.event && (
            <span className="text-[11px] leading-[1.4] max-w-[500px]" style={{
              color: isWorldCup ? C.worldcup : C.body,
              fontWeight: isWorldCup ? 600 : 400,
            }}>
              {current.event}
            </span>
          )}
        </div>

        {/* Scrubber */}
        <input type="range" min={0} max={DATA.length - 1} value={currentIdx}
          onChange={e => { setCurrentIdx(Number(e.target.value)); setHasStarted(true) }}
          className="w-full max-w-[900px] h-1 appearance-none bg-neutral-200 rounded-full cursor-pointer"
          style={{ accentColor: C.ink }}
        />
        <div className="flex justify-between max-w-[900px] mt-1">
          <span className="text-[9px]" style={{ color: C.muted }}>2004</span>
          <span className="text-[9px]" style={{ color: C.muted }}>2030</span>
        </div>
      </section>

      {/* ═══ PANEL TOGGLE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mb-4">
        <div className="flex gap-0 border-b" style={{ borderColor: C.border }}>
          <button
            onClick={() => setActivePanel('infrastructure')}
            className="px-5 py-3 text-[10px] uppercase tracking-widest transition-all relative"
            style={{
              color: activePanel === 'infrastructure' ? C.ink : C.muted,
              fontWeight: activePanel === 'infrastructure' ? 600 : 400,
            }}
          >
            Infrastructure
            {activePanel === 'infrastructure' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: C.ink }} />
            )}
          </button>
          <button
            onClick={() => setActivePanel('economy')}
            className="px-5 py-3 text-[10px] uppercase tracking-widest transition-all relative"
            style={{
              color: activePanel === 'economy' ? C.ink : C.muted,
              fontWeight: activePanel === 'economy' ? 600 : 400,
            }}
          >
            Economy
            {activePanel === 'economy' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: C.ink }} />
            )}
          </button>
        </div>
      </section>

      {/* ═══ ANIMATED BARS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%]">
        {activeTracks.map(track => {
          const value = current[track.key]
          return (
            <div key={track.key} className="mb-5">
              {/* Label row */}
              <div className="flex items-baseline justify-between mb-1">
                <div className="flex items-baseline gap-3">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: track.color }} />
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>
                    {track.label}
                  </span>
                </div>
                <span className="font-serif italic text-[16px]" style={{ color: track.color }}>
                  {track.format(value)}
                </span>
              </div>

              {/* Bar chart */}
              <div className="relative h-[40px] overflow-hidden" style={{ background: C.faint }}>
                <svg width="100%" height="40" preserveAspectRatio="none" viewBox={`0 0 ${DATA.length} 40`}>
                  {DATA.map((d, i) => {
                    if (i > currentIdx) return null
                    const h = getBarHeight(track, d[track.key])
                    const barH = (h / 100) * 40
                    const isProj = d.year >= 2026
                    const isCovid = (track.key === 'tourists' || track.key === 'gdp') && d.year === 2020
                    return (
                      <rect key={d.year}
                        x={i} y={40 - barH} width={0.85} height={barH}
                        fill={isCovid ? C.worldcup : track.color}
                        opacity={isProj ? 0.35 : isCovid ? 0.8 : 0.65}
                        rx={0.1}
                      />
                    )
                  })}
                  {/* World Cup marker */}
                  {currentIdx >= DATA.length - 1 && (
                    <rect x={DATA.length - 1} y={0} width={0.85} height={40}
                      fill="none" stroke={C.worldcup} strokeWidth={0.15} />
                  )}
                </svg>

                {/* COVID dip label for tourism */}
                {track.key === 'tourists' && currentIdx >= 16 && (
                  <div className="absolute text-[7px] pointer-events-none" style={{
                    left: `${(16 / DATA.length) * 100}%`,
                    top: '2px',
                    color: C.worldcup,
                  }}>
                    COVID
                  </div>
                )}

                {/* 2009 Energy Strategy marker for renewables */}
                {track.key === 'renewableMW' && currentIdx >= 5 && (
                  <div className="absolute text-[7px] pointer-events-none" style={{
                    left: `${(5 / DATA.length) * 100}%`,
                    top: '2px',
                    color: C.renewable,
                  }}>
                    2009 Strategy
                  </div>
                )}

                {/* GDP $100B marker */}
                {track.key === 'gdp' && currentIdx >= 7 && (
                  <div className="absolute text-[7px] pointer-events-none" style={{
                    left: `${(7 / DATA.length) * 100}%`,
                    top: '2px',
                    color: C.gdp,
                  }}>
                    $100B
                  </div>
                )}
              </div>

              {/* Year axis */}
              <div className="flex justify-between mt-0.5">
                {DATA.filter((_, i) => i % 5 === 0 || i === DATA.length - 1).map(d => (
                  <span key={d.year} className="text-[7px]" style={{
                    color: d.year >= 2026 ? C.muted : '#a3a3a3',
                    fontWeight: d.year === 2030 ? 700 : 400,
                  }}>
                    {d.year}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* ═══ CURRENT YEAR DASHBOARD ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-4">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-3" style={{ color: C.muted }}>
            {activePanel === 'infrastructure' ? 'Infrastructure' : 'Economy'} · {current.year}
          </p>
          <div className={`grid gap-4 ${activePanel === 'infrastructure' ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-2 md:grid-cols-4'}`}>
            {activeTracks.map(track => {
              const start = DATA[0][track.key]
              const now = current[track.key]
              const growth = ((now - start) / start * 100).toFixed(0)
              return (
                <div key={track.key} className="p-3" style={{ borderLeft: `3px solid ${track.color}` }}>
                  <p className="text-[9px] uppercase tracking-widest" style={{ color: C.muted }}>{track.label.split('(')[0].trim()}</p>
                  <p className="font-serif italic text-[22px] mt-1" style={{ color: track.color }}>
                    {track.format(now)}
                  </p>
                  <p className="text-[9px] mt-0.5" style={{ color: C.muted }}>
                    {Number(growth) >= 0 ? '+' : ''}{growth}% since 2004
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTION NOTE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 mt-1 rounded-sm" style={{ background: C.ink, opacity: 0.65 }} />
            <div>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>Historical data (2004–2025)</p>
              <p className="text-[10px] mt-1" style={{ color: C.muted }}>ADM, ONCF, ONDA, Ministry of Tourism, World Bank, IMF, UNCTAD, IRENA, MASEN</p>
            </div>
          </div>
          <div className="flex items-start gap-4 mt-2">
            <div className="w-3 h-3 mt-1 rounded-sm" style={{ background: C.ink, opacity: 0.35 }} />
            <div>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>Projections (2026–2030)</p>
              <p className="text-[10px] mt-1" style={{ color: C.muted }}>Government targets, 2026 Finance Law, ONCF rail plan, Vision 2030, MASEN 10.5 GW renewable roadmap, IMF GDP forecasts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE STORY — INFRASTRUCTURE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>I. The Infrastructure</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.highway }}>The Roads</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
                In 2004, Morocco had 560 kilometres of autoroute. By 2025: nearly 2,000.
                By 2030: 3,000 — more than doubling from where it stands today.
                The Continental Rabat-Casablanca highway alone will connect the two
                largest cities to the world&apos;s largest stadium. Construction started
                in 1975. The ambition accelerated in 2024.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.rail }}>The Rails</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
                In 2018, Africa&apos;s first high-speed train launched between Tangier and
                Kénitra: 200 kilometres at 320 km/h. By 2029, the line extends to
                Marrakech — 630 km total. 168 new trains ordered. The single largest
                rail investment in Moroccan history.
                Tangier to Marrakech in 2 hours 40 minutes.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.tourism }}>The Arrivals</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
                5.5 million tourists in 2004. 17.4 million in 2024. 26 million targeted
                for 2030. The COVID cliff of 2020 — dropping to 2.8 million — made the
                recovery look vertical. The 2022 World Cup semifinal put Morocco in
                every living room on Earth. The infrastructure is built for what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE STORY — ECONOMY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>II. The Economy</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.gdp }}>The GDP</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
                $56.9 billion in 2004. $154.4 billion in 2024. A country that nearly tripled its
                economic output in two decades — without oil, without gas, without a single
                hydrocarbon windfall. Morocco did it with phosphates, automotive manufacturing,
                aerospace, agriculture, and tourism. By 2030, IMF forecasts put GDP above $220
                billion. The World Cup isn&apos;t the cause. It&apos;s the accelerant.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.fdi }}>The Capital</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
                Foreign direct investment peaked at $3.6 billion in 2014, driven by Renault&apos;s
                Tangier plant and the Tanger-Med free zone. France remains the largest
                investor (31% of FDI stock), followed by the UAE (18%) and Spain (9%).
                FDI stock reached $69 billion by 2023. The automotive sector alone — Renault,
                PSA, now Hyundai — turned Morocco into Africa&apos;s #1 car exporter, shipping
                700,000 vehicles a year.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.renewable }}>The Energy</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
                Morocco imports 97% of its fossil fuel. In 2009, it announced a plan to make
                42% of installed capacity renewable. By 2024: 4,550 MW of wind, solar, and hydro —
                45.3% of total capacity. The Noor Ouarzazate complex is the world&apos;s largest
                concentrated solar plant. Tarfaya is Africa&apos;s largest wind farm, with a 45% capacity
                factor that rivals anything on Earth. By 2030: 10,500 MW. A country with no oil
                building a grid that runs on sun and wind.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.urban }}>The Urbanisation</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
                55% urban in 2004. 64% in 2024. 67% projected by 2030. Twelve percentage points
                of population shift in a single generation — millions of people moving from douars
                to cities, from agriculture to services, from oral tradition to digital. Casablanca,
                Tangier, Marrakech — each absorbing the pressure of a country remaking itself.
                The infrastructure isn&apos;t just for tourists. It&apos;s for 38 million Moroccans
                who need roads, rails, and power to get to work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INFLECTION POINTS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>III. The Inflection Points</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { year: '2007', label: 'Tanger-Med Port', desc: 'Africa\'s largest port opens. Connects Morocco to 186 ports in 77 countries. Free trade zone attracts Renault, 900+ firms. FDI peaks at $2.8B.', color: C.fdi },
              { year: '2009', label: 'Energy Strategy', desc: 'Morocco announces 42% renewable target. Noor solar plan. $9B solar investment. Fuel subsidies phased out by 2015. The grid begins to turn green.', color: C.renewable },
              { year: '2018', label: 'Al Boraq HSR', desc: 'Africa\'s first high-speed train. 320 km/h. Tangier-Kénitra in 47 minutes. $2.1B Franco-Moroccan investment. The spine of a modern rail network.', color: C.rail },
              { year: '2025–30', label: 'World Cup Ramp', desc: '$41B infrastructure budget. 6 stadiums, 630km HSR, 80M airport capacity, 330K hotel rooms. Every bar on this chart goes vertical.', color: C.worldcup },
            ].map(point => (
              <div key={point.year} className="p-4" style={{ borderTop: `3px solid ${point.color}` }}>
                <p className="font-serif italic text-[28px] mb-1" style={{ color: point.color }}>{point.year}</p>
                <p className="text-[11px] uppercase tracking-widest mb-2" style={{ color: C.ink }}>{point.label}</p>
                <p className="text-[11px] leading-[1.6]" style={{ color: C.body }}>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE NUMBERS AT A GLANCE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>IV. 2004 → 2030</p>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
            {TRACKS.map(track => {
              const start = DATA[0][track.key]
              const end = DATA[DATA.length - 1][track.key]
              const mult = (end / start).toFixed(1)
              return (
                <div key={track.key} className="text-center p-2">
                  <p className="font-serif italic text-[22px]" style={{ color: track.color }}>{mult}×</p>
                  <p className="text-[8px] uppercase tracking-widest mt-1" style={{ color: C.muted }}>
                    {track.label.split('(')[0].trim()}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Every bar in this chart is concrete, steel, and asphalt. Every economic
            data point is a factory opened, a turbine installed, a family that moved
            to the city. Twenty-seven years of a country that decided to build
            before it was asked — and is now being asked to host the world.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Highway: Autoroutes du Maroc (ADM) annual reports 2004–2025; Ministry of Equipment &amp; Water.
            Railway: Office National des Chemins de Fer (ONCF); $9.6B rail plan (2025).
            Airport capacity: Office National des Aéroports (ONDA); Mohammed V Terminal 3 project.
            Hotel rooms: Ministry of Tourism; Vision 2020/2030 strategies.
            Tourist arrivals: UNWTO; Ministry of Tourism; Trading Economics.
            GDP: World Bank (current USD); IMF World Economic Outlook 2024.
            FDI: World Bank BoP data; UNCTAD World Investment Report 2024; Morocco Foreign Exchange Office.
            Renewable energy: IRENA; MASEN; Morocco Energy Partnership; ANRE (installed capacity MW).
            Urbanization: World Bank; UN DESA World Urbanization Prospects 2024.
            2026–2030 projections based on government budget allocations (2026 Finance Law),
            ONCF rail plan, ADM 3,000km target, Vision 2030 tourism strategy,
            MASEN 10.5 GW renewable roadmap, and IMF GDP forecasts.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
              © {new Date().getFullYear()} Slow Morocco. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.rail }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
