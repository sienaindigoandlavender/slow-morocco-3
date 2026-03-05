"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import * as d3 from "d3";

// ═══════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════

interface EBirdObs {
  speciesCode: string;
  comName: string;
  sciName: string;
  locName: string;
  obsDt: string;
  howMany: number | null;
  lat: number;
  lng: number;
  obsValid: boolean;
}

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

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════

const SITES: Site[] = [
  {
    name: "Strait of Gibraltar",
    lat: 35.98, lng: -5.60,
    type: "strait",
    species: "Black Kite, White Stork, Honey Buzzard, Booted Eagle, Egyptian Vulture",
    significance: "14km crossing. 300,000+ raptors and 400,000+ storks annually. One of the top five raptor migration bottlenecks on Earth.",
    peak: "Aug–Oct southbound · Mar–May northbound",
  },
  {
    name: "Merja Zerga",
    lat: 34.87, lng: -6.27,
    type: "wetland",
    species: "Greater Flamingo, Spoonbill, Marbled Duck, Marsh Harrier, Avocet",
    significance: "Ramsar wetland. 50,000+ wintering waterbirds. Last confirmed sightings of Slender-billed Curlew on record.",
    peak: "Nov–Mar",
    ramsar: true,
    threatened: "Slender-billed Curlew (CR)",
  },
  {
    name: "Souss-Massa NP",
    lat: 30.07, lng: -9.63,
    type: "coastal",
    species: "Northern Bald Ibis, Audouin's Gull, Moussier's Redstart",
    significance: "Last viable wild population of Northern Bald Ibis. ~700 individuals. Morocco holds 95% of the species.",
    peak: "Year-round (breeding Feb–Jun)",
    ramsar: true,
    threatened: "Northern Bald Ibis (EN)",
  },
  {
    name: "Tamri Estuary",
    lat: 30.72, lng: -9.83,
    type: "coastal",
    species: "Northern Bald Ibis, Lesser Crested Tern",
    significance: "Second Northern Bald Ibis colony. Cliff-nesting site north of Agadir.",
    peak: "Feb–Jun",
    threatened: "Northern Bald Ibis (EN)",
  },
  {
    name: "Lac de Sidi Bourhaba",
    lat: 34.23, lng: -6.65,
    type: "wetland",
    species: "Crested Coot, Marbled Duck, White-headed Duck, Purple Swamphen",
    significance: "Ramsar site. Critical breeding lake for three globally threatened duck species.",
    peak: "Oct–Mar",
    ramsar: true,
    threatened: "White-headed Duck (EN)",
  },
  {
    name: "Oualidia Lagoon",
    lat: 32.73, lng: -9.03,
    type: "wetland",
    species: "Greater Flamingo, Grebes, Little Egret, Kingfisher",
    significance: "Coastal Atlantic lagoon. Major wintering site. Famous for oysters and flamingos in the same frame.",
    peak: "Oct–Apr",
  },
  {
    name: "Oued Massa",
    lat: 29.98, lng: -9.65,
    type: "wetland",
    species: "Glossy Ibis, Marbled Duck, Flamingo, Little Bittern",
    significance: "Only Moroccan breeding site for Glossy Ibis (12–14 pairs). Within Souss-Massa NP.",
    peak: "Mar–Jun",
    ramsar: true,
  },
  {
    name: "Khnifiss Lagoon",
    lat: 28.03, lng: -12.26,
    type: "coastal",
    species: "Flamingo, Spoonbill, Waders, Caspian Tern",
    significance: "Largest lagoon in southern Morocco. Remote, near Tarfaya. Critical Atlantic coast staging post.",
    peak: "Sep–Mar",
    ramsar: true,
  },
  {
    name: "Dayet Aoua",
    lat: 33.44, lng: -5.05,
    type: "wetland",
    species: "Crested Coot, Ferruginous Duck, Purple Swamphen, White Stork",
    significance: "Middle Atlas lake at 1,450m. Key breeding wetland in cedar forest. Seasonal — can dry in drought years.",
    peak: "Mar–Jun",
  },
  {
    name: "Middle Atlas Forests",
    lat: 33.40, lng: -5.15,
    type: "forest",
    elevation: "1,200–2,000m",
    species: "Levaillant's Woodpecker, Atlas Flycatcher, Crossbill, Firecrest",
    significance: "Cedar and oak forest. Maghreb endemic bird hotspot. Same forest community as southern European montane.",
    peak: "Apr–Jul",
  },
  {
    name: "Toubkal / High Atlas",
    lat: 31.06, lng: -7.92,
    type: "mountain",
    elevation: "3,000–4,167m",
    species: "Crimson-winged Finch, Alpine Chough, Bearded Vulture, Atlas Horned Lark",
    significance: "Alpine zone above treeline. One of last Bearded Vulture breeding sites in North Africa.",
    peak: "May–Aug",
    threatened: "Bearded Vulture (regional CR)",
  },
  {
    name: "Merzouga / Erg Chebbi",
    lat: 31.10, lng: -3.97,
    type: "desert",
    species: "Desert Sparrow, Egyptian Nightjar, Houbara Bustard, Cream-coloured Courser",
    significance: "Saharan IBA. Desert specialist species. Houbara Bustard conservation zone.",
    peak: "Oct–Apr",
    threatened: "Houbara Bustard (VU)",
  },
];

