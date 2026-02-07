// src/pages/Blog.jsx
import React, { useState } from "react";
import content from "../data/index";
import localBlog from "../data/blog.json"; // prefer local file
import SectionTitle from "../components/SectionTitle";

const postsFromFile = (localBlog && localBlog.posts) ? localBlog.posts : (content.blogPosts || content.blog || []);

export default function Blog() {
  const blogPosts = postsFromFile;
  const tags = ["All", ...Array.from(new Set(blogPosts.map((p) => p.tag).filter(Boolean)))];

  const [activeTag, setActiveTag] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);

  const filtered = activeTag === "All" ? blogPosts : blogPosts.filter((p) => p.tag === activeTag);

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "2-digit" });
  };

  const statusBadge = (status) => {
    if (status === "published") return <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 text-[11px]">Live</span>;
    if (status === "draft") return <span className="inline-flex items-center rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 text-[11px]">Draft</span>;
    return <span className="inline-flex items-center rounded-full bg-slate-500/10 text-slate-300 border border-slate-500/40 px-2.5 py-0.5 text-[11px]">Coming soon</span>;
  };

  const openModal = (post) => setSelectedPost(post);
  const closeModal = () => setSelectedPost(null);

  return (
    <div className="min-h-screen relative overflow-hidden font-sans selection:bg-sky-500/30">
      {/* Background CAD Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(var(--cad-grid)_1px,transparent_1px),linear-gradient(90deg,var(--cad-grid)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-20 relative z-10 space-y-12">
        {/* Engineering Header */}
        <header className="space-y-3 border-l-4 border-sky-500 pl-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-sky-400 font-mono font-bold">
              Engineering Journal
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-slate-100">
            Insights <span className="text-sky-500">&amp; Ideas</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl font-medium leading-relaxed">
            Short articles and notes around <span className="text-slate-100 font-bold">BIM</span>, <span className="text-sky-400 font-bold">Automation</span>, and <span className="text-emerald-400 font-bold">Engineering Workflows</span>.
          </p>
        </header>

        {/* Filter System */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={"px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest border transition-all " +
                  (isActive ? "bg-sky-500 text-slate-950 border-sky-500 shadow-[0_5px_15px_rgba(14,165,233,0.3)]" : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-sky-500/50 hover:text-sky-400")}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center mx-auto">
              <div className="w-2 h-2 rounded-full bg-slate-700" />
            </div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">No articles found in this category</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="group relative bg-slate-950/40 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-sky-500/50 transition-all backdrop-blur-sm cursor-pointer"
                onClick={() => openModal(post)}
              >
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-slate-800 group-hover:border-sky-500/30 transition-colors" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-widest text-slate-500">
                    <span className="uppercase text-sky-500/80 bg-sky-500/5 px-2 py-0.5 border border-sky-500/10 rounded">
                      {post.tag}
                    </span>
                    <div className="flex items-center gap-2">
                      {post.date && <span>{formatDate(post.date)}</span>}
                      {post.readTime && <span>• {post.readTime}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-lg font-black text-slate-100 italic tracking-tighter leading-tight group-hover:text-sky-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-medium">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black uppercase text-sky-500 group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </span>
                  {statusBadge(post.status)}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl px-4 py-8 overflow-y-auto animate-in fade-in zoom-in duration-300 cursor-pointer"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">Category: {selectedPost.tag}</span>
                <p className="text-[8px] font-mono text-slate-700 uppercase">Document_ID: {selectedPost.id}00X</p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors text-slate-500 hover:text-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh] custom-scrollbar space-y-8 bg-slate-900/50">
              <header className="space-y-4">
                <div className="flex items-center gap-4 text-[11px] font-mono text-sky-400 font-bold uppercase">
                  {selectedPost.date && <span>{formatDate(selectedPost.date)}</span>}
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  {selectedPost.readTime && <span>{selectedPost.readTime} Read</span>}
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  {statusBadge(selectedPost.status)}
                </div>
                <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-slate-100 leading-[1.1]">
                  {selectedPost.title}
                </h2>
              </header>

              <div className="prose prose-invert prose-slate max-w-none">
                <p className="text-base md:text-lg text-slate-300 leading-relaxed font-medium">
                  {selectedPost.content || selectedPost.summary}
                </p>
              </div>

              {selectedPost.url && (
                <div className="pt-6 border-t border-slate-800">
                  <p className="text-[10px] font-mono text-slate-500 uppercase mb-4 tracking-widest">Extended Material Found:</p>
                  <a
                    href={selectedPost.url} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-400 text-slate-950 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20"
                  >
                    Open External Article ↗
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">System_Ready</span>
              </div>
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:border-slate-700 hover:text-slate-100 transition-all font-mono"
              >
                Close_Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
