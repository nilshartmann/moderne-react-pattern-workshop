import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// http://localhost:8099/recipes?orderBy=time&page=4

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
