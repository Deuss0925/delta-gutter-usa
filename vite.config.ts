import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Keep the heavy 3D stack in its own async chunk so it only loads
        // when a scene mounts — the initial bundle stays lean.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@react-three') || id.includes('/three/')) {
              return 'three-vendor'
            }
          }
        },
      },
    },
  },
})
