// src/components/SkillsSection.jsx
// Main Skills section with:
// - Header (eyebrow, title, description, badges)
// - Top-level tabs: "Skills" / "Certifications & Achievements"
// - Skills view: category tabs + flip cards + modal
// - Certifications view: renders <CertificationsSection />

import React, { useState } from "react";
import skillsData from "../data/skills.json";
import CertificationsSection from "./CertificationsSection"; // used for the second tab

/**
 * Convert a text level label into a rough percentage
 * (used for the circular progress indicator).
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
 * This can be refined later, but keeps logic in one place.
 */
function getSkillUsage(skillName, categoryTitle) {
  const name = skillName.toLowerCase();
  const cat = categoryTitle.toLowerCase();

  const uses = [];

  if (
    cat.includes("bim") ||
    name.includes("revit") ||
    name.includes("navisworks") ||
    name.includes("autocad")
  ) {
    uses.push(
      "Used in BIM and CAD production work on live infrastructure projects.",
      "Applied for modeling, coordination, and construction drawings.",
      "Explored further in personal R&D around BIM automation and workflows."
    );
  }

  if (
    cat.includes("web") ||
    name.includes("react") ||
    name.includes("javascript") ||
    name.includes("tailwind")
  ) {
    uses.push(
      "Used for your personal portfolio and experimental web tools.",
      "Helps bridge engineering, BIM and modern web technology."
    );
  }

  if (
    cat.includes("tools") ||
    name.includes("excel") ||
    name.includes("sheets") ||
    name.includes("vs code") ||
    name.includes("notion")
  ) {
    uses.push(
      "Used daily for calculations, data tracking and documentation.",
      "Supports BIM, CAD and project coordination workflows."
    );
  }

  if (cat.includes("soft")) {
    uses.push(
      "Used in team coordination and communication on site and remotely.",
      "Helps with client discussions, reviews and issue resolution."
    );
  }

  if (!uses.length) {
    uses.push(
      "Used across academic work, professional projects and personal experiments."
    );
  }

  return uses;
}

/**
 * Individual skill card:
 * - 3D flip on hover
 * - Circular progress meter
 * - On click → triggers parent modal via onClick()
 */
