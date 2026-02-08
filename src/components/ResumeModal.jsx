import { useEffect } from "react";
import { X, Download, FileText } from "lucide-react";

export default function ResumeModal({ open, onClose, src = "/Pradul_cv.pdf" }) {
  useEffect(() => {
    function esc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      // Lock body scroll
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // For mobile
      window.addEventListener("keydown", esc);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col h-screen w-screen"
      role="dialog"
      aria-modal="true"
    >
      {/* HEADER: Fixed height */}
      <div className="flex-none h-16 px-4 md:px-6 bg-slate-900 border-b border-slate-700 flex items-center justify-between z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/10 rounded-lg hidden sm:block">
            <FileText className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-bold text-slate-100 uppercase tracking-wide">System Resume</h3>
            <p className="text-[10px] text-slate-500 font-mono hidden sm:block">PDF_VIEWER_V1.0</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={src}
            download
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs md:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-sky-900/20 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
          <button
            onClick={onClose}
            className="p-2 md:p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 active:scale-95"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* BODY: Filling Remaining Height */}
      <div className="flex-1 relative w-full bg-slate-800 overflow-hidden">

        {/* Loading Indicator Layer (behind iframe) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 z-0 bg-slate-900/50 pointer-events-none">
          <div className="w-10 h-10 border-4 border-slate-700 border-t-sky-500 rounded-full animate-spin mb-4" />
          <p className="text-xs font-mono animate-pulse">Establishing Secure Connection...</p>
        </div>

        {/* PDF Iframe */}
        <iframe
          src={`${src}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
          className="absolute inset-0 w-full h-full z-10 border-none bg-slate-200"
          title="Resume PDF"
        />
      </div>
    </div>
  );
}
