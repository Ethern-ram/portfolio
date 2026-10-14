"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { Terminal, ChevronDown, ChevronUp } from "lucide-react";

export function FieldLogs() {
  const { lang } = usePortfolio();
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>("LOG-006");

  const filteredLogs = PORTFOLIO_DATA.fieldLogs.filter((log) => {
    if (filter === "all") return true;
    return log.tag === filter;
  });

  return (
    <section id="field-logs" className="py-16 sm:py-24 border-b border-precision bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--accent-glow)] text-[var(--text-accent)] border border-precision mb-2">
              <Terminal className="w-3 h-3" />
              <span>CHRONOLOGICAL RESEARCH ARCHIVE</span>
              <span>{"//"}</span>
              <span>LAB NOTEBOOK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              {lang === "en" ? "Engineering Field Logs" : "Catatan Rekayasa Lapangan"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
              {lang === "en"
                ? "Documenting hardware-in-the-loop tests, optical tuning breakthroughs, and system integration lessons as they happened."
                : "Dokumentasi pengujian hardware-in-the-loop, penyempurnaan optik, dan pelajaran integrasi sistem dari lapangan."}
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg border border-precision bg-[var(--bg-page)] text-xs font-mono">
            {["all", "uav", "vision", "embedded", "education"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded transition-colors ${
                  filter === f
                    ? "bg-[var(--text-primary)] text-[var(--bg-page)] font-semibold shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Logs Timeline List */}
        <div className="space-y-3">
          {filteredLogs.map((log) => {
            const isExpanded = expandedId === log.id;
            return (
              <div
                key={log.id}
                className="rounded-lg border border-precision bg-[var(--bg-page)] hover:border-precision-strong transition-all overflow-hidden"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : log.id)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs font-bold text-[var(--text-accent)]">
                        {log.id}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[var(--bg-surface)] border border-precision text-[var(--text-muted)]">
                        {log.badge}
                      </span>
                    </div>

                    <h3 className="font-mono text-sm font-bold text-[var(--text-primary)] truncate">
                      {log.title[lang]}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline">
                      {log.date}
                    </span>
                    <div className="p-1 rounded bg-[var(--bg-surface)] border border-precision text-[var(--text-muted)]">
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-precision text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3 bg-[var(--bg-surface)]/40">
                    <p>{log.content[lang]}</p>
                    {log.metrics && (
                      <div className="p-2.5 rounded border border-precision bg-[var(--bg-surface)] font-mono text-[11px] text-[var(--text-accent)] flex items-center justify-between">
                        <span>LOGGED TELEMETRY:</span>
                        <strong className="text-[var(--text-primary)]">{log.metrics}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
