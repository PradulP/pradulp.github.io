import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
    filter: "blur(14px)",
    scale: 0.97,
    y: 10,
  },
  in: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    filter: "blur(10px)",
    scale: 1.02,
    y: -10,
  },
};

const pageTransition = {
  duration: 0.75,         // cinematic slow
  ease: [0.22, 0.61, 0.36, 1], // smooth easeOut curve
};

export default function AnimWrapper({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className="px-4 md:px-0 pb-10 max-w-5xl mx-auto"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
