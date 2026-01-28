'use client'

import React from 'react'

interface SlideNavigationProps {
  totalSlides: number
  currentSlide: number
  onNavigate: (index: number) => void
}

const SLIDES = ['Home', 'About', 'Projects', 'Skills', 'Certifications', 'Contact']

export function SlideNavigation({ totalSlides, currentSlide, onNavigate }: SlideNavigationProps) {
  return (
    <>
      {/* Floating minimal navbar - top left */}
      <div className="fixed top-6 left-6 z-40 flex items-center gap-8">
        {/* Logo */}
        <button
          onClick={() => onNavigate(0)}
          className="group flex items-center gap-2 font-bold text-sm sm:text-base hover:opacity-70 transition-opacity"
        >
          <div className="w-2 h-2 rounded-full bg-foreground group-hover:scale-125 transition-transform" />
          <span className="hidden sm:inline">MAF</span>
        </button>

        {/* Mini nav dots - hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide}
              onClick={() => onNavigate(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-foreground w-6'
                  : 'bg-foreground/30 hover:bg-foreground/60'
              }`}
              title={slide}
              aria-label={slide}
            />
          ))}
        </nav>
      </div>

      {/* Floating slide counter - bottom right */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col items-end gap-3">
          <div className="text-xs font-mono text-muted-foreground">
            <span className="text-foreground font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="text-foreground/50"> / </span>
            <span>{String(totalSlides).padStart(2, '0')}</span>
          </div>

          {/* Vertical progress bar */}
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

      {/* Mobile slide indicator - top right */}
      <div className="fixed top-6 right-6 z-40 lg:hidden">
        <div className="text-xs font-mono text-muted-foreground text-right">
          <div className="text-foreground font-semibold">{String(currentSlide + 1).padStart(2, '0')}</div>
          <div className="text-foreground/50">/ {String(totalSlides).padStart(2, '0')}</div>
        </div>
      </div>
    </>
  )
}
