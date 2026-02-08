import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import db from "../data/Projects.json";
import { Search, Filter, ChevronRight, LayoutGrid, Terminal, Calendar, User, Code } from "lucide-react";

/**
 * Technical Project Card Component
 */
function ProjectCard({ proj, index }) {
  const navigate = useNavigate();
  const registryId = `PRJ-${proj.category.substring(0, 3).toUpperCase()}-${(index + 1).toString().padStart(2, '0')}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={() => navigate(`/projects/${proj.id}`)}
      className="group relative flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-sky-500/50 transition-all duration-500 shadow-2xl"
    >
      {/* Technical HUD Overlay on Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={proj.images ? proj.images[0] : "/placeholder-project.webp"}
          alt={proj.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
        />

        {/* Scanner Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <motion.div
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-sky-400 to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* HUD Elements */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[9px] font-mono font-black py-0.5 px-2 bg-slate-950/80 text-sky-400 border border-sky-500/30 rounded uppercase tracking-tighter backdrop-blur-sm">
            {proj.year}
          </span>
          <span className="text-[9px] font-mono font-black py-0.5 px-2 bg-slate-950/80 text-emerald-400 border border-emerald-500/30 rounded uppercase tracking-tighter backdrop-blur-sm">
            {proj.category === 'civil' ? 'Infrastructure' : 'Digital'}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-mono font-black text-sky-400/60 transition-colors group-hover:text-sky-400">
            {registryId}
          </span>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col post-content relative">
        {/* Subtle Background Mark */}
        <div className="absolute top-4 right-4 text-4xl font-black text-white/[0.02] select-none pointer-events-none italic">
          #{index + 1}
        </div>

        <div className="mb-3">
          <p className="text-[9px] uppercase tracking-[0.2em] text-sky-400 font-bold mb-1 opacity-70">{proj.type}</p>
          <h3 className="text-xl font-black italic text-slate-100 uppercase tracking-tighter leading-none group-hover:text-sky-400 transition-colors">
            {proj.title}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">{proj.subtitle}</p>
        </div>

        <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed flex-1">
          {proj.summary}
        </p>

        {/* Technical Info Block */}
        <div className="grid grid-cols-2 gap-2 mb-4 py-3 border-y border-slate-900/50">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3 text-slate-600" />
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tight line-clamp-1">{proj.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="w-3 h-3 text-slate-600" />
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tight line-clamp-1">{proj.tech[0]} +{proj.tech.length - 1}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-[10px] font-extrabold text-sky-400/80 uppercase tracking-wider mt-auto pt-1">
          <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
            View Project Dossier <ChevronRight className="w-3 h-3" />
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-sky-500/50 blur-[1px] group-hover:bg-sky-400 group-hover:animate-pulse" />
        </div>
      </div>

      {/* Hover Gradient Border */}
      <div className="absolute inset-0 border border-sky-500/0 group-hover:border-sky-500/20 transition-all duration-500 rounded-2xl pointer-events-none shadow-[inset_0_0_20px_rgba(14,165,233,0)] group-hover:shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]" />
    </motion.article>
  );
}

const CATEGORY_FILTERS = [
  { id: "all", label: "All Projects", icon: LayoutGrid },
  { id: "civil", label: "Civil & BIM", icon: Terminal },
  { id: "web", label: "Web & Digital", icon: Code }
];

export default function Projects() {
  const allProjects = db.projects || [];
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);

  const filteredProjects = useMemo(() => {
    let filtered = allProjects;
    if (activeCategory !== "all") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tech.some(t => t.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [activeCategory, searchQuery, allProjects]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-20 md:px-10 lg:px-24 relative overflow-hidden">
      {/* Background neon elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-20 w-96 h-96 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-10 w-96 h-96 rounded-full bg-fuchsia-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-blueprint opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto relative space-y-12">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sky-400">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-mono font-black uppercase tracking-[0.3em]">Project Database v2.0</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic text-slate-100 uppercase tracking-tighter leading-[0.85]">
              CRAFTING <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">STRUCTURES</span> <br />
              & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">SYSTEMS</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
              Exploring the intersection of <span className="text-sky-300">Civil Engineering</span>,
              <span className="text-emerald-300"> BIM workflows</span>, and modern
              <span className="text-white"> web technology</span>. From 3D infrastructure models to full-stack applications.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-4 pt-3 rounded-2xl backdrop-blur-sm min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Database Stats</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-100">{allProjects.length}</span>
              <span className="text-xs font-mono text-slate-500 uppercase">Deployed Files</span>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
            <input
              type="text"
              placeholder="Search database (Revit, React, BIM...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-sky-300 placeholder:text-slate-600 outline-none focus:border-sky-500/50 focus:bg-slate-900/50 transition-all shadow-inner"
            />
          </div>

          <div className="lg:col-span-8 flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar-on-mobile">
            {CATEGORY_FILTERS.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold border transition-all uppercase tracking-tight
                      ${isActive
                      ? "border-sky-500 bg-sky-500/10 text-sky-50 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                      : "border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div
                layout
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((proj, idx) => (
                  <ProjectCard
                    key={proj.id}
                    proj={proj}
                    index={idx}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Filter className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <p className="text-slate-300 font-bold uppercase tracking-widest italic">No Data Found</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Adjust your filters or search query to find matching projects.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER NOTE */}
        <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-sky-500" /> System Active</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> Data Synchronized</span>
          </div>
          <div>© 2024 PRADUL P · CAD_CORE_DS_V2</div>
        </div>
      </div>
    </main>
  );
}
