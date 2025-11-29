import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-sky-400">
          404 - Page not found
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold">
          This page is still under{" "}
          <span className="text-sky-400">construction</span>.
        </h1>
        <p className="text-sm text-slate-300">
          The link you opened doesn&apos;t exist yet. You can go back to the
          homepage or reach out if you were looking for something specific.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link
            to="/"
            className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-medium hover:bg-sky-400 transition"
          >
            Go to Home
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/70 text-slate-100 hover:border-sky-500/70 transition"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
