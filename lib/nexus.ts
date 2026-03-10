// ============================================
// Formerly Nexus — now self-contained
// Newsletter uses Slow Morocco's own Supabase
// Legal content and content sites are hardcoded
// ============================================

import { supabase } from "./supabase";

const BRAND_NAME = "Slow Morocco";

function generateUnsubscribeToken(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// ============================================
// NEWSLETTER (uses Slow Morocco's own Supabase)
// ============================================

export async function subscribeToNewsletter(
  email: string,
  brand?: string
): Promise<{ success: boolean; message: string; isResubscribe?: boolean }> {
  const brandName = brand || BRAND_NAME;

  try {
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("brand", brandName)
      .maybeSingle();

    if (existing) {
      if (existing.status === "active") {
        return { success: true, message: "You're already subscribed." };
      }

      await supabase
        .from("newsletter_subscribers")
        .update({ status: "active", updated_at: new Date().toISOString() })
        .eq("id", existing.id);

      return {
        success: true,
        message: "Welcome back.",
        isResubscribe: true,
      };
    }

    const token = generateUnsubscribeToken();
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: email.toLowerCase(),
      brand: brandName,
      status: "active",
      unsubscribe_token: token,
    });

    if (error) throw error;

    return { success: true, message: "You're in." };
  } catch (error) {
    console.error("[Newsletter] Error subscribing:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function unsubscribeFromNewsletter(
  token: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("unsubscribe_token", token)
      .maybeSingle();

    if (!existing) {
      return { success: false, message: "Invalid or expired link." };
    }

    if (existing.status === "unsubscribed") {
      return { success: true, message: "You've already been removed." };
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({
        status: "unsubscribed",
        unsubscribed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) throw error;

    return { success: true, message: "You've been removed." };
  } catch (error) {
    console.error("[Newsletter] Error unsubscribing:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// ============================================
// LEGAL PAGES (hardcoded — no database)
// ============================================

export interface NexusSite {
  site_id: string;
  site_name: string;
  site_url: string;
  legal_entity: string;
  contact_email: string;
  contact_phone: string | null;
  whatsapp: string | null;
  jurisdiction_country: string;
  jurisdiction_city: string;
  address_line1: string;
  address_line2: string;
  site_type: string;
  parent_brand: string | null;
}

export interface NexusLegalPage {
  page_id: string;
  page_title: string;
  section_order: number;
  section_title: string;
  section_content: string;
}

const SITE_CONFIG: NexusSite = {
  site_id: "slow-morocco",
  site_name: "Slow Morocco",
  site_url: "https://slowmorocco.com",
  legal_entity: "Slow Morocco SARL",
  contact_email: "hello@slowmorocco.com",
  contact_phone: null,
  whatsapp: null,
  jurisdiction_country: "Morocco",
  jurisdiction_city: "Marrakech",
  address_line1: "35 Derb Fhal Zfriti Kennaria",
  address_line2: "Marrakech 40000 Morocco",
  site_type: "travel",
  parent_brand: null,
};

const LEGAL_PAGES: Record<string, { title: string; sections: { order: number; title: string; content: string }[] }> = {
  terms: {
    title: "Terms of Service",
    sections: [
      { order: 1, title: "Agreement", content: "By accessing or using https://slowmorocco.com, operated by Slow Morocco SARL, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services." },
      { order: 2, title: "Services", content: "Slow Morocco provides services as described on our website. All content, features, and functionality are owned by Slow Morocco SARL and are protected by international copyright, trademark, and other intellectual property laws." },
      { order: 3, title: "User Responsibilities", content: "You agree to provide accurate and complete information, maintain the confidentiality of your account, comply with all applicable laws, and not misuse or attempt to disrupt our services." },
      { order: 4, title: "Intellectual Property", content: "All content on this site, including text, graphics, logos, images, photography, videos, and design, is the property of Slow Morocco SARL and is protected by copyright laws." },
      { order: 5, title: "Limitation of Liability", content: "To the maximum extent permitted by law, Slow Morocco SARL shall not be liable for indirect, incidental, or consequential damages arising from use of our services." },
      { order: 6, title: "Governing Law", content: "These terms are governed by the laws of Morocco. Any disputes shall be resolved in the courts of Marrakech." },
      { order: 7, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      { order: 1, title: "Introduction", content: "Slow Morocco SARL (\"we\", \"us\", or \"our\") respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you visit https://slowmorocco.com." },
      { order: 2, title: "Information We Collect", content: "Information you provide: contact information (name, email, phone, WhatsApp), booking information (travel dates, preferences), and communications you send us. Information collected automatically: device information, usage data, and cookies." },
      { order: 3, title: "How We Use Your Information", content: "To process and manage your bookings, communicate with you about inquiries and reservations, send confirmations and documents, and improve our website and services." },
      { order: 4, title: "Your Rights", content: "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@slowmorocco.com." },
      { order: 5, title: "Data Security", content: "We implement appropriate security measures including SSL/TLS encryption and secure payment processing." },
      { order: 6, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    sections: [
      { order: 1, title: "General", content: "The information provided on https://slowmorocco.com by Slow Morocco SARL is for general informational purposes only. This content does not constitute professional travel, medical, legal, or financial advice." },
      { order: 2, title: "Accuracy", content: "While we make every effort to ensure information is accurate and up-to-date, we cannot guarantee completeness. Conditions and regulations change frequently. Prices and availability are subject to change." },
      { order: 3, title: "Independent Resource", content: "This is an independent resource. We are not affiliated with any government agency or official institution. Information may change\u2014please verify before travel." },
      { order: 4, title: "Photography", content: "Images on this site are representative of destinations and experiences. They may not reflect current conditions and should not be relied upon as exact representations." },
      { order: 5, title: "Limitation of Liability", content: "Slow Morocco SARL shall not be liable for any damages arising from use or inability to use this site, reliance on information provided, or errors or omissions in content." },
      { order: 6, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
  "intellectual-property": {
    title: "Intellectual Property",
    sections: [
      { order: 1, title: "Ownership", content: "All intellectual property on https://slowmorocco.com is owned by or licensed to Slow Morocco SARL." },
      { order: 2, title: "Trademarks", content: "Protected content includes the Slow Morocco name and logo, related brand names and slogans, and service marks." },
      { order: 3, title: "Copyrighted Material", content: "Website design and layout, written content and copy, photography and images, videos and multimedia, and descriptions are all protected." },
      { order: 4, title: "Permitted Use", content: "You may view content for personal, non-commercial use, share links to our pages, print pages for personal reference, and quote brief excerpts with proper attribution." },
      { order: 5, title: "Prohibited Use", content: "Without written permission, you may not copy, reproduce, or duplicate content, modify or create derivative works, distribute or use content commercially, remove copyright notices, or scrape content using automated tools." },
      { order: 6, title: "Permission Requests", content: "To request permission to use our content, contact hello@slowmorocco.com with subject line 'IP License Request'." },
      { order: 7, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
};

export async function getNexusSite(): Promise<NexusSite> {
  return SITE_CONFIG;
}

export async function getNexusLegalPages(): Promise<NexusLegalPage[]> {
  const all: NexusLegalPage[] = [];
  for (const [pageId, page] of Object.entries(LEGAL_PAGES)) {
    for (const section of page.sections) {
      all.push({
        page_id: pageId,
        page_title: page.title,
        section_order: section.order,
        section_title: section.title,
        section_content: section.content,
      });
    }
  }
  return all;
}

export async function getNexusLegalPage(
  pageId: string
): Promise<NexusLegalPage[]> {
  const page = LEGAL_PAGES[pageId];
  if (!page) return [];
  return page.sections.map((s) => ({
    page_id: pageId,
    page_title: page.title,
    section_order: s.order,
    section_title: s.title,
    section_content: s.content,
  }));
}

// No-op — variables already resolved in hardcoded content
export function resolveVariables(text: string, _site: NexusSite): string {
  return text;
}

export async function getNexusSetting(
  _key: string
): Promise<string | null> {
  return null;
}

// ============================================
// CONTENT SITES (hardcoded — empty for now)
// ============================================

export interface NexusContentSite {
  id: number;
  site_label: string;
  site_url: string;
  display_order: number;
  is_active: boolean;
}

export async function getNexusContentSites(): Promise<NexusContentSite[]> {
  return [];
}