// Migration flyway routes — Atlantic coast corridor + inland Atlas route
const FLYWAY_ROUTES = {
  atlantic: [
    [-5.60, 35.98],  // Gibraltar
    [-5.80, 35.60],  // Tangier coast
    [-6.27, 34.87],  // Merja Zerga
    [-6.65, 34.23],  // Lac Sidi Bourhaba
    [-9.03, 32.73],  // Oualidia
    [-9.83, 30.72],  // Tamri
    [-9.63, 30.07],  // Souss-Massa
    [-9.65, 29.98],  // Oued Massa
    [-12.26, 28.03], // Khnifiss
    [-13.20, 27.00], // Near Tarfaya (Saharan coast)
  ] as [number, number][],
  inland: [
    [-5.60, 35.98],  // Gibraltar
    [-5.00, 34.03],  // Fes corridor
    [-5.15, 33.40],  // Middle Atlas
    [-5.05, 33.44],  // Dayet Aoua
    [-7.92, 31.06],  // High Atlas
    [-6.80, 30.50],  // Pre-Sahara
    [-3.97, 31.10],  // Merzouga
    [-2.50, 28.50],  // Into Sahara
  ] as [number, number][],
};

// Seasonal presence data for D3 chart
const SEASONAL_DATA = [
  { species: "White Stork", jan:0, feb:1, mar:3, apr:5, may:4, jun:2, jul:1, aug:3, sep:5, oct:4, nov:2, dec:0, color: "#e8e8e8", outline: "#555" },
  { species: "Greater Flamingo", jan:5, feb:5, mar:4, apr:3, may:2, jun:1, jul:1, aug:2, sep:3, oct:4, nov:5, dec:5, color: "#f4a0c0", outline: "#c45080" },
  { species: "Northern Bald Ibis", jan:2, feb:4, mar:5, apr:5, may:5, jun:4, jul:3, aug:2, sep:1, oct:1, nov:1, dec:1, color: "#2a2a2a", outline: "#000" },
  { species: "Black Kite", jan:0, feb:1, mar:3, apr:4, may:3, jun:1, jul:0, aug:2, sep:5, oct:4, nov:1, dec:0, color: "#8B4513", outline: "#5a2d0c" },
  { species: "Egyptian Vulture", jan:0, feb:0, mar:1, apr:3, may:4, jun:4, jul:3, aug:2, sep:3, oct:2, nov:0, dec:0, color: "#d4c878", outline: "#a09030" },
  { species: "Honey Buzzard", jan:0, feb:0, mar:0, apr:1, may:2, jun:1, jul:0, aug:1, sep:4, oct:3, nov:0, dec:0, color: "#c8a060", outline: "#8b6020" },
  { species: "Booted Eagle", jan:1, feb:1, mar:2, apr:3, may:3, jun:2, jul:1, aug:2, sep:4, oct:4, nov:2, dec:1, color: "#6B8E23", outline: "#3a5010" },
  { species: "Marbled Duck", jan:3, feb:3, mar:4, apr:5, may:4, jun:3, jul:2, aug:2, sep:3, oct:3, nov:3, dec:3, color: "#a0905c", outline: "#6a6030" },
  { species: "Bearded Vulture", jan:3, feb:4, mar:5, apr:5, may:4, jun:3, jul:3, aug:3, sep:3, oct:3, nov:3, dec:3, color: "#c87030", outline: "#804010" },
  { species: "Houbara Bustard", jan:4, feb:4, mar:3, apr:2, may:1, jun:0, jul:0, aug:0, sep:1, oct:3, nov:4, dec:4, color: "#d4b870", outline: "#a08030" },
];

