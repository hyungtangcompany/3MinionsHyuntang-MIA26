import * as React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProjectDetailHeader } from "@/components/proyek/project-detail-header";
import { ProjectTimeline } from "@/components/proyek/project-timeline";
import { ProjectSummaryCards } from "@/components/proyek/project-summary-cards";
import { ProjectTabs } from "@/components/proyek/project-tabs";
import { getProyekDetail } from "@/lib/proyek-api";

interface ProyekDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProyekDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const proyek = await getProyekDetail(id);

    return {
      title: `${proyek.judul} | AKAR Transparansi Desa`,
      description: proyek.deskripsi,
    };
  } catch {
    return {
      title: "Proyek | AKAR Transparansi Desa",
      description: "Rincian sayembara pembangunan desa.",
    };
  }
}

export default async function ProyekDetailPage({
  params,
}: ProyekDetailPageProps) {
  const { id } = await params;
  const proyek = await getProyekDetail(id);

  return (
    <div className="min-h-screen bg-akar-bg text-akar-ink flex flex-col antialiased selection:bg-akar-primary selection:text-white">
      {/* Global Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-20 sm:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* 1. Header & Metadata Banner */}
          <ProjectDetailHeader proyek={proyek} />

          {/* 2. Horizontal Project Stepper Timeline */}
          <ProjectTimeline currentStatus={proyek.status} />

          {/* 3. Quick Summary Metric Cards */}
          <ProjectSummaryCards
            pagu={proyek.pagu}
            durasiMin={proyek.durasiMin}
            durasiMax={proyek.durasiMax}
            syaratLokalMin={proyek.syaratLokalMin}
            proposalCount={proyek.proposals.length}
            sumberDana={proyek.sumberDana}
          />

          {/* 4. Interactive Tabs: Description, Micro-RAB, Proposals & AI Scores */}
          <ProjectTabs proyek={proyek} />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
