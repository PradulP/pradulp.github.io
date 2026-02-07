import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import content from "../data/index";
import SectionTitle from "../components/SectionTitle";


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

  // Sync tab with URL path if user comes to /education directly
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
    <main className="pt-8 md:pt-10 pb-16 px-4 md:px-0">
      {/* Header + tab buttons */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <SectionTitle>
            {tab === "experience" ? "Experience" : "Education"} Timeline
          </SectionTitle>

          <div className="flex gap-2 text-xs md:text-sm bg-slate-900/50 p-1 rounded-full border border-slate-800 w-fit">
            <button
              type="button"
              onClick={() => setTab("experience")}
              className={`px-4 py-1.5 rounded-full transition-all ${tab === "experience"
                ? "bg-sky-500 text-slate-950 font-semibold shadow-lg shadow-sky-500/20"
                : "text-slate-400 hover:text-slate-200"
                }`}
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => setTab("education")}
              className={`px-4 py-1.5 rounded-full transition-all ${tab === "education"
                ? "bg-sky-500 text-slate-950 font-semibold shadow-lg shadow-sky-500/20"
                : "text-slate-400 hover:text-slate-200"
                }`}
            >
              Education
            </button>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-400 max-w-3xl">
          A timeline view from{" "}
          <span className="text-slate-200">present to past</span>, showing my{" "}
          {tab === "experience"
            ? "roles, internships and practical exposure."
            : "academic path and related milestones."}
        </p>
      </section>

      {/* Desktop timeline (2 in a row with center line) */}
      <section className="hidden md:block">
        <DesktopTimeline items={items} />
      </section>

      {/* Mobile simple timeline */}
      <section className="md:hidden">
        <MobileTimeline items={items} />
      </section>
    </main>
  );
}

/* ================= DESKTOP TIMELINE ================= */

function DesktopTimeline({ items }) {
  if (!items.length) {
    return (
      <p className="text-sm text-slate-400">
        Timeline data will be added here soon.
      </p>
    );
  }

  return (
    <div className="space-y-0 relative py-8">
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />

      {items.map((item, index) => {
        const isLeft = index % 2 === 0; // alternate L/R

        return (
          <div
            key={index}
            className={`relative flex items-center justify-between mb-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
          >
            {/* Content Card */}
            <div className={`w-[45%] ${isLeft ? "pr-8 text-right" : "pl-8 text-left"}`}>
              <TimelineCard item={item} align={isLeft ? "right" : "left"} />
            </div>

            {/* Center Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-sky-500 z-10 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />

            {/* Empty space for the other side */}
            <div className="w-[45%]" />
          </div>
        );
      })}
    </div>
  );
}

/* ================= MOBILE TIMELINE ================= */

function MobileTimeline({ items }) {
  if (!items.length) {
    return (
      <p className="text-sm text-slate-400">
        Timeline data will be added here soon.
      </p>
    );
  }

  return (
    <div className="relative border-l border-slate-800 pl-6 space-y-8">
      {items.map((item, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-[29px] top-1">
            <div className="w-3 h-3 rounded-full bg-slate-950 border-2 border-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
          </div>
          <TimelineCard item={item} align="left" />
        </div>
      ))}
    </div>
  );
}

/* ================= CARD COMPONENTS ================= */

function TimelineCard({ item, align }) {
  return (
    <div
      className={`relative group transition-all duration-300 hover:scale-[1.01]`}
    >
      <div className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-5 
        hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/5 backdrop-blur-sm
        ${align === "right" ? "ml-auto" : "mr-auto"}`}
      >
        <TimelineCardInner item={item} />
      </div>
    </div>
  );
}

function TimelineCardInner({ item }) {
  const period = item.period || item.years || "";
  const title = item.role || item.degree || item.title || "";
  const place =
    item.company || item.place || item.location || item.position || "";

  return (
    <>
      <div className="flex flex-col gap-1 mb-2">
        {period && (
          <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
            {period}
          </span>
        )}
        <h4 className="text-base md:text-lg font-bold text-slate-100 leading-tight">
          {title}
        </h4>
        {place && (
          <p className="text-xs md:text-sm font-medium text-slate-400">
            {place}
          </p>
        )}
      </div>

      {/* EXPERIENCE POINTS */}
      {Array.isArray(item.points) && item.points.length > 0 && (
        <ul className="list-disc list-inside space-y-1.5 mt-3 text-xs md:text-sm text-slate-300 leading-relaxed marker:text-slate-600">
          {item.points.slice(0, 4).map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      )}

      {/* EDUCATION DESCRIPTION */}
      {item.description && (
        <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
          {item.description}
        </p>
      )}

      {/* EDUCATION HIGHLIGHTS */}
      {Array.isArray(item.highlights) && item.highlights.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.highlights.map((h, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300">
              {h}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
