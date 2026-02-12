import React from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, FileCheck, Calendar } from "lucide-react";
import { containerVariants, itemVariants } from "../utils/animations";
import SectionTitle from "./SectionTitle";

export default function CertificationsSection({ certifications = [] }) {
    if (!certifications || certifications.length === 0) return null;

    return (
        <section className="relative py-10">
            <SectionTitle>Certifications & Achievements</SectionTitle>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-8"
            >
                {certifications.map((cert, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="group relative bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 hover:bg-slate-900/60 overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Award className="w-24 h-24 text-emerald-500 transform rotate-12" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                                    {cert.type === "Achievement" ? <Briefcase className="w-5 h-5" /> : <FileCheck className="w-5 h-5" />}
                                </div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 border border-slate-800 rounded-full px-3 py-1">
                                    <Calendar className="w-3 h-3" /> {cert.year}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-100 mb-2 leading-tight group-hover:text-emerald-400 transition-colors">
                                {cert.title}
                            </h3>

                            <p className="text-sm text-sky-400 font-medium mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                {cert.issuer}
                            </p>

                            <div className="mt-auto space-y-3 pt-4 border-t border-slate-800/50">
                                <p className="text-sm text-slate-400 italic">
                                    "{cert.highlight}"
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {(cert.tags || []).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-500"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
