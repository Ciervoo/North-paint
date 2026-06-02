import { Jimp } from "jimp";
import { readFileSync, writeFileSync } from "fs";
import https from "https";
import http from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "../public");

// Download image from URL into a buffer
function download(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client.get(url, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

// Remove near-white or near-gray background pixels
async function removeBg(inputBuffer, outputPath, { threshold = 235, tolerance = 30 } = {}) {
  const img = await Jimp.fromBuffer(inputBuffer);
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    // Check if the pixel is "near white/light gray"
    const isLight = r > threshold && g > threshold && b > threshold;
    // Also check if it's a near-neutral gray (for gray backgrounds)
    const avg = (r + g + b) / 3;
    const isGray = Math.abs(r - avg) < tolerance && Math.abs(g - avg) < tolerance && Math.abs(b - avg) < tolerance && avg > 160;
    if (isLight || isGray) {
      this.bitmap.data[idx + 3] = 0; // transparent
    }
  });
  const buf = await img.getBuffer("image/png");
  writeFileSync(outputPath, buf);
  console.log("Saved:", outputPath);
}

async function main() {
  // 1. Sprint H69 - white background from URL
  console.log("Downloading H69 image...");
  const h69Buf = await download("https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg");
  await removeBg(h69Buf, join(PUBLIC, "sprint/h69-transparent.png"), { threshold: 230, tolerance: 25 });

  // 2. Toro diluyente - gray/concrete background from local file
  console.log("Processing diluyente image...");
  const diluBuf = readFileSync(join(PUBLIC, "toro/diluyente.jpg"));
  await removeBg(diluBuf, join(PUBLIC, "toro/diluyente-transparent.png"), { threshold: 200, tolerance: 40 });

  console.log("Done!");
}

main().catch(console.error);
