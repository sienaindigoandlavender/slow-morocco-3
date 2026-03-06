'use client';

import { useState, useEffect, useRef } from 'react';

/* ─── MODULE 132 — THE VERTICAL MIGRATION ─── */
/*
  MASTER THESIS: The agdal is not merely a pasture. It is a 4,500-year-old
  ecological governance system — possibly the world's oldest functioning
  commons management. The Amazigh word derives from the root GDL: to prohibit,
  to protect, a territory itself. Close the mountain in spring so the plants
  can seed. Open it in summer so the animals can eat. Repeat for 4,500 years.

  The rock engravings at Oukaïmeden prove this system was operating by the
  mid-3rd millennium BCE — cattle carved into stone at 2,630 metres. By the
  2nd millennium BCE, the carvings shift from cattle to weapons. The pastures
  were already contested. The same conflict is happening today, but the
  response is abandonment, not carving.

  At Igourdane, 500 families made the journey in the 1980s. In 2018, 17 did.
  At another measure: 100 families in 1984, 10 in 2019.

  SOURCES:
  Agdal system: Global Diversity Foundation 2020, 2022; AMNC 2021;
    Dominguez et al. 2012; Springer/Radi et al. 2025
  Rock art: British Museum African Rock Art (Oukaïmeden); Jebel Yagour Wikipedia;
    Searight 2013; Malhomme 1959/1961; Galán et al. 2014; MDPI Arts 2013
  Transhumance routes: New Lines Magazine 2023; Archnet/Dumbarton Oaks;
    Vidal-González & Mahdi 2019; Ilemchane study (BioOne MRD 2021)
  Morocco pastoral: MNHN OpenEdition (Mahdi); Springer Discover Sustainability 2025;
    PMC/Nature (Tizi N'Oucheg 2025); IUCN High Atlas
  High Atlas: Britannica; Wikipedia
*/

const NAMED_AGDALS = [
  {
    name: 'Oukaïmeden',
    altitude: '2,630m',
    region: 'Northern High Atlas (south of Marrakech)',
    tribes: 'Rheraya, Ourika',
    patron: 'Sidi Fars',
    rockArt: '1,068 engravings across 249 sites',
    rockDate: 'Mid-3rd millennium BCE → Libyan-Berber period',
    note: 'Largest concentration of High Atlas rock art. Earliest: cattle. Later: weapons and warriors as pasture conflicts grew. Morocco\'s only ski resort sits on a 4,500-year-old pastoral commons.',
    status: 'Active but declining',
    color: '#C75B2A',
  },
  {
    name: 'Yagour Plateau',
    altitude: '2,300–2,700m',
    region: 'Northern High Atlas (Al-Hawz Province)',
    tribes: 'Local confederations',
    patron: 'Sidi Fares',
    rockArt: '2,000+ engravings across 4,000 hectares',
    rockDate: '~1500 BCE (Bronze Age)',
    note: 'The "Sun Panel" — largest single engraving — was destroyed by Salafists in 2012. Still subject to agdal governance: spring closure, tribal council decides opening after pasture flourishes.',
    status: 'Active, under threat',
    color: '#8B6914',
  },
  {
    name: 'Igourdane',
    altitude: 'High eastern High Atlas',
    region: 'Province of Azilal',
    tribes: 'Aït Mhamed, Aït Ali, Aït Atta',
    patron: 'Communal council',
    rockArt: 'None documented',
    rockDate: '—',
    note: '4,000+ hectares. 250 rights-holding families across 3 tribes. Closed every April, opened early June. The Ben Youssef family (Aït Atta) walk 200km from Nkob each summer. 500 families in the 1980s → 17 in 2018.',
    status: 'Critical — 97% collapse',
    color: '#C62828',
  },
  {
    name: 'Agdal n\'Islan',
    altitude: 'High Atlas (near Imilchil)',
    region: 'Eastern High Atlas',
    tribes: 'Local Amazigh confederations',
    patron: 'Patron saint authority',
    rockArt: 'None documented',
    rockDate: '—',
    note: 'One of the most reputed pastoral agdals. Near Imilchil, famous for its September marriage festival (Moussem des Fiançailles). Connected to the wider Aït Hadiddou transhumant network.',
    status: 'Declining',
    color: '#5D4037',
  },
  {
    name: 'Tichka',
    altitude: '~2,200m+',
    region: 'Northern High Atlas',
    tribes: 'Local confederations',
    patron: 'Saint authority',
    rockArt: 'Rock engravings present',
    rockDate: 'Bronze Age onward',
    note: 'Part of the northern High Atlas rock art cluster alongside Oukaïmeden and Yagour. Near the Tizi n\'Tichka pass (2,260m), the main route between Marrakech and Ouarzazate.',
    status: 'Active but pressured',
    color: '#4E342E',
  },
  {
    name: 'Aït Bouguemmez (Forest Agdal)',
    altitude: '~2,000–2,500m',
    region: 'Central High Atlas',
    tribes: 'Aït Bouguemmez valley communities',
    patron: 'Communal forest governance',
    rockArt: 'None documented',
    rockDate: '—',
    note: 'A forest agdal — regulates timber and grazing in mixed-use woodland. The "Happy Valley" of the central High Atlas. Demonstrates that agdal governance extends beyond pastoral to forest and orchard systems.',
    status: 'Functioning',
    color: '#2E7D32',
  },
];

