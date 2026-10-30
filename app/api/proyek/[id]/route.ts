import { NextResponse } from "next/server";
import { prisma, serializeBigInt } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const proyek = await prisma.proyek.findUnique({
      where: { id },
      include: {
        desa: true,
        rab: true,
        proposal: {
          include: {
            kelompok: true,
            ringkasan: true,
            skor: true,
          },
        },
        flag: true,
      },
    });

    if (!proyek) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "NOT_FOUND",
            message: `Proyek dengan ID '${id}' tidak ditemukan`,
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: serializeBigInt(proyek),
      error: null,
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

