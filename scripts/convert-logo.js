const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convertLogo() {
  const inputPath = path.join(__dirname, '..', 'public', 'images', 'prisha-ivf-logo-raw.jpg');
  const outputPath = path.join(__dirname, '..', 'public', 'images', 'prisha-ivf-logo.png');

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  console.log(`Original image: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

  // Get raw pixel buffer with RGBA
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Channels: ${channels}, width: ${width}, height: ${height}`);

  // Process pixels to make white transparent with soft edge feathering
  // A pixel is background if R, G, B are all high (e.g. > 240)
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Calculate brightness / distance from pure white
    const minVal = Math.min(r, g, b);
    if (minVal > 248) {
      // Pure white or very near pure white -> fully transparent
      data[i + 3] = 0;
    } else if (minVal > 230) {
      // Soft transition edge feathering
      const factor = (248 - minVal) / (248 - 230);
      data[i + 3] = Math.round(255 * factor);
    }
  }

  // Trim transparent edges and write out high-quality PNG
  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .trim()
  .png({ quality: 100, compressionLevel: 9 })
  .toFile(outputPath);

  const outMeta = await sharp(outputPath).metadata();
  console.log(`Processed PNG saved: ${outMeta.width}x${outMeta.height}, size: ${fs.statSync(outputPath).size} bytes`);
}

convertLogo().catch(console.error);
