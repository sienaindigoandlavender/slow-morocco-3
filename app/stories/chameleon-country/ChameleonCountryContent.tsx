'use client'

import { useState, useEffect, useRef } from 'react'

// ═══ THE CHAMELEON COUNTRY ═══
// Morocco's landscapes have doubled for Egypt, Tibet, Mars, Jerusalem,
// Mogadishu, Ancient Rome, and Mombasa. Living interactive page — not a poster.

const C = {
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  film: '#722F37',
  gold: '#C17F28',
  reel: '#2D3A6E',
  desert: '#A0522D',
  sea: '#2D6E8E',
  green: '#2D6E4F',
}

// ═══ SCROLL REVEAL HOOK ═══
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ═══ PRODUCTIONS ═══
interface Production {
  title: string
  year: number
  director: string
  location: string
  budget: string
  localRevenue?: string
  playedAs: string
  palette: string[]
  genre: string
  note?: string
}

const PRODUCTIONS: Production[] = [
  { title: 'Lawrence of Arabia', year: 1962, director: 'David Lean', location: 'Ouarzazate', budget: '$15M', localRevenue: '$2M', playedAs: 'Arabian Desert', palette: ['#D4A574', '#E8C99B', '#8B7355', '#4A3728'], genre: 'Epic', note: 'First major production. Put Ouarzazate on the map.' },
  { title: 'The Man Who Would Be King', year: 1975, director: 'John Huston', location: 'High Atlas', budget: '$8M', playedAs: 'Kafiristan (Afghanistan)', palette: ['#8B7355', '#4A6741', '#C8A45C', '#E8E8E8'], genre: 'Adventure' },
  { title: 'Jesus of Nazareth', year: 1977, director: 'Franco Zeffirelli', location: 'Aït Benhaddou', budget: '$18M', playedAs: 'Jerusalem / Holy Land', palette: ['#C8A45C', '#DEB887', '#8B7355', '#87CEEB'], genre: 'Epic' },
  { title: 'The Jewel of the Nile', year: 1985, director: 'Lewis Teague', location: 'Fez / Meknès', budget: '$26M', localRevenue: '$3M', playedAs: 'North Africa (fictional)', palette: ['#C8A45C', '#2E7D32', '#8B6914', '#87CEEB'], genre: 'Adventure' },
  { title: 'The Living Daylights', year: 1987, director: 'John Glen', location: 'Tangier', budget: '$40M', localRevenue: '$2M', playedAs: 'Tangier (as itself)', palette: ['#C8A45C', '#1A237E', '#8B0000', '#FFFFFF'], genre: 'Action' },
  { title: 'The Last Temptation of Christ', year: 1988, director: 'Martin Scorsese', location: 'Aït Benhaddou', budget: '$7M', playedAs: 'Jerusalem / Palestine', palette: ['#C8A45C', '#E8C99B', '#4A3728', '#8B0000'], genre: 'Drama' },
  { title: 'The Sheltering Sky', year: 1990, director: 'Bernardo Bertolucci', location: 'Tangier / Erfoud', budget: '$25M', playedAs: 'North Africa (as itself)', palette: ['#D4A574', '#EDC9AF', '#4A3728', '#87CEEB'], genre: 'Drama' },
  { title: 'Kundun', year: 1997, director: 'Martin Scorsese', location: 'Atlas Studios', budget: '$28M', localRevenue: '$4M', playedAs: 'Tibet', palette: ['#8B0000', '#C17F28', '#4A0E4E', '#2B1D0E'], genre: 'Biography', note: 'Scorsese built Tibetan temple interior.' },
  { title: 'The Mummy', year: 1999, director: 'Stephen Sommers', location: 'Ouarzazate / Erfoud', budget: '$80M', localRevenue: '$8M', playedAs: 'Ancient Egypt', palette: ['#D4A574', '#EDC9AF', '#8B6914', '#1C1108'], genre: 'Adventure' },
  { title: 'Gladiator', year: 2000, director: 'Ridley Scott', location: 'Ouarzazate / Aït Benhaddou', budget: '$103M', localRevenue: '$12M', playedAs: 'Ancient Rome / North Africa', palette: ['#8B6914', '#C8A45C', '#5C4033', '#2B1D0E'], genre: 'Epic', note: 'Roman Colosseum built on-site.' },
  { title: 'Black Hawk Down', year: 2001, director: 'Ridley Scott', location: 'Ouarzazate / Salé', budget: '$92M', localRevenue: '$10M', playedAs: 'Mogadishu, Somalia', palette: ['#8B7355', '#C8A45C', '#4A3728', '#1A1A1A'], genre: 'War' },
  { title: 'Spy Game', year: 2001, director: 'Tony Scott', location: 'Casablanca / Rabat', budget: '$92M', localRevenue: '$5M', playedAs: 'Beirut, Lebanon', palette: ['#8B7355', '#C8A45C', '#4A3728', '#1A1A1A'], genre: 'Thriller' },
  { title: 'Kingdom of Heaven', year: 2005, director: 'Ridley Scott', location: 'Ouarzazate', budget: '$130M', localRevenue: '$15M', playedAs: 'Jerusalem / Crusader States', palette: ['#C8A45C', '#8B7355', '#DEB887', '#4A3728'], genre: 'Epic' },
  { title: 'Sahara', year: 2005, director: 'Breck Eisner', location: 'Merzouga / Erfoud', budget: '$160M', localRevenue: '$8M', playedAs: 'Mali / Niger / Sahara', palette: ['#D4A574', '#EDC9AF', '#C8A45C', '#87CEEB'], genre: 'Adventure' },
  { title: 'Babel', year: 2006, director: 'A. G. Iñárritu', location: 'Taguenzalt / Ouarzazate', budget: '$25M', localRevenue: '$3M', playedAs: 'Morocco (as itself)', palette: ['#C8A45C', '#6B4226', '#E8D5B5', '#3E2723'], genre: 'Drama' },
  { title: 'The Bourne Ultimatum', year: 2007, director: 'Paul Greengrass', location: 'Tangier', budget: '$110M', localRevenue: '$6M', playedAs: 'Tangier (as itself)', palette: ['#C8A45C', '#FFFFFF', '#2196F3', '#8B7355'], genre: 'Thriller', note: 'Rooftop chase across Tangier medina.' },
  { title: 'Inception', year: 2010, director: 'Christopher Nolan', location: 'Tangier', budget: '$160M', localRevenue: '$4M', playedAs: 'Mombasa, Kenya', palette: ['#8B7355', '#C8A45C', '#4A3728', '#1A1A1A'], genre: 'Sci-Fi', note: 'Tangier medina = Mombasa.' },
  { title: 'Prince of Persia', year: 2010, director: 'Mike Newell', location: 'Ouarzazate / Aït Benhaddou', budget: '$200M', localRevenue: '$18M', playedAs: 'Ancient Persia', palette: ['#C8A45C', '#8B4513', '#DEB887', '#2B1D0E'], genre: 'Adventure' },
  { title: 'Game of Thrones', year: 2013, director: 'Various', location: 'Essaouira / Aït Benhaddou', budget: '$6M/ep', localRevenue: '$3M', playedAs: 'Astapor & Yunkai (GoT)', palette: ['#C8A45C', '#8B6914', '#DEB887', '#4A3728'], genre: 'Fantasy' },
  { title: 'Only Lovers Left Alive', year: 2013, director: 'Jim Jarmusch', location: 'Tangier', budget: '$7M', playedAs: 'Tangier (as itself)', palette: ['#1A1A1A', '#2E2E2E', '#8B0000', '#C17F28'], genre: 'Drama' },
  { title: 'American Sniper', year: 2014, director: 'Clint Eastwood', location: 'Rabat / Salé', budget: '$59M', localRevenue: '$4M', playedAs: 'Iraq', palette: ['#8B7355', '#C8A45C', '#4A3728', '#6B8E23'], genre: 'War' },
  { title: 'Mission: Impossible — Rogue Nation', year: 2015, director: 'C. McQuarrie', location: 'Marrakech', budget: '$150M', localRevenue: '$8M', playedAs: 'Marrakech (as itself)', palette: ['#C8A45C', '#8B6914', '#FFFFFF', '#4A3728'], genre: 'Action' },
  { title: 'Spectre', year: 2015, director: 'Sam Mendes', location: 'Tangier / Oujda / Erfoud', budget: '$245M', localRevenue: '$10M', playedAs: 'Tangier + desert lair', palette: ['#C8A45C', '#D4A574', '#1A1A1A', '#8B6914'], genre: 'Action', note: 'Largest film explosion ever (Erfoud).' },
  { title: 'Ben-Hur', year: 2016, director: 'Timur Bekmambetov', location: 'Ouarzazate', budget: '$100M', localRevenue: '$10M', playedAs: 'Jerusalem / Roman Judea', palette: ['#D4A574', '#8B6914', '#5C4033', '#E8C99B'], genre: 'Epic' },
  { title: 'John Wick: Chapter 3', year: 2019, director: 'Chad Stahelski', location: 'Essaouira', budget: '$75M', localRevenue: '$5M', playedAs: 'Casablanca (fictional)', palette: ['#1A237E', '#0D47A1', '#C8A45C', '#1C1108'], genre: 'Action', note: 'High-contrast blues and golds.' },
  { title: 'Gladiator II', year: 2024, director: 'Ridley Scott', location: 'Ouarzazate / Aït Benhaddou', budget: '$200M', localRevenue: '$30M', playedAs: 'Ancient Rome / Numidia', palette: ['#8B6914', '#B8860B', '#4A3728', '#1C1108'], genre: 'Epic', note: 'Most expensive film ever shot in Morocco.' },
  { title: 'The Odyssey', year: 2025, director: 'Christopher Nolan', location: 'Essaouira / Aït Benhaddou / Dakhla', budget: '$250M', localRevenue: '$25M', playedAs: 'Ancient Greece / Mediterranean', palette: ['#1565C0', '#C8A45C', '#FFFFFF', '#4A6741'], genre: 'Epic', note: 'Nolan returns. Matt Damon, Zendaya.' },
]

