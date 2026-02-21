import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail, ExternalLink, RefreshCw, Copy, Check,
    ChevronDown, ChevronUp, Search, MessageSquare,
    Phone, Filter, Info, Trash2
} from "lucide-react";

const CONTACT_SHEET_ID = "1z0XCv9uvG7KV7q_se8PIbfpgvKpy9ZfszoZZxel2XhI";
const SHEET_OPEN_URL = `https://docs.google.com/spreadsheets/d/${CONTACT_SHEET_ID}/edit`;

// Better CSV parsing to handle complex data
function parseCSV(text) {
    const rows = [];
    const lines = text.trim().split("\n");
    for (const line of lines) {
        if (!line.trim()) continue;
        const row = [];
        let inQuote = false, cell = "";
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') { inQuote = !inQuote; }
            else if (ch === "," && !inQuote) {
                row.push(cell.replace(/^"|"$/g, '').trim());
                cell = "";
            }
            else { cell += ch; }
        }
        row.push(cell.replace(/^"|"$/g, '').trim());

        // Only add rows that have content (ignore empty Google Sheet rows)
        if (row.some(c => c)) rows.push(row);
    }
    return rows;
}

function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        });
    };
    return (
        <button
            onClick={handleCopy}
            className="p-1 rounded bg-slate-800/50 hover:bg-sky-500/20 text-slate-500 hover:text-sky-400 transition-all flex-shrink-0"
            title="Copy cell value"
        >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
        </button>
    );
}

