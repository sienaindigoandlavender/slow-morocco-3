'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  gregorian: '#2D6E4F', islamic: '#722F37', amazigh: '#C17F28', school: '#1A5276',
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

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const AMAZIGH_MONTHS = [
  { name: 'Yennayer', start: 'Jan 14', season: 'Tagrest (Winter)', activity: 'Ploughing, sowing' },
  { name: 'Furar', start: 'Feb 14', season: 'Tagrest', activity: 'Pruning trees' },
  { name: 'Meghres', start: 'Mar 14', season: 'Tafsut (Spring)', activity: 'Spring planting' },
  { name: 'Ibrir', start: 'Apr 14', season: 'Tafsut', activity: 'Irrigation' },
  { name: 'Mayyu', start: 'May 14', season: 'Tafsut', activity: 'Weeding, tending' },
  { name: 'Yunyu', start: 'Jun 14', season: 'Iwilen (Summer)', activity: 'Grain harvest begins' },
  { name: 'Yulyuz', start: 'Jul 14', season: 'Iwilen', activity: 'Threshing, winnowing' },
  { name: 'Ghusht', start: 'Aug 14', season: 'Iwilen', activity: 'Fruit harvest, heat peak' },
  { name: 'Shutanbir', start: 'Sep 14', season: 'Amewan (Autumn)', activity: 'Date harvest, olives begin' },
  { name: 'Ktuber', start: 'Oct 14', season: 'Amewan', activity: 'Olive harvest' },
  { name: 'Nwanbir', start: 'Nov 14', season: 'Amewan', activity: 'Ploughing returns' },
  { name: 'Dujanbir', start: 'Dec 14', season: 'Tagrest (Winter)', activity: 'Sowing winter wheat' },
]

interface CalEvent {
  month: number; day: number; dayEnd?: number; name: string
  system: 'gregorian' | 'islamic' | 'amazigh' | 'school'
  note?: string
}

const EVENTS: CalEvent[] = [
  // Gregorian / National
  { month: 0, day: 1, name: "New Year's Day", system: 'gregorian' },
  { month: 0, day: 11, name: 'Manifesto of Independence', system: 'gregorian', note: '1944' },
  { month: 4, day: 1, name: 'Labour Day', system: 'gregorian' },
  { month: 6, day: 30, name: 'Throne Day', system: 'gregorian', note: 'Biggest national holiday' },
  { month: 7, day: 14, name: 'Oued Ed-Dahab Day', system: 'gregorian' },
  { month: 7, day: 20, name: 'Revolution Day', system: 'gregorian', note: '1953' },
  { month: 7, day: 21, name: 'Youth Day', system: 'gregorian' },
  { month: 10, day: 6, name: 'Green March', system: 'gregorian', note: '1975' },
  { month: 10, day: 18, name: 'Independence Day', system: 'gregorian', note: '1956' },
  // Islamic (2026 approx)
  { month: 2, day: 1, dayEnd: 30, name: 'Ramadan', system: 'islamic', note: 'Feb 28 – Mar 29, 2026. Shifts ~11 days earlier each year.' },
  { month: 2, day: 30, name: 'Eid al-Fitr', system: 'islamic', note: '~Mar 30, 2026. End of Ramadan. 2 days off.' },
  { month: 5, day: 6, dayEnd: 8, name: 'Eid al-Adha', system: 'islamic', note: '~Jun 6, 2026. Sacrifice feast. Biggest family gathering.' },
  { month: 5, day: 27, name: 'Islamic New Year', system: 'islamic', note: '1 Muharram ~Jun 27, 2026' },
  { month: 8, day: 5, name: 'Eid al-Mawlid', system: 'islamic', note: "Prophet's birthday ~Sep 5, 2026" },
  // Amazigh
  { month: 0, day: 13, name: 'Yennayer (Amazigh New Year)', system: 'amazigh', note: 'Year 2976. National holiday since 2024. Couscous with 7 vegetables.' },
  { month: 2, day: 20, name: 'Spring Equinox', system: 'amazigh', note: 'Tafsut begins. Planting season.' },
  { month: 5, day: 21, name: 'Summer Solstice', system: 'amazigh', note: 'Longest day. Grain harvest peaks.' },
  { month: 5, day: 14, dayEnd: 30, name: 'Grain Harvest', system: 'amazigh', note: 'Barley + wheat. Threshing floors active.' },
  { month: 8, day: 22, name: 'Autumn Equinox', system: 'amazigh', note: 'Amewan begins. Olive + date harvest.' },
  { month: 9, day: 1, dayEnd: 30, name: 'Olive Harvest', system: 'amazigh', note: 'Major agricultural event. Oct–Nov.' },
  { month: 11, day: 21, name: 'Winter Solstice', system: 'amazigh', note: 'Shortest day. New ploughing cycle.' },
  // School
  { month: 8, day: 8, name: 'Rentrée scolaire', system: 'school', note: 'School year begins.' },
  { month: 9, day: 18, dayEnd: 31, name: 'Autumn Break', system: 'school', note: 'Oct 18 – Nov 3.' },
  { month: 11, day: 20, dayEnd: 31, name: 'Winter Break', system: 'school', note: 'Dec 20 – Jan 5.' },
  { month: 1, day: 21, dayEnd: 28, name: 'February Break', system: 'school', note: 'Feb 21 – Mar 9.' },
  { month: 3, day: 25, dayEnd: 30, name: 'Spring Break', system: 'school', note: 'Apr 25 – May 11.' },
  { month: 5, day: 30, name: 'End of School Year', system: 'school', note: 'Bac students finish.' },
]

