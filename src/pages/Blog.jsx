import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "../components/Typewriter";
import useGoogleCMS from "../hooks/useGoogleCMS";
import SEO from "../components/SEO";
import content from "../data/index";
import localBlog from "../data/blog.json";
import {
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Terminal,
  Cpu,
  LayoutGrid,
  Filter,
  ChevronRight,
  Image as ImageIcon
} from "lucide-react";

// --- TAG IMAGES MAPPING ---
export const tagImages = {
  "Automation": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  "Web Dev": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  "Strategy": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
  "CAD": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
  "BIM": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
  "Career": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  "Cloud": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
};

export const generateSlug = (title) => {
  if (!title) return "";
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

// --- BLOG CARD COMPONENT (Project-Style) ---
function BlogCard({ post, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const formatDate = (iso) => {
    if (!iso) return "---";
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "2-digit" });
  };

  const registryId = `LOG-0${(index + 1).toString().padStart(2, '0')}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      onClick={() => navigate(`/blog/${post.slug || generateSlug(post.title)}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-sky-500/50 transition-all duration-500 shadow-2xl h-[320px]"
    >
      {/* Abstract Cover Area (Image) */}
      <div className="relative h-40 overflow-hidden bg-slate-900/50 border-b border-slate-800/50">
        <img
          src={post.image || tagImages[post.tag] || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        {/* HUD Elements */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[9px] font-mono font-black py-0.5 px-2 bg-slate-950/80 text-sky-400 border border-sky-500/30 rounded uppercase tracking-tighter backdrop-blur-sm flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {formatDate(post.date)}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-mono font-black text-sky-400/60 transition-colors group-hover:text-sky-400">
            {registryId}
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-mono font-bold py-0.5 px-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded uppercase tracking-wider backdrop-blur-sm">
            {post.tag}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col relative justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-black italic text-slate-100 uppercase tracking-tighter leading-none group-hover:text-sky-400 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-slate-900/50 pt-3 mt-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-sky-500" />
            {post.readTime || "5 min"} read
          </span>
          <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-sky-400 font-bold uppercase tracking-wider">
            Read Entry <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Hover Gradient Border Glow */}
      <div className="absolute inset-0 border border-sky-500/0 group-hover:border-sky-500/20 transition-all duration-500 rounded-2xl pointer-events-none shadow-[inset_0_0_20px_rgba(14,165,233,0)] group-hover:shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]" />
    </motion.article>
  );
}

export default function Blog() {
  const { data: cmsPosts } = useGoogleCMS("blog");
  const localPosts = (localBlog && localBlog.posts) ? localBlog.posts : (content.blog || []);

  const blogPosts = useMemo(() => {
    const raw = (Array.isArray(cmsPosts) && cmsPosts.length > 0) ? cmsPosts : localPosts;
    if (!Array.isArray(raw)) return [];
    return raw
      .filter(post => {
        // Show by default unless explicitly set to FALSE properties
        if (post.visible === false) return false;
        if (typeof post.visible === 'string' && post.visible.toLowerCase() === 'false') return false;
        return true;
      })
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [cmsPosts, localPosts]);

  const tags = ["All", ...Array.from(new Set(blogPosts.map((p) => p.tag).filter(Boolean))).sort()];

  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesTag = activeTag === "All" || post.tag === activeTag;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchLower) ||
        post.summary.toLowerCase().includes(searchLower);
      return matchesTag && matchesSearch;
    });
  }, [activeTag, searchQuery, blogPosts]);


  return (
    <section className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden font-sans">
      <SEO title="Blog" description="Engineering Journal: Insights on BIM, Automation, and Tech." />

      {/* Background Neon Elements (Scanning Pattern) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-20 w-96 h-96 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        {/* Blueprint Grid */}
        <div className="absolute inset-0 bg-blueprint opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-24 pt-24 md:pt-32 relative z-10 space-y-12 pb-24">

        {/* HEADER SECTION (Aligned with Project Page Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sky-400">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-mono font-black uppercase tracking-[0.3em]">System Journal v1.0</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic text-slate-100 uppercase tracking-tighter leading-[0.85]">
              ENGINEERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">INSIGHTS</span> <br />
              & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">LOGS</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
              Documenting the bridge between <span className="text-sky-300">Civil Engineering</span> logic and
              <span className="text-emerald-300"> Software Architecture</span>. Automation scripts, site workflows, and rants about IFC.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-4 pt-3 rounded-2xl backdrop-blur-sm min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Journal Status</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-100">{blogPosts.length}</span>
              <span className="text-xs font-mono text-slate-500 uppercase">Entries Logged</span>
            </div>
          </div>
        </div>

        {/* CONTROLS & FILTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Search */}
          <div className="lg:col-span-4 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
            <input
              type="text"
              placeholder="Search logs (Python, Revit, Site...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-sky-300 placeholder:text-slate-600 outline-none focus:border-sky-500/50 focus:bg-slate-900/50 transition-all shadow-inner"
            />
          </div>

          {/* Tags */}
          <div className="lg:col-span-8 flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar-on-mobile">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold border transition-all uppercase tracking-tight
                    ${activeTag === tag
                    ? "border-sky-500 bg-sky-500/10 text-sky-50 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                    : "border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
              >
                <Cpu className={`w-4 h-4 ${activeTag === tag ? 'text-sky-400' : 'text-slate-500'}`} />
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 3D GRID */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, idx) => (
                  <BlogCard
                    key={post.id}
                    post={post}
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
                  <p className="text-slate-300 font-bold uppercase tracking-widest italic">Signal Lost</p>
                  <p className="text-xs text-slate-500 mt-1">No log entries found matching criteria.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
