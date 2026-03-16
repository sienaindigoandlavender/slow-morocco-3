"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cmd/Ctrl + K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Fixed header bar ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          menuOpen
            ? "bg-transparent"
            : scrolled
            ? "bg-background/95 backdrop-blur-sm"
            : "bg-gradient-to-b from-black/30 to-transparent"
        }`}
      >
        <div className="px-6 md:px-10 lg:px-14">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="relative z-[60]"
            >
              <span
                className={`text-[13px] tracking-[0.25em] uppercase transition-colors duration-500 ${
                  menuOpen
                    ? "text-[#2a2a25]"
                    : scrolled
                    ? "text-foreground"
                    : "text-white"
                }`}
              >
                Slow Morocco
              </span>
            </Link>

            {/* Burger — all screen sizes */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-[60] w-8 h-8 flex flex-col items-end justify-center gap-[5px] group"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block h-[1.5px] transition-all duration-500 origin-right ${
                  menuOpen
                    ? "w-6 bg-[#2a2a25] rotate-[-40deg] translate-y-[0.5px]"
                    : `w-7 ${scrolled ? "bg-foreground" : "bg-white"} group-hover:w-6`
                }`}
              />
              <span
                className={`block h-[1.5px] transition-all duration-500 origin-right ${
                  menuOpen
                    ? "w-6 bg-[#2a2a25] rotate-[40deg] translate-y-[-0.5px]"
                    : `w-5 ${scrolled ? "bg-foreground" : "bg-white"} group-hover:w-6`
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen menu overlay ─────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Sage background */}
        <div
          className={`absolute inset-0 bg-[#c8c4b8] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
            menuOpen ? "scale-y-100" : "scale-y-0"
          }`}
        />

        {/* Menu content */}
        <div
          className={`relative z-10 h-full flex flex-col justify-between px-6 md:px-10 lg:px-14 pt-24 md:pt-28 pb-10 transition-opacity duration-500 delay-200 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Main content area — nav left, categories right */}
          <div className="flex flex-col md:flex-row md:gap-24 lg:gap-40 flex-grow">

            {/* Left column — Navigation */}
            <nav className="flex flex-col gap-1 md:gap-2 mb-10 md:mb-0">
              {[
                { href: "/morocco", label: "Morocco" },
                { href: "/stories", label: "Stories" },
                { href: "/places", label: "Places" },
                { href: "/destinations", label: "Destinations" },
                { href: "/journeys", label: "Journeys" },
                { href: "/epic", label: "Epic" },
                { href: "/stories/category/before-you-go", label: "Before You Go" },
                { href: "/darija", label: "Darija" },
                { href: "/plan-your-trip", label: "Plan a Trip" },
                { href: "/about", label: "About" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-[#2a2a25] hover:text-[#2a2a25]/60 transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-6 flex flex-col gap-1">
                {[
                  { href: "/booking-conditions", label: "Booking Conditions" },
                  { href: "/payments", label: "Payments" },
                  { href: "/cancellations-and-refunds", label: "Cancellations & Refunds" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-[#2a2a25]/50 hover:text-[#2a2a25]/80 transition-colors py-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right column — Categories in large serif + search at bottom */}
            <div className="flex flex-col justify-between flex-grow">
              <div className="flex flex-col gap-0">
                {[
                  { href: "/stories/category/history", label: "History" },
                  { href: "/stories/category/architecture", label: "Architecture" },
                  { href: "/stories/category/culture", label: "Culture" },
                  { href: "/stories/category/food", label: "Food" },
                  { href: "/stories/category/craft", label: "Craft" },
                  { href: "/stories/category/music", label: "Music" },
                  { href: "/stories/category/people", label: "People" },
                  { href: "/stories/category/nature", label: "Nature" },
                  { href: "/stories/category/sacred", label: "Sacred" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-2xl md:text-3xl lg:text-[2.5rem] text-[#2a2a25] hover:text-[#2a2a25]/50 transition-colors leading-[1.35]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Search input — underline only, bottom right */}
              <div className="mt-auto pt-8">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length >= 2) {
                      setMenuOpen(false);
                      setTimeout(() => setSearchOpen(true), 400);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.length >= 1) {
                      setMenuOpen(false);
                      setTimeout(() => setSearchOpen(true), 400);
                    }
                  }}
                  className="w-full max-w-xs bg-transparent border-0 border-b border-[#2a2a25]/30 focus:border-[#2a2a25]/60 text-sm text-[#2a2a25] placeholder:text-[#2a2a25]/40 py-2 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => { setSearchOpen(false); setSearchQuery(""); }} initialQuery={searchQuery} />
    </>
  );
}
