// Prepares Gallery photographs for the web.
//
//   1. Drop a photo (jpg / png / webp, any size) into public/gallery/
//   2. Run:  npm run gallery:images
//
// For every original it writes smaller WebP variants next to it
// (name-640.webp, name-1200.webp, name-1920.webp — only widths smaller than
// the original) and records the original's dimensions in
// src/data/galleryImageMeta.json. The Gallery page uses that to build
// responsive srcset + stable aspect ratios, so nothing is loaded at full size
// unless it has to be and there is no layout shift.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'public/gallery');
const metaFile = path.join(root, 'src/data/galleryImageMeta.json');
const WIDTHS = [640, 1200, 1920];
const VARIANT = /-(640|1200|1920)\.webp$/i;

fs.mkdirSync(dir, { recursive: true });

const originals = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !VARIANT.test(f))
  .sort();

const meta = {};
for (const file of originals) {
  const input = path.join(dir, file);
  const base = file.replace(/\.[^.]+$/, '');
  const { width, height } = await sharp(input).rotate().metadata();
  const widths = WIDTHS.filter((w) => w < width);

  for (const w of widths) {
    await sharp(input)
      .rotate()
      .resize({ width: w })
      .webp({ quality: w <= 640 ? 74 : 78, effort: 5 })
      .toFile(path.join(dir, `${base}-${w}.webp`));
  }
  meta[`/gallery/${file}`] = { w: width, h: height, v: widths };
  console.log(`ok  ${file}  ${width}x${height}  variants: ${widths.join(', ') || 'none'}`);
}

fs.writeFileSync(metaFile, `${JSON.stringify(meta, null, 2)}\n`);
console.log(`\n${originals.length} image(s) -> ${path.relative(root, metaFile)}`);
