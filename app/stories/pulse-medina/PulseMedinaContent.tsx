'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ═══ THE PULSE OF THE MEDINA ═══
// Generative visualization of Marrakech's medina as a living organism.
// Streets as pulsating threads. Colour = craft quarter. Width = crowd density.
// Time slider: 5AM fajr → midnight silence.

const C = {
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  bg: '#0D0B09',
}

// ═══ CRAFT QUARTERS ═══
interface Quarter {
  id: string
  name: string
  craft: string
  color: string
  colorLight: string
  sound: string
  x: number
  y: number
  radius: number
  peakHour: number
  intensity: number
}

const QUARTERS: Quarter[] = [
  { id: 'tannery', name: 'Bab Debbagh', craft: 'Tanneries', color: '#8B4513', colorLight: '#D2691E', sound: 'Scraping hides, water sloshing', x: 0.75, y: 0.25, radius: 0.12, peakHour: 10, intensity: 0.8 },
  { id: 'copper', name: 'Souk Haddadine', craft: 'Coppersmiths', color: '#CD7F32', colorLight: '#DFA654', sound: 'Hammering copper, ringing metal', x: 0.45, y: 0.35, radius: 0.10, peakHour: 11, intensity: 0.9 },
  { id: 'zellige', name: 'Souk Smarine area', craft: 'Zellige & Tile', color: '#1E8C8C', colorLight: '#3AC5C5', sound: 'Chiseling tile, tapping geometry', x: 0.35, y: 0.45, radius: 0.08, peakHour: 10, intensity: 0.7 },
  { id: 'spice', name: 'Rahba Kedima', craft: 'Spices & Herbs', color: '#C17F28', colorLight: '#E5A84B', sound: 'Grinding, measuring, haggling', x: 0.42, y: 0.48, radius: 0.09, peakHour: 12, intensity: 0.85 },
  { id: 'textile', name: 'Souk Semmarine', craft: 'Textiles & Silk', color: '#8B2252', colorLight: '#C94480', sound: 'Loom clacking, fabric unrolling', x: 0.40, y: 0.42, radius: 0.11, peakHour: 14, intensity: 0.75 },
  { id: 'leather', name: 'Souk el-Kebir', craft: 'Leather goods', color: '#6B3A2A', colorLight: '#9B6040', sound: 'Stitching, cutting, pressing', x: 0.55, y: 0.38, radius: 0.10, peakHour: 11, intensity: 0.8 },
  { id: 'wood', name: 'Souk Chouari', craft: 'Woodwork & Cedar', color: '#5C4033', colorLight: '#8B6B4A', sound: 'Sawing, carving, sanding', x: 0.38, y: 0.38, radius: 0.08, peakHour: 10, intensity: 0.7 },
  { id: 'dyer', name: 'Souk Sebbaghine', craft: 'Dyers', color: '#4A2D7A', colorLight: '#7B52B5', sound: 'Wringing, dripping, steaming', x: 0.60, y: 0.32, radius: 0.07, peakHour: 9, intensity: 0.65 },
  { id: 'gold', name: 'Souk Siyyaghin', craft: 'Gold & Jewellery', color: '#C8A415', colorLight: '#E8C94A', sound: 'Delicate tapping, scales clicking', x: 0.40, y: 0.50, radius: 0.06, peakHour: 15, intensity: 0.6 },
  { id: 'jemaa', name: 'Jemaa el-Fna', craft: 'Street performers', color: '#C54B3C', colorLight: '#E87060', sound: 'Drums, stories, sizzling food', x: 0.35, y: 0.58, radius: 0.14, peakHour: 20, intensity: 1.0 },
  { id: 'mosque', name: 'Koutoubia', craft: 'Sacred', color: '#2D6E4F', colorLight: '#4AAF7A', sound: 'Adhan, silence, contemplation', x: 0.30, y: 0.55, radius: 0.15, peakHour: 5, intensity: 0.5 },
]