const TIMELINE_DATA = [
  { year: '~2500 BCE', event: 'Earliest rock engravings at Oukaïmeden — cattle on red sandstone slabs at 2,630m. Evidence of established summer grazing system.', type: 'rock' },
  { year: '~1500 BCE', event: 'Yagour Plateau engravings: Bronze Age weapons (halberds, daggers) join cattle images. Increasing territorial conflict over pastures.', type: 'rock' },
  { year: '~1000 BCE', event: 'Shift at Oukaïmeden: weapons and warriors replace cattle as primary motif. Pasture access is now fought over, not just shared.', type: 'rock' },
  { year: '8th c. CE', event: 'Earliest documented transhumance: Zenāta clans (Middle Atlas), Maṣmūda (High Atlas), Ṣanhāja (southern slopes). Tribal leader signals the seasonal move.', type: 'hist' },
  { year: '~1200 CE', event: 'Agdal of Yagour placed under patronage of Sidi Fares. The saint "established the principles of pastoral organisation." Sacred authority enforces seasonal closure.', type: 'hist' },
  { year: '1927', event: 'French colonial officer Célerier publishes "La transhumance dans le Moyen Atlas" — first European documentation. He calls nomadism "antiquated backwardness."', type: 'colonial' },
  { year: '1935', event: 'French census: 16% of Moroccan households under tents. Middle Atlas transhumance is massive, functional, integrated with valley agriculture.', type: 'colonial' },
  { year: '1942', event: 'Toubkal National Park created — first enclosure of traditional Amazigh pastoral territory for conservation.', type: 'modern' },
  { year: '1956', event: 'Independence. Government sees mobile pastoralism as "an archaism reminiscent of the tribal past." Development = sedentarisation.', type: 'modern' },
  { year: '1970s', event: 'Government and NGOs push commercial fruit trees to replace traditional cereals. Fodder self-sufficiency collapses. Dam built at Oukaïmeden alters pasture hydrology.', type: 'crisis' },
  { year: '1980s', event: '~500 families travel to Igourdane agdal for summer transhumance. The last generation for whom the journey is normal.', type: 'data' },
  { year: '1994', event: 'National Park of Rock Engravings inaugurated — Oukaïmeden, Yagour, Jbel Rat protected. But pastoral access continues to erode.', type: 'modern' },
  { year: '2012', event: 'Salafists destroy the "Sun Panel" at Yagour — a Bronze Age engraving that survived 3,500 years destroyed for perceived idolatry.', type: 'crisis' },
  { year: '2016', event: 'Morocco passes Law 113.13 on pastoral transhumance. But agdals are still not formally recognised. "Up to now, many agdals are not recognized."', type: 'modern' },
  { year: '2018', event: '17 families travel to Igourdane. Down from 500 in the 1980s. A 97% collapse in one generation.', type: 'data' },
  { year: '2019', event: 'At another measure: 10 families at Igourdane, down from 100 in 1984. Global Diversity Foundation documents the decline.', type: 'data' },
  { year: '2022–25', event: 'Research confirms: biodiversity and vegetation cover higher inside agdals than outside. The system works — but the people are leaving.', type: 'data' },
];

