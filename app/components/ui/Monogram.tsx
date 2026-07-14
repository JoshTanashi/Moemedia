// Placeholder logo slot: renders the business initial until a real
// logoSrc asset is supplied in data/businesses.ts.
export function Monogram({ name }: { name: string }) {
  return (
    <span className="monogram" aria-hidden>
      {name.charAt(0)}
    </span>
  );
}
