import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Info, ChevronRight, CheckCircle2 } from "lucide-react";

/**
 * Convert a text level label into a precise percentage based on professional guidance
 */
function levelToPercent(level) {
    if (!level) return 65;
    const l = level.toLowerCase();

    // Expert: Master-level proficiency
    if (l.includes("expert") || l.includes("master")) return 95;

    // Strong: Very confident (often for soft skills)
    if (l.includes("strong") || l.includes("confident")) return 90;

    // Advanced: Deep expertise
    if (l.includes("advanced") || l.includes("deep")) return 85;

    // Intermediate: Strong practical ability
    if (l.includes("intermediate") || l.includes("practical")) return 75;

    // Working: Can use in real work independently
    if (l.includes("working") || l.includes("independent")) return 65;

    // Learning: Currently studying / practicing
    if (l.includes("learning") || l.includes("practicing") || l.includes("studying")) return 50;

    // Beginner: Basic knowledge, learning stage
    if (l.includes("beginner") || l.includes("basic")) return 40;

    return 65; // Default working level
}

/**
 * Returns the plain English meaning of exactly what the level means based on user guidelines
 */
function getLevelMeaning(level) {
    if (!level) return "Can use in real work independently.";
    const l = level.toLowerCase();
    if (l.includes("expert") || l.includes("master")) return "Master-level proficiency.";
    if (l.includes("strong") || l.includes("confident")) return "Very confident professional ability.";
    if (l.includes("advanced") || l.includes("deep")) return "Deep expertise.";
    if (l.includes("intermediate") || l.includes("practical")) return "Strong practical ability.";
    if (l.includes("working") || l.includes("independent")) return "Can use in real work independently.";
    if (l.includes("learning") || l.includes("practicing") || l.includes("studying")) return "Currently studying / practicing.";
    if (l.includes("beginner") || l.includes("basic")) return "Basic knowledge, learning stage.";
    return "Component functionality verified.";
}

/**
 * Individual skill card with Blueprint / Schematic Theme
 */
export default function SkillCard({ skill, categoryTitle, onClick, index, getExperienceContext }) {
    const [hovered, setHovered] = useState(false);
    const percent = levelToPercent(skill.level);
    const radius = 26;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;

    const registryId = `SKL-C${(index + 1).toString().padStart(2, '0')}`;
    const displayLetter = skill.name.charAt(0).toUpperCase();

    return (
        <motion.div
            className="relative w-full h-[300px] cursor-pointer group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            style={{ perspective: "1500px" }}
        >
            {/* Technical Border Hover Glow - Blueprint Style */}
            <div className={`absolute -inset-[2px] rounded-none transition-all duration-500 ${hovered ? 'opacity-100 border-2 border-cyan-500/50 border-dashed' : 'opacity-0 border border-slate-700'} pointer-events-none`} />

            <motion.div
                className="w-full h-full relative"
                animate={{ rotateY: hovered ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* FRONT SIDE - BLUEPRINT THEME */}
                <div
                    className="absolute inset-0 bg-[#0B1121] border border-slate-700/60 p-6 flex flex-col justify-between shadow-2xl overflow-hidden group-hover:border-cyan-500/40 transition-colors"
                    style={{
                        backfaceVisibility: "hidden",
                        backgroundImage: "linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)",
                        backgroundSize: "20px 20px"
                    }}
                >
                    {/* Blueprint Deco: Corner Marks */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/30" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/30" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/30" />

                    {/* Background Letter */}
                    <div className="absolute top-0 right-2 opacity-[0.07] select-none pointer-events-none flex flex-col items-end">
                        <span className="text-[120px] font-mono font-bold leading-none text-cyan-500">{displayLetter}</span>
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-900 border border-slate-700 flex items-center justify-center relative shadow-sm group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                                    <Cpu className="w-5 h-5 text-cyan-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-mono text-cyan-700/70 uppercase">REF_ID</span>
                                    <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider">
                                        {registryId}
                                    </span>
                                </div>
                            </div>

                            <span className="text-[9px] font-mono font-bold text-cyan-400/80 border border-dashed border-cyan-900 px-2 py-0.5 uppercase tracking-wider bg-cyan-950/30">
                                {categoryTitle}
                            </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-mono font-bold text-slate-100 uppercase tracking-tighter leading-none break-words mb-2 drop-shadow-md min-h-[3rem] flex items-end">
                            {skill.name}
                            <span className="text-cyan-500 animate-pulse ml-1">_</span>
                        </h3>
                    </div>

                    <div className="space-y-5 relative z-10 flex-grow flex flex-col justify-end">
                        <div className="flex items-center gap-5">
                            <div className="relative w-16 h-16 flex-shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                                    <circle cx="32" cy="32" r={radius} stroke="rgba(6,182,212,0.1)" strokeWidth={strokeWidth} fill="none" />
                                    <motion.circle
                                        cx="32" cy="32" r={radius} stroke="#06b6d4" strokeWidth={strokeWidth} fill="none"
                                        strokeDasharray={circumference}
                                        initial={{ strokeDashoffset: circumference }}
                                        animate={{ strokeDashoffset: hovered ? circumference - (percent / 100) * circumference : circumference }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        strokeLinecap="butt"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-[12px] font-mono font-bold text-cyan-100">{percent}%</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                                    <span>Capacity</span>
                                </div>
                                {/* Segmented Progress Bar */}
                                <div className="h-2 flex gap-0.5">
                                    {[...Array(10)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-full flex-1 transition-all duration-300 ${i < (percent / 10) ? 'bg-cyan-500' : 'bg-slate-800'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-tight block text-right">[{skill.level}]</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACK SIDE - TECHNICAL DETAILS */}
                <div
                    className="absolute inset-0 bg-[#0B1121] border border-cyan-500/50 p-6 flex flex-col font-mono shadow-[0_0_20px_rgba(6,182,212,0.15)] overflow-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundImage: "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)",
                        backgroundSize: "20px 20px"
                    }}
                >
                    {/* Scanline Animation */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                        <motion.div
                            className="w-full h-1 bg-cyan-400 box-shadow-[0_0_10px_#22d3ee]"
                            animate={{ y: ["0%", "800%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4 pb-4 border-b border-dashed border-slate-700">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-cyan-600 font-bold mb-1">Spec Sheet</p>
                                <h4 className="text-lg font-bold text-slate-200 uppercase tracking-tight leading-none line-clamp-1">
                                    {skill.name}
                                </h4>
                            </div>
                            <div className="p-1.5 border border-cyan-500/30 text-cyan-400">
                                <Info className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="flex-1 min-h-0 bg-[#050914] border border-slate-800 p-3 overflow-y-auto custom-scrollbar">
                            <p className="text-[10px] text-slate-300 leading-relaxed mb-4">
                                <span className="text-cyan-600 mr-2">&gt;</span>
                                {skill.details || getLevelMeaning(skill.level)}
                            </p>

                            {/* Experience Context Indicators */}
                            <div className="space-y-1.5">
                                <p className="text-[8px] uppercase tracking-widest text-slate-500 font-bold mb-1 border-b border-slate-800 pb-1">Validation Sources:</p>
                                {getExperienceContext(skill.name, categoryTitle).map((ctx, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[9px] text-slate-400">
                                        <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                                        {ctx.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-dashed border-slate-700 flex justify-between items-center text-[9px] font-mono">
                            <span className="text-slate-500">STATUS: READY</span>
                            <span className="text-cyan-400 uppercase flex items-center gap-2 hover:text-cyan-300 transition-colors">
                                View Data <ChevronRight className="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
