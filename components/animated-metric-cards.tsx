"use client";

import * as React from "react";
import { Coins, TrendingUp, HardHat, Users, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    // Smooth entrance animation for progress meters
    const timer = setTimeout(() => {
      setAnimatedProgress({
        realisasi: metrics.realisasiPersen,
        serapan: metrics.serapanTenagaLokalPersen,
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [metrics.realisasiPersen, metrics.serapanTenagaLokalPersen]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 w-full">
      {/* Card 1: Pagu Desa */}
      <Card className="group relative overflow-hidden border border-akar-border/90 bg-gradient-to-br from-white to-stone-50/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-akar-primary/60 cursor-default flex flex-col justify-between h-full rounded-2xl">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-primary transition-all duration-300 group-hover:h-2" />
        <CardHeader className="p-4 sm:p-5 xl:p-6 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-akar-primary transition-colors">
              Pagu APBDes 2026
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-primary-light text-akar-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-akar-primary group-hover:text-white">
              <Coins className="h-4 w-4" />
            </div>
          </div>
          <CardTitle className="flex items-baseline min-h-[2.5rem] mt-2 whitespace-nowrap overflow-hidden text-akar-primary">
            <span className="text-sm font-semibold text-muted-foreground mr-1">Rp</span>
            <span className="text-xl xl:text-2xl font-bold tracking-tight truncate">
              {formatNumber(metrics.paguDesa)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 xl:p-6 pt-0 flex flex-col justify-between flex-1">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Alokasi KDMP 58,03% (Rp580,3 Jt) &amp; Pagu Reguler (Rp419,7 Jt).
          </p>
          <div className="mt-auto pt-3 flex items-center gap-1.5 text-[11px] font-semibold text-akar-earth">
            <FileSpreadsheet className="h-3.5 w-3.5 shrink-0" />
            <span>Sesuai Ketentuan PMK 7/2026</span>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Realisasi Kas */}
      <Card className="group relative overflow-hidden border border-akar-border/90 bg-gradient-to-br from-white to-stone-50/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-akar-earth/60 cursor-default flex flex-col justify-between h-full rounded-2xl">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-earth transition-all duration-300 group-hover:h-2" />
        <CardHeader className="p-4 sm:p-5 xl:p-6 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-akar-earth transition-colors">
              Realisasi Kas
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-earth-light text-akar-earth transition-transform duration-300 group-hover:scale-110 group-hover:bg-akar-earth group-hover:text-white">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <CardTitle className="flex items-baseline min-h-[2.5rem] mt-2 whitespace-nowrap overflow-hidden text-akar-earth">
            <span className="text-sm font-semibold text-muted-foreground mr-1">Rp</span>
            <span className="text-xl xl:text-2xl font-bold tracking-tight truncate">
              {formatNumber(metrics.realisasiKas)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 xl:p-6 pt-0 flex flex-col justify-between flex-1">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Realisasi Berjalan</span>
              <span className="font-bold text-akar-ink">
                {metrics.realisasiPersen}% terserap
              </span>
            </div>
            {/* Animated Progress Bar */}
            <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-akar-earth rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${animatedProgress.realisasi}%` }}
              />
            </div>
          </div>
          <div className="mt-auto pt-3">
            <p className="text-[11px] text-muted-foreground">
              Tersalur dengan bukti transfer &amp; verifikasi BPD.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Proyek Berjalan */}
      <Card className="group relative overflow-hidden border border-akar-border/90 bg-gradient-to-br from-white to-stone-50/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-akar-accent cursor-default flex flex-col justify-between h-full rounded-2xl">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-accent transition-all duration-300 group-hover:h-2" />
        <CardHeader className="p-4 sm:p-5 xl:p-6 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-akar-ink transition-colors">
              Proyek Berjalan
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-accent-light text-akar-ink transition-transform duration-300 group-hover:scale-110 group-hover:bg-akar-accent">
              <HardHat className="h-4 w-4 text-akar-earth" />
            </div>
          </div>
          <CardTitle className="flex items-baseline min-h-[2.5rem] mt-2 whitespace-nowrap text-akar-ink">
            <span className="text-xl xl:text-2xl font-bold tracking-tight">
              {metrics.proyekBerjalan}
            </span>
            <span className="text-sm font-semibold text-muted-foreground ml-1.5">
              Paket
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 xl:p-6 pt-0 flex flex-col justify-between flex-1">
          <p className="text-xs text-muted-foreground leading-relaxed">
            1 paket sayembara swakelola &amp; 1 pengerjaan fisik termin 50%.
          </p>
          <div className="mt-auto pt-3 flex items-center gap-1.5">
            <Badge variant="accent" className="text-[11px]">
              Sayembara Swakelola Aktif
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Serapan Tenaga Kerja Lokal */}
      <Card className="group relative overflow-hidden border border-akar-border/90 bg-gradient-to-br from-white to-stone-50/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-akar-primary/60 cursor-default flex flex-col justify-between h-full rounded-2xl">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-primary transition-all duration-300 group-hover:h-2" />
        <CardHeader className="p-4 sm:p-5 xl:p-6 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-akar-primary transition-colors">
              Tenaga Kerja Lokal
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-primary-light text-akar-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-akar-primary group-hover:text-white">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <CardTitle className="flex items-baseline min-h-[2.5rem] mt-2 whitespace-nowrap text-akar-primary">
            <span className="text-xl xl:text-2xl font-bold tracking-tight">
              {metrics.serapanTenagaLokalPersen}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 xl:p-6 pt-0 flex flex-col justify-between flex-1">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Standar PKTD</span>
              <span className="font-bold text-akar-primary">
                Target Min. 70%
              </span>
            </div>
            {/* Animated Progress Bar */}
            <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-akar-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${animatedProgress.serapan}%` }}
              />
            </div>
          </div>
          <div className="mt-auto pt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-akar-primary">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>Melampaui Syarat Minimum Desa</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
