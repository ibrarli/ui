import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // This helps Vite handle the workspace link correctly
  optimizeDeps: {
    include: ['@apen-ui/core'],
  },
})