const MONTHS = ["J","F","M","A","M","J","J","A","S","O","N","D"];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const TYPE_COLORS: Record<string, string> = {
  wetland: "#4a9aba",
  coastal: "#2d7a5a",
  strait: "#c8a050",
  mountain: "#8a7a9a",
  desert: "#d4945a",
  forest: "#4a7a4a",
};

// ═══════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════

function useInView(threshold = 0.15) {
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

function useCounter(target: number, duration = 2000, active = false) {
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

// ═══════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════

function StatCounter({ target, suffix = "", label, color }: { target: number; suffix?: string; label: string; color: string }) {
  const { ref, vis } = useInView();
  const val = useCounter(target, 1800, vis);
  return (
    <div ref={ref}>
      <p className="font-mono text-4xl font-bold mb-1" style={{ color }}>
        {val.toLocaleString()}{suffix}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">{label}</p>
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, vis } = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SEASONAL CHART
// ═══════════════════════════════════════════════════════

function SeasonalChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.2);
  const [hovered, setHovered] = useState<{ species: string; month: string; value: number } | null>(null);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const W = 880, H = 340;
    const m = { top: 30, right: 20, bottom: 50, left: 160 };
    const w = W - m.left - m.right;
    const h = H - m.top - m.bottom;

    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const monthKeys = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    const xScale = d3.scaleBand().domain(MONTHS).range([0, w]).padding(0.08);
    const yScale = d3.scaleBand().domain(SEASONAL_DATA.map(d => d.species)).range([0, h]).padding(0.15);

    // Grid lines
    g.append("g").selectAll("line")
      .data(MONTHS)
      .enter().append("line")
      .attr("x1", d => (xScale(d) || 0) + xScale.bandwidth() / 2)
      .attr("x2", d => (xScale(d) || 0) + xScale.bandwidth() / 2)
      .attr("y1", 0).attr("y2", h)
      .attr("stroke", "#f0f0f0").attr("stroke-width", 1);

    // Cells
    SEASONAL_DATA.forEach((row, ri) => {
      monthKeys.forEach((mk, mi) => {
        const val = (row as any)[mk] as number;
        if (val === 0) return;
        const opacity = val / 5;
        const x = xScale(MONTHS[mi]) || 0;
        const y = yScale(row.species) || 0;
        const bw = xScale.bandwidth();
        const bh = yScale.bandwidth();

        // Animate in with delay
        setTimeout(() => {
          g.append("rect")
            .attr("x", x).attr("y", y)
            .attr("width", bw).attr("height", bh)
            .attr("rx", 3)
            .attr("fill", row.color)
            .attr("stroke", row.outline)
            .attr("stroke-width", 0.5)
            .attr("opacity", 0)
            .on("mouseenter", function() {
              d3.select(this).attr("opacity", Math.min(opacity + 0.3, 1));
              setHovered({ species: row.species, month: MONTH_NAMES[mi], value: val });
            })
            .on("mouseleave", function() {
              d3.select(this).attr("opacity", opacity);
              setHovered(null);
            })
            .transition().duration(400).delay(ri * 60 + mi * 20)
            .attr("opacity", opacity);
        }, 0);
      });
    });

    // X axis — months
    g.append("g").attr("transform", `translate(0,${h})`)
      .selectAll("text").data(MONTHS).enter().append("text")
      .attr("x", d => (xScale(d) || 0) + xScale.bandwidth() / 2)
      .attr("y", 20).attr("text-anchor", "middle")
      .attr("font-family", "monospace").attr("font-size", 11)
      .attr("fill", "#888")
      .text(d => d);

    // Y axis — species
    g.append("g").selectAll("text").data(SEASONAL_DATA).enter().append("text")
      .attr("x", -8).attr("y", d => (yScale(d.species) || 0) + yScale.bandwidth() / 2 + 4)
      .attr("text-anchor", "end")
      .attr("font-family", "monospace").attr("font-size", 11)
      .attr("fill", "#333")
      .text(d => d.species);

    // Intensity legend
    const legend = g.append("g").attr("transform", `translate(0,${h + 32})`);
    legend.append("text").attr("x", 0).attr("y", 0)
      .attr("font-family", "monospace").attr("font-size", 10).attr("fill", "#aaa")
      .text("Presence:");
    [1,2,3,4,5].forEach((v, i) => {
      legend.append("rect")
        .attr("x", 70 + i * 28).attr("y", -12)
        .attr("width", 22).attr("height", 14).attr("rx", 2)
        .attr("fill", `rgba(100,120,180,${v/5})`);
      legend.append("text")
        .attr("x", 70 + i * 28 + 11).attr("y", 12)
        .attr("text-anchor", "middle")
        .attr("font-family", "monospace").attr("font-size", 9).attr("fill", "#999")
        .text(["rare","low","mod","high","peak"][v - 1]);
    });

  }, [vis]);

  return (
    <div ref={ref}>
      {hovered && (
        <div className="mb-3 font-mono text-xs text-neutral-500">
          <span className="text-neutral-900 font-semibold">{hovered.species}</span>
          {" "}· {hovered.month} · presence {["rare","low","moderate","high","peak"][hovered.value - 1]}
        </div>
      )}
      <svg ref={svgRef} className="w-full" style={{ maxHeight: 360 }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// LIVE SIGHTINGS
// ═══════════════════════════════════════════════════════

function LiveSightings() {
  const [obs, setObs] = useState<EBirdObs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    async function fetchObs() {
      try {
        const res = await fetch("/api/ebird?endpoint=data/obs/MA/recent&maxResults=30&back=14");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setObs(data);
        setLastUpdated(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchObs();
  }, []);

  const { ref, vis } = useInView(0.1);

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          Live Sightings — eBird · Morocco · Last 14 Days
        </p>
        {lastUpdated && (
          <span className="font-mono text-[10px] text-neutral-400">
            Updated {lastUpdated}
          </span>
        )}
      </div>

      {loading && (
        <div className="space-y-2">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-10 bg-neutral-100 rounded animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <p className="font-mono text-xs text-neutral-400">
          Live data unavailable — eBird API unreachable.
        </p>
      )}

      {!loading && !error && (
        <div className="space-y-0">
          {obs.slice(0, 20).map((o, i) => (
            <div
              key={i}
              className="flex items-start justify-between py-2.5 border-b border-neutral-100"
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`,
              }}
            >
              <div className="flex-1">
                <span className="font-mono text-[13px] text-neutral-900">{o.comName}</span>
                <span className="font-mono text-[11px] text-neutral-400 ml-2 italic">{o.sciName}</span>
              </div>
              <div className="text-right ml-4 shrink-0">
                <p className="font-mono text-[11px] text-neutral-500">{o.locName}</p>
                <p className="font-mono text-[10px] text-neutral-400">
                  {o.howMany ? `${o.howMany} ind.` : "present"} · {o.obsDt.split(" ")[0]}
                </p>
              </div>
            </div>
          ))}
          <p className="font-mono text-[10px] text-neutral-400 pt-3">
            Source: eBird / Cornell Lab of Ornithology · {obs.length} records
          </p>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAP COMPONENT
// ═══════════════════════════════════════════════════════

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

function MigrationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [selected, setSelected] = useState<Site | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [liveObs, setLiveObs] = useState<EBirdObs[]>([]);
  const [showLive, setShowLive] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const markers = useRef<any[]>([]);
  const liveMarkers = useRef<any[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    async function initMap() {
      if (!mapboxgl) {
        const mb = await import("mapbox-gl");
        mapboxgl = mb.default;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
        if (!document.getElementById("mapbox-gl-css")) {
          const link = document.createElement("link");
          link.id = "mapbox-gl-css";
          link.rel = "stylesheet";
          link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
          document.head.appendChild(link);
        }
      }

      if (!mapContainer.current) return;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-7.0, 31.8],
        zoom: 4.8,
        minZoom: 3,
        maxZoom: 12,
        attributionControl: false,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "bottom-right"
      );

      map.current.on("load", () => {
        // Atlantic flyway
        map.current.addSource("atlantic-flyway", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: { type: "LineString", coordinates: FLYWAY_ROUTES.atlantic },
          },
        });
        map.current.addLayer({
          id: "atlantic-flyway-glow",
          type: "line",
          source: "atlantic-flyway",
          paint: {
            "line-color": "#c9a96e",
            "line-width": 6,
            "line-opacity": 0.15,
          },
        });
        map.current.addLayer({
          id: "atlantic-flyway",
          type: "line",
          source: "atlantic-flyway",
          paint: {
            "line-color": "#c9a96e",
            "line-width": 2,
            "line-opacity": 0.7,
            "line-dasharray": [4, 3],
          },
        });

        // Inland Atlas route
        map.current.addSource("inland-flyway", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: { type: "LineString", coordinates: FLYWAY_ROUTES.inland },
          },
        });
        map.current.addLayer({
          id: "inland-flyway-glow",
          type: "line",
          source: "inland-flyway",
          paint: {
            "line-color": "#9b8db0",
            "line-width": 6,
            "line-opacity": 0.15,
          },
        });
        map.current.addLayer({
          id: "inland-flyway",
          type: "line",
          source: "inland-flyway",
          paint: {
            "line-color": "#9b8db0",
            "line-width": 2,
            "line-opacity": 0.7,
            "line-dasharray": [4, 3],
          },
        });

        setMapLoaded(true);
      });
    }

    initMap();
  }, []);

  // Place site markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    markers.current.forEach(m => m.remove());
    markers.current = [];

    SITES.forEach((site) => {
      const color = TYPE_COLORS[site.type];
      const el = document.createElement("div");
      el.style.cssText = `
        width: 12px; height: 12px; border-radius: 50%;
        background: ${color}; border: 2px solid rgba(255,255,255,0.6);
        cursor: pointer; transition: transform 0.15s ease;
        box-shadow: 0 0 12px ${color}88;
      `;
      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.8)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
      });
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelected(site);
        map.current.easeTo({
          center: [site.lng, site.lat],
          zoom: Math.max(map.current.getZoom(), 7),
          duration: 800,
          offset: [140, 0],
        });
      });

      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat([site.lng, site.lat])
        .addTo(map.current);
      markers.current.push(marker);
    });
  }, [mapLoaded]);

  // Fetch and show live eBird observations
  useEffect(() => {
    async function fetchLive() {
      try {
        const res = await fetch("/api/ebird?endpoint=data/obs/MA/recent&maxResults=100&back=14");
        if (!res.ok) return;
        const data = await res.json();
        setLiveObs(data.filter((o: EBirdObs) => o.lat && o.lng));
      } catch {}
    }
    fetchLive();
  }, []);

  // Render live obs markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    liveMarkers.current.forEach(m => m.remove());
    liveMarkers.current = [];
    if (!showLive) return;

    liveObs.forEach((obs) => {
      const el = document.createElement("div");
      el.style.cssText = `
        width: 6px; height: 6px; border-radius: 50%;
        background: #4ade80; opacity: 0.8;
        box-shadow: 0 0 4px #4ade80;
      `;
      const popup = new mapboxgl.Popup({ offset: 8, closeButton: false })
        .setHTML(`<div style="font-family:monospace;font-size:11px;padding:4px 6px;background:#0e0e0e;color:#fff;border-radius:4px">
          <strong>${obs.comName}</strong><br/>
          ${obs.locName}<br/>
          <span style="color:#888">${obs.obsDt.split(" ")[0]} · ${obs.howMany ? obs.howMany + " ind." : "present"}</span>
        </div>`);

      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat([obs.lng, obs.lat])
        .setPopup(popup)
        .addTo(map.current);
      liveMarkers.current.push(marker);
    });
  }, [mapLoaded, liveObs, showLive]);

  // Toggle routes visibility
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    const opacity = showRoutes ? 0.7 : 0;
    const glowOpacity = showRoutes ? 0.15 : 0;
    try {
      map.current.setPaintProperty("atlantic-flyway", "line-opacity", opacity);
      map.current.setPaintProperty("atlantic-flyway-glow", "line-opacity", glowOpacity);
      map.current.setPaintProperty("inland-flyway", "line-opacity", opacity);
      map.current.setPaintProperty("inland-flyway-glow", "line-opacity", glowOpacity);
    } catch {}
  }, [showRoutes, mapLoaded]);

  return (
    <div className="relative" style={{ height: 560 }}>
      <div ref={mapContainer} style={{ position: "absolute", inset: 0 }} />

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setShowRoutes(v => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded font-mono text-[10px] uppercase tracking-wider transition-all"
          style={{
            background: showRoutes ? "rgba(201,169,110,0.15)" : "rgba(0,0,0,0.6)",
            border: `1px solid ${showRoutes ? "#c9a96e" : "rgba(255,255,255,0.15)"}`,
            color: showRoutes ? "#c9a96e" : "rgba(255,255,255,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="w-2 h-0.5 inline-block" style={{ background: "#c9a96e" }} />
          Flyways
        </button>
        <button
          onClick={() => setShowLive(v => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded font-mono text-[10px] uppercase tracking-wider transition-all"
          style={{
            background: showLive ? "rgba(74,222,128,0.1)" : "rgba(0,0,0,0.6)",
            border: `1px solid ${showLive ? "#4ade80" : "rgba(255,255,255,0.15)"}`,
            color: showLive ? "#4ade80" : "rgba(255,255,255,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: showLive ? "#4ade80" : "#444" }} />
          Live sightings
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 p-3 rounded"
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex flex-col gap-1.5">
          {Object.entries(TYPE_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="font-mono text-[10px] text-white/60 capitalize">{type}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-1 pt-1 border-t border-white/10">
            <span className="w-2 h-2 rounded-full" style={{ background: "#4ade80" }} />
            <span className="font-mono text-[10px] text-white/60">eBird live</span>
          </div>
        </div>
      </div>

      {/* Flyway legend */}
      <div className="absolute top-4 right-4 z-10 p-3 rounded"
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <svg width="24" height="8"><line x1="0" y1="4" x2="24" y2="4" stroke="#c9a96e" strokeWidth="2" strokeDasharray="4 3" /></svg>
            <span className="font-mono text-[10px] text-white/60">Atlantic flyway</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="24" height="8"><line x1="0" y1="4" x2="24" y2="4" stroke="#9b8db0" strokeWidth="2" strokeDasharray="4 3" /></svg>
            <span className="font-mono text-[10px] text-white/60">Atlas inland route</span>
          </div>
        </div>
      </div>

      {/* Site panel */}
      {selected && (
        <div
          className="absolute top-0 right-0 bottom-0 z-20 flex flex-col overflow-y-auto"
          style={{ width: 300, background: "#0a0a0a", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 text-white/40 hover:text-white text-xl"
          >×</button>
          <div className="p-6 pt-10">
            <span className="font-mono text-[9px] uppercase tracking-widest mb-2 block"
              style={{ color: TYPE_COLORS[selected.type] }}>
              {selected.type}{selected.elevation ? ` · ${selected.elevation}` : ""}
              {selected.ramsar && <span className="ml-2 text-blue-400">Ramsar</span>}
            </span>
            <h3 className="font-serif text-white text-xl leading-tight mb-4">{selected.name}</h3>
            <p className="font-mono text-[11px] text-white/60 leading-relaxed mb-4">{selected.significance}</p>
            <div className="border-t border-white/10 pt-4 mb-4">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-1">Species</p>
              <p className="font-mono text-[11px] text-white/70 leading-relaxed">{selected.species}</p>
            </div>
            <div className="border-t border-white/10 pt-4 mb-4">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-1">Peak Season</p>
              <p className="font-mono text-[11px] text-white/70">{selected.peak}</p>
            </div>
            {selected.threatened && (
              <div className="bg-red-950/40 border border-red-900/30 rounded p-3">
                <p className="font-mono text-[10px] text-red-400/80 leading-relaxed">
                  ⚠ {selected.threatened}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN DOSSIER
// ═══════════════════════════════════════════════════════

const C = {
  ink: "#0a0a0a",
  text: "#262626",
  muted: "#737373",
  border: "#e5e5e5",
  gold: "#c9a96e",
  green: "#2d7a5a",
};

export default function BirdAtlasDossier() {
  const heroR = useInView();

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-32 pb-16 border-b" style={{ borderColor: C.border }}>
        <Link href="/stories" className="font-mono text-[10px] uppercase tracking-widest hover:opacity-60 transition-opacity inline-block mb-8" style={{ color: C.muted }}>
          ← Stories
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: C.muted }}>
          Dossier · Natural History
        </p>
        <div ref={heroR.ref}>
          <h1
            className="font-serif leading-[0.92] tracking-tight mb-4"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              opacity: heroR.vis ? 1 : 0,
              transform: heroR.vis ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            <em>The Bird Atlas</em>
          </h1>
          <p className="font-serif italic text-xl md:text-2xl mb-6" style={{ color: C.muted }}>
            Morocco is where Europe ends and Africa begins.<br />
            Every migration has to cross here.
          </p>
        </div>
        <p className="text-[13px] max-w-[600px] leading-[1.75]" style={{ color: C.text }}>
          Fourteen kilometres. That is the width of the Strait of Gibraltar — the gap between two continents that 
          every migratory bird between Europe and Africa must navigate. Each autumn, hundreds of millions of birds 
          funnel through this corridor. Morocco is not just a destination. It is the crossing point, the 
          wintering ground, and the breeding refuge of species that exist almost nowhere else.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <StatCounter target={500} suffix="+" label="species recorded" color={C.gold} />
          <StatCounter target={400000} suffix="+" label="storks cross annually" color={C.green} />
          <StatCounter target={12} label="key birding sites" color="#9b8db0" />
          <StatCounter target={95} suffix="%" label="of wild Bald Ibis" color="#c04040" />
        </div>
      </section>

      {/* ── MAP ────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: C.border }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-10">
          <FadeIn>
            <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.muted }}>
              Migration Routes + Key Sites
            </p>
            <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
              Click any site marker for details. Toggle flyways and live eBird sightings.
            </p>
          </FadeIn>
        </div>
        <MigrationMap />
      </section>

      {/* ── THE CROSSING ───────────────────────────────── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b" style={{ borderColor: C.border }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl">
          <FadeIn>
            <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: C.gold }}>
              The Gibraltar Crossing
            </p>
            <p className="text-[13px] leading-[1.75]" style={{ color: C.text }}>
              Raptors cannot flap across open water — they soar on thermals, and thermals only rise over land. 
              The Strait of Gibraltar is 14km wide, the minimum viable crossing. Every autumn, short-toed eagles, 
              honey buzzards, black kites, Egyptian vultures, and booted eagles circle upward in columns above 
              Jbel Moussa until they are specks, then glide across in silence. White storks cross in flocks of 
              thousands on the same thermals. The sky above the strait in September looks like a slow-motion river.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: C.green }}>
              The Atlantic Corridor
            </p>
            <p className="text-[13px] leading-[1.75]" style={{ color: C.text }}>
              Once across, most species follow the Atlantic coast south — a chain of wetlands that runs 1,800km 
              from Merja Zerga to Khnifiss Lagoon. Flamingos, spoonbills, waders, and ducks string themselves 
              along this corridor like beads. Some stop for winter. Some refuel and continue into the Sahel. 
              The chain is only as strong as its weakest link — one drained wetland breaks the route for 
              everything that uses it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── SEASONAL CHART ─────────────────────────────── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b" style={{ borderColor: C.border }}>
        <FadeIn>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.muted }}>
            Seasonal Presence
          </p>
          <p className="font-mono text-[11px] mb-8" style={{ color: C.muted }}>
            When each species is present in Morocco. Hover to inspect. Based on recorded observation patterns.
          </p>
        </FadeIn>
        <SeasonalChart />
      </section>

      {/* ── LIVE SIGHTINGS ─────────────────────────────── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b" style={{ borderColor: C.border }}>
        <FadeIn>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.muted }}>
            What is being seen right now
          </p>
          <p className="font-mono text-[11px] mb-8" style={{ color: C.muted }}>
            Live observations from eBird citizen science network. Updates daily.
          </p>
        </FadeIn>
        <LiveSightings />
      </section>

      {/* ── THREATENED SPECIES ─────────────────────────── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b" style={{ borderColor: C.border }}>
        <FadeIn>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-8" style={{ color: C.muted }}>
            Species Morocco Cannot Afford to Lose
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              name: "Northern Bald Ibis",
              status: "Endangered",
              statusColor: "#dc2626",
              count: "~700 wild individuals",
              note: "Morocco holds 95% of the world's remaining wild population. The bird went extinct everywhere else — Europe, the Middle East — before being rediscovered breeding at Souss-Massa in the 1990s. It is one of the rarest birds on Earth, and it lives here.",
            },
            {
              name: "Marbled Duck",
              status: "Vulnerable",
              statusColor: "#d97706",
              count: "15,000–20,000 globally",
              note: "Wetland specialist. Morocco's network of Atlantic lagoons and Middle Atlas lakes is critical to the western Mediterranean population. Habitat drainage is the primary threat — each lost wetland removes a breeding or wintering site that cannot be replaced.",
            },
            {
              name: "Houbara Bustard",
              status: "Vulnerable",
              statusColor: "#d97706",
              count: "Declining",
              note: "Desert and steppe specialist. Traditional quarry for falconry across the Arab world — Moroccan populations face pressure from legal hunting as well as habitat degradation. The Saharan fringes around Merzouga are among the last viable sites in North Africa.",
            },
          ].map((sp, i) => (
            <FadeIn key={sp.name} delay={i * 0.1}>
              <div className="border-t-2 pt-5" style={{ borderColor: sp.statusColor }}>
                <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: sp.statusColor }}>
                  {sp.status} · {sp.count}
                </p>
                <h3 className="font-serif text-lg mb-3" style={{ color: C.ink }}>{sp.name}</h3>
                <p className="text-[12px] leading-[1.75]" style={{ color: C.text }}>{sp.note}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── WIND EMBED ─────────────────────────────────── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b" style={{ borderColor: C.border }}>
        <FadeIn>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.muted }}>
            Live Wind — Migration Conditions Now
          </p>
          <p className="font-mono text-[11px] mb-6" style={{ color: C.muted }}>
            Birds read wind the way sailors do. North winds push autumn migration south through the strait. 
            South winds halt it. The Saharan sirocco can ground thousands of birds for days.
          </p>
        </FadeIn>
        <div className="rounded overflow-hidden" style={{ height: 400, border: `1px solid ${C.border}` }}>
          <iframe
            src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=32.5&lon=-7.0&detailLat=35.98&detailLon=-5.60&detail=true&pressure=true&message=true"
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Live wind conditions over Morocco"
          />
        </div>
        <p className="font-mono text-[10px] mt-2" style={{ color: C.muted }}>
          Source: Windy.com · ECMWF forecast model · Live
        </p>
      </section>

      {/* ── READING NOTES ──────────────────────────────── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b" style={{ borderColor: C.border }}>
        <p className="font-mono text-[10px] uppercase tracking-widest mb-8" style={{ color: C.muted }}>
          Reading Notes
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FadeIn>
            <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.gold }}>
              Why More Than France
            </p>
            <p className="text-[12px] leading-[1.75]" style={{ color: C.text }}>
              Morocco's 500+ species exceed France's and Spain's totals because it straddles four biomes 
              simultaneously: Mediterranean, Atlantic, Saharan, and sub-Saharan. A single day's birding can 
              move through wetland, coastal scrub, argan forest, and semi-desert. The overlap creates 
              an extraordinary concentration of habitat types in a small geography.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.green }}>
              The Ramsar Chain
            </p>
            <p className="text-[12px] leading-[1.75]" style={{ color: C.text }}>
              Morocco has 24 Ramsar-designated wetlands. Five of the key birding sites — Merja Zerga, 
              Sidi Bourhaba, Souss-Massa, Oued Massa, Khnifiss — are formally protected under international law. 
              The designation matters: it gives local water managers a legal framework against drainage and 
              provides international funding mechanisms for habitat restoration.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: "#9b8db0" }}>
              The Night Crossing
            </p>
            <p className="text-[12px] leading-[1.75]" style={{ color: C.text }}>
              Passerines — warblers, flycatchers, redstarts — cross the strait at night. They navigate by 
              stars and magnetic field, trusting darkness to protect them from raptors that cross by day on 
              the same thermals. The predator-prey arms race has produced a system where the sky above 
              the strait belongs to different species at different hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── JOURNEY CTA ────────────────────────────────── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-10 border-b" style={{ borderColor: C.border }}>
        <FadeIn>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="font-mono text-[12px]" style={{ color: C.muted }}>
              The birding routes we build cross wetlands most tourists never see.
            </p>
            <Link href="/plan-your-trip"
              className="font-mono text-[11px] uppercase tracking-widest border px-6 py-3 hover:bg-black hover:text-white transition-colors"
              style={{ borderColor: C.ink, color: C.ink }}>
              Plan a birding journey →
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── SOURCES ────────────────────────────────────── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-12" style={{ background: "#1a1a1a" }}>
        <div className="max-w-[640px]">
          <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
            Sources & Live Data
          </p>
          <p className="text-[11px] leading-[1.75]" style={{ color: "rgba(255,255,255,0.5)" }}>
            Live sightings: eBird / Cornell Lab of Ornithology, updated daily (api.ebird.org). 
            Seasonal presence data: BirdLife International datazone, Bergier & Thévenot <em>Oiseaux du Maroc</em> (2006), 
            GREPOM (Groupe de Recherche pour la Protection des Oiseaux au Maroc). 
            Site significance: IBA (Important Bird Areas) database, BirdLife International. 
            Wind data: Windy.com / ECMWF. Population figures: IUCN Red List 2024.
            Migration bottleneck data: HawkWatch International, SEO/BirdLife Gibraltar counts.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.gold }}>
            © Slow Morocco · J. Ng
          </p>
        </div>
      </section>

    </div>
  );
}
