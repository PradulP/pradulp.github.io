import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import db from "../data/blog.json";
import content from "../data/index";
import useGoogleCMS from "../hooks/useGoogleCMS";
import SEO from "../components/SEO";
import {
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Terminal,
    Calendar,
    Clock,
    Volume2,
    StopCircle,
    FileText,
    User,
    Share2,
    Bookmark
} from "lucide-react";
import { tagImages, generateSlug } from "./Blog";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();

    // Scroll Progress Bar
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // Data Fetching
    const { data: cmsPosts } = useGoogleCMS("blog");
    const posts = useMemo(() => {
        if (cmsPosts && cmsPosts.length > 0) return cmsPosts;
        // Combine local DB and content.blog if structure matches, prioritize db.posts
        return (db.posts && db.posts.length > 0) ? db.posts : (content.blog || []);
    }, [cmsPosts]);

    const index = useMemo(
        () => posts.findIndex(p => (p.slug === id) || (String(p.id) === String(id)) || (generateSlug(p.title) === id)),
        [posts, id]
    );

    const post = posts[index];
    const prevPost = posts[index - 1];
    const nextPost = posts[index + 1];

    // TTS State
    const [isSpeaking, setIsSpeaking] = useState(false);
    const speechRef = useRef(null);

    const handleReadAloud = (text) => {
        if (isSpeaking) {
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            if (!("speechSynthesis" in window)) return;
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US";
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            speechRef.current = utterance;
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    useEffect(() => {
        return () => {
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        };
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
                <div className="text-center">
                    <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h2 className="text-xl font-mono mb-4">404: ENTRY NOT FOUND</h2>
                    <Link to="/blog" className="text-sky-400 hover:text-sky-300 underline">
                        Return to Database
                    </Link>
                </div>
            </div>
        );
    }

    const formatDate = (iso) => {
        if (!iso) return "---";
        const d = new Date(iso);
        return d.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
            <SEO title={post.title} description={post.summary} />

            {/* Scroll Progress Bar at Top */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{ y: backgroundY }}
                >
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-500/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[150px] rounded-full" />
                </motion.div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">
                {/* Navigation Breadcrumb */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-sky-400 mb-8 uppercase tracking-widest transition-colors group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Journal
                </Link>

                {/* Header Section */}
                <motion.header
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="space-y-6 mb-12 border-b border-slate-800 pb-12"
                >
                    {/* Featured Image */}
                    <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 relative border border-slate-800">
                        <img
                            src={post.image || tagImages[post.tag] || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                        <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase font-black tracking-widest">
                            {post.tag}
                        </span>
                        <span className="flex items-center gap-2 text-slate-400">
                            <Calendar className="w-4 h-4" /> {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-2 text-slate-400">
                            <Clock className="w-4 h-4" /> {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-slate-100 uppercase tracking-tighter leading-[0.9]">
                        {post.title}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl font-medium border-l-4 border-emerald-500 pl-6 italic">
                        {post.summary}
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            onClick={() => handleReadAloud(post.content || post.summary)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border
                ${isSpeaking
                                    ? "bg-red-500/10 border-red-500/30 text-red-500 animate-pulse"
                                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-sky-500"
                                }`}
                        >
                            {isSpeaking ? <StopCircle className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            {isSpeaking ? "Stop Audio" : "Listen Article"}
                        </button>
                        <button
                            onClick={() => {
                                navigator.share ? navigator.share({ title: post.title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href);
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-500 transition-all"
                        >
                            <Share2 className="w-4 h-4" /> Share
                        </button>
                    </div>
                </motion.header>

                {/* Content Body */}
                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="prose prose-invert prose-lg max-w-none text-slate-300 mb-20"
                >
                    {post.content ? (
                        <div className="whitespace-pre-line leading-loose text-lg font-light space-y-6">
                            {post.content}
                        </div>
                    ) : (
                        <p className="text-slate-500 italic">[Content not available for preview]</p>
                    )}

                    {post.url && (
                        <div className="mt-12 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Ref Source</h4>
                            <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-bold text-lg">
                                Read Original Documentation <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    )}
                </motion.article>

                {/* Footer / Next-Prev */}
                <div className="border-t border-slate-800 pt-12 flex flex-col md:flex-row justify-between gap-6">
                    {prevPost ? (
                        <Link to={`/blog/${prevPost.slug || generateSlug(prevPost.title)}`} className="group text-left">
                            <span className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1 mb-1 group-hover:text-sky-400 transition-colors">
                                <ChevronLeft className="w-3 h-3" /> Previous Entry
                            </span>
                            <h4 className="text-lg font-bold text-slate-200 line-clamp-1 group-hover:underline decoration-sky-500/50 underline-offset-4">{prevPost.title}</h4>
                        </Link>
                    ) : <div />}

                    {nextPost ? (
                        <Link to={`/blog/${nextPost.slug || generateSlug(nextPost.title)}`} className="group text-right">
                            <span className="text-xs font-mono text-slate-500 uppercase flex items-center justify-end gap-1 mb-1 group-hover:text-emerald-400 transition-colors">
                                Next Entry <ChevronRight className="w-3 h-3" />
                            </span>
                            <h4 className="text-lg font-bold text-slate-200 line-clamp-1 group-hover:underline decoration-emerald-500/50 underline-offset-4">{nextPost.title}</h4>
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </div>
    );
}
