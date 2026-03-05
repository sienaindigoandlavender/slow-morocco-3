"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

// Routes that should NOT have the main header/footer
const LANDING_PAGE_ROUTES = ["/go"];

// Routes where WhatsApp button appears — commercial/booking intent only
const WHATSAPP_ROUTES = [
  "/journeys",
  "/plan-your-trip",
  "/day-trips",
  "/epic",
  "/overnight",
];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLandingPage = LANDING_PAGE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isLandingPage) {
    return <>{children}</>;
  }

  const showWhatsApp = WHATSAPP_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {showWhatsApp && <WhatsAppButton />}
    </>
  );
}