const ELEVATION_BANDS = [
  { label: 'Valley floor', range: '800–1,200m', season: 'Winter', activity: 'Irrigated terraces: wheat, barley, vegetables, walnut trees. Permanent village (douar). Animals stabled near houses.', color: '#8B6F47' },
  { label: 'Mid-slope (azib)', range: '1,200–2,000m', season: 'Spring / Autumn', activity: 'Seasonal shelters (azib) — stone huts occupied during transition. Mixed grazing on scrubland and forest edge. Some rain-fed cereal cultivation.', color: '#6D8B3E' },
  { label: 'Forest belt', range: '1,500–2,500m', season: 'Variable', activity: 'Cedar, holm oak, cork oak. Forest agdal regulates timber cutting and grazing. Barbary macaque habitat. Manure collected for valley terraces.', color: '#2E7D32' },
  { label: 'High pasture (agdal)', range: '2,000–3,000m+', season: 'Summer (June–Sept)', activity: 'The agdal proper — closed in spring (April–May) for plant reproduction. Opened by tribal council in June. Sheep, goats, cattle, sometimes camels graze the alpine meadows. Tents and temporary camps. The journey\'s destination.', color: '#C75B2A' },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─── HERO ─── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px 24px', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      {/* Mountain silhouette gradient */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, #1a1410 0%, transparent 100%)', opacity: loaded ? 0.6 : 0, transition: 'opacity 2s ease' }} />
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 32, opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}>
          Module 132 · Slow Morocco
        </p>
        <h1 style={{
          fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(44px, 9vw, 110px)',
          fontStyle: 'italic', fontWeight: 400, color: '#fff', lineHeight: 1.0,
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s', marginBottom: 24,
        }}>
          The Vertical Migration
        </h1>
        <p style={{
          fontFamily: '"IBM Plex Mono", monospace', fontSize: 'clamp(13px, 1.5vw, 16px)',
          color: '#999', maxWidth: 640, margin: '0 auto', lineHeight: 1.7,
          opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1s'
        }}>
          Transhumance in the Atlas Mountains.<br />
          Close the mountain in spring so the plants can seed.<br />
          Open it in summer so the animals can eat.<br />
          Repeat for 4,500 years.<br />
          <span style={{ color: '#C75B2A' }}>500 families made the journey in the 1980s. In 2018, 17 did.</span>
        </p>
      </div>
      <div style={{ position: 'absolute', bottom: 40, opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1.5s' }}>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, #555, transparent)', margin: '0 auto' }} />
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&display=swap');`}</style>
    </section>
  );
}

