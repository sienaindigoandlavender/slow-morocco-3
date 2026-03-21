import Link from "next/link";
import { getSections, getList } from "@/lib/data";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import SlowWaySouth from "@/components/SlowWaySouth";
import BeyondTheWallsCarousel from "@/components/BeyondTheWallsCarousel";

export default async function Home() {
  const [sections, testimonials, beyondTheWalls] = await Promise.all([
    getSections("home"),
    getList("testimonials"),
    getList("beyond_the_walls"),
  ]);

  const hero = sections["hero"];
  const welcome = sections["welcome"];
  const rooms = sections["rooms"];
  const filter = sections["filter"];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-16 bg-[hsl(var(--sand))]">
        {hero?.Image_URL && (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero.Image_URL})` }} />
            <img src={hero.Image_URL} alt="Riad di Siena, a 300-year-old traditional riad in the heart of Marrakech medina" className="sr-only" aria-hidden="true" />
          </>
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
            {hero?.Title || "Riad di Siena"}
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
            {hero?.Subtitle || ""}
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      {welcome && (
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-8">{welcome.Title}</h2>
            <p className="text-lg leading-relaxed opacity-80">{welcome.Body}</p>
            {welcome.Button_Text && welcome.Button_Link && (
              <Link href={welcome.Button_Link} className="inline-block mt-8 text-sm tracking-widest border-b border-current pb-1 hover:opacity-70 transition-opacity">
                {welcome.Button_Text}
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Rooms Preview */}
      {rooms && (
        <section className="py-20 md:py-32 bg-[hsl(var(--secondary))] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl mb-4">{rooms.Title}</h2>
              <p className="opacity-60 max-w-xl mx-auto">{rooms.Subtitle}</p>
            </div>
            <div className="text-center">
              <Link href={rooms.Button_Link || "/rooms"} className="inline-block px-8 py-3 text-sm tracking-widest border border-current hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] transition-colors">
                {rooms.Button_Text || "VIEW ROOMS"}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-16">What Guests Say</h2>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* The Slow Way South - Syndicated Journey */}
      <SlowWaySouth />

      {/* Beyond the Walls */}
      {beyondTheWalls.length > 0 && (
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl mb-4">Beyond the Walls</h2>
              <p className="opacity-60 max-w-xl mx-auto">The riad is just the beginning. Discover the places we love.</p>
            </div>
            <BeyondTheWallsCarousel properties={beyondTheWalls} />
          </div>
        </section>
      )}

      {/* The Filter Section */}
      {filter && (
        <section className="py-20 md:py-32 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-8">{filter.Title}</h2>
            <p className="text-lg leading-relaxed opacity-80 mb-8">{filter.Body}</p>
            {filter.Button_Text && filter.Button_Link && (
              <Link href={filter.Button_Link} className="inline-block px-8 py-3 text-sm tracking-widest border border-current hover:bg-[hsl(var(--background))] hover:text-[hsl(var(--foreground))] transition-colors">
                {filter.Button_Text}
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Derb City Guide */}
      <section className="py-16 md:py-20 bg-[#1C1917] text-[#FAF9F6]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <a href="https://www.slowmorocco.com/stories/the-three-glasses" target="_blank" rel="noopener noreferrer" className="group block">
            <p className="text-[#C2410C] text-xs tracking-[0.3em] uppercase mb-6">01</p>
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#FAF9F6] group-hover:text-[#FAF9F6]/80 transition-colors mb-6" style={{ fontStyle: 'italic' }}>
              Is it rude to refuse tea?
            </p>
            <p className="text-[#A8A29E] text-sm leading-relaxed max-w-md mx-auto mb-8">
              Tea is a social contract. Offering it means you're being received as a guest.
            </p>
            <span className="inline-flex items-center gap-2 text-[#C2410C] text-xs tracking-[0.2em] group-hover:gap-3 transition-all">
              Read more <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
          <div className="mt-10 pt-6 border-t border-[#FAF9F6]/10">
            <a href="https://www.slowmorocco.com" target="_blank" rel="noopener noreferrer" className="text-[#78716C] text-xs tracking-[0.2em] hover:text-[#A8A29E] transition-colors">
              DERB — 57 QUESTIONS ABOUT MOROCCO
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
