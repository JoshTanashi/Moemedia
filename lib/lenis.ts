import Lenis from "lenis";

let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (!lenis) {
    lenis = new Lenis({ autoRaf: false });
  }
  return lenis;
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
}
