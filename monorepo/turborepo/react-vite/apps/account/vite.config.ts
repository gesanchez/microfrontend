import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";


// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    react(),
    federation({
      name: "account",
      filename: "remoteEntry.js",
      exposes: {
        "./Account": {
          import: "./src/App.tsx",
          name: "Account",
          dontAppendStylesToHead: false
        },
      },
      shared: [
        'react',
        'react-dom',
        'react-router',
        'i18next',
        'react-i18next'
      ]
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
  },
  preview: {
    port: 5002,
    strictPort: true,
    cors: true,
  }
})
