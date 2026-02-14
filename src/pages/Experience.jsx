import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import content from "../data/index";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Terminal,
  CheckCircle2,
  Award,
  Building2
} from "lucide-react";

function getEndYear(item) {
  // Check main period first
  const text = item.period || item.years || "";
  if (text.toLowerCase().includes("present")) return 9999;

  // If no main period, check roles if available (e.g. for grouped companies)
  if (item.roles && item.roles.length > 0) {
    // Find the latest year among all roles
    return Math.max(...item.roles.map(r => getEndYear(r)));
  }

  const match = text.match(/\d{4}/g);
  return match ? Number(match[match.length - 1]) : 0;
}

export default function Experience() {
  const { experience = [], education = [] } = content || {};
  const location = useLocation();
  const [tab, setTab] = useState("experience");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");

    if (location.pathname.includes("education") || tabParam === "education") {
      setTab("education");
    } else {
      setTab("experience");
    }
  }, [location.pathname, location.search]);

  // Debugging
  // console.log("Content Experience:", content?.experience);

  const items =
    tab === "experience"
      ? (Array.isArray(experience) ? experience : [])
        .map((e) => e ? { ...e, kind: "experience" } : null)
        .filter(Boolean)
        .sort((a, b) => getEndYear(b) - getEndYear(a))
      : (Array.isArray(education) ? education : [])
        .sort((a, b) => getEndYear(b) - getEndYear(a))
        .map((e) => ({ ...e, kind: "education" }));

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden pb-20">
      {/* Background technical elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-blueprint opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 relative space-y-12">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sky-400">
              <Terminal className="w-4 h-4" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic text-slate-100 uppercase tracking-tighter leading-[0.85]">
              PROFESSIONAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">TIMELINE</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
              A chronological record of my {tab === "experience" ? "professional roles, internships, and hands-on engineering experience" : "academic journey and educational milestones"}.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-1 backdrop-blur-sm flex gap-1">
            <button
              onClick={() => setTab("experience")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all
                ${tab === "experience"
                  ? "bg-sky-500 text-slate-950 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                  : "text-slate-500 hover:text-slate-300"}`}
            >
              <Briefcase className="w-4 h-4" />
              Experience
            </button>
            <button
              onClick={() => setTab("education")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all
                ${tab === "education"
                  ? "bg-sky-500 text-slate-950 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                  : "text-slate-500 hover:text-slate-300"}`}
            >
              <GraduationCap className="w-4 h-4" />
              Education
            </button>
          </div>
        </div>

        {/* ================= TIMELINE ================= */}
        <section className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Desktop Timeline */}
              <div className="hidden md:block">
                <DesktopTimeline items={items} tab={tab} onSelect={setSelectedItem} />
              </div>

              {/* Mobile Timeline */}
              <div className="md:hidden">
                <MobileTimeline items={items} tab={tab} onSelect={setSelectedItem} />
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ================= FOOTER ================= */}
        <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-sky-500" /> Archive_Active</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> Data_Verified</span>
          </div>
          <div>© 2024 PRADUL P · ENG_TIMELINE_SYS</div>
        </div>
      </div>
      <AnimatePresence>
        {selectedItem && (
          <ExperienceModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ================= DESKTOP TIMELINE ================= */
function DesktopTimeline({ items, tab, onSelect }) {
  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
          <Terminal className="w-6 h-6 text-slate-700" />
        </div>
        <p className="text-slate-300 font-bold uppercase tracking-widest italic">No Timeline Data</p>
      </div>
    );
  }

  return (
    <div className="space-y-0 relative py-8">
      {/* Center Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent -translate-x-1/2" />

      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        const isCurrent = item.isCurrent || (item.period && item.period.toLowerCase().includes("present"));

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-center justify-between mb-16 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
          >
            {/* Content Card */}
            <div className={`w-[45%] ${isLeft ? "pr-8" : "pl-8"}`}>
              <TimelineCard item={item} align={isLeft ? "right" : "left"} tab={tab} isCurrent={isCurrent} onSelect={onSelect} />
            </div>

            {/* Center Node */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
              <div className={`w-5 h-5 rounded-full border-2 ${isCurrent ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse' : 'bg-slate-950 border-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.4)]'}`} />
            </div>

            {/* Empty space */}
            <div className="w-[45%]" />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ================= MOBILE TIMELINE ================= */
function MobileTimeline({ items, tab, onSelect }) {
  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <Terminal className="w-12 h-12 text-slate-700" />
        <p className="text-slate-400 text-sm">No timeline data available</p>
      </div>
    );
  }

  return (
    <div className="relative border-l-2 border-slate-800 pl-8 space-y-10">
      {items.map((item, index) => {
        const isCurrent = item.isCurrent || (item.period && item.period.toLowerCase().includes("present"));

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative"
          >
            <div className="absolute -left-[37px] top-2">
              <div className={`w-4 h-4 rounded-full border-2 ${isCurrent ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse' : 'bg-slate-950 border-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.4)]'}`} />
            </div>
            <TimelineCard item={item} align="left" tab={tab} isCurrent={isCurrent} onSelect={onSelect} />
          </motion.div>
        );
      })}

    </div >
  );
}

