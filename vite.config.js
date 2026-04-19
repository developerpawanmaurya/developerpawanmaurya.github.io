import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For a user site at developerpawanmaurya.github.io served at the root domain,
// base should be '/'. If you ever rename the repo to a project site
// (e.g. "portfolio"), change base to '/portfolio/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
