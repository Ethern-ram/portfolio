"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export function HeroTelemetryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = usePortfolio();

  const [telemetry, setTelemetry] = useState({
    mode: "AUTO_VTOL",
    speed: "18.4 m/s",
    alt: "14.8 m",
    sat: "14 SATS (RTK)",
    baud: "921,600",
    servo: "AUX 1 (1000µs)",
    targetDx: "0.00m",
    targetDy: "0.00m",
    lockStatus: "SCANNING",
  });

  const mousePos = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current.active = false;
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    // Waypoints in normalized coordinates (0 to 1)
    const waypoints = [
      { id: "WP0", label: "TAKEOFF", x: 0.12, y: 0.78 },
      { id: "WP1", label: "CLIMB // 0.8m", x: 0.28, y: 0.52 },
      { id: "WP2", label: "DROP ZONE", x: 0.52, y: 0.32 },
      { id: "WP3", label: "LANDING PAD", x: 0.76, y: 0.62 },
      { id: "WP4", label: "LINE TRACK", x: 0.9, y: 0.42 },
    ];

    const render = () => {
      t += 0.015;
      const isDark = theme === "dark";
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Colors
      const gridColor = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(15, 23, 42, 0.04)";
      const pathColor = isDark ? "rgba(56, 189, 248, 0.4)" : "rgba(2, 132, 199, 0.45)";
      const accentCyan = isDark ? "#38bdf8" : "#0284c7";
      const accentAmber = isDark ? "#f59e0b" : "#d97706";
      const accentGreen = isDark ? "#10b981" : "#059669";
      const textColor = isDark ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)";

      // Draw subtle coordinate grid
      const gridSize = 40;
      ctx.lineWidth = 1;
      ctx.strokeStyle = gridColor;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Convert waypoints to pixel positions
      const pts = waypoints.map((wp) => ({
        ...wp,
        px: wp.x * width,
        py: wp.y * height,
      }));

      // Draw flight path line
      ctx.beginPath();
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = pathColor;
      ctx.lineWidth = 1.5;
      pts.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.px, p.py);
        else ctx.lineTo(p.px, p.py);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw waypoints
      pts.forEach((p, idx) => {
        // Outer ring
        ctx.beginPath();
        ctx.arc(p.px, p.py, 5, 0, Math.PI * 2);
        ctx.fillStyle = idx === 2 ? accentAmber : idx === 3 ? accentGreen : accentCyan;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.px, p.py, 9, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 2 ? accentAmber : idx === 3 ? accentGreen : accentCyan;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        ctx.font = "9px monospace";
        ctx.fillStyle = textColor;
        ctx.fillText(`${p.id}: ${p.label}`, p.px + 12, p.py + 3);
      });

      // Animated UAV position along path
      const cycle = (t * 0.25) % (pts.length - 1);
      const segmentIndex = Math.floor(cycle);
      const segT = cycle - segmentIndex;
      const p1 = pts[segmentIndex];
      const p2 = pts[segmentIndex + 1];

      const uavX = p1.px + (p2.px - p1.px) * segT;
      const uavY = p1.py + (p2.py - p1.py) * segT;

      // Draw UAV indicator (small chevron)
      const angle = Math.atan2(p2.py - p1.py, p2.px - p1.px);
      ctx.save();
      ctx.translate(uavX, uavY);
      ctx.rotate(angle);

      // Pulse ring
      const pulseSize = 12 + Math.sin(t * 4) * 3;
      ctx.beginPath();
      ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.25)" : "rgba(2, 132, 199, 0.25)";
      ctx.stroke();

      // Plane icon
      ctx.fillStyle = accentCyan;
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(-6, -6);
      ctx.lineTo(-3, 0);
      ctx.lineTo(-6, 6);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Interactive Reticle / Cursor Target tracking
      let targetX = uavX;
      let targetY = uavY;
      let isTrackingMouse = false;

      if (mousePos.current.active) {
        targetX = mousePos.current.x;
        targetY = mousePos.current.y;
        isTrackingMouse = true;
      }

      // Draw ArUco reticle box
      const reticleSize = 36;
      const bracketLen = 8;
      const reticleColor = isTrackingMouse ? accentGreen : accentCyan;

      ctx.strokeStyle = reticleColor;
      ctx.lineWidth = 1.5;

      const rx = targetX - reticleSize / 2;
      const ry = targetY - reticleSize / 2;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(rx, ry + bracketLen);
      ctx.lineTo(rx, ry);
      ctx.lineTo(rx + bracketLen, ry);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(rx + reticleSize - bracketLen, ry);
      ctx.lineTo(rx + reticleSize, ry);
      ctx.lineTo(rx + reticleSize, ry + bracketLen);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(rx, ry + reticleSize - bracketLen);
      ctx.lineTo(rx, ry + reticleSize);
      ctx.lineTo(rx + bracketLen, ry + reticleSize);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(rx + reticleSize - bracketLen, ry + reticleSize);
      ctx.lineTo(rx + reticleSize, ry + reticleSize);
      ctx.lineTo(rx + reticleSize, ry + reticleSize - bracketLen);
      ctx.stroke();

      // Crosshair center
      ctx.beginPath();
      ctx.arc(targetX, targetY, 2, 0, Math.PI * 2);
      ctx.fillStyle = reticleColor;
      ctx.fill();

      // Vector line from UAV to Target if distinct
      if (isTrackingMouse) {
        ctx.beginPath();
        ctx.setLineDash([2, 3]);
        ctx.strokeStyle = isDark ? "rgba(16, 185, 129, 0.5)" : "rgba(5, 150, 105, 0.5)";
        ctx.moveTo(uavX, uavY);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Readout coordinates
        const dx = ((targetX - uavX) * 0.05).toFixed(2);
        const dy = ((targetY - uavY) * 0.05).toFixed(2);
        ctx.font = "9px monospace";
        ctx.fillStyle = accentGreen;
        ctx.fillText(`ΔX:${dx}m ΔY:${dy}m`, targetX + 24, targetY - 12);
        ctx.fillText(`ID_TARGET: [DICT_4X4]`, targetX + 24, targetY + 2);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Subtle interval update for telemetry widget readouts
    const telInterval = setInterval(() => {
      const altNum = (14.2 + Math.sin(Date.now() * 0.001) * 0.8).toFixed(1);
      const speedNum = (18.1 + Math.cos(Date.now() * 0.0015) * 0.6).toFixed(1);
      const isMouseActive = mousePos.current.active;

      setTelemetry((prev) => ({
        ...prev,
        alt: `${altNum} m`,
        speed: `${speedNum} m/s`,
        lockStatus: isMouseActive ? "TARGET_LOCKED" : "TRACKING_ROUTE",
        servo: isMouseActive ? "AUX 1 (STANDBY)" : "AUX 1 (LOCKED)",
      }));
    }, 600);

    return () => {
      window.removeEventListener("resize", resize);
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
      clearInterval(telInterval);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] rounded-lg overflow-hidden border border-precision bg-[var(--bg-surface)] shadow-sm select-none"
    >
      {/* HUD Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3.5 py-2 border-b border-precision bg-[var(--bg-surface)]/90 backdrop-blur-sm text-[10px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--telemetry-green)] animate-pulse" />
          <span className="font-semibold tracking-wider text-[var(--text-primary)]">
            MAVLink TELEMETRY STREAM
          </span>
          <span className="text-[var(--text-muted)] hidden sm:inline">{"//"} 921,600 BAUD</span>
        </div>
        <div className="flex items-center gap-3 text-[var(--text-muted)]">
          <span>MODE: <strong className="text-[var(--text-accent)]">{telemetry.mode}</strong></span>
          <span className="hidden md:inline">GNSS: <strong className="text-[var(--telemetry-green)]">{telemetry.sat}</strong></span>
        </div>
      </div>

      {/* Interactive Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

      {/* Reticle HUD Corners */}
      <div className="reticle-corner pointer-events-none absolute inset-2" />

      {/* HUD Bottom Telemetry Readout Grid */}
      <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-2 sm:grid-cols-4 border-t border-precision bg-[var(--bg-surface)]/95 backdrop-blur-sm px-3.5 py-2 text-[10px] font-mono gap-y-1">
        <div>
          <span className="text-[var(--text-muted)] block text-[9px]">AIRSPEED</span>
          <span className="font-bold text-[var(--text-primary)]">{telemetry.speed}</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block text-[9px]">ALT (AGL)</span>
          <span className="font-bold text-[var(--text-primary)]">{telemetry.alt}</span>
        </div>
        <div className="hidden sm:block">
          <span className="text-[var(--text-muted)] block text-[9px]">PAYLOAD SERVO</span>
          <span className="font-bold text-[var(--text-accent)]">{telemetry.servo}</span>
        </div>
        <div className="text-right sm:text-left">
          <span className="text-[var(--text-muted)] block text-[9px]">VISION LOCK</span>
          <span
            className={`font-bold ${
              telemetry.lockStatus === "TARGET_LOCKED"
                ? "text-[var(--telemetry-green)]"
                : "text-[var(--text-accent)]"
            }`}
          >
            {telemetry.lockStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
