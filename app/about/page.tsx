import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Slow Morocco",
  description:
    "Slow Morocco is a cultural intelligence platform on Morocco — 222 stories, 120+ places, living archives on language, food, textiles, architecture, and music.",
  openGraph: {
    title: "About Slow Morocco",
    description:
      "Slow Morocco is a cultural intelligence platform on Morocco — 222 stories, 120+ places, living archives on language, food, textiles, architecture, and music.",
    url: "https://www.slowmorocco.com/about",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-10">
              About
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground mb-0">
              Morocco has been studied.<br />
              We read it differently.
            </h1>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <div className="max-w-2xl space-y-8 text-lg text-foreground leading-relaxed">

            <p>
              Slow Morocco is a cultural intelligence platform. It covers the country
              the way a historian and a resident would — not a guidebook, not a blog,
              not a magazine. Something closer to a living archive.
            </p>

            <p>
              222 stories. 120 places. Reference works on language, food, textiles,
              architecture, and music. Private journeys for those who want to move
              through the material rather than past it.
            </p>

            <p>
              The work is built on 11 years inside Morocco — inside its medinas, its
              markets, its kitchens, its craft workshops, its libraries. The things
              that took years to understand are the things that take minutes to read here.
            </p>

            <p>
              The standard Morocco content tells you where to eat and what to wear.
              We go further back. How the dye got into the leather. Who built the tower
              and why it stopped. What the carpet is actually saying. What the salt
              caravans moved before salt.
            </p>

            <p>
              This is not the only Morocco. It is a particular Morocco — the one that
              reveals itself slowly, to those paying attention.
            </p>

          </div>
        </div>
      </section>

      {/* What lives here */}
      <section className="py-24 md:py-32 border-t border-foreground/10">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 max-w-4xl">
            {[
              {
                title: "Stories",
                body: "222 cultural essays across history, architecture, food, craft, nature, music, and people. Specific facts. No museum voice.",
                href: "/stories",
              },
              {
                title: "Places",
                body: "120+ places documented with context — not ratings, not reviews. Where things are and what they mean.",
                href: "/places",
              },
              {
                title: "Journeys",
                body: "Private cultural journeys for those who want the knowledge made physical. Designed around the content, not the other way around.",
                href: "/journeys",
              },
              {
                title: "Morocco",
                body: "A reference layer on the country itself — geography, regions, cities, when to go, how it works.",
                href: "/morocco",
              },
            ].map((item) => (
              <div key={item.title}>
                <h2 className="font-serif text-2xl text-foreground mb-3">
                  <Link href={item.href} className="hover:text-foreground/60 transition-colors">
                    {item.title} →
                  </Link>
                </h2>
                <p className="text-foreground/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="border-t border-foreground/10 py-16">
        <div className="container mx-auto px-8 md:px-16 lg:px-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-foreground/50 text-sm">
            Questions, commissions, research enquiries.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-foreground/20 px-8 py-3 text-xs tracking-[0.15em] uppercase hover:border-foreground transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

    </div>
  );
}
