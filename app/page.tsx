"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { EmailOpening } from "@/components/email-opening";
import { SlideNavigation } from "@/components/slide-navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";

const SLIDES = [
  { id: "hero", label: "Home", component: Hero },
  { id: "about", label: "About", component: About },
  { id: "projects", label: "Projects", component: Projects },
  { id: "skills", label: "Skills", component: Skills },
  { id: "certifications", label: "Certifications", component: Certifications },
  { id: "contact", label: "Contact", component: Contact },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. TIMER RESET (PENTING: Agar tidak terkunci selamanya)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTransitioning) {
      timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  // 2. LOGIKA SCROLL PINTAR (SMART SCROLL DETECTION)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Blokir jika sedang transisi
      if (isTransitioning || showAnimation) return;

      const container = slideContainerRef.current;
      if (!container) return;

      // Ambil slide wrapper yang sedang aktif
      const slideElements = container.querySelectorAll("[data-slide-content]");
      const activeSlide = slideElements[currentSlide] as HTMLElement;

      if (!activeSlide) return;

      // --- DETEKSI SCROLL CONTAINER YANG SEBENARNYA ---
      // Kita cari elemen mana yang kena scroll (bisa jadi komponen anak seperti About, atau wrapper itu sendiri)
      let scrollTarget = activeSlide;
      let target = e.target as HTMLElement;
      let foundScrollable = false;

      // Loop dari elemen yang di-hover mouse naik ke atas sampai ketemu container yang bisa di-scroll
      while (target && target !== container.parentElement) {
        // Cek apakah elemen ini punya overflow dan kontennya panjang
        const style = window.getComputedStyle(target);
        const overflowY = style.overflowY;
        const isOverflow = overflowY === "auto" || overflowY === "scroll";
        const canScroll = target.scrollHeight > target.clientHeight;

        if (isOverflow && canScroll) {
          scrollTarget = target;
          foundScrollable = true;
          break;
        }

        // Jangan mencari keluar dari slide aktif
        if (target === activeSlide) break;
        target = target.parentElement as HTMLElement;
      }

      // --- LOGIKA NAVIGASI ---
      const direction = e.deltaY > 0 ? 1 : -1; // 1 = turun, -1 = naik

      if (foundScrollable) {
        // Toleransi kecil untuk mengatasi masalah sub-pixel rendering di browser
        const tolerance = 2;
        const { scrollTop, scrollHeight, clientHeight } = scrollTarget;

        const isAtTop = scrollTop <= tolerance;
        const isAtBottom =
          Math.ceil(scrollTop + clientHeight) >= scrollHeight - tolerance;

        // JIKA konten masih bisa di-scroll ke arah yang diinginkan user -> BIARKAN BROWSER SCROLL
        if (direction > 0 && !isAtBottom) return;
        if (direction < 0 && !isAtTop) return;
      }

      // Jika tidak ada yang bisa di-scroll, ATAU sudah mentok -> PINDAH SLIDE
      e.preventDefault();

      const nextSlide = Math.max(
        0,
        Math.min(SLIDES.length - 1, currentSlide + direction),
      );

      if (nextSlide !== currentSlide) {
        setIsTransitioning(true);
        setCurrentSlide(nextSlide);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning || showAnimation) return;

      let nextSlide = currentSlide;
      let shouldNavigate = false;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        nextSlide = Math.min(SLIDES.length - 1, currentSlide + 1);
        shouldNavigate = true;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        nextSlide = Math.max(0, currentSlide - 1);
        shouldNavigate = true;
      } else if (e.key === "End") {
        e.preventDefault();
        nextSlide = SLIDES.length - 1;
        shouldNavigate = true;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextSlide = 0;
        shouldNavigate = true;
      }

      if (shouldNavigate && nextSlide !== currentSlide) {
        setIsTransitioning(true);
        setCurrentSlide(nextSlide);
      }
    };

    // Pasang listener dengan { passive: false } agar bisa preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide, isTransitioning, showAnimation]);

  const handleNavigate = useCallback(
    (index: number) => {
      if (!isTransitioning && currentSlide !== index) {
        setIsTransitioning(true);
        setCurrentSlide(index);
      }
    },
    [currentSlide, isTransitioning],
  );

  const handleAnimationComplete = useCallback(() => {
    setShowAnimation(false);
  }, []);

  if (!mounted) return null;

  return (
    <main className="w-full h-screen bg-background text-foreground overflow-hidden flex flex-col relative">
      {showAnimation && <EmailOpening onComplete={handleAnimationComplete} />}

      <SlideNavigation
        totalSlides={SLIDES.length}
        currentSlide={currentSlide}
        onNavigate={handleNavigate}
      />

      <div
        ref={slideContainerRef}
        className="relative w-full h-full overflow-hidden"
      >
        {SLIDES.map((slide, index) => {
          const Component = slide.component;
          return (
            <section
              key={slide.id}
              id={slide.id}
              className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out"
              style={{
                opacity: currentSlide === index ? 1 : 0,
                pointerEvents: currentSlide === index ? "auto" : "none",
                zIndex: currentSlide === index ? 10 : 0,
                transform: currentSlide === index ? "scale(1)" : "scale(0.95)",
              }}
            >
              {/* HAPUS overflow-y-auto dari sini agar tidak double scrollbar 
                 jika komponen anak sudah punya scrollbar.
                 Tetapi kita tetap kasih 'data-slide-content' sebagai marker.
              */}
              <div data-slide-content className="w-full h-full">
                <Component />
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
