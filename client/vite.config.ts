import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: process.env.PORT ? Number(process.env.PORT) : 3000, // Default port if PORT is not set
  },
})
