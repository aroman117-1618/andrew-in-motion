import { defineConfig } from ‘vite’
import react from ‘@vitejs/plugin-react’

export default defineConfig({
plugins: [react()],

// Performance optimizations
build: {
// Enable source maps for production debugging
sourcemap: true,

// Optimize chunk splitting
rollupOptions: {
  output: {
    manualChunks: {
      // Separate vendor chunks for better caching
      vendor: ['react', 'react-dom'],
    },
  },
},

// Compress assets
minify: 'terser',
terserOptions: {
  compress: {
    drop_console: true, // Remove console.log in production
    drop_debugger: true,
  },
},

// Optimize CSS
cssCodeSplit: true,

// Set chunk size warnings
chunkSizeWarningLimit: 600,


},

// Development server optimizations
server: {
// Faster HMR
hmr: {
overlay: true,
},
},

// Preview server for production builds
preview: {
port: 3000,
host: true,
},

// Optimize dependencies
optimizeDeps: {
include: [‘react’, ‘react-dom’],
// Pre-bundle heavy dependencies
force: true,
},

// CSS preprocessing
css: {
devSourcemap: true,
preprocessorOptions: {
// Add any CSS preprocessor options here
},
},

// Asset handling
assetsInclude: [’**/*.svg’, ’**/*.png’, ’**/*.jpg’, ‘**/*.jpeg’, ’**/*.gif’],

// Base URL for deployment (adjust for your domain)
base: ‘/’,
})