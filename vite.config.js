import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return defineConfig({
    base: process.env.VITE_PRODUCTION_BASE,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "http://localhost:3001/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  });
};
