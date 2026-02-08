import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import db from "../data/Projects.json";
import SEOHelmet from "../components/SEOHelmet";
import ProjectImageCarousel from "../components/ProjectImageCarousel";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Terminal,
  Cpu,
  Box,
  Image as ImageIcon,
  PlayCircle,
  Globe,
  FileText,
  Layers,
  User,
  Calendar
} from "lucide-react";

function isYouTube(url = "") {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  );
}

function getYouTubeEmbedUrl(url = "") {
  if (!url) return null;
  if (url.includes("playlist?list=")) {
    const listId = url.split("list=")[1].split("&")[0];
    return `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }
  if (url.includes("watch?v=") && url.includes("list=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    const listId = url.split("list=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?list=${listId}`;
  }
  if (url.includes("watch?v=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projects = db.projects || [];
  const index = useMemo(
    () => projects.findIndex(p => String(p.id) === String(id)),
    [projects, id]
  );

  const project = projects[index];
  const prevProject = projects[index - 1];
  const nextProject = projects[index + 1];

  if (!project) {
    return (
      <main className="min-h-screen pt-32 text-center bg-slate-950">
        <div className="inline-block p-8 border border-slate-800 rounded-3xl bg-slate-900/50">
          <Terminal className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h2 className="text-xl font-black italic text-slate-100 uppercase tracking-tighter">Project Not Found</h2>
          <p className="text-slate-500 text-sm mt-2">The requested ID does not exist in the database.</p>
          <Link to="/projects" className="mt-6 inline-block px-6 py-2 bg-sky-500 text-slate-950 rounded-lg font-bold text-xs uppercase tracking-widest">Return to Database</Link>
        </div>
      </main>
    );
  }

  const {
    title,
    subtitle,
    type,
    year,
    role,
    summary,
    highlights,
    tech,
    images = [],
    model,
    links
  } = project;

  const modelSrc = typeof model === "object" ? model?.src : model;
  const youtubeEmbed = getYouTubeEmbedUrl(links?.demo);

  const [activeMedia, setActiveMedia] = useState(
    images.length ? "images" : modelSrc ? "model" : "video"
  );
  const [markupMode, setMarkupMode] = useState(false);

  const registryId = `PRJ-${project.category.substring(0, 3).toUpperCase()}-${(index + 1).toString().padStart(2, '0')}`;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden pb-20">
      <SEOHelmet title={`${title} | Project Details`} description={summary} />

      {/* Background technical elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-blueprint opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 relative space-y-12">
        {/* ================= PROJECT HEADER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-black text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2 py-1 rounded uppercase tracking-[0.2em]">
                  {registryId}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Status: <span className="text-emerald-400">Archived_Detail</span>
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black italic text-slate-50 uppercase tracking-tighter leading-[0.85]">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-sky-400/80 font-bold italic tracking-tight">{subtitle}</p>
            </div>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
              {summary}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl">
                <Calendar className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Timeline</p>
                  <p className="text-xs font-mono text-slate-200">{year}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl">
                <Layers className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Discipline</p>
                  <p className="text-xs font-mono text-slate-200 uppercase">{type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl">
                <User className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Responsibility</p>
                  <p className="text-xs font-mono text-slate-200 uppercase">{role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pt-8">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-sky-500/20 group-hover:border-sky-500/50 transition-colors" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-sky-500/20 group-hover:border-sky-500/50 transition-colors" />

              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-500" />
                Technical Stack
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {tech.map((t, idx) => (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={t}
                    className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950/80 text-[11px] font-mono text-slate-300 group-hover:border-sky-500/30 transition-colors"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/50">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase">
                  <span>Validation Score</span>
                  <span className="text-emerald-400">98.4% PASSED</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98.4%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MEDIA SECTION ================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {images.length > 0 && (
                <button
                  onClick={() => setActiveMedia("images")}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all border uppercase tracking-widest
                    ${activeMedia === "images"
                      ? "border-sky-500 bg-sky-500/10 text-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                      : "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700 hover:text-slate-300"}`}
                >
                  <ImageIcon className="w-4 h-4" /> Visuals
                </button>
              )}
              {modelSrc && (
                <button
                  onClick={() => setActiveMedia("model")}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all border uppercase tracking-widest
                    ${activeMedia === "model"
                      ? "border-sky-500 bg-sky-500/10 text-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                      : "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700 hover:text-slate-300"}`}
                >
                  <Box className="w-4 h-4" /> 3D View
                </button>
              )}
              {links?.demo && (
                <button
                  onClick={() => setActiveMedia("video")}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all border uppercase tracking-widest
                    ${activeMedia === "video"
                      ? "border-sky-500 bg-sky-500/10 text-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                      : "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700 hover:text-slate-300"}`}
                >
                  {isYouTube(links.demo) ? <><PlayCircle className="w-4 h-4" /> Reel</> : <><Globe className="w-4 h-4" /> External</>}
                </button>
              )}
            </div>

            {activeMedia === "images" && (
              <button
                onClick={() => setMarkupMode(!markupMode)}
                className={`flex items-center gap-3 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border
                  ${markupMode
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-emerald-500/30 hover:text-emerald-500/50"}`}
              >
                <div className={`w-2 h-2 rounded-full ${markupMode ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-700'}`} />
                {markupMode ? "Engineering_Markup_Active" : "Enable_Engineering_Markup"}
              </button>
            )}
          </div>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl group/media min-h-[400px]">
            {/* Engineering Markup HUD Overlay */}
            <AnimatePresence>
              {activeMedia === "images" && markupMode && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                >
                  {/* Digital Grid Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
                  <div className="absolute top-1/2 left-0 w-full h-px bg-emerald-500/30" />
                  <div className="absolute left-1/2 top-0 w-px h-full bg-emerald-500/30" />

                  {/* Dynamic Corners */}
                  <div className="absolute top-10 left-10 p-4 border-l-2 border-t-2 border-emerald-500/40 bg-slate-950/60 backdrop-blur-sm font-mono text-[9px] text-emerald-400 space-y-1">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> SCANNING_ASSET...</div>
                    <div>COORDINATE_REF: X504-Y882-Z11.2</div>
                    <div>DATA_LOCK: {title.toUpperCase()}</div>
                    <div>LAYER: {type.toUpperCase()}</div>
                  </div>

                  <div className="absolute bottom-10 right-10 p-4 border-r-2 border-b-2 border-emerald-500/40 bg-slate-950/60 backdrop-blur-sm font-mono text-[9px] text-emerald-400 text-right space-y-1">
                    <div>ENGINE_ID: CAD_CORE_DS_2.0</div>
                    <div>FIRMWARE: PRDL_V{new Date().getYear()}</div>
                    <div className="text-emerald-200/50 font-black">VALIDATED_BY_PRADUL_P</div>
                  </div>

                  {/* Redline Circles & Callouts */}
                  <div className="absolute top-1/3 right-1/4 group-hover:scale-110 transition-transform duration-1000">
                    <div className="w-24 h-24 border-2 border-dashed border-emerald-500/40 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-emerald-400 bg-slate-950 px-2">DET_REV</span>
                    </div>
                  </div>

                  {/* Measurement Lines */}
                  <div className="absolute bottom-[30%] left-[15%] w-[40%] h-px bg-emerald-500/40">
                    <div className="absolute -left-1 -top-1 w-2 h-2 bg-emerald-500" />
                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-emerald-500" />
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-slate-950 px-2 whitespace-nowrap">
                      Dimension_Span: 24,400mm
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`w-full h-full ${markupMode ? 'grayscale brightness-50 contrast-125' : ''} transition-all duration-700`}>
              {activeMedia === "images" && <ProjectImageCarousel images={images} />}
              {activeMedia === "model" && modelSrc && (
                <div className="h-[500px] w-full bg-slate-900 border-none">
                  <model-viewer
                    src={modelSrc}
                    camera-controls
                    auto-rotate
                    shadow-intensity="1"
                    environment-image="neutral"
                    style={{ width: "100%", height: "100%", outline: "none" }}
                  />
                </div>
              )}
              {activeMedia === "video" && links?.demo && (
                <div className="aspect-video bg-black flex items-center justify-center">
                  {youtubeEmbed ? (
                    <iframe
                      src={youtubeEmbed}
                      className="w-full h-full border-none"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      title="YouTube video presentation"
                    />
                  ) : (
                    <div className="text-center space-y-4">
                      <Globe className="w-16 h-16 text-slate-800 mx-auto" />
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">External Web Resource</p>
                      <a
                        href={links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-sky-500 text-slate-950 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
                      >
                        Navigate to External URL <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= PROJECT BRIEF ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-sky-400" />
              <h3 className="text-xl font-black italic text-slate-100 uppercase tracking-tighter">Project Highlights</h3>
            </div>
            <ul className="space-y-4">
              {highlights.map((h, i) => (
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  key={h}
                  className="flex gap-4 group"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-[10px] font-black text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                    {i + 1}
                  </span>
                  <span className="text-slate-300 text-sm md:text-base leading-relaxed">{h}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-sky-500/20" />
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-sky-400" />
                <h3 className="text-xl font-black italic text-slate-100 uppercase tracking-tighter">System Output</h3>
              </div>
              <div className="font-mono text-xs text-slate-400 space-y-4 leading-relaxed">
                <p className="text-emerald-400/80">$ initialize --project-scan --deep</p>
                <p>Analysing structural integrity and BIM compliance... Done.</p>
                <p>This project represents a fusion of <span className="text-sky-300">engineering precision</span> and
                  digital coordination. Successfully implemented as part of the <span className="text-slate-200">Pradul-V2</span> engineering database.</p>
                <p className="p-4 bg-slate-950/80 border-l border-sky-500 rounded text-[11px] text-slate-500 italic">
                  "Professional excellence achieved through meticulous planning and a focus on sustainable, energy-efficient outcomes."
                </p>
                <p className="text-emerald-400/80">$ status: COMPLETE // session: TERMINATED</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}
        <div className="pt-12 border-t border-slate-800 space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link to="/projects" className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-sky-400 transition-colors">
              <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-sky-500/50 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
              Back to Database
            </Link>

            <div className="flex items-center gap-6">
              {prevProject && (
                <button
                  onClick={() => navigate(`/projects/${prevProject.id}`)}
                  className="flex flex-col items-end group"
                >
                  <span className="text-[9px] uppercase tracking-widest text-slate-600 font-bold group-hover:text-sky-400 transition-colors">Previous Asset</span>
                  <span className="text-sm font-black italic text-slate-300 uppercase tracking-tighter group-hover:text-slate-100 transition-colors">{prevProject.title}</span>
                </button>
              )}
              <div className="w-px h-8 bg-slate-800" />
              {nextProject && (
                <button
                  onClick={() => navigate(`/projects/${nextProject.id}`)}
                  className="flex flex-col items-start group"
                >
                  <span className="text-[9px] uppercase tracking-widest text-slate-600 font-bold group-hover:text-sky-400 transition-colors">Next Asset</span>
                  <span className="text-sm font-black italic text-slate-300 uppercase tracking-tighter group-hover:text-slate-100 transition-colors">{nextProject.title}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
