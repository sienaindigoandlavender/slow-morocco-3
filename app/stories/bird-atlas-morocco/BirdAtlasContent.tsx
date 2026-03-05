"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as d3 from "d3";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface Story {
  title: string;
  subtitle?: string | null;
  hero_image?: string | null;
  hero_caption?: string | null;
  body?: string | null;
  year?: number | null;
  read_time?: string | null;
  text_by?: string | null;
  category?: string | null;
  region?: string | null;
  sources?: string | null;
  tags?: string | null;
}

interface StoryImage {
  image_url: string;
  caption: string | null;
  attribution: string | null;
  position: number;
}

interface Journey {
  slug: string;
  title: string;
  duration?: string;
  hero_image?: string;
  excerpt?: string;
}

interface Props {
  story: Story;
  images: StoryImage[];
  relatedJourneys: Journey[];
}

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────

interface Site {
  name: string;
  lat: number;
  lng: number;
  type: "wetland" | "coastal" | "strait" | "mountain" | "desert" | "forest";
  elevation?: string;
  species: string;
  significance: string;
  peak: string;
  threatened?: string;
  ramsar?: boolean;
}

const SITES: Site[] = [
  { name: "Strait of Gibraltar", lat: 35.98, lng: -5.60, type: "strait", species: "Black Kite, White Stork, Honey Buzzard, Booted Eagle, Egyptian Vulture", significance: "14km crossing. 300,000+ raptors and 400,000+ storks annually. One of the top five raptor migration bottlenecks on Earth.", peak: "Aug–Oct southbound · Mar–May northbound" },
  { name: "Merja Zerga", lat: 34.87, lng: -6.27, type: "wetland", species: "Greater Flamingo, Spoonbill, Marbled Duck, Marsh Harrier", significance: "Ramsar wetland. 50,000+ wintering waterbirds. Last confirmed sightings of Slender-billed Curlew.", peak: "Nov–Mar", ramsar: true, threatened: "Slender-billed Curlew (CR)" },
  { name: "Souss-Massa NP", lat: 30.07, lng: -9.63, type: "coastal", species: "Northern Bald Ibis, Audouin's Gull, Moussier's Redstart", significance: "Last viable wild population of Northern Bald Ibis. ~700 individuals. Morocco holds 95% of the species.", peak: "Year-round (breeding Feb–Jun)", ramsar: true, threatened: "Northern Bald Ibis (EN)" },
  { name: "Tamri Estuary", lat: 30.72, lng: -9.83, type: "coastal", species: "Northern Bald Ibis, Lesser Crested Tern", significance: "Second Northern Bald Ibis colony. Cliff-nesting site north of Agadir.", peak: "Feb–Jun", threatened: "Northern Bald Ibis (EN)" },
  { name: "Lac de Sidi Bourhaba", lat: 34.23, lng: -6.65, type: "wetland", species: "Crested Coot, Marbled Duck, White-headed Duck", significance: "Ramsar site. Critical breeding lake for three globally threatened duck species.", peak: "Oct–Mar", ramsar: true, threatened: "White-headed Duck (EN)" },
  { name: "Oualidia Lagoon", lat: 32.73, lng: -9.03, type: "wetland", species: "Greater Flamingo, Grebes, Little Egret, Kingfisher", significance: "Atlantic lagoon. Major wintering site. Flamingos and oyster beds in the same frame.", peak: "Oct–Apr" },
  { name: "Oued Massa", lat: 29.98, lng: -9.65, type: "wetland", species: "Glossy Ibis, Marbled Duck, Flamingo", significance: "Only Moroccan breeding site for Glossy Ibis (12–14 pairs).", peak: "Mar–Jun", ramsar: true },
  { name: "Khnifiss Lagoon", lat: 28.03, lng: -12.26, type: "coastal", species: "Flamingo, Spoonbill, Waders, Caspian Tern", significance: "Largest lagoon in southern Morocco. Near Tarfaya. Critical Atlantic staging post.", peak: "Sep–Mar", ramsar: true },
  { name: "Dayet Aoua", lat: 33.44, lng: -5.05, type: "wetland", species: "Crested Coot, Ferruginous Duck, White Stork", significance: "Middle Atlas lake at 1,450m. Key breeding wetland in cedar forest.", peak: "Mar–Jun" },
  { name: "Middle Atlas Forests", lat: 33.40, lng: -5.15, type: "forest", elevation: "1,200–2,000m", species: "Levaillant's Woodpecker, Atlas Flycatcher, Crossbill, Firecrest", significance: "Cedar and oak forest. Maghreb endemic bird hotspot.", peak: "Apr–Jul" },
  { name: "Toubkal / High Atlas", lat: 31.06, lng: -7.92, type: "mountain", elevation: "3,000–4,167m", species: "Crimson-winged Finch, Alpine Chough, Bearded Vulture", significance: "One of last Bearded Vulture breeding sites in North Africa.", peak: "May–Aug", threatened: "Bearded Vulture (regional CR)" },
  { name: "Merzouga / Erg Chebbi", lat: 31.10, lng: -3.97, type: "desert", species: "Desert Sparrow, Egyptian Nightjar, Houbara Bustard", significance: "Saharan IBA. Desert specialist species. Houbara Bustard conservation zone.", peak: "Oct–Apr", threatened: "Houbara Bustard (VU)" },
];