/* ─── BIG NUMBERS ─── */
function BigNumbers() {
  const nums = [
    { value: '4,500', unit: 'years', label: 'Rock engravings prove the system', sub: 'Oukaïmeden, mid-3rd millennium BCE' },
    { value: '62M', unit: 'hectares', label: 'Morocco\'s total rangelands', sub: 'all forms of pastoral use' },
    { value: '200', unit: 'km', label: 'Nkob to Igourdane — on foot', sub: 'Aït Atta tribe, every summer' },
    { value: '97%', unit: 'gone', label: 'Igourdane agdal collapse', sub: '500 families (1980s) → 17 (2018)' },
    { value: '3,000+', unit: 'engravings', label: 'Oukaïmeden + Yagour combined', sub: 'Bronze Age to Libyan-Berber period' },
    { value: '0', unit: 'agdals', label: 'formally recognised by law', sub: 'Law 113.13 passed 2016 — agdals still excluded' },
  ];
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 48 }}>The Numbers</p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px 40px' }}>
          {nums.map((n, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(36px, 5vw, 52px)', color: '#0a0a0a', lineHeight: 1 }}>{n.value}</span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#C75B2A' }}>{n.unit}</span>
                </div>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, fontWeight: 500, color: '#0a0a0a', display: 'block', marginTop: 8 }}>{n.label}</span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#888', display: 'block', marginTop: 4 }}>{n.sub}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── THE SYSTEM (agdal explained) ─── */
function AgdalSystem() {
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#fafafa' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C75B2A', marginBottom: 16 }}>The System</p>
          <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', color: '#0a0a0a', marginBottom: 24 }}>What is an agdal?</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.9, marginBottom: 32 }}>
            The word derives from the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Amazigh</span> root <em>GDL</em> — meaning simultaneously "to prohibit," "to protect," and "a territory." An agdal is all three at once. In the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>High Atlas</span>, it refers to a communal highland pasture governed by seasonal closure: the tribal assembly (<em>jmaâ</em>) closes the mountain in spring, when plants are flowering and seeding. No herds enter. The vegetation completes its full reproductive cycle. Then the council reads the pasture — gauging whether the grass is mature enough — and declares the opening. Herds flood in. Animals eat. The land sustains.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.9, marginBottom: 32 }}>
            This is not a folk practice. Research by the Global Diversity Foundation shows that biodiversity and vegetation cover — including endangered and endemic plant species — are measurably higher inside <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>agdal</span>s than in adjacent areas without grazing prohibitions. The system maximises fodder production while sustaining the ecosystem. It is, by any ecological measure, a working technology. It has been working for at least 4,500 years, possibly longer. Agdals extend across the entire Maghreb, from southern Tunisia to the Western Sahara, from Mauritania to northern Algeria.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.9, marginBottom: 48 }}>
            Many agdals are placed under the spiritual authority of a patron saint. The Yagour agdal belongs to Sidi Fares — the founding hero who, by legend, first entered the valley, demarcated pastures, and established the rules that govern social organisation. The agdal is sacred space: rituals are performed at the opening, during the stay, and at departure. Through belief and legend alone, the regulation holds. No fences. No written law. No police. The saint enforces. The community remembers.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── ELEVATION BANDS ─── */
function ElevationSection() {
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#0a0a0a' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 16 }}>The Vertical</p>
          <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', color: '#fff', marginBottom: 16 }}>Four bands, one mountain</h2>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, color: '#888', lineHeight: 1.7, marginBottom: 48, maxWidth: 640 }}>
            Transhumance — from the Latin <em>trans</em> (across) and <em>humus</em> (earth) — is vertical migration. Each elevation band offers a different resource at a different season. The system exploits complementary levels of the mountain. Movement is the technology.
          </p>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[...ELEVATION_BANDS].reverse().map((band, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                display: 'grid', gridTemplateColumns: '140px 1fr',
                background: '#141414', borderLeft: `3px solid ${band.color}`,
                gap: 0,
              }}>
                <div style={{ padding: '20px 16px', borderRight: '1px solid #222' }}>
                  <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 15, color: band.color, display: 'block' }}>{band.range}</span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', display: 'block', marginTop: 4 }}>{band.season}</span>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, fontWeight: 500, color: '#fff', display: 'block', marginBottom: 6 }}>{band.label}</span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#999', lineHeight: 1.7 }}>{band.activity}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── NAMED AGDALS ─── */
function AgdalExplorer() {
  const [sel, setSel] = useState(0);
  const a = NAMED_AGDALS[sel];
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>The Agdals</p>
          <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', color: '#0a0a0a', marginBottom: 40 }}>Six named commons</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {NAMED_AGDALS.map((ag, i) => (
              <button key={i} onClick={() => setSel(i)} style={{
                padding: '8px 16px', border: '1px solid', cursor: 'pointer',
                borderColor: sel === i ? ag.color : '#ddd',
                background: sel === i ? ag.color : 'transparent',
                color: sel === i ? '#fff' : '#666',
                fontFamily: '"IBM Plex Mono", monospace', fontSize: 12,
                transition: 'all 0.3s ease', borderRadius: 0,
              }}>{ag.name}</button>
            ))}
          </div>
        </FadeIn>
        <div key={a.name} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, animation: 'fadeUp 0.4s ease' }}>
          <div>
            <h3 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 28, fontStyle: 'italic', color: '#0a0a0a', marginBottom: 16 }}>{a.name}</h3>
            <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.8, marginBottom: 24 }}>{a.note}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px' }}>
              {[
                ['Altitude', a.altitude],
                ['Region', a.region],
                ['Tribes', a.tribes],
                ['Patron', a.patron],
              ].map(([l, v]) => (
                <div key={l as string}>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999' }}>{l}</span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, color: '#0a0a0a', display: 'block', marginTop: 4 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#fafafa', padding: 32 }}>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: 8 }}>Rock Art</span>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, fontWeight: 500, color: '#0a0a0a' }}>{a.rockArt}</span>
              {a.rockDate !== '—' && <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#888', display: 'block', marginTop: 4 }}>{a.rockDate}</span>}
            </div>
            <div>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: 8 }}>Status</span>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, fontWeight: 500, padding: '4px 12px', display: 'inline-block', background: a.color + '18', color: a.color }}>{a.status}</span>
            </div>
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    </section>
  );
}

