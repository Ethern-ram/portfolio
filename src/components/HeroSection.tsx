"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { HeroTelemetryCanvas } from "./HeroTelemetryCanvas";
import { ArrowDown, Mail, MapPin, GraduationCap, Cpu, Layers } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function HeroSection() {
  const { lang } = usePortfolio();

  return (
    <section id="hero" className="relative pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-precision overflow-hidden">
      {/* Subtle engineering background grid */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* System Status Ticker */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-precision bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-secondary)] mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[var(--telemetry-green)] animate-ping" />
          <span className="font-semibold text-[var(--text-primary)]">ERLANGGA LAB 2.0</span>
          <span className="text-[var(--text-muted)] hidden sm:inline">{"//"}</span>
          <span className="text-[var(--text-muted)] hidden sm:inline">
            AUTONOMOUS SYSTEMS &amp; PERCEPTION
          </span>
          <span className="text-[var(--text-accent)] font-semibold hidden md:inline">
            [SYS_VER: 2026.1]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-accent)] font-semibold">
                {PORTFOLIO_DATA.profile.name}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                {lang === "en"
                  ? "Engineering Intelligent Systems."
                  : "Merekayasa Sistem Cerdas."}
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {lang === "en"
                  ? "Electrical Engineering student exploring robotics, autonomous systems, embedded computing, and computer vision through hands-on engineering projects."
                  : "Mahasiswa Teknik Elektro yang mendalami robotika, sistem otonom, komputasi tertanam, dan computer vision melalui proyek rekayasa fisik terapan."}
              </p>
            </div>

            {/* Credibility & Institution metadata chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded border border-precision bg-[var(--bg-surface)]">
                <GraduationCap className="w-4 h-4 text-[var(--text-accent)] shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="text-[var(--text-muted)] block text-[10px]">INSTITUTION &amp; MAJOR</span>
                  <span className="font-semibold text-[var(--text-primary)] block">
                    Institut Teknologi Nasional Yogyakarta
                  </span>
                  <span className="text-[var(--text-secondary)] text-[11px]">
                    Electrical Engineering Undergraduate
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded border border-precision bg-[var(--bg-surface)]">
                <Cpu className="w-4 h-4 text-[var(--text-accent)] shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="text-[var(--text-muted)] block text-[10px]">CORE ENGINEERING DOMAINS</span>
                  <span className="font-semibold text-[var(--text-primary)] block">
                    UAVs, Embedded &amp; Vision
                  </span>
                  <span className="text-[var(--text-secondary)] text-[11px]">
                    Cube Orange+, Jetson Nano, MAVLink
                  </span>
                </div>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-xs font-semibold bg-[var(--text-primary)] text-[var(--bg-page)] hover:opacity-90 transition-opacity"
              >
                <span>{lang === "en" ? "Explore Selected Work" : "Jelajahi Proyek"}</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="#featured-case-study"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono text-xs font-semibold border border-precision bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>{lang === "en" ? "Mavericks VTOL Case Study" : "Studi Kasus VTOL"}</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{lang === "en" ? "Get in Touch" : "Hubungi Saya"}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Restrained Technical Telemetry Visual */}
          <div className="lg:col-span-5">
            <HeroTelemetryCanvas />
            <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] px-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[var(--text-accent)]" />
                <span>YOGYAKARTA, ID [LAT -7.79, LON 110.37]</span>
              </span>
              <span>TESTBENCH: ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
