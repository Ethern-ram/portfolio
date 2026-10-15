"use client";

import React from "react";
import Link from "next/link";
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
          {/* Left Title: ALL YOUR / engineering needs */}
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
                ? "Full-stack embedded firmware, computer vision pipelines, IoT telemetry, and hardware-software systems engineered with real laboratory discipline."
                : "Firmware tertanam full-stack, pipeline computer vision, telemetri IoT, dan sistem perangkat keras-lunak yang direkayasa dengan disiplin laboratorium nyata."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#1652f0] hover:bg-slate-100 font-mono text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{lang === "en" ? "EXPLORE PROJECTS" : "LIHAT PROYEK"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>{lang === "en" ? "TECHNICAL CV" : "RINGKASAN CV"}</span>
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
              PRIMARY DISCIPLINE
            </span>
            <span className="text-base sm:text-lg font-bold font-mono">
              Electrical Engineering
            </span>
            <span className="text-[11px] text-blue-200">
              ITNY Undergraduate
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-mono text-blue-200 uppercase tracking-widest">
              CORE TOOLCHAIN
            </span>
            <span className="text-base sm:text-lg font-bold font-mono">
              C/C++, Python &amp; Linux
            </span>
            <span className="text-[11px] text-blue-200">
              POSIX &amp; FreeRTOS
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-mono text-blue-200 uppercase tracking-widest">
              SYSTEMS ARCHITECTURE
            </span>
            <span className="text-base sm:text-lg font-bold font-mono">
              HW / SW Integration
            </span>
            <span className="text-[11px] text-blue-200">
              UART, I2C, SPI &amp; Telemetry
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-mono text-blue-200 uppercase tracking-widest">
              APPLICATION DOMAINS
            </span>
            <span className="text-base sm:text-lg font-bold font-mono">
              Vision, IoT &amp; Robotics
            </span>
            <span className="text-[11px] text-blue-200">
              Physical Deployment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
