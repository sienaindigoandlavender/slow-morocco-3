'use client'

import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════
// THE CARPET CODE — A Field Guide to Reading a Rug
// Module 051 · Slow Morocco
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  red: '#8B2500', blue: '#1a3a5c', gold: '#9B7B2F', green: '#2d5a27',
  cream: '#f5f0e8', warm: '#3d2b1f',
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.05 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// ═══════════════════════════════════════════════════
// MOTIF DATA — 30 decoded symbols
// ═══════════════════════════════════════════════════

type Category = 'Protection' | 'Fertility' | 'Identity' | 'Nature' | 'Daily Life' | 'Cosmology'

interface Motif {
  id: number
  name: string
  amazigh: string
  category: Category
  meaning: string
  region: string
  frequency: 1 | 2 | 3 // 1=rare, 2=common, 3=ubiquitous
  svg: string // SVG path data rendered at 60x60 viewBox
  note?: string
}

const MOTIFS: Motif[] = [
  // ═══ PROTECTION ═══
  { id: 1, name: 'Evil Eye Shield', amazigh: 'Tit', category: 'Protection', meaning: 'Concentric diamonds deflect the evil eye in four directions. The cross at centre scatters malice.', region: 'All regions', frequency: 3,
    svg: `<path d="M30 5 L55 30 L30 55 L5 30 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M30 15 L45 30 L30 45 L15 30 Z" fill="none" stroke="currentColor" stroke-width="1"/><line x1="30" y1="22" x2="30" y2="38" stroke="currentColor" stroke-width="1"/><line x1="22" y1="30" x2="38" y2="30" stroke="currentColor" stroke-width="1"/>` },
  { id: 2, name: 'The Finger', amazigh: 'Doud', category: 'Protection', meaning: 'Hashtag grid represents five fingers of the Hand of Fatima. Shields the household from djinn.', region: 'Middle Atlas', frequency: 2,
    svg: `<line x1="18" y1="15" x2="18" y2="45" stroke="currentColor" stroke-width="1.5"/><line x1="30" y1="15" x2="30" y2="45" stroke="currentColor" stroke-width="1.5"/><line x1="42" y1="15" x2="42" y2="45" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="22" x2="48" y2="22" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="34" x2="48" y2="34" stroke="currentColor" stroke-width="1.5"/>` },
  { id: 3, name: 'Fibula', amazigh: 'Tazerzit', category: 'Protection', meaning: 'Triangular brooch that fastens women\'s garments. Symbol of feminine strength and tribal belonging. Each region has its own fibula style.', region: 'Rif, Atlas, Souss', frequency: 2,
    svg: `<path d="M30 8 L50 48 L10 48 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="35" r="4" fill="none" stroke="currentColor" stroke-width="1"/><line x1="30" y1="8" x2="30" y2="31" stroke="currentColor" stroke-width="1"/>` },
  { id: 4, name: 'Scorpion', amazigh: 'Tighirdemt', category: 'Protection', meaning: 'Courage and endurance. Also wards off actual scorpions. The woven scorpion neutralises the living one.', region: 'Saharan South, Tafilalet', frequency: 1,
    svg: `<line x1="30" y1="10" x2="30" y2="38" stroke="currentColor" stroke-width="1.5"/><line x1="22" y1="18" x2="38" y2="18" stroke="currentColor" stroke-width="1"/><line x1="18" y1="25" x2="42" y2="25" stroke="currentColor" stroke-width="1"/><path d="M22 18 L18 12" stroke="currentColor" stroke-width="1"/><path d="M38 18 L42 12" stroke="currentColor" stroke-width="1"/><path d="M18 25 L12 20" stroke="currentColor" stroke-width="1"/><path d="M42 25 L48 20" stroke="currentColor" stroke-width="1"/><path d="M30 38 Q30 48 24 50" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="22" cy="50" r="2" fill="currentColor"/>` },
  { id: 5, name: 'Lion\'s Paw', amazigh: 'Adad n Izem', category: 'Protection', meaning: 'Maze of diamonds forming a paw print. Strength, courage, and fierce protection. References the Barbary lion, extinct in Morocco over 100 years.', region: 'Middle Atlas', frequency: 2,
    svg: `<path d="M20 15 L30 10 L40 15 L45 25 L40 35 L30 50 L20 35 L15 25 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M25 22 L30 18 L35 22 L30 28 Z" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="22" cy="15" r="3" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="38" cy="15" r="3" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="17" cy="22" r="2.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="43" cy="22" r="2.5" fill="none" stroke="currentColor" stroke-width="1"/>` },

  // ═══ FERTILITY ═══
  { id: 6, name: 'The Diamond', amazigh: 'Takhelkhalt', category: 'Fertility', meaning: 'The most recurring motif in all Amazigh art. Represents the womb — the matrix of life. Fertility, birth, motherhood. With a dot at centre: the watchful protective eye.', region: 'All regions', frequency: 3,
    svg: `<path d="M30 5 L55 30 L30 55 L5 30 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="30" r="2.5" fill="currentColor"/>` },
  { id: 7, name: 'Seed', amazigh: 'Azraa', category: 'Fertility', meaning: 'Hourglass shape. Blesses with fertility, growth, and prosperous new beginnings. The grain that becomes bread.', region: 'Middle Atlas, Zemmour', frequency: 3,
    svg: `<path d="M22 10 L38 10 L30 30 L38 50 L22 50 L30 30 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>` },
  { id: 8, name: 'Frog', amazigh: 'Amqerqur', category: 'Fertility', meaning: 'Fertility and magical rites. Diamond body with four extending legs. Associated with water and rain ceremonies.', region: 'High Atlas, Azilal', frequency: 1,
    svg: `<path d="M30 18 L40 28 L30 38 L20 28 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="28" x2="10" y2="20" stroke="currentColor" stroke-width="1"/><line x1="40" y1="28" x2="50" y2="20" stroke="currentColor" stroke-width="1"/><line x1="20" y1="28" x2="12" y2="40" stroke="currentColor" stroke-width="1"/><line x1="40" y1="28" x2="48" y2="40" stroke="currentColor" stroke-width="1"/>` },
  { id: 9, name: 'Spider', amazigh: 'Taytut', category: 'Fertility', meaning: 'Interlocked lines radiating from centre. Creative magic, abundant fertility, patience, and the working life. Schematises the sun.', region: 'Middle Atlas', frequency: 2,
    svg: `<circle cx="30" cy="30" r="4" fill="none" stroke="currentColor" stroke-width="1"/><line x1="30" y1="26" x2="30" y2="8" stroke="currentColor" stroke-width="1"/><line x1="30" y1="34" x2="30" y2="52" stroke="currentColor" stroke-width="1"/><line x1="26" y1="30" x2="8" y2="30" stroke="currentColor" stroke-width="1"/><line x1="34" y1="30" x2="52" y2="30" stroke="currentColor" stroke-width="1"/><line x1="27" y1="27" x2="14" y2="14" stroke="currentColor" stroke-width="1"/><line x1="33" y1="27" x2="46" y2="14" stroke="currentColor" stroke-width="1"/><line x1="27" y1="33" x2="14" y2="46" stroke="currentColor" stroke-width="1"/><line x1="33" y1="33" x2="46" y2="46" stroke="currentColor" stroke-width="1"/>` },
  { id: 10, name: 'Swallow', amazigh: 'Thaasiwan', category: 'Fertility', meaning: 'Cross of intersecting rectangles forming a bird. Carries baraka (divine blessing). Heals sickness, guards against misfortune.', region: 'Rif, Zemmour', frequency: 2,
    svg: `<path d="M20 25 L30 15 L40 25 L30 35 Z" fill="none" stroke="currentColor" stroke-width="1"/><line x1="30" y1="35" x2="30" y2="50" stroke="currentColor" stroke-width="1"/><line x1="30" y1="25" x2="12" y2="40" stroke="currentColor" stroke-width="1"/><line x1="30" y1="25" x2="48" y2="40" stroke="currentColor" stroke-width="1"/><line x1="30" y1="15" x2="30" y2="8" stroke="currentColor" stroke-width="1"/>` },

  // ═══ IDENTITY ═══
  { id: 11, name: 'Yaz', amazigh: '\u2D63', category: 'Identity', meaning: 'The Free Man. Boldest of all Amazigh symbols. Proclaims identity and the unbreakable spirit of freedom. The letter Z in Tifinagh.', region: 'All regions (pan-Amazigh)', frequency: 3,
    svg: `<line x1="15" y1="42" x2="30" y2="18" stroke="currentColor" stroke-width="2"/><line x1="30" y1="18" x2="45" y2="42" stroke="currentColor" stroke-width="2"/><line x1="22" y1="30" x2="38" y2="30" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="12" r="2" fill="currentColor"/>` },
  { id: 12, name: 'Cross', amazigh: 'Tazeggart', category: 'Identity', meaning: 'Balances opposing forces. Justice, mutual respect, community harmony. Harmony between the physical and spiritual worlds.', region: 'All regions', frequency: 3,
    svg: `<line x1="30" y1="10" x2="30" y2="50" stroke="currentColor" stroke-width="2"/><line x1="10" y1="30" x2="50" y2="30" stroke="currentColor" stroke-width="2"/>` },
  { id: 13, name: 'Metalworker\'s Mark', amazigh: 'Anzzam', category: 'Identity', meaning: 'X-shape honouring the blacksmith. Offers respect to metal and prevents djinn. Marks the tribe\'s forge lineage.', region: 'Souss, Anti-Atlas', frequency: 1,
    svg: `<line x1="12" y1="12" x2="48" y2="48" stroke="currentColor" stroke-width="2"/><line x1="48" y1="12" x2="12" y2="48" stroke="currentColor" stroke-width="2"/><circle cx="30" cy="30" r="6" fill="none" stroke="currentColor" stroke-width="1"/>` },
  { id: 14, name: 'Ram', amazigh: 'Ikerri', category: 'Identity', meaning: 'Fertility, complementarity and opposition. The ram is sacrificed at Eid al-Adha — bridging the sacred and the domestic.', region: 'High Atlas, Azilal', frequency: 2,
    svg: `<path d="M15 35 L25 20 L40 20 L50 30 L40 40 L25 40 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M25 20 Q20 10 28 12" stroke="currentColor" stroke-width="1" fill="none"/><line x1="28" y1="40" x2="28" y2="50" stroke="currentColor" stroke-width="1"/><line x1="38" y1="40" x2="38" y2="50" stroke="currentColor" stroke-width="1"/><circle cx="33" cy="27" r="1.5" fill="currentColor"/>` },
  { id: 15, name: 'Long Hair', amazigh: 'Tiziri', category: 'Identity', meaning: 'Parallel vertical lines. Represents the tradition of long hair among Amazigh men. Marker of manhood and tribal custom.', region: 'A\u00efn Leuh, Middle Atlas', frequency: 1,
    svg: `<line x1="18" y1="10" x2="18" y2="50" stroke="currentColor" stroke-width="1.5"/><line x1="24" y1="10" x2="24" y2="50" stroke="currentColor" stroke-width="1.5"/><line x1="30" y1="10" x2="30" y2="50" stroke="currentColor" stroke-width="1.5"/><line x1="36" y1="10" x2="36" y2="50" stroke="currentColor" stroke-width="1.5"/><line x1="42" y1="10" x2="42" y2="50" stroke="currentColor" stroke-width="1.5"/>` },

  // ═══ NATURE ═══
  { id: 16, name: 'Water / River', amazigh: 'Aman', category: 'Nature', meaning: 'Zigzag lines. Flow of life, continuity, and the rivers that sustain the oases. Also represents mountains when vertical.', region: 'All regions', frequency: 3,
    svg: `<path d="M10 20 L20 10 L30 20 L40 10 L50 20" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 32 L20 22 L30 32 L40 22 L50 32" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 44 L20 34 L30 44 L40 34 L50 44" fill="none" stroke="currentColor" stroke-width="1.5"/>` },
  { id: 17, name: 'Star', amazigh: 'Itri', category: 'Nature', meaning: 'Hope, direction, cosmic connection. The star that guides man in the night. Navigation, destiny, and the divine.', region: 'Saharan South, Tafilalet', frequency: 2,
    svg: `<path d="M30 6 L34 22 L50 22 L37 32 L42 48 L30 38 L18 48 L23 32 L10 22 L26 22 Z" fill="none" stroke="currentColor" stroke-width="1.2"/>` },
  { id: 18, name: 'Snake Spine', amazigh: 'Afi\u0263', category: 'Nature', meaning: 'Vertical line with chevrons. References holy persons with medicinal and magical skills. Healing knowledge encoded in pattern.', region: 'High Atlas, Taznakht', frequency: 2,
    svg: `<line x1="30" y1="8" x2="30" y2="52" stroke="currentColor" stroke-width="1.5"/><path d="M20 15 L30 20 L40 15" fill="none" stroke="currentColor" stroke-width="1"/><path d="M20 25 L30 30 L40 25" fill="none" stroke="currentColor" stroke-width="1"/><path d="M20 35 L30 40 L40 35" fill="none" stroke="currentColor" stroke-width="1"/><path d="M20 45 L30 50 L40 45" fill="none" stroke="currentColor" stroke-width="1"/>` },
  { id: 19, name: 'Olive Tree', amazigh: 'Azemmur', category: 'Nature', meaning: 'Quiet and beneficent force. Represents the enduring presence of the olive — food, oil, light, and shade across centuries.', region: 'Rif, Souss', frequency: 1,
    svg: `<line x1="30" y1="50" x2="30" y2="25" stroke="currentColor" stroke-width="2"/><circle cx="30" cy="18" r="12" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="26" cy="15" r="2" fill="currentColor"/><circle cx="34" cy="20" r="2" fill="currentColor"/><circle cx="30" cy="12" r="2" fill="currentColor"/>` },
  { id: 20, name: 'Lizard', amazigh: 'Tazermummit', category: 'Nature', meaning: 'Elevation and spiritual enlightenment. Found more on jewellery and pottery than carpet, but appears in Souss and Anti-Atlas weaving.', region: 'Souss, Anti-Atlas', frequency: 1,
    svg: `<path d="M30 10 L30 50" stroke="currentColor" stroke-width="1.5"/><line x1="30" y1="20" x2="18" y2="14" stroke="currentColor" stroke-width="1"/><line x1="30" y1="20" x2="42" y2="14" stroke="currentColor" stroke-width="1"/><line x1="30" y1="38" x2="18" y2="46" stroke="currentColor" stroke-width="1"/><line x1="30" y1="38" x2="42" y2="46" stroke="currentColor" stroke-width="1"/><circle cx="30" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1"/>` },

  // ═══ DAILY LIFE ═══
  { id: 21, name: 'Comb', amazigh: 'Tasmekt', category: 'Daily Life', meaning: 'Vertical tines on a horizontal bar. Purifies the path of life and wards off evil. Feminine symbol of fertility and creativity.', region: 'Middle Atlas, Zemmour', frequency: 3,
    svg: `<line x1="12" y1="30" x2="48" y2="30" stroke="currentColor" stroke-width="2"/><line x1="16" y1="30" x2="16" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="23" y1="30" x2="23" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="30" y1="30" x2="30" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="37" y1="30" x2="37" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="44" y1="30" x2="44" y2="12" stroke="currentColor" stroke-width="1.5"/>` },
  { id: 22, name: 'Saw', amazigh: 'Amenzar', category: 'Daily Life', meaning: 'Serrated zigzag line. Honours diligence and craftsmanship. Patience shapes every masterpiece. The saw is still essential in Atlas woodworking.', region: 'A\u00efn Leuh, Middle Atlas', frequency: 2,
    svg: `<path d="M10 35 L18 18 L26 35 L34 18 L42 35 L50 18" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="35" x2="50" y2="35" stroke="currentColor" stroke-width="1"/>` },
  { id: 23, name: 'Grain / Barley', amazigh: 'Timzin', category: 'Daily Life', meaning: 'Grain enclosed within a diamond. The wheat that becomes bread — the #1 staple of the Moroccan diet. Enclosed = protected harvest.', region: 'Middle Atlas, Zemmour', frequency: 3,
    svg: `<path d="M30 8 L50 30 L30 52 L10 30 Z" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="30" cy="24" r="2" fill="currentColor"/><circle cx="26" cy="30" r="2" fill="currentColor"/><circle cx="34" cy="30" r="2" fill="currentColor"/><circle cx="30" cy="36" r="2" fill="currentColor"/>` },
  { id: 24, name: 'Anchor', amazigh: 'Tanzagt', category: 'Daily Life', meaning: 'Fidelity, inner balance, and lucidity. Grounding force. The weaver anchors the family to the earth.', region: 'Coastal tribes, Zemmour', frequency: 1,
    svg: `<line x1="30" y1="10" x2="30" y2="42" stroke="currentColor" stroke-width="1.5"/><path d="M18 42 Q30 54 42 42" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="22" x2="40" y2="22" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1"/>` },
  { id: 25, name: 'Loom', amazigh: 'Azetta', category: 'Daily Life', meaning: 'The loom itself as sacred space — boundary between visible and invisible worlds. Grid pattern of warp and weft represents the structure of life.', region: 'All weaving regions', frequency: 2,
    svg: `<rect x="12" y="12" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="24" x2="48" y2="24" stroke="currentColor" stroke-width="0.7"/><line x1="12" y1="36" x2="48" y2="36" stroke="currentColor" stroke-width="0.7"/><line x1="24" y1="12" x2="24" y2="48" stroke="currentColor" stroke-width="0.7"/><line x1="36" y1="12" x2="36" y2="48" stroke="currentColor" stroke-width="0.7"/>` },

  // ═══ COSMOLOGY ═══
  { id: 26, name: 'Sun', amazigh: 'Tafukt', category: 'Cosmology', meaning: 'Circle with radiating lines. Life force, divine light, and the cycle of days. Schematised sometimes as spider.', region: 'All regions', frequency: 2,
    svg: `<circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="30" y1="8" x2="30" y2="18" stroke="currentColor" stroke-width="1"/><line x1="30" y1="42" x2="30" y2="52" stroke="currentColor" stroke-width="1"/><line x1="8" y1="30" x2="18" y2="30" stroke="currentColor" stroke-width="1"/><line x1="42" y1="30" x2="52" y2="30" stroke="currentColor" stroke-width="1"/><line x1="14" y1="14" x2="22" y2="22" stroke="currentColor" stroke-width="1"/><line x1="38" y1="22" x2="46" y2="14" stroke="currentColor" stroke-width="1"/><line x1="14" y1="46" x2="22" y2="38" stroke="currentColor" stroke-width="1"/><line x1="38" y1="38" x2="46" y2="46" stroke="currentColor" stroke-width="1"/>` },
  { id: 27, name: 'Moon', amazigh: 'Ayyur', category: 'Cosmology', meaning: 'Crescent form. Female cycle, intuition, the passage of time. Connects to Islamic lunar calendar and pre-Islamic night sky reverence.', region: 'Saharan South', frequency: 2,
    svg: `<path d="M35 10 A18 18 0 1 0 35 50 A12 12 0 1 1 35 10" fill="none" stroke="currentColor" stroke-width="1.5"/>` },
  { id: 28, name: 'Stairway', amazigh: 'Adrar', category: 'Cosmology', meaning: 'Rising step pattern. Luck, progress, spiritual ascent. Each step a prayer answered. The mountain path to the divine.', region: 'High Atlas, Taznakht', frequency: 2,
    svg: `<path d="M10 48 L10 38 L20 38 L20 28 L30 28 L30 18 L40 18 L40 10 L50 10" fill="none" stroke="currentColor" stroke-width="1.5"/>` },
  { id: 29, name: 'Eye of the Partridge', amazigh: 'Tit n Tasekkurt', category: 'Cosmology', meaning: 'Twin checker squares. Feminine beauty, grace, and watchfulness. The partridge never sleeps — the rug that watches.', region: 'Zemmour, Beni Ouarain', frequency: 2,
    svg: `<rect x="12" y="12" width="12" height="12" fill="currentColor"/><rect x="36" y="12" width="12" height="12" fill="currentColor"/><rect x="24" y="24" width="12" height="12" fill="currentColor"/><rect x="12" y="36" width="12" height="12" fill="currentColor"/><rect x="36" y="36" width="12" height="12" fill="currentColor"/>` },
  { id: 30, name: 'Bow Tie / Butterfly', amazigh: 'Taferdust', category: 'Cosmology', meaning: 'Mothers stitch this motif to shield children from harm. Two triangles meeting at a point — transformation and protection.', region: 'Azilal, High Atlas', frequency: 2,
    svg: `<path d="M10 12 L30 30 L10 48 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M50 12 L30 30 L50 48 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>` },
]