// ═══ TIME MODEL ═══
const DAY = [
  { hour: 0, label: '12:00 AM', activity: 0.02, ambient: '#0D0B09', event: 'Deep silence' },
  { hour: 1, label: '1:00 AM', activity: 0.01, ambient: '#0D0B09' },
  { hour: 2, label: '2:00 AM', activity: 0.01, ambient: '#0D0B09' },
  { hour: 3, label: '3:00 AM', activity: 0.02, ambient: '#0D0B09' },
  { hour: 4, label: '4:00 AM', activity: 0.05, ambient: '#100E0B', event: 'Bakers light ovens' },
  { hour: 5, label: '5:00 AM', activity: 0.15, ambient: '#1A1510', event: 'Fajr \u2014 first call to prayer' },
  { hour: 6, label: '6:00 AM', activity: 0.25, ambient: '#2A2018', event: 'Bread arrives at the ferran' },
  { hour: 7, label: '7:00 AM', activity: 0.35, ambient: '#3A2D20', event: 'Donkeys carry goods inward' },
  { hour: 8, label: '8:00 AM', activity: 0.50, ambient: '#4A3828', event: 'Souks begin opening' },
  { hour: 9, label: '9:00 AM', activity: 0.65, ambient: '#5A4530', event: 'Artisans at their stations' },
  { hour: 10, label: '10:00 AM', activity: 0.80, ambient: '#6A5238', event: 'Peak craft activity' },
  { hour: 11, label: '11:00 AM', activity: 0.85, ambient: '#705840', event: 'Copper hammering peaks' },
  { hour: 12, label: '12:00 PM', activity: 0.75, ambient: '#6A5238', event: 'Dhuhr prayer. Brief pause.' },
  { hour: 13, label: '1:00 PM', activity: 0.55, ambient: '#5A4530', event: 'Lunch break. Quiet.' },
  { hour: 14, label: '2:00 PM', activity: 0.45, ambient: '#4A3828', event: 'Heat. Shade. Siesta.' },
  { hour: 15, label: '3:00 PM', activity: 0.55, ambient: '#5A4530', event: 'Asr prayer. Slow reopening.' },
  { hour: 16, label: '4:00 PM', activity: 0.70, ambient: '#6A5238', event: 'Tourist wave. Haggling.' },
  { hour: 17, label: '5:00 PM', activity: 0.80, ambient: '#5A4530', event: 'Golden hour. Souks buzzing.' },
  { hour: 18, label: '6:00 PM', activity: 0.75, ambient: '#4A3828', event: 'Maghrib prayer. Souks close.' },
  { hour: 19, label: '7:00 PM', activity: 0.65, ambient: '#3A2D20', event: 'Dinner preparations' },
  { hour: 20, label: '8:00 PM', activity: 0.80, ambient: '#2A2018', event: 'Jemaa el-Fna peaks' },
  { hour: 21, label: '9:00 PM', activity: 0.90, ambient: '#1A1510', event: 'Storytellers. Food stalls. Fire.' },
  { hour: 22, label: '10:00 PM', activity: 0.60, ambient: '#141210', event: 'Crowds thinning' },
  { hour: 23, label: '11:00 PM', activity: 0.20, ambient: '#100E0B', event: 'Cats own the alleys' },
]

// ═══ THREAD GENERATION ═══
interface ThreadPt { x: number; y: number }
interface Thread {
  points: ThreadPt[]
  quarterId: string
  baseWidth: number
  isMain: boolean
}

