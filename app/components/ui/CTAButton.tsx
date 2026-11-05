export function CTAButton({
  href,
  children,
  className = "",
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a href={href} target={target} rel={rel} className={`cta-button ${className}`.trim()}>
      {children}
    </a>
  );
}
