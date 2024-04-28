import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

const recipifyBackend = process.env.RECIPIFY_BACKEND ?? "http://localhost:8080";
console.log("Recipify Backend", recipifyBackend);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    port: 8090,
    proxy: { "/api": recipifyBackend },
  },
});
