'use client'

import React from 'react'
import { Code2, Database, Zap } from 'lucide-react'

interface Skill {
  name: string
  icon: string
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  description: string
  skills: Skill[]
}

const skillsData: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: <Code2 className="w-6 h-6" />,
    description: 'Building responsive interfaces',
    skills: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: 'TS' },
      { name: 'JavaScript', icon: 'JS' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'HTML5/CSS3', icon: '🌐' },
      { name: 'Vite', icon: '⚡' },
      { name: 'ShadCN UI', icon: '◆' },
    ],
  },
  {
    title: 'Backend & Database',
    icon: <Database className="w-6 h-6" />,
    description: 'Server & data technologies',
    skills: [
      { name: 'Node.js', icon: '📦' },
      { name: 'Express.js', icon: 'E' },
      { name: 'Java', icon: '☕' },
      { name: 'Prisma', icon: '◇' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'AWS', icon: '☁️' },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: <Zap className="w-6 h-6" />,
    description: 'Development & deployment',
    skills: [
      { name: 'Git/GitHub', icon: '🐙' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Vercel', icon: 'V' },
      { name: 'Linux', icon: '🐧' },
      { name: 'REST APIs', icon: '🔌' },
      { name: 'Supabase', icon: '🟢' },
      { name: 'Nginx', icon: '🔧' },
      { name: 'Ngrok', icon: 'N' },
    ],
  },
]

export function Skills() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-background overflow-y-auto">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-80 h-80 rounded-full opacity-3 border border-foreground rotate-45" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full opacity-2 border border-foreground" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 sm:mb-3 text-balance">
            Skills & Technologies
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Three pillars of modern full-stack development
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-8">
          {skillsData.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="group relative"
              style={{
                animation: `slideUpStagger 0.6s ease-out ${categoryIndex * 100}ms backwards`,
              }}
            >
              {/* Category Card */}
              <div className="h-full p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-2xl border border-border bg-card/50 hover:border-foreground hover:bg-card transition-smooth backdrop-blur-sm">
                {/* Category Header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 rounded-lg bg-muted text-foreground group-hover:bg-foreground group-hover:text-background transition-smooth flex-shrink-0">
                    {category.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold">{category.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{category.description}</p>
                  </div>
                </div>

                {/* Skills Grid (2x4) */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="group/skill"
                      style={{
                        animation: `slideUpStagger 0.6s ease-out ${300 + categoryIndex * 100 + skillIndex * 50}ms backwards`,
                      }}
                    >
                      <button className="w-full p-2 sm:p-3 lg:p-4 rounded-lg bg-muted/50 hover:bg-muted text-foreground text-xs sm:text-sm font-medium transition-smooth hover:scale-105 active:scale-95 flex flex-col items-center gap-1 sm:gap-2">
                        <span className="text-lg sm:text-xl">{skill.icon}</span>
                        <span className="text-xs sm:text-xs text-center leading-tight line-clamp-2">{skill.name}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
