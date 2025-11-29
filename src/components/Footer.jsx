import content from "../content.json";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  const { hero, socials, contact } = content || {};
  const year = new Date().getFullYear();

  const name = hero?.name || "Your Name";
  const email = contact?.email || "pradul.p123@gmail.com";
  const linkedin = socials?.linkedin || "https://www.linkedin.com/in/pradul/";
  const github = socials?.github || "https://github.com/PRADUL-P";

  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 mt-10">
      <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="text-center md:text-left space-y-1">
          <p className="font-medium text-slate-200">
            {name} <span className="text-sky-400">|</span> Civil Engineer &amp; BIM
            Modeler
          </p>
          <p>© {year} · Built with React &amp; Tailwind.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
         <SocialIcons size={20} spacing="space-x-5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
