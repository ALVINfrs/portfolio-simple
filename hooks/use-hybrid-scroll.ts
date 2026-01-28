'use client'

import { useEffect, useRef, useState } from 'react'

interface UseHybridScrollProps {
  totalSlides: number
  onSlideChange: (slideIndex: number) => void
}

export function useHybridScroll({ totalSlides, onSlideChange }: UseHybridScrollProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const slideContentRef = useRef<HTMLDivElement>(null)
  const wheelTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return

      const slideElement = slideContentRef.current
      if (!slideElement) return

      const isScrollableContent = slideElement.scrollHeight > slideElement.clientHeight
      const isAtBottom = slideElement.scrollTop + slideElement.clientHeight >= slideElement.scrollHeight - 10
      const isAtTop = slideElement.scrollTop <= 10

      const direction = e.deltaY > 0 ? 1 : -1

      // Allow natural scrolling if content is scrollable and not at boundary
      if (isScrollableContent) {
        if (direction > 0 && !isAtBottom) {
          return // Let browser handle scrolling
        }
        if (direction < 0 && !isAtTop) {
          return // Let browser handle scrolling
        }
      }

      // Prevent default and handle slide navigation
      e.preventDefault()

      const nextSlide = Math.max(0, Math.min(totalSlides - 1, currentSlide + direction))

      if (nextSlide !== currentSlide) {
        e.preventDefault()
        setCurrentSlide(nextSlide)
        onSlideChange(nextSlide)
        setIsTransitioning(true)

        // Clear any existing timeout
        if (wheelTimeoutRef.current) {
          clearTimeout(wheelTimeoutRef.current)
        }

        // Set transition timeout
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
        nextSlide = Math.min(totalSlides - 1, currentSlide + 1)
        shouldNavigate = true
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        nextSlide = Math.max(0, currentSlide - 1)
        shouldNavigate = true
      } else if (e.key === 'End') {
        e.preventDefault()
        nextSlide = totalSlides - 1
        shouldNavigate = true
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextSlide = 0
        shouldNavigate = true
      }

      if (shouldNavigate && nextSlide !== currentSlide) {
        setCurrentSlide(nextSlide)
        onSlideChange(nextSlide)
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
  }, [currentSlide, isTransitioning, totalSlides, onSlideChange])

  return { slideContentRef, currentSlide }
}
