const pdf = require("pdf-parse");
const fs = require("fs");

const buffer = fs.readFileSync("C:\\Users\\USUARIO\\Downloads\\lista_northpaint_final.pdf (1).pdf");
pdf(buffer).then(data => {
  console.log(data.text);
}).catch(e => console.error("ERROR:", e.message));
