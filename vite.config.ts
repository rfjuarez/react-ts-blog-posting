/// <reference types="vitest" />
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    include: ['**/*.test.ts', '**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
  },
  plugins: [
      react()],
})
