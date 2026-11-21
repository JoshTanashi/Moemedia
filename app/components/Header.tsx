"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
import { BrandMark } from "./ui/BrandMark";
import { Wordmark } from "./ui/Wordmark";
import { NAV_LINKS } from "@/data/nav";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="MOE Media home" onClick={() => setMenuOpen(false)}>
            <BrandMark className="nav-logo-mark" priority />
            <Wordmark />
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/start" className="nav-start">
              Start
            </Link>
          </nav>
          <button
            type="button"
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
