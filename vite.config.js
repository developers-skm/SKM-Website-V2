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
      const dataUriFile = path.resolve(__dirname, 'src/assets/images/offlineEggPngDataUri.js');

      if (fs.existsSync(srcAssets)) {
        try {
          fs.mkdirSync(path.dirname(destPublic), { recursive: true });
          fs.copyFileSync(srcAssets, destPublic);

          const buffer = fs.readFileSync(srcAssets);
          const base64 = buffer.toString('base64');
          const content = `// Auto-generated PNG Data URI for offline page\nexport const offlineEggPngDataUri = "data:image/png;base64,${base64}";\nexport default offlineEggPngDataUri;\n`;
          fs.writeFileSync(dataUriFile, content, 'utf-8');
          console.log('[copy-offline-assets] Synchronized offline PNG image and generated Base64 module');
        } catch (e) {
          console.error('[copy-offline-assets] Error processing offline image:', e);
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


