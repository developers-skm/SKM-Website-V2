import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const srcPath = 'C:\\Users\\it-web1\\.gemini\\antigravity-ide\\brain\\9ad327b8-76af-4f02-9aa5-d9a1a27716d1\\offline_cracked_wifi_egg_1786601603423.png';

const destPublic = path.join(projectRoot, 'public', 'images', 'offline-cracked-wifi-egg.png');
const destAssets = path.join(projectRoot, 'src', 'assets', 'images', 'offline-cracked-wifi-egg.png');

fs.mkdirSync(path.dirname(destPublic), { recursive: true });
fs.mkdirSync(path.dirname(destAssets), { recursive: true });

try {
  fs.copyFileSync(srcPath, destPublic);
  console.log(`✓ Copied to ${destPublic}`);
  fs.copyFileSync(srcPath, destAssets);
  console.log(`✓ Copied to ${destAssets}`);
} catch (e) {
  console.error(`✗ Error copying file: ${e.message}`);
}
