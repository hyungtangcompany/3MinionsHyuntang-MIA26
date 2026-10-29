import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  HardHat,
  Users,
  Coins,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Sparkles,
  Award,
  Clock,
  Briefcase,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LandingIdeaList } from "@/components/landing-idea-list";
import {
  mockDesaInfo,
  mockMetrics,
  mockRecentProjects,
  mockPopularIdeas,
} from "@/lib/mock-data";
import { formatRupiah } from "@/lib/format";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-akar-bg text-akar-ink">
      <Navbar />

      <main className="flex-1">
        {/* ================= 1. HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-8 pb-14 sm:pt-16 sm:pb-20 border-b border-akar-border/60 bg-gradient-to-b from-white via-akar-bg to-akar-bg">
          {/* Subtle background ambient decorations with brand tokens */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
          >
            <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-akar-primary-light blur-3xl" />
            <div className="absolute top-1/3 left-10 h-64 w-64 rounded-full bg-akar-accent-light blur-2xl" />
            <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-akar-earth-light blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              {/* Competition & Initiative Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-akar-primary/25 bg-akar-primary-light px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-akar-primary shadow-xs">
                <Sparkles className="h-4 w-4 text-akar-accent fill-akar-accent" />
                <span>Inisiatif Transparansi & Padat Karya Tunai Desa 2026</span>
              </div>

              {/* Main Headline (PRD 27.2) */}
              <h1 className="text-3xl font-extrabold tracking-tight text-akar-ink sm:text-5xl lg:text-6xl leading-[1.15]">
                Dana desa yang terbuka,{" "}
                <span className="text-akar-primary underline decoration-akar-accent decoration-wavy decoration-2 underline-offset-8">
                  dikerjakan oleh warganya
                </span>
              </h1>

              {/* 1-sentence explanatory subheadline */}
              <p className="text-base sm:text-xl text-akar-muted leading-relaxed font-normal max-w-2xl mx-auto">
                Buku kas publik yang berlog dan tak bisa diubah diam-diam, dipadukan
                dengan bursa kerja sayembara swakelola agar pemuda dan tukang lokal
                menjadi pelaksana utama pembangunan desa.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
                <Link href="/proyek" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto min-h-[48px] px-8 text-base shadow-md group"
                  >
                    <span>Lihat sayembara</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href="/ide" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto min-h-[48px] px-8 text-base border-akar-earth/30 text-akar-earth hover:bg-akar-earth-light hover:text-akar-earth font-semibold"
                  >
                    <Lightbulb className="mr-2 h-5 w-5 text-akar-earth" />
                    <span>Kirim ide</span>
                  </Button>
                </Link>
              </div>

              {/* 3 Micro Trust Signals */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto">
                <div className="flex items-center gap-2.5 rounded-lg border border-akar-border bg-white/80 p-2.5 text-xs text-akar-muted shadow-2xs">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-akar-primary" />
                  <span>Buku kas publik rantai hash berbukti</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-lg border border-akar-border bg-white/80 p-2.5 text-xs text-akar-muted shadow-2xs">
                  <HardHat className="h-5 w-5 shrink-0 text-akar-earth" />
                  <span>Prioritas tukang lokal minimal 70%</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-lg border border-akar-border bg-white/80 p-2.5 text-xs text-akar-muted shadow-2xs">
                  <Users className="h-5 w-5 shrink-0 text-akar-primary" />
                  <span>Diawasi BPD & terbuka untuk sanggah</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. 4 IMPACT METRIC CARDS ================= */}
        <section
          aria-labelledby="metrics-heading"
          className="py-12 sm:py-16 bg-white border-b border-akar-border/80"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-akar-earth">
                  <span className="inline-block h-2 w-2 rounded-full bg-akar-earth" />
                  Transparansi Anggaran Real-Time
                </div>
                <h2
                  id="metrics-heading"
                  className="mt-1 text-2xl font-bold tracking-tight text-akar-ink sm:text-3xl"
                >
                  Statistik Dana & Pembangunan
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-akar-muted">
                  Data berjalan {mockDesaInfo.nama}, {mockDesaInfo.kecamatan}, {mockDesaInfo.kabupaten} (Tahun {mockDesaInfo.tahun})
                </p>
              </div>

              <Link
                href="/kas"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-akar-primary hover:text-akar-primary-hover min-h-[44px]"
              >
                <span>Periksa Buku Kas Publik</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 1: Pagu Desa */}
              <Card className="relative overflow-hidden border-akar-border/80 bg-gradient-to-br from-white to-stone-50/50 hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-akar-primary" />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-akar-muted">
                      Pagu APBDes 2026
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-akar-primary-light text-akar-primary">
                      <Coins className="h-4 w-4" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-extrabold text-akar-primary mt-2">
                    {formatRupiah(mockMetrics.paguDesa)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-5">
                  <p className="text-xs text-akar-muted leading-relaxed">
                    KDMP 58,03% (Rp580,3 Jt) &amp; Pagu Reguler Desa (Rp419,7 Jt).
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-akar-earth">
                    <FileSpreadsheet className="h-3 w-3" />
                    <span>Sesuai PMK 7/2026</span>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2: Realisasi Kas */}
              <Card className="relative overflow-hidden border-akar-border/80 bg-gradient-to-br from-white to-stone-50/50 hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-akar-earth" />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-akar-muted">
                      Realisasi Kas
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-akar-earth-light text-akar-earth">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-extrabold text-akar-earth mt-2">
                    {formatRupiah(mockMetrics.realisasiKas)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-5">
                  <div className="flex items-center justify-between text-xs text-akar-muted mb-1.5">
                    <span>Penyerapan</span>
                    <span className="font-bold text-akar-ink">
                      {mockMetrics.realisasiPersen}% tersalur
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className="h-full bg-akar-earth rounded-full transition-all"
                      style={{ width: `${mockMetrics.realisasiPersen}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-akar-muted">
                    Semua pencairan berbukti transfer &amp; verifikasi pengawas.
                  </p>
                </CardContent>
              </Card>

              {/* Card 3: Proyek Berjalan */}
              <Card className="relative overflow-hidden border-akar-border/80 bg-gradient-to-br from-white to-stone-50/50 hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-akar-accent" />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-akar-muted">
                      Proyek Berjalan
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-akar-accent-light text-akar-ink">
                      <Briefcase className="h-4 w-4" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-extrabold text-akar-ink mt-2">
                    {mockMetrics.proyekBerjalan} <span className="text-base font-semibold text-akar-muted">Paket</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-5">
                  <p className="text-xs text-akar-muted leading-relaxed">
                    1 paket sayembara aktif (Drainase), 1 paket pengerjaan fisik (Balai).
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <Badge variant="accent" className="text-[10px]">
                      Sayembara Terbuka
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Card 4: Serapan Tenaga Kerja Lokal */}
              <Card className="relative overflow-hidden border-akar-border/80 bg-gradient-to-br from-white to-stone-50/50 hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-akar-primary" />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-akar-muted">
                      Tenaga Kerja Lokal
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-akar-primary-light text-akar-primary">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-extrabold text-akar-primary mt-2">
                    {mockMetrics.serapanTenagaLokalPersen}%
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-5">
                  <p className="text-xs text-akar-muted leading-relaxed">
                    Terserap dari warga &amp; pemuda desa (melampaui syarat minimum 70%).
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-akar-primary">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Standar PKTD Terpenuhi</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ================= 3. CARA KERJA AKAR (4 Philosophy Cards) ================= */}
        <section
          aria-labelledby="philosophy-heading"
          className="py-14 sm:py-20 bg-akar-bg border-b border-akar-border/60"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
              <Badge variant="earth" className="text-xs uppercase tracking-wider font-bold">
                Filosofi &amp; Cara Kerja
              </Badge>
              <h2
                id="philosophy-heading"
                className="text-2xl sm:text-4xl font-extrabold text-akar-ink tracking-tight"
              >
                Empat Pilar Tata Kelola AKAR
              </h2>
              <p className="text-sm sm:text-base text-akar-muted">
                Setiap tahapan dirancang untuk mencegah kecurangan, membuka lapangan kerja
                lokal, dan menjamin akuntabilitas tanpa memperpanjang birokrasi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* A - Aspirasi */}
              <Card className="flex flex-col justify-between border-akar-border bg-white hover:border-akar-primary/40 hover:shadow-md transition-all">
                <CardHeader className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-akar-primary text-white font-black text-xl shadow-xs">
                    A
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-akar-primary">
                      Pilar 1
                    </span>
                    <CardTitle className="text-lg">Aspirasi Warga</CardTitle>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    Kirim &amp; kawal ide atau aduan pembangunan desa secara terbuka.
                    Warga di desa maupun perantauan dapat mengusulkan proyek tanpa
                    titipan pejabat.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="rounded-lg bg-stone-50 border border-akar-border/70 p-3 text-xs text-akar-muted space-y-1.5">
                    <div className="font-semibold text-akar-ink">Karakteristik Kunci:</div>
                    <ul className="space-y-1 list-disc list-inside text-[11px]">
                      <li>Tenggat respon kades 14 hari</li>
                      <li>Deteksi ide kembar otomatis</li>
                      <li>Dukungan publik transparan</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* K - Keterbukaan */}
              <Card className="flex flex-col justify-between border-akar-border bg-white hover:border-akar-earth/40 hover:shadow-md transition-all">
                <CardHeader className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-akar-earth text-white font-black text-xl shadow-xs">
                    K
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-akar-earth">
                      Pilar 2
                    </span>
                    <CardTitle className="text-lg">Keterbukaan Kas</CardTitle>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    Transparansi anggaran buku kas publik hingga micro-RAB per proyek.
                    Catatan pengeluaran tersusun dalam rantai hash yang tidak bisa diedit
                    atau dihapus diam-diam.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="rounded-lg bg-stone-50 border border-akar-border/70 p-3 text-xs text-akar-muted space-y-1.5">
                    <div className="font-semibold text-akar-ink">Karakteristik Kunci:</div>
                    <ul className="space-y-1 list-disc list-inside text-[11px]">
                      <li>Rincian belanja micro-RAB</li>
                      <li>Log append-only (rantai SHA-256)</li>
                      <li>Pemisahan pencatat &amp; pengawas</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* A - Aksi */}
              <Card className="flex flex-col justify-between border-akar-border bg-white hover:border-akar-accent/60 hover:shadow-md transition-all">
                <CardHeader className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-akar-accent text-akar-ink font-black text-xl shadow-xs">
                    A
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-akar-earth">
                      Pilar 3
                    </span>
                    <CardTitle className="text-lg">Aksi Swakelola</CardTitle>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    Sayembara pengerjaan proyek diprioritaskan bagi kelompok warga
                    dan tukang lokal. Seleksi dinilai dengan rumus aturan objektif
                    yang dapat diaudit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="rounded-lg bg-stone-50 border border-akar-border/70 p-3 text-xs text-akar-muted space-y-1.5">
                    <div className="font-semibold text-akar-ink">Karakteristik Kunci:</div>
                    <ul className="space-y-1 list-disc list-inside text-[11px]">
                      <li>Syarat serapan lokal min. 70%</li>
                      <li>Deteksi tumpang tindih nama/NIK</li>
                      <li>AI merangkum, kades memutuskan</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* R - Realisasi */}
              <Card className="flex flex-col justify-between border-akar-border bg-white hover:border-akar-primary/40 hover:shadow-md transition-all">
                <CardHeader className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-akar-primary text-white font-black text-xl shadow-xs">
                    R
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-akar-primary">
                      Pilar 4
                    </span>
                    <CardTitle className="text-lg">Realisasi Berbukti</CardTitle>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    Pantau laporan progres mingguan dengan foto metadata lapangan.
                    Pencairan termin (0%, 50%, 100%) hanya bisa dibuka setelah progres
                    diverifikasi pengawas independen.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="rounded-lg bg-stone-50 border border-akar-border/70 p-3 text-xs text-akar-muted space-y-1.5">
                    <div className="font-semibold text-akar-ink">Karakteristik Kunci:</div>
                    <ul className="space-y-1 list-disc list-inside text-[11px]">
                      <li>Laporan foto dengan EXIF geotag</li>
                      <li>Termin terkunci sebelum progres cukup</li>
                      <li>Tiket audit terbuka pasca-proyek</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ================= 4. RECENT PROJECTS PREVIEW ================= */}
        <section
          aria-labelledby="recent-projects-heading"
          className="py-14 sm:py-20 bg-white border-b border-akar-border/80"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-akar-primary">
                  <Award className="h-3.5 w-3.5" />
                  Sayembara &amp; Pengerjaan Terbuka
                </div>
                <h2
                  id="recent-projects-heading"
                  className="mt-1 text-2xl font-bold tracking-tight text-akar-ink sm:text-3xl"
                >
                  Proyek Desa Terbaru
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-akar-muted">
                  Daftar sayembara swakelola yang sedang dibuka dan dipantau progresnya oleh warga.
                </p>
              </div>

              <Link href="/proyek">
                <Button variant="outline" className="min-h-[44px] font-semibold text-akar-primary border-akar-primary/30 hover:bg-akar-primary-light">
                  <span>Lihat Semua Sayembara</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockRecentProjects.map((project) => (
                <Card
                  key={project.id}
                  className="flex flex-col justify-between border-akar-border/80 hover:border-akar-primary/40 hover:shadow-md transition-all duration-200"
                >
                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant={
                          project.status === "TENDER_DIBUKA"
                            ? "default"
                            : project.status === "PENGERJAAN"
                            ? "earth"
                            : "neutral"
                        }
                        className="text-xs"
                      >
                        {project.status === "TENDER_DIBUKA" && (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {project.status === "PENGERJAAN" && (
                          <HardHat className="h-3 w-3 mr-1" />
                        )}
                        {project.status === "SELESAI" && (
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                        )}
                        {project.statusLabel}
                      </Badge>

                      <Badge variant="outline" className="text-[11px] text-akar-muted">
                        {project.sumberIdeLabel}
                      </Badge>
                    </div>

                    <CardTitle className="text-lg leading-snug">
                      {project.judul}
                    </CardTitle>

                    <div className="flex items-center gap-1.5 text-xs text-akar-muted">
                      <MapPin className="h-3.5 w-3.5 text-akar-earth shrink-0" />
                      <span>{project.lokasi}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 pb-4">
                    <p className="text-xs sm:text-sm text-akar-muted leading-relaxed line-clamp-3">
                      {project.deskripsi}
                    </p>

                    <div className="rounded-lg bg-stone-50 border border-akar-border/60 p-3 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-akar-muted">Pagu Anggaran:</span>
                        <span className="font-extrabold text-akar-primary text-sm">
                          {formatRupiah(project.pagu)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-akar-muted">
                        <span>Serapan Tukang Lokal:</span>
                        <span className="font-semibold text-akar-ink">
                          {project.serapanLokal}% warga
                        </span>
                      </div>
                      {project.tenggatHari && (
                        <div className="flex justify-between items-center text-akar-earth font-medium pt-1 border-t border-akar-border/40">
                          <span>Sisa Waktu Tender:</span>
                          <span className="font-bold">{project.tenggatHari} hari kalender</span>
                        </div>
                      )}
                      {project.progresPersen !== undefined && (
                        <div className="pt-1 border-t border-akar-border/40">
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-akar-muted">Progres Fisik:</span>
                            <span className="font-bold text-akar-ink">{project.progresPersen}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-akar-primary rounded-full"
                              style={{ width: `${project.progresPersen}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3 flex items-center justify-between border-t border-akar-border/60">
                    <span className="text-xs font-medium text-akar-muted">
                      Jalur: <strong className="text-akar-ink">{project.jalurLabel}</strong>
                    </span>

                    <Link href={`/proyek/${project.id}`}>
                      <Button
                        size="sm"
                        variant={project.status === "TENDER_DIBUKA" ? "default" : "outline"}
                        className="min-h-[44px] text-xs font-semibold"
                      >
                        {project.status === "TENDER_DIBUKA" ? "Ajukan Proposal" : "Lihat Detail"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. POPULAR IDEAS (Aspirasi Warga) ================= */}
        <section
          aria-labelledby="popular-ideas-heading"
          className="py-14 sm:py-20 bg-akar-bg border-b border-akar-border/80"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-akar-earth">
                  <Lightbulb className="h-3.5 w-3.5" />
                  Saluran Demokrasi Desa
                </div>
                <h2
                  id="popular-ideas-heading"
                  className="mt-1 text-2xl font-bold tracking-tight text-akar-ink sm:text-3xl"
                >
                  Aspirasi &amp; Aduan Warga Terpopuler
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-akar-muted">
                  Ide pembangunan yang diusulkan oleh warga dan didukung masyarakat untuk masuk prioritas APBDes.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/ide/baru">
                  <Button
                    variant="earth"
                    className="min-h-[44px] font-semibold text-white shadow-xs"
                  >
                    <Lightbulb className="mr-2 h-4 w-4" />
                    <span>Usulkan Ide Baru</span>
                  </Button>
                </Link>
                <Link href="/ide">
                  <Button variant="outline" className="min-h-[44px]">
                    Semua Ide
                  </Button>
                </Link>
              </div>
            </div>

            {/* Interactive Community Ideas Grid */}
            <LandingIdeaList ideas={mockPopularIdeas} />

            {/* Bottom Callout Box for Participatory Input */}
            <div className="mt-10 rounded-xl border border-akar-primary/20 bg-akar-primary-light/40 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-akar-primary text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-akar-ink">
                    Punya aduan jalan rusak atau usulan fasilitas umum?
                  </h4>
                  <p className="text-xs text-akar-muted mt-0.5">
                    Setiap usulan warga wajib ditanggapi perangkat desa dalam waktu maksimal 14 hari kalender.
                  </p>
                </div>
              </div>

              <Link href="/ide/baru" className="w-full sm:w-auto shrink-0">
                <Button className="w-full sm:w-auto min-h-[44px] text-xs font-semibold">
                  Kirim Aspirasi Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 6. FINAL BANNER / CTA FOR JURY & CITIZENS ================= */}
        <section className="py-14 sm:py-16 bg-gradient-to-r from-akar-primary to-akar-primary-hover text-white">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
            <Badge variant="accent" className="text-xs uppercase font-extrabold px-3 py-1 text-akar-ink bg-akar-accent">
              Web In Action • MIA 2026
            </Badge>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Membangun Desa dengan Keterbukaan Penuh &amp; Pemberdayaan Nyata
            </h2>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
              AKAR menutup celah kecurigaan anggaran desa dengan menyatukan buku kas ber-log rantai hash,
              sayembara kerja swakelola warga, serta pengawasan berbukti foto dan termin transparan.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/proyek" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="accent"
                  className="w-full sm:w-auto min-h-[48px] px-8 text-akar-ink font-bold shadow-md hover:bg-akar-accent-hover"
                >
                  Jelajahi Sayembara Proyek
                </Button>
              </Link>
              <Link href="/data" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto min-h-[48px] px-8 bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white font-semibold"
                >
                  <FileSpreadsheet className="mr-2 h-5 w-5" />
                  Unduh Data Terbuka
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