/* ─── THE ROCK EVIDENCE ─── */
function RockEvidence() {
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#fafafa' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B6914', marginBottom: 16 }}>The Evidence</p>
          <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', color: '#0a0a0a', marginBottom: 24 }}>Carved in stone, 4,500 years ago</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.9, marginBottom: 32 }}>
            Oukaïmeden sits at 2,630 metres — higher than any other rock art site in North Africa. The valley could never be inhabited year-round: winter snow prevented occupation. But that same snow made it a strategic summer resource. When pastures dried out in the lowlands around Marrakech, herders brought their cattle up. They carved what they saw into red sandstone slabs. The earliest images — mid-3rd millennium BCE — are cattle. Detailed. Naturalistic. The animals that justified the climb.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.9, marginBottom: 32 }}>
            Then the images change. From the 2nd millennium BCE onward, cattle give way to weapons: halberds, daggers, shields, warriors. Typologically, these weapons match real objects excavated from Early Bronze Age sites in southern Spain (El Argar, Carapatas) — evidence of trans-Mediterranean contact. But the message is local: the pastures are contested. What was once shared is now fought over. The right to graze at altitude became a right worth carving — and worth killing for.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.9, marginBottom: 32 }}>
            At Yagour — 2,300 to 2,700 metres, 4,000 hectares, 2,000+ engravings — the largest single panel was called the "Sun Panel." It survived 3,500 years of weather, invasion, colonisation, and independence. In 2012, a group of Moroccan Salafists destroyed it, believing it depicted a sun god. What they destroyed was not an idol. It was a property deed — a 3,500-year-old record of who had the right to be here.
          </p>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ background: '#fff', border: '1px solid #eee', padding: 32 }}>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: 16 }}>The Shift</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 20, color: '#8B6914', display: 'block' }}>~2500 BCE</span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, color: '#0a0a0a', display: 'block', marginTop: 8 }}>Cattle</span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#888' }}>Naturalistic. Detailed. Abundance.</span>
              </div>
              <div style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 24, color: '#C75B2A' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 20, color: '#C62828', display: 'block' }}>~1500 BCE</span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, color: '#0a0a0a', display: 'block', marginTop: 8 }}>Weapons & Warriors</span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#888' }}>Halberds. Daggers. Shields. Conflict.</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── TIMELINE ─── */
function Timeline() {
  const typeColors: Record<string, string> = { rock: '#8B6914', hist: '#5D4037', colonial: '#455A64', modern: '#1565C0', crisis: '#C62828', data: '#C75B2A' };
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#fff' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>Timeline</p>
          <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', color: '#0a0a0a', marginBottom: 48 }}>4,500 years in 17 moments</h2>
        </FadeIn>
        <div style={{ borderLeft: '2px solid #eee', paddingLeft: 24, marginLeft: 12 }}>
          {TIMELINE_DATA.map((t, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div style={{ marginBottom: 28, position: 'relative' }}>
                <div style={{ position: 'absolute', left: -31, top: 6, width: 10, height: 10, borderRadius: '50%', background: typeColors[t.type] || '#ddd', border: '2px solid #fff' }} />
                <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 17, color: typeColors[t.type], display: 'block', marginBottom: 4 }}>{t.year}</span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, color: '#0a0a0a', lineHeight: 1.6 }}>{t.event}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── THE COLLAPSE ─── */
