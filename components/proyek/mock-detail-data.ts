import { ProjectDetailData } from "./types";

export const mockProjectDrainase: ProjectDetailData = {
  id: "seed_proyek_001",
  desaId: "seed_desa_001",
  judul: "Pembangunan Saluran Drainase RT 3 Dusun Krajan",
  deskripsi:
    "Pembangunan saluran drainase lingkungan permanen sepanjang 350 meter menggunakan konstruksi batu kali mortar dan plesteran kedap air. Proyek ini bertujuan mengatasi genangan air hujan yang kerap merendam area jalan pemukiman warga RT 03 Dusun Krajan saat curah hujan tinggi, sekaligus melancarkan drainase menuju sungai sekunder.",
  lokasi: "RT 03 Dusun Krajan, Desa Karang Sari",
  pagu: 100_000_000,
  kelas: "KECIL",
  jalur: "SAYEMBARA",
  alasanJalur:
    "Pekerjaan padat karya sederhana yang dapat dikerjakan secara gotong royong oleh kelompok pertukangan warga desa. Menghidupkan ekonomi desa dengan memastikan minimal 70% perputaran upah dinikmati oleh tenaga kerja setempat.",
  status: "TENDER_DIBUKA",
  tanggalPublikasi: "10 April 2026",
  tenggatProposal: "19 April 2026",
  tenggatHari: 7,
  syaratLokalMin: 70,
  durasiMin: 30,
  durasiMax: 60,
  sumberDana: "Dana Desa (APBDes TA 2026)",
  rabItems: [
    {
      id: "rab_001",
      uraian: "Pekerjaan Galian Tanah Saluran Lingkungan",
      volume: 250,
      satuan: "m³",
      hargaSatuan: 80_000,
      subtotal: 20_000_000,
    },
    {
      id: "rab_002",
      uraian: "Pekerjaan Pasangan Batu Kali Campuran Mortar (1:4)",
      volume: 150,
      satuan: "m³",
      hargaSatuan: 400_000,
      subtotal: 60_000_000,
    },
    {
      id: "rab_003",
      uraian: "Pekerjaan Plesteran & Siaran Saluran Kedap Air (15mm)",
      volume: 400,
      satuan: "m²",
      hargaSatuan: 50_000,
      subtotal: 20_000_000,
    },
  ],
  proposals: [
    {
      id: "seed_proposal_001",
      namaKelompok: "Kelompok Tani Muda",
      ketua: "Rudi Hermawan",
      penawaran: 88_000_000,
      durasiHari: 45,
      tenagaTotal: 10,
      tenagaLokal: 9,
      persentaseLokal: 90,
      narasiMetode:
        "Metode galian tanah manual dengan rotasi kelompok gotong royong dan pemasangan batu kali mortar secara bertahap sepanjang 50 meter per sesi.",
      narasiJadwal:
        "Minggu 1-2: Pembersihan dan galian saluran. Minggu 3-5: Pemasangan pasangan batu kali mortar. Minggu 6: Plesteran siar kedap air dan perapian tanggul akhir.",
      narasiRisiko:
        "Risiko genangan air hujan diatasi dengan penyediaan 2 unit pompa alkon portabel dan pemasangan terpal penutup pada parit yang sedang digali.",
      dokumen: ["proposal-tani-muda.pdf", "daftar-anggota-ktp.pdf"],
      skor: {
        total: 95.0,
        rincian: {
          harga: 38.0,
          tenagaLokal: 30.0,
          pengalaman: 17.0,
          durasi: 10.0,
        },
        flags: [],
        versiBobot: "v1.0",
      },
      flagsDetail: [],
      ringkasanAi: {
        model: "meta-llama/llama-3.3-70b-instruct",
        ringkasanEksekutif:
          "Proposal sangat solid dengan mengutamakan 90% warga setempat. Biaya penawaran rasional di angka Rp88 juta (88% dari pagu) dengan metode mitigasi genangan air yang realistis.",
        poinKekuatan: [
          "Serapan tenaga kerja lokal mencapai 90% (9 dari 10 pekerja adalah warga RT setempat)",
          "Metode pengerjaan bertahap 50 meter per segmen meminimalkan risiko longsor galian basah",
          "Harga penawaran efisien dan meninggalkan buffer biaya yang sehat untuk kualitas adukan mortar",
        ],
        poinPerhatian: [
          "Bukti sertifikat keahlian tukang batu belum dilampirkan secara tertulis (hanya surat keterangan warga)",
          "Perlu jadwal cadangan jika terjadi curah hujan tinggi ekstrem di pertengahan minggu ke-4",
        ],
        rekomendasiCatatan:
          "Rekomendasi tertinggi untuk disetujui. Verifikasi fisik ketersediaan alat pompa alkon saat survei awal.",
      },
    },
    {
      id: "seed_proposal_003",
      namaKelompok: "Kelompok Tukang RT 3",
      ketua: "Budi Santoso",
      penawaran: 62_000_000,
      durasiHari: 40,
      tenagaTotal: 8,
      tenagaLokal: 8,
      persentaseLokal: 100,
      narasiMetode:
        "Dikerjakan 100% oleh warga tukang RT 3 dengan material batu kali lokal yang hemat. Pekerjaan dinding penahan dan saluran drainase menggunakan pasangan batu belah tipe 1:4 dengan sistem pengeringan air tanah dan plesteran kedap air ketebalan 15mm.",
      narasiJadwal:
        "Pengerjaan teratur selama 40 hari kalender dengan pengawasan langsung oleh pengurus RT.",
      narasiRisiko:
        "Keterlambatan suplai material batu diantisipasi dengan pemesanan awal dari pemasok utama kuari lokal.",
      dokumen: ["proposal-tukang-rt3.pdf", "sk-kelompok.pdf"],
      skor: {
        total: 82.0,
        rincian: {
          harga: 25.0,
          tenagaLokal: 30.0,
          pengalaman: 18.0,
          durasi: 9.0,
        },
        flags: ["ANGGOTA_GANDA", "KEMIRIPAN_TEKS"],
        versiBobot: "v1.0",
      },
      flagsDetail: [
        {
          tipe: "ANGGOTA_GANDA",
          label: "Anggota Tumpang Tindih",
          deskripsi:
            "Anggota 'Wahyu Pratama' terdaftar di 2 kelompok penawar berbeda pada proyek yang sama (Kelompok Tukang RT 3 & CV Karya Warga).",
          tingkat: "warning",
        },
        {
          tipe: "KEMIRIPAN_TEKS",
          label: "Indikasi Kemiripan Teks 75%",
          deskripsi:
            "Paragraf narasi metode teknis terdeteksi 75% identik dengan proposal CV Karya Warga (indikasi penyusun proposal sama).",
          tingkat: "warning",
        },
      ],
      ringkasanAi: {
        model: "meta-llama/llama-3.3-70b-instruct",
        ringkasanEksekutif:
          "Penawaran sangat hemat (Rp62 juta, 62% pagu) dengan 100% pekerja lokal RT 3. Namun terdapat anomali harga terlalu rendah (underbidding) dan indikasi kolusi penyusunan proposal bersama CV Karya Warga.",
        poinKekuatan: [
          "100% tenaga kerja lokal warga RT 03 Dusun Krajan",
          "Biaya sangat ekonomis sehingga berpotensi menghemat anggaran desa",
        ],
        poinPerhatian: [
          "Harga penawaran Rp62 juta berada jauh di bawah HPS (Rp100 juta), berisiko pada penurunan kualitas semen mortar batu kali",
          "Terdeteksi anggota ganda (Wahyu Pratama) serta kemiripan teks dengan kelompok penawar lain",
        ],
        rekomendasiCatatan:
          "Wajib dilakukan klarifikasi teknis spesifikasi batu belah dan wawancara independen terhadap anggota yang tumpang tindih sebelum penetapan pemenang.",
      },
    },
    {
      id: "seed_proposal_002",
      namaKelompok: "CV Karya Warga",
      ketua: "Joko Widodo",
      penawaran: 99_000_000,
      durasiHari: 25,
      tenagaTotal: 12,
      tenagaLokal: 6,
      persentaseLokal: 50,
      narasiMetode:
        "Pengerjaan cepat dengan alat bantu mekanis dan tenaga terampil campuran dari luar dusun. Pekerjaan dinding penahan dan saluran drainase menggunakan pasangan batu belah tipe 1:4 dengan sistem pengeringan air tanah dan plesteran kedap air ketebalan 15mm.",
      narasiJadwal:
        "Jadwal padat 25 hari kerja maraton dengan sistem dua shift kerja harian.",
      narasiRisiko:
        "Keterlambatan suplai material batu diantisipasi dengan pemesanan awal dari pemasok utama kuari lokal.",
      dokumen: ["proposal-cv-karya-warga.pdf"],
      skor: {
        total: 66.0,
        rincian: {
          harga: 28.0,
          tenagaLokal: 15.0,
          pengalaman: 15.0,
          durasi: 8.0,
        },
        flags: ["TENAGA_LOKAL_KURANG", "ANGGOTA_GANDA", "KEMIRIPAN_TEKS"],
        versiBobot: "v1.0",
      },
      flagsDetail: [
        {
          tipe: "TENAGA_LOKAL_KURANG",
          label: "Pelanggaran Syarat Tenaga Lokal",
          deskripsi:
            "Proporsi tenaga lokal hanya 50% (6 dari 12 orang), tidak memenuhi syarat ambang batas minimal sayembara swakelola (70%).",
          tingkat: "danger",
        },
        {
          tipe: "ANGGOTA_GANDA",
          label: "Anggota Tumpang Tindih",
          deskripsi:
            "Anggota 'Wahyu Pratama' terdaftar di CV Karya Warga dan Kelompok Tukang RT 3.",
          tingkat: "warning",
        },
        {
          tipe: "KEMIRIPAN_TEKS",
          label: "Indikasi Kemiripan Teks 75%",
          deskripsi:
            "Narasi spesifikasi teknis identik dengan proposal Kelompok Tukang RT 3.",
          tingkat: "warning",
        },
      ],
      ringkasanAi: {
        model: "meta-llama/llama-3.3-70b-instruct",
        ringkasanEksekutif:
          "Penawaran mendekati pagu maksimal (Rp99 juta) dengan klaim durasi maraton 25 hari. Proposal ini melanggar syarat batas padat karya lokal dan terindikasi sebagai proposal bayangan (bid rigging companion).",
        poinKekuatan: [
          "Target waktu pelaksanaan singkat (25 hari kerja) dengan bantuan molen beton",
        ],
        poinPerhatian: [
          "Hanya melibatkan 50% tenaga lokal, melanggar batas regulasi PKTD sayembara desa",
          "Harga penawaran 99% dari pagu mencurigakan bila disandingkan dengan kemiripan teks proposal RT 3",
          "Ditemukan anggota ganda bernama Wahyu Pratama",
        ],
        rekomendasiCatatan:
          "Proposal tidak direkomendasikan karena gugur pada kepatuhan kuota tenaga kerja lokal dan indikasi kolusi penawaran.",
      },
    },
  ],
};

export function getMockProjectById(id?: string): ProjectDetailData {
  if (!id || id === "seed_proyek_001" || id === "proj-drainase-rt3") {
    return mockProjectDrainase;
  }

  // Fallback variant for other IDs
  return {
    ...mockProjectDrainase,
    id,
    judul: `Proyek Sayembara (${id})`,
  };
}

