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

const Innovation = () => {
  const innovation = content.innovation || {};
  const items = innovation.items || fallbackItems;

  const contact = content.contact || {};
  const primaryEmail = contact.email || "pradul.p123@gmail.com";

  // 👉 prefer number from content.json; fallback to your full number
  const whatsappNumber = contact.whatsapp || "918078376902";

  const [selected, setSelected] = useState(null);

  const statusColor = (status) => {
    if (!status) return "";
    const s = status.toLowerCase();
    if (s.includes("live"))
      return "bg-emerald-500/10 text-emerald-300 border-emerald-500/40";
    if (s.includes("progress"))
      return "bg-sky-500/10 text-sky-300 border-sky-500/40";
    if (s.includes("future") || s.includes("idea"))
      return "bg-violet-500/10 text-violet-300 border-violet-500/40";
    return "bg-slate-500/10 text-slate-300 border-slate-500/40";
  };

  const openModal = (item) => setSelected(item);
  const closeModal = () => setSelected(null);

  // ✅ SAFE WhatsApp link
  const getWhatsappLink = (title) => {
    const cleaned = (whatsappNumber || "").replace(/[^0-9]/g, "");
    // if something is wrong in JSON (e.g. only "91"), fallback to your full number
    const phone = cleaned.length < 10 ? "918078376902" : cleaned;

    const text = encodeURIComponent(
      `Hi, I saw your innovation "${title}" on your portfolio. I would like to know more / get access to this tool.`
    );

    return `https://wa.me/${phone}?text=${text}`;
  };

  const getMailtoLink = (title) => {
    const subject = encodeURIComponent(`Enquiry about "${title}" tool`);
    const body = encodeURIComponent(
      `Hi Pradul,\n\nI saw your innovation "${title}" on your portfolio and I'm interested in knowing more / trying this tool.\n\nProject / context:\n...\n\nThanks,\n`
    );
    return `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-400">
            Experiments & Side Projects
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Innovation <span className="text-sky-400">&amp; Experiments</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-3xl">
            A space to document ideas, prototypes, and workflows I&apos;m
            exploring across{" "}
            <span className="text-sky-300">
              BIM, automation, civil engineering, and web tools
            </span>
            . Some are experiments, some are already helping on real projects.
          </p>
        </header>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 flex flex-col justify-between hover:border-sky-500/60 hover:-translate-y-0.5 transition cursor-pointer"
              onClick={() => openModal(item)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 text-[11px] text-slate-400">
                  <span>{item.type}</span>
                  {item.status && (
                    <span
                      className={
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 " +
                        statusColor(item.status)
                      }
                    >
                      {item.status}
                    </span>
                  )}
                </div>
                <h2 className="text-base md:text-lg font-semibold">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-300 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {item.tech && item.tech.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-300">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-900/80 border border-slate-700 px-2.5 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 text-[11px] text-slate-400 flex justify-between items-center">
                <span>Click to see more details</span>
                {item.hasTool && (
                  <span className="text-sky-300">Tool access via contact</span>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="text-[11px] text-slate-500">
          Tools & scripts are not direct downloads. If something looks useful,
          open it and use the WhatsApp or email buttons to request access.
        </p>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-2xl w-full p-5 md:p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="space-y-1">
                <p className="text-[11px] text-slate-400 uppercase tracking-[0.18em]">
                  {selected.type}
                </p>
                <h2 className="text-lg md:text-xl font-semibold">
                  {selected.title}
                </h2>
                {selected.status && (
                  <div className="mt-1">
                    <span
                      className={
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] " +
                        statusColor(selected.status)
                      }
                    >
                      {selected.status}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-100 text-sm px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="mt-3 space-y-3 text-sm text-slate-200 max-h-60 md:max-h-72 overflow-y-auto pr-1">
              <p>{selected.description}</p>
              {selected.details && <p>{selected.details}</p>}

              {selected.tech && selected.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-300 pt-1">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-900/80 border border-slate-700 px-2.5 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / CTA */}
            <div className="mt-5 flex flex-col gap-3 text-xs">
              {selected.hasTool ? (
                <div className="rounded-xl border border-sky-500/40 bg-sky-500/5 px-4 py-3 space-y-2">
                  <p className="text-[11px] text-sky-200">
                    This is a prototype/tool. It&apos;s not a direct download.
                    To try it or use it on your project, contact me:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={getWhatsappLink(selected.title)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-medium hover:bg-emerald-400 transition"
                    >
                      Ask via WhatsApp ↗
                    </a>
                    <a
                      href={getMailtoLink(selected.title)}
                      className="px-4 py-1.5 rounded-lg bg-sky-500 text-slate-950 font-medium hover:bg-sky-400 transition"
                    >
                      Ask via Email ↗
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400">
                  This is currently an idea / concept. If it interests you and
                  you&apos;d like to collaborate or test it on a real project,
                  feel free to reach out through the Contact page or WhatsApp.
                </p>
              )}

              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-sky-500/70 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Innovation;
