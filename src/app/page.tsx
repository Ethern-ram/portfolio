"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import {
  ArrowUpRight,
  BatteryCharging,
  Bot,
  BrainCircuit,
  ExternalLink,
  Gauge,
  GitBranch,
  GitFork,
  Mail,
  Microchip,
  MousePointer2,
  Terminal,
} from "lucide-react";

const projects = [
  {
    id: "exp-01",
    title: "Smart Room Telemetry",
    type: "IoT Interface Experiment",
    copy: "A personal dashboard concept for monitoring sensors, room states, and microcontroller signals with a frontend that feels like a control panel.",
    stack: ["ESP32", "Next.js", "MQTT", "Charts"],
    color: "bg-[#F5F3EA]",
    bars: [78, 42, 91, 64, 83],
  },
  {
    id: "exp-02",
    title: "Robotics Motion Console",
    type: "Robotics UI Prototype",
    copy: "A cinematic controller surface for robot states, motor feedback, path planning, and human-readable diagnostics.",
    stack: ["React", "Motion", "Arduino", "Control"],
    color: "bg-[#F5F3EA]",
    bars: [36, 88, 54, 76, 49],
  },
  {
    id: "exp-03",
    title: "AI Study Companion",
    type: "Creative AI Tool",
    copy: "An interface experiment for turning electrical engineering notes into small quizzes, diagrams, and debugging prompts.",
    stack: ["AI UX", "TypeScript", "RAG", "Design"],
    color: "bg-[#F5F3EA]",
    bars: [69, 95, 58, 47, 84],
  },
];

const learningSkills = [
  {
    label: "Python",
    status: "currently learning",
    description: "Learning AI + automation fundamentals",
    progress: 35,
    color: "#D4FF3F",
    icon: "ðŸ",
  },
  {
    label: "C++",
    status: "building fundamentals",
    description: "Understanding logic & systems programming",
    progress: 28,
    color: "#FF8A00",
    icon: "âš™ï¸",
  },
  {
    label: "HTML / CSS",
    status: "experimenting with",
    description: "Exploring frontend structures & styling",
    progress: 45,
    color: "#6EA8FE",
    icon: "ðŸŽ¨",
  },
  {
    label: "Frontend Engineering",
    status: "currently exploring",
    description: "React, Next.js, and component thinking",
    progress: 30,
    color: "#D4FF3F",
    icon: "ðŸ§©",
  },
  {
    label: "Embedded Systems",
    status: "engineering curiosity",
    description: "Microcontrollers, sensors, and hardware interfaces",
    progress: 22,
    color: "#FF8A00",
    icon: "ðŸ”Œ",
  },
];

