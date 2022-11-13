// @ts-nocheck
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import vitePluginImp from "vite-plugin-imp";
import lessVarsToJs from "less-vars-to-js";
import fs from "fs";
import { dependencies } from "./package.json";

const pathResolver = (path: string) => resolve(__dirname, path);
const hash = Math.floor(Math.random() * 90000) + 10000;
const themeVariables = lessVarsToJs(
  fs.readFileSync(pathResolver("./src/styles/variables.less"), "utf8")
);

function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (["react", "react-router-dom", "react-dom"].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "antd",
          style(name) {
            // use less
            return `antd/es/${name}/style/index.js`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": pathResolver("./src"),
    },
  },
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name]` + hash + `.js`,
        chunkFileNames: `[name]` + hash + `.js`,
        assetFileNames: `[name]` + hash + `.[ext]`,
        manualChunks: {
          vendor: ["react", "react-router-dom", "react-dom"],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: themeVariables,
        javascriptEnabled: true,
      },
    },
  },
});
