"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { GraduationCap, Wrench, ArrowUpRight } from "lucide-react";

export function AboutSection() {
  const { lang } = usePortfolio();

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-precision bg-[var(--bg-page)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authentic Portrait with Engineering Badge */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
              {/* Outer hairline border framing */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-precision bg-[var(--bg-surface-sunken)] shadow-lg">
                <Image
                  src="/gambarku.jpeg"
                  alt={PORTFOLIO_DATA.profile.name}
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 640px) 320px, 360px"
                  priority
                />
                {/* Tech reticle overlay */}
                <div className="reticle-corner pointer-events-none absolute inset-3" />
              </div>

              {/* Callout badge */}
              <div className="absolute -bottom-3 -right-3 p-3 rounded-lg border border-precision bg-[var(--bg-surface)] shadow-md text-xs font-mono">
                <span className="text-[10px] text-[var(--text-muted)] block uppercase">CALLSIGN</span>
                <span className="font-bold text-[var(--text-accent)] block">
                  {PORTFOLIO_DATA.profile.callsign}
                </span>
                <span className="text-[10px] text-[var(--text-secondary)]">
                  Yogyakarta, Indonesia
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Educational Background */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--accent-glow)] text-[var(--text-accent)] border border-precision mb-2">
                <GraduationCap className="w-3 h-3" />
                <span>ENGINEERING BACKGROUND</span>
                <span>{"//"}</span>
                <span>ACADEMIC PROFILE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1652f0]">
                ACADEMIC{" "}
                <span className="font-editorial-serif italic font-normal text-[var(--text-primary)]">
                  {lang === "en" ? "profile & background" : "profil & latar belakang"}
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              <p>
                {PORTFOLIO_DATA.profile.bio[lang]}
              </p>
              <p>
                {lang === "en"
                  ? "Rather than relying on abstract simulations alone, I value the discipline of taking physical hardware to the field: probing PWM pulse-widths with oscilloscopes, debugging MAVLink communication packet drops over serial UART, and tuning optical detection thresholds under bright outdoor sunlight."
                  : "Alih-alih hanya mengandalkan simulasi abstrak, saya terbiasa membawa perangkat keras langsung ke lapangan: menguji lebar pulsa PWM dengan osiloskop, melacak hilangnya paket komunikasi serial MAVLink, dan menyesuaikan ambang batas deteksi optik di bawah terik matahari."}
              </p>
            </div>

            {/* Academic & Focus Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg border border-precision bg-[var(--bg-surface)] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
                  <GraduationCap className="w-4 h-4 text-[var(--text-accent)]" />
                  <span>EDUCATION</span>
                </div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  Institut Teknologi Nasional Yogyakarta (ITNY)
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  B.Eng. in Electrical Engineering (S1 Teknik Elektro)
                </p>
              </div>

              <div className="p-4 rounded-lg border border-precision bg-[var(--bg-surface)] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
                  <Wrench className="w-4 h-4 text-[var(--text-accent)]" />
                  <span>METHODOLOGY</span>
                </div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  Physical Bench Testing &amp; Iteration
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Hardware-in-the-loop, telemetry logging, real field trials
                </p>
              </div>
            </div>

            {/* Read Full About Page CTA */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1652f0] hover:bg-[#1240c4] text-white font-mono text-xs font-bold transition-all shadow-sm"
              >
                <span>{lang === "en" ? "Read Full Engineering Dossier & Coursework" : "Baca Latar Belakang Lengkap & Silabus"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
