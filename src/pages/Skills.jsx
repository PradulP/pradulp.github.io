import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "../components/Typewriter";
import useGoogleCMS from "../hooks/useGoogleCMS";
import skillsData from "../data/skills.json";
import projectsData from "../data/Projects.json";
import SEO from "../components/SEO";
import SkillCard from "../components/SkillCard";
import { Search, Info, ExternalLink, Terminal, Cpu, ChevronLeft, ChevronRight, Linkedin, CheckCircle2, Briefcase, GraduationCap, FlaskConical } from "lucide-react";

/**
 * Convert a text level label into a precise percentage based on professional guidance
 */
function levelToPercent(level) {
  if (!level) return 60;
  const l = level.toLowerCase();

  // Expert / Daily use: 90–100%
  if (l.includes("expert") || l.includes("daily") || l.includes("lead")) return 95;
  if (l.includes("advanced")) return 90;

  // Strong professional: 80–89%
  if (l.includes("strong")) return 85;

  // Confident / Intermediate: 70–79%
  if (l.includes("intermediate")) return 75;

  // Working knowledge: 60–69%
  if (l.includes("working")) return 65;

  // Learning: < 60%
  if (l.includes("learning") || l.includes("basic")) return 50;

  return 70; // Default
}

/**
 * Generate ELITE text bullet points about where a given skill is used.
 */
function getSkillUsage(skillName, categoryTitle) {
  const name = skillName.toLowerCase();
  const cat = (categoryTitle || "").toLowerCase();
  const uses = [];

  // 1. Civil / BIM / Revit Elite Context
  if (cat.includes("civil") || cat.includes("revit") || name.includes("navisworks") || name.includes("autocad")) {
    uses.push(
      "Used in professional infrastructure projects for modeling, coordination, and construction documentation.",
      "Applied in LIVE project environments for clash detection and inter-disciplinary collaboration.",
      "Critical for delivering GFC (Good for Construction) drawings and accurate BOQs."
    );
  }
  // 2. Web / Frontend Elite Context
  else if (cat.includes("web") || name.includes("react") || name.includes("javascript") || name.includes("tailwind")) {
    uses.push(
      "Used to build scalable, component-based user interfaces for personal and experimental tools.",
      "Bridging the gap between traditional engineering software and modern web dashboards.",
      "Optimized for performance and responsive design across devices."
    );
  }
  // 3. Automation / Python Elite Context
  else if (cat.includes("automation") || name.includes("python") || name.includes("dynamo") || name.includes("script")) {
    uses.push(
      "Deployed to automate repetitive BIM tasks, saving significant man-hours on large projects.",
      "Used for complex geometry processing and data management within Revit/Dynamo environments.",
      "Developing custom add-ins to extend native software capabilities."
    );
  }
  // 4. Tools / Soft Skills Elite Context
  else if (cat.includes("tools") || cat.includes("soft")) {
    uses.push(
      "Used daily for high-stakes coordination between design teams and site execution.",
      "Facilitating clearer communication of technical concepts to non-technical stakeholders.",
      "Managing project data reliability and documentation standards."
    );
  }
  // Fallback
  else {
    uses.push("Utilized in professional workflows to enhance productivity and output quality.");
  }

  return uses;
}

/**
 * Determine experience context context (Live, Academic, R&D)
 */
function getExperienceContext(skillName, categoryTitle) {
  const name = skillName.toLowerCase();
  const cat = (categoryTitle || "").toLowerCase();
  const context = [];

  // Everyone gets R&D/Personal by default as this is a portfolio
  context.push({ label: "Personal R&D / Tools", icon: FlaskConical });

  // Live Projects Logic
  if (
    cat.includes("civil") ||
    cat.includes("revit") ||
    name.includes("autocad") ||
    name.includes("navisworks") ||
    name.includes("site") ||
    name.includes("coordination") ||
    name.includes("excel") ||
    name.includes("acc")
  ) {
    context.unshift({ label: "Live Infrastructure Projects", icon: Briefcase });
  }

  // Academic Logic
  if (
    cat.includes("civil") ||
    name.includes("matlab") ||
    name.includes("sap") ||
    name.includes("etabs")
  ) {
    context.push({ label: "Academic Major Projects", icon: GraduationCap });
  }

  return context;
}

/**
 * Individual skill card with 3D flip and circular progress
 */
