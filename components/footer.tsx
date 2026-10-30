import * as React from "react";
import Link from "next/link";
import { ShieldCheck, Database, FileText, ExternalLink, HelpCircle, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-akar-border bg-white text-akar-ink">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Ringkasan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-akar-primary text-white">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-akar-primary">
                AKAR
              </span>
            </div>
            <p className="text-xs sm:text-sm text-akar-muted leading-relaxed">
              <strong>Aspirasi, Keterbukaan, Aksi, dan Realisasi</strong> — Platform transparansi dana desa dan bursa kerja sayembara swakelola warga.
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg bg-akar-primary-light/60 px-3 py-2 text-xs font-medium text-akar-primary">
              <MapPin className="h-3.5 w-3.5" />
              <span>Desa Karang Sari, Kec. Harapan</span>
            </div>
          </div>

          {/* Navigasi Modul */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-akar-ink">
              Modul Transparansi
            </h4>
            <ul className="space-y-2 text-sm text-akar-muted">
              <li>
                <Link
                  href="/proyek"
                  className="hover:text-akar-primary transition-colors flex items-center gap-1.5 py-1"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Sayembara Swakelola
                </Link>
              </li>
              <li>
                <Link
                  href="/ide"
                  className="hover:text-akar-primary transition-colors flex items-center gap-1.5 py-1"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  Aspirasi & Aduan Warga
                </Link>
              </li>
              <li>
                <Link
                  href="/kas"
                  className="hover:text-akar-primary transition-colors flex items-center gap-1.5 py-1"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Buku Kas Publik (Log Anti-Ubah)
                </Link>
              </li>
              <li>
                <Link
                  href="/data"
                  className="hover:text-akar-primary transition-colors flex items-center gap-1.5 py-1"
                >
                  <Database className="h-3.5 w-3.5" />
                  Data Terbuka (Unduh CSV/JSON)
                </Link>
              </li>
            </ul>
          </div>

          {/* Standar & Regulasi */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-akar-ink">
              Rujukan & Akuntabilitas
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-akar-muted">
              <li>
                <span className="font-medium text-akar-ink">Permendes PDT 16/2025:</span>
                <span className="block text-xs">Pola Padat Karya Tunai Desa (PKTD)</span>
              </li>
              <li>
                <span className="font-medium text-akar-ink">Peraturan LKPP 12/2019:</span>
                <span className="block text-xs">Pedoman Pengadaan Barang/Jasa di Desa</span>
              </li>
              <li>
                <span className="font-medium text-akar-ink">PMK 7/2026:</span>
                <span className="block text-xs">Ketentuan Penyaluran & Alokasi KDMP</span>
              </li>
              <li>
                <span className="font-medium text-akar-ink">UU PDP No. 27/2022:</span>
                <span className="block text-xs">Privasi identitas NIK & pelapor anonim</span>
              </li>
            </ul>
          </div>

          {/* Kontak & Bantuan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-akar-ink">
              Kontak & Pengawasan
            </h4>
            <p className="text-xs text-akar-muted leading-relaxed">
              Pemerintah Desa Karang Sari & Badan Permusyawaratan Desa (BPD) selaku pengawas independen.
            </p>
            <div className="text-xs text-akar-muted space-y-1">
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-akar-earth" />
                <span>aspirasi@karangsari.desa.id</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/tiket"
                  className="text-xs font-semibold text-akar-primary hover:underline inline-flex items-center gap-1"
                >
                  Lacak Tiket Audit Warga
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-akar-border/60 pt-6 text-xs text-akar-muted gap-4">
          <p>© 2026 AKAR - Tim 3MinionsHyuntang (WIA MIA 2026). Hak Cipta Dilindungi.</p>
          <div className="flex items-center space-x-6">
            <Link href="/data" className="hover:text-akar-primary transition-colors">
              Data Terbuka
            </Link>
            <Link href="/tentang" className="hover:text-akar-primary transition-colors">
              Tentang AKAR
            </Link>
            <Link href="/privasi" className="hover:text-akar-primary transition-colors">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

