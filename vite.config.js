import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import fs from 'fs'
import path from 'path'

function copyOfflineAssets() {
  return {
    name: 'copy-offline-assets',
    buildStart() {
      const srcAssets = path.resolve(__dirname, 'src/assets/images/offline-cracked-wifi-egg.png');
      const destPublic = path.resolve(__dirname, 'public/images/offline-cracked-wifi-egg.png');

      if (fs.existsSync(srcAssets) && !fs.existsSync(destPublic)) {
        try {
          fs.mkdirSync(path.dirname(destPublic), { recursive: true });
          fs.copyFileSync(srcAssets, destPublic);
          console.log('[copy-offline-assets] Synchronized offline hero image to public directory');
        } catch (e) {
          console.error('[copy-offline-assets] Error copying image:', e);
        }
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [copyOfflineAssets(), react(), tailwindcss()],
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react-simple-maps', 'prop-types'],
  },
})


