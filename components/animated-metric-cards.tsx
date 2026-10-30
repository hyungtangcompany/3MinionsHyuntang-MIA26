"use client";

import * as React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  HardHat,
  Users,
  CheckCircle2,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MetricSummary } from "@/lib/mock-data";
import { formatNumber } from "@/lib/format";

interface AnimatedMetricCardsProps {
  metrics: MetricSummary;
}

interface ProjectSlide {
  id: number;
  badge: string;
  badgeColor: string;
  title: string;
  subtext: string;
  workerNote: string;
  imageUrl: string;
  alt: string;
}

const PROJECT_SLIDES: ProjectSlide[] = [
  {
    id: 1,
    badge: "Proyek Fisik Berjalan",
    badgeColor: "bg-emerald-600",
    title: "Sayembara Drainase RT 03",
    subtext: "Dikerjakan 100% oleh kelompok tukang warga lokal.",
    workerNote: "Termin 1 (50%) tersalurkan • 14 pekerja warga lokal",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?q=80&w=1200&auto=format&fit=crop",
    alt: "Pengerjaan fisik saluran drainase desa oleh warga",
  },
  {
    id: 2,
    badge: "Termin 50% Disetujui",
    badgeColor: "bg-amber-600",
    title: "Renovasi Balai Warga Dusun 2",
    subtext: "Progres fisik terverifikasi pengawas BPD & pendamping desa.",
    workerNote: "Pemasangan atap & ubin keramik • 18 pekerja warga lokal",
    imageUrl:
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1200&auto=format&fit=crop",
    alt: "Gotong royong renovasi balai pertemuan warga dusun",
  },
  {
    id: 3,
    badge: "Selesai 100%",
    badgeColor: "bg-[#1F6F43]",
    title: "Pengecoran Jalan Setapak",
    subtext: "Serapan tenaga kerja lokal mencapai 88% dengan upah harian PKTD.",
    workerNote: "Audit fisik tuntas tanpa deviasi • Akses jalan tani 450m",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    alt: "Pengecoran jalan setapak tani oleh warga desa",
  },
];

