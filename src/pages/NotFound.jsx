import { Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCcw, MessageCircle, Mail } from "lucide-react";
import Typewriter from "../components/Typewriter";

const NotFound = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const waMessage = `Hi, I encountered an issue on your portfolio at: ${currentUrl}`;
  const contactMessage = `I encountered a 404 error at: ${currentUrl}`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Glitch Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-24 h-24 border border-red-500/30 rounded-full animate-ping" />
        <div className="absolute bottom-1/3 right-20 w-32 h-32 border border-sky-500/20 rounded-full animate-pulse" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10 bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 shadow-2xl">

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/30 animate-pulse">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 font-bold">
            System_Error: 404
          </p>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-slate-100 uppercase">
            Signal <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Lost</span>
          </h1>
        </div>

        <div className="font-mono text-xs text-left bg-slate-950 p-4 rounded-lg border border-slate-800 text-slate-400 space-y-1 shadow-inner">
          <p className="text-red-500">&gt; ERROR: Target path not found.</p>
          <p className="text-emerald-500">&gt; DIAGNOSTIC: Route verification failed.</p>
          <p className="text-sky-500 animate-pulse">&gt; SUGGESTION: Initiate manual reboot to Homepage.</p>
          <p className="mt-2 text-slate-600 typing-cursor">_</p>
        </div>

        <p className="text-sm text-slate-400 font-medium">
          The requested module is strictly offline or doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4 flex-wrap">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-sky-500/20 active:scale-95"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>

          <div className="flex w-full sm:w-auto gap-2">
            <a
              href={`https://wa.me/918078376902?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-emerald-500/30 hover:border-emerald-500/60 bg-slate-900/50 hover:bg-emerald-900/20 text-emerald-400 font-bold text-xs uppercase tracking-widest transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>

            <Link
              to={`/contact?topic=Bug%20Report&msg=${encodeURIComponent(contactMessage)}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-widest transition-all active:scale-95"
            >
              <Mail className="w-4 h-4" />
              Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
