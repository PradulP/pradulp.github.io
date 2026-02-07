// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Unified data import
import content from "../data/index";

// Components
import SectionTitle from "../components/SectionTitle";
import Hero from "../components/Hero";
import SEOHelmet from "../components/SEOHelmet";
import WhatIDoGrid from "../components/WhatIDoGrid";
import FeaturedSection from "../components/FeaturedSection";
import InnovationPreview from "../components/InnovationPreview";

// Animations
import { fadeInUp, containerVariants, itemVariants } from "../utils/animations";

export default function Home() {
  // Destructure from the unified content object
  const {
    hero = {},
    about = {},
    experience = [],
    education = [],
    skills = {},
    projects = [],
    blog = [],
    innovation = [],
    contact = {}
  } = content;

  // Helpers
  const primaryEmail = contact.email || "pradul.p123@gmail.com";
  const whatsappNumber = (contact.whatsapp || "918078376902").replace(/[^0-9]/g, "");

  const cardHover = "transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(2,6,23,0.35)]";

  return (
    <main className="pt-6 md:pt-10 pb-12 px-4 md:px-0">
      <SEOHelmet
        title={`${hero.name || "Pradul P"} — Civil Engineer & BIM Specialist`}
        description={hero.tagline}
        image={hero.avatar || "/pradul-avatar.jpg"}
      />

      <Hero hero={hero} location={contact.location} />

      {/* ABOUT preview */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="mb-16"
      >
        <SectionTitle>About</SectionTitle>
        <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-2xl backdrop-blur-sm">
          <p className="text-sm md:text-base text-slate-300 max-w-4xl leading-relaxed">
            {about.paragraphs?.[0] ?? "Civil engineer and BIM enthusiast working across site, design, and digital tools."}
          </p>
          <div className="mt-4">
            <Link to="/about" className="inline-flex items-center text-sm font-medium text-sky-400 hover:text-emerald-400 transition-colors">
              Read full about me <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Experience & Education preview */}
      <section className="mb-16">
        <SectionTitle>Experience &amp; Education</SectionTitle>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2 max-w-5xl"
        >
          {experience[0] && (
            <motion.article
              variants={itemVariants}
              className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-emerald-500/50 ${cardHover}`}
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="font-bold text-slate-100">{experience[0].role}</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full whitespace-nowrap">
                  {experience[0].period}
                </span>
              </div>
              <p className="text-sky-300 text-sm font-medium mb-3">{experience[0].company} · {experience[0].location}</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-400">
                {experience[0].points?.slice(0, 3).map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </motion.article>
          )}

          {education[0] && (
            <motion.article
              variants={itemVariants}
              className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-sky-500/50 ${cardHover}`}
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="font-bold text-slate-100">{education[0].degree}</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-800 px-2 py-1 rounded-full whitespace-nowrap">
                  {education[0].period || education[0].years}
                </span>
              </div>
              <p className="text-slate-300 text-sm font-medium mb-3">{education[0].place || education[0].institution}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{education[0].description}</p>
            </motion.article>
          )}
        </motion.div>
        <div className="mt-4">
          <Link to="/experience" className="inline-flex items-center text-sm font-medium text-sky-400 hover:text-emerald-400 transition-colors">
            View full experience <span className="ml-1">→</span>
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      <SectionTitle>Projects</SectionTitle>
      <FeaturedSection projects={projects} maxItems={6} />

      {/* What I do grid */}
      <SectionTitle>What I do </SectionTitle>
      <WhatIDoGrid items={content.whatIDo || []} />

      {/* SKILLS snapshot */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-16"
      >
        <SectionTitle>Skills snapshot</SectionTitle>
        <div className="flex flex-wrap gap-3">
          {/* We flatten the skills object for a quick glimpse */}
          {((skills.civilBim || []).concat(skills.web || [])).slice(0, 15).map((s, i) => (
            <span
              key={s + i}
              className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/70 text-slate-300 text-sm
              hover:text-white hover:border-sky-500/50 hover:bg-sky-500/10 transition-all cursor-default"
            >
              {typeof s === 'string' ? s : s.name}
            </span>
          ))}
          {/* Also check if skills is an object with groups (new structure) */}
          {skills.groups && skills.groups[0]?.skills.slice(0, 5).map((s, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/70 text-slate-300 text-sm
             hover:text-white hover:border-sky-500/50 hover:bg-sky-500/10 transition-all cursor-default"
            >
              {s.name}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/skills" className="inline-flex items-center text-sm font-medium text-sky-400 hover:text-emerald-400 transition-colors">
            View full skill map <span className="ml-1">→</span>
          </Link>
        </div>
      </motion.section>

      {/* Innovation */}
      {((Array.isArray(innovation) ? innovation : (innovation?.items ?? []))).length > 0 && (
        <section className="mb-16">
          <SectionTitle>Innovation &amp; tools</SectionTitle>
          <InnovationPreview
            limit={2}
            onOpen={() => { window.location.href = "/innovation"; }}
          />
          <div className="mt-4">
            <Link to="/innovation" className="inline-flex items-center text-sm font-medium text-sky-400 hover:text-emerald-400 transition-colors">
              Explore all experiments <span className="ml-1">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* Latest note / Blog */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-16"
      >
        <SectionTitle>Latest note</SectionTitle>
        {blog?.[0] ? (
          <article className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-sky-500/60 group cursor-pointer ${cardHover}`}>
            <h3 className="font-bold text-lg text-slate-100 group-hover:text-sky-400 transition-colors">{blog[0].title}</h3>
            <p className="text-slate-400 mt-2 text-sm leading-relaxed">{blog[0].summary}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <span>{blog[0].date}</span>
              <span>•</span>
              <span className="text-emerald-400">{blog[0].readTime || "Read now"}</span>
            </div>
          </article>
        ) : (
          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-400">
            No notes published yet. Checks back later!
          </article>
        )}
        <div className="mt-4">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-sky-400 hover:text-emerald-400 transition-colors">
            View all notes <span className="ml-1">→</span>
          </Link>
        </div>
      </motion.section>

      {/* Contact preview */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-8"
      >
        <SectionTitle>Let's talk</SectionTitle>
        <div className={`rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 flex flex-col md:flex-row items-center gap-8 ${cardHover}`}>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to collaborate?</h3>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl mb-6">
              Have a BIM task, drawing set, site coordination issue, or want to discuss tools for your team? I'm open to freelance help, small collaborations, and learning-focused projects.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start text-xs md:text-sm">
              <Link to="/contact" className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition shadow-lg shadow-sky-500/20">
                Go to contact page
              </Link>
              <a href={`mailto:${primaryEmail}`} className="px-6 py-3 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition flex items-center gap-2">
                <span>✉️</span> Email Me
              </a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-medium transition flex items-center gap-2">
                <span>💬</span> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="h-8" />
    </main>
  );
}
