// src/components/ResumeModal.jsx
import { useEffect } from "react";
import { X, Download, FileText } from "lucide-react";

export default function ResumeModal({ open, onClose, src = "/Pradul_cv.pdf" }) {
  useEffect(() => {
    function esc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", esc);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl h-[85vh] bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2 text-slate-200">
            <FileText className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider">Systems_Resume_Viewer</h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={src}
              download
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase hover:bg-sky-500 hover:text-slate-950 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-slate-800 relative">
          {/* Loading/Fallback */}
          <div className="absolute inset-0 flex items-center justify-center text-slate-500">
            <p className="animate-pulse">Loading Document Stream...</p>
          </div>

          <iframe
            src={src}
            title="Resume"
            className="relative z-10 w-full h-full"
            style={{ border: "none" }}
          />
        </div>

        {/* Footer info (optional decoration) */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex justify-between">
          <span>DOC_ID: CV-2024-V2</span>
          <span>SECURE_VIEW</span>
        </div>
      </div>
    </div>
  );
}
