import Image from "next/image";

// The real Moemedia wave mark. Intrinsic size matches the source asset
// (public/brand/logo.png, cropped to content bounds) so next/image can
// preserve aspect ratio — callers size it with a CSS width + height:auto.
export function BrandMark({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/logo.png"
      alt=""
      aria-hidden
      width={913}
      height={531}
      priority={priority}
      className={className}
    />
  );
}
