"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  Plane,
  Cpu,
  Radio,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Terminal,
} from "lucide-react";

export function MavericksCaseStudy() {
  const { lang } = usePortfolio();
  const [activeTab, setActiveTab] = useState<"architecture" | "specs" | "challenges">("architecture");
  const project = PORTFOLIO_DATA.projects.find((p) => p.id === "mavericks-guardian")!;

  return (
    <section id="featured-case-study" className="py-16 sm:py-24 border-b border-precision bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-precision">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--accent-glow)] text-[var(--text-accent)] border border-precision mb-2">
              <span>FLAGSHIP ENGINEERING CASE STUDY</span>
              <span>{"//"}</span>
              <span>KRTI 2026 VTOL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1652f0]">
              MAVERICKS{" "}
              <span className="font-editorial-serif italic font-normal text-[var(--text-primary)]">
                {lang === "en" ? "vtol system" : "sistem vtol"}
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl">
              {lang === "en"
                ? "Full-stack integration of Cube Orange+ avionics, NVIDIA Jetson companion computing, high-speed MAVLink telemetry, and optical ArUco marker guidance."
                : "Integrasi menyeluruh avionik Cube Orange+, komputasi pendamping NVIDIA Jetson, telemetri MAVLink berkecepatan tinggi, dan panduan optik ArUco."}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border border-precision bg-[var(--bg-surface-elevated)] text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--telemetry-green)]" />
              <span>{project.statusLabel[lang]}</span>
            </span>
          </div>
        </div>

        {/* Primary Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Core Narrative & Engineering Context */}
          <div className="lg:col-span-7 space-y-6">
            {/* Overview / Mission Objective */}
            <div className="p-5 sm:p-6 rounded-lg border border-precision bg-[var(--bg-page)] space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>{lang === "en" ? "Mission & Engineering Objective" : "Misi & Tujuan Rekayasa"}</span>
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
                {project.details.objective[lang]}
              </p>
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {project.metrics?.map((m) => (
                  <div key={m.label} className="p-2.5 rounded border border-precision bg-[var(--bg-surface)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">{m.label}</span>
                    <span className="font-bold text-[var(--text-primary)] text-xs mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Personal Contribution & Role */}
            <div className="p-5 sm:p-6 rounded-lg border border-precision bg-[var(--bg-page)] space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--telemetry-green)]" />
                <span>{lang === "en" ? "My Role & System Contribution" : "Peran & Kontribusi Sistem Saya"}</span>
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.details.myContribution[lang]}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono border border-precision bg-[var(--bg-surface)] text-[var(--text-muted)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Tabbed Breakdown (Architecture / Hardware / Challenges) */}
            <div className="rounded-lg border border-precision bg-[var(--bg-page)] overflow-hidden">
              <div className="flex border-b border-precision bg-[var(--bg-surface-elevated)] text-xs font-mono">
                <button
                  onClick={() => setActiveTab("architecture")}
                  className={`flex-1 py-2.5 px-4 text-center font-semibold transition-colors border-r border-precision ${
                    activeTab === "architecture"
                      ? "bg-[var(--bg-page)] text-[var(--text-accent)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {lang === "en" ? "System Architecture" : "Arsitektur Sistem"}
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`flex-1 py-2.5 px-4 text-center font-semibold transition-colors border-r border-precision ${
                    activeTab === "specs"
                      ? "bg-[var(--bg-page)] text-[var(--text-accent)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {lang === "en" ? "Hardware & Avionics" : "Perangkat Keras & Avionik"}
                </button>
                <button
                  onClick={() => setActiveTab("challenges")}
                  className={`flex-1 py-2.5 px-4 text-center font-semibold transition-colors ${
                    activeTab === "challenges"
                      ? "bg-[var(--bg-page)] text-[var(--text-accent)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {lang === "en" ? "Field Debugging & Lessons" : "Debugging Lapangan & Solusi"}
                </button>
              </div>

              <div className="p-5 sm:p-6 text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
                {activeTab === "architecture" && (
                  <div className="space-y-3">
                    <p>{project.details.architecture[lang]}</p>
                    <div className="p-3 rounded border border-precision bg-[var(--bg-surface)] text-xs font-mono space-y-1.5">
                      <div className="flex items-center justify-between text-[var(--text-primary)]">
                        <span className="font-bold">AUTONOMOUS FLIGHT GATING LOGIC</span>
                        <span className="text-[var(--telemetry-green)]">[ENABLED]</span>
                      </div>
                      <div className="text-[var(--text-muted)] space-y-1 text-[11px]">
                        <p>• Takeoff Threshold: Altitude &gt; 0.8m with 3.0s ascending confirmation trend.</p>
                        <p>• Landing Hysteresis: Closes recording/drops when altitude drops below 0.4m.</p>
                        <p>• Safety Override: Bench testing lock disables servo fire if GNSS groundspeed &lt; 0.2 m/s.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3 rounded border border-precision bg-[var(--bg-surface)]">
                      <span className="font-bold text-[var(--text-primary)] block mb-2 text-[11px] uppercase">
                        Avionics &amp; Sensors
                      </span>
                      <ul className="space-y-1 text-[var(--text-muted)]">
                        {project.details.hardware.map((hw) => (
                          <li key={hw}>• {hw}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded border border-precision bg-[var(--bg-surface)]">
                      <span className="font-bold text-[var(--text-primary)] block mb-2 text-[11px] uppercase">
                        Software &amp; Daemons
                      </span>
                      <ul className="space-y-1 text-[var(--text-muted)]">
                        {project.details.software.map((sw) => (
                          <li key={sw}>• {sw}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "challenges" && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5 p-3 rounded border border-precision bg-[var(--bg-surface)] text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[var(--text-primary)] block font-mono">
                          {lang === "en" ? "Identified Engineering Problem:" : "Masalah Rekayasa Lapangan:"}
                        </strong>
                        <p className="mt-1 text-[var(--text-secondary)]">{project.details.challenges[lang]}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded border border-precision bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-muted)]">
                      <span className="font-bold text-[var(--text-primary)] block mb-1">CURRENT BENCH STATE:</span>
                      <p>{project.details.currentStatus[lang]}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Visual System Architecture Schematic & Real Marker Crops */}
          <div className="lg:col-span-5 space-y-4">
            {/* Visual System Architecture Diagram */}
            <div className="p-4 sm:p-5 rounded-lg border border-precision bg-[var(--bg-page)] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                  <span>SYSTEM INTERCONNECT DIAGRAM</span>
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">CUBE ↔ JETSON</span>
              </div>

              {/* Schematic Box */}
              <div className="p-3 rounded border border-precision bg-[var(--bg-surface)] space-y-3 text-[11px] font-mono">
                {/* Node 1: GCS */}
                <div className="p-2.5 rounded border border-precision bg-[var(--bg-surface-elevated)] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">GROUND STATION</span>
                    <span className="block text-[10px] text-[var(--text-muted)]">Mission Planner / Laptop GCS</span>
                  </div>
                  <Radio className="w-4 h-4 text-[var(--text-accent)]" />
                </div>

                {/* Telemetry link arrow */}
                <div className="flex items-center justify-center text-[10px] text-[var(--text-muted)] font-mono">
                  <span>↕ Telemetry Radio (433/915 MHz)</span>
                </div>

                {/* Node 2: Cube Orange+ */}
                <div className="p-2.5 rounded border-2 border-[var(--text-accent)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">CUBE ORANGE+ AVIONICS</span>
                    <span className="block text-[10px] text-[var(--text-muted)]">
                      ArduPilot VTOL / RTK GNSS / AUX 1 Servo
                    </span>
                  </div>
                  <Cpu className="w-4 h-4 text-[var(--text-accent)]" />
                </div>

                {/* Serial MAVLink Link Arrow */}
                <div className="flex items-center justify-center text-[10px] text-[var(--telemetry-green)] font-mono font-semibold py-0.5">
                  <span>↕ High-Speed MAVLink UART (921,600 Baud)</span>
                </div>

                {/* Node 3: Jetson Nano */}
                <div className="p-2.5 rounded border-2 border-[var(--telemetry-green)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">NVIDIA JETSON NANO</span>
                    <span className="block text-[10px] text-[var(--text-muted)]">
                      Linux / PyMAVLink / OpenCV 4.5 Perception
                    </span>
                  </div>
                  <Terminal className="w-4 h-4 text-[var(--telemetry-green)]" />
                </div>

                {/* Video feed arrow */}
                <div className="flex items-center justify-center text-[10px] text-[var(--text-muted)] font-mono">
                  <span>↑ USB Video Stream (640×480 @ 30 FPS)</span>
                </div>

                {/* Node 4: Optical Camera Sensor */}
                <div className="p-2.5 rounded border border-precision bg-[var(--bg-surface-elevated)] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">OPTICAL SENSOR</span>
                    <span className="block text-[10px] text-[var(--text-muted)]">
                      Downward Optical Stream (/dev/video0)
                    </span>
                  </div>
                  <Eye className="w-4 h-4 text-[var(--text-accent)]" />
                </div>
              </div>
            </div>

            {/* Genuine Computer Vision Artifacts from KRTI Experiments */}
            <div className="p-4 sm:p-5 rounded-lg border border-precision bg-[var(--bg-page)] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[var(--text-primary)]">
                  {lang === "en" ? "GENUINE VISION CAPTURE CROPS" : "HASIL UJI COMPUTER VISION AKTUAL"}
                </span>
                <span className="text-[10px] text-[var(--telemetry-green)]">VERIFIED ASSETS</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="relative aspect-square rounded border border-precision overflow-hidden bg-black/10 group">
                  <Image
                    src="/projects/vision/marker_tight.png"
                    alt="ArUco Marker Tight Bounding Box"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-mono bg-black/70 text-white">
                    ArUco Tight Crop
                  </div>
                </div>

                <div className="relative aspect-square rounded border border-precision overflow-hidden bg-black/10 group">
                  <Image
                    src="/projects/vision/phone_marker.png"
                    alt="Phone Screen ArUco Marker Test"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-mono bg-black/70 text-white">
                    Target Board Capture
                  </div>
                </div>

                <div className="relative aspect-square rounded border border-precision overflow-hidden bg-black/10 group">
                  <Image
                    src="/projects/vision/square.png"
                    alt="Square Homography Rectification"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-mono bg-black/70 text-white">
                    Homography Square
                  </div>
                </div>

                <div className="relative aspect-square rounded border border-precision overflow-hidden bg-black/10 group">
                  <Image
                    src="/projects/vision/warped_0.png"
                    alt="Warped Perspective Extraction"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-mono bg-black/70 text-white">
                    Warped Perspective
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-mono text-[var(--text-muted)] text-center pt-1">
                Captured during optical detection test runs with OpenCV 4.5 on NVIDIA Jetson Nano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
