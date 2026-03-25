import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from "@tailwindcss/vite";
import { virtualFederationSSRPlugin } from "@repo/vite-config";

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    tailwindcss(),
    react(),
    tsconfigPaths(),
    ...(isSsrBuild ? [virtualFederationSSRPlugin()] : [
      federation({
        name: 'app',
        remotes: {
          dummy: "dummy.js",
        },
        shared: [
        'react', 
        'react-dom', 
        'react-router',
        'i18next',
        'react-i18next'
      ]
    })])
  ],
  server: {
    warmup: {
      clientFiles: ['./src/entry-client.tsx'],
      ssrFiles: ['./src/entry-server.tsx'],
    },
    port: 5174,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    ssrManifest: true,
  },
}))
