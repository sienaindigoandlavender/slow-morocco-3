"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const C = {
  bg: "#fafafa", white: "#ffffff", black: "#0a0a0a", ink: "#1a1a1a",
  mid: "#525252", muted: "#737373", light: "#a3a3a3", border: "#e5e5e5",
  ocean: "#0F4C75", oceanLight: "#DBE9F4", oceanDark: "#0A2540",
  current: "#1B98E0", currentLight: "#E0F0FF",
  morocco: "#D4A24E", portugal: "#DC2626", senegal: "#2D6A4F",
  warm: "#E07B39", cold: "#3B82F6",
  dark: "#0a0c14", darkMid: "#101828", darkEnd: "#060810",
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const UPWELLING_ZONES = [
  { name: "Iberian", range: "35\u00b0N\u201343\u00b0N", season: "Seasonal (Jun\u2013Sep)", note: "Portugal + Galicia. Weakest but ecologically critical. Sardine spawning ground.", color: C.portugal },
  { name: "Moroccan", range: "21\u00b0N\u201335\u00b0N", season: "Permanent (year-round)", note: "Strongest sustained upwelling. Cape Ghir filament extends 200km offshore.", color: C.morocco },
  { name: "Mauritanian-Senegalese", range: "12\u00b0N\u201321\u00b0N", season: "Seasonal (Nov\u2013May)", note: "Winter/spring. Shifts with the Intertropical Convergence Zone.", color: C.senegal },
];

const FOUR_SYSTEMS = [
  { name: "Canary", ocean: "North Atlantic", extent: "Portugal \u2192 Senegal", fishCatch: "~4.5M tonnes/year", species: "Sardine, sardinella, anchovy, octopus" },
  { name: "Benguela", ocean: "South Atlantic", extent: "Angola \u2192 South Africa", fishCatch: "~2.5M tonnes/year", species: "Sardine, anchovy, hake" },
  { name: "Humboldt", ocean: "South Pacific", extent: "Chile \u2192 Peru", fishCatch: "~8M tonnes/year", species: "Anchoveta, jack mackerel, squid" },
  { name: "California", ocean: "North Pacific", extent: "Baja \u2192 Oregon", fishCatch: "~1.5M tonnes/year", species: "Sardine, anchovy, squid" },
];

const CURRENT_PATH = [
  { lat: 43.0, lng: -9.5, label: "Galicia", detail: "43\u00b0N. Where the current begins. Rias Baixas \u2014 mussel rafts and sardine fleets." },
  { lat: 40.0, lng: -9.8, label: "Peniche", detail: "Portugal\u2019s sardine capital. Stocks crashed from 106,000 tonnes (2006) to 22,000 (2016)." },
  { lat: 37.0, lng: -8.5, label: "Algarve", detail: "Portim\u00e3o canning heritage. Santos Populares: 35 million sardines consumed in June festivals." },
  { lat: 35.8, lng: -6.0, label: "Tangier", detail: "Northern Moroccan stock. Landings crashing: 965K (2022) \u2192 525K (2024) \u2192 419K tonnes (2025). Frozen exports banned Feb 2026." },
  { lat: 32.3, lng: -9.3, label: "Safi", detail: "Morocco\u2019s sardine canning capital. 51,000+ tonnes landed at port (2024)." },
  { lat: 30.4, lng: -9.6, label: "Agadir", detail: "Major processing hub. Dozens of canning factories. Most sardine exports originate here." },
  { lat: 28.1, lng: -12.1, label: "Canary Islands", detail: "Archipelago partially blocks current flow, creating eddies. Spanish fleets operate here." },
  { lat: 25.0, lng: -15.0, label: "Dakhla", detail: "Western Sahara. Rising fishery + kite-surfing destination. Same wind system drives both." },
  { lat: 21.0, lng: -17.2, label: "Cap Blanc", detail: "21\u00b0N. Where the current detaches from coast and turns west toward Cape Verde." },
  { lat: 18.0, lng: -16.5, label: "Nouakchott", detail: "Mauritania. Sardinella processing: 70,000 tonnes in 2013 from 10,000 in 2009." },
  { lat: 14.7, lng: -17.4, label: "Dakar", detail: "Senegal. 600,000+ fishworkers. Sardinella = primary protein source for millions." },
  { lat: 12.0, lng: -16.5, label: "Gambia", detail: "Southern limit of upwelling system (~10\u00b0N). Seasonal upwelling only." },
];

