"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  GitFork,
  Globe,
  Mail,
  Microchip,
  Moon,
  Sun,
  Terminal,
  Zap,
} from "lucide-react";
import { useTheme } from "@/lib/context";
import { useLang } from "@/lib/context";

// ── Utilities ────────────────────────────────────────────────────────────────

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function useMouseLab() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 25 });
  useEffect(() => {
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  return { smoothX, smoothY };
}

// ── Typing animation ─────────────────────────────────────────────────────────

function useTyping(text: string, speed = 45) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
}

// ── Shared panel ─────────────────────────────────────────────────────────────

function Panel({ children, className, style }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "lab-panel relative w-full max-w-full border-[3px] border-[var(--border)]",
        "bg-[var(--bg-panel)] shadow-[5px_5px_0_var(--shadow)]",
        "hover:shadow-[7px_7px_0_var(--shadow)] hover:-translate-x-px hover:-translate-y-px",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ── Status dot colors ─────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  active: "#D4FF3F",
  ongoing: "#6EA8FE",
  queued: "#FF8A00",
};

// ── Oscilloscope ─────────────────────────────────────────────────────────────

function Oscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef = useRef(0);
  const mouseXRef = useRef(0.5);
  const { theme } = useTheme();
  const { t } = useLang();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseXRef.current = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    };
    canvas.addEventListener("mousemove", handleMove);
    return () => canvas.removeEventListener("mousemove", handleMove);
  }, []);

  useAnimationFrame((_, delta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    tRef.current += delta * 0.001;
    const t = tRef.current;
    const mx = mouseXRef.current;
    const W = canvas.width;
    const H = canvas.height;
    const isDark = theme === "dark";

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo(0, (H / 4) * i); ctx.lineTo(W, (H / 4) * i); ctx.stroke();
    }
    for (let i = 1; i < 8; i++) {
      ctx.beginPath(); ctx.moveTo((W / 8) * i, 0); ctx.lineTo((W / 8) * i, H); ctx.stroke();
    }

    // Baseline
    ctx.strokeStyle = "rgba(255,138,0,0.2)";
    ctx.setLineDash([6, 10]);
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    ctx.setLineDash([]);

    const freq1 = 1.4 + mx * 0.8;
    const freq2 = 2.8 + mx * 0.4;
    const amp = H * 0.28;

    // Main wave
    ctx.strokeStyle = isDark ? "#f0ede0" : "#111111";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (let px = 0; px <= W; px += 2) {
      const nx = px / W;
      const wave =
        Math.sin(nx * Math.PI * 2 * freq1 + t * 2.2) * amp * 0.65 +
        Math.sin(nx * Math.PI * 2 * freq2 + t * 1.4) * amp * 0.35;
      px === 0 ? ctx.moveTo(px, H / 2 + wave) : ctx.lineTo(px, H / 2 + wave);
    }
    ctx.stroke();

    // Accent wave
    ctx.strokeStyle = "#D4FF3F";
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    for (let px = 0; px <= W; px += 2) {
      const nx = px / W;
      const wave = Math.sin(nx * Math.PI * 2 * 3.2 + t * 3.1 + 1.2) * amp * 0.2;
      px === 0 ? ctx.moveTo(px, H / 2 + wave) : ctx.lineTo(px, H / 2 + wave);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Scan line
    const scanX = ((t * 0.18) % 1) * W;
    ctx.strokeStyle = "rgba(110,168,254,0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(scanX, 0); ctx.lineTo(scanX, H); ctx.stroke();

    // Readout dot
    const dotNx = 0.72;
    const dotWave =
      Math.sin(dotNx * Math.PI * 2 * freq1 + t * 2.2) * amp * 0.65 +
      Math.sin(dotNx * Math.PI * 2 * freq2 + t * 1.4) * amp * 0.35;
    ctx.fillStyle = "#D4FF3F";
    ctx.strokeStyle = isDark ? "#f0ede0" : "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(dotNx * W, H / 2 + dotWave, 5, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  });

  return (
    <Panel className="overflow-hidden">
      <div className="flex items-center justify-between border-b-[3px] border-[var(--border)] px-4 py-2">
        <div className="flex items-center gap-2">
          <Zap size={13} strokeWidth={3} className="text-[var(--accent-orange)]" />
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em]">
            oscilloscope // erlangga-lab
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[10px] font-black uppercase text-[var(--fg-subtle)] sm:block">
            ch1: life.signal
          </span>
          <span className="h-2 w-2 animate-pulse border border-[var(--border)] bg-[var(--accent)]" />
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={900}
        height={180}
        className="h-[130px] w-full cursor-crosshair sm:h-[150px] md:h-[170px]"
        style={{ display: "block" }}
        aria-label="Interactive oscilloscope waveform"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t-[3px] border-[var(--border)] px-4 py-2">
        <span className="font-mono text-[9px] font-black uppercase text-[var(--fg-subtle)]">
          {t.hero.oscilloscopeHint}
        </span>
        <div className="flex gap-3">
          {["freq: variable", "amp: ~28%", "mode: live"].map((r) => (
            <span key={r} className="font-mono text-[9px] font-black uppercase text-[var(--fg-subtle)]">{r}</span>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ── Profile Image ─────────────────────────────────────────────────────────────

function ProfileImage() {
  return (
    <motion.div
      whileHover={{ rotate: -1.5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border-[4px] border-[var(--border)] shadow-[10px_10px_0_var(--accent)]">
        <Image
          src="/gambarku.jpeg"
          alt="Erlangga Pradana Kurniawan"
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
          priority
        />
      </div>
      <div className="absolute -bottom-3 -right-3 border-[3px] border-[var(--border)] bg-[var(--accent)] px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-wider shadow-[3px_3px_0_var(--shadow)] text-black">
        human.exe
      </div>
    </motion.div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={cn(
        "relative z-20 mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-3 border-[3px] border-[var(--border)] bg-[var(--bg-panel)] p-3",
        scrolled ? "shadow-[6px_6px_0_var(--shadow)]" : "shadow-[6px_6px_0_var(--shadow)]",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center border-[3px] border-[var(--border)] bg-[var(--accent)]">
          <Microchip size={20} strokeWidth={3} className="text-black" />
        </span>
        <div>
          <p className="text-sm font-black uppercase leading-none">{t.nav.logo}</p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--fg-muted)]">
            {t.nav.logoSub}
          </p>
        </div>
      </div>

      {/* Nav links — hidden on small screens */}
      <div className="hidden items-center gap-5 md:flex">
        {(["about", "projects", "skills", "contact"] as const).map((key) => (
          <a
            key={key}
            href={`#${key}`}
            className="font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          >
            {t.nav[key]}
          </a>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === "en" ? "id" : "en")}
          className="flex items-center gap-1.5 border-[3px] border-[var(--border)] bg-[var(--bg-panel)] px-2.5 py-1.5 font-mono text-[11px] font-black uppercase shadow-[3px_3px_0_var(--shadow)] transition-all hover:shadow-[4px_4px_0_var(--shadow)] hover:-translate-x-px hover:-translate-y-px"
          aria-label="Toggle language"
        >
          <Globe size={13} strokeWidth={3} />
          {lang === "en" ? "ID" : "EN"}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 border-[3px] border-[var(--border)] bg-[var(--bg-panel)] px-2.5 py-1.5 font-mono text-[11px] font-black uppercase shadow-[3px_3px_0_var(--shadow)] transition-all hover:shadow-[4px_4px_0_var(--shadow)] hover:-translate-x-px hover:-translate-y-px"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={13} strokeWidth={3} /> : <Sun size={13} strokeWidth={3} />}
        </button>

        {/* GitHub */}
        <motion.a
          href="https://github.com/Ethern-ram"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          className="hidden items-center gap-1.5 border-[3px] border-[var(--border)] bg-[var(--invert-bg)] px-3 py-1.5 font-mono text-[11px] font-black uppercase text-[var(--invert-fg)] shadow-[3px_3px_0_var(--accent)] transition-shadow hover:shadow-[5px_5px_0_var(--accent)] sm:flex"
        >
          <GitFork size={13} strokeWidth={3} />
          {t.nav.github}
          <ExternalLink size={9} strokeWidth={3} />
        </motion.a>

        {/* Email */}
        <a
          href="mailto:pradanaerlangga99@gmail.com"
          className="hidden items-center gap-1.5 border-[3px] border-[var(--border)] bg-[var(--accent)] px-3 py-1.5 font-mono text-[11px] font-black uppercase text-black shadow-[3px_3px_0_var(--shadow)] transition-shadow hover:shadow-[5px_5px_0_var(--shadow)] sm:flex"
        >
          <Mail size={13} strokeWidth={3} />
          {t.nav.email}
        </a>
      </div>
    </motion.nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const { t } = useLang();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -28]);
  const typedRole = useTyping(t.hero.role, 38);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-5 sm:px-6 md:px-8 md:pb-28 lg:px-12 xl:px-16">
      <div className="pointer-events-none absolute inset-0 engineering-grid opacity-[0.12]" />

      <Navbar />

      <div className="relative z-10 mx-auto mt-12 grid w-full max-w-[1400px] gap-10 md:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start lg:gap-14">

        {/* Left */}
        <motion.div style={{ y }} className="min-w-0">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mb-7 inline-flex border-[3px] border-[var(--border)] bg-[var(--accent)] px-4 py-2 font-mono text-[11px] font-black uppercase tracking-[0.15em] shadow-[4px_4px_0_var(--shadow)] text-black"
          >
            {t.hero.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-[clamp(2.2rem,10vw,8rem)] font-black uppercase leading-[0.82] xl:text-[clamp(4.5rem,8.5vw,9rem)]"
          >
            Erlangga
            <span className="block translate-x-0 font-bold text-lab-outline sm:translate-x-2 md:translate-x-8 xl:translate-x-14">
              Pradana
            </span>
            <span className="mt-2 inline-block bg-[var(--invert-bg)] px-2 pb-2 text-[0.85em] text-[var(--invert-fg)] shadow-[6px_6px_0_var(--accent)] sm:px-3 sm:pb-3 md:ml-6 md:shadow-[8px_8px_0_var(--accent)] xl:ml-10">
              Kurniawan
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.45 }}
            className="mt-8 md:mt-10"
          >
            <Panel className="p-6 md:p-7">
              <p className="min-h-[2.5rem] text-[clamp(1.2rem,3.8vw,1.75rem)] font-black leading-tight">
                {typedRole}
                <span className="typing-cursor ml-0.5 inline-block h-[1em] w-[3px] bg-[var(--fg)] align-middle" />
              </p>
              <p className="mt-3 max-w-lg font-mono text-sm font-bold uppercase leading-relaxed text-[var(--fg-muted)]">
                {t.hero.bio}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="mailto:pradanaerlangga99@gmail.com"
                  className="flex items-center gap-2 border-[3px] border-[var(--border)] bg-[var(--accent)] px-4 py-2 font-mono text-[11px] font-black uppercase text-black shadow-[4px_4px_0_var(--shadow)] transition-all hover:shadow-[6px_6px_0_var(--shadow)] hover:-translate-x-px hover:-translate-y-px"
                >
                  <Mail size={13} strokeWidth={3} />
                  {t.nav.email}
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 border-[3px] border-[var(--border)] bg-[var(--bg-panel)] px-4 py-2 font-mono text-[11px] font-black uppercase shadow-[4px_4px_0_var(--shadow)] transition-all hover:shadow-[6px_6px_0_var(--shadow)] hover:-translate-x-px hover:-translate-y-px"
                >
                  <Download size={13} strokeWidth={3} />
                  {t.hero.downloadCV}
                </a>
              </div>
            </Panel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="mt-5"
          >
            <Oscilloscope />
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          className="grid gap-4"
        >
          <Panel className="p-5 md:p-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-subtle)]">
                {t.hero.status}
              </p>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse border border-[var(--border)] bg-[var(--accent)]" />
                <span className="font-mono text-[10px] font-black uppercase">online</span>
              </span>
            </div>
            <p className="mt-3 text-[clamp(1.6rem,6vw,2.2rem)] font-black uppercase leading-none">
              {t.hero.online}
            </p>
            <p className="mt-2 font-mono text-xs font-bold uppercase leading-relaxed text-[var(--fg-muted)]">
              {t.hero.statusSub}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t-[2px] border-[var(--border)] pt-4">
              {[
                [t.hero.age, "19"],
                [t.hero.semester, "04"],
                [t.hero.mode, t.hero.modeVal],
                [t.hero.statusVal, t.hero.statusValVal],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="font-mono text-[9px] font-black uppercase text-[var(--fg-subtle)]">{k}</p>
                  <p className="font-mono text-sm font-black uppercase">{v}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5 md:p-6" style={{ backgroundColor: "var(--accent-blue)" }}>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">{t.hero.focus}</p>
            <p className="mt-3 text-[clamp(1.3rem,5vw,1.6rem)] font-black uppercase leading-tight">
              {t.hero.focusTitle}
            </p>
            <p className="mt-2 font-mono text-xs font-bold uppercase leading-relaxed">
              {t.hero.focusSub}
            </p>
          </Panel>

          <Panel className="p-5 md:p-6" style={{ backgroundColor: "var(--invert-bg)", borderColor: "var(--invert-bg)" }}>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
              {t.hero.lateNight}
            </p>
            <p className="mt-3 text-[clamp(1rem,3.5vw,1.2rem)] font-black uppercase leading-snug text-[var(--invert-fg)]">
              {t.hero.lateNightQuote}
            </p>
          </Panel>
        </motion.div>
      </div>
    </section>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────────────

function Marquee() {
  const { t } = useLang();
  const items = t.marquee;
  const colors = ["var(--accent)", "var(--fg)", "var(--accent-orange)", "var(--fg)", "var(--accent-blue)"];

  return (
    <div className="overflow-hidden border-y-[3px] border-[var(--border)] bg-[var(--invert-bg)] py-3 text-[var(--invert-fg)]">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap font-mono text-sm font-black uppercase tracking-[0.18em]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <div className="flex gap-10" key={copy}>
            {items.map((item, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>{item}</span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function About() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" ref={ref} className="relative px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16">
      <motion.div style={{ x }} className="pointer-events-none absolute right-8 top-10 hidden select-none text-[8rem] font-black uppercase leading-none opacity-[0.04] lg:block">
        SEM 04
      </motion.div>
      <div className="mx-auto grid w-full max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)_minmax(0,1fr)] lg:gap-10">
        <Panel className="p-6 md:p-8">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-subtle)]">
            {t.about.label}
          </p>
          <h2 className="mt-4 text-[clamp(1.8rem,6.5vw,3rem)] font-black uppercase leading-[0.9]">
            {t.about.heading}
          </h2>
          <p className="mt-5 text-lg font-bold leading-snug text-[var(--fg-muted)]">
            {t.about.bio}
          </p>
          <div className="mt-5 flex items-center gap-2 border-t-[2px] border-[var(--border)] pt-4">
            <span className="font-mono text-[10px] font-black uppercase text-[var(--fg-subtle)]">
              {t.about.location}
            </span>
          </div>
        </Panel>

        <div className="flex items-center justify-center lg:translate-y-6">
          <ProfileImage />
        </div>

        <Panel className="p-6 md:p-8">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-subtle)]">
            {t.about.mindsetLabel}
          </p>
          <div className="mt-5 space-y-5">
            {t.about.mindset.map(([title, copy]) => (
              <div key={title} className="border-l-[3px] border-[var(--border)] pl-4">
                <h3 className="text-base font-black uppercase leading-none">{title}</h3>
                <p className="mt-1 text-sm font-bold leading-snug text-[var(--fg-muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}

// ── Lab Log ───────────────────────────────────────────────────────────────────

function LabLog() {
  const { t } = useLang();
  const entries = t.labLog.entries;
  const activeCount = entries.filter((e) => e.status === "active").length;

  return (
    <section className="px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div>
            <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[var(--fg-subtle)]">
              {t.labLog.label}
            </p>
            <h2 className="mt-2 text-[clamp(2rem,8vw,4rem)] font-black uppercase leading-[0.88]">
              {t.labLog.heading}
            </h2>
          </div>
          <div className="border-[3px] border-[var(--border)] bg-[var(--invert-bg)] px-4 py-2 shadow-[4px_4px_0_var(--accent)]">
            <p className="font-mono text-[11px] font-black uppercase text-[var(--accent)]">
              {activeCount} {t.labLog.active} // {entries.length} {t.labLog.total}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="lab-panel flex flex-col gap-3 border-[3px] border-[var(--border)] bg-[var(--bg-panel)] p-4 shadow-[5px_5px_0_var(--shadow)] hover:shadow-[7px_7px_0_var(--shadow)] hover:-translate-y-px sm:flex-row sm:items-start sm:gap-5 sm:p-5"
            >
              <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-center sm:gap-2 sm:pt-1">
                <span
                  className="h-3 w-3 border-[2px] border-[var(--border)]"
                  style={{ backgroundColor: STATUS_COLORS[entry.status] ?? "#ccc" }}
                />
                <span className="font-mono text-[9px] font-black uppercase text-[var(--fg-subtle)]">
                  {entry.status}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-black uppercase text-[var(--fg-subtle)]">{entry.id}</span>
                  <span className="font-mono text-[10px] text-[var(--fg-subtle)]">//</span>
                  <span className="font-mono text-[10px] font-black uppercase text-[var(--fg-subtle)]">{entry.date}</span>
                  <span
                    className="border-[2px] border-[var(--border)] px-2 py-0.5 font-mono text-[9px] font-black uppercase text-black"
                    style={{ backgroundColor: STATUS_COLORS[entry.status] ?? "#eee" }}
                  >
                    {entry.tag}
                  </span>
                </div>
                <h3 className="mt-2 text-[clamp(1rem,3.2vw,1.3rem)] font-black uppercase leading-tight">
                  {entry.title}
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm font-bold leading-snug text-[var(--fg-muted)]">
                  {entry.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: {
  project: { id: string; title: string; type: string; copy: string; stack: readonly string[]; accent: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      onClick={() => setOpen((v) => !v)}
      className="lab-panel w-full cursor-pointer border-[3px] border-[var(--border)] bg-[var(--bg-panel)] shadow-[6px_6px_0_var(--shadow)] hover:shadow-[8px_8px_0_var(--shadow)] hover:-translate-y-0.5"
    >
      <div className="h-[5px] w-full border-b-[3px] border-[var(--border)]" style={{ backgroundColor: project.accent }} />
      <div className="p-5 sm:p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-black uppercase tracking-[0.15em] text-[var(--fg-subtle)]">
              {project.id} // {project.type}
            </p>
            <h3 className="mt-2.5 text-[clamp(1.5rem,5vw,2.6rem)] font-black uppercase leading-none">
              {project.title}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="grid h-10 w-10 shrink-0 place-items-center border-[3px] border-[var(--border)]"
            style={{ backgroundColor: open ? project.accent : "var(--bg-panel)" }}
          >
            <ArrowUpRight size={20} strokeWidth={3} />
          </motion.div>
        </div>
        <p className="mt-4 max-w-2xl text-base font-bold leading-snug text-[var(--fg-muted)] md:text-lg">
          {project.copy}
        </p>
        <motion.div
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          initial={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="overflow-hidden"
        >
          <div className="mt-5 flex flex-wrap gap-2 border-t-[3px] border-[var(--border)] pt-5">
            {project.stack.map((item) => (
              <span
                key={item}
                className="border-[2px] border-[var(--border)] px-3 py-1.5 font-mono text-[11px] font-black uppercase text-black shadow-[3px_3px_0_var(--shadow)]"
                style={{ backgroundColor: project.accent }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const { t } = useLang();
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-10 max-w-3xl md:mb-14">
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[var(--fg-subtle)]">
            {t.projects.label}
          </p>
          <h2 className="mt-2 text-[clamp(2rem,8vw,4rem)] font-black uppercase leading-[0.88]">
            {t.projects.heading}
          </h2>
          <p className="mt-3 text-lg font-bold text-[var(--fg-muted)]">{t.projects.sub}</p>
        </div>
        <div className="grid gap-4 md:gap-5">
          {t.projects.items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────

function Skills() {
  const { t } = useLang();
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[var(--fg-subtle)]">
            {t.skills.label}
          </p>
          <h2 className="mt-2 text-[clamp(2rem,8vw,4rem)] font-black uppercase leading-[0.88]">
            {t.skills.heading}
          </h2>
          <p className="mt-3 text-lg font-bold text-[var(--fg-muted)]">{t.skills.sub}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.skills.items.map((skill, index) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="lab-panel border-[3px] border-[var(--border)] bg-[var(--bg-panel)] p-4 shadow-[5px_5px_0_var(--shadow)] hover:shadow-[7px_7px_0_var(--shadow)] hover:-translate-y-px sm:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-black uppercase">{skill.label}</span>
                <span className="font-mono text-[11px] font-black text-[var(--fg-subtle)]">{skill.progress}%</span>
              </div>
              <span
                className="mt-2 inline-flex border-[2px] border-[var(--border)] px-2 py-0.5 font-mono text-[9px] font-black uppercase text-black"
                style={{ backgroundColor: skill.color }}
              >
                {skill.status}
              </span>
              <p className="mt-2 font-mono text-[11px] font-bold uppercase text-[var(--fg-subtle)]">
                {skill.description}
              </p>
              <div className="mt-3 h-3.5 border-[2px] border-[var(--border)] bg-[var(--bg)]">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.05 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  const { t } = useLang();
  const [lineCount, setLineCount] = useState(3);
  const lines = t.contact.lines;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLineCount((c) => (c >= lines.length ? 3 : c + 1));
    }, 1800);
    return () => window.clearInterval(timer);
  }, [lines.length]);

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16">
      <div className="mx-auto w-full max-w-[1400px] border-[3px] border-[var(--border)] bg-[var(--invert-bg)] p-4 text-[var(--invert-fg)] shadow-[8px_8px_0_var(--shadow)] sm:p-6 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          {/* Terminal */}
          <div className="border-[3px] border-[var(--invert-fg)]/10 p-4 sm:p-5">
            <div className="flex items-center justify-between border-b-[2px] border-[var(--invert-fg)]/10 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="text-[var(--accent)]" size={20} strokeWidth={3} />
                <span className="font-mono text-[11px] font-black uppercase tracking-[0.15em]">
                  {t.contact.terminal}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[var(--accent-orange)]">[o][o][o]</span>
            </div>
            <div className="mt-5 min-h-48 space-y-2.5 font-mono text-sm font-bold">
              {lines.slice(0, lineCount).map((line, index) => (
                <motion.p
                  key={`${line}-${index}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "safe-text",
                    line.startsWith("$") || line.startsWith("$ ") ? "text-[var(--accent)]" : "text-[var(--invert-fg)]/70",
                  )}
                >
                  {line}
                </motion.p>
              ))}
              <span className="typing-cursor inline-block h-4 w-2.5 bg-[var(--accent)]" />
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">
                {t.contact.label}
              </p>
              <h2 className="mt-3 text-[clamp(1.8rem,7vw,3.5rem)] font-black uppercase leading-none">
                {t.contact.heading}
              </h2>
            </div>
            <div className="grid gap-3">
              <a
                href="mailto:pradanaerlangga99@gmail.com"
                className="group flex items-center justify-between gap-4 border-[3px] border-[var(--invert-fg)]/20 bg-[var(--accent)] p-4 text-black shadow-[5px_5px_0_var(--accent-orange)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--accent-orange)]"
              >
                <span className="min-w-0">
                  <span className="block text-xl font-black uppercase">{t.contact.emailLabel}</span>
                  <span className="safe-text block font-mono text-[11px] font-bold uppercase text-black/60">
                    {t.contact.emailSub}
                  </span>
                </span>
                <Mail className="shrink-0 transition-transform group-hover:rotate-6" size={24} strokeWidth={3} />
              </a>
              <a
                href="https://github.com/Ethern-ram"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-[3px] border-[var(--invert-fg)]/20 bg-[var(--accent-blue)] p-4 text-black shadow-[5px_5px_0_var(--accent)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--accent)]"
              >
                <span className="min-w-0">
                  <span className="block text-xl font-black uppercase">{t.contact.githubLabel}</span>
                  <span className="safe-text block font-mono text-[11px] font-bold uppercase text-black/60">
                    {t.contact.githubSub}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <GitFork className="transition-transform group-hover:rotate-6" size={24} strokeWidth={3} />
                  <ExternalLink size={14} strokeWidth={3} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t-[3px] border-[var(--border)] bg-[var(--invert-bg)] px-4 py-6 text-[var(--invert-fg)] sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.15em]">
            {t.footer.copy}
          </p>
          <p className="mt-0.5 font-mono text-[10px] font-bold uppercase text-[var(--invert-fg)]/30">
            {t.footer.sub}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="mailto:pradanaerlangga99@gmail.com"
            className="flex items-center gap-1.5 border-[2px] border-[var(--invert-fg)]/20 px-2.5 py-1.5 font-mono text-[10px] font-black uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Mail size={12} strokeWidth={3} />
            {t.nav.email}
          </a>
          <a
            href="https://github.com/Ethern-ram"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border-[2px] border-[var(--invert-fg)]/20 px-2.5 py-1.5 font-mono text-[10px] font-black uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <GitFork size={12} strokeWidth={3} />
            {t.nav.github}
            <ExternalLink size={9} strokeWidth={3} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const { smoothX, smoothY } = useMouseLab();

  useEffect(() => {
    if (!rootRef.current) return;
    const panels = gsap.utils.toArray<HTMLElement>(".gsap-rise");
    if (panels.length > 0) {
      gsap.fromTo(panels, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out" });
    }
  }, []);

  return (
    <main ref={rootRef} className="relative min-h-screen w-full overflow-x-clip bg-[var(--bg)] text-[var(--fg)]">
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 border-[2px] border-[var(--border)] bg-[var(--accent)] mix-blend-multiply md:block"
        style={{ x: smoothX, y: smoothY }}
      />
      <Hero />
      <Marquee />
      <About />
      <LabLog />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
