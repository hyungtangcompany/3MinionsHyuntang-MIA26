"use client";

import * as React from "react";

const slides = [
  { id: "slide-hero", label: "Beranda" },
  { id: "slide-metrik", label: "Metrik Dampak" },
  { id: "slide-filosofi", label: "Cara Kerja" },
  { id: "slide-proyek-ide", label: "Sayembara & Ide" },
  { id: "slide-footer", label: "Data & Transparansi" },
];

export function SlideIndicator() {
  const [activeSlide, setActiveSlide] = React.useState(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = slides.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) {
              setActiveSlide(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    slides.forEach((slide) => {
      const el = document.getElementById(slide.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSlide = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Navigasi Halaman Slide"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 bg-white/70 backdrop-blur-md p-2 rounded-full border border-akar-border/70 shadow-sm"
    >
      {slides.map((slide, idx) => {
        const isActive = activeSlide === idx;
        return (
          <button
            key={slide.id}
            type="button"
            onClick={() => scrollToSlide(slide.id)}
            className="group relative flex items-center justify-center min-h-[32px] min-w-[32px] rounded-full focus:outline-none"
            aria-label={`Pindah ke slide ${slide.label}`}
          >
            {/* Tooltip on hover */}
            <span className="absolute right-9 rounded-md bg-akar-ink px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
              {slide.label}
            </span>

            {/* Indicator Dot */}
            <span
              className={`h-3 rounded-full transition-all duration-200 ${
                isActive
                  ? "w-7 bg-akar-primary shadow-xs"
                  : "w-3 bg-stone-300 group-hover:bg-stone-400"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
