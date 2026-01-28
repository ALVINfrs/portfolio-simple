"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  ExternalLink,
  Github,
  Code2,
  Sparkles,
  Layers,
  Layout,
  Database,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

// --- DATA PROJECT ---
const PROJECTS_DATA = [
  {
    id: 9,
    title: "Caffeine Coffee Shop",
    description:
      "Fullstack online coffee shop with user panel, reservations, order history, e-receipts, and Midtrans payment gateway.",
    image: "/Images/projects/Project9.png",
    link: "https://caffeine-fullstack-fix.vercel.app/",
    github: "https://github.com/ALVINfrs/caffeine-fullstack-fix",
    tags: ["fullstack", "nextjs", "express", "mysql"],
    tech: ["Next.js", "Express.js", "MySQL", "Midtrans", "Tailwind"],
    category: "fullstack",
    featured: true,
  },
  {
    id: 10,
    title: "Ngestream",
    description:
      "Netflix clone with Supabase auth, trending section, search, subscriptions, watchlist, and comment system.",
    image: "/Images/projects/Ngestream.png",
    link: "https://Ngestream.vercel.app/",
    github: "https://github.com/ALVINfrs/Ngestream",
    tags: ["fullstack", "nextjs", "supabase", "typescript"],
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "ShadCN"],
    category: "fullstack",
    featured: true,
  },
  {
    id: 11,
    title: "Kardiologiku",
    description:
      "Educational website for arrhythmia with symptom monitoring and doctor consultations using React & Vite.",
    image: "/Images/projects/Project10.png",
    link: "https://kardiologiku.vercel.app",
    github: "https://github.com/ALVINfrs/Kardiologiku-Landing-Page",
    tags: ["frontend", "react", "vite", "typescript"],
    tech: ["React", "Vite", "TypeScript", "Shadcn UI", "Tailwind"],
    category: "frontend",
    featured: true,
  },
  {
    id: 1,
    title: "Coffee Shop Landing",
    description: "Modern coffee shop landing page with smooth animations.",
    image: "/Images/projects/Project1.png",
    link: "https://kedaikopialvnfrs.vercel.app/",
    github: "https://github.com/ALVINfrs",
    tags: ["frontend", "html", "css"],
    tech: ["HTML5", "CSS3", "JS"],
    category: "frontend",
  },
  {
    id: 2,
    title: "Movie Discovery",
    description: "React-based movie discovery app with API integration.",
    image: "/Images/projects/Project2.png",
    link: "https://alvnfrsfilmss.vercel.app/",
    github: "https://github.com/ALVINfrs",
    tags: ["frontend", "react", "api"],
    tech: ["React", "API", "CSS"],
    category: "frontend",
  },
  {
    id: 3,
    title: "Student Management",
    description: "CRUD app for student data management with MySQL.",
    image: "/Images/projects/Project3.png",
    link: "",
    github: "https://github.com/ALVINfrs/db_nodejs",
    tags: ["fullstack", "express", "mysql"],
    tech: ["Express", "MySQL", "Node"],
    category: "fullstack",
  },
  {
    id: 4,
    title: "Travel Agency",
    description: "Beautiful travel agency website with modern UI.",
    image: "/Images/projects/Project4.png",
    link: "https://alvnfrsttravel-and-tour.vercel.app/",
    github: "https://github.com/ALVINfrs",
    tags: ["frontend", "html", "css"],
    tech: ["HTML5", "CSS3", "JS"],
    category: "frontend",
  },
  {
    id: 5,
    title: "Bookshelf Manager",
    description: "Interactive bookshelf app with local storage.",
    image: "/Images/projects/Project5.png",
    link: "https://bookshelf-alvnfrss.vercel.app/",
    github: "https://github.com/ALVINfrs/Bookshelf-App-DOM-manipulation",
    tags: ["frontend", "javascript"],
    tech: ["JS", "LocalStorage", "DOM"],
    category: "frontend",
  },
  {
    id: 6,
    title: "Train Ticket API",
    description: "RESTful API for train ticket booking with JWT auth.",
    image: "/Images/projects/Project8.png",
    link: "",
    github: "https://github.com/ALVINfrs/api_tiketKereta",
    tags: ["backend", "express", "mysql"],
    tech: ["Express", "MySQL", "JWT"],
    category: "backend",
  },
  {
    id: 7,
    title: "Note App",
    description: "React-based note-taking app with CRUD functionality.",
    image: "/Images/projects/Project6.png",
    link: "https://my-note-app-tan.vercel.app/",
    github: "https://github.com/ALVINfrs/My-note-app",
    tags: ["frontend", "react"],
    tech: ["React", "LocalStorage"],
    category: "frontend",
  },
  {
    id: 8,
    title: "Bookshelf API",
    description: "RESTful API for book management built with Hapi.js.",
    image: "/Images/projects/Project7.png",
    link: "",
    github: "https://github.com/ALVINfrs/Bookshelf-API",
    tags: ["backend", "hapi"],
    tech: ["Hapi.js", "Node.js"],
    category: "backend",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "fullstack", label: "Fullstack", icon: Database },
  { id: "frontend", label: "Frontend", icon: Layout },
  { id: "backend", label: "Backend", icon: Code2 },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false); // State untuk toggle View All
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

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

  // Auto scroll ke bagian grid saat "View All" diklik
  useEffect(() => {
    if (showAll && projectsGridRef.current) {
      setTimeout(() => {
        projectsGridRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [showAll]);

  // Pisahkan Featured dan Regular
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);

  // Filter Regular Projects berdasarkan Kategori
  const regularProjects = PROJECTS_DATA.filter((p) => !p.featured).filter(
    (p) => {
      if (activeCategory === "all") return true;
      return p.category === activeCategory;
    },
  );

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
        <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px]" />
      </div>

      {/* --- SCROLLABLE CONTENT WRAPPER --- */}
      <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="min-h-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div
              className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-flex items-center justify-center gap-2 mb-4 px-3 py-1 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm">
                <Code2 className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium tracking-wide uppercase text-foreground/80">
                  My Portfolio
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2">
                Featured{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50">
                  Projects
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A selection of my best work in Fullstack and Frontend
                development.
              </p>
            </div>

            {/* --- FEATURED SECTION (Always Visible) --- */}
            <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group relative h-full rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm overflow-hidden hover:border-foreground/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Image Area */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/30">
                      <span className="text-sm">Image Preview</span>
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-foreground text-background shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-foreground/80 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 4).map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-md bg-muted/50 text-foreground/70 border border-border/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-auto">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- VIEW ALL BUTTON --- */}
            <div className="text-center mb-12">
              {!showAll ? (
                <button
                  onClick={() => setShowAll(true)}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-background border border-foreground/20 hover:border-foreground hover:bg-muted/50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <span className="font-medium">View All Projects</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">
                    Archive
                  </span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
                </div>
              )}
            </div>

            {/* --- HIDDEN SECTION: ALL PROJECTS & FILTER --- */}
            {showAll && (
              <div
                ref={projectsGridRef}
                className="animate-in fade-in slide-in-from-bottom-10 duration-700"
              >
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                          isActive
                            ? "bg-foreground text-background border-foreground shadow-lg scale-105"
                            : "bg-background/50 text-muted-foreground border-border/50 hover:border-foreground/50 hover:bg-muted"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {regularProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="group relative rounded-xl border border-border/40 bg-background/30 backdrop-blur-sm overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1 flex flex-col animate-in fade-in zoom-in-95"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Compact Image */}
                      <div className="relative h-40 overflow-hidden bg-muted/50">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                          <Code2 className="w-8 h-8 opacity-20" />
                        </div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-base line-clamp-1 group-hover:text-foreground/80 transition-colors">
                            {project.title}
                          </h4>
                        </div>

                        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-grow">
                          {project.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/30">
                          <div className="flex gap-1.5">
                            {project.tech.slice(0, 2).map((t, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground"
                              >
                                {t}
                              </span>
                            ))}
                            {project.tech.length > 2 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">
                                +{project.tech.length - 2}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <a
                              href={project.github}
                              target="_blank"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show Less Button */}
                <div className="text-center mt-12 mb-8">
                  <button
                    onClick={() => {
                      setShowAll(false);
                      // Optional: Scroll back up if needed
                      sectionRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronUp className="w-4 h-4" /> Show Less
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Padding */}
            <div className="h-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
