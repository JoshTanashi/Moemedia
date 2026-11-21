import Link from "next/link";
import { contact } from "@/data/contact";
import { services } from "@/data/services";
import { work } from "@/data/work";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-cols">
          <div className="footer-col">
            <h3>Services</h3>
            {services.map((s) => (
              <Link key={s.id} href={`/start?s=${s.id}`}>
                {s.name}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h3>Work</h3>
            {work.map((item) => (
              <Link key={item.slug} href={`/work#${item.slug}`}>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h3>Contact</h3>
            <a href={contact.tel}>{contact.phoneDisplay}</a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
              WhatsApp
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>{contact.location}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright © {new Date().getFullYear()} MOE Media. All rights reserved.</span>
          <span>Create · Connect · Grow</span>
        </div>
      </div>
    </footer>
  );
}
