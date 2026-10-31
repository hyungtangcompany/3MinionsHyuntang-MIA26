"use client";

import * as React from "react";
import { Wallet, CalendarDays, Users, FileCheck2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "./types";

interface ProjectSummaryCardsProps {
  pagu: number;
  durasiMin: number;
  durasiMax: number;
  syaratLokalMin: number;
  proposalCount: number;
  sumberDana?: string;
}

export function ProjectSummaryCards({
  pagu,
  durasiMin,
  durasiMax,
  syaratLokalMin,
  proposalCount,
  sumberDana = "APBDes TA 2026",
}: ProjectSummaryCardsProps) {
  const cards = [
    {
      title: "Pagu Anggaran",
      value: formatRupiah(pagu),
      sublabel: sumberDana,
      icon: Wallet,
      iconBg: "bg-akar-primary-light text-akar-primary",
      borderColor: "border-akar-border hover:border-akar-primary/40",
    },
    {
      title: "Target Durasi",
      value: `${durasiMin} - ${durasiMax} Hari`,
      sublabel: "Maks. 60 Hari Kalender",
      icon: CalendarDays,
      iconBg: "bg-akar-earth-light text-akar-earth",
      borderColor: "border-akar-border hover:border-akar-earth/40",
    },
    {
      title: "Tenaga Kerja Lokal",
      value: `Min. ${syaratLokalMin}%`,
      sublabel: "Wajib ber-KTP warga desa",
      icon: Users,
      iconBg: "bg-akar-primary-light text-akar-primary",
      borderColor: "border-akar-border hover:border-akar-primary/40",
    },
    {
      title: "Proposal Masuk",
      value: `${proposalCount} Proposal`,
      sublabel: "Tahap evaluasi terbuka",
      icon: FileCheck2,
      iconBg: "bg-akar-accent-light text-akar-ink",
      borderColor: "border-akar-border hover:border-akar-accent/60",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card
            key={idx}
            className={`transition-all duration-200 shadow-2xs hover:shadow-xs ${card.borderColor}`}
          >
            <CardContent className="p-3.5 sm:p-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-akar-muted line-clamp-1">
                  {card.title}
                </span>
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${card.iconBg}`}
                  aria-hidden="true"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div>
                <div className="text-base sm:text-xl lg:text-2xl font-black text-akar-ink tracking-tight break-words">
                  {card.value}
                </div>
                <p className="text-[10px] sm:text-xs text-akar-muted mt-0.5 line-clamp-1">
                  {card.sublabel}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

