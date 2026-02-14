import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import content from "../data/index";
import SEO from "../components/SEO";
import FeaturedSection from "../components/FeaturedSection";
import WhatIDoGrid from "../components/WhatIDoGrid";
import InnovationPreview from "../components/InnovationPreview";
import SectionTitle from "../components/SectionTitle";
import StatsCounter from "../components/StatsCounter";
import CertificationsSection from "../components/CertificationsSection";
import {
    Terminal,
    Database,
    Cpu,
    Activity,
    ArrowRight,
    FileText,
    Briefcase,
    GraduationCap,
    MessageCircle,
    Mail
} from "lucide-react";

// Animations
import { fadeInUp, containerVariants, itemVariants } from "../utils/animations";

// Typewriter Component
const Typewriter = ({ text, delay = 0, speed = 50, onComplete, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);

    // Keep onComplete stable across renders to prevent effect resets
    const onCompleteRef = React.useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started || completed) return;

        let i = 0;
        const interval = setInterval(() => {
            if (i <= text.length) {
                setDisplayedText(text.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
                setCompleted(true);
                if (onCompleteRef.current) onCompleteRef.current();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, started, completed]);

    return <span className={className}>{displayedText}</span>;
};

export default function Home() {
    const {
        hero = {},
        about = {},
        experience = [],
        education = [],
        skills = {},
        projects = [],
        blog = [],
        innovation = [],
        contact = {}
    } = content;

    // Typing Sequence State
    const [showName, setShowName] = useState(false);
    const [showHeadline, setShowHeadline] = useState(false);
    const [showTagline, setShowTagline] = useState(false);

    // Typing Effect for Top Bar
    const [typedText, setTypedText] = useState("");
    const fullText = "BUILDING STRUCTURES × ENGINEERING SYSTEMS";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const currentRole = experience.find(e => e.isCurrent) || experience[0];
    const primaryEmail = contact.email || "pradul.p123@gmail.com";
    const whatsappNumber = (contact.whatsapp || "918078376902").replace(/[^0-9]/g, "");

    return (
        <main className="min-h-screen
      relative overflow-hidden pb-20
      bg-slate-950/65
      backdrop-blur-xl
      text-slate-50
      border border-white/5
      shadow-[0_0_50px_rgba(0,0,0,0.7)]
    ">
            <SEO
                title={`${hero.name || "Pradul P"} — Civil Engineer & BIM Specialist`}
                description={hero.tagline}
            />

            {/* Background technical elements */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/5 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full opacity-50" />
                <div className="absolute inset-0 bg-blueprint opacity-[0.03]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 relative space-y-20">

                {/* ================= HERO SECTION ================= */}
                <section className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-8 relative z-10">
                        {/* Decorative Top Line */}
                        <div className="flex items-center gap-4 text-xs font-mono text-emerald-500/80 tracking-widest uppercase">
                            <span className="text-emerald-500 font-bold">➜</span>
                            <span>{typedText}</span>
                            <span className="animate-pulse">_</span>
                        </div>

                        <motion.div
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                                    DIGITAL INFRASTRUCTURE ENGINEERING
                                </span>
                                <span className="h-px w-8 bg-sky-500/30" />
                                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">CIVIL ENGINEER</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 uppercase tracking-tighter leading-[0.9] min-h-[1.5em] md:min-h-[1.2em] drop-shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                                <Typewriter
                                    text="PRADUL P"
                                    delay={0}
                                    speed={80}
                                    // Start the next line when this is ~50% done (simulated by a separate timer in useEffect below, 
                                    // but for simplicity here we just start the next one with a shorter delay instead of waiting for onComplete)
                                    onComplete={() => { }}
                                />
                            </h1>

                            <div className="min-h-[3em] md:min-h-[2em]">
                                <p className="text-xl md:text-3xl text-slate-200 font-bold max-w-4xl leading-tight">
                                    {/* Started with a delay that allows it to begin while "PRADUL P" is still typing */}
                                    <Typewriter
                                        text="Licensed Civil Engineer | "
                                        delay={500}
                                        speed={40}
                                        className="text-slate-100"
                                        onComplete={() => setShowTagline(true)}
                                    />
                                    {/* The colored parts are appended after the base text types, or we can type them all together. 
                                        To keep the color, we render them conditionally or animate them. 
                                        Simplest approach for mixed color typing is to show them after a delay or type them as blocks.
                                        Given the constraint, let's fade them in as a block after the prefix types to ensure color precision. */}
                                    {showTagline && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <span className="text-emerald-400">Infrastructure Systems</span>
                                            <span className="text-slate-500 mx-2">&</span>
                                            <span className="text-sky-400">Digital Engineering</span>
                                        </motion.span>
                                    )}
                                </p>
                            </div>

                            <div className="mt-6 pl-4 border-l-4 border-sky-500/50">
                                {showTagline && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                        className="text-slate-400 max-w-2xl leading-relaxed text-sm md:text-base font-medium"
                                    >
                                        I work on real-world infrastructure projects while delivering engineering solutions through structural detailing, BIM modeling, and precision-driven documentation. Alongside core civil engineering practice, I develop digital tools and web-based systems that improve workflow efficiency, automation, and project coordination — integrating physical construction expertise with modern digital engineering.
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>

                        {/* Quick Access Buttons - Modernized */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-5 pt-4"
                        >
                            <Link to="/projects" className="relative group px-8 py-4 bg-sky-600 text-slate-950 font-bold uppercase tracking-widest text-xs rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10 flex items-center gap-2">
                                    <Database className="w-4 h-4" /> View Projects
                                </span>
                            </Link>

                            <Link to="/about" className="relative group px-8 py-4 bg-slate-900 border border-slate-700 text-slate-300 font-bold uppercase tracking-widest text-xs rounded-lg overflow-hidden transition-all hover:border-emerald-500 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                <span className="relative z-10 flex items-center gap-2">
                                    <Terminal className="w-4 h-4" /> About Me
                                </span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Side Status Panel - HUD Style */}
                    <div className="lg:col-span-5 relative">
                        {/* Decorative background grid behind the HUD */}
                        <div className="absolute -inset-10 bg-gradient-to-br from-sky-500/10 to-emerald-500/10 rounded-full blur-3xl opacity-30 animate-pulse" />

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="relative bg-slate-950/80 border border-sky-500/20 p-1 rounded-2xl backdrop-blur-xl shadow-2xl"
                        >
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sky-500 rounded-tl-lg" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sky-500 rounded-tr-lg" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sky-500 rounded-bl-lg" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sky-500 rounded-br-lg" />

                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 relative overflow-hidden group">
                                {/* Scanline */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/5 to-transparent h-[200%] w-full animate-scan pointer-events-none" />

                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500/80 flex items-center gap-2">
                                        <Activity className="w-4 h-4" /> System Status
                                    </h3>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
                                        ONLINE
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest flex justify-between">
                                            <span>Current Role</span>
                                            <span className="text-sky-500/50">ID: #001</span>
                                        </div>
                                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-md bg-sky-900/20 flex items-center justify-center border border-sky-500/20 text-sky-400">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-200">{currentRole ? currentRole.role : "Building Items"}</p>
                                                <p className="text-xs text-sky-400 font-medium">@ {currentRole ? currentRole.company : "Stealth Mode"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Location</span>
                                            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300 font-mono">
                                                {contact.location || "Earth"}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Availability</span>
                                            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-xs text-emerald-400 font-mono flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Open
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech Data Visual */}
                                    <div className="flex gap-0.5 mt-2 opacity-30">
                                        {Array.from({ length: 20 }).map((_, i) => (
                                            <div key={i} className="h-1 bg-sky-500 flex-1 rounded-full" style={{ opacity: Math.random() }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ================= PROFILE SUMMARY (2) ================= */}
                <section className="relative mt-20">
                    <div className="absolute inset-0 bg-slate-900/40 skew-y-1 transform rounded-3xl -z-10" />

                    <div className="bg-slate-900/60 border border-sky-900/30 p-8 md:p-12 rounded-3xl backdrop-blur-md relative overflow-hidden">
                        {/* Background mesh */}
                        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

                        <div className="grid md:grid-cols-12 gap-10 items-center relative z-10">
                            <div className="md:col-span-12 lg:col-span-7">
                                <SectionTitle>Profile Summary</SectionTitle>
                                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light mb-8 border-l-2 border-sky-500/50 pl-6">
                                    {about.paragraphs?.[0] ?? "Civil engineer and BIM enthusiast working across site, design, and digital tools."}
                                </p>

                                <Link to="/about" className="inline-flex items-center gap-3 text-xs font-bold text-slate-900 bg-sky-500 hover:bg-sky-400 px-6 py-3 rounded-lg uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20 hover:scale-105">
                                    Read Full Profile <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Tech Specs Panel */}
                            <div className="md:col-span-12 lg:col-span-5 bg-slate-950/50 rounded-2xl p-6 border border-slate-800 relative group hover:border-sky-500/30 transition-colors">
                                <div className="absolute top-0 right-0 p-3 opacity-10 text-9xl font-black text-slate-800 leading-none select-none -z-10 overflow-hidden">01</div>

                                <div className="grid gap-6">
                                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Core Discipline</div>
                                        </div>
                                        <div className="text-xl font-bold text-slate-100 pl-2 border-l-2 border-emerald-500">Civil Engineering</div>
                                    </div>

                                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 group-hover:border-sky-500/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
                                                <Database className="w-5 h-5" />
                                            </div>
                                            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Specialization</div>
                                        </div>
                                        <div className="text-xl font-bold text-slate-100 pl-2 border-l-2 border-sky-500">BIM & Digital Twin</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= EXPERIENCE & EDUCATION (3) ================= */}
                <section>
                    <SectionTitle>Experience & Education</SectionTitle>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid gap-6 md:grid-cols-2"
                    >
                        {experience[0] && (
                            <motion.article
                                variants={itemVariants}
                                className="relative group rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-emerald-500/50 transition-all duration-300"
                            >
                                <div className="absolute top-6 right-6 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">
                                    <Briefcase className="w-8 h-8" />
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full w-fit border border-emerald-500/20">
                                        Latest Role
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-100">{experience[0].role}</h3>
                                        <p className="text-sky-400 text-sm font-medium mt-1">{experience[0].company}</p>
                                    </div>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-400 pt-2">
                                        {experience[0].points?.slice(0, 2).map((pt, i) => <li key={i}>{pt}</li>)}
                                    </ul>
                                    <div className="pt-6 mt-2 border-t border-slate-800/50">
                                        <Link to="/experience" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-2">
                                            View Full History <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        )}

                        {education[0] && (
                            <motion.article
                                variants={itemVariants}
                                className="relative group rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-sky-500/50 transition-all duration-300"
                            >
                                <div className="absolute top-6 right-6 text-sky-500/20 group-hover:text-sky-500/40 transition-colors">
                                    <GraduationCap className="w-8 h-8" />
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full w-fit border border-sky-500/20">
                                        Education
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-100">{education[0].degree}</h3>
                                        <p className="text-slate-300 text-sm font-medium mt-1">{education[0].institution || education[0].place}</p>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed pt-2 line-clamp-2">
                                        {education[0].description}
                                    </p>
                                    <div className="pt-6 mt-2 border-t border-slate-800/50">
                                        <Link to="/experience" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-sky-400 transition-colors flex items-center gap-2">
                                            View Academic Record <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        )}
                    </motion.div>
                </section>

                {/* ================= FEATURED PROJECTS (4) ================= */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <SectionTitle>Featured Projects</SectionTitle>
                        <Link to="/projects" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-sky-400 transition-colors">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <FeaturedSection projects={projects} maxItems={6} />
                </section>

                {/* ================= CERTIFICATIONS & ACHIEVEMENTS (5) ================= */}
                {/* Stats Counter integrated here or separate? Keeping logical flow. */}
                <section className="border-y border-slate-800/50 bg-slate-900/20 backdrop-blur-sm -mx-4 px-4 md:-mx-0 md:px-0 md:rounded-2xl">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/50">
                        <StatsCounter from={0} to={2} duration={1000} suffix="+" label="YEARS EXPERIENCE" />
                        <StatsCounter from={0} to={projects.length || 10} duration={1500} suffix="+" label="PROJECTS DELIVERED" />
                        <StatsCounter from={0} to={content.certifications?.length || 6} duration={1200} suffix="+" label="CERTIFICATIONS" />
                        <StatsCounter from={0} to={100} duration={2000} suffix="%" label="COMMITMENT" />
                    </div>
                </section>

                {content.certifications && content.certifications.length > 0 && (
                    <CertificationsSection certifications={content.certifications} />
                )}

                {/* ================= WHAT I DO (6) ================= */}
                <section>
                    <SectionTitle>What I Do</SectionTitle>
                    <WhatIDoGrid items={content.whatIDo || []} />
                </section>

                {/* ================= SKILLS SNAPSHOT (7) ================= */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <SectionTitle>Skills Snapshot</SectionTitle>
                    <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-2xl flex flex-wrap gap-3">
                        {/* Flatten skills for preview */}
                        {((skills.civilBim || []).concat(skills.web || [])).slice(0, 15).map((s, i) => (
                            <span
                                key={typeof s === 'string' ? s : s.name + i}
                                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 text-xs font-medium hover:border-emerald-500/50 hover:text-emerald-400 transition-all cursor-default"
                            >
                                {typeof s === 'string' ? s : s.name}
                            </span>
                        ))}
                        {skills.groups && skills.groups[0]?.skills.slice(0, 5).map((s, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 text-xs font-medium hover:border-emerald-500/50 hover:text-emerald-400 transition-all cursor-default"
                            >
                                {s.name}
                            </span>
                        ))}
                        <Link to="/skills" className="px-3 py-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-bold hover:bg-sky-500/20 transition-all">
                            + View All Skills
                        </Link>
                    </div>
                </motion.section>

                {/* ================= INNOVATION & TOOLS (8) ================= */}
                {((Array.isArray(innovation) ? innovation : (innovation?.items ?? []))).length > 0 && (
                    <section>
                        <SectionTitle>Innovation & Tools</SectionTitle>
                        <InnovationPreview
                            limit={2}
                            onOpen={() => { window.location.href = "/innovation"; }}
                        />
                    </section>
                )}

                {/* ================= LATEST NOTE (9) ================= */}
                {blog?.[0] && (
                    <section>
                        <SectionTitle>Latest Note</SectionTitle>
                        <Link to="/blog" className="group block relative rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-sky-500/50 transition-all duration-500 p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                                        <span className="text-emerald-400">{blog[0].date}</span>
                                        <span>•</span>
                                        <span className="text-slate-400">{blog[0].readTime || "Read now"}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-100 group-hover:text-sky-400 transition-colors leading-tight">
                                        {blog[0].title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">{blog[0].summary}</p>
                                </div>
                                <div className="md:self-center">
                                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-sky-400 transition-colors border border-slate-700 rounded-full px-4 py-2 group-hover:border-sky-500/50">
                                        Read Article <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* ================= CONTACT CTA ================= */}
                <section className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 md:p-14 text-center border border-slate-800 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-500 opacity-50" />
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full group-hover:bg-sky-500/20 transition-colors" />

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black italic text-slate-100 uppercase tracking-tighter">
                            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Collaborate</span>
                        </h2>
                        <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
                            Have a project in mind, a question about my work, or just want to connect?
                            I'm always open to discussing new opportunities.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 pt-6">
                            <Link to="/contact" className="group px-8 py-3 bg-sky-500 text-slate-950 font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-sky-500/20 hover:bg-sky-400 hover:scale-105 transition-all flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Get in Touch
                            </Link>

                            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
