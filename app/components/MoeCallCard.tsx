const HALF = [3, 5, 8, 4, 10, 14, 7, 11, 16, 9, 13, 6, 15, 10, 5, 12, 8, 14, 6, 9, 4, 7];
const WAVE = [...HALF, ...[...HALF].reverse()];

function Orb({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <span className={`orb orb--${size}`}>
      <span className="orb-ring orb-ring--3" />
      <span className="orb-ring orb-ring--2" />
      <span className="orb-ring orb-ring--1" />
      <span className="orb-core" />
    </span>
  );
}

export function MoeCallCard() {
  return (
    <div className="phone" aria-hidden>
      <div className="phone-screen">
        <div className="phone-island" />

        <div className="phone-status">
          <Orb size="sm" />
          <span className="phone-status-name">Moe</span>
          <span className="phone-live">
            <i /> LIVE
          </span>
          <span className="phone-status-time">Fri 09:41</span>
        </div>

        <div className="phone-hero">
          <Orb />
          <p className="phone-name">Moe</p>
          <p className="phone-sub">On a call · 01:41</p>
        </div>

        <div className="phone-card">
          <div className="phone-row">
            <span className="phone-row-icon" />
            <span className="phone-row-text">
              <b>New enquiry</b>
              <small>Fri 09:39</small>
            </span>
            <span className="phone-tag">✓ Answered</span>
          </div>
          <div className="phone-row phone-row--booked">
            <span className="phone-check">✓</span>
            <span className="phone-row-text">
              <b>Booked</b>
              <small>Fri 10:00 · confirmed</small>
            </span>
          </div>
        </div>

        <div className="phone-wave">
          {WAVE.map((h, i) => (
            <i key={i} style={{ height: `${h * 0.1}rem`, animationDelay: `${(i % 7) * 120}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
