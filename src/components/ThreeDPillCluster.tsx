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
  { id: "embedded", label: "Embedded Systems", tag: "FIRMWARE", metric: "C/C++, Register & HAL Level", initialRotate: -7, zDepth: 35, highlight: true },
  { id: "cv", label: "Computer Vision", tag: "PERCEPTION", metric: "OpenCV, Pose Estimation, Filters", initialRotate: 6, zDepth: 55, highlight: true },
  { id: "hwsw", label: "Hardware-Software Integration", tag: "SYSTEMS", metric: "UART, I2C, SPI & Bus Architecture", initialRotate: -4, zDepth: 25 },
  { id: "mcu", label: "Microcontroller Firmware", tag: "LOW-LEVEL", metric: "STM32, ESP32, AVR", initialRotate: 5, zDepth: 60 },
  { id: "iot", label: "IoT & Telemetry", tag: "CONNECTIVITY", metric: "MQTT, WebSockets, Wi-Fi", initialRotate: -8, zDepth: 20 },
  { id: "robotics", label: "Robotics & Control", tag: "AUTOMATION", metric: "PID Control & Sensor Fusion", initialRotate: 4, zDepth: 45, highlight: true },
  { id: "edgeai", label: "Edge AI Computing", tag: "COMPUTING", metric: "NVIDIA Jetson, Linux CLI", initialRotate: -5, zDepth: 50 },
  { id: "pcb", label: "Circuit & PCB Prototyping", tag: "HARDWARE", metric: "Schematic capture & breadboarding", initialRotate: 7, zDepth: 30 },
  { id: "rtos", label: "FreeRTOS Multitasking", tag: "OS", metric: "Queue primitives & task scheduling", initialRotate: -6, zDepth: 40 },
  { id: "sensors", label: "Sensor Interfacing", tag: "INSTRUMENTATION", metric: "IMU, ADC, Optic, Encoders", initialRotate: 3, zDepth: 65 },
  { id: "linux", label: "Linux & ROS2 Foundations", tag: "SOFTWARE", metric: "POSIX, Bash scripting, Nodes", initialRotate: -3, zDepth: 20 },
  { id: "uav", label: "Avionics Systems Integration", tag: "APPLICATION", metric: "ArduPilot & MAVLink Protocols", initialRotate: 8, zDepth: 35 },
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
            [ HOVER OR TOUCH BADGES FOR 3D HARDWARE &amp; SOFTWARE STACK ]
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
