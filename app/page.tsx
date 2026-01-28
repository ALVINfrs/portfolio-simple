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
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Timer Reset
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTransitioning) {
      timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 700); // Durasi harus sama dengan duration-700 di CSS
    }
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  // --- LOGIKA SCROLL PINTAR (Mouse & Touch) ---
  // (Logika ini tidak berubah dari sebelumnya, tetap mendeteksi mentok atas/bawah)
  useEffect(() => {
    const checkScrollStatus = (element: HTMLElement) => {
      const tolerance = 2;
      const { scrollTop, scrollHeight, clientHeight } = element;
      const isScrollable = scrollHeight > clientHeight;
      const isAtTop = scrollTop <= tolerance;
      const isAtBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight - tolerance;
      return { isScrollable, isAtTop, isAtBottom };
    };

    const findScrollTarget = (
      target: HTMLElement,
      container: HTMLElement,
      activeSlide: HTMLElement,
    ) => {
      let scrollTarget = activeSlide;
      let foundScrollable = false;
      let currentTarget = target;

      while (currentTarget && currentTarget !== container.parentElement) {
        const style = window.getComputedStyle(currentTarget);
        const overflowY = style.overflowY;
        const canScroll =
          currentTarget.scrollHeight > currentTarget.clientHeight;

        if ((overflowY === "auto" || overflowY === "scroll") && canScroll) {
          scrollTarget = currentTarget;
          foundScrollable = true;
          break;
        }
        if (currentTarget === activeSlide) break;
        currentTarget = currentTarget.parentElement as HTMLElement;
      }
      return { scrollTarget, foundScrollable };
    };

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || showAnimation) return;
      const container = slideContainerRef.current;
      if (!container) return;
      const slideElements = container.querySelectorAll("[data-slide-content]");
      const activeSlide = slideElements[currentSlide] as HTMLElement;
      if (!activeSlide) return;
      const { scrollTarget, foundScrollable } = findScrollTarget(
        e.target as HTMLElement,
        container,
        activeSlide,
      );
      const { isAtTop, isAtBottom } = checkScrollStatus(scrollTarget);
      const direction = e.deltaY > 0 ? 1 : -1;
      if (foundScrollable) {
        if (direction > 0 && !isAtBottom) return;
        if (direction < 0 && !isAtTop) return;
      }
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

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning || showAnimation) return;
      const container = slideContainerRef.current;
      if (!container) return;
      const slideElements = container.querySelectorAll("[data-slide-content]");
      const activeSlide = slideElements[currentSlide] as HTMLElement;
      if (!activeSlide) return;
      const currentY = e.touches[0].clientY;
      const diff = touchStartY.current - currentY;
      const direction = diff > 0 ? 1 : -1;
      const { scrollTarget, foundScrollable } = findScrollTarget(
        e.target as HTMLElement,
        container,
        activeSlide,
      );
      const { isAtTop, isAtBottom } = checkScrollStatus(scrollTarget);
      if (foundScrollable) {
        if (direction > 0 && !isAtBottom) return;
        if (direction < 0 && !isAtTop) return;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning || showAnimation) return;
      const container = slideContainerRef.current;
      if (!container) return;
      touchEndY.current = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY.current;
      const direction = diff > 0 ? 1 : -1;
      if (Math.abs(diff) < 50) return;
      const slideElements = container.querySelectorAll("[data-slide-content]");
      const activeSlide = slideElements[currentSlide] as HTMLElement;
      if (!activeSlide) return;
      const { scrollTarget, foundScrollable } = findScrollTarget(
        e.target as HTMLElement,
        container,
        activeSlide,
      );
      const { isAtTop, isAtBottom } = checkScrollStatus(scrollTarget);
      if (foundScrollable) {
        if (direction > 0 && !isAtBottom) return;
        if (direction < 0 && !isAtTop) return;
      }
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

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
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
              // PERUBAHAN 1: Gunakan transition-transform agar lebih performant
              className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
              style={{
                zIndex: currentSlide === index ? 10 : 0,
                pointerEvents: currentSlide === index ? "auto" : "none",

                // PERUBAHAN 2: LOGIKA ANIMASI HORIZONTAL (KE SAMPING)
                // - Jika slide aktif: posisi 0 (tengah)
                // - Jika slide sebelumnya (index lebih kecil): posisi -100% (kiri layar)
                // - Jika slide berikutnya (index lebih besar): posisi 100% (kanan layar)
                transform:
                  currentSlide === index
                    ? "translateX(0%)"
                    : index < currentSlide
                      ? "translateX(-100%)"
                      : "translateX(100%)",
              }}
            >
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
