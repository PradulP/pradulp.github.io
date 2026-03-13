import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import db from "../data/Projects.json";
import useGoogleCMS from "../hooks/useGoogleCMS";
import SEO from "../components/SEO";
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
  Calendar,
  Zap,
  Target,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Package,
  Trophy
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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const SectionHeader = ({ icon: Icon, title, className = "" }) => (
  <div className={`flex items-center gap-3 mb-6 ${className}`}>
    <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="text-xl md:text-2xl font-black italic text-slate-100 uppercase tracking-tighter">
      {title}
    </h3>
  </div>
);

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const { data: cmsProjects } = useGoogleCMS("projects");
  const projects = (cmsProjects && cmsProjects.length > 0) ? cmsProjects : (db.projects || []);

  const index = useMemo(
    () => projects.findIndex(p => String(p.id) === String(id)),
    [projects, id]
  );

  const rawProject = projects[index];
  const prevProject = projects[index - 1];
  const nextProject = projects[index + 1];

  if (!rawProject) {
    return (
      <section className="min-h-screen pt-32 text-center bg-slate-950">
        <div className="inline-block p-8 border border-slate-800 rounded-3xl bg-slate-900/50">
          <Terminal className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h2 className="text-xl font-black italic text-slate-100 uppercase tracking-tighter">Project Not Found</h2>
          <p className="text-slate-500 text-sm mt-2">The requested ID does not exist in the database.</p>
          <Link to="/projects" className="mt-6 inline-block px-6 py-2 bg-sky-500 text-slate-950 rounded-lg font-bold text-xs uppercase tracking-widest">Return to Database</Link>
        </div>
      </section>
    );
  }

  const parseField = (val) => {
    if (typeof val === 'string') {
      if ((val.trim().startsWith('[') && val.trim().endsWith(']')) ||
        (val.trim().startsWith('{') && val.trim().endsWith('}'))) {
        try { return JSON.parse(val); } catch (e) { }
      }

      const processItem = (s) => {
        const trimmed = s.trim();
        if (trimmed.includes('::')) {
          const [t, d] = trimmed.split('::').map(x => x.trim());
          return { title: t, desc: d };
        }
        return trimmed;
      };

      if (val.includes('||')) return val.split('||').map(processItem).filter(Boolean);
      if (val.includes('|')) return val.split('|').map(processItem).filter(Boolean);
    }
    return val;
  };

  const project = {
    ...rawProject,
    objectives: parseField(rawProject.objectives) || [],
    approach: parseField(rawProject.approach) || [],
    tech: parseField(rawProject.tech) || [],
    highlights: parseField(rawProject.highlights) || [],
    images: parseField(rawProject.images) || [],
    deliverables: parseField(rawProject.deliverables) || [],
    challenges: parseField(rawProject.challenges) || [],
    links: (rawProject.links && typeof rawProject.links === 'string' && rawProject.links.trim() !== '') ? parseField(rawProject.links) : (rawProject.links && Object.keys(rawProject.links).length > 0 ? rawProject.links : { demo: rawProject.demo_link, repo: rawProject.repo_link })
  };

  const {
    title,
    subtitle,
    type,
    category,
    year,
    duration,
    role,
    location,
    scope,
    summary,
    overview,
    objectives,
    approach,
    highlights,
    tech,
    engineeringSummary,
    challenges,
    deliverables,
    outcome, // or impact
    learnings,
    caption,
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

  const registryId = `PRJ-${category?.substring(0, 3).toUpperCase() || "UNK"}-${(index + 1).toString().padStart(2, '0')}`;

  return (
    <section className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden pb-20">
      <SEO title={`${title} | Project Details`} description={summary} />

      {/* 1) Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background technical elements - ENHANCED with Parallax */}
      <div className="pointer-events-none absolute inset-0 fixed">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-sky-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }} />
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 relative space-y-24">

        {/* ================= 1) PROJECT HEADER ================= */}
        <motion.header
          initial="hidden" animate="visible" variants={fadeInUp}
          className="space-y-8 text-center md:text-left relative z-10"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <span className="text-[10px] font-mono font-black text-sky-400 bg-slate-900/80 border border-sky-500/30 px-3 py-1.5 rounded uppercase tracking-[0.2em] mb-2 md:mb-0 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
              {registryId}
            </span>
            <div className="h-px flex-grow bg-gradient-to-r from-slate-800 to-transparent hidden md:block mt-3" />
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest hidden md:block">
                {type} · {year}
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-2xl">
              {title}
            </h1>
            <p className="text-xl md:text-3xl text-sky-400 font-bold italic tracking-tight relative max-w-4xl mx-auto md:mx-0">
              {subtitle}
              <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-sky-500 to-transparent rounded-full hidden md:block" />
            </p>
          </div>
        </motion.header>

        {/* ================= 2) INFO PANEL (HUD STYLE) ================= */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="bg-slate-950/40 border border-slate-800/60 rounded-[2rem] p-8 md:p-10 backdrop-blur-xl relative overflow-hidden group shadow-2xl"
        >
          {/* Glass reflections */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12">
            <Terminal className="w-48 h-48 text-slate-100" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-sky-500/70">
                <User className="w-3 h-3" /> Role
              </div>
              <div className="text-lg font-bold text-slate-100 tracking-wide">{role}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-sky-500/70">
                <Layers className="w-3 h-3" /> Type
              </div>
              <div className="text-lg font-bold text-slate-100 tracking-wide">{type}</div>
            </div>

            {location && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-sky-500/70">
                  <Zap className="w-3 h-3" /> Location
                </div>
                <div className="text-lg font-bold text-slate-100 tracking-wide">{location}</div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-sky-500/70">
                <Calendar className="w-3 h-3" /> Duration
              </div>
              <div className="text-lg font-bold text-slate-100 tracking-wide">{duration || year}</div>
            </div>

            {scope && (
              <div className="space-y-2 lg:col-span-2 pt-2 border-t border-slate-800/50">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-sky-500/70">
                  <Target className="w-3 h-3" /> Scope
                </div>
                <div className="font-medium text-slate-300 leading-relaxed">{scope}</div>
              </div>
            )}

            <div className="space-y-3 lg:col-span-2 pt-2 border-t border-slate-800/50">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-sky-500/70">
                <Cpu className="w-3 h-3" /> Tools Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {tech.map((t, idx) => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/50 text-slate-300 text-xs font-mono hover:border-sky-500/40 hover:text-sky-400 transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= 3) OVERVIEW ================= */}
        <section className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <SectionHeader icon={FileText} title="Project Overview" />
              <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
                <p>{overview || summary}</p>
              </div>
            </motion.div>

            {/* ================= 4) OBJECTIVES ================= */}
            {objectives && objectives.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="pt-8">
                <SectionHeader icon={Target} title="Objectives" />
                <ul className="grid sm:grid-cols-2 gap-4">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex gap-3 bg-slate-900/30 p-4 rounded-xl border border-slate-800 hover:border-sky-500/30 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{obj}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* ================= 5) APPROACH ================= */}
            {approach && approach.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="pt-8">
                <SectionHeader icon={Workflow} title="Approach & Methodology" />
                <div className="space-y-6 relative ml-3 before:absolute before:inset-0 before:w-px before:bg-gradient-to-b before:from-sky-500 before:to-transparent before:opacity-30">
                  {approach.map((step, i) => (
                    <div key={i} className="relative pl-8">
                      <span className="absolute left-[-4px] top-1 w-2.5 h-2.5 rounded-full bg-sky-500 border-4 border-slate-950 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                      <h4 className="font-bold text-slate-200 mb-1">{step.title || `Phase ${i + 1}`}</h4>
                      <p className="text-sm text-slate-400">{step.desc || step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Engineering Summary (Moved to sidebar for layout balance or kept in main?) - Let's keep specific Engineering features here */}
            {/* Sticky sidebar content could go here */}
          </div>
        </section>

        {/* ================= 6) VISUAL GALLERY (FULL WIDTH) ================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <SectionHeader icon={ImageIcon} title="Visual Gallery" className="mb-0" />
            <div className="flex items-center gap-2">
              {[
                { id: 'images', icon: ImageIcon, label: 'Visuals', available: images.length > 0 },
                { id: 'model', icon: Box, label: '3D View', available: !!modelSrc },
                { id: 'video', icon: PlayCircle, label: 'Reel', available: !!links?.demo }
              ].map(media => media.available && (
                <button
                  key={media.id}
                  onClick={() => setActiveMedia(media.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border uppercase tracking-widest
                    ${activeMedia === media.id
                      ? "border-sky-500 bg-sky-500/10 text-sky-400"
                      : "border-slate-800 bg-slate-900/50 text-slate-500 hover:text-slate-300"}`}
                >
                  <media.icon className="w-4 h-4" /> {media.label}
                </button>
              ))}

              {activeMedia === "images" && images.length > 0 && (
                <div className="h-6 w-px bg-slate-800 mx-2 hidden md:block" />
              )}

              {activeMedia === "images" && images.length > 0 && (
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
          </div>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl group/media min-h-[400px] relative">
            {/* Engineering Markup HUD Overlay */}
            <AnimatePresence>
              {activeMedia === "images" && markupMode && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 pointer-events-none overflow-hidden border-2 border-emerald-500/50 rounded-3xl"
                >
                  {/* Digital Grid Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(2,6,23,0.4)_100%)]" />

                  <div className="absolute top-1/2 left-0 w-full h-px bg-emerald-500/30" />
                  <div className="absolute left-1/2 top-0 w-px h-full bg-emerald-500/30" />

                  {/* Dynamic Corners */}
                  <div className="absolute top-8 left-8 p-4 border-l-2 border-t-2 border-emerald-500 bg-slate-950/80 backdrop-blur-md font-mono text-[10px] text-emerald-400 space-y-1 shadow-lg">
                    <div className="flex items-center gap-2 font-bold"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> SCANNING_ASSET...</div>
                    <div className="text-emerald-300/70">COORDINATE_REF: X504-Y882-Z11.2</div>
                    <div className="text-emerald-300/70">DATA_LOCK: {title.substring(0, 15)}...</div>
                    <div className="text-emerald-300/70">LAYER: {type.toUpperCase()}</div>
                  </div>

                  <div className="absolute bottom-8 right-8 p-4 border-r-2 border-b-2 border-emerald-500 bg-slate-950/80 backdrop-blur-md font-mono text-[10px] text-emerald-400 text-right space-y-1 shadow-lg">
                    <div className="font-bold">ENGINE_ID: CAD_CORE_DS_2.0</div>
                    <div className="text-emerald-300/70">FIRMWARE: PRDL_V{new Date().getFullYear()}</div>
                    <div className="text-emerald-200 font-black tracking-widest mt-1">VALIDATED_BY_PRADUL_P</div>
                  </div>

                  {/* Redline Circles & Callouts */}
                  <div className="absolute top-1/3 right-1/4">
                    <div className="w-32 h-32 border-2 border-dashed border-emerald-500/60 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-mono font-bold text-emerald-950 bg-emerald-500 px-1 py-0.5 rounded">DET_REV</span>
                    </div>
                  </div>

                  {/* Measurement Lines */}
                  <div className="absolute bottom-[30%] left-[15%] w-[40%] h-px bg-emerald-500">
                    <div className="absolute -left-1 -top-1.5 w-3 h-3 border border-emerald-500 bg-slate-950" />
                    <div className="absolute -right-1 -top-1.5 w-3 h-3 border border-emerald-500 bg-slate-950" />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-slate-950/80 px-2 py-1 rounded whitespace-nowrap border border-emerald-500/30">
                      Dimension_Span: 24,400mm
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-x-0 h-[20%] bg-gradient-to-b from-emerald-500/0 via-emerald-500/10 to-emerald-500/0"
                    animate={{ top: ["-20%", "120%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`w-full h-full ${markupMode ? 'grayscale brightness-75 contrast-125' : ''} transition-all duration-700`}>
              {activeMedia === "images" && <ProjectImageCarousel images={images} />}
              {activeMedia === "model" && modelSrc && (
                <div className="h-[600px] w-full bg-slate-900 border-none">
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
                <div className="absolute inset-0 bg-slate-900 flex flex-col pt-10 pb-4 px-4 h-full pointer-events-auto">
                  {youtubeEmbed ? (
                    <iframe
                      src={youtubeEmbed}
                      className="w-full h-full border-none"
                      allow="autoplay; encrypted-mbedia; picture-in-picture"
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
            {/* Image Caption */}
            {(activeMedia === "images" || activeMedia === "model") && project.caption && (
              <p className="text-center text-sm text-slate-500 font-mono mt-4 italic">
                  // {project.caption}
              </p>
            )}

          </div>
        </section>

        {/* ================= 7) HIGHLIGHTS & 8) ENGINEERING SUMMARY ================= */}
        <section className="grid lg:grid-cols-2 gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SectionHeader icon={Zap} title="Key Features" />
            <ul className="space-y-4">
              {highlights.map((h, i) => (
                <li key={i} className="flex gap-4 group">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[10px] font-black text-emerald-400">
                    {i + 1}
                  </span>
                  <span className="text-slate-300 leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SectionHeader icon={Cpu} title="Engineering Summary" />
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Cpu className="w-24 h-24 text-slate-100" />
              </div>
              <p className="text-slate-300 leading-relaxed relative z-10">
                {engineeringSummary || summary}
              </p>
              <div className="mt-6 pt-6 border-t border-slate-800 flex gap-4 text-xs font-mono text-slate-500 uppercase tracking-wider">
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> System_Optimized</div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Standards_Compliant</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= 9) CHALLENGES & SOLUTIONS ================= */}
        {challenges && challenges.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SectionHeader icon={AlertTriangle} title="Challenges & Solutions" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((c, i) => (
                <div key={i} className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 transition-colors group">
                  <div className="mb-4">
                    <h4 className="text-amber-500 font-bold uppercase tracking-wider text-xs mb-2">Constraint</h4>
                    <p className="text-slate-300 font-medium">{c.constraint || c.problem}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800/50">
                    <h4 className="text-emerald-500 font-bold uppercase tracking-wider text-xs mb-2">Solution</h4>
                    <p className="text-slate-400 text-sm">{c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ================= 10) DELIVERABLES & 11) OUTCOME ================= */}
        <section className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            {deliverables && deliverables.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-slate-900/30 border border-slate-800 rounded-3xl p-8 h-full">
                <SectionHeader icon={Package} title="Deliverables" className="mb-8" />
                <ul className="space-y-4">
                  {deliverables.map((d, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Box className="w-4 h-4 text-sky-500" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-7 space-y-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <SectionHeader icon={Trophy} title="Outcome & Impact" />
              <p className="text-lg text-slate-300 leading-relaxed border-l-4 border-emerald-500 pl-6 bg-gradient-to-r from-emerald-500/5 to-transparent py-2">
                {outcome || "Project completed successfully meeting all requirements."}
              </p>
            </motion.div>

            {learnings && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <SectionHeader icon={Lightbulb} title="Learnings" />
                <p className="text-slate-400 leading-relaxed">
                  {learnings}
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ================= 13) LINKS / FOOTER ================= */}
        <section className="pt-12 border-t border-slate-800 flex flex-col items-center gap-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {links?.demo && (
              <a href={links.demo} target="_blank" rel="noopener noreferrer" className="group px-6 py-3 border border-sky-500/30 bg-sky-500/10 text-sky-400 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-sky-500 hover:text-slate-950 transition-all flex items-center gap-2">
                <PlayCircle className="w-4 h-4" /> Live Demo{links.label || "Project Walkthrough"}
              </a>
            )}
            {links?.repo && (
              <a href={links.repo} target="_blank" rel="noopener noreferrer" className="group px-6 py-3 border border-slate-700 bg-slate-800 text-slate-300 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-slate-700 transition-all flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> Source Code
              </a>
            )}
          </div>
        </section>

        {/* ================= 13) FOOTER NAVIGATION ================= */}
        <section className="pt-20 pb-10 border-t border-slate-800/50">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

            {/* Previous Project */}
            <div className="flex justify-start order-2 md:order-1">
              {prevProject ? (
                <button
                  onClick={() => navigate(`/projects/${prevProject.id}`)}
                  className="group text-left space-y-1"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </div>
                  <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors max-w-[200px] truncate">
                    {prevProject.title}
                  </div>
                </button>
              ) : (
                <div /> // Empty spacer
              )}
            </div>

            {/* Back to Database */}
            <div className="flex justify-center order-1 md:order-2">
              <Link
                to="/projects"
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-slate-700 bg-slate-900/50 text-slate-300 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 hover:border-sky-500/50 hover:text-sky-400 transition-all shadow-lg hover:shadow-sky-500/10 group"
              >
                <div className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-sky-500 transition-colors" />
                Database_Index
              </Link>
            </div>

            {/* Next Project */}
            <div className="flex justify-end order-3 md:order-3">
              {nextProject ? (
                <button
                  onClick={() => navigate(`/projects/${nextProject.id}`)}
                  className="group text-right space-y-1"
                >
                  <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-sky-400 transition-colors">
                    Next Asset <ChevronRight className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors max-w-[200px] truncate">
                    {nextProject.title}
                  </div>
                </button>
              ) : (
                <div /> // Empty spacer
              )}
            </div>

          </div>

          {/* Copyright / Footer Note */}
          <div className="text-center mt-16 pt-8 border-t border-slate-900 text-[10px] text-slate-700 font-mono">
            SYSTEM_ID: PROJ_DET_V2.5 • RENDER_COMPLETE
          </div>
        </section>

        {/* Floating Command Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-sky-400 rounded-xl hover:bg-sky-500 hover:text-slate-950 transition-all shadow-lg hover:shadow-sky-500/30 group"
            title="Back to Top"
          >
            <ChevronLeft className="w-5 h-5 rotate-90" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