const terminalLines = [
  "$ whoami",
  "Erlangga Pradana Kurniawan // Electrical Engineering Student",
  "$ scan --interests",
  "frontend, embedded systems, iot, robotics, ai, creative technology",
  "$ status",
  "currently debugging life... voltage stable.",
  "$ contact --list",
  "email: pradanaerlangga99@gmail.com",
  "github: github.com/Ethern-ram",
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useMouseLab() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 140, damping: 22 });
  const smoothY = useSpring(y, { stiffness: 140, damping: 22 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return { smoothX, smoothY };
}

function LabPanel({
  children,
  className,
  accent = "bg-[#F5F3EA]",
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <motion.div
      whileHover={{ x: -2, y: -2, rotate: -0.4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cn(
        "relative w-full max-w-full border-[3px] border-black shadow-[4px_4px_0_#000] transition-shadow hover:shadow-[6px_6px_0_#000] md:shadow-[8px_8px_0_#000] md:hover:shadow-[10px_10px_0_#000]",
        accent,
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function CircuitField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 engineering-grid opacity-35" />
      <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
        <motion.path
          d="M40 160 H210 V80 H420 V220 H650 V120 H900 V260 H1160"
          fill="none"
          stroke="#000"
          strokeWidth="2"
          strokeDasharray="18 18"
          animate={{ strokeDashoffset: [0, -52] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M120 620 H350 V500 H570 V700 H860 V560 H1180"
          fill="none"
          stroke="#6EA8FE"
          strokeWidth="3"
          strokeDasharray="24 24"
          animate={{ strokeDashoffset: [0, 72] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
        {[220, 620, 1040].map((cx, index) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy={index % 2 ? 220 : 120}
            r="6"
            fill="#D4FF3F"
            stroke="#000"
            strokeWidth="3"
            animate={{ scale: [1, 1.7, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
      </svg>
      {Array.from({ length: 7 }).map((_, index) => (
        <motion.span
          className="absolute h-2 w-2 border-2 border-black bg-[#D4FF3F] opacity-60"
          key={index}
          style={{
            left: `${(index * 17) % 96}%`,
            top: `${(index * 31) % 88}%`,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 5 + (index % 3), repeat: Infinity, delay: index * 0.25 }}
        />
      ))}
    </div>
  );
}

function Waveform({ className }: { className?: string }) {
  const points = useMemo(
    () =>
      Array.from({ length: 36 })
        .map((_, index) => {
          const x = index * 18;
          const y = 52 + Math.sin(index * 0.85) * 24 + Math.cos(index * 0.35) * 10;
          return `${x},${y}`;
        })
        .join(" "),
    [],
  );

  return (
    <svg className={cn("h-32 w-full", className)} viewBox="0 0 640 120" preserveAspectRatio="none">
      <motion.polyline
        points={points}
        fill="none"
        stroke="#000"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="square"
        strokeDasharray="900"
        initial={{ strokeDashoffset: 900 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.line
        x1="0"
        y1="60"
        x2="640"
        y2="60"
        stroke="#FF8A00"
        strokeWidth="3"
        strokeDasharray="8 12"
        animate={{ x: [-80, 80] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
      />
    </svg>
  );
}

function TelemetryBars() {
  return (
    <div className="mt-7 flex h-16 items-end gap-2 border-[3px] border-black bg-[#F5F3EA] p-2">
      {[46, 62, 38, 78, 54, 88, 43, 70].map((height, index) => (
        <motion.span
          key={index}
          className="w-full border-2 border-black bg-black"
          animate={{ height: [`${height - 10}%`, `${height}%`, `${height - 4}%`] }}
          transition={{ duration: 1.8 + index * 0.05, repeat: Infinity, repeatType: "mirror" }}
        />
      ))}
    </div>
  );
}

function ProfileImage() {
  return (
    <motion.div
      whileHover={{ rotate: -2, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 14 }}
      className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border-[4px] border-black shadow-[8px_8px_0_#D4FF3F] md:shadow-[12px_12px_0_#D4FF3F]">
        <Image
          src="/gambarku.jpeg"
          alt="Erlangga Pradana Kurniawan"
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
          priority
        />
      </div>
      <motion.div
        className="absolute -bottom-3 -right-3 border-[3px] border-black bg-[#D4FF3F] px-3 py-2 font-mono text-[10px] font-black uppercase tracking-wider shadow-[4px_4px_0_#000]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        human.exe running
      </motion.div>
    </motion.div>
  );
}

function HeroStatusPanel() {
  return (
    <div className="relative grid w-full max-w-full gap-4 sm:gap-5 lg:gap-6">
      <LabPanel className="p-4 sm:p-5 lg:p-6" accent="bg-[#F5F3EA]">
        <div className="flex items-start justify-between gap-4 sm:gap-6">
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.22em]">
              system status
            </p>
            <p className="mt-4 text-[clamp(2.4rem,10vw,3rem)] font-black uppercase leading-none">
              Online
            </p>
            <p className="mt-4 max-w-sm font-mono text-xs font-bold uppercase leading-relaxed">
              voltage stable. lab status active. building weird systems with
              controlled chaos.
            </p>
          </div>
          <span className="relative grid h-12 w-12 shrink-0 place-items-center border-[3px] border-black bg-[#D4FF3F] sm:h-14 sm:w-14 lg:h-16 lg:w-16">
            <span className="absolute h-full w-full animate-ping bg-[#D4FF3F] opacity-30" />
            <Gauge className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={3} />
          </span>
        </div>
        <TelemetryBars />
      </LabPanel>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6">
        <LabPanel className="p-5" accent="bg-[#F5F3EA]">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">
            identity
          </p>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[clamp(2.4rem,10vw,3rem)] font-black leading-none">19</p>
              <p className="font-mono text-xs font-black uppercase">years old</p>
            </div>
            <div className="text-right">
              <p className="text-[clamp(2.4rem,10vw,3rem)] font-black leading-none">04</p>
              <p className="font-mono text-xs font-black uppercase">semester</p>
            </div>
          </div>
        </LabPanel>
        <LabPanel className="p-5" accent="bg-[#F5F3EA]">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">
            ai + robotics
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="grid h-11 w-11 place-items-center border-[3px] border-black bg-[#FF8A00] sm:h-12 sm:w-12">
              <Bot size={26} strokeWidth={3} />
            </span>
            <span className="grid h-11 w-11 place-items-center border-[3px] border-black bg-[#F5F3EA] sm:h-12 sm:w-12">
              <BrainCircuit size={26} strokeWidth={3} />
            </span>
          </div>
          <p className="mt-5 text-[clamp(1.45rem,6vw,1.5rem)] font-black uppercase leading-none">
            experiments queued
          </p>
        </LabPanel>
      </div>

      <LabPanel className="p-5" accent="bg-[#6EA8FE]">
        <p className="font-mono text-xs font-black uppercase tracking-[0.18em]">
          current project
        </p>
        <p className="mt-4 text-[clamp(2rem,8vw,2.25rem)] font-black uppercase leading-none lg:text-4xl">
          IoT interface lab
        </p>
        <p className="mt-4 max-w-md font-mono text-xs font-bold uppercase leading-relaxed">
          sensor data, microcontroller signals, and web UI meeting in one
          believable control surface.
        </p>
      </LabPanel>
    </div>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -70]);

  return (
    <section className="relative min-h-screen overflow-hidden px-3 pb-18 pt-4 sm:px-4 sm:pb-20 md:px-6 md:pb-24 lg:px-10 xl:px-12">
      <CircuitField />
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-4 border-[3px] border-black bg-[#F5F3EA] p-3 shadow-[5px_5px_0_#000] md:shadow-[8px_8px_0_#000]"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center border-[3px] border-black bg-[#D4FF3F]">
            <Microchip size={28} strokeWidth={3} />
          </span>
          <div>
            <p className="text-sm font-black uppercase leading-none">Erlangga Lab OS</p>
            <p className="max-w-[14rem] font-mono text-[10px] font-bold uppercase tracking-[0.12em] sm:max-w-none sm:tracking-[0.2em]">
              personal digital engineering laboratory
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.a
            href="https://github.com/Ethern-ram"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: -3, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 border-[3px] border-black bg-black px-3 py-2 font-mono text-xs font-black uppercase text-[#F5F3EA] shadow-[4px_4px_0_#D4FF3F] transition-shadow hover:shadow-[6px_6px_0_#D4FF3F]"
          >
            <GitFork size={16} strokeWidth={3} />
            GitHub
            <ExternalLink size={12} strokeWidth={3} />
          </motion.a>
          <a
            href="mailto:pradanaerlangga99@gmail.com"
            className="flex items-center gap-2 border-[3px] border-black bg-[#D4FF3F] px-3 py-2 font-mono text-xs font-black uppercase shadow-[4px_4px_0_#000] transition-shadow hover:shadow-[6px_6px_0_#000]"
          >
            <Mail size={16} strokeWidth={3} />
            Email
          </a>
          <span className="hidden items-center gap-2 font-mono text-xs font-black uppercase sm:flex">
            <span className="h-3 w-3 animate-pulse border-2 border-black bg-[#D4FF3F]" />
            active
          </span>
        </div>
      </motion.nav>

      <div className="relative z-10 mx-auto mt-10 grid w-full max-w-[1500px] gap-8 md:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start lg:gap-10 xl:gap-12">
        <motion.div style={{ y }} className="relative min-w-0">
          <motion.p
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex max-w-full border-[3px] border-black bg-[#D4FF3F] px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.1em] shadow-[5px_5px_0_#000] sm:px-4 sm:text-xs sm:tracking-[0.18em] md:mb-8"
          >
            building weird systems {"//"} voltage stable
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-full text-[clamp(2.7rem,13.2vw,8.75rem)] font-black uppercase leading-[0.8] xl:text-[clamp(5rem,9.6vw,10rem)]"
          >
            Erlangga
            <span className="block translate-x-0 font-bold text-[#F5F3EA] text-lab-outline sm:translate-x-2 md:translate-x-10 xl:translate-x-16">
              Pradana
            </span>
            <span className="mt-2 block max-w-full bg-black px-2 pb-3 text-[#F5F3EA] shadow-[5px_5px_0_#D4FF3F] sm:px-3 md:ml-8 md:pb-4 md:shadow-[8px_8px_0_#D4FF3F] xl:ml-12">
              Kurniawan
            </span>
          </motion.h1>
          <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-6">
            <LabPanel className="p-5 md:p-6" accent="bg-[#F5F3EA]">
              <p className="text-[clamp(1.35rem,5vw,1.9rem)] font-black leading-tight">
                Electrical Engineering Student {"//"} Creative Technologist.
              </p>
              <p className="mt-5 max-w-xl font-mono text-sm font-bold uppercase leading-relaxed">
                Semester 4 builder mixing frontend engineering, embedded systems, IoT,
                robotics, AI, and visual experiments.
              </p>
            </LabPanel>
            <LabPanel className="p-4 md:p-5" accent="bg-[#F5F3EA]">
              <div className="flex items-center justify-between">
                <Gauge size={30} strokeWidth={3} />
                <span className="font-mono text-xs font-black uppercase tracking-[0.18em]">
                  oscilloscope
                </span>
              </div>
              <Waveform />
            </LabPanel>
          </div>
        </motion.div>

        <HeroStatusPanel />
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-y-[3px] border-black bg-black py-3 text-[#F5F3EA]">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap font-mono text-sm font-black uppercase tracking-[0.18em]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <div className="flex gap-8" key={copy}>
            <span className="text-[#D4FF3F]">engineering chaos into interfaces</span>
            <span>frontend {"//"} embedded {"//"} iot {"//"} robotics</span>
            <span className="text-[#FF8A00]">currently debugging life</span>
            <span>running experiments</span>
            <span className="text-[#6EA8FE]">human after all</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-90, 90]);

  return (
    <section ref={ref} className="relative px-3 py-16 sm:px-4 md:px-6 md:py-20 lg:px-10 lg:py-24 xl:px-12">
      <motion.div style={{ x }} className="absolute right-6 top-10 hidden text-[10rem] font-black uppercase leading-none opacity-[0.06] lg:block">
        SEM 04
      </motion.div>
      <div className="mx-auto grid w-full max-w-[1500px] gap-5 lg:grid-cols-12">
        <LabPanel className="p-6 lg:col-span-4" accent="bg-[#F5F3EA]">
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em]">personal log / not an agency</p>
          <h2 className="mt-4 text-[clamp(2.45rem,10vw,4.5rem)] font-black uppercase leading-[0.9]">
            I study circuits, then make interfaces feel electric.
          </h2>
        </LabPanel>
        <div className="lg:col-span-4 lg:translate-y-16">
          <ProfileImage />
        </div>
        <LabPanel className="p-5 lg:col-span-4" accent="bg-[#F5F3EA]">
          <BatteryCharging size={36} strokeWidth={3} />
          <p className="mt-5 font-mono text-xs font-black uppercase">current focus</p>
          <p className="mt-2 text-[clamp(1.6rem,6vw,1.9rem)] font-black leading-none">frontend systems for real-world hardware ideas.</p>
          <p className="mt-4 text-[clamp(1.1rem,4vw,1.25rem)] font-bold leading-tight">
            Erlangga is a 19-year-old Electrical Engineering student who treats
            code like a lab bench: test, break, measure, rebuild, repeat.
          </p>
        </LabPanel>
        {[
          ["Engineering instinct", "Thinking in signals, constraints, power, failure modes, and real-world behavior."],
          ["Visual creativity", "Building interfaces with strong rhythm, hierarchy, motion, and personality."],
          ["Builder mindset", "Small experiments first. Working prototype before overthinking the perfect plan."],
        ].map(([title, copy], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08 }}
            className={cn(
              "border-[3px] border-black p-5 shadow-[8px_8px_0_#000] lg:col-span-4",
              index === 0 && "bg-[#F5F3EA]",
              index === 1 && "bg-[#F5F3EA] lg:-translate-y-8",
              index === 2 && "bg-[#F5F3EA] lg:translate-y-8",
            )}
          >
            <p className="font-mono text-xs font-black uppercase tracking-[0.18em]">0{index + 1}</p>
            <h3 className="mt-5 text-3xl font-black uppercase leading-none">{title}</h3>
            <p className="mt-4 text-lg font-bold leading-tight">{copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectExperiment({ project, index }: { project: typeof projects[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.article
      layout
      onClick={() => setOpen((value) => !value)}
      whileHover={{ y: -6, rotate: index % 2 ? 1 : -1 }}
      className={cn(
        "w-full max-w-full cursor-pointer border-[3px] border-black p-4 shadow-[5px_5px_0_#000] sm:p-5 md:shadow-[9px_9px_0_#000]",
        project.color,
        index === 0 && "lg:col-span-7",
        index === 1 && "lg:col-span-5 lg:translate-y-14",
        index === 2 && "lg:col-span-12 lg:mx-0 xl:mx-24",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="safe-text font-mono text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.18em]">
            {project.id} {"//"} {project.type}
          </p>
          <h3 className="safe-text mt-4 text-[clamp(2rem,8vw,3.75rem)] font-black uppercase leading-none">
            {project.title}
          </h3>
        </div>
        <motion.div animate={{ rotate: open ? 45 : 0 }} className="grid h-12 w-12 place-items-center border-[3px] border-black bg-[#F5F3EA]">
          <ArrowUpRight size={26} strokeWidth={3} />
        </motion.div>
      </div>
      <motion.div layout className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(210px,250px)]">
        <p className="text-[clamp(1.05rem,4vw,1.25rem)] font-bold leading-tight">{project.copy}</p>
        <div className="border-[3px] border-black bg-[#F5F3EA] p-4">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em]">
            lab note
          </p>
          <p className="mt-5 text-[clamp(1.35rem,5vw,1.5rem)] font-black uppercase leading-none">
            Prototype first. Measure later. Refine always.
          </p>
        </div>
      </motion.div>
      <motion.div
        layout
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="mt-6 flex flex-wrap gap-3 border-t-[3px] border-black pt-5">
          {project.stack.map((item) => (
            <span key={item} className="border-[3px] border-black bg-[#F5F3EA] px-3 py-2 font-mono text-xs font-black uppercase shadow-[4px_4px_0_#000]">
              {item}
            </span>
          ))}
        </div>
        <button className="mt-6 inline-flex items-center gap-2 border-[3px] border-black bg-black px-5 py-3 font-mono text-xs font-black uppercase text-[#F5F3EA] shadow-[6px_6px_0_#F5F3EA]">
          inspect experiment <MousePointer2 size={16} strokeWidth={3} />
        </button>
      </motion.div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="px-3 py-16 sm:px-4 md:px-6 md:py-20 lg:px-10 lg:py-24 xl:px-12">
      <div className="mx-auto mb-10 grid w-full max-w-[1500px] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-end">
        <h2 className="text-[clamp(2.7rem,11vw,6rem)] font-black uppercase leading-[0.86]">
          Lab experiments, not portfolio cards.
        </h2>
        <LabPanel className="p-5" accent="bg-[#D4FF3F]">
          <p className="font-mono text-xs font-black uppercase tracking-[0.18em]">tap / hover to expand</p>
          <p className="mt-3 text-2xl font-black leading-none">Projects are treated as prototypes with moving signals.</p>
        </LabPanel>
      </div>
      <div className="mx-auto grid w-full max-w-[1500px] gap-5 lg:grid-cols-12 lg:gap-6">
        {projects.map((project, index) => (
          <ProjectExperiment key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="px-3 py-16 sm:px-4 md:px-6 md:py-20 lg:px-10 lg:py-24 xl:px-12">
      <div className="mx-auto grid w-full max-w-[1500px] gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-12">
        <div>
          <h2 className="text-[clamp(2.7rem,11vw,6rem)] font-black uppercase leading-[0.86]">
            Learning dashboard.
          </h2>
          <LabPanel className="mt-6 p-5 md:mt-8 md:p-6" accent="bg-[#F5F3EA]">
            <p className="text-[clamp(1.3rem,5vw,1.5rem)] font-black leading-tight">
              Not an expert. Not pretending to be. Just a student improving daily
              and documenting the process.
            </p>
            <p className="mt-4 font-mono text-xs font-bold uppercase leading-relaxed">
              These progress bars reflect honest learning stages, not mastery claims.
            </p>
          </LabPanel>
        </div>
        <div className="space-y-5">
          {learningSkills.map((skill, index) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: -3, y: -3 }}
              className="w-full max-w-full border-[3px] border-black bg-[#F5F3EA] p-4 shadow-[5px_5px_0_#000] transition-shadow hover:shadow-[7px_7px_0_#000] md:shadow-[7px_7px_0_#000] md:hover:shadow-[10px_10px_0_#000]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{skill.icon}</span>
                  <div>
                    <span className="font-mono text-sm font-black uppercase">{skill.label}</span>
                    <span className="ml-3 inline-flex border-[2px] border-black bg-[#D4FF3F] px-2 py-0.5 font-mono text-[10px] font-black uppercase">
                      {skill.status}
                    </span>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-xs font-black">{skill.progress}%</span>
              </div>
              <p className="mt-2 font-mono text-xs font-bold uppercase text-gray-600">
                {skill.description}
              </p>
              <div className="mt-3 h-5 border-[3px] border-black bg-white">
                <motion.div
                  className="h-full border-r-[3px] border-black"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.06 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TerminalContact() {
  const [lineCount, setLineCount] = useState(3);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLineCount((count) => (count >= terminalLines.length ? 3 : count + 1));
    }, 1500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="contact" className="px-3 py-16 sm:px-4 md:px-6 md:py-20 lg:px-10 lg:py-24 xl:px-12">
      <div className="mx-auto grid w-full max-w-[1500px] gap-5 border-[3px] border-black bg-black p-3 text-[#F5F3EA] shadow-[6px_6px_0_#000] sm:p-4 md:p-7 md:shadow-[12px_12px_0_#000] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-6">
        <div className="min-w-0 border-[3px] border-[#F5F3EA] p-4 sm:p-5">
          <div className="flex items-center justify-between border-b-[3px] border-[#F5F3EA] pb-4">
            <div className="flex items-center gap-3">
              <Terminal className="text-[#D4FF3F]" size={30} strokeWidth={3} />
              <span className="safe-text font-mono text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.18em]">erlangga-contact.sh</span>
            </div>
            <span className="font-mono text-[#FF8A00]">[o][o][o]</span>
          </div>
          <div className="mt-6 min-h-56 space-y-3 font-mono text-sm font-bold uppercase">
            {terminalLines.slice(0, lineCount).map((line, index) => (
              <motion.p
                key={`${line}-${index}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "safe-text",
                  line.startsWith("$") ? "text-[#D4FF3F]" : "text-[#F5F3EA]",
                )}
              >
                {line}
              </motion.p>
            ))}
            <span className="inline-block h-5 w-3 animate-pulse bg-[#D4FF3F]" />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#D4FF3F]">open channel</p>
            <h2 className="safe-text mt-4 text-[clamp(2.5rem,11vw,4.5rem)] font-black uppercase leading-none">
              Send a signal.
            </h2>
          </div>
          <div className="grid gap-4">
            <a
              href="mailto:pradanaerlangga99@gmail.com"
              className="group flex max-w-full items-center justify-between gap-4 border-[3px] border-[#F5F3EA] bg-[#D4FF3F] p-4 text-black shadow-[5px_5px_0_#FF8A00] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#FF8A00] sm:p-5 md:shadow-[8px_8px_0_#FF8A00] md:hover:shadow-[12px_12px_0_#FF8A00]"
            >
              <span className="min-w-0">
                <span className="block text-2xl font-black uppercase">Email</span>
                <span className="safe-text block font-mono text-xs font-black uppercase">pradanaerlangga99@gmail.com</span>
              </span>
              <Mail className="shrink-0 transition group-hover:rotate-12" size={30} strokeWidth={3} />
            </a>
            <motion.a
              href="https://github.com/Ethern-ram"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: -4, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group flex max-w-full items-center justify-between gap-4 border-[3px] border-[#F5F3EA] bg-[#6EA8FE] p-4 text-black shadow-[5px_5px_0_#D4FF3F] transition-shadow hover:shadow-[8px_8px_0_#D4FF3F] sm:p-5 md:shadow-[8px_8px_0_#D4FF3F] md:hover:shadow-[12px_12px_0_#D4FF3F]"
            >
              <span className="min-w-0">
                <span className="block text-2xl font-black uppercase">GitHub</span>
                <span className="safe-text block font-mono text-xs font-black uppercase">github.com/Ethern-ram</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <GitFork className="transition group-hover:rotate-12" size={30} strokeWidth={3} />
                <ExternalLink className="transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} strokeWidth={3} />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-[3px] border-black bg-black px-3 py-8 text-[#F5F3EA] sm:px-4 md:px-6 lg:px-10 xl:px-12">
      <div className="mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-6">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.18em]">
            Erlangga Pradana Kurniawan Â© 2025
          </p>
          <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">
            built with curiosity, caffeine, and controlled chaos
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:pradanaerlangga99@gmail.com"
            className="flex items-center gap-2 border-[2px] border-[#F5F3EA] px-3 py-2 font-mono text-[10px] font-black uppercase transition hover:bg-[#D4FF3F] hover:text-black"
          >
            <Mail size={14} strokeWidth={3} />
            Email
          </a>
          <motion.a
            href="https://github.com/Ethern-ram"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, x: -2 }}
            className="flex items-center gap-2 border-[2px] border-[#F5F3EA] px-3 py-2 font-mono text-[10px] font-black uppercase shadow-[3px_3px_0_#D4FF3F] transition-shadow hover:shadow-[5px_5px_0_#D4FF3F]"
          >
            <GitFork size={14} strokeWidth={3} />
            GitHub
            <ExternalLink size={10} strokeWidth={3} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const { smoothX, smoothY } = useMouseLab();

  useEffect(() => {
    if (!rootRef.current) return;
    const panels = gsap.utils.toArray<HTMLElement>(".gsap-rise");
    gsap.fromTo(
      panels,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "power3.out" },
    );
  }, []);

  return (
    <main ref={rootRef} className="relative min-h-screen w-full overflow-x-clip bg-[#F5F3EA] text-[#111111]">
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 border-[3px] border-black bg-[#D4FF3F] mix-blend-multiply shadow-[5px_5px_0_#000] md:block"
        style={{ x: smoothX, y: smoothY }}
      />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Skills />
      <TerminalContact />
      <Footer />
    </main>
  );
}
