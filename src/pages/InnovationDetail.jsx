import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import db from "../data/innovation.json";
import content from "../data/index";
import useGoogleCMS from "../hooks/useGoogleCMS";
import SEO from "../components/SEO";
import {
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Terminal,
    Database,
    Cpu,
    Code2,
    Atom,
    Share2,
    MessageCircle,
    Mail,
    Play,
    Globe
} from "lucide-react";
import { getDefaultImage, generateSlug } from "./Innovation";

// --- CALCULATORS (Same as before) ---
const BeamCalculator = () => {
    const [span, setSpan] = useState(5); // meters
    const [load, setLoad] = useState(10); // kN
    const moment = (load * span) / 4;
    const deflectionFactor = (load * Math.pow(span, 2)) / 500;

    return (
        <div className="space-y-6 select-none bg-slate-900/40 p-4 rounded-xl border border-slate-800/50 hover:border-sky-500/20 transition-colors">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex justify-between">
                        <span>Span (L)</span><span className="text-sky-400 font-bold">{span}m</span>
                    </label>
                    <input type="range" min="2" max="15" step="0.5" value={span} onChange={(e) => setSpan(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex justify-between">
                        <span>Load (P)</span><span className="text-sky-400 font-bold">{load}kN</span>
                    </label>
                    <input type="range" min="1" max="50" step="1" value={load} onChange={(e) => setLoad(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500" />
                </div>
            </div>
            <div className="relative h-24 bg-slate-950/80 rounded-lg flex items-center justify-center overflow-hidden border border-slate-800 shadow-inner">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
                <div className="relative w-[80%] h-1 bg-slate-700">
                    <div className="absolute -left-1 bottom-0 w-3 h-3 bg-slate-600 rotate-45 translate-y-1/2 border border-slate-500" />
                    <div className="absolute -right-1 bottom-0 w-3 h-3 bg-slate-600 rotate-45 translate-y-1/2 border border-slate-500" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-300 ease-out" style={{ borderRadius: '50%', transform: `translateY(${deflectionFactor * 20}px) scaleY(${1 + deflectionFactor * 0.5})` }} />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center opacity-80">
                        <div className="w-px h-8 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                        <div className="w-2 h-2 border-l border-b border-amber-400 -rotate-45 -mt-1" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800/50 font-mono text-[10px]">
                <div><div className="text-slate-500 uppercase tracking-wider">Bending Moment</div><div className="text-sm text-sky-400 font-bold mt-0.5">{moment.toFixed(2)} kN-m</div></div>
                <div className="text-right"><div className="text-slate-500 uppercase tracking-wider">Status</div><div className="text-emerald-500 font-bold mt-0.5 animate-pulse">OPTIMAL</div></div>
            </div>
        </div>
    );
};

const SlopeCalculator = () => {
    const [elevA, setElevA] = useState(100);
    const [elevB, setElevB] = useState(102);
    const [distance, setDistance] = useState(50);
    const [targetDist, setTargetDist] = useState(25);
    const nElevA = parseFloat(elevA) || 0;
    const nElevB = parseFloat(elevB) || 0;
    const nDistance = parseFloat(distance) || 1;
    const totalRise = nElevB - nElevA;
    const gradient = (totalRise / nDistance);
    const intermediateElev = nElevA + (gradient * targetDist);
    const slopePercentage = (gradient * 100).toFixed(2);

    return (
        <div className="space-y-4 select-none bg-slate-900/40 p-4 rounded-xl border border-slate-800/50 hover:border-emerald-500/20 transition-colors">
            <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1"><label className="text-[8px] font-mono text-slate-500 uppercase">Elev_A</label><input type="number" value={elevA} onChange={(e) => setElevA(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-1.5 text-[10px] text-emerald-400 outline-none rounded focus:border-emerald-500" /></div>
                <div className="space-y-1"><label className="text-[8px] font-mono text-slate-500 uppercase">Elev_B</label><input type="number" value={elevB} onChange={(e) => setElevB(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-1.5 text-[10px] text-emerald-400 outline-none rounded focus:border-emerald-500" /></div>
                <div className="space-y-1"><label className="text-[8px] font-mono text-slate-500 uppercase">Dist (L)</label><input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-1.5 text-[10px] text-emerald-400 outline-none rounded focus:border-emerald-500" /></div>
            </div>
            <div className="relative h-20 bg-slate-950/80 rounded-lg border border-slate-800 flex items-end px-8 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:10px_10px]" />
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d={`M 0 35 L 100 ${35 - (gradient * 10)}`} stroke="#10b981" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
                    <circle cx={nDistance !== 0 ? (targetDist / nDistance) * 100 : 0} cy={35 - (gradient * 10 * (nDistance !== 0 ? targetDist / nDistance : 0))} r="2" fill="#fbbf24" className="animate-pulse shadow-[0_0_10px_#fbbf24]" />
                </svg>
            </div>
            <div className="space-y-2">
                <label className="text-[8px] font-mono text-slate-500 uppercase tracking-widest flex justify-between"><span>Scan Position</span><span className="text-amber-400">{targetDist}m</span></label>
                <input type="range" min="0" max={distance} step="0.1" value={targetDist} onChange={(e) => setTargetDist(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded appearance-none accent-amber-500 cursor-pointer" />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/50 text-[9px] font-mono">
                <div><span className="text-slate-500 uppercase block">Calculated Elev</span><span className="text-emerald-400 font-bold text-xs">{intermediateElev.toFixed(3)}m</span></div>
                <div className="text-right"><span className="text-slate-500 uppercase block">Gradient</span><span className="text-slate-300 font-bold">{slopePercentage}%</span></div>
            </div>
        </div>
    );
};

const ScaleConverter = () => {
    const [inputValue, setInputValue] = useState(1);
    const [fromUnit, setFromUnit] = useState('mm');
    const [toUnit, setToUnit] = useState('m');
    const [scale, setScale] = useState(100);
    const units = { mm: 1, cm: 10, m: 1000, ft: 304.8, in: 25.4 };
    const calculateResult = () => {
        const numValue = parseFloat(inputValue) || 0;
        const valueInMm = numValue * units[fromUnit];
        const scaledMm = valueInMm / scale;
        return (scaledMm / units[toUnit]).toFixed(4);
    };

    return (
        <div className="space-y-4 select-none bg-slate-900/40 p-4 rounded-xl border border-slate-800/50 hover:border-sky-500/20 transition-colors">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label className="text-[9px] font-mono text-slate-500 uppercase">Input</label><input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-2 text-xs text-sky-400 outline-none focus:border-sky-500 rounded" /></div>
                <div className="space-y-1"><label className="text-[9px] font-mono text-slate-500 uppercase">Scale (1:X)</label><select value={scale} onChange={(e) => setScale(parseInt(e.target.value))} className="w-full bg-slate-950 border border-slate-700 p-2 text-xs text-sky-400 outline-none focus:border-sky-500 rounded"><option value="1">1:1</option><option value="10">1:10</option><option value="50">1:50</option><option value="100">1:100</option></select></div>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-lg border border-sky-500/20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-sky-500/5 animate-pulse" />
                <div className="relative z-10"><div className="text-[9px] font-mono text-slate-500 uppercase mb-1">Scaled Output</div><div className="text-xl font-black text-sky-400 tabular-nums">{calculateResult()} <span className="text-xs text-sky-600">{toUnit}</span></div></div>
            </div>
        </div>
    )
}

// --- MAIN DETAIL COMPONENT ---
export default function InnovationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const { data: cmsInnovation } = useGoogleCMS("innovation");
    const items = useMemo(() => {
        if (cmsInnovation && cmsInnovation.length > 0) return cmsInnovation;
        return (db.items && db.items.length > 0) ? db.items : (content.innovation || []);
    }, [cmsInnovation]);

    // Find by Slug or ID
    const index = useMemo(() => items.findIndex(item => (item.slug === id) || (String(item.id) === String(id)) || (generateSlug(item.title) === id)), [items, id]);
    const item = items[index];
    const prevItem = items[index - 1];
    const nextItem = items[index + 1];

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
                <div className="text-center">
                    <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h2 className="text-xl font-mono mb-4">404: SYSTEM NOT FOUND</h2>
                    <Link to="/innovation" className="text-sky-400 hover:text-sky-300 underline">Return to Lab</Link>
                </div>
            </div>
        );
    }

    // Strictly check ID=5 or exact slug match for Calculators
    const isCalculators = String(item.id) === "5" || item.slug === "aec-calculation-engine";

    // Request Access Logic
    const handleContactRedirect = () => {
        const message = `RE: Access Request for ${item.title} (ID: ${item.id}-SYS). \n\nI am interested in learning more about this system.`;
        navigate(`/contact?msg=${encodeURIComponent(message)}&topic=innovation`);
    };

    const handleWhatsApp = () => {
        const phone = content.contact?.whatsapp?.replace(/[^0-9]/g, "") || "918078376902";
        const text = `Hello Pradul, I'd like to request access to: ${item.title} (${item.id}-SYS).`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30 relative overflow-hidden">
            <SEO title={item.title} description={item.description} />
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500 origin-left z-50" style={{ scaleX }} />

            <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-10 lg:px-24 py-24 md:py-32">
                <Link to="/innovation" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-sky-400 mb-8 uppercase tracking-widest transition-colors group">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Lab
                </Link>

                {/* Header */}
                <header className="mb-12 border-b border-slate-800 pb-12 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                        <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 uppercase font-black tracking-widest">{item.type}</span>
                        <span className={`px-3 py-1 rounded-full border uppercase font-black tracking-widest ${item.status.includes('Live') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'}`}>{item.status}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic text-slate-100 uppercase tracking-tighter leading-none">{item.title}</h1>
                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl font-medium border-l-4 border-purple-500 pl-6 italic">{item.description}</p>

                    <div className="flex gap-4 pt-4 flex-wrap">
                        {/* Main Action Buttons */}
                        {item.links?.repo && (
                            <a href={item.links.repo} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-sky-400 hover:text-white hover:border-sky-500 transition-all">
                                <Code2 className="w-4 h-4" /> Source Code
                            </a>
                        )}
                        {item.links?.demo && (
                            <a href={item.links.demo} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400 transition-all">
                                <ExternalLink className="w-4 h-4" /> Live Demo
                            </a>
                        )}
                        <button onClick={() => { navigator.share ? navigator.share({ title: item.title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href); }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-500 transition-all">
                            <Share2 className="w-4 h-4" /> Share
                        </button>
                    </div>
                </header>

                {/* Media Preview (Glimpse) Section */}
                {(item.glimpse || item.image || getDefaultImage(item.type)) && (
                    <div className="mb-12 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative group">
                        {item.glimpseType === 'video' ? (
                            <div className="aspect-video bg-neutral-900 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-purple-500/10 z-10 pointer-events-none" />
                                <video src={item.glimpse} controls className="w-full h-full object-cover" poster={item.poster || ""} />
                            </div>
                        ) : (
                            <div className="aspect-video bg-neutral-900 relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 z-10" />
                                <img src={item.image || item.glimpse || getDefaultImage(item.type)} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="absolute bottom-6 left-6 z-20">
                                    {item.demo_link ? (
                                        <a href={item.demo_link} target="_blank" rel="noreferrer" className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-2 hover:border-purple-500/50 transition-colors group/btn">
                                            <Play className="w-4 h-4 text-purple-400 group-hover/btn:scale-110 transition-transform" fill="currentColor" />
                                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">Launch Live System</span>
                                        </a>
                                    ) : (
                                        <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-2">
                                            <Database className="w-4 h-4 text-sky-400" />
                                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">System Blueprint</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Body Content */}
                <div className="space-y-12 mb-20">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-sky-400 mb-4 flex items-center gap-2"><Database className="w-4 h-4" /> Technical Description</h3>
                                <p className="text-slate-300 leading-relaxed mb-6">{item.details}</p>

                                {item.impact && (
                                    <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-2">System Impact</p>
                                        <p className="text-sm text-sky-100 font-medium">{item.impact}</p>
                                    </div>
                                )}
                            </div>

                            {item.use_cases && item.use_cases.length > 0 && (
                                <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2"><Globe className="w-4 h-4" /> Practical Use Cases</h3>
                                    <ul className="space-y-3">
                                        {item.use_cases.map((uc, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                                <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                {uc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4 flex items-center gap-2"><Cpu className="w-4 h-4" /> Tech Stack</h3>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {item.tech.map((t, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-slate-950 text-slate-400 font-mono text-xs uppercase font-bold border border-slate-800 rounded-lg">{t}</span>
                                    ))}
                                </div>
                            </div>

                            {item.features && item.features.length > 0 && (
                                <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex-1">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2"><Atom className="w-4 h-4" /> Key Features</h3>
                                    <ul className="space-y-3">
                                        {item.features.map((ft, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] shrink-0 mt-1.5" />
                                                {ft}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Request Access Area */}
                            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm mt-auto">
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Request Full Access</p>
                                <div className="flex gap-2">
                                    <button onClick={handleContactRedirect} className="flex-1 py-2 bg-sky-900/20 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all">
                                        <Mail className="w-3.5 h-3.5" /> Email
                                    </button>
                                    <button onClick={handleWhatsApp} className="flex-1 py-2 bg-emerald-900/20 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all">
                                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conditional Calculators Render */}
                    {isCalculators && (
                        <div className="space-y-8 border-t border-slate-800 pt-12">
                            <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-100 flex items-center gap-3"><Atom className="w-6 h-6 text-sky-500 animate-spin-slow" /> Interactive Utilities</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-1 backdrop-blur-sm"><div className="bg-slate-900/60 rounded-xl p-4 mb-1"><h3 className="text-xs font-bold text-sky-100 uppercase tracking-wider">Structural_Analyzer</h3></div><div className="p-4"><BeamCalculator /></div></div>
                                <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-1 backdrop-blur-sm"><div className="bg-slate-900/60 rounded-xl p-4 mb-1"><h3 className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Gradient_Solver</h3></div><div className="p-4"><SlopeCalculator /></div></div>
                                <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-1 backdrop-blur-sm"><div className="bg-slate-900/60 rounded-xl p-4 mb-1"><h3 className="text-xs font-bold text-amber-100 uppercase tracking-wider">Site_Scale_Logic</h3></div><div className="p-4"><ScaleConverter /></div></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Footer */}
                <div className="border-t border-slate-800 pt-12 flex flex-col md:flex-row justify-between gap-6">
                    {prevItem ? (
                        <Link to={`/innovation/${prevItem.slug || generateSlug(prevItem.title)}`} className="group text-left">
                            <span className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1 mb-1 group-hover:text-purple-400 transition-colors"><ChevronLeft className="w-3 h-3" /> Previous System</span>
                            <h4 className="text-lg font-bold text-slate-200 line-clamp-1 group-hover:underline decoration-purple-500/50 underline-offset-4">{prevItem.title}</h4>
                        </Link>
                    ) : <div />}
                    {nextItem ? (
                        <Link to={`/innovation/${nextItem.slug || generateSlug(nextItem.title)}`} className="group text-right">
                            <span className="text-xs font-mono text-slate-500 uppercase flex items-center justify-end gap-1 mb-1 group-hover:text-emerald-400 transition-colors">Next System <ChevronRight className="w-3 h-3" /></span>
                            <h4 className="text-lg font-bold text-slate-200 line-clamp-1 group-hover:underline decoration-emerald-500/50 underline-offset-4">{nextItem.title}</h4>
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </div>
    );
}
