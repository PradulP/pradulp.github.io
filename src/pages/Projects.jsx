import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import db from "../data/Projects.json";
import SectionTitle from "../components/SectionTitle";

const CATEGORY_FILTERS = [
  { id: "all", label: "All" },
  { id: "civil", label: "Civil & BIM" },
  { id: "web", label: "Web & Digital" }
];

export default function Projects() {
  const navigate = useNavigate();
  const allProjects = db.projects || [];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return allProjects;
    return allProjects.filter(
      (p) => p.category === activeCategory
    );
  }, [activeCategory, allProjects]);

  return (
    <main className="pt-8 md:pt-10 pb-16">
      {/* ================= HEADER ================= */}
      <section className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <SectionTitle>Projects</SectionTitle>

          <div className="flex flex-wrap gap-2 text-xs md:text-sm">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full border transition ${activeCategory === cat.id
                    ? "border-sky-500 text-sky-300 bg-sky-500/10"
                    : "border-slate-700 text-slate-300 hover:border-sky-500/60"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-400 max-w-3xl">
          A mix of{" "}
          <span className="text-slate-200">civil / BIM projects</span> and{" "}
          <span className="text-slate-200">web & digital works</span>.
          Click any project to view full details, images and 3D models.
        </p>
      </section>

      {/* ================= GRID ================= */}
      <section>
        {filteredProjects.length === 0 ? (
          <p className="text-sm text-slate-400">
            No projects available for this category.
          </p>
        ) : (
          <div className="grid gap-4 md:gap-5 md:grid-cols-2">
            {filteredProjects.map((proj) => (
              <article
                key={proj.id}
                onClick={() => navigate(`/projects/${proj.id}`)}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 cursor-pointer transition
                           hover:-translate-y-1 hover:border-sky-500/80 project-card"
              >
                {/* Title + Year */}
                <div className="flex justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm md:text-base text-slate-100">
                    {proj.title}
                  </h3>
                  {proj.year && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">
                      {proj.year}
                    </span>
                  )}
                </div>

                {/* Subtitle */}
                {proj.subtitle && (
                  <p className="text-[11px] text-slate-400 mb-1">
                    {proj.subtitle}
                  </p>
                )}

                {/* Type */}
                {proj.type && (
                  <p className="text-[11px] text-sky-300 mb-2">
                    {proj.type}
                  </p>
                )}

                {/* Summary */}
                <p className="text-xs md:text-sm text-slate-300 line-clamp-3 mb-3">
                  {proj.summary}
                </p>

                {/* Tech stack */}
                {proj.tech && proj.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {proj.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full border border-slate-700 bg-slate-950/60 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="px-2 py-0.5 rounded-full border border-slate-700 bg-slate-950/60 text-slate-400">
                        +{proj.tech.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
