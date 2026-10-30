import fs from "fs";
import path from "path";
import { JenisFlag, KeputusanFlag } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { hitungKemiripanTeks } from "../lib/similarity";
import { cariTumpangTindihAnggota, type AnggotaInput } from "../lib/overlap";

// Pemuatan variabel lingkungan jika dijalankan via tsx langsung
if (!process.env.DATABASE_URL) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      for (const line of envContent.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const firstEqual = trimmed.indexOf("=");
          if (firstEqual > 0) {
            const key = trimmed.slice(0, firstEqual).trim();
            let val = trimmed.slice(firstEqual + 1).trim();
            if (
              (val.startsWith('"') && val.endsWith('"')) ||
              (val.startsWith("'") && val.endsWith("'"))
            ) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      }
    }
  } catch {
    // Abaikan error pemuatan file
  }
}

const AMBANG_KEMIRIPAN = Number(process.env.SIMILARITY_THRESHOLD || "0.60"); // 60%

async function main() {
  console.log("==================================================");
  console.log("AKAR - Analisis Deteksi Flag Proposal (Integritas)");
  console.log("==================================================");

  // 1. Ambil proyek (prioritas seed_proyek_001 atau proyek dengan proposal aktif)
  const proyek = await prisma.proyek.findFirst({
    where: {
      OR: [
        { id: "seed_proyek_001" },
        { proposal: { some: {} } },
      ],
    },
    include: {
      proposal: {
        include: {
          kelompok: {
            include: {
              anggota: true,
            },
          },
        },
      },
    },
  });

  if (!proyek || proyek.proposal.length === 0) {
    console.log("[INFO] Tidak ditemukan proyek dengan proposal untuk dianalisis.");
    return;
  }

  console.log(`[INFO] Menganalisis Proyek: "${proyek.judul}" (ID: ${proyek.id})`);
  console.log(`[INFO] Jumlah proposal terdaftar: ${proyek.proposal.length}\n`);

  const proposals = proyek.proposal;

  // ================= 1. DETEKSI TUMPANG TINDIH ANGGOTA =================
  console.log("--- 1. Memeriksa Tumpang Tindih Anggota ---");
  const daftarAnggotaSemua: (AnggotaInput & { proposalId: string; kelompokNama: string })[] = [];

  for (const p of proposals) {
    for (const a of p.kelompok.anggota) {
      daftarAnggotaSemua.push({
        kelompokId: p.kelompokId,
        proposalId: p.id,
        kelompokNama: p.kelompok.nama,
        nama: a.nama,
        nikHash: a.nikHash,
      });
    }
  }

  const hasilOverlap = cariTumpangTindihAnggota(daftarAnggotaSemua);
  let totalFlagAnggota = 0;

  for (const overlap of hasilOverlap) {
    const propA = proposals.find((p) => p.kelompokId === overlap.kelompokAId);
    const propB = proposals.find((p) => p.kelompokId === overlap.kelompokBId);

    if (propA && propB) {
      // Cek apakah flag sudah ada di database
      const existingFlag = await prisma.flagKemiripan.findFirst({
        where: {
          proyekId: proyek.id,
          jenis: JenisFlag.ANGGOTA,
          OR: [
            { proposalAId: propA.id, proposalBId: propB.id },
            { proposalAId: propB.id, proposalBId: propA.id },
          ],
        },
      });

      const catatan = `Terdeteksi anggota ganda (${overlap.identitas}) terdaftar di '${propA.kelompok.nama}' dan '${propB.kelompok.nama}'.`;

      if (!existingFlag) {
        await prisma.flagKemiripan.create({
          data: {
            proyekId: proyek.id,
            proposalAId: propA.id,
            proposalBId: propB.id,
            jenis: JenisFlag.ANGGOTA,
            nilai: 1.0,
            keputusan: KeputusanFlag.BELUM,
            catatan,
          },
        });
      }

      console.log(`  [FLAG ANGGOTA] ${catatan}`);
      totalFlagAnggota++;
    }
  }

  if (totalFlagAnggota === 0) {
    console.log("  [OK] Tidak ada tumpang tindih anggota antar kelompok.");
  }

  // ================= 2. DETEKSI KEMIRIPAN TEKS =================
  console.log("\n--- 2. Memeriksa Kemiripan Narasi Teks (N-gram Trigram) ---");
  console.log(`[INFO] Ambang batas kemiripan: ${(AMBANG_KEMIRIPAN * 100).toFixed(0)}%`);

  let totalFlagTeks = 0;

  for (let i = 0; i < proposals.length; i++) {
    for (let j = i + 1; j < proposals.length; j++) {
      const propA = proposals[i];
      const propB = proposals[j];

      const narasiA = `${propA.narasiMetode} ${propA.narasiJadwal} ${propA.narasiRisiko}`;
      const narasiB = `${propB.narasiMetode} ${propB.narasiJadwal} ${propB.narasiRisiko}`;

      const skorKemiripan = hitungKemiripanTeks(narasiA, narasiB);
      const persentase = (skorKemiripan * 100).toFixed(1);

      console.log(
        `  - Perbandingan '${propA.kelompok.nama}' vs '${propB.kelompok.nama}': ${persentase}%`
      );

      if (skorKemiripan >= AMBANG_KEMIRIPAN) {
        const existingFlag = await prisma.flagKemiripan.findFirst({
          where: {
            proyekId: proyek.id,
            jenis: JenisFlag.TEKS,
            OR: [
              { proposalAId: propA.id, proposalBId: propB.id },
              { proposalAId: propB.id, proposalBId: propA.id },
            ],
          },
        });

        const catatan = `Kemiripan narasi teks sebesar ${persentase}% melebihi ambang batas ${(AMBANG_KEMIRIPAN * 100).toFixed(0)}% antara '${propA.kelompok.nama}' dan '${propB.kelompok.nama}'.`;

        if (!existingFlag) {
          await prisma.flagKemiripan.create({
            data: {
              proyekId: proyek.id,
              proposalAId: propA.id,
              proposalBId: propB.id,
              jenis: JenisFlag.TEKS,
              nilai: Math.round(skorKemiripan * 100) / 100,
              keputusan: KeputusanFlag.BELUM,
              catatan,
            },
          });
        } else {
          await prisma.flagKemiripan.update({
            where: { id: existingFlag.id },
            data: {
              nilai: Math.round(skorKemiripan * 100) / 100,
              catatan,
            },
          });
        }

        console.log(`    [FLAG TEKS] ${catatan}`);
        totalFlagTeks++;
      }
    }
  }

  if (totalFlagTeks === 0) {
    console.log("  [OK] Tidak ada proposal dengan kemiripan teks di atas ambang batas.");
  }

  console.log("\n==================================================");
  console.log(`Analisis selesai: ${totalFlagAnggota} flag anggota, ${totalFlagTeks} flag teks tercatat.`);
  console.log("==================================================");
}

if (require.main === module || process.argv[1]?.includes("detect-flags")) {
  main()
    .catch((e) => {
      console.error("[FATAL ERROR]:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

