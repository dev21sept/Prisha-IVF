const { spawn } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:\\Users\\user\\Downloads\\01ivf .mp4';
const outputPath = path.join(__dirname, '..', 'public', 'videos', 'hero-video-compressed.mp4');
const targetFinal = path.join(__dirname, '..', 'public', 'videos', 'hero-video.mp4');

console.log(`Starting compression from: ${inputPath}`);
console.log(`Using ffmpeg: ${ffmpeg.path}`);

// ffmpeg -i input -c:v libx264 -crf 23 -preset veryfast -movflags +faststart -c:a aac -b:a 128k output
const args = [
  '-y',
  '-i', inputPath,
  '-c:v', 'libx264',
  '-crf', '24',
  '-preset', 'fast',
  '-movflags', '+faststart',
  '-c:a', 'aac',
  '-b:a', '128k',
  outputPath
];

const proc = spawn(ffmpeg.path, args);

proc.stderr.on('data', (data) => {
  const line = data.toString();
  if (line.includes('time=')) {
    process.stdout.write(`Encoding: ${line.trim().split(/\s+/).slice(-5).join(' ')}\r`);
  }
});

proc.on('close', (code) => {
  if (code === 0) {
    const sizeBytes = fs.statSync(outputPath).size;
    const sizeMb = (sizeBytes / (1024 * 1024)).toFixed(2);
    console.log(`\nCompression completed! Output size: ${sizeMb} MB (${sizeBytes} bytes)`);

    // Replace hero-video.mp4 with the compressed version
    if (fs.existsSync(targetFinal)) {
      fs.unlinkSync(targetFinal);
    }
    fs.renameSync(outputPath, targetFinal);
    console.log(`Replaced ${targetFinal} with web-optimized video!`);
  } else {
    console.error(`\nFFmpeg failed with exit code ${code}`);
    process.exit(code);
  }
});