const FLYWAY_ATLANTIC: [number, number][] = [
  [-5.60, 35.98], [-5.80, 35.60], [-6.27, 34.87], [-6.65, 34.23],
  [-9.03, 32.73], [-9.83, 30.72], [-9.63, 30.07], [-9.65, 29.98],
  [-12.26, 28.03], [-13.20, 27.00],
];

const FLYWAY_INLAND: [number, number][] = [
  [-5.60, 35.98], [-5.00, 34.03], [-5.15, 33.40], [-5.05, 33.44],
  [-7.92, 31.06], [-6.80, 30.50], [-3.97, 31.10], [-2.50, 28.50],
];

const TYPE_COLORS: Record<string, string> = {
  wetland: "#4a9aba", coastal: "#2d7a5a", strait: "#c9a96e",
  mountain: "#8a7a9a", desert: "#d4945a", forest: "#4a7a4a",
};

const SEASONAL_DATA = [
  { species: "White Stork",      vals: [0,1,3,5,4,2,1,3,5,4,2,0], color: "#c8c8c8", stroke: "#666" },
  { species: "Greater Flamingo", vals: [5,5,4,3,2,1,1,2,3,4,5,5], color: "#f4a0c0", stroke: "#b04070" },
  { species: "Bald Ibis",        vals: [2,4,5,5,5,4,3,2,1,1,1,1], color: "#1a1a1a", stroke: "#000" },
  { species: "Black Kite",       vals: [0,1,3,4,3,1,0,2,5,4,1,0], color: "#8B4513", stroke: "#5a2d0c" },
  { species: "Egyptian Vulture", vals: [0,0,1,3,4,4,3,2,3,2,0,0], color: "#d4c878", stroke: "#a09030" },
  { species: "Booted Eagle",     vals: [1,1,2,3,3,2,1,2,4,4,2,1], color: "#6B8E23", stroke: "#3a5010" },
  { species: "Marbled Duck",     vals: [3,3,4,5,4,3,2,2,3,3,3,3], color: "#a0905c", stroke: "#6a6030" },
  { species: "Bearded Vulture",  vals: [3,4,5,5,4,3,3,3,3,3,3,3], color: "#c87030", stroke: "#804010" },
  { species: "Houbara Bustard",  vals: [4,4,3,2,1,0,0,0,1,3,4,4], color: "#d4b870", stroke: "#a08030" },
];

const MONTHS_SHORT = ["J","F","M","A","M","J","J","A","S","O","N","D"];
const MONTHS_FULL = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ─────────────────────────────────────────────
// UTILITY — split body into N chunks
// ─────────────────────────────────────────────

