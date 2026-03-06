'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  construction: '#2D6E8E', star: '#C17F28', zellige: '#1E8C8C',
  dynasty: '#722F37', green: '#2D6E4F',
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

interface StarFamily {
  n: number; name: string; arabicName: string; wallpaperGroup: string
  prevalence: string; dynasties: string; construction: string; innerRatio: number
  monuments: string[]
}

const STARS: StarFamily[] = [
  { n: 6, name: '6-Fold Star', arabicName: 'Najma Sudasia', wallpaperGroup: 'p6mm', prevalence: 'Very common', dynasties: 'All dynasties', construction: 'Two overlapping equilateral triangles', innerRatio: 0.5, monuments: ['Koutoubia Mosque (Marrakech)', 'Qarawiyyin Mosque (Fez)'] },
  { n: 8, name: '8-Fold Star', arabicName: 'Khatem Sulemani', wallpaperGroup: 'p4mm', prevalence: 'Most common', dynasties: 'Almoravid \u2192 present', construction: 'Two overlapping squares rotated 45\u00b0', innerRatio: 0.38, monuments: ['Ben Youssef Medersa (Marrakech)', 'Alhambra (Granada)'] },
  { n: 10, name: '10-Fold Star', arabicName: 'Najma Asharia', wallpaperGroup: 'p5m (quasi)', prevalence: 'Common in Marinid', dynasties: 'Marinid, Almohad', construction: 'Two overlapping pentagons', innerRatio: 0.35, monuments: ['Bou Inania Medersa (Fez)', 'Al Attarine Medersa (Fez)'] },
  { n: 12, name: '12-Fold Star', arabicName: 'Shamsa', wallpaperGroup: 'p6mm', prevalence: 'Elaborate works', dynasties: 'Marinid, Saadian', construction: 'Three overlapping squares at 30\u00b0', innerRatio: 0.4, monuments: ['Saadian Tombs (Marrakech)', 'Dar Batha (Fez)'] },
  { n: 16, name: '16-Fold Rosette', arabicName: 'Tastir', wallpaperGroup: 'p4mm', prevalence: 'Masterworks only', dynasties: 'Marinid, Alawite', construction: 'Two overlapping octagons', innerRatio: 0.42, monuments: ['Royal Palace doors (Fez)', 'Moulay Ismail Mausoleum (Mekn\u00e8s)'] },
  { n: 24, name: '24-Fold Rosette', arabicName: 'Shamsa Kubra', wallpaperGroup: 'p6mm', prevalence: 'Extremely rare', dynasties: 'Master craftsmen only', construction: 'Six overlapping squares at 15\u00b0 intervals', innerRatio: 0.45, monuments: ['Public Fountain (Fez, 14th c.)', 'Mausoleum of Resistance (Fez)'] },
]

const WALLPAPER_GROUPS = [
  { group: 'p1', desc: 'Translation only', complexity: 1, inMorocco: 'Brick patterns, simple borders' },
  { group: 'p2', desc: '180\u00b0 rotation', complexity: 2, inMorocco: 'Floor tiles, knotwork' },
  { group: 'p4', desc: '90\u00b0 rotation', complexity: 3, inMorocco: 'Square tile grids' },
  { group: 'p4mm', desc: '90\u00b0 rotation + mirrors', complexity: 5, inMorocco: '8-fold and 16-fold star patterns' },
  { group: 'p3m1', desc: '120\u00b0 rotation + mirrors', complexity: 4, inMorocco: 'Triangular zellige fields' },
  { group: 'p6mm', desc: '60\u00b0 rotation + mirrors', complexity: 6, inMorocco: '6-fold, 12-fold, 24-fold stars' },
  { group: 'cmm', desc: 'Glide reflections', complexity: 4, inMorocco: 'Interlocking Y patterns' },
]

// Generate SVG star path
function starPoints(cx: number, cy: number, outerR: number, innerR: number, n: number): string {
  const pts: string[] = []
  for (let i = 0; i < n * 2; i++) {
    const angle = (i * Math.PI) / n - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return pts.join(' ')
}

function StarIcon({ n, innerRatio, size = 48, color = C.star }: { n: number; innerRatio: number; size?: number; color?: string }) {
  const cx = size / 2, cy = size / 2, outer = size * 0.45, inner = outer * innerRatio
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={starPoints(cx, cy, outer, inner, n)} fill={`${color}15`} stroke={color} strokeWidth={1} />
      <circle cx={cx} cy={cy} r={outer} fill="none" stroke={C.construction} strokeWidth={0.5} strokeDasharray="2,2" opacity={0.3} />
    </svg>
  )
}

