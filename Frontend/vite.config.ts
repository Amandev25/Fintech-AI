import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/auth': 'http://localhost:8000',
      '/users': 'http://localhost:8000',
      '/expenses': 'http://localhost:8000',
      '/budgets': 'http://localhost:8000',
      '/dashboard': 'http://localhost:8000',
      '/ai': 'http://localhost:8000',
    },
  },
})

