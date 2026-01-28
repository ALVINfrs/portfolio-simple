"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface SlideNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const SLIDES = [
  "Home",
  "About",
  "Projects",
  "Skills",
  "Certifications",
  "Contact",
];

export function SlideNavigation({
  totalSlides,
  currentSlide,
  onNavigate,
}: SlideNavigationProps) {
  // Hook untuk mengatur tema
  const { theme, setTheme } = useTheme();
  // State untuk memastikan komponen sudah di-render di browser
  const [mounted, setMounted] = useState(false);

  // useEffect ini jalan sekali saat komponen dipasang di browser
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Navbar Kiri Atas */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-6 sm:gap-8">
        {/* Logo MAF */}
        <button
          onClick={() => onNavigate(0)}
          className="group flex items-center gap-2 font-bold text-sm sm:text-base hover:opacity-70 transition-opacity"
        >
          <div className="w-2 h-2 rounded-full bg-foreground group-hover:scale-125 transition-transform" />
          <span className="hidden sm:inline">Alvnfrss</span>
        </button>

        {/* --- TOMBOL TOGGLE TEMA DENGAN ANIMASI --- */}
        <button
          // Logika: kalau sekarang dark, ubah ke light, dan sebaliknya
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20"
          aria-label="Toggle theme"
        >
          {/* Hanya tampilkan icon jika sudah mounted di browser agar tidak flicker */}
          {mounted && (
            <>
              {/* Icon Matahari (Untuk Light Mode) */}
              {/* LOGIKA ANIMASI:
                  - Default: rotate-0 scale-100 (Tampil normal)
                  - Saat Dark Mode (dark:): -rotate-90 scale-0 (Muter kiri 90derajat dan mengecil hilang)
                  - transition-all duration-500: Membuat perubahannya halus selama 0.5 detik
              */}
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-foreground" />

              {/* Icon Bulan (Untuk Dark Mode) */}
              {/* LOGIKA ANIMASI:
                  - Posisinya absolute agar menumpuk di tempat yang sama dengan matahari
                  - Default: rotate-90 scale-0 (Muter kanan 90derajat dan mengecil hilang)
                  - Saat Dark Mode (dark:): rotate-0 scale-100 (Muter balik ke normal dan membesar tampil)
              */}
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-foreground" />
            </>
          )}
          {/* Placeholder kosong saat loading server-side */}
          {!mounted && <div className="w-4 h-4" />}
        </button>

        {/* Separator */}
        <div className="hidden lg:block w-px h-4 bg-foreground/20" />

        {/* Navigasi Dot */}
        <nav className="hidden lg:flex items-center gap-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide}
              onClick={() => onNavigate(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-foreground w-6"
                  : "bg-foreground/30 hover:bg-foreground/60"
              }`}
              title={slide}
              aria-label={slide}
            />
          ))}
        </nav>
      </div>

      {/* Counter slide di kanan bawah */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col items-end gap-3">
          <div className="text-xs font-mono text-muted-foreground">
            <span className="text-foreground font-semibold">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <span className="text-foreground/50"> / </span>
            <span>{String(totalSlides).padStart(2, "0")}</span>
          </div>

          {/* Progress bar vertikal */}
          <div className="w-0.5 h-24 bg-muted rounded-full overflow-hidden">
            <div
              className="w-full bg-foreground transition-all duration-700 ease-out origin-top"
              style={{
                height: `${((currentSlide + 1) / totalSlides) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Indikator slide mobile */}
      <div className="fixed top-6 right-6 z-40 lg:hidden">
        <div className="text-xs font-mono text-muted-foreground text-right">
          <div className="text-foreground font-semibold">
            {String(currentSlide + 1).padStart(2, "0")}
          </div>
          <div className="text-foreground/50">
            / {String(totalSlides).padStart(2, "0")}
          </div>
        </div>
      </div>
    </>
  );
}
