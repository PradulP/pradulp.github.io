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
      setForm({ name: "", email: "", topic: "", message: "" });
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
      className="min-h-[calc(100vh-4rem)] flex items-center px-4 py-10"
    >
      <div className="w-full max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.2fr,1.4fr] items-start">
        {/* LEFT SIDE */}
        <section className="space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-400">
            Let&apos;s collaborate
          </p>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Contact <span className="text-sky-400">Me</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300">
              I help with{" "}
              <span className="text-sky-300 font-medium">
                BIM modelling, CAD detailing, civil engineering workflows, and
                front-end tools for AEC
              </span>
              . Whether it&apos;s a project, collaboration, or a quick doubt,
              feel free to reach out.
            </p>
          </div>

          {/* Typical requests */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Typical requests
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                "BIM & Revit modelling",
                "CAD drawings & detailing",
                "Site & infrastructure coordination",
                "Automation / pyRevit / Dynamo",
                "Web tools for engineers",
                "Portfolio / mentorship chat",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Contact channels */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Email card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                <span className="text-lg">📧</span>
                Email
              </div>
              <p className="text-sm font-medium break-all">
                <a
                  href={`mailto:${primaryEmail}`}
                  className="hover:text-sky-400 transition"
                >
                  {primaryEmail}
                </a>
              </p>
              <p className="text-xs text-slate-400">
                Best for detailed project briefs and formal communication.
              </p>
            </div>

            {/* LinkedIn */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                <span className="text-lg">🔗</span>
                LinkedIn
              </div>
              <p className="text-sm font-medium break-all">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-400 transition"
                >
                  View LinkedIn profile
                </a>
              </p>
              <p className="text-xs text-slate-400">
                Good for networking, opportunities, and professional messages.
              </p>
            </div>

            {/* WhatsApp card (with custom message) */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                <span className="text-lg">💬</span>
                WhatsApp
              </div>
              <p className="text-sm font-medium">
                <a
                  href={getWhatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-400 transition"
                >
                  Chat on WhatsApp
                </a>
              </p>
              <p className="text-xs text-slate-400">
                Quick questions, clarifications, and coordination.
              </p>
            </div>

            {/* Location / portfolio */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                <span className="text-lg">📍</span>
                Location
              </div>
              <p className="text-sm font-medium">{location}</p>
              <p className="text-xs text-slate-400">
                Available for remote work and collaborations.{" "}
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  View full portfolio ↗
                </a>
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            Usually replies within{" "}
            <span className="text-sky-300">24–48 hours</span>, depending on site
            / office work.
          </p>
        </section>

        {/* RIGHT SIDE: FORM */}
        <section className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl shadow-sky-500/10">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Send a message
              </p>
              <h2 className="text-lg md:text-xl font-semibold mt-1">
                Tell me about your idea or project
              </h2>
            </div>
            <div className="hidden sm:flex flex-col items-end text-[11px] text-slate-500">
              <span>Preferred: English / Malayalam</span>
              <span className="text-sky-300">
                {hero?.name || "Your Name"}
              </span>
            </div>
          </div>

          {status.type && (
            <div
              className={`mb-4 rounded-xl border px-3 py-2 text-xs ${status.type === "success"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                : "border-red-500/40 bg-red-500/10 text-red-200"
                }`}
            >
              {status.message}
            </div>
          )}

          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            {/* hidden fields for EmailJS template names */}
            <input type="hidden" name="user_name" value={form.name} />
            <input type="hidden" name="user_email" value={form.email} />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-[0.2em] text-slate-400"
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-xl bg-slate-950/60 border border-slate-700 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-[0.2em] text-slate-400"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={primaryEmail}
                  className="w-full rounded-xl bg-slate-950/60 border border-slate-700 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="topic"
                className="text-xs uppercase tracking-[0.2em] text-slate-400"
              >
                Topic (optional)
              </label>
              <select
                id="topic"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-950/60 border border-slate-700 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              >
                <option value="">Select a topic</option>
                <option value="bim">BIM / Revit modelling</option>
                <option value="cad">CAD drawings / detailing</option>
                <option value="automation">Automation / pyRevit / tools</option>
                <option value="web">
                  Web / portfolio or engineering app
                </option>
                <option value="collab">Collaboration / partnership</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-[0.2em] text-slate-400"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Share a few details about your project, timeline, and what you’re looking for..."
                className="w-full rounded-xl bg-slate-950/60 border border-slate-700 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium bg-sky-500 hover:bg-sky-400 text-slate-950 transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {/* quick links inc. WhatsApp with custom message */}
              <div className="flex flex-wrap gap-3 text-[11px] text-slate-400">
                <a
                  href={getMailtoLink()}
                  className="hover:text-sky-300 underline-offset-4 hover:underline"
                >
                  Email directly ↗
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-300 underline-offset-4 hover:underline"
                >
                  Message on LinkedIn ↗
                </a>
                <a
                  href={getWhatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-300 underline-offset-4 hover:underline"
                >
                  WhatsApp ↗
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-300 underline-offset-4 hover:underline"
                >
                  View GitHub ↗
                </a>
              </div>
            </div>
          </form>
        </section>
      </div>

      {/* popup */}
      {isPopupOpen && status.type === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl px-6 py-5 max-w-sm w-full text-sm text-slate-100">
            <h3 className="text-base font-semibold text-emerald-300 mb-2">
              Message sent!
            </h3>
            <p className="text-slate-300 mb-4">
              Thank you for your message. I&apos;ll get back to you on your
              email or WhatsApp as soon as possible.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-sky-500 text-slate-950 text-xs font-medium hover:bg-sky-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Contact;
