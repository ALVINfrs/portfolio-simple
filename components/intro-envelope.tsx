"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, Check, Cpu, ShieldCheck, Lock } from "lucide-react";

// --- UTILS: Text Scrambler ---
const CHARS = "ABCDEF0123456789_#[]<>";
const useScramble = (text: string, trigger: boolean) => {
  const [display, setDisplay] = useState(
    text
      .split("")
      .map(() => "_")
      .join(""),
  );

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 40);
    return () => clearInterval(interval);
  }, [text, trigger]);

  return display;
};

// --- SUB-COMPONENT: OH-MY-POSH PROMPT ---
interface PromptProps {
  path?: string;
  color?: "cyan" | "red" | "green";
}

const Prompt = ({ path = "~", color = "cyan" }: PromptProps) => {
  const bgColorClass = color === "red" ? "bg-red-500" : "bg-green-500";
  const textColorClass = color === "red" ? "text-red-500" : "text-green-500";

  return (
    <div className="flex items-center text-[10px] font-mono mb-1">
      <div className="bg-[#ff79c6] text-[#282a36] px-2 py-0.5 font-bold rounded-l-sm">
        alvn
      </div>
      <div className="text-[#ff79c6] bg-[#bd93f9] leading-none"></div>
      <div className="bg-[#bd93f9] text-[#282a36] px-2 py-0.5 font-bold">
        {path}
      </div>
      <div className={`text-[#bd93f9] leading-none ${textColorClass}`}></div>
      <div
        className={`${bgColorClass} text-[#282a36] px-2 py-0.5 font-bold rounded-r-sm`}
      >
        git:main
      </div>
    </div>
  );
};

