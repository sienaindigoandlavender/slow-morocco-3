'use client';

import { useState, useEffect, useRef } from 'react';


/* ─── MODULE 131 — THE LAST NOMADS ─── */
/* 
  MASTER THESIS: Nomads are not one people. They are at least 12 separate
  peoples on 4 continents who independently chose the same answer to the
  same question: what do you do when the land won't hold still? You move
  with it. They share no language, no ancestor, no religion. What they share
  is a relationship with terrain that settled people broke 10,000 years ago.
  Now they are disappearing — not because the lifestyle failed, but because
  the borders did. Every nation-state on earth was designed for people who
  stay put. The nomad is the last challenge to that assumption.
  
  Morocco-first: 25,274 nomads remained in the 2014 census. In 1935,
  16% of households lived under tents. The decline is 97% in 80 years.
  
  SOURCES:
  Morocco census: HCP RGPH 2014, 2004; French Protectorate census 1935
  Morocco pastoral: Mahdi 2018, Vidal-González & Mahdi 2019, ScienceDirect 2021
  Minority Rights Group 2022 (Morocco nomad-settler conflict)
  Global: Wikipedia "Nomadic pastoralism", "Nomad", "Bedouin"
  Tuareg: Wikipedia, Britannica, Carnegie Endowment, MRG Niger
  Fulani: Wikipedia "Fula people", National Geographic 2025
  Bedouin: Wikipedia, Britannica, bedawi.com, factsanddetails.com
  Maasai: Wikipedia, Kenya 2019 census
  Sámi: Europeana 2024, Mental Floss 2022, reindeer herding Wikipedia
  Mongolia: World Bank 2024, Xinhua 2025, Dukha Wikipedia
  Mauritania: Chatham House 2019, CIA Factbook
  FAO Pastoralist Knowledge Hub (West/Central Africa)
  Springer: "Where have all the nomads gone?" (Randall 2015)
*/

