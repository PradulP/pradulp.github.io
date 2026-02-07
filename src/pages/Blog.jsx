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
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-400">Writing & Notes</p>
          <h1 className="text-3xl md:text-4xl font-semibold">Blog <span className="text-sky-400">&amp; Ideas</span></h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl">Short articles and notes around BIM, automation, civil engineering and web tools. Some are published; some are drafts.</p>
        </header>

        <div className="flex flex-wrap gap-2 text-xs">
          {tags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button key={tag} onClick={() => setActiveTag(tag)} className={"rounded-full px-3 py-1 border text-xs transition " + (isActive ? "bg-sky-500 text-slate-950 border-sky-500" : "bg-slate-950/60 border-slate-700 text-slate-200 hover:border-sky-500/70")}>
                {tag}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-slate-400">No posts yet in this category. Check back soon.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((post) => (
              <article key={post.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-sky-500/40 hover:-translate-y-0.5 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 text-[11px] text-slate-400">
                    <span>{post.tag}</span>
                    <div className="flex items-center gap-2">
                      {post.date && <span>{formatDate(post.date)}</span>}
                      {post.readTime && <span>• {post.readTime}</span>}
                      {statusBadge(post.status)}
                    </div>
                  </div>

                  <h2 className="text-base md:text-lg font-semibold">{post.title}</h2>
                  <p className="text-xs md:text-sm text-slate-300 line-clamp-3">{post.summary}</p>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <button onClick={() => openModal(post)} className="text-sky-400 hover:underline">Read here →</button>
                  {post.url ? <span className="text-[11px] text-slate-500">External article</span> : <span className="text-[11px] text-slate-500">—</span>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-2xl w-full p-5 md:p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="space-y-1">
                <p className="text-[11px] text-slate-400 uppercase tracking-[0.18em]">{selectedPost.tag}</p>
                <h2 className="text-lg md:text-xl font-semibold">{selectedPost.title}</h2>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  {selectedPost.date && <span>{formatDate(selectedPost.date)}</span>}
                  {selectedPost.readTime && <span>• {selectedPost.readTime}</span>}
                  {selectedPost.status && <span className="ml-1">{statusBadge(selectedPost.status)}</span>}
                </div>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-100 text-sm px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-700">✕</button>
            </div>

            <div className="mt-3 space-y-3 text-sm text-slate-200 max-h-72 overflow-y-auto pr-1">
              <p>{selectedPost.content || selectedPost.summary || "No content yet."}</p>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex gap-3">
                <button onClick={closeModal} className="px-4 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-sky-500/70 transition">Close</button>
                {selectedPost.url && <a href={selectedPost.url} target="_blank" rel="noreferrer" className="px-4 py-1.5 rounded-lg bg-sky-500 text-slate-950 font-medium hover:bg-sky-400 transition">Open full article ↗</a>}
              </div>

              {selectedPost.url && <p className="text-[11px] text-slate-400">Opens in a new tab.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