function CollapseSection() {
  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) 24px', background: '#0a0a0a' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C62828', marginBottom: 32 }}>The Collapse</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 24, marginBottom: 16 }}>
            <div>
              <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(48px, 8vw, 80px)', color: '#fff' }}>500</span>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#666', display: 'block' }}>families (1980s)</span>
            </div>
            <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 32, color: '#C62828' }}>→</span>
            <div>
              <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(48px, 8vw, 80px)', color: '#C62828' }}>17</span>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#666', display: 'block' }}>families (2018)</span>
            </div>
          </div>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#666', marginBottom: 48 }}>Igourdane agdal, eastern High Atlas</p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#999', lineHeight: 1.9, textAlign: 'left', maxWidth: 700, margin: '0 auto' }}>
            Brahim Benyoussef is 80 years old. He has walked the same 200-kilometre path every summer of his life — from Nkob in the Anti-Atlas to the Igourdane agdal in the High Atlas. His family's herd is 1,100 strong. He is up before dawn because he never slept — he was watching the animals through the night. Newborn lambs too young to walk are bundled onto donkeys and reunited with their mothers at dusk.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#999', lineHeight: 1.9, textAlign: 'left', maxWidth: 700, margin: '24px auto 0' }}>
            In the 1970s, government and development NGOs pushed Amazigh farmers to replace traditional rain-fed cereals with commercial fruit trees. Without cereals, there was no fodder. Without fodder, herds shrank. Without large herds, the 200-kilometre trek became unnecessary. The seasonal festivals emptied. The young left for cities. The fruit trees needed fertiliser and pesticide in droughting soil. The thing that was supposed to replace transhumance is now itself failing.
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#C75B2A', lineHeight: 1.9, textAlign: 'left', maxWidth: 700, margin: '24px auto 0' }}>
            The agdal works. The biodiversity data proves it. The vegetation recovers. The endemic species survive inside the agdal and vanish outside it. It is not the system that is failing. It is the people who are leaving.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── SOURCES ─── */
function Sources() {
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 80px) 24px', background: '#fff', borderTop: '1px solid #eee' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 24 }}>Sources & Attribution</p>
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#888', lineHeight: 2, columnCount: 2, columnGap: 40 }}>
            <p><strong style={{ color: '#555' }}>Agdal system:</strong> Global Diversity Foundation 2020, 2022; AMNC/Mediterranean Nature & Culture 2021; Dominguez et al. 2012; Springer (Radi, Chougrani & Behnassi 2025); Ilahiane 1999.</p>
            <p><strong style={{ color: '#555' }}>Rock art:</strong> British Museum African Rock Art (Oukaïmeden); Jebel Yagour Wikipedia; Malhomme 1959/1961; Galán et al. 2014; Ruiz-Galvéz et al. 2013; MDPI Arts (Searight 2013); ResearchGate 2016.</p>
            <p><strong style={{ color: '#555' }}>Transhumance routes:</strong> New Lines Magazine 2023; Archnet/Dumbarton Oaks; Vidal-González & Mahdi 2019; BioOne MRD (Ilemchane study) 2021.</p>
            <p><strong style={{ color: '#555' }}>Morocco pastoral:</strong> MNHN OpenEdition (Mahdi et al.); Springer Discover Sustainability 2025; PMC/Nature (Tizi N'Oucheg) 2025; IUCN High Atlas brief.</p>
            <p><strong style={{ color: '#555' }}>High Atlas:</strong> Britannica; Wikipedia; southeast-morocco.com (rock heritage 2024).</p>
          </div>
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#bbb' }}>© Slow Morocco · slowmorocco.com</span>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#bbb' }}>Module 132 · The Vertical Migration · February 2026</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export function TheVerticalMigrationContent() {
  return (
    <main style={{ background: '#fff', color: '#0a0a0a' }}>
      <Hero />
      <BigNumbers />
      <AgdalSystem />
      <ElevationSection />
      <RockEvidence />
      <AgdalExplorer />
      <Timeline />
      <CollapseSection />
      <Sources />
    </main>
  );
}
