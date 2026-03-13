import React from 'react';
import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-slate-950 font-mono">
      <div className="relative w-48 h-12 bg-slate-900 overflow-hidden border border-slate-800 rounded-sm">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(rgba(56,189,248,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.5)_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        {/* Loading Bar */}
        <motion.div 
          className="h-full bg-sky-500/20 border-r border-sky-400 flex items-center justify-end pr-2 overflow-hidden"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut", repeat: Infinity }}
        >
          <div className="text-[10px] text-sky-300 font-bold whitespace-nowrap opacity-50">SYS_BOOT:</div>
        </motion.div>

        {/* Scanline */}
        <motion.div 
          className="absolute inset-x-0 w-[2px] h-full bg-sky-300 blur-[1px]"
          initial={{ left: "0%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="mt-4 flex flex-col items-center text-center gap-1">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full" />
           <p className="text-[10px] text-emerald-400 uppercase tracking-[0.2em] font-bold">Mounting Interface</p>
        </div>
        <p className="text-[8px] text-slate-500 mt-1 uppercase tracking-widest">// Retrieving module blueprints</p>
      </div>
    </div>
  );
}
