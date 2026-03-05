"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

interface PlacePin {
  slug: string;
  title: string;
  category: string;
  destination: string;
  excerpt: string;
  hero_image: string;
  latitude: number;
  longitude: number;
}

interface Props {
  places: PlacePin[];
  total: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Architecture:  "#c9a96e",
  Nature:        "#7aad6e",
  Culture:       "#e07b5a",
  History:       "#9b8db0",
  Food:          "#d4885c",
  Sacred:        "#6eaab0",
  Craft:         "#b09b6e",
  Market:        "#d4b96e",
  Museum:        "#8db09b",
};

const DEFAULT_COLOR = "#c9a96e";

function getCategoryColor(cat: string): string {
  for (const [key, val] of Object.entries(CATEGORY_COLORS)) {
    if (cat.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return DEFAULT_COLOR;
}

export default function AllPlacesMap({ places, total }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const [selected, setSelected] = useState<PlacePin | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [count, setCount] = useState(places.length);

  // Unique categories
  const categories = ["All", ...Array.from(new Set(places.map((p) => p.category).filter(Boolean))).sort()];

  const initMap = useCallback(async () => {
    if (!mapContainer.current || map.current) return;
    if (!mapboxgl) {
      const mb = await import("mapbox-gl");
      if (!document.getElementById("mapbox-gl-css")) {
        const link = document.createElement("link");
        link.id = "mapbox-gl-css";
        link.rel = "stylesheet";
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
        document.head.appendChild(link);
      }
      mapboxgl = mb.default;
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-6.5, 31.5],
      zoom: 5.2,
      minZoom: 4,
      maxZoom: 16,
      projection: "mercator",
    });

    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
    map.current.scrollZoom.enable();

    map.current.on("load", () => {
      setMapLoaded(true);
    });
  }, []);

  // Place markers
  const placeMarkers = useCallback((filter: string) => {
    if (!map.current || !mapLoaded) return;

    // Remove existing
    markers.current.forEach((m) => m.remove());
    markers.current = [];

    const visible = filter === "All" ? places : places.filter((p) => p.category === filter);
    setCount(visible.length);

    visible.forEach((place) => {
      const color = getCategoryColor(place.category);

      // Dot element
      const el = document.createElement("div");
      el.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${color};
        border: 1.5px solid rgba(255,255,255,0.4);
        cursor: pointer;
        transition: transform 0.15s ease, background 0.15s ease;
        box-shadow: 0 0 8px ${color}66;
      `;

      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(2)";
        el.style.background = "#ffffff";
        el.style.zIndex = "999";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
        el.style.background = color;
        el.style.zIndex = "1";
      });
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelected(place);
        map.current.easeTo({
          center: [place.longitude, place.latitude],
          zoom: Math.max(map.current.getZoom(), 7),
          duration: 600,
          offset: [120, 0],
        });
      });

      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map.current);

      markers.current.push(marker);
    });
  }, [places, mapLoaded]);

  useEffect(() => { initMap(); }, [initMap]);
  useEffect(() => { if (mapLoaded) placeMarkers(activeCategory); }, [mapLoaded, activeCategory, placeMarkers]);

  // Close panel on map click
  useEffect(() => {
    if (!map.current) return;
    const handler = () => setSelected(null);
    map.current.on("click", handler);
    return () => { if (map.current) map.current.off("click", handler); };
  }, [mapLoaded]);

  return (
    <div className="relative w-full bg-[#0e0e0e]" style={{ height: "100dvh" }}>

      {/* Map */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)" }}>
        <div className="flex items-center gap-4">
          <Link href="/places"
            className="text-[10px] tracking-[0.25em] uppercase text-white/50 hover:text-white/80 transition-colors">
            ← All Places
          </Link>
          <span className="text-white/20">|</span>
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/50">
            {count} of {total} places
          </p>
        </div>
        <h1 className="font-serif text-white/80 text-sm md:text-base tracking-wide">
          Morocco — All Places
        </h1>
      </div>

      {/* Category filter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 flex-wrap justify-center px-4"
        style={{ maxWidth: "90vw" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-200 rounded-full"
            style={{
              background: activeCategory === cat ? "#ffffff" : "rgba(0,0,0,0.6)",
              color: activeCategory === cat ? "#0e0e0e" : "rgba(255,255,255,0.5)",
              border: `1px solid ${activeCategory === cat ? "#ffffff" : "rgba(255,255,255,0.15)"}`,
              backdropFilter: "blur(8px)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Place panel */}
      <div
        className="absolute top-0 right-0 bottom-0 z-30 flex flex-col transition-transform duration-300 ease-out"
        style={{
          width: "340px",
          background: "#0e0e0e",
          transform: selected ? "translateX(0)" : "translateX(100%)",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {selected && (
          <>
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 text-white/40 hover:text-white/80 transition-colors text-xl leading-none"
            >
              ×
            </button>

            {/* Image */}
            <div className="relative w-full flex-shrink-0" style={{ height: "200px", background: "#1a1a1a" }}>
              {selected.hero_image ? (
                <img
                  src={selected.hero_image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.85 }}
                />
              ) : (
                <div className="w-full h-full" style={{ background: "#1f1f1f" }} />
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0e0e0e 0%, transparent 60%)" }} />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-7 pt-5 pb-8">
              {selected.category && (
                <p className="text-[10px] tracking-[0.2em] uppercase mb-3"
                  style={{ color: getCategoryColor(selected.category) }}>
                  {selected.category}
                  {selected.destination && (
                    <span className="text-white/25"> · {selected.destination}</span>
                  )}
                </p>
              )}
              <h2 className="font-serif text-white text-2xl leading-tight mb-4">
                {selected.title}
              </h2>
              {selected.excerpt && (
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  {selected.excerpt}
                </p>
              )}
              <Link
                href={`/places/${selected.slug}`}
                className="inline-block text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors border-b border-white/15 hover:border-white/40 pb-0.5"
              >
                Read more →
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="absolute top-16 left-4 z-20 hidden md:flex flex-col gap-2 p-3 rounded"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveCategory(activeCategory === cat ? "All" : cat)}>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
            <span className="text-[10px] tracking-[0.1em] uppercase"
              style={{ color: activeCategory === cat || activeCategory === "All" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }}>
              {cat}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
