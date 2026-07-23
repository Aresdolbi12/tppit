import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages: https://aresdolbi12.github.io/tppit/
export default defineConfig({
  base: '/tppit/',
  plugins: [react(), tailwindcss()],
})
