// src/components/FeaturedSection.jsx
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProjectImageCarousel from "./ProjectImageCarousel";
import { fadeInUp } from "../utils/animations";

export default function FeaturedSection({ projects = [], maxItems = 6 }) {
  const containerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  /* ================= FEATURED LIST ================= */

  const featuredList = useMemo(() => {
    // If explicit homeFeatured check
    const home = projects.filter(p => p.homeFeatured);
    if (home.length) return home.slice(0, maxItems);

    // Fallback: civil projects
    const civil = projects.filter(p =>
      String(p.category || "").toLowerCase().includes("civil")
    );
    if (civil.length) return civil.slice(0, maxItems);

    return projects.slice(0, maxItems);
  }, [projects, maxItems]);

  const selected = featuredList[selectedIndex] || null;

  /* ================= MODEL HANDLING ================= */

  const getModelSrc = (project) => {
    if (!project) return null;

    if (project.model && typeof project.model === "object") {
      return project.model.src || null;
    }

    if (typeof project.model === "string") {
      return project.model.startsWith("/")
        ? project.model
        : `/${project.model}`;
    }

    return null;
  };

  const modelSrc = getModelSrc(selected);

  /* ================= IMAGE FALLBACK ================= */

  const hasYoutube =
    selected?.links?.demo &&
    (selected.links.demo.includes("youtube.com") ||
      selected.links.demo.includes("youtu.be"));

  /* ================= UI HELPERS ================= */

  function iconInitials(title = "") {
    if (!title) return "??";
    return title
      .split(" ")
      .slice(0, 2)
      .map(w => w[0])
      .join("")
      .toUpperCase();
  }

  if (!selected) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUp}
      className="mb-10"
    >
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 md:p-6 backdrop-blur-sm shadow-xl">
        <div className="grid md:grid-cols-12 gap-6">

          {/* ================= LEFT LIST ================= */}
          <aside className="md:col-span-4 flex flex-col h-full">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-semibold">Featured Projects</p>

            <div
              ref={containerRef}
              className="flex-1 space-y-2 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar"
            >
              {featuredList.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl flex gap-3 transition-all duration-300 group ${idx === selectedIndex
                      ? "bg-slate-800/80 border-l-4 border-sky-500 shadow-lg"
                      : "hover:bg-slate-800/40 border-l-4 border-transparent"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${idx === selectedIndex ? "bg-sky-500 text-slate-900" : "bg-slate-800 text-slate-400 group-hover:text-slate-200"
                    }`}>
                    {iconInitials(p.title)}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold line-clamp-1 transition-colors ${idx === selectedIndex ? "text-sky-400" : "text-slate-200 group-hover:text-white"
                      }`}>
                      {p.title}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {p.subtitle || p.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 mt-4 text-xs font-medium text-sky-400 hover:text-emerald-400 transition-colors"
            >
              View all projects
              <span className="text-lg">→</span>
            </Link>
          </aside>

          {/* ================= PREVIEW ================= */}
          <div className="md:col-span-8 flex flex-col">
            <div className="relative rounded-2xl bg-slate-950 overflow-hidden border border-slate-800/50 shadow-inner min-h-[300px] flex-1">

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  {/* 3D MODEL OR IMAGE FALLBACK */}
                  {modelSrc ? (
                    <model-viewer
                      src={modelSrc}
                      camera-controls
                      auto-rotate
                      style={{ width: "100%", height: "100%", minHeight: "360px" }}
                    />
                  ) : selected?.images?.length > 0 ? (
                    <ProjectImageCarousel images={selected.images} height="100%" />
                  ) : selected?.image ? (
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="w-full h-full object-cover min-h-[360px]"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[360px] text-slate-400">
                      No preview available
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* OVERLAY GRADIENT */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />

            </div>

            {/* DESCRIPTION */}
            <motion.div
              key={`desc-${selected.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 p-4 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-slate-100 flex items-center justify-between">
                {selected.title}
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {selected.year || "2024"}
                </span>
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {selected.summary || selected.description}
              </p>

              {/* ACTIONS */}
              <div className="mt-4 flex flex-wrap gap-3">
                {modelSrc && (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition"
                  >
                    View 3D Model
                  </button>
                )}

                <Link
                  to={`/projects/${selected.id}`}
                  className="px-4 py-1.5 rounded-full border border-slate-600 hover:border-emerald-400 hover:text-emerald-400 text-slate-300 text-xs font-medium transition"
                >
                  View Details
                </Link>

                {hasYoutube && (
                  <a
                    href={selected.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 rounded-full border border-red-900/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition flex items-center gap-2"
                  >
                    <span>▶</span> YouTube
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= MODEL MODAL ================= */}
      {modalOpen && modelSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setModalOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-5xl h-[80vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-50 px-4 py-2 text-sm border border-slate-600 hover:bg-slate-800 rounded-full bg-slate-900/80 text-white transition"
            >
              ✕ Close
            </button>
            <model-viewer
              src={modelSrc}
              camera-controls
              auto-rotate
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}
