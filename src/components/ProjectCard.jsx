// src/components/ProjectCard.jsx
export default function ProjectCard({ proj }) {
  return (
    <article
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 
      hover:border-sky-500/80 hover:-translate-y-1 transition-transform cursor-pointer project-card"
    >
      <div className="md:flex gap-4">
        <img
          src={proj.thumbnailUrl || "/placeholder-project.webp"}
          alt={proj.thumbnailAlt || proj.title}
          className="w-full md:w-40 h-28 object-cover rounded-md mb-3 md:mb-0"
          loading="lazy"
        />

        <div>
          <h3 className="font-semibold mb-1">{proj.title}</h3>
          <p className="text-slate-300 mb-2 line-clamp-3">
            {proj.description}
          </p>
          {proj.tech && (
            <p className="text-[11px] text-slate-400">Tech: {proj.tech}</p>
          )}
        </div>
      </div>
    </article>
  );
}
