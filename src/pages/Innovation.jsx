import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import content from "../data/index";
import Typewriter from "../components/Typewriter";
import useGoogleCMS from "../hooks/useGoogleCMS";
import SEO from "../components/SEO";
import db from "../data/innovation.json";
import { ChevronRight, Database, Terminal, Atom, Cpu, Globe } from "lucide-react";

// --- TYPE IMAGES MAPPING ---
export const typeImages = {
  "LISP": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800&auto=format&fit=crop",
  "pyRevit / IronPython": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
  "Web Utility / Animation": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  "Web Application": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
  "Engineering Logic": "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop"
};

export const getDefaultImage = (type) => {
  if (!type) return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop";
  return typeImages[type.trim()] || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop";
};

export const generateSlug = (title) => {
  if (!title) return "";
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

// --- INNOVATION CARD COMPONENT ---
const InnovationCard = ({ item, index }) => {
  const navigate = useNavigate();
  const statusColor = (status) => {
    if (!status) return "border-slate-700 text-slate-400";
    const s = status.toLowerCase();
    if (s.includes("live")) return "border-emerald-500/50 text-emerald-400 bg-emerald-500/5 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
    if (s.includes("progress")) return "border-sky-500/50 text-sky-400 bg-sky-500/5";
    return "border-slate-700 text-slate-400 bg-slate-900/50";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/innovation/${item.slug || generateSlug(item.title)}`)}
      className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all duration-300 cursor-pointer overflow-hidden h-[280px] flex flex-col justify-between"
    >
      {/* Background Image Cover */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img src={item.image || item.glimpse || getDefaultImage(item.type)} alt={item.title} className="w-full h-full object-cover opacity-10 group-hover:opacity-30 transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/50" />
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className={`px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded border ${statusColor(item.status)}`}>
              {item.status}
            </span>
            <span className="text-slate-600 group-hover:text-purple-400 transition-colors">
              <Database className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 uppercase tracking-tight group-hover:text-purple-300 transition-colors mb-2 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider group-hover:text-purple-400 transition-colors">
          <span>Read_System_Docs</span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
};

export default function Innovation() {
  const { data: cmsInnovationItems } = useGoogleCMS("innovation");
  const { innovation } = content;

  const items = useMemo(() => {
    // 1. Get Local Items (Single Source of Truth for ID 5 & Slugs)
    const localItems = (db.items && db.items.length > 0) ? db.items : (innovation || []);

    // 2. Initialize Map with Local Items
    const itemMap = new Map();
    localItems.forEach(item => {
      // Ensure ID is string for consistent key lookup
      itemMap.set(String(item.id), { ...item, source: 'local' });
    });

    // 3. Merge CMS Items (Override only if ID matches, else add new)
    if (cmsInnovationItems && Array.isArray(cmsInnovationItems)) {
      cmsInnovationItems.forEach(cmsItem => {
        const idKey = String(cmsItem.id);
        const existing = itemMap.get(idKey);

        if (existing) {
          // Merge: CMS wins for content, but keep local structural fields (slug, glimpse, type) if missing in CMS
          itemMap.set(idKey, {
            ...existing,
            ...cmsItem,
            slug: cmsItem.slug || existing.slug, // Prefer CMS slug if present, else local
            glimpse: cmsItem.glimpse || existing.glimpse,
            source: 'merged'
          });
        } else {
          // New pure CMS item
          itemMap.set(idKey, { ...cmsItem, source: 'cms' });
        }
      });
    }

    // 4. Convert back to array
    let merged = Array.from(itemMap.values());

    // 5. Explicitly Force ID 5 if somehow missing (Safety Net)
    const hasEngine = merged.some(i => String(i.id) === "5");
    if (!hasEngine) {
      const engineItem = localItems.find(i => String(i.id) === "5");
      if (engineItem) merged.push(engineItem);
    }

    // 6. Filter & Format
    return merged
      .filter(item => {
        // ALWAYS SHOW ID 5 (AEC Calculation Engine)
        if (String(item.id) === "5") return true;

        // Standard visibility check
        if (item.visible === false) return false;
        if (typeof item.visible === 'string' && item.visible.toLowerCase() === 'false') return false;

        return true;
      })
      .map(item => ({
        ...item,
        tech: Array.isArray(item.tech) ? item.tech : (typeof item.tech === 'string' ? item.tech.split('|') : [])
      }))
      .sort((a, b) => Number(a.id) - Number(b.id)); // Maintain order 1,2,3,4,5
  }, [cmsInnovationItems, innovation]);

  const [showTitle, setShowTitle] = useState(false);
  const [showSub, setShowSub] = useState(false);

  return (
    <section className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30 pb-20 overflow-hidden relative">
      <SEO title="Innovation Lab" description="Showcasing experimental projects, prototypes, and R&D." />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(var(--cad-grid)_1px,transparent_1px),linear-gradient(90deg,var(--cad-grid)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-24 pt-24 md:pt-32 relative z-10 space-y-16">

        {/* HEADER */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest md:tracking-[0.3em] text-purple-400 break-words max-w-full">
              Engineering_R&D_Division
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black italic text-slate-100 uppercase tracking-tighter leading-none break-words max-w-full mb-2">
            <Typewriter text="Innovation" delay={100} speed={80} onComplete={() => setShowTitle(true)} />
            <br />
            {showTitle && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
                <Typewriter text="Laboratory" speed={80} onComplete={() => setShowSub(true)} />
              </span>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showSub ? 1 : 0, y: showSub ? 0 : 10 }}
            transition={{ duration: 0.5 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl font-medium leading-relaxed border-l-2 border-slate-800 pl-4"
          >
            Proprietary engineering tools, automation scripts, and web-based utilities designed to solve real-world AEC challenges. Access to source code is restricted to authorized partners.
          </motion.p>
        </header>

        {/* SYSTEM GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {items.map((item, idx) => (
              <InnovationCard key={item.id} item={item} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {/* FUTURE VISION CARDS (Static) */}
        <section className="grid gap-6 md:grid-cols-2 pt-12 border-t border-slate-900/50">
          <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900/20 p-8 group">
            <div className="absolute top-0 right-0 p-4 opacity-50"><Cpu className="w-12 h-12 text-sky-500/20" /></div>
            <div className="relative z-10 space-y-4">
              <span className="px-2 py-1 rounded bg-sky-500/10 text-sky-400 text-[9px] font-mono font-bold uppercase tracking-widest border border-sky-500/20">Future Vision</span>
              <h3 className="text-xl font-bold text-slate-100 uppercase italic">AI Standards Assistant</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Developing a Generative AI engine trained on NBC & IS Codes to provide instant compliance checks for architects.</p>
              <button disabled className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-0.5 cursor-not-allowed">Classified / In Development</button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-900/20 p-8 group">
            <div className="absolute top-0 right-0 p-4 opacity-50"><Globe className="w-12 h-12 text-emerald-500/20" /></div>
            <div className="relative z-10 space-y-4">
              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold uppercase tracking-widest border border-emerald-500/20">Sustainability</span>
              <h3 className="text-xl font-bold text-slate-100 uppercase italic">Eco-BIM Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Integrated lifecycle assessment tool for immediate carbon footprint analysis during design phase.</p>
              <button disabled className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-0.5 cursor-not-allowed">Classified / In Development</button>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}
