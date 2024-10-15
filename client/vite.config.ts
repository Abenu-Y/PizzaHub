import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   build: {
    // Set chunking strategy to optimize memory usage
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  server: {
    host: '0.0.0.0', // Ensure it's accessible externally
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  },
 
})
