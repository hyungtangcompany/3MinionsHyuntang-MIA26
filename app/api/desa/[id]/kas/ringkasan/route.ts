import { NextResponse } from "next/server";
import { prisma, serializeBigInt } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let desa = await prisma.desa.findUnique({
      where: { id },
    });

    // Fallback jika id seed digunakan sebelum ID custom terpasang
    if (!desa && (id === "seed_desa_001" || id === "default")) {
      desa = await prisma.desa.findFirst();
    }

    if (!desa) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "NOT_FOUND",
            message: `Desa dengan ID '${id}' tidak ditemukan`,
          },
        },
        { status: 404 }
      );
    }

    const konfigurasi =
      desa.konfigurasi && typeof desa.konfigurasi === "object"
        ? (desa.konfigurasi as Record<string, unknown>)
        : {};

    const bukuKas =
      konfigurasi.bukuKas && typeof konfigurasi.bukuKas === "object"
        ? (konfigurasi.bukuKas as Record<string, unknown>)
        : {};

    const totalPemasukan =
      typeof bukuKas.totalPemasukan === "number"
        ? bukuKas.totalPemasukan
        : Number(desa.pagu ?? 0);

    const totalPengeluaran =
      typeof bukuKas.totalPengeluaran === "number"
        ? bukuKas.totalPengeluaran
        : 0;

    const sisaSaldo =
      typeof bukuKas.sisaSaldo === "number"
        ? bukuKas.sisaSaldo
        : totalPemasukan - totalPengeluaran;

    const transaksiTerakhir = Array.isArray(bukuKas.transaksiTerakhir)
      ? bukuKas.transaksiTerakhir
      : [];

    const responsePayload = {
      desaId: desa.id,
      namaDesa: desa.nama,
      totalPemasukan,
      totalPengeluaran,
      sisaSaldo,
      transaksiTerakhir,
    };

    return NextResponse.json({
      data: serializeBigInt(responsePayload),
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

