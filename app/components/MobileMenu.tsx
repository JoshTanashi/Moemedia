"use client";

import { useEffect } from "react";
import Link from "next/link";
import { contact } from "@/data/contact";
import { NAV_LINKS } from "@/data/nav";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      <div className={`sheet-scrim${open ? " is-open" : ""}`} onClick={onClose} aria-hidden />
      <div
        id="mobile-menu"
        className={`sheet${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="sheet-grabber" aria-hidden />
        <nav aria-label="Menu" className="sheet-links">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="sheet-link" onClick={onClose}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/start" className="pill pill--primary pill--block" onClick={onClose}>
          Start
        </Link>
        <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener" className="sheet-contact">
          WhatsApp {contact.phoneDisplay}
        </a>
      </div>
    </>
  );
}
