import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "../components/Typewriter";
import skillsData from "../data/skills.json";
import projectsData from "../data/Projects.json";
import { Search, Info, ExternalLink, Terminal, Cpu, ChevronLeft, ChevronRight, Linkedin } from "lucide-react";

/**
 * Convert a text level label into a rough percentage
 */
function levelToPercent(level) {
  if (!level) return 60;
  const l = level.toLowerCase();
  if (l.includes("advanced") || l.includes("expert")) return 90;
  if (l.includes("strong")) return 85;
  if (l.includes("intermediate")) return 75;
  if (l.includes("daily")) return 70;
  if (l.includes("working")) return 65;
  if (l.includes("learning")) return 50;
  return 70;
}

/**
 * Generate short text bullet points about where a given skill is used.
 */
function getSkillUsage(skillName, categoryTitle) {
  if (!categoryTitle) return ["Used in professional workflows."];

  const name = skillName.toLowerCase();
  const cat = categoryTitle.toLowerCase();
  const uses = [];

  if (cat.includes("bim") || name.includes("revit") || name.includes("navisworks") || name.includes("autocad")) {
    uses.push(
      "Used in BIM and CAD production work on live infrastructure projects.",
      "Applied for modeling, coordination, and construction drawings.",
      "Explored further in personal R&D around BIM automation and workflows."
    );
  } else if (cat.includes("web") || name.includes("react") || name.includes("javascript") || name.includes("tailwind")) {
    uses.push(
      "Used for your personal portfolio and experimental web tools.",
      "Helps bridge engineering, BIM and modern web technology."
    );
  } else if (cat.includes("tools") || name.includes("excel") || name.includes("sheets") || name.includes("vs code") || name.includes("notion")) {
    uses.push(
      "Used daily for calculations, data tracking and documentation.",
      "Supports BIM, CAD and project coordination workflows."
    );
  } else if (cat.includes("soft")) {
    uses.push(
      "Used in team coordination and communication on site and remotely.",
      "Helps with client discussions, reviews and issue resolution."
    );
  }

  if (!uses.length) {
    uses.push("Used across academic work, professional projects and personal experiments.");
  }
  return uses;
}

/**
 * Individual skill card with 3D flip and circular progress
 */
