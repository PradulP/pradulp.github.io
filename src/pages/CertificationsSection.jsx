// src/components/CertificationsSection.jsx
import React, { useState } from "react";
import certificationsData from "../data/certifications.json";

export default function CertificationsSection() {
  const {
    sectionId,
    eyebrow,
    title,
    description,
    tabs = [],
    items = [],
  } = certificationsData;

  const [activeTab, setActiveTab] = useState(tabs[0] || "Certifications");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    items.filter((item) => item.type === activeTab.slice(0, -1)) || items;

  const closeModal = () => setSelectedItem(null);

  return (
    <section
      id={sectionId}
      className="min-h-screen w-full bg-slate-950 text-slate-50 px-4 py-16 md:px-10 lg:px-24 relative overflow-hidden"
    >
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -right-16 w-72 h-72 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-10 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            {eyebrow && (
              <p className="text-sm uppercase tracking-[0.25em] text-sky-400">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-semibold mt-2">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm md:text-base text-slate-400 mt-3 max-w-xl">
                {description}
              </p>
            )}
          </div>

          {/* Tabs */}
          {tabs && tabs.length > 0 && (
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 p-1 text-xs md:text-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 md:px-4 py-1.5 rounded-full transition-all ${
                    activeTab === tab
                      ? "bg-sky-500 text-slate-950 font-semibold shadow-[0_0_18px_rgba(56,189,248,0.55)]"
                      : "text-slate-300 hover:text-sky-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.title + item.year}
                type="button"
                onClick={() => setSelectedItem(item)}
                className="group text-left rounded-2xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 shadow-[0_0_18px_rgba(15,23,42,0.8)] hover:shadow-[0_0_32px_rgba(56,189,248,0.45)] hover:border-sky-500/70 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      {item.type}
                    </p>
                    <h3 className="text-lg md:text-xl font-semibold leading-snug text-slate-50 break-words">
                      {item.title}
                    </h3>
                    {item.issuer && (
                      <p className="text-xs md:text-sm text-slate-400">
                        {item.issuer}
                      </p>
                    )}
                  </div>
                  {item.year && (
                    <span className="px-2.5 py-1 rounded-full text-[0.7rem] uppercase tracking-wide border border-sky-500/70 bg-sky-500/10 text-sky-100">
                      {item.year}
                    </span>
                  )}
                </div>

                {item.highlight && (
                  <p className="mt-3 text-xs md:text-sm text-slate-300 line-clamp-3">
                    {item.highlight}
                  </p>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[0.7rem] border border-emerald-500/60 bg-emerald-500/10 text-emerald-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-3 text-[0.75rem] text-sky-300 underline underline-offset-4">
                  View details
                </p>
              </button>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No items added yet. Configure them in{" "}
              <code className="text-sky-400 text-xs bg-slate-900 px-1.5 py-0.5 rounded">
                certifications.json
              </code>
              .
            </p>
          )}
        </div>

        {/* footer note if any */}
        {/* you can reuse note from JSON if you add it later */}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
          {/* overlay */}
          <button
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative z-50 w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950/95 p-6 shadow-[0_0_40px_rgba(56,189,248,0.5)]">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sky-400">
                  {selectedItem.type}
                </p>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-50 mt-1 break-words">
                  {selectedItem.title}
                </h3>
                {selectedItem.issuer && (
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedItem.issuer}{" "}
                    {selectedItem.year && (
                      <>
                        · <span className="text-sky-300">{selectedItem.year}</span>
                      </>
                    )}
                  </p>
                )}
              </div>

              <button
                onClick={closeModal}
                className="px-2.5 py-1 rounded-full text-xs border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-200"
              >
                ✕
              </button>
            </div>

            {selectedItem.tags && selectedItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[0.7rem] uppercase tracking-wide border border-emerald-500/60 bg-emerald-500/10 text-emerald-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-3 text-sm text-slate-300">
              {selectedItem.highlight && (
                <p className="text-slate-200">{selectedItem.highlight}</p>
              )}

              {selectedItem.details && selectedItem.details.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
                    Details
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedItem.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              {selectedItem.link && (
                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 rounded-full text-xs border border-sky-500/80 bg-sky-500/10 text-sky-100 hover:bg-sky-500/20"
                >
                  View credential
                </a>
              )}
              <button
                onClick={closeModal}
                className="px-4 py-1.5 rounded-full text-xs border border-slate-600 bg-slate-900 text-slate-200 hover:border-sky-500 hover:text-sky-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
