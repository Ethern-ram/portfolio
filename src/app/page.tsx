"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ElectricBlueSection } from "@/components/ElectricBlueSection";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { FieldLogs } from "@/components/FieldLogs";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { ResumeModal } from "@/components/ResumeModal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 flex flex-col">
        {/* 1. Editorial Hero presenting broad Electrical Engineering identity */}
        <HeroSection />

        {/* 2. Vibrant Electric Blue Section with 3D multi-disciplinary floating pill cluster */}
        <ElectricBlueSection />

        {/* 3. Selected Projects Catalog (KRTI featured as one of several with dedicated case study link) */}
        <ProjectShowcase />

        {/* 4. Hardware, Avionics & Embedded Skills Matrix */}
        <SkillsMatrix />

        {/* 5. Field Test & Laboratory Logs Archive */}
        <FieldLogs />

        {/* 6. Concise Engineering Background & ITNY Affiliation */}
        <AboutSection />

        {/* 7. Direct Contact Channel & Interactive Engineering Terminal */}
        <ContactSection />
      </main>
      <ResumeModal />
    </div>
  );
}
