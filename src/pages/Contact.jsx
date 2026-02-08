import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "../data/index"; // Unified data
import emailjs from "@emailjs/browser";
import Typewriter from "../components/Typewriter";
import {
  Send,
  MapPin,
  Mail,
  MessageCircle,
  Linkedin,
  Github,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Cpu,
  Globe
} from "lucide-react";

const Contact = () => {
  const { hero, contact, socials } = content || {};

  // ✅ Your real details
  const primaryEmail = contact?.email || "pradul.p123@gmail.com";
  const location = contact?.location || "Kochi, Kerala, India";
  const whatsappNumber = contact?.whatsapp || "+918078376902";
  const linkedinUrl = socials?.linkedin || "https://www.linkedin.com/in/pradul/";
  const githubUrl = socials?.github || "https://github.com/PRADUL-P";

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
  const [showHeadline, setShowHeadline] = useState(false);

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus({ type: null, message: "" });
  };

  const getPhoneDigits = () => {
    const cleaned = (whatsappNumber || "").replace(/[^0-9]/g, "");
    return cleaned.length < 10 ? "918078376902" : cleaned;
  };

  const getWhatsappLink = () => {
    const phone = getPhoneDigits();
    const topicText = form.topic ? form.topic : "a project / query";
    const sender = form.name?.trim().length > 0 ? form.name.trim() : "a visitor";
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

      // Simulating network delay for effect if no EmailJS keys actually set
      // await new Promise(r => setTimeout(r, 1500)); 

      await emailjs.sendForm(
        "service_4o9iuyq",
        "template_n73jr3r",
        formRef.current,
        "IqjV-GrAd-SbsJIud"
      );

      setStatus({
        type: "success",
        message: "Translation Complete. Message Received.",
      });
      setForm({ name: "", email: "", whatsapp: "", topic: "", message: "" });
      setIsPopupOpen(true);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Transmission Failed. Please use direct comms.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden font-sans selection:bg-sky-500/30 bg-slate-950 pb-20">

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(var(--cad-grid)_1px,transparent_1px),linear-gradient(90deg,var(--cad-grid)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-32 relative z-10 space-y-12">

        {/* HEADER SECTION */}
        <header className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse box-shadow-[0_0_8px_#0ea5e9]" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-sky-400 font-mono font-bold">
              Communication_Link_Active
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-slate-100 leading-none">
            <Typewriter text="Establish" delay={100} speed={80} onComplete={() => setShowHeadline(true)} />
            <br className="md:hidden" />
            <span className="md:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
              {showHeadline && <Typewriter text="Connection" speed={80} />}
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-2xl font-medium leading-relaxed md:border-l-2 md:border-slate-800 md:pl-6 mx-auto md:mx-0">
            Open for collaborations on <span className="text-slate-100 font-bold">BIM workflows, automation tools, and full-stack engineering apps</span>.
            Status: <span className="text-emerald-400 font-bold">Available</span> for freelance & projects.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1fr,1.5fr] items-start">

          {/* LEFT SIDE: CONTROL PANEL */}
          <section className="space-y-6">
            {/* Status Card */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-sky-500/30 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">Based In</h3>
                  <p className="text-sm text-slate-400 font-mono">{location}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wide">Remote_Capable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Grid */}
            <div className="grid gap-4">
              <a href={`mailto:${primaryEmail}`} className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-900/60 hover:border-sky-500/40 transition-all">
                <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-0.5">Direct_Mail</p>
                  <p className="text-sm font-bold text-slate-200 truncate group-hover:text-sky-400 transition-colors">{primaryEmail}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                </div>
              </a>

              <a href={getWhatsappLink()} target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-900/60 hover:border-emerald-500/40 transition-all">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-0.5">Quick_Chat</p>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">WhatsApp ↗</p>
                </div>
              </a>

              <div className="grid grid-cols-2 gap-4">
                <a href={linkedinUrl} target="_blank" rel="noreferrer" className="group p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-sky-600/40 transition-all flex flex-col items-center justify-center gap-2 hover:bg-sky-900/10">
                  <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-sky-400 transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-sky-300">LinkedIn</span>
                </a>
                <a href={githubUrl} target="_blank" rel="noreferrer" className="group p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-600/40 transition-all flex flex-col items-center justify-center gap-2 hover:bg-slate-800/50">
                  <Github className="w-6 h-6 text-slate-400 group-hover:text-slate-200 transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-300">GitHub</span>
                </a>
              </div>
            </div>
          </section>

          {/* RIGHT SIDE: TRANSMISSION FORM */}
          <section className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-2xl opacity-20 blur-lg" />

            <div className="relative bg-slate-950/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-sky-500" />
                  <h2 className="text-lg font-bold text-slate-100 uppercase tracking-tight">Transmission_Console</h2>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-sky-400 transition-colors">Identity_Name *</label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-sky-500 focus:bg-slate-900 focus:shadow-[0_0_15px_rgba(14,165,233,0.1)] transition-all placeholder:text-slate-700"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-sky-400 transition-colors">Return_Address (Email) *</label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-sky-500 focus:bg-slate-900 focus:shadow-[0_0_15px_rgba(14,165,233,0.1)] transition-all placeholder:text-slate-700"
                      placeholder="name@corp.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-sky-400 transition-colors">Signal_Frequency (Phone)</label>
                    <input
                      name="whatsapp" value={form.whatsapp} onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-sky-500 focus:bg-slate-900 focus:shadow-[0_0_15px_rgba(14,165,233,0.1)] transition-all placeholder:text-slate-700"
                      placeholder="+91..."
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-sky-400 transition-colors">Subject_Vector</label>
                    <select
                      name="topic" value={form.topic} onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-sky-500 focus:bg-slate-900 transition-all appearance-none cursor-pointer hover:bg-slate-900"
                    >
                      <option value="">Select Protocol...</option>
                      <option value="bim">BIM / Revit Modelling</option>
                      <option value="cad">CAD Detailing</option>
                      <option value="automation">Automation Scripts</option>
                      <option value="web">Web Application</option>
                      <option value="collab">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-sky-400 transition-colors">Data_Packet (Message) *</label>
                  <textarea
                    name="message" rows={5} value={form.message} onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-sm text-slate-200 outline-none focus:border-sky-500 focus:bg-slate-900 focus:shadow-[0_0_15px_rgba(14,165,233,0.1)] transition-all placeholder:text-slate-700 resize-none font-mono leading-relaxed"
                    placeholder="Initialize transmission content..."
                  />
                </div>

                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>Processing <div className="w-2 h-2 rounded-full bg-slate-900 animate-ping" /></>
                  ) : (
                    <>Initialize Upload <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>

              {/* Status Readout */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                <span>Secure_Connection: TLS_1.3</span>
                <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-emerald-500" /> System_Ready</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(16,185,129,0.2)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-50"><CheckCircle2 className="w-12 h-12 text-emerald-500/10" /></div>

              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_#10b981]">
                  <CheckCircle2 className="w-5 h-5 text-slate-950" />
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-100 uppercase tracking-tighter mb-2">Transmission Successful</h3>
              <p className="text-xs text-slate-400 font-medium mb-8 leading-relaxed">
                Packet delivery confirmed. I will decode your message and respond via the provided communication channel shortly.
              </p>

              <button
                onClick={() => setIsPopupOpen(false)}
                className="w-full py-3 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-all"
              >
                Close Console
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default Contact;
