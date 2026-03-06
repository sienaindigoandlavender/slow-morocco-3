'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const C = {
  sun: '#C8A415', heat: '#C54B3C', salt: '#E8A838', tower: '#722F37',
  trough: '#8B6914', pv: '#2D6E8E', green: '#2D6E4F', wind: '#4A6741',
  hydro: '#1A5276', coal: '#3D3D3D',
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
}

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

// ═══ NOOR COMPLEX DATA ═══
const PHASES = [
  { name: 'Noor I', type: 'Parabolic Trough', capacity: 160, area: 450, gwh: 370,
    storage: 3, co2: 240000, commissioned: 2016, cooling: 'Wet',
    color: C.trough, note: 'First phase. 500,000 parabolic mirrors. 3-hour molten salt storage.' },
  { name: 'Noor II', type: 'Parabolic Trough', capacity: 200, area: 680, gwh: 600,
    storage: 7, co2: 325000, commissioned: 2018, cooling: 'Dry',
    color: C.trough, note: '400 loops of SENERtrough-2 collectors. 7-hour storage. Dry cooling saves water.' },
  { name: 'Noor III', type: 'Solar Tower (CSP)', capacity: 150, area: 598, gwh: 500,
    storage: 7, co2: 208000, commissioned: 2018, cooling: 'Dry',
    color: C.tower, note: '7,400 heliostats reflecting to 250m tower. Molten salt heated to 565°C. 7-hour storage.' },
  { name: 'Noor IV', type: 'Photovoltaic (PV)', capacity: 72, area: 137, gwh: 120,
    storage: 0, co2: 0, commissioned: 2018, cooling: '—',
    color: C.pv, note: 'Standard PV panels. No storage. Cheapest per MW but only works during sun hours.' },
]

// Hourly solar output curve (normalized 0-1 for a typical summer day in Ouarzazate)
const HOURLY_OUTPUT = [
  { hour: 0, direct: 0, stored: 0.6, label: 'Midnight' },
  { hour: 1, direct: 0, stored: 0.55 },
  { hour: 2, direct: 0, stored: 0.45 },
  { hour: 3, direct: 0, stored: 0.35 },
  { hour: 4, direct: 0, stored: 0.2 },
  { hour: 5, direct: 0, stored: 0.05 },
  { hour: 6, direct: 0.05, stored: 0, label: 'Dawn' },
  { hour: 7, direct: 0.2, stored: 0 },
  { hour: 8, direct: 0.45, stored: 0 },
  { hour: 9, direct: 0.7, stored: 0 },
  { hour: 10, direct: 0.88, stored: 0 },
  { hour: 11, direct: 0.95, stored: 0 },
  { hour: 12, direct: 1.0, stored: 0, label: 'Solar noon' },
  { hour: 13, direct: 0.98, stored: 0 },
  { hour: 14, direct: 0.92, stored: 0 },
  { hour: 15, direct: 0.82, stored: 0 },
  { hour: 16, direct: 0.65, stored: 0 },
  { hour: 17, direct: 0.4, stored: 0 },
  { hour: 18, direct: 0.15, stored: 0 },
  { hour: 19, direct: 0.02, stored: 0, label: 'Sunset' },
  { hour: 20, direct: 0, stored: 0.65, label: 'Salt kicks in' },
  { hour: 21, direct: 0, stored: 0.62 },
  { hour: 22, direct: 0, stored: 0.58 },
  { hour: 23, direct: 0, stored: 0.5 },
]

// Morocco energy mix 2023
const ENERGY_MIX_2023 = [
  { source: 'Coal', pct: 64, color: C.coal },
  { source: 'Wind', pct: 15.4, color: C.wind },
  { source: 'Natural gas', pct: 10, color: '#6B8E23' },
  { source: 'Solar', pct: 5.1, color: C.sun },
  { source: 'Fuel oil', pct: 3.8, color: '#555' },
  { source: 'Hydro', pct: 0.8, color: C.hydro },
  { source: 'Other', pct: 0.9, color: C.muted },
]

const ENERGY_TARGET_2030 = [
  { source: 'Solar', pct: 20, color: C.sun },
  { source: 'Wind', pct: 20, color: C.wind },
  { source: 'Hydro', pct: 12, color: C.hydro },
  { source: 'Fossil', pct: 48, color: C.coal },
]

