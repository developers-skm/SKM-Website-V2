import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Copy AI-generated process images to public/images/manufacturing/
function copyManufacturingImagesPlugin() {
  return {
    name: 'copy-manufacturing-images',
    buildStart() {
      copyImages()
    },
    configureServer() {
      copyImages()
    }
  }
}

function copyImages() {
  const srcDir = 'C:\\Users\\it-web1\\.gemini\\antigravity-ide\\brain\\e479af8d-c8f1-4d3d-a0fb-251f69845ac3'
  const destDir = path.resolve(__dirname, 'public/images/manufacturing')

  try {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }

    const files = [
      ['egg_intake_conveyor_1784716842964.png', '01-egg-intake.png'],
      ['egg_breaking_filtration_1784716854222.png', '02-breaking-filtration.png'],
      ['htst_pasteurization_1784716867165.png', '03-pasteurization.png'],
      ['spray_drying_tower_1784716881813.png', '04-spray-drying.png'],
      ['quality_lab_testing_1784716895132.png', '05-quality-testing.png'],
      ['cleanroom_packaging_1784716906408.png', '06-packaging.png'],
      // Also write .webp filenames to support either extension
      ['egg_intake_conveyor_1784716842964.png', '01-egg-intake.webp'],
      ['egg_breaking_filtration_1784716854222.png', '02-breaking-filtration.webp'],
      ['htst_pasteurization_1784716867165.png', '03-pasteurization.webp'],
      ['spray_drying_tower_1784716881813.png', '04-spray-drying.webp'],
      ['quality_lab_testing_1784716895132.png', '05-quality-testing.webp'],
      ['cleanroom_packaging_1784716906408.png', '06-packaging.webp'],
    ]

    files.forEach(([srcName, destName]) => {
      const srcPath = path.join(srcDir, srcName)
      const destPath = path.join(destDir, destName)
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath)
        console.log(`[Vite Plugin] Manufacturing image copied: ${destName}`)
      }
    })
  } catch (err) {
    console.error('[Vite Plugin] Failed to copy manufacturing images:', err)
  }
}

// Run copy immediately on config load as well
copyImages()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), copyManufacturingImagesPlugin()],
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react-simple-maps', 'prop-types'],
  },
})
