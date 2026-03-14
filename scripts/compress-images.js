import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Only webps now — JPGs already done
const targets = [
  { file: 'projects/h2.1.webp', type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/h1.3.webp', type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/h1.4.webp', type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/C11.webp',  type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/p1.webp',   type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/p4.webp',   type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/S22.webp',  type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/h2.2.webp', type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/p3.webp',   type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/h1.1.webp', type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/S11.webp',  type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/h3.2.webp', type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/H33.webp',  type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/C13.webp',  type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/C14.webp',  type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/C12.webp',  type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/h3.3.webp', type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/H44.webp',  type: 'webp', quality: 72, maxWidth: 1200 },
  { file: 'projects/p2.webp',   type: 'webp', quality: 72, maxWidth: 1200 },
];

async function compress() {
  let totalSavedKB = 0;
  for (const target of targets) {
    const inputPath = path.join(PUBLIC_DIR, target.file);

    if (!fs.existsSync(inputPath)) {
      console.log(`SKIP (not found): ${target.file}`);
      continue;
    }

    const beforeBytes = fs.statSync(inputPath).size;

    try {
      // Read the file into a buffer first, then process in memory
      const inputBuffer = fs.readFileSync(inputPath);

      let outputBuffer;
      outputBuffer = await sharp(inputBuffer)
        .resize({ width: target.maxWidth, withoutEnlargement: true })
        .webp({ quality: target.quality, effort: 5 })
        .toBuffer();

      // Write the output buffer directly to the file
      fs.writeFileSync(inputPath, outputBuffer);

      const afterBytes = fs.statSync(inputPath).size;
      const savedKB = (beforeBytes - afterBytes) / 1024;
      totalSavedKB += savedKB;
      const pct = Math.round((savedKB / (beforeBytes / 1024)) * 100);
      console.log(`OK ${target.file}: ${Math.round(beforeBytes/1024)} KB -> ${Math.round(afterBytes/1024)} KB (saved ${Math.round(savedKB)} KB, ${pct}%)`);
    } catch (err) {
      console.error(`FAIL ${target.file}: ${err.message}`);
    }
  }
  console.log(`\nTotal saved: ${Math.round(totalSavedKB)} KB`);
}

compress();
