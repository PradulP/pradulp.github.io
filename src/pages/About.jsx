import { useState } from "react";
import { motion } from "framer-motion";
import content from "../data/index";
import ResumeModal from "../components/ResumeModal";
import {
  Terminal,
  User,
  Briefcase,
  Code,
  Cpu,
  Download,
  FileText,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function About() {
  const { hero } = content;
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumePath = "/Pradul_cv.pdf";

  const milestones = [
    {
      year: "Now",
      title: "Junior Engineer @ Paradigm (Infrastructure)",
      body: "Working as a Junior Engineer, contributing to real infrastructure projects while applying what I learned from academics, internships, and BIM / digital workflows. This phase is where theory, tools, and site realities meet.",
      status: "active"
    },
    {
      year: "Recent Years",
      title: "Hybrid profile: Civil + BIM + Tech",
      body: "Started shaping myself as a hybrid engineer–technologist, combining civil engineering fundamentals with BIM modelling, digital drafting, web development, and automation ideas using tools like Revit, Dynamo, and pyRevit."
    },
    {
      year: "Internships & Field Exposure",
      title: "NATPAC, KIIDC, S&R Consultants and more",
      body: "Worked on traffic surveys, parking policy studies, bridge construction exposure, and structural design training. These experiences connected classroom learning to real-world conditions, constraints, and stakeholder expectations."
    },
    {
      year: "2020 – 2024",
      title: "B.Tech in Civil Engineering",
      body: "Studied Civil Engineering while actively involving in technical clubs, events and hands-on activities. This phase gave me core fundamentals in structural behavior, design, and project workflows."
    },
    {
      year: "Early Curiosity",
      title: "Fascinated by how things are designed and built",
      body: "I always paid attention to structures, spaces, and how design decisions change how people use them. That curiosity slowly evolved into a serious interest in civil engineering."
    }
  ];

  const identityTags = [
    "Civil Engineer",
    "BIM Modeler & Detailer",
    "Web & Front-End Developer",
    "Automation & Tools Enthusiast",
    "Digital & Construction Technology",
    "Continuous Learner"
  ];

  const mindsetPoints = [
    "I like understanding the full workflow – from concept, to model, to drawing, to execution.",
    "I enjoy building systems and tools that save time, reduce friction, and improve quality.",
    "I approach learning like version upgrades – small, consistent improvements over time.",
    "I try to balance precision in engineering with creativity in problem-solving."
  ];

  const focusAreas = [
    "BIM workflows & model quality",
    "Digital tools for project coordination",
    "Bridging site realities with digital design",
    "Automation ideas for repetitive tasks"
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden pb-20">
      {/* Background technical elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-blueprint opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 relative space-y-16">
        {/* ================= HEADER ================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sky-400">
            <User className="w-4 h-4" />
            <span className="text-xs font-mono font-black uppercase tracking-[0.3em]">Profile Database v2.0</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic text-slate-100 uppercase tracking-tighter leading-[0.85]">
            THE ENGINEER <br />
            BEHIND <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">{hero.name}</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl leading-relaxed">
            A <span className="text-sky-300 font-bold">Civil Engineer, BIM Technologist, and web-focused problem solver</span> exploring how digital tools, automation, and smart workflows can transform the way we design, coordinate, and execute projects.
          </p>
        </div>

        {/* ================= IDENTITY CARD ================= */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Narrative */}
          <div className="space-y-6">
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                My journey combines <span className="text-slate-100 font-semibold">traditional civil engineering foundations</span> with <span className="text-slate-100 font-semibold">BIM, coding, and digital construction</span>. I like to think of myself as a <span className="text-emerald-300 font-bold">hybrid engineer–technologist</span> who is comfortable both with drawings and with scripts.
              </p>
              <p>
                Over time, curiosity about "how structures work" turned into a stronger question: <span className="text-sky-300 font-bold italic">"How can we use technology to build better, faster, and smarter?"</span> That question is what I'm continuously exploring now.
              </p>
            </div>

            {/* Resume Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setResumeOpen(true)}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40"
              >
                <FileText className="w-4 h-4" />
                View Resume
              </button>
              <a
                href={resumePath}
                download
                className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-sky-500/50 text-slate-300 hover:text-slate-100 font-bold uppercase tracking-widest text-xs transition-all"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </div>

          {/* Right: Technical Identity Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-sm overflow-hidden shadow-2xl hover:border-sky-500/50 transition-all duration-500 group">
            {/* Card Header */}
            <div className="relative p-6 pb-4 bg-gradient-to-br from-slate-900/50 to-slate-950/50 border-b border-slate-800/50">
              <div className="absolute top-3 right-3 text-5xl font-black text-white/[0.02] select-none pointer-events-none italic">
                ID-001
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-sky-400">Identity Record</span>
                </div>
                <h2 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter mb-2">{hero.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wide">
                    Licensed Civil Engineer
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">REG_2024</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1">Current Role</p>
                  <p className="text-xs font-bold text-slate-200">Junior Engineer</p>
                  <p className="text-[10px] text-slate-400">@ Paradigm</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <p className="text-xs font-bold text-emerald-400">Active</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/30 border border-slate-800/50 p-4 rounded-xl space-y-3">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Core Domains</p>
                  <p className="text-xs text-slate-200 leading-relaxed">Civil · BIM · Infrastructure · Digital Design</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Tech Stack</p>
                  <p className="text-xs text-slate-200 leading-relaxed">Revit · BIM · Automation · Web · AI-adjacent tools</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {identityTags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-[10px] px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950/80 text-slate-300 hover:border-sky-500/50 hover:text-sky-300 transition-all cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-3 bg-slate-900/50 border-t border-slate-800/50">
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                <span>Profile_ID: PRDL-CE-2024</span>
                <span className="text-emerald-500/50">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MISSION & VISION ================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter">Mission & Vision</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 hover:border-sky-500/50 transition-all group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="text-lg font-black italic text-sky-300 uppercase tracking-tight">Mission</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                To contribute to a future where civil engineering is <span className="text-slate-100 font-semibold">faster, smarter, and more technology-integrated</span> – without losing precision, clarity, or responsibility. I want to help build workflows that are <span className="text-slate-100 font-semibold">efficient, transparent, and scalable</span> across design, documentation, and execution.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 hover:border-emerald-500/50 transition-all group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-lg font-black italic text-emerald-300 uppercase tracking-tight">Vision</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                My vision is to help transform civil engineering into a <span className="text-slate-100 font-semibold">fully technology-integrated discipline</span> — where innovation and digital intelligence drive real-world impact.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                I'm working towards becoming a <span className="text-slate-100 font-semibold">hybrid engineer–technologist</span> who can bridge site realities, BIM environments, and digital tools into one continuous system.
              </p>
            </div>
          </div>
        </section>

        {/* ================= JOURNEY TIMELINE ================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter">Journey So Far</h2>
          </div>

          <div className="relative border-l-2 border-slate-800 pl-8 space-y-8">
            {milestones.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${item.status === 'active' ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse' : 'bg-slate-950 border-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.4)]'}`} />
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 hover:border-sky-500/50 transition-all group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2 py-1 rounded">
                      {item.year}
                    </span>
                    {item.status === 'active' && (
                      <span className="text-[9px] font-mono font-black px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-400 uppercase tracking-wider animate-pulse">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-black italic text-slate-100 uppercase tracking-tight mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
            <a
              href="/experience"
              className="inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors group"
            >
              View full experience & education timeline
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* ================= HOW I THINK & WORK ================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter">How I Think & Work</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 hover:border-sky-500/50 transition-all">
              <h3 className="text-lg font-black italic text-sky-300 uppercase tracking-tight mb-4">Mindset & Principles</h3>
              <ul className="space-y-3">
                {mindsetPoints.map((pt, i) => (
                  <li key={i} className="flex gap-3 group/item">
                    <CheckCircle2 className="w-4 h-4 text-sky-500/50 flex-shrink-0 mt-0.5 group-hover/item:text-sky-400 transition-colors" />
                    <span className="text-sm text-slate-300 leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 hover:border-emerald-500/50 transition-all">
              <h3 className="text-lg font-black italic text-emerald-300 uppercase tracking-tight mb-4">Current Focus Areas</h3>
              <ul className="space-y-3 mb-4">
                {focusAreas.map((pt, i) => (
                  <li key={i} className="flex gap-3 group/item">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500/50 flex-shrink-0 mt-0.5 group-hover/item:text-emerald-400 transition-colors" />
                    <span className="text-sm text-slate-300 leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-400 italic border-l-2 border-emerald-500/30 pl-3">
                I'm also continuously exploring new tools, workflows, and ways to connect BIM, web, and automation into practical systems that actually get used.
              </p>
            </div>
          </div>
        </section>

        {/* ================= WHAT'S NEXT ================= */}
        <section className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-950/80 to-slate-900/50 p-8 backdrop-blur-sm relative overflow-hidden group hover:border-sky-500/50 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-sky-400" />
              <h2 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter">What's Next</h2>
            </div>
            <p className="text-base text-slate-300 leading-relaxed">
              I'm always interested in <span className="text-slate-100 font-semibold">collaborations, side projects, and problem-solving opportunities</span> around civil engineering, BIM, digital tools, and automation.
            </p>
            <p className="text-base text-slate-300 leading-relaxed">
              If you're working on something that connects <span className="text-sky-300 font-bold">engineering, technology, or digital workflows</span>, I'd be happy to talk.
            </p>
            <p className="text-sm text-slate-500 italic">
              You can reach me through the contact section of this site, or via the links in the header.
            </p>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-sky-500" /> Profile_Active</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> Data_Verified</span>
          </div>
          <div>© 2024 PRADUL P · PROFILE_SYS_V2</div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} src={resumePath} />
    </main>
  );
}
