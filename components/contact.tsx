'use client'

import React, { useEffect, useState } from 'react'
import { Mail, Github, Linkedin, Instagram, MessageCircle, Heart, ArrowRight } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/ALVINfrs',
    color: 'group-hover:text-[#333]',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/alvinfrs/',
    color: 'group-hover:text-[#0A66C2]',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/alvnfrs_/',
    color: 'group-hover:text-[#E4405F]',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:alvinfaris59@gmail.com',
    color: 'group-hover:text-red-500',
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: 'https://wa.me/628979945242',
    color: 'group-hover:text-[#25D366]',
  },
]

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleLinks, setVisibleLinks] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            
            // Stagger icon animations
            socialLinks.forEach((_, index) => {
              setTimeout(() => {
                setVisibleLinks((prev) => new Set(prev).add(index))
              }, 300 + index * 100)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('contact')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-background overflow-y-auto">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full opacity-4 border border-foreground animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full opacity-3 border border-foreground rotate-45" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full text-center space-y-8 sm:space-y-10 lg:space-y-12 pb-8">
        {/* Header */}
        <div
          className={`transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">Let's Create Something Great</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
              Interested in new projects and opportunities. Let's connect and build something amazing.
            </p>
          </div>
        </div>

        {/* Email CTA */}
        <div
          className={`transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <a
            href="mailto:alvinfaris59@gmail.com"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg border border-foreground bg-foreground text-background font-semibold hover:scale-105 transition-spring active:scale-95 text-sm sm:text-base"
          >
            <Mail className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
            <span className="truncate sm:truncate lg:truncate">alvinfaris59@gmail.com</span>
            <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" />
          </a>
        </div>

        {/* Social Links */}
        <div
          className={`transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          <div className="space-y-4 sm:space-y-6">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Connect on Social
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative transition-all duration-700 transform ${
                      visibleLinks.has(index)
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-0'
                    }`}
                    aria-label={link.name}
                    title={link.name}
                  >
                    <div className="p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border border-border bg-card hover:border-foreground transition-spring">
                      <Icon className={`w-5 sm:w-6 h-5 sm:h-6 text-foreground transition-all duration-300 ${link.color}`} />
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`pt-6 sm:pt-8 lg:pt-12 border-t border-border transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-muted-foreground text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2">
            <span>Made with</span>
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-red-500 text-red-500 flex-shrink-0" />
            <span>© 2024 Muhammad Alvin Faris</span>
          </p>
        </div>
      </div>
    </div>
  )
}
