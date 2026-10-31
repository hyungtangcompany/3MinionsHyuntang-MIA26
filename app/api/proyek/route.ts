import { NextResponse } from "next/server";
import { prisma, serializeBigInt } from "@/lib/prisma";

export async function GET() {
  try {
    const proyekList = await prisma.proyek.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        desa: true,
        rab: true,
        proposal: {
          select: { id: true },
        },
      },
    });

    return NextResponse.json({
      data: serializeBigInt(proyekList),
      error: null,
      meta: {
        total: proyekList.length,
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
        meta: null,
      },
      { status: 500 }
    );
  }
}