export function GeometryOfCultureContent() {
  const heroR = useReveal()
  const starsR = useReveal()
  const wpR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Mathematical Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Geometry of Culture</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            The mathematics of Moroccan zellige and Islamic geometry.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Every zellige mosaic, every carved plaster panel, every cedar lattice in Morocco
          is built from the same mathematics: compass-and-straightedge construction. A circle
          divided into 6, 8, 10, 12, 16, or 24 points generates the star pattern. The more
          points, the more skill required. A 24-fold rosette demands a master — it uses six
          overlapping squares rotated at 15° intervals. The geometry is the grammar; the
          craftsman is the poet.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-8">
          {STARS.map(s => (
            <div key={s.n} className="flex flex-col items-center">
              <StarIcon n={s.n} innerRatio={s.innerRatio} size={56} />
              <span className="font-mono text-[11px] font-bold mt-1" style={{ color: C.star }}>{s.n}</span>
              <span className="font-mono text-[9px]" style={{ color: C.muted }}>fold</span>
            </div>
          ))}
        </div>
      </section>

      {/* STAR FAMILIES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={starsR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.star }}>The Six Star Families</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Click to expand. Complexity increases left to right. Construction lines show the compass method.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {STARS.map((s, i) => (
              <StarCard key={s.n} star={s} index={i} parentVis={starsR.vis} />
            ))}
          </div>
        </div>
      </section>

      {/* WALLPAPER GROUPS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={wpR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.construction }}>The 17 Wallpaper Groups</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Mathematically, there are exactly 17 ways to tile a plane with repeating symmetry.
            Moroccan craftsmen discovered all 17 through practice, centuries before mathematicians proved it.
            Here are the most common in Moroccan zellige:
          </p>
          <div className="space-y-2">
            {WALLPAPER_GROUPS.map((w, i) => (
              <div key={w.group} className="flex items-center gap-3 transition-all duration-500"
                style={{ opacity: wpR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                <span className="font-mono text-[13px] font-bold w-14 shrink-0" style={{ color: C.construction }}>{w.group}</span>
                <div className="flex-1 h-5 rounded-sm" style={{ background: `${C.border}30` }}>
                  <div className="h-full rounded-sm transition-all duration-700"
                    style={{ width: wpR.vis ? `${(w.complexity / 6) * 100}%` : '0%', background: `${C.construction}${Math.round(15 + w.complexity * 8).toString(16)}`, transitionDelay: `${i * 80}ms` }} />
                </div>
                <span className="font-mono text-[10px] w-48 shrink-0" style={{ color: C.text }}>{w.desc}</span>
                <span className="font-mono text-[10px] w-56 shrink-0 hidden md:block" style={{ color: C.muted }}>{w.inMorocco}</span>
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
              <p className="micro-label mb-2" style={{ color: C.star }}>Why Stars, Not Faces</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Islamic art avoids figurative representation in sacred spaces. The star
                pattern became the dominant decorative language because it is abstract,
                mathematical, and infinitely extensible. A single motif tiles to infinity
                — reflecting the infinite nature of God.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.zellige }}>The Zellige Tradition</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Zellige tiles are hand-cut from glazed terracotta with a pointed hammer (menqash).
                A master (ma&acirc;lem) can cut 500–700 pieces per day. Each piece is shaped by eye
                to fit the geometric template. Fes remains the centre — the same families have
                cut zellige for six generations.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.dynasty }}>Dynasty and Complexity</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The Marinids (1244–1465) pushed geometry furthest — their medersas in Fes
                contain the densest star patterns anywhere. The 16-fold rosette on the Royal
                Palace doors in Fes is attributed to Marinid craftsmen. After them, complexity
                plateaued. Modern zellige often reproduces Marinid patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            A compass. A straightedge. A circle divided into equal parts.
            From this, an entire visual civilisation. The zellige craftsman
            in Fes and the mathematician in Cambridge are working on the same
            problem — only the notation differs. The craftsman solved it first,
            by seven centuries.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Star family nomenclature and construction methods from Bourgoin (1879) &ldquo;Arabic Geometrical
            Pattern and Design,&rdquo; Bonner (2017) &ldquo;Islamic Geometric Patterns,&rdquo; and Critchlow
            (1976) &ldquo;Islamic Patterns.&rdquo; Wallpaper group classification from Abas &amp; Salman (1995)
            &ldquo;Symmetries of Islamic Geometrical Patterns.&rdquo; Monument attributions from Touri &amp;
            Benaboud (2011) and UNESCO World Heritage nomination files. Zellige craft data from
            Fes ma&acirc;lem interviews and Ministry of Artisanat records.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.star }}>&copy; Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}

function StarCard({ star: s, index, parentVis }: { star: StarFamily; index: number; parentVis: boolean }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="border rounded-sm overflow-hidden cursor-pointer transition-all duration-500"
      style={{ borderColor: expanded ? C.star : C.border, opacity: parentVis ? 1 : 0, transitionDelay: `${index * 60}ms` }}
      onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center gap-3 p-4">
        <StarIcon n={s.n} innerRatio={s.innerRatio} size={40} />
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[13px] font-bold" style={{ color: C.ink }}>{s.name}</span>
            <span className="font-mono text-[10px]" style={{ color: C.construction }}>{s.wallpaperGroup}</span>
          </div>
          <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{s.arabicName} · {s.prevalence}</span>
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t space-y-2" style={{ borderColor: `${C.star}20` }}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.7)' }}>Construction</p>
              <p className="font-mono text-[11px]" style={{ color: C.text }}>{s.construction}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.7)' }}>Dynasties</p>
              <p className="font-mono text-[11px]" style={{ color: C.text }}>{s.dynasties}</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Monuments</p>
            <div className="flex flex-wrap gap-1">
              {s.monuments.map(m => (
                <span key={m} className="font-mono text-[10px] px-2 py-0.5 border rounded-full" style={{ borderColor: C.border, color: C.text }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
