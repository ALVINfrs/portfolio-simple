'use client'

import React, { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

export function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    const section = document.getElementById('about')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const paragraphs = [
    "I'm a passionate Fullstack Web Developer currently in my 5th semester of Informatics Engineering.",
    "With a strong foundation in both frontend and backend development, I specialize in building modern, responsive web applications using React, Next.js, Node.js, and various cloud technologies.",
    "My journey in tech has been driven by curiosity and a commitment to continuous learning, backed by multiple certifications in Frontend Development, Backend Engineering, Cloud Computing, and Artificial Intelligence.",
    "I thrive on solving complex problems and transforming ideas into functional, user-friendly applications. When I'm not coding, I'm exploring new technologies and contributing to innovative projects."
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-background overflow-y-auto">
      {/* Background elements with animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-20 w-80 h-80 rounded-full opacity-4 border border-foreground animate-float" />
        <div className="absolute bottom-1/4 left-10 w-72 h-72 opacity-3 border border-foreground rotate-45" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full pb-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-foreground flex-shrink-0" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">About Me</h2>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Get to know my background and passion</p>
        </div>

        {/* Content paragraphs with stagger animation */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              className={`transition-all duration-700 transform ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="group relative p-4 sm:p-5 lg:p-6 rounded-lg border border-border bg-card hover:border-foreground transition-spring backdrop-blur-sm">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-smooth">
                  {paragraph}
                </p>
                <div className="absolute left-0 top-0 h-full w-0.5 sm:w-1 bg-foreground rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className={`mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            { label: 'Semester', value: '5' },
            { label: 'Projects', value: '11+' },
            { label: 'Certifications', value: '11' },
            { label: 'Tech Stack', value: '20+' },
          ].map((stat, index) => (
            <div key={index} className="p-3 sm:p-4 lg:p-5 rounded-lg border border-border bg-card text-center hover:border-foreground transition-spring">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-0.5 sm:mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