const RENEWABLE_MILESTONES = [
  { year: 2009, event: 'National Energy Strategy launched', capacity: '0.3 GW RE' },
  { year: 2016, event: 'Noor I commissioned (160 MW)', capacity: '2.8 GW RE' },
  { year: 2018, event: 'Noor II + III + IV commissioned', capacity: '3.5 GW RE' },
  { year: 2020, event: 'Renewables reach 37% of installed capacity', capacity: '3.9 GW RE' },
  { year: 2023, event: 'Renewables reach 40.7% of installed capacity', capacity: '4.7 GW RE' },
  { year: 2025, event: 'ANRE approves 9.3 GW solar+wind target by 2029', capacity: '~5.1 GW RE' },
  { year: 2030, event: 'Target: 52% renewable electricity', capacity: '10.5 GW RE' },
]

// ═══ SUN TRACKER COMPONENT ═══
function SunTracker() {
  const [hour, setHour] = useState(12)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawField = useCallback((h: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)

    // Sun position (arc across top)
    const sunAngle = ((h - 6) / 12) * Math.PI // 6am = 0, 12 = π/2, 18 = π
    const sunX = W * 0.1 + (W * 0.8) * (h - 5) / 14
    const sunY = H * 0.15 + Math.sin(sunAngle) * -H * 0.25 + H * 0.25
    const isDay = h >= 6 && h <= 19

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.6)
    if (isDay) {
      skyGrad.addColorStop(0, '#87CEEB20')
      skyGrad.addColorStop(1, '#F5E6C810')
    } else {
      skyGrad.addColorStop(0, '#1A1A2E10')
      skyGrad.addColorStop(1, '#2D2D4408')
    }
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, W, H * 0.6)

    // Sun glow
    if (isDay) {
      const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 40)
      glow.addColorStop(0, '#C8A41540')
      glow.addColorStop(1, '#C8A41500')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(sunX, sunY, 40, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#C8A415'
      ctx.beginPath()
      ctx.arc(sunX, sunY, 8, 0, Math.PI * 2)
      ctx.fill()
    }

    // Tower
    const towerX = W * 0.5, towerBase = H * 0.6, towerTop = H * 0.2
    ctx.strokeStyle = '#72727240'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(towerX, towerBase)
    ctx.lineTo(towerX, towerTop)
    ctx.stroke()

    // Tower receiver
    if (isDay) {
      const recGlow = ctx.createRadialGradient(towerX, towerTop, 0, towerX, towerTop, 15)
      recGlow.addColorStop(0, '#C54B3C80')
      recGlow.addColorStop(1, '#C54B3C00')
      ctx.fillStyle = recGlow
      ctx.beginPath()
      ctx.arc(towerX, towerTop, 15, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = isDay ? C.heat : '#555'
    ctx.beginPath()
    ctx.arc(towerX, towerTop, 4, 0, Math.PI * 2)
    ctx.fill()

    // Ground line
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, towerBase)
    ctx.lineTo(W, towerBase)
    ctx.stroke()

    // Heliostats (simplified — 3 rows of mirrors)
    const rows = 3
    const mirrorsPerRow = 9
    for (let r = 0; r < rows; r++) {
      const rowY = towerBase + 12 + r * 18
      for (let m = 0; m < mirrorsPerRow; m++) {
        const mx = W * 0.15 + (W * 0.7 / (mirrorsPerRow - 1)) * m
        // Mirror angle: point toward sun if day, or toward tower
        let mirrorAngle = 0
        if (isDay) {
          mirrorAngle = Math.atan2(sunY - rowY, sunX - mx) / 2 + Math.atan2(towerTop - rowY, towerX - mx) / 2
        }
        ctx.save()
        ctx.translate(mx, rowY)
        ctx.rotate(mirrorAngle)
        // Mirror rectangle
        ctx.fillStyle = isDay ? '#C8D8E830' : '#55555520'
        ctx.strokeStyle = isDay ? '#8BA8C0' : '#555'
        ctx.lineWidth = 0.5
        ctx.fillRect(-8, -1.5, 16, 3)
        ctx.strokeRect(-8, -1.5, 16, 3)
        // Pedestal
        ctx.strokeStyle = '#999'
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(0, 1.5)
        ctx.lineTo(0, 6)
        ctx.stroke()
        ctx.restore()

        // Beam from mirror to tower (faint)
        if (isDay && h >= 7 && h <= 18) {
          ctx.strokeStyle = '#C8A41508'
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(mx, rowY)
          ctx.lineTo(towerX, towerTop)
          ctx.stroke()
        }
      }
    }

    // Labels
    ctx.fillStyle = C.muted
    ctx.font = '10px "IBM Plex Mono", monospace'
    ctx.textAlign = 'center'
    if (isDay) {
      ctx.fillText(`☀ ${h}:00`, sunX, sunY - 16)
    }
    ctx.fillText('250m tower', towerX, towerTop - 12)
    ctx.fillText('7,400 heliostats', W * 0.5, towerBase + rows * 18 + 20)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(2, 2)
    }
    drawField(hour)
  }, [hour, drawField])

  const data = HOURLY_OUTPUT[hour]
  const totalOutput = (data.direct + data.stored) * 510
  const isStorageActive = data.stored > 0

  return (
    <div>
      {/* Canvas */}
      <div className="relative border rounded-sm mb-4" style={{ borderColor: C.border }}>
        <canvas ref={canvasRef} className="w-full" style={{ height: 220 }} />
        {isStorageActive && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-sm"
            style={{ background: `${C.salt}15`, border: `1px solid ${C.salt}30` }}>
            <span className="font-mono text-[10px] font-bold" style={{ color: C.salt }}>MOLTEN SALT ACTIVE</span>
          </div>
        )}
      </div>

      {/* Slider */}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[10px] w-10" style={{ color: C.muted }}>5:00</span>
        <input type="range" min={0} max={23} value={hour} onChange={e => setHour(Number(e.target.value))}
          className="flex-1 h-1 appearance-none rounded-full cursor-pointer"
          style={{ background: `linear-gradient(to right, ${C.salt}30 0%, ${C.sun} 25%, ${C.sun} 75%, ${C.salt}30 100%)` }} />
        <span className="font-mono text-[10px] w-10 text-right" style={{ color: C.muted }}>23:00</span>
      </div>

      {/* Output numbers */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="font-mono text-[22px] font-bold" style={{ color: data.direct > 0 ? C.sun : C.muted }}>
            {(data.direct * 510).toFixed(0)}
          </p>
          <p className="font-mono text-[10px]" style={{ color: C.muted }}>MW direct solar</p>
        </div>
        <div>
          <p className="font-mono text-[22px] font-bold" style={{ color: data.stored > 0 ? C.salt : C.muted }}>
            {(data.stored * 510).toFixed(0)}
          </p>
          <p className="font-mono text-[10px]" style={{ color: C.muted }}>MW from storage</p>
        </div>
        <div>
          <p className="font-mono text-[22px] font-bold" style={{ color: totalOutput > 0 ? C.green : C.muted }}>
            {totalOutput.toFixed(0)}
          </p>
          <p className="font-mono text-[10px]" style={{ color: C.muted }}>MW total output</p>
        </div>
      </div>
      {data.label && (
        <p className="font-mono text-[11px] mt-2" style={{ color: C.salt }}>{data.label}</p>
      )}
    </div>
  )
}

