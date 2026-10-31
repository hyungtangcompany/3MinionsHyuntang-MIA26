"use client";

import * as React from "react";
import { Check, CircleDot, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusProyek } from "./types";

interface ProjectTimelineProps {
  currentStatus: StatusProyek;
  className?: string;
}

interface StepItem {
  key: StatusProyek;
  label: string;
  sublabel: string;
}

const TIMELINE_STEPS: StepItem[] = [
  {
    key: "PEMATANGAN",
    label: "Pematangan",
    sublabel: "RAB & Musdes",
  },
  {
    key: "TENDER_DIBUKA",
    label: "Tender Dibuka",
    sublabel: "Sayembara Terbuka",
  },
  {
    key: "SELEKSI",
    label: "Seleksi",
    sublabel: "Skor & Verifikasi",
  },
  {
    key: "PENGERJAAN",
    label: "Pengerjaan",
    sublabel: "Padat Karya Tunai",
  },
  {
    key: "SELESAI",
    label: "Selesai",
    sublabel: "Serah Terima & LPJ",
  },
];

const ORDERED_KEYS: StatusProyek[] = [
  "PEMATANGAN",
  "TENDER_DIBUKA",
  "SELEKSI",
  "PENGERJAAN",
  "SELESAI",
];

export function ProjectTimeline({
  currentStatus,
  className,
}: ProjectTimelineProps) {
  const currentIndex = ORDERED_KEYS.indexOf(
    currentStatus === "BATAL" ? "PEMATANGAN" : currentStatus
  );

  return (
    <div
      className={cn(
        "rounded-xl border border-akar-border bg-white p-4 sm:p-6 shadow-2xs",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-akar-border/60">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-akar-ink">
            Tahapan Sayembara Proyek
          </h2>
          <p className="text-xs text-akar-muted">
            Transparansi alur pengerjaan dari perencanaan hingga serah terima
          </p>
        </div>
        {currentStatus === "BATAL" && (
          <div className="flex items-center gap-1.5 text-xs text-akar-danger font-semibold bg-akar-danger-light px-2.5 py-1 rounded-full">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Proyek Dibatalkan</span>
          </div>
        )}
      </div>

      {/* Horizontal Scroll Wrapper for Narrow Screens (360px Safe) */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
        <div className="min-w-[620px] flex items-start justify-between relative">
          {TIMELINE_STEPS.map((step, index) => {
            const isCompleted = currentIndex > index;
            const isCurrent = currentIndex === index;
            const isUpcoming = currentIndex < index;
            const isLast = index === TIMELINE_STEPS.length - 1;

            return (
              <div
                key={step.key}
                className={cn(
                  "flex-1 flex flex-col items-center relative text-center px-1",
                  isCurrent && "font-semibold"
                )}
              >
                {/* Horizontal Connector Line */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute top-4 left-1/2 w-full h-[2px] -z-0 transition-colors",
                      isCompleted ? "bg-akar-primary" : "bg-stone-200"
                    )}
                    style={{ transform: "translateY(-50%)" }}
                    aria-hidden="true"
                  />
                )}

                {/* Step Circle Indicator */}
                <div className="relative z-10 flex items-center justify-center mb-2.5">
                  {isCompleted && (
                    <div
                      className="w-8 h-8 rounded-full bg-akar-primary text-white flex items-center justify-center shadow-xs"
                      title="Tahap selesai"
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}

                  {isCurrent && (
                    <div
                      className="relative w-8 h-8 rounded-full bg-akar-primary-light border-2 border-akar-primary text-akar-primary flex items-center justify-center shadow-sm"
                      title="Tahap sedang berjalan"
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-akar-primary/20 opacity-75"></span>
                      <CircleDot className="w-4 h-4 text-akar-primary relative z-10" />
                    </div>
                  )}

                  {isUpcoming && (
                    <div
                      className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 text-akar-muted flex items-center justify-center text-xs font-semibold"
                      title="Tahap mendatang"
                    >
                      {index + 1}
                    </div>
                  )}
                </div>

                {/* Step Text Labels */}
                <div className="space-y-0.5">
                  <div
                    className={cn(
                      "text-xs sm:text-sm transition-colors",
                      isCompleted && "text-akar-primary font-medium",
                      isCurrent && "text-akar-primary font-bold",
                      isUpcoming && "text-akar-muted"
                    )}
                  >
                    {step.label}
                  </div>
                  <div className="text-[11px] text-akar-muted/80 leading-tight">
                    {step.sublabel}
                  </div>
                  {isCurrent && (
                    <span className="inline-block mt-1 text-[10px] bg-akar-primary-light text-akar-primary font-bold px-1.5 py-0.5 rounded">
                      Aktif Sekarang
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
