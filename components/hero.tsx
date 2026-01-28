"use client";

import React from "react";
import { ArrowRight, Download, Terminal } from "lucide-react";

export function Hero() {
  // Fungsi untuk scroll ke section projects
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fungsi placeholder untuk download resume
  const handleDownloadResume = () => {
    // Pastikan kamu punya file resume.pdf di folder public
    window.open("/resume.pdf", "_blank");
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-background overflow-hidden">
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute inset-0 bg-background/90 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] animate-pulse" />

      {/* Floating Elements (Decorative) */}
      <div className="absolute top-1/4 left-10 opacity-20 animate-float hidden lg:block">
        <Terminal className="w-12 h-12 text-foreground" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* 1. Status Badge (Animated Entrance) */}
        <div
          className="flex justify-center mb-8 opacity-0 animate-fade-up"
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

        {/* 2. Main Title (Staggered Animation) */}
        <div className="space-y-4 mb-8">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-balance opacity-0 animate-fade-up"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            Hi, I'm <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50">
              Muhammad Alvin Faris
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance opacity-0 animate-fade-up"
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            A{" "}
            <span className="font-semibold text-foreground">
              Fullstack Web Developer
            </span>{" "}
            & Informatics Student crafting pixel-perfect, performant digital
            experiences.
          </p>
        </div>

        {/* 3. CTA Buttons (Final Animation) */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-up"
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          {/* Primary Button: Explore */}
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

          {/* Secondary Button: Resume */}
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

      {/* Scroll Indicator (Optional) */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-0 animate-fade-in"
        style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
      </div>
    </div>
  );
}
