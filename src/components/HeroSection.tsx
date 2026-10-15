"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { ThreeDDrone } from "./ThreeDDrone";
import { ArrowRight, Box, User, ArrowDown } from "lucide-react";

export function HeroSection() {
  const { lang, setIsResumeOpen } = usePortfolio();
  const [viewMode, setViewMode] = useState<"portrait" | "3d">("portrait");

  return (
    <section
      id="hero"
      className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 bg-[var(--bg-page)] text-[var(--text-primary)] overflow-hidden transition-colors"
    >
      {/* Subtle hairline background grid */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Status & 3D Switcher pill */}
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-precision bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-[var(--text-primary)]">ERLANGGA LAB</span>
            <span className="text-[var(--text-muted)]">{"//"}</span>
            <span className="text-[var(--text-muted)] hidden sm:inline">ITNY ELECTRICAL ENGINEERING</span>
          </div>

          {/* Interactive Mode Toggle: Portrait vs 3D Drone */}
          <div className="inline-flex items-center p-1 rounded-full border border-precision bg-[var(--bg-surface)] shadow-xs">
            <button
              onClick={() => setViewMode("portrait")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                viewMode === "portrait"
                  ? "bg-[#1652f0] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <User className="w-3 h-3" />
              <span>Portrait</span>
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                viewMode === "3d"
                  ? "bg-[#1652f0] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Box className="w-3 h-3" />
              <span className="flex items-center gap-1">
                <span>3D UAV</span>
                <span className="px-1 py-0.2 rounded text-[9px] bg-white/20 font-bold uppercase">
                  Live
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Central Editorial Hero Stage matching the reference image */}
        <div className="relative flex flex-col items-center justify-center min-h-[480px] sm:min-h-[580px] md:min-h-[640px] pt-4 select-none">
          {/* Top Line: Serif Italic Text */}
          <div className="w-full flex justify-between items-baseline px-2 sm:px-8 z-0">
            <span className="font-editorial-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[var(--text-primary)] leading-none tracking-tight">
              I&apos;m
            </span>
            <span className="font-editorial-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--text-primary)] leading-none tracking-tight">
              {lang === "en" ? "robotics &" : "teknik &"}
            </span>
          </div>

          {/* Big Bold Electric Blue Sans-Serif Typography Layer (DESI GNER -> ENGI NEER) */}
          <div className="w-full flex justify-between items-center px-1 sm:px-4 -mt-2 sm:-mt-6 md:-mt-8 z-0">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10.5rem] font-black uppercase tracking-tighter text-[#1652f0] leading-none">
              ENGI
            </h1>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10.5rem] font-black uppercase tracking-tighter text-[#1652f0] leading-none">
              NEER
            </h1>
          </div>

          {/* Centered Overlapping Content (Portrait or 3D UAV Model) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            {viewMode === "portrait" ? (
              <div className="relative w-64 sm:w-80 md:w-96 h-[340px] sm:h-[440px] md:h-[500px] pointer-events-auto flex items-end justify-center">
                {/* Silhouette / Portrait Photo with smooth rounded framing */}
                <div className="relative w-full h-full flex items-end justify-center">
                  <div className="relative w-60 sm:w-72 md:w-84 h-[330px] sm:h-[420px] md:h-[480px] rounded-t-[100px] sm:rounded-t-[140px] overflow-hidden border-2 border-white/60 dark:border-black/40 shadow-2xl bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700">
                    <Image
                      src="/gambarku.jpeg"
                      alt="Erlangga Pradana Kurniawan"
                      fill
                      priority
                      className="object-cover object-top hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                      sizes="(max-w-768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Floating "LET'S CHAT" Pill Button on chest matching reference */}
                <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1652f0] hover:bg-[#1240c4] text-white font-mono text-xs sm:text-sm font-bold tracking-wider shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{lang === "en" ? "LET'S CHAT" : "HUBUNGI SAYA"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              /* 3D Interactive UAV Model in Place */
              <div className="relative w-full max-w-xl h-[360px] sm:h-[450px] md:h-[520px] pointer-events-auto flex flex-col items-center justify-center">
                <ThreeDDrone className="w-full h-full" interactive={true} />
                {/* Switch back or explore call */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                  <a
                    href="#featured-case-study"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1652f0] text-white font-mono text-xs font-bold shadow-lg hover:bg-[#1240c4] transition-all"
                  >
                    <span>{lang === "en" ? "INSPECT AIRFRAME SPECS" : "INSPEKSI SPEK AVIONIK"}</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Flanked Bottom Editorial Metadata (matching bottom-left & bottom-right of reference) */}
        <div className="mt-8 pt-8 border-t border-precision grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          {/* Bottom Left Copy */}
          <div className="md:col-span-6 space-y-1">
            <p className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[var(--text-primary)] max-w-md leading-relaxed">
              {lang === "en"
                ? "SPECIALIZED IN AUTONOMOUS UAV, EMBEDDED AVIONICS, AND HARDWARE-SOFTWARE INTEGRATION."
                : "TERSPESIALISASI DALAM UAV OTONOM, AVIONIK TERTANAM, DAN INTEGRASI PERANGKAT KERAS-LUNAK."}
            </p>
            <p className="text-[11px] font-mono text-[var(--text-muted)]">
              Cube Orange+ • NVIDIA Jetson Nano • ArUco Vision • RTK GNSS
            </p>
          </div>

          {/* Bottom Right Copy */}
          <div className="md:col-span-6 flex flex-col md:items-end space-y-1 md:text-right">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
              {lang === "en"
                ? "Undergraduate in Electrical Engineering at Institut Teknologi Nasional Yogyakarta (ITNY) engineering real physical avionics and mission-critical flight stacks."
                : "Mahasiswa Teknik Elektro di Institut Teknologi Nasional Yogyakarta (ITNY) yang merekayasa avionik fisik nyata dan stack penerbangan misi krusial."}
            </p>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="text-xs font-mono font-semibold text-[#1652f0] hover:underline self-start md:self-end"
            >
              {lang === "en" ? "View Full Technical Credentials →" : "Lihat Kredensial Teknis Lengkap →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
