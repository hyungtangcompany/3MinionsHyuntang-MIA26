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
  ChevronDown,
  Sparkles,
  Database,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SlideIndicator } from "@/components/slide-indicator";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LandingProjectsIdeas } from "@/components/landing-projects-ideas";
import {
  mockDesaInfo,
  mockMetrics,
  mockRecentProjects,
  mockPopularIdeas,
} from "@/lib/mock-data";
import { formatRupiah } from "@/lib/format";

export default function HomePage() {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-akar-bg text-akar-ink">
      {/* Fixed Translucent Navbar */}
      <Navbar />

      {/* Floating Dot Pagination for Desktop */}
      <SlideIndicator />

      {/* ========================================================================= */}
      {/* SLIDE 1: HERO SECTION WITH VILLAGE BACKGROUND                             */}
      {/* ========================================================================= */}
      <section
        id="slide-hero"
        aria-label="Beranda Utama"
        className="min-h-screen lg:h-screen w-full snap-start flex flex-col justify-center items-center relative p-4 sm:p-6 lg:p-8 pt-20 lg:pt-16 overflow-hidden bg-akar-ink"
      >
        {/* Authentic Indonesian Rural Village Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />

        {/* High-Contrast Brand Overlay (WCAG AAA/AA compliance) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-akar-ink via-akar-ink/80 to-stone-950/70 backdrop-blur-[1.5px]"
        />

        {/* Ambient Brand Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-akar-primary/25 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-akar-accent/20 blur-3xl pointer-events-none"
        />

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center space-y-5 sm:space-y-6">
          {/* Competition Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-akar-accent/40 bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-akar-accent shadow-md">
            <Sparkles className="h-4 w-4 fill-akar-accent text-akar-accent" />
            <span>Inisiatif Transparansi &amp; Padat Karya Tunai Desa • WIA MIA 2026</span>
          </div>

          {/* Main Headline (PRD 27.2) */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15] drop-shadow-sm">
            Dana desa yang terbuka,{" "}
            <span className="text-akar-accent">
              dikerjakan oleh warganya
            </span>
          </h1>

          {/* Explanatory Subheadline */}
          <p className="text-sm sm:text-lg lg:text-xl text-stone-200 leading-relaxed font-normal max-w-2xl mx-auto drop-shadow-xs">
            Buku kas publik yang berlog dan tak bisa diubah diam-diam, dipadukan
            dengan bursa kerja sayembara swakelola agar pemuda dan tukang lokal
            menjadi pelaksana utama pembangunan desa.
          </p>

          {/* Two Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full sm:w-auto">
            <Link href="/proyek" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto min-h-[48px] px-8 text-base font-bold bg-akar-primary hover:bg-akar-primary-hover text-white shadow-lg shadow-black/30 group"
              >
                <span>Lihat sayembara</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/ide" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto min-h-[48px] px-8 text-base font-semibold bg-white/10 hover:bg-white/20 text-white border-white/40 backdrop-blur-sm"
              >
                <Lightbulb className="mr-2 h-5 w-5 text-akar-accent" />
                <span>Kirim ide</span>
              </Button>
            </Link>
          </div>

          {/* 3 Micro Trust Signals */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-left w-full max-w-2xl">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/35 backdrop-blur-md p-2.5 text-xs text-stone-200">
              <ShieldCheck className="h-5 w-5 shrink-0 text-akar-accent" />
              <span>Buku kas rantai hash berbukti</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/35 backdrop-blur-md p-2.5 text-xs text-stone-200">
              <HardHat className="h-5 w-5 shrink-0 text-akar-accent" />
              <span>Serapan tukang lokal $\ge 70\%$</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/35 backdrop-blur-md p-2.5 text-xs text-stone-200">
              <Users className="h-5 w-5 shrink-0 text-akar-accent" />
              <span>Diawasi BPD &amp; terbuka disanggah</span>
            </div>
          </div>
        </div>

        {/* Scroll Hint Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-stone-300 pointer-events-none">
          <span className="text-[11px] font-medium tracking-wider uppercase opacity-80 mb-1">
            Gulir ke Bawah
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce text-akar-accent" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SLIDE 2: IMPACT METRICS (4 ANGKA RINGKAS - DESA KARANG SARI)               */}
      {/* ========================================================================= */}
      <section
        id="slide-metrik"
        aria-label="Metrik Transparansi Dana Desa"
        className="min-h-screen lg:h-screen w-full snap-start flex flex-col justify-center items-center relative p-4 sm:p-6 lg:p-8 pt-20 lg:pt-16 bg-white border-b border-akar-border/80"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center h-full">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-akar-earth">
                <span className="inline-block h-2 w-2 rounded-full bg-akar-earth" />
                Data Berjalan APBDes 2026
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-akar-ink mt-1">
                Angka Realisasi &amp; Serapan Warga
              </h2>
              <p className="text-xs sm:text-sm text-akar-muted mt-1">
                Laporan terbuka {mockDesaInfo.nama}, {mockDesaInfo.kecamatan}, {mockDesaInfo.kabupaten}.
              </p>
            </div>

            <Link href="/kas">
              <Button
                variant="outline"
                className="min-h-[44px] text-xs sm:text-sm font-semibold border-akar-primary/30 text-akar-primary hover:bg-akar-primary-light"
              >
                <span>Periksa Buku Kas Lengkap</span>
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Card 1: Pagu Desa */}
            <Card className="relative overflow-hidden border-akar-border/90 bg-gradient-to-br from-white to-stone-50/60 hover:shadow-md transition-all">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-primary" />
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-akar-muted">
                    Pagu APBDes 2026
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-primary-light text-akar-primary">
                    <Coins className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="text-2xl lg:text-3xl font-extrabold text-akar-primary mt-2">
                  {formatRupiah(mockMetrics.paguDesa)}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-xs text-akar-muted leading-relaxed">
                  Alokasi KDMP 58,03% (Rp580,3 Jt) &amp; Pagu Reguler (Rp419,7 Jt).
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-akar-earth">
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span>Sesuai Ketentuan PMK 7/2026</span>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Realisasi Kas */}
            <Card className="relative overflow-hidden border-akar-border/90 bg-gradient-to-br from-white to-stone-50/60 hover:shadow-md transition-all">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-earth" />
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-akar-muted">
                    Realisasi Kas
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-earth-light text-akar-earth">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="text-2xl lg:text-3xl font-extrabold text-akar-earth mt-2">
                  {formatRupiah(mockMetrics.realisasiKas)}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="flex items-center justify-between text-xs text-akar-muted mb-1.5">
                  <span>Realisasi Berjalan</span>
                  <span className="font-bold text-akar-ink">
                    {mockMetrics.realisasiPersen}% terserap
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-akar-earth rounded-full transition-all"
                    style={{ width: `${mockMetrics.realisasiPersen}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-akar-muted">
                  Tersalur dengan bukti transfer &amp; verifikasi pengawas BPD.
                </p>
              </CardContent>
            </Card>

            {/* Card 3: Proyek Berjalan */}
            <Card className="relative overflow-hidden border-akar-border/90 bg-gradient-to-br from-white to-stone-50/60 hover:shadow-md transition-all">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-accent" />
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-akar-muted">
                    Proyek Berjalan
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-accent-light text-akar-ink">
                    <HardHat className="h-4 w-4 text-akar-earth" />
                  </div>
                </div>
                <CardTitle className="text-2xl lg:text-3xl font-extrabold text-akar-ink mt-2">
                  {mockMetrics.proyekBerjalan}{" "}
                  <span className="text-base font-semibold text-akar-muted">Paket</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-xs text-akar-muted leading-relaxed">
                  1 paket tender terbuka (Drainase) &amp; 1 pengerjaan fisik termin 50% (Balai).
                </p>
                <div className="mt-3 flex items-center gap-1.5">
                  <Badge variant="accent" className="text-[11px]">
                    Sayembara Swakelola Aktif
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Serapan Tenaga Kerja Lokal */}
            <Card className="relative overflow-hidden border-akar-border/90 bg-gradient-to-br from-white to-stone-50/60 hover:shadow-md transition-all">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-primary" />
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-akar-muted">
                    Tenaga Kerja Lokal
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-primary-light text-akar-primary">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="text-2xl lg:text-3xl font-extrabold text-akar-primary mt-2">
                  {mockMetrics.serapanTenagaLokalPersen}%
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-xs text-akar-muted leading-relaxed">
                  Tenaga kerja terserap langsung dari warga &amp; tukang lokal desa.
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-akar-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Syarat PKTD $\ge 70\%$ Terpenuhi</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Transparency Notice */}
          <div className="mt-6 rounded-xl border border-akar-border bg-stone-50 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-akar-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-akar-primary shrink-0" />
              <span>
                Angka buku kas diperbarui langsung dari entri pembayaran bertanda bukti digital dan tidak dapat diubah sepihak.
              </span>
            </div>
            <Link
              href="/kas"
              className="font-semibold text-akar-primary hover:underline shrink-0"
            >
              Lihat Rantai Verifikasi &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SLIDE 3: CARA KERJA AKAR (4 PHILOSOPHY CARDS)                              */}
      {/* ========================================================================= */}
      <section
        id="slide-filosofi"
        aria-label="Filosofi dan Cara Kerja AKAR"
        className="min-h-screen lg:h-screen w-full snap-start flex flex-col justify-center items-center relative p-4 sm:p-6 lg:p-8 pt-20 lg:pt-16 bg-akar-bg border-b border-akar-border/80"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center h-full">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <Badge variant="earth" className="text-xs uppercase tracking-wider font-bold">
              Filosofi Platform
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-akar-ink tracking-tight">
              Empat Pilar Transparansi AKAR
            </h2>
            <p className="text-xs sm:text-sm text-akar-muted">
              Siklus utuh dari aspirasi warga hingga pencairan dana berbukti untuk mencegah penyelewengan.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* A - Aspirasi */}
            <Card className="flex flex-col justify-between border-akar-border bg-white hover:border-akar-primary/50 hover:shadow-md transition-all">
              <CardHeader className="p-5 pb-3 space-y-2.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-akar-primary text-white font-black text-xl shadow-xs">
                  A
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-akar-primary">
                    Pilar 1
                  </span>
                  <CardTitle className="text-base sm:text-lg">Aspirasi Warga</CardTitle>
                </div>
                <CardDescription className="text-xs leading-relaxed">
                  Kirim &amp; kawal ide atau aduan pembangunan desa secara terbuka. Warga di desa maupun perantauan dapat mengusulkan proyek tanpa titipan pejabat.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="rounded-lg bg-stone-50 border border-akar-border/80 p-2.5 text-[11px] text-akar-muted space-y-1">
                  <div className="font-semibold text-akar-ink">Mekanisme:</div>
                  <ul className="space-y-0.5 list-disc list-inside">
                    <li>Batas respon kades 14 hari</li>
                    <li>Deteksi ide kembar otomatis</li>
                    <li>Dukungan publik satu akun</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* K - Keterbukaan */}
            <Card className="flex flex-col justify-between border-akar-border bg-white hover:border-akar-earth/50 hover:shadow-md transition-all">
              <CardHeader className="p-5 pb-3 space-y-2.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-akar-earth text-white font-black text-xl shadow-xs">
                  K
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-akar-earth">
                    Pilar 2
                  </span>
                  <CardTitle className="text-base sm:text-lg">Keterbukaan Kas</CardTitle>
                </div>
                <CardDescription className="text-xs leading-relaxed">
                  Buku kas publik berlog append-only dan rincian micro-RAB per proyek hingga satuan upah tukang dan bahan material.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="rounded-lg bg-stone-50 border border-akar-border/80 p-2.5 text-[11px] text-akar-muted space-y-1">
                  <div className="font-semibold text-akar-ink">Mekanisme:</div>
                  <ul className="space-y-0.5 list-disc list-inside">
                    <li>Rincian micro-RAB terbuka</li>
                    <li>Rantai hash SHA-256 anti-ubah</li>
                    <li>Pemisahan tugas pencatat/pengawas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* A - Aksi */}
            <Card className="flex flex-col justify-between border-akar-border bg-white hover:border-akar-accent/70 hover:shadow-md transition-all">
              <CardHeader className="p-5 pb-3 space-y-2.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-akar-accent text-akar-ink font-black text-xl shadow-xs">
                  A
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-akar-earth">
                    Pilar 3
                  </span>
                  <CardTitle className="text-base sm:text-lg">Aksi Swakelola</CardTitle>
                </div>
                <CardDescription className="text-xs leading-relaxed">
                  Bursa kerja sayembara pengerjaan desa diprioritaskan bagi kelompok warga &amp; tukang setempat, dinilai dengan rumus aturan objektif.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="rounded-lg bg-stone-50 border border-akar-border/80 p-2.5 text-[11px] text-akar-muted space-y-1">
                  <div className="font-semibold text-akar-ink">Mekanisme:</div>
                  <ul className="space-y-0.5 list-disc list-inside">
                    <li>Syarat serapan lokal min. 70%</li>
                    <li>Deteksi tumpang tindih tim/NIK</li>
                    <li>AI merangkum, kades memilih</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* R - Realisasi */}
            <Card className="flex flex-col justify-between border-akar-border bg-white hover:border-akar-primary/50 hover:shadow-md transition-all">
              <CardHeader className="p-5 pb-3 space-y-2.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-akar-primary text-white font-black text-xl shadow-xs">
                  R
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-akar-primary">
                    Pilar 4
                  </span>
                  <CardTitle className="text-base sm:text-lg">Realisasi Berbukti</CardTitle>
                </div>
                <CardDescription className="text-xs leading-relaxed">
                  Laporan progres mingguan berfoto metadata EXIF. Termin (0%, 50%, 100%) hanya dicairkan bila progres diverifikasi pengawas independen.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="rounded-lg bg-stone-50 border border-akar-border/80 p-2.5 text-[11px] text-akar-muted space-y-1">
                  <div className="font-semibold text-akar-ink">Mekanisme:</div>
                  <ul className="space-y-0.5 list-disc list-inside">
                    <li>Foto laporan bertimestamp</li>
                    <li>Termin terkunci sebelum progres cukup</li>
                    <li>Tiket audit terbuka pasca-proyek</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SLIDE 4: PROYEK TERBARU & IDE POPULER                                     */}
      {/* ========================================================================= */}
      <section
        id="slide-proyek-ide"
        aria-label="Sayembara dan Aspirasi Warga"
        className="min-h-screen lg:h-screen w-full snap-start flex flex-col justify-center items-center relative p-4 sm:p-6 lg:p-8 pt-20 lg:pt-16 bg-white border-b border-akar-border/80"
      >
        <LandingProjectsIdeas
          projects={mockRecentProjects}
          ideas={mockPopularIdeas}
        />
      </section>

      {/* ========================================================================= */}
      {/* SLIDE 5: OPEN DATA / BUKU KAS CTA & FOOTER                                */}
      {/* ========================================================================= */}
      <section
        id="slide-footer"
        aria-label="Data Terbuka dan Informasi Platform"
        className="min-h-screen lg:h-screen w-full snap-start flex flex-col justify-between items-center relative p-4 sm:p-6 lg:p-8 pt-20 lg:pt-16 bg-stone-50"
      >
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center my-auto">
          {/* Top Banner Callout */}
          <div className="rounded-2xl border border-akar-primary/30 bg-gradient-to-r from-akar-primary to-akar-primary-hover p-6 sm:p-8 text-white shadow-md mb-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left">
                <Badge variant="accent" className="text-xs uppercase font-extrabold text-akar-ink bg-akar-accent">
                  Komitmen Transparansi Publik
                </Badge>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
                  Akses Data Anggaran &amp; Buku Kas Kapan Saja
                </h3>
                <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
                  Semua transaksi APBDes dan dokumentasi proyek dapat diunduh dalam format terbuka (CSV/JSON)
                  tanpa registrasi untuk riset, audit, maupun pengawasan warga.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link href="/kas" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="accent"
                    className="w-full sm:w-auto min-h-[44px] text-sm font-bold text-akar-ink hover:bg-akar-accent-hover shadow-sm"
                  >
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Buku Kas Publik
                  </Button>
                </Link>
                <Link href="/data" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto min-h-[44px] text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border-white/40"
                  >
                    <Database className="mr-2 h-4 w-4" />
                    Unduh Data CSV
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Compact Grid Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-akar-muted pb-4">
            <div className="space-y-1.5 rounded-xl border border-akar-border/80 bg-white p-4">
              <h4 className="font-bold text-sm text-akar-ink">Tentang Platform AKAR</h4>
              <p className="leading-relaxed">
                AKAR (Aspirasi, Keterbukaan, Aksi, Realisasi) adalah platform web transparansi dana desa dan bursa kerja sayembara swakelola untuk Lomba Web In Action (WIA) MIA 2026.
              </p>
            </div>

            <div className="space-y-1.5 rounded-xl border border-akar-border/80 bg-white p-4">
              <h4 className="font-bold text-sm text-akar-ink">Dasar Hukum &amp; Regulasi</h4>
              <ul className="space-y-1">
                <li>• Permendes PDT 16/2025: Pola Padat Karya Tunai Desa</li>
                <li>• Peraturan LKPP 12/2019: Pengadaan Barang/Jasa Desa</li>
                <li>• PMK 7/2026: Penyaluran Dana Desa &amp; Alokasi KDMP</li>
                <li>• UU No. 27/2022: Pelindungan Data Pribadi (Privasi NIK)</li>
              </ul>
            </div>

            <div className="space-y-1.5 rounded-xl border border-akar-border/80 bg-white p-4">
              <h4 className="font-bold text-sm text-akar-ink">Pemerintah Desa &amp; Pengawas</h4>
              <p className="leading-relaxed">
                Kantor Kepala Desa Karang Sari, Kec. Harapan, Kab. Contoh.
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-akar-ink font-medium">
                <Mail className="h-3.5 w-3.5 text-akar-earth" />
                <span>aspirasi@karangsari.desa.id</span>
              </div>
              <div className="pt-1">
                <Link href="/tiket" className="text-akar-primary font-semibold hover:underline inline-flex items-center gap-1">
                  Lacak Tiket Aduan &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Demo Disclaimer Banner (PRD 36.5) & Bottom Bar */}
        <div className="w-full max-w-7xl mx-auto pt-2 pb-3">
          <div className="rounded-xl border border-akar-accent/50 bg-akar-accent-light p-3 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-akar-ink text-xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-akar-accent text-akar-ink font-black text-[10px]">
                !
              </div>
              <p>
                <strong>Catatan Lomba:</strong> Data pada tampilan ini adalah data contoh (fiktif) untuk keperluan lomba Web In Action (WIA) MIA 2026.
              </p>
            </div>
            <span className="text-[10px] font-bold text-akar-earth uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-akar-earth/20">
              PRD FIX v1.3
            </span>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-akar-muted gap-2">
            <p>© 2026 AKAR - Tim 3MinionsHyuntang (WIA MIA 2026). Hak Cipta Dilindungi.</p>
            <div className="flex items-center space-x-4">
              <Link href="/data" className="hover:text-akar-primary">Data Terbuka</Link>
              <Link href="/kas" className="hover:text-akar-primary">Buku Kas</Link>
              <Link href="/proyek" className="hover:text-akar-primary">Sayembara</Link>
              <Link href="/ide" className="hover:text-akar-primary">Aspirasi</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
