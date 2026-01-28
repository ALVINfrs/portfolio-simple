"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sparkles, Code2, Brain, Rocket, Award } from "lucide-react";

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const paragraphs = [
    "I'm a passionate Fullstack Web Developer currently in my 5th semester of Informatics Engineering.",
    "With a strong foundation in both frontend and backend development, I specialize in building modern, responsive web applications using React, Next.js, Node.js, and various cloud technologies.",
    "My journey in tech has been driven by curiosity and a commitment to continuous learning, backed by multiple certifications in Frontend Development, Backend Engineering, Cloud Computing, and Artificial Intelligence.",
    "I thrive on solving complex problems and transforming ideas into functional, user-friendly applications.",
  ];

  const stats = [
    { label: "Semester", value: "5", icon: Rocket },
    { label: "Projects", value: "11+", icon: Code2 },
    { label: "Certifications", value: "11", icon: Award },
    { label: "Tech Stack", value: "20+", icon: Brain },
  ];

  return (
    // Container Utama: overflow-hidden untuk menahan background
    <div
      ref={sectionRef}
      className="relative w-full h-full bg-background overflow-hidden"
    >
      {/* --- BACKGROUND (DIAM/FIXED) --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute inset-0 bg-background/90 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        {/* Glowing Orb */}
        <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px]" />
      </div>

      {/* --- SCROLLABLE CONTENT WRAPPER --- */}
      {/* Ini yang dideteksi oleh page.tsx sebagai area scroll */}
      <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth">
        {/* Min-h-full dan Flex memastikan konten tetap di tengah jika sedikit, tapi bisa di-scroll jika banyak */}
        <div className="min-h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative z-10 max-w-5xl mx-auto w-full">
            {/* Header Section */}
            <div
              className={`mb-10 text-center transition-all duration-700 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center justify-center gap-2 mb-4 px-3 py-1 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium tracking-wide uppercase text-foreground/80">
                  Who I Am
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50">
                  Me
                </span>
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Text Cards */}
              <div className="lg:col-span-7 space-y-4">
                {paragraphs.map((paragraph, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-700 ease-out ${
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="group p-5 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm hover:bg-muted/30 hover:border-foreground/20 transition-all duration-300">
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                        {paragraph}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Stats Grid */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`transform transition-all duration-700 ease-out ${
                        isVisible
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-90"
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="h-full p-6 flex flex-col items-center justify-center text-center rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm hover:bg-foreground hover:text-background group transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-default">
                        <div className="mb-3 p-3 rounded-full bg-foreground/5 group-hover:bg-background/20 transition-colors">
                          <Icon className="w-6 h-6 text-foreground group-hover:text-background transition-colors" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-bold mb-1 tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-muted-foreground group-hover:text-background/80 uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
