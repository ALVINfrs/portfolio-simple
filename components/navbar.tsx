"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";

interface SlideNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const NAV_ITEMS = [
  { label: "Home", index: 0 },
  { label: "About", index: 1 },
  { label: "Projects", index: 2 },
  { label: "Skills", index: 3 },
  { label: "Certifications", index: 4 },
  { label: "Contact", index: 5 },
];

export function SlideNavigation({
  totalSlides,
  currentSlide,
  onNavigate,
}: SlideNavigationProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tutup menu mobile saat slide berubah
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentSlide]);

  return (
    <>
      {/* --- FLOATING NAVBAR CONTAINER --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
        {/* 1. LEFT: LOGO (Pointer Events Auto) */}
        <div className="pointer-events-auto">
          <button
            onClick={() => onNavigate(0)}
            className="group flex items-center gap-2.5 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-foreground"></span>
            </div>
            <span>MAF</span>
          </button>
        </div>

        {/* 2. CENTER: DESKTOP NAVIGATION PILL (Pointer Events Auto) */}
        <div className="hidden lg:flex pointer-events-auto absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-border/40 bg-background/50 backdrop-blur-md shadow-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = currentSlide === item.index;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.index)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-background bg-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {item.label}
                  {/* Glowing active indicator is not needed because we use solid bg for active state now, cleaner look */}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. RIGHT: ACTIONS (Pointer Events Auto) */}
        <div className="pointer-events-auto flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-10 h-10 flex items-center justify-center rounded-full border border-border/40 bg-background/50 backdrop-blur-md hover:bg-foreground/10 transition-all active:scale-95"
            aria-label="Toggle theme"
          >
            {mounted && (
              <>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-orange-500" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-blue-400" />
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-border/40 bg-background/50 backdrop-blur-md hover:bg-foreground/10 transition-all active:scale-95"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-muted/50 hover:bg-foreground/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <nav className="flex flex-col gap-6 text-center w-full max-w-sm px-6">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Menu
          </span>
          {NAV_ITEMS.map((item, index) => {
            const isActive = currentSlide === item.index;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.index)}
                className={`text-3xl font-bold tracking-tight transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-10 flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-border"></div>
          <p className="text-xs text-muted-foreground font-mono">© 2024 MAF</p>
        </div>
      </div>

      {/* --- BOTTOM RIGHT: PROGRESS INDICATOR (Desktop Only) --- */}
      <div className="fixed bottom-8 right-8 z-40 hidden lg:flex flex-col items-end gap-4 pointer-events-none">
        <div className="flex flex-col gap-3 pointer-events-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.index}
              onClick={() => onNavigate(item.index)}
              className="group flex items-center gap-4 justify-end"
            >
              <span
                className={`text-xs font-medium transition-all duration-300 ${
                  currentSlide === item.index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {item.label}
              </span>
              <div
                className={`h-2 rounded-full transition-all duration-500 ease-out ${
                  currentSlide === item.index
                    ? "w-8 bg-foreground"
                    : "w-2 bg-border group-hover:bg-foreground/50"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Simple Counter */}
        <div className="mt-4 text-xs font-mono text-muted-foreground text-right border-t border-border pt-4 w-full">
          <span className="text-foreground">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="mx-1">/</span>
          <span>{String(totalSlides).padStart(2, "0")}</span>
        </div>
      </div>
    </>
  );
}