/* ================= TIMELINE CARD ================= */
function TimelineCard({ item, align, tab, isCurrent, onSelect }) {
  // Adapter for data structure
  let roles = item.roles;

  if (!roles) {
    if (item.role) {
      // Flattened Experience Data
      roles = [{ ...item, title: item.role, tools: item.highlights, summary: item.summary }];
    } else if (item.degree) {
      // Education Data Adapter
      roles = [{
        title: item.degree,
        period: item.years,
        summary: item.description,
        tools: item.highlights,
        points: [] // Education specific points if any
      }];
    } else {
      roles = [];
    }
  }

  // Use Company Name for main header
  let companyName = item.company || item.place || "";
  let subtitle = item.subtitle || "";
  const period = item.period || item.years || "";

  // Education specific overrides for clearer display
  if (tab === "education") {
    // For education, we want the Institution as the main header
    companyName = item.place || companyName;
    // And maybe use the degree name for the background text if no shortName provided
    if (item.degree && !item.shortName) {
      // e.g. B.Tech -> BTECH, Higher Secondary -> HSE
      const degreeShort = item.degree.split(" ")[0].replace(/[^a-zA-Z]/g, "").toUpperCase();
      item.shortName = degreeShort.length > 2 ? degreeShort : "EDU";
    }
  }

  const bgText = (item.backgroundText || item.shortName || companyName || period || "").toUpperCase().split(" ")[0] || "EXP";
  const registryId = `${tab === "experience" ? "EXP" : "EDU"}-${period.split(" ")[0]?.substring(2) || "XX"}`;

  // EDUCATION CARD LAYOUT
  if (tab === "education") {
    return (
      <div
        className={`group relative ${align === "right" ? "ml-auto" : "mr-auto"} cursor-pointer`}
        onClick={() => onSelect(item)}
      >
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm overflow-hidden hover:border-sky-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 group-hover:-translate-y-1 p-6 md:p-8">

          {/* Background Watermark */}
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <span className="text-6xl md:text-8xl font-black italic text-slate-700 select-none">
              {bgText}
            </span>
          </div>

          {/* Header Section */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs font-bold text-emerald-400 tracking-widest uppercase">
                {period}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black italic text-white uppercase leading-tight mb-2 group-hover:text-sky-400 transition-colors">
              {roles[0]?.title || item.degree}
            </h3>

            <div className="flex items-start gap-3 text-slate-400">
              <Building2 className="w-4 h-4 mt-1 flex-shrink-0" />
              <p className="font-semibold text-sm md:text-base">{companyName}</p>
            </div>
          </div>

          {/* Description */}
          <div className="relative z-10 mt-8 mb-8">
            <p className="pl-4 border-l-2 border-slate-700 text-slate-400 italic text-sm md:text-base leading-relaxed whitespace-pre-line">
              {roles[0]?.summary || item.description}
            </p>
          </div>

          {/* Achievements / Highlights */}
          {roles[0]?.tools && roles[0].tools.length > 0 && (
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <Award className="w-3 h-3" />
                <span>Achievements</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {roles[0].tools.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium tracking-wide shadow-sm hover:bg-emerald-500/10 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer Registry */}
          <div className="relative z-10 mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono font-bold text-slate-600 uppercase tracking-[0.2em]">
            <span>REGISTRY: {registryId}</span>
            <span className="text-emerald-500/50">VERIFIED</span>
          </div>
        </div>
      </div>
    );
  }

  // EXPERIENCE CARD LAYOUT (Default)
  return (
    <div
      className={`group relative ${align === "right" ? "ml-auto" : "mr-auto"} cursor-pointer`}
      onClick={() => onSelect(item)}
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-sm overflow-hidden hover:border-sky-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 group-hover:-translate-y-1">

        {/* Card Header - Company Info */}
        <div className="relative p-6 pb-4 bg-gradient-to-br from-slate-900/50 to-slate-950/50 border-b border-slate-800/50">
          <div className="absolute top-3 right-3 text-4xl font-black text-white/[0.04] select-none pointer-events-none italic uppercase truncate max-w-[200px] text-right">
            {bgText}
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-sky-400">
                {period}
              </span>
              {isCurrent && (
                <span className="text-[10px] font-mono font-black px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-400 uppercase tracking-wider animate-pulse">
                  Active
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-black italic text-slate-100 uppercase tracking-tighter leading-tight group-hover:text-sky-400 transition-colors">
                {companyName}
              </h3>

              {subtitle && (
                <p className="text-xs font-medium text-slate-500 mt-1">{subtitle}</p>
              )}
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-600" />
              <p className="text-sm font-medium">{item.location || "Remote / On-site"}</p>
            </div>
          </div>
        </div>

        {/* Card Body - Roles List (Truncated) */}
        <div className="p-6 pt-4 space-y-6">
          {roles.map((role, idx) => (
            <div key={idx} className={`relative ${idx !== 0 ? "pt-6 border-t border-slate-800/50" : ""}`}>
              {/* Role Header */}
              <div className="mb-3">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <h4 className="text-lg font-bold text-sky-100">{role.title}</h4>
                  {role.period && role.period !== period && (
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{role.period}</span>
                  )}
                </div>

                {role.summary && (
                  <p className="text-xs md:text-sm font-semibold text-slate-400 italic mb-2">
                    {role.summary}
                  </p>
                )}
              </div>

              {/* Role Points (Limited to 2 items) */}
              {Array.isArray(role.points) && role.points.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {role.points.slice(0, 2).map((pt, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/50 flex-shrink-0 mt-1" />
                      <span className="text-xs md:text-sm text-slate-300 leading-relaxed line-clamp-2">{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tools (Preview) */}
              {Array.isArray(role.tools) && role.tools.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {role.tools.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-slate-800/50 text-slate-500">{t}</span>
                  ))}
                  {role.tools.length > 3 && (
                    <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800/30 text-slate-600">+{role.tools.length - 3}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="px-6 py-4 bg-slate-900/30 border-t border-slate-800/50 cursor-pointer hover:bg-slate-800/50 transition-colors group/btn">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-400 group-hover/btn:text-sky-300">
            <span>Show Full Experience</span>
            <Terminal className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800/50">
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            <span>REG: {registryId}</span>
            <span className="text-emerald-500/50">VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}



/* ================= EXPERIENCE MODAL ================= */
function ExperienceModal({ item, onClose }) {
  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!item) return null;

  // Adapter for data structure (replicated logic)
  let roles = item.roles;
  if (!roles) {
    if (item.role) {
      roles = [{ ...item, title: item.role, tools: item.highlights, summary: item.summary }];
    } else if (item.degree) {
      roles = [{
        title: item.degree,
        period: item.years,
        summary: item.description,
        tools: item.highlights,
        points: []
      }];
    } else {
      roles = [];
    }
  }

  const companyName = item.company || item.place || "";
  const subtitle = item.subtitle || "";

  // Determine if this is an education item
  const isEducation = !!item.degree;

  // For Education: 
  // Main Header = Degree
  // Subtitle/Context = University
  const displayTitle = isEducation ? (item.degree || companyName) : companyName;
  const displaySubtitle = isEducation ? companyName : subtitle;

  // Get latest role to display at the top (only for Experience)
  const latestRole = isEducation ? "" : (roles[0]?.title || "");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl relative custom-scrollbar flex flex-col"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-6 md:p-8 flex justify-between items-start gap-4 flex-shrink-0 shadow-lg">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-400 uppercase leading-none animate-gradient-x">
                {displayTitle}
              </h2>
              {item.isCurrent && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  Active Role
                </span>
              )}
            </div>

            {latestRole && (
              <div className="flex items-center gap-2 text-slate-300">
                <Briefcase className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-bold uppercase tracking-wide">{latestRole}</span>
              </div>
            )}

            {displaySubtitle && <p className={`text-slate-400 font-medium text-sm border-l-2 border-slate-700 pl-3 ${isEducation ? 'text-base font-bold text-slate-300' : ''}`}>{displaySubtitle}</p>}

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs md:text-sm text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                {item.period}
              </span>
              {!isEducation && (
                <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {item.location}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-700 hover:border-red-500/30 text-slate-400 transition-all group"
            title="Close Modal"
          >
            <div className="sr-only">Close</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:rotate-90 transition-transform">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content - Full Details */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="p-6 md:p-8 space-y-10 overflow-y-auto flex-grow"
        >
          {roles.map((role, idx) => (
            <motion.div variants={itemVariants} key={idx} className={`relative ${idx !== 0 ? "pt-10 border-t border-slate-800" : ""}`}>
              {/* Only show Title in Body if it's NOT the same as the main header */}
              {(!isEducation || roles.length > 1) && (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <h3 className="text-xl font-bold text-sky-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                    {role.title}
                  </h3>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-900 px-3 py-1 rounded border border-slate-800">
                    {role.period}
                  </span>
                </div>
              )}

              {role.summary && (
                <p className="text-sky-200/80 font-medium italic mb-6 pl-4 border-l-2 border-sky-500/30 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {role.summary}
                </p>
              )}

              {/* Full Points */}
              {Array.isArray(role.points) && (
                <ul className="space-y-4 mb-6">
                  {role.points.map((pt, i) => (
                    <li key={i} className="flex gap-4 items-start group/point">
                      <div className="mt-1.5 min-w-[16px]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500/50 group-hover/point:text-emerald-400 transition-colors" />
                      </div>
                      <span className="text-slate-300 leading-relaxed text-sm md:text-base group-hover/point:text-slate-100 transition-colors">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* All Tools */}
              {Array.isArray(role.tools) && role.tools.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-800/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                    {isEducation ? <Award className="w-3 h-3 text-emerald-400" /> : <Terminal className="w-3 h-3" />}
                    {isEducation ? "ACHIEVEMENTS" : "TECHNOLOGIES USED"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-default select-none shadow-sm ${isEducation
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10"
                          : "bg-slate-800/40 border-slate-700/50 text-sky-300/70 hover:bg-sky-500/10 hover:border-sky-500/30 hover:text-sky-300"
                          }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
