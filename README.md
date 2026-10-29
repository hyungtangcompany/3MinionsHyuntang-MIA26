# AKAR: Platform Transparansi Dana Desa & Sayembara Swakelola Warga

Platform transparansi dana desa dan sayembara proyek swakelola warga berbasis web. Proyek ini dibangun untuk kompetisi **Web In Action (WIA) MIA 2026**.

## Tech Stack
- **Framework:** Next.js (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons & Charts:** Lucide React, Recharts
- **Forms & Validation:** React Hook Form + Zod
- **Database & ORM:** PostgreSQL (Supabase) + pg_trgm, Prisma ORM
- **Auth & Storage:** Supabase Auth & Supabase Storage
- **AI Integration:** OpenAI SDK via OpenRouter (Llama 3.3 70B / DeepSeek)
- **Testing:** Vitest

## Struktur Repository
Berdasarkan panduan PRD (Bagian 29.4):

```text
├── /app/                   # Halaman (route group) dan /api (route handler)
├── /components/            # Komponen UI bersama (/components/ui untuk shadcn)
├── /lib/                   # scoring.ts, similarity.ts, overlap.ts, status-machine.ts, audit.ts, exif.ts, ai/summarizer.ts, schemas/
├── /prisma/                # schema.prisma, migrations/, seed.ts
├── /docs/                  # Kontrak API, diagram, koleksi Bruno, screenshot, PRD
├── /.github/               # workflows/ci.yml, pull_request_template.md
├── AGENTS.md               # Aturan proyek untuk AI agent
├── .env.example            # Template variabel lingkungan
└── README.md               # Dokumentasi proyek
```

## Memulai Pengembangan

1. Pasang dependensi:
   ```bash
   pnpm install
   ```

2. Konfigurasi environment variables:
   Salin `.env.example` ke `.env` dan lengkapi nilai variabelnya.
   ```bash
   cp .env.example .env
   ```

3. Jalankan server pengembangan:
   ```bash
   pnpm dev
   ```

4. Menjalankan pengujian:
   ```bash
   pnpm test
   ```

