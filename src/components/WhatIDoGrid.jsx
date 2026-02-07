// src/components/WhatIDoGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";

/**
 * WhatIDoGrid
 * Props:
 *  - items: [{ title: string, items: [string] }]
 */
export default function WhatIDoGrid({ items = [] }) {
  return (
    <section className="mb-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-3 mt-4"
      >
        {items.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-slate-400">No items yet.</div>
        )}
        {items.map((group, idx) => (
          <motion.article
            key={idx}
            variants={itemVariants}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 
            hover:scale-[1.02] transition-transform duration-300 hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/10"
          >
            <h3 className="text-sm font-bold text-slate-100 mb-3 border-b border-slate-800 pb-2 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent w-fit">
              {group.title}
            </h3>
            <ul className="text-[13px] text-slate-300 space-y-2">
              {(group.items || []).map((it, i) => (
                <li key={i} className="flex items-start gap-2 group/item">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-600 group-hover/item:bg-sky-400 transition-colors" />
                  <span className="group-hover/item:text-slate-100 transition-colors">{it}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