const PORTS = [
  { name: "Safi", country: "Morocco", lat: 32.30, lng: -9.24, tonnes: "51,113", type: "canning" },
  { name: "Agadir", country: "Morocco", lat: 30.43, lng: -9.60, tonnes: "85,000+", type: "canning" },
  { name: "Tan-Tan", country: "Morocco", lat: 28.44, lng: -11.10, tonnes: "80,000+", type: "processing" },
  { name: "Laayoune", country: "Morocco", lat: 27.15, lng: -13.20, tonnes: "60,000+", type: "canning" },
  { name: "Essaouira", country: "Morocco", lat: 31.51, lng: -9.77, tonnes: "15,000+", type: "artisanal" },
  { name: "Peniche", country: "Portugal", lat: 39.36, lng: -9.37, tonnes: "~5,000", type: "traditional" },
  { name: "Matosinhos", country: "Portugal", lat: 41.18, lng: -8.69, tonnes: "~3,000", type: "traditional" },
  { name: "Nouadhibou", country: "Mauritania", lat: 20.93, lng: -17.04, tonnes: "200,000+", type: "industrial" },
  { name: "Dakar", country: "Senegal", lat: 14.69, lng: -17.44, tonnes: "100,000+", type: "artisanal" },
];

const STOCK_DATA = [
  { year: "2006", portugal: 106, morocco: 900 },
  { year: "2010", portugal: 60, morocco: 850 },
  { year: "2014", portugal: 30, morocco: 750 },
  { year: "2016", portugal: 22, morocco: 965 },
  { year: "2018", portugal: 15, morocco: 900 },
  { year: "2020", portugal: 20, morocco: 800 },
  { year: "2022", portugal: 28, morocco: 965 },
  { year: "2024", portugal: 30, morocco: 525 },
  { year: "2025", portugal: 30, morocco: 419 },
];

