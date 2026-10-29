import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1F6F43",
};

export const metadata: Metadata = {
  title: "AKAR - Platform Transparansi Dana Desa & Sayembara Swakelola Warga",
  description:
    "Dana desa yang terbuka, dikerjakan oleh warganya. Transparansi buku kas publik dan bursa kerja sayembara swakelola desa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-akar-bg text-akar-ink font-sans selection:bg-akar-accent/30 selection:text-akar-ink">
        {children}
      </body>
    </html>
  );
}
