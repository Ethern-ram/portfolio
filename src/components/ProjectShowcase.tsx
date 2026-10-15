"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  ArrowUpRight,
  Plane,
  Eye,
  Cpu,
  Code2,
  Layers,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export function ProjectShowcase() {
  const { lang, activeProject, setActiveProject } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: { en: "All Engineering Projects", id: "Semua Proyek Rekayasa" } },
    { id: "uav", label: { en: "Autonomous UAV", id: "UAV Otonom" } },
    { id: "vision", label: { en: "Computer Vision", id: "Computer Vision" } },
    { id: "embedded", label: { en: "Embedded & IoT", id: "Embedded & IoT" } },
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
    <section id="projects" className="py-16 sm:py-24 border-b border-precision bg-[var(--bg-page)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--accent-glow)] text-[var(--text-accent)] border border-precision mb-2">
              <span>ENGINEERING PORTFOLIO</span>
              <span>{"//"}</span>
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1652f0]">
              SELECTED{" "}
              <span className="font-editorial-serif italic font-normal text-[var(--text-primary)]">
                {lang === "en" ? "works & systems" : "karya & sistem"}
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
              {lang === "en"
                ? "Physical hardware integrations, companion computer vision pipelines, and embedded telemetry systems developed with real constraints."
                : "Integrasi perangkat keras fisik, pipeline computer vision pada companion computer, dan sistem telemetri tertanam yang dibangun di atas batasan nyata."}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg border border-precision bg-[var(--bg-surface)]">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  selectedCategory === c.id
                    ? "bg-[var(--text-primary)] text-[var(--bg-page)] font-semibold shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
                }`}
              >
                {c.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group cursor-pointer rounded-lg border border-precision bg-[var(--bg-surface)] hover:border-precision-strong hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Visual Header / Thumbnail if available */}
                {project.primaryImage && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--bg-surface-sunken)] border-b border-precision">
                    <Image
                      src={project.primaryImage}
                      alt={project.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--bg-surface)]/90 backdrop-blur-xs text-[var(--text-primary)] border border-precision">
                      {getCategoryIcon(project.category)}
                      <span>{project.category.toUpperCase()}</span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--bg-surface)]/90 backdrop-blur-xs text-[var(--text-secondary)] border border-precision">
                      {project.date}
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[var(--telemetry-green)]" />
                      <span>{project.statusLabel[lang]}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--text-accent)] transition-colors leading-snug">
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

              {/* Bottom Tags & Detail CTA */}
              <div className="p-5 sm:p-6 pt-0 border-t border-precision bg-[var(--bg-surface)] mt-auto">
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

                <div className="flex items-center justify-between pt-2 border-t border-precision text-xs font-mono font-medium">
                  {project.id === "mavericks-guardian" ? (
                    <Link
                      href="/projects/mavericks-guardian"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#1652f0] font-bold flex items-center gap-1.5 hover:underline"
                    >
                      <span>{lang === "en" ? "Dedicated KRTI Case Study" : "Studi Kasus Lengkap KRTI"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="text-[var(--text-accent)]">
                      {lang === "en" ? "Inspect Technical Breakdown" : "Buka Rincian Teknis"}
                    </span>
                  )}
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Archive Link to /projects */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-precision bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] hover:border-[#1652f0] text-[var(--text-primary)] font-mono text-xs font-semibold transition-all shadow-xs"
          >
            <span>
              {lang === "en"
                ? "Browse Complete Projects Archive (5 Engineering Projects)"
                : "Lihat Semua Arsip Proyek (5 Proyek Rekayasa)"}
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#1652f0]" />
          </Link>
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-precision-strong bg-[var(--bg-surface)] shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-precision">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--accent-glow)] text-[var(--text-accent)] border border-precision">
                    {activeProject.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {activeProject.date}
                  </span>
                  <span className="text-xs font-mono text-[var(--telemetry-green)]">
                    {"//"} {activeProject.statusLabel[lang]}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                  {activeProject.title}
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  {activeProject.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-lg border border-precision bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-sunken)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gallery if available */}
            {activeProject.galleryImages && activeProject.galleryImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-lg border border-precision bg-[var(--bg-page)]">
                {activeProject.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded border border-precision overflow-hidden bg-black/10"
                  >
                    <Image
                      src={img}
                      alt={`${activeProject.title} asset ${idx}`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Metrics Grid */}
            {activeProject.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeProject.metrics.map((m) => (
                  <div key={m.label} className="p-3 rounded border border-precision bg-[var(--bg-page)] text-xs font-mono">
                    <span className="text-[10px] text-[var(--text-muted)] block">{m.label}</span>
                    <span className="font-bold text-[var(--text-primary)] mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Deep Technical Sections */}
            <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
              <div className="p-4 rounded border border-precision bg-[var(--bg-page)] space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--telemetry-green)]" />
                  <span>{lang === "en" ? "Problem Statement & Objective" : "Tujuan & Permasalahan"}</span>
                </h4>
                <p>{activeProject.details.objective[lang]}</p>
              </div>

              <div className="p-4 rounded border border-precision bg-[var(--bg-page)] space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[var(--text-accent)]" />
                  <span>{lang === "en" ? "My Personal Contribution" : "Kontribusi Saya"}</span>
                </h4>
                <p>{activeProject.details.myContribution[lang]}</p>
              </div>

              <div className="p-4 rounded border border-precision bg-[var(--bg-page)] space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[var(--text-accent)]" />
                  <span>{lang === "en" ? "System Architecture & Flow" : "Arsitektur Sistem & Alur"}</span>
                </h4>
                <p>{activeProject.details.architecture[lang]}</p>
              </div>

              {/* Hardware & Software Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded border border-precision bg-[var(--bg-page)]">
                  <span className="font-bold text-[var(--text-primary)] block mb-1.5">
                    {lang === "en" ? "HARDWARE & SENSORS" : "PERANGKAT KERAS & SENSOR"}
                  </span>
                  <ul className="space-y-1 text-[var(--text-muted)]">
                    {activeProject.details.hardware.map((h) => (
                      <li key={h}>• {h}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded border border-precision bg-[var(--bg-page)]">
                  <span className="font-bold text-[var(--text-primary)] block mb-1.5">
                    {lang === "en" ? "SOFTWARE & PROTOCOLS" : "PERANGKAT LUNAK & PROTOKOL"}
                  </span>
                  <ul className="space-y-1 text-[var(--text-muted)]">
                    {activeProject.details.software.map((s) => (
                      <li key={s}>• {s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Challenges & Limitations */}
              <div className="p-4 rounded border border-precision bg-[var(--bg-page)] space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>{lang === "en" ? "Field Challenges & Lessons Learned" : "Tantangan & Pelajaran Lapangan"}</span>
                </h4>
                <p>{activeProject.details.challenges[lang]}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-precision text-xs font-mono">
              <span className="text-[var(--text-muted)]">
                ERLANGGA LAB // CASE STUDY ARCHIVE
              </span>
              <button
                onClick={() => setActiveProject(null)}
                className="px-4 py-2 rounded bg-[var(--text-primary)] text-[var(--bg-page)] font-semibold hover:opacity-90 transition-opacity"
              >
                {lang === "en" ? "Close Inspector" : "Tutup Inspektor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
