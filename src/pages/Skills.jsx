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
    eyebrow,
    title,
    description,
    badges,
    groups = [],
    note,
  } = skillsData;

  // Which skill category is active (Civil / BIM, Web, etc.)
  const [activeIndex, setActiveIndex] = useState(0);
  // Which top view is active: "skills" or "certs"
  const [activeView, setActiveView] = useState("skills");
  // Which skill is selected for the modal
  const [selectedSkill, setSelectedSkill] = useState(null);

  const activeGroup = groups[activeIndex] || { title: "", skills: [] };

  const handleCardClick = (skill, categoryTitle) => {
    const percent = levelToPercent(skill.level);
    const usage = getSkillUsage(skill.name, categoryTitle);

    setSelectedSkill({
      ...skill,
      categoryTitle,
      percent,
      usage,
    });
  };

  const closeModal = () => setSelectedSkill(null);

  return (
    <section
      id={sectionId}
      className="min-h-screen w-full bg-slate-950 text-slate-50 px-4 py-16 md:px-10 lg:px-24 relative overflow-hidden"
    >
      {/* Background neon glow */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-40 -left-20 w-72 h-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-10 w-72 h-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative space-y-10">
        {/* ================= HEADER (same look as your screenshot) ================= */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Left: eyebrow, title, description */}
          <div>
            {eyebrow && (
              <p className="text-sm uppercase tracking-[0.25em] text-sky-400">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-semibold mt-2">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm md:text-base text-slate-400 mt-3 max-w-xl">
                {description}
              </p>
            )}
          </div>

          {/* Right: badges (Junior Engineer, Licensed Civil, etc.) */}
          {badges && badges.length > 0 && (
            <div className="inline-flex flex-wrap gap-2 text-xs md:text-sm justify-start md:justify-end">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/70 text-slate-100 shadow-[0_0_18px_rgba(56,189,248,0.25)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ================= TOP TABS (centered under header)  ================= */}
        {/* <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 p-1 text-xs md:text-sm">
            <button
              onClick={() => setActiveView("skills")}
              className={`px-3 md:px-4 py-1.5 rounded-full transition-all ${
                activeView === "skills"
                  ? "bg-sky-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                  : "text-slate-300 hover:text-sky-300"
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveView("certs")}
              className={`px-3 md:px-4 py-1.5 rounded-full transition-all ${
                activeView === "certs"
                  ? "bg-sky-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                  : "text-slate-300 hover:text-sky-300"
              }`}
            >
              Certifications & Achievements
            </button>
          </div>
        </div> */}

        {/* ================= VIEW: SKILLS ================= */}
        {activeView === "skills" && (
          <>
            {/* Category tabs (Civil / BIM, Revit Automation, etc.) */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3 md:px-4 md:py-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Skill Categories
                </p>
                {activeGroup.title && (
                  <p className="text-xs text-slate-400">
                    Active:{" "}
                    <span className="text-sky-300 font-medium">
                      {activeGroup.title}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {groups.map((group, index) => (
                  <button
                    key={group.title}
                    onClick={() => setActiveIndex(index)}
                    className={`px-3 py-2 rounded-xl text-xs md:text-sm border transition-all whitespace-nowrap flex items-center gap-2
                      ${
                        index === activeIndex
                          ? "border-sky-500 bg-sky-500/20 text-sky-50 shadow-[0_0_25px_rgba(56,189,248,0.45)]"
                          : "border-slate-800 bg-slate-900/80 text-slate-300 hover:border-sky-500/60 hover:bg-slate-900"
                      }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.75)]" />
                    <span>{group.title}</span>
                    {group.skills && (
                      <span className="text-[0.65rem] text-slate-400">
                        {group.skills.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill cards grid */}
            <div className="grid gap-5 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {activeGroup.skills && activeGroup.skills.length > 0 ? (
                activeGroup.skills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    categoryTitle={activeGroup.title}
                    onClick={() => handleCardClick(skill, activeGroup.title)}
                  />
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No skills defined in this category yet. Add them in{" "}
                  <code className="text-sky-400 text-xs bg-slate-900 px-1.5 py-0.5 rounded">
                    skills.json
                  </code>
                  .
                </p>
              )}
            </div>

            {note && <p className="text-xs text-slate-500">* {note}</p>}
          </>
        )}

        {/* ================= VIEW: CERTIFICATIONS TAB ================= */}
      {/*  {activeView === "certs" && (
          <div className="mt-4">
            {/* This component reads from certifications.json and has its own cards + modal */}
           {/* <CertificationsSection />
          </div>
        )}*/}
      </div>

      {/* ================= MODAL: SKILL DETAILS ================= */}
      {selectedSkill && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
          {/* overlay */}
          <button
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative z-50 w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950/95 p-6 shadow-[0_0_40px_rgba(56,189,248,0.5)]">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sky-400">
                  Skill Details
                </p>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-50 mt-1 break-words">
                  {selectedSkill.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedSkill.categoryTitle} ·{" "}
                  <span className="text-emerald-300">
                    {selectedSkill.percent}%
                  </span>{" "}
                  comfort
                </p>
              </div>

              <button
                onClick={closeModal}
                className="px-2.5 py-1 rounded-full text-xs border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-200"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSkill.level && (
                <span className="px-3 py-1 rounded-full text-[0.7rem] uppercase tracking-wide border border-sky-500/70 bg-sky-500/10 text-sky-100">
                  {selectedSkill.level}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-[0.7rem] uppercase tracking-wide border border-emerald-500/60 bg-emerald-500/10 text-emerald-100">
                {selectedSkill.categoryTitle}
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
                  Where this is used
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedSkill.usage.map((u, idx) => (
                    <li key={idx}>{u}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-3">
                <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
                  How it fits your profile
                </h4>
                <p className="text-xs text-slate-400">
                  Part of your stack as a{" "}
                  <span className="text-sky-300">
                    civil engineer, BIM modeler and web-tech enthusiast
                  </span>
                  , helping you connect on-site work, digital modeling and
                  automation.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-1.5 rounded-full text-xs border border-sky-500/80 bg-sky-500/10 text-sky-100 hover:bg-sky-500/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
