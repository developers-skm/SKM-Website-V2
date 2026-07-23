/**
 * Run once: node scripts/copy-manufacturing-images.mjs
 * Copies AI-generated process images from the artifacts directory
 * into src/assets/manufacturing-process/ for use in the component.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const srcDir = 'C:\\Users\\it-web1\\.gemini\\antigravity-ide\\brain\\e479af8d-c8f1-4d3d-a0fb-251f69845ac3';
const destDir = path.join(projectRoot, 'src', 'assets', 'manufacturing-process');

fs.mkdirSync(destDir, { recursive: true });

const files = [
  ['egg_intake_conveyor_1784716842964.png',    'egg-intake.png'],
  ['egg_breaking_filtration_1784716854222.png', 'egg-breaking.png'],
  ['htst_pasteurization_1784716867165.png',     'pasteurization.png'],
  ['spray_drying_tower_1784716881813.png',       'spray-drying.png'],
  ['quality_lab_testing_1784716895132.png',      'quality-lab.png'],
  ['cleanroom_packaging_1784716906408.png',      'cleanroom-packaging.png'],
];

for (const [src, dest] of files) {
  const srcPath  = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓  ${dest}`);
  } catch (e) {
    console.error(`✗  ${dest} — ${e.message}`);
  }
}
console.log('\nDone. Images are in src/assets/manufacturing-process/');