// ═══ MAIN COMPONENT ═══
export function SolarCompassContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const phasesR = useReveal()
  const curveR = useReveal()
  const mixR = useReveal()
  const roadR = useReveal()

  const totalCapacity = PHASES.reduce((a, p) => a + p.capacity, 0)
  const totalGwh = PHASES.reduce((a, p) => a + p.gwh, 0)
  const totalCo2 = PHASES.reduce((a, p) => a + p.co2, 0)
  const totalArea = PHASES.reduce((a, p) => a + p.area, 0)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Energy Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Solar Compass</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            580 MW. 3,000 hectares. The world&apos;s largest concentrated solar plant.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          In the Saharan foothills south of Ouarzazate — the same landscape where Lawrence
          of Arabia and Game of Thrones were filmed — Morocco built a solar plant the size
          of 3,500 football fields. <span className="underline underline-offset-2">Noor</span>-Ouarzazate is not photovoltaic panels. It is mirrors —
          500,000 parabolic troughs and 7,400 heliostats that concentrate sunlight onto
          receivers filled with molten salt heated to 565°C. The salt stores energy for
          seven hours after sunset. Morocco produces electricity in the dark, from the sun.
        </p>

        {/* KEY NUMBERS */}
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: `${totalCapacity}`, unit: 'MW', l: 'installed capacity', c: C.sun },
            { v: `${(totalGwh / 1000).toFixed(1)}`, unit: 'TWh/yr', l: 'estimated output', c: C.heat },
            { v: `${(totalCo2 / 1000).toFixed(0)}K`, unit: 'tCO₂/yr', l: 'emissions avoided', c: C.green },
            { v: '7', unit: 'hours', l: 'storage after sunset', c: C.salt },
          ].map((n, i) => (
            <div key={n.l} className="transition-all duration-700"
              style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 150}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}>
                <span className="text-[28px] font-bold">{n.v}</span>
                <span className="text-[14px] ml-1">{n.unit}</span>
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SUN TRACKER ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.sun }}>Sun Tracker: Noor III Tower</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Drag the slider to move the sun. Watch heliostats adjust. After sunset, molten salt takes over.
          </p>
          <SunTracker />
        </div>
      </section>

      {/* ═══ 24-HOUR OUTPUT CURVE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={curveR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.salt }}>24-Hour Energy Profile</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Gold = direct solar. Amber = molten salt storage. The gap from 5–6 AM is when salt is depleted and sun hasn&apos;t risen.
          </p>
          <div className="flex items-end gap-[2px] h-[200px] mb-2">
            {HOURLY_OUTPUT.map((h, i) => {
              const directPct = h.direct * 100
              const storedPct = h.stored * 100
              return (
                <div key={i} className="flex-1 flex flex-col justify-end h-full">
                  {/* Stored (bottom) */}
                  <div className="w-full transition-all duration-700 rounded-t-sm"
                    style={{
                      height: curveR.vis ? `${storedPct}%` : '0%',
                      background: `${C.salt}30`,
                      transitionDelay: `${i * 30}ms`,
                    }} />
                  {/* Direct (on top) */}
                  <div className="w-full transition-all duration-700"
                    style={{
                      height: curveR.vis ? `${directPct}%` : '0%',
                      background: `${C.sun}40`,
                      transitionDelay: `${i * 30}ms`,
                      marginTop: storedPct > 0 && directPct > 0 ? -1 : 0,
                    }} />
                </div>
              )
            })}
          </div>
          <div className="flex gap-[2px]">
            {HOURLY_OUTPUT.map((h, i) => (
              <span key={i} className="flex-1 text-center font-mono text-[8px]"
                style={{ color: i % 3 === 0 ? C.text : 'transparent' }}>{h.hour}</span>
            ))}
          </div>
          <div className="flex gap-4 mt-3">
            <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: C.sun }}>
              <span className="w-3 h-2 rounded-sm" style={{ background: `${C.sun}40` }} /> Direct solar
            </span>
            <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: C.salt }}>
              <span className="w-3 h-2 rounded-sm" style={{ background: `${C.salt}30` }} /> Molten salt storage
            </span>
          </div>
        </div>
      </section>

      {/* ═══ THE FOUR PHASES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={phasesR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.trough }}>The Four Phases</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Three CSP technologies + one PV. Click to expand. Capacity bar shows relative size.
          </p>
          <div className="space-y-3">
            {PHASES.map((p, i) => (
              <PhaseCard key={p.name} phase={p} index={i} parentVis={phasesR.vis} maxCap={200} />
            ))}
          </div>
          {/* Totals */}
          <div className="mt-4 pt-3 border-t flex justify-between" style={{ borderColor: C.border }}>
            <span className="font-mono text-[12px] font-bold" style={{ color: C.ink }}>TOTAL</span>
            <div className="flex gap-6">
              <span className="font-mono text-[11px]" style={{ color: C.sun }}>{totalCapacity} MW</span>
              <span className="font-mono text-[11px]" style={{ color: C.green }}>{totalGwh.toLocaleString()} GWh/yr</span>
              <span className="font-mono text-[11px]" style={{ color: C.heat }}>{(totalCo2 / 1000).toFixed(0)}K tCO₂ avoided</span>
              <span className="font-mono text-[11px]" style={{ color: C.muted }}>{totalArea.toLocaleString()} ha</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ENERGY MIX: 2023 vs 2030 ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={mixR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.green }}>Morocco Energy Mix: 2023 → 2030</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            64% coal today. Target: 52% renewable by 2030. The transition requires 10.5 GW of new solar, wind, and hydro.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 2023 */}
            <div>
              <p className="font-mono text-[12px] font-bold mb-2" style={{ color: C.ink }}>2023 (electricity production)</p>
              <div className="flex h-8 rounded-sm overflow-hidden mb-2">
                {ENERGY_MIX_2023.map((e, i) => (
                  <div key={e.source} className="h-full transition-all duration-700 group relative"
                    style={{
                      width: mixR.vis ? `${e.pct}%` : '0%',
                      background: `${e.color}30`,
                      borderRight: i < ENERGY_MIX_2023.length - 1 ? '1px solid white' : 'none',
                      transitionDelay: `${i * 60}ms`,
                    }}>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10"
                      style={{ background: e.color, color: 'white', fontSize: 9, fontFamily: "'IBM Plex Mono', monospace" }}>
                      {e.source} {e.pct}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                {ENERGY_MIX_2023.map(e => (
                  <span key={e.source} className="font-mono text-[9px] flex items-center gap-1" style={{ color: C.text }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: e.color }} /> {e.source} {e.pct}%
                  </span>
                ))}
              </div>
            </div>
            {/* 2030 Target */}
            <div>
              <p className="font-mono text-[12px] font-bold mb-2" style={{ color: C.green }}>2030 Target (installed capacity)</p>
              <div className="flex h-8 rounded-sm overflow-hidden mb-2">
                {ENERGY_TARGET_2030.map((e, i) => (
                  <div key={e.source} className="h-full transition-all duration-700 group relative"
                    style={{
                      width: mixR.vis ? `${e.pct}%` : '0%',
                      background: `${e.color}30`,
                      borderRight: i < ENERGY_TARGET_2030.length - 1 ? '1px solid white' : 'none',
                      transitionDelay: `${i * 60 + 300}ms`,
                    }}>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10"
                      style={{ background: e.color, color: 'white', fontSize: 9, fontFamily: "'IBM Plex Mono', monospace" }}>
                      {e.source} {e.pct}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                {ENERGY_TARGET_2030.map(e => (
                  <span key={e.source} className="font-mono text-[9px] flex items-center gap-1" style={{ color: C.text }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: e.color }} /> {e.source} {e.pct}%
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RENEWABLE ROADMAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={roadR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.sun }}>Renewable Roadmap</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            From 0.3 GW in 2009 to 10.5 GW target by 2030. A 35× increase in two decades.
          </p>
          <div className="space-y-2">
            {RENEWABLE_MILESTONES.map((m, i) => (
              <div key={m.year} className="flex items-center gap-3 transition-all duration-500"
                style={{ opacity: roadR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
                <span className="font-mono text-[13px] font-bold w-12 shrink-0"
                  style={{ color: m.year >= 2030 ? C.green : C.sun }}>{m.year}</span>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: m.year >= 2030 ? C.green : C.sun }} />
                <span className="font-mono text-[11px] flex-1" style={{ color: C.text }}>{m.event}</span>
                <span className="font-mono text-[11px] font-bold w-20 text-right shrink-0"
                  style={{ color: m.year >= 2030 ? C.green : C.sun }}>{m.capacity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.salt }}>Why Molten Salt Matters</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Standard solar PV stops producing the moment the sun sets. Morocco&apos;s peak
                electricity demand is in the evening — after sunset. Molten salt, heated to 565°C
                by concentrated sunlight, stores that energy as heat and releases it through steam
                turbines for 7 hours into the night. This is what makes CSP different from PV:
                it is a dispatchable renewable. It runs on demand, not on sunshine.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.trough }}>Trough vs Tower</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Noor I and II use parabolic troughs — curved mirrors that focus sunlight onto a
                tube of synthetic oil running along their focal line. Noor III uses a tower:
                7,400 flat mirrors (heliostats) reflect sunlight to a single receiver atop a
                250-metre tower, heating molten salt directly. The tower reaches higher temperatures
                (565°C vs 393°C), making it more efficient but more complex.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.coal }}>The Coal Problem</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                In 2023, coal still generated 64% of Morocco&apos;s electricity. The country imports
                over 90% of its energy. The 52% renewable target by 2030 requires adding 10.5 GW of
                new solar, wind, and hydro — more than doubling current renewable capacity. Noor
                showed it is possible. The question is speed: 5 years to close a 12-point gap
                between 40.7% today and 52% target.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            In the same desert where they filmed Game of Thrones, Morocco built
            something more improbable than dragons. A plant that captures the
            Saharan sun in liquid salt and releases it as electricity after dark.
            580 megawatts. Enough for a million homes. And it was just the first
            project. The compass points south — toward the sun.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Noor-Ouarzazate specifications: MASEN, ACWA Power project documentation, World Bank
            (Clean Technology Fund), CIF background brief. Phase capacities: 160 + 200 + 150 + 72 MW
            (Wikipedia/MASEN). GWh estimates: Noor I 370, Noor II 600, Noor III 500 (King&apos;s College London,
            Power Technology). CO₂ offsets: 690,000 t/yr total (Morocco World News Sep 2025, Borgen Project Aug 2025).
            Storage: 3h (Noor I), 7h (Noor II, III). Tower height 250m (Sener). Morocco energy mix 2023:
            ANRE/ONEE via trade.gov. 2030 target: 52% (IEA, MASEN). Installed RE capacity: IEA-PVPS 2024
            (11,474 MW total, 40.7% renewable). Solar capacity 1,515 MW and wind 935 MW (2025 est., Enerdata
            Feb 2025). ANRE 9.3 GW target by 2029 (Enerdata). Heliostat count: 7,400 (CIF).
            Cost: $9B total program estimate (Reuters/MASEN).
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.sun }}>Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}

// ═══ PHASE CARD ═══
function PhaseCard({ phase: p, index, parentVis, maxCap }: { phase: typeof PHASES[0]; index: number; parentVis: boolean; maxCap: number }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="border rounded-sm overflow-hidden cursor-pointer transition-all duration-500"
      style={{ borderColor: expanded ? p.color : C.border, opacity: parentVis ? 1 : 0, transitionDelay: `${index * 80}ms` }}
      onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center gap-3 p-4">
        <div className="w-3 h-10 rounded-sm shrink-0" style={{ background: p.color }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[13px] font-bold" style={{ color: C.ink }}>{p.name}</span>
            <span className="font-mono text-[12px] font-bold" style={{ color: p.color }}>{p.capacity} MW</span>
          </div>
          <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{p.type} · {p.commissioned}</span>
          {/* Capacity bar */}
          <div className="mt-1 h-2 rounded-sm" style={{ background: `${C.border}30` }}>
            <div className="h-full rounded-sm transition-all duration-700"
              style={{ width: parentVis ? `${(p.capacity / maxCap) * 100}%` : '0%', background: `${p.color}25`, borderRight: `2px solid ${p.color}`, transitionDelay: `${index * 80}ms` }} />
          </div>
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t" style={{ borderColor: `${p.color}20` }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
            {[
              { l: 'Output', v: `${p.gwh} GWh/yr` },
              { l: 'Storage', v: p.storage > 0 ? `${p.storage}h molten salt` : 'None' },
              { l: 'CO₂ avoided', v: p.co2 > 0 ? `${(p.co2 / 1000).toFixed(0)}K t/yr` : '—' },
              { l: 'Area', v: `${p.area} hectares` },
              { l: 'Cooling', v: p.cooling },
            ].map(f => (
              <div key={f.l}>
                <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.7)' }}>{f.l}</p>
                <p className="font-mono text-[11px]" style={{ color: C.text }}>{f.v}</p>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.7)' }}>{p.note}</p>
        </div>
      )}
    </div>
  )
}
