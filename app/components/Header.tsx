"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/", label: "Story" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link href="/" className="site-logo" onClick={() => setMenuOpen(false)}>
          MOEMEDIA
        </Link>
        <nav className="site-nav" aria-label="Primary">
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
        </nav>
        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
