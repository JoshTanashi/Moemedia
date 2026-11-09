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

const SPRING = "back.out(1.6)";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const scrimRef = useRef<HTMLDivElement>(null);
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
    const scrim = scrimRef.current;
    const menu = menuRef.current;
    if (!scrim || !menu) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const links = menu.querySelectorAll(".mobile-menu-link, .mobile-menu-sub a, .mobile-menu-email");

    if (reduce) {
      gsap.set(scrim, { autoAlpha: open ? 1 : 0 });
      gsap.set(menu, { y: 0, autoAlpha: open ? 1 : 0 });
      gsap.set(links, { y: 0, opacity: 1 });
      return;
    }

    if (open) {
      gsap.set([scrim, menu], { visibility: "visible" });
      const tl = gsap.timeline();
      tl.to(scrim, { opacity: 1, duration: 0.3, ease: "power2.out" })
        .fromTo(menu, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: SPRING }, "<")
        .fromTo(
          links,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out" },
          "-=0.35",
        );
      return () => {
        tl.kill();
      };
    }

    const tl = gsap.timeline();
    tl.to(menu, { yPercent: 100, duration: 0.4, ease: "power3.inOut" })
      .to(scrim, { opacity: 0, duration: 0.3, ease: "power2.inOut" }, "<")
      .set([scrim, menu], { visibility: "hidden" });
    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <>
      <div
        ref={scrimRef}
        className="mobile-menu-scrim"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={menuRef}
        id="mobile-menu"
        className="mobile-menu"
        aria-hidden={!open}
      >
        <div className="mobile-menu-grabber" aria-hidden />
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
        <div className="mobile-menu-contacts">
          <a
            href="https://wa.me/27699384562"
            target="_blank"
            rel="noreferrer noopener"
            className="mobile-menu-email"
          >
            069 938 4562
          </a>
          <a href="mailto:joshua@moemedia.co.za" className="mobile-menu-email">
            joshua@moemedia.co.za
          </a>
        </div>
      </div>
    </>
  );
}
