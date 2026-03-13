import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import content from "../data/index";
import useGoogleCMS from "../hooks/useGoogleCMS";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Terminal,
  CheckCircle2,
  Award,
  Building2,
  MousePointerClick
} from "lucide-react";

function formatDisplayDate(str) {
  if (!str) return "";
  if (str.includes("T") && str.includes("Z")) {
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[d.getMonth()]} ${d.getFullYear()}`;
    }
  }
  return str;
}

function parseDateToComparable(str) {
  if (!str) return 0;
  const s = str.toLowerCase();
  if (s.includes("present") || s.includes("current")) return Number.MAX_SAFE_INTEGER;

  if (s.includes("t") && s.includes("z")) {
    const time = new Date(str).getTime();
    return isNaN(time) ? 0 : time;
  }

  const match = str.match(/([a-zA-Z]+)?\s*(\d{4})/);
  if (match) {
    const year = parseInt(match[2], 10);
    const monthStr = match[1] || "Jan";
    const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
    const m = months[monthStr.toLowerCase().substring(0, 3)] ?? 0;
    return new Date(year, m).getTime();
  }
  return 0;
}

function getStartAndEndStrings(periodStr) {
  if (!periodStr) return { start: "", end: "" };
  const parts = periodStr.split(/[—–-]/).map(s => s.trim());
  return {
    start: parts[0] || "",
    end: parts.length > 1 ? parts[1] : parts[0] || ""
  };
}

function getEndValue(periodStr) {
  const { end } = getStartAndEndStrings(periodStr);
  return parseDateToComparable(end);
}

function getEndYear(item) {
  // Check main period first
  const text = String(item.period || item.years || "");
  if (text.toLowerCase().includes("present")) return 9999;

  // If no main period, check roles if available (e.g. for grouped companies)
  if (item.roles && item.roles.length > 0) {
    // Find the latest year among all roles
    return Math.max(...item.roles.map(r => getEndYear(r)));
  }

  const match = String(text).match(/\d{4}/g);
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

  const { data: cmsExperience } = useGoogleCMS("experience");
  const { data: cmsEducation } = useGoogleCMS("education");

  const actualExperience = (cmsExperience && cmsExperience.length > 0) ? cmsExperience : experience;
  const actualEducation = (cmsEducation && cmsEducation.length > 0) ? cmsEducation : education;

  const groupedExperience = useMemo(() => {
    if (!actualExperience || actualExperience.length === 0) return [];

    // Check if it's already grouped (like the local experience.json)
    if (actualExperience[0].roles) return actualExperience;

    // Otherwise, it's flat data from Google CMS - Group by company
    const map = {};
    actualExperience.forEach(item => {
      const comp = item.company ? String(item.company).trim() : "Unknown Company";

      if (!map[comp]) {
        map[comp] = {
          company: comp,
          location: String(item.location || ""),
          backgroundText: String(item.backgroundText || comp).split(" ")[0].toUpperCase(),
          subtitle: item.subtitle || "",
          period: "",
          isCurrent: false,
          _rolesRaw: []
        };
      }

      // Parse lists from comma/pipe delimited string
      let points = [];
      if (item.description) {
        points = String(item.description).split(/(?:\|\||,)/).map(s => s.trim()).filter(Boolean);
      }

      let tools = [];
      if (item.tech) {
        tools = String(item.tech).split(/(?:\|\||,)/).map(s => s.trim()).filter(Boolean);
      }

      const rolePeriod = formatDisplayDate(String(item.period || ""));
      const isCur = rolePeriod.toLowerCase().includes('present');

      // Add as a sub-role
      map[comp]._rolesRaw.push({
        title: item.title || item.role || "",
        period: rolePeriod,
        summary: item.summary || "", // Don't repeat the first point automatically
        points: points,
        tools: tools,
        isCurrent: isCur,
        certificate: item.certificate || "",
        pdf: item.pdf || "",
        photos: item.photos ? String(item.photos).split(/(?:\|\||,)/).map(s => s.trim()).filter(Boolean) : []
      });

      // Keep track of overall current status
      if (isCur) {
        map[comp].isCurrent = true;
      }
    });

    return Object.values(map).map(comp => {
      // Sort roles descending
      comp.roles = comp._rolesRaw.sort((a, b) => getEndValue(b.period) - getEndValue(a.period));

      if (comp.roles.length > 0) {
        const latestRole = comp.roles[0];
        const earliestRole = comp.roles[comp.roles.length - 1];

        const latestEnd = getStartAndEndStrings(latestRole.period).end;
        const earliestStart = getStartAndEndStrings(earliestRole.period).start;

        if (comp.roles.length > 1 && earliestStart && latestEnd && earliestStart !== latestEnd) {
          comp.period = `${earliestStart} — ${latestEnd}`;
        } else {
          comp.period = latestRole.period;
        }
      }
      delete comp._rolesRaw;
      return comp;
    });
  }, [actualExperience]);

  const items =
    tab === "experience"
      ? (Array.isArray(groupedExperience) ? [...groupedExperience] : [])
        .map((e) => e ? { ...e, kind: "experience" } : null)
        .filter(Boolean)
        .sort((a, b) => getEndYear(b) - getEndYear(a))
      : (Array.isArray(actualEducation) ? [...actualEducation] : [])
        .map((e) => ({ ...e, kind: "education" }))
        .sort((a, b) => getEndYear(b) - getEndYear(a));

  return (
    <section className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden pb-20">
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
    </section>
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
        const isCurrent = item.isCurrent || (item.period && String(item.period).toLowerCase().includes("present"));

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
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
        const isCurrent = item.isCurrent || (item.period && String(item.period).toLowerCase().includes("present"));

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
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
      roles = [{ ...item, title: item.role, tools: item.highlights, summary: item.summary, points: item.points || [] }];
    } else if (item.degree) {
      // Education Data Adapter
      roles = [{
        title: item.degree,
        period: item.years,
        summary: "",
        tools: item.achievements ? String(item.achievements).split(/(?:\|\||,)/).map(s => s.trim()).filter(Boolean) : (item.highlights || []),
        points: item.description ? String(item.description).split(/(?:\|\|)/).map(s => s.trim()).filter(Boolean) : [],
        certificate: item.certificate || "",
        pdf: item.pdf || "",
        photos: item.photos ? String(item.photos).split(/(?:\|\||,)/).map(s => s.trim()).filter(Boolean) : []
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
      const degreeShort = String(item.degree).split(" ")[0].replace(/[^a-zA-Z]/g, "").toUpperCase();
      item.shortName = degreeShort.length > 2 ? degreeShort : "EDU";
    }
  }

  const bgText = String(item.backgroundText || item.shortName || companyName || period || "").toUpperCase().split(" ")[0] || "EXP";
  const registryId = `${tab === "experience" ? "EXP" : "EDU"}-${String(period).split(" ")[0]?.substring(2) || "XX"}`;

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

          {/* Click prompt pop-up */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 pointer-events-none transition-all duration-300">
            <div className="animate-bounce bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] rounded-full p-2 flex items-center backdrop-blur-md transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
              <MousePointerClick className="w-5 h-5" />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] max-w-0 overflow-hidden opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap">
                Click to Open
              </span>
            </div>
          </div>

          {/* Header Section */}
          <div className="relative z-10 w-[90%] md:w-full max-w-[85%] pr-10">
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

          {/* Points / Description */}
          <div className="relative z-10 mt-6 mb-6">
            <ul className="space-y-3">
              {roles[0]?.points?.map((pt, i) => (
                <li key={i} className="flex gap-3 items-start group/point">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500/50 mt-1 flex-shrink-0 group-hover/point:text-emerald-400 transition-colors" />
                  <span className="text-slate-300 text-sm md:text-base leading-relaxed group-hover/point:text-white transition-colors">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
            {roles[0]?.summary && (
              <p className="mt-4 pl-4 border-l-2 border-slate-700 text-slate-400 italic text-sm md:text-base leading-relaxed whitespace-pre-line">
                {roles[0].summary}
              </p>
            )}
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

          {/* Media Preview Indicator */}
          {(roles[0]?.certificate || roles[0]?.pdf || (roles[0]?.photos && roles[0]?.photos.length > 0)) && (
            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/30 flex items-center gap-2 text-violet-400">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-md font-bold text-[10px] uppercase tracking-wider">
                <Terminal className="w-3 h-3" /> Attachments Available (Click to View)
              </span>
            </div>
          )}

          {/* Footer Registry */}
          <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono font-bold text-slate-600 uppercase tracking-[0.2em]">
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

          {/* Click prompt pop-up */}
          <div className="absolute top-4 right-4 md:top-5 md:right-5 z-20 pointer-events-none transition-all duration-300">
            <div className="animate-bounce bg-sky-500/10 border border-sky-500/40 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.3)] rounded-full p-2 flex items-center backdrop-blur-md transition-all duration-300 group-hover:bg-sky-500/20 group-hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]">
              <MousePointerClick className="w-5 h-5" />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] max-w-0 overflow-hidden opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap">
                Click to Open
              </span>
            </div>
          </div>

          <div className="relative z-10 space-y-2 max-w-[85%]">
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

              {/* Role Points */}
              {Array.isArray(role.points) && role.points.length > 0 && (
                <ul className="space-y-3 mb-4">
                  {role.points.map((pt, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/50 flex-shrink-0 mt-1" />
                      <span className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl">{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tools (Preview) */}
              {Array.isArray(role.tools) && role.tools.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {role.tools.slice(0, 4).map((t, i) => (
                    <span key={i} className="text-[10px] sm:text-xs font-semibold px-2 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm hover:bg-sky-500/20 transition-colors">
                      {t}
                    </span>
                  ))}
                  {role.tools.length > 4 && (
                    <span className="text-[10px] sm:text-xs font-semibold px-2 py-1 rounded bg-slate-800/50 text-slate-400 border border-slate-700/50">
                      +{role.tools.length - 4} more
                    </span>
                  )}
                </div>
              )}
              {/* Media Preview Tags */}
              {(role.certificate || role.pdf || (role.photos && role.photos.length > 0)) && (
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-800/30">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-md font-bold text-[10px] uppercase tracking-wider">
                    <Terminal className="w-3 h-3" /> Attachments Available (Click to View)
                  </span>
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
  const [activeMedia, setActiveMedia] = useState(null); // { title: string, url: string, type: string }

  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!item) return null;

  const getEmbedUrl = (url) => {
    if (!url) return url;
    if (url.includes('drive.google.com') && url.includes('/view')) {
      return url.replace('/view', '/preview'); // Google drive embed
    }
    return url;
  };

  const getImageUrl = (url) => {
    if (!url) return url;
    // Map Google Drive preview URLs to direct image source URLs
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    return url;
  };

  const isDriveEmbed = activeMedia && activeMedia.url && activeMedia.url.includes('drive.google.com');

  // Adapter for data structure (replicated logic)
  let roles = item.roles;
  if (!roles) {
    if (item.role) {
      roles = [{ ...item, title: item.role, tools: item.highlights, summary: item.summary, points: item.points || [] }];
    } else if (item.degree) {
      roles = [{
        title: item.degree,
        period: item.years,
        summary: "",
        tools: item.achievements ? String(item.achievements).split(/(?:\|\||,)/).map(s => s.trim()).filter(Boolean) : (item.highlights || []),
        points: item.description ? String(item.description).split(/(?:\|\|)/).map(s => s.trim()).filter(Boolean) : [],
        certificate: item.certificate || "",
        pdf: item.pdf || "",
        photos: item.photos ? String(item.photos).split(/(?:\|\||,)/).map(s => s.trim()).filter(Boolean) : []
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
                {item.period || item.years}
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

              {/* Media Section: Certificates, PDFs, Photos */}
              {(role.certificate || role.pdf || (role.photos && role.photos.length > 0)) && (
                <div className="mt-6 flex flex-wrap items-center gap-3 pt-6 border-t border-slate-800/50">
                  {role.certificate && (
                    <button onClick={() => setActiveMedia({ title: 'Certificate View', url: role.certificate, type: 'certificate' })} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition-all font-bold text-xs uppercase tracking-wider">
                      <Award className="w-4 h-4" /> View Certificate
                    </button>
                  )}
                  {role.pdf && (
                    <button onClick={() => setActiveMedia({ title: 'PDF Flipbook Reader', url: role.pdf, type: 'pdf' })} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all font-bold text-xs uppercase tracking-wider cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M10 13v6" /><path d="M9 13h2" /><path d="M16 13h-2v6h2" /></svg>
                      Read PDF
                    </button>
                  )}
                  {role.photos && role.photos.length > 0 && (
                    <button onClick={() => setActiveMedia({ title: 'Photo Gallery', url: role.photos[0], type: 'photo' })} className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-lg hover:bg-sky-500/20 transition-all font-bold text-xs uppercase tracking-wider cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                      View Photos
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Media Viewer Overlay (In-App iframe for Drive/PDF links) */}
        <AnimatePresence>
          {activeMedia && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-50 bg-slate-950 flex flex-col rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeMedia.type === 'pdf' ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                    {activeMedia.type === 'pdf' ? <Terminal className="w-5 h-5 text-red-500" /> : <Award className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <div>
                    <h3 className="text-white font-black italic uppercase tracking-widest">{activeMedia.title}</h3>
                    <p className="text-[10px] text-slate-500 font-mono tracking-widest">SECURE_EMBED_VIEWER</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveMedia(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/30 text-slate-300 hover:text-red-400 rounded-lg transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  Close Viewer
                </button>
              </div>
              <div className="flex-grow relative bg-slate-900 overflow-hidden outline-none flex items-center justify-center">
                {isDriveEmbed ? (
                  <div className="absolute inset-0 bg-slate-900">
                    <iframe
                      src={getEmbedUrl(activeMedia.url)}
                      className="absolute w-full border-none outline-none bg-slate-900"
                      style={{ top: "-56px", height: "calc(100% + 56px)" }}
                      title={activeMedia.title}
                      allow="autoplay"
                    />
                  </div>
                ) : activeMedia.type === 'photo' ? (
                  <img src={activeMedia.url} alt="Media View" className="max-w-full max-h-full object-contain p-4 rounded-xl shadow-2xl" />
                ) : (
                  <iframe
                    src={getEmbedUrl(activeMedia.url)}
                    className="w-full h-full border-none outline-none zoom-150 bg-slate-900"
                    title={activeMedia.title}
                    allow="autoplay"
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>,
    document.body
  );
}
