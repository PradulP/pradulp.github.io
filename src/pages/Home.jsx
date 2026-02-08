import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import content from "../data/index";
import SEOHelmet from "../components/SEOHelmet";
import FeaturedSection from "../components/FeaturedSection";
import WhatIDoGrid from "../components/WhatIDoGrid";
import InnovationPreview from "../components/InnovationPreview";
import SectionTitle from "../components/SectionTitle";
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started || completed) return; // Prevent re-running if completed

        let i = 0;
        const interval = setInterval(() => {
            if (i <= text.length) {
                setDisplayedText(text.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
                setCompleted(true);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, started, completed, onComplete]);

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
    const fullText = "Welcome to my digital portfolio...";

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
            <SEOHelmet
                title={`${hero.name || "Pradul P"} — Civil Engineer & BIM Specialist`}
                description={hero.tagline}
                image={hero.avatar || "/pradul-avatar.jpg"}
            />

            {/* Background technical elements */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/5 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full opacity-50" />
                <div className="absolute inset-0 bg-blueprint opacity-[0.03]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 relative space-y-20">

                {/* ================= HERO SECTION ================= */}
                <section className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="space-y-4">
                            {/* Typing Output */}
                            <div className="font-mono text-sm text-emerald-400 opacity-80 h-8 flex items-center gap-2">
                                <span className="text-emerald-500">➜</span> {typedText}<span className="animate-pulse">_</span>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-widest">
                                        Portfolio
                                    </span>
                                    <span className="h-px w-8 bg-sky-500/30" />
                                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Civil Engineer</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-black italic text-slate-100 uppercase tracking-tighter leading-[0.9] mb-6 min-h-[1.8em] md:min-h-[1.5em]">
                                    <Typewriter
                                        text="Hi, I'm "
                                        delay={500}
                                        speed={50}
                                        onComplete={() => setShowName(true)}
                                    />
                                    {showName && (
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                                            <Typewriter
                                                text={hero.name}
                                                speed={80}
                                                onComplete={() => setShowHeadline(true)}
                                            />
                                        </span>
                                    )}
                                </h1>

                                <div className="min-h-[3em] md:min-h-[2em]">
                                    {showHeadline && (
                                        <p className="text-xl md:text-2xl text-slate-200 font-bold max-w-2xl leading-tight">
                                            <Typewriter
                                                text={hero.headline}
                                                speed={30}
                                                onComplete={() => setShowTagline(true)}
                                            />
                                        </p>
                                    )}
                                </div>

                                <div className="min-h-[4em] mt-4 border-l-2 border-slate-800 pl-4">
                                    {showTagline && (
                                        <p className="text-slate-400 max-w-2xl leading-relaxed text-base">
                                            <Typewriter text={hero.tagline} speed={20} />
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Quick Access Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3.5 }} // Delayed to appear after typing starts
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <Link to="/projects" className="group flex items-center gap-3 px-6 py-4 bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/10">
                                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                                    <Database className="w-5 h-5 text-sky-400" />
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Explore Work</div>
                                    <div className="font-black italic text-slate-100 uppercase tracking-tight">View Projects</div>
                                </div>
                            </Link>

                            <Link to="/about" className="group flex items-center gap-3 px-6 py-4 bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                    <Terminal className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Know More</div>
                                    <div className="font-black italic text-slate-100 uppercase tracking-tight">About Me</div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Side Status Panel */}
                    <div className="lg:col-span-4 lg:pt-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                            className="bg-slate-900/30 border border-slate-800/50 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-3 opacity-20"><Activity className="w-24 h-24 text-sky-500" /></div>

                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Status
                            </h3>

                            <div className="space-y-6 relative z-10">
                                {/* Current Role */}
                                <div className="space-y-1">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Current Role</p>
                                    <p className="text-sm font-bold text-slate-200">{currentRole ? currentRole.role : "Building Items"}</p>
                                    <p className="text-xs text-sky-400 font-medium">@ {currentRole ? currentRole.company : "Stealth Mode"}</p>
                                </div>

                                {/* Location */}
                                <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-medium">Based in</span>
                                    <span className="font-mono text-slate-300">{contact.location || "Earth"}</span>
                                </div>

                                {/* Focus */}
                                <div className="pt-2 flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-medium">Focus</span>
                                    <span className="font-mono text-slate-300">{hero.focus}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ================= ABOUT SUMMARY ================= */}
                <section className="bg-slate-900/40 border border-slate-800/50 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden">
                    <SectionTitle>Profile Summary</SectionTitle>
                    <div className="grid md:grid-cols-12 gap-8 items-start relative z-10">
                        <div className="md:col-span-8">
                            <p className="text-base md:text-lg text-slate-300 leading-loose">
                                {about.paragraphs?.[0] ?? "Civil engineer and BIM enthusiast working across site, design, and digital tools."}
                            </p>
                            <div className="mt-6">
                                <Link to="/about" className="inline-flex items-center text-sm font-bold text-sky-400 hover:text-emerald-400 transition-colors uppercase tracking-widest">
                                    Read full profile <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>
                        <div className="md:col-span-4 border-l border-slate-800 pl-8 hidden md:block">
                            <div className="space-y-6">
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Core Discipline</div>
                                    <div className="text-sm font-bold text-emerald-400">Civil Engineering</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Specialization</div>
                                    <div className="text-sm font-bold text-sky-400">BIM & Digital Twin</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= TIMELINE PREVIEW ================= */}
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

                {/* ================= PROJECTS ================= */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <SectionTitle>Featured Projects</SectionTitle>
                        <Link to="/projects" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-sky-400 transition-colors">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <FeaturedSection projects={projects} maxItems={6} />
                </section>

                {/* ================= CAPABILITIES ================= */}
                <section>
                    <SectionTitle>What I Do</SectionTitle>
                    <WhatIDoGrid items={content.whatIDo || []} />
                </section>

                {/* ================= SKILLS SNAPSHOT ================= */}
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

                {/* ================= INNOVATION ================= */}
                {((Array.isArray(innovation) ? innovation : (innovation?.items ?? []))).length > 0 && (
                    <section>
                        <SectionTitle>Innovation & Tools</SectionTitle>
                        <InnovationPreview
                            limit={2}
                            onOpen={() => { window.location.href = "/innovation"; }}
                        />
                    </section>
                )}

                {/* ================= LATEST NOTE (BLOG) ================= */}
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