const PEOPLES = [
  {
    id: 'amazigh',
    name: 'Amazigh / Berber',
    nameAr: 'أمازيغ',
    region: 'Morocco & North Africa',
    terrain: 'Mountains, steppe, pre-Sahara',
    animal: 'Sheep, goats, camels',
    population: '25,274',
    popNote: 'still nomadic (2014 census)',
    peakPop: '~1,000,000',
    peakNote: '16% of households under tents (1935)',
    decline: '97%',
    declineYears: '1935–2014',
    lat: 32.0,
    lng: -5.5,
    countries: ['Morocco'],
    color: '#C75B2A',
    keyFact: 'Morocco\'s 2014 census counted 25,274 nomads — down 63% from 68,540 in just ten years. In 1935, 16% of all households lived under tents.',
    governance: 'Tribal collective rangelands (agdal system)',
    threat: 'Drought, rangeland privatisation, settler conflict in Souss',
    language: 'Tamazight, Tashelhit, Tarifit',
    status: 'Critical decline'
  },
  {
    id: 'tuareg',
    name: 'Tuareg',
    nameAr: 'طوارق',
    region: 'Sahara & Sahel',
    terrain: 'Deep desert, steppe, savanna',
    animal: 'Camels, zebu cattle, goats',
    population: '2,500,000+',
    popNote: 'total ethnic population',
    peakPop: 'Unknown',
    peakNote: 'controlled all trans-Saharan trade',
    decline: 'Severe',
    declineYears: '1960s–present',
    lat: 18.5,
    lng: 5.0,
    countries: ['Niger', 'Mali', 'Algeria', 'Libya', 'Burkina Faso'],
    color: '#2B4C7E',
    keyFact: 'The "Blue People" — indigo-dyed cloth stains their skin. 2.5M+ across 5 countries, but divided by borders drawn in the 1960s that split their territory. Multiple armed rebellions since independence.',
    governance: 'Confederations: Kel Ahaggar, Kel Ajjer, Kel Aïr, Aulliminden',
    threat: 'Borders splitting territory, drought, jihadist conflict, uranium mining',
    language: 'Tamasheq / Tamahaq (Berber branch), Tifinagh script',
    status: 'Fragmented'
  },
  {
    id: 'bedouin',
    name: 'Bedouin',
    nameAr: 'بدو',
    region: 'Arabian Peninsula & North Africa',
    terrain: 'Sand desert, rocky desert, steppe',
    animal: 'Camels, sheep, goats, horses',
    population: '~21,000,000',
    popNote: 'ethnic total (mostly settled)',
    peakPop: '~10% of Arab population',
    peakNote: 'a century ago',
    decline: '90%',
    declineYears: '1920s–present',
    lat: 24.5,
    lng: 43.0,
    countries: ['Saudi Arabia', 'Jordan', 'Iraq', 'Egypt', 'Syria', 'Libya', 'Sudan'],
    color: '#8B6F47',
    keyFact: 'A century ago, Bedouin were ~10% of the total Arab population. Today they account for roughly 1%. Only an estimated 5% of those who identify as Bedouin still practice pastoral nomadism.',
    governance: 'Tribal ʿašāʾir (clan) system, qabāʾil confederations',
    threat: 'Oil economies, government settlement programmes, rangeland nationalisation',
    language: 'Bedouin Arabic dialects, Hassaniya',
    status: 'Mostly settled'
  },
  {
    id: 'fulani',
    name: 'Fulani / Fula / Peul',
    nameAr: 'فولاني',
    region: 'Sahel & West Africa',
    terrain: 'Sahel grasslands, savanna',
    animal: 'Cattle (zebu), sheep, goats',
    population: '25–40M',
    popNote: 'total ethnic population',
    peakPop: '7–10M',
    peakNote: 'still pastoral today',
    decline: 'Moderate',
    declineYears: 'Ongoing',
    lat: 13.5,
    lng: -2.0,
    countries: ['Nigeria', 'Guinea', 'Senegal', 'Mali', 'Niger', 'Cameroon', 'Burkina Faso'],
    color: '#5B8C3E',
    keyFact: 'The world\'s largest nomadic group. 25–40 million people across ~20 countries. A third — 7 to 10 million — are still pastoral. Five Fulani presidents have served in African nations.',
    governance: 'Pulaaku code of conduct, lamidate chieftaincies',
    threat: 'Boko Haram displacement, herder-farmer conflicts, drought, land competition',
    language: 'Fulfulde / Pulaar, Adlam script (invented 1989)',
    status: 'Largest surviving'
  },
  {
    id: 'maasai',
    name: 'Maasai',
    nameAr: 'ماساي',
    region: 'East Africa',
    terrain: 'Savanna, Great Rift Valley',
    animal: 'Cattle, goats, sheep',
    population: '~1,500,000',
    popNote: 'Kenya + Tanzania',
    peakPop: '377,089',
    peakNote: 'Kenya census 1989',
    decline: 'Growing',
    declineYears: 'Population rising, land shrinking',
    lat: -2.5,
    lng: 36.5,
    countries: ['Kenya', 'Tanzania'],
    color: '#C62828',
    keyFact: 'One of the few nomadic peoples whose population is growing — from 377,000 (1989) to 1.19 million (2019) in Kenya alone. But their land is shrinking. National parks were carved from Maasai territory.',
    governance: 'Age-set system, council of elders (enkiguenaa)',
    threat: 'Land privatisation, national park evictions, forced sedentarisation',
    language: 'Maa (Eastern Nilotic)',
    status: 'Growing but squeezed'
  },
  {
    id: 'sami',
    name: 'Sámi',
    nameAr: 'سامي',
    region: 'Arctic Europe',
    terrain: 'Tundra, boreal forest, mountains',
    animal: 'Reindeer',
    population: '~68,000',
    popNote: 'total Sámi population',
    peakPop: '~10%',
    peakNote: 'of Sámi still in reindeer herding',
    decline: 'Severe',
    declineYears: 'Nomadism essentially ended',
    lat: 69.0,
    lng: 25.0,
    countries: ['Norway', 'Sweden', 'Finland', 'Russia'],
    color: '#1565C0',
    keyFact: '~68,000 Sámi across 4 countries. Only ~10% still work in reindeer herding. ~2,936 herders manage 240,000 reindeer in Norway. They locate herds by GPS now but the knowledge is ancient.',
    governance: 'Siida (reindeer herding groups), Sámi Parliaments',
    threat: '30% pasture loss to infrastructure, climate change (ice crusting), mining',
    language: 'Northern Sámi, Lule Sámi, South Sámi + 7 others',
    status: 'Adapted'
  },
  {
    id: 'mongolian',
    name: 'Mongolian herders',
    nameAr: 'منغوليون',
    region: 'Central Asia',
    terrain: 'Steppe, Gobi Desert, mountains',
    animal: 'Horses, sheep, goats, camels, yaks, cattle',
    population: '~900,000',
    popNote: '~30% of Mongolia\'s population',
    peakPop: '~50%+',
    peakNote: 'of population before 1990',
    decline: 'Moderate',
    declineYears: '1990–present',
    lat: 47.0,
    lng: 105.0,
    countries: ['Mongolia'],
    color: '#6A1B9A',
    keyFact: 'Mongolia is the last nation on earth where nomadic herding is a mainstream livelihood — ~30% of the population. They manage 71 million head of livestock. The dzud (severe winter) of 2009–10 killed 8.5 million animals.',
    governance: 'Aimag (provincial), sum (district), bag (sub-district)',
    threat: 'Climate change (+2°C in 70 years), overgrazing, mining, dzud disasters',
    language: 'Mongolian (Khalkha), Cyrillic script',
    status: 'Last mainstream'
  },
  {
    id: 'sahrawi',
    name: 'Sahrawi',
    nameAr: 'صحراوي',
    region: 'Western Sahara',
    terrain: 'Saharan desert',
    animal: 'Camels, goats',
    population: '~600,000',
    popNote: 'total (many in refugee camps)',
    peakPop: 'Unknown',
    peakNote: 'majority nomadic pre-1975',
    decline: 'Near-total',
    declineYears: '1975–present',
    lat: 24.2,
    lng: -13.0,
    countries: ['Western Sahara', 'Algeria (Tindouf camps)'],
    color: '#D84315',
    keyFact: 'Nomadic life ended not by drought but by war. Morocco\'s 1975 annexation and the berm wall split Sahrawi territory. Over 100,000 live in Tindouf refugee camps. The last census was Spanish, in 1970.',
    governance: 'Tribal confederations (Reguibat, Ouled Delim, Tekna)',
    threat: 'Military occupation, refugee displacement, berm wall',
    language: 'Hassaniya Arabic',
    status: 'Displaced'
  },
  {
    id: 'qashqai',
    name: 'Qashqai',
    nameAr: 'قشقایی',
    region: 'Iran',
    terrain: 'Zagros Mountains, Fars Province',
    animal: 'Sheep, goats, horses',
    population: '~1,500,000',
    popNote: 'ethnic total',
    peakPop: 'Unknown',
    peakNote: 'large tribal confederacy',
    decline: 'Severe',
    declineYears: '1960s–present',
    lat: 30.5,
    lng: 52.0,
    countries: ['Iran'],
    color: '#00695C',
    keyFact: 'A Turkic-speaking tribal confederacy in Iran\'s Zagros Mountains. The Shah\'s sedentarisation programme and the 1979 revolution shattered their migration routes. ~4% of Iran is still nomadic.',
    governance: 'Il-khani (paramount chief), tribal confederacy',
    threat: 'Government sedentarisation, pasture nationalisation',
    language: 'Qashqai Turkic',
    status: 'Declining'
  },
  {
    id: 'dukha',
    name: 'Dukha / Tsaatan',
    nameAr: 'دوخا',
    region: 'Northern Mongolia',
    terrain: 'Taiga (boreal forest)',
    animal: 'Reindeer',
    population: '~500',
    popNote: 'total population',
    peakPop: 'Unknown',
    peakNote: 'small group historically',
    decline: 'Critical',
    declineYears: 'Ongoing',
    lat: 51.3,
    lng: 99.5,
    countries: ['Mongolia'],
    color: '#4E342E',
    keyFact: '~500 people. ~100 families. 2,765 reindeer (2024, down 5.7%). The only reindeer herders in Mongolia and possibly the world\'s earliest domesticators of any animal. Their shamanic tradition is the oldest variant among Turkic peoples.',
    governance: 'Family-based, shamanic spiritual authority',
    threat: 'Reindeer disease (brucellosis), tourism pressure, climate change, assimilation',
    language: 'Dukhan (Turkic, endangered)',
    status: 'Endangered'
  },
  {
    id: 'kuchi',
    name: 'Kuchi',
    nameAr: 'کوچی',
    region: 'Afghanistan',
    terrain: 'Highland-lowland seasonal migration',
    animal: 'Sheep, goats, camels',
    population: '~6,000,000',
    popNote: 'estimated (contested)',
    peakPop: 'Unknown',
    peakNote: 'major Pashtun nomad group',
    decline: 'Severe',
    declineYears: '1970s–present',
    lat: 34.0,
    lng: 66.0,
    countries: ['Afghanistan', 'Pakistan'],
    color: '#455A64',
    keyFact: 'Pashtun nomads representing ~6 million of Afghanistan\'s population. Decades of war, Soviet occupation, Taliban rule, and US invasion have decimated seasonal migration routes. Many are now internally displaced.',
    governance: 'Pashtun tribal structure (Pashtunwali code)',
    threat: 'War, IDP displacement, land disputes with settled populations',
    language: 'Pashto',
    status: 'War-disrupted'
  },
  {
    id: 'rabari',
    name: 'Rabari / Raika',
    nameAr: 'رباري',
    region: 'Western India',
    terrain: 'Thar Desert, Gujarat, Rajasthan',
    animal: 'Camels, cattle, sheep, goats',
    population: '~1,000,000',
    popNote: 'estimated total',
    peakPop: 'Unknown',
    peakNote: 'widespread across western India',
    decline: 'Moderate',
    declineYears: 'Ongoing',
    lat: 24.5,
    lng: 71.0,
    countries: ['India'],
    color: '#E65100',
    keyFact: 'Hindu pastoralists of western India. By legend, Shiva himself created the first camel and gave it to the Rabari to tend. They are now caught between wildlife reserves that exclude them and industrial development that fragments their routes.',
    governance: 'Caste-based panchayat, nata marriages',
    threat: 'Wildlife reserves, industrialisation, route fragmentation',
    language: 'Rabari (Indo-Aryan), Gujarati, Hindi',
    status: 'Pressured'
  }
];

