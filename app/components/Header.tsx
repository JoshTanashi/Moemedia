import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="site-logo">
        MOEMEDIA
      </Link>
      <nav className="nav-pills">
        <Link href="/about" className="nav-pill">
          ABOUT
        </Link>
        <Link href="/contact" className="nav-pill">
          CONTACT
        </Link>
      </nav>
    </header>
  );
}