const SYSTEM_META: Record<string, { color: string; label: string }> = {
  gregorian: { color: C.gregorian, label: 'National / Gregorian' },
  islamic: { color: C.islamic, label: 'Islamic (Lunar)' },
  amazigh: { color: C.amazigh, label: 'Amazigh (Agricultural)' },
  school: { color: C.school, label: 'School Calendar' },
}

export function MoroccanCalendarContent() {
  const heroR = useReveal()
  const [filter, setFilter] = useState<string>('all')
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null)

  const filtered = filter === 'all' ? EVENTS : EVENTS.filter(e => e.system === filter)
  const byMonth = MONTHS.map((_, i) => filtered.filter(e => e.month === i))

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Temporal Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Moroccan Calendar</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Four calendars. One year. Time is not singular here.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Morocco operates on four overlapping calendars simultaneously: Gregorian (state, business),
          Islamic lunar (religion, <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Ramadan</span>, Eid), <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Amazigh</span> agricultural (planting, harvest, solstice),
          and French school (rentrée, vacances). A Moroccan family tracks all four — and each year
          the Islamic calendar drifts 11 days earlier through the Gregorian, creating a 33-year cycle
          of shifting overlaps.
        </p>
        {/* Numbers */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          {[
            { v: '9', l: 'national holidays', c: C.gregorian },
            { v: '5', l: 'Islamic observances', c: C.islamic },
            { v: '7', l: 'Amazigh events', c: C.amazigh },
            { v: '6', l: 'school terms', c: C.school },
          ].map(n => (
            <div key={n.l}>
              <p className="font-mono text-[24px] font-bold" style={{ color: n.c }}>{n.v}</p>
              <p className="font-mono text-[10px]" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FILTER + MONTHLY TIMELINE */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
            <div>
              <p className="micro-label mb-1" style={{ color: C.muted }}>Year at a Glance</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>Click a month to expand. Filter by calendar system.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'gregorian', 'islamic', 'amazigh', 'school'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="font-mono text-[10px] px-3 py-1 rounded-full border transition-all"
                  style={{
                    borderColor: filter === f ? (f === 'all' ? C.muted : SYSTEM_META[f]?.color || C.muted) : C.border,
                    color: filter === f ? (f === 'all' ? C.ink : SYSTEM_META[f]?.color || C.ink) : C.muted,
                    background: filter === f ? `${(f === 'all' ? C.muted : SYSTEM_META[f]?.color || C.muted)}06` : 'transparent',
                  }}>
                  {f === 'all' ? `All (${EVENTS.length})` : `${SYSTEM_META[f]?.label} (${EVENTS.filter(e => e.system === f).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Month rows */}
          <div className="space-y-1">
            {MONTHS.map((month, mi) => {
              const events = byMonth[mi]
              const isExpanded = expandedMonth === mi
              const amazighM = AMAZIGH_MONTHS[mi]
              return (
                <div key={month}>
                  <div className="flex items-center gap-3 cursor-pointer group py-2"
                    onClick={() => setExpandedMonth(isExpanded ? null : mi)}>
                    <span className="font-mono text-[12px] font-semibold w-20 shrink-0 group-hover:underline" style={{ color: C.ink }}>{MONTHS_SHORT[mi]}</span>
                    {/* Event dots on a line */}
                    <div className="flex-1 h-6 relative flex items-center">
                      <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: C.border }} />
                      {events.map((e, i) => {
                        const left = `${(e.day / 31) * 100}%`
                        const sys = SYSTEM_META[e.system]
                        const width = e.dayEnd ? `${((e.dayEnd - e.day) / 31) * 100}%` : undefined
                        return width ? (
                          <div key={i} className="absolute top-1 h-4 rounded-sm" style={{ left, width, background: `${sys.color}15`, borderLeft: `2px solid ${sys.color}` }}>
                            <span className="font-mono text-[8px] px-1 whitespace-nowrap overflow-hidden" style={{ color: sys.color }}>{e.name}</span>
                          </div>
                        ) : (
                          <div key={i} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10" style={{ left, background: sys.color }} title={e.name} />
                        )
                      })}
                    </div>
                    <span className="font-mono text-[10px] w-6 text-right shrink-0" style={{ color: events.length ? C.text : C.border }}>
                      {events.length || '–'}
                    </span>
                  </div>
                  {/* Expanded */}
                  {isExpanded && (
                    <div className="ml-20 pl-3 border-l-2 mb-3 space-y-2 py-2" style={{ borderColor: C.muted }}>
                      {/* Amazigh parallel */}
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.amazigh }}>Amazigh</span>
                        <span className="font-mono text-[11px]" style={{ color: C.text }}>
                          {amazighM.name} (from {amazighM.start}) · {amazighM.season} · {amazighM.activity}
                        </span>
                      </div>
                      {events.length === 0 && (
                        <p className="font-mono text-[11px]" style={{ color: C.muted }}>No events this month for selected filter.</p>
                      )}
                      {events.map((e, i) => {
                        const sys = SYSTEM_META[e.system]
                        return (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: sys.color }} />
                            <div>
                              <span className="font-mono text-[12px] font-semibold" style={{ color: sys.color }}>{e.name}</span>
                              <span className="font-mono text-[10px] ml-2" style={{ color: C.muted }}>
                                {MONTHS_SHORT[e.month]} {e.day}{e.dayEnd ? `–${e.dayEnd}` : ''}
                              </span>
                              {e.note && <p className="font-mono text-[10px]" style={{ color: C.muted }}>{e.note}</p>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.islamic }}>The Ramadan Drift</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The Islamic calendar is 354 days. Ramadan moves 11 days earlier each Gregorian year,
                cycling through all seasons in 33 years. A Moroccan born in 1990 has fasted in winter
                (short, cold days) and summer (16-hour scorching days). The same holiday is never the
                same experience twice.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.amazigh }}>Yennayer 2976</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                January 13 became a national holiday in 2024 — the first time the Amazigh new year
                was officially recognized. Year 2976 in the Amazigh count. Families eat couscous with
                seven vegetables. The date marks the Berber agricultural year, older than both the
                Islamic and Gregorian systems in North Africa.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.school }}>The French Inheritance</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Morocco&apos;s school calendar follows the French model: la rentrée in September,
                vacances d&apos;automne, d&apos;hiver, de printemps. The rhythm of the academic year
                shapes family travel, hotel occupancy, and domestic tourism as powerfully as any
                religious calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            Ask a Moroccan what month it is and you might get four answers.
            It is March, and it is Ramadan, and it is Meghres, and it is
            the second trimester. Time in Morocco is layered — state, faith,
            earth, school — and every layer carries different obligations. The
            overlaps are where the interesting things happen.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            National holidays from Moroccan labour code and HCP official calendar. Islamic dates
            from Umm al-Qura calendar adjusted for Morocco (actual dates depend on moon sighting).
            Amazigh calendar from IRCAM publications and Berber agricultural ethnography. School
            calendar from Ministry of National Education 2025–2026 academic schedule. Amazigh month
            names from Haddadou (2000) and IRCAM Tifinagh standardisation.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.amazigh }}>© Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
