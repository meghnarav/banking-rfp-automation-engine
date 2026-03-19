import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 1. Ensure Environment Variables are accessible
  define: {
    'process.env': {}
  },

  // 2. Resolve for PDF.js Worker (Crucial for the "Non-AI" Parser)
  resolve: {
    alias: {
      // This prevents the "Module not found" error with pdfjs-dist
      'pdfjs-dist': 'pdfjs-dist/build/pdf.mjs',
    },
  },

  // 3. Build Optimizations for the Hackathon Demo
  build: {
    outDir: 'dist',
    sourcemap: false, // Hide your source code logic from casual inspection
    minify: 'terser', // High-level minification for faster loading
    rollupOptions: {
      output: {
        // Splitting code into chunks so the initial load is under 1 second
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          pdf: ['pdfjs-dist'],
          ai: ['@google/generative-ai']
        }
      }
    }
  },

  // 4. Development Server Settings
  server: {
    port: 3000,
    open: true, // Automatically opens the browser when you run 'npm run dev'
    cors: true  // Prevents API blocking during testing
  }
})