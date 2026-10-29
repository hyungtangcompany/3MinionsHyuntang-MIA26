"use client";

import * as React from "react";
import { Coins, TrendingUp, HardHat, Users, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricSummary } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/format";

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
      <Card className="group relative overflow-hidden border-akar-border/90 bg-gradient-to-br from-white to-stone-50/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-akar-primary/60 cursor-default">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-primary transition-all duration-300 group-hover:h-2" />
        <CardHeader className="p-5 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-akar-muted group-hover:text-akar-primary transition-colors">
              Pagu APBDes 2026
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-primary-light text-akar-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-akar-primary group-hover:text-white">
              <Coins className="h-4 w-4" />
            </div>
          </div>
          <CardTitle className="text-2xl lg:text-[26px] font-extrabold text-akar-primary mt-2 tracking-tight">
            {formatRupiah(metrics.paguDesa)}
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
      <Card className="group relative overflow-hidden border-akar-border/90 bg-gradient-to-br from-white to-stone-50/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-akar-earth/60 cursor-default">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-earth transition-all duration-300 group-hover:h-2" />
        <CardHeader className="p-5 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-akar-muted group-hover:text-akar-earth transition-colors">
              Realisasi Kas
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-earth-light text-akar-earth transition-transform duration-300 group-hover:scale-110 group-hover:bg-akar-earth group-hover:text-white">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <CardTitle className="text-2xl lg:text-[26px] font-extrabold text-akar-earth mt-2 tracking-tight">
            {formatRupiah(metrics.realisasiKas)}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="flex items-center justify-between text-xs text-akar-muted mb-1.5">
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
          <p className="mt-2 text-[11px] text-akar-muted">
            Tersalur dengan bukti transfer &amp; verifikasi pengawas BPD.
          </p>
        </CardContent>
      </Card>

      {/* Card 3: Proyek Berjalan */}
      <Card className="group relative overflow-hidden border-akar-border/90 bg-gradient-to-br from-white to-stone-50/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-akar-accent cursor-default">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-accent transition-all duration-300 group-hover:h-2" />
        <CardHeader className="p-5 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-akar-muted group-hover:text-akar-ink transition-colors">
              Proyek Berjalan
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-accent-light text-akar-ink transition-transform duration-300 group-hover:scale-110 group-hover:bg-akar-accent">
              <HardHat className="h-4 w-4 text-akar-earth" />
            </div>
          </div>
          <CardTitle className="text-2xl lg:text-[26px] font-extrabold text-akar-ink mt-2 tracking-tight">
            {metrics.proyekBerjalan}{" "}
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
      <Card className="group relative overflow-hidden border-akar-border/90 bg-gradient-to-br from-white to-stone-50/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-akar-primary/60 cursor-default">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-akar-primary transition-all duration-300 group-hover:h-2" />
        <CardHeader className="p-5 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-akar-muted group-hover:text-akar-primary transition-colors">
              Tenaga Kerja Lokal
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-akar-primary-light text-akar-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-akar-primary group-hover:text-white">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <CardTitle className="text-2xl lg:text-[26px] font-extrabold text-akar-primary mt-2 tracking-tight">
            {metrics.serapanTenagaLokalPersen}%
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="flex items-center justify-between text-xs text-akar-muted mb-1.5">
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
          <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-akar-primary">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Melampaui Syarat Minimum Desa</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
