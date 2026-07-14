export function CTAButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`cta-button ${className}`.trim()}>
      {children}
    </a>
  );
}
