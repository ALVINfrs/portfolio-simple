'use client'

import React from 'react'

interface ScrollDotsProps {
  sections: Array<{ id: string; label: string }>
  currentSection: number
  onDotClick: (index: number) => void
}

export function ScrollDots({ sections, currentSection, onDotClick }: ScrollDotsProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
      {/* Title */}
      <div className="text-center mb-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Navigate</p>
      </div>

      {/* Dots */}
      <div className="flex flex-col gap-5">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onDotClick(index)}
            className="group relative flex items-center justify-end gap-4 transition-all duration-300"
            aria-label={`Go to ${section.label}`}
          >
            {/* Label - appears on hover */}
            <span className="text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2 whitespace-nowrap">
              {section.label}
            </span>

            {/* Dot with active state */}
            <div className="relative flex items-center justify-center">
              {currentSection === index && (
                <div className="absolute w-5 h-5 rounded-full border-2 border-foreground/50 animate-pulse" />
              )}
              <div
                className={`transition-all duration-300 rounded-full cursor-pointer backdrop-blur-sm ${
                  currentSection === index
                    ? 'w-3 h-3 bg-foreground shadow-lg shadow-foreground/20'
                    : 'w-2 h-2 bg-border hover:bg-muted-foreground hover:scale-125'
                }`}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="mt-4 w-0.5 h-12 bg-gradient-to-b from-foreground/50 to-foreground/10 rounded-full mx-auto" />
    </div>
  )
}