const MOROCCO_TIMELINE = [
  { year: '2000 BCE', event: 'Rock engravings at Oukaïmeden and Yagour attest to pastoral life in the High Atlas', type: 'ancient' },
  { year: '7th c. CE', event: 'Arab conquest brings Bedouin pastoral traditions to Morocco', type: 'ancient' },
  { year: '11th c.', event: 'Banu Hilal migration — nomadic Arab tribes flood the Maghreb, agriculture retreats', type: 'ancient' },
  { year: '1935', event: 'French Protectorate census: 16% of households live under tents', type: 'colonial' },
  { year: '1956', event: 'Independence. Nomadism seen as "backward" by modernising state', type: 'modern' },
  { year: '1960s', event: 'First sedentarisation programmes. Rangeland privatisation begins', type: 'modern' },
  { year: '1970s', event: 'Sahel drought decimates herds across North and West Africa', type: 'crisis' },
  { year: '1984–85', event: 'Second great drought. Thousands of Tuareg abandon pastoralism', type: 'crisis' },
  { year: '2004', event: 'Morocco census: 68,540 nomads remaining (10,910 households)', type: 'data' },
  { year: '2014', event: 'Morocco census: 25,274 nomads (4,044 households) — 63% drop in 10 years', type: 'data' },
  { year: '2018', event: 'Draft decree on pastoral areas — Souss conflict between nomads and settlers', type: 'modern' },
  { year: '2026', event: 'Estimated nomadic population: fewer than 15,000', type: 'projected' },
];

