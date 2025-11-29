import { useState, useMemo } from "react";
import db from "../data/database.json";
import SectionTitle from "../components/SectionTitle";

const CATEGORY_FILTERS = [
  { id: "all", label: "All" },
  { id: "civil", label: "Civil & BIM" },
  { id: "web", label: "Web & Digital" }
];

export default function Projects() {
  const allProjects = db.projects || [];
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return allProjects;
    return allProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory, allProjects]);

  return (
    <main className="pt-8 md:pt-10 pb-16">
      {/* Header */}
      <section className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <SectionTitle>Projects</SectionTitle>
          <div className="flex flex-wrap gap-2 text-xs md:text-sm">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full border transition ${
                  activeCategory === cat.id
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
          <span className="text-slate-200">civil/BIM projects</span> and{" "}
          <span className="text-slate-200">web & digital works</span>. This list
          will gradually include more experiments, tools and automation ideas as
          I build them.
        </p>
      </section>

      {/* Grid */}
      <section className="mb-10">
        {filteredProjects.length === 0 ? (
          <p className="text-sm text-slate-400">
            No projects yet for this filter. I&apos;ll add more soon.
          </p>
        ) : (
          <div className="grid gap-4 md:gap-5 md:grid-cols-2">
            {filteredProjects.map((proj) => (
              <article
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 cursor-pointer transition-transform hover:-translate-y-1 hover:border-sky-500/80"
              >
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
                {proj.subtitle && (
                  <p className="text-[11px] text-slate-400 mb-1">
                    {proj.subtitle}
                  </p>
                )}
                {proj.type && (
                  <p className="text-[11px] text-sky-300 mb-2">{proj.type}</p>
                )}
                <p className="text-xs md:text-sm text-slate-300 line-clamp-3 mb-3">
                  {proj.summary}
                </p>
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

      {/* Details modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </main>
  );
}

/* =============== MODAL COMPONENT =============== */

function ProjectModal({ project, onClose }) {
  const { title, subtitle, type, year, role, summary, tech, highlights, links } =
    project;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4 py-6 bg-slate-950/80 backdrop-blur-sm">
      <div className="max-w-3xl w-full rounded-3xl border border-slate-800 bg-slate-900 p-5 md:p-6 relative">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-3 text-slate-400 hover:text-slate-100 text-lg"
          aria-label="Close"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-1">
            Project
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-slate-100 mb-1">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs md:text-sm text-slate-300 mb-1">
              {subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-300 mt-1">
            {type && (
              <span className="px-2 py-0.5 rounded-full border border-sky-500/60 text-sky-300">
                {type}
              </span>
            )}
            {year && (
              <span className="px-2 py-0.5 rounded-full border border-slate-700">
                {year}
              </span>
            )}
            {role && (
              <span className="px-2 py-0.5 rounded-full border border-emerald-500/60 text-emerald-300">
                {role}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="space-y-3 text-xs md:text-sm text-slate-300">
          {summary && <p>{summary}</p>}

          {highlights && highlights.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">
                Key highlights
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {tech && tech.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">
                Tools &amp; stack
              </h3>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full border border-slate-700 bg-slate-950/70 text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {links && (links.demo || links.repo || links.extra) && (
            <div className="pt-2">
              <h3 className="font-semibold text-slate-100 mb-1">
                Links
              </h3>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {links.demo && (
                  <a
                    href={links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full border border-sky-500/70 text-sky-300 hover:bg-sky-500/10"
                  >
                    View demo
                  </a>
                )}
                {links.repo && (
                  <a
                    href={links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full border border-slate-700 text-slate-300 hover:border-slate-500"
                  >
                    View code
                  </a>
                )}
                {links.extra && (
                  <a
                    href={links.extra}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full border border-slate-700 text-slate-300 hover:border-slate-500"
                  >
                    More
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
