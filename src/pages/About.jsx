import content from "../content.json";
import SectionTitle from "../components/SectionTitle";

export default function About() {
  const { hero } = content;

  const milestones = [
  {
    year: "Now",
    title: "Junior Engineer @ Paradigm (Infrastructure)",
    body: "Working as a Junior Engineer, contributing to real infrastructure projects while applying what I learned from academics, internships, and BIM / digital workflows. This phase is where theory, tools, and site realities meet.",
  },
  {
    year: "Recent Years",
    title: "Hybrid profile: Civil + BIM + Tech",
    body: "Started shaping myself as a hybrid engineer–technologist, combining civil engineering fundamentals with BIM modelling, digital drafting, web development, and automation ideas using tools like Revit, Dynamo, and pyRevit.",
  },
  {
    year: "Internships & Field Exposure",
    title: "NATPAC, KIIDC, S&R Consultants and more",
    body: "Worked on traffic surveys, parking policy studies, bridge construction exposure, and structural design training. These experiences connected classroom learning to real-world conditions, constraints, and stakeholder expectations.",
  },
  {
    year: "2020 – 2024",
    title: "B.Tech in Civil Engineering",
    body: "Studied Civil Engineering while actively involving in technical clubs, events and hands-on activities. This phase gave me core fundamentals in structural behavior, design, and project workflows.",
  },
  {
    year: "Early Curiosity",
    title: "Fascinated by how things are designed and built",
    body: "I always paid attention to structures, spaces, and how design decisions change how people use them. That curiosity slowly evolved into a serious interest in civil engineering.",
  },
];

  const identityTags = [
    "Civil Engineer",
    "BIM Modeler & Detailer",
    "Web & Front-End Developer",
    "Automation & Tools Enthusiast",
    "Digital & Construction Technology",
    "Continuous Learner",
  ];

  const mindsetPoints = [
    "I like understanding the full workflow – from concept, to model, to drawing, to execution.",
    "I enjoy building systems and tools that save time, reduce friction, and improve quality.",
    "I approach learning like version upgrades – small, consistent improvements over time.",
    "I try to balance precision in engineering with creativity in problem-solving.",
  ];

  const focusAreas = [
    "BIM workflows & model quality",
    "Digital tools for project coordination",
    "Bridging site realities with digital design",
    "Automation ideas for repetitive tasks",
  ];

  return (
    <main className="pt-8 md:pt-10 pb-16">
      {/* Hero: split layout + identity card */}
      <section className="mb-14 md:mb-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: narrative intro */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
              About
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
              The engineer behind{" "}
              <span className="text-sky-400">{hero.name}</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 mb-3">
              I&apos;m a{" "}
              <span className="text-sky-300 font-medium">
                Civil Engineer, BIM Technologist, and web-focused problem
                solver
              </span>{" "}
              exploring how digital tools, automation, and smart workflows can
              transform the way we design, coordinate, and execute projects.
            </p>
            <p className="text-sm md:text-base text-slate-400 mb-3">
              My journey combines{" "}
              <span className="text-slate-200">
                traditional civil engineering foundations
              </span>{" "}
              with{" "}
              <span className="text-slate-200">
                BIM, coding, and digital construction
              </span>
              . I like to think of myself as a{" "}
              <span className="text-emerald-300">
                hybrid engineer–technologist
              </span>{" "}
              who is comfortable both with drawings and with scripts.
            </p>
            <p className="text-sm md:text-base text-slate-400">
              Over time, curiosity about &quot;how structures work&quot; turned
              into a stronger question:{" "}
              <span className="text-slate-200">
                &quot;How can we use technology to build better, faster, and
                smarter?&quot;
              </span>{" "}
              That question is what I&apos;m continuously exploring now.
            </p>
          </div>

          {/* Right: identity card + stats grid */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5 md:p-6 shadow-[0_0_60px_rgba(56,189,248,0.12)] transition-all duration-300 hover:shadow-[0_0_90px_rgba(56,189,248,0.25)] hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">
                  Identity
                </p>
                <p className="text-sm font-semibold">
                  {hero.name}{" "}
                  <span className="text-[11px] ml-1 px-2 py-0.5 rounded-full border border-emerald-500/50 text-emerald-300">
                    Licensed Civil Engineer
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-slate-500">Current role</p>
                <p className="text-xs font-medium text-slate-200">
                  Junior Engineer @ Paradigm
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <p className="text-[11px] text-slate-400 mb-1">
                  Core domains
                </p>
                <p className="text-slate-200">
                  Civil · BIM · Infrastructure · Digital Design
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <p className="text-[11px] text-slate-400 mb-1">
                  Tech keywords
                </p>
                <p className="text-slate-200">
                  Revit · BIM · Automation · Web · AI-adjacent tools
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <p className="text-[11px] text-slate-400 mb-1">
                  Working style
                </p>
                <p className="text-slate-200">
                  Detail-oriented, systematic, curious, prototype-driven
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <p className="text-[11px] text-slate-400 mb-1">
                  Long-term direction
                </p>
                <p className="text-slate-200">
                  Tech-integrated civil engineering, tools &amp; systems
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px]">
              {identityTags.map((tag) => (
                <span
  key={tag}
  className="px-2.5 py-1 rounded-full border border-slate-700 bg-slate-950/80 text-slate-200 text-[11px] transition-all hover:border-sky-400 hover:text-sky-200 hover:bg-slate-900"
>
  {tag}
</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-14">
        <SectionTitle>Mission &amp; Vision</SectionTitle>
        <div className="grid md:grid-cols-2 gap-5 text-sm md:text-base text-slate-300">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 transition-all hover:border-sky-500/60 hover:bg-slate-900/80">
            <h3 className="font-semibold mb-2 text-sky-300">Mission</h3>
            <p>
              To contribute to a future where civil engineering is{" "}
              <span className="text-slate-100">
                faster, smarter, and more technology-integrated
              </span>{" "}
              – without losing precision, clarity, or responsibility. I want to
              help build workflows that are{" "}
              <span className="text-slate-100">
                efficient, transparent, and scalable
              </span>{" "}
              across design, documentation, and execution.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 transition-all hover:border-sky-500/60 hover:bg-slate-900/80">
            <h3 className="font-semibold mb-2 text-emerald-300">Vision</h3>
            <p className="mb-2">
              My vision is to help transform civil engineering into a{" "}
              <span className="text-slate-100">
                fully technology-integrated discipline
              </span>{" "}
              — where innovation and digital intelligence drive real-world
              impact.
            </p>
            <p>
              I&apos;m working towards becoming a{" "}
              <span className="text-slate-100">
                hybrid engineer–technologist
              </span>{" "}
              who can bridge site realities, BIM environments, and digital tools
              into one continuous system.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline / Journey */}
      <section className="mb-14">
        <SectionTitle>Journey So Far</SectionTitle>
        <div className="relative border-l border-slate-800 pl-4 md:pl-6 space-y-6">
          {milestones.map((item) => (
            <div key={item.title} className="relative">
              <div className="absolute -left-[9px] md:-left-[11px] top-1">
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.7)]" />
              </div>
              <div className="ml-1 md:ml-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 md:p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">
                  {item.year}
                </p>
                <h3 className="text-sm md:text-base font-semibold text-slate-100 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mindset & Focus */}
      <section className="mb-14">
        <SectionTitle>How I Think &amp; Work</SectionTitle>
        <div className="grid md:grid-cols-2 gap-5 text-xs md:text-sm text-slate-300">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 transition-all hover:border-sky-500/60 hover:bg-slate-900/80">
            <h3 className="font-semibold mb-2 text-sky-300">
              Mindset &amp; principles
            </h3>
            <ul className="list-disc list-inside space-y-1.5">
              {mindsetPoints.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 transition-all hover:border-sky-500/60 hover:bg-slate-900/80">
            <h3 className="font-semibold mb-2 text-emerald-300">
              Current focus areas
            </h3>
            <ul className="list-disc list-inside space-y-1.5">
              {focusAreas.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-slate-400">
              I&apos;m also continuously exploring new tools, workflows, and
              ways to connect BIM, web, and automation into practical systems
              that actually get used.
            </p>
          </div>
        </div>
      </section>

      {/* Closing / CTA */}
      <section className="mb-4">
        <SectionTitle>What&apos;s next</SectionTitle>
       <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 transition-all hover:border-sky-500/60 hover:bg-slate-900/80">
          <p className="mb-2">
            I&apos;m always interested in{" "}
            <span className="text-slate-100">
              collaborations, side projects, and problem-solving opportunities
            </span>{" "}
            around civil engineering, BIM, digital tools, and automation.
          </p>
          <p className="mb-3">
            If you&apos;re working on something that connects{" "}
            <span className="text-sky-300">
              engineering, technology, or digital workflows
            </span>
            , I&apos;d be happy to talk.
          </p>
          <p className="text-[11px] text-slate-400">
            You can reach me through the contact section of this site, or via
            the links in the header.
          </p>
        </div>
      </section>
    </main>
  );
}
