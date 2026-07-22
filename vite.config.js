import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@babel/runtime/helpers/createSuper',
      'react-swipeable-views-react-18-fix',
    ],
  },
  build: {
    chunkSizeWarningLimit: 1600, // Warning threshold badhane ke liye
    commonjsOptions: {
      include: [/@babel\/runtime/, /node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui') || id.includes('@emotion')) return 'mui-vendor';
            if (id.includes('framer-motion') || id.includes('gsap')) return 'animation-vendor';
            if (id.includes('firebase')) return 'firebase-vendor';
            return 'vendor';
          }
        },
      },
    },
  },
})