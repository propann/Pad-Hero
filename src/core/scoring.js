export function classifyHit(deltaMs, grading = { perfectMs: 20, goodMs: 50 }) {
  const distance = Math.abs(deltaMs);
  if (distance <= grading.perfectMs) return 'PERFECT';
  if (distance <= grading.goodMs) return 'GOOD';
  return 'MISS';
}

export function beatsToMs(beats, bpm) { return beats * 60000 / bpm; }
