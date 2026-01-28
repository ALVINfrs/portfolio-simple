'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EmailOpening } from '@/components/email-opening'
import { SlideNavigation } from '@/components/slide-navigation'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Certifications } from '@/components/certifications'
import { Contact } from '@/components/contact'

const SLIDES = [
  { id: 'hero', label: 'Home', component: Hero },
  { id: 'about', label: 'About', component: About },
  { id: 'projects', label: 'Projects', component: Projects },
  { id: 'skills', label: 'Skills', component: Skills },
  { id: 'certifications', label: 'Certifications', component: Certifications },
  { id: 'contact', label: 'Contact', component: Contact },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [showAnimation, setShowAnimation] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const slideContainerRef = useRef<HTMLDivElement>(null)
  const wheelTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return

      const container = slideContainerRef.current
      if (!container) return

      // Check if current slide content is scrollable
      const scrollableElement = container.querySelector('[data-slide-content]') as HTMLElement
      if (!scrollableElement) return

      const isScrollable = scrollableElement.scrollHeight > scrollableElement.clientHeight
      const isAtBottom = scrollableElement.scrollTop + scrollableElement.clientHeight >= scrollableElement.scrollHeight - 10
      const isAtTop = scrollableElement.scrollTop <= 10

      const direction = e.deltaY > 0 ? 1 : -1

      // Allow natural scrolling if content is scrollable and not at boundary
      if (isScrollable) {
        if (direction > 0 && !isAtBottom) {
          return // Let browser handle scrolling
        }
        if (direction < 0 && !isAtTop) {
          return // Let browser handle scrolling
        }
      }

      // Prevent default and handle slide navigation
      e.preventDefault()

      const nextSlide = Math.max(0, Math.min(SLIDES.length - 1, currentSlide + direction))

      if (nextSlide !== currentSlide) {
        setCurrentSlide(nextSlide)
        setIsTransitioning(true)

        if (wheelTimeoutRef.current) {
          clearTimeout(wheelTimeoutRef.current)
        }

        wheelTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false)
        }, 700)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      let nextSlide = currentSlide
      let shouldNavigate = false

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        nextSlide = Math.min(SLIDES.length - 1, currentSlide + 1)
        shouldNavigate = true
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        nextSlide = Math.max(0, currentSlide - 1)
        shouldNavigate = true
      } else if (e.key === 'End') {
        e.preventDefault()
        nextSlide = SLIDES.length - 1
        shouldNavigate = true
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextSlide = 0
        shouldNavigate = true
      }

      if (shouldNavigate && nextSlide !== currentSlide) {
        setCurrentSlide(nextSlide)
        setIsTransitioning(true)

        if (wheelTimeoutRef.current) {
          clearTimeout(wheelTimeoutRef.current)
        }

        wheelTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false)
        }, 700)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
    }
  }, [currentSlide, isTransitioning])

  const handleNavigate = useCallback((index: number) => {
    if (!isTransitioning && currentSlide !== index) {
      setCurrentSlide(index)
      setIsTransitioning(true)
    }
  }, [currentSlide, isTransitioning])

  const handleAnimationComplete = useCallback(() => {
    setShowAnimation(false)
  }, [])

  if (!mounted) return null

  return (
    <main className="w-full h-screen bg-background text-foreground overflow-hidden flex flex-col relative">
      {showAnimation && <EmailOpening onComplete={handleAnimationComplete} />}

      <SlideNavigation
        totalSlides={SLIDES.length}
        currentSlide={currentSlide}
        onNavigate={handleNavigate}
      />

      {/* Slides Container - Full screen with proper positioning */}
      <div ref={slideContainerRef} className="relative w-full h-full overflow-hidden">
        {SLIDES.map((slide, index) => {
          const Component = slide.component
          return (
            <section
              key={slide.id}
              id={slide.id}
              className="absolute inset-0 w-full h-full transition-all duration-700 ease-out"
              style={{
                opacity: currentSlide === index ? 1 : 0,
                pointerEvents: currentSlide === index ? 'auto' : 'none',
                transform: currentSlide === index ? 'scale(1)' : 'scale(0.95)',
              }}
            >
              <div
                data-slide-content
                className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth"
              >
                <Component />
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