export function IntroEnvelope({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [termLine, setTermLine] = useState(0);

  useEffect(() => {
    // === TIMELINE ANIMASI ===
    const timers: NodeJS.Timeout[] = [];
    const schedule = (ms: number, fn: () => void) => {
      timers.push(setTimeout(fn, ms));
    };

    // 1. TERMINAL PHASE
    schedule(500, () => setTermLine(1));
    schedule(1500, () => setTermLine(2));
    schedule(2500, () => setTermLine(3));
    schedule(3200, () => setTermLine(4));

    // 2. MORPH PHASE
    schedule(4000, () => setPhase(1)); // Terminal Shrink
    schedule(4800, () => setPhase(2)); // Envelope Appear (Tutup)

    // 3. TEAR & OPEN PHASE (REALISTIS)
    schedule(5500, () => setPhase(2.5)); // Laser Sobek Segel
    schedule(6200, () => setPhase(3)); // FLAP OPEN (Segitiga Naik)

    // 4. REVEAL PHASE (KARTU KELUAR)
    schedule(6800, () => setPhase(4)); // Card POP OUT
    schedule(7800, () => setPhase(5)); // Reveal Text

    // 5. EXIT PHASE
    schedule(9800, () => setPhase(6)); // Curtain Up
    schedule(10800, () => onComplete()); // Done

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const scrambledName = useScramble("ALVIN FARIS", phase >= 5);
  const scrambledRole1 = useScramble("SOFTWARE ENGINEER", phase >= 5);
  const scrambledRole2 = useScramble("FULLSTACK DEVELOPER", phase >= 5);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background font-mono overflow-hidden cursor-wait transition-transform duration-1000 ease-in-out">
      {/* SHUTTER EXIT */}
      <div
        className={`absolute inset-0 bg-background z-50 transition-transform duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] ${
          phase >= 6 ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* BACKGROUND HERO STYLE */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute inset-0 bg-background/90 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] animate-pulse" />

        <div className="relative h-full w-full flex flex-col items-center justify-center z-10">
          {/* === TERMINAL WINDOW === */}
          <div
            className={`absolute transition-all duration-700 ease-in-out ${
              phase === 0
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-50 translate-y-20 blur-md pointer-events-none"
            }`}
          >
            <div className="w-[340px] sm:w-[520px] bg-[#1e1e2e] border border-white/10 rounded-lg shadow-2xl overflow-hidden font-mono text-xs">
              <div className="bg-[#262636] px-4 py-2 flex gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff5555]" />
                <div className="w-3 h-3 rounded-full bg-[#f1fa8c]" />
                <div className="w-3 h-3 rounded-full bg-[#50fa7b]" />
              </div>
              <div className="p-5 flex flex-col gap-3 min-h-[200px] text-left">
                {termLine >= 1 && (
                  <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                    <Prompt path="~" color="cyan" />
                    <div className="flex gap-2 text-[#f8f8f2] pl-1">
                      <span className="text-[#ff79c6]">❯</span>{" "}
                      <span className="text-[#f1fa8c]">npm</span> run
                      portfolio:init
                    </div>
                  </div>
                )}
                {termLine >= 2 && (
                  <div className="pl-1 text-gray-500 italic">
                    &gt; Resolving assets...
                  </div>
                )}
                {termLine >= 3 && (
                  <div className="pl-1 flex items-center gap-2 text-[#ff5555] font-bold bg-[#ff5555]/10 p-2 rounded border border-[#ff5555]/20">
                    <AlertTriangle className="w-4 h-4" /> ERROR:
                    SECURE_CONNECTION_REQUIRED
                  </div>
                )}
                {termLine >= 4 && (
                  <div className="pl-1 mt-1">
                    <Prompt path="~/secure" color="red" />
                    <div className="flex gap-2 text-[#f8f8f2] pl-1">
                      <span className="text-[#ff5555]">❯</span>{" "}
                      <span className="text-[#f1fa8c]">sudo</span> unlock
                      --force
                    </div>
                    <div className="flex items-center gap-2 text-[#50fa7b] font-bold mt-2 pl-1">
                      <Check className="w-4 h-4" /> SUCCESS. ACCESS GRANTED.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* === THE REAL ENVELOPE === */}
          <div
            className={`relative transition-all duration-[1000ms] cubic-bezier(0.23, 1, 0.32, 1) ${
              phase >= 1
                ? "opacity-100 scale-100"
                : "opacity-0 scale-125 pointer-events-none"
            }`}
          >
            <div className="relative w-[320px] sm:w-[450px] h-[260px] flex justify-center items-center">
              {/* --- 1. CARD (KARTU IDENTITAS) --- */}
              {/* Posisinya ada di DALAM amplop dulu, baru keluar */}
              <div
                className={`absolute w-[95%] bg-white text-black rounded-xl flex flex-col items-center justify-center shadow-2xl transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${
                  // Phase 4: Kartu POP UP ke depan dan ke atas
                  phase >= 4
                    ? "z-40 bottom-[100px] h-[300px] opacity-100 rotate-0 scale-105"
                    : "z-10 bottom-0 h-[220px] opacity-0 rotate-0 scale-90"
                }`}
              >
                {/* Content Kartu */}
                <div className="flex flex-col items-center gap-2 w-full px-8 text-center pt-6">
                  <div
                    className={`w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-2 shadow-lg transition-all duration-700 ${phase >= 5 ? "scale-100" : "scale-0"}`}
                  >
                    <Cpu className="w-8 h-8" />
                  </div>
                  <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-1">
                    {scrambledName}
                  </h1>
                  <div className="h-1 w-24 bg-black mb-4" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold tracking-[0.2em] text-black">
                      {scrambledRole1}
                    </p>
                    <p className="text-xs font-medium tracking-[0.1em] text-gray-500">
                      {scrambledRole2}
                    </p>
                  </div>
                  <div
                    className={`mt-6 flex gap-3 transition-all delay-500 duration-500 ${phase >= 5 ? "opacity-100" : "opacity-0"}`}
                  >
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-black/80"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* --- 2. ENVELOPE BACK (Badan Belakang) --- */}
              <div className="absolute inset-0 bg-[#1a1a1a] rounded-b-xl z-0 border border-white/10 shadow-2xl" />

              {/* --- 3. ENVELOPE FRONT POCKET (Kantong Depan - Trapesium) --- */}
              {/* Ini menutupi kartu saat kartu masih di dalam */}
              <div className="absolute bottom-0 left-0 w-full h-[140px] z-20 overflow-hidden rounded-b-xl">
                {/* CSS Triangle/Trapezoid Hack for Pocket */}
                <div
                  className="absolute bottom-0 left-0 w-full h-full bg-[#222] border-t border-white/20"
                  style={{
                    clipPath:
                      "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)",
                  }}
                ></div>

                {/* Glass Effect Overlay on Pocket */}
                <div
                  className="absolute inset-0 bg-white/5 backdrop-blur-sm"
                  style={{
                    clipPath:
                      "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)",
                  }}
                />
              </div>

              {/* --- 4. TOP FLAP (SEGITIGA PENUTUP) - THE MAIN STAR --- */}
              {/* Z-Index tinggi biar nutupin kartu pas awal */}
              <div
                className={`absolute top-0 left-0 w-full h-[140px] z-30 transition-all duration-[800ms] ease-in-out origin-top ${
                  // ANIMASI BUKA: Rotate X 180 derajat (Jungkir balik ke atas)
                  phase >= 3
                    ? "-rotate-x-180 opacity-40"
                    : "rotate-x-0 opacity-100"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  // Bentuk Segitiga Terbalik
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                }}
              >
                {/* Visual Segitiga */}
                <div className="w-full h-full bg-[#2a2a2a] border-b border-white/20 flex items-center justify-center pt-8">
                  {/* Icon Gembok di Ujung Segitiga */}
                  <div
                    className={`flex flex-col items-center gap-1 transition-opacity duration-300 ${phase >= 2.5 ? "opacity-0" : "opacity-100"}`}
                  >
                    <Lock className="w-4 h-4 text-white/50" />
                  </div>
                </div>

                {/* Laser Tear Line (Muncul saat Phase 2.5) */}
                {phase >= 2 && phase < 3 && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px]">
                    <div
                      className={`absolute top-0 h-full w-[20%] bg-red-500 shadow-[0_0_15px_red] transition-all duration-700 ease-linear ${
                        phase >= 2.5
                          ? "left-[100%] opacity-0"
                          : "left-0 opacity-100"
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* --- 5. STATUS BADGE (Paling Depan) --- */}
              <div
                className={`absolute bottom-6 z-50 flex items-center gap-3 px-6 py-2 border border-white/10 rounded-full bg-black/80 backdrop-blur-md transition-all duration-500 ${
                  phase >= 3
                    ? "translate-y-20 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-[10px] font-mono tracking-widest text-white/80 font-bold">
                  SECURE // ENCRYPTED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
