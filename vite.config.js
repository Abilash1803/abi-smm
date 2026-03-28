import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 5173,
    host: true,
    open: true,
    cors: true,
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "frame-ancestors 'self'"
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  }
});
