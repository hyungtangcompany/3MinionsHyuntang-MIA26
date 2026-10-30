import { NextResponse } from "next/server";
import { prisma, serializeBigInt } from "@/lib/prisma";
import { hitungSkor, type HitungSkorResult } from "@/lib/scoring";

function parseKelengkapanCount(kelengkapan: unknown): number {
  if (typeof kelengkapan === "number") {
    return Math.min(5, Math.max(0, kelengkapan));
  }
  if (kelengkapan && typeof kelengkapan === "object") {
    if (Array.isArray(kelengkapan)) {
      return Math.min(5, kelengkapan.length);
    }
    const trueCount = Object.values(kelengkapan).filter(Boolean).length;
    return Math.min(5, trueCount);
  }
  return 0;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: proyekId } = await params;

    const proyek = await prisma.proyek.findUnique({
      where: { id: proyekId },
    });

    if (!proyek) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "NOT_FOUND",
            message: `Proyek dengan ID '${proyekId}' tidak ditemukan`,
          },
        },
        { status: 404 }
      );
    }

    const proposals = await prisma.proposal.findMany({
      where: { proyekId },
      include: {
        kelompok: {
          include: {
            ketua: true,
            anggota: true,
          },
        },
        ringkasan: true,
        skor: true,
      },
      orderBy: {
        dikirimPada: "asc",
      },
    });

    const proposalsWithScoring = proposals.map((proposal) => {
      let scoringResult: HitungSkorResult;

      try {
        scoringResult = hitungSkor({
          pagu: Number(proyek.pagu),
          penawaran: Number(proposal.penawaran),
          tenagaTotal: proposal.tenagaTotal,
          tenagaLokal: proposal.tenagaLokal,
          durasi: proposal.durasiHari,
          durasiMin: proyek.durasiMin,
          durasiMax: proyek.durasiMax,
          kelengkapan: parseKelengkapanCount(proposal.kelengkapan),
          syaratLokalMin: proyek.syaratLokalMin,
        });
      } catch (err: unknown) {
        const errMsg =
          err instanceof Error ? err.message : "Penawaran tidak valid";
        scoringResult = {
          total: 0,
          rincian: { biaya: 0, lokal: 0, jadwal: 0, lengkap: 0 },
          flags: [errMsg],
          versiBobot: "v1",
        };
      }

      return {
        ...proposal,
        scoring: {
          total: scoringResult.total,
          rincian: scoringResult.rincian,
          flags: scoringResult.flags,
          versiBobot: scoringResult.versiBobot,
        },
      };
    });

    return NextResponse.json({
      data: serializeBigInt(proposalsWithScoring),
      error: null,
      meta: {
        total: proposalsWithScoring.length,
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Terjadi kesalahan pada server";

    return NextResponse.json(
      {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: errorMessage,
        },
      },
      { status: 500 }
    );
  }
}

