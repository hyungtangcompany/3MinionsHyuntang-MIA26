/**
 * Menghasilkan set trigram karakter dari string teks.
 * Mengikuti prinsip pg_trgm untuk perbandingan teks.
 */
export function getTrigrams(str: string): Set<string> {
  const normalized =
    "  " +
    str
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim() +
    "  ";

  const trigrams = new Set<string>();
  for (let i = 0; i < normalized.length - 2; i++) {
    trigrams.add(normalized.substring(i, i + 3));
  }
  return trigrams;
}

/**
 * Menghitung koefisien kemiripan teks Jaccard Trigram (0.0 - 1.0).
 */
export function hitungKemiripanTeks(textA: string, textB: string): number {
  if (!textA || !textB) return 0;

  const trigramsA = getTrigrams(textA);
  const trigramsB = getTrigrams(textB);

  if (trigramsA.size === 0 && trigramsB.size === 0) return 1.0;
  if (trigramsA.size === 0 || trigramsB.size === 0) return 0.0;

  let intersection = 0;
  for (const tri of trigramsA) {
    if (trigramsB.has(tri)) {
      intersection++;
    }
  }

  const union = trigramsA.size + trigramsB.size - intersection;
  return union > 0 ? intersection / union : 0;
}
