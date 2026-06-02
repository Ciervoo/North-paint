import { Jimp } from "jimp";
import { readFileSync, writeFileSync } from "fs";
import https from "https";
import http from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "../public");

function download(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

// Flood-fill BFS from all 4 corners — only removes background pixels connected to border
function removeBgFloodFill(img, { whiteTh = 230, grayTolerance = 35 } = {}) {
  const { width, height, data } = img.bitmap;

  function isBackground(idx) {
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const avg = (r + g + b) / 3;
    const isNearWhite = r > whiteTh && g > whiteTh && b > whiteTh;
    const isNearGray  = avg > 140
      && Math.abs(r - avg) < grayTolerance
      && Math.abs(g - avg) < grayTolerance
      && Math.abs(b - avg) < grayTolerance;
    return isNearWhite || isNearGray;
  }

  const visited = new Uint8Array(width * height);
  const queue   = [];

  // Seed from all border pixels
  for (let x = 0; x < width; x++) {
    for (const y of [0, height - 1]) {
      const i = (y * width + x);
      const idx = i * 4;
      if (!visited[i] && isBackground(idx)) { visited[i] = 1; queue.push(i); }
    }
  }
  for (let y = 0; y < height; y++) {
    for (const x of [0, width - 1]) {
      const i = (y * width + x);
      const idx = i * 4;
      if (!visited[i] && isBackground(idx)) { visited[i] = 1; queue.push(i); }
    }
  }

  // BFS
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  let head = 0;
  while (head < queue.length) {
    const i = queue[head++];
    const px = i % width;
    const py = Math.floor(i / width);
    // Make transparent
    data[i * 4 + 3] = 0;

    for (let d = 0; d < 4; d++) {
      const nx = px + dx[d], ny = py + dy[d];
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      const ni = ny * width + nx;
      if (visited[ni]) continue;
      if (isBackground(ni * 4)) { visited[ni] = 1; queue.push(ni); }
    }
  }
}

async function process(inputBuffer, outputPath, options = {}) {
  const img = await Jimp.fromBuffer(inputBuffer);
  removeBgFloodFill(img, options);
  const buf = await img.getBuffer("image/png");
  writeFileSync(outputPath, buf);
  console.log("Saved:", outputPath);
}

async function main() {
  console.log("Downloading H69...");
  const h69Buf = await download("https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg");
  await process(h69Buf, join(PUBLIC, "sprint/h69-transparent.png"), { whiteTh: 235, grayTolerance: 30 });

  console.log("Processing diluyente...");
  const diluBuf = readFileSync(join(PUBLIC, "toro/diluyente.jpg"));
  await process(diluBuf, join(PUBLIC, "toro/diluyente-transparent.png"), { whiteTh: 210, grayTolerance: 45 });

  console.log("Done!");
}

main().catch(console.error);
