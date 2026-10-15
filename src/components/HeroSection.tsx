"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowRight, Cpu, Eye, Radio, Bot } from "lucide-react";

export function HeroSection() {
  const { lang, setIsResumeOpen } = usePortfolio();

  const engineeringPillars = [
    { icon: <Cpu className="w-3 h-3" />, label: "Embedded Systems" },
    { icon: <Eye className="w-3 h-3" />, label: "Computer Vision" },
    { icon: <Bot className="w-3 h-3" />, label: "Robotics & Control" },
    { icon: <Radio className="w-3 h-3" />, label: "IoT & Hardware" },
  ];

  return (
    <section
      id="hero"
      className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 bg-[var(--bg-page)] text-[var(--text-primary)] overflow-hidden transition-colors"
    >
      {/* Subtle hairline background grid */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Status & Discipline Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-precision bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-secondary)] shadow-xs self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-[var(--text-primary)]">ERLANGGA LAB</span>
            <span className="text-[var(--text-muted)]">{"//"}</span>
            <span className="text-[var(--text-muted)]">ELECTRICAL ENGINEERING @ ITNY</span>
          </div>

          {/* Core Engineering Disciplines Pill Strip */}
          <div className="hidden md:flex items-center gap-2">
            {engineeringPillars.map((p, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-precision bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-secondary)] shadow-xs"
              >
                <span className="text-[var(--accent-electric)]">{p.icon}</span>
                <span>{p.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Central Editorial Hero Stage matching reference image */}
        <div className="relative flex flex-col items-center justify-center min-h-[440px] sm:min-h-[520px] md:min-h-[580px] pt-2 sm:pt-4 select-none">
          {/* Top Line: Serif Italic Text */}
          <div className="w-full flex justify-between items-baseline px-4 sm:px-12 md:px-16 z-0">
            <span className="font-editorial-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--text-primary)] leading-none tracking-tight">
              I&apos;m
            </span>
            <span className="font-editorial-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--text-primary)] leading-none tracking-tight">
              {lang === "en" ? "systems &" : "rekayasa &"}
            </span>
          </div>

          {/* Big Bold Electric Blue Sans-Serif Typography Layer (DESI GNER -> ENGI NEER) */}
          <div className="w-full flex justify-between items-center px-2 sm:px-6 md:px-8 -mt-2 sm:-mt-4 md:-mt-6 z-0">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black uppercase tracking-tighter text-[#1652f0] leading-none">
              ENGI
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black uppercase tracking-tighter text-[#1652f0] leading-none">
              NEER
            </h1>
          </div>

          {/* Centered Overlapping Cutout Portrait of Erlangga */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 pb-0">
            <div className="relative w-52 sm:w-64 md:w-72 lg:w-80 h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] pointer-events-auto flex items-end justify-center group">
              <div className="relative w-full h-full flex items-end justify-center">
                <Image
                  src="/erlangga_hero.png"
                  alt="Erlangga Pradana Kurniawan — Electrical Engineering Student"
                  fill
                  priority
                  className="object-contain object-bottom filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 260px, 340px"
                />
              </div>

              {/* Floating "LET'S CHAT" Pill Button on chest matching reference */}
              <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[#1652f0] hover:bg-[#1240c4] text-white font-mono text-xs sm:text-sm font-bold tracking-wider shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{lang === "en" ? "LET'S CHAT" : "HUBUNGI SAYA"}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Flanked Bottom Editorial Metadata (matching bottom-left & bottom-right of reference) */}
        <div className="mt-8 pt-8 border-t border-precision grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          {/* Bottom Left Copy: Multi-disciplinary focus */}
          <div className="md:col-span-6 space-y-1">
            <p className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[var(--text-primary)] max-w-md leading-relaxed">
              {lang === "en"
                ? "EXPLORING HARDWARE-SOFTWARE INTEGRATION, EMBEDDED SYSTEMS, COMPUTER VISION, ROBOTICS, AI, AND IOT."
                : "MENDALAMI INTEGRASI PERANGKAT KERAS-LUNAK, SISTEM TERTANAM, COMPUTER VISION, ROBOTIKA, AI, DAN IOT."}
            </p>
            <p className="text-[11px] font-mono text-[var(--text-muted)]">
              C/C++ • Python • FreeRTOS • Linux • PCB Design • OpenCV • Edge AI
            </p>
          </div>

          {/* Bottom Right Copy: Institution & Navigation */}
          <div className="md:col-span-6 flex flex-col md:items-end space-y-2 md:text-right">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
              {lang === "en"
                ? "Electrical Engineering undergraduate at Institut Teknologi Nasional Yogyakarta (ITNY) building tangible hardware and connected engineering prototypes."
                : "Mahasiswa S1 Teknik Elektro di Institut Teknologi Nasional Yogyakarta (ITNY) yang merancang perangkat keras fisik dan prototipe rekayasa terhubung."}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono font-semibold text-[#1652f0]">
              <Link href="/projects" className="hover:underline flex items-center gap-1">
                <span>{lang === "en" ? "Browse Projects Catalog" : "Jelajahi Katalog Proyek"}</span>
                <span>→</span>
              </Link>
              <span>•</span>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="hover:underline cursor-pointer"
              >
                {lang === "en" ? "Technical CV" : "CV Teknis"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
