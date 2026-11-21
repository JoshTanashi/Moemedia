import { BrandMark } from "./ui/BrandMark";

export function MoeCallCard() {
  return (
    <div className="phone" aria-hidden>
      <div className="phone-screen">
        <div className="phone-island" />
        <p className="phone-time">09:41</p>
        <div className="phone-caller">
          <span className="phone-avatar">
            <BrandMark className="phone-avatar-mark" />
          </span>
          <p className="phone-name">Moe</p>
          <p className="phone-sub">MOE Media · answering</p>
        </div>
        <div className="phone-wave">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} style={{ animationDelay: `${i * 90}ms` }} />
          ))}
        </div>
        <div className="phone-bubbles">
          <p className="bubble bubble--in">Hi, can I book for Friday?</p>
          <p className="bubble bubble--out">Friday 10:00 is open. Booked it for you.</p>
        </div>
        <div className="phone-actions">
          <span className="phone-btn phone-btn--end" />
          <span className="phone-btn phone-btn--accept" />
        </div>
      </div>
    </div>
  );
}
