"use client";

import { useState } from "react";
import Link from "next/link";
import { contact, whatsappLink } from "@/data/contact";

const NEEDS = ["Website", "Online store", "Moe AI receptionist", "App", "Branding", "Social media", "Not sure yet"];
const BUDGETS = ["Under R5k", "R5–10k", "R10–20k", "R20k+", "Monthly service"];
const CHANNELS = ["Zoom", "Phone call", "WhatsApp"];

// Single hand-off point: swap in an email/API POST here later without touching the form.
function send(brief: string) {
  window.open(whatsappLink(brief), "_blank", "noopener,noreferrer");
}

export function TalkForm() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [sentName, setSentName] = useState<string | null>(null);

  const toggle = (need: string) =>
    setNeeds((cur) => (cur.includes(need) ? cur.filter((n) => n !== need) : [...cur, need]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return; // honeypot
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const brief = [
      "Hi MOE Media, I'd like to book 15 minutes.",
      `Name: ${get("name")}`,
      `Business: ${get("business")}`,
      `Phone/WhatsApp: ${get("phone")}`,
      get("email") && `Email: ${get("email")}`,
      needs.length > 0 && `Need: ${needs.join(", ")}`,
      get("budget") && `Budget: ${get("budget")}`,
      `Talk via: ${get("channel")}`,
      get("message") && `Message: ${get("message")}`,
    ]
      .filter(Boolean)
      .join("\n");
    send(brief);
    setSentName(get("name"));
  };

  if (sentName !== null) {
    return (
      <div className="talk-done" role="status">
        <p className="talk-done-title">Thanks {sentName}.</p>
        <p>
          I&apos;ll be in touch within one working day. Want to talk sooner? Call{" "}
          <a href={contact.tel}>{contact.phoneDisplay}</a> and Moe will pick up.
        </p>
      </div>
    );
  }

  return (
    <form className="talk-form" onSubmit={onSubmit}>
      <div className="talk-row">
        <label className="finder-field">
          <span>Name*</span>
          <input name="name" required autoComplete="name" maxLength={60} />
        </label>
        <label className="finder-field">
          <span>Business name*</span>
          <input name="business" required autoComplete="organization" maxLength={80} />
        </label>
      </div>
      <div className="talk-row">
        <label className="finder-field">
          <span>Phone or WhatsApp*</span>
          <input name="phone" type="tel" required autoComplete="tel" maxLength={20} />
        </label>
        <label className="finder-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" maxLength={80} />
        </label>
      </div>

      <fieldset className="talk-group">
        <legend>What do you need?</legend>
        <div className="chips">
          {NEEDS.map((need) => (
            <button
              key={need}
              type="button"
              className={`chip${needs.includes(need) ? " is-on" : ""}`}
              aria-pressed={needs.includes(need)}
              onClick={() => toggle(need)}
            >
              {need}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="finder-field">
        <span>Budget (optional)</span>
        <select name="budget" defaultValue="">
          <option value="">Choose…</option>
          {BUDGETS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>

      <fieldset className="talk-group">
        <legend>How should we talk?</legend>
        <div className="chips">
          {CHANNELS.map((c, i) => (
            <label key={c} className="chip chip--radio">
              <input type="radio" name="channel" value={c} defaultChecked={i === 0} />
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="finder-field">
        <span>Message (optional)</span>
        <textarea name="message" rows={3} maxLength={600} />
      </label>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />

      <label className="talk-consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree MOE Media may contact me about this enquiry. <Link href="/privacy">Privacy Policy</Link>
        </span>
      </label>

      <button type="submit" className="pill pill--primary pill--block">
        Book my 15 minutes
      </button>
    </form>
  );
}
