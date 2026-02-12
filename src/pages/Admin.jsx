import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LayoutDashboard, FileText, Briefcase, Cpu, Database, Save, LogOut, CheckCircle, Table } from "lucide-react";
import { FORM_URLS } from "../data/config";
import AdminDataView from "../components/AdminDataView";

// Local Storage Key for form URLs - Updated to v2 to ensure config defaults load
const STORAGE_KEY = "admin_form_urls_v2";
// Load password from environment variable
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

const TABS = [
    { id: "blog", label: "New Blog Post", icon: FileText },
    { id: "project", label: "New Project", icon: Briefcase },
    { id: "skill", label: "New Skill", icon: Cpu },
    { id: "innovation", label: "New Innovation", icon: Database },
    { id: "data", label: "View Data", icon: Table },
];

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState("blog");
    // Initialize with values from config
    const [formUrls, setFormUrls] = useState(FORM_URLS);
    const [isEditingUrl, setIsEditingUrl] = useState(false);

    // Load saved URLs on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const savedUrls = JSON.parse(saved);
                // Merge saved URLs with current config to ensure we have all keys
                setFormUrls(prev => ({ ...prev, ...savedUrls }));
            } catch (e) {
                console.error("Failed to parse saved URLs");
            }
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASS) {
            setIsAuthenticated(true);
        } else {
            alert("Access Denied: Invalid Credentials");
        }
    };

    const handleSaveUrl = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formUrls));
        setIsEditingUrl(false);
        alert("Configuration Saved!");
    };

    const updateUrl = (key, value) => {
        setFormUrls(prev => ({ ...prev, [key]: value }));
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 to-emerald-500" />

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                            <Lock className="w-8 h-8 text-sky-500" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-100 uppercase tracking-tight">Admin Console</h1>
                        <p className="text-xs text-slate-500 mt-2 font-mono">AUTHORIZED PERSONNEL ONLY</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Access Key"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sky-400 placeholder:text-slate-600 outline-none focus:border-sky-500 transition-colors text-center font-mono tracking-widest"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-sky-900/20"
                        >
                            Authenticate
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const CurrentIcon = TABS.find(t => t.id === activeTab)?.icon || LayoutDashboard;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                            <LayoutDashboard className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">CMS Admin</h2>
                            <p className="text-[10px] text-emerald-500 font-mono">● ONLINE</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
                  ${isActive
                                        ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                                        : "text-slate-500 hover:bg-slate-800 hover:text-slate-300 border border-transparent"}`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-600'}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => setIsEditingUrl(!isEditingUrl)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase text-slate-500 hover:text-sky-400 transition-colors"
                    >
                        <Database className="w-3 h-3" />
                        Configure Form URLs
                    </button>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase text-red-500/60 hover:text-red-400 transition-colors mt-1"
                    >
                        <LogOut className="w-3 h-3" />
                        Terminate Session
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Top Bar for editing URLs */}
                <AnimatePresence>
                    {isEditingUrl && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-900 border-b border-slate-800 p-6 z-20 shadow-xl"
                        >
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Update Form Connectors</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                {Object.keys(formUrls).map(key => (
                                    <div key={key} className="space-y-1">
                                        <label className="text-[10px] font-mono text-slate-500 uppercase">{key.toUpperCase()} Form URL</label>
                                        <input
                                            type="text"
                                            value={formUrls[key]}
                                            onChange={(e) => updateUrl(key, e.target.value)}
                                            placeholder={`https://docs.google.com/forms/d/e/.../viewform`}
                                            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-sky-300 font-mono outline-none focus:border-sky-500"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleSaveUrl}
                                    className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-lg transition-colors"
                                >
                                    <Save className="w-3 h-3" /> Save Configuration
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content Area */}
                <div className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col">
                    {activeTab === "data" ? (
                        <AdminDataView />
                    ) : (
                        formUrls[activeTab] ? (
                            <iframe
                                src={formUrls[activeTab]}
                                className="w-full h-full border-0"
                                title="Content Entry Form"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                                    <CurrentIcon className="w-8 h-8 opacity-20" />
                                </div>
                                <p className="text-sm font-mono uppercase tracking-wider">No Form Configured</p>
                                <button
                                    onClick={() => setIsEditingUrl(true)}
                                    className="text-sky-500 hover:underline text-xs"
                                >
                                    Click to add Form URL
                                </button>
                            </div>
                        )
                    )}

                    {/* Status Indicator (Only for forms) */}
                    {activeTab !== "data" && (
                        <div className="absolute bottom-4 right-6 bg-slate-900/80 backdrop-blur border border-slate-800 px-3 py-1 rounded-full text-[10px] font-mono text-slate-500 flex items-center gap-2 pointer-events-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            SECURE_LINK_ESTABLISHED
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
