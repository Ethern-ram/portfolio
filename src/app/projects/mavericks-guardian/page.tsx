"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { ThreeDDrone } from "@/components/ThreeDDrone";
import { VisionInspector } from "@/components/VisionInspector";
import { ResumeModal } from "@/components/ResumeModal";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  ArrowLeft,
  Plane,
  Eye,
  Cpu,
  ShieldCheck,
  Layers,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Box,
} from "lucide-react";

export default function MavericksGuardianPage() {
  const { lang } = usePortfolio();
  const [activeTab, setActiveTab] = useState<"overview" | "3d" | "vision" | "hardware" | "challenges">("overview");

  const project = PORTFOLIO_DATA.projects.find((p) => p.id === "mavericks-guardian") || PORTFOLIO_DATA.projects[0];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navigation />

      <main className="flex-1 pb-24">
        {/* Breadcrumb & Navigation Bar */}
        <div className="border-b border-precision bg-[var(--bg-surface)]/70 backdrop-blur-xs sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-[var(--text-primary)] transition-colors">
                Projects
              </Link>
              <span>/</span>
              <span className="text-[#1652f0] font-semibold">Mavericks Guardian (KRTI 2026)</span>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[#1652f0] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Back to All Projects" : "Kembali ke Semua Proyek"}</span>
            </Link>
          </div>
        </div>

        {/* Hero Section of the Case Study */}
        <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-16 border-b border-precision overflow-hidden bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-page)]">
          <div className="absolute inset-0 technical-grid pointer-events-none opacity-30" />

          <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#1652f0]/10 text-[#1652f0] border border-[#1652f0]/30 font-bold">
                <Plane className="w-3.5 h-3.5" />
                <span>KRTI 2026 VTOL QUADPLANE</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{project.statusLabel[lang]}</span>
              </span>

              <span className="text-xs font-mono text-[var(--text-muted)]">
                [AUTONOMOUS FLIGHT &amp; PERCEPTION]
              </span>
            </div>

            {/* Editorial Title */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1652f0] leading-none">
                MAVERICKS GUARDIAN{" "}
                <span className="font-editorial-serif italic font-normal text-[var(--text-primary)] block sm:inline">
                  {lang === "en" ? "vtol system" : "sistem vtol"}
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-xl text-[var(--text-secondary)] max-w-4xl leading-relaxed">
                {lang === "en"
                  ? "Engineering an autonomous VTOL QuadPlane combining Cube Orange+ avionics, NVIDIA Jetson Nano edge perception, MAVLink high-speed telemetry bridging, and optical marker target docking for the Kontes Robot Terbang Indonesia."
                  : "Rekayasa UAV VTOL QuadPlane otonom yang memadukan avionik Cube Orange+, persepsi edge NVIDIA Jetson Nano, jembatan telemetri MAVLink berkecepatan tinggi, dan penargetan optik marker untuk Kontes Robot Terbang Indonesia."}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-precision">
              {project.metrics?.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-precision bg-[var(--bg-surface)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                    {m.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold font-mono text-[var(--text-primary)] mt-1 block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Tabs for Deep Dive */}
        <div className="border-b border-precision bg-[var(--bg-surface)] sticky top-[137px] z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto py-2">
            {[
              { id: "overview", label: { en: "Mission & Role", id: "Misi & Peran" }, icon: <ShieldCheck className="w-3.5 h-3.5" /> },
              { id: "3d", label: { en: "3D Airframe CAD", id: "Model 3D Airframe" }, icon: <Box className="w-3.5 h-3.5" /> },
              { id: "vision", label: { en: "Optical Vision Pipeline", id: "Pipeline Visi Optik" }, icon: <Eye className="w-3.5 h-3.5" /> },
              { id: "hardware", label: { en: "Avionics & Telemetry", id: "Avionik & Telemetri" }, icon: <Cpu className="w-3.5 h-3.5" /> },
              { id: "challenges", label: { en: "Engineering Lessons", id: "Tantangan & Evaluasi" }, icon: <AlertTriangle className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#1652f0] text-white font-bold shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
                }`}
              >
                {tab.icon}
                <span>{tab.label[lang]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Overview, Mission Brief, and Individual Contribution */}
        {activeTab === "overview" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 space-y-12 animate-in fade-in duration-200">
            {/* Mission Objective & Individual Role */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Mission Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-8 rounded-xl border border-precision bg-[var(--bg-surface)] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#1652f0] font-bold">
                    <Plane className="w-4 h-4" />
                    <span>{lang === "en" ? "MISSION CONTEXT & AERODYNAMICS" : "KONTEKS MISI & AERODINAMIKA"}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    {lang === "en" ? "KRTI VTOL Division Requirements" : "Ketentuan Divisi VTOL KRTI"}
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {project.details.objective[lang]}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {lang === "en"
                      ? "The aircraft operates as a hybrid QuadPlane: it launches vertically via four heavy-lift brushless motors, transitions to horizontal forward flight using a pusher motor for low drag cruise, searches for optical ground targets, and executes controlled landing touchdown."
                      : "Wahana beroperasi sebagai QuadPlane hibrida: lepas landas secara vertikal menggunakan 4 motor angkat brushless, bertransisi ke terbang maju horizontal dengan pusher motor untuk jelajah efisien, mendeteksi target optik, dan melakukan touchdown terkendali."}
                  </p>
                </div>

                {/* Individual Contribution Section */}
                <div className="p-6 sm:p-8 rounded-xl border-2 border-[#1652f0]/30 bg-[#1652f0]/5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#1652f0] font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{lang === "en" ? "INDIVIDUAL ENGINEERING CONTRIBUTION" : "KONTRIBUSI REKAYASA PRIBADI"}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                    {lang === "en" ? "What I Personally Engineered & Implemented:" : "Bagian yang Saya Rancang & Bangun Sendiri:"}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.details.myContribution[lang]}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-mono text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>MAVLink 2.0 telemetry bridge daemon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>ArUco multi-dictionary detector loop</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Altitude-gated payload safety release</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Hardware-in-the-loop bench test harness</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Verified Project Status & Development Notice */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-xl border border-precision bg-[var(--bg-surface)] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-500 font-bold">
                    <Activity className="w-4 h-4" />
                    <span>{lang === "en" ? "HONEST DEVELOPMENT STATUS" : "STATUS PENGEMBANGAN AKTUAL"}</span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {lang === "en" ? "Active KRTI 2026 Preparation" : "Persiapan Aktif KRTI 2026"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.details.currentStatus[lang]}
                  </p>
                  <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-precision text-[11px] font-mono text-[var(--text-muted)] space-y-1">
                    <p className="font-semibold text-[var(--text-primary)]">
                      {lang === "en" ? "Verified Milestone Checklist:" : "Daftar Capaian Tervalidasi:"}
                    </p>
                    <p>✓ Avionics bench harness powered &amp; verified</p>
                    <p>✓ Serial MAVLink heartbeat @ 921,600 baud stable</p>
                    <p>✓ ArUco optical acquisition @ 30 FPS running on Jetson</p>
                    <p>⏳ Full integrated field test flight (upcoming)</p>
                  </div>
                </div>

                {/* 3D Model Teaser Card */}
                <div className="p-6 rounded-xl border border-precision bg-[var(--bg-surface)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#1652f0] font-bold uppercase">
                      3D AIRFRAME DIGITAL TWIN
                    </span>
                    <button
                      onClick={() => setActiveTab("3d")}
                      className="text-xs font-mono text-[#1652f0] hover:underline cursor-pointer"
                    >
                      {lang === "en" ? "Open 3D Model →" : "Buka Model 3D →"}
                    </button>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {lang === "en"
                      ? "Interactive procedural WebGL model of the VTOL QuadPlane with animated rotors and Euler HUD telemetry."
                      : "Model WebGL prosedural interaktif pesawat VTOL dengan rotor bergerak dan telemetri sudut Euler."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Interactive 3D Drone Model */}
        {activeTab === "3d" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-2xl border border-precision bg-[var(--bg-surface)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-precision">
                <div>
                  <span className="text-xs font-mono uppercase text-[#1652f0] font-bold block">
                    INTERACTIVE 3D VTOL AIRFRAME
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1">
                    Three.js Airframe Inspector &amp; Avionics Twin
                  </h2>
                </div>
                <p className="text-xs font-mono text-[var(--text-muted)] sm:text-right">
                  [ DRAG WITH MOUSE TO ROTATE 360° ]
                </p>
              </div>

              {/* 3D Canvas Container */}
              <div className="relative w-full h-[450px] sm:h-[550px] rounded-xl overflow-hidden bg-slate-950 border border-precision">
                <ThreeDDrone className="w-full h-full" interactive={true} />
              </div>

              {/* Specifications under 3D */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-mono text-[var(--text-secondary)]">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase">Airframe Type</span>
                  <span className="font-bold text-[var(--text-primary)]">VTOL QuadPlane</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase">Fuselage Material</span>
                  <span className="font-bold text-[var(--text-primary)]">Carbon Fiber Composite</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase">Lift Motors</span>
                  <span className="font-bold text-[var(--text-primary)]">4× Brushless Heavy-Lift</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase">Optical Mount</span>
                  <span className="font-bold text-[var(--text-primary)]">Nadir Camera Turret</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Computer Vision & ArUco Pipeline */}
        {activeTab === "vision" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6 animate-in fade-in duration-200">
            <VisionInspector />
          </section>
        )}

        {/* Tab 4: Avionics & Telemetry Architecture */}
        {activeTab === "hardware" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Architecture Topology */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-8 rounded-xl border border-precision bg-[var(--bg-surface)] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#1652f0] font-bold">
                    <Layers className="w-4 h-4" />
                    <span>DUAL-TIER SYSTEM TOPOLOGY</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    Hardware Interfacing &amp; Serial Bridge
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.details.architecture[lang]}
                  </p>

                  {/* ASCII / Diagram box */}
                  <div className="p-4 rounded-lg bg-[var(--bg-surface-elevated)] border border-precision font-mono text-xs text-[var(--text-secondary)] overflow-x-auto space-y-2">
                    <p className="text-[#1652f0] font-bold">{"// SYSTEM DATAFLOW"}</p>
                    <p>{"[ OPTICAL SENSOR ] ---> [ JETSON NANO (OpenCV) ]"}</p>
                    <p>{"                               |"}</p>
                    <p>{"                    (MAVLink @ 921.6k Baud)"}</p>
                    <p>{"                               v"}</p>
                    <p>{"[ CUBE ORANGE+ ] <---> [ ARDUPILOT EKF3 ] ---> [ PWM SERVOS / MOTORS ]"}</p>
                    <p>{"       ^"}</p>
                    <p>{"       |--- [ U-BLOX F9P RTK GNSS ]"}</p>
                    <p>{"       +--- [ 433MHz TELEMETRY RADIO ] ---> [ MISSION PLANNER GCS ]"}</p>
                  </div>
                </div>
              </div>

              {/* Hardware & Software Stacks */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-xl border border-precision bg-[var(--bg-surface)] space-y-3">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                    HARDWARE SPECIFICATION
                  </span>
                  <ul className="space-y-2 text-xs font-mono text-[var(--text-secondary)]">
                    {project.details.hardware.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1652f0]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-xl border border-precision bg-[var(--bg-surface)] space-y-3">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                    SOFTWARE &amp; PROTOCOL STACK
                  </span>
                  <ul className="space-y-2 text-xs font-mono text-[var(--text-secondary)]">
                    {project.details.software.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 5: Engineering Challenges & Lessons Learned */}
        {activeTab === "challenges" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-xl border border-precision bg-[var(--bg-surface)] space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-500 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>TECHNICAL ROADBLOCKS &amp; RESOLUTIONS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg border border-precision bg-[var(--bg-surface-elevated)] space-y-2">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    1. Ground Glare &amp; Runway Optical False Triggers
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Strong tropical sunlight reflecting off grass caused high-frequency false positives in raw contour thresholds. Solved by integrating CLAHE adaptive contrast normalization and a 3-frame temporal confirmation filter before setting the target lock flag.
                  </p>
                </div>

                <div className="p-5 rounded-lg border border-precision bg-[var(--bg-surface-elevated)] space-y-2">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    2. Serial Buffer Starvation under Camera Workloads
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Heavy OpenCV image processing on Jetson Nano caused telemetry heartbeat packet drops over UART. Solved by decoupling the MAVLink communication loop into a dedicated high-priority daemon thread with non-blocking queues.
                  </p>
                </div>

                <div className="p-5 rounded-lg border border-precision bg-[var(--bg-surface-elevated)] space-y-2">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    3. Actuator Back-EMF &amp; Electrical Isolation
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Sudden high-torque PWM servo gripper drops generated inductive voltage spikes on the avionics 5V bus. Solved by isolating servo power via a dedicated 5V UBEC regulator and optocoupled PWM signal conditioning.
                  </p>
                </div>

                <div className="p-5 rounded-lg border border-precision bg-[var(--bg-surface-elevated)] space-y-2">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    4. Failsafe Altitude Gating
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    To prevent accidental payload drops during taxiing or takeoff, implemented a dual-hysteresis altitude check (only active between 0.8m and 15.0m AGL), cross-checked against lidar and barometer readings.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Call to Action and Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-16">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-mono text-blue-300 uppercase tracking-wider">
                EXPLORE FURTHER
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Interested in this autonomous system or avionics architecture?
              </h3>
              <p className="text-sm text-blue-100 max-w-xl">
                I welcome discussions on UAV flight stacks, companion computer perception, and embedded systems engineering.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="px-6 py-3 rounded-full bg-white text-[#1652f0] font-mono text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                All Projects
              </Link>
              <Link
                href="/#contact"
                className="px-6 py-3 rounded-full border border-white/30 text-white font-mono text-xs font-bold hover:bg-white/10 transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ResumeModal />
    </div>
  );
}
