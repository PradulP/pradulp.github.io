
import React, { useState, useEffect } from 'react';

const MESSAGES = [
    "INITIALIZING BIM_ENGINE...",
    "CONNECTING TO DATABASE...",
    "LOADING STRUCTURAL_ANALYSIS_MODELS...",
    "FETCHING CIVIL_DRAWINGS...",
    "COMPILING REACT_COMPONENTS...",
    "OPTIMIZING RENDER_PIPELINE...",
    "SCANNING SITE_SURVEY_DATA...",
    "EXECUTING REVIT_AUTOMATION_SCRIPTS...",
    "SYNCING WITH CLOUD_BIM_360...",
    "READY.",
    "LISTENING FOR USER_INPUT...",
    "CALCULATING STRUCTURAL_LINKS...",
    "CHECKING DEPENDENCIES...",
    "VITE_HMR_ACTIVE.",
];

export default function SystemTerminal() {
    const [logs, setLogs] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const nextLog = `> ${MESSAGES[index % MESSAGES.length]}`;
                const newLogs = [...prev, { id: Date.now(), text: nextLog }];
                return newLogs.slice(-4); // Keep only last 4 logs
            });
            setIndex(prev => prev + 1);
        }, 5000); // New log every 5 seconds

        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="fixed bottom-10 left-6 z-50 pointer-events-none hidden md:block">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 p-3 rounded-lg w-64 shadow-2xl">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-800/50 pb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">System Status</span>
                </div>
                <div className="space-y-1">
                    {logs.map((log) => (
                        <div key={log.id} className="text-[9px] font-mono text-emerald-400/70 overflow-hidden whitespace-nowrap animate-typing">
                            {log.text}
                        </div>
                    ))}
                </div>
                <div className="mt-2 text-[8px] font-mono text-slate-600 flex justify-between">
                    <span>PORT: 5173</span>
                    <span className="animate-pulse">_</span>
                </div>
            </div>
        </div>
    );
}
