import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function convertAvatarToWebP() {
  const inputPath = path.join(PUBLIC_DIR, 'pradul-avatar.jpg');
  const outputPath = path.join(PUBLIC_DIR, 'pradul-avatar.webp');

  if (!fs.existsSync(inputPath)) {
    console.log('pradul-avatar.jpg not found, skipping');
    return;
  }

  const inputBuffer = fs.readFileSync(inputPath);
  const outputBuffer = await sharp(inputBuffer)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  fs.writeFileSync(outputPath, outputBuffer);
  const before = (fs.statSync(inputPath).size / 1024).toFixed(1);
  const after = (fs.statSync(outputPath).size / 1024).toFixed(1);
  console.log(`pradul-avatar.jpg: ${before} KB -> pradul-avatar.webp: ${after} KB`);
}

convertAvatarToWebP();
