// src/components/FeaturedSection.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function FeaturedSection({ projects = [], maxItems = 6 }) {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  /* ---------------- FEATURED SELECTION ---------------- */

  const featured = useMemo(() => {
    const home = projects.filter(p => p.homeFeatured);
    if (home.length) return home.slice(0, maxItems);

    const civil = projects.filter(p => p.category === "civil");
    if (civil.length) return civil.slice(0, maxItems);

    return projects.slice(0, maxItems);
  }, [projects, maxItems]);

  const selected = featured[selectedIndex];

  useEffect(() => {
    if (selectedIndex >= featured.length) setSelectedIndex(0);
  }, [featured, selectedIndex]);

  /* ---------------- HELPERS ---------------- */

  const getModelSrc = (p) =>
    p?.model?.src ? p.model.src : null;

  const getPreviewImage = (p) =>
    p?.images?.[0] || "/placeholder-project.webp";

  const initials = (title = "") =>
    title.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

  /* ---------------- UI ---------------- */

  return (
    <section className="mb-10">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="grid md:grid-cols-12 gap-6">

          {/* LEFT LIST */}
          <aside className="md:col-span-4">
            <div className="text-xs text-slate-400 mb-2">Featured projects</div>

            <div
              ref={listRef}
              className="rounded-md border border-slate-800 bg-slate-900/60 p-2 space-y-3 max-h-[460px] overflow-auto"
            >
              {featured.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedIndex(i)}
                  className={`w-full text-left p-3 rounded-md flex gap-3 transition project-card
                    ${i === selectedIndex
                      ? "border-2 border-sky-500 bg-slate-900/80"
                      : "border border-slate-800 hover:border-slate-700"}`}
                >
                  <div className="w-10 h-10 rounded-md bg-slate-800 flex items-center justify-center text-xs border border-slate-700">
                    {initials(p.title)}
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-100 line-clamp-2">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {p.summary}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Link
              to="/projects"
              className="inline-block mt-3 text-xs text-sky-400 hover:underline"
            >
              See all projects →
            </Link>
          </aside>

          {/* PREVIEW */}
          <div className="md:col-span-8">
            <div className="rounded-md overflow-hidden bg-slate-800 h-[360px] flex items-center justify-center">
              {getModelSrc(selected) ? (
                <model-viewer
                  src={getModelSrc(selected)}
                  camera-controls
                  auto-rotate
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <img
                  src={getPreviewImage(selected)}
                  alt={selected?.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4 rounded-md border border-slate-800 bg-slate-900/60 p-4 max-h-[140px] overflow-auto">
              <h3 className="text-base font-semibold text-slate-100 mb-2">
                {selected?.title}
              </h3>
              <p className="text-sm text-slate-400">
                {selected?.summary}
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                Category: <span className="text-slate-200">{selected?.category}</span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex gap-3">
              {getModelSrc(selected) && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-5 py-2 rounded-full bg-sky-500 text-slate-900 font-medium"
                >
                  View model (enlarge)
                </button>
              )}

              <a
                href={selected?.links?.demo || "/projects"}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full border border-slate-700 text-slate-200 hover:border-sky-400 project-card"
              >
                Open project
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MODEL MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-6xl h-[85vh] bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
            <div className="flex justify-between items-center p-3 border-b border-slate-800">
              <span className="text-slate-100 font-semibold">
                {selected?.title}
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-300"
              >
                ✕
              </button>
            </div>

            <model-viewer
              src={getModelSrc(selected)}
              camera-controls
              auto-rotate
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
