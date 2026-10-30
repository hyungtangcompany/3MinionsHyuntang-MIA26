import { PrismaClient, Prisma, KelasProyek, Jalur, StatusProyek, StatusAnalisis, JenisFlag, KeputusanFlag } from "@prisma/client";
import { hitungSkor } from "../lib/scoring";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses seeding data awal (T1)...");

  // 1. Bersihkan data lama dengan urutan relasi aman
  await prisma.flagKemiripan.deleteMany();
  await prisma.skor.deleteMany();
  await prisma.ringkasanAi.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.anggotaKelompok.deleteMany();
  await prisma.kelompok.deleteMany();
  await prisma.rabItem.deleteMany();
  await prisma.proyek.deleteMany();
  await prisma.pengguna.deleteMany();
  await prisma.desa.deleteMany();

  console.log("Data lama berhasil dibersihkan.");

  // 2. Buat Desa
  const desa = await prisma.desa.create({
    data: {
      nama: "Desa Karang Sari",
      kecamatan: "Kecamatan Harapan",
      kabupaten: "Kabupaten Contoh",
      tahun: 2026,
      pagu: BigInt(1_000_000_000), // Rp1 Miliar
      pagukdmp: BigInt(580_300_000), // Alokasi KDMP 58.03%
      konfigurasi: {
        targetSwakelolaPersen: 40,
        masaSanggahHari: 3,
        tenggatTanggapanHari: 14,
      },
    },
  });
  console.log(`Desa dibuat: ${desa.nama}`);

  // 3. Buat Pengguna (Minimal 4 peran)
  const kades = await prisma.pengguna.create({
    data: { nama: "Pak Hendy (Kepala Desa / Perangkat)" },
  });
  const pengawas = await prisma.pengguna.create({
    data: { nama: "Pak Bambang (Pengawas BPD)" },
  });
  const admin = await prisma.pengguna.create({
    data: { nama: "Siti Rahma (Admin Desa)" },
  });
  const ketuaA = await prisma.pengguna.create({
    data: { nama: "Rudi Hermawan (Ketua Kelompok Tani Muda)" },
  });
  const ketuaB = await prisma.pengguna.create({
    data: { nama: "Joko Widodo (Ketua CV Karya Warga)" },
  });
  const ketuaC = await prisma.pengguna.create({
    data: { nama: "Budi Santoso (Ketua Kelompok Tukang RT 3)" },
  });

  console.log("Pengguna (Perangkat, Pengawas, Admin, dan Warga) berhasil dibuat.");

  // 4. Buat Kelompok Warga
  const kelompokA = await prisma.kelompok.create({
    data: {
      nama: "Kelompok Tani Muda",
      ketuaId: ketuaA.id,
    },
  });

  const kelompokB = await prisma.kelompok.create({
    data: {
      nama: "CV Karya Warga",
      ketuaId: ketuaB.id,
    },
  });

  const kelompokC = await prisma.kelompok.create({
    data: {
      nama: "Kelompok Tukang RT 3",
      ketuaId: ketuaC.id,
    },
  });

  // 5. Tambahkan Anggota Kelompok (Wahyu sengaja didaftarkan di kelompok B dan C untuk trigger overlap)
  const wahyuHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  await prisma.anggotaKelompok.createMany({
    data: [
      // Kelompok A
      { kelompokId: kelompokA.id, nama: "Rudi Hermawan", rtRw: "01/02", ketua: true, nikHash: "hash_rudi_001" },
      { kelompokId: kelompokA.id, nama: "Slamet Riyadi", rtRw: "01/02", ketua: false, nikHash: "hash_slamet_002" },
      { kelompokId: kelompokA.id, nama: "Ahmad Dahlan", rtRw: "01/02", ketua: false, nikHash: "hash_ahmad_003" },

      // Kelompok B
      { kelompokId: kelompokB.id, nama: "Joko Widodo", rtRw: "02/03", ketua: true, nikHash: "hash_joko_004" },
      { kelompokId: kelompokB.id, nama: "Hendra Gunawan", rtRw: "02/03", ketua: false, nikHash: "hash_hendra_005" },
      { kelompokId: kelompokB.id, nama: "Wahyu Pratama", rtRw: "02/03", ketua: false, nikHash: wahyuHash },

      // Kelompok C
      { kelompokId: kelompokC.id, nama: "Budi Santoso", rtRw: "03/03", ketua: true, nikHash: "hash_budi_006" },
      { kelompokId: kelompokC.id, nama: "Agus Salim", rtRw: "03/03", ketua: false, nikHash: "hash_agus_007" },
      { kelompokId: kelompokC.id, nama: "Wahyu Pratama", rtRw: "03/03", ketua: false, nikHash: wahyuHash },
    ],
  });

  // 6. Buat 4 Proyek Sesuai Spesifikasi PRD
  // 6.1 Proyek 1: Drainase RT 3 (TENDER_DIBUKA, Sayembara)
  const proyekDrainase = await prisma.proyek.create({
    data: {
      desaId: desa.id,
      judul: "Pembangunan Saluran Drainase RT 3",
      deskripsi: "Pembangunan saluran drainase lingkungan untuk mencegah genangan air saat musim hujan di RT 3 Dusun Krajan.",
      lokasi: "RT 03 Dusun Krajan",
      pagu: BigInt(100_000_000),
      kelas: KelasProyek.KECIL,
      jalur: Jalur.SAYEMBARA,
      alasanJalur: "Pekerjaan padat karya sederhana yang dapat dikerjakan secara gotong royong oleh kelompok tukang warga desa.",
      status: StatusProyek.TENDER_DIBUKA,
      tenggatProposal: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      syaratLokalMin: 70,
      durasiMin: 30,
      durasiMax: 60,
    },
  });

  // Micro-RAB Drainase RT 3 (Total = Pagu = Rp100.000.000)
  await prisma.rabItem.createMany({
    data: [
      { proyekId: proyekDrainase.id, uraian: "Pekerjaan Galian Tanah Saluran", volume: 250, satuan: "m3", hargaSatuan: BigInt(80_000) }, // 20.000.000
      { proyekId: proyekDrainase.id, uraian: "Pekerjaan Pasangan Batu Kali Mortar", volume: 150, satuan: "m3", hargaSatuan: BigInt(400_000) }, // 60.000.000
      { proyekId: proyekDrainase.id, uraian: "Pekerjaan Plesteran & Siaran Saluran", volume: 400, satuan: "m2", hargaSatuan: BigInt(50_000) }, // 20.000.000
    ],
  });

  // 6.2 Proyek 2: Balai Warga (PENGERJAAN)
  await prisma.proyek.create({
    data: {
      desaId: desa.id,
      judul: "Renovasi Gedung Pertemuan Balai Warga",
      deskripsi: "Renovasi atap dan lantai balai warga serbaguna.",
      lokasi: "Dusun Karang Anyar",
      pagu: BigInt(140_000_000),
      kelas: KelasProyek.MENENGAH,
      jalur: Jalur.SAYEMBARA,
      alasanJalur: "Dikerjakan oleh kelompok pertukangan desa dengan serapan tenaga kerja lokal.",
      status: StatusProyek.PENGERJAAN,
      syaratLokalMin: 70,
      durasiMin: 45,
      durasiMax: 90,
    },
  });

  // 6.3 Proyek 3: Jalan Setapak Dusun (SELESAI)
  await prisma.proyek.create({
    data: {
      desaId: desa.id,
      judul: "Pavingisasi Jalan Setapak Dusun",
      deskripsi: "Pemasangan paving block jalan setapak pemukiman.",
      lokasi: "Dusun Tani Makmur",
      pagu: BigInt(60_000_000),
      kelas: KelasProyek.KECIL,
      jalur: Jalur.SAYEMBARA,
      alasanJalur: "Pekerjaan sederhana padat karya tunai desa (PKTD).",
      status: StatusProyek.SELESAI,
      syaratLokalMin: 80,
      durasiMin: 20,
      durasiMax: 40,
    },
  });

  // 6.4 Proyek 4: Pemandian Air Panas (PEMATANGAN, Studi Kasus)
  await prisma.proyek.create({
    data: {
      desaId: desa.id,
      judul: "Pengembangan Kawasan Wisata Pemandian Air Panas",
      deskripsi: "Proyek strategis desa untuk fasilitas pariwisata pemandian air panas terpadu.",
      lokasi: "Dusun Sumber Rejeki",
      pagu: BigInt(80_000_000),
      kelas: KelasProyek.BESAR,
      status: StatusProyek.PEMATANGAN,
      syaratLokalMin: 60,
      durasiMin: 60,
      durasiMax: 120,
    },
  });

  // 7. Kaitkan Proposal A, B, C ke Proyek Drainase RT 3 beserta Skor dan Ringkasan AI
  // Proposal A
  const propA = await prisma.proposal.create({
    data: {
      proyekId: proyekDrainase.id,
      kelompokId: kelompokA.id,
      penawaran: BigInt(88_000_000),
      durasiHari: 45,
      tenagaTotal: 10,
      tenagaLokal: 9,
      narasiMetode: "Metode galian manual dengan rotasi kelompok gotong royong dan pemasangan batu kali mortar bertahap.",
      narasiJadwal: "Minggu 1-2 galian saluran, Minggu 3-5 pasangan batu kali, Minggu 6 plesteran siar dan pembersihan akhir.",
      narasiRisiko: "Risiko hujan diatasi dengan pompa air dan penutupan terpal plastik pada galian basah.",
      dokumen: ["proposal-tani-muda.pdf"],
      kelengkapan: { jadwal: true, metode: true, risiko: true, anggota: true, pengalaman: false },
      statusAnalisis: StatusAnalisis.BERHASIL,
    },
  });

  const skorA = hitungSkor({
    pagu: 100_000_000,
    penawaran: 88_000_000,
    tenagaTotal: 10,
    tenagaLokal: 9,
    durasi: 45,
    durasiMin: 30,
    durasiMax: 60,
    kelengkapan: 4,
  });

  await prisma.skor.create({
    data: {
      proposalId: propA.id,
      total: skorA.total,
      rincian: skorA.rincian,
      flags: skorA.flags,
      versiBobot: skorA.versiBobot,
    },
  });

  await prisma.ringkasanAi.create({
    data: {
      proposalId: propA.id,
      model: "meta-llama/llama-3.3-70b-instruct",
      versiPrompt: "v1.0",
      json: {
        ringkasan_singkat: "Pengerjaan galian drainase RT 3 dengan 90% tenaga lokal dan metode bertahap.",
        metode_kerja: "Galian bertahap dengan rotasi giliran kerja warga dan finishing plesteran siar.",
        risiko_yang_disebut: ["Hujan deras dan genangan galian"],
        jadwal_garis_besar: "Total 45 hari terbagi dalam 6 tahapan mingguan.",
        hal_yang_tidak_dijelaskan: ["Spesifikasi semen yang digunakan"],
      },
    },
  });

  // Proposal B
  const propB = await prisma.proposal.create({
    data: {
      proyekId: proyekDrainase.id,
      kelompokId: kelompokB.id,
      penawaran: BigInt(99_000_000),
      durasiHari: 25,
      tenagaTotal: 12,
      tenagaLokal: 6,
      narasiMetode: "Pengerjaan cepat dengan alat bantu mekanis dan tenaga terampil campuran.",
      narasiJadwal: "Jadwal padat 25 hari kerja maraton.",
      narasiRisiko: "Keterlambatan suplai material batu diantisipasi dengan pemesanan awal.",
      dokumen: ["proposal-cv-karya-warga.pdf"],
      kelengkapan: { jadwal: true, metode: true, risiko: true, anggota: false, pengalaman: false },
      statusAnalisis: StatusAnalisis.BERHASIL,
    },
  });

  const skorB = hitungSkor({
    pagu: 100_000_000,
    penawaran: 99_000_000,
    tenagaTotal: 12,
    tenagaLokal: 6,
    durasi: 25,
    durasiMin: 30,
    durasiMax: 60,
    kelengkapan: 3,
  });

  await prisma.skor.create({
    data: {
      proposalId: propB.id,
      total: skorB.total,
      rincian: skorB.rincian,
      flags: skorB.flags,
      versiBobot: skorB.versiBobot,
    },
  });

  await prisma.ringkasanAi.create({
    data: {
      proposalId: propB.id,
      model: "meta-llama/llama-3.3-70b-instruct",
      versiPrompt: "v1.0",
      json: {
        ringkasan_singkat: "Penawaran harga mendekati pagu dengan durasi pengerjaan cepat 25 hari.",
        metode_kerja: "Pengerjaan mekanis cepat dengan pengawasan mandor.",
        risiko_yang_disebut: ["Keterlambatan material batu"],
        jadwal_garis_besar: "25 hari kerja terpusat.",
        hal_yang_tidak_dijelaskan: ["Rencana keselamatan kerja k3", "Daftar rinci pekerja lokal"],
      },
    },
  });

  // Proposal C
  const propC = await prisma.proposal.create({
    data: {
      proyekId: proyekDrainase.id,
      kelompokId: kelompokC.id,
      penawaran: BigInt(62_000_000),
      durasiHari: 40,
      tenagaTotal: 8,
      tenagaLokal: 8,
      narasiMetode: "Dikerjakan 100% oleh warga tukang RT 3 dengan rincian material lokal yang hemat.",
      narasiJadwal: "Pengerjaan santai teratur selama 40 hari kalender.",
      narasiRisiko: "Risiko cuaca diantisipasi dengan penjadwalan fleksibel sore hari.",
      dokumen: ["proposal-tukang-rt3.pdf", "sk-kelompok.pdf"],
      kelengkapan: { jadwal: true, metode: true, risiko: true, anggota: true, pengalaman: true },
      statusAnalisis: StatusAnalisis.BERHASIL,
    },
  });

  const skorC = hitungSkor({
    pagu: 100_000_000,
    penawaran: 62_000_000,
    tenagaTotal: 8,
    tenagaLokal: 8,
    durasi: 40,
    durasiMin: 30,
    durasiMax: 60,
    kelengkapan: 5,
  });

  await prisma.skor.create({
    data: {
      proposalId: propC.id,
      total: skorC.total,
      rincian: skorC.rincian,
      flags: skorC.flags,
      versiBobot: skorC.versiBobot,
    },
  });

  await prisma.ringkasanAi.create({
    data: {
      proposalId: propC.id,
      model: "meta-llama/llama-3.3-70b-instruct",
      versiPrompt: "v1.0",
      json: {
        ringkasan_singkat: "Penawaran sangat murah (62 juta) dengan 100% tenaga warga RT 3.",
        metode_kerja: "Pekerjaan swakelola murni gotong royong warga RT 3.",
        risiko_yang_disebut: ["Kendala cuaca hujan"],
        jadwal_garis_besar: "40 hari kalender.",
        hal_yang_tidak_dijelaskan: ["tidak dijelaskan"],
      },
    },
  });

  // 8. Tambahkan Flag Kemiripan/Tumpang Tindih Anggota antara Proposal B dan Proposal C
  await prisma.flagKemiripan.create({
    data: {
      proyekId: proyekDrainase.id,
      proposalAId: propB.id,
      proposalBId: propC.id,
      jenis: JenisFlag.ANGGOTA,
      nilai: 1.0,
      keputusan: KeputusanFlag.BELUM,
      catatan: "Terdeteksi 1 anggota yang sama (Wahyu Pratama) pada Kelompok CV Karya Warga dan Kelompok Tukang RT 3.",
    },
  });

  console.log("Seeding data awal berhasil diselesaikan!");
}

main()
  .catch((e) => {
    console.error("Kesalahan saat menjalankan seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
