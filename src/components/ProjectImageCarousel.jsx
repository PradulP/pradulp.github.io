// src/components/ProjectImageCarousel.jsx
import { useState, useEffect } from "react";

export default function ProjectImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const interval = 4000; // 4 seconds

  if (!images.length) return null;

  /* ===== AUTO SLIDE ===== */
  useEffect(() => {
    if (paused || images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [paused, images.length, interval]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-slate-800"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* IMAGE */}
      <img
        src={images[index]}
        alt={`Project visual ${index + 1}`}
        width="800"
        height="420"
        className="w-full h-[420px] object-cover"
      />

      {/* LEFT ARROW */}
      {images.length > 1 && (
        <button
          onClick={() =>
            setIndex((index - 1 + images.length) % images.length)
          }
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full text-white"
        >
          ‹
        </button>
      )}

      {/* RIGHT ARROW */}
      {images.length > 1 && (
        <button
          onClick={() =>
            setIndex((index + 1) % images.length)
          }
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full text-white"
        >
          ›
        </button>
      )}

      {/* DOT INDICATORS */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === index ? "bg-sky-400" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
