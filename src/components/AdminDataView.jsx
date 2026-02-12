import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, RefreshCw, FileText, Check, AlertCircle, Database, LayoutList, Code, ExternalLink } from "lucide-react";
import useGoogleCMS from "../hooks/useGoogleCMS";

import { FORM_URLS } from "../data/config";

const TABS = [
    { id: "blog", label: "Blog Posts" },
    { id: "project", label: "Projects" },
    { id: "skill", label: "Skills" },
    { id: "innovation", label: "Innovations" },
];

export default function AdminDataView() {
    const [activeTab, setActiveTab] = useState("blog");
    const [refreshKey, setRefreshKey] = useState(0);
    const [viewMode, setViewMode] = useState("table"); // 'table' or 'json'

    const { data, loading, error, refetch } = useGoogleCMS(activeTab, true); // true = skipCache

    const handleRefresh = () => {
        refetch();
    };

    // Helper to get columns from data
    const getColumns = (items) => {
        if (!items || items.length === 0) return [];
        return Object.keys(items[0]);
    };

    const columns = getColumns(data);
    const currentFormUrl = FORM_URLS[activeTab];

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200">
            {/* Header / Controls */}
            <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                        <Database className="w-5 h-5 text-sky-500" />
                        Data Explorer
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                        VIEWING LIVE DATA FRO GOOGLE SHEETS
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="https://docs.google.com/spreadsheets/d/1CVKjh7ECr1qi-bnYuwVnrpYvdAuEo3OONnqLe_EDZLE/edit?gid=497469559#gid=497469559"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-emerald-900/20 border border-emerald-500/30 hover:bg-emerald-900/40 rounded-lg text-xs font-mono text-emerald-400 transition-colors"
                        title="Open Google Sheet Database"
                    >
                        <ExternalLink className="w-4 h-4" />
                        OPEN SHEET
                    </a>
                    {currentFormUrl && (
                        <a
                            href={currentFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-sky-900/20 border border-sky-500/30 hover:bg-sky-900/40 rounded-lg text-xs font-mono text-sky-400 transition-colors"
                            title="Open Google Form for this section"
                        >
                            <FileText className="w-4 h-4" />
                            OPEN FORM
                        </a>
                    )}
                    <button
                        onClick={() => setViewMode(viewMode === "table" ? "json" : "table")}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-xs font-mono text-slate-400 transition-colors"
                    >
                        {viewMode === "table" ? <Code className="w-4 h-4" /> : <LayoutList className="w-4 h-4" />}
                        {viewMode === "table" ? "JSON VIEW" : "TABLE VIEW"}
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-xs font-mono text-sky-400 transition-colors"
                        title="Reloads the page to fetch fresh data"
                    >
                        <RefreshCw className="w-4 h-4" />
                        REFRESH
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-4 flex gap-2 overflow-x-auto border-b border-slate-800">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === tab.id
                            ? "border-sky-500 text-sky-400"
                            : "border-transparent text-slate-500 hover:text-slate-300"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-slate-950 p-6 relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-10">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-xs font-mono text-sky-500 animate-pulse">FETCHING DATA...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center h-full text-red-500 space-y-2">
                        <AlertCircle className="w-8 h-8" />
                        <p className="font-mono text-sm">FAILED TO LOAD DATA</p>
                        <p className="text-xs text-slate-500">{error.message}</p>
                    </div>
                )}

                {!loading && !error && data.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-2">
                        <Database className="w-12 h-12 opacity-20" />
                        <p className="font-mono text-xs uppercase">No Data Found in this Collection</p>
                    </div>
                )}

                {!loading && !error && data.length > 0 && (
                    viewMode === "table" ? (
                        <div className="border border-slate-800 rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs font-mono">
                                    <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                                        <tr>
                                            <th className="px-4 py-3 w-12 text-center">#</th>
                                            {columns.map((col) => (
                                                <th key={col} className="px-4 py-3 whitespace-nowrap border-r border-slate-800 last:border-0">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-900">
                                        {data.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                                                <td className="px-4 py-3 text-center text-slate-600">{idx + 1}</td>
                                                {columns.map((col) => (
                                                    <td key={col} className="px-4 py-3 whitespace-nowrap text-slate-300 max-w-xs overflow-hidden text-ellipsis border-r border-slate-800/50 last:border-0" title={row[col]}>
                                                        {typeof row[col] === 'boolean' ? (row[col] ? 'TRUE' : 'FALSE') : String(row[col])}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 overflow-auto h-full">
                            <pre className="text-xs font-mono text-emerald-400">
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </div>
                    )
                )}
            </div>

            <div className="px-6 py-2 border-t border-slate-800 bg-slate-900/50 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>TOTAL RECORDS: {data.length}</span>
                <span>SOURCE: GOOGLE SHEETS API</span>
            </div>
        </div>
    );
}
