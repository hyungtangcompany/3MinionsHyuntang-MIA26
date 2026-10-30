export interface AnggotaInput {
  kelompokId: string;
  nama?: string | null;
  nikHash?: string | null;
}

export interface OverlapResult {
  kelompokAId: string;
  kelompokBId: string;
  identitas: string;
}

/**
 * Mencari tumpang tindih anggota antar kelompok berdasarkan nikHash atau kesamaan nama.
 */
export function cariTumpangTindihAnggota(anggotaList: AnggotaInput[]): OverlapResult[] {
  const hasil: OverlapResult[] = [];
  const mapIdentitas = new Map<string, { kelompokId: string; identitas: string }[]>();

  for (const anggota of anggotaList) {
    const key =
      anggota.nikHash?.trim() ||
      (anggota.nama ? anggota.nama.trim().toLowerCase() : null);

    if (!key) continue;

    const existing = mapIdentitas.get(key) || [];
    existing.push({
      kelompokId: anggota.kelompokId,
      identitas: anggota.nama || anggota.nikHash || "Anggota",
    });
    mapIdentitas.set(key, existing);
  }

  for (const [, entries] of mapIdentitas.entries()) {
    if (entries.length > 1) {
      for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
          if (entries[i].kelompokId !== entries[j].kelompokId) {
            hasil.push({
              kelompokAId: entries[i].kelompokId,
              kelompokBId: entries[j].kelompokId,
              identitas: entries[i].identitas,
            });
          }
        }
      }
    }
  }

  return hasil;
}
