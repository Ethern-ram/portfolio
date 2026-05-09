"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import {
  ArrowUpRight,
  ExternalLink,
  Gauge,
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
  },
  {
    id: "exp-02",
    title: "Robotics Motion Console",
    type: "Robotics UI Prototype",
    copy: "A cinematic controller surface for robot states, motor feedback, path planning, and human-readable diagnostics.",
    stack: ["React", "Motion", "Arduino", "Control"],
  },
  {
    id: "exp-03",
    title: "AI Study Companion",
    type: "Creative AI Tool",
    copy: "An interface experiment for turning electrical engineering notes into small quizzes, diagrams, and debugging prompts.",
    stack: ["AI UX", "TypeScript", "RAG", "Design"],
  },
];

const learningSkills = [
  { label: "Python", status: "currently learning", description: "AI + automation fundamentals", progress: 35, color: "#D4FF3F" },
  { label: "C++", status: "building fundamentals", description: "Logic & systems programming", progress: 28, color: "#FF8A00" },
  { label: "HTML / CSS", status: "experimenting with", description: "Frontend structures & styling", progress: 45, color: "#6EA8FE" },
  { label: "Frontend Engineering", status: "currently exploring", description: "React, Next.js, component thinking", progress: 30, color: "#D4FF3F" },
  { label: "Embedded Systems", status: "engineering curiosity", description: "Microcontrollers & hardware interfaces", progress: 22, color: "#FF8A00" },
  { label: "IoT", status: "experimenting with", description: "Sensors, protocols, and connected devices", progress: 25, color: "#6EA8FE" },
];

const terminalLines = [
  "$ whoami",
  "Erlangga Pradana Kurniawan // Electrical Engineering Student",
  "$ scan --interests",
  "frontend, embedded systems, iot, robotics, ai",
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
  const smoothX = useSpring(x, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 25 });

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
    <div
      className={cn(
        "relative w-full max-w-full border-[3px] border-black shadow-[6px_6px_0_#000] transition-all duration-200 hover:shadow-[8px_8px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5",
        accent,
        className,
      )}
    >
      {children}
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
    <svg className={cn("h-24 w-full", className)} viewBox="0 0 640 120" preserveAspectRatio="none">
      <motion.polyline
        points={points}
        fill="none"
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="square"
        strokeDasharray="900"
        initial={{ strokeDashoffset: 900 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      <line x1="0" y1="60" x2="640" y2="60" stroke="#FF8A00" strokeWidth="2" strokeDasharray="8 14" opacity="0.4" />
    </svg>
  );
}

