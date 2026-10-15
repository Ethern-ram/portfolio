"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ElectricBlueSection } from "@/components/ElectricBlueSection";
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
        {/* 1. Editorial Hero matching reference image with centered portrait & 3D Drone toggle */}
        <HeroSection />

        {/* 2. Vibrant Electric Blue Section with 3D floating pill cluster */}
        <ElectricBlueSection />

        {/* 3. Deep-dive KRTI 2026 VTOL QuadPlane Case Study */}
        <MavericksCaseStudy />

        {/* 4. Real-time ArUco Computer Vision Lab */}
        <VisionInspector />

        {/* 5. Comprehensive Engineering Projects Catalog */}
        <ProjectShowcase />

        {/* 6. Hardware & Avionics Skills Matrix */}
        <SkillsMatrix />

        {/* 7. Field Test & Flight Logs Archive */}
        <FieldLogs />

        {/* 8. Engineering Background & Education at ITNY */}
        <AboutSection />

        {/* 9. Direct Engineering Contact & Dispatch */}
        <ContactSection />
      </main>
      <ResumeModal />
    </div>
  );
}
