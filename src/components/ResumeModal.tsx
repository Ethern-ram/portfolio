"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { X, Printer, Mail, MapPin } from "lucide-react";
import { GithubIcon } from "./Icons";

export function ResumeModal() {
  const { lang, isResumeOpen, setIsResumeOpen } = usePortfolio();

  if (!isResumeOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-xl border border-precision-strong bg-[var(--bg-surface)] shadow-2xl p-6 sm:p-10 space-y-8 print:p-0 print:border-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-precision print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--telemetry-green)]" />
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
              {lang === "en" ? "TECHNICAL CURRICULUM VITAE" : "RINGKASAN CV TEKNIS"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border border-precision bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-sunken)] text-[var(--text-primary)] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Print / Save PDF" : "Cetak / Simpan PDF"}</span>
            </button>
            <button
              onClick={() => setIsResumeOpen(false)}
              className="p-1.5 rounded-lg border border-precision bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-sunken)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 border-b border-precision pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              {PORTFOLIO_DATA.profile.name}
            </h1>
            <p className="text-sm font-mono text-[var(--text-accent)] font-semibold">
              {PORTFOLIO_DATA.profile.role[lang]}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)] pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>{PORTFOLIO_DATA.profile.location}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>{PORTFOLIO_DATA.profile.email}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <GithubIcon className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>github.com/{PORTFOLIO_DATA.profile.githubUsername}</span>
              </span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold">
              {lang === "en" ? "EDUCATION & INSTITUTION" : "PENDIDIKAN & INSTITUSI"}
            </h2>
            <div className="p-4 rounded-lg border border-precision bg-[var(--bg-page)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[var(--text-primary)]">
                  Institut Teknologi Nasional Yogyakarta (ITNY)
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {lang === "en" ? "Undergraduate Degree" : "Jenjang S1"}
                </span>
              </div>
              <p className="text-xs font-semibold text-[var(--text-secondary)]">
                Bachelor of Engineering in Electrical Engineering (Teknik Elektro)
              </p>
              <p className="text-xs text-[var(--text-muted)] pt-1">
                Focus Areas: Robotics, Autonomous UAV Control, Embedded Edge Computing, Computer Vision.
              </p>
            </div>
          </div>

          {/* Featured Technical Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold">
              {lang === "en" ? "KEY ENGINEERING PROJECTS" : "PROYEK REKAYASA UTAMA"}
            </h2>

            <div className="space-y-3">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-lg border border-precision bg-[var(--bg-page)] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-sm text-[var(--text-primary)]">
                      {proj.title}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-accent)]">
                      {proj.date}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {proj.summary[lang]}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[9px] font-mono border border-precision bg-[var(--bg-surface)] text-[var(--text-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold">
              {lang === "en" ? "TECHNICAL COMPETENCIES" : "KOMPETENSI TEKNIS"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded border border-precision bg-[var(--bg-page)]">
                <span className="font-bold text-[var(--text-primary)] block mb-1">
                  Robotics &amp; Flight Avionics
                </span>
                <span className="text-[var(--text-muted)] leading-relaxed">
                  Cube Orange+, ArduPilot VTOL, MAVLink (PyMAVLink), Mission Planner, U-Blox RTK GNSS.
                </span>
              </div>

              <div className="p-3 rounded border border-precision bg-[var(--bg-page)]">
                <span className="font-bold text-[var(--text-primary)] block mb-1">
                  Perception &amp; Computer Vision
                </span>
                <span className="text-[var(--text-muted)] leading-relaxed">
                  OpenCV 4.5, ArUco Marker DICT_4X4_50, CLAHE Normalization, Homography Rectification.
                </span>
              </div>

              <div className="p-3 rounded border border-precision bg-[var(--bg-page)]">
                <span className="font-bold text-[var(--text-primary)] block mb-1">
                  Embedded &amp; Systems
                </span>
                <span className="text-[var(--text-muted)] leading-relaxed">
                  NVIDIA Jetson Nano, ESP32, C/C++, FreeRTOS, UART/I2C/SPI serial buses, Linux Ubuntu.
                </span>
              </div>

              <div className="p-3 rounded border border-precision bg-[var(--bg-page)]">
                <span className="font-bold text-[var(--text-primary)] block mb-1">
                  Software &amp; Interfaces
                </span>
                <span className="text-[var(--text-muted)] leading-relaxed">
                  Python 3, TypeScript, React 19, Next.js App Router, Tailwind CSS, MQTT, WebSockets.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Close CTA */}
        <div className="pt-4 border-t border-precision flex items-center justify-between text-xs font-mono print:hidden">
          <span className="text-[var(--text-muted)]">ERLANGGA LAB 2.0 // ITNY</span>
          <button
            onClick={() => setIsResumeOpen(false)}
            className="px-4 py-2 rounded bg-[var(--text-primary)] text-[var(--bg-page)] font-semibold hover:opacity-90 transition-opacity"
          >
            {lang === "en" ? "Close CV" : "Tutup CV"}
          </button>
        </div>
      </div>
    </div>
  );
}
