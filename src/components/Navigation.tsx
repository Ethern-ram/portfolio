"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Compass,
  Moon,
  Sun,
  Globe,
  FileText,
  Menu,
  X,
  Mail,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function Navigation() {
  const { lang, toggleLang, theme, toggleTheme, setIsResumeOpen } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#projects", label: { en: "Selected Work", id: "Karya Terpilih" } },
    { href: "#featured-case-study", label: { en: "VTOL Case Study", id: "Studi Kasus VTOL" } },
    { href: "#skills", label: { en: "Capabilities", id: "Keahlian" } },
    { href: "#field-logs", label: { en: "Field Logs", id: "Catatan Lapangan" } },
    { href: "#about", label: { en: "About", id: "Tentang" } },
    { href: "#contact", label: { en: "Contact", id: "Kontak" } },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-precision bg-[var(--bg-page)]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Wordmark */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-8 h-8 rounded border border-precision bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)] transition-colors">
            <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold tracking-tight text-sm text-[var(--text-primary)]">
                ERLANGGA LAB
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-[var(--accent-glow)] text-[var(--text-accent)] border border-precision">
                2.0 // ITNY
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider">
              ENGINEERING ARCHIVE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-all"
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        {/* Desktop Action Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono border border-precision bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            title="Toggle Language (EN / ID)"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[var(--text-accent)]" />
            <span className="font-semibold">{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-precision bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            title="Toggle Dark / Light Theme"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* CV / Resume Modal Button */}
          <button
            onClick={() => setIsResumeOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium border border-precision bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--text-accent)]" />
            <span>{lang === "en" ? "Technical CV" : "CV Teknis"}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-precision bg-[var(--bg-surface)] text-[var(--text-secondary)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <button
            onClick={toggleLang}
            className="px-2 py-1.5 rounded text-xs font-mono border border-precision bg-[var(--bg-surface)] text-[var(--text-secondary)] font-semibold"
            aria-label="Toggle language"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded border border-precision bg-[var(--bg-surface)] text-[var(--text-primary)]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-precision bg-[var(--bg-surface)] px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid gap-1 pb-3 border-b border-precision">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors"
              >
                {link.label[lang]}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsResumeOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded text-xs font-mono border border-precision bg-[var(--bg-surface-elevated)] text-[var(--text-primary)]"
            >
              <FileText className="w-4 h-4 text-[var(--text-accent)]" />
              <span>{lang === "en" ? "View Technical CV / Summary" : "Lihat CV / Ringkasan Teknis"}</span>
            </button>
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-[var(--text-muted)] pt-1">
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-[var(--text-primary)]"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <span>{"//"}</span>
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="flex items-center gap-1 hover:text-[var(--text-primary)]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
