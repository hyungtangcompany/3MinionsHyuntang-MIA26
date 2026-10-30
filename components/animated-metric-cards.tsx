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
      <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-br from-[#1F6F43] to-[#144d2e] text-white p-6 sm:p-7 rounded-3xl relative overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default group min-h-[220px]">
        {/* Subtle Watermark Decoration in Background */}
        <div className="absolute -right-6 -bottom-6 w-48 h-48 opacity-[0.07] pointer-events-none select-none transition-transform duration-500 group-hover:scale-105">
          <Image
            src="/logo-akar.png"
            alt=""
            width={192}
            height={192}
            className="w-full h-full object-contain filter invert"
          />
        </div>

        {/* Top Header & Verified Badge */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200/90">
            Pagu APBDes 2026
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-semibold text-emerald-100 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>APBDes 2026 Terverifikasi</span>
          </span>
        </div>

        {/* Main Big Metric Nominal */}
        <div className="relative z-10 my-3">
          <div className="flex items-baseline gap-1 text-white">
            <span className="text-base sm:text-lg font-semibold text-emerald-200">
              Rp
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {formatNumber(metrics.paguDesa)}
            </span>
          </div>
          <p className="text-xs text-emerald-100/80 mt-1 font-medium">
            Total pagu operasional dan pemberdayaan masyarakat desa tahun anggaran 2026
          </p>
        </div>

        {/* Two-tone Comparison Visual Bar (KDMP vs Reguler) */}
        <div className="relative z-10 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-[11px] font-medium text-emerald-100/90 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              <span>KDMP 58,03% (Rp580,3 Jt)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 border border-emerald-400/40" />
              <span>Pagu Reguler (Rp419,7 Jt)</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-black/20 overflow-hidden flex">
            <div
              className="h-full bg-emerald-300 transition-all duration-1000 ease-out"
              style={{ width: "58.03%" }}
              title="KDMP: 58.03%"
            />
            <div
              className="h-full bg-emerald-600 transition-all duration-1000 ease-out"
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
      <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 lg:row-span-2 relative rounded-3xl overflow-hidden shadow-sm min-h-[300px] lg:min-h-full group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default flex flex-col justify-end">
        {/* High Resolution Real Gotong Royong / Village Infrastructure Photo */}
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
          alt="Dokumentasi pengerjaan fisik gotong royong warga desa"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dark Gradient Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 z-10" />

        {/* Floating Pill Badge Top Right */}
        <div className="absolute top-5 right-5 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white border border-white/20 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Proyek Fisik Berjalan</span>
          </span>
        </div>

        {/* Content Details at Bottom */}
        <div className="relative z-20 p-6 sm:p-7 text-white flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {metrics.proyekFisikBerjalan} Paket Pengerjaan Aktif
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
            Termin 50% Balai Warga Dusun 2 &amp; Sayembara Swakelola Drainase RT 03.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-zinc-300 font-medium">
            <HardHat className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Dikerjakan langsung oleh tukang dan kelompok warga lokal Desa Karang Sari.</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BENTO CARD 3: REALISASI KAS & INTEGRITAS AUDIT                            */}
      {/* Spans: 1 col on all viewports, row 2 on lg                                */}
      {/* ========================================================================= */}
      <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-6 rounded-3xl flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#8A5A2B]/40 cursor-default group min-h-[220px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-[#8A5A2B] transition-colors">
            Realisasi Kas
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-[#8A5A2B] text-xs font-bold border border-amber-200/60">
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
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
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
      <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-6 rounded-3xl flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#1F6F43]/40 cursor-default group min-h-[220px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-[#1F6F43] transition-colors">
            Tenaga Kerja Lokal
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#1F6F43] text-xs font-bold border border-emerald-200/60">
            <CheckCircle2 className="w-3 h-3 text-[#1F6F43]" />
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
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
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
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
            +18%
          </span>
        </div>
      </div>
    </div>
  );
}
