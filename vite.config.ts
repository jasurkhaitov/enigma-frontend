import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({ algorithm: 'brotliCompress' }),
  ],
  build: {
    sourcemap: true,
    outDir: 'dist',
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: ['enigmadoc.com'],
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    allowedHosts: ['enigmadoc.com'],
    hmr: process.env.NODE_ENV === 'production' ? false : {
      protocol: 'ws',
      host: 'enigmadoc.com',
      port: 5173,
    },
  },
})