import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const pageTransition = {
  duration: 0.4,              // faster, snappier
  ease: [0.25, 0.1, 0.25, 1], // standard ease-out
};

// Simplified variants for better performance
const pageVariants = {
  initial: {
    opacity: 1, // Start visible to zero-out LCP delay
    y: 0,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -5,
  },
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
