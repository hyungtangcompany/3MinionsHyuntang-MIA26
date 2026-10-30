"use client";

import * as React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  HardHat,
  Users,
  CheckCircle2,
  Receipt,
} from "lucide-react";
import { MetricSummary } from "@/lib/mock-data";
import { formatNumber } from "@/lib/format";

interface AnimatedMetricCardsProps {
  metrics: MetricSummary;
}

export function AnimatedMetricCards({ metrics }: AnimatedMetricCardsProps) {
  const [animatedProgress, setAnimatedProgress] = React.useState({
    realisasi: 0,
    serapan: 0,
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress({
        realisasi: metrics.realisasiPersen,
        serapan: metrics.serapanTenagaLokalPersen,
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [metrics.realisasiPersen, metrics.serapanTenagaLokalPersen]);

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

        {/* Top Header & Verified Indicator (Clean Inline, No Clipped Absolute Pill) */}
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

        {/* Two-tone Comparison Visual Bar (KDMP vs Reguler) - Clean format without nested cards */}
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
      {/* BENTO CARD 2: VISUAL PHOTO CARD (Realisasi Pengerjaan Fisik)               */}
      {/* Spans: 2 cols on md/lg, 2 rows on lg                                      */}
      {/* ========================================================================= */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 lg:row-span-2 relative h-full min-h-[320px] w-full rounded-2xl overflow-hidden shadow-sm group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default flex flex-col justify-end">
        {/* Real High-Resolution Village Construction Photo */}
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?q=80&w=1200&auto=format&fit=crop"
          alt="Dokumentasi pengerjaan proyek warga"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dark Scrim Gradient Overlay */}
        <div className="bg-gradient-to-t from-black/85 via-black/40 to-transparent absolute inset-0 z-10" />

        {/* Content on Top Layer (High Contrast, No Nested Yellow Borders) */}
        <div className="relative z-20 p-6 sm:p-7 flex flex-col justify-end h-full text-white">
          <div className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
            Proyek Fisik Berjalan
          </div>

          <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
            {metrics.proyekFisikBerjalan} Paket Pengerjaan Aktif
          </h3>

          <p className="text-sm text-zinc-100 font-medium leading-relaxed mt-1">
            Termin 50% Balai Warga Dusun 2 &amp; Sayembara Swakelola Drainase RT 03.
          </p>

          <div className="flex items-center gap-2 text-xs text-zinc-200 mt-3 font-medium">
            <HardHat className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Dikerjakan langsung oleh tukang dan kelompok warga lokal Desa Karang Sari.</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BENTO CARD 3: REALISASI KAS & INTEGRITAS AUDIT                            */}
      {/* Spans: 1 col on all viewports, row 2 on lg                                */}
      {/* ========================================================================= */}
      <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-6 rounded-2xl flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#8A5A2B]/40 cursor-default group min-h-[220px]">
        {/* Header - Simple Inline Status, No Nested Card Borders */}
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

        {/* Footer Note with Icon - Clean, No Nested Badges */}
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
        {/* Header - Simple Inline Status, No Nested Card Borders */}
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

        {/* Footer Note with Target - Clean typography without nested rounded badge */}
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
