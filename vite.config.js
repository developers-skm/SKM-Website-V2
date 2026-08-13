import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import fs from 'fs'
import path from 'path'

function copyOfflineAssets() {
  return {
    name: 'copy-offline-assets',
    buildStart() {
      const srcPath = 'C:\\Users\\it-web1\\.gemini\\antigravity-ide\\brain\\9ad327b8-76af-4f02-9aa5-d9a1a27716d1\\offline_cracked_wifi_egg_1786601603423.png';
      const destPublic = path.resolve(__dirname, 'public/images/offline-cracked-wifi-egg.png');
      const destAssets = path.resolve(__dirname, 'src/assets/images/offline-cracked-wifi-egg.png');

      if (fs.existsSync(srcPath)) {
        try {
          fs.mkdirSync(path.dirname(destPublic), { recursive: true });
          fs.mkdirSync(path.dirname(destAssets), { recursive: true });
          fs.copyFileSync(srcPath, destPublic);
          fs.copyFileSync(srcPath, destAssets);
          console.log('[copy-offline-assets] Successfully copied offline hero image');
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


