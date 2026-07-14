import Link from "next/link";
import { businesses } from "@/data/businesses";
import { ArrowLoop } from "./ui/HandDrawn";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="footer-wordmark">Moemedia</p>
        <div className="footer-columns">
          <div className="footer-col">
            <h3>Businesses</h3>
            {businesses.map((business) =>
              business.liveUrl ? (
                <a
                  key={business.slug}
                  href={business.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {business.name}
                </a>
              ) : (
                <Link key={business.slug} href={`/#${business.slug}`}>
                  {business.name}
                </Link>
              ),
            )}
            <Link href="/#reken">Reken</Link>
          </div>
          <div className="footer-col">
            <h3>Site</h3>
            <Link href="/">Story</Link>
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h3>Contact</h3>
            <span className="footer-email">
              <a href="mailto:hello@moemedia.com">hello@moemedia.com</a>
              <ArrowLoop />
            </span>
            <span className="footer-muted">I answer my own email.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Moemedia</span>
          <span>Built by one founder. Everything above is real.</span>
        </div>
      </div>
    </footer>
  );
}