function splitBody(content: string, breakAt: number[]): string[] {
  const isHtml = /<[a-z][^>]*>/i.test(content);
  let paragraphs: string[];

  if (isHtml) {
    // Split on closing </p> tags
    paragraphs = content
      .split(/(?<=<\/p>)/i)
      .map(s => s.trim())
      .filter(Boolean);
  } else {
    paragraphs = content.split(/\n\n+/).filter(Boolean);
  }

  const chunks: string[] = [];
  let lastBreak = 0;

  breakAt.forEach((breakPoint) => {
    const end = Math.min(breakPoint, paragraphs.length);
    chunks.push(paragraphs.slice(lastBreak, end).join(isHtml ? "\n" : "\n\n"));
    lastBreak = end;
  });

  // remainder
  if (lastBreak < paragraphs.length) {
    chunks.push(paragraphs.slice(lastBreak).join(isHtml ? "\n" : "\n\n"));
  }

  return chunks.filter(Boolean);
}

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

function useCounter(target: number, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(20px)",
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// STORY BODY RENDERER (plain text only version)
// ─────────────────────────────────────────────

function BodyChunk({ content }: { content: string }) {
  if (!content) return null;
  const isHtml = /<[a-z][^>]*>/i.test(content);

  if (isHtml) {
    return (
      <div
        className="prose-chunk"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          fontSize: 15,
          lineHeight: 1.85,
          color: "#262626",
        }}
      />
    );
  }

  const paragraphs = content.split(/\n\n+/).filter(Boolean);
  return (
    <div>
      {paragraphs.map((p, i) => {
        if (p.startsWith("> ")) {
          return (
            <blockquote key={i} className="border-l-2 border-neutral-800 pl-6 my-8 font-serif text-xl italic text-neutral-600">
              {p.replace(/^>\s*/, "")}
            </blockquote>
          );
        }
        return (
          <p key={i} className="mb-6 leading-[1.85]" style={{ fontSize: 15, color: "#262626" }}>
            {p}
          </p>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// STAT COUNTER
// ─────────────────────────────────────────────

function AnimStat({ value, suffix = "", label, accent }: { value: number; suffix?: string; label: string; accent: string }) {
  const { ref, vis } = useInView();
  const n = useCounter(value, 1800, vis);
  return (
    <div ref={ref} className="text-center">
      <div className="font-serif leading-none mb-2" style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", color: accent }}>
        {n.toLocaleString()}{suffix}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">{label}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// SEASONAL CHART
// ─────────────────────────────────────────────

function SeasonalChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.2);
  const [hov, setHov] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const W = 900, H = 310;
    const m = { top: 12, right: 12, bottom: 36, left: 148 };
    const w = W - m.left - m.right;
    const h = H - m.top - m.bottom;

    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const xScale = d3.scaleBand().domain(MONTHS_SHORT).range([0, w]).padding(0.1);
    const yScale = d3.scaleBand().domain(SEASONAL_DATA.map(d => d.species)).range([0, h]).padding(0.18);

    g.selectAll(".mg").data(MONTHS_SHORT).enter()
      .append("line").attr("x1", d => (xScale(d) ?? 0) + xScale.bandwidth() / 2)
      .attr("x2", d => (xScale(d) ?? 0) + xScale.bandwidth() / 2)
      .attr("y1", 0).attr("y2", h)
      .attr("stroke", "#f0f0f0").attr("stroke-width", 1);

    SEASONAL_DATA.forEach((row, ri) => {
      row.vals.forEach((val, mi) => {
        if (val === 0) return;
        const x = xScale(MONTHS_SHORT[mi]) ?? 0;
        const y = yScale(row.species) ?? 0;
        g.append("rect")
          .attr("x", x).attr("y", y)
          .attr("width", xScale.bandwidth()).attr("height", yScale.bandwidth())
          .attr("rx", 2)
          .attr("fill", row.color).attr("stroke", row.stroke).attr("stroke-width", 0.4)
          .attr("opacity", 0)
          .on("mouseenter", () => setHov(`${row.species} · ${MONTHS_FULL[mi]}`))
          .on("mouseleave", () => setHov(null))
          .transition().duration(450).delay(ri * 50 + mi * 16)
          .attr("opacity", val / 5);
      });
    });

    g.selectAll(".yl").data(SEASONAL_DATA).enter()
      .append("text").attr("x", -8)
      .attr("y", d => (yScale(d.species) ?? 0) + yScale.bandwidth() / 2 + 4)
      .attr("text-anchor", "end").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#555")
      .text(d => d.species);

    g.selectAll(".xl").data(MONTHS_SHORT).enter()
      .append("text")
      .attr("x", d => (xScale(d) ?? 0) + xScale.bandwidth() / 2)
      .attr("y", h + 20)
      .attr("text-anchor", "middle").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#bbb")
      .text(d => d);
  }, [vis]);

  return (
    <div ref={ref}>
      <div className="h-5 mb-1">
        {hov && <p className="font-mono text-xs text-neutral-400"><span className="text-neutral-900">{hov.split(" · ")[0]}</span> · {hov.split(" · ")[1]}</p>}
      </div>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] text-neutral-300 mt-3">Shade = relative abundance · hover to inspect</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// LIVE SIGHTINGS
// ─────────────────────────────────────────────

interface EBirdObs {
  comName: string;
  sciName: string;
  locName: string;
  obsDt: string;
  howMany: number | null;
  lat: number;
  lng: number;
}

function LiveSightings() {
  const [obs, setObs] = useState<EBirdObs[]>([]);
  const [loading, setLoading] = useState(true);
  const [ts, setTs] = useState("");
  const { ref, vis } = useInView(0.1);

  useEffect(() => {
    fetch("/api/ebird?endpoint=data/obs/MA/recent&maxResults=25&back=14")
      .then(r => r.ok ? r.json() : [])
      .then(d => { setObs(d); setTs(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long" })); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between border-b border-neutral-200 pb-3 mb-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">What is in the air right now</p>
        {ts && <span className="font-mono text-[10px] text-neutral-300">{ts} · eBird</span>}
      </div>
      {loading && [...Array(6)].map((_, i) => <div key={i} className="h-10 bg-neutral-50 animate-pulse mb-px" />)}
      {!loading && obs.slice(0, 18).map((o, i) => (
        <div key={i} className="flex items-baseline justify-between py-2.5 border-b border-neutral-100"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-8px)", transition: `opacity 0.35s ease ${i * 0.03}s, transform 0.35s ease ${i * 0.03}s` }}>
          <div>
            <span className="font-mono text-[13px] text-neutral-900">{o.comName}</span>
            <span className="font-mono text-[11px] text-neutral-400 italic ml-2">{o.sciName}</span>
          </div>
          <div className="text-right ml-4 shrink-0">
            <p className="font-mono text-[11px] text-neutral-500 max-w-[180px] truncate">{o.locName}</p>
            <p className="font-mono text-[10px] text-neutral-300">{o.howMany ? `${o.howMany} ind.` : "present"} · {o.obsDt?.split(" ")[0]}</p>
          </div>
        </div>
      ))}
      {!loading && obs.length > 0 && (
        <p className="font-mono text-[10px] text-neutral-300 pt-3">{obs.length} records · Cornell Lab of Ornithology / eBird</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAP
// ─────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

function MigrationMap() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const sMarkers = useRef<any[]>([]);
  const lMarkers = useRef<any[]>([]);
  const [selected, setSelected] = useState<Site | null>(null);
  const [ready, setReady] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showLive, setShowLive] = useState(true);
  const [liveObs, setLiveObs] = useState<EBirdObs[]>([]);

  useEffect(() => {
    if (!container.current || map.current) return;
    async function init() {
      if (!mapboxgl) {
        const mb = await import("mapbox-gl");
        mapboxgl = mb.default;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
        if (!document.getElementById("mapbox-gl-css")) {
          const l = document.createElement("link");
          l.id = "mapbox-gl-css"; l.rel = "stylesheet";
          l.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
          document.head.appendChild(l);
        }
      }
      if (!container.current) return;
      map.current = new mapboxgl.Map({
        container: container.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-7.0, 31.8], zoom: 4.8, minZoom: 3, maxZoom: 13,
        attributionControl: false,
      });
      map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
      map.current.on("click", () => setSelected(null));
      map.current.on("load", () => {
        const addRoute = (id: string, coords: [number, number][], color: string) => {
          map.current.addSource(id, { type: "geojson", data: { type: "Feature", geometry: { type: "LineString", coordinates: coords } } });
          map.current.addLayer({ id: `${id}-glow`, type: "line", source: id, paint: { "line-color": color, "line-width": 8, "line-opacity": 0.1 } });
          map.current.addLayer({ id, type: "line", source: id, paint: { "line-color": color, "line-width": 2, "line-opacity": 0.75, "line-dasharray": [5, 4] } });
        };
        addRoute("af", FLYWAY_ATLANTIC, "#c9a96e");
        addRoute("il", FLYWAY_INLAND, "#9b8db0");
        setReady(true);
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (!ready) return;
    sMarkers.current.forEach(m => m.remove());
    sMarkers.current = [];
    SITES.forEach(site => {
      const color = TYPE_COLORS[site.type];
      const el = document.createElement("div");
      el.style.cssText = `width:12px;height:12px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.5);cursor:pointer;transition:transform 0.15s;box-shadow:0 0 10px ${color}77;`;
      el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.9)"; });
      el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });
      el.addEventListener("click", e => {
        e.stopPropagation();
        setSelected(site);
        map.current.easeTo({ center: [site.lng, site.lat], zoom: Math.max(map.current.getZoom(), 7), duration: 700, offset: [130, 0] });
      });
      sMarkers.current.push(new mapboxgl.Marker({ element: el, anchor: "center" }).setLngLat([site.lng, site.lat]).addTo(map.current));
    });
  }, [ready]);

  useEffect(() => {
    fetch("/api/ebird?endpoint=data/obs/MA/recent&maxResults=80&back=14")
      .then(r => r.ok ? r.json() : [])
      .then(d => setLiveObs(d.filter((o: EBirdObs) => o.lat && o.lng)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!ready) return;
    lMarkers.current.forEach(m => m.remove());
    lMarkers.current = [];
    if (!showLive) return;
    liveObs.forEach(o => {
      const el = document.createElement("div");
      el.style.cssText = "width:6px;height:6px;border-radius:50%;background:#4ade80;opacity:0.75;box-shadow:0 0 5px #4ade80;";
      const popup = new mapboxgl.Popup({ offset: 8, closeButton: false })
        .setHTML(`<div style="font-family:monospace;font-size:11px;padding:4px 8px;background:#0a0a0a;color:#fff;border-radius:3px"><strong>${o.comName}</strong><br/><span style="color:#777">${o.locName}</span></div>`);
      lMarkers.current.push(new mapboxgl.Marker({ element: el, anchor: "center" }).setLngLat([o.lng, o.lat]).setPopup(popup).addTo(map.current));
    });
  }, [ready, liveObs, showLive]);

  useEffect(() => {
    if (!ready) return;
    try {
      ["af", "il"].forEach(id => {
        map.current.setPaintProperty(id, "line-opacity", showRoutes ? 0.75 : 0);
        map.current.setPaintProperty(`${id}-glow`, "line-opacity", showRoutes ? 0.1 : 0);
      });
    } catch {}
  }, [showRoutes, ready]);

  return (
    <div className="relative" style={{ height: 560 }}>
      <div ref={container} style={{ position: "absolute", inset: 0 }} />

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {[
          { label: "Flyways", active: showRoutes, toggle: () => setShowRoutes(v => !v), color: "#c9a96e" },
          { label: "Live sightings", active: showLive, toggle: () => setShowLive(v => !v), color: "#4ade80" },
        ].map(btn => (
          <button key={btn.label} onClick={btn.toggle}
            className="flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded transition-all"
            style={{ background: btn.active ? `${btn.color}18` : "rgba(0,0,0,0.55)", border: `1px solid ${btn.active ? btn.color : "rgba(255,255,255,0.12)"}`, color: btn.active ? btn.color : "rgba(255,255,255,0.35)", backdropFilter: "blur(8px)" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: btn.active ? btn.color : "#555" }} />
            {btn.label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 p-3 rounded hidden md:block"
        style={{ background: "rgba(0,0,0,0.62)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 mb-1">
            <svg width="20" height="6"><line x1="0" y1="3" x2="20" y2="3" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="4 3"/></svg>
            <span className="font-mono text-[10px] text-white/50">Atlantic flyway</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <svg width="20" height="6"><line x1="0" y1="3" x2="20" y2="3" stroke="#9b8db0" strokeWidth="1.5" strokeDasharray="4 3"/></svg>
            <span className="font-mono text-[10px] text-white/50">Atlas inland</span>
          </div>
          {Object.entries(TYPE_COLORS).map(([t, c]) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: c }} />
              <span className="font-mono text-[10px] text-white/40 capitalize">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Site panel */}
      <div className="absolute top-0 right-0 bottom-0 z-20 transition-transform duration-300"
        style={{ width: 290, background: "#0a0a0a", borderLeft: "1px solid rgba(255,255,255,0.07)", transform: selected ? "translateX(0)" : "translateX(100%)" }}>
        {selected && (
          <div className="p-6 pt-10 h-full overflow-y-auto">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white/35 hover:text-white text-2xl leading-none">×</button>
            <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: TYPE_COLORS[selected.type] }}>
              {selected.type}{selected.elevation ? ` · ${selected.elevation}` : ""}
              {selected.ramsar && <span className="ml-2 text-blue-400">Ramsar</span>}
            </p>
            <h3 className="font-serif text-white text-xl leading-tight mb-4">{selected.name}</h3>
            <p className="font-mono text-[11px] text-white/55 leading-relaxed mb-4">{selected.significance}</p>
            <div className="space-y-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mb-1">Species</p>
                <p className="font-mono text-[11px] text-white/65 leading-relaxed">{selected.species}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mb-1">Peak season</p>
                <p className="font-mono text-[11px] text-white/65">{selected.peak}</p>
              </div>
              {selected.threatened && (
                <div className="mt-3 p-3 rounded" style={{ background: "rgba(185,28,28,0.15)", border: "1px solid rgba(185,28,28,0.3)" }}>
                  <p className="font-mono text-[10px] text-red-400/80">⚠ {selected.threatened}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

export default function BirdAtlasContent({ story, images, relatedJourneys }: Props) {
  // Split body into 4 chunks: paras 1–3, 4–6, 7–9, 10+
  const chunks = story.body ? splitBody(story.body, [3, 6, 9]) : [];
  const [c1 = "", c2 = "", c3 = "", c4 = ""] = chunks;

  const sources = story.sources
    ? story.sources.split(";;").map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-white text-neutral-900">

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        {story.hero_image && (
          <div className="relative w-full" style={{ height: "70vh", minHeight: 480 }}>
            <Image
              src={story.hero_image}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 px-8 md:px-[8%] lg:px-[12%] pb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">
                <Link href="/stories/category/nature" className="hover:text-white/80 transition-colors">Nature</Link>
                {" "}·{" "}
                <Link href="/stories" className="hover:text-white/80 transition-colors">Stories</Link>
              </p>
              <h1 className="font-serif text-white leading-[0.92] tracking-tight mb-4"
                style={{ fontSize: "clamp(2.6rem,7vw,5rem)" }}>
                {story.title}
              </h1>
              {story.subtitle && (
                <p className="font-serif italic text-white/70 text-xl max-w-2xl">{story.subtitle}</p>
              )}
              <div className="flex items-center gap-4 mt-5 font-mono text-[11px] text-white/40">
                {story.text_by && <span>By {story.text_by}</span>}
                {story.year && <span>{story.year}</span>}
                {story.read_time && <span>{story.read_time} min read</span>}
              </div>
            </div>
          </div>
        )}

        {!story.hero_image && (
          <div className="px-8 md:px-[8%] lg:px-[12%] pt-32 pb-16 border-b border-neutral-100">
            <Link href="/stories" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-300 hover:text-neutral-600 transition-colors inline-block mb-10">← Stories</Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Nature</p>
            <h1 className="font-serif leading-[0.92] tracking-tight mb-5" style={{ fontSize: "clamp(2.6rem,7vw,5rem)" }}>
              {story.title}
            </h1>
            {story.subtitle && <p className="font-serif italic text-2xl text-neutral-500">{story.subtitle}</p>}
          </div>
        )}
      </section>

      {/* ━━━ STATS BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-14 border-b border-neutral-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <AnimStat value={500} suffix="+" label="species recorded" accent="#c9a96e" />
          <AnimStat value={400000} suffix="+" label="storks cross annually" accent="#2d7a5a" />
          <AnimStat value={14} suffix="km" label="the crossing width" accent="#9b8db0" />
          <AnimStat value={95} suffix="%" label="of wild Bald Ibis here" accent="#c04040" />
        </div>
      </section>

      {/* ━━━ BODY CHUNK 1 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {c1 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <Reveal><BodyChunk content={c1} /></Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.15}>
                <div className="sticky top-24 border-l-2 border-neutral-200 pl-6 space-y-6">
                  <p className="font-serif italic text-xl leading-snug text-neutral-600">
                    "Raptors cannot flap across open water. They depend on thermals, and thermals only rise over land."
                  </p>
                  <div className="space-y-4 pt-2">
                    {[
                      { label: "The crossing", note: "Gibraltar · 14km · 300,000+ raptors annually" },
                      { label: "The chain", note: "Atlantic coast · 1,800km of wetlands from Gibraltar to Tarfaya" },
                      { label: "The ibis", note: "700 left on Earth · 95% of them in Morocco" },
                    ].map(item => (
                      <div key={item.label} className="border-t border-neutral-100 pt-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-400 mb-0.5">{item.label}</p>
                        <p className="font-mono text-[11px] text-neutral-500">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ━━━ FILM — NEELS CASTILLON ━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-neutral-100">
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            src="https://player.vimeo.com/video/58291553?autoplay=0&title=0&byline=0&portrait=0&color=c9a96e"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="A Bird Ballet — Neels Castillon"
          />
        </div>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-5">
          <p className="font-mono text-[10px] text-neutral-300">
            <em>A Bird Ballet</em> — Neels Castillon, Marseille, 2013. Starlings in murmuration.
            The same species crosses Morocco every autumn on its way south.
          </p>
        </div>
      </section>

      {/* ━━━ BODY CHUNK 2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {c2 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="max-w-2xl">
            <Reveal><BodyChunk content={c2} /></Reveal>
          </div>
        </section>
      )}

      {/* ━━━ MAP — FULL WIDTH ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-neutral-100">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-8">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-1">The Routes</p>
            <p className="text-[13px] text-neutral-500">
              Atlantic flyway and Atlas inland route · Click any site for detail · Green dots are live eBird sightings
            </p>
          </Reveal>
        </div>
        <MigrationMap />
      </section>

      {/* ━━━ BODY CHUNK 3 + SEASONAL ━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            {c3 && <Reveal><BodyChunk content={c3} /></Reveal>}
            <Reveal delay={0.1}>
              <div className="mt-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-2">When to go</p>
                <p className="font-serif italic text-xl text-neutral-600 leading-snug">
                  Nine species, twelve months. Something extraordinary is always happening.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.15}><SeasonalChart /></Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ LIVE SIGHTINGS ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Dispatch</p>
              <h2 className="font-serif text-3xl leading-tight mb-5"><em>What is being seen today</em></h2>
              <p className="text-[13px] leading-[1.85] text-neutral-600">
                Observations submitted by birders in Morocco in the last 14 days,
                via the eBird citizen science network. The list changes with the season —
                check it in September and it reads like a roll call of everything Europe is sending south.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}><LiveSightings /></Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ BODY CHUNK 4 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {c4 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="max-w-2xl">
            <Reveal><BodyChunk content={c4} /></Reveal>
          </div>
        </section>
      )}

      {/* ━━━ WIND ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3">Migration conditions now</p>
              <h2 className="font-serif text-3xl leading-tight"><em>Birds read wind the way sailors do</em></h2>
            </div>
            <p className="text-[13px] leading-[1.85] text-neutral-600">
              North winds push autumn migration south through the strait. South winds halt it.
              The Saharan sirocco can ground thousands of birds for days — warblers sitting on every surface
              in Tarifa waiting for the weather to turn.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-sm overflow-hidden border border-neutral-100" style={{ height: 440 }}>
            <iframe
              src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=32.5&lon=-7.0&detail=true&pressure=true&message=true"
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Live wind conditions over Morocco"
            />
          </div>
          <p className="font-mono text-[10px] text-neutral-300 mt-2">Windy.com · ECMWF · live</p>
        </Reveal>
      </section>

      {/* ━━━ STORY IMAGES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {images.length > 0 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((img, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure>
                  <div className="relative w-full" style={{ aspectRatio: "16/9", overflow: "hidden", background: "#f0f0f0" }}>
                    <img src={img.image_url} alt={img.caption || ""} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  {(img.caption || img.attribution) && (
                    <figcaption className="font-mono text-[10px] text-neutral-400 mt-2 italic">
                      {img.caption}{img.caption && img.attribution ? " — " : ""}{img.attribution}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ━━━ JOURNEY CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <p className="font-serif italic text-xl text-neutral-600 max-w-lg">
              The birding routes we build cross wetlands most tourists never see.
            </p>
            <Link href="/plan-your-trip"
              className="font-mono text-[11px] uppercase tracking-[0.15em] border border-neutral-900 px-7 py-3.5 hover:bg-neutral-900 hover:text-white transition-all duration-200 whitespace-nowrap">
              Plan a birding journey →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ━━━ RELATED JOURNEYS ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {relatedJourneys.length > 0 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-8">Journeys</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedJourneys.map((j, i) => (
              <Reveal key={j.slug} delay={i * 0.1}>
                <Link href={`/journeys/${j.slug}`} className="group block">
                  {j.hero_image && (
                    <div className="relative w-full mb-4 overflow-hidden" style={{ aspectRatio: "16/9", background: "#f0f0f0" }}>
                      <img src={j.hero_image} alt={j.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                  )}
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-1">{j.duration}</p>
                  <h3 className="font-serif text-xl group-hover:opacity-60 transition-opacity">{j.title}</h3>
                  {j.excerpt && <p className="text-[13px] text-neutral-500 mt-1 leading-relaxed line-clamp-2">{j.excerpt}</p>}
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ━━━ SOURCES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16" style={{ background: "#141414" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Live data</p>
            <p className="text-[11px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.4)" }}>
              Sightings: eBird / Cornell Lab of Ornithology, updated daily.
              Wind: Windy.com / ECMWF, live.
              Film: <em>A Bird Ballet</em>, Neels Castillon, 2013.
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Reference</p>
            <div className="text-[11px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.4)" }}>
              {sources.length > 0
                ? sources.map((s, i) => <p key={i}>{s}</p>)
                : <p>Bergier & Thévenot, <em>Oiseaux du Maroc</em> (2006). BirdLife International IBA database. IUCN Red List 2024. GREPOM. HawkWatch International.</p>
              }
            </div>
          </div>
        </div>
        <p className="font-mono text-[10px] mt-10" style={{ color: "#c9a96e" }}>© Slow Morocco · J. Ng</p>
      </section>

    </div>
  );
}
