"use client";

import * as React from "react";
import { ExternalLink, FileText, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format";

export type KasTransactionType = "PEMASUKAN" | "PENGELUARAN";

export interface KasTransaction {
  id: string;
  tanggal: string;
  jenis: KasTransactionType;
  kategori: string;
  uraian: string;
  jumlah: number;
  buktiUrl: string;
}

interface KasMutasiTableProps {
  transaksiList: KasTransaction[];
}

type FilterType = "SEMUA" | KasTransactionType;

const filters: Array<{ value: FilterType; label: string }> = [
  { value: "SEMUA", label: "Semua" },
  { value: "PEMASUKAN", label: "Pemasukan" },
  { value: "PENGELUARAN", label: "Pengeluaran" },
];

function formatTanggal(tanggal: string) {
  const date = new Date(tanggal);

  if (Number.isNaN(date.getTime())) return "Tanggal tidak tersedia";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function TypeBadge({ jenis }: { jenis: KasTransactionType }) {
  const pemasukan = jenis === "PEMASUKAN";

  return (
    <Badge variant={pemasukan ? "default" : "earth"} className="w-fit text-[10px]">
      {pemasukan ? "Debit" : "Kredit"}
    </Badge>
  );
}

function BuktiLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-xs font-semibold text-akar-primary transition-colors hover:bg-akar-primary-light hover:underline focus:outline-none focus:ring-2 focus:ring-akar-primary/40"
      aria-label="Buka bukti pembayaran digital"
    >
      <FileText className="h-3.5 w-3.5" />
      Bukti
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export function KasMutasiTable({ transaksiList }: KasMutasiTableProps) {
  const [filter, setFilter] = React.useState<FilterType>("SEMUA");
  const transaksi = React.useMemo(
    () =>
      filter === "SEMUA"
        ? transaksiList
        : transaksiList.filter((item) => item.jenis === filter),
    [filter, transaksiList]
  );

  return (
    <section className="overflow-hidden rounded-xl border border-akar-border bg-white">
      <div className="flex flex-col gap-3 border-b border-akar-border/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-akar-ink">
          <Filter className="h-4 w-4 text-akar-primary" />
          Filter mutasi
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Filter jenis transaksi">
          {filters.map((item) => (
            <Button
              key={item.value}
              type="button"
              size="sm"
              variant={filter === item.value ? "default" : "outline"}
              onClick={() => setFilter(item.value)}
              className="min-h-9 text-xs"
              aria-pressed={filter === item.value}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {transaksi.length === 0 ? (
        <div className="p-8 text-center text-sm text-akar-muted">
          Belum ada transaksi untuk filter ini.
        </div>
      ) : (
        <>
          <div className="space-y-3 p-4 md:hidden">
            {transaksi.map((item) => (
              <article key={item.id} className="rounded-lg border border-akar-border/70 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-akar-muted">{formatTanggal(item.tanggal)}</p>
                    <p className="mt-1 text-sm font-semibold text-akar-ink">{item.kategori}</p>
                  </div>
                  <TypeBadge jenis={item.jenis} />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-akar-muted">{item.uraian}</p>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-akar-border/60 pt-2">
                  <span className="font-mono text-sm font-bold text-akar-ink">{formatRupiah(item.jumlah)}</span>
                  <BuktiLink url={item.buktiUrl} />
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-akar-bg text-xs uppercase tracking-wide text-akar-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Tanggal</th>
                  <th className="px-5 py-3 font-semibold">Kategori</th>
                  <th className="px-5 py-3 font-semibold">Uraian transaksi</th>
                  <th className="px-5 py-3 font-semibold">Tipe</th>
                  <th className="px-5 py-3 text-right font-semibold">Nominal</th>
                  <th className="px-5 py-3 text-center font-semibold">Bukti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-akar-border/70">
                {transaksi.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-akar-primary-light/25">
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-akar-muted">{formatTanggal(item.tanggal)}</td>
                    <td className="px-5 py-4 font-semibold text-akar-ink">{item.kategori}</td>
                    <td className="max-w-md px-5 py-4 text-xs leading-relaxed text-akar-muted">{item.uraian}</td>
                    <td className="px-5 py-4"><TypeBadge jenis={item.jenis} /></td>
                    <td className="whitespace-nowrap px-5 py-4 text-right font-mono text-xs font-bold text-akar-ink">{formatRupiah(item.jumlah)}</td>
                    <td className="px-5 py-3 text-center"><BuktiLink url={item.buktiUrl} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
