import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Static SPA build: `vite build` writes index.html + assets to dist/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom"],
  },
});
