import { Jimp } from "jimp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "../public");

function removeBgFloodFill(img, { whiteTh = 230, grayTolerance = 35 } = {}) {
  const { width, height, data } = img.bitmap;
  function isBg(idx) {
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const avg = (r+g+b)/3;
    return (r > whiteTh && g > whiteTh && b > whiteTh) ||
      (avg > 130 && Math.abs(r-avg) < grayTolerance && Math.abs(g-avg) < grayTolerance && Math.abs(b-avg) < grayTolerance);
  }
  const visited = new Uint8Array(width * height);
  const queue = [];
  for (let x = 0; x < width; x++) {
    for (const y of [0, height-1]) { const i=y*width+x; if(!visited[i]&&isBg(i*4)){visited[i]=1;queue.push(i);} }
  }
  for (let y = 0; y < height; y++) {
    for (const x of [0, width-1]) { const i=y*width+x; if(!visited[i]&&isBg(i*4)){visited[i]=1;queue.push(i);} }
  }
  const dx=[1,-1,0,0], dy=[0,0,1,-1];
  let head=0;
  while(head<queue.length){
    const i=queue[head++]; data[i*4+3]=0;
    const px=i%width, py=Math.floor(i/width);
    for(let d=0;d<4;d++){
      const nx=px+dx[d], ny=py+dy[d];
      if(nx<0||nx>=width||ny<0||ny>=height) continue;
      const ni=ny*width+nx;
      if(!visited[ni]&&isBg(ni*4)){visited[ni]=1;queue.push(ni);}
    }
  }
}

async function process(inputBuffer, outputPath, options={}) {
  const img = await Jimp.fromBuffer(inputBuffer);
  removeBgFloodFill(img, options);
  const buf = await img.getBuffer("image/png");
  writeFileSync(outputPath, buf);
  console.log("Saved:", outputPath);
}

async function main() {
  // Probar varias opciones para Sprint
  const b320 = readFileSync(join(PUBLIC, "sprint/b320-extrabody.jpg"));
  await process(b320, join(PUBLIC, "sprint/sprint-hero-transparent.png"), { whiteTh: 230, grayTolerance: 20 });

  // Toro - configuracion que funcionó bien
  const dilu = readFileSync(join(PUBLIC, "toro/diluyente.jpg"));
  await process(dilu, join(PUBLIC, "toro/diluyente-transparent.png"), { whiteTh: 200, grayTolerance: 55 });
}

main().catch(console.error);
