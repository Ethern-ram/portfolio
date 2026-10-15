"use client";

import React, { useState, useRef, useEffect } from "react";

interface PillItem {
  id: string;
  label: string;
  tag: string;
  metric: string;
  initialRotate: number;
  zDepth: number;
  highlight?: boolean;
}

const PILL_BADGES: PillItem[] = [
  { id: "uav", label: "Autonomous UAV", tag: "AEROSPACE", metric: "KRTI 2026 VTOL", initialRotate: -7, zDepth: 35, highlight: true },
  { id: "fc", label: "Cube Orange+ FC", tag: "AVIONICS", metric: "STM32H753 @ 480MHz", initialRotate: 6, zDepth: 55 },
  { id: "jetson", label: "NVIDIA Jetson Nano", tag: "COMPANION", metric: "128-core Maxwell GPU", initialRotate: -4, zDepth: 25 },
  { id: "aruco", label: "ArUco Precision Guidance", tag: "COMPUTER VISION", metric: "DICT_4X4_50 @ 30 FPS", initialRotate: 5, zDepth: 60, highlight: true },
  { id: "mavlink", label: "MAVLink 921.6k", tag: "TELEMETRY", metric: "921600 baud serial", initialRotate: -8, zDepth: 20 },
  { id: "rtk", label: "RTK GNSS Navigation", tag: "POSITIONING", metric: "Centimeter accuracy", initialRotate: 4, zDepth: 45 },
  { id: "vtol", label: "VTOL QuadPlane", tag: "DYNAMICS", metric: "Dual-mode transition", initialRotate: -5, zDepth: 50 },
  { id: "pid", label: "PID Flight Dynamics", tag: "CONTROL", metric: "Rate & Att loop tuning", initialRotate: 7, zDepth: 30 },
  { id: "opencv", label: "OpenCV Edge Pipeline", tag: "VISION", metric: "Sub-pixel corner detector", initialRotate: -6, zDepth: 40 },
  { id: "ardupilot", label: "ArduPilot Firmware", tag: "STACK", metric: "Custom AP_Landing", initialRotate: 3, zDepth: 65, highlight: true },
  { id: "cpp", label: "Embedded C / C++", tag: "LOW-LEVEL", metric: "Zero-copy buffers", initialRotate: -3, zDepth: 20 },
  { id: "esp32", label: "ESP32 Custom Telemetry", tag: "HARDWARE", metric: "2.4GHz backup link", initialRotate: 8, zDepth: 35 },
];

export function ThreeDPillCluster() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [activePill, setActivePill] = useState<PillItem | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate relative position (-1 to +1)
      const relativeX = (e.clientX - centerX) / (rect.width / 2);
      const relativeY = (e.clientY - centerY) / (rect.height / 2);

      // Clamped 3D rotation angles
      const clampedX = Math.max(-1, Math.min(1, relativeX));
      const clampedY = Math.max(-1, Math.min(1, relativeY));

      setRotate({
        x: -clampedY * 12, // tilt up/down
        y: clampedX * 16,  // tilt left/right
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", () => {
        setRotate({ x: 0, y: 0 });
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="w-full relative py-8 select-none">
      {/* Active Pill HUD info tooltip */}
      <div className="h-10 mb-2 flex items-center justify-center">
        {activePill ? (
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-mono border border-white/30 animate-in fade-in duration-150">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold uppercase tracking-wider">{activePill.label}</span>
            <span className="opacity-70">{"//"}</span>
            <span className="text-white/90">{activePill.metric}</span>
          </div>
        ) : (
          <p className="text-xs font-mono text-white/60 tracking-wider uppercase text-center">
            [ HOVER OR TOUCH BADGES FOR 3D INSPECTION ]
          </p>
        )}
      </div>

      {/* 3D Perspective Stage */}
      <div
        ref={containerRef}
        className="relative max-w-4xl mx-auto px-4 py-6 perspective-1000 cursor-grab active:cursor-grabbing"
      >
        <div
          className="relative flex flex-wrap justify-center items-center gap-3 sm:gap-4 transition-transform duration-300 ease-out transform-style-3d py-4"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
        >
          {PILL_BADGES.map((pill) => {
            const isSelected = activePill?.id === pill.id;

            return (
              <div
                key={pill.id}
                onMouseEnter={() => setActivePill(pill)}
                onMouseLeave={() => setActivePill(null)}
                className="group relative transition-all duration-300 ease-out cursor-pointer"
                style={{
                  transform: `rotate(${pill.initialRotate}deg) translateZ(${
                    isSelected ? pill.zDepth + 40 : pill.zDepth
                  }px) scale(${isSelected ? 1.08 : 1})`,
                }}
              >
                <div
                  className={`px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold tracking-tight transition-all duration-200 border ${
                    isSelected
                      ? "bg-white text-[#1652f0] shadow-2xl ring-4 ring-white/50 border-white -translate-y-1"
                      : "bg-white text-slate-900 shadow-lg hover:shadow-xl hover:bg-slate-50 border-white/80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {pill.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1652f0]" />
                    )}
                    <span>{pill.label}</span>
                  </div>
                </div>

                {/* Subtle drop shadow in 3D */}
                <div
                  className="absolute inset-0 rounded-full bg-black/20 -z-10 blur-md translate-y-3 opacity-60 group-hover:opacity-80 transition-opacity"
                  style={{
                    transform: `translateZ(-${pill.zDepth}px) scale(0.95)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
