import { useRef, useState, useEffect } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function StatsCounter({ from = 0, to = 100, duration = 1.2, suffix = "+", label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: duration * 1000
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [isInView, to, motionValue]);

  // Render value as integer
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);


  return (
    <div ref={ref} className="text-center p-6 flex flex-col items-center justify-center h-full">
      <div className="text-3xl md:text-4xl font-black text-slate-100 tabular-nums tracking-tight">
        {displayValue}
        <span className="text-transparent bg-clip-text bg-gradient-to-tr from-sky-400 to-emerald-400 ml-1">{suffix}</span>
      </div>
      {label && <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-2">{label}</div>}
    </div>
  );
}
