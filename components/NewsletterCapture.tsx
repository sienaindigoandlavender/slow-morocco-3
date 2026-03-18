"use client";

import { useState } from "react";

export default function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source_page: window.location.pathname,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="py-16 md:py-24 text-center">
        <p className="font-sans text-sm text-muted-foreground">
          Check your inbox to confirm.
        </p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 text-center">
      <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
        The Edit
      </h3>
      <p className="font-sans text-sm text-muted-foreground mb-8">
        One story about Morocco, every week. Free.
      </p>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 px-6"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Your email"
          className="flex-1 px-4 py-3 text-sm border border-foreground/15 bg-transparent focus:outline-none focus:border-foreground/40 transition-colors"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 text-sm border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-sm text-red-600 mt-3">
          Something went wrong. Try again.
        </p>
      )}
    </section>
  );
}
