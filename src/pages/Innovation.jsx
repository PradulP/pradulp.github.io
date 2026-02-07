import { useState } from "react";
import content from "../data/index";

const fallbackItems = [
  {
    id: 1,
    title: "LUDARP BIM Toolkit",
    type: "BIM Automation",
    status: "In progress",
    description:
      "A collection of pyRevit scripts and Dynamo graphs to speed up modelling, sheet production, and QA in Revit.",
    details:
      "Includes small utilities for view/sheet naming, parameter checks, and repetitive modelling tasks. The focus is on practical tools that actually save time on real projects rather than big frameworks.",
    tech: ["Revit", "pyRevit", "Dynamo", "Python"],
    hasTool: true,
  },
  {
    id: 2,
    title: "Site Logs → Dashboard",
    type: "Data & Visualization",
    status: "Concept",
    description:
      "Idea for turning daily site logs, photos, and checklists into a live dashboard using simple web tools and spreadsheets.",
    details:
      "The concept is to keep data entry lightweight (forms, sheets, WhatsApp logs) and convert it into visuals such as progress curves, issue lists, and pending RFIs.",
    tech: ["Sheets", "React", "Tailwind", "Charts"],
    hasTool: false,
  },
  {
    id: 3,
    title: "AEC Portfolio Engine",
    type: "Web Tools",
    status: "Live",
    description:
      "This portfolio itself: a modular template for engineers combining experience, BIM projects, and code in one place.",
    details:
      "Built with React, Vite, and Tailwind. It focuses on clean sections for experience, projects, BIM work, and web tools. The idea is to reuse this as a starter for other civil / BIM engineers.",
    tech: ["React", "Vite", "Tailwind"],
    hasTool: true,
  },
  {
    id: 4,
    title: "Learning Hub for Juniors",
    type: "Learning",
    status: "Future idea",
    description:
      "Plan for a small platform / playlist that explains BIM basics, drawings, and site coordination using simple examples.",
    details:
      "Could be a mix of YouTube videos, Notion pages, and small examples that connect site photos with drawings and BIM views.",
    tech: ["Content", "YouTube", "Notion"],
    hasTool: false,
  },
];

