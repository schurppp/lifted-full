import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/lifted-full/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles werden hinzugefuegt sobald src/test/setup.ts existiert (Sprint 5)
  },
})
