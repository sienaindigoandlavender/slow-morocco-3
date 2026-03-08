"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Currency options
const currencies = [
  { code: "EUR", symbol: "€" },
  { code: "USD", symbol: "$" },
  { code: "GBP", symbol: "£" },
  { code: "MAD", symbol: "DH" },
];



interface FooterLink {
  label: string;
  href: string | null;
  type?: string;
}

interface FooterColumn {
  number: number;
  title: string;
  links: FooterLink[];
}

interface FooterData {
  brandId: string;
  newsletter: {
    show: boolean;
    backgroundImage: string;
    title: string;
    description: string;
    brandName: string;
  };
  columns: FooterColumn[];
  contentSites: { label: string; url: string }[];
  legal: FooterLink[];
  copyright: {
    year: number;
    name: string;
  };
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  
  // Currency state
  const [currentCurrency, setCurrentCurrency] = useState("EUR");

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFooterData(data.data);
        }
      })
      .catch((err) => console.error("Footer fetch error:", err));
  }, []);

  // Load saved currency preference
  useEffect(() => {
    const savedCurrency = localStorage.getItem("slowmorocco_currency");
    if (savedCurrency) setCurrentCurrency(savedCurrency);
  }, []);

  // Clean up any stale Google Translate cookies
  useEffect(() => {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.slowmorocco.com";
    localStorage.removeItem("slowmorocco_language");
  }, []);



  const handleCurrencyChange = (code: string) => {
    setCurrentCurrency(code);
    localStorage.setItem("slowmorocco_currency", code);
    window.dispatchEvent(new CustomEvent("currencyChange", { detail: code }));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubscribing) return;

    setIsSubscribing(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  // Fallback values
  const newsletter = footerData?.newsletter || {
    show: true,
    backgroundImage: "",
    title: "Stay curious",
    description: "Stories, routes, and cultural insights from Morocco.",
    brandName: "Slow Morocco",
  };

  const columns = footerData?.columns || [];
  const contentSites = footerData?.contentSites || [];
  const legal = footerData?.legal || [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cancellation", href: "/cancellation-policy" },
    { label: "Glossary", href: "/glossary" },
  ];
  const copyright = footerData?.copyright || {
    year: new Date().getFullYear(),
    name: "Slow Morocco",
  };

  return (
    <footer>
      {/* ═══════════════════════════════════════════════════════════════
          LEVEL 1: Newsletter — Kinfolk inline bar
          ═══════════════════════════════════════════════════════════════ */}
      {newsletter.show && (
        <section className="border-t border-foreground/10 bg-background">
          <div className="px-8 md:px-10 lg:px-14 py-8 md:py-10">
            {subscribed ? (
              <p className="font-serif text-lg text-foreground/60">
                Thank you. Your first story arrives next week.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col md:flex-row md:items-baseline justify-between gap-6"
              >
                <p className="font-serif text-lg md:text-xl text-foreground shrink-0">
                  One story about Morocco, every week.
                </p>
                <div className="flex items-center gap-4 flex-1 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    disabled={isSubscribing}
                    className="flex-1 bg-transparent border-b border-foreground/20 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="text-[11px] tracking-[0.12em] uppercase text-foreground/50 hover:text-foreground transition-colors shrink-0"
                  >
                    {isSubscribing ? "..." : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          LEVEL 2: Navigation (from API columns)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#161616]">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <span className="font-serif text-sm tracking-[0.2em] text-white">
                  {newsletter.brandName.toUpperCase()}
                </span>
              </Link>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                Private cultural journeys through Morocco, shaped around what matters to you.
              </p>
            </div>

            {/* Dynamic Columns from API */}
            {columns.slice(1, 4).map((column, colIdx) => (
              <div key={column.number}>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-5">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.slice(0, 5).map((link, idx) => (
                    <li key={idx}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="text-sm text-white/60 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span className="text-sm text-white/40">{link.label}</span>
                      )}
                    </li>
                  ))}
                  {/* Brand-specific: Contact Us on last column */}
                  {colIdx === columns.slice(1, 4).length - 1 && (
                    <li>
                      <Link
                        href="/contact"
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        Contact Us
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}

            {/* Fallback columns if API returns empty */}
            {columns.length === 0 && (
              <>
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-5">
                    Explore
                  </h4>
                  <ul className="space-y-3">
                    <li><Link href="/journeys" className="text-sm text-white/60 hover:text-white transition-colors">Journeys</Link></li>
                    <li><Link href="/epic" className="text-sm text-white/60 hover:text-white transition-colors">Epic</Link></li>
                    <li><Link href="/stories" className="text-sm text-white/60 hover:text-white transition-colors">Stories</Link></li>
                    <li><Link href="/places" className="text-sm text-white/60 hover:text-white transition-colors">Places</Link></li>
                    <li><Link href="/glossary" className="text-sm text-white/60 hover:text-white transition-colors">Glossary</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-5">
                    About Morocco
                  </h4>
                  <ul className="space-y-3">
                    <li><Link href="/stories" className="text-sm text-white/60 hover:text-white transition-colors">All Stories</Link></li>
                    <li><Link href="/life" className="text-sm text-white/60 hover:text-white transition-colors">Life — Data</Link></li>
                    <li><Link href="/travel" className="text-sm text-white/60 hover:text-white transition-colors">Travel — Planning</Link></li>
                    <li><Link href="/visa-info" className="text-sm text-white/60 hover:text-white transition-colors">Visa Information</Link></li>
                    <li><Link href="/health-safety" className="text-sm text-white/60 hover:text-white transition-colors">Health &amp; Safety</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-5">
                    Plan &amp; Book
                  </h4>
                  <ul className="space-y-3">
                    <li><Link href="/plan-your-trip" className="text-sm text-white/60 hover:text-white transition-colors">Plan Your Trip</Link></li>
                    <li><Link href="/faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</Link></li>
                    <li><Link href="/whats-included" className="text-sm text-white/60 hover:text-white transition-colors">What's Included</Link></li>
                    <li><Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors">Who We Are</Link></li>
                    <li><Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link></li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LEVEL 3: Content Network (from Nexus)
          ═══════════════════════════════════════════════════════════════ */}
      {contentSites.length > 0 && (
        <section className="py-8 bg-[#141414]">
          <div className="container mx-auto px-8 md:px-16 lg:px-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-8">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/20">
                Explore
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {contentSites.map((site, idx) => (
                  <a
                    key={idx}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-[0.1em] text-white/40 hover:text-white/70 transition-colors"
                  >
                    {site.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          LEVEL 4: Slow World Network
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-8 bg-[#121212]">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-8">
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/20">
              Slow World
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href="https://slowmauritius.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] text-white/40 hover:text-white/70 transition-colors"
              >
                Mauritius
              </a>
              <a
                href="https://slownamibia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] text-white/40 hover:text-white/70 transition-colors"
              >
                Namibia
              </a>
              <a
                href="https://slowtunisia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] text-white/40 hover:text-white/70 transition-colors"
              >
                Tunisia
              </a>
              <a
                href="https://slowturkiye.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] text-white/40 hover:text-white/70 transition-colors"
              >
                Türkiye
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LEVEL 5: Legal & Copyright (from Nexus)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-6 bg-[#0e0e0e]">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legal.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href || "#"}
                  className="text-[10px] tracking-[0.1em] uppercase text-white/30 hover:text-white/50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Right side: Language, Currency, Copyright */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Currency selector */}
              <select
                value={currentCurrency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="bg-transparent text-[10px] tracking-[0.1em] uppercase text-white/30 hover:text-white/50 focus:outline-none cursor-pointer appearance-none pr-3"
                style={{ backgroundImage: 'none' }}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code} className="bg-[#0e0e0e] text-white/50">
                    {currency.symbol} {currency.code}
                  </option>
                ))}
              </select>
              
              {/* Copyright */}
              <p className="text-[10px] tracking-[0.1em] text-white/20">
                © {copyright.year} {copyright.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LEVEL 6: Powered by
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-2.5 bg-[#080808]">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <p className="text-[9px] tracking-[0.15em] uppercase text-white/50 text-center">
            Powered by <a href="https://www.dancingwiththelions.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">Dancing with Lions</a>
          </p>
        </div>
      </section>

    </footer>
  );
}
