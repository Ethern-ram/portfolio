"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MavericksCaseStudy } from "@/components/MavericksCaseStudy";
import { VisionInspector } from "@/components/VisionInspector";
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
        <HeroSection />
        <MavericksCaseStudy />
        <VisionInspector />
        <ProjectShowcase />
        <SkillsMatrix />
        <FieldLogs />
        <AboutSection />
        <ContactSection />
      </main>
      <ResumeModal />
    </div>
  );
}