const CATEGORIES: { name: Category; color: string }[] = [
  { name: 'Protection', color: C.red },
  { name: 'Fertility', color: C.green },
  { name: 'Identity', color: C.blue },
  { name: 'Nature', color: '#5D7A3A' },
  { name: 'Daily Life', color: C.gold },
  { name: 'Cosmology', color: '#6A3B7A' },
]

// ═══════════════════════════════════════════════════
// WEAVING REGIONS MAP (Mapbox)
// ═══════════════════════════════════════════════════

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const WEAVING_REGIONS: { tribe: string; lng: number; lat: number; color: string; palette: string; signature: string }[] = [
  { tribe: 'Beni Ouarain', lng: -4.2, lat: 33.8, color: '#1a1a1a', palette: 'Cream + black', signature: 'Minimalist diamonds on white' },
  { tribe: 'Azilal', lng: -6.5, lat: 31.9, color: '#E65100', palette: 'Cream + vivid colours', signature: 'Personal stories as geometry' },
  { tribe: 'Boujad', lng: -6.4, lat: 32.8, color: '#C62828', palette: 'Pink, red, orange, purple', signature: 'Warm chaos — floating shapes' },
  { tribe: 'Taznakht', lng: -7.2, lat: 30.6, color: '#8B2500', palette: 'Deep red, blue, gold', signature: 'Dense talisman patterns' },
  { tribe: 'Zemmour', lng: -6.3, lat: 33.6, color: '#B71C1C', palette: 'Vivid red dominant', signature: 'Complex lozenges' },
  { tribe: 'Marmoucha', lng: -3.7, lat: 33.4, color: '#795548', palette: 'White, grey, brown', signature: 'Natural undyed tones' },
  { tribe: 'Talsint', lng: -3.4, lat: 32.5, color: '#6A1B9A', palette: 'Vibrant multi-colour', signature: 'Striped desert compositions' },
  { tribe: 'A\u00eft Ouaouzguite', lng: -6.9, lat: 31.0, color: '#9B7B2F', palette: 'Red, saffron, indigo', signature: 'Intricate fine-wool geometry' },
]

function WeavingMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const r = useReveal()

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [-5.5, 32.2], zoom: 5.3, minZoom: 4, maxZoom: 9,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        WEAVING_REGIONS.forEach((wr) => {
          const el = document.createElement('div')
          el.style.cssText = `width:18px;height:18px;border-radius:50%;background:${wr.color};border:2.5px solid white;cursor:pointer;box-shadow:0 1px 6px rgba(0,0,0,0.3);`
          const popup = new mapboxgl.default.Popup({ offset: 14, closeButton: false, maxWidth: '220px' })
            .setHTML(`<div style="font-family:serif;font-size:13px;line-height:1.4;"><strong>${wr.tribe}</strong><br/><span style="font-size:10px;color:#737373;font-family:monospace;">${wr.palette}</span><br/><span style="font-size:11px;color:#262626;">${wr.signature}</span></div>`)
          new mapboxgl.default.Marker({ element: el, anchor: 'center' })
            .setLngLat([wr.lng, wr.lat]).setPopup(popup).addTo(map)
        })
      })
      mapRef.current = map
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div ref={r.ref} className="transition-opacity duration-1000" style={{ opacity: r.vis ? 1 : 0 }}>
      <div ref={mapContainer} className="w-full border" style={{ height: 440, borderColor: C.border }} />
      {!MAPBOX_TOKEN && (
        <div className="mt-2 p-4 border text-[12px] text-center" style={{ borderColor: C.border, color: C.muted }}>
          Map requires NEXT_PUBLIC_MAPBOX_TOKEN environment variable.
        </div>
      )}
      <div className="flex flex-wrap gap-3 mt-3">
        {WEAVING_REGIONS.map(wr => (
          <div key={wr.tribe} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: wr.color }} />
            <span className="text-[9px] font-mono" style={{ color: C.muted }}>{wr.tribe}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// REGIONAL STYLES
// ═══════════════════════════════════════════════════

const REGIONAL_STYLES = [
  { tribe: 'Beni Ouarain', region: 'Middle Atlas', palette: 'Cream, black', style: 'Minimalist pile. Sparse diamond motifs on cream field. Soft, silky wool.', signature: 'Single black diamonds on white', frequency: 'Ubiquitous in Western interiors' },
  { tribe: 'Azilal', region: 'High Atlas / Middle Atlas border', palette: 'Cream + vivid colours', style: 'Single-knotted, intricate detail. Personal stories woven as abstract geometry.', signature: 'Colourful symbols on cream ground', frequency: 'Rising global demand' },
  { tribe: 'Boujad', region: 'Middle Atlas foothills', palette: 'Pink, red, orange, purple', style: 'Low pile. Floating shapes, distorted diamonds. Less concerned with symmetry.', signature: 'Warm chaos — no two alike', frequency: 'Common in vintage market' },
  { tribe: 'Taznakht / A\u00eft Ouaouzguite', region: 'High Atlas / Ouarzazate', palette: 'Deep red, blue, gold', style: 'Fine wool, intricate geometric designs. Bold diamond chains.', signature: 'Dense, warm-toned, talisman symbols', frequency: 'Traditional prestige rugs' },
  { tribe: 'Zemmour', region: 'Rabat region', palette: 'Vivid red dominant', style: 'Complex lozenges and dense patterning. Some of the most elaborate compositions.', signature: 'Red field with white/black geometry', frequency: 'Museum collections' },
  { tribe: 'Marmoucha', region: 'Eastern Middle Atlas', palette: 'White, grey, brown', style: 'Thick, high-piled. Distinct diamond patterns. Originally bedding carpets for harsh winters.', signature: 'Natural undyed tones', frequency: 'Growing collector interest' },
  { tribe: 'Talsint / Eastern tribes', region: 'Eastern Morocco', palette: 'Vibrant multi-colour', style: 'Linear patterns, bold horizontal bands. Desert caravan route influences.', signature: 'Striped compositions', frequency: 'Less known internationally' },
  { tribe: 'Kilim (Hanbel)', region: 'All regions', palette: 'Varies by tribe', style: 'Flat-weave. Durable, reversible. Used as floor/wall coverings, tent doors, prayer rugs. Included in bride\'s trousseau.', signature: 'Often embroidered or sequined', frequency: 'Everyday utility weave' },
]

// ═══════════════════════════════════════════════════
// SPECIMEN CARD
// ═══════════════════════════════════════════════════

function SpecimenCard({ motif, index }: { motif: Motif; index: number }) {
  const r = useReveal()
  const cat = CATEGORIES.find(c => c.name === motif.category)
  const catColor = cat?.color || C.text

  const freq = motif.frequency === 3 ? '\u25CF\u25CF\u25CF' : motif.frequency === 2 ? '\u25CF\u25CF\u25CB' : '\u25CF\u25CB\u25CB'
  const freqLabel = motif.frequency === 3 ? 'Ubiquitous' : motif.frequency === 2 ? 'Common' : 'Rare'

  return (
    <div ref={r.ref}
      className="border transition-all duration-500 group"
      style={{
        borderColor: C.border,
        opacity: r.vis ? 1 : 0,
        transform: r.vis ? 'translateY(0)' : 'translateY(12px)',
        transitionDelay: `${(index % 6) * 40}ms`,
      }}>
      {/* Symbol */}
      <div className="flex items-center justify-center py-6 border-b" style={{ borderColor: C.border }}>
        <svg viewBox="0 0 60 60" className="w-14 h-14 transition-transform duration-300 group-hover:scale-110" style={{ color: catColor }}>
          <g dangerouslySetInnerHTML={{ __html: motif.svg }} />
        </svg>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-1 mb-1">
          <p className="font-serif text-[14px] leading-tight">{motif.name}</p>
          <span className="text-[9px] font-mono shrink-0 mt-0.5" style={{ color: catColor }}>{String(motif.id).padStart(2, '0')}</span>
        </div>
        <p className="text-[10px] italic mb-2" style={{ color: C.muted }}>{motif.amazigh}</p>

        <p className="text-[11px] leading-[1.6] mb-2" style={{ color: C.text }}>{motif.meaning}</p>

        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: C.border }}>
          <span className="text-[9px] font-mono px-1.5 py-0.5" style={{ background: catColor, color: 'white' }}>{motif.category.toUpperCase()}</span>
          <span className="text-[9px] font-mono" style={{ color: C.muted }}>{motif.region}</span>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px]" style={{ color: catColor }}>{freq}</span>
          <span className="text-[9px] font-mono" style={{ color: C.muted }}>{freqLabel}</span>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// FILTER
