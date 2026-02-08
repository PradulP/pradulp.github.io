import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import content from "../data/index";
import Typewriter from "../components/Typewriter";
import { ChevronRight, ExternalLink, Atom, Cpu, Code2, Globe, Database, Terminal, Zap, Lock, MessageCircle, Mail } from "lucide-react";

// Existing Calculators...
const BeamCalculator = () => {
  const [span, setSpan] = useState(5); // meters
  const [load, setLoad] = useState(10); // kN

  // Max Bending Moment M = (P*L)/4 for point load at center
  const moment = (load * span) / 4;
  // Max Deflection factor for visualization
  const deflectionFactor = (load * Math.pow(span, 2)) / 500;

  return (
    <div className="space-y-6 select-none bg-slate-900/40 p-4 rounded-xl border border-slate-800/50 hover:border-sky-500/20 transition-colors">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex justify-between">
            <span>Span (L)</span>
            <span className="text-sky-400 font-bold">{span}m</span>
          </label>
          <input
            type="range" min="2" max="15" step="0.5" value={span}
            onChange={(e) => setSpan(parseFloat(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 hover:accent-sky-400"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex justify-between">
            <span>Load (P)</span>
            <span className="text-sky-400 font-bold">{load}kN</span>
          </label>
          <input
            type="range" min="1" max="50" step="1" value={load}
            onChange={(e) => setLoad(parseFloat(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 hover:accent-sky-400"
          />
        </div>
      </div>

      <div className="relative h-24 bg-slate-950/80 rounded-lg flex items-center justify-center overflow-hidden border border-slate-800 shadow-inner">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />

        <div className="relative w-[80%] h-1 bg-slate-700">
          <div className="absolute -left-1 bottom-0 w-3 h-3 bg-slate-600 rotate-45 translate-y-1/2 border border-slate-500" />
          <div className="absolute -right-1 bottom-0 w-3 h-3 bg-slate-600 rotate-45 translate-y-1/2 border border-slate-500" />

          <div
            className="absolute top-0 left-0 w-full h-1 bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-300 ease-out"
            style={{
              borderRadius: '50%',
              transform: `translateY(${deflectionFactor * 20}px) scaleY(${1 + deflectionFactor * 0.5})`
            }}
          />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center opacity-80">
            <div className="w-px h-8 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            <div className="w-2 h-2 border-l border-b border-amber-400 -rotate-45 -mt-1" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800/50 font-mono text-[10px]">
        <div>
          <div className="text-slate-500 uppercase tracking-wider">Bending Moment</div>
          <div className="text-sm text-sky-400 font-bold mt-0.5">{moment.toFixed(2)} kN-m</div>
        </div>
        <div className="text-right">
          <div className="text-slate-500 uppercase tracking-wider">Status</div>
          <div className="text-emerald-500 font-bold mt-0.5 animate-pulse">OPTIMAL</div>
        </div>
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
  const ratio = gradient !== 0 ? (1 / Math.abs(gradient)).toFixed(1) : "0";

  return (
    <div className="space-y-4 select-none bg-slate-900/40 p-4 rounded-xl border border-slate-800/50 hover:border-emerald-500/20 transition-colors">
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <label className="text-[8px] font-mono text-slate-500 uppercase">Elev_A (m)</label>
          <input type="number" value={elevA} onChange={(e) => setElevA(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-1.5 text-[10px] text-emerald-400 outline-none rounded focus:border-emerald-500 transition-colors" />
        </div>
        <div className="space-y-1">
          <label className="text-[8px] font-mono text-slate-500 uppercase">Elev_B (m)</label>
          <input type="number" value={elevB} onChange={(e) => setElevB(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-1.5 text-[10px] text-emerald-400 outline-none rounded focus:border-emerald-500 transition-colors" />
        </div>
        <div className="space-y-1">
          <label className="text-[8px] font-mono text-slate-500 uppercase">Dist (L)</label>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-1.5 text-[10px] text-emerald-400 outline-none rounded focus:border-emerald-500 transition-colors" />
        </div>
      </div>

      <div className="relative h-20 bg-slate-950/80 rounded-lg border border-slate-800 flex items-end px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:10px_10px]" />
        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d={`M 0 35 L 100 ${35 - (gradient * 10)}`} stroke="#10b981" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
          <circle cx={nDistance !== 0 ? (targetDist / nDistance) * 100 : 0} cy={35 - (gradient * 10 * (nDistance !== 0 ? targetDist / nDistance : 0))} r="2" fill="#fbbf24" className="animate-pulse shadow-[0_0_10px_#fbbf24]" />
        </svg>
        <div className="absolute left-2 bottom-1 text-[8px] font-mono text-slate-500">A</div>
        <div className="absolute right-2 bottom-6 text-[8px] font-mono text-slate-500">B</div>
      </div>

      <div className="space-y-2">
        <label className="text-[8px] font-mono text-slate-500 uppercase tracking-widest flex justify-between">
          <span>Scan Position</span>
          <span className="text-amber-400">{targetDist}m</span>
        </label>
        <input type="range" min="0" max={distance} step="0.1" value={targetDist} onChange={(e) => setTargetDist(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded appearance-none accent-amber-500 cursor-pointer" />
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/50 text-[9px] font-mono">
        <div>
          <span className="text-slate-500 uppercase block">Calculated Elev</span>
          <span className="text-emerald-400 font-bold text-xs">{intermediateElev.toFixed(3)}m</span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 uppercase block">Gradient</span>
          <span className="text-slate-300 font-bold">{slopePercentage}%</span>
        </div>
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
        <div className="space-y-1">
          <label className="text-[9px] font-mono text-slate-500 uppercase">Input</label>
          <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-2 text-xs text-sky-400 outline-none focus:border-sky-500 rounded transition-colors" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-mono text-slate-500 uppercase">Scale (1:X)</label>
          <select value={scale} onChange={(e) => setScale(parseInt(e.target.value))} className="w-full bg-slate-950 border border-slate-700 p-2 text-xs text-sky-400 outline-none focus:border-sky-500 rounded transition-colors" >
            <option value="1">1:1</option>
            <option value="10">1:10</option>
            <option value="50">1:50</option>
            <option value="100">1:100</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-950/80 p-4 rounded-lg border border-sky-500/20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-sky-500/5 animate-pulse" />
        <div className="relative z-10">
          <div className="text-[9px] font-mono text-slate-500 uppercase mb-1">Scaled Output</div>
          <div className="text-xl font-black text-sky-400 tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
            {calculateResult()} <span className="text-xs text-sky-600">{toUnit}</span>
          </div>
        </div>
      </div>
    </div>
  )
}


const Innovation = () => {
  const { innovation, contact } = content;
  const items = Array.isArray(innovation) ? innovation : (innovation.items || []);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // Animation States
  const [showTitle, setShowTitle] = useState(false);
  const [showSub, setShowSub] = useState(false);

  const statusColor = (status) => {
    if (!status) return "border-slate-700 text-slate-400";
    const s = status.toLowerCase();
    if (s.includes("live")) return "border-emerald-500/50 text-emerald-400 bg-emerald-500/5 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
    if (s.includes("progress")) return "border-sky-500/50 text-sky-400 bg-sky-500/5";
    return "border-slate-700 text-slate-400 bg-slate-900/50";
  };

  const openModal = (item) => {
    setSelected(item);
    document.body.style.overflow = "hidden";
    try {
      import("../utils/cadSounds").then(({ cadSounds }) => cadSounds.playSwoosh());
    } catch (e) { }
  };

  const closeModal = () => {
    setSelected(null);
    document.body.style.overflow = "unset";
  };

  // Handle Contact Page Redirect
  const handleContactRedirect = () => {
    if (!selected) return;
    const message = `RE: Access Request for ${selected.title} (ID: ${selected.id}-SYS). \n\nI am interested in learning more about this system.`;
    navigate(`/contact?msg=${encodeURIComponent(message)}&topic=innovation`);
  };

  // Handle WhatsApp Action
  const handleWhatsApp = () => {
    if (!selected) return;
    const phone = contact?.whatsapp?.replace(/[^0-9]/g, "") || "918078376902";
    const text = `Hello Pradul, I'd like to request access to: ${selected.title} (${selected.id}-SYS).`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Auto-typing sequence
  useEffect(() => {
    // Ensure scroll behavior resets on unmount
    return () => { document.body.style.overflow = "unset"; }
  }, []);


  return (
    <main className="min-h-screen relative overflow-hidden pb-20 bg-slate-950 selection:bg-sky-500/30">

      {/* Background CAD Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(var(--cad-grid)_1px,transparent_1px),linear-gradient(90deg,var(--cad-grid)_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* Floating Orbs for Ambience */}
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 relative z-10 space-y-16">

        {/* HEADER SECTION */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_10px_#0ea5e9]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-sky-400">
              Engineering_R&D_Division
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black italic text-slate-100 uppercase tracking-tighter leading-none">
            <Typewriter text="Innovation" delay={100} speed={80} onComplete={() => setShowTitle(true)} />
            <br />
            {showTitle && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                <Typewriter text="Laboratory" speed={80} onComplete={() => setShowSub(true)} />
              </span>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showSub ? 1 : 0, y: showSub ? 0 : 10 }}
            transition={{ duration: 0.5 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl font-medium leading-relaxed border-l-2 border-slate-800 pl-4"
          >
            Proprietary engineering tools, automation scripts, and web-based utilities designed to solve real-world AEC challenges. Access to source code is restricted to authorized partners.
          </motion.p>
        </header>

        {/* ARCHIVE GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={item.id}
              onClick={() => openModal(item)}
              className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-sky-500/50 hover:bg-slate-900/60 transition-all duration-300 cursor-pointer overflow-hidden project-card"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-transparent to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded border ${statusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-slate-600 group-hover:text-sky-400 transition-colors">
                      <Database className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight group-hover:text-sky-300 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider group-hover:text-sky-400 transition-colors">
                  <span>Read_Technical_Brief</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* LIVE MODULES SECTION */}
        <section className="pt-12 space-y-10 border-t border-slate-900">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black italic text-slate-100 uppercase tracking-tighter flex items-center gap-3">
                <Atom className="w-6 h-6 text-sky-500 animate-spin-slow" />
                Live Prototypes
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-2 uppercase tracking-widest">// Interactive_Engineering_Utilities_v2.0</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Module 1 */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-1 backdrop-blur-sm group hover:border-sky-500/30 transition-all">
              <div className="bg-slate-900/60 rounded-xl p-4 mb-1 border-b border-slate-800/50">
                <h3 className="text-xs font-bold text-sky-100 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-sky-500" /> Structural_Analyzer
                </h3>
              </div>
              <div className="p-4">
                <BeamCalculator />
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-1 backdrop-blur-sm group hover:border-emerald-500/30 transition-all">
              <div className="bg-slate-900/60 rounded-xl p-4 mb-1 border-b border-slate-800/50">
                <h3 className="text-xs font-bold text-emerald-100 uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-3 h-3 text-emerald-500" /> Gradient_Solver
                </h3>
              </div>
              <div className="p-4">
                <SlopeCalculator />
              </div>
            </div>

            {/* Module 3 */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-1 backdrop-blur-sm group hover:border-amber-500/30 transition-all">
              <div className="bg-slate-900/60 rounded-xl p-4 mb-1 border-b border-slate-800/50">
                <h3 className="text-xs font-bold text-amber-100 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-3 h-3 text-amber-500" /> Site_Scale_Logic
                </h3>
              </div>
              <div className="p-4">
                <ScaleConverter />
              </div>
            </div>
          </div>
        </section>

        {/* FUTURE VISION CARDS (AI) */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900/20 p-8 group">
            <div className="absolute top-0 right-0 p-4 opacity-50"><Cpu className="w-12 h-12 text-sky-500/20" /></div>
            <div className="relative z-10 space-y-4">
              <span className="px-2 py-1 rounded bg-sky-500/10 text-sky-400 text-[9px] font-mono font-bold uppercase tracking-widest border border-sky-500/20">Future Vision</span>
              <h3 className="text-xl font-bold text-slate-100 uppercase italic">AI Standards Assistant</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Developing a Generative AI engine trained on NBC & IS Codes to provide instant compliance checks for architects.</p>
              <button className="text-[10px] font-bold text-sky-400 uppercase tracking-widest border-b border-sky-500/20 pb-0.5 hover:text-sky-300 transition-colors">Read Briefing →</button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-900/20 p-8 group">
            <div className="absolute top-0 right-0 p-4 opacity-50"><Globe className="w-12 h-12 text-emerald-500/20" /></div>
            <div className="relative z-10 space-y-4">
              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold uppercase tracking-widest border border-emerald-500/20">Sustainability</span>
              <h3 className="text-xl font-bold text-slate-100 uppercase italic">Eco-BIM Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Integrated lifecycle assessment tool for immediate carbon footprint analysis during design phase.</p>
              <button className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-0.5 hover:text-emerald-300 transition-colors">Read Briefing →</button>
            </div>
          </div>
        </section>

      </div>

      {/* TECHNICAL MODAL - FINAL FIXED SCROLL & ACTIONS */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-slate-950/90 backdrop-blur-xl overflow-y-auto"
            onClick={closeModal}
          >
            {/* 
               CRITICAL FIX: 
               - 'min-h-screen' ensures the container fills the window.
               - 'items-start' (instead of center) allows the modal to start from the top.
               - 'pt-20 md:pt-32' adds safe padding at the top so it doesn't touch the edge.
               - 'pb-20' ensures scrolling to bottom is clear.
            */}
            <div className="min-h-screen w-full flex items-start justify-center pt-24 pb-20 px-4 md:px-6">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden relative flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950 sticky top-0 z-20">
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-sky-500" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">{selected.title}</h3>
                      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">ID: {selected.id}-SYS</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-slate-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 md:p-8 space-y-8 bg-slate-900">
                  <div className="flex flex-wrap gap-2">
                    {selected.tech?.map(t => (
                      <span key={t} className="px-2 py-1 bg-slate-950 text-slate-300 text-[10px] uppercase font-bold rounded border border-slate-800 shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div className="p-5 bg-slate-950/50 rounded-xl border border-slate-800/50 hover:border-sky-500/20 transition-colors">
                      <h4 className="text-[10px] font-mono text-sky-500 font-bold uppercase mb-2 flex items-center gap-2">
                        <Code2 className="w-3 h-3" /> System Description
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{selected.description}</p>
                    </div>
                    <div className="p-5 bg-slate-950/50 rounded-xl border border-slate-800/50 hover:border-sky-500/20 transition-colors">
                      <h4 className="text-[10px] font-mono text-sky-500 font-bold uppercase mb-2 flex items-center gap-2">
                        <Cpu className="w-3 h-3" /> Technical Implementation
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{selected.details}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleContactRedirect}
                      className="flex-1 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-900/20 hover:shadow-sky-500/20 hover:-translate-y-0.5"
                    >
                      <Mail className="w-3.5 h-3.5" /> Request per Email
                    </button>

                    <button
                      onClick={handleWhatsApp}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/20 hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Request per WhatsApp
                    </button>
                  </div>
                </div>

                {/* Footer Decoration */}
                <div className="bg-slate-950 py-2 text-center border-t border-slate-800">
                  <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">// End_Of_Brief</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Innovation;