function ProfileImage() {
  return (
    <motion.div
      whileHover={{ rotate: -1.5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border-[4px] border-black shadow-[10px_10px_0_#D4FF3F]">
        <Image
          src="/gambarku.jpeg"
          alt="Erlangga Pradana Kurniawan"
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px"
          priority
        />
      </div>
      <div className="absolute -bottom-3 -right-3 border-[3px] border-black bg-[#D4FF3F] px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-wider shadow-[3px_3px_0_#000]">
        human.exe
      </div>
    </motion.div>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-20 pt-5 sm:px-6 md:px-8 md:pb-28 lg:px-12 xl:px-16">
      {/* Subtle background grid */}
      <div className="pointer-events-none absolute inset-0 engineering-grid opacity-20" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 border-[3px] border-black bg-[#F5F3EA] p-3 shadow-[6px_6px_0_#000]"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border-[3px] border-black bg-[#D4FF3F]">
            <Microchip size={22} strokeWidth={3} />
          </span>
          <div>
            <p className="text-sm font-black uppercase leading-none">Erlangga Lab</p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600">
              engineering laboratory
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.a
            href="https://github.com/Ethern-ram"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="flex items-center gap-1.5 border-[3px] border-black bg-black px-3 py-1.5 font-mono text-[11px] font-black uppercase text-[#F5F3EA] shadow-[3px_3px_0_#D4FF3F] transition-shadow hover:shadow-[5px_5px_0_#D4FF3F]"
          >
            <GitFork size={14} strokeWidth={3} />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink size={10} strokeWidth={3} />
          </motion.a>
          <a
            href="mailto:pradanaerlangga99@gmail.com"
            className="flex items-center gap-1.5 border-[3px] border-black bg-[#D4FF3F] px-3 py-1.5 font-mono text-[11px] font-black uppercase shadow-[3px_3px_0_#000] transition-shadow hover:shadow-[5px_5px_0_#000]"
          >
            <Mail size={14} strokeWidth={3} />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
      </motion.nav>

      {/* Hero content */}
      <div className="relative z-10 mx-auto mt-16 grid w-full max-w-[1400px] gap-12 md:mt-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-start lg:gap-16">
        <motion.div style={{ y }} className="relative min-w-0">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-8 inline-flex border-[3px] border-black bg-[#D4FF3F] px-4 py-2 font-mono text-[11px] font-black uppercase tracking-[0.15em] shadow-[4px_4px_0_#000]"
          >
            building weird systems // voltage stable
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(3rem,14vw,9rem)] font-black uppercase leading-[0.82] xl:text-[clamp(5.5rem,10vw,10rem)]"
          >
            Erlangga
            <span className="block translate-x-0 font-bold text-[#F5F3EA] text-lab-outline sm:translate-x-2 md:translate-x-8 xl:translate-x-14">
              Pradana
            </span>
            <span className="mt-2 block bg-black px-3 pb-3 text-[#F5F3EA] shadow-[6px_6px_0_#D4FF3F] md:ml-6 md:pb-4 md:shadow-[8px_8px_0_#D4FF3F] xl:ml-10">
              Kurniawan
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 max-w-2xl md:mt-14"
          >
            <LabPanel className="p-6 md:p-8">
              <p className="text-[clamp(1.4rem,4.5vw,2rem)] font-black leading-tight">
                Electrical Engineering Student // Creative Technologist.
              </p>
              <p className="mt-4 max-w-lg font-mono text-sm font-bold uppercase leading-relaxed text-gray-700">
                Semester 4 builder mixing frontend engineering, embedded systems,
                IoT, and visual experiments.
              </p>
            </LabPanel>
          </motion.div>
        </motion.div>

        {/* Right side - reduced to 2 key panels */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid gap-5"
        >
          <LabPanel className="p-5 md:p-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">system status</p>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-pulse border-[2px] border-black bg-[#D4FF3F]" />
                <span className="font-mono text-[10px] font-black uppercase">active</span>
              </span>
            </div>
            <p className="mt-4 text-[clamp(2rem,8vw,2.5rem)] font-black uppercase leading-none">
              Online
            </p>
            <div className="mt-5">
              <Waveform />
            </div>
          </LabPanel>

          <LabPanel className="p-5 md:p-6" accent="bg-[#6EA8FE]">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">current focus</p>
            <p className="mt-3 text-[clamp(1.5rem,6vw,1.75rem)] font-black uppercase leading-tight">
              IoT interface lab
            </p>
            <p className="mt-3 font-mono text-xs font-bold uppercase leading-relaxed">
              sensor data + microcontroller signals + web UI
            </p>
          </LabPanel>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-y-[3px] border-black bg-black py-3 text-[#F5F3EA]">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap font-mono text-sm font-black uppercase tracking-[0.18em]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <div className="flex gap-10" key={copy}>
            <span className="text-[#D4FF3F]">engineering chaos into interfaces</span>
            <span>frontend // embedded // iot</span>
            <span className="text-[#FF8A00]">currently debugging life</span>
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
  const x = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={ref} className="relative px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16">
      <motion.div style={{ x }} className="absolute right-8 top-12 hidden text-[9rem] font-black uppercase leading-none opacity-[0.04] lg:block">
        SEM 04
      </motion.div>
      <div className="mx-auto grid w-full max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)_minmax(0,1fr)] lg:gap-10">
        <LabPanel className="p-6 md:p-8">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">about</p>
          <h2 className="mt-4 text-[clamp(2rem,8vw,3.5rem)] font-black uppercase leading-[0.9]">
            I study circuits, then make interfaces feel electric.
          </h2>
          <p className="mt-5 text-lg font-bold leading-snug">
            A 19-year-old Electrical Engineering student who treats code like a lab bench:
            test, break, measure, rebuild, repeat.
          </p>
        </LabPanel>

        <div className="flex items-center justify-center lg:translate-y-8">
          <ProfileImage />
        </div>

        <LabPanel className="p-6 md:p-8">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">mindset</p>
          <div className="mt-5 space-y-6">
            {[
              ["Engineering instinct", "Thinking in signals, constraints, and failure modes."],
              ["Builder mindset", "Small experiments first. Prototype before overthinking."],
              ["Visual creativity", "Interfaces with rhythm, hierarchy, and personality."],
            ].map(([title, copy]) => (
              <div key={title}>
                <h3 className="text-lg font-black uppercase leading-none">{title}</h3>
                <p className="mt-1.5 text-sm font-bold leading-snug text-gray-600">{copy}</p>
              </div>
            ))}
          </div>
        </LabPanel>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={() => setOpen((v) => !v)}
      className="w-full cursor-pointer border-[3px] border-black bg-[#F5F3EA] p-5 shadow-[6px_6px_0_#000] transition-all duration-200 hover:shadow-[8px_8px_0_#000] hover:-translate-y-1 sm:p-6 md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.15em] text-gray-500">
            {project.id} // {project.type}
          </p>
          <h3 className="mt-3 text-[clamp(1.75rem,6vw,3rem)] font-black uppercase leading-none">
            {project.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="grid h-10 w-10 shrink-0 place-items-center border-[3px] border-black bg-[#F5F3EA]"
        >
          <ArrowUpRight size={20} strokeWidth={3} />
        </motion.div>
      </div>

      <p className="mt-4 max-w-2xl text-base font-bold leading-snug text-gray-700 md:text-lg">
        {project.copy}
      </p>

      <motion.div
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        initial={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="mt-5 flex flex-wrap gap-2 border-t-[3px] border-black pt-5">
          {project.stack.map((item) => (
            <span key={item} className="border-[2px] border-black bg-[#F5F3EA] px-3 py-1.5 font-mono text-[11px] font-black uppercase shadow-[3px_3px_0_#000]">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">experiments</p>
          <h2 className="mt-3 text-[clamp(2.5rem,10vw,5rem)] font-black uppercase leading-[0.86]">
            Lab experiments.
          </h2>
          <p className="mt-4 text-lg font-bold text-gray-600">
            Projects treated as prototypes with moving signals. Tap to expand.
          </p>
        </div>
        <div className="grid gap-5 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">currently studying</p>
          <h2 className="mt-3 text-[clamp(2.5rem,10vw,5rem)] font-black uppercase leading-[0.86]">
            Learning dashboard.
          </h2>
          <p className="mt-4 text-lg font-bold text-gray-600">
            Not an expert. Not pretending to be. Just improving daily and documenting the process.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningSkills.map((skill, index) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="border-[3px] border-black bg-[#F5F3EA] p-4 shadow-[5px_5px_0_#000] transition-all duration-200 hover:shadow-[7px_7px_0_#000] hover:-translate-y-0.5 sm:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-black uppercase">{skill.label}</span>
                <span className="font-mono text-[11px] font-black text-gray-500">{skill.progress}%</span>
              </div>
              <span className="mt-2 inline-flex border-[2px] border-black px-2 py-0.5 font-mono text-[9px] font-black uppercase" style={{ backgroundColor: skill.color }}>
                {skill.status}
              </span>
              <p className="mt-2 font-mono text-[11px] font-bold uppercase text-gray-500">
                {skill.description}
              </p>
              <div className="mt-3 h-4 border-[2px] border-black bg-white">
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

function TerminalContact() {
  const [lineCount, setLineCount] = useState(3);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLineCount((count) => (count >= terminalLines.length ? 3 : count + 1));
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-16">
      <div className="mx-auto w-full max-w-[1400px] border-[3px] border-black bg-black p-4 text-[#F5F3EA] shadow-[8px_8px_0_#000] sm:p-6 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          {/* Terminal */}
          <div className="border-[3px] border-[#F5F3EA]/30 p-4 sm:p-5">
            <div className="flex items-center justify-between border-b-[2px] border-[#F5F3EA]/20 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="text-[#D4FF3F]" size={22} strokeWidth={3} />
                <span className="font-mono text-[11px] font-black uppercase tracking-[0.15em]">contact.sh</span>
              </div>
              <span className="font-mono text-[11px] text-[#FF8A00]">[o][o][o]</span>
            </div>
            <div className="mt-5 min-h-48 space-y-2.5 font-mono text-sm font-bold">
              {terminalLines.slice(0, lineCount).map((line, index) => (
                <motion.p
                  key={`${line}-${index}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "safe-text",
                    line.startsWith("$") ? "text-[#D4FF3F]" : "text-[#F5F3EA]/80",
                  )}
                >
                  {line}
                </motion.p>
              ))}
              <span className="inline-block h-4 w-2.5 animate-pulse bg-[#D4FF3F]" />
            </div>
          </div>

          {/* Contact links */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-[#D4FF3F]">open channel</p>
              <h2 className="mt-3 text-[clamp(2.2rem,9vw,4rem)] font-black uppercase leading-none">
                Send a signal.
              </h2>
            </div>
            <div className="grid gap-3">
              <a
                href="mailto:pradanaerlangga99@gmail.com"
                className="group flex items-center justify-between gap-4 border-[3px] border-[#F5F3EA] bg-[#D4FF3F] p-4 text-black shadow-[5px_5px_0_#FF8A00] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#FF8A00]"
              >
                <span className="min-w-0">
                  <span className="block text-xl font-black uppercase">Email</span>
                  <span className="safe-text block font-mono text-[11px] font-bold uppercase text-black/70">pradanaerlangga99@gmail.com</span>
                </span>
                <Mail className="shrink-0 transition-transform group-hover:rotate-6" size={26} strokeWidth={3} />
              </a>
              <a
                href="https://github.com/Ethern-ram"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-[3px] border-[#F5F3EA] bg-[#6EA8FE] p-4 text-black shadow-[5px_5px_0_#D4FF3F] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#D4FF3F]"
              >
                <span className="min-w-0">
                  <span className="block text-xl font-black uppercase">GitHub</span>
                  <span className="safe-text block font-mono text-[11px] font-bold uppercase text-black/70">github.com/Ethern-ram</span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <GitFork className="transition-transform group-hover:rotate-6" size={26} strokeWidth={3} />
                  <ExternalLink size={16} strokeWidth={3} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-[3px] border-black bg-black px-4 py-6 text-[#F5F3EA] sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[11px] font-black uppercase tracking-[0.15em]">
          Erlangga Pradana Kurniawan - 2025
        </p>
        <div className="flex items-center gap-3">
          <a
            href="mailto:pradanaerlangga99@gmail.com"
            className="flex items-center gap-1.5 border-[2px] border-[#F5F3EA]/40 px-2.5 py-1.5 font-mono text-[10px] font-black uppercase transition-colors hover:border-[#D4FF3F] hover:text-[#D4FF3F]"
          >
            <Mail size={12} strokeWidth={3} />
            Email
          </a>
          <a
            href="https://github.com/Ethern-ram"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border-[2px] border-[#F5F3EA]/40 px-2.5 py-1.5 font-mono text-[10px] font-black uppercase transition-colors hover:border-[#D4FF3F] hover:text-[#D4FF3F]"
          >
            <GitFork size={12} strokeWidth={3} />
            GitHub
            <ExternalLink size={9} strokeWidth={3} />
          </a>
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
    if (panels.length > 0) {
      gsap.fromTo(
        panels,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out" },
      );
    }
  }, []);

  return (
    <main ref={rootRef} className="relative min-h-screen w-full overflow-x-clip bg-[#F5F3EA] text-[#111111]">
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 border-[2px] border-black bg-[#D4FF3F] mix-blend-multiply md:block"
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