function SkillCard({ skill, categoryTitle, onClick }) {
  const [flipped, setFlipped] = useState(false);

  const percent = levelToPercent(skill.level);
  const radius = 26;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const wrapperStyle = {
    perspective: "1200px",
  };

  const innerStyle = {
    transformStyle: "preserve-3d",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    transition: "transform 0.6s ease",
  };

  const faceStyle = {
    backfaceVisibility: "hidden",
  };

  const backFaceStyle = {
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
  };

  return (
    <div
      className="relative w-full min-h-[210px] md:min-h-[230px] cursor-pointer"
      style={wrapperStyle}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 rounded-2xl border border-slate-800 bg-slate-950/70 shadow-[0_0_25px_rgba(56,189,248,0.25)]"
        style={innerStyle}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 p-4 flex items-center gap-4"
          style={faceStyle}
        >
          {/* Circular progress */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-[-8px] rounded-full bg-sky-500/10 blur-xl" />

            <svg className="w-20 h-20" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="rgba(51,65,85,0.7)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="rgb(56,189,248)"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>

            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-sky-300">
                {percent}%
              </span>
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 space-y-2">
            <div>
              <p className="text-sm text-slate-400">Skill</p>
              <h3 className="text-base md:text-lg font-semibold text-slate-50 leading-snug break-words">
                {skill.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {skill.level && (
                <span className="px-2.5 py-1 rounded-full text-[0.65rem] uppercase tracking-wide border border-sky-500/70 bg-sky-500/10 text-sky-100">
                  {skill.level}
                </span>
              )}
              <span className="px-2.5 py-1 rounded-full text-[0.65rem] uppercase tracking-wide border border-emerald-500/60 bg-emerald-500/10 text-emerald-100">
                {categoryTitle}
              </span>
            </div>

            {/* Small CTA hint – modal opens on click */}
            <span className="text-[0.7rem] text-sky-300 underline underline-offset-4">
              Read details
            </span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 p-4 flex flex-col justify-between"
          style={backFaceStyle}
        >
          <div className="flex justify-between items-start gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-sky-400">
                Details
              </p>
              <h3 className="text-base md:text-lg font-semibold text-slate-50 leading-snug break-words">
                {skill.name}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[0.65rem] uppercase tracking-wide border border-fuchsia-500/70 bg-fuchsia-500/10 text-fuchsia-100">
              {skill.level || "Skill"}
            </span>
          </div>

          <div className="text-xs text-slate-300 space-y-1.5 mt-2">
            <p>
              <span className="text-slate-500">Category:</span>{" "}
              <span className="text-sky-300">{categoryTitle}</span>
            </p>
            <p>
              <span className="text-slate-500">Comfort level:</span>{" "}
              <span className="text-emerald-300">{percent}%</span>
            </p>
            <p className="text-slate-400">
              Used in{" "}
              <span className="text-sky-300">
                real projects, experiments, and daily workflows
              </span>{" "}
              as part of my engineering & dev stack.
            </p>
          </div>

          <div className="flex justify-between items-center text-[0.7rem] text-slate-500 mt-2">
            <span>Click for full details</span>
            <span className="text-sky-400">Tap / Click ⟲</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Main SkillsSection:
 * - shows your existing Skills layout
 * - adds one more tab to switch to the CertificationsSection
 */
export default function SkillsSection() {
  const {
    sectionId,
    title,
    description,
    groups = [],
  } = skillsData;

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const activeGroup = groups[activeIndex] || { title: "", skills: [] };

  const openModal = (skill) => {
    setSelectedSkill(skill);
  };

  const closeModal = () => setSelectedSkill(null);

  return (
    <section
      id={sectionId}
      className="min-h-screen relative overflow-hidden font-sans selection:bg-sky-500/30 py-20"
    >
      {/* Background CAD Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(var(--cad-grid)_1px,transparent_1px),linear-gradient(90deg,var(--cad-grid)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-12">
        {/* Engineering Header */}
        <header className="space-y-3 border-l-4 border-sky-500 pl-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-sky-400 font-mono font-bold">
              Technical_Stack_v1.0
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-slate-100">
            Skills <span className="text-sky-500">&amp; Mastery</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl font-medium leading-relaxed">
            {description}
          </p>
        </header>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 pt-2">
          {groups.map((group, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={group.title}
                onClick={() => setActiveIndex(index)}
                className={"px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest border transition-all " +
                  (isActive ? "bg-sky-500 text-slate-950 border-sky-500 shadow-[0_5px_15px_rgba(14,165,233,0.3)]" : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-sky-500/50 hover:text-sky-400")}
              >
                {group.title}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activeGroup.skills.map((skill) => (
            <div
              key={skill.name}
              onClick={() => openModal(skill)}
              className="group relative bg-slate-950/40 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-sky-500/50 transition-all backdrop-blur-sm cursor-pointer"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-slate-800 group-hover:border-sky-500/30 transition-colors" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-500 font-mono text-xs">
                    {skill.name[0]}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded">
                    {skill.level}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-100 uppercase tracking-tight group-hover:text-sky-400 transition-colors">
                    {skill.name}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {(skill.tags || []).map(tag => (
                      <span key={tag} className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-mono font-black uppercase text-sky-500">View Details →</span>
                <div className="flex gap-0.5">
                  <div className="w-1 h-3 bg-sky-500/20" />
                  <div className="w-1 h-3 bg-sky-500/40" />
                  <div className="w-1 h-3 bg-sky-500/60" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl px-4 py-8 overflow-y-auto animate-in fade-in zoom-in duration-300 cursor-pointer"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold font-mono">Component: {selectedSkill.name}</span>
                <p className="text-[8px] font-mono text-slate-700 uppercase">Unit_ID: {activeGroup.title.replace(/\s+/g, '_')}_00X</p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors text-slate-500 hover:text-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6 bg-slate-900/50">
              <header className="space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-sky-500">{selectedSkill.name[0]}</span>
                </div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-slate-100 leading-none">
                  {selectedSkill.name}
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">{selectedSkill.level} Efficiency</span>
                </div>
              </header>

              <div className="space-y-4">
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                  <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">How I use it</p>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {selectedSkill.description || "Used for complex architectural and structural workflows in large-scale projects."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {(selectedSkill.tags || []).map(tag => (
                    <span key={tag} className="text-[9px] font-mono font-bold text-sky-400 bg-sky-400/5 border border-sky-400/20 px-3 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">System_Verified</span>
              </div>
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-lg bg-sky-500 text-slate-950 text-[10px] font-bold uppercase tracking-widest hover:bg-sky-400 transition-all font-mono"
              >
                Close_Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
