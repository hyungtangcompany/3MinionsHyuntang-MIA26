import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, HardHat, MapPin } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/lib/format";
import { getProyekList, type ProyekListItem } from "@/lib/proyek-api";

export const revalidate = 0;
export const dynamic = "force-dynamic";

function statusVariant(status: string): "default" | "earth" | "neutral" {
  if (status === "PENGERJAAN") return "earth";
  if (status === "TENDER_DIBUKA" || status === "SELESAI") return "default";
  return "neutral";
}

export default async function ProyekIndexPage() {
  let proyekList: ProyekListItem[];
  let errorMessage: string | null = null;

  try {
    proyekList = await getProyekList();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Daftar proyek tidak dapat dimuat.";
    proyekList = [];
  }

  return (
    <div className="min-h-screen bg-akar-bg text-akar-ink flex flex-col justify-between">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-akar-primary-light text-akar-primary text-xs font-semibold">Bursa Kerja Sayembara Swakelola</div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Daftar Proyek Pembangunan Desa</h1>
          <p className="text-sm sm:text-base text-akar-muted max-w-3xl leading-relaxed">Pekerjaan konstruksi dan pemeliharaan infrastruktur desa yang terbuka bagi kelompok warga, tukang, dan karang taruna setempat dengan prinsip transparansi penuh.</p>
        </div>

        {errorMessage ? (
          <div role="alert" className="rounded-2xl border border-akar-danger/30 bg-akar-danger-light p-8 text-center">
            <p className="font-semibold text-akar-ink">Daftar proyek belum dapat dimuat.</p>
            <p className="mt-1 text-sm text-akar-muted">{errorMessage}</p>
          </div>
        ) : proyekList.length === 0 ? (
          <div className="text-center py-16 bg-white border border-akar-border rounded-2xl p-8"><p className="text-akar-muted text-sm">Belum ada sayembara proyek yang terdaftar di basis data.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proyekList.map((proyek) => (
              <Card className="flex flex-col justify-between border-akar-border bg-white hover:border-akar-primary/60 hover:shadow-md transition-all duration-200" key={proyek.id}>
                <CardHeader className="p-5 pb-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={statusVariant(proyek.status)} className="text-xs font-semibold">
                      {proyek.status === "TENDER_DIBUKA" && <Clock className="h-3 w-3 mr-1" />}
                      {proyek.status === "PENGERJAAN" && <HardHat className="h-3 w-3 mr-1" />}
                      {proyek.status === "SELESAI" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {proyek.status.replace(/_/g, " ")}
                    </Badge>
                    <Badge className="text-[11px] text-akar-muted font-normal" variant="outline">Jalur {proyek.jalur ?? "SAYEMBARA"}</Badge>
                  </div>
                  <CardTitle className="text-lg font-bold leading-snug line-clamp-2 text-akar-ink">{proyek.judul}</CardTitle>
                  <div className="flex items-center gap-1.5 text-xs text-akar-muted"><MapPin className="h-3.5 w-3.5 text-akar-earth shrink-0" /><span className="truncate">{proyek.lokasi}</span></div>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-3">
                  <p className="text-xs text-akar-muted line-clamp-2 leading-relaxed">{proyek.deskripsi}</p>
                  <div className="rounded-xl bg-stone-50 border border-akar-border/80 p-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center"><span className="text-akar-muted">Pagu Anggaran:</span><span className="font-extrabold text-akar-primary text-sm">{formatRupiah(proyek.pagu)}</span></div>
                    <div className="flex justify-between items-center text-akar-muted text-[11px]"><span>Serapan Tenaga Lokal:</span><span className="font-semibold text-akar-ink">Min. {proyek.syaratLokalMin}% Warga</span></div>
                    <div className="flex justify-between items-center text-akar-muted text-[11px] pt-1 border-t border-akar-border/40"><span>Proposal Masuk:</span><span className="font-semibold text-akar-ink">{proyek.proposal?.length ?? 0} Kelompok</span></div>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-3 border-t border-akar-border/60 flex items-center justify-between"><span className="text-[11px] text-akar-muted">Durasi: {proyek.durasiMin}–{proyek.durasiMax} Hari</span><Button asChild className="bg-akar-primary hover:bg-akar-primary-hover text-white text-xs font-semibold" size="sm"><Link href={`/proyek/${proyek.id}`}>Buka Detail <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link></Button></CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
