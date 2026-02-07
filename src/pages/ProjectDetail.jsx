import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import db from "../data/Projects.json";
import SEOHelmet from "../components/SEOHelmet";
import ProjectImageCarousel from "../components/ProjectImageCarousel";
function isYouTube(url = "") {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  );
}

/* ================= YOUTUBE EMBED HELPER ================= */
function getYouTubeEmbedUrl(url = "") {
  if (!url) return null;

  // Playlist only
  if (url.includes("playlist?list=")) {
    const listId = url.split("list=")[1].split("&")[0];
    return `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }

  // Video inside playlist
  if (url.includes("watch?v=") && url.includes("list=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    const listId = url.split("list=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?list=${listId}`;
  }

  // Normal video
  if (url.includes("watch?v=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // youtu.be
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
    return <main className="pt-20 text-center text-slate-400">Project not found</main>;
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

  return (
    <main className="pt-10 pb-20">
      <SEOHelmet title={`${title} | Projects`} description={summary} />

      <div className="max-w-5xl mx-auto px-4 space-y-10">

        {/* ================= HEADER ================= */}
        <section>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-2">
            Project
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-1">
            {title}
          </h1>

          {subtitle && <p className="text-slate-300 mb-4">{subtitle}</p>}

          <div className="flex flex-wrap gap-2 text-[11px] mb-6">
            {type && <span className="px-3 py-1 rounded-full border border-sky-500/60 text-sky-300">{type}</span>}
            {year && <span className="px-3 py-1 rounded-full border border-slate-700">{year}</span>}
            {role && <span className="px-3 py-1 rounded-full border border-emerald-500/60 text-emerald-300">{role}</span>}
          </div>

          {summary && <p className="text-sm md:text-base text-slate-300 max-w-3xl">{summary}</p>}
        </section>

        {/* ================= MEDIA TABS ================= */}
        <section>
          <div className="flex gap-2 mb-4 text-xs">
            {images.length > 0 && (
              <button onClick={() => setActiveMedia("images")}
                className={`px-4 py-1.5 rounded-full border ${activeMedia === "images"
                  ? "border-sky-500 text-sky-300 bg-sky-500/10"
                  : "border-slate-700 text-slate-300"}`}>
                Images
              </button>
            )}

            {modelSrc && (
              <button onClick={() => setActiveMedia("model")}
                className={`px-4 py-1.5 rounded-full border ${activeMedia === "model"
                  ? "border-sky-500 text-sky-300 bg-sky-500/10"
                  : "border-slate-700 text-slate-300"}`}>
                3D Model
              </button>
            )}

            {links?.demo && (
              <button
                onClick={() => setActiveMedia("video")}
                className={`px-4 py-1.5 rounded-full border ${activeMedia === "video"
                  ? "border-sky-500 text-sky-300 bg-sky-500/10"
                  : "border-slate-700 text-slate-300"
                  }`}
              >
                {isYouTube(links.demo) ? "🎬 Video" : "🌐 Website"}
              </button>
            )}

            {activeMedia === "images" && (
              <button
                onClick={() => setMarkupMode(!markupMode)}
                className={`ml-auto px-4 py-1.5 rounded-full border transition-all flex items-center gap-2 ${markupMode
                  ? "border-emerald-500 text-emerald-300 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                  : "border-slate-700 text-slate-400 hover:border-emerald-500/50"
                  }`}
              >
                <div className={`w-2 h-2 rounded-full ${markupMode ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                {markupMode ? "MARKUP ACTIVE" : "ENABLE MARKUP"}
              </button>
            )}
          </div>

          <div className="relative rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden group">
            {/* MARKUP OVERLAY (REDLINE EFFECT) */}
            {activeMedia === "images" && markupMode && (
              <div className="absolute inset-0 z-10 pointer-events-none opacity-80 overflow-hidden">
                {/* Crosshair following center */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-emerald-500/40" />
                <div className="absolute left-1/2 top-0 w-px h-full bg-emerald-500/40" />

                {/* Corner annotations */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-emerald-400 space-y-1 bg-slate-950/60 p-2 border-l border-t border-emerald-500/30">
                  {project.category === 'civil' ? (
                    <>
                      <div>// REF_COORD: 18°23'N 73°51'E</div>
                      <div>// DATUM: MSL +{(Math.random() * 50).toFixed(3)}m</div>
                      <div>// STATUS: {(Math.random() > 0.5) ? 'AS-BUILT' : 'CONSTRUCTION'} REVIEW</div>
                    </>
                  ) : (
                    <>
                      <div>// DOM_TREE: RENDERED</div>
                      <div>// STACK: {project.tech?.[0] || 'VITE'} CORE</div>
                      <div>// STATUS: PRODUCTION_BUILD</div>
                    </>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 font-mono text-[9px] text-emerald-400 text-right bg-slate-950/60 p-2 border-r border-b border-emerald-500/30">
                  <div>{project.category === 'civil' ? 'CAD_ENGINE: REVIT_PRO' : 'ENGINE: REACT_V18'}</div>
                  <div>{project.id.toUpperCase()}_v1.{Math.floor(Math.random() * 9)}</div>
                </div>

                {/* Floating Dimension Lines or Code Snippets */}
                <div className="absolute top-[30%] left-[20%] w-[35%] border-t border-emerald-500/50 flex flex-col items-center">
                  <div className="h-2 border-l border-emerald-500/50 absolute left-0 bottom-0" />
                  <div className="h-2 border-r border-emerald-500/50 absolute right-0 bottom-0" />
                  <span className="text-[8px] bg-slate-950 px-2 -mt-1.5 text-emerald-400 font-mono tracking-tighter">
                    {project.category === 'civil' ? 'SPAN_DIM: 12400.00mm' : 'COMPONENT_ID: <MainLayout />'}
                  </span>
                </div>

                <div className="absolute top-[40%] right-[15%] h-[40%] border-r border-emerald-500/50 flex items-center justify-center">
                  <div className="w-2 border-t border-emerald-500/50 absolute top-0 right-0" />
                  <div className="w-2 border-b border-emerald-500/50 absolute bottom-0 right-0" />
                  <span className="text-[8px] bg-slate-950 px-2 text-emerald-400 font-mono rotate-90 whitespace-nowrap tracking-tighter">
                    {project.category === 'civil' ? 'VERT_CLEARANCE: 4200.00mm' : 'API_ENDPOINT: /v1/projects'}
                  </span>
                </div>

                {/* Technical Redline Circles */}
                <div className="absolute top-1/4 left-1/3 w-16 h-16 border border-red-500/40 rounded-full flex items-center justify-center">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-red-400 bg-slate-950 px-1 font-mono uppercase">
                    {project.category === 'civil' ? 'RFI: 041-REVIT' : 'BUG_FIX: UI_GLITCH'}
                  </div>
                  <div className="w-20 h-px bg-red-500/40 absolute rotate-45" />
                </div>
              </div>
            )}

            {/* IMAGES */}
            {activeMedia === "images" && (
              <div className={`${markupMode ? 'grayscale contrast-125 brightness-75' : 'transition-all duration-500'}`}>
                <ProjectImageCarousel images={images} />
              </div>
            )}

            {/* 3D MODEL */}
            {activeMedia === "model" && modelSrc && (
              <div className="h-[420px]">
                <model-viewer
                  src={modelSrc}
                  camera-controls
                  auto-rotate
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            )}

            {/* VIDEO / WEBSITE */}
            {activeMedia === "video" && links?.demo && (
              <div className="aspect-video bg-black">
                {youtubeEmbed ? (
                  <iframe
                    src={youtubeEmbed}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title="YouTube video"
                  />
                ) : (
                  <iframe
                    src={links.demo}
                    className="w-full h-full bg-white"
                    title="Project website"
                  />
                )}
              </div>
            )}
          </div>

          {/* MEDIA ACTIONS */}
          {activeMedia === "video" && (
            <div className="flex gap-3 mt-3">
              <a href={links.demo} target="_blank" rel="noreferrer"
                className="px-4 py-2 text-xs rounded-full bg-sky-500 text-slate-950">
                Open link
              </a>
            </div>
          )}
        </section>

        {/* ================= DETAILS ================= */}
        {highlights?.length > 0 && (
          <section>
            <h3 className="font-semibold text-slate-100 mb-2">Key highlights</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              {highlights.map(h => <li key={h}>{h}</li>)}
            </ul>
          </section>
        )}

        {tech?.length > 0 && (
          <section>
            <h3 className="font-semibold text-slate-100 mb-2">Tools & stack</h3>
            <div className="flex flex-wrap gap-2 text-[11px]">
              {tech.map(t => (
                <span key={t} className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/70">
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ================= NAVIGATION ================= */}
        <section className="flex justify-between text-sm pt-6 border-t border-slate-800">
          {prevProject ? (
            <button onClick={() => navigate(`/projects/${prevProject.id}`)}
              className="text-sky-400 hover:underline">
              ← {prevProject.title}
            </button>
          ) : <span />}

          {nextProject && (
            <button onClick={() => navigate(`/projects/${nextProject.id}`)}
              className="text-sky-400 hover:underline ml-auto">
              {nextProject.title} →
            </button>
          )}
        </section>

        <div className="text-center">
          <Link to="/projects"
            className="inline-block px-6 py-2 rounded-full border border-slate-700 text-sm">
            All projects
          </Link>
        </div>
      </div>
    </main>
  );
}
