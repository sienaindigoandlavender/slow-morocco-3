'use client'

import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────
// The Geometry of Zellige — Inline Data
// ─────────────────────────────────────────────────

interface StarPattern {
  id: string
  points: number
  name: string
  nameAr: string
  foldSymmetry: number
  construction: string
  detail: string
  whereFound: string
  color: string
}

const STAR_PATTERNS: StarPattern[] = [
  {
    id: 'six', points: 6, name: 'Six-Pointed Star', nameAr: 'نجمة سداسية',
    foldSymmetry: 6, construction: 'Two overlapping equilateral triangles inscribed in a circle',
    detail: 'The simplest star in zellige. Formed by overlapping two equilateral triangles — the same geometry as the Star of David, but predating that association in Islamic art. Based on the hexagonal grid, which is one of three regular tessellations. Each star generates six surrounding hexagons. Common in early Moroccan tilework.',
    whereFound: 'Bou Inania Madrasa (Fes), Saadian Tombs (Marrakech)', color: '#5C7C3E',
  },
  {
    id: 'eight', points: 8, name: 'Eight-Pointed Star', nameAr: 'نجمة ثمانية',
    foldSymmetry: 4, construction: 'Two squares, one rotated 45\u00b0 relative to the other, inscribed in a circle',
    detail: 'Two interlocking squares create the octagram — the khatam or "seal." Produces 4-fold rotational symmetry. The gaps between stars form crosses and smaller squares. The 8-pointed star is the single most common motif in Moroccan zellige, found on virtually every significant building.',
    whereFound: 'Everywhere. Hassan II Mosque, Alhambra, Ben Youssef Madrasa', color: '#2D5F8A',
  },
  {
    id: 'ten', points: 10, name: 'Ten-Pointed Star', nameAr: 'نجمة عشرية',
    foldSymmetry: 5, construction: 'Two regular pentagons, one rotated 36\u00b0 relative to the other, inscribed in a circle',
    detail: 'Introduces 5-fold symmetry — which cannot tile the plane periodically. This is the gateway to quasi-periodic patterns. In 2007, physicists discovered that 15th-century Iranian girih tiles formed Penrose-like non-repeating patterns with 5-fold rotational symmetry — 500 years before Roger Penrose described them in 1973. Ten-pointed stars are less common in Moroccan zellige than in Persian tilework.',
    whereFound: 'Darj wa ktaf motifs, advanced Marinid compositions', color: '#7B506F',
  },
  {
    id: 'twelve', points: 12, name: 'Twelve-Pointed Star', nameAr: 'نجمة اثنا عشرية',
    foldSymmetry: 6, construction: 'Three squares at 30\u00b0 intervals, or four equilateral triangles at 30\u00b0 intervals',
    detail: 'The most complex star in Moroccan zellige. Based on the 12-fold division of the circle — the same geometry governing clock faces and the zodiac. Produces intricate surrounding polygons: hexagons, squares, and triangles interlock in patterns of remarkable density. The key generative motif for some of the most elaborate Marinid-era compositions.',
    whereFound: 'Al-Attarine Madrasa (Fes), Bahia Palace (Marrakech)', color: '#F59E0B',
  },
  {
    id: 'sixteen', points: 16, name: 'Sixteen-Pointed Star', nameAr: 'نجمة ستة عشرية',
    foldSymmetry: 4, construction: 'Four squares at 22.5\u00b0 intervals inscribed in a circle',
    detail: 'The apex of complexity in zellige. 16-point stars emerged in the 16th century, at the height of Saadian power. The surrounding fill shapes become so small and numerous that a single panel can contain hundreds of hand-cut pieces. These are the showpieces — commissioned by sultans, executed over months. Extremely rare.',
    whereFound: 'Saadian Tombs (Marrakech), select royal commissions', color: '#A0452E',
  },
]

interface SymmetryType {
  name: string
  description: string
  example: string
}

