import { Link } from "react-router-dom";
import content from "../content.json";
import SectionTitle from "../components/SectionTitle";

export default function Home() {
  const {
    hero = {},
    about = {},
    experience = [],
    projects = [],
    skills = {},
    blog = [],
    innovation = {},
    contact = {},
    education = [],
  } = content;

  const blogPosts = content.blogPosts || blog || [];
  const innovationItems = innovation.items || [];

  const primaryEmail = contact.email || "pradul.p123@gmail.com";
  const location = contact.location || "Kochi, Kerala, India";
  const whatsappNumber = (contact.whatsapp || "918078376902")
    .replace(/[^0-9]/g, "");

  return (
    <main className="pt-6 md:pt-10 pb-12">
      {/* HERO */}
      <section className="mb-12 md:mb-16">
        <div className="max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 md:p-7 shadow-[0_0_80px_rgba(56,189,248,0.15)]">
          {hero.status && (
            <p className="inline-flex items-center gap-2 text-xs md:text-sm text-slate-300 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {hero.status}
            </p>
          )}

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
            Hi, I&apos;m{" "}
            <span className="text-sky-400">{hero.name || "Your Name"}</span>
          </h1>

          {hero.headline && (
            <p className="text-sm md:text-base text-sky-300 mb-2">
              {hero.headline}
            </p>
          )}
          {hero.tagline && (
            <p className="text-sm md:text-base text-slate-400 mb-5">
              {hero.tagline}
            </p>
          )}

          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              to="/about"
              className="px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-sm font-medium shadow-lg shadow-sky-500/30 transition"
            >
              View full profile
            </Link>
            <Link
              to="/projects"
              className="px-5 py-2 rounded-full border border-slate-600 hover:border-sky-400 text-sm font-medium"
            >
              View projects
            </Link>
            {hero.openTo && (
              <span className="px-4 py-1.5 rounded-full text-xs md:text-sm border border-emerald-500/60 bg-emerald-500/10">
                {hero.openTo}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm text-slate-300">
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-wide">
                Role
              </p>
              <p>{hero.role || "Civil Engineer & BIM Modeler"}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-wide">
                Based in
              </p>
              <p>{hero.location || location}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-wide">
                Focus
              </p>
              <p>{hero.focus || "BIM · CAD · Automation · Web"}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-wide">
                Type
              </p>
              <p>Civil · BIM · Tech</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="mb-10">
        <SectionTitle>About</SectionTitle>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl">
          {about.paragraphs?.[0] ||
            "Civil engineer and BIM enthusiast working across site, design, and digital tools."}
        </p>
        <Link
          to="/about"
          className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline"
        >
          Read full about me →
        </Link>
      </section>

      {/* EXPERIENCE + EDUCATION PREVIEW */}
      <section className="mb-10">
        <SectionTitle>Experience &amp; Education</SectionTitle>

        <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
          {experience[0] && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 text-xs md:text-sm text-slate-300">
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="font-semibold">{experience[0].role}</h3>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">
                  {experience[0].period}
                </span>
              </div>
              <p className="text-slate-400 mb-2">
                {experience[0].company} · {experience[0].location}
              </p>
              <ul className="list-disc list-inside space-y-1">
                {experience[0].points?.slice(0, 2).map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          )}

          {education[0] && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 text-xs md:text-sm text-slate-300">
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="font-semibold">{education[0].degree}</h3>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">
                  {education[0].period}
                </span>
              </div>
              <p className="text-slate-400 mb-2">
                {education[0].institution}
              </p>
              {education[0].details && (
                <p className="text-slate-300 text-xs">
                  {education[0].details}
                </p>
              )}
            </div>
          )}
        </div>

        <Link
          to="/experience"
          className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline"
        >
          View full experience →
        </Link>
      </section>

      {/* PROJECT HIGHLIGHTS */}
      <section className="mb-10">
        <SectionTitle>Project highlights</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
          {projects.slice(0, 2).map((proj) => (
            <article
              key={proj.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 hover:border-sky-500/80 hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <h3 className="font-semibold mb-1">{proj.title}</h3>
              <p className="text-slate-300 mb-2 line-clamp-3">
                {proj.description}
              </p>
              {proj.tech && (
                <p className="text-[11px] text-slate-400">
                  Tech: {proj.tech}
                </p>
              )}
            </article>
          ))}
        </div>
        <Link
          to="/projects"
          className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline"
        >
          View all projects →
        </Link>
      </section>

      {/* SKILLS SNAPSHOT */}
      <section className="mb-10">
        <SectionTitle>Skills snapshot</SectionTitle>
        <div className="flex flex-wrap gap-2 text-xs md:text-sm">
          {(skills.civilBim || []).slice(0, 4).map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/70"
            >
              {s}
            </span>
          ))}
          {(skills.web || []).slice(0, 3).map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/70"
            >
              {s}
            </span>
          ))}
        </div>
        <Link
          to="/skills"
          className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline"
        >
          View full skill map →
        </Link>
      </section>

      {/* INNOVATION PREVIEW */}
      {innovationItems.length > 0 && (
        <section className="mb-10">
          <SectionTitle>Innovation &amp; tools</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm max-w-4xl">
            {innovationItems.slice(0, 2).map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 hover:border-sky-500/80 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.status && (
                    <span className="text-[11px] text-slate-400">
                      {item.status}
                    </span>
                  )}
                </div>
                <p className="text-slate-300 mb-2 line-clamp-3">
                  {item.description}
                </p>
                {item.type && (
                  <p className="text-[11px] text-slate-400">
                    Type: {item.type}
                  </p>
                )}
              </article>
            ))}
          </div>
          <Link
            to="/innovation"
            className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline"
          >
            Explore all experiments →
          </Link>
        </section>
      )}

      {/* LATEST NOTE */}
      <section className="mb-10">
        <SectionTitle>Latest note</SectionTitle>
        {blogPosts[0] && (
          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 text-xs md:text-sm text-slate-300 max-w-3xl">
            <div className="flex justify-between gap-2 mb-1">
              <h3 className="font-semibold">{blogPosts[0].title}</h3>
              {blogPosts[0].date && (
                <span className="text-[11px] text-slate-400">
                  {blogPosts[0].date}
                </span>
              )}
            </div>
            <p>{blogPosts[0].summary}</p>
          </article>
        )}
        <Link
          to="/blog"
          className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline"
        >
          View all notes →
        </Link>
      </section>

      {/* CONTACT PREVIEW */}
      <section className="mb-4">
        <SectionTitle>Let&apos;s talk</SectionTitle>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl mb-2">
          Have a BIM task, drawing set, site coordination issue, or want to
          discuss tools for your team? I&apos;m open to freelance help, small
          collaborations, and learning-focused projects.
        </p>
        <div className="flex flex-wrap gap-3 text-xs md:text-sm">
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium transition"
          >
            Go to contact page
          </Link>
          <a
            href={`mailto:${primaryEmail}`}
            className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/70 hover:border-sky-400 transition"
          >
            Email: {primaryEmail}
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/70 hover:border-emerald-400 transition"
          >
            WhatsApp: +{whatsappNumber}
          </a>
        </div>
      </section>
    </main>
  );
}
