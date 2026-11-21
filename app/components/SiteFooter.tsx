import Link from "next/link";
import { contact } from "@/data/contact";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-cols">
          <div className="footer-col">
            <h3>MOE Media</h3>
            <span>{contact.location}</span>
          </div>
          <div className="footer-col">
            <h3>Explore</h3>
            <Link href="/#services">Services</Link>
            <Link href="/#moe">Moe</Link>
            <Link href="/#work">Work</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          <div className="footer-col">
            <h3>Contact</h3>
            <a href={contact.tel}>{contact.phoneDisplay}</a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
              WhatsApp
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.facebook} target="_blank" rel="noreferrer noopener">
              Facebook
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MOE Media. All rights reserved.</span>
          <span>Create · Connect · Grow</span>
        </div>
      </div>
    </footer>
  );
}
