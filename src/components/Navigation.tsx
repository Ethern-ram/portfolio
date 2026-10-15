"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Moon,
  Sun,
  Globe,
  FileText,
  X,
  Mail,
  ExternalLink,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function Navigation() {
  const { lang, toggleLang, toggleTheme, setIsResumeOpen } = usePortfolio();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: { en: "Home", id: "Beranda" } },
    { href: "/projects", label: { en: "All Projects", id: "Semua Proyek" } },
    { href: "/projects/mavericks-guardian", label: { en: "KRTI UAV Case Study", id: "Studi Kasus VTOL KRTI" } },
    { href: "/about", label: { en: "About & Background", id: "Tentang & Latar Belakang" } },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-page)]/90 backdrop-blur-md transition-colors border-b border-precision">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Brand Wordmark matching reference MILAR. -> ERLANGGA. */}
          <Link
            href="/"
            className="flex items-baseline gap-1 group focus:outline-none"
            aria-label="Erlangga Lab Home"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-electric)] transition-colors">
              ERLANGGA.
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]">
              ITNY / EE
            </span>
          </Link>

          {/* Center: / CHANGE THE MODE Pill Button (from reference image) */}
          {/* Center: / CHANGE THE MODE Pill Button (from reference image) */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-black/15 dark:border-white/20 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] hover:border-[var(--accent-electric)] text-[var(--text-primary)] transition-all shadow-xs hover:shadow-sm group cursor-pointer"
              title="Toggle theme (Light / Dark)"
              aria-label="Change color mode"
            >
              <span className="text-xs font-mono font-medium text-[var(--text-muted)] group-hover:text-[var(--accent-electric)] transition-colors">
                /
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wide uppercase">
                CHANGE THE MODE
              </span>
              <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform hidden dark:block" />
              <Moon className="w-3.5 h-3.5 text-slate-700 group-hover:-rotate-12 transition-transform block dark:hidden" />
            </button>

            {/* Quick Lang Switcher */}
            <button
              onClick={toggleLang}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-precision text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors"
              title="Switch language (EN / ID)"
            >
              <Globe className="w-3 h-3 text-[var(--accent-electric)]" />
              <span className="font-bold">{lang.toUpperCase()}</span>
            </button>
          </div>

          {/* Right: Quick Links + Minimalist Hamburger Menu (=) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/projects"
              className={`hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors ${
                pathname === "/projects"
                  ? "bg-[var(--text-primary)] text-[var(--bg-page)] font-bold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {lang === "en" ? "Projects" : "Proyek"}
            </Link>

            <Link
              href="/about"
              className={`hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors ${
                pathname === "/about"
                  ? "bg-[var(--text-primary)] text-[var(--bg-page)] font-bold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {lang === "en" ? "About" : "Tentang"}
            </Link>

            <button
              onClick={() => setIsResumeOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-[var(--bg-surface)] border border-precision hover:border-[var(--accent-electric)] text-[var(--text-primary)] transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--accent-electric)]" />
              <span>{lang === "en" ? "CV" : "Resume"}</span>
            </button>

            {/* Minimalist Hamburger Button (=) */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-11 h-11 rounded-full border border-black/15 dark:border-white/20 hover:border-[var(--accent-electric)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] flex flex-col items-center justify-center gap-1.5 group transition-all cursor-pointer"
              aria-label="Open menu drawer"
            >
              <span className="w-5 h-[2px] bg-[var(--text-primary)] group-hover:bg-[var(--accent-electric)] transition-colors rounded-full" />
              <span className="w-5 h-[2px] bg-[var(--text-primary)] group-hover:bg-[var(--accent-electric)] transition-colors rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-[var(--bg-surface)] h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10 border-l border-precision animate-in slide-in-from-right duration-300">
            {/* Top Close Row */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-precision">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-[var(--text-primary)]">
                    ERLANGGA.
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-electric)]/10 text-[var(--accent-electric)] font-bold">
                    PAGES &amp; SECTIONS
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-9 h-9 rounded-full border border-precision flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-electric)] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 space-y-1">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`group flex items-center justify-between py-3.5 px-3.5 rounded-xl transition-all ${
                        isActive
                          ? "bg-[var(--accent-electric)] text-white shadow-sm font-semibold"
                          : "hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-mono ${
                            isActive ? "text-blue-100" : "text-[var(--text-muted)] group-hover:text-[var(--accent-electric)]"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base font-semibold">
                          {link.label[lang]}
                        </span>
                      </div>
                      <span
                        className={`text-xs ${
                          isActive ? "text-white" : "text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                        }`}
                      >
                        →
                      </span>
                    </Link>
                  );
                })}

                {/* Direct link to contact section */}
                <Link
                  href="/#contact"
                  onClick={() => setDrawerOpen(false)}
                  className="group flex items-center justify-between py-3.5 px-3.5 rounded-xl hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--accent-electric)]">
                      05
                    </span>
                    <span className="text-base font-semibold">
                      {lang === "en" ? "Contact & Dispatch" : "Kontak & Diskusi"}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              </nav>
            </div>

            {/* Bottom Actions & Socials */}
            <div className="pt-6 border-t border-precision space-y-4">
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setIsResumeOpen(true);
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[var(--accent-electric)] text-white font-mono text-xs font-bold hover:bg-[var(--accent-electric-hover)] transition-colors text-center cursor-pointer"
                >
                  {lang === "en" ? "Technical CV / Resume" : "Lihat CV / Portofolio Teknis"}
                </button>
                <button
                  onClick={toggleLang}
                  className="px-4 py-3 rounded-full border border-precision text-xs font-mono font-bold text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
                >
                  {lang === "en" ? "ID" : "EN"}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-2">
                <a
                  href={PORTFOLIO_DATA.profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
                <span>•</span>
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