export function AnimatedMetricCards({ metrics }: AnimatedMetricCardsProps) {
  const [animatedProgress, setAnimatedProgress] = React.useState({
    realisasi: 0,
    serapan: 0,
  });

  // Photo Carousel State
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress({
        realisasi: metrics.realisasiPersen,
        serapan: metrics.serapanTenagaLokalPersen,
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [metrics.realisasiPersen, metrics.serapanTenagaLokalPersen]);

  // Autoplay photo carousel every 4.5 seconds when not paused
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROJECT_SLIDES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? PROJECT_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % PROJECT_SLIDES.length);
  };

  const handleSelectSlide = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide(idx);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto w-full">
      {/* ========================================================================= */}
      {/* BENTO CARD 1: HERO METRIC (Pagu APBDes 2026)                              */}
      {/* Spans: 2 cols on md/lg, 1 row                                             */}
      {/* ========================================================================= */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-br from-[#1F6F43] to-[#144d2e] text-white p-6 sm:p-7 rounded-2xl relative overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default group min-h-[240px]">
        {/* Subtle Watermark Decoration in Background */}
        <div className="absolute -right-4 -bottom-4 w-44 h-44 opacity-[0.06] pointer-events-none select-none transition-transform duration-500 group-hover:scale-105">
          <Image
            src="/logo-akar.png"
            alt=""
            width={176}
            height={176}
            className="w-full h-full object-contain filter invert"
          />
        </div>

        {/* Top Header & Verified Indicator */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
            Pagu APBDes 2026
          </span>
          <span className="text-xs font-semibold text-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>APBDes 2026 Terverifikasi</span>
          </span>
        </div>

        {/* Main Big Metric Nominal */}
        <div className="relative z-10 my-2">
          <div className="flex items-baseline gap-1 text-white">
            <span className="text-base sm:text-lg font-semibold text-emerald-200">
              Rp
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {formatNumber(metrics.paguDesa)}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 font-normal">
            Total pagu operasional dan pemberdayaan masyarakat desa tahun anggaran 2026
          </p>
        </div>

        {/* Two-tone Comparison Visual Bar (KDMP vs Reguler) */}
        <div className="relative z-10 pt-2 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-100/90 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
              <span>KDMP 58,03%: Rp580,3 Jt</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              <span>Pagu Reguler: Rp419,7 Jt</span>
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/20 overflow-hidden flex">
            <div
              className="h-full bg-[#F2B705] transition-all duration-1000 ease-out"
              style={{ width: "58.03%" }}
              title="KDMP: 58.03%"
            />
            <div
              className="h-full bg-emerald-300 transition-all duration-1000 ease-out"
              style={{ width: "41.97%" }}
              title="Pagu Reguler: 41.97%"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BENTO CARD 2: INTERACTIVE PHOTO CAROUSEL / SLIDER                         */}
      {/* Spans: 2 cols on md/lg, 2 rows on lg                                      */}
      {/* ========================================================================= */}
      <div
        className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 lg:row-span-2 relative h-full min-h-[340px] sm:min-h-[360px] w-full rounded-2xl overflow-hidden shadow-sm group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default flex flex-col justify-end"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Dokumentasi Foto Pengerjaan Fisik Desa"
      >
        {/* Carousel Background Images (Stacked with smooth crossfade transition) */}
        {PROJECT_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={idx !== currentSlide}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          </div>
        ))}

        {/* Dark Scrim Gradient Overlay (Ensures WCAG AAA text contrast) */}
        <div className="bg-gradient-to-t from-black/90 via-black/45 to-transparent absolute inset-0 z-10 pointer-events-none" />

        {/* Top Floating Bar: Status Badge + Pagination Dot Indicators */}
        <div className="absolute top-4 sm:top-5 inset-x-4 sm:inset-x-5 z-20 flex items-center justify-between gap-2 pointer-events-none">
          {/* Dynamic Badge */}
          <div
            className={`${PROJECT_SLIDES[currentSlide].badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition-colors duration-300 flex items-center gap-1.5 pointer-events-auto`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{PROJECT_SLIDES[currentSlide].badge}</span>
          </div>

          {/* Pagination Indicators (Clickable, Touch Accessible) */}
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 pointer-events-auto">
            {PROJECT_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={(e) => handleSelectSlide(idx, e)}
                className={`transition-all duration-300 rounded-full min-h-[16px] flex items-center justify-center p-0.5 focus:outline-hidden focus:ring-1 focus:ring-white ${
                  idx === currentSlide
                    ? "w-6 h-2 bg-emerald-400"
                    : "w-2 h-2 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Lihat foto ${idx + 1}: ${slide.title}`}
                aria-current={idx === currentSlide ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        {/* Left & Right Interactive Navigation Controls */}
        <div className="absolute inset-y-0 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
          <button
            onClick={handlePrevSlide}
            aria-label="Foto sebelumnya"
            className="pointer-events-auto min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/35 hover:bg-black/70 text-white backdrop-blur-xs transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-white/80"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleNextSlide}
            aria-label="Foto selanjutnya"
            className="pointer-events-auto min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/35 hover:bg-black/70 text-white backdrop-blur-xs transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-white/80"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content Details on Bottom Layer */}
        <div className="relative z-20 p-6 sm:p-7 flex flex-col justify-end text-white">
          <div className="transition-all duration-500 ease-out">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {PROJECT_SLIDES[currentSlide].title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-relaxed mt-1">
              {PROJECT_SLIDES[currentSlide].subtext}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-200 mt-3 font-medium">
              <HardHat className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{PROJECT_SLIDES[currentSlide].workerNote}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BENTO CARD 3: REALISASI KAS & INTEGRITAS AUDIT                            */}
      {/* Spans: 1 col on all viewports, row 2 on lg                                */}
      {/* ========================================================================= */}
      <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-6 rounded-2xl flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#8A5A2B]/40 cursor-default group min-h-[220px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-[#8A5A2B] transition-colors">
            Realisasi Kas
          </span>
          <span className="text-sm font-semibold text-[#8A5A2B]">
            {metrics.realisasiPersen}% Terserap
          </span>
        </div>

        {/* Value */}
        <div className="my-3">
          <div className="flex items-baseline gap-1 text-[#8A5A2B]">
            <span className="text-sm font-semibold text-muted-foreground">Rp</span>
            <span className="text-2xl font-bold tracking-tight">
              {formatNumber(metrics.realisasiKas)}
            </span>
          </div>

          {/* Clean Progress Meter */}
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full bg-[#8A5A2B] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${animatedProgress.realisasi}%` }}
            />
          </div>
        </div>

        {/* Footer Note with Icon */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-start gap-2 text-xs text-muted-foreground leading-snug">
          <Receipt className="w-3.5 h-3.5 text-[#8A5A2B] shrink-0 mt-0.5" />
          <span>Tersalur dengan bukti transfer digital &amp; verifikasi BPD.</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BENTO CARD 4: SERAPAN TENAGA KERJA LOKAL                                  */}
      {/* Spans: 1 col on all viewports, row 2 on lg                                */}
      {/* ========================================================================= */}
      <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-6 rounded-2xl flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#1F6F43]/40 cursor-default group min-h-[220px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-[#1F6F43] transition-colors">
            Tenaga Kerja Lokal
          </span>
          <span className="text-sm font-semibold text-[#1F6F43] flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-[#1F6F43]" />
            <span>Melampaui Target</span>
          </span>
        </div>

        {/* Value */}
        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-[#1F6F43]">
              {metrics.serapanTenagaLokalPersen}%
            </span>
            <span className="text-xs font-semibold text-muted-foreground">
              warga terberdayakan
            </span>
          </div>

          {/* Clean Progress Meter */}
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full bg-[#1F6F43] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${animatedProgress.serapan}%` }}
            />
          </div>
        </div>

        {/* Footer Note with Target */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#1F6F43] shrink-0" />
            <span>Target PKTD Min. 70%</span>
          </div>
          <span className="text-xs font-bold text-[#1F6F43]">
            +18% dari target
          </span>
        </div>
      </div>
    </div>
  );
}
