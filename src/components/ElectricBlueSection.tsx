"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ThreeDPillCluster } from "./ThreeDPillCluster";
import { ArrowUpRight } from "lucide-react";

export function ElectricBlueSection() {
  const { lang, setIsResumeOpen } = usePortfolio();

  return (
    <section
      id="systems-cluster"
      className="relative bg-[#1652f0] text-white py-20 sm:py-28 overflow-hidden"
    >
      {/* Background decorative depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-700/30 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Top Header Row matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 sm:mb-14">
          {/* Left Title: ALL YOUR / engineering systems */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
              ALL YOUR
            </h2>
            <p className="font-editorial-serif italic text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.05] mt-1 sm:mt-2">
              {lang === "en" ? "engineering needs" : "kebutuhan rekayasa"}
            </p>
          </div>

          {/* Right Description & Action Button */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between space-y-5 lg:text-right pt-2">
            <p className="text-sm sm:text-base text-blue-100 max-w-sm font-normal leading-relaxed">
              {lang === "en"
                ? "Full-stack avionics, computer vision, and autonomous flight architectures built for mission-grade reliability and physical deployment."
                : "Arsitektur avionik full-stack, visi komputer, dan sistem penerbangan otonom yang dirancang untuk keandalan misi dan implementasi fisik."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#1652f0] hover:bg-slate-100 font-mono text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{lang === "en" ? "BOOK A CALL" : "HUBUNGI SAYA"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 font-mono text-xs font-semibold transition-colors"
              >
                <span>{lang === "en" ? "SPECS & CV" : "RINGKASAN CV"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Interactive Floating Pill Cluster */}
        <div className="my-4">
          <ThreeDPillCluster />
        </div>

        {/* Bottom Verification Metrics Bar */}
        <div className="pt-10 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-white/90">
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-mono text-blue-200 uppercase tracking-widest">
              PRIMARY AIRFRAME
            </span>
            <span className="text-base sm:text-lg font-bold font-mono">
              VTOL QuadPlane
            </span>
            <span className="text-[11px] text-blue-200">
              KRTI 2026 Ready
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-mono text-blue-200 uppercase tracking-widest">
              VISION LATENCY
            </span>
            <span className="text-base sm:text-lg font-bold font-mono">
              &lt; 33ms @ 30 FPS
            </span>
            <span className="text-[11px] text-blue-200">
              Jetson Nano OpenCV
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-mono text-blue-200 uppercase tracking-widest">
              TELEMETRY BAUD
            </span>
            <span className="text-base sm:text-lg font-bold font-mono">
              921,600 bps
            </span>
            <span className="text-[11px] text-blue-200">
              MAVLink 2.0 Serial
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-mono text-blue-200 uppercase tracking-widest">
              FLIGHT STACK
            </span>
            <span className="text-base sm:text-lg font-bold font-mono">
              Cube Orange+
            </span>
            <span className="text-[11px] text-blue-200">
              ArduPilot Custom Subsystems
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
