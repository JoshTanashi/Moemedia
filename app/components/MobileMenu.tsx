"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { businesses } from "@/data/businesses";

const PAGE_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Close when the route changes underneath us.
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

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

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const links = menu.querySelectorAll(".mobile-menu-link, .mobile-menu-sub a, .mobile-menu-email");

    if (reduce) {
      gsap.set(menu, { clipPath: "inset(0 0 0% 0)", autoAlpha: open ? 1 : 0 });
      gsap.set(links, { y: 0, opacity: 1 });
      return;
    }

    if (open) {
      gsap.set(menu, { visibility: "visible", opacity: 1 });
      const tl = gsap.timeline();
      tl.fromTo(
        menu,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power3.inOut" },
      ).fromTo(
        links,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" },
        "-=0.15",
      );
      return () => {
        tl.kill();
      };
    }

    const tl = gsap.timeline();
    tl.to(menu, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => gsap.set(menu, { visibility: "hidden" }),
    });
    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      className={`mobile-menu ${open ? "is-open" : ""}`}
      aria-hidden={!open}
    >
      <nav aria-label="Menu">
        <div className="mobile-menu-links">
          <Link href="/" className="mobile-menu-link" onClick={onClose}>
            <span className="menu-index">00</span>Home
          </Link>
          {businesses.map((business, i) => (
            <Link
              key={business.slug}
              href={`/#${business.slug}`}
              className="mobile-menu-link"
              onClick={onClose}
            >
              <span className="menu-index">{String(i + 1).padStart(2, "0")}</span>
              {business.name}
            </Link>
          ))}
          <Link href="/#reken" className="mobile-menu-link" onClick={onClose}>
            <span className="menu-index">{String(businesses.length + 1).padStart(2, "0")}</span>
            Reken
          </Link>
        </div>
        <div className="mobile-menu-sub">
          {PAGE_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={onClose}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <a href="mailto:hello@moemedia.com" className="mobile-menu-email">
        hello@moemedia.com
      </a>
    </div>
  );
}