const SYMMETRY_TYPES: SymmetryType[] = [
  { name: 'Translation', description: 'Shifting the entire pattern in a direction without rotating or flipping it. The pattern repeats identically. Every zellige tessellation has translational symmetry — this is what makes it a tessellation.', example: 'Any repeating tile grid' },
  { name: 'Rotation', description: 'Turning the pattern around a fixed point by a specific angle. In zellige, only rotations of 60\u00b0, 90\u00b0, 120\u00b0, and 180\u00b0 are possible — the crystallographic restriction. This is why you see 6-fold, 4-fold, 3-fold, and 2-fold symmetries, but never 5-fold or 7-fold in periodic tilings.', example: '8-pointed star: 90\u00b0 rotation' },
  { name: 'Reflection', description: 'Flipping the pattern across a mirror line. Many zellige patterns have multiple reflection axes — an 8-pointed star has 8 mirror lines. The interplay of reflection and rotation creates the visual richness.', example: 'Any star pattern has mirror lines through each point' },
  { name: 'Glide Reflection', description: 'A reflection combined with a translation along the mirror line. Subtler than pure reflection. Creates patterns that seem to "flow" in a direction while maintaining bilateral symmetry.', example: 'Interlacing ribbon motifs in the Alhambra' },
]

interface WallpaperGroup {
  notation: string
  orbifold: string
  rotationOrder: string
  description: string
  inZellige: boolean
}

const WALLPAPER_GROUPS: WallpaperGroup[] = [
  { notation: 'p1', orbifold: 'o', rotationOrder: '1', description: 'Translation only. No rotation, reflection, or glide reflection. The simplest possible pattern.', inZellige: true },
  { notation: 'p2', orbifold: '2222', rotationOrder: '2', description: '180\u00b0 rotations only. No reflections. Four distinct rotation centers per unit cell.', inZellige: true },
  { notation: 'pm', orbifold: '**', rotationOrder: '1', description: 'Parallel mirror lines only. No rotations.', inZellige: true },
  { notation: 'pg', orbifold: 'xx', rotationOrder: '1', description: 'Parallel glide reflections only. No rotations, no pure reflections.', inZellige: true },
  { notation: 'cm', orbifold: '*x', rotationOrder: '1', description: 'Mirror lines plus glide reflections between them. Centred cell.', inZellige: true },
  { notation: 'pmm', orbifold: '*2222', rotationOrder: '2', description: 'Two perpendicular mirror lines with 180\u00b0 rotations at intersections.', inZellige: true },
  { notation: 'pmg', orbifold: '22*', rotationOrder: '2', description: 'Mirror lines in one direction, glide reflections in the perpendicular, plus 180\u00b0 rotations.', inZellige: true },
  { notation: 'pgg', orbifold: '22x', rotationOrder: '2', description: 'Two perpendicular glide reflections plus 180\u00b0 rotations. No pure reflections.', inZellige: true },
  { notation: 'cmm', orbifold: '2*22', rotationOrder: '2', description: 'Mirror lines in two directions with 180\u00b0 rotation centers. Centred cell.', inZellige: true },
  { notation: 'p4', orbifold: '442', rotationOrder: '4', description: '90\u00b0 rotations. Square lattice. No reflections. The geometry behind the 8-pointed star.', inZellige: true },
  { notation: 'p4m', orbifold: '*442', rotationOrder: '4', description: '90\u00b0 rotations with mirror lines. Common in Moroccan zellige.', inZellige: true },
  { notation: 'p4g', orbifold: '4*2', rotationOrder: '4', description: '90\u00b0 rotations with glide reflections but no mirrors through rotation centers.', inZellige: true },
  { notation: 'p3', orbifold: '333', rotationOrder: '3', description: '120\u00b0 rotations only. Hexagonal lattice. No reflections. Relatively uncommon in zellige.', inZellige: false },
  { notation: 'p3m1', orbifold: '*333', rotationOrder: '3', description: '120\u00b0 rotations with mirror lines through all rotation centers.', inZellige: true },
  { notation: 'p31m', orbifold: '3*3', rotationOrder: '3', description: '120\u00b0 rotations with mirrors, but not all centers on mirror lines.', inZellige: true },
  { notation: 'p6', orbifold: '632', rotationOrder: '6', description: '60\u00b0 rotations. Hexagonal lattice. No reflections. The geometry of the 6-pointed star.', inZellige: true },
  { notation: 'p6m', orbifold: '*632', rotationOrder: '6', description: '60\u00b0 rotations with mirror lines. Maximum symmetry. The geometry behind 12-pointed stars.', inZellige: true },
]

interface ConstructionStep {
  step: number
  title: string
  detail: string
}