export default function AdminContactInbox() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTopic, setActiveTopic] = useState("all");
    const [refreshKey, setRefreshKey] = useState(0);

    const loadData = useCallback(() => {
        setLoading(true);
        setError(null);
        const csvUrl = `https://docs.google.com/spreadsheets/d/${CONTACT_SHEET_ID}/gviz/tq?tqx=out:csv&t=${Date.now()}`;
        fetch(csvUrl)
            .then(r => { if (!r.ok) throw new Error(`HTTP Error ${r.status}`); return r.text(); })
            .then(text => {
                const parsed = parseCSV(text);
                if (parsed.length > 0) {
                    setRows(parsed);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [refreshKey]);

    useEffect(() => { loadData(); }, [loadData]);

    const rawHeaders = rows.length > 0 ? rows[0] : [];
    // The sheet often has extra descriptive columns we should skip or label
    // Based on user screenshot: Timestamp, Name, Email, Phone, Topic, Message
    const filteredRows = useMemo(() => {
        if (rows.length <= 1) return [];
        let data = rows.slice(1);

        // filter by search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(r => r.some(c => String(c).toLowerCase().includes(q)));
        }

        // filter by topic (assumes topic is column 4)
        if (activeTopic !== "all") {
            data = data.filter(r => String(r[4] || "").toLowerCase() === activeTopic.toLowerCase());
        }

        return data.reverse(); // Newest first
    }, [rows, searchQuery, activeTopic]);

    const topics = useMemo(() => {
        if (rows.length <= 1) return [];
        const set = new Set(rows.slice(1).map(r => r[4]).filter(Boolean));
        return Array.from(set);
    }, [rows]);

    const handleWhatsApp = (phone) => {
        if (!phone) return;
        const clean = phone.replace(/\D/g, "");
        window.open(`https://wa.me/${clean.length === 10 ? '91' + clean : clean}`, "_blank");
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200">
            {/* TOP HEADER */}
            <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40 backdrop-blur-md">
                <div>
                    <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tighter flex items-center gap-3 italic">
                        <Mail className="w-6 h-6 text-emerald-500" />
                        COMMUNICATIONS_HUB
                    </h2>
                    <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE CHANNEL: CONTACT_FORM_V2
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-sky-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH MESSAGES..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-xs font-mono outline-none focus:border-sky-500/50 w-64 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setRefreshKey(k => k + 1)}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sky-400 transition-all flex items-center gap-2 text-xs font-bold uppercase"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        SYNC
                    </button>
                    <a href={SHEET_OPEN_URL} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold uppercase transition-all">
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* TOP FILTERS */}
            <div className="px-6 py-4 bg-slate-900/20 border-b border-slate-800 flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mr-2 flex items-center gap-2">
                    <Filter className="w-3 h-3" /> Filter Topics:
                </span>
                <button
                    onClick={() => setActiveTopic("all")}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all ${activeTopic === "all" ? "bg-sky-500 text-slate-950 border-sky-400" : "bg-slate-900 border-slate-800 text-slate-400"}`}
                >
                    ALL_CHANNELS
                </button>
                {topics.map(t => (
                    <button
                        key={t}
                        onClick={() => setActiveTopic(t)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all ${activeTopic === t ? "bg-emerald-500 text-slate-950 border-emerald-400" : "bg-slate-900 border-slate-800 text-slate-400"}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 overflow-auto custom-scrollbar p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                        <p className="text-xs font-mono text-emerald-500 animate-pulse uppercase tracking-[0.3em]">Decoding Feed...</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredRows.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-800 border-2 border-dashed border-slate-900 rounded-3xl">
                                <MessageSquare className="w-16 h-16 opacity-5" />
                                <p className="text-lg font-black uppercase tracking-tighter mt-4 opacity-10 italic">Zero Signals Detected</p>
                            </div>
                        ) : (
                            filteredRows.map((row, idx) => {
                                const isOpened = expanded === idx;
                                const [ts, name, email, phone, topic, msg] = row;

                                return (
                                    <div
                                        key={idx}
                                        className={`group relative border transition-all duration-300 rounded-2xl overflow-hidden ${isOpened ? "bg-slate-900 border-sky-500/50 shadow-2xl shadow-sky-950/20" : "bg-slate-900/30 border-slate-800 hover:border-slate-700"}`}
                                    >
                                        <div
                                            onClick={() => setExpanded(isOpened ? null : idx)}
                                            className="px-6 py-4 cursor-pointer flex flex-col md:flex-row md:items-center gap-4"
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black italic transition-all ${isOpened ? "bg-sky-500 text-slate-950" : "bg-slate-800 text-slate-500 group-hover:bg-slate-700"}`}>
                                                {name?.[0] || "?"}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-base font-black text-slate-200 uppercase tracking-tighter italic">{name || "ANONYMOUS"}</h3>
                                                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${isOpened ? "bg-sky-500/20 border-sky-500 text-sky-400" : "bg-slate-950 border-slate-700 text-slate-500"}`}>
                                                        {topic || "GENERAL"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono">
                                                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {email}</span>
                                                    <span className="flex items-center gap-1 sm:flex hidden"><Phone className="w-3 h-3" /> {phone}</span>
                                                </div>
                                            </div>

                                            <div className="text-right flex flex-col items-end gap-1">
                                                <p className="text-[10px] font-mono text-slate-600 uppercase">{ts}</p>
                                                <div className="flex items-center gap-2">
                                                    {isOpened ? <ChevronUp className="w-4 h-4 text-sky-400" /> : <ChevronDown className="w-4 h-4 text-slate-700" />}
                                                </div>
                                            </div>
                                        </div>

                                        {/* EXPANDED CONTENT AREA */}
                                        <AnimatePresence>
                                            {isOpened && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className="overflow-hidden border-t border-slate-800/50"
                                                >
                                                    <div className="px-6 pb-6 pt-6 grid md:grid-cols-12 gap-6">
                                                        <div className="md:col-span-8 space-y-4">
                                                            <div className="relative">
                                                                <div className="absolute -top-3 -left-2 text-4xl text-sky-500/10 font-serif">"</div>
                                                                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-sm text-slate-300 leading-relaxed font-medium italic whitespace-pre-wrap">
                                                                    {msg || "SYSTEM_NOTICE: This message has no content payload."}
                                                                </div>
                                                            </div>

                                                            {/* QUICK COPY AREA */}
                                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                                                {[
                                                                    { label: 'NAME', val: name },
                                                                    { label: 'EMAIL', val: email },
                                                                    { label: 'PHONE', val: phone },
                                                                    { label: 'FULL_RAW', val: row.join(', ') }
                                                                ].map(item => (
                                                                    <div key={item.label} className="p-2 bg-slate-900/50 border border-slate-800 rounded-lg flex items-center justify-between group/copy">
                                                                        <div className="min-w-0">
                                                                            <p className="text-[8px] font-mono text-slate-600 mb-0.5">{item.label}</p>
                                                                            <p className="text-[10px] font-mono text-slate-400 truncate">{item.val || "N/A"}</p>
                                                                        </div>
                                                                        <CopyButton text={item.val} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="md:col-span-4 flex flex-col gap-3">
                                                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">Command_Actions</p>

                                                            <a
                                                                href={`mailto:${email}?subject=RE: ${topic} Inquiry - ${name}`}
                                                                className="flex items-center justify-center gap-3 w-full bg-sky-600 hover:bg-sky-500 text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-sky-950/20"
                                                            >
                                                                <Mail className="w-4 h-4" />
                                                                SEND_EMAIL
                                                            </a>

                                                            <button
                                                                onClick={() => handleWhatsApp(phone)}
                                                                className="flex items-center justify-center gap-3 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-emerald-950/20"
                                                            >
                                                                <MessageSquare className="w-4 h-4" />
                                                                WHATSAPP_REPLY
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(row.join('\t'));
                                                                    alert('ROW_COPIED');
                                                                }}
                                                                className="flex items-center justify-center gap-3 w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all"
                                                            >
                                                                <Copy className="w-4 h-4" />
                                                                COPY_DAT_STREAM
                                                            </button>

                                                            <div className="mt-4 p-4 border border-dashed border-slate-800 rounded-xl">
                                                                <p className="text-[9px] font-mono text-slate-600 leading-tight">
                                                                    NOTE: Use WhatsApp reply for quick follow-ups. Ensure your browser allows popups for direct linking.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center text-[9px] font-mono text-slate-500">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1"><Info className="w-3 h-3" /> FILTERED: {filteredRows.length} OF {rows.length - 1}</span>
                    <span className="flex items-center gap-1">DATABASE_ID: {CONTACT_SHEET_ID.substring(0, 8)}...</span>
                </div>
                <div className="uppercase">STATUS: SYSTEM_READY_V2.0</div>
            </div>
        </div>
    );
}
