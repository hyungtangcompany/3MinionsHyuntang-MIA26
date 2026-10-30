export interface HitungSkorInput {
  pagu: number;
  penawaran: number;
  tenagaTotal: number;
  tenagaLokal: number;
  durasi: number;
  durasiMin: number;
  durasiMax: number;
  kelengkapan: number; // 0 - 5
  syaratLokalMin?: number; // default 70
}

export interface RincianSkor {
  biaya: number;
  lokal: number;
  jadwal: number;
  lengkap: number;
  [key: string]: number;
}

export interface HitungSkorResult {
  total: number;
  rincian: RincianSkor;
  flags: string[];
  versiBobot: string;
}

/**
 * Menghitung skor proposal (0-100) dengan fungsi murni sesuai PRD bagian 25.
 * AI TIDAK PERNAH menentukan skor atau pemenang.
 */
export function hitungSkor(input: HitungSkorInput): HitungSkorResult {
  const {
    pagu,
    penawaran,
    tenagaTotal,
    tenagaLokal,
    durasi,
    durasiMin,
    durasiMax,
    kelengkapan,
    syaratLokalMin = 70,
  } = input;

  if (pagu <= 0) {
    throw new Error("Pagu proyek harus lebih besar dari 0");
  }

  const flags: string[] = [];

  // 1. Efisiensi Biaya (Bobot 40%)
  const r = penawaran / pagu;
  if (r > 1) {
    throw new Error("Penawaran melebihi pagu anggaran");
  }

  let skorBiaya: number;
  if (r >= 0.8 && r <= 0.95) {
    skorBiaya = 100;
  } else if (r > 0.95 && r <= 1.0) {
    // Turun linear dari 100 ke 70
    skorBiaya = 100 - ((r - 0.95) / 0.05) * 30;
  } else {
    // r < 0.80: skor 100 - ((0.80 - r) * 250), minimal 0
    skorBiaya = Math.max(0, 100 - (0.8 - r) * 250);
  }

  if (r < 0.7) {
    flags.push("perlu klarifikasi harga");
  }

  // 2. Serapan Tenaga Lokal (Bobot 30%)
  const persenLokal =
    tenagaTotal > 0 ? (tenagaLokal / tenagaTotal) * 100 : 0;
  const skorLokal = Math.min(100, Math.max(0, persenLokal));

  if (persenLokal < syaratLokalMin) {
    flags.push("tenaga lokal di bawah syarat");
  }

  // 3. Rasionalitas Jadwal (Bobot 20%)
  let skorJadwal: number;
  if (durasi >= durasiMin && durasi <= durasiMax) {
    skorJadwal = 100;
  } else if (durasi < durasiMin) {
    // 100 - 150 * (Dmin - D) / Dmin
    skorJadwal = Math.max(0, 100 - (150 * (durasiMin - durasi)) / durasiMin);
  } else {
    // 100 - 100 * (D - Dmax) / Dmax
    skorJadwal = Math.max(0, 100 - (100 * (durasi - durasiMax)) / durasiMax);
  }

  // 4. Kelengkapan Dokumen (Bobot 10%)
  const skorLengkap = Math.min(100, Math.max(0, (kelengkapan / 5) * 100));

  // Skor Total: round(0.40 * biaya + 0.30 * lokal + 0.20 * jadwal + 0.10 * lengkap)
  const total = Math.round(
    0.4 * skorBiaya + 0.3 * skorLokal + 0.2 * skorJadwal + 0.1 * skorLengkap
  );

  return {
    total,
    rincian: {
      biaya: Math.round(skorBiaya * 100) / 100,
      lokal: Math.round(skorLokal * 100) / 100,
      jadwal: Math.round(skorJadwal * 100) / 100,
      lengkap: Math.round(skorLengkap * 100) / 100,
    },
    flags,
    versiBobot: "v1",
  };
}
