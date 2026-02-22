import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";


// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5172,
  },
  plugins: [
    react(),
    federation({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./Dashboard": {
          import: "./src/App.tsx",
          name: "Dashboard",
          dontAppendStylesToHead: false
        },
      },
      shared: [
        'react',
        'react-dom',
      ]
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true,
  }
})
