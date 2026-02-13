"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Download, Terminal } from "lucide-react";

// --- 1. KOMPONEN TYPEWRITER ---
const ROLES = [
  "Software Engineer",
  "Fullstack Developer",
  "Informatics Student",
  "Problem Solver",
];

function TypewriterEffect() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  useEffect(() => {
    const ticker = setInterval(() => {
      const currentRole = ROLES[roleIndex];
      if (isDeleting) {
        setText((prev) => currentRole.substring(0, prev.length - 1));
        setDelta(50);
      } else {
        setText((prev) => currentRole.substring(0, prev.length + 1));
        setDelta(150);
      }
      if (!isDeleting && text === currentRole) {
        setDelta(2000);
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setDelta(500);
      }
    }, delta);
    return () => clearInterval(ticker);
  }, [text, isDeleting, roleIndex, delta]);

  return (
    // Container flex so the terminal icon sticks to the right of the text
    <span className="inline-flex items-center min-w-[260px] sm:min-w-[320px] text-left">
      {text}
      {/* Blinking Cursor */}
      <span className="animate-pulse ml-0.5 text-slate-400">|</span>
      {/* TERMINAL ICON AT THE END */}
      <Terminal className="ml-2 w-5 h-5 sm:w-6 sm:h-6 text-slate-500/70" />
    </span>
  );
}

export function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadResume = () => {
    window.open(
      "https://drive.google.com/file/d/1E4XBjIYwG3Mp1LVOzH8UUvXslmJ1j7M_/view?usp=sharing",
      "_blank",
    );
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-background overflow-hidden pt-24 pb-24">
      {/* --- BACKGROUND EFFECTS (KEPT AS REQUESTED) --- */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none">
        <div className="absolute inset-0 bg-background/90 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />

      {/* Floating Elements (Decorative) */}
      <div className="absolute top-1/4 left-10 opacity-20 animate-float hidden lg:block pointer-events-none">
        <Terminal className="w-12 h-12 text-foreground" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">
        {/* 1. Status Badge */}
        <div
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/50 backdrop-blur-md shadow-sm transition-all hover:border-foreground/50 hover:bg-muted/50 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Available for new opportunities
            </span>
          </div>
        </div>

        {/* --- 2. TITLE SECTION (ANIMATED) --- */}
        <div className="space-y-4 sm:space-y-6">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance opacity-0 animate-fade-up leading-[1.1]"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            Hi, I'm <br className="sm:hidden" />
            {/* Gradasi Silver Elegant & Shimmer Animation */}
            <span className="relative whitespace-nowrap text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.foreground),#94a3b8,theme(colors.foreground),#cbd5e1,theme(colors.foreground))] bg-[length:200%_auto] animate-gradient-text">
              Muhammad Alvin Faris
            </span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance opacity-0 animate-fade-up"
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            A passionate <br className="sm:hidden" />
            <span className="font-semibold text-slate-400 inline-flex">
              <TypewriterEffect />
            </span>
            <br className="hidden md:block" />
            crafting scalable, pixel-perfect digital experiences.
          </p>
        </div>

        {/* 3. CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full pt-2 opacity-0 animate-fade-up"
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          <button
            onClick={scrollToProjects}
            className="group relative w-full sm:w-auto px-8 py-4 bg-foreground text-background font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center justify-center gap-2">
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={handleDownloadResume}
            className="group w-full sm:w-auto px-8 py-4 border border-input bg-background/50 backdrop-blur-sm text-foreground font-semibold rounded-full hover:bg-muted transition-all hover:scale-105 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Get My Resume
            </span>
          </button>
        </div>
      </div>

      {/* --- SCROLL INDICATOR (Animated Mouse) --- */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up flex flex-col items-center gap-2 z-0 pointer-events-none"
        style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 animate-pulse">
          Scroll to explore
        </span>
        <div className="w-[24px] h-[40px] rounded-full border-2 border-muted-foreground/20 flex justify-center p-1 backdrop-blur-sm bg-background/20">
          <div className="w-1 h-1.5 bg-foreground/40 rounded-full animate-scroll-wheel" />
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-text {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        .animate-gradient-text {
          animation: gradient-text 3s linear infinite;
        }
        @keyframes scroll-wheel {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }
        .animate-scroll-wheel {
          animation: scroll-wheel 1.5s ease-out infinite;
        }
      `}</style>
    </div>
  );
}
