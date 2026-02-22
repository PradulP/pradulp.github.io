import React from 'react';
import { motion } from 'framer-motion';
import {
    Layout,
    Monitor,
    Smartphone,
    Cpu,
    Database,
    Layers,
    ShieldCheck,
    Globe,
    Zap,
    Home,
    Search,
    Edit3,
    Mail,
    CheckCircle2,
    Pocket
} from 'lucide-react';

const AdminShowcase = () => {
    const categories = [
        {
            title: "Global Excellence",
            icon: Globe,
            color: "text-sky-400",
            bg: "bg-sky-500/10",
            border: "border-sky-500/20",
            items: [
                { name: "CAD Crosshair Cursor", detail: "Custom precision cursor optics replicating engineering software environments." },
                { name: "Adaptive Theme Engine", detail: "Triple-mode switching: Blueprint (Grid), Dark Modern (HUD), and Paper (Clean)." },
                { name: "Glassmorphism UI", detail: "Advanced frosted-glass panel effects using hardware-accelerated CSS filters." },
                { name: "Zero-Backend CMS", detail: "Complex data orchestration via Google Sheets API & Apps Script." },
                { name: "Automatic SEO Hub", detail: "Dynamic sitemap generation and automated meta-tag injection." }
            ]
        },
        {
            title: "Page-by-Page Intelligence",
            icon: Layout,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            pages: [
                {
                    name: "Home (Command Center)",
                    icon: Home,
                    features: ["3D Hero Particles", "Typewriter Effect", "Dynamic HUD Stats", "System Status Feed", "Resume Modal Hub"]
                },
                {
                    name: "Projects & Portfolio",
                    icon: Layers,
                    features: ["Smart Category Filters", "Real-time Search", "HUD Metadata Tags", "3D Model Previews", "Immersive Detail Views"]
                },
                {
                    name: "Engineering Journal",
                    icon: Edit3,
                    features: ["Markdown Rendering", "Scroll-tracking Progress", "Reading Time Algorithm", "Tag Filtering", "Social Sharing"]
                },
                {
                    name: "AEC Innovation Engine",
                    icon: Cpu,
                    features: ["Live Beam Solvers", "Scale Converters", "Unit HUDs", "Code Documentation", "Algorithm Showcases"]
                },
                {
                    name: "Contact Gateway",
                    icon: Mail,
                    features: ["Google Sheets Integrated Forms", "WhatsApp Signal Generation", "Location HUD", "Success Modals"]
                }
            ]
        },
        {
            title: "Technical Architecture",
            icon: ShieldCheck,
            color: "text-violet-400",
            bg: "bg-violet-500/10",
            border: "border-violet-500/20",
            items: [
                { name: "React 19 Core", detail: "Ultrafast rendering using the latest concurrent UI patterns." },
                { name: "Framer Motion 11", detail: "Orchestrated staggered entry and interactive physics-based animations." },
                { name: "Vite Environment", detail: "Optimized build pipeline with lazy-loaded code splitting." },
                { name: "Lucide Icon Logic", detail: "Consistent, ultra-lightweight engineering-grade iconography." }
            ]
        }
    ];

    return (
        <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-slate-950/50 pb-20">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header Section */}
                <header className="relative p-8 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Monitor className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-full">Project_Showcase_v2.0</span>
                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">Ready_to_Share</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">
                            Engineering the Future <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">of Web Architecture</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl font-medium leading-relaxed">
                            A high-performance digital portfolio designed for a Civil Engineer & BIM Specialist.
                            Built with a focus on precision, automation, and futuristic HUD-inspired aesthetics.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Categories */}
                    {categories.map((cat, idx) => (
                        <motion.section
                            key={cat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-6 rounded-2xl border ${cat.border} bg-slate-900/60 backdrop-blur-sm relative overflow-hidden group`}
                        >
                            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity`}>
                                <cat.icon className="w-24 h-24" />
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center border ${cat.border}`}>
                                    <cat.icon className={`w-6 h-6 ${cat.color}`} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight italic">{cat.title}</h2>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">SUB_SYSTEM_MODULE</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {cat.items && cat.items.map((item, i) => (
                                    <div key={i} className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-1">
                                            <CheckCircle2 className={`w-3 h-3 ${cat.color}`} />
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium pl-5">{item.detail}</p>
                                    </div>
                                ))}

                                {cat.pages && cat.pages.map((page, i) => (
                                    <div key={i} className="p-4 bg-slate-950/40 rounded-xl border border-slate-800/30">
                                        <div className="flex items-center gap-3 mb-3 border-b border-slate-800 pb-2">
                                            <page.icon className={`w-4 h-4 ${cat.color}`} />
                                            <h3 className="text-sm font-black text-slate-200 uppercase tracking-tight italic">{page.name}</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {page.features.map((f, fi) => (
                                                <span key={fi} className="text-[9px] font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md border border-slate-700/50 uppercase">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    ))}

                    {/* Admin Specific Features (Technical) */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-8 rounded-2xl border border-sky-500/20 bg-sky-500/5 relative overflow-hidden lg:col-span-2"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Zap className="w-32 h-32 text-sky-500" />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-sky-500/20 flex items-center justify-center border border-sky-500/30">
                                    <Database className="w-8 h-8 text-sky-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">Admin Architecture</h2>
                                    <p className="text-xs font-mono text-sky-500 uppercase tracking-[0.2em]">Full_Control_Environment</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center min-w-[120px]">
                                    <p className="text-2xl font-black text-white">100%</p>
                                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">Data_Accuracy</p>
                                </div>
                                <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center min-w-[120px]">
                                    <p className="text-2xl font-black text-emerald-400">LIVE</p>
                                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">Sync_Protocol</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                                <div className="flex items-center gap-2 text-sky-400">
                                    <Search className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Data Explorer</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">Table & JSON stream viewer for all CMS collections. Multi-format support (CSV/JSON/Table).</p>
                            </div>
                            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Inbox Hub</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">Real-time monitoring of form entries with integrated email and WhatsApp response triggers.</p>
                            </div>
                            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                                <div className="flex items-center gap-2 text-violet-400">
                                    <Zap className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Sync Automations</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">One-click data synchronization from primary Google Sheet architecture to frontend caches.</p>
                            </div>
                        </div>
                    </motion.section>
                </div>

                <footer className="pt-12 border-t border-slate-900 flex flex-col items-center gap-6">
                    <p className="text-slate-600 text-[10px] font-mono uppercase tracking-[0.4em]">Proprietary Architecture & Design by Pradul P</p>
                    <div className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminShowcase;
