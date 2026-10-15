"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { ResumeModal } from "@/components/ResumeModal";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  GraduationCap,
  Wrench,
  BookOpen,
  CheckCircle2,
  FileText,
  ArrowUpRight,
} from "lucide-react";

export default function AboutPage() {
  const { lang, setIsResumeOpen } = usePortfolio();

  const academicCoursework = [
    { title: "Control Systems & Dynamic Modeling", code: "EE-301", desc: "Transfer functions, PID tuning, root locus stability analysis" },
    { title: "Embedded Microcontrollers & Architectures", code: "EE-304", desc: "ARM Cortex-M, ESP32, interrupt vectors, timers & DMA" },
    { title: "Signals & Linear Systems", code: "EE-205", desc: "Fourier analysis, digital filtering, convolution" },
    { title: "Electronic Circuits & PCB Prototyping", code: "EE-202", desc: "Op-amps, transistor biasing, schematic capture, ground plane layout" },
    { title: "Sensors & Industrial Instrumentation", code: "EE-310", desc: "Transducer interfacing, 4-20mA loops, ADC calibration, noise isolation" },
    { title: "Electrical Power & Drive Systems", code: "EE-315", desc: "Brushless DC motor drivers, PWM switching, power distribution" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navigation />

      <main className="flex-1 pb-24">
        {/* Page Header */}
        <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-16 border-b border-precision bg-[var(--bg-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-precision bg-[var(--bg-surface-elevated)] text-[11px] font-mono text-[#1652f0] font-bold mb-3">
              <span>ENGINEER DOSSIER</span>
              <span>{"//"}</span>
              <span>BIOGRAPHY &amp; CAPABILITIES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1652f0]">
              ABOUT{" "}
              <span className="font-editorial-serif italic font-normal text-[var(--text-primary)]">
                erlangga pradana
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl leading-relaxed">
              {lang === "en"
                ? "Electrical Engineering undergraduate at Institut Teknologi Nasional Yogyakarta (ITNY) exploring hardware-software integration, embedded firmware, computer vision, and physical systems."
                : "Mahasiswa S1 Teknik Elektro di Institut Teknologi Nasional Yogyakarta (ITNY) yang mendalami integrasi perangkat keras-lunak, firmware tertanam, computer vision, dan sistem fisik nyata."}
            </p>
          </div>
        </section>

        {/* Narrative & Profile Layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Portrait & Quick Dossier */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-precision bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 shadow-xl">
                <Image
                  src="/gambarku.jpeg"
                  alt="Erlangga Pradana Kurniawan"
                  fill
                  priority
                  className="object-cover object-top filter brightness-95 contrast-105"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white p-2">
                  <p className="font-black text-lg tracking-tight">Erlangga Pradana Kurniawan</p>
                  <p className="text-xs font-mono text-blue-200">Electrical Engineering • ITNY</p>
                </div>
              </div>

              {/* Verified Identity Card */}
              <div className="p-6 rounded-2xl border border-precision bg-[var(--bg-surface)] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#1652f0] font-bold">
                  <GraduationCap className="w-4 h-4" />
                  <span>ACADEMIC AFFILIATION</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-precision pb-2">
                    <span className="text-[var(--text-muted)]">Institution</span>
                    <span className="font-semibold text-right">Institut Teknologi Nasional Yogyakarta (ITNY)</span>
                  </div>
                  <div className="flex justify-between border-b border-precision pb-2">
                    <span className="text-[var(--text-muted)]">Major</span>
                    <span className="font-semibold">Electrical Engineering</span>
                  </div>
                  <div className="flex justify-between border-b border-precision pb-2">
                    <span className="text-[var(--text-muted)]">Degree</span>
                    <span className="font-semibold">B.Eng. Candidate (Undergraduate)</span>
                  </div>
                  <div className="flex justify-between border-b border-precision pb-2">
                    <span className="text-[var(--text-muted)]">Location</span>
                    <span className="font-semibold">Yogyakarta, Indonesia</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[var(--text-muted)]">Primary Focus</span>
                    <span className="font-semibold text-right">Embedded, Vision, Robotics, IoT</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="w-full py-3 rounded-full bg-[#1652f0] hover:bg-[#1240c4] text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{lang === "en" ? "View Full Technical CV" : "Buka CV Teknis Lengkap"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative, Philosophy, and Academic Coursework */}
            <div className="lg:col-span-7 space-y-10">
              {/* Engineering Philosophy */}
              <div className="p-6 sm:p-8 rounded-2xl border border-precision bg-[var(--bg-surface)] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#1652f0] font-bold">
                  <Wrench className="w-4 h-4" />
                  <span>ENGINEERING PHILOSOPHY &amp; APPROACH</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  {lang === "en" ? "Where Physical Electronics Meets Deterministic Code" : "Pertemuan Elektronika Fisik & Kode Deterministik"}
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {lang === "en"
                    ? "In an era of purely simulated software, my passion lies at the boundary where electrons flow through copper traces, sensors convert physical reality into data bytes, and microcontrollers execute precise motor actions. Whether tuning PID loops, debugging UART timing skew on a digital oscilloscope, or deploying computer vision models on edge GPUs, I believe in grounding every abstraction in physical proof."
                    : "Di era perangkat lunak yang serba simulasi, minat terdalam saya berada pada titik batas di mana elektron mengalir melalui jalur tembaga, sensor mengubah realitas fisik menjadi data biner, dan mikrokontroler mengeksekusi gerakan motor yang presisi. Baik saat menyetel kontrol PID, menganalisis sinyal UART dengan osiloskop digital, atau menerapkan model computer vision pada edge GPU, saya percaya setiap konsep harus dibuktikan di atas perangkat keras nyata."}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {lang === "en"
                    ? "As an Electrical Engineering undergraduate at ITNY, I combine classroom fundamentals in circuit analysis, dynamic systems, and instrumentation with practical robotics laboratory testing, embedded firmware development (C/C++), and edge AI integration."
                    : "Sebagai mahasiswa S1 Teknik Elektro di ITNY, saya memadukan fondasi akademik dalam analisis rangkaian, sistem dinamis, dan instrumentasi dengan eksperimen langsung di laboratorium robotika, pengembangan firmware tertanam (C/C++), dan integrasi edge AI."}
                </p>
              </div>

              {/* Coursework & Technical Foundation */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#1652f0] font-bold">
                  <BookOpen className="w-4 h-4" />
                  <span>CORE ACADEMIC HIGHLIGHTS &amp; FOUNDATIONS</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  Electrical Engineering Curriculum Competencies
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {academicCoursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-precision bg-[var(--bg-surface)] hover:border-[#1652f0]/40 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] text-[#1652f0] font-bold">
                          {course.code}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                        {course.title}
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {course.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Toolchains & Lab Instruments */}
              <div className="p-6 rounded-2xl border border-precision bg-[var(--bg-surface-elevated)] space-y-4">
                <span className="text-xs font-mono text-[#1652f0] font-bold uppercase tracking-wider block">
                  LABORATORY &amp; WORKBENCH TOOLCHAIN
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[var(--text-secondary)]">
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase">Instruments</span>
                    <span className="font-bold text-[var(--text-primary)]">DSO, Multimeter, Logic Analyzer</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase">Embedded Stacks</span>
                    <span className="font-bold text-[var(--text-primary)]">FreeRTOS, ESP-IDF, ArduPilot</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase">Computing</span>
                    <span className="font-bold text-[var(--text-primary)]">Linux, POSIX, OpenCV, Python</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase">Protocols</span>
                    <span className="font-bold text-[var(--text-primary)]">UART, I2C, SPI, MAVLink, MQTT</span>
                  </div>
                </div>
              </div>

              {/* Direct Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1652f0] hover:bg-[#1240c4] text-white font-mono text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <span>Explore Engineering Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-precision hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-mono text-xs font-bold transition-colors"
                >
                  <span>Direct Contact / Inquiries</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ResumeModal />
    </div>
  );
}
