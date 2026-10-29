"use client";

import * as React from "react";
import Link from "next/link";
import { ThumbsUp, MapPin, Tag, User, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommunityIdeaPreview } from "@/lib/mock-data";

interface LandingIdeaListProps {
  ideas: CommunityIdeaPreview[];
}

export function LandingIdeaList({ ideas }: LandingIdeaListProps) {
  const [supportedIdeas, setSupportedIdeas] = React.useState<Record<string, boolean>>({});
  const [voteCounts, setVoteCounts] = React.useState<Record<string, number>>(() =>
    ideas.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.jumlahDukungan }), {})
  );

  const toggleSupport = (id: string) => {
    setSupportedIdeas((prev) => {
      const isCurrentlySupported = !!prev[id];
      const newStatus = !isCurrentlySupported;
      setVoteCounts((counts) => ({
        ...counts,
        [id]: (counts[id] || 0) + (newStatus ? 1 : -1),
      }));
      return { ...prev, [id]: newStatus };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {ideas.map((idea) => {
        const isSupported = !!supportedIdeas[idea.id];
        const count = voteCounts[idea.id] ?? idea.jumlahDukungan;

        return (
          <Card
            key={idea.id}
            className="flex flex-col justify-between border-akar-border/80 hover:border-akar-primary/40 hover:shadow-md transition-all duration-200"
          >
            <CardHeader className="space-y-3 pb-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold text-akar-muted">
                  {idea.nomor}
                </span>
                <Badge
                  variant={idea.status === "VERIFIKASI" ? "earth" : "neutral"}
                  className="text-[11px]"
                >
                  {idea.status === "VERIFIKASI" && (
                    <CheckCircle2 className="h-3 w-3 mr-1 text-akar-earth" />
                  )}
                  {idea.statusLabel}
                </Badge>
              </div>

              <CardTitle className="text-base sm:text-lg line-clamp-2 leading-snug">
                {idea.judul}
              </CardTitle>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <Badge variant="outline" className="text-[10px] text-akar-muted">
                  <Tag className="h-3 w-3 mr-1 text-akar-primary" />
                  {idea.kategori}
                </Badge>
                <span className="text-[11px] text-akar-muted flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-akar-earth" />
                  {idea.lokasi}
                </span>
              </div>
            </CardHeader>

            <CardContent className="pb-4">
              <p className="text-xs sm:text-sm text-akar-muted leading-relaxed line-clamp-3">
                {idea.deskripsi}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-akar-muted">
                <User className="h-3.5 w-3.5 text-akar-earth" />
                <span>Pengusul: <strong className="text-akar-ink font-medium">{idea.pengusul}</strong></span>
              </div>
            </CardContent>

            <CardFooter className="pt-3 flex items-center justify-between gap-3 border-t border-akar-border/60">
              <div className="flex flex-col">
                <span className="text-xs text-akar-muted">Dukungan Warga</span>
                <span className="text-base font-extrabold text-akar-primary">
                  {count} <span className="text-xs font-normal text-akar-ink">suara</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={isSupported ? "default" : "outline"}
                  onClick={() => toggleSupport(idea.id)}
                  className={`min-h-[44px] px-3.5 text-xs font-semibold ${
                    isSupported
                      ? "bg-akar-primary text-white"
                      : "text-akar-primary border-akar-primary/30 hover:bg-akar-primary-light"
                  }`}
                  aria-label={`Dukung aspirasi ${idea.judul}`}
                >
                  <ThumbsUp className={`h-4 w-4 mr-1.5 ${isSupported ? "fill-white" : ""}`} />
                  {isSupported ? "Didukung" : "Dukung"}
                </Button>
                <Link href={`/ide/${idea.id}`}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="min-h-[44px] px-2 text-xs text-akar-muted hover:text-akar-ink"
                  >
                    Detail
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
