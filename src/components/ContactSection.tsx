"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  Mail,
  Check,
  Copy,
  ExternalLink,
  MapPin,
  Send,
} from "lucide-react";
import { GithubIcon } from "./Icons";

export function ContactSection() {
  const { lang } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "ERLANGGA LAB DIAGNOSTIC TERMINAL [REV 2.0]",
    "Type 'help' to inspect available system queries.",
  ]);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, `$ ${terminalInput}`];

    switch (cmd) {
      case "help":
        newLogs.push(
          "Available commands:",
          "  whoami      - Display engineer identity & institution",
          "  avionics    - Inspect UAV & companion computer hardware stack",
          "  status      - Display current laboratory status",
          "  contact     - Print verified communication endpoints",
          "  clear       - Clear terminal buffer"
        );
        break;
      case "whoami":
        newLogs.push(
          "Erlangga Pradana Kurniawan",
          "Undergraduate, Electrical Engineering @ Institut Teknologi Nasional Yogyakarta (ITNY)",
          "Interests: Autonomous UAVs, Embedded Computing, Computer Vision, MAVLink"
        );
        break;
      case "avionics":
        newLogs.push(
          "Flight Controller: Cube Orange+ (ArduPilot VTOL QuadPlane)",
          "Companion Computer: NVIDIA Jetson Nano (4GB Developer Kit)",
          "GNSS / Navigation: U-Blox F9P RTK Multi-Band Base & Rover",
          "Serial Bus: MAVLink @ 921,600 bps UART (/dev/ttyACM0)",
          "Vision Perception: OpenCV 4.5.0 with ArUco DICT_4X4_50 Decoders"
        );
        break;
      case "status":
        newLogs.push(
          "LAB STATE: ACTIVE",
          "Location: Yogyakarta, Indonesia (UTC+7)",
          "Current Work: KRTI 2026 VTOL Autonomous Perception & Drop System",
          "Signal: Voltage stable // Telemetry link verified"
        );
        break;
      case "contact":
        newLogs.push(
          `Email: ${PORTFOLIO_DATA.profile.email}`,
          `GitHub: ${PORTFOLIO_DATA.profile.github}`
        );
        break;
      case "clear":
        setTerminalLogs(["ERLANGGA LAB TERMINAL BUFFER CLEARED"]);
        setTerminalInput("");
        return;
      default:
        newLogs.push(`Command not recognized: '${cmd}'. Type 'help' for valid commands.`);
        break;
    }

    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact & Action Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--accent-glow)] text-[var(--text-accent)] border border-precision mb-2">
                <Mail className="w-3 h-3" />
                <span>OPEN COMMUNICATION CHANNEL</span>
                <span>{"//"}</span>
                <span>DIRECT INQUIRIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                {lang === "en" ? "Let's build something technically sound." : "Mari membangun sistem yang andal."}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {lang === "en"
                  ? "Available for engineering internships, technical collaborations, autonomous robotics initiatives, and embedded systems development."
                  : "Terbuka untuk peluang magang teknik, kolaborasi teknis, inisiatif robotika otonom, dan pengembangan sistem tertanam."}
              </p>
            </div>

            {/* Email Card with 1-Click Copy */}
            <div className="p-5 rounded-lg border border-precision bg-[var(--bg-page)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase">
                  DIRECT EMAIL INBOX
                </span>
                <span className="text-xs font-mono text-[var(--telemetry-green)]">
                  ACTIVE
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded border border-precision bg-[var(--bg-surface)]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-[var(--text-accent)] shrink-0" />
                  <span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                    {PORTFOLIO_DATA.profile.email}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border border-precision bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-sunken)] text-[var(--text-primary)] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[var(--telemetry-green)]" />
                        <span className="text-[var(--telemetry-green)] font-semibold">
                          {lang === "en" ? "Copied" : "Tersalin"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === "en" ? "Copy Email" : "Salin Email"}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                    className="p-1.5 rounded border border-precision bg-[var(--text-primary)] text-[var(--bg-page)] hover:opacity-90 transition-opacity"
                    title="Send Email"
                    aria-label="Send email"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Profile Card */}
            <div className="p-5 rounded-lg border border-precision bg-[var(--bg-page)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase">
                  CODE &amp; REPOSITORIES
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  GITHUB
                </span>
              </div>

              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded border border-precision bg-[var(--bg-surface)] hover:border-precision-strong transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[var(--text-primary)]" />
                  <div>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--text-accent)] transition-colors block">
                      github.com/{PORTFOLIO_DATA.profile.githubUsername}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      Explore code repositories &amp; experiments
                    </span>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-accent)] transition-colors" />
              </a>
            </div>

            {/* Location & Academic Base */}
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] px-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--text-accent)]" />
              <span>Yogyakarta, Indonesia // Institut Teknologi Nasional Yogyakarta</span>
            </div>
          </div>

          {/* Right Column: Interactive Diagnostic Terminal */}
          <div className="lg:col-span-6 rounded-lg border border-precision bg-[var(--bg-surface-sunken)] overflow-hidden shadow-md font-mono text-xs">
            {/* Terminal Top Window Bar */}
            <div className="px-4 py-2.5 border-b border-precision bg-[var(--bg-surface-elevated)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-bold text-[var(--text-primary)]">
                  erlangga-lab@itny-workstation:~$
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">BASH 5.2</span>
            </div>

            {/* Terminal Buffer */}
            <div className="p-4 sm:p-5 h-72 overflow-y-auto space-y-1.5 text-[var(--text-secondary)] bg-black/5 dark:bg-black/40">
              {terminalLogs.map((log, index) => (
                <div
                  key={index}
                  className={
                    log.startsWith("$")
                      ? "text-[var(--text-accent)] font-semibold"
                      : log.startsWith("ERLANGGA") || log.startsWith("LAB STATE")
                      ? "text-[var(--text-primary)] font-bold"
                      : ""
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Terminal Command Input Form */}
            <form onSubmit={handleCommand} className="flex border-t border-precision bg-[var(--bg-surface)]">
              <div className="px-3 py-2.5 text-[var(--text-accent)] font-bold flex items-center">
                $
              </div>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'help', 'whoami', 'avionics', 'status'..."
                className="flex-1 py-2.5 px-2 bg-transparent text-[var(--text-primary)] focus:outline-none placeholder:text-[var(--text-muted)]/60 font-mono text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-sunken)] text-[var(--text-primary)] font-semibold border-l border-precision transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Global Footer */}
        <div className="mt-16 pt-8 border-t border-precision flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div>
            <span>© {new Date().getFullYear()} Erlangga Pradana Kurniawan — Erlangga Lab 2.0</span>
            <span className="block text-[10px] text-[var(--text-muted)]/70 mt-0.5">
              Electrical Engineering • Institut Teknologi Nasional Yogyakarta
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#hero"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Back to Top ↑
            </a>
            <span>{"//"}</span>
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
            >
              <GithubIcon className="w-3 h-3" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
