'use client'

import React, { useState } from 'react'
import { Award } from 'lucide-react'

interface Certification {
  id: number
  title: string
  issuer: string
  category: 'Frontend' | 'Backend' | 'Cloud' | 'AI'
  year?: string
}

const certificationsData: Certification[] = [
  {
    id: 1,
    title: 'Backend Development with JavaScript & AWS',
    issuer: 'AWS Backend Academy, Dicoding',
    category: 'Backend',
    year: '2024',
  },
  {
    id: 2,
    title: 'React Developer Certification',
    issuer: 'ID Camp, Dicoding',
    category: 'Frontend',
    year: '2024',
  },
  {
    id: 3,
    title: 'AWS Cloud Practitioner',
    issuer: 'Dicoding',
    category: 'Cloud',
    year: '2024',
  },
  {
    id: 4,
    title: 'Alibaba Cloud Certified Developer',
    issuer: 'Alibaba Cloud',
    category: 'Cloud',
    year: '2024',
  },
  {
    id: 5,
    title: 'JavaScript Fundamentals',
    issuer: 'ID Camp, Dicoding',
    category: 'Frontend',
    year: '2023',
  },
  {
    id: 6,
    title: 'Frontend Web Development',
    issuer: 'Dicoding',
    category: 'Frontend',
    year: '2023',
  },
  {
    id: 7,
    title: 'Web Programming',
    issuer: 'ID Camp, Dicoding',
    category: 'Frontend',
    year: '2023',
  },
  {
    id: 8,
    title: 'Artificial Intelligence for Beginners',
    issuer: 'Dicoding',
    category: 'AI',
    year: '2023',
  },
  {
    id: 9,
    title: 'Java Programming',
    issuer: 'Dicoding',
    category: 'Backend',
    year: '2023',
  },
  {
    id: 10,
    title: 'Data Visualization',
    issuer: 'Dicoding',
    category: 'AI',
    year: '2023',
  },
  {
    id: 11,
    title: 'Data Science Fundamentals',
    issuer: 'Dicoding',
    category: 'AI',
    year: '2023',
  },
]

const categoryColors: Record<string, string> = {
  Frontend: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  Backend: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  Cloud: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  AI: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
}

export function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = selectedCategory
    ? certificationsData.filter((cert) => cert.category === selectedCategory)
    : certificationsData

  const categories = Array.from(new Set(certificationsData.map((c) => c.category)))

  return (
    <div className="relative w-full h-full flex flex-col px-4 sm:px-6 lg:px-8 py-12 bg-background overflow-y-auto">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full opacity-3 border border-foreground rotate-45" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full opacity-2 border border-foreground" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <Award className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">Certifications</h2>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            All {certificationsData.length} professional certifications
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-smooth whitespace-nowrap flex-shrink-0 ${
              selectedCategory === null
                ? 'bg-foreground text-background'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            All ({certificationsData.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-smooth whitespace-nowrap flex-shrink-0 ${
                selectedCategory === category
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {category} ({certificationsData.filter((c) => c.category === category).length})
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 pb-8">
          {filtered.map((cert, index) => (
            <div
              key={cert.id}
              className="group"
              style={{
                animation: `slideUpStagger 0.6s ease-out ${index * 70}ms backwards`,
              }}
            >
              <div className="h-full p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border border-border bg-card/50 hover:border-foreground hover:bg-card transition-smooth backdrop-blur-sm">
                {/* Category Badge */}
                <div className={`inline-block mb-3 sm:mb-4 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[cert.category]}`}>
                  {cert.category}
                </div>

                {/* Content */}
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 leading-snug line-clamp-3 sm:line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">{cert.issuer}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border/50">
                  {cert.year && <span className="text-xs text-muted-foreground">{cert.year}</span>}
                  <Award className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-muted-foreground group-hover:text-foreground transition-smooth flex-shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50 flex-shrink-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold">{certificationsData.length}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Total</div>
            </div>
            {categories.map((category) => (
              <div key={category} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">
                  {certificationsData.filter((c) => c.category === category).length}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
