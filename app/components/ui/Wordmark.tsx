// Live-text wordmark: "Moe" heavy + "media" light, with the brand's green
// tittle recreated over a dotless ı. Scales with the parent's font-size.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`.trim()} translate="no" role="img" aria-label="MOE Media">
      <span className="wordmark-bold" aria-hidden>
        Moe
      </span>
      <span className="wordmark-light" aria-hidden>
        med<span className="wordmark-i">ı</span>a
      </span>
    </span>
  );
}
