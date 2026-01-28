'use client'

import { useEffect, useState } from 'react'

export function useScrollSnap(sectionIds: string[]) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Prevent any default scrolling behavior
    const preventScroll = (e: Event) => {
      if (e.type === 'wheel' || e.type === 'scroll') {
        window.scrollTo(0, 0)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      // Completely prevent default scrolling
      e.preventDefault()
      
      if (isTransitioning) return

      const direction = e.deltaY > 0 ? 1 : -1
      const nextSection = Math.max(
        0,
        Math.min(sectionIds.length - 1, currentSection + direction)
      )

      if (nextSection !== currentSection) {
        setCurrentSection(nextSection)
        setIsTransitioning(true)
        
        setTimeout(() => {
          setIsTransitioning(false)
        }, 700) // Match animation duration
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      let nextSection = currentSection
      let shouldNavigate = false

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        nextSection = Math.min(sectionIds.length - 1, currentSection + 1)
        shouldNavigate = true
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        nextSection = Math.max(0, currentSection - 1)
        shouldNavigate = true
      } else if (e.key === 'End') {
        e.preventDefault()
        nextSection = sectionIds.length - 1
        shouldNavigate = true
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextSection = 0
        shouldNavigate = true
      }

      if (shouldNavigate && nextSection !== currentSection) {
        setCurrentSection(nextSection)
        setIsTransitioning(true)
        
        setTimeout(() => {
          setIsTransitioning(false)
        }, 700)
      }
    }

    // Force scroll to top and prevent any scrolling
    window.scrollTo(0, 0)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', preventScroll)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', preventScroll)
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
    }
  }, [currentSection, isTransitioning, sectionIds])

  return currentSection
}