const BIBLIOGRAPHY = [
  'NOAA / Springer, "The Canary/Iberia Current Upwelling System" in Upwelling Systems of the World (2016). 43\u00b0N to 10\u00b0N.',
  'Morocco World News, "Morocco, World\u2019s Leading Exporter of Canned Sardines" (Jan 2023). 152,137 tonnes, MAD 5.9B.',
  'SeafoodSource, "Morocco indefinitely bans export of frozen sardines" (Jan 2026). Landings 965K \u2192 525K tonnes (2022\u20132024).',
  'Telquel.ma, "Why Morocco is suspending the export of frozen sardines" (Feb 2026). 2025 landings: 419,474 tonnes (\u221223% YoY).',
  'The Grocer / Assosia, "Tinned sardines shortages loom as Morocco supply non-existent" (Jun 2025). UK supply disruption.',
  "Morocco Competition Council, formal investigation into sardine price-fixing (May 2025).",
  "ICES Advisory Report: Iberian sardine biomass 106K (2006) to 22K (2016).",
  'Nature Scientific Reports, "Climate change impacts on small pelagic fish, NW Africa" (2024). SST +0.3\u20130.4\u00b0C/decade.',
  'ScienceDirect, "Fisheries of the CCLME" \u2014 1.1M km\u00b2, Morocco to Guinea-Bissau.',
  'Earth Journalism Network, "Portugal Faces Collapse of Sardine Fishing Industry" (Jul 2022).',
  'National Geographic Portugal, "Can Portuguese sardines make a comeback?" (Sep 2022). 2019 quota: ~10,000 tonnes.',
];

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(target: number, duration = 2000) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return { ref, value };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function SardineCurrentContent() {
  const hero = useInView(0.1);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const stockSection = useInView(0.15);
  const fourSystems = useInView(0.15);
  const upwellingSection = useInView(0.15);

  const c5000 = useCounter(5000, 2200);
  const c150 = useCounter(150, 1800);
  const c8 = useCounter(8, 1800);
  const c20 = useCounter(20, 1800);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return;
    import("mapbox-gl").then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css";
        document.head.appendChild(link);
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN;
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-14, 28],
        zoom: 3.8,
        minZoom: 2.5,
        maxZoom: 10,
        attributionControl: false,
      });
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), "bottom-left");
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), "top-right");

      map.on("load", () => {
        const coords = CURRENT_PATH.map((p) => [p.lng, p.lat] as [number, number]);
        map.addSource("current-path", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } },
        });
        map.addLayer({ id: "current-line-glow", type: "line", source: "current-path", paint: { "line-color": C.current, "line-width": 6, "line-opacity": 0.25, "line-blur": 4 } });
        map.addLayer({ id: "current-line", type: "line", source: "current-path", paint: { "line-color": C.current, "line-width": 2.5, "line-dasharray": [3, 2], "line-opacity": 0.8 } });

        CURRENT_PATH.forEach((p) => {
          const el = document.createElement("div");
          el.style.cssText = "width:8px;height:8px;border-radius:50%;background:" + C.current + ";border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;";
          el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.8)"; });
          el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });
          const popup = new mapboxgl.default.Popup({ offset: 10, closeButton: false, maxWidth: "260px" })
            .setHTML(
              '<div style="font-family:IBM Plex Mono,monospace;padding:2px 0"><p style="font-weight:700;font-size:12px;color:#E0F0FF;margin:0 0 4px">' +
              p.label +
              '</p><p style="font-size:11px;color:#ccc;line-height:1.5;margin:0">' +
              p.detail +
              "</p></div>"
            );
          new mapboxgl.default.Marker({ element: el }).setLngLat([p.lng, p.lat]).setPopup(popup).addTo(map);
        });

        PORTS.forEach((p) => {
          const countryColor = p.country === "Morocco" ? C.morocco : p.country === "Portugal" ? C.portugal : p.country === "Mauritania" ? C.warm : C.senegal;
          const el = document.createElement("div");
          el.style.cssText = "width:6px;height:6px;border-radius:1px;background:" + countryColor + ";border:1.5px solid rgba(255,255,255,0.6);cursor:pointer;transform:rotate(45deg);transition:transform 0.2s;";
          el.addEventListener("mouseenter", () => { el.style.transform = "rotate(45deg) scale(2)"; });
          el.addEventListener("mouseleave", () => { el.style.transform = "rotate(45deg) scale(1)"; });
          const popup = new mapboxgl.default.Popup({ offset: 8, closeButton: false, maxWidth: "250px" })
            .setHTML(
              '<div style="font-family:IBM Plex Mono,monospace;padding:2px 0"><p style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:' +
              countryColor + ';margin:0 0 2px">' + p.country +
              '</p><p style="font-weight:700;font-size:12px;color:#fff;margin:0 0 4px">' + p.name +
              '</p><p style="font-size:11px;color:#ccc;margin:0">' + p.tonnes + " tonnes &middot; " + p.type +
              "</p></div>"
            );
          new mapboxgl.default.Marker({ element: el }).setLngLat([p.lng, p.lat]).setPopup(popup).addTo(map);
        });

        setMapReady(true);
      });
      mapRef.current = map;
    });
    return () => { if (mapRef.current) mapRef.current.remove(); mapRef.current = null; };
  }, []);

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: "var(--font-plex-mono), 'IBM Plex Mono', monospace" }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(80px, 15vh, 160px) clamp(24px, 5vw, 64px) clamp(40px, 8vh, 80px)" }}>
        <div ref={hero.ref} style={{ maxWidth: 900, opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(30px)", transition: "all 1.2s cubic-bezier(0.23, 1, 0.32, 1)" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, marginBottom: 16, fontWeight: 500 }}>Ocean Systems</p>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 400, fontStyle: "italic", lineHeight: 0.95, letterSpacing: "-0.02em", color: C.black, marginBottom: 32 }}>The Sardine Current</h1>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 26px)", fontStyle: "italic", lineHeight: 1.6, color: C.mid, maxWidth: 640 }}>
            From Galicia to Senegal, one river of cold water<br />feeds eight nations. 5,000 kilometres of upwelling.<br />Morocco cans half the world{"\u2019"}s sardines.<br />Portugal{"\u2019"}s stocks collapsed 80% in a decade.<br /><br />Same current. Same fish. Two very different stories.
          </p>
        </div>
      </section>

      {/* ── KEY NUMBERS ── */}
      <section style={{ background: C.dark, padding: "clamp(60px, 10vh, 100px) 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 48, textAlign: "center" }}>
          <div ref={c5000.ref}><div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 400, color: C.current, lineHeight: 1 }}>{c5000.value.toLocaleString()}<span style={{ fontSize: "0.5em" }}>km</span></div><div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 8 }}>Galicia to Guinea-Bissau</div></div>
          <div ref={c150.ref}><div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 400, color: C.morocco, lineHeight: 1 }}>{c150.value}K<span style={{ fontSize: "0.5em" }}>t</span></div><div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 8 }}>Morocco canned exports/yr</div></div>
          <div ref={c8.ref}><div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 400, color: C.senegal, lineHeight: 1 }}>{c8.value}</div><div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 8 }}>nations share one current</div></div>
          <div ref={c20.ref}><div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 400, color: C.warm, lineHeight: 1 }}>{c20.value}%</div><div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 8 }}>of global catch from 5% ocean</div></div>
        </div>
      </section>

      {/* ── INTRO PROSE ── */}
      <section style={{ padding: "80px 24px", maxWidth: 680, margin: "0 auto" }}>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink }}>The Canary Current is one of four major eastern boundary upwelling systems on earth. It begins at 43{"\u00b0"}N off the coast of Galicia and Portugal, flows southward along Morocco, Western Sahara, and Mauritania, and dissipates near Senegal and Guinea-Bissau at roughly 10{"\u00b0"}N. Scientists formally call it the Canary/Iberia Current Upwelling System. It covers 1.1 million square kilometres.</p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink, marginTop: 24 }}>The mechanism is elegant. Trade winds blow parallel to the coast. The Coriolis effect pushes surface water offshore. Cold, nutrient-rich water from the deep rises to replace it. Phytoplankton bloom in the sunlit nutrients. Sardines eat the plankton. Everything above eats the sardines. The entire food chain hangs on wind direction and water temperature.</p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink, marginTop: 24 }}>These upwelling zones occupy 5% of the ocean but produce over 20% of the world{"\u2019"}s fish catch. The Canary Current alone sustains the fishing economies of Portugal, Spain, Morocco, Western Sahara, Mauritania, Senegal, the Gambia, and Guinea-Bissau. The same cold water that cools Essaouira{"\u2019"}s summer air feeds Dakar{"\u2019"}s protein supply.</p>
      </section>

      {/* ── MAP ── */}
      <section style={{ padding: "60px 24px 80px", background: C.oceanDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>The System</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontStyle: "italic", color: "rgba(255,255,255,0.85)", marginBottom: 12 }}>5,000 kilometres of cold water</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 32, maxWidth: 600 }}>Blue dots: current waypoints. Diamond markers: fishing ports by country. Click any point for data.</p>
          <div ref={mapContainer} style={{ width: "100%", height: "clamp(450px, 60vh, 640px)", borderRadius: 4, background: "#0a1628", border: "1px solid rgba(255,255,255,0.1)", opacity: mapReady ? 1 : 0.5, transition: "opacity 0.8s ease" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 16 }}>
            {[{ color: C.current, label: "Current path", s: "\u25cf" }, { color: C.morocco, label: "Morocco", s: "\u25c6" }, { color: C.portugal, label: "Portugal", s: "\u25c6" }, { color: C.warm, label: "Mauritania", s: "\u25c6" }, { color: C.senegal, label: "Senegal", s: "\u25c6" }].map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ color: l.color, fontSize: 10 }}>{l.s}</span><span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{l.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPWELLING ZONES ── */}
      <section ref={upwellingSection.ref} style={{ padding: "80px 24px", borderTop: "1px solid " + C.border }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>Oceanography</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontStyle: "italic", color: C.ink, marginBottom: 32 }}>Three zones, one system</p>
          <div style={{ display: "grid", gap: 20 }}>
            {UPWELLING_ZONES.map((z, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: 16, opacity: upwellingSection.visible ? 1 : 0, transform: upwellingSection.visible ? "none" : "translateY(16px)", transition: "all 0.6s ease " + (i * 120) + "ms" }}>
                <div style={{ background: z.color, borderRadius: 2 }} />
                <div style={{ padding: "16px 0" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}><span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, color: C.ink }}>{z.name}</span><span style={{ fontSize: 12, color: C.muted }}>{z.range}</span></div>
                  <div style={{ fontSize: 12, color: z.color, fontWeight: 600, marginBottom: 4 }}>{z.season}</div>
                  <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.7 }}>{z.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVERGENCE: PORTUGAL vs MOROCCO ── */}
      <section style={{ padding: "80px 24px", background: C.white, borderTop: "1px solid " + C.border }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>The Divergence</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontStyle: "italic", color: C.ink, marginBottom: 32 }}>Portugal{"\u2019"}s collapse. Morocco{"\u2019"}s dominance.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            <div style={{ padding: 28, background: "#FEF2F2", borderRadius: 6, borderLeft: "4px solid " + C.portugal }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.portugal, marginBottom: 12 }}>Portugal</div>
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: C.ink, marginBottom: 16 }}>106K {"\u2192"} 22K tonnes</div>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: C.mid }}>Iberian sardine biomass crashed 80% between 2006 and 2016. ICES recommended a total fishing ban for up to 15 years. Portugal rejected it. Quotas were slashed instead {"\u2014"} 56,604 tonnes shared with Spain, two-thirds to Portugal. The Santos Populares festivals now serve increasingly expensive sardines. 20,000 jobs depend on the fishery. Prices tripled in five years.</p>
            </div>
            <div style={{ padding: 28, background: "#FEF9EE", borderRadius: 6, borderLeft: "4px solid " + C.morocco }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.morocco, marginBottom: 12 }}>Morocco</div>
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: C.ink, marginBottom: 16 }}>152K tonnes exported</div>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: C.mid }}>World{"\u2019"}s largest sardine exporter. Half of all canned sardines in global supermarkets are Moroccan. Sardines are 62% of total fish catch, 91% of raw material for the canning industry. But the collapse is accelerating: landings fell from 965,000 tonnes (2022) to 525,000 (2024) to 419,000 (2025) {"\u2014"} a 57% crash in three years. On February 1, 2026, Morocco banned frozen sardine exports indefinitely. UK importers report supply {"\u201C"}non-existent{"\u201D"} in some periods. Prices surged 60%. In May 2025, the Competition Council launched a price-fixing investigation. The cause: overfishing (RSW trawler fleet expansion in Dakhla), weakening upwelling from climate change, and water temperatures shifting beyond sardines{"\u2019"} 17{"\u2013"}18{"\u00b0"}C optimum. The abundance era is ending.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STOCK CHARTS ── */}
      <section ref={stockSection.ref} style={{ padding: "80px 24px", borderTop: "1px solid " + C.border }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>Landings</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontStyle: "italic", color: C.ink, marginBottom: 12 }}>Two trajectories, same ocean</p>
          <p style={{ fontSize: 13, color: C.mid, marginBottom: 32 }}>Sardine landings (thousand tonnes). Different scales {"\u2014"} same warning.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.portugal, marginBottom: 16 }}>Portugal (Iberian stock, K tonnes)</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 180 }}>
                {STOCK_DATA.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 10, color: C.mid }}>{d.portugal}</span>
                    <div style={{ width: "100%", height: stockSection.visible ? (d.portugal / 120) * 160 : 0, maxWidth: 40, background: d.portugal < 30 ? C.portugal : C.portugal + "88", borderRadius: "2px 2px 0 0", transition: "height 0.8s cubic-bezier(0.23,1,0.32,1) " + (i * 60) + "ms" }} />
                    <span style={{ fontSize: 9, color: C.light }}>{d.year}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.morocco, marginBottom: 16 }}>Morocco (national landings, K tonnes)</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 180 }}>
                {STOCK_DATA.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 10, color: C.mid }}>{d.morocco}</span>
                    <div style={{ width: "100%", height: stockSection.visible ? (d.morocco / 1000) * 160 : 0, maxWidth: 40, background: d.morocco < 600 ? "#B45309" : C.morocco, borderRadius: "2px 2px 0 0", transition: "height 0.8s cubic-bezier(0.23,1,0.32,1) " + (i * 60) + "ms" }} />
                    <span style={{ fontSize: 9, color: C.light }}>{d.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p style={{ fontSize: 11, color: C.muted, marginTop: 16 }}>2025: Morocco landings fell to 419K tonnes (down 57% from 2022 peak). Frozen exports banned Feb 1, 2026. Portugal quota: 29,560 tonnes (stock recovering).</p>
        </div>
      </section>

      {/* ── FOUR SYSTEMS ── */}
      <section ref={fourSystems.ref} style={{ padding: "80px 24px", background: C.oceanDark }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Global Context</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontStyle: "italic", color: "rgba(255,255,255,0.85)", marginBottom: 32 }}>Four upwelling systems feed the world</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {FOUR_SYSTEMS.map((s, i) => {
              const isC = s.name === "Canary";
              return (
                <div key={i} style={{ padding: 20, borderRadius: 6, background: isC ? "rgba(27,152,224,0.15)" : "rgba(255,255,255,0.05)", border: isC ? "1px solid " + C.current : "1px solid rgba(255,255,255,0.08)", opacity: fourSystems.visible ? 1 : 0, transform: fourSystems.visible ? "none" : "translateY(16px)", transition: "all 0.6s ease " + (i * 100) + "ms" }}>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: isC ? C.current : "rgba(255,255,255,0.8)", marginBottom: 8 }}>{s.name}{isC ? " \u2190 this one" : ""}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>{s.ocean} &middot; {s.extent}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>{s.fishCatch}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{s.species}</div>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 20 }}>Together: over 20% of global marine fish catch from just 5% of ocean area.</p>
        </div>
      </section>

      {/* ── SENEGAL PROSE ── */}
      <section style={{ padding: "80px 24px", maxWidth: 680, margin: "0 auto" }}>
        <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontStyle: "italic", color: C.ink, marginBottom: 24 }}>When the current weakens, Senegal goes hungry</p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink }}>In Senegal, 600,000 people work in fisheries. Sardinella {"\u2014"} the tropical cousin of the European sardine, thriving in the same upwelling {"\u2014"} is the primary source of animal protein for millions. It is not a luxury. It is survival.</p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink, marginTop: 24 }}>Climate change is warming the system. Fish stocks are shifting north as water temperatures rise. Round sardinella, which prefers 22{"\u2013"}25{"\u00b0"}C, is expanding into Mauritanian and southern Moroccan waters. European sardine, which spawns at 16{"\u2013"}18{"\u00b0"}C, is retreating. The distribution map is being redrawn by physics.</p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink, marginTop: 24 }}>Meanwhile, Mauritania{"\u2019"}s fishmeal factory boom has exploded sardinella processing from 10,000 tonnes in 2009 to 70,000 by 2013 {"\u2014"} fish ground into powder and shipped to aquaculture operations in Europe and Asia. Half a million tonnes of small pelagics transit annually from West African ports to Lagos, Abidjan, and Douala. The Canary Current feeds a chain that stretches across the entire continent.</p>
        <p style={{ fontSize: 16, lineHeight: 2, color: C.ink, marginTop: 24 }}>When Morocco didn{"\u2019"}t renew its fishing agreement with the EU in 1999, over 300 European vessels {"\u2014"} many Spanish and Portuguese {"\u2014"} lost access to Moroccan waters overnight. The pressure shifted south to Senegal and Mauritania. Fishing agreements are geopolitics. The sardine is the currency.</p>
      </section>

      {/* ── CLOSING POEM ── */}
      <section style={{ background: "linear-gradient(to bottom, " + C.dark + ", " + C.darkMid + ", " + C.darkEnd + ")", padding: "120px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontStyle: "italic", lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>The wind blows south along the coast.<br />The cold water rises. The plankton bloom.<br />The sardines come. The nets go out.</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontStyle: "italic", lineHeight: 1.5, color: "rgba(255,255,255,0.85)", marginTop: 28 }}>In Lisbon they grill them over charcoal in June.<br />In Safi they press them into tins.<br />In Dakar they dry them in the sun and call it life.</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 48 }}>One current. Eight nations. The same silver fish.</p>
        </div>
      </section>

      {/* ── SOURCES ── */}
      <section style={{ padding: "80px 24px", background: C.bg }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, marginBottom: 24 }}>Sources</p>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontSize: 12, lineHeight: 1.8, color: C.mid, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "linear-gradient(to bottom, " + C.dark + ", " + C.darkMid + ", " + C.darkEnd + ")", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>&copy; {new Date().getFullYear()} Slow Morocco &middot; J. Ng &middot; Ocean Systems</div>
      </footer>
    </div>
  );
}