function SkillCard({ skill, categoryTitle, onClick, index }) {
  const [hovered, setHovered] = useState(false);
  const percent = levelToPercent(skill.level);
  const radius = 26;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;

  const registryId = `SKL-C${(index + 1).toString().padStart(2, '0')}`;
  const displayLetter = skill.name.charAt(0).toUpperCase();

  return (
    <motion.div
      className="relative w-full h-[280px] cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ perspective: "1500px" }}
    >
      {/* Technical Border Effect */}
      <div className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-sky-500/50 via-transparent to-sky-500/30 blur-[2px]`} />

      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: hovered ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Background Letter & Registry Number */}
          <div className="absolute top-2 right-4 opacity-[0.03] select-none pointer-events-none flex flex-col items-end">
            <span className="text-[120px] font-black leading-none">{displayLetter}</span>
            <span className="text-[20px] font-mono -mt-6">{registryId}</span>
          </div>

          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/5 border border-sky-500/20 flex items-center justify-center relative">
                <Cpu className="w-5 h-5 text-sky-500/80" />
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <div>
                <p className="text-[11px] font-mono font-bold text-sky-400 tracking-wider">
                  {registryId}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono font-bold text-sky-400/80 border border-sky-500/20 px-2 py-0.5 rounded uppercase tracking-tighter">
                {categoryTitle}
              </span>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter leading-[0.9] break-words">
              {skill.name}
            </h3>

            <div className="flex items-center gap-5">
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r={radius} stroke="rgba(51,65,85,0.2)" strokeWidth={strokeWidth} fill="none" />
                  <motion.circle
                    cx="32" cy="32" r={radius} stroke="rgb(14,165,233)" strokeWidth={strokeWidth} fill="none"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: hovered ? circumference - (percent / 100) * circumference : circumference }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[11px] font-mono font-bold text-sky-400">{percent}%</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest">
                  <span>Performance</span>
                </div>
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <motion.div
                    className="h-full bg-sky-500"
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                  />
                </div>
                <span className="text-xs font-black text-slate-200 uppercase tracking-tight">{skill.level}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-sky-400 font-bold border-t border-slate-800/50 pt-3 relative z-10">
            <span className="flex items-center gap-1.5 group-hover:underline underline-offset-4 uppercase tracking-tight">
              Read details
            </span>
            <span className="text-[14px]">→</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 bg-slate-950 border border-sky-500/30 rounded-2xl p-5 flex flex-col backdrop-blur-xl shadow-[0_0_50px_rgba(14,165,233,0.1)] overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Background Letter & Registry Number (Back Side) */}
          <div className="absolute top-2 right-4 opacity-[0.03] select-none pointer-events-none flex flex-col items-end">
            <span className="text-[120px] font-black leading-none">{displayLetter}</span>
            <span className="text-[20px] font-mono -mt-6">{registryId}</span>
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-10">
            <motion.div
              className="w-full h-1/2 bg-gradient-to-b from-transparent via-sky-500 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Header section */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-sky-400 font-bold mb-1">Details</p>
                <h4 className="text-base font-black italic text-slate-100 uppercase tracking-tighter leading-[0.95] pr-2 line-clamp-2">
                  {skill.name}
                </h4>
              </div>
              <span className="text-[9px] font-mono font-bold text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-full uppercase bg-sky-500/5 flex-shrink-0">
                {skill.level}
              </span>
            </div>

            {/* Metadata section */}
            <div className="space-y-1 mb-3">
              <p className="text-[10px] text-slate-400 flex items-center gap-2">
                Category: <span className="text-slate-200 font-semibold">{categoryTitle}</span>
              </p>
              <p className="text-[10px] text-slate-400 flex items-center gap-2">
                Comfort level: <span className="text-sky-400 font-bold">{percent}%</span>
              </p>
            </div>

            {/* Content section - Scrollable description */}
            <div className="flex-1 min-h-0 bg-slate-900/40 border border-slate-800/50 p-3 rounded-xl overflow-y-auto custom-scrollbar">
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                {skill.details || "Integrated as a core component of my engineering stack."}
              </p>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 transition-colors uppercase pt-3 mt-3 border-t border-slate-800/50">
              <span className="group-hover:text-sky-400 transition-colors">Click for more</span>
              <span className="text-sky-400">Tap / Click ⟲</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { sectionId, eyebrow, title, description, badges, groups = [], note } = skillsData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const allSkillsFlat = useMemo(() => groups.flatMap(g => g.skills), [groups]);

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groups;
    return groups.map(group => ({
      ...group,
      skills: group.skills.filter(skill =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })).filter(group => group.skills.length > 0);
  }, [searchQuery, groups]);

  // Reset active index when search changes to avoid showing empty states if previous index is out of bounds
  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery]);

  const activeGroup = filteredGroups[activeIndex] || filteredGroups[0] || { title: "", skills: [] };

  const handleCardClick = (skill, categoryTitle) => {
    const percent = levelToPercent(skill.level);
    const usage = getSkillUsage(skill.name, categoryTitle);
    const relatedProjects = projectsData.projects.filter(p =>
      p.tech.some(t => t.toLowerCase().includes(skill.name.toLowerCase()))
    );

    setSelectedSkill({ ...skill, categoryTitle, percent, usage, relatedProjects });
  };

  const closeModal = () => setSelectedSkill(null);

  // Initial animation controls
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <section id={sectionId} className="min-h-screen w-full bg-slate-950 text-slate-50 px-4 py-16 md:px-10 lg:px-24 relative overflow-hidden">
      {/* Background neon glow */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-40 -left-20 w-72 h-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-10 w-72 h-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative space-y-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            {eyebrow && <p className="text-sm uppercase tracking-[0.25em] text-sky-400">{eyebrow}</p>}
            {title && <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mt-2 leading-none text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-400 animate-gradient-x pb-2"><Typewriter text={title} speed={50} /></h2>}
            {description && <p className="text-sm md:text-base text-slate-400 mt-3 max-w-xl">{description}</p>}
          </div>
          {badges && badges.length > 0 && (
            <div className="inline-flex flex-wrap gap-2 text-xs md:text-sm justify-start md:justify-end">
              {badges.map(badge => (
                <span key={badge} className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/70 text-slate-100 shadow-[0_0_18px_rgba(56,189,248,0.25)]">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search skills or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2.5 pl-11 pr-4 text-sm text-sky-300 placeholder:text-slate-600 outline-none focus:border-sky-500/50 transition-all"
          />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-1 md:p-2 relative group-cats">
          <div className="px-3 py-2 flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Skill Categories</p>
            {activeGroup.title && (
              <p className="text-[10px] text-slate-400 font-mono">
                STATUS: <span className="text-sky-400 uppercase">{activeGroup.title}</span>
              </p>
            )}
          </div>

          <div className="relative flex items-center">
            {/* Left Button */}
            <button
              onClick={() => scroll("left")}
              className="hidden lg:flex absolute left-0 z-20 h-full w-10 items-center justify-start bg-gradient-to-r from-slate-950 to-transparent text-slate-400 hover:text-sky-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto px-4 pb-4 pt-1 custom-scrollbar scroll-smooth w-full"
            >
              {filteredGroups.map((group, index) => (
                <button
                  key={group.title}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs md:text-sm border transition-all whitespace-nowrap flex items-center gap-2
                    ${index === activeIndex
                      ? "border-sky-500 bg-sky-500/20 text-sky-50 shadow-[0_0_25px_rgba(56,189,248,0.45)]"
                      : "border-slate-800 bg-slate-900/80 text-slate-300 hover:border-sky-500/60 hover:bg-slate-900"
                    }`}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.75)]" />
                  <span>{group.title}</span>
                  {group.skills && <span className="text-[0.65rem] text-slate-400">{group.skills.length}</span>}
                </button>
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={() => scroll("right")}
              className="hidden lg:flex absolute right-0 z-20 h-full w-10 items-center justify-end bg-gradient-to-l from-slate-950 to-transparent text-slate-400 hover:text-sky-400 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div
          key={activeGroup.title} // Forces re-render animation when group changes
          initial="hidden"
          animate="visible"
          variants={variants}
          className="grid gap-5 md:gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {activeGroup.skills.length > 0 ? (
            activeGroup.skills.map((skill, index) => {
              const absIndex = allSkillsFlat.findIndex(s => s.name === skill.name);
              return (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  categoryTitle={activeGroup.title}
                  onClick={() => handleCardClick(skill, activeGroup.title)}
                  index={index} // Use local index for simpler staggered delay
                />
              )
            })
          ) : (
            <div className="col-span-full py-10 text-center text-slate-500 text-sm italic">
              No matching skills found.
            </div>
          )}
        </motion.div>

        {note && <p className="text-xs text-slate-500">* {note}</p>}
      </div>

      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-[5000] overflow-y-auto bg-slate-950/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            {/* Scrollable Container Wrapper */}
            <div className="min-h-full flex items-center justify-center p-4 md:p-6">

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-50 w-full max-w-lg rounded-2xl border border-sky-500/30 bg-slate-950/95 shadow-[0_0_50px_rgba(14,165,233,0.3)] overflow-hidden flex flex-col"
              >
                {/* Background blueprint effect */}
                <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />

                {/* CAD Corner Marks */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sky-500/40" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sky-500/40" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sky-500/40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sky-500/40" />

                {/* Scan-line */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
                  <motion.div
                    className="w-full h-1/2 bg-gradient-to-b from-transparent via-sky-500 to-transparent"
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <div className="p-6 md:p-8 relative z-10 flex flex-col gap-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Terminal className="w-3 h-3 text-sky-400" />
                        <p className="text-[10px] uppercase tracking-[0.3em] text-sky-400 font-bold">Technical Datasheet</p>
                      </div>
                      <h3 className="text-3xl font-black italic text-slate-100 uppercase tracking-tighter leading-none">{selectedSkill.name}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          VERIFIED STACK
                        </span>
                        <span className="text-slate-600 font-mono text-[10px]">|</span>
                        <span className="text-[11px] font-mono text-slate-400 uppercase">{selectedSkill.categoryTitle}</span>
                      </div>
                    </div>
                    <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-800 text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-all bg-slate-900/50">✕</button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">Comfort Level</p>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-sky-400 leading-none">{selectedSkill.percent}%</span>
                        <div className="h-1.5 flex-1 bg-slate-800 rounded-full mb-1 overflow-hidden">
                          <motion.div
                            className="h-full bg-sky-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedSkill.percent}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">Efficiency Rank</p>
                      <div className="flex items-end h-full pb-1">
                        <span className="text-sm font-bold text-slate-200 uppercase tracking-tight">{selectedSkill.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="space-y-6 text-sm text-slate-300">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-3 flex items-center gap-2">
                        <span className="w-1 h-3 bg-sky-500/50" />
                        Implementation Details
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedSkill.usage.map((u, idx) => (
                          <li key={idx} className="flex gap-3 text-[12px] leading-relaxed group">
                            <span className="text-sky-500 pt-1">▹</span>
                            <span className="text-slate-300 group-hover:text-slate-100 transition-colors">{u}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedSkill.relatedProjects && selectedSkill.relatedProjects.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-3 flex items-center gap-2">
                          <span className="w-1 h-3 bg-emerald-500/50" />
                          Project Validation
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSkill.relatedProjects.map(p => (
                            <button
                              key={p.id}
                              onClick={() => window.location.hash = `#/projects/${p.id}`} // Using hash routing if applicable, or Link
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/5 border border-sky-500/20 rounded-lg hover:border-sky-500/80 hover:bg-sky-500/10 transition-all group cursor-pointer"
                            >
                              <span className="text-[11px] text-slate-400 group-hover:text-sky-300 font-mono">{p.title}</span>
                              <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-sky-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                      Ref: DC-S01-P{selectedSkill.percent}
                    </div>
                    <a
                      href="https://www.linkedin.com/in/pradul-p-4b7188235/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto px-6 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest bg-sky-500 text-slate-950 hover:bg-[#0A66C2] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all flex items-center justify-center gap-2"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      Connect for Collaboration
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
