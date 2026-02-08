// src/components/ResumeModal.jsx
import { useEffect } from "react";

export default function ResumeModal({ open, onClose, src = "/Pradul_cv.pdf" }) {
  useEffect(() => {
    function esc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      // ensure modal is visible: scroll to top of document
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        window.scrollTo(0, 0);
      }
      window.addEventListener("keydown", esc);
    }
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Container: align to top so modal appears near top of screen */}
      <div className="relative z-10 flex items-start justify-center min-h-screen pt-12 px-4">
        <div
          className="w-full max-w-4xl bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl"
          role="document"
          aria-label="Resume modal"
        >
          <div className="flex items-center justify-between p-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-slate-200">My Resume</h3>

            <div className="flex items-center gap-3">
              <a
                href={src}
                download
                className="px-3 py-1 text-xs rounded bg-sky-500 text-slate-900 hover:bg-sky-400 font-medium"
              >
                Download
              </a>
              <button
                onClick={onClose}
                className="px-3 py-1 text-xs rounded border border-slate-600 hover:border-slate-400 text-slate-300"
                aria-label="Close resume"
              >
                Close
              </button>
            </div>
          </div>

          {/* iframe: use calc to keep it inside viewport */}
          <div style={{ height: "calc(100vh - 7.5rem)" }} className="bg-slate-800">
            <iframe
              src={src}
              title="Resume"
              className="w-full h-full"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
