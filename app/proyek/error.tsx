"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProyekError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Gagal memuat proyek:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-akar-bg px-4 pt-24 pb-16">
      <div className="mx-auto max-w-xl rounded-2xl border border-akar-danger/30 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-akar-ink">Data proyek belum dapat dimuat</h1>
        <p className="mt-2 text-sm text-akar-muted">Silakan coba lagi beberapa saat lagi.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset}>Coba lagi</Button>
          <Button variant="outline" asChild><Link href="/proyek">Kembali ke proyek</Link></Button>
        </div>
      </div>
    </main>
  );
}