// ═══════════════════════════════════════════════════

function CategoryFilter({ active, onSet }: { active: Category | 'All'; onSet: (c: Category | 'All') => void }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button onClick={() => onSet('All')}
        className="text-[10px] font-mono px-3 py-1.5 border transition-all"
        style={{ borderColor: active === 'All' ? C.ink : C.border, background: active === 'All' ? C.ink : 'transparent', color: active === 'All' ? 'white' : C.muted }}>
        ALL 30
      </button>
      {CATEGORIES.map(c => {
        const count = MOTIFS.filter(m => m.category === c.name).length
        return (
          <button key={c.name} onClick={() => onSet(c.name)}
            className="text-[10px] font-mono px-3 py-1.5 border transition-all"
            style={{ borderColor: active === c.name ? c.color : C.border, background: active === c.name ? c.color : 'transparent', color: active === c.name ? 'white' : C.muted }}>
            {c.name.toUpperCase()} {count}
          </button>
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// MAIN CONTENT COMPONENT
// ═══════════════════════════════════════════════════

export default function CarpetCodeContent() {
  const heroR = useReveal()
  const [filter, setFilter] = useState<Category | 'All'>('All')

  const filtered = filter === 'All' ? MOTIFS : MOTIFS.filter(m => m.category === filter)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-10">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 051 · Textile Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Carpet<br />Code</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-6" style={{ color: C.muted }}>
            A field guide to reading a rug. 30 Amazigh motifs decoded.
          </p>
          <p className="text-[15px] leading-[1.8] max-w-[600px]" style={{ color: C.text }}>
            Every <span className="underline underline-offset-2">Amazigh</span> carpet is a letter. The diamond is the womb. The zigzag is water.
            The comb purifies. The scorpion wards. Before the Amazigh had a written script
            in common use, they had wool. Weavers — always women — encoded identity,
            protection, fertility, and cosmology into geometric patterns passed from mother
            to daughter for over 3,000 years. The meaning of many symbols has been lost.
            What survives is a visual lexicon of at least 30 core motifs, each with a name,
            a function, and a regional dialect. This is the specimen plate.
          </p>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SPECIMEN PLATES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Specimens</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          30 motifs across six categories. Each card shows the symbol, its Amazigh name, meaning,
          primary region, and frequency in surviving collections. Filter by category or read as a complete atlas.
        </p>
        <p className="text-[10px] mb-4 font-mono" style={{ color: C.muted }}>
          FREQUENCY: ●●● Ubiquitous — found across all regions · ●●○ Common — multiple tribes · ●○○ Rare — specific tribes or declining
        </p>

        <CategoryFilter active={filter} onSet={setFilter} />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((m, i) => <SpecimenCard key={m.id} motif={m} index={i} />)}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ REGIONAL STYLES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Regional Dialects</h2>
        <p className="text-[13px] mb-8 max-w-[500px]" style={{ color: C.muted }}>
          The same diamond means different things in different hands. Each tribe developed
          its own palette, pile, and pattern language. Eight weaving traditions, each a visual dialect.
        </p>
        <WeavingMap />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {REGIONAL_STYLES.map((s, i) => {
            const rv = useReveal()
            return (
              <div key={s.tribe} ref={rv.ref} className="border p-5 transition-all duration-500"
                style={{ borderColor: C.border, opacity: rv.vis ? 1 : 0, transitionDelay: `${(i % 4) * 50}ms` }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-serif text-[16px]">{s.tribe}</p>
                    <p className="text-[10px] font-mono" style={{ color: C.muted }}>{s.region}</p>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 border" style={{ borderColor: C.border, color: C.muted }}>{s.palette}</span>
                </div>
                <p className="text-[12px] leading-[1.7] mb-2" style={{ color: C.text }}>{s.style}</p>
                <div className="flex items-center justify-between pt-2 border-t text-[10px]" style={{ borderColor: C.border }}>
                  <span style={{ color: C.gold }}>Signature: {s.signature}</span>
                  <span className="font-mono" style={{ color: C.muted }}>{s.frequency}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ HOW TO READ A RUG ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">How to Read a Rug</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <p className="font-serif text-[18px] mb-2">Start at the Centre</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              The central motif marks the weaver's core theme — birth, marriage, protection,
              or identity. A large single diamond at centre means fertility and guardianship.
              Multiple diamonds mean a family. The centre is the thesis statement.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">Trace Outward</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Patterns repeat or evolve from centre to edge. This can signal life chapters —
              marriage to children to protection of the household. Borders are the final
              defence: combs, zigzags, and fingers form a perimeter of warding.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">Read the Colour</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Before synthetic dyes, colour was message. Red (madder root): vitality, strength,
              life. Blue (indigo): divine protection, peace. Yellow (saffron, turmeric): light,
              prosperity. White (undyed wool): purity, mourning. Black (walnut shell): earth, mystery.
            </p>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-[18px] mb-2">The Loom as Sacred Space</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Before beginning a carpet, women whisper prayers and invoke protection against
              the evil eye. The warp (vertical threads) is the structure of life. The weft
              (horizontal) is experience woven through endurance. The beating of each line
              into place is a meditative ritual that mirrors prayer and breath.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Bridal Trousseau</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              A traditional Amazigh bride brought three textiles: a large sleeping carpet
              with central diamond for fertility, two side rugs with zigzags and eye motifs
              for protection, and a small woven bag emblazoned with her tribe's mark for
              identity. A portable domestic universe that travelled with her.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Swiss Researcher</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Bruno Barbatti's <em>Berber Carpets of Morocco: The Symbols, Origin and Meaning</em> argues
              that all geometric motifs are fundamentally about fertility — diamonds represent
              wombs, long lines are phallic, and enclosed elements signal birth. When his
              interpretations were read to Amazigh women weavers, they laughed and asked
              if the author was a man.
            </p>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="micro-label mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <p>Symbol meanings and regional attributions compiled from: The Advocacy Project, "Traditional Motifs in Amazigh Weaving" (A\u00efn Leuh cooperative fieldwork). Mina Abouzahra, "Symbolism" and "Regions and Types" (minaabouzahra.com). Tribaliste Magazine, "Patterns and signs in Berber crafts" (2020). iwziwn.com, "Symbolism and Spirituality in Moroccan Amazigh Weaving" (2025). Mimouna Rugs, "Berber Symbols: Decoding the Patterns and Meanings" (2025). Laetitia Demay, "Berber Symbols: Meaning and Secrets of Amazigh Patterns" (2025). Nomad33, "The Symbols of the Berber Carpet" (2022). Berber Creations, "Symbolic Meanings in Moroccan Berber Rugs" (2023). Kenza & Co, "Berber/Amazigh Symbols Meaning." Afrikesh, "Berber Carpets of Morocco the Symbols Origin and Meaning" (2024). Bruno Barbatti, <em>Berber Carpets of Morocco: The Symbols, Origin and Meaning</em> (referenced via Amazigh World News and Advocacy Project). Regional style data from Mina Abouzahra's tribal classification. SVG renderings are editorial interpretations of geometric motifs described across sources — they represent the structural logic of each symbol, not exact reproductions of specific rugs.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: 'rgba(255,255,255,0.7)' }}>
          © Slow Morocco · slowmorocco.com · Symbol interpretations vary by tribe, region, and individual weaver. Meanings are not fixed. This guide represents documented consensus across sources, not definitive readings.
        </p>
      </section>
    </div>
  )
}
