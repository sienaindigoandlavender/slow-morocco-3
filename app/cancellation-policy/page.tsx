import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Cancellation Policy | Slow Morocco",
  description:
    "Flexible cancellation terms for Slow Morocco private journeys — refund policies, deposit requirements, and how to change or cancel your booking.",
  alternates: {
    canonical: "https://www.slowmorocco.com/cancellation-policy",
  },
};

export default function CancellationPolicyPage() {
  return (
    <LegalPageContent
      pageId="cancellation-policy"
      fallbackTitle="Cancellation Policy"
    />
  );
}
