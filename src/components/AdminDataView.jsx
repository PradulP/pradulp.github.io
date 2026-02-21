import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Copy, RefreshCw, FileText, Check, AlertCircle,
    Database, LayoutList, Code, ExternalLink,
    Search, ChevronDown, ChevronUp, Filter, Eye,
    Download, Table as TableIcon
} from "lucide-react";
import useGoogleCMS from "../hooks/useGoogleCMS";
import { FORM_URLS, GOOGLE_CMS_URL } from "../data/config";

const TABS = [
    { id: "blog", label: "Blog Posts" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "innovation", label: "Innovations" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact Form" },
];

export default function AdminDataView() {
    const [activeTab, setActiveTab] = useState("blog");
    const [refreshKey, setRefreshKey] = useState(0);
    const [viewMode, setViewMode] = useState("table"); // 'table' or 'json'
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedRow, setExpandedRow] = useState(null);

    const { data, loading, error, refetch } = useGoogleCMS(activeTab, true, refreshKey);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
        setExpandedRow(null);
    };

    const columns = useMemo(() => {
        if (!data || data.length === 0) return [];
        return Object.keys(data[0]);
    }, [data]);

    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!searchQuery) return data;
        const q = searchQuery.toLowerCase();
        return data.filter(row =>
            Object.values(row).some(val =>
                String(val).toLowerCase().includes(q)
            )
        );
    }, [data, searchQuery]);

    const handleDownloadJSON = () => {
        const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeTab}_data.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCopyJSON = () => {
        navigator.clipboard.writeText(JSON.stringify(filteredData, null, 2));
        alert("JSON_COPIED_TO_CLIPBOARD");
    };

    const formatCellValue = (val) => {
        if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
        if (!val) return "—";

        if (Array.isArray(val)) {
            return `[ ${val.length} items ]`;
        }

        if (typeof val === 'object') {
            return '{ OBJ }';
        }

        const strVal = String(val);

        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(strVal)) {
            const date = new Date(strVal);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
            }
        }

        if ((strVal.trim().startsWith('[') && strVal.trim().endsWith(']')) ||
            (strVal.trim().startsWith('{') && strVal.trim().endsWith('}'))) {
            try {
                const parsed = JSON.parse(strVal);
                if (Array.isArray(parsed)) return `[ ${parsed.length} items ]`;
                return "{ OBJ }";
            } catch (e) { }
        }

        return strVal;
    };

    const currentFormUrl = FORM_URLS[activeTab];

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200">
            {/* HEADER */}
            <div className="p-6 border-b border-slate-800 flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-slate-900/40 backdrop-blur-md">
                <div>
                    <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tighter flex items-center gap-3 italic">
                        <Database className="w-6 h-6 text-sky-500" />
                        CMS_DATA_EXPLORER
                    </h2>
                    <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-widest flex items-center gap-2">
                        READ_ONLY_ACCESS: PORTFOLIO_V2_BLUEPRINT
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative group min-w-[200px] lg:min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-sky-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-xs font-mono outline-none focus:border-sky-500/50 w-full transition-all"
                        />
                    </div>

                    {/* RESTORED BUTTONS */}
                    {currentFormUrl && (
                        <a href={currentFormUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 text-[10px] font-black uppercase transition-all flex items-center gap-2" title="Open Form">
                            <FileText className="w-4 h-4" /> FORM
                        </a>
                    )}

                    <a href="https://docs.google.com/spreadsheets/d/1CVKjh7ECr1qi-bnYuwVnrpYvdAuEo3OONnqLe_EDZLE/edit" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-[10px] font-black uppercase transition-all flex items-center gap-2" title="Open Google Sheet">
                        <TableIcon className="w-4 h-4" /> SHEET
                    </a>

                    <button onClick={handleCopyJSON} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 transition-all flex items-center gap-2 text-[10px] font-black uppercase" title="Copy JSON">
                        <Copy className="w-4 h-4" /> COPY
                    </button>

                    <button onClick={handleDownloadJSON} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 transition-all flex items-center gap-2 text-[10px] font-black uppercase" title="Download JSON">
                        <Download className="w-4 h-4" /> JSON
                    </button>

                    <button
                        onClick={() => setViewMode(viewMode === "table" ? "json" : "table")}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 transition-all flex items-center gap-2 text-[10px] font-black uppercase"
                    >
                        {viewMode === "table" ? <Code className="w-4 h-4" /> : <LayoutList className="w-4 h-4" />}
                        {viewMode === "table" ? "JSON_VIEW" : "TABLE_VIEW"}
                    </button>

                    <button
                        onClick={handleRefresh}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sky-400 transition-all flex items-center gap-2 text-[10px] font-black uppercase"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> SYNC
                    </button>
                </div>
            </div>

            {/* TABS */}
            <div className="px-6 py-2 flex gap-1 overflow-x-auto border-b border-slate-800 bg-slate-950/50">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id);
                            setExpandedRow(null);
                        }}
                        className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg whitespace-nowrap ${activeTab === tab.id
                            ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                            : "text-slate-600 hover:text-slate-400 border border-transparent"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* DATA AREA */}
            <div className="flex-1 overflow-hidden relative flex flex-col">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 z-20 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
                            <p className="text-xs font-mono text-sky-500 animate-pulse uppercase tracking-[0.3em]">SYNCHRONIZING...</p>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-auto p-6 scroll-smooth custom-scrollbar">
                    {error ? (
                        <div className="flex flex-col items-center justify-center h-full text-red-500 gap-4">
                            <AlertCircle className="w-12 h-12 opacity-20" />
                            <p className="font-mono text-xs uppercase tracking-[0.2em]">{error.message}</p>
                            <button onClick={handleRefresh} className="text-sky-500 hover:underline text-xs uppercase font-mono tracking-widest">RETRY_FETCH</button>
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-800 gap-4 opacity-50">
                            <LayoutList className="w-16 h-16 opacity-5" />
                            <p className="font-mono text-xs uppercase tracking-widest">NO_SIGNALS_RECORDED</p>
                        </div>
                    ) : (
                        viewMode === "table" ? (
                            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/20 shadow-2xl">
                                {/* ADDED HORIZONTAL SCROLLBAR CLASS HERE */}
                                <div className="overflow-x-auto custom-scrollbar-horizontal">
                                    <table className="w-full text-left text-[10px] font-mono border-collapse min-w-max md:min-w-full">
                                        <thead className="bg-slate-900/80 text-slate-500 uppercase tracking-[0.1em] border-b border-slate-800 sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-4 w-12 text-center border-r border-slate-800 italic">#</th>
                                                {columns.map((col) => (
                                                    <th key={col} className="px-4 py-4 whitespace-nowrap border-r border-slate-800 last:border-0 italic">
                                                        {col}
                                                    </th>
                                                ))}
                                                <th className="px-4 py-4 w-10 text-center italic">VIEW</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-900">
                                            {filteredData.map((row, idx) => {
                                                const isExpanded = expandedRow === idx;
                                                return (
                                                    <React.Fragment key={idx}>
                                                        <tr
                                                            onClick={() => setExpandedRow(isExpanded ? null : idx)}
                                                            className={`transition-colors cursor-pointer ${isExpanded ? "bg-sky-500/5 text-sky-100" : "hover:bg-slate-900/60 text-slate-400 hover:text-slate-200"}`}
                                                        >
                                                            <td className="px-4 py-4 text-center border-r border-slate-900/50 text-slate-600 font-bold">{idx + 1}</td>
                                                            {columns.map((col) => (
                                                                <td key={col} className="px-4 py-4 whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis border-r border-slate-900/50 last:border-0 font-medium">
                                                                    {formatCellValue(row[col])}
                                                                </td>
                                                            ))}
                                                            <td className="px-4 py-4 text-center">
                                                                {isExpanded ? <ChevronUp className="w-4 h-4 text-sky-500 mx-auto" /> : <ChevronDown className="w-4 h-4 text-slate-700 mx-auto" />}
                                                            </td>
                                                        </tr>

                                                        {isExpanded && (
                                                            <tr className="bg-slate-900/80">
                                                                <td colSpan={columns.length + 2} className="p-0 border-b border-sky-500/20">
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <div className="px-8 py-8">
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                                                {columns.map(col => (
                                                                                    <div key={col} className="space-y-1.5 group">
                                                                                        <div className="flex items-center justify-between">
                                                                                            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{col}</label>
                                                                                            <button
                                                                                                onClick={(e) => {
                                                                                                    e.stopPropagation();
                                                                                                    navigator.clipboard.writeText(String(row[col]));
                                                                                                    alert('CELL_COPIED');
                                                                                                }}
                                                                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-sky-500 hover:text-sky-400"
                                                                                            >
                                                                                                <Copy className="w-3 h-3" />
                                                                                            </button>
                                                                                        </div>
                                                                                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 break-words whitespace-pre-wrap min-h-[50px] selection:bg-sky-500 selection:text-white">
                                                                                            {String(row[col] || '—')}
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            <div className="mt-8 flex justify-end gap-3">
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        navigator.clipboard.writeText(JSON.stringify(row, null, 2));
                                                                                        alert('ROW_OBJECT_COPIED');
                                                                                    }}
                                                                                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-black uppercase text-slate-300"
                                                                                >
                                                                                    <Code className="w-3 h-3" /> COPY_JSON_STREAM
                                                                                </button>
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        setExpandedRow(null);
                                                                                    }}
                                                                                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded-lg text-[10px] font-black uppercase text-white"
                                                                                >
                                                                                    CLOSE_INSPECTION
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 overflow-auto h-full shadow-inner">
                                <pre className="text-xs font-mono text-emerald-400 selection:bg-emerald-500 selection:text-slate-900 leading-relaxed">
                                    {JSON.stringify(filteredData, null, 2)}
                                </pre>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/40 text-[9px] font-mono text-slate-500 flex justify-between items-center">
                <div className="flex gap-6">
                    <span className="flex items-center gap-1.5"><Eye className="w-3 h-3" /> RESULTS_VIEWABLE: {filteredData.length}</span>
                    <span className="flex items-center gap-1.5"><Filter className="w-3 h-3" /> TARGET_COLLECTION: {activeTab.toUpperCase()}</span>
                </div>
                <div className="uppercase tracking-widest text-emerald-500 font-black">SYSTEM_ENCRYPTED_STREAM_ESTABLISHED</div>
            </div>
        </div>
    );
}
