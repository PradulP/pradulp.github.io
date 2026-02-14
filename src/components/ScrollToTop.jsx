import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Show button when page is scrolled
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <button
                    key="scroll-to-top"
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-4 md:right-8 z-[110] group"
                    aria-label="Scroll to top"
                >
                    {/* Outer rotating ring */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-sky-500/40 animate-[spin_10s_linear_infinite]" />

                    {/* Middle pulsing glow */}
                    <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-md transform group-hover:scale-125 transition-transform duration-500" />

                    {/* Main button container */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative w-12 h-12 flex items-center justify-center rounded-full bg-slate-950/90 border border-sky-500/50 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md overflow-hidden"
                    >
                        {/* Hover fill effect */}
                        <div className="absolute inset-0 bg-sky-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />

                        <ArrowUp className="w-5 h-5 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </motion.div>
                </button>
            )}
        </AnimatePresence>
    );
}
