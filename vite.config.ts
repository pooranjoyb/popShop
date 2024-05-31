import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Define manual chunks based on module ID
          if (id.includes('node_modules')) {
            // Place node_modules dependencies into a separate chunk
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the limit from 500 kB to 1000 kB
  },
});
