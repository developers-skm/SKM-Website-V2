import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const srcAssets = path.join(projectRoot, 'src', 'assets', 'images', 'offline-cracked-wifi-egg.png');
const destPublic = path.join(projectRoot, 'public', 'images', 'offline-cracked-wifi-egg.png');

fs.mkdirSync(path.dirname(destPublic), { recursive: true });

try {
  if (fs.existsSync(srcAssets)) {
    fs.copyFileSync(srcAssets, destPublic);
    console.log(`✓ Synchronized offline image to ${destPublic}`);
  }
} catch (e) {
  console.error(`✗ Error copying file: ${e.message}`);
}
