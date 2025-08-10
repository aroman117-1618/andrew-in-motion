// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Production build
  build: {
    sourcemap: true, // keep if you actually use prod debugging; otherwise set false
    // Use esbuild (faster) instead of terser, but still drop console/debugger
    minify: 'esbuild',
    esbuild: {
      drop: ['console', 'debugger'],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
  },

  // Dev server (ignored on Netlify, but fine locally)
  server: {
    hmr: {
      overlay: true,
    },
  },

  // Preview server (local only; Netlify doesn’t use this)
  preview: {
    port: 3000,
    host: true,
  },

  // Dependency optimization (runs in dev, not during Netlify’s prod build)
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // force: true can slow dev startup and is rarely needed; remove unless you truly need it
    // force: true,
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      // add options if you actually use Sass/Less/etc.
    },
  },

  // Extra asset globs (Vite already handles these, so this is optional)
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],

  // Base is '/' by default; keep only if you’re deploying under a subpath
  // base: '/',
})