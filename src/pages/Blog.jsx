// src/pages/Blog.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "../components/Typewriter";
import content from "../data/index";
import localBlog from "../data/blog.json";
import {
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Search,
  Volume2,
  StopCircle,
  X,
  Terminal,
  Cpu
} from "lucide-react";

const postsFromFile = (localBlog && localBlog.posts) ? localBlog.posts : (content.blogPosts || []);

// --- 3D FLIP CARD COMPONENT (Reusing Skills Logic) ---
function BlogCard({ post, onClick, index }) {
  const [hovered, setHovered] = useState(false);

  const formatDate = (iso) => {
    if (!iso) return "---";
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "2-digit" });
  };

  return (
    <motion.div
      className="relative w-full h-[320px] cursor-pointer group perspective-[1500px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500"
        animate={{ rotateY: hovered ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* --- FRONT SIDE --- */}
        <div
          className="absolute inset-0 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <FileText className="w-24 h-24 rotate-12" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-widest border border-sky-500/20">
                {post.tag}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-slate-100 italic tracking-tighter uppercase leading-[0.9] mb-4 line-clamp-3">
              {post.title}
            </h3>

            <div className="w-12 h-1 bg-sky-500 rounded-full" />
          </div>

          <div className="relative z-10 border-t border-slate-800 pt-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-sky-500" /> {post.readTime || "5 min"}
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sky-400 uppercase font-bold tracking-widest text-[9px]">
              Flip for Details
            </span>
          </div>
        </div>

        {/* --- BACK SIDE --- */}
        <div
          className="absolute inset-0 bg-slate-900 border border-sky-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(14,165,233,0.15)] backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-10">
            <motion.div
              className="w-full h-1/2 bg-gradient-to-b from-transparent via-sky-500 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-sky-400 font-bold">
                Brief_Summary
              </h4>
              <Cpu className="w-4 h-4 text-sky-500 opacity-50" />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                {post.summary}
              </p>
            </div>

            <button
              className="mt-4 w-full py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-sky-500/20 transition-all"
            >
              Read Full Article <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- MAIN BLOG PAGE ---
export default function Blog() {
  const blogPosts = postsFromFile;
  const tags = ["All", ...Array.from(new Set(blogPosts.map((p) => p.tag).filter(Boolean))).sort()];

  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  // TTS State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef(null);

  // Filters
  const filtered = blogPosts.filter((post) => {
    const matchesTag = activeTag === "All" || post.tag === activeTag;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchLower) ||
      post.summary.toLowerCase().includes(searchLower);
    return matchesTag && matchesSearch;
  });

  const openModal = (post) => setSelectedPost(post);
  const closeModal = () => {
    stopReading();
    setSelectedPost(null);
  };

  const handleReadAloud = (text) => {
    if (isSpeaking) stopReading();
    else startReading(text);
  };

  const startReading = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopReading = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => () => stopReading(), []);

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans selection:bg-sky-500/30 pb-20 bg-slate-950">

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 relative z-10 space-y-12">

        {/* NEW HEADER STYLE (Clean, Technical, Static) */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500 font-bold flex items-center gap-2">
              <Terminal className="w-3 h-3" /> ENGINEERING JOURNAL
            </p>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-400 animate-gradient-x pb-2">
              <Typewriter text="INSIGHTS & IDEAS" speed={50} />
            </h1>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              Short articles and notes around <span className="text-slate-100 font-bold">BIM</span>, <span className="text-sky-400 font-bold">Automation</span>, and <span className="text-emerald-400 font-bold">Engineering Workflows</span>.
            </p>
          </div>

          {/* Stats Badge */}
          <div className="hidden md:block">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Total Entries</p>
                <p className="text-xl font-black text-sky-400 leading-none">{blogPosts.length}</p>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                <FileText className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* CONTROLS */}
        <div className="space-y-6">
          {/* Filtering Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border
                   ${activeTag === tag
                    ? "bg-sky-600 text-white border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all outline-none"
            />
          </div>
        </div>

        {/* 3D GRID */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center border p-8 rounded-2xl border-dashed border-slate-800 bg-slate-900/30">
            <p className="text-slate-500 font-mono text-sm">Target Data Not Found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((post, idx) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={idx}
                  onClick={() => openModal(post)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* READER MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-slate-950/90 backdrop-blur-xl overflow-y-auto"
            onClick={closeModal}
          >
            <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900 sticky top-0 z-20 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-2">
                      <span className="text-sky-400 font-bold uppercase">{selectedPost.tag}</span>
                      <span>//</span>
                      <span>{formatDate(selectedPost.date)}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-100 uppercase italic tracking-tighter max-w-2xl leading-none">
                      {selectedPost.title}
                    </h2>
                  </div>
                  <button onClick={closeModal} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-slate-400 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-8 md:p-12 bg-slate-950 space-y-8 overflow-y-auto max-h-[70vh]">
                  {/* Toolbar */}
                  <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
                    <button
                      onClick={() => handleReadAloud(selectedPost.content || selectedPost.summary)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border
                             ${isSpeaking
                          ? "bg-red-500/10 border-red-500/30 text-red-500"
                          : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
                        }`}
                    >
                      {isSpeaking ? <StopCircle className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                      {isSpeaking ? "Stop Audio" : "Listen Article"}
                    </button>
                  </div>

                  <article className="prose prose-invert prose-lg max-w-none text-slate-300">
                    <p className="whitespace-pre-line leading-loose">
                      {selectedPost.content || selectedPost.summary}
                    </p>
                  </article>

                  {selectedPost.url && (
                    <div className="pt-8 border-t border-slate-800">
                      <a href={selectedPost.url} target="_blank" className="text-sky-500 hover:text-sky-400 font-bold flex items-center gap-2">
                        Read Original Source <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