function makeThreads(): Thread[] {
  const out: Thread[] = []
  let s = 42
  const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647 }

  // Main arteries from center
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + r() * 0.3
    const pts: ThreadPt[] = []
    const n = 12 + Math.floor(r() * 8)
    for (let j = 0; j < n; j++) {
      const t = j / (n - 1)
      const rad = t * 0.42
      const w = (r() - 0.5) * 0.04
      pts.push({ x: 0.38 + rad * Math.cos(a + w * t * 3), y: 0.48 + rad * Math.sin(a + w * t * 3) })
    }
    out.push({ points: pts, quarterId: nearest(pts[Math.floor(pts.length / 2)]), baseWidth: 2.5 + r() * 1.5, isMain: true })
  }

  // Secondary streets
  for (let i = 0; i < 35; i++) {
    const sa = r() * Math.PI * 2, sr = 0.08 + r() * 0.3
    const pts: ThreadPt[] = []
    const n = 8 + Math.floor(r() * 10)
    let cx = 0.38 + sr * Math.cos(sa), cy = 0.48 + sr * Math.sin(sa), d = sa + (r() - 0.5) * 2
    for (let j = 0; j < n; j++) {
      pts.push({ x: cx, y: cy })
      d += (r() - 0.5) * 0.8
      cx += Math.cos(d) * (0.015 + r() * 0.01)
      cy += Math.sin(d) * (0.015 + r() * 0.01)
    }
    out.push({ points: pts, quarterId: nearest(pts[Math.floor(pts.length / 2)]), baseWidth: 1 + r() * 1.5, isMain: false })
  }

  // Derbs (thin, short)
  for (let i = 0; i < 80; i++) {
    const sa = r() * Math.PI * 2, sr = 0.05 + r() * 0.35
    const pts: ThreadPt[] = []
    const n = 3 + Math.floor(r() * 5)
    let cx = 0.38 + sr * Math.cos(sa), cy = 0.48 + sr * Math.sin(sa), d = sa + (r() - 0.5) * 3
    for (let j = 0; j < n; j++) {
      pts.push({ x: cx, y: cy })
      d += (r() - 0.5) * 1.2
      cx += Math.cos(d) * (0.008 + r() * 0.008)
      cy += Math.sin(d) * (0.008 + r() * 0.008)
    }
    out.push({ points: pts, quarterId: nearest(pts[Math.floor(pts.length / 2)]), baseWidth: 0.3 + r() * 0.7, isMain: false })
  }

  return out
}

function nearest(pt: ThreadPt): string {
  let best = QUARTERS[0].id, min = Infinity
  QUARTERS.forEach(q => { const d = Math.hypot(pt.x - q.x, pt.y - q.y); if (d < min) { min = d; best = q.id } })
  return best
}

function quarterActivity(q: Quarter, hour: number): number {
  const diff = Math.abs(hour - q.peakHour)
  const wrapped = Math.min(diff, 24 - diff)
  const curve = Math.exp(-(wrapped * wrapped) / 18) * q.intensity
  const dayA = DAY[Math.floor(hour) % 24].activity
  return curve * dayA
}

