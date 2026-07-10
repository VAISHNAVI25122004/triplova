import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isVercel = process.env.VERCEL === 'true' || process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isVercel ? '/' : '/triplova/',
  server: {
    port: 3333,
    proxy: {
      '/triplova-project/api': {
        target: 'https://triplova.com',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      }
    }
  }
})