// ═══ LOOK-ALIKE INDEX ═══
const CITY_DOUBLES = [
  { city: 'Ouarzazate / Aït Benhaddou', productions: 50, roles: ['Ancient Rome ×4', 'Ancient Egypt ×6', 'Jerusalem ×5', 'Tibet ×2', 'Persia ×2', 'Bible lands ×8', 'Fantasy ×4', 'Mars ×2', 'Somalia', 'Itself ×11'] },
  { city: 'Tangier', productions: 18, roles: ['Mombasa ×1', 'Beirut ×1', '"Exotic East" ×3', 'Itself ×13'] },
  { city: 'Marrakech', productions: 15, roles: ['Generic Middle East ×3', 'India ×1', 'Itself ×11'] },
  { city: 'Essaouira', productions: 12, roles: ['Ancient Greece ×2', 'Slaver\'s Bay ×2', 'Venice/Cyprus ×1', 'Itself ×6'] },
  { city: 'Erfoud / Merzouga', productions: 10, roles: ['Ancient Egypt ×3', 'Mali/Niger ×2', 'American SW ×1', 'Mars ×2'] },
  { city: 'Rabat / Salé', productions: 8, roles: ['Iraq ×2', 'Beirut ×1', 'Somalia ×1', 'Itself ×4'] },
]

