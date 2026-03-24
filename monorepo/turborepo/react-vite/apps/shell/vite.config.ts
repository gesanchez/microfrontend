import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    tsconfigPaths(),
    federation({
      name: 'app',
      remotes: {
      },
      shared: [
        'react', 
        'react-dom', 
        'react-router',
        'i18next',
        'react-i18next'
      ]
    })
  ],
  server: {
    warmup: {
      clientFiles: ['./src/entry-client.tsx'],
      ssrFiles: ['./src/entry-server.tsx'],
    },
    port: 5172,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    ssrManifest: true,
    ssr: true,
  },
})
