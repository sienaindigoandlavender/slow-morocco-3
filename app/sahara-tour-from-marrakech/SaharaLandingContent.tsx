"use client";

import Image from "next/image";
import type { ItineraryDay } from "./page";

interface SaharaLandingContentProps {
  itinerary: ItineraryDay[];
}

export default function SaharaLandingContent({ itinerary }: SaharaLandingContentProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <div className="relative w-full h-[60vh] md:h-[75vh]">
        <Image
          src="https://res.cloudinary.com/do2ojyohc/image/upload/v1774039524/Camel_caravan_crossing_Saharan_dunes_wngjzj.png"
          alt="Camel caravan crossing Saharan dunes"
          fill
          className="object-cover"
          priority
        />
      </div>

      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <h1
          className="text-4xl md:text-6xl font-normal mb-6"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Sahara Tour from Marrakech
        </h1>
        <p className="text-lg text-[#78716C] max-w-2xl mb-16">
          A 3-day desert circuit through the High Atlas and into the Sahara.
        </p>

        <div className="space-y-16">
          {itinerary.map((day) => (
            <div key={day.dayNumber} className="border-t border-[#E5E2DD] pt-8">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-sm font-medium text-[#C2410C] tracking-wide uppercase">
                  Day {day.dayNumber}
                </span>
                {day.travelTimeHours != null && day.travelTimeHours > 0 && (
                  <span className="text-sm text-[#78716C]">
                    {day.travelTimeHours}h travel
                  </span>
                )}
              </div>

              <h2
                className="text-2xl md:text-3xl font-normal text-[#1C1917] mb-2"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {day.dayTitle || `${day.fromCity} to ${day.toCity}`}
              </h2>

              {day.fromCity && day.toCity && day.dayTitle && (
                <p className="text-sm text-[#78716C] mb-4">
                  {day.fromCity} &rarr; {day.toCity}
                </p>
              )}

              {day.description && (
                <p className="text-[#1C1917] leading-relaxed max-w-3xl mb-4">
                  {day.description}
                </p>
              )}

              {day.activities && (
                <p className="text-sm text-[#78716C]">
                  <span className="font-medium text-[#1C1917]">Activities:</span>{" "}
                  {day.activities}
                </p>
              )}
            </div>
          ))}

          {itinerary.length === 0 && (
            <p className="text-[#78716C]">Itinerary details coming soon.</p>
          )}
        </div>
      </section>
    </div>
  );
}
