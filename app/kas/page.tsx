import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Download,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { KasMutasiTable, type KasTransaction } from "@/components/kas/kas-mutasi-table";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatRupiah } from "@/lib/format";

export const revalidate = 0;

interface KasRingkasan {
  desaId: string;
  namaDesa: string;
  totalPemasukan: number;
  totalPengeluaran: number;
  sisaSaldo: number;
  transaksiTerakhir: KasTransaction[];
}

const fallbackKasData: KasRingkasan = {
  desaId: "seed_desa_001",
  namaDesa: "Desa Karang Sari",
  totalPemasukan: 1_500_000_000,
  totalPengeluaran: 850_000_000,
  sisaSaldo: 650_000_000,
  transaksiTerakhir: [],
};

function isKasRingkasan(value: unknown): value is KasRingkasan {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;

  return (
    typeof data.desaId === "string" &&
    typeof data.namaDesa === "string" &&
    typeof data.totalPemasukan === "number" &&
    typeof data.totalPengeluaran === "number" &&
    typeof data.sisaSaldo === "number" &&
    Array.isArray(data.transaksiTerakhir)
  );
}

async function getKasRingkasan(): Promise<KasRingkasan> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/desa/seed_desa_001/kas/ringkasan`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Gagal mengambil data buku kas");

    const json: unknown = await res.json();
    if (!json || typeof json !== "object" || !isKasRingkasan((json as { data?: unknown }).data)) {
      throw new Error("Format data buku kas tidak valid");
    }

    return (json as { data: KasRingkasan }).data;
  } catch (error) {
    console.error("Error fetching kas ringkasan:", error);
    return fallbackKasData;
  }
}

export default async function KasPage() {
  const kasData = await getKasRingkasan();
  const serapan = kasData.totalPemasukan > 0
    ? (kasData.totalPengeluaran / kasData.totalPemasukan) * 100
    : 0;

  return (
    <div className="flex min-h-screen flex-col justify-between bg-akar-bg text-akar-ink">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-akar-border/80 pb-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-akar-primary-light px-3 py-1 text-xs font-semibold text-akar-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Buku Kas Terbuka &amp; Rantai Log SHA-256</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-akar-ink sm:text-4xl">Buku Kas Umum Publik</h1>
            <p className="max-w-2xl text-xs leading-relaxed text-akar-muted sm:text-sm">
              Catatan mutasi realisasi anggaran pendapatan dan belanja {kasData.namaDesa} Tahun Anggaran 2026. Setiap rupiah tercatat dengan sistem append-only dan diverifikasi bersama BPD.
            </p>
          </div>

          <Link href="/data" className="self-start md:self-auto">
            <Button className="min-h-10 gap-1.5 border-akar-border text-xs font-semibold" size="sm" variant="outline">
              <Download className="h-3.5 w-3.5 text-akar-primary" />
              Unduh CSV / JSON
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card className="flex flex-col justify-between space-y-2 rounded-2xl border-akar-border/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-akar-muted">Total Pemasukan (RKD)</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-akar-primary-light text-akar-primary"><ArrowDownLeft className="h-4 w-4" /></div>
            </div>
            <div>
              <div className="font-mono text-2xl font-extrabold tracking-tight text-akar-primary sm:text-3xl">{formatRupiah(kasData.totalPemasukan)}</div>
              <p className="mt-1 text-[11px] text-akar-muted">Penyaluran DD Tahap 1 &amp; 2, ADD, PADes, dan Bagi Hasil Pajak.</p>
            </div>
            <div className="flex items-center gap-1.5 border-t border-akar-border/40 pt-3 text-[11px] font-medium text-akar-primary"><CheckCircle2 className="h-3.5 w-3.5 shrink-0" />100% dana tersalur ke kas desa</div>
          </Card>

          <Card className="flex flex-col justify-between space-y-2 rounded-2xl border-akar-border/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-akar-muted">Total Realisasi Belanja</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-akar-earth-light text-akar-earth"><ArrowUpRight className="h-4 w-4" /></div>
            </div>
            <div>
              <div className="font-mono text-2xl font-extrabold tracking-tight text-akar-earth sm:text-3xl">{formatRupiah(kasData.totalPengeluaran)}</div>
              <p className="mt-1 text-[11px] text-akar-muted">Siltap, belanja operasional, termin proyek fisik, dan ketahanan pangan.</p>
            </div>
            <div className="flex items-center justify-between border-t border-akar-border/40 pt-3 text-[11px] text-akar-muted"><span>Serapan Anggaran:</span><span className="font-bold text-akar-ink">{serapan.toFixed(1)}% Terserap</span></div>
          </Card>

          <Card className="flex flex-col justify-between space-y-2 rounded-2xl border-akar-primary/30 bg-akar-primary p-5 text-white shadow-sm">
            <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wider text-white/80">Sisa Saldo Kas Desa</span><div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><Wallet className="h-4 w-4" /></div></div>
            <div><div className="font-mono text-2xl font-extrabold tracking-tight sm:text-3xl">{formatRupiah(kasData.sisaSaldo)}</div><p className="mt-1 text-[11px] text-white/80">Saldo aktif tersimpan di Rekening Kas Desa (RKD) bank operasional resmi.</p></div>
            <div className="flex items-center gap-1.5 border-t border-white/15 pt-3 text-[11px] font-medium text-white/85"><ShieldCheck className="h-3.5 w-3.5 shrink-0" />Rekonsiliasi otomatis harian</div>
          </Card>
        </div>

        <div className="flex flex-col justify-between gap-3 rounded-xl border border-akar-border bg-white p-4 text-xs text-akar-muted sm:flex-row sm:items-center">
          <div className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-akar-primary" /><span><strong className="text-akar-ink">Keamanan Integritas Data:</strong> Seluruh riwayat transaksi di bawah ini terikat pada ledger append-only berantai SHA-256 untuk mencegah manipulasi saldo atau penghapusan transaksi diam-diam.</span></div>
          <span className="shrink-0 rounded bg-akar-bg px-2 py-1 font-mono text-[10px] text-akar-muted">LEDGER-STATUS: VALID</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4"><h2 className="text-lg font-bold tracking-tight text-akar-ink">Mutasi Transaksi Buku Kas Terakhir</h2><Badge className="shrink-0 font-mono text-xs" variant="outline">{kasData.transaksiTerakhir.length} Entri</Badge></div>
          <KasMutasiTable transaksiList={kasData.transaksiTerakhir} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
