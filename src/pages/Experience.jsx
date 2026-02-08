import React, { useEffect, useState } from "react";
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
  const text = item.period || item.years || "";
  if (!text) return 0;
  if (text.toLowerCase().includes("present")) return 9999;
  const match = text.match(/\d{4}/g);
  return match ? Number(match[match.length - 1]) : 0;
}

export default function Experience() {
  const { experience = [], education = [] } = content || {};
  const location = useLocation();
  const [tab, setTab] = useState("experience");

  useEffect(() => {
    if (location.pathname.includes("education")) {
      setTab("education");
    } else {
      setTab("experience");
    }
  }, [location.pathname]);

  const items =
    tab === "experience"
      ? [...(experience || [])]
        .sort((a, b) => getEndYear(b) - getEndYear(a))
        .map((e) => ({ ...e, kind: "experience" }))
      : [...(education || [])]
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
              <span className="text-xs font-mono font-black uppercase tracking-[0.3em]">Career Archive v2.0</span>
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
                <DesktopTimeline items={items} tab={tab} />
              </div>

              {/* Mobile Timeline */}
              <div className="md:hidden">
                <MobileTimeline items={items} tab={tab} />
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
          <div>© 2024 PRADUL P · CAREER_TIMELINE_SYS</div>
        </div>
      </div>
    </main>
  );
}

/* ================= DESKTOP TIMELINE ================= */
function DesktopTimeline({ items, tab }) {
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
              <TimelineCard item={item} align={isLeft ? "right" : "left"} tab={tab} isCurrent={isCurrent} />
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
function MobileTimeline({ items, tab }) {
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
            <TimelineCard item={item} align="left" tab={tab} isCurrent={isCurrent} />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ================= TIMELINE CARD ================= */
function TimelineCard({ item, align, tab, isCurrent }) {
  const period = item.period || item.years || "";
  const title = item.role || item.degree || item.title || "";
  const place = item.company || item.place || item.location || item.position || "";
  const registryId = `${tab === "experience" ? "EXP" : "EDU"}-${period.split(" ")[0]?.substring(2) || "XX"}`;

  return (
    <div className={`group relative ${align === "right" ? "ml-auto" : "mr-auto"}`}>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-sm overflow-hidden hover:border-sky-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10">
        {/* Card Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-br from-slate-900/50 to-slate-950/50">
          {/* Background Registry Number */}
          <div className="absolute top-3 right-3 text-5xl font-black text-white/[0.02] select-none pointer-events-none italic">
            {registryId}
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {tab === "experience" ? (
                    <Briefcase className="w-4 h-4 text-sky-400" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                  )}
                  <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-sky-400">
                    {period}
                  </span>
                  {isCurrent && (
                    <span className="text-[9px] font-mono font-black px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-400 uppercase tracking-wider animate-pulse">
                      Active
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black italic text-slate-100 uppercase tracking-tighter leading-tight">
                  {title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <Building2 className="w-3.5 h-3.5 text-slate-600" />
              <p className="text-sm font-medium">{place}</p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 pt-4 space-y-4">
          {/* Experience Points */}
          {Array.isArray(item.points) && item.points.length > 0 && (
            <ul className="space-y-3">
              {item.points.slice(0, 4).map((pt, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 group/item"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-500/50 flex-shrink-0 mt-0.5 group-hover/item:text-sky-400 transition-colors" />
                  <span className="text-xs md:text-sm text-slate-300 leading-relaxed">{pt}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Education Description */}
          {item.description && (
            <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-sky-500/30 pl-4 italic">
              {item.description}
            </p>
          )}

          {/* Education Highlights */}
          {Array.isArray(item.highlights) && item.highlights.length > 0 && (
            <div className="pt-3 border-t border-slate-800/50">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-500">Achievements</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.highlights.map((h, i) => (
                  <span key={i} className="text-[10px] px-3 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 font-medium">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card Footer - Registry ID */}
        <div className="px-6 py-3 bg-slate-900/50 border-t border-slate-800/50">
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            <span>Registry: {registryId}</span>
            <span className="text-emerald-500/50">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
