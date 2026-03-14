import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // IMPORTANT for pradul.github.io
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only split out the two heaviest libraries that are NOT needed at first paint
          // Everything else stays in a single index chunk for fewer HTTP requests on mobile
          if (id.includes("node_modules/framer-motion")) {
            return "framer-motion";
          }
          if (
            id.includes("node_modules/three") ||
            id.includes("node_modules/@react-three")
          ) {
            return "three";
          }
          // All other node_modules stay in one "vendor" bundle
          // This avoids too many sequential requests on slow mobile connections
          if (id.includes("node_modules/")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});
