import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 md:h-20">
      <Link
        href="/"
        className="text-base md:text-lg font-semibold tracking-tight text-ink"
      >
        moemedia
      </Link>
      <nav className="flex items-center gap-3 text-nav uppercase tracking-widest md:gap-4">
        <Link
          href="/about"
          className="border border-ink/70 px-4 py-2 text-ink transition-colors duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-ink hover:text-cream"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="border border-ink/70 px-4 py-2 text-ink transition-colors duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-ink hover:text-cream"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
