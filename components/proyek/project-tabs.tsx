"use client";

import * as React from "react";
import {
  FileText,
  FileSpreadsheet,
  UsersRound,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download,
  Info,
  Scale,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ProjectDetailData,
  formatRupiah,
} from "./types";

interface ProjectTabsProps {
  proyek: ProjectDetailData;
  initialTab?: "ringkasan" | "rab" | "proposal";
}

export function ProjectTabs({
  proyek,
  initialTab = "ringkasan",
}: ProjectTabsProps) {
  const [activeTab, setActiveTab] = React.useState<"ringkasan" | "rab" | "proposal">(
    initialTab
  );

  // Expanded proposal details tracking
  const [expandedProposal, setExpandedProposal] = React.useState<Record<string, boolean>>({
    [proyek.proposals[0]?.id || ""]: true, // Expand highest ranked by default
  });

  const toggleExpandProposal = (id: string) => {
    setExpandedProposal((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalRabSubtotal = proyek.rabItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  return (
    <div id="project-tabs-section" className="space-y-6">
      {/* Tab Navigation Header */}
      <div className="border-b border-akar-border bg-white rounded-xl shadow-2xs p-1.5 sm:p-2">
        <nav
          className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none"
          aria-label="Tabs Proyek"
        >
          <button
            onClick={() => setActiveTab("ringkasan")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px]",
              activeTab === "ringkasan"
                ? "bg-akar-primary text-white shadow-xs"
                : "text-akar-muted hover:text-akar-ink hover:bg-stone-100"
            )}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Ringkasan & Deskripsi</span>
          </button>

          <button
            onClick={() => setActiveTab("rab")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px]",
              activeTab === "rab"
                ? "bg-akar-primary text-white shadow-xs"
                : "text-akar-muted hover:text-akar-ink hover:bg-stone-100"
            )}
          >
            <FileSpreadsheet className="w-4 h-4 shrink-0" />
            <span>Rincian Micro-RAB</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                activeTab === "rab"
                  ? "bg-white/20 text-white"
                  : "bg-stone-200 text-akar-ink"
              )}
            >
              {proyek.rabItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("proposal")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px]",
              activeTab === "proposal"
                ? "bg-akar-primary text-white shadow-xs"
                : "text-akar-muted hover:text-akar-ink hover:bg-stone-100"
            )}
          >
            <UsersRound className="w-4 h-4 shrink-0" />
            <span>Proposal & Skor Transparansi</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                activeTab === "proposal"
                  ? "bg-white/20 text-white"
                  : "bg-stone-200 text-akar-ink"
              )}
            >
              {proyek.proposals.length}
            </span>
          </button>
        </nav>
      </div>

      {/* ==================== TAB 1: RINGKASAN & DESKRIPSI ==================== */}
      {activeTab === "ringkasan" && (
        <div className="space-y-6">
          {/* Main Description */}
          <Card>
            <CardContent className="p-5 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-akar-primary font-bold text-sm uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>Deskripsi & Latar Belakang Proyek</span>
              </div>
              <p className="text-sm sm:text-base text-akar-ink leading-relaxed">
                {proyek.deskripsi}
              </p>

              {/* Rationale for Sayembara Jalur */}
              <div className="mt-5 rounded-xl border border-akar-earth/25 bg-akar-earth-light/40 p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-akar-earth font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-akar-earth shrink-0" />
                  <span>Mengapa Sayembara Swakelola Warga?</span>
                </div>
                <p className="text-xs sm:text-sm text-akar-ink/90 leading-relaxed">
                  {proyek.alasanJalur}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <Badge variant="earth" className="bg-white/80">
                    Padat Karya Tunai Desa (PKTD)
                  </Badge>
                  <Badge variant="earth" className="bg-white/80">
                    Min. 70% Pekerja Lokal
                  </Badge>
                  <Badge variant="earth" className="bg-white/80">
                    Pengawasan Kolektif BPD & Warga
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scope & Technical Specs */}
          <Card>
            <CardContent className="p-5 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-akar-primary font-bold text-sm uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Ruang Lingkup & Ketentuan Teknis</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="rounded-lg border border-akar-border p-4 bg-stone-50/50 space-y-1.5">
                  <div className="font-semibold text-sm text-akar-ink flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-akar-primary-light text-akar-primary flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    Pekerjaan Galian & Pembersihan
                  </div>
                  <p className="text-xs text-akar-muted leading-relaxed pl-7">
                    Galian tanah saluran sepanjang 350 meter dengan kedalaman rerata 60-80 cm, lebar 50 cm. Pembuangan dan perapian sisa tanah galian di kiri-kanan badan jalan.
                  </p>
                </div>

                <div className="rounded-lg border border-akar-border p-4 bg-stone-50/50 space-y-1.5">
                  <div className="font-semibold text-sm text-akar-ink flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-akar-primary-light text-akar-primary flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    Pasangan Batu Kali Campuran Mortar
                  </div>
                  <p className="text-xs text-akar-muted leading-relaxed pl-7">
                    Konstruksi pasangan batu belah tipe 1:4 berkualitas baik, kokoh menahan beban lateral tanah, dan bebas dari rongga kosong antar batu kali.
                  </p>
                </div>

                <div className="rounded-lg border border-akar-border p-4 bg-stone-50/50 space-y-1.5">
                  <div className="font-semibold text-sm text-akar-ink flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-akar-primary-light text-akar-primary flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    Plesteran Kedap Air & Siaran
                  </div>
                  <p className="text-xs text-akar-muted leading-relaxed pl-7">
                    Plesteran acian kedap air ketebalan minimum 15mm pada dinding dalam saluran untuk memastikan kelancaran debit air dan mencegah rembesan ke pondasi rumah warga.
                  </p>
                </div>

                <div className="rounded-lg border border-akar-border p-4 bg-stone-50/50 space-y-1.5">
                  <div className="font-semibold text-sm text-akar-ink flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-akar-primary-light text-akar-primary flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    Pengujian Alir & Berita Acara
                  </div>
                  <p className="text-xs text-akar-muted leading-relaxed pl-7">
                    Uji coba pengaliran air sebelum serah terima pekerjaan dan penandatanganan Berita Acara Pemeriksaan Hasil Pekerjaan (BAPHP) bersama BPD.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Download Section */}
          <Card>
            <CardContent className="p-5 sm:p-7 space-y-3">
              <h3 className="font-bold text-sm text-akar-ink">
                Dokumen Pengadaan & Kerangka Acuan Kerja (KAK)
              </h3>
              <p className="text-xs text-akar-muted">
                Unduh berkas resmi yang disahkan Tim Pelaksana Kegiatan (TPK) Desa Karang Sari:
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button variant="outline" size="sm" className="gap-2 text-xs">
                  <Download className="w-3.5 h-3.5 text-akar-primary" />
                  <span>Kerangka Acuan Kerja (KAK) - PDF (1.2 MB)</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-xs">
                  <Download className="w-3.5 h-3.5 text-akar-earth" />
                  <span>Gambar Rencana Teknis Saluran - PDF (3.8 MB)</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-xs">
                  <Download className="w-3.5 h-3.5 text-akar-muted" />
                  <span>Format Proposal & Pakta Integritas - DOCX (450 KB)</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ==================== TAB 2: RINCIAN MICRO-RAB ==================== */}
      {activeTab === "rab" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-5 sm:p-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-akar-ink flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-akar-primary shrink-0" />
                    <span>Rincian Micro-RAB Terbuka (Harga Perkiraan Sendiri)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-akar-muted mt-0.5">
                    Transparansi volume pekerjaan dan estimasi standar biaya bahan/tenaga
                  </p>
                </div>
                <Badge variant="default" className="w-fit self-start sm:self-auto text-xs py-1 px-3">
                  Pagu: {formatRupiah(proyek.pagu)}
                </Badge>
              </div>

              {/* Responsive Micro-RAB Table */}
              <div className="overflow-x-auto rounded-xl border border-akar-border bg-white shadow-2xs mt-3">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[580px]">
                  <thead>
                    <tr className="bg-stone-50 border-b border-akar-border text-akar-ink font-bold">
                      <th className="py-3 px-3.5 w-12 text-center">No</th>
                      <th className="py-3 px-4">Uraian Pekerjaan & Bahan</th>
                      <th className="py-3 px-3 text-right">Volume</th>
                      <th className="py-3 px-3 text-center">Satuan</th>
                      <th className="py-3 px-4 text-right">Harga Satuan (Rp)</th>
                      <th className="py-3 px-4 text-right">Subtotal (Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-akar-border/60">
                    {proyek.rabItems.map((item, index) => (
                      <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-3.5 text-center text-akar-muted font-medium">
                          {index + 1}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-akar-ink">
                          {item.uraian}
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono text-akar-ink">
                          {item.volume.toLocaleString("id-ID")}
                        </td>
                        <td className="py-3.5 px-3 text-center text-akar-muted">
                          {item.satuan}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-akar-muted">
                          {formatRupiah(item.hargaSatuan)}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-akar-ink">
                          {formatRupiah(item.subtotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-akar-primary-light/40 border-t-2 border-akar-primary/30 font-bold text-akar-ink">
                      <td colSpan={5} className="py-4 px-4 text-right text-sm sm:text-base">
                        Total Pagu Anggaran Rencana (Micro-RAB):
                      </td>
                      <td className="py-4 px-4 text-right text-sm sm:text-base font-mono text-akar-primary font-extrabold">
                        {formatRupiah(totalRabSubtotal)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Explanatory Notice */}
              <div className="rounded-lg bg-stone-50 border border-akar-border/80 p-4 text-xs text-akar-muted leading-relaxed space-y-1">
                <div className="font-semibold text-akar-ink flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-akar-primary" />
                  <span>Pedoman Penawaran Sayembara Warga:</span>
                </div>
                <p>
                  1. Penawaran harga total dari kelompok swakelola <strong>tidak boleh melampaui Pagu Anggaran Rp100.000.000</strong>.
                </p>
                <p>
                  2. Efisiensi penawaran harga dinilai dengan formula PRD Bagian 25 (bobot 40%), namun penawaran yang terlalu rendah di bawah ambang wajar (&lt; 70% pagu) akan dievaluasi ketat untuk mencegah penurunan mutu material.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ==================== TAB 3: PROPOSAL PESERTA & SKOR ==================== */}
      {activeTab === "proposal" && (
        <div className="space-y-6">
          {/* Header Information Banner */}
          <div className="rounded-xl border border-akar-primary/20 bg-akar-primary-light/40 p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2 text-akar-primary font-bold text-sm sm:text-base">
              <Scale className="w-5 h-5 shrink-0" />
              <span>Transparansi Penilaian Sayembara Terbuka (Algoritma Murni)</span>
            </div>
            <p className="text-xs sm:text-sm text-akar-ink/80 leading-relaxed">
              Seluruh skor dihitung otomatis oleh formula murni di <code className="bg-white/80 px-1 py-0.5 rounded text-[11px] font-mono text-akar-primary">lib/scoring.ts</code> (Harga 40%, Tenaga Lokal 30%, Pengalaman 20%, Durasi 10%). AI tidak menentukan nilai, melainkan memberikan analisis ringkasan dan deteksi anomali/kolusi secara obyektif.
            </p>
          </div>

          {/* Proposals List */}
          <div className="space-y-4">
            {proyek.proposals.map((prop, idx) => {
              const isExpanded = !!expandedProposal[prop.id];
              const rank = idx + 1;
              const hasFlags = prop.flagsDetail && prop.flagsDetail.length > 0;

              return (
                <Card
                  key={prop.id}
                  className={cn(
                    "transition-all duration-200 border",
                    rank === 1
                      ? "border-akar-primary/40 ring-1 ring-akar-primary/20"
                      : "border-akar-border"
                  )}
                >
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    {/* Header Row: Rank, Group Name, Score */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-akar-border/60">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1",
                              rank === 1
                                ? "bg-akar-primary text-white"
                                : rank === 2
                                ? "bg-akar-earth-light text-akar-earth border border-akar-earth/30"
                                : "bg-stone-100 text-akar-muted border border-stone-200"
                            )}
                          >
                            {rank === 1 && <Sparkles className="w-3 h-3" />}
                            Peringkat #{rank}
                          </span>
                          <span className="text-xs text-akar-muted">
                            ID: <code className="font-mono">{prop.id}</code>
                          </span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-extrabold text-akar-ink">
                          {prop.namaKelompok}
                        </h4>
                        <p className="text-xs text-akar-muted flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-stone-400" />
                          <span>Ketua Kelompok: <strong>{prop.ketua}</strong></span>
                        </p>
                      </div>

                      {/* Score Highlight Box */}
                      <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center bg-akar-primary-light/50 border border-akar-primary/20 rounded-xl p-3 sm:px-4 sm:py-2.5 shrink-0">
                        <span className="text-[11px] font-semibold text-akar-primary uppercase tracking-wider">
                          Skor Transparansi
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-black text-akar-primary tracking-tight">
                            {prop.skor.total.toFixed(1)}
                          </span>
                          <span className="text-xs font-semibold text-akar-muted">
                            / 100
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Metrics of the Proposal */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                      <div className="bg-stone-50 rounded-lg p-2.5 border border-akar-border/60">
                        <span className="text-akar-muted text-[11px] block">Nilai Penawaran</span>
                        <span className="font-bold text-sm text-akar-ink font-mono">
                          {formatRupiah(prop.penawaran)}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          ({Math.round((prop.penawaran / proyek.pagu) * 100)}% Pagu)
                        </span>
                      </div>

                      <div className="bg-stone-50 rounded-lg p-2.5 border border-akar-border/60">
                        <span className="text-akar-muted text-[11px] block">Tenaga Kerja Lokal</span>
                        <span className="font-bold text-sm text-akar-ink">
                          {prop.tenagaLokal} dari {prop.tenagaTotal} orang
                        </span>
                        <span
                          className={cn(
                            "text-[10px] font-bold block",
                            prop.persentaseLokal >= 70
                              ? "text-akar-primary"
                              : "text-akar-danger"
                          )}
                        >
                          {prop.persentaseLokal}% (Syarat: Min. 70%)
                        </span>
                      </div>

                      <div className="bg-stone-50 rounded-lg p-2.5 border border-akar-border/60">
                        <span className="text-akar-muted text-[11px] block">Target Waktu</span>
                        <span className="font-bold text-sm text-akar-ink">
                          {prop.durasiHari} Hari Kalender
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          Batas: 30 - 60 Hari
                        </span>
                      </div>

                      <div className="bg-stone-50 rounded-lg p-2.5 border border-akar-border/60">
                        <span className="text-akar-muted text-[11px] block">Status Integritas</span>
                        {hasFlags ? (
                          <span className="font-bold text-xs text-akar-danger flex items-center gap-1 mt-0.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            {prop.flagsDetail.length} Indikasi Catatan
                          </span>
                        ) : (
                          <span className="font-bold text-xs text-akar-primary flex items-center gap-1 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                            Lolos Uji Integritas
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Flags Alerts Section if Present */}
                    {hasFlags && (
                      <div className="space-y-2 pt-1">
                        {prop.flagsDetail.map((fl, fIdx) => (
                          <div
                            key={fIdx}
                            className={cn(
                              "flex items-start gap-2.5 rounded-lg p-3 text-xs leading-relaxed border",
                              fl.tingkat === "danger"
                                ? "bg-akar-danger-light border-akar-danger/20 text-akar-danger"
                                : "bg-amber-50 border-amber-200 text-amber-900"
                            )}
                          >
                            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold block sm:inline mr-1">
                                {fl.label}:
                              </strong>
                              <span>{fl.deskripsi}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Expand/Collapse Toggle Button */}
                    <div className="pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpandProposal(prop.id)}
                        className="w-full justify-between text-xs text-akar-muted hover:text-akar-ink hover:bg-stone-100"
                      >
                        <span>
                          {isExpanded
                            ? "Sembunyikan Rincian Skor & Analisis AI"
                            : "Lihat Rincian Skor Komponen & Ulasan AI"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-stone-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400" />
                        )}
                      </Button>
                    </div>

                    {/* Collapsible Details: Score Breakdown + AI Analysis */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-akar-border/60 space-y-5 animate-in fade-in duration-200">
                        {/* 1. Score Breakdown Bars */}
                        <div className="space-y-3">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-akar-ink flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-akar-primary" />
                            <span>Rincian Bobot Skor (Formula PRD 25):</span>
                          </h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {/* Harga */}
                            <div className="rounded-lg bg-stone-50 border border-akar-border p-3 space-y-1.5">
                              <div className="flex justify-between font-semibold">
                                <span className="text-akar-muted">1. Efisiensi Harga (40%)</span>
                                <span className="font-mono text-akar-ink">
                                  {prop.skor.rincian.harga.toFixed(1)} / 40.0
                                </span>
                              </div>
                              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-akar-primary h-full rounded-full transition-all"
                                  style={{
                                    width: `${(prop.skor.rincian.harga / 40) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {/* Tenaga Kerja Lokal */}
                            <div className="rounded-lg bg-stone-50 border border-akar-border p-3 space-y-1.5">
                              <div className="flex justify-between font-semibold">
                                <span className="text-akar-muted">2. Tenaga Kerja Lokal (30%)</span>
                                <span className="font-mono text-akar-ink">
                                  {prop.skor.rincian.tenagaLokal.toFixed(1)} / 30.0
                                </span>
                              </div>
                              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all",
                                    prop.skor.rincian.tenagaLokal >= 25
                                      ? "bg-akar-primary"
                                      : "bg-akar-danger"
                                  )}
                                  style={{
                                    width: `${(prop.skor.rincian.tenagaLokal / 30) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {/* Pengalaman / Kelengkapan */}
                            <div className="rounded-lg bg-stone-50 border border-akar-border p-3 space-y-1.5">
                              <div className="flex justify-between font-semibold">
                                <span className="text-akar-muted">3. Kelengkapan & Pengalaman (20%)</span>
                                <span className="font-mono text-akar-ink">
                                  {prop.skor.rincian.pengalaman.toFixed(1)} / 20.0
                                </span>
                              </div>
                              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-akar-earth h-full rounded-full transition-all"
                                  style={{
                                    width: `${(prop.skor.rincian.pengalaman / 20) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {/* Durasi */}
                            <div className="rounded-lg bg-stone-50 border border-akar-border p-3 space-y-1.5">
                              <div className="flex justify-between font-semibold">
                                <span className="text-akar-muted">4. Kesesuaian Waktu (10%)</span>
                                <span className="font-mono text-akar-ink">
                                  {prop.skor.rincian.durasi.toFixed(1)} / 10.0
                                </span>
                              </div>
                              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-akar-accent h-full rounded-full transition-all"
                                  style={{
                                    width: `${(prop.skor.rincian.durasi / 10) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2. AI Review Box */}
                        {prop.ringkasanAi && (
                          <div className="rounded-xl border border-akar-accent/30 bg-akar-accent-light/40 p-4 sm:p-5 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-akar-ink">
                                <Sparkles className="w-4 h-4 text-akar-earth shrink-0" />
                                <span>Analisis Asisten AI AKAR (OpenRouter Evaluator)</span>
                              </div>
                              <span className="text-[10px] text-akar-muted font-mono bg-white/80 px-2 py-0.5 rounded border border-stone-200">
                                Model: {prop.ringkasanAi.model}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-akar-ink/90 leading-relaxed font-medium">
                              &ldquo;{prop.ringkasanAi.ringkasanEksekutif}&rdquo;
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                              {/* Strengths */}
                              <div className="bg-white/80 rounded-lg p-3 border border-akar-border/80 space-y-2">
                                <span className="font-bold text-akar-primary flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                  Poin Kekuatan:
                                </span>
                                <ul className="space-y-1 text-akar-ink/90">
                                  {prop.ringkasanAi.poinKekuatan.map((poin, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                                      <span className="text-akar-primary font-bold">•</span>
                                      <span>{poin}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Points of Concern */}
                              <div className="bg-white/80 rounded-lg p-3 border border-akar-border/80 space-y-2">
                                <span className="font-bold text-akar-danger flex items-center gap-1">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                  Poin Perhatian & Mitigasi:
                                </span>
                                <ul className="space-y-1 text-akar-ink/90">
                                  {prop.ringkasanAi.poinPerhatian.map((poin, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                                      <span className="text-akar-danger font-bold">•</span>
                                      <span>{poin}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="text-xs text-akar-muted pt-1 border-t border-akar-border/40">
                              <strong>Rekomendasi Penilai:</strong> {prop.ringkasanAi.rekomendasiCatatan}
                            </div>
                          </div>
                        )}

                        {/* 3. Narratives & Files */}
                        <div className="space-y-2 text-xs pt-1">
                          <h6 className="font-bold text-akar-ink">Uraian Teknis & Mitigasi Risiko:</h6>
                          <div className="rounded-lg bg-stone-50 p-3 space-y-2 text-akar-muted border border-akar-border/60 leading-relaxed">
                            <p>
                              <strong className="text-akar-ink">Metode Pelaksanaan:</strong> {prop.narasiMetode}
                            </p>
                            <p>
                              <strong className="text-akar-ink">Jadwal Kerja:</strong> {prop.narasiJadwal}
                            </p>
                            <p>
                              <strong className="text-akar-ink">Mitigasi Risiko Genangan/Hujan:</strong> {prop.narasiRisiko}
                            </p>
                          </div>
                        </div>

                        {/* Attached Docs */}
                        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                          <span className="text-akar-muted font-medium">Berkas Terlampir:</span>
                          {prop.dokumen.map((doc, dIdx) => (
                            <Badge key={dIdx} variant="outline" className="gap-1 text-[11px] font-mono">
                              <FileText className="w-3 h-3 text-akar-primary" />
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