const CONSTRUCTION: ConstructionStep[] = [
  { step: 1, title: 'The Circle', detail: 'Everything begins with a circle drawn by compass. The circle represents unity — tawhid — the indivisibility of God. All subsequent geometry is derived from this single form.' },
  { step: 2, title: 'The Division', detail: 'The circle is divided into equal parts using compass and straightedge only. Division into 4 or 8 parts: place compass at cardinal points, draw arcs. Division into 6: compass radius equals the circle\'s radius — six arcs around the circumference. Division into 5 (pentagon) requires the golden ratio.' },
  { step: 3, title: 'The Grid', detail: 'Connecting the division points creates a polygon grid — the underlying skeleton. For 4-fold: square grid. For 6-fold: hexagonal/triangular grid. This grid is invisible in the final work but determines everything.' },
  { step: 4, title: 'The Star', detail: 'Stars are formed by extending lines from grid intersections at consistent angles. The angle of intersection determines the "tightness" of the star. Wider angles create fatter, more rounded stars. Narrow angles create sharper, more pointed ones.' },
  { step: 5, title: 'The Fill', detail: 'The spaces between stars become the secondary shapes: hexagons, pentagons, bowties, kite shapes, irregular polygons. In zellige, each of these shapes is a separate hand-cut tile. A master (maalem) must know every fill shape for a given star pattern.' },
  { step: 6, title: 'The Tessellation', detail: 'The completed unit is repeated across the surface using the translational symmetry of the underlying lattice. In zellige, tiles are assembled face-down on the floor, then mortar is poured over the back. The artisan works blind — feeling the geometry.' },
]

const COLOR_SYMBOLISM = [
  { color: 'Blue', hex: '#1A5276', meaning: 'Sky and water.  Derived from cobalt oxide. Symbolizes infinity and the divine.' },
  { color: 'Green', hex: '#2D6E4F', meaning: 'Paradise. The color of Islam. Derived from copper oxide. Found in mosques, madrasas, zawiyas.' },
  { color: 'White', hex: '#f5f5f5', meaning: 'Purity. The ground color. Made from tin oxide glaze over terracotta. The negative space that defines the pattern.' },
  { color: 'Black', hex: '#1a1a1a', meaning: 'Outline and definition. Manganese oxide. Used for borders and to separate color fields. The calligraphy of the tile.' },
  { color: 'Yellow', hex: '#EAB308', meaning: 'Sun and gold. Iron oxide or antimony. Common in Moroccan zellige, less so in eastern Islamic tilework. Warmth.' },
  { color: 'Brown', hex: '#92400E', meaning: 'Earth. The natural terracotta showing through. Found in early Moroccan zellige (10th\u201312th century) before the full palette developed.' },
]

const HERO_STATS = [
  { value: '17', label: 'Wallpaper groups' },
  { value: '5', label: 'Star families' },
  { value: '\u221e', label: 'Tessellations possible' },
  { value: '6', label: 'Steps, compass & straightedge' },
]

const KEY_FACTS = [
  { value: '10th C', label: 'Zellige origins in Morocco', note: 'White and brown tones, imitating Roman mosaics' },
  { value: '1891', label: 'Fedorov proves 17 groups', note: 'Russian crystallographer classifies all possible planar symmetries' },
  { value: '2007', label: 'Penrose tiling discovered in 15th C Islamic art', note: 'Harvard & Princeton physicists find quasi-crystals in girih tiles' },
  { value: 'p4m', label: 'Most common zellige group', note: '90\u00b0 rotations + mirror lines. The 8-pointed star symmetry.' },
  { value: '0', label: 'Living figures depicted', note: 'Islamic art avoids figural representation. Geometry fills the void.' },
  { value: '1', label: 'Tool: the compass', note: 'Every pattern can be constructed with compass and straightedge alone' },
]

// ─────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────

