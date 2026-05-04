/**
 * Raster favicons from public/favicon.svg (run after editing the SVG).
 * Usage: npm run generate:favicons
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, '..', 'public');
const svgPath = join(pub, 'favicon.svg');

async function main() {
  const svg = readFileSync(svgPath);

  const rasterTargets = [
    ['favicon-16x16.png', 16],
    ['favicon-32x32.png', 32],
    ['apple-touch-icon.png', 180],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
  ];

  for (const [name, size] of rasterTargets) {
    await sharp(svg).resize(size, size).png().toFile(join(pub, name));
    console.warn('wrote', name);
  }

  const icoBuffer = await pngToIco([
    join(pub, 'favicon-16x16.png'),
    join(pub, 'favicon-32x32.png'),
  ]);
  writeFileSync(join(pub, 'favicon.ico'), icoBuffer);
  console.warn('wrote favicon.ico');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
