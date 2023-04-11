import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config
/** @type {import('vite').UserConfig} */
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": { target: "http://127.0.0.1:8080/", changeOrigin: true },
    },
  },
  plugins: [react(), tsconfigPaths()],
});
