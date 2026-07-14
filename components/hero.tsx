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
    <span className="inline-flex items-center text-left min-h-[1.5em]">
      <span className="text-foreground">{text}</span>
      <span className="animate-pulse ml-0.5 text-slate-400">|</span>
      <Terminal className="ml-2 w-4 h-4 sm:w-5 sm:h-5 text-slate-500/70" />
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
      "https://drive.google.com/file/d/1QjSd3W5A4N7QbdumDpjBEdN8QQpkxD6g/view?usp=sharing",
      "_blank",
    );
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-background overflow-hidden">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none">
        <div className="absolute inset-0 bg-background/90 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-foreground/5 rounded-full blur-[60px] sm:blur-[100px] animate-pulse pointer-events-none" />

      {/* ICON TERMINAL MELAYANG (DI SAMPING KIRI) */}
      {/* Muncul di layar laptop (lg:block), gerak naik turun pelan (animate-bounce) */}
      <div className="absolute top-1/3 left-12 opacity-10 animate-bounce duration-[3000ms] hidden lg:block pointer-events-none">
        <Terminal className="w-16 h-16 text-foreground" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">
        {/* Status Badge */}
        <div
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border bg-background/50 backdrop-blur-md shadow-sm transition-all hover:border-foreground/50 hover:bg-muted/50 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Available for new opportunities
            </span>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-4 sm:space-y-6 w-full">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance opacity-0 animate-fade-up leading-[1.1]"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            Hi, I'm <br className="sm:hidden" />
            <span className="relative inline-block sm:whitespace-nowrap text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.foreground),#94a3b8,theme(colors.foreground),#cbd5e1,theme(colors.foreground))] bg-[length:200%_auto] animate-gradient-text">
              Muhammad Alvin Faris
            </span>
          </h1>

          <div
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance opacity-0 animate-fade-up flex flex-col items-center justify-center gap-1 sm:block"
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            <span>A passionate</span>{" "}
            <span className="font-semibold text-slate-400 inline-flex flex-wrap justify-center sm:justify-start">
              <TypewriterEffect />
            </span>
            <span className="block sm:inline sm:ml-1">
              crafting scalable, pixel-perfect digital experiences.
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full pt-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          <button
            onClick={scrollToProjects}
            className="group relative w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-foreground text-background font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center justify-center gap-2">
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={handleDownloadResume}
            className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 border border-input bg-background/50 backdrop-blur-sm text-foreground font-semibold rounded-full hover:bg-muted transition-all hover:scale-105 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Get My Resume
            </span>
          </button>
        </div>
      </div>

      {/* --- SCROLL INDICATORS --- */}
      <div
        className="absolute bottom-12 right-8 hidden lg:flex flex-col items-center gap-4 z-20 opacity-0 animate-fade-in"
        style={{ animationDelay: "1500ms", animationFillMode: "forwards" }}
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-muted-foreground/50 to-transparent" />
        <div
          className="writing-vertical-rl text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 animate-pulse transform rotate-180"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll to explore
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex lg:hidden flex-col items-center gap-2 opacity-0 animate-fade-up z-10 pointer-events-none"
        style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 animate-pulse">
          Scroll
        </span>
        <div className="w-[20px] h-[32px] rounded-full border-2 border-muted-foreground/20 flex justify-center p-1 backdrop-blur-sm">
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
