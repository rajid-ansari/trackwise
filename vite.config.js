import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore', 'firebase/auth']
  },
  resolve: {
    alias: {
      'firebase/app': 'firebase/app',
      'firebase/firestore': 'firebase/firestore',
      'firebase/auth': 'firebase/auth'
    }
  }
}) 