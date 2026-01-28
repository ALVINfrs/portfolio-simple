'use client'

import React, { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'

interface EmailOpeningProps {
  onComplete: () => void
}

export function EmailOpening({ onComplete }: EmailOpeningProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsComplete(true)
        onComplete()
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onComplete])

  if (isComplete) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated envelope container */}
      <div className="relative w-full max-w-md mx-auto px-8">
        {/* Envelope flap */}
        <div
          className="relative w-full aspect-video bg-card border-2 border-foreground rounded-lg shadow-2xl overflow-hidden"
          style={{
            perspective: '1000px',
          }}
        >
          {/* Front flap */}
          <div
            className="absolute inset-0 bg-card border-b-2 border-foreground flex items-center justify-center origin-top"
            style={{
              transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              transition: 'transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <Mail className="w-12 h-12 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Welcome</span>
            </div>
          </div>

          {/* Content inside envelope */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-background to-muted/20 flex flex-col items-center justify-center gap-4 p-6"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 600ms ease-out 400ms',
            }}
          >
            <h2 className="text-2xl font-bold text-center">Muhammad Alvin Faris</h2>
            <p className="text-sm text-muted-foreground text-center">Fullstack Developer & Designer</p>
            <div className="flex gap-2 mt-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-foreground"
                  style={{
                    animation: `pulse 1.5s ease-in-out ${i * 200}ms infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom hint */}
        <div
          className="text-center mt-8"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 600ms ease-out 600ms',
          }}
        >
          <p className="text-xs text-muted-foreground">Entering portfolio...</p>
        </div>
      </div>
    </div>
  )
}
