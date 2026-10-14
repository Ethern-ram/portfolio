"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { Eye, CheckCircle2 } from "lucide-react";

export function VisionInspector() {
  const { lang } = usePortfolio();

  const pipelineStages = [
    {
      id: "raw",
      label: { en: "1. Raw Optical Sensor", id: "1. Citra Optik Mentah" },
      image: "/projects/vision/phone_marker.png",
      tag: "INPUT STREAM: 640×480 @ 30 FPS",
      description: {
        en: "Raw optical frame captured from downward-facing wide-angle USB camera on the UAV.",
        id: "Frame optik mentah yang ditangkap dari kamera USB sudut lebar hadap-bawah pada drone.",
      },
    },
    {
      id: "thresh",
      label: { en: "2. Adaptive Thresholding", id: "2. Ambang Batas Adaptif" },
      image: "/projects/vision/warped_th_0.png",
      tag: "CLAHE + ADAPTIVE GAUSSIAN",
      description: {
        en: "Contrast-limited adaptive histogram equalization (CLAHE) followed by localized binarization to reject sunlight glare.",
        id: "Ekualisasi histogram adaptif (CLAHE) dilanjutkan binarisasi lokal untuk meredam pantulan silau sinar matahari.",
      },
    },
    {
      id: "contour",
      label: { en: "3. Polygon Simplification", id: "3. Kontur & Sudut Sub-Piksel" },
      image: "/projects/vision/marker_tight.png",
      tag: "CONTOUR APPROX: 4 VERTICES",
      description: {
        en: "Ramer-Douglas-Peucker contour simplification extracting the 4 distinct corners of the fiducial boundary.",
        id: "Penyederhanaan kontur Ramer-Douglas-Peucker mengekstrak 4 titik sudut batas penanda.",
      },
    },
    {
      id: "rectify",
      label: { en: "4. Homography Rectification", id: "4. Rektifikasi Homografi" },
      image: "/projects/vision/square.png",
      tag: "PERSPECTIVE WARP: 200×200 PX",
      description: {
        en: "4-point perspective warp rectifying perspective distortion into an orthogonal square plane.",
        id: "Warp perspektif 4-titik merektifikasi distorsi sudut menjadi bidang bujur sangkar ortogonal.",
      },
    },
    {
      id: "decoded",
      label: { en: "5. Bit Decoding & Whitelist", id: "5. Dekode Bit & Whitelist" },
      image: "/projects/vision/marker_repaired.png",
      tag: "ID: 3 [WP3 LANDING PAD] // CONFIRMED",
      description: {
        en: "Internal 4×4 bit grid parsed and validated against active mission waypoint target whitelist.",
        id: "Grid bit 4×4 internal dibaca dan divalidasi terhadap daftar putih target waypoint misi aktif.",
      },
    },
  ];

  const [activeStage, setActiveStage] = useState(0);
  const currentStage = pipelineStages[activeStage];

  return (
    <section className="py-16 sm:py-20 border-b border-precision bg-[var(--bg-surface-elevated)]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--accent-glow)] text-[var(--text-accent)] border border-precision mb-2">
              <Eye className="w-3 h-3" />
              <span>PERCEPTION ENGINE AUDIT</span>
              <span>{"//"}</span>
              <span>OPENCV PIPELINE</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)]">
              {lang === "en"
                ? "Interactive Perception Pipeline Inspector"
                : "Inspektor Interaktif Pipeline Persepsi"}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl">
              {lang === "en"
                ? "Step through the actual computer vision transformation stages developed for the companion computer."
                : "Tahapan transformasi computer vision aktual yang dikembangkan untuk companion computer."}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--telemetry-green)]" />
            <span>ALGORITHM: DICT_4X4_50 / FAST DECODER</span>
          </div>
        </div>

        {/* Inspector Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Stage Selector Tabs */}
          <div className="lg:col-span-5 space-y-2">
            {pipelineStages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${
                  activeStage === idx
                    ? "border-[var(--text-accent)] bg-[var(--bg-surface)] shadow-sm"
                    : "border-precision bg-[var(--bg-surface)]/60 hover:bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                    activeStage === idx
                      ? "bg-[var(--text-accent)] text-white"
                      : "bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]"
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[var(--text-primary)]">
                      {stage.label[lang]}
                    </span>
                    <span className="text-[9px] font-mono text-[var(--text-muted)]">
                      STEP {idx + 1}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5 line-clamp-1">
                    {stage.tag}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Stage Visual & Telemetry Readout */}
          <div className="lg:col-span-7 rounded-lg border border-precision bg-[var(--bg-surface)] overflow-hidden shadow-sm">
            {/* Stage Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-precision bg-[var(--bg-surface-elevated)] text-xs font-mono">
              <span className="font-bold text-[var(--text-primary)]">
                STAGE {activeStage + 1} {"//"} {currentStage.tag}
              </span>
              <span className="text-[10px] text-[var(--telemetry-green)] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>CONFIRMED</span>
              </span>
            </div>

            {/* Visual Display */}
            <div className="relative aspect-[16/10] w-full bg-black/5 dark:bg-black/30 flex items-center justify-center p-4">
              <div className="relative w-full h-full max-h-[340px]">
                <Image
                  src={currentStage.image}
                  alt={currentStage.label.en}
                  fill
                  className="object-contain"
                />
              </div>

              {/* HUD Reticle Overlay */}
              <div className="reticle-corner pointer-events-none absolute inset-4" />
            </div>

            {/* Description & Metadata Footer */}
            <div className="p-4 border-t border-precision space-y-2 bg-[var(--bg-surface)]">
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {currentStage.description[lang]}
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] font-mono text-[var(--text-muted)]">
                <div>
                  <span className="block text-[9px]">CONFIRM WINDOW</span>
                  <span className="font-semibold text-[var(--text-primary)]">3 FRAMES / 0.1s</span>
                </div>
                <div>
                  <span className="block text-[9px]">BORDER SAFETY MARGIN</span>
                  <span className="font-semibold text-[var(--text-primary)]">5 PX MINIMUM</span>
                </div>
                <div>
                  <span className="block text-[9px]">TARGET WHITELIST</span>
                  <span className="font-semibold text-[var(--text-accent)]">[0, 1, 2, 3, 4, 33]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
