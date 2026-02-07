import { useState, useRef } from "react";
import { motion } from "framer-motion";
import content from "../data/index"; // Unified data
import emailjs from "@emailjs/browser";
import { fadeInUp } from "../utils/animations";

const Contact = () => {
  const { hero, contact, socials } = content || {};

  // ✅ Your real details (can also move to content.json)
  const primaryEmail = contact?.email || "pradul.p123@gmail.com";

  const location = contact?.location || "Kochi, Kerala, India";
  const whatsappNumber = contact?.whatsapp || "+918078376902";

  const linkedinUrl =
    socials?.linkedin || "https://www.linkedin.com/in/pradul/";
  const githubUrl = socials?.github || "https://github.com/PRADUL-P";
  const portfolioUrl =
    socials?.portfolio || "https://your-portfolio-link.com";

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    topic: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // name will be: "name", "email", "topic", "message"
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus({ type: null, message: "" });
  };

  // ---------- Helpers for custom contact messages ----------

  const getPhoneDigits = () => {
    const cleaned = (whatsappNumber || "").replace(/[^0-9]/g, "");
    // fallback in case content.json has something weird like only "91"
    return cleaned.length < 10 ? "918078376902" : cleaned;
  };

  const getWhatsappLink = () => {
    const phone = getPhoneDigits();

    const topicText =
      form.topic === "bim"
        ? "BIM / Revit modelling"
        : form.topic === "cad"
          ? "CAD drawings & detailing"
          : form.topic === "automation"
            ? "Automation / pyRevit / tools"
            : form.topic === "web"
              ? "web / portfolio or engineering app"
              : form.topic === "collab"
                ? "collaboration / partnership"
                : form.topic
                  ? form.topic
                  : "a project / query";

    const sender =
      form.name?.trim().length > 0 ? form.name.trim() : "a visitor";

    const bodyLines = [
      `Hi, this is ${sender} from your portfolio site.`,
      `I would like to talk about ${topicText}.`,
    ];

    if (form.message.trim()) {
      bodyLines.push("", `Brief: ${form.message.trim()}`);
    }

    const message = bodyLines.join("\n");
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const getMailtoLink = () => {
    const subjectTopic = form.topic
      ? `Portfolio enquiry – ${form.topic}`
      : "Portfolio enquiry";

    const subject = encodeURIComponent(subjectTopic);

    const bodyLines = [
      `Hi Pradul,`,
      "",
      `I found your portfolio and would like to discuss a project / idea.`,
      form.topic ? `Topic: ${form.topic}` : "",
      "",
      form.message.trim()
        ? `Details:\n${form.message.trim()}`
        : "Details:\n(please add here...)",
      "",
      `Name: ${form.name || ""}`,
      `Email: ${form.email || ""}`,
      form.whatsapp ? `WhatsApp: ${form.whatsapp}` : "",
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join("\n"));
    return `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
  };

  // ---------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus({
        type: "error",
        message: "Please fill in your name, email, and message.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // ✅ EmailJS – using HIDDEN fields to match your template names
      await emailjs.sendForm(
        "service_4o9iuyq",
        "template_n73jr3r",
        formRef.current,
        "IqjV-GrAd-SbsJIud"
      );

      setStatus({
        type: "success",
        message:
          "Thanks for reaching out! I’ve received your message and will get back to you.",
      });
      setForm({ name: "", email: "", whatsapp: "", topic: "", message: "" });
      setIsPopupOpen(true);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          "Something went wrong while sending. Please try again or use email / LinkedIn / WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="min-h-screen relative overflow-hidden font-sans selection:bg-sky-500/30"
    >
      {/* Background CAD Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(var(--cad-grid)_1px,transparent_1px),linear-gradient(90deg,var(--cad-grid)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-20 relative z-10 space-y-12">
        {/* Engineering Header */}
        <header className="space-y-3 border-l-4 border-sky-500 pl-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-sky-400 font-mono font-bold">
              Let&apos;s talk
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-slate-100">
            Contact <span className="text-sky-500">Me</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl font-medium leading-relaxed">
            I help with <span className="text-slate-100 font-bold">BIM modelling, CAD detailing, civil engineering workflows</span>, and <span className="text-sky-400 font-bold">front-end tools for AEC</span>. Feel free to reach out for projects or collaborations.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr,1.4fr] items-start">
          {/* LEFT SIDE: MISSION CONTROL */}
          <section className="space-y-10">
            {/* SIGNAL STATUS */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-6 backdrop-blur-sm space-y-6 relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border border-sky-500/30 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
                <div className="font-mono">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Current Location</p>
                  <p className="text-xs text-slate-100 font-bold uppercase tracking-tighter">{location}</p>
                  <p className="text-[9px] text-sky-400 font-bold">Available for remote work</p>
                </div>
              </div>

              {/* TYPICAL REQUESTS */}
              <div className="space-y-3">
                <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1">How I can help</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "BIM & Revit Modelling",
                    "CAD Automation",
                    " pyRevit & Dynamo",
                    "Web tools for engineers",
                    "Project Coordination"
                  ].map((item) => (
                    <span key={item} className="text-[9px] font-mono font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CHANNEL MATRIX */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Channel 01: EMAIL */}
              <a href={`mailto:${primaryEmail}`} className="group p-4 bg-slate-950/40 border border-slate-800 rounded-xl hover:border-sky-500/50 transition-all">
                <p className="text-[9px] font-mono text-slate-500 uppercase mb-1">Email</p>
                <p className="text-xs text-slate-300 font-bold group-hover:text-sky-400 truncate">{primaryEmail}</p>
                <p className="text-[8px] text-slate-600 mt-2 uppercase font-mono tracking-tighter">// For project inquiries</p>
              </a>

              {/* Channel 02: WHATSAPP */}
              <a href={getWhatsappLink()} target="_blank" rel="noreferrer" className="group p-4 bg-slate-950/40 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-all">
                <p className="text-[9px] font-mono text-slate-500 uppercase mb-1">WhatsApp</p>
                <p className="text-xs text-slate-300 font-bold group-hover:text-emerald-400 truncate">Chat on WhatsApp ↗</p>
                <p className="text-[8px] text-slate-600 mt-2 uppercase font-mono tracking-tighter">// For quick coordination</p>
              </a>

              {/* Channel 03: LINKEDIN */}
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="group p-4 bg-slate-950/40 border border-slate-800 rounded-xl hover:border-sky-500/50 transition-all">
                <p className="text-[9px] font-mono text-slate-500 uppercase mb-1">LinkedIn</p>
                <p className="text-xs text-slate-300 font-bold group-hover:text-sky-400">View LinkedIn Profile ↗</p>
              </a>

              {/* Channel 04: GITHUB */}
              <a href={githubUrl} target="_blank" rel="noreferrer" className="group p-4 bg-slate-950/40 border border-slate-800 rounded-xl hover:border-slate-500 transition-all">
                <p className="text-[9px] font-mono text-slate-500 uppercase mb-1">GitHub</p>
                <p className="text-xs text-slate-300 font-bold group-hover:text-slate-100">View Repositories ↗</p>
              </a>
            </div>

            <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest leading-relaxed">
              I usually reply within 24–48 hours depending on office work.
            </p>
          </section>

          {/* RIGHT SIDE: DATA TRANSMISSION FORM */}
          <section className="bg-slate-950/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden">
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-sky-500/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-sky-500/30" />

            <header className="mb-8">
              <p className="text-[10px] uppercase font-mono tracking-widest text-sky-500 font-bold mb-1">Send a message</p>
              <h2 className="text-xl font-black text-slate-100 uppercase tracking-tighter italic">Tell me about your project</h2>
            </header>

            {status.type && (
              <div className={`mb-6 p-4 rounded-lg border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${status.type === "success"
                ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                : "border-red-500/20 bg-red-500/5 text-red-400"}`}>
                <div className={`w-2 h-2 rounded-full ${status.type === "success" ? "bg-emerald-500" : "bg-red-500"} animate-pulse`} />
                <p className="text-[11px] font-mono font-bold uppercase">{status.message}</p>
              </div>
            )}

            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Name *</label>
                <input
                  name="name" value={form.name} onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-800 p-3 text-sm text-sky-400 outline-none focus:border-sky-500 transition-colors uppercase font-mono placeholder:opacity-20"
                  placeholder="Your name"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Email *</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-800 p-3 text-sm text-sky-400 outline-none focus:border-sky-500 transition-colors uppercase font-mono placeholder:opacity-20"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">WhatsApp (optional)</label>
                  <input
                    name="whatsapp" value={form.whatsapp} onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-800 p-3 text-sm text-sky-400 outline-none focus:border-sky-500 transition-colors uppercase font-mono placeholder:opacity-20"
                    placeholder="+91"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Topic (optional)</label>
                <select
                  name="topic" value={form.topic} onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-800 p-3 text-sm text-sky-400 outline-none focus:border-sky-500 transition-colors uppercase font-mono appearance-none"
                >
                  <option value="">Select a topic</option>
                  <option value="bim">BIM / Revit Modelling</option>
                  <option value="cad">CAD Detailing</option>
                  <option value="automation">Software Tools</option>
                  <option value="web">Web Utility</option>
                  <option value="collab">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Message *</label>
                <textarea
                  name="message" rows={5} value={form.message} onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-800 p-4 text-sm text-slate-300 outline-none focus:border-sky-500 transition-colors font-mono placeholder:opacity-20 resize-none"
                  placeholder="Share a few details..."
                />
              </div>

              <button
                type="submit" disabled={isSubmitting}
                className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs uppercase tracking-[0.3em] transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98] shadow-[0_10px_20px_rgba(14,165,233,0.3)]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </section>
        </div>
      </div>

      {/* SUCCESS POPUP AESTHETIC */}
      {isPopupOpen && status.type === "success" && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl px-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-slate-900 border border-sky-500/30 rounded-2xl px-8 py-8 max-w-sm w-full text-center space-y-6 shadow-[0_0_100px_rgba(14,165,233,0.2)]">
            <div className="w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center mx-auto border border-sky-500/40">
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-slate-900 stroke-[3]"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-100 uppercase tracking-tighter">Message Sent!</h3>
              <p className="text-[11px] font-mono text-slate-400 uppercase leading-relaxed">Thank you for reaching out. I will get back to you as soon as possible.</p>
            </div>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="w-full py-3 rounded-lg bg-sky-500 text-slate-950 text-xs font-black uppercase tracking-widest hover:bg-sky-400 transition-all project-card"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Contact;
