"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  Plane,
  Eye,
  Cpu,
  Code2,
  Activity,
  CheckCircle2,
  Wrench,
  ChevronRight,
} from "lucide-react";

export function SkillsMatrix() {
  const { lang } = usePortfolio();
  const [selectedGroup, setSelectedGroup] = useState<string>("robotics-uav");

  const getGroupIcon = (iconName: string) => {
    switch (iconName) {
      case "Plane":
        return <Plane className="w-4 h-4 text-[var(--text-accent)]" />;
      case "Eye":
        return <Eye className="w-4 h-4 text-[var(--text-accent)]" />;
      case "Cpu":
        return <Cpu className="w-4 h-4 text-[var(--text-accent)]" />;
      case "Code2":
        return <Code2 className="w-4 h-4 text-[var(--text-accent)]" />;
      case "Activity":
        return <Activity className="w-4 h-4 text-[var(--text-accent)]" />;
      default:
        return <Wrench className="w-4 h-4 text-[var(--text-accent)]" />;
    }
  };

  const activeGroup =
    PORTFOLIO_DATA.skillGroups.find((g) => g.id === selectedGroup) ||
    PORTFOLIO_DATA.skillGroups[0];

  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-precision bg-[var(--bg-page)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--accent-glow)] text-[var(--text-accent)] border border-precision mb-2">
            <span>ENGINEERING COMPETENCIES</span>
            <span>{"//"}</span>
            <span>EVIDENCE-BACKED MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1652f0]">
            TECHNICAL{" "}
            <span className="font-editorial-serif italic font-normal text-[var(--text-primary)]">
              {lang === "en" ? "capabilities" : "keahlian"}
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
            {lang === "en"
              ? "Grounded engineering skills demonstrated through physical UAV avionics builds, edge computer vision scripts, and hands-on laboratory diagnostics."
              : "Keahlian rekayasa nyata yang dibuktikan melalui perakitan avionik drone, skrip edge computer vision, dan diagnostik laboratorium langsung."}
          </p>
        </div>

        {/* Group Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {PORTFOLIO_DATA.skillGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={`p-3.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                selectedGroup === group.id
                  ? "border-[var(--text-accent)] bg-[var(--bg-surface)] shadow-xs ring-1 ring-[var(--text-accent)]/20"
                  : "border-precision bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded bg-[var(--bg-surface-elevated)]">
                  {getGroupIcon(group.icon)}
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {group.skills.length} SKILLS
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[var(--text-primary)] line-clamp-2">
                {group.title[lang]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Capability Panel */}
        <div className="p-6 sm:p-8 rounded-xl border border-precision bg-[var(--bg-surface)] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-precision">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-precision">
                {getGroupIcon(activeGroup.icon)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {activeGroup.title[lang]}
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)]">
                  {activeGroup.description[lang]}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono border border-precision bg-[var(--bg-surface-elevated)] text-[var(--telemetry-green)]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ACTIVE TESTBENCH VERIFIED</span>
            </span>
          </div>

          {/* Skill Items Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGroup.skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-lg border border-precision bg-[var(--bg-page)] hover:border-precision-strong transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[var(--text-primary)]">
                    {skill.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--bg-surface)] border border-precision text-[var(--text-accent)]">
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {skill.context[lang]}
                </p>
              </div>
            ))}
          </div>

          {/* Verified Technical Proof Notice */}
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-t border-precision">
            <span>{"//"} NO ARBITRARY PERCENTAGES — APPLIED TO ACTUAL PROJECTS</span>
            <a
              href="#projects"
              className="text-[var(--text-accent)] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <span>{lang === "en" ? "View in Projects" : "Lihat di Proyek"}</span>
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