function SkillCardDeprecated({ skill, categoryTitle, onClick, index }) {
  const [hovered, setHovered] = useState(false);
  const percent = levelToPercent(skill.level);
  const radius = 26;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;

  const registryId = `SKL-C${(index + 1).toString().padStart(2, '0')}`;
  const displayLetter = skill.name.charAt(0).toUpperCase();

  return (
    <motion.div
      className="relative w-full h-[300px] cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ perspective: "1500px" }}
    >
      {/* Technical Border Hover Glow - Blueprint Style */}
      <div className={`absolute -inset-[2px] rounded-none transition-all duration-500 ${hovered ? 'opacity-100 border-2 border-cyan-500/50 border-dashed' : 'opacity-0 border border-slate-700'} pointer-events-none`} />

      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: hovered ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE - BLUEPRINT THEME */}
        <div
          className="absolute inset-0 bg-[#0B1121] border border-slate-700/60 p-6 flex flex-col justify-between shadow-2xl overflow-hidden group-hover:border-cyan-500/40 transition-colors"
          style={{
            backfaceVisibility: "hidden",
            backgroundImage: "linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        >
          {/* Blueprint Deco: Corner Marks */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/30" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/30" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/30" />
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

          {/* Background Letter */}
          <div className="absolute top-4 right-4 opacity-[0.04] select-none pointer-events-none flex flex-col items-end transform group-hover:scale-110 transition-transform duration-700">
            <span className="text-[140px] font-black leading-none bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent">{displayLetter}</span>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center relative shadow-lg group-hover:shadow-sky-500/20 transition-all">
                  <Cpu className="w-5 h-5 text-sky-500" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${hovered ? 'bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]' : 'bg-slate-600'}`} />
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none mb-1">ID_REF</div>
                  <div className="text-[11px] font-mono font-bold text-sky-400 tracking-wider bg-sky-500/5 px-1.5 py-0.5 rounded border border-sky-500/10">
                    {registryId}
                  </div>
                </div>
              </div>

              <span className="text-[9px] font-mono font-bold text-slate-500 border border-slate-800 bg-slate-900/50 px-2 py-1 rounded uppercase tracking-wider">
                {categoryTitle}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-black italic text-slate-100 uppercase tracking-tighter leading-none break-words mb-2 drop-shadow-lg min-h-[3rem] flex items-end">
              {skill.name}
            </h3>
          </div>

          <div className="space-y-5 relative z-10 flex-grow flex flex-col justify-end">
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r={radius} stroke="rgba(14,165,233,0.1)" strokeWidth={strokeWidth} fill="none" />
                  <motion.circle
                    cx="32" cy="32" r={radius} stroke="url(#gradient-sky)" strokeWidth={strokeWidth} fill="none"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: hovered ? circumference - (percent / 100) * circumference : circumference }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_4px_rgba(14,165,233,0.5)]"
                  />
                  <defs>
                    <linearGradient id="gradient-sky" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-[12px] font-black text-slate-200">{percent}%</span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest">
                  <span>Proficiency</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-500 to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: hovered ? "70%" : "30%" }} // Dynamic animation on hover
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-tight block text-right">{skill.level}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-500 opacity-50" />
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 bg-slate-950/95 border border-sky-500/50 rounded-3xl p-6 flex flex-col backdrop-blur-xl shadow-[0_0_50px_rgba(14,165,233,0.15)] overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Scanline Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-20">
            <motion.div
              className="w-full h-1/2 bg-gradient-to-b from-transparent via-sky-500 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-800/50">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-sky-400 font-bold mb-1">Details</p>
                <h4 className="text-lg font-black italic text-slate-100 uppercase tracking-tighter leading-none line-clamp-1">
                  {skill.name}
                </h4>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <Info className="w-4 h-4 text-sky-500" />
              </div>
            </div>

            <div className="flex-1 min-h-0 bg-slate-900/40 border border-slate-800/50 p-4 rounded-xl overflow-y-auto custom-scrollbar shadow-inner">
              <p className="text-xs text-slate-300 leading-relaxed font-medium mb-4">
                {skill.details || "Integrated as a core component of my engineering stack, utilized for high-precision workflows and project delivery."}
              </p>

              {/* Experience Context Indicators */}
              <div className="space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1">Used On:</p>
                {getExperienceContext(skill.name, categoryTitle).map((ctx, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] text-slate-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {ctx.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[9px] font-mono text-slate-500">TAP TO EXPAND</span>
              <span className="text-[10px] font-bold text-sky-400 uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                Full Specs <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


export default function SkillsSection() {
  const { data: cmsSkills } = useGoogleCMS("skills");
  const { sectionId, eyebrow, title, description, groups: localGroups, note } = skillsData;

  // ELITE Signature Badges (Hardcoded as per request)
  const eliteBadges = [
    "Infrastructure Projects",
    "BIM Workflows",
    "Digital Engineering",
    "Construction Documentation",
    "Automation & Tools",
    "Hybrid Civil + Tech"
  ];

  // Compute groups from CMS or Local
  const groups = useMemo(() => {
    if (cmsSkills && cmsSkills.length > 0) {
      const groupsMap = {};
      cmsSkills.forEach(skill => {
        // Visibility Check
        if (skill.visible === false) return;
        if (typeof skill.visible === 'string' && skill.visible.toLowerCase() === 'false') return;

        const cat = skill.category || "General";
        if (!groupsMap[cat]) groupsMap[cat] = { title: cat, skills: [] };
        groupsMap[cat].skills.push({
          name: skill.name,
          level: skill.level,
          details: skill.details
        });
      });
      return Object.values(groupsMap);
    }
    return localGroups || [];
  }, [cmsSkills, localGroups]);

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
    const context = getExperienceContext(skill.name, categoryTitle);
    const relatedProjects = projectsData.projects.filter(p =>
      p.tech.some(t => t.toLowerCase().includes(skill.name.toLowerCase()))
    );

    setSelectedSkill({ ...skill, categoryTitle, percent, usage, context, relatedProjects });
  };

  const closeModal = () => setSelectedSkill(null);

  // Initial animation controls
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-sky-500/30 pb-20 overflow-x-hidden">
      <SEO title="Skills" description="My technical expertise in Civil Engineering software and Full Stack Web Development." />

      {/* Global Background Elements */}
      <div className="pointer-events-none absolute inset-0 fixed z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-sky-500/10 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse" style={{ animationDelay: "3s" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 pt-12 md:pt-20 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-500 mb-2 px-1">{eyebrow}</p>}
            {title && <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-2xl"><Typewriter text={title} speed={50} /></h2>}
            {description && <p className="text-sm md:text-lg text-slate-400 mt-4 max-w-2xl font-light leading-relaxed border-l-2 border-sky-500/30 pl-4">{description}</p>}
          </div>
          {eliteBadges && eliteBadges.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-start md:justify-end max-w-lg">
              {eliteBadges.map(badge => (
                <span key={badge} className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 hover:border-sky-500/30 hover:text-sky-400 transition-colors cursor-default hover:bg-sky-500/5">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-emerald-500/20 to-sky-500/20 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative flex items-center bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all group-hover:border-slate-700">
            <Search className="ml-4 w-5 h-5 text-sky-500" />
            <input
              type="text"
              placeholder="Search entire technical stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none py-4 px-4 text-slate-200 placeholder:text-slate-600 focus:ring-0 text-sm md:text-base font-medium"
            />
            <div className="pr-4 hidden md:flex items-center gap-2 text-[10px] text-slate-600 font-mono">
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">CTRL</span> + <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">F</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Category Select</p>
            </div>
            {activeGroup.title && (
              <div className="px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider shadow-[0_0_10px_rgba(14,165,233,0.2)]">
                Active_Layer: {activeGroup.title}
              </div>
            )}
          </div>

          <div className="relative group/nav">
            {/* Left Button */}
            <button
              onClick={() => scroll("left")}
              className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-500 transition-all shadow-lg hover:shadow-sky-500/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto px-1 pb-4 pt-1 custom-scrollbar scroll-smooth w-full mask-linear-gradient"
            >
              {filteredGroups.map((group, index) => (
                <button
                  key={group.title}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 relative group px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all overflow-hidden border
                     ${index === activeIndex
                      ? "border-sky-500 bg-sky-500 text-slate-950 shadow-[0_0_20px_rgba(14,165,233,0.4)] scale-105"
                      : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-sky-500/50 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] transition-transform duration-700 ${index === activeIndex ? 'group-hover:translate-x-[100%]' : ''}`} />
                  <span className="relative z-10 flex items-center gap-2">
                    {group.title}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${index === activeIndex ? 'bg-slate-950/20 text-slate-900' : 'bg-slate-800 text-slate-500'}`}>
                      {group.skills?.length || 0}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={() => scroll("right")}
              className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-500 transition-all shadow-lg hover:shadow-sky-500/20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div
          key={activeGroup.title}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3 pb-20"
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
                  index={index}
                  getExperienceContext={getExperienceContext}
                />
              )
            })
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
              <Terminal className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">No modules found matching query</p>
            </div>
          )}
        </motion.div>

        {note && <div className="text-center pb-8"><p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">* {note}</p></div>}
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
                className="relative z-50 w-full max-w-lg rounded-2xl border border-sky-500/30 bg-[#0B1121]/95 shadow-[0_0_50px_rgba(14,165,233,0.3)] overflow-hidden flex flex-col"
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
                    {/* Experience Context - Elite Addition */}
                    {selectedSkill.context && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-3 flex items-center gap-2">
                          <span className="w-1 h-3 bg-emerald-500/50" />
                          Validated Experience
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSkill.context.map((ctx, idx) => {
                            const Icon = ctx.icon;
                            return (
                              <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-emerald-500/30 transition-colors">
                                <Icon className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-[11px] text-slate-300 font-bold">{ctx.label}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
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
    </div>
  );
}
