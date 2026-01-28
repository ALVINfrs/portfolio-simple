'use client'

import React, { useEffect, useState } from 'react'
import { ExternalLink, ArrowRight } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  tags: string[]
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Caffeine – Fullstack Coffee Shop',
    description: 'Complete online coffee shop platform with table reservations, order history, e-receipts, and secure payment integration.',
    techStack: ['Next.js', 'Express.js', 'MySQL', 'TypeScript', 'Tailwind CSS'],
    tags: ['Fullstack', 'E-commerce', 'Payment'],
  },
  {
    id: 2,
    title: 'Ngestream',
    description: 'Modern streaming application with Supabase authentication, advanced search, watchlist, subscriptions, and user comments.',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    tags: ['Streaming', 'Auth', 'Database'],
  },
  {
    id: 3,
    title: 'Kardiologiku',
    description: 'Educational platform for cardiac arrhythmia with modern, responsive UI and comprehensive healthcare content.',
    techStack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'ShadCN UI'],
    tags: ['Education', 'Healthcare', 'UI/UX'],
  },
  {
    id: 4,
    title: 'Train Ticket API',
    description: 'RESTful API for railway ticket bookings with JWT authentication and comprehensive booking management.',
    techStack: ['Node.js', 'Express.js', 'MySQL', 'JWT'],
    tags: ['Backend', 'API', 'Auth'],
  },
  {
    id: 5,
    title: 'Coffee Shop Landing',
    description: 'Modern coffee shop landing page with responsive design and smooth animations.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    tags: ['Frontend', 'Landing Page'],
  },
  {
    id: 6,
    title: 'Movie Discovery App',
    description: 'React application for movie discovery with API integration and advanced search functionality.',
    techStack: ['React', 'API', 'CSS'],
    tags: ['Frontend', 'API Integration'],
  },
  {
    id: 7,
    title: 'Student Management System',
    description: 'Fullstack CRUD application for managing student data with complete administrative features.',
    techStack: ['Node.js', 'Express.js', 'MySQL'],
    tags: ['Fullstack', 'CRUD'],
  },
  {
    id: 8,
    title: 'Travel Agency Landing',
    description: 'Travel agency website with modern UI design and engaging visual elements.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    tags: ['Frontend', 'Landing'],
  },
  {
    id: 9,
    title: 'Bookshelf Manager',
    description: 'Interactive bookshelf management application with local storage and DOM manipulation.',
    techStack: ['JavaScript', 'Local Storage', 'DOM'],
    tags: ['Frontend', 'Storage'],
  },
  {
    id: 10,
    title: 'Note App',
    description: 'React-based note application with CRUD operations and persistent local storage.',
    techStack: ['React', 'JavaScript', 'Local Storage'],
    tags: ['Frontend', 'CRUD'],
  },
  {
    id: 11,
    title: 'Bookshelf API',
    description: 'RESTful API for book management system built with Hapi.js framework.',
    techStack: ['Node.js', 'Hapi.js'],
    tags: ['Backend', 'API'],
  },
]

const featuredProjects = projectsData.slice(0, 3)
const allProjects = projectsData.slice(3)

export function Projects() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const index = parseInt(element.dataset.index || '0')
            
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(index))
            }, index * 120)
          }
        })
      },
      { threshold: 0.15 }
    )

    const cards = document.querySelectorAll('[data-project-card]')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [showAll])

  const displayedProjects = showAll ? projectsData : featuredProjects

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-background overflow-y-auto">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 sm:mb-3 text-balance">Projects</h2>
          <p className="text-base sm:text-lg text-muted-foreground">Featured and latest web development projects</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              data-project-card
              data-index={project.id}
              className="h-full relative p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border border-border bg-card hover:border-foreground transition-spring overflow-hidden group cursor-pointer"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-foreground opacity-0 group-hover:opacity-5 transition-opacity" />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 group-hover:text-accent transition-smooth line-clamp-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base mb-4 sm:mb-6 flex-grow leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-muted text-foreground font-medium group-hover:bg-foreground group-hover:text-background transition-spring"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-muted text-muted-foreground font-medium">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
