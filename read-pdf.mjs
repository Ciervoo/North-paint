import { readFileSync } from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const buffer = readFileSync("C:\\Users\\USUARIO\\Downloads\\lista_northpaint_final.pdf (1).pdf");
const data = await pdfParse(buffer);
console.log(data.text);