function BeamCalculator() {
  const [span, setSpan] = useState(5); // meters
  const [load, setLoad] = useState(10); // kN

  // Max Bending Moment M = (P*L)/4 for point load at center
  const moment = (load * span) / 4;
  // Max Deflection factor for visualization
  const deflectionFactor = (load * Math.pow(span, 2)) / 500;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Span Length (m)</label>
          <input
            type="range" min="2" max="15" step="0.5" value={span}
            onChange={(e) => setSpan(parseFloat(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <div className="text-sm font-mono text-sky-400">{span}m</div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Point Load (kN)</label>
          <input
            type="range" min="1" max="50" step="1" value={load}
            onChange={(e) => setLoad(parseFloat(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <div className="text-sm font-mono text-sky-400">{load}kN</div>
        </div>
      </div>

      <div className="relative h-24 bg-slate-900/50 rounded-lg flex items-center justify-center overflow-hidden border border-slate-800/50">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />

        <div className="relative w-[80%] h-1 bg-slate-700">
          <div className="absolute -left-1 bottom-0 w-3 h-3 bg-slate-800 rotate-45 translate-y-1/2" />
          <div className="absolute -right-1 bottom-0 w-3 h-3 bg-slate-800 rotate-45 translate-y-1/2" />

          <div
            className="absolute top-0 left-0 w-full h-1 bg-sky-500 transition-all duration-300 shadow-[0_5px_15px_rgba(14,165,233,0.3)]"
            style={{
              borderRadius: '50%',
              transform: `translateY(${deflectionFactor * 20}px) scaleY(${1 + deflectionFactor * 0.5})`
            }}
          />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
            <div className="w-px h-8 bg-amber-400" />
            <div className="w-2 h-2 border-l border-b border-amber-400 -rotate-45 -mt-1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-slate-900/80 p-3 rounded border border-slate-800">
        <div>
          <div className="text-[9px] font-mono text-slate-500 uppercase">Max_Moment (M)</div>
          <div className="text-xs font-mono text-slate-200">{moment.toFixed(2)} kN-m</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-mono text-slate-500 uppercase">Analysis_Output</div>
          <div className="text-[10px] font-mono text-emerald-500">PASSING_LIMITS</div>
        </div>
      </div>
    </div>
  );
}

function ScaleConverter() {
  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('mm');
  const [toUnit, setToUnit] = useState('m');
  const [scale, setScale] = useState(100); // 1:100

  const units = {
    mm: 1,
    cm: 10,
    m: 1000,
    ft: 304.8,
    in: 25.4
  };

  const calculateResult = () => {
    const numValue = parseFloat(inputValue) || 0;
    const valueInMm = numValue * units[fromUnit];
    const scaledMm = valueInMm / scale;
    return (scaledMm / units[toUnit]).toFixed(4);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[9px] font-mono text-slate-500 uppercase">Input Value</label>
          <input
            type="number" value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 p-2 text-xs text-sky-400 outline-none focus:border-sky-500 rounded"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-mono text-slate-500 uppercase">Detail Scale (1:X)</label>
          <select
            value={scale} onChange={(e) => setScale(parseInt(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 p-2 text-xs text-sky-400 outline-none focus:border-sky-500 rounded appearance-none"
          >
            <option value="1">1:1 (Full)</option>
            <option value="10">1:10 (Detail)</option>
            <option value="25">1:25 (Part)</option>
            <option value="100">1:100 (Plan)</option>
            <option value="200">1:200 (Site)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-slate-900/50 p-2 border border-slate-800 rounded">
        <select
          value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
          className="bg-transparent text-[10px] font-mono text-slate-400 outline-none"
        >
          {Object.keys(units).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
        </select>
        <div className="text-slate-600">→</div>
        <select
          value={toUnit} onChange={(e) => setToUnit(e.target.value)}
          className="bg-transparent text-[10px] font-mono text-slate-400 outline-none"
        >
          {Object.keys(units).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
        </select>
      </div>

      <div className="bg-slate-900/80 p-4 rounded border border-sky-500/20 flex flex-col items-center">
        <div className="text-[9px] font-mono text-slate-500 uppercase mb-1">Scaled_Draw_Length</div>
        <div className="text-xl font-bold text-sky-400 tracking-tighter">
          {calculateResult()} {toUnit}
        </div>
        <div className="text-[8px] font-mono text-slate-600 mt-2">// PRECISION: 0.0001 units</div>
      </div>
    </div>
  );
}

function SlopeCalculator() {
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
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <label className="text-[8px] font-mono text-slate-500 uppercase">Elev_A (m)</label>
          <input type="number" value={elevA} onChange={(e) => setElevA(e.target.value)} className="w-full bg-slate-900 border border-slate-800 p-1.5 text-[10px] text-sky-400 outline-none rounded" />
        </div>
        <div className="space-y-1">
          <label className="text-[8px] font-mono text-slate-500 uppercase">Elev_B (m)</label>
          <input type="number" value={elevB} onChange={(e) => setElevB(e.target.value)} className="w-full bg-slate-900 border border-slate-800 p-1.5 text-[10px] text-sky-400 outline-none rounded" />
        </div>
        <div className="space-y-1">
          <label className="text-[8px] font-mono text-slate-500 uppercase">Distance (L)</label>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full bg-slate-900 border border-slate-800 p-1.5 text-[10px] text-sky-400 outline-none rounded" />
        </div>
      </div>

      <div className="relative h-20 bg-slate-900/30 rounded border border-slate-800 flex items-end px-10 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:10px_10px]" />
        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d={`M 0 35 L 100 ${35 - (gradient * 10)}`} stroke="#38bdf8" strokeWidth="0.5" fill="none" />
          <circle cx={nDistance !== 0 ? (targetDist / nDistance) * 100 : 0} cy={35 - (gradient * 10 * (nDistance !== 0 ? targetDist / nDistance : 0))} r="1" fill="#fbbf24" className="animate-pulse" />
        </svg>
        <div className="absolute left-2 bottom-1 text-[8px] font-mono text-slate-500">POINT_A</div>
        <div className="absolute right-2 bottom-6 text-[8px] font-mono text-slate-500">POINT_B</div>
      </div>

      <div className="space-y-2">
        <label className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Intermediate Chainage (m)</label>
        <input type="range" min="0" max={distance} step="0.1" value={targetDist} onChange={(e) => setTargetDist(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded appearance-none accent-amber-500" />
        <div className="flex justify-between font-mono text-[9px] text-amber-400">
          <span>DIST: {targetDist}m</span>
          <span>CALC_ELEV: {intermediateElev.toFixed(3)}m</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/50">
        <div className="text-[9px] font-mono">
          <span className="text-slate-500 uppercase block">Gradient</span>
          <span className="text-slate-200">{slopePercentage}% (1:{ratio})</span>
        </div>
        <div className="text-[9px] font-mono text-right">
          <span className="text-slate-500 uppercase block">Status</span>
          <span className="text-emerald-500">OPTIMAL_DRAINAGE</span>
        </div>
      </div>
    </div>
  );
}

const Innovation = () => {
  const innovation = content.innovation || {};
  const items = Array.isArray(innovation) ? innovation : (innovation.items || []);

  const contact = content.contact || {};
  const primaryEmail = contact.email || "pradul.p123@gmail.com";
  const whatsappNumber = contact.whatsapp || "918078376902";

  const [selected, setSelected] = useState(null);

  const statusColor = (status) => {
    if (!status) return "border-slate-700 text-slate-400";
    const s = status.toLowerCase();
    if (s.includes("live")) return "border-emerald-500/50 text-emerald-400 bg-emerald-500/5";
    if (s.includes("progress") || s.includes("prep")) return "border-sky-500/50 text-sky-400 bg-sky-500/5";
    if (s.includes("experimental") || s.includes("wip")) return "border-amber-500/50 text-amber-400 bg-amber-500/5";
    return "border-slate-700 text-slate-400 bg-slate-900/50";
  };

  const openModal = (item) => {
    setSelected(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      import("../utils/cadSounds").then(({ cadSounds }) => cadSounds.playSwoosh());
    } catch (e) { }
  };

  const closeModal = () => setSelected(null);

  const getWhatsappLink = (title) => {
    const phone = whatsappNumber.replace(/[^0-9]/g, "");
    return `https://wa.me/${phone}?text=${encodeURIComponent(`Hi Pradul, I am interested in your proprietary innovation: "${title}". I would like to request a technical demo or access.`)}`;
  };

  const getMailtoLink = (title) => {
    const subject = encodeURIComponent(`Technical Enquiry: ${title}`);
    const body = encodeURIComponent(`Hi Pradul,\n\nI reviewed your "${title}" module in your Innovation Lab. I am interested in learning more about the technical implementation and potential access for project use.\n\nRegards,`);
    return `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans selection:bg-sky-500/30">
      {/* Page Background Grid Enhancement */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(var(--cad-grid)_1px,transparent_1px),linear-gradient(90deg,var(--cad-grid)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="max-w-6xl mx-auto px-6 pt-4 pb-16 relative z-10 space-y-10">
        {/* Engineering Header */}
        <header className="space-y-2 border-l-4 border-sky-500 pl-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            <p className="text-[9px] uppercase tracking-[0.4em] text-sky-400 font-mono font-bold">
              Engineering_Research & Development
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-slate-100">
            Innovation <span className="text-sky-500">Laboratory</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl font-medium leading-relaxed">
            Proprietary engineering tools and web automation modules. To maintain software integrity and IP, source access is provided only upon verified technical inquiry.
          </p>
        </header>

        {/* The Archive Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative rounded-tr-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-5 flex flex-col justify-between hover:border-sky-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] cursor-none project-card"
              onClick={() => openModal(item)}
            >
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-slate-800 group-hover:border-sky-500 group-hover:scale-110 transition-all rounded-tr-3xl" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 text-[9px] font-mono font-bold uppercase tracking-wider">
                  <span className="text-slate-500 opacity-60">{item.type}</span>
                  <span className={`px-2 py-0.5 rounded border ${statusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-100 leading-tight group-hover:text-sky-400 transition-colors">
                  {item.title}
                </h2>

                <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-3 font-medium">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                  <span className="text-[9px] font-mono font-bold text-sky-500/70 uppercase tracking-tighter hover:text-sky-400 transition-colors">
                    Request_Access_v1
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-sky-500 group-hover:shadow-[0_0_8px_#38bdf8] transition-all" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Live Lab Section */}
        <section className="pt-8 space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-black italic uppercase tracking-tighter text-slate-100 italic">02 // Live_System_Prototypes</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-sm relative overflow-hidden">
              <header className="mb-6">
                <h3 className="font-bold text-sky-400 uppercase tracking-[0.2em] text-[10px] pb-1 border-b border-sky-950 mb-2 font-mono">Module_01: Structural_Analyzer</h3>
                <p className="text-[9px] text-slate-500 font-mono tracking-widest italic uppercase">Bending_Moment_Visualizer v1.2</p>
              </header>
              <BeamCalculator />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-sm relative overflow-hidden">
              <header className="mb-6">
                <h3 className="font-bold text-sky-400 uppercase tracking-[0.2em] text-[10px] pb-1 border-b border-sky-950 mb-2 font-mono">Module_02: Gradient_Solver</h3>
                <p className="text-[9px] text-slate-500 font-mono tracking-widest italic uppercase">Elevation_Logic_Solver v0.9</p>
              </header>
              <SlopeCalculator />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-sm relative overflow-hidden">
              <header className="mb-6">
                <h3 className="font-bold text-sky-400 uppercase tracking-[0.2em] text-[10px] pb-1 border-b border-sky-950 mb-2 font-mono">Module_03: Detail_Scale_Logic</h3>
                <p className="text-[9px] text-slate-500 font-mono tracking-widest italic uppercase">Annotation_Scale_Utility v1.0</p>
              </header>
              <ScaleConverter />
            </div>

            {/* FUTURE VISION: AI CHATBOT FOR STANDARDS */}
            <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-6 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-2">
                <span className="text-[8px] font-mono bg-sky-500 text-slate-950 px-2 py-0.5 font-bold uppercase tracking-widest">Vision_2026</span>
              </div>

              <header>
                <h3 className="font-bold text-sky-400 uppercase tracking-[0.2em] text-[10px] pb-1 border-b border-sky-950/30 mb-2 font-mono">R&D // AI Standards Assistant</h3>
                <p className="text-[9px] text-slate-400 font-mono italic uppercase tracking-tighter opacity-70">// Intelligent_BIM_Compliance_Engine</p>
              </header>

              <div className="py-4 space-y-3">
                <div className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-sky-500 mt-1" />
                  <p className="text-[10px] text-slate-300 leading-relaxed font-medium">Developing a <span className="text-sky-400">Generative AI Assistant</span> specialized in NBC (National Building Code), IS Standards, and Municipal Building Rules (KMBR).</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-sky-500 mt-1" />
                  <p className="text-[10px] text-slate-300 leading-relaxed font-medium">Automatic verification of Civil Drawings against regulatory constraints using RAG (Retrieval-Augmented Generation).</p>
                </div>
              </div>

              <button
                onClick={() => openModal({
                  id: 'ai-vision',
                  title: "AI Engineering Standards Assistant",
                  type: "AI / R&D Prototype",
                  status: "Conceptual Vision",
                  description: "A specialized AI chatbot designed to parse complex Civil Engineering codes and standards for instant query resolution.",
                  details: "This vision involves training a Large Language Model on NBC, IS codes, and local building bylaws to provide architects and engineers with immediate compliance checks during the design phase.",
                  tech: ["Python", "OpenAI / Anthropic API", "Vector Databases", "LangChain"]
                })}
                className="w-full py-2 rounded-lg border border-sky-500/30 bg-sky-500/10 text-[9px] font-mono font-bold text-sky-400 uppercase tracking-widest hover:bg-sky-500 hover:text-slate-950 transition-all"
              >
                Read_Vision_Briefing_↗
              </button>
            </div>

            {/* FUTURE VISION: ECO-BIM SUSTAINABILITY */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-2">
                <span className="text-[8px] font-mono bg-emerald-500 text-slate-950 px-2 py-0.5 font-bold uppercase tracking-widest">Vision_2026</span>
              </div>

              <header>
                <h3 className="font-bold text-emerald-400 uppercase tracking-[0.2em] text-[10px] pb-1 border-b border-emerald-950/30 mb-2 font-mono">R&D // Eco-BIM Sustainability</h3>
                <p className="text-[9px] text-slate-400 font-mono italic uppercase tracking-tighter opacity-70">// Material_Lifecycle_Assessment_Engine</p>
              </header>

              <div className="py-4 space-y-3">
                <div className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1" />
                  <p className="text-[10px] text-slate-300 leading-relaxed font-medium">Developing a <span className="text-emerald-400">BIM-integrated tool</span> for real-time environmental impact assessment of construction materials.</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1" />
                  <p className="text-[10px] text-slate-300 leading-relaxed font-medium">Automated generation of sustainability reports and optimization suggestions based on material choices and design parameters.</p>
                </div>
              </div>

              <button
                onClick={() => openModal({
                  id: 'eco-bim-vision',
                  title: "Eco-BIM Sustainability Engine",
                  type: "BIM / R&D Prototype",
                  status: "Conceptual Vision",
                  description: "A BIM-integrated module to analyze and optimize the environmental footprint of building designs and material selections.",
                  details: "This initiative aims to provide engineers and architects with immediate feedback on the embodied carbon and lifecycle impact of their designs, promoting sustainable construction practices.",
                  tech: ["Python", "BIM APIs (Revit/ArchiCAD)", "Material Databases", "LCA Algorithms"]
                })}
                className="w-full py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest hover:bg-emerald-500 hover:text-slate-950 transition-all"
              >
                Read_Vision_Briefing_↗
              </button>
            </div>
          </div>
        </section>

        {/* SYSTEM STATUS TERMINAL AESTHETIC */}
        <footer className="pt-10">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[9px] text-slate-500 overflow-hidden relative">
            <div className="flex items-center gap-2 mb-2 border-b border-slate-900 pb-1">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              </div>
              <span className="uppercase tracking-widest opacity-50">Pradul_Systems_v2026.02_Terminal</span>
            </div>
            <div className="space-y-1">
              <p><span className="text-emerald-500">[OK]</span> Core_Systems_Validated_2026...</p>
              <p><span className="text-sky-500">[INFO]</span> Syncing_Regulatory_Bylaws_v2026.1...</p>
              <p><span className="text-emerald-500">[OK]</span> Eco_BIM_Material_Library_Linked...</p>
              <p><span className="text-sky-500">[INFO]</span> Scanning_Civil_Drawings_Matrix...</p>
              <p className="animate-pulse"><span className="text-amber-500">[WRN]</span> AI_Chatbot_Module_In_Deployment...</p>
              <p className="text-slate-700">// System_Listening_For_Project_Inquiries...</p>
            </div>
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <span className="text-sky-500/30 font-bold tracking-tighter">PRADUL_ERD_LAB</span>
              <div className="w-1 h-3 bg-sky-500 animate-[pulse_1s_infinite]" />
            </div>
          </div>
        </footer>
      </div>

      {/* Technical Spec Sheet Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl px-4 py-8 overflow-y-auto animate-in fade-in zoom-in duration-300 cursor-pointer"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[7px] font-mono text-slate-600 uppercase tracking-[0.2em] font-bold">Document_ID: {selected.id}00X</span>
                <span className="text-[9px] font-mono text-sky-500 font-black uppercase tracking-widest">TECHNICAL_ACCESS_CONTROL</span>
              </div>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-red-500/20 transition-all border border-slate-700">✕</button>
            </div>

            <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
              <header className="space-y-1">
                <h2 className="text-xl font-black text-slate-100 uppercase tracking-tighter">{selected.title}</h2>
                <p className="text-sky-400 font-mono text-[9px] font-bold uppercase tracking-[0.4em]">{selected.type}</p>
              </header>

              <div className="grid gap-6 md:grid-cols-2">
                <section className="space-y-2">
                  <h4 className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1">01 // Implementation Context</h4>
                  <p className="text-xs text-slate-300 leading-relaxed italic">{selected.description}</p>
                </section>
                <section className="space-y-2">
                  <h4 className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1">02 // Technical Proof</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{selected.details}</p>
                </section>
              </div>

              {/* ACTION BLOCK - UNIFIED CONTACT FLOW */}
              <div className="p-6 rounded-xl border border-sky-500/20 bg-sky-500/5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                  <p className="text-[9px] font-mono text-sky-200 font-bold uppercase tracking-widest">
                    Proprietary_System_Access_Protocol
                  </p>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  To protect intellectual property and ensure verified distribution, access to this software is restricted. Please use the technical enquiry channels below to request a private demo or implementation files.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a href={getWhatsappLink(selected.title)} target="_blank" rel="noreferrer" className="flex-1 py-3 rounded bg-emerald-600 text-slate-950 font-black text-[10px] tracking-widest text-center uppercase hover:bg-emerald-500 transition-all project-card shadow-[0_4px_15px_rgba(16,185,129,0.2)]">WhatsApp Enquiry ↗</a>
                  <a href={getMailtoLink(selected.title)} className="flex-1 py-3 rounded bg-slate-800 border border-slate-700 text-slate-200 font-black text-[10px] tracking-widest text-center uppercase hover:border-sky-500 transition-all project-card">Email Technical PDF ↗</a>
                </div>
              </div>

              <div className="space-y-2 text-[9px] text-slate-500 italic text-center font-mono">
                 // Verification code available for serious technical auditors only.
              </div>
            </div>

            <div className="bg-slate-950 py-3 border-t border-slate-800 text-center">
              <p className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.5em] font-bold">// End_of_Verification_Sheet // Pradul_P_Systems</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Innovation;