// ═══ REVENUE TIMELINE ═══
const REVENUE = [
  { year: 2019, value: 80 },
  { year: 2020, value: 25 },
  { year: 2021, value: 44 },
  { year: 2022, value: 60 },
  { year: 2023, value: 114 },
  { year: 2024, value: 150 },
  { year: 2025, value: 150 },
]

// ═══ FILM CARD ═══
function FilmCard({ film, index }: { film: Production; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="border-b py-4 transition-all duration-500 cursor-default"
      style={{
        borderColor: hovered ? C.film : C.border,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transitionDelay: `${(index % 8) * 30}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4">
        {/* Palette strip — breathes on hover */}
        <div className="flex gap-[2px] shrink-0 pt-1">
          {film.palette.map((color, j) => (
            <div key={j} className="w-3 rounded-sm transition-all duration-500"
              style={{
                background: color,
                height: hovered ? 40 : 24,
                transitionDelay: `${j * 60}ms`,
              }} />
          ))}
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-[11px] font-semibold" style={{ color: C.ink }}>
              {film.title}
            </span>
            <span className="font-mono text-[10px]" style={{ color: C.muted }}>
              {film.year} · {film.director}
            </span>
          </div>
          <div className="flex items-baseline gap-3 mt-1 flex-wrap">
            <span className="font-mono text-[10px]" style={{ color: C.desert }}>
              {film.location} → <em>{film.playedAs}</em>
            </span>
            <span className="font-mono text-[10px]" style={{ color: C.film }}>
              {film.budget}
            </span>
            {film.localRevenue && (
              <span className="font-mono text-[10px]" style={{ color: C.green }}>
                local: {film.localRevenue}
              </span>
            )}
          </div>
          {hovered && film.note && (
            <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>
              {film.note}
            </p>
          )}
        </div>
        <span className="font-mono text-[9px] shrink-0 px-2 py-0.5 rounded-full border"
          style={{ borderColor: C.border, color: C.muted }}>
          {film.genre}
        </span>
      </div>
    </div>
  )
}

// ═══ REVENUE CHART ═══
function RevenueChart() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const maxVal = 160
  return (
    <div ref={ref} className="flex items-end gap-3 h-[200px]">
      {REVENUE.map((d, i) => {
        const pct = (d.value / maxVal) * 100
        const isRecord = d.value >= 150
        const isCovid = d.year === 2020
        return (
          <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
            <span className="font-mono text-[11px] font-semibold"
              style={{ color: isRecord ? C.gold : isCovid ? C.muted : C.film }}>
              ${d.value}M
            </span>
            <div className="w-full rounded-t-sm transition-all duration-1000 ease-out"
              style={{
                height: visible ? `${pct}%` : '0%',
                background: isRecord ? `${C.gold}20` : isCovid ? `${C.muted}10` : `${C.film}12`,
                borderTop: `2px solid ${isRecord ? C.gold : isCovid ? C.muted : C.film}`,
                transitionDelay: `${i * 120}ms`,
              }} />
            <span className="font-mono text-[10px] font-semibold" style={{ color: C.ink }}>
              {d.year}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ═══ MAIN PAGE ═══

const CHAMELEON_COUNTRY_PTS = [
  { name: 'Souss-Massa NP', lat: 30.05, lng: -9.53, detail: 'Northern bald ibis. Last wild colony.', color: '#5C7C3E' },
  { name: 'Toubkal NP', lat: 31.06, lng: -7.92, detail: 'Barbary macaque. High Atlas endemic.', color: '#2D6E4F' },
  { name: 'Merja Zerga', lat: 34.86, lng: -6.30, detail: 'Wetland. Flamingos, spoonbills. RAMSAR site.', color: '#2D5F8A' },
  { name: 'Dakhla Bay', lat: 23.72, lng: -15.93, detail: 'Monk seal habitat. Desert meets Atlantic.', color: '#1A5276' },
  { name: 'Ifrane / Cedar Forest', lat: 33.53, lng: -5.11, detail: 'Barbary macaque. Atlas cedar. Endangered.', color: '#5C7C3E' },
  { name: 'Khenifiss NP', lat: 28.05, lng: -12.28, detail: 'Saharan wetland. Monk seal. Migratory birds.', color: '#4A7C6F' },
]
const MBT_CHAMELEON_COUNTRY = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function ChameleonCountryMap() {
  const mc = useRef<HTMLDivElement>(null)
  const mr = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mc.current || !MBT_CHAMELEON_COUNTRY || mr.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MBT_CHAMELEON_COUNTRY!
      const map = new mapboxgl.Map({ container: mc.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-7, 31], zoom: 5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mr.current = map
      map.on('load', () => {
        CHAMELEON_COUNTRY_PTS.forEach(p => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => { map.flyTo({ center: [p.lng, p.lat], zoom: 8, duration: 1200 }) })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '220px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mr.current?.remove(); mr.current = null }
  }, [])
  return <div ref={mc} className="w-full" style={{ height: '480px', background: '#0a0a0a' }} />
}

export function ChameleonCountryContent() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const filtered = activeFilter
    ? PRODUCTIONS.filter(p => p.location.toLowerCase().includes(activeFilter.toLowerCase()))
    : PRODUCTIONS

  const heroRef = useRef<HTMLDivElement>(null)
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeroVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const numsRef = useRef<HTMLDivElement>(null)
  const [numsVisible, setNumsVisible] = useState(false)
  useEffect(() => {
    const el = numsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setNumsVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 025 · Cultural Cartography</p>
        <div ref={heroRef}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Chameleon Country</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)] transition-all duration-1000"
            style={{ color: C.muted, opacity: heroVisible ? 1 : 0, transitionDelay: '200ms' }}>
            Every landscape Morocco has pretended to be
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Morocco has played Ancient Rome, Jerusalem, Tibet, Mogadishu, Mombasa,
          Ancient Egypt, Persia, Afghanistan, Mars, and the American Southwest.
          Foreign shoots generated $150 million in 2025 &mdash; triple the pre-2021
          level. And the most famous Morocco film of all &mdash; <em>Casablanca</em>
          &mdash; was never filmed here.
        </p>

        {/* Big numbers — animated */}
        <div ref={numsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { value: '200+', label: 'productions', sub: 'Atlas Studios since 1983' },
            { value: '$150M', label: 'foreign revenue', sub: '2025 record (CCM)' },
            { value: '128', label: 'years', sub: 'since Lumière, 1897' },
            { value: '50+', label: 'identities', sub: 'Ouarzazate alone' },
          ].map((n, i) => (
            <div key={n.label}
              className="transition-all duration-700"
              style={{ opacity: numsVisible ? 1 : 0, transform: numsVisible ? 'translateY(0)' : 'translateY(16px)', transitionDelay: `${i * 150}ms` }}>
              <p className="font-mono text-[28px] font-bold leading-none" style={{ color: C.film }}>{n.value}</p>
              <p className="font-mono text-[11px] font-semibold mt-1" style={{ color: C.ink }}>{n.label}</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FILMOGRAPHY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
            <div>
              <p className="micro-label mb-1" style={{ color: C.film }}>The Chromatic Filmography</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>
                {filtered.length} productions. Colour strips = dominant palette. Hover for details.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[null, 'Ouarzazate', 'Tangier', 'Essaouira', 'Marrakech', 'Rabat'].map(loc => (
                <button key={loc || 'all'}
                  className="font-mono text-[10px] px-2 py-1 rounded-full border transition-all duration-200"
                  style={{
                    borderColor: activeFilter === loc ? C.film : C.border,
                    color: activeFilter === loc ? C.film : C.muted,
                    background: activeFilter === loc ? `${C.film}08` : 'transparent',
                  }}
                  onClick={() => setActiveFilter(loc)}>
                  {loc || 'All'}
                </button>
              ))}
            </div>
          </div>
          {filtered.map((film, i) => (
            <FilmCard key={`${film.title}-${film.year}`} film={film} index={i} />
          ))}
        </div>
      </section>

      {/* ═══ LOOK-ALIKE INDEX ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.desert }}>The Look-Alike Index</p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            How often each city has &ldquo;played&rdquo; another place. Green = played itself.
          </p>
          {CITY_DOUBLES.map((city, ci) => {
            const ref = useRef<HTMLDivElement>(null)
            const [vis, setVis] = useState(false)
            useEffect(() => {
              const el = ref.current
              if (!el) return
              const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
                { threshold: 0.1 }
              )
              obs.observe(el)
              return () => obs.disconnect()
            }, [])
            return (
              <div key={city.city} ref={ref} className="border-b py-5 transition-all duration-700"
                style={{ borderColor: C.border, opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-20px)', transitionDelay: `${ci * 80}ms` }}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-[12px] font-semibold tracking-wide" style={{ color: C.ink }}>
                    {city.city}
                  </span>
                  <span className="font-mono text-[11px] font-bold" style={{ color: C.film }}>
                    {city.productions} productions
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {city.roles.map((role, j) => {
                    const isItself = role.includes('Itself')
                    return (
                      <span key={j} className="font-mono text-[10px] px-2 py-1 rounded-full border transition-all duration-300 hover:scale-105 cursor-default"
                        style={{
                          borderColor: isItself ? C.green : C.desert,
                          color: isItself ? C.green : C.desert,
                          background: isItself ? `${C.green}08` : `${C.desert}06`,
                        }}>
                        {role}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══ REVENUE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="micro-label mb-1" style={{ color: C.gold }}>The $150 Million Year</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>
                Foreign production revenue (USD millions). 3× growth since pre-2021.
              </p>
            </div>
            <span className="font-mono text-[32px] font-bold" style={{ color: C.gold }}>3×</span>
          </div>
          <RevenueChart />
          <p className="font-mono text-[10px] mt-3" style={{ color: C.muted }}>
            CCM / Minister Bensaid, Chamber of Representatives, January 2026
          </p>
        </div>
      </section>

      {/* ═══ CASABLANCA PARADOX ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.ink }}>The Casablanca Paradox</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border p-5 rounded-sm" style={{ borderColor: C.border }}>
              <p className="font-mono text-[11px] leading-[1.7]" style={{ color: C.text }}>
                The most famous Morocco film was shot entirely at Warner Bros. Studios,
                Burbank, California, 1942. Humphrey Bogart never set foot in Casablanca.
                The airport in the final scene is a painted backdrop with a cardboard aeroplane.
              </p>
            </div>
            <div className="border p-5 rounded-sm" style={{ borderColor: C.film }}>
              <p className="font-mono text-[11px] leading-[1.7]" style={{ color: C.text }}>
                But Rick&apos;s Caf&eacute; now exists. A real restaurant in Casablanca,
                opened 2004. Fiction created the place. The place then created itself
                to match the fiction. The chameleon ate its own tail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.film }}>The Chameleon Logic</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Why does Ouarzazate work as Ancient Rome, Jerusalem, Tibet, and Mars?
                The light: clear Saharan air produces shadows so sharp they look cinematic
                without filters. The architecture: pisé walls read as ancient in any culture
                because they <em>are</em> ancient. The emptiness: the landscape is so stripped
                of modern markers that a director can project any era onto it.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.desert }}>The Colour Signature</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Ridley Scott&apos;s palette is warm ochre and burnt sienna. Nolan works
                in high-contrast blues and desaturated earth. Stahelski pushed <span className="underline underline-offset-2">Essaouira</span>
                into midnight blue and gold. The same stone, the same light — rendered
                unrecognisable by colour grading alone.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.gold }}>The $150 Million Question</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The real competitive advantage is not financial — it is geographic.
                Morocco offers Sahara, Atlantic coast, snow-capped Atlas, imperial
                cities, and desert kasbahs within a 4-hour drive. No other country
                can double for that many continents in a single production day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-4">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            Ouarzazate has been Rome, Egypt, Jerusalem, Tibet, Persia, Somalia,
            and Mars. Tangier has been Mombasa and Beirut. Essaouira has been
            Slaver&apos;s Bay and ancient Greece. And Casablanca &mdash; the city
            that gave its name to the most famous film in history &mdash; has never
            once appeared in that film. The chameleon does not choose its colours.
            The world projects them.
          </p>
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>Biodiversity Hotspots</p>
        <ChameleonCountryMap />
      </div></section>

{/* SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Revenue: Minister Bensaid, Chamber of Representatives, Jan 2026 (Morocco
            World News). $150M (MAD 1.5B) foreign revenue 2025; pre-2021 under $50M.
            Gladiator II: Le Monde, $30M local spend. Atlas Studios: founded 1983,
            200+ productions. First film: Lumière, 1897. Casablanca (1942): Warner Bros.,
            Burbank, CA (IMDb). Budgets: Box Office Mojo. Palettes: editorial approximation.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
              &copy; {new Date().getFullYear()} Slow Morocco
            </p>
            <p className="font-mono text-[11px]" style={{ color: C.green }}>
              © Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
