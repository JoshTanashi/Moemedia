import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 md:h-20 bg-cream/85 backdrop-blur-sm border-b border-line">
      <Link
        href="/"
        className="text-base md:text-lg font-semibold tracking-tight text-ink"
      >
        moemedia
      </Link>
      <nav className="flex items-center gap-6 md:gap-8 text-nav uppercase tracking-widest text-ink-soft">
        <Link href="/about" className="hover:text-ink transition-colors">
          About
        </Link>
        <Link href="/contact" className="hover:text-ink transition-colors">
          Contact
        </Link>
      </nav>
    </header>
  );
}
