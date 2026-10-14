"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProjectItem } from "@/data/portfolio-data";

export type Language = "en" | "id";
export type Theme = "dark" | "light";

interface PortfolioContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  activeProject: ProjectItem | null;
  setActiveProject: (project: ProjectItem | null) => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("erlangga_lab_theme") as Theme | null;
        if (saved === "dark" || saved === "light") return saved;
      } catch {
        // ignore
      }
    }
    return "dark";
  });

  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("erlangga_lab_lang") as Language | null;
        if (saved === "en" || saved === "id") return saved;
      } catch {
        // ignore
      }
    }
    return "en";
  });

  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("erlangga_lab_theme", nextTheme);
    } catch {
      // Fallback
    }
  };

  const toggleLang = () => {
    const nextLang: Language = lang === "en" ? "id" : "en";
    setLang(nextLang);
    try {
      localStorage.setItem("erlangga_lab_lang", nextLang);
    } catch {
      // Fallback
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        theme,
        setTheme,
        toggleTheme,
        activeProject,
        setActiveProject,
        isResumeOpen,
        setIsResumeOpen,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
