"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Heart,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/ALVINfrs",
    color: "group-hover:text-[#333] dark:group-hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/alvinfrs/",
    color: "group-hover:text-[#0A66C2]",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/alvnfrs_/",
    color: "group-hover:text-[#E4405F]",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/628979945242",
    color: "group-hover:text-[#25D366]",
  },
];

export function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
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
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("alvinfaris59@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

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
        {/* Orb Glow Positioned Top-Right for Contact */}
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px]" />
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="min-h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
            {/* Header */}
            <div
              className={`mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-flex items-center justify-center gap-2 mb-6 px-3 py-1 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium tracking-wide uppercase text-foreground/80">
                  Available for work
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Let's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50">
                  Connect
                </span>
              </h2>

              <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                Have a project in mind or just want to chat? feel free to reach
                out. I'm always open to discussing new projects, creative ideas
                or opportunities to be part of your visions.
              </p>
            </div>

            {/* Main Contact Card */}
            <div
              className={`mb-12 p-8 rounded-3xl border border-border/50 bg-background/40 backdrop-blur-md shadow-2xl transition-all duration-700 delay-150 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 rounded-full bg-foreground/5 border border-foreground/10">
                  <Mail className="w-8 h-8 text-foreground" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Drop me an email
                  </p>

                  {/* Copyable Email */}
                  <div
                    className="flex items-center justify-center gap-3 group cursor-pointer"
                    onClick={handleCopyEmail}
                  >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold hover:text-foreground/80 transition-colors">
                      alvinfaris59@gmail.com
                    </h3>
                    <button
                      className="p-2 rounded-full hover:bg-muted transition-colors relative"
                      aria-label="Copy email"
                    >
                      {isCopied ? (
                        <Check className="w-5 h-5 text-green-500 animate-in zoom-in" />
                      ) : (
                        <Copy className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <a
                  href="mailto:alvinfaris59@gmail.com"
                  className="mt-2 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  Send Message <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Social Links Grid */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-4 rounded-2xl border border-border/50 bg-background/30 backdrop-blur-sm hover:bg-background/80 hover:border-foreground/20 transition-all duration-500 hover:-translate-y-1 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                    aria-label={link.name}
                  >
                    <Icon
                      className={`w-6 h-6 text-muted-foreground transition-colors duration-300 ${link.color}`}
                    />
                    <span className="sr-only">{link.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Footer */}
            <div
              className={`mt-20 pt-8 border-t border-border/30 transition-all duration-700 delay-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                Designed & Built with{" "}
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
                by Muhammad Alvin Faris
              </p>
              <p className="text-xs text-muted-foreground/50 mt-2">
                © 2024 All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
