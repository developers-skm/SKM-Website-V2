const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\it-web1\\.gemini\\antigravity-ide\\brain\\e479af8d-c8f1-4d3d-a0fb-251f69845ac3';
const dest = path.join(__dirname, 'src', 'assets', 'manufacturing-process');

if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

const files = [
  ['egg_intake_conveyor_1784716842964.png', 'egg-intake.png'],
  ['egg_breaking_filtration_1784716854222.png', 'egg-breaking.png'],
  ['htst_pasteurization_1784716867165.png', 'pasteurization.png'],
  ['spray_drying_tower_1784716881813.png', 'spray-drying.png'],
  ['quality_lab_testing_1784716895132.png', 'quality-lab.png'],
  ['cleanroom_packaging_1784716906408.png', 'cleanroom-packaging.png'],
];

for (const [from, to] of files) {
  const srcFile = path.join(src, from);
  const destFile = path.join(dest, to);
  try {
    fs.copyFileSync(srcFile, destFile);
    console.log(`✓ Copied ${to}`);
  } catch (e) {
    console.error(`✗ Failed ${to}: ${e.message}`);
  }
}
console.log('Done.');
