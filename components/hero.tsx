'use client'

import React from 'react'
import { ArrowRight, ArrowDown } from 'lucide-react'

const scrollToSection = (section: string) => {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export function Hero() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-background"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-80 h-80 rounded-full opacity-5 border border-foreground animate-float" />
        <div className="absolute -bottom-20 -left-40 w-96 h-96 rounded-full opacity-3 border border-foreground" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 opacity-2 border border-foreground rotate-45" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Main Title */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight text-balance">
            Muhammad<br className="hidden sm:block" />
            Alvin Faris
          </h1>
        </div>

        {/* Subtitle with status badge */}
        <div className="space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full border border-border bg-muted/30 backdrop-blur-sm transition-smooth hover:border-foreground hover:bg-muted/50">
            <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">
              Available for opportunities
            </p>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto text-balance">
            Fullstack Web Developer & Informatics Engineering Student crafting beautiful, performant digital experiences
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8">
          <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-background font-semibold rounded-lg overflow-hidden transition-spring hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-foreground text-foreground font-semibold rounded-lg hover:bg-foreground hover:text-background transition-spring active:scale-95">
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  )
}
