export const CARD_TILT_ENTER = { rotateX: 16, scale: 0.92, opacity: 0.4 };
export const CARD_TILT_EXIT = { rotateX: -12, scale: 0.94, opacity: 0.5 };

const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

export function cardTiltAt(centerFraction: number) {
  const t = Math.max(0, Math.min(1, centerFraction));
  if (t <= 0.5) {
    const p = t / 0.5;
    return {
      rotateX: lerp(CARD_TILT_ENTER.rotateX, 0, p),
      scale: lerp(CARD_TILT_ENTER.scale, 1, p),
      opacity: lerp(CARD_TILT_ENTER.opacity, 1, p),
    };
  }
  const p = (t - 0.5) / 0.5;
  return {
    rotateX: lerp(0, CARD_TILT_EXIT.rotateX, p),
    scale: lerp(1, CARD_TILT_EXIT.scale, p),
    opacity: lerp(1, CARD_TILT_EXIT.opacity, p),
  };
}
