import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const recipifyBackend = process.env.RECIPIFY_BACKEND ?? "http://localhost:8080";
console.log("Recipify Backend", recipifyBackend);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    host: "0.0.0.0",
    port: 8099,
    proxy: {
      "/api": {
        target: recipifyBackend,
        changeOrigin: true,
        xfwd: true,
      },
    },
  },
});
