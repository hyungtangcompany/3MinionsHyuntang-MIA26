import { describe, it, expect } from "vitest";
import { hitungSkor } from "@/lib/scoring";

describe("Logika Penilaian Scoring Proposal (PRD Bagian 25 / T01)", () => {
  const baseConfig = {
    pagu: 100_000_000,
    durasiMin: 30,
    durasiMax: 60,
    syaratLokalMin: 70,
  };

  it("T01 - Proposal A (Kelompok Tani Muda): total 95, tanpa flag", () => {
    const hasil = hitungSkor({
      ...baseConfig,
      penawaran: 88_000_000,
      tenagaTotal: 10,
      tenagaLokal: 9,
      durasi: 45,
      kelengkapan: 4,
    });

    expect(hasil.total).toBe(95);
    expect(hasil.rincian.biaya).toBe(100);
    expect(hasil.rincian.lokal).toBe(90);
    expect(hasil.rincian.jadwal).toBe(100);
    expect(hasil.rincian.lengkap).toBe(80);
    expect(hasil.flags).toEqual([]);
    expect(hasil.versiBobot).toBe("v1");
  });

  it("T01 - Proposal B (CV Karya Warga): total 66, flag tenaga lokal di bawah syarat", () => {
    const hasil = hitungSkor({
      ...baseConfig,
      penawaran: 99_000_000,
      tenagaTotal: 12,
      tenagaLokal: 6,
      durasi: 25,
      kelengkapan: 3,
    });

    expect(hasil.total).toBe(66);
    expect(hasil.rincian.biaya).toBe(76);
    expect(hasil.rincian.lokal).toBe(50);
    expect(hasil.rincian.jadwal).toBe(75);
    expect(hasil.rincian.lengkap).toBe(60);
    expect(hasil.flags).toContain("tenaga lokal di bawah syarat");
  });

  it("T01 - Proposal C (Kelompok Tukang RT 3): total 82, flag perlu klarifikasi harga", () => {
    const hasil = hitungSkor({
      ...baseConfig,
      penawaran: 62_000_000,
      tenagaTotal: 8,
      tenagaLokal: 8,
      durasi: 40,
      kelengkapan: 5,
    });

    expect(hasil.total).toBe(82);
    expect(hasil.rincian.biaya).toBe(55);
    expect(hasil.rincian.lokal).toBe(100);
    expect(hasil.rincian.jadwal).toBe(100);
    expect(hasil.rincian.lengkap).toBe(100);
    expect(hasil.flags).toContain("perlu klarifikasi harga");
  });

  it("T02 - Validasi: penawaran melebihi pagu melempar error", () => {
    expect(() =>
      hitungSkor({
        ...baseConfig,
        penawaran: 105_000_000,
        tenagaTotal: 10,
        tenagaLokal: 8,
        durasi: 45,
        kelengkapan: 5,
      })
    ).toThrow("Penawaran melebihi pagu anggaran");
  });
});

