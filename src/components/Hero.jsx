import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import content from "../data/index";
import { heroVariants, fadeInUp } from "../utils/animations";

export default function Hero({ hero, location }) {
  const currentRole = content.experience.find((e) => e.isCurrent);

  return (
    <section className="mb-12 md:mb-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="max-w-3xl rounded-3xl border border-slate-800 
        bg-slate-900/60 backdrop-blur-xl p-5 md:p-7 
        shadow-[0_0_80px_rgba(56,189,248,0.15)] relative overflow-hidden"
      >
        {/* Decorative blur blob */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Status */}
        {hero.status && (
          <motion.p
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-xs md:text-sm text-slate-300 mb-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {hero.status}
          </motion.p>
        )}

        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-2"
        >
          Hi, I&apos;m <span className="text-gradient-civil">{hero.name}</span>
        </motion.h1>

        {/* Headline */}
        <motion.p
          variants={fadeInUp}
          className="text-sm md:text-base text-sky-300 mb-2 max-w-xl font-medium"
        >
          {hero.headline}
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="text-sm md:text-base text-slate-400 mb-5 leading-relaxed"
        >
          {hero.tagline}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap gap-3 mb-6"
        >
          <Link
            to="/about"
            className="px-6 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 
            text-slate-950 text-sm font-semibold shadow-lg shadow-sky-500/20 transition hover:scale-105 active:scale-95"
          >
            View full profile
          </Link>

          {hero.cvLink && (
            <a
              href={hero.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-slate-600 
              hover:border-sky-400 text-slate-200 text-sm font-medium transition hover:bg-slate-800"
            >
              Resume
            </a>
          )}

          <Link
            to="/projects"
            className="px-6 py-2.5 rounded-full border border-slate-600 
            hover:border-sky-400 text-slate-200 text-sm font-medium transition hover:bg-slate-800"
          >
            View projects
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm text-slate-300 pt-4 border-t border-slate-800/50"
        >
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Current Role</p>
            <p className="font-medium">
              {currentRole
                ? `${currentRole.role} @ ${currentRole.company}`
                : "Building cool things"}
            </p>
          </div>

          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Based in</p>
            <p className="font-medium">{location}</p>
          </div>

          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Focus</p>
            <p className="font-medium">{hero.focus}</p>
          </div>

          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Type</p>
            <p className="font-medium">Civil · BIM · Tech</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
