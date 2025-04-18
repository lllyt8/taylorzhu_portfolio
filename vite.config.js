import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  publicDir: 'client/public',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