// ═══ COMPONENT ═══
export function PulseMedinaContent() {
  const [hour, setHour] = useState(10)
  const [playing, setPlaying] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threadsRef = useRef<Thread[]>([])
  const frameRef = useRef(0)
  const tRef = useRef(0)

  useEffect(() => { threadsRef.current = makeThreads() }, [])

  const draw = useCallback(() => {
    const cvs = canvasRef.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return
    const w = cvs.width, h = cvs.height
    tRef.current += 0.015
    const t = tRef.current

    const slice = DAY[Math.floor(hour) % 24]

    // Background
    ctx.fillStyle = slice.ambient
    ctx.fillRect(0, 0, w, h)

    // Quarter glows
    QUARTERS.forEach(q => {
      const a = quarterActivity(q, hour)
      if (a > 0.03) {
        const g = ctx.createRadialGradient(q.x * w, q.y * h, 0, q.x * w, q.y * h, q.radius * w * 1.2)
        g.addColorStop(0, q.color + Math.floor(a * 25).toString(16).padStart(2, '0'))
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }
    })

    // Threads
    threadsRef.current.forEach(thread => {
      const q = QUARTERS.find(qq => qq.id === thread.quarterId)
      if (!q) return
      const a = quarterActivity(q, hour)
      const pulse = 1 + Math.sin(t * 2 + thread.points[0].x * 10) * 0.15
      const width = thread.baseWidth * (0.3 + a * 1.2) * pulse
      if (width < 0.12) return

      const alpha = Math.min(0.9, 0.05 + a * 0.8)
      const col = a > 0.1 ? q.colorLight : '#3A3530'

      ctx.beginPath()
      ctx.strokeStyle = col
      ctx.globalAlpha = alpha
      ctx.lineWidth = width
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      const pts = thread.points
      ctx.moveTo(pts[0].x * w, pts[0].y * h)
      for (let i = 1; i < pts.length; i++) {
        const wx = Math.sin(t * 1.5 + i * 2) * a * 0.8
        const wy = Math.cos(t * 1.3 + i * 2.5) * a * 0.8
        ctx.lineTo(pts[i].x * w + wx, pts[i].y * h + wy)
      }
      ctx.stroke()

      // Glow for arteries
      if (thread.isMain && a > 0.3) {
        ctx.strokeStyle = q.color
        ctx.globalAlpha = a * 0.12
        ctx.lineWidth = width * 3.5
        ctx.beginPath()
        ctx.moveTo(pts[0].x * w, pts[0].y * h)
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x * w, pts[i].y * h)
        ctx.stroke()
      }
    })

    ctx.globalAlpha = 1

    // Quarter labels
    ctx.textAlign = 'center'
    QUARTERS.forEach(q => {
      const a = quarterActivity(q, hour)
      if (a > 0.12) {
        ctx.fillStyle = q.colorLight
        ctx.globalAlpha = Math.min(0.6, a * 0.8)
        ctx.font = `600 ${7 + a * 4}px "IBM Plex Mono", monospace`
        ctx.fillText(q.name.toUpperCase(), q.x * w, q.y * h - 8)
        ctx.font = `italic ${6 + a * 2}px "IBM Plex Mono", monospace`
        ctx.globalAlpha = Math.min(0.35, a * 0.5)
        ctx.fillText(q.craft, q.x * w, q.y * h + 4)
      }
    })

    // Rampart circle (faint)
    ctx.globalAlpha = 0.08 + slice.activity * 0.04
    ctx.strokeStyle = '#6B6050'
    ctx.lineWidth = 1.5
    ctx.setLineDash([4, 6])
    ctx.beginPath()
    ctx.ellipse(0.38 * w, 0.48 * h, 0.4 * w, 0.42 * h, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.globalAlpha = 1

    frameRef.current = requestAnimationFrame(draw)
  }, [hour])

  useEffect(() => {
    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [draw])

  // Autoplay
  useEffect(() => {
    if (!playing) return
    const iv = setInterval(() => {
      setHour(h => { const n = h + 0.25; return n >= 24 ? 0 : n })
    }, 150)
    return () => clearInterval(iv)
  }, [playing])

  const slice = DAY[Math.floor(hour) % 24]

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: '#E8E0D4' }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-4">
        <p className="text-[10px] tracking-[3px] uppercase mb-2" style={{ color: '#6B6050' }}>Module 022 · Generative Sensory Map</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Pulse of the Medina</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: '#8B7D6B' }}>
          Marrakech breathes. Watch it.
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4" style={{ color: '#8B7D6B' }}>
          A <span className="underline underline-offset-2">medina</span> is not a place. It is a rhythm. At 5am the adhan sounds from
          186 minarets and the bakers light their ovens. By 10am the coppersmiths are
          hammering in polyrhythm and the spice merchants are measuring saffron on
          brass scales. By 2pm the heat empties the alleys. By 9pm Jemaa el-Fna is a
          bonfire of drums and storytelling and grilled meat. By midnight the cats
          inherit everything. This visualization renders that rhythm as a living
          organism — streets as pulsating threads, coloured by the craft that lives
          on them, thickening with the crowd. Drag the slider. Watch the city breathe.
        </p>
      </section>

      {/* CANVAS */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 mt-4">
        <div className="relative border" style={{ borderColor: '#2A2520' }}>
          <canvas ref={canvasRef} width={1000} height={800} className="w-full h-auto block" />

          {/* Time overlay */}
          <div className="absolute top-4 left-4">
            <p className="text-[28px] font-serif italic" style={{ color: '#E8E0D440' }}>
              {slice.label}
            </p>
            {slice.event && (
              <p className="text-[11px] mt-1" style={{ color: '#8B7D6B' }}>{slice.event}</p>
            )}
          </div>

          {/* Activity bar */}
          <div className="absolute top-4 right-4 w-[60px]">
            <p className="text-[7px] tracking-[2px] uppercase mb-1 text-right" style={{ color: '#6B6050' }}>Activity</p>
            <div className="h-[100px] w-[4px] ml-auto relative" style={{ background: '#2A2520' }}>
              <div className="absolute bottom-0 w-full transition-all duration-500"
                style={{ height: `${slice.activity * 100}%`, background: 'linear-gradient(to top, #C54B3C, #C8A415)', opacity: 0.6 }} />
            </div>
            <p className="text-[9px] text-right mt-1" style={{ color: '#C17F28' }}>{Math.round(slice.activity * 100)}%</p>
          </div>
        </div>

        {/* TIME SLIDER */}
        <div className="mt-4 px-2">
          <div className="flex items-center gap-3">
            <button onClick={() => setPlaying(!playing)}
              className="w-[32px] h-[32px] flex items-center justify-center border transition-opacity hover:opacity-70"
              style={{ borderColor: '#4A4030', color: '#C17F28' }}>
              <span className="text-[12px]">{playing ? '\u275A\u275A' : '\u25B6'}</span>
            </button>
            <div className="flex-1">
              <input type="range" min={0} max={23.75} step={0.25} value={hour}
                onChange={e => setHour(parseFloat(e.target.value))}
                className="w-full" style={{ accentColor: '#8B6914' }} />
              <div className="flex justify-between mt-1">
                {[0, 3, 6, 9, 12, 15, 18, 21].map(h => (
                  <span key={h} className="text-[7px]" style={{ color: '#4A4030' }}>
                    {h === 0 ? '12AM' : h === 12 ? '12PM' : h < 12 ? `${h}AM` : `${h - 12}PM`}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Prayer markers */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {[
              { n: 'Fajr', h: 5, c: '#2D6E4F' },
              { n: 'Dhuhr', h: 12, c: '#C8A415' },
              { n: 'Asr', h: 15, c: '#C17F28' },
              { n: 'Maghrib', h: 18, c: '#C54B3C' },
              { n: 'Isha', h: 20, c: '#4A2D7A' },
            ].map(p => (
              <button key={p.n} onClick={() => { setHour(p.h); setPlaying(false) }}
                className="text-[8px] tracking-[2px] uppercase px-2 py-1 border transition-opacity hover:opacity-70"
                style={{ borderColor: p.c + '40', color: p.c }}>
                {p.n} ({p.h}:00)
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* QUARTER LEGEND */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-8">
        <div className="border-t pt-6" style={{ borderColor: '#2A2520' }}>
          <p className="text-[10px] tracking-[3px] uppercase mb-4" style={{ color: '#6B6050' }}>
            Craft Quarters — colour = trade, brightness = activity at current hour
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {QUARTERS.filter(q => q.id !== 'mosque').map(q => {
              const a = quarterActivity(q, hour)
              return (
                <div key={q.id} className="border p-2 transition-all duration-500"
                  style={{
                    borderColor: q.color + Math.floor(20 + a * 60).toString(16).padStart(2, '0'),
                    background: q.color + Math.floor(a * 15).toString(16).padStart(2, '0'),
                  }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: q.colorLight, opacity: 0.3 + a * 0.7 }} />
                    <p className="text-[9px] font-semibold" style={{ color: q.colorLight }}>{q.craft}</p>
                  </div>
                  <p className="text-[7px]" style={{ color: '#6B6050' }}>{q.name}</p>
                  <p className="text-[7px] italic" style={{ color: '#4A4030' }}>{q.sound}</p>
                  <p className="text-[8px] mt-1" style={{ color: q.colorLight, opacity: 0.6 }}>
                    {Math.round(a * 100)}% active
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SOUNDSCAPE TABLE */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-8">
        <div className="border-t pt-6" style={{ borderColor: '#2A2520' }}>
          <p className="text-[10px] tracking-[3px] uppercase mb-4" style={{ color: '#6B6050' }}>
            24-Hour Soundscape — what you hear at each hour
          </p>
          <div className="overflow-x-auto">
            <div className="flex gap-[2px] min-w-[800px]">
              {DAY.map(d => {
                const isNow = Math.floor(hour) === d.hour
                return (
                  <div key={d.hour}
                    className="flex-1 cursor-pointer transition-all"
                    onClick={() => { setHour(d.hour); setPlaying(false) }}
                    style={{
                      background: isNow ? '#2A2520' : 'transparent',
                      borderBottom: isNow ? '2px solid #C17F28' : '2px solid transparent',
                      padding: '4px 2px',
                    }}>
                    <div className="w-full" style={{
                      height: `${d.activity * 60}px`,
                      background: `linear-gradient(to top, ${d.ambient}, ${d.activity > 0.5 ? '#C17F28' : '#3A3020'})`,
                      opacity: 0.4 + d.activity * 0.6,
                      marginTop: `${60 - d.activity * 60}px`,
                    }} />
                    <p className="text-[5px] text-center mt-1" style={{ color: isNow ? '#C17F28' : '#3A3020' }}>
                      {d.hour}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-10">
        <div className="border-t pt-8" style={{ borderColor: '#2A2520' }}>
          <p className="text-[10px] tracking-[3px] uppercase mb-6" style={{ color: '#6B6050' }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-[10px] tracking-[2px] uppercase mb-2" style={{ color: '#CD7F32' }}>The Sound Map</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: '#8B7D6B' }}>
                You can navigate the medina with your eyes closed. The coppersmiths
                announce themselves with rhythmic hammer-on-metal a full street away.
                The tanneries announce themselves by smell. The textile souk whispers
                with loom clatter. By 10am, the hammering reaches its peak &mdash; 50+ smiths
                beating simultaneously, a polyrhythmic wall of sound that tourists
                mistake for construction. By 1pm it stops for prayer. By 6pm it stops
                for the day. The silence that follows is the medina exhaling.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[2px] uppercase mb-2" style={{ color: '#C54B3C' }}>The Two Peaks</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: '#8B7D6B' }}>
                The medina has two rhythms that rarely overlap. The daytime peak
                (9am&ndash;12pm) belongs to the artisans &mdash; craft, production, wholesale.
                The nighttime peak (8pm&ndash;10pm) belongs to Jemaa el-Fna &mdash; performance,
                food, spectacle. Between them is the trough of the afternoon heat
                (1pm&ndash;3pm), when even the cats sleep. During Ramadan, these rhythms
                invert: the daytime is quiet, the night explodes after iftar. The
                medina is the same streets, the same stones, but a different city
                depending on the hour.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[2px] uppercase mb-2" style={{ color: '#2D6E4F' }}>The Five Pauses</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: '#8B7D6B' }}>
                Five times a day, the adhan sounds from 186 minarets. For a few
                minutes, the medina pauses. Not stops &mdash; pauses. The devout pray.
                Others use the moment to drink tea, rest, recalibrate. The hammering
                quiets. The haggling softens. Then it resumes. This five-beat rhythm &mdash;
                Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), Isha
                (night) &mdash; is the medina&apos;s heartbeat. Not the clock. Not the
                tourist schedule. The adhan. It has been this way for 954 years and
                it will be this way tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: '#2A2520' }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: '#E8E0D4' }}>
            A thousand years of people walking the same stones have worn grooves
            into the marble thresholds of Souk Semmarine. The groove is deepest
            on the left side, because the souk turns right 40 metres ahead and
            everyone drifts left to prepare. The stone has memorised the crowd.
            The crowd has memorised the stone. This is what a data visualization
            of a medina should feel like &mdash; not a map you read, but a pulse
            you recognize.
          </p>
        </div>
      </section>

      {/* SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: '#2A2520' }}>
          <p className="text-[10px] tracking-[3px] uppercase mb-2" style={{ color: '#6B6050' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: '#4A4030' }}>
            Activity rhythms derived from Riad di Siena field observation (11 years, Laksour quarter),
            visitor flow surveys, and artisan workshop schedules. Sound mapping from direct observation
            of Souk Haddadine (coppersmiths), Souk Sebbaghine (dyers), Bab Debbagh tanneries. Prayer
            times from Ministry of Habous and Islamic Affairs. Jemaa el-Fna rhythm from UNESCO
            Intangible Cultural Heritage documentation. Quarter positions approximate &mdash; the medina
            is a tangle, not a grid. Thread generation is procedural; the patterns are representative
            of density and flow, not cartographically precise. All timestamps are typical non-Ramadan
            winter/spring day (sunrise ~6:30AM, sunset ~6:30PM).
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: '#2A2520' }}>
              &copy; {new Date().getFullYear()} Slow Morocco. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: '#2D6E4F' }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