function StarSVG({ points, size = 120, color }: { points: number; size?: number; color: string }) {
  const cx = size / 2, cy = size / 2, r = size * 0.42, ri = r * 0.45
  const starPoints: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI * i) / points - Math.PI / 2
    const radius = i % 2 === 0 ? r : ri
    starPoints.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`)
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke={color} strokeWidth="0.5" opacity={0.2} />
      <polygon points={starPoints.join(' ')} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={2} fill={color} />
    </svg>
  )
}

export function GeometryOfZelligeContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [showAllGroups, setShowAllGroups] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const displayedGroups = showAllGroups ? WALLPAPER_GROUPS : WALLPAPER_GROUPS.filter(g => g.inZellige)

  return (
    <div className="-mt-16">

      {/* === HERO === */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.06]" preserveAspectRatio="xMidYMid slice">
            {/* Geometric grid: circles and intersecting lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <g key={i}>
                <circle cx={300 + i * 150} cy={400} r={70} fill="none" stroke="#2D5F8A" strokeWidth="0.3" />
                <circle cx={375 + i * 150} cy={330} r={70} fill="none" stroke="#2D5F8A" strokeWidth="0.3" />
                <circle cx={375 + i * 150} cy={470} r={70} fill="none" stroke="#2D5F8A" strokeWidth="0.3" />
              </g>
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#2D5F8A', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 061 — Mathematical Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Geometry<br />of Zellige
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Every zellige panel is a solved equation. The artisan works with compass
            and straightedge — the same tools Euclid used — to construct patterns
            governed by 17 possible symmetry groups. Mathematics made visible. Infinity
            made from clay.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#2D5F8A', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === STAR PATTERNS === */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — Five Star Families</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">The Stars</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">Every star is born from the circle. The number of points determines the fold symmetry, the surrounding fill shapes, and the wallpaper group of the final pattern.</p>

          <div className="space-y-0">
            {STAR_PATTERNS.map((s, i) => {
              const isVisible = visibleSections.has(`star-${i}`)
              return (
                <div key={s.id} data-sid={`star-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                    <div className="md:col-span-2 flex items-start justify-center md:justify-start">
                      <StarSVG points={s.points} color={s.color} />
                    </div>
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-serif italic text-[48px] leading-none" style={{ color: s.color }}>{s.points}</span>
                        <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: '#999' }}>points</span>
                      </div>
                      <h3 className="font-serif text-[20px] italic text-dwl-black">{s.name}</h3>
                      <p className="text-[13px] text-dwl-muted">{s.nameAr}</p>
                      <p className="text-[11px] text-dwl-muted mt-2">{s.foldSymmetry}-fold symmetry</p>
                      <p className="text-[11px] text-dwl-muted mt-1 italic">{s.whereFound}</p>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-[12px] font-medium mb-2" style={{ color: s.color }}>{s.construction}</p>
                      <p className="text-[14px] text-dwl-body leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* === QUOTE === */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#2D5F8A' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#ffffff' }}>
            The circle symbolizes unity.
            Division creates diversity.
            Tessellation restores unity
            at a higher order.
          </p>
        </div>
      </section>

      {/* === CONSTRUCTION === */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>002 — Compass &amp; Straightedge</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>How a Pattern is Born</h2>
          <p className="text-[16px] max-w-[560px] leading-relaxed mb-12" style={{ color: 'rgba(0,0,0,0.4)' }}>Six steps. Two tools. Every zellige pattern ever made follows this sequence.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {CONSTRUCTION.map((c, i) => {
              const isVisible = visibleSections.has(`con-${i}`)
              return (
                <div key={c.step} data-sid={`con-${i}`} className="p-8 transition-all duration-700" style={{ background: '#0f0f0f', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <span className="font-serif italic text-[48px] leading-none" style={{ color: '#F59E0B' }}>{c.step}</span>
                  <h3 className="font-serif text-[18px] italic mt-2 mb-3" style={{ color: '#f5f5f5' }}>{c.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#aaa' }}>{c.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* === FOUR SYMMETRIES === */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — The Four Transformations</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Symmetry</h2>
          <p className="text-body text-dwl-body max-w-[560px] mb-12">Every pattern in the plane is governed by exactly four types of symmetry operations. These are the only moves that preserve distance and shape.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#e5e5e5' }}>
            {SYMMETRY_TYPES.map((s, i) => {
              const isVisible = visibleSections.has(`sym-${i}`)
              const colors = ['#2D5F8A', '#5C7C3E', '#F59E0B', '#7B506F']
              return (
                <div key={s.name} data-sid={`sym-${i}`} className="bg-white p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="w-3 h-3 rounded-full mb-3" style={{ background: colors[i] }} />
                  <h3 className="font-serif text-[22px] italic text-dwl-black mb-2">{s.name}</h3>
                  <p className="text-[14px] text-dwl-body leading-relaxed mb-2">{s.description}</p>
                  <p className="text-[12px] text-dwl-muted italic">{s.example}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* === 17 WALLPAPER GROUPS === */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#7B506F' }}>004 — The 17 Wallpaper Groups</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Every Possible Symmetry</h2>
          <p className="text-[16px] max-w-[640px] leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.4)' }}>
            In 1891, Russian crystallographer Evgraf Fedorov proved there are exactly 17 distinct ways
            to tile a plane with repeating patterns. Not 16, not 18. Seventeen. Every zellige panel,
            every wallpaper, every honeycomb belongs to one of these groups.
          </p>
          <p className="text-[14px] mb-8" style={{ color: 'rgba(0,0,0,0.3)' }}>
            The Alhambra in Granada contains at least 13 of the 17 — some researchers claim all 17.
            Moroccan zellige deploys at least 16.
          </p>

          <div className="flex gap-3 mb-8">
            <button onClick={() => setShowAllGroups(false)}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.06em] rounded-full border transition-all"
              style={{ borderColor: !showAllGroups ? '#7B506F' : '#333', color: !showAllGroups ? '#7B506F' : '#666', background: !showAllGroups ? 'rgba(168,85,247,0.1)' : 'transparent' }}
            >Found in Zellige ({WALLPAPER_GROUPS.filter(g => g.inZellige).length})</button>
            <button onClick={() => setShowAllGroups(true)}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.06em] rounded-full border transition-all"
              style={{ borderColor: showAllGroups ? '#7B506F' : '#333', color: showAllGroups ? '#7B506F' : '#666', background: showAllGroups ? 'rgba(168,85,247,0.1)' : 'transparent' }}
            >All 17 Groups</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  {['Notation', 'Orbifold', 'Rotation', 'Description', 'Zellige'].map(h => (
                    <th key={h} className="text-left py-3 pr-4 text-[10px] uppercase tracking-[0.08em]" style={{ color: '#666' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedGroups.map((g) => (
                  <tr key={g.notation} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td className="py-3 pr-4 font-mono text-[14px] font-bold" style={{ color: '#7B506F' }}>{g.notation}</td>
                    <td className="py-3 pr-4 font-mono text-[13px]" style={{ color: '#888' }}>{g.orbifold}</td>
                    <td className="py-3 pr-4 text-[13px]" style={{ color: '#f5f5f5' }}>{g.rotationOrder}-fold</td>
                    <td className="py-3 pr-4 text-[12px]" style={{ color: '#aaa' }}>{g.description}</td>
                    <td className="py-3 text-[12px]" style={{ color: g.inZellige ? '#5C7C3E' : '#444' }}>{g.inZellige ? '\u2713' : '\u2014'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* === COLOR SYMBOLISM === */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — The Palette</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Color as Language</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {COLOR_SYMBOLISM.map((c, i) => {
              const isVisible = visibleSections.has(`col-${i}`)
              return (
                <div key={c.color} data-sid={`col-${i}`} className="bg-white p-6 md:p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="w-8 h-8 rounded-sm mb-3" style={{ background: c.hex, border: c.color === 'White' ? '1px solid #e5e5e5' : 'none' }} />
                  <h3 className="font-serif text-[18px] italic text-dwl-black">{c.color}</h3>
                  <p className="text-[12px] text-dwl-body leading-relaxed mt-1">{c.meaning}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* === DARK QUOTE === */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[38vh]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#F59E0B' }}>
            In 2007, physicists discovered that 15th-century
            Islamic artisans had created Penrose tilings —
            non-periodic patterns with five-fold symmetry —
            500 years before Western mathematics described them.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Harvard &amp; Princeton, published in Science (2007)</p>
        </div>
      </section>

      {/* === KEY FACTS === */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">006 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Mathematics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {KEY_FACTS.map((f) => (
              <div key={f.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[32px] md:text-[44px] text-dwl-black leading-none">{f.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{f.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SOURCES === */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {[
              'Wikipedia — Zellij: origins 10th century, tessellation methods, Marinid/Saadian golden ages, M.C. Escher influence',
              'Wikipedia — Islamic Geometric Patterns: 8-pointed star, compass construction, Roman Verostko on algorithmic art',
              'Wikipedia — Wallpaper Group: 17 crystallographic groups, Fedorov 1891, Hermann-Mauguin notation, orbifold notation',
              'Art of Islamic Pattern: compass-and-straightedge method, decagram construction, girih patterns, three-fold hierarchy',
              'MIT PRIMES — Wallpaper Groups (Ganapathy): mathematical proofs, Alhambra examples, crystallographic restriction',
              'ResearchGate — Islamic Patterns and Symmetry Groups: Alhambra analysis, M\u00fcller thesis (1944), 13 vs 17 debate',
              'ResearchGate — Symmetry Groups in Moroccan and Turkish Ornamental Art (Aboufadil et al.): crystallographic analysis of zellige',
              'Why Tile — Islamic Tile History: Penrose tilings in 15th C girih, Harvard/Princeton 2007 discovery, quasi-crystals',
              'Wolfram MathWorld — Wallpaper Groups: Hermann-Mauguin symbols, orbifold notation, Coxeter references',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Slow Morocco. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#2D5F8A' }}>Sources: Architectural documentation</p>
          </div>
        </div>
      </section>
    </div>
  )
}
