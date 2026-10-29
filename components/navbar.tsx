"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShieldCheck,
  FolderKanban,
  Lightbulb,
  BookOpen,
  Database,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Proyek", href: "/proyek", icon: FolderKanban },
  { label: "Ide & Aspirasi", href: "/ide", icon: Lightbulb },
  { label: "Buku Kas", href: "/kas", icon: BookOpen },
  { label: "Data Terbuka", href: "/data", icon: Database },
];

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b border-akar-border/60 bg-white/90 backdrop-blur-md shadow-2xs transition-all",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-akar-primary/40 rounded-lg p-1"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-akar-primary text-white shadow-sm ring-1 ring-akar-primary/20">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-akar-primary">
                AKAR
              </span>
              <span className="hidden sm:inline-block rounded bg-akar-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-akar-earth uppercase tracking-wider">
                Desa Karang Sari
              </span>
            </div>
            <span className="text-[11px] font-medium text-akar-muted -mt-1 hidden xs:block">
              Transparansi &amp; Swakelola Warga
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-1 lg:space-x-2"
          aria-label="Navigasi Utama"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                  isActive
                    ? "bg-akar-primary-light text-akar-primary font-semibold"
                    : "text-akar-ink hover:text-akar-primary hover:bg-akar-primary-light/50"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Button Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/masuk">
            <Button
              variant="outline"
              className="border-akar-primary/30 text-akar-primary hover:bg-akar-primary-light font-medium"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Masuk
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <Link href="/masuk">
            <Button
              size="sm"
              variant="outline"
              className="min-h-[40px] px-3 border-akar-primary/30 text-akar-primary text-xs"
            >
              <LogIn className="mr-1.5 h-3.5 w-3.5" />
              Masuk
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-akar-border bg-white text-akar-ink hover:bg-akar-primary-light/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-akar-primary"
            aria-expanded={isOpen}
            aria-label="Buka menu navigasi"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-akar-ink" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6 text-akar-ink" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-akar-border bg-white px-4 pt-2 pb-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="py-2 mb-2 border-b border-akar-border/60">
            <div className="text-xs text-akar-muted font-medium">
              Wilayah Terpilih:
            </div>
            <div className="text-sm font-semibold text-akar-ink">
              Desa Karang Sari, Kec. Harapan
            </div>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? "bg-akar-primary-light text-akar-primary font-semibold"
                      : "text-akar-ink hover:bg-akar-primary-light/40"
                  }`}
                >
                  <Icon className="h-5 w-5 text-akar-primary" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-akar-border">
            <Link
              href="/masuk"
              onClick={() => setIsOpen(false)}
              className="block w-full"
            >
              <Button className="w-full justify-center">
                <LogIn className="mr-2 h-4 w-4" />
                Masuk ke Akun Desa
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
