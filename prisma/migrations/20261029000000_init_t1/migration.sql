-- Aktifkan ekstensi pg_trgm untuk kemiripan teks
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "KelasProyek" AS ENUM ('KECIL', 'MENENGAH', 'BESAR');

-- CreateEnum
CREATE TYPE "Jalur" AS ENUM ('SAYEMBARA', 'VENDOR');

-- CreateEnum
CREATE TYPE "StatusProyek" AS ENUM ('PEMATANGAN', 'TENDER_DIBUKA', 'PEMILIHAN_VENDOR', 'SELEKSI', 'VERIFIKASI_KOMPETENSI', 'MASA_SANGGAH', 'PENGERJAAN', 'SELESAI', 'DIBATALKAN');

-- CreateEnum
CREATE TYPE "StatusAnalisis" AS ENUM ('MENUNGGU', 'BERHASIL', 'GAGAL');

-- CreateEnum
CREATE TYPE "JenisFlag" AS ENUM ('TEKS', 'ANGGOTA');

-- CreateEnum
CREATE TYPE "KeputusanFlag" AS ENUM ('BELUM', 'WAJAR', 'KLARIFIKASI', 'TIDAK_SAH');

-- CreateTable
CREATE TABLE "Pengguna" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Pengguna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desa" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL DEFAULT 0,
    "pagu" BIGINT NOT NULL,
    "pagukdmp" BIGINT NOT NULL DEFAULT 0,
    "konfigurasi" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Desa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proyek" (
    "id" TEXT NOT NULL,
    "desaId" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "pagu" BIGINT NOT NULL,
    "kelas" "KelasProyek" NOT NULL,
    "jalur" "Jalur",
    "alasanJalur" TEXT,
    "status" "StatusProyek" NOT NULL DEFAULT 'PEMATANGAN',
    "tenggatProposal" TIMESTAMP(3),
    "akhirMasaSanggah" TIMESTAMP(3),
    "syaratLokalMin" INTEGER NOT NULL DEFAULT 70,
    "durasiMin" INTEGER NOT NULL DEFAULT 30,
    "durasiMax" INTEGER NOT NULL DEFAULT 90,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proyek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RabItem" (
    "id" TEXT NOT NULL,
    "proyekId" TEXT NOT NULL,
    "uraian" TEXT NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "satuan" TEXT NOT NULL,
    "hargaSatuan" BIGINT NOT NULL,

    CONSTRAINT "RabItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelompok" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "ketuaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kelompok_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnggotaKelompok" (
    "id" TEXT NOT NULL,
    "kelompokId" TEXT NOT NULL,
    "penggunaId" TEXT,
    "nama" TEXT,
    "rtRw" TEXT,
    "nikHash" TEXT,
    "ketua" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AnggotaKelompok_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "proyekId" TEXT NOT NULL,
    "kelompokId" TEXT NOT NULL,
    "penawaran" BIGINT NOT NULL,
    "durasiHari" INTEGER NOT NULL,
    "tenagaTotal" INTEGER NOT NULL,
    "tenagaLokal" INTEGER NOT NULL,
    "narasiMetode" TEXT NOT NULL,
    "narasiJadwal" TEXT NOT NULL,
    "narasiRisiko" TEXT NOT NULL,
    "dokumen" TEXT[],
    "kelengkapan" JSONB NOT NULL,
    "dikirimPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusAnalisis" "StatusAnalisis" NOT NULL DEFAULT 'MENUNGGU',

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RingkasanAi" (
    "id" TEXT NOT NULL,
    "proposalId" TEXT NOT NULL,
    "json" JSONB NOT NULL,
    "model" TEXT NOT NULL,
    "versiPrompt" TEXT NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RingkasanAi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skor" (
    "id" TEXT NOT NULL,
    "proposalId" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "rincian" JSONB NOT NULL,
    "flags" JSONB NOT NULL,
    "versiBobot" TEXT NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Skor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlagKemiripan" (
    "id" TEXT NOT NULL,
    "proyekId" TEXT NOT NULL,
    "proposalAId" TEXT NOT NULL,
    "proposalBId" TEXT NOT NULL,
    "nilai" DOUBLE PRECISION NOT NULL,
    "jenis" "JenisFlag" NOT NULL,
    "keputusan" "KeputusanFlag" NOT NULL DEFAULT 'BELUM',
    "catatan" TEXT,

    CONSTRAINT "FlagKemiripan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Proyek_desaId_status_idx" ON "Proyek"("desaId", "status");

-- CreateIndex
CREATE INDEX "RabItem_proyekId_idx" ON "RabItem"("proyekId");

-- CreateIndex
CREATE INDEX "AnggotaKelompok_nikHash_idx" ON "AnggotaKelompok"("nikHash");

-- CreateIndex
CREATE INDEX "AnggotaKelompok_kelompokId_idx" ON "AnggotaKelompok"("kelompokId");

-- CreateIndex
CREATE INDEX "Proposal_proyekId_idx" ON "Proposal"("proyekId");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_proyekId_kelompokId_key" ON "Proposal"("proyekId", "kelompokId");

-- CreateIndex
CREATE UNIQUE INDEX "RingkasanAi_proposalId_key" ON "RingkasanAi"("proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "Skor_proposalId_key" ON "Skor"("proposalId");

-- CreateIndex
CREATE INDEX "FlagKemiripan_proyekId_idx" ON "FlagKemiripan"("proyekId");

-- Buat indeks GIN trigram untuk narasi proposal
CREATE INDEX IF NOT EXISTS "Proposal_narasiMetode_trgm_idx" ON "Proposal" USING gin ("narasiMetode" gin_trgm_ops);

-- AddForeignKey
ALTER TABLE "Proyek" ADD CONSTRAINT "Proyek_desaId_fkey" FOREIGN KEY ("desaId") REFERENCES "Desa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RabItem" ADD CONSTRAINT "RabItem_proyekId_fkey" FOREIGN KEY ("proyekId") REFERENCES "Proyek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelompok" ADD CONSTRAINT "Kelompok_ketuaId_fkey" FOREIGN KEY ("ketuaId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnggotaKelompok" ADD CONSTRAINT "AnggotaKelompok_kelompokId_fkey" FOREIGN KEY ("kelompokId") REFERENCES "Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnggotaKelompok" ADD CONSTRAINT "AnggotaKelompok_penggunaId_fkey" FOREIGN KEY ("penggunaId") REFERENCES "Pengguna"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_proyekId_fkey" FOREIGN KEY ("proyekId") REFERENCES "Proyek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_kelompokId_fkey" FOREIGN KEY ("kelompokId") REFERENCES "Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RingkasanAi" ADD CONSTRAINT "RingkasanAi_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skor" ADD CONSTRAINT "Skor_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagKemiripan" ADD CONSTRAINT "FlagKemiripan_proyekId_fkey" FOREIGN KEY ("proyekId") REFERENCES "Proyek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagKemiripan" ADD CONSTRAINT "FlagKemiripan_proposalAId_fkey" FOREIGN KEY ("proposalAId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagKemiripan" ADD CONSTRAINT "FlagKemiripan_proposalBId_fkey" FOREIGN KEY ("proposalBId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

