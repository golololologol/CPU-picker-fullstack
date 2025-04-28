/// <reference types="vite/client" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd());
  // shell environment variables override .env files
  const apiBase = process.env.VITE_API_BASE_URL || fileEnv.VITE_API_BASE_URL || '/api';
  return {
    plugins: [react()],
    define: { 'import.meta.env.VITE_API_BASE_URL': JSON.stringify(apiBase) },
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          target: apiBase,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});