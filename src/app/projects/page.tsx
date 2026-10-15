"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { ResumeModal } from "@/components/ResumeModal";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  ArrowUpRight,
  Plane,
  Eye,
  Cpu,
  Code2,
  X,
} from "lucide-react";

export default function ProjectsPage() {
  const { lang, activeProject, setActiveProject } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: { en: "All Engineering Projects", id: "Semua Proyek Rekayasa" } },
    { id: "embedded", label: { en: "Embedded & IoT", id: "Sistem Tertanam & IoT" } },
    { id: "vision", label: { en: "Computer Vision", id: "Computer Vision" } },
    { id: "uav", label: { en: "Robotics & UAV", id: "Robotika & UAV" } },
    { id: "software", label: { en: "Software Tools", id: "Alat Perangkat Lunak" } },
  ];

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "uav":
        return <Plane className="w-3.5 h-3.5" />;
      case "vision":
        return <Eye className="w-3.5 h-3.5" />;
      case "embedded":
        return <Cpu className="w-3.5 h-3.5" />;
      default:
        return <Code2 className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navigation />

      <main className="flex-1 pb-24">
        {/* Page Header */}
        <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-16 border-b border-precision bg-[var(--bg-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-precision bg-[var(--bg-surface-elevated)] text-[11px] font-mono text-[#1652f0] font-bold mb-3">
                  <span>ENGINEERING ARCHIVE</span>
                  <span>{"//"}</span>
                  <span>PROJECT INDEX</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1652f0]">
                  ENGINEERING{" "}
                  <span className="font-editorial-serif italic font-normal text-[var(--text-primary)]">
                    {lang === "en" ? "works & systems" : "karya & sistem"}
                  </span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                  {lang === "en"
                    ? "Physical hardware integrations, embedded microcontrollers, edge computer vision pipelines, and web telemetry dashboards engineered with real constraints."
                    : "Integrasi perangkat keras fisik, mikrokontroler tertanam, pipeline edge computer vision, dan dashboard telemetri web yang dibangun di atas batasan nyata."}
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5 p-1 rounded-xl border border-precision bg-[var(--bg-surface-elevated)] self-start md:self-auto">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      selectedCategory === c.id
                        ? "bg-[#1652f0] text-white shadow-xs font-bold"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                    }`}
                  >
                    {c.label[lang]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => {
                  if (project.id !== "mavericks-guardian") {
                    setActiveProject(project);
                  }
                }}
                className="group cursor-pointer rounded-2xl border border-precision bg-[var(--bg-surface)] hover:border-[#1652f0]/60 hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Thumbnail / Visual Header */}
                  {project.primaryImage && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--bg-surface-sunken)] border-b border-precision">
                      <Image
                        src={project.primaryImage}
                        alt={project.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-[var(--bg-surface)]/90 backdrop-blur-xs text-[var(--text-primary)] border border-precision shadow-xs font-bold">
                        {getCategoryIcon(project.category)}
                        <span>{project.category.toUpperCase()}</span>
                      </div>

                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-[var(--bg-surface)]/90 backdrop-blur-xs text-[var(--text-secondary)] border border-precision shadow-xs">
                        {project.date}
                      </div>
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{project.statusLabel[lang]}</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[#1652f0] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs font-mono text-[var(--text-muted)]">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {project.summary[lang]}
                    </p>
                  </div>
                </div>

                {/* Card Footer & Action */}
                <div className="p-6 pt-0 border-t border-precision bg-[var(--bg-surface)] mt-auto">
                  <div className="flex flex-wrap gap-1.5 pt-3 pb-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono border border-precision bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-precision text-xs font-mono font-medium">
                    {project.id === "mavericks-guardian" ? (
                      <Link
                        href="/projects/mavericks-guardian"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#1652f0] font-bold flex items-center gap-1.5 hover:underline"
                      >
                        <span>{lang === "en" ? "Dedicated KRTI 2026 Case Study" : "Studi Kasus Lengkap KRTI"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => setActiveProject(project)}
                        className="text-[#1652f0] flex items-center gap-1.5 hover:underline cursor-pointer"
                      >
                        <span>{lang === "en" ? "Inspect Technical Breakdown" : "Buka Rincian Teknis"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Project Detail Modal for non-KRTI projects */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-precision bg-[var(--bg-surface)] shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-precision">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1652f0]/10 text-[#1652f0] border border-[#1652f0]/30 font-bold">
                    {activeProject.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {activeProject.date}
                  </span>
                  <span className="text-xs font-mono text-emerald-500 font-semibold">
                    {"//"} {activeProject.statusLabel[lang]}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  {activeProject.title}
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  {activeProject.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 rounded-full border border-precision text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Metrics Grid */}
            {activeProject.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border border-precision bg-[var(--bg-surface-elevated)]">
                {activeProject.metrics.map((m, idx) => (
                  <div key={idx}>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
                      {m.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-mono text-[var(--text-primary)]">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Details */}
            <div className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">
                  {lang === "en" ? "ENGINEERING OBJECTIVE" : "TUJUAN REKAYASA"}
                </h4>
                <p>{activeProject.details.objective[lang]}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">
                  {lang === "en" ? "SYSTEM ARCHITECTURE" : "ARSITEKTUR SISTEM"}
                </h4>
                <p>{activeProject.details.architecture[lang]}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#1652f0] font-bold mb-1">
                  {lang === "en" ? "MY CONTRIBUTION" : "KONTRIBUSI SAYA"}
                </h4>
                <p>{activeProject.details.myContribution[lang]}</p>
              </div>

              {/* Hardware & Software Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-lg border border-precision bg-[var(--bg-surface-elevated)] space-y-1.5">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold block">
                    HARDWARE INVOLVED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.details.hardware.map((h, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface)] border border-precision text-[var(--text-primary)]">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-precision bg-[var(--bg-surface-elevated)] space-y-1.5">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold block">
                    SOFTWARE &amp; PROTOCOLS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.details.software.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface)] border border-precision text-[var(--text-primary)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-amber-500 font-bold mb-1">
                  {lang === "en" ? "TECHNICAL CHALLENGES RESOLVED" : "TANTANGAN TEKNIS TERSELESAIKAN"}
                </h4>
                <p>{activeProject.details.challenges[lang]}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-precision flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveProject(null)}
                className="px-5 py-2.5 rounded-full border border-precision text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
              >
                {lang === "en" ? "Close Inspection" : "Tutup"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ResumeModal />
    </div>
  );
}
