"use client";

import React, { useEffect, useState, useRef } from "react";
import { Cpu, Globe, Database, Server, Wrench, Code2, Zap } from "lucide-react";

// --- DATA SKILLS ---
// Saya hapus duplikat JS/TS yang ada di bagian backend agar lebih rapi
const ALL_SKILLS = [
  // Frontend
  { name: "JavaScript", category: "frontend", slug: "javascript", level: 95 },
  { name: "TypeScript", category: "frontend", slug: "typescript", level: 80 },
  { name: "React", category: "frontend", slug: "react", level: 90 },
  { name: "Next.js", category: "frontend", slug: "nextdotjs", level: 85 },
  { name: "HTML5", category: "frontend", slug: "html5", level: 95 },
  { name: "CSS3", category: "frontend", slug: "css3", level: 90 },
  {
    name: "Tailwind CSS",
    category: "frontend",
    slug: "tailwindcss",
    level: 88,
  },

  // Backend
  { name: "Node.js", category: "backend", slug: "nodedotjs", level: 85 },
  { name: "Express", category: "backend", slug: "express", level: 80 },
  { name: "Java", category: "backend", slug: "java", level: 75 },
  { name: "Prisma", category: "backend", slug: "prisma", level: 70 },
  { name: "Nginx", category: "backend", slug: "nginx", level: 60 },
  { name: "Supabase", category: "backend", slug: "supabase", level: 72 },
  { name: "Ngrok", category: "backend", slug: "ngrok", level: 72 },

  // Database
  { name: "PostgreSQL", category: "database", slug: "postgresql", level: 75 },
  { name: "Firebase", category: "database", slug: "firebase", level: 70 },
  { name: "MySQL", category: "database", slug: "mysql", level: 78 },
  { name: "MongoDB", category: "database", slug: "mongodb", level: 78 },

  // Tools & DevOps
  { name: "Docker", category: "tools", slug: "docker", level: 70 },
  { name: "Git", category: "tools", slug: "git", level: 85 },
  { name: "GitHub", category: "tools", slug: "github", level: 85 },
  { name: "AWS", category: "tools", slug: "amazonaws", level: 65 },
  { name: "Vercel", category: "tools", slug: "vercel", level: 80 },
];

const CATEGORIES = [
  { id: "all", label: "All Stack", icon: Code2 },
  { id: "frontend", label: "Frontend", icon: Globe },
  { id: "backend", label: "Backend", icon: Server },
  { id: "database", label: "Database", icon: Database },
  { id: "tools", label: "Tools", icon: Wrench },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredSkills =
    activeCategory === "all"
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === activeCategory);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-full bg-background overflow-hidden"
    >
      {/* --- BACKGROUND (Fixed) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute inset-0 bg-background/90 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px]" />
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="min-h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative z-10 max-w-5xl mx-auto w-full">
            {/* Header */}
            <div
              className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-flex items-center justify-center gap-2 mb-4 px-3 py-1 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm">
                <Cpu className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium tracking-wide uppercase text-foreground/80">
                  Expertise
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Tech{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50">
                  Stack
                </span>
              </h2>

              {/* Minimalist Tabs */}
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-foreground text-background shadow-lg scale-105"
                          : "bg-background/50 border border-border/50 text-muted-foreground hover:border-foreground/30 hover:bg-muted"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${isActive ? "text-background" : "text-muted-foreground group-hover:text-foreground"}`}
                      />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredSkills.map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className={`group relative flex items-center gap-3 p-4 rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm hover:border-foreground/20 hover:bg-muted/40 transition-all duration-300 hover:-translate-y-1 cursor-default ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {/* Icon Container */}
                  <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-background border border-border/50 group-hover:border-foreground/20 transition-colors">
                    <img
                      src={`https://cdn.simpleicons.org/${skill.slug.toLowerCase()}`}
                      alt={skill.name}
                      className="w-5 h-5 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 dark:invert dark:group-hover:invert-0"
                      onError={(e) => {
                        // Fallback icon jika slug tidak ditemukan
                        (e.target as HTMLElement).style.display = "none";
                        (e.target as HTMLElement).parentElement!.innerHTML =
                          '<svg class="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
                      }}
                    />
                  </div>

                  {/* Skill Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-sm truncate group-hover:text-foreground transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Minimalist Progress Line */}
                    <div className="h-1 w-full bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-foreground/70 rounded-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Padding Bawah */}
            <div className="h-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
