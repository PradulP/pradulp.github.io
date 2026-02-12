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
      year: "2024 — Present",
      title: "Junior Engineer",
      body: "Contributing to real-world infrastructure projects through structural documentation, BIM workflows, and technical coordination. This phase represents the convergence of academic learning, digital tools, and site execution.",
      status: "active"
    },
    {
      year: "2023 — 2024",
      title: "Hybrid Development Phase",
      body: "Developed a multidisciplinary profile combining civil engineering fundamentals with BIM modeling, digital drafting, web development, and workflow automation using tools such as Revit, Dynamo, and pyRevit."
    },
    {
      year: "2022 — 2023",
      title: "Internships & Field Exposure",
      body: "Worked on traffic surveys, parking policy studies, bridge construction exposure, and structural design training programs. These experiences connected theoretical knowledge with practical site constraints."
    },
    {
      year: "2020 — 2024",
      title: "Academic Foundation",
      body: "Completed B.Tech in Civil Engineering with focus on structural behavior, construction systems, and project workflows, while actively engaging in hands-on technical activities."
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
    "Systems thinking — from concept to execution",
    "Precision-focused engineering with continuous improvement",
    "Technology as an enabler, not a replacement for fundamentals",
    "Practical problem-solving grounded in construction realities",
    "Continuous learning through iteration and experimentation"
  ];

  const focusAreas = [
    "BIM workflow optimization",
    "Digital coordination tools",
    "Bridging site execution with digital design",
    "Automation for repetitive engineering tasks"
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden pb-20">
      {/* Background technical elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full"
        />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-blueprint opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 relative space-y-16">
        {/* ================= HEADER ================= */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black italic text-slate-100 uppercase tracking-tighter leading-[0.85]">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">{hero.name}</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl font-mono text-emerald-400 uppercase tracking-widest">
            Engineer · Technologist · System Thinker
          </motion.p>
          <motion.div variants={fadeInUp} className="space-y-4 text-base md:text-lg text-slate-400 max-w-3xl leading-relaxed">
            <p>
              I am a <span className="text-slate-200 font-bold">Licensed Civil Engineer</span> working at the intersection of infrastructure development and digital engineering. My work combines structural design thinking, BIM-based workflows, and precision technical documentation to deliver reliable and efficient engineering solutions.
            </p>
            <p>
              Alongside traditional civil engineering practice, I develop <span className="text-sky-400 font-bold">digital tools and automation systems</span> that improve coordination, workflow efficiency, and project execution. I approach engineering as an integrated system — where physical construction and digital intelligence work together to create smarter, more scalable infrastructure.
            </p>
          </motion.div>
        </motion.div>

        {/* ================= IDENTITY CARD ================= */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Professional Profile Overview */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6 h-full"
          >
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl gap-6 hover:border-sky-500/30 transition-all duration-300 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <User className="w-4 h-4" /> Professional Overview
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-[140px_1fr] items-baseline border-b border-slate-800/50 pb-2">
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-wide">Name</span>
                    <span className="text-slate-100 font-bold text-lg">{hero.name}</span>
                  </div>

                  <div className="grid grid-cols-[140px_1fr] items-baseline border-b border-slate-800/50 pb-2">
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-wide">Qualification</span>
                    <span className="text-emerald-400 font-bold">Licensed Civil Engineer</span>
                  </div>

                  <div className="grid grid-cols-[140px_1fr] items-baseline border-b border-slate-800/50 pb-2">
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-wide">Current Role</span>
                    <span className="text-slate-200">Junior Engineer — Infrastructure Projects</span>
                  </div>

                  <div className="grid grid-cols-[140px_1fr] items-baseline border-b border-slate-800/50 pb-2">
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-wide">Core Domains</span>
                    <span className="text-sky-300">Civil Engineering · BIM · Infrastructure · Digital Engineering</span>
                  </div>

                  <div className="grid grid-cols-[140px_1fr] items-baseline pt-2">
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-wide">Tools & Tech</span>
                    <span className="text-slate-300">Revit · BIM · Automation · Web Development · AI-Enabled Tools</span>
                  </div>
                </div>
              </div>
              {/* Resume Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-800/50">
                <button
                  onClick={() => setResumeOpen(true)}
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40"
                >
                  <FileText className="w-4 h-4" /> View Resume
                </button>
                <a
                  href={resumePath}
                  download
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-sky-500/50 text-slate-300 hover:text-slate-100 font-bold uppercase tracking-widest text-xs transition-all"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Identity Tags (Restored Badges) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="space-y-6 h-full"
          >
            <div className="bg-slate-900/30 border border-slate-800/50 p-8 rounded-3xl h-full flex flex-col justify-center">
              <div className="flex flex-wrap gap-3">
                {identityTags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-2 rounded-full border border-slate-700 bg-slate-950/50 text-slate-300 text-xs font-medium hover:border-sky-500/50 hover:text-white transition-colors cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <span>Profile_ID: PRDL-CE-2024</span>
                <span className="text-emerald-500/70">Verified</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= MISSION & VISION ================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter">Mission & Vision</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp} className="rounded-3xl border border-slate-800 bg-slate-950/50 p-8 hover:border-sky-500/50 transition-all group">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <h3 className="text-xl font-black italic text-sky-400 uppercase tracking-tight">Mission</h3>
              </div>
              <p className="text-base text-slate-300 leading-relaxed">
                To contribute to a future where civil engineering is <span className="text-slate-100 font-semibold">faster, smarter, and more technology-integrated</span> — without compromising precision, safety, or responsibility. I aim to build workflows that are efficient, transparent, and scalable across design, documentation, and execution.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-3xl border border-slate-800 bg-slate-950/50 p-8 hover:border-emerald-500/50 transition-all group">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-black italic text-emerald-400 uppercase tracking-tight">Vision</h3>
              </div>
              <p className="text-base text-slate-300 leading-relaxed">
                To help advance civil engineering into a <span className="text-slate-100 font-semibold">fully integrated digital discipline</span> — where infrastructure design, BIM environments, automation, and data-driven decision making operate as a unified system.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= JOURNEY TIMELINE ================= */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter">Professional Journey</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >

                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {item.status === 'active' ? (
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  ) : (
                    <div className="w-3 h-3 bg-slate-600 rounded-full" />
                  )}
                </div>

                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 hover:border-sky-500/30 transition-all">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1.5 rounded-md border border-sky-500/30 bg-sky-950/30 text-sky-400 text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(14,165,233,0.1)]">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-black italic text-slate-100 uppercase tracking-tighter mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.body}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>

        </section>

        {/* ================= WORK APPROACH & FOCUS ================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter">Work Approach & Focus</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp} className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 hover:border-sky-500/30 transition-all h-full">
              <h3 className="text-xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 uppercase tracking-tighter mb-8">Mindset & Principles</h3>
              <ul className="space-y-5">
                {mindsetPoints.map((pt, i) => (
                  <motion.li key={i} variants={fadeInUp} className="flex gap-4 group/item items-start">
                    <CheckCircle2 className="w-5 h-5 text-sky-500/80 flex-shrink-0 mt-0.5 group-hover/item:text-sky-400 transition-colors" />
                    <span className="text-sm text-slate-300 leading-relaxed font-medium">{pt}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 hover:border-emerald-500/30 transition-all h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 uppercase tracking-tighter mb-8">Current Focus Areas</h3>
                <ul className="space-y-5 mb-8">
                  {focusAreas.map((pt, i) => (
                    <motion.li key={i} variants={fadeInUp} className="flex gap-4 group/item items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500/80 flex-shrink-0 mt-0.5 group-hover/item:text-emerald-400 transition-colors" />
                      <span className="text-sm text-slate-300 leading-relaxed font-medium">{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-800/50 mt-auto">
                <div className="pl-4 border-l-2 border-emerald-500/50 italic text-sm text-slate-400 leading-relaxed">
                  "I continuously explore ways to connect BIM, web technologies, and automation into practical systems that enhance real-world engineering workflows."
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= FUTURE FOCUS ================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/50 p-10 text-center space-y-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-grid-slate-800/[0.1] -z-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-3xl rounded-full" />

          <div className="mx-auto max-w-2xl space-y-6 relative z-10">
            <h2 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter">Future Focus</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              I am interested in collaborations and engineering opportunities that integrate <span className="text-sky-400 font-bold">infrastructure development</span> with <span className="text-emerald-400 font-bold">digital systems and automation</span>.
            </p>
            <p className="text-base text-slate-400 leading-relaxed">
              If you are working on projects that connect engineering, technology, or digital workflows, I would be glad to collaborate or contribute.
            </p>

            <motion.div variants={fadeInUp} className="pt-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:-translate-y-1"
              >
                Get In Touch <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= FOOTER ================= */}
        <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
          <div>© {new Date().getFullYear()} {hero.name} · Licensed Civil Engineer</div>
          <div className="flex gap-4">
            <span>Profile Verified</span>
            <span>System Active</span>
          </div>
        </div>
      </div >

      {/* Resume Modal */}
      < ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)
      } src={resumePath} />
    </main >
  );
}