const DECLINE_DATA = [
  { label: 'Morocco', from: '16% (1935)', to: '0.07% (2014)', dropPct: 99.6 },
  { label: 'Mauritania', from: '85% (1960)', to: '~15% (2020s)', dropPct: 82 },
  { label: 'Bedouin (Arab world)', from: '10% (1920s)', to: '~1% (2020s)', dropPct: 90 },
  { label: 'Iran', from: '~25% (1960s)', to: '~4% (2020s)', dropPct: 84 },
  { label: 'Saudi Arabia', from: '~40% (1950s)', to: '<3% (2020s)', dropPct: 93 },
  { label: 'Mongolia', from: '~50% (1990)', to: '~30% (2024)', dropPct: 40 },
];

const CONVERGENT = [
  { pattern: 'Collective rangelands, private herds', detail: 'Every nomadic people on earth separates land ownership (communal) from animal ownership (family). The Amazigh agdal, the Mongolian nutag, the Maasai enkutoto, the Bedouin dirah — same architecture, no contact.' },
  { pattern: 'Seasonal rotation', detail: 'Vertical (mountain) or horizontal (desert-to-steppe). The Sámi follow reindeer from coast to mountain. The Qashqai cross the Zagros. Moroccan transhumants move between agdal pastures. The land dictates the calendar.' },
  { pattern: 'Wealth in animals, not land', detail: 'A Maasai proverb: "God gave all cattle to the Maasai." A Bedouin\'s status is his camel herd. A Mongolian\'s is his horses. The nomad\'s bank account walks beside him.' },
  { pattern: 'Hospitality as law', detail: 'Pulaaku (Fulani), Pashtunwali (Kuchi), Bedouin ḍiyāfa — all mandate feeding strangers. In terrain where the next water is a day away, refusing hospitality is murder.' },
  { pattern: 'The state as enemy', detail: 'French colonial officers called nomads "backward." Morocco\'s independence government saw them as ungovernable. Saudi Arabia settled them for oil. Israel confined Negev Bedouin to 10% of their land. Every modern state treats mobility as a problem to solve.' },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
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
      {/* Scattered dots representing nomad locations */}
      <div style={{ position: 'absolute', inset: 0, opacity: loaded ? 0.12 : 0, transition: 'opacity 2s ease' }}>
        {PEOPLES.map((p, i) => (
          <div key={p.id} style={{
            position: 'absolute',
            width: 6, height: 6, borderRadius: '50%',
            background: p.color,
            top: `${20 + Math.sin(i * 1.7) * 30}%`,
            left: `${10 + (i / PEOPLES.length) * 80}%`,
            animation: `pulse 3s ease-in-out ${i * 0.3}s infinite alternate`,
          }} />
        ))}
      </div>
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 32, opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}>
          Module 131 · Slow Morocco
        </p>
        <h1 style={{
          fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(48px, 10vw, 120px)',
          fontStyle: 'italic', fontWeight: 400, color: '#fff', lineHeight: 1.0,
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s', marginBottom: 24,
        }}>
          The Last Nomads
        </h1>
        <p style={{
          fontFamily: '"IBM Plex Mono", monospace', fontSize: 'clamp(13px, 1.5vw, 16px)',
          color: '#999', maxWidth: 680, margin: '0 auto', lineHeight: 1.7,
          opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1s'
        }}>
          12 peoples. 4 continents. One answer to an ancient question.<br />
          30–40 million humans still move with the seasons.<br />
          They are disappearing — not because the lifestyle failed,<br />
          but because every border on earth was drawn for people who stay put.
        </p>
      </div>
      <div style={{ position: 'absolute', bottom: 40, opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1.5s' }}>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, #555, transparent)', margin: '0 auto', animation: 'scroll-hint 2s ease-in-out infinite' }} />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&display=swap');
        @keyframes pulse { 0% { opacity: 0.3; transform: scale(1); } 100% { opacity: 1; transform: scale(1.8); } }
        @keyframes scroll-hint { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }
      `}</style>
    </section>
  );
}

/* ─── BIG NUMBERS ─── */
function BigNumbers() {
  const numbers = [
    { value: '30–40M', label: 'Nomadic pastoralists worldwide', sub: 'estimated, probably undercounted' },
    { value: '25,274', label: 'Nomads in Morocco', sub: '2014 census — down from 68,540 in 2004' },
    { value: '12', label: 'Distinct nomadic peoples profiled', sub: '4 continents, no shared ancestor' },
    { value: '97%', label: 'Decline in Morocco\'s nomads', sub: '16% of households (1935) → 0.07% (2014)' },
    { value: '85→15%', label: 'Mauritania\'s nomad collapse', sub: '85% nomadic at independence (1960)' },
    { value: '~500', label: 'Dukha reindeer herders remain', sub: 'World\'s oldest domesticators — 100 families' },
  ];
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#ffffff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 48 }}>
            The Numbers
          </p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px 40px' }}>
          {numbers.map((n, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div>
                <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(36px, 5vw, 56px)', color: '#0a0a0a', display: 'block', lineHeight: 1.1 }}>
                  {n.value}
                </span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, fontWeight: 500, color: '#0a0a0a', display: 'block', marginTop: 8 }}>
                  {n.label}
                </span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#888', display: 'block', marginTop: 4 }}>
                  {n.sub}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PEOPLES EXPLORER ─── */
function PeoplesExplorer() {
  const [selected, setSelected] = useState<string>('amazigh');
  const person = PEOPLES.find(p => p.id === selected)!;

  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#fafafa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
            The Peoples
          </p>
          <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', color: '#0a0a0a', marginBottom: 40 }}>
            Twelve answers to the same question
          </h2>
        </FadeIn>

        {/* Selector pills */}
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
            {PEOPLES.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)} style={{
                padding: '8px 16px', borderRadius: 0, border: '1px solid',
                borderColor: selected === p.id ? p.color : '#ddd',
                background: selected === p.id ? p.color : 'transparent',
                color: selected === p.id ? '#fff' : '#666',
                fontFamily: '"IBM Plex Mono", monospace', fontSize: 12,
                cursor: 'pointer', transition: 'all 0.3s ease',
                letterSpacing: '0.05em',
              }}>
                {p.name}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Detail card */}
        <div key={person.id} style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40,
          animation: 'fadeUp 0.5s ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
              <h3 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 32, fontStyle: 'italic', color: '#0a0a0a' }}>
                {person.name}
              </h3>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 18, color: '#888', direction: 'rtl' }}>
                {person.nameAr}
              </span>
            </div>
            <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.8, marginBottom: 24 }}>
              {person.keyFact}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px' }}>
              {[
                ['Region', person.region],
                ['Terrain', person.terrain],
                ['Animals', person.animal],
                ['Language', person.language],
                ['Countries', person.countries.join(', ')],
                ['Governance', person.governance],
              ].map(([label, val]) => (
                <div key={label as string}>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block' }}>{label}</span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, color: '#0a0a0a', display: 'block', marginTop: 4 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #eee', padding: 32 }}>
            <div style={{ marginBottom: 32 }}>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: 8 }}>Population</span>
              <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 36, fontStyle: 'italic', color: person.color, display: 'block' }}>{person.population}</span>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#888' }}>{person.popNote}</span>
            </div>
            <div style={{ marginBottom: 32 }}>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: 8 }}>Decline</span>
              <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 28, fontStyle: 'italic', color: '#0a0a0a', display: 'block' }}>{person.decline}</span>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#888' }}>{person.declineYears}</span>
            </div>
            <div style={{ marginBottom: 32 }}>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: 8 }}>Status</span>
              <span style={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, fontWeight: 500,
                padding: '4px 12px', display: 'inline-block',
                background: person.color + '18', color: person.color,
              }}>{person.status}</span>
            </div>
            <div>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: 8 }}>Primary threat</span>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, color: '#0a0a0a', lineHeight: 1.6 }}>{person.threat}</span>
            </div>
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    </section>
  );
}

/* ─── MOROCCO DEEP DIVE ─── */
function MoroccoSection() {
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#ffffff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C75B2A', marginBottom: 16 }}>
            Morocco
          </p>
          <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', color: '#0a0a0a', marginBottom: 24 }}>
            The tent that emptied
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.9, marginBottom: 40 }}>
            In 1935, the French Protectorate counted its subjects and found that 16% of all Moroccan households lived under tents. Nomadic pastoralism was not marginal — it was how a significant minority of the country functioned. Herds were private property. Rangelands were collective property of the tribe. The <span>Berber</span> verb <em>gdel</em> — "to graze cattle in a meadow" — gave its name to the agdal system: high mountain pastures in the Atlas opened and closed by collective agreement. Rock engravings at <span>Oukaïmeden</span> date this practice to 2000 BCE.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.9, marginBottom: 40 }}>
            Then the numbers began to fall. By 2004, Morocco's census found 68,540 nomads — still meaningful, but a fraction of what had existed. By 2014: 25,274 people in 4,044 households. A 63% drop in a single decade. The causes stack: drought, rangeland privatisation, government modernisation programmes, and the quiet violence of borders that were never designed for people who move. In the Souss region, nomads moving north in search of water now collide with settled Amazigh farming communities. The clashes have turned deadly.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#0a0a0a', lineHeight: 1.9, marginBottom: 48 }}>
            Morocco's nomads are not Tuareg (too far south) and not Bedouin (that's an Arab designation). They are Amazigh — the same people who built the agdal, who carved the rock at Yagour, who speak Tamazight and Tashelhit. The pastoralists of the Oriental steppe, the pre-Saharan camel breeders, the sheep herders of the Middle Atlas — these are the last inheritors of a practice older than any city in Morocco. The nomads persist in the East, on the steppes of the Oriental region, and in the pre-Saharan and Saharan regions of the South. But every census finds fewer of them.
          </p>
        </FadeIn>

        {/* Morocco timeline */}
        <FadeIn delay={0.25}>
          <div style={{ borderLeft: '2px solid #C75B2A', paddingLeft: 24, marginLeft: 12 }}>
            {MOROCCO_TIMELINE.map((item, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div style={{ marginBottom: 24, position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: -31, top: 6, width: 10, height: 10,
                    borderRadius: '50%',
                    background: item.type === 'crisis' ? '#C62828' : item.type === 'data' ? '#C75B2A' : item.type === 'projected' ? '#888' : '#ddd',
                    border: '2px solid #fff',
                  }} />
                  <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 18, color: '#C75B2A', display: 'block', marginBottom: 4 }}>
                    {item.year}
                  </span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, color: '#0a0a0a', lineHeight: 1.6 }}>
                    {item.event}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* Morocco breeds of nomadism */}
        <FadeIn delay={0.3}>
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {[
              { name: 'High Atlas Transhumants', detail: 'Seasonal movement between agdal pastures — northern and southern slopes. Sheep and goats. The oldest documented form: rock engravings at Oukaïmeden, 2000 BCE.' },
              { name: 'Middle Atlas Beni M\'guild', detail: 'Once fully nomadic (khaima tent-dwellers). French colonisation forced shift to short-distance transhumance. Still sheepherding in the Timahdite area.' },
              { name: 'Oriental Steppe Herders', detail: 'Camel and sheep breeders on the eastern steppes. The last zone where long-range nomadism persists. Erratic rainfall drives movement.' },
              { name: 'Pre-Saharan Camel Breeders', detail: 'Guerzni and Khouari breeds. Families define themselves as nomads the moment they pitch a tent, even if mobility patterns fluctuate year to year.' },
            ].map((type, i) => (
              <div key={i} style={{ background: '#fafafa', padding: 24 }}>
                <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 18, color: '#C75B2A', display: 'block', marginBottom: 8 }}>{type.name}</span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#0a0a0a', lineHeight: 1.7 }}>{type.detail}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── GLOBAL DECLINE BARS ─── */
function DeclineSection() {
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#0a0a0a' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 16 }}>
            The Disappearance
          </p>
          <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', color: '#fff', marginBottom: 48 }}>
            Every country tells the same story
          </h2>
        </FadeIn>
        {DECLINE_DATA.map((d, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#fff', fontWeight: 500 }}>{d.label}</span>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#666' }}>{d.from}</span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#666' }}>→</span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#C62828' }}>{d.to}</span>
                </div>
              </div>
              <div style={{ width: '100%', height: 4, background: '#1a1a1a', position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  width: `${d.dropPct}%`, background: '#C62828',
                  transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1)',
                }} />
                <div style={{
                  position: 'absolute', right: 0, top: 0, height: '100%',
                  width: `${100 - d.dropPct}%`, background: '#333',
                }} />
              </div>
              <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 24, color: '#C62828', display: 'block', marginTop: 4 }}>
                −{d.dropPct}%
              </span>
            </div>
          </FadeIn>
        ))}
        <FadeIn delay={0.7}>
          <div style={{ marginTop: 48, borderTop: '1px solid #222', paddingTop: 32 }}>
            <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#999', lineHeight: 1.8, maxWidth: 700 }}>
              The exception is Mongolia — where nomadic herding remains a mainstream livelihood, not a relic. ~30% of Mongolia's population still herds. But even there, the direction is one-way. Climate change has raised temperatures 2°C in 70 years. The dzud of 2009–10 killed 8.5 million animals in a single winter. The young leave for Ulaanbaatar. The steppe empties.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── CONVERGENT PATTERNS ─── */
function ConvergenceSection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#ffffff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
            Convergent Evolution
          </p>
          <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', color: '#0a0a0a', marginBottom: 16 }}>
            Five patterns. No shared origin.
          </h2>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#555', lineHeight: 1.8, marginBottom: 48, maxWidth: 680 }}>
            The Amazigh of Morocco never met the Maasai of Kenya. The Sámi of Norway never traded with the Qashqai of Iran. Yet every nomadic people on earth independently invented the same social architecture. The terrain is the teacher.
          </p>
        </FadeIn>
        {CONVERGENT.map((c, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                borderTop: '1px solid #eee', padding: '24px 0', cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 20, color: '#C75B2A' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 15, fontWeight: 500, color: '#0a0a0a' }}>
                    {c.pattern}
                  </span>
                </div>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 18, color: '#999', transform: expanded === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}>
                  +
                </span>
              </div>
              <div style={{
                maxHeight: expanded === i ? 200 : 0, overflow: 'hidden',
                transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
              }}>
                <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, color: '#555', lineHeight: 1.8, paddingTop: 16, paddingLeft: 44 }}>
                  {c.detail}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── THE QUESTION ─── */
function TheQuestion() {
  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) 24px', background: '#0a0a0a', textAlign: 'center' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 32 }}>
            The Thesis
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <blockquote style={{
            fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(24px, 4vw, 40px)',
            fontStyle: 'italic', color: '#fff', lineHeight: 1.5, margin: '0 0 40px 0',
            padding: 0, border: 'none',
          }}>
            Nomads are not a curiosity. They are an alternative answer to the question of how humans should relate to land. The settled world chose ownership. The nomad chose movement. For 10,000 years, both answers coexisted. Now the settled answer is eliminating the other — not through argument, but through borders, census forms, and the quiet assumption that staying put is normal.
          </blockquote>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 14, color: '#999', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            The question is not whether nomads will survive. Some will — the Fulani are 40 million strong, Mongolia still herds. The question is whether the knowledge survives: how to read land that doesn't belong to you, how to leave a place better than you found it, how to carry your wealth on four legs and your home on your back. That knowledge took 10,000 years to build. It is leaving the earth in a single century.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── MAP SECTION ─── */
function MapSection() {
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: '#fafafa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
            Geography
          </p>
          <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', color: '#0a0a0a', marginBottom: 40 }}>
            The nomadic belt
          </h2>
        </FadeIn>

        {/* Simple SVG world map with dots */}
        <FadeIn delay={0.1}>
          <div style={{ width: '100%', background: '#fff', border: '1px solid #eee', padding: '32px 16px', overflow: 'hidden' }}>
            <svg viewBox="0 0 1000 500" style={{ width: '100%', height: 'auto' }}>
              {/* Simplified continent outlines */}
              <rect x="0" y="0" width="1000" height="500" fill="#fff" />
              
              {/* Grid lines */}
              {[100,200,300,400].map(y => (
                <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="#f5f5f5" strokeWidth="0.5" />
              ))}
              {[200,400,600,800].map(x => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" stroke="#f5f5f5" strokeWidth="0.5" />
              ))}

              {/* Equator */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#eee" strokeWidth="1" strokeDasharray="4 4" />
              <text x="10" y="247" fill="#ccc" fontSize="9" fontFamily="IBM Plex Mono, monospace">Equator</text>

              {/* Tropic of Cancer */}
              <line x1="0" y1="200" x2="1000" y2="200" stroke="#f0f0f0" strokeWidth="0.5" strokeDasharray="2 4" />

              {/* Nomadic belt band */}
              <rect x="0" y="130" width="1000" height="160" fill="#C75B2A" opacity="0.04" />

              {/* People dots */}
              {PEOPLES.map((p, i) => {
                // Simple Mercator-ish projection
                const x = ((p.lng + 180) / 360) * 1000;
                const y = ((90 - p.lat) / 180) * 500;
                const r = p.id === 'dukha' ? 5 : p.id === 'fulani' ? 14 : p.id === 'bedouin' ? 12 : p.id === 'mongolian' ? 10 : 8;
                return (
                  <g key={p.id}>
                    <circle cx={x} cy={y} r={r} fill={p.color} opacity={0.2} />
                    <circle cx={x} cy={y} r={r * 0.5} fill={p.color} opacity={0.6} />
                    <circle cx={x} cy={y} r={2.5} fill={p.color} />
                    <text
                      x={x} y={y - r - 6}
                      textAnchor="middle" fill={p.color} fontSize="8"
                      fontFamily="IBM Plex Mono, monospace" fontWeight="500"
                    >
                      {p.name.split(' /')[0].split(' (')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#999', textAlign: 'center', marginTop: 16 }}>
              Circle size approximates relative population. The nomadic belt follows the arid band between 15°N–45°N latitude — the terrain that won't hold still.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── SOURCES & FOOTER ─── */
function Sources() {
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 80px) 24px', background: '#ffffff', borderTop: '1px solid #eee' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 24 }}>
            Sources & Attribution
          </p>
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#888', lineHeight: 2, columnCount: 2, columnGap: 40 }}>
            <p><strong style={{ color: '#555' }}>Morocco:</strong> HCP RGPH 2014 & 2004; French Protectorate Census 1935; Mahdi 2018; Vidal-González & Mahdi 2019; Minority Rights Group 2022; ScienceDirect (Alary et al. 2021).</p>
            <p><strong style={{ color: '#555' }}>Tuareg:</strong> Britannica; Carnegie Endowment 2022; MRG Niger; Wikipedia.</p>
            <p><strong style={{ color: '#555' }}>Bedouin:</strong> Britannica; bedawi.com; Facts and Details; Wikipedia.</p>
            <p><strong style={{ color: '#555' }}>Fulani:</strong> National Geographic 2025; Wikipedia; ScienceDirect (Fortes et al. 2025).</p>
            <p><strong style={{ color: '#555' }}>Maasai:</strong> Kenya 2019 Census; Wikipedia; Maasai Wilderness Conservation Trust.</p>
            <p><strong style={{ color: '#555' }}>Sámi:</strong> Europeana 2024; Mental Floss 2022; Reindeer Herding Wikipedia; Sámi herding & resilience paper 2025.</p>
            <p><strong style={{ color: '#555' }}>Mongolia:</strong> World Bank 2024; Xinhua 2025; Dukha people Wikipedia.</p>
            <p><strong style={{ color: '#555' }}>Global:</strong> FAO Pastoralist Knowledge Hub; Springer (Randall 2015); Wikipedia "Nomadic pastoralism", "Nomad".</p>
          </div>
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#bbb' }}>
              © Slow Morocco · slowmorocco.com
            </span>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#bbb' }}>
              Module 131 · The Last Nomads · February 2026
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export function TheLastNomadsContent() {
  return (
    <main style={{ background: '#fff', color: '#0a0a0a' }}>
      <Hero />
      <BigNumbers />
      <MapSection />
      <PeoplesExplorer />
      <MoroccoSection />
      <DeclineSection />
      <ConvergenceSection />
      <TheQuestion />
      <Sources />
    </main>
  );
}
