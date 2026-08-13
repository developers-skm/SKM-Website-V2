import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const imagePath = path.join(projectRoot, 'src', 'assets', 'images', 'offline-cracked-wifi-egg.png');
const outputPath = path.join(projectRoot, 'src', 'assets', 'images', 'offlineEggDataUri.js');

if (fs.existsSync(imagePath)) {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const dataUri = `data:image/png;base64,${base64Image}`;
  
  const fileContent = `// Auto-generated inline Data URI for offline hero image\nexport const offlineEggDataUri = ${JSON.stringify(dataUri)};\ndefault export offlineEggDataUri;\n`;
  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  console.log(`Successfully generated offlineEggDataUri.js (${(fileContent.length / 1024).toFixed(2)} KB)`);
} else {
  console.error(`Image path not found: ${imagePath}`);
}
